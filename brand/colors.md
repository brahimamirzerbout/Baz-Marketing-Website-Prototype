> **DEPRECATED — Violet System (superseded)**
> This file documents the **old violet (`--seed-hue: 270`)** design system.
> The active system is **ÆTHER Monochrome + Gold (`--seed-hue: 41`)**.
> See `brand/css/aether-tokens.css` and `brand/css/variables-unified.css` for the current source of truth.

# Color Palette & Token System (Violet — Archived)

The BAZ color architecture is built on the BlackSwan algorithmic system. Three seed variables generate the entire palette — change `--seed-hue` and every derived color recomputes. For BAZ, the seed is locked to **270** (violet).

---

## 1. Seed Variables

```css
:root {
  --seed-hue: 270;     /* Violet — the BAZ accent */
  --seed-sat: 72%;     /* High saturation for brand vibrancy */
  --seed-lum: 50%;     /* Balanced lightness */
}
```

> ⚠️ **Never change these without architectural review.** The entire palette cascades from these three values.

---

## 2. Primary Palette

### Brand Colors

| Token | Role | HEX | HSL | OKLCH | Use |
|-------|------|-----|-----|-------|-----|
| `--c-ink-900` | Primary dark | `#0e0e0e` | `hsl(0, 0%, 5%)` | `oklch(0.14 0 0)` | Headings, dark sections, primary CTA bg |
| `--c-ink-800` | Dark hover | `#1a1a1a` | `hsl(0, 0%, 10%)` | `oklch(0.19 0 0)` | Hover on dark sections |
| `--c-ink-600` | Mid dark | `#525252` | `hsl(0, 0%, 32%)` | `oklch(0.46 0 0)` | Body copy |
| `--c-ink-500` | Mid | `#737373` | `hsl(0, 0%, 45%)` | `oklch(0.55 0 0)` | Meta text |
| `--c-ink-400` | Mid light | `#a3a3a3` | `hsl(0, 0%, 64%)` | `oklch(0.69 0 0)` | Dividers |
| `--c-paper` | Paper bg | `#f5f1ea` | `hsl(36, 33%, 95%)` | `oklch(0.96 0.02 80)` | Section background (paper sections) |
| `--c-paper-50` | Lightest card | `#faf7f1` | `hsl(38, 40%, 97%)` | `oklch(0.98 0.01 80)` | Card surface |
| `--c-paper-100` | Card surface | `#f0ebe0` | `hsl(38, 33%, 91%)` | `oklch(0.93 0.03 80)` | Card surface, soft divider |

### Accent Colors

| Token | Role | Value | Use |
|-------|------|-------|-----|
| `--accent` | Primary accent | `hsl(270, 85%, 72%)` | CTAs, highlights, focus rings, active states |
| `--accent-600` | Hover | `hsl(270, 80%, 64%)` | CTA hover |
| `--accent-700` | Active | `hsl(270, 75%, 55%)` | Active/pressed states |
| `--accent-gold` | Secondary accent | `#a0a0a0` | Brand moments only — never as primary |
| `--accent-red` | Tertiary accent | `#8a8a8a` | Urgency, errors — never as primary |

### Violet Accent Breakdown

| Shade | HEX | HSL | Use |
|-------|-----|-----|-----|
| Violet 50 | `#f5f0ff` | `hsl(270, 100%, 97%)` | Backgrounds, subtle fills |
| Violet 100 | `#ebe3ff` | `hsl(270, 100%, 94%)` | Hover surfaces |
| Violet 200 | `#d5c7ff` | `hsl(270, 100%, 88%)` | Borders on dark |
| Violet 300 | `#baabff` | `hsl(270, 100%, 81%)` | Text on ink |
| Violet 400 | `#9985ff` | `hsl(270, 85%, 76%)` | Icons, secondary accents |
| Violet 500 | `#8b5cf6` | `hsl(270, 85%, 72%)` | **Primary accent** |
| Violet 600 | `#7c3aed` | `hsl(270, 80%, 64%)` | Hover |
| Violet 700 | `#6d28d9` | `hsl(270, 75%, 55%)` | Active/pressed |
| Violet 800 | `#5b21b6` | `hsl(270, 70%, 42%)` | Dark accent |
| Violet 900 | `#4c1d95` | `hsl(270, 65%, 35%)` | Deepest accent |

---

## 3. BlackSwan Derived Palette (Algorithmic)

These tokens are computed from the seed variables and used throughout the component system:

```css
:root {
  /* Primary spectrum — computed from seed */
  --color-primary:      hsl(270, 72%, 50%);
  --color-primary-5:    hsl(270, 72%, 97%);
  --color-primary-10:   hsl(270, 72%, 93%);
  --color-primary-20:   hsl(270, 72%, 82%);
  --color-primary-30:   hsl(270, 72%, 72%);
  --color-primary-40:   hsl(270, 72%, 62%);
  --color-primary-50:   hsl(270, 72%, 52%);
  --color-primary-60:   hsl(270, 72%, 42%);
  --color-primary-70:   hsl(270, 72%, 32%);
  --color-primary-80:   hsl(270, 72%, 22%);
  --color-primary-90:   hsl(270, 72%, 12%);

  /* Accent — seed hue + 30 = 300 (magenta-violet) */
  --color-accent:       hsl(300, 85%, 55%);
  --color-accent-10:    hsl(300, 85%, 93%);
  --color-accent-20:    hsl(300, 85%, 82%);
}
```

---

## 4. Semantic & Status Colors

Highly desaturated to maintain the luxury palette. Never saturated greens or reds.

| State | Token | Light HEX | Dark HEX | Use |
|-------|-------|-----------|----------|-----|
| Success | `--color-success` | `hsl(152, 68%, 38%)` | `hsl(152, 60%, 52%)` | Confirmations, positive metrics |
| Success BG | `--color-success-10` | `hsl(152, 68%, 93%)` | `hsl(152, 30%, 14%)` | Success card backgrounds |
| Warning | `--color-warning` | `hsl(38, 92%, 45%)` | `hsl(38, 80%, 58%)` | Caution alerts |
| Warning BG | `--color-warning-10` | `hsl(38, 92%, 93%)` | `hsl(38, 40%, 14%)` | Warning card backgrounds |
| Danger | `--color-danger` | `hsl(0, 78%, 50%)` | `hsl(0, 70%, 58%)` | Errors, destructive actions |
| Danger BG | `--color-danger-10` | `hsl(0, 78%, 93%)` | `hsl(0, 35%, 14%)` | Error card backgrounds |

---

## 5. Gradient System

### Violet Gradient (Primary CTA)
```css
background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
```

### Violet Shimmer (Borders, Decorative)
```css
background: linear-gradient(
  90deg,
  rgba(139, 92, 246, 0.15) 0%,
  rgba(139, 92, 246, 0.4) 50%,
  rgba(139, 92, 246, 0.15) 100%
);
```

### Ink-to-Violet (Hero backgrounds)
```css
background: radial-gradient(
  ellipse at 50% 0%,
  rgba(139, 92, 246, 0.15) 0%,
  #0e0e0e 70%
);
```

### Paper-to-Warm (Light sections)
```css
background: linear-gradient(180deg, #faf7f1 0%, #f5f1ea 50%, #f0ebe0 100%);
```

---

## 6. Accessibility Compliance (WCAG 2.2 AA)

| Foreground | Background | Contrast Ratio | Pass? |
|-----------|------------|---------------|-------|
| `#0e0e0e` (ink-900) | `#f5f1ea` (paper) | 17.2:1 | ✅ AA + AAA |
| `#f5f1ea` (paper) | `#0e0e0e` (ink) | 17.2:1 | ✅ AA + AAA |
| `#8b5cf6` (violet) | `#0e0e0e` (ink) | 5.9:1 | ✅ AA (large + normal) |
| `#8b5cf6` (violet) | `#f5f1ea` (paper) | 3.7:1 | ⚠️ AA large only — add text-shadow or use ink-800 |
| `#ffffff` (white) | `#0e0e0e` (ink) | 18.1:1 | ✅ AA + AAA |
| `#737373` (ink-500) | `#f5f1ea` (paper) | 4.6:1 | ✅ AA normal |
| `#a3a3a3` (ink-400) | `#f5f1ea` (paper) | 2.9:1 | ❌ Fails — use ink-500 minimum on paper |

### Key Rules
1. **Never** use violet-500 text on paper backgrounds for body copy (fails AA for normal text)
2. Violet-500 on ink is ✅ safe for all text sizes
3. White on ink is ✅ safe for all text sizes
4. Ink-500 (#737373) is the **minimum** gray for readable body text on paper

---

## 7. CSS Variables (Complete)

```css
:root {
  /* ── Brand Colors ── */
  --c-ink-900: #0e0e0e;
  --c-ink-800: #1a1a1a;
  --c-ink-600: #525252;
  --c-ink-500: #737373;
  --c-ink-400: #a3a3a3;

  --c-paper: #f5f1ea;
  --c-paper-50: #faf7f1;
  --c-paper-100: #f0ebe0;

  --accent: hsl(270, 85%, 72%);
  --accent-600: hsl(270, 80%, 64%);
  --accent-700: hsl(270, 75%, 55%);
  --accent-gold: #a0a0a0;
  --accent-red: #8a8a8a;

  /* ── Violet Spectrum ── */
  --violet-50: #f5f0ff;
  --violet-100: #ebe3ff;
  --violet-200: #d5c7ff;
  --violet-300: #baabff;
  --violet-400: #9985ff;
  --violet-500: #8b5cf6;
  --violet-600: #7c3aed;
  --violet-700: #6d28d9;
  --violet-800: #5b21b6;
  --violet-900: #4c1d95;

  /* ── Semantic ── */
  --color-success: hsl(152, 68%, 38%);
  --color-warning: hsl(38, 92%, 45%);
  --color-danger: hsl(0, 78%, 50%);

  /* ─BlackSwan Seeds ── */
  --seed-hue: 270;
  --seed-sat: 72%;
  --seed-lum: 50%;
}
```

---

## 8. Tailwind Mappings

```js
// tailwind.theme.js → colors
colors: {
  ink: {
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    800: '#1a1a1a',
    900: '#0e0e0e',
  },
  paper: {
    DEFAULT: '#f5f1ea',
    50: '#faf7f1',
    100: '#f0ebe0',
    200: '#e0d8cc',
    300: '#c9bfb0',
  },
  accent: {
    DEFAULT: 'hsl(270, 85%, 72%)',
    600: 'hsl(270, 80%, 64%)',
    700: 'hsl(270, 75%, 55%)',
    gold: '#a0a0a0',
    red: '#8a8a8a',
  },
  violet: {
    50: '#f5f0ff',
    100: '#ebe3ff',
    200: '#d5c7ff',
    300: '#baabff',
    400: '#9985ff',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
}
```

---

## 9. SCSS Variables

```scss
// _colors.scss
$ink-900: #0e0e0e;
$ink-800: #1a1a1a;
$ink-600: #525252;
$ink-500: #737373;
$ink-400: #a3a3a3;

$paper: #f5f1ea;
$paper-50: #faf7f1;
$paper-100: #f0ebe0;

$accent: hsl(270, 85%, 72%);
$accent-600: hsl(270, 80%, 64%);
$accent-700: hsl(270, 75%, 55%);
$accent-gold: #a0a0a0;
$accent-red: #8a8a8a;

$violet: (
  '50': #f5f0ff,
  '100': #ebe3ff,
  '200': #d5c7ff,
  '300': #baabff,
  '400': #9985ff,
  '500': #8b5cf6,
  '600': #7c3aed,
  '700': #6d28d9,
  '800': #5b21b6,
  '900': #4c1d95,
);

$success: hsl(152, 68%, 38%);
$warning: hsl(38, 92%, 45%);
$danger: hsl(0, 78%, 50%);
```