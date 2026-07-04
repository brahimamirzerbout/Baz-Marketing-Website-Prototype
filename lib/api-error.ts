import { NextResponse } from "next/server";

export function ok<T>(data: T, init?: number | ResponseInit) {
  if (typeof init === "number") return NextResponse.json({ ok: true, data }, { status: init });
  return NextResponse.json({ ok: true, data }, init);
}

export function badRequest(message = "Bad request") {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export function notFound(message = "Not found") {
  return NextResponse.json({ ok: false, error: message }, { status: 404 });
}

export function rateLimited(message = "Too many requests") {
  return NextResponse.json({ ok: false, error: message }, { status: 429 });
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ ok: false, error: message }, { status: 401 });
}

export function serverError(message = "Internal server error") {
  return NextResponse.json({ ok: false, error: message }, { status: 500 });
}

export function readJson<T = Record<string, unknown>>(req: Request): Promise<T | null> {
  return req.json().catch(() => null) as Promise<T | null>;
}
