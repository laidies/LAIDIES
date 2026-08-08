#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const eventsPath = process.env.LAIDIES_WORK_EVENTS_PATH || path.join(root, 'operations/runtime/work-events.jsonl');
const allowed = new Set(['WORK_ADMITTED', 'WORK_STARTED', 'EVIDENCE_RECORDED', 'DEPENDENCY_RECORDED', 'WORK_RESOLVED', 'WORK_STOPPED', 'ARTIFACT_REVIEWED', 'DEFECT_RECORDED', 'DECISION_READY', 'DECISION_RECORDED', 'PUBLICLY_VERIFIED', 'CONTEXT_RECORDED', 'METRICS_COVERAGE_DECLARED']);
const worktreeTruthCutoff = Date.parse(process.env.LAIDIES_WORKTREE_TRUTH_CUTOFF || '2026-08-08T11:15:00-07:00');
const truthRequiredTypes = new Set(['EVIDENCE_RECORDED', 'ARTIFACT_REVIEWED', 'WORK_RESOLVED', 'PUBLICLY_VERIFIED']);
const terminalTruthTypes = new Set(['WORK_RESOLVED', 'PUBLICLY_VERIFIED']);
const worktreeStates = new Set(['NO_REPOSITORY_MUTATION', 'UNCOMMITTED_OWNED', 'COMMITTED', 'PUSHED', 'DEPLOYED', 'VERIFIED_PUBLICLY']);

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
  const resolved = spawnSync('git', ['cat-file', '-e', `${truth.commit}^{commit}`], { cwd: root, encoding: 'utf8' });
  if (resolved.status !== 0) throw new Error(`line ${lineNumber} worktree_truth commit does not resolve: ${truth.commit}`);
  const listed = spawnSync('git', ['diff-tree', '--no-commit-id', '--name-only', '-r', truth.commit], { cwd: root, encoding: 'utf8' });
  if (listed.status !== 0) throw new Error(`line ${lineNumber} cannot inspect worktree_truth commit ${truth.commit}`);
  const committed = new Set(listed.stdout.split(/\r?\n/).filter(Boolean));
  for (const changed of truth.paths) {
    if (typeof changed !== 'string' || path.isAbsolute(changed) || changed.startsWith('../')) throw new Error(`line ${lineNumber} invalid worktree_truth path: ${changed}`);
    if (!committed.has(changed)) throw new Error(`line ${lineNumber} worktree_truth path is not in commit ${truth.commit}: ${changed}`);
  }
}

export function projectWorkEvents(file = eventsPath) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
  const seenEvents = new Set();
  const work = new Map();
  let priorTime = '';
  for (const [index, line] of lines.entries()) {
    let event;
    try { event = JSON.parse(line); } catch { throw new Error(`line ${index + 1} is not valid JSON`); }
    for (const key of ['event_id', 'work_id', 'at', 'type', 'actor', 'payload']) {
      if (event[key] === undefined) throw new Error(`line ${index + 1} missing ${key}`);
    }
    if (seenEvents.has(event.event_id)) throw new Error(`duplicate event_id ${event.event_id}`);
    if (!allowed.has(event.type)) throw new Error(`unknown event type ${event.type}`);
    if (Number.isNaN(Date.parse(event.at))) throw new Error(`invalid event time ${event.at}`);
    if (priorTime && Date.parse(event.at) < Date.parse(priorTime)) throw new Error(`event time moved backwards at ${event.event_id}`);
    verifyWorktreeTruth(event, index + 1);
    seenEvents.add(event.event_id);
    priorTime = event.at;
    const item = work.get(event.work_id) || { work_id: event.work_id, status: 'UNADMITTED', title: null, work_class: null, lane_mode: null, acceptance_owner: null, admitted_at: null, started_at: null, resolved_at: null, last_event_at: null, evidence: [], dependencies: [], metric_events: [] };
    if (event.type !== 'WORK_ADMITTED' && item.status === 'UNADMITTED') throw new Error(`${event.work_id} has ${event.type} before WORK_ADMITTED`);
    if (event.type === 'WORK_ADMITTED') {
      if (item.status !== 'UNADMITTED') throw new Error(`${event.work_id} admitted more than once`);
      item.status = 'ADMITTED';
      item.title = event.payload.title;
      item.acceptance_owner = event.payload.acceptance_owner;
      item.work_class = event.payload.work_class || null;
      item.lane_mode = event.payload.lane_mode || null;
      item.admitted_at = event.at;
    } else if (event.type === 'WORK_STARTED') {
      if (!['ADMITTED', 'WAITING_EXTERNAL', 'IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY'].includes(item.status)) throw new Error(`${event.work_id} cannot start from ${item.status}`);
      item.status = 'IN_PROGRESS';
      item.started_at = event.at;
    } else if (event.type === 'EVIDENCE_RECORDED') {
      if (item.status === 'RESOLVED' || item.status === 'STOPPED') throw new Error(`${event.work_id} received evidence after terminal state`);
      item.evidence.push(event.payload);
    } else if (event.type === 'DEPENDENCY_RECORDED') {
      if (item.status === 'RESOLVED' || item.status === 'STOPPED') throw new Error(`${event.work_id} received dependency after terminal state`);
      item.dependencies.push(event.payload);
      if (event.payload.status === 'WAITING_EXTERNAL') {
        item.status = Array.isArray(event.payload.does_not_block) && event.payload.does_not_block.length
          ? 'IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY'
          : 'WAITING_EXTERNAL';
      }
    } else if (event.type === 'WORK_RESOLVED') {
      if (!item.evidence.length) throw new Error(`${event.work_id} cannot resolve without evidence`);
      item.status = 'RESOLVED';
      item.resolved_at = event.at;
    } else if (event.type === 'WORK_STOPPED') item.status = 'STOPPED';
    else item.metric_events.push({ type: event.type, at: event.at, payload: event.payload });
    item.last_event_at = event.at;
    item.last_event_id = event.event_id;
    work.set(event.work_id, item);
  }
  return {
    schema_version: 1,
    authority: 'PILOT_PROJECTION_ONLY',
    source: path.relative(root, file),
    rule: 'Status is derived from append-only events and must not be hand-edited.',
    items: [...work.values()]
  };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) try {
  const projection = projectWorkEvents();
  const rendered = `${JSON.stringify(projection, null, 2)}\n`;
  if (process.argv.includes('--write')) {
    const outputPath = path.join(root, 'operations/runtime/work-current-projection.json');
    fs.writeFileSync(outputPath, rendered);
    console.log(`WORK EVENT PROJECTION WRITTEN items=${projection.items.length} path=${path.relative(root, outputPath)}`);
  } else process.stdout.write(rendered);
} catch (error) {
  console.error(`WORK EVENT PROJECTION FAIL: ${error.message}`);
  process.exit(1);
}
