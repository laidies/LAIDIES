import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { runFounderDecision } from "./src/founder-contract.mjs";

const modulePath = process.env.PGLITE_MODULE_PATH;
if (!modulePath) throw new Error("Set PGLITE_MODULE_PATH to @electric-sql/pglite/dist/index.js");
const { PGlite } = await import(pathToFileURL(modulePath).href);
const db = new PGlite("memory://");
const migration = await readFile("supabase/migrations/20260905020000_operating_decisions_v1.sql", "utf8");
const founder = "11111111-1111-4111-8111-111111111111";
const member = "22222222-2222-4222-8222-222222222222";
const capability = "a".repeat(64);

function hash(value) { return createHash("sha256").update(value, "utf8").digest("hex"); }
function review(label = "Pilot") {
  return {
    title: `${label} decision`, summary: "Private receipt is ready for a bounded operating decision.",
    question: "Should this receipt move to editorial review?", recommendation: "Acknowledge only for editorial review.",
    consequences: {
      ACKNOWLEDGE: "The worker may record readiness for editorial review only; no publication, deployment, spend, or Ali approval follows.",
      HOLD: "The worker remains held; no publication, deployment, spend, or Ali approval follows."
    },
    allowedActions: ["ACKNOWLEDGE", "HOLD"], authority_truth: { public: false, deploy: false, spend: false }
  };
}
async function expectReject(action, pattern) {
  await assert.rejects(action, pattern);
}
async function asRole(role, userId, action) {
  await db.exec("reset role; select set_config('request.jwt.claim.sub', '', false);");
  if (userId) await db.query("select set_config('request.jwt.claim.sub', $1, false)", [userId]);
  await db.exec(`set role ${role}`);
  try { return await action(); } finally { await db.exec("reset role; select set_config('request.jwt.claim.sub', '', false);"); }
}
async function insertRequest({ workId, cap = capability, expires = "now() + interval '1 hour'", label = "Pilot", reviewDoc = review(label) }) {
  const result = await db.query(
    `insert into public.operating_decision_requests_v1(work_id, artifact_sha256, review, review_sha256, capability_hash, expires_at)
     values ($1, $2, $3::jsonb, $4, $5, ${expires}) returning id, work_id, review_sha256, artifact_sha256, expires_at`,
    [workId, "b".repeat(64), JSON.stringify(reviewDoc), "0".repeat(64), hash(cap)]
  );
  return result.rows[0];
}
async function anonymousRpc(name, payload) {
  return asRole("anon", null, async () => {
    if (name === "read_operating_decision_v1") {
      const result = await db.query("select public.read_operating_decision_v1($1,$2) as result", [payload.p_request_id, payload.p_capability]);
      return result.rows[0].result;
    }
    if (name === "record_operating_resumption_v1") {
      const result = await db.query("select public.record_operating_resumption_v1($1,$2,$3,$4,$5) as result", [payload.p_request_id, payload.p_capability, payload.p_decision_id, payload.p_work_id, payload.p_outcome]);
      return result.rows[0].result;
    }
    throw new Error("unexpected rpc");
  });
}
async function runWorkflowWithFounderSave(request, cap, action) {
  const outputs = [];
  let saved = false;
  const step = {
    async do(name, options, callback) {
      const value = await (callback || options)();
      outputs.push({ name, value });
      return value;
    },
    async waitForEvent() {
      if (!saved) {
        saved = true;
        await asRole("authenticated", founder, () => db.query(
          "select public.record_operating_decision_v1($1,$2,$3,$4,$5)",
          [request.id, request.review_sha256, request.artifact_sha256, action, randomUUID()]
        ));
      }
      return { payload: { wake: "hint" } };
    }
  };
  const result = await runFounderDecision({ instanceId: request.work_id, payload: {
    workId: request.work_id, requestId: request.id, reviewSha256: request.review_sha256,
    artifactSha256: request.artifact_sha256, readCapability: cap
  } }, step, anonymousRpc);
  assert.equal(JSON.stringify(outputs).includes(cap), false, "workflow steps must not persist a read capability");
  assert.equal(JSON.stringify(result).includes(cap), false, "workflow result must not expose a read capability");
  return { result, outputs };
}
async function runWorkflowTerminal(request, cap) {
  const calls = [];
  const step = {
    async do(name, options, callback) {
      const value = await (callback || options)();
      calls.push({ name, value });
      return value;
    },
    async waitForEvent() { throw new Error("terminal status must not wait"); }
  };
  const result = await runFounderDecision({ instanceId: request.work_id, payload: {
    workId: request.work_id, requestId: request.id, reviewSha256: request.review_sha256,
    artifactSha256: request.artifact_sha256, readCapability: cap
  } }, step, anonymousRpc);
  assert.equal(calls.some((call) => call.name === "persist exact decision resumption"), false);
  return result;
}

try {
  await db.exec(`
    create schema auth;
    create table auth.users(id uuid primary key);
    create role anon;
    create role authenticated;
    create function auth.uid() returns uuid language sql stable as $$
      select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
    $$;
    insert into auth.users values ('${founder}'), ('${member}');
  `);
  await db.exec(migration);
  await db.query("insert into public.operating_approvers_v1(user_id, enabled) values ($1, true)", [founder]);

  const missingSummary = review("Missing");
  delete missingSummary.summary;
  await expectReject(() => insertRequest({ workId: "operating-invalid-001", reviewDoc: missingSummary }), /invalid-operating-review/i);
  const missingAuthority = review("No authority");
  delete missingAuthority.authority_truth;
  await expectReject(() => insertRequest({ workId: "operating-invalid-002", reviewDoc: missingAuthority }), /invalid-operating-review/i);
  const unknownAuthority = review("Unknown authority");
  unknownAuthority.ali_approval = true;
  await expectReject(() => insertRequest({ workId: "operating-invalid-003", reviewDoc: unknownAuthority }), /invalid-operating-review/i);
  const incompleteConsequences = review("Incomplete consequences");
  delete incompleteConsequences.consequences.HOLD;
  await expectReject(() => insertRequest({ workId: "operating-invalid-004", reviewDoc: incompleteConsequences }), /invalid-operating-review/i);
  const wrongActions = review("Wrong actions");
  wrongActions.allowedActions = ["ACKNOWLEDGE"];
  await expectReject(() => insertRequest({ workId: "operating-invalid-005", reviewDoc: wrongActions }), /invalid-operating-review/i);
  await expectReject(() => insertRequest({ workId: "operating-invalid-006", expires: "now() - interval '1 second'" }), /invalid-operating-expiry/i);

  const request = await insertRequest({ workId: "operating-pilot-001" });
  const second = await insertRequest({ workId: "operating-pilot-002", cap: "c".repeat(64), label: "Second" });

  await asRole("anon", null, () => expectReject(
    () => db.query("select public.get_operating_inbox_v1()"), /permission denied|founder-approval-required/i));
  await asRole("anon", null, () => expectReject(
    () => db.query("select public.operating_validate_review_v1($1::jsonb)", [JSON.stringify(review())]), /permission denied/i));
  await asRole("authenticated", member, async () => {
    await expectReject(() => db.query("select * from public.operating_decision_requests_v1"), /permission denied/i);
    await expectReject(() => db.query("insert into public.operating_decisions_v1(request_id,actor_id,action,idempotency_key,review_sha256,artifact_sha256) values ($1,$2,'ACKNOWLEDGE',$3,$4,$5)", [request.id, member, randomUUID(), request.review_sha256, request.artifact_sha256]), /permission denied/i);
    await expectReject(() => db.query("select public.record_operating_decision_v1($1,$2,$3,'ACKNOWLEDGE',$4)", [request.id, request.review_sha256, request.artifact_sha256, randomUUID()]), /founder-approval-required/i);
  });

  const inbox = await asRole("authenticated", founder, () => db.query("select public.get_operating_inbox_v1($1) as inbox", [request.id]));
  const inboxRow = inbox.rows[0].inbox[0];
  assert.equal(inboxRow.work_id, "operating-pilot-001");
  assert.equal(inboxRow.review.title, "Pilot decision");
  assert.equal(Object.hasOwn(inboxRow, "capability_hash"), false);

  const idempotency = randomUUID();
  await asRole("authenticated", founder, async () => {
    await expectReject(() => db.query("select public.record_operating_decision_v1($1,$2,$3,'PUBLISH',$4)", [request.id, request.review_sha256, request.artifact_sha256, randomUUID()]), /invalid-operating-decision/i);
    await expectReject(() => db.query("select public.record_operating_decision_v1($1,$2,$3,'ACKNOWLEDGE',$4)", [request.id, "f".repeat(64), request.artifact_sha256, randomUUID()]), /integrity-mismatch/i);
    await expectReject(() => db.query("select public.record_operating_decision_v1($1,$2,$3,$4,$5)", [request.id, null, request.artifact_sha256, "ACKNOWLEDGE", randomUUID()]), /integrity-mismatch/i);
    await expectReject(() => db.query("select public.record_operating_decision_v1($1,$2,$3,$4,$5)", [request.id, request.review_sha256, null, "ACKNOWLEDGE", randomUUID()]), /integrity-mismatch/i);
    await expectReject(() => db.query("select public.record_operating_decision_v1($1,$2,$3,$4,$5)", [request.id, request.review_sha256, request.artifact_sha256, null, randomUUID()]), /invalid-operating-decision/i);
    await expectReject(() => db.query("select public.record_operating_decision_v1($1,$2,$3,$4,$5)", [request.id, request.review_sha256, request.artifact_sha256, "ACKNOWLEDGE", null]), /invalid-operating-decision/i);
  });
  const decision = await asRole("authenticated", founder, async () => {
    const first = await db.query("select public.record_operating_decision_v1($1,$2,$3,'ACKNOWLEDGE',$4) as decision", [request.id, request.review_sha256, request.artifact_sha256, idempotency]);
    const replay = await db.query("select public.record_operating_decision_v1($1,$2,$3,'ACKNOWLEDGE',$4) as decision", [request.id, request.review_sha256, request.artifact_sha256, idempotency]);
    assert.deepEqual(replay.rows[0].decision, first.rows[0].decision);
    await expectReject(() => db.query("select public.record_operating_decision_v1($1,$2,$3,'HOLD',$4)", [request.id, request.review_sha256, request.artifact_sha256, idempotency]), /idempotency-conflict/i);
    return first.rows[0].decision;
  });
  assert.equal(decision.action, "ACKNOWLEDGE");
  assert.equal(decision.actor_id, founder);

  await asRole("anon", null, async () => {
    await expectReject(() => db.query("select public.read_operating_decision_v1($1,$2)", [request.id, "d".repeat(64)]), /invalid-operating-capability/i);
    await expectReject(() => db.query("select public.read_operating_decision_v1($1,$2)", [second.id, capability]), /invalid-operating-capability/i);
    const read = await db.query("select public.read_operating_decision_v1($1,$2) as receipt", [request.id, capability]);
    assert.equal(read.rows[0].receipt.status, "ACKNOWLEDGE");
    assert.equal(Object.hasOwn(read.rows[0].receipt, "review"), false);
    assert.equal(Object.hasOwn(read.rows[0].receipt, "capability_hash"), false);
    await expectReject(() => db.query("select public.record_operating_resumption_v1($1,$2,$3,$4,$5)", [request.id, capability, randomUUID(), "operating-pilot-001", "ACKNOWLEDGED_FOR_REVIEW"]), /invalid-operating-capability/i);
    await expectReject(() => db.query("select public.record_operating_resumption_v1($1,$2,$3,$4,$5)", [request.id, capability, decision.decision_id, "wrong-work", "ACKNOWLEDGED_FOR_REVIEW"]), /invalid-operating-resumption/i);
    await expectReject(() => db.query("select public.record_operating_resumption_v1($1,$2,$3,$4,$5)", [request.id, capability, decision.decision_id, null, "ACKNOWLEDGED_FOR_REVIEW"]), /invalid-operating-resumption/i);
    await expectReject(() => db.query("select public.record_operating_resumption_v1($1,$2,$3,$4,$5)", [request.id, capability, decision.decision_id, "operating-pilot-001", "HOLD"]), /invalid-operating-resumption/i);
    const resumed = await db.query("select public.record_operating_resumption_v1($1,$2,$3,$4,$5) as receipt", [request.id, capability, decision.decision_id, "operating-pilot-001", "ACKNOWLEDGED_FOR_REVIEW"]);
    const replay = await db.query("select public.record_operating_resumption_v1($1,$2,$3,$4,$5) as receipt", [request.id, capability, decision.decision_id, "operating-pilot-001", "ACKNOWLEDGED_FOR_REVIEW"]);
    assert.deepEqual(replay.rows[0].receipt, resumed.rows[0].receipt);
  });

  const workflowAck = await insertRequest({ workId: "founder-workflow-ack-001", cap: "f".repeat(64), label: "Workflow ACK" });
  const workflowAckResult = await runWorkflowWithFounderSave(workflowAck, "f".repeat(64), "ACKNOWLEDGE");
  assert.equal(workflowAckResult.result.status, "ACKNOWLEDGED_FOR_REVIEW");
  assert.ok(Object.values(workflowAckResult.result.authority_truth).every((value) => value === false));
  const workflowAckResumption = await db.query("select outcome, work_id from public.operating_resumptions_v1 where request_id=$1", [workflowAck.id]);
  assert.deepEqual(workflowAckResumption.rows[0], { outcome: "ACKNOWLEDGED_FOR_REVIEW", work_id: "founder-workflow-ack-001" });

  const workflowHold = await insertRequest({ workId: "founder-workflow-hold-001", cap: "1".repeat(64), label: "Workflow HOLD" });
  const workflowHoldResult = await runWorkflowWithFounderSave(workflowHold, "1".repeat(64), "HOLD");
  assert.equal(workflowHoldResult.result.status, "HOLD");
  const workflowHoldResumption = await db.query("select outcome, work_id from public.operating_resumptions_v1 where request_id=$1", [workflowHold.id]);
  assert.deepEqual(workflowHoldResumption.rows[0], { outcome: "HOLD", work_id: "founder-workflow-hold-001" });

  const workflowExpired = await insertRequest({ workId: "founder-workflow-expired-001", cap: "2".repeat(64), expires: "now() + interval '0.1 seconds'", label: "Workflow expired" });
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.equal((await runWorkflowTerminal(workflowExpired, "2".repeat(64))).status, "HOLD_EXPIRED");

  const workflowRevoked = await insertRequest({ workId: "founder-workflow-revoked-001", cap: "3".repeat(64), label: "Workflow revoked" });
  await asRole("authenticated", founder, () => db.query("select public.record_operating_decision_v1($1,$2,$3,'ACKNOWLEDGE',$4)", [workflowRevoked.id, workflowRevoked.review_sha256, workflowRevoked.artifact_sha256, randomUUID()]));

  await expectReject(() => db.query("update public.operating_decision_requests_v1 set work_id = 'changed-work' where id = $1", [request.id]), /immutable/i);
  await expectReject(() => db.query("delete from public.operating_decisions_v1 where id = $1", [decision.decision_id]), /immutable/i);
  const expiring = await insertRequest({ workId: "operating-expired-001", cap: "e".repeat(64), expires: "now() + interval '0.1 seconds'", label: "Expired" });
  await new Promise((resolve) => setTimeout(resolve, 150));
  await asRole("authenticated", founder, () => expectReject(() => db.query("select public.record_operating_decision_v1($1,$2,$3,'HOLD',$4)", [expiring.id, expiring.review_sha256, expiring.artifact_sha256, randomUUID()]), /expired/i));

  await db.exec("begin");
  const transactionExpired = await insertRequest({ workId: "operating-transaction-expired-001", cap: "4".repeat(64), expires: "clock_timestamp() + interval '0.1 seconds'", label: "Transaction expiry" });
  await new Promise((resolve) => setTimeout(resolve, 150));
  await db.exec(`select set_config('request.jwt.claim.sub', '${founder}', false); set role authenticated; savepoint expiry_regression;`);
  await expectReject(() => db.query("select public.record_operating_decision_v1($1,$2,$3,'HOLD',$4)", [transactionExpired.id, transactionExpired.review_sha256, transactionExpired.artifact_sha256, randomUUID()]), /expired/i);
  await db.exec("rollback to savepoint expiry_regression; reset role;");
  await db.exec("rollback");

  await db.query("update public.operating_approvers_v1 set enabled = false where user_id = $1", [founder]);
  assert.equal((await runWorkflowTerminal(workflowRevoked, "3".repeat(64))).status, "HOLD_REVOKED");
  await asRole("anon", null, async () => {
    const revoked = await db.query("select public.read_operating_decision_v1($1,$2) as receipt", [request.id, capability]);
    assert.equal(revoked.rows[0].receipt.status, "REVOKED");
    await expectReject(() => db.query("select public.record_operating_resumption_v1($1,$2,$3,$4,$5)", [request.id, capability, decision.decision_id, "operating-pilot-001", "ACKNOWLEDGED_FOR_REVIEW"]), /invalid-operating-capability/i);
  });

  await expectReject(() => db.exec(migration), /already exists|relation .* exists/i);
  await db.exec("rollback");
  const tables = await db.query("select count(*)::int as count from pg_tables where schemaname='public' and tablename like 'operating_%_v1'");
  assert.equal(tables.rows[0].count, 4);
  console.log("OPERATING DECISIONS DATABASE PASS");
  console.log("calibration=anon/non-founder/direct-table/wrong-hash/action/conflict/expired/capability-cross-request/resumption-mismatch/revocation rejected");
} finally {
  await db.close();
}
