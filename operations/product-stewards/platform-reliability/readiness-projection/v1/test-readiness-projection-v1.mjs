import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  CANONICAL_DESTINATIONS,
  entryCurrentContentReceiver,
  projectionAnalyticsEvent,
  receiveProjection,
  sealProjectionDraft,
  shaValue,
  visitorCentreSemanticReceiver
} from "./readiness-projection-v1.mjs";
import {
  FIXTURE_EVIDENCE_BYTES,
  fixtureReadEvidence,
  makeValidDraft,
  makeValidEnvelope
} from "./fixtures-v1.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const schema = join(here, "readiness-current-projection-v1.schema.json");
const temporary = await mkdtemp(join(tmpdir(), "laidies-readiness-v1-"));
const now = new Date("2026-07-26T18:16:00Z");

function reseal(envelope) {
  envelope.integrity.payloadSha256 = shaValue(envelope.payload);
  return envelope;
}

function mutate(envelope, change, shouldReseal = true) {
  const candidate = structuredClone(envelope);
  change(candidate);
  return shouldReseal ? reseal(candidate) : candidate;
}

async function schemaAccepts(name, value) {
  const path = join(temporary, `${name}.json`);
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`);
  const result = spawnSync(
    "npx",
    [
      "--yes",
      "ajv-cli@5.0.0",
      "validate",
      "--spec=draft2020",
      "--strict=false",
      "--all-errors",
      "-s",
      schema,
      "-d",
      path
    ],
    { encoding: "utf8" }
  );
  return result.status === 0;
}

try {
  const envelope = await makeValidEnvelope();
  assert.equal(await schemaAccepts("valid", envelope), true);

  const accepted = receiveProjection(envelope, { now });
  assert.equal(accepted.mode, "fresh");
  assert.equal(accepted.destinations.length, 17);
  assert.equal(accepted.currentContent.length, 3);
  assert.equal(accepted.replay, false);
  assert.ok(accepted.destinations.every((item) => item.completionClaim === false));

  const visitor = visitorCentreSemanticReceiver(accepted);
  assert.equal(visitor.mode, "fresh");
  assert.equal(visitor.destinations.length, 17);
  assert.deepEqual(
    visitor.destinations.map((item) => item.destinationId),
    CANONICAL_DESTINATIONS.map((item) => item.destinationId)
  );
  assert.ok(visitor.destinations.every((item) => item.completionClaim === false));
  const current = entryCurrentContentReceiver(accepted);
  assert.equal(current.mode, "fresh");
  assert.equal(current.items.length, 3);
  assert.equal(current.items.filter((item) => item.promotable).length, 1);
  assert.equal(
    current.items.find((item) => item.slot === "breaking").route,
    null
  );
  assert.ok(current.items.every((item) => item.completionClaim === false));

  const analytics = projectionAnalyticsEvent(accepted, "visitors-centre");
  assert.deepEqual(Object.keys(analytics.properties).sort(), [
    "error_code",
    "receiver_mode",
    "schema_version",
    "surface"
  ]);
  assert.doesNotMatch(
    JSON.stringify(analytics),
    /owner|evidence|limitation|summary|route|email|user|account|query/i
  );

  const replay = receiveProjection(envelope, {
    now,
    previousReceipt: accepted
  });
  assert.equal(replay.mode, "fresh");
  assert.equal(replay.replay, true);

  const sameIdDifferentRequest = await makeValidEnvelope();
  sameIdDifferentRequest.payload.destinations[0].summary += " Changed.";
  reseal(sameIdDifferentRequest);
  assert.equal(
    receiveProjection(sameIdDifferentRequest, {
      now,
      previousReceipt: accepted
    }).errorCode,
    "IDEMPOTENCY_CONFLICT"
  );

  const successor = await makeValidEnvelope({
    projectionId: "readiness-local-contract-v2",
    sequence: 2,
    replacesProjectionId: accepted.projectionId
  });
  assert.equal(
    receiveProjection(successor, {
      now,
      previousReceipt: accepted
    }).mode,
    "fresh"
  );

  const regression = await makeValidEnvelope({
    projectionId: "readiness-regression-v2",
    sequence: 1,
    replacesProjectionId: accepted.projectionId
  });
  assert.equal(
    receiveProjection(regression, {
      now,
      previousReceipt: accepted
    }).errorCode,
    "NON_MONOTONIC_PROJECTION"
  );

  const chainGap = await makeValidEnvelope({
    projectionId: "readiness-chain-gap-v2",
    sequence: 2,
    replacesProjectionId: "readiness-invented-v1"
  });
  assert.equal(
    receiveProjection(chainGap, {
      now,
      previousReceipt: accepted
    }).errorCode,
    "REPLACEMENT_CHAIN_GAP"
  );

  const invalidCases = [
    [
      "hash-corrupt",
      mutate(envelope, (item) => {
        item.payload.destinations[0].summary += " tampered";
      }, false),
      "PAYLOAD_HASH_MISMATCH"
    ],
    [
      "missing-destination",
      mutate(envelope, (item) => {
        item.payload.destinations.pop();
      }),
      "DESTINATION_SET_INCOMPLETE"
    ],
    [
      "duplicate-destination",
      mutate(envelope, (item) => {
        item.payload.destinations[16] =
          structuredClone(item.payload.destinations[0]);
      }),
      "DESTINATION_ID_DUPLICATE"
    ],
    [
      "wrong-route",
      mutate(envelope, (item) => {
        item.payload.destinations[0].route = "/invented.html";
      }),
      "DESTINATION_CANON_MISMATCH"
    ],
    [
      "missing-limitation",
      mutate(envelope, (item) => {
        item.payload.destinations[0].limitation = "";
      }),
      "DESTINATION_LIMITATION_REQUIRED"
    ],
    [
      "future-evidence",
      mutate(envelope, (item) => {
        item.payload.destinations[0].evidence.observedAt =
          "2026-07-26T19:00:00Z";
      }),
      "EVIDENCE_AFTER_PROJECTION"
    ],
    [
      "expired-item",
      mutate(envelope, (item) => {
        item.payload.destinations[0].freshUntil =
          "2026-07-26T18:14:59Z";
      }),
      "ITEM_FRESHNESS_OUTSIDE_ENVELOPE"
    ],
    [
      "duplicate-current-slot",
      mutate(envelope, (item) => {
        item.payload.currentContent[2].slot = "breaking";
      }),
      "CURRENT_SLOT_DUPLICATE"
    ],
    [
      "half-artifact",
      mutate(envelope, (item) => {
        item.payload.currentContent[0].artifact.id = null;
      }),
      "ARTIFACT_BINDING_INCOMPLETE"
    ],
    [
      "unknown-field",
      mutate(envelope, (item) => {
        item.payload.destinations[0].visitorIdentity = "resident-a";
      }),
      "DESTINATION_SHAPE_INVALID"
    ]
  ];

  for (const [name, candidate, code] of invalidCases) {
    const result = receiveProjection(candidate, { now });
    assert.equal(result.mode, "fail-closed", name);
    assert.equal(result.errorCode, code, name);
    assert.equal(result.destinations.length, 17, name);
    assert.equal(result.currentContent.length, 0, name);
    assert.equal(entryCurrentContentReceiver(result).items.length, 0, name);
    assert.ok(
      result.destinations.every((item) =>
        item.state === "unavailable" && item.completionClaim === false
      ),
      name
    );
  }

  assert.equal(
    receiveProjection(envelope, {
      now: new Date("2026-07-27T18:15:01Z")
    }).errorCode,
    "PROJECTION_STALE"
  );
  assert.equal(
    receiveProjection(envelope, {
      now,
      expectedPayloadSha256: "0".repeat(64)
    }).errorCode,
    "RELEASE_BINDING_MISMATCH"
  );

  const schemaUnknown = invalidCases.find(([name]) => name === "unknown-field")[1];
  const schemaHalfArtifact =
    invalidCases.find(([name]) => name === "half-artifact")[1];
  assert.equal(await schemaAccepts("unknown-field", schemaUnknown), false);
  assert.equal(await schemaAccepts("half-artifact", schemaHalfArtifact), false);

  const missingSource = makeValidDraft();
  await assert.rejects(
    sealProjectionDraft(missingSource, {
      now,
      readEvidence: async () => {
        throw new Error("missing");
      }
    }),
    (error) => error.code === "SOURCE_EVIDENCE_MISSING"
  );
  await assert.rejects(
    sealProjectionDraft(makeValidDraft(), {
      now,
      readEvidence: async () => Buffer.from("wrong", "utf8")
    }),
    (error) => error.code === "SOURCE_EVIDENCE_HASH_MISMATCH"
  );
  assert.ok(FIXTURE_EVIDENCE_BYTES.length > 0);
  assert.equal(
    (await sealProjectionDraft(makeValidDraft(), {
      now,
      readEvidence: fixtureReadEvidence
    })).integrity.payloadSha256,
    envelope.integrity.payloadSha256
  );

  console.log(
    "READINESS PROJECTION V1 PASS " +
    "destinations=17 current=3 fail_closed=12 idempotency=3 schema=draft2020"
  );
} finally {
  await rm(temporary, { recursive: true, force: true });
}
