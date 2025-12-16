import { test, expect } from '@playwright/test';

test('Check Applications page for console errors', async ({ page }) => {
  // Collect all console messages
  const consoleMessages: string[] = [];
  const consoleErrors: string[] = [];
  
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    
    if (type === 'error') {
      consoleErrors.push(text);
      console.log(`❌ Console Error: ${text}`);
    } else if (type === 'warning') {
      consoleMessages.push(text);
      console.log(`⚠️ Console Warning: ${text}`);
    }
  });

  // Navigate to the Applications page
  await page.goto('http://localhost:3000/multipage-example.html');
  
  // Wait for page to load
  await page.waitForTimeout(2000);
  
  // Click on Applications in the navigation
  await page.click('text=Applications');
  
  // Wait for the Applications page to load
  await page.waitForTimeout(3000);
  
  // Check if the page loaded successfully
  const pageTitle = await page.textContent('h1');
  console.log(`\n📄 Page loaded with title: ${pageTitle}`);
  
  // Check for any visible error messages on the page
  const errorBoundary = await page.locator('text=Error loading component').count();
  if (errorBoundary > 0) {
    console.log('❌ Error boundary triggered on page');
  }
  
  // Report console errors
  console.log('\n=== CONSOLE ERROR SUMMARY ===');
  if (consoleErrors.length === 0) {
    console.log('✅ No console errors detected');
  } else {
    console.log(`❌ Found ${consoleErrors.length} console error(s):`);
    consoleErrors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error}`);
    });
  }
  
  // Take a screenshot for reference
  await page.screenshot({ path: 'applications-page.png', fullPage: true });
  console.log('\n📸 Screenshot saved as applications-page.png');
  
  // Assert no console errors
  expect(consoleErrors.length).toBe(0);
});