#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalize, statePath, validateState, validateTransaction } from './check-reader-tip-monitor-state.mjs';

export function applyTransaction(state, tx) {
  const txErrors = validateTransaction(tx, state);
  if (txErrors.length) throw new Error(txErrors.join('\n'));
  const next = structuredClone(state);
  const byKey = new Map(next.items.map(item => [item.itemKey, item]));
  const byUrl = new Map(next.items.map(item => [canonicalize(item.canonicalUrl), item.itemKey]));
  for (const result of tx.sourceResults) {
    const source = next.sources.find(candidate => candidate.sourceKey === result.sourceKey);
    for (const item of result.items || []) {
      const canonicalUrl = canonicalize(item.canonicalUrl);
      const collision = byUrl.get(canonicalUrl);
      if (collision && collision !== item.itemKey) throw new Error(`canonical URL already belongs to ${collision}`);
      byKey.set(item.itemKey, {...byKey.get(item.itemKey), ...item, canonicalUrl});
      byUrl.set(canonicalUrl, item.itemKey);
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
    }
  }
  next.items = [...byKey.values()];
  next.attempts.push({runId:tx.runId,attemptedAt:tx.attemptedAt,mode:tx.mode,result:tx.result,sourceKeys:tx.sourceResults.map(r=>r.sourceKey),observedItemKeys:tx.sourceResults.flatMap(r=>(r.items||[]).map(i=>i.itemKey)),note:tx.note || null});
  const stateErrors = validateState(next);
  if (stateErrors.length) throw new Error(stateErrors.join('\n'));
  return next;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const input = process.argv[2];
  if (!input) throw new Error('usage: node scripts/record-reader-tip-scan.mjs <transaction.json>');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  const tx = JSON.parse(fs.readFileSync(path.resolve(input), 'utf8'));
  const next = applyTransaction(state, tx);
  const temp = `${statePath}.tmp-${process.pid}`;
  fs.writeFileSync(temp, `${JSON.stringify(next, null, 2)}\n`, {flag:'wx'});
  fs.renameSync(temp, statePath);
  console.log(`PASS applied ${tx.runId}; ${tx.sourceResults.filter(r=>r.accessState==='ACCESSIBLE').length} source cursor(s) advanced`);
}
