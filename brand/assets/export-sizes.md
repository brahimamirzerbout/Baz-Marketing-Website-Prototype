# BAZ Brand Assets — Export Sizes & Specifications

All assets use the BlackSwan Design System (violet `#8b5cf6`, Fraunces/Inter/JetBrains Mono, Fibonacci radii).

---

## Logo Exports

| Context | Width | Height | Format | Background | Notes |
|---------|-------|--------|--------|------------|-------|
| Master vector | ∞ | ∞ | SVG | Transparent | Source of truth |
| Web header (desktop) | 512px | 256px | WEBP | Transparent | Wordmark |
| Web header (mobile) | 256px | 128px | WEBP | Transparent | Wordmark |
| App icon | 1024px | 1024px | PNG | Ink `#0e0e0e` | Mark on squircle |
| Favicon (SVG) | ∞ | ∞ | SVG | Transparent | Simplified mark |
| Favicon (32px) | 32px | 32px | PNG | Transparent | Simplified mark |
| Favicon (16px) | 16px | 16px | PNG | Transparent | Simplified mark |
| Apple Touch Icon | 180px | 180px | PNG | Ink `#0e0e0e` | Mark on squircle |
| Android Chrome | 192px | 192px | PNG | Ink `#0e0e0e` | Mark on squircle |
| PWA Splash | 512px | 512px | PNG | Ink `#0e0e0e` | Mark on squircle |
| Print (letterhead) | 0.75in | auto | PDF | Transparent | CMYK ink-900 |
| Print (business card) | 0.5in | auto | PDF | Transparent | CMYK ink-900 |

---

## Social Media Exports

| Platform | Width | Height | Format | Background | Source SVG |
|----------|-------|--------|--------|------------|-----------|
| LinkedIn Banner | 1584px | 396px | PNG | Ink | `social/linkedin-banner.svg` |
| Facebook Cover | 1640px | 624px | PNG | Paper | `social/facebook-cover.svg` |
| Instagram Post | 1080px | 1080px | PNG | Paper | `social/instagram-post.svg` |
| Instagram Story | 1080px | 1920px | PNG | Ink | `social/instagram-story.svg` |
| X/Twitter Header | 1500px | 500px | PNG | Ink | `social/twitter-header.svg` |
| YouTube Banner | 2560px | 1440px | PNG | Ink | Safe area: 1546×423 |
| YouTube Thumbnail | 1280px | 720px | PNG | Paper | |
| OG Image | 1200px | 630px | PNG | Ink | `og/og-image-1200x630.svg` |

---

## Stationery Exports

| Context | Width | Height | DPI | Format | Source SVG |
|----------|-------|--------|-----|--------|-----------|
| Business Card Front | 1050px | 600px | 300 | PNG/PDF | `stationery/business-card-front.svg` |
| Business Card Back | 1050px | 600px | 300 | PNG/PDF | `stationery/business-card-back.svg` |
| Letterhead | 2550px | 3300px | 300 | PNG/PDF | `stationery/letterhead.svg` |
| Email Signature | 1200px | 300px | 96 | PNG | `stationery/email-signature.svg` |
| Presentation 16:9 | 1920px | 1080px | 96 | PNG/PPTX | `presentation/` |

---

## App & Favicon Exports

| Context | Size | Format | Background | Source SVG |
|---------|------|--------|------------|-----------|
| App Icon (master) | 1024×1024 | PNG | Ink squircle | `app/app-icon-1024.svg` |
| Apple Touch Icon | 180×180 | PNG | Ink squircle | `app/apple-touch-icon.svg` |
| Android Chrome | 192×192 | PNG | Ink squircle | |
| Android Chrome (large) | 512×512 | PNG | Ink squircle | |
| Favicon SVG | ∞ | SVG | Transparent | `logo/baz-favicon.svg` |
| Favicon 32 | 32×32 | PNG | Transparent | |
| Favicon 16 | 16×16 | PNG | Transparent | |

---

## Pattern Assets

| Pattern | Use | Source |
|---------|-----|--------|
| Grid pattern | Background overlay on paper sections, opacity 0.03–0.06 | `patterns/grid-pattern.svg` |
| Mesh gradient | Radial violet glow on ink sections, opacity 0.08–0.15 | `patterns/mesh-gradient.svg` |
| Paper grain | Noise texture overlay, opacity 0.03, mix-blend-mode: overlay | `patterns/paper-grain.svg` |
| Dot pattern | Subtle dot grid for paper sections, opacity 0.04–0.08 | `patterns/dot-pattern.svg` |
| Violet gradient | CTA backgrounds, accent fills | `patterns/violet-gradient.svg` |
| Violet shimmer | Decorative borders, animated accents | `patterns/violet-shimmer.svg` |

---

## Naming Convention

```
baz-[asset]-[variant]-[size].[format]

Examples:
baz-wordmark-primary-512x256.webp
baz-mark-icon-1024x1024.png
baz-favicon-32x32.png
baz-wordmark-reverse-1584x396.png
baz-card-front-1050x600.png
baz-og-image-1200x630.png
baz-app-icon-512x512.png
baz-apple-touch-icon-180x180.png
```

---

## Rasterization Notes

For PNG exports from SVGs:
- Use 2x resolution for web (e.g., 180px → export at 360px)
- Use 300 DPI for print
- Always export with transparent backgrounds (except app icons and social banners)
- Test at 1x, 2x, and 3x for mobile
- Run all PNGs through image optimization (pngquant, TinyPNG)