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
const tinyPng = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");
const viewports = [{ id: "desktop-1440", width: 1440, height: 1024 }, { id: "mobile-390", width: 390, height: 844 }, { id: "mobile-320", width: 320, height: 844 }];
const visualFiles = new Map();
const captures = viewports.flatMap(viewport => [
  ["DAILY_FULL_PAGE", "daily-full-page"],
  ["DAILY_NEWSPAPER", "daily-newspaper"],
  ["ARTICLE", "article"]
].map(([state, suffix]) => {
  const capturePath = `visual/${viewport.id}-${suffix}.png`;
  const bytes = Buffer.concat([tinyPng, Buffer.from(capturePath)]);
  visualFiles.set(capturePath, bytes);
  return { path: capturePath, sha256: sha256(bytes), output: { width: 1, height: 1 }, viewport, state };
}));
const receipt = {
  schema: "laidies.newsstand-exact-preview.v1",
  status: "PREPARED_NO_DEPLOY",
  source_commit: "a".repeat(40),
  project: "laidies-sunnyvaile-preview",
  package: { path: "operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v4.json", sha256: "512abcf9634a8ef7c74e9213b19df6338f56ffd16e632e535d21ddf862770ffe" },
  candidate: { path: "newsstand.html", artifact_sha256: sha256("newsstand.html") },
  private_preview_receipt: { path: "newsstand-private-preview-receipt.json", sha256: sha256("newsstand-private-preview-receipt.json") },
  artifact_manifest: { path: "artifact-manifest.json", identity_sha256: identity },
  deployment_id: null,
  preview_url: null,
  review_url: null,
  review_branch: null,
  access_credential: null,
  public_verification: null,
  visual_capture: null,
  checks: ["complete-daily-package", "review-preview-calibration", "exact-private-preview-build", "private-preview-truth", "curated-public-build"].map(id => ({ id, result: "PASS" }))
};
assert.deepEqual(validateNewsstandExactPreview(receipt, manifest), []);
const deployed = {
  ...receipt,
  status: "DEPLOYED_PREVIEW",
  deployment_id: "9f161385-7486-4207-9afe-8512ea453973",
  preview_url: "https://9f161385.laidies-sunnyvaile-preview.pages.dev/",
  review_url: "https://9f161385.laidies-sunnyvaile-preview.pages.dev/newsstand?daily=2026-08-12",
  review_branch: "review-aaaaaaaaaaaa-123456789",
  deployment_provider_commit: null,
  deployment_provider_commit_verified: false,
  deployment_identity_basis: "new-id+branch+exact-byte-verification",
  access_credential: { type: "TEMPORARY_SERVICE_TOKEN", service_token_id: "f174e90a-fafe-4643-bbbc-4a0ed4fc8415", duration: "30m", policy_selector: "any_valid_service_token", revoked: true },
  public_verification: {
    access_protected: true,
    unauthenticated_status: 302,
    result: "PASS",
    critical_paths: paths.slice(0, 4).map(recordPath => ({ path: recordPath, http_status: 200, sha256: sha256(recordPath) }))
  },
  visual_capture: {
    status: "CAPTURED_NOT_REVIEWED",
    review_url: "https://9f161385.laidies-sunnyvaile-preview.pages.dev/newsstand?daily=2026-08-12",
    captured_at: "2026-08-13T12:00:00.000Z",
    states: viewports.map(viewport => ({ viewport, daily: { date: "2026-08-12", headline: "People published records of their AI work. Some contained passwords.", readyDesks: 4, horizontalOverflow: false }, article: { sections: 6, headline: "People published records of their AI work. Some contained passwords.", horizontalOverflow: false } })),
    captures
  }
};
assert.deepEqual(validateNewsstandExactPreview(deployed, manifest, visualFiles), []);
const rejects = [
  { ...receipt, source_commit: "main" },
  { ...receipt, package: { ...receipt.package, sha256: "c".repeat(64) } },
  { ...receipt, access_credential: { type: "TEMPORARY_SERVICE_TOKEN" } },
  { ...receipt, review_branch: "review-aaaaaaaaaaaa-123" },
  { ...receipt, checks: receipt.checks.filter(check => check.id !== "private-preview-truth") },
  { ...deployed, preview_url: "https://example.com/" },
  { ...deployed, review_url: deployed.preview_url },
  { ...deployed, review_url: "https://9f161385.laidies-sunnyvaile-preview.pages.dev/newsstand?daily=2026-08-11" },
  { ...deployed, review_url: "https://9f161385.laidies-sunnyvaile-preview.pages.dev/newsstand.html?daily=2026-08-12" },
  { ...deployed, access_credential: { ...deployed.access_credential, revoked: false } },
  { ...deployed, public_verification: { ...deployed.public_verification, access_protected: false } },
  { ...deployed, visual_capture: null },
  { ...deployed, visual_capture: { ...deployed.visual_capture, status: "PASS" } },
  { ...deployed, visual_capture: { ...deployed.visual_capture, captures: deployed.visual_capture.captures.slice(1) } },
  { ...deployed, deployment_identity_basis: "new-id+branch+provider-commit" },
  { ...deployed, deployment_provider_commit: "b".repeat(40), deployment_provider_commit_verified: true, deployment_identity_basis: "new-id+branch+provider-commit" },
  { ...deployed, public_verification: { ...deployed.public_verification, critical_paths: deployed.public_verification.critical_paths.slice(1) } }
];
for (const [index, candidate] of rejects.entries()) assert(validateNewsstandExactPreview(candidate, manifest, visualFiles).length > 0, `unsafe receipt ${index + 1} must fail`);

const workflow = fs.readFileSync(path.resolve(import.meta.dirname, "../.github/workflows/exact-newsstand-preview.yml"), "utf8");
function inspectWorkflow(text) {
  const errors = [];
  const deployJob = text.split(/\n  deploy-preview:\n/)[1] || "";
  const requireText = (needle, message) => { if (!text.includes(needle)) errors.push(message); };
  requireText("NEWSSTAND_PREVIEW_CONTROLLER_SHA", "controller SHA binding is missing");
  requireText("build-newsstand-review-preview.mjs", "private preview builder is missing");
  requireText("check-newsstand-exact-preview.mjs", "exact preview checker is missing");
  requireText("environment: production", "existing protected Cloudflare credential environment is missing");
  requireText("CLOUDFLARE_ACCESS_API_TOKEN: ${{ secrets.CLOUDFLARE_ACCESS_API_TOKEN }}", "separately scoped Access API secret is missing");
  if ((deployJob.match(/CLOUDFLARE_ACCESS_API_TOKEN: \$\{\{ secrets\.CLOUDFLARE_ACCESS_API_TOKEN \}\}/g) || []).length !== 3) errors.push("Access validation, creation and revocation must each receive the scoped token");
  if ((deployJob.match(/CLOUDFLARE_API_TOKEN: \$\{\{ secrets\.CLOUDFLARE_API_TOKEN \}\}/g) || []).length !== 1) errors.push("only the Pages deploy step may receive the Pages token");
  requireText("/access/service_tokens", "temporary service-token API is missing");
  requireText("any_valid_service_token", "existing any-valid-service-token policy is not checked");
  requireText(".result.id // empty", "temporary token ID is not captured before response validation");
  if ((text.match(/::add-mask::/g) || []).length < 2) errors.push("both temporary credential values must be masked");
  requireText("if: ${{ always() }}", "credential cleanup is not unconditional");
  requireText("CF-Access-Client-Id", "authenticated byte verification is missing");
  requireText("unauthenticated_status", "unauthenticated Access challenge is not checked");
  requireText("new-id+branch+exact-byte-verification", "direct-upload identity fallback is missing");
  requireText("conflicting provider commit metadata", "conflicting provider commit metadata is not rejected");
  requireText("for attempt in $(seq 1 10)", "eventual-consistency deployment polling is missing");
  requireText("if(matches.length===0) process.exit(2);", "only a not-yet-visible deployment may be retried");
  requireText("/pages/projects/$PROJECT_NAME/deployments?page=1&per_page=15", "raw Pages deployment API is missing or uses an unsupported page size");
  requireText('request_route="${route%.html}"', "canonical extensionless Pages route is not used for byte verification");
  requireText("receipt.review_url=`${receipt.preview_url}newsstand?daily=2026-08-12`;", "exact dated Daily review URL is not derived from the immutable deployment");
  requireText('unauthenticated_status="$(curl --silent --show-error --output /dev/null --max-redirs 0 --write-out \'%{http_code}\' "$review_url")"', "Access protection is not verified on the exact Daily review URL");
  requireText("playwright-core@1.62.1", "exact deployed-pixel capture lacks a pinned browser runtime");
  requireText("Capture exact deployed Daily pixels before credential revocation", "exact deployed-pixel capture step is missing");
  requireText("CAPTURED_NOT_REVIEWED", "pixel capture improperly lacks its non-quality-review boundary");
  requireText(".ns-daily-issue", "pixel capture does not inspect the exact Daily newspaper");
  requireText(".ns-article__section--longform", "pixel capture does not inspect the exact longform article");
  requireText("People published records of their AI work. Some contained passwords.", "pixel capture is not bound to the exact reviewed headline");
  if (deployJob.indexOf("Capture exact deployed Daily pixels before credential revocation") < 0 || deployJob.indexOf("Capture exact deployed Daily pixels before credential revocation") > deployJob.indexOf("Revoke temporary Access verification credential")) errors.push("exact pixels are not captured before credential revocation");
  if (deployJob.includes("pages deployment list")) errors.push("Wrangler deployment list loses direct-upload identity metadata");
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
  workflow.replaceAll("CF-Access-Client-Id", "X-Removed-Access-Client-Id"),
  workflow.replace("new-id+branch+exact-byte-verification", "unverified-direct-upload"),
  workflow.replace("conflicting provider commit metadata", "ignored provider commit metadata"),
  workflow.replace("for attempt in $(seq 1 10)", "for attempt in 1"),
  workflow.replace("if(matches.length===0) process.exit(2);", "if(matches.length===0) process.exit(0);"),
  workflow.replaceAll("/pages/projects/$PROJECT_NAME/deployments?page=1&per_page=15", "/pages/projects/$PROJECT_NAME/unknown"),
  workflow.replace('request_route="${route%.html}"', 'request_route="$route"'),
  workflow.replace("receipt.review_url=`${receipt.preview_url}newsstand?daily=2026-08-12`;", "receipt.review_url=receipt.preview_url;"),
  workflow.replace('unauthenticated_status="$(curl --silent --show-error --output /dev/null --max-redirs 0 --write-out \'%{http_code}\' "$review_url")"', 'unauthenticated_status="$(curl --silent --show-error --output /dev/null --max-redirs 0 --write-out \'%{http_code}\' "$preview_url")"'),
  workflow.replace("playwright-core@1.62.1", "playwright-core@latest"),
  workflow.replaceAll("CAPTURED_NOT_REVIEWED", "VISUALLY_APPROVED"),
  workflow.replaceAll(".ns-daily-issue", ".removed-daily"),
  workflow.replace("curl --fail --silent --show-error", "npx --yes wrangler@4.119.0 pages deployment list"),
  workflow.replaceAll("CLOUDFLARE_ACCESS_API_TOKEN", "CLOUDFLARE_API_TOKEN")
];
for (const [index, candidate] of workflowRejects.entries()) assert(inspectWorkflow(candidate).length > 0, `unsafe workflow mutation ${index + 1} must fail`);
console.log(`NEWSSTAND EXACT PREVIEW TEST PASS calibrated_rejections=${rejects.length + workflowRejects.length}`);
