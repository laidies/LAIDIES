import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {imitationPatterns,checkArtworkSources} from './check-decorative-artwork-rule.mjs';
const rejected='.cf-section-head{background-image:radial-gradient(circle,rgba(17,24,59,.15) 1px,transparent 1.5px)} .cf-routebar>a{clip-path:polygon(0 0,94% 0,100% 50%,94% 100%,0 100%)} .cf-section-head h2{transform:rotate(-2deg)}';
assert.equal(imitationPatterns(rejected).length,3);
assert.equal(imitationPatterns(':root{--fake:radial-gradient(circle,blue 1px,transparent 2px)}.cf-section-head{background-image:var(--fake)}').length,1);
assert.equal(imitationPatterns('<svg class="icon cf-route-art"></svg>').length,1);
assert.equal(imitationPatterns('.becky{clip-path:inset(0 0 20px);object-fit:contain}.layout{display:grid;background:linear-gradient(110deg,pink,blue)}').length,0);
assert.ok(checkArtworkSources([],process.cwd()).length);
assert.equal(imitationPatterns('.loading{transform:rotate(90deg)} .approved-portrait{clip-path:polygon(0 0,100% 0,100% 100%);transform:rotate(-2deg)}').length,0);
assert.ok(checkArtworkSources([{path:'missing.css',sha256:'bad'}],process.cwd()).length);
console.log('PASS: rejected ticket/halftone/rotation detected; layout, gradients and image cropping retained; missing sources fail closed');

const temp=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-artwork-boundary-'));
try {
 const checker=path.resolve('scripts/check-design-review-admission.mjs');
 const write=(name,bytes)=>{fs.writeFileSync(path.join(temp,name),bytes);return {path:name,sha256:crypto.createHash('sha256').update(bytes).digest('hex')};};
 const bad=write('bad.css',rejected),good=write('good.css','.loading{transform:rotate(90deg)}');
 assert.equal(checkArtworkSources([bad],temp).length,3);
 assert.deepEqual(checkArtworkSources([good],temp),[]);
 assert.match(checkArtworkSources([{...good,sha256:'0'.repeat(64)}],temp).join(' '),/stale source binding/);
 const cli=spawnSync(process.execPath,[checker,'--artwork-preflight','bad.css'],{cwd:temp,encoding:'utf8'});
 assert.equal(cli.status,1);assert.equal(JSON.parse(cli.stdout).failures.length,3);
 assert.equal(JSON.parse(cli.stdout).scope,'artwork-source-preflight-only');
 const clean=spawnSync(process.execPath,[checker,'--artwork-preflight','good.css'],{cwd:temp,encoding:'utf8'});
 assert.equal(clean.status,0);assert.equal(JSON.parse(clean.stdout).result,'NO_KNOWN_SIGNATURE');
 write('rejections.json',JSON.stringify({rejections:[]}));
 function admission(type,sources){
  write('queue.json',JSON.stringify({review_now:[{id:'boundary',review_type:type,design_admission:{gates:{decorative_discipline:{artwork_sources:sources}}}}]}));
  const result=spawnSync(process.execPath,[checker,'--fixture'],{cwd:temp,encoding:'utf8',env:{...process.env,LAIDIES_QUEUE_PATH:'queue.json',LAIDIES_REJECTIONS_PATH:'rejections.json'}});
  assert.equal(result.status,1,'incomplete admission must remain held');
  assert.doesNotMatch(result.stderr,/TypeError|ReferenceError/);
  return result.stdout+result.stderr;
 }
 assert.match(admission('building_page_visual',[bad]),/rejected Chick Flicks implementation signature/);
 assert.match(admission('building_page_visual',undefined),/artwork implementation source bindings are required/);
 assert.doesNotMatch(admission('building_page_visual',[good]),/rejected Chick Flicks implementation signature|artwork implementation source bindings are required/);
 assert.doesNotMatch(admission('building_page_visual_concept',undefined),/artwork implementation source bindings are required/);
 console.log('PASS: exact/stale bindings, CLI rejection, admission wiring and image-only boundary; incomplete admission remains held');
} finally {fs.rmSync(temp,{recursive:true,force:true});}
