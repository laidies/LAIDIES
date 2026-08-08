#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
const file=process.env.LAIDIES_WORK_EVENTS_PATH || path.join(process.cwd(),'operations/runtime/work-events.jsonl');
const now=new Date(process.env.LAIDIES_METRICS_NOW || Date.now());
const events=fs.readFileSync(file,'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const coverage=events.some(e=>e.type==='METRICS_COVERAGE_DECLARED'&&e.payload.complete===true);
const byWork=new Map(); for(const e of events){ const list=byWork.get(e.work_id)||[]; list.push(e); byWork.set(e.work_id,list); }
const reviewed=events.filter(e=>e.type==='ARTIFACT_REVIEWED'); const defects=events.filter(e=>e.type==='DEFECT_RECORDED');
const publicEvents=events.filter(e=>e.type==='PUBLICLY_VERIFIED'); const cycles=reviewed.map(e=>Number(e.payload.review_cycle)).filter(Number.isFinite);
const complete=[]; const activeAges=[]; const decisionLatencies=[];
for(const list of byWork.values()){
  const admitted=list.find(e=>e.type==='WORK_ADMITTED'); const pub=list.find(e=>e.type==='PUBLICLY_VERIFIED');
  const migrationSnapshot=admitted?.payload?.lane_mode==='legacy_migration_snapshot';
  if(admitted&&pub) complete.push((Date.parse(pub.at)-Date.parse(admitted.at))/86400000);
  const terminal=list.some(e=>['WORK_RESOLVED','WORK_STOPPED'].includes(e.type)); if(admitted&&!terminal&&!migrationSnapshot) activeAges.push((now-Date.parse(admitted.at))/86400000);
  const ready=list.find(e=>e.type==='DECISION_READY'); const ruled=list.find(e=>e.type==='DECISION_RECORDED'); if(ready&&ruled) decisionLatencies.push((Date.parse(ruled.at)-Date.parse(ready.at))/3600000);
}
const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null; const median=a=>{if(!a.length)return null;const s=[...a].sort((a,b)=>a-b),m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2};
const metrics={
  ali_found_defect_rate: reviewed.length?defects.filter(e=>e.payload.found_by==='ali').length/reviewed.length:null,
  first_pass_acceptance: reviewed.length?reviewed.filter(e=>e.payload.accepted===true&&e.payload.review_cycle===1).length/reviewed.length:null,
  repeated_known_defects: coverage?defects.filter(e=>e.payload.known_family===true).length:null,
  review_cycles_per_artifact: mean(cycles),
  throughput_public_per_week: coverage?publicEvents.length:null,
  cycle_time_days_median: median(complete),
  wip_age_days_oldest: activeAges.length?Math.max(...activeAges):null,
  ali_decision_latency_hours: median(decisionLatencies),
  context_cost_mean_input_tokens: mean(events.filter(e=>e.type==='CONTEXT_RECORDED').map(e=>Number(e.payload.input_tokens)).filter(Number.isFinite)),
  public_outcome: coverage&&publicEvents.length?{verified_artifacts:publicEvents.length}:null
};
const unavailable=Object.entries(metrics).filter(([,v])=>v===null).map(([k])=>k);
const result={schema_version:1,source:path.relative(process.cwd(),file),as_of:now.toISOString(),coverage_complete:coverage,metrics,unavailable,rule:'Unavailable is not zero and must not be presented as measured.'};
const rendered=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes('--write')){
  const output=path.join(process.cwd(),'operations/runtime/work-metrics.json');
  fs.writeFileSync(output,rendered);
  console.log(`WORK METRICS WRITTEN unavailable=${unavailable.length} path=${path.relative(process.cwd(),output)}`);
}else console.log(rendered.trimEnd());
