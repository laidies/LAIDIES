#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { readCommittedHandoff, validateArtifactHandoff } from './check-artifact-handoff.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const eventsPath = process.env.LAIDIES_WORK_EVENTS_PATH || path.join(root, 'operations/runtime/work-events.jsonl');
const allowed = new Set(['WORK_ADMITTED', 'WORK_STARTED', 'EVIDENCE_RECORDED', 'DEPENDENCY_RECORDED', 'WORK_RESOLVED', 'WORK_STOPPED', 'ARTIFACT_REVIEWED', 'DEFECT_RECORDED', 'DECISION_READY', 'DECISION_RECORDED', 'PUBLICLY_VERIFIED', 'CONTEXT_RECORDED', 'METRICS_COVERAGE_DECLARED']);
const recoveryContract = 'artifact-handoff.v1';
const committedStates = new Set(['COMMITTED', 'PUSHED', 'DEPLOYED', 'VERIFIED_PUBLICLY']);
const worktreeStates = new Set(['NO_REPOSITORY_MUTATION', 'UNCOMMITTED_OWNED', ...committedStates]);
const worktreeTruthCutoff = Date.parse(process.env.LAIDIES_WORKTREE_TRUTH_CUTOFF || '2026-08-08T11:15:00-07:00');
const truthRequiredTypes = new Set(['EVIDENCE_RECORDED', 'ARTIFACT_REVIEWED', 'WORK_RESOLVED', 'PUBLICLY_VERIFIED']);
const terminalTruthTypes = new Set(['WORK_RESOLVED', 'PUBLICLY_VERIFIED']);
const git = args => spawnSync('git', args, { cwd: root, encoding: 'utf8' });
const sameTruth = (left, right) => left?.state === right?.state && left?.commit === right?.commit && Array.isArray(left?.paths) && Array.isArray(right?.paths) && [...left.paths].sort().join('\n') === [...right.paths].sort().join('\n');

function verifyWorktreeTruth(event, lineNumber) {
  if (!truthRequiredTypes.has(event.type) || Date.parse(event.at) < worktreeTruthCutoff) return;
  const truth = event.payload?.worktree_truth;
  if (!truth || !worktreeStates.has(truth.state)) throw new Error(`line ${lineNumber} ${event.type} missing valid worktree_truth`);
  if (!Array.isArray(truth.paths)) throw new Error(`line ${lineNumber} worktree_truth.paths must be an array`);
  if (truth.state === 'NO_REPOSITORY_MUTATION') {
    if (truth.paths.length || truth.commit) throw new Error(`line ${lineNumber} NO_REPOSITORY_MUTATION cannot name paths or commit`);
    return;
  }
  if (truth.state === 'UNCOMMITTED_OWNED') {
    if (terminalTruthTypes.has(event.type)) throw new Error(`line ${lineNumber} ${event.type} cannot bind UNCOMMITTED_OWNED work`);
    for (const key of ['owner', 'reason', 'next_trigger']) if (!truth[key]) throw new Error(`line ${lineNumber} UNCOMMITTED_OWNED missing ${key}`);
    if (!/HOLD|BLOCK/i.test(String(event.payload.verdict || event.payload.status || ''))) throw new Error(`line ${lineNumber} UNCOMMITTED_OWNED evidence must remain HOLD or BLOCKED`);
    return;
  }
  if (!truth.commit || !truth.paths.length) throw new Error(`line ${lineNumber} ${truth.state} requires commit and paths`);
  if (git(['cat-file', '-e', `${truth.commit}^{commit}`]).status !== 0) throw new Error(`line ${lineNumber} worktree_truth commit does not resolve: ${truth.commit}`);
  const changed = new Set(git(['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', truth.commit]).stdout.split(/\r?\n/).filter(Boolean));
  for (const item of truth.paths) if (typeof item !== 'string' || path.isAbsolute(item) || item.startsWith('../') || !changed.has(item)) throw new Error(`line ${lineNumber} worktree_truth path is not in commit ${truth.commit}: ${item}`);
}

function checkpointFor(event, item, lineNumber) {
  const tuple = event.payload?.handoff;
  let handoff;
  try { handoff = readCommittedHandoff(tuple, { root }); } catch (error) { throw new Error(`line ${lineNumber} invalid recovery handoff: ${error.message}`); }
  if (item.recovery_scope && (handoff.brief?.path !== item.recovery_scope.brief.path || handoff.brief?.sha256 !== item.recovery_scope.brief.sha256 || JSON.stringify(handoff.accept) !== JSON.stringify(item.recovery_scope.accept))) throw new Error(`${event.work_id} checkpoint changes admitted brief or acceptance criteria; a subsidiary milestone cannot replace the objective`);
  if (handoff.task !== event.work_id) throw new Error(`line ${lineNumber} handoff task does not match work_id`);
  if (handoff.acceptance_owner !== item.acceptance_owner) throw new Error(`line ${lineNumber} handoff acceptance_owner does not match admitted owner`);
  if (!committedStates.has(handoff.worktree_truth?.state)) throw new Error(`line ${lineNumber} recovery handoff requires committed worktree_truth`);
  if (typeof handoff.next_trigger !== 'string' || !handoff.next_trigger.trim() || Buffer.byteLength(handoff.next_trigger, 'utf8') > 1024) throw new Error(`line ${lineNumber} recovery handoff next_trigger must be a nonempty bounded string`);
  if (git(['merge-base', '--is-ancestor', handoff.worktree_truth.commit, tuple.commit]).status !== 0) throw new Error(`line ${lineNumber} artifact commit must precede handoff commit`);
  return { event_id: event.event_id, handoff: tuple, artifact: handoff.artifact, brief: handoff.brief, inputs: handoff.inputs, next_trigger: handoff.next_trigger, return_status: handoff.return.status, worktree_truth: handoff.worktree_truth, acceptance_owner: handoff.acceptance_owner };
}

export function projectWorkEvents(file = eventsPath) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
  const seenEvents = new Set(); const work = new Map(); let priorTime = '';
  for (const [index, line] of lines.entries()) {
    let event; try { event = JSON.parse(line); } catch { throw new Error(`line ${index + 1} is not valid JSON`); }
    for (const key of ['event_id', 'work_id', 'at', 'type', 'actor', 'payload']) if (event[key] === undefined) throw new Error(`line ${index + 1} missing ${key}`);
    if (seenEvents.has(event.event_id)) throw new Error(`duplicate event_id ${event.event_id}`);
    if (!allowed.has(event.type)) throw new Error(`unknown event type ${event.type}`);
    if (Number.isNaN(Date.parse(event.at))) throw new Error(`invalid event time ${event.at}`);
    if (priorTime && Date.parse(event.at) < Date.parse(priorTime)) throw new Error(`event time moved backwards at ${event.event_id}`);
    verifyWorktreeTruth(event, index + 1);
    seenEvents.add(event.event_id); priorTime = event.at;
    const item = work.get(event.work_id) || { work_id: event.work_id, status: 'UNADMITTED', title: null, work_class: null, lane_mode: null, acceptance_owner: null, admitted_at: null, started_at: null, resolved_at: null, last_event_at: null, evidence: [], dependencies: [], metric_events: [], recovery_contract: null, checkpoint: null };
    if (event.type !== 'WORK_ADMITTED' && item.status === 'UNADMITTED') throw new Error(`${event.work_id} has ${event.type} before WORK_ADMITTED`);
    if (event.type === 'WORK_ADMITTED') {
      if (item.status !== 'UNADMITTED') throw new Error(`${event.work_id} admitted more than once`);
      const contract = event.payload.recovery_contract;
      if (contract && contract !== recoveryContract) throw new Error(`line ${index + 1} unknown recovery_contract: ${contract}`);
      if (event.payload.recovery_scope) {
        const scope = event.payload.recovery_scope;
        if (contract !== recoveryContract || !/^[a-zA-Z0-9-]{1,100}$/.test(scope.session_id || '') || !scope.brief?.path || !/^[a-f0-9]{64}$/.test(scope.brief?.sha256 || '') || !Array.isArray(scope.accept) || !scope.accept.length || !scope.accept.every(v => typeof v === 'string' && v.trim())) throw new Error('recovery_scope requires recovery contract, session_id, brief binding and acceptance criteria');
        if ([...work.values()].some(other => other.recovery_scope?.session_id === scope.session_id && !['RESOLVED', 'STOPPED'].includes(other.status))) throw new Error('session already has an unfinished governing task');
        item.recovery_scope = scope;
      }
      item.status = 'ADMITTED'; item.title = event.payload.title; item.work_class = event.payload.work_class || null; item.lane_mode = event.payload.lane_mode || null; item.acceptance_owner = event.payload.acceptance_owner; item.admitted_at = event.at; item.recovery_contract = contract || null;
    } else if (event.type === 'WORK_STARTED') {
      if (!['ADMITTED', 'WAITING_EXTERNAL', 'IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY'].includes(item.status)) throw new Error(`${event.work_id} cannot start from ${item.status}`);
      if ((item.status === 'WAITING_EXTERNAL' || item.status === 'IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY') && item.recovery_contract === recoveryContract && event.payload.resume_from !== item.checkpoint?.event_id) throw new Error(`${event.work_id} resume_from must equal latest checkpoint event_id`);
      item.status = 'IN_PROGRESS'; item.started_at = event.at;
    } else if (event.type === 'EVIDENCE_RECORDED') {
      if (item.status === 'RESOLVED' || item.status === 'STOPPED') throw new Error(`${event.work_id} received evidence after terminal state`);
      if (item.recovery_contract === recoveryContract) item.checkpoint = checkpointFor(event, item, index + 1);
      item.evidence.push(event.payload);
    } else if (event.type === 'DEPENDENCY_RECORDED') {
      if (item.status === 'RESOLVED' || item.status === 'STOPPED') throw new Error(`${event.work_id} received dependency after terminal state`);
      item.dependencies.push(event.payload);
      if (event.payload.status === 'WAITING_EXTERNAL') {
        if (item.recovery_scope && !['owner', 'reason', 'next_trigger'].every(key => typeof event.payload[key] === 'string' && event.payload[key].trim())) throw new Error('bound waiting requires owner, reason and next_trigger');
        if (item.recovery_contract === recoveryContract && !item.checkpoint) throw new Error(`${event.work_id} cannot wait without a recovery checkpoint`);
        if (item.recovery_scope && (event.payload.checkpoint_event_id !== item.checkpoint.event_id || event.payload.next_trigger !== item.checkpoint.next_trigger)) throw new Error('bound waiting must cite latest checkpoint and its exact next_trigger');
        item.status = Array.isArray(event.payload.does_not_block) && event.payload.does_not_block.length ? 'IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY' : 'WAITING_EXTERNAL';
      }
    } else if (event.type === 'WORK_RESOLVED') {
      if (!item.evidence.length) throw new Error(`${event.work_id} cannot resolve without evidence`);
      if (item.recovery_contract === recoveryContract) {
        if (!['IN_PROGRESS', 'IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY'].includes(item.status)) throw new Error(`${event.work_id} cannot resolve from ${item.status}`);
        if (!item.checkpoint || event.payload.accepted_checkpoint_event_id !== item.checkpoint.event_id) throw new Error(`${event.work_id} accepted_checkpoint_event_id must equal latest checkpoint`);
        if (item.checkpoint.return_status !== 'PASS') throw new Error(`${event.work_id} cannot resolve a ${item.checkpoint.return_status} checkpoint`);
        if (event.actor !== item.acceptance_owner) throw new Error(`${event.work_id} resolution actor must equal acceptance_owner`);
        if (!sameTruth(event.payload.worktree_truth, item.checkpoint.worktree_truth)) throw new Error(`${event.work_id} resolution worktree_truth must match checkpoint`);
      }
      item.status = 'RESOLVED'; item.resolved_at = event.at;
    } else if (event.type === 'WORK_STOPPED') {
      if (item.recovery_scope && event.actor !== item.acceptance_owner) throw new Error('bound stop must be recorded by acceptance_owner; actor metadata is not authenticated approval');
      if (item.recovery_scope && !['reason', 'next_trigger'].every(key => typeof event.payload[key] === 'string' && event.payload[key].trim())) throw new Error('bound stop requires reason and next_trigger; it is not completion');
      item.status = 'STOPPED';
    }
    else item.metric_events.push({ type: event.type, at: event.at, payload: event.payload });
    item.last_event_at = event.at; item.last_event_id = event.event_id; work.set(event.work_id, item);
  }
  return { schema_version: 1, authority: 'PILOT_PROJECTION_ONLY', approval_authority: 'NONE_ACTOR_METADATA_ONLY', source: path.relative(root, file), rule: 'Status is derived from append-only events and must not be hand-edited.', items: [...work.values()] };
}

function resumePacket(workId) {
  const item = projectWorkEvents().items.find(candidate => candidate.work_id === workId);
  if (!item) throw new Error(`unknown work_id: ${workId}`);
  if (item.status !== 'WAITING_EXTERNAL' && item.status !== 'IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY') throw new Error(`${workId} is not waiting for recovery`);
  if (item.recovery_contract !== recoveryContract || !item.checkpoint) throw new Error(`${workId} has no artifact-handoff recovery checkpoint`);
  const handoff = readCommittedHandoff(item.checkpoint.handoff, { root });
  const current = validateArtifactHandoff(handoff, { root });
  if (current.errors.length) throw new Error(`current recovery inputs changed: ${current.errors.join('; ')}`);
  if (handoff.task !== item.work_id || handoff.acceptance_owner !== item.acceptance_owner) throw new Error('current recovery owner/work does not match admitted checkpoint');
  const packet = { approval_authority: 'NONE_ACTOR_METADATA_ONLY', work_id: item.work_id, resume_from: item.checkpoint.event_id, next_trigger: item.checkpoint.next_trigger, acceptance_owner: item.acceptance_owner, handoff: item.checkpoint.handoff, artifact: handoff.artifact, brief: handoff.brief, inputs: handoff.inputs, limitation: 'Verified identity and bytes only; this packet does not execute handoff.run or prove quality, approval or publication.' };
  if (Buffer.byteLength(JSON.stringify(packet), 'utf8') > 16 * 1024) throw new Error('resume packet exceeds 16384 UTF-8 bytes');
  return packet;
}

export function sessionWorkPacket(sessionId, projection = projectWorkEvents()) {
  const matches = projection.items.filter(item => item.recovery_scope?.session_id === sessionId);
  const active = matches.filter(item => !['RESOLVED', 'STOPPED'].includes(item.status));
  if (active.length > 1) throw new Error('multiple unfinished governing tasks for session');
  const item = active[0] || matches.at(-1);
  if (!item) return { bound: false };
  return { bound: true, work_id: item.work_id, objective: item.title, status: item.status,
    scope: item.recovery_scope, checkpoint: item.checkpoint?.event_id || null,
    next_trigger: item.checkpoint?.next_trigger || 'Continue the admitted objective; record a checkpoint before waiting.',
    dependency: item.dependencies.at(-1) || null,
    stop_allowed: ['RESOLVED', 'STOPPED', 'WAITING_EXTERNAL'].includes(item.status),
    limitation: 'Recorded identity and state only; not semantic quality, human approval or automatic execution.' };
}

const direct = process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) try {
  const resumeIndex = process.argv.indexOf('--resume');
  const sessionIndex = process.argv.indexOf('--session');
  if (sessionIndex >= 0) {
    const id = process.argv[sessionIndex + 1]; if (!id) throw new Error('--session requires session_id');
    process.stdout.write(JSON.stringify(sessionWorkPacket(id)) + '\n');
  } else if (resumeIndex >= 0) { const workId = process.argv[resumeIndex + 1]; if (!workId) throw new Error('--resume requires work_id'); process.stdout.write(`${JSON.stringify(resumePacket(workId), null, 2)}\n`); }
  else {
    const projection = projectWorkEvents();
    const rendered = `${JSON.stringify(projection, null, 2)}\n`;
    if (process.argv.includes('--write')) {
      const outputPath = path.join(root, 'operations/runtime/work-current-projection.json');
      fs.writeFileSync(outputPath, rendered);
      console.log(`WORK EVENT PROJECTION WRITTEN items=${projection.items.length} path=${path.relative(root, outputPath)}`);
    } else process.stdout.write(rendered);
  }
} catch (error) { console.error(`WORK EVENT PROJECTION FAIL: ${error.message}`); process.exit(1); }
