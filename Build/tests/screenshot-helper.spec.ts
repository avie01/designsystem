import { test, expect } from '@playwright/test';

/**
 * Screenshot Helper for Design Comparison
 * Use this file to capture specific UI elements for design review
 */

test.describe('Screenshot Helper - Design Comparison', () => {
  test('capture component for design review', async ({ page }) => {
    // Navigate to the page you want to capture
    await page.goto('/components-showcase.html');
    await page.waitForLoadState('networkidle');
    
    // Capture specific elements
    // Example: Capture a specific component section
    const componentSection = page.locator('.component-section').first();
    if (await componentSection.isVisible()) {
      await expect(componentSection).toHaveScreenshot('design-review-component.png');
    }
    
    // Capture full page
    await expect(page).toHaveScreenshot('design-review-full-page.png');
  });

  test('capture specific component variations', async ({ page }) => {
    await page.goto('/button-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Capture button variations
    const buttonVariants = page.locator('.button-variant');
    const count = await buttonVariants.count();
    
    for (let i = 0; i < count; i++) {
      const variant = buttonVariants.nth(i);
      await expect(variant).toHaveScreenshot(`button-variant-${i}.png`);
    }
  });

  test('capture modal designs', async ({ page }) => {
    await page.goto('/modal-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Open different modal sizes
    const modalSizes = ['small', 'medium', 'large'];
    
    for (const size of modalSizes) {
      const openButton = page.locator(`button:has-text("${size}")`).first();
      if (await openButton.isVisible()) {
        await openButton.click();
        await page.waitForTimeout(500);
        
        // Capture the modal
        const modal = page.locator('[role="dialog"]');
        await expect(modal).toHaveScreenshot(`modal-${size}.png`);
        
        // Close modal
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      }
    }
  });

  test('capture form layouts', async ({ page }) => {
    await page.goto('/input-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Capture different form layouts
    const formSections = page.locator('.form-section');
    const count = await formSections.count();
    
    for (let i = 0; i < count; i++) {
      const section = formSections.nth(i);
      await expect(section).toHaveScreenshot(`form-layout-${i}.png`);
    }
  });

  test('capture data visualizations', async ({ page }) => {
    await page.goto('/graph-demo.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Wait for charts to fully render
    
    // Capture different chart types
    const chartTypes = ['line', 'area', 'bar', 'pie', 'radar'];
    
    for (const type of chartTypes) {
      const chartButton = page.locator(`button:has-text("${type}")`).first();
      if (await chartButton.isVisible()) {
        await chartButton.click();
        await page.waitForTimeout(1000);
        
        const chart = page.locator('.recharts-wrapper').first();
        await expect(chart).toHaveScreenshot(`chart-${type}.png`);
      }
    }
  });

  test('capture table designs', async ({ page }) => {
    await page.goto('/table-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Wait for table data to load
    await page.waitForSelector('table tbody tr');
    
    // Capture table states
    const table = page.locator('table').first();
    
    // Normal state
    await expect(table).toHaveScreenshot('table-normal.png');
    
    // Sorted state (click a header)
    const sortableHeader = page.locator('th[role="button"]').first();
    if (await sortableHeader.isVisible()) {
      await sortableHeader.click();
      await page.waitForTimeout(500);
      await expect(table).toHaveScreenshot('table-sorted.png');
    }
    
    // Filtered state (if filter exists)
    const filterInput = page.locator('input[placeholder*="filter"]').first();
    if (await filterInput.isVisible()) {
      await filterInput.fill('test');
      await page.waitForTimeout(500);
      await expect(table).toHaveScreenshot('table-filtered.png');
    }
  });

  test('capture navigation designs', async ({ page }) => {
    await page.goto('/multipage-example.html');
    await page.waitForLoadState('networkidle');
    
    // Capture navigation rail
    const navRail = page.locator('[data-testid="navigation-rail"]');
    if (await navRail.isVisible()) {
      await expect(navRail).toHaveScreenshot('navigation-rail.png');
      
      // Test collapsed state if toggle exists
      const collapseButton = page.locator('[data-testid="nav-collapse"]');
      if (await collapseButton.isVisible()) {
        await collapseButton.click();
        await page.waitForTimeout(300);
        await expect(navRail).toHaveScreenshot('navigation-rail-collapsed.png');
      }
    }
    
    // Capture breadcrumb
    const breadcrumb = page.locator('[data-testid="breadcrumb"]');
    if (await breadcrumb.isVisible()) {
      await expect(breadcrumb).toHaveScreenshot('breadcrumb.png');
    }
  });

  test('capture header variations', async ({ page }) => {
    await page.goto('/header-demo.html');
    await page.waitForLoadState('networkidle');
    
    // Capture all header product variants
    const products = ['build', 'connect', 'keystone', 'nexus', 'regworks', '3sixty'];
    
    for (const product of products) {
      // Switch variant if there's a selector
      const variantSelector = page.locator(`select[data-testid="variant-selector"]`);
      if (await variantSelector.isVisible()) {
        await variantSelector.selectOption(product);
        await page.waitForTimeout(300);
      }
      
      const header = page.locator('header');
      await expect(header).toHaveScreenshot(`header-${product}.png`);
    }
  });

  test('capture responsive breakpoints', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1200, height: 800 },
      { name: 'large', width: 1600, height: 900 }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto('/components-showcase.html');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot(`responsive-${bp.name}.png`);
    }
  });
});

test.describe('Screenshot Utility - Before/After Comparison', () => {
  test('capture baseline for comparison', async ({ page }) => {
    // Use this test to capture baseline screenshots before making changes
    
    const pages = [
      '/components-showcase.html',
      '/button-demo.html',
      '/input-demo.html',
      '/table-demo.html',
      '/graph-demo.html',
      '/modal-demo.html',
      '/multipage-example.html'
    ];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Wait extra time for interactive elements
      if (pagePath.includes('graph')) {
        await page.waitForTimeout(3000);
      } else {
        await page.waitForTimeout(1000);
      }
      
      const pageName = pagePath.replace('/', '').replace('.html', '');
      await expect(page).toHaveScreenshot(`baseline-${pageName}.png`);
    }
  });
});