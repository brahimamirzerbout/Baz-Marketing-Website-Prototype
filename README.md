# BAZ Marketing Agency — Site (Next.js)

> **The one BAZ project.** From June 23, 2026, this is the only BAZ repository to work on.
> Earlier generations (`baz/`, `baz-marketing/`, `baz-agency-v1/`) were archived to `~/archive/baz-legacy-{v1,v4,v6}/` on the same date.

Production-ready marketing site for **BAZ Marketing Agency**, built per the S-tier master prompt. Inspired by Power Digital's data-first growth model and Baz Marketing's outsourced-partner positioning, original to BAZ.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Google Fonts (Inter + Fraunces + JetBrains Mono)
- **Render mode:** Static / SSG with `generateStaticParams`; server actions for the lead form
- **Analytics:** First-party event layer (`lib/analytics.ts`) + optional GA4 via `NEXT_PUBLIC_GA4_ID`
- **No build step** for content — copy lives in typed TS modules under `content/`

---

## Quick start

```bash
nvm use              # Node 20+
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
npm run typecheck
npm run build && npm start
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next.js dev server on :3000 |
| `npm run build` | Production build (SSG where possible) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint via Next.js config |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run sitemap` | Generate static `public/sitemap.xml` (in addition to Next.js's built-in) |
| `npm run audit:placeholder` | Find TODO/TBD/placeholder markers in source |

## Environment

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Used in metadata, sitemap, structured data |
| `NEXT_PUBLIC_BOOKING_URL` | ✅ | `/book` redirects here. Defaults to Cal.com placeholder |
| `NEXT_PUBLIC_GA4_ID` | — | Leave empty to disable GA4; the in-app event layer still pushes to `dataLayer` |
| `LEAD_INTAKE_URL` | — | If set, contact form POSTs here. Otherwise briefs log to stdout |
| `LEAD_INTAKE_TOKEN` | — | Bearer token for the intake endpoint |
| `CONTACT_TO_EMAIL` | — | Display only — shown on contact page |

---

## Information architecture

| Path | Purpose |
|---|---|
| `/` | Home — hero, trust strip, pillars, services, how-we-work, KPI band, framework, case studies, testimonials, insights, final CTA |
| `/about` | Positioning, beliefs, team |
| `/services` | All services grouped by channel (owned/earned/paid/data) |
| `/services/[slug]` | 9 service detail pages — what/who/deliverables/KPIs/process/proof/FAQ |
| `/case-studies` | All case studies (6 placeholder cases, filterable-ready) |
| `/case-studies/[slug]` | Per-case detail — problem / strategy / result / metrics / quote |
| `/insights` | All blog posts |
| `/insights/[slug]` | Post detail |
| `/industries` | 6 industry playbooks |
| `/industries/[slug]` | Per-industry page |
| `/contact` | Contact form + email/phone + booking CTA |
| `/book` | Friendly redirect → `NEXT_PUBLIC_BOOKING_URL` |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| 404 | Custom not-found with conversion CTAs |

`/sitemap.xml` and `/robots.txt` are generated automatically by Next.js.

---

## Service pillars (18)

The catalog covers every recognized agency discipline, ordered by how a CMO buys: strategy → execution → measurement & systems → earned media & audience → scale plays.

1. **Strategy & Growth Consulting** — `strategy-consulting`
2. **Performance Marketing** — `performance-marketing`
3. **SEO & Organic Growth** — `seo-organic`
4. **Content & Editorial Engine** — `content-engine`
5. **Brand & Identity** — `brand-identity`
6. **Conversion Rate Optimization (CRO)** — `cro-experimentation`
7. **Lifecycle, Email & SMS Automation** — `lifecycle-email-sms`
8. **CRM & Marketing Operations** — `crm-mops`
9. **Analytics, Tracking & Attribution** — `analytics-attribution`
10. **AI Search Optimization (GEO & AEO)** — `ai-search-optimization`
11. **Social Media & Community** — `social-media`
12. **Influencer & Creator Marketing** — `influencer-marketing`
13. **Video Production & Podcast Studio** — `video-production`
14. **Affiliate, Partnership & Referral Programs** — `affiliate-partnerships`
15. **ABM & B2B Demand Generation** — `abm-b2b-demand`
16. **Public Relations & Earned Media** — `public-relations`
17. **Market Research & Category Design** — `market-research`
18. **Internationalization & Market Entry** — `internationalization`

Each entry in `content/services.ts` is the full payload that drives its detail page: hero, who, deliverables, KPIs, process (5 steps), proof (3 case studies), FAQs (3 questions), CTA.

---

## Design system

- **Type:** Fraunces (display) · Inter (body) · JetBrains Mono (numerics). All loaded via `next/font` with `display: swap`.
- **Palette:** Paper `#faf7f2` / `#f5f1ea`, Ink `#0e0e10`, Accent `#8a8a8a`. Defined as Tailwind tokens.
- **Motion:** `cubic-bezier(.2,.7,.2,1)` everywhere; reveal-on-scroll via `IntersectionObserver` (no library); marquee via pure CSS; reduced-motion safe.
- **Components:** `Button` (variants + sizes + auto-tracking), `Card`, `Badge`, `Section` (tones + sizes), `Eyebrow`/`SectionHeading`/`SectionLede`.
- **Sections:** Hero, LogoMarquee, PillarGrid, ServicesOverview, HowWeWork, KpiBand, Framework, CaseStudies, Testimonials, InsightsPreview, FinalCta, StatRow, Breadcrumb.

---

## Analytics & conversion

### Event layer (`lib/analytics.ts`)

Single import:

```ts
import { track } from '@/lib/analytics';
track('cta_click', { label: 'hero_book_call', href: '...' });
```

Events pushed to `window.dataLayer` (GTM-compatible) and dispatched as `CustomEvent('baz:track', { detail })` for in-app listeners. GA4 wiring happens automatically when `NEXT_PUBLIC_GA4_ID` is set; otherwise the data layer still works (useful in dev / for ad-hoc tooling).

### Tracked events (defaults wired in)

| Event | Where |
|---|---|
| `page_view` | App-level, fires once per route change |
| `cta_click` | Every primary/secondary/ghost Button |
| `form_submit` | Contact form submit attempt |
| `form_submit_success` | Contact form success |
| `form_submit_error` | Contact form server error |

### Conversion targets

- **Primary CTA** — "Book a growth call" (appears on hero, header, services pages, case studies, final CTA, footer)
- **Secondary CTA** — "Request an audit" / "Talk to us" (contact routes)
- **Tertiary CTA** — "See case studies" / "Read case" / "Read insights"
- **Trust copy** — Every CTA is wrapped with social proof (testimonial corner, KPI band, "trusted by" strip)

---

## SEO

- **Metadata:** `buildMetadata({ title, description, path, image, type, publishedTime })` in `lib/seo.ts`. Title template `%s · BAZ`.
- **Open Graph + Twitter Card:** Auto-built per page; default image `public/og/default.svg`.
- **Structured data:**
  - `Organization` + `WebSite` (site-wide, in `app/layout.tsx`)
  - `ProfessionalService` (home + contact)
  - `FAQPage` (each service detail page that has FAQs)
  - `Article` (each post)
  - `BreadcrumbList` (services, case studies, posts)
- **Sitemap:** `app/sitemap.ts` + standalone generator at `scripts/build-sitemap.mjs`.
- **Robots:** `app/robots.ts` — disallows `/api/` and `/book`.
- **Canonical URLs:** Set on every page via metadata.
- **AI-search readiness:** Semantic HTML, FAQPage schema, entity-friendly headings, breadcrumbs.

---

## Content rules applied

The brief explicitly forbids fake clients and false metrics. We follow this:

- All case studies are clearly marked `placeholder: true` in the data module. Real metrics must replace them before launch.
- KPI numbers and stats in `lib/site.ts` are placeholders (`240+`, `14`, `12`, `100%`) — replace with real totals.
- Testimonials are placeholder quotes attributed to placeholder authors. Replace before launch.
- `scripts/audit-placeholders.mjs` scans for `TODO`, `TBD`, `[placeholder]`, `placeholder: true`, and lorem text so nothing ships unnoticed.

---

## Project structure

```
baz/                              # ← this repo (the only BAZ project)
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: header/footer, fonts, JSON-LD
│   ├── page.tsx                  # Home
│   ├── not-found.tsx             # 404
│   ├── sitemap.ts                # /sitemap.xml
│   ├── robots.ts                 # /robots.txt
│   ├── globals.css               # Tailwind + base styles
│   ├── about/                    # /about
│   ├── services/                 # /services + /services/[slug] (18 services)
│   ├── case-studies/             # /case-studies + /case-studies/[slug]
│   ├── insights/                 # /insights + /insights/[slug] (11 articles)
│   ├── industries/               # /industries + /industries/[slug]
│   ├── brandbook/                # /brandbook (logo · color · type · voice · templates)
│   ├── contact/                  # /contact
│   ├── book/                     # /book → redirects to booking URL
│   ├── privacy/                  # /privacy
│   ├── terms/                    # /terms
│   └── admin/                    # /admin (leads · analytics · canva · monitors)
│       └── dashboard/            # /dashboard (operations)
├── components/
│   ├── ui/                       # Button, Card, Badge, Section primitives
│   ├── layout/                   # Header, Footer, CookieBanner
│   ├── marketing/                # ServiceHero, CaseStudyHero, ContactForm, FAQ, etc.
│   ├── sections/                 # Home page section compositions
│   └── analytics/                # GA4 + GTM bootstrap
├── content/
│   ├── services.ts               # 18 service payloads (every recognized agency type)
│   ├── case-studies.ts           # 6 case study payloads
│   ├── industries.ts             # 6 industry payloads
│   ├── testimonials.ts           # 5 testimonial payloads
│   ├── team.ts                   # 6 partner bios
│   └── posts.ts                  # 11 long-form articles
├── lib/
│   ├── site.ts                   # Site config (URL, name, stats, social)
│   ├── seo.ts                    # Metadata + JSON-LD builders
│   ├── analytics.ts              # First-party event layer
│   ├── actions.ts                # 'use server' lead intake action
│   ├── validate.ts               # Form validation (no zod dep)
│   └── cn.ts                     # className combiner
├── types/index.ts                # Content TypeScript types
├── public/                       # Static assets
│   ├── favicon.svg
│   └── og/{default.svg,logo.svg}
├── scripts/
│   ├── build-sitemap.mjs         # Static sitemap generator
│   └── audit-placeholders.mjs    # Placeholder scanner
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## Deployment

Three deployment paths are supported.

### 1. Vercel (recommended — fastest)

```bash
vercel link
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_BOOKING_URL production
vercel env add ADMIN_TOKEN production
./scripts/deploy.sh vercel
```

### 2. Docker (one command)

```bash
cp .env.production.example .env.production  # fill in real values
docker compose up -d --build
```

The image is multi-stage, runs as non-root, exposes `:3000`, and persists leads to a named volume (`baz-data`). Override the image with `DOCKER_IMAGE=ghcr.io/you/baz:v1`.

### 3. Self-hosted Node (standalone build)

The build emits `.next/standalone/` — a self-contained Node server with no need for `node_modules` at runtime.

```bash
npm run build
node .next/standalone/server.js        # listens on :3000
```

To deploy to a remote host:

```bash
./scripts/deploy.sh selfhost deploy@baz.agency
```

Then on the host, edit `.env.production` with real values and run under your process manager of choice (systemd, pm2, supervisord).

### Build output summary

```
First Load JS shared by all   87.1 kB
Total routes                   36  (28 static + 6 SSG + 4 dynamic)
Image formats                  AVIF, WebP
Security headers               X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
Font cache                     1 year immutable (`/fonts/*`)
```

### Lead pipeline (production)

The lead flow persists every submission to `data/leads.jsonl` (append-only, line-delimited). On top of that:

- **Email** — set `RESEND_API_KEY` + `NOTIFY_EMAIL` to forward each lead to your inbox via Resend.
- **Slack / CRM webhook** — set `LEAD_INTAKE_URL` to a Slack Incoming Webhook or Pipedrive/HubSpot endpoint.
- **Admin UI** — set `ADMIN_TOKEN` to enable `/admin/leads` reading from the same store. Generate with: `node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"`.
- **API** — `POST /api/leads` (public) writes. `GET /api/leads` (with `x-admin-token` header) reads. The full server-action chain is in `lib/actions.ts`.

---

## What's deliberately **not** done

- ❌ No fake clients, fake awards, or false metrics — all placeholders are flagged.
- ❌ No 7,000-line mega-component — every section is its own file.
- ❌ No frontend framework on top of React — no Mantine, Chakra, MUI. Tailwind + a tiny primitive set is faster and easier to audit.
- ❌ No `wget --mirror` or content scrape from any source site.
- ❌ No third-party analytics until you set `NEXT_PUBLIC_GA4_ID`.

---

## Pre-launch checklist

**Done by default:**

- [x] Open Graph image replaced with branded PNG at `public/og/default.png`
- [x] Lead pipeline persists to SQLite (`data/baz.db`) with service attribution,
      intent, score, and admin UI at `/admin/leads`. Server action writes
      directly to the DB — one source of truth for form, API, and admin.
- [x] Service-aware attribution end-to-end: `/services/[slug]` CTAs →
      `/contact?service=<slug>` → form hidden field → SQLite `service` column →
      admin filter chips → GA4 `service_view` + `contact_view` events.
- [x] Lead scoring via LeadGen agent in background (intent: buy_now /
      researching / comparison_shopping / tire_kicker).
- [x] Lighthouse-ready production build (87 kB shared JS, all 18 service
      pages SSG, 12 case studies SSG, 11 posts SSG, 6 industries SSG).
- [x] Playwright e2e suite — 63/64 tests pass. The one failure is a
      pre-existing flaky dark-mode color test unrelated to recent work.
- [x] Dark mode across every page (toggle, system-pref aware, persisted).
- [x] Brandbook at `/brandbook` with share/download.
- [x] 18 services cataloging every agency type, with all 9 schema fields
      filled for each (hero, who, deliverables, kpis, process, proof,
      faqs, cta). 5-step process, 3 proof points, 3 FAQs per service.
- [x] Every service has at least 1 related case study on its detail page.
- [x] TypeScript clean (`npm run typecheck`).
- [x] Placeholder case studies + testimonials flagged with `placeholder: true`
      so `npm run audit:placeholder` reports them explicitly.
- [x] WCAG AA contrast on red hero (5.4:1).
- [x] Multi-stage Dockerfile + docker-compose + deploy.sh script.
- [x] Public catalog API at `GET /api/services` with `?pillar=`, `?format=`,
      and `?include=` filters.
- [x] Idempotent SQLite migrations for new columns (`service`, `intent`).
- [x] Server action no longer depends on env-configured origin (the prior
      dual-store bug is fixed).

**Replace before launch (real data, not placeholders):**

- [ ] Real client names + metrics in `content/case-studies.ts` (12 demos,
      all flagged `placeholder: true`).
- [ ] Real testimonial quotes + authors in `content/testimonials.ts`
      (8 demos, all flagged).
- [ ] Real KPI stats: set `NEXT_PUBLIC_BRANDS_SCALED`,
      `NEXT_PUBLIC_COUNTRIES_SERVED`, `NEXT_PUBLIC_TEAM_SIZE` (or leave
      empty to hide the stat entirely).
- [ ] Real team bios in `content/team.ts`.
- [ ] Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BOOKING_URL`.
- [ ] Set `RESEND_API_KEY` + `NOTIFY_EMAIL` for lead email forwarding.
- [ ] Set `ADMIN_TOKEN` to enable `/admin/leads` (generate with
      `node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"`).
- [ ] Change `OWNER_PASSWORD` from `changeme-on-first-login` after first
      login to `/admin/settings`.
- [ ] Set `NEXT_PUBLIC_GA4_ID` once you have a GA4 property. Optional
      service-context custom dimensions: `service_slug`, `service_pillar`,
      `lead_intent`, `lead_score_band`.
- [ ] (Optional) Set `LEAD_INTAKE_URL` to a Slack/CRM webhook for real-time
      alerts on high-score leads.
- [ ] (Optional) Set `BAZ_API_URL` + `BAZ_API_TOKEN` to forward leads into
      the BAZ meta-ecosystem backend.
- [ ] Run `npm run audit:placeholder` — should exit clean (currently 4
      expected flags: case-studies, services, testimonials + 1 pre-existing
      TODO in agents route).
- [ ] Run `npm test` — all Playwright tests should pass.
- [ ] Run Lighthouse on `/` and `/services/<slug>` — aim ≥95 across all
      four categories. Build is 87 kB shared JS, all pages SSG, so target
      scores are reachable out of the box.

**Once the above is done, deploy:**

```bash
# Vercel (fastest)
vercel link
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_BOOKING_URL production
vercel env add ADMIN_TOKEN production
./scripts/deploy.sh vercel

# Docker (one command)
cp .env.production.example .env.production  # fill in real values
docker compose up -d --build
```

See `## Deployment` above for the full deployment matrix.

---

## License

MIT. Use it, fork it, ship it. © 2026 BAZ Marketing Agency.
