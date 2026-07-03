# BAZ — Enterprise Brand Design System

> **Version 2.0.0 · BlackSwan × Fibonacci × Da Vinci × Material 3**

This is the authoritative brand manual and design system for **BAZ Marketing Ventures Agency**. It merges the algorithmic BlackSwan token system with BAZ's editorial identity to produce a single source of truth for designers, frontend engineers, and marketing teams.

---

## Architecture

BAZ's visual system is built on three intersecting principles:

| Principle | Source | Implementation |
|-----------|--------|----------------|
| **Algorithmic consistency** | BlackSwan Design System | Three CSS seed variables (`--seed-hue`, `--seed-sat`, `--seed-lum`) rebrand the entire cascade |
| **Organic editorial luxury** | Da Vinci proportions, golden ratio | Fibonacci radius scale, type scale rooted in Major Third (1.25) |
| **Material clarity** | Material 3 surface layers | Elevation tokens, semantic color flips, dark mode |

The accent is **gold** `hsl(41, 72%, 52%)` — derived from the BlackSwan seed `--seed-hue: 41`. Change one number and the entire system rebrands. The complementary accent at `seed+30` produces chartreuse `hsl(71, 85%, 55%)`.

---

## Directory Structure

```text
brand/
├── README.md                ← You are here
├── design.md                ← Visual philosophy, layout, elevation, guardrails
├── colors.md                ← Palette, gradients, tokens, accessibility ratios
├── typography.md            ← Fraunces / Inter / JetBrains Mono hierarchy
├── logo.md                  ← Mark, wordmark, favicon, usage rules
├── components.md            ← Full UI component inventory
├── spacing.md               ← Fibonacci grid, 8pt rhythm, breakpoints
├── imagery.md               ← Photography, icons, patterns, mockups
├── motion.md                ← Easing, duration, micro-interactions
├── accessibility.md         ← WCAG 2.2 AA compliance
├── voice.md                 ← Copywriting, tone, CTAs
│
├── tokens.json              ← Machine-readable design tokens
├── design-tokens.yml        ← YAML design tokens
├── tailwind.theme.js        ← Tailwind v3 theme extension
├── tailwind.config.js        ← Full Tailwind v3 configuration
│
├── css/
│   ├── variables.css         ← CSS custom properties
│   ├── typography.css         ← Type system styles
│   ├── buttons.css            ← Button component styles
│   ├── cards.css              ← Card component styles
│   ├── forms.css              ← Form component styles
│   └── utilities.css          ← Utility classes
│
├── scss/
│   ├── _colors.scss           ← SCSS color maps
│   ├── _spacing.scss          ← SCSS spacing maps
│   ├── _typography.scss       ← SCSS type maps
│   └── _mixins.scss           ← SCSS mixins
│
├── figma/
│   ├── naming-conventions.md  ← Layer naming rules
│   ├── auto-layout.md         ← Auto-layout conventions
│   └── component-structure.md ← Component architecture
│
├── assets/
│   ├── export-sizes.md        ← Export specifications
│   ├── logo-guidelines.md      ← Logo usage rules
│   ├── favicon-guidelines.md   ← Favicon specs
│   └── social-assets.md        ← Social media specs
│
├── templates/
│   ├── landing-page.md        ← Landing page layout
│   ├── dashboard.md           ← Dashboard layout
│   ├── pricing.md             ← Pricing page layout
│   ├── contact.md             ← Contact page layout
│   ├── stationery.md          ← Print stationery specs
│   └── presentation.md        ← Presentation deck specs
│
└── examples/
    ├── homepage.md             ← Homepage reference
    ├── mobile.md               ← Mobile reference
    ├── crm.md                  ← CRM reference
    └── admin.md                ← Admin reference
```

---

## Quick Start

### Tailwind CSS (v3)

```js
// tailwind.config.js
const bazTheme = require('./brand/tailwind.theme.js')

module.exports = {
  presets: [bazTheme],
  // ...your project config
}
```

### CSS Custom Properties

```html
<link rel="stylesheet" href="/brand/css/variables.css">
```

### Design Tokens (JSON)

```js
import tokens from './brand/tokens.json'

// Access any token: tokens.colors.accent, tokens.spacing.fib8, etc.
```

---

## Brand Identity at a Glance

| Element | Value |
|---------|-------|
| **Company** | BAZ Marketing Ventures Agency |
| **Tagline** | *Powering Your Path To Growth* |
| **Personality** | Premium, confident, editorial, precise |
| **Display font** | Fraunces (variable, optical) |
| **Body font** | Inter (variable) |
| **Code font** | JetBrains Mono |
| **Primary accent** | Gold `hsl(41, 72%, 52%)` (BlackSwan seed) |
| **Complementary accent** | Chartreuse `hsl(71, 85%, 55%)` (seed+30) |
| **Dark surface** | Near-black `hsl(41, 0.3%, 7%)` (neutral-90) |
| **Light surface** | Warm paper `hsl(41, 8%, 99%)` (neutral-0) |
| **Radius system** | Fibonacci (3, 5, 8, 13, 21, 34, 55, 89) |
| **Grid** | 12-column, 8pt rhythm |
| **Component system** | BlackSwan (hand-rolled, not shadcn/ui) |
| **Stitch assets** | 28 images in `baz/assets/brand/` — logos, favicons, business cards, letterhead, social, email, presentation, website |

---

## Stitch-Generated Brand Assets

All 28 Stitch-generated brand assets are organized in `baz/assets/brand/`:

| Directory | Files | Description |
|-----------|-------|-------------|
| `logo/` | 10 | Master logo, signature, app icon, wordmark SVGs, favicon SVGs |
| `favicon/` | 4 | 16×16 and 32×32 SVG + PNG favicons |
| `business-cards/` | 5 | Front, back, mockup, alt, print-ready |
| `stationery/` | 1 | A4 letterhead |
| `social/` | 4 | LinkedIn banner, profile pic, social card, landscape banner |
| `email/` | 1 | Email header 16:9 |
| `presentation/` | 5 | Folder flat, mockup, matte, front, print |
| `web/` | 3 | Full page screenshot, Stitch HTML, Stitch DESIGN.md |

The Stitch design system (Material 3 based) uses a complementary palette:

| Token | Hex | Role |
|-------|-----|------|
| Gold | `#C8A55A` | Primary accent |
| Gold-dark | `#8D6B2E` | Gradient start / shadows |
| Charcoal | `#1F2933` | Base background |
| Navy | `#24364A` | Secondary background |
| Sand | `#E8E4E0` | Primary text on dark |
| Stone | `#B0AAA5` | Muted text |
| White | `#FFFFFF` | Headings / maximum contrast |

Stitch uses **Outfit** (display) + **Poppins** (body) with 4px radius. The BlackSwan system uses **Fraunces** + **Inter** + **JetBrains Mono** with Fibonacci radii. Both share the gold + charcoal foundation and can coexist.

---

## Governance

Modifications to tokens (`colors.md`, `typography.md`) or foundational structures must undergo architectural review. All changes require verification against the WCAG 2.2 AA contrast matrix in `accessibility.md`.

The BlackSwan seed system (`--seed-hue: 41`) is the single source of truth. Changing it cascades to every derived color in the system. The gold hue produces warm, tinted neutrals that feel premium and editorial — no cold blue undertones anywhere.