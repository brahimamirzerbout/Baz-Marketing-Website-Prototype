import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

const SAFE_IDENT_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function safeIdent(name: string): string {
  if (!SAFE_IDENT_RE.test(name)) throw new Error(`Invalid identifier: ${name}`);
  return name;
}

type DbRow = Record<string, string | number | null | boolean | unknown>;
type SqlParam = string | number | bigint | null | Buffer;

export function json<T>(data: T, init?: number | ResponseInit) {
  if (typeof init === "number") return NextResponse.json(data, { status: init });
  return NextResponse.json(data, init);
}

export function err(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function readJson<T = Record<string, unknown>>(req: NextRequest): Promise<T | null> {
  try { return (await req.json()) as T; } catch { return null; }
}

export function listRows(table: string, where = "", params: SqlParam[] = [], orderBy = "created_at", dir: "ASC" | "DESC" = "DESC"): DbRow[] {
  safeIdent(table); safeIdent(orderBy);
  const db = getDb();
  const sql = `SELECT * FROM ${table} ${where ? "WHERE " + where : ""} ORDER BY ${safeIdent(orderBy)} ${dir === "ASC" ? "ASC" : "DESC"}`;
  return db.prepare(sql).all(...params) as DbRow[];
}

export function getRow(table: string, id: string): DbRow | null {
  safeIdent(table);
  const db = getDb();
  const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id) as DbRow | undefined;
  return row || null;
}

export function deleteRow(table: string, id: string) {
  safeIdent(table);
  const db = getDb();
  return db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
}

export function insertRow(table: string, data: Record<string, unknown>): DbRow | null {
  safeIdent(table);
  const db = getDb();
  const fields = Object.keys(data);
  fields.forEach(safeIdent);
  const placeholders = fields.map(() => "?").join(",");
  const values: SqlParam[] = fields.map((f) => {
    const v = data[f];
    return typeof v === "object" && v !== null ? JSON.stringify(v) : (v as SqlParam);
  });
  db.prepare(`INSERT INTO ${table} (${fields.join(",")}) VALUES (${placeholders})`).run(...values);
  return getRow(table, data.id as string);
}

export function updateRow(table: string, id: string, data: Record<string, unknown>): DbRow | null {
  safeIdent(table);
  const db = getDb();
  const fields = Object.keys(data);
  fields.forEach(safeIdent);
  const set = fields.map((f) => `${f} = ?`).join(",");
  const values: SqlParam[] = fields.map((f) => {
    const v = data[f];
    return typeof v === "object" && v !== null ? JSON.stringify(v) : (v as SqlParam);
  });
  db.prepare(`UPDATE ${table} SET ${set} WHERE id = ?`).run(...values, id);
  return getRow(table, id);
}
