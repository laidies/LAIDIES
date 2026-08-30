#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { prepareServiceBankProposal, reviewedContentSha256 } from "./prepare-newsstand-service-bank.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-service-bank-"));
const date = "2026-08-31";
const types = ["paige_tip", "career_life", "concept_week", "mme_claio", "dear_miss_jeeves", "whats_new_sunnyvaile", "crossword", "did_you_know"];
fs.writeFileSync(path.join(root, "source.md"), "bound source\n");
fs.mkdirSync(path.join(root, "review"));
for (const gate of ["accuracy", "editorial", "voice", "format", "owner", "safety"]) fs.writeFileSync(path.join(root, "review", `${gate}.md`), `${gate}\n`);
const hash = crypto.createHash("sha256").update("bound source\n").digest("hex");
const item = (type, id, overrides = {}) => {
  const base = { id, type, classification: "sourced_service", headline: `${type} headline`, summary: `${type} summary`, body: [`${type} body`], sourceLinks: [{ label: "Source", url: "https://example.com/source" }], destination: "/library.html", destinationLabel: "Read more", sourcePath: "source.md", sourceId: `SRC-${id}`, sourceSha256: hash, owner: "newsstand", freshness: { lastCheckedAt: date, expiresAt: "2026-09-30", recheckTriggers: ["source changes"] }, status: "CANDIDATE", publicEligibility: "INELIGIBLE", reviewEvidence: { accuracy: "review/accuracy.md", editorial: "review/editorial.md", voice: "review/voice.md", format: "review/format.md", owner: "review/owner.md", safety: type === "mme_claio" ? "review/safety.md" : null }, ...(type === "whats_new_sunnyvaile" ? { eventDate: "2026-08-24", availableUntil: "2026-09-06" } : {}), ...overrides };
  return { ...base, reviewedContentSha256: reviewedContentSha256(base) };
};
const bank = { schemaVersion: "newsstand-service-bank-v1", updatedAt: date, requiredTypes: types, items: types.map((type) => item(type, `${type}-one`)) };
const first = prepareServiceBankProposal({ date, bank, root });
const second = prepareServiceBankProposal({ date, bank, root });
assert.deepEqual(first, second, "same private bank inputs must pick deterministically");
assert.equal(first.counts.ready, 0, "candidate-only bank remains private and not ready");
assert.equal(first.canonicalWrite, false);
assert.equal(first.deployActionTaken, false);
const whatsNew = first.records.find((entry) => entry.type === "whats_new_sunnyvaile");
assert.equal(whatsNew.record.eventDate, "2026-08-24", "What’s New fixtures keep their original event date");
const datedBank = structuredClone(bank); const dated = datedBank.items.find((entry) => entry.type === "whats_new_sunnyvaile");
dated.eventDate = "2026-08-24"; dated.availableUntil = "2026-09-06"; dated.reviewedContentSha256 = reviewedContentSha256(dated);
const datedProposal = prepareServiceBankProposal({ date, bank: datedBank, root });
const datedRecord = datedProposal.records.find((entry) => entry.type === "whats_new_sunnyvaile").record;
assert.equal(datedRecord.eventDate, "2026-08-24", "dated What’s New provenance carries into private proposal");
assert.equal(datedRecord.availableUntil, "2026-09-06", "What’s New retirement carries into private proposal");
const retired = prepareServiceBankProposal({ date: "2026-09-07", bank: datedBank, root });
assert.deepEqual(retired.gaps.find((gap) => gap.type === "whats_new_sunnyvaile"), { type: "whats_new_sunnyvaile", reason: "EVENT_RETIRED" }, "expired What’s New reports a gap instead of selection");
assert.throws(() => prepareServiceBankProposal({ date: "2026-09-07", bank: datedBank, selections: { whats_new_sunnyvaile: dated.id }, root }), /event_retired/, "explicit retired What’s New selection rejects");
const futureEvent = structuredClone(datedBank); futureEvent.items.find((entry) => entry.type === "whats_new_sunnyvaile").eventDate = "2026-09-01";
futureEvent.items.find((entry) => entry.type === "whats_new_sunnyvaile").reviewedContentSha256 = reviewedContentSha256(futureEvent.items.find((entry) => entry.type === "whats_new_sunnyvaile"));
const early = prepareServiceBankProposal({ date, bank: futureEvent, root });
assert.deepEqual(early.gaps.find((gap) => gap.type === "whats_new_sunnyvaile"), { type: "whats_new_sunnyvaile", reason: "EVENT_NOT_YET_AVAILABLE" }, "future event cannot be selected early");
const invalidEventDate = structuredClone(datedBank); invalidEventDate.items.find((entry) => entry.type === "whats_new_sunnyvaile").availableUntil = "2026-09-31";
assert.throws(() => prepareServiceBankProposal({ date, bank: invalidEventDate, root }), /requires valid eventDate and availableUntil/, "impossible retirement date rejects");
const invalidExpiryDate = structuredClone(bank); invalidExpiryDate.items[0].freshness.expiresAt = "2026-09-31"; invalidExpiryDate.items[0].reviewedContentSha256 = reviewedContentSha256(invalidExpiryDate.items[0]);
assert.throws(() => prepareServiceBankProposal({ date, bank: invalidExpiryDate, root }), /incomplete freshness/, "impossible freshness expiry rejects");
const sourceHashChangedContent = structuredClone(bank.items[0]); sourceHashChangedContent.sourceSha256 = "0".repeat(64);
assert.notEqual(reviewedContentSha256(bank.items[0]), reviewedContentSha256(sourceHashChangedContent), "reviewed content hash binds source identity hash");
const history = { records: [{ bankItemId: "paige_tip-one" }] };
const withSecondPaige = structuredClone(bank); withSecondPaige.items.push(item("paige_tip", "paige_tip-two"));
const historic = prepareServiceBankProposal({ date, bank: withSecondPaige, columns: history, root });
assert.equal(historic.records.find((entry) => entry.type === "paige_tip").bankItemId, "paige_tip-two", "history prevents a silent repeat");
assert.throws(() => prepareServiceBankProposal({ date, bank: withSecondPaige, columns: history, selections: { paige_tip: "paige_tip-one" }, root }), /already used/, "an explicit item cannot bypass repeat protection");
const candidate = structuredClone(bank); candidate.items[0].status = "CANDIDATE"; candidate.items[0].publicEligibility = "INELIGIBLE";
const candidateResult = prepareServiceBankProposal({ date, bank: candidate, root });
assert.equal(candidateResult.records[0].proposalState, "CANDIDATE_NOT_READY", "candidate never becomes ready");
assert.equal(candidateResult.records[0].record.status, "CANDIDATE");
const fabricatedApproval = structuredClone(candidate); fabricatedApproval.items[0].status = "APPROVED"; fabricatedApproval.items[0].publicEligibility = "ELIGIBLE"; fabricatedApproval.items[0].reviewEvidence.accuracy = null;
assert.throws(() => prepareServiceBankProposal({ date, bank: fabricatedApproval, root }), /lacks accuracy evidence/, "candidate cannot become approved without review evidence");
const staleCandidateFirst = structuredClone(bank); staleCandidateFirst.items[0] = item("paige_tip", "aaa-held", { freshness: { lastCheckedAt: date, expiresAt: "2026-08-30", recheckTriggers: ["source changes"] } }); staleCandidateFirst.items.push(item("paige_tip", "zzz-candidate"));
const preferred = prepareServiceBankProposal({ date, bank: staleCandidateFirst, root });
assert.equal(preferred.records.find((entry) => entry.type === "paige_tip").bankItemId, "aaa-held", "candidate ordering remains deterministic without approval proof");
const future = structuredClone(bank); future.items[0].freshness.lastCheckedAt = "2026-09-01"; future.items[0].reviewedContentSha256 = reviewedContentSha256(future.items[0]);
assert.throws(() => prepareServiceBankProposal({ date, bank: future, root }), /future lastCheckedAt/, "future source review date fails closed");
const unsafeDestination = structuredClone(bank); unsafeDestination.items[0].destination = "javascript:alert(1)"; unsafeDestination.items[0].reviewedContentSha256 = reviewedContentSha256(unsafeDestination.items[0]);
assert.throws(() => prepareServiceBankProposal({ date, bank: unsafeDestination, root }), /unsafe destination/, "unsafe destination fails closed");
const expired = structuredClone(bank); expired.items[0].status = "APPROVED"; expired.items[0].publicEligibility = "ELIGIBLE"; expired.items[0].freshness.expiresAt = "2026-08-30";
expired.items[0].reviewedContentSha256 = reviewedContentSha256(expired.items[0]);
assert.throws(() => prepareServiceBankProposal({ date, bank: expired, root }), /stale eligibility/, "expired eligible bank item fails closed");
const duplicate = structuredClone(bank); duplicate.items.push(structuredClone(duplicate.items[0]));
assert.throws(() => prepareServiceBankProposal({ date, bank: duplicate, root }), /duplicate/, "duplicate IDs fail closed");
const noBody = structuredClone(bank); noBody.items[0].body = [];
assert.throws(() => prepareServiceBankProposal({ date, bank: noBody, root }), /complete body/, "missing body fails closed");
const changed = structuredClone(bank); fs.writeFileSync(path.join(root, "source.md"), "changed source\n");
assert.throws(() => prepareServiceBankProposal({ date, bank: changed, root }), /source hash changed/, "bound source drift fails closed");
const sourceRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const actualBank = JSON.parse(fs.readFileSync(path.join(sourceRoot, "operations/product-stewards/newsstand/candidates/service-bank.json"), "utf8"));
const actualApproved = structuredClone(actualBank);
const paige = actualApproved.items.find((entry) => entry.id === "paige-01-follow-up");
paige.reviewedContentSha256 = reviewedContentSha256(paige);
Object.assign(paige, { status: "APPROVED", publicEligibility: "ELIGIBLE", reviewEvidence: {
  ...paige.reviewEvidence,
  producer: "operations/product-stewards/newsstand/evidence/service-bank-20260830/producer-receipts/paige-01-follow-up.json",
  accuracy: "operations/product-stewards/newsstand/evidence/service-bank-20260830/independent-teaching-receipts/paige-01-follow-up.json",
  editorial: "operations/product-stewards/newsstand/evidence/service-bank-20260830/independent-teaching-receipts/paige-01-follow-up.json",
  voice: "operations/product-stewards/newsstand/evidence/service-bank-20260830/independent-teaching-receipts/paige-01-follow-up.json",
  format: "operations/product-stewards/newsstand/evidence/service-bank-20260830/independent-teaching-receipts/paige-01-follow-up.json",
  owner: "operations/product-stewards/newsstand/evidence/service-bank-20260830/independent-teaching-receipts/paige-01-follow-up.json"
} });
assert.equal(prepareServiceBankProposal({ date: "2026-08-30", bank: actualApproved, root: sourceRoot }).records.find((entry) => entry.bankItemId === paige.id).proposalState, "READY_FOR_INDEPENDENT_ADMISSION", "actual producer and independent receipts bind a real approved item");
const exhaustedHistory = { records: actualApproved.items.filter((entry) => entry.type === "paige_tip" && entry.status === "APPROVED" && entry.publicEligibility === "ELIGIBLE").map((entry) => ({ id: entry.id === paige.id ? "DAILY-2026-08-30-PAIGE-TIP-PAIGE-01-FOLLOW-UP" : `DAILY-2026-08-30-PAIGE-TIP-${entry.id.toUpperCase()}`, editionDate: "2026-08-30", bankItemId: entry.id })) };
const exhaustedDefault = prepareServiceBankProposal({ date: "2026-08-31", bank: actualApproved, columns: exhaustedHistory, root: sourceRoot });
assert.deepEqual(exhaustedDefault.gaps.find((gap) => gap.type === "paige_tip"), { type: "paige_tip", reason: "NO_UNUSED_BANK_ITEM" }, "default selection never silently reuses an admitted item");
const reused = prepareServiceBankProposal({ date: "2026-08-31", bank: actualApproved, columns: exhaustedHistory, reuseAdmitted: true, root: sourceRoot });
const reusedPaige = reused.records.find((entry) => entry.type === "paige_tip").record;
assert.equal(reusedPaige.bankItemId, paige.id, "reuse selects an exhausted, still-approved entry only with the explicit flag");
assert.equal(reusedPaige.predecessorRecordId, "DAILY-2026-08-30-PAIGE-TIP-PAIGE-01-FOLLOW-UP", "reuse binds the exact latest dated predecessor");
assert.equal(reusedPaige.editionDate, "2026-08-31", "reuse creates a new dated record rather than mutating history");
assert.match(reusedPaige.id, /^DAILY-2026-08-31-/, "reuse record ID is newly dated");
assert.equal(reusedPaige.reviewedContentSha256, paige.reviewedContentSha256, "reuse preserves the reviewed content identity");
const sameDateHistory = { records: [...exhaustedHistory.records, { id: "DAILY-2026-08-31-PAIGE-TIP-PAIGE-01-FOLLOW-UP", editionDate: "2026-08-31", bankItemId: paige.id }] };
assert.throws(() => prepareServiceBankProposal({ date: "2026-08-31", bank: actualApproved, columns: sameDateHistory, selections: { paige_tip: paige.id }, reuseAdmitted: true, root: sourceRoot }), /already has a dated Daily record/, "reuse cannot duplicate the same bank item on the same date");
const expiredReuse = structuredClone(actualApproved); const expiredPaige = expiredReuse.items.find((entry) => entry.id === paige.id);
expiredPaige.freshness.expiresAt = "2026-08-30"; expiredPaige.reviewedContentSha256 = reviewedContentSha256(expiredPaige);
assert.throws(() => prepareServiceBankProposal({ date: "2026-08-31", bank: expiredReuse, columns: exhaustedHistory, reuseAdmitted: true, root: sourceRoot }), /reviewed content hash does not match independent artifact manifest|stale eligibility/, "expired approval cannot be reused");
const changedContent = structuredClone(actualApproved); changedContent.items.find((entry) => entry.id === paige.id).headline = "Changed after review.";
changedContent.items.find((entry) => entry.id === paige.id).reviewedContentSha256 = reviewedContentSha256(changedContent.items.find((entry) => entry.id === paige.id));
assert.throws(() => prepareServiceBankProposal({ date: "2026-08-30", bank: changedContent, root: sourceRoot }), /reviewed content hash does not match independent artifact manifest/, "changed content cannot reuse a review receipt");
const heldReview = structuredClone(actualApproved); const held = heldReview.items.find((entry) => entry.id === paige.id);
held.reviewEvidence.editorial = held.reviewEvidence.voice = "operations/product-stewards/newsstand/evidence/service-bank-20260830/independent-teaching-receipts/corner-01-credit.json";
assert.throws(() => prepareServiceBankProposal({ date: "2026-08-30", bank: heldReview, root: sourceRoot }), /cross-stage candidateId mismatch|requires PASS/, "a held independent review cannot support approval");
const wrongId = structuredClone(actualApproved); const wrong = wrongId.items.find((entry) => entry.id === paige.id);
wrong.reviewEvidence.editorial = wrong.reviewEvidence.voice = "operations/product-stewards/newsstand/evidence/service-bank-20260830/independent-teaching-receipts/jeeves-02-citation.json";
assert.throws(() => prepareServiceBankProposal({ date: "2026-08-30", bank: wrongId, root: sourceRoot }), /cross-stage candidateId mismatch/, "a receipt for another ID cannot support approval");
fs.rmSync(root, { recursive: true, force: true });
console.log("SERVICE BANK PREPARATION TEST PASS deterministic=1 history_avoids_repeat=1 reuse_exhausted_fresh=1 reuse_parent_bound=1 reuse_same_date_rejected=1 reuse_expired_rejected=1 candidate_not_ready=1 approved_review_chain_bound=1 changed_content_rejected=1 held_review_rejected=1 wrong_id_rejected=1 dated_whats_new=1 retired_gap=1 explicit_retired_rejected=1 impossible_dates_rejected=1 source_hash_bound=1 expired_rejected=1 duplicate_rejected=1 no_body_rejected=1 source_drift_rejected=1 no_public_write=1");
