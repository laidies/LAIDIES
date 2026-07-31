import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { payloadSha256, sha256 } from "../release-binding/asset-cache-binding-v1.mjs";
import { validateRouteIntegration } from "./route-version-integration-v1.mjs";

const root = process.cwd();
const closurePath = path.join(
  root,
  "operations/product-stewards/platform-reliability/shared-header/v1/route-integration/svgh-320-route-version-integration-v1-closure.json"
);
const closure = JSON.parse(fs.readFileSync(closurePath, "utf8"));

assert.equal(closure.schemaVersion, 1);
assert.equal(closure.closureId, "SVGH-320-2026-07-26-v1-ROUTE-INTEGRATION-CLOSURE-v1");
assert.equal(closure.status, "VERIFIED_LOCALLY_OWNER_ACCEPTED_RELEASE_DELIVERY_PENDING");
assert.equal(payloadSha256(closure.payload), closure.seal.payloadSha256, "closure payload seal mismatch");

function verifyBoundFile(record) {
  const bytes = fs.readFileSync(path.join(root, record.path));
  assert.equal(sha256(bytes), record.sha256, `${record.path} checksum mismatch`);
  return bytes;
}

const integrationBytes = verifyBoundFile(closure.payload.integrationReceipt);
const integration = JSON.parse(integrationBytes);
assert.equal(
  integration.seal.payloadSha256,
  closure.payload.integrationReceipt.payloadSha256,
  "integration payload hash mismatch"
);
const integrationResult = validateRouteIntegration(integration, { root });
assert.equal(integrationResult.status, "PASS");

for (const acceptance of Object.values(closure.payload.ownerAcceptances)) {
  verifyBoundFile(acceptance);
  assert.equal(acceptance.verdict, "ACCEPT");
}

const tuple = closure.payload.acceptedTuple;
const exactFiles = {
  sharedSourceSha256: "content/site/sv-global-header.js",
  homepageSha256: "index.html",
  startHereSha256: "start-here.html",
  visitorsCentreSha256: "visitors-centre.html"
};
for (const [field, file] of Object.entries(exactFiles)) {
  assert.equal(sha256(fs.readFileSync(path.join(root, file))), tuple[field], `${file} tuple mismatch`);
}
assert.deepEqual(closure.payload.authority, {
  deploy: false,
  publicCacheMutation: false,
  providerSettings: false,
  visitorContainmentRemoval: false,
  nativeSafariVoiceOverTrueZoom: false,
  publicOriginVerification: false
});

console.log(
  `ROUTE VERSION INTEGRATION CLOSURE PASS closure=${closure.closureId} owners=2 ` +
  `version=${tuple.versionKey} release_delivery=PENDING mutation=false`
);
