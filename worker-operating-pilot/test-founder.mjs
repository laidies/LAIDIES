import assert from "node:assert/strict";
import { decisionRpc, runFounderDecision, SUPABASE_ORIGIN, validateFounderInput } from "./src/founder-contract.mjs";

const input = { workId: "founder-test-001", requestId: "11111111-1111-4111-8111-111111111111", reviewSha256: "a".repeat(64), artifactSha256: "b".repeat(64), readCapability: "c".repeat(64) };
const checkpoint = validateFounderInput(input, input.workId);
const canonical = { request_id: input.requestId, work_id: input.workId, review_sha256: input.reviewSha256, artifact_sha256: input.artifactSha256, expires_at: "2026-09-06T12:00:00Z", status: "ACKNOWLEDGE", decision_id: "22222222-2222-4222-8222-222222222222", actor_id: "33333333-3333-4333-8333-333333333333", decided_at: "2026-09-05T12:00:00Z" };
function pending(status = "PENDING") { return { ...canonical, status, decision_id: null, actor_id: null, decided_at: null }; }
function resumed(decision = canonical) { return { request_id: input.requestId, decision_id: decision.decision_id, work_id: input.workId, outcome: decision.status === "HOLD" ? "HOLD" : "ACKNOWLEDGED_FOR_REVIEW", created_at: "2026-09-05T12:00:01Z" }; }

async function simulate({ records = [canonical], receipt, wakeFails = false, eventInput = input } = {}) {
  const outputs = []; const calls = []; let reads = 0; let waits = 0;
  const step = {
    async do(name, options, callback) { const value = await (callback || options)(); outputs.push({ name, value }); return value; },
    async waitForEvent() { waits++; if (wakeFails) throw new Error("timeout"); return { payload: { action: "ACKNOWLEDGE", actor: "Ali" } }; }
  };
  const result = await runFounderDecision({ instanceId: input.workId, payload: eventInput }, step, async (name, body) => {
    calls.push({ name, body });
    if (name === "read_operating_decision_v1") return records[Math.min(reads++, records.length - 1)];
    return receipt || resumed(records.at(-1));
  });
  assert.equal(JSON.stringify(outputs).includes(input.readCapability), false, "capability must not enter step outputs");
  assert.equal(JSON.stringify(result).includes(input.readCapability), false);
  return { result, calls, reads, waits };
}

const ok = await simulate({ records: [pending(), canonical], wakeFails: true });
assert.equal(ok.result.status, "ACKNOWLEDGED_FOR_REVIEW");
assert.equal(ok.waits, 1);
assert.equal(ok.result.actorId, canonical.actor_id);
assert.ok(Object.values(ok.result.authority_truth).every(value => value === false));
assert.equal((await simulate({ records: [{ ...canonical, status: "HOLD" }] })).result.status, "HOLD");
for (const status of ["EXPIRED", "REVOKED"]) {
  const held = await simulate({ records: [pending(status)] });
  assert.equal(held.result.status, `HOLD_${status}`);
  assert.equal(held.calls.length, 1);
}
const forgedWake = await simulate({ records: [pending()] });
assert.equal(forgedWake.result.status, "HOLD_WAIT_LIMIT");
assert.equal(forgedWake.reads, 49);
assert.equal(forgedWake.waits, 48);
assert.equal(forgedWake.calls.some(call => call.name === "record_operating_resumption_v1"), false);
for (const field of Object.keys(input)) {
  await assert.rejects(simulate({ eventInput: { ...input, [field]: null } }), /invalid/);
  await assert.rejects(simulate({ eventInput: { ...input, [field]: [input[field]] } }), /invalid/);
}
await assert.rejects(simulate({ eventInput: { ...input, action: "APPROVE" } }), /fields/);
for (const [field, value] of Object.entries({ request_id: canonical.actor_id, work_id: "different-work", review_sha256: "f".repeat(64), artifact_sha256: null, status: "APPROVE", actor_id: null, decision_id: null, decided_at: "2026-09-07T12:00:00Z" })) {
  await assert.rejects(simulate({ records: [{ ...canonical, [field]: value }] }), /invalid|mismatch/);
}
await assert.rejects(simulate({ records: [{ ...canonical, capability_hash: "private" }] }), /shape/);
for (const [field, value] of Object.entries({ request_id: canonical.actor_id, work_id: "different-work", decision_id: null, outcome: "PUBLISH", created_at: null })) {
  await assert.rejects(simulate({ receipt: { ...resumed(), [field]: value } }), /resumption/);
}

const key = "sb_publishable_fixture_only_12345";
const payload = { p_request_id: input.requestId, p_capability: input.readCapability };
const rpcResult = await decisionRpc(key, "read_operating_decision_v1", payload, async (url, options) => {
  assert.equal(url, `${SUPABASE_ORIGIN}/rest/v1/rpc/read_operating_decision_v1`);
  assert.equal(options.redirect, "error");
  assert.equal(options.headers.apikey, key);
  assert.deepEqual(JSON.parse(options.body), payload);
  return Response.json(canonical);
});
assert.deepEqual(rpcResult, canonical);
for (const failure of [() => new Response(`private ${input.readCapability}`, { status: 403 }), () => new Response("not JSON"), () => { throw new Error(`private ${key}`); }]) {
  await assert.rejects(decisionRpc(key, "read_operating_decision_v1", payload, async () => failure()), error => error.message === "decision service request failed");
}
await assert.rejects(decisionRpc(key, "read_operating_decision_v1", payload, async () => new Response("x".repeat(16_385))), /too large/);
await assert.rejects(decisionRpc(key, "get_operating_inbox_v1", payload), /unsupported/);
for (const privateKey of ["sb_secret_private_fixture_12345", `e30.${Buffer.from(JSON.stringify({ role: "service_role" })).toString("base64url")}.fixture`]) {
  await assert.rejects(decisionRpc(privateKey, "read_operating_decision_v1", payload), /public key/);
}
assert.equal(Object.hasOwn(checkpoint, "readCapability"), false);
console.log("FOUNDER WORKFLOW CONTRACT PASS: exact persisted ACK/HOLD; forged wake, stale binding, missing identity and bad receipt rejected; bounded wait; redacted bounded RPC");
