/**
 * Automated Storybook Props Audit Script
 * Systematically checks each story for broken props that display raw code
 */

const fs = require('fs');
const path = require('path');

// Get all story files
const storyFiles = [
  'src/components/Header/Header.stories.tsx',
  'src/components/Table/Table.stories.tsx',
  'src/templates/PageTemplates.stories.tsx',
  'src/components/Icon/CarbonIcons.stories.tsx',
  'src/components/Chip/ChipMUI.stories.tsx',
  'src/components/Drawer/Drawer.stories.tsx',
  'src/components/Accordion/Accordion.stories.tsx',
  'src/components/Graph/Graph.stories.tsx',
  'src/components/Stepper/Stepper.stories.tsx',
  'src/components/ChartCard/ChartCard.stories.tsx',
  'src/components/StatsCard/StatsCard.stories.tsx',
  'src/components/StatsGrid/StatsGrid.stories.tsx',
  'src/components/Tabs/Tabs.stories.tsx',
  'src/components/SimpleTabs/SimpleTabs.stories.tsx',
  'src/components/Dropdown/Dropdown.stories.tsx',
  'src/components/List/List.stories.tsx',
  'src/components/CollapsibleCard/CollapsibleCard.stories.tsx',
  'src/components/NavigationRail/NavigationRail.stories.tsx',
  'src/components/Modal/Modal.stories.tsx',
  'src/components/Cards/Cards.stories.tsx',
  'src/components/AlertBanner/AlertBanner.stories.tsx',
  'src/components/Icon/Icon.stories.tsx',
  'src/components/StatusCard/StatusCard.stories.tsx',
  'src/components/Button/Button.stories.tsx',
  'src/components/Input/Input.stories.tsx',
  'src/components/Breadcrumb/Breadcrumb.stories.tsx',
  'src/components/DocumentTreemap/DocumentTreemap.stories.tsx',
  'src/components/ApplicationDetailCard/ApplicationDetailCard.stories.tsx',
  'src/components/DocumentLibraryCard/DocumentLibraryCard.stories.tsx',
  'src/components/UserCard/UserCard.stories.tsx',
  'src/components/Treemap/Treemap.stories.tsx',
  'src/components/SimpleEditor/SimpleEditor.stories.tsx',
  'src/components/DualPaneExplorer/DualPaneExplorer.stories.tsx',
  'src/components/TreeNavigation/TreeNavigation.stories.tsx',
  'src/components/Kanban/Kanban.stories.tsx',
  'src/components/MillerColumns/MillerColumns.stories.tsx',
  'src/components/BackToTop/BackToTop.stories.tsx',
  'src/components/ErrorBoundary/ErrorBoundary.stories.tsx',
  'src/styles/ODLTheme.stories.tsx',
  'src/components/AdvancedTable/AdvancedTable.stories.tsx',
  'src/templates/ODLPageTemplates.stories.tsx',
  'src/components/FileUpload/FileUpload.stories.tsx',
  'src/components/UserAvatar/UserAvatar.stories.tsx',
  'src/components/Popover/Popover.stories.tsx',
  'src/components/Card/Card.stories.tsx',
  'src/components/YellowFolder/YellowFolder.stories.tsx',
  'src/components/AlertPanel/AlertPanel.stories.tsx',
  'src/components/BreadcrumbGrid/BreadcrumbGrid.stories.tsx',
  'src/components/ColumnSelectionTree/ColumnSelectionTree.stories.tsx',
  'src/components/PageTemplate/PageTemplate.stories.tsx',
  'src/components/PageManager/PageManager.stories.tsx',
];

// Extract story metadata from each file
const storyMetadata = [];

storyFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');

  // Extract title from meta
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const title = titleMatch ? titleMatch[1] : 'Unknown';

  // Extract story names (exports)
  const storyMatches = content.matchAll(/export\s+const\s+(\w+):\s*Story/g);
  const stories = Array.from(storyMatches).map(match => match[1]);

  // Check for argTypes with potential issues
  const hasArgTypes = content.includes('argTypes:');
  const hasMappingControl = content.includes('mapping:');
  const hasControlFalse = content.includes("control: false") || content.includes("control: 'false'");
  const hasRenderFunction = content.includes('render:') || content.includes('render() {');

  // Check for specific problematic patterns
  const hasTriggerProp = content.includes('trigger:');
  const hasContentProp = content.includes('content:');
  const hasChildrenProp = content.includes('children:');
  const callbackPropsMatches = content.match(/on[A-Z]\w+:/g);

  storyMetadata.push({
    file,
    title,
    stories,
    hasArgTypes,
    hasMappingControl,
    hasControlFalse,
    hasRenderFunction,
    hasTriggerProp,
    hasContentProp,
    hasChildrenProp,
    callbackProps: callbackPropsMatches ? Array.from(new Set(callbackPropsMatches)) : [],
  });
});

// Generate report
console.log('\n=== STORYBOOK PROPS AUDIT REPORT ===\n');
console.log(`Total story files: ${storyMetadata.length}`);
console.log(`Total stories: ${storyMetadata.reduce((sum, s) => sum + s.stories.length, 0)}\n`);

console.log('=== POTENTIAL ISSUES ===\n');

// Components with trigger/content props (high risk for [object Object])
const withComplexProps = storyMetadata.filter(s =>
  s.hasTriggerProp || s.hasContentProp || s.hasChildrenProp
);

console.log('📌 Components with complex ReactNode props (HIGH RISK):');
withComplexProps.forEach(s => {
  console.log(`  - ${s.title} (${s.file})`);
  if (s.hasTriggerProp) console.log('    ⚠️  Has trigger prop');
  if (s.hasContentProp) console.log('    ⚠️  Has content prop');
  if (s.hasChildrenProp) console.log('    ⚠️  Has children prop');
  if (!s.hasRenderFunction && !s.hasMappingControl) {
    console.log('    ❌ No render function or mapping control detected!');
  }
  console.log(`    Stories: ${s.stories.join(', ')}`);
  console.log('');
});

// Components with callback props
const withCallbacks = storyMetadata.filter(s => s.callbackProps.length > 0);
console.log('\n📌 Components with callback props (may show code):');
withCallbacks.forEach(s => {
  console.log(`  - ${s.title} (${s.file})`);
  console.log(`    Props: ${s.callbackProps.join(', ')}`);
  console.log(`    Stories: ${s.stories.join(', ')}`);
  console.log('');
});

// Generate Storybook URLs for manual checking
console.log('\n=== STORYBOOK URLS TO CHECK ===\n');

withComplexProps.forEach(s => {
  const storyPath = s.title.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
  s.stories.forEach(story => {
    const storyName = story.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    const url = `http://localhost:6006/?path=/story/${storyPath}--${storyName}`;
    console.log(`${s.title} - ${story}:`);
    console.log(`  ${url}\n`);
  });
});

// Save detailed JSON report
const report = {
  timestamp: new Date().toISOString(),
  totalFiles: storyMetadata.length,
  totalStories: storyMetadata.reduce((sum, s) => sum + s.stories.length, 0),
  highRiskComponents: withComplexProps.map(s => ({
    title: s.title,
    file: s.file,
    stories: s.stories,
    issues: {
      hasTriggerProp: s.hasTriggerProp,
      hasContentProp: s.hasContentProp,
      hasChildrenProp: s.hasChildrenProp,
      hasRenderFunction: s.hasRenderFunction,
      hasMappingControl: s.hasMappingControl,
    }
  })),
  allComponents: storyMetadata,
};

fs.writeFileSync(
  path.join(__dirname, 'storybook-audit-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n✅ Detailed report saved to: storybook-audit-report.json\n');
