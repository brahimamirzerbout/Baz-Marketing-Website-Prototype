# BAZ OG Image Guide

Open Graph images for social media sharing previews.

---

## Master OG Image (1200×630)

- **Background:** `#0e0e0e` (ink)
- **Overlay:** Mesh gradient (violet radial from top-left at 0.08 opacity)
- **Grid:** 40px lines at 0.04 opacity
- **Content:**
  - Eyebrow: `● BRAND & BUZZ` in JetBrains Mono 11px, violet, tracking 2.5px
  - Headline: "BAZ" in Fraunces 300, 96px, paper
  - Subtitle: "Marketing Ventures Agency" in Inter 400, 20px, ink-500
  - Violet accent line: 200px wide, 2px tall
  - Mark: Bottom-right, 60px squircle
  - URL: Bottom-right, JetBrains Mono 11px, ink-600

---

## Dynamic OG Images

For dynamic page-specific OG images, use the same template but replace:
- The eyebrow text with the page section
- The headline with the page title
- The subtitle with the page description

### Implementation (Next.js)
```tsx
// app/opengraph-image.tsx
import { ImageResponse } from '@vercel/og'

export default async function OgImage({ params }) {
  return new ImageResponse(
    (
      <div style={{
        width: 1200,
        height: 630,
        background: '#0e0e0e',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
      }}>
        <p style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 13,
          color: '#8b5cf6',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
        }}>
          ● {params.section}
        </p>
        <h1 style={{
          fontFamily: 'Fraunces',
          fontSize: 96,
          fontWeight: 300,
          color: '#f5f1ea',
          letterSpacing: '-4px',
          margin: '24px 0 0',
        }}>
          {params.title}
        </h1>
        <p style={{
          fontFamily: 'Inter',
          fontSize: 20,
          color: '#737373',
          margin: '16px 0 0',
        }}>
          {params.description}
        </p>
        <div style={{
          width: 200,
          height: 2,
          background: '#8b5cf6',
          marginTop: 40,
          borderRadius: 1,
        }}/>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

---

## HTML Meta Tags

```html
<meta property="og:title" content="BAZ — Powering Your Path To Growth">
<meta property="og:description" content="Marketing Ventures Agency. Brand & Buzz.">
<meta property="og:image" content="/og/default.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta property="og:site_name" content="BAZ">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="BAZ — Powering Your Path To Growth">
<meta name="twitter:description" content="Marketing Ventures Agency. Brand & Buzz.">
<meta name="twitter:image" content="/og/default.png">
```