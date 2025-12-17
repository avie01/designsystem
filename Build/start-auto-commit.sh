#!/bin/bash

# Start auto-commit watcher
echo "Starting auto-commit watcher for Isovist project..."

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Check if chokidar is installed
if [ ! -d "node_modules/chokidar" ]; then
    echo "Installing chokidar dependency..."
    npm install chokidar --save-dev
fi

# Enable auto-commit
echo "true" > .auto-commit-enabled

# Clear old log
> auto-commit.log

# Start the watcher in background
nohup node auto-commit.js > auto-commit.log 2>&1 &
PID=$!

# Save PID for stop script
echo $PID > .auto-commit.pid

echo "Auto-commit watcher started with PID: $PID"
echo "Logs available at: auto-commit.log"
echo ""
echo "Changes will be auto-committed every 30 seconds"
echo "To stop: ./stop-auto-commit.sh"
echo "To disable temporarily: echo 'false' > .auto-commit-enabled"