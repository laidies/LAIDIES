#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const bridgePath = path.join(root, 'content/site/closet-account-bridge-v1.js');
const closetPath = path.join(root, 'laidies-card.html');
const bridgeSource = fs.readFileSync(bridgePath, 'utf8');
const closetSource = fs.readFileSync(closetPath, 'utf8');

function node() {
  return {
    textContent: '', dataset: {}, style: {}, hidden: false,
    firstChild: { textContent: '' }, appendChild() {}, focus() {},
  };
}

function makeDocument() {
  const nodes = new Map();
  return {
    readyState: 'complete',
    getElementById(id) {
      if (!nodes.has(id)) nodes.set(id, node());
      return nodes.get(id);
    },
    createElement() { return node(); },
    addEventListener() { throw new Error('bridge unexpectedly waited for DOMContentLoaded'); },
    nodes,
  };
}

function rendererSource() {
  const match = closetSource.match(/  function updateCardFromProfile\(profile\) \{[\s\S]*?\n  \}\n\n  var editBtn/);
  assert.ok(match, 'must extract the real Closet renderer');
  return 'var isPublicMode = false;\n' +
    'var ARCHETYPES = {}, SONG_LABEL = {}, ACTIVITY_LABEL = {}, SAINT_LABEL = {}, STOREFRONT_LABEL = {}, CHARACTER_LABEL = {}, EPISODE_LABEL = {};\n' +
    match[0].replace(/\n\n  var editBtn$/, '');
}

function installRenderer(document) {
  const context = { document, window: {} };
  vm.runInNewContext(rendererSource(), context, { filename: 'extracted-closet-renderer.js' });
  return context.updateCardFromProfile;
}

async function runBridge(source, { search = '', state, localCard = { state: 'saved', envelope: {} } }) {
  const document = makeDocument();
  let runtimeGets = 0;
  const window = {
    location: { search },
    LAIDIESResidentAccountRuntime: {
      async get() {
        runtimeGets += 1;
        return {
          async getState() { return state; },
          localCard() { return localCard; },
          writeLocalEnvelope() { throw new Error('unexpected restore'); },
        };
      },
    },
  };
  vm.runInNewContext(source, { window, document, URLSearchParams, Number, JSON }, {
    filename: 'closet-account-bridge-v1.js',
  });
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setImmediate(resolve));
  return { document, runtimeGets };
}

function accountState(number) {
  return {
    session: { user: { id: 'owner' } }, state: 'account-backed-resident',
    remote: { profile: { resident_number: number }, card: { document: {} } },
  };
}

function assertBoth(document, value, verified) {
  for (const id of ['residentNo', 'residentNoBack']) {
    assert.equal(document.getElementById(id).textContent, value, id + ' text');
    assert.equal(document.getElementById(id).dataset.verifiedNumber || '', verified, id + ' verified dataset');
  }
}

// A verified account number paints both faces, and the real private renderer retains it.
{
  const { document } = await runBridge(bridgeSource, { state: accountState(1047) });
  assertBoth(document, 'No. 1047', '1047');
  installRenderer(document)({});
  assertBoth(document, 'No. 1047', '1047');
}

// Signed-out mode never claims a private server number; the renderer keeps No. NEW.
{
  const { document } = await runBridge(bridgeSource, { state: { session: null, remote: { profile: { resident_number: 1047 } } } });
  assertBoth(document, '', '');
  installRenderer(document)({});
  assertBoth(document, 'No. NEW', '');
}

// A public ?u= route must not initialize or read the private account runtime.
{
  const { document, runtimeGets } = await runBridge(bridgeSource, { search: '?u=public-resident', state: accountState(1047) });
  assert.equal(runtimeGets, 0, 'public route must not read private runtime');
  installRenderer(document)({});
  assertBoth(document, 'No. NEW', '');
}

// Unverified/malformed values are never painted as a resident number.
{
  const { document } = await runBridge(bridgeSource, { state: accountState('1047.5') });
  installRenderer(document)({});
  assertBoth(document, 'No. NEW', '');
}

// Calibration: an old bridge with the number-paint block removed must fail the happy-path assertion.
{
  const oldSource = bridgeSource.replace(/\n      var number = Number\([\s\S]*?\n      }\n(?=      if \(state\.state)/, '\n');
  assert.notEqual(oldSource, bridgeSource, 'must construct an old no-paint bridge');
  const { document } = await runBridge(oldSource, { state: accountState(1047) });
  assert.throws(() => assertBoth(document, 'No. 1047', '1047'), /residentNo/);
}

console.log('CLOSET RESIDENT NUMBER PASS: verified owner number paints both faces; private/public/invalid boundaries hold; calibrated old bridge fails.');
