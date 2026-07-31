#!/usr/bin/env node
/*
 * NewsStand private release-pipeline candidate compiler.
 * It intentionally cannot write public/canonical content or deploy. Its only
 * write target is an explicitly named isolated dry-run output directory.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PIPELINE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1");
const SCHEMA_PATH = path.join(PIPELINE_ROOT, "schema.json");
const HASH = /^[a-f0-9]{64}$/;
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

export const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
export const canonicalJson = (value) => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
export const objectSha = (value) => sha256(canonicalJson(value));
const fail = (message) => { throw new Error(`NEWSSTAND_RELEASE_PIPELINE_REJECT: ${message}`); };
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const exactKeys = (value, allowed, label) => {
  if (!isObject(value)) fail(`${label}: must be an object`);
  const unknown = Object.keys(value).filter((key) => !allowed.includes(key));
  if (unknown.length) fail(`${label}: schema drift/unknown key ${unknown.join(",")}`);
};
const required = (value, keys, label) => keys.forEach((key) => {
  if (!Object.hasOwn(value, key)) fail(`${label}: missing required key ${key}`);
});
const uniqueStrings = (value, label) => {
  if (!Array.isArray(value) || !value.length || value.some((item) => typeof item !== "string" || !item)) fail(`${label}: must be a non-empty string array`);
  if (new Set(value).size !== value.length) fail(`${label}: duplicate value`);
};
const validIso = (value) => typeof value === "string" && ISO.test(value) && !Number.isNaN(Date.parse(value));

// Reject all duplicate object keys before JSON.parse collapses them. JSON's
// escape rules are decoded so "id" and "\\u0069d" also collide.
export function parseJsonRejectingRecursiveDuplicates(raw, label = "JSON") {
  let at = 0;
  const error = (message) => fail(`${label}: ${message} at byte ${at}`);
  const ws = () => { while (/\s/.test(raw[at] || "")) at += 1; };
  const string = () => {
    if (raw[at] !== '"') error("expected string");
    const start = at; at += 1;
    let escaped = false;
    while (at < raw.length) {
      const char = raw[at++];
      if (!escaped && char === '"') {
        try { return JSON.parse(raw.slice(start, at)); } catch { error("invalid string"); }
      }
      if (!escaped && char < " ") error("control character in string");
      escaped = !escaped && char === "\\";
      if (escaped && at >= raw.length) error("unterminated escape");
    }
    error("unterminated string");
  };
  const value = () => {
    ws(); const char = raw[at];
    if (char === '"') { string(); return; }
    if (char === "{") {
      at += 1; ws(); const keys = new Set();
      if (raw[at] === "}") { at += 1; return; }
      while (true) {
        ws(); const key = string();
        if (keys.has(key)) fail(`${label}: duplicate_json_key:${key}`);
        keys.add(key); ws(); if (raw[at++] !== ":") error("expected colon"); value(); ws();
        if (raw[at] === "}") { at += 1; return; }
        if (raw[at++] !== ",") error("expected comma");
      }
    }
    if (char === "[") {
      at += 1; ws(); if (raw[at] === "]") { at += 1; return; }
      while (true) { value(); ws(); if (raw[at] === "]") { at += 1; return; } if (raw[at++] !== ",") error("expected comma"); }
    }
    const token = raw.slice(at).match(/^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/)?.[0];
    if (!token) error("invalid JSON value"); at += token.length;
  };
  ws(); value(); ws(); if (at !== raw.length) error("trailing data");
  try { return JSON.parse(raw); } catch (errorObject) { fail(`${label}: invalid JSON (${errorObject.message})`); }
}

const readRaw = (file, label) => {
  if (!file || !fs.existsSync(file)) fail(`${label}: missing input file`);
  const raw = fs.readFileSync(file, "utf8");
  return { raw, value: parseJsonRejectingRecursiveDuplicates(raw, label), sha256: sha256(raw) };
};
const readSchema = () => {
  const raw = fs.readFileSync(SCHEMA_PATH, "utf8");
  return { value: parseJsonRejectingRecursiveDuplicates(raw, "schema"), sha256: sha256(raw) };
};
const assertHash = (value, label) => { if (typeof value !== "string" || !HASH.test(value)) fail(`${label}: expected lowercase SHA-256`); };

function validateCandidate(candidate, schema, schemaSha) {
  exactKeys(candidate, schema.candidateAllowed, "candidate"); required(candidate, schema.candidateRequired, "candidate");
  if (candidate.schemaVersion !== schema.version) fail("candidate: schema version drift");
  for (const key of ["candidateId", "storyKey", "title", "body"]) if (typeof candidate[key] !== "string" || !candidate[key].trim()) fail(`candidate: invalid ${key}`);
  if (!schema.actions.includes(candidate.action)) fail("candidate: invalid action");
  if (!validIso(candidate.evaluationAt)) fail("candidate: invalid deterministic evaluationAt");
  uniqueStrings(candidate.claimIds, "candidate.claimIds"); uniqueStrings(candidate.sourceReceiptIds, "candidate.sourceReceiptIds"); assertHash(candidate.claimBindingSha256, "candidate.claimBindingSha256");
  if (candidate.action === "rollback") assertHash(candidate.rollbackTargetCanonicalSha256, "candidate.rollbackTargetCanonicalSha256");
  if (candidate.action !== "rollback" && Object.hasOwn(candidate, "rollbackTargetCanonicalSha256")) fail("candidate: rollback target only allowed for rollback");
  if (!schemaSha) fail("schema checksum missing");
}

function validateReceipts(receipts, candidate, schema) {
  if (!Array.isArray(receipts) || !receipts.length) fail("source receipts: non-empty array required");
  const byId = new Map();
  for (const receipt of receipts) {
    exactKeys(receipt, schema.sourceReceiptRequired, "source receipt"); required(receipt, schema.sourceReceiptRequired, "source receipt");
    if (byId.has(receipt.receiptId)) fail(`source receipts: duplicate receiptId ${receipt.receiptId}`);
    if (typeof receipt.receiptId !== "string" || !receipt.receiptId || typeof receipt.sourceUrl !== "string" || !/^https:\/\//.test(receipt.sourceUrl)) fail("source receipt: invalid identity/url");
    assertHash(receipt.sourceBytesSha256, "source receipt.sourceBytesSha256");
    if (!validIso(receipt.retrievedAt)) fail("source receipt: invalid retrievedAt");
    if (typeof receipt.recordedBy !== "string" || !receipt.recordedBy.trim() || receipt.independent !== true) fail("source receipt: must be independently recorded");
    const ageHours = (Date.parse(candidate.evaluationAt) - Date.parse(receipt.retrievedAt)) / 3600000;
    if (ageHours < 0 || ageHours > schema.sourceReceiptMaxAgeHours) fail(`source receipt ${receipt.receiptId}: stale or future at evaluation time`);
    byId.set(receipt.receiptId, receipt);
  }
  for (const id of candidate.sourceReceiptIds) if (!byId.has(id)) fail(`candidate: missing declared source receipt ${id}`);
  return byId;
}

function validateClaimBindings(bindings, candidate, receipts) {
  if (!Array.isArray(bindings) || !bindings.length) fail("claim bindings: non-empty array required");
  if (objectSha(bindings) !== candidate.claimBindingSha256) fail("claim bindings: exact checksum mismatch");
  const byId = new Map();
  for (const binding of bindings) {
    exactKeys(binding, ["claimId", "claimTextSha256", "sourceReceiptIds"], "claim binding"); required(binding, ["claimId", "claimTextSha256", "sourceReceiptIds"], "claim binding");
    if (byId.has(binding.claimId)) fail(`claim bindings: duplicate claimId ${binding.claimId}`);
    assertHash(binding.claimTextSha256, "claim binding.claimTextSha256"); uniqueStrings(binding.sourceReceiptIds, "claim binding.sourceReceiptIds");
    binding.sourceReceiptIds.forEach((id) => { if (!receipts.has(id)) fail(`claim binding ${binding.claimId}: missing source receipt ${id}`); });
    byId.set(binding.claimId, binding);
  }
  for (const id of candidate.claimIds) if (!byId.has(id)) fail(`candidate: missing claim binding ${id}`);
  if (byId.size !== candidate.claimIds.length) fail("claim bindings: stale/unreferenced claim binding");
  return byId;
}

function validateDecision(decision, candidateSha, schemaSha, maker, schema) {
  exactKeys(decision, schema.decisionRequired, "independent decision"); required(decision, schema.decisionRequired, "independent decision");
  if (decision.candidateSha256 !== candidateSha || decision.schemaSha256 !== schemaSha) fail("independent decision: candidate/schema binding mismatch");
  if (decision.decision !== schema.approvalDecision) fail("independent decision: not approved for dry-run canonical proposal");
  if (!validIso(decision.reviewedAt) || typeof decision.reviewedBy !== "string" || !decision.reviewedBy.trim() || typeof decision.reviewerRole !== "string" || !decision.reviewerRole.trim()) fail("independent decision: invalid reviewer identity");
  if (decision.reviewedBy === maker) fail("independent decision: maker self-approval is forbidden");
}

function validateLedger(ledger) {
  if (!ledger) return [];
  if (!Array.isArray(ledger.entries)) fail("audit ledger: entries array required");
  let predecessor = null;
  for (const entry of ledger.entries) {
    if (!isObject(entry) || entry.previousEntrySha256 !== predecessor) fail("audit ledger: broken append-only predecessor chain");
    const expected = objectSha({ ...entry, entrySha256: undefined });
    if (entry.entrySha256 !== expected) fail("audit ledger: entry checksum mismatch");
    predecessor = entry.entrySha256;
  }
  return ledger.entries;
}

export function compileDryRun({ candidateRaw, sourceReceiptsRaw, claimBindingsRaw, decisionRaw, maker, priorCanonical = null, priorLedger = null }) {
  if (typeof maker !== "string" || !maker.trim()) fail("maker identity is required");
  const schemaInput = readSchema(); const schema = schemaInput.value;
  const candidate = parseJsonRejectingRecursiveDuplicates(candidateRaw, "candidate");
  const sourceReceipts = parseJsonRejectingRecursiveDuplicates(sourceReceiptsRaw, "source receipts");
  const claimBindings = parseJsonRejectingRecursiveDuplicates(claimBindingsRaw, "claim bindings");
  const decision = parseJsonRejectingRecursiveDuplicates(decisionRaw, "independent decision");
  const candidateSha256 = sha256(candidateRaw);
  validateCandidate(candidate, schema, schemaInput.sha256);
  const receipts = validateReceipts(sourceReceipts, candidate, schema);
  validateClaimBindings(claimBindings, candidate, receipts);
  validateDecision(decision, candidateSha256, schemaInput.sha256, maker, schema);
  const ledgerEntries = validateLedger(priorLedger);
  const priorSha = priorCanonical ? objectSha(priorCanonical) : null;
  if (candidate.action === "correct" || candidate.action === "retract") {
    if (!priorCanonical || priorCanonical.storyKey !== candidate.storyKey) fail("candidate: correction/retraction requires exact prior canonical record for same story");
  }
  if (candidate.action === "rollback") {
    if (!priorCanonical || priorSha !== candidate.rollbackTargetCanonicalSha256) fail("candidate: rollback target does not match exact supplied canonical record");
    if (priorCanonical.storyKey !== candidate.storyKey) fail("candidate: rollback story identity mismatch");
  }
  const proposedCanonical = candidate.action === "rollback"
    ? { ...priorCanonical, rollbackOfCandidateSha256: candidateSha256, rollbackAt: candidate.evaluationAt }
    : {
        recordVersion: "newsstand-canonical-proposal-v1", storyKey: candidate.storyKey,
        status: candidate.action === "retract" ? "retracted" : "current", title: candidate.title, body: candidate.body,
        claimBindingSha256: candidate.claimBindingSha256, sourceReceiptIds: candidate.sourceReceiptIds,
        candidateSha256, schemaSha256: schemaInput.sha256, decisionSha256: objectSha(decision), proposedAt: candidate.evaluationAt,
        predecessorCanonicalSha256: priorSha
      };
  const canonicalSha256 = objectSha(proposedCanonical);
  const entry = {
    auditVersion: "newsstand-release-audit-v1", candidateId: candidate.candidateId, action: candidate.action,
    candidateSha256, schemaSha256: schemaInput.sha256, decisionSha256: objectSha(decision), canonicalSha256,
    previousEntrySha256: ledgerEntries.length ? ledgerEntries.at(-1).entrySha256 : null, recordedAt: candidate.evaluationAt
  };
  entry.entrySha256 = objectSha({ ...entry, entrySha256: undefined });
  const auditLedger = { ledgerVersion: "newsstand-release-audit-ledger-v1", entries: [...ledgerEntries, entry] };
  const receipt = {
    receiptVersion: "newsstand-release-dry-run-v1", mode: "DRY_RUN_ONLY", publicWrite: false, deployActionTaken: false,
    candidateSha256, schemaSha256: schemaInput.sha256, independentDecisionSha256: objectSha(decision),
    proposedCanonicalSha256: canonicalSha256, auditEntrySha256: entry.entrySha256, auditLedgerSha256: objectSha(auditLedger)
  };
  return { proposedCanonical, auditLedger, receipt };
}

function argument(name, args) { const index = args.indexOf(name); return index === -1 ? null : args[index + 1]; }
function main() {
  const args = process.argv.slice(2);
  const output = argument("--output", args); const maker = argument("--maker", args);
  if (!output || !maker) fail("usage: --candidate --source-receipts --claim-bindings --decision --maker --output [--prior-canonical] [--prior-ledger]");
  const resolvedOutput = path.resolve(output);
  if (!resolvedOutput.includes(`${path.sep}operations${path.sep}product-stewards${path.sep}newsstand${path.sep}release-pipeline-v1${path.sep}`)) fail("output must remain inside the isolated release-pipeline-v1 directory");
  const candidate = readRaw(argument("--candidate", args), "candidate");
  const receipts = readRaw(argument("--source-receipts", args), "source receipts");
  const bindings = readRaw(argument("--claim-bindings", args), "claim bindings");
  const decision = readRaw(argument("--decision", args), "independent decision");
  const priorCanonicalPath = argument("--prior-canonical", args); const priorLedgerPath = argument("--prior-ledger", args);
  const priorCanonical = priorCanonicalPath ? readRaw(priorCanonicalPath, "prior canonical").value : null;
  const priorLedger = priorLedgerPath ? readRaw(priorLedgerPath, "prior ledger").value : null;
  const result = compileDryRun({ candidateRaw: candidate.raw, sourceReceiptsRaw: receipts.raw, claimBindingsRaw: bindings.raw, decisionRaw: decision.raw, maker, priorCanonical, priorLedger });
  fs.mkdirSync(resolvedOutput, { recursive: true });
  for (const [name, value] of Object.entries({ "proposed-canonical-record.json": result.proposedCanonical, "append-only-audit-ledger.json": result.auditLedger, "dry-run-receipt.json": result.receipt })) fs.writeFileSync(path.join(resolvedOutput, name), `${canonicalJson(value)}\n`);
  console.log(`NEWSSTAND RELEASE DRY-RUN PASS canonical_sha256=${result.receipt.proposedCanonicalSha256} audit_entry_sha256=${result.receipt.auditEntrySha256} public_write=false`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) main();
