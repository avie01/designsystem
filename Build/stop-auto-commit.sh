#!/bin/bash

# Stop auto-commit watcher
echo "Stopping auto-commit watcher..."

if [ -f .auto-commit.pid ]; then
    PID=$(cat .auto-commit.pid)
    
    # Check if process is running
    if ps -p $PID > /dev/null 2>&1; then
        kill $PID
        echo "Auto-commit watcher (PID: $PID) stopped"
        rm .auto-commit.pid
    else
        echo "Auto-commit watcher not running (stale PID file)"
        rm .auto-commit.pid
    fi
else
    echo "No auto-commit watcher running (no PID file found)"
    
    # Try to find and kill any orphaned processes
    PIDS=$(ps aux | grep "[n]ode auto-commit.js" | awk '{print $2}')
    if [ ! -z "$PIDS" ]; then
        echo "Found orphaned auto-commit process(es): $PIDS"
        for pid in $PIDS; do
            kill $pid
            echo "Killed orphaned process: $pid"
        done
    fi
fi

# Disable auto-commit
echo "false" > .auto-commit-enabled

echo "Auto-commit disabled"