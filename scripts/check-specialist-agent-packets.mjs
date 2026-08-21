#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(process.env.LAIDIES_SPECIALIST_PACKET_ROOT || defaultRoot);
const manifestPath = path.join(root, 'operations/specialist-agents/episode-video-producer.json');
const immutablePaths = {
  agent_profile: '.codex/agents/episode_video_producer.toml',
  skill: '.agents/skills/produce-laidies-episode-video/SKILL.md',
  runtime_reference: '.agents/skills/produce-laidies-episode-video/references/episode-video-runtime.md',
  interface: '.agents/skills/produce-laidies-episode-video/agents/openai.yaml',
};
const errors = [];
let manifest;
try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); }
catch (error) { console.error(`SPECIALIST AGENT PACKET FAIL\n- manifest unreadable: ${error.message}`); process.exit(1); }
if (manifest.schema !== 'laidies.specialist-agent-packet.v1') errors.push('unexpected manifest schema');
if (manifest.id !== 'episode-video-producer' || manifest.status !== 'ACTIVE') errors.push('episode producer identity/status is not ACTIVE');
for (const [role, expectedPath] of Object.entries(immutablePaths)) {
  const binding = manifest.bindings?.[role];
  if (!binding || binding.path !== expectedPath) { errors.push(`${role} must bind immutable path ${expectedPath}`); continue; }
  const absolute = path.join(root, expectedPath);
  if (!fs.existsSync(absolute)) { errors.push(`${role} missing: ${expectedPath}`); continue; }
  const actual = crypto.createHash('sha256').update(fs.readFileSync(absolute)).digest('hex');
  if (actual !== binding.sha256) errors.push(`${role} hash mismatch: ${expectedPath}`);
}
const profile = fs.existsSync(path.join(root, immutablePaths.agent_profile)) ? fs.readFileSync(path.join(root, immutablePaths.agent_profile), 'utf8') : '';
const skill = fs.existsSync(path.join(root, immutablePaths.skill)) ? fs.readFileSync(path.join(root, immutablePaths.skill), 'utf8') : '';
for (const [label, source, required] of [
  ['profile', profile, ['check:rejected-episode-media', '$produce-laidies-episode-video', 'never self-approve']],
  ['skill', skill, ['Repository records outrank remembered filenames', 'Absence of exact authority is `HOLD`', 'Mechanical integrity cannot admit']],
]) for (const phrase of required) if (!source.includes(phrase)) errors.push(`${label} missing required control: ${phrase}`);
const runtimeChecks = new Set(manifest.required_runtime_checks || []);
for (const command of ['npm run check:rejected-episode-media', 'npm run test:episode-cue-scope']) if (!runtimeChecks.has(command)) errors.push(`missing runtime check: ${command}`);
if (errors.length) { console.error(`SPECIALIST AGENT PACKET FAIL\n${errors.map((error) => `- ${error}`).join('\n')}`); process.exit(1); }
console.log('SPECIALIST AGENT PACKET PASS agent=episode-video-producer bindings=4 runtime_checks=2 stale_media=fail_closed');
