#!/usr/bin/env node

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const checker = path.join(root, "scripts/check-luminairy-resource-coverage.mjs");
const ledger = fs.readFileSync(path.join(root, "operations/product-stewards/luminairy/profile-resource-coverage-ledger-2026-09-02.md"), "utf8");
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "luminairy-resource-ledger-"));

try {
  const knownBad = path.join(scratch, "missing-ada.md");
  fs.writeFileSync(knownBad, ledger.replace(/^\| 1 \| MAiVEN · `ada-lovelace`.*\n/m, ""));
  let failure = "";
  try {
    execFileSync(process.execPath, [checker], {
      cwd: root,
      env: { ...process.env, LUMINAIRY_RESOURCE_LEDGER: knownBad },
      encoding: "utf8",
      stdio: "pipe"
    });
  } catch (error) {
    failure = `${error.stdout || ""}${error.stderr || ""}`;
  }
  assert.match(failure, /30 card rows/);
  assert.match(failure, /ledger coverage mismatch ada-lovelace/);
  assert.match(failure, /batch 1 must contain 5 profiles/);

  execFileSync(process.execPath, [checker], { cwd: root, stdio: "inherit" });
  console.log("LUMINAiRY RESOURCE COVERAGE CALIBRATION PASS: checker rejects an omitted person and undersized batch");
} finally {
  fs.rmSync(scratch, { recursive: true, force: true });
}
