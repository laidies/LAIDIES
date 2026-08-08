#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const fixtureMode = process.argv.includes('--fixture');
const fixtureVars = ['LAIDIES_WORK_RESOLUTION_PATH','LAIDIES_RUN_QUEUE_PATH','LAIDIES_WORK_RESOLUTION_NOW'];
const unsafeOverrides = fixtureVars.filter(name => process.env[name]);
if (!fixtureMode && unsafeOverrides.length) {
  console.error(`WORK RESOLUTION LOOP FAIL\n- fixture overrides require --fixture: ${unsafeOverrides.join(', ')}`);
  process.exit(1);
}
const file = fixtureMode && process.env.LAIDIES_WORK_RESOLUTION_PATH
  ? process.env.LAIDIES_WORK_RESOLUTION_PATH
  : 'operations/runtime/work-resolution-loop.json';
const runQueueFile = fixtureMode && process.env.LAIDIES_RUN_QUEUE_PATH
  ? process.env.LAIDIES_RUN_QUEUE_PATH
  : 'operations/product-stewards/run-queue.json';
const reconcileRunQueue = !fixtureMode || !process.env.LAIDIES_WORK_RESOLUTION_PATH || Boolean(process.env.LAIDIES_RUN_QUEUE_PATH);
const now = new Date(fixtureMode && process.env.LAIDIES_WORK_RESOLUTION_NOW ? process.env.LAIDIES_WORK_RESOLUTION_NOW : Date.now());
const planOnly = process.argv.includes('--plan');
const terminal = new Set(['RESOLVED']);
const states = new Set([
  'OPEN', 'DISPATCHED', 'AWAITING_RECEIPT', 'IN_PROGRESS', 'VERIFYING',
  'RESOLVED', 'ESCALATED_ALI', 'ESCALATED_EXTERNAL', 'STOP_LOSS_ROOT_CAUSE'
]);
const errors = [];
const actions = [];
const parseTime = (value, label) => {
  const timestamp = Date.parse(value || '');
  if (!Number.isFinite(timestamp)) errors.push(`${label} must be an ISO timestamp`);
  return timestamp;
};
const nonEmpty = value => typeof value === 'string' && value.trim().length > 0;
const fail = (id, message) => errors.push(`${id}: ${message}`);
const requiresEscalation = new Set(['ESCALATED_ALI', 'ESCALATED_EXTERNAL']);
const requiresVisitorDelta = new Set(['DISPATCHED', 'AWAITING_RECEIPT', 'IN_PROGRESS', 'VERIFYING']);
const lifecycleStages = ['CAPTURE','PREREQUISITES','BRIEF','PILOT','MAKER_BUILD','DETERMINISTIC_CHECKS','INDEPENDENT_REVIEW','OWNER_INTEGRATION','ALI_DECISION','RELEASE','PUBLIC_VERIFICATION','LEARNING_SCAN'];

let ledger;
try {
  ledger = JSON.parse(fs.readFileSync(path.resolve(root, file), 'utf8'));
} catch (error) {
  console.error(`WORK RESOLUTION LOOP FAIL\n- cannot read ${file}: ${error.message}`);
  process.exit(1);
}

if (ledger.schema_version !== 1) errors.push('schema_version must equal 1');
if (!Array.isArray(ledger.records)) errors.push('records must be an array');
if (!['HEALTHY', 'ATTENTION_REQUIRED'].includes(ledger.system_status)) errors.push('system_status must be HEALTHY or ATTENTION_REQUIRED');
const records = Array.isArray(ledger.records) ? ledger.records : [];
const ids = new Set();
let overdueCount = 0;

for (const record of records) {
  const id = record.work_id || 'MISSING_WORK_ID';
  if (!/^WRK-\d{8}-[a-z0-9][a-z0-9-]*$/.test(id)) fail(id, 'work_id must use WRK-YYYYMMDD-slug');
  if (ids.has(id)) fail(id, 'duplicate durable work_id');
  ids.add(id);
  if (!nonEmpty(record.work_type)) fail(id, 'work_type is required');
  if (!nonEmpty(record.title)) fail(id, 'title is required');
  if (!states.has(record.status)) fail(id, `invalid status ${record.status || 'MISSING'}`);
  if (!record.owner || !nonEmpty(record.owner.id) || !nonEmpty(record.owner.role)) fail(id, 'accountable owner.id and owner.role are required');
  if (!record.next_action || !nonEmpty(record.next_action.id) || !nonEmpty(record.next_action.description)) fail(id, 'exact next_action.id and next_action.description are required');
  if (!Number.isInteger(record.retry_count) || record.retry_count < 0) fail(id, 'retry_count must be a non-negative integer');
  if (!Number.isInteger(record.same_failure_count) || record.same_failure_count < 0) fail(id, 'same_failure_count must be a non-negative integer');

  if (requiresVisitorDelta.has(record.status)) {
    const admission = record.work_admission;
    if (!admission || !nonEmpty(admission.visitor_problem) ||
        !nonEmpty(admission.existing_experience_gap) ||
        /^none|not applicable$/i.test(admission.existing_experience_gap.trim()) ||
        !nonEmpty(admission.smallest_complete_change) ||
        !Array.isArray(admission.non_goals) || admission.non_goals.length === 0 ||
        admission.non_goals.some(item => !nonEmpty(item))) {
      fail(id, 'dispatch requires work_admission with a real visitor_problem, existing_experience_gap, smallest_complete_change and explicit non_goals; missing fields are REJECTED — NO VISITOR DELTA');
    }
  }

  const deadline = parseTime(record.deadline_at, `${id}.deadline_at`);
  const nextCheck = parseTime(record.next_check_at, `${id}.next_check_at`);
  const overdue = !terminal.has(record.status) && (deadline < now.getTime() || nextCheck < now.getTime());
  if (overdue) {
    overdueCount += 1;
    fail(id, `OVERDUE deadline_at=${record.deadline_at} next_check_at=${record.next_check_at}`);
  }

  if (['DISPATCHED', 'AWAITING_RECEIPT'].includes(record.status)) {
    const dispatch = record.dispatch;
    if (!dispatch || !nonEmpty(dispatch.receipt_id) || !nonEmpty(dispatch.to_owner_id) || !nonEmpty(dispatch.channel) || !nonEmpty(dispatch.request) || !Number.isFinite(Date.parse(dispatch.dispatched_at || ''))) {
      fail(id, 'dispatch requires receipt_id, to_owner_id, channel, request and dispatched_at');
    }
    if (!record.receipt) {
      const automaticAction = {
        action: 'REDISPATCH_RECEIPT_MISSING', work_id: id,
        to_owner_id: dispatch?.to_owner_id || record.owner?.id || 'UNOWNED',
        exact_request: dispatch?.request || record.next_action?.description || 'MISSING_ACTION',
        due_at: record.next_check_at
      };
      actions.push(automaticAction);
      if (nextCheck < now.getTime()) fail(id, 'dispatch receipt missing after next_check_at; REDISPATCH_RECEIPT_MISSING required');
    }
  }
  if (['IN_PROGRESS', 'VERIFYING'].includes(record.status)) {
    const receipt = record.activity_receipt;
    const dispatch = record.dispatch;
    if (!record.product || !nonEmpty(record.product.id) || !nonEmpty(record.product.outcome)) fail(id, `${record.status} requires product.id and product.outcome`);
    if (!record.acceptance_owner || !nonEmpty(record.acceptance_owner.id) || !nonEmpty(record.acceptance_owner.role)) fail(id, `${record.status} requires an acceptance owner`);
    if (!Array.isArray(record.write_scope) || record.write_scope.length === 0 || record.write_scope.some(scope => !nonEmpty(scope))) fail(id, `${record.status} requires a non-empty exact write_scope`);
    if (!dispatch || !nonEmpty(dispatch.receipt_id) || !nonEmpty(dispatch.to_owner_id) || !nonEmpty(dispatch.channel) || !nonEmpty(dispatch.request) || !Number.isFinite(Date.parse(dispatch.dispatched_at || ''))) {
      fail(id, `${record.status} requires its dispatch receipt`);
    }
    if (!record.owner_entry_check || record.owner_entry_check.verdict !== 'PASS' || !nonEmpty(record.owner_entry_check.command) || !Number.isFinite(Date.parse(record.owner_entry_check.checked_at || ''))) {
      fail(id, `${record.status} requires a PASS owner_entry_check with command and checked_at`);
    } else {
      const expectedCommand = `node scripts/check-product-stewards.mjs --owner-entry ${record.product?.id || ''}`;
      if (record.owner_entry_check.command !== expectedCommand) {
        fail(id, `owner_entry_check.command must equal ${expectedCommand}`);
      } else {
        const ownerEntry = spawnSync(process.execPath, ['scripts/check-product-stewards.mjs', '--owner-entry', record.product.id], { cwd: root, encoding: 'utf8' });
        if (ownerEntry.status !== 0) fail(id, `owner entry is not currently ready for ${record.product.id}`);
      }
    }
    if (!receipt || !nonEmpty(receipt.receipt_id) || !nonEmpty(receipt.task_id) || !nonEmpty(receipt.evidence_ref) || !Number.isFinite(Date.parse(receipt.at || '')) || !Number.isFinite(Date.parse(receipt.heartbeat_at || ''))) {
      fail(id, `${record.status} without task-bound activity_receipt is a fake-active task`);
    } else if (now.getTime() - Date.parse(receipt.heartbeat_at) > 24 * 60 * 60 * 1000) {
      fail(id, `${record.status} heartbeat is stale: ${receipt.heartbeat_at}`);
    }
    if (!record.execution || !nonEmpty(record.execution.maker_id) || !nonEmpty(record.execution.judge_id) || record.execution.maker_id === record.execution.judge_id) {
      fail(id, `${record.status} requires distinct maker_id and judge_id`);
    }
  }
  if (record.same_failure_count >= 2 && record.status !== 'STOP_LOSS_ROOT_CAUSE') {
    fail(id, 'same failure occurred twice; STOP_LOSS_ROOT_CAUSE with root_cause_route is required');
  }
  if (record.status === 'STOP_LOSS_ROOT_CAUSE') {
    const route = record.root_cause_route;
    if (!route || !nonEmpty(route.owner_id) || !nonEmpty(route.action) || !nonEmpty(route.failure_fingerprint) || !Number.isFinite(Date.parse(route.review_due_at || ''))) {
      fail(id, 'STOP_LOSS_ROOT_CAUSE requires root_cause_route owner_id, action, failure_fingerprint and review_due_at');
    }
  }
  if (requiresEscalation.has(record.status)) {
    const escalation = record.escalation;
    const expectedTarget = record.status === 'ESCALATED_ALI' ? 'Ali' : 'external';
    if (!escalation || !nonEmpty(escalation.target) || !nonEmpty(escalation.reason) || !nonEmpty(escalation.request) || !Number.isFinite(Date.parse(escalation.response_due_at || ''))) {
      fail(id, 'escalation requires exact target, reason, request and response_due_at');
    } else if (record.status === 'ESCALATED_ALI' && escalation.target !== expectedTarget) {
      fail(id, 'ESCALATED_ALI target must be exactly Ali');
    }
  }
  const evidence = Array.isArray(record.evidence) ? record.evidence : null;
  if (!evidence) fail(id, 'evidence must be an array');
  if (['VERIFYING', 'RESOLVED'].includes(record.status) && (!evidence || evidence.length === 0)) fail(id, `${record.status} requires artifact-bound evidence`);
  for (const item of evidence || []) {
    if (!nonEmpty(item.evidence_id) || !nonEmpty(item.artifact) || !nonEmpty(item.verifier) || !['PASS', 'FAIL', 'REJECTED'].includes(item.verdict) || !Number.isFinite(Date.parse(item.collected_at || ''))) {
      fail(id, 'each evidence item requires id, artifact, verifier, PASS/FAIL/REJECTED verdict and collected_at');
    }
    if (['FAIL', 'REJECTED'].includes(item.verdict) && !/^FAIL-\d{8}-[a-z0-9][a-z0-9-]*$/.test(item.failure_id || '')) {
      fail(id, 'failed/rejected evidence requires durable failure_id FAIL-YYYYMMDD-slug');
    }
  }
  if (record.status === 'RESOLVED') {
    if (!record.final_verdict || record.final_verdict !== 'PASS' || !Number.isFinite(Date.parse(record.resolved_at || ''))) fail(id, 'RESOLVED requires final_verdict PASS and resolved_at');
    if (!record.product || !nonEmpty(record.product.id) || !nonEmpty(record.product.outcome)) fail(id, 'RESOLVED requires product.id and product.outcome');
    if (!record.acceptance_owner || !nonEmpty(record.acceptance_owner.id) || !nonEmpty(record.acceptance_owner.role)) fail(id, 'RESOLVED requires an acceptance owner');
    if (!Array.isArray(record.write_scope) || record.write_scope.length === 0) fail(id, 'RESOLVED requires exact write_scope');
    if (!record.execution || !nonEmpty(record.execution.maker_id) || !nonEmpty(record.execution.judge_id) || record.execution.maker_id === record.execution.judge_id) fail(id, 'RESOLVED requires distinct maker_id and judge_id');
    const trace = Array.isArray(record.lifecycle_trace) ? record.lifecycle_trace : [];
    if (JSON.stringify(trace.map(step => step.stage)) !== JSON.stringify(lifecycleStages)) fail(id, 'RESOLVED lifecycle_trace must contain every mandatory stage in order');
    for (const step of trace) {
      if (!nonEmpty(step.receipt_id) || !nonEmpty(step.owner_id) || !nonEmpty(step.artifact) || !['PASS', 'NOT_APPLICABLE'].includes(step.result) || !Number.isFinite(Date.parse(step.at || ''))) {
        fail(id, `lifecycle stage ${step.stage || 'MISSING'} requires receipt, owner, artifact, result and at`);
      }
    }
    if (record.work_type === 'release' && trace.some(step => ['RELEASE', 'PUBLIC_VERIFICATION'].includes(step.stage) && step.result !== 'PASS')) {
      fail(id, 'release work cannot resolve without PASS release and public verification stages');
    }
  }
}

if (reconcileRunQueue) {
  let runQueue;
  try {
    runQueue = JSON.parse(fs.readFileSync(path.resolve(root, runQueueFile), 'utf8'));
  } catch (error) {
    errors.push(`cannot read ${runQueueFile}: ${error.message}`);
  }
  if (runQueue) {
    const activeRuns = Array.isArray(runQueue.active) ? runQueue.active : [];
    const activeByWorkId = new Map(activeRuns.map(run => [run.work_id, run]));
    for (const record of records.filter(item => ['IN_PROGRESS', 'VERIFYING'].includes(item.status))) {
      const run = activeByWorkId.get(record.work_id);
      if (!run) {
        fail(record.work_id, `fake-active ledger state: no matching ${runQueueFile} active entry`);
        continue;
      }
      if (run.status !== 'RUNNING') fail(record.work_id, 'matching run-queue entry must be RUNNING');
      if (!Array.isArray(run.live_owner_tasks) || !run.live_owner_tasks.includes(record.activity_receipt?.task_id)) {
        fail(record.work_id, 'activity_receipt.task_id must match a run-queue live_owner_tasks entry');
      }
      if (!Number.isFinite(Date.parse(run.heartbeat_at || ''))) fail(record.work_id, 'run-queue active entry requires heartbeat_at');
      if (Date.parse(run.heartbeat_at || '') !== Date.parse(record.activity_receipt?.heartbeat_at || '')) {
        fail(record.work_id, 'ledger and run-queue heartbeats must identify the same liveness snapshot');
      }
    }
    for (const run of activeRuns) {
      const record = records.find(item => item.work_id === run.work_id);
      if (!record) errors.push(`${run.work_id || 'MISSING_WORK_ID'}: run-queue active entry has no canonical work-resolution record`);
      else if (!['IN_PROGRESS', 'VERIFYING'].includes(record.status)) fail(record.work_id, `run-queue says RUNNING while ledger status is ${record.status}`);
    }
  }
}

if (ledger.system_status === 'HEALTHY' && overdueCount > 0) errors.push(`system_status HEALTHY contradicts ${overdueCount} unresolved overdue item(s)`);
if (planOnly && actions.length) console.log(JSON.stringify({ automatic_actions: actions }, null, 2));
if (errors.length) {
  console.error('WORK RESOLUTION LOOP FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`${fixtureMode ? 'WORK RESOLUTION LOOP FIXTURE PASS — NOT PRODUCTION EVIDENCE' : 'WORK RESOLUTION LOOP PASS'} (${records.length} record${records.length === 1 ? '' : 's'})`);
