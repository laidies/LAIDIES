#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const HASH = /^[a-f0-9]{64}$/;
const nonempty = value => typeof value === "string" && value.trim().length > 0;
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const containedFile = (root, relative) => {
  if (!nonempty(relative)) return null;
  const target = path.resolve(root, relative);
  if (!target.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(target)) return null;
  try {
    const realRoot = fs.realpathSync(root);
    const realTarget = fs.realpathSync(target);
    return realTarget.startsWith(`${realRoot}${path.sep}`) ? target : null;
  } catch { return null; }
};

function boundJson(root, binding, label, errors) {
  if (!binding || !nonempty(binding.path) || !HASH.test(binding.sha256 || "")) { errors.push(`${label}: exact repository path and SHA-256 are required`); return null; }
  const target = containedFile(root, binding.path);
  if (!target) { errors.push(`${label}: file is missing or outside repository (including symlink escapes)`); return null; }
  let bytes;
  try { bytes = fs.readFileSync(target); }
  catch (error) { errors.push(`${label}: cannot read bound file: ${error.code || error.message}`); return null; }
  const actual = sha256(bytes);
  if (actual !== binding.sha256) { errors.push(`${label}: SHA-256 mismatch expected=${binding.sha256} actual=${actual}`); return null; }
  try { return { value: JSON.parse(bytes.toString("utf8")), bytes, target }; }
  catch (error) { errors.push(`${label}: invalid JSON: ${error.message}`); return null; }
}

function validDate(value) { return nonempty(value) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && !Number.isNaN(Date.parse(value)); }

function expectedEntry(decision) {
  const pending = decision._pending;
  return {
    id: decision.exemplarId,
    incidentId: pending.incidentId,
    introducedAt: decision.admittedAt,
    appliesTo: decision.appliesTo,
    path: decision._review.artifact.path,
    sha256: decision._review.artifact.sha256,
    authority: "LEARNING_OWNER_ADMITTED",
    requiredVerdict: "REJECT",
    failureFamilies: pending.failureFamilies,
    reuse: "CALIBRATION_ONLY_NEVER_COPY",
    requiredProducerRepair: pending.requiredProducerRepair,
    learningAdmission: { path: decision._decisionPath, sha256: decision._decisionSha256 },
    pendingRecordSha256: decision.pendingBinding.sha256
  };
}

function exact(a, b) { return isDeepStrictEqual(a, b); }

export function loadOwnerAdmission(file, { root = ROOT } = {}) {
  const target = containedFile(root, path.relative(root, path.resolve(file)));
  if (!target) throw new Error("owner decision must be inside the repository and cannot use a symlink escape");
  const bytes = fs.readFileSync(target);
  const decision = JSON.parse(bytes.toString("utf8"));
  decision._decisionPath = path.relative(root, target);
  decision._decisionSha256 = sha256(bytes);
  return decision;
}

function verifyDecisionProvenance(decision, root, errors) {
  if (!nonempty(decision?._decisionPath) || !HASH.test(decision?._decisionSha256 || "")) { errors.push("owner decision provenance path and SHA-256 are required"); return; }
  const target = containedFile(root, decision._decisionPath);
  if (!target) { errors.push("owner decision is missing, outside repository, or a symlink escape"); return; }
  try {
    const bytes = fs.readFileSync(target);
    const actual = sha256(bytes);
    if (actual !== decision._decisionSha256) { errors.push(`owner decision SHA-256 mismatch expected=${decision._decisionSha256} actual=${actual}`); return; }
    const disk = JSON.parse(bytes.toString("utf8"));
    const supplied = { ...decision }; delete supplied._decisionPath; delete supplied._decisionSha256;
    if (!exact(disk, supplied)) errors.push("owner decision object differs from the exact bound on-disk bytes");
  } catch (error) { errors.push(`owner decision cannot be revalidated: ${error.message}`); }
}

function inspectAdmissionRecord(decision, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(decision?.schemaVersion === "laidies-content-quality-owner-admission.v1", "schemaVersion mismatch");
  require(decision?.decision === "ADMIT_REUSABLE_DEFECT", "decision must be ADMIT_REUSABLE_DEFECT");
  require(nonempty(decision?.owner?.principalId), "owner.principalId is required");
  require(decision?.owner?.role === "learning-system-concepts-director", "owner.role must be learning-system-concepts-director");
  require(validDate(decision?.admittedAt), "admittedAt must be an ISO date-time");
  require(nonempty(decision?.rationale), "rationale is required");
  require(HASH.test(decision?.registryBeforeSha256 || ""), "registryBeforeSha256 is required");
  require(nonempty(decision?.exemplarId), "exemplarId is required");
  require(Array.isArray(decision?.appliesTo) && decision.appliesTo.length > 0 && decision.appliesTo.every(nonempty), "appliesTo requires nonempty entries");
  if (Array.isArray(decision?.appliesTo)) require(new Set(decision.appliesTo).size === decision.appliesTo.length, "appliesTo entries must be unique");
  verifyDecisionProvenance(decision, root, errors);

  const pendingBound = boundJson(root, decision?.pendingBinding, "pendingBinding", errors);
  const reviewBound = boundJson(root, decision?.reviewBinding, "reviewBinding", errors);
  let registry; let registryBytes;
  try {
    const registryPath = containedFile(root, REGISTRY);
    if (!registryPath) throw new Error("registry is outside repository or a symlink escape");
    registryBytes = fs.readFileSync(registryPath); registry = JSON.parse(registryBytes.toString("utf8"));
  }
  catch (error) { errors.push(`exemplar registry unavailable: ${error.message}`); }
  if (!pendingBound || !reviewBound || !registry) return { errors, status: null };
  const pending = pendingBound.value;
  const review = reviewBound.value;
  if (!pending || typeof pending !== "object" || Array.isArray(pending)) return { errors: [...errors, "pending record must be an object"], status: null };
  if (!review || typeof review !== "object" || Array.isArray(review)) return { errors: [...errors, "rejection record must be an object"], status: null };
  if (!registry || typeof registry !== "object" || Array.isArray(registry)) return { errors: [...errors, "registry must be an object"], status: null };
  require(pending.schemaVersion === "laidies-content-quality-learning-record.v1", "pending record schemaVersion mismatch");
  for (const field of ["incidentId", "candidateId", "artifactSha256", "requiredProducerRepair"]) require(nonempty(pending[field]), `pending record ${field} is required`);
  require(HASH.test(pending.artifactSha256 || ""), "pending record artifactSha256 is invalid");
  require(Array.isArray(pending.failureFamilies) && pending.failureFamilies.length > 0 && pending.failureFamilies.every(nonempty), "pending record failureFamilies are required");
  if (Array.isArray(pending.failureFamilies)) require(new Set(pending.failureFamilies).size === pending.failureFamilies.length, "pending record failureFamilies must be unique");
  require(pending.status === "PENDING_OWNER_ADMISSION", "pending record must remain PENDING_OWNER_ADMISSION");
  const receipt = pending.reviewReceipt || {};
  require(receipt && typeof receipt === "object" && !Array.isArray(receipt), "pending reviewReceipt must be an object");
  require(receipt.stage === "INDEPENDENT_REJECTION", "pending reviewReceipt.stage must be INDEPENDENT_REJECTION");
  for (const field of ["candidateId", "artifactSha256", "reviewerPrincipalId", "reviewedAt"]) require(nonempty(receipt[field]), `pending reviewReceipt.${field} is required`);
  require(validDate(receipt.reviewedAt), "pending reviewReceipt.reviewedAt must be an ISO date-time");
  require(Object.keys(receipt).every(key => ["candidateId", "artifactSha256", "reviewerPrincipalId", "reviewedAt", "stage"].includes(key)), "pending reviewReceipt may contain identity facts only; final review paths or hashes are forbidden");

  require(review.schemaVersion === "laidies-content-quality-rejection.v1", "rejection record schemaVersion mismatch");
  require(review.verdict === "REJECT", "rejection record verdict must be REJECT");
  require(nonempty(review.candidateId) && nonempty(review.maker), "rejection record candidateId and maker are required");
  require(nonempty(review.reviewer?.principalId) && nonempty(review.reviewer?.role) && review.reviewer?.artifactFirst === true, "rejection reviewer requires principalId, role and artifactFirst=true");
  require(review.reviewer?.principalId !== review.maker, "rejection reviewer cannot be maker");
  require(validDate(review.reviewedAt), "rejection reviewedAt must be an ISO date-time");
  require(Array.isArray(review.limitations) && review.limitations.length > 0 && review.limitations.every(nonempty), "rejection limitations must be nonempty");
  require(nonempty(review.artifact?.path) && HASH.test(review.artifact?.sha256 || ""), "rejection artifact path and SHA-256 are required");
  const artifactPath = containedFile(root, review.artifact?.path);
  let artifactText = null;
  if (!artifactPath) errors.push("rejection artifact is missing, outside repository, or a symlink escape");
  else { const bytes = fs.readFileSync(artifactPath); const actual = sha256(bytes); if (actual !== review.artifact.sha256) errors.push(`rejection artifact SHA-256 mismatch expected=${review.artifact.sha256} actual=${actual}`); else artifactText = bytes.toString("utf8"); }
  require(Array.isArray(review.failures) && review.failures.length > 0, "rejection failures are required");
  const reviewFamilies = [];
  for (const [index, failure] of (Array.isArray(review.failures) ? review.failures : []).entries()) {
    require(nonempty(failure?.family) && nonempty(failure?.excerpt) && nonempty(failure?.explanation), `rejection failures[${index}] requires family, excerpt and explanation`);
    if (nonempty(failure?.family)) reviewFamilies.push(failure.family);
    if (artifactText && nonempty(failure?.excerpt) && !artifactText.includes(failure.excerpt)) errors.push(`rejection failures[${index}] excerpt does not occur in exact artifact`);
  }
  require(new Set(reviewFamilies).size === reviewFamilies.length, "rejection failure families must be unique");
  require(exact([...reviewFamilies].sort(), [...(Array.isArray(pending.failureFamilies) ? pending.failureFamilies : [])].sort()), "pending failureFamilies must exactly match rejection failure families");
  require(review.candidateId === pending.candidateId && review.artifact?.sha256 === pending.artifactSha256, "pending candidate/artifact must match rejection");
  require(receipt.candidateId === review.candidateId && receipt.artifactSha256 === review.artifact.sha256 && receipt.reviewerPrincipalId === review.reviewer.principalId && receipt.reviewedAt === review.reviewedAt, "pending reviewReceipt identity facts must exactly match rejection");
  require(review.pendingBinding && decision.pendingBinding && review.pendingBinding.path === decision.pendingBinding.path && review.pendingBinding.sha256 === decision.pendingBinding.sha256, "rejection pendingBinding must exactly match owner decision pendingBinding");
  require(decision.owner?.principalId !== review.maker, "owner cannot be maker");

  const decisionPath = decision._decisionPath;
  const decisionSha = decision._decisionSha256;
  const hydrated = { ...decision, _pending: pending, _review: review, _decisionPath: decisionPath, _decisionSha256: decisionSha };
  const entry = expectedEntry(hydrated);
  require(registry.schemaVersion === "laidies-content-quality-exemplars.v1", "registry schemaVersion mismatch");
  require(Array.isArray(registry.negativeExemplars), "registry negativeExemplars must be an array");
  require(Array.isArray(registry.positiveExemplars), "registry positiveExemplars must be an array");
  if (!Array.isArray(registry.negativeExemplars) || !Array.isArray(registry.positiveExemplars)) return { errors, status: null };
  const negatives = Array.isArray(registry.negativeExemplars) ? registry.negativeExemplars : [];
  const same = negatives.find(item => item?.id === decision.exemplarId);
  if (same && exact(same, entry)) return { errors, status: "already admitted", entry, registry, registryBytes };
  require(!same, `exemplarId already exists with different content: ${decision.exemplarId}`);
  require(!negatives.some(item => item?.incidentId === pending.incidentId), `incidentId already exists: ${pending.incidentId}`);
  require(!negatives.some(item => item?.pendingRecordSha256 === decision.pendingBinding.sha256), "pending record has already been admitted");
  require(!negatives.some(item => item?.sha256 === review.artifact.sha256), "exact rejected artifact is already registered");
  require(sha256(registryBytes) === decision.registryBeforeSha256, `registry is stale expected=${decision.registryBeforeSha256} actual=${sha256(registryBytes)}`);
  const next = structuredClone(registry); next.updatedAt = decision.admittedAt; next.negativeExemplars = [...negatives, entry];
  return { errors, status: errors.length ? null : "preview", entry, registry, registryBytes, pendingIncident: pending.incidentId, beforeSha256: sha256(registryBytes), afterSha256: sha256(Buffer.from(`${JSON.stringify(next, null, 2)}\n`, "utf8")) };
}

export function inspectAdmission(decision, options = {}) {
  try { return inspectAdmissionRecord(decision, options); }
  catch (error) { return { errors: [`invalid admission input: ${error.message}`], status: null }; }
}

export function inspectRegisteredLearning(entry, { root = ROOT } = {}) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) return { errors: ["registered learning entry must be an object"], status: null, requiredProducerRepair: null };
  const legacy = entry?.authority !== "LEARNING_OWNER_ADMITTED" && entry?.learningAdmission === undefined && entry?.requiredProducerRepair === undefined;
  if (legacy) return { errors: [], status: "not_applicable", requiredProducerRepair: null };
  const errors = [];
  if (entry.authority !== "LEARNING_OWNER_ADMITTED") errors.push("registered learning authority must be LEARNING_OWNER_ADMITTED");
  if (!nonempty(entry.requiredProducerRepair)) errors.push("registered learning requiredProducerRepair is required");
  const admission = boundJson(root, entry.learningAdmission, "registered learning admission", errors);
  if (!admission) return { errors, status: null, requiredProducerRepair: null };
  const decision = { ...admission.value, _decisionPath: entry.learningAdmission.path, _decisionSha256: entry.learningAdmission.sha256 };
  const inspected = inspectAdmission(decision, { root });
  errors.push(...inspected.errors);
  if (inspected.status !== "already admitted") errors.push("registered learning admission does not resolve to an already-admitted entry");
  if (inspected.entry && !exact(inspected.entry, entry)) errors.push("registered learning entry differs from its exact owner-admission result");
  return { errors, status: errors.length ? null : "already admitted", requiredProducerRepair: errors.length ? null : entry.requiredProducerRepair };
}

export function applyAdmission(decision, { root = ROOT, dryRun = true } = {}) {
  const inspected = inspectAdmission(decision, { root });
  if (inspected.errors.length || inspected.status === "already admitted" || dryRun) return { ...inspected, status: inspected.status === "preview" ? "preview" : inspected.status, qualityAuthority: "none" };
  const registryPath = containedFile(root, REGISTRY); if (!registryPath) return { ...inspected, errors: [...inspected.errors, "registry is outside repository or a symlink escape"], status: null, qualityAuthority: "none" }; const lockPath = `${registryPath}.admission.lock`;
  let lock; const lockToken = `${process.pid}:${crypto.randomUUID()}\n`;
  try { lock = fs.openSync(lockPath, "wx"); fs.writeFileSync(lock, lockToken); }
  catch (error) { return { ...inspected, errors: [...inspected.errors, `admission lock unavailable: ${error.code || error.message}`], status: null, qualityAuthority: "none" }; }
  try {
    const current = inspectAdmission(decision, { root });
    if (current.errors.length || current.status === "already admitted") return { ...current, qualityAuthority: "none" };
    const next = structuredClone(current.registry); next.updatedAt = decision.admittedAt; next.negativeExemplars = [...current.registry.negativeExemplars, current.entry];
    const bytes = Buffer.from(`${JSON.stringify(next, null, 2)}\n`, "utf8"); const temp = `${registryPath}.admission-${process.pid}-${crypto.randomUUID()}.tmp`;
    try { fs.writeFileSync(temp, bytes, { mode: fs.statSync(registryPath).mode }); fs.renameSync(temp, registryPath); }
    catch (error) { try { if (fs.existsSync(temp)) fs.unlinkSync(temp); } catch {} return { ...current, errors: [...current.errors, `registry atomic write failed: ${error.message}`], status: null, qualityAuthority: "none" }; }
    return { ...current, status: "applied", beforeSha256: sha256(current.registryBytes), afterSha256: sha256(bytes), qualityAuthority: "none" };
  } finally {
    try { fs.closeSync(lock); }
    finally {
      // A lock path can be replaced by another process after ours is closed. Remove it only
      // when its token still proves it is the lock this invocation created.
      try { if (fs.readFileSync(lockPath, "utf8") === lockToken) fs.unlinkSync(lockPath); } catch {}
    }
  }
}

function main() {
  const [file, flag] = process.argv.slice(2);
  if (!file || (flag && flag !== "--apply")) { console.error("usage: node scripts/admit-content-quality-learning.mjs <owner-decision.json> [--apply]"); process.exit(2); }
  let decision;
  try { decision = loadOwnerAdmission(file); }
  catch (error) { console.error(`CONTENT QUALITY LEARNING ADMISSION FAIL\n- ${error.message}`); process.exit(1); }
  const result = applyAdmission(decision, { dryRun: flag !== "--apply" });
  if (result.errors.length) { console.error("CONTENT QUALITY LEARNING ADMISSION FAIL"); for (const error of result.errors) console.error(`- ${error}`); process.exit(1); }
  console.log(`CONTENT QUALITY LEARNING ADMISSION ${result.status.toUpperCase()} qualityAuthority=none pendingIncident=${result.pendingIncident || decision.pendingBinding.path} exemplarId=${decision.exemplarId} beforeSha256=${result.beforeSha256 || sha256(result.registryBytes)} afterSha256=${result.afterSha256 || sha256(result.registryBytes)} requiredProducerRepair=${result.entry.requiredProducerRepair}`);
  console.log("Integrity bindings were checked; owner judgment and principal identities are attestations, not authenticated by this script.");
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
