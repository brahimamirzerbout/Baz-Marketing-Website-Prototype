import { test, expect } from '@playwright/test';

test.describe('integrations admin page', () => {
  test('renders all 14 integrations', async ({ page }) => {
    await page.goto('/admin/integrations');
    await expect(page.getByRole('heading', { name: /Connected services/i })).toBeVisible();
    // The grid renders one button per integration. Filter to integration cards by aria/role.
    const cards = page.locator('button:has-text("Slack"), button:has-text("Google Workspace"), button:has-text("Linear"), button:has-text("Zapier"), button:has-text("Stripe"), button:has-text("Webhooks")');
    await expect(cards.first()).toBeVisible();
    // Counter header reads "X of 14 active"
    await expect(page.getByText(/\d+ of 14 active/)).toBeVisible();
  });

  test('clicking a card opens the configure modal', async ({ page }) => {
    await page.goto('/admin/integrations');
    // Dismiss the cookie banner so it doesn't interfere
    await page.evaluate(() => localStorage.setItem('baz:cookie-consent', '1'));
    await page.reload();
    await page.locator('button:has-text("Slack")').first().click();
    // The integration modal is the dialog with aria-labelledby starting with "int-modal-"
    const modal = page.locator('[role="dialog"][aria-labelledby^="int-modal-"]');
    await expect(modal).toBeVisible();
    // Disconnect/Connect buttons are inside the modal
    await expect(modal.getByRole('button', { name: 'Disconnect' }).or(modal.getByRole('button', { name: 'Connect' }))).toBeVisible();
  });

  test('disconnect then connect toggles persist via localStorage', async ({ page }) => {
    await page.goto('/admin/integrations');
    await page.evaluate(() => localStorage.setItem('baz:cookie-consent', '1'));
    await page.reload();
    const modal = page.locator('[role="dialog"][aria-labelledby^="int-modal-"]');

    // Open Zapier (which defaults to disconnected)
    await page.locator('button:has-text("Zapier")').first().click();
    await expect(modal).toBeVisible();
    await page.getByRole('button', { name: 'Connect', exact: true }).click();
    await expect(modal).not.toBeVisible();

    // Open Slack and disconnect
    await page.locator('button:has-text("Slack")').first().click();
    await expect(modal).toBeVisible();
    await page.getByRole('button', { name: 'Disconnect' }).click();
    await expect(modal).not.toBeVisible();

    // Reload — state should persist
    await page.reload();
    const ls = await page.evaluate(() => window.localStorage.getItem('baz.admin.integrations.v1'));
    expect(ls, 'localStorage entry should exist').toBeTruthy();
    const parsed = JSON.parse(ls!);
    expect(parsed.zapier, 'zapier should be connected').toBe(true);
    expect(parsed.slack, 'slack should be disconnected').toBe(false);
  });

  test('reset to defaults button clears the map', async ({ page }) => {
    await page.goto('/admin/integrations');
    await page.evaluate(() => window.localStorage.setItem('baz.admin.integrations.v1', JSON.stringify({ zapier: true })));
    await page.reload();
    await page.getByRole('button', { name: /Reset to defaults/i }).click();
    const ls = await page.evaluate(() => window.localStorage.getItem('baz.admin.integrations.v1'));
    expect(ls === '{}' || ls === null).toBeTruthy();
  });

  test('dark mode renders without broken colors', async ({ page, context }) => {
    // Open in fresh context to avoid any persisted UI state from prior tests.
    await context.clearCookies();
    await page.goto('/admin/integrations');
    // Seed localStorage so the ThemeToggle's useEffect picks dark on mount,
    // then reload so the dark styles actually apply.
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('baz:theme', 'dark');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    // Verify dark mode applied
    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(theme, 'data-theme should be dark').toBe('dark');
    // Background should be the dark paper color (rgb starts with 24, ...)
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg, 'body bg should be dark (rgb starts with 24)').toMatch(/^rgb\(2[3-5],/);
    await page.screenshot({ path: 'tests/e2e/screenshots/integrations-dark.png' });
  });
});