#!/usr/bin/env node

import assert from "node:assert/strict";
import { advanceStoryRecovery, completePublication, selectNextRecovery } from "./advance-newsstand-story-recovery.mjs";

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

const selected = selectNextRecovery({ schema: "laidies.newsstand-story-recovery-queue.v1", items: [{ ...evidence, consequencePriority: 3, firstSeenAt: "2026-09-03T07:00:00-07:00" }, { ...repeated, candidateId: "older-repair", consequencePriority: 2, firstSeenAt: "2026-09-02T07:00:00-07:00" }] });
assert.equal(selected.status, "ACTIVE_RECOVERY_MUST_CONTINUE");
assert.equal(selected.quietAllowed, false);
assert.equal(selected.candidate.candidateId, "older-repair");

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

console.log("NEWSSTAND STORY RECOVERY PASS repair=1 repeated_system_repair=1 evidence_persists=1 queue_preempts_quiet=1 exact_pass_to_publication=1 terminal_record=1 stale_or_self_review_rejected=1");
