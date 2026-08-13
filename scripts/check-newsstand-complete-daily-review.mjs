#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HASH = /^[a-f0-9]{64}$/;
const REJECTIONS_PATH = "operations/product-stewards/newsstand/NEWSSTAND-COMPLETE-DAILY-REJECTIONS.json";
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = value => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};

function inspectBinding(binding, root, label, errors) {
  if (!binding?.path || !HASH.test(binding.sha256 || "")) {
    errors.push(`${label} lacks an exact path/SHA-256 binding`);
    return null;
  }
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(`${root}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    errors.push(`${label} is missing or outside the repository`);
    return null;
  }
  const actual = sha256(fs.readFileSync(absolute));
  if (actual !== binding.sha256) errors.push(`${label} checksum mismatch`);
  return absolute;
}

function loadRejections(root, errors) {
  try {
    const registry = JSON.parse(fs.readFileSync(path.join(root, REJECTIONS_PATH), "utf8"));
    if (registry?.schemaVersion !== "laidies-newsstand-complete-daily-rejections.v1" || registry?.defaultDeny !== true || !Array.isArray(registry?.rejections)) {
      errors.push("complete-Daily rejection registry is invalid");
      return [];
    }
    const loaded = [];
    for (const [index, rejection] of registry.rejections.entries()) {
      const rejectedPackagePath = inspectBinding(rejection?.package, root, `rejections[${index}].package`, errors);
      inspectBinding(rejection?.receipt, root, `rejections[${index}].receipt`, errors);
      if (rejection?.verdict !== "REJECTED_DO_NOT_PRESENT_OR_DEPLOY" || !Array.isArray(rejection?.reasonCodes) || rejection.reasonCodes.length < 1) {
        errors.push(`rejections[${index}] lacks a fail-closed verdict and reason`);
      }
      if (rejectedPackagePath) {
        try { loaded.push({ ...rejection, canonicalPackage: canonicalJson(JSON.parse(fs.readFileSync(rejectedPackagePath, "utf8"))) }); }
        catch (error) { errors.push(`rejections[${index}].package invalid JSON: ${error.message}`); }
      }
    }
    return loaded;
  } catch (error) {
    errors.push(`complete-Daily rejection registry unavailable: ${error.message}`);
    return [];
  }
}

export function inspectCompleteDailyReview(pkg, { root = ROOT, rejections } = {}) {
  const errors = [];
  const activeRejections = rejections === undefined ? loadRejections(root, errors) : rejections;
  const canonicalPackage = canonicalJson(pkg);
  if (activeRejections.some(rejection => rejection?.canonicalPackage === canonicalPackage)) {
    errors.push("package is explicitly rejected and cannot be presented or deployed");
  }
  if (pkg?.schemaVersion !== "laidies-newsstand-complete-daily-review-package.v1") errors.push("schemaVersion mismatch");
  if (pkg?.status !== "PRIVATE_COMPLETE_DAILY_REVIEW_CANDIDATE" || pkg?.publicEligibility !== "INELIGIBLE_PENDING_ALI_APPROVAL") errors.push("package must remain a private, Ali-held candidate");
  if (pkg?.defaultExperience !== "THE_DAILY" || !/^\d{4}-\d{2}-\d{2}$/.test(pkg?.editionDate || "")) errors.push("Daily identity is invalid");
  if (pkg?.releaseAuthority?.canonicalWrite !== false || pkg?.releaseAuthority?.deploy !== false || pkg?.releaseAuthority?.public !== false) errors.push("package has unauthorized release authority");
  const expectedGates = [
    "ALI_EXACT_PACKAGE_APPROVAL",
    "OBSERVED_UNFAMILIAR_HUMAN_EXPLAIN_BACK",
    "OBSERVED_UNFAMILIAR_HUMAN_UNSEEN_TRANSFER",
    "INDEPENDENT_RELEASE_ADMISSION",
    "DEPLOYMENT_AND_EXACT_PUBLIC_VERIFICATION"
  ];
  if (JSON.stringify(pkg?.remainingGates) !== JSON.stringify(expectedGates)) errors.push("remaining release gates are incomplete or reordered");

  const storyPath = inspectBinding(pkg?.story, root, "story", errors);
  if (storyPath) {
    try {
      const candidate = JSON.parse(fs.readFileSync(storyPath, "utf8"));
      if (candidate?.candidateStatus !== "HELD_NOT_PUBLISHED" || candidate?.story?.status !== "hold" || candidate?.story?.publishedAt !== null) errors.push("bound story is not held and unpublished");
      if (canonicalJson(candidate.story) !== canonicalJson(pkg.story.record)) errors.push("embedded story differs from the bound story candidate");
    } catch { errors.push("bound story is not valid JSON"); }
  }

  for (const key of ["producerProof", "producerProofReview", "serviceReview", "semanticReview", "visualReview"]) {
    inspectBinding(pkg?.evidence?.[key], root, `evidence.${key}`, errors);
  }
  const screenshots = pkg?.evidence?.screenshots;
  if (!Array.isArray(screenshots) || screenshots.length !== 9) errors.push("exactly nine complete-page, Daily and article screenshots are required");
  else {
    const expected = new Set([
      "COMPLETE_PAGE:1440", "COMPLETE_PAGE:390", "COMPLETE_PAGE:320",
      "DAILY_FRONT:1440", "DAILY_FRONT:390", "DAILY_FRONT:320",
      "FULL_ARTICLE:1440", "FULL_ARTICLE:390", "FULL_ARTICLE:320"
    ]);
    const actual = new Set();
    for (const [index, screenshot] of screenshots.entries()) {
      inspectBinding(screenshot, root, `evidence.screenshots[${index}]`, errors);
      actual.add(`${screenshot.mode}:${screenshot.viewport}`);
    }
    if (actual.size !== 9 || [...expected].some(key => !actual.has(key))) errors.push("complete-page/Daily/article screenshot mode/viewport matrix is incomplete");
  }

  if (!Array.isArray(pkg?.desks) || pkg.desks.length !== 9) errors.push("Daily must contain all nine governed service desks");
  else {
    const ready = pkg.desks.filter(desk => desk.state === "ready");
    if (ready.length !== 4 || !["paige_tip", "career_life", "promptoscope", "mme_claio"].every(type => ready.some(desk => desk.type === type))) errors.push("the four reviewed ready desks are incomplete");
    for (const desk of ready) inspectBinding(desk.sourceCandidate, root, `desk.${desk.type}.sourceCandidate`, errors);
    for (const desk of pkg.desks.filter(desk => desk.state === "empty")) if (!desk.emptyState || desk.recordId !== null) errors.push(`desk.${desk.type} has an invalid governed empty state`);
  }
  return { errors, status: errors.length ? "HOLD" : "READY_FOR_ALI_REVIEW" };
}

function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: node scripts/check-newsstand-complete-daily-review.mjs <package.json>"); process.exit(2); }
  const pkg = JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
  const result = inspectCompleteDailyReview(pkg);
  if (result.errors.length) {
    console.error("NEWSSTAND COMPLETE DAILY REVIEW HOLD");
    result.errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log(`NEWSSTAND COMPLETE DAILY REVIEW READY package=${path.relative(ROOT, path.resolve(file))} screenshots=9 ready_desks=4 release_authority=none`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
