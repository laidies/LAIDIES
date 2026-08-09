#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SHA = /^[a-f0-9]{64}$/;
const CLASSES = new Set(["STILL", "ANIMATION", "ANIMATION_SOURCE", "IDENT", "LOOP"]);
const JOBS = new Set(["ESTABLISH", "EXPLAIN", "COMPARE", "DEMONSTRATE", "REINFORCE", "COMPLICATE", "TRANSITION", "BREATHING"]);
const RENDERING_METHODS = new Set(["GENERATED_RASTER", "APPROVED_RASTER_ASSET", "HAND_DRAWN_RASTER", "DETERMINISTIC_VECTOR_ASSET"]);

function hash(file) { return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"); }
function resolve(root, value) { return path.isAbsolute(value || "") ? value : path.join(root, value || ""); }
function binding(root, value, label, errors) {
  if (!value?.path || !SHA.test(value?.sha256 || "")) { errors.push(`${label} needs path and SHA-256`); return false; }
  const file = resolve(root, value.path);
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { errors.push(`${label} file is missing`); return false; }
  if (hash(file) !== value.sha256) { errors.push(`${label} SHA-256 is stale`); return false; }
  return true;
}
function meaningful(value) { return typeof value === "string" && value.trim().length >= 8; }

export function inspectVisualMediaProducerContract(record, { root = process.cwd() } = {}) {
  const errors = [];
  if (record?.schemaVersion !== "1.0.0") errors.push("schemaVersion must be 1.0.0");
  if (!record?.candidateId || !record?.surface) errors.push("candidateId and surface are required");
  if (!CLASSES.has(record?.mediaClass)) errors.push("mediaClass is invalid");
  if (record?.status !== "READY_TO_RENDER") errors.push("status must be READY_TO_RENDER");
  if (!RENDERING_METHODS.has(record?.renderingMethod)) errors.push("renderingMethod must be a governed image/diagram asset; CSS/HTML drawings are forbidden");

  if (!binding(root, record?.registry, "registry", errors)) return { errors };
  let registry;
  try { registry = JSON.parse(fs.readFileSync(resolve(root, record.registry.path), "utf8")); }
  catch { errors.push("registry is not valid JSON"); return { errors }; }
  if (registry.schemaVersion !== "1.0.0") errors.push("registry schemaVersion must be 1.0.0");
  const positive = (registry.positiveExemplars || []).find(item => item.id === record.registry.positiveExemplarId);
  if (!positive) errors.push("positive exemplar is not registered");
  else {
    if (!(positive.useFor || []).includes(record.mediaClass)) errors.push("positive exemplar is not approved for mediaClass");
    binding(root, positive, "positive exemplar", errors);
    if (!meaningful(record.registry.patternApplied) || !meaningful(record.registry.limitObserved)) errors.push("positive exemplar patternApplied and limitObserved are required");
  }

  const intent = record?.intent || {};
  for (const field of ["placement", "scenePurpose", "viewerQuestion", "viewerUnderstanding", "proseInsufficientReason"]) if (!meaningful(intent[field])) errors.push(`intent.${field} is required`);
  if (!JOBS.has(intent.visualJob)) errors.push("intent.visualJob is invalid");

  if (!binding(root, record?.companion, "companion", errors)) errors.push("exact accompanying text, narration, caption or silent-purpose record must be bound");
  if (!new Set(["TEXT", "NARRATION", "CAPTION", "SILENT_PURPOSE"]).has(record?.companion?.kind)) errors.push("companion.kind is invalid");
  if (!meaningful(record?.companion?.locator) || !meaningful(record?.companion?.exactTextOrSilentPurpose)) errors.push("companion locator and exactTextOrSilentPurpose are required");
  else if (record.companion.kind !== "SILENT_PURPOSE") {
    const source = fs.existsSync(resolve(root, record.companion.path)) ? fs.readFileSync(resolve(root, record.companion.path), "utf8") : "";
    if (!source.includes(record.companion.exactTextOrSilentPurpose)) errors.push("companion exact text is not present in bound file");
  }

  const truth = record?.truth || {};
  for (const field of ["destinationStyleAuthority", "location", "era", "wardrobeAndAccessories", "physicalReality"] ) {
    const item = truth[field];
    if (!item || (!item.notApplicableReason && !binding(root, item, `truth.${field}`, errors))) errors.push(`truth.${field} must bind authority or state a reason`);
    if (!item?.rule && !item?.notApplicableReason) errors.push(`truth.${field}.rule is required`);
  }
  if (!Array.isArray(truth.requiredVisualFacts) || !truth.requiredVisualFacts.length || truth.requiredVisualFacts.some(item => !meaningful(item))) errors.push("truth.requiredVisualFacts needs specific facts");
  if (!Array.isArray(truth.prohibitedContradictions) || !truth.prohibitedContradictions.length || truth.prohibitedContradictions.some(item => !meaningful(item))) errors.push("truth.prohibitedContradictions needs specific failures");

  if (!Array.isArray(record.references) || !record.references.length) errors.push("references are required");
  for (const [index, ref] of (record.references || []).entries()) {
    if (!ref.role || !binding(root, ref, `references[${index}]`, errors)) errors.push(`references[${index}] is incomplete`);
  }
  for (const [index, character] of (record.characters || []).entries()) {
    if (!character.name || !character.roleInScene || !binding(root, character.identityReference, `characters[${index}].identityReference`, errors)) errors.push(`characters[${index}] lacks identity/scene role`);
    if (character.realHistorical === true && !binding(root, character.likenessReference, `characters[${index}].likenessReference`, errors)) errors.push(`characters[${index}] historical likeness is unbound`);
  }
  if (!Array.isArray(record.objectMap) || !record.objectMap.length) errors.push("objectMap is required");
  for (const [index, object] of (record.objectMap || []).entries()) {
    if (!object.id || !meaningful(object.visualJob) || !meaningful(object.relationToCompanion) || !new Set(["REQUIRED", "OPTIONAL", "PROHIBITED"]).has(object.disposition)) errors.push(`objectMap[${index}] is incomplete`);
  }
  if (["EXPLAIN", "COMPARE", "DEMONSTRATE"].includes(intent.visualJob)) {
    const map = record.instructionalMap || {};
    if (!Array.isArray(map.familiarElements) || !map.familiarElements.length || map.familiarElements.some(item => !meaningful(item))) errors.push("instructionalMap.familiarElements is required for teaching visuals");
    if (!Array.isArray(map.technicalElements) || !map.technicalElements.length || map.technicalElements.some(item => !meaningful(item))) errors.push("instructionalMap.technicalElements is required for teaching visuals");
    if (!Array.isArray(map.explicitMappings) || !map.explicitMappings.length || map.explicitMappings.some(item => !meaningful(item))) errors.push("instructionalMap.explicitMappings is required for teaching visuals");
    if (!meaningful(map.faithfulMechanism) || !meaningful(map.whySimpler) || !meaningful(map.unfamiliarViewerSuccess)) errors.push("instructionalMap must prove a faithful mechanism, a simpler first encounter and unfamiliar-viewer success");
  }

  const textPlan = record?.textPlan || {};
  if (!new Set(["DETERMINISTIC_LAYER", "PURPOSE_BUILT_IN_ART", "NO_VISIBLE_TEXT"]).has(textPlan.mode)) errors.push("textPlan.mode is invalid");
  if (textPlan.unplannedGeneratedTextForbidden !== true) errors.push("unplanned generated text must be forbidden");
  if (textPlan.mode !== "NO_VISIBLE_TEXT") {
    if (!binding(root, textPlan.approvedCopy, "textPlan.approvedCopy", errors)) errors.push("visible text needs approved copy binding");
    if (!Array.isArray(textPlan.exactStrings) || !textPlan.exactStrings.length) errors.push("visible text needs exactStrings");
  }

  if (["ANIMATION", "IDENT", "LOOP"].includes(record.mediaClass)) {
    const motion = record.motionPlan || {};
    if (!new Set(["LOOP", "TRANSITION", "ONE_SHOT", "AMBIENT"]).has(motion.classification)) errors.push("motionPlan.classification is required");
    if (!meaningful(motion.initialState) || !meaningful(motion.observedChange) || !meaningful(motion.endState) || !meaningful(motion.semanticJob)) errors.push("motion plan must state the visible event and semantic job");
    if (motion.classification === "LOOP" && motion.zeroNetTravelRequired !== true) errors.push("a loop must require zero net travel");
    if (motion.classification !== "LOOP" && motion.zeroNetTravelRequired === true) errors.push("directional/non-loop motion cannot be classified as a loop");
  }

  const dispositions = new Map((record.knownDefects || []).map(item => [item.id, item]));
  for (const negative of registry.negativeExemplars || []) {
    if (!(negative.appliesTo || []).includes(record.mediaClass)) continue;
    const item = dispositions.get(negative.id);
    if (!item || item.disposition !== "PREVENTED" || !meaningful(item.preventionEvidence)) errors.push(`known defect ${negative.id} was not prevented with evidence`);
  }
  if (record?.makerPreflight?.knownDefectsRemaining !== 0 || record?.makerPreflight?.objectiveDefectsRemaining !== 0 || record?.makerPreflight?.representativeProofFirst !== true) errors.push("makerPreflight must clear known/objective defects and require representative proof");
  return { errors };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const file = process.argv[2];
  if (!file) { console.error("VISUAL MEDIA PRODUCER CONTRACT USAGE FAIL\n- provide a JSON record"); process.exit(2); }
  let record;
  try { record = JSON.parse(fs.readFileSync(file, "utf8")); } catch (error) { console.error(`VISUAL MEDIA PRODUCER CONTRACT FAIL\n- ${error.message}`); process.exit(1); }
  const result = inspectVisualMediaProducerContract(record);
  if (result.errors.length) { console.error("VISUAL MEDIA PRODUCER CONTRACT FAIL"); result.errors.forEach(error => console.error(`- ${error}`)); process.exit(1); }
  console.log("VISUAL MEDIA PRODUCER CONTRACT INTEGRITY MATCH");
  console.log("status=READY_TO_RENDER quality_authority=none");
}
