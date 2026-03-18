import { Page } from '@playwright/test';

export const BASE_URL = 'https://www.saucedemo.com';
export const USERNAME = 'standard_user';
export const PASSWORD = 'secret_sauce';

export async function login(page: Page): Promise<void> {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.locator('#user-name').waitFor({ state: 'visible' });
  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');
}

export async function addItemToCart(page: Page, dataTestId: string): Promise<void> {
  await page.locator(`[data-test="${dataTestId}"]`).click();
}

export async function goToCart(page: Page): Promise<void> {
  await page.locator('.shopping_cart_link').click();
}

export async function fillCheckoutInfo(
  page: Page,
  firstName: string,
  lastName: string,
  zipCode: string
): Promise<void> {
  if (firstName) await page.fill('#first-name', firstName);
  if (lastName) await page.fill('#last-name', lastName);
  if (zipCode) await page.fill('#postal-code', zipCode);
}
