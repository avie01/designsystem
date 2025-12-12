/**
 * Fully Automated Storybook Props Audit
 * Reads story files and analyzes their argTypes configuration
 */

const fs = require('fs');
const path = require('path');

// Components flagged as high-risk from static analysis
const highRiskComponents = [
  { name: 'Accordion', file: 'src/components/Accordion/Accordion.stories.tsx', props: ['content', 'children'] },
  { name: 'Stepper', file: 'src/components/Stepper/Stepper.stories.tsx', props: ['content'] },
  { name: 'AlertBanner', file: 'src/components/AlertBanner/AlertBanner.stories.tsx', props: ['children'] },
  { name: 'DualPaneExplorer', file: 'src/components/DualPaneExplorer/DualPaneExplorer.stories.tsx', props: ['content', 'children'] },
  { name: 'TreeNavigation', file: 'src/components/TreeNavigation/TreeNavigation.stories.tsx', props: ['children'] },
  { name: 'MillerColumns', file: 'src/components/MillerColumns/MillerColumns.stories.tsx', props: ['children'] },
  { name: 'BreadcrumbGrid', file: 'src/components/BreadcrumbGrid/BreadcrumbGrid.stories.tsx', props: ['children'] },
  { name: 'PageTemplate', file: 'src/components/PageTemplate/PageTemplate.stories.tsx', props: ['children'] },
  { name: 'Tabs', file: 'src/components/Tabs/Tabs.stories.tsx', props: ['content'] },
  { name: 'SimpleTabs', file: 'src/components/SimpleTabs/SimpleTabs.stories.tsx', props: ['content'] },
  { name: 'List', file: 'src/components/List/List.stories.tsx', props: ['children'] },
  { name: 'CollapsibleCard', file: 'src/components/CollapsibleCard/CollapsibleCard.stories.tsx', props: ['children'] },
  { name: 'Modal', file: 'src/components/Modal/Modal.stories.tsx', props: ['children'] },
  { name: 'Button', file: 'src/components/Button/Button.stories.tsx', props: ['children'] },
  { name: 'SimpleEditor', file: 'src/components/SimpleEditor/SimpleEditor.stories.tsx', props: ['content'] },
  { name: 'ErrorBoundary', file: 'src/components/ErrorBoundary/ErrorBoundary.stories.tsx', props: ['children'] },
  { name: 'Popover', file: 'src/components/Popover/Popover.stories.tsx', props: ['trigger', 'content'] },
  { name: 'Card', file: 'src/components/Card/Card.stories.tsx', props: ['children'] },
];

const issues = [];
const goodComponents = [];

console.log('=== AUTOMATED STORYBOOK PROPS AUDIT ===\n');
console.log('Analyzing argTypes configuration in story files...\n');

highRiskComponents.forEach(component => {
  const fullPath = path.join(__dirname, component.file);

  if (!fs.existsSync(fullPath)) {
    issues.push({
      component: component.name,
      file: component.file,
      severity: 'ERROR',
      issue: 'Story file not found',
    });
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');

  // Check for each problematic prop
  component.props.forEach(prop => {
    // Look for argTypes configuration for this prop
    const argTypePattern = new RegExp(`${prop}:\\s*\\{[^}]*\\}`, 's');
    const argTypeMatch = content.match(argTypePattern);

    if (!argTypeMatch) {
      // No argTypes configured - check if using render function
      const hasRenderFunction = content.includes('render:') || content.includes('render() {');

      if (!hasRenderFunction) {
        issues.push({
          component: component.name,
          file: component.file,
          severity: 'HIGH',
          prop: prop,
          issue: `No argTypes configuration found for '${prop}' and no render function detected`,
          recommendation: `Add argTypes with 'control: false' or use render function for stories`,
        });
      } else {
        goodComponents.push({
          component: component.name,
          prop: prop,
          solution: 'Using render function (stories define component inline)',
        });
      }
    } else {
      // ArgTypes found - check configuration
      const argTypeConfig = argTypeMatch[0];

      const hasControlFalse = argTypeConfig.includes("control: false") || argTypeConfig.includes("control: 'false'");
      const hasMapping = argTypeConfig.includes('mapping:');
      const hasRenderFunction = content.includes('render:') || content.includes('render() {');

      if (!hasControlFalse && !hasMapping && !hasRenderFunction) {
        issues.push({
          component: component.name,
          file: component.file,
          severity: 'HIGH',
          prop: prop,
          issue: `ArgTypes for '${prop}' exists but has no 'control: false' or 'mapping'`,
          recommendation: `Add 'control: false' to disable the control, or add 'mapping' with presets`,
          argTypesConfig: argTypeConfig.substring(0, 200) + '...',
        });
      } else if (hasMapping) {
        // Check if mapping is properly configured
        const mappingPattern = /mapping:\s*(\w+)/;
        const mappingMatch = argTypeConfig.match(mappingPattern);

        if (mappingMatch) {
          const mappingVar = mappingMatch[1];
          const hasMappingVariable = content.includes(`const ${mappingVar}`);

          if (!hasMappingVariable) {
            issues.push({
              component: component.name,
              file: component.file,
              severity: 'MEDIUM',
              prop: prop,
              issue: `Mapping variable '${mappingVar}' referenced but not defined`,
              recommendation: `Define 'const ${mappingVar}: Record<string, React.ReactNode>' with preset options`,
            });
          } else {
            goodComponents.push({
              component: component.name,
              prop: prop,
              solution: `Using mapping presets (${mappingVar})`,
            });
          }
        }
      } else if (hasControlFalse) {
        goodComponents.push({
          component: component.name,
          prop: prop,
          solution: 'Control disabled (control: false)',
        });
      } else if (hasRenderFunction) {
        goodComponents.push({
          component: component.name,
          prop: prop,
          solution: 'Using render function',
        });
      }
    }
  });
});

// Print results
console.log('=== ISSUES FOUND ===\n');

if (issues.length === 0) {
  console.log('✅ No issues found! All components properly configured.\n');
} else {
  // Group by severity
  const highSeverity = issues.filter(i => i.severity === 'HIGH');
  const mediumSeverity = issues.filter(i => i.severity === 'MEDIUM');
  const errors = issues.filter(i => i.severity === 'ERROR');

  if (errors.length > 0) {
    console.log('🔴 ERRORS:\n');
    errors.forEach(issue => {
      console.log(`  Component: ${issue.component}`);
      console.log(`  File: ${issue.file}`);
      console.log(`  Issue: ${issue.issue}\n`);
    });
  }

  if (highSeverity.length > 0) {
    console.log('🔴 HIGH SEVERITY ISSUES:\n');
    highSeverity.forEach(issue => {
      console.log(`  Component: ${issue.component}`);
      console.log(`  Prop: ${issue.prop}`);
      console.log(`  File: ${issue.file}`);
      console.log(`  Issue: ${issue.issue}`);
      console.log(`  Recommendation: ${issue.recommendation}\n`);
    });
  }

  if (mediumSeverity.length > 0) {
    console.log('🟡 MEDIUM SEVERITY ISSUES:\n');
    mediumSeverity.forEach(issue => {
      console.log(`  Component: ${issue.component}`);
      console.log(`  Prop: ${issue.prop}`);
      console.log(`  File: ${issue.file}`);
      console.log(`  Issue: ${issue.issue}`);
      console.log(`  Recommendation: ${issue.recommendation}\n`);
    });
  }
}

console.log('=== PROPERLY CONFIGURED COMPONENTS ===\n');
goodComponents.forEach(comp => {
  console.log(`  ✅ ${comp.component} (${comp.prop}): ${comp.solution}`);
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total components checked: ${highRiskComponents.length}`);
console.log(`Total props analyzed: ${highRiskComponents.reduce((sum, c) => sum + c.props.length, 0)}`);
console.log(`Issues found: ${issues.length}`);
console.log(`Properly configured: ${goodComponents.length}`);
console.log(`\nSuccess rate: ${Math.round((goodComponents.length / (goodComponents.length + issues.length)) * 100)}%\n`);

// Save detailed report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalComponents: highRiskComponents.length,
    totalProps: highRiskComponents.reduce((sum, c) => sum + c.props.length, 0),
    issuesFound: issues.length,
    properlyConfigured: goodComponents.length,
  },
  issues,
  goodComponents,
};

fs.writeFileSync(
  path.join(__dirname, 'storybook-props-audit-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('📄 Detailed report saved to: storybook-props-audit-report.json\n');

// Exit with error code if issues found
process.exit(issues.length > 0 ? 1 : 0);
