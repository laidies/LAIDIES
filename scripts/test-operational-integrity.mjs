#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checker = path.join(root, 'scripts/check-operational-integrity.mjs');
const queuePath = path.join(root, 'operations/control-room/owner-review-queue.json');
const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-integrity-'));
const validRegistryPath = path.join(dir, 'valid-registry.json');
const validRunQueuePath = path.join(dir, 'valid-run-queue.json');
fs.writeFileSync(validRegistryPath, JSON.stringify({ entries: [], retired_paths: [] }));
fs.writeFileSync(validRunQueuePath, JSON.stringify({
  active: [],
  stale_runtime_records: [],
  stale_portfolio_work: []
}));
const baseEnv = {
  LAIDIES_ASSET_REGISTRY_PATH: validRegistryPath,
  LAIDIES_RUN_QUEUE_PATH: validRunQueuePath
};
const positive = spawnSync(process.execPath, [checker], {
  cwd: root,
  encoding: 'utf8',
  env: { ...process.env, ...baseEnv }
});
if (positive.status !== 0) {
  throw new Error(`controlled valid fixture must pass:\n${positive.stdout}${positive.stderr}`);
}
const runNegative = ({ name, env, expected }) => {
  const negative = spawnSync(process.execPath, [checker], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, ...baseEnv, ...env }
  });
  const output = `${negative.stdout}${negative.stderr}`;
  if (negative.status === 0 || !output.includes(expected)) {
    throw new Error(`${name} did not fail with ${expected}:\n${output}`);
  }
};

const bad = structuredClone(queue);
bad.review_now = [bad.internal_repair_required[0]];
bad.summary.review_now = 1;
bad.internal_repair_required = bad.internal_repair_required.slice(1);
bad.summary.internal_repair_required = bad.internal_repair_required.length;
const badPath = path.join(dir, 'bad-queue.json');
fs.writeFileSync(badPath, JSON.stringify(bad));
runNegative({
  name: 'Ali review admission mutation',
  env: { LAIDIES_QUEUE_PATH: badPath },
  expected: 'cannot enter Ali review'
});

const registryPath = path.join(root, 'operations/assets/active-asset-registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const missingBindings = structuredClone(registry);
for (const entry of missingBindings.entries || []) {
  entry.status = 'ACTIVE';
  entry.path = null;
}
const missingBindingsPath = path.join(dir, 'active-assets-missing-bindings.json');
fs.writeFileSync(missingBindingsPath, JSON.stringify(missingBindings));
runNegative({
  name: 'ACTIVE asset binding mutation',
  env: { LAIDIES_ASSET_REGISTRY_PATH: missingBindingsPath },
  expected: 'ACTIVE asset requires path'
});

const runQueuePath = path.join(root, 'operations/product-stewards/run-queue.json');
const runQueue = JSON.parse(fs.readFileSync(runQueuePath, 'utf8'));
for (const arrayName of ['stale_runtime_records', 'stale_portfolio_work']) {
  const staleRunning = structuredClone(runQueue);
  staleRunning[arrayName] = [{
    product_id: `${arrayName}-fixture`,
    system_id: `${arrayName}-fixture`,
    status: 'RUNNING_TEST_FIXTURE',
    heartbeat_at: '2026-01-01T00:00:00Z'
  }];
  const record = staleRunning[arrayName][0];
  record.status = 'RUNNING_TEST_FIXTURE';
  record.heartbeat_at = '2026-01-01T00:00:00Z';
  const stalePath = path.join(dir, `${arrayName}.json`);
  fs.writeFileSync(stalePath, JSON.stringify(staleRunning));
  runNegative({
    name: `${arrayName} stale RUNNING mutation`,
    env: { LAIDIES_RUN_QUEUE_PATH: stalePath },
    expected: 'stale RUNNING record'
  });
}
fs.rmSync(dir, { recursive: true, force: true });
console.log('OPERATIONAL INTEGRITY TEST PASS');
