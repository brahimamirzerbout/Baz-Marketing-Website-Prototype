# BAZ Pitch Deck

10 slides. Print to PDF from your browser.

## Use

1. Open `deck.html` in Chrome, Edge, or Safari.
2. Set viewport to 1280×720 (or just open it; the slides are 1280×720 fixed).
3. `Cmd/Ctrl-P` → "Save as PDF", **set margins to None**, enable **Background graphics**.
4. Send the PDF.

## Edit

The deck is one HTML file with inline CSS. Open in any editor.

- **Client name + date** are on slide 01 — search for `[Client name]` and `[Date]`.
- **Case study numbers** on slide 05 — search for `1.8 → 4.6`, `0 → 480K`, `+318%`.
- **Team placeholders** on slide 08 — search for `[Partner 01]` through `[Partner 04]`.
- **Testimonial** on slide 09 — replace with a real one from `content/_NEW_TESTIMONIALS.ts` when you have a signed quote.

## Slides

| # | Title | Tone | Purpose |
|---|---|---|---|
| 01 | Cover | Paper | Title slide with hero promise |
| 02 | The problem | Paper | Three pain signals a founder feels |
| 03 | What you get | Dark | $200K+ / 4× / 60s / 100% stats |
| 04 | The loop | Paper | 5-step process with timeline |
| 05 | Proof | Paper | 3 case study wins |
| 06 | The system | Dark | BAZ Marketing Hub overview |
| 07 | Services | Paper | 6 pillars × 18 services |
| 08 | Team | Paper | 4 partner slots — fill when ready |
| 09 | Testimonial | Accent | Pull quote, red background |
| 10 | CTA | Dark | Book a growth call |

## Style notes

- Display font: Fraunces (already self-hosted in `public/fonts/fraunces/`)
- Body font: Inter (already self-hosted in `public/fonts/inter/`)
- Mono font: JetBrains Mono (already self-hosted in `public/fonts/jetbrains-mono/`)
- Colors: `#8a8a8a` accent, `#0e0e10` ink, `#f5f1ea` paper

If you open the HTML on a machine without these fonts, it'll fall back to Georgia / system-ui / ui-monospace. The deck still looks good — but for the printed PDF, use a machine that has the fonts.
