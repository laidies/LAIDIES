#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checker = path.join(root, 'scripts/check-work-graph.mjs');
const validPath = path.join(root, 'operations/runtime/pilots/material-learning-content.work-graph.json');
const valid = JSON.parse(fs.readFileSync(validPath, 'utf8'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-work-graph-'));

const run = graph => {
  const file = path.join(tmp, `${Math.random()}.json`);
  fs.writeFileSync(file, `${JSON.stringify(graph, null, 2)}\n`);
  return spawnSync(process.execPath, [checker, file], { cwd: root, encoding: 'utf8' });
};
const reject = (name, mutate, needle) => {
  const candidate = structuredClone(valid);
  mutate(candidate);
  const result = run(candidate);
  if (result.status === 0 || !`${result.stdout}${result.stderr}`.includes(needle)) {
    throw new Error(`${name} should reject with ${needle}:\n${result.stdout}${result.stderr}`);
  }
};

const direct = spawnSync(process.execPath, [checker, validPath], { cwd: root, encoding: 'utf8' });
if (direct.status !== 0 || !direct.stdout.includes('WORK GRAPH PASS')) throw new Error(`valid pilot failed:\n${direct.stdout}${direct.stderr}`);

reject('orphan', graph => {
  graph.nodes.push({ ...structuredClone(graph.nodes[0]), id: 'orphan', kind: 'TERMINAL' });
  graph.terminal_nodes.push('orphan');
}, 'orphaned or unreachable node orphan');
reject('unknown edge target', graph => { graph.edges[0].to = 'missing_node'; }, 'unknown target missing_node');
reject('read-only write', graph => { graph.nodes.find(node => node.id === 'primary_source_research').write_scope = ['shared.md']; }, 'READ_ONLY_WORK cannot have write_scope');
reject('parallel collision', graph => {
  graph.nodes.find(node => node.id === 'primary_source_research').kind = 'MAKER';
  graph.nodes.find(node => node.id === 'relationship_inventory').kind = 'MAKER';
  graph.nodes.find(node => node.id === 'primary_source_research').write_scope = ['shared.md'];
  graph.nodes.find(node => node.id === 'relationship_inventory').write_scope = ['shared.md'];
}, 'parallel write collision evidence_fanout');
reject('correlated judge', graph => { graph.nodes.find(node => node.id === 'independent_judge').model_family = 'sol'; }, 'shares model_family with maker');
reject('unbounded repair cycle', graph => { delete graph.edges.find(edge => edge.cycle).max_traversals; }, 'cycle requires positive max_traversals');
reject('unmarked execution cycle', graph => {
  const edge = graph.edges.find(item => item.cycle);
  delete edge.cycle;
  delete edge.max_traversals;
}, 'execution cycle lacks an explicitly bounded edge');
reject('missing stop loss', graph => { graph.repair_policy.stop_loss_node = 'internal_complete'; }, 'must reference a STOP_LOSS node');
reject('invalid Ali gate', graph => { graph.nodes.find(node => node.id === 'ali_gate').ali_authority = 'ROUTINE_REVIEW'; }, 'requires reserved ali_authority');

fs.rmSync(tmp, { recursive: true, force: true });
console.log('WORK GRAPH CALIBRATION PASS valid=1 rejected=9 orphan=1 target=1 readonly=1 collision=1 independence=1 bounded_cycle=1 hidden_cycle=1 stop_loss=1 ali_authority=1');
