#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const source = path.resolve(process.argv[2] || path.resolve(import.meta.dirname, '..'));
const apply = process.argv.includes('--apply');
const reportIndex = process.argv.indexOf('--report-to');
const reportPath = reportIndex >= 0 ? path.resolve(process.argv[reportIndex + 1]) : null;
const deny = JSON.parse(fs.readFileSync(path.join(path.resolve(import.meta.dirname, '..'), 'operations/quarantine/repository-wide-denylist-20260820.json'), 'utf8'));
const registryPath = path.join(source, 'operations/assets/active-asset-registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const rejected = new Map((deny.rejected_consumer_sha256 || []).map((row) => [row.sha256, row]));
const demotions = [];
for (const entry of registry.entries || []) {
  if (entry.status !== 'ACTIVE') continue;
  const sourceText = JSON.stringify(entry);
  const match = [...rejected.entries()].find(([sha]) => sourceText.includes(sha));
  if (!match) continue;
  const [sha, authority] = match;
  demotions.push({ role: entry.role, path: entry.path, rejected_consumer_sha256: sha, prior_status: entry.status, new_status: 'HOLD_REJECTED_CONSUMER_BINDING' });
  if (apply) {
    entry.status = 'HOLD_REJECTED_CONSUMER_BINDING';
    entry.rejection_reason = `${authority.surface} ${sha} is directly rejected; exact current consumer re-admission required`;
  }
}
const report = { schema: 'laidies.rejected-consumer-authority-demotions.v1', source_root: source, applied: apply, demotions };
if (apply) fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
if (reportPath) { fs.mkdirSync(path.dirname(reportPath), { recursive: true }); fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`); }
console.log(`REJECTED CONSUMER BINDING ${apply ? 'DEMOTION' : 'AUDIT'} PASS demotions=${demotions.length}`);
