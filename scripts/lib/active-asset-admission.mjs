import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const SHA256 = /^[a-f0-9]{64}$/i;
const BLOCKED_PATH = /(?:^|\/)(?:_superseded|retired|rejected)(?:\/|$)|(?:^|[-_.])candidate(?:[-_.]|$)/i;

function normalizedPath(value, label) {
  if (typeof value !== 'string' || !value || value.startsWith('/') || value.includes('\\')) {
    throw new Error(`${label} must be a non-empty repository-relative path`);
  }
  const normalized = path.posix.normalize(value);
  if (normalized === '.' || normalized === '..' || normalized.startsWith('../')) {
    throw new Error(`${label} escapes the repository root`);
  }
  return normalized;
}

function fileHash(filename) {
  return crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
}

/**
 * Compile the narrow, checksum-bound authority used by the release builder.
 * A file is admitted only by an ACTIVE exact entry or an ACTIVE dynamic-family
 * member. The family mechanism is deliberately an enumerated checksum list;
 * a directory/prefix is never an allow-list by itself.
 */
export function compileActiveAssetRegistry(registry) {
  if (!registry || registry.schema !== 'laidies.active-assets.v1' || registry.default_policy !== 'DENY') {
    throw new Error('asset registry must declare laidies.active-assets.v1 with default_policy DENY');
  }

  const exact = new Map();
  const blocked = new Set();
  const add = (assetPath, entry, label) => {
    const normalized = normalizedPath(assetPath, label);
    if (exact.has(normalized)) throw new Error(`duplicate asset authority for ${normalized}`);
    exact.set(normalized, entry);
  };

  if (!Array.isArray(registry.entries)) throw new Error('asset registry entries must be an array');
  for (const entry of registry.entries) {
    if (!entry || typeof entry !== 'object' || typeof entry.status !== 'string') {
      throw new Error('asset registry entry has no status');
    }
    if (!entry.path) continue; // An unresolved conceptual role cannot admit a file.
    const normalized = normalizedPath(entry.path, `asset registry entry ${entry.role || '(unnamed)'}`);
    if (entry.status !== 'ACTIVE') {
      blocked.add(normalized);
      continue;
    }
    if (!SHA256.test(entry.sha256 || '')) {
      throw new Error(`ACTIVE asset ${entry.role || normalized} has no valid sha256`);
    }
    add(normalized, { ...entry, path: normalized }, `asset registry entry ${entry.role || '(unnamed)'}`);
  }

  if (!Array.isArray(registry.retired_paths || [])) throw new Error('asset registry retired_paths must be an array');
  for (const assetPath of registry.retired_paths || []) blocked.add(normalizedPath(assetPath, 'retired asset path'));

  if (!Array.isArray(registry.dynamic_families || [])) throw new Error('asset registry dynamic_families must be an array');
  for (const family of registry.dynamic_families || []) {
    if (!family || family.status !== 'ACTIVE' || !family.path || !Array.isArray(family.members) || family.members.length === 0) {
      throw new Error('dynamic asset family must be ACTIVE with a path and explicit members');
    }
    const root = normalizedPath(family.path, `dynamic family ${family.role || '(unnamed)'}`);
    for (const member of family.members) {
      if (!member || !SHA256.test(member.sha256 || '')) {
        throw new Error(`dynamic family ${family.role || root} member has no valid sha256`);
      }
      const memberPath = normalizedPath(member.path, `dynamic family ${family.role || root} member`);
      const assetPath = normalizedPath(path.posix.join(root, memberPath), `dynamic family ${family.role || root} member`);
      if (!assetPath.startsWith(`${root}/`)) throw new Error(`dynamic family ${family.role || root} member escapes its family`);
      add(assetPath, { ...family, ...member, path: assetPath, dynamic_family: family.role || root }, `dynamic family ${family.role || root}`);
    }
  }

  return { exact, blocked };
}

export function assertActiveAsset({ relativePath, absolutePath, registry }) {
  const relative = normalizedPath(relativePath, 'public asset path');
  if (BLOCKED_PATH.test(relative)) throw new Error(`public asset path is candidate/retired/rejected: ${relative}`);
  // Revocation wins over an older ACTIVE entry or dynamic-family membership.
  if (registry.blocked.has(relative)) throw new Error(`public asset has non-ACTIVE status: ${relative}`);
  const authority = registry.exact.get(relative);
  if (!authority) {
    throw new Error(`public asset is not registered ACTIVE: ${relative}`);
  }
  const actual = fileHash(absolutePath);
  if (actual !== authority.sha256) throw new Error(`public asset checksum mismatch: ${relative}`);
  return authority;
}
