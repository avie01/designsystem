/**
 * Automated Storybook Props Audit - Chrome DevTools MCP Version
 * This script generates commands to check each high-risk component
 */

const highRiskComponents = [
  // Components flagged with NO render function or mapping control
  { title: 'Accordion', path: 'components-layout-accordion', hasContent: true, hasChildren: true },
  { title: 'Stepper', path: 'components-forms-stepper', hasContent: true },
  { title: 'AlertBanner', path: 'components-alertbanner', hasChildren: true },
  { title: 'DualPaneExplorer', path: 'components-datavisualization-dualpaneexplorer', hasContent: true, hasChildren: true },
  { title: 'TreeNavigation', path: 'components-navigation-treenavigation', hasChildren: true },
  { title: 'MillerColumns', path: 'components-advanced-millercolumns', hasChildren: true },
  { title: 'BreadcrumbGrid', path: 'components-navigation-breadcrumbgrid', hasChildren: true },
  { title: 'PageTemplate', path: 'components-layout-pagetemplate', hasChildren: true },

  // Components with complex props but MAY have render/mapping (need verification)
  { title: 'Tabs', path: 'components-navigation-tabs', hasContent: true },
  { title: 'SimpleTabs', path: 'components-navigation-simpletabs', hasContent: true },
  { title: 'List', path: 'components-datadisplay-list', hasChildren: true },
  { title: 'CollapsibleCard', path: 'components-cards-collapsiblecard', hasChildren: true },
  { title: 'Modal', path: 'components-modal', hasChildren: true },
  { title: 'Button', path: 'components-button', hasChildren: true },
  { title: 'SimpleEditor', path: 'components-editors-simpleeditor', hasContent: true },
  { title: 'ErrorBoundary', path: 'components-utilities-errorboundary', hasChildren: true },
  { title: 'Popover', path: 'components-overlays-popover', hasTrigger: true, hasContent: true },
  { title: 'Card', path: 'components-layout-card', hasChildren: true },
];

// Generate report
console.log('=== HIGH RISK COMPONENTS AUDIT ===\n');
console.log('Components to check in Storybook:\n');

highRiskComponents.forEach((comp, index) => {
  console.log(`${index + 1}. ${comp.title}`);
  console.log(`   URL: http://localhost:6006/?path=/docs/${comp.path}--docs`);
  console.log(`   Props to check:`);
  if (comp.hasTrigger) console.log(`     - trigger (should have dropdown or render function, not code)`);
  if (comp.hasContent) console.log(`     - content (should have dropdown or render function, not code)`);
  if (comp.hasChildren) console.log(`     - children (should be disabled or have render function, not code)`);
  console.log('');
});

console.log('\n=== WHAT TO LOOK FOR ===');
console.log('In the Controls table:');
console.log('  ✅ GOOD: Dropdown with options (mapping works)');
console.log('  ✅ GOOD: No control / disabled (using render function)');
console.log('  ❌ BAD: Shows [object Object]');
console.log('  ❌ BAD: Shows () => {} or function code');
console.log('  ❌ BAD: Shows "ReactReactElement" with editable field');
console.log('');

// Generate JSON for programmatic checking
const checkList = highRiskComponents.map(comp => ({
  component: comp.title,
  docsUrl: `http://localhost:6006/?path=/docs/${comp.path}--docs`,
  propsToCheck: [
    comp.hasTrigger && 'trigger',
    comp.hasContent && 'content',
    comp.hasChildren && 'children',
  ].filter(Boolean),
}));

console.log('=== CHECKLIST JSON ===');
console.log(JSON.stringify(checkList, null, 2));
