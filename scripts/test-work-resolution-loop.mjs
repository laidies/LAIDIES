#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checker = path.join(root, 'scripts/check-work-resolution-loop.mjs');
const fixtures = 'operations/test-fixtures/work-resolution-loop';
const now = '2026-08-02T12:00:00Z';
const run = (name, plan = false) => spawnSync(process.execPath, [checker, ...(plan ? ['--plan'] : [])], {
  cwd: root,
  encoding: 'utf8',
  env: { ...process.env, LAIDIES_WORK_RESOLUTION_PATH: path.join(fixtures, name), LAIDIES_WORK_RESOLUTION_NOW: now }
});
const expectPass = name => {
  const result = run(name);
  if (result.status !== 0) throw new Error(`${name} should pass:\n${result.stdout}${result.stderr}`);
};
const expectFail = (name, needle) => {
  const result = run(name);
  if (result.status === 0 || !`${result.stdout}${result.stderr}`.includes(needle)) {
    throw new Error(`${name} should fail with ${needle}:\n${result.stdout}${result.stderr}`);
  }
};

expectPass('valid-open.json');
expectFail('unowned-blocker.json', 'accountable owner');
expectFail('fake-active-task.json', 'fake-active task');
expectFail('repeated-rejected-output.json', 'STOP_LOSS_ROOT_CAUSE');
expectFail('overdue-ali-item.json', 'system_status HEALTHY contradicts');

const redispatchDir = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-work-loop-'));
const redispatchPath = path.join(redispatchDir, 'missing-receipt.json');
fs.writeFileSync(redispatchPath, JSON.stringify({
  schema_version: 1,
  system_status: 'ATTENTION_REQUIRED',
  records: [{
    work_id: 'WRK-20260802-missing-receipt', work_type: 'engineering', title: 'Receipt recovery', status: 'AWAITING_RECEIPT',
    owner: { id: 'platform-owner', role: 'accountable owner' },
    next_action: { id: 'PLAT-01', description: 'Confirm the staging deployment receipt.' },
    deadline_at: '2026-08-05T17:00:00Z', next_check_at: '2026-08-03T17:00:00Z', retry_count: 0, same_failure_count: 0,
    dispatch: { receipt_id: 'DSP-01', to_owner_id: 'platform-owner', channel: 'queue', request: 'Confirm the staging deployment receipt.', dispatched_at: '2026-08-02T11:00:00Z' }, evidence: []
  }]
}));
const redispatch = spawnSync(process.execPath, [checker, '--plan'], {
  cwd: root, encoding: 'utf8',
  env: { ...process.env, LAIDIES_WORK_RESOLUTION_PATH: redispatchPath, LAIDIES_WORK_RESOLUTION_NOW: now }
});
fs.rmSync(redispatchDir, { recursive: true, force: true });
if (redispatch.status !== 0 || !`${redispatch.stdout}${redispatch.stderr}`.includes('REDISPATCH_RECEIPT_MISSING')) {
  throw new Error(`missing receipt must emit automatic redispatch:\n${redispatch.stdout}${redispatch.stderr}`);
}
console.log('WORK RESOLUTION LOOP TEST PASS');
