#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const checker = path.resolve(import.meta.dirname, 'check-rejected-episode-media.mjs');

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-rejected-media-'));
  fs.mkdirSync(path.join(root, 'operations/assets'), { recursive: true });
  fs.mkdirSync(path.join(root, 'operations/quarantine'), { recursive: true });
  fs.mkdirSync(path.join(root, 'assets/episodes/ep-04/pixel'), { recursive: true });
  fs.mkdirSync(path.join(root, 'assets/rejected'), { recursive: true });
  fs.mkdirSync(path.join(root, 'assets/rejected/episode-media-all-20260820/assets/episodes/ep-02'), { recursive: true });
  fs.mkdirSync(path.join(root, 'content/episodes'), { recursive: true });
  fs.mkdirSync(path.join(root, 'scripts'), { recursive: true });
  const bytes = Buffer.from('rejected');
  fs.writeFileSync(path.join(root, 'assets/rejected/item.png'), bytes);
  fs.writeFileSync(path.join(root, 'assets/rejected/episode-media-all-20260820/assets/episodes/ep-02/bad-global.png'), bytes);
  fs.writeFileSync(path.join(root, 'operations/ep04-cut-decisions.md'), '```banned\nbad-frame\n```\n');
  fs.writeFileSync(path.join(root, 'operations/assets/active-asset-registry.json'), JSON.stringify({ entries: [], retired_paths: ['assets/episodes/ep-04/pixel/bad-frame.png'] }));
  fs.writeFileSync(path.join(root, 'operations/quarantine/episode-media-denylist-20260820.json'), JSON.stringify({ exact_paths: ['assets/episodes/ep-02/bad-global.png'], explicit_directories: [], stale_selection_sources: [] }));
  fs.writeFileSync(path.join(root, 'content/episodes/episode-04-cues.json'), '{}\n');
  fs.writeFileSync(path.join(root, 'operations/quarantine/episode-media-20260820.json'), JSON.stringify({
    schema: 'laidies.episode-media-quarantine.v1',
    rejected_media_count: 1,
    stale_selection_source_count: 0,
    items: [{ kind: 'REJECTED_MEDIA', original_path: 'assets/episodes/ep-04/pixel/bad-frame.png', quarantine_path: 'assets/rejected/item.png', sha256: sha256(bytes), bytes: bytes.length }],
  }));
  const allManifest = { schema: 'laidies.episode-media-quarantine.v2', records: [{ kind: 'REJECTED_OR_SUPERSEDED_MEDIA', original_path: 'assets/episodes/ep-02/bad-global.png', sha256: sha256(bytes), bytes: bytes.length }], totals: { media: 1, stale_selection_sources: 0 } };
  fs.writeFileSync(path.join(root, 'assets/rejected/episode-media-all-20260820/manifest.json'), JSON.stringify(allManifest));
  const registryPath = path.join(root, 'operations/assets/active-asset-registry.json');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  registry.retired_paths.push('assets/episodes/ep-02/bad-global.png');
  fs.writeFileSync(registryPath, JSON.stringify(registry));
  return root;
}

function run(root) {
  return spawnSync(process.execPath, [checker, '--root', root], { encoding: 'utf8' });
}

const validRoot = fixture();
assert.equal(run(validRoot).status, 0, 'valid quarantine must pass');

const liveRoot = fixture();
fs.writeFileSync(path.join(liveRoot, 'assets/episodes/ep-04/pixel/bad-frame.png'), 'returned');
assert.notEqual(run(liveRoot).status, 0, 'returned banned media must fail');

const activeRoot = fixture();
fs.writeFileSync(path.join(activeRoot, 'operations/assets/active-asset-registry.json'), JSON.stringify({ entries: [{ status: 'ACTIVE', path: 'assets/episodes/ep-04/pixel/bad-frame.png' }], retired_paths: ['assets/episodes/ep-04/pixel/bad-frame.png'] }));
assert.notEqual(run(activeRoot).status, 0, 'ACTIVE and rejected conflict must fail');

const tamperRoot = fixture();
fs.writeFileSync(path.join(tamperRoot, 'assets/rejected/item.png'), 'tampered');
assert.notEqual(run(tamperRoot).status, 0, 'quarantine hash drift must fail');

const sourceRoot = fixture();
fs.writeFileSync(path.join(sourceRoot, 'scripts/current-builder.py'), 'SOURCE = "bad-frame.png"\n');
assert.notEqual(run(sourceRoot).status, 0, 'current production source containing banned key must fail');

const allEpisodeReturn = fixture();
fs.mkdirSync(path.join(allEpisodeReturn, 'assets/episodes/ep-02'), { recursive: true });
fs.writeFileSync(path.join(allEpisodeReturn, 'assets/episodes/ep-02/bad-global.png'), 'returned');
assert.notEqual(run(allEpisodeReturn).status, 0, 'returned all-episode media must fail');

console.log('REJECTED EPISODE MEDIA CALIBRATION PASS valid=1 live_return=failed active_conflict=failed hash_tamper=failed production_reintroduction=failed all_episode_return=failed');
