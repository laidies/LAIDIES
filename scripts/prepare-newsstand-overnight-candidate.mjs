#!/usr/bin/env node
// Wrap an unchanged reviewed candidate only after an actual next-day source
// and development check. This never invents that check or changes public files.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {sha256, readCandidateBinding, validateOrdinaryStoryCandidate} from './validate-newsstand-ordinary-story-candidate.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function prepareOvernightCandidate(freshnessBinding,{root=ROOT,now=new Date().toISOString()}={}) {
  const record=JSON.parse(readCandidateBinding(root,freshnessBinding,'overnight freshness record'));
  const original=JSON.parse(readCandidateBinding(root,record.reviewedCandidate,'reviewed evening candidate'));
  const candidate={...original,editionDate:record.publicationDate,overnightFreshness:freshnessBinding};
  validateOrdinaryStoryCandidate(candidate,{root,now});
  return candidate;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const arg=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1]};
    const source=arg('--freshness'),output=arg('--output');
    if(!source||!output)throw Error('Use --freshness private-morning-check.json --output private-candidate.json');
    const sourcePath=path.resolve(ROOT,source),target=path.resolve(ROOT,output);
    const privateRoot=path.join(ROOT,'operations/product-stewards/newsstand/candidates')+path.sep;
    if(!target.startsWith(privateRoot))throw Error('Overnight candidate output must remain in private NewsStand candidates');
    const raw=fs.readFileSync(sourcePath,'utf8');
    const binding={path:path.relative(ROOT,sourcePath).split(path.sep).join('/'),sha256:sha256(raw)};
    const candidate=prepareOvernightCandidate(binding);
    const bytes=JSON.stringify(candidate,null,2)+'\n';
    fs.mkdirSync(path.dirname(target),{recursive:true});
    if(!fs.realpathSync(path.dirname(target)).startsWith(fs.realpathSync(privateRoot)+path.sep))throw Error('Private candidate output resolves outside its store');
    const exists=fs.existsSync(target);
    if(exists&&fs.readFileSync(target,'utf8')!==bytes)throw Error('Preserve the existing candidate; use a successor output path');
    if(!exists)fs.writeFileSync(target,bytes,{flag:'wx'});
    console.log(JSON.stringify({status:'READY_FOR_ISSUE_ADMISSION',candidateId:candidate.candidateId,editionDate:candidate.editionDate,output,sha256:sha256(bytes),reused:exists,publicMutation:false}));
  } catch(error) {console.error('OVERNIGHT PREPARATION HOLD: '+error.message);process.exitCode=1;}
}
