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
  access_credential: null,
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
  access_credential: { type: "TEMPORARY_SERVICE_TOKEN", service_token_id: "f174e90a-fafe-4643-bbbc-4a0ed4fc8415", duration: "30m", policy_selector: "any_valid_service_token", revoked: true },
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
  { ...receipt, access_credential: { type: "TEMPORARY_SERVICE_TOKEN" } },
  { ...receipt, review_branch: "review-aaaaaaaaaaaa-123" },
  { ...receipt, checks: receipt.checks.filter(check => check.id !== "private-preview-truth") },
  { ...deployed, preview_url: "https://example.com/" },
  { ...deployed, access_credential: { ...deployed.access_credential, revoked: false } },
  { ...deployed, public_verification: { ...deployed.public_verification, access_protected: false } },
  { ...deployed, public_verification: { ...deployed.public_verification, critical_paths: deployed.public_verification.critical_paths.slice(1) } }
];
for (const [index, candidate] of rejects.entries()) assert(validateNewsstandExactPreview(candidate, manifest).length > 0, `unsafe receipt ${index + 1} must fail`);

const workflow = fs.readFileSync(path.resolve(import.meta.dirname, "../.github/workflows/exact-newsstand-preview.yml"), "utf8");
function inspectWorkflow(text) {
  const errors = [];
  const deployJob = text.split(/\n  deploy-preview:\n/)[1] || "";
  const requireText = (needle, message) => { if (!text.includes(needle)) errors.push(message); };
  requireText("NEWSSTAND_PREVIEW_CONTROLLER_SHA", "controller SHA binding is missing");
  requireText("build-newsstand-review-preview.mjs", "private preview builder is missing");
  requireText("check-newsstand-exact-preview.mjs", "exact preview checker is missing");
  requireText("environment: production", "existing protected Cloudflare credential environment is missing");
  requireText("/access/service_tokens", "temporary service-token API is missing");
  requireText("any_valid_service_token", "existing any-valid-service-token policy is not checked");
  requireText(".result.id // empty", "temporary token ID is not captured before response validation");
  if ((text.match(/::add-mask::/g) || []).length < 2) errors.push("both temporary credential values must be masked");
  requireText("if: ${{ always() }}", "credential cleanup is not unconditional");
  requireText("CF-Access-Client-Id", "authenticated byte verification is missing");
  requireText("unauthenticated_status", "unauthenticated Access challenge is not checked");
  requireText("newsstand-private-preview-receipt.json", "private preview truth binding is missing");
  if (!deployJob) errors.push("deploy job is missing");
  if (deployJob.includes("actions/checkout")) errors.push("credentialed deploy job executes candidate repository code");
  if (deployJob.includes("CLOUDFLARE_ACCESS_READ_TOKEN")) errors.push("workflow depends on a missing permanent Access API secret");
  if (deployJob.includes("secrets.CF_ACCESS_CLIENT_ID") || deployJob.includes("secrets.CF_ACCESS_CLIENT_SECRET")) errors.push("workflow depends on missing permanent Access service-token secrets");
  if ((deployJob.match(/--request DELETE/g) || []).length < 2) errors.push("temporary token lacks both error-path and normal-path revocation");
  if (deployJob.indexOf("Revoke temporary Access verification credential") < 0 || deployJob.indexOf("Revoke temporary Access verification credential") > deployJob.indexOf("Upload deployed preview receipt")) errors.push("temporary credential is not revoked before receipt upload");
  if (deployJob.includes("node scripts/")) errors.push("credentialed deploy job executes candidate scripts");
  if (text.includes("${{ runner.temp }}")) errors.push("job-level environment uses unsupported runner context");
  if (text.includes("/../")) errors.push("artifact upload path contains a parent-directory segment");
  if (!text.includes("npm run test:newsstand-canon")) errors.push("complete NewsStand canonical pipeline is missing");
  if (text.includes("npm run ci:build")) errors.push("unrelated repository-wide checks gate the bounded preview");
  if (/^\s*PROJECT_NAME:\s*laidies-sunnyvaile\s*$/m.test(text)) errors.push("preview targets the production Pages project");
  if (text.includes("content/newsstand-stories.js\n          git")) errors.push("workflow mutates canonical source data");
  return errors;
}
assert.deepEqual(inspectWorkflow(workflow), []);
const workflowRejects = [
  workflow.replace("environment: production", "environment: preview"),
  workflow.replace("if: ${{ always() }}", "if: ${{ success() }}"),
  workflow.replaceAll("--request DELETE", "--request GET"),
  workflow.replaceAll("any_valid_service_token", "removed_service_token_policy"),
  workflow.replace(".result.id // empty", ".result.missing_id // empty"),
  workflow.replace("::add-mask::", "::notice::"),
  workflow.replace("  deploy-preview:\n", "  deploy-preview:\n    # actions/checkout\n"),
  workflow.replaceAll("PROJECT_NAME: laidies-sunnyvaile-preview", "PROJECT_NAME: laidies-sunnyvaile"),
  workflow.replace("CF-Access-Client-Id", "X-Removed-Access-Client-Id")
];
for (const [index, candidate] of workflowRejects.entries()) assert(inspectWorkflow(candidate).length > 0, `unsafe workflow mutation ${index + 1} must fail`);
console.log(`NEWSSTAND EXACT PREVIEW TEST PASS calibrated_rejections=${rejects.length + workflowRejects.length}`);
