#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalize, fileSha256, serializedStateSha256, statePath, validateState, validateTransaction } from './check-reader-tip-monitor-state.mjs';

const materialDispositions = new Set(['HOLD', 'MERGE', 'CREATE']);

function outboxEntryForItem(tx, item) {
  return {
    outboxId: `${tx.runId}:ITEM:${item.itemKey}`,
    kind: 'MATERIAL_FINDING',
    runId: tx.runId,
    createdAt: tx.attemptedAt,
    sourceKey: item.sourceKey,
    itemKey: item.itemKey,
    sourceUrl: item.canonicalUrl,
    disposition: item.disposition,
    summary: item.reason,
    evidenceGap: item.evidenceGap || null,
    nextTrigger: item.nextTrigger,
    target: item.target || null,
    receivingOwner: item.receivingOwner,
    receivingTaskId: item.receivingTaskId,
    sourceReceiptPath: item.receiptPath,
    sourceReceiptSha256: fileSha256(item.receiptPath),
    productionAuthority: false,
    publicationAuthority: false
  };
}

function outboxEntryForAccessFailure(tx, result, source) {
  return {
    outboxId: `${tx.runId}:SOURCE:${result.sourceKey}`,
    kind: 'SOURCE_ACCESS_FAILURE',
    runId: tx.runId,
    createdAt: tx.attemptedAt,
    sourceKey: result.sourceKey,
    itemKey: null,
    sourceUrl: source.channelUrl,
    disposition: 'ACCESS_FAILURE',
    summary: `${result.sourceKey} source coverage was ${result.accessState.toLowerCase()}.`,
    evidenceGap: result.failureReason,
    nextTrigger: result.nextTrigger,
    target: null,
    receivingOwner: 'aidb-intelligence-desk',
    receivingTaskId: '01a06e1b-8dc1-7d60-9d47-cb642dc6f07d',
    sourceReceiptPath: tx.sourceReceiptPath,
    sourceReceiptSha256: fileSha256(tx.sourceReceiptPath),
    productionAuthority: false,
    publicationAuthority: false
  };
}

export function applyTransaction(state, tx) {
  const txErrors = validateTransaction(tx, state);
  if (txErrors.length) throw new Error(txErrors.join('\n'));
  const next = structuredClone(state);
  const byKey = new Map(next.items.map(item => [item.itemKey, item]));
  const byUrl = new Map(next.items.map(item => [canonicalize(item.canonicalUrl), item.itemKey]));
  const outboxById = new Map(next.outbox.map(entry => [entry.outboxId, entry]));
  for (const result of tx.sourceResults) {
    const source = next.sources.find(candidate => candidate.sourceKey === result.sourceKey);
    for (const item of result.items || []) {
      const canonicalUrl = canonicalize(item.canonicalUrl);
      const collision = byUrl.get(canonicalUrl);
      if (collision && collision !== item.itemKey) throw new Error(`canonical URL already belongs to ${collision}`);
      const merged = {...byKey.get(item.itemKey), ...item, sourceKey:result.sourceKey, canonicalUrl};
      byKey.set(item.itemKey, merged);
      byUrl.set(canonicalUrl, item.itemKey);
      if (materialDispositions.has(merged.disposition)) {
        const entry = outboxEntryForItem(tx, merged);
        if (outboxById.has(entry.outboxId)) throw new Error(`outboxId already exists: ${entry.outboxId}`);
        outboxById.set(entry.outboxId, entry);
      }
    }
    const successful = result.accessState === 'ACCESSIBLE';
    source.lastAttempt = {
      attemptedAt: tx.attemptedAt,
      accessState: result.accessState,
      cursorAdvanced: successful,
      failureReason: result.failureReason || null,
      nextTrigger: result.nextTrigger || (successful ? 'Next weekly scan.' : 'Retry without advancing the cursor.')
    };
    if (successful) {
      source.lastSuccessfulScanAt = tx.attemptedAt;
      source.cursor = result.cursorAfter;
    } else if (['PARTIAL', 'INACCESSIBLE'].includes(result.accessState)) {
      const entry = outboxEntryForAccessFailure(tx, result, source);
      if (outboxById.has(entry.outboxId)) throw new Error(`outboxId already exists: ${entry.outboxId}`);
      outboxById.set(entry.outboxId, entry);
    }
  }
  next.items = [...byKey.values()];
  next.outbox = [...outboxById.values()];
  next.attempts.push({runId:tx.runId,attemptedAt:tx.attemptedAt,mode:tx.mode,result:tx.result,sourceKeys:tx.sourceResults.map(result => result.sourceKey),observedItemKeys:tx.sourceResults.flatMap(result => (result.items || []).map(item => item.itemKey)),note:tx.note || null});
  const stateErrors = validateState(next);
  if (stateErrors.length) throw new Error(stateErrors.join('\n'));
  return next;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const input = process.argv[2];
  if (!input) throw new Error('usage: node scripts/record-reader-tip-scan.mjs <transaction.json>');
  const rawState = fs.readFileSync(statePath, 'utf8');
  const state = JSON.parse(rawState);
  const tx = JSON.parse(fs.readFileSync(path.resolve(input), 'utf8'));
  if (tx.expectedStateSha256 !== serializedStateSha256(state)) throw new Error('transaction expectedStateSha256 is stale; reread state before applying');
  const next = applyTransaction(state, tx);
  const temp = `${statePath}.tmp-${process.pid}`;
  fs.writeFileSync(temp, `${JSON.stringify(next, null, 2)}\n`, {flag:'wx'});
  fs.renameSync(temp, statePath);
  console.log(`PASS applied ${tx.runId}; ${tx.sourceResults.filter(result => result.accessState === 'ACCESSIBLE').length} source cursor(s) advanced; ${next.outbox.length - state.outbox.length} outbox item(s) created`);
}
