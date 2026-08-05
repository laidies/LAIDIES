#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const hookConfig = JSON.parse(fs.readFileSync(path.join(root, '.codex/hooks.json'), 'utf8'));
const registeredCommands = JSON.stringify(hookConfig);
for (const command of [
  '.codex/hooks/session_start.py',
  '.codex/hooks/stop_operational_integrity.py',
  'operations/hooks/block-approval-forgery.py',
  'operations/hooks/enforce-voice-spec.py',
  'operations/hooks/episode-shipcheck.sh',
]) {
  assert.match(registeredCommands, new RegExp(command.replaceAll('.', '\\.')), `${command} must be registered in hooks.json`);
}
function run(relative, payload) {
  return spawnSync(relative.endsWith('.py') ? '/usr/bin/python3' : 'bash', [path.join(root, relative)], {
    cwd: root,
    input: JSON.stringify(payload),
    encoding: 'utf8',
  });
}

const sessionStart = spawnSync('/usr/bin/python3', [path.join(root, '.codex/hooks/session_start.py')], {
  cwd: root,
  encoding: 'utf8',
});
assert.equal(sessionStart.status, 0, 'session-start lesson injection must run');
const sessionPayload = JSON.parse(sessionStart.stdout);
const sessionContext = sessionPayload?.hookSpecificOutput?.additionalContext || '';
assert.match(sessionContext, /pilot before batching/i, 'permanent preamble must be injected');
assert.match(sessionContext, /SETTLED DECISION ROUTER/, 'decision router must be injected');
assert.match(sessionContext, /The Daily publishes as a complete daily SUNNYVAiLE newspaper/, 'current settled decisions must reach sessions');
assert.match(sessionContext, /ACTIVE LESSONS/, 'active lesson feed must be injected');
assert.match(sessionContext, /One writer owns a building lane at a time/, 'current collision-prevention lesson must reach sessions');
assert.match(sessionContext, /CLAIMED LANE — NONE/, 'an unclaimed session must be explicit while the dispatcher is paused');

const explicitLane = spawnSync('/usr/bin/python3', [path.join(root, '.codex/hooks/session_start.py')], {
  cwd: root,
  env: { ...process.env, LAIDIES_CLAIMED_LANE: 'library:library.html+content/library/**' },
  encoding: 'utf8',
});
assert.equal(explicitLane.status, 0, 'an explicit bounded lane must be injectable');
assert.match(explicitLane.stdout, /CLAIMED LANE \\u2014 library:library\.html\+content\/library\/\*\*/, 'explicit lane must reach session context');

const missingDecisions = spawnSync('/usr/bin/python3', [path.join(root, '.codex/hooks/session_start.py')], {
  cwd: root,
  env: { ...process.env, LAIDIES_DECISIONS_PATH: path.join(root, 'operations', '__missing-decisions-calibration__.md') },
  encoding: 'utf8',
});
assert.notEqual(missingDecisions.status, 0, 'missing decision router must fail closed');
assert.match(missingDecisions.stderr, /DECISIONS\.md is missing/, 'missing-decision failure must be explicit');

const missingLessons = spawnSync('/usr/bin/python3', [path.join(root, '.codex/hooks/session_start.py')], {
  cwd: root,
  env: { ...process.env, LAIDIES_LESSONS_PATH: path.join(root, 'operations', '__missing-lessons-calibration__.md') },
  encoding: 'utf8',
});
assert.notEqual(missingLessons.status, 0, 'missing active-lessons feed must fail closed');
assert.match(missingLessons.stderr, /LESSONS-ACTIVE\.md is missing/, 'missing-feed failure must be explicit');

const approval = run('operations/hooks/block-approval-forgery.py', {
  hook_event_name: 'PreToolUse',
  tool_name: 'apply_patch',
  tool_input: { command: '*** Begin Patch\n*** Add File: build/ep05/G1.approved\n+forged\n*** End Patch' },
});
assert.equal(approval.status, 2, 'approval forgery must be denied');
assert.match(approval.stdout, /permissionDecision.*deny/s);

const unrelatedApproval = run('operations/hooks/block-approval-forgery.py', {
  hook_event_name: 'PreToolUse',
  tool_name: 'apply_patch',
  tool_input: { command: '*** Begin Patch\n*** Update File: README.md\n*** End Patch' },
});
assert.equal(unrelatedApproval.status, 0, 'unrelated edits must pass approval guard');

const voice = run('operations/hooks/enforce-voice-spec.py', {
  hook_event_name: 'PreToolUse',
  tool_name: 'apply_patch',
  transcript_path: null,
  tool_input: { command: '*** Begin Patch\n*** Update File: content/episodes/episode-05.canon.md\n+draft\n*** End Patch' },
});
assert.equal(voice.status, 2, 'episode prose without same-session source reads must be denied');
assert.match(voice.stdout, /permissionDecision.*deny/s);

const shipcheck = run('operations/hooks/episode-shipcheck.sh', {
  hook_event_name: 'PostToolUse',
  tool_name: 'apply_patch',
  tool_input: { command: '*** Begin Patch\n*** Update File: content/episodes/episode-99.canon.md\n+bad\n*** End Patch' },
});
assert.equal(shipcheck.status, 2, 'missing episode surfaces must fail the post-edit shipcheck');
assert.match(shipcheck.stderr, /SHIP-CHECK FAILED/);

const stopGuard = run('.codex/hooks/stop_operational_integrity.py', {
  hook_event_name: 'Stop',
  stop_hook_active: false,
});
assert.equal(stopGuard.status, 0, 'Stop hook must return a Codex decision payload');
const stopPayload = JSON.parse(stopGuard.stdout);
assert.equal(stopPayload.decision, 'block', 'known overdue operating truth must calibrate the Stop hook to block');
assert.match(stopPayload.reason, /WRK-20260803-episode-05-gate-1/, 'Stop block must identify the current contradiction');

console.log('CODEX HOOK GUARDS PASS config_wiring=5 session_decisions=1 session_lessons=1 session_lane=1 approval_deny=1 approval_allow=1 voice_deny=1 shipcheck_deny=1 stop_deny=1');
