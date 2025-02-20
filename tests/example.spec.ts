import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveTitle(/StyleHub/);
  });

  test('should display products', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const products = await page.locator('[data-testid="product-card"]');
    await expect(products).toHaveCount(9);
  });

  test('should filter products by category', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.click('text=Electronics');
    await page.waitForSelector('[data-testid="product-card"]');
    const products = await page.locator('[data-testid="product-card"]');
    await expect(products).toHaveCount(3);
  });
});

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('should add product to cart', async ({ page }) => {
    const addToCartButton = page.locator('[data-testid="add-to-cart"]').first();
    await addToCartButton.click();
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
  });

  test('should remove product from cart', async ({ page }) => {
    await page.locator('[data-testid="add-to-cart"]').first().click();
    await page.click('[data-testid="cart-icon"]');
    await page.waitForSelector('[data-testid="remove-from-cart"]');
    await page.click('[data-testid="remove-from-cart"]');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('0');
  });
});

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'mor_2314');
    await page.fill('input[name="password"]', '83r5^_');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('should logout successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'mor_2314');
    await page.fill('input[name="password"]', '83r5^_');
    await page.click('button[type="submit"]');
    await page.waitForSelector('[data-testid="user-menu"]');
    await page.click('[data-testid="user-menu"]');
    await page.click('text=Logout');
    await expect(page).toHaveURL('http://localhost:3000/');
  });
});

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('[data-testid="add-to-cart"]').first().click();
    await page.goto('http://localhost:3000/cart/checkout');
  });

  test('should complete checkout successfully', async ({ page }) => {
    await page.waitForSelector('input[name="name"]');
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="address"]', '123 Main St');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="zipCode"]', '10001');
    await page.fill('input[name="cardNumber"]', '4111111111111111');
    await page.fill('input[name="cardExpiry"]', '12/25');
    await page.fill('input[name="cardCVC"]', '123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:3000/cart/checkout/success');
  });
});
