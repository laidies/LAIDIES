import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { createHash } from 'node:crypto';

import {
  LIMITS,
  TRIAL_ID,
  captureTrialRequests,
  reserveTrialAttempt,
  trial,
  validateCases
} from './prepare-sol-trial.mjs';

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const keyFile = argument('--key-file');
const outDirectory = argument('--out');
if (!keyFile || !outDirectory) {
  throw new Error('usage: node run-sol-answer-trial.mjs --key-file /private/key --out /private/run');
}

const apiKey = fs.readFileSync(path.resolve(keyFile), 'utf8').trim();
if (!/^sk-[A-Za-z0-9_-]{20,}$/.test(apiKey)) throw new Error('invalid_api_key_file');
validateCases(trial);

const out = path.resolve(outDirectory);
const journal = path.join(out, 'reservations');
const resultsPath = path.join(out, 'case-results.jsonl');
fs.mkdirSync(out, { recursive: false, mode: 0o700 });
fs.writeFileSync(resultsPath, '', { mode: 0o600 });

function responseRequest(captured) {
  return {
    model: captured.request.model,
    input: captured.request.messages,
    reasoning: { effort: captured.request.reasoning_effort },
    max_output_tokens: captured.request.max_completion_tokens,
    store: false,
    service_tier: 'default',
    text: { format: { type: 'json_object' } },
    truncation: 'disabled'
  };
}

async function post(endpoint, body, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = performance.now();
  try {
    const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      signal: controller.signal,
      redirect: 'error'
    });
    const text = await response.text();
    const latencyMs = Math.round((performance.now() - started) * 1000) / 1000;
    let data;
    try { data = JSON.parse(text); } catch { data = { unparsed: true, bytes: Buffer.byteLength(text) }; }
    return { ok: response.ok, status: response.status, latencyMs, data };
  } finally {
    clearTimeout(timer);
  }
}

function outputText(data) {
  const chunks = [];
  for (const item of data?.output || []) {
    if (item?.type !== 'message' || item?.status !== 'completed') continue;
    for (const content of item.content || []) {
      if (content?.type === 'output_text' && typeof content.text === 'string') chunks.push(content.text);
    }
  }
  return chunks.join('').trim();
}

function append(row) {
  fs.appendFileSync(resultsPath, `${JSON.stringify(row)}\n`);
  const fd = fs.openSync(resultsPath, 'r');
  try { fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
}

const captures = await captureTrialRequests();
const cases = new Map(trial.cases.map(item => [item.id, item]));
let actualMicroUsd = 0;
let completed = 0;

for (const captured of captures) {
  const request = responseRequest(captured);
  const countBody = {
    model: request.model,
    input: request.input,
    reasoning: request.reasoning,
    text: request.text,
    truncation: request.truncation
  };
  const counted = await post('responses/input_tokens', countBody, 20_000);
  if (!counted.ok || !Number.isInteger(counted.data?.input_tokens)) {
    append({
      trialId: TRIAL_ID,
      caseId: captured.id,
      status: 'input_token_count_failed_no_inference',
      countStatus: counted.status,
      countLatencyMs: counted.latencyMs
    });
    continue;
  }

  const reservation = reserveTrialAttempt(journal, captured.id, counted.data.input_tokens);
  const requestSha256 = createHash('sha256').update(JSON.stringify(request)).digest('hex');
  let provider;
  try {
    provider = await post('responses', request, 20_000);
  } catch (error) {
    append({
      trialId: TRIAL_ID,
      caseId: captured.id,
      family: cases.get(captured.id).family,
      risk: cases.get(captured.id).risk,
      status: error?.name === 'AbortError' ? 'timeout_no_retry' : 'transport_error_no_retry',
      inputTokensCounted: counted.data.input_tokens,
      countLatencyMs: counted.latencyMs,
      reservedMicroUsd: reservation.reservedMicroUsd,
      requestSha256
    });
    continue;
  }

  const text = outputText(provider.data);
  const usage = provider.data?.usage;
  const inputTokens = usage?.input_tokens;
  const outputTokens = usage?.output_tokens;
  const measured = Number.isInteger(inputTokens) && Number.isInteger(outputTokens);
  const estimatedMicroUsd = measured
    ? inputTokens * LIMITS.inputMicroUsdPerToken + outputTokens * LIMITS.outputMicroUsdPerToken
    : null;
  if (estimatedMicroUsd !== null) actualMicroUsd += estimatedMicroUsd;
  if (actualMicroUsd > LIMITS.budgetMicroUsd) throw new Error('actual_trial_budget_exceeded');

  let answer = null;
  let answerValidJson = false;
  if (text) {
    try { answer = JSON.parse(text); answerValidJson = answer && typeof answer === 'object'; }
    catch { answer = text; }
  }
  const success = provider.ok && provider.data?.status === 'completed' && answerValidJson && measured;
  if (success) completed++;
  append({
    trialId: TRIAL_ID,
    caseId: captured.id,
    family: cases.get(captured.id).family,
    risk: cases.get(captured.id).risk,
    status: success ? 'completed' : 'provider_failure_no_retry',
    providerStatus: provider.status,
    responseStatus: provider.data?.status || null,
    responseId: provider.data?.id || null,
    model: provider.data?.model || request.model,
    requestSha256,
    inputTokensCounted: counted.data.input_tokens,
    countLatencyMs: counted.latencyMs,
    inferenceLatencyMs: provider.latencyMs,
    inputTokens: measured ? inputTokens : null,
    outputTokens: measured ? outputTokens : null,
    reasoningTokens: measured ? (usage.output_tokens_details?.reasoning_tokens ?? null) : null,
    cachedInputTokens: measured ? (usage.input_tokens_details?.cached_tokens ?? null) : null,
    estimatedCostUsd: estimatedMicroUsd === null ? null : estimatedMicroUsd / 1_000_000,
    reservedMicroUsd: reservation.reservedMicroUsd,
    answer
  });
}

const summary = {
  trialId: TRIAL_ID,
  model: 'gpt-5.6-sol',
  reasoningEffort: 'medium',
  cases: captures.length,
  completed,
  noRetries: true,
  budgetCapUsd: LIMITS.budgetMicroUsd / 1_000_000,
  conditionalReservedUsd: fs.readdirSync(journal).filter(name => name.endsWith('.reserved.json')).length *
    (LIMITS.maxInputTokens * LIMITS.inputMicroUsdPerToken + LIMITS.maxCompletionTokens * LIMITS.outputMicroUsdPerToken) / 1_000_000,
  estimatedActualCostUsd: actualMicroUsd / 1_000_000,
  resultsPath
};
fs.writeFileSync(path.join(out, 'run-summary.json'), `${JSON.stringify(summary, null, 2)}\n`, { mode: 0o600 });
console.log(JSON.stringify(summary, null, 2));
if (completed !== captures.length) process.exitCode = 2;
