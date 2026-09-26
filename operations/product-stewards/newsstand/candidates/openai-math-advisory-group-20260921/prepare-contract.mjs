import fs from 'node:fs';
import crypto from 'node:crypto';
import { inspectContentProducerContract } from '../../../../../scripts/check-content-producer-contract.mjs';

const d = 'operations/product-stewards/newsstand/candidates/openai-math-advisory-group-20260921/';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const bind = path => ({ path, sha256: sha(fs.readFileSync(path)) });
const write = (name, value) => fs.writeFileSync(d + name, JSON.stringify(value, null, 2) + '\n');
fs.mkdirSync(d, { recursive: true });

const captures = {
  openai: bind('operations/product-stewards/newsstand/evidence/recovery-1300-20260921/openai-current.json'),
  advisory: bind('operations/product-stewards/newsstand/evidence/recovery-1300-20260921/followed-originals.json'),
  priorArticle: bind('operations/product-stewards/newsstand/candidates/navier-stokes-claim-20260911/article.md'),
  priorStory: bind('operations/product-stewards/newsstand/candidates/navier-stokes-claim-20260911/story.json')
};

const sourceEvidence = {
  schemaVersion: 'newsstand-source-evidence-v1',
  candidateId: 'openai-math-advisory-group-20260921',
  checkedAt: '2026-09-21T13:44:26-07:00',
  checkedAtBasis: 'Latest filesystem receipt time of the two normal-web original-source captures. Both captures say Crawled: today; the web tool supplied no response-completion timestamp.',
  currentStatus: 'INDEPENDENT_ADVISORY_GROUP_ESTABLISHED_NO_DECISION_POWER',
  freshnessFinding: 'OpenAI and the group published matching current descriptions on September 21. The group advises on presentation, review, release and the field impact of AI mathematics; OpenAI retains company decisions, and the group does not advise OpenAI on the pace of internal mathematics progress.',
  distinctCoverageFinding: 'The September 11 Navier–Stokes story explains one claimed result and the stages from release to independent checking and acceptance. This candidate covers a new governance response for handling many reported results and does not repeat the proof explanation.',
  priorCoverage: [
    { id: 'navier-stokes-claim-20260911', article: captures.priorArticle, story: captures.priorStory }
  ],
  records: [
    {
      id: 'openai-math-advisory-announcement-20260921',
      url: 'https://openai.com/index/advisory-group-on-mathematics-and-ai/',
      publisher: 'OpenAI',
      authority: 'Company announcement describing why it sought advice, the group’s remit and OpenAI’s stated internal-model claims',
      capture: captures.openai,
      passages: [
        { locator: 'L21', excerpt: 'On August 28, we began training a new internal model. In addition to resolving the Navier–Stokes Millennium Prize problem, this model has now resolved more than 100 long-standing open problems across most areas of mathematics.' },
        { locator: 'L21', excerpt: 'The pace of its progress in mathematics has surprised the mathematicians within OpenAI. This has led to internal discussions on the best way to inform the community of the rapid progress to prepare and adapt the field.' },
        { locator: 'L24', excerpt: 'To that end, we’re working with mathematicians who have established an independent mathematics advisory group. This group will serve as a bridge to the mathematical community and broader public, giving mathematicians a voice in how we move forward.' },
        { locator: 'L25', excerpt: 'The group will advise on the review and communication of emerging results: they will help OpenAI assess their significance, advise on how to coordinate their dissemination, and advise on academic and professional standards of mathematical research. It will also advise on how our tools can support mathematical research and learning.' },
        { locator: 'L26', excerpt: 'The group will operate independently from OpenAI. The group will have the freedom to offer advice we have not requested, comment on OpenAI’s impact on mathematics, and make its advice public.' },
        { locator: 'L26', excerpt: 'Its members will not be paid by OpenAI, and the group can change its membership as it sees fit. Importantly, the group will not be responsible for advising us on how to pace our internal progress on mathematics.' }
      ],
      limitations: [
        'OpenAI’s statement is authoritative for its announcement and intentions, not independent validation that its model resolved more than 100 problems.',
        'Do not infer that advice is binding or that the group controls model training, release decisions or internal research pace.',
        'Do not infer that the group has reviewed any named result unless a recommendation says so.'
      ]
    },
    {
      id: 'agmai-purpose-and-current-task-20260921',
      url: 'https://agmai.org/',
      publisher: 'Advisory Group on Mathematics and Artificial Intelligence',
      authority: 'The independent group’s own statement of purpose, limits, membership and current task',
      capture: captures.advisory,
      passages: [
        { locator: 'L9', excerpt: 'The purpose of this group is to advise AI companies on their interactions with mathematical research and with the mathematical community, including the responsible presentation and release of mathematical results.' },
        { locator: 'L11', excerpt: 'This group operates independently of any AI company and members do not accept payment for this work. We will publish our recommendations to AI companies on this website.' },
        { locator: 'L11', excerpt: 'Although we will give advice, we do not have decision making power at any AI company, and the responsibility for the decisions made by any company will rest with that company.' },
        { locator: 'L23', excerpt: 'This group came together after OpenAI approached some of its members about establishing an external advisory board. In agreement with OpenAI, they decided to create an independent group and invite others to join.' },
        { locator: 'L28', excerpt: 'We are currently facing the very specific challenge of advising OpenAI on how to coordinate the release of a large number of significant results in mathematics that they report have been produced by their internal model.' },
        { locator: 'L30', excerpt: 'We welcome input from the mathematical community on this question.' }
      ],
      limitations: [
        'The group attributes the reported results to OpenAI; it does not validate them in this statement.',
        'Independent operation and unpaid membership do not give the group formal company authority.',
        'The public-input invitation is directed to the mathematical community; do not turn it into a general consumer action.'
      ]
    }
  ],
  nextAction: 'Proceed with a narrow governance story. Keep all capability claims attributed and require fresh source and independent editorial review before publication.'
};
write('source-evidence.json', sourceEvidence);

const registryPath = 'operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const source = bind(d + 'source-evidence.json');
const guard = 'Answer that the group gives public advice but cannot decide for OpenAI. Keep OpenAI’s model-result count attributed, distinguish release coordination from validation, and state that the group does not control internal research pace.';
const prevention = 'Company claims many results → release and review create a coordination problem → independent mathematicians can assess significance and advise publicly → OpenAI still decides what the company does → independent validation of each result remains separate.';
const dispositions = {};
for (const example of registry.negativeExemplars) {
  for (const family of example.failureFamilies) dispositions[family] = { status: 'CLEAR', producerGuard: guard, preventionEvidence: prevention };
}
const dimensions = {};
for (const name of ['humanQuestion', 'usefulCuriosity', 'invisibleProcessConcrete', 'familiarTechnicalMovement', 'limitationsConsequences', 'betterNextQuestion']) {
  dimensions[name] = { disposition: 'APPLY', reason: 'Make the advisory process and its authority boundary visible to a non-mathematician.', plannedEvidence: 'Show the handoff from a company claim to release advice, public recommendations and company-owned decisions.' };
}
dimensions.humourSurprise = { disposition: 'NOT_APPLICABLE', reason: 'A joke would blur the difference between advice, validation and authority.', plannedEvidence: 'Direct, warm explanation without comic framing.' };

const contract = {
  schemaVersion: 'laidies-content-producer-contract.v1',
  candidateId: 'openai-math-advisory-group-20260921',
  surface: 'NEWSSTAND_DAILY',
  contentClass: 'NEWS',
  producer: '/root/california_order_producer',
  status: 'READY_TO_DRAFT',
  readerContract: {
    humanQuestion: 'Did independent mathematicians just get control over OpenAI’s mathematics claims?',
    promisedPayoff: 'Know what the new group can advise on, what it cannot decide, and why a public recommendation is different from validating a proof.',
    priorKnowledge: 'No knowledge of mathematical publishing, peer review, model training or advisory boards assumed.',
    centralMentalModel: 'An independent advisory group can inspect the release problem and publish advice; OpenAI retains company decisions, and each claimed result still needs its own mathematical scrutiny.',
    dailyLifeConnection: 'The reader sees a company announce an independent advisory group and wants to know whether that is oversight with power or advice the company may choose to follow.',
    surfaceJob: 'Daily company-governance brief on the September 21 mathematics advisory-group announcement and the group’s own authority statement.',
    desiredFeeling: 'I can explain the safeguard without mistaking independence for control or company claims for validated results.'
  },
  canonicalTruth: [
    { claimId: 'math-advisory-remit-and-limits', owner: 'OpenAI controls its company statement; AGMAI controls its own purpose, independence and authority limits.', source, freshnessTrigger: 'Recheck the group website and OpenAI announcement before publication and whenever the group publishes a recommendation, changes membership or describes a completed review.' }
  ],
  positiveExemplars: [
    { id: 'CQX-GOOD-NEWS-002', strengthsToUse: ['State the dated change and scope', 'Place the limitation beside each claim', 'Give one precise way to evaluate a governance announcement'], patternsNotToCopy: ['Topic, metaphor, sentence structure or legal framing'] }
  ],
  knownFailurePreflight: {
    registryVersion: registry.schemaVersion,
    registrySha256: sha(fs.readFileSync(registryPath)),
    negativeExemplarIds: registry.negativeExemplars.map(item => item.id),
    knownDefectsRemaining: [],
    dispositions,
    candidateRepairPreflight: {
      authority: 'Advice is not binding and AGMAI has no decision-making power at OpenAI.',
      pace: 'The group does not advise OpenAI on the pace of internal mathematics progress.',
      validation: 'More than 100 resolved problems is OpenAI’s claim, not an independently validated count.',
      distinctness: 'Governance response and release coordination, not another explanation of the Navier–Stokes claim.',
      action: 'Reader evaluates whether recommendations are published and how the company responds; no forced workplace task.'
    }
  },
  draftArchitecture: {
    openingJob: 'Answer immediately that the group can advise publicly but cannot make OpenAI’s decisions.',
    causalSequence: [
      'OpenAI says an internal model is producing mathematical results faster than expected.',
      'A large flow of claimed results creates questions about significance, review, standards and release order.',
      'Independent mathematicians formed a group that can advise, challenge OpenAI and publish recommendations.',
      'OpenAI still owns its decisions, and the group explicitly has no decision power or role setting the pace of internal progress.',
      'The group’s existence does not validate OpenAI’s reported results; mathematical checking remains result by result.'
    ],
    workedCase: 'If OpenAI reports ten results at once, the group could advise which claims need specialist review first and how to present their limits. It cannot force OpenAI to accept that advice or certify the proofs merely by discussing release order.',
    transferCase: 'When another company announces an independent council, check whether it can publish findings, whether the company must respond and who retains the final decision.',
    usefulAction: 'Watch for the group’s promised public recommendations and compare each recommendation with OpenAI’s response; for any mathematical claim, still ask what independent checking has occurred.',
    formatSpecificStructure: 'The Story; The LAiDIES Read; What This Means for You; The Cocktail Party Explanation; Class Notes; Sources.',
    antiTemplateDecision: 'No advisory-board theatre cliché, proof tutorial, invented consumer setting, compulsory work advice or claim that independence equals control.',
    analogyPlan: [],
    humourPlan: { noneReason: 'The authority boundary is the memorable point; humour would not clarify it.' },
    readerQuestions: [
      { id: 'power', question: 'Can the group make OpenAI follow its advice?' },
      { id: 'job', question: 'What will the group actually advise on?' },
      { id: 'validation', question: 'Does the group’s existence prove OpenAI solved more than 100 problems?' },
      { id: 'pace', question: 'Can it slow OpenAI’s internal mathematics work?' }
    ],
    requiredTerms: [
      { term: 'advisory group', meaning: 'a group that gives recommendations but does not make the company’s decisions' }
    ],
    presentationPlan: 'Text production only. A story-specific visual remains a later admission requirement; no generic mathematician portrait, generic AI imagery or image borrowed from another story.',
    plainAnswer: 'No. The independent group can advise publicly on review and release, but OpenAI keeps decision power and the group does not control the pace of internal mathematics work.'
  },
  communicationDesign: {
    benchmarkId: 'HANNAH_FRY_COMMUNICATION_LENS_V2',
    benchmark: bind('operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md'),
    mode: 'PROPORTIONAL',
    surfaceAdaptation: 'Start with the reader’s authority question, make the release-advice process visible, then separate public advice from mathematical validation.',
    imitationBoundary: 'ADAPT_PRINCIPLES_NEVER_IMITATE_VOICE_OR_PERSONA',
    dimensions,
    explanationArc: { mode: 'PROPORTIONAL', retainedMoves: ['answer-first', 'visible process', 'worked release case', 'limits beside claims', 'better governance question'], adaptation: 'A short Daily brief follows the claimed-results pressure into the advisory mechanism, then lands on the authority and validation limits.' },
    analogyChecks: [],
    discoveryChecks: [
      { question: 'Does independence give the group veto power?', answer: 'No. Its own statement says it has no decision-making power at any AI company.' },
      { question: 'Does coordinating release validate the results?', answer: 'No. Release advice and proof checking are separate jobs.' }
    ]
  },
  representativeProofPlan: {
    highestRisk: 'Presenting an advisory relationship as binding oversight or treating OpenAI’s reported result count as independently verified.',
    plannedProof: 'Map every authority, remit, pace and validation sentence to the two original statements; compare the narrow governance focus with the existing Navier–Stokes article.',
    acceptanceOutcome: 'A reader can explain what the group does, who decides, and why each result still needs independent scrutiny.'
  },
  ratchet: { targets: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }, rule: 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW' },
  createdAt: new Date().toISOString()
};
write('producer-contract.json', contract);
const result = inspectContentProducerContract(contract, { root: process.cwd() });
write('producer-contract-integrity.json', { checkedAt: new Date().toISOString(), contract: bind(d + 'producer-contract.json'), sourceEvidence: source, ...result });
if (result.errors.length) throw new Error(result.errors.join('\n'));
console.log(JSON.stringify({ status: 'CONTRACT_READY_TO_DRAFT', contract: bind(d + 'producer-contract.json'), sourceEvidence: source }, null, 2));
