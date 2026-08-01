#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateLineageManifest } from './check-video-assembly-lineage.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'operations/video-qa/assembly-lineage/episode-04-preassembly-lineage-2026-08-01.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const pending = validateLineageManifest(manifest, manifestPath);
assert.equal(pending.valid, true, JSON.stringify(pending.errors));
assert.equal(pending.lineage_status, 'PREASSEMBLY_HOLD');

const successorBase = structuredClone(manifest);
successorBase.state = 'SUCCESSOR_ASSEMBLED_HOLD';
successorBase.successor = {
  path: 'assets/video/non-release-lineage-test-fixture.mp4',
  sha256: '0'.repeat(64),
  included_sequence_sha256: successorBase.prior_sequences
    .filter((item) => item.disposition !== 'SUPERSEDED' && item.disposition !== 'REJECTED')
    .map((item) => item.sha256),
  supersession_receipts: []
};

const complete = validateLineageManifest(successorBase, manifestPath, { verifyFiles: false });
assert.equal(complete.valid, true, JSON.stringify(complete.errors));
assert.equal(complete.lineage_status, 'RECONCILED');

const orphanedAda = structuredClone(successorBase);
const recoveredAda = orphanedAda.prior_sequences.find((item) => item.sequence_id === 'episode-04-p18-p20-ada-recovered-v4');
orphanedAda.successor.included_sequence_sha256 = orphanedAda.successor.included_sequence_sha256
  .filter((hash) => hash !== recoveredAda.sha256);
const rejected = validateLineageManifest(orphanedAda, manifestPath, { verifyFiles: false });
assert.equal(rejected.valid, false);
assert.ok(rejected.errors.some((error) => error.code === 'ORPHANED_SCENE' && error.message.includes(recoveredAda.sha256)));

console.log('VIDEO ASSEMBLY LINEAGE REGRESSION: PASS');
console.log('- real Episode 04 preassembly inventory validates as HOLD');
console.log('- complete simulated successor reconciliation passes');
console.log('- silent omission of recovered Ada sequence fails ORPHANED_SCENE');
