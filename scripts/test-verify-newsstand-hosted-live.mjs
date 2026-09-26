#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {
  HostedLiveVerificationError,
  verifyNewsstandHostedLive,
} from './verify-newsstand-hosted-live.mjs';

const digest = (value) => crypto.createHash('sha256').update(value).digest('hex');
const deploymentId = 'a359b8ef-ca44-4fba-9bb9-789dd3aa2bab';
const immutableOrigin = 'https://a359b8ef.laidies-sunnyvaile.pages.dev/';
const oldNews = Buffer.from('old NewsStand bytes');
const newNews = Buffer.from('new NewsStand bytes');
const asset = Buffer.from('new illustration bytes');
const privateBody = 'PRIVATE RESPONSE BODY MUST NOT BE LOGGED';
const providerOld = {
  '/index.html': '1'.repeat(32),
  '/newsstand.html': '2'.repeat(32),
};
const providerNew = {
  '/index.html': '1'.repeat(32),
  '/newsstand.html': '3'.repeat(32),
  '/assets/newsstand/new.png': '4'.repeat(32),
};
const records = [
  { path: 'index.html', sha256: digest('unchanged home'), bytes: Buffer.byteLength('unchanged home') },
  { path: 'newsstand.html', sha256: digest(newNews), bytes: newNews.length },
  { path: 'assets/newsstand/new.png', sha256: digest(asset), bytes: asset.length },
  { path: '_worker.js', sha256: digest('preserved worker'), bytes: Buffer.byteLength('preserved worker') },
  { path: '_redirects', sha256: digest('preserved redirects'), bytes: Buffer.byteLength('preserved redirects') },
];
const manifest = {
  schema: 'laidies-release-artifact-manifest/v1',
  files: records,
  identitySha256: digest(records.map((record) => `${record.sha256}  ${record.path}\n`).join('')),
};
const delta = records.filter((record) => ['newsstand.html', 'assets/newsstand/new.png'].includes(record.path));

function provider({ id = deploymentId, url = immutableOrigin, files = providerNew, drift = false } = {}) {
  let calls = 0;
  return async () => {
    calls += 1;
    return {
      id: drift && calls > 1 ? 'bbbbbbbb-ca44-4fba-9bb9-789dd3aa2bab' : id,
      url,
      productionBranch: 'homepage-redesign',
      files: structuredClone(files),
    };
  };
}

function fakeFetch({ mismatchPath, failedPath, responseOrigin, timeoutPath } = {}) {
  const calls = [];
  const fetcher = async (url, options) => {
    calls.push({ url, options });
    assert.equal(options.method, 'GET');
    assert.equal(options.redirect, 'error');
    assert.equal(options.cache, 'no-store');
    assert.equal(options.credentials, 'omit');
    assert.equal(options.headers, undefined, 'public byte checks send no credentials or private headers');
    const parsed = new URL(url);
    const artifactPath = parsed.pathname.slice(1);
    if (timeoutPath === artifactPath) {
      return new Promise((resolve, reject) => {
        const keepAlive = setTimeout(() => reject(new Error('synthetic timeout fallback')), 1_000);
        options.signal.addEventListener('abort', () => {
          clearTimeout(keepAlive);
          reject(new Error('synthetic timeout'));
        }, { once: true });
      });
    }
    const normalBody = artifactPath === 'newsstand.html' ? newNews : asset;
    const body = mismatchPath === artifactPath ? Buffer.from(privateBody) : normalBody;
    const status = failedPath === artifactPath ? 503 : 200;
    return {
      ok: status === 200,
      status,
      url: responseOrigin ? new URL(parsed.pathname + parsed.search, responseOrigin).href : parsed.href,
      headers: { get: () => String(body.length) },
      arrayBuffer: async () => body,
    };
  };
  return { fetcher, calls };
}

const options = {
  predecessorFiles: providerOld,
  manifest,
  delta,
  deploymentId,
};

async function expectCode(run, code) {
  await assert.rejects(run, (error) => {
    assert.ok(error instanceof HostedLiveVerificationError);
    assert.equal(error.code, code);
    const publicError = JSON.stringify({ name: error.name, code: error.code, message: error.message, stack: error.stack });
    assert.ok(!publicError.includes(privateBody));
    assert.ok(!publicError.includes(newNews.toString('utf8')));
    return true;
  });
}

const captured = [];
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stdout.write = ((chunk) => { captured.push(String(chunk)); return true; });
process.stderr.write = ((chunk) => { captured.push(String(chunk)); return true; });

try {
  const goodFetch = fakeFetch();
  const result = await verifyNewsstandHostedLive({ ...options, providerAPI: provider(), fetcher: goodFetch.fetcher });
  assert.equal(result.status, 'BYTE_VERIFIED');
  assert.equal(result.byteVerification, true);
  assert.equal(result.readerJourneyVerified, false);
  assert.equal(result.canonicalProductionHeadId, deploymentId);
  assert.deepEqual(result.verified.map((item) => item.path), ['newsstand.html', 'assets/newsstand/new.png']);
  assert.equal(goodFetch.calls.length, 4, 'each delta path is fetched at custom and immutable URLs');
  assert.ok(goodFetch.calls.some(({ url }) => url === `https://laidies.ai/newsstand.html?deployment=${deploymentId}`));
  assert.ok(goodFetch.calls.some(({ url }) => url === `${immutableOrigin}newsstand.html`));

  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, providerAPI: provider({ id: 'bbbbbbbb-ca44-4fba-9bb9-789dd3aa2bab' }), fetcher: fakeFetch().fetcher }),
    'STALE_PRODUCTION_HEAD',
  );
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, providerAPI: async () => { throw new Error(privateBody); }, fetcher: fakeFetch().fetcher }),
    'PROVIDER_API_FAILED',
  );
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, providerAPI: provider({ drift: true }), fetcher: fakeFetch().fetcher }),
    'STALE_PRODUCTION_HEAD',
  );
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, providerAPI: provider({ files: { ...providerNew, '/index.html': '9'.repeat(32) } }), fetcher: fakeFetch().fetcher }),
    'UNEXPECTED_PROVIDER_CHANGE',
  );
  const removed = structuredClone(providerNew);
  delete removed['/index.html'];
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, providerAPI: provider({ files: removed }), fetcher: fakeFetch().fetcher }),
    'UNEXPECTED_PROVIDER_REMOVAL',
  );
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, providerAPI: provider(), fetcher: fakeFetch({ mismatchPath: 'newsstand.html' }).fetcher }),
    'HTTP_BODY_MISMATCH',
  );
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, providerAPI: provider(), fetcher: fakeFetch({ failedPath: 'newsstand.html' }).fetcher }),
    'PUBLIC_HTTP_FAILED',
  );
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, providerAPI: provider(), fetcher: fakeFetch({ responseOrigin: 'https://attacker.example/' }).fetcher }),
    'WRONG_ORIGIN',
  );
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, customOrigin: 'https://attacker.example/', providerAPI: provider(), fetcher: fakeFetch().fetcher }),
    'WRONG_ORIGIN',
  );
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, providerAPI: provider({ url: 'https://wrong.laidies-sunnyvaile.pages.dev/' }), fetcher: fakeFetch().fetcher }),
    'WRONG_ORIGIN',
  );

  const traversingRecord = { path: '../private', sha256: digest('x'), bytes: 1 };
  await expectCode(
    () => verifyNewsstandHostedLive({
      ...options,
      delta: [traversingRecord],
      manifest: { ...manifest, files: [...records, traversingRecord] },
      providerAPI: provider(),
      fetcher: fakeFetch().fetcher,
    }),
    'INVALID_MANIFEST',
  );
  const encodedTraversal = { path: 'assets/%2e%2e/private', sha256: digest('x'), bytes: 1 };
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, delta: [encodedTraversal], providerAPI: provider(), fetcher: fakeFetch().fetcher }),
    'INVALID_DELTA',
  );
  await expectCode(
    () => verifyNewsstandHostedLive({ ...options, providerAPI: provider(), fetcher: fakeFetch({ timeoutPath: 'newsstand.html' }).fetcher, timeoutMs: 100 }),
    'PUBLIC_FETCH_FAILED',
  );

  assert.equal(captured.join(''), '', 'verifier emits no response bodies, credentials, or logs');
} finally {
  process.stdout.write = originalStdoutWrite;
  process.stderr.write = originalStderrWrite;
}

console.log('PASS verify-newsstand-hosted-live: canonical head, preserved provider identities, dual-origin body hashes, bounded fetches, and byte-only truth');
