import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { communitySso } from './community-sso.mjs';

const env = { HYVOR_SSO_ENABLED: 'true', HYVOR_SSO_PRIVATE_KEY: 'synthetic-only-community-test-key' };
const token = 'synthetic.bearer.token.for.tests';
const user = { id: '59aa17ee-2377-4e55-8f3a-47184797db02', email: 'test@example.invalid', email_confirmed_at: '2026-09-07T00:00:00Z' };
const remote = { state: 'account-without-card', profile: { display_name: 'Zoë Test' }, card: null };
const request = (overrides = {}) => new Request('https://laidies.ai/api/hyvor-sso', {
  method: 'POST', headers: { Authorization: 'Bearer ' + token }, ...overrides
});
function upstream({ authUser = user, profile = remote, authStatus = 200, profileStatus = 200 } = {}) {
  const calls = [];
  const fetcher = async (url, options) => {
    calls.push({ url, options });
    assert.equal(options.headers.authorization, 'Bearer ' + token);
    assert.equal(options.redirect, 'error');
    assert.equal(options.cache, 'no-store');
    assert.ok(options.signal instanceof AbortSignal);
    if (url.endsWith('/auth/v1/user')) return Response.json(authUser, { status: authStatus });
    assert.ok(url.endsWith('/rest/v1/rpc/get_my_resident_state_v1'));
    assert.equal(options.body, '{}');
    return Response.json(profile, { status: profileStatus });
  };
  return { calls, fetcher };
}

test('verified account without a Card receives only its server identity, signed with correct HMAC', async () => {
  const mock = upstream();
  const response = await communitySso(request({ body: JSON.stringify({ id: 'victim', name: 'Injected', email: 'victim@invalid.test' }) }), env, mock.fetcher);
  assert.equal(response.status, 200);
  assert.equal(mock.calls.length, 2);
  assert.match(response.headers.get('cache-control'), /no-store/);
  assert.equal(response.headers.get('vary'), 'Authorization');
  assert.equal(response.headers.get('access-control-allow-origin'), null);
  const result = await response.json();
  const payload = JSON.parse(Buffer.from(result.user, 'base64').toString('utf8'));
  assert.deepEqual(Object.keys(payload).sort(), ['email', 'id', 'name', 'timestamp']);
  assert.equal(payload.id, user.id);
  assert.equal(payload.email, user.email);
  assert.equal(payload.name, 'Zoë Test');
  assert.ok(Math.abs(payload.timestamp - Date.now() / 1000) < 3);
  assert.equal(result.hash, createHmac('sha256', env.HYVOR_SSO_PRIVATE_KEY).update(result.user).digest('hex'));
  assert.equal(JSON.stringify(result).includes(token), false);
  assert.equal(JSON.stringify(result).includes(env.HYVOR_SSO_PRIVATE_KEY), false);
});

test('Card-backed account has the same eligibility and profile name authority', async () => {
  const mock = upstream({ profile: { ...remote, state: 'account-backed-resident', card: { document: { fields: { displayName: 'Private card name' } } } } });
  const response = await communitySso(request(), env, mock.fetcher);
  assert.equal(response.status, 200);
  const payload = JSON.parse(Buffer.from((await response.json()).user, 'base64').toString());
  assert.equal(payload.name, remote.profile.display_name);
});

for (const method of ['GET', 'PUT', 'DELETE', 'OPTIONS']) {
  test(method + ' cannot issue an assertion', async () => {
    const response = await communitySso(request({ method }), env, () => assert.fail('unexpected upstream'));
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'POST');
  });
}
for (const authorization of ['', 'Basic abc', 'Bearer short', 'Bearer ' + 'x'.repeat(8200)]) {
  test('missing or malformed bearer is rejected: ' + authorization.slice(0, 20), async () => {
    const response = await communitySso(request({ headers: { authorization } }), env, () => assert.fail('unexpected upstream'));
    assert.equal(response.status, 401);
    assert.equal((await response.json()).user, undefined);
  });
}
for (const disabled of [{}, { ...env, HYVOR_SSO_ENABLED: 'false' }, { ...env, HYVOR_SSO_PRIVATE_KEY: '' }]) {
  test('unconfigured provider fails closed ' + Object.keys(disabled).length + String(disabled.HYVOR_SSO_PRIVATE_KEY), async () => {
    assert.equal((await communitySso(request(), disabled, () => assert.fail('unexpected upstream'))).status, 503);
  });
}
test('cross-origin requests cannot obtain an assertion', async () => {
  assert.equal((await communitySso(request({ headers: { authorization: 'Bearer ' + token, origin: 'https://attacker.invalid' } }), env)).status, 403);
});
for (const authStatus of [401, 403, 500]) {
  test('identity provider rejection cannot produce an assertion ' + authStatus, async () => {
    const mock = upstream({ authStatus });
    const response = await communitySso(request(), env, mock.fetcher);
    assert.equal(response.status, authStatus === 500 ? 503 : 401);
    assert.equal(mock.calls.length, 1);
    assert.equal((await response.json()).user, undefined);
  });
}
for (const authUser of [{ ...user, email_confirmed_at: null }, { ...user, is_anonymous: true }, { ...user, id: 'malformed' }, { ...user, email: 'invalid' }]) {
  test('unverified or malformed identity rejected ' + JSON.stringify(authUser), async () => {
    assert.equal((await communitySso(request(), env, upstream({ authUser }).fetcher)).status, 401);
  });
}
for (const profile of [{ ...remote, profile: null }, { ...remote, profile: { display_name: '' } }]) {
  test('missing public name requests a name without requiring a Card ' + JSON.stringify(profile.profile), async () => {
    const response = await communitySso(request(), env, upstream({ profile }).fetcher);
    assert.equal(response.status, 409);
    assert.equal((await response.json()).error, 'community_display_name_required');
  });
}
for (const name of ['<img>', 'x'.repeat(31), 'name\ncontrol', ' padded ']) {
  test('bad profile name fails closed: ' + JSON.stringify(name), async () => {
    assert.equal((await communitySso(request(), env, upstream({ profile: { ...remote, profile: { display_name: name } } }).fetcher)).status, 503);
  });
}
test('profile state must be from the authenticated contract', async () => {
  assert.equal((await communitySso(request(), env, upstream({ profile: { ...remote, state: 'device-local-card' } }).fetcher)).status, 401);
});
test('profile provider rejection cannot produce an assertion', async () => {
  assert.equal((await communitySso(request(), env, upstream({ profileStatus: 401 }).fetcher)).status, 401);
});
test('unreadable or oversized upstream output fails closed', async () => {
  for (const body of ['not json', 'x'.repeat(65537)]) {
    const response = await communitySso(request(), env, async () => new Response(body));
    assert.equal(response.status, 503);
  }
});
test('network failures reveal no provider error or identity details', async () => {
  const response = await communitySso(request(), env, async () => { throw new Error('private upstream detail'); });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: 'resident_service_unavailable' });
});
