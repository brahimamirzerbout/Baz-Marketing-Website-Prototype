// @ts-nocheck

import type { BookMeta, Chunk } from './book-ingest';

export interface BookRecord {
  id: string;
  title: string;
  author: string;
  tags: string[];
  source: string;
  format: string;
  chunkCount: number;
  totalTokens: number;
  createdAt: number;
}

interface BookStore {
  init(): Promise<void>;
  getBook(id: string): BookRecord | undefined;
  getBookChunks(bookId: string, limit?: number): Chunk[];
  deleteBook(id: string): boolean;
  listBooks(): BookRecord[];
  getStats(): { totalBooks: number; totalChunks: number; totalTokens: number };
  addBook(meta: BookMeta, chunks: Chunk[]): Promise<BookRecord>;
}

const books = new Map<string, BookRecord>();
const chunksByBook = new Map<string, Chunk[]>();

function createInMemoryStore(): BookStore {
  return {
    async init() {},

    getBook(id: string) {
      return books.get(id);
    },

    getBookChunks(bookId: string, limit?: number) {
      const all = chunksByBook.get(bookId) || [];
      return limit ? all.slice(0, limit) : all;
    },

    deleteBook(id: string) {
      const existed = books.has(id);
      books.delete(id);
      chunksByBook.delete(id);
      return existed;
    },

    listBooks() {
      return Array.from(books.values()).sort(
        (a, b) => b.createdAt - a.createdAt,
      );
    },

    getStats() {
      let totalChunks = 0;
      let totalTokens = 0;
      for (const book of books.values()) {
        totalChunks += book.chunkCount;
        totalTokens += book.totalTokens;
      }
      return {
        totalBooks: books.size,
        totalChunks,
        totalTokens,
      };
    },

    async addBook(meta: BookMeta, chunks: Chunk[]) {
      const id = chunks.length > 0
        ? chunks[0].bookId
        : `book_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const totalTokens = chunks.reduce((s, c) => s + c.tokens, 0);

      const record: BookRecord = {
        id,
        title: meta.title,
        author: meta.author,
        tags: meta.tags,
        source: meta.source,
        format: meta.format,
        chunkCount: chunks.length,
        totalTokens,
        createdAt: Date.now(),
      };

      books.set(id, record);
      chunksByBook.set(id, chunks);
      return record;
    },
  };
}

let _instance: BookStore | null = null;

export function getBookStore(): BookStore {
  if (!_instance) {
    _instance = createInMemoryStore();
  }
  return _instance;
}
