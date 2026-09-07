import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {inspectProseReviewChain} from './check-prose-quality-admission.mjs';
const root=path.resolve(import.meta.dirname,'..');
const packet='operations/product-stewards/library/answer-bank-preview-20260907/';
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const digest=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const admission=read(packet+'presentation-admission.json');
function inspect(a){
 const errors=[];const check=(ok,message)=>{if(!ok)errors.push(message);};
 check(a.scope==='MISS_JEEVES_FOUR_ANSWERS_20260907','Wrong exception scope');
 check(a.ownerApproval==='yes stop asking just do','Exact owner ruling missing');
 check(a.productionReleaseApproved===false,'Preview cannot authorize production');
 check(a.origin==='https://7db5daeb.laidies-sunnyvaile.pages.dev','Unreviewed deployment');
 for(const b of a.bindings||[]){const target=path.resolve(root,b.path);check(target.startsWith(root+path.sep)&&fs.existsSync(target)&&digest(b.path)===b.sha256,'Stale binding: '+b.path);}
 for(const name of ['library.html','content/site/homepage.js',packet+'reviewed-records.json',packet+'hosted-verification.json',packet+'claude-render-v2-review.json',packet+'terra-render-v2-review.json',packet+'owner-presentation-decision.json'])check(a.bindings?.some(b=>b.path===name),'Missing required binding: '+name);
 const owner=read(packet+'owner-presentation-decision.json');check(owner.approved===true&&owner.quote===a.ownerApproval,'Owner exception not recorded');
 const claude=read(packet+'claude-render-v2-review.json'),terra=read(packet+'terra-render-v2-review.json');
 check(claude.visualVerdict==='PASS'&&claude.artifactFirst===true&&claude.inspected.length===10,'Claude exact rendered review incomplete');
 check(terra.verdict==='PASS'&&terra.independentOfUiAndContentMaker===true&&terra.screens.length===10,'Terra exact rendered review incomplete');
 check(claude.principalId!==terra.principalId&&claude.modelFamily!==terra.modelFamily,'Reviewers are not distinct');
 for(const screen of terra.screens)check(a.bindings?.some(b=>b.path===screen.path&&b.sha256===screen.sha256),'Unbound rendered evidence');
 for(const c of read(packet+'candidates.json')){const p=read(packet+c.id+'-producer-review.json'),r=read(packet+c.id+'-independent-review.json');errors.push(...inspectProseReviewChain(p,r,{root}).errors);check(r.verdict==='PASS','Text not admitted');for(const suffix of ['.txt','-manifest.json','-producer-review.json','-independent-review.json'])check(a.bindings?.some(b=>b.path===packet+c.id+suffix),'Unbound exact text review');}
 const hosted=read(packet+'hosted-verification.json');check(hosted.origin===a.origin&&hosted.answers.length===10&&hosted.browser.length===2,'Hosted candidate evidence missing');
 check(hosted.browser.every(b=>b.allFourExamples&&b.homepageContinuation&&b.noPaidIntent&&b.noRuntimeErrors&&b.noOverflow),'Hosted journey failed');
 check(hosted.assets.every(b=>a.hostedAssets?.some(x=>x.path===b.path&&x.sha256===b.sha256)),'Hosted asset binding differs');
 return errors;
}
const errors=inspect(admission);if(errors.length){console.error(errors.join('\n'));process.exit(1);}
for(const spoil of [a=>a.ownerApproval='',a=>a.bindings[0].sha256='0'.repeat(64),a=>a.origin='https://laidies.ai',a=>a.productionReleaseApproved=true]){const bad=structuredClone(admission);spoil(bad);assert(inspect(bad).length,'Admission must reject bad input');}
console.log('ADMITTED FOR OWNER PREVIEW — exact two-reviewer exception; four negative cases rejected.');
console.log(admission.origin+'/library.html#miss-jeeves');
