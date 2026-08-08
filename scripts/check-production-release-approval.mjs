#!/usr/bin/env node

import fs from 'node:fs';
import process from 'node:process';

const [approvalPath] = process.argv.slice(2);
if (!approvalPath) throw new Error('Usage: node scripts/check-production-release-approval.mjs <approval.json>');
const approval = JSON.parse(fs.readFileSync(approvalPath, 'utf8'));
const errors = [];
if (approval.schema !== 'laidies.production-release-approval.v1') errors.push('schema');
if (!/^[a-f0-9]{40}$/.test(approval.sourceCommit || '')) errors.push('sourceCommit');
if (!/^[a-f0-9]{64}$/.test(approval.artifactIdentitySha256 || '')) errors.push('artifactIdentitySha256');
if (approval.approvedBy !== 'Ali') errors.push('approvedBy');
if (approval.decision !== 'APPROVE_PRODUCTION_RELEASE') errors.push('decision');
if (approval.publicUrl !== 'https://laidies.ai/') errors.push('publicUrl');
if (!Number.isFinite(Date.parse(approval.approvedAt || ''))) errors.push('approvedAt');
if (approval.confirmation !== `APPROVE ${approval.artifactIdentitySha256} FOR PRODUCTION`) errors.push('confirmation');
if (errors.length) throw new Error(`production release approval rejected: ${errors.join(', ')}`);
console.log(`PRODUCTION RELEASE APPROVAL: PASS · ${approval.sourceCommit} · ${approval.artifactIdentitySha256}`);
