#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';

function parseArgs(argv) {
  if (argv.length === 1 && argv[0] === '--help') {
    console.log('Usage: node scripts/build-public-site.mjs --root <repository> --output <directory> [--entrypoints <json>]');
    process.exit(0);
  }
  if (argv.length === 1 && argv[0].startsWith('-')) {
    throw new Error('flag-like output paths are rejected');
  }
  if (argv.length === 1 && !argv[0].startsWith('-')) return { output: argv[0] };
  const result = {};
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!['--root', '--output', '--entrypoints'].includes(flag) || !value) {
      throw new Error('Usage: node scripts/build-public-site.mjs --root <repository> --output <directory> [--entrypoints <json>]');
    }
    result[flag.slice(2)] = value;
  }
  return result;
}

const args = parseArgs(process.argv.slice(2));
const root = path.resolve(args.root || path.join(import.meta.dirname, '..'));
const output = path.resolve(args.output || path.join(process.env.TMPDIR || '/tmp', 'laidies-public-site'));
const entrypointPath = path.resolve(args.entrypoints || path.join(root, 'operations/release-control/public-entrypoints.json'));

if (output === root || output.startsWith(`${root}${path.sep}`)) {
  throw new Error('public artifact output must be outside the source repository');
}

const deniedSegments = new Set([
  '.agents', '.claude', '.codex', '.design-sync', '.git', '.github', '.githooks',
  '.retired', '.versions', 'archive', 'concepts', 'docs', 'email',
  'node_modules', 'operations', 'scripts', 'social', 'supabase', 'worker', 'worker-avatar',
]);
const parseableExtensions = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.webmanifest', '.txt']);
const tracked = new Set(execFileSync('git', ['-C', root, 'ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean));
const policy = JSON.parse(fs.readFileSync(entrypointPath, 'utf8'));
if (policy.schema !== 'laidies.public-entrypoints.v1' || !Array.isArray(policy.entrypoints) || !Array.isArray(policy.publicRootFiles)) {
  throw new Error('public entrypoint policy is invalid');
}

const queued = new Set();
const queue = [];
const copied = [];
const missing = [];
const prohibited = [];

function normalize(candidate, fromFile = '') {
  if (!candidate) return null;
  let value = String(candidate).trim();
  if (!value || value.startsWith('#') || value.startsWith('data:') || value.startsWith('blob:') || value.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(value)) return null;
  value = value.split('#')[0].split('?')[0];
  if (!value || value.includes('${') || value.includes(' + ') || value.includes(',') || value.startsWith("'") || value.startsWith('"')) return null;
  if (/^[A-Za-z_$][\w$]*(?:\.[\w$]+)*\.(?:href|src|rereadUrl|reviewUrl)$/.test(value)) return null;
  if (!path.extname(value)) return null;
  try { value = decodeURIComponent(value); } catch { /* malformed local paths fail as missing */ }
  const rootRelative = /^(?:approved-assets|assets|community|content|games|learn|mall)\//.test(value);
  const absolute = value.startsWith('/') || rootRelative
    ? path.resolve(root, value.replace(/^\/+/, ''))
    : path.resolve(root, path.dirname(fromFile), value);
  const relative = path.relative(root, absolute).split(path.sep).join('/');
  if (!relative || relative === '..' || relative.startsWith('../')) return null;
  return relative;
}

function denied(relative) {
  return relative.split('/').some((segment) => deniedSegments.has(segment));
}

function enqueue(candidate, requiredBy) {
  const relative = normalize(candidate, requiredBy === 'release policy' ? '' : requiredBy);
  if (!relative || queued.has(relative)) return;
  if (denied(relative)) {
    prohibited.push({ path: relative, requiredBy });
    return;
  }
  const absolute = path.join(root, relative);
  if (!tracked.has(relative) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    missing.push({ path: relative, requiredBy });
    return;
  }
  queued.add(relative);
  queue.push(relative);
}

function extractReferences(source, relative) {
  const values = [];
  for (const match of source.matchAll(/\b(?:href|src|poster|action)\s*=\s*(["'])(.*?)\1/gi)) values.push(match[2]);
  for (const match of source.matchAll(/\bsrcset\s*=\s*(["'])(.*?)\1/gi)) {
    for (const candidate of match[2].split(',')) values.push(candidate.trim().split(/\s+/)[0]);
  }
  for (const match of source.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) values.push(match[2]);
  for (const match of source.matchAll(/(?:import|export)\s+(?:[^"']*?\s+from\s+)?(["'])(.*?)\1/g)) values.push(match[2]);
  for (const match of source.matchAll(/(["'`])(\/?(?:approved-assets|assets|community|content|games|learn|mall)\/[^"'`?#\s]+\.[A-Za-z0-9]{1,8})\1/g)) values.push(match[2]);
  for (const value of values) enqueue(value, relative);
}

for (const entrypoint of [...policy.entrypoints, ...policy.publicRootFiles]) enqueue(entrypoint, 'release policy');

while (queue.length) {
  const relative = queue.shift();
  const sourcePath = path.join(root, relative);
  const destinationPath = path.join(output, relative);
  const contents = fs.readFileSync(sourcePath);
  if (parseableExtensions.has(path.extname(relative).toLowerCase())) extractReferences(contents.toString('utf8'), relative);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.writeFileSync(destinationPath, contents);
  copied.push(relative);
}

if (prohibited.length || missing.length) {
  const details = [];
  if (prohibited.length) details.push(`prohibited references:\n${JSON.stringify(prohibited, null, 2)}`);
  if (missing.length) details.push(`missing or untracked references:\n${JSON.stringify(missing, null, 2)}`);
  throw new Error(details.join('\n'));
}

fs.writeFileSync(path.join(output, '.nojekyll'), '');
for (const relative of copied) {
  if (denied(relative)) throw new Error(`internal path entered artifact: ${relative}`);
}
console.log(`CURATED PUBLIC ARTIFACT: ${copied.length + 1} files`);
console.log(output);
