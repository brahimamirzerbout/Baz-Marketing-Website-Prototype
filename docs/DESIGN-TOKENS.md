# BAZ — Design Tokens (Unified)

The visual language of the site, merging **ÆTHER (gold seed)**, **Stitch Material 3**, and the **protocol layer** (Fraunces/Inter/JetBrains Mono + Fibonacci radii).

> Algorithmic engine: `brand/css/aether-tokens.css` (seed 41 → gold)
> Brand overlay: `brand/css/variables-unified.css` (Stitch + Protocol)
> Stitch bridge: `brand/css/stitch-bridge.css` (M3 token compatibility)
> Brand voice: `docs/BRAND-BRIEF.md`
> Stitch assets: `assets/brand/`

---

## Three-Layer Architecture

| Layer | Source | Purpose |
|-------|--------|---------|
| **ÆTHER Seed** | `--seed-hue: 41` in `aether-tokens.css` | Algorithmic gold monochrome palette (254 tokens) |
| **Stitch M3** | `variables-unified.css` + `stitch-bridge.css` | Brand-specific dark palette, Material 3 tokens |
| **Protocol** | `AGENTS.md` | Fonts, radii, component system |

---

## Typography

| Role | Font | Size | Tracking | Line height |
|---|---|---|---|---|
| Display `h1` (hero) | Fraunces (display) | `clamp(3.5rem, 7vw, 6rem)` | `-0.04em` | `0.95` |
| Display XL | Fraunces | `clamp(2.75rem, 5.5vw, 4.5rem)` | `-0.035em` | `1.0` |
| Display L (`h2` hero) | Fraunces | `clamp(2rem, 4vw, 3rem)` | `-0.03em` | `1.05` |
| Display M | Fraunces | `clamp(1.5rem, 2.5vw, 2rem)` | `-0.02em` | `1.15` |
| Body lead | Inter | `clamp(1.125rem, 2vw, 1.5rem)` | normal | `leading-relaxed` |
| Body | Inter | `15–16px` | normal | normal |
| Eyebrow | JetBrains Mono | `11px` uppercase | `0.18em` | normal |
| Meta | JetBrains Mono | `10–12px` uppercase | `0.15–0.18em` | normal |

Fonts are self-hosted in `public/fonts/` via `next/font/local`. CSS variables: `--font-inter`, `--font-fraunces`, `--font-mono`. Loaded in `app/layout.tsx`.

---

## Colors — ÆTHER Gold Monochrome (Seed-hue: 41)

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `hsl(41, 72%, 50%)` | ÆTHER-computed gold |
| `--color-primary-30` | `hsl(41, 72%, 72%)` | Light gold accent |
| `--color-primary-50` | `hsl(41, 72%, 52%)` | Standard gold |
| `--color-primary-70` | `hsl(41, 72%, 32%)` | Deep gold |

## Colors — Stitch Brand Tokens (Preserved)

| Token | Value | Use |
|---|---|---|
| `--baz-gold` | `#C8A55A` | Primary accent, CTAs, eyebrows, stats |
| `--baz-gold-dark` | `#8D6B2E` | Gradient start, shadows |
| `--baz-charcoal` | `#1F2933` | Base background |
| `--baz-navy` | `#24364A` | Secondary background / depth |
| `--baz-sand` | `#E8E4E0` | Primary text on dark |
| `--baz-stone` | `#B0AAA5` | Muted text / body |
| `--baz-white` | `#FFFFFF` | Headings / maximum contrast |

## Colors — Protocol Layer

| Token | Value | Use |
|---|---|---|
| `--c-ink-900` | `#0e0e0e` | Headings, dark sections |
| `--c-paper` | `#f5f1ea` | Light section background |
| `--c-paper-50` | `#faf7f1` | Lightest card surface |
| `--c-paper-100` | `#f0ebe0` | Card surface |

---

## Section Tones

| Tone | Background | Heading Color | Use |
|---|---|---|---|
| `paper` | `#f5f1ea` | `text-ink-900` | Default. Most sections |
| `white` | `#ffffff` | `text-ink-900` | Visual breathing |
| `ink` | `#0e0e0e` | `text-paper` | KPI bands, CTAs |
| `charcoal` | `#1F2933` | `--baz-sand` | Dark premium sections (Stitch) |
| `navy` | `#24364A` | `--baz-sand` | Dark depth sections (Stitch) |

---

## Spacing

- Section padding: `py-20 md:py-32` (vertical) inside `container mx-auto`
- Hero specific: `pt-16 pb-20 md:pt-24 md:pb-32`
- Inter-block gaps: `mt-6` (eyebrow→headline), `mt-10` (headline→CTA)
- Copy widths: `max-w-5xl` for hero, `max-w-3xl` for lead
- Grid: `grid lg:grid-cols-12 gap-10`

---

## Components

- **Primary Button**: Gold (gold primary), white text, rounded-md
- **Secondary Button**: Transparent, gold border, gold text
- **Cards**: Subtle borders, rounded-xl
- **Nav**: Sticky, transparent → solid with backdrop-blur

---

## Interaction (Motion)

- **Scroll Reveal**: `<ScrollReveal>` component with fade-up
- **Hover**: Subtle lift and shadow increase
- **Focus**: ÆTHER ring with gold accent

---

## Stitch Asset Integration

All 47 Stitch-generated brand assets live in `assets/brand/`:
- Logo (master, signature, app icon, favicons, SVGs)
- Business cards (front, back, mockup, alt, print)
- Letterhead, email header
- Social media (LinkedIn, profile, card, landscape)
- Presentation folder (flat, mockup, matte, front, print)
- Website (full page, Stitch HTML, DESIGN.md)
- Service cards, pitch deck, lead magnets, case studies

See `docs/stitch-assets-report.md` for full file inventory.