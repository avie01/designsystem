#!/usr/bin/env node
/**
 * Build Performance Analysis Script
 * Analyzes bundle sizes, build times, and optimization opportunities
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_PATH = path.join(__dirname, '../dist');
const TARGET_SIZES = {
  'index.js': 150 * 1024,        // 150KB
  'index.esm.js': 150 * 1024,    // 150KB
  'styles.css': 25 * 1024,       // 25KB
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function getGzipSize(filePath) {
  try {
    const gzipSize = execSync(`gzip -c "${filePath}" | wc -c`, { encoding: 'utf8' });
    return parseInt(gzipSize.trim());
  } catch (error) {
    console.warn(`Could not calculate gzip size for ${filePath}:`, error.message);
    return 0;
  }
}

function analyzeBundleSize() {
  console.log('🔍 Bundle Size Analysis\n');
  console.log('File                     | Size      | Gzipped   | Status');
  console.log('-------------------------|-----------|-----------|----------');

  if (!fs.existsSync(DIST_PATH)) {
    console.log('❌ Dist folder not found. Please run build first.');
    return false;
  }

  const files = fs.readdirSync(DIST_PATH);
  let allPassed = true;

  for (const file of files) {
    if (file.startsWith('.') || fs.statSync(path.join(DIST_PATH, file)).isDirectory()) {
      continue;
    }

    const filePath = path.join(DIST_PATH, file);
    const stats = fs.statSync(filePath);
    const gzipSize = getGzipSize(filePath);
    
    const target = TARGET_SIZES[file];
    const status = target ? (stats.size <= target ? '✅ PASS' : '❌ FAIL') : '📊 INFO';
    
    if (target && stats.size > target) {
      allPassed = false;
    }

    console.log(
      `${file.padEnd(24)} | ${formatBytes(stats.size).padEnd(9)} | ${formatBytes(gzipSize).padEnd(9)} | ${status}`
    );
  }

  console.log('\n');
  return allPassed;
}

function checkDependencies() {
  console.log('📦 Dependency Analysis\n');

  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    console.log('Production Dependencies:');
    Object.entries(dependencies).forEach(([name, version]) => {
      console.log(`  ${name}: ${version}`);
    });

    console.log('\n📊 Bundle Impact Analysis:');
    
    // Check for potentially large dependencies
    const largeDeps = [
      '@carbon/icons-react',
      'react-spring',
      'framer-motion',
      'lodash',
      'moment'
    ];

    largeDeps.forEach(dep => {
      if (dependencies[dep]) {
        console.log(`⚠️  Large dependency detected: ${dep}`);
        
        if (dep === '@carbon/icons-react') {
          console.log('   💡 Consider implementing selective icon imports');
        }
      }
    });

  } catch (error) {
    console.log('❌ Could not analyze package.json:', error.message);
  }

  console.log('\n');
}

function buildTimeAnalysis() {
  console.log('⏱️  Build Time Analysis\n');

  const startTime = Date.now();
  
  try {
    console.log('Running production build...');
    execSync('npm run build', { stdio: 'pipe' });
    
    const buildTime = Date.now() - startTime;
    console.log(`✅ Build completed in ${(buildTime / 1000).toFixed(2)}s`);
    
    // Benchmark against targets
    const targetTime = 30000; // 30 seconds
    if (buildTime > targetTime) {
      console.log('⚠️  Build time exceeds target (30s)');
      console.log('💡 Consider enabling build caching or parallel processing');
    } else {
      console.log('✅ Build time within acceptable range');
    }

  } catch (error) {
    console.log('❌ Build failed:', error.message);
  }

  console.log('\n');
}

function generateOptimizationReport() {
  console.log('🚀 Optimization Recommendations\n');

  const recommendations = [
    {
      issue: 'Carbon Icons Bundle Size',
      severity: 'HIGH',
      description: 'Importing all Carbon icons increases bundle size significantly',
      solution: 'Implement selective icon imports or lazy loading',
      impact: '~300KB reduction'
    },
    {
      issue: 'CSS Bundle Size',
      severity: 'MEDIUM',
      description: 'CSS bundle includes unused styles',
      solution: 'Enable PurgeCSS in production builds',
      impact: '~40-60% CSS size reduction'
    },
    {
      issue: 'Tree Shaking',
      severity: 'MEDIUM',
      description: 'Some modules may not be properly tree-shaken',
      solution: 'Review and optimize imports, use named imports only',
      impact: '~50-100KB reduction'
    },
    {
      issue: 'Development Assets',
      severity: 'LOW',
      description: 'Development-only code may be included in production',
      solution: 'Use NODE_ENV checks and terser to remove dev code',
      impact: '~10-20KB reduction'
    }
  ];

  recommendations.forEach(rec => {
    const severityIcon = rec.severity === 'HIGH' ? '🔴' : rec.severity === 'MEDIUM' ? '🟡' : '🟢';
    console.log(`${severityIcon} ${rec.severity}: ${rec.issue}`);
    console.log(`   Description: ${rec.description}`);
    console.log(`   Solution: ${rec.solution}`);
    console.log(`   Impact: ${rec.impact}\n`);
  });
}

function checkModernBuildFeatures() {
  console.log('🔧 Modern Build Features Check\n');

  const features = [
    {
      name: 'ES2020 Target',
      check: () => {
        try {
          const tsconfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../tsconfig.json'), 'utf8'));
          return tsconfig.compilerOptions?.target?.toLowerCase().includes('es2020');
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Tree Shaking Enabled',
      check: () => {
        try {
          const rollupConfig = fs.readFileSync(path.join(__dirname, '../rollup.config.js'), 'utf8');
          return rollupConfig.includes('treeshake');
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Bundle Analysis',
      check: () => fs.existsSync(path.join(DIST_PATH, 'stats.html'))
    },
    {
      name: 'Source Maps (Dev)',
      check: () => fs.existsSync(path.join(DIST_PATH, 'index.esm.js.map'))
    }
  ];

  features.forEach(feature => {
    const status = feature.check() ? '✅' : '❌';
    console.log(`${status} ${feature.name}`);
  });

  console.log('\n');
}

// Main execution
async function main() {
  console.log('🏗️  ODL Component Library - Build Performance Analysis\n');
  console.log('='.repeat(60) + '\n');

  const sizesPassed = analyzeBundleSize();
  checkDependencies();
  buildTimeAnalysis();
  checkModernBuildFeatures();
  generateOptimizationReport();

  console.log('='.repeat(60));
  console.log(sizesPassed ? '✅ All size targets met!' : '❌ Some size targets exceeded');
  console.log('📊 View detailed bundle analysis: ./dist/stats.html');
  console.log('💡 For more insights, run: npm run build:analyze');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  analyzeBundleSize,
  checkDependencies,
  formatBytes,
  getGzipSize
};