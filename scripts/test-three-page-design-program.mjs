#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { homepageProofErrors, libraryProofErrors, validateProgram, visitorProofErrors } from './check-three-page-design-program.mjs';

const root = process.cwd();
const manifestPath = 'operations/design-programs/homepage-library-visitors-20260822.json';
const manifest = JSON.parse(fs.readFileSync(path.join(root, manifestPath), 'utf8'));
const scratch = `operations/design-explorations/current/visitors-centre/.program-test-${process.pid}`;
const scratchAbsolute = path.join(root, scratch);
const sha = value => crypto.createHash('sha256').update(value).digest('hex');

function expectVisitorProofFailure(name, source, expected) {
  const errors = visitorProofErrors(source);
  if (!errors.some(error => error.includes(expected))) {
    throw new Error(`${name}: expected ${expected}; got ${errors.join(' | ')}`);
  }
}

function expectHomepageProofFailure(name, source, expected) {
  const errors = homepageProofErrors(source);
  if (!errors.some(error => error.includes(expected))) {
    throw new Error(`${name}: expected ${expected}; got ${errors.join(' | ')}`);
  }
}

function expectLibraryProofFailure(name, sources, expected) {
  const errors = libraryProofErrors(sources);
  if (!errors.some(error => error.includes(expected))) {
    throw new Error(`${name}: expected ${expected}; got ${errors.join(' | ')}`);
  }
}

function expectFailure(name, changed, expected, verifyGit = false) {
  const fixture = path.join(scratchAbsolute, `${name}.json`);
  fs.writeFileSync(fixture, `${JSON.stringify(changed, null, 2)}\n`);
  const errors = validateProgram({ root, manifestPath: fixture, verifyGit });
  if (!errors.some(error => error.includes(expected))) throw new Error(`${name}: expected ${expected}; got ${errors.join(' | ')}`);
}

fs.mkdirSync(scratchAbsolute, { recursive: true });
try {
  const homepageProofPath = path.join(root, 'operations/design-explorations/current/homepage/owner-reference-synthesis-20260823/index.html');
  const homepageProofSource = fs.readFileSync(homepageProofPath, 'utf8');
  const homepageProofBaseline = homepageProofErrors(homepageProofSource);
  if (homepageProofBaseline.length) throw new Error(`Homepage proof baseline failed: ${homepageProofBaseline.join(' | ')}`);
  expectHomepageProofFailure(
    'homepage-method-image-missing',
    homepageProofSource.replace('/assets/episodes/issue-01/episode-01-inline-article-image.jpg', '/retired-placeholder.png'),
    'bound editorial image'
  );
  expectHomepageProofFailure(
    'homepage-invented-copy',
    homepageProofSource.replace('Open the NewsStand', 'Browse all back issues'),
    'rejected invented Homepage copy'
  );
  expectHomepageProofFailure(
    'homepage-premature-newsstand-preview',
    homepageProofSource.replace('<section class="section intent"', '<section class="section happening"></section><section class="section intent"'),
    'deferred NewsStand Homepage preview'
  );
  expectHomepageProofFailure(
    'homepage-device-local-resume',
    homepageProofSource.replace('Signed-out visitors open the latest published episode.', 'This browser resumes the episode remembered on this device.'),
    'device-local episode history'
  );
  expectHomepageProofFailure(
    'homepage-copy-provenance',
    homepageProofSource.replaceAll('data-copy-source=', 'data-unmapped-copy='),
    'copy provenance'
  );

  const visitorProofPath = path.join(root, 'operations/design-explorations/current/visitors-centre/live-base-proof-20260822/proof.js');
  const visitorProofSource = fs.readFileSync(visitorProofPath, 'utf8');
  const visitorProofBaseline = visitorProofErrors(visitorProofSource);
  if (visitorProofBaseline.length) throw new Error(`Visitor proof baseline failed: ${visitorProofBaseline.join(' | ')}`);
  expectVisitorProofFailure(
    'visitor-missing-explanation',
    visitorProofSource.replaceAll('What is SUNNYVAiLE?', 'Missing orientation'),
    'locked explanation order'
  );
  expectVisitorProofFailure(
    'visitor-text-only-format',
    visitorProofSource.replace('/assets/town-characters/scenes/paige-scene.png', '/retired-placeholder.png'),
    'six current-owner images'
  );
  expectVisitorProofFailure(
    'visitor-unsupported-class-availability',
    visitorProofSource.replace('The class tapes are still in production.', 'The written class previews are open; the class tapes are still in production.'),
    'unsupported class availability'
  );

  const libraryCssPath = path.join(root, 'operations/design-explorations/current/library/live-base-proof-20260822/proof.css');
  const libraryJsPath = path.join(root, 'operations/design-explorations/current/library/live-base-proof-20260822/proof.js');
  const libraryProof = { css: fs.readFileSync(libraryCssPath, 'utf8'), js: fs.readFileSync(libraryJsPath, 'utf8') };
  const libraryBaseline = libraryProofErrors(libraryProof);
  if (libraryBaseline.length) throw new Error(`Library proof baseline failed: ${libraryBaseline.join(' | ')}`);
  expectLibraryProofFailure(
    'library-missing-entry-choice',
    { ...libraryProof, js: libraryProof.js.replace('Browse the shelves', 'Missing second choice') },
    'entry choices'
  );
  expectLibraryProofFailure(
    'library-mobile-shelf-overflow',
    { ...libraryProof, css: libraryProof.css.replace('left:0;right:auto;width:100%', 'left:5%;right:5%;width:auto') },
    'mobile shelf width'
  );
  expectLibraryProofFailure(
    'library-undersized-header',
    { ...libraryProof, css: libraryProof.css.replaceAll('min-height:44px', 'min-height:29px') },
    '44px header'
  );

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

  const unallowlisted = structuredClone(manifest);
  const visitorAllowed = new Set(manifest.pages['visitors-centre'].allowed_existing_assets.map(item => item.path));
  const unallowlistedAsset = manifest.pages.homepage.allowed_existing_assets.find(item => !visitorAllowed.has(item.path));
  if (!unallowlistedAsset) throw new Error('unallowlisted-active: no Homepage-only asset available for calibration');
  const unallowlistedSource = `<img src="/${unallowlistedAsset.path}" alt="not admitted for this page">\n`;
  fs.writeFileSync(path.join(root, sourcePath), unallowlistedSource);
  unallowlisted.pages['visitors-centre'].candidates.push({
    id: 'unallowlisted-active', status: 'DRAFT_TRACKED', entry_path: sourcePath,
    source_files: [{ path: sourcePath, sha256: sha(unallowlistedSource) }],
    dependencies: [unallowlistedAsset], production_method: 'repo_composition'
  });
  expectFailure('unallowlisted-active', unallowlisted, 'existing dependency is not allowlisted');

  const unpushed = structuredClone(manifest);
  const emptySource = '<main>candidate</main>\n';
  fs.writeFileSync(path.join(root, sourcePath), emptySource);
  unpushed.pages['visitors-centre'].candidates.push({
    id: 'unpushed', status: 'READY_FOR_ADMISSION', entry_path: sourcePath,
    source_files: [{ path: sourcePath, sha256: sha(emptySource) }], dependencies: [],
    production_method: 'repo_composition', pushed_commit: 'not-a-commit',
    pushed_ref: 'refs/heads/does-not-exist'
  });
  expectFailure('unpushed', unpushed, 'reviewable candidate requires pushed commit/ref');

  const missingAdmission = structuredClone(manifest);
  missingAdmission.pages.homepage.candidates[0].status = 'ADMITTED_FOR_ALI_REVIEW';
  missingAdmission.calibration.known_bad_candidate_sha256.shift();
  delete missingAdmission.pages.homepage.candidates[0].admission;
  expectFailure('missing-admission', missingAdmission, 'REPRESENTATIVE_DIRECTION admission');

  const staleScreenshot = structuredClone(manifest);
  staleScreenshot.pages.homepage.candidates[0].status = 'ADMITTED_FOR_ALI_REVIEW';
  staleScreenshot.calibration.known_bad_candidate_sha256.shift();
  staleScreenshot.pages.homepage.candidates[0].admission.screenshots.mobile_390.sha256 = '0'.repeat(64);
  expectFailure('stale-screenshot', staleScreenshot, 'hash mismatch');

  const heldReview = structuredClone(manifest);
  heldReview.pages.homepage.candidates[0].status = 'ADMITTED_FOR_ALI_REVIEW';
  heldReview.calibration.known_bad_candidate_sha256.shift();
  heldReview.pages.homepage.candidates[0].admission.independent_reviews[0].verdict = 'HOLD';
  expectFailure('held-review', heldReview, 'independent visual-experience review must ADMIT');

  const missingComparison = structuredClone(manifest);
  missingComparison.pages.homepage.candidates[0].status = 'ADMITTED_FOR_ALI_REVIEW';
  missingComparison.calibration.known_bad_candidate_sha256.shift();
  delete missingComparison.pages.homepage.candidates[0].admission.incumbent_screenshots;
  expectFailure('missing-comparison', missingComparison, 'incumbent desktop_1440 screenshot');

  const missingOwnerViewport = structuredClone(manifest);
  missingOwnerViewport.pages.homepage.candidates[0].status = 'ADMITTED_FOR_ALI_REVIEW';
  missingOwnerViewport.calibration.known_bad_candidate_sha256.shift();
  delete missingOwnerViewport.pages.homepage.candidates[0].admission.screenshots.owner_877x915;
  expectFailure('missing-owner-viewport', missingOwnerViewport, 'owner_877x915 screenshot');

  const fullBeforeSelection = structuredClone(manifest);
  fullBeforeSelection.pages.homepage.candidates[0].status = 'ADMITTED_FOR_ALI_REVIEW';
  fullBeforeSelection.calibration.known_bad_candidate_sha256.shift();
  fullBeforeSelection.pages.homepage.candidates[0].admission.selection_scope = 'FULL_IMPLEMENTATION';
  expectFailure('full-before-selection', fullBeforeSelection, 'selection scope must remain direction-first');

  const missingLibraryCoverProof = structuredClone(manifest);
  delete missingLibraryCoverProof.pages.library.candidates[0].admission.objective_checks.fourteen_covers_visible;
  expectFailure('missing-library-cover-proof', missingLibraryCoverProof, 'objective check fourteen_covers_visible must PASS');

  const wrongLibraryRuntime = structuredClone(manifest);
  wrongLibraryRuntime.pages.library.candidates[0].runtime_base.path = 'index.html';
  expectFailure('wrong-library-runtime', wrongLibraryRuntime, 'runtime base must be library.html for library');

  const missingVisitorOrientationProof = structuredClone(manifest);
  delete missingVisitorOrientationProof.pages['visitors-centre'].candidates[0].admission.objective_checks.purpose_and_orientation_visible;
  expectFailure('missing-visitor-orientation-proof', missingVisitorOrientationProof, 'objective check purpose_and_orientation_visible must PASS');

  const missingVisitorImageProof = structuredClone(manifest);
  delete missingVisitorImageProof.pages['visitors-centre'].candidates[0].admission.objective_checks.image_led_format_jobs;
  expectFailure('missing-visitor-image-proof', missingVisitorImageProof, 'objective check image_led_format_jobs must PASS');

  const wrongVisitorRuntime = structuredClone(manifest);
  wrongVisitorRuntime.pages['visitors-centre'].candidates[0].runtime_base.path = 'index.html';
  expectFailure('wrong-visitor-runtime', wrongVisitorRuntime, 'runtime base must be visitors-centre.html for visitors-centre');

  const rejectedReentry = structuredClone(manifest);
  rejectedReentry.pages.homepage.candidates[0].source_files.find(item => item.path === rejectedReentry.pages.homepage.candidates[0].entry_path).sha256 = rejectedReentry.calibration.known_bad_candidate_sha256[0];
  expectFailure('ali-rejected-reentry', rejectedReentry, 'exact Ali-rejected candidate cannot re-enter');

  const rejectedInCurrent = structuredClone(manifest);
  rejectedInCurrent.pages.homepage.candidates[0].status = 'REJECTED_BY_ALI';
  rejectedInCurrent.pages.homepage.candidates[0].owner_verdict = 'FULL_REJECTION_DO_NOT_ITERATE';
  rejectedInCurrent.calibration.known_bad_candidate_sha256.push(rejectedInCurrent.pages.homepage.candidates[0].source_files.find(item => item.path === rejectedInCurrent.pages.homepage.candidates[0].entry_path).sha256);
  expectFailure('rejected-in-current', rejectedInCurrent, 'rejected archive');

  console.log('THREE-PAGE DESIGN PROGRAM CALIBRATION PASS — baseline=PASS homepage_method_image=REJECT homepage_device_local_resume=REJECT visitor_order=REJECT visitor_text_only=REJECT visitor_unsupported_class_availability=REJECT library_entry_choice=REJECT library_mobile_overflow=REJECT library_undersized_header=REJECT pale=REJECT authority=REJECT copy=REJECT known_bad=REJECT undeclared=REJECT unallowlisted_active=REJECT unpushed=REJECT missing_admission=REJECT stale_screenshot=REJECT held_review=REJECT missing_comparison=REJECT missing_owner_viewport=REJECT full_before_selection=REJECT missing_library_cover_proof=REJECT wrong_library_runtime=REJECT missing_visitor_orientation_proof=REJECT wrong_visitor_runtime=REJECT rejected_current=REJECT');
} finally {
  fs.rmSync(scratchAbsolute, { recursive: true, force: true });
}
