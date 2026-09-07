#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ownerReceiptPathFor, statePath, validateOwnerReceipt, validateState } from './check-reader-tip-monitor-state.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function validateAndResolveOwnerReceipt(state, receipt) {
  const stateErrors = validateState(state);
  if (stateErrors.length) throw new Error(stateErrors.join('\n'));
  const outbox = state.outbox.find(entry => entry.outboxId === receipt.outboxId);
  const errors = validateOwnerReceipt(receipt, outbox);
  if (errors.length) throw new Error(errors.join('\n'));
  return {outbox, relativePath:ownerReceiptPathFor(receipt.outboxId)};
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const input = process.argv[2];
  if (!input) throw new Error('usage: node scripts/record-reader-tip-owner-receipt.mjs <owner-receipt.json>');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  const receipt = JSON.parse(fs.readFileSync(path.resolve(input), 'utf8'));
  const {relativePath} = validateAndResolveOwnerReceipt(state, receipt);
  const output = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(output), {recursive:true});
  fs.writeFileSync(output, `${JSON.stringify(receipt, null, 2)}\n`, {flag:'wx'});
  console.log(`PASS recorded owner receipt ${receipt.outboxId} as ${receipt.outcome}; no production or publication authority granted`);
}
