import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import baseline from './provider-worker.mjs';
import candidate from './candidate-worker.mjs';

test('receiving worker retains every prior byte except the exact import and route', () => {
  const before = fs.readFileSync(new URL('./provider-worker.mjs', import.meta.url), 'utf8');
  const after = fs.readFileSync(new URL('./candidate-worker.mjs', import.meta.url), 'utf8');
  assert.equal(after.replace("import { communitySso } from './community-sso.mjs';\n", '')
    .replace("    if (url.pathname === '/api/hyvor-sso') return communitySso(request, env);\n", ''), before);
});

for (const path of ['/', '/radio', '/newsstand', '/api/miss-jeeves', '/api/miss-jeeves/result-open', '/api/library-corrections', '/content/library-books/rendered/ai-fundamentals-101.html']) {
  test(`existing handler behavior retained: ${path}`, async () => {
    const request = () => new Request('https://laidies.ai' + path, { headers: { 'sec-fetch-dest': 'document' } });
    const env = { ASSETS: { fetch: async () => new Response('retained static asset', { headers: { 'cache-control': 'public, max-age=60' } }) } };
    const a = await baseline.fetch(request(), env), b = await candidate.fetch(request(), env);
    assert.equal(b.status, a.status);
    assert.deepEqual([...b.headers], [...a.headers]);
    assert.equal(await b.text(), await a.text());
  });
}

test('new route rejects unsigned access without consulting any provider', async () => {
  const response = await candidate.fetch(new Request('https://laidies.ai/api/hyvor-sso', { method: 'POST' }), {});
  assert.equal(response.status, 401);
  assert.equal(response.headers.get('cache-control'), 'no-store, private');
  assert.deepEqual(await response.json(), { error: 'resident_signin_required' });
});
