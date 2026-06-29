import { test, expect } from '@playwright/test';

/**
 * E2E coverage for the new differentiated pages added in the upgrade pass:
 *   - /methodology
 *   - /our-story
 *   - /stance
 *   - /vs-others
 *   - /portal/client
 *
 * Plus hero-variant coverage at /?icp={saas|ecommerce|fintech|media} and
 * a positive-path test for the public /portal/[id] lead plan view.
 */

const NEW_PAGES = [
  {
    path: '/methodology',
    h1: /Diagnose\. Plan\. Ship\. Score\. Learn\./,
    crumb: 'Methodology',
    ctaText: /Want a second opinion|Book a growth call|Get a .* proposal|Request an audit/i,
  },
  {
    path: '/our-story',
    h1: /freelance collective/i,
    crumb: 'Our story',
    ctaText: /Want a second opinion|Book a growth call|Get a .* proposal|Request an audit/i,
  },
  {
    path: '/stance',
    h1: /Agentic AI is leverage/i,
    crumb: 'Stance',
    ctaText: /Want a second opinion|Book a growth call|Get a .* proposal|Request an audit/i,
  },
  {
    path: '/vs-others',
    h1: /Where we win/i,
    crumb: /vs others/i,
    ctaText: /Want a second opinion|Book a growth call|Get a .* proposal|Request an audit/i,
  },
  {
    path: '/portal/client',
    h1: /Your growth, live\./,
    crumb: 'Portal',
    // /portal/client does not render a CtaBanner — it uses inline CTAs to /contact.
    ctaText: null as unknown as RegExp,
  },
] as const;

test.describe('new pages', () => {
  for (const p of NEW_PAGES) {
    test(`${p.path} renders h1, breadcrumb, and footer CTA`, async ({ page }) => {
      await page.goto(p.path, { waitUntil: 'networkidle' });
      // H1 is visible.
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      // The h1 text matches what we expect for this page.
      await expect(page.getByRole('heading', { level: 1 })).toContainText(p.h1);
      // Breadcrumb (aria-label="Breadcrumb") is visible.
      const crumbRoot = page.getByRole('navigation', { name: 'Breadcrumb' });
      await expect(crumbRoot).toBeVisible();
      await expect(crumbRoot).toContainText('Home');
      const crumbText = await crumbRoot.innerText();
      if (p.crumb instanceof RegExp) {
        expect(crumbText).toMatch(p.crumb);
      } else {
        expect(crumbText).toContain(p.crumb);
      }
      // CtaBanner presence (skip on /portal/client — it has inline CTAs to /contact).
      if (p.ctaText) {
        await expect(page.getByText(p.ctaText).first()).toBeVisible();
      }
    });
  }
});

test.describe('hero variants', () => {
  const variants = [
    { icp: 'saas',       expectText: /SaaS pipeline/i },
    { icp: 'ecommerce',  expectText: /eCommerce CAC/i },
    { icp: 'fintech',    expectText: /FinTech growth/i },
    { icp: 'media',      expectText: /Reach \+ retention/i },
  ];

  for (const v of variants) {
    test(`/?icp=${v.icp} returns 200 and renders ICP-specific copy`, async ({ page }) => {
      const response = await page.goto(`/?icp=${v.icp}`);
      expect(response, 'expected a navigation response').not.toBeNull();
      expect(response!.status(), `/?icp=${v.icp} should return 200`).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toContainText(v.expectText);
    });
  }

  test('/?icp=unknown falls back to default headline', async ({ page }) => {
    const response = await page.goto('/?icp=not-a-real-icp');
    expect(response!.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // Default headline starts with "Add $200K+ to pipeline in 90 days".
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/\$200K\+/);
  });
});

test.describe('/portal/[id]', () => {
  test('valid lead id renders the score panel', async ({ page, request }) => {
    // Create a lead via the API first so we have a real id.
    const r = await request.post('/api/leads', {
      data: {
        name: 'Pages Spec Test',
        email: 'pages-spec-test@baz-agency-prototype.com',
        company: 'Spec Co',
        message:
          'Need a senior partner for paid media. Budget 50k/mo. Want to start next quarter. RFP coming.',
        source: 'pages_spec_test',
        service: 'paid',
        demoCompleted: true,
        agentRuns: 2,
        budget: '50-100k',
      },
    });
    expect(r.ok()).toBeTruthy();
    const json = await r.json();
    expect(json.id, 'expected a lead id from /api/leads').toBeTruthy();
    const id = json.id as string;

    // Visit the public portal page with that id.
    const response = await page.goto(`/portal/${id}`);
    expect(response, 'expected a navigation response').not.toBeNull();
    expect(response!.status(), `/portal/${id} should return 200`).toBe(200);

    // Wait for the API call + score UI to render.
    await page.waitForResponse(
      (r) => r.url().includes(`/api/lead-portal/${id}`) && r.status() === 200,
      { timeout: 10000 },
    );

    // The score panel renders the "/100" suffix once the score is in.
    await expect(page.getByText(/\/100/)).toBeVisible({ timeout: 10000 });
    // "Your sequence" timeline label is on the rendered plan.
    await expect(page.getByText(/Your sequence/i)).toBeVisible();
  });

  test('invalid lead id renders the not-found state, not a crash', async ({ page }) => {
    const response = await page.goto('/portal/does-not-exist');
    expect(response!.status()).toBe(200);
    await expect(page.getByText(/couldn(?:'|’)t find that lead|cannot find that lead|couldn’t find that lead|We couldn’t find that lead/i)).toBeVisible({ timeout: 5000 });
  });
});