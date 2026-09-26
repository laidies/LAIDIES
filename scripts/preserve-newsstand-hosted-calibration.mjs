#!/usr/bin/env node
// Commit authenticated ciphertext, never drafts or judgments, to the existing repo.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {encryptPrivateEnvelope} from './newsstand-private-envelope.mjs';
const branch='ops/newsstand-hosted-20260926';
try {
  if (process.env.GITHUB_REPOSITORY!=='laidies/LAIDIES'||process.env.GITHUB_REF!=='refs/heads/'+branch) throw Error();
  const run=process.env.GITHUB_RUN_ID,attempt=process.env.GITHUB_RUN_ATTEMPT;
  if (!/^\d+$/.test(run||'')||!/^\d+$/.test(attempt||'')) throw Error();
  const dir=process.argv[2];
  if (!dir||!fs.existsSync(dir)) throw Error();
  const files={};
  for(const name of fs.readdirSync(dir)) {
    if(!/^(protocol\.mjs|calibration-result\.json|sample-[a-f0-9]{10}-(packet|request|provider\.raw|judgment|checked)\.json)$/.test(name)) throw Error();
    const full=path.join(dir,name),stat=fs.lstatSync(full);if(!stat.isFile()||stat.isSymbolicLink())throw Error();
    files[name]=fs.readFileSync(full,'utf8');
  }
  const payload=Buffer.from(JSON.stringify({schema:'newsstand-hosted-calibration-result-v1',runId:run,attempt,sourceCommit:process.env.GITHUB_SHA,files}));
  const encrypted=encryptPrivateEnvelope({payload,keyB64:process.env.NEWSSTAND_PRIVATE_HANDOFF_KEY_B64,context:'laidies-newsstand',schema:'calibration-result-v1',runPurpose:`hosted-qualification-${run}-${attempt}`});
  const destination=`operations/product-stewards/newsstand/hosted-publishing-20260926/results/${run}-${attempt}.enc`;
  const result=JSON.parse(execFileSync('gh',['api',`repos/laidies/LAIDIES/contents/${destination}`,'--method','PUT','--input','-'],{
    input:JSON.stringify({message:`Preserve encrypted hosted qualification ${run}-${attempt}`,branch,content:encrypted.toString('base64')}),encoding:'utf8',stdio:['pipe','pipe','pipe']}));
  console.log(JSON.stringify({encryptedResult:destination,commit:result.commit.sha,publicationActionTaken:false}));
} catch {console.error('PRIVATE_CALIBRATION_PRESERVATION_FAILED');process.exitCode=2;}
