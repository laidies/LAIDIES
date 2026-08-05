#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const claimsPath = path.join(root, 'content/library-books/setup-101.claims.json');
const claims = JSON.parse(fs.readFileSync(claimsPath, 'utf8'));
const sourceRaw = fs.readFileSync(path.join(root, claims.canonicalSourcePath), 'utf8');
const source = JSON.parse(sourceRaw);
const rendered = fs.readFileSync(path.join(root, claims.renderedPath), 'utf8');
const libraryRaw = fs.readFileSync(path.join(root, 'library.html'), 'utf8');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const visibleText = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

function validate({ claimsRecord, sourceRecord, sourceBytes, renderedHtml, libraryHtml }) {
  const errors = [];
  if (claimsRecord.bookId !== 'setup-101' || sourceRecord.bookId !== 'setup-101') errors.push('book identity mismatch');
  if (claimsRecord.contentVersion !== sourceRecord.contentVersion) errors.push('content version mismatch');
  if (!renderedHtml.includes(`name="laidies:content-version" content="${sourceRecord.contentVersion}"`)) errors.push('rendered content version missing');
  if (sha(renderedHtml) !== claimsRecord.renderedSha256) errors.push('rendered hash mismatch');
  if (sha(sourceBytes) !== claimsRecord.canonicalSourceSha256) errors.push('canonical source hash mismatch');
  if (!/HOLD/.test(claimsRecord.status) || !/HOLD/.test(sourceRecord.status)) errors.push('maker candidate must remain HOLD');
  if (!Array.isArray(claimsRecord.claims) || claimsRecord.claims.length !== 4) errors.push('exactly four claim families required');
  for (const claim of claimsRecord.claims || []) {
    for (const phrase of claim.requiredRenderedPhrases || []) {
      if (!visibleText(renderedHtml).includes(phrase)) errors.push(`${claim.id}: required rendered phrase missing: ${phrase}`);
    }
  }
  for (const phrase of claimsRecord.forbiddenRenderedPhrases || []) {
    if (renderedHtml.includes(phrase) || JSON.stringify(sourceRecord).includes(phrase)) errors.push(`forbidden or unsupported claim remains: ${phrase}`);
  }
  const libraryBinding = claimsRecord.integrationBindings?.find(binding => binding.path === 'library.html');
  if (!libraryBinding) errors.push('checksum-bound Library integration missing');
  else {
    if (sha(libraryHtml) !== libraryBinding.sha256) errors.push('Library integration hash mismatch');
    for (const phrase of libraryBinding.requiredPhrases || []) {
      if (!libraryHtml.includes(phrase)) errors.push(`Library pre-open phrase missing: ${phrase}`);
    }
  }
  if (!Array.isArray(sourceRecord.sources) || sourceRecord.sources.length !== 4) errors.push('four exact provider source records required');
  for (const record of sourceRecord.sources || []) {
    if (!/^https:\/\/(help\.openai\.com|support\.anthropic\.com)\//.test(record.url || '')) errors.push(`${record.id}: source must be official provider help`);
    if (record.checkedOn !== '2026-08-05') errors.push(`${record.id}: source freshness date missing`);
    if (!record.scope || !record.limitation) errors.push(`${record.id}: scope and limitation required`);
  }
  const items = sourceRecord.sortingCheck?.items || [];
  const password = items.find(item => /password/i.test(item.item || ''));
  if (!password || password.bestFit !== 'nowhere') errors.push('sorting check must reject password storage');
  const nda = items.find(item => /NDA/i.test(item.item || ''));
  if (!nda || nda.bestFit !== 'nowhere-until-authorized') errors.push('sorting check must hold NDA material until authorized');
  if (!sourceRecord.analogy?.limit?.includes('do not prove')) errors.push('bounded analogy limit missing');
  if (!sourceRecord.continuation?.accounts101 || !sourceRecord.continuation?.toolCards || !sourceRecord.continuation?.classes) errors.push('Accounts/tool-card/class ownership routes required');
  if (!sourceRecord.correctionRoute?.privacyBoundary?.includes('do not email passwords')) errors.push('privacy-safe correction boundary missing');
  return errors;
}

const errors = validate({ claimsRecord: claims, sourceRecord: source, sourceBytes: sourceRaw, renderedHtml: rendered, libraryHtml: libraryRaw });
if (errors.length) {
  console.error(`SETUP 101 CLAIMS FAIL: ${errors.join('; ')}`);
  process.exit(1);
}

if (process.argv.includes('--calibrate')) {
  const badSource = structuredClone(source);
  badSource.sortingCheck.items.find(item => /password/i.test(item.item)).bestFit = 'optional-memory';
  const badErrors = validate({ claimsRecord: claims, sourceRecord: badSource, sourceBytes: sourceRaw, renderedHtml: rendered, libraryHtml: libraryRaw });
  assert.ok(badErrors.some(error => /password storage/.test(error)), 'calibration fixture must reject password → memory');
  const badRendered = rendered.replace('Placement is not permission to upload', 'Saving it means upload is permitted');
  const renderedErrors = validate({ claimsRecord: claims, sourceRecord: source, sourceBytes: sourceRaw, renderedHtml: badRendered, libraryHtml: libraryRaw });
  assert.ok(renderedErrors.some(error => /required rendered phrase missing/.test(error)), 'calibration fixture must reject missing upload boundary');
  const unsafeLibrary = libraryRaw.replace('Decide what belongs in standing instructions, optional memory, one project—or nowhere—before you expect it to follow you.', 'Set it up once so every tool already knows how you work.');
  const libraryErrors = validate({ claimsRecord: claims, sourceRecord: source, sourceBytes: sourceRaw, renderedHtml: rendered, libraryHtml: unsafeLibrary });
  assert.ok(libraryErrors.some(error => /Library pre-open phrase missing/.test(error)), 'calibration fixture must reject universal shelf promise');
  console.log('SETUP 101 CLAIMS CALIBRATION PASS password_to_memory=rejected upload_authority_bypass=rejected universal_shelf_promise=rejected');
}

console.log(`SETUP 101 CLAIMS PASS claims=${claims.claims.length} sources=${source.sources.length} sorting_items=${source.sortingCheck.items.length} rendered_sha256=${claims.renderedSha256} status=HOLD`);
