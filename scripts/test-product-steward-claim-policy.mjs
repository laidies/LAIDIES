#!/usr/bin/env node

import assert from 'node:assert/strict';
import { validateRunQueueClaims } from './lib/product-steward-claim-policy.mjs';

const policy = {
  schema_version: 1,
  claim_ttl_hours: 4,
  heartbeat_stale_minutes: 30,
  pull_mode: 'EXPLICIT_SESSION_CLAIM_ONLY_WHILE_DISPATCHER_PAUSED',
  expiry_action: 'REMOVE_FROM_ACTIVE_AND_APPEND_STALE_RUNTIME_RECORD',
};
const now = new Date('2026-08-04T20:00:00Z');
const claim = (product_id, write_scope, overrides = {}) => ({
  product_id,
  claim_id: `claim-${product_id}`,
  claimed_at: '2026-08-04T19:00:00Z',
  expires_at: '2026-08-04T23:00:00Z',
  heartbeat_at: '2026-08-04T19:50:00Z',
  write_scope,
  ...overrides,
});

assert.deepEqual(validateRunQueueClaims({ claim_policy: policy, active: [] }, { now }), []);
assert.deepEqual(validateRunQueueClaims({ claim_policy: policy, active: [claim('library', ['library.html', 'content/library/**'])] }, { now }), []);

const expired = validateRunQueueClaims({
  claim_policy: policy,
  active: [claim('library', ['library.html'], { expires_at: '2026-08-04T19:30:00Z' })],
}, { now });
assert(expired.some((error) => error.includes('claim expired')), 'expired claim must fail');

const collision = validateRunQueueClaims({
  claim_policy: policy,
  active: [claim('library', ['content/site/**']), claim('newsstand', ['content/site/sv-global-header.js'])],
}, { now });
assert(collision.some((error) => error.includes('colliding write_scope')), 'overlapping write scopes must fail');

const unsupported = validateRunQueueClaims({
  claim_policy: policy,
  active: [claim('library', ['content/*/library'])],
}, { now });
assert(unsupported.some((error) => error.includes('unsupported write_scope')), 'ambiguous globs must fail');

console.log('PRODUCT STEWARD CLAIM POLICY TEST PASS');
console.log('expired_claim=FAIL_AS_CALIBRATED');
console.log('scope_collision=FAIL_AS_CALIBRATED');
console.log('ambiguous_scope=FAIL_AS_CALIBRATED');
