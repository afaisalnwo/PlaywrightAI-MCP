import { test, expect } from '@playwright/test';

const loginUrl = 'https://www.saucedemo.com/';
const inventoryUrl = /\/inventory\.html$/;

// SauceDemo exposes stable data-test hooks rather than data-testid hooks.
test.use({ testIdAttribute: 'data-test' });

test.describe('SauceDemo Authentication and Catalog Access', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('Successful standard login with inventory catalog checks', async ({ page }) => {
    // 1. Start from a fresh page and verify the login form is available.
    const username = page.getByRole('textbox', { name: 'Username' });
    const password = page.getByRole('textbox', { name: 'Password' });

    // 2. Enter valid standard-user credentials.
    await username.fill('standard_user');
    await password.fill('secret_sauce');
    await expect(username).toHaveValue('standard_user');
    await expect(password).toHaveValue('secret_sauce');

    // 3. Submit the credentials and verify inventory navigation.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(inventoryUrl);
    await expect(page.getByRole('alert')).toHaveCount(0);

    // 4. Verify the inventory page and primary navigation controls.
    await expect(page.getByText('Swag Labs', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Cart/ })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Sort products' })).toBeVisible();

    // 5. Verify every visible product exposes its catalog content and action.
    const products = page.getByTestId('inventory-item');
    await expect(products).toHaveCount(6);
    for (const product of await products.all()) {
      await expect(product.getByRole('img')).toBeVisible();
      await expect(product.getByRole('button', { name: /View details for/ }).first()).toBeVisible();
      await expect(product.getByTestId('inventory-item-desc')).toBeVisible();
      await expect(product.getByTestId('inventory-item-price')).toBeVisible();
      await expect(product.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    }
  });

  test('Invalid credentials are rejected and password clearing expectation is enforced', async ({ page }) => {
    // 1. Start from a fresh page and verify the login form is available.
    const username = page.getByRole('textbox', { name: 'Username' });
    const password = page.getByRole('textbox', { name: 'Password' });

    // 2. Enter invalid credentials and verify them before submission.
    await username.fill('invalid_user');
    await password.fill('wrong_password');
    await expect(username).toHaveValue('invalid_user');
    await expect(password).toHaveValue('wrong_password');

    // 3. Reject the credentials and preserve the user-story security expectation.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('alert')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
    await expect(username).toHaveValue('invalid_user');
    await expect(password).toHaveValue('');
  });

  test('Blank username validation', async ({ page }) => {
    // 1. Start from a fresh page and verify the login form is available.
    const password = page.getByRole('textbox', { name: 'Password' });

    // 2. Submit a blank username with a populated password.
    await password.fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Verify the exact required-field error and remain on the login page.
    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('alert')).toHaveText('Epic sadface: Username is required');
  });

  test('Blank password validation', async ({ page }) => {
    // 1. Start from a fresh page and verify the login form is available.
    const username = page.getByRole('textbox', { name: 'Username' });

    // 2. Submit a populated username with a blank password.
    await username.fill('standard_user');
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Verify the exact required-field error and remain on the login page.
    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('alert')).toHaveText('Epic sadface: Password is required');
  });

  test('Both fields blank validation', async ({ page }) => {
    // 1. Start from a fresh page and verify the login form is available.
    // 2. Submit both fields blank.
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Verify the first required-field error and remain on the login page.
    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('alert')).toHaveText('Epic sadface: Username is required');
  });

  test('Locked-out user handling', async ({ page }) => {
    // 1. Start from a fresh page and verify the login form is available.
    const username = page.getByRole('textbox', { name: 'Username' });
    const password = page.getByRole('textbox', { name: 'Password' });

    // 2. Enter the locked-out account credentials.
    await username.fill('locked_out_user');
    await password.fill('secret_sauce');
    await expect(username).toHaveValue('locked_out_user');
    await expect(password).toHaveValue('secret_sauce');

    // 3. Reject the locked-out account and keep the login page available.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('alert')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});
