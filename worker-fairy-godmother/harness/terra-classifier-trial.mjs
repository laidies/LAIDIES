import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";

import { buildExportArtifacts, parseJsonl, sha256, stableStringify } from "./lib.mjs";

export const REQUEST_CONFIGURATION = Object.freeze({
  schemaVersion: "1.0.0",
  provider: "openai",
  endpoint: "https://api.openai.com/v1/chat/completions",
  model: "gpt-5.6-terra",
  reasoningEffort: "low",
  responseFormat: "json_object",
  serviceTier: "default",
  store: false,
  maxCompletionTokens: 4096,
  timeoutMs: 5000,
  retryCount: 0
});

export const PRICING = Object.freeze({
  inputUsdPerMillionTokens: 2,
  outputUsdPerMillionTokens: 12,
  conservativeInputUsdPerMillionTokens: 2.5,
  maxTrialUsd: 5,
  conservativeInputFramingTokens: 1024
});

function writeDurable(file, bytes, mode = 0o600) {
  fs.writeFileSync(file, bytes, { mode });
  const descriptor = fs.openSync(file, "r");
  try { fs.fsyncSync(descriptor); } finally { fs.closeSync(descriptor); }
}

function appendDurable(file, row) {
  fs.appendFileSync(file, `${JSON.stringify(row)}\n`, { mode: 0o600 });
  const descriptor = fs.openSync(file, "r");
  try { fs.fsyncSync(descriptor); } finally { fs.closeSync(descriptor); }
}

export function verifyPrivateKeyFile(keyFile) {
  const resolved = path.resolve(keyFile);
  const link = fs.lstatSync(resolved);
  const stat = fs.statSync(resolved);
  if (link.isSymbolicLink() || !stat.isFile() || (stat.mode & 0o777) !== 0o600) {
    throw new Error("trial_key_must_be_regular_mode_600");
  }
  if (typeof process.getuid === "function" && stat.uid !== process.getuid()) {
    throw new Error("trial_key_must_be_owned_by_runner");
  }
  const key = fs.readFileSync(resolved, "utf8").trim();
  if (!/^sk-[A-Za-z0-9_-]{20,}$/.test(key)) throw new Error("invalid_trial_api_key");
  return key;
}

export function requestFor(record, systemPrompt) {
  return {
    model: REQUEST_CONFIGURATION.model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: JSON.stringify(record.classifierInput) }
    ],
    reasoning_effort: REQUEST_CONFIGURATION.reasoningEffort,
    response_format: { type: REQUEST_CONFIGURATION.responseFormat },
    service_tier: REQUEST_CONFIGURATION.serviceTier,
    store: REQUEST_CONFIGURATION.store,
    max_completion_tokens: REQUEST_CONFIGURATION.maxCompletionTokens
  };
}

export function conservativeRequestCostUsd(request) {
  const conservativeInputTokens = Buffer.byteLength(JSON.stringify(request)) +
    PRICING.conservativeInputFramingTokens;
  return (
    conservativeInputTokens * PRICING.conservativeInputUsdPerMillionTokens +
    REQUEST_CONFIGURATION.maxCompletionTokens * PRICING.outputUsdPerMillionTokens
  ) / 1_000_000;
}

export function assertTrialBudget(totalWorstCaseUsd, maxTrialUsd = PRICING.maxTrialUsd) {
  if (!(totalWorstCaseUsd > 0) || !Number.isFinite(totalWorstCaseUsd) ||
      totalWorstCaseUsd > maxTrialUsd) {
    throw new Error("trial_worst_case_budget_exceeds_approved_cap");
  }
  return totalWorstCaseUsd;
}

export function validateTrialPlan({ providerInputBytes, systemPromptBytes, sendManifestBytes }) {
  const canonical = buildExportArtifacts();
  const records = parseJsonl(providerInputBytes);
  const systemPromptFile = Buffer.from(systemPromptBytes).toString("utf8");
  const systemPrompt = systemPromptFile.endsWith("\n")
    ? systemPromptFile.slice(0, -1)
    : systemPromptFile;
  const sendManifest = JSON.parse(Buffer.from(sendManifestBytes).toString("utf8"));
  const expectedManifestFiles = [
    { path: "provider-input.jsonl", sha256: sha256(providerInputBytes) },
    { path: "classifier-system-prompt.txt", sha256: sha256(systemPromptBytes) }
  ];
  if (Buffer.from(providerInputBytes).toString("utf8") !== canonical.providerJsonl ||
      systemPromptFile !== `${canonical.systemPrompt}\n` ||
      records.length !== 63 || new Set(records.map((row) => row.itemId)).size !== 63 ||
      records.some((row) => !/^item-\d{4}$/.test(row.itemId || "") ||
        !row.classifierInput || Object.keys(row).some((key) =>
          !["itemId", "classifierInput"].includes(key))) ||
      stableStringify(sendManifest.allowlistedFiles) !== stableStringify(expectedManifestFiles) ||
      stableStringify(sendManifest.prohibitedFiles) !==
        stableStringify(["join-map.json", "export-metadata.json"]) ||
      sendManifest.expectedLabelsIncluded !== false) {
    throw new Error("trial_send_bundle_not_exactly_allowlisted");
  }
  const requests = records.map((record) => requestFor(record, systemPrompt));
  const reservations = requests.map(conservativeRequestCostUsd);
  const totalWorstCaseUsd = reservations.reduce((sum, value) => sum + value, 0);
  assertTrialBudget(totalWorstCaseUsd);
  return { records, systemPrompt, requests, reservations, totalWorstCaseUsd };
}

export function validateRequestHashBindings(outputRows) {
  const canonical = buildExportArtifacts();
  const rows = new Map(outputRows.map((row) => [row.itemId, row]));
  if (rows.size !== canonical.providerRecords.length) {
    throw new Error("trial_request_hash_coverage_invalid");
  }
  for (const record of canonical.providerRecords) {
    const row = rows.get(record.itemId);
    const expected = sha256(stableStringify(requestFor(record, canonical.systemPrompt)));
    if (!row || row.requestSha256 !== expected) {
      throw new Error(`trial_request_hash_mismatch:${record.itemId}`);
    }
  }
  return true;
}

function validatePrivateDirectory(directory, errorCode) {
  const stat = fs.statSync(directory);
  if (!stat.isDirectory() || (stat.mode & 0o777) !== 0o700 ||
      (typeof process.getuid === "function" && stat.uid !== process.getuid())) {
    throw new Error(errorCode);
  }
}

function claimSingleAuthorizedTrial(authorityJournal, apiKey, totalWorstCaseUsd,
  requestConfigurationSha256) {
  const journal = path.resolve(authorityJournal);
  validatePrivateDirectory(journal, "trial_authority_journal_must_be_private_mode_700");
  const lock = path.join(journal, ".claim.lock");
  const claim = path.join(journal, "fairy-terra-classifier-20260831.claimed.json");
  fs.mkdirSync(lock);
  try {
    if (fs.existsSync(claim)) throw new Error("authorized_trial_already_claimed");
    writeDurable(claim, `${JSON.stringify({
      schemaVersion: "1.0.0",
      trialId: "fairy-terra-classifier-20260831",
      keyFingerprintSha256: sha256(apiKey),
      requestConfigurationSha256,
      attemptsAuthorized: 63,
      retriesAuthorized: 0,
      budgetCapUsd: PRICING.maxTrialUsd,
      fullWorstCaseReservedUsd: totalWorstCaseUsd,
      claimedAt: new Date().toISOString()
    }, null, 2)}\n`);
  } finally {
    fs.rmdirSync(lock);
  }
  return sha256(fs.readFileSync(claim));
}

function reserveAttempt(journalDirectory, itemId, attemptNumber, reservedUsd,
  cumulativeReservedUsd, remainingWorstCaseUsd, authorityClaimSha256) {
  const lock = `${journalDirectory}.lock`;
  fs.mkdirSync(lock);
  try {
    const existing = fs.readdirSync(journalDirectory)
      .filter((name) => name.endsWith(".reserved.json"));
    if (existing.some((name) => name.startsWith(`${itemId}.`))) {
      throw new Error("trial_attempt_already_reserved");
    }
    if (attemptNumber !== existing.length + 1 || cumulativeReservedUsd > PRICING.maxTrialUsd) {
      throw new Error("trial_attempt_or_budget_reservation_invalid");
    }
    writeDurable(path.join(journalDirectory, `${itemId}.${attemptNumber}.reserved.json`),
      `${JSON.stringify({
        schemaVersion: "1.0.0",
        itemId,
        attemptNumber,
        retryCount: 0,
        reservedUsd,
        cumulativeReservedUsd,
        remainingWorstCaseUsd,
        authorityClaimSha256,
        reservedAt: new Date().toISOString()
      }, null, 2)}\n`);
  } finally {
    fs.rmdirSync(lock);
  }
}

export async function postChatCompletion({ apiKey, request, runnerRequestId }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_CONFIGURATION.timeoutMs);
  const started = performance.now();
  try {
    const response = await fetch(REQUEST_CONFIGURATION.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Client-Request-Id": runnerRequestId
      },
      body: JSON.stringify(request),
      signal: controller.signal,
      redirect: "error"
    });
    const bodyText = await response.text();
    let body;
    try { body = JSON.parse(bodyText); }
    catch { body = { unparsedBodyBytes: Buffer.byteLength(bodyText) }; }
    return {
      ok: response.ok,
      status: response.status,
      requestId: response.headers.get("x-request-id"),
      latencyMs: Math.max(0.001, Math.round((performance.now() - started) * 1000) / 1000),
      body
    };
  } finally {
    clearTimeout(timer);
  }
}

function safeError(error) {
  if (error?.name === "AbortError") return "provider_timeout_no_retry";
  return "provider_transport_error_no_retry";
}

function actualCostUsd(inputTokens, outputTokens) {
  return (
    inputTokens * PRICING.inputUsdPerMillionTokens +
    outputTokens * PRICING.outputUsdPerMillionTokens
  ) / 1_000_000;
}

export async function runClassifierTrial({
  providerInputPath,
  systemPromptPath,
  sendManifestPath,
  keyFile,
  authorityJournal,
  outputDirectory,
  runId,
  transport = postChatCompletion
}) {
  const requestConfigurationSha256 = sha256(stableStringify(REQUEST_CONFIGURATION));
  if (runId !== `fairy-terra-20260831-${requestConfigurationSha256}`) {
    throw new Error("trial_run_id_must_bind_exact_request_configuration");
  }
  const apiKey = verifyPrivateKeyFile(keyFile);
  const providerInputBytes = fs.readFileSync(providerInputPath);
  const systemPromptBytes = fs.readFileSync(systemPromptPath);
  const sendManifestBytes = fs.readFileSync(sendManifestPath);
  const plan = validateTrialPlan({ providerInputBytes, systemPromptBytes, sendManifestBytes });
  const out = path.resolve(outputDirectory);
  fs.mkdirSync(out, { recursive: false, mode: 0o700 });
  const journal = path.join(out, "reservations");
  fs.mkdirSync(journal, { mode: 0o700 });
  const outputsPath = path.join(out, "provider-output.jsonl");
  const receiptsPath = path.join(out, "provider-usage-receipts.json");
  writeDurable(outputsPath, "");
  writeDurable(receiptsPath, "[]");
  writeDurable(path.join(out, "request-configuration.json"),
    `${stableStringify(REQUEST_CONFIGURATION)}\n`);
  const authorityClaimSha256 = claimSingleAuthorizedTrial(
    authorityJournal,
    apiKey,
    plan.totalWorstCaseUsd,
    requestConfigurationSha256
  );

  const receipts = [];
  let cumulativeReservedUsd = 0;
  let estimatedActualCostUsd = 0;
  let completed = 0;
  for (const [index, record] of plan.records.entries()) {
    cumulativeReservedUsd += plan.reservations[index];
    const remainingWorstCaseUsd = plan.reservations
      .slice(index)
      .reduce((sum, value) => sum + value, 0);
    reserveAttempt(journal, record.itemId, index + 1, plan.reservations[index],
      cumulativeReservedUsd, remainingWorstCaseUsd, authorityClaimSha256);
    const request = plan.requests[index];
    const requestSha256 = sha256(stableStringify(request));
    const runnerRequestId = `openai-${runId}-${record.itemId}`;
    let provider;
    try {
      provider = await transport({ apiKey, request, record, runnerRequestId });
    } catch (error) {
      appendDurable(outputsPath, {
        itemId: record.itemId,
        error: safeError(error),
        latencyMs: REQUEST_CONFIGURATION.timeoutMs,
        latencySource: "runner_monotonic",
        metricsStatus: "unsupported",
        requestSha256
      });
      continue;
    }
    const content = provider.body?.choices?.[0]?.message?.content;
    const usage = provider.body?.usage;
    const inputTokens = usage?.prompt_tokens;
    const outputTokens = usage?.completion_tokens;
    let classification;
    try { classification = JSON.parse(content); } catch { classification = null; }
    const receiptReady = provider.ok && classification &&
      typeof provider.requestId === "string" && provider.requestId.length >= 8 &&
      typeof provider.body?.id === "string" && provider.body.id.length >= 8 &&
      provider.body?.model === REQUEST_CONFIGURATION.model &&
      Number.isInteger(inputTokens) && inputTokens > 0 &&
      Number.isInteger(outputTokens) && outputTokens > 0;
    if (!receiptReady) {
      appendDurable(outputsPath, {
        itemId: record.itemId,
        error: provider.ok ? "provider_response_invalid_no_retry" :
          `provider_http_${provider.status}_no_retry`,
        latencyMs: provider.latencyMs,
        latencySource: "runner_monotonic",
        metricsStatus: "unsupported",
        requestSha256,
        ...(typeof provider.body?.model === "string"
          ? { providerModel: provider.body.model }
          : {})
      });
      continue;
    }
    const receipt = {
      schemaVersion: "1.0.0",
      itemId: record.itemId,
      receiptId: `receipt-${provider.body.id}`,
      requestId: provider.requestId,
      responseId: provider.body.id,
      runId,
      receivedAt: new Date().toISOString(),
      model: provider.body.model,
      requestSha256,
      inputTokens,
      outputTokens
    };
    const cost = actualCostUsd(inputTokens, outputTokens);
    estimatedActualCostUsd += cost;
    if (estimatedActualCostUsd > PRICING.maxTrialUsd) {
      throw new Error("trial_actual_cost_exceeds_approved_cap");
    }
    receipts.push(receipt);
    writeDurable(receiptsPath, stableStringify(receipts));
    appendDurable(outputsPath, {
      itemId: record.itemId,
      classification,
      latencyMs: provider.latencyMs,
      latencySource: "runner_monotonic",
      metricsStatus: "measured",
      usageSource: "provider_response",
      usageReceiptId: receipt.receiptId,
      usageReceiptSha256: sha256(stableStringify(receipt)),
      providerRequestId: receipt.requestId,
      providerResponseId: receipt.responseId,
      providerModel: receipt.model,
      requestSha256,
      inputTokens,
      outputTokens,
      estimatedCostUsd: cost
    });
    completed += 1;
  }
  const summary = {
    schemaVersion: "1.0.0",
    runId,
    cases: plan.records.length,
    completed,
    attempts: plan.records.length,
    retries: 0,
    budgetCapUsd: PRICING.maxTrialUsd,
    totalWorstCaseReservedUsd: plan.totalWorstCaseUsd,
    estimatedActualCostUsd,
    requestConfigurationSha256,
    authorityClaimSha256,
    providerOutputSha256: sha256(fs.readFileSync(outputsPath)),
    providerUsageReceiptsSha256: sha256(fs.readFileSync(receiptsPath))
  };
  writeDurable(path.join(out, "run-summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
  return { summary, outputsPath, receiptsPath };
}
