#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(ROOT, "scripts/build-newsstand-review-preview.mjs");
const PACKAGE = path.join(ROOT, "operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v1.json");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-review-preview-"));
const output = path.join(temp, "site");
const good = spawnSync(process.execPath, [SCRIPT, output], { cwd: ROOT, encoding: "utf8", env: { ...process.env, NEWSSTAND_REVIEW_SOURCE_COMMIT: "61dd76f323586d116c303f7c550aa2fcceb13022" } });
assert.equal(good.status, 0, good.stderr || good.stdout);
const html = fs.readFileSync(path.join(output, "newsstand.html"), "utf8");
const stories = fs.readFileSync(path.join(output, "content/newsstand-stories.js"), "utf8");
const issues = JSON.parse(fs.readFileSync(path.join(output, "content/newsstand-daily-issues.json"), "utf8"));
const receipt = JSON.parse(fs.readFileSync(path.join(output, "newsstand-private-preview-receipt.json"), "utf8"));
assert.match(html, /PRIVATE REVIEW — NOT PUBLISHED/);
assert.match(html, /noindex,nofollow,noarchive/);
assert.match(stories, /ai-work-logs-can-carry-secrets/);
const reviewIssue = issues.issues.find(issue => issue.editionDate === "2026-08-12");
assert(reviewIssue && reviewIssue.storyIds.includes("ai-work-logs-can-carry-secrets") && reviewIssue.serviceRecordIds.length === 4);
assert.equal(reviewIssue.admission.decision, "ACCEPT_LOCAL_CANONICAL_WRITE", "preview issue must use the reader's existing accepted decision value; the artifact banner and receipt carry the no-public-authority boundary");
assert.equal(receipt.publicAuthority, false);
assert(!fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8").includes("ai-work-logs-can-carry-secrets"), "preview build must not mutate canonical source data");
assert(!fs.existsSync(path.join(output, "operations")), "preview artifact must not expose operations files");

const badPackage = JSON.parse(fs.readFileSync(PACKAGE, "utf8"));
badPackage.releaseAuthority.canonicalWrite = true;
const badPackagePath = path.join(temp, "bad-package.json");
fs.writeFileSync(badPackagePath, JSON.stringify(badPackage));
const bad = spawnSync(process.execPath, [SCRIPT, path.join(temp, "bad-site"), "--fixture"], {
  cwd: ROOT, encoding: "utf8", env: { ...process.env, NEWSSTAND_REVIEW_PACKAGE_PATH: badPackagePath }
});
assert.notEqual(bad.status, 0, "unauthorized package must fail before a preview build");
assert.match(bad.stderr, /package is not ready for Ali review/);
console.log("NEWSSTAND REVIEW PREVIEW CALIBRATION PASS · exact private package rendered · unauthorized package rejected · canonical source unchanged");
