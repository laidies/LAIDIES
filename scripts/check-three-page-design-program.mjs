#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DEFAULT_MANIFEST = 'operations/design-programs/homepage-library-visitors-20260822.json';
const REQUIRED_PAGES = ['homepage', 'library', 'visitors-centre'];
const REVIEWABLE = new Set(['READY_FOR_ADMISSION', 'ADMITTED_FOR_ALI_REVIEW']);
const ADMITTED = 'ADMITTED_FOR_ALI_REVIEW';
const RUNTIME_BASE = {
  homepage: 'index.html',
  library: 'library.html',
  'visitors-centre': 'visitors-centre.html'
};
const TOKENS = {
  midnight: '#070f2b', ink: '#11183b', pink: '#f254a9', purple: '#7137d6',
  cyan: '#15bce0', cobalt: '#2457e6', sky: '#78c7ff', coral: '#ff7366',
  orange: '#ff9b3d', lime: '#b7e42b', mint: '#7de2c2', yellow: '#ffd34d',
  cream: '#fffdfb'
};
const ROUTED = {
  homepage: 'operations/product-stewards/town-entry-homepage/EXPERIENCE-BRIEF.md',
  library: 'operations/library-decisions.md',
  'visitors-centre': 'operations/product-stewards/visitors-centre/EXPERIENCE-BRIEF.md'
};
const REQUIRED_LIBRARY = [
  'operations/product-stewards/library/BOOK-EXPERIENCE-CONTRACT-2026-08-22.md',
  'operations/product-stewards/library/BUILD-PACKET-LIBRARY-PAGE-ELEVATION-2026-08-22.md',
  'operations/product-stewards/library/BUILD-PACKET-MISS-JEEVES-REFERENCE-TOOL-2026-08-22.md'
];
const sha256 = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const clean = value => value.replace(/^\/+/, '').replace(/[?#].*$/, '');
const assetPattern = /\.(?:avif|gif|jpe?g|png|svg|webp|mp3|m4a|aac|ogg|wav|mp4|webm|woff2?|ttf|otf)$/i;

function binding(root, item, label, errors) {
  if (!item?.path || !/^[a-f0-9]{64}$/.test(item.sha256 || '')) {
    errors.push(`${label}: exact path and SHA-256 required`);
    return false;
  }
  const absolute = path.join(root, item.path);
  if (!absolute.startsWith(`${root}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    errors.push(`${label}: missing or outside repository: ${item.path}`);
    return false;
  }
  const actual = sha256(absolute);
  if (actual !== item.sha256) errors.push(`${label}: hash mismatch for ${item.path}; expected ${item.sha256}, got ${actual}`);
  return actual === item.sha256;
}

function assetRefs(sourcePath, source) {
  const refs = new Set();
  for (const pattern of [/(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi, /url\(\s*["']?([^"')]+)["']?\s*\)/gi]) {
    for (const match of source.matchAll(pattern)) {
      const raw = match[1].trim();
      if (/^(?:data:|https?:|#)/i.test(raw) || !assetPattern.test(clean(raw))) continue;
      refs.add(raw.startsWith('/') ? clean(raw) : clean(path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), raw))));
    }
  }
  return refs;
}

export function homepageProofErrors(source) {
  const errors = [];
  const requiredCopy = [
    'AI fluency, taught through the pop culture you',
    'Made to click. Built to stick.',
    'Your brain kept the references.',
    'The plot explains it. The analogy unlocks it. Practice makes it click. The soundtrack makes it stick.',
    'Open the NewsStand',
    'What brought you to town today?',
    'Learn',
    'Understand the Headlines',
    'Watch the Episodes',
    'Tools and Games',
    'Connect',
    'On Wednesdays we do AI',
    'Meet the women behind AI',
    'Explore SUNNYVAiLE',
    'Listen live — KSVL 99.9'
  ];
  for (const fragment of requiredCopy) if (!source.includes(fragment)) errors.push(`approved Homepage copy missing: ${fragment}`);
  if (source.includes('method-grid') || source.includes('method-card') || /Story ·|Analogy ·|Practice ·|Music ·|Community ·/.test(source)) {
    errors.push('rejected five-image method collage is present');
  }
  const methodStart = source.indexOf('<section class="method"');
  const methodEnd = methodStart < 0 ? -1 : source.indexOf('</section>', methodStart);
  const methodSource = methodStart < 0 || methodEnd < 0 ? '' : source.slice(methodStart, methodEnd);
  if (!methodSource.includes('/assets/episodes/issue-01/episode-01-inline-article-image.jpg') || !methodSource.includes('class="method-copy"')) {
    errors.push('method must pair the bound editorial image with the approved compact explanation');
  }
  for (const rejected of ['Every building has a job.', 'A Card, a Postcard and the radio are different things.', 'Browse all back issues', 'KSVL is also an always-available']) {
    if (source.includes(rejected)) errors.push(`rejected invented Homepage copy is present: ${rejected}`);
  }
  if (/remembered on this device|unfinished Screening Room|laidies_screening_progress_v1|resumeNumber|isResume/.test(source)) {
    errors.push('device-local episode history cannot promote the Homepage resume episode');
  }
  if ((source.match(/data-copy-source=/g) || []).length < 8) errors.push('every meaning-bearing Homepage section must declare copy provenance');
  for (const requiredVisual of [
    '/assets/sunnyvaile-streets/main-street-dusk.webp',
    './assets/method-pop-bright-v2.png',
    './assets/pop-burst-bg-v1.png',
    '/assets/final_map/sunnyvaile-town-map-final-v5.webp',
    '/assets/episodes/issue-01/episode-01-inline-article-image.jpg',
    '/assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png'
  ]) if (!source.includes(requiredVisual)) errors.push(`Homepage proof is missing bound visual source: ${requiredVisual}`);
  if ((source.match(/<img\b/g) || []).length < 7) errors.push('Homepage proof does not contain enough real image-led sections');
  if (source.includes('class="section happening"')) {
    errors.push('deferred NewsStand Homepage preview must remain omitted until the NewsStand build is finished');
  }
  const ordered = ['class="hero"', 'class="method"', 'class="section intent"', 'class="section wednesday"', 'class="section women"', 'class="section explore"', 'class="continuations"'];
  const positions = ordered.map(fragment => source.indexOf(fragment));
  if (positions.some(position => position < 0) || positions.some((position, index) => index && position <= positions[index - 1])) {
    errors.push('approved Homepage section order is missing or out of sequence');
  }
  return errors;
}

export function visitorProofErrors(source) {
  const errors = [];
  const lockedOrder = [
    'What is SUNNYVAiLE?',
    'One town · Different learning jobs',
    'Help me do something',
    'Show me the town'
  ];
  const positions = lockedOrder.map(fragment => source.indexOf(fragment));
  if (positions.some(position => position < 0) || positions.some((position, index) => index && position <= positions[index - 1])) {
    errors.push('locked explanation order is missing or out of sequence');
  }
  const formatImages = [
    '/assets/sunnyvaile-interiors/episode-vhs-boxes/ep-01.webp',
    '/assets/town-characters/scenes/paige-scene.png',
    '/assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png',
    '/assets/episodes/ep-01/pixel/ep01-title-card-comic-v2.png',
    '/assets/building-interiors/ksvl-booth.jpg',
    '/assets/sunnyvaile-streets/schoolhouse-road-morning.webp'
  ];
  if (!formatImages.every(asset => source.includes(asset))) errors.push('six current-owner images are not all bound to the format jobs');
  for (const route of ['/games/fairy-godmother.html', '/sorority-house.html', '#vc-proof-map']) {
    if (!source.includes(route)) errors.push(`goal route missing: ${route}`);
  }
  if (!source.includes('Future classes') || !source.includes('The class tapes are still in production.')) {
    errors.push('future-classes truth is missing');
  }
  if (/written class previews are open/i.test(source)) errors.push('unsupported class availability claim is present');
  return errors;
}

export function libraryProofErrors({ css, js }) {
  const errors = [];
  const ask = js.indexOf('Ask Miss Jeeves');
  const browse = js.indexOf('Browse the shelves');
  if (ask < 0 || browse < 0 || browse <= ask || !js.includes('href="#miss-jeeves"') || !js.includes('href="#shelf-guide-title"')) {
    errors.push('Ask Miss Jeeves and Browse the shelves entry choices are missing or out of order');
  }
  if (!/\.shelf-unit[^{}]*\{[^{}]*left:0;right:auto;width:100%/s.test(css)) {
    errors.push('mobile shelf width is not constrained to the 390px viewport');
  }
  const fortyFourRules = [...css.matchAll(/min-height:44px/g)].length;
  if (fortyFourRules < 3 || !css.includes('.svgh-skip{display:flex;min-height:44px')) {
    errors.push('44px header and skip-link targets are not enforced');
  }
  if (/#[Ff][Ff][Dd]34[Dd]/.test(css)) errors.push('forbidden purple-yellow pairing token is present');
  return errors;
}

function git(root, args) {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    return null;
  }
}

function gitBytes(root, args) {
  try { return execFileSync('git', args, { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 }); }
  catch { return null; }
}

function validateDirectionAdmission(root, candidate, label, pageName, errors) {
  const admission = candidate.admission;
  const candidateSha = (candidate.source_files || []).find(item => item.path === candidate.entry_path)?.sha256;
  if (!admission || admission.presentation_stage !== 'REPRESENTATIVE_DIRECTION') {
    errors.push(`${label}: admitted direction requires REPRESENTATIVE_DIRECTION admission`);
    return;
  }
  if (admission.candidate_sha256 !== candidateSha) errors.push(`${label}: admission candidate SHA does not match entry bytes`);
  for (const viewport of ['desktop_1440','mobile_390']) {
    const screenshot = admission.screenshots?.[viewport];
    binding(root, screenshot, `${label} ${viewport} screenshot`, errors);
    if (screenshot?.candidate_sha256 !== candidateSha) errors.push(`${label}: ${viewport} screenshot is not bound to candidate SHA`);
    binding(root, admission.incumbent_screenshots?.[viewport], `${label} incumbent ${viewport} screenshot`, errors);
  }
  const ownerViewport = admission.screenshots?.owner_877x915;
  binding(root, ownerViewport, `${label} owner_877x915 screenshot`, errors);
  if (ownerViewport?.candidate_sha256 !== candidateSha) errors.push(`${label}: owner_877x915 screenshot is not bound to candidate SHA`);
  if (ownerViewport?.viewport?.width !== 877 || ownerViewport?.viewport?.height !== 915) errors.push(`${label}: owner_877x915 screenshot must bind the actual 877x915 owner viewport`);
  const checks = admission.objective_checks || {};
  const pageChecks = pageName === 'homepage'
    ? ['desktop_mobile_no_overflow','operable_targets_44px','public_play_absent','declared_routes_resolve','first_session_ident','reduced_motion_bypass','exact_wordmark','full_section_coverage','live_content_binding','owner_viewport_primary_cta_visible','intermediate_composition_retained']
    : pageName === 'library'
      ? ['desktop_mobile_no_overflow','operable_targets_44px','declared_routes_resolve','exact_wordmark','shared_header_mounted','fourteen_covers_visible','zero_open_actions','search_unclipped','preview_focus_return','prohibited_assets_absent']
      : ['desktop_mobile_no_overflow','operable_targets_44px','declared_routes_resolve','exact_wordmark','shared_header_mounted','purpose_and_orientation_visible','full_explanation_sequence','image_led_format_jobs','goal_routes_visible','tour_pause_resume','prohibited_assets_absent'];
  for (const key of pageChecks) {
    if (checks[key] !== 'PASS') errors.push(`${label}: objective check ${key} must PASS`);
  }
  const reviews = admission.independent_reviews || [];
  if (reviews.length !== 1) errors.push(`${label}: exactly one role-distinct visual-experience review is required`);
  for (const review of reviews) {
    binding(root, review.evidence, `${label} independent review evidence`, errors);
    if (!review.agent_id || review.role !== 'visual_experience' || review.verdict !== 'ADMIT' || review.candidate_sha256 !== candidateSha) {
      errors.push(`${label}: the independent visual-experience review must ADMIT the exact candidate`);
    }
    const expectedComparison = pageName === 'homepage' ? 'SAME_VIEWPORT_CURRENT_LIVE_HOMEPAGE' : 'SAME_VIEWPORT_CURRENT_LIVE_PAGE';
    if (review.comparison_basis !== expectedComparison || review.visible_regressions !== 0 || review.locked_decision_violations !== 0) errors.push(`${label}: independent review must compare same-viewport live/candidate renders with zero visible regressions or locked-decision violations`);
    const surfaces = new Set(review.reviewed_surfaces || []);
    const requiredSurfaces = pageName === 'homepage'
      ? ['desktop_1440','intermediate_900','mobile_390','owner_877x915','first_session_ident']
      : ['desktop_1440','mobile_390','owner_877x915'];
    for (const surface of requiredSurfaces) if (!surfaces.has(surface)) errors.push(`${label}: independent review missing surface ${surface}`);
  }
  const maker = admission.maker_review || {};
  if (maker.candidate_sha256 !== candidateSha || maker.result !== 'PASS' || maker.known_defects_remaining !== 0 || maker.objective_defects_remaining !== 0 || maker.visible_issues_remaining !== 0) {
    errors.push(`${label}: maker review must PASS exact bytes with zero remaining defects`);
  }
  if (admission.selection_scope !== 'DIRECTION_SELECTION_BEFORE_FULL_IMPLEMENTATION') errors.push(`${label}: selection scope must remain direction-first`);
}

export function validateProgram({ root = process.cwd(), manifestPath = DEFAULT_MANIFEST, verifyGit = true } = {}) {
  const errors = [];
  const absoluteManifest = path.isAbsolute(manifestPath) ? manifestPath : path.join(root, manifestPath);
  if (!fs.existsSync(absoluteManifest)) return [`manifest missing: ${manifestPath}`];
  let manifest;
  try { manifest = JSON.parse(fs.readFileSync(absoluteManifest, 'utf8')); }
  catch (error) { return [`manifest invalid JSON: ${error.message}`]; }
  const knownBadCandidates = new Set(manifest.calibration?.known_bad_candidate_sha256 || []);

  if (manifest.schema_version !== 2) errors.push('schema_version must be 2');
  binding(root, manifest.current_work_order, 'current work order', errors);
  if (manifest.current_work_order?.path && fs.existsSync(path.join(root, manifest.current_work_order.path))) {
    const workOrder = fs.readFileSync(path.join(root, manifest.current_work_order.path), 'utf8');
    for (const heading of ['Outcome','Scope','Current authority','Exact inputs','Applicable locks','Known-bad subset','Acceptance','Handoff','Prohibitions']) {
      if (!new RegExp(`^## ${heading}$`, 'm').test(workOrder)) errors.push(`current work order: missing ${heading}`);
    }
    if (!workOrder.includes('not a competing decision source')) errors.push('current work order must defer to DECISIONS routing');
  }
  if (manifest.checkpoint_policy?.operating_guard !== 'COMMIT_AND_PUSH_BEFORE_VISUAL_PRODUCTION') errors.push('operating guard must be committed and pushed before visual production');
  if (!manifest.checkpoint_policy?.ali_review_requires_exact_pushed_commit) errors.push('Ali review must require exact pushed commit');
  if (manifest.checkpoint_policy?.approved_page_release !== 'DEPLOY_AND_PUBLICLY_VERIFY_WITHOUT_WAITING_FOR_OTHER_PAGES') errors.push('approved pages must deploy and verify independently');
  if (manifest.visual_system?.whole_page_image_generation !== 'FORBIDDEN') errors.push('whole-page image generation must be forbidden');
  for (const [name, value] of Object.entries(TOKENS)) if (manifest.visual_system?.tokens?.[name] !== value) errors.push(`visual token ${name} must remain ${value}`);
  if (!manifest.visual_system?.forbidden_pairings?.includes('purple/yellow')) errors.push('purple/yellow pairing must remain forbidden');
  for (const item of manifest.shared_governing_sources || []) binding(root, item, 'shared governing source', errors);

  const globalProhibited = new Map();
  for (const item of manifest.global_prohibited_assets || []) {
    binding(root, item, 'global prohibited asset', errors);
    globalProhibited.set(item.path, item.sha256);
  }
  for (const pageName of REQUIRED_PAGES) {
    const page = manifest.pages?.[pageName];
    if (!page) { errors.push(`missing page: ${pageName}`); continue; }
    if (page.tracked_root !== `operations/design-explorations/current/${pageName}`) errors.push(`${pageName}: wrong tracked_root`);
    const sources = new Set((page.governing_sources || []).map(item => item.path));
    if (!sources.has(ROUTED[pageName])) errors.push(`${pageName}: missing routed current authority ${ROUTED[pageName]}`);
    if (pageName === 'library') for (const required of REQUIRED_LIBRARY) if (!sources.has(required)) errors.push(`library: missing current source ${required}`);
    for (const item of page.governing_sources || []) binding(root, item, `${pageName} governing source`, errors);

    const allowed = new Map();
    for (const item of page.allowed_existing_assets || []) {
      binding(root, item, `${pageName} allowed asset`, errors);
      if (!item.role) errors.push(`${pageName}: allowed asset requires role: ${item.path}`);
      if (globalProhibited.has(item.path)) errors.push(`${pageName}: prohibited asset also allowed: ${item.path}`);
      allowed.set(item.path, item.sha256);
    }
    const prohibited = new Map(globalProhibited);
    for (const item of page.prohibited_assets || []) {
      binding(root, item, `${pageName} prohibited asset`, errors);
      prohibited.set(item.path, item.sha256);
    }
    if (pageName === 'homepage') {
      if (page.locked_copy_source !== 'index.html' || !(page.locked_copy_fragments || []).length) errors.push('homepage: locked incumbent copy required');
      else {
        const source = fs.readFileSync(path.join(root, page.locked_copy_source), 'utf8');
        for (const fragment of page.locked_copy_fragments) if (!source.includes(fragment)) errors.push(`homepage: locked copy missing: ${fragment}`);
      }
    }

    const roles = new Set(page.required_new_art_roles || []);
    for (const candidate of page.candidates || []) {
      const label = `${pageName}/${candidate.id || 'unnamed'}`;
      const activePrefix = `${page.tracked_root}/`;
      const rejectedPrefix = `operations/design-explorations/rejected/${pageName}/`;
      const prefix = candidate.status === 'REJECTED_BY_ALI' ? rejectedPrefix : activePrefix;
      if (!candidate.id || !candidate.entry_path || !(candidate.source_files || []).length) { errors.push(`${label}: id, entry_path and source_files required`); continue; }
      if (!candidate.entry_path.startsWith(prefix)) errors.push(`${label}: entry is outside its required ${candidate.status === 'REJECTED_BY_ALI' ? 'rejected archive' : 'tracked_root'}`);
      if (candidate.production_method !== 'repo_composition') errors.push(`${label}: production_method must be repo_composition`);
      if (candidate.runtime_base) {
        binding(root, candidate.runtime_base, `${label} runtime base`, errors);
        if (candidate.runtime_base.path !== RUNTIME_BASE[pageName]) errors.push(`${label}: runtime base must be ${RUNTIME_BASE[pageName]} for ${pageName}`);
      }
      const runtimeBaseRefs = new Set();
      if (candidate.runtime_base?.path) {
        const absolute = path.join(root, candidate.runtime_base.path);
        if (fs.existsSync(absolute)) for (const ref of assetRefs(candidate.runtime_base.path, fs.readFileSync(absolute, 'utf8'))) runtimeBaseRefs.add(ref);
      }
      if (!candidate.runtime_base && (candidate.runtime_base_preserved_assets || []).length) errors.push(`${label}: runtime-base preserved assets require a runtime base`);
      for (const item of candidate.runtime_base_preserved_assets || []) {
        binding(root, item, `${label} runtime-base preserved asset`, errors);
        if (!item.role) errors.push(`${label}: runtime-base preserved asset requires role: ${item.path}`);
        if (prohibited.has(item.path)) errors.push(`${label}: prohibited runtime-base preserved asset ${item.path}`);
        if (allowed.get(item.path) !== item.sha256) errors.push(`${label}: runtime-base preserved asset is not allowlisted: ${item.path}`);
        if (!runtimeBaseRefs.has(item.path)) errors.push(`${label}: runtime-base preserved asset is not referenced by ${candidate.runtime_base?.path}: ${item.path}`);
      }
      const declared = new Map();
      for (const item of candidate.dependencies || []) {
        binding(root, item, `${label} dependency`, errors);
        if (prohibited.has(item.path)) errors.push(`${label}: prohibited dependency ${item.path}`);
        if (item.generated_for_candidate) {
          if (!item.path.startsWith(prefix) || !roles.has(item.role)) errors.push(`${label}: generated dependency has invalid path or role: ${item.path}`);
        } else if (candidate.status !== 'REJECTED_BY_ALI' && allowed.get(item.path) !== item.sha256) {
          errors.push(`${label}: existing dependency is not allowlisted: ${item.path}`);
        }
        declared.set(item.path, item.sha256);
      }
      const observed = new Set();
      for (const item of candidate.source_files || []) {
        binding(root, item, `${label} source`, errors);
        if (!item.path.startsWith(prefix)) errors.push(`${label}: source is outside its required ${candidate.status === 'REJECTED_BY_ALI' ? 'rejected archive' : 'tracked_root'}: ${item.path}`);
        const absolute = path.join(root, item.path);
        if (fs.existsSync(absolute)) for (const ref of assetRefs(item.path, fs.readFileSync(absolute, 'utf8'))) observed.add(ref);
      }
      if (pageName === 'visitors-centre' && REVIEWABLE.has(candidate.status)) {
        const proofSource = (candidate.source_files || []).find(item => item.path.endsWith('/proof.js'));
        if (!proofSource) errors.push(`${label}: Visitor proof.js source is required`);
        else {
          const absolute = path.join(root, proofSource.path);
          if (fs.existsSync(absolute)) for (const error of visitorProofErrors(fs.readFileSync(absolute, 'utf8'))) errors.push(`${label}: ${error}`);
        }
      }
      if (pageName === 'homepage' && REVIEWABLE.has(candidate.status)) {
        const proofSource = (candidate.source_files || []).find(item => item.path === candidate.entry_path);
        if (!proofSource) errors.push(`${label}: Homepage entry source is required`);
        else {
          const absolute = path.join(root, proofSource.path);
          if (fs.existsSync(absolute)) for (const error of homepageProofErrors(fs.readFileSync(absolute, 'utf8'))) errors.push(`${label}: ${error}`);
        }
      }
      if (pageName === 'library' && REVIEWABLE.has(candidate.status)) {
        const proofCss = (candidate.source_files || []).find(item => item.path.endsWith('/proof.css'));
        const proofJs = (candidate.source_files || []).find(item => item.path.endsWith('/proof.js'));
        if (!proofCss || !proofJs) errors.push(`${label}: Library proof.css and proof.js sources are required`);
        else {
          const cssAbsolute = path.join(root, proofCss.path);
          const jsAbsolute = path.join(root, proofJs.path);
          if (fs.existsSync(cssAbsolute) && fs.existsSync(jsAbsolute)) {
            for (const error of libraryProofErrors({ css: fs.readFileSync(cssAbsolute, 'utf8'), js: fs.readFileSync(jsAbsolute, 'utf8') })) errors.push(`${label}: ${error}`);
          }
        }
      }
      for (const ref of observed) if (!declared.has(ref)) errors.push(`${label}: unmanifested asset reference ${ref}`);
      for (const ref of declared.keys()) if (!observed.has(ref)) errors.push(`${label}: declared dependency not referenced: ${ref}`);
      const entrySha = (candidate.source_files || []).find(item => item.path === candidate.entry_path)?.sha256;
      if (candidate.status === 'REJECTED_BY_ALI') {
        if (!knownBadCandidates.has(entrySha)) errors.push(`${label}: Ali-rejected entry SHA must be a known-bad calibration fixture`);
        if (candidate.owner_verdict !== 'FULL_REJECTION_DO_NOT_ITERATE') errors.push(`${label}: Ali rejection must retain the full owner verdict`);
      } else if (knownBadCandidates.has(entrySha)) {
        errors.push(`${label}: exact Ali-rejected candidate cannot re-enter production or review`);
      }
      if (REVIEWABLE.has(candidate.status)) {
        if (!/^[a-f0-9]{40}$/.test(candidate.pushed_commit || '') || !candidate.pushed_ref) errors.push(`${label}: reviewable candidate requires pushed commit/ref`);
        if (verifyGit && candidate.pushed_ref) {
          const remote = git(root, ['ls-remote', '--refs', 'origin', candidate.pushed_ref]);
          if (!/^[a-f0-9]{40}\s/.test(remote || '')) errors.push(`${label}: pushed_ref absent on origin`);
          else if (git(root, ['merge-base', '--is-ancestor', candidate.pushed_commit, remote.split(/\s+/)[0]]) === null) errors.push(`${label}: pushed commit is not on pushed_ref`);
          for (const item of candidate.source_files || []) {
            const committed = gitBytes(root, ['show', `${candidate.pushed_commit}:${item.path}`]);
            if (committed === null || crypto.createHash('sha256').update(committed).digest('hex') !== item.sha256) errors.push(`${label}: pushed commit does not contain exact source ${item.path}`);
          }
          if (candidate.runtime_base) {
            const committed = gitBytes(root, ['show', `${candidate.pushed_commit}:${candidate.runtime_base.path}`]);
            if (committed === null || crypto.createHash('sha256').update(committed).digest('hex') !== candidate.runtime_base.sha256) errors.push(`${label}: pushed commit does not contain exact runtime base ${candidate.runtime_base.path}`);
          }
          for (const item of candidate.runtime_base_preserved_assets || []) {
            const committed = gitBytes(root, ['show', `${candidate.pushed_commit}:${item.path}`]);
            if (committed === null || crypto.createHash('sha256').update(committed).digest('hex') !== item.sha256) errors.push(`${label}: pushed commit does not contain exact runtime-base preserved asset ${item.path}`);
          }
          if ((git(root, ['status', '--porcelain', '--untracked-files=all', '--', page.tracked_root]) || '').length) errors.push(`${label}: tracked_root is dirty`);
        }
      }
      if (candidate.status === ADMITTED) validateDirectionAdmission(root, candidate, label, pageName, errors);
    }
  }
  const knownBad = new Set(manifest.calibration?.known_bad_dependencies || []);
  for (const required of ['assets/library/jeeves-scene.webp','assets/building-interiors/delivery-20260723-visitors-centre-lobby-v1/visitors-centre-lobby-map-wall-comic-candidate-v2.png']) {
    if (!knownBad.has(required)) errors.push(`calibration missing known-bad dependency ${required}`);
  }
  return errors;
}

const invoked = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (invoked) {
  const errors = validateProgram({ manifestPath: process.env.LAIDIES_THREE_PAGE_DESIGN_MANIFEST || DEFAULT_MANIFEST });
  if (errors.length) {
    console.error('THREE-PAGE DESIGN PROGRAM FAIL');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log('THREE-PAGE DESIGN PROGRAM PASS');
}
