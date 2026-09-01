import crypto from "node:crypto";
import fs from "node:fs/promises";

import { buildClassificationEnvelope, classifyRequest } from "../src/index.js";

const MODEL = "gpt-5.6-sol";
const INPUT_USD_PER_MTOK = 4;
const OUTPUT_USD_PER_MTOK = 20;
const MAX_COMPLETION_TOKENS = 4096;
const HARD_RUN_CAP_USD = 10;
const fixtureDir = new URL("../../operations/test-fixtures/fairy-godmother/classifier-beta-blind-fresh-2026-09-01/", import.meta.url);
const sendPath = new URL("send-cases.json", fixtureDir);
const expectedPath = new URL("expected-labels.private.json", fixtureDir);
const outputPath = new URL("provider-run.private.json", fixtureDir);

if (process.env.FAIRY_BLIND_RUN_AUTHORIZED !== "2026-09-01-sol-low-one-pass") {
  throw new Error("blind_run_not_authorized");
}
const apiKey = process.env.OPENAI_API_KEY || "";
if (!apiKey.startsWith("sk-")) throw new Error("openai_key_missing");

const send = JSON.parse(await fs.readFile(sendPath, "utf8"));
const expected = JSON.parse(await fs.readFile(expectedPath, "utf8"));
if (!Array.isArray(send.cases) || send.cases.length !== 72 ||
    Object.keys(expected.labels || {}).length !== send.cases.length) {
  throw new Error("blind_set_invalid");
}

function labelFor(route) {
  if (route.outcome === "boundary") return `boundary:${route.boundary}`;
  if (route.outcome === "allow" && route.hasUntrustedContent) return "allow_with_transform_untrusted";
  return route.outcome;
}

function accepted(expectedLabel, actualLabel) {
  if (expectedLabel === actualLabel) return true;
  return expectedLabel === "allow_or_uncertain_language" &&
    ["allow", "uncertain"].includes(actualLabel);
}

const rows = [];
let promptTokens = 0;
let completionTokens = 0;
for (const testCase of send.cases) {
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
            { role: "system", content: (await import("../src/index.js")).CLASSIFIER_SYSTEM_PROMPT },
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
  const route = await classifyRequest(testCase.send, { classifier: provider });
  const actual = labelFor(route);
  const expectedLabel = expected.labels[testCase.id];
  promptTokens += Number(providerUsage?.prompt_tokens || 0);
  completionTokens += Number(providerUsage?.completion_tokens || 0);
  const costUsd = promptTokens * INPUT_USD_PER_MTOK / 1_000_000 +
    completionTokens * OUTPUT_USD_PER_MTOK / 1_000_000;
  if (costUsd > HARD_RUN_CAP_USD) throw new Error("blind_run_cost_cap_exceeded");
  rows.push({
    id: testCase.id,
    expected: expectedLabel,
    actual,
    pass: accepted(expectedLabel, actual),
    route: { outcome: route.outcome, domain: route.domain, task: route.task, risk: route.risk,
      boundary: route.boundary, currentness: route.currentness, confidence: route.confidence,
      reasonCodes: route.reasonCodes, hasUntrustedContent: route.hasUntrustedContent },
    provider: { model: providerModel, requestId: providerRequestId, usage: providerUsage },
    elapsedMs: Date.now() - started
  });
  const receipt = {
    schemaVersion: "fairy-classifier-beta-blind-run.v1",
    setId: send.setId,
    model: MODEL,
    oneAttemptNoRetry: true,
    completed: rows.length,
    caseCount: send.cases.length,
    passed: rows.filter((row) => row.pass).length,
    failed: rows.filter((row) => !row.pass).length,
    usage: { promptTokens, completionTokens, costUsd },
    pricingBasis: { inputUsdPerMillionTokens: INPUT_USD_PER_MTOK,
      outputUsdPerMillionTokens: OUTPUT_USD_PER_MTOK, source: "OpenAI official model page checked 2026-09-01" },
    rows
  };
  const tempPath = new URL("provider-run.private.json.tmp", fixtureDir);
  await fs.writeFile(tempPath, JSON.stringify(receipt, null, 2) + "\n", { mode: 0o600 });
  await fs.rename(tempPath, outputPath);
}

const bytes = await fs.readFile(outputPath);
const final = JSON.parse(bytes);
final.sha256 = crypto.createHash("sha256").update(bytes).digest("hex");
process.stdout.write(JSON.stringify({ completed: final.completed, passed: final.passed,
  failed: final.failed, usage: final.usage, receiptSha256: final.sha256 }) + "\n");
process.exitCode = final.failed ? 1 : 0;
