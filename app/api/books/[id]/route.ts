/**
 * GET  /api/books/[id] — Get book detail with chunk preview
 * DELETE /api/books/[id] — Delete a book and all its chunks
 */

import { NextRequest, NextResponse } from "next/server";
import { getBookStore } from "@/lib/data/book-store";
import { readSessionFromCookies } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const store = getBookStore();
  await store.init();

  const book = store.getBook(id);
  if (!book) {
    return NextResponse.json({ ok: false, error: "book_not_found" }, { status: 404 });
  }

  const chunks = store.getBookChunks(id, 10); // Preview first 10 chunks

  return NextResponse.json({
    ok: true,
    book,
    chunkPreview: chunks,
    totalChunks: book.chunkCount,
  });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Auth check — only admin can delete books
  const { user } = await readSessionFromCookies();
  if (!user || (user.role !== "owner" && user.role !== "admin")) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const store = getBookStore();
  await store.init();

  const deleted = store.deleteBook(id);
  if (!deleted) {
    return NextResponse.json({ ok: false, error: "book_not_found" }, { status: 404 });
  }

  // Audit log
  const db = getDb();
  db.prepare("INSERT INTO audit (actor, action, target, meta) VALUES (?, ?, ?, ?)").run(
    user.id,
    "delete_book",
    id,
    JSON.stringify({ deletedBy: user.email }),
  );

  return NextResponse.json({ ok: true, deleted: id });
}