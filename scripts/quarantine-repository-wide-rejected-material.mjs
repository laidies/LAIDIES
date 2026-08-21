#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(process.argv[2] || repo);
const destination = path.resolve(process.argv[3] || path.join(repo, 'assets/rejected/repository-wide-20260820'));
const apply = process.argv.includes('--apply');
const verify = process.argv.includes('--verify');
const importManifest = process.argv.includes('--import-manifest');
if (source === '/' || destination === '/' || source === destination || (destination.startsWith(`${source}${path.sep}`) && source !== repo)) throw new Error('unsafe source/destination');

function sha256(filename) { return crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex'); }
function walk(absolute) {
  if (!fs.existsSync(absolute)) return [];
  if (fs.statSync(absolute).isFile()) return [absolute];
  return fs.readdirSync(absolute).flatMap((name) => walk(path.join(absolute, name)));
}

if (importManifest) {
  const external = JSON.parse(fs.readFileSync(path.join(destination, 'manifest.json'), 'utf8'));
  const imported = path.join(repo, 'operations/quarantine/repository-wide-source-checkout-20260820.json');
  fs.writeFileSync(imported, `${JSON.stringify(external, null, 2)}\n`);
  const registryPath = path.join(repo, 'operations/assets/active-asset-registry.json');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  registry.retired_paths = [...new Set([...(registry.retired_paths || []), ...external.records.map((row) => row.original_path)])].sort();
  fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(`REPOSITORY QUARANTINE IMPORT PASS files=${external.totals.files} bytes=${external.totals.bytes}`);
  process.exit(0);
}

if (verify) {
  const manifest = JSON.parse(fs.readFileSync(path.join(destination, 'manifest.json'), 'utf8'));
  const failures = [];
  for (const row of manifest.records || []) {
    const target = path.join(destination, row.original_path);
    if (!fs.existsSync(target)) failures.push(`missing ${row.original_path}`);
    else if (sha256(target) !== row.sha256) failures.push(`hash mismatch ${row.original_path}`);
    if (fs.existsSync(path.join(source, row.original_path))) failures.push(`original returned ${row.original_path}`);
  }
  if (failures.length) { console.error(`REPOSITORY QUARANTINE VERIFY FAIL\n${failures.map((x) => `- ${x}`).join('\n')}`); process.exit(1); }
  console.log(`REPOSITORY QUARANTINE VERIFY PASS files=${manifest.totals.files} bytes=${manifest.totals.bytes}`);
  process.exit(0);
}

const deny = JSON.parse(fs.readFileSync(path.join(repo, 'operations/quarantine/repository-wide-denylist-20260820.json'), 'utf8'));
const registryPath = path.join(source, 'operations/assets/active-asset-registry.json');
const registry = fs.existsSync(registryPath) ? JSON.parse(fs.readFileSync(registryPath, 'utf8')) : { entries: [] };
const active = new Set((registry.entries || []).filter((row) => row.status === 'ACTIVE' && row.path).map((row) => row.path));
const files = [...new Set(deny.explicit_paths.flatMap((relative) => walk(path.join(source, relative)).map((absolute) => path.relative(source, absolute))))].sort();
const conflicts = files.filter((relative) => active.has(relative));
if (conflicts.length) throw new Error(`ACTIVE conflicts:\n${conflicts.join('\n')}`);
const records = files.map((relative) => ({ original_path: relative, bytes: fs.statSync(path.join(source, relative)).size, sha256: sha256(path.join(source, relative)) }));
const manifest = {
  schema: 'laidies.repository-quarantine.v1', created: new Date().toISOString(), source_root: source,
  destination_root: destination, applied: apply, records,
  totals: { files: records.length, bytes: records.reduce((sum, row) => sum + row.bytes, 0) },
};
if (!apply) { console.log(JSON.stringify(manifest, null, 2)); process.exit(0); }
fs.mkdirSync(destination, { recursive: true });
for (const row of records) {
  const from = path.join(source, row.original_path); const to = path.join(destination, row.original_path);
  fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to);
  if (sha256(to) !== row.sha256) throw new Error(`copy verification failed ${row.original_path}`);
}
for (const row of records) fs.unlinkSync(path.join(source, row.original_path));
if (source === repo) {
  const localRegistryPath = path.join(repo, 'operations/assets/active-asset-registry.json');
  const localRegistry = JSON.parse(fs.readFileSync(localRegistryPath, 'utf8'));
  localRegistry.retired_paths = [...new Set([...(localRegistry.retired_paths || []), ...records.map((row) => row.original_path)])].sort();
  fs.writeFileSync(localRegistryPath, `${JSON.stringify(localRegistry, null, 2)}\n`);
}
fs.writeFileSync(path.join(destination, 'manifest.json'), `${JSON.stringify({ ...manifest, applied: true }, null, 2)}\n`);
console.log(`REPOSITORY QUARANTINE COMPLETE files=${records.length} bytes=${manifest.totals.bytes}`);
