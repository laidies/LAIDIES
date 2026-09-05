export const FROZEN_RECEIPT_SHA256 = "503a473018442c5a114586584dfd015c61503283b80784095e705b04b1a57b87";
export const KNOWN_RUN_URL = "https://github.com/laidies/LAIDIES/actions/runs/33984182929";
export const KNOWN_ORIGINATING_COMMIT = "ef2dadc4a3aa4074a9b8e5399e324ae49fe88ba4";
export const MAX_RECEIPT_BYTES = 16 * 1024;
export const AUTHORITY = Object.freeze({
  public: false,
  deploy: false,
  spend: false,
  ali_approval: false,
  editorialDisposition: false
});

function fail(message) {
  throw new Error(message);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function exactKeys(value, allowed, label) {
  if (Object.keys(value).some(key => !allowed.includes(key))) fail(`${label} contains unsupported fields`);
}

function isSha256(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function byteLength(value) {
  return new TextEncoder().encode(value).byteLength;
}

export async function sha256Utf8(value) {
  if (typeof value !== "string") fail("receiptJson must be a string");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function validateReceipt(receipt) {
  if (!isObject(receipt)) fail("receipt must be an object");
  if (receipt.schemaVersion !== "newsstand-cloud-intake-v1") fail("unknown receipt schema");
  if (receipt.mode !== "PRIVATE_SIGNAL_INTAKE_ONLY") fail("receipt mode is not intake-only");
  if (!isObject(receipt.counts)) fail("receipt counts missing");
  for (const name of ["due", "healthy", "unavailable", "sourceHealthAlerts", "newSignals"]) {
    if (!Number.isInteger(receipt.counts[name]) || receipt.counts[name] < 0) fail(`receipt count ${name} invalid`);
  }
  for (const name of ["newSignals", "unavailableSources", "sourceHealthAlerts"]) {
    if (!Array.isArray(receipt[name])) fail(`receipt ${name} missing`);
  }
  if (receipt.counts.newSignals !== receipt.newSignals.length) fail("newSignals count mismatch");
  if (receipt.counts.unavailable !== receipt.unavailableSources.length) fail("unavailable count mismatch");
  if (receipt.counts.sourceHealthAlerts !== receipt.sourceHealthAlerts.length) fail("sourceHealthAlerts count mismatch");
  for (const flag of ["publicationActionTaken", "canonicalWrite", "deploymentActionTaken"]) {
    if (receipt[flag] !== false) fail(`receipt ${flag} must be false`);
  }
  if (receipt.generatedAt !== "2026-09-05T18:29:55.803Z") fail("receipt is not the known pilot receipt");
  return receipt;
}

function boundedWorkId(value) {
  return typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]{2,79}$/.test(value);
}

function boundedDecisionId(value) {
  return typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]{2,79}$/.test(value);
}

function normalizedWaitSeconds(value) {
  if (value === undefined) return 600;
  if (!Number.isInteger(value) || value < 1 || value > 3600) fail("waitSeconds must be an integer from 1 to 3600");
  return value;
}

export async function checkpointHandoff(params, configuredReceiptSha256) {
  if (!isObject(params)) fail("workflow params must be an object");
  exactKeys(params, ["workId", "receiptJson", "receiptSha256", "waitSeconds"], "params");
  if (byteLength(JSON.stringify(params)) > MAX_RECEIPT_BYTES) fail("params exceed 16 KiB");
  if (!boundedWorkId(params.workId)) fail("workId must be 3-80 safe characters");
  if (!isSha256(params.receiptSha256)) fail("receiptSha256 must be lowercase SHA-256");
  if (params.receiptSha256 !== FROZEN_RECEIPT_SHA256) fail("receiptSha256 is not the frozen pilot receipt");
  if (configuredReceiptSha256 !== FROZEN_RECEIPT_SHA256) fail("configured receipt SHA does not match frozen pilot receipt");
  if (typeof params.receiptJson !== "string" || byteLength(params.receiptJson) > MAX_RECEIPT_BYTES) fail("receiptJson exceeds 16 KiB or is invalid");
  const calculated = await sha256Utf8(params.receiptJson);
  if (calculated !== params.receiptSha256) fail("receiptJson hash mismatch");
  const receipt = validateReceipt(JSON.parse(params.receiptJson));
  return Object.freeze({
    workId: params.workId,
    receiptSha256: calculated,
    runUrl: KNOWN_RUN_URL,
    originatingCommit: KNOWN_ORIGINATING_COMMIT,
    owner: "newsstand",
    counts: Object.freeze({ ...receipt.counts }),
    generatedAt: receipt.generatedAt,
    signals: receipt.newSignals.map(({ signalId, sourceId, title, url, publishedAt }) => ({ signalId, sourceId, title, url, publishedAt })),
    unavailableSources: receipt.unavailableSources,
    sourceStatus: Object.freeze({ healthy: receipt.counts.healthy, unavailable: receipt.counts.unavailable }),
    nextAction: "Editorial review still required; acknowledgement is not an editorial disposition or approval.",
    authority_truth: AUTHORITY,
    waitSeconds: normalizedWaitSeconds(params.waitSeconds)
  });
}

export function validateAcknowledgement(event, handoff) {
  const payload = isObject(event?.payload) ? event.payload : event;
  if (!isObject(payload)) fail("acknowledgement payload must be an object");
  exactKeys(payload, ["workId", "receiptSha256", "decisionId", "action"], "acknowledgement");
  if (payload.workId !== handoff.workId) fail("acknowledgement workId mismatch");
  if (payload.receiptSha256 !== handoff.receiptSha256) fail("acknowledgement receipt SHA mismatch");
  if (!boundedDecisionId(payload.decisionId)) fail("acknowledgement decisionId must be 3-80 safe characters");
  if (payload.action !== "ACKNOWLEDGE" && payload.action !== "HOLD") fail("acknowledgement action must be ACKNOWLEDGE or HOLD");
  return Object.freeze({
    workId: handoff.workId,
    receiptSha256: handoff.receiptSha256,
    decisionId: payload.decisionId,
    status: payload.action === "ACKNOWLEDGE" ? "ACKNOWLEDGED_FOR_REVIEW" : "HOLD",
    acceptanceKind: "CONTROL_PLANE_OPERATOR_ONLY",
    action: payload.action,
    authority_truth: AUTHORITY,
    editorialDisposition: false,
    editorialReviewStillRequired: true
  });
}

export function unacknowledgedResult(handoff) {
  return Object.freeze({
    status: "HOLD_NO_ACKNOWLEDGEMENT",
    workId: handoff.workId,
    receiptSha256: handoff.receiptSha256,
    authority_truth: AUTHORITY,
    editorialReviewStillRequired: true,
    nextAction: "The wait ended without an acknowledgement; remain HOLD. Inspect the workflow step before retrying."
  });
}
