#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checker = path.join(root, 'scripts/check-delivery-liveness.mjs');
const run = (args = [], env = {}) => spawnSync(process.execPath, [checker, ...args], {
  cwd: root,
  encoding: 'utf8',
  env: { ...process.env, ...env }
});

const current = run();
assert.notEqual(current.status, 0, 'current state must HOLD while dispatchable work has no active lanes');
assert.match(`${current.stdout}${current.stderr}`, /DELIVERY LIVENESS HOLD/);
assert.match(`${current.stdout}${current.stderr}`, /active_lanes=0, ready_to_dispatch=\d+/);
assert.match(`${current.stdout}${current.stderr}`, /dispatcher state is unchanged/);

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-delivery-liveness-'));
try {
  const queuePath = path.join(temporary, 'run-queue.json');
  const ordersPath = path.join(temporary, 'content-work-orders.json');
  const fixtureEnvironment = {
    LAIDIES_DELIVERY_LIVENESS_RUN_QUEUE_PATH: queuePath,
    LAIDIES_DELIVERY_LIVENESS_WORK_ORDERS_PATH: ordersPath
  };

  fs.writeFileSync(queuePath, JSON.stringify({ active: [] }));
  fs.writeFileSync(ordersPath, JSON.stringify({ workOrders: [] }));
  const intentionallyEmpty = run(['--fixture'], fixtureEnvironment);
  assert.equal(intentionallyEmpty.status, 0, `${intentionallyEmpty.stdout}${intentionallyEmpty.stderr}`);
  assert.match(intentionallyEmpty.stdout, /active_lanes=0/);
  assert.match(intentionallyEmpty.stdout, /ready_to_dispatch=0/);

  fs.writeFileSync(queuePath, JSON.stringify({ active: [{ work_id: 'WRK-fixture', status: 'RUNNING' }] }));
  fs.writeFileSync(ordersPath, JSON.stringify({ workOrders: [{ id: 'LCWO-fixture', dispatchState: 'READY_TO_DISPATCH' }] }));
  const live = run(['--fixture'], fixtureEnvironment);
  assert.equal(live.status, 0, `${live.stdout}${live.stderr}`);
  assert.match(live.stdout, /active_lanes=1/);
  assert.match(live.stdout, /ready_to_dispatch=1/);

  const unsafeOverride = run([], fixtureEnvironment);
  assert.notEqual(unsafeOverride.status, 0, 'production checker must reject fixture overrides');
  assert.match(`${unsafeOverride.stdout}${unsafeOverride.stderr}`, /fixture overrides require --fixture/);
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}

console.log('DELIVERY LIVENESS TEST PASS');
console.log('- Current queue correctly holds: dispatchable work has no active lane.');
console.log('- Intentional empty queue and live-lane fixtures pass.');
