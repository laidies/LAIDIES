#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-recovery-events-'));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const runGit = args => {
  const result = spawnSync('git', args, { cwd: repo, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`git ${args.join(' ')} failed: ${result.stderr}`);
  return result.stdout.trim();
};
const write = (relative, body) => {
  const target = path.join(repo, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, body);
};
const commit = message => { runGit(['add', '.']); runGit(['commit', '-qm', message]); return runGit(['rev-parse', 'HEAD']); };
const event = (event_id, type, payload, actor = 'maker') => ({ event_id, work_id: 'WRK-RECOVERY', at: `2026-09-05T12:0${event_id.slice(-1)}:00Z`, type, actor, payload });
try {
  runGit(['init', '-q']); runGit(['config', 'user.email', 'test@example.invalid']); runGit(['config', 'user.name', 'Test']);
  for (const relative of ['scripts/check-artifact-handoff.mjs', 'scripts/project-work-events.mjs']) {
    const target = path.join(repo, relative); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.copyFileSync(path.join(sourceRoot, relative), target);
  }
  fs.mkdirSync(path.join(repo, 'operations/runtime'), { recursive: true });
  fs.copyFileSync(path.join(sourceRoot, 'operations/runtime/artifact-handoff.schema.json'), path.join(repo, 'operations/runtime/artifact-handoff.schema.json'));
  write('artifact.md', Buffer.from([0, 255, 128, 10])); write('brief.md', 'exact brief\n'); write('input.md', 'exact input\n');
  const artifactCommit = commit('artifact bytes');
  const binding = relative => ({ path: relative, sha256: sha(fs.readFileSync(path.join(repo, relative))) });
  const truth = { state: 'COMMITTED', commit: artifactCommit, paths: ['artifact.md', 'brief.md', 'input.md'] };
  const handoffBody = overrides => ({
    task: 'WRK-RECOVERY', outcome: 'recover exact checkpoint', artifact: binding('artifact.md'), brief: binding('brief.md'), inputs: [binding('input.md')],
    forbidden: ['publish'], accept: ['same bytes'], run: ['never automatic'], return: { status: 'PASS' }, budget: { in: 1, out: 1, wall: 1 },
    evidence_time: '2026-09-05T12:00:00Z', locks: [], acceptance_owner: 'judge', next_trigger: 'independent review', authority_truth: { public: false, deploy: false, spend: false, ali_approval: false }, worktree_truth: truth, ...overrides
  });
  const makeHandoff = (name, overrides = {}) => {
    const relative = `operations/runtime/${name}.json`; write(relative, JSON.stringify(handoffBody(overrides), null, 2)); const handoffCommit = commit(name);
    return { path: relative, sha256: sha(fs.readFileSync(path.join(repo, relative))), commit: handoffCommit };
  };
  const good = makeHandoff('handoff');
  const checker = path.join(repo, 'scripts/project-work-events.mjs');
  const eventsFile = path.join(repo, 'events.jsonl');
  const run = (events, extra = {}, args = []) => {
    fs.writeFileSync(eventsFile, `${events.map(item => JSON.stringify(item)).join('\n')}\n`);
    return spawnSync(process.execPath, [checker, ...args], { cwd: repo, encoding: 'utf8', env: { ...process.env, LAIDIES_WORK_EVENTS_PATH: eventsFile, ...extra } });
  };
  const fail = (events, needle) => {
    const result = run(events);
    assert.notEqual(result.status, 0, 'expected failure');
    assert.match(`${result.stdout}${result.stderr}`, new RegExp(needle));
  };
  const admitted = event('E1', 'WORK_ADMITTED', { title: 'Recover', acceptance_owner: 'judge', recovery_contract: 'artifact-handoff.v1' }, 'owner');
  const started = event('E2', 'WORK_STARTED', {});
  const checkpoint = event('E3', 'EVIDENCE_RECORDED', { handoff: good, worktree_truth: truth });
  const waiting = event('E4', 'DEPENDENCY_RECORDED', { status: 'WAITING_EXTERNAL' });
  const resumed = event('E5', 'WORK_STARTED', { resume_from: 'E3' }, 'new-process');
  const resolved = event('E6', 'WORK_RESOLVED', { accepted_checkpoint_event_id: 'E3', worktree_truth: { paths: [...truth.paths].reverse(), commit: truth.commit, state: truth.state } }, 'judge');
  const positive = run([admitted, started, checkpoint, waiting, resumed, resolved]);
  assert.equal(positive.status, 0, positive.stderr); assert.match(positive.stdout, /"status": "RESOLVED"/);

  // A matching actor can record internal completion; it cannot establish authenticated approval.
  assert.equal(JSON.parse(positive.stdout).approval_authority, 'NONE_ACTOR_METADATA_ONLY');
  const metadataOnlyResume = run([admitted, started, checkpoint, waiting], {}, ['--resume', 'WRK-RECOVERY']);
  assert.equal(metadataOnlyResume.status, 0, metadataOnlyResume.stderr);
  assert.equal(JSON.parse(metadataOnlyResume.stdout).approval_authority, 'NONE_ACTOR_METADATA_ONLY');

  const legacyBase = { event_id: 'L0', work_id: 'LEGACY', at: '2026-08-07T12:00:00Z', type: 'WORK_ADMITTED', actor: 'owner', payload: { title: 'Legacy', acceptance_owner: 'judge' } };
  fail([legacyBase, { ...legacyBase, event_id: 'L0', at: '2026-08-07T12:01:00Z', type: 'WORK_STARTED', payload: {} }], 'duplicate event_id');
  fail([{ ...legacyBase, type: 'WORK_STARTED' }], 'before WORK_ADMITTED');
  fail([legacyBase, { ...legacyBase, event_id: 'L2', at: '2026-08-07T11:59:00Z', type: 'WORK_STARTED', payload: {} }], 'moved backwards');
  fail([legacyBase, { ...legacyBase, event_id: 'L2', at: '2026-08-07T12:01:00Z', type: 'WORK_RESOLVED', payload: {} }], 'cannot resolve without evidence');
  const futureBase = { ...legacyBase, event_id: 'F1', work_id: 'FUTURE', at: '2026-09-05T11:00:00Z' };
  const futureEvidence = { ...futureBase, event_id: 'F2', at: '2026-09-05T11:01:00Z', type: 'EVIDENCE_RECORDED', payload: { verdict: 'PASS' } };
  fail([futureBase, futureEvidence], 'missing valid worktree_truth');
  const heldTruth = { state: 'UNCOMMITTED_OWNED', paths: ['candidate.md'], owner: 'maker', reason: 'awaiting judgment', next_trigger: 'review' };
  assert.equal(run([futureBase, { ...futureEvidence, payload: { verdict: 'HOLD', worktree_truth: heldTruth } }]).status, 0);
  fail([futureBase, { ...futureEvidence, payload: { verdict: 'HOLD', worktree_truth: heldTruth } }, { ...futureBase, event_id: 'F3', at: '2026-09-05T11:02:00Z', type: 'WORK_RESOLVED', payload: { worktree_truth: heldTruth } }], 'cannot bind UNCOMMITTED_OWNED');
  const committedLegacy = run([futureBase, { ...futureEvidence, payload: { verdict: 'PASS', worktree_truth: truth } }, { ...futureBase, event_id: 'F3', at: '2026-09-05T11:02:00Z', type: 'WORK_RESOLVED', payload: { worktree_truth: truth } }]);
  assert.equal(committedLegacy.status, 0, committedLegacy.stderr);

  // Compatibility is intentionally opt-in: this captures the old arbitrary-evidence false pass.
  const legacy = run([
    { ...legacyBase, event_id: 'LA', work_id: 'LEGACY-ARBITRARY' },
    { ...legacyBase, event_id: 'LB', work_id: 'LEGACY-ARBITRARY', at: '2026-08-07T12:01:00Z', type: 'EVIDENCE_RECORDED', actor: 'maker', payload: { arbitrary: true } },
    { ...legacyBase, event_id: 'LC', work_id: 'LEGACY-ARBITRARY', at: '2026-08-07T12:02:00Z', type: 'WORK_RESOLVED', actor: 'anyone', payload: {} }
  ]);
  assert.equal(legacy.status, 0, legacy.stderr);
  const writeProjection = run([legacyBase], {}, ['--write']);
  assert.equal(writeProjection.status, 0, writeProjection.stderr); assert.match(writeProjection.stdout, /WORK EVENT PROJECTION WRITTEN/);
  assert.ok(fs.existsSync(path.join(repo, 'operations/runtime/work-current-projection.json')));

  fail([admitted, started, event('E3', 'EVIDENCE_RECORDED', { handoff: { ...good, sha256: '0'.repeat(64) }, worktree_truth: truth })], 'handoff sha256 mismatch');
  const wrongTask = makeHandoff('wrong-task', { task: 'OTHER' });
  fail([admitted, started, event('E3', 'EVIDENCE_RECORDED', { handoff: wrongTask, worktree_truth: truth })], 'task does not match');
  const wrongOwner = makeHandoff('wrong-owner', { acceptance_owner: 'other-judge' });
  fail([admitted, started, event('E3', 'EVIDENCE_RECORDED', { handoff: wrongOwner, worktree_truth: truth })], 'acceptance_owner does not match');
  const emptyTrigger = makeHandoff('empty-trigger', { next_trigger: '' });
  fail([admitted, started, event('E3', 'EVIDENCE_RECORDED', { handoff: emptyTrigger, worktree_truth: truth })], 'next_trigger must be a nonempty bounded string');
  fail([admitted, started, checkpoint, waiting, event('E5', 'WORK_STARTED', { resume_from: 'wrong' })], 'resume_from must equal');
  fail([admitted, started, checkpoint, waiting, event('E5', 'WORK_RESOLVED', { accepted_checkpoint_event_id: 'E3', worktree_truth: truth }, 'judge')], 'cannot resolve from WAITING_EXTERNAL');
  fail([admitted, started, checkpoint, waiting, resumed, event('E6', 'WORK_RESOLVED', { accepted_checkpoint_event_id: 'wrong', worktree_truth: truth }, 'judge')], 'accepted_checkpoint_event_id');
  fail([admitted, started, checkpoint, { ...waiting, event_id: 'E5', type: 'WORK_STOPPED', payload: {} }, { ...resolved, event_id: 'E6' }], 'cannot resolve from STOPPED');
  fail([admitted, started, checkpoint, waiting, resumed, resolved, event('E7', 'WORK_RESOLVED', { accepted_checkpoint_event_id: 'E3', worktree_truth: truth }, 'judge')], 'cannot resolve from RESOLVED');
  const held = makeHandoff('held', { return: { status: 'HOLD' } });
  fail([admitted, started, event('E3', 'EVIDENCE_RECORDED', { handoff: held, worktree_truth: truth }), waiting, event('E5', 'WORK_STARTED', { resume_from: 'E3' }), resolved], 'cannot resolve a HOLD checkpoint');

  const scopedAdmission = { ...admitted, payload: { ...admitted.payload, recovery_scope: { session_id: 'session-recovery', brief: binding('brief.md'), accept: ['same bytes'] } } };
  const scopedWait = { ...waiting, payload: { status: 'WAITING_EXTERNAL', owner: 'existing-cloud-job', reason: 'scheduled run not due', next_trigger: 'independent review', checkpoint_event_id: 'E3' } };
  const scopedGood = [scopedAdmission, started, checkpoint];
  assert.equal(run([...scopedGood, scopedWait, resumed, resolved]).status, 0);
  fail([...scopedGood, waiting], 'bound waiting requires');
  const narrowed = makeHandoff('subsidiary-inbox', { accept: ['private inbox deployed'] });
  fail([scopedAdmission, started, { ...checkpoint, payload: { handoff: narrowed, worktree_truth: truth } }], 'changes admitted brief or acceptance');
  const rebriefed = makeHandoff('substituted-brief', { brief: binding('input.md') });
  fail([scopedAdmission, started, { ...checkpoint, payload: { handoff: rebriefed, worktree_truth: truth } }], 'changes admitted brief or acceptance');
  fail([...scopedGood, { ...admitted, event_id: 'E4', at: waiting.at, work_id: 'OTHER', payload: scopedAdmission.payload }], 'already has an unfinished governing task');
  fail([...scopedGood, { ...waiting, type: 'WORK_STOPPED', actor: 'judge', payload: {} }], 'bound stop requires');
  fail([...scopedGood, { ...scopedWait, payload: { ...scopedWait.payload, checkpoint_event_id: 'old' } }], 'latest checkpoint');
  fail([...scopedGood, { ...scopedWait, payload: { ...scopedWait.payload, next_trigger: 'unrelated inbox' } }], 'exact next_trigger');
  fail([...scopedGood, { ...waiting, type: 'WORK_STOPPED', payload: { reason: 'switch', next_trigger: 'inbox' } }], 'acceptance_owner');
  const packet = JSON.parse(run([...scopedGood, scopedWait], {}, ['--session', 'session-recovery']).stdout);
  assert.equal(packet.stop_allowed, true); assert.equal(packet.objective, 'Recover'); assert.equal(packet.checkpoint, 'E3');
  assert.deepEqual(packet.scope.accept, ['same bytes']);
  assert.equal(JSON.parse(run(scopedGood, {}, ['--session', 'session-recovery']).stdout).stop_allowed, false);
  assert.equal(JSON.parse(run(scopedGood, {}, ['--session', 'unrelated']).stdout).bound, false);
  // Exercise the real Stop hook with a fresh projection: consistency alone used to allow this.
  const hook = '.codex/hooks/stop_operational_integrity.py';
  write(hook, fs.readFileSync(path.join(sourceRoot, hook)));
  const stop = (events, session = 'session-recovery', extraPayload = {}) => {
    const projection = run(events); assert.equal(projection.status, 0, projection.stderr);
    write('operations/runtime/work-current-projection.json', projection.stdout);
    return JSON.parse(spawnSync('/usr/bin/python3', [path.join(repo, hook)], { cwd: os.tmpdir(), input: JSON.stringify({ session_id: session, stop_hook_active: false, ...extraPayload }), encoding: 'utf8', env: { ...process.env, LAIDIES_WORK_EVENTS_PATH: eventsFile } }).stdout);
  };
  assert.equal(stop(scopedGood).decision, 'block', 'fresh ledger cannot hide unfinished governing task');
  assert.equal(stop([...scopedGood, scopedWait]).continue, true, 'explicit external wait may yield');
  assert.equal(stop([...scopedGood, scopedWait, resumed]).decision, 'block', 'resumption restores continuation duty');
  assert.equal(stop([...scopedGood, scopedWait, resumed, resolved]).continue, true);
  assert.equal(stop(scopedGood, 'unrelated').continue, true, 'unrelated session must not be trapped');
  assert.equal(stop(scopedGood, 'session-recovery', { stop_hook_active: true }).continue, true, 'one reminder must not become an infinite loop');
  // Native SessionStart payload, actual Python entrypoint, isolated source bindings.
  const startHook = '.codex/hooks/session_start.py';
  write(startHook, fs.readFileSync(path.join(sourceRoot, startHook)));
  const cardSources = { decisions: 'operations/DECISIONS.md', lessons: 'operations/LESSONS-ACTIVE.md', canon: 'operations/voice/laidies-canon-index.md', agreement: 'operations/CODEX-WORKING-AGREEMENT.md' };
  let card = '# Test standing card\n';
  for (const [label, relative] of Object.entries(cardSources)) { write(relative, label); card += `${label}-sha256: ${binding(relative).sha256}\n`; }
  write('operations/runtime/STANDING-CARD.md', card);
  const startSession = payload => spawnSync('/usr/bin/python3', [path.join(repo, startHook)], { cwd: os.tmpdir(), input: JSON.stringify(payload), encoding: 'utf8', env: { ...process.env, LAIDIES_WORK_EVENTS_PATH: eventsFile, LAIDIES_CLAIMED_LANE: 'test' } });
  run([...scopedGood, scopedWait]);
  const injected = startSession({ session_id: 'session-recovery' });
  assert.equal(injected.status, 0, injected.stderr); assert.match(injected.stdout, /GOVERNING TASK/); assert.match(injected.stdout, /same bytes/);
  assert.notEqual(startSession({ session_id: {} }).status, 0);
  console.log('GOVERNING TASK CALIBRATION PASS narrowed-objective=blocked changed-brief=blocked duplicate-lane=blocked unfinished-stop=blocked external-wait=allowed resume=blocked exact-resolution=allowed unrelated-session=allowed');

  fs.writeFileSync(eventsFile, `${[admitted, started, checkpoint, waiting].map(item => JSON.stringify(item)).join('\n')}\n`);
  const resume = spawnSync(process.execPath, [checker, '--resume', 'WRK-RECOVERY'], { cwd: repo, encoding: 'utf8', env: { ...process.env, LAIDIES_WORK_EVENTS_PATH: eventsFile } });
  assert.equal(resume.status, 0, resume.stderr); assert.match(resume.stdout, /"resume_from": "E3"/);
  assert.ok(Buffer.byteLength(resume.stdout, 'utf8') <= 16 * 1024);
  const oversized = makeHandoff('oversized', { inputs: Array.from({ length: 300 }, () => binding('input.md')) });
  fs.writeFileSync(eventsFile, `${[admitted, started, event('E3', 'EVIDENCE_RECORDED', { handoff: oversized, worktree_truth: truth }), waiting].map(item => JSON.stringify(item)).join('\n')}\n`);
  const tooLarge = spawnSync(process.execPath, [checker, '--resume', 'WRK-RECOVERY'], { cwd: repo, encoding: 'utf8', env: { ...process.env, LAIDIES_WORK_EVENTS_PATH: eventsFile } });
  assert.notEqual(tooLarge.status, 0); assert.match(tooLarge.stderr, /resume packet exceeds/);
  fs.writeFileSync(eventsFile, `${[admitted, started, checkpoint, waiting].map(item => JSON.stringify(item)).join('\n')}\n`);
  fs.writeFileSync(path.join(repo, 'input.md'), 'changed input\n');
  const changed = spawnSync(process.execPath, [checker, '--resume', 'WRK-RECOVERY'], { cwd: repo, encoding: 'utf8', env: { ...process.env, LAIDIES_WORK_EVENTS_PATH: eventsFile } });
  assert.notEqual(changed.status, 0); assert.match(changed.stderr, /current recovery inputs changed/);
  console.log('WORK EVENT RECOVERY CALIBRATION PASS legacy_arbitrary_evidence_allowed=1 stale_handoff=blocked wrong_work_owner=blocked wrong_resume_acceptance=blocked hold_completion=blocked changed_input_resume=blocked waiting_resume_resolution=allowed');
} finally {
  fs.rmSync(repo, { recursive: true, force: true });
}
