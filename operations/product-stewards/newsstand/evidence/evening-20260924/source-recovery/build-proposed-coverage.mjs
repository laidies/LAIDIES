#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd();
const outDir='operations/product-stewards/newsstand/evidence/evening-20260924/source-recovery';
const canonical='operations/product-stewards/newsstand/editorial-intake/coverage-progress.json';
const observedAt='2026-09-25T03:03:20Z';
const nextCheckAt='2026-09-25T14:00:00Z';
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const bind=p=>({path:p,sha256:hash(p)});
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const write=(p,v)=>fs.writeFileSync(path.join(root,p),JSON.stringify(v,null,2)+'\n');
const coverage=structuredClone(read(canonical));
const predecessorSha256=hash(canonical);
const byUrl=new Map(coverage.sourceChecks.map(s=>[s.url,s]));
const receipt={
 roster:bind(outDir+'/six-desk-provider-raw.json'),
 indexFinds:bind(outDir+'/index-date-finds-raw.json'),
 consequential:bind(outDir+'/consequential-originals-raw.json'),
 incidentPrimary:bind(outDir+'/incident-primary-followup-raw.json'),
 openaiFollow:bind(outDir+'/openai-material-followups-raw.json'),
 aidbChannels:bind(outDir+'/aidb-channel-raw.json'),
 appleFind:bind(outDir+'/aidb-podcast-find-raw.json')
};
function update(url,assessment,capture){
 const row=byUrl.get(url); if(!row) throw Error('missing source '+url);
 row.previousObservation={checkedAt:row.checkedAt,assessment:row.assessment,capture:row.capture};
 row.checkedAt=observedAt; row.status='CHECKED'; row.assessment=assessment; row.capture=capture; row.nextCheckAt=nextCheckAt;
 row.timestampMeaning='Actual evening source observation; not timestamp-only renewal.';
}
update('https://openai.com/news/','CHECKED_CURRENT_INDEX_AND_FOLLOWED_MATERIAL: Sep23 Ads expansion was reviewed and geographically excluded; Sep23 Airbnb agreement and Sep22 prompt-caching release were reviewed and excluded as enterprise/developer-scoped.',receipt.openaiFollow);
update('https://www.anthropic.com/news','CHECKED_CURRENT_INDEX: no Sep24 release; existing Sep23 enzyme-system hold remains.',receipt.roster);
update('https://ai.google.dev/gemini-api/docs/changelog','CHECKED_CURRENT_CHANGELOG_AND_TTS_GUIDE: Sep22 Gemini 3.8 Flash TTS GA was reviewed as a developer-API release; access/cost/consent limits remain needed for any general-reader treatment.',receipt.consequential);
update('https://apnews.com/hub/artificial-intelligence','CHECKED_CURRENT_INDEX: no Sep23/24 date marker surfaced in this accessible hub capture; no material lead inferred from absent markers.',receipt.roster);
update('https://www.nature.com/subjects/machine-learning','CHECKED_CURRENT_INDEX: no Sep24 date marker surfaced in this accessible subject capture; no material lead inferred from absent markers.',receipt.roster);
update('https://www.ftc.gov/news-events/news/press-releases','CHECKED_CURRENT_PRESS_INDEX: Sep24 Rules of Practice and impersonation-platform comment notices are not AI-specific releases.',receipt.indexFinds);
update('https://www.eff.org/updates','CHECKED_CURRENT_INDEX: the only Sep24 AI item remains the DraftKings commentary already held pending its attributed report.',receipt.indexFinds);
update('https://www.bleepingcomputer.com/news/','CHECKED_CURRENT_INDEX_AND_FOLLOWED_MATERIAL: Sep24 OpenAI/Australian government incident followed to government transcript; Carbonato article reviewed as exposed-Docker administrator scope.',receipt.consequential);
update('https://aidailybrief.ai/agent.json','CHECKED_CURRENT_INDEX: generated 2026-09-24T17:04:04.312Z; current rolling releases enumerate Sep18,20,21,22,23 and no Sep24 edition. This index is metadata only, not full-content review.',receipt.aidbChannels);
update('https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614','PARTIAL_CURRENT_PODCAST_PAGE: latest visible episode is the Sep23 Opus/GPT-6 title; Apple show notes are not transcript or full-audio review.',receipt.aidbChannels);
const add=l=>{if(!coverage.leads.some(x=>x.id===l.id)) coverage.leads.push(l);};
add({
 id:'openai-agent-australia-medicare-20260924',
 event:'Australian Prime Minister says an OpenAI agent gained unauthorised access to public and non-public files in a Medicare statistics reporting portal during June research activity.',
 sourceUrls:['https://www.pm.gov.au/media/press-conference-new-york','https://www.bleepingcomputer.com/news/security/openai-hacked-australian-medicare-govt-site-probed-data-providers/','https://transluce.org/agent-activity'],
 status:'UNASSESSED',
 owner:'/root',
 sourceReview:{governmentTranscript:receipt.incidentPrimary,reportedAccount:receipt.consequential,independentResearch:receipt.incidentPrimary},
 claimLimit:'Official account says no personal information is believed to have been accessed at this stage, no broader Services Australia network compromise is currently evidenced, and investigations are ongoing. Do not call this a confirmed personal-data breach or claim scope beyond the disclosed portal/files.',
 nextAction:'Prepare a source-bound private candidate only after locating OpenAI’s attributable current account of the incident and preserving the government investigation’s provisional limits.'
});
add({
 id:'gemini-3-8-tts-ga-20260922',
 event:'Google documents general availability of Gemini 3.8 Flash TTS and Flash-Lite TTS in the Gemini API.',
 sourceUrls:['https://ai.google.dev/gemini-api/docs/changelog','https://ai.google.dev/gemini-api/docs/speech-generation'],
 status:'EXCLUDED',reviewedAt:observedAt,reviewedBy:'independent-source-recovery-2000-20260924',
 sourceReview:{officialRelease:receipt.roster,officialGuide:receipt.consequential},
 reason:'Developer API release with no verified ordinary-account availability, cost, regional availability, or consent-policy assessment in this bounded pass.',
 nextAction:'Reassess only if a reader-relevant product surface or complete access/price/voice-consent evidence is recovered.'
});
add({
 id:'openai-chatgpt-ads-seasia-20260923',
 event:'OpenAI says ChatGPT Ads began rolling out to seven Southeast Asian markets and Taiwan.',
 sourceUrls:['https://openai.com/index/chatgpt-ads-expands-southeast-asia-taiwan/'],
 status:'EXCLUDED',reviewedAt:observedAt,reviewedBy:'independent-source-recovery-2000-20260924',
 sourceReview:{officialRelease:receipt.openaiFollow},
 reason:'Geographically bounded advertising-market expansion; this pass found no verified change to the reader’s local access or plan terms beyond OpenAI’s announcement.',
 nextAction:'Reassess with a relevant market or plan change; do not generalize this rollout to all ChatGPT users.'
});
add({
 id:'openai-gpt6-prompt-caching-20260922',
 event:'OpenAI announced prompt-caching changes for GPT-6 API applications.',
 sourceUrls:['https://openai.com/index/better-prompt-caching-for-gpt-6/'],
 status:'EXCLUDED',reviewedAt:observedAt,reviewedBy:'independent-source-recovery-2000-20260924',
 sourceReview:{officialRelease:receipt.openaiFollow},
 reason:'Developer API operations feature; no ordinary-reader payoff or general ChatGPT setting was established.',
 nextAction:'Reassess only with verified user-facing availability or a specific beginner-relevant application.'
});
add({
 id:'carbonato-ai-agent-docker-malware-20260924',
 event:'BleepingComputer reports a botnet using an AI-agent framework on insecure exposed Docker environments.',
 sourceUrls:['https://www.bleepingcomputer.com/news/security/new-carbonato-malware-uses-ai-agents-to-hijack-exposed-docker-hosts/','https://www.threatdown.com/blog/carbonato/'],
 status:'EXCLUDED',reviewedAt:observedAt,reviewedBy:'independent-source-recovery-2000-20260924',
 sourceReview:{reportedAccount:receipt.consequential,securityVendor:receipt.incidentPrimary},
 reason:'The reported target is an exposed, unauthenticated Docker administration surface; no general consumer or ordinary workplace-AI action follows from the bounded evidence.',
 nextAction:'Retain as technical threat context; revisit only if a verified broad user-facing exposure develops.'
});
const codexLead=coverage.leads.find(l=>l.id==='codex-sandbox-research-20260920');
if(!codexLead) throw Error('Missing Codex sandbox lead');
codexLead.sourceUrls=['https://www.accomplish.ai/blog/escaping-the-openai-codex-sandbox-twice/','https://www.bleepingcomputer.com/news/security/researchers-escape-openai-codex-sandbox-to-run-commands-on-host/'];
codexLead.sourceReview={...codexLead.sourceReview,providerAcknowledgement:{path:'operations/product-stewards/newsstand/candidates/codex-sandbox-research-20260920/evening-source-reconciliation-20260924.json',sha256:hash('operations/product-stewards/newsstand/candidates/codex-sandbox-research-20260920/evening-source-reconciliation-20260924.json')},claimLimit:'BleepingComputer reports an OpenAI spokesperson confirmed both issues were addressed in August. Researcher version/build thresholds remain attributed and are not an independent patch test; do not conflate CLI and desktop-app identities.',noExploitHandling:'No mechanism was reproduced, tested, or copied into production material.'};
codexLead.nextAction='Use the provider acknowledgement plus the two bound sources for a producer contract and re-authored private prose. Keep two fixes distinct, attribute version/build thresholds to the researcher, and do not claim independent patch testing.';
coverage.asOf='2026-09-24';
coverage.checkedAt=observedAt;
coverage.nextReviewAt=nextCheckAt;
coverage.sourceAudit=outDir+'/build-proposed-coverage.mjs';
coverage.reconciliationInProgress=true;
coverage.proposedOnly=true;
coverage.proposalAuthority='PROPOSAL_ONLY: root must independently reconcile and adopt any canonical change; this packet does not mutate canonical coverage, cursor, candidate, or public content.';
write(outDir+'/proposed-coverage-progress.json',coverage);
const inventory={
 schema:'aidb-edition-inventory.v2',
 asOf:'2026-09-24',
 recordedAt:'2026-09-24T20:03:20-07:00',
 evidence:[receipt.aidbChannels,receipt.appleFind,{path:'operations/product-stewards/newsstand/evidence/recovery-1600-20260924/source-recovery/aidb-sep19-sep24-probes-raw.json',sha256:hash('operations/product-stewards/newsstand/evidence/recovery-1600-20260924/source-recovery/aidb-sep19-sep24-probes-raw.json')}],
 editions:[
  {editionDate:'2026-09-23',title:'Opus 5.5 vs GPT-6 Sol and Luna',url:'https://aidailybrief.ai/e/2026-09-23',discoveryChannels:['website','podcast'],complete:false,pendingReason:'Website index and Apple show notes establish release identity only; complete body, transcript, item count and transcript hash were not inspected.',nextAction:'Recover legitimate complete publisher content without inferring a transcript hash or item count.'},
  {editionDate:'2026-09-22',title:'Agent Wars!',url:'https://aidailybrief.ai/e/2026-09-22',discoveryChannels:['website'],complete:false,pendingReason:'Official index metadata only; full content remains unrecovered.',nextAction:'Recover legitimate complete publisher content.'},
  {editionDate:'2026-09-21',title:'The State of the AI Debate',url:'https://aidailybrief.ai/e/2026-09-21',discoveryChannels:['website'],complete:false,pendingReason:'Official index metadata only; full content remains unrecovered.',nextAction:'Recover legitimate complete publisher content.'},
  {editionDate:'2026-09-20',title:'7 Ways How We Use AI Is Changing',url:'https://aidailybrief.ai/e/2026-09-20',discoveryChannels:['website'],complete:false,pendingReason:'Official index metadata only; full content remains unrecovered.',nextAction:'Recover legitimate complete publisher content.'},
  {editionDate:'2026-09-18',title:'The AI Challenges Businesses Are Actually Focused On Right Now',url:'https://aidailybrief.ai/e/2026-09-18',discoveryChannels:['website'],complete:false,pendingReason:'Official index metadata only; exact edition/transcript normal attempts recorded at 16:01 returned inaccessible.',nextAction:'Retry once normally when due unless the exact route becomes NONRETRYABLE.'}
 ],
 channelChecks:[
  {channel:'website',url:'https://aidailybrief.ai/agent.json',checkedAt:'2026-09-24T20:03:20-07:00',status:'CHECKED',releaseUrls:['https://aidailybrief.ai/e/2026-09-23','https://aidailybrief.ai/e/2026-09-22','https://aidailybrief.ai/e/2026-09-21','https://aidailybrief.ai/e/2026-09-20','https://aidailybrief.ai/e/2026-09-18'],note:'Actual current index enumerated releases through Sep23, with no Sep24 entry. Enumeration is not full-content review.'},
  {channel:'podcast',url:'https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614',checkedAt:'2026-09-24T20:03:20-07:00',status:'PARTIAL',releaseUrls:['https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614'],note:'Current show page visibly names Sep23 episode but did not expose a new Sep24 release or full audio/transcript.'},
  {channel:'newsletter',url:'https://aidailybrief.beehiiv.com/',checkedAt:'2026-09-24T11:38:06-07:00',status:'UNAVAILABLE',releaseUrls:[],note:'Exact landing URL is NONRETRYABLE and was not reopened; no distinct publisher archive was recovered.'}
 ],
 expectedMissingDates:['2026-09-19','2026-09-24'],
 expectedMissingMeaning:'Sep19 was not listed in the current rolling index and its normal dated probes were inaccessible at 16:01. Sep24 was not listed by the publisher index generated at 17:04Z; the 16:01 exact edition/transcript probes were inaccessible. Neither observation proves no later release.'
};
write(outDir+'/aidb-edition-inventory.v2.json',inventory);
const summary={schemaVersion:'newsstand-evening-source-recovery-summary.v1',observedAt,canonical,canonicalSha256:predecessorSha256,proposed:bind(outDir+'/proposed-coverage-progress.json'),inventory:bind(outDir+'/aidb-edition-inventory.v2.json'),changedSourceChecks:['openai.com/news','anthropic.com/news','gemini-api changelog','AP AI hub','Nature ML','FTC press','EFF updates','BleepingComputer news','AIDB agent','AIDB Apple podcast'],newLeadIds:['openai-agent-australia-medicare-20260924','gemini-3-8-tts-ga-20260922','openai-chatgpt-ads-seasia-20260923','openai-gpt6-prompt-caching-20260922','carbonato-ai-agent-docker-malware-20260924'],status:'PARTIAL_EVENING_RECONCILIATION_NOT_PUBLICATION',limits:['No exact NONRETRYABLE route was reopened.','No complete AIDB edition, transcript, item count, or transcript hash was recovered.','The Australian government investigation is ongoing; the proposal preserves that no personal-information impact is currently evidenced.']};
write(outDir+'/reconciliation-summary.json',summary);
console.log(JSON.stringify(summary,null,2));
