#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const authorityPath = path.join(root, 'operations/product-stewards/luminairy/artwork-authority-2026-09-05.json');
const profilesPath = path.join(root, 'content/luminairy-profiles.json');
const authority = JSON.parse(fs.readFileSync(authorityPath, 'utf8'));
const profiles = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));

assert.equal(authority.schema, 'laidies.luminairy-artwork-authority.v1');
assert.equal(authority.policy, 'DENY_UNLESS_EXPLICITLY_APPROVED');
assert.ok(Array.isArray(authority.approved) && authority.approved.length > 0);

for (const entry of authority.approved) {
  const absolute = path.join(root, entry.path);
  assert.ok(fs.existsSync(absolute), `approved artwork is missing: ${entry.path}`);
  const sha256 = crypto.createHash('sha256').update(fs.readFileSync(absolute)).digest('hex');
  assert.equal(sha256, entry.sha256, `approved artwork checksum mismatch: ${entry.path}`);
}

for (const retired of authority.archivedFamilies) {
  assert.ok(!fs.existsSync(path.join(root, retired)), `retired artwork family remains active: ${retired}`);
  const archived = path.join(root, authority.archiveRoot, 'retired-asset-families', retired.replace(/^assets\//, ''));
  assert.ok(fs.existsSync(archived), `retired artwork family is missing from archive: ${retired}`);
}

const temporaryRoots = authority.temporaryRuntimeDependencies.map((entry) => {
  assert.equal(entry.referenceUse, 'FORBIDDEN', `temporary dependency is not reference-blocked: ${entry.path}`);
  assert.ok(fs.existsSync(path.join(root, entry.path)), `temporary runtime dependency is missing: ${entry.path}`);
  return `/${entry.path}/`;
});

const allProfiles = Object.values(profiles).flatMap((value) => Array.isArray(value) ? value : []);
const currentTemporary = allProfiles.filter((profile) => temporaryRoots.some((prefix) => String(profile.image || '').startsWith(prefix)));
assert.equal(currentTemporary.length, 43, `expected all 43 signed profiles to remain intact during the archive split; found ${currentTemporary.length}`);

const approvedProfile = allProfiles.find((profile) => profile.id === 'cher-dionne');
assert.ok(approvedProfile, 'Cher + Dionne profile is missing');
assert.notEqual(approvedProfile.image, `/${authority.approved[0].path}`, 'approved V12 was mapped without a renewed signed profile receipt');

console.log('LUMINAiRY ARTWORK BOUNDARY PASS');
console.log(`approved=${authority.approved.length} temporary-runtime-only=${currentTemporary.length} archived-families=${authority.archivedFamilies.length}`);
