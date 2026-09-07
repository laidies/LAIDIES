#!/usr/bin/env node
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { serializedStateSha256, statePath, validateOwnerReceipt, validateState, validateTransaction } from './check-reader-tip-monitor-state.mjs';
import { applyTransaction } from './record-reader-tip-scan.mjs';
import { validateAndResolveOwnerReceipt } from './record-reader-tip-owner-receipt.mjs';

const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
assert.deepEqual(validateState(state), []);
const sourceReceiptPath = 'operations/agents/aidb-intelligence-desk/sources/2026-09-07-reader-tip-source-scan.md';

const inaccessible = {
  schemaVersion:'reader-tip-scan-transaction-v2', runId:'test-inaccessible',
  attemptedAt:'2026-09-11T09:00:00-07:00', mode:'SCAN', result:'ACCESS_FAILURE',
  expectedStateSha256:serializedStateSha256(state), sourceReceiptPath,
  sourceResults:[{sourceKey:'GOD_OF_PROMPT',accessState:'INACCESSIBLE',queryFromAt:null,cursorAfter:null,items:[],failureReason:'Public page did not expose a complete dated feed.',nextTrigger:'Retry next run from the prior successful cursor.'}]
};
const held = applyTransaction(state, inaccessible);
assert.equal(held.sources[0].cursor, state.sources[0].cursor);
assert.equal(held.sources[0].lastSuccessfulScanAt, state.sources[0].lastSuccessfulScanAt);
assert.equal(held.sources[0].lastAttempt.accessState, 'INACCESSIBLE');
assert.equal(held.outbox.at(-1).kind, 'SOURCE_ACCESS_FAILURE');
assert.equal(held.outbox.at(-1).receivingOwner, 'aidb-intelligence-desk');

const material = {
  schemaVersion:'reader-tip-scan-transaction-v2', runId:'test-material',
  attemptedAt:'2026-09-11T09:00:00-07:00', mode:'SCAN', result:'MATERIAL_HOLD',
  expectedStateSha256:serializedStateSha256(state), sourceReceiptPath,
  sourceResults:[{sourceKey:'GOD_OF_PROMPT',accessState:'ACCESSIBLE',queryFromAt:'2026-08-28T09:00:00-07:00',cursorAfter:'2026-09-11T09:00:00-07:00',items:[{
    itemKey:'instagram:test-material',canonicalUrl:'https://www.instagram.com/p/test-material/',firstSeenAt:'2026-09-11T09:00:00-07:00',publishedAt:null,observedPublishedLabel:'September 10, 2026',disposition:'HOLD',reason:'A plausible test finding.',evidenceGap:'Reader transfer evidence is missing.',nextTrigger:'Run a bounded reader test.',target:null,receivingOwner:'learning-content-ecosystem',receivingTaskId:'019f9f7f-9e4c-72d2-8882-447bcbe01691',receiptPath:sourceReceiptPath
  }]}]
};
const withMaterial = applyTransaction(state, material);
const materialOutbox = withMaterial.outbox.at(-1);
assert.equal(materialOutbox.itemKey, 'instagram:test-material');
assert.equal(materialOutbox.receivingOwner, 'learning-content-ecosystem');

const missingOutbox = structuredClone(withMaterial);
missingOutbox.outbox.pop();
assert.ok(validateState(missingOutbox, {checkFiles:false}).some(error => error.includes('material item has no outbox')));

const missingOwner = structuredClone(material);
delete missingOwner.sourceResults[0].items[0].receivingTaskId;
assert.ok(validateTransaction(missingOwner, state).some(error => error.includes('receivingOwner and receivingTaskId')));

const stale = {...material, expectedStateSha256:'0'.repeat(64)};
assert.ok(validateTransaction(stale, state).some(error => error.includes('stale')));

const goodReceipt = {
  schemaVersion:'reader-tip-owner-receipt-v1',outboxId:materialOutbox.outboxId,sourceReceiptSha256:materialOutbox.sourceReceiptSha256,
  owner:materialOutbox.receivingOwner,ownerTaskId:materialOutbox.receivingTaskId,decidedAt:'2026-09-11T10:00:00-07:00',outcome:'HELD',nextTrigger:'Run the named reader test.',productionAuthority:false,publicationAuthority:false
};
assert.deepEqual(validateOwnerReceipt(goodReceipt, materialOutbox), []);
assert.ok(validateAndResolveOwnerReceipt(withMaterial, goodReceipt).relativePath.endsWith('.json'));
assert.ok(validateOwnerReceipt({...goodReceipt, owner:'newsstand'}, materialOutbox).some(error => error.includes('wrong receiving owner')));
assert.ok(validateOwnerReceipt({...goodReceipt, sourceReceiptSha256:'0'.repeat(64)}, materialOutbox).some(error => error.includes('wrong source receipt SHA')));

const success = {
  schemaVersion:'reader-tip-scan-transaction-v2', runId:'test-success',
  attemptedAt:'2026-09-11T09:00:00-07:00', mode:'SCAN', result:'QUIET',
  expectedStateSha256:serializedStateSha256(state), sourceReceiptPath,
  sourceResults:[{sourceKey:'GOD_OF_PROMPT',accessState:'ACCESSIBLE',queryFromAt:'2026-08-28T09:00:00-07:00',cursorAfter:'2026-09-11T09:00:00-07:00',items:[]}]
};
const advanced = applyTransaction(state, success);
assert.equal(advanced.sources[0].lastSuccessfulScanAt, success.attemptedAt);
assert.equal(advanced.sources[0].cursor, success.sourceResults[0].cursorAfter);

const short = structuredClone(success);
short.sourceResults[0].queryFromAt = '2026-09-02T09:00:01-07:00';
assert.ok(validateTransaction(short, state).some(error => error.includes('too short')));

console.log('PASS reader-tip monitor outbox, owner receipt, concurrency and cursor transitions');
