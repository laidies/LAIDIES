// Offline only: exercise the actual Worker to capture its exact answer requests.
// This module deliberately has no paid execution mode or access to real keys.
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import worker from '../src/index.js';
import { buildAdviceRequest, ADVICE_MODEL } from '../src/advice-provider.js';

export const trial = JSON.parse(fs.readFileSync(new URL('./sol-trial-cases.json', import.meta.url), 'utf8'));
export const LIMITS = Object.freeze({ attempts:20, budgetMicroUsd:5_000_000,
  maxInputTokens:12000, maxCompletionTokens:8192,
  inputMicroUsdPerToken:5, outputMicroUsdPerToken:20 });
export const MAX_RESERVED_PER_CALL = LIMITS.maxInputTokens * LIMITS.inputMicroUsdPerToken +
  LIMITS.maxCompletionTokens * LIMITS.outputMicroUsdPerToken;
export const TRIAL_ID = 'fairy-sol-answer-trial-20260831-v1';

export function validateCases(value) {
  if (!Array.isArray(value?.cases) || value.cases.length !== 20) throw new Error('exactly_20_cases_required');
  const ids = new Set(), counts = new Map();
  for (const c of value.cases) {
    if (!/^[a-z]+-\d\d$/.test(c.id) || ids.has(c.id) ||
        !['feedback','credit','workload','promotion','return'].includes(c.family) ||
        !['ordinary','sensitive'].includes(c.risk) || typeof c.prompt !== 'string' ||
        c.prompt.length < 20 || c.prompt.length > 8000 || typeof c.judge !== 'string' || !c.judge.trim()) {
      throw new Error('invalid_trial_case');
    }
    ids.add(c.id); counts.set(c.family, (counts.get(c.family) || 0) + 1);
  }
  if (counts.size !== 5 || [...counts.values()].some(n => n !== 4)) throw new Error('four_cases_per_family_required');
}

function fixedRouteForCase(c) {
  return { async classify(envelope) { return {
    schemaVersion:'1.0.0', language:{code:'en',supported:true,confidence:.99}, overallConfidence:.99,
    clauses:envelope.clauses.map(clause => ({ clauseId:clause.id, role:clause.roleHint,
      decision:clause.roleHint === 'quoted_content' ? 'transform_untrusted' : 'allow',
      domain:clause.roleHint === 'quoted_content' ? 'out_of_scope' : 'work_career',
      task:clause.roleHint === 'quoted_content' ? 'draft_or_rewrite' : 'advice_or_conversation',
      risk:clause.roleHint === 'quoted_content' ? 'sensitive' : c.risk, boundary:null,
      currentness:{required:false,category:'none'}, confidence:.99,
      reasonCodes:clause.roleHint === 'quoted_content' ? ['untrusted_content_isolated'] : [] }))
  }; }};
}

export async function captureTrialRequests(value = trial) {
  validateCases(value);
  const originalFetch = globalThis.fetch, captured = [];
  try {
    for (const c of value.cases) {
      let body, count = 0;
      globalThis.fetch = async (url, options) => {
        count++;
        if (url !== 'https://api.openai.com/v1/chat/completions' || options.method !== 'POST') throw new Error('unexpected_request');
        body = JSON.parse(options.body);
        // Do not invent a successful advice result. Stop after request capture.
        return new Response('offline capture; no provider request', {status:503});
      };
      const response = await worker.fetch(new Request('https://test.invalid/', {
        method:'POST', headers:{Origin:'https://laidies.ai','Content-Type':'application/json'},
        body:JSON.stringify({prompt:c.prompt})
      }), {OPENAI_API_KEY:'synthetic-offline-only', CAREER_GUIDANCE_PILOT:'1',
        REQUEST_CLASSIFIER:fixedRouteForCase(c)}, {waitUntil(){}});
      const outcome = await response.json();
      if (count !== 1 || outcome.type !== 'service_error') throw new Error('capture_did_not_reach_answer_once');
      if (JSON.stringify(body) !== JSON.stringify(buildAdviceRequest({}, body.messages))) throw new Error('request_settings_drift');
      if (body.messages.some(m => m.content.includes(c.judge))) throw new Error('evaluation_judgment_leaked');
      const serialized = JSON.stringify(body);
      captured.push({id:c.id, request:body, sha256:createHash('sha256').update(serialized).digest('hex'),
        requestBytes:Buffer.byteLength(serialized), inputTokens:null});
    }
  } finally { globalThis.fetch = originalFetch; }
  return captured;
}

export function preflightReport(captures, {isolatedKeyAvailable = false} = {}) {
  return {status:'HOLD', model:ADVICE_MODEL, scenarios:captures.length, providerCalls:0,
    capturedRequestBytes:{min:Math.min(...captures.map(c => c.requestBytes)), max:Math.max(...captures.map(c => c.requestBytes))},
    limits:LIMITS, conditionalWorstCaseUsd:MAX_RESERVED_PER_CALL * LIMITS.attempts / 1_000_000,
    blockers:[...(!isolatedKeyAvailable ? ['isolated_test_access_missing'] : []),
      'verified_Sol_chat_input_token_bound_missing'],
    note:'Byte counts are not token counts. Cost is conditional on the unverified token bound. No paid runner or advice-quality result exists.'};
}

// Call this immediately before dispatch, after exact model-aware token counting.
// A timeout or provider error does not remove the reservation or allow retry.
export function reserveTrialAttempt(journalDirectory, caseId, verifiedInputTokens) {
  validateCases(trial);
  if (!trial.cases.some(c => c.id === caseId)) throw new Error('unknown_trial_case');
  if (!Number.isInteger(verifiedInputTokens) || verifiedInputTokens < 1 ||
      verifiedInputTokens > LIMITS.maxInputTokens) throw new Error('unverified_or_oversized_input_tokens');
  fs.mkdirSync(journalDirectory, {recursive:true,mode:0o700});
  const lockPath = `${journalDirectory}/reservation.lock`;
  let lock;
  try {
    lock = fs.openSync(lockPath,'wx',0o600);
    const existing = fs.readdirSync(journalDirectory).filter(name => name.endsWith('.reserved.json'));
    if (existing.includes(`${caseId}.reserved.json`)) throw new Error('case_already_reserved_no_retry');
    if (existing.length >= LIMITS.attempts || (existing.length + 1) * MAX_RESERVED_PER_CALL > LIMITS.budgetMicroUsd) {
      throw new Error('trial_budget_exhausted');
    }
    const reservation = {trialId:TRIAL_ID,caseId,attempt:existing.length + 1,
      verifiedInputTokens,reservedMicroUsd:MAX_RESERVED_PER_CALL,
      maxCompletionTokens:LIMITS.maxCompletionTokens};
    const eventPath = `${journalDirectory}/${caseId}.reserved.json`;
    const event = fs.openSync(eventPath,'wx',0o600);
    try { fs.writeFileSync(event,`${JSON.stringify(reservation)}\n`); fs.fsyncSync(event); }
    finally { fs.closeSync(event); }
    const directory = fs.openSync(journalDirectory,'r');
    try { fs.fsyncSync(directory); } finally { fs.closeSync(directory); }
    return reservation;
  } finally {
    if (lock !== undefined) { fs.closeSync(lock); fs.unlinkSync(lockPath); }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const captures = await captureTrialRequests();
  console.log(JSON.stringify(preflightReport(captures, {
    isolatedKeyAvailable:Boolean(process.env.FAIRY_SOL_TEST_API_KEY)
  }), null, 2));
  process.exitCode = 2; // A readable HOLD must never look like paid-run readiness.
}
