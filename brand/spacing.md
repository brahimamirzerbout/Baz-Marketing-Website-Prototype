# Spacing — Fibonacci Grid & 8pt Rhythm

BAZ uses a dual spacing system: an **8-point base rhythm** for component internals and a **Fibonacci scale** for larger architectural spacing. This creates organic, Da Vinci-proportioned layouts while maintaining pixel-perfect component consistency.

---

## 1. The 8-Point Rhythm (Component Spacing)

All component-internal spacing — padding, margins, gaps, icon offsets — snaps to the 8-point grid.

| Token | Value | Use |
|-------|-------|-----|
| `--space-0` | 0 | Reset |
| `--space-px` | 0.0625rem (1px) | Hairline borders |
| `--space-0-5` | 0.125rem (2px) | Micro adjustments |
| `--space-1` | 0.25rem (4px) | Tight inline padding, badge insets |
| `--space-1-5` | 0.375rem (6px) | Small gaps |
| `--space-2` | 0.5rem (8px) | Base unit — icon gaps, input padding |
| `--space-2-5` | 0.625rem (10px) | Intermediate |
| `--space-3` | 0.75rem (12px) | Form field gaps |
| `--space-3-5` | 0.875rem (14px) | Intermediate |
| `--space-4` | 1rem (16px) | Card content padding, list gaps |
| `--space-5` | 1.25rem (20px) | Component section gaps |
| `--space-6` | 1.5rem (24px) | Row gaps, mobile gutters |
| `--space-7` | 1.75rem (28px) | Intermediate |
| `--space-8` | 2rem (32px) | Block-level splits |
| `--space-9` | 2.25rem (36px) | Intermediate |
| `--space-10` | 2.5rem (40px) | Section sub-divisions |
| `--space-12` | 3rem (48px) | Hero eyebrow-to-headline gap |
| `--space-14` | 3.5rem (56px) | Intermediate |
| `--space-16` | 4rem (64px) | Section padding (mobile) |
| `--space-20` | 5rem (80px) | Section padding (tablet) |
| `--space-24` | 6rem (96px) | Section padding (desktop) |
| `--space-28` | 7rem (112px) | Hero top padding |
| `--space-32` | 8rem (128px) | Hero vertical padding |
| `--space-36` | 9rem (144px) | Macro section gaps |
| `--space-40` | 10rem (160px) | Full-bleed section gaps |
| `--space-48` | 12rem (192px) | Major section separations |
| `--space-56` | 14rem (224px) | Signature spacing |
| `--space-64` | 16rem (256px) | Maximum separation |

---

## 2. Fibonacci Radius Scale

All border radii use the Fibonacci sequence for organic, premium curvature:

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
| `--radius-full` | 9999px | Pills, avatars, circular buttons |

### BlackSwan Base Radii (also available)
```css
--radius-none: 0;
--radius-xs:   0.125rem;   /* 2px */
--radius-sm:   0.25rem;    /* 4px */
--radius-md:   0.5rem;     /* 8px */
--radius-lg:   0.75rem;    /* 12px */
--radius-xl:   1rem;       /* 16px */
--radius-2xl:  1.5rem;     /* 24px */
--radius-3xl:  2rem;       /* 32px */
--radius-full: 9999px;
```

> **Rule:** Use Fibonacci radii for BAZ-specific components. Use BlackSwan base radii for generic utility classes. Never use arbitrary values.

---

## 3. Grid System

### 12-Column Grid
BAZ uses a standard 12-column grid on desktop, degrading to 8 and 4 columns on smaller viewports.

```css
.baz-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--space-6); /* 24px */
}
```

### Column Spans

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Full-width | 12 cols | 8 cols | 4 cols |
| Main content | 8 cols | 8 cols | 4 cols |
| Sidebar | 4 cols | — | — |
| Stat card | 3 cols | 4 cols | 2 cols |
| Feature card | 4 cols | 4 cols | 4 cols |
| Hero text | 7 cols | 8 cols | 4 cols |

### Tailwind Implementation
```js
// Hero text: max-w-5xl for primary, max-w-3xl for lead paragraph
// Section grids: grid lg:grid-cols-12 gap-10
// Stat grid: grid grid-cols-2 md:grid-cols-4 gap-px
```

---

## 4. Breakpoints

| Token | Min Width | Cols | Gutter | Container Max |
|-------|----------|-------|---------|--------------|
| `sm` | 640px | 4 | 16px | 100% |
| `md` | 768px | 8 | 24px | 100% |
| `lg` | 1024px | 12 | 24px | 100% |
| `xl` | 1280px | 12 | 24px | 1280px |
| `2xl` | 1536px | 12 | 24px | 1440px |

### Container
```css
.baz-container {
  width: 100%;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-6);   /* 24px mobile */
  padding-right: var(--space-6);
}

@media (min-width: 1024px) {
  .baz-container {
    padding-left: var(--space-12);  /* 48px desktop */
    padding-right: var(--space-12);
  }
}
```

---

## 5. Section Spacing

### Hero Section
```css
.baz-hero {
  padding-top: var(--space-16);    /* 64px mobile → 96px desktop */
  padding-bottom: var(--space-20); /* 80px mobile → 128px desktop */
}

@media (min-width: 768px) {
  .baz-hero {
    padding-top: var(--space-24);  /* 96px */
    padding-bottom: var(--space-32); /* 128px */
  }
}
```

### Content Section
```css
.baz-section {
  padding-top: var(--space-20);    /* 80px */
  padding-bottom: var(--space-20); /* 80px */
}

@media (min-width: 768px) {
  .baz-section {
    padding-top: var(--space-32);  /* 128px */
    padding-bottom: var(--space-32);
  }
}
```

### Inter-Element Gaps (Hero Convention)
| From → To | Spacing |
|-----------|---------|
| Eyebrow → Headline | `mt-6` (24px) |
| Headline → CTA row | `mt-10` (40px) |
| CTA → Trust strip | `mt-12` (48px) |
| Trust → Stat grid | `mt-16 md:mt-20` (64px → 80px) |
| Stat → Demo | `mt-20` (80px) |

---

## 6. Responsive Layout Rules

### Mobile (< 640px)
- Single column layout
- Full-width cards
- Reduced vertical padding (80px sections)
- Hamburger navigation
- Stacked stat grid (2 columns)

### Tablet (640px – 1024px)
- 8-column grid
- Side-by-side feature cards (2 cols)
- Stat grid: 4 columns
- Expanded navigation

### Desktop (1024px+)
- 12-column grid
- Full layout freedom
- Sidebars enabled
- Hover states active
- Magnetic CTA effects

### Ultra-wide (1440px+)
- Container maxes at 1440px
- Generous horizontal margins
- Hero text constrained to `max-w-5xl`