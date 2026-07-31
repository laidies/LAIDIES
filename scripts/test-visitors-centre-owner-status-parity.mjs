#!/usr/bin/env node

import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const here = dirname(fileURLToPath(import.meta.url));
const validator = join(here, "validate-visitors-centre-owner-status-parity.mjs");
const sourceInput = join(root, "operations/product-stewards/visitors-centre/destination-owner-status-input.v1.json");
const sourceOwner = join(root, "operations/product-stewards/platform-reliability/readiness-projection/v1/owner-receipt-intake.v1.json");
const sourceCanonical = join(root, "operations/product-stewards/platform-reliability/readiness-projection/v1/canonical-destinations.json");
const sourceProjection = join(root, "content/site/readiness/v1/entry-readiness-projection.v1.json");
const temporary = await mkdtemp(join(tmpdir(), "laidies-vc-owner-parity-"));

function run(input, output = null) {
  const args = [validator, "--input", relative(root, input)];
  if (output) args.push("--out", relative(root, output));
  return spawnSync(process.execPath, args, { cwd: root, encoding: "utf8" });
}

try {
  const baseline = run(sourceInput);
  assert.equal(baseline.status, 0, baseline.stderr);
  assert.match(baseline.stdout, /destinations=17 completion_claim=false/);

  const tempInput = join(temporary, "input.json");
  const tempOwner = join(temporary, "owner-input.json");
  const tempCanonical = join(temporary, "canonical.json");
  const tempProjection = join(temporary, "projection.json");
  const tempReceipt = join(temporary, "receipt.json");
  await Promise.all([
    cp(sourceInput, tempInput),
    cp(sourceOwner, tempOwner),
    cp(sourceCanonical, tempCanonical),
    cp(sourceProjection, tempProjection)
  ]);
  const input = JSON.parse(await readFile(tempInput, "utf8"));
  input.authoritativeOwnerInput.path = relative(root, tempOwner);
  input.canonicalDestinations.path = relative(root, tempCanonical);
  input.consumerProjection.path = relative(root, tempProjection);
  const ownerBytes = await readFile(tempOwner);
  const crypto = await import("node:crypto");
  input.authoritativeOwnerInput.sha256 = crypto.createHash("sha256").update(ownerBytes).digest("hex");
  await writeFile(tempInput, `${JSON.stringify(input, null, 2)}\n`);

  const valid = run(tempInput, tempReceipt);
  assert.equal(valid.status, 0, valid.stderr);
  const receipt = JSON.parse(await readFile(tempReceipt, "utf8"));
  assert.equal(receipt.destinationCount, 17);
  assert.equal(receipt.completionClaim, false);
  assert.ok(receipt.destinations.every((item) => item.state === "held"));

  const missing = structuredClone(input);
  missing.ownerSlots.pop();
  await writeFile(tempInput, `${JSON.stringify(missing, null, 2)}\n`);
  assert.notEqual(run(tempInput).status, 0, "missing owner must fail closed");

  const mismatch = structuredClone(input);
  mismatch.ownerSlots[0].ownerId = "invented-owner";
  await writeFile(tempInput, `${JSON.stringify(mismatch, null, 2)}\n`);
  assert.notEqual(run(tempInput).status, 0, "owner mismatch must fail closed");

  const receiptPromotion = structuredClone(input);
  receiptPromotion.ownerSlots[0].receiptPath = "operations/product-stewards/visitors-centre/invented-receipt.json";
  await writeFile(tempInput, `${JSON.stringify(receiptPromotion, null, 2)}\n`);
  assert.notEqual(run(tempInput).status, 0, "unparsed owner receipt must fail closed");

  const projection = JSON.parse(await readFile(tempProjection, "utf8"));
  projection.payload.destinations[0].summary = "Invented status.";
  await writeFile(tempProjection, `${JSON.stringify(projection, null, 2)}\n`);
  await writeFile(tempInput, `${JSON.stringify(input, null, 2)}\n`);
  assert.notEqual(run(tempInput).status, 0, "consumer mismatch must fail closed");

  console.log("VISITORS CENTRE OWNER STATUS PARITY TEST PASS valid=1 invalid=4 destinations=17");
} finally {
  await rm(temporary, { recursive: true, force: true });
}
