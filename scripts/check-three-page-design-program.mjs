#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DEFAULT_MANIFEST = 'operations/design-programs/homepage-library-visitors-20260822.json';
const REQUIRED_PAGES = ['homepage', 'library', 'visitors-centre'];
const REVIEWABLE = new Set(['READY_FOR_ADMISSION', 'ADMITTED_FOR_ALI_REVIEW']);
const REQUIRED_WORK_ORDER_HEADINGS = [
  'Outcome',
  'Scope',
  'Current authority',
  'Exact inputs',
  'Applicable locks',
  'Known-bad subset',
  'Acceptance',
  'Handoff',
  'Prohibitions'
];
const LIBRARY_REQUIRED_SOURCES = [
  'operations/product-stewards/library/BOOK-EXPERIENCE-CONTRACT-2026-08-22.md',
  'operations/product-stewards/library/BUILD-PACKET-LIBRARY-PAGE-ELEVATION-2026-08-22.md'
];
const REQUIRED_VISUAL_TOKENS = {
  midnight: '#070f2b', ink: '#11183b', pink: '#f254a9', purple: '#7137d6',
  cyan: '#15bce0', cobalt: '#2457e6', sky: '#78c7ff', coral: '#ff7366',
  orange: '#ff9b3d', lime: '#b7e42b', mint: '#7de2c2', yellow: '#ffd34d',
  cream: '#fffdfb'
};
const REQUIRED_VISUAL_MECHANISMS = [
  'saturated gradients', 'halftone or pop-art texture', 'dark ink keylines',
  'hard offset shadows', 'layered editorial framing'
];

const sha256 = filePath => crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
const cleanPath = value => value.replace(/^\/+/, '').replace(/[?#].*$/, '');
const isAsset = value => /\.(?:avif|gif|jpe?g|png|svg|webp|mp4|webm|woff2?|ttf|otf)$/i.test(cleanPath(value));

function extractAssetReferences(sourcePath, body) {
  const refs = [];
  const patterns = [
    /(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi,
    /url\(\s*["']?([^"')]+)["']?\s*\)/gi
  ];
  for (const pattern of patterns) {
    for (const match of body.matchAll(pattern)) {
      const raw = match[1].trim();
      if (/^(?:data:|https?:|#)/i.test(raw) || !isAsset(raw)) continue;
      const normalized = raw.startsWith('/')
        ? cleanPath(raw)
        : cleanPath(path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), raw)));
      refs.push(normalized);
    }
  }
  return [...new Set(refs)];
}

function verifyBoundFile(root, binding, label, errors) {
  if (!binding?.path || !/^[a-f0-9]{64}$/.test(binding.sha256 || '')) {
    errors.push(`${label}: path and lowercase SHA-256 are required`);
    return;
  }
  const absolute = path.join(root, binding.path);
  if (!fs.existsSync(absolute)) {
    errors.push(`${label}: missing ${binding.path}`);
    return;
  }
  const actual = sha256(absolute);
  if (actual !== binding.sha256) errors.push(`${label}: hash mismatch for ${binding.path}; expected ${binding.sha256}, got ${actual}`);
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
  try {
    manifest = JSON.parse(fs.readFileSync(absoluteManifest, 'utf8'));
  } catch (error) {
    return [`manifest is not valid JSON: ${error.message}`];
  }

  if (manifest.schema_version !== 1) errors.push('schema_version must be 1');
  verifyBoundFile(root, manifest.current_work_order, 'current work order', errors);
  if (manifest.current_work_order?.path) {
    const workOrderPath = path.join(root, manifest.current_work_order.path);
    if (fs.existsSync(workOrderPath)) {
      const workOrder = fs.readFileSync(workOrderPath, 'utf8');
      for (const heading of REQUIRED_WORK_ORDER_HEADINGS) {
        if (!new RegExp(`^## ${heading}$`, 'm').test(workOrder)) errors.push(`current work order: missing required field ${heading}`);
      }
      for (const metadata of ['Foreground owner', 'Effective date', 'Current authority/version', 'Resume trigger']) {
        if (!new RegExp(`^\\*\\*${metadata}:\\*\\*\\s+\\S`, 'm').test(workOrder)) errors.push(`current work order: missing ${metadata}`);
      }
    }
  }
  if (!manifest.checkpoint_policy?.ali_review_requires_exact_pushed_commit) errors.push('Ali review must require an exact pushed commit');
  if (manifest.checkpoint_policy?.approved_page_release !== 'DEPLOY_AND_PUBLICLY_VERIFY_WITHOUT_WAITING_FOR_OTHER_PAGES') {
    errors.push('approved page units must deploy and receive public verification without waiting for other pages');
  }
  if (manifest.visual_system?.whole_page_image_generation !== 'FORBIDDEN') errors.push('whole-page image generation must be forbidden');
  for (const [name, value] of Object.entries(REQUIRED_VISUAL_TOKENS)) {
    if (manifest.visual_system?.tokens?.[name] !== value) errors.push(`visual token ${name} must remain ${value}`);
  }
  for (const mechanism of REQUIRED_VISUAL_MECHANISMS) {
    if (!manifest.visual_system?.required_mechanisms?.includes(mechanism)) errors.push(`visual system is missing ${mechanism}`);
  }
  if (!manifest.visual_system?.forbidden_pairings?.includes('purple/yellow')) errors.push('purple/yellow pairing must remain forbidden');
  for (const source of manifest.shared_governing_sources || []) verifyBoundFile(root, source, 'shared governing source', errors);

  const globalProhibited = new Map();
  for (const item of manifest.global_prohibited_assets || []) {
    verifyBoundFile(root, item, 'global prohibited asset', errors);
    globalProhibited.set(item.path, item.sha256);
  }

  for (const pageName of REQUIRED_PAGES) {
    const page = manifest.pages?.[pageName];
    if (!page) {
      errors.push(`missing page program: ${pageName}`);
      continue;
    }
    if (!page.owner || !/^\d{4}-\d{2}-\d{2}$/.test(page.effective_date || '') || !Array.isArray(page.supersedes)) {
      errors.push(`${pageName}: owner, effective_date and supersedes are required`);
    }
    if (page.tracked_root !== `operations/design-explorations/current/${pageName}`) errors.push(`${pageName}: tracked_root is not the required recoverable lane`);
    if (!Array.isArray(page.governing_sources) || page.governing_sources.length === 0) errors.push(`${pageName}: governing_sources cannot be empty`);
    for (const source of page.governing_sources || []) verifyBoundFile(root, source, `${pageName} governing source`, errors);
    if (pageName === 'library') {
      const librarySources = new Set((page.governing_sources || []).map(source => source.path));
      for (const requiredSource of LIBRARY_REQUIRED_SOURCES) {
        if (!librarySources.has(requiredSource)) errors.push(`library: missing required governing source ${requiredSource}`);
      }
    }
    if (pageName === 'homepage') {
      if (page.locked_copy_source !== 'index.html' || !Array.isArray(page.locked_copy_fragments) || page.locked_copy_fragments.length === 0) {
        errors.push('homepage: locked incumbent copy source/fragments are required');
      } else {
        const incumbent = fs.readFileSync(path.join(root, page.locked_copy_source), 'utf8');
        for (const fragment of page.locked_copy_fragments) if (!incumbent.includes(fragment)) errors.push(`homepage: locked incumbent copy is missing: ${fragment}`);
      }
    }

    const allowed = new Map();
    for (const asset of page.allowed_existing_assets || []) {
      verifyBoundFile(root, asset, `${pageName} allowed asset`, errors);
      if (!asset.role) errors.push(`${pageName}: allowed asset ${asset.path} needs a role`);
      if (globalProhibited.has(asset.path)) errors.push(`${pageName}: globally prohibited asset is also allowed: ${asset.path}`);
      allowed.set(asset.path, asset.sha256);
    }
    const prohibited = new Map(globalProhibited);
    for (const asset of page.prohibited_assets || []) {
      verifyBoundFile(root, asset, `${pageName} prohibited asset`, errors);
      prohibited.set(asset.path, asset.sha256);
    }
    const roles = new Set(page.required_new_art_roles || []);

    for (const candidate of page.candidates || []) {
      const label = `${pageName}/${candidate.id || 'unnamed'}`;
      if (!candidate.id || !candidate.entry_path || !Array.isArray(candidate.source_files) || candidate.source_files.length === 0) {
        errors.push(`${label}: id, entry_path and source_files are required`);
        continue;
      }
      if (candidate.production_method !== 'repo_composition') errors.push(`${label}: production_method must be repo_composition`);
      const rootPrefix = `${page.tracked_root}/`;
      if (!candidate.entry_path.startsWith(rootPrefix)) errors.push(`${label}: entry_path escapes tracked_root`);
      const declared = new Map();
      for (const dependency of candidate.dependencies || []) {
        verifyBoundFile(root, dependency, `${label} dependency`, errors);
        if (prohibited.has(dependency.path) || prohibited.get(dependency.path) === dependency.sha256) errors.push(`${label}: prohibited dependency ${dependency.path}`);
        if (dependency.generated_for_candidate) {
          if (!dependency.path.startsWith(rootPrefix)) errors.push(`${label}: generated dependency escapes tracked_root: ${dependency.path}`);
          if (!roles.has(dependency.role)) errors.push(`${label}: generated dependency uses undeclared role: ${dependency.role || 'missing'}`);
        } else if (allowed.get(dependency.path) !== dependency.sha256) {
          errors.push(`${label}: existing dependency is not on the page allowlist: ${dependency.path}`);
        }
        declared.set(dependency.path, dependency.sha256);
      }

      const observed = new Set();
      for (const source of candidate.source_files) {
        verifyBoundFile(root, source, `${label} source`, errors);
        if (!source.path.startsWith(rootPrefix)) errors.push(`${label}: source escapes tracked_root: ${source.path}`);
        const absolute = path.join(root, source.path);
        if (!fs.existsSync(absolute)) continue;
        for (const ref of extractAssetReferences(source.path, fs.readFileSync(absolute, 'utf8'))) observed.add(ref);
      }
      for (const ref of observed) if (!declared.has(ref)) errors.push(`${label}: unmanifested asset reference ${ref}`);
      for (const ref of declared.keys()) if (!observed.has(ref)) errors.push(`${label}: declared dependency is not referenced by candidate sources: ${ref}`);

      if (REVIEWABLE.has(candidate.status)) {
        if (!/^[a-f0-9]{40}$/.test(candidate.pushed_commit || '') || !candidate.pushed_ref) errors.push(`${label}: reviewable candidate needs pushed_commit and pushed_ref`);
        if (verifyGit && candidate.pushed_commit && candidate.pushed_ref) {
          if (git(root, ['cat-file', '-e', `${candidate.pushed_commit}:${candidate.entry_path}`]) === null) errors.push(`${label}: entry bytes are not in pushed_commit`);
          if (git(root, ['merge-base', '--is-ancestor', candidate.pushed_commit, candidate.pushed_ref]) === null) errors.push(`${label}: pushed_commit is not reachable from ${candidate.pushed_ref}`);
          const remoteResult = git(root, ['ls-remote', '--refs', 'origin', candidate.pushed_ref]);
          const remoteTip = remoteResult?.split(/\s+/)[0];
          if (!/^[a-f0-9]{40}$/.test(remoteTip || '')) {
            errors.push(`${label}: pushed_ref is not present on origin`);
          } else if (git(root, ['merge-base', '--is-ancestor', candidate.pushed_commit, remoteTip]) === null) {
            errors.push(`${label}: pushed_commit is not reachable from origin ${candidate.pushed_ref}`);
          }
          const ownedStatus = git(root, ['status', '--porcelain', '--untracked-files=all', '--', page.tracked_root]);
          if (ownedStatus === null || ownedStatus.length > 0) errors.push(`${label}: tracked_root is dirty`);
        }
      }
    }
  }

  const calibration = new Set(manifest.calibration?.known_bad_dependencies || []);
  const visitorBad = 'assets/building-interiors/delivery-20260723-visitors-centre-lobby-v1/visitors-centre-lobby-map-wall-comic-candidate-v2.png';
  const homepageBad = 'assets/library/jeeves-scene.webp';
  if (!calibration.has(visitorBad) || !calibration.has(homepageBad)) errors.push('calibration must name the rejected Visitor lobby and stale Homepage Miss Jeeves asset');
  if (!manifest.pages?.['visitors-centre']?.prohibited_assets?.some(item => item.path === visitorBad)) errors.push('rejected Visitor lobby is not mechanically prohibited');
  if (!manifest.global_prohibited_assets?.some(item => item.path === homepageBad)) errors.push('stale Homepage Miss Jeeves asset is not mechanically prohibited');
  return errors;
}

const invoked = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (invoked) {
  const manifestPath = process.env.LAIDIES_THREE_PAGE_DESIGN_MANIFEST || DEFAULT_MANIFEST;
  const errors = validateProgram({ manifestPath });
  if (errors.length) {
    console.error('THREE-PAGE DESIGN PROGRAM FAIL');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log('THREE-PAGE DESIGN PROGRAM PASS');
}
