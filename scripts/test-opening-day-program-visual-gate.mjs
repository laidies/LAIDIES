#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const checker = path.join(root, 'scripts/check-opening-day-program.mjs');
const source = path.join(root, 'operations/launch/opening-day-whole-town-program-2026-07-31.json');

const clean = spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8' });
assert.equal(clean.status, 0, clean.stderr || clean.stdout);
const admissionMatch = clean.stdout.match(/(\d+)\/17 buildings have exact visual-experience admission/);
assert.ok(admissionMatch, 'opening-day output must report the exact visual-admission count');
const currentVisualAdmissions = Number(admissionMatch[1]);
assert.ok(currentVisualAdmissions >= 0 && currentVisualAdmissions < 17,
  `current programme must remain below 17 visual admissions until every building passes; found ${currentVisualAdmissions}`);
assert.match(clean.stdout, /SPECIFICATION VALID — NOT RELEASE READY/);
assert.match(clean.stdout, /LAUNCH READINESS: HOLD/);

const strict = spawnSync(process.execPath, [checker, '--require-launch-ready'], { cwd: root, encoding: 'utf8' });
assert.notEqual(strict.status, 0, 'strict launch must reject a specification-only HOLD');
assert.match(strict.stderr, /Strict launch requires all 17 buildings/);
assert.match(strict.stderr, /Strict launch requires 5\/5 opening media programmes PASS/);
assert.match(strict.stderr, /Strict launch class readiness is fail-closed/);
assert.match(strict.stderr, /Strict launch requires all 4 opening Library books available/);
assert.match(strict.stderr, /Strict launch site-video readiness is fail-closed/);

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-visual-gate-'));
try {
  const fixture = JSON.parse(fs.readFileSync(source, 'utf8'));
  fixture.buildings[0].status = 'RELEASE_READY';
  delete fixture.buildings[0].visual_experience_admission;
  const fixturePath = path.join(tempDir, 'program.json');
  fs.writeFileSync(fixturePath, `${JSON.stringify(fixture, null, 2)}\n`);

  const rejected = spawnSync(process.execPath, [checker], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, LAIDIES_OPENING_DAY_PROGRAM_PATH: fixturePath },
  });
  assert.notEqual(rejected.status, 0, 'gate must reject a release-ready building without visual admission');
  assert.match(rejected.stderr, /requires exact visual-experience admission/);

  fixture.site_video_gate_manifest = 'operations/video-qa/does-not-exist.json';
  fs.writeFileSync(fixturePath, `${JSON.stringify(fixture, null, 2)}\n`);
  const missingSharedGate = spawnSync(process.execPath, [checker], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, LAIDIES_OPENING_DAY_PROGRAM_PATH: fixturePath },
  });
  assert.notEqual(missingSharedGate.status, 0, 'gate must reject a missing shared site-video gate');
  assert.match(missingSharedGate.stderr, /Universal site video and animation gate manifest is missing/);

  const staleLibraryFixture = JSON.parse(fs.readFileSync(source, 'utf8'));
  staleLibraryFixture.library_opening_book_ids[0] = 'vocab-101';
  fs.writeFileSync(fixturePath, `${JSON.stringify(staleLibraryFixture, null, 2)}\n`);
  const staleLibrary = spawnSync(process.execPath, [checker], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, LAIDIES_OPENING_DAY_PROGRAM_PATH: fixturePath },
  });
  assert.notEqual(staleLibrary.status, 0, 'gate must reject the retired Vocab 101 launch contract');
  assert.match(staleLibrary.stderr, /Opening-day Library book IDs must be ai-fundamentals-101/);

  const rejectedConceptsFixture = JSON.parse(fs.readFileSync(source, 'utf8'));
  rejectedConceptsFixture.library_opening_book_ids[0] = 'concepts-101';
  fs.writeFileSync(fixturePath, `${JSON.stringify(rejectedConceptsFixture, null, 2)}\n`);
  const rejectedConcepts = spawnSync(process.execPath, [checker], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, LAIDIES_OPENING_DAY_PROGRAM_PATH: fixturePath },
  });
  assert.notEqual(rejectedConcepts.status, 0, 'gate must reject the directly rejected Concepts 101 launch identity');
  assert.match(rejectedConcepts.stderr, /Opening-day Library book IDs must be ai-fundamentals-101/);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log('OPENING DAY VISUAL GATE CALIBRATION: PASS');
console.log(`- Current programme is specification-valid but not release-ready with ${currentVisualAdmissions}/17 exact visual admissions.`);
console.log('- Deliberately promoted building without visual proof was rejected.');
console.log(`- Strict launch failed closed for missing class/site-video readiness schema and ${currentVisualAdmissions}/17, 0/5 readiness.`);
console.log('- Deliberately missing shared site-video gate was rejected.');
console.log('- Deliberately restored retired Vocab 101 to the launch contract and was rejected.');
console.log('- Deliberately restored rejected Concepts 101 to the launch contract and was rejected.');
