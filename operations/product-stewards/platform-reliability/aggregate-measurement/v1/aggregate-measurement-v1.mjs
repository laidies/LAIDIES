import { createHash } from "node:crypto";

export const SCHEMA_VERSION = "laidies.aggregate-measurement.v1";
export const METRIC_IDS = [
  "visitors",
  "new-visitors",
  "resident-card-signups",
  "returning-rate"
];
export const SOURCE_IDS = ["plausible", "resident-card", "social"];
export const PROHIBITED_FIELDS = [
  "email",
  "name",
  "account_id",
  "user_id",
  "resident_card_id",
  "ip_address",
  "user_agent",
  "session_id",
  "raw_url",
  "query_string",
  "prompt",
  "message_body",
  "saved_content",
  "clarity_recording"
];

const SHA256 = /^[a-f0-9]{64}$/;
const SNAPSHOT_ID = /^AUD-MEAS-\d{4}-\d{2}-\d{2}-[A-Z0-9-]+$/;
const READY = new Set(["ready"]);
const UNAVAILABLE = new Set([
  "unknown",
  "not-connected",
  "not-verified",
  "stale",
  "provider-error",
  "suppressed"
]);

export function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) =>
    `${JSON.stringify(key)}:${canonicalize(value[key])}`
  ).join(",")}}`;
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function payloadHash(payload) {
  return sha256(canonicalize(payload));
}

function fail(code, detail = "") {
  const error = new Error(detail ? `${code}: ${detail}` : code);
  error.code = code;
  throw error;
}

function exactKeys(value, keys, code) {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(code);
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  if (actual.length !== expected.length || actual.some((key, i) => key !== expected[i])) {
    fail(code);
  }
}

function iso(value, code) {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) fail(code);
  return Date.parse(value);
}

function nonempty(value, code, min = 3) {
  if (typeof value !== "string" || value.trim().length < min) fail(code);
}

function validateSource(source, generatedAt) {
  exactKeys(source, ["id", "status", "observedAt", "freshUntil", "evidenceRef", "owner", "nextAction"], "SOURCE_SHAPE_INVALID");
  if (!SOURCE_IDS.includes(source.id)) fail("SOURCE_ID_INVALID");
  if (!["ready", "not-connected", "not-verified", "manual-partial", "stale", "provider-error"].includes(source.status)) {
    fail("SOURCE_STATUS_INVALID", source.id);
  }
  const observedAt = iso(source.observedAt, "SOURCE_TIME_INVALID");
  const freshUntil = iso(source.freshUntil, "SOURCE_TIME_INVALID");
  if (observedAt > generatedAt || freshUntil < observedAt) fail("SOURCE_TIME_ORDER_INVALID", source.id);
  nonempty(source.evidenceRef, "SOURCE_EVIDENCE_REQUIRED", 5);
  nonempty(source.owner, "SOURCE_OWNER_REQUIRED");
  nonempty(source.nextAction, "SOURCE_ACTION_REQUIRED", 10);
}

function validateMetric(metric, sources) {
  exactKeys(metric, ["id", "definitionVersion", "definition", "value", "unit", "status", "sourceId", "owner", "nextAction"], "METRIC_SHAPE_INVALID");
  if (!METRIC_IDS.includes(metric.id)) fail("METRIC_ID_INVALID");
  if (metric.definitionVersion !== "v1") fail("METRIC_DEFINITION_VERSION_INVALID");
  nonempty(metric.definition, "METRIC_DEFINITION_REQUIRED", 20);
  if (!["people", "percent"].includes(metric.unit)) fail("METRIC_UNIT_INVALID");
  if (!["ready", ...UNAVAILABLE].includes(metric.status)) fail("METRIC_STATUS_INVALID");
  if (!["plausible", "resident-card"].includes(metric.sourceId)) fail("METRIC_SOURCE_INVALID");
  if (!sources.has(metric.sourceId)) fail("METRIC_SOURCE_MISSING");
  if (READY.has(metric.status)) {
    if (typeof metric.value !== "number" || !Number.isFinite(metric.value) || metric.value < 0) {
      fail("READY_METRIC_VALUE_REQUIRED", metric.id);
    }
    if (sources.get(metric.sourceId).status !== "ready") fail("READY_METRIC_SOURCE_NOT_READY", metric.id);
  } else if (metric.value !== null) {
    fail("UNKNOWN_MUST_BE_NULL", metric.id);
  }
  if (metric.id === "returning-rate" && metric.value !== null && metric.value > 100) {
    fail("PERCENT_OUT_OF_RANGE");
  }
  if (metric.id === "resident-card-signups" && !metric.definition.includes("verified account-backed")) {
    fail("RESIDENT_CARD_DEFINITION_WEAK");
  }
  nonempty(metric.owner, "METRIC_OWNER_REQUIRED");
  nonempty(metric.nextAction, "METRIC_ACTION_REQUIRED", 10);
}

export function validateSnapshot(envelope, { now = new Date() } = {}) {
  exactKeys(envelope, [
    "schemaVersion", "snapshotId", "generatedAt", "validUntil", "period",
    "provenance", "privacy", "sources", "metrics", "pageRankings", "social", "integrity"
  ], "ENVELOPE_SHAPE_INVALID");
  if (envelope.schemaVersion !== SCHEMA_VERSION) fail("SCHEMA_VERSION_INVALID");
  if (!SNAPSHOT_ID.test(envelope.snapshotId)) fail("SNAPSHOT_ID_INVALID");
  const generatedAt = iso(envelope.generatedAt, "GENERATED_AT_INVALID");
  const validUntil = iso(envelope.validUntil, "VALID_UNTIL_INVALID");
  if (generatedAt > now.getTime()) fail("FUTURE_SNAPSHOT");
  if (validUntil <= generatedAt) fail("VALIDITY_ORDER_INVALID");

  exactKeys(envelope.period, ["start", "end", "timezone"], "PERIOD_SHAPE_INVALID");
  if (envelope.period.timezone !== "America/Vancouver" || envelope.period.start > envelope.period.end) {
    fail("PERIOD_INVALID");
  }
  exactKeys(envelope.provenance, ["sourcePath", "sourceSha256", "observedAt"], "PROVENANCE_SHAPE_INVALID");
  if (envelope.provenance.sourcePath !== "operations/product-stewards/audience-growth/measurement-state.json") {
    fail("PROVENANCE_PATH_INVALID");
  }
  if (!SHA256.test(envelope.provenance.sourceSha256)) fail("PROVENANCE_HASH_INVALID");
  if (iso(envelope.provenance.observedAt, "PROVENANCE_TIME_INVALID") > generatedAt) {
    fail("PROVENANCE_FUTURE");
  }

  exactKeys(envelope.privacy, ["mode", "minimumPublishedCohort", "rawDataRetained", "prohibitedFields"], "PRIVACY_SHAPE_INVALID");
  if (envelope.privacy.mode !== "aggregate-only" || envelope.privacy.rawDataRetained !== false) fail("PRIVACY_MODE_INVALID");
  if (!Number.isInteger(envelope.privacy.minimumPublishedCohort) || envelope.privacy.minimumPublishedCohort < 5) {
    fail("COHORT_THRESHOLD_INVALID");
  }
  if (!Array.isArray(envelope.privacy.prohibitedFields) ||
      PROHIBITED_FIELDS.some((field) => !envelope.privacy.prohibitedFields.includes(field))) {
    fail("PRIVACY_PROHIBITIONS_INCOMPLETE");
  }

  if (!Array.isArray(envelope.sources) || envelope.sources.length !== 3) fail("SOURCES_INVALID");
  const sources = new Map();
  for (const source of envelope.sources) {
    validateSource(source, generatedAt);
    if (sources.has(source.id)) fail("SOURCE_DUPLICATE");
    sources.set(source.id, source);
  }
  if (SOURCE_IDS.some((id) => !sources.has(id))) fail("SOURCE_MISSING");

  if (!Array.isArray(envelope.metrics) || envelope.metrics.length !== 4) fail("METRICS_INVALID");
  const metricIds = new Set();
  for (const metric of envelope.metrics) {
    validateMetric(metric, sources);
    if (metricIds.has(metric.id)) fail("METRIC_DUPLICATE");
    metricIds.add(metric.id);
  }
  if (METRIC_IDS.some((id) => !metricIds.has(id))) fail("METRIC_MISSING");

  exactKeys(envelope.pageRankings, ["status", "definition", "items", "owner", "nextAction"], "RANKINGS_SHAPE_INVALID");
  if (!["ready", "unknown", "not-connected", "stale", "provider-error"].includes(envelope.pageRankings.status)) {
    fail("RANKINGS_STATUS_INVALID");
  }
  if (!Array.isArray(envelope.pageRankings.items)) fail("RANKINGS_ITEMS_INVALID");
  if (envelope.pageRankings.status !== "ready" && envelope.pageRankings.items.length !== 0) {
    fail("UNAVAILABLE_RANKINGS_MUST_BE_EMPTY");
  }
  if (envelope.pageRankings.status === "ready" && sources.get("plausible").status !== "ready") {
    fail("RANKINGS_SOURCE_NOT_READY");
  }
  for (const item of envelope.pageRankings.items) {
    exactKeys(item, ["routeId", "visitors"], "RANKING_ITEM_SHAPE_INVALID");
    if (!/^[a-z0-9-]+$/.test(item.routeId) || !Number.isInteger(item.visitors) ||
        item.visitors < envelope.privacy.minimumPublishedCohort) {
      fail("RANKING_ITEM_PRIVACY_INVALID");
    }
  }
  nonempty(envelope.pageRankings.definition, "RANKINGS_DEFINITION_REQUIRED", 20);
  nonempty(envelope.pageRankings.owner, "RANKINGS_OWNER_REQUIRED");
  nonempty(envelope.pageRankings.nextAction, "RANKINGS_ACTION_REQUIRED", 10);

  exactKeys(envelope.social, [
    "status", "planned", "builtLocally", "readyToPublish", "published",
    "evidenceRef", "owner", "nextAction"
  ], "SOCIAL_SHAPE_INVALID");
  if (!["repository-counts-only", "provider-verified"].includes(envelope.social.status)) fail("SOCIAL_STATUS_INVALID");
  for (const field of ["planned", "builtLocally", "readyToPublish", "published"]) {
    if (!Number.isInteger(envelope.social[field]) || envelope.social[field] < 0) fail("SOCIAL_COUNT_INVALID", field);
  }
  if (envelope.social.readyToPublish > envelope.social.builtLocally ||
      envelope.social.published > envelope.social.readyToPublish) fail("SOCIAL_COUNT_ORDER_INVALID");
  if (envelope.social.status === "repository-counts-only" && envelope.social.published !== 0) {
    fail("SOCIAL_PUBLICATION_UNVERIFIED");
  }
  nonempty(envelope.social.evidenceRef, "SOCIAL_EVIDENCE_REQUIRED", 5);
  nonempty(envelope.social.owner, "SOCIAL_OWNER_REQUIRED");
  nonempty(envelope.social.nextAction, "SOCIAL_ACTION_REQUIRED", 10);

  exactKeys(envelope.integrity, ["algorithm", "canonicalization", "payloadSha256"], "INTEGRITY_SHAPE_INVALID");
  if (envelope.integrity.algorithm !== "SHA-256" || envelope.integrity.canonicalization !== "RFC8785-JCS") {
    fail("INTEGRITY_METHOD_INVALID");
  }
  const { integrity, ...payload } = envelope;
  if (envelope.integrity.payloadSha256 !== payloadHash(payload)) fail("PAYLOAD_HASH_MISMATCH");
  return envelope;
}

export function sealSnapshot(payload) {
  const envelope = {
    ...payload,
    integrity: {
      algorithm: "SHA-256",
      canonicalization: "RFC8785-JCS",
      payloadSha256: payloadHash(payload)
    }
  };
  return envelope;
}

export function consumeSnapshot(envelope, { now = new Date() } = {}) {
  try {
    validateSnapshot(envelope, { now });
    if (Date.parse(envelope.validUntil) < now.getTime()) fail("SNAPSHOT_STALE");
    return {
      status: "accepted",
      snapshotId: envelope.snapshotId,
      metrics: Object.fromEntries(envelope.metrics.map((metric) => [metric.id, {
        value: metric.value,
        status: metric.status
      }])),
      pageRankings: envelope.pageRankings.items,
      social: {
        status: envelope.social.status,
        planned: envelope.social.planned,
        builtLocally: envelope.social.builtLocally,
        readyToPublish: envelope.social.readyToPublish,
        published: envelope.social.published
      }
    };
  } catch (error) {
    return {
      status: "fail-closed",
      reason: error.code || "INVALID_SNAPSHOT",
      snapshotId: null,
      metrics: Object.fromEntries(METRIC_IDS.map((id) => [id, { value: null, status: "unknown" }])),
      pageRankings: [],
      social: null
    };
  }
}

export function compileAudienceMeasurement(state, { sourceSha256 }) {
  const observedAt = state.asOf;
  const validUntil = new Date(Date.parse(observedAt) + 24 * 60 * 60 * 1000).toISOString();
  const sourceStatus = new Map(state.sourceStatus.map((row) => [row.source, row]));
  const metricStatus = {
    "NOT CONNECTED": "not-connected",
    "NOT VERIFIED": "not-verified"
  };
  const sourceId = {
    visitors: "plausible",
    "new-visitors": "plausible",
    "resident-card-signups": "resident-card",
    "returning-rate": "plausible"
  };
  const unit = {
    visitors: "people",
    "new-visitors": "people",
    "resident-card-signups": "people",
    "returning-rate": "percent"
  };
  const metricDefinition = {
    visitors: "Plausible unique visitors for the exact selected period; aggregate only.",
    "new-visitors": "Visitors classified as new by a named approved provider method for the exact selected period.",
    "resident-card-signups": "First verified account-backed Resident Card creation in the canonical profile store; device-local Cards, previews, form submits and auth attempts do not count.",
    "returning-rate": "Approved provider aggregate returning-visitor percentage for the exact selected period; it does not prove account identity or cross-device return."
  };
  const metricOwner = {
    visitors: "Audience & Growth + Platform",
    "new-visitors": "Audience & Growth + Platform",
    "resident-card-signups": "Identity + Platform",
    "returning-rate": "Audience & Growth + Platform"
  };
  const metricAction = {
    visitors: "Authorize a read-only Plausible aggregate report or Stats API path.",
    "new-visitors": "Approve and record the provider methodology before importing the aggregate.",
    "resident-card-signups": "Apply and verify Identity in staging, then expose a suppressed daily aggregate query.",
    "returning-rate": "Authorize Plausible reporting and record its returning-visitor definition."
  };
  const period = state.period || {};
  const social = state.social?.rollingSevenDay || {};
  const payload = {
    schemaVersion: SCHEMA_VERSION,
    snapshotId: `AUD-MEAS-${observedAt.slice(0, 10)}-WEEK-01`,
    generatedAt: observedAt,
    validUntil,
    period: {
      start: period.start || social.start,
      end: period.end || social.end,
      timezone: "America/Vancouver"
    },
    provenance: {
      sourcePath: "operations/product-stewards/audience-growth/measurement-state.json",
      sourceSha256,
      observedAt
    },
    privacy: {
      mode: "aggregate-only",
      minimumPublishedCohort: 5,
      rawDataRetained: false,
      prohibitedFields: [...PROHIBITED_FIELDS]
    },
    sources: [
      {
        id: "plausible",
        status: "not-connected",
        observedAt,
        freshUntil: validUntil,
        evidenceRef: sourceStatus.get("Plausible")?.evidence || "Plausible reporting unavailable.",
        owner: "Audience & Growth + Platform",
        nextAction: sourceStatus.get("Plausible")?.unblock || "Authorize a read-only aggregate reporting path."
      },
      {
        id: "resident-card",
        status: "not-verified",
        observedAt,
        freshUntil: validUntil,
        evidenceRef: sourceStatus.get("Resident Card / Supabase")?.evidence || "Production count unverified.",
        owner: "Identity + Platform",
        nextAction: sourceStatus.get("Resident Card / Supabase")?.unblock || "Verify account-backed creation in staging."
      },
      {
        id: "social",
        status: "manual-partial",
        observedAt,
        freshUntil: validUntil,
        evidenceRef: social.evidence || "Manual repository evidence only.",
        owner: "Audience & Growth",
        nextAction: sourceStatus.get("Social platforms")?.unblock || "Connect aggregate platform exports under account authority."
      }
    ],
    metrics: state.metrics.map((metric) => ({
      id: metric.id,
      definitionVersion: "v1",
      definition: metricDefinition[metric.id],
      value: metric.value,
      unit: unit[metric.id],
      status: metricStatus[metric.status] || "unknown",
      sourceId: sourceId[metric.id],
      owner: metricOwner[metric.id],
      nextAction: metricAction[metric.id]
    })),
    pageRankings: {
      status: "not-connected",
      definition: "Routes ranked by aggregate unique visitors for the exact period only after exposure and cohort suppression are satisfied; absence is not unpopularity.",
      items: [],
      owner: "Audience & Growth + Platform",
      nextAction: "Connect a read-only aggregate page report and apply the minimum cohort threshold."
    },
    social: {
      status: "repository-counts-only",
      planned: social.planned,
      builtLocally: social.builtLocally,
      readyToPublish: social.readyToPublish,
      published: social.published,
      evidenceRef: social.evidence,
      owner: "Audience & Growth",
      nextAction: "Keep production, admission and publication counts separate; bind any publication to provider URL and time receipts."
    }
  };
  return sealSnapshot(payload);
}
