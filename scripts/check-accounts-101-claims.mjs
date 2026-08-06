#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const claims = JSON.parse(fs.readFileSync(path.join(root, 'content/library-books/accounts-101.claims.json'), 'utf8'));
const sourceRaw = fs.readFileSync(path.join(root, claims.canonicalSourcePath), 'utf8');
const source = JSON.parse(sourceRaw);
const rendered = fs.readFileSync(path.join(root, claims.renderedPath), 'utf8');
const libraryRaw = fs.readFileSync(path.join(root, 'library.html'), 'utf8');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const visibleText = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

function validate({ claimsRecord, sourceRecord, sourceBytes, renderedHtml, libraryHtml }) {
  const errors = [];
  if (claimsRecord.bookId !== 'accounts-101' || sourceRecord.bookId !== 'accounts-101') errors.push('book identity mismatch');
  if (claimsRecord.contentVersion !== sourceRecord.contentVersion) errors.push('content version mismatch');
  if (!renderedHtml.includes(`name="laidies:content-version" content="${sourceRecord.contentVersion}"`)) errors.push('rendered content version missing');
  if (sha(renderedHtml) !== claimsRecord.renderedSha256) errors.push('rendered hash mismatch');
  if (sha(sourceBytes) !== claimsRecord.canonicalSourceSha256) errors.push('canonical source hash mismatch');
  if (claimsRecord.status !== 'ADMITTED_LOCALLY_NOT_PUBLIC' || sourceRecord.status !== 'ADMITTED_LOCALLY_NOT_PUBLIC') errors.push('records must preserve local-only admission status');
  if (!Array.isArray(claimsRecord.claims) || claimsRecord.claims.length !== 4) errors.push('exactly four claim families required');
  const text = visibleText(renderedHtml);
  for (const claim of claimsRecord.claims || []) {
    for (const phrase of claim.requiredRenderedPhrases || []) {
      if (!text.includes(phrase)) errors.push(`${claim.id}: required rendered phrase missing: ${phrase}`);
    }
  }
  for (const phrase of claimsRecord.forbiddenRenderedPhrases || []) {
    if (renderedHtml.includes(phrase) || JSON.stringify(sourceRecord).includes(phrase)) errors.push(`forbidden universal account claim remains: ${phrase}`);
  }
  const binding = claimsRecord.integrationBindings?.find(item => item.path === 'library.html');
  if (!binding) errors.push('checksum-bound Library integration missing');
  else {
    if (sha(libraryHtml) !== binding.sha256) errors.push('Library integration hash mismatch');
    for (const phrase of binding.requiredPhrases || []) if (!libraryHtml.includes(phrase)) errors.push(`Library pre-open phrase missing: ${phrase}`);
  }
  if (!Array.isArray(sourceRecord.sources) || sourceRecord.sources.length !== 3) errors.push('three exact authority/source records required');
  for (const record of sourceRecord.sources || []) {
    if (!record.url || record.checkedOn !== '2026-08-05' || !record.scope || !record.limitation) errors.push(`${record.id}: exact URL, freshness, scope and limitation required`);
  }
  const wrong = sourceRecord.temptingWrongAnswers || [];
  const requiredWrong = [/paid/i, /work email/i, /delete/i, /NDA/i];
  for (const pattern of requiredWrong) {
    const row = wrong.find(item => pattern.test(item.statement || ''));
    if (!row || row.verdict !== 'reject') errors.push(`safety proof must reject ${pattern}`);
  }
  if (!sourceRecord.decisionRule?.steps || sourceRecord.decisionRule.steps.length !== 5) errors.push('five-step pre-paste rule required');
  if (!sourceRecord.workedDecision?.routes || sourceRecord.workedDecision.routes.length !== 3) errors.push('three-route worked decision required');
  if (!text.includes('One decision through all five checks') || !text.includes('Use only the approved minimized brief')) errors.push('worked decision is not visible in rendered book');
  if (!sourceRecord.decisionRule?.limitation?.includes('not legal advice')) errors.push('legal/authority limit missing');
  if (!sourceRecord.analogy?.limit?.includes('not privacy, security or legal evidence')) errors.push('analogy evidence limit missing');
  if (!sourceRecord.ownership?.privacyTerms || !sourceRecord.ownership?.residentCard || !sourceRecord.ownership?.toolCards || !sourceRecord.ownership?.classes) errors.push('product ownership boundaries incomplete');
  if (!sourceRecord.correctionRoute?.privacyBoundary?.includes('do not email passwords')) errors.push('privacy-safe correction route missing');
  return errors;
}

const actual = { claimsRecord: claims, sourceRecord: source, sourceBytes: sourceRaw, renderedHtml: rendered, libraryHtml: libraryRaw };
const errors = validate(actual);
if (errors.length) {
  console.error(`ACCOUNTS 101 CLAIMS FAIL: ${errors.join('; ')}`);
  process.exit(1);
}

if (process.argv.includes('--calibrate')) {
  for (const pattern of [/paid/i, /work email/i, /delete/i, /NDA/i]) {
    const badSource = structuredClone(source);
    badSource.temptingWrongAnswers.find(item => pattern.test(item.statement)).verdict = 'accept';
    assert.ok(validate({ ...actual, sourceRecord: badSource }).some(error => /safety proof must reject/.test(error)), `calibration must reject accepted ${pattern}`);
  }
  const unsafeLibrary = libraryRaw.replace('Before you paste real material, verify the exact account, your authority and the current rule—and stop when any answer is unknown.', 'Paid account means safe to paste.');
  assert.ok(validate({ ...actual, libraryHtml: unsafeLibrary }).some(error => /Library pre-open phrase missing/.test(error)), 'calibration must reject paid=safe shelf promise');
  console.log('ACCOUNTS 101 CLAIMS CALIBRATION PASS paid_safe=rejected work_email_safe=rejected delete_later=rejected setting_overrides_nda=rejected unsafe_shelf=rejected');
}

console.log(`ACCOUNTS 101 CLAIMS PASS claims=${claims.claims.length} sources=${source.sources.length} wrong_answers=${source.temptingWrongAnswers.length} rendered_sha256=${claims.renderedSha256} status=ADMITTED_LOCALLY_NOT_PUBLIC`);
