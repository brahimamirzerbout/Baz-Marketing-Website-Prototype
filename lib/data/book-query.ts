// @ts-nocheck

import { getBookStore } from './book-store';

export interface RAGQueryOptions {
  question: string;
  topK?: number;
  minScore?: number;
  bookFilter?: string[];
  tagFilter?: string[];
  agentMode?: boolean;
  maxTokens?: number;
  temperature?: number;
}

interface SourceResult {
  bookId: string;
  chunkId: string;
  text: string;
  score: number;
  title: string;
}

interface QueryResult {
  answer: string;
  sources: SourceResult[];
  model: string;
  provider: string;
}

function keywordScore(query: string, text: string): number {
  const qWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  if (qWords.length === 0) return 0;
  const lower = text.toLowerCase();
  let matches = 0;
  for (const w of qWords) {
    if (lower.includes(w)) matches++;
  }
  return matches / qWords.length;
}

export async function queryBooks(options: RAGQueryOptions): Promise<QueryResult> {
  const {
    question,
    topK = 5,
    minScore = 0.3,
    bookFilter,
    tagFilter,
  } = options;

  const store = getBookStore();
  await store.init();

  let allChunks: { chunk: any; book: any }[] = [];

  const books = store.listBooks();
  for (const book of books) {
    if (bookFilter && bookFilter.length > 0 && !bookFilter.includes(book.id)) continue;
    if (tagFilter && tagFilter.length > 0 && !tagFilter.some(t => book.tags.includes(t))) continue;

    const chunks = store.getBookChunks(book.id);
    for (const chunk of chunks) {
      allChunks.push({ chunk, book });
    }
  }

  const scored = allChunks
    .map(({ chunk, book }) => ({
      bookId: book.id,
      chunkId: chunk.id,
      text: chunk.text,
      score: keywordScore(question, chunk.text),
      title: book.title,
    }))
    .filter(s => s.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  let answer: string;
  if (scored.length === 0) {
    answer = 'I could not find relevant information in the knowledge base to answer your question.';
  } else {
    const context = scored.map(s => `[${s.title}] ${s.text}`).join('\n\n---\n\n');
    answer = `Based on ${scored.length} relevant source(s) from the knowledge base:\n\n${context}`;
  }

  return {
    answer,
    sources: scored,
    model: 'keyword-match',
    provider: 'built-in',
  };
}

export async function getBookKnowledgeSummary() {
  const store = getBookStore();
  await store.init();
  const books = store.listBooks();
  const stats = store.getStats();

  return {
    totalBooks: stats.totalBooks,
    totalChunks: stats.totalChunks,
    totalTokens: stats.totalTokens,
    books: books.map(b => ({
      id: b.id,
      title: b.title,
      author: b.author,
      tags: b.tags,
      chunkCount: b.chunkCount,
      totalTokens: b.totalTokens,
    })),
    lastUpdated: books.length > 0 ? Math.max(...books.map(b => b.createdAt)) : null,
  };
}
