import { test, expect } from '@playwright/test';

test.describe('Brisbane CityPlan Specific URL Analysis', () => {
  test('capture Brisbane CityPlan specific URL layout', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    try {
      await page.goto('https://cityplan.brisbane.qld.gov.au/eplan/0/256', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for page to fully load
      await page.waitForTimeout(3000);

      // Capture full page screenshot
      await expect(page).toHaveScreenshot('brisbane-specific-page-full.png', {
        fullPage: true
      });

      // Capture viewport screenshot
      await expect(page).toHaveScreenshot('brisbane-specific-page-viewport.png');

      // Try to capture search/input area specifically
      const searchInput = page.locator('input[type="text"], input[type="search"], [role="searchbox"]').first();
      if (await searchInput.isVisible()) {
        // Get the parent container of the search input
        const searchContainer = searchInput.locator('..').first();
        await expect(searchContainer).toHaveScreenshot('brisbane-search-container.png');
        
        // Also capture the search input itself
        await expect(searchInput).toHaveScreenshot('brisbane-search-input.png');
      }

      // Try to capture main content area
      const mainContent = page.locator('main, [role="main"], .main-content').first();
      if (await mainContent.isVisible()) {
        await expect(mainContent).toHaveScreenshot('brisbane-main-content.png');
      }

      // Try to capture any hero or banner section
      const heroSection = page.locator('.hero, .banner, [class*="hero"], [class*="banner"]').first();
      if (await heroSection.isVisible()) {
        await expect(heroSection).toHaveScreenshot('brisbane-hero-section.png');
      }

      // Try to capture header/navigation
      const header = page.locator('header, nav, .header, .navigation').first();
      if (await header.isVisible()) {
        await expect(header).toHaveScreenshot('brisbane-header-nav.png');
      }

      // Look for any forms
      const forms = page.locator('form');
      const formCount = await forms.count();
      for (let i = 0; i < Math.min(2, formCount); i++) {
        await expect(forms.nth(i)).toHaveScreenshot(`brisbane-form-${i}.png`);
      }

      console.log('Successfully captured Brisbane CityPlan specific URL');

    } catch (error) {
      console.log('Error capturing Brisbane CityPlan specific URL:', error.message);
      
      // Take a basic screenshot if specific captures fail
      await expect(page).toHaveScreenshot('brisbane-specific-error-capture.png');
    }
  });

  test('analyze page structure and elements', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    try {
      await page.goto('https://cityplan.brisbane.qld.gov.au/eplan/0/256', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      await page.waitForTimeout(3000);

      // Get page title
      const title = await page.title();
      console.log('Page Title:', title);

      // Check for search inputs and their placement
      const searchInputs = page.locator('input[type="text"], input[type="search"], [role="searchbox"]');
      const inputCount = await searchInputs.count();
      console.log('Number of search inputs found:', inputCount);

      for (let i = 0; i < inputCount; i++) {
        const input = searchInputs.nth(i);
        const placeholder = await input.getAttribute('placeholder');
        const inputType = await input.getAttribute('type');
        const inputClass = await input.getAttribute('class');
        
        console.log(`Input ${i}:`, {
          placeholder,
          type: inputType,
          class: inputClass
        });

        // Get the bounding box to understand positioning
        const boundingBox = await input.boundingBox();
        console.log(`Input ${i} position:`, boundingBox);
      }

      // Check page structure
      const bodyStyles = await page.locator('body').evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          fontFamily: styles.fontFamily
        };
      });
      console.log('Body Styles:', bodyStyles);

    } catch (error) {
      console.log('Error analyzing Brisbane CityPlan page:', error.message);
    }
  });

  test('capture mobile view of specific URL', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    try {
      await page.goto('https://cityplan.brisbane.qld.gov.au/eplan/0/256', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      await page.waitForTimeout(3000);

      // Mobile full page capture
      await expect(page).toHaveScreenshot('brisbane-specific-mobile-full.png', {
        fullPage: true
      });

      // Mobile viewport capture
      await expect(page).toHaveScreenshot('brisbane-specific-mobile-viewport.png');

    } catch (error) {
      console.log('Error capturing Brisbane CityPlan mobile view:', error.message);
      await expect(page).toHaveScreenshot('brisbane-specific-mobile-error.png');
    }
  });
});