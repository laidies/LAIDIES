#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SHA40 = /^[a-f0-9]{40}$/;
const SHA64 = /^[a-f0-9]{64}$/;
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
const PACKAGE_PATH = "operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v5.json";
const PACKAGE_SHA256 = "19db95ab57fd4fdf96aab24010d8efca8deb534fee80ebd30d93a1869a972532";
const PROJECT = "laidies-sunnyvaile-preview";
const REVIEW_PATH = "/newsstand";
const REVIEW_DATE = "2026-08-12";
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
  "content/daily-edition-columns.json",
  "assets/fonts/newsstand/anton-latin.woff2",
  "assets/fonts/newsstand/jost-normal-latin.woff2",
  "assets/fonts/newsstand/jost-italic-latin.woff2"
];
const FONT_RESOURCES = [
  "/assets/fonts/newsstand/anton-latin.woff2",
  "/assets/fonts/newsstand/jost-italic-latin.woff2",
  "/assets/fonts/newsstand/jost-normal-latin.woff2"
];
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");

function pngDimensions(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}
export function validateNewsstandExactPreview(receipt, manifest, visualFiles = new Map()) {
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
    if (receipt.deployment_id !== null || receipt.preview_url !== null || receipt.review_url !== null || receipt.review_branch !== null || receipt.access_credential !== null || receipt.public_verification !== null || receipt.visual_capture !== null) errors.push("prepared receipt cannot claim deployment, review URL, credential, public verification or visual capture");
  } else if (receipt?.status === "DEPLOYED_PREVIEW") {
    if (!UUID.test(receipt?.deployment_id || "")) errors.push("deployed preview requires a deployment UUID");
    if (!/^review-[a-f0-9]{12}-[0-9]+$/.test(receipt?.review_branch || "")) errors.push("deployed preview requires a unique review branch");
    if (SHA40.test(receipt?.source_commit || "") && !receipt.review_branch?.startsWith(`review-${receipt.source_commit.slice(0, 12)}-`)) errors.push("review branch is not bound to the source commit");
    const providerCommit = receipt?.deployment_provider_commit;
    const identityBasis = receipt?.deployment_identity_basis;
    if (providerCommit === null) {
      if (receipt?.deployment_provider_commit_verified !== false || identityBasis !== "new-id+branch+exact-byte-verification") errors.push("direct-upload deployment identity must fall back to exact byte verification");
    } else if (!SHA40.test(providerCommit || "") || providerCommit !== receipt?.source_commit || receipt?.deployment_provider_commit_verified !== true || identityBasis !== "new-id+branch+provider-commit") {
      errors.push("provider commit metadata does not bind the deployment to the source commit");
    }
    let preview;
    try { preview = new URL(receipt.preview_url); } catch { errors.push("deployed preview requires a valid URL"); }
    if (preview && (preview.protocol !== "https:" || !preview.hostname.endsWith(`.${PROJECT}.pages.dev`) || preview.pathname !== "/")) errors.push("preview URL must be an immutable protected preview root");
    if (preview && receipt?.deployment_id && preview.hostname !== `${receipt.deployment_id.slice(0, 8)}.${PROJECT}.pages.dev`) errors.push("preview URL is not bound to the deployment ID");
    let review;
    try { review = new URL(receipt.review_url); } catch { errors.push("deployed preview requires a valid exact Daily review URL"); }
    if (review && preview && (review.protocol !== "https:" || review.hostname !== preview.hostname || review.pathname !== REVIEW_PATH || review.hash || review.searchParams.size !== 1 || review.searchParams.get("daily") !== REVIEW_DATE)) {
      errors.push("review URL must open the exact dated Daily on the immutable protected deployment");
    }
    const credential = receipt?.access_credential;
    if (credential?.type !== "TEMPORARY_SERVICE_TOKEN" || !UUID.test(credential?.service_token_id || "") || credential?.duration !== "30m" || credential?.policy_selector !== "any_valid_service_token" || credential?.revoked !== true) errors.push("deployed preview requires a revoked temporary Access verification credential");
    const verification = receipt?.public_verification;
    if (verification?.access_protected !== true || ![302, 401, 403].includes(verification?.unauthenticated_status) || verification?.result !== "PASS") errors.push("deployed preview requires Access protection and successful verification");
    const verified = new Map((verification?.critical_paths || []).map(item => [item?.path, item]));
    for (const required of CRITICAL_PATHS) {
      const record = verified.get(required);
      if (record?.http_status !== 200 || record?.sha256 !== byPath.get(required)?.sha256) errors.push(`deployed critical path is not byte-verified: ${required}`);
    }
    const visual = receipt?.visual_capture;
    if (visual?.status !== "CAPTURED_NOT_REVIEWED" || visual?.review_url !== receipt?.review_url || !/^\d{4}-\d{2}-\d{2}T/.test(visual?.captured_at || "")) errors.push("deployed preview requires exact deployed-pixel capture metadata without claiming quality review");
    const expectedViews = new Map([["desktop-1440", [1440, 1024]], ["mobile-390", [390, 844]], ["mobile-320", [320, 844]]]);
    const states = Array.isArray(visual?.states) ? visual.states : [];
    if (states.length !== 3) errors.push("visual capture must record exactly three viewport states");
    for (const [id, [width, height]] of expectedViews) {
      const state = states.find(item => item?.viewport?.id === id);
      if (!state || state.viewport.width !== width || state.viewport.height !== height || state.daily?.date !== REVIEW_DATE || state.daily?.headline !== "People published records of their AI work. Some contained passwords." || state.daily?.readyDesks !== 4 || state.daily?.horizontalOverflow !== false || state.article?.sections !== 6 || state.article?.horizontalOverflow !== false) errors.push(`visual state is incomplete or unsafe: ${id}`);
      const fonts = state?.fonts;
      if (fonts?.ready !== true || JSON.stringify(fonts?.faceCounts) !== "[1,1,1]" ||
          fonts?.checks?.anton !== true || fonts?.checks?.jost !== true || fonts?.checks?.jostItalic !== true ||
          !fonts?.families?.display?.includes("Anton") || !fonts?.families?.body?.includes("Jost") ||
          JSON.stringify(fonts?.resources) !== JSON.stringify(FONT_RESOURCES)) {
        errors.push(`deployed NewsStand fonts are incomplete or fell back: ${id}`);
      }
    }
    const captures = Array.isArray(visual?.captures) ? visual.captures : [];
    const expectedCaptures = new Set([...expectedViews.keys()].flatMap(id => ["DAILY_FULL_PAGE", "DAILY_NEWSPAPER", "ARTICLE"].map(state => `${id}|${state}`)));
    const seenCaptures = new Set();
    for (const capture of captures) {
      const id = capture?.viewport?.id;
      const key = `${id}|${capture?.state}`;
      seenCaptures.add(key);
      if (!expectedCaptures.has(key)) errors.push(`unexpected visual capture: ${key}`);
      if (!/^visual\/(?:desktop-1440|mobile-390|mobile-320)-(?:daily-full-page|daily-newspaper|article)\.png$/.test(capture?.path || "") || !SHA64.test(capture?.sha256 || "")) errors.push(`invalid visual capture binding: ${key}`);
      const buffer = visualFiles.get(capture?.path);
      const dimensions = pngDimensions(buffer);
      if (!dimensions || sha256(buffer) !== capture?.sha256 || dimensions.width !== capture?.output?.width || dimensions.height !== capture?.output?.height || dimensions.width < 1 || dimensions.height < 1) errors.push(`visual capture bytes do not match receipt: ${capture?.path || key}`);
    }
    if (captures.length !== expectedCaptures.size || seenCaptures.size !== expectedCaptures.size || [...expectedCaptures].some(key => !seenCaptures.has(key))) errors.push("visual capture set is incomplete or duplicated");
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
  const visualFiles = new Map();
  for (const capture of receipt?.visual_capture?.captures || []) {
    if (/^visual\/[a-z0-9-]+\.png$/.test(capture?.path || "")) {
      const capturePath = path.join(path.dirname(absolute), capture.path);
      if (fs.existsSync(capturePath)) visualFiles.set(capture.path, fs.readFileSync(capturePath));
    }
  }
  const errors = validateNewsstandExactPreview(receipt, manifest, visualFiles);
  if (errors.length) {
    console.error("NEWSSTAND EXACT PREVIEW FAIL");
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log(`NEWSSTAND EXACT PREVIEW PASS status=${receipt.status} commit=${receipt.source_commit} package=${receipt.package.sha256} artifact=${receipt.artifact_manifest.identity_sha256}`);
}
