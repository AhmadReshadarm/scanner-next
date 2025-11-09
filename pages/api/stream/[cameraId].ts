import { NextApiRequest, NextApiResponse } from 'next';
import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
// import { ChildProcess } from 'child_process'; // Not needed

import streamData from '../../../data/streams.json'; // Ensure path is correct

// Interface for the data structure to satisfy TypeScript
interface StreamData {
  branch: string;
  links: string[];
}

// Type assertion for mock data
const streams: StreamData[] = streamData as any;

const activeStreams = new Map<string, FfmpegCommand>();
const MAX_RESTARTS = 3;

/**
 * Helper function to wait for a file to exist on the filesystem.
 */
const waitForFile = (
  filepath: string,
  timeoutMs: number = 20000,
  intervalMs: number = 500,
): Promise<boolean> => {
  const startTime = Date.now();
  console.log(`[File Watcher] Starting wait for file: ${filepath}`);
  return new Promise((resolve) => {
    const check = () => {
      if (fs.existsSync(filepath)) {
        const timeElapsed = Date.now() - startTime;
        console.log(`[File Watcher] SUCCESS: Manifest found after ${timeElapsed}ms.`);
        resolve(true);
        return;
      }
      if (Date.now() - startTime > timeoutMs) {
        console.error(`[File Watcher] TIMEOUT: Manifest not found within ${timeoutMs}ms.`);
        resolve(false);
        return;
      }
      setTimeout(check, intervalMs);
    };
    check();
  });
};

// Helper function to find the RTSP URL
const findRTSPUrl = (cameraId: string): string | undefined => {
  const [branchIndex, linkIndex] = cameraId.split('-').map(Number);
  const branch = streams[branchIndex];

  if (!branch || !branch.links || !branch.links[linkIndex]) {
    return undefined;
  }
  return branch.links[linkIndex];
};

// --- Core FFmpeg Execution and Restart Logic (for START action) ---
function startFfmpegStream(
  cameraId: string,
  rtspUrl: string,
  manifestPath: string,
  streamDir: string,
  attempt: number = 1,
) {
  console.log(`[FFmpeg Setup] Attempting to start stream ${cameraId} (Attempt ${attempt})`);
  
  // 1. Clean up and set up the output directory
  try {
        fs.rmSync(streamDir, { recursive: true, force: true });
        fs.mkdirSync(streamDir, { recursive: true });
        console.log(`[FFmpeg Setup] Directory created/cleaned: ${streamDir}`);
    } catch (e) {
        console.error(`[FFmpeg Setup] ERROR creating/cleaning directory ${streamDir}:`, e);
    }

  // 2. Build the FFmpeg command
  const command = ffmpeg(rtspUrl)
    .inputOptions([
      '-fflags nobuffer',
      '-rtsp_flags prefer_tcp',
      '-rtsp_transport tcp',
      '-analyzeduration 1000000',
      '-probesize 100000',
    ])
    .outputOptions([
      '-c:v libx264',
      '-preset veryfast',
      '-tune zerolatency',
      '-c:a aac',
      '-b:a 128k',
      '-hls_list_size 5',
      '-hls_time 2',
      '-hls_flags delete_segments',
      '-f hls',
    ])
    .output(manifestPath.replace(/\\/g, '/'));

  // 3. Store the command object immediately before running.
  activeStreams.set(cameraId, command);

  command.on('start', (commandLine) => {
    console.log(
      `[FFmpeg LIVE] Stream ${cameraId} (Attempt ${attempt}) STARTED. Command: ${commandLine}`,
    );
  });

  command.on('error', (err, stdout, stderr) => {
    console.error(`[FFmpeg ERROR] Stream ${cameraId} FAILED: ${err.message}`);
    // Log stderr for detailed debugging
    if (stderr) console.error(`[FFmpeg STDERR] ${stderr}`); 

    activeStreams.delete(cameraId);
    fs.rmSync(streamDir, { recursive: true, force: true });

    // --- RESTART LOGIC ---
    if (attempt < MAX_RESTARTS) {
      const nextAttempt = attempt + 1;
      console.log(
        `[FFmpeg Restart] Retrying stream ${cameraId} in 5s... (Attempt ${nextAttempt} of ${MAX_RESTARTS})`,
      );

      setTimeout(() => {
        startFfmpegStream(
          cameraId,
          rtspUrl,
          manifestPath,
          streamDir,
          nextAttempt,
        );
      }, 5000);
    } else {
      console.error(
        `[FFmpeg FAILURE] Stream ${cameraId} FAILED after ${MAX_RESTARTS} attempts. Giving up.`,
      );
    }
  });

  command.on('end', () => {
    console.log(
      `[FFmpeg END] Stream ${cameraId} finished unexpectedly. Attempting restart if active.`,
    );
    // Re-attempting restart if stream was actively being tracked
    if (activeStreams.has(cameraId)) {
      activeStreams.delete(cameraId);
      startFfmpegStream(cameraId, rtspUrl, manifestPath, streamDir, 1);
    } else {
      // Cleanup just in case it exited and cleanup wasn't done
      fs.rmSync(streamDir, { recursive: true, force: true });
    }
  });

  command.run();
}

// --- UPDATED: Robust FFmpeg Status Check (for STATUS action) ---
async function checkFfmpegStatus(
  cameraId: string,
  rtspUrl: string,
): Promise<boolean> {
  console.log(`[Status Check] Starting check for ${cameraId}`);
  const checkTimeoutMs = 10000;
  const tempDir = path
    .join(process.cwd(), 'public', 'hls', `check-${cameraId}`)
    .replace(/\\/g, '/');
  const tempManifestPath = path.join(tempDir, 'index.m3u8').replace(/\\/g, '/');

  // Ensure initial cleanup
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.mkdirSync(tempDir, { recursive: true });
  } catch (e) {
    console.error(`[Status Check] Cleanup failed for ${cameraId}:`, e);
  }

  const command = ffmpeg(rtspUrl)
    .inputOptions([
      '-fflags nobuffer',
      '-rtsp_flags prefer_tcp',
      '-rtsp_transport tcp',
      '-analyzeduration 5000000', // 5 seconds
      '-probesize 500000', // 500 KB
    ])
    .outputOptions([
      '-t 5', // Run for 5 seconds
      '-c:v copy',
      '-an',
      '-hls_list_size 1',
      '-hls_time 1',
      '-f hls',
    ])
    .output(tempManifestPath);

  let isLive = false;

  const resultPromise = new Promise<boolean>((resolve) => {
    let success = false;
    let processStarted = false; // Log check for immediate failure

    // Set a hard stop timeout for the entire check operation
    const overallTimeout = setTimeout(() => {
      if (!success) {
        console.log(
          `[Status Check Timeout] Stream ${cameraId} exceeded ${checkTimeoutMs}ms. Killing process.`,
        );
        command.kill('SIGKILL');
        resolve(false);
      }
    }, checkTimeoutMs);

    command.on('start', (commandLine) => {
        processStarted = true;
        console.log(`[Status Check] FFmpeg process started for ${cameraId}`);
      // Start a tighter loop check for the file
      const checkInterval = setInterval(() => {
        if (fs.existsSync(tempManifestPath)) {
          clearInterval(checkInterval);
          clearTimeout(overallTimeout);
          success = true;
          command.kill('SIGKILL'); // Kill immediately on success
           console.log(`[Status Check] SUCCESS: Manifest created for ${cameraId}.`);
          resolve(true);
        }
      }, 300); // Check every 300ms
    });

    command.on('error', (err, stdout, stderr) => {
      console.error(
        `[Status Check Error] Stream ${cameraId} failed: ${err.message}`,
      );
      if (stderr) console.error(`[Status Check STDERR] ${stderr}`);

      if (!success) {
        clearTimeout(overallTimeout);
        if (!processStarted) command.kill('SIGKILL'); // Kill if it failed before starting
        resolve(false);
      }
    });

    command.on('end', () => {
        console.log(`[Status Check] FFmpeg process ended for ${cameraId}. Success: ${success}`);
      if (!success) {
        clearTimeout(overallTimeout);
        // If it reached 'end' without the manifest file appearing, it failed.
        resolve(false);
      }
    });

    command.run();
  });

  // Wait for the result and clean up
  isLive = await resultPromise;
  try {
    fs.rmSync(tempDir, { recursive: true, force: true }); // Ensure cleanup
  } catch (e) {
    console.error(`[Status Check] Final cleanup failed for ${cameraId}:`, e);
  }
  console.log(`[Status Check] Final result for ${cameraId}: ${isLive ? 'Live' : 'Offline'}`);
  return isLive;
}

// --- Main API Handler ---
export default async function streamHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cameraId, action } = req.query as {
    cameraId: string;
    action: string;
  };

  console.log(`\n--- API REQUEST ---`);
  console.log(`Action: ${action}, CameraID: ${cameraId}`);

  const streamDir = path
    .join(process.cwd(), 'public', 'hls', cameraId)
    .replace(/\\/g, '/');
  const manifestPath = path.join(streamDir, 'index.m3u8').replace(/\\/g, '/');

  const rtspUrl = findRTSPUrl(cameraId);

  if (!rtspUrl) {
    console.error(`[API Error] Camera stream data not found for ID: ${cameraId}`);
    return res
      .status(404)
      .json({ error: 'Camera stream not found based on ID lookup.' });
  }
  console.log(`RTSP URL found for ${cameraId}`);

  // --- STATUS ACTION ---
  if (action === 'status') {
    const isLive = await checkFfmpegStatus(cameraId, rtspUrl);
    console.log(`[API Response] Status check complete. Result: ${isLive ? 200 : 200}`);
    return res.status(200).json({ status: isLive ? 'live' : 'offline' });
  }

  // --- STOP ACTION ---
  if (action === 'stop') {
    console.log(`[API Logic] Attempting to STOP stream ${cameraId}`);
    if (activeStreams.has(cameraId)) {
      const command = activeStreams.get(cameraId)!;
      try {
        command.kill('SIGKILL');
        activeStreams.delete(cameraId);
        fs.rmSync(streamDir, { recursive: true, force: true });
        console.log(`[API Response] Stream stopped and cleaned up successfully.`);
        return res
          .status(200)
          .json({ status: 'Stream stopped and cleaned up.' });
      } catch (error) {
        activeStreams.delete(cameraId);
        console.error(`[API Error] Failed to kill FFmpeg process for ${cameraId}.`, error);
        return res.status(500).json({
          error: 'Failed to stop stream process. It might have already exited.',
        });
      }
    }
    try {
      fs.rmSync(streamDir, { recursive: true, force: true });
    } catch (e) {}
    console.log(`[API Response] Stream was not active, cleanup complete.`);
    return res
      .status(200)
      .json({ status: 'Stream was not active, cleanup complete.' });
  }

  // --- START ACTION ---
  if (action === 'start') {
    console.log(`[API Logic] Attempting to START stream ${cameraId}`);
    
    if (activeStreams.has(cameraId)) {
      if (fs.existsSync(manifestPath)) {
        console.log(`[API Response] Stream already active and manifest exists. Returning 200.`);
        return res.status(200).json({ hlsUrl: `/hls/${cameraId}/index.m3u8` });
      } else {
        // The stream exists in the map but the file is missing -> restart it
        console.warn(`[API Warning] Stream ${cameraId} in map but manifest missing. Forcing restart.`);
        activeStreams.get(cameraId)!.kill('SIGKILL');
        activeStreams.delete(cameraId);
      }
    }

    startFfmpegStream(cameraId, rtspUrl, manifestPath, streamDir);

    const manifestCreated = await waitForFile(manifestPath, 20000);

    if (manifestCreated) {
        console.log(`[API Response] Manifest ready. Returning 200.`);
      return res.status(200).json({
        status: 'Stream initiated and manifest ready.',
        hlsUrl: `/hls/${cameraId}/index.m3u8`,
      });
    } else {
      console.error(
        `[API FAILURE] Stream ${cameraId} failed to create manifest within 20 seconds. Terminating process and returning 503.`,
      );
      if (activeStreams.has(cameraId)) {
        activeStreams.get(cameraId)!.kill('SIGKILL');
        activeStreams.delete(cameraId);
      }
      // THIS is the source of the 503 Service Unavailable error in your browser logs
      return res.status(503).json({
        status: 'Stream failed to initialize',
        error:
          'FFmpeg failed to connect to RTSP stream and create manifest within timeout period.',
      });
    }
  }

  console.log(`[API Error] Method ${req.method} not allowed.`);
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}