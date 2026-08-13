#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { inspectNewsstandProducerProof } from "./check-newsstand-producer-proof.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const value = (flag) => { const index = args.indexOf(flag); return index >= 0 ? args[index + 1] : null; };
const has = (flag) => args.includes(flag);
const sha256 = (body) => crypto.createHash("sha256").update(body).digest("hex");
const fail = (message) => { console.error(`NEWSSTAND PRODUCER PROOF REVIEW BLOCKED: ${message}`); process.exit(1); };
const read = (relative, label) => {
  const absolute = path.resolve(ROOT, relative || "");
  if (!relative || !absolute.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) fail(`${label} is unavailable: ${relative || ""}`);
  return { path: path.relative(ROOT, absolute), body: fs.readFileSync(absolute, "utf8") };
};

const proofFile = read(value("--proof"), "proof");
const timeoutMs = Number(value("--timeout-ms") || 240_000);
if (!Number.isInteger(timeoutMs) || timeoutMs < 1) fail("--timeout-ms must be a positive integer");
let proof;
try { proof = JSON.parse(proofFile.body); } catch { fail("proof is not valid JSON"); }
const inspected = inspectNewsstandProducerProof(proof);
if (inspected.errors.length) fail(`mechanical proof failed: ${inspected.errors.join(" | ")}`);
const standard = read(proof.productionStandard.path, "production standard");
const sourceMap = read(proof.sourceMap.path, "source map");
const knownBad = read("operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-exact-prose.md", "exact rejected predecessor");

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["verdict", "summary", "defects", "formatJob", "plainOpening", "causalTeaching", "evidenceBoundary", "readerUse", "draftPermission"],
  properties: {
    verdict: { type: "string", enum: ["PASS", "REPAIR", "REJECT"] },
    summary: { type: "string" },
    defects: { type: "array", items: { type: "object", additionalProperties: false, required: ["locator", "problem", "requiredRepair"], properties: { locator: { type: "string" }, problem: { type: "string" }, requiredRepair: { type: "string" } } } },
    formatJob: { type: "string" },
    plainOpening: { type: "string" },
    causalTeaching: { type: "string" },
    evidenceBoundary: { type: "string" },
    readerUse: { type: "string" },
    draftPermission: { type: "string", enum: ["FULL_DRAFT_ALLOWED", "REPAIR_PROOF_FIRST"] }
  }
};

const prompt = `You are the pre-draft producer-quality check for one LAiDIES NewsStand story. This is deliberately the cheap, small proof before full prose is generated. Judge the exact proof, not effort or intent. Do not write the article.

Return PASS and FULL_DRAFT_ALLOWED only when a smart non-technical woman can immediately identify: what happened, why it matters, who is affected, the newcomer background, each causal link, what the evidence proves and does not prove, one useful workplace and non-work application, and the useful landing. The headline must state the point without teasing or inflating danger. The opening must answer before technical vocabulary. The selected publication and story mode must genuinely govern the shape and intended length.

The predecessor below was directly rejected by Ali. Reject any proof that would reproduce its buried purpose, excessive Daily scale, click-baity framing, technical-first explanation or inability of a cold reader to state the point. Review the proof against the production standard and source map; do not infer missing content.

=== BINDING PRODUCTION STANDARD (${standard.path}; sha256 ${sha256(standard.body)}) ===
${standard.body}

=== SOURCE AND CLAIM MAP (${sourceMap.path}; sha256 ${sha256(sourceMap.body)}) ===
${sourceMap.body}

=== EXACT PRODUCER PROOF (${proofFile.path}; sha256 ${sha256(proofFile.body)}) ===
${proofFile.body}

=== DIRECTLY REJECTED PREDECESSOR (${knownBad.path}; sha256 ${sha256(knownBad.body)}) ===
${knownBad.body}
`;

const invocation = {
  schemaVersion: "laidies-newsstand-producer-proof-review-invocation.v1",
  modelFamily: "claude",
  model: value("--model") || "fable",
  proof: { path: proofFile.path, sha256: sha256(proofFile.body) },
  standard: { path: standard.path, sha256: sha256(standard.body) },
  sourceMap: { path: sourceMap.path, sha256: sha256(sourceMap.body) },
  knownBad: { path: knownBad.path, sha256: sha256(knownBad.body) },
  promptSha256: sha256(prompt)
};
if (has("--dry-run")) {
  process.stdout.write(`${JSON.stringify({ ...invocation, prompt }, null, 2)}\n`);
  process.exit(0);
}

const isolated = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-proof-review-"));
const result = spawnSync(value("--claude-command") || "claude", [
  "--print", "--safe-mode", "--tools", "", "--permission-mode", "dontAsk", "--no-session-persistence",
  "--model", invocation.model, "--effort", "medium", "--output-format", "json", "--json-schema", JSON.stringify(schema), prompt
], { cwd: isolated, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: timeoutMs, killSignal: "SIGTERM" });
fs.rmSync(isolated, { recursive: true, force: true });
if (result.error?.code === "ETIMEDOUT") fail(`Claude produced no proof review within ${timeoutMs} milliseconds; retry the same checksum-bound proof or route to a different independent reviewer`);
if (result.error) fail(result.error.message);
if (result.status !== 0) fail(`Claude exited ${result.status}: ${(result.stderr || result.stdout).trim()}`);
let envelope;
try { envelope = JSON.parse(result.stdout); } catch { fail("Claude did not return JSON"); }
const review = envelope.structured_output;
if (!review || !["PASS", "REPAIR", "REJECT"].includes(review.verdict)) fail("Claude response lacked a valid structured review");
const finalRecord = `${JSON.stringify({ ...invocation, reviewedAt: new Date().toISOString(), review }, null, 2)}\n`;
const output = value("--output");
if (output) {
  const absoluteOutput = path.resolve(ROOT, output);
  if (!absoluteOutput.startsWith(`${ROOT}${path.sep}`)) fail("--output must stay inside the repository");
  fs.mkdirSync(path.dirname(absoluteOutput), { recursive: true });
  fs.writeFileSync(absoluteOutput, finalRecord);
}
process.stdout.write(finalRecord);
