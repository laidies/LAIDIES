#!/usr/bin/env node

// Deterministically promotes only the READY service desks in one admitted
// complete-Daily v2 package. The CLI is dry-run unless --write is explicit.
// This script cannot compose an issue, accept prose, deploy or publish.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectCompleteDailyReview } from "./check-newsstand-complete-daily-review.mjs";
import { inspectNewsstandServiceExemplar } from "./check-newsstand-service-exemplar.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STORE_PATH = path.join(ROOT, "content/daily-edition-columns.json");
const CANDIDATE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/candidates");
const EVIDENCE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/evidence");
const HASH = /^[a-f0-9]{64}$/;
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const SUPPORTED_TYPES = new Map([
  ["paige_tip", { lane: "paige_tip", classification: "sourced_service", candidateSchema: "laidies-newsstand-service-exemplar.v1" }],
  ["promptoscope", { lane: "promptoscope", classification: "sourced_service", candidateSchema: "laidies-newsstand-service-exemplar.v1" }],
  ["career_life", { lane: "career_work_life", classification: "sourced_service", candidateSchema: "laidies-newsstand-service-exemplar.v1" }],
  ["mme_claio", { lane: "mme_claio", classification: "authored_reflection", candidateSchema: "laidies-newsstand-service-exemplar.v1" }],
  ["song", { lane: "song_of_the_day", classification: "audio", candidateSchema: "laidies-newsstand-daily-desk-candidate.v1" }],
  ["did_you_know", { lane: "did_you_know", classification: "sourced_service", candidateSchema: "laidies-newsstand-daily-desk-candidate.v1" }],
  ["town_note", { lane: "town_note", classification: "town_notice", candidateSchema: "laidies-newsstand-daily-desk-candidate.v1" }],
  ["curiosity", { lane: "curiosity", classification: "sourced_service", candidateSchema: "laidies-newsstand-daily-desk-candidate.v1" }],
  ["fiction", { lane: "fiction", classification: "fiction", candidateSchema: "laidies-newsstand-daily-desk-candidate.v1" }]
]);
const REVIEW_KEYS = ["accuracy", "editorial", "voice", "format", "owner", "safety"];
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = value => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const fail = message => { throw new Error(`DAILY_SERVICE_V2_PROMOTION_REJECT: ${message}`); };
const exactKeys = (value, keys, label) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be an object`);
  if (Object.keys(value).sort().join("\n") !== [...keys].sort().join("\n")) fail(`${label} keys do not match the contract`);
};
const parse = (raw, label) => {
  try { return JSON.parse(raw); }
  catch (error) { fail(`${label} is not valid JSON (${error.message})`); }
};
const checkedBinding = (binding, readBoundFile, label) => {
  exactKeys(binding, ["path", "sha256"], label);
  if (typeof binding.path !== "string" || !binding.path || !HASH.test(binding.sha256 || "")) fail(`${label} is invalid`);
  const raw = readBoundFile(binding.path);
  if (typeof raw !== "string" || sha256(raw) !== binding.sha256) fail(`${label} bytes changed`);
  return raw;
};

function validatePackage(pkg, packageRaw, decision, readBoundFile, packageInspector) {
  if (decision.packageSha256 !== sha256(packageRaw)) fail("decision package checksum mismatch");
  const result = packageInspector(pkg);
  if (result?.errors?.length) fail(`complete-Daily package failed: ${result.errors.join(" | ")}`);
  if (pkg.schemaVersion !== "laidies-newsstand-complete-daily-review-package.v2" ||
      pkg.status !== "PRIVATE_COMPLETE_DAILY_REVIEW_CANDIDATE" ||
      pkg.publicEligibility !== "INELIGIBLE_PENDING_ALI_APPROVAL" ||
      pkg.releaseAuthority?.canonicalWrite !== false || pkg.releaseAuthority?.deploy !== false || pkg.releaseAuthority?.public !== false) {
    fail("package is not an exact private complete-Daily v2 candidate");
  }
  if (pkg.editionDate !== decision.editionDate) fail("decision date does not match the package");
  const ready = (pkg.desks || []).filter(desk => desk.state === "ready");
  if (!ready.length) fail("package has no READY service desks to promote");
  const types = ready.map(desk => desk.type);
  if (new Set(types).size !== types.length) fail("package contains duplicate READY desk types");
  for (const type of types) if (!SUPPORTED_TYPES.has(type)) fail(`READY desk ${type} has no admitted v2 promotion contract`);
  const packageServiceReview = pkg.evidence?.serviceReview;
  if (decision.serviceReview?.path !== packageServiceReview?.path || decision.serviceReview?.sha256 !== packageServiceReview?.sha256) {
    fail("decision does not bind the package service review");
  }
  checkedBinding(decision.serviceReview, readBoundFile, "decision.serviceReview");
  return ready;
}

function validateAliApproval(approval, pkg, decision) {
  if (approval.schemaVersion !== "laidies-ali-artifact-verdict.v1" || approval.decision !== "APPROVE" ||
      approval.artifactKind !== "COMPLETE_DAILY_NEWSPAPER" || approval.editionDate !== pkg.editionDate ||
      approval.packageSha256 !== decision.packageSha256 || approval.authority !== "ALI_DIRECT_REVIEW") {
    fail("Ali approval does not bind the exact complete-Daily v2 package");
  }
}

function validateCandidate(desk, record, pkg, readBoundFile, serviceInspector) {
  const contract = SUPPORTED_TYPES.get(desk.type);
  const raw = checkedBinding(desk.sourceCandidate, readBoundFile, `desk ${desk.type}.sourceCandidate`);
  const candidate = parse(raw, `desk ${desk.type} candidate`);
  if (contract.candidateSchema === "laidies-newsstand-service-exemplar.v1") {
    const result = serviceInspector(candidate);
    if (result?.errors?.length) fail(`desk ${desk.type} candidate failed: ${result.errors.join(" | ")}`);
  }
  if (candidate.schemaVersion !== contract.candidateSchema || candidate.status !== "PRIVATE_REVIEW_CANDIDATE" ||
      candidate.laneId !== contract.lane || candidate.editionDate !== pkg.editionDate ||
      candidate.headline !== desk.headline || candidate.body !== desk.summary ||
      (candidate.destination || null) !== (desk.destination || null) ||
      candidate.storage?.recordId !== desk.recordId ||
      candidate.storage?.publicEligibility !== "INELIGIBLE_PENDING_ALI_ACCEPTANCE") {
    fail(`desk ${desk.type} candidate does not match the reviewed package`);
  }
  if (contract.candidateSchema === "laidies-newsstand-daily-desk-candidate.v1") {
    if (candidate.classification !== contract.classification) fail(`desk ${desk.type} candidate classification is invalid`);
    if (desk.type === "fiction" && candidate.disclosure !== "SUNNYVAiLE FICTION") fail("fiction desk lacks its exact reader-facing fiction disclosure");
    if (desk.type === "song" && candidate.rightsAndAvailabilityVerified !== true) fail("song desk lacks current rights and availability verification");
  }

  exactKeys(record, ["id", "editionDate", "type", "classification", "status", "headline", "summary", "sourcePath", "sourceId", "destination", "owner", "freshness", "reviewEvidence", "publicEligibility"], `record ${desk.type}`);
  if (record.id !== desk.recordId || record.editionDate !== pkg.editionDate || record.type !== desk.type ||
      record.classification !== contract.classification || record.status !== "APPROVED" || record.publicEligibility !== "ELIGIBLE" ||
      record.headline !== desk.headline || record.summary !== desk.summary ||
      (record.destination || null) !== (desk.destination || null) || record.owner !== candidate.owner ||
      typeof record.sourceId !== "string" || !record.sourceId) {
    fail(`record ${desk.type} does not preserve the reviewed service desk`);
  }

  const sources = Array.isArray(candidate.sourceEvidence) ? candidate.sourceEvidence : [];
  const source = sources.find(item => item.path === record.sourcePath);
  if (!source || !HASH.test(source.sha256 || "")) fail(`record ${desk.type} source is not bound by the candidate`);
  if (sha256(readBoundFile(source.path)) !== source.sha256) fail(`record ${desk.type} source bytes changed`);

  exactKeys(record.freshness, ["lastCheckedAt", "expiresAt", "recheckTriggers"], `record ${desk.type}.freshness`);
  const checkedAt = String(candidate.freshness?.checkedAt || "").slice(0, 10);
  if (!DATE.test(record.freshness.lastCheckedAt || "") || record.freshness.lastCheckedAt !== checkedAt ||
      !DATE.test(record.freshness.expiresAt || "") || record.freshness.expiresAt <= record.freshness.lastCheckedAt ||
      canonicalJson(record.freshness.recheckTriggers) !== canonicalJson(candidate.freshness?.recheckTriggers)) {
    fail(`record ${desk.type} freshness contract is invalid`);
  }

  exactKeys(record.reviewEvidence, REVIEW_KEYS, `record ${desk.type}.reviewEvidence`);
  const allowedEvidence = new Set([pkg.evidence.serviceReview.path, ...sources.map(item => item.path)]);
  for (const key of REVIEW_KEYS) {
    if (typeof record.reviewEvidence[key] !== "string" || !allowedEvidence.has(record.reviewEvidence[key])) {
      fail(`record ${desk.type} ${key} review is not bound to reviewed evidence`);
    }
    readBoundFile(record.reviewEvidence[key]);
  }
}

export function promoteDailyServiceRecordsV2({
  store,
  packageRaw,
  decisionRaw,
  maker,
  readBoundFile,
  now = new Date().toISOString(),
  packageInspector = pkg => inspectCompleteDailyReview(pkg),
  serviceInspector = candidate => inspectNewsstandServiceExemplar(candidate)
}) {
  exactKeys(store, ["schemaVersion", "owner", "updatedAt", "emptyStates", "records"], "store");
  if (store.schemaVersion !== "1.0.0" || store.owner !== "newsstand-daily" || !Array.isArray(store.records)) fail("canonical service store is invalid");
  const pkg = parse(packageRaw, "package");
  const decision = parse(decisionRaw, "decision");
  exactKeys(decision, ["schemaVersion", "decision", "editionDate", "packageSha256", "reviewedAt", "reviewedBy", "reviewerRole", "aliApproval", "serviceReview", "records"], "decision");
  if (decision.schemaVersion !== "daily-service-admission-v2" || decision.decision !== "ACCEPT_LOCAL_CANONICAL_WRITE" ||
      !ISO.test(decision.reviewedAt || "") || Date.parse(decision.reviewedAt) > Date.parse(now) + 300000 ||
      Date.parse(decision.reviewedAt) < Date.parse(`${decision.editionDate}T00:00:00Z`) ||
      !/independent/i.test(decision.reviewedBy || "") || !/independent/i.test(decision.reviewerRole || "") ||
      !maker || maker === decision.reviewedBy) {
    fail("independent admission identity or time is invalid");
  }
  const ready = validatePackage(pkg, packageRaw, decision, readBoundFile, packageInspector);
  const approval = parse(checkedBinding(decision.aliApproval, readBoundFile, "decision.aliApproval"), "Ali approval");
  validateAliApproval(approval, pkg, decision);

  if (!Array.isArray(decision.records) || decision.records.length !== ready.length) {
    fail("decision records must match every and only READY service desk");
  }
  const recordByType = new Map(decision.records.map(record => [record?.type, record]));
  if (recordByType.size !== ready.length) fail("decision service record types are duplicated");
  for (const desk of ready) {
    const record = recordByType.get(desk.type);
    if (!record) fail(`decision is missing ${desk.type}`);
    validateCandidate(desk, record, pkg, readBoundFile, serviceInspector);
  }

  const nextRecords = [...store.records];
  let changed = false;
  for (const record of decision.records) {
    const sameIdentity = nextRecords.filter(item => item?.id === record.id);
    const sameSlot = nextRecords.filter(item => item?.editionDate === record.editionDate && item?.type === record.type);
    if (sameIdentity.length > 1 || sameSlot.length > 1) fail(`canonical service store contains duplicate ${record.type} entries`);
    if (sameIdentity.length === 1) {
      if (canonicalJson(sameIdentity[0]) !== canonicalJson(record) || (sameSlot[0] && sameSlot[0] !== sameIdentity[0])) fail(`conflicting canonical service identity ${record.id}`);
      continue;
    }
    if (sameSlot.length) fail(`canonical service slot already exists for ${record.editionDate} ${record.type}`);
    nextRecords.push(record);
    changed = true;
  }
  nextRecords.sort((a, b) => a.editionDate.localeCompare(b.editionDate) || a.type.localeCompare(b.type) || a.id.localeCompare(b.id));
  const nextStore = changed ? { ...store, updatedAt: decision.reviewedAt.slice(0, 10), records: nextRecords } : store;
  return { store: nextStore, changed, records: decision.records, packageSha256: decision.packageSha256 };
}

function argument(name, args) { const index = args.indexOf(name); return index === -1 ? null : args[index + 1]; }

function main() {
  const args = process.argv.slice(2);
  const packagePath = path.resolve(argument("--package", args) || "");
  const decisionPath = path.resolve(argument("--decision", args) || "");
  const maker = argument("--maker", args);
  const write = args.includes("--write");
  if (!packagePath.startsWith(`${CANDIDATE_ROOT}${path.sep}`) || !fs.existsSync(packagePath)) fail("package must exist inside NewsStand candidates");
  if (!decisionPath.startsWith(`${EVIDENCE_ROOT}${path.sep}`) || !fs.existsSync(decisionPath)) fail("decision must exist inside NewsStand evidence");
  const readBoundFile = relative => {
    if (typeof relative !== "string" || !relative || relative.startsWith("/") || relative.includes("\\") || path.posix.normalize(relative) !== relative) fail(`unsafe bound record ${relative || ""}`);
    const absolute = path.join(ROOT, relative);
    if (!absolute.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) fail(`bound record unavailable: ${relative}`);
    return fs.readFileSync(absolute, "utf8");
  };
  const result = promoteDailyServiceRecordsV2({
    store: parse(fs.readFileSync(STORE_PATH, "utf8"), "canonical store"),
    packageRaw: fs.readFileSync(packagePath, "utf8"),
    decisionRaw: fs.readFileSync(decisionPath, "utf8"),
    maker,
    readBoundFile
  });
  if (write && result.changed) {
    const temporary = `${STORE_PATH}.tmp-${process.pid}`;
    fs.writeFileSync(temporary, `${JSON.stringify(result.store, null, 2)}\n`, { flag: "wx" });
    fs.renameSync(temporary, STORE_PATH);
  }
  const mode = write ? result.changed ? "LOCAL CANONICAL WRITE" : "LOCAL CANONICAL IDEMPOTENT" : "DRY RUN";
  console.log(`DAILY SERVICE V2 ${mode} PASS date=${result.records[0].editionDate} records=${result.records.length} package_sha256=${result.packageSha256} canonical_write=${write && result.changed} deploy=false`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
