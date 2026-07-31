#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  receiveProjection,
  visitorCentreSemanticReceiver
} from "../../product-stewards/platform-reliability/readiness-projection/v1/readiness-projection-v1.mjs";
import {
  makeValidEnvelope
} from "../../product-stewards/platform-reliability/readiness-projection/v1/fixtures-v1.mjs";

const explorationRoot = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(explorationRoot, "functional-candidate-v2", "index.html");
const outputDir = path.join(explorationRoot, "functional-candidate-v3-readiness-projection");
const output = path.join(outputDir, "index.html");
const fixtureOutput = path.join(outputDir, "readiness-semantic-fixture-v1.json");
const admittedBaseSha256 = "d138d2a18e685f3f2923f00d966e2969dce14f2e2b1fb48bb38b0547266e9573";
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");

const sourceBytes = fs.readFileSync(source);
const observedBaseSha256 = sha256(sourceBytes);
if (observedBaseSha256 !== admittedBaseSha256) {
  throw new Error(`ADMITTED_BASE_HASH_MISMATCH expected=${admittedBaseSha256} observed=${observedBaseSha256}`);
}

const now = new Date("2026-07-26T18:16:00Z");
const envelope = await makeValidEnvelope();
const freshReceipt = receiveProjection(envelope, { now });
const failClosedReceipt = receiveProjection(null, { now });
const fresh = visitorCentreSemanticReceiver(freshReceipt);
const failClosed = visitorCentreSemanticReceiver(failClosedReceipt);

if (fresh.destinations.length !== 17 || failClosed.destinations.length !== 17) {
  throw new Error("SEMANTIC_RECEIVER_DESTINATION_COUNT_INVALID");
}
if (![...fresh.destinations, ...failClosed.destinations].every((item) => item.completionClaim === false)) {
  throw new Error("SEMANTIC_RECEIVER_COMPLETION_BOUNDARY_INVALID");
}

const fixture = {
  provenance: {
    label: "SYNTHETIC_PLATFORM_CONTRACT_FIXTURE",
    purpose: "Isolated Visitor's Centre receiver integration proof only; not owner readiness or public truth.",
    generatedAt: "2026-07-26T18:16:00Z",
    sourceReceiver: "visitorCentreSemanticReceiver()",
    admittedBaseSha256,
    projectionPayloadSha256: freshReceipt.projectionSha256
  },
  fresh,
  failClosed
};

let html = sourceBytes.toString("utf8");
html = html
  .replace(
    "<title>Visitor's Centre · Functional Candidate v2</title>",
    "<title>Visitor's Centre · Readiness Projection Candidate v3</title>"
  )
  .replace(
    "Functional candidate v2 · isolated prototype evidence · 2026-07-26",
    "Functional candidate v3 · isolated readiness-projection receiver evidence · 2026-07-26"
  )
  .replace(
    '<a href="?failure=missing-contract#front-counter">Destination contract missing</a>',
    '<a href="?failure=projection#front-counter">Readiness projection unavailable</a>'
  )
  .replace(
    "</body>",
    '  <script src="receiver-integration-v1.js"></script>\n</body>'
  );

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(fixtureOutput, `${JSON.stringify(fixture, null, 2)}\n`);
fs.writeFileSync(output, html);

console.log(JSON.stringify({
  status: "BUILT",
  source,
  admittedBaseSha256,
  output,
  outputSha256: sha256(Buffer.from(html)),
  fixtureOutput,
  fixtureSha256: sha256(fs.readFileSync(fixtureOutput)),
  freshDestinations: fresh.destinations.length,
  failClosedDestinations: failClosed.destinations.length
}, null, 2));
