# Logo — Mark, Wordmark & Favicon Guidelines

This document establishes the deployment rules for the BAZ brand mark, wordmark, and all graphic assets. This system enforces strict consistency.

---

## 1. Asset Inventory

The BAZ brand has the following assets across `baz/assets/brand/`:

### Logo (`logo/`)

| File | Format | Dimensions | Description |
|------|--------|-----------|-------------|
| `baz-master-logo.png` | PNG | 1024×1024 | Primary master logo — source of truth |
| `baz-signature-gold.png` | PNG | 1024×1024 | Gold handwritten BAZ signature on transparent |
| `baz-app-icon-1024x1024.png` | PNG | 1024×1024 | App icon — squircle charcoal bg + gold mark |
| `baz-logo-webp.png` | PNG | 843×470 | Web-optimized logo |
| `baz-gemini-generated.png` | PNG | 1377×768 | Gemini AI-generated brand asset |
| `baz-wordmark.svg` | SVG | Vector | Primary wordmark |
| `baz-wordmark-mono.svg` | SVG | Vector | Monochrome wordmark |
| `baz-wordmark-reverse.svg` | SVG | Vector | Reversed wordmark for dark backgrounds |
| `baz-mark.svg` | SVG | Vector | Icon mark |
| `baz-favicon.svg` | SVG | Vector | Simplified favicon |

### Favicon (`favicon/`)

| File | Format | Description |
|------|--------|-------------|
| `baz-favicon-16x16.svg` | SVG | 16×16 — charcoal bg + gold BAZ letter |
| `baz-favicon-32x32.svg` | SVG | 32×32 — higher detail version |
| `baz-favicon-16x16.png` | PNG | Raster favicon source |
| `baz-favicon-32x32.png` | PNG | Raster favicon source |

---

## 2. Logo Philosophy

The BAZ wordmark uses **Fraunces** in display weight with tight tracking. It is editorial, confident, and unmistakable. The wordmark is not decorative — it is structural. It anchors the page and sets the tone.

The **mark** (icon) is used in constrained contexts: favicons, app icons, avatars, and navigation badges. It must always be recognizable at 16px.

---

## 3. Clear Space & Spatial Isolation

### Wordmark Clear Zone
Draw an imaginary bounding box around the wordmark. Maintain a minimum safe padding equal to **35% of the wordmark's total height** on all four sides.

```
        ┌─────────────────────────────┐
        │        35% height           │
        │   ┌───────────────────┐     │
  35%   │   │                   │     │  35%
 height │   │       BAZ         │     │ height
        │   │                   │     │
        │   └───────────────────┘     │
        │        35% height           │
        └─────────────────────────────┘
```

### Mark Clear Zone
The icon mark requires a minimum padding of **25% of its rendered width** on all sides.

---

## 4. Color Rules

| Context | Wordmark Color | Background |
|---------|---------------|------------|
| Paper sections | `#0e0e0e` (ink-900) | `#f5f1ea` (paper) |
| White sections | `#0e0e0e` (ink-900) | `#ffffff` (white) |
| Ink sections | `#f5f1ea` (paper) | `#0e0e0e` (ink-900) |
| Violet accent | `hsl(270, 85%, 72%)` | `#0e0e0e` (ink-900) |
| Monochrome print | Black | White |
| Single-color | `#0e0e0e` | Transparent/White |

### ❌ Prohibited Color Uses
- **Never** apply violet as the wordmark color on paper backgrounds (insufficient contrast)
- **Never** apply gradient fills to the wordmark
- **Never** apply drop shadows or outer glows to the wordmark
- **Never** place the wordmark over complex photography without a scrim overlay
- **Never** use the gold accent (#f9a01f) as the wordmark color

---

## 5. Minimum Sizes

| Context | Minimum Width | Minimum Height |
|---------|-------------|----------------|
| Digital wordmark (desktop) | 120px | 32px |
| Digital wordmark (mobile) | 80px | 22px |
| Print wordmark | 0.75 inch (19mm) | 0.2 inch (5mm) |
| Icon mark (digital) | 24px | 24px |
| Icon mark (print) | 0.25 inch (6mm) | 0.25 inch (6mm) |
| Favicon | 16px | 16px |

---

## 6. Prohibited Modulations

### ❌ Do Not
1. Stretch or compress the wordmark horizontally or vertically
2. Rotate the wordmark at any angle
3. Add outlines, strokes, or borders around the wordmark
4. Place the wordmark on patterned or noisy backgrounds
5. Change the wordmark font (it must always be Fraunces)
6. Apply text effects (bevel, emboss, neon glow)
7. Use the wordmark as a repeating pattern element
8. Place other logos or marks within the clear zone
9. Crop or mask any portion of the wordmark
10. Use the wordmark at less than the specified minimum sizes

---

## 7. Usage Contexts

### 7.1 Navigation Header
```
┌──────────────────────────────────────────┐
│ [BAZ]    Services  Work  About  Contact │
│  mark     ──────────────────────────      │
│          nav links in Inter, 14px        │
└──────────────────────────────────────────┘
```
- Use `baz-mark.svg` (24×24) for the logo
- Use `baz-wordmark.svg` for the expanded logo on desktop
- Wordmark aligns vertically centered with the nav

### 7.2 Hero Section
```
┌──────────────────────────────────────────┐
│                                          │
│        BAZ                               │
│        (Fraunces 300, 96px)             │
│                                          │
│   Brand & Buzz. We make brands           │
│   unignorable.                           │
│                                          │
│   [Get Started]  [Our Work]              │
│                                          │
└──────────────────────────────────────────┘
```

### 7.3 Footer
```
┌──────────────────────────────────────────┐
│ [BAZ mark]                               │
│ Marketing Ventures Agency                │
│                                          │
│ Services | Work | About | Contact        │
│                                          │
│ © 2025 BAZ. All rights reserved.         │
└──────────────────────────────────────────┘
```

### 7.4 App Icon / Social Avatar
- Use `baz-mark.svg` inside a squircle container
- Background: `#0e0e0e` (ink)
- Mark color: `hsl(270, 85%, 72%)` (violet) or `#f5f1ea` (paper)
- Rounded corners: Fibonacci radius-55 (55px)

---

## 8. Favicon Specifications

| Size | Format | Notes |
|------|--------|-------|
| 16×16 | PNG | Standard favicon |
| 32×32 | PNG | High-DPI favicon |
| 48×48 | PNG | Windows taskbar |
| 64×64 | PNG | Windows taskbar high-DPI |
| 180×180 | PNG | Apple Touch Icon |
| 192×192 | PNG | Android Chrome |
| 512×512 | PNG | PWA splash |

### HTML Implementation
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

---

## 9. Print Usage

| Context | Color Mode | Minimum Size |
|---------|-----------|-------------|
| Letterhead | CMYK ink-900 | 0.75 inch width minimum |
| Business card | CMYK ink-900 | 0.5 inch width minimum |
| Embroidery | Single thread, ink-900 | 0.75 inch width minimum |
| Presentation | RGB ink-900 | 1 inch width minimum |
| Swag/Merch | As specified | 1 inch width minimum |

For print, convert HEX to CMYK:
- `#0e0e0e` → CMYK: 0, 0, 0, 96
- `hsl(270, 85%, 72%)` → CMYK: 68, 76, 0, 0

---

## 10. Export Formats

| Format | Use | Background |
|--------|-----|-----------|
| SVG | Web, vector, scalable | Transparent |
| PNG (2x) | Web raster @2x | Transparent |
| PNG (1x) | Web raster @1x | Transparent |
| PDF | Print | Transparent |
| WEBP | Modern web | Transparent or Solid |

All wordmark exports must include transparent backgrounds. Never export with a fixed background color.