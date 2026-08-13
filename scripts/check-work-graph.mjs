#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const schemaPath = path.join(root, 'operations/runtime/work-graph.schema.json');
const defaultGraph = 'operations/runtime/pilots/material-learning-content.work-graph.json';
const graphPath = path.resolve(root, process.argv[2] || defaultGraph);
const errors = [];

const load = file => JSON.parse(fs.readFileSync(file, 'utf8'));
let schema;
let graph;
try {
  schema = load(schemaPath);
  graph = load(graphPath);
} catch (error) {
  console.error(`WORK GRAPH FAIL\n- ${error.message}`);
  process.exit(1);
}

const present = value => typeof value === 'string' && value.trim().length > 0;
for (const key of schema.required_graph_fields) if (graph[key] === undefined) errors.push(`graph missing ${key}`);
if (graph.schema_version !== schema.schema_version) errors.push(`schema_version must equal ${schema.schema_version}`);
if (!Array.isArray(graph.nodes) || !graph.nodes.length) errors.push('nodes must be a non-empty array');
if (!Array.isArray(graph.edges) || !graph.edges.length) errors.push('edges must be a non-empty array');
if (!Array.isArray(graph.terminal_nodes) || !graph.terminal_nodes.length) errors.push('terminal_nodes must be a non-empty array');

const nodes = new Map();
for (const node of graph.nodes || []) {
  const id = node.id || 'MISSING_NODE_ID';
  if (!/^[a-z][a-z0-9_]*$/.test(id)) errors.push(`invalid node id ${id}`);
  if (nodes.has(id)) errors.push(`duplicate node id ${id}`);
  nodes.set(id, node);
  for (const key of schema.required_node_fields) if (node[key] === undefined) errors.push(`${id} missing ${key}`);
  if (!schema.node_kinds.includes(node.kind)) errors.push(`${id} has invalid kind ${node.kind}`);
  if (!schema.node_modes.includes(node.mode)) errors.push(`${id} has invalid mode ${node.mode}`);
  for (const key of ['context_refs', 'consumes', 'produces', 'write_scope', 'success_evidence']) {
    if (!Array.isArray(node[key])) errors.push(`${id}.${key} must be an array`);
  }
  if (!present(node.principal)) errors.push(`${id}.principal is required`);
  if (!present(node.idempotency)) errors.push(`${id}.idempotency is required`);
  if (node.mode === 'AGENT' && !present(node.model_family)) errors.push(`${id} AGENT requires model_family`);
  if (node.kind === 'READ_ONLY_WORK' && node.write_scope?.length) errors.push(`${id} READ_ONLY_WORK cannot have write_scope`);
  if (node.kind === 'INDEPENDENT_JUDGE' && node.write_scope?.length) errors.push(`${id} INDEPENDENT_JUDGE must be read-only`);
  if (node.kind === 'MAKER' && !node.write_scope?.length) errors.push(`${id} MAKER requires exact write_scope`);
  if (node.kind === 'HUMAN_GATE' && !schema.ali_authority.includes(node.ali_authority)) errors.push(`${id} HUMAN_GATE requires reserved ali_authority`);
}

if (!nodes.has(graph.start_node)) errors.push(`start_node not found: ${graph.start_node}`);
for (const terminal of graph.terminal_nodes || []) if (!nodes.has(terminal)) errors.push(`terminal_node not found: ${terminal}`);

const outgoing = new Map([...nodes.keys()].map(id => [id, []]));
for (const [index, edge] of (graph.edges || []).entries()) {
  for (const key of schema.required_edge_fields) if (edge[key] === undefined) errors.push(`edge[${index}] missing ${key}`);
  if (!nodes.has(edge.from)) errors.push(`edge[${index}] unknown source ${edge.from}`);
  if (!nodes.has(edge.to)) errors.push(`edge[${index}] unknown target ${edge.to}`);
  if (!schema.edge_conditions.includes(edge.condition)) errors.push(`edge[${index}] invalid condition ${edge.condition}`);
  if (!present(edge.evidence)) errors.push(`edge[${index}].evidence is required`);
  if (edge.cycle && (!Number.isInteger(edge.max_traversals) || edge.max_traversals < 1)) errors.push(`edge ${edge.from}->${edge.to} cycle requires positive max_traversals`);
  if (edge.max_traversals !== undefined && !edge.cycle) errors.push(`edge ${edge.from}->${edge.to} max_traversals requires cycle=true`);
  if (nodes.has(edge.from)) outgoing.get(edge.from).push(edge);
}

for (const [id, node] of nodes) {
  const terminal = graph.terminal_nodes?.includes(id);
  if (terminal && outgoing.get(id)?.length) errors.push(`terminal node ${id} cannot have outgoing edges`);
  if (!terminal && !outgoing.get(id)?.length) errors.push(`non-terminal node ${id} requires an outgoing edge`);
  if (node.kind === 'DETERMINISTIC_GATE') {
    const conditions = new Set((outgoing.get(id) || []).map(edge => edge.condition));
    if (!conditions.has('PASS')) errors.push(`${id} DETERMINISTIC_GATE requires PASS edge`);
    if (!conditions.has('FAIL') && !conditions.has('HOLD')) errors.push(`${id} DETERMINISTIC_GATE requires failure edge`);
  }
}

const reachable = new Set();
const queue = nodes.has(graph.start_node) ? [graph.start_node] : [];
while (queue.length) {
  const id = queue.shift();
  if (reachable.has(id)) continue;
  reachable.add(id);
  for (const edge of outgoing.get(id) || []) if (nodes.has(edge.to) && !reachable.has(edge.to)) queue.push(edge.to);
}
for (const id of nodes.keys()) if (!reachable.has(id)) errors.push(`orphaned or unreachable node ${id}`);
for (const terminal of graph.terminal_nodes || []) if (!reachable.has(terminal)) errors.push(`terminal node is unreachable: ${terminal}`);

// Every strongly connected component is a real execution cycle. At least one
// edge inside it must be explicitly marked and bounded; otherwise a loop can
// hide behind ordinary-looking edges and bypass the repair policy.
let nextIndex = 0;
const stack = [];
const onStack = new Set();
const indexByNode = new Map();
const lowByNode = new Map();
const components = [];
const visit = id => {
  indexByNode.set(id, nextIndex);
  lowByNode.set(id, nextIndex);
  nextIndex += 1;
  stack.push(id);
  onStack.add(id);
  for (const edge of outgoing.get(id) || []) if (nodes.has(edge.to)) {
    if (!indexByNode.has(edge.to)) {
      visit(edge.to);
      lowByNode.set(id, Math.min(lowByNode.get(id), lowByNode.get(edge.to)));
    } else if (onStack.has(edge.to)) lowByNode.set(id, Math.min(lowByNode.get(id), indexByNode.get(edge.to)));
  }
  if (lowByNode.get(id) === indexByNode.get(id)) {
    const component = [];
    let member;
    do {
      member = stack.pop();
      onStack.delete(member);
      component.push(member);
    } while (member !== id);
    components.push(component);
  }
};
for (const id of nodes.keys()) if (!indexByNode.has(id)) visit(id);
for (const component of components) {
  const members = new Set(component);
  const internal = (graph.edges || []).filter(edge => members.has(edge.from) && members.has(edge.to));
  const isCycle = component.length > 1 || internal.some(edge => edge.from === edge.to);
  if (isCycle && !internal.some(edge => edge.cycle && Number.isInteger(edge.max_traversals) && edge.max_traversals > 0)) {
    errors.push(`execution cycle lacks an explicitly bounded edge: ${component.sort().join(', ')}`);
  }
}

const groups = new Map();
for (const node of nodes.values()) if (node.parallel_group) {
  const group = groups.get(node.parallel_group) || [];
  group.push(node);
  groups.set(node.parallel_group, group);
}
for (const [groupId, group] of groups) {
  if (group.length > 2) errors.push(`parallel group ${groupId} exceeds LAiDIES cap of 2`);
  for (let i = 0; i < group.length; i += 1) for (let j = i + 1; j < group.length; j += 1) {
    const overlap = group[i].write_scope.filter(scope => group[j].write_scope.includes(scope));
    if (overlap.length) errors.push(`parallel write collision ${groupId}: ${group[i].id} and ${group[j].id} share ${overlap.join(', ')}`);
  }
}

for (const node of nodes.values()) if (node.kind === 'INDEPENDENT_JUDGE') {
  const maker = nodes.get(node.judges_node);
  if (!maker) errors.push(`${node.id} judges unknown node ${node.judges_node}`);
  else {
    if (node.principal === maker.principal) errors.push(`${node.id} shares principal with ${maker.id}`);
    if (node.model_family === maker.model_family) errors.push(`${node.id} shares model_family with ${maker.id}`);
    if (!node.consumes.includes(`${maker.id}.artifact`)) errors.push(`${node.id} must consume ${maker.id}.artifact`);
  }
  if (node.context_refs.some(ref => /producer.*receipt|maker.*rationale/i.test(ref))) errors.push(`${node.id} context exposes maker receipts or rationale`);
}

const repair = graph.repair_policy || {};
if (!Number.isInteger(repair.max_same_failure_retries) || repair.max_same_failure_retries < 0) errors.push('repair_policy.max_same_failure_retries must be a non-negative integer');
if (!nodes.has(repair.stop_loss_node) || nodes.get(repair.stop_loss_node)?.kind !== 'STOP_LOSS') errors.push('repair_policy.stop_loss_node must reference a STOP_LOSS node');
if (!(graph.edges || []).some(edge => edge.cycle)) errors.push('graph requires at least one explicitly bounded repair cycle');
for (const edge of (graph.edges || []).filter(edge => edge.cycle)) {
  if (!['HOLD', 'FAIL', 'NEW_CANDIDATE_DEFECT', 'REVISE'].includes(edge.condition)) errors.push(`bounded cycle ${edge.from}->${edge.to} must be a repair condition`);
  if (edge.max_traversals > repair.max_same_failure_retries) errors.push(`bounded cycle ${edge.from}->${edge.to} exceeds repair retry policy`);
}
if (!(graph.edges || []).some(edge => edge.to === repair.stop_loss_node && ['KNOWN_DEFECT', 'REJECT', 'FAIL'].includes(edge.condition))) errors.push('graph requires a failure edge to repair_policy.stop_loss_node');

for (const key of ['dispatcher_active', 'manual_dry_run_authorized', 'public', 'deploy', 'spend', 'ali_approval']) {
  if (typeof graph.authority_truth?.[key] !== 'boolean') errors.push(`authority_truth.${key} must be boolean`);
}

if (errors.length) {
  console.error(`WORK GRAPH FAIL graph=${graph.graph_id || 'UNKNOWN'}\n${errors.map(error => `- ${error}`).join('\n')}`);
  process.exit(1);
}
console.log(`WORK GRAPH PASS graph=${graph.graph_id} nodes=${nodes.size} edges=${graph.edges.length} terminals=${graph.terminal_nodes.length} parallel_groups=${groups.size}`);
