#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const rootIndex = process.argv.indexOf('--root');
const root = rootIndex >= 0 ? path.resolve(process.argv[rootIndex + 1]) : path.resolve(import.meta.dirname, '..');
const deny = JSON.parse(fs.readFileSync(path.join(root, 'operations/quarantine/repository-wide-denylist-20260820.json'), 'utf8'));
const registry = JSON.parse(fs.readFileSync(path.join(root, 'operations/assets/active-asset-registry.json'), 'utf8'));
const branchManifestPath = path.join(root, 'operations/quarantine/repository-wide-branch-20260820.json');
const sourceManifestPath = path.join(root, 'operations/quarantine/repository-wide-source-checkout-20260820.json');
const failures = [];
const sha256 = (filename) => crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
const active = new Set((registry.entries || []).filter((row) => row.status === 'ACTIVE' && row.path).map((row) => row.path));
const retired = new Set(registry.retired_paths || []);
const rejectedLibrary = JSON.parse(fs.readFileSync(path.join(root, 'content/library-books/rejected-artifacts.json'), 'utf8'));
const libraryAdmission = JSON.parse(fs.readFileSync(path.join(root, 'content/library-books/admission-manifest.json'), 'utf8'));
const openingProgram = JSON.parse(fs.readFileSync(path.join(root, 'operations/launch/opening-day-whole-town-program-2026-07-31.json'), 'utf8'));
const rejectedLibraryShas = new Set((rejectedLibrary.artifacts || []).map((row) => row.artifact_sha256));
const sourceMineIds = new Set();
for (const row of libraryAdmission.books || []) {
  if (!rejectedLibraryShas.has(row.artifact_sha256)) continue;
  if (row.status !== 'source-mine-only') failures.push(`${row.book_id}: rejected Library artifact remains in admission state ${row.status}`);
  sourceMineIds.add(row.book_id);
}
for (const id of openingProgram.library_opening_book_ids || []) {
  if (sourceMineIds.has(id)) failures.push(`${id}: source-mine-only rejected Library identity remains in opening-day set`);
}

for (const rejection of deny.rejected_consumer_sha256 || []) {
  for (const entry of registry.entries || []) {
    if (entry.status === 'ACTIVE' && JSON.stringify(entry).includes(rejection.sha256)) failures.push(`${entry.role}: ACTIVE authority binds rejected ${rejection.surface} SHA ${rejection.sha256}`);
  }
}
for (const manifestPath of [branchManifestPath, sourceManifestPath]) {
  if (!fs.existsSync(manifestPath)) continue;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.schema !== 'laidies.repository-quarantine.v1') failures.push(`${path.basename(manifestPath)} schema mismatch`);
  for (const row of manifest.records || []) {
    if (!retired.has(row.original_path)) failures.push(`quarantined path missing retired denial: ${row.original_path}`);
    if (active.has(row.original_path)) failures.push(`quarantined path remains ACTIVE: ${row.original_path}`);
    if (manifestPath === branchManifestPath) {
      const quarantined = path.join(root, 'assets/rejected/repository-wide-20260820', row.original_path);
      if (!fs.existsSync(quarantined)) failures.push(`branch quarantine missing: ${row.original_path}`);
      else if (sha256(quarantined) !== row.sha256) failures.push(`branch quarantine hash mismatch: ${row.original_path}`);
      if (fs.existsSync(path.join(root, row.original_path))) failures.push(`branch original returned: ${row.original_path}`);
    }
  }
}
function containsFiles(absolute) {
  if (!fs.existsSync(absolute)) return false;
  if (fs.statSync(absolute).isFile()) return true;
  return fs.readdirSync(absolute).some((name) => containsFiles(path.join(absolute, name)));
}
for (const relative of deny.explicit_paths || []) {
  const absolute = path.join(root, relative);
  if (containsFiles(absolute)) failures.push(`denylisted repository path remains: ${relative}`);
}
if (failures.length) { console.error(`REPOSITORY HYGIENE FAIL\n${failures.map((x) => `- ${x}`).join('\n')}`); process.exit(1); }
console.log(`REPOSITORY HYGIENE PASS rejected_consumer_bindings=0 active_quarantine_conflicts=0`);
