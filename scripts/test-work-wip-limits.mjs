#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { spawnSync } from 'node:child_process';
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-wip-')); const file=path.join(dir,'events.jsonl');
const event=(id,work,at,type,payload)=>JSON.stringify({event_id:id,work_id:work,at,type,actor:'test',payload});
try {
  fs.writeFileSync(file,event('e1','w1','2026-08-08T00:00:00Z','WORK_ADMITTED',{title:'one',work_class:'building',lane_mode:'foreground_write',acceptance_owner:'a'})+'\n');
  let run=spawnSync(process.execPath,['scripts/check-work-wip-limits.mjs'],{encoding:'utf8',env:{...process.env,LAIDIES_WORK_EVENTS_PATH:file}}); assert.equal(run.status,0);
  fs.appendFileSync(file,event('e2','w2','2026-08-08T00:01:00Z','WORK_ADMITTED',{title:'two',work_class:'building',lane_mode:'foreground_write',acceptance_owner:'a'})+'\n');
  run=spawnSync(process.execPath,['scripts/check-work-wip-limits.mjs'],{encoding:'utf8',env:{...process.env,LAIDIES_WORK_EVENTS_PATH:file}}); assert.equal(run.status,1); assert.match(run.stderr,/building active=2 limit=1/);
  fs.appendFileSync(file,event('e3','legacy','2026-08-08T00:02:00Z','WORK_ADMITTED',{title:'legacy',work_class:'building',lane_mode:'legacy_migration_snapshot',acceptance_owner:'a',legacy_status_at_migration:'OPEN'})+'\n');
  fs.writeFileSync(file,[
    event('e1','w1','2026-08-08T00:00:00Z','WORK_ADMITTED',{title:'one',work_class:'building',lane_mode:'foreground_write',acceptance_owner:'a'}),
    event('e3','legacy','2026-08-08T00:02:00Z','WORK_ADMITTED',{title:'legacy',work_class:'building',lane_mode:'legacy_migration_snapshot',acceptance_owner:'a',legacy_status_at_migration:'OPEN'})
  ].join('\n')+'\n');
  run=spawnSync(process.execPath,['scripts/check-work-wip-limits.mjs'],{encoding:'utf8',env:{...process.env,LAIDIES_WORK_EVENTS_PATH:file}}); assert.equal(run.status,0); assert.match(run.stdout,/active=1/);
  console.log('WORK WIP CALIBRATION PASS one=allowed duplicate_building=blocked legacy_snapshot=excluded');
} finally { fs.rmSync(dir,{recursive:true,force:true}); }
