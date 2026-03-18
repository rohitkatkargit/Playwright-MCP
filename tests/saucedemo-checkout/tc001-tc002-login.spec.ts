import { test, expect } from '@playwright/test';
import { BASE_URL, login } from './helpers';

test.describe('SUITE 1: Login & Prerequisites', () => {

  test('TC-001: Successful login with valid credentials', async ({ page }) => {
    await login(page);
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC-002: Login failure - invalid credentials', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    // User should remain on login page
    await expect(page).toHaveURL(BASE_URL + '/');
  });

});
