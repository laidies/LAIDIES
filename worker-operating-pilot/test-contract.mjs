import assert from "node:assert/strict";
import fs from "node:fs";
import { AUTHORITY, FROZEN_RECEIPT_SHA256, checkpointHandoff, unacknowledgedResult, validateAcknowledgement, validateReceipt } from "./src/contract.mjs";

const receiptJson = fs.readFileSync("operations/runtime/hosted-handoff-pilot-20260905/receipt.json", "utf8");
const base = { workId: "newsstand-run-33984182929", receiptJson, receiptSha256: FROZEN_RECEIPT_SHA256, waitSeconds: 60 };
const handoff = await checkpointHandoff(base, FROZEN_RECEIPT_SHA256);
assert.equal(handoff.runUrl, "https://github.com/laidies/LAIDIES/actions/runs/33984182929");
assert.equal(handoff.owner, "newsstand");
assert.equal(handoff.counts.newSignals, 1);
assert.equal(handoff.signals[0].signalId, "NSCI-340050140eeaf792d7a8");
assert.equal(handoff.unavailableSources[0].error, "HTTP 401");
await assert.rejects(() => checkpointHandoff({ ...base, ali_approval: true }, FROZEN_RECEIPT_SHA256), /unsupported fields/);
assert.deepEqual(handoff.authority_truth, AUTHORITY);
assert.equal(handoff.authority_truth.public, false);

await assert.rejects(() => checkpointHandoff({ ...base, receiptJson: `${receiptJson} ` }, FROZEN_RECEIPT_SHA256), /hash mismatch/);
await assert.rejects(() => checkpointHandoff(base, "0".repeat(64)), /configured receipt SHA/);
await assert.rejects(() => checkpointHandoff({ ...base, receiptJson: "x".repeat(16 * 1024 + 1) }, FROZEN_RECEIPT_SHA256), /exceeds? 16 KiB/);
assert.throws(() => validateReceipt({ ...JSON.parse(receiptJson), schemaVersion: "unknown-schema" }), /unknown receipt schema/);

const acknowledged = validateAcknowledgement({ payload: { workId: base.workId, receiptSha256: FROZEN_RECEIPT_SHA256, decisionId: "operator-001", action: "ACKNOWLEDGE" } }, handoff);
assert.equal(acknowledged.action, "ACKNOWLEDGE");
assert.equal(acknowledged.status, "ACKNOWLEDGED_FOR_REVIEW");
assert.throws(() => validateAcknowledgement({workId: base.workId, receiptSha256: FROZEN_RECEIPT_SHA256, decisionId: "operator-001", action: "ACKNOWLEDGE", ali_approval: true}, handoff), /unsupported fields/);
assert.equal(unacknowledgedResult(handoff).status, "HOLD_NO_ACKNOWLEDGEMENT");
assert.equal(acknowledged.editorialDisposition, false);
assert.throws(() => validateAcknowledgement({ workId: "wrong-work", receiptSha256: FROZEN_RECEIPT_SHA256, decisionId: "operator-001", action: "ACKNOWLEDGE" }, handoff), /workId mismatch/);
assert.throws(() => validateAcknowledgement({ workId: base.workId, receiptSha256: "f".repeat(64), decisionId: "operator-001", action: "ACKNOWLEDGE" }, handoff), /SHA mismatch/);
assert.throws(() => validateAcknowledgement({ workId: base.workId, receiptSha256: FROZEN_RECEIPT_SHA256, decisionId: "operator-001", action: "PUBLISH" }, handoff), /action must be/);
assert.deepEqual(unacknowledgedResult(handoff).authority_truth, AUTHORITY);

console.log("OPERATING HANDOFF PILOT CONTRACT PASS");
console.log("calibration=tampered-bytes,wrong-frozen-sha,oversized-input,unknown-schema,wrong-work,wrong-hash,unknown-action,no-positive-authority rejected");
