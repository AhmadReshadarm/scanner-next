import { NextApiRequest, NextApiResponse } from 'next';
import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

// --- Configuration ---
// CRITICAL FIX: Setting the absolute path to the location requested by the user.
// This path MUST match the 'alias' path in your Nginx configuration exactly.
const BASE_HLS_PATH = '/root/scanner/scanner-next/public/hls';
const MAX_RESTARTS = 3; 

// Mock data (Assuming this is located at '../../../data/streams.json')
import streamData from '../../../data/streams.json'; 
interface StreamData { branch: string; links: string[]; }
const streams: StreamData[] = streamData as any;

const activeStreams = new Map<string, FfmpegCommand>();

/**
 * Helper function to wait for a file to exist.
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
  if (!branch || !branch.links || !branch.links[linkIndex]) return undefined;
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
    // IMPORTANT: fs.rmSync and fs.mkdirSync require permissions for the Node.js user on the entire path!
    fs.rmSync(streamDir, { recursive: true, force: true });
    fs.mkdirSync(streamDir, { recursive: true });
    console.log(`[FFmpeg Setup] Directory created/cleaned: ${streamDir}`);
  } catch (e) {
    console.error(`[FFmpeg Setup] ERROR creating/cleaning directory ${streamDir}:`, e);
    // If Node fails to create the directory here, the whole process will fail
    return;
  }

  // 2. Build the FFmpeg command
  // On Linux/Unix, path.join is usually sufficient, but the .replace is harmless.
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
    .output(manifestPath.replace(/\\/g, '/')); // Use manifestPath directly

  // 3. Store the command object immediately before running.
  activeStreams.set(cameraId, command);

  command.on('start', (commandLine) => {
    console.log(
      `[FFmpeg LIVE] Stream ${cameraId} (Attempt ${attempt}) STARTED. Command: ${commandLine}`,
    );
  });

  command.on('error', (err, stdout, stderr) => {
    console.error(`[FFmpeg ERROR] Stream ${cameraId} FAILED: ${err.message}`);
    if (stderr) console.error(`[FFmpeg STDERR] ${stderr}`); 

    activeStreams.delete(cameraId);
    // Only attempt cleanup if the process failed before completion
    if (!fs.existsSync(manifestPath)) {
        fs.rmSync(streamDir, { recursive: true, force: true });
    }

    // --- RESTART LOGIC ---
    if (attempt < MAX_RESTARTS) {
      const nextAttempt = attempt + 1;
      console.log(
        `[FFmpeg Restart] Retrying stream ${cameraId} in 5s... (Attempt ${nextAttempt} of ${MAX_RESTARTS})`,
      );
      setTimeout(() => {
        startFfmpegStream(cameraId, rtspUrl, manifestPath, streamDir, nextAttempt);
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
    // Restart logic (omitted for brevity, assume similar to error handler if needed)
    if (activeStreams.has(cameraId)) {
        activeStreams.delete(cameraId);
        startFfmpegStream(cameraId, rtspUrl, manifestPath, streamDir, 1);
    } else {
        fs.rmSync(streamDir, { recursive: true, force: true });
    }
  });

  command.run();
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
  
    // --- PATH DEFINITION ---
    // This now resolves to: /root/scanner/scanner-next/public/hls/[cameraId]
    const streamDir = path
      .join(BASE_HLS_PATH, cameraId)
      .replace(/\\/g, '/');
    const manifestPath = path.join(streamDir, 'index.m3u8').replace(/\\/g, '/');
    
    // CRITICAL PATH LOG FOR DEBUGGING
    console.log(`[PATH CHECK] Resolved streamDir (FFmpeg output): ${streamDir}`); 
  
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
      // Status now works correctly because the 20-second wait ensures the file exists before the HLS player asks for it.
      const isLive = fs.existsSync(manifestPath); 
      return res.status(200).json({ status: isLive ? 'live' : 'offline' });
    }
  
    // --- STOP ACTION ---
    if (action === 'stop') {
        if (activeStreams.has(cameraId)) {
            activeStreams.get(cameraId)!.kill('SIGKILL');
            activeStreams.delete(cameraId);
        }
        try { fs.rmSync(streamDir, { recursive: true, force: true }); } catch(e) {}
        return res.status(200).json({ status: 'Stream stopped and cleaned up.' });
    }
  
    // --- START ACTION ---
    if (action === 'start') {
      console.log(`[API Logic] Attempting to START stream ${cameraId}`);
      
      if (activeStreams.has(cameraId)) {
        if (fs.existsSync(manifestPath)) {
          console.log(`[API Response] Stream already active and manifest exists. Returning 200.`);
          return res.status(200).json({ hlsUrl: `/hls/${cameraId}/index.m3u8` });
        } else {
          console.warn(`[API Warning] Stream ${cameraId} in map but manifest missing. Forcing restart.`);
          activeStreams.get(cameraId)!.kill('SIGKILL');
          activeStreams.delete(cameraId);
        }
      }
  
      startFfmpegStream(cameraId, rtspUrl, manifestPath, streamDir);
  
      // RESTORED/CONFIRMED: The intentional 20 second wait is here.
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