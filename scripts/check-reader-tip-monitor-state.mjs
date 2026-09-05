#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const statePath = path.join(root, 'operations/agents/aidb-intelligence-desk/sources/reader-tip-monitor-state.json');
const dispositions = new Set(['DISCARD', 'DUPLICATE', 'HOLD', 'MERGE', 'CREATE']);
const accessStates = new Set(['SEEDED', 'ACCESSIBLE', 'PARTIAL', 'INACCESSIBLE']);

const fail = (errors, message) => errors.push(message);
const isDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
const existsRepoRelative = value => typeof value === 'string' && value.length > 0 && !path.isAbsolute(value) && fs.existsSync(path.join(root, value));

export function canonicalize(raw) {
  const url = new URL(raw);
  if (url.protocol !== 'https:') throw new Error(`URL must use HTTPS: ${raw}`);
  url.hash = '';
  for (const key of [...url.searchParams.keys()]) {
    if (key.startsWith('utm_') || ['igsh', 'igsi', 'fbclid'].includes(key)) url.searchParams.delete(key);
  }
  url.hostname = url.hostname.toLowerCase();
  url.pathname = url.pathname.replace(/\/+$/, '') + '/';
  return url.toString();
}

export function validateState(state, { checkFiles = true } = {}) {
  const errors = [];
  if (state?.schemaVersion !== 'reader-tip-monitor-state-v1') fail(errors, 'wrong schemaVersion');
  if (state?.owner !== 'aidb-intelligence-desk') fail(errors, 'wrong owner');
  if (state?.publicationAuthority !== false) fail(errors, 'publicationAuthority must be false');
  if (state?.spendAuthority !== false) fail(errors, 'spendAuthority must be false');
  if (state?.cadence?.frequency !== 'WEEKLY' || state?.cadence?.lookbackDays !== 10 || state?.cadence?.overlapDays !== 3) fail(errors, 'cadence must be weekly with 10-day lookback and 3-day overlap');

  const sourceKeys = new Set();
  for (const source of state?.sources || []) {
    if (!source.sourceKey || sourceKeys.has(source.sourceKey)) fail(errors, `duplicate or missing sourceKey: ${source.sourceKey}`);
    sourceKeys.add(source.sourceKey);
    try { source.channelUrl = canonicalize(source.channelUrl); } catch (error) { fail(errors, error.message); }
    if (checkFiles && !existsRepoRelative(source.sourceRecord)) fail(errors, `missing sourceRecord: ${source.sourceRecord}`);
    const a = source.lastAttempt;
    if (!a || !isDate(a.attemptedAt) || !accessStates.has(a.accessState)) fail(errors, `invalid lastAttempt for ${source.sourceKey}`);
    if (['PARTIAL', 'INACCESSIBLE'].includes(a?.accessState)) {
      if (a.cursorAdvanced !== false) fail(errors, `${source.sourceKey} failed access advanced cursor`);
      if (!a.failureReason || !a.nextTrigger) fail(errors, `${source.sourceKey} failed access needs reason and retry trigger`);
    }
  }

  const itemKeys = new Set();
  const urls = new Set();
  for (const item of state?.items || []) {
    if (!item.itemKey || itemKeys.has(item.itemKey)) fail(errors, `duplicate or missing itemKey: ${item.itemKey}`);
    itemKeys.add(item.itemKey);
    if (!sourceKeys.has(item.sourceKey)) fail(errors, `unknown item sourceKey: ${item.sourceKey}`);
    let url;
    try { url = canonicalize(item.canonicalUrl); } catch (error) { fail(errors, error.message); }
    if (url && urls.has(url)) fail(errors, `duplicate canonical URL: ${url}`);
    if (url) urls.add(url);
    if (!isDate(item.firstSeenAt) || !item.reason || !dispositions.has(item.disposition)) fail(errors, `incomplete item: ${item.itemKey}`);
    if (item.publishedAt !== null && !isDate(item.publishedAt)) fail(errors, `invalid publishedAt: ${item.itemKey}`);
    if (item.publishedAt === null && !item.observedPublishedLabel) fail(errors, `missing observed publication label: ${item.itemKey}`);
    if (checkFiles && !existsRepoRelative(item.receiptPath)) fail(errors, `missing receiptPath: ${item.receiptPath}`);
    if (item.disposition === 'HOLD' && (!item.evidenceGap || !item.nextTrigger)) fail(errors, `HOLD needs evidenceGap and nextTrigger: ${item.itemKey}`);
    if (item.disposition === 'MERGE' && !item.target) fail(errors, `MERGE needs exact target: ${item.itemKey}`);
    if (item.disposition === 'CREATE' && !item.receivingOwner) fail(errors, `CREATE needs receivingOwner: ${item.itemKey}`);
    if (item.disposition === 'DUPLICATE' && !item.target) fail(errors, `DUPLICATE needs existing target: ${item.itemKey}`);
    for (const forbidden of ['caption', 'transcript', 'carouselText', 'sourceBody', 'promptText']) {
      if (Object.hasOwn(item, forbidden)) fail(errors, `copied source field forbidden (${forbidden}): ${item.itemKey}`);
    }
  }
  if (!Array.isArray(state?.attempts)) fail(errors, 'attempts must be an array');
  else {
    let priorAttempt = -Infinity;
    for (const attempt of state.attempts) {
      const currentAttempt = Date.parse(attempt.attemptedAt);
      if (!Number.isFinite(currentAttempt)) fail(errors, `invalid attempt date: ${attempt.runId}`);
      if (currentAttempt < priorAttempt) fail(errors, `attempts are not chronological: ${attempt.runId}`);
      priorAttempt = currentAttempt;
    }
  }
  return errors;
}

export function validateTransaction(tx, state) {
  const errors = [];
  if (tx?.schemaVersion !== 'reader-tip-scan-transaction-v1') fail(errors, 'wrong transaction schemaVersion');
  if (!tx?.runId || !isDate(tx?.attemptedAt) || !['SCAN', 'SEED'].includes(tx?.mode)) fail(errors, 'invalid transaction identity');
  const sources = new Map((state.sources || []).map(source => [source.sourceKey, source]));
  for (const result of tx?.sourceResults || []) {
    const prior = sources.get(result.sourceKey);
    if (!prior) { fail(errors, `unknown transaction source: ${result.sourceKey}`); continue; }
    if (tx.mode === 'SCAN' && !['ACCESSIBLE', 'PARTIAL', 'INACCESSIBLE'].includes(result.accessState)) fail(errors, `invalid scan access state: ${result.sourceKey}`);
    if (tx.mode === 'SEED' && result.accessState !== 'SEEDED') fail(errors, `seed must use SEEDED: ${result.sourceKey}`);
    if (['PARTIAL', 'INACCESSIBLE'].includes(result.accessState)) {
      if (result.cursorAfter !== null) fail(errors, `failed access supplied cursor: ${result.sourceKey}`);
      if (!result.failureReason || !result.nextTrigger) fail(errors, `failed access needs reason and trigger: ${result.sourceKey}`);
    }
    if (result.accessState === 'ACCESSIBLE') {
      if (!isDate(result.queryFromAt) || !isDate(result.cursorAfter)) fail(errors, `accessible result needs query and cursor: ${result.sourceKey}`);
      const attemptedAt = Date.parse(tx.attemptedAt);
      const normalWindowStart = attemptedAt - 10 * 86400000;
      const recoveryWindowStart = prior.lastSuccessfulScanAt
        ? Date.parse(prior.lastSuccessfulScanAt) - 3 * 86400000
        : normalWindowStart;
      const requiredStart = Math.min(normalWindowStart, recoveryWindowStart);
      if (isDate(result.queryFromAt) && Date.parse(result.queryFromAt) > requiredStart) fail(errors, `query window is too short or leaves a missed-run gap: ${result.sourceKey}`);
    }
  }
  return errors;
}

function load(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const state = load(statePath);
  const errors = validateState(state);
  if (process.argv.includes('--calibrate')) {
    const bad = structuredClone(state);
    bad.publicationAuthority = true;
    bad.items[1].canonicalUrl = bad.items[0].canonicalUrl + '?igsh=tracking';
    bad.items[0].caption = 'copied source body';
    const calibrationErrors = validateState(bad);
    if (calibrationErrors.length < 3) {
      console.error('FAIL calibration did not reject known-bad state');
      process.exit(1);
    }
    const badTx = {schemaVersion:'reader-tip-scan-transaction-v1',runId:'bad',attemptedAt:'2026-09-11T09:00:00-07:00',mode:'SCAN',sourceResults:[{sourceKey:'GOD_OF_PROMPT',accessState:'ACCESSIBLE',queryFromAt:'2026-09-02T09:00:01-07:00',cursorAfter:'2026-09-11T09:00:00-07:00'}]};
    if (!validateTransaction(badTx, state).some(error => error.includes('too short'))) {
      console.error('FAIL calibration accepted a short overlap');
      process.exit(1);
    }
    console.log('PASS reader-tip monitor calibration rejected known-bad state and short overlap');
  }
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log('PASS reader-tip monitor state');
}
