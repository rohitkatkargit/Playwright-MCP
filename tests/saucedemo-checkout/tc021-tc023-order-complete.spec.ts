import { test, expect } from '@playwright/test';
import { login, addItemToCart, goToCart, fillCheckoutInfo } from './helpers';

test.describe('SUITE 5: Order Completion (AC4)', () => {

  // Helper: reach checkout complete page
  async function completeOrder(page: any) {
    await login(page);
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await goToCart(page);
    await page.click('#checkout');
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await page.click('#continue');
    await page.click('#finish');
    await expect(page).toHaveURL(/checkout-complete/);
  }

  test('TC-021: Complete order successfully - finish button works', async ({ page }) => {
    await login(page);
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await goToCart(page);
    await page.click('#checkout');
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await page.click('#continue');
    await expect(page.locator('#finish')).toBeVisible();
    await page.click('#finish');
    await expect(page).toHaveURL(/checkout-complete/);
  });

  test('TC-022: Order confirmation shows success message', async ({ page }) => {
    await completeOrder(page);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toContainText('dispatched');
  });

  test('TC-023: Back Home button returns to products and clears cart', async ({ page }) => {
    await completeOrder(page);
    await page.click('#back-to-products');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
    // Cart should be cleared after order
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

});
