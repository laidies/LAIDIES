#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {stageOverlay} from './stage-newsstand-hosted-overlay.mjs';
const root=fs.mkdtempSync(path.join(os.tmpdir(),'newsstand-overlay-'));
const source=path.join(root,'source'),control=path.join(root,'control');fs.mkdirSync(source);fs.mkdirSync(control);
const h=b=>crypto.createHash('sha256').update(b).digest('hex');
const record=(p,b)=>({path:p,bytes:Buffer.byteLength(b),sha256:h(b)});
fs.writeFileSync(path.join(source,'newsstand.html'),'new');
for(const p of ['_worker.js','_redirects']) fs.writeFileSync(path.join(control,p),p);
const files=[record('index.html','home'),record('newsstand.html','old'),record('_worker.js','_worker.js'),record('_redirects','_redirects')];
const base={schema:'laidies-release-artifact-manifest/v1',files,identitySha256:h(files.map(f=>`${f.sha256}  ${f.path}\n`).join(''))};
const provider={id:'fixture-head',productionBranch:'homepage-redesign',files:{'/index.html':'a'.repeat(32),'/newsstand.html':'b'.repeat(32)}};
const scope={schema:'laidies.newsstand-production-scope.v1',project:'laidies-sunnyvaile',productionBranch:'homepage-redesign',allowedArtifactPaths:['newsstand.html']};
const input={baseManifest:base,providerBase:provider,scope,predecessor:{schemaVersion:'newsstand-service-predecessor-verification-v1',deploymentId:provider.id,providerHeadId:provider.id,artifactIdentitySha256:base.identitySha256},sourceDirectory:source,controlDirectory:control,changedPaths:['newsstand.html'],outputDirectory:path.join(root,'good')};
const result=stageOverlay(input);assert.deepEqual(result.delta,['newsstand.html']);assert.equal(result.preservedCount,1);assert.equal(result.deployed,false);
assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root,'good/preserve.json'))),{'/index.html':'a'.repeat(32)});
assert.equal(result.manifest.files.find(f=>f.path==='index.html').sha256,h('home'));
for(const change of [
  {providerBase:{...provider,id:'different'}},
  {providerBase:{...provider,files:{'/newsstand.html':'b'.repeat(32)}}},
  {changedPaths:['../secret']},{changedPaths:['_worker.js']},
  {changedPaths:['index.html']},{changedPaths:['assets/unapproved.png']},{scope:null},
  {baseManifest:{...base,identitySha256:'0'.repeat(64)}}
]) assert.throws(()=>stageOverlay({...input,outputDirectory:path.join(root,'bad'),...change}));
assert.throws(()=>stageOverlay(input),/ALREADY_EXISTS/);
fs.writeFileSync(path.join(control,'_worker.js'),'changed');
assert.throws(()=>stageOverlay({...input,outputDirectory:path.join(root,'bad-control')}),/CONTROL_MISMATCH/);
assert.equal(fs.existsSync(path.join(root,'bad-control')),false);
fs.rmSync(root,{recursive:true,force:true});
console.log('HOSTED OVERLAY PASS: exact predecessor, preserved site/control bytes, invalid paths and changed worker rejected; no deployment.');
