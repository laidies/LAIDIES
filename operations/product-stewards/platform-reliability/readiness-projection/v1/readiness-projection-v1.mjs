import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const CANONICAL_DESTINATIONS = Object.freeze(
  JSON.parse(readFileSync(join(here, "canonical-destinations.json"), "utf8"))
);

const DESTINATION_STATES = new Set(["available", "limited", "held", "withdrawn"]);
const CURRENT_STATES = new Set(["available", "quiet", "held", "withdrawn"]);
const CURRENT_SLOTS = new Set(["latest-episode", "breaking", "daily"]);
const ARTIFACT_KINDS = new Set([
  "none",
  "local-evidence",
  "release-candidate",
  "deployment"
]);
const MAX_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;
const SHA256 = /^[0-9a-f]{64}$/;
const PROJECTION_ID = /^readiness-[a-z0-9-]+-v[0-9]+$/;

export class ProjectionContractError extends Error {
  constructor(code, detail = "") {
    super(`${code}${detail ? `: ${detail}` : ""}`);
    this.code = code;
  }
}

export function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) =>
    `${JSON.stringify(key)}:${canonicalize(value[key])}`
  ).join(",")}}`;
}

export function shaBytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function shaValue(value) {
  return shaBytes(Buffer.from(canonicalize(value), "utf8"));
}

function exactKeys(value, expected, code) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ProjectionContractError(code);
  }
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  if (JSON.stringify(actual) !== JSON.stringify(wanted)) {
    throw new ProjectionContractError(code, actual.join(","));
  }
}

function nonempty(value, code, max = Infinity) {
  if (typeof value !== "string" || !value.trim() || value.length > max) {
    throw new ProjectionContractError(code);
  }
}

function timestamp(value, code) {
  const time = Date.parse(value);
  if (typeof value !== "string" || !Number.isFinite(time)) {
    throw new ProjectionContractError(code);
  }
  return time;
}

function validateArtifact(artifact) {
  exactKeys(artifact, ["kind", "id", "sha256"], "ARTIFACT_SHAPE_INVALID");
  if (!ARTIFACT_KINDS.has(artifact.kind)) {
    throw new ProjectionContractError("ARTIFACT_KIND_INVALID");
  }
  if (artifact.kind === "none") {
    if (artifact.id !== null || artifact.sha256 !== null) {
      throw new ProjectionContractError("ARTIFACT_NONE_NOT_NULL");
    }
  } else if (
    typeof artifact.id !== "string" ||
    !artifact.id ||
    !SHA256.test(artifact.sha256)
  ) {
    throw new ProjectionContractError("ARTIFACT_BINDING_INCOMPLETE");
  }
}

function validateEvidence(evidence, generatedAt) {
  exactKeys(evidence, ["path", "sha256", "observedAt"], "EVIDENCE_SHAPE_INVALID");
  nonempty(evidence.path, "EVIDENCE_PATH_INVALID");
  if (!SHA256.test(evidence.sha256)) {
    throw new ProjectionContractError("EVIDENCE_HASH_INVALID");
  }
  if (timestamp(evidence.observedAt, "EVIDENCE_TIME_INVALID") > generatedAt) {
    throw new ProjectionContractError("EVIDENCE_AFTER_PROJECTION");
  }
}

function validateFreshness(freshUntil, generatedAt, validUntil) {
  const fresh = timestamp(freshUntil, "ITEM_FRESHNESS_INVALID");
  if (fresh <= generatedAt || fresh > validUntil) {
    throw new ProjectionContractError("ITEM_FRESHNESS_OUTSIDE_ENVELOPE");
  }
}

function validateDestination(item, canonical, generatedAt, validUntil) {
  exactKeys(item, [
    "destinationId",
    "productId",
    "ownerId",
    "name",
    "route",
    "state",
    "label",
    "summary",
    "limitation",
    "disposition",
    "freshUntil",
    "evidence",
    "artifact"
  ], "DESTINATION_SHAPE_INVALID");
  for (const key of ["destinationId", "productId", "ownerId", "name", "route"]) {
    if (item[key] !== canonical[key]) {
      throw new ProjectionContractError(
        "DESTINATION_CANON_MISMATCH",
        `${canonical.destinationId}.${key}`
      );
    }
  }
  if (!DESTINATION_STATES.has(item.state)) {
    throw new ProjectionContractError("DESTINATION_STATE_INVALID");
  }
  nonempty(item.label, "DESTINATION_LABEL_INVALID", 80);
  nonempty(item.summary, "DESTINATION_SUMMARY_INVALID", 240);
  nonempty(item.limitation, "DESTINATION_LIMITATION_REQUIRED", 320);
  nonempty(item.disposition, "DESTINATION_DISPOSITION_INVALID", 100);
  validateFreshness(item.freshUntil, generatedAt, validUntil);
  validateEvidence(item.evidence, generatedAt);
  validateArtifact(item.artifact);
  if (item.state === "available" && item.artifact.kind === "none") {
    throw new ProjectionContractError("AVAILABLE_WITHOUT_ARTIFACT");
  }
}

function validateCurrentItem(item, generatedAt, validUntil) {
  exactKeys(item, [
    "slot",
    "ownerId",
    "state",
    "label",
    "title",
    "route",
    "publishedOn",
    "limitation",
    "disposition",
    "freshUntil",
    "evidence",
    "artifact"
  ], "CURRENT_ITEM_SHAPE_INVALID");
  if (!CURRENT_SLOTS.has(item.slot)) {
    throw new ProjectionContractError("CURRENT_SLOT_INVALID");
  }
  nonempty(item.ownerId, "CURRENT_OWNER_INVALID");
  if (!CURRENT_STATES.has(item.state)) {
    throw new ProjectionContractError("CURRENT_STATE_INVALID");
  }
  nonempty(item.label, "CURRENT_LABEL_INVALID", 80);
  nonempty(item.limitation, "CURRENT_LIMITATION_REQUIRED", 320);
  nonempty(item.disposition, "CURRENT_DISPOSITION_INVALID", 100);
  validateFreshness(item.freshUntil, generatedAt, validUntil);
  validateEvidence(item.evidence, generatedAt);
  validateArtifact(item.artifact);

  if (item.state === "quiet") {
    if (item.title !== null || item.route !== null || item.publishedOn !== null) {
      throw new ProjectionContractError("QUIET_ITEM_CARRIES_CONTENT");
    }
  } else if (item.state === "withdrawn") {
    if (item.route !== null || item.artifact.kind !== "none") {
      throw new ProjectionContractError("WITHDRAWN_ITEM_ACTIONABLE");
    }
  } else {
    nonempty(item.title, "CURRENT_TITLE_REQUIRED", 160);
    if (typeof item.route !== "string" || !item.route.startsWith("/")) {
      throw new ProjectionContractError("CURRENT_ROUTE_REQUIRED");
    }
  }
  if (
    item.slot === "latest-episode" &&
    item.state === "available" &&
    !/^\d{4}-\d{2}-\d{2}$/.test(item.publishedOn || "")
  ) {
    throw new ProjectionContractError("EPISODE_PUBLICATION_DATE_REQUIRED");
  }
}

export function validateProjectionPayload(payload, now = new Date()) {
  exactKeys(payload, [
    "projectionId",
    "sequence",
    "generatedAt",
    "validUntil",
    "replacesProjectionId",
    "fallbackRoute",
    "destinations",
    "currentContent"
  ], "PAYLOAD_SHAPE_INVALID");
  if (!PROJECTION_ID.test(payload.projectionId)) {
    throw new ProjectionContractError("PROJECTION_ID_INVALID");
  }
  if (!Number.isSafeInteger(payload.sequence) || payload.sequence < 1) {
    throw new ProjectionContractError("PROJECTION_SEQUENCE_INVALID");
  }
  if (
    payload.replacesProjectionId !== null &&
    (typeof payload.replacesProjectionId !== "string" ||
      !payload.replacesProjectionId)
  ) {
    throw new ProjectionContractError("REPLACEMENT_ID_INVALID");
  }
  if (payload.fallbackRoute !== "/visitors-centre.html") {
    throw new ProjectionContractError("FALLBACK_ROUTE_INVALID");
  }

  const generatedAt = timestamp(payload.generatedAt, "GENERATED_AT_INVALID");
  const validUntil = timestamp(payload.validUntil, "VALID_UNTIL_INVALID");
  const observedNow = now instanceof Date ? now.getTime() : timestamp(now, "NOW_INVALID");
  if (generatedAt > observedNow + MAX_CLOCK_SKEW_MS) {
    throw new ProjectionContractError("PROJECTION_FROM_FUTURE");
  }
  if (validUntil <= observedNow) {
    throw new ProjectionContractError("PROJECTION_STALE");
  }
  if (validUntil <= generatedAt || validUntil - generatedAt > MAX_WINDOW_MS) {
    throw new ProjectionContractError("PROJECTION_WINDOW_INVALID");
  }

  if (!Array.isArray(payload.destinations) ||
      payload.destinations.length !== CANONICAL_DESTINATIONS.length) {
    throw new ProjectionContractError("DESTINATION_SET_INCOMPLETE");
  }
  const byId = new Map();
  for (const item of payload.destinations) {
    if (byId.has(item.destinationId)) {
      throw new ProjectionContractError("DESTINATION_ID_DUPLICATE");
    }
    byId.set(item.destinationId, item);
  }
  for (const canonical of CANONICAL_DESTINATIONS) {
    const item = byId.get(canonical.destinationId);
    if (!item) {
      throw new ProjectionContractError(
        "DESTINATION_MISSING",
        canonical.destinationId
      );
    }
    validateDestination(item, canonical, generatedAt, validUntil);
  }

  if (!Array.isArray(payload.currentContent) || payload.currentContent.length !== 3) {
    throw new ProjectionContractError("CURRENT_SET_INCOMPLETE");
  }
  const slots = new Set();
  for (const item of payload.currentContent) {
    if (slots.has(item.slot)) {
      throw new ProjectionContractError("CURRENT_SLOT_DUPLICATE");
    }
    slots.add(item.slot);
    validateCurrentItem(item, generatedAt, validUntil);
  }
  for (const required of CURRENT_SLOTS) {
    if (!slots.has(required)) {
      throw new ProjectionContractError("CURRENT_SLOT_MISSING", required);
    }
  }
  return true;
}

async function verifySourceEvidence(payload, readEvidence) {
  if (typeof readEvidence !== "function") {
    throw new ProjectionContractError("SOURCE_READER_REQUIRED");
  }
  const records = [...payload.destinations, ...payload.currentContent];
  for (const record of records) {
    let bytes;
    try {
      bytes = await readEvidence(record.evidence.path);
    } catch {
      throw new ProjectionContractError(
        "SOURCE_EVIDENCE_MISSING",
        record.evidence.path
      );
    }
    if (shaBytes(bytes) !== record.evidence.sha256) {
      throw new ProjectionContractError(
        "SOURCE_EVIDENCE_HASH_MISMATCH",
        record.evidence.path
      );
    }
  }
}

export async function sealProjectionDraft(payload, options = {}) {
  const now = options.now || new Date(payload.generatedAt);
  validateProjectionPayload(payload, now);
  await verifySourceEvidence(payload, options.readEvidence);
  return {
    schemaVersion: "1.0.0",
    recordType: "readiness-current-projection",
    payload: structuredClone(payload),
    integrity: {
      algorithm: "sha-256",
      canonicalization: "RFC8785-JCS",
      payloadSha256: shaValue(payload)
    }
  };
}

function fallback(errorCode) {
  return {
    mode: "fail-closed",
    errorCode,
    projectionId: null,
    projectionSha256: null,
    sequence: null,
    replay: false,
    currentContent: [],
    destinations: CANONICAL_DESTINATIONS.map((item) => ({
      ...item,
      state: "unavailable",
      label: "Current status unavailable",
      summary: "Open the named route only to check its current page.",
      limitation:
        "Current readiness could not be verified. Route arrival is navigation, not completion.",
      disposition: "FAIL_CLOSED_STATUS_UNAVAILABLE",
      completionClaim: false
    }))
  };
}

export function receiveProjection(envelope, options = {}) {
  try {
    exactKeys(
      envelope,
      ["schemaVersion", "recordType", "payload", "integrity"],
      "ENVELOPE_SHAPE_INVALID"
    );
    if (
      envelope.schemaVersion !== "1.0.0" ||
      envelope.recordType !== "readiness-current-projection"
    ) {
      throw new ProjectionContractError("ENVELOPE_VERSION_INVALID");
    }
    exactKeys(
      envelope.integrity,
      ["algorithm", "canonicalization", "payloadSha256"],
      "INTEGRITY_SHAPE_INVALID"
    );
    if (
      envelope.integrity.algorithm !== "sha-256" ||
      envelope.integrity.canonicalization !== "RFC8785-JCS" ||
      !SHA256.test(envelope.integrity.payloadSha256)
    ) {
      throw new ProjectionContractError("INTEGRITY_CONTRACT_INVALID");
    }
    const payloadSha256 = shaValue(envelope.payload);
    if (payloadSha256 !== envelope.integrity.payloadSha256) {
      throw new ProjectionContractError("PAYLOAD_HASH_MISMATCH");
    }
    if (
      options.expectedPayloadSha256 &&
      options.expectedPayloadSha256 !== payloadSha256
    ) {
      throw new ProjectionContractError("RELEASE_BINDING_MISMATCH");
    }
    validateProjectionPayload(envelope.payload, options.now || new Date());

    const previous = options.previousReceipt || null;
    if (previous) {
      if (envelope.payload.projectionId === previous.projectionId) {
        if (payloadSha256 !== previous.projectionSha256) {
          throw new ProjectionContractError("IDEMPOTENCY_CONFLICT");
        }
        return {
          mode: "fresh",
          errorCode: null,
          projectionId: envelope.payload.projectionId,
          projectionSha256: payloadSha256,
          sequence: envelope.payload.sequence,
          replay: true,
          currentContent: structuredClone(envelope.payload.currentContent),
          destinations: envelope.payload.destinations.map((item) => ({
            ...structuredClone(item),
            completionClaim: false
          }))
        };
      }
      if (envelope.payload.sequence <= previous.sequence) {
        throw new ProjectionContractError("NON_MONOTONIC_PROJECTION");
      }
      if (envelope.payload.replacesProjectionId !== previous.projectionId) {
        throw new ProjectionContractError("REPLACEMENT_CHAIN_GAP");
      }
    } else if (envelope.payload.sequence !== 1 ||
               envelope.payload.replacesProjectionId !== null) {
      throw new ProjectionContractError("INITIAL_PROJECTION_INVALID");
    }

    return {
      mode: "fresh",
      errorCode: null,
      projectionId: envelope.payload.projectionId,
      projectionSha256: payloadSha256,
      sequence: envelope.payload.sequence,
      replay: false,
      currentContent: structuredClone(envelope.payload.currentContent),
      destinations: envelope.payload.destinations.map((item) => ({
        ...structuredClone(item),
        completionClaim: false
      }))
    };
  } catch (error) {
    return fallback(error instanceof ProjectionContractError
      ? error.code
      : "PROJECTION_UNKNOWN_ERROR");
  }
}

export function visitorCentreSemanticReceiver(receipt) {
  if (!receipt || !Array.isArray(receipt.destinations) ||
      receipt.destinations.length !== CANONICAL_DESTINATIONS.length) {
    return visitorCentreSemanticReceiver(fallback("RECEIVER_INPUT_INVALID"));
  }
  return {
    mode: receipt.mode,
    errorCode: receipt.errorCode,
    announcement: receipt.mode === "fresh"
      ? "Current destination status loaded."
      : "Current destination status is unavailable. All named routes remain available for status checking.",
    destinations: receipt.destinations.map((item) => ({
      destinationId: item.destinationId,
      name: item.name,
      route: item.state === "withdrawn"
        ? "/visitors-centre.html"
        : item.route,
      state: item.state,
      label: item.label,
      summary: item.summary,
      limitation: item.limitation,
      actionLabel: item.state === "available"
        ? "Open destination"
        : item.state === "limited"
          ? "Open destination — check limits"
          : "Open page — check current status",
      completionClaim: false
    }))
  };
}

export function entryCurrentContentReceiver(receipt) {
  if (!receipt || receipt.mode !== "fresh" ||
      !Array.isArray(receipt.currentContent) ||
      receipt.currentContent.length !== 3) {
    return {
      mode: "fail-closed",
      errorCode: receipt?.errorCode || "RECEIVER_INPUT_INVALID",
      announcement:
        "Current-content status is unavailable. Evergreen navigation remains.",
      items: []
    };
  }
  return {
    mode: "fresh",
    errorCode: null,
    announcement: "Current-content status loaded.",
    items: receipt.currentContent.map((item) => ({
      slot: item.slot,
      state: item.state,
      label: item.label,
      title: item.title,
      route: item.state === "available" ? item.route : null,
      publishedOn: item.publishedOn,
      limitation: item.limitation,
      promotable: item.state === "available",
      completionClaim: false
    }))
  };
}

export function projectionAnalyticsEvent(receipt, surface) {
  const allowedSurfaces = new Set(["homepage", "start-here", "visitors-centre"]);
  if (!allowedSurfaces.has(surface)) {
    throw new ProjectionContractError("ANALYTICS_SURFACE_INVALID");
  }
  return {
    event: receipt.mode === "fresh"
      ? "entry_projection_received"
      : "entry_projection_failed_closed",
    properties: {
      schema_version: "1.0.0",
      surface,
      receiver_mode: receipt.mode,
      error_code: receipt.errorCode || "none"
    }
  };
}
