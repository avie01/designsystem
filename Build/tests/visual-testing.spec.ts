import { test, expect } from '@playwright/test';

test.describe('Visual Testing - ODL Components', () => {
  // Test component showcase page
  test('component showcase visual regression', async ({ page }) => {
    await page.goto('/components-showcase.html');
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('components-showcase-full.png');
  });

  // Test individual component demos
  test('button demo visual regression', async ({ page }) => {
    await page.goto('/button-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Screenshot of the button demo section
    const demoSection = page.locator('[data-testid="demo-section"]').first();
    await expect(demoSection).toHaveScreenshot('button-demo-section.png');
  });

  test('input demo visual regression', async ({ page }) => {
    await page.goto('/input-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Screenshot of input variations
    const inputSection = page.locator('[data-testid="demo-section"]').first();
    await expect(inputSection).toHaveScreenshot('input-demo-section.png');
  });

  test('table demo visual regression', async ({ page }) => {
    await page.goto('/table-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Wait for table to load data
    await page.waitForSelector('table tbody tr');
    
    // Screenshot of table
    const tableSection = page.locator('[data-testid="demo-section"]').first();
    await expect(tableSection).toHaveScreenshot('table-demo-section.png');
  });

  test('graph demo visual regression', async ({ page }) => {
    await page.goto('/graph-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Wait for charts to render
    await page.waitForTimeout(2000);
    
    // Screenshot of graphs
    const graphSection = page.locator('[data-testid="demo-section"]').first();
    await expect(graphSection).toHaveScreenshot('graph-demo-section.png');
  });

  test('modal demo visual regression', async ({ page }) => {
    await page.goto('/modal-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Open a modal first
    const openModalButton = page.locator('button:has-text("Open Modal")').first();
    if (await openModalButton.isVisible()) {
      await openModalButton.click();
      await page.waitForTimeout(500); // Animation time
      
      // Screenshot of open modal
      await expect(page).toHaveScreenshot('modal-demo-open.png');
      
      // Close modal
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
    
    // Screenshot of modal demo page
    const modalSection = page.locator('[data-testid="demo-section"]').first();
    await expect(modalSection).toHaveScreenshot('modal-demo-section.png');
  });

  test('header variants visual regression', async ({ page }) => {
    await page.goto('/header-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Screenshot each header variant
    const headerVariants = ['build', 'connect', 'keystone', 'nexus', 'regworks', '3sixty'];
    
    for (const variant of headerVariants) {
      // Switch to variant if there's a selector
      const variantButton = page.locator(`button:has-text("${variant}")`).first();
      if (await variantButton.isVisible()) {
        await variantButton.click();
        await page.waitForTimeout(300);
      }
      
      // Screenshot of header
      const header = page.locator('header').first();
      await expect(header).toHaveScreenshot(`header-${variant}.png`);
    }
  });
});

test.describe('Visual Testing - Full Applications', () => {
  test('multipage example visual regression', async ({ page }) => {
    await page.goto('/multipage-example.html');
    await page.waitForLoadState('networkidle');
    
    // Screenshot of main dashboard
    await expect(page).toHaveScreenshot('multipage-dashboard.png');
    
    // Test navigation to different pages
    const navItems = [
      'Applications',
      'Active Workflows', 
      'Task Scheduling',
      'Total Documents',
      'Internal Referrals',
      'Compliance Checklist'
    ];
    
    for (const item of navItems) {
      const navLink = page.locator(`[data-testid="nav-${item.toLowerCase().replace(/ /g, '-')}"]`);
      if (await navLink.isVisible()) {
        await navLink.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000); // Wait for any animations
        
        // Screenshot of the page
        await expect(page).toHaveScreenshot(`multipage-${item.toLowerCase().replace(/ /g, '-')}.png`);
      }
    }
  });

  test('council dashboard visual regression', async ({ page }) => {
    await page.goto('/council-dashboard.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for charts to load
    
    // Full page screenshot
    await expect(page).toHaveScreenshot('council-dashboard-full.png');
  });
});

test.describe('Visual Testing - Responsive Design', () => {
  test('mobile responsive visual regression', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/components-showcase.html');
    await page.waitForLoadState('networkidle');
    
    // Mobile screenshot
    await expect(page).toHaveScreenshot('components-showcase-mobile.png');
    
    // Test mobile navigation if it exists
    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('mobile-menu-open.png');
    }
  });

  test('tablet responsive visual regression', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/multipage-example.html');
    await page.waitForLoadState('networkidle');
    
    // Tablet screenshot
    await expect(page).toHaveScreenshot('multipage-tablet.png');
  });
});

test.describe('Visual Testing - Component States', () => {
  test('button states visual regression', async ({ page }) => {
    await page.goto('/button-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Test different button states
    const primaryButton = page.locator('[data-testid="primary-button"]').first();
    
    if (await primaryButton.isVisible()) {
      // Normal state
      await expect(primaryButton).toHaveScreenshot('button-normal.png');
      
      // Hover state
      await primaryButton.hover();
      await expect(primaryButton).toHaveScreenshot('button-hover.png');
      
      // Focus state
      await primaryButton.focus();
      await expect(primaryButton).toHaveScreenshot('button-focus.png');
    }
  });

  test('input states visual regression', async ({ page }) => {
    await page.goto('/input-demo.html');
    await page.waitForLoadState('networkidle');
    
    const textInput = page.locator('input[type="text"]').first();
    
    if (await textInput.isVisible()) {
      // Empty state
      await expect(textInput).toHaveScreenshot('input-empty.png');
      
      // Filled state
      await textInput.fill('Sample text');
      await expect(textInput).toHaveScreenshot('input-filled.png');
      
      // Focus state
      await textInput.focus();
      await expect(textInput).toHaveScreenshot('input-focus.png');
    }
  });
});