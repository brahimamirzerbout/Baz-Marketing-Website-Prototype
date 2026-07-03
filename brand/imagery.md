# Imagery — Photography, Icons & Mockups

---

## 1. Photography Direction

### Style Principles
BAZ photography follows an **editorial documentary** style — think *Monocle*, *Kinfolk*, *Cereal Magazine*. Images must feel:
- **Authentic** — Real people, real work, real results. No stock-model poses.
- **Premium** — High resolution, considered composition, natural lighting.
- **Minimal** — Generous negative space. One subject per frame when possible.
- **Warm** — Paper-toned `#f5f1ea` warmth in post-processing. Avoid cold blue tones.
- **Desaturated** — Pull vibrance down 15-20%. Colors should feel editorial, not commercial.

### Treatment
- **Aspect ratios:** 16:9 (hero), 4:3 (cards), 1:1 (social), 3:4 (portraits)
- **Overlay on ink sections:** `mix-blend-mode: luminosity` at 40% opacity
- **Overlay on paper sections:** Subtle `sepia(0.1) brightness(1.02)` warm filter
- **Never** apply heavy Instagram-style filters
- **Never** use images with visible smartphone reflections or forced smiles

### Color Grading
```css
.baz-image-warm {
  filter: sepia(0.1) brightness(1.02) saturate(0.85);
}

.baz-image-ink-overlay {
  filter: grayscale(0.3) brightness(0.8);
  mix-blend-mode: luminosity;
}
```

---

## 2. Iconography

### System
BAZ uses a **stroke-based** icon system at 24px base size with 1.5px stroke width.

| Property | Value |
|----------|-------|
| Grid | 24×24px |
| Stroke width | 1.5px |
| Stroke cap | round |
| Stroke join | round |
| Fill | none (stroke-only) |
| Color | Inherited from `currentColor` |
| Radius | 2px corner radius on rectangular shapes |

### Icon Sizes
| Size | Canvas | Stroke | Use |
|------|---------|--------|-----|
| `sm` | 16×16 | 1.5px | Inline, badges |
| `md` | 20×20 | 1.5px | Buttons, nav |
| `lg` | 24×24 | 1.5px | Standard |
| `xl` | 32×32 | 2px | Feature blocks |
| `2xl` | 48×48 | 2px | Hero illustrations |

### Icon + Label Pattern
```html
<div class="flex items-center gap-2">
  <svg class="w-5 h-5" /><!-- 20px icon -->
  <span class="text-sm">Label</span>
</div>
```

Spacing between icon and label: `gap-2` (8px).

---

## 3. Patterns & Backgrounds

### Grid Pattern
```css
.bg-grid {
  background-image:
    linear-gradient(rgba(14, 14, 14, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 14, 14, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### Mesh Gradient
```css
.bg-mesh {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.08), transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.05), transparent 50%);
}
```

### Paper Grain Texture
```css
.bg-grain {
  background-image: url("data:image/svg+xml,...");
  opacity: 0.03;
  mix-blend-mode: overlay;
}
```

### Layer Recipe (Hero)
```html
<div class="bg-paper relative overflow-hidden">
  <div class="bg-grid opacity-50 absolute inset-0"></div>
  <div class="bg-mesh opacity-90 absolute inset-0"></div>
  <div class="bg-grain absolute inset-0"></div>
  <!-- Content above -->
</div>
```

---

## 4. Mockups & Templates (Stitch-Generated Assets)

All Stitch-generated brand assets live in `baz/assets/brand/`:

### Business Cards (`business-cards/`)

| File | Dimensions | Description |
|------|-----------|-------------|
| `baz-business-card-front.png` | 1264×848 | Front — dark charcoal + gold mark |
| `baz-business-card-back.png` | 1264×848 | Back — large centered mark |
| `baz-business-card-mockup-front.png` | 1264×848 | Photorealistic mockup (front) |
| `baz-business-card-alt-front.png` | 1264×848 | Alternative front design |
| `baz-business-card-print-ready.png` | 1264×848 | Print-ready version |

### Letterhead (`stationery/`)

| File | Dimensions | Description |
|------|-----------|-------------|
| `baz-letterhead-a4.png` | 896×1200 | A4 letterhead — pure white + gold accents |

### Email Signature (`email/`)

| File | Dimensions | Description |
|------|-----------|-------------|
| `baz-email-header-16x9.png` | 1376×768 | Email header — white bg, gold accent line |

### Presentation (`presentation/`)

| File | Dimensions | Description |
|------|-----------|-------------|
| `baz-presentation-folder-flat.png` | 896×1200 | Flat A4 folder design |
| `baz-presentation-folder-mockup.png` | 1200×896 | Photorealistic folder mockup |
| `baz-presentation-folder-matte.png` | 1200×896 | Matte finish mockup |
| `baz-presentation-folder-front.png` | 1200×896 | Front cover design |
| `baz-presentation-folder-print.png` | 1200×896 | Print-ready version |

### Social Media (`social/`)

| File | Dimensions | Description |
|------|-----------|-------------|
| `baz-linkedin-banner-1376x768.png` | 1376×768 | LinkedIn/banner — dark charcoal + gold |
| `baz-social-profile-1024x1024.png` | 1024×1024 | Social profile picture — square |
| `baz-social-card-1024x1024.png` | 1024×1024 | Social media post card — square |
| `baz-landscape-banner-16x9.png` | 1376×768 | Landscape banner (16:9) — dark charcoal |

### Website (`web/`)

| File | Description |
|------|-------------|
| `baz-website-full-page.png` | Full-page Stitch website screenshot |
| `baz-website-stitch.html` | Complete Stitch-generated website (Tailwind + Outfit/Poppins) |
| `DESIGN-stitch.md` | Stitch-generated Material 3 design tokens |

---

## 5. Social Media Specifications

| Platform | Asset File | Size (px) | Format | Notes |
|----------|------------|-----------|--------|-------|
| LinkedIn Banner | `baz-linkedin-banner-1376x768.png` | 1376×768 | PNG | Dark charcoal bg, gold accent |
| Social Profile | `baz-social-profile-1024x1024.png` | 1024×1024 | PNG | Square profile picture |
| Social Card | `baz-social-card-1024x1024.png` | 1024×1024 | PNG | Square post card |
| Landscape Banner | `baz-landscape-banner-16x9.png` | 1376×768 | PNG | 16:9 banner |

Additional specifications (not yet generated as assets):

| Platform | Size (px) | Format | Notes |
|----------|-----------|--------|-------|
| Facebook Cover | 1640×624 | PNG/JPG | Dark charcoal bg, gold accent |
| X/Twitter Header | 1500×500 | PNG/JPG | Dark charcoal bg, gold accent |
| Instagram Post | 1080×1080 | PNG/JPG | Paper bg, centered wordmark |
| Instagram Story | 1080×1920 | PNG/JPG | Dark charcoal bg, gold accent, vertical |
| YouTube Banner | 2560×1440 | PNG/JPG | Safe area: 1546×423 center |

### Social Post Template (1080×1080)
```
┌──────────────────────────────────────────┐
│                                          │
│   ● Eyebrow text (violet, mono, 11px)   │
│                                          │
│   Headline here                          │
│   (Fraunces, 48-64px, ink-900)          │
│                                          │
│   Supporting text goes here              │
│   (Inter, 16px, ink-500)                │
│                                          │
│                                          │
│   [CTA Button]                           │
│                                          │
│   ─── violet line ───                    │
│   BAZ Marketing Ventures Agency          │
│   bazagency.com                          │
└──────────────────────────────────────────┘
```

---

## 6. Presentation Slides (1920×1080)

### Title Slide
```
┌──────────────────────────────────────────────────┐
│  ████████████████████  INK BG  ████████████████  │
│                                                  │
│     ● Section Label (violet, mono, 11px)         │
│                                                  │
│     Presentation Title Here                       │
│     (Fraunces 300, 72px, paper)                  │
│                                                  │
│     Subtitle or date                              │
│     (Inter 400, 20px, ink-400)                  │
│                                                  │
│                    [BAZ mark, bottom-right]       │
└──────────────────────────────────────────────────┘
```

### Content Slide
```
┌──────────────────────────────────────────────────┐
│  ████████████████  PAPER BG  ██████████████████  │
│                                                  │
│  ● Section Label (violet, mono, 11px)            │
│                                                  │
│  Content Heading (Fraunces, 48px, ink-900)       │
│                                                  │
│  • Point one (Inter, 16px, ink-600)               │
│  • Point two                                      │
│  • Point three                                    │
│                                                  │
│  [BAZ mark, bottom-right, 5% opacity]            │
└──────────────────────────────────────────────────┘
```

---

## 7. 3D & Illustration Style

When custom illustrations are required:
- **Flat geometric** — No skeuomorphism, no gradients
- **Paper-toned palette** — Use ink/paper/violet only
- **Stroke-based** — Consistent 2px strokes, round caps
- **Isometric** — When dimension is needed, use isometric perspective
- **No clip art** — Ever