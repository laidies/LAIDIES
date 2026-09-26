#!/usr/bin/env node
// Portable version of the existing scoped provider-preserving NewsStand stage.
// Inputs must be the captured live predecessor and its verified complete manifest.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const identity=files=>hash(files.map(f=>`${f.sha256}  ${f.path}\n`).join(''));
const validPath=p=>typeof p==='string' && p.length>0 && !path.posix.isAbsolute(p) && !p.includes('\\') && path.posix.normalize(p)===p && p!=='..' && !p.startsWith('../');
const controls=['_worker.js','_redirects'];
function boundFile(root,relative) {
  if(!validPath(relative)) throw Error('INVALID_STAGE_PATH');
  const base=fs.realpathSync(root), target=fs.realpathSync(path.join(base,relative));
  if(!target.startsWith(base+path.sep) || !fs.statSync(target).isFile()) throw Error('STAGE_PATH_ESCAPES_ROOT');
  return fs.readFileSync(target);
}

export function stageOverlay({baseManifest,providerBase,predecessor,scope,sourceDirectory,controlDirectory,changedPaths,outputDirectory}) {
  if(scope?.schema!=='laidies.newsstand-production-scope.v1' || scope.project!=='laidies-sunnyvaile' || scope.productionBranch!=='homepage-redesign' || !Array.isArray(scope.allowedArtifactPaths) || !scope.allowedArtifactPaths.length || scope.allowedArtifactPaths.some(p=>!validPath(p)||controls.includes(p))) throw Error('STAGE_SCOPE_REQUIRED');
  if(baseManifest?.schema!=='laidies-release-artifact-manifest/v1' || !Array.isArray(baseManifest.files) || identity(baseManifest.files)!==baseManifest.identitySha256) throw Error('BASE_MANIFEST_INVALID');
  if(predecessor?.schemaVersion!=='newsstand-service-predecessor-verification-v1' || predecessor.artifactIdentitySha256!==baseManifest.identitySha256 || predecessor.deploymentId!==providerBase?.id || predecessor.providerHeadId!==providerBase?.id || providerBase?.productionBranch!=='homepage-redesign') throw Error('BASE_PREDECESSOR_UNBOUND');
  const files=new Map();
  for(const f of baseManifest.files) {
    if(!validPath(f.path) || files.has(f.path) || !/^[a-f0-9]{64}$/.test(f.sha256) || !Number.isInteger(f.bytes) || f.bytes<0) throw Error('BASE_FILE_INVALID');
    files.set(f.path,f);
  }
  const provider=providerBase.files;
  if(!provider || typeof provider!=='object' || Array.isArray(provider) || !Object.keys(provider).length) throw Error('PROVIDER_FILES_MISSING');
  const staticPaths=baseManifest.files.filter(f=>!controls.includes(f.path)).map(f=>'/'+f.path).sort();
  if(JSON.stringify(Object.keys(provider).sort())!==JSON.stringify(staticPaths) || Object.values(provider).some(v=>!/^[a-f0-9]{32}$/.test(v))) throw Error('BASE_PROVIDER_PATH_MISMATCH');
  if(!Array.isArray(changedPaths) || !changedPaths.length || new Set(changedPaths).size!==changedPaths.length || changedPaths.some(p=>!validPath(p)||controls.includes(p))) throw Error('INVALID_CHANGE_SET');
  if(changedPaths.some(p=>!scope.allowedArtifactPaths.includes(p))) throw Error('CHANGE_OUTSIDE_BOUND_SCOPE');
  const staged=new Map(),preserve={...provider},delta=[];
  for(const p of changedPaths) {
    const body=boundFile(sourceDirectory,p),record={path:p,sha256:hash(body),bytes:body.length};
    if(files.get(p)?.sha256===record.sha256) continue;
    files.set(p,record); staged.set(p,body); delete preserve['/'+p]; delta.push(record);
  }
  if(!delta.length) throw Error('EMPTY_PUBLIC_DELTA');
  for(const p of controls) {
    const body=boundFile(controlDirectory,p),original=files.get(p);
    if(!original || hash(body)!==original.sha256 || body.length!==original.bytes) throw Error('PRESERVED_CONTROL_MISMATCH');
    staged.set(p,body);
  }
  // Resolve and validate all bytes before creating an output. Never overwrite prior evidence.
  if(fs.existsSync(outputDirectory)) throw Error('STAGE_OUTPUT_ALREADY_EXISTS');
  const stage=path.join(path.resolve(outputDirectory),'stage');
  fs.mkdirSync(stage,{recursive:true,mode:0o700});
  for(const [p,body] of staged) {fs.mkdirSync(path.dirname(path.join(stage,p)),{recursive:true});fs.writeFileSync(path.join(stage,p),body,{flag:'wx'});}
  const records=[...files.values()].sort((a,b)=>a.path.localeCompare(b.path));
  const manifest={schema:baseManifest.schema,createdAt:new Date().toISOString(),artifactDirectory:stage,artifactMode:'provider-preserving-overlay',baseDeploymentId:providerBase.id,fileCount:records.length,totalBytes:records.reduce((n,r)=>n+r.bytes,0),files:records,identitySha256:identity(records)};
  for(const [name,value] of Object.entries({'manifest.json':manifest,'preserve.json':preserve,'delta.json':delta,'scope.json':scope})) fs.writeFileSync(path.join(outputDirectory,name),JSON.stringify(value,null,2)+'\n',{flag:'wx',mode:0o600});
  return {stage,manifest,delta:delta.map(r=>r.path),preservedCount:Object.keys(preserve).length,deployed:false};
}

if(import.meta.url===pathToFileURL(process.argv[1]||'').href) {
  if(!process.argv[2]) throw Error('Usage: stage-newsstand-hosted-overlay.mjs <private-stage-input.json>');
  const input=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
  const result=stageOverlay(input);
  console.log(JSON.stringify({stage:result.stage,identitySha256:result.manifest.identitySha256,changedPaths:result.delta,preservedCount:result.preservedCount,deployed:false}));
}
