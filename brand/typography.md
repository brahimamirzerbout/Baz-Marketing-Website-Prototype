# Typography — Fraunces × Inter × JetBrains Mono

BAZ's typographic system balances the editorial authority of a premium serif display font against the geometric clarity of a modern sans-serif for body and UI. JetBrains Mono handles data, code, and metadata.

---

## 1. Font Stack

### Display & Heading: Fraunces
```css
font-family: 'Fraunces', 'Iowan Old Style', 'Noto Serif', Georgia, serif;
```
- **Character:** Variable optical sizing, soft serif, editorial luxury
- **Source:** Self-hosted in `public/fonts/` via `next/font/local`
- **Variable axes:** `opsz` (9–144), `wght` (100–900), `SOFT` (0–100), `WONK` (0–1)
- **Usage:** Hero headlines, section headings, pull quotes, the word "BAZ" in display contexts

### Body & UI: Inter
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```
- **Character:** Geometric, highly legible at all sizes, excellent tabular figures
- **Source:** Self-hosted via `next/font/local`
- **Variable axes:** `wght` (100–900), `ital`
- **Usage:** Body copy, navigation, buttons, form labels, data tables

### Code & Data: JetBrains Mono
```css
font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
```
- **Character:** Ligatures, clear distinction between similar glyphs, excellent for data
- **Source:** Self-hosted via `next/font/local`
- **Usage:** Eyebrows, metadata labels, code blocks, data tables, timestamps

### BlackSwan Serif Fallback: Merriweather
```css
font-family: 'Merriweather', 'Iowan Old Style', 'Noto Serif', Georgia, serif;
```
- **Usage:** Fallback in BlackSwan component system when Fraunces is unavailable

---

## 2. Typographic Scale

The scale uses a **Major Third** ratio (1.25) with optical size adjustments for Fraunces.

| Token | Element | Size (px) | Size (rem) | Font | Weight | Line Height | Tracking | Use |
|-------|---------|-----------|-----------|------|--------|------------|----------|-----|
| `--text-display` | Hero `h1` | 96 | 6.0 | Fraunces | 300 | 0.95 | -0.04em | Hero headlines |
| `--text-display-xl` | Display XL | 72 | 4.5 | Fraunces | 400 | 1.0 | -0.035em | Large marketing headlines |
| `--text-display-l` | Display L / `h2` | 48 | 3.0 | Fraunces | 400 | 1.05 | -0.03em | Section headers |
| `--text-display-m` | Display M | 32 | 2.0 | Fraunces | 500 | 1.15 | -0.02em | Card titles, sub-headers |
| `--text-2xl` | H2 | 39 | 2.441 | Inter | 600 | 1.15 | -0.02em | Dashboard headings |
| `--text-xl` | H3 | 31 | 1.953 | Inter | 500 | 1.15 | -0.01em | Panel titles |
| `--text-lg` | H4 | 25 | 1.563 | Inter | 500 | 1.3 | 0 | Component headings |
| `--text-md` | H5 | 20 | 1.25 | Inter | 500 | 1.3 | 0 | Subheadings |
| `--text-base` | Body | 16 | 1.0 | Inter | 400 | 1.55 | 0 | Default body copy |
| `--text-sm` | Small | 13 | 0.8 | Inter | 400 | 1.55 | 0.01em | Captions, secondary |
| `--text-xs` | Micro | 10 | 0.64 | Inter | 500 | 1.4 | 0.02em | Badges, labels |
| `--text-2xs` | Nano | 8 | 0.512 | Inter | 600 | 1.2 | 0.03em | Overlines |
| `--text-eyebrow` | Eyebrow | 11 | 0.6875 | JetBrains Mono | 400 | 1.2 | 0.18em | Section eyebrows (UPPERCASE) |
| `--text-meta` | Meta | 10 | 0.625 | JetBrains Mono | 400 | 1.4 | 0.15em | Metadata, timestamps |

---

## 3. Responsive & Fluid Typography

### Fluid Scale (CSS Clamp)

```css
/* Hero headline — Fraunces */
.baz-display-hero {
  font-family: var(--font-fraunces);
  font-size: clamp(2.5rem, 7vw, 6rem);
  font-weight: 300;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--c-ink-900);
}

/* Section heading — Fraunces */
.baz-display-l {
  font-family: var(--font-fraunces);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

/* Body lead — Inter */
.baz-body-lead {
  font-family: var(--font-inter);
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 400;
  line-height: 1.6;
  color: var(--c-ink-600);
}

/* Eyebrow — JetBrains Mono */
.baz-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}
```

---

## 4. Heading Hierarchy

### H1 — Hero Headline
```html
<h1 class="font-display text-[clamp(2.5rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[0.95]">
  Brand & Buzz.
</h1>
```
- Font: Fraunces 300 (Light)
- Minimum: 40px | Maximum: 96px
- Tracking: -0.04em (tight)

### H2 — Section Heading
```html
<h2 class="font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.03em] leading-[1.05]">
  Powering Your Path To Growth
</h2>
```
- Font: Fraunces 400 (Regular)
- Tracking: -0.03em

### H3 — Panel Title
```html
<h3 class="text-xl font-medium tracking-[-0.01em] leading-[1.15]">
  Service Pillar
</h3>
```
- Font: Inter 500 (Medium)

### Eyebrow (overline)
```html
<p class="font-mono uppercase tracking-[0.18em] text-[11px] text-accent">
  ● Brand & Identity
</p>
```
- Font: JetBrains Mono 400
- Size: 11px fixed
- Tracking: 0.18em
- Transform: uppercase
- Always prefixed with a `●` bullet in accent color

---

## 5. CSS Variables (Complete)

```css
:root {
  /* Font Stacks */
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Fraunces', 'Iowan Old Style', 'Noto Serif', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
  --font-display: var(--font-serif); /* Alias for clarity */

  /* Modular Scale — 1.25 Major Third */
  --ratio: 1.25;
  --text-2xs:  calc(1rem / var(--ratio) / var(--ratio) / var(--ratio)); /* ~8px */
  --text-xs:   calc(1rem / var(--ratio) / var(--ratio));                /* ~10px */
  --text-sm:   calc(1rem / var(--ratio));                                /* ~13px */
  --text-base: 1rem;                                                     /* 16px */
  --text-md:   calc(1rem * var(--ratio));                                /* ~20px */
  --text-lg:   calc(1rem * var(--ratio) * var(--ratio));                 /* ~25px */
  --text-xl:   calc(1rem * var(--ratio) * var(--ratio) * var(--ratio));  /* ~31px */
  --text-2xl:  calc(1rem * var(--ratio) * var(--ratio) * var(--ratio) * var(--ratio)); /* ~39px */

  /* Display sizes (Fraunces — not on scale) */
  --text-display-m: 2rem;     /* 32px */
  --text-display-l: 3rem;     /* 48px */
  --text-display-xl: 4.5rem;  /* 72px */
  --text-display: 6rem;       /* 96px */

  /* Line Heights */
  --leading-none:    1;
  --leading-tight:   1.15;
  --leading-snug:    1.3;
  --leading-normal:  1.55;
  --leading-relaxed: 1.7;

  /* Letter Spacing */
  --tracking-tighter: -0.04em;
  --tracking-tight:   -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.03em;
  --tracking-wider:    0.06em;
  --tracking-widest:   0.1em;
  --tracking-eyebrow:  0.18em;

  /* Font Weights */
  --weight-light:    300;
  --weight-normal:   400;
  --weight-medium:   500;
  --weight-semi:     600;
  --weight-bold:     700;
  --weight-extra:    800;
  --weight-black:    900;
}
```

---

## 6. Tailwind Configuration

```js
// tailwind.theme.js → fontFamily
fontFamily: {
  display: ['Fraunces', 'Iowan Old Style', 'Noto Serif', 'Georgia', 'serif'],
  sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'ui-monospace', 'monospace'],
},

// tailwind.theme.js → fontSize
fontSize: {
  '2xs':  ['0.512rem', { lineHeight: '1.2' }],
  'xs':   ['0.64rem',  { lineHeight: '1.4' }],
  'sm':   ['0.8rem',   { lineHeight: '1.55' }],
  'base': ['1rem',     { lineHeight: '1.55' }],
  'md':   ['1.25rem',  { lineHeight: '1.3' }],
  'lg':   ['1.563rem', { lineHeight: '1.3' }],
  'xl':   ['1.953rem', { lineHeight: '1.15' }],
  '2xl':  ['2.441rem', { lineHeight: '1.15' }],
  '3xl':  ['3.052rem', { lineHeight: '1.1' }],
  '4xl':  ['3.815rem', { lineHeight: '1.1' }],
},
```

---

## 7. Accessibility

1. **Minimum readable body text:** 16px (1rem) at weight 400
2. **Minimum contrast for body text:** 4.5:1 (WCAG AA) — use `ink-600` on `paper` or `ink-500` minimum
3. **Eyebrow text** at 11px requires 700 weight OR 4.5:1 contrast ratio
4. **Never use Fraunces below 20px** for running text — optical sizing handles this, but below 20px, switch to Inter
5. **All-caps eyebrow text** must have 0.15em+ letter spacing for legibility
6. **Fluid clamp values** must maintain readability at all breakpoints — test at 320px