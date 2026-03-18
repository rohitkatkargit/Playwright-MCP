import { test, expect } from '@playwright/test';
import { BASE_URL, login, addItemToCart, goToCart, fillCheckoutInfo } from './helpers';

test.describe('SUITE 6: Full End-to-End Happy Path', () => {

  test('TC-024: Complete checkout flow - single item', async ({ page }) => {
    // Step 1: Login
    await login(page);
    await expect(page).toHaveURL(/inventory/);

    // Step 2: Add item to cart
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Step 3: Go to cart
    await goToCart(page);
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

    // Step 4: Proceed to checkout
    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one/);

    // Step 5: Enter checkout info
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await page.click('#continue');
    await expect(page).toHaveURL(/checkout-step-two/);

    // Step 6: Verify order overview
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.summary_subtotal_label')).toContainText('$29.99');
    await expect(page.locator('.summary_total_label')).toContainText('$32.39');

    // Step 7: Finish order
    await page.click('#finish');
    await expect(page).toHaveURL(/checkout-complete/);

    // Step 8: Verify confirmation
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

    // Step 9: Back Home
    await page.click('#back-to-products');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('TC-025: Complete checkout flow - multiple items', async ({ page }) => {
    // Login
    await login(page);

    // Add two items
    await addItemToCart(page, 'add-to-cart-sauce-labs-backpack'); // $29.99
    await addItemToCart(page, 'add-to-cart-sauce-labs-bike-light'); // $9.99
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Go to cart and verify both items
    await goToCart(page);
    const items = page.locator('.inventory_item_name');
    await expect(items).toHaveCount(2);

    // Proceed to checkout
    await page.click('#checkout');
    await fillCheckoutInfo(page, 'Jane', 'Smith', '90210');
    await page.click('#continue');
    await expect(page).toHaveURL(/checkout-step-two/);

    // Verify combined totals: $29.99 + $9.99 = $39.98
    await expect(page.locator('.summary_subtotal_label')).toContainText('$39.98');
    // Tax on $39.98 = $3.20
    await expect(page.locator('.summary_tax_label')).toContainText('$3.20');
    // Total = $39.98 + $3.20 = $43.18
    await expect(page.locator('.summary_total_label')).toContainText('$43.18');

    // Complete order
    await page.click('#finish');
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

    // Return home
    await page.click('#back-to-products');
    await expect(page).toHaveURL(/inventory/);
  });

});
