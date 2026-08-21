#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const sourceScript = path.resolve(import.meta.dirname, 'quarantine-repository-wide-rejected-material.mjs');
const checkerScript = path.resolve(import.meta.dirname, 'check-repository-hygiene.mjs');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-repository-hygiene-'));
try {
  const root = path.join(directory, 'root'); const destination = path.join(directory, 'quarantine');
  fs.mkdirSync(path.join(root, 'operations/assets'), { recursive: true });
  fs.mkdirSync(path.join(root, 'operations/quarantine'), { recursive: true });
  fs.mkdirSync(path.join(root, '.retired'), { recursive: true });
  fs.writeFileSync(path.join(root, '.retired', 'old.txt'), 'old');
  fs.writeFileSync(path.join(root, 'operations/assets/active-asset-registry.json'), JSON.stringify({ entries: [] }));
  fs.writeFileSync(path.join(root, 'operations/quarantine/repository-wide-denylist-20260820.json'), JSON.stringify({ explicit_paths: ['.retired'] }));
  const apply = spawnSync(process.execPath, [sourceScript, root, destination, '--apply'], { encoding: 'utf8' });
  assert.equal(apply.status, 0, apply.stderr);
  const valid = spawnSync(process.execPath, [sourceScript, root, destination, '--verify'], { encoding: 'utf8' });
  assert.equal(valid.status, 0, valid.stderr);
  fs.writeFileSync(path.join(destination, '.retired', 'old.txt'), 'tampered');
  const tampered = spawnSync(process.execPath, [sourceScript, root, destination, '--verify'], { encoding: 'utf8' });
  assert.notEqual(tampered.status, 0);

  const fixture = path.join(directory, 'checker-fixture');
  const writeJson = (relative, value) => {
    const filename = path.join(fixture, relative);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, `${JSON.stringify(value, null, 2)}\n`);
  };
  const rejectedSha = '3bf3d6bddd659af063426701541c4d19debc2a39707bde2f7435a555cc835508';
  const rejectedPageSha = '615a80f75bede151067fa447eb514cc535c14a1c5c4bf4d19baa5fbe04077dab';
  writeJson('operations/quarantine/repository-wide-denylist-20260820.json', {
    explicit_paths: [], rejected_consumer_sha256: [{ sha256: rejectedPageSha, surface: 'Library page' }]
  });
  writeJson('operations/assets/active-asset-registry.json', { entries: [], retired_paths: [] });
  writeJson('content/library-books/rejected-artifacts.json', { artifacts: [{ book_id: 'concepts-101', artifact_sha256: rejectedSha }] });
  const validAdmission = { books: [
    { book_id: 'ai-fundamentals-101', status: 'pending-successor', artifact_sha256: '' },
    { book_id: 'concepts-101', status: 'source-mine-only', artifact_sha256: rejectedSha }
  ] };
  writeJson('content/library-books/admission-manifest.json', validAdmission);
  writeJson('operations/launch/opening-day-whole-town-program-2026-07-31.json', { library_opening_book_ids: ['ai-fundamentals-101'] });
  const runChecker = () => spawnSync(process.execPath, [checkerScript, '--root', fixture], { encoding: 'utf8' });
  const validChecker = runChecker();
  assert.equal(validChecker.status, 0, validChecker.stderr);

  writeJson('operations/assets/active-asset-registry.json', {
    entries: [{ role: 'library-hero', status: 'ACTIVE', path: 'assets/library.png', scope_sha256: rejectedPageSha }], retired_paths: []
  });
  assert.notEqual(runChecker().status, 0, 'checker accepted an ACTIVE rejected consumer SHA');

  writeJson('operations/assets/active-asset-registry.json', { entries: [], retired_paths: [] });
  writeJson('content/library-books/admission-manifest.json', { books: [{ book_id: 'concepts-101', status: 'hold', artifact_sha256: rejectedSha }] });
  assert.notEqual(runChecker().status, 0, 'checker accepted a rejected artifact in an admission state');

  writeJson('content/library-books/admission-manifest.json', validAdmission);
  writeJson('operations/launch/opening-day-whole-town-program-2026-07-31.json', { library_opening_book_ids: ['concepts-101'] });
  assert.notEqual(runChecker().status, 0, 'checker accepted a source-mine-only identity in the opening-day set');

  console.log('REPOSITORY HYGIENE CALIBRATION PASS valid=passed hash_tamper=failed active_rejected_sha=failed rejected_admission=failed opening_identity=failed');
} finally { fs.rmSync(directory, { recursive: true, force: true }); }
