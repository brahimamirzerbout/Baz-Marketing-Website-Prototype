import { NextRequest } from "next/server";
import { ok, badRequest, notFound, readJson } from "./api-error";

type RouteContext = { params?: Record<string, string | undefined> };

type Opts = {
  table: string;
  requiredFields: string[];
  jsonFields?: string[];
  skipFields?: string[];
};

export function makeCrud(opts: Opts) {
  const { table, requiredFields, jsonFields = [], skipFields = [] } = opts;
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) throw new Error(`Invalid table: ${table}`);
  const allSkip = new Set([...skipFields, "id", "created_at", "updated_at"]);

  let _db: any;
  function getDb() {
    if (!_db) _db = require("./db").getDb();
    return _db;
  }

  async function GET(_req: NextRequest, _ctx?: RouteContext) {
    const db = getDb();
    const id = _ctx?.params?.id;
    if (id) {
      const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
      if (!row) return notFound();
      return ok(row);
    }
    const rows = db.prepare(`SELECT * FROM ${table} ORDER BY created_at DESC`).all();
    return ok(rows);
  }

  async function POST(req: NextRequest) {
    const db = getDb();
    const body = await readJson<Record<string, unknown>>(req);
    if (!body) return badRequest("Body required");
    for (const k of requiredFields) {
      if (!body[k]) return badRequest(`${k} required`);
    }
    const id = (require("./db").id || ((p: string) => `${p}_${Date.now()}_${Math.random().toString(36).slice(2)}`))("r");
    const now = Date.now();
    const data: Record<string, unknown> = { id, created_at: now, updated_at: now };
    for (const [k, v] of Object.entries(body)) {
      if (allSkip.has(k)) continue;
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k)) continue;
      data[k] = jsonFields.includes(k) ? JSON.stringify(v) : v;
    }
    const fields = Object.keys(data);
    const placeholders = fields.map(() => "?").join(",");
    db.prepare(`INSERT INTO ${table} (${fields.join(",")}) VALUES (${placeholders})`).run(
      ...fields.map((f) => data[f] as string | number | null),
    );
    const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
    return ok(row, 201);
  }

  async function PATCH(req: NextRequest, ctx: RouteContext) {
    const db = getDb();
    const id = ctx.params?.id;
    if (!id) return badRequest("id required");
    const body = await readJson<Record<string, unknown>>(req);
    if (!body) return badRequest("Body required");
    const fields: string[] = [];
    const values: (string | number | null)[] = [];
    for (const [k, v] of Object.entries(body)) {
      if (allSkip.has(k)) continue;
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k)) continue;
      fields.push(`${k} = ?`);
      values.push(jsonFields.includes(k) ? JSON.stringify(v) : (v as string | number | null));
    }
    if (fields.length === 0) return badRequest("No fields to update");
    fields.push("updated_at = ?");
    values.push(Date.now());
    values.push(id);
    db.prepare(`UPDATE ${table} SET ${fields.join(", ")} WHERE id = ?`).run(...values);
    const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
    return ok(row);
  }

  async function DELETE(_req: NextRequest, ctx: RouteContext) {
    const db = getDb();
    const id = ctx.params?.id;
    if (!id) return badRequest("id required");
    db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
    return ok({ deleted: true });
  }

  return { GET, POST, PATCH, DELETE };
}
