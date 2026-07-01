-- BAZ Marketing Agency — Initial Schema (SQLite → PostgreSQL)
-- Creates all tables from the SQLite database in PostgreSQL (Supabase)

-- Users & Auth
CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,
  email          TEXT UNIQUE NOT NULL,
  name           TEXT NOT NULL,
  password_hash  TEXT,
  role           TEXT NOT NULL DEFAULT 'member',
  team           TEXT,
  initials       TEXT NOT NULL DEFAULT 'BZ',
  color          TEXT NOT NULL DEFAULT '#ff3b2f',
  created_at     BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- Organizations
CREATE TABLE IF NOT EXISTS orgs (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  kind        TEXT NOT NULL DEFAULT 'agency',
  plan        TEXT NOT NULL DEFAULT 'starter',
  notes       TEXT,
  created_at  BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT DEFAULT '',
  website     TEXT,
  phone       TEXT,
  budget      TEXT,
  message     TEXT,
  source      TEXT NOT NULL DEFAULT 'marketing_site',
  status      TEXT NOT NULL DEFAULT 'new',
  score       INTEGER DEFAULT 0,
  service     TEXT NOT NULL DEFAULT '',
  intent      TEXT NOT NULL DEFAULT '',
  owner       TEXT,
  created_at  BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint,
  updated_at  BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_service ON leads(service);

-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  contact_name TEXT,
  email        TEXT NOT NULL,
  phone        TEXT,
  tier         TEXT NOT NULL DEFAULT 'growth',
  mrr          INTEGER DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'active',
  notes        TEXT,
  owner        TEXT,
  created_at   BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id          TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  tier        TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'active',
  mrr         INTEGER NOT NULL DEFAULT 0,
  start_date  BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint,
  end_date    BIGINT
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id          TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  amount      INTEGER NOT NULL,
  status      TEXT NOT NULL DEFAULT 'draft',
  issued_at   BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint,
  paid_at     BIGINT,
  description TEXT
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id           TEXT PRIMARY KEY,
  customer_id  TEXT REFERENCES customers(id) ON DELETE SET NULL,
  name         TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'active',
  scope        TEXT,
  deliverables TEXT,
  started_at   BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint,
  completed_at BIGINT
);

-- Feedback
CREATE TABLE IF NOT EXISTS feedback (
  id            TEXT PRIMARY KEY,
  request_id   TEXT,
  customer_id   TEXT REFERENCES customers(id) ON DELETE SET NULL,
  ratings_json  TEXT NOT NULL,
  overall       INTEGER NOT NULL,
  comment       TEXT,
  name          TEXT,
  role          TEXT,
  company       TEXT,
  public_ok     INTEGER DEFAULT 0,
  created_at    BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- Feedback Requests
CREATE TABLE IF NOT EXISTS feedback_requests (
  id           TEXT PRIMARY KEY,
  customer_id  TEXT REFERENCES customers(id) ON DELETE SET NULL,
  token        TEXT UNIQUE NOT NULL,
  requested_at BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint,
  submitted_at BIGINT,
  kind         TEXT NOT NULL DEFAULT 'quarterly'
);

-- AI Jobs (usage tracking)
CREATE TABLE IF NOT EXISTS ai_jobs (
  id            TEXT PRIMARY KEY,
  user_id       TEXT,
  kind          TEXT NOT NULL,
  provider      TEXT,
  model         TEXT,
  input_tokens  INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  cost_usd      REAL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'ok',
  created_at    BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- Sessions (auth tokens)
CREATE TABLE IF NOT EXISTS sessions (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token       TEXT UNIQUE NOT NULL,
  expires_at  BIGINT NOT NULL,
  created_at  BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- Audit log
CREATE TABLE IF NOT EXISTS audit (
  id          SERIAL PRIMARY KEY,
  actor       TEXT,
  action      TEXT NOT NULL,
  target      TEXT,
  meta        TEXT,
  created_at  BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- Enable RLS on all tables (Supabase best practice)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS (used by the server adapter)
-- The service_role key automatically bypasses all RLS policies.