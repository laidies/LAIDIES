#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareHostedRelease } from './prepare-newsstand-hosted-release.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MODERN = '/Users/alisoneakin/Projects/laidies-newsstand-overheard-20260907';
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-newsstand-hosted-release-'));
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const record = (filePath, value) => ({ path: filePath, bytes: Buffer.byteLength(value), sha256: digest(value) });
const manifest = files => ({
  schema: 'laidies-release-artifact-manifest/v1',
  identitySha256: digest(files.map(file => `${file.sha256}  ${file.path}\n`).join('')),
  files,
});
const put = (name, value) => {
  const target = path.join(temp, name);
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
  return target;
};
const scope = put('scope.json', {
  schema: 'laidies.newsstand-production-scope.v1', project: 'laidies-sunnyvaile', productionBranch: 'homepage-redesign',
  allowedArtifactPaths: ['newsstand.html'], verificationPaths: ['index.html', 'newsstand.html'],
});
const baseData = manifest([record('index.html', 'home-v1'), record('newsstand.html', 'paper-v1')]);
const candidateData = manifest([record('index.html', 'home-v1'), record('newsstand.html', 'paper-v2')]);
const base = put('base.json', baseData);
const candidate = put('candidate.json', candidateData);
const admission = put('admission.json', {
  schemaVersion: 'synthetic-independent-admission-v1', decision: 'ACCEPT_SYNTHETIC_FIXTURE', artifactIdentitySha256: candidateData.identitySha256,
  limitation: 'SYNTHETIC TEST ONLY. This binds bytes and does not establish editorial quality or release authority.',
});
const predecessor = put('predecessor.json', {
  schemaVersion: 'newsstand-service-predecessor-verification-v1', deploymentId: '12345678-1234-1234-1234-123456789abc', providerHeadId: '12345678-1234-1234-1234-123456789abc', artifactIdentitySha256: baseData.identitySha256,
});
const current = put('current.json', { id: '12345678-1234-1234-1234-123456789abc', branch: 'homepage-redesign' });
const knownScopeChecker = path.join(MODERN, 'scripts/check-newsstand-release-scope.mjs');
assert.ok(fs.existsSync(knownScopeChecker), 'modern verified scope controller is required for the synthetic byte test');

let result = prepareHostedRelease({ baseManifestPath: base, candidateManifestPath: candidate, scopePath: scope, admissionPath: admission, predecessorPath: predecessor, currentProviderHeadPath: current, scopeCheckerPath: knownScopeChecker });
assert.equal(result.result, 'PREPARED_FOR_SEPARATE_DEPLOYMENT', JSON.stringify(result));
assert.equal(result.deployed, false);
assert.equal(result.admissionReassessed, false);
assert.match(result.scopeResult, /NEWSSTAND RELEASE SCOPE: PASS/);

const unrelated = put('unrelated.json', manifest([record('index.html', 'home-v2'), record('newsstand.html', 'paper-v2')]));
result = prepareHostedRelease({ baseManifestPath: base, candidateManifestPath: unrelated, scopePath: scope, admissionPath: admission, predecessorPath: predecessor, currentProviderHeadPath: current, scopeCheckerPath: knownScopeChecker });
assert.equal(result.result, 'BLOCKED');
assert.equal(result.code, 'ADMISSION_ARTIFACT_UNBOUND');

const matchingUnrelatedAdmission = put('matching-unrelated-admission.json', { schemaVersion: 'synthetic-independent-admission-v1', decision: 'ACCEPT_SYNTHETIC_FIXTURE', artifactIdentitySha256: JSON.parse(fs.readFileSync(unrelated)).identitySha256 });
result = prepareHostedRelease({ baseManifestPath: base, candidateManifestPath: unrelated, scopePath: scope, admissionPath: matchingUnrelatedAdmission, predecessorPath: predecessor, currentProviderHeadPath: current, scopeCheckerPath: knownScopeChecker });
assert.equal(result.result, 'BLOCKED');
assert.equal(result.code, 'SCOPE_CHECKER_REJECTED');
assert.match(result.detail, /outside NewsStand scope/);

const stale = put('stale-current.json', { id: '87654321-1234-1234-1234-123456789abc', branch: 'homepage-redesign' });
result = prepareHostedRelease({ baseManifestPath: base, candidateManifestPath: candidate, scopePath: scope, admissionPath: admission, predecessorPath: predecessor, currentProviderHeadPath: stale, scopeCheckerPath: knownScopeChecker });
assert.equal(result.result, 'BLOCKED');
assert.equal(result.code, 'STALE_OR_UNBOUND_PROVIDER_PREDECESSOR');

result = prepareHostedRelease({ baseManifestPath: base, candidateManifestPath: candidate, scopePath: scope, admissionPath: admission, predecessorPath: predecessor, currentProviderHeadPath: current });
assert.equal(result.result, 'PREPARED_FOR_SEPARATE_DEPLOYMENT', JSON.stringify(result));
assert.equal(result.deployed, false);
assert.match(result.scopeResult, /NEWSSTAND RELEASE SCOPE: PASS/);

fs.rmSync(temp, { recursive: true, force: true });
console.log('NEWSSTAND HOSTED RELEASE TEST PASS synthetic_good=1 unrelated_bytes=1 stale_provider_head=1 hosted_scope_controller=1 quality_claims=0');
