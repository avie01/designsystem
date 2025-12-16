import { test, expect } from '@playwright/test';

test.describe('CityPlan Final Integration Test', () => {
  test('should successfully integrate CityPlan without header conflicts', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Navigate to the main application
    await page.goto('/multipage-example.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Click on City Plan navigation
    const cityPlanNav = page.locator('text="City Plan"').first();
    await cityPlanNav.click();
    await page.waitForTimeout(2000);
    
    // Verify there's only one header (from the main app)
    const headers = page.locator('header');
    const headerCount = await headers.count();
    expect(headerCount).toBe(1);
    
    // Verify the page content loaded properly
    await expect(page.locator('text="News and updates"')).toBeVisible();
    await expect(page.locator('input[placeholder*="address"]')).toBeVisible();
    await expect(page.locator('text="View Planning Scheme"')).toBeVisible();
    await expect(page.locator('text="View Map"')).toBeVisible();
    await expect(page.locator('text="Submissions"')).toBeVisible();
    
    // Test search functionality
    const searchInput = page.locator('input[placeholder*="address"]');
    await searchInput.fill('100 Adelaide Street Brisbane');
    
    const searchButton = page.locator('button:has([class*="icon"], [name="search"])').first();
    await searchButton.click();
    
    // Take final screenshot
    await expect(page).toHaveScreenshot('cityplan-final-integration.png');
  });

  test('should show proper ODL styling without conflicts', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    await page.goto('/multipage-example.html');
    await page.waitForLoadState('networkidle');
    
    // Navigate to City Plan
    const cityPlanNav = page.locator('text="City Plan"').first();
    await cityPlanNav.click();
    await page.waitForTimeout(2000);
    
    // Check that the search section renders properly
    const searchSection = page.locator('div:has(input[placeholder*="address"])').first();
    await expect(searchSection).toBeVisible();
    
    // Check action cards render properly
    const actionCards = page.locator('text="View Planning Scheme"');
    await expect(actionCards).toBeVisible();
    
    // Test hover interaction on action card
    const planningSchemeCard = page.locator('div:has(h3:text("View Planning Scheme"))');
    await planningSchemeCard.hover();
    
    // Take screenshot showing proper styling
    await expect(page).toHaveScreenshot('cityplan-odl-styled.png');
  });
});