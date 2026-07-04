// @ts-nocheck

export interface EmbedderConfig {
  provider: 'openai' | 'ollama' | 'mock';
  model: string;
  dimensions: number;
  batchSize: number;
  apiKey?: string;
  baseUrl?: string;
}

export function getEmbedderConfig(): EmbedderConfig {
  return {
    provider: (process.env.EMBED_PROVIDER as EmbedderConfig['provider']) || 'mock',
    model: process.env.EMBED_MODEL || 'text-embedding-3-small',
    dimensions: Number(process.env.EMBED_DIMENSIONS) || 1536,
    batchSize: Number(process.env.EMBED_BATCH_SIZE) || 20,
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: process.env.EMBED_BASE_URL,
  };
}
