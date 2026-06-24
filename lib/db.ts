/**
 * BAZ — Single source of truth database.
 *
 * Lives at /home/uzer/baz/data/baz.db. Auto-creates the schema on first boot.
 * WAL mode for concurrent reads + safe writes.
 *
 * Tables (10):
 *   - users            auth + role + team membership
 *   - orgs             agencies / partner orgs that operate BAZ
 *   - leads            inbound prospects from /contact + /brief forms
 *   - customers        signed clients
 *   - subscriptions    recurring engagements (linked to customers + tiers)
 *   - invoices         issued invoices
 *   - projects         active engagements (linked to customers)
 *   - feedback         client testimonial submissions
 *   - feedback_requests scheduled feedback collection (with public tokens)
 *   - ai_jobs          AI usage tracking (cost + tokens)
 *   - sessions         auth tokens
 *   - audit            append-only mutation log
 */

import Database from 'better-sqlite3';
import path from 'node:path';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'baz.db');

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  const fs = require('node:fs') as typeof import('node:fs');
  fs.mkdirSync(DATA_DIR, { recursive: true });
  _db = new Database(DB_FILE);
  _db.pragma('journal_mode = WAL');
  _db.pragma('foreign_keys = ON');
  bootstrap(_db);
  return _db;
}

function bootstrap(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id          TEXT PRIMARY KEY,
      email       TEXT UNIQUE NOT NULL,
      name        TEXT NOT NULL,
      password_hash TEXT,
      role        TEXT NOT NULL DEFAULT 'member',  -- owner | admin | member | client
      team        TEXT,                              -- operations | strategy | design | engineering | finance | growth
      initials    TEXT NOT NULL,
      color       TEXT NOT NULL DEFAULT '#ff3b2f',
      created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
    );

    CREATE TABLE IF NOT EXISTS orgs (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      kind        TEXT NOT NULL DEFAULT 'agency',    -- agency | client | partner
      plan        TEXT NOT NULL DEFAULT 'starter',   -- starter | growth | enterprise | project
      notes       TEXT,
      created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
    );

    CREATE TABLE IF NOT EXISTS leads (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      company     TEXT,
      website     TEXT,
      phone       TEXT,
      budget      TEXT,
      message     TEXT,
      source      TEXT NOT NULL DEFAULT 'marketing_site',
      status      TEXT NOT NULL DEFAULT 'new',         -- new | contacted | qualified | proposal | won | lost
      score       INTEGER DEFAULT 0,
      owner       TEXT,                                 -- user id
      created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
      updated_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
    );
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
  `);

  // Idempotent column adds for older DBs. SQLite's ALTER TABLE ADD COLUMN
  // throws if the column already exists, so we gate each on a pragma check.
  // Indexes for newly-added columns go here too.
  addColumnIfMissing(db, 'leads', 'service', 'TEXT NOT NULL DEFAULT ""');
  addColumnIfMissing(db, 'leads', 'intent',   'TEXT NOT NULL DEFAULT ""');
  db.exec(`CREATE INDEX IF NOT EXISTS idx_leads_service ON leads(service);`);

  db.exec(`

    CREATE TABLE IF NOT EXISTS customers (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      contact_name TEXT,
      email       TEXT NOT NULL,
      phone       TEXT,
      tier        TEXT NOT NULL DEFAULT 'growth',     -- core | growth | project
      mrr         INTEGER DEFAULT 0,                   -- monthly recurring revenue
      status      TEXT NOT NULL DEFAULT 'active',     -- active | paused | churned
      notes       TEXT,
      owner       TEXT,
      created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
    );

    CREATE TABLE IF NOT EXISTS subscriptions (
      id          TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      tier        TEXT NOT NULL,
      status      TEXT NOT NULL DEFAULT 'active',
      mrr         INTEGER NOT NULL DEFAULT 0,
      start_date  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
      end_date    INTEGER,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id          TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      amount      INTEGER NOT NULL,                    -- cents
      status      TEXT NOT NULL DEFAULT 'draft',      -- draft | sent | paid | overdue | void
      issued_at   INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
      paid_at     INTEGER,
      description TEXT,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS projects (
      id          TEXT PRIMARY KEY,
      customer_id TEXT,
      name        TEXT NOT NULL,
      status      TEXT NOT NULL DEFAULT 'active',     -- active | completed | archived
      scope       TEXT,
      deliverables TEXT,
      started_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
      completed_at INTEGER,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS feedback (
      id           TEXT PRIMARY KEY,
      request_id   TEXT,
      customer_id  TEXT,
      ratings_json TEXT NOT NULL,                      -- {strategy, results, communication, partnership}
      overall      INTEGER NOT NULL,
      comment      TEXT,
      name         TEXT,
      role         TEXT,
      company      TEXT,
      public_ok    INTEGER DEFAULT 0,
      created_at   INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS feedback_requests (
      id           TEXT PRIMARY KEY,
      customer_id  TEXT,
      token        TEXT UNIQUE NOT NULL,
      requested_at INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
      submitted_at INTEGER,
      kind         TEXT NOT NULL DEFAULT 'quarterly',  -- project_complete | quarterly | annual
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS ai_jobs (
      id          TEXT PRIMARY KEY,
      user_id     TEXT,
      kind        TEXT NOT NULL,                       -- leadgen | content | analytics | general | summarization
      provider    TEXT,
      model       TEXT,
      input_tokens INTEGER DEFAULT 0,
      output_tokens INTEGER DEFAULT 0,
      cost_usd    REAL DEFAULT 0,
      status      TEXT NOT NULL DEFAULT 'ok',
      created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id          TEXT PRIMARY KEY,
      user_id     TEXT NOT NULL,
      token       TEXT UNIQUE NOT NULL,
      expires_at  INTEGER NOT NULL,
      created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS audit (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      actor       TEXT,
      action      TEXT NOT NULL,
      target      TEXT,
      meta        TEXT,
      created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
    );
  `);

  // First-boot owner account
  const ownerEmail = process.env.OWNER_EMAIL || 'owner@baz.agency';
  const ownerPassword = process.env.OWNER_PASSWORD || 'changeme-on-first-login';
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(ownerEmail) as { id: string } | undefined;
  if (!existing) {
    const id = `u_${crypto.randomBytes(6).toString('hex')}`;
    db.prepare(`INSERT INTO users (id, email, name, password_hash, role, team, initials, color)
                VALUES (?, ?, ?, ?, 'owner', 'strategy', 'BZ', '#ff3b2f')`)
      .run(id, ownerEmail, 'BAZ Operator', bcrypt.hashSync(ownerPassword, 10));
    db.prepare('INSERT INTO audit (actor, action, target, meta) VALUES (?, ?, ?, ?)')
      .run(id, 'bootstrap', 'users', JSON.stringify({ event: 'first-boot owner created' }));
  }

  // Idempotent seed: sample leads + customers + projects (only if table is empty)
  seedIfEmpty(db);
}

/**
 * Idempotent column add. SQLite has no IF NOT EXISTS for ADD COLUMN, so we
 * probe pragma_table_info and only ALTER if the column is absent.
 */
function addColumnIfMissing(db: Database.Database, table: string, column: string, definition: string) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  if (!cols.some((c) => c.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

function seedIfEmpty(db: Database.Database) {
  const leadCount = (db.prepare('SELECT COUNT(*) AS n FROM leads').get() as { n: number }).n;
  if (leadCount === 0) {
    const now = Date.now();
    const samples = [
      { name: 'Jane Park',      email: 'jane@acme.io',      company: 'Acme Co.',       source: 'marketing_site', status: 'new',       score: 85, message: 'Looking to discuss a content engine for our DTC brand. Budget around 8K/mo.' },
      { name: 'Omar Haddad',    email: 'omar@metrica.io',   company: 'Metrica',        source: 'cold_email',    status: 'qualified', score: 72, message: 'Need help with SEO migration. Currently losing 40% organic traffic after a CMS change.' },
      { name: 'Li Wei',         email: 'li@nova-ds.com',    company: 'Nova DataSystems',source: 'referral',     status: 'new',       score: 91, message: 'B2B SaaS — paid media + lifecycle. We have product-market fit, just need distribution.' },
      { name: 'Sara Al-Mansouri', email: 'sara@lumestays.com', company: 'Lumestays',    source: 'walk_in',      status: 'contacted',  score: 64, message: 'Hospitality group, 7 properties. Currently running ads but no clear attribution.' },
      { name: 'Marc Dubois',    email: 'marc@helixlab.io',  company: 'Helix Lab',      source: 'marketing_site', status: 'proposal',  score: 78, message: 'AI tooling startup. Want to win the LLM-citation game before competitors do.' },
    ];
    const stmt = db.prepare(`INSERT INTO leads
      (id, name, email, company, message, source, status, score, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    samples.forEach((s, i) => {
      const id = `l_${crypto.randomBytes(5).toString('hex')}`;
      const ts = now - (samples.length - i) * 86400000 * 3; // spread over days
      stmt.run(id, s.name, s.email, s.company, s.message, s.source, s.status, s.score, ts, ts);
    });
  }

  const customerCount = (db.prepare('SELECT COUNT(*) AS n FROM customers').get() as { n: number }).n;
  if (customerCount === 0) {
    const customers = [
      { id: 'cu_acme',  name: 'Acme Co.',        contact_name: 'Jane Park',  email: 'jane@acme.io',    tier: 'growth',  mrr: 2200000, status: 'active' },
      { id: 'cu_nova',  name: 'Nova DataSystems', contact_name: 'Li Wei',     email: 'li@nova-ds.com',  tier: 'core',    mrr: 850000,  status: 'active' },
      { id: 'cu_lume',  name: 'Lumestays',       contact_name: 'Sara Mansouri',email: 'sara@lumestays.com',tier:'project', mrr: 0,      status: 'active' },
    ];
    const stmt = db.prepare(`INSERT INTO customers
      (id, name, contact_name, email, tier, mrr, status) VALUES (?, ?, ?, ?, ?, ?, ?)`);
    customers.forEach((c) => stmt.run(c.id, c.name, c.contact_name, c.email, c.tier, c.mrr, c.status));
  }

  const projectCount = (db.prepare('SELECT COUNT(*) AS n FROM projects').get() as { n: number }).n;
  if (projectCount === 0) {
    const projects = [
      { id: 'p_acme_rebrand',  customer_id: 'cu_acme', name: 'Acme rebrand & site rebuild', scope: 'Brand identity + Next.js site', deliverables: 'Logo, brand book, site in 6 weeks' },
      { id: 'p_nova_seo',      customer_id: 'cu_nova', name: 'Nova SEO content engine',     scope: 'Editorial SEO engine, 12 posts/mo', deliverables: 'Topical map, briefs, monthly content' },
      { id: 'p_lume_ads',      customer_id: 'cu_lume', name: 'Lumestays paid attribution', scope: 'Multi-property ad tracking + dashboards', deliverables: 'Server-side tracking + Looker dashboards' },
    ];
    const stmt = db.prepare(`INSERT INTO projects (id, customer_id, name, scope, deliverables) VALUES (?, ?, ?, ?, ?)`);
    projects.forEach((p) => stmt.run(p.id, p.customer_id, p.name, p.scope, p.deliverables));
  }
}

export function id(prefix: string): string {
  return `${prefix}_${crypto.randomBytes(6).toString('hex')}`;
}

export function audit(actor: string | null, action: string, target?: string, meta?: unknown) {
  try {
    getDb().prepare('INSERT INTO audit (actor, action, target, meta) VALUES (?, ?, ?, ?)')
      .run(actor, action, target ?? null, meta ? JSON.stringify(meta) : null);
  } catch {
    // audit must never throw
  }
}

export function token(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function hashPassword(plain: string): string {
  return bcrypt.hashSync(plain, 10);
}

export function verifyPassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash);
}