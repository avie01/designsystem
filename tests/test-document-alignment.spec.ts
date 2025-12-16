import { test, expect } from '@playwright/test';

test('Check document alignment in Document Editor', async ({ page }) => {
  // Navigate to the Document Editor page
  await page.goto('http://localhost:3000/multipage-example.html');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Click on Document Editor in the navigation
  await page.click('text=Document Editor');
  
  // Wait for the Document Editor to load
  await page.waitForTimeout(2000);
  
  // Click on the Document tab
  await page.click('button:has-text("Document")');
  
  // Wait for document view to render
  await page.waitForTimeout(1000);
  
  // Set viewport to full screen dimensions
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Get the document container element
  const documentContainer = await page.locator('div').filter({ 
    has: page.locator('h1:has-text("COMPLIANCE CHECKLIST REPORT")') 
  }).first();
  
  // Get the parent wrapper that controls alignment
  const parentWrapper = await documentContainer.locator('..').first();
  
  // Get computed styles
  const parentStyles = await parentWrapper.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      display: styles.display,
      justifyContent: styles.justifyContent,
      alignItems: styles.alignItems,
      textAlign: styles.textAlign
    };
  });
  
  // Get bounding box of document
  const documentBox = await documentContainer.boundingBox();
  const parentBox = await parentWrapper.boundingBox();
  
  // Calculate position relative to parent
  let alignment = 'unknown';
  if (documentBox && parentBox) {
    const leftOffset = documentBox.x - parentBox.x;
    const rightOffset = (parentBox.x + parentBox.width) - (documentBox.x + documentBox.width);
    const centerThreshold = 50; // pixels
    
    console.log('Document position analysis:');
    console.log(`- Document left offset: ${leftOffset}px`);
    console.log(`- Document right offset: ${rightOffset}px`);
    console.log(`- Document width: ${documentBox.width}px`);
    console.log(`- Parent width: ${parentBox.width}px`);
    
    if (Math.abs(leftOffset - rightOffset) < centerThreshold) {
      alignment = 'centered';
    } else if (leftOffset < rightOffset) {
      alignment = 'left-aligned';
    } else {
      alignment = 'right-aligned';
    }
  }
  
  console.log('\n=== Document Alignment Analysis ===');
  console.log('Parent container styles:', parentStyles);
  console.log(`Document alignment: ${alignment}`);
  console.log('===================================\n');
  
  // Take a screenshot for visual verification
  await page.screenshot({ 
    path: 'document-alignment-check.png',
    fullPage: false
  });
  
  console.log('Screenshot saved as document-alignment-check.png');
});