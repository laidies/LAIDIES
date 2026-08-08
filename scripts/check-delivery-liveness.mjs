#!/usr/bin/env node

// A structurally valid product-steward registry is not delivery evidence.
// This check only diagnoses the gap between executable work and live lanes; it
// never dispatches work or changes the paused dispatcher.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fixtureMode = process.argv.includes('--fixture');
const overrides = [
  'LAIDIES_DELIVERY_LIVENESS_RUN_QUEUE_PATH',
  'LAIDIES_DELIVERY_LIVENESS_WORK_ORDERS_PATH'
];
const suppliedOverrides = overrides.filter(name => process.env[name]);

if (!fixtureMode && suppliedOverrides.length) {
  console.error('DELIVERY LIVENESS FAIL');
  console.error(`- fixture overrides require --fixture: ${suppliedOverrides.join(', ')}`);
  process.exit(1);
}

const resolveInput = (environmentName, canonicalPath) => path.resolve(
  root,
  fixtureMode && process.env[environmentName] ? process.env[environmentName] : canonicalPath
);
const readJson = (file, label) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    console.error('DELIVERY LIVENESS FAIL');
    console.error(`- cannot read ${label}: ${error.message}`);
    process.exit(1);
  }
};

const runQueuePath = resolveInput(
  'LAIDIES_DELIVERY_LIVENESS_RUN_QUEUE_PATH',
  'operations/product-stewards/run-queue.json'
);
const workOrdersPath = resolveInput(
  'LAIDIES_DELIVERY_LIVENESS_WORK_ORDERS_PATH',
  'operations/product-stewards/learning-content-ecosystem/content-work-orders.json'
);
const runQueue = readJson(runQueuePath, 'run queue');
const workOrdersDocument = readJson(workOrdersPath, 'content work orders');
const errors = [];

if (!Array.isArray(runQueue.active)) errors.push('run_queue.active must be an array');
if (!Array.isArray(workOrdersDocument.workOrders)) errors.push('content_work_orders.workOrders must be an array');

const active = Array.isArray(runQueue.active) ? runQueue.active : [];
const workOrders = Array.isArray(workOrdersDocument.workOrders) ? workOrdersDocument.workOrders : [];
const ready = workOrders.filter(order => order.dispatchState === 'READY_TO_DISPATCH');

if (ready.length > 0 && active.length === 0) {
  errors.push(`READY_TO_DISPATCH work is idle: active_lanes=0, ready_to_dispatch=${ready.length} (${ready.map(order => order.id || 'MISSING_ID').join(', ')})`);
}

if (errors.length) {
  console.error('DELIVERY LIVENESS HOLD');
  for (const error of errors) console.error(`- ${error}`);
  console.error('- Diagnosis only: scheduled dispatcher state is unchanged. Create or bind a real collision-free owner lane before claiming delivery is live.');
  process.exit(1);
}

console.log(`${fixtureMode ? 'DELIVERY LIVENESS FIXTURE PASS — NOT PRODUCTION EVIDENCE' : 'DELIVERY LIVENESS PASS'}`);
console.log(`active_lanes=${active.length}`);
console.log(`ready_to_dispatch=${ready.length}`);
console.log('dispatcher_action=NONE');
