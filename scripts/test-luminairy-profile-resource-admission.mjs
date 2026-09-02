#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "luminairy-resource-gate-"));
const mutatedProfilesPath = path.join(temp, "profiles-mutated.json");
const mutatedClaimsPath = path.join(temp, "claims-mutated.json");
const run = (script, env = {}) => spawnSync(process.execPath, [path.join(root, script), ...(script.includes("resource-evidence") ? ["--require-all"] : [])], {
  cwd: root,
  env: { ...process.env, ...env },
  encoding: "utf8"
});

try {
  const evidencePass = run("scripts/check-luminairy-resource-evidence.mjs");
  assert.equal(evidencePass.status, 0, evidencePass.stderr);
  const claimsPass = run("scripts/validate-luminairy-claims.mjs");
  assert.equal(claimsPass.status, 0, claimsPass.stderr);

  const profiles = JSON.parse(fs.readFileSync(path.join(root, "content/luminairy-profiles.json"), "utf8"));
  profiles.mavens[0].about += " MUTATED";
  fs.writeFileSync(mutatedProfilesPath, JSON.stringify(profiles));
  const evidenceReject = run("scripts/check-luminairy-resource-evidence.mjs", { LUMINAIRY_PROFILES_PATH: mutatedProfilesPath });
  assert.notEqual(evidenceReject.status, 0, "evidence checker must reject profile text that no longer matches evidence");
  assert.match(evidenceReject.stderr, /role\/about evidence mismatch/);

  const claims = JSON.parse(fs.readFileSync(path.join(root, "content/luminairy-claims.json"), "utf8"));
  const target = claims.records.find((record) => record.wing !== "saints");
  target.resourceEvidenceSha256 = "0".repeat(64);
  fs.writeFileSync(mutatedClaimsPath, JSON.stringify(claims));
  const claimReject = run("scripts/validate-luminairy-claims.mjs", { LUMINAIRY_CLAIMS_PATH: mutatedClaimsPath });
  assert.notEqual(claimReject.status, 0, "claim validator must reject a mismatched resource-evidence hash");
  assert.match(claimReject.stderr, /resource evidence hash mismatch/);

  console.log("LUMINAiRY resource-admission calibration PASS: valid candidate admitted; mutated public text and mutated evidence binding both rejected");
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
