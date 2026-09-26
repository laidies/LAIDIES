#!/usr/bin/env node
/**
 * Proposal-only reconciliation. It reads canonical coverage and the committed
 * 10:00 packet, writes a full successor under this directory, and never
 * modifies the canonical file.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const outDir='operations/product-stewards/newsstand/evidence/recovery-1300-20260924/source-recovery';
const canonical='operations/product-stewards/newsstand/editorial-intake/coverage-progress.json';
const packet='operations/product-stewards/newsstand/evidence/recovery-1000-20260924/source-recovery';
const out=path.join(outDir,'proposed-coverage-progress.json');
const now=new Date().toISOString();
const packetObservedAt='2026-09-24T18:38:06Z'; // bound inventory receipt: 11:38:06-07:00
const nextCheckAt='2026-09-25T14:00:00Z';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const binding=p=>({path:p,sha256:sha(p)});
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const write=(p,value)=>fs.writeFileSync(path.join(root,p),JSON.stringify(value,null,2)+'\n');
const canonicalCoverage=read(canonical);
const canonicalByUrl=new Map(canonicalCoverage.sourceChecks.map(s=>[s.url,s]));
const coverage=structuredClone(canonicalCoverage);
const receipt={
  roster:binding(packet+'/roster-and-aidb-raw.json'),
  finds:binding(packet+'/roster-index-finds-raw.json'),
  material:binding(packet+'/material-leads-raw.json'),
  opus:binding(packet+'/opus-claims-raw.json'),
  aidb:binding(packet+'/aidb-edition-inventory.json'),
  apple:binding(packet+'/aidb-podcast-episode-raw.json'),
  alternates:binding(packet+'/alternate-recovery-raw.json'),
  alternateFinds:binding(packet+'/alternate-recovery-finds-raw.json'),
  pku:binding(packet+'/pku-primary-recovery-raw.json'),
  bot:binding(outDir+'/bot-identifier-recovery-raw.json'),
  ordinaryAllie:binding(outDir+'/ordinary-allie-raw.json'),
  ordinaryAidb1:binding(outDir+'/ordinary-aidb-batch1-raw.json'),
  ordinaryAidb2:binding(outDir+'/ordinary-aidb-batch2-raw.json'),
  ordinaryAllieHome:binding(outDir+'/ordinary-allie-home-raw.json'),
  ordinaryApClaude:binding(outDir+'/ordinary-ap-claude-raw.json')
};
const ordinaryObservedAt='2026-09-24T20:22:48Z'; // receipt binding after the permitted ordinary-route batch
function asBinding(value) {
  if(value&&typeof value==='object'&&value.path&&value.sha256) return value;
  if(typeof value==='string'&&fs.existsSync(path.join(root,value))) return binding(value);
  throw new Error('Cannot bind original capture: '+JSON.stringify(value));
}
const byUrl=new Map(coverage.sourceChecks.map(s=>[s.url,s]));
function refresh(url,assessment,capture) {
  const s=byUrl.get(url); if(!s) throw new Error('Missing source row '+url);
  const previousObservation={checkedAt:s.checkedAt,assessment:s.assessment,capture:s.capture};
  s.checkedAt=packetObservedAt;
  s.timestampMeaning='Actual 10:00 recovery packet receipt binding; reuse is within three hours, not a timestamp-only refresh.';
  s.assessment=assessment;
  s.capture=capture;
  s.nextCheckAt=nextCheckAt;
  s.previousObservation=previousObservation;
}
refresh('https://www.nature.com/subjects/machine-learning','CHECKED_NO_SEP24_MARKER; normal permitted machine-learning index inspected.',receipt.roster);
refresh('https://aidailybrief.ai/agent.json','CHECKED_AIDB_INDEX_SEP23_LATEST; index metadata does not complete any edition.',receipt.roster);
refresh('https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614','CHECKED_AIDB_PODCAST_METADATA_ONLY; Sep23 episode identity found, no full audio/transcript review.',receipt.apple);
refresh('https://openai.com/news/','CHECKED_NO_SEP24_MARKER; no new undispositioned index item established.',receipt.roster);
refresh('https://www.anthropic.com/news','CHECKED_NEW_CLAUDE_OPUS_5_5_SEP22; official primary followed.',receipt.opus);
refresh('https://ai.google.dev/gemini-api/docs/changelog','CHECKED_NO_SEP24_MARKER; changelog inspected.',receipt.roster);
refresh('https://apnews.com/hub/artificial-intelligence','CHECKED_AP_UN_SECURITY_COUNCIL_FULL_BODY_REVIEWED; policy speech is excluded from a candidate.',receipt.material);
refresh('https://www.bleepingcomputer.com/news/artificial-intelligence/','CHECKED_NO_UNDISPOSITIONED_SEP24_ITEM.',receipt.roster);
refresh('https://www.ftc.gov/industry/technology/artificial-intelligence','CHECKED_NO_NEW_SEP24_ITEM.',receipt.roster);
refresh('https://www.eff.org/updates','CHECKED_NO_SEP24_MARKER.',receipt.roster);

const alternatives={
 'https://x.com/cognition/status/2098142686486356185':[{url:'https://cognition.com/blog',status:'CHECKED',checkedAt:packetObservedAt,assessment:'Current official blog was inspected. It did not map the blocked X event ID to a publisher announcement.',capture:receipt.alternateFinds}],
 'https://x.com/bot/status/2098183353665261979':[{url:'https://dosi.dev/grok-bot-3-day-company-build-day2/',status:'CHECKED',checkedAt:now,assessment:'Normal exact-identifier discovery found this third-party report identifying the event as a Grok Bot Day 2 demonstration. It quotes the inaccessible post and expressly says the original text is limited; it does not turn the report into a complete primary record.',capture:receipt.bot}],
 'https://www.reuters.com/technology/artificial-intelligence/':[{url:'https://apnews.com/article/ai-artificial-intelligence-un-security-council-64519ea66b38e2600026f4481ad7f211',status:'CHECKED',checkedAt:packetObservedAt,assessment:'A full AP report was inspected, but it does not identify a matching Reuters event and is not substituted as corroboration.',capture:receipt.material}],
 'https://www.aais.pku.edu.cn/info/1355/20361.htm':[{url:'https://www.nature.com/articles/s41586-026-11001-9',status:'BLOCKED',checkedAt:packetObservedAt,assessment:'Distinct primary DOI was identified, but normal open reached Nature authentication; full results/methods were unavailable.',capture:receipt.pku},{url:'https://www.biorxiv.org/content/10.1101/2025.02.07.637070v2',status:'BLOCKED',checkedAt:packetObservedAt,assessment:'Related preprint URL was identified, but normal open returned 403.',capture:receipt.pku}],
 'https://aidailybrief.beehiiv.com/':[{url:'https://podcasts.apple.com/us/podcast/opus-5-5-vs-gpt-6-sol-and-luna/id1680633614?i=1000791349868',status:'CHECKED',checkedAt:packetObservedAt,assessment:'Publisher-linked Apple metadata identifies the Sep23 episode but is not a newsletter or full transcript.',capture:receipt.apple}],
 'https://www.oneusefulthing.org/feed':[{url:'https://www.oneusefulthing.org/archive',status:'CHECKED',checkedAt:packetObservedAt,assessment:'Current archive was inspected; no September marker was found.',capture:receipt.alternates}],
 'https://www.oneusefulthing.org/':[{url:'https://www.oneusefulthing.org/archive',status:'CHECKED',checkedAt:packetObservedAt,assessment:'Current archive was inspected; no September marker was found.',capture:receipt.alternates}],
 'https://www.nature.com/subjects/machine-learning/nature':[{url:'https://www.nature.com/subjects/machine-learning',status:'CHECKED',checkedAt:packetObservedAt,assessment:'The permitted machine-learning index was inspected; it does not provide the restricted original page body.',capture:receipt.roster}]
};
for(const source of coverage.sourceChecks.filter(s=>s.status==='BLOCKED'&&s.retryPolicy==='NONRETRYABLE')){
  const recoverySources=alternatives[source.url] || (source.url.startsWith('https://aidailybrief.ai/e/') || source.url.includes('aidailybrief.beehiiv.com/p/')
    ? [{url:'https://aidailybrief.ai/agent.json',status:'CHECKED',checkedAt:packetObservedAt,assessment:'Current publisher index was inspected; it identifies releases but does not supply the required complete historical edition/transcript.',capture:receipt.roster}]
    : null);
  if(!recoverySources) throw new Error('No genuine distinct recovery observation mapped for '+source.url);
  const review={
    schemaVersion:'newsstand-source-recovery-review-v1',
    reviewedAt:now,
    reviewedBy:'independent-source-reconciliation-1300-20260924',
    url:source.url,
    originalCheckedAt:source.checkedAt,
    originalNotRetried:true,
    originalCapture:asBinding(source.capture),
    assessment:'Retained blocked route was not reopened. '+recoverySources.map(r=>r.assessment).join(' '),
    missingInput:source.missingInput,
    nextCheckAt,
    nextRecoveryStep:source.nextRecoveryStep || 'Use a future permitted, attributable source recovery; do not retry the exact original.',
    recoverySources
  };
  const file=path.join(outDir,'retained-block-'+crypto.createHash('sha256').update(source.url).digest('hex').slice(0,12)+'.json');
  write(file,review);
  source.nextCheckAt=nextCheckAt;
  source.recoveryReview=binding(file);
  source.previousRecoveryReview=source.recoveryReview;
}
for(const source of coverage.sourceChecks.filter(s=>s.status==='BLOCKED'&&!s.retryPolicy)){
  if(source.url.includes('aidailybrief.ai/e/2026-09-23')||source.url.includes('aidailybrief.ai/e/2026-09-24')){
    source.checkedAt=packetObservedAt;
    source.assessment='Normal permitted dated edition/transcript probe returned Internal Error; no content recovered.';
    source.capture=receipt.roster;
    source.missingInput='Accessible complete edition or transcript.';
    source.nextCheckAt=nextCheckAt;
    source.nextRecoveryStep='Retry once normally when due unless the route later becomes NONRETRYABLE.';
  }
}
function ordinaryUpdate(url,status,assessment,capture,missingInput=null) {
  const s=byUrl.get(url); if(!s) throw new Error('Missing ordinary source row '+url);
  s.previousObservation={checkedAt:s.checkedAt,assessment:s.assessment,capture:s.capture};
  s.checkedAt=ordinaryObservedAt;
  s.status=status;
  s.assessment=assessment;
  s.capture=capture;
  s.nextCheckAt=nextCheckAt;
  s.timestampMeaning='Bound after actual permitted 13:02 ordinary-route recovery; not a timestamp-only renewal.';
  if(status==='BLOCKED') { s.missingInput=missingInput; s.nextRecoveryStep='Retry once normally when due unless the route later becomes NONRETRYABLE.'; }
}
ordinaryUpdate('https://www.alliekmiller.com/resources','CHECKED','CHECKED_CURRENT_RESOURCE_INDEX; practical resource catalog accessible, but it contains no dated new release identity.',receipt.ordinaryAllie);
ordinaryUpdate('https://www.alliekmiller.com/','CHECKED','CHECKED_CURRENT_HOMEPAGE; no dated new article identity is established from the homepage content.',receipt.ordinaryAllieHome);
ordinaryUpdate('https://www.oneusefulthing.org/archive','CHECKED','CHECKED_CURRENT_ARCHIVE; no September marker was found.',receipt.alternates);
ordinaryUpdate('https://apnews.com/article/anthropic-claude-ai-model-self-improvement-4d3a7430f57cbc7c39e1c5f2b7d7e132','CHECKED','CHECKED_CURRENT_AP_ARTICLE; this previously identified Anthropic item was refreshed without a new candidate disposition.',receipt.ordinaryApClaude);
ordinaryUpdate('https://www.aiwithallie.com/','BLOCKED','Normal open reports URL inaccessible via this tool.',receipt.ordinaryAllie,'Accessible current publisher homepage or dated post identity.');
ordinaryUpdate('https://www.aiwithallie.com/p/anthropic-ceo-ai-warning','BLOCKED','Normal open reports URL inaccessible via this tool.',receipt.ordinaryAllie,'Accessible complete publisher article.');
ordinaryUpdate('https://www.aiwithallie.com/archive','BLOCKED','Normal open reports URL inaccessible via this tool.',receipt.ordinaryAllie,'Accessible current archive or attributable dated post.');
ordinaryUpdate('https://aidailybrief.ai/llms-full.txt','BLOCKED','Normal open reports URL inaccessible via this tool.',receipt.ordinaryAidb1,'Accessible current AIDB machine-readable inventory.');
ordinaryUpdate('https://aidailybrief.ai/e/2026-09-21.md','BLOCKED','Normal open reports URL inaccessible via this tool.',receipt.ordinaryAidb1,'Accessible complete September 21 edition source.');
ordinaryUpdate('https://aidailybrief.ai/e/2026-09-21/transcript.md','BLOCKED','Normal open reports URL inaccessible via this tool.',receipt.ordinaryAidb1,'Accessible complete September 21 transcript.');
ordinaryUpdate('https://aidailybrief.ai/e/2026-09-22','CHECKED','CHECKED_COMPLETE_RENDERED_EDITION; the accessible Sep22 page was inspected. Its individual claims remain subject to source-specific reconciliation.',receipt.ordinaryAidb1);
ordinaryUpdate('https://aidailybrief.ai/e/2026-09-22.md','BLOCKED','Normal open reports URL inaccessible via this tool.',receipt.ordinaryAidb2,'Accessible complete September 22 machine-readable edition.');
ordinaryUpdate('https://aidailybrief.ai/e/2026-09-22/transcript.md','BLOCKED','Normal open reports URL inaccessible via this tool.',receipt.ordinaryAidb2,'Accessible complete September 22 transcript.');
ordinaryUpdate('https://aidailybrief.ai/e/2026-09-22.json','BLOCKED','Normal open reports URL inaccessible via this tool.',receipt.ordinaryAidb2,'Accessible complete September 22 machine-readable edition.');
for(const missing of ['https://aidailybrief.ai/e/2026-09-24','https://aidailybrief.ai/e/2026-09-24/transcript.md']){
 if(!byUrl.has(missing)) coverage.sourceChecks.push({url:missing,role:'AIDB',checkedAt:packetObservedAt,status:'BLOCKED',assessment:'Normal permitted Sep24 edition/transcript probe returned Internal Error; no content recovered.',missingInput:'Accessible complete September 24 edition or transcript.',nextCheckAt,capture:receipt.roster,nextRecoveryStep:'Retry once normally when due unless the route later becomes NONRETRYABLE.'});
}
if(!coverage.leads.some(l=>l.id==='anthropic-claude-opus-5-5-20260922')) coverage.leads.push({id:'anthropic-claude-opus-5-5-20260922',event:'Anthropic released Claude Opus 5.5',sourceUrls:['https://www.anthropic.com/claude-opus-5-5'],status:'IN_PRODUCTION',owner:'newsstand-producer',nextAction:'Use the committed source-bound research packet for a producer-contract check, then create prose from bound sources.',candidate:{path:'operations/product-stewards/newsstand/candidates/claude-opus-5-5-20260924/research-packet.json',sha256:'0b318f052858aabbc8310e3278ef37f2fbc79f1a4607cd36a8d487a69fd787de',commit:'9dbcb19c8c84b433572c7d1e164b008f5d6ba249'},sourceReview:receipt.opus,limits:'Official vendor claims on capability, speed, cost and availability require reader-plan scoping.'});
coverage.asOf='2026-09-24';
coverage.checkedAt=packetObservedAt;
coverage.nextReviewAt=nextCheckAt;
coverage.sourceAudit=outDir+'/reconciliation-script.mjs';
coverage.reconciliationInProgress=true;
coverage.proposedOnly=true;
coverage.proposalAuthority='No canonical mutation: this is a mechanically generated successor for foreground reconciliation.';
write(out,coverage);
const summary={schemaVersion:'newsstand-coverage-reconciliation-summary.v1',generatedAt:now,canonical,canonicalSha256:sha(canonical),proposed:binding(out),sourceCheckCount:coverage.sourceChecks.length,leadCount:coverage.leads.length,nonretryableReviews:coverage.sourceChecks.filter(s=>s.retryPolicy==='NONRETRYABLE').length,changedSourceCheckCount:coverage.sourceChecks.filter(s=>!canonicalByUrl.has(s.url)||JSON.stringify(s)!==JSON.stringify(canonicalByUrl.get(s.url))).length,
  changedSourceCheckUrls:coverage.sourceChecks.filter(s=>!canonicalByUrl.has(s.url)||JSON.stringify(s)!==JSON.stringify(canonicalByUrl.get(s.url))).map(s=>s.url),newLeadIds:['anthropic-claude-opus-5-5-20260922'],unchangedBlockedRows:coverage.sourceChecks.filter(s=>s.status==='BLOCKED'&&s.retryPolicy!=='NONRETRYABLE'&&s.checkedAt!==packetObservedAt).map(s=>s.url),limits:'The proposal carries actual 10:00 receipts. It does not claim a new observation for untouched source rows.'};
write(path.join(outDir,'reconciliation-summary.json'),summary);
console.log(JSON.stringify(summary,null,2));
