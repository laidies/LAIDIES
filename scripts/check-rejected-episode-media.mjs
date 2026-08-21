#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const argIndex = process.argv.indexOf('--root');
const root = argIndex >= 0 ? path.resolve(process.argv[argIndex + 1]) : path.resolve(import.meta.dirname, '..');
const cutDecisionPath = path.join(root, 'operations/ep04-cut-decisions.md');
const registryPath = path.join(root, 'operations/assets/active-asset-registry.json');
const manifestPath = path.join(root, 'operations/quarantine/episode-media-20260820.json');
const allManifestPath = path.join(root, 'assets/rejected/episode-media-all-20260820/manifest.json');
const denylistPath = path.join(root, 'operations/quarantine/episode-media-denylist-20260820.json');
const sourceManifestPath = path.join(root, 'operations/quarantine/episode-media-source-checkout-20260820.json');
const liveRoot = path.join(root, 'assets/episodes/ep-04/pixel');
const failures = [];

function sha256(filename) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filename));
  return hash.digest('hex');
}

function readJson(filename, label) {
  try { return JSON.parse(fs.readFileSync(filename, 'utf8')); }
  catch (error) { failures.push(`${label}: ${error.message}`); return null; }
}

const cutDecisions = fs.existsSync(cutDecisionPath) ? fs.readFileSync(cutDecisionPath, 'utf8') : '';
const bannedBlock = cutDecisions.match(/```banned\n([\s\S]*?)```/);
if (!bannedBlock) failures.push('missing machine-readable BANNED-IN-CUT block');
const bannedKeys = bannedBlock ? bannedBlock[1].trim().split(/\r?\n/).filter(Boolean) : [];
const registry = readJson(registryPath, 'active asset registry');
const manifest = readJson(manifestPath, 'quarantine manifest');
const allManifest = fs.existsSync(allManifestPath) ? readJson(allManifestPath, 'all-episode quarantine manifest') : null;
const denylist = fs.existsSync(denylistPath) ? readJson(denylistPath, 'all-episode denylist') : null;
const sourceManifest = fs.existsSync(sourceManifestPath) ? readJson(sourceManifestPath, 'source-checkout quarantine manifest') : null;

if (fs.existsSync(liveRoot)) {
  for (const name of fs.readdirSync(liveRoot)) {
    if (bannedKeys.some((key) => name.includes(key))) failures.push(`banned media remains in live source folder: assets/episodes/ep-04/pixel/${name}`);
  }
}

const retired = new Set(registry?.retired_paths || []);
const active = new Set((registry?.entries || []).filter((entry) => entry.status === 'ACTIVE').map((entry) => entry.path));
for (const item of manifest?.items || []) {
  const quarantined = path.join(root, item.quarantine_path);
  if (!fs.existsSync(quarantined)) failures.push(`quarantined item missing: ${item.quarantine_path}`);
  else if (sha256(quarantined) !== item.sha256) failures.push(`quarantined item hash drift: ${item.quarantine_path}`);
  if (fs.existsSync(path.join(root, item.original_path))) failures.push(`quarantined item still exists at original path: ${item.original_path}`);
  if (item.kind === 'REJECTED_MEDIA' && !retired.has(item.original_path)) failures.push(`rejected media missing retired-path denial: ${item.original_path}`);
  if (active.has(item.original_path)) failures.push(`rejected media is simultaneously ACTIVE: ${item.original_path}`);
}

for (const item of allManifest?.records || []) {
  const relativeDestination = item.kind === 'STALE_SELECTION_SOURCE'
    ? path.join('_stale-selection-sources', item.original_path) : item.original_path;
  const quarantined = path.join(root, 'assets/rejected/episode-media-all-20260820', relativeDestination);
  if (!fs.existsSync(quarantined)) failures.push(`all-episode quarantined item missing: ${relativeDestination}`);
  else if (sha256(quarantined) !== item.sha256) failures.push(`all-episode quarantined item hash drift: ${relativeDestination}`);
  if (fs.existsSync(path.join(root, item.original_path))) failures.push(`all-episode item still exists at original path: ${item.original_path}`);
  if (item.kind === 'REJECTED_OR_SUPERSEDED_MEDIA' && !retired.has(item.original_path)) failures.push(`all-episode media missing retired-path denial: ${item.original_path}`);
  if (active.has(item.original_path)) failures.push(`all-episode rejected media is simultaneously ACTIVE: ${item.original_path}`);
}
for (const item of sourceManifest?.records || []) {
  if (item.kind === 'REJECTED_OR_SUPERSEDED_MEDIA' && !retired.has(item.original_path)) failures.push(`source-checkout media missing retired-path denial: ${item.original_path}`);
  if (active.has(item.original_path)) failures.push(`source-checkout rejected media is simultaneously ACTIVE: ${item.original_path}`);
}

function directoryHasFiles(absolute) {
  if (!fs.existsSync(absolute)) return false;
  return fs.readdirSync(absolute, { withFileTypes: true }).some((entry) => entry.isFile() || directoryHasFiles(path.join(absolute, entry.name)));
}
for (const relative of [...(denylist?.exact_paths || []), ...(denylist?.stale_selection_sources || [])]) {
  const absolute = path.join(root, relative);
  if (fs.existsSync(absolute) && (fs.statSync(absolute).isFile() || directoryHasFiles(absolute))) failures.push(`denylisted live path remains: ${relative}`);
}
for (const relative of denylist?.explicit_directories || []) {
  if (directoryHasFiles(path.join(root, relative))) failures.push(`denylisted live directory still contains files: ${relative}`);
}

const cueRoot = path.join(root, 'content/episodes');
const currentCuePaths = fs.existsSync(cueRoot)
  ? fs.readdirSync(cueRoot).filter((name) => /^episode-.*-cues\.json$/.test(name)).map((name) => path.join(cueRoot, name))
  : [];
const productionFiles = [
  ...fs.existsSync(path.join(root, 'scripts')) ? fs.readdirSync(path.join(root, 'scripts')).filter((name) => /\.(?:mjs|js|py)$/.test(name)).map((name) => path.join(root, 'scripts', name)) : [],
  ...currentCuePaths,
].filter((filename) => fs.existsSync(filename));
const rejectedProductionPaths = new Set([
  ...(manifest?.items || []).filter((item) => item.kind === 'REJECTED_MEDIA').map((item) => item.original_path),
  ...(allManifest?.records || []).filter((item) => item.kind === 'REJECTED_OR_SUPERSEDED_MEDIA').map((item) => item.original_path),
  ...(sourceManifest?.records || []).filter((item) => item.kind === 'REJECTED_OR_SUPERSEDED_MEDIA').map((item) => item.original_path),
]);
for (const filename of productionFiles) {
  if (['check-rejected-episode-media.mjs', 'test-rejected-episode-media.mjs', 'quarantine-all-episode-media.mjs', 'test-quarantine-all-episode-media.mjs'].includes(path.basename(filename))) continue;
  const source = fs.readFileSync(filename, 'utf8');
  for (const key of bannedKeys) {
    if (source.includes(key)) failures.push(`production source still selects or embeds banned key ${key}: ${path.relative(root, filename)}`);
  }
  for (const rejectedPath of rejectedProductionPaths) {
    if (source.includes(rejectedPath) || source.includes(`/${rejectedPath}`)) failures.push(`production source still selects rejected media ${rejectedPath}: ${path.relative(root, filename)}`);
  }
}

if (manifest?.schema !== 'laidies.episode-media-quarantine.v1') failures.push('quarantine manifest schema mismatch');
if ((manifest?.rejected_media_count || 0) < 1) failures.push('quarantine manifest contains no rejected media');
if (allManifest && allManifest.schema !== 'laidies.episode-media-quarantine.v2') failures.push('all-episode quarantine manifest schema mismatch');
if (sourceManifest && sourceManifest.schema !== 'laidies.episode-media-quarantine.v2') failures.push('source-checkout quarantine manifest schema mismatch');

if (failures.length) {
  console.error('REJECTED EPISODE MEDIA CHECK FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`REJECTED EPISODE MEDIA CHECK PASS ep04=${manifest.rejected_media_count} branch_all_episode=${allManifest?.totals?.media || 0} source_checkout=${sourceManifest?.totals?.media || 0} stale_selectors=${(manifest.stale_selection_source_count || 0) + (allManifest?.totals?.stale_selection_sources || 0)} live_banned=0 active_conflicts=0 hashes=verified`);
