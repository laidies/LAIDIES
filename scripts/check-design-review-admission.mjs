#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fixtureMode = process.argv.includes('--fixture');
const queuePath = fixtureMode && process.env.LAIDIES_QUEUE_PATH
  ? process.env.LAIDIES_QUEUE_PATH
  : 'operations/control-room/owner-review-queue.json';
const rejectionPath = fixtureMode && process.env.LAIDIES_REJECTIONS_PATH
  ? process.env.LAIDIES_REJECTIONS_PATH
  : 'operations/control-room/rejections.json';
const resolve = value => path.isAbsolute(value) ? value : path.join(root, value);
const read = value => JSON.parse(fs.readFileSync(resolve(value), 'utf8'));
const sha = value => crypto.createHash('sha256').update(fs.readFileSync(resolve(value))).digest('hex');
const errors = [];
const queue = read(queuePath);
const rejections = read(rejectionPath);
const rejected = new Set((rejections.rejections || []).map(entry => entry.candidate_sha256));
const rejectedPaths = new Set((rejections.rejections || []).map(entry => entry.candidate_path).filter(Boolean));
const rejectedPrefixes = (rejections.rejections || []).map(entry => entry.quarantine_prefix).filter(Boolean);
let designCandidatesEvaluated = 0;
const requiredRejectionIds = [
  'library-environment-successor-v2-20260803',
  'library-environment-successor-20260803',
  'library-environment-successor-20260803-desktop',
  'library-environment-successor-20260803-mobile',
  'library-environment-successor-v2-20260803-desktop',
  'library-environment-successor-v2-20260803-mobile-390',
  'library-environment-successor-v2-20260803-mobile-320',
  'library-concept-welcome-rotunda-20260803',
  'library-concept-library-house-20260803',
  'library-concept-reading-table-20260803',
  'library-modular-reading-system-v3-20260803',
  'library-building-system-v4-20260803'
];
for (const id of requiredRejectionIds) {
  if (!(rejections.rejections || []).some(entry => entry.id === id)) errors.push(`rejections: append-only incident entry is missing: ${id}`);
}

for (const entry of rejections.rejections || []) {
  if (!entry.id || !/^[a-f0-9]{64}$/.test(entry.candidate_sha256 || '')) {
    errors.push(`rejections.${entry.id || 'unknown'}: missing id or SHA-256`);
    continue;
  }
  if (entry.historical_external === true) {
    if (entry.candidate_path !== null) errors.push(`rejections.${entry.id}: historical_external candidate_path must be null`);
  } else {
    if (!entry.candidate_path) errors.push(`rejections.${entry.id}: repository candidate_path is required`);
    else {
      const target = resolve(entry.candidate_path);
      if (!target.startsWith(`${root}${path.sep}`) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
        errors.push(`rejections.${entry.id}: quarantined artifact missing or outside repository`);
      } else if (sha(entry.candidate_path) !== entry.candidate_sha256) {
        errors.push(`rejections.${entry.id}: quarantine path/SHA-256 identity is stale`);
      }
    }
  }
  if (!entry.evidence_path || !fs.existsSync(resolve(entry.evidence_path))) {
    errors.push(`rejections.${entry.id}: rejection evidence is missing`);
  }
}

function verifyBinding(label, binding) {
  if (!binding?.path || !/^[a-f0-9]{64}$/.test(binding?.sha256 || '')) {
    errors.push(`${label}: missing exact path/SHA-256 binding`);
    return;
  }
  const target = resolve(binding.path);
  if (!target.startsWith(`${root}${path.sep}`)) {
    errors.push(`${label}: artifact is outside repository`);
    return;
  }
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    errors.push(`${label}: artifact missing: ${binding.path}`);
    return;
  }
  const actual = sha(binding.path);
  if (actual !== binding.sha256) errors.push(`${label}: stale or mismatched SHA-256; expected ${binding.sha256}, current ${actual}`);
  if (rejected.has(binding.sha256)) errors.push(`${label}: rejected artifact SHA cannot be reused`);
  if (rejectedPaths.has(binding.path)) errors.push(`${label}: quarantined artifact path cannot be reused`);
  if (rejectedPrefixes.some(prefix => binding.path === prefix || binding.path.startsWith(`${prefix}/`))) errors.push(`${label}: quarantined artifact directory cannot be reused`);
}

function verifyCandidateBoundText(label, binding, candidateSha) {
  verifyBinding(label, binding);
  if (!binding?.path || !fs.existsSync(resolve(binding.path))) return;
  const source = fs.readFileSync(resolve(binding.path), 'utf8');
  if (!source.includes(candidateSha)) errors.push(`${label}: receipt/evidence does not bind candidate SHA-256 ${candidateSha}`);
}

const designGateCandidates = [
  ...(queue.review_now || []),
  ...(queue.being_built || []).filter(item => item.design_admission)
];
for (const item of designGateCandidates) {
  for (const [index, artifact] of (item.review_artifacts || []).entries()) verifyBinding(`${item.id}.review_artifacts[${index}]`, artifact);
  if (item.evidence_path || item.evidence_sha256) verifyBinding(`${item.id}.evidence`, { path: item.evidence_path, sha256: item.evidence_sha256 });

  const htmlArtifacts = (item.review_artifacts || []).filter(binding => /\.html?$/i.test(binding.path || ''));
  const nonVisualArtifact = /\.(?:md|json|txt|csv|tsv|vtt|srt|mp3|wav|m4a|aac|zip|tar|gz)$/i;
  const imageArtifacts = (item.review_artifacts || []).filter(binding => !nonVisualArtifact.test(binding.path || ''));
  const linkedVisualArtifacts = (item.review_artifacts || []).filter(binding => {
    if (!/\.(?:md|json|txt)$/i.test(binding.path || '') || !fs.existsSync(resolve(binding.path))) return false;
    const source = fs.readFileSync(resolve(binding.path), 'utf8');
    return /\.(?:html?|png|jpe?g|webp|gif|svg|pdf|avif|heic|tiff?|bmp|ico|mp4|mov|webm)(?:[?#)"'\s,}\]]|$)/i.test(source);
  });
  const isConcept = item.review_type === 'building_page_visual_concept';
  const isDesignCandidate = item.review_type === 'building_page_visual' || isConcept || htmlArtifacts.length > 0 || imageArtifacts.length > 0 || linkedVisualArtifacts.length > 0;
  if (!isDesignCandidate) continue;
  designCandidatesEvaluated += 1;
  if ((imageArtifacts.length || linkedVisualArtifacts.length) && !['building_page_visual','building_page_visual_concept'].includes(item.review_type)) {
    errors.push(`${item.id}: visual artifact must explicitly declare building_page_visual or building_page_visual_concept`);
  }

  const admission = item.design_admission;
  if (!admission) {
    errors.push(`${item.id}: building-page visual is missing design_admission`);
    continue;
  }
  if (htmlArtifacts.length && !['building_page_visual','building_page_visual_concept'].includes(item.review_type)) errors.push(`${item.id}: HTML design candidate must declare a building-page visual review type`);
  const requiredStage = isConcept ? 'CONCEPT' : 'IMPLEMENTED';
  if (admission.presentation_stage !== requiredStage) errors.push(`${item.id}: presentation_stage must be ${requiredStage}`);
  if (admission.scope !== 'FULL_PRODUCT') errors.push(`${item.id}: scoped or mechanical review cannot admit a building page`);
  if (admission.maker_status !== 'READY_FOR_INDEPENDENT_GATE') errors.push(`${item.id}: maker status is not READY_FOR_INDEPENDENT_GATE`);
  if (/NOT READY FOR ALI|HOLD|FAIL|TECHNICAL EVIDENCE ONLY/i.test(`${admission.maker_status} ${admission.status || ''}`)) {
    errors.push(`${item.id}: held or technical-only evidence cannot enter Ali review`);
  }

  verifyBinding(`${item.id}.candidate`, admission.candidate);
  verifyBinding(`${item.id}.original_brief`, admission.original_brief);
  verifyBinding(`${item.id}.incumbent_reference`, admission.incumbent_reference);
  verifyBinding(`${item.id}.research_brief`, admission.research_brief);
  verifyBinding(`${item.id}.page_architecture`, admission.page_architecture);
  verifyBinding(`${item.id}.journey_handoff_map`, admission.journey_handoff_map);
  const presentationBindings = [admission.candidate, ...(item.review_artifacts || []), ...Object.values(admission.screenshots || {})].filter(Boolean);
  const screenshotBindings = [];
  for (const viewport of ['desktop_1440','mobile_390','mobile_320']) {
    const screenshot = admission.screenshots?.[viewport];
    verifyBinding(`${item.id}.screenshots.${viewport}`, screenshot);
    screenshotBindings.push(screenshot);
    if (!/\.(?:png|jpe?g|webp)$/i.test(screenshot?.path || '')) errors.push(`${item.id}: ${viewport} must bind a raster screenshot`);
    if (screenshot?.candidate_sha256 !== admission.candidate?.sha256) errors.push(`${item.id}: ${viewport} is not bound to the exact candidate SHA-256`);
  }
  if (new Set(screenshotBindings.map(binding => `${binding?.path}|${binding?.sha256}`)).size !== screenshotBindings.length) errors.push(`${item.id}: desktop and mobile screenshots must be distinct artifacts`);
  if (!(item.review_artifacts || []).length) errors.push(`${item.id}: visual review requires current review_artifacts`);
  if (nonVisualArtifact.test(admission.candidate?.path || '')) errors.push(`${item.id}: candidate must be an actual visual artifact`);
  if (!(item.review_artifacts || []).some(binding => binding.path === admission.candidate?.path && binding.sha256 === admission.candidate?.sha256)) {
    errors.push(`${item.id}: candidate must be one of the exact review_artifacts`);
  }
  if (htmlArtifacts.length && !htmlArtifacts.some(binding => binding.path === admission.candidate?.path && binding.sha256 === admission.candidate?.sha256)) {
    errors.push(`${item.id}: queue artifact and design candidate identity disagree`);
  }

  const roles = ['building_champion','research_benchmarking','creative_experience_designer','information_architecture_judge','environment_artwork_maker',...(isConcept ? [] : ['frontend_implementer']),'product_ux_judge','brand_visual_judge','red_team','claude_opus_5_reviewer','control_room_admission'];
  const ids = [];
  const receipts = new Set();
  for (const role of roles) {
    const record = admission.roles?.[role];
    if (!record?.agent_id) errors.push(`${item.id}: missing ${role}.agent_id`);
    else ids.push(record.agent_id);
    if (role !== 'control_room_admission') {
      verifyCandidateBoundText(`${item.id}.${role}.receipt`, record?.receipt, admission.candidate?.sha256);
      if (record?.receipt?.path) {
        if (receipts.has(record.receipt.path)) errors.push(`${item.id}: two roles share receipt ${record.receipt.path}`);
        receipts.add(record.receipt.path);
        if (/(?:^|\/)(?:CHARTER|OPERATING-SPEC|EXPERIENCE-BRIEF|FUNCTIONALITY-MAP|CHAMPION-CONTRACT|AUTONOMOUS-DELIVERY-RUNTIME)\.(?:md|json)$/i.test(record.receipt.path)) {
          errors.push(`${item.id}: ${role} receipt cannot be a standing governing document`);
        }
      }
    }
  }
  if (new Set(ids).size !== ids.length) errors.push(`${item.id}: champion, research, creative design, art, implementation, judges, red team, Claude and admission owner must be distinct agents`);
  if (admission.roles?.claude_opus_5_reviewer?.model_id !== 'claude-opus-5') errors.push(`${item.id}: exact Claude Opus 5 reviewer is required`);
  if (admission.roles?.claude_opus_5_reviewer?.recommendation !== 'ADMIT') errors.push(`${item.id}: Claude Opus 5 review did not recommend ADMIT`);
  if (admission.roles?.red_team?.result !== 'UNSHAKEN') errors.push(`${item.id}: red team disproved or did not test the candidate`);

  const bindGateEvidence = (label, result) => {
    verifyCandidateBoundText(`${item.id}.gates.${label}.evidence`, result?.evidence, admission.candidate?.sha256);
  };
  const scored = ['creative_vision','product_quality','professional_finish','ux_clarity','laidies_brand_cohesion','best_webpage_ambition'];
  for (const gate of scored) {
    const result = admission.gates?.[gate];
    const score = Number(result?.score);
    if (result?.result !== 'PASS' || !Number.isFinite(score) || score < 17 || score > 20) {
      errors.push(`${item.id}: ${gate} must independently PASS at 17/20 or higher`);
    }
    bindGateEvidence(gate, result);
  }
  const growth = admission.gates?.visible_growth;
  const renderedIncrement = Number(growth?.rendered_increment);
  if (growth?.result !== 'PASS' || !Number.isFinite(renderedIncrement) || renderedIncrement < 1 || growth?.selector_only !== false) {
    errors.push(`${item.id}: visible growth must render an additional in-environment object; selector-only growth fails`);
  }
  bindGateEvidence('visible_growth', growth);
  const architecture = admission.gates?.information_architecture;
  if (architecture?.result !== 'PASS' || architecture?.single_image_overload !== false || architecture?.feature_labels_without_operable_surface !== 0) {
    errors.push(`${item.id}: information architecture must PASS without single-image overload or label-only features`);
  }
  bindGateEvidence('information_architecture', architecture);
  const objects = admission.gates?.primary_object_legibility;
  const minimumTarget = Number(objects?.minimum_target_css_px);
  const minimumVisible = Number(objects?.minimum_visible_object_px);
  if (objects?.result !== 'PASS' || !Number.isFinite(minimumTarget) || !Number.isFinite(minimumVisible) || minimumTarget < 44 || minimumVisible < 120 || objects?.preopen_description !== true) {
    errors.push(`${item.id}: primary objects must be visibly legible, at least 44px operable, at least 120px visible, and explained before opening`);
  }
  bindGateEvidence('primary_object_legibility', objects);
  const scaling = admission.gates?.scalable_content_model;
  if (scaling?.result !== 'PASS' || scaling?.fixed_canvas_only !== false || scaling?.new_content_without_redesign !== true || scaling?.new_feature_without_page_rebuild !== true) {
    errors.push(`${item.id}: content model must grow beyond a fixed scene without redesigning the page`);
  }
  bindGateEvidence('scalable_content_model', scaling);
  const placement = admission.gates?.feature_and_building_placement;
  if (placement?.result !== 'PASS' || (placement?.mislocated_products || []).length || (placement?.missing_core_features || []).length) {
    errors.push(`${item.id}: every core feature and cross-building product must be correctly placed`);
  }
  bindGateEvidence('feature_and_building_placement', placement);
  const decoration = admission.gates?.decorative_discipline;
  const fillerCount = Number(decoration?.unjustified_filler_count);
  if (decoration?.result !== 'PASS' || !Number.isFinite(fillerCount) || fillerCount !== 0) {
    errors.push(`${item.id}: unexplained decorative filler must be removed before presentation`);
  }
  bindGateEvidence('decorative_discipline', decoration);
  const comparison = admission.gates?.incumbent_comparison;
  if (comparison?.result !== 'PASS' || comparison?.same_viewports !== true || comparison?.candidate_not_worse !== true ||
      !Array.isArray(comparison?.visible_regressions) || comparison.visible_regressions.length ||
      !Array.isArray(comparison?.locked_decision_violations) || comparison.locked_decision_violations.length) {
    errors.push(`${item.id}: incumbent comparison must PASS at the same viewports with no visible regression or locked-decision violation`);
  }
  bindGateEvidence('incumbent_comparison', comparison);
  const calibration = admission.gates?.reviewer_calibration;
  if (calibration?.result !== 'PASS' || calibration?.reviewer_result !== 'REJECT' ||
      !rejected.has(calibration?.known_bad_candidate_sha256)) {
    errors.push(`${item.id}: independent visual reviewers must reject a quarantined known-bad artifact before judging the candidate`);
  }
  bindGateEvidence('reviewer_calibration', calibration);
  const ratchet = admission.gates?.quality_ratchet;
  const priorIssues = ratchet?.preceding_comparable?.review_issue_count;
  const priorCycles = ratchet?.preceding_comparable?.review_cycle_count;
  const currentIssues = Number(ratchet?.review_issue_count);
  const currentCycles = Number(ratchet?.review_cycle_count);
  if (ratchet?.result !== 'PASS' || Number(ratchet?.repeated_known_defects) !== 0 ||
      Number(ratchet?.objective_defects_deferred_to_review) !== 0 ||
      !Number.isInteger(currentIssues) || currentIssues < 0 ||
      !Number.isInteger(currentCycles) || currentCycles < 1 ||
      !Array.isArray(ratchet?.known_failure_sources) || ratchet.known_failure_sources.length < 3) {
    errors.push(`${item.id}: quality ratchet requires decisions/rejections/painpoints preflight, zero repeated known defects and zero objective defects deferred to review`);
  }
  for (const [index, source] of (ratchet?.known_failure_sources || []).entries()) verifyBinding(`${item.id}.gates.quality_ratchet.known_failure_sources[${index}]`, source);
  if (Number.isInteger(priorIssues) && currentIssues !== 0 && currentIssues >= priorIssues) {
    errors.push(`${item.id}: review issue count must decline from the preceding comparable candidate`);
  }
  if (Number.isInteger(priorCycles) && currentCycles > priorCycles) {
    errors.push(`${item.id}: review cycle count must not increase from the preceding comparable candidate`);
  }
  bindGateEvidence('quality_ratchet', ratchet);
  const reconciliation = admission.gates?.instruction_reconciliation;
  const governingSources = reconciliation?.governing_sources || [];
  const governingPaths = new Set(governingSources.map(source => source?.path));
  const expectedAuthorityOrder = ['ALI_CURRENT_RULING','DECISIONS_ROUTER','CANON_AND_LOCKS','AREA_DECISIONS','PROCESS_CONTRACT','HISTORICAL_EVIDENCE'];
  if (reconciliation?.result !== 'PASS' ||
      JSON.stringify(reconciliation?.authority_order) !== JSON.stringify(expectedAuthorityOrder) ||
      governingSources.length < 3 ||
      !governingPaths.has('operations/DECISIONS.md') ||
      !governingPaths.has('operations/voice/laidies-canon-index.md') ||
      !Array.isArray(reconciliation?.superseded_sources) ||
      !Array.isArray(reconciliation?.unresolved_conflicts) || reconciliation.unresolved_conflicts.length) {
    errors.push(`${item.id}: instruction reconciliation must bind the authority order, DECISIONS, canon and area sources, record supersessions, and leave zero unresolved conflicts`);
  }
  for (const [index, source] of governingSources.entries()) {
    verifyBinding(`${item.id}.gates.instruction_reconciliation.governing_sources[${index}]`, source);
  }
  for (const [index, supersession] of (reconciliation?.superseded_sources || []).entries()) {
    verifyBinding(`${item.id}.gates.instruction_reconciliation.superseded_sources[${index}].source`, supersession?.source);
    verifyBinding(`${item.id}.gates.instruction_reconciliation.superseded_sources[${index}].superseded_by`, supersession?.superseded_by);
    if (!supersession?.reason?.trim()) errors.push(`${item.id}: superseded instruction ${index} needs an explicit reason`);
  }
  bindGateEvidence('instruction_reconciliation', reconciliation);
  const worldContinuity = admission.gates?.visual_world_continuity;
  if (worldContinuity?.result !== 'PASS' ||
      !['MASTHEAD_NATIVE','LAIDIES_PURPOSE_BUILT'].includes(worldContinuity?.relationship) ||
      worldContinuity?.page_purpose_specific !== true ||
      !Array.isArray(worldContinuity?.visible_mismatches) || worldContinuity.visible_mismatches.length) {
    errors.push(`${item.id}: every image must be masthead-native or unmistakably LAiDIES purpose-built for the exact page job, with zero visible world mismatch`);
  }
  verifyBinding(`${item.id}.gates.visual_world_continuity.masthead_reference`, worldContinuity?.masthead_reference);
  bindGateEvidence('visual_world_continuity', worldContinuity);
  const preflight = admission.gates?.maker_preflight;
  if (preflight?.result !== 'PASS' || preflight?.representative_proof_passed !== true ||
      preflight?.full_page_desktop_mobile_inspected !== true || preflight?.incumbent_compared !== true ||
      Number(preflight?.known_defects_remaining) !== 0 || Number(preflight?.objective_defects_remaining) !== 0 ||
      Number(preflight?.visible_self_review_issues_remaining) !== 0) {
    errors.push(`${item.id}: maker preflight must clear the representative proof and real incumbent comparison with zero known, objective or visible self-review issues before independent review`);
  }
  bindGateEvidence('maker_preflight', preflight);
  if (admission.gates?.research_and_benchmarking?.result !== 'PASS') errors.push(`${item.id}: research and benchmarking input is missing or failed`);
  bindGateEvidence('research_and_benchmarking', admission.gates?.research_and_benchmarking);
  const requiredJourneys = ['first_time','returning_without_card','device_local_card','verified_account_backed'];
  for (const journey of requiredJourneys) {
    const result = admission.gates?.visitor_journeys?.[journey];
    if (result?.result !== 'PASS' || result?.desktop !== 'PASS' || result?.mobile !== 'PASS' || result?.failure_recovery !== 'PASS') {
      errors.push(`${item.id}: ${journey} journey must PASS desktop, mobile and failure/recovery`);
    }
    bindGateEvidence(`visitor_journeys.${journey}`, result);
  }
  const handoffs = admission.gates?.cross_page_handoffs;
  for (const handoff of ['closet','puffy_saves','charms_rewards','miss_jeeves']) {
    if (handoffs?.[handoff]?.result !== 'PASS') errors.push(`${item.id}: ${handoff} cross-page/object contract is missing or failed`);
    bindGateEvidence(`cross_page_handoffs.${handoff}`, handoffs?.[handoff]);
  }
  if (!Object.hasOwn(admission, 'holds_retained') || !Array.isArray(admission.holds_retained)) errors.push(`${item.id}: holds_retained must be explicitly present as an array`);
  if (!Array.isArray(admission.requirement_results) || admission.requirement_results.length < 6 || admission.requirement_results.some(result => result.result !== 'PASS' || !result.id || !result.evidence)) {
    errors.push(`${item.id}: every original-brief requirement must have an exact PASS; FAIL/NOT_ASSESSED cannot advance`);
  }
  for (const [index, result] of (admission.requirement_results || []).entries()) bindGateEvidence(`requirement_results[${index}]`, result);
  if ((admission.holds_retained || []).length) errors.push(`${item.id}: retained holds prevent Ali-review admission`);
}

if (errors.length) {
  console.error('DESIGN REVIEW ADMISSION FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
if (designCandidatesEvaluated === 0) {
  console.error(`${fixtureMode ? 'DESIGN REVIEW ADMISSION FIXTURE VACUOUS — NOT PRODUCTION EVIDENCE' : 'DESIGN REVIEW ADMISSION VACUOUS'} — candidates=0; no visual/product gate evaluated`);
  process.exit(1);
}
console.log(fixtureMode ? 'DESIGN REVIEW ADMISSION FIXTURE PASS — NOT PRODUCTION EVIDENCE' : 'DESIGN REVIEW ADMISSION PASS');
