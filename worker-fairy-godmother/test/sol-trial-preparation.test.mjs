import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { trial, validateCases, captureTrialRequests, preflightReport,
  LIMITS, MAX_RESERVED_PER_CALL, reserveTrialAttempt } from '../harness/prepare-sol-trial.mjs';

test('twenty private synthetic cases cover five families with four cases each', () => {
  validateCases(trial);
  assert.throws(() => validateCases({...trial,cases:trial.cases.slice(1)}), /20_cases/);
  const duplicate = structuredClone(trial); duplicate.cases[1].id = duplicate.cases[0].id;
  assert.throws(() => validateCases(duplicate), /invalid_trial_case/);
  const wrongFamily = structuredClone(trial); wrongFamily.cases[0].family = 'credit';
  assert.throws(() => validateCases(wrongFamily), /four_cases/);
});

test('offline capture uses actual Worker prompts, sends no requests and leaks no evaluation judgment', async () => {
  const original = globalThis.fetch; let escaped = 0;
  globalThis.fetch = () => { escaped++; throw new Error('network_must_not_run'); };
  const sentinel = globalThis.fetch;
  try {
    const captured = await captureTrialRequests();
    assert.equal(escaped,0); assert.equal(globalThis.fetch,sentinel); assert.equal(captured.length,20);
    for (const [i,c] of captured.entries()) {
      assert.equal(c.request.model,'gpt-5.6-sol'); assert.equal(c.request.reasoning_effort,'medium');
      assert.equal(c.request.max_completion_tokens,8192); assert.equal(c.request.store,false);
      assert.equal(c.inputTokens,null); assert.match(c.sha256,/^[a-f0-9]{64}$/);
      assert.match(c.request.messages[0].content,/CAREER GUIDANCE PILOT/);
      assert.equal(JSON.stringify(c.request).includes(trial.cases[i].judge),false);
      assert.match(c.request.messages[1].content,/USER TASK CLAUSES/);
    }
    const report = preflightReport(captured,{isolatedKeyAvailable:true});
    assert.equal(report.status,'HOLD'); assert.equal(report.providerCalls,0);
    assert.ok(report.blockers.includes('verified_Sol_chat_input_token_bound_missing'));
  } finally { globalThis.fetch = original; }
});

test('budget is durably reserved before dispatch and never refunded or retried', () => {
  const directory = mkdtempSync(join(tmpdir(),'fairy-sol-budget-'));
  const first = reserveTrialAttempt(directory,trial.cases[0].id,11999);
  assert.equal(first.attempt,1); assert.equal(first.reservedMicroUsd,223840);
  assert.throws(() => reserveTrialAttempt(directory,trial.cases[0].id,100),/no_retry/);
  assert.throws(() => reserveTrialAttempt(directory,trial.cases[1].id,12001),/oversized/);
  for (let i=1;i<20;i++) reserveTrialAttempt(directory,trial.cases[i].id,12000);
  const exhausted = mkdtempSync(join(tmpdir(),'fairy-sol-exhausted-'));
  for (let i=0;i<20;i++) writeFileSync(join(exhausted,`spent-${i}.reserved.json`),'{}\n');
  assert.throws(() => reserveTrialAttempt(exhausted,'feedback-01',12000),/budget/);
});

test('conditional trial ceiling includes all reasoning output and worst-rate cached input', () => {
  assert.equal(MAX_RESERVED_PER_CALL,223840);
  assert.equal(MAX_RESERVED_PER_CALL * 20,4476800);
  assert.ok(MAX_RESERVED_PER_CALL * LIMITS.attempts <= LIMITS.budgetMicroUsd);
  assert.ok(MAX_RESERVED_PER_CALL * 23 > LIMITS.budgetMicroUsd);
});
