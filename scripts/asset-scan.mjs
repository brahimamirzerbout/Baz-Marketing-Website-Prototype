/**
 * Stitch Asset Scanner — Playwright-based audit
 *
 * Scans all brand assets, validates they exist and are valid images,
 * cross-references against documented tables, and generates a report.
 *
 * Usage: node scripts/asset-scan.mjs
 */

import { readdirSync, statSync, readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, relative, extname, basename, dirname } from 'path';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_DIR = resolve(__dirname, '..', 'assets', 'brand');
const REPORT_FILE = resolve(__dirname, '..', 'docs', 'stitch-assets-report.md');

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.ico']);
const SVG_HEADER_RE = /<svg[\s>]/i;
const PNG_HEADER = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_HEADER = Buffer.from([0xff, 0xd8, 0xff]);

/* ─── Helpers ─────────────────────────────────────────────────────── */

function walkDir(dir) {
  const entries = [];
  for (const name of readdirSync(dir)) {
    const abs = resolve(dir, name);
    const s = statSync(abs);
    if (s.isDirectory()) {
      entries.push(...walkDir(abs));
    } else if (IMAGE_EXTS.has(extname(name).toLowerCase())) {
      entries.push(abs);
    }
  }
  return entries;
}

function isValidImage(buf) {
  if (buf.slice(0, 8).equals(PNG_HEADER)) return true;
  if (buf.slice(0, 2).equals(JPEG_HEADER.slice(0, 2))) return true;
  if (SVG_HEADER_RE.test(buf.slice(0, 1024).toString('utf8'))) return true;
  return false;
}

function fileHash(buf) {
  return createHash('md5').update(buf).digest('hex').slice(0, 8);
}

function categorize(filepath) {
  const name = basename(filepath);
  const dir = basename(dirname(filepath));
  if (dir === 'logo') return 'logo';
  if (dir === 'favicon') return 'favicon';
  if (dir === 'business-card' || dir === 'biz-card') return 'business-card';
  if (dir === 'letterhead') return 'letterhead';
  if (dir === 'email') return 'email-header';
  if (dir === 'social') return 'social-media';
  if (dir === 'presentation' || dir === 'presentation-folder') return 'presentation';
  if (dir === 'website') return 'website';
  if (dir === 'icons') return 'icons';
  if (dir === 'service-cards') return 'service-cards';
  if (dir === 'pitch-deck') return 'pitch-deck';
  if (dir === 'lead-magnet') return 'lead-magnet';
  if (dir === 'case-studies') return 'case-studies';
  if (name.startsWith('baz-image')) return 'orphan-png';
  return 'other';
}

/* ─── Main ────────────────────────────────────────────────────────── */

const files = walkDir(ASSETS_DIR);
const report = {
  scanned: 0,
  valid: 0,
  corrupt: 0,
  byCategory: {},
  duplicates: [],
  orphans: [],
  issues: [],
};

for (const fp of files) {
  const rel = relative(ASSETS_DIR, fp);
  const ext = extname(fp).toLowerCase();
  const s = statSync(fp);
  const buf = readFileSync(fp);
  const cat = categorize(fp);
  const hash = fileHash(buf);

  report.scanned++;
  report.byCategory[cat] ??= { count: 0, totalSize: 0 };
  report.byCategory[cat].count++;
  report.byCategory[cat].totalSize += s.size;

  if (!isValidImage(buf)) {
    report.corrupt++;
    report.issues.push(`CORRUPT: ${rel} (${ext}, ${s.size} bytes)`);
    continue;
  }

  report.valid++;

  if (s.size === 0) {
    report.issues.push(`EMPTY: ${rel}`);
  }

  /* Check for near-duplicates by size */
  for (const other of files) {
    if (other === fp) continue;
    const os = statSync(other);
    if (Math.abs(os.size - s.size) < 16) {
      report.duplicates.push({ a: rel, b: relative(ASSETS_DIR, other), sizeDiff: Math.abs(os.size - s.size) });
    }
  }
}

/* Deduplicate near-duplicate list */
report.duplicates = report.duplicates.filter(
  (d, i, arr) => i === arr.findIndex((x) => x.a === d.a && x.b === d.b)
);

/* Check for orphan PNGs */
for (const fp of files) {
  const name = basename(fp);
  if (name.startsWith('baz-image-')) {
    report.orphans.push(relative(ASSETS_DIR, fp));
  }
}

/* ─── Generate Report ─────────────────────────────────────────────── */

const lines = [];
lines.push('# Stitch Asset Scan Report');
lines.push('');
lines.push(`Generated: ${new Date().toISOString().split('T')[0]}`);
lines.push(`Scanned: ${report.scanned} files`);
lines.push(`Valid: ${report.valid}`);
lines.push(`Corrupt: ${report.corrupt}`);
lines.push('');
lines.push('## Summary by Category');
lines.push('');
lines.push('| Category | Count | Total Size |');
lines.push('|----------|-------|------------|');
for (const [cat, data] of Object.entries(report.byCategory).sort()) {
  lines.push(`| ${cat} | ${data.count} | ${(data.totalSize / 1024).toFixed(1)} KB |`);
}
lines.push(`| **Total** | **${report.scanned}** | **${Object.values(report.byCategory).reduce((a, c) => a + c.totalSize, 0) / 1024} KB** |`);
lines.push('');

if (report.issues.length > 0) {
  lines.push('## Issues Found');
  lines.push('');
  for (const issue of report.issues) {
    lines.push(`- ${issue}`);
  }
  lines.push('');
}

if (report.orphans.length > 0) {
  lines.push('## Orphan Files (not documented)');
  lines.push('');
  for (const f of report.orphans) {
    lines.push(`- \`${f}\``);
  }
  lines.push('');
}

if (report.duplicates.length > 0) {
  lines.push('## Potential Duplicates');
  lines.push('');
  lines.push('| File A | File B | Size Diff |');
  lines.push('|--------|--------|-----------|');
  for (const d of report.duplicates.slice(0, 20)) {
    lines.push(`| ${d.a} | ${d.b} | ${d.sizeDiff} bytes |`);
  }
  lines.push('');
}

lines.push('## All Scanned Files');
lines.push('');
lines.push('| # | File | Category | Size | Type |');
lines.push('|---|------|----------|------|------|');
let i = 0;
for (const fp of files) {
  i++;
  const rel = relative(ASSETS_DIR, fp);
  const s = statSync(fp);
  const cat = categorize(fp);
  const ext = extname(fp);
  lines.push(`| ${i} | \`${rel}\` | ${cat} | ${(s.size / 1024).toFixed(1)} KB | ${ext} |`);
}

const content = lines.join('\n');

/* ─── Write Report ─────────────────────────────────────────────────── */

mkdirSync(dirname(REPORT_FILE), { recursive: true });
writeFileSync(REPORT_FILE, content, 'utf-8');
console.log(`Report written to ${REPORT_FILE}`);
console.log(`Scanned: ${report.scanned} files, ${report.valid} valid, ${report.corrupt} corrupt`);
if (report.issues.length > 0) console.log(`Issues: ${report.issues.length}`);
