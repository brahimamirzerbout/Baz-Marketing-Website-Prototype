---
name: baz-backend
description: Reference for BAZ backend architecture. Covers SQLite database schema, Supabase production path, LLM providers (Gemini/OpenAI/Anthropic/Ollama), Book RAG system, and API routes. Use when modifying lib/db, lib/llm, lib/data, or app/api files.
---

# BAZ Backend Architecture

## When to Use
- Any edit to `lib/db.ts`, `lib/db/`, `lib/llm.ts`, `lib/agents.ts`
- Any edit to `lib/data/` (embed, book-ingest, book-store, book-query, pipeline)
- Any edit to `app/api/` routes
- Any database schema change
- Any AI/LLM integration change

## Database

Local: `data/baz.db` (better-sqlite3, WAL mode)
Production path: Supabase PostgreSQL at `uyqgmdrzyapbbvmaumvk.supabase.co`

**Tables** (as of July 2026):
| Table | Rows | Purpose |
|-------|------|---------|
| users | 132 | Auth users |
| leads | 166 | Inbound leads |
| customers | 3 | Paying customers |
| projects | 3 | Client projects |
| sessions | 98 | User sessions |
| audit | 572 | Audit log |
| ai_jobs | 0 | AI call tracking |
| books | 0 | Book library (RAG) |
| book_chunks | 0 | Text chunks with embeddings |
| metrics | 0 | Analytics metrics |

**Chain**: SQLite → Supabase → in-memory fallback (see `lib/db.ts`)

## LLM Providers

Priority order: `GEMINI_API_KEY` → `OPENAI_API_KEY` → `ANTHROPIC_API_KEY` → `OLLAMA_HOST` → stub

Currently active: **Gemini** (free tier, 1500 req/min)
Key: Set in `.env.local` as `GEMINI_API_KEY` with `AI_PROVIDER=gemini`

Agent catalog in `lib/agents.ts`:
- `leadgen` — Score + draft outreach
- `content` — Editorial briefs + outlines
- `analytics` — Attribution + KPI synthesis
- `general` — Free-form assistant
- `summarization` — Long text → executive summary
- `pricing` — Engagement pricing
- `proposal` — Draft client proposals
- `reply` — Draft replies to leads
- `knowledge` — RAG query against book library

## Book RAG System (`lib/data/`)

- `embed.ts` — Embedding provider (Gemini text-embedding-004 / OpenAI / Ollama)
- `book-ingest.ts` — PDF/EPUB/TXT/MD ingestion → chunks
- `book-store.ts` — SQLite storage (Supabase pgvector upgrade path)
- `book-query.ts` — RAG query engine with citations
- `pipeline.ts` — Data pipeline (GA4, Resend, Stripe, CSV import)

## API Routes

- `POST /api/books` — Upload/ingest a book
- `GET /api/books` — List all books
- `GET /api/books/[id]` — Get book detail + chunk preview
- `DELETE /api/books/[id]` — Delete book (admin)
- `POST /api/books/query` — RAG query against book library
- `POST /api/data/sync` — Trigger data pipeline sync
- `GET /api/data/metrics` — Get aggregated metrics
- `POST /api/data/import` — Import leads from CSV/JSON

## Environment Variables

Set in `.env.local`:
- `GEMINI_API_KEY` ✅ (from nova-with-bank)
- `AI_PROVIDER=gemini` ✅
- `SUPABASE_URL` ✅
- `SUPABASE_PUBLISHABLE_KEY` ✅
- `OPENAI_API_KEY` ❌ (not set)
- `ANTHROPIC_API_KEY` ❌ (not set)
- `RESEND_API_KEY` ⚠️ (empty)
- `STRIPE_SECRET_KEY` ❌ (not set)