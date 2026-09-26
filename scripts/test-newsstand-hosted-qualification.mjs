import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {verifyHostedQualification} from './verify-newsstand-hosted-qualification.mjs';
const [input,resultDir]=process.argv.slice(2);
if(!input||!resultDir)throw Error('Private exact input and result directory required');
const bundle=JSON.parse(fs.readFileSync(input,'utf8'));
const files=Object.fromEntries(fs.readdirSync(resultDir).filter(x=>x.endsWith('.json')).map(x=>[x,fs.readFileSync(path.join(resultDir,x),'utf8')]));
const protocol=await import(pathToFileURL(path.resolve(resultDir,'protocol.mjs')).href);
const good=await verifyHostedQualification({bundle,files,protocol});
assert.equal(good.qualified,true);assert.equal(good.sampleCount,4);
for(const mutate of [
 f=>delete f[Object.keys(f).find(x=>x.endsWith('-provider.raw.json'))],
 f=>{const key=Object.keys(f).find(x=>x.endsWith('-checked.json'));f[key]+=' ';},
 f=>{const r=JSON.parse(f['calibration-result.json']);r.hosted.runId=null;f['calibration-result.json']=JSON.stringify(r);},
 f=>{const r=JSON.parse(f['calibration-result.json']);r.evaluations.pop();f['calibration-result.json']=JSON.stringify(r);},
 f=>{const key=Object.keys(f).find(x=>x.endsWith('-request.json'));f[key]='{}';}
]){const copy={...files};mutate(copy);assert.equal((await verifyHostedQualification({bundle,files:copy,protocol})).qualified,false);}
assert.equal((await verifyHostedQualification({bundle:{...bundle,registryRaw:'{}'},files,protocol})).qualified,false);
console.log('HOSTED QUALIFICATION PASS: real four judgments replay; missing, tampered, partial, wrong request and stale registry reject.');
