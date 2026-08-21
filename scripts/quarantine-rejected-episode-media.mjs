#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const apply = process.argv.includes('--apply');
const cutDecisionPath = path.join(root, 'operations/ep04-cut-decisions.md');
const registryPath = path.join(root, 'operations/assets/active-asset-registry.json');
const liveRoot = path.join(root, 'assets/episodes/ep-04/pixel');
const mediaDestinationRoot = path.join(root, 'assets/rejected/episode-media-20260820/ep-04-pixel');
const sourceDestinationRoot = path.join(root, 'operations/archive/rejected-media-selection-20260820');
const manifestPath = path.join(root, 'operations/quarantine/episode-media-20260820.json');
const mediaPattern = /\.(?:png|jpe?g|webp|gif|mp4|mov)$/i;

const fixedSelectionSources = [
  '_cut-review.html',
  '_ep04-article-image-picker.html',
  '_ep123-remaining.html',
  '_ep123-swap-picker.html',
  '_ep4-all-images.html',
  '_grace-full-scene.html',
  'assets/episodes/ep-01/pixel/delivery-20260719-master-v1/_ep01-REJECTED.html',
  'assets/episodes/ep-02/comic/_ep02-REJECTED.html',
  'assets/episodes/ep-03/comic/_ep03-REJECTED.html',
  'assets/episodes/ep-04/pixel/.build_grace_narration_v3.py',
  'assets/episodes/ep-04/pixel/_ep04-contact-sheet.html',
  'assets/episodes/ep-04/pixel/_ep04-transformation-sheet.html',
  'assets/video/build-episode-04-full-v2-motion.py',
  'assets/video/build-episode-04-v4-clean-rebuild.py',
  'operations/codex-prompts/ep04-owed-cards-batch.md',
  'operations/ep04-final-selection-manifest.md',
  'operations/ep04-shot-list.md',
];

function sha256(filename) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filename));
  return hash.digest('hex');
}

function relative(filename) {
  return path.relative(root, filename).split(path.sep).join('/');
}

function moveRecord(original, destination, kind) {
  return {
    kind,
    original_path: relative(original),
    quarantine_path: relative(destination),
    sha256: sha256(original),
    bytes: fs.statSync(original).size,
  };
}

const cutDecisions = fs.readFileSync(cutDecisionPath, 'utf8');
const bannedBlock = cutDecisions.match(/```banned\n([\s\S]*?)```/);
if (!bannedBlock) throw new Error('Missing machine-readable banned block in operations/ep04-cut-decisions.md');
const bannedKeys = bannedBlock[1].trim().split(/\r?\n/).filter(Boolean);

const liveMedia = fs.readdirSync(liveRoot)
  .filter((name) => mediaPattern.test(name) && bannedKeys.some((key) => name.includes(key)))
  .sort();
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const activePaths = new Set((registry.entries || []).filter((entry) => entry.status === 'ACTIVE').map((entry) => entry.path));
for (const name of liveMedia) {
  const candidate = `assets/episodes/ep-04/pixel/${name}`;
  if (activePaths.has(candidate)) throw new Error(`Refusing to quarantine ACTIVE asset: ${candidate}`);
}

const preCueFiles = fs.readdirSync(path.join(root, 'content/episodes'))
  .filter((name) => /^episode-04-cues\.pre-.*\.json$/.test(name))
  .map((name) => `content/episodes/${name}`);
const selectionSources = [...fixedSelectionSources, ...preCueFiles]
  .filter((filename) => fs.existsSync(path.join(root, filename)))
  .sort();

const mediaRecords = liveMedia.map((name) => {
  const original = path.join(liveRoot, name);
  const destination = path.join(mediaDestinationRoot, name);
  return moveRecord(original, destination, 'REJECTED_MEDIA');
});
const sourceRecords = selectionSources.map((filename) => {
  const original = path.join(root, filename);
  const destination = path.join(sourceDestinationRoot, filename);
  return moveRecord(original, destination, 'STALE_SELECTION_SOURCE');
});
const records = [...mediaRecords, ...sourceRecords];

if (!apply) {
  console.log(`DRY RUN rejected_media=${mediaRecords.length} stale_selection_sources=${sourceRecords.length} bytes=${mediaRecords.reduce((sum, row) => sum + row.bytes, 0)}`);
  for (const row of records) console.log(`${row.kind}\t${row.original_path}\t${row.quarantine_path}`);
  process.exit(0);
}

if (fs.existsSync(manifestPath)) throw new Error(`Manifest already exists: ${relative(manifestPath)}`);
for (const row of records) {
  const original = path.join(root, row.original_path);
  const destination = path.join(root, row.quarantine_path);
  if (fs.existsSync(destination)) throw new Error(`Destination already exists: ${row.quarantine_path}`);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.renameSync(original, destination);
}

registry.retired_paths = [...new Set([
  ...(registry.retired_paths || []),
  ...mediaRecords.map((row) => row.original_path),
])].sort();
fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);

const manifest = {
  schema: 'laidies.episode-media-quarantine.v1',
  status: 'QUARANTINED_LOCAL_RECOVERABLE',
  created_at: '2026-08-20',
  authority: {
    path: 'operations/ep04-cut-decisions.md',
    block: 'BANNED-IN-CUT',
    rule: 'Only exact machine-readable banned keys were applied. Version-like filenames alone were not enough.',
  },
  recovery: 'Move quarantine_path back to original_path only after removing its banned disposition and adding a current checksum-bound admission.',
  rejected_media_count: mediaRecords.length,
  rejected_media_bytes: mediaRecords.reduce((sum, row) => sum + row.bytes, 0),
  stale_selection_source_count: sourceRecords.length,
  items: records,
};
fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`QUARANTINE COMPLETE rejected_media=${mediaRecords.length} stale_selection_sources=${sourceRecords.length} bytes=${manifest.rejected_media_bytes}`);
