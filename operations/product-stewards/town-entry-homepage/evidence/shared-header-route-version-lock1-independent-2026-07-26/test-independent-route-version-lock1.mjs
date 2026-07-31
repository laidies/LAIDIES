#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import {
  validateRouteIntegration,
  validateRouteRequests
} from "../../../platform-reliability/shared-header/v1/route-integration/route-version-integration-v1.mjs";
import { sharedHeaderRequests } from "../../../platform-reliability/shared-header/v1/release-binding/asset-cache-binding-v1.mjs";

const root = process.cwd();
const receiptPath =
  "operations/product-stewards/platform-reliability/shared-header/v1/route-integration/svgh-320-route-version-integration-v1.json";
const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");

assert.equal(
  sha256(fs.readFileSync(receiptPath)),
  "52a7518af5526c4970a15b642d2445af96aec0d029602d9766dfa42a95c41540"
);
assert.equal(
  receipt.seal.payloadSha256,
  "98bf5e6f76162d44aef6cc4836350bd50c4b93247134fa871095e1cc915feab5"
);

const first = validateRouteIntegration(receipt, { root });
const second = validateRouteIntegration(
  JSON.parse(JSON.stringify(receipt)),
  { root }
);
assert.deepEqual(second, first, "validation must be idempotent");

const texts = Object.fromEntries(
  receipt.payload.routes.map((route) => [
    route.role,
    fs.readFileSync(route.path, "utf8")
  ])
);
const versionPath = receipt.payload.version.requestPath;
const oldPath = receipt.payload.rollback.requestPath;

assert.deepEqual(sharedHeaderRequests(texts.homepage), [versionPath]);
assert.deepEqual(sharedHeaderRequests(texts.visitorsCentre), [versionPath]);
assert.deepEqual(sharedHeaderRequests(texts.startHere), []);

for (const route of receipt.payload.routes) {
  const bytes = Buffer.from(texts[route.role]);
  assert.equal(sha256(bytes), route.integratedSha256);
  if (route.consumesSharedHeader) {
    const inverse = Buffer.from(texts[route.role].replace(versionPath, oldPath));
    assert.equal(
      sha256(inverse),
      route.priorSha256,
      `${route.role}: inverse replacement must recover prior accepted bytes`
    );
  } else {
    assert.equal(route.integratedSha256, route.priorSha256);
  }
}

const oldEverywhere = {
  ...texts,
  homepage: texts.homepage.replace(versionPath, oldPath),
  visitorsCentre: texts.visitorsCentre.replace(versionPath, oldPath)
};
assert.throws(
  () => validateRouteRequests(receipt.payload, oldEverywhere, "integrated"),
  /homepage integrated request mismatch/,
  "old version key must fail integrated validation"
);

const mixed = {
  ...texts,
  visitorsCentre: texts.visitorsCentre.replace(versionPath, oldPath)
};
assert.throws(
  () => validateRouteRequests(receipt.payload, mixed, "integrated"),
  /visitorsCentre integrated request mismatch/,
  "mixed route versions must fail"
);

const duplicate = {
  ...texts,
  homepage: `${texts.homepage}\n<script src="${versionPath}"></script>`
};
assert.throws(
  () => validateRouteRequests(receipt.payload, duplicate, "integrated"),
  /homepage integrated request mismatch/,
  "duplicate mount must fail"
);

const missing = {
  ...texts,
  homepage: texts.homepage.replace(
    `<script defer src="${versionPath}"></script>`,
    ""
  )
};
assert.throws(
  () => validateRouteRequests(receipt.payload, missing, "integrated"),
  /homepage integrated request mismatch/,
  "missing mount must fail"
);

const inventedStartHere = {
  ...texts,
  startHere: `${texts.startHere}\n<script src="${versionPath}"></script>`
};
assert.throws(
  () => validateRouteRequests(receipt.payload, inventedStartHere, "integrated"),
  /startHere integrated request mismatch/,
  "Start Here must remain a non-consumer"
);

validateRouteRequests(receipt.payload, oldEverywhere, "rollback");
assert.equal(first.mutation, false);
assert.equal(first.ownerAcceptance, "PENDING");

console.log(
  `TOWN ENTRY LOCK1 ROUTE VERSION PASS receipt=${first.receiptId} ` +
  `homepage=51a4a25f start=a7a54e79 visitor=cddc7404 ` +
  `valid=2 adversarial=5 inverseRollback=PASS mountCount=1/0/1 mutation=false`
);
