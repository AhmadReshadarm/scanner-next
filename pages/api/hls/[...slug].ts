import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import os from 'os';

// This MUST match the directory in [cameraId].ts
const HLS_BASE_DIR = path.join(os.tmpdir(), 'hls-streams');

export default async function hlsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug } = req.query as { slug: string[] };

  if (!slug || slug.length === 0) {
    return res.status(404).json({ error: 'Not found' });
  }

  // 1. Construct the file path from the slug
  // e.g., /api/hls/1-0/index.m3u8 -> [ '1-0', 'index.m3u8' ]
  const requestedPath = path.join(HLS_BASE_DIR, ...slug);

  // 2. **Security Check:** Prevent path traversal attacks.
  //    Ensure the resolved path is still inside the HLS_BASE_DIR.
  const normalizedBase = path.normalize(HLS_BASE_DIR);
  const normalizedPath = path.normalize(requestedPath);

  if (!normalizedPath.startsWith(normalizedBase)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    // 3. Check if the file exists
    if (!fs.existsSync(normalizedPath)) {
      console.warn(`HLS file not found: ${normalizedPath}`);
      return res.status(404).json({ error: 'File not found' });
    }

    // 4. Determine the MIME type based on the file extension
    const fileExtension = path.extname(normalizedPath);
    let contentType = 'application/octet-stream';

    if (fileExtension === '.m3u8') {
      contentType = 'application/vnd.apple.mpegurl';
    } else if (fileExtension === '.ts') {
      contentType = 'video/mp2t';
    }

    res.setHeader('Content-Type', contentType);

    // 5. Stream the file to the client
    const readStream = fs.createReadStream(normalizedPath);
    readStream.pipe(res);

    readStream.on('error', (err) => {
      console.error('Stream read error:', err);
      res.status(500).end();
    });
  } catch (error) {
    console.error('Error serving HLS file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}