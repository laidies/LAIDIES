#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { validateProgram } from './check-three-page-design-program.mjs';

const root = process.cwd();
const manifestPath = 'operations/design-programs/homepage-library-visitors-20260822.json';
const manifest = JSON.parse(fs.readFileSync(path.join(root, manifestPath), 'utf8'));
const scratch = `operations/design-explorations/current/visitors-centre/.guard-fixture-${process.pid}`;
const scratchAbsolute = path.join(root, scratch);
const sha = value => crypto.createHash('sha256').update(value).digest('hex');

function expectFailure(name, mutated, expected) {
  const fixturePath = path.join(scratchAbsolute, `${name}.json`);
  fs.writeFileSync(fixturePath, `${JSON.stringify(mutated, null, 2)}\n`);
  const errors = validateProgram({ root, manifestPath: fixturePath, verifyGit: false });
  if (!errors.some(error => error.includes(expected))) throw new Error(`${name}: expected ${expected}; got ${errors.join(' | ')}`);
}

fs.mkdirSync(scratchAbsolute, { recursive: true });
try {
  const baselineErrors = validateProgram({ root, manifestPath, verifyGit: false });
  if (baselineErrors.length) throw new Error(`baseline failed: ${baselineErrors.join(' | ')}`);

  const staleHash = structuredClone(manifest);
  staleHash.pages.homepage.allowed_existing_assets[0].sha256 = '0'.repeat(64);
  expectFailure('stale-hash', staleHash, 'hash mismatch');

  const oldLobby = manifest.pages['visitors-centre'].prohibited_assets[0];
  const sourcePath = `${scratch}/candidate.html`;
  const body = `<img src="/${oldLobby.path}" alt="fixture">\n`;
  fs.writeFileSync(path.join(root, sourcePath), body);
  const rejectedLobby = structuredClone(manifest);
  rejectedLobby.pages['visitors-centre'].candidates.push({
    id: 'known-bad-lobby-fixture',
    status: 'DRAFT_TRACKED',
    entry_path: sourcePath,
    source_files: [{ path: sourcePath, sha256: sha(body) }],
    dependencies: [oldLobby]
  });
  expectFailure('rejected-lobby', rejectedLobby, 'prohibited dependency');

  const undeclared = structuredClone(manifest);
  undeclared.pages['visitors-centre'].candidates.push({
    id: 'undeclared-dependency-fixture',
    status: 'DRAFT_TRACKED',
    entry_path: sourcePath,
    source_files: [{ path: sourcePath, sha256: sha(body) }],
    dependencies: []
  });
  expectFailure('undeclared-dependency', undeclared, 'unmanifested asset reference');

  const staleJeeves = manifest.global_prohibited_assets.find(item => item.path === 'assets/library/jeeves-scene.webp');
  const homepageScratch = `operations/design-explorations/current/homepage/.guard-fixture-${process.pid}`;
  const homepageAbsolute = path.join(root, homepageScratch);
  fs.mkdirSync(homepageAbsolute, { recursive: true });
  const homepageSource = `${homepageScratch}/candidate.html`;
  const homepageBody = `<img src="/${staleJeeves.path}" alt="fixture">\n`;
  fs.writeFileSync(path.join(root, homepageSource), homepageBody);
  const rejectedJeeves = structuredClone(manifest);
  rejectedJeeves.pages.homepage.candidates.push({
    id: 'known-bad-jeeves-fixture',
    status: 'DRAFT_TRACKED',
    entry_path: homepageSource,
    source_files: [{ path: homepageSource, sha256: sha(homepageBody) }],
    dependencies: [staleJeeves]
  });
  expectFailure('rejected-jeeves', rejectedJeeves, 'prohibited dependency');
  fs.rmSync(homepageAbsolute, { recursive: true, force: true });

  console.log('THREE-PAGE DESIGN PROGRAM CALIBRATION PASS — baseline=PASS known_bad=REJECT undeclared=REJECT stale_hash=REJECT');
} finally {
  fs.rmSync(scratchAbsolute, { recursive: true, force: true });
  fs.rmSync(path.join(root, `operations/design-explorations/current/homepage/.guard-fixture-${process.pid}`), { recursive: true, force: true });
}
