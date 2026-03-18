import { test, expect } from '@playwright/test';
import { login, addItemToCart, goToCart, fillCheckoutInfo } from './helpers';

test.describe('SUITE 3: Checkout Information Entry (AC2)', () => {

  // Helper: reach checkout step 1
  async function goToCheckoutStep1(page: any) {
    await login(page);
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await goToCart(page);
    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one/);
  }

  test('TC-008: Navigate to checkout from cart', async ({ page }) => {
    await login(page);
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await goToCart(page);
    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one/);
    // Form fields are visible
    await expect(page.locator('#first-name')).toBeVisible();
    await expect(page.locator('#last-name')).toBeVisible();
    await expect(page.locator('#postal-code')).toBeVisible();
  });

  test('TC-009: Successful checkout info entry - all fields valid', async ({ page }) => {
    await goToCheckoutStep1(page);
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await page.click('#continue');
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('TC-010: Validation error - all fields empty', async ({ page }) => {
    await goToCheckoutStep1(page);
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
    // User remains on step 1
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('TC-011: Validation error - first name missing', async ({ page }) => {
    await goToCheckoutStep1(page);
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
  });

  test('TC-012: Validation error - last name missing', async ({ page }) => {
    await goToCheckoutStep1(page);
    await page.fill('#first-name', 'John');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
  });

  test('TC-013: Validation error - zip code missing', async ({ page }) => {
    await goToCheckoutStep1(page);
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');
  });

  test('TC-014: Cancel checkout step 1 - returns to cart', async ({ page }) => {
    await goToCheckoutStep1(page);
    await page.click('#cancel');
    await expect(page).toHaveURL(/cart/);
  });

  test('TC-015: Error message dismissal via close button', async ({ page }) => {
    await goToCheckoutStep1(page);
    // Trigger error
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    // Dismiss error
    await page.locator('.error-button').click();
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  });

});
