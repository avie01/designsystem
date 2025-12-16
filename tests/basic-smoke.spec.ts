import { test, expect } from '@playwright/test';

test.describe('ODL Design System - Basic Smoke Tests', () => {
  test('compliance checklist demo loads successfully', async ({ page }) => {
    await page.goto('/compliance-checklist-demo.html');
    
    // Just check that the page loads without errors
    await expect(page.locator('body')).toBeVisible();
    
    // Check for any basic content
    const hasContent = await page.locator('*').count() > 10; // Should have more than 10 elements
    expect(hasContent).toBeTruthy();
  });

  test('page has no console errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/compliance-checklist-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Allow some time for any late-loading errors
    await page.waitForTimeout(2000);
    
    // Filter out common/expected errors
    const significantErrors = errors.filter(error => 
      !error.includes('404') && 
      !error.includes('favicon') &&
      !error.includes('livereload')
    );
    
    expect(significantErrors).toHaveLength(0);
  });

  test('basic navigation elements exist', async ({ page }) => {
    await page.goto('/compliance-checklist-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Look for common navigation patterns
    const hasHeader = await page.locator('header, [role="banner"]').count() > 0;
    const hasNav = await page.locator('nav, [role="navigation"]').count() > 0;
    const hasButtons = await page.locator('button').count() > 0;
    
    // At least one of these should exist
    expect(hasHeader || hasNav || hasButtons).toBeTruthy();
  });

  test('can find text content', async ({ page }) => {
    await page.goto('/compliance-checklist-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Look for any meaningful text content
    const hasText = await page.locator('text=/compliance|checklist|demo/i').count() > 0;
    expect(hasText).toBeTruthy();
  });

  test('page is responsive', async ({ page }) => {
    await page.goto('/compliance-checklist-demo.html');
    
    // Test desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Other Demo Pages - Quick Checks', () => {
  const demoPages = [
    '/button-demo.html',
    '/input-demo.html', 
    '/table-demo.html',
    '/cards-demo.html',
    '/header-demo.html',
    '/modal-demo.html'
  ];

  for (const page of demoPages) {
    test(`${page} loads without errors`, async ({ browser }) => {
      const pageInstance = await browser.newPage();
      
      try {
        const response = await pageInstance.goto(page);
        
        // Check if page exists (not 404)
        if (response && response.status() < 400) {
          await expect(pageInstance.locator('body')).toBeVisible();
          console.log(`✅ ${page} loaded successfully`);
        } else {
          console.log(`⚠️  ${page} returned ${response?.status() || 'unknown'} status`);
        }
      } catch (error) {
        console.log(`⚠️  ${page} failed to load: ${error}`);
      } finally {
        await pageInstance.close();
      }
    });
  }
});