#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const id = process.argv[2];
if (id !== "openai-wiki-message-board-2026-09-05") throw new Error("Pass the governed September 5 wiki candidate ID");
const d = `operations/product-stewards/newsstand/candidates/${id}/`;
const read = p => fs.readFileSync(path.join(root, p), "utf8");
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const bind = p => ({ path: p, sha256: hash(read(p)) });
const stable = value => value === null || typeof value !== "object" ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(",")}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const registryPath = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const policyPath = "operations/product-stewards/newsstand/ordinary-news-editorial-policy.json";
const registry = JSON.parse(read(registryPath));
const story = JSON.parse(read(d + "story.json"));
const seed = JSON.parse(read(d + "candidate-package-seed.json"));
const sourcePaths = [...new Set(seed.sources.map(source => source.evidence.path))];
const claimMap = JSON.parse(read(d + "publication-claim-map.json"));
const model = "@cf/google/gemma-4-26b-a4b-it";
const principal = `workers-ai-gemma-independent-news-${id}`;
const producer = JSON.parse(read(d + "producer-publication-review.json"));
const schemaGuide = {schemaVersion:producer.schemaVersion,candidateId:producer.candidateId,contentClass:producer.contentClass,surface:producer.surface,artifact:producer.artifact,outcomeKeys:Object.keys(producer.outcomes),failureFamilyKeys:Object.keys(producer.failureFamilies),ratchet:producer.ratchet};
const prompt = `Independently review the complete LAiDIES ordinary-news article below. You are a Google Gemma reviewer through Cloudflare Workers AI, not its OpenAI maker /root. Return an honest PASS, HOLD or REJECT. Never make prose pass to satisfy a schema. Do not claim tools, browsing, human readers, native browser checks or publication. Read the artifact first, form your own reverse brief, and then test every material claim against the exact supplied source receipts.

EXACT COMPLETE STORY FIRST:\n${read(d + "review-text.json")}

HTML derivative is bound in the artifact manifest; you are reviewing full source text, not making a browser claim.

SOURCE EVIDENCE BOUNDARY: research notes below are maker paraphrases clearly labelled as such; short quotes are exact retrieved passages. Reject or HOLD any claim you cannot justify, including unsupported conclusions from those notes. Do not infer access to the unavailable X thread. You must also inspect factual completeness, safety-incident questions, concrete reader translation and the privacy boundary: no LAiDIES operating procedures are being taught.

STORY TYPE COVERAGE:\n${read(d + "story-type-coverage.json")}

EXACT CLAIM MAP ARRAY. Reassess it independently and return this exact array in receipt.factualReview.claimMap only if its evidence actually supports the story:\n${JSON.stringify(claimMap)}

SOURCE RECEIPTS:\n${sourcePaths.map(p => `PATH ${p} BINDING ${JSON.stringify(bind(p))}\n${read(p)}`).join("\n\n")}

GOVERNING POLICY:\n${read(policyPath)}

CALIBRATION REGISTRY ${JSON.stringify(bind(registryPath))}. Independently reject every negative example for all of its registered failure families, using exact excerpts of at least 15 characters. Use CQX-GOOD-NEWS-001 only as a structural positive; inherit no facts:\n${registry.negativeExemplars.map(item => `ENTRY ${JSON.stringify(item)}\n${read(item.path)}`).join("\n\n")}\n\nPOSITIVE ${JSON.stringify(registry.positiveExemplars.find(item => item.id === "CQX-GOOD-NEWS-001"))}\n${read(registry.positiveExemplars.find(item => item.id === "CQX-GOOD-NEWS-001").path)}

SCHEMA GUIDE ONLY, without maker judgments:\n${JSON.stringify(schemaGuide)}

Return JSON {receipt,analysis,findings}. receipt must be a complete laidies-prose-quality-review.v1 with stage INDEPENDENT_SEMANTIC_ADMISSION, maker /root, reviewer {id:'${principal}',principalId:'${principal}',role:'independent factual and reader-comprehension editor',modelFamily:'google-gemma',independentFromMaker:true,artifactFirst:true}. Every artifactEvidence excerpt must be a verbatim substring of review-text.json including embedded HTML; descriptions of the article are never quotations. A present failure must point to exact candidate words and explain the defect using the registry definitions. Decline speculative may-be criticisms without evidence. Keep artifact bindings identical to the schema guide. Use all outcomeKeys and failureFamilyKeys. Preserve registrySha256. Include all required NEWS outcomes and failure families. Each outcome needs verdict PASS/HOLD/FAIL, candidate-specific observation, and artifactEvidence with exact story substrings of at least 15 characters. explainBack and unseenTransfer additionally require aiEditorialAnalysis {evidenceType:'AI_EDITORIAL_ANALYSIS',prompt,response,expectedEvidence,assessment}; unseenTransfer must use a genuinely different scenario. factualReview.disposition is CLAIMS_REVIEWED, reviewedThrough is 2026-09-05, sourceBindings are the exact bindings above, and claimMap is exactly the supplied claim array if supported. analysis must be {evidenceType:'AI_EDITORIAL_ANALYSIS',candidateId:'${id}',reviewerPrincipalId:'${principal}',reviewTextSha256:'${bind(d + "review-text.json").sha256}',checks:{incidentExplained,termsExplainedInContext,readerConsequenceSpecific,noInternalNotesOrInventedAdvice},outcomes:{explainBack,unseenTransfer}} with specific evidence. analysis.outcomes.explainBack and analysis.outcomes.unseenTransfer must equal only receipt.outcomes.explainBack.aiEditorialAnalysis and receipt.outcomes.unseenTransfer.aiEditorialAnalysis respectively, not the outer verdict objects. Use the real current timestamp for reviewedAt and a calibration time no later than it. Include the exact limitation 'AI editorial assessment only; no observed human-comprehension evidence is claimed.' plus browser/native-zoom/publication limitations. Leave newsEditorialReview.analysis and reportBinding absent; they are mechanically bound after your judgment. PASS may record NO_NEW_DEFECT only when no defect exists. Current invocation UTC ${new Date().toISOString()}`;

const outputPath = d + "independent-gemma-provider-output.json";
if (fs.existsSync(path.join(root, outputPath))) throw new Error("Do not overwrite prior provider output");
const response = await fetch('http://127.0.0.1:8791/gemma', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({messages:[{role:'system',content:'You are an independent factual and comprehension editor. Return valid JSON only. Exact evidence quotations only. Preserve uncertainty and return HOLD whenever evidence does not support publication.'},{role:'user',content:prompt}],response_format:{type:'json_object'},max_completion_tokens:14000,reasoning_effort:"medium",temperature:0.05}),signal:AbortSignal.timeout(300000)
});
const rawBody = await response.text();
if (!response.ok) { fs.writeFileSync(path.join(root,d+'independent-gemma-execution-error.txt'),rawBody); throw new Error('Workers AI failed with HTTP '+response.status); }
const provider = JSON.parse(rawBody);
fs.writeFileSync(path.join(root, outputPath), JSON.stringify({model,provider,promptSha256:hash(prompt)},null,2)+'\n');
const raw = provider.response ?? provider.choices?.[0]?.message?.content;
const result = typeof raw === 'string' ? JSON.parse(raw) : raw;
if (!result?.receipt || !result?.analysis || !result?.findings) throw new Error('No complete independent review; provider output preserved');
const put = (name, value) => { const p = d + name; if(fs.existsSync(path.join(root,p))) throw new Error('Do not overwrite '+p); fs.writeFileSync(path.join(root, p), JSON.stringify(value,null,2)+'\n'); return bind(p); };
const analysis = put('independent-gemma-analysis.json',result.analysis);
const report = put('independent-gemma-raw-report.json',{candidateId:id,storySha256:hash(stable(story)),reviewerPrincipalId:principal,verdict:result.receipt.verdict,findings:result.findings,providerOutput:bind(outputPath),promptSha256:hash(prompt),actualModels:[model]});
result.receipt.newsEditorialReview={policy:bind(policyPath),analysis};
result.receipt.reportBinding=report;
put('independent-gemma-review.json',result.receipt);
console.log(JSON.stringify({verdict:result.receipt.verdict,findings:result.findings,actualModels:[model]}));
