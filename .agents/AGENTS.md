# BAZ Project Context

## Design System
This project uses the **Æther Design System** (Fibonacci × Da Vinci × Material 3).
- Primary accent: Violet `hsl(270, 85%, 72%)` at golden angle 137.5°
- Surfaces: 8 luminance layers at hue 260°
- Typography: Fraunces (display), Inter (body), JetBrains Mono (code)
- Radius: Fibonacci sequence (3, 5, 8, 13, 21, 34, 55, 89)
- Source of truth: `app/globals.css` and `tailwind.config.ts`

## Backend
- Database: better-sqlite3 (local) → Supabase (production)
- AI: Gemini (primary), OpenAI, Anthropic, Ollama (fallback chain)
- Auth: JWT + cookies, no sessions
- 9 AI agents including a new `knowledge` agent for book RAG

## Key Files
- `app/globals.css` — Æther design tokens (DO NOT replace with another design system)
- `tailwind.config.ts` — Tailwind token mappings
- `lib/db.ts` — Database chain
- `lib/llm.ts` — Multi-provider LLM adapter
- `lib/agents.ts` — Agent catalog
- `lib/data/` — Book RAG system (embed, ingest, store, query, pipeline)

## What NOT to Do
- Do NOT use Playfair Display font (use Fraunces)
- Do NOT use gold `#C7AE6A` or obsidian `#131313` as brand colors (use violet accent)
- Do NOT use 4px border-radius (use Fibonacci radii)
- Do NOT use shadcn/ui (we have hand-rolled Æther components)
- Do NOT switch to Tailwind v4 `@theme` syntax (we're on v3)
- Do NOT use red `#ff3b2f` as a general color (it's only for the logo mark/favicon)

## Brand Colors
- Accent: `hsl(270, 85%, 72%)` (violet/purple)
- Ink: `--c-ink` (deep purple-black)
- Paper: `--c-paper` (warm off-white)
- Logo mark: `#ff3b2f` (red B — favicon and logo only)