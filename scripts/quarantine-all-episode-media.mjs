#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(process.argv[2] || repo);
const destination = path.resolve(process.argv[3] || path.join(repo, 'assets/rejected/episode-media-all-20260820'));
const apply = process.argv.includes('--apply');
const verify = process.argv.includes('--verify');
const importManifest = process.argv.includes('--import-manifest');
const sourceArchive = path.join(destination, '_stale-selection-sources');
if (source === '/' || destination === '/' || source === destination || destination.startsWith(`${source}${path.sep}`) && source !== repo) throw new Error('unsafe source/destination');

if (importManifest) {
  const manifest = JSON.parse(fs.readFileSync(path.join(destination, 'manifest.json'), 'utf8'));
  const importedPath = path.join(repo, 'operations/quarantine/episode-media-source-checkout-20260820.json');
  fs.writeFileSync(importedPath, `${JSON.stringify(manifest, null, 2)}\n`);
  const registryPath = path.join(repo, 'operations/assets/active-asset-registry.json');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  registry.retired_paths = [...new Set([...(registry.retired_paths || []), ...manifest.records.filter((row) => row.kind === 'REJECTED_OR_SUPERSEDED_MEDIA').map((row) => row.original_path)])].sort();
  fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(`ALL EPISODE QUARANTINE MANIFEST IMPORT PASS files=${manifest.totals.files} media=${manifest.totals.media}`);
  process.exit(0);
}

if (verify) {
  const manifestPath = path.join(destination, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const failures = [];
  for (const row of manifest.records || []) {
    const relativeDestination = row.kind === 'STALE_SELECTION_SOURCE' ? path.join('_stale-selection-sources', row.original_path) : row.original_path;
    const quarantined = path.join(destination, relativeDestination);
    if (!fs.existsSync(quarantined)) failures.push(`missing ${relativeDestination}`);
    else {
      const actual = crypto.createHash('sha256').update(fs.readFileSync(quarantined)).digest('hex');
      if (actual !== row.sha256) failures.push(`hash mismatch ${relativeDestination}`);
    }
    if (fs.existsSync(path.join(source, row.original_path)) && fs.statSync(path.join(source, row.original_path)).isFile()) failures.push(`original returned ${row.original_path}`);
  }
  if (failures.length) { console.error(`ALL EPISODE QUARANTINE VERIFY FAIL\n${failures.map((item) => `- ${item}`).join('\n')}`); process.exit(1); }
  console.log(`ALL EPISODE QUARANTINE VERIFY PASS files=${manifest.totals.files} media=${manifest.totals.media} stale=${manifest.totals.stale_selection_sources} bytes=${manifest.totals.bytes}`);
  process.exit(0);
}

const deny = JSON.parse(fs.readFileSync(path.join(repo, 'operations/quarantine/episode-media-denylist-20260820.json'), 'utf8'));
const global = Object.keys(JSON.parse(fs.readFileSync(path.join(repo, 'operations/ops/rejections.json'), 'utf8')).global);
const allowedRoots = ['assets/episodes', 'assets/video'];
const excluded = (relative) => relative.startsWith('assets/rejected/') || relative.startsWith('operations/archive/');
function walk(absolute) {
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  return fs.readdirSync(absolute).flatMap((name) => walk(path.join(absolute, name)));
}
const media = new Set();
for (const relative of deny.exact_paths) if (fs.existsSync(path.join(source, relative))) media.add(relative);
for (const relative of deny.explicit_directories) for (const absolute of walk(path.join(source, relative))) media.add(path.relative(source, absolute));
for (const root of allowedRoots) for (const absolute of walk(path.join(source, root))) {
  const relative = path.relative(source, absolute);
  if (!excluded(relative) && global.includes(path.basename(relative))) media.add(relative);
}
const stale = new Set();
for (const relative of deny.stale_selection_sources) for (const absolute of walk(path.join(source, relative))) stale.add(path.relative(source, absolute));

const activeRegistryPath = path.join(source, 'operations/assets/active-asset-registry.json');
const active = fs.existsSync(activeRegistryPath) ? JSON.parse(fs.readFileSync(activeRegistryPath, 'utf8')).entries.filter((row) => row.status === 'ACTIVE').map((row) => row.path) : [];
const conflicts = [...media].filter((relative) => active.includes(relative));
if (conflicts.length) throw new Error(`ACTIVE conflicts:\n${conflicts.join('\n')}`);

function record(relative, kind) {
  const absolute = path.join(source, relative); const bytes = fs.readFileSync(absolute);
  return { kind, original_path: relative, bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') };
}
const records = [...media].sort().map((relative) => record(relative, 'REJECTED_OR_SUPERSEDED_MEDIA'))
  .concat([...stale].sort().map((relative) => record(relative, 'STALE_SELECTION_SOURCE')));
const manifest = { schema: 'laidies.episode-media-quarantine.v2', created: new Date().toISOString(), source_root: source, destination_root: destination, applied: apply, records, totals: { files: records.length, bytes: records.reduce((n, row) => n + row.bytes, 0), media: media.size, stale_selection_sources: stale.size } };
if (!apply) { console.log(JSON.stringify(manifest, null, 2)); process.exit(0); }
fs.mkdirSync(destination, { recursive: true });
for (const row of records) {
  const from = path.join(source, row.original_path);
  const to = row.kind === 'STALE_SELECTION_SOURCE' ? path.join(sourceArchive, row.original_path) : path.join(destination, row.original_path);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  const copied = crypto.createHash('sha256').update(fs.readFileSync(to)).digest('hex');
  if (copied !== row.sha256) throw new Error(`copy verification failed: ${row.original_path}`);
}
for (const row of records) fs.unlinkSync(path.join(source, row.original_path));
if (source === repo) {
  const registryPath = path.join(repo, 'operations/assets/active-asset-registry.json');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  registry.retired_paths = [...new Set([...(registry.retired_paths || []), ...records.filter((row) => row.kind === 'REJECTED_OR_SUPERSEDED_MEDIA').map((row) => row.original_path)])].sort();
  fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
}
fs.writeFileSync(path.join(destination, 'manifest.json'), `${JSON.stringify({ ...manifest, applied: true }, null, 2)}\n`);
console.log(`ALL EPISODE QUARANTINE COMPLETE files=${records.length} media=${media.size} stale=${stale.size} bytes=${manifest.totals.bytes}`);
