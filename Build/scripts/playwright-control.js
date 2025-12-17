#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Manual Playwright Control Script
 * Only runs Playwright tests when explicitly requested with "Playwright this"
 */

const testDirectory = path.join(__dirname, '../tests');
const snapshotDirs = [
  'brisbane-specific-url.spec.ts-snapshots',
  'cityplan-comparison.spec.ts-snapshots', 
  'cityplan-integration.spec.ts-snapshots',
  'external-site-capture.spec.ts-snapshots',
  'screenshot-helper.spec.ts-snapshots'
];

function cleanupOldScreenshots() {
  console.log('🧹 Cleaning up old screenshots...');
  
  snapshotDirs.forEach(dir => {
    const fullPath = path.join(testDirectory, dir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 7); // Keep last 7 days
      
      let deletedCount = 0;
      files.forEach(file => {
        const filePath = path.join(fullPath, file);
        const stats = fs.statSync(filePath);
        
        if (stats.mtime < cutoffDate) {
          fs.unlinkSync(filePath);
          deletedCount++;
        }
      });
      
      if (deletedCount > 0) {
        console.log(`  ✅ Deleted ${deletedCount} old screenshots from ${dir}`);
      }
    }
  });
}

function runPlaywright(testFile = null, options = []) {
  return new Promise((resolve, reject) => {
    const args = ['test'];
    
    if (testFile) {
      args.push(testFile);
    }
    
    args.push(...options);
    
    console.log(`🎭 Running Playwright: npx playwright ${args.join(' ')}`);
    
    const playwright = spawn('npx', ['playwright', ...args], {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    playwright.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Playwright tests completed successfully');
        resolve();
      } else {
        console.log(`❌ Playwright tests failed with code ${code}`);
        reject(new Error(`Tests failed with exit code ${code}`));
      }
    });
    
    playwright.on('error', (err) => {
      console.error('❌ Failed to start Playwright:', err);
      reject(err);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'cleanup':
      cleanupOldScreenshots();
      break;
      
    case 'visual':
      await runPlaywright('tests/visual-testing.spec.ts', ['--ui']);
      break;
      
    case 'screenshots':
      await runPlaywright('tests/screenshot-helper.spec.ts', ['--ui']);
      break;
      
    case 'cityplan':
      await runPlaywright('tests/cityplan-comparison.spec.ts', ['--ui']);
      break;
      
    case 'external':
      await runPlaywright('tests/external-site-capture.spec.ts');
      break;
      
    case 'all':
      cleanupOldScreenshots();
      await runPlaywright(null, ['--ui']);
      break;
      
    case 'headless':
      await runPlaywright();
      break;
      
    default:
      console.log(`
🎭 Playwright Control Script

Usage:
  node scripts/playwright-control.js <command>

Commands:
  cleanup     - Clean up old screenshots (older than 7 days)
  visual      - Run visual regression tests with UI
  screenshots - Run screenshot helper tests with UI  
  cityplan    - Run CityPlan comparison tests with UI
  external    - Run external site capture tests
  all         - Cleanup + run all tests with UI
  headless    - Run all tests headless (no UI)

Examples:
  node scripts/playwright-control.js cleanup
  node scripts/playwright-control.js visual
  node scripts/playwright-control.js all
      `);
      break;
  }
}

main().catch(console.error);