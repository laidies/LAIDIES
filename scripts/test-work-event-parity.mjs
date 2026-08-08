#!/usr/bin/env node
import assert from 'node:assert/strict'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import {spawnSync} from 'node:child_process';
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-parity-')), legacy=path.join(dir,'legacy.json'), events=path.join(dir,'events.jsonl');
const env={...process.env,LAIDIES_LEGACY_WORK_PATH:legacy,LAIDIES_WORK_EVENTS_PATH:events};
try{
 fs.writeFileSync(legacy,JSON.stringify({records:[{work_id:'w1',status:'BUILDING'}]}));
 fs.writeFileSync(events,JSON.stringify({event_id:'e1',work_id:'w1',at:'2026-08-08T00:00:00Z',type:'WORK_ADMITTED',actor:'t',payload:{title:'x',work_class:'operations',lane_mode:'foreground_write',acceptance_owner:'a'}})+'\n');
 let run=spawnSync(process.execPath,['scripts/check-work-event-parity.mjs'],{encoding:'utf8',env}); assert.equal(run.status,0);
 fs.writeFileSync(legacy,JSON.stringify({records:[{work_id:'w1',status:'BUILDING'},{work_id:'w2',status:'BLOCKED'}]}));
 run=spawnSync(process.execPath,['scripts/check-work-event-parity.mjs'],{encoding:'utf8',env}); assert.equal(run.status,1); assert.match(run.stderr,/w2/);
 console.log('WORK EVENT PARITY CALIBRATION PASS complete=allowed missing_active=blocked');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
