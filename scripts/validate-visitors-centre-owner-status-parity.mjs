#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const defaults = {
  input: "operations/product-stewards/visitors-centre/destination-owner-status-input.v1.json"
};
const args = process.argv.slice(2);
function option(name, fallback = null) {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
}
const inputPath = option("--input", defaults.input);
const outputPath = option("--out");
const failures = [];
const fail = (message) => failures.push(message);
const resolve = (file) => path.resolve(root, file);
const readBytes = (file) => fs.readFileSync(resolve(file));
const readJson = (file) => JSON.parse(readBytes(file).toString("utf8"));
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);

function exactKeys(value, keys, message) {
  if (!value || typeof value !== "object" || Array.isArray(value) ||
      !same(Object.keys(value).sort(), [...keys].sort())) fail(message);
}

function expectedDestination(canonical, input) {
  return {
    destinationId: canonical.destinationId,
    productId: canonical.productId,
    ownerId: canonical.ownerId,
    name: canonical.name,
    route: canonical.route,
    state: input.missingReceiptPolicy.state,
    label: input.missingReceiptPolicy.label,
    summary: `Open ${canonical.name} to check its current owner-published status.`,
    limitation: "No fresh owner readiness receipt is present. Open the named route only to check its current page; navigation is not completion.",
    disposition: input.missingReceiptPolicy.disposition,
    artifact: input.missingReceiptPolicy.artifact
  };
}

let input;
let canonical;
let projection;
let ownerInputBytes;
try {
  input = readJson(inputPath);
  exactKeys(input, [
    "schemaVersion", "recordType", "purpose", "authoritativeOwnerInput",
    "canonicalDestinations", "consumerProjection", "missingReceiptPolicy", "ownerSlots"
  ], "input shape is invalid");
  if (input.schemaVersion !== "1.0.0" ||
      input.recordType !== "visitors-centre-destination-owner-status-input") {
    fail("input version or record type is invalid");
  }
  exactKeys(input.authoritativeOwnerInput, ["path", "sha256"], "owner input binding is invalid");
  exactKeys(input.canonicalDestinations, ["path"], "canonical binding is invalid");
  exactKeys(input.consumerProjection, ["path"], "consumer projection binding is invalid");
  exactKeys(input.missingReceiptPolicy, ["state", "label", "disposition", "artifact", "completionClaim"], "missing-receipt policy is invalid");
  exactKeys(input.missingReceiptPolicy.artifact, ["kind", "id", "sha256"], "missing-receipt artifact is invalid");
  if (input.missingReceiptPolicy.state !== "held" ||
      input.missingReceiptPolicy.completionClaim !== false ||
      !same(input.missingReceiptPolicy.artifact, { kind: "none", id: null, sha256: null })) {
    fail("missing-receipt policy must stay held, non-completing, and artifact-free");
  }
  ownerInputBytes = readBytes(input.authoritativeOwnerInput.path);
  if (sha256(ownerInputBytes) !== input.authoritativeOwnerInput.sha256) {
    fail("authoritative owner input hash mismatch");
  }
  canonical = readJson(input.canonicalDestinations.path);
  projection = readJson(input.consumerProjection.path);
} catch (error) {
  fail(`cannot load parity input: ${error.message}`);
}

if (!failures.length) {
  if (!Array.isArray(canonical) || canonical.length !== 17) fail("canonical destination set is incomplete");
  if (!Array.isArray(input.ownerSlots) || input.ownerSlots.length !== 17) fail("owner input set is incomplete");
  if (!projection?.payload || !Array.isArray(projection.payload.destinations) || projection.payload.destinations.length !== 17) {
    fail("consumer projection destination set is incomplete");
  }
}

const generated = [];
if (!failures.length) {
  const slots = new Map();
  for (const slot of input.ownerSlots) {
    exactKeys(slot, ["destinationId", "productId", "ownerId", "receiptPath"], "owner slot shape is invalid");
    if (slots.has(slot.destinationId)) fail(`duplicate owner slot: ${slot.destinationId}`);
    slots.set(slot.destinationId, slot);
  }
  const projected = new Map(projection.payload.destinations.map((item) => [item.destinationId, item]));
  for (const item of canonical) {
    const slot = slots.get(item.destinationId);
    if (!slot) {
      fail(`owner slot missing: ${item.destinationId}`);
      continue;
    }
    for (const key of ["destinationId", "productId", "ownerId"]) {
      if (slot[key] !== item[key]) fail(`owner/canonical mismatch: ${item.destinationId}.${key}`);
    }
    if (slot.receiptPath !== null) {
      fail(`owner receipt requires the shared producer before Centre parity can promote it: ${item.destinationId}`);
      continue;
    }
    const expected = expectedDestination(item, input);
    generated.push(expected);
    const actual = projected.get(item.destinationId);
    if (!actual) {
      fail(`consumer projection missing: ${item.destinationId}`);
      continue;
    }
    for (const key of Object.keys(expected)) {
      if (!same(actual[key], expected[key])) fail(`consumer mismatch: ${item.destinationId}.${key}`);
    }
    if (actual.evidence?.path !== "platform:owner-receipt-intake-v1" ||
        actual.evidence?.sha256 !== input.authoritativeOwnerInput.sha256) {
      fail(`consumer evidence is not bound to owner input: ${item.destinationId}`);
    }
    if (actual.completionClaim === true) fail(`consumer implies completion: ${item.destinationId}`);
  }
  for (const actual of projection.payload.destinations) {
    if (!slots.has(actual.destinationId)) fail(`consumer has unknown destination: ${actual.destinationId}`);
  }
}

if (failures.length) {
  console.error("VISITORS CENTRE OWNER STATUS PARITY HOLD");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

const receipt = {
  schemaVersion: "1.0.0",
  recordType: "visitors-centre-owner-status-parity-receipt",
  status: "PASS — CURRENT ALL-NULL OWNER INPUT FAILS CLOSED",
  input: {
    path: inputPath,
    sha256: sha256(readBytes(inputPath)),
    authoritativeOwnerInput: input.authoritativeOwnerInput,
    canonicalDestinations: input.canonicalDestinations,
    consumerProjection: input.consumerProjection
  },
  destinationCount: generated.length,
  completionClaim: false,
  destinations: generated
};
if (outputPath) {
  fs.mkdirSync(path.dirname(resolve(outputPath)), { recursive: true });
  fs.writeFileSync(resolve(outputPath), `${JSON.stringify(receipt, null, 2)}\n`);
}
console.log("VISITORS CENTRE OWNER STATUS PARITY PASS");
console.log(`destinations=${generated.length} completion_claim=false owner_input_sha256=${input.authoritativeOwnerInput.sha256}`);
if (outputPath) console.log(`receipt=${outputPath}`);
