import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read = (relative) => fs.readFileSync(new URL(`../${relative}`, import.meta.url), 'utf8');
const maikeoverSource = read('content/site/maikeover-v2.js');
const navSource = read('content/site/sv-nav-auth.js');
const authKey = 'sb-swqnkxzebxdbgyrzpdne-auth-token';

function storage(values = {}) {
  const data = new Map(Object.entries(values));
  return {
    getItem(key) { return data.has(key) ? data.get(key) : null; },
    setItem(key, value) { data.set(key, String(value)); },
    removeItem(key) { data.delete(key); },
  };
}

function textNode() {
  return {
    textContent: '',
    style: {},
    attributes: new Map(),
    setAttribute(name, value) { this.attributes.set(name, String(value)); },
    getAttribute(name) { return this.attributes.get(name) || null; },
    removeAttribute(name) { this.attributes.delete(name); },
  };
}

function navLink() {
  const link = textNode();
  link.children = [];
  link.replaceChildren = function () { this.children = []; this.textContent = ''; };
  link.appendChild = function (child) {
    this.children.push(child);
    this.textContent += child.textContent || '';
  };
  return link;
}

const settled = () => new Promise((resolve) => setImmediate(() => setImmediate(resolve)));

async function runMaikeover(source, requireAccountReady = true) {
  const listeners = new Map();
  const residentNumber = textNode();
  let signedIn = true;
  const localStorage = storage();
  const window = {
    LAIDIESResidentAccountRuntime: {
      get: async () => ({
        getState: async () => signedIn
          ? { session: { user: { id: 'resident' } }, remote: { profile: { resident_number: 1047 } } }
          // Preserve stale remote data deliberately: a signed-out state must not paint it.
          : { session: null, remote: { profile: { resident_number: 1047 } } },
      }),
    },
    addEventListener(name, listener) { listeners.set(name, listener); },
    location: { hash: '' },
    setTimeout,
  };
  const document = {
    readyState: 'complete',
    getElementById(id) { return id === 'moResidentNo' ? residentNumber : null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
  };
  vm.runInNewContext(source, { window, document, localStorage, Number, String, Array, setTimeout }, {
    filename: 'maikeover-v2.js',
  });
  await settled();
  assert.equal(residentNumber.textContent, 'No. 1047', 'signed-in state must paint the assigned number');
  signedIn = false;
  const listener = listeners.get('laidies:maikeover-account-ready');
  if (requireAccountReady) {
    assert.equal(typeof listener, 'function', 'MAiKEOVER must subscribe to account-ready refreshes');
    listener();
  }
  await settled();
  return residentNumber;
}

function runNav(source, requireAccountReady = true) {
  const listeners = new Map();
  const link = navLink();
  const localStorage = storage({
    [authKey]: JSON.stringify({ user: { email: 'resident@example.test' }, expires_at: Math.floor(Date.now() / 1000) + 600 }),
  });
  const window = { addEventListener(name, listener) { listeners.set(name, listener); } };
  const document = {
    readyState: 'complete',
    querySelectorAll() { return [link]; },
    createElement() { return textNode(); },
    createTextNode(value) { const node = textNode(); node.textContent = String(value); return node; },
  };
  vm.runInNewContext(source, { window, document, localStorage, JSON, Date, String, RegExp }, {
    filename: 'sv-nav-auth.js',
  });
  assert.match(link.textContent, /My Closet$/, 'signed-in nav must identify the Closet destination');
  localStorage.removeItem(authKey);
  const listener = listeners.get('laidies:maikeover-account-ready');
  if (requireAccountReady) {
    assert.equal(typeof listener, 'function', 'shared nav must subscribe to account-ready refreshes');
    listener();
  }
  return link;
}

function removeAccountReadyListener(source) {
  return source.replace(/^.*window\.addEventListener\([^\n]*laidies:maikeover-account-ready[^\n]*\);\n/m, '');
}

const currentNumber = await runMaikeover(maikeoverSource);
assert.equal(currentNumber.textContent, 'No. NEW', 'sign-out must clear a stale resident number');
assert.equal(currentNumber.getAttribute('aria-label'), 'Resident number assigned after account connection');

const currentNav = runNav(navSource);
assert.equal(currentNav.textContent, 'Sign in', 'sign-out must return the shared nav to Sign in');
assert.equal(currentNav.getAttribute('href'), '/maikeover.html#mo-account');
assert.equal(currentNav.getAttribute('data-authenticated'), null);

// Calibration: the exact pre-fix shape (no account-ready subscriptions) leaves
// both signed-in renderings stale after the same sign-out event.
const oldNumber = await runMaikeover(removeAccountReadyListener(maikeoverSource), false);
assert.notEqual(oldNumber.textContent, 'No. NEW', 'calibrated old MAiKEOVER code must fail stale-number clearing');
const oldSessionBoundary = await runMaikeover(
  maikeoverSource.replace('accountState.session && profile && profile.resident_number', 'profile && profile.resident_number')
);
assert.notEqual(oldSessionBoundary.textContent, 'No. NEW', 'calibrated missing-session guard must leak a stale number after sign-out');
const oldNav = runNav(removeAccountReadyListener(navSource), false);
assert.notEqual(oldNav.textContent, 'Sign in', 'calibrated old nav code must fail stale sign-out rendering');

console.log('MAiKEOVER SIGN-OUT STATE PASS: current account-ready handlers clear No. 1047 to No. NEW and My Closet to Sign in; calibrated pre-listener variants fail both assertions.');
