// @ts-nocheck

import type { EmbedderConfig } from './embed';

export type BookFormat = 'pdf' | 'epub' | 'txt' | 'md' | 'url';

export interface BookMeta {
  title: string;
  author: string;
  tags: string[];
  source: string;
  format: BookFormat;
}

export interface Chunk {
  id: string;
  bookId: string;
  index: number;
  text: string;
  tokens: number;
  embedding?: number[];
}

export interface IngestResult {
  bookId: string;
  status: 'ok' | 'error' | 'partial';
  totalChunks: number;
  totalTokens: number;
  chunks: Chunk[];
  errors: string[];
}

function countTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function chunkText(text: string, maxTokens: number = 800): string[] {
  const paragraphs = text.split(/\n\s*\n/);
  const chunks: string[] = [];
  let current = '';

  for (const p of paragraphs) {
    const pTokens = countTokens(p);
    if (pTokens > maxTokens) {
      if (current) {
        chunks.push(current.trim());
        current = '';
      }
      const sentences = p.match(/[^.!?]+[.!?]+/g) || [p];
      let sentenceGroup = '';
      for (const s of sentences) {
        const groupTokens = countTokens(sentenceGroup + ' ' + s);
        if (groupTokens > maxTokens) {
          if (sentenceGroup) chunks.push(sentenceGroup.trim());
          sentenceGroup = s;
        } else {
          sentenceGroup += (sentenceGroup ? ' ' : '') + s;
        }
      }
      if (sentenceGroup) chunks.push(sentenceGroup.trim());
    } else if (countTokens(current + '\n\n' + p) > maxTokens) {
      chunks.push(current.trim());
      current = p;
    } else {
      current += (current ? '\n\n' : '') + p;
    }
  }
  if (current) chunks.push(current.trim());
  return chunks.filter(c => c.length > 0);
}

let bookCounter = 0;

export async function ingestBook(
  input: { buffer?: Buffer; url?: string; text?: string; meta: BookMeta },
  _config: EmbedderConfig,
): Promise<IngestResult> {
  const errors: string[] = [];
  let text = input.text || '';

  if (input.url) {
    try {
      const res = await fetch(input.url);
      text = await res.text();
    } catch (e) {
      errors.push(`Failed to fetch URL: ${(e as Error).message}`);
    }
  }

  if (input.buffer && !text) {
    text = input.buffer.toString('utf-8');
  }

  if (!text || text.length < 10) {
    return {
      bookId: '',
      status: 'error',
      totalChunks: 0,
      totalTokens: 0,
      chunks: [],
      errors: errors.length ? errors : ['No text content extracted'],
    };
  }

  bookCounter++;
  const bookId = `book_${Date.now()}_${bookCounter}`;
  const rawChunks = chunkText(text);
  const totalTokens = rawChunks.reduce((sum, c) => sum + countTokens(c), 0);

  const chunks: Chunk[] = rawChunks.map((text, i) => ({
    id: `${bookId}_chunk_${i}`,
    bookId,
    index: i,
    text,
    tokens: countTokens(text),
  }));

  return {
    bookId,
    status: errors.length ? 'partial' : 'ok',
    totalChunks: chunks.length,
    totalTokens,
    chunks,
    errors,
  };
}
