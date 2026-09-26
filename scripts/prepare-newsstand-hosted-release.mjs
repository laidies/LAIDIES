#!/usr/bin/env node
/**
 * Mechanical provider-preserving release preparation only.
 *
 * This does not retrieve a provider artifact, copy bytes, deploy, or decide
 * editorial admission. It verifies that independently supplied records bind a
 * candidate manifest to the exact provider predecessor, then delegates the
 * allowed-path decision to the registered NewsStand release-scope controller.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_SCOPE_CHECKER = path.join(ROOT, 'scripts/check-newsstand-release-scope.mjs');
const SHA256 = /^[a-f0-9]{64}$/;

const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const compact = value => String(value || '').replace(/\s+/g, ' ').slice(0, 500);
const readJson = input => JSON.parse(fs.readFileSync(path.resolve(input), 'utf8'));

function manifestIdentity(manifest, label) {
  if (manifest?.schema !== 'laidies-release-artifact-manifest/v1' || !Array.isArray(manifest.files) || !SHA256.test(manifest.identitySha256 || '')) {
    throw new Error(`${label} is not a valid release artifact manifest`);
  }
  const seen = new Set();
  const lines = [];
  for (const file of manifest.files) {
    if (!file || typeof file.path !== 'string' || !file.path || file.path.startsWith('/') || file.path.includes('\\') ||
      path.posix.normalize(file.path) !== file.path || file.path === '..' || file.path.startsWith('../') ||
      !SHA256.test(file.sha256 || '') || !Number.isInteger(file.bytes) || file.bytes < 0 || seen.has(file.path)) {
      throw new Error(`${label} has an invalid file record`);
    }
    seen.add(file.path);
    lines.push(`${file.sha256}  ${file.path}\n`);
  }
  const actual = hash(lines.join(''));
  if (actual !== manifest.identitySha256) throw new Error(`${label} identity does not bind its files`);
  return actual;
}

function failure(code, detail) {
  return { schema: 'laidies.newsstand-hosted-release-preparation.v1', result: 'BLOCKED', deployed: false, code, detail };
}

function validateAdmission(admission, candidateIdentity) {
  const schema = admission?.schemaVersion || admission?.schema;
  if (schema === 'laidies.production-release-authority.v2') {
    return 'release authority is not independent editorial admission';
  }
  if (typeof schema !== 'string' || !schema || typeof admission?.decision !== 'string' ||
      !/^(ACCEPT|ADMIT)_/.test(admission.decision)) {
    return 'admission must identify an independent ACCEPT or ADMIT decision';
  }
  if (admission.artifactIdentitySha256 !== candidateIdentity) {
    return 'admission artifactIdentitySha256 must exactly bind the candidate manifest';
  }
  return null;
}

function validateProvider({ predecessor, currentProviderHead, baseIdentity, scope }) {
  if (predecessor?.schemaVersion !== 'newsstand-service-predecessor-verification-v1' ||
      typeof predecessor.deploymentId !== 'string' || !predecessor.deploymentId ||
      predecessor.providerHeadId !== predecessor.deploymentId || predecessor.artifactIdentitySha256 !== baseIdentity) {
    return 'provider predecessor must be a verification record whose deployment/provider head and artifact identity bind the base manifest';
  }
  const currentHead = currentProviderHead?.providerHeadId || currentProviderHead?.id;
  const currentBranch = currentProviderHead?.productionBranch || currentProviderHead?.branch;
  if (typeof currentHead !== 'string' || !currentHead || currentHead !== predecessor.providerHeadId) {
    return 'current provider head differs from the exact verified predecessor';
  }
  if (typeof currentBranch !== 'string' || currentBranch !== scope.productionBranch) {
    return 'current provider production branch does not match the registered NewsStand scope';
  }
  if (currentProviderHead.project !== undefined && currentProviderHead.project !== scope.project) {
    return 'current provider project does not match the registered NewsStand scope';
  }
  return null;
}

export function prepareHostedRelease({ baseManifestPath, candidateManifestPath, scopePath, admissionPath, predecessorPath, currentProviderHeadPath, scopeCheckerPath = DEFAULT_SCOPE_CHECKER }) {
  try {
    for (const [name, value] of Object.entries({ baseManifestPath, candidateManifestPath, scopePath, admissionPath, predecessorPath, currentProviderHeadPath })) {
      if (typeof value !== 'string' || !value) return failure('MISSING_INPUT', `${name} is required`);
    }
    const base = readJson(baseManifestPath);
    const candidate = readJson(candidateManifestPath);
    const scope = readJson(scopePath);
    const admission = readJson(admissionPath);
    const predecessor = readJson(predecessorPath);
    const currentProviderHead = readJson(currentProviderHeadPath);
    const baseIdentity = manifestIdentity(base, 'base manifest');
    const candidateIdentity = manifestIdentity(candidate, 'candidate manifest');

    if (scope?.schema !== 'laidies.newsstand-production-scope.v1' || scope.project !== 'laidies-sunnyvaile' ||
        typeof scope.productionBranch !== 'string' || !scope.productionBranch) {
      return failure('INVALID_SCOPE', 'registered NewsStand production scope is required');
    }
    const admissionFailure = validateAdmission(admission, candidateIdentity);
    if (admissionFailure) return failure('ADMISSION_ARTIFACT_UNBOUND', admissionFailure);
    const providerFailure = validateProvider({ predecessor, currentProviderHead, baseIdentity, scope });
    if (providerFailure) return failure('STALE_OR_UNBOUND_PROVIDER_PREDECESSOR', providerFailure);
    if (!fs.existsSync(scopeCheckerPath)) return failure('SCOPE_CHECKER_MISSING', 'scripts/check-newsstand-release-scope.mjs is unavailable');

    const scopeRun = spawnSync(process.execPath, [scopeCheckerPath, path.resolve(baseManifestPath), path.resolve(candidateManifestPath), path.resolve(scopePath)], {
      encoding: 'utf8',
      timeout: 30_000,
      maxBuffer: 1_000_000,
    });
    if (scopeRun.error || scopeRun.status !== 0) {
      return failure('SCOPE_CHECKER_REJECTED', compact(scopeRun.stderr || scopeRun.error?.message || 'scope checker failed'));
    }
    return {
      schema: 'laidies.newsstand-hosted-release-preparation.v1',
      result: 'PREPARED_FOR_SEPARATE_DEPLOYMENT',
      deployed: false,
      admissionReassessed: false,
      providerPredecessorId: predecessor.providerHeadId,
      baseIdentitySha256: baseIdentity,
      candidateIdentitySha256: candidateIdentity,
      scopeChecker: path.basename(scopeCheckerPath),
      scopeResult: compact(scopeRun.stdout),
      nextAction: 'A separate authorized provider-preserving deploy and live verification are still required.',
    };
  } catch (error) {
    return failure('INVALID_INPUT', compact(error.message));
  }
}

function usage() {
  return 'Usage: node scripts/prepare-newsstand-hosted-release.mjs --base-manifest <json> --candidate-manifest <json> --scope <json> --admission <json> --provider-predecessor <json> --current-provider-head <json>';
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const value = flag => {
    const index = args.indexOf(flag);
    return index === -1 ? null : args[index + 1];
  };
  if (args.includes('--help')) {
    console.log(usage());
  } else {
    const result = prepareHostedRelease({
      baseManifestPath: value('--base-manifest'),
      candidateManifestPath: value('--candidate-manifest'),
      scopePath: value('--scope'),
      admissionPath: value('--admission'),
      predecessorPath: value('--provider-predecessor'),
      currentProviderHeadPath: value('--current-provider-head'),
    });
    console.log(JSON.stringify(result, null, 2));
    if (result.result !== 'PREPARED_FOR_SEPARATE_DEPLOYMENT') process.exitCode = 2;
  }
}
