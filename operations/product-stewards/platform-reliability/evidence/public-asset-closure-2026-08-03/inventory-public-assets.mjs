#!/usr/bin/env node

/*
 * Evidence-only mirror of the curated public builder's dependency walk.
 * It never writes the public artifact and never admits an asset; it reports
 * every binary the current builder would attempt to copy before default-deny
 * admission stops that build.
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {
  CONTEXT_NAV_SOURCE_PATH,
  CONTEXT_NAV_SOURCE_SHA256,
} from '../../../../../scripts/lib/context-navigation-distribution-v1.mjs';
import { transformPublicHtml } from '../../../../../scripts/lib/public-html-transform.mjs';
import {
  assertNoInternalReviewFilmFields,
  projectScreeningRoomAdmissionForPublic,
} from '../../../../../scripts/lib/public-screening-room-admission.mjs';
import { partitionPublicRuntimeFamilyMembers } from '../../../../../scripts/lib/public-runtime-family-admission.mjs';

const cliArgs = process.argv.slice(2);
if (cliArgs.includes('--help') || cliArgs.includes('-h')) {
  console.log('Usage: node inventory-public-assets.mjs [output-json]');
  process.exit(0);
}
if (cliArgs.length > 1 || (cliArgs[0] && cliArgs[0].startsWith('-'))) {
  throw new Error('expected at most one output JSON path; flag-like output paths are rejected');
}

const root = process.cwd();
const output = path.resolve(cliArgs[0] || path.join(import.meta.dirname, 'public-asset-inventory.json'));
const builderPath = 'scripts/build-public-site.mjs';
const registryPath = 'operations/assets/active-asset-registry.json';
const derivedManifestPath = 'content/episodes/screening-room-derived-editions.json';
const screeningAdmissionPath = 'content/episodes/screening-room-admission.json';
const runtimeFamilyManifestPath = 'operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/runtime-family-manifest.v1.json';
const textExtensions = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.webmanifest', '.txt']);
const deniedSegments = new Set(['.git', '.codex', 'operations', 'approved-assets', 'concepts', 'docs', 'social', 'archive', '_archive', '_rejected', '_superseded', 'node_modules']);
const allowedEntryDirectories = new Set(['community', 'games', 'learn', 'mall']);
const blockedPath = /(?:^|\/)(?:_superseded|retired|rejected)(?:\/|$)|(?:^|[-_.])candidate(?:[-_.]|$)/i;
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const fileHash = (relative) => sha256(fs.readFileSync(path.join(root, relative)));
const registry = JSON.parse(fs.readFileSync(path.join(root, registryPath), 'utf8'));
const derivedManifest = JSON.parse(fs.readFileSync(path.join(root, derivedManifestPath), 'utf8'));
const runtimeFamilyManifest = JSON.parse(fs.readFileSync(path.join(root, runtimeFamilyManifestPath), 'utf8'));
if (runtimeFamilyManifest.schema !== 'laidies.public-runtime-families.v1' || runtimeFamilyManifest.default_policy !== 'DENY' || runtimeFamilyManifest.families?.length !== 6) throw new Error('invalid runtime family manifest');
const runtimeMembers = new Map(runtimeFamilyManifest.families.flatMap((family) => family.members.map((member) => [member.path, { ...member, family: family.id }])));
const runtimeExclusions = new Map(runtimeFamilyManifest.exclusions.map((entry) => [entry.path, entry]));
const derivedEditions = new Map(Object.entries(derivedManifest.editions || {}).map(([episode, edition]) => [edition.sourceCuePath, { episode, ...edition }]));
const active = new Map((registry.entries || []).filter((entry) => entry.path && entry.status === 'ACTIVE').map((entry) => [entry.path, entry]));
const nonActive = new Map((registry.entries || []).filter((entry) => entry.path && entry.status !== 'ACTIVE').map((entry) => [entry.path, entry]));
const retired = new Set(registry.retired_paths || []);
for (const family of registry.dynamic_families || []) {
  for (const member of family.members || []) {
    const memberPath = path.posix.join(family.path, member.path);
    (family.status === 'ACTIVE' ? active : nonActive).set(memberPath, { ...family, ...member, path: memberPath });
  }
}

const queued = new Set();
const queue = [];
const records = new Map();
const missing = [];
const prohibitedSourceReferences = [];
const prohibitedSourceKeys = new Set();

function normalizeRelative(candidate, fromFile = '') {
  if (!candidate) return null;
  let value = String(candidate).trim();
  if (!value || value.startsWith('#') || value.startsWith('data:') || value.startsWith('blob:') || value.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(value)) return null;
  value = value.split('#')[0].split('?')[0];
  if (!value || value.includes('${') || value.includes(' + ') || value.includes(',') || value.startsWith("'") || value.startsWith('"') || /^(?:blob|url|path|src|href|photo|ref|f)$/.test(value) || (fromFile && /^[A-Za-z_$][\w$]*(?:\.[\w$]+)+$/.test(value))) return null;
  if (!path.extname(value)) return null;
  try { value = decodeURIComponent(value); } catch { /* report literal if it later misses */ }
  const rootRelative = /^(?:assets|content|community|games|learn|mall)\//.test(value);
  const resolved = value.startsWith('/') || rootRelative ? path.resolve(root, value.replace(/^\/+/, '')) : path.resolve(root, path.dirname(fromFile), value);
  const relative = path.relative(root, resolved);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return relative.split(path.sep).join('/');
}
function isDenied(relative) { return relative.split('/').some((segment) => deniedSegments.has(segment)); }
function enqueue(relative, requiredBy, { allowExtensionless = false } = {}) {
  const normalized = allowExtensionless && relative === path.basename(relative) ? relative : normalizeRelative(relative);
  if (!normalized || (isDenied(normalized) && !active.has(normalized))) return;
  if (runtimeExclusions.has(normalized)) {
    const key = `${normalized}\0${requiredBy}`;
    if (!prohibitedSourceKeys.has(key)) {
      prohibitedSourceKeys.add(key);
      prohibitedSourceReferences.push({ path: normalized, requiredBy, reasons: runtimeExclusions.get(normalized).reasons });
    }
    return;
  }
  if (queued.has(normalized)) return;
  const absolute = path.join(root, normalized);
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) { missing.push({ path: normalized, requiredBy }); return; }
  queued.add(normalized);
  queue.push({ path: normalized, requiredBy });
}
function visitorHtmlEntries() {
  const entries = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.html') && !entry.name.startsWith('_') && !entry.name.startsWith('preview') && !entry.name.startsWith('design-comp') && !entry.name.includes('.pre-')) entries.push(entry.name);
    if (entry.isDirectory() && allowedEntryDirectories.has(entry.name)) {
      for (const child of fs.readdirSync(path.join(root, entry.name), { withFileTypes: true })) {
        if (child.isFile() && child.name.endsWith('.html') && !child.name.startsWith('_') && !child.name.startsWith('preview') && !child.name.startsWith('design-comp') && !child.name.includes('.pre-')) entries.push(`${entry.name}/${child.name}`);
      }
    }
  }
  return entries;
}
function extractLocalReferences(source, relative) {
  const refs = new Set();
  const add = (value) => { if (!value || value.includes('${') || value.includes(' + ') || value.includes(',') || value.startsWith("'") || value.startsWith('"')) return; const normalized = normalizeRelative(value, relative); if (normalized) refs.add(normalized); };
  for (const match of source.matchAll(/\b(?:href|src|poster|action)\s*=\s*(["'])(.*?)\1/gi)) add(match[2]);
  for (const match of source.matchAll(/\bsrcset\s*=\s*(["'])(.*?)\1/gi)) for (const candidate of match[2].split(',')) add(candidate.trim().split(/\s+/)[0]);
  for (const match of source.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) add(match[2]);
  for (const match of source.matchAll(/(?:import|export)\s+(?:[^"']*?\s+from\s+)?(["'])(.*?)\1/g)) add(match[2]);
  for (const match of source.matchAll(/(["'`])(\/?(?:assets|content|community|games|learn|mall)\/[^"'`?#\s]+\.(?:avif|css|gif|html|ico|jpeg|jpg|js|json|m4a|mp3|mp4|pdf|png|svg|vtt|webm|webmanifest|webp|woff2?))\1/gi)) add(match[2]);
  const constants = new Map();
  for (const match of source.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(["'`])([^"'`]*?)\2\s*;/g)) if (!match[3].includes('${')) constants.set(match[1], match[3]);
  for (const match of source.matchAll(/\b([A-Za-z_$][\w$]*)\s*\+\s*(["'`])([^"'`]+?)\2/g)) { const prefix = constants.get(match[1]); if (prefix !== undefined) add(`${prefix}${match[3]}`); }
  return refs;
}
function publicTextSource(relative, source) {
  if (relative === screeningAdmissionPath) {
    const projected = projectScreeningRoomAdmissionForPublic(source);
    assertNoInternalReviewFilmFields(projected);
    return projected;
  }
  const edition = derivedEditions.get(relative);
  if (!edition) return transformPublicHtml(relative, source);
  if (sha256(source) !== edition.sourceCueSha256) throw new Error(`Derived edition source hash mismatch: ${relative}`);
  const data = JSON.parse(source);
  const title = typeof data.title === 'string' ? data.title : [...(data.title?.cues || []), ...(data.cues || [])].find((cue) => cue.type === 'title')?.title || `Episode ${data.episode}`;
  const cues = (data.cues || []).map((cue) => ({ t: cue.t, type: 'full', src: edition.cover, ...(cue.chapter ? { chapter: cue.chapter } : {}), ...((cue.line || cue.label || cue.title || cue.term || cue.text) ? { line: cue.line || cue.label || cue.title || cue.term || cue.text } : {}) }));
  const result = `${JSON.stringify({ note: 'Public cover-only audio edition: one static cover remains on screen. Captions and source illustrated edition remain subject to their recorded holds; no motion film is approved.', episode: data.episode, title, audio: data.audio, cues, edition: { kind: edition.kind, manifest: `/${derivedManifestPath}`, reviewStatus: derivedManifest.reviewStatus, staticCover: true, sourceCueSha256: edition.sourceCueSha256 } }, null, 2)}\n`;
  if (sha256(result) !== edition.artifactCueSha256) throw new Error(`Derived edition artifact hash mismatch: ${relative}`);
  return transformPublicHtml(relative, result);
}
function ownerFor(relative, requiredBy) {
  if (/(^favicon\.ico$|^assets\/brand\/|^approved-assets\/brand-logos\/)/.test(relative)) return 'Brand';
  if (/^assets\/final_map\//.test(relative)) return 'Visitor’s Centre + Brand';
  if (/^(assets\/episodes\/|assets\/video\/|content\/episodes\/)/.test(relative)) return 'Media / Chick Flicks';
  if (/^assets\/library-101\//.test(relative)) return 'LIBRAiRY';
  if (/^assets\/mme-claio\//.test(relative)) return 'Mme CLAi-O’s Shop';
  if (/^assets\/stickers\/ksvl\//.test(relative)) return 'KSVL';
  if (/^assets\/puffies\//.test(relative)) return 'LIBRAiRY + Closet';
  if (/^assets\/charms\//.test(relative)) return 'MAiKEOVER + Closet';
  if (/^assets\/postcards\//.test(relative)) return 'Post Office';
  if (/^assets\/avatars\//.test(relative)) return 'MAiKEOVER + Closet';
  if (/^content\/music\//.test(relative)) return 'KSVL';
  if (/^assets\/sunnyvaile-/.test(relative) || /main-street/.test(relative)) return 'Town Entry + Brand';
  return requiredBy.startsWith('runtime') ? 'Platform + named product owner' : 'Referenced route owner + Platform';
}
function statusFor(relative, actualHash) {
  if (blockedPath.test(relative)) return { status: 'BLOCKED_PATH_RETIRED_REJECTED_OR_CANDIDATE', registry_status: retired.has(relative) ? 'RETIRED' : null };
  if (retired.has(relative)) return { status: 'RETIRED', registry_status: 'RETIRED' };
  if (nonActive.has(relative)) return { status: nonActive.get(relative).status, registry_status: nonActive.get(relative).status };
  if (!active.has(relative)) return { status: 'UNREGISTERED_DEFAULT_DENY', registry_status: null };
  const entry = active.get(relative);
  return { status: entry.sha256 === actualHash ? 'ACTIVE' : 'ACTIVE_CHECKSUM_MISMATCH', registry_status: 'ACTIVE', role: entry.role, authority: entry.authority || null };
}
function pathFlagsFor(relative) {
  const flags = [];
  if (/candidate/i.test(relative)) flags.push('CANDIDATE_PATH');
  if (/rejected/i.test(relative)) flags.push('REJECTED_PATH');
  if (/retired/i.test(relative) || retired.has(relative)) flags.push('RETIRED_PATH');
  if (/superseded/i.test(relative)) flags.push('SUPERSEDED_PATH');
  return flags;
}

if (fileHash('content/site/sv-back-nav.js') !== CONTEXT_NAV_SOURCE_SHA256) throw new Error(`Context navigation source hash mismatch: ${CONTEXT_NAV_SOURCE_PATH}`);
for (const entry of visitorHtmlEntries()) enqueue(entry, 'visitor route entry');
for (const entry of ['404.html', '_redirects', 'manifest.webmanifest', 'robots.txt', 'sitemap.xml', 'script.js', 'style.css']) if (fs.existsSync(path.join(root, entry))) enqueue(entry, 'public root file', { allowExtensionless: entry === '_redirects' });
const publicRuntimeFamilies = partitionPublicRuntimeFamilyMembers(runtimeMembers, active);
for (const member of publicRuntimeFamilies.active) {
  enqueue(member.path, `${member.source_reason}; consumer=${member.consumer}; job=${member.job}; owner=${member.authority_owner}`);
}
for (const entry of ['content/episodes/episode-trailer-cues.json', 'content/episodes/episode-01-cues.json', 'content/episodes/episode-02-cues.json', 'content/episodes/episode-03-cues.json', 'content/episodes/episode-04-cues.json', 'content/episodes/screening-room-admission.schema.json', 'content/episodes/screening-room-admission.json', 'content/episodes/screening-room-derived-editions.json', 'content/site/high-classes.json', 'content/site/high-learning-ledger.json', 'content/site/readiness/v1/canonical-destinations.v1.json', 'content/site/readiness/v1/entry-readiness-projection.v1.json', 'content/site/readiness/v1/readiness-current-projection-v1.schema.json', 'content/site/readiness/v1/readiness-runtime-v1.js']) enqueue(entry, 'runtime-generated public data');
const runtimeGeneratedAssets = new Map(['assets/sunnyvaile-interiors/episode-vhs-boxes/ep-01.webp', 'assets/sunnyvaile-interiors/episode-vhs-boxes/ep-02.webp', 'assets/sunnyvaile-interiors/episode-vhs-boxes/ep-03.webp', 'assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png', 'assets/brand/ksvl-cd-mini-pearl-plum.png', 'assets/brand/ksvl-cd-mini-champagne-lime.png', 'assets/brand/ksvl-cd-mini-blush-pink.png', 'assets/brand/ksvl-cd-mini-teal-mint.png', 'assets/brand/ksvl-cd-mini-lavender-pop.png', 'assets/brand/ksvl-cd-mini-aqua-blue.png'].map((entry) => [entry, { path: entry, sha256: fileHash(entry) }]));
const publicRuntimeGeneratedAssets = partitionPublicRuntimeFamilyMembers(runtimeGeneratedAssets, active);
for (const entry of publicRuntimeGeneratedAssets.active) enqueue(entry.path, 'runtime-generated public asset');

while (queue.length) {
  const item = queue.shift();
  const absolute = path.join(root, item.path);
  const isText = item.path === '_redirects' || textExtensions.has(path.extname(item.path).toLowerCase());
  if (!isText) {
    const actualHash = fileHash(item.path);
    const runtimeMember = runtimeMembers.get(item.path);
    records.set(item.path, { path: item.path, sha256: actualHash, bytes: fs.statSync(absolute).size, source_reason: item.requiredBy, authority_owner: runtimeMember?.authority_owner || ownerFor(item.path, item.requiredBy), path_flags: pathFlagsFor(item.path), semantic_non_admit: runtimeExclusions.has(item.path), ...statusFor(item.path, actualHash) });
  } else {
    const source = publicTextSource(item.path, fs.readFileSync(absolute, 'utf8'));
    for (const dependency of extractLocalReferences(source, item.path)) enqueue(dependency, `reference from ${item.path}`);
  }
}

const assets = [...records.values()].sort((a, b) => a.path.localeCompare(b.path));
const statusCounts = Object.fromEntries([...new Set(assets.map((asset) => asset.status))].sort().map((status) => [status, assets.filter((asset) => asset.status === status).length]));
const blockedPaths = assets.filter((asset) => asset.status === 'BLOCKED_PATH_RETIRED_REJECTED_OR_CANDIDATE').map((asset) => asset.path);
const restrictedSourceAssets = assets.filter((asset) => asset.path_flags.length > 0).map((asset) => ({ path: asset.path, sha256: asset.sha256, source_reason: asset.source_reason, authority_owner: asset.authority_owner, path_flags: asset.path_flags, builder_status: asset.status }));
const semanticNonAdmitAssets = assets.filter((asset) => asset.semantic_non_admit).map((asset) => asset.path);
const manifest = {
  schema: 'laidies.public-asset-closure.v1',
  generated_from: 'current local working tree; evidence-only builder traversal',
  inputs: { builder: { path: builderPath, sha256: fileHash(builderPath) }, registry: { path: registryPath, sha256: fileHash(registryPath) }, runtime_families: { path: runtimeFamilyManifestPath, sha256: fileHash(runtimeFamilyManifestPath), families: runtimeFamilyManifest.families.length, members: runtimeMembers.size, exclusions: runtimeExclusions.size }, context_navigation: { path: CONTEXT_NAV_SOURCE_PATH, sha256: CONTEXT_NAV_SOURCE_SHA256 }, derived_editions: { path: derivedManifestPath, sha256: fileHash(derivedManifestPath) } },
  summary: { binary_assets: assets.length, status_counts: statusCounts, registry_active_entries: active.size, registry_non_active_entries: nonActive.size, registry_retired_paths: retired.size, dynamic_families: (registry.dynamic_families || []).length, builder_blocked_paths: blockedPaths.length, restricted_source_assets: restrictedSourceAssets.length, semantic_non_admit_assets: semanticNonAdmitAssets.length, prohibited_source_references: prohibitedSourceReferences.length, missing_dependencies: missing.length },
  prohibited_source_paths: blockedPaths,
  restricted_source_assets: restrictedSourceAssets,
  semantic_non_admit_assets: semanticNonAdmitAssets,
  prohibited_source_references: prohibitedSourceReferences.sort((a, b) => a.path.localeCompare(b.path) || a.requiredBy.localeCompare(b.requiredBy)),
  missing_dependencies: missing.sort((a, b) => a.path.localeCompare(b.path)),
  assets,
};
fs.writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`);
const verdict = prohibitedSourceReferences.length || missing.length ? 'HOLD' : 'PASS';
console.log(`PUBLIC ASSET INVENTORY ${verdict} binary=${assets.length} ${Object.entries(statusCounts).map(([status, count]) => `${status}=${count}`).join(' ')} prohibited_assets=${blockedPaths.length} prohibited_references=${prohibitedSourceReferences.length} missing=${missing.length}`);
if (verdict !== 'PASS') process.exitCode = 1;
