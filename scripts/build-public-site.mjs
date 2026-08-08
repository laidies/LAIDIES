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
import { assertActiveAsset, compileActiveAssetRegistry } from './lib/active-asset-admission.mjs';
import { assertLibraryAdmissionFreshness } from './compile-library-admission.mjs';
import {
  CONTEXT_NAV_SOURCE_PATH,
  CONTEXT_NAV_SOURCE_SHA256,
} from './lib/context-navigation-distribution-v1.mjs';
import { transformPublicHtml } from './lib/public-html-transform.mjs';
import {
  assertNoInternalReviewFilmFields,
  projectScreeningRoomAdmissionForPublic,
} from './lib/public-screening-room-admission.mjs';
import { partitionPublicRuntimeFamilyMembers } from './lib/public-runtime-family-admission.mjs';

const cliArgs = process.argv.slice(2);
if (cliArgs.includes('--help') || cliArgs.includes('-h')) {
  console.log('Usage: node scripts/build-public-site.mjs [output-directory]');
  process.exit(0);
}
if (cliArgs.length > 1 || (cliArgs[0] && cliArgs[0].startsWith('-'))) {
  throw new Error('expected at most one output directory; flag-like output paths are rejected');
}

const root = path.resolve(import.meta.dirname, '..');
const output = path.resolve(cliArgs[0] || path.join(process.env.TMPDIR || '/tmp', 'laidies-public-site'));
if (output === root || output.startsWith(`${root}${path.sep}`)) {
  throw new Error('public artifact output must be outside the source repository');
}
assertLibraryAdmissionFreshness({ root });
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
const prohibitedSourceReferences = [];
const prohibitedSourceKeys = new Set();
const transformedText = new Map();
let totalBytes = 0;

const derivedManifestPath = 'content/episodes/screening-room-derived-editions.json';
const screeningAdmissionPath = 'content/episodes/screening-room-admission.json';
const defaultAssetRegistryPath = path.join(root, 'operations/assets/active-asset-registry.json');
const assetRegistryPath = process.env.LAIDIES_ASSET_REGISTRY_PATH
  ? path.resolve(process.env.LAIDIES_ASSET_REGISTRY_PATH)
  : defaultAssetRegistryPath;
const runtimeFamilyManifestPath = 'operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/runtime-family-manifest.v1.json';
const assetRegistry = compileActiveAssetRegistry(JSON.parse(fs.readFileSync(assetRegistryPath, 'utf8')));
const derivedManifest = JSON.parse(fs.readFileSync(path.join(root, derivedManifestPath), 'utf8'));
const derivedEditions = new Map(
  Object.entries(derivedManifest.editions || {}).map(([episode, edition]) => [edition.sourceCuePath, { episode, ...edition }]),
);
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

function compileRuntimeFamilyManifest(manifest) {
  if (!manifest || manifest.schema !== 'laidies.public-runtime-families.v1' || manifest.default_policy !== 'DENY') {
    throw new Error('runtime family manifest must declare laidies.public-runtime-families.v1 with default_policy DENY');
  }
  if (!Array.isArray(manifest.families) || manifest.families.length !== 6 || !Array.isArray(manifest.exclusions)) {
    throw new Error('runtime family manifest must contain six families and an exclusions array');
  }
  const members = new Map();
  const exclusions = new Map();
  const validate = (entry, label) => {
    if (!entry || typeof entry.path !== 'string' || !entry.path || entry.path.startsWith('/') || entry.path.includes('\\')) {
      throw new Error(`${label} has an invalid path`);
    }
    if (!/^[a-f0-9]{64}$/.test(entry.sha256 || '')) throw new Error(`${label} has no valid sha256`);
    for (const field of ['consumer', 'job', 'source_reason', 'authority_owner']) {
      if (typeof entry[field] !== 'string' || !entry[field].trim()) throw new Error(`${label} has no ${field}`);
    }
    const normalized = path.posix.normalize(entry.path);
    if (normalized !== entry.path || normalized === '..' || normalized.startsWith('../')) throw new Error(`${label} escapes or is not normalized`);
    const absolute = path.join(root, normalized);
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) throw new Error(`${label} is missing: ${normalized}`);
    if (sha256(fs.readFileSync(absolute)) !== entry.sha256) throw new Error(`${label} checksum mismatch: ${normalized}`);
    return normalized;
  };
  for (const family of manifest.families) {
    if (!family || typeof family.id !== 'string' || !family.id || !Array.isArray(family.members) || family.members.length === 0) {
      throw new Error('runtime family must have an id and explicit members');
    }
    for (const member of family.members) {
      const normalized = validate(member, `runtime family ${family.id} member`);
      if (members.has(normalized)) throw new Error(`duplicate runtime family member: ${normalized}`);
      members.set(normalized, { ...member, family: family.id });
    }
  }
  for (const exclusion of manifest.exclusions) {
    const normalized = validate(exclusion, 'runtime family exclusion');
    if (!Array.isArray(exclusion.reasons) || exclusion.reasons.length === 0) throw new Error(`runtime family exclusion has no reasons: ${normalized}`);
    if (exclusions.has(normalized)) throw new Error(`duplicate runtime family exclusion: ${normalized}`);
    exclusions.set(normalized, exclusion);
  }
  for (const member of members.keys()) {
    if (exclusions.has(member)) throw new Error(`runtime family member is also excluded: ${member}`);
  }
  return { members, exclusions };
}

const runtimeFamilyManifest = JSON.parse(fs.readFileSync(path.join(root, runtimeFamilyManifestPath), 'utf8'));
const runtimeFamilies = compileRuntimeFamilyManifest(runtimeFamilyManifest);

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
  if (!normalized || (isDenied(normalized) && !assetRegistry.exact.has(normalized))) return;
  if (runtimeFamilies.exclusions.has(normalized)) {
    const key = `${normalized}\0${requiredBy}`;
    if (!prohibitedSourceKeys.has(key)) {
      prohibitedSourceKeys.add(key);
      prohibitedSourceReferences.push({ path: normalized, requiredBy, reasons: runtimeFamilies.exclusions.get(normalized).reasons });
    }
    return;
  }
  if (queued.has(normalized)) return;
  const absolute = path.join(root, normalized);
  if (!fs.existsSync(absolute)) {
    missing.push({ path: normalized, requiredBy });
    return;
  }
  if (fs.statSync(absolute).isDirectory()) return;
  queued.add(normalized);
  queue.push(normalized);
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
  if (relative === derivedManifestPath) {
    const publicManifest = JSON.parse(source);
    delete publicManifest.editions?.trailer;
    return `${JSON.stringify(publicManifest, null, 2)}\n`;
  }
  if (relative === screeningAdmissionPath) {
    const projected = projectScreeningRoomAdmissionForPublic(source);
    assertNoInternalReviewFilmFields(projected);
    return projected;
  }
  const edition = derivedEditions.get(relative);
  if (!edition) return transformPublicHtml(relative, source);
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
  return transformPublicHtml(relative, outputSource);
}

function copyFile(relative) {
  const sourcePath = path.join(root, relative);
  const stat = fs.lstatSync(sourcePath);
  if (stat.isSymbolicLink()) {
    missing.push({ path: relative, requiredBy: 'symlinks are not allowed in the public artifact' });
    return;
  }
  const isText = relative === '_redirects' || textExtensions.has(path.extname(relative).toLowerCase());
  if (!isText) assertActiveAsset({ relativePath: relative, absolutePath: sourcePath, registry: assetRegistry });
  if (stat.size > maxFileBytes) {
    oversized.push({ path: relative, bytes: stat.size });
    return;
  }
  const destination = path.join(output, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const source = isText ? transformedText.get(relative) : null;
  if (isText && typeof source !== 'string') throw new Error(`text dependency was not preflighted: ${relative}`);
  if (source === null) fs.copyFileSync(sourcePath, destination);
  else fs.writeFileSync(destination, source);
  copied.add(relative);
  totalBytes += source === null ? stat.size : Buffer.byteLength(source);

}

fs.mkdirSync(output, { recursive: true });
for (const entry of visitorHtmlEntries()) enqueue(entry);
for (const entry of [
  '404.html',
  '_redirects',
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
// static reference crawl cannot discover them. The checksum-bound manifest is
// the complete enumerated build source: directory membership is never public
// authority and exclusions can never be promoted by this builder.
const publicRuntimeFamilies = partitionPublicRuntimeFamilyMembers(runtimeFamilies.members, assetRegistry.exact);
for (const member of publicRuntimeFamilies.active) {
  enqueue(member.path, `${member.source_reason}; consumer=${member.consumer}; job=${member.job}; owner=${member.authority_owner}`);
}
for (const entry of [
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
]) {
  enqueue(entry, 'runtime-generated public data');
}
const runtimeGeneratedAssets = new Map([
  'assets/episodes/ep-01/pixel/ep01-title-card-comic-v2.png',
  'assets/episodes/ep-02/comic/ep02-title-card-comic-v2.png',
  'assets/sunnyvaile-interiors/episode-vhs-boxes/ep-03.webp',
  'assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png',
  'assets/brand/ksvl-cd-mini-pearl-plum.png',
  'assets/brand/ksvl-cd-mini-champagne-lime.png',
  'assets/brand/ksvl-cd-mini-blush-pink.png',
  'assets/brand/ksvl-cd-mini-teal-mint.png',
  'assets/brand/ksvl-cd-mini-lavender-pop.png',
  'assets/brand/ksvl-cd-mini-aqua-blue.png',
].map((entry) => [entry, { path: entry, sha256: sha256(fs.readFileSync(path.join(root, entry))) }]));
const publicRuntimeGeneratedAssets = partitionPublicRuntimeFamilyMembers(runtimeGeneratedAssets, assetRegistry.exact);
for (const entry of publicRuntimeGeneratedAssets.active) {
  enqueue(entry.path, 'runtime-generated public asset');
}

// Resolve the complete dependency graph before copying or applying asset
// admission. This makes prohibited source references visible even when an
// earlier unregistered binary would otherwise stop the build first.
const dependencyOrder = [];
while (queue.length) {
  const relative = queue.shift();
  dependencyOrder.push(relative);
  const isText = relative === '_redirects' || textExtensions.has(path.extname(relative).toLowerCase());
  if (!isText) continue;
  const source = publicTextSource(relative, fs.readFileSync(path.join(root, relative), 'utf8'));
  transformedText.set(relative, source);
  for (const dependency of extractLocalReferences(source, relative)) {
    enqueue(dependency, `reference from ${relative}`);
  }
}

if (prohibitedSourceReferences.length) {
  console.error(`PROHIBITED_SOURCE_REFERENCE: ${prohibitedSourceReferences.length}`);
  for (const item of prohibitedSourceReferences.slice(0, 50)) {
    console.error(`  - ${item.path} (required by ${item.requiredBy}; ${item.reasons.join('; ')})`);
  }
}
if (missing.length) {
  console.error(`Missing public dependencies: ${missing.length}`);
  for (const item of missing.slice(0, 30)) console.error(`  - ${item.path} (required by ${item.requiredBy})`);
}
const dependencyReport = {
  binaryAssets: dependencyOrder
    .filter((relative) => {
      const isText = relative === '_redirects' || textExtensions.has(path.extname(relative).toLowerCase());
      return !isText;
    })
    .map((relative) => {
      const absolute = path.join(root, relative);
      return {
        path: relative,
        sha256: sha256(fs.readFileSync(absolute)),
        bytes: fs.statSync(absolute).size,
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path)),
  prohibitedSourceReferences: prohibitedSourceReferences
    .map((item) => ({ ...item, reasons: [...item.reasons].sort() }))
    .sort((a, b) => a.path.localeCompare(b.path) || a.requiredBy.localeCompare(b.requiredBy)),
  missing: [...missing].sort((a, b) => a.path.localeCompare(b.path) || a.requiredBy.localeCompare(b.requiredBy)),
};
fs.writeFileSync(path.join(output, 'dependency-report.json'), `${JSON.stringify(dependencyReport, null, 2)}\n`);
if (prohibitedSourceReferences.length || missing.length) process.exit(1);

for (const relative of dependencyOrder) copyFile(relative);

const report = {
  generatedAt: new Date().toISOString(),
  source: 'local working tree',
  files: copied.size,
  bytes: totalBytes,
  mebibytes: Number((totalBytes / 1024 / 1024).toFixed(2)),
  missing,
  oversized,
  prohibitedSourceReferences,
  runtimeFamilyManifest: {
    path: runtimeFamilyManifestPath,
    sha256: sha256(fs.readFileSync(path.join(root, runtimeFamilyManifestPath))),
    families: runtimeFamilyManifest.families.length,
    members: runtimeFamilies.members.size,
    activeMembersCopied: publicRuntimeFamilies.active.length,
    heldMembersExcluded: publicRuntimeFamilies.held.length,
    exclusions: runtimeFamilies.exclusions.size,
  },
};
fs.writeFileSync(path.join(output, 'build-report.json'), `${JSON.stringify(report, null, 2)}\n`);

console.log(`Public artifact: ${copied.size} files, ${report.mebibytes} MiB`);
console.log(`Output: ${output}`);
if (oversized.length) {
  console.error(`Oversized public dependencies: ${oversized.length}`);
  for (const item of oversized) console.error(`  - ${item.path} (${(item.bytes / 1024 / 1024).toFixed(2)} MiB)`);
}
if (totalBytes >= warnBytes) console.warn(`Warning: artifact exceeds ${warnBytes / 1024 / 1024} MiB.`);
if (missing.length || prohibitedSourceReferences.length || oversized.length || totalBytes >= failBytes) process.exit(1);
