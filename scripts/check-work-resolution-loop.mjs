#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const file = process.env.LAIDIES_WORK_RESOLUTION_PATH || 'operations/runtime/work-resolution-loop.json';
const now = new Date(process.env.LAIDIES_WORK_RESOLUTION_NOW || Date.now());
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

let ledger;
try {
  ledger = JSON.parse(fs.readFileSync(path.resolve(root, file), 'utf8'));
} catch (error) {
  console.error(`WORK RESOLUTION LOOP FAIL\n- cannot read ${file}: ${error.message}`);
  process.exit(1);
}

if (ledger.schema_version !== 1) errors.push('schema_version must equal 1');
if (!Array.isArray(ledger.records)) errors.push('records must be an array');
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
  if (record.status === 'IN_PROGRESS') {
    const receipt = record.activity_receipt;
    if (!receipt || !nonEmpty(receipt.receipt_id) || !nonEmpty(receipt.evidence_ref) || !Number.isFinite(Date.parse(receipt.at || ''))) {
      fail(id, 'IN_PROGRESS without activity_receipt is a fake-active task');
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
  }
}

if (ledger.system_status === 'HEALTHY' && overdueCount > 0) errors.push(`system_status HEALTHY contradicts ${overdueCount} unresolved overdue item(s)`);
if (planOnly && actions.length) console.log(JSON.stringify({ automatic_actions: actions }, null, 2));
if (errors.length) {
  console.error('WORK RESOLUTION LOOP FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`WORK RESOLUTION LOOP PASS (${records.length} record${records.length === 1 ? '' : 's'})`);
