import fs from 'node:fs';
import crypto from 'node:crypto';
import {inspectContentProducerContract} from '../../../../../scripts/check-content-producer-contract.mjs';

const d='operations/product-stewards/newsstand/candidates/california-data-centre-laws-20260921/';
const templatePath='operations/product-stewards/newsstand/candidates/california-ai-oversight-order-20260920/producer-contract.json';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const bind=n=>({path:d+n,sha256:sha(fs.readFileSync(d+n))});
const write=(n,v)=>fs.writeFileSync(d+n,JSON.stringify(v,null,2)+'\n');

const contract=JSON.parse(fs.readFileSync(templatePath,'utf8'));
contract.candidateId='california-data-centre-laws-20260921';
contract.producer='/root/california_order_producer';
contract.createdAt=new Date().toISOString();
contract.status='READY_TO_DRAFT';
contract.readerContract={
  humanQuestion:'California signed seven data-centre laws. What do SB 1168 and AB 1577 actually change for residents now?',
  promisedPayoff:'Separate enacted reporting and commission-assessment duties from an adopted utility rate, an immediate bill change or a promise that all seven laws have been explained.',
  priorKnowledge:'No knowledge of utility regulation, rate design, energy reporting or California permitting assumed.',
  centralMentalModel:'A law can start a commission process or create reporting duties without already deciding the rate or producing a household saving.',
  dailyLifeConnection:'A California resident reading that data centres will now pay their way and wondering whether her electricity bill or a proposed local project changes today.',
  surfaceJob:'A narrow Daily legal-policy brief on SB 1168 rate-structure assessment and AB 1577 reporting, not a comprehensive account of the seven-law package.',
  desiredFeeling:'I know what became law, what information may become available, and why no household saving is guaranteed yet.'
};
contract.canonicalTruth=[
  {claimId:'sb1168-rate-structure-assessment',owner:'California Legislative Information chaptered SB 1168 controls the commission duty and legal scope.',source:bind('source-evidence.json'),freshnessTrigger:'Recheck before publication and after a CPUC proceeding, proposed decision, final rate or statutory amendment.'},
  {claimId:'ab1577-reporting-scope',owner:'California Legislative Information chaptered AB 1577 controls reporting, timing, exclusions and disclosure limits.',source:bind('source-evidence.json'),freshnessTrigger:'Recheck before publication and after Energy Commission implementation guidance, reporting rules or statutory amendment.'}
];
const guard='State that both bills are enacted. Keep SB 1168’s operative phrase “assess opportunities” distinct from an adopted rate or saving. Keep AB 1577’s 10-megawatt threshold, permit-stage estimates, post-energization reporting, 2029 assessment, aggregation and exclusions attached to the correct duty. Say explicitly that this story covers two of seven laws.';
const prevention='September 21 enactment → CPUC assessment in a proceeding or Energy Commission/local reporting implementation → later decisions and data → only then could a specific tariff, project decision or resident consequence be observed.';
for(const entry of Object.values(contract.knownFailurePreflight.dispositions)){entry.producerGuard=guard;entry.preventionEvidence=prevention;}
contract.knownFailurePreflight.knownDefectsRemaining=[];
contract.knownFailurePreflight.candidateRepairPreflight={
  legalStatus:'SB 1168 and AB 1577 were approved and filed September 21; the article does not call the remaining five laws researched.',
  rateBoundary:'SB 1168 orders an assessment of opportunities inside a commission proceeding; no tariff or bill result is supplied.',
  reportingBoundary:'AB 1577 separates local permit-stage estimates, post-energization state reports, anonymized aggregate publication and the 2029 load-trend assessment.',
  exclusions:'Below-10-megawatt facilities and named public, safety, national-security and utility facilities remain outside the cited reporting provisions.',
  promotionBoundary:'The Governor’s claim that the package prevents cost shifts stays administration framing rather than an established household outcome.'
};
contract.draftArchitecture={
  openingJob:'Say immediately that the two laws start regulatory and reporting work but do not lower a household bill today.',
  causalSequence:[
    'SB 1168 became law and requires the Public Utilities Commission to assess rate-structure opportunities in a proceeding.',
    'The assessment concerns data-centre shares of grid and procurement costs and pressure on residential customers; it is not an adopted tariff.',
    'AB 1577 creates local permit-stage estimates and state reporting for covered facilities of at least 10 megawatts.',
    'State publication is anonymized and aggregated; named facilities are excluded and the first specified statewide load-trend assessment is the 2029 report.',
    'Actual resident effects depend on later commission, utility and project decisions.'
  ],
  workedCase:'A proposed covered data centre seeking a discretionary local approval supplies energy, onsite-generation and sound estimates. That gives the local agency planning information; it does not reveal a household saving or publish a customer-specific energy profile.',
  transferCase:'When a package is described as protecting ratepayers, separate the enacted process, the later decision-maker, the covered facilities and the actual tariff or bill outcome.',
  usefulAction:'For a local project or electricity-bill claim, ask which CPUC proceeding or local permit record contains the decision, what facility is covered and whether the evidence is an assessment, a proposed rate or a final approved rate.',
  formatSpecificStructure:'The Story; The LAiDIES Read; What This Means for You; The Cocktail Party Explanation; Class Notes; Sources.',
  antiTemplateDecision:'No seven-law summary from two bill texts, no guaranteed saving, no generic climate advice, no forced workplace action and no claim that facility-level reports are all public.',
  analogyPlan:[],
  humourPlan:{noneReason:'The distinction between enacted process and observed bill effect needs direct language.'},
  readerQuestions:[
    {id:'bill',question:'Did these laws lower my electricity bill today?'},
    {id:'rate',question:'What does SB 1168 require the commission to do?'},
    {id:'reporting',question:'What information does AB 1577 require and when?'},
    {id:'scope',question:'Which facilities and disclosures are outside the reporting rule?'}
  ],
  requiredTerms:[
    {term:'rate structure',meaning:'the rules a utility and regulator use to divide charges among customer groups'},
    {term:'anonymized and aggregated',meaning:'combined so the public release does not identify one customer or facility’s protected data'}
  ],
  presentationPlan:'Use the independently admitted story-specific planning-desk illustration at /assets/newsstand/california-data-centre-laws-20260921.png. The site plan, miniature data-centre campus, substation and transmission context explain planning scrutiny and utility demand without implying an approved rate, guaranteed savings, an identified facility or facility-level public disclosure.',
  plainAnswer:'No immediate bill reduction is established. SB 1168 starts a commission assessment of possible rate structures, while AB 1577 creates reporting and planning duties for covered data centres.'
};
contract.communicationDesign.surfaceAdaptation='Answer the bill question first, then show the path from enacted process to later rate or project decision while keeping the two laws separate.';
for(const [name,dimension] of Object.entries(contract.communicationDesign.dimensions)){
  dimension.reason=name==='humourSurprise'?'Humour would blur the legal and timing distinctions.':'Make a process-heavy law visible through one covered project and the sequence of decision-makers.';
  dimension.plannedEvidence=name==='humourSurprise'?'Direct, restrained explanation.':'Enactment → assessment/reporting → later decision or aggregate report → observable resident effect.';
}
contract.communicationDesign.explanationArc={mode:'PROPORTIONAL',retainedMoves:['answer-first','two-law separation','covered-project example','limits beside claims','better rate-case question'],adaptation:'The Daily brief identifies what changed, follows the mechanism, and ends with the exact record that would prove a real resident effect.'};
contract.communicationDesign.analogyChecks=[];
contract.communicationDesign.discoveryChecks=[{question:'Does “protect ratepayers” mean a bill credit appeared?',answer:'No. SB 1168 requires assessment of possible rate structures; a proceeding and later rate decision still determine any bill effect.'}];
contract.representativeProofPlan={
  highestRisk:'Turning administration claims or an assessment duty into a guaranteed household saving, or implying two bill texts explain all seven laws.',
  plannedProof:'Place “assess opportunities” beside the no-current-tariff boundary and place every AB 1577 date, threshold and exclusion beside its reporting duty.',
  acceptanceOutcome:'A reader can explain the difference between a law starting a process and a regulator approving a rate, and can name what AB 1577 makes public versus protected.'
};
contract.visualAdmission=bind('art/independent-review-v3.json');
delete contract.sourceBudget;
write('producer-contract.json',contract);
const result=inspectContentProducerContract(contract,{root:process.cwd()});
write('producer-contract-integrity.json',{checkedAt:new Date().toISOString(),contract:bind('producer-contract.json'),sourceEvidence:bind('source-evidence.json'),...result});
if(result.errors.length)throw Error(result.errors.join('\n'));
console.log(JSON.stringify({status:'CONTRACT_READY_TO_DRAFT',contract:bind('producer-contract.json'),sourceEvidence:bind('source-evidence.json'),errors:result.errors},null,2));
