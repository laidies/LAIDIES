import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  shaBytes,
  shaValue
} from "../../readiness-projection/v1/readiness-projection-v1.mjs";

const root = process.cwd();
const receiptPath = path.join(
  root,
  "operations/product-stewards/platform-reliability/canonical-name/v1/visitors-centre-shared-name-receipt-v1.json"
);
const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
assert.equal(receipt.schemaVersion, 1);
assert.equal(receipt.receiptId, "VISITORS-CENTRE-CANONICAL-NAME-SHARED-v1");
assert.equal(receipt.status, "BUILT_AND_VERIFIED_LOCALLY_ROUTE_REACCEPTANCE_PENDING");
assert.equal(shaValue(receipt.payload), receipt.seal.payloadSha256, "detached receipt seal mismatch");

function readBound(record) {
  const bytes = fs.readFileSync(path.join(root, record.path));
  assert.equal(shaBytes(bytes), record.sha256, `${record.role || record.path} checksum mismatch`);
  return bytes.toString("utf8");
}

readBound({
  path: receipt.payload.authority.rulingPath,
  sha256: receipt.payload.authority.rulingSha256
});
for (const inventory of Object.values(receipt.payload.inventories)) readBound(inventory);

const texts = new Map();
for (const record of receipt.payload.sharedFiles) texts.set(record.role, readBound(record));

assert.equal(texts.get("canonical-source"), texts.get("canonical-build"), "canonical build drift");
assert.equal(texts.get("runtime-source"), texts.get("runtime-build"), "runtime build drift");

const canonical = JSON.parse(texts.get("canonical-source"));
const destination = canonical.find((item) => item.destinationId === "visitors-centre");
assert(destination, "canonical destination missing");
assert.deepEqual(destination, {
  destinationId: "visitors-centre",
  productId: "visitors-centre",
  ownerId: "visitors-centre-champion",
  name: "Visitor’s Centre",
  route: "/visitors-centre.html"
});
assert.equal(canonical.filter((item) => item.destinationId === "visitors-centre").length, 1);

const envelope = JSON.parse(texts.get("sealed-projection"));
assert.equal(shaValue(envelope.payload), envelope.integrity.payloadSha256, "projection seal mismatch");
assert.equal(
  envelope.integrity.payloadSha256,
  receipt.payload.sharedFiles.find((item) => item.role === "sealed-projection").payloadSha256
);
const projected = envelope.payload.destinations.filter((item) => item.destinationId === "visitors-centre");
assert.equal(projected.length, 1);
assert.equal(projected[0].name, "Visitor’s Centre");
assert.equal(projected[0].route, "/visitors-centre.html");
assert.equal(projected[0].state, "held");
assert.match(projected[0].summary, /^Open Visitor’s Centre /);

const forbidden = /Welcome Wagon|Visitors Centre|Visitor's Centre/i;
for (const [role, text] of texts) {
  assert.doesNotMatch(text, forbidden, `${role} retains a superseded building name`);
}
for (const role of ["directory", "tour", "quick-navigation", "product-registry"]) {
  assert.match(texts.get(role), /Visitor’s Centre/, `${role} lacks canonical name`);
  assert.match(texts.get(role), /visitors-centre/, `${role} route/id drift`);
}

assert.deepEqual(receipt.payload.authorityCeiling, {
  deploy: false,
  publicMutation: false,
  providerMutation: false,
  visibleArtCorrection: false,
  historicalEvidenceRewrite: false
});

console.log(
  `VISITORS CENTRE SHARED NAME PASS files=${receipt.payload.sharedFiles.length} ` +
  `destinations=${canonical.length} owner_receipts=0 route=/visitors-centre.html route_acceptance=PENDING`
);
