#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { advanceStoryRecovery, completePublication, selectNextRecovery, registerAssembledOrdinaryCandidate, writeRecoveryQueueAtomically } from "./advance-newsstand-story-recovery.mjs";

const hash = character => character.repeat(64);
const base = { schema: "laidies.newsstand-story-recovery.v1", candidateId: "model-release-reader-fit", producerPrincipal: "newsstand-producer-r1", sourceIdentitySha256: hash("a"), artifactSha256: hash("b"), status: "AWAITING_INDEPENDENT_REVIEW", active: true, consequencePriority: 3, firstSeenAt: "2026-09-04T07:00:00-07:00", attempts: [], unresolvedDefects: [], nextAction: "RUN_INDEPENDENT_REVIEW", terminalDisposition: null };
const review = (overrides = {}) => ({ schema: "laidies.newsstand-independent-review.v1", independent: true, reviewerPrincipal: "independent-editorial-r1", artifactSha256: hash("b"), reviewedAt: "2026-09-04T08:00:00-07:00", verdict: "HOLD", defects: [{ id: "reader-fit-missing", description: "The story does not explain who should use the model or the nearest alternative.", repairability: "REPAIRABLE" }], ...overrides });

const repair = advanceStoryRecovery(base, review());
assert.equal(repair.status, "REPAIR_REQUIRED");
assert.equal(repair.active, true);
assert.equal(repair.nextAction, "REDRAFT_ONLY_THE_EXACT_FAILED_REQUIREMENTS");

const repeated = advanceStoryRecovery({ ...repair, artifactSha256: hash("c") }, review({ artifactSha256: hash("c"), reviewerPrincipal: "independent-editorial-r2", reviewedAt: "2026-09-04T09:00:00-07:00" }));
assert.equal(repeated.status, "SYSTEM_REPAIR_REQUIRED");
assert.deepEqual(repeated.repeatedDefectIds, ["reader-fit-missing"]);

const evidence = advanceStoryRecovery(base, review({ defects: [{ id: "missing-primary-source", description: "The claimed access tier has no current official source.", repairability: "EVIDENCE_REQUIRED" }] }));
assert.equal(evidence.status, "EVIDENCE_BLOCKED");
assert.equal(evidence.active, true);
assert.equal(evidence.nextAction, "RECHECK_EXACT_SOURCES_NEXT_CYCLE");
const heldAgain = advanceStoryRecovery({ ...base, newEvidenceAvailable: true, nextCheckAt: "2026-12-01T14:00:00Z" }, review({ defects: [{ id: "still-missing-source", description: "The new document still does not support the claim.", repairability: "EVIDENCE_REQUIRED" }] }));
assert.equal(heldAgain.newEvidenceAvailable, false, "a fresh evidence hold clears the consumed signal");
assert.equal(heldAgain.nextCheckAt, undefined, "a fresh evidence hold cannot inherit an obsolete defer date");

const selected = selectNextRecovery({ schema: "laidies.newsstand-story-recovery-queue.v1", items: [{ ...evidence, consequencePriority: 3, firstSeenAt: "2026-09-03T07:00:00-07:00" }, { ...repeated, candidateId: "older-repair", consequencePriority: 2, firstSeenAt: "2026-09-02T07:00:00-07:00" }] });
assert.equal(selected.status, "ACTIVE_RECOVERY_MUST_CONTINUE");
assert.equal(selected.quietAllowed, false);
assert.equal(selected.candidate.candidateId, "older-repair");

const clock = "2026-09-05T14:00:00Z";
const waiting = { ...evidence, candidateId: "waiting-for-paper", newEvidenceAvailable: false, nextCheckAt: "2026-09-06T14:00:00Z" };
const queue = items => ({ schema: "laidies.newsstand-story-recovery-queue.v1", items });
const futureOnly = selectNextRecovery(queue([waiting]), { now: clock });
assert.equal(futureOnly.status, "EVIDENCE_WAIT", "not-yet-due evidence cannot claim the production slot");
assert.equal(futureOnly.candidate, null);
assert.equal(futureOnly.quietAllowed, false, "waiting is still HOLD, not quiet");
assert.equal(futureOnly.activeCount, 1);
assert.deepEqual(futureOnly.evidenceRechecks, []);
assert.equal(futureOnly.nextEvidenceCheckAt, waiting.nextCheckAt);
assert.equal(selectNextRecovery(queue([waiting, repair]), { now: clock }).candidate.candidateId, repair.candidateId, "waiting evidence must not displace an actionable repair");
const due = selectNextRecovery(queue([waiting]), { now: waiting.nextCheckAt });
assert.equal(due.status, "EVIDENCE_RECHECK_DUE");
assert.equal(due.candidate, null, "a source recheck does not yet justify redrafting");
assert.deepEqual(due.evidenceRechecks.map(item => item.candidateId), [waiting.candidateId]);
assert.equal(due.quietAllowed, false);
const newlyAvailable = selectNextRecovery(queue([{ ...waiting, newEvidenceAvailable: true }]), { now: clock });
assert.equal(newlyAvailable.status, "ACTIVE_RECOVERY_MUST_CONTINUE");
assert.equal(newlyAvailable.candidate.candidateId, waiting.candidateId, "new evidence makes the story actionable before its scheduled check");
const legacy = { ...evidence }; delete legacy.nextCheckAt; delete legacy.newEvidenceAvailable;
assert.equal(selectNextRecovery(queue([legacy]), { now: clock }).status, "EVIDENCE_RECHECK_DUE", "legacy holds require a source check, never silent deferral");
const dueAlongsideRepair = selectNextRecovery(queue([legacy, repair]), { now: clock });
assert.equal(dueAlongsideRepair.candidate.candidateId, repair.candidateId);
assert.equal(dueAlongsideRepair.evidenceRechecks.length, 1, "due evidence checks stay visible while another story progresses");
assert.throws(() => selectNextRecovery(queue([waiting]), { now: "not a date" }), /invalid recovery selection time/);
assert.throws(() => selectNextRecovery(queue([{ ...waiting, nextCheckAt: "not a date" }]), { now: clock }), /invalid evidence nextCheckAt/);
for (const nextCheckAt of ["2026-02-30T14:00:00Z", "2026-09-06T24:00:00Z", "2026-09-06T14:00:00", "2026-09-06", null]) {
  assert.throws(() => selectNextRecovery(queue([{ ...waiting, nextCheckAt }]), { now: clock }), /invalid evidence nextCheckAt/);
}
assert.equal(selectNextRecovery(queue([waiting]), { now: "2026-09-06T07:00:00-07:00" }).status, "EVIDENCE_RECHECK_DUE", "offset timestamps compare as instants");
assert.throws(() => selectNextRecovery(queue([{ ...waiting, newEvidenceAvailable: "false" }]), { now: clock }), /newEvidenceAvailable must be boolean/);
assert.throws(() => selectNextRecovery(queue([{ ...waiting, active: "true" }]), { now: clock }), /active must be boolean/);
assert.throws(() => selectNextRecovery(queue([{ ...waiting, status: "TYPO_STATUS" }]), { now: clock }), /unknown active recovery status/, "an unrecognized active state must not become quiet");
assert.equal(waiting.nextCheckAt, "2026-09-06T14:00:00Z", "selection does not mutate the queue");

const passed = advanceStoryRecovery({ ...base, artifactSha256: hash("d") }, review({ artifactSha256: hash("d"), verdict: "PASS", defects: [] }));
assert.equal(passed.status, "READY_FOR_ADMISSION");
const published = completePublication(passed, { schema: "laidies.newsstand-publication-verification.v1", deploymentId: "deployment-1", immutableUrl: "https://immutable.example/newsstand", customUrl: "https://laidies.ai/newsstand", artifactIdentitySha256: hash("e"), customAndImmutableMatch: true, readerJourneyPassed: true, verifiedAt: "2026-09-04T10:00:00-07:00" });
assert.equal(published.status, "PUBLISHED_VERIFIED");
assert.equal(published.active, false);

const rejected = advanceStoryRecovery(base, review({ verdict: "REJECT", defects: [{ id: "duplicate", description: "This is already covered by the named current story.", repairability: "IRREDUCIBLE" }], terminalDisposition: "DUPLICATE_OF_NAMED_STORY", terminalReason: "Duplicate of model-release-existing" }));
assert.equal(rejected.status, "TERMINAL_REJECTED");
assert.equal(rejected.terminalDisposition, "DUPLICATE_OF_NAMED_STORY");

assert.throws(() => advanceStoryRecovery(base, review({ artifactSha256: hash("f") })), /stale review/);
assert.throws(() => advanceStoryRecovery(base, review({ independent: false })), /independently produced/);
assert.throws(() => advanceStoryRecovery(base, review({ reviewerPrincipal: "newsstand-producer-r1" })), /cannot approve its own repair/);
assert.throws(() => advanceStoryRecovery(repair, review({ reviewerPrincipal: "independent-editorial-r2", reviewedAt: "2026-09-04T08:30:00-07:00" })), /unchanged artifact cannot be reviewed twice/);
assert.throws(() => completePublication(passed, { schema: "laidies.newsstand-publication-verification.v1" }), /deployment id/);
assert.deepEqual(selectNextRecovery({ schema: "laidies.newsstand-story-recovery-queue.v1", items: [published, rejected] }), { status: "NO_ACTIVE_RECOVERY", quietAllowed: true, candidate: null, activeCount: 0 });

// Assembled ordinary routing fixtures: no actual editor, queue or site writes.
const bind = (name, c = "a") => ({path: `operations/product-stewards/newsstand/candidates/fixture/${name}.json`, sha256: hash(c)});
const assembled = {schemaVersion: "newsstand-ordinary-story-candidate-v2", candidateStatus: "READY_FOR_ISSUE_ADMISSION", candidateId: "assembled-fixture", story: {id: "assembled-fixture", slug: "assembled-fixture", lastCheckedAt: clock}, sourceText: bind("text", "b"), claimMap: bind("claims", "c"), sources: [{id: "source-1", url: "https://fixture.invalid/source", evidence: bind("source", "d")}], reviewEvidence: {independent: bind("review", "e"), independentRawReport: bind("raw", "f")}};
const assembledReceipt = {schemaVersion: "laidies-prose-quality-review.v1", stage: "INDEPENDENT_SEMANTIC_ADMISSION", verdict: "PASS", candidateId: assembled.candidateId, maker: "fixture-producer", reviewer: {principalId: "fixture-independent", independentFromMaker: true, artifactFirst: true}, reviewedAt: clock, artifact: {reviewText: assembled.sourceText}, reportBinding: assembled.reviewEvidence.independentRawReport};
const routingOptions = {candidateBinding: bind("candidate"), now: clock};
const canonical = {stories: []};
const register = (q = queue([published, repair]), c = assembled, r = assembledReceipt, dataset = canonical, options = routingOptions) => registerAssembledOrdinaryCandidate(q, c, r, dataset, options);
const registered = register();
assert.equal(registered.changed, true);
assert.equal(registered.queue.items.at(-1).status, "READY_FOR_ADMISSION");
assert.equal(registered.queue.items.at(-1).attempts.length, 1);
assert.deepEqual(registered.queue.items.slice(0, 2), [published, repair], "existing closed and active histories preserved");
assert.equal(selectNextRecovery(registered.queue).quietAllowed, false, "a ready assembled story cannot disappear into quiet");
const rerun = register(registered.queue);
assert.equal(rerun.changed, false);
assert.equal(JSON.stringify(rerun.queue), JSON.stringify(registered.queue), "exact repeated registration preserves queue bytes");
for (const mutate of [
 c => {c.sources[0].evidence.sha256=hash("1")},
 c => {c.reviewEvidence.independent.sha256=hash("2")},
 c => {c.claimMap.sha256=hash("3")}
]) {
 const changed=structuredClone(assembled);mutate(changed);
 assert.throws(()=>register(registered.queue,changed),/preserve differing recovery/);
}
const newProse=structuredClone(assembled);newProse.sourceText=bind("new-prose","4");
assert.throws(()=>register(registered.queue,newProse),/review text differs/);
const newReviewer=structuredClone(assembledReceipt);newReviewer.reviewer.principalId="different-reviewer";
assert.throws(()=>register(registered.queue,assembled,newReviewer),/preserve differing recovery/);
for(const status of ["PUBLISHED_VERIFIED","TERMINAL_REJECTED","REPAIR_REQUIRED"]){
 const other=structuredClone(registered.queue);other.items.at(-1).status=status;
 assert.throws(()=>register(other),/preserve existing recovery decision/);
}
assert.throws(()=>register(queue([]),assembled,assembledReceipt,{stories:[{id:assembled.candidateId}]}),/already exists in canonical/);
assert.throws(()=>register(queue([]),assembled,assembledReceipt,{}),/current canonical stories/);
assert.throws(()=>register(queue([]),assembled,assembledReceipt,{stories:[],publications:{daily:{issue:{storyIds:[assembled.candidateId]}}}}),/current canonical issue/);
assert.throws(()=>register(queue([]),{...assembled,candidateStatus:"HOLD"}),/not assembled ordinary/);
assert.throws(()=>register(queue([]),assembled,{...assembledReceipt,verdict:"HOLD"}),/receipt must pass/);
const selfReviewer=structuredClone(assembledReceipt);selfReviewer.reviewer.principalId=selfReviewer.maker;
assert.throws(()=>register(queue([]),assembled,selfReviewer),/reviewer must be independent/);
assert.throws(()=>register(queue([]),assembled,{...assembledReceipt,reviewedAt:"2026-09-06T14:00:00Z"}),/review is in the future/);
assert.throws(()=>register(queue([]),assembled,assembledReceipt,canonical,{...routingOptions,candidateBinding:{path:"../outside.json",sha256:hash("a")}}),/exact private bindings/);
assert.equal(queue([]).items.length,0,"registration does not mutate its input");

const writeFixture = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-queue-write-"));
const queuePath = path.join(writeFixture, "queue.json"), oldBytes = Buffer.from("old queue\n");
const oldRandomUUID = crypto.randomUUID;
try {
  fs.writeFileSync(queuePath, oldBytes);
  crypto.randomUUID = () => "collision-fixture";
  const stalePath = queuePath + ".assembly-collision-fixture.tmp";
  fs.writeFileSync(stalePath, "preserve this earlier file");
  assert.throws(() => writeRecoveryQueueAtomically(queuePath, oldBytes, "new queue\n"), /EEXIST/);
  assert.equal(fs.readFileSync(stalePath,"utf8"), "preserve this earlier file", "failed exclusive create must not delete somebody else's file");
  assert.ok(fs.readFileSync(queuePath).equals(oldBytes));
  assert.equal(fs.existsSync(queuePath+".assembly.lock"), false, "owned lock released after collision");
  crypto.randomUUID = oldRandomUUID;
  assert.throws(() => writeRecoveryQueueAtomically(queuePath, Buffer.from("outdated snapshot"), "new queue\n"), /changed during registration/);
  assert.ok(fs.readFileSync(queuePath).equals(oldBytes));
  writeRecoveryQueueAtomically(queuePath, oldBytes, "new queue\n");
  assert.equal(fs.readFileSync(queuePath,"utf8"), "new queue\n");
  fs.writeFileSync(queuePath+".assembly.lock", "another writer");
  assert.throws(() => writeRecoveryQueueAtomically(queuePath, Buffer.from("new queue\n"), "third queue"), /EEXIST/);
  assert.equal(fs.readFileSync(queuePath+".assembly.lock","utf8"), "another writer", "foreign lock preserved");
} finally {
  crypto.randomUUID = oldRandomUUID;
  fs.rmSync(writeFixture, {recursive:true,force:true});
}

console.log("NEWSSTAND STORY RECOVERY PASS repair=1 repeated_system_repair=1 evidence_persists=1 queue_preempts_quiet=1 due_evidence_separate_from_production=1 waiting_never_quiet=1 new_evidence_resumes=1 malformed_schedule_rejected=1 publication_state_transition=1 terminal_record=1 stale_or_self_review_rejected=1 assembled_ready_registered=1 repeated_registration_byte_stable=1 newer_or_published_queue_preserved=1 invalid_assembly_rejected=1");
