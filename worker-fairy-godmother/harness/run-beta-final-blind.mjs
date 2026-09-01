import crypto from "node:crypto";
import fs from "node:fs/promises";

import { CLASSIFIER_SYSTEM_PROMPT, buildClassificationEnvelope, classifyRequest } from "../src/index.js";

const MODEL = "gpt-5.6-sol";
const INPUT_USD_PER_MTOK = 4;
const OUTPUT_USD_PER_MTOK = 20;
const MAX_COMPLETION_TOKENS = 4096;
const HARD_RUN_CAP_USD = 10;
const EXPECTED_SOURCE_SHA256 = "5fb44759cb973b57142d4f58b72ee5cf05d78fb15c95db6b5e84ff739b5b799c";
const EXPECTED_CASES_SHA256 = "f6666c0f0b34bc3a8b1c7a09c521f1f059fdacd500310ea33eb55e1ad8b030bd";
const EXPECTED_LABELS_SHA256 = "07c018595f398591ed9bf53309bcfcf8fd0b01fcc7f3748c9523097541e56dc4";
const fixtureDir = new URL("../../operations/test-fixtures/fairy-godmother/classifier-beta-final2-blind-2026-09-01/", import.meta.url);
const sourcePath = new URL("../src/index.js", import.meta.url);
const casesPath = new URL("CASES.json", fixtureDir);
const expectedPath = new URL("PRIVATE-ORACLE.json", fixtureDir);
const manifestPath = new URL("MANIFEST.json", fixtureDir);
const outputPath = new URL("PROVIDER-RUN.private.json", fixtureDir);

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");

if (process.env.FAIRY_FINAL_BLIND_RUN_AUTHORIZED !== "2026-09-01-sol-low-one-pass-final") {
  throw new Error("final_blind_run_not_authorized");
}
const apiKey = process.env.OPENAI_API_KEY || "";
if (!apiKey.startsWith("sk-")) throw new Error("openai_key_missing");

const [sourceBytes, casesBytes, expectedBytes, manifestBytes] = await Promise.all([
  fs.readFile(sourcePath), fs.readFile(casesPath), fs.readFile(expectedPath), fs.readFile(manifestPath)
]);
const manifest = JSON.parse(manifestBytes);
if (sha256(sourceBytes) !== EXPECTED_SOURCE_SHA256 ||
    sha256(casesBytes) !== EXPECTED_CASES_SHA256 ||
    sha256(expectedBytes) !== EXPECTED_LABELS_SHA256 ||
    manifest.boundSource?.sha256 !== EXPECTED_SOURCE_SHA256 ||
    manifest.sendCaseFileSha256 !== EXPECTED_CASES_SHA256 ||
    manifest.labelFileSha256 !== EXPECTED_LABELS_SHA256) {
  throw new Error("final_blind_binding_invalid");
}

const send = JSON.parse(casesBytes);
const oracle = JSON.parse(expectedBytes);
const cases = send.sendCases;
function expandIds(spec) {
  if (spec.id) return [spec.id];
  const match = /^(F2-)(\d+)\.\.F2-(\d+)$/.exec(spec.ids || "");
  if (!match) throw new Error("final_blind_oracle_range_invalid");
  const start = Number(match[2]);
  const end = Number(match[3]);
  return Array.from({ length: end - start + 1 }, (_unused, index) =>
    `${match[1]}${String(start + index).padStart(3, "0")}`);
}
const labels = new Map();
for (const spec of oracle.expected) for (const id of expandIds(spec)) {
  if (labels.has(id)) throw new Error("final_blind_oracle_duplicate");
  labels.set(id, spec);
}
if (!Array.isArray(cases) || cases.length !== 82 || labels.size !== 82 ||
    cases.some((row) => Object.keys(row).sort().join(",") !== "id,text" || !labels.has(row.id))) {
  throw new Error("final_blind_set_invalid");
}
if (process.env.FAIRY_FINAL_BLIND_PREFLIGHT_ONLY === "1") {
  process.stdout.write(JSON.stringify({ ready: true, caseCount: cases.length,
    sourceSha256: EXPECTED_SOURCE_SHA256, casesSha256: EXPECTED_CASES_SHA256,
    labelsSha256: EXPECTED_LABELS_SHA256 }) + "\n");
  process.exit(0);
}

function labelFor(route) {
  if (route.outcome === "boundary") return "boundary";
  return route.outcome;
}

function clauseLabel(clause) {
  const terminal = clause.decision === "boundary"
    ? clause.boundary
    : clause.currentness?.category || "none";
  return [clause.decision, clause.domain, clause.task, clause.risk, terminal].join(":");
}

function accepted(expected, route, envelope) {
  const languageSupported = route.classification?.language?.supported;
  const acceptableOutcomes = expected.acceptableOutcomes || [{
    outcome: expected.outcome,
    languageSupported: expected.languageSupported
  }];
  if (!acceptableOutcomes.some((option) => option.outcome === labelFor(route) &&
      (option.languageSupported == null || option.languageSupported === languageSupported))) return false;
  if (expected.languageSupportedAnyOf && !expected.languageSupportedAnyOf.includes(languageSupported)) return false;
  if (expected.boundary && route.boundary !== expected.boundary) return false;
  if (expected.minimumConfidence != null && route.confidence < expected.minimumConfidence) return false;
  if (languageSupported === false && expected.minimumConfidenceWhenLanguageUnsupported != null &&
      route.confidence < expected.minimumConfidenceWhenLanguageUnsupported) return false;
  if (expected.quotedContent != null && route.hasUntrustedContent !== expected.quotedContent) return false;
  if (expected.currentnessRequired && (!route.needsRetrieval || route.currentness === "none")) return false;
  if (expected.acceptableDomain && !expected.acceptableDomain.includes(route.domain)) return false;
  if (expected.acceptableRisk && !expected.acceptableRisk.includes(route.risk)) return false;
  if (expected.requiresSignal && !envelope.signals?.[expected.requiresSignal]) return false;
  const classificationClauses = route.classification?.clauses || [];
  if (classificationClauses.length !== envelope.clauses.length) return false;
  if (expected.criticalClauses) {
    const actual = classificationClauses.map((clause) => `${clause.role}:${clause.decision}`);
    if (actual.length !== expected.criticalClauses.length) return false;
    for (let index = 0; index < actual.length; index += 1) {
      const wanted = expected.criticalClauses[index];
      if (wanted.endsWith(":allow_or_uncertain")) {
        if (!actual[index].startsWith("user_instruction:") ||
            !["allow", "uncertain"].includes(actual[index].split(":")[1])) return false;
      } else if (actual[index] !== wanted) return false;
    }
  }
  return true;
}

const rows = [];
let promptTokens = 0;
let completionTokens = 0;
for (const testCase of cases) {
  let providerUsage = null;
  let providerModel = null;
  let providerRequestId = null;
  const provider = {
    async classify(envelope, { signal } = {}) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: MODEL,
          reasoning_effort: "low",
          response_format: { type: "json_object" },
          service_tier: "default",
          store: false,
          messages: [
            { role: "system", content: CLASSIFIER_SYSTEM_PROMPT },
            { role: "user", content: JSON.stringify(envelope) }
          ],
          max_completion_tokens: MAX_COMPLETION_TOKENS
        }),
        signal,
        redirect: "manual"
      });
      providerRequestId = response.headers.get("x-request-id");
      if (response.status >= 300 && response.status < 400) throw new Error("classifier_redirect_rejected");
      const data = await response.json();
      if (!response.ok) throw new Error(`classifier_http_${response.status}`);
      providerModel = data.model || null;
      providerUsage = data.usage || null;
      if (providerModel !== MODEL || data?.choices?.[0]?.finish_reason !== "stop" ||
          data?.choices?.[0]?.message?.role !== "assistant" || data?.choices?.[0]?.message?.refusal ||
          data?.choices?.[0]?.message?.tool_calls?.length) throw new Error("classifier_completion_invalid");
      return JSON.parse(data.choices[0].message.content);
    }
  };

  const started = Date.now();
  const envelope = buildClassificationEnvelope(testCase.text);
  const route = await classifyRequest(testCase.text, { classifier: provider });
  const expected = labels.get(testCase.id);
  promptTokens += Number(providerUsage?.prompt_tokens || 0);
  completionTokens += Number(providerUsage?.completion_tokens || 0);
  const costUsd = promptTokens * INPUT_USD_PER_MTOK / 1_000_000 +
    completionTokens * OUTPUT_USD_PER_MTOK / 1_000_000;
  if (costUsd > HARD_RUN_CAP_USD) throw new Error("final_blind_run_cost_cap_exceeded");
  rows.push({
    id: testCase.id,
    expected: expected.outcome || expected.acceptableOutcomes?.map((row) => row.outcome).join("|"),
    actual: labelFor(route),
    pass: accepted(expected, route, envelope),
    expectedClauses: expected.criticalClauses || null,
    actualClauses: (route.classification?.clauses || []).map(clauseLabel),
    route: { outcome: route.outcome, domain: route.domain, task: route.task, risk: route.risk,
      boundary: route.boundary, currentness: route.currentness, confidence: route.confidence,
      reasonCodes: route.reasonCodes, hasUntrustedContent: route.hasUntrustedContent },
    provider: { model: providerModel, requestId: providerRequestId, usage: providerUsage },
    elapsedMs: Date.now() - started
  });
  const receipt = {
    schemaVersion: "fairy-classifier-beta-final-blind-run.v1",
    setId: send.fixtureSet,
    sourceSha256: EXPECTED_SOURCE_SHA256,
    casesSha256: EXPECTED_CASES_SHA256,
    labelsSha256: EXPECTED_LABELS_SHA256,
    model: MODEL,
    oneAttemptNoRetry: true,
    completed: rows.length,
    caseCount: cases.length,
    passed: rows.filter((row) => row.pass).length,
    failed: rows.filter((row) => !row.pass).length,
    usage: { promptTokens, completionTokens, costUsd },
    pricingBasis: { inputUsdPerMillionTokens: INPUT_USD_PER_MTOK,
      outputUsdPerMillionTokens: OUTPUT_USD_PER_MTOK,
      source: "OpenAI official model page checked 2026-09-01" },
    rows
  };
  const tempPath = new URL("PROVIDER-RUN.private.json.tmp", fixtureDir);
  await fs.writeFile(tempPath, JSON.stringify(receipt, null, 2) + "\n", { mode: 0o600 });
  await fs.rename(tempPath, outputPath);
}

const bytes = await fs.readFile(outputPath);
const final = JSON.parse(bytes);
process.stdout.write(JSON.stringify({ completed: final.completed, passed: final.passed,
  failed: final.failed, usage: final.usage, receiptSha256: sha256(bytes) }) + "\n");
process.exitCode = final.failed ? 1 : 0;
