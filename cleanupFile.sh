# File: /usr/local/bin/cleanup_hls.sh

#!/bin/bash

# --- FFmpeg Process Cleanup ---
# Find and kill any running FFmpeg processes that are likely transcoding your streams.
echo "Checking for stale FFmpeg processes..."

# Find PIDs matching "ffmpeg" AND "-f hls", then filter out the current script's grep process
pids=$(pgrep -f "ffmpeg.*-f hls" | grep -v "$0")

if [ -z "$pids" ]; then
    echo "No stale FFmpeg processes found."
else
    echo "Stale FFmpeg PIDs found: $pids. Killing processes..."
    # Kill the processes
    echo "$pids" | xargs -r kill -9
    echo "Killed FFmpeg processes."
fi

# --- HLS File Cleanup ---
# Define the path to your public HLS directory (ADJUST THIS PATH)
NEXTJS_ROOT="/root/scanner/scanner-next"
HLS_DIR="$NEXTJS_ROOT/public/hls"

if [ -d "$HLS_DIR" ]; then
    # Find directories (camera ID folders) older than 1 hour (60 minutes) and delete them recursively.
    # This prevents the public/hls directory from growing indefinitely.
    echo "Cleaning up HLS directories older than 1 hour..."
    # The -exec rm -rf {} \; command executes the removal for each found directory.
    find "$HLS_DIR" -maxdepth 1 -mindepth 1 -type d -mmin +60 -exec rm -rf {} \;
    echo "HLS cleanup complete."
else
    echo "HLS directory not found: $HLS_DIR"
fi

sudo chmod +x /root/scanner/cleanup_hls_node.sh

# M H Dm M Dw  command
*/15 * * * * cleanup_hls.sh >> /var/log/hls_cleanup.log 2>&1