import { test } from '@playwright/test';

test('Check document alignment', async ({ page }) => {
  // Go directly to the page
  await page.goto('http://localhost:3000/multipage-example.html');
  
  // Click Document Editor
  await page.click('text=Document Editor');
  await page.waitForTimeout(1000);
  
  // Click Document tab
  await page.click('button:has-text("Document")');
  await page.waitForTimeout(1000);
  
  // Check the alignment style
  const wrapper = await page.locator('div').filter({ hasText: 'COMPLIANCE CHECKLIST REPORT' }).first().locator('..');
  
  const justifyContent = await wrapper.evaluate(el => {
    const parent = el.parentElement;
    if (parent) {
      return window.getComputedStyle(parent).justifyContent;
    }
    return 'unknown';
  });
  
  console.log('\n=== DOCUMENT ALIGNMENT CHECK ===');
  console.log(`The document container's justify-content is: ${justifyContent}`);
  if (justifyContent === 'center') {
    console.log('✗ Document is CENTERED');
  } else if (justifyContent === 'flex-start') {
    console.log('✓ Document is LEFT-ALIGNED');
  } else {
    console.log(`? Document alignment is: ${justifyContent}`);
  }
  console.log('================================\n');
  
  // Take screenshot
  await page.screenshot({ path: 'document-alignment.png' });
});