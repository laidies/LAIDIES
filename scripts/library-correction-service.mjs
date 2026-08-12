#!/usr/bin/env node

import crypto from "node:crypto";

export const CONTRACT_VERSION = "library-correction-contract.v1";
export const RAW_PAYLOAD_RETENTION_DAYS = 30;

const ID = /^[a-z0-9][a-z0-9._:-]{0,95}$/i;
const VERSION = /^[a-z0-9][a-z0-9._:-]{0,95}$/i;
const OWNER = /^[a-z0-9][a-z0-9 ._:/()-]{2,119}$/i;
const ALLOWED_CATEGORIES = new Set([
  "factual-error",
  "source-mismatch",
  "stale-source",
  "missing-qualification",
  "broken-source",
  "other"
]);
const SUBMIT_FIELDS = new Set([
  "book_id",
  "section_id",
  "claim_id",
  "source_id",
  "content_version",
  "category",
  "finding",
  "evidence_url"
]);
const PROHIBITED_FIELDS = new Set([
  "email",
  "name",
  "resident_card_id",
  "account_id",
  "raw_query",
  "reading_activity",
  "reading_text",
  "puffy_purpose",
  "saved_title"
]);
const TRANSITIONS = Object.freeze({
  submitted: new Set(["triage"]),
  triage: new Set(["resolved_corrected", "demoted"]),
  resolved_corrected: new Set(),
  demoted: new Set()
});

function fail(message) {
  throw new Error(`library correction contract: ${message}`);
}

function exactObject(value, name) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${name} must be an object`);
  }
}

function boundedId(value, name) {
  if (typeof value !== "string" || !ID.test(value)) fail(`${name} is invalid`);
  return value;
}

function boundedText(value, name, max) {
  if (typeof value !== "string") fail(`${name} must be text`);
  const normalized = value.trim().replace(/\s+/g, " ");
  if (!normalized || normalized.length > max) fail(`${name} is invalid`);
  return normalized;
}

function exactIso(value, name) {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) ||
    !Number.isFinite(Date.parse(value))
  ) {
    fail(`${name} must be an exact ISO UTC timestamp`);
  }
  return value;
}

function safeEvidenceUrl(value) {
  if (value == null || value === "") return null;
  if (typeof value !== "string" || value.length > 1500) {
    fail("evidence_url is invalid");
  }
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail("evidence_url is invalid");
  }
  if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
    fail("evidence_url must be an HTTPS URL without credentials");
  }
  return {
    raw: parsed.toString(),
    safeOrigin: parsed.origin
  };
}

function digest(value) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(value))
    .digest("hex");
}

function clone(value) {
  return value == null ? value : structuredClone(value);
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) deepFreeze(nested);
  return Object.freeze(value);
}

function normalizeSubmission(input) {
  exactObject(input, "submission");
  for (const key of Object.keys(input)) {
    if (PROHIBITED_FIELDS.has(key)) fail(`${key} is prohibited`);
    if (!SUBMIT_FIELDS.has(key)) fail(`unknown submission field ${key}`);
  }
  for (const field of [
    "book_id",
    "section_id",
    "claim_id",
    "source_id",
    "content_version",
    "category",
    "finding"
  ]) {
    if (!Object.hasOwn(input, field)) fail(`${field} is required`);
  }
  const category = boundedId(input.category, "category");
  if (!ALLOWED_CATEGORIES.has(category)) fail("category is not controlled");
  const evidence = safeEvidenceUrl(input.evidence_url);
  return {
    book_id: boundedId(input.book_id, "book_id"),
    section_id: boundedId(input.section_id, "section_id"),
    claim_id: boundedId(input.claim_id, "claim_id"),
    source_id: boundedId(input.source_id, "source_id"),
    content_version: boundedId(input.content_version, "content_version"),
    category,
    finding: boundedText(input.finding, "finding", 800),
    evidence_url: evidence?.raw || null,
    evidence_origin: evidence?.safeOrigin || null
  };
}

function validateOwner(value) {
  if (typeof value !== "string" || !OWNER.test(value)) fail("owner is invalid");
  return value.trim();
}

function versionId(correctionId, version) {
  return `${correctionId}:v${version}`;
}

export function createMemoryCorrectionService({
  clock = () => new Date().toISOString(),
  idFactory = (kind) => `${kind}-${crypto.randomUUID()}`,
  rawPayloadRetentionDays = RAW_PAYLOAD_RETENTION_DAYS
} = {}) {
  if (!Number.isInteger(rawPayloadRetentionDays) || rawPayloadRetentionDays < 1) {
    fail("raw payload retention must be a positive whole number of days");
  }

  const ledger = [];
  const idempotency = new Map();
  const payloadVault = new Map();

  function now() {
    return exactIso(clock(), "clock result");
  }

  function eventsFor(correctionId) {
    return ledger.filter((event) => event.correction_id === correctionId);
  }

  function latest(correctionId) {
    const events = eventsFor(correctionId);
    if (!events.length) fail(`unknown correction_id ${correctionId}`);
    return events.at(-1);
  }

  function append(base) {
    const event = deepFreeze(clone(base));
    ledger.push(event);
    return event;
  }

  function receiptFor(event) {
    return deepFreeze({
      correction_id: event.correction_id,
      receipt_id: event.receipt.receipt_id,
      state: event.state,
      created_at: event.created_at,
      status_reference: event.receipt.status_reference
    });
  }

  function projectedHistory(correctionId) {
    const events = eventsFor(correctionId);
    if (!events.length) fail(`unknown correction_id ${correctionId}`);
    return deepFreeze(
      events.map((event, index) => ({
        ...clone(event),
        superseded_by: events[index + 1]?.version_id || null
      }))
    );
  }

  function submit(input, { idempotency_key } = {}) {
    const key = boundedId(idempotency_key, "idempotency_key");
    const normalized = normalizeSubmission(input);
    const requestDigest = digest(normalized);
    const prior = idempotency.get(key);
    if (prior) {
      if (prior.request_digest !== requestDigest) {
        fail("idempotency key was already used for a different submission");
      }
      return receiptFor(latest(prior.correction_id));
    }

    const timestamp = now();
    const correctionId = boundedId(idFactory("correction"), "generated correction_id");
    const receiptId = boundedId(idFactory("receipt"), "generated receipt_id");
    if (eventsFor(correctionId).length) fail("generated correction_id is not unique");
    const expiresAt = new Date(
      Date.parse(timestamp) + rawPayloadRetentionDays * 86400000
    ).toISOString();
    const safePayload = {
      category: normalized.category,
      finding_sha256: digest(normalized.finding),
      evidence_origin: normalized.evidence_origin,
      retention_class: "temporary-reporter-payload",
      payload_expires_at: expiresAt
    };
    const event = append({
      schema_version: CONTRACT_VERSION,
      correction_id: correctionId,
      book_id: normalized.book_id,
      section_id: normalized.section_id,
      claim_id: normalized.claim_id,
      source_id: normalized.source_id,
      reporter_safe_payload: safePayload,
      receipt: {
        receipt_id: receiptId,
        status_reference: `library-correction:${correctionId}`
      },
      state: "submitted",
      owner: null,
      created_at: timestamp,
      updated_at: timestamp,
      resolved_at: null,
      resolution: null,
      content_version: normalized.content_version,
      record_version: 1,
      version_id: versionId(correctionId, 1),
      supersedes_version: null
    });
    payloadVault.set(correctionId, deepFreeze({
      finding: normalized.finding,
      evidence_url: normalized.evidence_url,
      expires_at: expiresAt
    }));
    idempotency.set(key, {
      request_digest: requestDigest,
      correction_id: correctionId
    });
    return receiptFor(event);
  }

  function transition(correctionId, nextState, {
    owner,
    resolution = null,
    content_version
  } = {}) {
    boundedId(correctionId, "correction_id");
    if (!Object.hasOwn(TRANSITIONS, nextState)) fail("unknown next state");
    const previous = latest(correctionId);
    if (!TRANSITIONS[previous.state].has(nextState)) {
      fail(`cannot transition ${previous.state} to ${nextState}`);
    }
    const timestamp = now();
    if (Date.parse(timestamp) < Date.parse(previous.updated_at)) {
      fail("clock moved backwards");
    }
    const version = previous.record_version + 1;
    const isResolution = nextState === "resolved_corrected" || nextState === "demoted";
    if (isResolution) {
      exactObject(resolution, "resolution");
      if (typeof resolution.summary !== "string" || !resolution.summary.trim() ||
          resolution.summary.trim().length > 500) {
        fail("resolution summary is invalid");
      }
    } else if (resolution !== null) {
      fail("triage cannot carry a resolution");
    }
    const nextContentVersion = content_version || previous.content_version;
    if (!VERSION.test(nextContentVersion)) fail("content_version is invalid");
    if (
      nextState === "resolved_corrected" &&
      nextContentVersion === previous.content_version
    ) {
      fail("a corrected resolution requires a new content_version");
    }
    return append({
      ...clone(previous),
      state: nextState,
      owner: validateOwner(owner),
      updated_at: timestamp,
      resolved_at: isResolution ? timestamp : null,
      resolution: isResolution
        ? {
            outcome: nextState === "resolved_corrected" ? "corrected" : "demoted",
            summary: resolution.summary.trim()
          }
        : null,
      content_version: nextContentVersion,
      record_version: version,
      version_id: versionId(correctionId, version),
      supersedes_version: previous.version_id
    });
  }

  function triage(correctionId, { owner } = {}) {
    return clone(transition(correctionId, "triage", { owner }));
  }

  function resolveCorrected(correctionId, { owner, summary, content_version } = {}) {
    return clone(transition(correctionId, "resolved_corrected", {
      owner,
      resolution: { summary },
      content_version
    }));
  }

  function demote(correctionId, { owner, summary } = {}) {
    return clone(transition(correctionId, "demoted", {
      owner,
      resolution: { summary }
    }));
  }

  function propagation(correctionId) {
    const event = latest(correctionId);
    const corrected = event.state === "resolved_corrected";
    const correctionState = corrected
      ? "corrected-pending-readmission"
      : event.state === "demoted"
        ? "correction-required"
        : "open-triage";
    return deepFreeze({
      schema_version: CONTRACT_VERSION,
      correction_id: event.correction_id,
      record_version: event.record_version,
      version_id: event.version_id,
      state: event.state,
      generated_at: event.updated_at,
      admission_compiler: {
        book_id: event.book_id,
        required_action: corrected ? "require-independent-readmission" : "demote-to-hold",
        required_correction_state: correctionState,
        content_version: event.content_version,
        requires_independent_readmission: true
      },
      site_index: {
        book_id: event.book_id,
        claim_id: event.claim_id,
        action: "suppress-until-current-admission"
      },
      miss_jeeves: {
        book_id: event.book_id,
        claim_id: event.claim_id,
        action: "suppress-until-current-admission"
      },
      puffy_recheck: {
        book_id: event.book_id,
        action: "recheck-admission-on-reopen",
        preserve_unavailable_marker: true
      }
    });
  }

  function purgeExpired(at = now()) {
    const timestamp = exactIso(at, "purge timestamp");
    const purged = [];
    for (const [correctionId, payload] of payloadVault) {
      if (Date.parse(payload.expires_at) <= Date.parse(timestamp)) {
        payloadVault.delete(correctionId);
        purged.push(correctionId);
      }
    }
    return deepFreeze(purged);
  }

  return Object.freeze({
    submit,
    triage,
    resolveCorrected,
    demote,
    propagation,
    purgeExpired,
    getHistory: (correctionId) => projectedHistory(correctionId),
    getReceipt: (correctionId) => receiptFor(latest(correctionId)),
    getReporterPayload: (correctionId) => clone(payloadVault.get(correctionId) || null),
    getImmutableLedger: () => deepFreeze(ledger.map(clone))
  });
}

export function assertPropagationConsumable(value) {
  exactObject(value, "propagation");
  for (const consumer of [
    "admission_compiler",
    "site_index",
    "miss_jeeves",
    "puffy_recheck"
  ]) {
    exactObject(value[consumer], consumer);
  }
  if (value.admission_compiler.required_correction_state === "clear") {
    fail("propagation may not set correction_state clear");
  }
  if (value.admission_compiler.requires_independent_readmission !== true) {
    fail("propagation must require independent readmission");
  }
  return true;
}
