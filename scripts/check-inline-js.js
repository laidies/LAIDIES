#!/usr/bin/env node
/* Parse inline JavaScript on every live-facing HTML page. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const EXCLUDED_DIRS = new Set([
  '.git',
  'archive',
  'assets',
  'concepts',
  'docs',
  'email',
  'node_modules',
  'operations',
  'social',
]);
const pages = [];
const failures = [];
let scriptCount = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) walk(absolute);
    } else if (
      entry.name.endsWith('.html') &&
      !entry.name.startsWith('_') &&
      !entry.name.startsWith('preview') &&
      !entry.name.startsWith('design-comp')
    ) {
      pages.push(absolute);
    }
  }
}

walk(ROOT);

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const relative = path.relative(ROOT, page);
  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attributes = match[1];
    const source = match[2];
    if (/\bsrc\s*=/.test(attributes) || !source.trim()) continue;
    if (/type\s*=\s*["']application\/(?:ld\+json|json)["']/i.test(attributes)) continue;
    scriptCount += 1;
    try {
      new vm.Script(source, { filename: relative });
    } catch (error) {
      failures.push(`${relative}: ${error.message.split('\n')[0]}`);
    }
  }
}

if (failures.length) {
  console.error(`✗ INLINE JS: ${failures.length} parse failure(s):`);
  failures.forEach((failure) => console.error(`  · ${failure}`));
  process.exit(1);
}

console.log(`✓ INLINE JS: ${scriptCount} scripts parse across ${pages.length} live pages.`);
