#!/usr/bin/env node
// Wrap an unchanged reviewed candidate only after an actual next-day source
// and development check. This never invents that check or changes public files.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {sha256, readCandidateBinding, validateOrdinaryStoryCandidate} from './validate-newsstand-ordinary-story-candidate.mjs';
import {readPrivateNewsstandBinding} from './lib/newsstand-overnight-freshness.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
// Copy settled identities and the complete source checklist; never pre-fill a
// check, evidence, timestamp or unchanged verdict that has not happened.
export function prepareOvernightFreshnessTemplate(candidateBinding,{root=ROOT}={}) {
  const original=JSON.parse(readPrivateNewsstandBinding(root,candidateBinding,'reviewed evening candidate'));
  if(original.overnightFreshness)throw Error('A morning template must start from the original reviewed candidate, not an overnight wrapper');
  validateOrdinaryStoryCandidate(original,{root});
  const tomorrow=new Date(original.editionDate+'T12:00:00Z');tomorrow.setUTCDate(tomorrow.getUTCDate()+1);
  return {
    schemaVersion:'laidies-newsstand-overnight-freshness.v1',candidateId:original.candidateId,
    storySha256:original.storySha256,publicationDate:tomorrow.toISOString().slice(0,10),
    reviewedCandidate:structuredClone(candidateBinding),independentReview:structuredClone(original.reviewEvidence.independent),claimMap:structuredClone(original.claimMap),
    disposition:'NOT_CHECKED',checker:null,checkedAt:null,
    sourceChecks:original.sources.map(source=>({id:source.id,url:source.url,originalEvidence:structuredClone(source.evidence),disposition:'NOT_CHECKED',explanation:null,currentCheckedAt:null,currentEvidence:null,currentExcerpt:null})),
    developmentCheck:{disposition:'NOT_CHECKED',query:null,explanation:null,checkedAt:null,evidence:null,currentExcerpt:null}
  };
}

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
    const templateSource=arg('--template-from'),freshnessSource=arg('--freshness'),source=templateSource||freshnessSource,output=arg('--output');
    if(!source||!output||Boolean(templateSource)===Boolean(freshnessSource))throw Error('Use either --template-from original-reviewed-candidate.json or --freshness actual-private-morning-check.json, with --output private-new-file.json');
    const sourcePath=path.resolve(ROOT,source),target=path.resolve(ROOT,output);
    const privateRoot=path.join(ROOT,'operations/product-stewards/newsstand/candidates')+path.sep;
    if(!target.startsWith(privateRoot))throw Error('Overnight candidate output must remain in private NewsStand candidates');
    const raw=fs.readFileSync(sourcePath,'utf8');
    const binding={path:path.relative(ROOT,sourcePath).split(path.sep).join('/'),sha256:sha256(raw)};
    const candidate=templateSource?prepareOvernightFreshnessTemplate(binding):prepareOvernightCandidate(binding);
    const bytes=JSON.stringify(candidate,null,2)+'\n';
    fs.mkdirSync(path.dirname(target),{recursive:true});
    if(!fs.realpathSync(path.dirname(target)).startsWith(fs.realpathSync(privateRoot)+path.sep))throw Error('Private candidate output resolves outside its store');
    const exists=fs.existsSync(target);
    if(exists&&fs.readFileSync(target,'utf8')!==bytes)throw Error('Preserve the existing candidate; use a successor output path');
    if(!exists)fs.writeFileSync(target,bytes,{flag:'wx'});
    console.log(JSON.stringify({status:templateSource?'FRESHNESS_TEMPLATE_ONLY_NOT_CHECKED':'READY_FOR_ISSUE_ADMISSION',candidateId:candidate.candidateId,editionDate:candidate.editionDate||candidate.publicationDate,output,sha256:sha256(bytes),reused:exists,publicMutation:false}));
  } catch(error) {console.error('OVERNIGHT PREPARATION HOLD: '+error.message);process.exitCode=1;}
}
