import { NextApiRequest, NextApiResponse } from 'next';
import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import os from 'os'; // <--- IMPORTED
import { ChildProcess } from 'child_process';

import streamData from '../../../data/streams.json';

// Interface for the data structure to satisfy TypeScript
interface StreamData {
  branch: string;
  links: string[];
}

// Type assertion for mock data
const streams: StreamData[] = streamData as any;

const activeStreams = new Map<string, FfmpegCommand>();

// Global Constants for Restart Logic
const MAX_RESTARTS = 3;

// --- NEW: Define a stable HLS directory in the OS temp folder ---
const HLS_BASE_DIR = path.join(os.tmpdir(), 'hls-streams');

// Ensure this base directory exists when the server starts
if (!fs.existsSync(HLS_BASE_DIR)) {
  fs.mkdirSync(HLS_BASE_DIR, { recursive: true });
  console.log(`[HLS] Created temporary stream directory at: ${HLS_BASE_DIR}`);
}

/**
 * Helper function to wait for a file to exist on the filesystem.
 * This prevents the HLS player from getting a 404 before FFmpeg writes the manifest.
 * Timeout increased to 20 seconds for reliable stream *startup*.
 */
const waitForFile = (
  filepath: string,
  timeoutMs: number = 20000,
  intervalMs: number = 500,
): Promise<boolean> => {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const check = () => {
      if (fs.existsSync(filepath)) {
        resolve(true);
        return;
      }
      // Check for timeout
      if (Date.now() - startTime > timeoutMs) {
        resolve(false);
        return;
      }
      // If file not found and not timed out, check again after interval
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
  // 1. Clean up and set up the output directory
  fs.rmSync(streamDir, { recursive: true, force: true });
  fs.mkdirSync(streamDir, { recursive: true });

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
      `[FFmpeg] Stream ${cameraId} (Attempt ${attempt}) started. Command: ${commandLine}`,
    );
  });

  command.on('error', (err, stdout, stderr) => {
    console.error(`[FFmpeg Error] Stream ${cameraId} failed: ${err.message}`);

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
        `[FFmpeg Failure] Stream ${cameraId} failed after ${MAX_RESTARTS} attempts. Giving up.`,
      );
    }
  });

  command.on('end', () => {
    console.log(
      `[FFmpeg End] Stream ${cameraId} finished unexpectedly. Attempting restart if active.`,
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
  // Keep timeout at 10s, but use aggressive analysis parameters for reliability
  const checkTimeoutMs = 10000;
  
  // --- MODIFIED: Use HLS_BASE_DIR for checks ---
  const tempDir = path
    .join(HLS_BASE_DIR, `check-${cameraId}`)
    .replace(/\\/g, '/');
    
  const tempManifestPath = path.join(tempDir, 'index.m3u8').replace(/\\/g, '/');

  // Ensure initial cleanup
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.mkdirSync(tempDir, { recursive: true });
  } catch (e) {
    /* silent fail for cleanup */
  }

  const command = ffmpeg(rtspUrl)
    .inputOptions([
      '-fflags nobuffer',
      '-rtsp_flags prefer_tcp',
      '-rtsp_transport tcp',
      // SIGNIFICANTLY Increased analysis time and probe size for stable status checks
      '-analyzeduration 5000000', // 5 seconds
      '-probesize 500000', // 500 KB
    ])
    .outputOptions([
      '-t 5', // Run for 5 seconds to ensure stream stability and segment creation
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
      // Start a tighter loop check for the file
      const checkInterval = setInterval(() => {
        if (fs.existsSync(tempManifestPath)) {
          clearInterval(checkInterval);
          clearTimeout(overallTimeout);
          success = true;
          command.kill('SIGKILL'); // Kill immediately on success
          resolve(true);
        }
      }, 300); // Check every 300ms
    });

    command.on('error', (err) => {
      console.log(
        `[Status Check Error] Stream ${cameraId} failed: ${err.message}`,
      );
      if (!success) {
        clearTimeout(overallTimeout);
        resolve(false);
      }
    });

    command.on('end', () => {
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
    console.error(`Cleanup failed for ${cameraId}:`, e);
  }
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

  // --- MODIFIED: Use HLS_BASE_DIR ---
  const streamDir = path
    .join(HLS_BASE_DIR, cameraId)
    .replace(/\\/g, '/');
  
  const manifestPath = path.join(streamDir, 'index.m3u8').replace(/\\/g, '/');

  const rtspUrl = findRTSPUrl(cameraId);

  if (!rtspUrl) {
    return res
      .status(404)
      .json({ error: 'Camera stream not found based on ID lookup.' });
  }

  // --- STATUS ACTION (NEW) ---
  if (action === 'status') {
    const isLive = await checkFfmpegStatus(cameraId, rtspUrl);
    return res.status(200).json({ status: isLive ? 'live' : 'offline' });
  }

  // --- STOP ACTION ---
  if (action === 'stop') {
    if (activeStreams.has(cameraId)) {
      const command = activeStreams.get(cameraId)!;
      try {
        command.kill('SIGKILL');
        activeStreams.delete(cameraId);
        fs.rmSync(streamDir, { recursive: true, force: true });
        return res
          .status(200)
          .json({ status: 'Stream stopped and cleaned up.' });
      } catch (error) {
        activeStreams.delete(cameraId);
        return res.status(500).json({
          error: 'Failed to stop stream process. It might have already exited.',
        });
      }
    }
    try {
      fs.rmSync(streamDir, { recursive: true, force: true });
    } catch (e) {}
    return res
      .status(200)
      .json({ status: 'Stream was not active, cleanup complete.' });
  }

  // --- START ACTION ---
  if (action === 'start') {
    if (activeStreams.has(cameraId)) {
      if (fs.existsSync(manifestPath)) {
        // --- MODIFIED: Return API URL ---
        return res.status(200).json({ hlsUrl: `/api/hls/${cameraId}/index.m3u8` });
      } else {
        // The stream exists in the map but the file is missing -> restart it
        activeStreams.get(cameraId)!.kill('SIGKILL');
        activeStreams.delete(cameraId);
      }
    }

    startFfmpegStream(cameraId, rtspUrl, manifestPath, streamDir);

    const manifestCreated = await waitForFile(manifestPath, 20000);

    if (manifestCreated) {
      // --- MODIFIED: Return API URL ---
      return res.status(200).json({
        status: 'Stream initiated and manifest ready.',
        hlsUrl: `/api/hls/${cameraId}/index.m3u8`,
      });
    } else {
      console.error(
        `[FFmpeg Timeout] Stream ${cameraId} failed to create manifest within 20 seconds. Terminating process.`,
      );
      if (activeStreams.has(cameraId)) {
        activeStreams.get(cameraId)!.kill('SIGKILL');
        activeStreams.delete(cameraId);
      }
      return res.status(503).json({
        status: 'Stream failed to initialize',
        error:
          'FFmpeg failed to connect to RTSP stream and create manifest within timeout period.',
      });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}