import test from 'node:test';
import assert from 'node:assert/strict';
import { safeCommunityReturn, prepareCommunityReturn, consumeCommunityReturn } from '../../../../content/site/community-return.mjs';
const origin = 'https://laidies.ai';
function storage() {
  const items = new Map();
  return { getItem: k => items.get(k), setItem: (k, v) => items.set(k, v), removeItem: k => items.delete(k) };
}
test('specific room and house selection survive Resident sign-in', () => {
  for (const path of ['/community/wins', '/community/wins.html', '/sorority-house?wing=front-parlour&room=ask-the-room#rooms']) {
    assert.equal(safeCommunityReturn(path, origin), path);
    const saved = storage();
    assert.equal(prepareCommunityReturn({ origin, search: '?community_return=' + encodeURIComponent(path) }, saved, 0), path);
    assert.equal(prepareCommunityReturn({ origin, search: '?code=real-callback-code' }, saved, 1000), path);
    consumeCommunityReturn(saved);
    assert.equal(prepareCommunityReturn({ origin, search: '?code=another' }, saved, 1000), null);
  }
});
test('external, credentialed, arbitrary and encoded escape redirects fail closed', () => {
  for (const bad of ['https://attacker.invalid', '//attacker.invalid', '/\\attacker.invalid', '/resident-card', '/community/wins/../../private', '/%63ommunity/wins', '/community/wins%2f..', '/community/not-a-room', 'javascript:alert(1)']) {
    assert.equal(safeCommunityReturn(bad, origin), null, bad);
  }
});
test('only permitted room query fields and harmless fragments are retained', () => {
  assert.equal(safeCommunityReturn('/community/wins?token=private&next=https://attacker.invalid&issue=04#comments', origin), '/community/wins?issue=04#comments');
});
test('ordinary account visit never redirects using an old saved room', () => {
  const saved = storage();
  prepareCommunityReturn({ origin, search: '?community_return=/community/wins' }, saved, 0);
  assert.equal(prepareCommunityReturn({ origin, search: '' }, saved, 100), null);
});
test('expired or malformed stored returns are ignored', () => {
  const saved = storage();
  prepareCommunityReturn({ origin, search: '?community_return=/community/wins' }, saved, 0);
  assert.equal(prepareCommunityReturn({ origin, search: '?code=callback' }, saved, 1800001), null);
  saved.setItem('laidies_community_signin_return_v1', '{bad json');
  assert.equal(prepareCommunityReturn({ origin, search: '?code=callback' }, saved, 100), null);
});
