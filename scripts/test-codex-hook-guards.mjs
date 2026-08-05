#!/usr/bin/env node

import assert from 'node:assert/strict';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
function run(relative, payload) {
  return spawnSync(relative.endsWith('.py') ? '/usr/bin/python3' : 'bash', [path.join(root, relative)], {
    cwd: root,
    input: JSON.stringify(payload),
    encoding: 'utf8',
  });
}

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

console.log('CODEX HOOK GUARDS PASS approval_deny=1 approval_allow=1 voice_deny=1 shipcheck_deny=1');
