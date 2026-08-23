#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const [baseManifestPath, candidateManifestPath, scopePath, receiptPath] = process.argv.slice(2);
if (!baseManifestPath || !candidateManifestPath || !scopePath) {
  throw new Error('Usage: node scripts/check-sunday-release-scope.mjs <base-manifest.json> <candidate-manifest.json> <scope.json> [receipt.json]');
}

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const SHA = /^[a-f0-9]{64}$/;
const normalized = value => {
  if (typeof value !== 'string' || !value || value.startsWith('/') || value.includes('\\')) {
    throw new Error(`invalid artifact path: ${value}`);
  }
  const result = path.posix.normalize(value);
  if (result !== value || result === '..' || result.startsWith('../')) throw new Error(`unsafe artifact path: ${value}`);
  return result;
};

function toMap(manifest, label) {
  if (manifest?.schema !== 'laidies-release-artifact-manifest/v1' || !Array.isArray(manifest.files) || !manifest.files.length) {
    throw new Error(`${label} artifact manifest is invalid`);
  }
  const records = new Map();
  const ordered = [];
  for (const record of manifest.files) {
    const artifactPath = normalized(record?.path);
    if (records.has(artifactPath)) throw new Error(`${label} artifact repeats ${artifactPath}`);
    if (!SHA.test(record?.sha256 || '') || !Number.isInteger(record?.bytes) || record.bytes < 0) {
      throw new Error(`${label} artifact has an invalid record for ${artifactPath}`);
    }
    const normalizedRecord = { path: artifactPath, sha256: record.sha256, bytes: record.bytes };
    records.set(artifactPath, normalizedRecord);
    ordered.push(normalizedRecord);
  }
  const identity = sha256(ordered.map(record => `${record.sha256}  ${record.path}\n`).join(''));
  if (manifest.fileCount !== ordered.length || manifest.totalBytes !== ordered.reduce((sum, record) => sum + record.bytes, 0) || manifest.identitySha256 !== identity) {
    throw new Error(`${label} artifact identity is not derived from its exact file records`);
  }
  return records;
}

const base = readJson(baseManifestPath);
const candidate = readJson(candidateManifestPath);
const scope = readJson(scopePath);
const baseFiles = toMap(base, 'base');
const candidateFiles = toMap(candidate, 'candidate');

if (scope?.schema !== 'laidies.sunday-production-scope.v1' || scope.project !== 'laidies-sunnyvaile' || scope.productionBranch !== 'homepage-redesign') {
  throw new Error('invalid Sunday production scope');
}
if (!/^[a-f0-9]{40}$/.test(scope.baseCommit || '') ||
    (process.env.BASE_COMMIT && scope.baseCommit !== process.env.BASE_COMMIT) ||
    scope.baseArtifactIdentitySha256 !== base.identitySha256 ||
    scope.candidateArtifactIdentitySha256 !== candidate.identitySha256) {
  throw new Error('Sunday scope is not bound to the exact base commit and candidate artifacts');
}
if (!Array.isArray(scope.allowedChanges) || !scope.allowedChanges.length || !Array.isArray(scope.preservedPaths) || !Array.isArray(scope.verificationPaths) || !Array.isArray(scope.removedPaths)) {
  throw new Error('Sunday scope is incomplete');
}

const allowed = new Map();
for (const row of scope.allowedChanges) {
  const artifactPath = normalized(row?.path);
  if (allowed.has(artifactPath) || !['ADD', 'MODIFY', 'REMOVE'].includes(row?.operation) ||
      (row.operation === 'ADD' && artifactPath !== '_worker.js')) {
    throw new Error(`invalid or duplicate allowed change: ${artifactPath}`);
  }
  const validHashes = row.operation === 'ADD'
    ? row.baseSha256 === null && SHA.test(row?.candidateSha256 || '')
    : row.operation === 'MODIFY'
      ? SHA.test(row?.baseSha256 || '') && SHA.test(row?.candidateSha256 || '')
      : SHA.test(row?.baseSha256 || '') && row.candidateSha256 === null;
  if (!validHashes) {
    throw new Error(`invalid hash binding for allowed change: ${artifactPath}`);
  }
  allowed.set(artifactPath, row);
}

const actualChanges = [];
for (const artifactPath of [...new Set([...baseFiles.keys(), ...candidateFiles.keys()])].sort()) {
  const before = baseFiles.get(artifactPath) || null;
  const after = candidateFiles.get(artifactPath) || null;
  if (before?.sha256 === after?.sha256 && before?.bytes === after?.bytes) continue;
  const operation = !before ? 'ADD' : !after ? 'REMOVE' : 'MODIFY';
  actualChanges.push({ path: artifactPath, operation, baseSha256: before?.sha256 || null, candidateSha256: after?.sha256 || null });
}
if (!actualChanges.length) throw new Error('Sunday candidate has no public changes');
if (actualChanges.length !== allowed.size) throw new Error('Sunday candidate change count does not match the exact scope');
for (const change of actualChanges) {
  const expected = allowed.get(change.path);
  if (!expected || expected.operation !== change.operation || expected.baseSha256 !== change.baseSha256 || expected.candidateSha256 !== change.candidateSha256) {
    throw new Error(`Sunday candidate has an unbound public change: ${change.path}`);
  }
}

const removed = new Set(scope.removedPaths.map(normalized));
const expectedRemoved = new Set(actualChanges.filter(change => change.operation === 'REMOVE').map(change => change.path));
if (removed.size !== scope.removedPaths.length || removed.size !== expectedRemoved.size || [...removed].some(item => !expectedRemoved.has(item))) {
  throw new Error('Sunday removed-path verification set does not match the exact removals');
}
for (const row of scope.preservedPaths) {
  const artifactPath = normalized(row?.path);
  if (!SHA.test(row?.sha256 || '') || baseFiles.get(artifactPath)?.sha256 !== row.sha256 || candidateFiles.get(artifactPath)?.sha256 !== row.sha256) {
    throw new Error(`preserved production path drifted: ${artifactPath}`);
  }
}
for (const item of scope.verificationPaths) {
  const artifactPath = normalized(item);
  if (!candidateFiles.has(artifactPath) || removed.has(artifactPath)) throw new Error(`candidate verification path is unavailable: ${artifactPath}`);
}

const receipt = {
  schema: 'laidies.sunday-release-scope-receipt.v1',
  result: 'PASS',
  baseCommit: scope.baseCommit,
  baseIdentitySha256: base.identitySha256,
  candidateIdentitySha256: candidate.identitySha256,
  changes: actualChanges,
  preservedPaths: scope.preservedPaths,
  verificationPaths: scope.verificationPaths,
  removedPaths: [...removed].sort(),
};
if (receiptPath) {
  fs.mkdirSync(path.dirname(path.resolve(receiptPath)), { recursive: true });
  fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
}
console.log(`SUNDAY RELEASE SCOPE: PASS · ${actualChanges.length} exact public changes · ${removed.size} removals · ${scope.preservedPaths.length} production paths preserved`);
