#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifests = process.argv.slice(2);

if (!manifests.length) {
  console.error("VISUAL ADMISSION FAIL");
  console.error("- provide at least one ADMISSION.json path");
  process.exit(1);
}

const errors = [];

for (const manifestPath of manifests) {
  const absoluteManifest = path.resolve(root, manifestPath);
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(absoluteManifest, "utf8"));
  } catch (error) {
    errors.push(`${manifestPath}: cannot read valid JSON (${error.message})`);
    continue;
  }

  const label = manifest.competition_id || manifestPath;
  const validStatuses = new Set(["ROUGH", "ADMITTED", "REJECTED"]);
  if (manifest.schema_version !== 1) errors.push(`${label}: schema_version must be 1`);
  if (!validStatuses.has(manifest.status)) errors.push(`${label}: invalid status`);
  if (!manifest.maker_id) errors.push(`${label}: missing maker_id`);
  if (!manifest.experience_brief) errors.push(`${label}: missing experience_brief`);
  if (!manifest.competition_variable) errors.push(`${label}: missing competition_variable`);
  if (!Array.isArray(manifest.invariants) || !manifest.invariants.length) {
    errors.push(`${label}: missing invariants`);
  }
  if (!Array.isArray(manifest.artifacts) || !manifest.artifacts.length) {
    errors.push(`${label}: missing artifacts`);
    continue;
  }

  const expectedFolder =
    manifest.status === "ADMITTED" ? "_admitted" :
    manifest.status === "REJECTED" ? "_rejected" :
    "_rough";

  for (const artifact of manifest.artifacts) {
    const normalized = artifact.split(path.sep).join("/");
    if (!normalized.includes(`/${expectedFolder}/`)) {
      errors.push(`${label}: ${manifest.status} artifact is not under ${expectedFolder}/ (${artifact})`);
    }
    if (!fs.existsSync(path.resolve(root, artifact))) {
      errors.push(`${label}: artifact does not exist (${artifact})`);
    }
  }

  if (manifest.status === "ADMITTED") {
    if (!manifest.reviewer_id) errors.push(`${label}: admitted candidate missing reviewer_id`);
    if (manifest.reviewer_id === manifest.maker_id) {
      errors.push(`${label}: maker cannot be reviewer`);
    }
    if (!Array.isArray(manifest.approved_references) || !manifest.approved_references.length) {
      errors.push(`${label}: admitted candidate missing approved references`);
    }
    if (!manifest.comparison_evidence || !fs.existsSync(path.resolve(root, manifest.comparison_evidence))) {
      errors.push(`${label}: admitted candidate missing comparison evidence`);
    }
    const audit = manifest.visible_audit || {};
    for (const [check, passed] of Object.entries(audit)) {
      if (passed !== true) errors.push(`${label}: visible audit failed ${check}`);
    }
    const requiredAudit = [
      "words_and_labels_valid",
      "logos_and_symbols_valid",
      "characters_and_identity_valid",
      "product_objects_valid",
      "controls_and_actions_legible",
      "visual_genre_matches_laidies",
      "real_assets_used_where_available",
      "declared_invariants_held"
    ];
    for (const check of requiredAudit) {
      if (!(check in audit)) errors.push(`${label}: visible audit missing ${check}`);
    }
    const scores = manifest.scores || {};
    for (const score of ["product_legibility", "positive_laidies_brand_contribution", "ux_accessibility"]) {
      if (!Number.isFinite(scores[score]) || scores[score] < 17) {
        errors.push(`${label}: ${score} must be at least 17/20`);
      }
    }
    if (manifest.owner_review_ready !== true) {
      errors.push(`${label}: admitted candidate must be owner_review_ready`);
    }
  } else if (manifest.owner_review_ready !== false) {
    errors.push(`${label}: ${manifest.status} candidate cannot be owner_review_ready`);
  }
}

if (errors.length) {
  console.error("VISUAL ADMISSION FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("VISUAL ADMISSION PASS");
console.log(`manifests=${manifests.length}`);
