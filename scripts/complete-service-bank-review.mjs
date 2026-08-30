#!/usr/bin/env node
// Ask the same independent model family to complete its own evidence record.
// Records a new, hash-linked report; never replaces or overrides the old one.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {enforcedFailureFamilies} from './check-prose-quality-admission.mjs';
const root=path.resolve(import.meta.dirname,'..');
const dir='operations/product-stewards/newsstand/evidence/service-bank-20260830';
const argv=process.argv.slice(2), val=n=>argv[argv.indexOf(n)+1];
const read=p=>fs.readFileSync(path.resolve(root,p),'utf8'),sha=s=>crypto.createHash('sha256').update(s).digest('hex');
if(!argv.includes('--input')||!argv.includes('--output'))throw Error('Input and new output required');
const input=val('--input'),report=JSON.parse(read(input));
const output=path.resolve(root,val('--output'));
if(!output.startsWith(path.join(root,dir)+path.sep)||fs.existsSync(output))throw Error('Need a new private output');
const selected=argv.includes('--ids')?val('--ids').split(','):report.judgment.entries.map(e=>e.candidateId);
const entries=report.judgment.entries.filter(e=>selected.includes(e.candidateId));
const artifacts=report.artifactBindings.filter(e=>selected.includes(e.id));
const registry=JSON.parse(read('operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json'));
const index=JSON.parse(read(`${dir}/index-with-announcement-corrected-sources.json`));
const extras=[`${dir}/site-destinations.md`,`${dir}/mme-newsstand-observation.md`];
const sources=[...index.sources,...extras.map(p=>({path:p,sha256:sha(read(p))}))];
const prompt=`You are the independent Claude source/prose reviewer completing your own earlier review record. Producer /root cannot supply your missing judgments. First read the unchanged exact prose, then your previous review and the original sources. Keep substantive verdicts independent. This is evidence-record completion, not a request to make anything pass. Do not claim human testing or UI observations of your own. A bound visitor observation may support product behaviour.

EXACT PROSE FIRST:
${artifacts.map(a=>`${a.id}\n${read(a.reviewText.path)}`).join('\n\n')}

YOUR EARLIER REVIEW:
${JSON.stringify({calibration:report.judgment.calibration,entries})}

BOUND SOURCE MATERIAL (corrected chapter extraction supplements the original pack):
${sources.map(s=>`${JSON.stringify(s)}\n${read(s.path)}`).join('\n\n')}

The earlier review omitted required observation and artifactLocator fields for some failure families. Some excerpts contained typographic or wording changes, and some sources in claimMap were not listed in sourceBindings. Complete your evidence without changing the candidate prose. Return only a sparse list of replacements for the earlier entry objects, plus calibration replacements only if necessary. Replacements use JSON Pointer paths relative to the entry, e.g. /failureFamilies/templateRepetition or /outcomes/systemRelationship/artifactEvidence. For every enforced failure family, provide {present:boolean,observation:string,artifactLocator:string}; use a brief candidate-specific observation, not a generic pass. Families: ${JSON.stringify(enforcedFailureFamilies(registry))}.
Excerpts must be literal substrings of the given exact candidate/source, >=15 characters. Register every sourceBinding in factualReview.sourceBindings. An unsupported claim in a HOLD can use a source excerpt establishing the limited support, with status QUALIFIED and an explicit limitation; do NOT fabricate support. The new Mme NewsStand observation may resolve that product-specific evidence gap if you judge it sufficient. It does not resolve the paid-course link concern in Corner Office. Keep all other substantive verdicts unless your own reevaluation finds a reason to change them, and explain every changed verdict. Do not delete defects merely to satisfy a validator.
Allowed paths: /failureFamilies/NAME, /outcomes/NAME (or its artifactEvidence), /factualReview (or its fields), /verdict, /objectiveDefects, /limitations, /summary. Each replacement has {candidateId,path,value,reason}. Return {replacements:[...],calibrationReplacements:[],summary:string}. Include all missing fields; no whole-entry replacement. Do not make any external writes.
`;
const schema={type:'object',required:['replacements','calibrationReplacements','summary'],properties:{replacements:{type:'array',items:{type:'object',required:['candidateId','path','value','reason'],properties:{candidateId:{type:'string',enum:selected},path:{type:'string'},value:{},reason:{type:'string'}}}},calibrationReplacements:{type:'array',items:{type:'object',required:['path','value','reason']}},summary:{type:'string'}}};
const cwd=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-review-completion-'));
const startedAt=new Date().toISOString();
console.log('Independent record completion started: '+selected.join(', '));
const run=spawnSync('claude',['--print','--safe-mode','--tools','','--permission-mode','dontAsk','--no-session-persistence','--model','fable','--effort','medium','--output-format','json','--json-schema',JSON.stringify(schema)],{cwd,input:prompt,encoding:'utf8',maxBuffer:64*1024*1024});
if(run.status!==0)throw Error(run.stderr||run.stdout);
const result=JSON.parse(run.stdout),patch=result.structured_output;
if(result.is_error||!patch?.replacements)throw Error('Missing independent completion');
const revised=structuredClone(report);
revised.artifactBindings=artifacts;
revised.judgment.entries=entries.map(e=>structuredClone(e));
function set(obj,pointer,value){const parts=pointer.slice(1).split('/').map(s=>s.replace(/~1/g,'/').replace(/~0/g,'~'));if(parts.some(s=>['__proto__','constructor','prototype'].includes(s)))throw Error('Unsafe pointer');let cursor=obj;for(const p of parts.slice(0,-1)){if(!cursor[p])cursor[p]={};cursor=cursor[p];}cursor[parts.at(-1)]=value;}
for(const edit of patch.replacements){if(!/^\/(failureFamilies\/[^/]+|outcomes\/[^/]+(?:\/artifactEvidence)?|factualReview(?:\/[^/]+)*|verdict|objectiveDefects|limitations|summary)$/.test(edit.path))throw Error('Unsupported reviewer edit '+edit.path);const entry=revised.judgment.entries.find(e=>e.candidateId===edit.candidateId);if(!entry)throw Error('Unknown reviewer target');set(entry,edit.path,edit.value);}
for(const edit of patch.calibrationReplacements){if(!/^\/(positive|negatives)(\/.*)?$/.test(edit.path))throw Error('Unsupported calibration edit');set(revised.judgment.calibration,edit.path,edit.value);}
revised.sourceBindings=sources;
revised.predecessorReport={path:input,sha256:sha(read(input))};
revised.completion={startedAt,judgedAt:new Date().toISOString(),promptSha256:sha(prompt),actualModels:Object.keys(result.modelUsage||{}),...patch};
revised.judgedAt=revised.completion.judgedAt;
revised.actualModels=[...new Set([...report.actualModels,...revised.completion.actualModels])];
fs.writeFileSync(output,JSON.stringify(revised,null,2)+'\n');
console.log(JSON.stringify({output,summary:patch.summary,replacements:patch.replacements.length,verdicts:revised.judgment.entries.map(e=>[e.candidateId,e.verdict])},null,2));
