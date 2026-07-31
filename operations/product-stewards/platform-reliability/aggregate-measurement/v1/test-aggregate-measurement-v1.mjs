import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  compileAudienceMeasurement,
  consumeSnapshot,
  payloadHash,
  sealSnapshot,
  sha256,
  validateSnapshot
} from "./aggregate-measurement-v1.mjs";

const root = resolve(import.meta.dirname, "../../../../..");
const statePath = resolve(root, "operations/product-stewards/audience-growth/measurement-state.json");
const externalPath = resolve(root, "operations/product-stewards/platform-reliability/external-services-state.json");
const dictionaryPath = resolve(root, "operations/product-stewards/event-dictionary.json");
const schemaPath = resolve(import.meta.dirname, "aggregate-measurement-v1.schema.json");
const stateBytes = readFileSync(statePath);
const state = JSON.parse(stateBytes);
const external = JSON.parse(readFileSync(externalPath, "utf8"));
const dictionary = JSON.parse(readFileSync(dictionaryPath, "utf8"));
const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const now = new Date(Date.parse(state.asOf) + 60 * 1000);
const snapshot = compileAudienceMeasurement(state, { sourceSha256: sha256(stateBytes) });

function validateBoundSchema(candidate) {
  assert.equal(candidate.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(candidate.additionalProperties, false);
  assert.ok(candidate.required.includes("privacy"));
  assert.ok(candidate.required.includes("integrity"));
  assert.equal(candidate.properties.schemaVersion.const, "laidies.aggregate-measurement.v1");
  assert.equal(candidate.properties.privacy.properties.rawDataRetained.const, false);
  assert.equal(candidate.properties.privacy.properties.minimumPublishedCohort.minimum, 5);
  assert.equal(candidate.properties.metrics.minItems, 4);
  assert.equal(candidate.properties.metrics.maxItems, 4);
  assert.ok(candidate.$defs.metric.properties.value.type.includes("null"));
  assert.equal(candidate.properties.integrity.properties.canonicalization.const, "RFC8785-JCS");
}

validateBoundSchema(schema);
validateSnapshot(snapshot, { now });
const { integrity: snapshotIntegrity, ...snapshotPayload } = snapshot;
assert.equal(snapshot.integrity.payloadSha256, payloadHash(snapshotPayload));
assert.deepEqual(snapshot.metrics.map((metric) => metric.value), [null, null, null, null]);
assert.deepEqual(snapshot.metrics.map((metric) => metric.status), [
  "not-connected", "not-connected", "not-verified", "not-connected"
]);
assert.equal(snapshot.pageRankings.items.length, 0);
assert.equal(snapshot.social.status, "repository-counts-only");
assert.equal(snapshot.social.planned, 35);
assert.equal(snapshot.social.builtLocally, 35);
assert.equal(snapshot.social.readyToPublish, 0);
assert.equal(snapshot.social.published, 0);

const accepted = consumeSnapshot(snapshot, { now });
assert.equal(accepted.status, "accepted");
assert.equal(accepted.metrics.visitors.value, null);

const plausible = external.services.find((service) => service.id === "plausible");
assert.ok(plausible);
assert.match(plausible.billingStatus, /^PAID/);
assert.ok(plausible.evidenceReference);
assert.match(plausible.usageStatus, /REPORTING NOT CONNECTED/);
const supabase = external.services.find((service) => service.id === "supabase");
assert.match(supabase.usageStatus, /PRODUCTION TRUTH UNPROVED/);
assert.match(dictionary.privacy_rule, /Aggregated product events only/);
assert.ok(dictionary.events.every((event) =>
  !event.safe_properties.some((property) =>
    ["email", "name", "account_id", "user_id", "resident_card_id", "session_id"].includes(property)
  )
));

function mutate(mutator) {
  const copy = structuredClone(snapshot);
  mutator(copy);
  const { integrity, ...payload } = copy;
  return sealSnapshot(payload);
}

const rejects = [
  ["UNKNOWN_MUST_BE_NULL", mutate((copy) => { copy.metrics[0].value = 0; })],
  ["READY_METRIC_VALUE_REQUIRED", mutate((copy) => {
    copy.sources[0].status = "ready";
    copy.metrics[0].status = "ready";
  })],
  ["UNAVAILABLE_RANKINGS_MUST_BE_EMPTY", mutate((copy) => {
    copy.pageRankings.items = [{ routeId: "library", visitors: 8 }];
  })],
  ["RANKING_ITEM_PRIVACY_INVALID", mutate((copy) => {
    copy.sources[0].status = "ready";
    copy.pageRankings.status = "ready";
    copy.pageRankings.items = [{ routeId: "library", visitors: 4 }];
  })],
  ["SOCIAL_PUBLICATION_UNVERIFIED", mutate((copy) => {
    copy.social.readyToPublish = 1;
    copy.social.published = 1;
  })],
  ["PRIVACY_PROHIBITIONS_INCOMPLETE", mutate((copy) => {
    copy.privacy.prohibitedFields = copy.privacy.prohibitedFields.filter((field) => field !== "email");
  })],
  ["RESIDENT_CARD_DEFINITION_WEAK", mutate((copy) => {
    copy.metrics.find((metric) => metric.id === "resident-card-signups").definition =
      "Any local Resident Card display or submitted signup form counted as a resident.";
  })],
  ["SOURCE_DUPLICATE", mutate((copy) => { copy.sources[2].id = "plausible"; })],
  ["PAYLOAD_HASH_MISMATCH", (() => {
    const copy = structuredClone(snapshot);
    copy.social.planned += 1;
    return copy;
  })()],
  ["FUTURE_SNAPSHOT", snapshot]
];

let invalid = 0;
for (const [code, candidate] of rejects) {
  const testNow = code === "FUTURE_SNAPSHOT"
    ? new Date(Date.parse(snapshot.generatedAt) - 1)
    : now;
  assert.throws(() => validateSnapshot(candidate, { now: testNow }), (error) => {
    assert.equal(error.code, code);
    return true;
  });
  const closed = consumeSnapshot(candidate, { now: testNow });
  assert.equal(closed.status, "fail-closed");
  assert.ok(Object.values(closed.metrics).every((metric) => metric.value === null));
  invalid += 1;
}

const stale = consumeSnapshot(snapshot, { now: new Date(Date.parse(snapshot.validUntil) + 1) });
assert.equal(stale.status, "fail-closed");
assert.equal(stale.reason, "SNAPSHOT_STALE");

for (const mutateSchema of [
  (copy) => { copy.properties.privacy.properties.minimumPublishedCohort.minimum = 0; },
  (copy) => { copy.properties.privacy.properties.rawDataRetained.const = true; },
  (copy) => { copy.required = copy.required.filter((field) => field !== "integrity"); }
]) {
  const copy = structuredClone(schema);
  mutateSchema(copy);
  assert.throws(() => validateBoundSchema(copy));
}

console.log(
  `AGGREGATE MEASUREMENT V1 PASS metrics=4 null_unknown=4 sources=3 ` +
  `invalid=${invalid} stale=1 schema_mutations=3 privacy=aggregate-only provider=none`
);
