import { test, expect } from '@playwright/test';

test.describe('City Plan Homepage - ODL vs Original Comparison', () => {
  test('capture ODL-styled city plan homepage', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    await page.goto('/cityplan-demo.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for any animations
    
    // Full page screenshot
    await expect(page).toHaveScreenshot('odl-cityplan-homepage-full.png', {
      fullPage: true
    });
    
    // Viewport screenshot
    await expect(page).toHaveScreenshot('odl-cityplan-homepage-viewport.png');
    
    // Header section
    const header = page.locator('header');
    if (await header.isVisible()) {
      await expect(header).toHaveScreenshot('odl-cityplan-header.png');
    }
    
    // Hero section with search
    const heroSection = page.locator('div').nth(1); // Main hero div
    await expect(heroSection).toHaveScreenshot('odl-cityplan-hero-section.png');
    
    // Search area
    const searchArea = page.locator('div:has(input[placeholder*="address"])').first();
    if (await searchArea.isVisible()) {
      await expect(searchArea).toHaveScreenshot('odl-cityplan-search-area.png');
    }
    
    // Action cards
    const actionCards = page.locator('div:has(h3)').filter({ hasText: 'View Planning Scheme' }).locator('..');
    if (await actionCards.isVisible()) {
      await expect(actionCards).toHaveScreenshot('odl-cityplan-action-cards.png');
    }
    
    // News card
    const newsCard = page.locator('div:has(h3:text("News and updates"))');
    if (await newsCard.isVisible()) {
      await expect(newsCard).toHaveScreenshot('odl-cityplan-news-card.png');
    }
    
    // Footer
    const footer = page.locator('footer');
    if (await footer.isVisible()) {
      await expect(footer).toHaveScreenshot('odl-cityplan-footer.png');
    }
  });

  test('test ODL cityplan interactions', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    await page.goto('/cityplan-demo.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Test search input
    const searchInput = page.locator('input[placeholder*="address"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('100 Adelaide Street Brisbane');
      await expect(page).toHaveScreenshot('odl-cityplan-search-filled.png');
    }
    
    // Test dropdown interaction
    const dropdown = page.locator('select, [role="combobox"]').first();
    if (await dropdown.isVisible()) {
      await dropdown.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('odl-cityplan-dropdown-open.png');
    }
    
    // Test action card hover states
    const actionCards = page.locator('div:has(h3)').filter({ hasText: 'View Planning Scheme' });
    if (await actionCards.isVisible()) {
      await actionCards.hover();
      await page.waitForTimeout(300);
      await expect(actionCards).toHaveScreenshot('odl-cityplan-card-hover.png');
    }
    
    // Test search button
    const searchButton = page.locator('button:has([class*="icon"])').first();
    if (await searchButton.isVisible()) {
      await searchButton.hover();
      await expect(searchButton).toHaveScreenshot('odl-cityplan-search-button-hover.png');
    }
  });

  test('responsive design - mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/cityplan-demo.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Mobile full page
    await expect(page).toHaveScreenshot('odl-cityplan-mobile-full.png', {
      fullPage: true
    });
    
    // Mobile viewport
    await expect(page).toHaveScreenshot('odl-cityplan-mobile-viewport.png');
  });

  test('responsive design - tablet view', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/cityplan-demo.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Tablet full page
    await expect(page).toHaveScreenshot('odl-cityplan-tablet-full.png', {
      fullPage: true
    });
    
    // Tablet viewport
    await expect(page).toHaveScreenshot('odl-cityplan-tablet-viewport.png');
  });

  test('accessibility and focus states', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    await page.goto('/cityplan-demo.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Test search input focus
    const searchInput = page.locator('input[placeholder*="address"]');
    if (await searchInput.isVisible()) {
      await searchInput.focus();
      await expect(searchInput).toHaveScreenshot('odl-cityplan-search-focus.png');
    }
    
    // Test button focus
    const searchButton = page.locator('button:has([class*="icon"])').first();
    if (await searchButton.isVisible()) {
      await searchButton.focus();
      await expect(searchButton).toHaveScreenshot('odl-cityplan-button-focus.png');
    }
    
    // Test dropdown focus
    const dropdown = page.locator('select, [role="combobox"]').first();
    if (await dropdown.isVisible()) {
      await dropdown.focus();
      await expect(dropdown).toHaveScreenshot('odl-cityplan-dropdown-focus.png');
    }
    
    // Test keyboard navigation through action cards
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Should be on first action card
    await expect(page).toHaveScreenshot('odl-cityplan-keyboard-navigation.png');
  });
});