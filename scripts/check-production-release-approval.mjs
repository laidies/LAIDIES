#!/usr/bin/env node

import fs from 'node:fs';
import process from 'node:process';

const [approvalPath] = process.argv.slice(2);
if (!approvalPath) throw new Error('Usage: node scripts/check-production-release-approval.mjs <approval.json>');
const approval = JSON.parse(fs.readFileSync(approvalPath, 'utf8'));
const errors = [];
const standing = approval.schema === 'laidies.production-release-authority.v2';
if (!standing && approval.schema !== 'laidies.production-release-approval.v1') errors.push('schema');
if (!/^[a-f0-9]{40}$/.test(approval.sourceCommit || '')) errors.push('sourceCommit');
if (!/^[a-f0-9]{64}$/.test(approval.artifactIdentitySha256 || '')) errors.push('artifactIdentitySha256');
if (standing) {
  if (!/^[a-f0-9]{40}$/.test(approval.baseCommit || '')) errors.push('baseCommit');
  if (approval.authority !== 'ali-standing-authorization-2026-09-12') errors.push('authority');
  if (typeof approval.task !== 'string' || !approval.task.trim()) errors.push('task');
  if (typeof approval.executedBy !== 'string' || !approval.executedBy.trim()) errors.push('executedBy');
  if (approval.newMonetaryCost !== false) errors.push('newMonetaryCost requires explicit spending approval');
  if (approval.decision !== 'RELEASE_UNDER_STANDING_AUTHORITY') errors.push('decision');
  if (approval.approvedBy !== undefined) errors.push('do not fabricate per-artifact Ali approval');
} else {
  if (approval.approvedBy !== 'Ali') errors.push('approvedBy');
  if (approval.decision !== 'APPROVE_PRODUCTION_RELEASE') errors.push('decision');
}
if (approval.publicUrl !== 'https://laidies.ai/') errors.push('publicUrl');
if (!Number.isFinite(Date.parse((standing ? approval.recordedAt : approval.approvedAt) || ''))) errors.push('approvedAt');
if (approval.confirmation !== `${standing ? 'RELEASE' : 'APPROVE'} ${approval.artifactIdentitySha256} FOR PRODUCTION`) errors.push('confirmation');
if (errors.length) throw new Error(`production release approval rejected: ${errors.join(', ')}`);
console.log(`PRODUCTION RELEASE APPROVAL: PASS · ${approval.sourceCommit} · ${approval.artifactIdentitySha256}`);
