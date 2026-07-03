# BAZ App Icon Guide

App icons for iOS, Android, PWA splash screens, and favicons.

---

## Master Icon (1024×1024)

The master app icon features:
- **Background:** `#0e0e0e` (ink) squircle with `rx="224"`
- **Glow:** Subtle radial violet gradient at 0.15 opacity from center-top
- **Letterform:** Large "B" in Fraunces 600, `#8b5cf6` (violet-500), centered

### Export Sizes from Master

| Size | Platform | Notes |
|------|----------|-------|
| 1024×1024 | App Store / PWA | Master |
| 512×512 | Android Chrome, PWA splash | |
| 192×192 | Android Chrome | |
| 180×180 | Apple Touch Icon | |
| 152×152 | Microsoft Tile | |
| 144×144 | Windows | |
| 120×120 | iPhone | |
| 114×114 | iPad | |
| 96×96 | Small app icon | |
| 72×72 | iPad (legacy) | |
| 57×57 | iPhone (legacy) | |
| 48×48 | Android | |
| 36×36 | Android (legacy) | |
| 32×32 | Favicon | |
| 16×16 | Favicon | |

---

## Squircle Radii by Size

The app icon uses a super-elliptical squircle. For SVG export, approximate with `rx`:

| Canvas | rx | Notes |
|---------|------|-------|
| 1024 | 224 | ~22% of width |
| 512 | 112 | |
| 192 | 42 | |
| 180 | 40 | |
| 152 | 34 | |
| 120 | 26 | |
| 64 | 14 | Favicon |
| 32 | 7 | Favicon |
| 16 | 4 | Favicon |

---

## web.app Manifest

```json
{
  "name": "BAZ Marketing Ventures Agency",
  "short_name": "BAZ",
  "description": "Powering Your Path To Growth",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0e0e0e",
  "theme_color": "#8b5cf6",
  "icons": [
    { "src": "/icons/icon-1024.png", "sizes": "1024x1024", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-180.png", "sizes": "180x180", "type": "image/png" },
    { "src": "/icons/icon-152.png", "sizes": "152x152", "type": "image/png" },
    { "src": "/icons/icon-120.png", "sizes": "120x120", "type": "image/png" },
    { "src": "/icons/icon-96.png", "sizes": "96x96", "type": "type": "image/png" },
    { "src": "/icons/icon-72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "/icons/icon-48.png", "sizes": "48x48", "type": "image/png" },
    { "src": "/icons/icon-36.png", "sizes": "36x36", "type": "image/png" }
  ]
}
```

---

## HTML Head Tags

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#8b5cf6">
<meta name="msapplication-TileColor" content="#0e0e0e">
```