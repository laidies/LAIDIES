#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const hookConfig = JSON.parse(fs.readFileSync(path.join(root, '.codex/hooks.json'), 'utf8'));
const registeredCommands = JSON.stringify(hookConfig);
for (const command of [
  '.codex/hooks/session_start.py',
  '.codex/hooks/stop_operational_integrity.py',
  'operations/hooks/block-approval-forgery.py',
  'operations/hooks/block-handwritten-status.py',
  'operations/hooks/enforce-voice-spec.py',
  'operations/hooks/episode-shipcheck.sh',
  'operations/hooks/library-maker-preflight.py',
]) {
  assert.match(registeredCommands, new RegExp(command.replaceAll('.', '\\.')), `${command} must be registered in hooks.json`);
}
function run(relative, payload, env = {}) {
  return spawnSync(relative.endsWith('.py') ? '/usr/bin/python3' : 'bash', [path.join(root, relative)], {
    cwd: root,
    env: { ...process.env, ...env },
    input: JSON.stringify(payload),
    encoding: 'utf8',
  });
}

const fixtureDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-hook-queue-'));
process.on('exit', () => fs.rmSync(fixtureDirectory, { recursive: true, force: true }));
const regressedLibraryPath = path.join(fixtureDirectory, 'library-regressed.html');
fs.writeFileSync(
  regressedLibraryPath,
  fs.readFileSync(path.join(root, 'library.html'), 'utf8').replace(
    'linear-gradient(145deg,#07142f',
    'linear-gradient(145deg,#ffe1ee'
  )
);

const sessionStart = spawnSync('/usr/bin/python3', [path.join(root, '.codex/hooks/session_start.py')], {
  cwd: root,
  env: process.env,
  encoding: 'utf8',
});
assert.equal(sessionStart.status, 0, 'minimum session context must run');
const sessionPayload = JSON.parse(sessionStart.stdout);
const sessionContext = sessionPayload?.hookSpecificOutput?.additionalContext || '';
assert.match(sessionContext, /LAiDIES MINIMUM CONTEXT PACKET/, 'minimum packet label must be injected');
assert.match(sessionContext, /Do not preload archived registers/, 'retrieval boundary must reach sessions');
assert.match(sessionContext, /CURRENT TASK — CTX-RESET-20260818 \/ VERIFIED LOCALLY/, 'current task must reach sessions');
assert.ok(sessionContext.length < 2000, `session context must stay compact; got ${sessionContext.length} characters`);
assert.doesNotMatch(sessionContext, /STANDING CARD/, 'the old Standing Card must not be preloaded');
assert.match(sessionContext, /WRITE LANE — NONE/, 'an unclaimed write lane must be explicit');

const explicitLane = spawnSync('/usr/bin/python3', [path.join(root, '.codex/hooks/session_start.py')], {
  cwd: root,
  env: { ...process.env, LAIDIES_CLAIMED_LANE: 'library:library.html+content/library/**' },
  encoding: 'utf8',
});
assert.equal(explicitLane.status, 0, 'an explicit bounded lane must be injectable');
assert.match(explicitLane.stdout, /WRITE LANE \\u2014 library:library\.html\+content\/library\/\*\*/, 'explicit lane must reach session context');

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

const handwrittenStatus = run('operations/hooks/block-handwritten-status.py', {
  hook_event_name: 'PreToolUse',
  tool_name: 'apply_patch',
  tool_input: { command: '*** Begin Patch\n*** Update File: operations/runtime/work-current-projection.json\n+  "status": "RUNNING"\n*** End Patch' },
});
assert.equal(handwrittenStatus.status, 2, 'handwritten derived status must be denied');
assert.match(handwrittenStatus.stdout, /permissionDecision.*deny/s);

const generatedStatus = run('operations/hooks/block-handwritten-status.py', {
  hook_event_name: 'PreToolUse',
  tool_name: 'Bash',
  tool_input: { command: 'node scripts/project-work-events.mjs > operations/runtime/work-current-projection.json' },
});
assert.equal(generatedStatus.status, 0, 'the projection generator must remain allowed');

const oneSidedLegacyWork = run('operations/hooks/block-handwritten-status.py', {
  hook_event_name: 'PreToolUse',
  tool_name: 'apply_patch',
  tool_input: { command: '*** Begin Patch\n*** Update File: operations/runtime/work-resolution-loop.json\n+  { "work_id": "WRK-one-sided" }\n*** End Patch' },
});
assert.equal(oneSidedLegacyWork.status, 2, 'a legacy work mutation without its append-only event must be denied');
assert.match(oneSidedLegacyWork.stdout, /permissionDecision.*deny/s);

const pairedLegacyWork = run('operations/hooks/block-handwritten-status.py', {
  hook_event_name: 'PreToolUse',
  tool_name: 'apply_patch',
  tool_input: { command: '*** Begin Patch\n*** Update File: operations/runtime/work-resolution-loop.json\n+  { "work_id": "WRK-paired" }\n*** Update File: operations/runtime/work-events.jsonl\n+  { "event_id": "WKE-paired" }\n*** End Patch' },
});
assert.equal(pairedLegacyWork.status, 0, 'a legacy work mutation paired with its append-only event must remain allowed');

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

const libraryPreflight = run('operations/hooks/library-maker-preflight.py', {
  hook_event_name: 'PostToolUse',
  tool_name: 'apply_patch',
  tool_input: { command: '*** Begin Patch\n*** Update File: library.html\n+repair\n*** End Patch' },
}, { LAIDIES_LIBRARY_SOURCE: regressedLibraryPath });
assert.equal(libraryPreflight.status, 2, 'known Library regressions must block the post-edit preflight');
assert.match(libraryPreflight.stderr, /LIBRARY KNOWN-FAILURE PREFLIGHT FAIL/);

const unrelatedLibraryPreflight = run('operations/hooks/library-maker-preflight.py', {
  hook_event_name: 'PostToolUse',
  tool_name: 'apply_patch',
  tool_input: { command: '*** Begin Patch\n*** Update File: README.md\n+unrelated\n*** End Patch' },
});
assert.equal(unrelatedLibraryPreflight.status, 0, 'unrelated edits must bypass the Library preflight');

const stopGuard = run('.codex/hooks/stop_operational_integrity.py', {
  hook_event_name: 'Stop',
  stop_hook_active: false,
});
assert.equal(stopGuard.status, 0, 'Stop hook must return a Codex decision payload');
const stopPayload = JSON.parse(stopGuard.stdout);
assert.equal(stopPayload.continue, true, 'unrelated portfolio debt must not block the current task at Stop');

const staleProjectionPath = path.join(fixtureDirectory, 'stale-work-projection.json');
fs.writeFileSync(staleProjectionPath, JSON.stringify({ schema_version: 1, items: [] }));
const staleProjection = run('.codex/hooks/stop_operational_integrity.py', {
  hook_event_name: 'Stop',
  stop_hook_active: false,
}, { LAIDIES_WORK_PROJECTION_PATH: staleProjectionPath });
assert.equal(staleProjection.status, 0, 'Stop hook returns a decision payload when the projection is stale');
const staleProjectionPayload = JSON.parse(staleProjection.stdout);
assert.equal(staleProjectionPayload.decision, 'block', 'stale derived work status must block Stop');
assert.match(staleProjectionPayload.reason, /projection is stale/i);

console.log('CODEX HOOK GUARDS PASS config_wiring=7 session_minimum_packet=1 session_retrieval=1 session_compact=1 session_lane=1 approval_deny=1 approval_allow=1 derived_status_deny=1 derived_status_generator_allow=1 legacy_one_sided_deny=1 legacy_paired_allow=1 voice_deny=1 shipcheck_deny=1 library_deny=1 library_allow=1 stop_current_allow=1 stop_stale_projection_deny=1');
