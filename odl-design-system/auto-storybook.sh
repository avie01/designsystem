#!/bin/bash

# Auto-pull and run Storybook
# This script continuously pulls latest from GitHub and restarts Storybook when changes are detected

REPO_DIR="/Users/andrewk/Documents/ODL-Library/odl-design-system"
CONTENT_DIR="$REPO_DIR/content"
PULL_INTERVAL=300  # Pull every 5 minutes
STORYBOOK_PID=""

echo "🚀 Starting auto-pull Storybook..."
echo "Repository: $REPO_DIR"
echo "Pull interval: $PULL_INTERVAL seconds"
echo "Storybook URL: http://localhost:6006"
echo ""

# Function to start Storybook
start_storybook() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Starting Storybook..."
    cd "$CONTENT_DIR"
    npm run storybook > /tmp/storybook.log 2>&1 &
    STORYBOOK_PID=$!
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Storybook started (PID: $STORYBOOK_PID)"
    sleep 5
}

# Function to stop Storybook
stop_storybook() {
    if [ -n "$STORYBOOK_PID" ] && kill -0 $STORYBOOK_PID 2>/dev/null; then
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Stopping Storybook (PID: $STORYBOOK_PID)..."
        kill $STORYBOOK_PID 2>/dev/null
        sleep 2
        kill -9 $STORYBOOK_PID 2>/dev/null || true
    fi
}

# Function to check for updates
check_updates() {
    cd "$REPO_DIR"

    # Get current HEAD
    LOCAL_HEAD=$(git rev-parse HEAD)

    # Fetch from remote
    git fetch odl-new 2>/dev/null

    # Get remote HEAD
    REMOTE_HEAD=$(git rev-parse odl-new/main 2>/dev/null)

    if [ "$LOCAL_HEAD" != "$REMOTE_HEAD" ]; then
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Updates found! Pulling from GitHub..."
        git pull odl-new main 2>/dev/null
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Pull complete. Restarting Storybook..."
        return 0  # Updates found
    else
        echo "$(date '+%Y-%m-%d %H:%M:%S') - No updates ($(git rev-parse --short HEAD))"
        return 1  # No updates
    fi
}

# Trap to clean up on exit
cleanup() {
    echo ""
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Shutting down..."
    stop_storybook
    echo "Done!"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start Storybook initially
start_storybook

# Main loop
while true; do
    sleep $PULL_INTERVAL

    if check_updates; then
        stop_storybook
        start_storybook
    fi
done
