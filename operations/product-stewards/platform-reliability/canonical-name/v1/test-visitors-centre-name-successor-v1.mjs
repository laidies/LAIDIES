import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { shaValue } from "../../readiness-projection/v1/readiness-projection-v1.mjs";

const root = process.cwd();
const receipt = JSON.parse(fs.readFileSync(path.join(
  root,
  "operations/product-stewards/platform-reliability/canonical-name/v1/visitors-centre-name-successor-v1.json"
), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath));
const text = (relativePath) => read(relativePath).toString("utf8");

assert.equal(receipt.schemaVersion, 1);
assert.equal(receipt.receiptId, "VISITORS-CENTRE-CANONICAL-NAME-SUCCESSOR-v1");
assert.equal(receipt.status, "BUILT_AND_VERIFIED_LOCALLY_OWNER_ACCEPTANCE_PENDING");
assert.equal(shaValue(receipt.payload), receipt.seal.payloadSha256, "successor payload seal mismatch");

const sharedReceiptBytes = read(receipt.payload.sharedNameReceipt.path);
assert.equal(sha(sharedReceiptBytes), receipt.payload.sharedNameReceipt.sha256);
const sharedReceipt = JSON.parse(sharedReceiptBytes);
assert.equal(sharedReceipt.seal.payloadSha256, receipt.payload.sharedNameReceipt.payloadSha256);

const predecessorBytes = read(receipt.payload.predecessor.lock1ClosurePath);
assert.equal(sha(predecessorBytes), receipt.payload.predecessor.lock1ClosureSha256);

for (const role of ["homepage", "startHere", "visitorsCentre", "homepageRuntime"]) {
  const record = receipt.payload.successor[role];
  assert.equal(sha(read(record.path)), record.sha256, `${role} checksum mismatch`);
}
for (const record of receipt.payload.currentSurfaceFiles) {
  assert.equal(sha(read(record.path)), record.sha256, `${record.path} checksum mismatch`);
}

assert.equal(
  sha(read("content/site/sv-global-header.js")),
  receipt.payload.unchangedDependencies.sharedHeaderSha256,
  "shared header changed inside naming lock"
);
assert.equal(
  sha(read("content/site/sv-back-nav.js")),
  receipt.payload.unchangedDependencies.contextNavigationSha256,
  "context navigation candidate changed inside naming lock"
);
assert.match(
  text("visitors-centre.html"),
  /@media \(max-width: 340px\)[\s\S]*?\.svgh-nav \{ gap: 4px !important; \}/,
  "Visitor containment changed"
);

const canonical = "Visitor’s Centre";
const forbidden = /Welcome Wagon|Visitors Centre|Visitor's Centre|Visitor's Center/i;
const currentTexts = [
  receipt.payload.successor.homepage.path,
  receipt.payload.successor.startHere.path,
  receipt.payload.successor.visitorsCentre.path,
  receipt.payload.successor.homepageRuntime.path,
  ...receipt.payload.currentSurfaceFiles.map((item) => item.path),
  ...sharedReceipt.payload.sharedFiles.map((item) => item.path)
];
for (const relativePath of new Set(currentTexts)) {
  assert.doesNotMatch(text(relativePath), forbidden, `${relativePath} retains superseded current label`);
}
for (const relativePath of [
  "index.html",
  "start-here.html",
  "visitors-centre.html",
  "content/site/sunnyvaile-directory.js",
  "content/site/readiness/v1/canonical-destinations.v1.json",
  "content/site/readiness/v1/readiness-runtime-v1.js",
  "content/site/readiness/v1/entry-readiness-projection.v1.json",
  "content/site/sv-welcome-tour.js",
  "content/site/quick-rail.js",
  "content/site/site-index.json",
  "laidies-card.html",
  "operations/product-stewards/registry.json"
]) {
  assert.match(text(relativePath), new RegExp(canonical), `${relativePath} lacks canonical name`);
}

const expectedPayload = receipt.payload.successor.projectionPayloadSha256;
for (const relativePath of ["start-here.html", "visitors-centre.html", "content/site/homepage.js"]) {
  assert.equal(
    text(relativePath).split(expectedPayload).length - 1,
    1,
    `${relativePath} must bind the successor projection once`
  );
  assert.doesNotMatch(
    text(relativePath),
    new RegExp(receipt.payload.predecessor.projectionPayloadSha256),
    `${relativePath} retains predecessor projection`
  );
}
const envelope = JSON.parse(text("content/site/readiness/v1/entry-readiness-projection.v1.json"));
assert.equal(envelope.integrity.payloadSha256, expectedPayload);
assert.equal(shaValue(envelope.payload), expectedPayload);

function rollbackHomepage(current) {
  return current
    .replace("Start at the Visitor’s Centre", "Start at the Welcome Wagon")
    .replace("Listen to the trailer at the Visitor’s Centre", "Listen to the trailer at the Visitors Centre")
    .replace("Start at the Visitor’s Centre →", "Start at the Visitors Centre →");
}
function rollbackStartHere(current) {
  return current
    .replace("Visitor’s Centre’s current owner-published status", "Welcome Wagon's current owner-published status")
    .replace("Visitor’s Centre · one ordinary doorway", "The Welcome Wagon · one ordinary doorway")
    .replace("current Visitor’s Centre status", "current Welcome Wagon status")
    .replace("Check Visitor’s Centre status", "Check Welcome Wagon status")
    .replace("Visitor’s Centre status", "Welcome Wagon status")
    .replaceAll("Open the Visitor’s Centre", "Open the Welcome Wagon Visitor's Centre")
    .replace(expectedPayload, receipt.payload.predecessor.projectionPayloadSha256);
}
function rollbackVisitor(current) {
  return current
    .replace("Visitor’s Centre · LAiDIES · SUNNYVAiLE", "The Welcome Wagon Visitor's Centre · LAiDIES · SUNNYVAiLE")
    .replace("Visitor’s Centre · LAiDIES", "The Welcome Wagon Visitor's Centre · LAiDIES")
    .replace(">Visitor’s Centre</a><span class=\"vc-fallback-limit\"", ">The Welcome Wagon Visitor's Centre</a><span class=\"vc-fallback-limit\"")
    .replace("Filed from SUNNYVAiLE · Visitor’s Centre", "Filed from SUNNYVAiLE · The Welcome Wagon")
    .replace(expectedPayload, receipt.payload.predecessor.projectionPayloadSha256);
}
assert.equal(
  sha(Buffer.from(rollbackHomepage(text("index.html")))),
  receipt.payload.predecessor.homepageSha256,
  "Homepage rollback does not recover lock-1 bytes"
);
assert.equal(
  sha(Buffer.from(rollbackStartHere(text("start-here.html")))),
  receipt.payload.predecessor.startHereSha256,
  "Start Here rollback does not recover lock-1 bytes"
);
assert.equal(
  sha(Buffer.from(rollbackVisitor(text("visitors-centre.html")))),
  receipt.payload.predecessor.visitorsCentreSha256,
  "Visitor rollback does not recover lock-1 bytes"
);

const negativeCases = [
  text("index.html").replace(canonical, "Welcome Wagon"),
  text("start-here.html").replace(expectedPayload, receipt.payload.predecessor.projectionPayloadSha256),
  text("visitors-centre.html").replace(canonical, "Visitors Centre"),
  text("content/site/sunnyvaile-directory.js").replace(canonical, "Visitor's Centre"),
  text("content/site/readiness/v1/canonical-destinations.v1.json").replace(canonical, "Welcome Wagon")
];
for (const value of negativeCases) {
  assert(
    forbidden.test(value) || !value.includes(expectedPayload),
    "negative mutation unexpectedly remained acceptable"
  );
}

assert.equal(sha(read("assets/final_map/sunnyvaile-town-map-final-v5.webp")), receipt.payload.residualInventory.visibleOldNameArtSha256);
assert.equal(receipt.payload.residualInventory.postForbiddenTokens, 0);
assert.equal(receipt.payload.residualInventory.visibleOldNameArtCorrected, false);
assert.deepEqual(receipt.payload.authorityCeiling, {
  deploy: false,
  publicMutation: false,
  providerMutation: false,
  visibleArtCorrection: false,
  historicalEvidenceRewrite: false
});

console.log(
  `VISITORS CENTRE NAME SUCCESSOR PASS routes=3 surfaces=${receipt.payload.currentSurfaceFiles.length} ` +
  `pre_tokens=${receipt.payload.residualInventory.preForbiddenTokens} post_tokens=0 ` +
  `rollback=PASS negative=${negativeCases.length} owner_acceptance=PENDING`
);
