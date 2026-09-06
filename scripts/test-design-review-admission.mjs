#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checker = path.join(root, 'scripts/check-design-review-admission.mjs');
const resolver = path.join(root, 'scripts/resolve-design-review-url.mjs');
const hash = relative => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, relative))).digest('hex');
const binding = relative => ({ path: relative, sha256: hash(relative) });
const candidate = binding('operations/control-room/review-inbox.html');
const conceptCandidate = binding('operations/control-room/evidence/owner-control-plane-2026-08-02/desktop.png');

const fixtureRoot = `operations/control-room/.design-admission-test-${process.pid}`;
const fixtureRootAbsolute = path.join(root, fixtureRoot);
fs.mkdirSync(fixtureRootAbsolute, { recursive: true });
const cleanup = () => fs.rmSync(fixtureRootAbsolute, { recursive: true, force: true });
process.on('exit', cleanup);
let evidenceCounter = 0;
function candidateBoundEvidence(label = 'evidence') {
  evidenceCounter += 1;
  const relative = `${fixtureRoot}/${String(evidenceCounter).padStart(2, '0')}-${label.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.md`;
  fs.writeFileSync(path.join(root, relative), `# ${label}\n\ncandidate_sha256=${candidate.sha256}\nconcept_candidate_sha256=${conceptCandidate.sha256}\n`);
  return binding(relative);
}
const unboundReceipt = `${fixtureRoot}/unbound.md`;
fs.writeFileSync(path.join(root, unboundReceipt), '# unrelated receipt\n');
const embeddedVisual = `${fixtureRoot}/embedded-visual.md`;
fs.writeFileSync(path.join(root, embeddedVisual), '# Review\n\n![unadmitted concept](concept.avif)\n');
const linkedVisual = `${fixtureRoot}/linked-visual.md`;
fs.writeFileSync(path.join(root, linkedVisual), '# Review\n\n[Open the concept](concept.png)\n');
const referenceVisual = `${fixtureRoot}/reference-visual.md`;
fs.writeFileSync(path.join(root, referenceVisual), '# Review\n\n[concept]: desktop-1440.tiff\n');
const jsonVisual = `${fixtureRoot}/linked-visual.json`;
fs.writeFileSync(path.join(root, jsonVisual), JSON.stringify({ candidate_path: 'concept.webm' }));
const jsonArtifactVisual = `${fixtureRoot}/artifact-visual.json`;
fs.writeFileSync(path.join(root, jsonArtifactVisual), JSON.stringify({ artifact: 'concept.bmp' }));

const itemEvidence = candidateBoundEvidence('item summary');
const receipts = Object.fromEntries([
  'champion','research','creative','ia','maker','frontend','ux','brand','red','claude'
].map(role => [role, candidateBoundEvidence(`${role} receipt`)]));
const score = label => ({ result: 'PASS', score: 18, evidence: candidateBoundEvidence(label) });
const screenshot = relative => ({ ...binding(relative), candidate_sha256: candidate.sha256 });

const validItem = {
  id: 'fixture-building-page',
  review_type: 'building_page_visual',
  review_artifacts: [candidate],
  evidence_path: itemEvidence.path,
  evidence_sha256: itemEvidence.sha256,
  design_admission: {
    scope: 'FULL_PRODUCT',
    presentation_stage: 'IMPLEMENTED',
    maker_status: 'READY_FOR_INDEPENDENT_GATE',
    status: 'INDEPENDENT GATES PASS',
    candidate,
    screenshots: {
      desktop_1440: screenshot('operations/control-room/evidence/owner-control-plane-2026-08-02/desktop.png'),
      mobile_390: screenshot('operations/control-room/evidence/owner-control-plane-2026-08-02/mobile.png'),
      mobile_320: screenshot('operations/control-room/evidence/owner-review-inbox-2026-08-01/mobile.png')
    },
    original_brief: binding('operations/product-stewards/library/EXPERIENCE-BRIEF.md'),
    incumbent_reference: binding('library.html'),
    research_brief: binding('operations/product-stewards/library/building-experience-championship-cycle-1-2026-07-26.md'),
    page_architecture: binding('operations/product-stewards/library/page-architecture-successor-2026-08-03.md'),
    journey_handoff_map: binding('operations/product-stewards/library/FUNCTIONALITY-MAP.md'),
    roles: {
      building_champion: { agent_id: 'champion-a', receipt: receipts.champion },
      research_benchmarking: { agent_id: 'research-b', receipt: receipts.research },
      creative_experience_designer: { agent_id: 'creative-c', receipt: receipts.creative },
      information_architecture_judge: { agent_id: 'ia-k', receipt: receipts.ia },
      environment_artwork_maker: { agent_id: 'art-d', receipt: receipts.maker },
      frontend_implementer: { agent_id: 'frontend-e', receipt: receipts.frontend },
      product_ux_judge: { agent_id: 'ux-f', receipt: receipts.ux },
      brand_visual_judge: { agent_id: 'brand-g', receipt: receipts.brand },
      red_team: { agent_id: 'red-h', result: 'UNSHAKEN', receipt: receipts.red },
      claude_opus_5_reviewer: { agent_id: 'claude-i', model_id: 'claude-opus-5', recommendation: 'ADMIT', receipt: receipts.claude },
      control_room_admission: { agent_id: 'control-j' }
    },
    gates: {
      creative_vision: score('creative vision'),
      product_quality: score('product quality'),
      professional_finish: score('professional finish'),
      ux_clarity: score('ux clarity'),
      laidies_brand_cohesion: score('brand cohesion'),
      best_webpage_ambition: score('best webpage ambition'),
      visible_growth: { result: 'PASS', rendered_increment: 1, selector_only: false, evidence: candidateBoundEvidence('visible growth') },
      information_architecture: { result: 'PASS', single_image_overload: false, feature_labels_without_operable_surface: 0, evidence: candidateBoundEvidence('information architecture') },
      primary_object_legibility: { result: 'PASS', minimum_target_css_px: 44, minimum_visible_object_px: 160, preopen_description: true, evidence: candidateBoundEvidence('primary object legibility') },
      scalable_content_model: { result: 'PASS', fixed_canvas_only: false, new_content_without_redesign: true, new_feature_without_page_rebuild: true, evidence: candidateBoundEvidence('scalable content model') },
      feature_and_building_placement: { result: 'PASS', mislocated_products: [], missing_core_features: [], evidence: candidateBoundEvidence('feature placement') },
      decorative_discipline: { result: 'PASS', unjustified_filler_count: 0, evidence: candidateBoundEvidence('decorative discipline') },
      incumbent_comparison: { result: 'PASS', same_viewports: true, candidate_not_worse: true, visible_regressions: [], locked_decision_violations: [], evidence: candidateBoundEvidence('incumbent comparison') },
      reviewer_calibration: { result: 'PASS', reviewer_result: 'REJECT', known_bad_candidate_sha256: '46185b93c1ff08bd67e43a2fe111bb5badb01aa55a0e87b2b06126550b407f3d', evidence: candidateBoundEvidence('reviewer calibration') },
      quality_ratchet: { result: 'PASS', repeated_known_defects: 0, objective_defects_deferred_to_review: 0, review_issue_count: 0, review_cycle_count: 1, preceding_comparable: { review_issue_count: 4, review_cycle_count: 2 }, known_failure_sources: [binding('operations/DECISIONS.md'), binding('operations/control-room/rejections.json'), binding('operations/painpoints-log.md')], evidence: candidateBoundEvidence('quality ratchet') },
      instruction_reconciliation: { result: 'PASS', authority_order: ['ALI_CURRENT_RULING','DECISIONS_ROUTER','CANON_AND_LOCKS','AREA_DECISIONS','PROCESS_CONTRACT','HISTORICAL_EVIDENCE'], governing_sources: [binding('operations/DECISIONS.md'), binding('operations/voice/laidies-canon-index.md'), binding('operations/library-decisions.md')], superseded_sources: [], unresolved_conflicts: [], evidence: candidateBoundEvidence('instruction reconciliation') },
      visual_world_continuity: { result: 'PASS', relationship: 'MASTHEAD_NATIVE', page_purpose_specific: true, visible_mismatches: [], masthead_reference: binding('assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png'), evidence: candidateBoundEvidence('visual world continuity') },
      maker_preflight: { result: 'PASS', representative_proof_passed: true, full_page_desktop_mobile_inspected: true, incumbent_compared: true, known_defects_remaining: 0, objective_defects_remaining: 0, visible_self_review_issues_remaining: 0, evidence: candidateBoundEvidence('maker preflight') },
      research_and_benchmarking: { result: 'PASS', evidence: candidateBoundEvidence('research benchmarking') },
      visitor_journeys: Object.fromEntries(['first_time','returning_without_card','device_local_card','verified_account_backed'].map(id => [id, { result: 'PASS', desktop: 'PASS', mobile: 'PASS', failure_recovery: 'PASS', evidence: candidateBoundEvidence(`journey ${id}`) }])),
      cross_page_handoffs: Object.fromEntries(['closet','puffy_saves','charms_rewards','miss_jeeves'].map(id => [id, { result: 'PASS', evidence: candidateBoundEvidence(`handoff ${id}`) }]))
    },
    requirement_results: Array.from({ length: 6 }, (_, index) => ({ id: `ALI-0${index + 1}`, result: 'PASS', evidence: candidateBoundEvidence(`requirement ${index + 1}`) })),
    holds_retained: []
  }
};

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-design-admission-'));
function run(item) {
  const queuePath = path.join(temp, 'queue.json');
  fs.writeFileSync(queuePath, JSON.stringify({ review_now: [item] }));
  return spawnSync(process.execPath, [checker, '--fixture'], { cwd: root, encoding: 'utf8', env: { ...process.env, LAIDIES_QUEUE_PATH: queuePath } });
}
function runBeingBuilt(item) {
  const queuePath = path.join(temp, 'being-built-queue.json');
  fs.writeFileSync(queuePath, JSON.stringify({ review_now: [], being_built: [item] }));
  return spawnSync(process.execPath, [checker, '--fixture'], { cwd: root, encoding: 'utf8', env: { ...process.env, LAIDIES_QUEUE_PATH: queuePath } });
}
function runVacuous() {
  const queuePath = path.join(temp, 'vacuous-queue.json');
  fs.writeFileSync(queuePath, JSON.stringify({ review_now: [], being_built: [] }));
  return spawnSync(process.execPath, [checker, '--fixture'], { cwd: root, encoding: 'utf8', env: { ...process.env, LAIDIES_QUEUE_PATH: queuePath } });
}
function resolveForReview(item, artifact = candidate.path) {
  const queuePath = path.join(temp, 'resolver-queue.json');
  fs.writeFileSync(queuePath, JSON.stringify({ review_now: [item] }));
  return spawnSync(process.execPath, [resolver, '--fixture', artifact], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, LAIDIES_QUEUE_PATH: queuePath }
  });
}
function expectFail(name, mutate, message) {
  const item = structuredClone(validItem);
  mutate(item);
  const result = run(item);
  const output = `${result.stdout}${result.stderr}`;
  if (result.status === 0 || !output.includes(message)) throw new Error(`${name} did not fail closed:\n${output}`);
}

const passing = run(validItem);
if (passing.status !== 0 || !passing.stdout.includes('FIXTURE PASS — NOT PRODUCTION EVIDENCE') || passing.stdout.trim() === 'DESIGN REVIEW ADMISSION PASS') {
  throw new Error(`valid admission fixture failed or mimicked production output:\n${passing.stdout}${passing.stderr}`);
}
const internalPassing = runBeingBuilt(validItem);
if (internalPassing.status !== 0 || !internalPassing.stdout.includes('FIXTURE PASS — NOT PRODUCTION EVIDENCE')) {
  throw new Error(`valid internal being-built admission fixture failed:\n${internalPassing.stdout}${internalPassing.stderr}`);
}
const vacuous = runVacuous();
if (vacuous.status === 0 || !`${vacuous.stdout}${vacuous.stderr}`.includes('FIXTURE VACUOUS')) {
  throw new Error(`empty design gate did not fail closed:\n${vacuous.stdout}${vacuous.stderr}`);
}
const presentationPassing = resolveForReview(validItem);
if (presentationPassing.status !== 0 || !presentationPassing.stdout.includes('DESIGN PRESENTATION ADMITTED fixture-building-page')) {
  throw new Error(`admitted presentation did not resolve:\n${presentationPassing.stdout}${presentationPassing.stderr}`);
}
const presentationBlocked = resolveForReview(validItem, 'operations/design-explorations/library-modular-reading-system-v3-20260803/index.html');
if (presentationBlocked.status === 0 || !presentationBlocked.stderr.includes('DESIGN PRESENTATION BLOCKED')) {
  throw new Error(`unadmitted local candidate was not blocked:\n${presentationBlocked.stdout}${presentationBlocked.stderr}`);
}
const conceptItem = structuredClone(validItem);
conceptItem.id = 'fixture-building-page-concept';
conceptItem.review_type = 'building_page_visual_concept';
conceptItem.review_artifacts = [conceptCandidate];
conceptItem.design_admission.presentation_stage = 'CONCEPT';
conceptItem.design_admission.candidate = conceptCandidate;
delete conceptItem.design_admission.roles.frontend_implementer;
for (const screenshotBinding of Object.values(conceptItem.design_admission.screenshots)) screenshotBinding.candidate_sha256 = conceptCandidate.sha256;
const conceptPassing = run(conceptItem);
if (conceptPassing.status !== 0) throw new Error(`valid concept admission fixture failed:\n${conceptPassing.stdout}${conceptPassing.stderr}`);

expectFail('stale artifact tuple', item => { item.review_artifacts[0].sha256 = '0'.repeat(64); }, 'stale or mismatched SHA-256');
expectFail('self-approved maker', item => { item.design_admission.roles.product_ux_judge.agent_id = 'art-d'; }, 'must be distinct agents');
expectFail('scoped mechanics pass', item => { item.design_admission.scope = 'MECHANICS_ONLY'; }, 'scoped or mechanical review');
expectFail('missing brand verdict', item => { delete item.design_admission.roles.brand_visual_judge; }, 'missing brand_visual_judge.agent_id');
expectFail('rejected SHA resubmit', item => {
  item.design_admission.candidate = binding('operations/design-explorations/library-environment-successor-v2-20260803/index.html');
  item.review_artifacts = [item.design_admission.candidate];
}, 'rejected artifact SHA');
expectFail('quarantined receipt', item => { item.design_admission.roles.environment_artwork_maker.receipt = binding('operations/design-explorations/library-environment-successor-v2-20260803/MAKER-RECEIPT.md'); }, 'quarantined artifact directory');
expectFail('unbound receipt', item => { item.design_admission.roles.environment_artwork_maker.receipt = binding(unboundReceipt); }, 'does not bind candidate SHA-256');
expectFail('standing document receipt', item => { item.design_admission.roles.building_champion.receipt = binding('operations/product-stewards/library/CHARTER.md'); }, 'standing governing document');
expectFail('duplicate role receipt', item => { item.design_admission.roles.research_benchmarking.receipt = item.design_admission.roles.building_champion.receipt; }, 'two roles share receipt');
expectFail('technical evidence only', item => { item.design_admission.status = 'TECHNICAL EVIDENCE ONLY'; }, 'technical-only evidence');
expectFail('selector-only growth', item => { item.design_admission.gates.visible_growth.selector_only = true; }, 'selector-only growth fails');
expectFail('missing resident journey', item => { delete item.design_admission.gates.visitor_journeys.verified_account_backed; }, 'verified_account_backed journey');
expectFail('missing Closet handoff', item => { delete item.design_admission.gates.cross_page_handoffs.closet; }, 'closet cross-page/object contract');
expectFail('unbound gate evidence', item => { item.design_admission.gates.product_quality.evidence = binding(unboundReceipt); }, 'does not bind candidate SHA-256');
expectFail('single-image overload', item => { item.design_admission.gates.information_architecture.single_image_overload = true; }, 'single-image overload');
expectFail('tiny primary objects', item => { item.design_admission.gates.primary_object_legibility.minimum_visible_object_px = 72; }, 'primary objects must be visibly legible');
expectFail('fixed-scene growth', item => { item.design_admission.gates.scalable_content_model.fixed_canvas_only = true; }, 'grow beyond a fixed scene');
expectFail('mislocated building product', item => { item.design_admission.gates.feature_and_building_placement.mislocated_products = ['closet']; }, 'correctly placed');
expectFail('decorative filler', item => { item.design_admission.gates.decorative_discipline.unjustified_filler_count = 6; }, 'decorative filler');
expectFail('visible regression', item => { item.design_admission.gates.incumbent_comparison.visible_regressions = ['worse hierarchy']; }, 'no visible regression');
expectFail('locked-decision violation', item => { item.design_admission.gates.incumbent_comparison.locked_decision_violations = ['pagination']; }, 'locked-decision violation');
expectFail('uncalibrated visual reviewer', item => { item.design_admission.gates.reviewer_calibration.known_bad_candidate_sha256 = '0'.repeat(64); }, 'reject a quarantined known-bad artifact');
expectFail('repeated known defect', item => { item.design_admission.gates.quality_ratchet.repeated_known_defects = 1; }, 'zero repeated known defects');
expectFail('objective defect deferred', item => { item.design_admission.gates.quality_ratchet.objective_defects_deferred_to_review = 1; }, 'zero repeated known defects');
expectFail('review issues not declining', item => { item.design_admission.gates.quality_ratchet.review_issue_count = 4; }, 'review issue count must decline');
expectFail('review cycles increasing', item => { item.design_admission.gates.quality_ratchet.review_cycle_count = 3; }, 'review cycle count must not increase');
expectFail('unresolved instruction conflict', item => { item.design_admission.gates.instruction_reconciliation.unresolved_conflicts = ['new no-pagination ruling conflicts with prior pager approval']; }, 'zero unresolved conflicts');
expectFail('wrong instruction authority order', item => { item.design_admission.gates.instruction_reconciliation.authority_order.reverse(); }, 'bind the authority order');
expectFail('missing canonical instruction source', item => { item.design_admission.gates.instruction_reconciliation.governing_sources = item.design_admission.gates.instruction_reconciliation.governing_sources.filter(source => source.path !== 'operations/voice/laidies-canon-index.md'); }, 'DECISIONS, canon and area sources');
expectFail('unexplained superseded instruction', item => { item.design_admission.gates.instruction_reconciliation.superseded_sources = [{ source: binding('operations/library-decisions.md'), superseded_by: binding('operations/DECISIONS.md'), reason: '' }]; }, 'needs an explicit reason');
expectFail('generic image family', item => { item.design_admission.gates.visual_world_continuity.relationship = 'GENERIC_ATTRACTIVE'; }, 'masthead-native or unmistakably LAiDIES');
expectFail('image mismatches masthead world', item => { item.design_admission.gates.visual_world_continuity.visible_mismatches = ['different lighting and dimensionality']; }, 'zero visible world mismatch');
expectFail('image has no page job', item => { item.design_admission.gates.visual_world_continuity.page_purpose_specific = false; }, 'exact page job');
expectFail('maker sends known defect to review', item => { item.design_admission.gates.maker_preflight.known_defects_remaining = 1; }, 'maker preflight must clear');
expectFail('maker skips representative proof', item => { item.design_admission.gates.maker_preflight.representative_proof_passed = false; }, 'maker preflight must clear');
expectFail('maker skips full-page inspection', item => { item.design_admission.gates.maker_preflight.full_page_desktop_mobile_inspected = false; }, 'maker preflight must clear');
expectFail('missing score', item => { delete item.design_admission.gates.creative_vision.score; }, 'creative_vision must independently PASS');
expectFail('missing visible object size', item => { delete item.design_admission.gates.primary_object_legibility.minimum_visible_object_px; }, 'primary objects must be visibly legible');
expectFail('missing rendered growth', item => { delete item.design_admission.gates.visible_growth.rendered_increment; }, 'visible growth must render');
expectFail('missing holds declaration', item => { delete item.design_admission.holds_retained; }, 'holds_retained must be explicitly present');
expectFail('retained hold', item => { item.design_admission.holds_retained = ['visual hold']; }, 'retained holds prevent Ali-review admission');
expectFail('non-raster screenshot', item => { item.design_admission.screenshots.desktop_1440 = { ...binding('operations/product-stewards/CHAMPION-CONTRACT.md'), candidate_sha256: candidate.sha256 }; }, 'must bind a raster screenshot');
expectFail('duplicate screenshot', item => { item.design_admission.screenshots.mobile_390 = item.design_admission.screenshots.desktop_1440; }, 'screenshots must be distinct');
expectFail('screenshot candidate mismatch', item => { item.design_admission.screenshots.mobile_390.candidate_sha256 = '0'.repeat(64); }, 'not bound to the exact candidate');

const sharedEvidenceItem = structuredClone(validItem);
sharedEvidenceItem.design_admission.gates.product_quality.evidence = sharedEvidenceItem.design_admission.gates.creative_vision.evidence;
sharedEvidenceItem.design_admission.gates.visitor_journeys.returning_without_card.evidence = sharedEvidenceItem.design_admission.gates.visitor_journeys.first_time.evidence;
sharedEvidenceItem.design_admission.requirement_results[1].evidence = sharedEvidenceItem.design_admission.requirement_results[0].evidence;
const sharedEvidencePassing = run(sharedEvidenceItem);
if (sharedEvidencePassing.status !== 0) {
  throw new Error(`one candidate-bound review could not support related gate findings:\n${sharedEvidencePassing.stdout}${sharedEvidencePassing.stderr}`);
}
expectFail('concept wrong stage', item => { item.review_type = 'building_page_visual_concept'; }, 'presentation_stage must be CONCEPT');
expectFail('untyped PNG', item => { delete item.review_type; }, 'visual artifact must explicitly declare');
expectFail('untyped PDF', item => {
  delete item.review_type;
  delete item.design_admission;
  item.review_artifacts = [binding('output/pdf/episode-01-open-the-tab-cheat-sheet-a4.pdf')];
}, 'building-page visual is missing design_admission');
expectFail('untyped embedded visual', item => {
  delete item.review_type;
  delete item.design_admission;
  item.review_artifacts = [binding(embeddedVisual)];
}, 'building-page visual is missing design_admission');
for (const [label, artifact] of [
  ['plain Markdown link', linkedVisual],
  ['reference-style Markdown link', referenceVisual],
  ['JSON candidate_path', jsonVisual],
  ['JSON artifact', jsonArtifactVisual]
]) {
  expectFail(`untyped ${label}`, item => {
    delete item.review_type;
    delete item.design_admission;
    item.review_artifacts = [binding(artifact)];
  }, 'building-page visual is missing design_admission');
}

fs.rmSync(temp, { recursive: true, force: true });
cleanup();
console.log('DESIGN REVIEW ADMISSION TEST PASS fixtures=37 passing_twins=2');
