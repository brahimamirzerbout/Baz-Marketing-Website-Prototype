# BAZ Project Context

## Design System
This project uses the **BlackSwan Design System** (Fibonacci × Da Vinci × Material 3) with a **Gold Monochrome** seed.

### Three-Layer Architecture
1. **BlackSwan Seed System** — `--seed-hue: 41` generates the entire monochrome gold palette algorithmically
2. **Stitch Material 3 Tokens** — Brand-specific dark palette with `#C8A55A` gold and `#1F2933` charcoal
3. **Protocol Layer** — Fraunces/Inter/JetBrains Mono fonts + Fibonacci radii

### Core Tokens
- **Seed**: `--seed-hue: 41` (gold), `--seed-sat: 72%`, `--seed-lum: 50%`
- **Stitch Gold**: `#C8A55A` — primary accent, CTAs, eyebrows, stats
- **Stitch Gold-dark**: `#8D6B2E` — gradient start, shadows
- **Stitch Charcoal**: `#1F2933` — base background
- **Stitch Navy**: `#24364A` — secondary background
- **Stitch Sand**: `#E8E4E0` — primary text on dark
- **Stitch Stone**: `#B0AAA5` — muted text
- **Protocol Paper**: `#f5f1ea` — warm off-white for light sections
- **Protocol Ink**: `#0e0e0e` — deep black for headings

### Fonts
- **Display**: Fraunces (variable, optical) — NOT Playfair Display, NOT Outfit
- **Body**: Inter (variable) — NOT Poppins
- **Code**: JetBrains Mono

### Radius
- **Fibonacci**: 3, 5, 8, 13, 21, 34, 55, 89 — NOT 4px flat
- Exception: Stitch assets use 4px corners (their design system)

### Backend
- Database: better-sqlite3 (local) → Supabase (production)
- AI: Gemini (primary), knowledge agent for book RAG
- Auth: JWT + cookies, no sessions

## Key Files
- `brand/css/variables-unified.css` — UNIFIED source of truth (BlackSwan + Stitch + Protocol)
- `brand/css/variables.css` — BlackSwan monochrome gold tokens
- `app/globals.css` — Current live site (Anderson/Stitch system)
- `tailwind.config.ts` — Tailwind token mappings
- `brand-blackswan/tokens/blackswan.css` — BlackSwan seed system source
- `brand/brand/` — Full brand design system documentation
- `baz/assets/brand/` — All Stitch-generated brand assets

## What NOT to Do
- Do NOT use Playfair Display font (use Fraunces)
- Do NOT use Poppins as the primary body font (use Inter)
- Do NOT use 4px border-radius for new components (use Fibonacci radii)
- Do NOT use shadcn/ui (we have hand-rolled BlackSwan components)
- Do NOT switch to Tailwind v4 `@theme` syntax (we're on v3)
- Do NOT use `#F2572B` orange-red as the primary brand color (gold `#C8A55A` is the accent)
- Do NOT use `#8a8a8a` red as a general color (it's only for the logo mark/favicon)
- Do NOT use violet `hsl(270, 85%, 72%)` as the primary accent (gold monochrome is active)
- Do NOT replace `app/globals.css` with another design system without merging BlackSwan tokens

## Brand Colors (Active — Gold Monochrome)
- **BlackSwan Accent**: `hsl(41, 72%, 52%)` — computed gold from seed
- **Stitch Gold**: `#C8A55A` — primary brand accent
- **Stitch Charcoal**: `#1F2933` — base background
- **Stitch Navy**: `#24364A` — secondary background
- **Protocol Paper**: `#f5f1ea` — warm off-white
- **Protocol Ink**: `#0e0e0e` — deep black