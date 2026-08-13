#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { inspectNewsstandServiceExemplar } from "./check-newsstand-service-exemplar.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const value = flag => { const index = args.indexOf(flag); return index >= 0 ? args[index + 1] : null; };
const sha256 = body => crypto.createHash("sha256").update(body).digest("hex");
const fail = message => { console.error(`NEWSSTAND SERVICE EXEMPLAR REVIEW BLOCKED: ${message}`); process.exit(1); };
const paths = ["--paige", "--career", "--promptoscope", "--mme"].map(value);
if (paths.some(item => !item)) fail("--paige, --career, --promptoscope and --mme are required");

const read = (relative, label) => {
  const absolute = path.resolve(ROOT, relative || "");
  if (!relative || !absolute.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) fail(`${label} is unavailable: ${relative || ""}`);
  return { path: path.relative(ROOT, absolute), body: fs.readFileSync(absolute, "utf8") };
};
const candidateFiles = paths.map((item, index) => read(item, ["Paige", "Career / Work-Life", "Promptoscope", "Mme CLAi-O"][index]));
const candidates = candidateFiles.map(file => {
  let candidate;
  try { candidate = JSON.parse(file.body); } catch { fail(`${file.path} is not valid JSON`); }
  const result = inspectNewsstandServiceExemplar(candidate);
  if (result.errors.length) fail(`${file.path} failed mechanical preflight: ${result.errors.join(" | ")}`);
  return candidate;
});
if (new Set(candidates.map(item => item.laneId)).size !== 4) fail("the four inputs must be four distinct service lanes");

const standard = read("operations/product-stewards/newsstand/NEWSSTAND-EDITORIAL-PRODUCTION-STANDARD.md", "production standard");
const registry = read("operations/product-stewards/newsstand/NEWSSTAND-FEATURE-LANE-REGISTRY.json", "feature registry");
const negatives = read("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json", "negative exemplar registry");
const timeoutMs = Number(value("--timeout-ms") || 240_000);
if (!Number.isInteger(timeoutMs) || timeoutMs < 1) fail("--timeout-ms must be a positive integer");

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["verdict", "summary", "outcomes", "crossLaneDistinctness"],
  properties: {
    verdict: { type: "string", enum: ["PASS", "REPAIR", "REJECT"] },
    summary: { type: "string" },
    crossLaneDistinctness: { type: "string" },
    outcomes: {
      type: "array", minItems: 4, maxItems: 4,
      items: {
        type: "object", additionalProperties: false,
        required: ["laneId", "verdict", "readerJob", "plainClarity", "usefulness", "distinctness", "sourceBoundary", "defects"],
        properties: {
          laneId: { type: "string", enum: ["paige_tip", "career_work_life", "promptoscope", "mme_claio"] },
          verdict: { type: "string", enum: ["PASS", "REPAIR", "REJECT"] },
          readerJob: { type: "string" },
          plainClarity: { type: "string" },
          usefulness: { type: "string" },
          distinctness: { type: "string" },
          sourceBoundary: { type: "string" },
          defects: { type: "array", items: { type: "object", additionalProperties: false, required: ["locator", "problem", "requiredRepair"], properties: { locator: { type: "string" }, problem: { type: "string" }, requiredRepair: { type: "string" } } } }
        }
      }
    }
  }
};

const prompt = `You are the independent artifact-first editor for four compact LAiDIES NewsStand service features. Judge the exact reader-facing text, not the producer fields or effort. Return PASS only if every lane is immediately understandable to a smart non-technical woman, useful on its own, source-bounded, enjoyable, and unmistakably different from the other three.

Paige is one literal, work-facing AI action with why it works, a limitation and a check. Career / Work-Life begins with useful non-AI career or life guidance and only then makes one explicit bounded AI connection. For Career / Work-Life, ignore the producer's field names and sourceTopicType claim: inspect the headline and exact prose prefix before “The AI connection.” Quote what remains useful when the entire AI paragraph is removed. REJECT if the headline or that prefix is about using, disclosing, prompting or evaluating AI, or if no recognizable non-AI career/life action survives. Promptoscope is a funny non-work AI action whose humour supports rather than replaces the instruction. Mme CLAi-O is a verbatim governed deck selection with a non-predictive, non-personalised boundary. Reject crossover filler, compressed abstraction, undefined referents, labels doing the explanatory work, generic management advice, technical terms before meaning, unsafe prompts, or a step that an ordinary reader cannot actually follow.

The known-bad registry is supplied to prevent repeated defects. Do not infer missing explanation from metadata. Confirm each claim and boundary against the exact named sources contained in the candidate before passing it.

=== PRODUCTION STANDARD (${standard.path}; sha256 ${sha256(standard.body)}) ===
${standard.body}

=== FEATURE REGISTRY (${registry.path}; sha256 ${sha256(registry.body)}) ===
${registry.body}

=== KNOWN-BAD EXEMPLARS (${negatives.path}; sha256 ${sha256(negatives.body)}) ===
${negatives.body}

=== EXACT CANDIDATES ===
${candidateFiles.map(file => `--- ${file.path}; sha256 ${sha256(file.body)} ---\n${file.body}`).join("\n\n")}
`;

const invocation = {
  schemaVersion: "laidies-newsstand-service-exemplar-review-invocation.v1",
  modelFamily: "claude",
  model: value("--model") || "fable",
  candidates: candidateFiles.map(file => ({ path: file.path, sha256: sha256(file.body) })),
  standard: { path: standard.path, sha256: sha256(standard.body) },
  featureRegistry: { path: registry.path, sha256: sha256(registry.body) },
  negativeRegistry: { path: negatives.path, sha256: sha256(negatives.body) },
  promptSha256: sha256(prompt)
};

if (args.includes("--dry-run")) {
  process.stdout.write(`${JSON.stringify({ ...invocation, prompt }, null, 2)}\n`);
  process.exit(0);
}

const isolated = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-service-review-"));
const result = spawnSync(value("--claude-command") || "claude", [
  "--print", "--safe-mode", "--tools", "", "--permission-mode", "dontAsk", "--no-session-persistence",
  "--model", invocation.model, "--effort", "medium", "--output-format", "json", "--json-schema", JSON.stringify(schema), prompt
], { cwd: isolated, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: timeoutMs, killSignal: "SIGTERM" });
fs.rmSync(isolated, { recursive: true, force: true });
if (result.error?.code === "ETIMEDOUT") fail(`Claude produced no review within ${timeoutMs} milliseconds`);
if (result.error) fail(result.error.message);
if (result.status !== 0) fail(`Claude exited ${result.status}: ${(result.stderr || result.stdout).trim()}`);
let envelope;
try { envelope = JSON.parse(result.stdout); } catch { fail("Claude did not return JSON"); }
const review = envelope.structured_output;
if (!review || !["PASS", "REPAIR", "REJECT"].includes(review.verdict)) fail("Claude response lacked a valid structured review");
const lanes = review.outcomes?.map(item => item.laneId) || [];
if (lanes.length !== 4 || new Set(lanes).size !== 4) fail("review did not return each lane exactly once");
if (review.verdict === "PASS" && review.outcomes.some(item => item.verdict !== "PASS" || item.defects.length)) fail("overall PASS conflicts with a lane outcome");

const finalRecord = `${JSON.stringify({ ...invocation, reviewedAt: new Date().toISOString(), review }, null, 2)}\n`;
const output = value("--output");
if (output) {
  const absoluteOutput = path.resolve(ROOT, output);
  if (!absoluteOutput.startsWith(`${ROOT}${path.sep}`)) fail("--output must stay inside the repository");
  fs.mkdirSync(path.dirname(absoluteOutput), { recursive: true });
  fs.writeFileSync(absoluteOutput, finalRecord);
}
process.stdout.write(finalRecord);
