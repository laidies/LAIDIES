import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Miniflare, convertV4MiniflareOptions } from '/Users/alisoneakin/.npm/_npx/0d005330ba397783/node_modules/miniflare/dist/src/index.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const bundledWorker = path.join(here, 'bundled-worker.js');
const token = 'synthetic.bearer.token.for.workerd.smoke';
const user = { id: '59aa17ee-2377-4e55-8f3a-47184797db02', email: 'test@example.invalid', email_confirmed_at: '2026-09-07T00:00:00Z' };
const profile = { state: 'account-without-card', profile: { display_name: 'Workerd Test' }, card: null };

async function dispatch(upstream) {
  const mf = new Miniflare(convertV4MiniflareOptions({
    scriptPath: bundledWorker,
    modules: true,
    compatibilityDate: '2026-07-24',
    compatibilityFlags: [],
    bindings: { HYVOR_SSO_ENABLED: 'true', HYVOR_SSO_PRIVATE_KEY: 'synthetic-only-community-test-key', ASSETS: {} },
    outboundService: upstream
  }));
  try {
    return await mf.dispatchFetch('https://laidies.ai/api/hyvor-sso', {
      method: 'POST', headers: { authorization: 'Bearer ' + token }
    });
  } finally { await mf.dispose(); }
}

test('exact bundled Worker uses supported manual redirects for both synthetic identity calls', async () => {
  const requests = [];
  const response = await dispatch(async request => {
    requests.push({ url: request.url, method: request.method, cacheControl: request.headers.get('cache-control') });
    return Response.json(request.url.endsWith('/auth/v1/user') ? user : profile);
  });
  assert.equal(response.status, 200);
  assert.deepEqual(requests.map(request => request.url.endsWith('/auth/v1/user')), [true, false]);
  assert.deepEqual(requests.map(request => request.method), ['GET', 'POST']);
  assert.deepEqual(requests.map(request => request.cacheControl), ['no-cache', 'no-cache']);
});

test('exact bundled Worker rejects a synthetic upstream redirect without issuing an assertion', async () => {
  let calls = 0;
  const response = await dispatch(async () => {
    calls += 1;
    return new Response('', { status: 302, headers: { location: 'https://example.invalid/' } });
  });
  assert.equal(calls, 1);
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: 'resident_service_unavailable' });
});
