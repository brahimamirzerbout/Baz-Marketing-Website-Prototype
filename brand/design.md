# Visual Design System — Philosophy, Layout & Guardrails

This document defines the visual principles, spatial systems, elevation models, and behavioral rules for BAZ Marketing Ventures Agency. All designers and developers must implement these specifications to guarantee brand consistency.

---

## 1. Core Design Principles

### 1.1 Editorial Luxury Through Restraint
BAZ's visual identity channels the authority of premium editorial publications — think *Monocle*, *Cereal*, *Kinfolk* — not the flash of consumer tech. Premium execution is achieved through:
- Absolute typographic clarity
- Vast margins of negative space
- Deliberate contrast between organic handwritten forms and rigid geometric grids
- A restrained color palette where violet is the singular accent

### 1.2 Algorithmic Consistency
The BlackSwan Design System ensures no arbitrary values. Every color, every space, every radius is computed from three seed variables. This eliminates "designer drift" — if two elements look slightly different, one of them is wrong.

### 1.3 Structural Functionalism
Aesthetic form follows corporate function. Every interaction must feel fast, deliberate, and premium. Decorative elements that don't serve information hierarchy are removed.

### 1.4 Violet as Accent, Never Foundation
The violet accent `hsl(270, 85%, 72%)` is a premium signature — it commands attention precisely because it's used sparingly. It appears on:
- Primary CTAs
- Active navigation states
- Focus rings
- Data highlights
- Brand mark accents

It must **never** be used as:
- Large background fills
- Body text color
- Card backgrounds
- Section backgrounds (except `ink`-tone hero sections with violet as a highlight)

---

## 2. Layout & Negative Space

### 2.1 Macro Whitespace
Maintain a minimum of 120px (3rem) separation between major content sections on large viewports. Sections breathe. They never crowd.

### 2.2 Micro Whitespace
Form fields, interactive components, and list items must use generous interior padding per the 8pt rhythm system defined in `spacing.md`.

### 2.3 The Law of Spatial Isolation
The BAZ wordmark requires a clear zone equal to 35% of its total rendered height on all four sides. No text, borders, or graphic elements may encroach on this zone.

### 2.4 Section Tones
Three reusable section backgrounds via `<Section tone="...">`:

| Tone | Background | Heading Color | Purpose |
|------|-----------|--------------|---------|
| `paper` | `#f5f1ea` | `text-ink-900` | Default. Most sections |
| `white` | `#ffffff` | `text-ink-900` | Visual breathing between paper sections |
| `ink` | `#0e0e0e` | `text-paper` | KPI bands, CTAs, callouts |

---

## 3. Elevation, Radius & Layering

### 3.1 Fibonacci Radius System
BAZ uses a Fibonacci-based radius scale — not arbitrary 4px/8px/12px increments. This creates organic, Da Vinci-inspired curvature that feels premium and intentional:

| Token | Value | Use |
|-------|-------|-----|
| `--radius-fib3` | 3px | Badges, tags, micro-overlays |
| `--radius-fib5` | 5px | Inputs, small buttons, toggles |
| `--radius-fib8` | 8px | Standard buttons, dropdowns |
| `--radius-fib13` | 13px | Cards, modals, panels |
| `--radius-fib21` | 21px | Hero containers, feature blocks |
| `--radius-fib34` | 34px | Large overlay panels |
| `--radius-fib55` | 55px | Full-width sections |
| `--radius-fib89` | 89px | Hero blobs, decorative elements |
| `--radius-full` | 9999px | Pills, avatars, circular elements |

### 3.2 Elevation & Shadow Tokens
BAZ uses a flat-yet-layered depth model inspired by Linear and Vercel. Shadows are subtle, crisp, and never diffuse:

| Level | Token | Use | Shadow |
|-------|-------|-----|--------|
| 0 | `--shadow-none` | Flat canvas | none |
| 1 | `--shadow-xs` | Resting cards | `0 1px 2px rgba(0,0,0,.03)` |
| 2 | `--shadow-sm` | Hovering cards | `0 1px 3px rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.06)` |
| 3 | `--shadow-md` | Elevated panels | `0 4px 6px -1px rgba(0,0,0,.07), 0 2px 4px -2px rgba(0,0,0,.05)` |
| 4 | `--shadow-lg` | Floating dropdowns | `0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -4px rgba(0,0,0,.04)` |
| 5 | `--shadow-xl` | Modals, overlays | `0 20px 25px -5px rgba(0,0,0,.10), 0 8px 10px -6px rgba(0,0,0,.04)` |
| 6 | `--shadow-2xl` | Hero emphasis | `0 25px 50px -12px rgba(0,0,0,.16)` |

On dark (`ink`) sections, shadows strengthen:
- `--shadow-md` becomes `0 4px 6px -1px rgba(0,0,0,.4)`
- `--shadow-xl` becomes `0 20px 25px -5px rgba(0,0,0,.5)`

### 3.3 Surface Layers (Material 3 inspired)
BAZ implements a 5-tier surface system:

| Tier | CSS Variable | Light | Dark | Use |
|------|-------------|-------|------|-----|
| 0 | `--bg` | `#f5f1ea` (paper) | `hsl(270, 8%, 6%)` | Page background |
| 1 | `--bg-muted` | `#faf7f1` | `hsl(270, 6%, 9%)` | Muted sections |
| 2 | `--bg-subtle` | `#f0ebe0` | `hsl(270, 5%, 14%)` | Cards on paper |
| 3 | `--bg-emphasis` | `#e0d8cc` | `hsl(270, 2%, 22%)` | Elevated cards |
| 4 | `--surface-inverse` | `#0e0e0e` | `#f5f1ea` | Inverted sections |

---

## 4. Component Architecture

### 4.1 BlackSwan Components (Hand-Rolled)
BAZ uses the BlackSwan Design System for components — **never shadcn/ui**. All components are built from CSS custom properties that cascade from the three seed variables. Components include:

- **Button** — 6 variants × 5 sizes + icon, block, connected group
- **Input** — Text, textarea, select, checkbox, radio, toggle
- **Card** — 5 variants (default, flat, bordered, ghost, highlight)
- **Paper** — Long-form article surface, 3 variants
- **Document** — Invoice/contract/letter template
- **Alert** — 4 severity levels with icon support
- **Badge** — 6 colors, 3 sizes, dot indicator
- **Toast** — Notification toasts with enter/exit animation
- **Modal** — Dialog overlay with 4 sizes
- **Table** — Data table with striped variant
- **Avatar** — 6 sizes, status dots, stack
- **Skeleton** — Shimmer loading placeholders

### 4.2 Component Principles
1. **Zero runtime JS for styling** — CSS custom properties only
2. **Zero build step** — just import the CSS
3. **Zero dependencies** — no npm packages for styling
4. **The cascade is the algorithm**

---

## 5. Brand Guardrails

### ✅ Do
- Use `ink` (#0e0e0e) and `paper` (#f5f1ea) as foundational canvases
- Pair the BAZ wordmark with structured Fraunces/Inter typography
- Maintain 120px+ macro whitespace between sections
- Use violet `hsl(270, 85%, 72%)` as the singular accent for CTAs and highlights
- Apply Fibonacci radii (3, 5, 8, 13, 21…) for organic curvature
- Use subtle 1px violet rules as section dividers
- Use the magnetic CTA pattern for hero buttons

### ❌ Don't
- Use violet as a background fill for large areas
- Apply drop shadows, outer glows, or heavy reflections to the wordmark
- Mix gold (#f9a01f) and red (#ff3b2f) as simultaneous accents
- Use shadcn/ui components — always use BlackSwan
- Use arbitrary 4px/8px/12px radius values — stick to Fibonacci
- Use Playfair Display (use Fraunces instead)
- Use Tailwind v4 syntax (use v3 only)

---

## 6. UI Examples

### 6.1 Landing Page Masthead
```
┌─────────────────────────────────────────────────┐
│  [BAZ mark]         NAV ITEMS         [CTA →]  │
│                                                  │
│                                                  │
│        Brand & Buzz.                            │
│        We make brands                            │
│        unignorable.                              │
│                                                  │
│           [Get Started]  [Our Work]              │
│                                                  │
│    ● 240+ brands  ● $2B+ revenue  ● 12 years   │
│                                                  │
│         ═════════════════════════                │
│              (divider line)                      │
└─────────────────────────────────────────────────┘
```

### 6.2 Stat Grid Pattern
```
┌──────────┬──────────┬──────────┬──────────┐
│  240+    │  $2B+    │  98%     │  12      │
│  brands  │  revenue │  retain  │  years   │
└──────────┴──────────┴──────────┴──────────┘
```
Background: `paper` with `ink-100` 1px dividers between cells.

### 6.3 Dark Section (Ink Tone)
```
┌─────────────────────────────────────────────────┐
│  ████████  INK BACKGROUND (#0e0e0e)  ████████  │
│                                                  │
│     "Brands are verbs, not nouns."              │
│                  — BAZ                           │
│                                                  │
│     [Start Your Project →]                       │
│                                                  │
└─────────────────────────────────────────────────┘
```
White/violet text on ink. No gradients.