import fs from 'node:fs';
import crypto from 'node:crypto';

const dir = 'operations/product-stewards/newsstand/candidates/california-ai-oversight-order-20260920/';
const evidenceDir = 'operations/product-stewards/newsstand/evidence/morning-20260922/';
const predecessor = 'operations/product-stewards/newsstand/candidates/ai-research-automation-20260919/producer-contract.json';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const write = (name, value) => fs.writeFileSync(dir + name, JSON.stringify(value, null, 2) + '\n');
const bind = path => ({ path, sha256: sha(fs.readFileSync(path)) });
fs.mkdirSync(dir, { recursive: true });

const sourceEvidence = {
  schemaVersion: 'laidies-newsstand-source-evidence.v1',
  candidateId: 'california-ai-oversight-order-20260920',
  capturedOn: '2026-09-22',
  freshness: 'The signed order and the complete Governor and EFF pages were re-read from exact raw web evidence on September 22. The inspected current discovery surfaced later commentary but no later California order or replacement EFF response.',
  freshnessEvidence: bind(evidenceDir + '1000-california-discovery.json'),
  records: [
    {
      sourceId: 'california-executive-order-n-9-26',
      title: 'Executive Order N-9-26',
      url: 'https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf',
      publisher: 'State of California',
      authority: 'Signed primary legal text',
      raw: bind(evidenceDir + 'california-source-reopen.json'),
      exactPassages: [
        { locator: 'L81-L85', excerpt: 'No later than May 1, 2027, the Government Operations Agency shall complete the requirements of Section 8898.1 of the Government Code and develop application requirements, procedures, and criteria for independent verification organizations and publicly post them, as required by law.' },
        { locator: 'L86-L89', excerpt: 'No later than December 1, 2027, the Government Operations Agency shall complete the requirements of subdivision (a) of Section 11549.82 of the Government Code and begin taking the actions required by subdivision (b) of that Section.' },
        { locator: 'L91-L95', excerpt: 'The Government Operations Agency, in consultation with the Governor’s Office of Emergency Services, shall, no later than November 16, 2026, submit to my office recommendations, developed in consultation with national experts, addressing the technical feasibility and potential efficacy of amendments to existing state laws regarding AI safety and security, including at least the following:' },
        { locator: 'L96-L98', excerpt: 'Requiring that all large frontier developers embed designated independent verification organizations onsite in their labs to conduct periodic audits and evaluations.' },
        { locator: 'L99-L102', excerpt: 'Requiring that the safety frameworks, transparency reports, and risk assessments that frontier AI companies are required to file be independently verified pursuant to standards determined to be adequate by an independent verification organization.' },
        { locator: 'L103-L105', excerpt: 'Requiring the creation of a “kill switch” for frontier models, with the efficacy of the switch verified on an ongoing basis by an independent verification organization.' },
        { locator: 'L106-L108', excerpt: 'Updating the definition of critical safety incidents that AI companies are required to report to include a range of loss-of-control incidents, covering recently reported incidents from large frontier developers.' }
      ],
      limitations: ['The order directs recommendations about possible statutory amendments; it does not itself enact the listed requirements.', 'The order does not define a technical design for a universal shutdown mechanism.']
    },
    {
      sourceId: 'governor-newsom-order-release-20260918',
      title: 'Governor Newsom issues executive order to accelerate independent oversight and advance the creation of an AI kill switch',
      url: 'https://www.gov.ca.gov/2026/09/18/governor-newsom-issues-executive-order-to-accelerate-independent-oversight-and-advance-the-creation-of-an-ai-kill-switch/',
      publisher: 'Governor of California',
      authority: 'Official announcement explaining the administration’s framing',
      raw: bind(evidenceDir + '1000-california-bodies.json'),
      exactPassages: [
        { locator: 'L51', excerpt: 'The order accelerates California’s new law establishing first-in-the-nation independent oversight of AI companies and safety checks and advances the creation of an “AI kill switch.”' },
        { locator: 'L53', excerpt: 'The executive order convenes a group of world-leading experts to provide, within two months, a guide for California to reinforce and strengthen its AI safety and security laws. Proposals under consideration include requiring independent third parties to write safety plans for frontier AI companies, as well as requiring companies to develop an emergency shutoff, or “kill switch,” for frontier models.' }
      ],
      limitations: ['This is the Governor’s promotional framing; the signed order controls the legal description.']
    },
    {
      sourceId: 'eff-response-20260918',
      title: 'EFF Statement on California Governor’s Executive Order on AI',
      url: 'https://www.eff.org/deeplinks/2026/09/eff-statement-california-governors-executive-order-ai',
      publisher: 'Electronic Frontier Foundation',
      authority: 'Civil-liberties advocacy response',
      raw: bind(evidenceDir + '1000-california-bodies.json'),
      exactPassages: [
        { locator: 'L104', excerpt: 'To that end, EFF supports the focus on expanding the reporting requirements under SB 53 (2025) for loss-of-control incidents, alongside third-party investigations.' },
        { locator: 'L105', excerpt: 'As the Government Operations Agency prepares its recommendations for the governor, we urge leaders to also realize that the effectiveness of kill switches in advanced AI systems remains an area of active research.' },
        { locator: 'L106', excerpt: 'Moreover, we also caution that government-controlled kill switches run the risk of being used as a form of retaliation against protected speech' }
      ],
      limitations: ['EFF is an advocacy organization, not a neutral technical evaluator.', 'Its response supports parts of the order and cautions against other possible implementations; it does not establish technical effectiveness.']
    }
  ]
};
write('source-evidence.json', sourceEvidence);
const evidenceBinding = bind(dir + 'source-evidence.json');

const contract = JSON.parse(fs.readFileSync(predecessor, 'utf8'));
contract.candidateId = 'california-ai-oversight-order-20260920';
contract.producer = '/root/california_order_producer';
contract.createdAt = new Date().toISOString();
contract.status = 'READY_TO_DRAFT';
contract.readerContract = {
  humanQuestion: 'Does California now have an AI kill switch, and what actually changed in the September 18 executive order?',
  promisedPayoff: 'Separate what the order started now from proposals due for recommendation and from two distinct implementation deadlines.',
  priorKnowledge: 'No California AI-law, frontier-model or independent-verifier vocabulary assumed.',
  centralMentalModel: 'An executive order can speed existing implementation and commission recommendations without already creating every proposed safeguard.',
  dailyLifeConnection: 'The reader can distinguish an instruction to produce a plan from a rule or control already in force when reading policy headlines.',
  surfaceJob: 'September 20 Daily candidate translating California Executive Order N-9-26 and the “AI kill switch” headline.',
  desiredFeeling: 'I know what exists, what is only being studied, and which dates matter.'
};
contract.canonicalTruth = [
  { claimId: 'california-order-n-9-26', owner: 'The signed State of California order controls the legal action, dates and recommendation scope.', source: evidenceBinding, freshnessTrigger: 'Recheck on publication day, after November 16 recommendations, or if the state amends the implementation schedule.' },
  { claimId: 'eff-response-20260918', owner: 'EFF owns its advocacy position; NewsStand must describe it as support and caution, not a neutral technical finding.', source: evidenceBinding, freshnessTrigger: 'Recheck if EFF corrects or expands its response.' }
];
const guard = 'Answer “no” immediately; label recommendations as recommendations; keep May 1, November 16 and December 1 attached to their separate jobs; treat EFF as an advocate.';
const prevention = 'Existing-law implementation → November recommendations on possible amendments → later legislative or regulatory action; no universal switch exists from this order alone.';
for (const entry of Object.values(contract.knownFailurePreflight.dispositions)) {
  entry.producerGuard = guard;
  entry.preventionEvidence = prevention;
}
contract.knownFailurePreflight.knownDefectsRemaining = [];
contract.knownFailurePreflight.candidateRepairPreflight = {
  scope: 'The story distinguishes the signed order from the Governor’s headline and from any later law or technical system.',
  dates: 'May 1, 2027 concerns verifier application rules; November 16, 2026 concerns recommendations; December 1, 2027 concerns separate auditor-registry implementation actions.',
  safeguards: 'Onsite verifiers, verified filings, shutoffs and broader incident reporting remain subjects for recommendations on possible amendments.',
  advocacy: 'EFF support for reporting and investigations is separated from its technical and civil-liberties cautions.',
  catastrophe: 'No presumed catastrophe, safety guarantee or claim that the switch would work.'
};
contract.draftArchitecture = {
  openingJob: 'Answer the kill-switch question in the first sentence.',
  causalSequence: [
    'The order accelerates two pieces of existing oversight implementation with separate 2027 deadlines.',
    'It instructs agencies to return by November 16 with recommendations about the feasibility and effectiveness of possible legal amendments.',
    'Those possible amendments include onsite independent verifiers, verified safety filings, frontier-model shutoffs and expanded incident reporting.',
    'Later lawmaking or rulemaking would still be needed before those proposed requirements become universal obligations.'
  ],
  workedCase: 'The headline says “kill switch,” while the operative text asks for recommendations about whether a shutoff requirement could work and how its effectiveness could be checked.',
  transferCase: 'When another executive-order headline promises a new safeguard, check whether the operative verb is require, implement, study or recommend and note the deadline.',
  usefulAction: 'Read the operative verb and date: “recommend by November 16” is different from “companies must install now.”',
  formatSpecificStructure: 'The Story; LAiDIES Read; What This Means for You; Cocktail Party; Class Notes; Sources.',
  antiTemplateDecision: 'No emergency imagery, no forced workplace advice, no claim of a universal switch and no assurance that proposed controls will work.',
  analogyPlan: [],
  humourPlan: { noneReason: 'A dry joke would weaken a legally precise answer to a safety-policy question.' },
  readerQuestions: [
    { id: 'exists', question: 'Did California install or require a universal AI kill switch now?' },
    { id: 'changed', question: 'What did the order do immediately?' },
    { id: 'dates', question: 'What happens on November 16, May 1 and December 1?' },
    { id: 'caution', question: 'What does EFF support and what does it caution?' }
  ],
  requiredTerms: [
    { term: 'independent verification organization', meaning: 'organizations seeking certification to independently examine AI safety and risk' }
  ],
  presentationPlan: 'Use the admitted story-specific planning illustration at assets/newsstand/california-ai-oversight-order-20260920.png: a blue-pencil sketch of a proposed emergency shutoff button on graph paper, beside a pencil and eraser, with a California outline. The unfinished drawing must read as a proposal under study, never as an installed or effective control. Its exact independent visual admission is recorded at art/independent-review.json.',
  plainAnswer: 'No. California accelerated existing oversight work and ordered recommendations on possible shutoff requirements; it did not install a universal AI kill switch.'
};
contract.communicationDesign.surfaceAdaptation = 'Answer no first, then make the order’s three different verbs and deadlines visible before presenting EFF’s bounded response.';
for (const [name, dimension] of Object.entries(contract.communicationDesign.dimensions)) {
  dimension.reason = name === 'humourSurprise' ? 'Humour would blur a precise policy distinction.' : 'Make the difference between a commissioned recommendation and an active legal requirement concrete.';
  dimension.plannedEvidence = name === 'humourSurprise' ? 'Direct, restrained explanation.' : 'Accelerated implementation → November recommendations → possible later legal amendments.';
}
contract.communicationDesign.explanationArc = { mode: 'PROPORTIONAL', retainedMoves: ['answer-first', 'operative-verb mechanism', 'dates beside actions', 'bounded counterpoint'], adaptation: 'The news brief answers the headline immediately, then follows each ordered action and deadline.' };
contract.communicationDesign.analogyChecks = [];
contract.communicationDesign.discoveryChecks = [{ question: 'Does “advance the creation” mean a switch already exists?', answer: 'No. The signed order asks for recommendations on the technical feasibility and potential efficacy of a possible requirement.' }];
contract.representativeProofPlan = {
  highestRisk: 'Repeating the Governor’s “AI kill switch” headline as if the order installed or mandated one.',
  plannedProof: 'Place the signed order’s operative “recommendations” language and November 16 deadline beside the headline framing, then keep the two 2027 implementation dates separate.',
  acceptanceOutcome: 'A reader can explain that the order accelerates current oversight and commissions proposals, while a universal shutoff requirement remains undecided.'
};
delete contract.sourceBudget;
delete contract.visualAdmission;
write('producer-contract.json', contract);
console.log(JSON.stringify({ status: 'CONTRACT_PREPARED_BEFORE_PROSE', contract: bind(dir + 'producer-contract.json'), evidence: evidenceBinding }, null, 2));
