#!/usr/bin/env node
/**
 * Development Optimization Script
 * Optimizes the development workflow by setting up build caching,
 * dependency pre-bundling, and development server enhancements
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_PATH = path.join(__dirname, '..');
const NODE_MODULES_PATH = path.join(ROOT_PATH, 'node_modules');
const CACHE_PATH = path.join(ROOT_PATH, '.cache');

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function setupBuildCache() {
  console.log('🗄️  Setting up build cache...');
  
  ensureDirectory(CACHE_PATH);
  
  // Create cache configuration
  const cacheConfig = {
    version: '1.0.0',
    timestamp: Date.now(),
    dependencies: {},
    buildHashes: {}
  };

  fs.writeFileSync(
    path.join(CACHE_PATH, 'config.json'),
    JSON.stringify(cacheConfig, null, 2)
  );

  console.log('✅ Build cache initialized');
}

function optimizeNodeModules() {
  console.log('📦 Optimizing node_modules...');

  try {
    // Clean npm cache
    execSync('npm cache clean --force', { stdio: 'pipe' });
    
    // Check for duplicate packages
    try {
      const duplicates = execSync('npm ls --depth=0 2>&1 || true', { encoding: 'utf8' });
      if (duplicates.includes('UNMET DEPENDENCY') || duplicates.includes('extraneous')) {
        console.log('⚠️  Found dependency issues, running npm install...');
        execSync('npm install', { stdio: 'inherit' });
      }
    } catch (error) {
      console.log('⚠️  Could not check dependencies:', error.message);
    }

    console.log('✅ Node modules optimized');
  } catch (error) {
    console.log('❌ Node modules optimization failed:', error.message);
  }
}

function createDevelopmentEnv() {
  console.log('⚙️  Creating development environment file...');

  const devEnv = `# Development Environment Variables
NODE_ENV=development
FAST_REFRESH=true
GENERATE_SOURCEMAP=true
ANALYZE_BUNDLE=false

# Build optimizations
ROLLUP_CACHE=true
VITE_HMR=true
VITE_OPTIMIZE_DEPS=true

# Debug options
DEBUG_BUILD=false
VERBOSE_LOGS=false

# Performance monitoring
MEASURE_BUILD_TIME=true
MEMORY_PROFILING=false
`;

  fs.writeFileSync(path.join(ROOT_PATH, '.env.development'), devEnv);
  console.log('✅ Development environment file created');
}

function setupVSCodeSettings() {
  console.log('🔧 Setting up VS Code workspace settings...');

  const vscodeDir = path.join(ROOT_PATH, '.vscode');
  ensureDirectory(vscodeDir);

  const settings = {
    "typescript.preferences.includePackageJsonAutoImports": "auto",
    "typescript.suggest.autoImports": true,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "editor.codeActionsOnSave": {
      "source.organizeImports": true,
      "source.fixAll.eslint": true
    },
    "files.associations": {
      "*.css": "tailwindcss"
    },
    "emmet.includeLanguages": {
      "javascript": "javascriptreact",
      "typescript": "typescriptreact"
    },
    "search.exclude": {
      "**/node_modules": true,
      "**/dist": true,
      "**/.cache": true,
      "**/coverage": true
    },
    "files.watcherExclude": {
      "**/node_modules/**": true,
      "**/dist/**": true,
      "**/.cache/**": true
    }
  };

  fs.writeFileSync(
    path.join(vscodeDir, 'settings.json'),
    JSON.stringify(settings, null, 2)
  );

  const extensions = {
    "recommendations": [
      "bradlc.vscode-tailwindcss",
      "esbenp.prettier-vscode",
      "dbaeumer.vscode-eslint",
      "ms-vscode.vscode-typescript-next",
      "formulahendry.auto-rename-tag",
      "christian-kohler.path-intellisense",
      "ms-vscode.vscode-json"
    ]
  };

  fs.writeFileSync(
    path.join(vscodeDir, 'extensions.json'),
    JSON.stringify(extensions, null, 2)
  );

  console.log('✅ VS Code settings configured');
}

function createGitIgnoreOptimizations() {
  console.log('📝 Optimizing .gitignore...');

  const gitignorePath = path.join(ROOT_PATH, '.gitignore');
  let gitignore = '';

  if (fs.existsSync(gitignorePath)) {
    gitignore = fs.readFileSync(gitignorePath, 'utf8');
  }

  const optimizations = `
# Build optimization cache
.cache/
.rollup.cache
.vite/

# Bundle analysis
dist/stats.html
bundle-report.html

# Development files
.env.development.local
.env.local

# IDE files
.vscode/settings.json
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Performance monitoring
lighthouse-report.html
performance-report.json
`;

  if (!gitignore.includes('.cache/')) {
    fs.writeFileSync(gitignorePath, gitignore + optimizations);
    console.log('✅ .gitignore optimized');
  } else {
    console.log('✅ .gitignore already optimized');
  }
}

function setupHusky() {
  console.log('🐺 Setting up Husky pre-commit hooks...');

  try {
    // Check if husky is installed
    if (fs.existsSync(path.join(NODE_MODULES_PATH, 'husky'))) {
      execSync('npx husky install', { stdio: 'pipe' });
      
      // Create pre-commit hook
      const preCommitHook = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run build to ensure it doesn't break
npm run build:dev
`;

      const huskyDir = path.join(ROOT_PATH, '.husky');
      ensureDirectory(huskyDir);
      
      fs.writeFileSync(path.join(huskyDir, 'pre-commit'), preCommitHook);
      
      console.log('✅ Husky pre-commit hooks configured');
    } else {
      console.log('⚠️  Husky not installed, skipping hook setup');
    }
  } catch (error) {
    console.log('⚠️  Husky setup failed:', error.message);
  }
}

function measureCurrentPerformance() {
  console.log('📊 Measuring current performance...');

  try {
    const startTime = Date.now();
    
    // Run type check
    const typeCheckStart = Date.now();
    execSync('npm run type-check', { stdio: 'pipe' });
    const typeCheckTime = Date.now() - typeCheckStart;

    // Run build
    const buildStart = Date.now();
    execSync('npm run build', { stdio: 'pipe' });
    const buildTime = Date.now() - buildStart;

    const totalTime = Date.now() - startTime;

    const performance = {
      timestamp: new Date().toISOString(),
      typeCheck: `${(typeCheckTime / 1000).toFixed(2)}s`,
      build: `${(buildTime / 1000).toFixed(2)}s`,
      total: `${(totalTime / 1000).toFixed(2)}s`
    };

    fs.writeFileSync(
      path.join(CACHE_PATH, 'performance-baseline.json'),
      JSON.stringify(performance, null, 2)
    );

    console.log('📊 Performance baseline:');
    console.log(`   Type checking: ${performance.typeCheck}`);
    console.log(`   Build time: ${performance.build}`);
    console.log(`   Total time: ${performance.total}`);

  } catch (error) {
    console.log('❌ Performance measurement failed:', error.message);
  }
}

function createDevelopmentScripts() {
  console.log('📜 Creating additional development scripts...');

  const scripts = {
    'dev-clean': {
      content: `#!/bin/bash
echo "🧹 Cleaning development environment..."
rm -rf dist/
rm -rf .cache/
rm -rf node_modules/.cache/
npm cache clean --force
echo "✅ Development environment cleaned"
`,
      executable: true
    },
    'dev-reset': {
      content: `#!/bin/bash
echo "🔄 Resetting development environment..."
rm -rf node_modules/
rm -rf dist/
rm -rf .cache/
npm install
npm run dev-optimize
echo "✅ Development environment reset"
`,
      executable: true
    },
    'dev-analyze': {
      content: `#!/bin/bash
echo "📊 Analyzing development build..."
npm run build:analyze
echo "📈 Opening bundle analyzer..."
open dist/stats.html
`,
      executable: true
    }
  };

  const scriptsDir = path.join(ROOT_PATH, 'scripts');
  ensureDirectory(scriptsDir);

  Object.entries(scripts).forEach(([name, config]) => {
    const scriptPath = path.join(scriptsDir, `${name}.sh`);
    fs.writeFileSync(scriptPath, config.content);
    
    if (config.executable) {
      try {
        execSync(`chmod +x "${scriptPath}"`);
      } catch (error) {
        console.log(`⚠️  Could not make ${name}.sh executable:`, error.message);
      }
    }
  });

  console.log('✅ Development scripts created');
}

// Main execution
async function main() {
  console.log('🚀 ODL Component Library - Development Optimization\n');
  console.log('='.repeat(60) + '\n');

  setupBuildCache();
  optimizeNodeModules();
  createDevelopmentEnv();
  setupVSCodeSettings();
  createGitIgnoreOptimizations();
  setupHusky();
  createDevelopmentScripts();
  measureCurrentPerformance();

  console.log('\n' + '='.repeat(60));
  console.log('✅ Development environment optimized!');
  console.log('\n🎯 Next steps:');
  console.log('1. Restart your development server');
  console.log('2. Install recommended VS Code extensions');
  console.log('3. Run "npm run dev" to start optimized development');
  console.log('4. Check performance with "node scripts/build-performance.js"');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  setupBuildCache,
  optimizeNodeModules,
  measureCurrentPerformance
};