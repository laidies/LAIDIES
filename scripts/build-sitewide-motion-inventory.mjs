#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(root, 'operations/video-qa/site-video-review-registry-2026-07-31.json');
const outputJsonPath = path.join(root, 'operations/video-qa/sitewide-motion-inventory-2026-08-01.json');
const outputReportPath = path.join(root, 'operations/video-qa/sitewide-motion-inventory-2026-08-01.md');
const checkOnly = process.argv.includes('--check');

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const tracked = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .sort();

const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const sourceExtensions = new Set(['.html', '.css', '.js', '.mjs', '.json']);
const excludedCandidatePrefixes = [
  '.retired/',
  '.versions/',
  '_superseded/',
  'concepts/',
  'node_modules/',
  'operations/',
  'output/',
  'scripts/',
  'tests/',
  'vendor/'
];

function normalizeRepoPath(value) {
  return value.split(path.sep).join('/').replace(/^\.\//, '');
}

function publicRouteToFile(route) {
  const clean = decodeURIComponent((route || '/').split(/[?#]/)[0]);
  if (clean === '/') return 'index.html';
  const relative = clean.replace(/^\//, '').replace(/\/$/, '');
  const candidates = [relative, `${relative}.html`, `${relative}/index.html`];
  return candidates.find((candidate) => fs.existsSync(path.join(root, candidate))) ?? `${relative}.html`;
}

function sourceTier(relativePath, sitemapFiles) {
  if (sitemapFiles.has(relativePath)) return 'SITEMAP_PUBLIC';
  if ((registry.monitored_visitor_sources ?? []).includes(relativePath)) return 'MONITORED_CANDIDATE';
  if (/^content\/site\/.*\.(?:js|css)$/.test(relativePath)) return 'SHARED_RUNTIME_CANDIDATE';
  return 'VISITOR_PAGE_CANDIDATE';
}

function lineNumber(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function cleanReference(reference) {
  return reference.trim().replace(/[?#].*$/, '');
}

function resolveLocalReference(sourcePath, reference) {
  const clean = cleanReference(reference);
  if (!clean || /^(?:https?:|data:|blob:|mailto:|tel:|javascript:|#)/i.test(clean)) return null;
  const decoded = decodeURIComponent(clean);
  const absolute = decoded.startsWith('/')
    ? path.resolve(root, decoded.replace(/^\/+/, ''))
    : path.resolve(root, path.dirname(sourcePath), decoded);
  const relative = normalizeRepoPath(path.relative(root, absolute));
  if (relative.startsWith('../')) return null;
  return relative;
}

function extractDependencies(sourcePath, source) {
  const dependencies = [];
  const pattern = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  for (const match of source.matchAll(pattern)) {
    const resolved = resolveLocalReference(sourcePath, match[1]);
    if (!resolved || !sourceExtensions.has(path.extname(resolved).toLowerCase())) continue;
    if (!fs.existsSync(path.join(root, resolved))) continue;
    dependencies.push(resolved);
  }
  return [...new Set(dependencies)].sort();
}

function extractMediaReferences(sourcePath, source) {
  const references = [];
  const patterns = [
    /["'`]([^"'`\n]+?\.(?:mp4|webm|m4v|mov|gif|riv)(?:\?[^"'`\n]*)?)["'`]/gi,
    /url\(\s*([^)'"\s]+?\.(?:mp4|webm|m4v|mov|gif|riv)(?:\?[^)'"\s]*)?)\s*\)/gi
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const literal = match[1];
      const normalizedPath = resolveLocalReference(sourcePath, literal);
      const absolute = normalizedPath ? path.join(root, normalizedPath) : null;
      references.push({
        source_path: sourcePath,
        line: lineNumber(source, match.index),
        literal,
        normalized_path: normalizedPath,
        exists: Boolean(absolute && fs.existsSync(absolute)),
        sha256: absolute && fs.existsSync(absolute) ? sha256(absolute) : null
      });
    }
  }
  return references;
}

function extractDynamicVideoRenderers(sourcePath, source) {
  const renderers = [];
  const lines = source.split('\n');
  const pattern = /<video\b|createElement\(\s*["']video["']\s*\)|\b(?:video(?:Element)?|player)\.src\s*=/i;
  lines.forEach((line, index) => {
    if (!pattern.test(line)) return;
    if (/^\s*(?:\/\/|<!--|\*)/.test(line)) return;
    renderers.push({
      source_path: sourcePath,
      line: index + 1,
      evidence: line.trim().slice(0, 240),
      admission_status: 'HOLD',
      reason: 'A runtime-created or runtime-bound video surface needs an exact final asset, occurrence manifest and responsive playback proof.'
    });
  });
  return renderers;
}

function extractRuntimeAnimations(sourcePath, source, sourceHash) {
  const animations = [];
  const patterns = [
    { kind: 'CSS_KEYFRAMES', pattern: /@(?:-webkit-)?keyframes\s+([A-Za-z0-9_-]+)/g },
    { kind: 'WEB_ANIMATIONS_API', pattern: /\.animate\s*\(/g },
    { kind: 'ANIMATION_FRAME_LOOP', pattern: /requestAnimationFrame\s*\(/g },
    { kind: 'TIMED_MEDIA_SWAP', pattern: /setTimeout\s*\([^\n]*\.src\s*=/g }
  ];
  for (const { kind, pattern } of patterns) {
    for (const match of source.matchAll(pattern)) {
      const name = kind === 'CSS_KEYFRAMES' ? match[1] : `${kind.toLowerCase()}-${lineNumber(source, match.index)}`;
      const riskClass = /(?:watch\.html|learn\/class\.html|preview-homepage\.html|games\/|charm-hunt|ksvl-player)/.test(sourcePath)
        ? 'SEMANTIC_OR_INSTRUCTIONAL_REVIEW_REQUIRED'
        : 'UI_OR_DECORATIVE_CLASSIFICATION_REQUIRED';
      animations.push({
        id: `${sourcePath.replace(/[^A-Za-z0-9]+/g, '-')}-${name}`.replace(/^-|-$/g, '').toLowerCase(),
        source_path: sourcePath,
        source_sha256: sourceHash,
        line: lineNumber(source, match.index),
        kind,
        name,
        risk_class: riskClass,
        owner_classification: 'REQUIRES_OWNER_CLASSIFICATION',
        reviewed_occurrences: 0,
        admission_status: 'HOLD',
        reason: 'Runtime motion is not admitted until its visitor purpose, responsive behavior, reduced-motion behavior and exact occurrences are classified and reviewed.'
      });
    }
  }
  return animations;
}

const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/laidies\.ai([^<]*)<\/loc>/g)].map((match) => match[1] || '/');
const sitemapFiles = new Set(sitemapRoutes.map(publicRouteToFile));
const missingSitemapFiles = [...sitemapFiles].filter((file) => !fs.existsSync(path.join(root, file)));

const seedTiers = new Map();
for (const file of sitemapFiles) seedTiers.set(file, 'SITEMAP_PUBLIC');
for (const file of registry.monitored_visitor_sources ?? []) {
  if (fs.existsSync(path.join(root, file))) seedTiers.set(file, sourceTier(file, sitemapFiles));
}
for (const file of tracked) {
  if (!file.endsWith('.html')) continue;
  if (excludedCandidatePrefixes.some((prefix) => file.startsWith(prefix))) continue;
  if (path.basename(file).startsWith('_')) continue;
  seedTiers.set(file, sourceTier(file, sitemapFiles));
}
for (const file of tracked) {
  if (/^content\/site\/.*\.(?:js|css)$/.test(file)) seedTiers.set(file, 'SHARED_RUNTIME_CANDIDATE');
}

const queue = [...seedTiers.keys()].sort();
const visited = new Map();
while (queue.length) {
  const sourcePath = queue.shift();
  if (visited.has(sourcePath)) continue;
  const absolute = path.join(root, sourcePath);
  if (!fs.existsSync(absolute) || !sourceExtensions.has(path.extname(sourcePath).toLowerCase())) continue;
  const source = fs.readFileSync(absolute, 'utf8');
  const tier = seedTiers.get(sourcePath) ?? 'PAGE_DEPENDENCY';
  visited.set(sourcePath, { source, tier, sha256: sha256(absolute) });
  for (const dependency of extractDependencies(sourcePath, source)) {
    if (!seedTiers.has(dependency)) seedTiers.set(dependency, 'PAGE_DEPENDENCY');
    if (!visited.has(dependency)) queue.push(dependency);
  }
  queue.sort();
}

const registeredMotion = new Map();
for (const item of registry.direct_motion_assets ?? []) registeredMotion.set(item.path, { id: item.id, kind: 'DIRECT_MOTION_ASSET', status: item.admission_status });
for (const item of registry.programmes ?? []) registeredMotion.set(item.master_path, { id: item.id, kind: 'PROGRAMME_MASTER', status: item.admission_status });

const mediaReferences = [];
const dynamicVideoRenderers = [];
const runtimeAnimations = [];
for (const [sourcePath, record] of [...visited.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  mediaReferences.push(...extractMediaReferences(sourcePath, record.source).map((reference) => {
    const registration = reference.normalized_path ? registeredMotion.get(reference.normalized_path) : null;
    return {
      ...reference,
      source_tier: record.tier,
      registry_id: registration?.id ?? null,
      registry_kind: registration?.kind ?? null,
      registry_status: registration?.status ?? null,
      admission_status: registration ? registration.status : 'HOLD',
      inventory_disposition: registration ? 'REGISTERED' : 'UNREGISTERED_HOLD'
    };
  }));
  dynamicVideoRenderers.push(...extractDynamicVideoRenderers(sourcePath, record.source).map((item) => ({ ...item, source_tier: record.tier })));
  runtimeAnimations.push(...extractRuntimeAnimations(sourcePath, record.source, record.sha256).map((item) => ({ ...item, source_tier: record.tier })));
}

const uniqueMedia = [...new Map(mediaReferences.map((item) => [`${item.source_path}:${item.line}:${item.literal}`, item])).values()]
  .sort((a, b) => a.source_path.localeCompare(b.source_path) || a.line - b.line || a.literal.localeCompare(b.literal));
const uniqueRenderers = [...new Map(dynamicVideoRenderers.map((item) => [`${item.source_path}:${item.line}:${item.evidence}`, item])).values()]
  .sort((a, b) => a.source_path.localeCompare(b.source_path) || a.line - b.line);
const uniqueAnimations = [...new Map(runtimeAnimations.map((item) => [`${item.source_path}:${item.line}:${item.kind}:${item.name}`, item])).values()]
  .sort((a, b) => a.source_path.localeCompare(b.source_path) || a.line - b.line || a.name.localeCompare(b.name));

const missingMedia = uniqueMedia.filter((item) => item.normalized_path && !item.exists);
const unregisteredMedia = uniqueMedia.filter((item) => item.inventory_disposition === 'UNREGISTERED_HOLD');
const inventoryStatus = missingSitemapFiles.length || missingMedia.length ? 'FAIL' : 'HOLD';
const inventory = {
  schema_version: 1,
  inventory_date: '2026-08-01',
  status: inventoryStatus,
  contract: registry.contract,
  registry: normalizeRepoPath(path.relative(root, registryPath)),
  inventory_rule: 'A file in storage is not visitor-facing merely because it exists. Sitemap routes, eligible visitor-page candidates, monitored sources and their local dependencies are scanned. Every discovered motion surface remains HOLD unless the exact registry independently admits it.',
  route_scope: {
    sitemap_routes: sitemapRoutes.length,
    sitemap_files: [...sitemapFiles].sort(),
    missing_sitemap_files: missingSitemapFiles,
    visitor_candidate_pages: [...seedTiers.entries()].filter(([, tier]) => tier === 'VISITOR_PAGE_CANDIDATE').map(([file]) => file).sort(),
    scanned_source_files: visited.size
  },
  summary: {
    literal_motion_references: uniqueMedia.length,
    registered_literal_references: uniqueMedia.filter((item) => item.inventory_disposition === 'REGISTERED').length,
    unregistered_literal_references: unregisteredMedia.length,
    missing_literal_motion_files: missingMedia.length,
    dynamic_video_renderers: uniqueRenderers.length,
    runtime_animation_definitions: uniqueAnimations.length,
    semantic_or_instructional_runtime_animations: uniqueAnimations.filter((item) => item.risk_class === 'SEMANTIC_OR_INSTRUCTIONAL_REVIEW_REQUIRED').length,
    ui_or_decorative_runtime_animations_requiring_classification: uniqueAnimations.filter((item) => item.risk_class === 'UI_OR_DECORATIVE_CLASSIFICATION_REQUIRED').length
  },
  literal_motion_references: uniqueMedia,
  dynamic_video_renderers: uniqueRenderers,
  runtime_animations: uniqueAnimations
};

const json = `${JSON.stringify(inventory, null, 2)}\n`;
const report = `# Sitewide motion inventory — 2026-08-01\n\n` +
  `**Status:** ${inventory.status}\n\n` +
  `This is a deterministic, visitor-surface inventory under the active site-video review contract. It does not admit any media or animation. It identifies what must be classified and reviewed before release. Stored experiments are not treated as live merely because their files exist.\n\n` +
  `## Coverage\n\n` +
  `- Sitemap routes: ${inventory.route_scope.sitemap_routes}\n` +
  `- Visitor candidate pages: ${inventory.route_scope.visitor_candidate_pages.length}\n` +
  `- Source files reached through pages and dependencies: ${inventory.route_scope.scanned_source_files}\n` +
  `- Literal motion references: ${inventory.summary.literal_motion_references}\n` +
  `- Registered literal references: ${inventory.summary.registered_literal_references}\n` +
  `- Unregistered literal references held: ${inventory.summary.unregistered_literal_references}\n` +
  `- Missing literal motion files: ${inventory.summary.missing_literal_motion_files}\n` +
  `- Dynamic video renderers held: ${inventory.summary.dynamic_video_renderers}\n` +
  `- Runtime animation definitions held for classification: ${inventory.summary.runtime_animation_definitions}\n` +
  `- Semantic/instructional runtime animations: ${inventory.summary.semantic_or_instructional_runtime_animations}\n\n` +
  `## Release rule\n\n` +
  `Every unregistered literal motion reference, dynamic video renderer and runtime animation stays **HOLD**. Semantic or instructional motion needs an occurrence-level description, purpose or contemporaneous narration comparison, responsive proof, reduced-motion behavior and independent review. Decorative/UI motion must first be classified and then checked for responsive, accessibility and interaction correctness.\n\n` +
  `## Unregistered or missing literal motion\n\n` +
  (unregisteredMedia.length
    ? unregisteredMedia.map((item) => `- \`${item.source_path}:${item.line}\` → \`${item.normalized_path ?? item.literal}\` (${item.exists ? 'exists, unregistered' : 'missing or external/unresolved'})`).join('\n')
    : '- None.') +
  `\n\n## Dynamic video renderers\n\n` +
  (uniqueRenderers.length
    ? uniqueRenderers.map((item) => `- \`${item.source_path}:${item.line}\` — ${item.evidence}`).join('\n')
    : '- None.') +
  `\n\n## Runtime motion by source\n\n` +
  ([...new Map(uniqueAnimations.map((item) => [item.source_path, uniqueAnimations.filter((candidate) => candidate.source_path === item.source_path)])).entries()]
    .map(([sourcePath, items]) => `- \`${sourcePath}\`: ${items.length} (${items.map((item) => item.name).join(', ')})`)
    .join('\n') || '- None.') +
  `\n`;

if (checkOnly) {
  const errors = [];
  if (!fs.existsSync(outputJsonPath) || fs.readFileSync(outputJsonPath, 'utf8') !== json) errors.push('JSON inventory is stale or missing.');
  if (!fs.existsSync(outputReportPath) || fs.readFileSync(outputReportPath, 'utf8') !== report) errors.push('Markdown inventory is stale or missing.');
  if (errors.length) {
    console.error('SITEWIDE MOTION INVENTORY: INVALID');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log('SITEWIDE MOTION INVENTORY: CURRENT');
} else {
  fs.writeFileSync(outputJsonPath, json);
  fs.writeFileSync(outputReportPath, report);
  console.log(`SITEWIDE MOTION INVENTORY: ${inventory.status}`);
  console.log(`- scanned source files: ${inventory.route_scope.scanned_source_files}`);
  console.log(`- literal motion references: ${inventory.summary.literal_motion_references}`);
  console.log(`- unregistered literal references: ${inventory.summary.unregistered_literal_references}`);
  console.log(`- dynamic video renderers: ${inventory.summary.dynamic_video_renderers}`);
  console.log(`- runtime animations: ${inventory.summary.runtime_animation_definitions}`);
}
