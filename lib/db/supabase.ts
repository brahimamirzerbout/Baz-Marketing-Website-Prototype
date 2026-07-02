// @ts-nocheck
/**
 * Supabase / PostgreSQL sync adapter using Worker Threads.
 *
 * Uses a worker thread + Atomics.wait to execute async pg queries
 * synchronously in the main thread. Same pattern as better-sqlite3.
 *
 * Interface matches better-sqlite3:
 *   db.prepare(sql).get(...params)  → row | undefined
 *   db.prepare(sql).all(...params)  → row[]
 *   db.prepare(sql).run(...params)  → { changes, lastInsertRowid }
 *   db.exec(sql)                    → void
 */

import { Worker } from "worker_threads";
import path from "node:path";

const SUPABASE_DB_URL = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || "";
const IS_BUILDING = process.env.NEXT_PHASE === "phase-production-build";

let worker: Worker | null = null;
let msgId = 0;

function getWorker(): Worker {
  if (IS_BUILDING) throw new Error("[supabase] skip during build");
  if (!worker && SUPABASE_DB_URL) {
    const workerPath = path.join(process.cwd(), "lib", "db", "pg-worker.js");
    worker = new Worker(workerPath, {
      workerData: { connectionString: SUPABASE_DB_URL },
    });
    worker.on("error", () => { worker = null; });
  }
  if (!worker) throw new Error("No database worker configured");
  return worker;
}

const BUF_SIZE = 16 * 1024 * 1024; // 16MB max result

function querySync(sql: string, params?: unknown[]): { rows: Record<string, unknown>[]; rowCount: number } {
  if (IS_BUILDING) return { rows: [], rowCount: 0 };

  const id = ++msgId;
  const sharedBuffer = new SharedArrayBuffer(BUF_SIZE);
  const signal = new Int32Array(sharedBuffer, 0, 1);
  signal[0] = 0;

  const w = getWorker();
  w.postMessage({ id, sql, params, sharedBuffer }, [sharedBuffer]);

  const start = Date.now();
  while (signal[0] === 0) {
    const elapsed = Date.now() - start;
    if (elapsed > 30000) throw new Error("Database query timeout (30s)");
    Atomics.wait(signal, 0, 0, 1000);
  }

  const dataView = new Uint8Array(sharedBuffer, 4);
  const jsonStr = Buffer.from(dataView).toString("utf8", 0,
    new Int32Array(sharedBuffer, 0, 2)[1]
  );

  if (signal[0] === 2) {
    throw new Error(jsonStr);
  }

  return JSON.parse(jsonStr);
}

// Convert SQLite ? placeholders to PostgreSQL $1, $2, etc.
function toPgPlaceholders(sql: string): string {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
}

interface PrepResult {
  changes: number;
  lastInsertRowid: string | number;
}

class PreparedStatement {
  constructor(private sql: string) {}

  get(...params: unknown[]): any {
    const res = querySync(toPgPlaceholders(this.sql), params);
    return res.rows[0];
  }

  all(...params: unknown[]): any[] {
    const res = querySync(toPgPlaceholders(this.sql), params);
    return res.rows;
  }

  run(...params: unknown[]): PrepResult {
    const res = querySync(toPgPlaceholders(this.sql), params);
    return {
      changes: res.rowCount,
      lastInsertRowid: res.rows[0]?.id ?? 0,
    };
  }
}

class SupabaseDB {
  prepare(sql: string): PreparedStatement {
    return new PreparedStatement(sql);
  }

  exec(sql: string): void {
    if (IS_BUILDING) return;
    const statements = sql
      .split(/;(?=(?:[^']*'[^']*')*[^']*$)/)
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0);

    for (const stmt of statements) {
      try {
        querySync(stmt);
      } catch (e: unknown) {
        const msg = (e as Error).message || "";
        if (!msg.includes("already exists") && !msg.includes("duplicate")) {
          console.error("[supabase] exec error:", msg.slice(0, 200));
        }
      }
    }
  }

  pragma(): void {}
  close(): void { worker?.terminate().catch(() => {}); }
}

export function isSupabaseEnabled(): boolean {
  return !!SUPABASE_DB_URL && !IS_BUILDING;
}

export function createSupabaseDB(): SupabaseDB {
  return new SupabaseDB();
}

export { SupabaseDB };