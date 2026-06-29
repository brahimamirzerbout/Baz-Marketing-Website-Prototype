import { test, expect } from '@playwright/test';

/**
 * BAZ Loop E2E — the prototype's core flow.
 *
 * Verifies that the marketing site captures a lead from the LiveAgentDemo,
 * scores it deterministically, persists it, and serves the lead a portal
 * page with their routing plan. Each step is exercised end-to-end against
 * the running dev server.
 */

test.describe('BAZ loop', () => {
  test('live agent demo renders on the homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Give the dev server a moment to hydrate the React tree after SSR.
    await page.waitForTimeout(2000);
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 15000 });
    // The terminal-style demo card is on the homepage below the hero.
    await expect(page.locator('text=baz://agents')).toBeVisible({ timeout: 15000 });
  });

  test('clicking Run agent produces output', async ({ page }) => {
    await page.goto('/');
    // Click the first agent rail item (LeadGen is selected by default) and run.
    const runBtn = page.getByRole('button', { name: /Run agent/i });
    await expect(runBtn).toBeVisible();
    await runBtn.click();
    // Wait for output to appear (simulated delay is up to 1.4s)
    await page.waitForTimeout(2000);
    // After running, the capture form slides in below the output.
    await expect(page.getByText(/Want us to actually run this\?/i)).toBeVisible({ timeout: 5000 });
  });

  test('submitting the capture form creates a lead and shows the score', async ({ page }) => {
    await page.goto('/');

    // Run the demo.
    await page.getByRole('button', { name: /Run agent/i }).click();
    await page.waitForTimeout(2000);

    // Fill the capture form.
    await page.getByPlaceholder('Your name').fill('Loop Test User');
    await page.getByPlaceholder('you@company.com').fill('loop.test@baz-agency-prototype.com');
    await page.getByPlaceholder('Company (optional)').fill('Test Co');

    // Submit.
    await page.getByRole('button', { name: /Send my plan/i }).click();

    // The score panel should appear with intent + action.
    await expect(page.getByText(/Your lead score/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/out of 100/i)).toBeVisible();
    await expect(page.getByText(/intent:/i)).toBeVisible();
  });

  test('portal page renders the routing plan', async ({ page, request }) => {
    // Create a lead via the API first.
    const r = await request.post('/api/leads', {
      data: {
        name: 'Portal Render Test',
        email: 'portal.test@baz-agency-prototype.com',
        company: 'Test Co',
        message: 'Need a senior partner for paid media. Budget 50k/mo. Want to start next quarter. Have an RFP.',
        source: 'live_agent_demo',
        service: 'paid',
        demoCompleted: true,
        agentRuns: 3,
        budget: '50-100k',
      },
    });
    expect(r.ok()).toBeTruthy();
    const json = await r.json();
    expect(json.id).toBeTruthy();
    expect(json.score).toBeGreaterThan(0);

    // Visit the portal.
    await page.goto(`/portal/${json.id}`);
    // Wait for the fetch to complete and the score UI to render.
    await page.waitForResponse(
      (r) => r.url().includes(`/api/lead-portal/${json.id}`) && r.status() === 200,
      { timeout: 10000 },
    );
    await expect(page.getByText(/Your score/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/\/100/)).toBeVisible();
    await expect(page.getByText(/Your sequence/i)).toBeVisible();
    // At least one D0 step should appear.
    await expect(page.getByText(/D0/i).first()).toBeVisible();
  });

  test('/api/score endpoint works for both hot and cold leads', async ({ request }) => {
    const hot = await request.post('/api/score', {
      data: {
        message: 'Ready to start next week. Need a senior partner. Budget 100k+. RFP coming.',
        company: 'Big Co',
        website: 'https://bigco.com',
        source: 'hero_book_call',
        demoCompleted: true,
        agentRuns: 3,
        timeOnPageSec: 180,
        scrollDepth: 0.9,
      },
    });
    expect(hot.ok()).toBeTruthy();
    const hotJson = await hot.json();
    expect(hotJson.score).toBeGreaterThanOrEqual(75);
    expect(hotJson.recommendedAction).toBe('book_call');
    expect(hotJson.plan.steps.length).toBeGreaterThan(0);

    const cold = await request.post('/api/score', {
      data: { message: 'just a student looking for a free course', source: 'contact_form' },
    });
    expect(cold.ok()).toBeTruthy();
    const coldJson = await cold.json();
    expect(coldJson.score).toBeLessThan(20);
    expect(coldJson.recommendedAction).toBe('archive');
  });

  test('portal lookup returns not_found for unknown lead id', async ({ request }) => {
    const r = await request.get('/api/lead-portal/does-not-exist');
    expect(r.status()).toBe(404);
  });

  test('/loop page explains the system and embeds the demo', async ({ page }) => {
    await page.goto('/loop');
    await expect(page.getByRole('heading', { name: /No human in the loop/i })).toBeVisible();
    await expect(page.getByText(/From click to closed/i)).toBeVisible();
    // Live demo embedded in the loop page.
    await expect(page.getByText(/baz:\/\/agents/i)).toBeVisible();
  });

  test('/pulse page shows real lead counts and score bands', async ({ page }) => {
    await page.goto('/pulse');
    await expect(page.getByRole('heading', { name: /The loop, in/i })).toBeVisible();
    await expect(page.getByText(/Total leads/i)).toBeVisible();
    await expect(page.getByText(/Hot/)).toBeVisible();
    await expect(page.getByText(/Warm/)).toBeVisible();
    // Pipeline status bars render.
    await expect(page.getByText(/Pipeline stage/i)).toBeVisible();
  });

  test('header has The Loop and Live Pulse links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /The Loop/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Live Pulse/i }).first()).toBeVisible();
  });
});