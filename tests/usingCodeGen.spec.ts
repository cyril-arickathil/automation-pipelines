import { test, expect } from '@playwright/test';

test('test using code gen',{tag: '@TC001'},
   async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').fill('test@test.com');
  await page.locator('[data-test="password"]').fill('secret123');
  await page.locator('[data-test="login-submit"]').click();
});