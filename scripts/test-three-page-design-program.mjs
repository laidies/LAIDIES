#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { validateProgram } from './check-three-page-design-program.mjs';

const root = process.cwd();
const manifestPath = 'operations/design-programs/homepage-library-visitors-20260822.json';
const manifest = JSON.parse(fs.readFileSync(path.join(root, manifestPath), 'utf8'));
const scratch = `operations/design-explorations/current/visitors-centre/.program-test-${process.pid}`;
const scratchAbsolute = path.join(root, scratch);
const sha = value => crypto.createHash('sha256').update(value).digest('hex');

function expectFailure(name, changed, expected, verifyGit = false) {
  const fixture = path.join(scratchAbsolute, `${name}.json`);
  fs.writeFileSync(fixture, `${JSON.stringify(changed, null, 2)}\n`);
  const errors = validateProgram({ root, manifestPath: fixture, verifyGit });
  if (!errors.some(error => error.includes(expected))) throw new Error(`${name}: expected ${expected}; got ${errors.join(' | ')}`);
}

fs.mkdirSync(scratchAbsolute, { recursive: true });
try {
  const baseline = validateProgram({ root, manifestPath, verifyGit: false });
  if (baseline.length) throw new Error(`baseline failed: ${baseline.join(' | ')}`);

  const pale = structuredClone(manifest);
  pale.visual_system.tokens.pink = '#f7b8d8';
  expectFailure('pale-palette', pale, 'visual token pink');

  const wrongAuthority = structuredClone(manifest);
  wrongAuthority.pages.homepage.governing_sources = [];
  expectFailure('wrong-authority', wrongAuthority, 'missing routed current authority');

  const missingCopy = structuredClone(manifest);
  missingCopy.pages.homepage.locked_copy_fragments = ['invented replacement slogan'];
  expectFailure('missing-copy', missingCopy, 'locked copy missing');

  const oldLobby = manifest.pages['visitors-centre'].prohibited_assets[0];
  const sourcePath = `${scratch}/candidate.html`;
  const source = `<img src="/${oldLobby.path}" alt="known bad">\n`;
  fs.writeFileSync(path.join(root, sourcePath), source);
  const badCandidate = structuredClone(manifest);
  badCandidate.pages['visitors-centre'].candidates.push({
    id: 'known-bad', status: 'DRAFT_TRACKED', entry_path: sourcePath,
    source_files: [{ path: sourcePath, sha256: sha(source) }],
    dependencies: [oldLobby], production_method: 'repo_composition'
  });
  expectFailure('known-bad', badCandidate, 'prohibited dependency');

  const undeclared = structuredClone(badCandidate);
  undeclared.pages['visitors-centre'].candidates[0].dependencies = [];
  expectFailure('undeclared', undeclared, 'unmanifested asset reference');

  const unpushed = structuredClone(manifest);
  const emptySource = '<main>candidate</main>\n';
  fs.writeFileSync(path.join(root, sourcePath), emptySource);
  unpushed.pages['visitors-centre'].candidates.push({
    id: 'unpushed', status: 'READY_FOR_ADMISSION', entry_path: sourcePath,
    source_files: [{ path: sourcePath, sha256: sha(emptySource) }], dependencies: [],
    production_method: 'repo_composition', pushed_commit: '0'.repeat(40),
    pushed_ref: 'refs/heads/does-not-exist'
  });
  expectFailure('unpushed', unpushed, 'pushed_ref absent on origin', true);

  const missingAdmission = structuredClone(manifest);
  delete missingAdmission.pages.homepage.candidates[0].admission;
  expectFailure('missing-admission', missingAdmission, 'REPRESENTATIVE_DIRECTION admission');

  const staleScreenshot = structuredClone(manifest);
  staleScreenshot.pages.homepage.candidates[0].admission.screenshots.mobile_390.sha256 = '0'.repeat(64);
  expectFailure('stale-screenshot', staleScreenshot, 'hash mismatch');

  const heldReview = structuredClone(manifest);
  heldReview.pages.homepage.candidates[0].admission.independent_reviews[0].verdict = 'HOLD';
  expectFailure('held-review', heldReview, 'every independent review must ADMIT');

  const duplicateReviewer = structuredClone(manifest);
  duplicateReviewer.pages.homepage.candidates[0].admission.independent_reviews[1].agent_id = duplicateReviewer.pages.homepage.candidates[0].admission.independent_reviews[0].agent_id;
  expectFailure('duplicate-reviewer', duplicateReviewer, 'two distinct independent reviews');

  const fullBeforeSelection = structuredClone(manifest);
  fullBeforeSelection.pages.homepage.candidates[0].admission.selection_scope = 'FULL_IMPLEMENTATION';
  expectFailure('full-before-selection', fullBeforeSelection, 'selection scope must remain direction-first');

  console.log('THREE-PAGE DESIGN PROGRAM CALIBRATION PASS — baseline=PASS pale=REJECT authority=REJECT copy=REJECT known_bad=REJECT undeclared=REJECT unpushed=REJECT missing_admission=REJECT stale_screenshot=REJECT held_review=REJECT duplicate_reviewer=REJECT full_before_selection=REJECT');
} finally {
  fs.rmSync(scratchAbsolute, { recursive: true, force: true });
}
