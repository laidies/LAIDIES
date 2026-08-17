#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../../..');
const manifestPath = resolve(import.meta.dirname, 'release-candidate.json');

const fail = (code, detail = '') => {
  const error = new Error(`${code}${detail ? `: ${detail}` : ''}`);
  error.code = code;
  throw error;
};

const sha256 = async (path) => {
  const hash = createHash('sha256');
  hash.update(await readFile(path));
  return hash.digest('hex');
};

const assertLocalFile = async (record, label) => {
  const path = resolve(root, record.path);
  const info = await stat(path).catch(() => fail('LOCAL_FILE_MISSING', `${label} ${record.path}`));
  if (record.bytes != null && info.size !== record.bytes) fail('LOCAL_FILE_SIZE_MISMATCH', label);
  if (await sha256(path) !== record.sha256) fail('LOCAL_FILE_SHA_MISMATCH', label);
};

const validate = async (manifest, { verifyFiles = true } = {}) => {
  if (manifest.schemaVersion !== 1) fail('SCHEMA_VERSION_UNSUPPORTED');
  if (manifest.candidateId !== 'EP04-SITE-FILM-2026-08-17-V11') fail('CANDIDATE_ID_MISMATCH');
  if (manifest.film.sha256 !== manifest.humanReview.requiredFilmSha256) fail('HUMAN_REVIEW_FILM_IDENTITY_MISMATCH');
  if (manifest.occurrenceAdmission.expectedCount !== 55) fail('OCCURRENCE_COUNT_MISMATCH');
  if (manifest.poster.publicVerification.bodySha256 !== manifest.poster.sha256 || manifest.poster.publicVerification.result !== 'PASS') {
    fail('POSTER_PUBLIC_IDENTITY_NOT_VERIFIED');
  }
  if (verifyFiles) {
    await assertLocalFile(manifest.film, 'film');
    await assertLocalFile(manifest.captions, 'captions');
    await assertLocalFile(manifest.poster, 'poster');
    for (const evidence of manifest.objectiveEvidence) await assertLocalFile(evidence, `evidence ${evidence.path}`);
  }

  const claimsReady = manifest.releaseReady === true || manifest.status === 'ADMITTED_FOR_GUARDED_INTEGRATION';
  if (claimsReady) {
    if (manifest.humanReview.status !== 'PASS' || !manifest.humanReview.receiptPath || !manifest.humanReview.receiptSha256) {
      fail('HUMAN_REVIEW_PASS_RECEIPT_REQUIRED');
    }
    if (manifest.occurrenceAdmission.status !== 'PASS' || !manifest.occurrenceAdmission.receiptPath || !manifest.occurrenceAdmission.receiptSha256) {
      fail('OCCURRENCE_ADMISSION_RECEIPT_REQUIRED');
    }
    if (manifest.publicFilm.uploadStatus !== 'VERIFIED' || !manifest.publicFilm.publicUrl || !manifest.publicFilm.verificationReceiptPath || !manifest.publicFilm.verificationReceiptSha256) {
      fail('PUBLIC_FILM_VERIFICATION_RECEIPT_REQUIRED');
    }
    if (manifest.gates.screeningRoomIntegration !== 'PASS' || manifest.gates.authorizedDeployment !== 'PASS' || manifest.gates.exactPublicJourneyVerification !== 'PASS') {
      fail('PUBLIC_INTEGRATION_GATES_INCOMPLETE');
    }
  }
  return true;
};

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
await validate(manifest);

const calibrationCases = [
  {
    name: 'film hash mutation',
    code: 'LOCAL_FILE_SHA_MISMATCH',
    mutate: (m) => { m.film.sha256 = '0'.repeat(64); m.humanReview.requiredFilmSha256 = '0'.repeat(64); },
    verifyFiles: true
  },
  {
    name: 'premature release-ready claim',
    code: 'HUMAN_REVIEW_PASS_RECEIPT_REQUIRED',
    mutate: (m) => { m.releaseReady = true; },
    verifyFiles: false
  },
  {
    name: 'human pass without occurrence receipt',
    code: 'OCCURRENCE_ADMISSION_RECEIPT_REQUIRED',
    mutate: (m) => {
      m.releaseReady = true;
      m.humanReview.status = 'PASS';
      m.humanReview.receiptPath = 'receipt.json';
      m.humanReview.receiptSha256 = '1'.repeat(64);
    },
    verifyFiles: false
  },
  {
    name: 'admissions without verified public film',
    code: 'PUBLIC_FILM_VERIFICATION_RECEIPT_REQUIRED',
    mutate: (m) => {
      m.releaseReady = true;
      m.humanReview.status = 'PASS';
      m.humanReview.receiptPath = 'human.json';
      m.humanReview.receiptSha256 = '1'.repeat(64);
      m.occurrenceAdmission.status = 'PASS';
      m.occurrenceAdmission.receiptPath = 'occurrences.json';
      m.occurrenceAdmission.receiptSha256 = '2'.repeat(64);
    },
    verifyFiles: false
  }
];

for (const test of calibrationCases) {
  const copy = structuredClone(manifest);
  test.mutate(copy);
  let rejected = false;
  try {
    await validate(copy, { verifyFiles: test.verifyFiles });
  } catch (error) {
    if (error.code !== test.code) fail('CALIBRATION_WRONG_REJECTION', `${test.name} got ${error.code}, expected ${test.code}`);
    rejected = true;
  }
  if (!rejected) fail('CALIBRATION_FALSE_ACCEPT', test.name);
}

console.log(`EP04_V11_RELEASE_CANDIDATE_PASS status=${manifest.status} release_ready=${manifest.releaseReady} calibrated_rejects=${calibrationCases.length}`);
