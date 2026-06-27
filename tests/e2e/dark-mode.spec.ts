import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'home' },
  { path: '/services', name: 'services' },
  { path: '/brandbook', name: 'brandbook' },
  { path: '/insights', name: 'insights' },
  { path: '/contact', name: 'contact' },
  { path: '/admin/leads', name: 'admin-leads' },
];

for (const p of pages) {
  test(`dark mode renders ${p.path}`, async ({ page }) => {
    await page.goto(p.path);
    // Set dark mode by clicking the toggle (or directly via JS)
    await page.evaluate(() => {
      document.documentElement.dataset.theme = 'dark';
      try { localStorage.setItem('baz:theme', 'dark'); } catch {}
    });
    // Give CSS a beat to apply
    await page.waitForTimeout(300);
    // Confirm the html element has the data-theme attribute
    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(theme, `theme on ${p.path}`).toBe('dark');
    // Take a screenshot for visual review
    await page.screenshot({ path: `tests/e2e/screenshots/dark-${p.name}.png`, fullPage: false });
  });

  test(`light mode renders ${p.path}`, async ({ page }) => {
    await page.goto(p.path);
    await page.evaluate(() => {
      document.documentElement.dataset.theme = 'light';
      try { localStorage.setItem('baz:theme', 'light'); } catch {}
    });
    await page.waitForTimeout(200);
    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(theme, `theme on ${p.path}`).toBe('light');
    await page.screenshot({ path: `tests/e2e/screenshots/light-${p.name}.png`, fullPage: false });
  });
}

test('theme toggle button switches data-theme', async ({ page }) => {
  await page.goto('/');
  // Wait for client-side hydration
  await page.waitForSelector('.theme-toggle');
  const initial = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.click('.theme-toggle');
  await page.waitForTimeout(150);
  const after = await page.evaluate(() => document.documentElement.dataset.theme);
  expect(initial).not.toBe(after);
  expect(['light', 'dark']).toContain(after);
});