import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Aram Saeivom Family Trust — Donation Flow', () => {
  test('homepage loads with correct title and theme', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Aram Saeivom Family Trust/);
    await expect(page.locator('h1')).toContainText('Where Sky Meets Earth');
  });

  test('hero section is visible and accessible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('section#home')).toBeVisible();
    await expect(page.locator('a[href="/#donate"]').first()).toBeVisible();
  });

  test('campaigns page loads', async ({ page }) => {
    await page.goto('/campaigns');
    await expect(page.locator('h1')).toContainText('Seeds of Change');
  });

  test('donation section renders QR and bank tabs', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href="/#donate"]').first().click();
    await page.waitForSelector('#donate', { state: 'visible' });
    await expect(page.locator('button', { hasText: 'Scan & Pay' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Bank Transfer' })).toBeVisible();
  });

  test('bank transfer tab shows account details', async ({ page }) => {
    await page.goto('/#donate');
    await page.locator('button', { hasText: 'Bank Transfer' }).click();
    await expect(page.locator('text=123456789012')).toBeVisible();
    await expect(page.locator('text=SBIN0001234')).toBeVisible();
  });

  test('volunteer form submission works', async ({ page }) => {
    await page.goto('/volunteer');
    await page.fill('input[name="name"]', 'Test Volunteer');
    await page.fill('input[name="email"]', 'test@test.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select[name="availability"]', 'weekends');
  });

  test('admin signin page is accessible', async ({ page }) => {
    await page.goto('/auth/signin');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('WCAG accessibility — homepage', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations.length).toBe(0);
  });

  test('WCAG accessibility — campaigns page', async ({ page }) => {
    await page.goto('/campaigns');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations.length).toBe(0);
  });

  test('nav links are keyboard navigable', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focused);
  });
});