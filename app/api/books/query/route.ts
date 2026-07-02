// @ts-nocheck
/**
 * POST /api/books/query — RAG query against the book knowledge base
 *
 * Body: {
 *   question: string,
 *   topK?: number (default 5),
 *   minScore?: number (default 0.3),
 *   bookFilter?: string[],
 *   tagFilter?: string[],
 *   agentMode?: boolean,
 *   maxTokens?: number,
 *   temperature?: number,
 * }
 *
 * Returns: {
 *   ok: boolean,
 *   answer: string,
 *   sources: BookSearchResult[],
 *   model: string,
 *   provider: string,
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { queryBooks, type RAGQueryOptions } from "@/lib/data/book-query";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const guard = rateLimit(req, { key: "books-query", limit: 30, windowMs: 60_000 });
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: rateLimitHeaders(guard) },
    );
  }

  let body: Partial<RAGQueryOptions> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!body.question || typeof body.question !== "string") {
    return NextResponse.json(
      { ok: false, error: "question is required" },
      { status: 400 },
    );
  }

  if (body.question.length > 4000) {
    return NextResponse.json(
      { ok: false, error: "question too long (max 4000 characters)" },
      { status: 400 },
    );
  }

  try {
    const result = await queryBooks({
      question: body.question,
      topK: body.topK ?? 5,
      minScore: body.minScore ?? 0.3,
      bookFilter: body.bookFilter,
      tagFilter: body.tagFilter,
      agentMode: body.agentMode ?? false,
      maxTokens: body.maxTokens ?? 1500,
      temperature: body.temperature ?? 0.4,
    });

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (err) {
    console.error("[books:query]", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}

/** GET /api/books/query — Get knowledge base summary */
export async function GET() {
  try {
    const { getBookKnowledgeSummary } = await import("@/lib/data/book-query");
    const summary = await getBookKnowledgeSummary();
    return NextResponse.json({ ok: true, ...summary });
  } catch (err) {
    console.error("[books:query:summary]", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}