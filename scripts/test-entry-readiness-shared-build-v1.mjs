import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";
import {
  entryCurrentContentReceiver,
  receiveProjection,
  shaBytes,
  visitorCentreSemanticReceiver
} from "../operations/product-stewards/platform-reliability/readiness-projection/v1/readiness-projection-v1.mjs";

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(
  root,
  "operations/product-stewards/platform-reliability/readiness-projection/v1"
);
const outputDir = path.join(root, "content/site/readiness/v1");
const generatedAt = "2026-07-26T18:30:00Z";
const now = new Date("2026-07-26T18:31:00Z");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8"
  });
  assert.equal(
    result.status,
    0,
    `${command} ${args.join(" ")}\n${result.stdout}\n${result.stderr}`
  );
  return result.stdout.trim();
}

function bytes(relative) {
  return fs.readFileSync(path.join(root, relative));
}

function json(relative) {
  return JSON.parse(bytes(relative));
}

const buildOutput = run("node", [
  "scripts/build-entry-readiness-projection-v1.mjs"
]);
assert.match(
  buildOutput,
  /^ENTRY READINESS BUILD PASS destinations=17 missing_owner_receipts=17 current=3 payload_sha256=[0-9a-f]{64}$/
);

const intake = json(
  "operations/product-stewards/platform-reliability/readiness-projection/v1/owner-receipt-intake.v1.json"
);
assert.equal(intake.ownerSlots.length, 17);
assert.equal(intake.currentSlots.length, 3);
assert.ok(intake.ownerSlots.every((item) => item.receiptPath === null));
assert.ok(intake.currentSlots.every((item) => item.receiptPath === null));

const boundCopies = [
  [
    "operations/product-stewards/platform-reliability/readiness-projection/v1/canonical-destinations.json",
    "content/site/readiness/v1/canonical-destinations.v1.json"
  ],
  [
    "operations/product-stewards/platform-reliability/readiness-projection/v1/readiness-current-projection-v1.schema.json",
    "content/site/readiness/v1/readiness-current-projection-v1.schema.json"
  ],
  [
    "operations/product-stewards/platform-reliability/readiness-projection/v1/readiness-runtime-v1.js",
    "content/site/readiness/v1/readiness-runtime-v1.js"
  ]
];
for (const [source, output] of boundCopies) {
  assert.equal(shaBytes(bytes(source)), shaBytes(bytes(output)), output);
}

const envelope = json(
  "content/site/readiness/v1/entry-readiness-projection.v1.json"
);
const nodeReceipt = receiveProjection(envelope, { now });
assert.equal(nodeReceipt.mode, "fresh");
assert.equal(nodeReceipt.destinations.length, 17);
assert.equal(nodeReceipt.currentContent.length, 3);
assert.ok(nodeReceipt.destinations.every((item) => item.state === "held"));
assert.ok(
  nodeReceipt.destinations.every(
    (item) =>
      item.disposition === "OWNER_RECEIPT_MISSING_FAIL_CLOSED" &&
      item.completionClaim === false
  )
);
const nodeCurrent = entryCurrentContentReceiver(nodeReceipt);
assert.equal(nodeCurrent.items.length, 3);
assert.equal(nodeCurrent.items.filter((item) => item.promotable).length, 0);
assert.equal(visitorCentreSemanticReceiver(nodeReceipt).destinations.length, 17);

const schemaResult = run("npx", [
  "--yes",
  "ajv-cli@5.0.0",
  "validate",
  "--spec=draft2020",
  "--strict=false",
  "--all-errors",
  "-s",
  "content/site/readiness/v1/readiness-current-projection-v1.schema.json",
  "-d",
  "content/site/readiness/v1/entry-readiness-projection.v1.json"
]);
assert.match(schemaResult, /entry-readiness-projection\.v1\.json valid/);

const browserWindow = {
  crypto: crypto.webcrypto,
  TextEncoder,
  Uint8Array,
  JSON,
  Date,
  Object,
  Number,
  Array,
  Error
};
const browserContext = vm.createContext({ window: browserWindow });
vm.runInContext(
  bytes("content/site/readiness/v1/readiness-runtime-v1.js").toString("utf8"),
  browserContext,
  { filename: "readiness-runtime-v1.js" }
);
const browserApi = browserWindow.LAIDIESEntryReadinessV1;
assert.equal(browserApi.VERSION, "1.0.0");
const browserReceipt = await browserApi.receive(envelope, { now });
assert.equal(browserReceipt.mode, "fresh");
assert.equal(browserReceipt.destinations.length, 17);
assert.equal(
  browserApi.entryCurrentContentReceiver(browserReceipt).items.filter(
    (item) => item.promotable
  ).length,
  0
);
assert.ok(
  browserApi.visitorCentreSemanticReceiver(browserReceipt).destinations.every(
    (item) => item.completionClaim === false
  )
);

const tampered = structuredClone(envelope);
tampered.payload.destinations[0].summary += " tampered";
assert.equal(
  (await browserApi.receive(tampered, { now })).errorCode,
  "PAYLOAD_HASH_MISMATCH"
);
assert.equal(
  (
    await browserApi.receive(envelope, {
      now: new Date("2026-07-27T18:30:01Z")
    })
  ).errorCode,
  "PROJECTION_STALE"
);
assert.equal(
  (
    await browserApi.receive(envelope, {
      now,
      expectedPayloadSha256: "0".repeat(64)
    })
  ).errorCode,
  "RELEASE_BINDING_MISMATCH"
);

const publicBuilder = bytes("scripts/build-public-site.mjs").toString("utf8");
for (const [, output] of boundCopies) {
  assert.match(publicBuilder, new RegExp(output.replaceAll(".", "\\.")));
}
assert.match(
  publicBuilder,
  /content\/site\/readiness\/v1\/entry-readiness-projection\.v1\.json/
);

assert.equal(envelope.payload.generatedAt, generatedAt);
console.log(
  "SHARED ENTRY READINESS V1 PASS " +
    "destinations=17 missing_owner_receipts=17 current_promotions=0 " +
    "runtime=browser-compatible artifact=curated"
);
