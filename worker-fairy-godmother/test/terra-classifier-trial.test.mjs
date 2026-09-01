import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { buildExportArtifacts, sha256, stableStringify } from "../harness/lib.mjs";
import {
  PRICING,
  REQUEST_CONFIGURATION,
  assertTrialBudget,
  runClassifierTrial,
  validateRequestHashBindings,
  validateTrialPlan,
  verifyPrivateKeyFile
} from "../harness/terra-classifier-trial.mjs";

function fixture() {
  const artifacts = buildExportArtifacts();
  return {
    artifacts,
    providerInputBytes: Buffer.from(artifacts.providerJsonl),
    systemPromptBytes: Buffer.from(`${artifacts.systemPrompt}\n`),
    sendManifestBytes: Buffer.from(JSON.stringify(artifacts.sendManifest))
  };
}

test("trial plan is exact, synthetic-only and below the approved worst-case budget", () => {
  const current = fixture();
  const plan = validateTrialPlan(current);
  assert.equal(plan.records.length, 63);
  assert.ok(plan.totalWorstCaseUsd > 3.9 && plan.totalWorstCaseUsd < PRICING.maxTrialUsd);
  assert.throws(() => assertTrialBudget(PRICING.maxTrialUsd + 0.000001),
    /budget_exceeds/);

  const leaked = JSON.parse(current.providerInputBytes.toString("utf8").split("\n")[0]);
  leaked.expected = { decision: "allow" };
  const lines = current.providerInputBytes.toString("utf8").trimEnd().split("\n");
  lines[0] = JSON.stringify(leaked);
  assert.throws(() => validateTrialPlan({
    ...current,
    providerInputBytes: Buffer.from(`${lines.join("\n")}\n`)
  }), /exactly_allowlisted/);
});

test("trial key must be a regular runner-owned mode-600 file", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "fairy-key-test-"));
  const key = path.join(directory, "trial.key");
  fs.writeFileSync(key, `sk-${"a".repeat(30)}`, { mode: 0o644 });
  assert.throws(() => verifyPrivateKeyFile(key), /mode_600/);
  fs.chmodSync(key, 0o600);
  assert.match(verifyPrivateKeyFile(key), /^sk-/);
});

test("one transport attempt per frozen case, zero retry, with durable failure row", async () => {
  const current = fixture();
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "fairy-terra-test-"));
  const send = path.join(directory, "send");
  fs.mkdirSync(send);
  const providerInputPath = path.join(send, "provider-input.jsonl");
  const systemPromptPath = path.join(send, "classifier-system-prompt.txt");
  const sendManifestPath = path.join(send, "send-manifest.json");
  fs.writeFileSync(providerInputPath, current.providerInputBytes);
  fs.writeFileSync(systemPromptPath, current.systemPromptBytes);
  fs.writeFileSync(sendManifestPath, current.sendManifestBytes);
  const keyFile = path.join(directory, "trial.key");
  fs.writeFileSync(keyFile, `sk-${"b".repeat(30)}`, { mode: 0o600 });
  let calls = 0;
  const transport = async ({ record }) => {
    calls += 1;
    if (record.itemId === "item-0007") {
      const error = new Error("timeout");
      error.name = "AbortError";
      throw error;
    }
    return {
      ok: true,
      status: 200,
      requestId: `req_${record.itemId}`,
      latencyMs: 100 + calls,
      body: {
        id: `chatcmpl_${record.itemId}`,
        model: REQUEST_CONFIGURATION.model,
        choices: [{ message: { content: "{\"schemaVersion\":\"1.0.0\"}" } }],
        usage: { prompt_tokens: 100 + calls, completion_tokens: 20 + calls }
      }
    };
  };
  const result = await runClassifierTrial({
    providerInputPath,
    systemPromptPath,
    sendManifestPath,
    keyFile,
    authorityJournal: (() => {
      const value = path.join(directory, "authority");
      fs.mkdirSync(value, { mode: 0o700 });
      return value;
    })(),
    outputDirectory: path.join(directory, "results"),
    runId: `fairy-terra-20260831-${sha256(stableStringify(REQUEST_CONFIGURATION))}`,
    transport
  });
  assert.equal(calls, 63);
  assert.equal(result.summary.attempts, 63);
  assert.equal(result.summary.retries, 0);
  assert.equal(result.summary.completed, 62);
  const rows = fs.readFileSync(result.outputsPath, "utf8").trim().split("\n").map(JSON.parse);
  assert.equal(rows.length, 63);
  assert.equal(validateRequestHashBindings(rows), true);
  const mutated = structuredClone(rows);
  mutated[0].requestSha256 = "0".repeat(64);
  assert.throws(() => validateRequestHashBindings(mutated), /request_hash_mismatch/);
  assert.equal(rows[6].error, "provider_timeout_no_retry");
  assert.equal(fs.readdirSync(path.join(directory, "results", "reservations")).length, 63);
  await assert.rejects(() => runClassifierTrial({
    providerInputPath,
    systemPromptPath,
    sendManifestPath,
    keyFile,
    authorityJournal: path.join(directory, "authority"),
    outputDirectory: path.join(directory, "second-results"),
    runId: `fairy-terra-20260831-${sha256(stableStringify(REQUEST_CONFIGURATION))}`,
    transport
  }), /already_claimed/);
  assert.equal(calls, 63);
});

test("missing or mismatched provider model is retained as failure and never retried", async () => {
  const current = fixture();
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "fairy-terra-model-test-"));
  const send = path.join(directory, "send");
  const authorityJournal = path.join(directory, "authority");
  fs.mkdirSync(send);
  fs.mkdirSync(authorityJournal, { mode: 0o700 });
  const paths = {
    providerInputPath: path.join(send, "provider-input.jsonl"),
    systemPromptPath: path.join(send, "classifier-system-prompt.txt"),
    sendManifestPath: path.join(send, "send-manifest.json")
  };
  fs.writeFileSync(paths.providerInputPath, current.providerInputBytes);
  fs.writeFileSync(paths.systemPromptPath, current.systemPromptBytes);
  fs.writeFileSync(paths.sendManifestPath, current.sendManifestBytes);
  const keyFile = path.join(directory, "trial.key");
  fs.writeFileSync(keyFile, `sk-${"c".repeat(30)}`, { mode: 0o600 });
  let calls = 0;
  const result = await runClassifierTrial({
    ...paths,
    keyFile,
    authorityJournal,
    outputDirectory: path.join(directory, "results"),
    runId: `fairy-terra-20260831-${sha256(stableStringify(REQUEST_CONFIGURATION))}`,
    transport: async ({ record }) => {
      calls += 1;
      return {
        ok: true,
        status: 200,
        requestId: `req_${record.itemId}`,
        latencyMs: 100 + calls,
        body: {
          id: `chatcmpl_${record.itemId}`,
          model: record.itemId === "item-0001" ? "different-model" :
            REQUEST_CONFIGURATION.model,
          choices: [{ message: { content: "{\"schemaVersion\":\"1.0.0\"}" } }],
          usage: { prompt_tokens: 100 + calls, completion_tokens: 20 + calls }
        }
      };
    }
  });
  assert.equal(calls, 63);
  assert.equal(result.summary.completed, 62);
  const first = JSON.parse(fs.readFileSync(result.outputsPath, "utf8").split("\n")[0]);
  assert.equal(first.error, "provider_response_invalid_no_retry");
});
