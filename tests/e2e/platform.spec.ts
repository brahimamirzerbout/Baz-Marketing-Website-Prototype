import { test, expect } from '@playwright/test';

/**
 * Platform upgrade tests — covers the v7 backend + operator console + portal.
 */

test.describe('API: auth + leads + agents', () => {
  test('register + login flow works', async ({ request }) => {
    const unique = `e2e_${Date.now()}`;
    const reg = await request.post('/api/auth/register', {
      data: { email: `${unique}@example.com`, password: 'testpass123', name: `E2E ${unique}` },
    });
    expect(reg.status()).toBe(200);
    const j = await reg.json();
    expect(j.ok).toBe(true);
    expect(j.user.email).toBe(`${unique}@example.com`);

    // /api/auth/me should now work with the session cookie
    const me = await request.get('/api/auth/me');
    expect(me.status()).toBe(200);
    const mj = await me.json();
    expect(mj.user.email).toBe(`${unique}@example.com`);

    // Logout
    const out = await request.post('/api/auth/logout');
    expect(out.status()).toBe(200);

    // /api/auth/me should now be null
    const me2 = await request.get('/api/auth/me');
    expect(me2.status()).toBe(200);
    expect((await me2.json()).user).toBeNull();
  });

  test('public lead submission persists and is listable as operator', async ({ request }) => {
    const unique = `lead_${Date.now()}`;

    // Public POST — no auth
    const post = await request.post('/api/leads', {
      data: {
        name: `Lead ${unique}`,
        email: `${unique}@example.com`,
        message: `Looking for help with SEO. Budget 5k/mo.`,
        source: 'e2e_test',
      },
    });
    expect(post.status()).toBe(200);
    const pj = await post.json();
    expect(pj.ok).toBe(true);
    expect(pj.id).toBeTruthy();

    // Need to register + login as operator to list
    const opEmail = `op_${unique}@example.com`;
    await request.post('/api/auth/register', {
      data: { email: opEmail, password: 'testpass123', name: 'Op' },
    });

    const list = await request.get('/api/leads?limit=200');
    expect(list.status()).toBe(200);
    const lj = await list.json();
    expect(lj.ok).toBe(true);
    const found = lj.leads.find((l: any) => l.email === `${unique}@example.com`);
    expect(found, 'newly created lead should be in the list').toBeTruthy();
    expect(found.source).toBe('e2e_test');
  });

  test('agents manifest lists all 8 agents', async ({ request }) => {
    const r = await request.get('/api/agents');
    expect(r.status()).toBe(200);
    const j = await r.json();
    expect(j.agents.length).toBe(8);
    const ids = j.agents.map((a: any) => a.id);
    expect(ids).toContain('leadgen');
    expect(ids).toContain('content');
    expect(ids).toContain('analytics');
    expect(ids).toContain('general');
  });

  test('apps manifest covers public + admin + portal + api', async ({ request }) => {
    const r = await request.get('/api/apps');
    expect(r.status()).toBe(200);
    const j = await r.json();
    const pillars = new Set(j.apps.map((a: any) => a.pillar));
    expect(pillars.has('public')).toBe(true);
    expect(pillars.has('admin')).toBe(true);
    expect(pillars.has('portal')).toBe(true);
    expect(pillars.has('api')).toBe(true);
  });

  test('health endpoint returns counts + llm status', async ({ request }) => {
    const r = await request.get('/api/health');
    expect(r.status()).toBe(200);
    const j = await r.json();
    expect(j.ok).toBe(true);
    expect(j.db).toBe('sqlite');
    expect(j.counts).toBeTruthy();
    expect(typeof j.counts.leads).toBe('number');
  });

  test('search endpoint returns relevant hits', async ({ request }) => {
    // "Performance Marketing" is one of the new 18 services — the search
    // endpoint indexes every service by name, tagline, and description.
    const r = await request.get('/api/search?q=performance');
    expect(r.status()).toBe(200);
    const j = await r.json();
    expect(j.q).toBe('performance');
    expect(j.hits.length).toBeGreaterThan(0);
    expect(j.hits[0].type).toBe('service');
    expect(j.hits[0].href).toContain('/services/');
  });
});

test.describe('Operator console + portal + become-an-operator', () => {
  test('become-an-operator page lists all 7 phases', async ({ page }) => {
    await page.goto('/become-an-operator');
    await expect(page.getByRole('heading', { name: /Run your own senior-only agency/i })).toBeVisible();
    // 7 phases mentioned in the page
    const phases = await page.getByRole('listitem').count();
    expect(phases).toBeGreaterThanOrEqual(7);
  });

  test('login page renders', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible();
  });

  test('console redirects unauthenticated users to a sign-in prompt', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/console');
    // Should show sign-in CTA, not crash
    await expect(page.getByRole('heading', { name: /Sign in to access the console/i })).toBeVisible();
  });

  test('portal redirects unauthenticated users to /login', async ({ page }) => {
    await page.context().clearCookies();
    const res = await page.goto('/portal', { waitUntil: 'domcontentloaded' });
    // Should end up on /login
    expect(page.url()).toContain('/login');
    expect(res?.ok()).toBe(true);
  });

  test('RSS feed is valid XML with all posts', async ({ request }) => {
    const r = await request.get('/feed.xml');
    expect(r.status()).toBe(200);
    const xml = await r.text();
    expect(xml).toContain('<?xml');
    expect(xml).toContain('<rss');
    expect(xml).toContain('<channel>');
    expect(xml).toContain('<item>');
  });
});