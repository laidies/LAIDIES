#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { compactNewsstandEditorialInput, resolveNewsstandEditorialPacket } from './compact-newsstand-editorial-input.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inputPath = path.join(ROOT, 'operations/product-stewards/newsstand/candidates/us-doj-openai-copyright-2026-09-05/editorial-input-before-compaction.json');
const original = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const compacted = compactNewsstandEditorialInput(original);
const beforeLength = Buffer.byteLength(JSON.stringify(original));
const afterLength = Buffer.byteLength(JSON.stringify(compacted));

assert.deepEqual(compacted.completeArtifact, original.completeArtifact);
assert.deepEqual(compacted.paragraphs, original.paragraphs);
assert.deepEqual(compacted.readerJob, original.readerJob);
assert.deepEqual(compacted.communicationAuthority, original.communicationAuthority);
assert.deepEqual(compacted.sources, original.sources);
assert.ok(afterLength < beforeLength * 0.75, 'the preserved complete packet should compact materially');
for (const claim of compacted.claims) {
  assert.equal(Object.hasOwn(claim, 'sourceEvidence'), false);
  assert.ok(Array.isArray(claim.sourceIds) && claim.sourceIds.length);
}
for (let index = 0; index < original.claims.length; index += 1) {
  const originalClaim = original.claims[index];
  const compactedClaim = compacted.claims[index];
  assert.equal(compactedClaim.claimId, originalClaim.claimId);
  assert.deepEqual(compactedClaim.candidateEvidence, originalClaim.candidateEvidence);
  assert.equal(compactedClaim.scopeAndFreshness, originalClaim.scopeAndFreshness);
}
assert.deepEqual(compactNewsstandEditorialInput(compacted), compacted);
assert.deepEqual(resolveNewsstandEditorialPacket(original), compacted, 'new requests compact automatically');
assert.deepEqual(resolveNewsstandEditorialPacket(original, original), original, 'old actual requests replay unchanged');
assert.deepEqual(resolveNewsstandEditorialPacket(original, compacted), compacted, 'new actual requests replay unchanged');
const changedProse = structuredClone(original);
changedProse.completeArtifact += ' changed';
assert.throws(() => resolveNewsstandEditorialPacket(changedProse, original), /Saved editorial packet differs/);
assert.throws(() => resolveNewsstandEditorialPacket(changedProse, compacted), /Saved editorial packet differs/);

const alteredExcerpt = structuredClone(original);
alteredExcerpt.claims[0].sourceEvidence[0].excerpt += ' changed';
assert.throws(() => compactNewsstandEditorialInput(alteredExcerpt), /Unmatched source evidence/);
assert.throws(() => resolveNewsstandEditorialPacket(alteredExcerpt, compacted), /Unmatched source evidence/);

const missingSource = structuredClone(original);
missingSource.sources = missingSource.sources.filter((source) => source.id !== 'DOJ-FILING');
assert.throws(() => compactNewsstandEditorialInput(missingSource), /Unmatched source evidence/);

const alteredLocator = structuredClone(original);
alteredLocator.claims[0].sourceEvidence[0].locator += '#altered';
assert.throws(() => compactNewsstandEditorialInput(alteredLocator), /Unmatched source evidence/);

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'newsstand-compact-'));
try {
  fs.mkdirSync(path.join(tempRoot, 'scripts'), { recursive: true });
  fs.mkdirSync(path.join(tempRoot, 'operations/product-stewards/newsstand/candidates/fixture'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'scripts/compact-newsstand-editorial-input.mjs'), path.join(tempRoot, 'scripts/compact-newsstand-editorial-input.mjs'));
  const fixtureInput = 'operations/product-stewards/newsstand/candidates/fixture/editorial-input.json';
  const fixtureOutput = 'operations/product-stewards/newsstand/candidates/fixture/editorial-input-compacted.json';
  fs.writeFileSync(path.join(tempRoot, fixtureInput), JSON.stringify(original));
  execFileSync(process.execPath, ['scripts/compact-newsstand-editorial-input.mjs', fixtureInput, fixtureOutput], { cwd: tempRoot });
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(tempRoot, fixtureOutput), 'utf8')), compacted);
  assert.throws(
    () => execFileSync(process.execPath, ['scripts/compact-newsstand-editorial-input.mjs', fixtureInput, fixtureOutput], { cwd: tempRoot, stdio: 'pipe' }),
    /Refusing to overwrite existing output/
  );
  assert.throws(
    () => execFileSync(process.execPath, ['scripts/compact-newsstand-editorial-input.mjs', fixtureInput, fixtureInput], { cwd: tempRoot, stdio: 'pipe' }),
    /Input and output paths must be distinct/
  );
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log('NEWSSTAND EDITORIAL INPUT COMPACTION PASS before_serialized_bytes=' + beforeLength + ' after_serialized_bytes=' + afterLength + ' claims=' + original.claims.length);
