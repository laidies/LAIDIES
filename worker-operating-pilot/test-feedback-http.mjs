import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import worker from './src/feedback-worker.mjs';
import { createFeedbackHandler, createSupabaseFeedbackStore, createTurnstileVerifier } from './src/feedback-http.mjs';
const origin = 'https://staging.invalid';
const input = { submission_type: 'suggestion', body: 'Synthetic feedback only.' };
let calls = 0;
const options = { enabled: true, origin, actorSecret: 'synthetic-secret-'.repeat(4), verifyChallenge: async () => true, store: async p => { calls++; return { contract_version: 'town_hall_feedback_receipt.v1', receipt_id: randomUUID(), status: 'accepted', accepted_at: new Date().toISOString(), input_sha256: p.p_digest }; } };
function request(body = input, headers = {}, method = 'POST') {
  return new Request(origin + '/api/town-hall/feedback', { method, headers: { Origin: origin, 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID(), 'X-Turnstile-Token': 'synthetic', ...headers }, ...(method === 'POST' ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}) });
}
const network = { remoteAddress: '192.0.2.1' };
async function run(opts, req = request(), context = network) { return createFeedbackHandler({ ...options, ...opts })(req, context); }
let negatives = 0;
async function reject(status, opts = {}, req = request(), context = network) {
  const before = calls;
  const result = await run(opts, req, context);
  assert.equal(result.status, status);
  const value = await result.json();
  assert.deepEqual(Object.keys(value), ['error']);
  assert.equal(calls, before, 'rejected boundary must not reach storage');
  negatives++;
}
assert.equal((await worker.fetch(request(), {})).status, 503);
assert.equal((await worker.fetch(new Request(origin + '/other'), {})).status, 404);
assert.equal((await worker.fetch(request(), { FEEDBACK_ENABLED: 'true' })).status, 503);
const ok = await run({ store: async p => {
  assert.match(p.p_actor_hash, /^[a-f0-9]{64}$/);
  assert(!JSON.stringify(p).includes(network.remoteAddress));
  return options.store(p);
} });
assert.equal(ok.status, 200);
assert.equal(ok.headers.get('cache-control'), 'no-store');
assert(!JSON.stringify(await ok.json()).includes(input.body));
await reject(503, { enabled: false });
await reject(405, {}, request(input, {}, 'GET'));
await reject(403, {}, request(input, { Origin: 'https://attacker.invalid' }));
await reject(415, {}, request(input, { 'Content-Type': 'text/plain' }));
await reject(415, {}, request(input, { 'Content-Encoding': 'gzip' }));
await reject(503, { actorSecret: 'weak' });
await reject(503, {}, request(), {});
await reject(400, {}, request(input, { 'Idempotency-Key': 'predictable' }));
await reject(403, {}, request(input, { 'X-Turnstile-Token': '' }));
await reject(403, {}, request(input, { 'X-Turnstile-Token': 'x'.repeat(2049) }));
await reject(403, { verifyChallenge: async () => false });
await reject(400, {}, request({ ...input, user_id: randomUUID() }));
await reject(400, {}, request('{broken JSON'));
await reject(413, {}, request(' '.repeat(13000)));
const malformed = new Request(origin + '/api/town-hall/feedback', { method: 'POST', headers: request().headers, body: new Uint8Array([0xff]) });
await reject(400, {}, malformed);
let cancelled = false;
const stream = new ReadableStream({ pull() {}, cancel() { cancelled = true; } });
const slow = new Request(origin + '/api/town-hall/feedback', { method: 'POST', headers: request().headers, body: stream, duplex: 'half' });
await reject(503, { timeoutMs: 10 }, slow);
assert(cancelled);
await reject(503, { verifyChallenge: () => new Promise(() => {}), timeoutMs: 10 });
for (const [code, status] of Object.entries({ feedback_conflict: 409, feedback_rate_limited: 429, feedback_closed: 503, feedback_expired: 410, feedback_forbidden: 403 })) {
  await reject(status, { store: async () => { throw new Error(code); } });
}
await reject(503, { store: async () => { throw new Error('PRIVATE provider error body'); } });
await reject(503, { store: async () => ({ ...input, status: 'accepted' }) });
await reject(503, { store: () => new Promise(() => {}), timeoutMs: 10 });

// Provider adapter tests inspect the wire, exercise limits/errors, and never call a service.
const abort = new AbortController();
const payload = { p_key: randomUUID(), p_digest: 'a'.repeat(64), p_actor_hash: 'b'.repeat(64), p_input: input };
const store = createSupabaseFeedbackStore({ url: 'https://db.invalid', serverKey: 'synthetic-only', fetcher: async (url, init) => {
  assert.equal(url.pathname, '/rest/v1/rpc/intake_town_hall_feedback_v1');
  assert.equal(init.redirect, 'manual');
  assert.equal(init.signal, abort.signal);
  assert.equal(init.headers.Authorization, 'Bearer synthetic-only');
  assert.deepEqual(JSON.parse(init.body), payload);
  return Response.json({ message: 'feedback_conflict', details: 'private' }, { status: 400 });
} });
await assert.rejects(() => store(payload, { signal: abort.signal }), /^Error: feedback_conflict$/); negatives++;
for (const url of ['http://db.invalid', 'https://user:pass@db.invalid', 'https://db.invalid/path']) {
  assert.throws(() => createSupabaseFeedbackStore({ url, serverKey: 'test' })); negatives++;
}
for (const data of [{ success: false }, { success: true, hostname: 'attacker.invalid', action: 'town_hall_feedback' }, { success: true, hostname: 'staging.invalid', action: 'other' }]) {
  const verify = createTurnstileVerifier({ secret: 'synthetic-only', hostname: 'staging.invalid', fetcher: async () => Response.json(data) });
  assert.equal(await verify({ token: 'test', key: payload.p_key, remoteAddress: network.remoteAddress, signal: abort.signal }), false); negatives++;
}
const verify = createTurnstileVerifier({ secret: 'synthetic-only', hostname: 'staging.invalid', fetcher: async (url, init) => {
  assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
  assert.equal(JSON.parse(init.body).idempotency_key, payload.p_key);
  return Response.json({ success: true, hostname: 'staging.invalid', action: 'town_hall_feedback' });
} });
assert.equal(await verify({ token: 'test', key: payload.p_key, remoteAddress: network.remoteAddress, signal: abort.signal }), true);
console.log(`FEEDBACK HTTP PASS negative_calibrations=${negatives} provider_network_calls=0 live_route=false`);
