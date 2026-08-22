#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DEFAULT_MANIFEST = 'operations/design-programs/homepage-library-visitors-20260822.json';
const REQUIRED_PAGES = ['homepage', 'library', 'visitors-centre'];
const REVIEWABLE = new Set(['READY_FOR_ADMISSION', 'ADMITTED_FOR_ALI_REVIEW']);
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
const assetPattern = /\.(?:avif|gif|jpe?g|png|svg|webp|mp4|webm|woff2?|ttf|otf)$/i;

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

function git(root, args) {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    return null;
  }
}

export function validateProgram({ root = process.cwd(), manifestPath = DEFAULT_MANIFEST, verifyGit = true } = {}) {
  const errors = [];
  const absoluteManifest = path.isAbsolute(manifestPath) ? manifestPath : path.join(root, manifestPath);
  if (!fs.existsSync(absoluteManifest)) return [`manifest missing: ${manifestPath}`];
  let manifest;
  try { manifest = JSON.parse(fs.readFileSync(absoluteManifest, 'utf8')); }
  catch (error) { return [`manifest invalid JSON: ${error.message}`]; }

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
      const prefix = `${page.tracked_root}/`;
      if (!candidate.id || !candidate.entry_path || !(candidate.source_files || []).length) { errors.push(`${label}: id, entry_path and source_files required`); continue; }
      if (!candidate.entry_path.startsWith(prefix)) errors.push(`${label}: entry escapes tracked_root`);
      if (candidate.production_method !== 'repo_composition') errors.push(`${label}: production_method must be repo_composition`);
      const declared = new Map();
      for (const item of candidate.dependencies || []) {
        binding(root, item, `${label} dependency`, errors);
        if (prohibited.has(item.path)) errors.push(`${label}: prohibited dependency ${item.path}`);
        if (item.generated_for_candidate) {
          if (!item.path.startsWith(prefix) || !roles.has(item.role)) errors.push(`${label}: generated dependency has invalid path or role: ${item.path}`);
        } else if (allowed.get(item.path) !== item.sha256) errors.push(`${label}: existing dependency is not allowlisted: ${item.path}`);
        declared.set(item.path, item.sha256);
      }
      const observed = new Set();
      for (const item of candidate.source_files || []) {
        binding(root, item, `${label} source`, errors);
        if (!item.path.startsWith(prefix)) errors.push(`${label}: source escapes tracked_root: ${item.path}`);
        const absolute = path.join(root, item.path);
        if (fs.existsSync(absolute)) for (const ref of assetRefs(item.path, fs.readFileSync(absolute, 'utf8'))) observed.add(ref);
      }
      for (const ref of observed) if (!declared.has(ref)) errors.push(`${label}: unmanifested asset reference ${ref}`);
      for (const ref of declared.keys()) if (!observed.has(ref)) errors.push(`${label}: declared dependency not referenced: ${ref}`);
      if (REVIEWABLE.has(candidate.status)) {
        if (!/^[a-f0-9]{40}$/.test(candidate.pushed_commit || '') || !candidate.pushed_ref) errors.push(`${label}: reviewable candidate requires pushed commit/ref`);
        if (verifyGit && candidate.pushed_ref) {
          const remote = git(root, ['ls-remote', '--refs', 'origin', candidate.pushed_ref]);
          if (!/^[a-f0-9]{40}\s/.test(remote || '')) errors.push(`${label}: pushed_ref absent on origin`);
          if ((git(root, ['status', '--porcelain', '--untracked-files=all', '--', page.tracked_root]) || '').length) errors.push(`${label}: tracked_root is dirty`);
        }
      }
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
