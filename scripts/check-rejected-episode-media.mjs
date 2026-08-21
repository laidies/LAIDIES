#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const argIndex = process.argv.indexOf('--root');
const root = argIndex >= 0 ? path.resolve(process.argv[argIndex + 1]) : path.resolve(import.meta.dirname, '..');
const cutDecisionPath = path.join(root, 'operations/ep04-cut-decisions.md');
const registryPath = path.join(root, 'operations/assets/active-asset-registry.json');
const manifestPath = path.join(root, 'operations/quarantine/episode-media-20260820.json');
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

const currentCuePath = path.join(root, 'content/episodes/episode-04-cues.json');
const productionFiles = [
  ...fs.existsSync(path.join(root, 'scripts')) ? fs.readdirSync(path.join(root, 'scripts')).filter((name) => /\.(?:mjs|js|py)$/.test(name)).map((name) => path.join(root, 'scripts', name)) : [],
  currentCuePath,
].filter((filename) => fs.existsSync(filename));
for (const filename of productionFiles) {
  if (path.basename(filename) === 'check-rejected-episode-media.mjs' || path.basename(filename) === 'test-rejected-episode-media.mjs') continue;
  const source = fs.readFileSync(filename, 'utf8');
  for (const key of bannedKeys) {
    if (source.includes(key)) failures.push(`production source still selects or embeds banned key ${key}: ${path.relative(root, filename)}`);
  }
}

if (manifest?.schema !== 'laidies.episode-media-quarantine.v1') failures.push('quarantine manifest schema mismatch');
if ((manifest?.rejected_media_count || 0) < 1) failures.push('quarantine manifest contains no rejected media');

if (failures.length) {
  console.error('REJECTED EPISODE MEDIA CHECK FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`REJECTED EPISODE MEDIA CHECK PASS quarantined=${manifest.rejected_media_count} stale_selectors=${manifest.stale_selection_source_count} live_banned=0 active_conflicts=0 hashes=verified`);
