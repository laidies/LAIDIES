#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd();
const out='operations/product-stewards/newsstand/evidence/morning-20260925/source-recovery';
const canonical='operations/product-stewards/newsstand/editorial-intake/coverage-progress.json';
const observedAt='2026-09-25T14:03:14.793Z';
const nextCheckAt='2026-09-25T21:00:00Z';
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const bytes=p=>fs.readFileSync(path.join(root,p));
const hash=p=>crypto.createHash('sha256').update(bytes(p)).digest('hex');
const bind=p=>({path:p,sha256:hash(p)});
const coverage=structuredClone(read(canonical));
const predecessorSha256=hash(canonical);
const raw=bind(out+'/raw-web-tool-results.json');
const byUrl=new Map(coverage.sourceChecks.map(s=>[s.url,s]));
const observations={
 'https://apnews.com/hub/artificial-intelligence':'CHECKED_PARTIAL_CURRENT_HUB: returned capture was navigation-heavy; no article was selected or inferred from absent markers.',
 'https://www.nature.com/subjects/machine-learning':'CHECKED_CURRENT_INDEX: Sep24 Australian-agent item matches existing Medicare lead; lab-device item remains unassessed pending its primary source.',
 'https://www.ftc.gov/news-events/news/press-releases':'CHECKED_CURRENT_PRESS_INDEX: latest visible releases were Sep17 and earlier; no material AI development was identified in the bounded capture.',
 'https://www.eff.org/updates':'CHECKED_CURRENT_INDEX: Sep24 DraftKings behavioural-advertising advocacy item was visible; no independent primary-backed new candidate was selected in this pass.',
 'https://www.bleepingcomputer.com/news/':'CHECKED_CURRENT_INDEX_AND_ARTICLE: Carbonato report was inspected and matches the already-EXCLUDED canonical lead; no duplicate was added.',
 'https://openai.com/news/':'CHECKED_CURRENT_INDEX: latest visible entries were Sep23; no Sep24/25 release appeared in the returned index.',
 'https://www.anthropic.com/news':'CHECKED_CURRENT_INDEX: latest visible release was Sep23; no Sep24/25 release appeared in the returned index.',
 'https://ai.google.dev/gemini-api/docs/changelog':'CHECKED_CURRENT_CHANGELOG: latest visible entries were Sep22 and Sep18; no Sep24/25 entry appeared.',
 'https://aidailybrief.ai/agent.json':'CHECKED_METADATA_ONLY: generated 2026-09-25T14:01:42.720Z and lists Sep24 “AI Agents Are Moving Into the Real World”. Metadata does not establish complete edition or transcript review.',
 'https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614':'PARTIAL_CURRENT_PODCAST_PAGE: returned segment was platform navigation, not an episode enumeration or transcript.'
};
for(const [url,assessment] of Object.entries(observations)){
 const row=byUrl.get(url); if(!row)throw Error('missing canonical source: '+url);
 row.previousObservation={checkedAt:row.checkedAt,assessment:row.assessment,capture:row.capture};
 row.checkedAt=observedAt; row.status='CHECKED'; row.assessment=assessment; row.capture=raw; row.nextCheckAt=nextCheckAt;
 row.timestampMeaning='Actual 07:03 Vancouver source observation bound to this receipt; not timestamp-only renewal.';
}
for(const url of ['https://aidailybrief.ai/e/2026-09-24','https://aidailybrief.ai/e/2026-09-24/transcript.md']){
 const row=byUrl.get(url); if(!row)throw Error('missing expected AIDB source: '+url);
 row.previousObservation={checkedAt:row.checkedAt,assessment:row.assessment,capture:row.capture};
 row.checkedAt=observedAt;row.status='BLOCKED';row.assessment='NORMAL_PERMITTED_OPEN_RETURNED_INTERNAL_ERROR; no complete publisher content was recovered.';row.capture=raw;row.nextCheckAt=nextCheckAt;
 row.timestampMeaning='Actual normal permitted route attempt; not a timestamp-only renewal.';
 row.missingInput=url.endsWith('transcript.md')?'Complete publisher transcript or equivalent complete publisher content.':'Complete publisher edition body or equivalent complete publisher content.';
}
const recovery=bind(out+'/additional-recovery-observations.json');
const dueRecovery=bind('operations/product-stewards/newsstand/evidence/evening-20260924/due-source-recovery/search-evidence.json');
function retainedReview(url,recoverySources,assessment,nextRecoveryStep){
 const row=byUrl.get(url);if(!row)throw Error('missing retained source: '+url);
 if(row.status!=='BLOCKED'||row.retryPolicy!=='NONRETRYABLE')throw Error('not a retained nonretryable source: '+url);
 const priorReview=row.recoveryReview?.path ? read(row.recoveryReview.path) : null;
 const originalCapture=priorReview?.originalCapture||row.capture;
 if(!originalCapture?.path||!originalCapture?.sha256)throw Error('missing original capture: '+url);
 row.recoveryReview={
  path:out+'/retained-block-'+crypto.createHash('sha256').update(url).digest('hex').slice(0,12)+'.json',sha256:'PENDING'
 };
 row.nextCheckAt=nextCheckAt;
 const review={schemaVersion:'newsstand-source-recovery-review-v1',url,originalCheckedAt:row.checkedAt,originalNotRetried:true,reviewedAt:observedAt,reviewedBy:'independent-source-recovery-morning-20260925',assessment,missingInput:row.missingInput,nextCheckAt:row.nextCheckAt, nextRecoveryStep,originalCapture,recoverySources};
 const dest=row.recoveryReview.path;fs.writeFileSync(path.join(root,dest),JSON.stringify(review,null,2)+'\n');row.recoveryReview.sha256=hash(dest);
}
const asSource=(url,status,assessment,capture)=>({url,status,checkedAt:observedAt,assessment,capture});
const aidbIndex=asSource('https://aidailybrief.ai/agent.json','CHECKED','Current publisher index metadata was inspected; it identifies rolling releases but is not complete edition or transcript content.',raw);
const oldDue=asSource('https://github.com/guomics-lab/PTV-1','CHECKED','Distinct primary repository identity was recovered by the prior focused normal search; its contents remain uninspected.',dueRecovery);
const cognition=asSource('https://www.cognition.ai/','CHECKED','Prior focused current official-domain discovery returned no dated Devin Voice launch record; no exact X post was retried.',dueRecovery);
const xai=asSource('https://x.ai/news/introducing-grok-bot','CHECKED','A current official launch record is distinct context and does not establish the exact blocked Sep10 post.',recovery);
const ap=asSource('https://apnews.com/article/1526da03842cfeef12d0fb69b6b7ad28','CHECKED','A current independent AP result was recovered but no matched inaccessible Reuters event was established.',recovery);
const oneusefulRoot=asSource('https://www.oneusefulthing.org/','BLOCKED','A normal domain-focused discovery query yielded no result item; no exact nonretryable page was opened.',recovery);
const oneusefulFeed=asSource('https://www.oneusefulthing.org/feed','BLOCKED','A normal domain-focused discovery query yielded no result item; no exact nonretryable feed was opened.',recovery);
const natureSubject=asSource('https://www.nature.com/subjects/machine-learning','CHECKED','Current permitted subject index was inspected; it does not restore inaccessible complete original content.',raw);
retainedReview('https://x.com/cognition/status/2098142686486356185',[cognition],'Distinct official-domain discovery found no dated publisher launch record; original X post was not retried.','Recheck a newly indexed official Cognition changelog or release-note route only.');
retainedReview('https://x.com/bot/status/2098183353665261979',[xai],'Distinct current official xAI launch context was recovered; it cannot prove what the blocked Sep10 post announced.','Recheck a newly published xAI update with the Sep10 event identity only.');
retainedReview('https://www.reuters.com/technology/artificial-intelligence/',[ap],'Distinct current independent reporting was reviewed but did not identify a matched Reuters event. The restricted Reuters route was not opened.','Recover an accessible original or matched independently reportable event before using the Reuters hold.');
retainedReview('https://www.aais.pku.edu.cn/info/1355/20361.htm',[oldDue],'Distinct primary repository identity was recovered through a focused search; repository contents remain uninspected and the original institutional route was not retried.','Inspect the distinct GitHub repository once normally, then queue the iProX accession if methods remain unresolved.');
for(const suffix of ['2026-09-14.json','2026-09-14/transcript.md','2026-09-13.json','2026-09-13/transcript.md','2026-09-12.json','2026-09-12/transcript.md','2026-09-15.json','2026-09-15/transcript.md','2026-09-16.json','2026-09-16/transcript.md'])retainedReview('https://aidailybrief.ai/e/'+suffix,[aidbIndex],'Current distinct publisher index metadata was inspected; it does not provide the missing complete edition or transcript and no exact nonretryable route was reopened.','Recover legitimate complete publisher content through a newly permitted route; do not infer transcript contents from metadata.');
retainedReview('https://aidailybrief.beehiiv.com/',[aidbIndex],'Current distinct publisher index metadata was inspected; it does not provide the missing complete newsletter edition and the nonretryable landing route was not opened.','Recover a legitimate publisher archive or complete edition without reopening the restricted landing URL.');
retainedReview('https://aidailybrief.beehiiv.com/p/even-other-ai-labs-are-rallying-around-anthropic-s-slowdown-proposal',[aidbIndex],'Current distinct publisher index metadata was inspected; it cannot restore the missing complete Beehiiv post and the exact restricted route was not opened.','Recover an accessible complete publisher copy through a newly permitted route.');
retainedReview('https://www.oneusefulthing.org/feed',[oneusefulRoot],'A distinct domain discovery attempt yielded no readable result; the restricted feed was not opened.','Recheck only a newly indexed readable individual post if it is needed for a substantive claim.');
retainedReview('https://www.oneusefulthing.org/',[oneusefulFeed],'A distinct feed-route discovery attempt yielded no readable result; the restricted home page was not opened.','Recheck only a newly indexed readable individual post if it is needed for a substantive claim.');
retainedReview('https://www.nature.com/subjects/machine-learning/nature',[natureSubject],'Current permitted subject-index observation is distinct from the restricted subroute and does not provide complete original content.','Recover a legitimately accessible complete original source without reopening the restricted subroute.');
// The ordinary EFF topic URL was directly opened once in this invocation.
{const row=byUrl.get('https://www.eff.org/issues/ai');if(row){row.previousObservation={checkedAt:row.checkedAt,assessment:row.assessment,capture:row.capture};row.checkedAt=observedAt;row.status='CHECKED';row.assessment='CHECKED_NORMAL_ROUTE: returned 259 lines; no unreviewed page content was promoted to a new lead.';row.capture=recovery;row.nextCheckAt=nextCheckAt;row.timestampMeaning='Actual normal route open; not timestamp-only renewal.';}}

const add=lead=>{if(!coverage.leads.some(x=>x.id===lead.id))coverage.leads.push(lead);};
add({
 id:'aidb-20260924-ai-agents-real-world',
 event:'The publisher’s current agent index labels a Sep24 edition “AI Agents Are Moving Into the Real World.”',
 sourceUrls:['https://aidailybrief.ai/agent.json','https://aidailybrief.ai/e/2026-09-24','https://aidailybrief.ai/e/2026-09-24/transcript.md'],
 status:'EVIDENCE_BLOCKED',
 missingInput:'Complete Sep24 publisher edition or transcript, including item list and actual contents.',
 attemptedRecovery:'The current official agent index was inspected at 2026-09-25T14:03:14.793Z. One normal permitted open of both exact edition and transcript URLs returned Internal Error. The index title is metadata only and was not treated as a transcript.',
 nextCheckAt:nextCheckAt
});
coverage.asOf='2026-09-25';coverage.checkedAt=observedAt;coverage.nextReviewAt=nextCheckAt;
coverage.sourceAudit=out+'/build-proposed-coverage-successor.mjs';coverage.proposedOnly=true;
coverage.proposalAuthority='PROPOSAL_ONLY: root alone may reconcile and adopt this successor into canonical coverage. It does not write canonical coverage, cursor, candidate, or public content.';
fs.writeFileSync(path.join(root,out+'/proposed-coverage-progress.json'),JSON.stringify(coverage,null,2)+'\n');
const retained=coverage.sourceChecks.filter(s=>Date.parse(observedAt)-Date.parse(s.checkedAt)>86400000).map(s=>({url:s.url,status:s.status,retryPolicy:s.retryPolicy||null,checkedAt:s.checkedAt,recoveryReview:s.recoveryReview||null,retainedReason:'Original blocked-route timestamp is retained. The bound recovery review records a distinct current observation; no blocked URL was reopened.'}));
const proposal={
 schemaVersion:'newsstand-coverage-successor-proposal.v1',proposalOnly:true,
 basedOn:{path:canonical,sha256:predecessorSha256},observedAt,nextCheckAt,
 successor:bind(out+'/proposed-coverage-progress.json'),rawObservation:raw,priorDueRecovery:dueRecovery,
 appliedSourceChecks:Object.keys(observations),
 actualBlockedAttempts:['https://aidailybrief.ai/e/2026-09-24','https://aidailybrief.ai/e/2026-09-24/transcript.md'],
 carbonatoCorrection:{canonicalLeadId:'carbonato-ai-agent-docker-malware-20260924',disposition:'ALREADY_EXCLUDED_DUPLICATE',reason:'The full BleepingComputer article matches the existing canonical event identity, source URLs, and excluded Docker-administration-surface scope. This proposal adds no Carbonato candidate or duplicate lead.'},
 addedLeadIds:['aidb-20260924-ai-agents-real-world'],
 retainedBlockedSourceChecks:retained,
 completeness:'PARTIAL: six independent/provider/practitioner routes plus AIDB website/podcast metadata were inspected; AP and Apple were partial returned views, and no AIDB complete edition/transcript was recovered. Nonretryable rows not observed through a distinct current recovery source retain their original times rather than being renewed.'
};
fs.writeFileSync(path.join(root,out+'/reconciliation-summary.json'),JSON.stringify(proposal,null,2)+'\n');
console.log(JSON.stringify({predecessorSha256,successor:proposal.successor,sourceUpdates:Object.keys(observations).length,blockedAttempts:2,retainedBlocked:retained.length},null,2));
