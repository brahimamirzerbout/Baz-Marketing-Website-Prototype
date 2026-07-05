import { NextRequest } from "next/server";
import { readJson, listRows, getRow } from "./api-helpers";
import { ok, badRequest, notFound } from "@/lib/api-error";
import { getDb } from "@/lib/db";

type RouteContext = { params?: Record<string, string | undefined> };

type Opts = {
  table: string;
  required: string[];
  jsonFields?: string[];
  skipFields?: string[];
};

export function makeCrud(opts: Opts) {
  const { table, required, jsonFields = [], skipFields = [] } = opts;
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) throw new Error(`Invalid table: ${table}`);
  const allSkip = new Set([...skipFields, "id", "created_at", "updated_at"]);

  async function GET(_req: NextRequest, _ctx?: RouteContext) {
    const id = _ctx?.params?.id;
    if (id) {
      const row = getRow(table, id);
      if (!row) return notFound();
      return ok(row);
    }
    return ok(listRows(table));
  }

  async function POST(req: NextRequest) {
    const body = await readJson<Record<string, unknown>>(req);
    if (!body) return badRequest("Body required");
    for (const k of required) {
      if (!body[k]) return badRequest(`${k} required`);
    }
    const db = getDb();
    const id = `${table.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const t = Date.now();
    const data: Record<string, unknown> = { id, created_at: t, updated_at: t };
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
    return ok(getRow(table, id), 201);
  }

  async function PATCH(req: NextRequest, ctx: RouteContext) {
    const id = ctx.params?.id;
    if (!id) return badRequest("id required");
    const body = await readJson<Record<string, unknown>>(req);
    if (!body) return badRequest("Body required");
    const db = getDb();
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
    return ok(getRow(table, id));
  }

  async function DELETE(_req: NextRequest, ctx: RouteContext) {
    const id = ctx.params?.id;
    if (!id) return badRequest("id required");
    const db = getDb();
    db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
    return ok({ deleted: true });
  }

  return { GET, POST, PATCH, DELETE };
}
