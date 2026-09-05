import assert from "node:assert/strict";
import {
  FeedbackContractError,
  canonicalSubmissionDigest,
  canonicalSubmissionJson,
  feedbackContractLimits,
  validateAcceptedReceipt,
  validateIdempotencyKey,
  validateSubmissionInput
} from "./src/feedback-contract.mjs";

const validKey = "0f8fad5b-d9cb-469f-a165-70867728950e";
const receiptId = "3d594650-3436-453a-9b2a-9a6f0e1db2e1";
let negativeCalibrations = 0;
const throwsContract = (fn, message) => { assert.throws(fn, FeedbackContractError, message); negativeCalibrations++; };

// Positive Unicode input: NFC canonicalization makes the same visible text hash alike.
const decomposed = { submission_type: "suggestion", subject: "Cafe\u0301", body: "  Add a cafe\u0301 table for readers.  " };
const normalized = validateSubmissionInput(decomposed);
assert.deepEqual(normalized, { submission_type: "suggestion", subject: "Café", body: "Add a café table for readers." });
const digest = await canonicalSubmissionDigest(normalized);
assert.match(digest, /^[0-9a-f]{64}$/);
assert.equal(digest, await canonicalSubmissionDigest({ submission_type: "suggestion", subject: "Café", body: "Add a café table for readers." }));
assert.equal(canonicalSubmissionJson(normalized), '{"body":"Add a café table for readers.","submission_type":"suggestion","subject":"Café"}');

assert.equal(validateIdempotencyKey(validKey.toUpperCase()), validKey);
for (const badKey of [undefined, "not-a-uuid", "0f8fad5b-d9cb-369f-a165-70867728950e", `${validKey} `]) {
  throwsContract(() => validateIdempotencyKey(badKey), "idempotency key rejection calibrated");
}

for (const badInput of [
  null, [], { submission_type: "suggestion", body: 123 },
  { submission_type: "suggestion", body: "okay", admin_notes: "forged" },
  { submission_type: "suggestion", body: "okay", subject: true }, { submission_type: "suggestion" }, { submission_type: "suggestion", body: "ok", user_id: "attacker" },
  { submission_type: "suggestion", body: "okay", email: "private@example.test" },
  { submission_type: "suggestion", body: "okay", status: "addressed" },
  { submission_type: "unknown", body: "okay" }, { submission_type: "suggestion", body: "\u0000hidden" },
  { submission_type: "suggestion", body: "bad\uD800" }, { submission_type: "suggestion", body: "ab" },
  { submission_type: "suggestion", subject: "x".repeat(101), body: "okay" },
  { submission_type: "suggestion", body: "x".repeat(2001) },
  { submission_type: "suggestion", body: "é".repeat(feedbackContractLimits.maxInputBytes) },
  { submission_type: "suggestion", body: " ".repeat(feedbackContractLimits.maxInputBytes) + "abc" }
]) throwsContract(() => validateSubmissionInput(badInput), "submission rejection calibrated");

assert.equal(Array.from(validateSubmissionInput({ submission_type: "compliment", body: "😀".repeat(3) }).body).length, 3);
assert.equal(Array.from(validateSubmissionInput({ submission_type: "compliment", body: "😀".repeat(2000) }).body).length, 2000);
throwsContract(() => validateSubmissionInput({ submission_type: "compliment", body: "😀".repeat(2001) }), "code-point limit rejects 2001 emoji");

const accepted = validateAcceptedReceipt({
  contract_version: "town_hall_feedback_receipt.v1", receipt_id: receiptId, status: "accepted",
  accepted_at: "2026-09-05T22:00:00.000Z", input_sha256: digest
}, digest);
assert.deepEqual(Object.keys(accepted).sort(), ["accepted_at", "contract_version", "input_sha256", "receipt_id", "status"]);
assert.equal(JSON.stringify(accepted).includes("Café"), false, "receipt does not echo submitted text");

for (const badReceipt of [
  { ...accepted, receipt_id: "not-an-id" }, { ...accepted, receipt_id: [receiptId] },
  { ...accepted, accepted_at: "2026-02-30T12:00:00.000Z" }, { ...accepted, status: "filed" },
  { ...accepted, input_sha256: "0".repeat(64) }, { ...accepted, body: "private echo" },
  { ...accepted, accepted_at: "2026-09-05" }
]) throwsContract(() => validateAcceptedReceipt(badReceipt, digest), "receipt rejection calibrated");

throwsContract(() => validateAcceptedReceipt(accepted), "missing expected digest must fail closed");

console.log(`FEEDBACK CONTRACT PASS scope=pure_helpers_only backend_completion=false positive_unicode=1 negative_calibrations=${negativeCalibrations} private_echo=absent limitations=uuid_format_not_entropy_no_storage_no_auth_no_rate_limit_no_idempotency_persistence`);
