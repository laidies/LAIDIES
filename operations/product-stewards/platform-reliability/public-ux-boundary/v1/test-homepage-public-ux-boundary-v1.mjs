import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../../../..");
const receiptPath = path.join(here, "homepage-public-ux-boundary-v1.json");
const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));

function bytes(relativePath) {
  return fs.readFileSync(path.join(root, relativePath));
}

function sha(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function assertBoundary(homepage, runtime, label) {
  const forbiddenHomepage = [
    /readiness-runtime-v1\.js/i,
    /entry-readiness-projection\.v1\.json/i,
    /\b(?:receiver|readiness|receipt)\b/i,
    /owner-admitted/i,
    /checksum-bound/i,
    /completionClaim/i,
    /fail-closed/i,
    /Projection rejected/i,
    /Explore what each route can honestly do/i,
    /Destination readiness projection/i,
    /Current, only when proved/i,
    /published June 24/i,
    /entry-(?:visitor|current|readiness|projection|episode-action)/i,
    /\b[a-f0-9]{64}\b/i
  ];
  for (const pattern of forbiddenHomepage) {
    assert.doesNotMatch(homepage, pattern, `${label}: Homepage exposed ${pattern}`);
  }

  const forbiddenRuntime = [
    /LAIDIESEntryReadinessV1/,
    /entryCurrentContentReceiver/,
    /visitorCentreSemanticReceiver/,
    /entry-readiness-projection\.v1\.json/,
    /entry-(?:visitor|current|readiness|projection|episode-action)/,
    /projectionSha256/,
    /RECEIPT_KEY/,
    /PROJECTION_(?:FETCH|TRANSPORT|RUNTIME)/
  ];
  for (const pattern of forbiddenRuntime) {
    assert.doesNotMatch(runtime, pattern, `${label}: Homepage runtime retained ${pattern}`);
  }
}

assert.equal(receipt.recordType, "homepage-public-ux-boundary");
assert.equal(receipt.binding.authorityDecision, "D-2026-07-26-069");
assert.equal(receipt.binding.publicConsumer, "NONE");
assert.equal(receipt.binding.deployment, "NOT_PERFORMED");
assert.equal(receipt.binding.publicVerification, "NOT_PERFORMED");
assert.equal(sha(canonical(receipt.binding)), receipt.payloadSha256, "detached receipt payload hash");

for (const [pathKey, shaKey] of [
  ["homepagePath", "homepageSha256"],
  ["homepageRuntimePath", "homepageRuntimeSha256"],
  ["backstageProjectionPath", "backstageProjectionSha256"],
  ["backstageRuntimePath", "backstageRuntimeSha256"]
]) {
  assert.equal(sha(bytes(receipt.binding[pathKey])), receipt.binding[shaKey], `${pathKey} checksum`);
}

const homepage = bytes(receipt.binding.homepagePath).toString("utf8");
const runtime = bytes(receipt.binding.homepageRuntimePath).toString("utf8");
assertBoundary(homepage, runtime, "accepted tuple");
assert.equal((homepage.match(/content\/site\/homepage\.js/g) || []).length, 1, "one Homepage runtime mount");

const negativeCases = [
  [homepage.replace("</head>", '<script src="/content/site/readiness/v1/readiness-runtime-v1.js"></script></head>'), runtime],
  [homepage.replace("</main>", '<section id="entry-readiness-grid"></section></main>'), runtime],
  [homepage.replace("</main>", "<h2>Explore what each route can honestly do.</h2></main>"), runtime],
  [homepage.replace("</main>", "<p>Projection rejected · STALE_PROJECTION</p></main>"), runtime],
  [homepage.replace("</main>", "<p>owner-admitted current item loaded</p></main>"), runtime],
  [homepage.replace("</main>", `<p>${"a".repeat(64)}</p></main>`), runtime],
  [homepage.replace("</main>", "<p>Read Episode 04 · published June 24</p></main>"), runtime],
  [homepage, `${runtime}\nwindow.LAIDIESEntryReadinessV1.receive();`],
  [homepage, `${runtime}\nentryCurrentContentReceiver(receipt);`],
  [homepage, `${runtime}\nfetch('/content/site/readiness/v1/entry-readiness-projection.v1.json');`]
];

let rejected = 0;
for (const [mutatedHomepage, mutatedRuntime] of negativeCases) {
  assert.throws(() => assertBoundary(mutatedHomepage, mutatedRuntime, "negative mutation"));
  rejected += 1;
}

console.log(`HOMEPAGE PUBLIC UX BOUNDARY PASS files=4 negative=${rejected} public_consumer=NONE`);
