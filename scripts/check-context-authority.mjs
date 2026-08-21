#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const rootIndex = process.argv.indexOf('--root');
const root = rootIndex >= 0 ? path.resolve(process.argv[rootIndex + 1]) : process.cwd();
const fixtureMode = process.argv.includes('--fixture');
const fixtureIndex = process.argv.indexOf('--fixture-manifest');
const fixtureManifest = fixtureIndex >= 0 ? process.argv[fixtureIndex + 1] : null;

if (fixtureManifest && !fixtureMode) {
  console.error('CONTEXT AUTHORITY FAIL');
  console.error('- RULE_00: fixture manifest requires --fixture');
  process.exit(1);
}

const manifestPath = fixtureManifest
  ? path.resolve(fixtureManifest)
  : path.join(root, 'operations/context-authority.json');
const errors = [];
const fail = (rule, message) => errors.push(`${rule}: ${message}`);

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (error) {
  fail('RULE_00', `cannot read manifest: ${error.message}`);
}

const normalizeRelative = value => {
  if (typeof value !== 'string' || !value.trim()) return null;
  if (path.isAbsolute(value)) return null;
  const normalized = path.posix.normalize(value.replaceAll('\\', '/'));
  if (normalized === '..' || normalized.startsWith('../')) return null;
  return normalized.replace(/^\.\//, '');
};

const resolveRequired = (value, rule) => {
  const relative = normalizeRelative(value);
  if (!relative) {
    fail(rule, `unsafe or invalid repository path: ${String(value)}`);
    return null;
  }
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute)) {
    fail(rule, `missing path: ${relative}`);
    return null;
  }
  return { relative, absolute };
};

const lineCount = text => text.length ? text.replace(/\n$/, '').split('\n').length : 0;

if (manifest) {
  const startup = manifest.startupAuthority;
  const expectedRoles = ['operating_contract', 'decision_router', 'naming_status', 'active_task'];
  if (!Array.isArray(startup) || startup.length !== expectedRoles.length) {
    fail('RULE_01', `startupAuthority must contain exactly ${expectedRoles.length} entries`);
  } else {
    const expectedBindings = new Map([
      ['operating_contract', 'AGENTS.md'],
      ['decision_router', 'operations/DECISIONS.md'],
      ['naming_status', 'operations/voice/laidies-canon-index.md'],
      ['active_task', 'operations/ACTIVE-WORK.md']
    ]);
    const paths = startup.map(entry => entry.path);
    const roles = startup.map(entry => entry.role);
    const ranks = startup.map(entry => entry.rank);
    if (new Set(paths).size !== paths.length) fail('RULE_01', 'startupAuthority contains a duplicate path');
    if (new Set(roles).size !== roles.length) fail('RULE_01', 'startupAuthority contains a duplicate role');
    if (new Set(ranks).size !== ranks.length) fail('RULE_01', 'startupAuthority contains a duplicate rank');
    if (roles.join('|') !== expectedRoles.join('|')) fail('RULE_01', `startup roles must be ordered: ${expectedRoles.join(', ')}`);
    if (ranks.join('|') !== '1|2|3|4') fail('RULE_01', 'startup ranks must be exactly 1, 2, 3, 4');
    for (const entry of startup) {
      if (expectedBindings.get(entry.role) !== entry.path) {
        fail('RULE_01', `${entry.role} must bind ${expectedBindings.get(entry.role)}; found ${entry.path}`);
      }
    }
  }

  const supersededRoots = Array.isArray(manifest.supersededRoots) ? manifest.supersededRoots : [];
  const history = new Set(Array.isArray(manifest.historyOnly) ? manifest.historyOnly : []);
  let totalLines = 0;

  for (const entry of Array.isArray(startup) ? startup : []) {
    const resolved = resolveRequired(entry.path, 'RULE_02');
    if (!resolved) continue;
    if (history.has(resolved.relative)) fail('RULE_03', `history-only file entered startup authority: ${resolved.relative}`);
    if (supersededRoots.some(prefix => resolved.relative.startsWith(prefix))) {
      fail('RULE_03', `superseded root entered startup authority: ${resolved.relative}`);
    }
    const text = fs.readFileSync(resolved.absolute, 'utf8');
    const lines = lineCount(text);
    totalLines += lines;
    if (!Number.isInteger(entry.maxLines) || lines > entry.maxLines) {
      fail('RULE_04', `${resolved.relative} has ${lines} lines; maximum is ${entry.maxLines}`);
    }
    if (!text.includes('context-authority: operations/context-authority.json') && resolved.relative !== 'AGENTS.md') {
      fail('RULE_02', `${resolved.relative} is missing its context-authority marker`);
    }
  }

  if (!Number.isInteger(manifest.maximumStartupLines) || totalLines > manifest.maximumStartupLines) {
    fail('RULE_04', `startup packet has ${totalLines} lines; maximum is ${manifest.maximumStartupLines}`);
  }

  for (const historyPath of history) resolveRequired(historyPath, 'RULE_03');

  const activePath = path.join(root, 'operations/ACTIVE-WORK.md');
  if (fs.existsSync(activePath)) {
    const active = fs.readFileSync(activePath, 'utf8');
    const currentTaskCount = (active.match(/^## Current task$/gm) || []).length;
    if (currentTaskCount !== 1) fail('RULE_05', `ACTIVE-WORK must contain one Current task section; found ${currentTaskCount}`);
    for (const field of ['Task ID', 'Status', 'Owner', 'Updated', 'Goal', 'Acceptance', 'Current step', 'Next action']) {
      if (!new RegExp(`^- \\*\\*${field}:\\*\\*`, 'm').test(active)) fail('RULE_05', `ACTIVE-WORK missing ${field}`);
    }
    const status = active.match(/^- \*\*Status:\*\* (.+)$/m)?.[1]?.trim();
    const allowed = new Set(['CAPTURED', 'DECIDED', 'SPECIFIED', 'BUILDING', 'BUILT LOCALLY', 'VERIFIED LOCALLY', 'DEPLOYED', 'VERIFIED PUBLICLY', 'HOLD', 'BLOCKED', 'PAUSED', 'SUPERSEDED']);
    if (!allowed.has(status)) fail('RULE_05', `ACTIVE-WORK has unsupported status: ${status || 'MISSING'}`);
    if (/^## (Active|Paused) objective/m.test(active)) fail('RULE_05', 'ACTIVE-WORK contains legacy competing objective sections');
  }

  const excludedDirectories = new Set(['.git', 'node_modules', 'operations/archive']);
  const discoveredAgents = [];
  const walk = directory => {
    for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, item.name);
      const relative = path.relative(root, absolute).replaceAll(path.sep, '/');
      if (item.isDirectory()) {
        if (excludedDirectories.has(relative) || excludedDirectories.has(item.name)) continue;
        walk(absolute);
      } else if (item.name === 'AGENTS.md' && relative !== 'AGENTS.md') {
        discoveredAgents.push(relative);
      }
    }
  };
  walk(root);

  const scoped = Array.isArray(manifest.scopedInstructions) ? manifest.scopedInstructions : [];
  const scopedByPath = new Map(scoped.map(entry => [entry.path, entry]));
  for (const relative of discoveredAgents) {
    const entry = scopedByPath.get(relative);
    if (!entry) {
      fail('RULE_06', `nested AGENTS.md is not explicitly scoped: ${relative}`);
      continue;
    }
    if (entry.classification !== 'prototype_only' && entry.classification !== 'archived') {
      fail('RULE_06', `invalid nested instruction classification for ${relative}`);
    }
    if (!relative.startsWith(`${entry.scopeRoot}/`)) fail('RULE_06', `scopeRoot does not own ${relative}`);
    const header = fs.readFileSync(path.join(root, relative), 'utf8').split('\n').slice(0, 12).join('\n');
    if (!header.includes('laidies-scope: prototype_only; authority: local_reproduction_only; overrides_sitewide: false')) {
      fail('RULE_06', `nested instruction lacks the required non-authority header: ${relative}`);
    }
    if (!/Root `AGENTS\.md` and routed current sources win/.test(header)) {
      fail('RULE_06', `nested instruction does not defer to current authority: ${relative}`);
    }
  }
  for (const entry of scoped) {
    if (!discoveredAgents.includes(entry.path)) fail('RULE_06', `scoped instruction path does not exist: ${entry.path}`);
  }

  const configPath = path.join(root, '.codex/config.toml');
  if (!fs.existsSync(configPath)) {
    fail('RULE_07', 'missing .codex/config.toml');
  } else {
    const config = fs.readFileSync(configPath, 'utf8');
    const readToml = key => {
      const match = config.match(new RegExp(`^${key}\\s*=\\s*(.+)$`, 'm'));
      if (!match) return undefined;
      const raw = match[1].trim();
      if (/^".*"$/.test(raw)) return raw.slice(1, -1);
      if (raw === 'true' || raw === 'false') return raw === 'true';
      if (/^-?\d+$/.test(raw)) return Number(raw);
      return raw;
    };
    for (const [key, expected] of Object.entries(manifest.codexDefaults || {})) {
      const actual = readToml(key);
      if (actual !== expected) fail('RULE_07', `.codex/config.toml ${key}=${String(actual)}; expected ${String(expected)}`);
    }
    if (/^multi_agent\s*=/m.test(config)) fail('RULE_07', 'legacy multi_agent key remains; use multi_agent_v2 only');
  }

  const router = fs.existsSync(path.join(root, 'operations/DECISIONS.md'))
    ? fs.readFileSync(path.join(root, 'operations/DECISIONS.md'), 'utf8')
    : '';
  if (/Website\/operations\/voice\//.test(router)) fail('RULE_08', 'decision router references the stranded Website canon path');
  if (!/archived register[\s\S]*not current authority/i.test(router)) fail('RULE_08', 'decision router must fail closed for archive-only decisions');
  for (const routed of router.matchAll(/`((?:operations|docs)\/[^`]+)`/g)) {
    const relative = routed[1];
    if (/[<*>]/.test(relative) || relative.endsWith('/')) {
      fail('RULE_08', `decision router contains a non-exact route: ${relative}`);
      continue;
    }
    if (!fs.existsSync(path.join(root, relative))) fail('RULE_08', `decision route does not resolve: ${relative}`);
  }
}

if (errors.length) {
  console.error('CONTEXT AUTHORITY FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const mode = fixtureMode ? 'FIXTURE' : 'CURRENT';
console.log(`CONTEXT AUTHORITY PASS (${mode})`);
