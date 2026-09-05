/**
 * Pure request/receipt validation for a future Town Hall intake boundary.
 * This module deliberately does not persist, authorize, rate-limit, route, or
 * reconcile submissions. Those responsibilities require separately owned
 * server and policy work. The HTTP caller must separately bound raw request bytes
 * before JSON parsing; this helper bounds the serialized parsed object only.
 */
const encoder = new TextEncoder();
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SHA256 = /^[0-9a-f]{64}$/;
const TYPES = new Set(["compliment", "complaint", "suggestion"]);
const MAX_INPUT_BYTES = 12 * 1024;
const MAX_RECEIPT_BYTES = 1024;
const CONTROL_EXCEPT_NORMAL_WHITESPACE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/;

export class FeedbackContractError extends Error {}

function requireThat(condition, message) {
  if (!condition) throw new FeedbackContractError(message);
}

function jsonObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}

function exactKeys(value, keys) {
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function hasMalformedUnicode(value) {
  for (let index = 0; index < value.length; index++) {
    const code = value.charCodeAt(index);
    if (code >= 0xD800 && code <= 0xDBFF) {
      if (index + 1 >= value.length || value.charCodeAt(index + 1) < 0xDC00 || value.charCodeAt(index + 1) > 0xDFFF) return true;
      index += 1;
    } else if (code >= 0xDC00 && code <= 0xDFFF) {
      return true;
    }
  }
  return false;
}

function normalizedText(value, label) {
  requireThat(typeof value === "string", `${label} must be a string`);
  requireThat(!hasMalformedUnicode(value), `${label} contains malformed Unicode`);
  requireThat(!CONTROL_EXCEPT_NORMAL_WHITESPACE.test(value), `${label} contains a control character`);
  return value.normalize("NFC").trim();
}

function codePoints(value) {
  return Array.from(value).length;
}

function boundedJson(value, maximum, label) {
  let serialized;
  try { serialized = JSON.stringify(value); } catch { throw new FeedbackContractError(`${label} is not JSON serializable`); }
  requireThat(typeof serialized === "string" && encoder.encode(serialized).byteLength <= maximum, `${label} too large`);
  return serialized;
}

export function validateIdempotencyKey(headerValue) {
  // This checks only UUIDv4 format. The caller must generate it with cryptographic
  // randomness, and durable scoped replay/conflict handling belongs to storage.
  requireThat(typeof headerValue === "string" && UUID_V4.test(headerValue), "invalid idempotency key");
  return headerValue.toLowerCase();
}

export function validateSubmissionInput(input) {
  requireThat(jsonObject(input), "submission must be a JSON object");
  requireThat(exactKeys(input, Object.prototype.hasOwnProperty.call(input, "subject")
    ? ["submission_type", "subject", "body"]
    : ["submission_type", "body"]), "invalid submission fields");
  boundedJson(input, MAX_INPUT_BYTES, "submission");
  requireThat(typeof input.submission_type === "string" && TYPES.has(input.submission_type), "invalid submission type");
  const body = normalizedText(input.body, "body");
  requireThat(codePoints(body) >= 3 && codePoints(body) <= 2000, "invalid body length");
  const normalized = { submission_type: input.submission_type, body };
  if (Object.prototype.hasOwnProperty.call(input, "subject")) {
    requireThat(input.subject === null || typeof input.subject === "string", "subject must be a string or null");
    if (input.subject !== null) {
      const subject = normalizedText(input.subject, "subject");
      requireThat(codePoints(subject) <= 100, "invalid subject length");
      if (subject) normalized.subject = subject;
    }
  }
  return normalized;
}

export function canonicalSubmissionJson(normalizedInput) {
  const normalized = validateSubmissionInput(normalizedInput);
  return JSON.stringify({
    body: normalized.body,
    submission_type: normalized.submission_type,
    ...(normalized.subject ? { subject: normalized.subject } : {})
  });
}

export async function canonicalSubmissionDigest(normalizedInput, subtle = globalThis.crypto?.subtle) {
  requireThat(subtle && typeof subtle.digest === "function", "SHA-256 unavailable");
  const bytes = encoder.encode(canonicalSubmissionJson(normalizedInput));
  const digest = await subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

function isoTimestamp(value) {
  return typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    (new Date(value).toISOString() === value ||
      new Date(value).toISOString().replace(".000Z", "Z") === value);
}

export function validateAcceptedReceipt(receipt, expectedInputDigest) {
  requireThat(jsonObject(receipt), "receipt must be a JSON object");
  boundedJson(receipt, MAX_RECEIPT_BYTES, "receipt");
  requireThat(exactKeys(receipt, ["contract_version", "receipt_id", "status", "accepted_at", "input_sha256"]), "invalid receipt fields");
  requireThat(receipt.contract_version === "town_hall_feedback_receipt.v1", "invalid receipt version");
  requireThat(typeof receipt.receipt_id === "string" && UUID_V4.test(receipt.receipt_id), "invalid receipt identifier");
  requireThat(receipt.status === "accepted", "receipt is not accepted");
  requireThat(isoTimestamp(receipt.accepted_at), "invalid receipt timestamp");
  requireThat(typeof receipt.input_sha256 === "string" && SHA256.test(receipt.input_sha256), "invalid receipt digest");
  requireThat(typeof expectedInputDigest === "string" && SHA256.test(expectedInputDigest), "invalid expected digest");
  requireThat(receipt.input_sha256 === expectedInputDigest, "receipt digest mismatch");
  return {
    contract_version: receipt.contract_version,
    receipt_id: receipt.receipt_id.toLowerCase(),
    status: receipt.status,
    accepted_at: receipt.accepted_at,
    input_sha256: receipt.input_sha256.toLowerCase()
  };
}

export const feedbackContractLimits = Object.freeze({ maxInputBytes: MAX_INPUT_BYTES, maxReceiptBytes: MAX_RECEIPT_BYTES });
