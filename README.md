# BAZ Marketing Agency — Site (Next.js)

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

## Service pillars (9)

The brief asked for nine offers across owned/earned/paid/data/platform:

1. **Strategy & Growth Consulting** — `strategy-consulting`
2. **Paid Media** — `paid-media`
3. **SEO & Organic Growth** — `seo-organic`
4. **Website Design & Development** — `web-design-development`
5. **Content Strategy & Copywriting** — `content-copywriting`
6. **Analytics & Tracking** — `analytics-tracking`
7. **AI Search Optimization & Automation** — `ai-search-automation`
8. **CRM & Lifecycle Marketing** — `crm-lifecycle`
9. **Creative & CRO** — `creative-cro`

Each entry in `content/services.ts` is the full payload that drives its detail page: hero, who, deliverables, KPIs, process, proof, FAQs, CTA.

---

## Design system

- **Type:** Fraunces (display) · Inter (body) · JetBrains Mono (numerics). All loaded via `next/font` with `display: swap`.
- **Palette:** Paper `#faf7f2` / `#f5f1ea`, Ink `#0e0e10`, Accent `#ff3b2f`. Defined as Tailwind tokens.
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
baz-site-next/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: header/footer, fonts, JSON-LD
│   ├── page.tsx                  # Home
│   ├── not-found.tsx             # 404
│   ├── sitemap.ts                # /sitemap.xml
│   ├── robots.ts                 # /robots.txt
│   ├── globals.css               # Tailwind + base styles
│   ├── about/                    # /about
│   ├── services/                 # /services + /services/[slug]
│   ├── case-studies/             # /case-studies + /case-studies/[slug]
│   ├── insights/                 # /insights + /insights/[slug]
│   ├── industries/               # /industries + /industries/[slug]
│   ├── contact/                  # /contact
│   ├── book/                     # /book → redirects to booking URL
│   ├── privacy/                  # /privacy
│   └── terms/                    # /terms
├── components/
│   ├── ui/                       # Button, Card, Badge, Section primitives
│   ├── layout/                   # Header, Footer, CookieBanner
│   ├── marketing/                # ServiceHero, CaseStudyHero, ContactForm, FAQ, etc.
│   ├── sections/                 # Home page section compositions
│   └── analytics/                # GA4 + GTM bootstrap
├── content/
│   ├── services.ts               # 9 service payloads
│   ├── case-studies.ts           # 6 case study payloads
│   ├── industries.ts             # 6 industry payloads
│   ├── testimonials.ts           # 5 testimonial payloads
│   ├── team.ts                   # 6 partner bios
│   └── posts.ts                  # 6 long-form articles
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

### Vercel (recommended)

```bash
vercel link
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_BOOKING_URL production
vercel --prod
```

### Docker / self-hosted

```bash
npm run build
npm start          # serves on :3000
```

The build emits a self-contained Node server. Set `PORT` to override.

### Static export

If you want to serve as static files (no Node runtime), add to `next.config.mjs`:

```js
const nextConfig = { output: 'export', images: { unoptimized: true } };
```

Then `npm run build` produces an `out/` directory you can drop on any CDN. Note: `app/book` (the redirect to the booking URL) won't work in a static export — change it to a plain link.

---

## What's deliberately **not** done

- ❌ No fake clients, fake awards, or false metrics — all placeholders are flagged.
- ❌ No 7,000-line mega-component — every section is its own file.
- ❌ No frontend framework on top of React — no Mantine, Chakra, MUI. Tailwind + a tiny primitive set is faster and easier to audit.
- ❌ No `wget --mirror` or content scrape from any source site.
- ❌ No third-party analytics until you set `NEXT_PUBLIC_GA4_ID`.

---

## Pre-launch checklist

Run through these before pointing the real domain:

- [ ] Replace placeholder client names + metrics in `content/case-studies.ts`
- [ ] Replace testimonial authors + quotes in `content/testimonials.ts`
- [ ] Replace KPI stats in `lib/site.ts` (`brandsScaled`, `countriesServed`, etc.)
- [ ] Replace team bios in `content/team.ts` with real partners
- [ ] Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BOOKING_URL`, `LEAD_INTAKE_URL`
- [ ] Add real Open Graph image (`public/og/default.svg` is a placeholder)
- [ ] Set up GA4 property and add ID
- [ ] Add a `sitemap.xml` image extension if you publish client logos
- [ ] Wire `LEAD_INTAKE_URL` to your CRM (HubSpot, Pipedrive, etc.)
- [ ] `npm run audit:placeholder` should exit clean (replace TODOs)
- [ ] Lighthouse: aim for ≥95 Performance, ≥95 Accessibility, ≥95 SEO, ≥95 Best Practices on `/` and `/services/[slug]`

---

## License

MIT. Use it, fork it, ship it. © 2026 BAZ Marketing Agency.
