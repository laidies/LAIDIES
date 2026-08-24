#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const checker = path.join(root, 'scripts/check-sunday-release-scope.mjs');
const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-sunday-scope-'));
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const makeManifest = files => {
  const records = files.map(file => ({ path: file.path, bytes: file.bytes, sha256: file.sha256 })).sort((a, b) => a.path.localeCompare(b.path));
  return {
    schema: 'laidies-release-artifact-manifest/v1',
    fileCount: records.length,
    totalBytes: records.reduce((sum, record) => sum + record.bytes, 0),
    identitySha256: sha256(records.map(record => `${record.sha256}  ${record.path}\n`).join('')),
    files: records,
  };
};
const write = (name, value) => {
  const filename = path.join(temporaryDirectory, name);
  fs.writeFileSync(filename, `${JSON.stringify(value, null, 2)}\n`);
  return filename;
};
const run = (base, candidate, scope) => {
  const fixtureEnv = { ...process.env };
  delete fixtureEnv.BASE_COMMIT;
  return spawnSync(process.execPath, [checker, write('base.json', base), write('candidate.json', candidate), write('scope.json', scope)], {
    cwd: root,
    encoding: 'utf8',
    env: fixtureEnv,
  });
};

try {
  const oldSha = sha256('old');
  const newSha = sha256('new');
  const removeSha = sha256('remove');
  const keepSha = sha256('keep');
  const base = makeManifest([
    { path: 'page.html', bytes: 3, sha256: oldSha },
    { path: 'remove.html', bytes: 6, sha256: removeSha },
    { path: 'keep.html', bytes: 4, sha256: keepSha },
  ]);
  const candidate = makeManifest([
    { path: 'page.html', bytes: 3, sha256: newSha },
    { path: 'keep.html', bytes: 4, sha256: keepSha },
  ]);
  const scope = {
    schema: 'laidies.production-scope.v2',
    project: 'laidies-sunnyvaile',
    productionBranch: 'homepage-redesign',
    baseCommit: 'e044ca899dfea867ba10f770cc99a0b8e32c100a',
    baseArtifactIdentitySha256: base.identitySha256,
    candidateArtifactIdentitySha256: candidate.identitySha256,
    allowedChanges: [
      { path: 'page.html', operation: 'MODIFY', baseSha256: oldSha, candidateSha256: newSha },
      { path: 'remove.html', operation: 'REMOVE', baseSha256: removeSha, candidateSha256: null },
    ],
    preservedPaths: [{ path: 'keep.html', sha256: keepSha }],
    verificationPaths: ['page.html', 'keep.html'],
    removedPaths: ['remove.html'],
  };
  let result = run(base, candidate, scope);
  assert.equal(result.status, 0, result.stderr);

  const extra = structuredClone(candidate);
  extra.files.push({ path: 'surprise.html', bytes: 1, sha256: sha256('x') });
  extra.fileCount += 1;
  extra.totalBytes += 1;
  extra.identitySha256 = sha256([...extra.files].sort((a, b) => a.path.localeCompare(b.path)).map(record => `${record.sha256}  ${record.path}\n`).join(''));
  const extraScope = structuredClone(scope);
  extraScope.candidateArtifactIdentitySha256 = extra.identitySha256;
  result = run(base, extra, extraScope);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /change count does not match|unbound public change/);

  const workerAdded = structuredClone(candidate);
  workerAdded.files.push({ path: '_worker.js', bytes: 6, sha256: sha256('worker') });
  workerAdded.files.sort((a, b) => a.path.localeCompare(b.path));
  workerAdded.fileCount += 1;
  workerAdded.totalBytes += 6;
  workerAdded.identitySha256 = sha256(workerAdded.files.map(record => `${record.sha256}  ${record.path}\n`).join(''));
  const workerScope = structuredClone(scope);
  workerScope.candidateArtifactIdentitySha256 = workerAdded.identitySha256;
  workerScope.allowedChanges.push({ path: '_worker.js', operation: 'ADD', baseSha256: null, candidateSha256: sha256('worker') });
  result = run(base, workerAdded, workerScope);
  assert.equal(result.status, 0, result.stderr);

  const workerFetchScope = structuredClone(workerScope);
  workerFetchScope.verificationPaths.push('_worker.js');
  result = run(base, workerAdded, workerFetchScope);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /runtime-only path cannot be fetched/);

  const stale = structuredClone(scope);
  stale.allowedChanges[0].candidateSha256 = sha256('wrong');
  result = run(base, candidate, stale);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /unbound public change/);

  const missingRemoval = structuredClone(scope);
  missingRemoval.removedPaths = [];
  result = run(base, candidate, missingRemoval);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /removed-path verification set/);

  const driftedKeep = structuredClone(scope);
  driftedKeep.preservedPaths[0].sha256 = sha256('drift');
  result = run(base, candidate, driftedKeep);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /preserved production path drifted/);

  console.log('PRODUCTION RELEASE SCOPE CALIBRATION: PASS · exact bound addition admitted · unrelated addition, runtime-only fetch verification, stale hash, missing removal verification and preserved-path drift rejected');
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}
