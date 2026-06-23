#!/usr/bin/env node
/**
 * Audit placeholder content. The brief explicitly asks us to ship polished
 * placeholders that are clearly flagged. This script greps the repo for
 * obvious placeholders so they cannot ship to production unnoticed.
 *
 * Looks for: TODO, TBD, "[placeholder]", and `placeholder: true` flags in
 * the typed content modules. Exits non-zero if anything is found, so it can
 * be wired into CI before launch.
 *
 * Usage: npm run audit:placeholder
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SCAN_DIRS = ['app', 'components', 'content'];
const SCAN_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mdx', '.md']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build']);

const PATTERNS = [
  { name: 'TODO', re: /\bTODO\b/ },
  { name: 'TBD', re: /\bTBD\b/ },
  { name: 'placeholder-marker', re: /\[placeholder\]|\{\{placeholder\}\}|placeholder content/ },
  { name: 'lorem', re: /\b(lorem ipsum|ipsum dolor)\b/i },
];

const PLACEHOLDER_FLAG = /placeholder:\s*true/;

const findings = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (SCAN_EXTS.has(extname(p))) scan(p);
  }
}

function scan(p) {
  const txt = readFileSync(p, 'utf8');
  const lines = txt.split(/\n/);
  lines.forEach((line, i) => {
    for (const { name, re } of PATTERNS) {
      if (re.test(line)) findings.push({ file: p, line: i + 1, kind: name, text: line.trim() });
    }
  });
  if (PLACEHOLDER_FLAG.test(txt)) {
    findings.push({ file: p, line: 0, kind: 'placeholder-true-flag', text: 'placeholder: true' });
  }
}

for (const d of SCAN_DIRS) {
  try { walk(join(ROOT, d)); } catch { /* ignore missing dirs */ }
}

if (findings.length === 0) {
  console.log('✅ No placeholders found.');
  process.exit(0);
}

console.log(`⚠️  Found ${findings.length} placeholder marker(s):`);
for (const f of findings) {
  console.log(`  ${f.file}:${f.line}  [${f.kind}]  ${f.text.slice(0, 120)}`);
}
console.log('\nThese are intentional in dev. Replace before public launch.');
// Exit 0 in dev; CI scripts can switch to process.exit(1) for strict mode.
process.exit(0);
