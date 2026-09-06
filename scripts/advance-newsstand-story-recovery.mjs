#!/usr/bin/env node

import fs from "node:fs";
import crypto from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const policy = JSON.parse(fs.readFileSync(path.resolve(directory, "../operations/product-stewards/newsstand/story-recovery-policy.json"), "utf8"));
const HASH = /^[a-f0-9]{64}$/;
const ACTIVE = new Set(policy.activeStatuses);
const TERMINAL = new Set(policy.terminalDispositions);

function requireValue(condition, message) { if (!condition) throw new Error(message); }
function copy(value) { return JSON.parse(JSON.stringify(value)); }

function recoveryTimestamp(value, message) {
  const format = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
  requireValue(typeof value === "string" && format.test(value), message);
  const time = Date.parse(value), day = Date.parse(`${value.slice(0, 10)}T00:00:00Z`);
  requireValue(Number.isFinite(time) && Number.isFinite(day) &&
    new Date(day).toISOString().slice(0, 10) === value.slice(0, 10) && Number(value.slice(11, 13)) < 24, message);
  return time;
}

function validState(state) {
  requireValue(state?.schema === "laidies.newsstand-story-recovery.v1", "invalid recovery state schema");
  requireValue(typeof state.candidateId === "string" && state.candidateId.trim(), "missing candidateId");
  requireValue(typeof state.producerPrincipal === "string" && state.producerPrincipal.trim(), "missing producer principal");
  requireValue(HASH.test(state.sourceIdentitySha256 || ""), "invalid source identity");
  requireValue(HASH.test(state.artifactSha256 || ""), "invalid artifact identity");
  requireValue(typeof state.status === "string", "missing recovery status");
  requireValue(Array.isArray(state.attempts), "recovery attempts must be an array");
  return state;
}

function validReview(review, state) {
  requireValue(review?.schema === "laidies.newsstand-independent-review.v1", "invalid review schema");
  requireValue(review.independent === true, "review must be independently produced");
  requireValue(typeof review.reviewerPrincipal === "string" && review.reviewerPrincipal.trim(), "missing reviewer principal");
  requireValue(review.reviewerPrincipal !== state.producerPrincipal, "producer cannot approve its own repair");
  requireValue(HASH.test(review.artifactSha256 || ""), "invalid reviewed artifact identity");
  requireValue(review.artifactSha256 === state.artifactSha256, "stale review does not match current artifact");
  requireValue(["PASS", "HOLD", "REJECT"].includes(review.verdict), "invalid review verdict");
  requireValue(typeof review.reviewedAt === "string" && !Number.isNaN(Date.parse(review.reviewedAt)), "invalid reviewedAt");
  requireValue(Array.isArray(review.defects), "review defects must be an array");
  if (review.verdict === "PASS") requireValue(review.defects.length === 0, "PASS review cannot contain defects");
  if (review.verdict !== "PASS") requireValue(review.defects.length > 0, "failed review must name at least one exact defect");
  for (const defect of review.defects) {
    requireValue(typeof defect.id === "string" && defect.id.trim(), "defect missing stable id");
    requireValue(typeof defect.description === "string" && defect.description.trim(), "defect missing description");
    requireValue(["REPAIRABLE", "EVIDENCE_REQUIRED", "IRREDUCIBLE"].includes(defect.repairability), "defect missing repairability");
  }
}

function defectCounts(attempts) {
  const counts = new Map();
  for (const attempt of attempts) for (const defect of attempt.defects || []) counts.set(defect.id, (counts.get(defect.id) || 0) + 1);
  return counts;
}

export function advanceStoryRecovery(inputState, review) {
  const state = copy(validState(inputState));
  validReview(review, state);
  requireValue(!state.attempts.some(attempt => attempt.artifactSha256 === review.artifactSha256), "unchanged artifact cannot be reviewed twice");
  state.attempts.push({ artifactSha256: review.artifactSha256, reviewerPrincipal: review.reviewerPrincipal, reviewedAt: review.reviewedAt, verdict: review.verdict, defects: review.defects });
  state.lastReviewedAt = review.reviewedAt;

  if (review.verdict === "PASS") {
    state.status = "READY_FOR_ADMISSION";
    state.active = true;
    state.unresolvedDefects = [];
    state.nextAction = "COMPOSE_AND_ADMIT_EXACT_ARTIFACT";
    state.terminalDisposition = null;
    return state;
  }

  state.unresolvedDefects = review.defects;
  state.active = true;
  state.terminalDisposition = null;
  const irreducible = review.defects.filter(defect => defect.repairability === "IRREDUCIBLE");
  if (irreducible.length) {
    requireValue(TERMINAL.has(review.terminalDisposition), "irreducible rejection requires an allowed durable terminal disposition");
    requireValue(typeof review.terminalReason === "string" && review.terminalReason.trim(), "irreducible rejection requires a terminal reason");
    state.status = "TERMINAL_REJECTED";
    state.active = false;
    state.nextAction = "RETAIN_TERMINAL_RECORD";
    state.terminalDisposition = review.terminalDisposition;
    state.terminalReason = review.terminalReason;
    return state;
  }

  if (review.defects.some(defect => defect.repairability === "EVIDENCE_REQUIRED")) {
    state.status = "EVIDENCE_BLOCKED";
    state.nextAction = "RECHECK_EXACT_SOURCES_NEXT_CYCLE";
    state.newEvidenceAvailable = false;
    delete state.nextCheckAt;
    return state;
  }

  const counts = defectCounts(state.attempts);
  const repeated = review.defects.filter(defect => (counts.get(defect.id) || 0) >= policy.identicalDefectSystemRepairThreshold);
  if (repeated.length) {
    state.status = "SYSTEM_REPAIR_REQUIRED";
    state.nextAction = "REPAIR_PRODUCER_OR_REVIEW_CONTRACT_THEN_REDRAFT";
    state.repeatedDefectIds = repeated.map(defect => defect.id).sort();
  } else {
    state.status = "REPAIR_REQUIRED";
    state.nextAction = "REDRAFT_ONLY_THE_EXACT_FAILED_REQUIREMENTS";
    state.repeatedDefectIds = [];
  }
  return state;
}

export function selectNextRecovery(queue, { now = Date.now() } = {}) {
  requireValue(queue?.schema === "laidies.newsstand-story-recovery-queue.v1", "invalid recovery queue schema");
  requireValue(Array.isArray(queue.items), "recovery queue items must be an array");
  const selectedAt = typeof now === "number" ? now : recoveryTimestamp(now, "invalid recovery selection time");
  requireValue(Number.isFinite(new Date(selectedAt).getTime()), "invalid recovery selection time");
  const order = new Map(policy.selectionOrder.map((status, index) => [status, index]));
  for (const item of queue.items) requireValue(item && typeof item.active === "boolean", "recovery queue active must be boolean");
  const active = queue.items.filter(item => item?.active === true);
  for (const item of active) requireValue(ACTIVE.has(item.status), `unknown active recovery status: ${item.status}`);
  if (!active.length) return { status: "NO_ACTIVE_RECOVERY", quietAllowed: true, candidate: null, activeCount: 0 };
  const actionable = [], evidenceRechecks = [], deferred = [];
  for (const item of active) {
    if (item.status !== "EVIDENCE_BLOCKED") { actionable.push(item); continue; }
    requireValue(item.newEvidenceAvailable === undefined || typeof item.newEvidenceAvailable === "boolean", "newEvidenceAvailable must be boolean");
    const nextCheck = item.nextCheckAt === undefined ? null : recoveryTimestamp(item.nextCheckAt, "invalid evidence nextCheckAt");
    if (item.newEvidenceAvailable === true) actionable.push(item);
    else if (nextCheck === null || nextCheck <= selectedAt) evidenceRechecks.push(item);
    else deferred.push(item);
  }
  const rank = (left, right) => (order.get(left.status) - order.get(right.status)) || ((right.consequencePriority || 0) - (left.consequencePriority || 0)) || String(left.firstSeenAt).localeCompare(String(right.firstSeenAt)) || left.candidateId.localeCompare(right.candidateId);
  actionable.sort(rank);
  evidenceRechecks.sort(rank);
  deferred.sort((left, right) => Date.parse(left.nextCheckAt) - Date.parse(right.nextCheckAt) || rank(left, right));
  return {
    status: actionable.length ? "ACTIVE_RECOVERY_MUST_CONTINUE" : evidenceRechecks.length ? "EVIDENCE_RECHECK_DUE" : "EVIDENCE_WAIT",
    quietAllowed: false, candidate: actionable[0] || null, activeCount: active.length,
    evidenceRechecks, nextEvidenceCheckAt: deferred[0]?.nextCheckAt || null
  };
}

export function writeRecoveryQueueAtomically(queuePath, expectedRaw, nextRaw) {
  const lockPath = queuePath + ".assembly.lock";
  const lock = fs.openSync(lockPath, "wx");
  const temporary = queuePath + `.assembly-${crypto.randomUUID()}.tmp`;
  let temporaryOwned = false;
  try {
    requireValue(fs.readFileSync(queuePath).equals(expectedRaw), "Recovery queue changed during registration; retry against current state");
    const file = fs.openSync(temporary, "wx");
    temporaryOwned = true;
    try { fs.writeFileSync(file, nextRaw); } finally { fs.closeSync(file); }
    requireValue(fs.readFileSync(queuePath).equals(expectedRaw), "Recovery queue changed before registration write");
    fs.renameSync(temporary, queuePath);
    temporaryOwned = false;
  } finally {
    if (temporaryOwned && fs.existsSync(temporary)) fs.unlinkSync(temporary);
    fs.closeSync(lock); fs.unlinkSync(lockPath);
  }
}

// Routing only: the assembler must validate the complete candidate/review chain
// before calling this. Registration grants neither issue admission nor release.
export function registerAssembledOrdinaryCandidate(queue, candidate, receipt, currentDataset, { candidateBinding, now = new Date().toISOString() } = {}) {
  requireValue(queue?.schema === "laidies.newsstand-story-recovery-queue.v1" && Array.isArray(queue.items), "invalid recovery queue schema");
  requireValue(candidate?.schemaVersion === "newsstand-ordinary-story-candidate-v2" && candidate.candidateStatus === "READY_FOR_ISSUE_ADMISSION", "candidate is not assembled ordinary news");
  requireValue(receipt?.schemaVersion === "laidies-prose-quality-review.v1" && receipt.stage === "INDEPENDENT_SEMANTIC_ADMISSION" && receipt.verdict === "PASS", "assembled independent receipt must pass");
  requireValue(candidate.candidateId === receipt.candidateId && candidate.story?.id === candidate.candidateId, "assembled candidate identity differs");
  requireValue(receipt.reviewer?.independentFromMaker === true && receipt.reviewer?.artifactFirst === true && receipt.reviewer?.principalId && receipt.reviewer.principalId !== receipt.maker, "assembled reviewer must be independent");
  const bound = value => value && typeof value.path === "string" && value.path.startsWith("operations/product-stewards/") && !value.path.split("/").includes("..") && HASH.test(value.sha256 || "");
  for (const value of [candidateBinding, candidate.sourceText, candidate.claimMap, candidate.reviewEvidence?.independent, candidate.reviewEvidence?.independentRawReport]) requireValue(bound(value), "assembled registration requires exact private bindings");
  requireValue(isDeepStrictEqual(candidate.sourceText, receipt.artifact?.reviewText), "assembled review text differs");
  requireValue(isDeepStrictEqual(candidate.reviewEvidence.independentRawReport, receipt.reportBinding), "assembled raw report differs");
  requireValue(Array.isArray(candidate.sources) && candidate.sources.length > 0 && candidate.sources.every(source => source.id && source.url && bound(source.evidence)), "assembled source evidence is missing");
  requireValue(recoveryTimestamp(receipt.reviewedAt, "invalid assembled review time") <= recoveryTimestamp(now, "invalid registration time"), "assembled review is in the future");
  requireValue(Array.isArray(currentDataset?.stories), "current canonical stories are required for registration");
  requireValue(!currentDataset.stories.some(story => story.id === candidate.candidateId || story.slug === candidate.story.slug), "candidate already exists in canonical stories; reconcile publication instead");
  requireValue(!(currentDataset.publications?.daily?.issue?.storyIds || []).includes(candidate.candidateId), "candidate already exists in current canonical issue; reconcile publication instead");
  const sourceIdentitySha256 = crypto.createHash("sha256").update(JSON.stringify({ sources: candidate.sources, claimMap: candidate.claimMap })).digest("hex");
  const identity = { sourceIdentitySha256, artifactSha256: candidate.sourceText.sha256, reviewerPrincipal: receipt.reviewer.principalId, independentReceipt: copy(candidate.reviewEvidence.independent), independentRawReport: copy(candidate.reviewEvidence.independentRawReport) };
  const matches = queue.items.filter(item => item.candidateId === candidate.candidateId);
  requireValue(matches.length <= 1, "duplicate existing recovery candidate identity");
  const existing = matches[0];
  if (existing) {
    requireValue(existing.active === true && existing.status === "READY_FOR_ADMISSION", "preserve existing recovery decision; explicit reconciliation required");
    requireValue(isDeepStrictEqual(existing.assembledReviewIdentity, identity), "preserve differing recovery evidence or review; explicit reconciliation required");
    return { queue: copy(queue), changed: false, status: "ALREADY_REGISTERED", candidateId: candidate.candidateId };
  }
  const state = {
    schema: "laidies.newsstand-story-recovery.v1", candidateId: candidate.candidateId,
    producerPrincipal: receipt.maker, sourceIdentitySha256, artifactSha256: candidate.sourceText.sha256,
    status: "READY_FOR_ADMISSION", active: true, consequencePriority: 0,
    firstSeenAt: candidate.story.lastCheckedAt, lastReviewedAt: receipt.reviewedAt,
    attempts: [{ artifactSha256: candidate.sourceText.sha256, reviewerPrincipal: receipt.reviewer.principalId, reviewedAt: receipt.reviewedAt, verdict: "PASS", defects: [], independentReceipt: copy(candidate.reviewEvidence.independent), independentRawReport: copy(candidate.reviewEvidence.independentRawReport) }],
    unresolvedDefects: [], nextAction: "COMPOSE_AND_ADMIT_EXACT_ARTIFACT", terminalDisposition: null,
    assembledCandidate: copy(candidateBinding), assembledReviewIdentity: identity,
    registrationBoundary: "Validated assembled candidate only. Recheck actual freshness and edition date before issue admission; no publication or next-day approval."
  };
  validState(state);
  const updated = copy(queue); updated.items.push(state); updated.updatedAt = now;
  return { queue: updated, changed: true, status: "REGISTERED_READY", candidateId: candidate.candidateId };
}

export function completePublication(inputState, receipt) {
  const state = copy(validState(inputState));
  requireValue(state.status === "READY_FOR_ADMISSION", "story is not ready for publication");
  requireValue(receipt?.schema === "laidies.newsstand-publication-verification.v1", "invalid publication receipt schema");
  requireValue(typeof receipt.deploymentId === "string" && receipt.deploymentId.trim(), "missing deployment id");
  requireValue(/^https:\/\//.test(receipt.immutableUrl || "") && /^https:\/\//.test(receipt.customUrl || ""), "missing public origins");
  requireValue(HASH.test(receipt.artifactIdentitySha256 || ""), "invalid publication artifact identity");
  requireValue(receipt.customAndImmutableMatch === true, "public origins do not match");
  requireValue(receipt.readerJourneyPassed === true, "reader journey did not pass");
  requireValue(typeof receipt.verifiedAt === "string" && !Number.isNaN(Date.parse(receipt.verifiedAt)), "invalid public verification time");
  state.status = "PUBLISHED_VERIFIED";
  state.active = false;
  state.nextAction = "MONITOR_CORRECTIONS";
  state.published = receipt;
  return state;
}

function readJson(file) { return JSON.parse(fs.readFileSync(path.resolve(file), "utf8")); }
const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const [command, statePath, evidencePath] = process.argv.slice(2);
  try {
    if (command === "review") console.log(JSON.stringify(advanceStoryRecovery(readJson(statePath), readJson(evidencePath)), null, 2));
    else if (command === "select") console.log(JSON.stringify(selectNextRecovery(readJson(statePath)), null, 2));
    else if (command === "publish") console.log(JSON.stringify(completePublication(readJson(statePath), readJson(evidencePath)), null, 2));
    else throw new Error("Usage: advance-newsstand-story-recovery.mjs review <state.json> <review.json> | select <queue.json> | publish <state.json> <receipt.json>");
  } catch (error) {
    console.error(`NEWSSTAND STORY RECOVERY HOLD: ${error.message}`);
    process.exitCode = 1;
  }
}
