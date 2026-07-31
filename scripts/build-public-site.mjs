#!/usr/bin/env node

/*
 * Build a curated static-site artifact from the LAiDIES studio repository.
 *
 * The repository contains production sources, alternates, review films and
 * internal operations records that must never be treated as public website
 * files. This builder starts from visitor-facing pages and follows their local
 * dependencies instead of copying the whole repository.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import crypto from 'node:crypto';
import {
  CONTEXT_NAV_SOURCE_PATH,
  CONTEXT_NAV_SOURCE_SHA256,
  distributeContextNavigation,
} from './lib/context-navigation-distribution-v1.mjs';

const root = path.resolve(import.meta.dirname, '..');
const output = path.resolve(process.argv[2] || path.join(process.env.TMPDIR || '/tmp', 'laidies-public-site'));
const maxFileBytes = 25 * 1024 * 1024;
const warnBytes = 750 * 1024 * 1024;
const failBytes = 1100 * 1024 * 1024;

const deniedSegments = new Set([
  '.git',
  '.codex',
  'operations',
  'approved-assets',
  'concepts',
  'docs',
  'social',
  'archive',
  '_archive',
  '_rejected',
  '_superseded',
  'node_modules',
]);

const allowedEntryDirectories = new Set(['community', 'games', 'learn', 'mall']);
const textExtensions = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.webmanifest', '.txt']);
const copied = new Set();
const queued = new Set();
const queue = [];
const missing = [];
const oversized = [];
let totalBytes = 0;

const derivedManifestPath = 'content/episodes/screening-room-derived-editions.json';
const derivedManifest = JSON.parse(fs.readFileSync(path.join(root, derivedManifestPath), 'utf8'));
const derivedEditions = new Map(
  Object.entries(derivedManifest.editions || {}).map(([episode, edition]) => [edition.sourceCuePath, { episode, ...edition }]),
);
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

const contextNavBytes = fs.readFileSync(path.join(root, CONTEXT_NAV_SOURCE_PATH));
if (sha256(contextNavBytes) !== CONTEXT_NAV_SOURCE_SHA256) {
  throw new Error(`Context navigation source hash mismatch: ${CONTEXT_NAV_SOURCE_PATH}`);
}

function isVisitorHtmlName(name) {
  return (
    name.endsWith('.html')
    && !name.startsWith('_')
    && !name.startsWith('preview')
    && !name.startsWith('design-comp')
    && !name.includes('.pre-')
  );
}

function normalizeRelative(candidate, fromFile = '') {
  if (!candidate) return null;
  let value = String(candidate).trim();
  if (
    !value ||
    value.startsWith('#') ||
    value.startsWith('data:') ||
    value.startsWith('blob:') ||
    value.startsWith('//') ||
    /^[a-z][a-z0-9+.-]*:/i.test(value)
  ) return null;
  value = value.split('#')[0].split('?')[0];
  if (
    !value ||
    value.includes('${') ||
    value.includes(' + ') ||
    value.includes(',') ||
    value.startsWith("'") ||
    value.startsWith('"') ||
    /^(?:blob|url|path|src|href|photo|ref|f)$/.test(value) ||
    (fromFile && /^[A-Za-z_$][\w$]*(?:\.[\w$]+)+$/.test(value))
  ) return null;
  if (!path.extname(value)) return null;
  try {
    value = decodeURIComponent(value);
  } catch {
    // Keep the literal value; a malformed path will be reported as missing.
  }
  const rootRelative = /^(?:assets|content|community|games|learn|mall)\//.test(value);
  const resolved = value.startsWith('/') || rootRelative
    ? path.resolve(root, value.replace(/^\/+/, ''))
    : path.resolve(root, path.dirname(fromFile), value);
  const relative = path.relative(root, resolved);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return relative.split(path.sep).join('/');
}

function isDenied(relative) {
  return relative.split('/').some((segment) => deniedSegments.has(segment));
}

function enqueue(relative, requiredBy = 'release entry', { allowExtensionless = false } = {}) {
  const normalized = allowExtensionless && relative === path.basename(relative)
    ? relative
    : normalizeRelative(relative);
  if (!normalized || isDenied(normalized) || queued.has(normalized)) return;
  const absolute = path.join(root, normalized);
  if (!fs.existsSync(absolute)) {
    missing.push({ path: normalized, requiredBy });
    return;
  }
  if (fs.statSync(absolute).isDirectory()) return;
  queued.add(normalized);
  queue.push(normalized);
}

function enqueueTree(relativeDirectory, predicate = () => true) {
  const absoluteDirectory = path.join(root, relativeDirectory);
  if (!fs.existsSync(absoluteDirectory)) return;
  for (const dirent of fs.readdirSync(absoluteDirectory, { withFileTypes: true })) {
    const relative = `${relativeDirectory}/${dirent.name}`.split(path.sep).join('/');
    if (dirent.isDirectory()) {
      if (!isDenied(relative)) enqueueTree(relative, predicate);
    } else if (dirent.isFile() && predicate(relative)) {
      enqueue(relative, 'runtime-generated public asset');
    }
  }
}

function visitorHtmlEntries() {
  const entries = [];
  for (const dirent of fs.readdirSync(root, { withFileTypes: true })) {
    if (
      dirent.isFile() &&
      isVisitorHtmlName(dirent.name)
    ) entries.push(dirent.name);
    if (dirent.isDirectory() && allowedEntryDirectories.has(dirent.name)) {
      const base = path.join(root, dirent.name);
      for (const child of fs.readdirSync(base, { withFileTypes: true })) {
        if (child.isFile() && isVisitorHtmlName(child.name)) {
          entries.push(`${dirent.name}/${child.name}`);
        }
      }
    }
  }
  return entries;
}

function extractLocalReferences(source, relative) {
  const references = new Set();
  const add = (value) => {
    if (
      !value ||
      value.includes('${') ||
      value.includes(' + ') ||
      value.includes(',') ||
      value.startsWith("'") ||
      value.startsWith('"')
    ) return;
    const normalized = normalizeRelative(value, relative);
    if (normalized) references.add(normalized);
  };

  for (const match of source.matchAll(/\b(?:href|src|poster|action)\s*=\s*(["'])(.*?)\1/gi)) add(match[2]);
  for (const match of source.matchAll(/\bsrcset\s*=\s*(["'])(.*?)\1/gi)) {
    for (const candidate of match[2].split(',')) add(candidate.trim().split(/\s+/)[0]);
  }
  for (const match of source.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) add(match[2]);
  for (const match of source.matchAll(/(?:import|export)\s+(?:[^"']*?\s+from\s+)?(["'])(.*?)\1/g)) add(match[2]);
  for (const match of source.matchAll(/(["'`])(\/?(?:assets|content|community|games|learn|mall)\/[^"'`?#\s]+\.(?:avif|css|gif|html|ico|jpeg|jpg|js|json|m4a|mp3|mp4|pdf|png|svg|vtt|webm|webmanifest|webp|woff2?))\1/gi)) {
    add(match[2]);
  }

  // Resolve the simple path construction used by visitor-facing runtime
  // catalogues, for example:
  //   var JINGLES_DIR = '/content/music/ksvl-jingles/';
  //   { src: JINGLES_DIR + 'jingle-ksvl-station-id.mp3' }
  //
  // This deliberately handles only reviewed string constants plus a literal
  // suffix. Arbitrary JavaScript evaluation would make the release boundary
  // unpredictable and unsafe.
  const stringConstants = new Map();
  for (const match of source.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(["'`])([^"'`]*?)\2\s*;/g)) {
    if (!match[3].includes('${')) stringConstants.set(match[1], match[3]);
  }
  for (const match of source.matchAll(/\b([A-Za-z_$][\w$]*)\s*\+\s*(["'`])([^"'`]+?)\2/g)) {
    const prefix = stringConstants.get(match[1]);
    if (prefix !== undefined) add(`${prefix}${match[3]}`);
  }

  return references;
}

function publicTextSource(relative, source) {
  const edition = derivedEditions.get(relative);
  if (!edition) return distributeContextNavigation(relative, source);
  if (sha256(source) !== edition.sourceCueSha256) {
    throw new Error(`Derived edition source hash mismatch: ${relative}`);
  }

  const data = JSON.parse(source);
  const title = typeof data.title === 'string'
    ? data.title
    : [...(data.title?.cues || []), ...(data.cues || [])].find((cue) => cue.type === 'title')?.title
      || `Episode ${data.episode}`;
  const cues = (data.cues || []).map((cue) => {
    const line = cue.line || cue.label || cue.title || cue.term || cue.text || '';
    return {
      t: cue.t,
      type: 'full',
      src: edition.cover,
      ...(cue.chapter ? { chapter: cue.chapter } : {}),
      ...(line ? { line } : {}),
    };
  });
  const outputSource = `${JSON.stringify({
    note: 'Public cover-only audio edition: one static cover remains on screen. Captions and source illustrated edition remain subject to their recorded holds; no motion film is approved.',
    episode: data.episode,
    title,
    audio: data.audio,
    cues,
    edition: {
      kind: edition.kind,
      manifest: `/${derivedManifestPath}`,
      reviewStatus: derivedManifest.reviewStatus,
      staticCover: true,
      sourceCueSha256: edition.sourceCueSha256,
    },
  }, null, 2)}\n`;
  if (sha256(outputSource) !== edition.artifactCueSha256) {
    throw new Error(`Derived edition artifact hash mismatch: ${relative}`);
  }
  return distributeContextNavigation(relative, outputSource);
}

function copyFile(relative) {
  const sourcePath = path.join(root, relative);
  const stat = fs.lstatSync(sourcePath);
  if (stat.isSymbolicLink()) {
    missing.push({ path: relative, requiredBy: 'symlinks are not allowed in the public artifact' });
    return;
  }
  if (stat.size > maxFileBytes) {
    oversized.push({ path: relative, bytes: stat.size });
    return;
  }
  const destination = path.join(output, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const isText = textExtensions.has(path.extname(relative).toLowerCase());
  const source = isText
    ? publicTextSource(relative, fs.readFileSync(sourcePath, 'utf8'))
    : null;
  if (source === null) fs.copyFileSync(sourcePath, destination);
  else fs.writeFileSync(destination, source);
  copied.add(relative);
  totalBytes += source === null ? stat.size : Buffer.byteLength(source);

  if (source !== null) {
    for (const dependency of extractLocalReferences(source, relative)) {
      if (!isDenied(dependency) && !queued.has(dependency)) {
        const absolute = path.join(root, dependency);
        if (fs.existsSync(absolute) && fs.statSync(absolute).isFile()) {
          queued.add(dependency);
          queue.push(dependency);
        } else {
          missing.push({ path: dependency, requiredBy: relative });
        }
      }
    }
  }
}

fs.mkdirSync(output, { recursive: true });
for (const entry of visitorHtmlEntries()) enqueue(entry);
for (const entry of [
  '404.html',
  '_redirects',
  'favicon.ico',
  'manifest.webmanifest',
  'robots.txt',
  'sitemap.xml',
  'script.js',
  'style.css',
]) {
  if (fs.existsSync(path.join(root, entry))) {
    enqueue(entry, 'public root file', { allowExtensionless: entry === '_redirects' });
  }
}

// These assets are selected at runtime from data or constructed paths, so a
// static reference crawl cannot discover them. Keep this list explicit and
// visitor-facing: it is a release manifest, not permission to copy the studio.
// The reader constructs filenames under the approved bright family at
// runtime. Copy that production family only; the root library folder also
// contains superseded/original cover systems that are studio evidence, not
// public dependencies.
enqueueTree('assets/library-101/bright-family-v2', (relative) => relative.endsWith('.png'));
enqueueTree('assets/mme-claio/reading-cards', (relative) => relative.endsWith('.webp'));
enqueueTree('assets/stickers/ksvl', (relative) => relative.endsWith('.png'));
enqueueTree('assets/puffies', (relative) => relative.endsWith('.png'));
enqueueTree('assets/charms');
enqueueTree('assets/postcards/from-sunnyvaile');
for (const entry of [
  'content/episodes/episode-trailer-cues.json',
  'content/episodes/episode-01-cues.json',
  'content/episodes/episode-02-cues.json',
  'content/episodes/episode-03-cues.json',
  'content/episodes/episode-04-cues.json',
  'content/episodes/screening-room-admission.schema.json',
  'content/episodes/screening-room-admission.json',
  'content/episodes/screening-room-derived-editions.json',
  'content/site/high-classes.json',
  'content/site/high-learning-ledger.json',
  'content/site/readiness/v1/canonical-destinations.v1.json',
  'content/site/readiness/v1/entry-readiness-projection.v1.json',
  'content/site/readiness/v1/readiness-current-projection-v1.schema.json',
  'content/site/readiness/v1/readiness-runtime-v1.js',
  'assets/sunnyvaile-interiors/episode-vhs-boxes/ep-01.webp',
  'assets/sunnyvaile-interiors/episode-vhs-boxes/ep-02.webp',
  'assets/sunnyvaile-interiors/episode-vhs-boxes/ep-03.webp',
  'assets/sunnyvaile-interiors/episode-vhs-boxes/ep-04.webp',
  'assets/avatars/claires/claires-avatar-butterfly-clip.png',
  'assets/avatars/claires/claires-avatar-velvet-scrunchie.png',
  'assets/avatars/claires/claires-avatar-claw-clip.png',
  'assets/avatars/claires/claires-avatar-snap-barrette.png',
  'assets/avatars/claires/claires-avatar-butterfly-hair-tinsel.png',
  'assets/brand/ksvl-cd-mini-pearl-plum.png',
  'assets/brand/ksvl-cd-mini-champagne-lime.png',
  'assets/brand/ksvl-cd-mini-blush-pink.png',
  'assets/brand/ksvl-cd-mini-teal-mint.png',
  'assets/brand/ksvl-cd-mini-lavender-pop.png',
  'assets/brand/ksvl-cd-mini-aqua-blue.png',
]) {
  enqueue(entry, 'runtime-generated public asset');
}

while (queue.length) copyFile(queue.shift());

const report = {
  generatedAt: new Date().toISOString(),
  source: 'local working tree',
  files: copied.size,
  bytes: totalBytes,
  mebibytes: Number((totalBytes / 1024 / 1024).toFixed(2)),
  missing,
  oversized,
};
fs.writeFileSync(path.join(output, 'build-report.json'), `${JSON.stringify(report, null, 2)}\n`);

console.log(`Public artifact: ${copied.size} files, ${report.mebibytes} MiB`);
console.log(`Output: ${output}`);
if (missing.length) {
  console.error(`Missing public dependencies: ${missing.length}`);
  for (const item of missing.slice(0, 30)) console.error(`  - ${item.path} (required by ${item.requiredBy})`);
}
if (oversized.length) {
  console.error(`Oversized public dependencies: ${oversized.length}`);
  for (const item of oversized) console.error(`  - ${item.path} (${(item.bytes / 1024 / 1024).toFixed(2)} MiB)`);
}
if (totalBytes >= warnBytes) console.warn(`Warning: artifact exceeds ${warnBytes / 1024 / 1024} MiB.`);
if (missing.length || oversized.length || totalBytes >= failBytes) process.exit(1);
