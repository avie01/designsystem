#!/usr/bin/env node

/**
 * Inline Styles Checker for ODL Design System
 * Scans component files for inline styles and reports findings
 *
 * Usage: node check-inline-styles.js [--fix] [--verbose]
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const args = process.argv.slice(2);
const verbose = args.includes('--verbose') || args.includes('-v');
const showHelp = args.includes('--help') || args.includes('-h');

if (showHelp) {
  console.log(`
Inline Styles Checker for ODL Design System

Usage: node check-inline-styles.js [options]

Options:
  --verbose, -v    Show all inline style occurrences with code snippets
  --help, -h       Show this help message

Examples:
  node check-inline-styles.js           # Summary report
  node check-inline-styles.js --verbose # Detailed report with code snippets
`);
  process.exit(0);
}

const COMPONENTS_DIR = path.join(__dirname, 'src/components');
const TEMPLATES_DIR = path.join(__dirname, 'src/templates');
const PAGES_DIR = path.join(__dirname, 'src/pages');

// Patterns to detect inline styles
const INLINE_STYLE_PATTERNS = [
  {
    name: 'style={{ }}',
    regex: /style=\{\{[\s\S]*?\}\}/g,
    description: 'JSX inline style object'
  },
  {
    name: 'style={variable}',
    regex: /style=\{[^{][\w.]+\}/g,
    description: 'Style from variable'
  },
  {
    name: 'style={...spread}',
    regex: /style=\{\s*\.\.\./g,
    description: 'Spread style object'
  }
];

// Allowed patterns (these are OK)
const ALLOWED_PATTERNS = [
  /style=\{[\w]+Style\}/,  // Named style variables like cardStyle
  /style=\{props\.style\}/, // Passing through style prop
  /style=\{.*className.*\}/, // Dynamic className
];

function findInlineStyles(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const findings = [];

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    INLINE_STYLE_PATTERNS.forEach(pattern => {
      const matches = line.match(pattern.regex);
      if (matches) {
        matches.forEach(match => {
          // Check if it's an allowed pattern
          const isAllowed = ALLOWED_PATTERNS.some(allowed => allowed.test(match));
          if (!isAllowed) {
            findings.push({
              line: lineNum,
              column: line.indexOf(match) + 1,
              match: match.substring(0, 100) + (match.length > 100 ? '...' : ''),
              type: pattern.name,
              fullLine: line.trim()
            });
          }
        });
      }
    });
  });

  return findings;
}

function getRelativePath(filePath) {
  return path.relative(__dirname, filePath);
}

function scanDirectory(dir, label) {
  if (!fs.existsSync(dir)) {
    return { files: 0, findings: [] };
  }

  const files = glob.sync(path.join(dir, '**/*.tsx'));
  const results = [];

  files.forEach(file => {
    // Skip story files and test files
    if (file.includes('.stories.') || file.includes('.test.') || file.includes('.spec.')) {
      return;
    }

    const findings = findInlineStyles(file);
    if (findings.length > 0) {
      results.push({
        file: getRelativePath(file),
        findings
      });
    }
  });

  return { files: files.length, findings: results };
}

function printSummary(results, label) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${label}`);
  console.log('='.repeat(60));

  if (results.findings.length === 0) {
    console.log('✅ No inline styles found!');
    return 0;
  }

  let totalFindings = 0;
  results.findings.forEach(result => {
    totalFindings += result.findings.length;
    console.log(`\n📁 ${result.file}`);
    console.log(`   Found ${result.findings.length} inline style(s)`);

    if (verbose) {
      result.findings.forEach(finding => {
        console.log(`\n   Line ${finding.line}:${finding.column} [${finding.type}]`);
        console.log(`   └─ ${finding.fullLine.substring(0, 80)}${finding.fullLine.length > 80 ? '...' : ''}`);
      });
    }
  });

  return totalFindings;
}

function printDetailedReport(allResults) {
  console.log('\n' + '='.repeat(60));
  console.log('DETAILED BREAKDOWN BY STYLE TYPE');
  console.log('='.repeat(60));

  const byType = {};

  allResults.forEach(({ findings }) => {
    findings.forEach(result => {
      result.findings.forEach(finding => {
        if (!byType[finding.type]) {
          byType[finding.type] = [];
        }
        byType[finding.type].push({
          file: result.file,
          line: finding.line,
          match: finding.match
        });
      });
    });
  });

  Object.keys(byType).forEach(type => {
    console.log(`\n📌 ${type}: ${byType[type].length} occurrences`);
    if (verbose) {
      byType[type].slice(0, 10).forEach(item => {
        console.log(`   - ${item.file}:${item.line}`);
      });
      if (byType[type].length > 10) {
        console.log(`   ... and ${byType[type].length - 10} more`);
      }
    }
  });
}

function main() {
  console.log('🔍 ODL Design System - Inline Styles Checker');
  console.log('Scanning for inline styles in components...\n');

  const componentsResults = scanDirectory(COMPONENTS_DIR, 'Components');
  const templatesResults = scanDirectory(TEMPLATES_DIR, 'Templates');
  const pagesResults = scanDirectory(PAGES_DIR, 'Pages');

  const total1 = printSummary(componentsResults, `📦 COMPONENTS (${componentsResults.files} files scanned)`);
  const total2 = printSummary(templatesResults, `📄 TEMPLATES (${templatesResults.files} files scanned)`);
  const total3 = printSummary(pagesResults, `📃 PAGES (${pagesResults.files} files scanned)`);

  const totalFindings = total1 + total2 + total3;
  const totalFiles = componentsResults.findings.length + templatesResults.findings.length + pagesResults.findings.length;

  if (verbose && totalFindings > 0) {
    printDetailedReport([componentsResults, templatesResults, pagesResults]);
  }

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total files with inline styles: ${totalFiles}`);
  console.log(`Total inline style occurrences: ${totalFindings}`);

  if (totalFindings > 0) {
    console.log('\n💡 Recommendations:');
    console.log('   - Use ODLTheme.* for colors, spacing, typography');
    console.log('   - Use CSS variables: var(--odl-primary), var(--odl-spacing-4)');
    console.log('   - Use Tailwind classes or CSS modules');
    console.log('   - Extract repeated styles to component CSS files');
    console.log('\nRun with --verbose for detailed output');
  }

  // Exit with error code if findings exist (useful for CI)
  process.exit(totalFindings > 0 ? 1 : 0);
}

main();
