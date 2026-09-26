import fs from 'node:fs';
import crypto from 'node:crypto';
import {inspectContentProducerContract} from '../../../../../scripts/check-content-producer-contract.mjs';
import {inspectProseQualityReview} from '../../../../../scripts/check-prose-quality-admission.mjs';
import {prepareDraft,inspectPreparedDraft} from '../../../../../scripts/prepare-newsstand-draft.mjs';
import {storyParagraphs} from '../../review-runtime/protocol.mjs';

const d='operations/product-stewards/newsstand/candidates/house-ratepayer-protection-20260920/';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const stable=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?`[${v.map(stable).join(',')}]`:`{${Object.keys(v).sort().map(k=>`${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}`;
const read=n=>fs.readFileSync(d+n);
const json=n=>JSON.parse(read(n));
const bind=n=>({path:d+n,sha256:sha(read(n))});
const write=(n,v)=>fs.writeFileSync(d+n,typeof v==='string'?v:JSON.stringify(v,null,2)+'\n');
const now=new Date().toISOString();
const day='2026-09-23';
const visual={src:'/assets/newsstand/house-ratepayer-protection-20260920.png',alt:'Models of a neighbourhood and a data centre linked to a substation on a planning desk, beside two open accounting binders.',credit:'Illustration: LAiDIES'};

const status=bind('sources/source-status-20260923.json');
const evidence=json('source-evidence.json');
evidence.checkedAt=now;
evidence.currentStatus='PASSED_HOUSE_SENATE_COMPANION_REFERRED_NOT_ENACTED';
evidence.freshnessFinding='GovInfo still identifies H.R. 9340 as House-engrossed with a September 16 last action. A current official Husted legislative record separately lists S.5028, also titled the Ratepayer Protection Act, as referred to the Senate Energy and Natural Resources Committee on September 18. No inspected official source establishes Senate passage of H.R. 9340 or enactment through September 23.';
evidence.freshnessLimits=['The complete Congress.gov H.R. 9340 action page remained blocked to the normal web client, so this is a bounded check of named official sources rather than a complete action docket.','S.5028 is a separate Senate bill number; its referral is not treated as Senate passage of H.R. 9340.','The Senate participant releases establish the September 17 objection but are advocacy sources; their savings forecasts are excluded.','No bill passage, enactment, utility order or household bill change is inferred from the House vote.'];
evidence.records=evidence.records.filter(r=>r.id!=='official-status-refresh-20260923');
evidence.records.push({id:'official-status-refresh-20260923',url:'https://www.govinfo.gov/app/details/BILLS-119hr9340eh',publisher:'U.S. Government Publishing Office and official U.S. Senate pages',authority:'Current official status surfaces checked September 23',capture:status,passages:[{locator:'GovInfo content details',excerpt:'Last Action Date Listed September 16, 2026; Bill Version Engrossed in House (EH)'},{locator:'Senator Jon Husted legislative record',excerpt:'09-18-2026 | S.5028 | Ratepayer Protection Act Latest Action: Read twice and referred to the Committee on Energy and Natural Resources.'},{locator:'U.S. Senate floor proceedings',excerpt:'Wednesday, Sep 23, 2026 Convene at 10:00 a.m. Previous Meeting Tuesday, Sep 22, 2026'}],limitations:['The GovInfo item is H.R. 9340; the Husted record item is the separate S.5028.','The Senate floor schedule does not establish a complete bill-action docket.','Direct curl captures of the Senate pages returned HTTP 403; the normal web client opened the pages, and the failed response bodies are preserved in the source directory.']});
write('source-evidence.json',evidence);

const contract=json('producer-contract.json');
contract.createdAt=now;
contract.readerContract.surfaceJob='Daily legal-policy brief on the September 16 House passage, September 17 Senate objection and September 18 Senate companion-bill referral, current through September 23.';
contract.canonicalTruth[0].source=bind('source-evidence.json');
contract.draftArchitecture.causalSequence[4]='A September 17 Senate unanimous-consent attempt drew an objection; the separate S.5028 was referred to committee September 18; no Senate passage of H.R. 9340 or enactment was found in the inspected official sources through September 23.';
contract.draftArchitecture.presentationPlan='Use the admitted story-specific planning-desk illustration showing separate neighbourhood and data-centre models connected to one substation, with blank accounting binders. The visual must not imply enacted law, guaranteed savings or a numerical consumption comparison.';
contract.visualAdmission=bind('art/independent-review.json');
write('producer-contract.json',contract);
const contractCheck=inspectContentProducerContract(contract,{root:process.cwd()});
write('producer-contract-integrity.json',{checkedAt:now,contract:bind('producer-contract.json'),sourceEvidence:bind('source-evidence.json'),visualAdmission:bind('art/independent-review.json'),...contractCheck});
if(contractCheck.errors.length)throw Error(contractCheck.errors.join('\n'));

const story=json('story.json');
story.updatedAt=now; story.lastCheckedAt=now; story.heroVisual=visual;
story.laidies_read='<p>The bill would require state utility regulators and nonregulated utilities to <em>consider</em> the standard: begin consideration or set a hearing within one year, then complete it and make a determination within two. It would not itself impose one identical rate across the country.</p><p>On September 17, Senator Jon Husted tried to secure Senate passage by unanimous consent. Senator Martin Heinrich objected, arguing that consideration was too weak. Both offices describe that result; their policy claims remain advocacy. Senate bill S.5028 was referred to committee September 18. No inspected official source establishes Senate passage of H.R. 9340 or enactment through September 23.</p>';
story.what_this_means='<p>Your electricity bill is set through your utility and its regulator or other governing authority. Whether those upgrade costs reach existing customers depends on local rules, the project and the approved rate design. H.R. 9340 addresses that question, but it guarantees neither adoption of its standard nor a household saving.</p><p>For a local claim, ask: which utility or commission is deciding, which upgrade is needed, who would pay under the proposed rate, and whether you are looking at a bill, an enacted rule or an approved rate case.</p>';
for(const s of story.sources)s.accessedAt=day;
if(!story.sources.some(s=>s.id==='s5028-official-status-20260918'))story.sources.push({id:'s5028-official-status-20260918',label:'Senator Jon Husted — current legislative record for S.5028',url:'https://www.husted.senate.gov/legislation/legislative-record/',publisherType:'government-primary-record',accessedAt:day,approvalStatus:'independent-review-required'});
write('story.json',story);
write('review-text.json',stable(story)+'\n');
const strip=x=>x.replace(/<\/p><p>/g,'\n\n').replace(/<[^>]+>/g,'');
write('article.md',`# ${story.headline}\n\n## The Story\n\n${strip(story.the_story)}\n\n## The LAiDIES Read\n\n${strip(story.laidies_read)}\n\n## What This Means for You\n\n${strip(story.what_this_means)}\n\n## The Cocktail Party Explanation\n\n${story.cocktail_party}\n\n## Class Notes\n\n${story.class_notes}\n`);
write('rendered-article.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${story.headline}</title></head><body><article><h1>${story.headline}</h1><figure><img src="art/house-grid-costs-v2.png" alt="${visual.alt}"><figcaption>${visual.credit}</figcaption></figure><h2>The Story</h2>${story.the_story}<h2>The LAiDIES Read</h2>${story.laidies_read}<h2>What This Means for You</h2>${story.what_this_means}<h2>The Cocktail Party Explanation</h2><p>${story.cocktail_party}</p><h2>Class Notes</h2><p>${story.class_notes}</p></article></body></html>\n`);

const cm=json('claim-map.json');
for(const c of cm.claims)c.scopeAndFreshness=c.scopeAndFreshness.replaceAll('September 21','September 23');
cm.claims=cm.claims.filter(c=>c.claimId!=='senate-companion-referral');
cm.claims.push({claimId:'senate-companion-referral',claim:'A separate Senate bill with the same title, S.5028, was referred to the Energy and Natural Resources Committee on September 18; this is not Senate passage of H.R. 9340.',candidateEvidence:[{excerpt:'Senate bill S.5028 was referred to committee September 18.',locator:'The LAiDIES Read'}],sourceIds:['official-status-refresh-20260923'],sourceEvidence:[{excerpt:'09-18-2026 | S.5028 | Ratepayer Protection Act Latest Action: Read twice and referred to the Committee on Energy and Natural Resources.',locator:'https://www.husted.senate.gov/legislation/legislative-record/'}],scopeAndFreshness:'Current official Husted legislative record checked September 23. The Senate bill number is kept distinct from H.R. 9340.'});
write('claim-map.json',cm);
const claims=cm.claims;

const coverage=json('story-type-coverage.json');
const translation=json('translation.json');
translation.mechanismExact='Whether those upgrade costs reach existing customers depends on local rules, the project and the approved rate design.';
write('translation.json',translation);
coverage.universalAnswers.whatHappened='The House passed H.R. 9340 by 417–3 on September 16; a September 17 Senate unanimous-consent attempt drew an objection, and the separate S.5028 was referred to committee September 18.';
coverage.typeAnswers['legal-policy'].legalStatus='H.R. 9340 passed the House and was not enacted in the inspected official sources through September 23. A separate Senate bill, S.5028, was referred to committee September 18.';
coverage.typeAnswers['legal-policy'].nextMilestone='Any further Senate committee or floor action on H.R. 9340 or S.5028, followed by any enactment or local rate proceeding.';
coverage.translation=translation;
write('story-type-coverage.json',coverage);
const writer={...prepareDraft(contract,{root:process.cwd(),reportingFrame:coverage,sourcePacket:bind('source-evidence.json')}),producerContract:bind('producer-contract.json')};
write('writer-input-current.json',writer);

const sourceRows=[];
for(const c of claims)for(let i=0;i<c.sourceEvidence.length;i++)sourceRows.push({id:c.sourceIds[i]||`${c.claimId}-${i+1}`,url:c.sourceEvidence[i].locator,authority:c.claimId.includes('senate')?'Official record or primary participant account with stated limits.':'Official government record or bill text.',source:{url:c.sourceEvidence[i].locator,passage:c.sourceEvidence[i].excerpt,passageLocator:c.sourceEvidence[i].locator},limitations:c.scopeAndFreshness});
write('editorial-input.json',{readerJob:`${contract.readerContract.humanQuestion} ${contract.readerContract.promisedPayoff}`,completeArtifact:read('review-text.json').toString('utf8'),paragraphs:storyParagraphs(story),communicationAuthority:contract.communicationDesign,claims,sources:sourceRows,reviewBoundary:{status:'PENDING_DISTINCT_INDEPENDENT_REVIEW',instruction:'Reject any implication that House passage is law, that S.5028 referral equals Senate passage of H.R. 9340, that consideration automatically imposes one national rate, or that a household bill changed.'}});
write('source-packet.json',{schemaVersion:'laidies.newsstand-source-packet.v1',candidateId:story.id,sourceEvidence:bind('source-evidence.json'),claims,sources:sourceRows});
write('publication-manifest.json',{schemaVersion:'laidies-content-artifact-manifest.v1',candidateId:story.id,surface:'NEWSSTAND_DAILY',contentClass:'NEWS',reviewText:bind('review-text.json'),rendered:bind('rendered-article.html'),story:bind('story.json'),heroVisual:{...visual,artifact:bind('art/house-grid-costs-v2.png'),mobilePreview:bind('art/mobile-preview.png')},visualAdmission:bind('art/independent-review.json')});

const observations=json('producer-observations.json');
observations.storySha256=sha(JSON.stringify(story)); observations.wordCount=[story.the_story,story.laidies_read,story.what_this_means,story.cocktail_party,story.class_notes].join(' ').replace(/<[^>]+>/g,' ').replace(/[“”]/g,'').trim().split(/\s+/).filter(Boolean).length;
if(observations.wordCount<250||observations.wordCount>350)throw Error(`Article word count ${observations.wordCount} is outside 250-350.`);
observations.readerAnswers.status='Senate bill S.5028 was referred to committee September 18.';
observations.repairsMade=[...observations.repairsMade.filter(x=>!x.includes('September 21')), 'Refreshed official status through September 23 and kept the separate Senate bill S.5028 distinct from H.R. 9340.', 'Bound the independently admitted v2 planning-desk illustration and its exact mobile preview.'];
observations.limitations=['The complete Congress.gov H.R. 9340 action page remained blocked to the normal web client; the September 23 check is bounded to the named official sources.','No inspected official source establishes Senate passage of H.R. 9340 or enactment through September 23.','S.5028 is a separate Senate bill and its committee referral is not Senate passage of H.R. 9340.','No utility rate case or household-bill outcome is established.','Producer explain-back and transfer are AI simulations; no human-reader comprehension observation was made.','The visual passed independent pixel review, but no public NewsStand crop or live placement has been checked.'];
observations.visual={artifact:bind('art/house-grid-costs-v2.png'),mobilePreview:bind('art/mobile-preview.png'),admission:bind('art/independent-review.json'),verdict:'PASS_VISUAL'};
write('producer-observations.json',observations);

const review=json('producer-publication-review.json');
review.reviewedAt=now; review.artifact={manifest:bind('publication-manifest.json'),reviewText:bind('review-text.json'),rendered:bind('rendered-article.html')};
review.factualReview.sourceBindings=[bind('editorial-input.json'),bind('source-packet.json'),bind('source-evidence.json')];
review.factualReview.claimMap=claims.map(c=>({...c,status:'QUALIFIED',sourceBinding:bind('editorial-input.json')}));
review.factualReview.reviewedThrough=day; review.factualReview.nextTrigger='Any Senate action on H.R. 9340 or S.5028, amendment, enactment, state proceeding, utility rate case or publication after September 23.';
review.limitations=observations.limitations;
review.learningDisposition={disposition:'NO_NEW_DEFECT',rationale:'The producer found no unresolved prose, factual or semantic defect. The purpose-built visual passed independent pixel review; distinct external prose and factual admission remains pending.'};
if(review.outcomes?.freshnessReviewability)review.outcomes.freshnessReviewability.artifactEvidence=[{excerpt:'No inspected official source establishes Senate passage of H.R. 9340 or enactment through September 23.',locator:'complete exact story'}];
if(review.outcomes?.communicationBenchmark)review.outcomes.communicationBenchmark.artifactEvidence=[{excerpt:'Whether those upgrade costs reach existing customers depends on local rules, the project and the approved rate design.',locator:'complete exact story'}];
write('producer-publication-review.json',review);

const prose=inspectProseQualityReview(review,{root:process.cwd()});
const draft=inspectPreparedDraft(story,writer,observations);
write('producer-self-review-check.json',{checkedAt:now,contract:contractCheck,prose,draft,visualAdmission:bind('art/independent-review.json')});
if(prose.errors.length||draft.errors.length)throw Error(JSON.stringify({contract:contractCheck.errors,prose:prose.errors,draft:draft.errors},null,2));
console.log(JSON.stringify({status:'IMAGE_COMPLETE_REVIEW_READY_EXTERNAL_REVIEW_PENDING',wordCount:observations.wordCount,contract:bind('producer-contract.json'),sourceEvidence:bind('source-evidence.json'),story:bind('story.json'),manifest:bind('publication-manifest.json'),visualAdmission:bind('art/independent-review.json'),preflight:{contractErrors:contractCheck.errors,proseErrors:prose.errors,draftErrors:draft.errors}},null,2));
