import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { shaValue } from "../../readiness-projection/v1/readiness-projection-v1.mjs";

const root = process.cwd();
const receiptPath =
  "operations/product-stewards/platform-reliability/context-navigation/v1/context-navigation-distribution-v1.json";
const receipt = JSON.parse(fs.readFileSync(path.join(root, receiptPath), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const read = (relative) => fs.readFileSync(path.join(root, relative));

assert.equal(receipt.schemaVersion, 1);
assert.equal(receipt.distributionId, "SVBN-CURATED-DISTRIBUTION-2026-07-26-v1");
assert.equal(
  receipt.status,
  "BUILT_AND_VERIFIED_LOCALLY_INDEPENDENT_ACCEPTANCE_PENDING"
);
assert.equal(shaValue(receipt.payload), receipt.seal.payloadSha256);

const boundFiles = [
  [receipt.payload.candidate.path, receipt.payload.candidate.sha256],
  [receipt.payload.candidate.behaviorTestPath, receipt.payload.candidate.behaviorTestSha256],
  [receipt.payload.distribution.modulePath, receipt.payload.distribution.moduleSha256],
  [receipt.payload.distribution.builderPath, receipt.payload.distribution.builderSha256],
  [receipt.payload.tests.distributionPath, receipt.payload.tests.distributionSha256],
  [receipt.payload.tests.consumerMatrixPath, receipt.payload.tests.consumerMatrixSha256],
  ["index.html", receipt.payload.preservation.homepageSha256],
  ["start-here.html", receipt.payload.preservation.startHereSha256],
  ["visitors-centre.html", receipt.payload.preservation.visitorsCentreSha256],
  ["content/site/sv-global-header.js", receipt.payload.preservation.sharedHeaderSha256]
];
for (const [relative, expected] of boundFiles) {
  assert.equal(sha(read(relative)), expected, `bound file changed: ${relative}`);
}

assert.equal(receipt.payload.distribution.sourceLoaderBaseline, 18);
assert.equal(receipt.payload.distribution.curatedHtmlArtifacts, 88);
assert.equal(receipt.payload.distribution.mountsPerArtifact, 1);
assert.equal(receipt.payload.preservation.sourceRouteMutation, false);
assert.equal(receipt.payload.authorityCeiling.deploy, false);
assert.equal(receipt.payload.authorityCeiling.publicMutation, false);
assert.equal(receipt.payload.acceptance.platformMaker, "PASS");
for (const owner of [
  "townEntryConsumer",
  "visitorsCentreConsumer",
  "orderedExperienceIndependentJudge"
]) {
  assert.equal(receipt.payload.acceptance[owner], "PENDING");
}

console.log(
  "CONTEXT NAV DISTRIBUTION RECEIPT PASS files=10 consumers_pending=3 mutation=local-builder-only"
);
