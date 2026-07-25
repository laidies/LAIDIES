import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateManifest } from '../../../../scripts/validate-episode-media-pilot.mjs';

const fixtures = resolve(import.meta.dirname, 'fixtures');
const load = (name) => JSON.parse(readFileSync(resolve(fixtures, name), 'utf8'));

const valid = validateManifest(load('valid-manifest.json'), resolve(fixtures, 'valid-manifest.json'));
assert.equal(valid.valid, true, JSON.stringify(valid.errors, null, 2));

const invalid = validateManifest(load('invalid-manifest.json'), resolve(fixtures, 'invalid-manifest.json'));
assert.equal(invalid.valid, false, 'The deliberately incomplete fixture must fail closed.');
const codes = new Set(invalid.errors.map(({ code }) => code));
for (const code of [
  'MISSING_CANDIDATE_CHECKSUM', 'MISSING_ASSET_REGISTRY', 'CAPTIONS_NOT_BOUND_TO_AUDIO',
  'REJECTED_ASSET_CHECK_FAIL', 'AUTOMATED_RESULT_MISSING_OR_FAIL',
  'MAKER_JUDGE_ROLE_CONFLICT', 'MISSING_SEMANTIC_MOTION_EVENT',
  'MISSING_APPROVED_REFERENCE_BINDING', 'ALI_VISUAL_RULING_MISSING_OR_UNBOUND',
]) assert.ok(codes.has(code), `Expected ${code}; got ${[...codes].join(', ')}`);

const traversal = load('valid-manifest.json');
traversal.assets[0].path = '../../../../../../etc/passwd';
const traversalResult = validateManifest(traversal, resolve(fixtures, 'valid-manifest.json'));
assert.equal(traversalResult.valid, false, 'Traversal outside artifactRoot must fail.');
assert.ok(traversalResult.errors.some(({ code }) => code === 'UNSAFE_ASSET_PATH'));

console.log('episode-media pilot validator fixtures: PASS');
