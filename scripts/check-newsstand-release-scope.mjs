#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const [baseManifestPath, candidateManifestPath, scopePath, receiptPath] = process.argv.slice(2);
if (!baseManifestPath || !candidateManifestPath || !scopePath) {
  throw new Error('Usage: node scripts/check-newsstand-release-scope.mjs <base-manifest.json> <candidate-manifest.json> <scope.json> [receipt.json]');
}

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const base = readJson(baseManifestPath);
const candidate = readJson(candidateManifestPath);
const scope = readJson(scopePath);

if (base.schema !== 'laidies-release-artifact-manifest/v1' || candidate.schema !== 'laidies-release-artifact-manifest/v1') {
  throw new Error('both artifacts must use laidies-release-artifact-manifest/v1');
}
if (scope.schema !== 'laidies.newsstand-production-scope.v1' || scope.project !== 'laidies-sunnyvaile') {
  throw new Error('invalid NewsStand production scope');
}
if (!Array.isArray(scope.allowedArtifactPaths) || scope.allowedArtifactPaths.length === 0) {
  throw new Error('NewsStand production scope has no allowed artifact paths');
}

const normalized = value => {
  if (typeof value !== 'string' || !value || value.startsWith('/') || value.includes('\\')) {
    throw new Error(`invalid artifact path: ${value}`);
  }
  const result = path.posix.normalize(value);
  if (result !== value || result === '..' || result.startsWith('../')) throw new Error(`unsafe artifact path: ${value}`);
  return result;
};

const allowed = new Set(scope.allowedArtifactPaths.map(normalized));
if (allowed.size !== scope.allowedArtifactPaths.length) throw new Error('duplicate allowed artifact path');

const toMap = (manifest, label) => {
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) throw new Error(`${label} artifact has no files`);
  const result = new Map();
  for (const file of manifest.files) {
    const artifactPath = normalized(file?.path);
    if (result.has(artifactPath)) throw new Error(`${label} artifact repeats ${artifactPath}`);
    if (!/^[a-f0-9]{64}$/.test(file?.sha256 || '') || !Number.isInteger(file?.bytes) || file.bytes < 0) {
      throw new Error(`${label} artifact has invalid record for ${artifactPath}`);
    }
    result.set(artifactPath, { sha256: file.sha256, bytes: file.bytes });
  }
  return result;
};

const baseFiles = toMap(base, 'base');
const candidateFiles = toMap(candidate, 'candidate');
const allPaths = [...new Set([...baseFiles.keys(), ...candidateFiles.keys()])].sort();
const changes = [];

for (const artifactPath of allPaths) {
  const before = baseFiles.get(artifactPath) || null;
  const after = candidateFiles.get(artifactPath) || null;
  if (before?.sha256 === after?.sha256 && before?.bytes === after?.bytes) continue;
  const kind = !before ? 'ADDED' : !after ? 'REMOVED' : 'MODIFIED';
  changes.push({ path: artifactPath, kind, before, after });
}

if (changes.length === 0) throw new Error('candidate artifact has no public changes');
const outsideScope = changes.filter(change => !allowed.has(change.path));
if (outsideScope.length) {
  throw new Error(`candidate changes public files outside NewsStand scope: ${outsideScope.map(change => change.path).join(', ')}`);
}
const structural = changes.filter(change => change.kind !== 'MODIFIED');
if (structural.length) {
  throw new Error(`NewsStand release may modify but not add or remove public files: ${structural.map(change => change.path).join(', ')}`);
}

for (const verificationPath of scope.verificationPaths || []) {
  const artifactPath = normalized(verificationPath);
  if (!candidateFiles.has(artifactPath)) throw new Error(`candidate artifact is missing verification path: ${artifactPath}`);
}

const receipt = {
  schema: 'laidies.newsstand-release-scope-receipt.v1',
  result: 'PASS',
  baseIdentitySha256: base.identitySha256,
  candidateIdentitySha256: candidate.identitySha256,
  allowedArtifactPaths: [...allowed].sort(),
  changes,
};
if (receiptPath) {
  fs.mkdirSync(path.dirname(path.resolve(receiptPath)), { recursive: true });
  fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
}
console.log(`NEWSSTAND RELEASE SCOPE: PASS · ${changes.length} modified public file(s) · ${changes.map(change => change.path).join(', ')}`);
