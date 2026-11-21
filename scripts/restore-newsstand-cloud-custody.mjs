#!/usr/bin/env node
// Recover encrypted custody from bounded exact-name artifacts, with a verified
// encrypted bootstrap fallback. Plaintext exists only in the private runner dir.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync, spawnSync} from 'node:child_process';
import {eligibleCustodyArtifact} from './select-newsstand-custody-artifacts.mjs';
const repo='laidies/LAIDIES', target=process.argv[2];
function gh(...args){return execFileSync('gh',['api',...args],{encoding:'utf8',maxBuffer:8*1024*1024});}
function json(endpoint){return JSON.parse(gh(endpoint));}
function decode(value){if(!value||value.length>48000||!/^[A-Za-z0-9+/]+={0,2}$/.test(value))throw Error('BOOTSTRAP_INVALID');const bytes=Buffer.from(value,'base64');if(bytes.toString('base64')!==value)throw Error('BOOTSTRAP_INVALID');return bytes;}
try {
 if(process.env.GITHUB_REPOSITORY!==repo || process.env.GITHUB_ACTIONS!=='true' || process.env.GITHUB_WORKFLOW_REF!=='laidies/LAIDIES/.github/workflows/newsstand-cloud-intake.yml@refs/heads/main')throw Error('CUSTODY_RECIPIENT_HELD');
 if(!target || !path.isAbsolute(target) || !fs.statSync(target).isDirectory() || (fs.statSync(target).mode & 0o077)!==0)throw Error('CUSTODY_DIRECTORY_HELD');
 const workflowIds={production:String(json(`repos/${repo}/actions/workflows/newsstand-hosted-production.yml`).id),intake:String(json(`repos/${repo}/actions/workflows/newsstand-cloud-intake.yml`).id)};
 const names=['newsstand-codex-auth-migration','newsstand-codex-auth-current'];
 const artifacts=[];
 for(const name of names)for(let page=1;page<=10;page++){
  const batch=json(`repos/${repo}/actions/artifacts?name=${encodeURIComponent(name)}&per_page=100&page=${page}`).artifacts;
  artifacts.push(...batch);if(batch.length<100)break;
 }
 artifacts.sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at)));
 function restore(artifact,run,metadata,encrypted,allowExpiredBootstrap=false){
  let sidecar;try{sidecar=JSON.parse(metadata)}catch{return false}
  if(!eligibleCustodyArtifact({artifact,run,sidecar,workflowIds,allowExpiredBootstrap}))return false;
  const dir=fs.mkdtempSync(path.join(target,'capsule-'));fs.chmodSync(dir,0o700);
  const encPath=path.join(dir,'auth.enc'),metaPath=path.join(dir,'auth-meta.json');fs.writeFileSync(encPath,encrypted,{mode:0o600,flag:'wx'});fs.writeFileSync(metaPath,metadata,{mode:0o600,flag:'wx'});
  return spawnSync(process.execPath,['scripts/custody-codex-auth.mjs','restore',encPath,path.join(target,'auth.json'),metaPath],{stdio:'ignore',env:process.env}).status===0;
 }
 let restored=false;
 for(const artifact of artifacts){
  if(artifact.expired!==false || !Number.isInteger(artifact.id) || artifact.size_in_bytes<1 || artifact.size_in_bytes>6*1024*1024 || !Number.isInteger(artifact.workflow_run?.id))continue;
  const run=json(`repos/${repo}/actions/runs/${artifact.workflow_run.id}`);
  const archive=execFileSync('gh',['api',`repos/${repo}/actions/artifacts/${artifact.id}/zip`],{maxBuffer:7*1024*1024});
  const dir=fs.mkdtempSync(path.join(target,'archive-'));fs.chmodSync(dir,0o700);const zip=path.join(dir,'capsule.zip');fs.writeFileSync(zip,archive,{mode:0o600,flag:'wx'});
  const entries=execFileSync('unzip',['-Z1',zip],{encoding:'utf8',maxBuffer:8192}).trim().split('\n').sort();
  if(entries.join(',')!=='auth-meta.json,auth.enc')continue;
  const metadata=execFileSync('unzip',['-p',zip,'auth-meta.json'],{maxBuffer:16384});
  const encrypted=execFileSync('unzip',['-p',zip,'auth.enc'],{maxBuffer:6*1024*1024});
  if(restore(artifact,run,metadata,encrypted)){restored=true;break}
 }
 if(!restored){
  const metadata=decode(process.env.CODEX_AUTH_CAPSULE_METADATA_B64),encrypted=decode(process.env.CODEX_AUTH_CAPSULE_B64),sidecar=JSON.parse(metadata);
  if(!/^[1-9][0-9]*$/.test(sidecar.runId||''))throw Error('BOOTSTRAP_INVALID');
  const run=json(`repos/${repo}/actions/runs/${sidecar.runId}`);
  const runArtifacts=json(`repos/${repo}/actions/runs/${sidecar.runId}/artifacts`).artifacts;
  const artifact=runArtifacts.find(item=>names.includes(item.name));
  // Artifact may expire, but its metadata must still prove the bootstrap run.
  // GitHub may remove it entirely; in that case hold rather than invent provenance.
  if(artifact)restored=restore(artifact,run,metadata,encrypted,true);
 }
 if(!restored)throw Error('ELIGIBLE_CUSTODY_REQUIRED');
 console.log('CURRENT_ENCRYPTED_CUSTODY_RESTORED');
} catch {console.error('CLOUD_CUSTODY_HELD');process.exitCode=2}
