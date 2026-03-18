import { test, expect } from '@playwright/test';
import { login, addItemToCart, goToCart, fillCheckoutInfo } from './helpers';

test.describe('SUITE 4: Order Overview (AC3)', () => {

  // Helper: reach checkout step 2 with one item
  async function goToCheckoutStep2(page: any) {
    await login(page);
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await goToCart(page);
    await page.click('#checkout');
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await page.click('#continue');
    await expect(page).toHaveURL(/checkout-step-two/);
  }

  test('TC-016: Order overview shows all cart items', async ({ page }) => {
    await goToCheckoutStep2(page);
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });

  test('TC-017: Order overview shows payment information', async ({ page }) => {
    await goToCheckoutStep2(page);
    // Payment info label
    await expect(page.locator('.summary_value_label').first()).toContainText('SauceCard #31337');
  });

  test('TC-018: Order overview shows shipping information', async ({ page }) => {
    await goToCheckoutStep2(page);
    // Shipping info - second summary value label
    await expect(page.locator('.summary_value_label').nth(1)).not.toBeEmpty();
  });

  test('TC-019: Order overview shows correct price breakdown (subtotal, tax, total)', async ({ page }) => {
    await goToCheckoutStep2(page);
    // Subtotal
    await expect(page.locator('.summary_subtotal_label')).toContainText('$29.99');
    // Tax (8% of $29.99 = $2.40)
    await expect(page.locator('.summary_tax_label')).toContainText('$2.40');
    // Total = $29.99 + $2.40 = $32.39
    await expect(page.locator('.summary_total_label')).toContainText('$32.39');
  });

  test('TC-020: Cancel from overview - returns to products page', async ({ page }) => {
    await goToCheckoutStep2(page);
    await page.click('#cancel');
    await expect(page).toHaveURL(/inventory/);
  });

});
