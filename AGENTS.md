# Baz Marketing Website Prototype — Next.js

## Project Setup
- GitHub repo: `Baz Marketing Website Prototype` (remote: `prototype`)
- Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion
- Port 3003
- Build: `npx next build --no-lint`
- Dev: `npx next dev -p 3003`
- Do NOT delete any existing files

## GitHub Rule
- Every time I make changes, automatically commit and push to the remote
- Always tell me when you push
- Use descriptive commit messages
- Keep changes incremental — push frequently to avoid losing work

## Design System — Æther / BlackSwan
- Source of truth: `brand/css/blackswan-tokens.css` (imported in layout)
- Seed hue: `--seed-hue: 270` (violet)
- Fonts: Inter (sans), Fraunces (display), JetBrains Mono (code) — loaded via `next/font/local` from `public/fonts/`
- Dark mode forced via `<html class="dark">` — overrides in `app/globals.css` `.dark` block
- Semantic tokens map to Aether CSS variables (e.g., `bg-background` → `var(--bg)`)
- Radius tokens: `var(--radius-*)` with Fibonacci-based values
- No `@tailwind base` resets that conflict with token system
- `<NEXT_PUBLIC_HUB_URL>` set to empty string (same-origin API calls)

## Ported Assets from Sibling Repos

### From `/home/uzer/baz` (Supabase, pipeline, CI/CD)
- `lib/supabase-client.ts` — Supabase SSR + admin + anonymous client creation
- `lib/database.types.ts` — Supabase table type definitions (users, leads, customers, sessions, audit)
- `lib/realtime.ts` — `useRealtimeLeadUpdates()` hook via Supabase `postgres_changes`
- `lib/data/pipeline.ts` — GA4 / Resend / Stripe / CSV data pipeline
- `app/api/triangle/health/route.ts` — mock Hub pulse endpoint
- `app/api/dive/status/route.ts` — mock dive status endpoint
- `.github/workflows/ci.yml` — CI with typecheck/lint/build/test

### From `/home/uzer/marketing-hub` (102-page CRM, agents, integrations)
- `lib/api-crud.ts` — `makeCrud()` route factory (generic CRUD at call-site)
- `lib/data/api-helpers.ts` — `listRows()`, `getRow()`, `insertRow()`, `updateRow()`, `deleteRow()`, `safeIdent()`
- `lib/data/crud.ts` — Next.js-compatible CRUD route factory using api-error.ts
- `lib/constants.ts` — CHANNELS, DEAL_STAGES, CONTACT_STATUSES, CAMPAIGN_STATUSES/TYPES, INTEGRATIONS, AUTOMATION_TRIGGERS/ACTIONS, formatting utils (formatCurrency, formatNumber, formatDate, relative)
- `lib/agents/hub-agents.ts` — 6 deterministic marketing agents: Strategist, Storyteller, Copywriter, Analyst, PR Brain, Researcher

### From `/home/uzer/nova-with-bank` (scoring, AI routing, campaign orchestration)
- `lib/scoring-formulas.ts` — 10 scoring formulas: RSI (Relationship Strength Index), Lead Priority, Churn Risk, Customer Health, Next Best Action, Business Momentum, Forecast Confidence, Campaign ROI, Pipeline Velocity, Agent Efficiency
- `lib/ai-router.ts` — multi-provider AI router with Gemini → OpenAI → OpenRouter → Ollama fallback, per-provider rate limits, latency tracking, token accounting

## Foundation Layer (Phase 2)
- `lib/api-error.ts` — standardized API response helpers: `ok()`, `badRequest()`, `notFound()`, `rateLimited()`, `unauthorized()`, `serverError()`, `readJson()`
- `components/ui/SectionErrorBoundary.tsx` — React error boundary for section-level crash recovery
- `components/ui/EmptyState.tsx` — reusable empty-state with icon, title, description, action
- `lib/cn.ts` — className utility (clsx + tailwind-merge)
- `lib/use-fetch.ts` — `useFetch<T>()` hook with abort controller + `apiFetch<T>()` utility
- `components/sections/PipelineTicker.tsx` — live pipeline ticker section
- `components/sections/LiveStatusPill.tsx` — live status indicator pill

## API Routes
### Mocks
- `app/api/triangle/health/route.ts` — GET → `{ status: "ok" }`
- `app/api/dive/status/route.ts` — GET → `{ ok: true, pipeline: {...} }`

### Data Pipeline (authenticated + rate-limited)
- `app/api/data/import/route.ts` — POST CSV import (multipart or JSON body), rate-limited 5/min
- `app/api/data/metrics/route.ts` — GET filtered metrics with optional `metric`, `source`, `from`, `to` query params
- `app/api/data/sync/route.ts` — POST trigger full pipeline run, rate-limited 10/min

### Cron / Ops
- `app/api/cron/audit/route.ts` — GET lead/audit counts for health checks
- `app/api/cron/sitemap/route.ts` — GET triggers `npx next build` for sitemap regeneration

## Loading States (25 route segments)
Every top-level route segment has a `loading.tsx` with matching skeleton UI (animate-pulse). Segments: about, admin, become-an-operator, book, brandbook, case-studies, contact, dashboard, hub, industries, insights, login, loop, marketing-hub, methodology, our-story, portal, pricing, privacy, pulse, services, signup, stance, terms, vs-others.
