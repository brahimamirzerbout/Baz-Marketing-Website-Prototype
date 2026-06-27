#!/usr/bin/env node
/**
 * BAZ — local backup script.
 *
 * Copies:
 *   - data/baz.db + WAL/SHM sidecars
 *   - data/leads.jsonl (legacy)
 *   - .env.local (with secrets redacted)
 *
 * Usage:
 *   node scripts/backup.mjs              # snapshot to ./backups/baz-<timestamp>/
 *   node scripts/backup.mjs --keep N    # also prune to last N snapshots
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const STAMP = new Date().toISOString().replace(/[:.]/g, '-');
const DEST = path.join(ROOT, 'backups', `baz-${STAMP}`);

const KEEP = (() => {
  const i = process.argv.indexOf('--keep');
  return i > -1 ? parseInt(process.argv[i + 1], 10) || 10 : 10;
})();

async function copy(src, dest) {
  try {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
}

async function main() {
  await fs.mkdir(DEST, { recursive: true });
  let count = 0;

  // SQLite database (with WAL sidecars for consistency)
  for (const f of ['data/baz.db', 'data/baz.db-wal', 'data/baz.db-shm', 'data/leads.jsonl', 'data/leads.status.json']) {
    if (await copy(path.join(ROOT, f), path.join(DEST, f))) {
      console.log(`  + ${f}`);
      count++;
    }
  }

  // Env — redact secrets
  try {
    const raw = await fs.readFile(path.join(ROOT, '.env.local'), 'utf8');
    const redacted = raw
      .split('\n')
      .map((line) => {
        const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/i);
        if (!m) return line;
        const [, key, val] = m;
        const sensitive = /SECRET|TOKEN|KEY|PASSWORD|PRIVATE/i.test(key);
        return sensitive && val && val.length > 4 ? `${key}=<REDACTED-${val.length}-chars>` : line;
      })
      .join('\n');
    await fs.writeFile(path.join(DEST, '.env.local.redacted'), redacted);
    console.log(`  + .env.local (redacted)`);
    count++;
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  // Prune old snapshots
  try {
    const entries = await fs.readdir(path.join(ROOT, 'backups'));
    const stamps = entries.filter((e) => e.startsWith('baz-')).sort();
    const excess = stamps.length - KEEP;
    if (excess > 0) {
      for (const old of stamps.slice(0, excess)) {
        await fs.rm(path.join(ROOT, 'backups', old), { recursive: true });
        console.log(`  - pruned ${old}`);
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  console.log(`\nBackup complete: ${DEST} (${count} files, last ${KEEP} kept)`);
}

main().catch((err) => {
  console.error('Backup failed:', err);
  process.exit(1);
});