// @ts-nocheck
/**
 * POST /api/books — Upload and ingest a book
 * GET  /api/books — List all books in the knowledge base
 */

import { NextRequest, NextResponse } from "next/server";
import { ingestBook, type BookMeta } from "@/lib/data/book-ingest";
import { getBookStore } from "@/lib/data/book-store";
import { getEmbedderConfig } from "@/lib/data/embed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/books — List all books */
export async function GET() {
  try {
    const store = getBookStore();
    await store.init();
    const books = store.listBooks();
    const stats = store.getStats();
    return NextResponse.json({ ok: true, books, stats });
  } catch (err) {
    console.error("[books:list]", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}

/** POST /api/books — Upload and ingest a book */
export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  let buffer: Buffer | undefined;
  let meta: BookMeta;
  let text: string | undefined;
  let url: string | undefined;
  let format: BookMeta["format"];

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
      }
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      const ext = file.name.split(".").pop()?.toLowerCase();
      const formatMap: Record<string, BookMeta["format"]> = { pdf: "pdf", epub: "epub", txt: "txt", md: "md" };
      format = formatMap[ext || ""] || "txt";
      meta = {
        title: (formData.get("title") as string) || file.name.replace(/\.[^/.]+$/, ""),
        author: (formData.get("author") as string) || "Unknown",
        tags: JSON.parse((formData.get("tags") as string) || "[]"),
        source: "upload",
        format,
      };
    } else {
      const body = await req.json();
      if (body.url) { url = body.url; format = "url"; }
      else if (body.text) { text = body.text; format = "txt"; }
      else {
        return NextResponse.json({ ok: false, error: "Provide: file (multipart), url (JSON), or text (JSON)" }, { status: 400 });
      }
      meta = { title: body.title || "Untitled", author: body.author || "Unknown", tags: body.tags || [], source: url ? "url" : "manual", format };
    }

    // Ingest the book (extract text, chunk, embed)
    const config = getEmbedderConfig();
    const result = await ingestBook({ buffer, url, text, meta }, config);

    // Save book + chunks to database
    if (result.chunks && result.chunks.length > 0) {
      try {
        const store = getBookStore();
        const book = await store.addBook(meta, result.chunks);
        return NextResponse.json({
          ok: true,
          bookId: book.id,
          title: book.title,
          totalChunks: book.chunkCount,
          totalTokens: book.totalTokens,
          status: result.status,
          ...(result.errors.length > 0 ? { warning: result.errors.join("; ") } : {}),
        });
      } catch (storeErr) {
        console.error("[books:save]", storeErr);
        return NextResponse.json({
          ok: true,
          bookId: result.bookId,
          totalChunks: result.totalChunks,
          totalTokens: result.totalTokens,
          status: result.status,
          warning: `Book ingested but DB save failed: ${storeErr instanceof Error ? storeErr.message : String(storeErr)}`,
        });
      }
    }

    // No chunks created
    return NextResponse.json({
      ok: result.status === "error",
      bookId: result.bookId,
      totalChunks: result.totalChunks,
      totalTokens: result.totalTokens,
      status: result.status,
      errors: result.errors,
    }, { status: result.errors.length > 0 ? 400 : 200 });
  } catch (err) {
    console.error("[books:upload]", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
