#!/usr/bin/env node
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { statePath, validateState, validateTransaction } from './check-reader-tip-monitor-state.mjs';
import { applyTransaction } from './record-reader-tip-scan.mjs';

const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
assert.deepEqual(validateState(state), []);

const inaccessible = {
  schemaVersion: 'reader-tip-scan-transaction-v1', runId: 'test-inaccessible',
  attemptedAt: '2026-09-11T09:00:00-07:00', mode: 'SCAN', result: 'ACCESS_FAILURE',
  sourceResults: [{sourceKey:'GOD_OF_PROMPT',accessState:'INACCESSIBLE',queryFromAt:null,cursorAfter:null,items:[],failureReason:'Public page did not expose a complete dated feed.',nextTrigger:'Retry next run from the prior successful cursor.'}]
};
const held = applyTransaction(state, inaccessible);
assert.equal(held.sources[0].cursor, state.sources[0].cursor);
assert.equal(held.sources[0].lastSuccessfulScanAt, state.sources[0].lastSuccessfulScanAt);
assert.equal(held.sources[0].lastAttempt.accessState, 'INACCESSIBLE');

const success = {
  schemaVersion: 'reader-tip-scan-transaction-v1', runId: 'test-success',
  attemptedAt: '2026-09-11T09:00:00-07:00', mode: 'SCAN', result: 'QUIET',
  sourceResults: [{sourceKey:'GOD_OF_PROMPT',accessState:'ACCESSIBLE',queryFromAt:'2026-09-01T09:00:00-07:00',cursorAfter:'2026-09-11T09:00:00-07:00',items:[]}]
};
const advanced = applyTransaction(state, success);
assert.equal(advanced.sources[0].lastSuccessfulScanAt, success.attemptedAt);
assert.equal(advanced.sources[0].cursor, success.sourceResults[0].cursorAfter);

const short = structuredClone(success);
short.sourceResults[0].queryFromAt = '2026-09-02T09:00:01-07:00';
assert.ok(validateTransaction(short, state).some(error => error.includes('too short')));

console.log('PASS reader-tip monitor transitions preserve failed cursors and advance complete scans');
