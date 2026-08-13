#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SHA40 = /^[a-f0-9]{40}$/;
const SHA64 = /^[a-f0-9]{64}$/;
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
const PACKAGE_PATH = "operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v2.json";
const PACKAGE_SHA256 = "331fce79e55cdeaf86597342aac9ffb0ab8ff383b37e423e8814fdfdd07f4ae0";
const PROJECT = "laidies-sunnyvaile-preview";
const REQUIRED_CHECKS = new Set([
  "complete-daily-package",
  "review-preview-calibration",
  "exact-private-preview-build",
  "private-preview-truth",
  "curated-public-build"
]);
const CRITICAL_PATHS = [
  "newsstand.html",
  "content/newsstand-stories.js",
  "content/newsstand-daily-issues.json",
  "content/daily-edition-columns.json"
];
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");

export function validateNewsstandExactPreview(receipt, manifest) {
  const errors = [];
  if (receipt?.schema !== "laidies.newsstand-exact-preview.v1") errors.push("unsupported receipt schema");
  if (!SHA40.test(receipt?.source_commit || "")) errors.push("source_commit must be an exact lowercase 40-character Git SHA");
  if (receipt?.project !== PROJECT) errors.push("unexpected Cloudflare Pages project");
  if (receipt?.package?.path !== PACKAGE_PATH || receipt?.package?.sha256 !== PACKAGE_SHA256 || !SHA64.test(receipt?.package?.sha256 || "")) errors.push("exact Daily package binding is invalid");
  if (receipt?.candidate?.path !== "newsstand.html" || !SHA64.test(receipt?.candidate?.artifact_sha256 || "")) errors.push("NewsStand artifact binding is invalid");
  if (receipt?.private_preview_receipt?.path !== "newsstand-private-preview-receipt.json" || !SHA64.test(receipt?.private_preview_receipt?.sha256 || "")) errors.push("private preview receipt binding is invalid");
  if (receipt?.artifact_manifest?.path !== "artifact-manifest.json" || !SHA64.test(receipt?.artifact_manifest?.identity_sha256 || "")) errors.push("artifact manifest binding is invalid");

  if (manifest?.schema !== "laidies-release-artifact-manifest/v1") errors.push("unsupported artifact manifest schema");
  const records = Array.isArray(manifest?.files) ? manifest.files : [];
  const byPath = new Map(records.map(record => [record?.path, record]));
  const computedIdentity = sha256(Buffer.from(records.map(record => `${record.sha256}  ${record.path}\n`).join(""), "utf8"));
  if (manifest?.identitySha256 !== computedIdentity) errors.push("artifact manifest identity does not match its file records");
  if (receipt?.artifact_manifest?.identity_sha256 !== manifest?.identitySha256) errors.push("receipt artifact identity does not match manifest");
  const newsstand = byPath.get("newsstand.html");
  if (!newsstand || newsstand.sha256 !== receipt?.candidate?.artifact_sha256) errors.push("candidate artifact hash does not match newsstand.html");
  const privateReceipt = byPath.get("newsstand-private-preview-receipt.json");
  if (!privateReceipt || privateReceipt.sha256 !== receipt?.private_preview_receipt?.sha256) errors.push("private preview receipt hash does not match artifact");
  for (const required of CRITICAL_PATHS) if (!byPath.has(required)) errors.push(`artifact is missing critical path: ${required}`);

  const checks = new Map((Array.isArray(receipt?.checks) ? receipt.checks : []).map(entry => [entry?.id, entry?.result]));
  for (const required of REQUIRED_CHECKS) if (checks.get(required) !== "PASS") errors.push(`required check is not PASS: ${required}`);

  if (receipt?.status === "PREPARED_NO_DEPLOY") {
    if (receipt.deployment_id !== null || receipt.preview_url !== null || receipt.review_branch !== null || receipt.public_verification !== null) errors.push("prepared receipt cannot claim deployment or public verification");
  } else if (receipt?.status === "DEPLOYED_PREVIEW") {
    if (!UUID.test(receipt?.deployment_id || "")) errors.push("deployed preview requires a deployment UUID");
    if (!/^review-[a-f0-9]{12}-[0-9]+$/.test(receipt?.review_branch || "")) errors.push("deployed preview requires a unique review branch");
    if (SHA40.test(receipt?.source_commit || "") && !receipt.review_branch?.startsWith(`review-${receipt.source_commit.slice(0, 12)}-`)) errors.push("review branch is not bound to the source commit");
    let preview;
    try { preview = new URL(receipt.preview_url); } catch { errors.push("deployed preview requires a valid URL"); }
    if (preview && (preview.protocol !== "https:" || !preview.hostname.endsWith(`.${PROJECT}.pages.dev`) || preview.pathname !== "/")) errors.push("preview URL must be an immutable protected preview root");
    if (preview && receipt?.deployment_id && preview.hostname !== `${receipt.deployment_id.slice(0, 8)}.${PROJECT}.pages.dev`) errors.push("preview URL is not bound to the deployment ID");
    const verification = receipt?.public_verification;
    if (verification?.access_protected !== true || ![302, 401, 403].includes(verification?.unauthenticated_status) || verification?.result !== "PASS") errors.push("deployed preview requires Access protection and successful verification");
    const verified = new Map((verification?.critical_paths || []).map(item => [item?.path, item]));
    for (const required of CRITICAL_PATHS) {
      const record = verified.get(required);
      if (record?.http_status !== 200 || record?.sha256 !== byPath.get(required)?.sha256) errors.push(`deployed critical path is not byte-verified: ${required}`);
    }
  } else {
    errors.push("status must be PREPARED_NO_DEPLOY or DEPLOYED_PREVIEW");
  }
  return errors;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const receiptPath = process.argv[2];
  if (!receiptPath) { console.error("usage: node scripts/check-newsstand-exact-preview.mjs <preview-receipt.json>"); process.exit(2); }
  const absolute = path.resolve(receiptPath);
  const receipt = JSON.parse(fs.readFileSync(absolute, "utf8"));
  const manifest = JSON.parse(fs.readFileSync(path.join(path.dirname(absolute), receipt?.artifact_manifest?.path || ""), "utf8"));
  const errors = validateNewsstandExactPreview(receipt, manifest);
  if (errors.length) {
    console.error("NEWSSTAND EXACT PREVIEW FAIL");
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log(`NEWSSTAND EXACT PREVIEW PASS status=${receipt.status} commit=${receipt.source_commit} package=${receipt.package.sha256} artifact=${receipt.artifact_manifest.identity_sha256}`);
}
