#!/usr/bin/env node
import assert from 'node:assert/strict'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import {spawnSync} from 'node:child_process';
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-metrics-')), file=path.join(dir,'events.jsonl');
const rows=[
 {event_id:'1',work_id:'w',at:'2026-08-01T00:00:00Z',type:'WORK_ADMITTED',actor:'t',payload:{title:'x',work_class:'content',lane_mode:'foreground_write',acceptance_owner:'a'}},
 {event_id:'2',work_id:'w',at:'2026-08-02T00:00:00Z',type:'ARTIFACT_REVIEWED',actor:'t',payload:{accepted:true,review_cycle:1}},
 {event_id:'3',work_id:'w',at:'2026-08-03T00:00:00Z',type:'PUBLICLY_VERIFIED',actor:'t',payload:{}},
 {event_id:'4',work_id:'w',at:'2026-08-03T01:00:00Z',type:'WORK_RESOLVED',actor:'t',payload:{}}
 ,{event_id:'5',work_id:'w',at:'2026-08-03T02:00:00Z',type:'METRICS_COVERAGE_DECLARED',actor:'t',payload:{complete:true}}
 ,{event_id:'6',work_id:'legacy',at:'2026-08-03T03:00:00Z',type:'WORK_ADMITTED',actor:'t',payload:{title:'legacy',work_class:'content',lane_mode:'legacy_migration_snapshot',acceptance_owner:'a',legacy_status_at_migration:'OPEN'}}
]; fs.writeFileSync(file,rows.map(JSON.stringify).join('\n')+'\n');
try {let run=spawnSync(process.execPath,['scripts/project-work-metrics.mjs'],{encoding:'utf8',env:{...process.env,LAIDIES_WORK_EVENTS_PATH:file,LAIDIES_METRICS_NOW:'2026-08-08T00:00:00Z'}}); assert.equal(run.status,0); let data=JSON.parse(run.stdout); assert.equal(data.metrics.first_pass_acceptance,1); assert.equal(data.metrics.cycle_time_days_median,2); assert.equal(data.metrics.repeated_known_defects,0); assert.equal(data.metrics.wip_age_days_oldest,null); assert.ok(data.unavailable.includes('ali_decision_latency_hours')); const noCoverage=rows.slice(0,4);fs.writeFileSync(file,noCoverage.map(JSON.stringify).join('\n')+'\n');run=spawnSync(process.execPath,['scripts/project-work-metrics.mjs'],{encoding:'utf8',env:{...process.env,LAIDIES_WORK_EVENTS_PATH:file,LAIDIES_METRICS_NOW:'2026-08-08T00:00:00Z'}});data=JSON.parse(run.stdout);assert.equal(data.metrics.repeated_known_defects,null);assert.equal(data.metrics.throughput_public_per_week,null);console.log('WORK METRICS CALIBRATION PASS measured=derived missing=unavailable incomplete_coverage=no_false_zero legacy_snapshot=no_wip_age');} finally {fs.rmSync(dir,{recursive:true,force:true});}
