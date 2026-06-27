/**
 * BAZ — Integration connection state (browser-side persistence)
 *
 * Stored in localStorage under `baz.admin.integrations.v1`. The shape is a
 * Record<IntegrationId, boolean>. Missing keys mean "use the default" (which
 * for 12 of 14 integrations is "connected", and for `zapier` is "available").
 *
 * The store is browser-only. Server components must call this from a
 * client component (the parent page wraps this in `'use client'`).
 */

import { integrations, type IntegrationId } from './catalog';

const KEY = 'baz.admin.integrations.v1';

export type ConnectionMap = Partial<Record<IntegrationId, boolean>>;

function readRaw(): ConnectionMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ConnectionMap) : {};
  } catch {
    return {};
  }
}

function writeRaw(map: ConnectionMap): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // ignore quota errors etc.
  }
}

/** Returns the connection state for an integration.
 *  Defaults to true for everything except `zapier` (which defaults to false). */
export function isConnected(id: IntegrationId, map: ConnectionMap): boolean {
  if (id in map) return Boolean(map[id]);
  return id !== 'zapier';
}

/** Returns the status text shown on a card. Uses the integration's defaultStatus
 *  when connected, or "Available" otherwise. Custom override is preserved. */
export function statusText(id: IntegrationId, map: ConnectionMap, defaultStatus: string): string {
  if (isConnected(id, map)) return defaultStatus;
  return 'Available';
}

/** Read the persisted connection map. SSR-safe (returns {} on the server). */
export function loadConnections(): ConnectionMap {
  return readRaw();
}

/** Persist a connection toggle. Returns the new map. */
export function setConnection(id: IntegrationId, connected: boolean): ConnectionMap {
  const next = { ...readRaw(), [id]: connected };
  writeRaw(next);
  return next;
}

/** Reset every integration to its default connection state. */
export function resetConnections(): ConnectionMap {
  writeRaw({});
  return {};
}

/** Count of currently-connected integrations across the catalog. */
export function countConnected(map: ConnectionMap): number {
  return integrations.filter((i) => isConnected(i.id, map)).length;
}

/** Total integrations in the catalog. */
export function totalIntegrations(): number {
  return integrations.length;
}