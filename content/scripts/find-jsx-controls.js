#!/usr/bin/env node
/**
 * Find Storybook stories with JSX props that need `control: false`
 *
 * This script scans all .stories.tsx files and identifies props that:
 * 1. Have JSX/ReactElement/ReactNode types
 * 2. Don't have `control: false` set in argTypes
 *
 * Usage: node scripts/find-jsx-controls.js
 */

const fs = require('fs');
const path = require('path');

const STORIES_DIR = path.join(__dirname, '../src');

// Patterns that indicate JSX props needing control: false
const JSX_PATTERNS = [
  /:\s*React\.ReactElement/,
  /:\s*React\.ReactNode/,
  /:\s*ReactElement/,
  /:\s*ReactNode/,
  /:\s*JSX\.Element/,
  /<[A-Z][a-zA-Z]*[\s/>]/,  // JSX tags like <Button> or <Icon />
];

// Find all story files
function findStoryFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findStoryFiles(fullPath));
    } else if (item.name.endsWith('.stories.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Check if a story file has JSX props without control: false
function analyzeStoryFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const relativePath = path.relative(STORIES_DIR, filePath);

  // Find args with JSX content
  const argsMatches = content.matchAll(/args:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/gs);

  for (const match of argsMatches) {
    const argsBlock = match[1];

    // Check for JSX in args (indicates ReactElement/ReactNode props)
    const jsxProps = [];
    const propMatches = argsBlock.matchAll(/(\w+):\s*(<[A-Z]|\(\s*<)/g);

    for (const propMatch of propMatches) {
      jsxProps.push(propMatch[1]);
    }

    if (jsxProps.length > 0) {
      // Check if these props have control: false in argTypes
      const argTypesMatch = content.match(/argTypes:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);

      for (const prop of jsxProps) {
        const hasControlFalse = argTypesMatch &&
          new RegExp(`${prop}:\\s*\\{[^}]*control:\\s*false`).test(argTypesMatch[1]);

        if (!hasControlFalse) {
          issues.push({
            file: relativePath,
            prop,
            suggestion: `Add to argTypes: ${prop}: { control: false }`
          });
        }
      }
    }
  }

  return issues;
}

// Main
console.log('Scanning for Storybook stories with JSX props needing control: false...\n');

const storyFiles = findStoryFiles(STORIES_DIR);
let allIssues = [];

for (const file of storyFiles) {
  const issues = analyzeStoryFile(file);
  allIssues.push(...issues);
}

if (allIssues.length === 0) {
  console.log('✅ No issues found! All JSX props have control: false set.');
} else {
  console.log(`⚠️  Found ${allIssues.length} prop(s) that may need control: false:\n`);

  // Group by file
  const byFile = {};
  for (const issue of allIssues) {
    if (!byFile[issue.file]) byFile[issue.file] = [];
    byFile[issue.file].push(issue);
  }

  for (const [file, issues] of Object.entries(byFile)) {
    console.log(`📄 ${file}`);
    for (const issue of issues) {
      console.log(`   - ${issue.prop}: ${issue.suggestion}`);
    }
    console.log('');
  }

  console.log('Fix by adding to argTypes in the story meta:');
  console.log('  argTypes: {');
  console.log('    propName: { control: false },');
  console.log('  }');
}
