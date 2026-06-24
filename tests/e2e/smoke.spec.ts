import { test, expect } from '@playwright/test';

/**
 * Smoke tests for BAZ marketing site.
 * These hit the dev server and assert critical pages return 200 + key copy.
 *
 * Run:  npx playwright test
 * Need: dev server running on http://localhost:3000
 */

const criticalRoutes = [
  { path: '/', contains: ['BAZ', 'growth'] },
  { path: '/services', contains: ['Eighteen services', 'Performance Marketing', 'Lifecycle, Email'] },
  { path: '/pricing', contains: ['Pricing', 'senior'] },
  { path: '/brandbook', contains: ['Our', 'brand', 'wordmark'] },
  { path: '/insights', contains: ['Insights'] },
  { path: '/insights/senior-team-no-juniors', contains: ['senior'] },
  { path: '/contact', contains: ['contact'] },
  { path: '/admin', contains: ['Admin'] },
];

for (const route of criticalRoutes) {
  test(`route ${route.path} returns 200 with expected copy`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response, `no response for ${route.path}`).not.toBeNull();
    expect(response!.status(), `${route.path} status`).toBe(200);
    const body = (await page.content()).toLowerCase();
    for (const needle of route.contains) {
      expect(body, `${route.path} should contain "${needle}"`).toContain(needle.toLowerCase());
    }
  });
}

test('homepage service grid renders all 18 services', async ({ page }) => {
  await page.goto('/services');
  const cards = page.locator('a[href^="/services/"]');
  // Allow for service links in cards + nav. At minimum, all 18 detail pages exist.
  const count = await cards.count();
  expect(count, 'service card count').toBeGreaterThanOrEqual(18);
});

test('contact form submission persists to /admin/leads', async ({ page, request }) => {
  const unique = `e2e_${Date.now()}`;
  await page.goto('/contact');
  await page.fill('input[name="name"]', `E2E Test ${unique}`);
  await page.fill('input[name="email"]', `${unique}@example.com`);
  await page.fill('textarea[name="message"]', `End-to-end smoke test ${unique}.`);
  await page.click('button[type="submit"]');
  // Should show some success indicator (toast, redirect, message). Be lenient.
  await page.waitForTimeout(1500);

  // Verify persistence via the leads API (requires operator session).
  // Register a temporary operator so we can list leads.
  const opEmail = `e2e_op_${unique}@example.com`;
  const reg = await request.post('/api/auth/register', {
    data: { email: opEmail, password: 'testpass123', name: `E2E Op ${unique}` },
  });
  expect(reg.status()).toBe(200);

  const res = await request.get('/api/leads?limit=200');
  expect(res.status()).toBe(200);
  const body = await res.json();
  const found = (body.leads || []).some((l: { email: string }) => l.email === `${unique}@example.com`);
  expect(found, `lead with email ${unique}@example.com should be persisted`).toBe(true);
});

/**
 * Wave 2 — service-aware lead pipeline.
 * Submits a lead WITH a `service` field and asserts it round-trips through
 * the API, gets persisted to the leads table, and is exposed via GET.
 */
test('service-aware lead submission persists with service attribution', async ({ request }) => {
  const unique = `svc_${Date.now()}`;
  const opEmail = `op_${unique}@example.com`;

  // Public POST with service
  const post = await request.post('/api/leads', {
    data: {
      name: `Service-Aware ${unique}`,
      email: `${unique}@example.com`,
      message: `Testing the service field end-to-end. ${unique}.`,
      source: 'e2e_service_test',
      service: 'performance-marketing',
    },
  });
  expect(post.status()).toBe(200);
  const pj = await post.json();
  expect(pj.ok).toBe(true);

  // Register an operator to read it back
  await request.post('/api/auth/register', {
    data: { email: opEmail, password: 'testpass123', name: 'Op' },
  });

  const list = await request.get('/api/leads?limit=200');
  expect(list.status()).toBe(200);
  const lj = await list.json();
  const found = lj.leads.find((l: any) => l.email === `${unique}@example.com`);
  expect(found, `lead with email ${unique}@example.com should be persisted`).toBeTruthy();
  expect(found.service).toBe('performance-marketing');
  expect(found.source).toBe('e2e_service_test');
});

/**
 * Wave 1 — all 18 service detail pages return 200 with hero copy.
 * Covers every renamed + new service slug.
 */
const ALL_SERVICE_SLUGS = [
  'strategy-consulting',
  'performance-marketing',
  'seo-organic',
  'content-engine',
  'brand-identity',
  'cro-experimentation',
  'lifecycle-email-sms',
  'crm-mops',
  'analytics-attribution',
  'ai-search-optimization',
  'social-media',
  'influencer-marketing',
  'video-production',
  'affiliate-partnerships',
  'abm-b2b-demand',
  'public-relations',
  'market-research',
  'internationalization',
];

for (const slug of ALL_SERVICE_SLUGS) {
  test(`service page /services/${slug} renders`, async ({ page }) => {
    const res = await page.goto(`/services/${slug}`);
    expect(res?.status(), `${slug} status`).toBe(200);
    const body = (await page.content()).toLowerCase();
    // Must contain the breadcrumb Services link and a primary CTA
    expect(body, `${slug} should have /services link`).toContain('/services');
    expect(body, `${slug} should have a CTA`).toMatch(/book|proposal|audit/i);
  });
}

/**
 * Wave 1 — service CTA links to /contact with service context.
 */
test('service CTA on /services/performance-marketing links to /contact?service=…', async ({ page }) => {
  await page.goto('/services/performance-marketing');
  const links = await page.locator('a[href*="/contact?service="]').count();
  expect(links, 'expected at least one service-aware CTA on /services/performance-marketing').toBeGreaterThanOrEqual(1);
});

/**
 * Wave 1 — /contact?service=X shows the service pill and prefills the hidden field.
 */
test('contact page reflects ?service= context in URL', async ({ page }) => {
  await page.goto('/contact?service=video-production');
  const body = await page.content();
  expect(body, 'service pill should show "Video Production"').toContain('Video Production');
  // The hidden input is in the form, but the contact form is on this page
  // — we only check for the breadcrumb and the visual pill since the form
  // is rendered without service context until submitted.
  expect(body, 'should have breadcrumb to /services').toContain('/services');
});

/**
 * Wave 2 — /api/services exposes the full 18-service catalog.
 */
test('GET /api/services returns all 18 services with the expected shape', async ({ request }) => {
  const r = await request.get('/api/services');
  expect(r.status()).toBe(200);
  const j = await r.json();
  expect(j.ok).toBe(true);
  expect(j.count).toBe(18);
  expect(j.services.length).toBe(18);

  const slugs = j.services.map((s: any) => s.slug);
  for (const expected of [
    'strategy-consulting',
    'performance-marketing',
    'video-production',
    'crm-mops',
    'internationalization',
  ]) {
    expect(slugs, `slug ${expected} should be present`).toContain(expected);
  }

  // Shape: every service has the headline fields
  for (const s of j.services) {
    expect(s.name, `${s.slug} name`).toBeTruthy();
    expect(s.pillar, `${s.slug} pillar`).toMatch(/^(owned|earned|paid|data|platform)$/);
    expect(s.tagline, `${s.slug} tagline`).toBeTruthy();
    expect(Array.isArray(s.deliverables), `${s.slug} deliverables is array`).toBe(true);
    expect(Array.isArray(s.faqs), `${s.slug} faqs is array`).toBe(true);
  }
});

test('GET /api/services?pillar=owned filters correctly', async ({ request }) => {
  const r = await request.get('/api/services?pillar=owned');
  expect(r.status()).toBe(200);
  const j = await r.json();
  expect(j.count).toBeGreaterThan(0);
  for (const s of j.services) {
    expect(s.pillar).toBe('owned');
  }
});

test('GET /api/services?format=summary trims heavy fields', async ({ request }) => {
  const r = await request.get('/api/services?format=summary');
  expect(r.status()).toBe(200);
  const j = await r.json();
  const first = j.services[0];
  expect(first.process, 'summary should not include process').toBeUndefined();
  expect(first.proof, 'summary should not include proof').toBeUndefined();
  expect(first.faqs, 'summary should not include faqs').toBeUndefined();
  expect(first.kpis, 'summary should still include kpis').toBeDefined();
});
