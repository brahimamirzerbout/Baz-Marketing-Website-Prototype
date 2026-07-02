---
name: aether-design-system
description: Enforces the Æther design system (Fibonacci × Da Vinci × Material 3) when modifying BAZ frontend code. Uses hue-260° violet accent, Fraunces headings, Fibonacci radii, and golden-ratio spacings. Reference globals.css and aether-theme.css for tokens.
---

# Æther Design System

## When to Use
- Any edit to `app/globals.css`, `app/aether-theme.css`, `app/aether-monochrome.css`, or `tailwind.config.ts`
- Any new component, page, or layout file
- Any modification to existing components in `components/`
- Any color, spacing, radius, or typography choice

## Source of Truth

- `app/globals.css` — All CSS custom properties (8-layer hue-260°, Fibonacci radii, golden-ratio beziers)
- `app/aether-theme.css` — Surface layers, typography scale, component styles
- `app/aether-monochrome.css` — Warm monochrome palette
- `tailwind.config.ts` — Token mappings (c-ink, c-paper, violet accent, Fibonacci durations)

## Key Rules

1. **Colors**: Use CSS var tokens (`--c-ink`, `--c-paper`, `--accent`) or Tailwind classes (`bg-ink`, `text-paper`, `bg-accent`). Never hardcode hex values.
2. **Typography**: Fraunces (display), Inter (body), JetBrains Mono (code). Sizes from Fibonacci sequence: 8, 10, 13, 16, 21, 34, 55, 89, 144.
3. **Radius**: Fibonacci only: 3, 5, 8, 13, 21, 34, 55, 89. No arbitrary values.
4. **Shadows**: Use the glass system (`shadow-fib-3` through `shadow-fib-55`). α=0.55 translucent + 0.92 opaque.
5. **Animation**: Fibonacci ms durations (89, 144, 233, 377, 610, 987). Golden-ratio beziers.
6. **Spacing**: Fibonacci scale (1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144).
7. **Accent**: Primary accent is violet `hsl(270, 85%, 72%)` at golden angle 137.5°. NOT red, NOT gold, NOT blue.
8. **Dark mode**: `data-theme="dark"` on `<html>`. 8 luminance layers at hue 260°.
9. **Fonts**: Local WOFF2 in `public/fonts/fraunces/` and `public/fonts/inter/`. Use `localFont` from `next/font/local`.

## What NOT to Do

- Never use Playfair Display (that's a different design system)
- Never use gold `#C7AE6A` or obsidian `#131313` (those are from a different system)
- Never use 4px border-radius (use Fibonacci radii)
- Never use Tailwind v4 `@theme` syntax (we're on v3)
- Never use shadcn/ui components (we have hand-rolled Æther components)