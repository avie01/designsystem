/**
 * Automated browser-based Storybook checker
 * Opens each story and checks for broken props
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

// High-risk stories to check (from the audit)
const storiesToCheck = [
  // Popover - highest risk (trigger + content props)
  { url: 'http://localhost:6006/?path=/story/components-overlays-popover--bottom-start', component: 'Popover', story: 'BottomStart' },
  { url: 'http://localhost:6006/?path=/story/components-overlays-popover--top-center', component: 'Popover', story: 'TopCenter' },
  { url: 'http://localhost:6006/?path=/story/components-overlays-popover--color-picker', component: 'Popover', story: 'ColorPicker' },

  // Accordion
  { url: 'http://localhost:6006/?path=/story/components-layout-accordion--default', component: 'Accordion', story: 'Default' },

  // Stepper
  { url: 'http://localhost:6006/?path=/story/components-forms-stepper--horizontal-default', component: 'Stepper', story: 'HorizontalDefault' },

  // Tabs
  { url: 'http://localhost:6006/?path=/story/components-navigation-tabs--default', component: 'Tabs', story: 'Default' },

  // SimpleTabs
  { url: 'http://localhost:6006/?path=/story/components-navigation-simpletabs--default', component: 'SimpleTabs', story: 'Default' },

  // List
  { url: 'http://localhost:6006/?path=/story/components-datadisplay-list--default', component: 'List', story: 'Default' },

  // CollapsibleCard
  { url: 'http://localhost:6006/?path=/story/components-cards-collapsiblecard--default', component: 'CollapsibleCard', story: 'Default' },

  // Modal
  { url: 'http://localhost:6006/?path=/story/components-modal--default', component: 'Modal', story: 'Default' },

  // AlertBanner
  { url: 'http://localhost:6006/?path=/story/components-alertbanner--info', component: 'AlertBanner', story: 'Info' },

  // Button
  { url: 'http://localhost:6006/?path=/story/components-button--default', component: 'Button', story: 'Default' },

  // SimpleEditor
  { url: 'http://localhost:6006/?path=/story/components-editors-simpleeditor--default', component: 'SimpleEditor', story: 'Default' },

  // DualPaneExplorer
  { url: 'http://localhost:6006/?path=/story/components-datavisualization-dualpaneexplorer--default', component: 'DualPaneExplorer', story: 'Default' },

  // TreeNavigation
  { url: 'http://localhost:6006/?path=/story/components-navigation-treenavigation--default', component: 'TreeNavigation', story: 'Default' },

  // MillerColumns
  { url: 'http://localhost:6006/?path=/story/components-advanced-millercolumns--default', component: 'MillerColumns', story: 'Default' },

  // ErrorBoundary
  { url: 'http://localhost:6006/?path=/story/components-utilities-errorboundary--default', component: 'ErrorBoundary', story: 'Default' },

  // Card
  { url: 'http://localhost:6006/?path=/story/components-layout-card--default', component: 'Card', story: 'Default' },

  // BreadcrumbGrid
  { url: 'http://localhost:6006/?path=/story/components-navigation-breadcrumbgrid--default', component: 'BreadcrumbGrid', story: 'Default' },

  // PageTemplate
  { url: 'http://localhost:6006/?path=/story/components-layout-pagetemplate--default', component: 'PageTemplate', story: 'Default' },
];

async function checkStorybook() {
  console.log('Launching browser...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  const issues = [];

  for (const story of storiesToCheck) {
    console.log(`Checking ${story.component} - ${story.story}...`);

    try {
      await page.goto(story.url, { waitUntil: 'networkidle2', timeout: 10000 });
      await page.waitForTimeout(2000); // Wait for story to render

      // Check for common broken prop indicators
      const pageContent = await page.content();

      // Look for broken prop patterns
      const hasBrokenProps =
        pageContent.includes('[object Object]') ||
        pageContent.includes('() =&gt; {}') ||
        pageContent.includes('() => {}') ||
        pageContent.includes('function ()') ||
        pageContent.includes('undefined') && pageContent.includes('argTypes');

      // Check controls panel
      const controlsText = await page.evaluate(() => {
        const controls = document.querySelector('[id="control-"]') ||
                        document.querySelector('[class*="control"]') ||
                        document.querySelector('[aria-label*="Controls"]');
        return controls ? controls.textContent : '';
      });

      // Check for errors in console
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Take screenshot of controls panel
      const screenshotPath = `/Users/andrewk/Documents/ODL-Library/odl-design-system/content/screenshots/${story.component}-${story.story}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: false });

      if (hasBrokenProps || controlsText.includes('[object Object]') || controlsText.includes('() =>')) {
        issues.push({
          component: story.component,
          story: story.story,
          url: story.url,
          issue: 'Broken props detected in controls or docs',
          screenshot: screenshotPath,
        });
        console.log(`  ❌ ISSUE FOUND: Broken props detected`);
      } else {
        console.log(`  ✅ OK`);
      }

    } catch (error) {
      issues.push({
        component: story.component,
        story: story.story,
        url: story.url,
        issue: `Error loading story: ${error.message}`,
      });
      console.log(`  ❌ ERROR: ${error.message}`);
    }
  }

  await browser.close();

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    totalChecked: storiesToCheck.length,
    issuesFound: issues.length,
    issues: issues,
  };

  fs.writeFileSync(
    '/Users/andrewk/Documents/ODL-Library/odl-design-system/content/browser-check-report.json',
    JSON.stringify(report, null, 2)
  );

  console.log(`\n=== RESULTS ===`);
  console.log(`Total stories checked: ${storiesToCheck.length}`);
  console.log(`Issues found: ${issues.length}\n`);

  if (issues.length > 0) {
    console.log('Components with issues:');
    issues.forEach(issue => {
      console.log(`  - ${issue.component} - ${issue.story}: ${issue.issue}`);
    });
  }

  console.log('\nReport saved to: browser-check-report.json');
}

// Check if puppeteer is installed
try {
  require.resolve('puppeteer');
  checkStorybook();
} catch(e) {
  console.log('Puppeteer not installed. Install it with: npm install -D puppeteer');
  console.log('Running manual check mode instead...\n');

  // Manual check mode - just output URLs
  console.log('=== MANUAL CHECK LIST ===\n');
  console.log('Open each URL and check the Controls panel for:');
  console.log('  - Props showing [object Object]');
  console.log('  - Props showing () => {}');
  console.log('  - Props showing function code instead of controls\n');

  storiesToCheck.forEach(story => {
    console.log(`${story.component} - ${story.story}:`);
    console.log(`  ${story.url}\n`);
  });
}
