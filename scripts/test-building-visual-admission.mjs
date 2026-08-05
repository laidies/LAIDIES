#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { validateBuildingVisualAdmission } from './lib/building-visual-admission.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-building-visual-'));
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const write = (relative, body) => {
  const file = path.join(temp, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
  return { path: relative, sha256: sha(file) };
};
const png = width => {
  const bytes = Buffer.alloc(24);
  Buffer.from([0x89, 0x50, 0x4e, 0x47]).copy(bytes, 0);
  bytes.writeUInt32BE(width, 16);
  return bytes;
};

try {
  const candidate = write('fixture.html', '<!doctype html><title>Fixture</title>');
  const asset = { ...write('assets/room.png', png(900)), role: 'library.arrival.environment' };
  const captures = Object.fromEntries([['desktop_1440', 1440], ['mobile_390', 390], ['mobile_320', 320]].map(([id, width]) => [id, {
    ...write(`evidence/${id}.png`, png(width)), candidate_sha256: candidate.sha256, viewport_width: width
  }]));
  const receipt = role => write(`evidence/${role}.md`, `candidate_sha256=${candidate.sha256}\nresult=ACCEPT\n`);
  const record = {
    admission_id: 'fixture-admission-v1', owner_id: 'fixture', status: 'PASS', control_room_result: 'ADMIT',
    candidate, route_artifacts: [candidate], environment_assets: [asset], screenshots: captures,
    roles: {
      information_architecture_judge: { agent_id: 'ia', result: 'ACCEPT', receipt: receipt('ia') },
      product_ux_judge: { agent_id: 'ux', result: 'ACCEPT', receipt: receipt('ux') },
      brand_visual_judge: { agent_id: 'brand', result: 'ACCEPT', receipt: receipt('brand') },
      red_team: { agent_id: 'red', result: 'UNSHAKEN', receipt: receipt('red') },
      claude_opus_5_reviewer: { agent_id: 'opus', model_id: 'claude-opus-5', recommendation: 'ADMIT', receipt: receipt('opus') }
    }
  };
  const recordBinding = write('evidence/admission.json', `${JSON.stringify(record, null, 2)}\n`);
  const product = { id: 'fixture', routes: ['/fixture.html'] };
  const manifest = { owner_id: 'fixture', route: '/fixture.html', environment_assets: [asset.path], visual_experience_admission: { status: 'PASS', admission_id: record.admission_id, record: recordBinding } };
  const registry = { entries: [{ ...asset, status: 'ACTIVE' }] };
  const valid = validateBuildingVisualAdmission({ root: temp, product, manifest, assetRegistry: registry });
  assert.equal(valid.pass, true, valid.errors.join('\n'));

  const expectFail = (label, mutate, pattern) => {
    const copy = structuredClone(record);
    mutate(copy);
    const binding = write(`evidence/${label}.json`, `${JSON.stringify(copy, null, 2)}\n`);
    const result = validateBuildingVisualAdmission({ root: temp, product, manifest: { ...manifest, visual_experience_admission: { ...manifest.visual_experience_admission, record: binding } }, assetRegistry: registry });
    assert.equal(result.pass, false, `${label} unexpectedly passed`);
    assert.match(result.errors.join('\n'), pattern);
  };
  expectFail('stale-candidate', value => { value.candidate.sha256 = '0'.repeat(64); }, /candidate.*SHA-256 is stale/);
  expectFail('stale-route-dependency', value => { value.route_artifacts.push({ path: 'fixture.html', sha256: '0'.repeat(64) }); }, /route_artifacts\[1\].*SHA-256 is stale/);
  expectFail('inactive-asset', value => { value.environment_assets[0].role = 'unknown'; }, /visual role is missing|not exact ACTIVE/);
  expectFail('unmanifested-asset', value => { value.environment_assets[0].path = 'assets/other-room.png'; }, /environment asset absent from the manifest|bound file is missing/);
  expectFail('wrong-width', value => { value.screenshots.mobile_390.viewport_width = 320; }, /viewport_width must be 390/);
  expectFail('capture-candidate-mismatch', value => { value.screenshots.mobile_320.candidate_sha256 = '0'.repeat(64); }, /not bound to current candidate/);
  expectFail('judge-hold', value => { value.roles.brand_visual_judge.result = 'HOLD'; }, /brand_visual_judge did not explicitly ACCEPT/);
  expectFail('red-team-shaken', value => { value.roles.red_team.result = 'SHAKEN'; }, /red team did not return UNSHAKEN/);
  expectFail('red-team-receipt-stale', value => { value.roles.red_team.receipt.sha256 = '0'.repeat(64); }, /red_team\.receipt.*SHA-256 is stale/);
  expectFail('opus-hold', value => { value.roles.claude_opus_5_reviewer.recommendation = 'HOLD'; }, /Claude Opus 5 ADMIT is missing/);
  expectFail('opus-receipt-stale', value => { value.roles.claude_opus_5_reviewer.receipt.sha256 = '0'.repeat(64); }, /claude_opus_5_reviewer\.receipt.*SHA-256 is stale/);
  expectFail('duplicate-role', value => { value.roles.product_ux_judge.agent_id = 'ia'; }, /roles are not distinct/);

  const emptyRegistryPath = path.join(temp, 'empty-registry.json');
  const emptyAssetsPath = path.join(temp, 'empty-assets.json');
  const emptyStewards = path.join(temp, 'stewards');
  fs.mkdirSync(emptyStewards, { recursive: true });
  fs.writeFileSync(emptyRegistryPath, JSON.stringify({ products: [] }));
  fs.writeFileSync(emptyAssetsPath, JSON.stringify({ entries: [] }));
  const zero = spawnSync(process.execPath, [path.join(repo, 'scripts/check-building-environment-contracts.mjs')], {
    cwd: repo, encoding: 'utf8', env: { ...process.env, LAIDIES_PRODUCT_REGISTRY_PATH: emptyRegistryPath, LAIDIES_ASSET_REGISTRY_PATH: emptyAssetsPath, LAIDIES_PRODUCT_STEWARD_ROOT: emptyStewards }
  });
  assert.notEqual(zero.status, 0, 'zero-building registry must fail');
  assert.match(`${zero.stdout}${zero.stderr}`, /Expected exactly 17 registered buildings; found 0/);

  console.log('BUILDING VISUAL ADMISSION TEST PASS');
  console.log('- Valid exact admission passed.');
  console.log('- Stale candidate, manifest/admission asset mismatch, inactive/wrong-role asset, wrong capture binding/width, held judges, shaken/stale red team, missing/stale Opus admission, duplicate roles and zero-building registry all failed closed.');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
