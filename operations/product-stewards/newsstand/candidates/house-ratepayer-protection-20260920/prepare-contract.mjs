import fs from 'node:fs';
import crypto from 'node:crypto';
import {inspectContentProducerContract} from '../../../../../scripts/check-content-producer-contract.mjs';

const d='operations/product-stewards/newsstand/candidates/house-ratepayer-protection-20260920/';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const bind=p=>({path:p,sha256:sha(fs.readFileSync(p))});
const write=(n,v)=>fs.writeFileSync(d+n,JSON.stringify(v,null,2)+'\n');
const j=n=>JSON.parse(fs.readFileSync(d+n,'utf8'));
const originalEvidence='operations/product-stewards/newsstand/evidence/evening-20260920/house-senate-originals.json';
const captures={
  bill:bind(d+'sources/govinfo-engrossed-house-20260921.json'),
  vote:bind(d+'sources/house-clerk-roll-312-20260921.json'),
  husted:bind(d+'sources/husted-senate-objection-20260921.json'),
  participantOriginals:bind(originalEvidence),
  senateSchedule:bind(d+'sources/senate-floor-schedule-20260921.json')
};
const sourceEvidence={
  schemaVersion:'newsstand-source-evidence-v1',
  candidateId:'house-ratepayer-protection-20260920',
  checkedAt:'2026-09-21T12:00:00-07:00',
  currentStatus:'PASSED_HOUSE_RECEIVED_IN_SENATE_NOT_ENACTED',
  freshnessFinding:'The House passed H.R. 9340 on September 16. Participant accounts agree that a September 17 unanimous-consent attempt in the Senate drew an objection. The Senate then held only a pro forma meeting on September 18 and next planned to convene September 22. No later Senate passage or enactment was found through September 21.',
  freshnessLimits:['Congress.gov bill pages were blocked to the normal web client, so this packet does not claim a complete Congress.gov action docket.','The Senate participant releases establish the September 17 objection but are advocacy sources; their savings forecasts are excluded.','No bill passage, enactment, utility order or household bill change is inferred from the House vote.'],
  records:[
    {
      id:'hr9340-engrossed-house-text-20260916',url:'https://www.govinfo.gov/content/pkg/BILLS-119hr9340eh/html/BILLS-119hr9340eh.htm',publisher:'U.S. Government Publishing Office',authority:'Official House-engrossed bill text',capture:captures.bill,
      passages:[
        {locator:'section 2(a), proposed PURPA section 111(d)(22)(A)',excerpt:'A rate charged, or entered into, by an electric utility for providing electric service to a large-load customer shall be designed to recover from the large-load customer the full, incremental cost of any generation, transmission, or distribution upgrade necessary to serve the load of such large-load customer'},
        {locator:'section 2(a), proposed PURPA section 111(d)(22)(B)',excerpt:'Before making any generation, transmission, or distribution upgrade that is necessary to serve the load of a large-load customer, an electric utility shall require the large-load customer provide to the electric utility financial assurances or contributions to cover the cost of such upgrade.'},
        {locator:'section 2(a), proposed PURPA section 111(d)(22)(C)',excerpt:'have, in the aggregate, a peak electric demand of 100 megawatts or more at a single site or campus.'},
        {locator:'section 2(b), proposed PURPA section 112(b)(9)',excerpt:'Not later than 1 year after the date of enactment of this paragraph, each State regulatory authority (with respect to each electric utility for which the State has ratemaking authority) and each nonregulated electric utility shall commence consideration under section 111, or set a hearing date for consideration, with respect to the standard'},
        {locator:'section 2(b), proposed PURPA section 112(b)(9)',excerpt:'Not later than 2 years after the date of enactment of this paragraph, each State regulatory authority (with respect to each electric utility for which the State has ratemaking authority) and each nonregulated electric utility shall complete the consideration and make the determination under section 111 with respect to the standard'}
      ],
      limitations:['This is House-engrossed text, not enacted law.','The bill would require consideration and a determination by state authorities and nonregulated utilities; it would not itself set every local rate or guarantee adoption of the proposed standard.']
    },
    {
      id:'house-clerk-roll-312-20260916',url:'https://clerk.house.gov/Votes/2026312',publisher:'Office of the Clerk, U.S. House of Representatives',authority:'Official House roll-call record',capture:captures.vote,
      passages:[{locator:'Roll Call 312',excerpt:'Sep 16, 2026, 06:53 PM | 119th Congress, 2nd Session'},{locator:'Roll Call 312',excerpt:'Vote Question: On Motion to Suspend the Rules and Pass, as Amended'},{locator:'Roll Call 312',excerpt:'yea, 417'},{locator:'Roll Call 312',excerpt:'nay, 3'}],
      limitations:['House passage is one chamber action and is not enactment.']
    },
    {
      id:'husted-senate-objection-20260917',url:'https://www.husted.senate.gov/media/press-releases/husted-bill-to-protect-americans-from-footing-the-bill-for-new-data-centers-blocked-from-passage/',publisher:'Office of Senator Jon Husted',authority:'Primary participant account from the senator who sought unanimous consent',capture:captures.husted,
      passages:[{locator:'release body',excerpt:'Sen. Jon Husted (R-Ohio) today brought his Ratepayer Protection Act to the Senate floor, seeking its passage by unanimous consent—a process that expedites consideration of legislation in the United States Senate.'},{locator:'release body',excerpt:'A Senate Democrat objected, blocking the bill from Senate passage.'}],
      limitations:['Sponsor advocacy; use for the procedural attempt, not as independent proof of savings or household outcomes.']
    },
    {
      id:'heinrich-senate-objection-20260917',url:'https://www.heinrich.senate.gov/newsroom/press-releases/heinrich-offers-his-grid-savings-act-to-force-ai-data-centers-to-pay-for-grid-upgrades-highlights-how-husted-backed-bill-falls-short',publisher:'Office of Senator Martin Heinrich',authority:'Primary participant account from the senator who objected',capture:captures.participantOriginals,
      passages:[{locator:'L61',excerpt:'U.S. Senator Martin Heinrich (D-N.M.), Ranking Member of the U.S. Senate Energy and Natural Resources Committee, took to the Senate floor to object to Senate passage of the Ratepayer Protection Act'},{locator:'L64',excerpt:'it’s not enough for us to just tell states to consider making data centers pay for grid upgrades.'}],
      limitations:['Opponent advocacy; use for the objection and criticism of the consideration model, not as independent proof of projected rate effects.']
    },
    {
      id:'senate-floor-schedule-20260921',url:'https://www.senate.gov/legislative/floor_activity_pail.htm',publisher:'United States Senate',authority:'Official Senate floor schedule checked September 21 through the normal web source',capture:captures.senateSchedule,
      passages:[{locator:'current floor proceedings',excerpt:'Previous Meeting Friday, Sep 18, 2026 The Senate convened at 9:00 a.m. for a pro forma session.'},{locator:'current floor proceedings',excerpt:'Tuesday, Sep 22, 2026 Convene at 3:00 p.m.'}],
      limitations:['Schedule evidence narrows the possibility of later floor action through September 21; it is not a substitute for a complete bill-action docket.']
    }
  ]
};
write('source-evidence.json',sourceEvidence);
const source=bind(d+'source-evidence.json');
const template=JSON.parse(fs.readFileSync('operations/product-stewards/newsstand/candidates/california-ai-oversight-order-20260920/producer-contract.json','utf8'));
template.candidateId='house-ratepayer-protection-20260920';
template.producer='/root/california_order_producer';
template.createdAt=new Date().toISOString();
template.status='READY_TO_DRAFT';
template.readerContract={humanQuestion:'Did Congress make AI data centres pay for grid upgrades, and will that lower my electricity bill?',promisedPayoff:'Separate the House vote from enacted law, show how the proposal would allocate upgrade costs, and explain why no household bill result is guaranteed.',priorKnowledge:'No knowledge of electricity regulation, PURPA, large-load rates or the federal legislative process assumed.',centralMentalModel:'The bill would require state regulators and nonregulated utilities to consider a cost-allocation standard; consideration is not automatic nationwide adoption, and House passage is not law.',dailyLifeConnection:'A household ratepayer seeing claims that data centres will either raise or stop raising her electricity bill.',surfaceJob:'Daily legal-policy brief on the September 16 House passage and September 17 Senate objection, current through September 21.',desiredFeeling:'I know what Congress did, what the proposal would ask utility decision-makers to consider, and why my bill has not changed because of this vote.'};
template.canonicalTruth=[{claimId:'hr9340-status-and-mechanism',owner:'Official House and GovInfo records control the vote and House-engrossed mechanism; participant Senate accounts establish the September 17 objection within stated limits.',source,freshnessTrigger:'Recheck before publication and after any Senate committee or floor action, amendment, presidential action, state commission proceeding, or utility rate decision.'}];
const guard='Lead with status: passed House, not law. Explain mandatory consideration versus optional adoption. Keep the 100-megawatt scope attached to qualifying non-residential computing facilities. Never promise a household bill change or treat sponsor/opponent forecasts as verified outcomes.';
const prevention='House vote → proposed federal standard → state/nonregulated-utility consideration and determination → possible local adoption and rate design → only then could cost allocation affect a specific utility case. No step guarantees a household saving.';
for(const entry of Object.values(template.knownFailurePreflight.dispositions)){entry.producerGuard=guard;entry.preventionEvidence=prevention;}
template.knownFailurePreflight.knownDefectsRemaining=[];
template.knownFailurePreflight.candidateRepairPreflight={legalStatus:'House passage is not enactment; September 17 unanimous-consent attempt was blocked.',mechanism:'If enacted, state regulators and nonregulated utilities must consider and determine whether to adopt the standard; the bill does not itself set each rate.',scope:'Large-load customer means covered non-residential computing/data facilities at 100 MW or more at one site or campus.',outcome:'No guaranteed bill reduction, avoided increase, or nationwide payment rule.',advocacy:'Husted and Heinrich positions are attributed; forecasts omitted.'};
template.draftArchitecture={openingJob:'Answer immediately that the House vote did not change the reader’s electricity bill or make the proposal law.',causalSequence:['The House passed H.R. 9340 by 417–3 on September 16.','The House-engrossed bill proposes a standard for covered computing sites with at least 100 megawatts of peak demand.','If enacted, state regulators and nonregulated utilities would have to begin considering that standard within one year and make a determination within two.','A state or utility could adopt, reject or otherwise determine the standard through its own process; the federal bill would not itself set every local rate.','A September 17 Senate unanimous-consent attempt drew an objection, and no later passage or enactment was found through September 21.'],workedCase:'A new 100-megawatt data-centre campus needs a substation or transmission upgrade. Under the proposed standard, its rate would be designed to recover the upgrade’s full incremental cost, with financial assurance before construction, if the relevant decision-maker adopts the standard.',transferCase:'For another “Congress made companies pay” headline, separate chamber passage, enactment, required regulatory consideration, local adoption and a customer’s actual bill.',usefulAction:'For a local data-centre rate claim, identify the utility or commission, the specific upgrade, the cost-allocation proposal and whether there is an enacted rule or approved rate case.',formatSpecificStructure:'The Story; The LAiDIES Read; What This Means for You; The Cocktail Party Explanation; Class Notes; Sources.',antiTemplateDecision:'No generic data-centre burden claim, no guaranteed saving, no invented nationwide mandate, no forced workplace advice and no decorative nostalgia.',analogyPlan:[],humourPlan:{noneReason:'A joke would compete with the necessary legal and rate-setting distinctions.'},readerQuestions:[{id:'law',question:'Is H.R. 9340 law now?'},{id:'mechanism',question:'Would it make large data centres pay directly?'},{id:'bill',question:'Did my electricity bill change or become protected?'},{id:'status',question:'What happened in the Senate after the House vote?'}],requiredTerms:[{term:'large-load customer',meaning:'a covered non-residential computing or data facility with peak demand of at least 100 megawatts at one site or campus'},{term:'incremental cost',meaning:'the additional grid-upgrade cost needed to serve that particular large customer'}],presentationPlan:'Text production only in this lane. A story-specific ratepayer and large-load illustration remains an unmet later visual-admission step; do not use generic data-centre imagery.',plainAnswer:'No. The House passed a proposal that would require consideration of a large-customer cost standard if enacted; it is not law and does not guarantee any household bill change.'};
template.communicationDesign.surfaceAdaptation='Answer the bill-status question first, then make the sequence from federal proposal to local rate decision visible with the 100-megawatt worked case.';
for(const [name,dimension] of Object.entries(template.communicationDesign.dimensions)){dimension.reason=name==='humourSurprise'?'Humour would blur the status and cost-allocation distinctions.':'Show the reader exactly where House passage stops and utility rate-setting begins.';dimension.plannedEvidence=name==='humourSurprise'?'Direct, restrained legal-policy explanation.':'House vote → enactment still required → consideration → determination/adoption → utility-specific rate effect.';}
template.communicationDesign.explanationArc={mode:'PROPORTIONAL',retainedMoves:['answer-first','visible decision chain','worked cost-allocation case','limits beside claims','better local-rate question'],adaptation:'A short Daily brief starts with status, walks the proposed allocation mechanism, then lands on the exact local questions a ratepayer can ask.'};
template.communicationDesign.analogyChecks=[];
template.communicationDesign.discoveryChecks=[{question:'Does a federal standard mean every state must charge the proposed rate?',answer:'No. The House text would require consideration and a determination; it does not itself impose one nationwide retail rate.'}];
template.representativeProofPlan={highestRisk:'Turning a 417–3 House vote and sponsor framing into enacted nationwide protection or a promised household saving.',plannedProof:'Place official House status beside the bill’s consideration-and-determination language and the blocked Senate attempt; trace one hypothetical qualifying campus through the regulatory steps.',acceptanceOutcome:'A reader can explain that the bill is not law, distinguish consideration from adoption, and identify the local decision needed before any bill effect.'};
delete template.visualAdmission;
write('producer-contract.json',template);
const result=inspectContentProducerContract(template,{root:process.cwd()});
write('producer-contract-integrity.json',{checkedAt:new Date().toISOString(),contract:bind(d+'producer-contract.json'),sourceEvidence:source,...result});
if(result.errors.length)throw new Error(result.errors.join('\n'));
console.log(JSON.stringify({status:'CONTRACT_READY_TO_DRAFT',contract:bind(d+'producer-contract.json'),sourceEvidence:source,errors:result.errors},null,2));
