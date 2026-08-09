#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectVisualMediaProducerContract } from "./check-visual-media-producer-contract.mjs";

const SHA = /^[a-f0-9]{64}$/;
const BASE = ["semanticAlignment","instructionalClarity","analogyMapping","visualHierarchyAndCognitiveLoad","styleAndLocationFit","characterAndTownIdentity","anatomyAndPhysics","textIntegrity","periodWardrobeAndProps","objectPurpose","renderedSizeLegibility"];
const MOTION = ["motionMeaning","temporalAlignment","crossFrameContinuity","motionClassAndLoopTruth"];
function hash(file) { return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"); }
function resolve(root, value) { return path.isAbsolute(value || "") ? value : path.join(root, value || ""); }
function bind(root, value, label, errors) {
  if (!value?.path || !SHA.test(value?.sha256 || "")) { errors.push(`${label} needs path and SHA-256`); return false; }
  const file = resolve(root, value.path);
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { errors.push(`${label} file is missing`); return false; }
  if (hash(file) !== value.sha256) { errors.push(`${label} SHA-256 is stale`); return false; }
  return true;
}
function meaningful(value) { return typeof value === "string" && value.trim().length >= 8; }

export function inspectVisualMediaReview(record, { root = process.cwd() } = {}) {
  const errors = [];
  if (record?.schemaVersion !== "1.0.0") errors.push("schemaVersion must be 1.0.0");
  if (!record?.candidateId || !new Set(["PRODUCER_SELF_REVIEW","INDEPENDENT_VISUAL_ADMISSION"]).has(record?.stage)) errors.push("candidateId and valid stage are required");
  if (!new Set(["PASS","HOLD","REJECT"]).has(record?.verdict)) errors.push("verdict is invalid");
  if (!record?.reviewer?.principalId || !record?.reviewer?.reviewedAt || record?.reviewer?.artifactFirst !== true || record?.reviewer?.viewedAtIntendedSize !== true) errors.push("reviewer identity, time and artifact-first real-size review are required");
  if (!Number.isFinite(Date.parse(record?.reviewer?.reviewedAt || ""))) errors.push("reviewer.reviewedAt must be a valid timestamp");
  if (!bind(root, record?.producerContract, "producerContract", errors)) return { errors };
  let contract;
  try { contract = JSON.parse(fs.readFileSync(resolve(root, record.producerContract.path), "utf8")); } catch { errors.push("producerContract is invalid JSON"); return { errors }; }
  const producer = inspectVisualMediaProducerContract(contract, { root });
  if (producer.errors.length) errors.push(`producerContract is invalid (${producer.errors.join("|")})`);
  if (record.candidateId !== contract.candidateId) errors.push("candidateId does not match producer contract");
  if (record?.artifact?.kind !== contract.mediaClass || !bind(root, record?.artifact, "artifact", errors)) errors.push("artifact identity/kind is invalid");
  if (record?.companion?.path !== contract.companion?.path || record?.companion?.sha256 !== contract.companion?.sha256 || record?.companion?.locator !== contract.companion?.locator) errors.push("companion binding differs from producer contract");
  if (!bind(root, record?.renderedEvidence, "renderedEvidence", errors)) errors.push("rendered evidence is required");
  if (["ANIMATION","IDENT","LOOP"].includes(contract.mediaClass)) {
    if (!Array.isArray(record.representativeFrames) || record.representativeFrames.length < 3) errors.push("animation review needs at least start/middle/end decoded frames");
    for (const [index, frame] of (record.representativeFrames || []).entries()) if (!bind(root, frame, `representativeFrames[${index}]`, errors) || !Number.isFinite(frame.timeSeconds)) errors.push(`representativeFrames[${index}] lacks exact time/binding`);
    if (!record.occurrence || record.occurrence.companionSha256 !== contract.companion.sha256 || !Number.isFinite(record.occurrence.startSeconds) || !Number.isFinite(record.occurrence.endSeconds) || record.occurrence.endSeconds <= record.occurrence.startSeconds) errors.push("animation review needs exact final occurrence and narration clock");
  }
  const required = [...BASE, ...(["ANIMATION","IDENT","LOOP"].includes(contract.mediaClass) ? MOTION : [])];
  const outcomes = new Map((record.outcomes || []).map(item => [item.id, item]));
  for (const id of required) {
    const outcome = outcomes.get(id);
    if (!outcome || !new Set(["PASS","HOLD","FAIL"]).has(outcome.result) || !meaningful(outcome.observation) || !meaningful(outcome.artifactLocator)) errors.push(`outcome ${id} needs result, pixel observation and locator`);
  }
  if (["EXPLAIN", "COMPARE", "DEMONSTRATE"].includes(contract.intent?.visualJob)) {
    const observation = record.learnerObservation || {};
    if (!meaningful(observation.prompt) || !meaningful(observation.observedResponse) || !meaningful(observation.expectedEvidence) || !bind(root, observation.evidence, "learnerObservation.evidence", errors)) errors.push("teaching visual requires checksum-bound unfamiliar-viewer observation");
  }
  if (record.verdict === "PASS" && ([...outcomes.values()].some(item => item.result !== "PASS") || (record.visibleDefects || []).length)) errors.push("PASS cannot contain held/failed outcomes or visible defects");
  if (record.stage === "PRODUCER_SELF_REVIEW" && record.reviewer.principalId !== contract.maker?.principalId) errors.push("producer self-review principal must match maker");
  if (record.stage === "INDEPENDENT_VISUAL_ADMISSION") {
    if (!bind(root, record.producerReview, "producer review", errors)) errors.push("independent admission requires the exact producer self-review");
    else {
      let selfReview;
      try { selfReview = JSON.parse(fs.readFileSync(resolve(root, record.producerReview.path), "utf8")); } catch { selfReview = null; }
      const selfResult = selfReview ? inspectVisualMediaReview(selfReview, { root }) : { errors:["invalid JSON"] };
      if (selfResult.errors.length || selfReview?.stage !== "PRODUCER_SELF_REVIEW" || selfReview?.verdict !== "PASS") errors.push("bound producer self-review is not a valid PASS");
      if (selfReview?.artifact?.path !== record.artifact?.path || selfReview?.artifact?.sha256 !== record.artifact?.sha256 || selfReview?.producerContract?.sha256 !== record.producerContract?.sha256) errors.push("producer and independent reviews do not bind the same artifact/contract");
      if (Date.parse(selfReview?.reviewer?.reviewedAt || "") >= Date.parse(record.reviewer.reviewedAt || "")) errors.push("producer self-review must precede independent review");
    }
    if (record.reviewer.principalId === contract.maker?.principalId || record.reviewer.independentFromMaker !== true) errors.push("independent visual reviewer must be role-distinct from maker");
    if (!bind(root, record.reviewer.calibration, "reviewer calibration", errors)) errors.push("reviewer calibration is required");
    else {
      let calibration;
      try { calibration = JSON.parse(fs.readFileSync(resolve(root, record.reviewer.calibration.path), "utf8")); } catch { calibration = null; }
      if (!calibration || calibration.reviewerPrincipalId !== record.reviewer.principalId || calibration.registrySha256 !== contract.registry.sha256 || !Number.isFinite(Date.parse(calibration.completedAt || "")) || Date.parse(calibration.completedAt) >= Date.parse(record.reviewer.reviewedAt)) errors.push("calibration reviewer/registry/time binding is invalid");
      const rejected = new Set((calibration?.results || []).filter(item => item.verdict === "REJECT").map(item => item.negativeId));
      const registry = JSON.parse(fs.readFileSync(resolve(root, contract.registry.path), "utf8"));
      for (const negative of registry.negativeExemplars || []) if ((negative.appliesTo || []).includes(contract.mediaClass) && !rejected.has(negative.id)) errors.push(`reviewer calibration did not reject ${negative.id}`);
    }
  }
  const disposition = record.learningDisposition || {};
  if (record.verdict === "PASS" && disposition.kind !== "NO_NEW_DEFECT") errors.push("PASS must record NO_NEW_DEFECT");
  if (record.verdict !== "PASS" && !new Set(["EVIDENCE_GAP","CANDIDATE_REPAIR_ONLY","REUSABLE_DEFECT_RECORDED"]).has(disposition.kind)) errors.push("HOLD/REJECT must disposition the learning result");
  if (disposition.kind === "REUSABLE_DEFECT_RECORDED" && (!bind(root, disposition.learningRecord, "learning record", errors) || disposition.ownerStatus !== "PENDING_OWNER_ADMISSION")) errors.push("reusable defect needs bound pending owner-admission record");
  const lineage = record.lineage || {};
  if (!new Set(["FIRST","SUCCESSOR"]).has(lineage.kind)) errors.push("lineage.kind must be FIRST or SUCCESSOR");
  if (lineage.kind === "FIRST" && !meaningful(lineage.noComparableReason)) errors.push("first candidate requires noComparableReason");
  if (lineage.kind === "SUCCESSOR") {
    if (!lineage.predecessorCandidateId || !Number.isFinite(lineage.priorComparable?.reviewIssues) || !Number.isFinite(lineage.priorComparable?.reviewCycles)) errors.push("successor requires predecessor and prior comparable metrics");
    if (!Number.isFinite(record.ratchet?.reviewIssues) || !Number.isFinite(record.ratchet?.reviewCycles) || record.ratchet.reviewIssues >= lineage.priorComparable.reviewIssues || record.ratchet.reviewCycles >= lineage.priorComparable.reviewCycles) errors.push("successor review issues and cycles must be strictly lower");
  }
  return { errors };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const file = process.argv[2];
  if (!file) { console.error("VISUAL MEDIA ADMISSION USAGE FAIL\n- provide a JSON record"); process.exit(2); }
  let record;
  try { record = JSON.parse(fs.readFileSync(file, "utf8")); } catch (error) { console.error(`VISUAL MEDIA ADMISSION FAIL\n- ${error.message}`); process.exit(1); }
  const result = inspectVisualMediaReview(record);
  if (result.errors.length) { console.error("VISUAL MEDIA ADMISSION FAIL"); result.errors.forEach(error => console.error(`- ${error}`)); process.exit(1); }
  console.log(`VISUAL MEDIA ${record.stage} INTEGRITY MATCH verdict=${record.verdict} quality_authority=human_record_only`);
}
