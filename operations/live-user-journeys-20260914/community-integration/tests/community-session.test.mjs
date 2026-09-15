import test from 'node:test';
import assert from 'node:assert/strict';
import { createCommunitySession } from '../../../../content/site/community-session.mjs';

function fixture({ session = { access_token: 'existing-resident-token', user: { id: 'resident-a' } }, fetcher } = {}) {
  let callback, unsubscribed = false;
  const events = [];
  const runtime = { client: { auth: {
    async getSession() { return { data: { session }, error: null }; },
    onAuthStateChange(fn) { callback = fn; return { data: { subscription: { unsubscribe() { unsubscribed = true; } } } }; }
  } } };
  const bridge = createCommunitySession({ runtime, fetcher, onState: state => events.push(state) });
  return { bridge, events, changed: (event, next) => callback(event, next), unsubscribed: () => unsubscribed };
}
const assertion = { user: 'eyJpZCI6InRlc3QifQ==', hash: 'a'.repeat(64) };
const ok = async (url, options) => {
  assert.equal(url, '/api/hyvor-sso');
  assert.equal(options.method, 'POST');
  assert.equal(options.cache, 'no-store');
  assert.equal(options.headers.Authorization, 'Bearer existing-resident-token');
  assert.equal(options.body, undefined);
  return Response.json(assertion);
};
function embedFixture({ initiallyReady = true, logout = () => {}, user = () => null } = {}) {
  const attributes = {}, operations = [], listeners = new Map();
  const embed = {
    addEventListener(type, callback) { listeners.set(type, callback); },
    removeEventListener(type) { listeners.delete(type); },
    setAttribute(k, v) { attributes[k] = v; operations.push('set:' + k); },
    removeAttribute(k) { delete attributes[k]; operations.push('remove:' + k); },
    remove() { operations.push('detach'); }
  };
  function loaded() {
    embed.api = { auth: { logout() { operations.push('logout'); return logout(); }, user } };
    listeners.get('loaded')?.();
  }
  embed.__attributes = attributes;
  embed.__initiallyReady = initiallyReady;
  embed.__load = loaded;
  const mount = { appendChild(node) {
    if (node === embed) {
      assert.deepEqual(attributes, { 'sso-user': assertion.user, 'sso-hash': assertion.hash });
      operations.push('attach'); if (initiallyReady) loaded();
      return;
    }
    assert.deepEqual(node.__attributes || {}, {});
    if (node.__initiallyReady) node.__load();
  } };
  return { attributes, operations, embed, mount, loaded };
}

test('signed-out visitor never requests an assertion', async () => {
  const f = fixture({ session: null, fetcher: () => assert.fail('must not fetch') });
  assert.equal((await f.bridge.authorize()).state, 'signed-out');
  f.bridge.dispose();
});
test('provider attributes are set before mount and cleared on Resident logout', async () => {
  const f = fixture({ fetcher: ok });
  const authorized = await f.bridge.authorize();
  const el = embedFixture();
  assert.equal(await authorized.attach(el.embed, el.mount, () => embedFixture().embed), true);
  assert.deepEqual(el.operations, ['set:sso-user', 'set:sso-hash', 'attach']);
  f.changed('SIGNED_OUT', null);
  assert.equal(el.embed.hidden, true);
  assert.equal(el.embed.inert, true);
  await new Promise(r => setTimeout(r, 0));
  assert.deepEqual(el.attributes, {});
  assert.deepEqual(el.operations.slice(3), ['logout', 'remove:sso-user', 'remove:sso-hash', 'detach']);
  assert.equal(await authorized.attach(el.embed, el.mount, () => embedFixture().embed), false);
  await f.bridge.dispose();
  assert.equal(f.unsubscribed(), true);
});
test('logout before provider readiness stays hidden, waits for loaded, then confirms logout before detach', async () => {
  const f = fixture({ fetcher: ok });
  const authorized = await f.bridge.authorize();
  const el = embedFixture({ initiallyReady: false });
  await authorized.attach(el.embed, el.mount, () => embedFixture().embed);
  assert.equal(el.embed.api, undefined);
  f.changed('SIGNED_OUT', null);
  assert.equal(el.embed.hidden, true);
  assert.equal(el.operations.includes('detach'), false);
  el.loaded();
  await new Promise(r => setTimeout(r, 0));
  assert.deepEqual(el.operations.slice(3), ['logout', 'remove:sso-user', 'remove:sso-hash', 'detach']);
  assert.equal(await f.bridge.dispose(), true);
});
test('asynchronous provider logout finishes before the iframe detaches', async () => {
  let finish;
  const f = fixture({ fetcher: ok });
  const authorized = await f.bridge.authorize();
  const el = embedFixture({ logout: () => new Promise(resolve => { finish = resolve; }) });
  await authorized.attach(el.embed, el.mount, () => embedFixture().embed);
  f.changed('SIGNED_OUT', null);
  await new Promise(r => setTimeout(r, 0));
  assert.equal(el.operations.includes('logout'), true);
  assert.equal(el.operations.includes('detach'), false);
  finish();
  await new Promise(r => setTimeout(r, 0));
  assert.equal(el.operations.includes('detach'), true);
  await f.bridge.dispose();
});
test('unconfirmed provider logout blocks new signed assertions', async () => {
  const f = fixture({ fetcher: ok });
  const authorized = await f.bridge.authorize();
  const el = embedFixture({ user: () => ({ id: 'still-signed-in' }) });
  await authorized.attach(el.embed, el.mount, () => embedFixture().embed);
  f.changed('SIGNED_OUT', null);
  assert.equal((await f.bridge.authorize()).state, 'logout-unconfirmed');
  await f.bridge.dispose();
});
test('late assertion cannot revive a signed-out or switched account', async () => {
  let resolve;
  const f = fixture({ fetcher: () => new Promise(r => { resolve = r; }) });
  const pending = f.bridge.authorize();
  await new Promise(r => setTimeout(r, 0));
  f.changed('SIGNED_IN', { access_token: 'other-account', user: { id: 'resident-b' } });
  resolve(Response.json(assertion));
  assert.equal((await pending).state, 'superseded');
  assert.equal(f.events.includes('authorized'), false);
  f.bridge.dispose();
});
test('late JSON decode is also rejected after logout', async () => {
  let resolve;
  const f = fixture({ fetcher: async () => ({ ok: true, status: 200, json: () => new Promise(r => { resolve = r; }) }) });
  const pending = f.bridge.authorize();
  await new Promise(r => setTimeout(r, 0));
  f.changed('SIGNED_OUT', null);
  resolve(assertion);
  assert.equal((await pending).state, 'superseded');
  f.bridge.dispose();
});
test('same-account token refresh preserves the mounted comment draft', async () => {
  const f = fixture({ fetcher: ok });
  const authorized = await f.bridge.authorize();
  const el = embedFixture();
  await authorized.attach(el.embed, el.mount, () => embedFixture().embed);
  f.changed('TOKEN_REFRESHED', { access_token: 'refreshed-token', user: { id: 'resident-a' } });
  assert.equal(el.operations.includes('detach'), false);
  assert.equal(el.attributes['sso-user'], assertion.user);
  f.bridge.dispose();
});
for (const [status, expected] of [[401, 'signed-out'], [409, 'display-name-required'], [503, 'unavailable']]) {
  test('server status ' + status + ' exposes no attach function', async () => {
    const f = fixture({ fetcher: async () => Response.json({}, { status }) });
    const state = await f.bridge.authorize();
    assert.equal(state.state, expected);
    assert.equal(state.attach, undefined);
    f.bridge.dispose();
  });
}
test('malformed assertion and network errors do not mount a provider', async () => {
  for (const fetcher of [async () => Response.json({ user: 'abc', hash: 'bad' }), async () => { throw new Error('network'); }]) {
    const f = fixture({ fetcher });
    assert.equal((await f.bridge.authorize()).state, 'unavailable');
    f.bridge.dispose();
  }
});


test('a stale Hyvor session is cleared before the signed assertion mounts', async () => {
  let providerUser = { id: 7, type: 'hyvor' };
  const f = fixture({ fetcher: ok });
  const authorized = await f.bridge.authorize();
  const actual = embedFixture();
  const probe = embedFixture({ user: () => providerUser, logout: () => { providerUser = null; } });
  assert.equal(await authorized.attach(actual.embed, actual.mount, () => probe.embed), true);
  assert.equal(providerUser, null);
  assert.deepEqual(probe.operations, ['logout', 'remove:sso-user', 'remove:sso-hash', 'detach']);
  assert.deepEqual(actual.operations, ['set:sso-user', 'set:sso-hash', 'attach']);
  await f.bridge.dispose();
});

test('sign-out during the preflight never mounts the signed assertion', async () => {
  const f = fixture({ fetcher: ok });
  const authorized = await f.bridge.authorize();
  const actual = embedFixture();
  const probe = embedFixture({ initiallyReady: false });
  const attaching = authorized.attach(actual.embed, actual.mount, () => probe.embed);
  f.changed('SIGNED_OUT', null);
  probe.loaded();
  assert.equal(await attaching, false);
  assert.equal(actual.operations.length, 0);
  await f.bridge.dispose();
});
