#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const evidence = 'operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03';
const manifestPath = `${evidence}/runtime-family-manifest.v1.json`;
const inventoryPath = `${evidence}/public-asset-inventory.json`;
const inventoryScript = `${evidence}/inventory-public-assets.mjs`;
const builderPath = 'scripts/build-public-site.mjs';
const registryPath = 'operations/assets/active-asset-registry.json';
const read = (relative) => fs.readFileSync(path.join(root, relative));
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(read(manifestPath));
const inventory = JSON.parse(read(inventoryPath));
const registry = JSON.parse(read(registryPath));

assert.equal(manifest.schema, 'laidies.public-runtime-families.v1');
assert.equal(manifest.default_policy, 'DENY');
assert.deepEqual(manifest.families.map((family) => [family.id, family.members.length]), [
  ['library-bright-family-v2', 14],
  ['mme-claio-reading-cards', 96],
  ['ksvl-stickers', 20],
  ['puffy-catalogue', 75],
  ['resident-card-charms', 28],
  ['postcard-picker', 11],
]);

const members = manifest.families.flatMap((family) => family.members);
const memberPaths = new Set();
for (const member of members) {
  assert(!memberPaths.has(member.path), `duplicate member ${member.path}`);
  memberPaths.add(member.path);
  assert.match(member.sha256, /^[a-f0-9]{64}$/);
  assert.equal(sha256(read(member.path)), member.sha256, `member hash ${member.path}`);
  for (const field of ['consumer', 'job', 'source_reason', 'authority_owner']) assert.equal(typeof member[field], 'string', `${member.path} ${field}`);
}
assert.equal(memberPaths.size, 244);
assert(!memberPaths.has('assets/library-101/bright-family-v2/textbook-vocab-101.png'), 'unlisted Vocab cover re-entered the runtime family');

const exclusionPaths = new Set();
for (const exclusion of manifest.exclusions) {
  assert(!exclusionPaths.has(exclusion.path), `duplicate exclusion ${exclusion.path}`);
  exclusionPaths.add(exclusion.path);
  assert(!memberPaths.has(exclusion.path), `member excluded ${exclusion.path}`);
  assert.equal(sha256(read(exclusion.path)), exclusion.sha256, `exclusion hash ${exclusion.path}`);
  assert(exclusion.reasons.length > 0, `exclusion reason ${exclusion.path}`);
}
assert.equal(exclusionPaths.size, 262);

const semanticNonAdmit = manifest.exclusions.filter((entry) => entry.reasons.some((reason) => /^CURATION_(?:REDO|UNUSED|RETIRED|REJECTED)$/.test(reason)));
assert.equal(semanticNonAdmit.length, 93);
assert.equal(manifest.exclusions.filter((entry) => entry.reasons.includes('CANDIDATE_RETIRED_OR_REJECTED_PATH')).length, 21);
assert.equal(manifest.exclusions.filter((entry) => entry.reasons.includes('REGISTRY_RETIRED')).length, 1);

assert(inventory.summary.binary_assets <= 624, `binary set regressed above accepted narrowing baseline: ${inventory.summary.binary_assets}`);
assert.equal(inventory.summary.builder_blocked_paths, 0);
assert.equal(inventory.summary.restricted_source_assets, 0);
assert.equal(inventory.summary.semantic_non_admit_assets, 0);
assert.equal(inventory.summary.missing_dependencies, 0);
assert(inventory.summary.prohibited_source_references <= 173, `prohibited references regressed above accepted narrowing baseline: ${inventory.summary.prohibited_source_references}`);
assert(new Set(inventory.prohibited_source_references.map((entry) => entry.path)).size <= 118, 'unique prohibited paths regressed above accepted narrowing baseline');
assert.equal(inventory.inputs.runtime_families.members, 244);
assert.equal(inventory.inputs.runtime_families.exclusions, 262);
for (const asset of inventory.assets) assert(!exclusionPaths.has(asset.path), `excluded asset reachable ${asset.path}`);

const builderSource = read(builderPath).toString();
assert(builderSource.includes("compileActiveAssetRegistry"), 'active-asset admission removed');
assert(builderSource.includes("assertActiveAsset"), 'default-deny asset assertion removed');
assert(builderSource.includes("laidies.public-runtime-families.v1"), 'runtime manifest validator missing');
assert(!builderSource.includes('enqueueTree('), 'recursive runtime-family copying remains');
assert.equal(registry.schema, 'laidies.active-assets.v1');
assert.equal(registry.default_policy, 'DENY');

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-asset-source-narrowing-'));
try {
  const replayPath = path.join(temp, 'inventory.json');
  const replay = spawnSync(process.execPath, [inventoryScript, replayPath], { cwd: root, encoding: 'utf8' });
  assert.equal(replay.status, 0, 'source inventory should pass after prohibited references are removed');
  assert.match(replay.stdout, /PUBLIC ASSET INVENTORY PASS/);
  assert.deepEqual(fs.readFileSync(replayPath), read(inventoryPath), 'inventory rerun is not deterministic');

  const buildOutput = path.join(temp, 'public');
  const build = spawnSync(process.execPath, [builderPath, buildOutput], { cwd: root, encoding: 'utf8' });
  assert.equal(build.status, 0, `clean builder unexpectedly failed:\n${build.stdout}${build.stderr}`);
  assert.match(build.stdout, /Public artifact:/);

  const calibrationAsset = 'assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png';
  assert(registry.entries.some((entry) => entry.status === 'ACTIVE' && entry.path === calibrationAsset), 'calibration asset is not ACTIVE');
  const calibrationRegistry = {
    ...registry,
    entries: registry.entries.filter((entry) => entry.path !== calibrationAsset),
  };
  const calibrationRegistryPath = path.join(temp, 'active-asset-registry-calibration.json');
  fs.writeFileSync(calibrationRegistryPath, `${JSON.stringify(calibrationRegistry, null, 2)}\n`);
  const calibrationOutput = path.join(temp, 'public-calibration');
  const calibrationBuild = spawnSync(process.execPath, [builderPath, calibrationOutput], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, LAIDIES_ASSET_REGISTRY_PATH: calibrationRegistryPath },
  });
  assert.equal(calibrationBuild.status, 1, 'builder calibration must fail when a reachable ACTIVE asset is removed');
  assert.match(calibrationBuild.stderr, new RegExp(`public asset is not registered ACTIVE: ${calibrationAsset.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}`));
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

console.log(`PUBLIC ASSET SOURCE NARROWING PASS binary=${inventory.summary.binary_assets} families=${manifest.families.length} members=${members.length} exclusions=${manifest.exclusions.length} prohibited_references=0 missing=0 clean_build=true builder_default_deny_calibrated=true`);
