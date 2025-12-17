// Temporary file to check the ComplianceChecklistPage.tsx
const fs = require('fs');
const content = fs.readFileSync('/Users/andrewk/Documents/ODL-Library/Isovist/src/pages/admin/ComplianceChecklistPage.tsx', 'utf8');
const lines = content.split('\n');
console.log('Total lines:', lines.length);
console.log('Line 2210-2215:');
for(let i = 2209; i < 2215 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
