#!/usr/bin/env node
import fs from 'node:fs';
import { readOwnerReceipt, statePath, validateState } from './check-reader-tip-monitor-state.mjs';

const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
const errors = validateState(state);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const pending = state.outbox.filter(entry => !readOwnerReceipt(entry).receipt);
if (!pending.length) {
  console.log('QUIET — no reader-tip findings or access failures await owner receipt.');
  process.exit(0);
}

console.log(`LAiDIES READER-TIP INTELLIGENCE — ${pending.length} item(s) need a real owner receipt`);
for (const entry of pending) {
  console.log('');
  console.log(`${entry.disposition}: ${entry.summary}`);
  console.log(`Source: ${entry.sourceUrl}`);
  if (entry.target) console.log(`Existing destination: ${entry.target}`);
  if (entry.evidenceGap) console.log(`What is missing: ${entry.evidenceGap}`);
  console.log(`Why it is still open: ${entry.nextTrigger}`);
  console.log(`Accountable owner: ${entry.receivingOwner} — task ${entry.receivingTaskId}`);
  console.log(`Evidence: ${entry.sourceReceiptPath} (${entry.sourceReceiptSha256})`);
  console.log('Authority: intake only; no drafting, production, publication or spend authority.');
}
console.log('');
console.log('SURFACE_REQUIRED — this output must be returned as the automation final message; silence is prohibited.');
process.exitCode = 2;
