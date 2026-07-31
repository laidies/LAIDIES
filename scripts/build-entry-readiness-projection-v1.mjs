#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  CANONICAL_DESTINATIONS,
  sealProjectionDraft,
  shaBytes
} from "../operations/product-stewards/platform-reliability/readiness-projection/v1/readiness-projection-v1.mjs";

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(
  root,
  "operations/product-stewards/platform-reliability/readiness-projection/v1"
);
const outputDir = path.join(root, "content/site/readiness/v1");
const intakePath = path.join(sourceDir, "owner-receipt-intake.v1.json");
const schemaPath = path.join(
  sourceDir,
  "readiness-current-projection-v1.schema.json"
);
const runtimePath = path.join(sourceDir, "readiness-runtime-v1.js");
const intakeBytes = fs.readFileSync(intakePath);
const intake = JSON.parse(intakeBytes);
const intakeEvidencePath = "platform:owner-receipt-intake-v1";
const intakeSha256 = shaBytes(intakeBytes);

function fail(message) {
  throw new Error(`entry readiness build: ${message}`);
}

function exactKeys(value, keys, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(`${label} shape`);
  if (
    JSON.stringify(Object.keys(value).sort()) !==
    JSON.stringify([...keys].sort())
  ) fail(`${label} fields`);
}

exactKeys(
  intake,
  [
    "schemaVersion",
    "recordType",
    "candidate",
    "ownerSlots",
    "currentSlots",
    "missingReceiptPolicy"
  ],
  "intake"
);
if (
  intake.schemaVersion !== "1.0.0" ||
  intake.recordType !== "entry-readiness-owner-receipt-intake"
) fail("intake version");
if (!Array.isArray(intake.ownerSlots) || intake.ownerSlots.length !== 17) {
  fail("exactly 17 owner slots are required");
}

const slots = new Map();
for (const slot of intake.ownerSlots) {
  exactKeys(
    slot,
    ["destinationId", "productId", "ownerId", "receiptPath"],
    "owner slot"
  );
  if (slots.has(slot.destinationId)) fail(`duplicate slot ${slot.destinationId}`);
  slots.set(slot.destinationId, slot);
}

const evidence = {
  path: intakeEvidencePath,
  sha256: intakeSha256,
  observedAt: intake.candidate.generatedAt
};
const none = () => ({ kind: "none", id: null, sha256: null });
const missingLimitation =
  "No fresh owner readiness receipt is present. Open the named route only to check its current page; navigation is not completion.";
let missingOwnerReceipts = 0;

const destinations = CANONICAL_DESTINATIONS.map((canonical) => {
  const slot = slots.get(canonical.destinationId);
  if (!slot) fail(`missing owner slot ${canonical.destinationId}`);
  for (const field of ["productId", "ownerId"]) {
    if (slot[field] !== canonical[field]) {
      fail(`${canonical.destinationId} ${field} mismatch`);
    }
  }
  if (slot.receiptPath !== null) {
    fail(
      `${canonical.destinationId} receipt ingestion requires the owner-receipt integration lock`
    );
  }
  missingOwnerReceipts += 1;
  return {
    ...canonical,
    state: intake.missingReceiptPolicy.destinationState,
    label: intake.missingReceiptPolicy.destinationLabel,
    summary: `Open ${canonical.name} to check its current owner-published status.`,
    limitation: missingLimitation,
    disposition: intake.missingReceiptPolicy.destinationDisposition,
    freshUntil: intake.candidate.validUntil,
    evidence,
    artifact: none()
  };
});

const expectedCurrent = ["latest-episode", "breaking", "daily"];
if (!Array.isArray(intake.currentSlots) || intake.currentSlots.length !== 3) {
  fail("exactly three current-content slots are required");
}
const currentSlots = new Map();
for (const slot of intake.currentSlots) {
  exactKeys(slot, ["slot", "ownerId", "receiptPath"], "current slot");
  if (!expectedCurrent.includes(slot.slot) || currentSlots.has(slot.slot)) {
    fail(`invalid current slot ${slot.slot}`);
  }
  if (slot.receiptPath !== null) {
    fail(`${slot.slot} receipt ingestion requires the content-owner integration lock`);
  }
  currentSlots.set(slot.slot, slot);
}

const currentContent = expectedCurrent.map((slot) => {
  if (!currentSlots.has(slot)) fail(`missing current slot ${slot}`);
  return {
    slot,
    ownerId: currentSlots.get(slot).ownerId,
    state: slot === "breaking"
      ? "quiet"
      : intake.missingReceiptPolicy.currentState,
    label: slot === "breaking"
      ? "No owner-admitted breaking story"
      : "Owner current-content receipt pending",
    title: null,
    route: null,
    publishedOn: null,
    limitation: slot === "breaking"
      ? "No alarm or filler headline appears without a fresh owner receipt."
      : "No current-content promotion appears without a fresh owner receipt.",
    disposition: intake.missingReceiptPolicy.currentDisposition,
    freshUntil: intake.candidate.validUntil,
    evidence,
    artifact: none()
  };
});

const payload = {
  projectionId: intake.candidate.projectionId,
  sequence: intake.candidate.sequence,
  generatedAt: intake.candidate.generatedAt,
  validUntil: intake.candidate.validUntil,
  replacesProjectionId: intake.candidate.replacesProjectionId,
  fallbackRoute: "/visitors-centre.html",
  destinations,
  currentContent
};

const envelope = await sealProjectionDraft(payload, {
  now: new Date(intake.candidate.generatedAt),
  readEvidence: async (evidencePath) => {
    if (evidencePath !== intakeEvidencePath) fail(`unknown evidence ${evidencePath}`);
    return intakeBytes;
  }
});

fs.mkdirSync(outputDir, { recursive: true });
fs.copyFileSync(schemaPath, path.join(outputDir, "readiness-current-projection-v1.schema.json"));
fs.copyFileSync(runtimePath, path.join(outputDir, "readiness-runtime-v1.js"));
fs.copyFileSync(
  path.join(sourceDir, "canonical-destinations.json"),
  path.join(outputDir, "canonical-destinations.v1.json")
);
fs.writeFileSync(
  path.join(outputDir, "entry-readiness-projection.v1.json"),
  `${JSON.stringify(envelope, null, 2)}\n`
);

console.log(
  `ENTRY READINESS BUILD PASS destinations=${destinations.length} ` +
  `missing_owner_receipts=${missingOwnerReceipts} current=${currentContent.length} ` +
  `payload_sha256=${envelope.integrity.payloadSha256}`
);
