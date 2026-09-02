import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
const root=process.cwd(),d='operations/product-stewards/newsstand/candidates/chatgpt-ads-2026-08-31/';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const hash=t=>crypto.createHash('sha256').update(t).digest('hex');
const bind=p=>({path:p,sha256:hash(read(p))});
const registryPath='operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json';
const registry=JSON.parse(read(registryPath)),story=JSON.parse(read(d+'story.json'));
const canonical=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(canonical).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
const policyPath='operations/product-stewards/newsstand/ordinary-news-editorial-policy.json';
const principal='claude-independent-news-20260831';
const prompt=`Independently review the complete ordinary NewsStand article below. You are Claude, not its OpenAI maker /root. Return your honest PASS/HOLD/REJECT; never make prose pass to satisfy a schema. No tools, external actions or humans are claimed. This is exact source/prose assessment, not native browser or public verification. Read artifact first, form your reverse brief, then examine supporting sources and prior maker evidence. Retain disagreement. This is a new article, not a review of code.

EXACT COMPLETE STORY FIRST:
${read(d+'review-text.json')}

EXACT HTML DERIVATIVE (not a browser observation):
${read(d+'rendered-article.html')}

PRIMARY-SOURCE RESEARCH RECEIPTS (maker and separate research lane opened originals today; distinguish direct quotations from paraphrased source facts; do not invent evidence outside them):
${['source-announcement.md','source-consumer-faq.md','source-availability.md'].map(p=>JSON.stringify(bind(d+p))+'\n'+read(d+p)).join('\n\n')}

GOVERNING ARTICLE REVIEW POLICY:
${read(policyPath)}
${read('operations/product-stewards/newsstand/DAILY-MANUAL-RUNBOOK.md').split('### Ordinary-news reader explanation review')[1].split('The composer stores')[0]}

CALIBRATION: independently reject these known-bad examples for their registered defects. Recognize only the NEWS example strengths, with no inherited old legal/product facts. Read this before completing candidate review. Current registry binding ${JSON.stringify(bind(registryPath))}
${registry.negativeExemplars.map(n=>JSON.stringify(n)+'\n'+read(n.path)).join('\n\n')}
${JSON.stringify(registry.positiveExemplars.find(x=>x.id==='CQX-GOOD-NEWS-001'))}
${read(registry.positiveExemplars.find(x=>x.id==='CQX-GOOD-NEWS-001').path)}

MAKER RECEIPT LAST: provides schema and exact artifact bindings; do not copy judgments, probes, calibration findings or flags as your review. Independently reassess every required outcome and enforced failure family against the actual article.
${read(d+'producer-review.json')}

Return JSON {receipt,analysis,findings}. receipt is a complete laidies-prose-quality-review.v1 independent semantic admission with stage INDEPENDENT_SEMANTIC_ADMISSION, maker /root, reviewer {id:'${principal}',principalId:'${principal}',role:'independent factual and reader-comprehension editor',modelFamily:'anthropic',independentFromMaker:true,artifactFirst:true}. Use actual approximate current UTC review time after calibration; do not backdate. Keep artifact bindings identical to maker. calibration must be YOUR own, same registered negative IDs/families and exact >=15-character excerpts. Preserve registrySha256. Positive is CQX-GOOD-NEWS-001, not Episode1 for NEWS. Include all15 required NEWS outcomes shown by maker and all failure families, each with candidate-specific observations, exact substrings and locators. For outcomes explainBack/unseenTransfer do NOT use simulatedReaderProbe or observedReaderEvidence. Use aiEditorialAnalysis {evidenceType:AI_EDITORIAL_ANALYSIS,prompt,response,expectedEvidence,assessment}, your own ordinary-language mechanism restatement and a genuinely different transfer scenario. No human check prerequisite. Each analysis object must match analysis.outcomes exactly. analysis={evidenceType:AI_EDITORIAL_ANALYSIS,candidateId:'${story.id}',reviewerPrincipalId:'${principal}',reviewTextSha256:'${bind(d+'review-text.json').sha256}',checks:{incidentExplained,termsExplainedInContext,readerConsequenceSpecific,noInternalNotesOrInventedAdvice},outcomes:{explainBack,unseenTransfer}}. Each check requires verdict PASS/HOLD/FAIL, observation and artifactEvidence array with exact >=15-character excerpts.
receipt.newsEditorialReview.policy=${JSON.stringify(bind(policyPath))}; leave its analysis binding absent, mechanically supplied after your generated analysis is saved. reportBinding also mechanically supplied, not a judgment. factualReview must independently map material candidate claims to bound research source excerpts, qualify provider assertions and hypothetical examples; use the exact sourceBindings supplied above, with exact sourceEvidence. A missing source excerpt or unsupported meaning must be held, not invented. Explicitly assess whether current receipts suffice for factual admission versus requiring fuller original evidence. Use first-candidate lineage only if truly first; noComparableReason explains it. Ratchet and learningDisposition must reflect findings, not automatic zeroes. If no defect PASS may record NO_NEW_DEFECT; otherwise use EVIDENCE_GAP or CANDIDATE_REPAIR_ONLY. Required receipt limitations include exactly 'AI editorial assessment only; no observed human-comprehension evidence is claimed.' Also distinguish prose admission from unperformed browser/native zoom/public release. Findings should start with actual problems, or explicitly no material problems found, and give an independent rationale. Do not request human evidence as substitute for your explanation review.\nCurrent invocation UTC ${new Date().toISOString()}`;
const out=d+'independent-provider-output.json';
if(fs.existsSync(path.join(root,out)))throw Error('Do not overwrite prior independent output');
const cwd=fs.mkdtempSync(path.join(os.tmpdir(),'news-claude-review-'));
console.log('Independent Claude exact-article review started');
const run=spawnSync('claude',['--print','--safe-mode','--tools','','--permission-mode','dontAsk','--no-session-persistence','--model','fable','--effort','medium','--output-format','json','--json-schema',JSON.stringify({type:'object',required:['receipt','analysis','findings'],properties:{receipt:{type:'object'},analysis:{type:'object'},findings:{type:'string'}}})],{cwd,input:prompt,encoding:'utf8',maxBuffer:64*1024*1024});
if(run.status!==0){fs.writeFileSync(path.join(root,d+'independent-execution-error.txt'),run.stderr||run.stdout);throw Error('Independent provider failed; raw failure saved, no review verdict.');}
const provider=JSON.parse(run.stdout);fs.writeFileSync(path.join(root,out),JSON.stringify(provider,null,2)+'\n');
const result=provider.structured_output;if(provider.is_error||!result?.receipt||!result?.analysis)throw Error('No independent structured review');
const put=(name,obj)=>{const p=d+name;fs.writeFileSync(path.join(root,p),JSON.stringify(obj,null,2)+'\n');return bind(p);};
const analysis=put('independent-analysis.json',result.analysis);
const report=put('independent-raw-report.json',{candidateId:story.id,storySha256:hash(canonical(story)),reviewerPrincipalId:principal,verdict:result.receipt.verdict,findings:result.findings,providerOutput:bind(out),promptSha256:hash(prompt),actualModels:Object.keys(provider.modelUsage||{})});
result.receipt.newsEditorialReview={policy:bind(policyPath),analysis};result.receipt.reportBinding=report;
put('independent-review.json',result.receipt);
console.log(JSON.stringify({verdict:result.receipt.verdict,findings:result.findings,actualModels:Object.keys(provider.modelUsage||{})}));
