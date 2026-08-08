#!/usr/bin/env node
import crypto from 'node:crypto'; import fs from 'node:fs'; import path from 'node:path'; import {spawnSync} from 'node:child_process';
const file=process.argv[2]; if(!file){console.error('ARTIFACT HANDOFF FAIL missing path');process.exit(1);} const root=process.cwd();
const schema=JSON.parse(fs.readFileSync(path.join(root,'operations/runtime/artifact-handoff.schema.json'),'utf8')); const data=JSON.parse(fs.readFileSync(path.resolve(root,file),'utf8')); const errors=[];
for(const key of schema.required) if(data[key]===undefined) errors.push(`missing ${key}`);
const tuple=(value,label,allowNull=false)=>{if(allowNull&&value===null)return;if(!value||typeof value.path!=='string'||!/^[a-f0-9]{64}$/.test(value.sha256||'')){errors.push(`${label} must bind path and sha256`);return;}const abs=path.resolve(root,value.path);if(!abs.startsWith(`${root}${path.sep}`)||!fs.existsSync(abs)){errors.push(`${label} path missing or outside repository`);return;}const digest=crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');if(digest!==value.sha256)errors.push(`${label} sha256 mismatch`);};
tuple(data.artifact,'artifact'); tuple(data.brief,'brief'); for(const [i,input] of (data.inputs||[]).entries()) tuple(input,`inputs[${i}]`);
if(!Array.isArray(data.accept)||!data.accept.length)errors.push('accept must be non-empty'); if(!Array.isArray(data.run)||!data.run.length)errors.push('run must be non-empty');
if(!data.budget||![data.budget.in,data.budget.out,data.budget.wall].every(Number.isFinite))errors.push('budget requires numeric in/out/wall');
if(!['PASS','HOLD','BLOCKED','IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY'].includes(data.return?.status))errors.push('return.status invalid');
for(const key of ['public','deploy','spend','ali_approval']) if(typeof data.authority_truth?.[key]!=='boolean')errors.push(`authority_truth.${key} must be boolean`);
const wt=data.worktree_truth;
const completionStatuses=new Set(['PASS']);
const worktreeStates=new Set(['NO_REPOSITORY_MUTATION','UNCOMMITTED_OWNED','COMMITTED','PUSHED','DEPLOYED','VERIFIED_PUBLICLY']);
if(!wt||!worktreeStates.has(wt.state))errors.push('worktree_truth.state invalid');
else {
  if(!Array.isArray(wt.paths))errors.push('worktree_truth.paths must be an array');
  if(wt.state==='NO_REPOSITORY_MUTATION'&&wt.paths.length)errors.push('NO_REPOSITORY_MUTATION cannot list changed paths');
  if(wt.state==='UNCOMMITTED_OWNED'){
    if(completionStatuses.has(data.return?.status))errors.push('PASS cannot bind UNCOMMITTED_OWNED work; commit exact changed paths or return a non-completion status');
    if(!wt.owner||!wt.reason||!wt.next_trigger)errors.push('UNCOMMITTED_OWNED requires owner, reason and next_trigger');
  }
  if(['COMMITTED','PUSHED','DEPLOYED','VERIFIED_PUBLICLY'].includes(wt.state)){
    if(!/^[a-f0-9]{40}$/.test(wt.commit||''))errors.push(`${wt.state} requires an exact 40-character commit`);
    else {
      const exists=spawnSync('git',['cat-file','-e',`${wt.commit}^{commit}`],{cwd:root,encoding:'utf8'});
      if(exists.status!==0)errors.push(`worktree_truth.commit does not resolve: ${wt.commit}`);
      const committed=new Set(spawnSync('git',['diff-tree','--root','--no-commit-id','--name-only','-r',wt.commit],{cwd:root,encoding:'utf8'}).stdout.trim().split('\n').filter(Boolean));
      for(const changed of wt.paths){
        if(typeof changed!=='string'||path.isAbsolute(changed)||changed.startsWith('../'))errors.push(`worktree_truth path invalid: ${changed}`);
        else if(!committed.has(changed))errors.push(`worktree_truth path is not in commit ${wt.commit}: ${changed}`);
      }
    }
  }
}
if(errors.length){console.error(`ARTIFACT HANDOFF FAIL\n${errors.map(e=>`- ${e}`).join('\n')}`);process.exit(1);} console.log(`ARTIFACT HANDOFF PASS task=${data.task}`);
