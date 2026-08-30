#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const required = [
  "RESIDENT_TEST_A_EMAIL",
  "RESIDENT_TEST_A_PASSWORD",
  "RESIDENT_TEST_B_EMAIL",
  "RESIDENT_TEST_B_PASSWORD"
];

for (const name of required) {
  if (!process.env[name]) throw new Error(`${name} is required`);
}

const configSource = fs.readFileSync(path.resolve(
  process.env.RESIDENT_ACCOUNT_ROOT || process.cwd(),
  "content/site/supabase-config.js"
), "utf8");
const urlMatch = configSource.match(/url:\s*["']([^"']+)/);
const keyMatch = configSource.match(/anonKey:\s*["']([^"']+)/);
assert.ok(urlMatch && keyMatch, "public Supabase config must be readable");
const url = urlMatch[1].replace(/\/+$/, "");
const anonKey = keyMatch[1];

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${url}${path}`, {
      ...options,
      signal: AbortSignal.timeout(10_000),
      headers: {
        apikey: anonKey,
        "content-type": "application/json",
        ...(options.headers || {})
      }
    });
  } catch (error) {
    throw new Error(`request-timeout-or-network-failure:${path}`, {
      cause: error
    });
  }
  const text = await response.text();
  let data = text;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Keep non-JSON error text for the assertion that follows.
  }
  return { status: response.status, ok: response.ok, data };
}

async function signIn(email, password) {
  const result = await request("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  assert.equal(result.status, 200, "test account sign-in must succeed");
  assert.ok(result.data.access_token);
  return result.data;
}

async function rpc(token, name, body = {}) {
  let result;
  for (const delay of [0, 120, 300, 700]) {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
    result = await request(`/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
      body: JSON.stringify(body)
    });
    if (message(result) !== "identity-mutation-busy") return result;
  }
  return result;
}

function message(result) {
  return result.data && result.data.message || "";
}

const a1 = await signIn(
  process.env.RESIDENT_TEST_A_EMAIL,
  process.env.RESIDENT_TEST_A_PASSWORD
);
const a2 = await signIn(
  process.env.RESIDENT_TEST_A_EMAIL,
  process.env.RESIDENT_TEST_A_PASSWORD
);
const b1 = await signIn(
  process.env.RESIDENT_TEST_B_EMAIL,
  process.env.RESIDENT_TEST_B_PASSWORD
);

assert.notEqual(a1.access_token, a2.access_token);
assert.notEqual(a1.user.id, b1.user.id);
console.log("STEP sessions PASS");

const anonymous = await rpc(anonKey, "get_my_resident_state_v1");
assert.equal(anonymous.status, 401);
console.log("STEP anonymous-denial PASS");

const initialA = await rpc(a1.access_token, "get_my_resident_state_v1");
const initialB = await rpc(b1.access_token, "get_my_resident_state_v1");
assert.equal(initialA.status, 200);
assert.equal(initialB.status, 200);
assert.equal(initialB.data.state, "account-without-card");
assert.equal(initialB.data.card, null);
console.log("STEP initial-states PASS");

const card = {
  version: 1,
  fields: {
    displayName: "Resident integration test",
    cardBg: "mint",
    cardAvatarUrl: "/assets/brand/laidies-logo-square-pearl-512-v1.png"
  }
};
const expectedRevision = initialA.data.card
  ? initialA.data.card.revision
  : null;
const claimKey = crypto.randomUUID();
const claim = await rpc(a1.access_token, "claim_resident_card_v1", {
  p_document: card,
  p_idempotency_key: claimKey,
  p_expected_revision: expectedRevision
});
assert.equal(claim.status, 200);
assert.equal(claim.data.state, "account-backed-resident");
console.log("STEP claim PASS");

const retry = await rpc(a2.access_token, "claim_resident_card_v1", {
  p_document: card,
  p_idempotency_key: claimKey,
  p_expected_revision: expectedRevision
});
assert.equal(retry.status, 200);
assert.equal(retry.data.revision, claim.data.revision);
console.log("STEP claim-retry PASS");

const secondSession = await rpc(a2.access_token, "get_my_resident_state_v1");
assert.equal(secondSession.status, 200);
assert.equal(secondSession.data.state, "account-backed-resident");
assert.deepEqual(secondSession.data.card.document, card);
console.log("STEP second-session-restore PASS");

const isolatedB = await rpc(b1.access_token, "get_my_resident_state_v1");
assert.equal(isolatedB.data.state, "account-without-card");
assert.equal(isolatedB.data.card, null);
console.log("STEP cross-account-isolation PASS");

for (const token of [a1.access_token, b1.access_token]) {
  const direct = await request(
    "/rest/v1/resident_cards?select=owner_id,revision",
    { headers: { authorization: `Bearer ${token}` } }
  );
  assert.equal(direct.status, 403);
}
console.log("STEP direct-table-denial PASS");

const conflict = await rpc(a1.access_token, "claim_resident_card_v1", {
  p_document: { version: 1, fields: { displayName: "Different request" } },
  p_idempotency_key: claimKey,
  p_expected_revision: claim.data.revision
});
assert.equal(message(conflict), "idempotency-conflict");
console.log("STEP idempotency-conflict PASS");

const stale = await rpc(a1.access_token, "claim_resident_card_v1", {
  p_document: { version: 1, fields: { displayName: "Stale request" } },
  p_idempotency_key: crypto.randomUUID(),
  p_expected_revision: crypto.randomUUID()
});
assert.equal(message(stale), "revision-conflict");
console.log("STEP stale-revision PASS");

const invalid = await rpc(b1.access_token, "claim_resident_card_v1", {
  p_document: { version: 1, fields: { displayName: "<script>" } },
  p_idempotency_key: crypto.randomUUID(),
  p_expected_revision: null
});
assert.equal(message(invalid), "invalid-resident-card-v1");
console.log("STEP invalid-envelope PASS");

const handle = `resident_${crypto.randomBytes(5).toString("hex")}`.slice(0, 24);
const profileA = await rpc(a1.access_token, "update_my_resident_profile_v1", {
  p_display_name: "Resident A",
  p_card_username: handle,
  p_member_card_is_public: false,
  p_idempotency_key: crypto.randomUUID()
});
assert.equal(profileA.status, 200);
assert.equal(profileA.data.card_username, handle);
console.log("STEP profile-update PASS");

const profileCollision = await rpc(
  b1.access_token,
  "update_my_resident_profile_v1",
  {
    p_display_name: "Resident B",
    p_card_username: handle,
    p_member_card_is_public: false,
    p_idempotency_key: crypto.randomUUID()
  }
);
assert.equal(message(profileCollision), "card-username-not-available");
console.log("STEP username-collision PASS");

const revokeKey = crypto.randomUUID();
const revoke = await rpc(a1.access_token, "revoke_my_resident_card_v1", {
  p_idempotency_key: revokeKey,
  p_expected_revision: claim.data.revision
});
assert.equal(revoke.status, 200);
assert.equal(revoke.data.state, "account-without-card");
console.log("STEP revoke PASS");

const revokeRetry = await rpc(a2.access_token, "revoke_my_resident_card_v1", {
  p_idempotency_key: revokeKey,
  p_expected_revision: claim.data.revision
});
assert.equal(revokeRetry.status, 200);
assert.equal(revokeRetry.data.revision, revoke.data.revision);
console.log("STEP revoke-retry PASS");

const afterRevoke = await rpc(a2.access_token, "get_my_resident_state_v1");
assert.equal(afterRevoke.status, 200);
assert.equal(afterRevoke.data.state, "account-without-card");
assert.equal(afterRevoke.data.card, null);
console.log("STEP post-revoke-state PASS");

const reclaim = await rpc(a1.access_token, "claim_resident_card_v1", {
  p_document: card,
  p_idempotency_key: crypto.randomUUID(),
  p_expected_revision: null
});
assert.equal(reclaim.status, 200);
assert.equal(reclaim.data.state, "account-backed-resident");
console.log("STEP reclaim-after-revoke PASS");

const finalRevoke = await rpc(a1.access_token, "revoke_my_resident_card_v1", {
  p_idempotency_key: crypto.randomUUID(),
  p_expected_revision: reclaim.data.revision
});
assert.equal(finalRevoke.status, 200);
const finalState = await rpc(a2.access_token, "get_my_resident_state_v1");
assert.equal(finalState.data.state, "account-without-card");
assert.equal(finalState.data.card, null);
console.log("STEP final-cleanup-revoke PASS");

const anonymousContinuation = await rpc(
  anonKey,
  "get_my_resident_continuation_v1"
);
assert.equal(anonymousContinuation.status, 401);
console.log("STEP continuation-anonymous-denial PASS");

for (const token of [a1.access_token, b1.access_token]) {
  for (const table of [
    "resident_continuations",
    "resident_continuation_mutations"
  ]) {
    const direct = await request(
      `/rest/v1/${table}?select=owner_id`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    assert.equal(direct.status, 403);
  }
}
console.log("STEP continuation-direct-table-denial PASS");

const initialContinuationA = await rpc(
  a1.access_token,
  "get_my_resident_continuation_v1"
);
const initialContinuationB = await rpc(
  b1.access_token,
  "get_my_resident_continuation_v1"
);
assert.equal(initialContinuationA.status, 200);
assert.equal(initialContinuationA.data.state, "empty");
assert.equal(initialContinuationA.data.continuation, null);
assert.equal(initialContinuationB.status, 200);
assert.equal(initialContinuationB.data.state, "empty");
assert.equal(initialContinuationB.data.continuation, null);
console.log("STEP continuation-initial-states PASS");

const continuationTimestamp = new Date().toISOString();
const continuationA = {
  version: 1,
  last: {
    path: "/watch.html?ep=02",
    label: "Episode 02",
    kind: "episode",
    updated_at: continuationTimestamp
  },
  episodes: {
    "02": {
      value: { position_seconds: 12.34, completed: false },
      updated_at: continuationTimestamp
    }
  },
  activities: {},
  collections: {}
};
const continuationClaimKey = crypto.randomUUID();
const continuationClaim = await rpc(
  a1.access_token,
  "put_my_resident_continuation_v1",
  {
    p_document: continuationA,
    p_idempotency_key: continuationClaimKey,
    p_expected_revision: null
  }
);
assert.equal(continuationClaim.status, 200);
assert.equal(continuationClaim.data.state, "saved");
assert.deepEqual(continuationClaim.data.document, continuationA);
console.log("STEP continuation-write PASS");

const continuationRetry = await rpc(
  a2.access_token,
  "put_my_resident_continuation_v1",
  {
    p_document: continuationA,
    p_idempotency_key: continuationClaimKey,
    p_expected_revision: null
  }
);
assert.equal(continuationRetry.status, 200);
assert.equal(continuationRetry.data.revision, continuationClaim.data.revision);
console.log("STEP continuation-idempotent-retry PASS");

const continuationRestore = await rpc(
  a2.access_token,
  "get_my_resident_continuation_v1"
);
assert.equal(continuationRestore.status, 200);
assert.equal(continuationRestore.data.state, "saved");
assert.equal(
  continuationRestore.data.continuation.revision,
  continuationClaim.data.revision
);
assert.deepEqual(
  continuationRestore.data.continuation.document,
  continuationA
);
console.log("STEP continuation-second-session-restore PASS");

const continuationBEmpty = await rpc(
  b1.access_token,
  "get_my_resident_continuation_v1"
);
assert.equal(continuationBEmpty.status, 200);
assert.equal(continuationBEmpty.data.state, "empty");
assert.equal(continuationBEmpty.data.continuation, null);
console.log("STEP continuation-cross-account-isolation PASS");

const continuationConflict = await rpc(
  a1.access_token,
  "put_my_resident_continuation_v1",
  {
    p_document: {
      ...continuationA,
      last: { ...continuationA.last, label: "Different continuation" }
    },
    p_idempotency_key: continuationClaimKey,
    p_expected_revision: null
  }
);
assert.equal(message(continuationConflict), "idempotency-conflict");
console.log("STEP continuation-idempotency-conflict PASS");

const continuationStale = await rpc(
  a1.access_token,
  "put_my_resident_continuation_v1",
  {
    p_document: continuationA,
    p_idempotency_key: crypto.randomUUID(),
    p_expected_revision: crypto.randomUUID()
  }
);
assert.equal(message(continuationStale), "revision-conflict");
console.log("STEP continuation-stale-revision PASS");

const continuationInvalid = await rpc(
  b1.access_token,
  "put_my_resident_continuation_v1",
  {
    p_document: { ...continuationA, version: 2 },
    p_idempotency_key: crypto.randomUUID(),
    p_expected_revision: null
  }
);
assert.equal(message(continuationInvalid), "invalid-resident-continuation-v1");
console.log("STEP continuation-invalid-document PASS");

const continuationB = {
  version: 1,
  last: {
    path: "/library.html",
    label: "LIBRAiRY",
    kind: "page",
    updated_at: new Date().toISOString()
  },
  episodes: {},
  activities: {},
  collections: {}
};
const continuationBSeed = await rpc(
  b1.access_token,
  "put_my_resident_continuation_v1",
  {
    p_document: continuationB,
    p_idempotency_key: crypto.randomUUID(),
    p_expected_revision: null
  }
);
assert.equal(continuationBSeed.status, 200);
assert.deepEqual(continuationBSeed.data.document, continuationB);
console.log("STEP continuation-browser-switch-seed PASS");

console.log(JSON.stringify({
  result: "PASS",
  authenticatedSessions: 3,
  accounts: 2,
  anonymousDenied: true,
  sameAccountSecondSessionRestore: true,
  crossAccountIsolation: true,
  directTableAccessDenied: true,
  idempotentClaimAndRevoke: true,
  staleRevisionRejected: true,
  invalidEnvelopeRejected: true,
  usernameCollisionRejected: true,
  reclaimAfterRevoke: true,
  finalActiveTestCardsExpected: 0,
  disposableAuthUserDeletionStillRequired: true,
  continuationAnonymousDenied: true,
  continuationDirectTableAccessDenied: true,
  continuationSameAccountSecondSessionRestore: true,
  continuationCrossAccountIsolation: true,
  continuationIdempotentWrite: true,
  continuationIdempotencyConflictRejected: true,
  continuationStaleRevisionRejected: true,
  continuationInvalidDocumentRejected: true,
  browserSwitchAccountSeeded: true
}, null, 2));
