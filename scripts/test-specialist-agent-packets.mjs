#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checker = path.join(root, 'scripts/check-specialist-agent-packets.mjs');
const paths = ['operations/specialist-agents/episode-video-producer.json', '.codex/agents/episode_video_producer.toml', '.agents/skills/produce-laidies-episode-video/SKILL.md', '.agents/skills/produce-laidies-episode-video/references/episode-video-runtime.md', '.agents/skills/produce-laidies-episode-video/agents/openai.yaml'];
function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-specialist-agent-'));
  for (const relative of paths) { fs.mkdirSync(path.dirname(path.join(dir, relative)), { recursive: true }); fs.copyFileSync(path.join(root, relative), path.join(dir, relative)); }
  return dir;
}
function run(dir) { return spawnSync(process.execPath, [checker], { env: { ...process.env, LAIDIES_SPECIALIST_PACKET_ROOT: dir }, encoding: 'utf8' }); }
const valid = fixture();
assert.equal(run(valid).status, 0, 'valid packet must pass');
const tampered = fixture();
fs.appendFileSync(path.join(tampered, '.codex/agents/episode_video_producer.toml'), '\n# stale override\n');
assert.notEqual(run(tampered).status, 0, 'profile tampering must fail');
const rebound = fixture();
const manifestPath = path.join(rebound, paths[0]);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest.bindings.skill.path = '.agents/skills/another-short-file/SKILL.md';
fs.mkdirSync(path.dirname(path.join(rebound, manifest.bindings.skill.path)), { recursive: true });
fs.copyFileSync(path.join(rebound, paths[2]), path.join(rebound, manifest.bindings.skill.path));
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
assert.notEqual(run(rebound).status, 0, 'role-to-path rebinding must fail');
console.log('SPECIALIST AGENT PACKET CALIBRATION PASS valid=passed profile_tamper=failed role_rebind=failed');
