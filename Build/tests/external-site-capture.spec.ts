import { test, expect } from '@playwright/test';

test.describe('External Site Analysis - Brisbane CityPlan', () => {
  test('capture Brisbane CityPlan homepage', async ({ page }) => {
    // Set viewport for desktop capture
    await page.setViewportSize({ width: 1200, height: 800 });
    
    try {
      await page.goto('https://cityplan.brisbane.qld.gov.au/eplan', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for page to fully load
      await page.waitForTimeout(3000);

      // Capture full page screenshot
      await expect(page).toHaveScreenshot('brisbane-cityplan-homepage-full.png', {
        fullPage: true
      });

      // Capture viewport screenshot
      await expect(page).toHaveScreenshot('brisbane-cityplan-homepage-viewport.png');

      // Try to capture header section
      const header = page.locator('header').first();
      if (await header.isVisible()) {
        await expect(header).toHaveScreenshot('brisbane-cityplan-header.png');
      }

      // Try to capture navigation
      const nav = page.locator('nav').first();
      if (await nav.isVisible()) {
        await expect(nav).toHaveScreenshot('brisbane-cityplan-navigation.png');
      }

      // Try to capture main content area
      const main = page.locator('main').first();
      if (await main.isVisible()) {
        await expect(main).toHaveScreenshot('brisbane-cityplan-main-content.png');
      }

      // Try to capture any hero section
      const hero = page.locator('.hero, .banner, .jumbotron, [class*="hero"]').first();
      if (await hero.isVisible()) {
        await expect(hero).toHaveScreenshot('brisbane-cityplan-hero.png');
      }

      // Try to capture search section
      const search = page.locator('[class*="search"], form[role="search"], input[type="search"]').first();
      if (await search.isVisible()) {
        await expect(search.locator('..').first()).toHaveScreenshot('brisbane-cityplan-search.png');
      }

      // Try to capture any card components
      const cards = page.locator('.card, [class*="card"]');
      const cardCount = await cards.count();
      if (cardCount > 0) {
        // Capture first few cards
        for (let i = 0; i < Math.min(3, cardCount); i++) {
          await expect(cards.nth(i)).toHaveScreenshot(`brisbane-cityplan-card-${i}.png`);
        }
      }

      // Try to capture footer
      const footer = page.locator('footer').first();
      if (await footer.isVisible()) {
        await expect(footer).toHaveScreenshot('brisbane-cityplan-footer.png');
      }

    } catch (error) {
      console.log('Error capturing Brisbane CityPlan:', error.message);
      
      // Take a basic screenshot if specific captures fail
      await expect(page).toHaveScreenshot('brisbane-cityplan-error-capture.png');
    }
  });

  test('capture Brisbane CityPlan mobile view', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    try {
      await page.goto('https://cityplan.brisbane.qld.gov.au/eplan', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      await page.waitForTimeout(3000);

      // Mobile full page capture
      await expect(page).toHaveScreenshot('brisbane-cityplan-mobile-full.png', {
        fullPage: true
      });

      // Mobile viewport capture
      await expect(page).toHaveScreenshot('brisbane-cityplan-mobile-viewport.png');

    } catch (error) {
      console.log('Error capturing Brisbane CityPlan mobile:', error.message);
      await expect(page).toHaveScreenshot('brisbane-cityplan-mobile-error.png');
    }
  });

  test('capture Brisbane CityPlan specific sections', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    try {
      await page.goto('https://cityplan.brisbane.qld.gov.au/eplan', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      await page.waitForTimeout(3000);

      // Try to interact with any dropdowns or menus
      const menuButton = page.locator('button[aria-haspopup="true"], .menu-toggle, [class*="menu"]').first();
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot('brisbane-cityplan-menu-open.png');
      }

      // Look for any forms
      const forms = page.locator('form');
      const formCount = await forms.count();
      for (let i = 0; i < Math.min(2, formCount); i++) {
        await expect(forms.nth(i)).toHaveScreenshot(`brisbane-cityplan-form-${i}.png`);
      }

      // Look for any tables
      const tables = page.locator('table');
      const tableCount = await tables.count();
      for (let i = 0; i < Math.min(2, tableCount); i++) {
        await expect(tables.nth(i)).toHaveScreenshot(`brisbane-cityplan-table-${i}.png`);
      }

      // Look for any modal dialogs or overlays
      const modals = page.locator('[role="dialog"], .modal, [class*="modal"]');
      if (await modals.first().isVisible()) {
        await expect(modals.first()).toHaveScreenshot('brisbane-cityplan-modal.png');
      }

    } catch (error) {
      console.log('Error capturing Brisbane CityPlan sections:', error.message);
    }
  });

  test('analyze Brisbane CityPlan page structure', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    try {
      await page.goto('https://cityplan.brisbane.qld.gov.au/eplan', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      await page.waitForTimeout(3000);

      // Extract page information for analysis
      const title = await page.title();
      console.log('Page Title:', title);

      // Check for color scheme
      const bodyStyles = await page.locator('body').evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          fontFamily: styles.fontFamily
        };
      });
      console.log('Body Styles:', bodyStyles);

      // Check for primary colors used
      const primaryElements = await page.locator('header, nav, .primary, [class*="primary"]').evaluateAll((elements) => {
        return elements.map(el => {
          const styles = window.getComputedStyle(el);
          return {
            tag: el.tagName,
            class: el.className,
            backgroundColor: styles.backgroundColor,
            color: styles.color
          };
        });
      });
      console.log('Primary Elements:', primaryElements);

      // Take final analysis screenshot
      await expect(page).toHaveScreenshot('brisbane-cityplan-analysis.png');

    } catch (error) {
      console.log('Error analyzing Brisbane CityPlan:', error.message);
    }
  });
});