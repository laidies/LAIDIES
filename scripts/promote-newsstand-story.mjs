#!/usr/bin/env node

// Deterministic new-story promoter for the canonical NewsStand dataset.
// The CLI defaults to dry-run. A public-source mutation requires --write plus
// one exact candidate, evidence manifest and independent admission decision.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STORY_PATH = path.join(ROOT, "content/newsstand-stories.js");
const CANDIDATE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/candidates");
const EVIDENCE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/evidence");
const HASH = /^[a-f0-9]{64}$/;
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = (value) => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const reject = (message) => { throw new Error(`NEWSSTAND_STORY_PROMOTION_REJECT: ${message}`); };
const exactKeys = (value, keys, label) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) reject(`${label} must be an object`);
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  if (actual.join("\n") !== expected.join("\n")) reject(`${label} keys do not match the contract`);
};
const parse = (raw, label) => {
  try { return JSON.parse(raw); } catch (error) { reject(`${label} is not valid JSON (${error.message})`); }
};
const validIso = (value) => typeof value === "string" && ISO.test(value) && !Number.isNaN(Date.parse(value));
const normalizedRelative = (value, label) => {
  if (typeof value !== "string" || !value || value.startsWith("/") || value.includes("\\")) reject(`${label} is not repository-relative`);
  const normalized = path.posix.normalize(value);
  if (normalized !== value || normalized === ".." || normalized.startsWith("../")) reject(`${label} is unsafe`);
  return normalized;
};

function checkedBoundFile(binding, readBoundFile, label, pathKey = "record") {
  exactKeys(binding, [pathKey, "sha256"], label);
  const record = normalizedRelative(binding[pathKey], `${label}.${pathKey}`);
  if (!HASH.test(binding.sha256 || "")) reject(`${label}.sha256 is invalid`);
  const raw = readBoundFile(record);
  if (typeof raw !== "string" || sha256(raw) !== binding.sha256) reject(`${label} bytes changed`);
  return record;
}

function parseNewsstandData(raw) {
  const context = { window: {} };
  try { vm.runInNewContext(raw, context, { timeout: 1000 }); } catch (error) { reject(`canonical story dataset is invalid (${error.message})`); }
  const data = context.window.NEWSSTAND_DATA;
  if (!data || data.schemaVersion !== "1.0.0" || data.datasetStatus !== "published" || !Array.isArray(data.stories)) {
    reject("canonical story dataset is not publishable schema 1.0.0");
  }
  return JSON.parse(JSON.stringify(data));
}

export function publicStoryFromCandidate(candidateStory, decision, evidenceRecord) {
  return {
    ...candidateStory,
    status: "published",
    publishedAt: decision.publishedAt,
    updatedAt: decision.reviewedAt,
    lastCheckedAt: decision.reviewedAt,
    sourceApproval: { status: "approved", record: `/${evidenceRecord}` }
  };
}

export function promoteNewsstandStory({ datasetRaw, candidateRaw, evidenceRaw, decisionRaw, maker, readBoundFile, evidenceRecord, now }) {
  if (typeof maker !== "string" || !maker.trim()) reject("maker identity is required");
  if (typeof readBoundFile !== "function") reject("bound-file reader is required");
  const candidate = parse(candidateRaw, "candidate");
  const evidence = parse(evidenceRaw, "evidence manifest");
  const decision = parse(decisionRaw, "independent decision");
  exactKeys(candidate, ["schemaVersion", "candidateStatus", "workOrderId", "sourceText", "claimMap", "story"], "candidate");
  if (candidate.schemaVersion !== "newsstand-story-candidate.v1" || candidate.candidateStatus !== "HELD_NOT_PUBLISHED" || !candidate.workOrderId) {
    reject("candidate is not a held NewsStand story candidate");
  }
  checkedBoundFile(candidate.sourceText, readBoundFile, "candidate.sourceText", "path");
  checkedBoundFile(candidate.claimMap, readBoundFile, "candidate.claimMap", "path");
  if (!candidate.story || candidate.story.status !== "hold" || candidate.story.publishedAt !== null ||
      candidate.story.sourceApproval?.status !== "independent-review-required" || !candidate.story.id || !candidate.story.slug) {
    reject("candidate story is not held with an unpublished identity");
  }
  exactKeys(decision, [
    "schemaVersion", "decision", "storyId", "candidateSha256", "evidenceSha256", "publicStorySha256",
    "publishedAt", "reviewedAt", "reviewedBy", "reviewerRole", "aliApproval", "observedExplainBack"
  ], "independent decision");
  if (decision.schemaVersion !== "newsstand-story-admission-v1" || decision.decision !== "ACCEPT_LOCAL_CANONICAL_WRITE" ||
      decision.storyId !== candidate.story.id || decision.candidateSha256 !== sha256(candidateRaw) ||
      decision.evidenceSha256 !== sha256(evidenceRaw) || !HASH.test(decision.publicStorySha256 || "")) {
    reject("independent decision does not bind the exact candidate, evidence and story");
  }
  if (!validIso(decision.publishedAt) || !validIso(decision.reviewedAt) || Date.parse(decision.reviewedAt) < Date.parse(decision.publishedAt) ||
      Date.parse(decision.reviewedAt) > Date.parse(now) + 300000 || decision.reviewedBy === maker ||
      !/independent/i.test(decision.reviewedBy || "") || !/independent/i.test(decision.reviewerRole || "")) {
    reject("independent reviewer identity or time is invalid");
  }
  const aliApprovalRecord = checkedBoundFile(decision.aliApproval, readBoundFile, "decision.aliApproval");
  const explainBackRecord = checkedBoundFile(decision.observedExplainBack, readBoundFile, "decision.observedExplainBack");
  exactKeys(evidence, [
    "schemaVersion", "storyId", "correctionOwner", "nextRecheckAt", "sources", "claims", "independentReview", "visualReview",
    "reviewRender", "producerContract", "exactProse", "artifactBindings", "aliApproval", "observedExplainBack", "reviewArtifact"
  ], "evidence manifest");
  if (evidence.schemaVersion !== "newsstand-story-evidence.v1" || evidence.storyId !== candidate.story.id ||
      !evidence.correctionOwner || !/^\d{4}-\d{2}-\d{2}$/.test(evidence.nextRecheckAt || "") ||
      evidence.aliApproval !== aliApprovalRecord || evidence.observedExplainBack !== explainBackRecord) {
    reject("evidence manifest identity, correction or human bindings are invalid");
  }
  const requiredArtifactPaths = new Set([
    evidence.independentReview, evidence.visualReview, evidence.reviewRender, evidence.producerContract, evidence.exactProse
  ]);
  if (!Array.isArray(evidence.artifactBindings) || evidence.artifactBindings.length !== requiredArtifactPaths.size) {
    reject("evidence artifact bindings are incomplete");
  }
  const boundArtifactPaths = new Set();
  for (const binding of evidence.artifactBindings) {
    const record = checkedBoundFile(binding, readBoundFile, "evidence.artifactBindings[]");
    if (!requiredArtifactPaths.has(record) || boundArtifactPaths.has(record)) reject("evidence artifact binding is unexpected or duplicated");
    boundArtifactPaths.add(record);
  }
  const sourceIds = new Set((candidate.story.sources || []).map((source) => source.id));
  const evidenceSourceIds = new Set((evidence.sources || []).map((source) => source.id));
  if (!sourceIds.size || sourceIds.size !== evidenceSourceIds.size || [...sourceIds].some((id) => !evidenceSourceIds.has(id))) {
    reject("evidence sources do not match the candidate story");
  }
  if (!Array.isArray(evidence.claims) || !evidence.claims.length || evidence.claims.some((claim) =>
    !claim.claim || !Array.isArray(claim.sourceIds) || !claim.sourceIds.length || claim.sourceIds.some((id) => !sourceIds.has(id)))) {
    reject("evidence claims are incomplete or reference unknown sources");
  }
  evidenceRecord = normalizedRelative(evidenceRecord, "evidence manifest record");
  if (!evidenceRecord.startsWith("operations/product-stewards/newsstand/evidence/stories/")) {
    reject("evidence manifest is outside NewsStand story evidence");
  }
  const publicStory = publicStoryFromCandidate(candidate.story, decision, evidenceRecord);
  const publicStorySha256 = sha256(`${canonicalJson(publicStory)}\n`);
  exactKeys(evidence.reviewArtifact, ["canonicalization", "storySha256"], "evidence.reviewArtifact");
  if (evidence.reviewArtifact.canonicalization !== "recursive-key-sorted-json-plus-newline" ||
      evidence.reviewArtifact.storySha256 !== publicStorySha256 || decision.publicStorySha256 !== publicStorySha256) {
    reject("public story checksum does not match the evidence and decision");
  }
  const nextDatasetRaw = compileStoryDatasetWrite({ datasetRaw, publicStory, timestamp: decision.reviewedAt });
  return { datasetRaw: nextDatasetRaw, publicStory, publicStorySha256, changed: nextDatasetRaw !== datasetRaw };
}

export function compileStoryDatasetWrite({ datasetRaw, publicStory, timestamp }) {
  const data = parseNewsstandData(datasetRaw);
  const existing = data.stories.filter((story) => story.id === publicStory.id || story.slug === publicStory.slug);
  if (existing.length) {
    if (existing.length === 1 && existing[0].id === publicStory.id && existing[0].slug === publicStory.slug &&
        canonicalJson(existing[0]) === canonicalJson(publicStory)) return datasetRaw;
    reject(`conflicting story identity already exists: ${publicStory.id}`);
  }
  if (!validIso(timestamp)) reject("dataset timestamp is invalid");
  const marker = "\n  ]\n};\n\n/* Compatibility for old private inspection scripts only.";
  if (!datasetRaw.includes(marker)) reject("canonical story insertion marker is missing");
  const replaceOnce = (raw, pattern, replacement, label) => {
    const matches = raw.match(pattern) || [];
    if (matches.length !== 1) reject(`${label} replacement is ambiguous`);
    return raw.replace(pattern, replacement);
  };
  let next = replaceOnce(datasetRaw, /^  generatedAt: ".+",$/gm, `  generatedAt: "${timestamp}",`, "generatedAt");
  next = replaceOnce(next, /^  lastCheckedAt: ".+",$/gm, `  lastCheckedAt: "${timestamp}",`, "lastCheckedAt");
  const serialized = JSON.stringify(publicStory, null, 2).split("\n").map((line) => `    ${line}`).join("\n");
  next = next.replace(marker, `,\n${serialized}\n  ]\n};\n\n/* Compatibility for old private inspection scripts only.`);
  const reparsed = parseNewsstandData(next);
  const inserted = reparsed.stories.find((story) => story.id === publicStory.id);
  if (!inserted || canonicalJson(inserted) !== canonicalJson(publicStory)) reject("written story differs from the admitted story");
  return next;
}

function argument(name, args) { const index = args.indexOf(name); return index === -1 ? null : args[index + 1]; }

function main() {
  const args = process.argv.slice(2);
  const candidatePath = path.resolve(argument("--candidate", args) || "");
  const evidencePath = path.resolve(argument("--evidence", args) || "");
  const decisionPath = path.resolve(argument("--decision", args) || "");
  const maker = argument("--maker", args);
  const write = args.includes("--write");
  if (!candidatePath.startsWith(`${CANDIDATE_ROOT}${path.sep}`) || !fs.existsSync(candidatePath)) reject("candidate must exist inside the NewsStand candidate directory");
  if (!evidencePath.startsWith(`${path.join(EVIDENCE_ROOT, "stories")}${path.sep}`) || !fs.existsSync(evidencePath)) reject("evidence must exist inside NewsStand story evidence");
  if (!decisionPath.startsWith(`${EVIDENCE_ROOT}${path.sep}`) || !fs.existsSync(decisionPath)) reject("decision must exist inside NewsStand evidence");
  const relativeEvidence = path.relative(ROOT, evidencePath).split(path.sep).join("/");
  const readBoundFile = (relative) => {
    const absolute = path.join(ROOT, normalizedRelative(relative, "bound path"));
    if (!absolute.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) reject(`bound file does not exist: ${relative}`);
    return fs.readFileSync(absolute, "utf8");
  };
  const candidateRaw = fs.readFileSync(candidatePath, "utf8");
  const evidenceRaw = fs.readFileSync(evidencePath, "utf8");
  const decisionRaw = fs.readFileSync(decisionPath, "utf8");
  const result = promoteNewsstandStory({
    datasetRaw: fs.readFileSync(STORY_PATH, "utf8"), candidateRaw, evidenceRaw, decisionRaw, maker, readBoundFile,
    evidenceRecord: relativeEvidence, now: new Date().toISOString()
  });
  if (write && result.changed) {
    const temporary = `${STORY_PATH}.tmp-${process.pid}`;
    fs.writeFileSync(temporary, result.datasetRaw, { flag: "wx" });
    fs.renameSync(temporary, STORY_PATH);
  }
  const mode = write ? result.changed ? "LOCAL CANONICAL WRITE" : "LOCAL CANONICAL IDEMPOTENT" : "DRY RUN";
  console.log(`NEWSSTAND STORY ${mode} PASS story=${result.publicStory.id} story_sha256=${result.publicStorySha256} public_write=${write && result.changed}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
