#!/bin/bash

# Script to start the Compliance Checklist Demo
echo "🚀 Starting Compliance Checklist Demo..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Kill any existing process on port 3000
echo "🔍 Checking for existing processes on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null && echo "✅ Killed existing process on port 3000" || echo "✅ Port 3000 is free"
echo ""

# Start the Vite dev server
echo "🌟 Starting Vite development server..."
echo "📍 The compliance checklist demo will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "----------------------------------------"
echo ""

# Run Vite in development mode
npm run dev
