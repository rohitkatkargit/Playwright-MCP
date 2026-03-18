import { test, expect } from '@playwright/test';
import { login, addItemToCart, goToCart } from './helpers';

test.describe('SUITE 2: Cart Review (AC1)', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('TC-003: Add single item to cart', async ({ page }) => {
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await goToCart(page);
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');
  });

  test('TC-004: Add multiple items to cart', async ({ page }) => {
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await addItemToCart(page, 'add-to-cart-sauce-labs-bike-light');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await goToCart(page);
    const items = page.locator('.inventory_item_name');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(items.nth(1)).toHaveText('Sauce Labs Bike Light');
  });

  test('TC-005: Cart shows item details - name, description, price, quantity', async ({ page }) => {
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await goToCart(page);
    // Name
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    // Description
    await expect(page.locator('.inventory_item_desc')).not.toBeEmpty();
    // Price
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');
    // Quantity
    await expect(page.locator('.cart_quantity')).toHaveText('1');
  });

  test('TC-006: Continue shopping from cart returns to products page', async ({ page }) => {
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await goToCart(page);
    await page.click('#continue-shopping');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC-007: Remove item from cart', async ({ page }) => {
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await goToCart(page);
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    // Cart item removed - cart should be empty
    await expect(page.locator('.cart_item')).toHaveCount(0);
    // Cart badge should not be visible
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

});
