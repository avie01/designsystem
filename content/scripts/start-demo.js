const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Compliance Checklist Demo...\n');

// Function to kill process on port
function killPort(port) {
  return new Promise((resolve) => {
    const kill = spawn('lsof', ['-ti:' + port]);
    let pids = '';
    
    kill.stdout.on('data', (data) => {
      pids += data.toString();
    });
    
    kill.on('close', (code) => {
      if (pids) {
        const pidList = pids.trim().split('\n');
        pidList.forEach(pid => {
          try {
            process.kill(pid, 'SIGKILL');
            console.log(`✅ Killed process ${pid} on port ${port}`);
          } catch (e) {
            // Process might already be dead
          }
        });
      } else {
        console.log(`✅ Port ${port} is free`);
      }
      resolve();
    });
    
    kill.on('error', () => {
      console.log(`✅ Port ${port} is free`);
      resolve();
    });
  });
}

async function startDemo() {
  // Kill any existing process on port 3000
  console.log('🔍 Checking for existing processes on port 3000...');
  await killPort(3000);
  console.log('');
  
  // Start Vite
  console.log('🌟 Starting Vite development server...');
  console.log('📍 The compliance checklist demo will be available at: http://localhost:3000');
  console.log('');
  console.log('⏳ Please wait while the server starts...');
  console.log('   The browser should open automatically when ready.');
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('----------------------------------------\n');
  
  const vite = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname),
    stdio: 'inherit',
    shell: true
  });
  
  vite.on('error', (err) => {
    console.error('❌ Failed to start Vite:', err);
    process.exit(1);
  });
  
  vite.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`❌ Vite exited with code ${code}`);
      process.exit(code);
    }
  });
  
  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down server...');
    vite.kill('SIGINT');
    process.exit(0);
  });
}

// Start the demo
startDemo().catch(err => {
  console.error('❌ Error starting demo:', err);
  process.exit(1);
});
