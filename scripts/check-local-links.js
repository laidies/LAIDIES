#!/usr/bin/env node
/*
 * Check every live-facing HTML page for missing local links and assets.
 * Internal prototypes, archives, generated review surfaces, and operations
 * dashboards are intentionally excluded from the default release gate.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EXCLUDED_DIRS = new Set([
  '.git',
  'archive',
  '_superseded',
  'assets',
  'concepts',
  'docs',
  'email',
  'node_modules',
  'operations',
  'social',
]);

const failures = [];
let pageCount = 0;
let referenceCount = 0;

function isLiveHtmlName(name) {
  return (
    name.endsWith('.html') &&
    !name.startsWith('_') &&
    !name.startsWith('preview') &&
    !name.startsWith('design-comp') &&
    !name.includes('.pre-')
  );
}

function walk(dir, relative = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const rel = path.join(relative, entry.name);
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) continue;
      files.push(...walk(abs, rel));
    } else if (
      entry.isFile() &&
      isLiveHtmlName(entry.name)
    ) {
      files.push(rel);
    }
  }
  return files;
}

function stripUrl(value) {
  return value.trim().split('#')[0].split('?')[0];
}

function isExternal(value) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value);
}

function resolveTarget(page, value) {
  let clean = stripUrl(value);
  if (!clean || isExternal(clean)) return null;
  try {
    clean = decodeURIComponent(clean);
  } catch (_) {
    // Keep the literal path so a malformed escape is reported as missing.
  }
  const target = clean.startsWith('/')
    ? path.join(ROOT, clean.replace(/^\/+/, ''))
    : path.resolve(ROOT, path.dirname(page), clean);
  if (clean.endsWith('/')) return path.join(target, 'index.html');
  return target;
}

function checkReference(page, attribute, value) {
  if (/\$\{|\$\d|\+|,\s*[A-Z_]+|escapeHTML?\(|\b(?:config|question|quiz)\./.test(value)) return;
  if (/[\/-]$/.test(stripUrl(value))) return;
  const target = resolveTarget(page, value);
  if (!target) return;
  referenceCount += 1;
  if (!fs.existsSync(target)) {
    failures.push(`${page}: ${attribute}="${value}" points at missing ${path.relative(ROOT, target)}`);
  }
}

for (const page of walk(ROOT)) {
  pageCount += 1;
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const attributePattern = /\b(href|src|poster)\s*=\s*(["'])(.*?)\2/gi;
  for (const match of html.matchAll(attributePattern)) {
    checkReference(page, match[1].toLowerCase(), match[3]);
  }
  const srcsetPattern = /\bsrcset\s*=\s*(["'])(.*?)\1/gi;
  for (const match of html.matchAll(srcsetPattern)) {
    for (const candidate of match[2].split(',')) {
      const value = candidate.trim().split(/\s+/)[0];
      if (value) checkReference(page, 'srcset', value);
    }
  }
}

if (failures.length) {
  console.error(`\n✗ LOCAL LINKS: ${failures.length} missing target(s) across ${pageCount} pages:\n`);
  failures.forEach((failure) => console.error(`  · ${failure}`));
  process.exit(1);
}

console.log(`✓ LOCAL LINKS: ${referenceCount} local references resolve across ${pageCount} pages.`);
