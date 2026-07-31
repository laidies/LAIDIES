import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { shaValue } from "../../readiness-projection/v1/readiness-projection-v1.mjs";

const root = process.cwd();
const closure = JSON.parse(fs.readFileSync(path.join(
  root,
  "operations/product-stewards/platform-reliability/canonical-name/v1/visitors-centre-name-successor-v1-closure.json"
), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const read = (relative) => fs.readFileSync(path.join(root, relative));

assert.equal(closure.schemaVersion, 1);
assert.equal(closure.closureId, "VISITORS-CENTRE-CANONICAL-NAME-SUCCESSOR-v1-CLOSURE");
assert.equal(closure.status, "VERIFIED_LOCALLY_TWO_OWNER_ACCEPTED_RELEASE_PENDING");
assert.equal(shaValue(closure.payload), closure.seal.payloadSha256);

const successorBytes = read(closure.payload.successorReceipt.path);
assert.equal(sha(successorBytes), closure.payload.successorReceipt.sha256);
assert.equal(
  JSON.parse(successorBytes).seal.payloadSha256,
  closure.payload.successorReceipt.payloadSha256
);
for (const acceptance of Object.values(closure.payload.ownerAcceptances)) {
  assert.equal(sha(read(acceptance.path)), acceptance.sha256);
  assert.equal(acceptance.verdict, "ACCEPT");
}
const tupleFiles = {
  homepageSha256: "index.html",
  startHereSha256: "start-here.html",
  visitorsCentreSha256: "visitors-centre.html",
  homepageRuntimeSha256: "content/site/homepage.js"
};
for (const [field, relative] of Object.entries(tupleFiles)) {
  assert.equal(sha(read(relative)), closure.payload.acceptedTuple[field]);
}
assert.deepEqual(closure.payload.authorityCeiling, {
  deploy: false,
  publicMutation: false,
  providerMutation: false,
  navigationDistribution: false,
  visibleArtCorrection: false,
  visitorContainmentRemoval: false
});

console.log(
  `VISITORS CENTRE NAME CLOSURE PASS owners=2 routes=3 next=${closure.payload.nextLock} mutation=false`
);
