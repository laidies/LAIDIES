import assert from 'node:assert/strict';
import crypto from 'node:crypto';
export const sha = text => crypto.createHash('sha256').update(text).digest('hex');
export const FAMILY = {
 glossaryAccumulation:'Separate definitions accumulate without connecting how the system works.',
 templateRepetition:'Repeated paragraph scaffolds replace a developing explanation.',
 decorativeAnalogy:'A familiar comparison adds flavour but fails to explain a specific causal mechanism.',
 referenceConfetti:'Pop-culture or other references accumulate without a useful explanatory job.',
 missingMechanism:'The reader gets labels or conclusions without the necessary causal steps.',
 genericAction:'Advice such as verify or be careful lacks a concrete useful action for this case.',
 jargonBeforeMeaning:'Necessary technical language is left unexplained in its first meaningful context.',
 disconnectedSystem:'Parts are named separately without showing how information or effects move between them.',
 factlessConfidence:'Certainty exceeds the evidence actually available.',
 staleUnreviewableClaims:'A material time-sensitive claim cannot be traced and checked for its stated date.',
 corporateSludge:'Vague corporate or motivational language obscures the concrete meaning.',
 joylessInstruction:'The prose becomes a dry checklist or terminology manual with little human interest.',
 benchmarkNameDrop:'Mentioning a communication benchmark or famous explainer substitutes for clear explanation.',
 curiosityWithoutPayoff:'A hook raises curiosity but never delivers the promised explanation.',
 familiarExampleWithoutTechnicalReturn:'A familiar example never reconnects to the actual technical mechanism.',
 communicationPastiche:'Wording, persona or mannerisms imitate a communicator instead of original clear explanation.',
 entertainmentBeforeUnderstanding:'Humour or spectacle gets in the way of understanding.',
 mechanismCompressedBehindHook:'The hook occupies the piece while the causal explanation is rushed.',
 prematureClickBeforeMechanism:'The conclusion or reveal is asserted before its explanation earns understanding.',
 inflatedTakeawayEnding:'The ending inflates a bounded finding into a grand claim or moral.',
 purposeTooNarrow:'The scope is narrower than the supplied reader job; one task becomes the whole purpose.',
 mechanismBeforeMotivation:'Technical machinery begins before the artifact establishes the destination-level human reason for this knowledge. Stakes inside one worked example do not satisfy this when the destination promises broader cross-context orientation; the reader must first see why the knowledge matters beyond that example.',
 workedExampleOvertakesBookPurpose:'One worked example crowds out the broader foundational orientation the book promises.',
 technicalExplainerVoice:'The organising perspective is specialist taxonomy or workflow inspection instead of the reader orientation promised by the destination. Judge what the prose asks the reader to care about, not just friendly vocabulary: for a broad foundational opening, second-person warmth and a lived example do not clear this defect when tracing technical operations remains the main reason for learning, without the promised practical and civic orientation. In a bounded news report or how-to, explaining its specific mechanism can be exactly the right perspective.'
};
export const OUTCOMES = {
 plainClarity:'A smart reader without technical AI training can follow each sentence.',
 readerValue:'The reader gains a useful understanding or decision beyond the headline.',
 laidiesVoice:'Warm, candid, adult, conversational LAiDIES voice; no condescension or borrowed persona.',
 engagingEnjoyable:'The human question and explanation sustain interest; humour is earned rather than mandatory.',
 factualIntegrity:'Material claims are supported by the actual sources and correctly attributed.',
 freshnessReviewability:'The event, reporting date and limitations make time-sensitive claims checkable.',
 surfaceFit:'A dated news article answers what happened and why it matters within its proper scope.',
 datedChange:'Old events are distinguished from newly reported evidence or responses.',
 consequenceAndUncertainty:'Consequences are concrete and uncertainty survives the explanation.',
 dailyLifeConnection:'A familiar work/life situation helps the professional reader understand the mechanism.',
 communicationBenchmark:'Human purpose, concrete causality and a useful next question; no imitation of Hannah Fry.',
 explainBack:'The mechanism supports an accurate answer to a causal question in ordinary language.',
 unseenTransfer:'The mechanism can be applied to a genuinely new concrete situation absent from the article.',
 usefulAction:'A specific proportionate action follows from the explanation where applicable.',
 analogyIntegrity:'Each comparison maps the mechanism accurately and retains relevant limits.'
};
export const FACT_OUTCOMES=['factualIntegrity','freshnessReviewability','datedChange','consequenceAndUncertainty'];
export const READER_OUTCOMES=Object.keys(OUTCOMES).filter(k=>!FACT_OUTCOMES.includes(k));
export const NEWS_CHECKS={incidentExplained:'The actual incident and relevant causal sequence are understandable.',termsExplainedInContext:'Necessary AI terms gain plain meaning at first meaningful use.',readerConsequenceSpecific:'The consequence is grounded in a recognizable specific reader situation.',noInternalNotesOrInventedAdvice:'No internal LAiDIES operating notes, commercially distinctive process details, or unsupported advice appear.'};
const clean=s=>s.replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&nbsp;',' ').replaceAll('&quot;','"').replaceAll('&#39;',"'");
export function paragraphs(text) {
 const spans=text.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean);
 return spans.map((s,i)=>({id:`P${String(i+1).padStart(3,'0')}`,text:clean(s),exact:s}));
}
export function storyParagraphs(story) {
 const fields=['headline','dek','the_story','laidies_read','what_this_means','cocktail_party','class_notes'];
 const result=[];
 for(const field of fields) if(typeof story[field]==='string'&&story[field]) {
   let chunks=story[field].match(/<p\b[^>]*>[\s\S]*?<\/p>/gi)||[story[field]];
   const words=s=>clean(s).replace(/\s+/g,'').trim();
   if(words(chunks.join(''))!==words(story[field]))chunks=[story[field]];
   for(const s of chunks)result.push({id:`P${String(result.length+1).padStart(3,'0')}`,text:clean(s),exact:JSON.stringify(s).slice(1,-1),field});
 }
 return result;
}
const string={type:'string',minLength:15};
function object(properties){return{type:'object',properties,required:Object.keys(properties),additionalProperties:false}}
function assessment(ids,states){return object({state:{type:'string',enum:states},reason:string,passages:{type:'array',items:{type:'string',enum:ids},minItems:states.includes('clear')?0:1,maxItems:3}})}
function matrix(keys,ids,states){return object(Object.fromEntries(keys.map(k=>[k,assessment(ids,states)])))}
const attest=object({artifactFirst:{type:'boolean'},independentFromMaker:{type:'boolean'},completeTextRead:{type:'boolean'}});
const probe=object({question:string,answer:string,expectedEvidence:string,assessment:string});
const transfer=object({scenario:string,question:string,answer:string,expectedEvidence:string,assessment:string});
const learning=object({disposition:{type:'string',enum:['NO_NEW_DEFECT','CANDIDATE_REPAIR_ONLY','EVIDENCE_GAP']},rationale:string});
const reverse=object(Object.fromEntries(['humanQuestion','promisedPayoff','centralMentalModel','dailyLifeConnection','surfaceJob','desiredReaderFeeling'].map(k=>[k,string])));
export function requestFor(kind,packet) {
 if(kind==='editorial') {
  const reader=requestFor('reader',packet),facts=requestFor('facts',packet);
  const outputSchema=object({reader:reader.outputSchema,facts:facts.outputSchema});
  const message=`Read the COMPLETE ARTIFACT first:\n${packet.completeArtifact}\n\nEXACT PASSAGE REFERENCES:\n${packet.paragraphs.map(p=>`[${p.id}] ${p.text}`).join('\n\n')}\n\nAssess this complete dated NEWS article for ${packet.readerJob}. Check every material factual claim against the supplied source excerpts, retaining attribution and limits. Independently judge reader comprehension and editorial craft. Supply an actual causal explain-back and invent and solve a new transfer scenario absent from this article. These are AI editorial analyses, never observed humans. Do not inherit the maker's conclusions; none are supplied.\n\nRUBRIC AND EVIDENCE:\n${JSON.stringify({communicationAuthority:packet.communicationAuthority,failureDefinitions:FAMILY,outcomeDefinitions:OUTCOMES,newsCheckDefinitions:NEWS_CHECKS,claims:packet.claims,sources:packet.sources})}\n\nReturn reader and facts objects matching the supplied output schema. Give concise specific reasons with actual paragraph references. Clear failure-family judgments may use an empty reference list for absence across the whole artifact. Present/uncertain families and every outcome/claim require supporting paragraphs. Each fact must use source IDs belonging to that claim. Each reader/facts learningDisposition must be NO_NEW_DEFECT only if that part has no failed or uncertain assessment; otherwise use candidate repair or evidence gap. You are independent from artifact maker OpenAI /root. Attest truthfully to reading the complete artifact first and independence. Do not inspect earlier verdicts or diagnose paperwork.`;
  return {...reader,outputSchema,messages:[reader.messages[0],{role:'user',content:message}],max_completion_tokens:8500};
 }
 const ids=packet.paragraphs.filter(p=>p.exact.length>=15).map(p=>p.id);
 let schema,job;
 if(kind==='calibration') {
  schema=object({attestations:attest,families:matrix(Object.keys(FAMILY),ids,['clear','present','uncertain']),strengths:{type:'array',items:string,minItems:1,maxItems:4},summary:string});
  job='Assess editorial craft against the supplied reader job. This is a blind sample: no expected verdict is supplied. Identify every actual failure, without inventing defects merely because a rubric names them. Review explanation and voice, not current external factual accuracy. Sources are not supplied for factual checking in this calibration. A relevant technical term explained in context is not itself jargon. A useful bounded worked example is not automatically too narrow: compare it with the stated purpose.';
 } else if(kind==='reader') {
  schema=object({attestations:attest,reverseBrief:reverse,outcomes:matrix(READER_OUTCOMES,ids,['pass','hold','fail']),newsChecks:matrix(Object.keys(NEWS_CHECKS),ids,['pass','hold','fail']),families:matrix(Object.keys(FAMILY),ids,['clear','present','uncertain']),explainBack:probe,unseenTransfer:transfer,learningDisposition:learning,summary:string});
  job='Assess only the article in front of you for reader understanding, useful action, LAiDIES voice and applicable craft defects. Answer the causal explain-back question yourself. Then invent a genuinely NEW concrete situation absent from the article, pose a question about it, and reason through the answer using the taught mechanism. Do not ask whether the article contains an example and do not repeat its example. These are explicitly AI editorial analyses, never human-reader observations. Source accuracy is assessed separately: do not call absence of a source packet here an article defect, and do not certify facts you have not checked.';
 } else if(kind==='facts') {
  schema=object({attestations:attest,claims:object(Object.fromEntries(packet.claims.map(c=>[c.claimId,object({state:{type:'string',enum:['supported','qualified','hold','contradicted']},reason:string,passages:{type:'array',items:{type:'string',enum:ids},minItems:1},sourceIds:{type:'array',items:{type:'string',enum:packet.sources.map(s=>s.id)},minItems:1}})]))),outcomes:matrix(FACT_OUTCOMES,ids,['pass','hold','fail']),learningDisposition:learning,summary:string});
  job='Check every material claim against the supplied independently collected source evidence. Evaluate exact wording and attribution, dates, inference and limits. A report may accurately attribute preliminary research without independently authenticating the incident. Do not require company approval or unavailable internal traces. Hold any material claim that these sources cannot support. Distinguish the underlying event from what a source reports. Do not copy assessments from the maker; none are supplied.';
 } else throw Error('Unknown review kind');
 const payload={readerJob:packet.readerJob,purposeAuthority:packet.purposeAuthority,communicationAuthority:packet.communicationAuthority,paragraphs:packet.paragraphs.map(({id,text})=>({id,text})),...((kind==='reader'||kind==='calibration')?{failureDefinitions:FAMILY}:{}),...(kind==='reader'?{outcomeDefinitions:Object.fromEntries(READER_OUTCOMES.map(k=>[k,OUTCOMES[k]])),newsCheckDefinitions:NEWS_CHECKS}:{}),...(kind==='facts'?{claims:packet.claims,sources:packet.sources,outcomeDefinitions:Object.fromEntries(FACT_OUTCOMES.map(k=>[k,OUTCOMES[k]]))}:{})};
 const compactSchema=JSON.stringify(schema, (key,value)=>key==='enum'&&Array.isArray(value)&&value.every(v=>/^P\d{3}$/.test(v))?['select an actual paragraph ID from the article']:value);
 const message=`Read the COMPLETE ARTIFACT first:\n${packet.completeArtifact||packet.paragraphs.map(p=>`[${p.id}] ${p.text}`).join('\n\n')}${packet.completeArtifact?'\n\nEXACT PASSAGE REFERENCES:\n'+packet.paragraphs.map(p=>`[${p.id}] ${p.text}`).join('\n\n'):''}\n\nTASK:\n${job}\n\nREADER JOB AND RUBRIC / EVIDENCE:\n${JSON.stringify({...payload,paragraphs:undefined})}\n\nOUTPUT CONTRACT (all required keys; each reason is one concise sentence):\n${compactSchema}\n\nReturn only the requested judgments as a compact JSON object. For each judgment select the paragraph IDs that actually support your reason. A clear failure-family judgment may instead use an empty passage array to assess absence across the complete artifact; present or uncertain failures and all outcomes/claims require actual passages. Cite at least one real passage somewhere in the calibration. IDs are references, not preassigned answers. Code will attach exact passages and metadata. No overall verdict, dates, file paths or hashes are requested. For article reviews, NO_NEW_DEFECT is valid only when every required assessment passes; otherwise identify candidate repair or evidence gap without inventing a registered learning. You are an independent reviewer; the artifact maker is OpenAI /root. Attest truthfully. Do not read prior reviews, imitate their verdicts, or diagnose review paperwork.`;
 return{outputSchema:schema,messages:[{role:'system',content:'You are an independent editorial reviewer. Inspect the exact artifact before judging. Be specific, proportionate and honest. A real defect, insufficient evidence and an execution failure are different. Return final structured judgments only; never invent human observations.'},{role:'user',content:message}],response_format:{type:'json_object'},max_completion_tokens:5000,temperature:0.05,chat_template_kwargs:{enable_thinking:false}};
}
export function normalize(kind,result,packet) {
 if(kind==='editorial') {
  assert.deepEqual(Object.keys(result).sort(),['facts','reader'],'Missing or extra editorial sections');
  const reader=normalize('reader',result.reader,packet),facts=normalize('facts',result.facts,packet);
  return {reader,facts,verdict:[reader,facts].some(r=>r.verdict==='REJECT')?'REJECT':[reader,facts].some(r=>r.verdict==='HOLD')?'HOLD':'PASS'};
 }
 assert.ok(!Object.hasOwn(result,'verdict'),'Reviewer supplied an unrequested overall verdict');
 assert.equal(result.attestations?.artifactFirst,true,'Artifact-first attestation missing');
 assert.equal(result.attestations?.independentFromMaker,true,'Independence attestation missing');
 assert.equal(result.attestations?.completeTextRead,true,'Complete-text attestation missing');
 const lookup=new Map(packet.paragraphs.map(p=>[p.id,p]));
 const convert=(m,keys,states,absentMayUseWholeArtifact=false)=>{assert.deepEqual(Object.keys(m||{}).sort(),[...keys].sort(),'Missing or extra assessment keys');return Object.fromEntries(keys.map(k=>{const v=m[k];assert.ok(states.includes(v.state),`Invalid state ${k}`);assert.ok(typeof v.reason==='string'&&v.reason.trim().length>=15,`Missing reason ${k}`);assert.ok(Array.isArray(v.passages)&&(v.passages.length>0||(absentMayUseWholeArtifact&&v.state==='clear')),`Missing passages ${k}`);const evidence=v.passages.map(id=>{const p=lookup.get(id);assert.ok(p&&p.exact.length>=15,`Unknown or too-short passage ${id}`);return{excerpt:p.exact,locator:id}});return[k,{...v,artifactEvidence:evidence,artifactLocator:v.passages.length?v.passages.join(', '):'Complete artifact read; absence judgment'}]}))};
 const normalized={};
 if(result.families)normalized.families=convert(result.families,Object.keys(FAMILY),['clear','present','uncertain'],true);
 if(kind==='calibration'||kind==='reader')assert.ok(normalized.families,'Missing families');
 if(kind!=='calibration')normalized.outcomes=convert(result.outcomes,kind==='facts'?FACT_OUTCOMES:READER_OUTCOMES,['pass','hold','fail']);
 if(kind==='facts'){
  normalized.claims=convert(result.claims,packet.claims.map(c=>c.claimId),['supported','qualified','hold','contradicted']);
  for(const [claimId,v] of Object.entries(normalized.claims))assert.ok(v.sourceIds?.length&&v.sourceIds.every(id=>packet.sources.some(s=>s.id===id)),'Invalid source ID');
 }
 if(kind==='reader'){
  normalized.newsChecks=convert(result.newsChecks,Object.keys(NEWS_CHECKS),['pass','hold','fail']);
  for(const key of ['explainBack','unseenTransfer'])for(const field of ['question','answer','expectedEvidence','assessment'])assert.ok(result[key]?.[field]?.trim().length>=15,`Missing ${key}.${field}`);
  const scenario=result.unseenTransfer.scenario;
  assert.ok(scenario?.trim().length>=15,'Missing new transfer scenario');
  const canonical=s=>s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  assert.ok(!canonical(packet.paragraphs.map(p=>p.text).join(' ')).includes(canonical(scenario)),'Transfer scenario repeats exact article text');
  for(const key of ['humanQuestion','promisedPayoff','centralMentalModel','dailyLifeConnection','surfaceJob','desiredReaderFeeling'])assert.ok(result.reverseBrief?.[key]?.trim().length>=15,`Missing reverse brief ${key}`);
  normalized.explainBack=result.explainBack;normalized.unseenTransfer=result.unseenTransfer;normalized.reverseBrief=result.reverseBrief;
 }
 const states=[...Object.values(normalized.outcomes||{}),...Object.values(normalized.families||{}),...Object.values(normalized.claims||{}),...Object.values(normalized.newsChecks||{})].map(v=>v.state);
 normalized.verdict=states.some(s=>['fail','present','contradicted'].includes(s))?'REJECT':states.some(s=>['hold','uncertain'].includes(s))?'HOLD':'PASS';
 assert.ok(typeof result.summary==='string'&&result.summary.trim().length>=15,'Missing summary');
 normalized.summary=result.summary;
 if(kind!=='calibration'){const l=result.learningDisposition;assert.ok(['NO_NEW_DEFECT','CANDIDATE_REPAIR_ONLY','EVIDENCE_GAP'].includes(l?.disposition)&&l.rationale?.trim().length>=15,'Missing learning disposition');assert.equal(l.disposition==='NO_NEW_DEFECT',normalized.verdict==='PASS','Learning disposition contradicts assessments');normalized.learningDisposition=l}
 if(kind==='calibration'){assert.ok(result.strengths?.length&&result.strengths.every(s=>typeof s==='string'&&s.trim().length>=15),'Missing strengths');normalized.strengths=result.strengths}
 return normalized;
}
