#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { validateNewsstandExactPreview } from "./check-newsstand-exact-preview.mjs";

const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const paths = ["newsstand.html", "content/newsstand-stories.js", "content/newsstand-daily-issues.json", "content/daily-edition-columns.json", "newsstand-private-preview-receipt.json"];
const records = paths.map((recordPath, index) => ({ path: recordPath, bytes: index + 10, sha256: sha256(recordPath) }));
const identity = sha256(records.map(record => `${record.sha256}  ${record.path}\n`).join(""));
const manifest = { schema: "laidies-release-artifact-manifest/v1", identitySha256: identity, files: records };
const receipt = {
  schema: "laidies.newsstand-exact-preview.v1",
  status: "PREPARED_NO_DEPLOY",
  source_commit: "a".repeat(40),
  project: "laidies-sunnyvaile-preview",
  package: { path: "operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v2.json", sha256: "331fce79e55cdeaf86597342aac9ffb0ab8ff383b37e423e8814fdfdd07f4ae0" },
  candidate: { path: "newsstand.html", artifact_sha256: sha256("newsstand.html") },
  private_preview_receipt: { path: "newsstand-private-preview-receipt.json", sha256: sha256("newsstand-private-preview-receipt.json") },
  artifact_manifest: { path: "artifact-manifest.json", identity_sha256: identity },
  deployment_id: null,
  preview_url: null,
  review_branch: null,
  public_verification: null,
  checks: ["complete-daily-package", "review-preview-calibration", "exact-private-preview-build", "private-preview-truth", "curated-public-build"].map(id => ({ id, result: "PASS" }))
};
assert.deepEqual(validateNewsstandExactPreview(receipt, manifest), []);
const deployed = {
  ...receipt,
  status: "DEPLOYED_PREVIEW",
  deployment_id: "9f161385-7486-4207-9afe-8512ea453973",
  preview_url: "https://9f161385.laidies-sunnyvaile-preview.pages.dev/",
  review_branch: "review-aaaaaaaaaaaa-123456789",
  public_verification: {
    access_protected: true,
    unauthenticated_status: 302,
    result: "PASS",
    critical_paths: paths.slice(0, 4).map(recordPath => ({ path: recordPath, http_status: 200, sha256: sha256(recordPath) }))
  }
};
assert.deepEqual(validateNewsstandExactPreview(deployed, manifest), []);
const rejects = [
  { ...receipt, source_commit: "main" },
  { ...receipt, package: { ...receipt.package, sha256: "c".repeat(64) } },
  { ...receipt, review_branch: "review-aaaaaaaaaaaa-123" },
  { ...receipt, checks: receipt.checks.filter(check => check.id !== "private-preview-truth") },
  { ...deployed, preview_url: "https://example.com/" },
  { ...deployed, public_verification: { ...deployed.public_verification, access_protected: false } },
  { ...deployed, public_verification: { ...deployed.public_verification, critical_paths: deployed.public_verification.critical_paths.slice(1) } }
];
for (const [index, candidate] of rejects.entries()) assert(validateNewsstandExactPreview(candidate, manifest).length > 0, `unsafe receipt ${index + 1} must fail`);

const workflow = fs.readFileSync(path.resolve(import.meta.dirname, "../.github/workflows/exact-newsstand-preview.yml"), "utf8");
for (const required of [
  "NEWSSTAND_PREVIEW_CONTROLLER_SHA",
  "laidies-sunnyvaile-preview",
  "build-newsstand-review-preview.mjs",
  "check-newsstand-exact-preview.mjs",
  "CLOUDFLARE_ACCESS_READ_TOKEN",
  "CF-Access-Client-Id",
  "unauthenticated_status",
  "newsstand-private-preview-receipt.json"
]) assert.ok(workflow.includes(required), `workflow is missing ${required}`);
const deployJob = workflow.split(/\n  deploy-preview:\n/)[1] || "";
assert.ok(!deployJob.includes("actions/checkout"), "credentialed deploy job must not execute candidate repository code");
assert.ok(!workflow.includes("${{ runner.temp }}"), "job-level environment cannot use the runner context");
assert.ok(!/^\s*PROJECT_NAME:\s*laidies-sunnyvaile\s*$/m.test(workflow), "preview must not target production project");
assert.ok(!workflow.includes("content/newsstand-stories.js\n          git"), "workflow must not mutate canonical source data");
console.log(`NEWSSTAND EXACT PREVIEW TEST PASS calibrated_rejections=${rejects.length + 3}`);
