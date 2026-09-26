import fs from 'node:fs';import crypto from 'node:crypto';import path from 'node:path';
const root=process.cwd(),d='operations/product-stewards/newsstand/evidence/morning-20260926/source-refresh';
const base=d+'/proposed-coverage-progress-r2.json',rawRel=d+'/raw-source-validity-r3.json',outRel=d+'/proposed-coverage-progress-r3.json',summaryRel=d+'/source-reconciliation-r3.json';
const read=p=>fs.readFileSync(path.join(root,p)),j=p=>JSON.parse(read(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),write=(p,x)=>fs.writeFileSync(path.join(root,p),JSON.stringify(x,null,2)+'\n');
const baseBytes=read(base),rawBytes=read(rawRel),raw=JSON.parse(rawBytes),c=JSON.parse(baseBytes),reviewedAt=raw.observedAt,next='2026-09-27T14:00:00Z',rawBind={path:rawRel,sha256:sha(rawBytes)};
const alt=new Map(raw.alternativeObservations.map(x=>[x.url,x]));
const exact=new Map(raw.exactCurrentObservations.map(x=>[x.url,x]));
for(const s of c.sourceChecks){const o=exact.get(s.url);if(!o)continue;s.previousObservation={checkedAt:s.checkedAt,status:s.status,assessment:s.assessment,capture:s.capture??null};s.checkedAt=o.checkedAt;s.status=o.status;s.assessment=o.assessment;s.capture=rawBind;s.timestampMeaning='Actual current exact-route observation in the consolidated Sep26 validity pass.';s.nextCheckAt=next;if(o.status==='BLOCKED'){s.missingInput=s.missingInput||'Accessible complete original source content.';s.nextRecoveryStep=s.nextRecoveryStep||'Retry once when due unless the route becomes NONRETRYABLE; do not infer content from an access failure.';}}
const aidbAlt=alt.get('https://aidailybrief.ai/agent.json'), mollickAlt=alt.get('https://www.oneusefulthing.org/archive');
const alternativeFor=s=>{
 if(s.url==='https://x.com/cognition/status/2098142686486356185')return alt.get('https://www.cognition.ai/');
 if(s.url==='https://x.com/bot/status/2098183353665261979')return alt.get('https://x.ai/news/introducing-grok-bot');
 if(s.url==='https://www.reuters.com/technology/artificial-intelligence/')return alt.get('https://apnews.com/article/1526da03842cfeef12d0fb69b6b7ad28');
 if(s.url==='https://www.aais.pku.edu.cn/info/1355/20361.htm')return alt.get('https://github.com/guomics-lab/PTV-1');
 if(s.url==='https://www.oneusefulthing.org/feed'||s.url==='https://www.oneusefulthing.org/')return mollickAlt;
 if(s.url==='https://www.nature.com/subjects/machine-learning/nature')return alt.get('https://www.nature.com/subjects/machine-learning');
 if(s.url.includes('aidailybrief.ai')||s.url.includes('aidailybrief.beehiiv.com'))return aidbAlt;
 throw Error('no alternative for '+s.url);
};
const reviews=[];
for(const s of c.sourceChecks.filter(x=>x.retryPolicy==='NONRETRYABLE')){
 const oldBind=s.recoveryReview;if(!oldBind)throw Error('missing prior recovery review '+s.url);const old=j(oldBind.path),a=alternativeFor(s);if(!a||a.url===s.url)throw Error('invalid alternative '+s.url);
 const key=crypto.createHash('sha256').update(s.url).digest('hex').slice(0,12),rel=`${d}/retained-block-r3-${key}.json`;
 const review={schemaVersion:'newsstand-source-recovery-review-v1',url:s.url,originalCheckedAt:s.checkedAt,originalNotRetried:true,reviewedAt,reviewedBy:'/root/california_order_producer',assessment:`Fresh review used the distinct route ${a.url}. ${a.assessment} The retained original was not requested.`,missingInput:s.missingInput,nextCheckAt:s.nextCheckAt,nextRecoveryStep:s.nextRecoveryStep||old.nextRecoveryStep,originalCapture:old.originalCapture,recoverySources:[{url:a.url,status:a.status,checkedAt:a.checkedAt,assessment:a.assessment,capture:rawBind}]};
 write(rel,review);s.previousRecoveryReview=oldBind;s.recoveryReview={path:rel,sha256:sha(read(rel))};reviews.push(s.recoveryReview);
}
c.checkedAt=reviewedAt;c.nextReviewAt=next;c.reviewScope='Sep26 consolidated source validity: all stale r2 exact routes or retained-block recovery reviews inspected together; retained NONRETRYABLE originals were not requested.';
const outBytes=Buffer.from(JSON.stringify(c,null,2)+'\n');fs.writeFileSync(path.join(root,outRel),outBytes);
write(summaryRel,{schemaVersion:'newsstand-coverage-successor-proposal-v1',revision:'r3',proposalOnly:true,observedAt:reviewedAt,editor:'/root/california_order_producer',predecessor:{path:base,sha256:sha(baseBytes)},evidence:rawBind,successor:{path:outRel,sha256:sha(outBytes)},retainedNonretryableCount:reviews.length,newRecoveryReviews:reviews,exactCurrentRoutes:raw.exactCurrentObservations.map(x=>x.url),originalNonretryableRoutesRequested:raw.originalNonretryableRoutesRequested,canonicalWrites:0,publicWrites:0,goal:'Standard checker must return a verified coverage result; unfinished leads and retained source holds may truthfully keep exit 1.'});
console.log(JSON.stringify({successor:{path:outRel,sha256:sha(outBytes)},reviews:reviews.length,exact:raw.exactCurrentObservations.length},null,2));
