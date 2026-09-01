import fs from 'node:fs';
import path from 'node:path';

import worker from '../src/index.js';
import { trial, validateCases } from './prepare-sol-trial.mjs';

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const resultsPath = argument('--results');
const outPath = argument('--out');
if (!resultsPath || !outPath) throw new Error('required: --results and --out');
validateCases(trial);

const rows = fs.readFileSync(path.resolve(resultsPath), 'utf8').trim().split('\n').map(line => JSON.parse(line));
const cases = new Map(trial.cases.map(item => [item.id, item]));

function classifier(c) {
  return { async classify(envelope) { return {
    schemaVersion: '1.0.0', language: { code: 'en', supported: true, confidence: 0.99 },
    overallConfidence: 0.99,
    clauses: envelope.clauses.map(clause => ({
      clauseId: clause.id,
      role: clause.roleHint,
      decision: clause.roleHint === 'quoted_content' ? 'transform_untrusted' : 'allow',
      domain: clause.roleHint === 'quoted_content' ? 'out_of_scope' : 'work_career',
      task: clause.roleHint === 'quoted_content' ? 'draft_or_rewrite' : 'advice_or_conversation',
      risk: clause.roleHint === 'quoted_content' ? 'sensitive' : c.risk,
      boundary: null,
      currentness: { required: false, category: 'none' },
      confidence: 0.99,
      reasonCodes: clause.roleHint === 'quoted_content' ? ['untrusted_content_isolated'] : []
    }))
  }; } };
}

async function replay(c, answer) {
  const originalFetch = globalThis.fetch;
  let providerCalls = 0;
  try {
    globalThis.fetch = async () => {
      providerCalls++;
      return new Response(JSON.stringify({
        model: 'gpt-5.6-sol',
        choices: [{ finish_reason: 'stop', message: { role: 'assistant', content: JSON.stringify(answer) } }]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    };
    const response = await worker.fetch(new Request('https://test.invalid/', {
      method: 'POST',
      headers: { Origin: 'https://laidies.ai', 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: c.prompt })
    }), {
      OPENAI_API_KEY: 'offline-replay-only',
      CAREER_GUIDANCE_PILOT: '1',
      REQUEST_CLASSIFIER: classifier(c)
    }, { waitUntil() {} });
    return { body: await response.json(), providerCalls };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

const firstCompleted = rows.find(row => row.status === 'completed');
if (!firstCompleted) throw new Error('no_completed_answers');
const calibration = await replay(cases.get(firstCompleted.caseId), { ...firstCompleted.answer, forbiddenExtraField: true });
if (calibration.body.type !== 'service_error') {
  throw new Error('validator_calibration_failed_to_reject_known_bad_answer');
}

const verdicts = [];
for (const row of rows) {
  if (row.status !== 'completed') {
    verdicts.push({ caseId: row.caseId, providerStatus: row.status, contract: 'not_tested_no_answer' });
    continue;
  }
  const replayed = await replay(cases.get(row.caseId), row.answer);
  verdicts.push({
    caseId: row.caseId,
    providerStatus: row.status,
    contract: replayed.body.type === 'case_success' && replayed.providerCalls === 1
      ? 'pass' : 'fail',
    responseType: replayed.body.type,
    providerCalls: replayed.providerCalls,
    allowanceStatus: replayed.body.allowance?.status || null
  });
}

const report = {
  calibration: 'known_bad_extra_field_rejected',
  completedAnswers: verdicts.filter(item => item.providerStatus === 'completed').length,
  contractPasses: verdicts.filter(item => item.contract === 'pass').length,
  contractFailures: verdicts.filter(item => item.contract === 'fail').length,
  missingAnswers: verdicts.filter(item => item.contract === 'not_tested_no_answer').length,
  verdicts
};
fs.writeFileSync(path.resolve(outPath), `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 });
console.log(JSON.stringify(report, null, 2));
if (report.contractFailures || report.missingAnswers) process.exitCode = 2;
