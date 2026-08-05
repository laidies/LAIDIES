#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-public-asset-parity-'));
const inventoryPath = path.join(temporary, 'inventory.json');
const artifactPath = path.join(temporary, 'public');

try {
  const inventory = spawnSync(process.execPath, [
    'operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/inventory-public-assets.mjs',
    inventoryPath,
  ], { cwd: root, encoding: 'utf8' });
  const builder = spawnSync(process.execPath, ['scripts/build-public-site.mjs', artifactPath], {
    cwd: root,
    encoding: 'utf8',
  });

  if (!fs.existsSync(inventoryPath)) throw new Error('inventory did not write its evidence file');
  const manifest = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  const builderReportPath = path.join(artifactPath, 'dependency-report.json');
  if (!fs.existsSync(builderReportPath)) throw new Error('builder did not write its dependency report');
  const builderReport = JSON.parse(fs.readFileSync(builderReportPath, 'utf8'));
  if (process.env.PUBLIC_ASSET_PARITY_CALIBRATION === 'drop-builder-binary') {
    builderReport.binaryAssets = (builderReport.binaryAssets || []).slice(1);
  }
  const inventoryCount = manifest.summary?.prohibited_source_references;
  const builderOutput = `${builder.stdout}${builder.stderr}`;
  const builderMatch = builderOutput.match(/PROHIBITED_SOURCE_REFERENCE:\s*(\d+)/);
  if (!Number.isInteger(inventoryCount)) throw new Error('inventory has no prohibited_source_references count');
  if (inventoryCount > 0 && !builderMatch) throw new Error(`builder did not report PROHIBITED_SOURCE_REFERENCE:\n${builderOutput}`);
  const builderCount = builderMatch ? Number(builderMatch[1]) : 0;
  if (builderCount !== inventoryCount) {
    throw new Error(`builder/inventory prohibited-reference divergence: builder=${builderCount} inventory=${inventoryCount}`);
  }
  const canonicalReferences = (items) => (items || [])
    .map((item) => JSON.stringify([item.path, item.requiredBy, [...(item.reasons || [])].sort()]))
    .sort();
  const inventoryReferences = canonicalReferences(manifest.prohibited_source_references);
  const builderReferences = canonicalReferences(builderReport.prohibitedSourceReferences);
  if (JSON.stringify(builderReferences) !== JSON.stringify(inventoryReferences)) {
    const inventoryOnly = inventoryReferences.filter((item) => !builderReferences.includes(item));
    const builderOnly = builderReferences.filter((item) => !inventoryReferences.includes(item));
    throw new Error(`builder/inventory prohibited-reference set divergence:\ninventory_only=${JSON.stringify(inventoryOnly.slice(0, 20))}\nbuilder_only=${JSON.stringify(builderOnly.slice(0, 20))}`);
  }
  const canonicalMissing = (items) => (items || [])
    .map((item) => JSON.stringify([item.path, item.requiredBy]))
    .sort();
  if (JSON.stringify(canonicalMissing(builderReport.missing)) !== JSON.stringify(canonicalMissing(manifest.missing_dependencies))) {
    throw new Error('builder/inventory missing-dependency set divergence');
  }
  const canonicalBinaryAssets = (items) => (items || [])
    .map((item) => JSON.stringify([item.path, item.sha256, item.bytes]))
    .sort();
  const activeInventoryAssets = manifest.assets.filter((asset) => asset.status === 'ACTIVE');
  const sourceOnlyHolds = manifest.assets.filter((asset) => asset.status === 'UNREGISTERED_DEFAULT_DENY');
  const inventoryAssets = canonicalBinaryAssets(activeInventoryAssets);
  const builderAssets = canonicalBinaryAssets(builderReport.binaryAssets);
  if (JSON.stringify(builderAssets) !== JSON.stringify(inventoryAssets)) {
    const inventoryOnly = inventoryAssets.filter((item) => !builderAssets.includes(item));
    const builderOnly = builderAssets.filter((item) => !inventoryAssets.includes(item));
    throw new Error(`builder/inventory binary set divergence:\ninventory_only=${JSON.stringify(inventoryOnly.slice(0, 20))}\nbuilder_only=${JSON.stringify(builderOnly.slice(0, 20))}`);
  }
  if (manifest.summary?.missing_dependencies !== 0) {
    throw new Error(`inventory has ${manifest.summary?.missing_dependencies} missing dependencies`);
  }
  if (inventoryCount > 0 && (inventory.status === 0 || builder.status === 0)) {
    throw new Error(`prohibited references must fail closed: inventory_status=${inventory.status} builder_status=${builder.status}`);
  }
  if (inventoryCount === 0 && inventory.status !== 0) {
    throw new Error(`clean inventory unexpectedly failed:\n${inventory.stdout}${inventory.stderr}`);
  }
  const defaultDenied = manifest.assets.filter((asset) => asset.status === 'UNREGISTERED_DEFAULT_DENY');
  if (inventoryCount === 0 && builder.status !== 0) {
    throw new Error(`clean public projection unexpectedly failed:\n${builderOutput}`);
  }
  const builderPaths = new Set((builderReport.binaryAssets || []).map((asset) => asset.path));
  const leakedSourceOnlyHolds = sourceOnlyHolds.filter((asset) => builderPaths.has(asset.path));
  if (leakedSourceOnlyHolds.length > 0) {
    throw new Error(`source-only default-deny assets leaked into public output: ${leakedSourceOnlyHolds.map((asset) => asset.path).join(', ')}`);
  }

  console.log(`PUBLIC ASSET BUILDER/INVENTORY PARITY PASS binaries=${inventoryAssets.length} source_only_holds=${sourceOnlyHolds.length} prohibited_references=${inventoryCount} exact_active_set=true missing=0 held_assets_absent=true clean_build=${inventoryCount === 0 && builder.status === 0}`);
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
