---
name: baz-project-map
description: Quick reference for the BAZ Next.js 14 project structure. Use when navigating the codebase, creating new files, or understanding where things live.
---

# BAZ Project Map

## When to Use
- When creating new files — know where they belong
- When navigating the codebase — find files fast
- When onboarding — understand the architecture

## Directory Structure

```
baz/
├── app/                        # Next.js 14 App Router
│   ├── globals.css              # Æther design tokens (Fibonacci × hue-260°)
│   ├── aether-theme.css         # Surface layers, typography, components
│   ├── aether-monochrome.css   # Warm monochrome palette
│   ├── layout.tsx               # Root layout (Fraunces + Inter + Mono)
│   ├── page.tsx                 # Homepage
│   ├── login/                   # Auth pages
│   ├── console/                 # Admin console
│   ├── insights/                # Blog/insights
│   ├── our-story/               # About page
│   ├── pricing/                 # Pricing page
│   ├── contact/                 # Contact page
│   ├── stance/                  # Philosophy page
│   ├── hub/                     # Resource hub
│   ├── portal/                  # Client portal
│   ├── api/                     # API routes
│   │   ├── ai/                  # AI status endpoint
│   │   ├── agents/              # Agent endpoints
│   │   ├── books/               # Book RAG CRUD
│   │   ├── data/                # Data pipeline (sync, metrics, import)
│   │   ├── leads/               # Lead management
│   │   ├── score/               # Lead scoring
│   │   ├── search/              # Site search
│   │   ├── og/                  # OG image generation
│   │   └── auth/                # Auth routes (register, login, me)
│   └── og/                      # OG image assets
├── components/
│   ├── layout/                  # Header, Footer, Nav
│   ├── ui/                      # Æther UI components (Button, Badge, Card, Section)
│   └── sections/                # Page sections (Hero, Features, etc.)
├── content/                     # Static content (posts, pricing, services, team, testimonials)
├── lib/
│   ├── db.ts                    # Database chain (SQLite → Supabase → in-memory)
│   ├── db/                      # Supabase adapter
│   ├── llm.ts                   # LLM adapter (Gemini, OpenAI, Anthropic, Ollama)
│   ├── agents.ts                # Agent catalog (9 agents)
│   ├── auth.ts                  # Auth (JWT + cookies)
│   ├── scoring.ts              # Lead scoring
│   ├── data/                    # Book RAG system
│   │   ├── embed.ts             # Embedding provider
│   │   ├── book-ingest.ts       # Book ingestion pipeline
│   │   ├── book-store.ts        # Book storage (SQLite + Supabase)
│   │   ├── book-query.ts        # RAG query engine
│   │   └── pipeline.ts          # Data pipeline
│   └── ...                      # site.ts, seo.ts, validate.ts, rate-limit.ts, etc.
├── data/
│   └── baz.db                   # SQLite database (166 leads, 132 users)
├── public/
│   ├── fonts/                   # Local WOFF2 fonts (fraunces, inter, jetbrains-mono)
│   ├── favicon.svg              # Red #ff3b2f B mark
│   └── og/                      # OG image assets
├── assets/brand/
│   ├── logo/                    # Logo assets (RED #ff3b2f system, not Aurelian)
│   └── README.md                # Brand kit index
├── tailwind.config.ts           # Æther tokens (violet, Fibonacci, Fraunces)
├── next.config.mjs               # Next.js config
└── .env.local                    # Environment variables
```

## Key Conventions

- **Components**: Hand-rolled Æther components, NOT shadcn/ui
- **Auth**: JWT in cookies, not sessions
- **DB**: better-sqlite3 with WAL mode, Supabase for production
- **AI**: Multi-provider LLM adapter with fallback chain
- **Content**: Static `.ts` files in `content/`, not CMS
- **Styling**: Tailwind v3 with custom Æther tokens in `tailwind.config.ts`
- **Design**: Æther (Fibonacci × Da Vinci × Material 3). NOT Aurelian.