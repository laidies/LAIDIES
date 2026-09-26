#!/usr/bin/env node

import crypto from 'node:crypto';
import path from 'node:path';

const CUSTOM_ORIGIN = 'https://laidies.ai/';
const PROJECT = 'laidies-sunnyvaile';
const PRODUCTION_BRANCH = 'homepage-redesign';
const MANIFEST_SCHEMA = 'laidies-release-artifact-manifest/v1';
const SHA256 = /^[a-f0-9]{64}$/;
const PROVIDER_HASH = /^[a-f0-9]{32}$/;
const DEPLOYMENT_ID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const DEFAULT_TIMEOUT_MS = 15_000;
const MAX_TIMEOUT_MS = 30_000;
const MAX_DELTA_BYTES = 20 * 1024 * 1024;
const PROVIDER_EXCLUDED_CONTROLS = new Set(['_worker.js', '_redirects']);

export class HostedLiveVerificationError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'HostedLiveVerificationError';
    this.code = code;
  }
}

function fail(code, message) {
  throw new HostedLiveVerificationError(code, message);
}

function validArtifactPath(value) {
  return typeof value === 'string'
    && value.length > 0
    && !path.posix.isAbsolute(value)
    && !value.includes('\\')
    && !value.includes('%')
    && !value.includes('?')
    && !value.includes('#')
    && path.posix.normalize(value) === value
    && value !== '..'
    && !value.startsWith('../')
    && value.split('/').every((part) => part !== '' && part !== '.' && part !== '..');
}

function validateProviderFiles(files, label) {
  if (!files || typeof files !== 'object' || Array.isArray(files) || Object.keys(files).length === 0) {
    fail('INVALID_PROVIDER_FILES', `${label} file identity map is invalid.`);
  }
  const normalized = {};
  for (const [providerPath, identity] of Object.entries(files)) {
    if (!providerPath.startsWith('/') || !validArtifactPath(providerPath.slice(1)) || !PROVIDER_HASH.test(identity)) {
      fail('INVALID_PROVIDER_FILES', `${label} file identity map is invalid.`);
    }
    normalized[providerPath] = identity;
  }
  return Object.fromEntries(Object.entries(normalized).sort(([a], [b]) => a.localeCompare(b)));
}

function validateManifest(manifest) {
  if (manifest?.schema !== MANIFEST_SCHEMA || !Array.isArray(manifest.files) || !SHA256.test(manifest.identitySha256 ?? '')) {
    fail('INVALID_MANIFEST', 'Candidate manifest is invalid.');
  }
  const files = new Map();
  const identityLines = [];
  for (const record of manifest.files) {
    if (!record || !validArtifactPath(record.path) || files.has(record.path)
      || !SHA256.test(record.sha256 ?? '') || !Number.isInteger(record.bytes) || record.bytes < 0) {
      fail('INVALID_MANIFEST', 'Candidate manifest is invalid.');
    }
    files.set(record.path, record);
    identityLines.push(`${record.sha256}  ${record.path}\n`);
  }
  const identity = crypto.createHash('sha256').update(identityLines.join('')).digest('hex');
  if (identity !== manifest.identitySha256) fail('INVALID_MANIFEST', 'Candidate manifest identity is invalid.');
  return files;
}

function validateDelta(delta, manifestFiles) {
  if (!Array.isArray(delta) || delta.length === 0) fail('INVALID_DELTA', 'Deployment delta is invalid.');
  const records = new Map();
  for (const record of delta) {
    if (!record || !validArtifactPath(record.path) || records.has(record.path)
      || !SHA256.test(record.sha256 ?? '') || !Number.isInteger(record.bytes)
      || record.bytes < 0 || record.bytes > MAX_DELTA_BYTES) {
      fail('INVALID_DELTA', 'Deployment delta is invalid.');
    }
    const manifestRecord = manifestFiles.get(record.path);
    if (!manifestRecord || manifestRecord.sha256 !== record.sha256 || manifestRecord.bytes !== record.bytes) {
      fail('DELTA_MANIFEST_MISMATCH', 'Deployment delta does not match the candidate manifest.');
    }
    records.set(record.path, record);
  }
  return records;
}

function validateCandidateShape({ predecessorFiles, currentFiles, manifestFiles, deltaRecords }) {
  const deltaPaths = new Set([...deltaRecords.keys()].map((value) => `/${value}`));
  const predecessorPaths = new Set(Object.keys(predecessorFiles));
  const currentPaths = new Set(Object.keys(currentFiles));

  for (const providerPath of predecessorPaths) {
    if (!currentPaths.has(providerPath)) fail('UNEXPECTED_PROVIDER_REMOVAL', 'The deployment removed a predecessor file.');
    if (!deltaPaths.has(providerPath) && currentFiles[providerPath] !== predecessorFiles[providerPath]) {
      fail('UNEXPECTED_PROVIDER_CHANGE', 'The deployment changed an unrelated predecessor file.');
    }
    if (deltaPaths.has(providerPath) && currentFiles[providerPath] === predecessorFiles[providerPath]) {
      fail('DELTA_NOT_DEPLOYED', 'A declared delta file retains its predecessor identity.');
    }
  }
  for (const providerPath of currentPaths) {
    if (!predecessorPaths.has(providerPath) && !deltaPaths.has(providerPath)) {
      fail('UNEXPECTED_PROVIDER_ADDITION', 'The deployment added an unrelated file.');
    }
  }
  for (const providerPath of deltaPaths) {
    if (!currentPaths.has(providerPath)) fail('DELTA_NOT_DEPLOYED', 'A declared delta file is absent from the deployment.');
  }
  for (const manifestPath of manifestFiles.keys()) {
    const providerPath = `/${manifestPath}`;
    if (!PROVIDER_EXCLUDED_CONTROLS.has(manifestPath)
      && !predecessorPaths.has(providerPath)
      && !deltaPaths.has(providerPath)) {
      fail('UNEXPECTED_MANIFEST_ADDITION', 'The candidate manifest contains an unrelated addition.');
    }
  }
}

function validateProviderHead(value, deploymentId) {
  if (!value || value.id !== deploymentId || value.productionBranch !== PRODUCTION_BRANCH) {
    fail('STALE_PRODUCTION_HEAD', 'The canonical production head does not match the deployment.');
  }
  const expectedHostname = `${deploymentId.slice(0, 8)}.${PROJECT}.pages.dev`;
  let immutable;
  try {
    immutable = new URL(value.url);
  } catch {
    fail('WRONG_ORIGIN', 'The immutable deployment origin is invalid.');
  }
  if (immutable.protocol !== 'https:' || immutable.hostname !== expectedHostname
    || immutable.username || immutable.password || immutable.port
    || immutable.pathname !== '/' || immutable.search || immutable.hash) {
    fail('WRONG_ORIGIN', 'The immutable deployment origin is invalid.');
  }
  return { immutable, files: validateProviderFiles(value.files, 'Current provider') };
}

function publicUrl(origin, artifactPath, deploymentId, cacheBust) {
  const base = new URL(origin);
  const url = new URL(`/${artifactPath}`, base);
  if (url.origin !== base.origin || url.pathname !== `/${artifactPath}`) fail('UNSAFE_PUBLIC_PATH', 'A public verification path is unsafe.');
  if (cacheBust) url.searchParams.set('deployment', deploymentId);
  return url;
}

async function boundedBody(response, expectedBytes) {
  if (expectedBytes > MAX_DELTA_BYTES) fail('INVALID_DELTA', 'Deployment delta is invalid.');
  const declaredLength = response.headers?.get?.('content-length');
  if (declaredLength !== null && declaredLength !== undefined && declaredLength !== '') {
    const parsed = Number(declaredLength);
    if (!Number.isSafeInteger(parsed) || parsed < 0 || parsed > expectedBytes) fail('HTTP_BODY_MISMATCH', 'A public response body is invalid.');
  }

  if (response.body?.getReader) {
    const reader = response.body.getReader();
    const chunks = [];
    let total = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = Buffer.from(value);
        total += chunk.length;
        if (total > expectedBytes || total > MAX_DELTA_BYTES) fail('HTTP_BODY_MISMATCH', 'A public response body is invalid.');
        chunks.push(chunk);
      }
      return Buffer.concat(chunks, total);
    } finally {
      reader.releaseLock?.();
    }
  }

  const body = Buffer.from(await response.arrayBuffer());
  if (body.length > expectedBytes || body.length > MAX_DELTA_BYTES) fail('HTTP_BODY_MISMATCH', 'A public response body is invalid.');
  return body;
}

async function verifyUrl({ url, expected, fetcher, timeoutMs }) {
  let response;
  try {
    response = await fetcher(url.href, {
      method: 'GET',
      redirect: 'error',
      cache: 'no-store',
      credentials: 'omit',
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    fail('PUBLIC_FETCH_FAILED', 'A public verification request failed.');
  }
  if (!response || response.ok !== true || response.status !== 200) fail('PUBLIC_HTTP_FAILED', 'A public verification request returned a failed status.');
  if (typeof response.url !== 'string' || response.url !== url.href) fail('WRONG_ORIGIN', 'A public verification response came from an unexpected origin.');
  let body;
  try {
    body = await boundedBody(response, expected.bytes);
  } catch (error) {
    if (error instanceof HostedLiveVerificationError) throw error;
    fail('PUBLIC_FETCH_FAILED', 'A public verification response could not be read.');
  }
  const bodySha256 = crypto.createHash('sha256').update(body).digest('hex');
  if (body.length !== expected.bytes || bodySha256 !== expected.sha256) fail('HTTP_BODY_MISMATCH', 'A public response body does not match the deployment delta.');
  return { sha256: bodySha256, bytes: body.length };
}

async function readProviderHead(providerAPI) {
  try {
    return await providerAPI();
  } catch {
    fail('PROVIDER_API_FAILED', 'The canonical production head could not be read.');
  }
}

export async function verifyNewsstandHostedLive({
  predecessorFiles,
  manifest,
  delta,
  deploymentId,
  providerAPI,
  fetcher = fetch,
  customOrigin = CUSTOM_ORIGIN,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}) {
  if (!DEPLOYMENT_ID.test(deploymentId ?? '')) fail('INVALID_DEPLOYMENT_ID', 'Deployment identity is invalid.');
  if (typeof providerAPI !== 'function' || typeof fetcher !== 'function') fail('INVALID_ADAPTER', 'Live verification adapters are invalid.');
  if (!Number.isInteger(timeoutMs) || timeoutMs < 100 || timeoutMs > MAX_TIMEOUT_MS) fail('INVALID_TIMEOUT', 'Live verification timeout is invalid.');
  let custom;
  try {
    custom = new URL(customOrigin);
  } catch {
    fail('WRONG_ORIGIN', 'The custom production origin is invalid.');
  }
  if (custom.href !== CUSTOM_ORIGIN || custom.username || custom.password) fail('WRONG_ORIGIN', 'The custom production origin is invalid.');

  const predecessor = validateProviderFiles(predecessorFiles, 'Predecessor');
  const manifestFiles = validateManifest(manifest);
  const deltaRecords = validateDelta(delta, manifestFiles);
  const firstHead = await readProviderHead(providerAPI);
  const { immutable, files: currentFiles } = validateProviderHead(firstHead, deploymentId);
  validateCandidateShape({ predecessorFiles: predecessor, currentFiles, manifestFiles, deltaRecords });

  const verified = [];
  for (const record of deltaRecords.values()) {
    const customResult = await verifyUrl({
      url: publicUrl(custom, record.path, deploymentId, true), expected: record, fetcher, timeoutMs,
    });
    const immutableResult = await verifyUrl({
      url: publicUrl(immutable, record.path, deploymentId, false), expected: record, fetcher, timeoutMs,
    });
    verified.push({
      path: record.path,
      expectedSha256: record.sha256,
      bytes: record.bytes,
      customSha256: customResult.sha256,
      immutableSha256: immutableResult.sha256,
    });
  }

  const finalHead = await readProviderHead(providerAPI);
  const final = validateProviderHead(finalHead, deploymentId);
  if (JSON.stringify(final.files) !== JSON.stringify(currentFiles) || final.immutable.href !== immutable.href) {
    fail('PROVIDER_HEAD_CHANGED', 'The canonical production head changed during verification.');
  }

  return {
    schema: 'laidies.newsstand-hosted-live-verification.v1',
    status: 'BYTE_VERIFIED',
    deploymentId,
    canonicalProductionHeadId: deploymentId,
    productionBranch: PRODUCTION_BRANCH,
    manifestIdentitySha256: manifest.identitySha256,
    byteVerification: true,
    readerJourneyVerified: false,
    verified,
  };
}
