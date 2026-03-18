import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('Exploratory Testing - SauceDemo Checkout', () => {
  test('Explore: Login page elements', async ({ page }) => {
    await page.goto(BASE_URL);
    // Verify login page elements
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
    console.log('LOGIN PAGE: username=#user-name, password=#password, button=#login-button');
  });

  test('Explore: Successful login and products page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
    const title = await page.locator('.title').textContent();
    console.log('PRODUCTS PAGE title:', title);
    // Log product list
    const products = await page.locator('.inventory_item_name').allTextContents();
    console.log('PRODUCTS available:', products);
    // Log add to cart buttons
    const addButtons = await page.locator('[data-test^="add-to-cart"]').count();
    console.log('ADD TO CART buttons count:', addButtons);
  });

  test('Explore: Add to cart and cart page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    const badge = await page.locator('.shopping_cart_badge').textContent();
    console.log('CART BADGE after add:', badge);
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
    const itemName = await page.locator('.inventory_item_name').textContent();
    const itemPrice = await page.locator('.inventory_item_price').textContent();
    console.log('CART ITEM name:', itemName, 'price:', itemPrice);
    // Verify buttons
    await expect(page.locator('#continue-shopping')).toBeVisible();
    await expect(page.locator('#checkout')).toBeVisible();
    console.log('CART BUTTONS: #continue-shopping, #checkout');
  });

  test('Explore: Checkout step 1 - form fields and validation', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one/);

    // Log form fields
    await expect(page.locator('#first-name')).toBeVisible();
    await expect(page.locator('#last-name')).toBeVisible();
    await expect(page.locator('#postal-code')).toBeVisible();
    console.log('CHECKOUT STEP 1: #first-name, #last-name, #postal-code');

    // Test empty submit
    await page.click('#continue');
    const errorMsg = await page.locator('[data-test="error"]').textContent();
    console.log('EMPTY FORM ERROR:', errorMsg);

    // Test first name missing
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    const errorMsg2 = await page.locator('[data-test="error"]').textContent();
    console.log('MISSING FIRST NAME ERROR:', errorMsg2);

    // Test last name missing
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', '');
    await page.click('#continue');
    const errorMsg3 = await page.locator('[data-test="error"]').textContent();
    console.log('MISSING LAST NAME ERROR:', errorMsg3);

    // Test zip missing
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '');
    await page.click('#continue');
    const errorMsg4 = await page.locator('[data-test="error"]').textContent();
    console.log('MISSING ZIP ERROR:', errorMsg4);

    // Check error close button
    const closeBtn = page.locator('.error-button');
    console.log('ERROR CLOSE BUTTON visible:', await closeBtn.isVisible());
  });

  test('Explore: Checkout step 2 - overview page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.click('#checkout');
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await expect(page).toHaveURL(/checkout-step-two/);

    const paymentInfo = await page.locator('.summary_value_label').first().textContent();
    console.log('PAYMENT INFO:', paymentInfo);

    const subtotal = await page.locator('.summary_subtotal_label').textContent();
    const tax = await page.locator('.summary_tax_label').textContent();
    const total = await page.locator('.summary_total_label').textContent();
    console.log('PRICE SUMMARY - Subtotal:', subtotal, '| Tax:', tax, '| Total:', total);

    // Check buttons
    await expect(page.locator('#finish')).toBeVisible();
    await expect(page.locator('#cancel')).toBeVisible();
    console.log('OVERVIEW BUTTONS: #finish, #cancel');
  });

  test('Explore: Order confirmation page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.click('#checkout');
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await page.click('#finish');
    await expect(page).toHaveURL(/checkout-complete/);

    const header = await page.locator('.complete-header').textContent();
    const text = await page.locator('.complete-text').textContent();
    console.log('CONFIRMATION HEADER:', header);
    console.log('CONFIRMATION TEXT:', text);

    // Back Home button
    await expect(page.locator('#back-to-products')).toBeVisible();
    console.log('BACK HOME BUTTON: #back-to-products');
  });
});
