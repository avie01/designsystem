#!/usr/bin/env node

// Simple, stable development server for Isovist project
// This bypasses the complex server.mjs and runs Vite directly

const { spawn } = require('child_process');
const path = require('path');

console.log('\n🚀 Starting Stable Dev Server...\n');

// Run Vite directly with simple configuration
const viteProcess = spawn('npx', [
  'vite',
  'example',
  '--port', '3000',
  '--host',
  '--open'
], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down server...\n');
  viteProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  viteProcess.kill('SIGTERM');
  process.exit(0);
});

viteProcess.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

viteProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`❌ Server exited with code ${code}`);
  }
  process.exit(code);
});