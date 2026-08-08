#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checker = path.join(root, 'scripts/project-work-events.mjs');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-work-events-'));
const base = { event_id: 'E1', work_id: 'W1', at: '2026-08-07T12:00:00Z', type: 'WORK_ADMITTED', actor: 'owner', payload: { title: 'Work', acceptance_owner: 'judge' } };
const run = events => {
  const file = path.join(tmp, `${Math.random()}.jsonl`);
  fs.writeFileSync(file, `${events.map(x => JSON.stringify(x)).join('\n')}\n`);
  return spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8', env: { ...process.env, LAIDIES_WORK_EVENTS_PATH: file } });
};
const fail = (events, needle) => {
  const result = run(events);
  if (result.status === 0 || !`${result.stdout}${result.stderr}`.includes(needle)) throw new Error(`expected ${needle}:\n${result.stdout}${result.stderr}`);
};
const valid = run([base, { ...base, event_id: 'E2', at: '2026-08-07T12:01:00Z', type: 'WORK_STARTED', payload: {} }]);
if (valid.status !== 0 || !valid.stdout.includes('"status": "IN_PROGRESS"')) throw new Error(`valid projection failed:\n${valid.stdout}${valid.stderr}`);
fail([base, { ...base, event_id: 'E1', at: '2026-08-07T12:01:00Z', type: 'WORK_STARTED', payload: {} }], 'duplicate event_id');
fail([{ ...base, type: 'WORK_STARTED' }], 'before WORK_ADMITTED');
fail([base, { ...base, event_id: 'E2', at: '2026-08-07T11:59:00Z', type: 'WORK_STARTED', payload: {} }], 'moved backwards');
fail([base, { ...base, event_id: 'E2', at: '2026-08-07T12:01:00Z', type: 'WORK_RESOLVED', payload: {} }], 'cannot resolve without evidence');
fs.rmSync(tmp, { recursive: true, force: true });
console.log('WORK EVENT PROJECTION CALIBRATION PASS valid=1 rejected=4');
