#!/usr/bin/env node

// Imports a real independent service-bank judgment into checker-shaped receipts.
// It does not judge prose, edit the bank, or turn a HOLD into a PASS.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectProseQualityReview } from "./check-prose-quality-admission.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const POLICY = "operations/product-stewards/newsstand/recurring-service-sampling-policy.json";
const DISCLOSURE = "No observed human-comprehension evidence is claimed for this entry; batch sampling is pending.";
const HASH = /^[a-f0-9]{64}$/;
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const clone = value => JSON.parse(JSON.stringify(value));
const fail = message => { throw new Error(`SERVICE_BANK_JUDGMENT_IMPORT_FAIL: ${message}`); };

function args(argv) {
  const values = new Map();
  for (let index = 2; index < argv.length; index += 1) {
    const key = argv[index];
    if (key === "--check") { values.set(key, true); continue; }
    if (!key.startsWith("--") || index + 1 >= argv.length) fail("usage: --input REPORT --context METADATA --reviewer-principal PRINCIPAL [--output-dir DIR | --check] [--errors-output FILE]");
    values.set(key, argv[++index]);
  }
  return values;
}

function readJson(relativeOrAbsolute, label) {
  const absolute = path.resolve(ROOT, relativeOrAbsolute);
  if (!absolute.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absolute)) fail(`${label} is missing or outside the repository`);
  const raw = fs.readFileSync(absolute);
  try { return { value: JSON.parse(raw), binding: { path: path.relative(ROOT, absolute), sha256: sha256(raw) } }; }
  catch (error) { fail(`${label} is not valid JSON: ${error.message}`); }
}

function metadataFor(context, candidateId) {
  const entries = context?.entries || context;
  const value = Array.isArray(entries) ? entries.find(item => item?.candidateId === candidateId) : entries?.[candidateId];
  const merged = { ...(context?.defaults || {}), ...(value || {}) };
  if (!value && !context?.defaults) return { error: `metadata missing for ${candidateId}; supply ratchet, lineage, and learningDisposition without changing the source judgment` };
  const missing = ["ratchet", "lineage", "learningDisposition"].filter(field => !merged[field]);
  return missing.length ? { error: `metadata missing for ${candidateId}: ${missing.join(", ")}` } : { value: merged };
}

function samplingOverride(policy, candidate, reportBinding) {
  const entry = (policy.entries || []).find(item => item?.id === candidate.candidateId);
  if (!entry || entry.contentClass !== candidate.contentClass || !policy.allowedContentClasses?.includes(candidate.contentClass)) return null;
  const queue = (policy.entries || []).map(item => item.id);
  return {
    policy: { path: POLICY, sha256: sha256(fs.readFileSync(path.join(ROOT, POLICY))) },
    policyId: policy.policyId,
    serviceType: entry.type,
    sampleStatus: "PENDING_BATCH_SAMPLE",
    batchId: `independent-service-bank-${reportBinding.sha256.slice(0, 12)}`,
    sampleQueue: queue,
    correctionFeedbackStatus: policy.sampling?.correctionFeedback
  };
}

function receiptFor({ report, reportBinding, artifact, candidate, context, policy, reviewerPrincipal, maker }) {
  const metadata = metadataFor(context, candidate.candidateId);
  if (metadata.error) return { candidateId: candidate.candidateId, errors: [metadata.error] };
  if (artifact.contentClass !== candidate.contentClass || !HASH.test(artifact.reviewedContentSha256 || "")) {
    return { candidateId: candidate.candidateId, errors: ["artifact binding contentClass or reviewedContentSha256 is invalid"] };
  }
  const limitations = clone(candidate.limitations || []);
  const override = samplingOverride(policy, candidate, reportBinding);
  if (override && !limitations.includes(DISCLOSURE)) limitations.push(DISCLOSURE);
  const receipt = {
    schemaVersion: "laidies-prose-quality-review.v1",
    candidateId: candidate.candidateId,
    stage: "INDEPENDENT_SEMANTIC_ADMISSION",
    contentClass: candidate.contentClass,
    surface: "NEWSSTAND_RECURRING_SERVICE_COLUMNS",
    maker,
    reviewer: {
      id: report.model,
      principalId: reviewerPrincipal,
      role: "Independent Claude service-bank semantic judge",
      modelFamily: report.modelFamily,
      actualModels: clone(report.actualModels || []),
      independentFromMaker: true,
      artifactFirst: true,
      reportBinding
    },
    reviewMode: "EXACT_PROSE_IN_FULL",
    reviewedAt: report.judgedAt,
    artifact: { reviewText: clone(artifact.reviewText), manifest: clone(artifact.manifest) },
    calibration: {
      ...(policy.calibration?.mode === "RECURRING_SERVICE_ARTIFACT_REJECTION_V1" ? { mode: policy.calibration.mode } : {}),
      registrySha256: sha256(fs.readFileSync(path.join(ROOT, REGISTRY))),
      reviewerPrincipalId: reviewerPrincipal,
      reviewedAt: report.judgedAt,
      negatives: clone(report.judgment.calibration?.negatives || []),
      positive: clone(report.judgment.calibration?.positive || {})
    },
    reverseBrief: clone(candidate.reverseBrief),
    outcomes: clone(candidate.outcomes),
    failureFamilies: clone(candidate.failureFamilies),
    factualReview: clone(candidate.factualReview),
    ratchet: clone(metadata.value.ratchet),
    lineage: clone(metadata.value.lineage),
    learningDisposition: clone(metadata.value.learningDisposition),
    verdict: candidate.verdict,
    limitations,
    ...(override ? { samplingOverride: override } : {})
  };
  const result = inspectProseQualityReview(receipt, { root: ROOT });
  return { candidateId: candidate.candidateId, receipt, errors: result.errors };
}

function main() {
  const options = args(process.argv);
  if (!options.get("--input") || !options.get("--context") || !options.get("--reviewer-principal") || (!options.get("--check") && !options.get("--output-dir"))) {
    fail("usage: --input REPORT --context METADATA --reviewer-principal PRINCIPAL [--output-dir DIR | --check] [--errors-output FILE]");
  }
  const { value: report, binding: reportBinding } = readJson(options.get("--input"), "input report");
  const { value: context } = readJson(options.get("--context"), "metadata context");
  const { value: policy } = readJson(POLICY, "NewsStand sampling policy");
  if (report?.schemaVersion !== "laidies-service-bank-independent-judgment.v1" || report?.modelFamily !== "claude" ||
      !Array.isArray(report?.artifactBindings) || !Array.isArray(report?.judgment?.entries) || !report?.judgedAt) {
    fail("input is not a complete real Claude independent service-bank judgment");
  }
  const artifacts = new Map(report.artifactBindings.map(item => [item?.id, item]));
  const requestedIds = options.get("--ids") ? options.get("--ids").split(",").map(id => id.trim()).filter(Boolean) : null;
  if (requestedIds && (!requestedIds.length || requestedIds.length !== new Set(requestedIds).size)) fail("--ids must be a comma-separated list of unique candidate IDs");
  const entriesById = new Map(report.judgment.entries.map(candidate => [candidate?.candidateId, candidate]));
  if (requestedIds?.some(id => !entriesById.has(id))) fail(`--ids includes unknown candidate ID(s): ${requestedIds.filter(id => !entriesById.has(id)).join(", ")}`);
  const selectedEntries = requestedIds ? requestedIds.map(id => entriesById.get(id)) : report.judgment.entries;
  const results = selectedEntries.map(candidate => receiptFor({ report, reportBinding, artifact: artifacts.get(candidate?.candidateId) || {}, candidate, context, policy, reviewerPrincipal: options.get("--reviewer-principal"), maker: options.get("--maker") || "/root" }));
  const failures = results.filter(result => result.errors.length);
  if (options.get("--errors-output")) {
    const destination = path.resolve(ROOT, options.get("--errors-output"));
    if (!destination.startsWith(`${ROOT}${path.sep}`)) fail("errors-output must be inside the repository");
    if (fs.existsSync(destination)) fail(`refusing to overwrite existing error report ${path.relative(ROOT, destination)}`);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, `${JSON.stringify({ schemaVersion: "laidies-service-bank-import-errors.v1", sourceReport: reportBinding, candidates: results.map(result => ({ candidateId: result.candidateId, verdict: result.receipt?.verdict || null, errors: result.errors })) }, null, 2)}\n`);
  }
  if (options.get("--check") || failures.length) {
    for (const result of results) console.log(JSON.stringify({ candidateId: result.candidateId, verdict: result.receipt?.verdict || null, errors: result.errors }));
    if (failures.length) process.exitCode = 1;
    return;
  }
  const output = path.resolve(ROOT, options.get("--output-dir"));
  if (!output.startsWith(`${ROOT}${path.sep}`)) fail("output-dir must be inside the repository");
  fs.mkdirSync(output, { recursive: true });
  for (const result of results) {
    const destination = path.join(output, `${result.candidateId}.json`);
    if (fs.existsSync(destination)) fail(`refusing to overwrite existing receipt ${path.relative(ROOT, destination)}`);
    fs.writeFileSync(destination, `${JSON.stringify(result.receipt, null, 2)}\n`);
  }
  console.log(`SERVICE BANK JUDGMENT IMPORT PASS receipts=${results.length} report_sha256=${reportBinding.sha256}`);
}

main();
