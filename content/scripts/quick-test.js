const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Capture console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  try {
    console.log('🧪 Testing Document Editor page...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
    
    // Click Document Editor menu item
    const documentEditorMenu = await page.waitForSelector('text=Document Editor', { timeout: 10000 });
    await documentEditorMenu.click();
    await page.waitForTimeout(3000);
    
    // Check if page loaded successfully
    const hasHeading = await page.$('text=Compliance Overview');
    const hasCategoryBreakdown = await page.$('text=Compliance by Category');
    
    console.log('✅ Results:');
    console.log('- Compliance Overview heading:', hasHeading ? '✅ Found' : '❌ Missing');
    console.log('- Category Breakdown:', hasCategoryBreakdown ? '✅ Found' : '❌ Missing');
    console.log('- Console errors:', errors.length);
    
    if (errors.length > 0) {
      console.log('❌ Errors found:', errors.slice(0, 3));
    } else {
      console.log('✅ No console errors detected');
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();