#!/usr/bin/env node
// Read-only view. Canonical checkers retain every readiness/authority decision.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { checkContentWorkOrders } from './check-content-work-orders.mjs';
import { checkContentReleaseReadiness } from './check-content-release-readiness.mjs';
import { inspectLearningExecutor } from './check-learning-executor.mjs';
import { PRODUCER_INSTRUCTION_PATHS } from './check-content-producer-contract.mjs';
const BASE = 'operations/product-stewards/learning-content-ecosystem/';
export const QUEUE = `${BASE}content-work-orders.json`;
const HASH = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const REQUIRED = [...Object.values(PRODUCER_INSTRUCTION_PATHS), `${BASE}content-quality-exemplars.json`];

// Extract only explicitly named file references, never relationships inferred from prose.
function references(value, field = '', out = []) {
  if (!value || typeof value !== 'object') return out;
  if (!Array.isArray(value) && typeof value.path === 'string') out.push({ path: value.path, sha256: value.sha256, field: `${field}.path` });
  for (const [key, child] of Object.entries(value)) {
    if (key === 'path') continue;
    if (typeof child === 'string' && /Path$/.test(key)) out.push({ path: child, sha256: value[key.replace(/Path$/, 'Sha256')], field: `${field}.${key}` });
    else if (Array.isArray(child) && (key.endsWith('Paths') || key === 'sourceRefs')) child.filter(x => typeof x === 'string').forEach(p => out.push({path:p, field:`${field}.${key}`}));
    else if (child && typeof child === 'object') references(child, `${field}.${key}`, out);
  }
  return out;
}

export function projectLearning({ root = process.cwd(), now = new Date() } = {}) {
  root = fs.realpathSync(root);
  const files = new Map(), edges = [], issues = [], incomplete = new Set();
  function inspect(ref, from, relation, depth = 0, ancestors = []) {
    if (!ref.path || /^https?:/.test(ref.path)) return;
    const relative = path.posix.normalize(ref.path);
    if (path.isAbsolute(relative) || relative === '..' || relative.startsWith('../')) {
      issues.push({ code:'UNSAFE_PATH', from, path:ref.path }); return;
    }
    const id = `file:${relative}`;
    edges.push({ from, to:id, relation, field:ref.field || null });
    let file = files.get(relative);
    if (!file) {
      file = { path:relative, exists:false, sha256:null, references:[] };
      files.set(relative, file);
      try {
        const real = fs.realpathSync(path.join(root, relative));
        if (!real.startsWith(`${root}${path.sep}`)) throw new Error('path resolves outside root');
        if (!fs.statSync(real).isFile()) throw new Error('not a regular file');
        const bytes = fs.readFileSync(real);
        file.exists = true; file.sha256 = HASH(bytes);
        if (relative.endsWith('.json')) {
          try { file.record = JSON.parse(bytes); file.references = references(file.record); }
          catch { issues.push({code:'INVALID_JSON', path:relative}); }
        }
      } catch (error) { issues.push({ code:'FILE_UNAVAILABLE', path:relative, detail:error.message }); }
    }
    if (ref.sha256 !== undefined && ref.sha256 !== file.sha256) issues.push({code:'HASH_MISMATCH', from, path:relative, expected:ref.sha256, actual:file.sha256});
    if (!file.exists && ['REQUIRES','INTAKE_ROUTE','BOUND_INPUT','PREFLIGHT_AUTHORITY'].includes(relation)) issues.push({code:'MISSING_DECLARED_INPUT',from,path:relative});
    if (!file.exists || !file.references.length) return;
    if (ancestors.includes(relative)) { incomplete.add(relative); issues.push({code:'REFERENCE_CYCLE',from,path:relative}); return; }
    if (depth >= 4) { incomplete.add(relative); return; }
    // Each file expands once. All incoming edges remain available for reverse impact.
    if (!file.expanded) {
      file.expanded = true;
      for (const child of file.references) inspect(child, id, child.sha256 !== undefined ? 'BOUND_INPUT' : 'DECLARES_REFERENCE', depth + 1, [...ancestors,relative]);
    }
  }
  const run = fn => { try { return fn({root,now}); } catch (error) { return {errors:[error.message]}; } };
  const checks = { workOrders:run(checkContentWorkOrders), release:run(checkContentReleaseReadiness), executor:run(inspectLearningExecutor) };
  for (const [checker,result] of Object.entries(checks)) for (const detail of result.errors || []) issues.push({code:'CANONICAL_CHECK_FAILED',checker,detail});
  let queue;
  try { queue = JSON.parse(fs.readFileSync(path.join(root,QUEUE))); }
  catch (error) { return {status:'QUARANTINED',issues:[...issues,{code:'QUEUE_UNREADABLE',detail:error.message}],checks,orders:[],files:[],edges:[],impactCoverage:'IMPACT_UNKNOWN'}; }
  inspect({path:QUEUE},'snapshot','SNAPSHOT_INPUT');
  for (const name of ['SOURCE-REGISTRY.json','executor-state.json','execution-metadata.json']) inspect({path:`${BASE}${name}`},'snapshot','SNAPSHOT_INPUT');
  const orders = (Array.isArray(queue.workOrders) ? queue.workOrders : []).filter(o=>o && typeof o==='object');
  const byId = new Map(orders.map(o=>[o.id,o]));
  const superseded = new Set(orders.map(o=>o.successorOf).filter(Boolean));
  for (const order of orders) {
    const visited = new Set([order.id]); let predecessor = order.successorOf;
    while (predecessor) {
      if (visited.has(predecessor)) { issues.push({code:'SUCCESSOR_CYCLE',from:order.id,path:predecessor}); break; }
      visited.add(predecessor);
      if (!byId.has(predecessor)) { issues.push({code:'MISSING_PREDECESSOR',from:order.id,path:predecessor}); break; }
      predecessor = byId.get(predecessor).successorOf;
    }
    for (const ref of references(order)) {
      const relation=ref.field.includes('targetPaths')?'DECLARES_TARGET':ref.field.includes('evidencePaths')?'DECLARED_EVIDENCE_REFERENCE':ref.field.includes('sourceRefs')||/producerContractPath|producerReviewPath|semanticAdmissionPath|manifestPath/.test(ref.field)?'REQUIRES':'DECLARES_REFERENCE';
      inspect(ref,order.id,relation);
      if (/producerContractPath|producerReviewPath|semanticAdmissionPath/.test(ref.field)) {
        const record = files.get(path.posix.normalize(ref.path))?.record;
        if (record && record.candidateId !== order.id) issues.push({code:'ORPHAN_CANDIDATE_RECORD',from:order.id,path:ref.path});
      }
    }
    // These are universal checker requirements, not declared order-specific bindings.
    // They must not enter reverse-impact results as actual consumed inputs.
    if (order.successorOf) edges.push({from:order.id,to:order.successorOf,relation:'SUPERSEDES'});
  }
  for (const p of REQUIRED) inspect({path:p},'preflight-policy','PREFLIGHT_AUTHORITY');
  for (const item of queue.intakeCoverage || []) for (const id of item.workOrderIds || []) {
    if (byId.has(id)) inspect({path:item.path},id,'INTAKE_ROUTE');
  }
  const fatal = issues.some(i=>['CANONICAL_CHECK_FAILED','QUEUE_UNREADABLE','SUCCESSOR_CYCLE','MISSING_PREDECESSOR','ORPHAN_CANDIDATE_RECORD','UNSAFE_PATH','INVALID_JSON','HASH_MISMATCH','MISSING_DECLARED_INPUT','REFERENCE_CYCLE'].includes(i.code));
  const result = {
    schemaVersion:'laidies-learning-dependency-projection.v1', generatedAt:now.toISOString(), root,
    status:fatal?'QUARANTINED':'OBSERVATION_ONLY', authority:'NONE', impactCoverage:'IMPACT_UNKNOWN',
    limitations:['Declared references only; undeclared consumers remain unknown.','Existence and hashes do not prove quality, freshness, approval or public availability.','No automatic dispatch; checker eligibility allows preparation only.','JSON reference expansion is bounded to four levels.','Superseded orders remain visible for history but are excluded from current context packets.'],
    checks, issues:[...new Map(issues.map(i=>[JSON.stringify(i),i])).values()], requiredPreflightPaths:REQUIRED, incompleteExpansion:[...incomplete],
    orders:orders.map(order=>({id:order.id,title:order.title,owner:order.ownerProductId,recordedStatus:order.status,
      current:!superseded.has(order.id),
      checkerPreflightEligible:checks.workOrders.readyForProducerPreflight?.includes(order.id)||false,
      checkerDraftEligible:checks.workOrders.readyToDraft?.includes(order.id)||false,
      releaseHeldReasons:checks.release.held?.find(o=>o.id===order.id)?.reasons || [],
      producerHold:checks.workOrders.producerContractBlocked?.filter(s=>s.startsWith(`${order.id}:`))||[],
      recordedNextAction:order.nextAction,recordedNextTrigger:order.nextTrigger,
      nextStep:fatal?'RECONCILE_INVALID_INPUTS':superseded.has(order.id)?'HISTORICAL_ONLY':order.status==='QUEUED_WITH_TRIGGER'?'WAIT_FOR_RECORDED_TRIGGER':checks.workOrders.readyToDraft?.includes(order.id)?'CONSULT_CURRENT_TASK_AUTHORITY':'OWNER_RECONCILE_INPUTS_FOR_PREFLIGHT',
      humanDecision:'NOT_DETERMINED_BY_PROJECTION',automaticExecution:false,
      contextPaths:[...new Set(edges.filter(e=>e.from===order.id&&e.to.startsWith('file:')).map(e=>e.to.slice(5)))].sort()
    })),
    files:[...files.values()].map(({record,references,expanded,...file})=>file).sort((a,b)=>a.path.localeCompare(b.path)),
    edges:[...new Map(edges.map(e=>[JSON.stringify(e),e])).values()]
  };
  return result;
}

export function reverseImpact(projection, relative) {
  const seen = new Set([`file:${relative}`]), pending = [...seen];
  while (pending.length) {
    const current = pending.pop();
    for (const e of projection.edges) if (['REQUIRES','BOUND_INPUT','INTAKE_ROUTE'].includes(e.relation) && e.to===current && !seen.has(e.from)) {seen.add(e.from);pending.push(e.from);}
  }
  return {path:relative, coverage:'IMPACT_UNKNOWN', declaredCurrentOrders:projection.orders.filter(o=>o.current&&seen.has(o.id)).map(o=>o.id)};
}
const cell = s => String(s??'').replaceAll('|','/').replaceAll('\n',' ');
export function renderLearningMap(p) {
  const w=p.checks.workOrders;
  return `# Learning work: current dependency map\n\nGenerated ${p.generatedAt}. Regenerate before using: this is a snapshot, never execution authority.\n\n${p.orders.length} orders; ${w.readyForProducerPreflight?.length||0} eligible for preparation; ${w.readyToDraft?.length||0} eligible to draft; ${p.checks.release.held?.length||0} held for release. Executor: ${p.checks.executor.mode||'INVALID'}. Projection: ${p.status}.\n\n\`\`\`mermaid\nflowchart LR\n  Sources[Current sources and instructions] --> Prepare[Owner reconciles inputs]\n  Prepare --> Contract[Producer contract]\n  Contract --> Draft[Draft and maker inspection]\n  Draft --> Review[Independent review]\n  Review --> Owner[Destination owner acceptance]\n  Owner --> Release[Authorized release and live verification]\n  Review -->|Reusable defect| Learning[Learning owner admits repair]\n  Learning --> Sources\n\`\`\`\n\nThis diagram shows the required route, not observed completion. Automated checks inspect recorded evidence; agents perform preparation and judgment. The execution adapter is disabled. Human decisions are determined by the actual task authority, not guessed from an owner label.\n\n| Order | Owner | Recorded status | Next safe operation | Missing declared files |\n|---|---|---|---|---|\n${p.orders.map(o=>`| ${o.id}: ${cell(o.title)} | ${cell(o.owner)} | ${cell(o.recordedStatus)} | ${o.nextStep} | ${o.contextPaths.filter(x=>!p.files.find(f=>f.path===x)?.exists).length} |`).join('\n')}\n\n## Exact holds and inputs\n\n${p.orders.map(o=>`### ${o.id}\n\nRecorded next action (not authorization): ${o.recordedNextAction}\n\nRecorded trigger: ${o.recordedNextTrigger}\n\nProducer hold: ${o.producerHold.join('; ')||'See canonical checker result'}\n\nRelease holds: ${o.releaseHeldReasons.join('; ')||'See canonical checker result'}\n\n${o.contextPaths.map(x=>`- [${x}](<${path.join(p.root,x)}>)${p.files.find(f=>f.path===x)?.exists?'':' — MISSING'}`).join('\n')}\n`).join('\n')}\n## Limits and diagnostics\n\n${p.limitations.map(x=>`- ${x}`).join('\n')}\n\n${p.issues.map(i=>`- ${i.code}: ${cell(i.from||i.checker||'')} ${cell(i.path||i.detail)}`).join('\n')}\n`;
}
if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const args=process.argv.slice(2); let root=process.cwd(), format='json', impact=null, order=null;
    for(let i=0;i<args.length;i++) {
      const flag=args[i],value=args[++i];
      if(!value || value.startsWith('--')) throw new Error(`missing value for ${flag}`);
      if(flag==='--root')root=value;else if(flag==='--format'&&['json','markdown'].includes(value))format=value;else if(flag==='--impact')impact=value;else if(flag==='--order')order=value;else throw new Error(`unsupported argument ${flag}`);
    }
    const p=projectLearning({root}); let output=p;
    if(impact)output=reverseImpact(p,impact);
    if(order){const found=p.orders.find(o=>o.id===order&&o.current);if(!found)throw new Error('current order not found');output={status:p.status,authority:p.authority,order:found,limitations:p.limitations};}
    console.log(format==='markdown'&&!impact&&!order?renderLearningMap(p):JSON.stringify(output,null,2));
    if(p.status==='QUARANTINED')process.exitCode=1;
  }catch(error){console.error(error.message);process.exitCode=2;}
}
