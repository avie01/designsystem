#!/usr/bin/env node

const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const PROJECT_DIR = __dirname;
const COMMIT_DELAY = 30000; // 30 seconds delay to batch changes
const IGNORED_PATTERNS = [
  '**/node_modules/**',
  '**/.git/**',
  '**/dist/**',
  '**/build/**',
  '**/.cache/**',
  '**/auto-commit.log',
  '**/auto-commit.js',
  '**/.DS_Store',
  '**/*.log'
];

let commitTimer = null;
let changedFiles = new Set();

// Check if auto-commit is enabled
const configPath = path.join(PROJECT_DIR, '.auto-commit-enabled');
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, 'true');
}

function isAutoCommitEnabled() {
  try {
    return fs.readFileSync(configPath, 'utf8').trim() === 'true';
  } catch {
    return false;
  }
}

// Log function
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(path.join(PROJECT_DIR, 'auto-commit.log'), logMessage + '\n');
}

// Execute git command
function execGit(command) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: PROJECT_DIR }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

// Check git status
async function hasChanges() {
  try {
    const status = await execGit('git status --porcelain');
    return status.trim().length > 0;
  } catch (error) {
    log(`Error checking git status: ${error.message}`);
    return false;
  }
}

// Commit changes
async function commitChanges() {
  if (!isAutoCommitEnabled()) {
    log('Auto-commit disabled, skipping commit');
    return;
  }

  try {
    const hasUnstagedChanges = await hasChanges();
    if (!hasUnstagedChanges) {
      log('No changes to commit');
      return;
    }

    // Get list of changed files for commit message
    const status = await execGit('git status --porcelain');
    const files = status.trim().split('\n')
      .map(line => line.substring(3))
      .filter(file => file.length > 0);
    
    const fileCount = files.length;
    const fileList = files.slice(0, 5).join(', ');
    const commitMessage = fileCount > 5 
      ? `Auto-save: ${fileCount} files changed (${fileList}, ...)`
      : `Auto-save: ${fileList}`;

    // Stage all changes
    await execGit('git add -A');
    
    // Create commit
    const fullMessage = `${commitMessage}

[Auto-commit] Changes saved automatically
Generated at ${new Date().toISOString()}`;
    
    await execGit(`git commit -m "${fullMessage}"`);
    
    log(`Committed ${fileCount} file(s): ${commitMessage}`);
    changedFiles.clear();
    
  } catch (error) {
    log(`Error committing changes: ${error.message}`);
  }
}

// Schedule commit
function scheduleCommit() {
  if (commitTimer) {
    clearTimeout(commitTimer);
  }
  
  commitTimer = setTimeout(() => {
    commitChanges();
  }, COMMIT_DELAY);
}

// File change handler
function handleFileChange(filepath) {
  if (!isAutoCommitEnabled()) return;
  
  const relativePath = path.relative(PROJECT_DIR, filepath);
  changedFiles.add(relativePath);
  
  log(`File changed: ${relativePath}`);
  scheduleCommit();
}

// Initialize watcher
log('Starting auto-commit watcher...');
log(`Watching directory: ${PROJECT_DIR}`);
log(`Commit delay: ${COMMIT_DELAY / 1000} seconds`);

const watcher = chokidar.watch(PROJECT_DIR, {
  ignored: IGNORED_PATTERNS,
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
});

// Set up event handlers
watcher
  .on('add', handleFileChange)
  .on('change', handleFileChange)
  .on('unlink', handleFileChange)
  .on('ready', () => {
    log('Auto-commit watcher ready and monitoring changes');
  })
  .on('error', error => {
    log(`Watcher error: ${error.message}`);
  });

// Handle process termination
process.on('SIGINT', () => {
  log('Shutting down auto-commit watcher...');
  
  // Commit any pending changes before exit
  if (changedFiles.size > 0) {
    log('Committing pending changes before exit...');
    commitChanges().then(() => {
      watcher.close();
      process.exit(0);
    });
  } else {
    watcher.close();
    process.exit(0);
  }
});

process.on('SIGTERM', () => {
  log('Received SIGTERM, shutting down...');
  watcher.close();
  process.exit(0);
});

// Status check every 5 minutes
setInterval(() => {
  if (isAutoCommitEnabled()) {
    log(`Auto-commit active - monitoring ${changedFiles.size} pending file(s)`);
  }
}, 300000);