#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = "operations/product-stewards/newsstand/NEWSSTAND-FEATURE-LANE-REGISTRY.json";
const EXEMPLARS_PATH = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const REQUIRED = new Set(["the_breaking", "daily_news", "the_weekly", "the_big_picture", "straight_talk", "dear_miss_jeeves", "paige_tip", "career_work_life", "promptoscope", "mme_claio", "song_of_the_day", "did_you_know", "town_note", "curiosity", "fiction"]);
const sha256 = (body) => crypto.createHash("sha256").update(body).digest("hex");
const text = (value) => typeof value === "string" && value.trim().length > 0;

function checkBinding(root, binding, label, errors) {
  if (!binding || !text(binding.path) || !/^[a-f0-9]{64}$/.test(binding.sha256 || "")) { errors.push(`${label} requires path and SHA-256`); return; }
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute)) { errors.push(`${label} is unavailable`); return; }
  if (sha256(fs.readFileSync(absolute)) !== binding.sha256) errors.push(`${label} SHA-256 mismatch`);
}

export function inspectNewsstandFeatureLanes(registry, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(registry?.schemaVersion === "laidies-newsstand-feature-lanes.v1", "schemaVersion mismatch");
  require(registry?.defaultDenyDrafting === true, "feature drafting must default deny");
  for (const field of ["fullPublishShapedTextRequired", "aliAcceptanceRequired", "sourceAndFreshnessBindingRequired", "rejectedContrastRequired", "producerSelfCheckRequired", "dailyNewsRequiresOnePerEnabledStoryMode", "samplersAndOutlinesAreIneligible"]) {
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
    if (lane?.status === "READY_AUTONOMOUS_PRODUCTION") checkBinding(root, lane.positiveExemplar, `${lane.id}.positiveExemplar`, errors);
    if (!lane?.positiveExemplar) require(lane?.status !== "READY_AUTONOMOUS_PRODUCTION", `${lane?.id || "lane"} cannot be autonomous without a positive exemplar`);
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
