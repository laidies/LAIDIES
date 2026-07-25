#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const recoveryDirectory = path.join(
  projectDirectory,
  "recovery/production-v18",
);
const manifest = JSON.parse(
  fs.readFileSync(path.join(recoveryDirectory, "manifest.json"), "utf8"),
);
const recoveredBundle = fs.readFileSync(
  path.join(recoveryDirectory, manifest.artifact.path),
);
const workingMirror = fs.readFileSync(
  path.join(projectDirectory, "src/index.js"),
);
const actualHash = crypto
  .createHash("sha256")
  .update(recoveredBundle)
  .digest("hex");

assert.equal(
  actualHash,
  manifest.artifact.sha256,
  "The frozen recovered bundle no longer matches its recorded checksum.",
);
assert.equal(
  recoveredBundle.byteLength,
  manifest.artifact.bytes,
  "The frozen recovered bundle size changed.",
);
assert.equal(
  manifest.activeVersion.id,
  "eff23927-7e4d-4677-b729-2b14ff678ac9",
  "The manifest no longer identifies the recovered active version.",
);
assert.equal(
  manifest.productionMutationPerformed,
  false,
  "The recovery manifest must not claim a production mutation.",
);

const source = recoveredBundle.toString("utf8");
for (const requiredText of [
  "OPENAI_API_KEY",
  "RATE_LIMITER",
  "SUBSCRIBER_USAGE",
  'model: "gpt-4o"',
  "buildStablePrefix",
  "buildEnergyDirective",
]) {
  assert.ok(
    source.includes(requiredText),
    `Recovered bundle is missing expected production marker: ${requiredText}`,
  );
}

const mirrorHash = crypto
  .createHash("sha256")
  .update(workingMirror)
  .digest("hex");
const mirrorStatus =
  mirrorHash === manifest.artifact.sha256
    ? "still identical to recovered production"
    : "intentionally diverged for local reconstruction";

console.log(`PASS recovery checksum ${actualHash}`);
console.log(`PASS recovered bytes ${recoveredBundle.byteLength}`);
console.log(`Working mirror: ${mirrorStatus}`);
console.log("Production mutation recorded: false");
