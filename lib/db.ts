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

import path from "node:path";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";

// ── Database abstraction ──────────────────────────────────
// Production (Vercel):  uses Supabase PostgreSQL via worker thread
//   when SUPABASE_DB_URL or DATABASE_URL is set.
// Local dev:            uses better-sqlite3 (native C++ module, fast).
// Fallback:             in-memory store (when neither is available).

import { isSupabaseEnabled, createSupabaseDB } from "./db/supabase";

type SqliteDb = {
  prepare(sql: string): { run(...args: unknown[]): any; get(...args: unknown[]): any; all(...args: unknown[]): any[] };
  exec(sql: string): void;
  pragma(str: string): unknown;
};

const DATA_DIR = process.env.VERCEL ? "/tmp/data" : path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "baz.db");

let _db: SqliteDb | null = null;
let _isSqlite = false;
let _isSupabase = false;

export function isSqlite(): boolean {
  return _isSqlite;
}

export function isSupabase(): boolean {
  return _isSupabase;
}

export function getDb(): SqliteDb {
  if (_db) return _db;

  // 1. Try Supabase PostgreSQL (production on Vercel)
  if (isSupabaseEnabled()) {
    try {
      console.log("[baz:db] Using Supabase PostgreSQL");
      _db = createSupabaseDB() as unknown as SqliteDb;
      _isSupabase = true;
      bootstrap(_db);
      return _db;
    } catch (e) {
      console.warn("[baz:db] Supabase connection failed, falling back:", (e as Error).message?.slice(0, 100));
    }
  }

  // Try to load better-sqlite3 (local dev, Docker, self-hosted)
  try {
    const Database = require("better-sqlite3") as typeof import("better-sqlite3");
    const fs = require("node:fs") as typeof import("node:fs");
    fs.mkdirSync(DATA_DIR, { recursive: true });
    _db = new Database(DB_FILE) as unknown as SqliteDb;
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    _isSqlite = true;
    bootstrap(_db);
    return _db;
  } catch {
    // Vercel/serverless: better-sqlite3 not available.
    // Use an in-memory JSON store that lasts for the function instance.
    console.warn("[baz:db] better-sqlite3 unavailable — using in-memory fallback.");
    _db = createInMemoryDb();
    _isSqlite = false;
    bootstrap(_db);
    return _db;
  }
}

function bootstrap(db: SqliteDb) {
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
  addColumnIfMissing(db, "leads", "service", 'TEXT NOT NULL DEFAULT ""');
  addColumnIfMissing(db, "leads", "intent", 'TEXT NOT NULL DEFAULT ""');
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
  const ownerEmail = process.env.OWNER_EMAIL || "owner@baz.agency";
  const ownerPassword = process.env.OWNER_PASSWORD || "changeme-on-first-login";
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(ownerEmail) as
    { id: string } | undefined;
  if (!existing) {
    const id = `u_${crypto.randomBytes(6).toString("hex")}`;
    db.prepare(
      `INSERT INTO users (id, email, name, password_hash, role, team, initials, color)
                VALUES (?, ?, ?, ?, 'owner', 'strategy', 'BZ', '#ff3b2f')`,
    ).run(id, ownerEmail, "BAZ Operator", bcrypt.hashSync(ownerPassword, 10));
    db.prepare("INSERT INTO audit (actor, action, target, meta) VALUES (?, ?, ?, ?)").run(
      id,
      "bootstrap",
      "users",
      JSON.stringify({ event: "first-boot owner created" }),
    );
  }

  // Idempotent seed: sample leads + customers + projects (only if table is empty)
  seedIfEmpty(db);
}

/**
 * Idempotent column add. SQLite has no IF NOT EXISTS for ADD COLUMN, so we
 * probe pragma_table_info and only ALTER if the column is absent.
 */
function addColumnIfMissing(
  db: SqliteDb,
  table: string,
  column: string,
  definition: string,
) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  if (!cols.some((c) => c.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

function seedIfEmpty(db: SqliteDb) {
  const leadCount = (db.prepare("SELECT COUNT(*) AS n FROM leads").get() as { n: number }).n;
  if (leadCount === 0) {
    const now = Date.now();
    const samples = [
      {
        name: "Jane Park",
        email: "jane@acme.io",
        company: "Acme Co.",
        source: "marketing_site",
        status: "new",
        score: 85,
        message: "Looking to discuss a content engine for our DTC brand. Budget around 8K/mo.",
      },
      {
        name: "Omar Haddad",
        email: "omar@metrica.io",
        company: "Metrica",
        source: "cold_email",
        status: "qualified",
        score: 72,
        message:
          "Need help with SEO migration. Currently losing 40% organic traffic after a CMS change.",
      },
      {
        name: "Li Wei",
        email: "li@nova-ds.com",
        company: "Nova DataSystems",
        source: "referral",
        status: "new",
        score: 91,
        message:
          "B2B SaaS — paid media + lifecycle. We have product-market fit, just need distribution.",
      },
      {
        name: "Sara Al-Mansouri",
        email: "sara@lumestays.com",
        company: "Lumestays",
        source: "walk_in",
        status: "contacted",
        score: 64,
        message: "Hospitality group, 7 properties. Currently running ads but no clear attribution.",
      },
      {
        name: "Marc Dubois",
        email: "marc@helixlab.io",
        company: "Helix Lab",
        source: "marketing_site",
        status: "proposal",
        score: 78,
        message: "AI tooling startup. Want to win the LLM-citation game before competitors do.",
      },
    ];
    const stmt = db.prepare(`INSERT INTO leads
      (id, name, email, company, message, source, status, score, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    samples.forEach((s, i) => {
      const id = `l_${crypto.randomBytes(5).toString("hex")}`;
      const ts = now - (samples.length - i) * 86400000 * 3; // spread over days
      stmt.run(id, s.name, s.email, s.company, s.message, s.source, s.status, s.score, ts, ts);
    });
  }

  const customerCount = (db.prepare("SELECT COUNT(*) AS n FROM customers").get() as { n: number })
    .n;
  if (customerCount === 0) {
    const customers = [
      {
        id: "cu_acme",
        name: "Acme Co.",
        contact_name: "Jane Park",
        email: "jane@acme.io",
        tier: "growth",
        mrr: 2200000,
        status: "active",
      },
      {
        id: "cu_nova",
        name: "Nova DataSystems",
        contact_name: "Li Wei",
        email: "li@nova-ds.com",
        tier: "core",
        mrr: 850000,
        status: "active",
      },
      {
        id: "cu_lume",
        name: "Lumestays",
        contact_name: "Sara Mansouri",
        email: "sara@lumestays.com",
        tier: "project",
        mrr: 0,
        status: "active",
      },
    ];
    const stmt = db.prepare(`INSERT INTO customers
      (id, name, contact_name, email, tier, mrr, status) VALUES (?, ?, ?, ?, ?, ?, ?)`);
    customers.forEach((c) =>
      stmt.run(c.id, c.name, c.contact_name, c.email, c.tier, c.mrr, c.status),
    );
  }

  const projectCount = (db.prepare("SELECT COUNT(*) AS n FROM projects").get() as { n: number }).n;
  if (projectCount === 0) {
    const projects = [
      {
        id: "p_acme_rebrand",
        customer_id: "cu_acme",
        name: "Acme rebrand & site rebuild",
        scope: "Brand identity + Next.js site",
        deliverables: "Logo, brand book, site in 6 weeks",
      },
      {
        id: "p_nova_seo",
        customer_id: "cu_nova",
        name: "Nova SEO content engine",
        scope: "Editorial SEO engine, 12 posts/mo",
        deliverables: "Topical map, briefs, monthly content",
      },
      {
        id: "p_lume_ads",
        customer_id: "cu_lume",
        name: "Lumestays paid attribution",
        scope: "Multi-property ad tracking + dashboards",
        deliverables: "Server-side tracking + Looker dashboards",
      },
    ];
    const stmt = db.prepare(
      `INSERT INTO projects (id, customer_id, name, scope, deliverables) VALUES (?, ?, ?, ?, ?)`,
    );
    projects.forEach((p) => stmt.run(p.id, p.customer_id, p.name, p.scope, p.deliverables));
  }
}

export function id(prefix: string): string {
  return `${prefix}_${crypto.randomBytes(6).toString("hex")}`;
}

export function audit(actor: string | null, action: string, target?: string, meta?: unknown) {
  try {
    getDb()
      .prepare("INSERT INTO audit (actor, action, target, meta) VALUES (?, ?, ?, ?)")
      .run(actor, action, target ?? null, meta ? JSON.stringify(meta) : null);
  } catch {
    // audit must never throw
  }
}

export function token(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashPassword(plain: string): string {
  return bcrypt.hashSync(plain, 10);
}

export function verifyPassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash);
}

// ── In-memory fallback for serverless (Vercel) ──────────────
// A minimal SQL-ish store that supports the subset of operations
// the BAZ API routes use. Data lives in RAM for the function
// instance lifetime (seconds to minutes on Vercel).

function createInMemoryDb(): SqliteDb {
  const tables: Record<string, Record<string, unknown>[]> = {};
  const pkIndex: Record<string, Record<string, number>> = {}; // table -> pkValue -> rowIndex

  function ensureTable(name: string) {
    if (!tables[name]) {
      tables[name] = [];
      pkIndex[name] = {};
    }
  }

  // Very small SQL parser — handles CREATE TABLE, INSERT, SELECT, UPDATE, DELETE, PRAGMA, COUNT
  function exec(sql: string): void {
    const statements = sql.split(";").map((s) => s.trim()).filter(Boolean);
    for (const stmt of statements) {
      const upper = stmt.toUpperCase();

      // CREATE TABLE IF NOT EXISTS <name> ( ... )
      const createMatch = stmt.match(/^CREATE\s+TABLE\s+IF\s+NOT\s+EXISTS\s+(\w+)/i);
      if (createMatch) {
        ensureTable(createMatch[1]);
        continue;
      }

      // CREATE INDEX ... (no-op in memory)
      if (/^CREATE\s+INDEX/i.test(stmt)) continue;

      // ALTER TABLE <name> ADD COLUMN <col> <type> (no-op — rows are dynamic objects)
      if (/^ALTER\s+TABLE/i.test(stmt)) continue;
    }
  }

  function prepare(sql: string) {
    return {
      run(...args: unknown[]): unknown {
        const { action, table, columns, values, where, pkValue } = parseSql(sql, args);
        ensureTable(table);

        if (action === "INSERT") {
          const row: Record<string, unknown> = {};
          columns.forEach((col, i) => { row[col] = values[i]; });
          // Auto-increment for INTEGER PRIMARY KEY AUTOINCREMENT
          tables[table].push(row);
          if (pkValue != null) pkIndex[table][String(pkValue)] = tables[table].length - 1;
          return { changes: 1, lastInsertRowid: tables[table].length };
        }

        if (action === "UPDATE") {
          let changes = 0;
          for (const row of tables[table]) {
            if (matchesWhere(row, where, args)) {
              columns.forEach((col, i) => { row[col] = values[i]; });
              changes++;
            }
          }
          return { changes };
        }

        if (action === "DELETE") {
          const before = tables[table].length;
          tables[table] = tables[table].filter((row) => !matchesWhere(row, where, args));
          return { changes: before - tables[table].length };
        }

        return { changes: 0 };
      },

      get(...args: unknown[]): unknown {
        const { action, table, where } = parseSql(sql, args);
        ensureTable(table);

        if (action === "SELECT") {
          // SELECT COUNT(*) AS n FROM <table> [WHERE ...]
          const countMatch = sql.match(/SELECT\s+COUNT\(\*\)\s+AS\s+(\w+)/i);
          if (countMatch) {
            const rows = tables[table].filter((row) => matchesWhere(row, where, args));
            return { [countMatch[1]]: rows.length };
          }
          // SELECT * FROM <table> WHERE col = ? [ORDER BY ... LIMIT ?]
          const rows = tables[table].filter((row) => matchesWhere(row, where, args));
          return rows[0] ?? undefined;
        }

        // PRAGMA table_info(<table>)
        const pragmaMatch = sql.match(/PRAGMA\s+table_info\((\w+)\)/i);
        if (pragmaMatch) {
          ensureTable(pragmaMatch[1]);
          const sample = tables[pragmaMatch[1]][0];
          if (!sample) return [];
          return Object.keys(sample).map((name) => ({ name }));
        }

        return undefined;
      },

      all(...args: unknown[]): unknown[] {
        const { action, table, where } = parseSql(sql, args);
        ensureTable(table);

        if (action === "SELECT") {
          let rows = tables[table].filter((row) => matchesWhere(row, where, args));
          // ORDER BY <col> DESC/ASC
          const orderMatch = sql.match(/ORDER\s+BY\s+(\w+)\s+(DESC|ASC)/i);
          if (orderMatch) {
            const col = orderMatch[1];
            const dir = orderMatch[2].toUpperCase();
            rows = [...rows].sort((a, b) => {
              const av = a[col] as number | string;
              const bv = b[col] as number | string;
              if (av < bv) return dir === "DESC" ? 1 : -1;
              if (av > bv) return dir === "DESC" ? -1 : 1;
              return 0;
            });
          }
          // LIMIT ?
          const limitMatch = sql.match(/LIMIT\s+\?/i);
          if (limitMatch) {
            const limitIdx = args.length - 1;
            const limit = Number(args[limitIdx]);
            if (limit > 0) rows = rows.slice(0, limit);
          }
          return rows;
        }

        // SELECT status, COUNT(*) AS n FROM <table> GROUP BY status
        const groupMatch = sql.match(/SELECT\s+(\w+),\s*COUNT\(\*\)\s+AS\s+\w+\s+FROM\s+(\w+)\s+GROUP\s+BY/i);
        if (groupMatch) {
          const col = groupMatch[1];
          ensureTable(groupMatch[2]);
          const groups: Record<string, number> = {};
          for (const row of tables[groupMatch[2]]) {
            const key = String(row[col] ?? "");
            groups[key] = (groups[key] ?? 0) + 1;
          }
          return Object.entries(groups).map(([k, n]) => ({ status: k, n }));
        }

        return [];
      },
    };
  }

  function pragma(str: string): unknown {
    // no-op for in-memory
    return undefined;
  }

  // Tiny SQL parser — extracts action, table, columns, values, where clause
  function parseSql(sql: string, args: unknown[]): {
    action: string;
    table: string;
    columns: string[];
    values: unknown[];
    where: { col: string; op: string; argIdx: number }[] | null;
    pkValue: unknown;
  } {
    const trimmed = sql.trim();
    const upper = trimmed.toUpperCase();

    // INSERT INTO <table> (cols...) VALUES (?, ?, ...)
    const insertMatch = trimmed.match(/^INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
    if (insertMatch) {
      const table = insertMatch[1];
      const columns = insertMatch[2].split(",").map((s) => s.trim());
      const placeholders = insertMatch[3].split(",").map((s) => s.trim());
      const values = placeholders.map((_, i) => args[i]);
      // Find PK for index
      let pkValue: unknown = undefined;
      const pkCol = columns[0]; // convention: first col is PK
      pkValue = values[0];
      return { action: "INSERT", table, columns, values, where: null, pkValue };
    }

    // UPDATE <table> SET col = ?, col2 = ? WHERE col = ?
    const updateMatch = trimmed.match(/^UPDATE\s+(\w+)\s+SET\s+(.+?)\s+WHERE\s+(.+)/i);
    if (updateMatch) {
      const table = updateMatch[1];
      const setPart = updateMatch[2];
      const wherePart = updateMatch[3];
      const setCols = setPart.split(",").map((s) => s.trim().split("=")[0].trim());
      // Count SET placeholders + WHERE placeholders
      const setPlaceholders = (setPart.match(/\?/g) || []).length;
      const setValues = args.slice(0, setPlaceholders);
      const whereArgs = args.slice(setPlaceholders);
      const where = parseWhereClause(wherePart, 0);
      // Shift where arg indices
      const adjustedWhere = where?.map((w) => ({ ...w, argIdx: w.argIdx + setPlaceholders })) ?? null;
      return { action: "UPDATE", table, columns: setCols, values: setValues, where: adjustedWhere, pkValue: undefined };
    }

    // DELETE FROM <table> WHERE col = ?
    const deleteMatch = trimmed.match(/^DELETE\s+FROM\s+(\w+)\s+WHERE\s+(.+)/i);
    if (deleteMatch) {
      const where = parseWhereClause(deleteMatch[2], 0);
      return { action: "DELETE", table: deleteMatch[1], columns: [], values: [], where, pkValue: undefined };
    }

    // SELECT ... FROM <table> [WHERE ...] [ORDER BY ...] [LIMIT ?]
    const selectMatch = trimmed.match(/^SELECT\s+.+?\s+FROM\s+(\w+)/i);
    if (selectMatch) {
      const table = selectMatch[1];
      const whereMatch = trimmed.match(/WHERE\s+(.+?)(?:\s+ORDER\s+BY|\s+LIMIT|\s+GROUP\s+BY|$)/i);
      const where = whereMatch ? parseWhereClause(whereMatch[1].trim(), 0) : null;
      return { action: "SELECT", table, columns: [], values: [], where, pkValue: undefined };
    }

    return { action: "UNKNOWN", table: "", columns: [], values: [], where: null, pkValue: undefined };
  }

  function parseWhereClause(clause: string, offset: number): { col: string; op: string; argIdx: number }[] | null {
    // Parse "col = ?" or "col = ? AND col2 = ?" etc.
    const conditions: { col: string; op: string; argIdx: number }[] = [];
    const parts = clause.split(/\s+(?:AND|OR)\s+/i);
    let argIdx = offset;
    for (const part of parts) {
      const m = part.match(/(\w+)\s*(=|!=|>|<|>=|<=|LIKE)\s*\?/i);
      if (m) {
        conditions.push({ col: m[1], op: m[2], argIdx });
        argIdx++;
      }
    }
    return conditions.length ? conditions : null;
  }

  function matchesWhere(row: Record<string, unknown>, where: { col: string; op: string; argIdx: number }[] | null, args: unknown[]): boolean {
    if (!where || where.length === 0) return true;
    return where.every((w) => {
      const val = row[w.col];
      const arg = args[w.argIdx];
      switch (w.op.toUpperCase()) {
        case "=": return val == arg;
        case "!=": return val != arg;
        case ">": return Number(val) > Number(arg);
        case "<": return Number(val) < Number(arg);
        case ">=": return Number(val) >= Number(arg);
        case "<=": return Number(val) <= Number(arg);
        case "LIKE":
          const pattern = String(arg).replace(/%/g, ".*").replace(/_/g, ".");
          return new RegExp(`^${pattern}$`, "i").test(String(val ?? ""));
        default: return false;
      }
    });
  }

  return { prepare, exec, pragma } as SqliteDb;
}
