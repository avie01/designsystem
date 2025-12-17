const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Compliance Checklist Demo - Setup Check\n');

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Dependencies not installed. Installing now...');
  console.log('   This may take a few minutes...\n');
  
  try {
    execSync('npm install', { 
      stdio: 'inherit',
      cwd: __dirname 
    });
    console.log('\n✅ Dependencies installed successfully!\n');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    console.log('\nPlease run manually: npm install');
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies are already installed\n');
}

// Check for Vite
const vitePath = path.join(nodeModulesPath, 'vite');
if (!fs.existsSync(vitePath)) {
  console.log('⚠️  Vite not found. Installing Vite...');
  try {
    execSync('npm install vite', { 
      stdio: 'inherit',
      cwd: __dirname 
    });
    console.log('✅ Vite installed successfully!\n');
  } catch (error) {
    console.error('❌ Failed to install Vite:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Vite is installed\n');
}

// Check configuration files
const configFiles = [
  'vite.config.ts',
  'example/compliance-checklist-demo.html',
  'example/ComplianceChecklistDemoEntry.tsx',
  'src/pages/ComplianceChecklistPage.tsx'
];

console.log('📋 Checking required files:');
let allFilesExist = true;
configFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n⚠️  Some required files are missing!');
  process.exit(1);
}

console.log('\n✨ Everything looks good!\n');
console.log('To start the demo, run ONE of these commands:\n');
console.log('   Option 1 (Recommended):');
console.log('   node start-demo.js\n');
console.log('   Option 2:');
console.log('   npm run dev\n');
console.log('   Option 3:');
console.log('   chmod +x start-compliance-demo.sh && ./start-compliance-demo.sh\n');
console.log('The demo will be available at: http://localhost:3000');
console.log('----------------------------------------\n');
