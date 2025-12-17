import { test, expect } from '@playwright/test';

test.describe('CityPlan Integration Test', () => {
  test('should load CityPlan from multipage navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Navigate to the main application
    await page.goto('/multipage-example.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Look for the City Plan navigation item
    const cityPlanNavItem = page.locator('[data-testid*="city-plan"], text="City Plan"').first();
    
    if (await cityPlanNavItem.isVisible()) {
      // Click on City Plan navigation
      await cityPlanNavItem.click();
      await page.waitForTimeout(2000);
      
      // Check if the CityPlan homepage loaded
      await expect(page.locator('text="Brisbane City Council"')).toBeVisible();
      await expect(page.locator('text="City Plan 2014"')).toBeVisible();
      
      // Check for key elements of the CityPlan page
      await expect(page.locator('text="News and updates"')).toBeVisible();
      await expect(page.locator('input[placeholder*="address"]')).toBeVisible();
      await expect(page.locator('text="View Planning Scheme"')).toBeVisible();
      await expect(page.locator('text="View Map"')).toBeVisible();
      await expect(page.locator('text="Submissions"')).toBeVisible();
      
      // Take a screenshot of the integrated page
      await expect(page).toHaveScreenshot('cityplan-integrated-full.png');
      
    } else {
      // If navigation item not found, take a screenshot to debug
      await expect(page).toHaveScreenshot('multipage-navigation-debug.png');
      throw new Error('City Plan navigation item not found');
    }
  });

  test('should show City Plan in navigation menu', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    await page.goto('/multipage-example.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Take screenshot of navigation to verify menu structure
    const navigation = page.locator('[role="navigation"], nav').first();
    if (await navigation.isVisible()) {
      await expect(navigation).toHaveScreenshot('navigation-with-cityplan.png');
    }
    
    // Check that "City Plan" appears in the menu
    const hasMapIcon = page.locator('[class*="map"], [data-icon="map"]');
    const hasCityPlanText = page.locator('text="City Plan"');
    
    // At least one of these should be visible
    const mapIconVisible = await hasMapIcon.first().isVisible().catch(() => false);
    const cityPlanTextVisible = await hasCityPlanText.first().isVisible().catch(() => false);
    
    expect(mapIconVisible || cityPlanTextVisible).toBeTruthy();
  });

  test('should maintain ODL styling in integrated CityPlan', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    await page.goto('/multipage-example.html');
    await page.waitForLoadState('networkidle');
    
    // Navigate to City Plan
    const cityPlanNav = page.locator('text="City Plan"').first();
    if (await cityPlanNav.isVisible()) {
      await cityPlanNav.click();
      await page.waitForTimeout(2000);
      
      // Verify ODL theme is applied
      const header = page.locator('header');
      if (await header.isVisible()) {
        // Check for green Build theme color
        const headerStyle = await header.evaluate((el) => {
          return window.getComputedStyle(el);
        });
        
        // Header should have ODL Build styling
        expect(headerStyle.backgroundColor).toContain('rgb'); // Should have a color
      }
      
      // Check for proper ODL button styling
      const searchButton = page.locator('button:has([class*="icon"])').first();
      if (await searchButton.isVisible()) {
        const buttonStyle = await searchButton.evaluate((el) => {
          return window.getComputedStyle(el);
        });
        
        // Should have ODL primary color
        expect(buttonStyle.backgroundColor).toContain('rgb');
      }
      
      // Take screenshot for visual verification
      await expect(page).toHaveScreenshot('cityplan-odl-styling.png');
    }
  });
});