#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const outDir='operations/product-stewards/newsstand/evidence/recovery-1600-20260924/source-recovery';
const prior='operations/product-stewards/newsstand/evidence/recovery-1300-20260924/source-recovery/proposed-coverage-progress.json';
const canonical='operations/product-stewards/newsstand/editorial-intake/coverage-progress.json';
const observedAt='2026-09-24T23:07:10Z'; // receipt binding after actual due-route batch and linked-original inspection
const nextCheckAt='2026-09-25T14:00:00Z';
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const bind=p=>({path:p,sha256:hash(p)});
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const write=(p,v)=>fs.writeFileSync(path.join(root,p),JSON.stringify(v,null,2)+'\n');
const priorCoverage=read(prior);
const coverage=structuredClone(priorCoverage);
const priorByUrl=new Map(priorCoverage.sourceChecks.map(s=>[s.url,s]));
const byUrl=new Map(coverage.sourceChecks.map(s=>[s.url,s]));
const receipt={
 providers:bind(outDir+'/due-provider-practitioner-raw.json'),
 openai:bind(outDir+'/due-openai-eff-ap-raw.json'),
 openaiAidb:bind(outDir+'/due-openai-aidb-sep18-raw.json'),
 aidb:bind(outDir+'/aidb-sep19-sep24-probes-raw.json'),
 eff:bind(outDir+'/eff-draftkings-full-raw.json'),
 nyt:bind(outDir+'/draftkings-nyt-attempt-raw.json'),
 accomplishCodex:bind(outDir+'/accomplish-codex-sandbox-raw.json'),
 accomplishCloudflare:bind(outDir+'/accomplish-cloudflare-raw.json'),
 cloudflarePrimary:bind(outDir+'/cloudflare-containers-primary-raw.json'),
 cloudflareFind:bind(outDir+'/cloudflare-containers-find-raw.json')
};
function update(url,{status='CHECKED',assessment,capture,missingInput,nextRecoveryStep}) {
 const row=byUrl.get(url); if(!row) throw Error('Missing source check '+url);
 row.previousObservation={checkedAt:row.checkedAt,assessment:row.assessment,capture:row.capture};
 row.checkedAt=observedAt; row.status=status; row.assessment=assessment; row.capture=capture; row.nextCheckAt=nextCheckAt;
 row.timestampMeaning='Actual 16:01 due-route recovery receipt binding; no timestamp-only renewal.';
 if(status==='BLOCKED'){row.missingInput=missingInput;row.nextRecoveryStep=nextRecoveryStep||'Retry once normally when due unless this exact route becomes NONRETRYABLE.';}
}
update('https://deepmind.google/blog/',{assessment:'CHECKED_CURRENT_INDEX; September entries expose month labels but no exact dated, unreviewed new item was inferred.',capture:receipt.providers});
update('https://gemini.google/release-notes/',{assessment:'CHECKED_CURRENT_RELEASE_NOTES; latest dated visible entry remains the September 10 Windows app, already covered.',capture:receipt.providers});
update('https://www.bleepingcomputer.com/tag/artificial-intelligence/',{assessment:'CHECKED_CURRENT_AI_INDEX; no new undispositioned item was admitted from this index.',capture:receipt.providers});
update('https://www.ftc.gov/industry/technology/artificial-intelligence',{assessment:'CHECKED_CURRENT_FTC_AI_INDEX; no new Sep24 item was identified.',capture:receipt.providers});
update('https://www.eff.org/updates',{assessment:'CHECKED_CURRENT_EFF_INDEX; Sep24 DraftKings/AI behavioral-advertising commentary followed to full EFF body and retained as an evidence hold pending its attributed report.',capture:receipt.openai});
update('https://aidailybrief.ai/e/2026-09-18.json',{status:'BLOCKED',assessment:'Normal permitted exact route returned inaccessible; no edition content recovered.',capture:receipt.openaiAidb,missingInput:'Accessible complete September 18 edition.',nextRecoveryStep:'Retry once normally when due unless this exact route becomes NONRETRYABLE.'});
update('https://aidailybrief.ai/e/2026-09-18/transcript.md',{status:'BLOCKED',assessment:'Normal permitted exact route returned inaccessible; no transcript content recovered.',capture:receipt.openaiAidb,missingInput:'Accessible complete September 18 transcript.',nextRecoveryStep:'Retry once normally when due unless this exact route becomes NONRETRYABLE.'});
update('https://aidailybrief.ai/e/2026-09-19.json',{status:'BLOCKED',assessment:'Normal permitted exact route returned inaccessible; no edition content recovered.',capture:receipt.aidb,missingInput:'Accessible complete September 19 edition.',nextRecoveryStep:'Retry once normally when due unless this exact route becomes NONRETRYABLE.'});
update('https://aidailybrief.ai/e/2026-09-19/transcript.md',{status:'BLOCKED',assessment:'Normal permitted exact route returned inaccessible; no transcript content recovered.',capture:receipt.aidb,missingInput:'Accessible complete September 19 transcript.',nextRecoveryStep:'Retry once normally when due unless this exact route becomes NONRETRYABLE.'});
update('https://aidailybrief.ai/e/2026-09-24',{status:'BLOCKED',assessment:'Normal permitted exact route returned inaccessible; no Sep24 edition content recovered.',capture:receipt.aidb,missingInput:'Accessible complete September 24 edition.',nextRecoveryStep:'Retry once normally when due unless this exact route becomes NONRETRYABLE.'});
update('https://aidailybrief.ai/e/2026-09-24/transcript.md',{status:'BLOCKED',assessment:'Normal permitted exact route returned inaccessible; no Sep24 transcript content recovered.',capture:receipt.aidb,missingInput:'Accessible complete September 24 transcript.',nextRecoveryStep:'Retry once normally when due unless this exact route becomes NONRETRYABLE.'});
update('https://apnews.com/article/openai-safety-ai-framework-089e75b95bc935af092da7b79d92706d',{status:'BLOCKED',assessment:'Normal permitted AP route returned inaccessible. The separate OpenAI framework original was inspected, but does not replace independent reporting.',capture:receipt.openai,missingInput:'Accessible complete AP article body or another attributable independent report of the same framework.',nextRecoveryStep:'Use a distinct attributable report; do not treat the OpenAI original as independent corroboration.'});
update('https://openai.com/index/model-misalignment-reporting-framework/',{assessment:'CHECKED_COMPLETE_OPENAI_ORIGINAL; existing framework lead is not a new Sep24 event.',capture:receipt.openai});
update('https://openai.com/index/introducing-gpt-6-sol-and-luna/',{assessment:'CHECKED_COMPLETE_OPENAI_ORIGINAL; existing GPT-6 Sol/Luna candidate remains in production.',capture:receipt.openai});
update('https://openai.com/index/priorities-principles-third-party-assessments/',{assessment:'CHECKED_COMPLETE_OPENAI_ORIGINAL; assessment principles are an existing policy item, not a new lead.',capture:receipt.openaiAidb});
update('https://openai.com/index/sam-altman-un-security-council-remarks/',{assessment:'CHECKED_COMPLETE_OPENAI_ORIGINAL; existing policy-speech exclusion remains; no operative change found.',capture:receipt.openaiAidb});
if(!coverage.leads.some(l=>l.id==='draftkings-ai-losing-gamblers-20260924')) coverage.leads.push({
 id:'draftkings-ai-losing-gamblers-20260924',
 event:'EFF reports that DraftKings uses AI targeting aimed at customers likely to place losing bets',
 sourceUrls:['https://www.eff.org/deeplinks/2026/09/draftkings-using-ai-supercharge-harms-online-behavioral-advertising','https://www.nytimes.com/2026/09/19/business/draftkings-ai.html'],
 status:'EVIDENCE_BLOCKED',
 attemptedRecovery:'The full Sep24 EFF commentary was inspected. Its factual account is attributed to a linked New York Times report; one normal linked open returned a non-retryable inaccessible result.',
 missingInput:'Accessible complete independent report and an attributable DraftKings source establishing model use, data scope, targeting criteria, and current user controls.',
 nextCheckAt,
 sourceReview:{eff:receipt.eff,nytimesAttempt:receipt.nyt},
 nextAction:'Do not produce privacy or gambling guidance from the EFF advocacy article alone; recover the attributed reporting and a primary company account if available.'
});
const codexLead=coverage.leads.find(l=>l.id==='codex-sandbox-research-20260920');
if(!codexLead) throw Error('Missing Codex sandbox lead');
codexLead.sourceUrls=['https://www.accomplish.ai/blog/escaping-the-openai-codex-sandbox-twice/','https://www.bleepingcomputer.com/news/security/researchers-escape-openai-codex-sandbox-to-run-commands-on-host/'];
codexLead.sourceReview={...codexLead.sourceReview,accomplishPrimary:receipt.accomplishCodex,sourceRole:'Commercially interested primary security research from a competing sandbox vendor; it is not independent certification.',claimLimit:'The research describes two distinct fixes. It does not establish universal desktop build-check instructions or permit conflating a bundled CLI version with an app build.',noExploitHandling:'No mechanism was reproduced, tested, or copied into production material.'};
codexLead.nextAction='Pass a producer contract, then re-author from the bound sources with the two fixes kept distinct. Bind current official version/update support before any user-facing update instruction; do not conflate bundled CLI and desktop-app build identities.';
if(!coverage.leads.some(l=>l.id==='cloudflare-containers-cross-tenant-20260924')) coverage.leads.push({id:'cloudflare-containers-cross-tenant-20260924',event:'Cloudflare disclosed a cross-tenant data-exposure vulnerability affecting Containers and Sandboxes, and says it fully remediated it.',sourceUrls:['https://www.accomplish.ai/blog/escaping-the-cloudflare-sandbox/','https://blog.cloudflare.com/containers-cross-tenant-vulnerability/'],status:'EXCLUDED',reviewedAt:observedAt,reviewedBy:'independent-source-recovery-1600-20260924',reason:'Official provider disclosure says remediation was complete without customer configuration changes and reports no evidence of customer-data compromise or malicious exploitation. The affected products are specific developer platform services, so this does not establish a general-reader action or a Codex update.',sourceReview:{accomplish:receipt.accomplishCloudflare,cloudflare:receipt.cloudflarePrimary,cloudflareFind:receipt.cloudflareFind},sourceLimits:'Accomplish is a commercially interested reporter. Cloudflare is the service provider account. Do not reproduce, test, or describe exploit mechanics; do not generalize the scope beyond Containers and Sandboxes.'});
coverage.asOf='2026-09-24';
coverage.checkedAt=observedAt;
coverage.nextReviewAt=nextCheckAt;
coverage.sourceAudit=outDir+'/build-proposed-coverage.mjs';
coverage.reconciliationInProgress=true;
coverage.proposedOnly=true;
coverage.proposalAuthority='PROPOSAL_ONLY: foreground root must independently reconcile and adopt any canonical change; this packet makes no canonical, cursor, candidate, or public mutation.';
const out=outDir+'/proposed-coverage-progress.json';
write(out,coverage);
const aidb={schemaVersion:'aidb-due-probe-reconciliation.v1',observedAt,inventoryStatus:'No complete Sep18, Sep19, or Sep24 dated edition/transcript was recovered. The preexisting Sep22 rendered-edition review is not repeated or treated as a transcript.',probes:coverage.sourceChecks.filter(s=>/aidailybrief\.ai\/e\/2026-09-(18|19|24)/.test(s.url)).map(s=>({url:s.url,status:s.status,checkedAt:s.checkedAt,assessment:s.assessment,missingInput:s.missingInput,nextCheckAt:s.nextCheckAt,capture:s.capture})),cursorAction:'NONE'};
write(outDir+'/aidb-due-probe-reconciliation.json',aidb);
const summary={schemaVersion:'newsstand-coverage-reconciliation-summary.v1',generatedAt:new Date().toISOString(),canonical,canonicalSha256:hash(canonical),predecessorProposal:bind(prior),proposed:bind(out),sourceCheckCount:coverage.sourceChecks.length,leadCount:coverage.leads.length,changedSourceCheckCount:coverage.sourceChecks.filter(s=>!priorByUrl.has(s.url)||JSON.stringify(s)!==JSON.stringify(priorByUrl.get(s.url))).length,changedSourceCheckUrls:coverage.sourceChecks.filter(s=>!priorByUrl.has(s.url)||JSON.stringify(s)!==JSON.stringify(priorByUrl.get(s.url))).map(s=>s.url),newLeadIds:['draftkings-ai-losing-gamblers-20260924','cloudflare-containers-cross-tenant-20260924'],status:'PARTIAL_SOURCE_RECONCILIATION_NOT_PUBLICATION',limits:['No restricted original route was retried.','No new complete AIDB edition/transcript was recovered.','AP framework article and NYT DraftKings article remain inaccessible via normal tool.','Cloudflare Containers disclosure is provider-reported fully remediated and excluded from reader production.','Codex sandbox research is retained in production with distinct-fix limits, not publication-ready.']};
write(outDir+'/reconciliation-summary.json',summary);
console.log(JSON.stringify(summary,null,2));
