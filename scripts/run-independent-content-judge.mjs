#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_VOICE = "operations/voice/laidies-writing-lock.md";
const DEFAULT_EXEMPLAR = "content/episodes/episode-01.canon.md";

const args = process.argv.slice(2);
const value = flag => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
};
const has = flag => args.includes(flag);
const fail = message => { console.error(`INDEPENDENT CONTENT JUDGE BLOCKED: ${message}`); process.exit(1); };
const resolveBound = (candidate, label) => {
  if (!candidate) fail(`${label} path is required`);
  const absolute = path.resolve(ROOT, candidate);
  if (!absolute.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) fail(`${label} is not a readable repository file: ${candidate}`);
  return { path: path.relative(ROOT, absolute), absolute, text: fs.readFileSync(absolute, "utf8") };
};
const sha256 = body => crypto.createHash("sha256").update(body).digest("hex");

const artifact = resolveBound(value("--artifact"), "artifact");
const voice = resolveBound(value("--voice") || DEFAULT_VOICE, "voice lock");
const exemplar = resolveBound(value("--exemplar") || DEFAULT_EXEMPLAR, "voice exemplar");
const model = value("--model") || "fable";

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["verdict", "summary", "objectiveDefects", "qualityFindings", "readerChange", "voiceComparison"],
  properties: {
    verdict: { type: "string", enum: ["PASS", "HOLD", "REJECT"] },
    summary: { type: "string" },
    objectiveDefects: { type: "array", items: { type: "object", additionalProperties: false, required: ["locator", "problem", "repair"], properties: { locator: { type: "string" }, problem: { type: "string" }, repair: { type: "string" } } } },
    qualityFindings: { type: "array", items: { type: "object", additionalProperties: false, required: ["dimension", "locator", "finding"], properties: { dimension: { type: "string" }, locator: { type: "string" }, finding: { type: "string" } } } },
    readerChange: { type: "string" },
    voiceComparison: { type: "string" }
  }
};

const prompt = `You are the role-distinct independent semantic judge for a LAiDIES teaching artifact.

Judge the artifact first. Do not infer intent, reward effort, repair the prose, or trust maker claims. You have deliberately NOT been given the producer brief, self-review, manifest, validator output, work-order rationale, or prior reviewer comments. Their absence is a required independence control.

Return PASS only if the exact artifact is genuinely clear, useful, accurate on its face, connected rather than glossary-like, practical for a non-technical reader, enjoyable, and recognisably beside the Episode 1 voice exemplar. Jargon before meaning, generic AI prose, decorative analogies, repetition, vague headings, disconnected definitions, missing mechanism, or no useful reader change require HOLD or REJECT. A model judgment does not substitute for observed unfamiliar-human explain-back and transfer evidence.

=== EXACT ARTIFACT (${artifact.path}; sha256 ${sha256(artifact.text)}) ===
${artifact.text}

=== BINDING WRITING LOCK (${voice.path}; sha256 ${sha256(voice.text)}) ===
${voice.text}

=== POSITIVE VOICE EXEMPLAR (${exemplar.path}; sha256 ${sha256(exemplar.text)}) ===
${exemplar.text}
`;

const dryRun = {
  schemaVersion: "laidies-independent-judge-invocation.v1",
  modelFamily: "claude",
  model,
  artifact: { path: artifact.path, sha256: sha256(artifact.text) },
  voice: { path: voice.path, sha256: sha256(voice.text) },
  exemplar: { path: exemplar.path, sha256: sha256(exemplar.text) },
  excludedContext: ["producer brief", "producer self-review", "maker receipts", "manifest", "validator output", "prior reviewer comments", "repository instructions"],
  promptSha256: sha256(prompt),
  prompt
};
if (has("--dry-run")) {
  process.stdout.write(`${JSON.stringify(dryRun, null, 2)}\n`);
  process.exit(0);
}

const isolatedCwd = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-independent-judge-"));
const command = value("--claude-command") || "claude";
const result = spawnSync(command, [
  "--print",
  "--safe-mode",
  "--tools", "",
  "--permission-mode", "dontAsk",
  "--no-session-persistence",
  "--model", model,
  "--effort", "medium",
  "--output-format", "json",
  "--json-schema", JSON.stringify(schema),
  prompt
], { cwd: isolatedCwd, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
fs.rmSync(isolatedCwd, { recursive: true, force: true });
if (result.error) fail(result.error.message);
if (result.status !== 0) fail(`Claude exited ${result.status}: ${(result.stderr || result.stdout).trim()}`);
let envelope;
try { envelope = JSON.parse(result.stdout); } catch { fail("Claude did not return JSON"); }
const judgment = envelope.structured_output;
if (!judgment || !["PASS", "HOLD", "REJECT"].includes(judgment.verdict)) fail("Claude response did not contain a valid structured judgment");
process.stdout.write(`${JSON.stringify({ ...dryRun, prompt: undefined, judgedAt: new Date().toISOString(), judgment }, null, 2)}\n`);
