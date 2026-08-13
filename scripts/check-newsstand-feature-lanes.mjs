#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = "operations/product-stewards/newsstand/NEWSSTAND-FEATURE-LANE-REGISTRY.json";
const EXEMPLARS_PATH = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const REQUIRED = new Set(["the_breaking", "daily_news", "the_weekly", "the_big_picture", "straight_talk", "dear_miss_jeeves", "paige_tip", "career_work_life", "promptoscope", "term_of_the_week", "mme_claio", "song_of_the_day", "did_you_know", "town_note", "curiosity", "fiction"]);
const sha256 = (body) => crypto.createHash("sha256").update(body).digest("hex");
const text = (value) => typeof value === "string" && value.trim().length > 0;

function checkBinding(root, binding, label, errors) {
  if (!binding || !text(binding.path) || !/^[a-f0-9]{64}$/.test(binding.sha256 || "")) { errors.push(`${label} requires path and SHA-256`); return null; }
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute)) { errors.push(`${label} is unavailable`); return null; }
  if (sha256(fs.readFileSync(absolute)) !== binding.sha256) errors.push(`${label} SHA-256 mismatch`);
  return absolute;
}

function checkAcceptedExemplar(root, binding, { laneId, slot }, errors) {
  const label = `${laneId}.${slot}`;
  checkBinding(root, binding, label, errors);
  const acceptancePath = checkBinding(root, binding?.acceptanceRecord, `${label}.acceptanceRecord`, errors);
  if (!acceptancePath) return;

  let acceptance;
  try { acceptance = JSON.parse(fs.readFileSync(acceptancePath, "utf8")); }
  catch (error) { errors.push(`${label}.acceptanceRecord is invalid JSON: ${error.message}`); return; }

  const require = (condition, message) => { if (!condition) errors.push(`${label}.acceptanceRecord ${message}`); };
  require(acceptance?.schemaVersion === "laidies-newsstand-positive-exemplar-acceptance.v1", "schemaVersion mismatch");
  require(acceptance?.laneId === laneId, `laneId must be ${laneId}`);
  require(acceptance?.exemplarSlot === slot, `exemplarSlot must be ${slot}`);
  require(acceptance?.candidate?.path === binding?.path && acceptance?.candidate?.sha256 === binding?.sha256, "candidate binding must match the registry exemplar");
  require(acceptance?.aliDecision?.verdict === "ACCEPT", "requires Ali verdict ACCEPT");
  require(text(acceptance?.aliDecision?.exactWords), "requires Ali's exact acceptance words");
  require(!Number.isNaN(Date.parse(acceptance?.aliDecision?.decidedAt || "")), "requires a valid Ali decision timestamp");
  checkBinding(root, acceptance?.producerSelfReview, `${label}.acceptanceRecord.producerSelfReview`, errors);
  checkBinding(root, acceptance?.independentReview, `${label}.acceptanceRecord.independentReview`, errors);
  checkBinding(root, acceptance?.sourceFreshnessEvidence, `${label}.acceptanceRecord.sourceFreshnessEvidence`, errors);
  require(acceptance?.authorityBoundary === "EXEMPLAR_ONLY_NO_PUBLICATION_AUTHORITY", "must preserve the exemplar-only authority boundary");
}

function checkTemplateCandidate(root, binding, label, errors) {
  const absolute = checkBinding(root, binding, label, errors);
  if (!absolute) return;
  const body = fs.readFileSync(absolute, "utf8");
  const sections = binding.sections || (binding.section ? [binding.section] : []);
  if (!sections.length) errors.push(`${label} requires section or sections`);
  for (const section of sections) {
    const heading = `## ${section}`;
    const start = body.indexOf(heading);
    if (!text(section) || start < 0) { errors.push(`${label} section is missing from the exact template: ${section || ""}`); continue; }
    const next = body.indexOf("\n## ", start + heading.length);
    const sectionBody = body.slice(start, next < 0 ? body.length : next);
    const expectedSectionSha = sections.length === 1 ? binding.sectionSha256 : binding.sectionSha256ByName?.[section];
    if (expectedSectionSha && sha256(sectionBody) !== expectedSectionSha) errors.push(`${label} ${section} section SHA-256 mismatch`);
    if (!sectionBody.includes("| Section | Content | Analysis | Delivery | Must not do |")) errors.push(`${label} ${section} must define section-by-section Content, Analysis, Delivery and Must not do jobs`);
    const tableRows = sectionBody.split("\n").filter((line) => line.startsWith("|") && !line.includes("---"));
    if (tableRows.length < 4) errors.push(`${label} ${section} requires at least three reader-facing section rows`);
  }
}

function checkAcceptedTemplate(root, binding, { laneId, slot }, errors) {
  const label = `${laneId}.${slot}.approvedTemplate`;
  checkTemplateCandidate(root, binding, label, errors);
  const acceptancePath = checkBinding(root, binding?.acceptanceRecord, `${label}.acceptanceRecord`, errors);
  if (!acceptancePath) return;

  let acceptance;
  try { acceptance = JSON.parse(fs.readFileSync(acceptancePath, "utf8")); }
  catch (error) { errors.push(`${label}.acceptanceRecord is invalid JSON: ${error.message}`); return; }

  const require = (condition, message) => { if (!condition) errors.push(`${label}.acceptanceRecord ${message}`); };
  require(/^[a-f0-9]{64}$/.test(binding?.sectionSha256 || ""), "approved template requires exact sectionSha256");
  if (acceptance?.schemaVersion === "laidies-newsstand-template-review.v1") {
    const decision = (acceptance.decisions || []).find((item) => item.laneId === laneId && item.templateSlot === slot);
    require(Boolean(decision), `requires a decision for ${laneId}.${slot}`);
    require(decision?.verdict === "ACCEPT", "requires Ali verdict ACCEPT");
    require(decision?.section === binding?.section, "section must match the accepted section");
    require(decision?.sectionSha256 === binding?.sectionSha256, "section SHA-256 must match the accepted section");
    require(acceptance?.templateDocument?.path === binding?.path, "template path must match the reviewed document");
    require(text(acceptance?.aliStatement?.exactWords), "requires Ali's exact review words");
    require(!Number.isNaN(Date.parse(acceptance?.aliStatement?.decidedAt || "")), "requires a valid Ali decision timestamp");
    require(acceptance?.authorityBoundary === "TEMPLATE_ONLY_PRIVATE_EXAMPLE_AUTHORITY", "must preserve the template-only authority boundary");
  } else {
    require(acceptance?.schemaVersion === "laidies-newsstand-template-acceptance.v1", "schemaVersion mismatch");
    require(acceptance?.laneId === laneId, `laneId must be ${laneId}`);
    require(acceptance?.templateSlot === slot, `templateSlot must be ${slot}`);
    require(acceptance?.template?.path === binding?.path && acceptance?.template?.sha256 === binding?.sha256, "template binding must match the registry template");
    require(acceptance?.aliDecision?.verdict === "ACCEPT", "requires Ali verdict ACCEPT");
    require(text(acceptance?.aliDecision?.exactWords), "requires Ali's exact acceptance words");
    require(!Number.isNaN(Date.parse(acceptance?.aliDecision?.decidedAt || "")), "requires a valid Ali decision timestamp");
    require(acceptance?.authorityBoundary === "TEMPLATE_ONLY_PRIVATE_EXAMPLE_AUTHORITY", "must preserve the template-only authority boundary");
  }
}

export function inspectNewsstandFeatureLanes(registry, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(registry?.schemaVersion === "laidies-newsstand-feature-lanes.v1", "schemaVersion mismatch");
  require(registry?.defaultDenyDrafting === true, "feature drafting must default deny");
  for (const field of ["fullPublishShapedTextRequired", "aliAcceptanceRequired", "sourceAndFreshnessBindingRequired", "rejectedContrastRequired", "producerSelfCheckRequired", "approvedTemplateRequired", "dailyNewsRequiresOnePerEnabledStoryMode", "samplersAndOutlinesAreIneligible"]) {
    require(registry?.exemplarPolicy?.[field] === true, `exemplarPolicy.${field} must be true`);
  }
  require(Array.isArray(registry?.lanes), "lanes must be an array");
  const exemplarRegistry = JSON.parse(fs.readFileSync(path.join(root, EXEMPLARS_PATH), "utf8"));
  const negativeIds = new Set((exemplarRegistry.negativeExemplars || []).map((item) => item.id));
  const seen = new Set();
  for (const lane of registry?.lanes || []) {
    require(text(lane?.id) && !seen.has(lane.id), `lane id is missing or duplicated: ${lane?.id || ""}`);
    seen.add(lane?.id);
    for (const field of ["publicName", "publishesIn", "cadence", "readerJob", "distinctFrom", "status"]) require(text(lane?.[field]), `${lane?.id || "lane"}.${field} is required`);
    require(Array.isArray(lane?.templateBeats) && lane.templateBeats.length >= 3 && lane.templateBeats.every(text), `${lane?.id || "lane"}.templateBeats requires at least three beats`);
    require(Number.isInteger(lane?.targetWords?.minimum) && Number.isInteger(lane?.targetWords?.maximum) && lane.targetWords.minimum > 0 && lane.targetWords.maximum >= lane.targetWords.minimum, `${lane?.id || "lane"}.targetWords is invalid`);
    require(Array.isArray(lane?.sourceRules) && lane.sourceRules.length > 0 && lane.sourceRules.every(text), `${lane?.id || "lane"}.sourceRules are required`);
    require(Array.isArray(lane?.negativeExemplarIds), `${lane?.id || "lane"}.negativeExemplarIds must be an array`);
    for (const id of lane?.negativeExemplarIds || []) require(negativeIds.has(id), `${lane?.id || "lane"} references unknown negative exemplar ${id}`);
    if (lane?.templateCandidate) checkTemplateCandidate(root, lane.templateCandidate, `${lane.id}.templateCandidate`, errors);
    if (lane?.id === "daily_news") {
      require(Array.isArray(lane?.storyModes) && lane.storyModes.length > 0 && new Set(lane.storyModes).size === lane.storyModes.length, "daily_news.storyModes must be a non-empty unique array");
      for (const [mode, binding] of Object.entries(lane?.approvedTemplatesByMode || {})) checkAcceptedTemplate(root, binding, { laneId: lane.id, slot: mode }, errors);
    } else if (lane?.approvedTemplate) {
      checkAcceptedTemplate(root, lane.approvedTemplate, { laneId: lane.id, slot: "DEFAULT" }, errors);
    }
    if (lane?.status === "READY_AUTONOMOUS_PRODUCTION") {
      if (lane.id === "daily_news") {
        const modes = lane.storyModes || [];
        const suppliedTemplates = lane.approvedTemplatesByMode && typeof lane.approvedTemplatesByMode === "object" && !Array.isArray(lane.approvedTemplatesByMode)
          ? Object.keys(lane.approvedTemplatesByMode)
          : [];
        require(JSON.stringify([...suppliedTemplates].sort()) === JSON.stringify([...modes].sort()), "daily_news.approvedTemplatesByMode must bind exactly one Ali-accepted template for every enabled story mode");
        const supplied = lane.positiveExemplarsByMode && typeof lane.positiveExemplarsByMode === "object" && !Array.isArray(lane.positiveExemplarsByMode)
          ? Object.keys(lane.positiveExemplarsByMode)
          : [];
        require(JSON.stringify([...supplied].sort()) === JSON.stringify([...modes].sort()), "daily_news.positiveExemplarsByMode must bind exactly one accepted exemplar for every enabled story mode");
        for (const mode of modes) checkAcceptedExemplar(root, lane.positiveExemplarsByMode?.[mode], { laneId: lane.id, slot: mode }, errors);
      } else {
        checkAcceptedExemplar(root, lane.positiveExemplar, { laneId: lane.id, slot: "DEFAULT" }, errors);
      }
    }
    if (lane?.id !== "daily_news" && !lane?.positiveExemplar) require(lane?.status !== "READY_AUTONOMOUS_PRODUCTION", `${lane?.id || "lane"} cannot be autonomous without a positive exemplar`);
  }
  for (const id of REQUIRED) require(seen.has(id), `required NewsStand lane is missing: ${id}`);
  for (const id of seen) require(REQUIRED.has(id), `unregistered NewsStand lane was added without a routing decision: ${id}`);
  return { errors, laneCount: seen.size, ready: (registry?.lanes || []).filter((lane) => lane.status === "READY_AUTONOMOUS_PRODUCTION").map((lane) => lane.id) };
}

function main() {
  const file = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : REGISTRY_PATH;
  const laneFlag = process.argv.indexOf("--lane");
  const laneId = laneFlag >= 0 ? process.argv[laneFlag + 1] : null;
  let registry;
  try { registry = JSON.parse(fs.readFileSync(path.resolve(ROOT, file), "utf8")); }
  catch (error) { console.error(`NEWSSTAND FEATURE LANES FAIL\n- ${error.message}`); process.exit(1); }
  const result = inspectNewsstandFeatureLanes(registry);
  if (result.errors.length) {
    console.error("NEWSSTAND FEATURE LANES FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  if (laneId) {
    const lane = registry.lanes.find((item) => item.id === laneId);
    if (!lane) { console.error(`NEWSSTAND FEATURE LANE BLOCKED: unknown lane ${laneId}`); process.exit(1); }
    if (lane.status !== "READY_AUTONOMOUS_PRODUCTION") { console.error(`NEWSSTAND FEATURE LANE BLOCKED: ${laneId} status=${lane.status}`); process.exit(1); }
  }
  console.log(`NEWSSTAND FEATURE LANES PASS lanes=${result.laneCount} autonomous_ready=${result.ready.length ? result.ready.join(",") : "none"}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
