#!/usr/bin/env node
// Compile the existing production contract and source work into one writer input.
// This prepares drafting; it never certifies the resulting prose or publishes it.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {inspectContentProducerContract} from './check-content-producer-contract.mjs';
import readerContract from '../content/newsstand-reader-contract.js';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const registryPath='operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json';
const read=(root,p)=>fs.readFileSync(path.join(root,p),'utf8');
function bound(root,b){
 const resolved=path.resolve(root,b?.path||'');
 if(!resolved.startsWith(path.resolve(root)+path.sep)||!fs.realpathSync(resolved).startsWith(fs.realpathSync(root)+path.sep))throw Error('Draft source must stay in the repository');
 const bytes=read(root,b.path);if(hash(bytes)!==b.sha256)throw Error('Draft input changed: '+b.path);return bytes;
}

export const WRITING_METHOD=`You are the LAiDIES NewsStand producer. Your job is to finish an accurate, memorable article for smart professional women with no technical AI background. The independent editor is the backstop, not your drafting partner.

Use the supplied research and reader purpose to build the explanation before polishing sentences. Resolve source contradictions or missing essential facts now; never fill them with a plausible guess. Keep what is observed, reported, inferred and unknown distinct. Answer the real reader question, not just the source's headline.

Draft in this order:
1. Establish what changed, when, and why this reader has a reason to care. Use a precise headline whose claim the article supports. Keep event, reporting and publication dates distinct.
2. Follow the smallest important mechanism link by link. Show what went in, what happened, what changed and what did not. Put ordinary meaning before each necessary technical term. Explain it where it matters, not in a detached glossary. Check the term inventory against the entire draft, including the headline, examples and class notes.
3. Anticipate the next questions a thoughtful reader would ask: how do we know, what is being overstated, does this affect me, what remains uncertain, and what can I do or ask? Answer them naturally in the story. The selected reporting module supplies additional questions; do not leave the answers only in private notes.
4. Make the invisible process recognizable with one faithful everyday or Rewind Era comparison when it improves understanding or recall. Map the comparison back to the actual mechanism and preserve its limit. Warmth, curiosity and a small earned joke can make the explanation enjoyable. Neither compulsory nostalgia nor dry compliance prose meets the job.
5. Give a specific, proportionate action only when it follows from the evidence. Show what to check or ask and why. Do not manufacture account settings, promised benefits, a checklist or a women's angle the evidence does not support. Give women useful understanding and agency across work, life and public discussion.
6. Link the exact relevant LAiDIES lesson and state what it helps the reader learn. Keep commercially distinctive LAiDIES methods, internal instructions and production details private. Preserve the established public article sections; do not expose the drafting worksheet.

Before handing off, read the whole article as a continuous piece. Explain its mechanism in two ordinary sentences without consulting the source, and apply it to a different situation. Scan every necessary term, every consequential claim and every promised answer. Split compound factual sentences into their separate claims: an excerpt proving a date does not also prove who was involved, a comparison or a named example. Carry the complete collected source passages into the editor's packet, including supplementary excerpts and their limitations; do not shorten away the evidence the finished draft relies on. A single real source may support several claims. Repair unclear causal steps, missing explanations, unsupported certainty, repetition, generic advice and a joke that adds no understanding yourself. Then read the repaired complete article once. Record only the actual repairs and any unresolved source gap in the existing producer self-review; do not manufacture PASS observations from this checklist.

Return the finished story fields, its claim-to-source map, the exact translation/term/learning-link entries used by the existing story-type contract, and your honest producer self-review. Return HOLD with the precise evidence gap when essential facts cannot be supported. Do not generate hashes, timestamps, repeated schema boilerplate, a new review procedure or an independent-review verdict; the existing tools handle bookkeeping. One independent decision follows a producer-clean artifact. A repair preserves all unaffected work and returns only the changed artifact to that decision.`;

export function prepareDraft(contract,{root=ROOT,reportingFrame=null,sourcePacket=null}={}){
 const check=inspectContentProducerContract(contract,{root});
 if(check.errors.length||contract.status!=='READY_TO_DRAFT')throw Error('Repair production inputs before drafting: '+check.errors.join(' | '));
 if(contract.contentClass!=='NEWS')throw Error('This writer input is for NEWS only');
 const registry=JSON.parse(read(root,registryPath));
 const inputs=[];
 const add=(binding,kind)=>{const text=bound(root,binding);inputs.push({kind,...binding,text});};
 for(const c of contract.canonicalTruth)add(c.source,'verified-source');
 if(sourcePacket)add(sourcePacket,'additional-primary-evidence');
 const exemplars=contract.positiveExemplars.map(use=>{
  const registered=registry.positiveExemplars.find(e=>e.id===use.id);
  const ref=use.preservedArtifact?{...registered,path:use.preservedArtifact.path}:registered;
  const raw=bound(root,ref);let artifact=raw;
  if(ref.locator&&ref.path.endsWith('.js')){const context={window:{}};vm.runInNewContext(raw,context,{timeout:1000});artifact=context.window.NEWSSTAND_DATA?.stories?.find(s=>s.id===ref.locator);if(!artifact)throw Error('Positive reference locator is missing');}
  return {strengths:use.strengthsToUse,doNotCopy:use.patternsNotToCopy,limits:ref.limits,artifact};
 });
 const negatives=registry.negativeExemplars.map(ref=>({failureFamilies:ref.failureFamilies,scope:ref.appliesTo,artifact:bound(root,ref)}));
 const unique=[...new Map(inputs.map(i=>[i.path,i])).values()];
 const packet={schemaVersion:'laidies-newsstand-writer-input.v1',candidateId:contract.candidateId,method:WRITING_METHOD,reader:contract.readerContract,explanationPlan:contract.draftArchitecture,communication:contract.communicationDesign,communicationBenchmark:bound(root,contract.communicationDesign.benchmark),reportingFrame,prevention:contract.knownFailurePreflight.dispositions,positiveExamples:exemplars,negativeExamples:negatives,sources:unique,sourceCoverageClaim:'Only the supplied bound evidence; no claim of comprehensive news discovery.',outputBoundary:'PRIVATE_PRODUCER_ARTIFACT_REQUIRES_SELF_REVIEW_AND_INDEPENDENT_ADMISSION'};
 return {packet,bindings:[{path:registryPath,sha256:hash(read(root,registryPath))},...unique.map(({path,sha256})=>({path,sha256}))]};
}

// Presence and identity checks only. An editor still judges whether the answers
// are accurate, clear and useful; matching a passage cannot prove those qualities.
export function inspectPreparedDraft(story,input,observations){
 const packet=input.packet||input;
 const errors=[];
 const prose=['headline','the_story','laidies_read','what_this_means','cocktail_party','class_notes'].map(k=>story[k]||'').join('\n').replace(/<[^>]*>/g,'').replace(/\s+/g,' ');
 const require=(ok,msg)=>{if(!ok)errors.push(msg)};
 require(story.id===packet.candidateId,'Writer input belongs to a different story');
 for(const error of readerContract.validatePublishedStoryImage({...story,status:'published'},story.slug||story.id||'story'))errors.push(error);
 require(observations?.completeTextRead===true,'Producer must read the complete current draft');
 require(observations?.storySha256===hash(JSON.stringify(story)),'Producer observations bind a different draft');
 require(Array.isArray(packet.explanationPlan?.readerQuestions)&&packet.explanationPlan.readerQuestions.length>0,'Writer must identify the reader questions before drafting');
 require(Array.isArray(packet.explanationPlan?.requiredTerms),'Writer must explicitly inventory necessary terms');
 for(const q of packet.explanationPlan?.readerQuestions||[]){
  const answer=observations?.readerAnswers?.[q.id];
  require(typeof answer==='string'&&answer.length>=15&&prose.includes(answer),'Reader answer missing from prose: '+q.id);
 }
 for(const entry of packet.explanationPlan?.requiredTerms||[]){
  const term=entry.term;const meaning=observations?.terms?.[term];
  require(typeof meaning==='string'&&meaning.length>=15&&prose.includes(meaning),'Term meaning missing from prose: '+term);
 }
 for(const key of ['explainBack','unseenTransfer'])require(typeof observations?.[key]==='string'&&observations[key].length>=40,'Producer reasoning is missing: '+key);
 require(Array.isArray(observations?.unresolvedIssues)&&observations.unresolvedIssues.length===0,'Producer has unresolved issues');
 return {errors,qualityVerdict:null};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const [contractPath,outputPath,framePath,evidencePath]=process.argv.slice(2);
 if(!contractPath||!outputPath)throw Error('Use: prepare-newsstand-draft.mjs contract.json private-output.json [story-type-coverage.json] [primary-evidence.json]');
 const privateRoot=path.join(ROOT,'operations/product-stewards')+path.sep;
 const target=path.resolve(ROOT,outputPath);
 if(!target.startsWith(privateRoot))throw Error('Draft input must remain private');
 const extra=evidencePath?{path:evidencePath,sha256:hash(read(ROOT,evidencePath))}:null;
 const value=prepareDraft(JSON.parse(read(ROOT,contractPath)),{reportingFrame:framePath?JSON.parse(read(ROOT,framePath)):null,sourcePacket:extra});
 const output=JSON.stringify({...value,producerContract:{path:contractPath,sha256:hash(read(ROOT,contractPath))}},null,2)+'\n';
 fs.mkdirSync(path.dirname(target),{recursive:true});
 if(!fs.realpathSync(path.dirname(target)).startsWith(fs.realpathSync(path.join(ROOT,'operations/product-stewards'))+path.sep))throw Error('Draft output resolves outside private storage');
 if(fs.existsSync(target)&&fs.readFileSync(target,'utf8')!==output)throw Error('Existing writer input differs; preserve it and use a successor path');
 fs.writeFileSync(target,output);console.log(JSON.stringify({status:'DRAFT_INPUT_PREPARED',candidateId:value.packet.candidateId,sources:value.packet.sources.length,output:outputPath,qualityVerdict:null}));
}
