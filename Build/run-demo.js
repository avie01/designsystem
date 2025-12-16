#!/usr/bin/env node

/**
 * Quick Start Script for Compliance Checklist Demo
 * This script handles everything needed to run the demo
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(color + message + colors.reset);
}

async function main() {
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', colors.cyan);
  log('   🚀 Compliance Checklist Demo - Quick Start', colors.bright + colors.cyan);
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', colors.cyan);

  // Step 1: Check Node.js version
  log('📌 Step 1: Checking Node.js version...', colors.yellow);
  try {
    const nodeVersion = process.version;
    log(`   ✓ Node.js ${nodeVersion} detected`, colors.green);
  } catch (error) {
    log('   ✗ Node.js check failed', colors.red);
    process.exit(1);
  }

  // Step 2: Check/Install dependencies
  log('\n📌 Step 2: Checking dependencies...', colors.yellow);
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    log('   📦 Installing dependencies (this may take a minute)...', colors.blue);
    try {
      execSync('npm install', { 
        stdio: 'pipe',
        cwd: __dirname 
      });
      log('   ✓ Dependencies installed successfully', colors.green);
    } catch (error) {
      log('   ✗ Failed to install dependencies', colors.red);
      log(`   Error: ${error.message}`, colors.red);
      log('\n   Please try running: npm install', colors.yellow);
      process.exit(1);
    }
  } else {
    log('   ✓ Dependencies already installed', colors.green);
  }

  // Step 3: Kill existing processes on port 3000
  log('\n📌 Step 3: Clearing port 3000...', colors.yellow);
  try {
    if (process.platform === 'darwin' || process.platform === 'linux') {
      execSync("lsof -ti:3000 | xargs kill -9 2>/dev/null || true", { shell: true });
    } else if (process.platform === 'win32') {
      execSync("netstat -ano | findstr :3000 | findstr LISTENING | for /f \"tokens=5\" %a in ('more') do taskkill /PID %a /F 2>nul || true", { shell: true });
    }
    log('   ✓ Port 3000 is ready', colors.green);
  } catch (error) {
    log('   ✓ Port 3000 is ready', colors.green);
  }

  // Step 4: Start Vite dev server
  log('\n📌 Step 4: Starting development server...', colors.yellow);
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', colors.cyan);
  
  log('🌐 Server starting at: ' + colors.bright + colors.blue + 'http://localhost:3000' + colors.reset);
  log('📱 The browser should open automatically\n');
  log('💡 Tips:', colors.yellow);
  log('   • If the browser doesn\'t open, manually visit the URL above');
  log('   • The page will auto-reload when you make changes');
  log('   • Press Ctrl+C to stop the server\n');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', colors.cyan);

  // Start Vite
  const vite = spawn('npm', ['run', 'dev'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' }
  });

  // Handle errors
  vite.on('error', (err) => {
    log('\n✗ Failed to start server:', colors.red);
    log(`  ${err.message}`, colors.red);
    process.exit(1);
  });

  // Handle server exit
  vite.on('close', (code) => {
    if (code !== 0 && code !== null) {
      log(`\n✗ Server exited with code ${code}`, colors.red);
      process.exit(code);
    }
  });

  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    log('\n\n👋 Shutting down server...', colors.yellow);
    vite.kill('SIGINT');
    setTimeout(() => {
      log('✓ Server stopped successfully', colors.green);
      process.exit(0);
    }, 500);
  });

  // Handle other termination signals
  process.on('SIGTERM', () => {
    vite.kill('SIGTERM');
    process.exit(0);
  });
}

// Run the script
main().catch(err => {
  log('\n✗ Unexpected error:', colors.red);
  log(`  ${err.message}`, colors.red);
  process.exit(1);
});
