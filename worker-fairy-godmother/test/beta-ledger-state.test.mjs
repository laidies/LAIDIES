import assert from "node:assert/strict";
import test from "node:test";

import { applyLedgerAction } from "../src/beta-ledger-state.js";

const HASH_A = "a".repeat(64);
const HASH_B = "b".repeat(64);

function run(state, command, now = 1_800_000_000_000) {
  return applyLedgerAction(state, command, now);
}

function completeCase(state, requestId, caseId, limit = 1) {
  let step = run(state, { action: "beginCase", requestId, limit });
  assert.equal(step.body.ok, true);
  step = run(step.state, { action: "commitCase", requestId, caseId, answerHash: HASH_A });
  assert.equal(step.body.ok, true);
  return step;
}

test("guest and Resident case limits reserve atomically and replay idempotently", () => {
  const guest = completeCase(null, "guest-request-01", "guest-case-0001", 1);
  const guestBlocked = run(guest.state, { action: "beginCase", requestId: "guest-request-02", limit: 1 });
  assert.equal(guestBlocked.status, 429);
  assert.equal(guestBlocked.body.status, "limit");

  let resident = null;
  for (let index = 1; index <= 3; index += 1) {
    resident = completeCase(resident?.state || null, `resident-request-0${index}`, `resident-case-000${index}`, 3);
  }
  const residentBlocked = run(resident.state, { action: "beginCase", requestId: "resident-request-04", limit: 3 });
  assert.equal(residentBlocked.status, 429);
  const replay = run(resident.state, { action: "beginCase", requestId: "resident-request-03", limit: 3 });
  assert.equal(replay.body.status, "complete");
  assert.equal(replay.body.caseId, "resident-case-0003");
});

test("concurrent reservations cannot exceed the case limit and aborted work releases the case", () => {
  const first = run(null, { action: "beginCase", requestId: "pending-request-01", limit: 1 });
  const raced = run(first.state, { action: "beginCase", requestId: "pending-request-02", limit: 1 });
  assert.equal(raced.status, 429);
  const aborted = run(raced.state, { action: "abortCase", requestId: "pending-request-01" });
  const retry = run(aborted.state, { action: "beginCase", requestId: "pending-request-02", limit: 1 });
  assert.equal(retry.body.status, "reserved");
});

test("a case accepts exactly three case-bound fittings and rejects stale or fourth attempts", () => {
  let state = completeCase(null, "fitting-case-request", "fitting-case-0001", 1).state;
  let hash = HASH_A;
  for (let index = 1; index <= 3; index += 1) {
    const requestId = `fitting-request-0${index}`;
    const begun = run(state, { action: "beginFitting", requestId, caseId: "fitting-case-0001",
      expectedVersion: index, answerHash: hash });
    assert.equal(begun.body.ok, true);
    hash = index % 2 ? HASH_B : HASH_A;
    const committed = run(begun.state, { action: "commitFitting", requestId,
      caseId: "fitting-case-0001", answerHash: hash });
    assert.equal(committed.body.version, index + 1);
    assert.equal(committed.body.fittingsRemaining, 3 - index);
    state = committed.state;
  }
  const fourth = run(state, { action: "beginFitting", requestId: "fitting-request-04",
    caseId: "fitting-case-0001", expectedVersion: 4, answerHash: hash });
  assert.equal(fourth.status, 429);
  assert.equal(fourth.body.status, "fitting_limit");
  const stale = run(state, { action: "beginFitting", requestId: "fitting-request-05",
    caseId: "fitting-case-0001", expectedVersion: 3, answerHash: HASH_A });
  assert.equal(stale.status, 409);
  assert.equal(stale.body.status, "stale_or_unknown");
});

test("the conservative daily ledger stops the twenty-first 50-cent reservation at ten dollars", () => {
  let state = null;
  for (let index = 1; index <= 20; index += 1) {
    const step = run(state, { action: "reserveBudget", requestId: `budget-request-${String(index).padStart(2, "0")}`,
      amountMicroUsd: 500_000, capMicroUsd: 10_000_000 });
    assert.equal(step.body.ok, true);
    state = step.state;
  }
  assert.equal(state.reservedMicroUsd, 10_000_000);
  const blocked = run(state, { action: "reserveBudget", requestId: "budget-request-21",
    amountMicroUsd: 500_000, capMicroUsd: 10_000_000 });
  assert.equal(blocked.status, 429);
  assert.equal(blocked.body.status, "cap");
  assert.equal(blocked.state.reservedMicroUsd, 10_000_000);
});

test("calibration: an invalid four-case policy is rejected instead of silently widening beta", () => {
  const deliberatelyBad = run(null, { action: "beginCase", requestId: "invalid-policy-01", limit: 4 });
  assert.equal(deliberatelyBad.status, 400);
  assert.equal(deliberatelyBad.body.ok, false);
});
