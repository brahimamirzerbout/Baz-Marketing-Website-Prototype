---
name: BAZ Marketing
colors:
  surface: '#16130e'
  surface-dim: '#16130e'
  surface-bright: '#3d3932'
  surface-container-lowest: '#110e09'
  surface-container-low: '#1e1b16'
  surface-container: '#221f1a'
  surface-container-high: '#2d2924'
  surface-container-highest: '#38342e'
  on-surface: '#e9e1d8'
  on-surface-variant: '#d0c5b3'
  inverse-surface: '#e9e1d8'
  inverse-on-surface: '#34302a'
  outline: '#998f7f'
  outline-variant: '#4d4638'
  surface-tint: '#e7c274'
  primary: '#e7c274'
  on-primary: '#402d00'
  primary-container: '#c8a55a'
  on-primary-container: '#513b00'
  inverse-primary: '#765a16'
  secondary: '#b5c8e1'
  on-secondary: '#203245'
  secondary-container: '#36485d'
  on-secondary-container: '#a4b7cf'
  tertiary: '#b2c6fb'
  on-tertiary: '#1a2f5b'
  tertiary-container: '#96a9dd'
  on-tertiary-container: '#2a3d6a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdf9f'
  primary-fixed-dim: '#e7c274'
  on-primary-fixed: '#261a00'
  on-primary-fixed-variant: '#5b4300'
  secondary-fixed: '#d1e4fe'
  secondary-fixed-dim: '#b5c8e1'
  on-secondary-fixed: '#091d30'
  on-secondary-fixed-variant: '#36485d'
  tertiary-fixed: '#d9e2ff'
  tertiary-fixed-dim: '#b2c6fb'
  on-tertiary-fixed: '#011945'
  on-tertiary-fixed-variant: '#324573'
  background: '#16130e'
  on-background: '#e9e1d8'
  surface-variant: '#38342e'
  gold-dark: '#8D6B2E'
  charcoal: '#1F2933'
  sand: '#E8E4E0'
  stone: '#B0AAA5'
  white: '#FFFFFF'
typography:
  hero-h1:
    fontFamily: Outfit
    fontSize: 72px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  hero-h1-mobile:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  eyebrow:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.3em
  body-lg:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
  body-md:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.2em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  max-width: 1280px
  section-padding-y-desktop: 8rem
  section-padding-y-mobile: 6rem
  gutter: 1.5rem
---

# BAZ Marketing Website — Design System (Anderson Projects)

**Brand personality:** premium, dark, architectural, editorial, confident. 
**Aesthetic:** "Architectural monograph" — sharp lines, deliberate whitespace, and a single warm-gold accent.

---

## 1. Colour

The palette is dark-first with high-contrast metallic accents.

| Token    | Hex       | Role |
|----------|-----------|------|
| Gold     | `#C8A55A` | Primary accent. Brand mark, call-to-action buttons, key stats, eyebrows. |
| Gold-dark| `#8D6B2E` | Gradient start / shadows. |
| Charcoal | `#1F2933` | Base background. |
| Navy     | `#24364A` | Secondary background / depth. |
| Sand     | `#E8E4E0` | Primary text on dark. |
| Stone    | `#B0AAA5` | Muted text / body. |
| White    | `#FFFFFF` | Headings / maximum contrast. |

**Rules:**
- **Section Rhythm:** Alternate Charcoal (`#1F2933`) and Navy (`#24364A`) for dark sections. Use White/Light Gray for editorial light sections.
- **Accent Discipline:** Gold is the *only* saturated color. 
- **Hairlines:** Dividers use `border-white/10` on dark backgrounds.

---

## 2. Typography

- **Display:** Outfit (Weights 400, 500, 600) — All headings, uppercase, tight tracking.
- **Body:** Poppins (Weights 300, 400) — All UI and paragraph text.

### Patterns
- **Hero H1:** Outfit, Uppercase, `text-7xl`, `tracking-tight`.
- **Eyebrow:** `text-sm font-semibold tracking-[0.3em] uppercase text-[#C8A55A]`.
- **Labels:** Wide letter-spacing (`0.2em+`) for small caps.

---

## 3. Shape & Layout

- **Hard Rule: Square Corners.** 4px border-radius everywhere (`rounded-[4px]`). No fully rounded pills except for very specific UI markers.
- **Max Width:** 1280px (`max-w-7xl`).
- **Section Padding:** `py-24 sm:py-32`.

---

## 4. Components

- **Nav:** Fixed, transparent → solid charcoal with backdrop-blur. 
- **Primary Button:** Gold gradient (`#8D6B2E` to `#C8A55A`), white text, square corners (4px).
- **Secondary Button:** Transparent, gold border, gold text.
- **Cards:** Subtle borders (`border-white/10`), no shadows, elegant typography.
- **Logo Watermarks:** Ghostly "BAZ" script at 6% opacity behind Hero and Contact headings only.

---

## 5. Interaction (Motion)

- **Scroll Reveal:** AOS (Animate On Scroll) for all sections. 
- **Smooth Scroll:** Lenis.
- **Hover:** Subtle lift (`-2px`) and brighten. No button glow.
