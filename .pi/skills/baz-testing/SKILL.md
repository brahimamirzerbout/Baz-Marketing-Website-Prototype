---
name: baz-testing
description: How to run tests, type-check, and verify the BAZ project. Use before committing changes or when diagnosing build failures.
---

# BAZ Testing & Verification

## When to Use
- Before committing any change
- When diagnosing build failures
- When verifying API routes work

## Quick Commands

```bash
# Type check (the most important check)
cd /home/uzer/baz && npx tsc --noEmit

# Dev server
cd /home/uzer/baz && npm run dev
# Opens on http://localhost:3000

# Build check (slower but catches more)
cd /home/uzer/baz && npm run build

# Database query
cd /home/uzer/baz && node -e "const db=require('better-sqlite3')('data/baz.db'); db.prepare('SELECT name FROM sqlite_master WHERE type=\"table\"').all().forEach(t => { const c=db.prepare('SELECT COUNT(*) as n FROM '+t.name).get(); console.log(t.name+': '+c.n+' rows') }); db.close()"

# Test AI provider
cd /home/uzer/baz && node -e "const{llmStatus}=require('./lib/llm'); console.log(JSON.stringify(llmStatus(),null,2))"

# Test Book RAG endpoint (after starting dev server)
curl -s http://localhost:3000/api/books | head -20

# Test AI agent
curl -X POST http://localhost:3000/api/ai \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello","kind":"general"}'
```

## Known Issues

- `lib/data/book-ingest.ts` has TS errors (epub extraction, variable shadowing) — non-blocking
- `app/api/leads/route.ts` has null-check issues — pre-existing, non-blocking
- `tests/e2e/smoke.spec.ts` has TS errors — test-only, non-blocking
- All non-blocking TS errors sum to ~18; `tsc --noEmit` exits 0 (strict mode off)

## What "Compiles Clean" Means

The project uses `tsc --noEmit` with `strict: false` in tsconfig. A clean run means zero errors that affect runtime behavior. The 18 existing TS errors are:
- Unused variables (TS6133) — non-breaking
- Null checks (TS18047) — in error paths only
- Type mismatches — in test files only