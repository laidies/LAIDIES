#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectNewsstandProducerProof } from "./check-newsstand-producer-proof.mjs";
import { inspectNewsstandServiceExemplar } from "./check-newsstand-service-exemplar.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_PATH = "operations/product-stewards/newsstand/NEWSSTAND-FEATURE-TEMPLATE-CANDIDATES.json";
const sha256 = body => crypto.createHash("sha256").update(body).digest("hex");
const text = value => typeof value === "string" && value.trim().length > 0;
const exactSet = values => [...new Set(values)].sort();

function bind(root, binding, label, errors) {
  if (!binding || !text(binding.path) || !/^[a-f0-9]{64}$/.test(binding.sha256 || "")) {
    errors.push(`${label} requires path and SHA-256`);
    return null;
  }
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute)) {
    errors.push(`${label} is unavailable`);
    return null;
  }
  if (sha256(fs.readFileSync(absolute)) !== binding.sha256) errors.push(`${label} SHA-256 mismatch`);
  return absolute;
}

function wordCount(body) {
  return String(body || "").trim().split(/\s+/).filter(Boolean).length;
}

function acceptedRecord(root, template, errors) {
  const slot = `${template.laneId}.${template.storyMode}`;
  const absolute = bind(root, template.acceptanceRecord, `${slot}.acceptanceRecord`, errors);
  if (!absolute) return;
  let record;
  try { record = JSON.parse(fs.readFileSync(absolute, "utf8")); }
  catch (error) { errors.push(`${slot}.acceptanceRecord invalid JSON: ${error.message}`); return; }
  const require = (condition, message) => { if (!condition) errors.push(`${slot}.acceptanceRecord ${message}`); };
  require(record?.schemaVersion === "laidies-newsstand-positive-exemplar-acceptance.v1", "schemaVersion mismatch");
  require(record?.laneId === template.laneId, "laneId mismatch");
  require(record?.exemplarSlot === template.storyMode, "exemplarSlot mismatch");
  require(record?.candidate?.path === template.candidateExample?.path && record?.candidate?.sha256 === template.candidateExample?.sha256, "candidate binding mismatch");
  require(record?.aliDecision?.verdict === "ACCEPT" && text(record?.aliDecision?.exactWords), "requires Ali ACCEPT and exact words");
  require(!Number.isNaN(Date.parse(record?.aliDecision?.decidedAt || "")), "requires valid Ali decision time");
  require(record?.authorityBoundary === "EXEMPLAR_ONLY_NO_PUBLICATION_AUTHORITY", "authority boundary mismatch");
}

export function inspectNewsstandTemplateCandidates(registry, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(registry?.schemaVersion === "laidies-newsstand-feature-template-candidates.v1", "schemaVersion mismatch");
  require(registry?.defaultDeny === true, "templates must default deny");
  for (const field of ["fullPublishShapedExampleRequired", "templateMayGuideManualPrivateProductionBeforeAcceptance", "templateCannotAuthorizeAutonomousDraftingBeforeAliAcceptance", "templateCannotAuthorizePublication", "acceptedExampleMustRemainChecksumBound", "dailyStoryModesRemainSeparate", "rejectedExamplesRemainCalibrationOnly"]) {
    require(registry?.policy?.[field] === true, `policy.${field} must be true`);
  }

  const lanesPath = bind(root, registry?.featureLaneRegistry, "featureLaneRegistry", errors);
  bind(root, registry?.productionStandard, "productionStandard", errors);
  if (!lanesPath) return { errors, totalSlots: 0, presentSlots: [], candidateSlots: [], rejectedSlots: [], acceptedSlots: [] };
  const lanes = JSON.parse(fs.readFileSync(lanesPath, "utf8"));
  const laneMap = new Map((lanes.lanes || []).map(lane => [lane.id, lane]));
  const allSlots = [];
  for (const lane of lanes.lanes || []) {
    if (lane.id === "daily_news") for (const mode of lane.storyModes || []) allSlots.push(`${lane.id}.${mode}`);
    else allSlots.push(`${lane.id}.DEFAULT`);
  }
  require(allSlots.length === 18, `expected 18 feature example slots, found ${allSlots.length}`);

  const templates = Array.isArray(registry?.templates) ? registry.templates : [];
  require(Array.isArray(registry?.templates), "templates must be an array");
  const seen = new Set();
  const accepted = [];
  const candidates = [];
  const rejected = [];
  for (const template of templates) {
    const slot = `${template?.laneId}.${template?.storyMode}`;
    require(text(template?.templateId), `${slot}.templateId is required`);
    require(!seen.has(slot), `duplicate template slot ${slot}`);
    seen.add(slot);
    const lane = laneMap.get(template?.laneId);
    require(Boolean(lane), `${slot} references unknown lane`);
    if (!lane) continue;
    require(allSlots.includes(slot), `${slot} is not a registered feature slot`);
    require(template.templateId === `${slot}.v1`, `${slot}.templateId mismatch`);
    require(template.readerJob === lane.readerJob, `${slot}.readerJob must match the feature lane`);
    require(template.publishesIn === lane.publishesIn, `${slot}.publishesIn must match the feature lane`);
    require(template.cadence === lane.cadence, `${slot}.cadence must match the feature lane`);
    require(JSON.stringify(template.outputSequence) === JSON.stringify(lane.templateBeats), `${slot}.outputSequence must match the feature lane beats`);
    require(JSON.stringify(template.wordRange) === JSON.stringify(lane.targetWords), `${slot}.wordRange must match the feature lane`);
    const isRejected = template.status === "REJECTED_CALIBRATION_ONLY";
    if (!isRejected) require(JSON.stringify(exactSet(template.negativeExemplarIds || [])) === JSON.stringify(exactSet(lane.negativeExemplarIds || [])), `${slot}.negativeExemplarIds must match the feature lane`);
    else require(Array.isArray(template.negativeExemplarIds), `${slot}.negativeExemplarIds must preserve its historical calibration set`);
    for (const field of ["useWhen", "doNotUseWhen", "requiredInputs", "sourceAndFreshnessRules", "producerSelfCheck"]) {
      require(Array.isArray(template?.[field]) && template[field].length >= 2 && template[field].every(text), `${slot}.${field} requires at least two usable entries`);
    }
    const examplePath = bind(root, template.candidateExample, `${slot}.candidateExample`, errors);
    const proofPath = bind(root, template.producerProof, `${slot}.producerProof`, errors);
    bind(root, template.independentReview, `${slot}.independentReview`, errors);
    if (isRejected) {
      rejected.push(slot);
      bind(root, template.rejectionRecord, `${slot}.rejectionRecord`, errors);
      require(template.acceptanceRecord === null, `${slot} rejected example cannot carry an acceptance record`);
      require(template.autonomousDraftingAuthority === false, `${slot} rejected example cannot authorize drafting`);
      require(template.publicAuthority === false, `${slot} rejected example cannot carry public authority`);
      continue;
    }
    if (examplePath) {
      let exampleText = fs.readFileSync(examplePath, "utf8");
      if (examplePath.endsWith(".json")) {
        try { exampleText = JSON.parse(exampleText).body; }
        catch (error) { errors.push(`${slot}.candidateExample invalid JSON: ${error.message}`); }
      }
      const words = wordCount(exampleText);
      require(words >= lane.targetWords.minimum && words <= lane.targetWords.maximum, `${slot}.candidateExample words=${words} outside ${lane.targetWords.minimum}-${lane.targetWords.maximum}`);
    }
    if (proofPath) {
      try {
        const proof = JSON.parse(fs.readFileSync(proofPath, "utf8"));
        const result = template.laneId === "daily_news"
          ? inspectNewsstandProducerProof(proof, { root })
          : inspectNewsstandServiceExemplar(proof, { root });
        for (const error of result.errors) errors.push(`${slot}.producerProof ${error}`);
      } catch (error) { errors.push(`${slot}.producerProof invalid JSON: ${error.message}`); }
    }
    require(template.publicAuthority === false, `${slot} cannot carry public authority`);
    if (template.status === "ACCEPTED_TEMPLATE") {
      accepted.push(slot);
      require(template.autonomousDraftingAuthority === true, `${slot} accepted template must enable autonomous drafting authority`);
      acceptedRecord(root, template, errors);
    } else {
      candidates.push(slot);
      require(template.status === "CANDIDATE_PENDING_ALI_ACCEPTANCE", `${slot}.status is invalid`);
      require(template.autonomousDraftingAuthority === false, `${slot} candidate cannot authorize autonomous drafting`);
      require(template.acceptanceRecord === null, `${slot} candidate must not carry an acceptance record`);
    }
  }

  const missing = exactSet(registry?.missingTemplateSlots || []);
  const present = exactSet([...seen]);
  require(JSON.stringify(exactSet([...present, ...missing])) === JSON.stringify(exactSet(allSlots)), "present plus missing template slots must cover exactly all 17 slots");
  require(!present.some(slot => missing.includes(slot)), "present and missing template slots overlap");
  require(JSON.stringify(exactSet(registry?.acceptedTemplateSlots || [])) === JSON.stringify(exactSet(accepted)), "acceptedTemplateSlots does not match accepted templates");
  const launch = exactSet(registry?.currentDailyLaunchCandidateSlots || []);
  require(JSON.stringify(launch) === JSON.stringify(exactSet(candidates)), "current Daily launch set must contain exactly the live candidate examples and no rejected example");
  const expectedStatus = `PARTIAL_${present.length}_OF_${allSlots.length}_EXAMPLES_${rejected.length}_REJECTED_${candidates.length}_CANDIDATE_${accepted.length}_ACCEPTED`;
  require(registry?.status === expectedStatus, `status must be ${expectedStatus}`);
  require(registry?.authority === "Private template and example candidates only. No autonomous drafting, canonical story or issue write, deployment or public authority.", "authority boundary mismatch");
  return { errors, totalSlots: allSlots.length, presentSlots: present, candidateSlots: candidates, rejectedSlots: rejected, acceptedSlots: accepted };
}

function main() {
  const file = process.argv[2] || DEFAULT_PATH;
  let registry;
  try { registry = JSON.parse(fs.readFileSync(path.resolve(ROOT, file), "utf8")); }
  catch (error) { console.error(`NEWSSTAND FEATURE TEMPLATES FAIL\n- ${error.message}`); process.exit(1); }
  const result = inspectNewsstandTemplateCandidates(registry);
  if (result.errors.length) {
    console.error("NEWSSTAND FEATURE TEMPLATES FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`NEWSSTAND FEATURE EXAMPLES PASS present=${result.presentSlots.length}/${result.totalSlots} candidates=${result.candidateSlots.length} rejected=${result.rejectedSlots.length} accepted=${result.acceptedSlots.length}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
