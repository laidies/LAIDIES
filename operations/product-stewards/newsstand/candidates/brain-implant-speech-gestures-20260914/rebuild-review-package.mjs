#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prepareDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "../../../../..");
const relDir = path.relative(root, dir).split(path.sep).join("/");
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
const read = name => fs.readFileSync(path.join(dir, name), "utf8");
const json = name => JSON.parse(read(name));
const stable = value => value === null || typeof value !== "object"
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? `[${value.map(stable).join(",")}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const write = (name, value) => fs.writeFileSync(path.join(dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const preserve = (from, to) => {
  const target = path.join(dir, to);
  if (!fs.existsSync(target)) fs.copyFileSync(path.join(dir, from), target);
};
const bind = name => ({ path: `${relDir}/${name}`, sha256: sha(read(name)) });

preserve("producer-publication-review.json", "rejected-producer-publication-review-gemini-copy.json");
preserve("producer-self-review.json", "producer-self-review-pre-art-hold.json");
preserve("editorial-input.json", "source-collection-pre-art.json");
preserve("writer-input-current.json", "rejected-writer-input-mismatched-discovery-checks.json");

const contract = json("producer-contract.json");
contract.communicationDesign.discoveryChecks = [
  {
    question: "Did the implant restore free-form conversation?",
    answer: "No. The study decoded a restricted trained set of attempted phrases and gestures in a laboratory task."
  },
  {
    question: "Did all three participants control the simultaneous speech-and-gesture avatar?",
    answer: "No. Three participants contributed movement-decoding evidence; the simultaneous avatar demonstration involved two participants."
  },
  {
    question: "Is this an available treatment or proof of better health outcomes?",
    answer: "No. It is a wired proof-of-concept system; larger cohorts, broader repertoires and further testing remain necessary."
  }
];
contract.draftArchitecture.presentationPlan = "Use the admitted brain-interface illustration at art/brain-interface-v1.png, independently passed in art/independent-review-final.json. Keep headline and article text deterministic HTML.";
write("producer-contract.json", contract);

const story = json("story.json");
const reviewText = `${stable(story)}\n`;
write("review-text.json", reviewText);
const rendered = `<article>${story.the_story}${story.laidies_read}${story.what_this_means}</article>\n`;
write("rendered-article.html", rendered);
write("publication-manifest.json", {
  schemaVersion: "laidies-content-artifact-manifest.v1",
  candidateId: story.id,
  surface: "NEWSSTAND_DAILY",
  contentClass: "NEWS",
  reviewText: bind("review-text.json"),
  rendered: bind("rendered-article.html")
});

const claims = [
  {
    claimId: "participants-and-recording-task",
    status: "VERIFIED",
    candidateEvidence: [{ excerpt: "three people with severe paralysis attempted trained words and upper-body gestures", locator: "the_story paragraph 1" }],
    sourceIds: ["nature-neuroscience-primary-20260914", "nih-release-20260914"],
    sourceEvidence: [
      { excerpt: "three chronically implanted participants with severe paralysis", locator: "https://www.nature.com/articles/s41593-026-02446-2" },
      { excerpt: "Scientists at the University of California, San Francisco, used machine learning to decipher the unique brain activity that underpins concurrent speech and physical gesture in three patients.", locator: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language" }
    ],
    scopeAndFreshness: "The study reports three participants for the broader decoding work; the simultaneous avatar result is separately limited to two."
  },
  {
    claimId: "sensor-location",
    status: "VERIFIED",
    candidateEvidence: [{ excerpt: "a thin sensor array placed on the brain’s motor cortex", locator: "the_story paragraph 1" }],
    sourceIds: ["nih-release-20260914"],
    sourceEvidence: [{ excerpt: "a thin strip of sensors called an electrocorticography (ECoG) array onto the motor cortex", locator: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language" }],
    scopeAndFreshness: "This describes the implanted ECoG research hardware used by the UCSF team."
  },
  {
    claimId: "parallel-decoders-and-avatar",
    status: "VERIFIED",
    candidateEvidence: [
      { excerpt: "Two decoders matched those patterns to a limited set of phrases and gestures.", locator: "the_story paragraph 2" },
      { excerpt: "The system showed decoded words as text and moved a personalized digital avatar.", locator: "the_story paragraph 2" },
      { excerpt: "two participants used speech and gesture decoders at the same time", locator: "the_story paragraph 2" }
    ],
    sourceIds: ["nature-neuroscience-primary-20260914", "nih-release-20260914"],
    sourceEvidence: [
      { excerpt: "Using parallel speech and gesture decoders, we then enabled participants to control a personalized virtual avatar by attempting speech and gestures simultaneously or in isolation.", locator: "https://www.nature.com/articles/s41593-026-02446-2" },
      { excerpt: "Their BCI successfully translated the thoughts of two participants into commands that dictated the expressions of a full-body virtual avatar.", locator: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language" }
    ],
    scopeAndFreshness: "The article keeps the two-person simultaneous avatar result distinct from the three-person study scope."
  },
  {
    claimId: "overlap-and-training",
    status: "VERIFIED",
    candidateEvidence: [
      { excerpt: "Signals for speech and gesture overlap.", locator: "laidies_read paragraph 1" },
      { excerpt: "Models trained only on separate attempts did not fully handle attempts to do both together.", locator: "laidies_read paragraph 1" },
      { excerpt: "Training on both separate and combined attempts improved the result.", locator: "laidies_read paragraph 1" }
    ],
    sourceIds: ["nature-neuroscience-primary-20260914", "nih-release-20260914"],
    sourceEvidence: [
      { excerpt: "Different effectors recruit distinct, yet partially overlapping, spatial patterns across the SMC.", locator: "https://www.nature.com/articles/s41593-026-02446-2" },
      { excerpt: "models trained only on isolated behaviors did not automatically generalize to simultaneous speech-and-gesture attempts, incorporating both isolated and simultaneous trials during training improved performance across contexts", locator: "https://www.nature.com/articles/s41593-026-02446-2" },
      { excerpt: "decoders were more successful at deciphering signals from mixed expressions if they had previously been trained on data acquired while participants performed simultaneous rather than isolated speech and gestures", locator: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language" }
    ],
    scopeAndFreshness: "The improvement applies to the study tasks and training contexts, not clinical communication generally."
  },
  {
    claimId: "bci-and-decoder-meaning",
    status: "VERIFIED",
    candidateEvidence: [
      { excerpt: "A brain-computer interface turns recorded brain activity into commands for another device.", locator: "laidies_read paragraph 2" },
      { excerpt: "A decoder is trained to recognize patterns for a limited set of intended words or gestures", locator: "laidies_read paragraph 2" }
    ],
    sourceIds: ["nature-neuroscience-primary-20260914", "nih-release-20260914"],
    sourceEvidence: [
      { excerpt: "Brain–computer interfaces (BCIs) aim to restore these functions by translating neural activity into commands for external devices", locator: "https://www.nature.com/articles/s41593-026-02446-2" },
      { excerpt: "Computer models, called decoders, then translated their brain signals into computer commands", locator: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language" }
    ],
    scopeAndFreshness: "These are plain-language descriptions of the mechanism used in this study."
  },
  {
    claimId: "restricted-not-free-form",
    status: "QUALIFIED",
    candidateEvidence: [
      { excerpt: "limited set of intended words or gestures", locator: "laidies_read paragraph 2" },
      { excerpt: "it does not read free-form thoughts", locator: "laidies_read paragraph 2" }
    ],
    sourceIds: ["nature-neuroscience-primary-20260914", "nih-release-20260914"],
    sourceEvidence: [
      { excerpt: "restricted vocabularies", locator: "https://www.nature.com/articles/s41593-026-02446-2" },
      { excerpt: "attempted to verbalize specific phrases or perform common gestures such as a hand wave or thumbs-up sign", locator: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language" }
    ],
    scopeAndFreshness: "The free-form-thought sentence is an explicit boundary inferred from the trained restricted tasks, not a separate experimental result."
  },
  {
    claimId: "wired-research-system",
    status: "VERIFIED",
    candidateEvidence: [{ excerpt: "a wired research system connected to external processing equipment", locator: "laidies_read paragraph 2" }],
    sourceIds: ["nih-release-20260914"],
    sourceEvidence: [{ excerpt: "a wired system connecting implanted sensors to external processing units", locator: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language" }],
    scopeAndFreshness: "This describes the tested system; the announced future wireless test is not reported as completed."
  },
  {
    claimId: "proof-of-concept-not-treatment",
    status: "QUALIFIED",
    candidateEvidence: [{ excerpt: "This peer-reviewed proof of concept is not an available treatment or proof of better health outcomes.", locator: "what_this_means paragraph 1" }],
    sourceIds: ["nature-neuroscience-primary-20260914", "nih-release-20260914"],
    sourceEvidence: [
      { excerpt: "Together, these results form a key proof of concept toward a unified BCI", locator: "https://www.nature.com/articles/s41593-026-02446-2" },
      { excerpt: "the BCI used in this study entailed a wired system connecting implanted sensors to external processing units", locator: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language" }
    ],
    scopeAndFreshness: "The sources establish a peer-reviewed proof of concept and research apparatus; the treatment and health-outcome limits are cautious conclusions from that scope."
  },
  {
    claimId: "future-testing-needed",
    status: "VERIFIED",
    candidateEvidence: [{ excerpt: "Larger groups, broader repertoires and more testing are still needed.", locator: "what_this_means paragraph 1" }],
    sourceIds: ["nature-neuroscience-primary-20260914"],
    sourceEvidence: [{ excerpt: "the authors call for larger cohorts, larger repertoires and other recording methods", locator: "https://www.nature.com/articles/s41593-026-02446-2" }],
    scopeAndFreshness: "The paper's discussion names cohort, repertoire and generalization work that remains."
  }
];
write("claim-map.json", claims);

const natureCapturePath = path.join(root, "operations/product-stewards/newsstand/editorial-intake/2026-09-14-nature-new-leads-captures/primary-study-normal-web.raw.json");
const nihCapturePath = path.join(root, "operations/product-stewards/newsstand/editorial-intake/2026-09-14-nature-new-leads-captures/primary-and-nih-normal-web-open.raw.json");
const natureRaw = JSON.parse(fs.readFileSync(natureCapturePath, "utf8")).rawToolOutput;
const nihRaw = JSON.parse(fs.readFileSync(nihCapturePath, "utf8")).rawToolOutput;
const writer = prepareDraft(contract, {
  root,
  reportingFrame: json("story-type-coverage.json"),
  sourcePacket: bind("source-evidence.json")
});
const writerInput = { ...writer, producerContract: bind("producer-contract.json") };
write("writer-input-current.json", writerInput);
write("writer-input-prepared.json", writerInput);

const sources = [
  {
    id: "nature-neuroscience-primary-20260914",
    url: "https://www.nature.com/articles/s41593-026-02446-2",
    authority: "Peer-reviewed primary paper captured through the permitted normal-web result; the later direct open hit a non-retryable identity-provider redirect.",
    passages: json("source-evidence.json").sources[0].passages.map(item => item.text),
    limitation: "The preserved raw search capture includes the primary abstract, main text and discussion excerpts plus related search results; claims remain limited to the captured study text.",
    source: {
      url: "https://www.nature.com/articles/s41593-026-02446-2",
      passage: natureRaw,
      passageLocator: "operations/product-stewards/newsstand/editorial-intake/2026-09-14-nature-new-leads-captures/primary-study-normal-web.raw.json",
      additionalPassage: json("source-evidence.json").sources[0].passages.map(item => item.text).join("\n"),
      additionalPassageLocator: "https://www.nature.com/articles/s41593-026-02446-2"
    }
  },
  {
    id: "nih-release-20260914",
    url: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language",
    authority: "Official NIH funder release with a full captured page and direct link to the peer-reviewed paper.",
    passages: json("source-evidence.json").sources[1].passages.map(item => item.text),
    limitation: "The NIH release summarizes the study and quotes its authors; it is not independent clinical-effectiveness evidence.",
    source: {
      url: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language",
      passage: nihRaw,
      passageLocator: "operations/product-stewards/newsstand/editorial-intake/2026-09-14-nature-new-leads-captures/primary-and-nih-normal-web-open.raw.json",
      additionalPassage: json("source-evidence.json").sources[1].passages.map(item => item.text).join("\n"),
      additionalPassageLocator: "https://www.nih.gov/news-events/news-releases/neuroprosthesis-paralysis-enables-simultaneous-speech-body-language"
    }
  }
];
const editorialInput = {
  readerJob: `${contract.readerContract.humanQuestion} ${contract.readerContract.promisedPayoff}`,
  completeArtifact: reviewText,
  paragraphs: storyParagraphs(story),
  communicationAuthority: writerInput.packet.communication,
  claims: claims.map(claim => ({ claimId: claim.claimId, claim: claim.candidateEvidence.map(item => item.excerpt).join(" "), sourceIds: claim.sourceIds })),
  sources,
  sourcePacket: {
    binding: bind("source-evidence.json"),
    rawCaptures: [
      { path: path.relative(root, natureCapturePath).split(path.sep).join("/"), sha256: sha(fs.readFileSync(natureCapturePath)) },
      { path: path.relative(root, nihCapturePath).split(path.sep).join("/"), sha256: sha(fs.readFileSync(nihCapturePath)) }
    ],
    safetyBoundary: json("source-evidence.json").sourceSafetyLimit
  },
  reviewBoundary: {
    status: "PENDING_DISTINCT_INDEPENDENT_REVIEW",
    instruction: "Begin with the complete brain-interface article and inspect the complete supplied raw source captures. The producer receipt is not editorial evidence."
  }
};
write("editorial-input.json", editorialInput);

const principal = "/root/puzzle_visual_reconcile";
const reviewedAt = new Date().toISOString();
const negativeOneAssessments = {
  glossaryAccumulation: ["present", "The opening proceeds as a sequence of standalone term entries rather than one developing reader explanation."],
  templateRepetition: ["present", "The same definition, analogy, 'In real life' and role-summary scaffold repeats for each term."],
  decorativeAnalogy: ["present", "Workplace team, taxi, wardrobe computer, Walkman, toolbox, collage and librarian comparisons accumulate faster than the mechanism develops."],
  referenceConfetti: ["present", "Cher, Walkman and Miss Jeeves references pile up across adjacent entries instead of serving one necessary teaching job."],
  missingMechanism: ["present", "The entries name components but do not follow one request through the causal system in connected steps."],
  genericAction: ["present", "The text says the distinction tells the reader what to fix without showing a concrete diagnosis and repair."],
  jargonBeforeMeaning: ["present", "Technical labels lead each entry before the reader has a connected reason to understand how they change the result."],
  disconnectedSystem: ["present", "Each component is summarized separately and the handoffs among input, product, model, tools and output remain underdeveloped."],
  joylessInstruction: ["present", "The repeated taxonomy reads as a dry terminology manual despite occasional pop-culture comparisons."]
};
const negativeTwoAssessments = {
  purposeTooNarrow: ["present", "A single job-offer decision becomes the organising purpose for a broad foundational book opening."],
  mechanismBeforeMotivation: ["present", "The opening moves into system mechanics before establishing the promised wider practical and civic reasons to understand AI."],
  workedExampleOvertakesBookPurpose: ["present", "The Northstar-versus-Juniper example occupies most of the opening and crowds out the book's broader reader transformation."],
  technicalExplainerVoice: ["present", "The organising perspective becomes tracing technical operations rather than orienting the reader across the full public and workplace purpose."]
};
const assessments = entries => Object.fromEntries(Object.entries(entries).map(([family, [state, observation]]) => [family, { state, observation, artifactLocator: "complete registered exemplar" }]));
const calibration = {
  registrySha256: sha(fs.readFileSync(path.join(root, "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json"))),
  reviewerPrincipalId: principal,
  reviewedAt,
  mode: "ORDINARY_NEWS_BLIND_REJECTION_V1",
  negatives: [
    {
      exemplarId: "CQX-BAD-001",
      verdict: "REJECT",
      identifiedFailureFamilies: Object.entries(negativeOneAssessments).filter(([, value]) => value[0] === "present").map(([family]) => family),
      familyAssessments: assessments(negativeOneAssessments),
      evidence: [{ excerpt: "This is the complete container around every other concept in this book.", locator: "registered CQX-BAD-001" }]
    },
    {
      exemplarId: "CQX-BAD-002",
      verdict: "REJECT",
      identifiedFailureFamilies: Object.keys(negativeTwoAssessments),
      familyAssessments: assessments(negativeTwoAssessments),
      evidence: [{ excerpt: "We will begin with one decision and follow it all the way through.", locator: "registered CQX-BAD-002" }]
    }
  ],
  positive: {
    exemplarId: "CQX-GOOD-NEWS-002",
    verdict: "PASS",
    strengthsRetained: [
      "One origin-versus-truth distinction develops through the article and supports a concrete check.",
      "The evidence limit remains beside the label claim rather than being deferred to a disclaimer."
    ],
    evidence: [
      { excerpt: "There are two separate jobs here: signalling AI involvement and checking the underlying claim.", locator: "registered CQX-GOOD-NEWS-002" },
      { excerpt: "The transport operator’s service notice is what you need to check the closure.", locator: "registered CQX-GOOD-NEWS-002" }
    ]
  },
  reuseDisclosure: "This producer independently reread the two current registered negatives and active NEWS positive before rereading the complete brain-interface story. No prior producer principal, timestamp or verdict was inherited.",
  reusedAt: reviewedAt
};

const evidenceByOutcome = {
  plainClarity: "A brain-computer interface turns recorded brain activity into commands for another device.",
  readerValue: "For the next health-AI headline, ask who used the system, what it did, and whether it was tested in ordinary care.",
  laidiesVoice: "That is a real research step, but it is not a device people can book next week.",
  engagingEnjoyable: "The system showed decoded words as text and moved a personalized digital avatar.",
  factualIntegrity: "This peer-reviewed proof of concept is not an available treatment or proof of better health outcomes.",
  freshnessReviewability: "The study involved three participants, limited trained expressions and an avatar demonstration.",
  surfaceFit: "An AI brain implant decoded speech and gestures. It is still a lab demonstration.",
  datedChange: "This peer-reviewed proof of concept is not an available treatment or proof of better health outcomes.",
  consequenceAndUncertainty: "Larger groups, broader repertoires and more testing are still needed.",
  dailyLifeConnection: "For the next health-AI headline, ask who used the system, what it did, and whether it was tested in ordinary care.",
  communicationBenchmark: "Signals for speech and gesture overlap. Models trained only on separate attempts did not fully handle attempts to do both together.",
  explainBack: "Training on both separate and combined attempts improved the result.",
  unseenTransfer: "For the next health-AI headline, ask who used the system, what it did, and whether it was tested in ordinary care.",
  usefulAction: "ask who used the system, what it did, and whether it was tested in ordinary care",
  analogyIntegrity: "A decoder is trained to recognize patterns for a limited set of intended words or gestures; it does not read free-form thoughts."
};
const outcomeObservations = {
  plainClarity: "The two technical terms receive ordinary-language meanings in the same paragraph where they explain the system.",
  readerValue: "The story turns a striking demonstration into a usable three-part question for later medical-AI claims.",
  laidiesVoice: "The tone is candid, adult and respectful, with one dry availability line and no disability-themed humour.",
  engagingEnjoyable: "The personalized avatar gives the mechanism a concrete human output without turning the research into spectacle.",
  factualIntegrity: "The prose keeps the participant count, trained task, wired hardware and proof-of-concept limit aligned with the supplied sources.",
  freshnessReviewability: "The story identifies the exact study scope and its source metadata carries the September 14 check date.",
  surfaceFit: "The headline answers what happened and immediately limits the result to a laboratory demonstration.",
  datedChange: "The story reports one newly published peer-reviewed demonstration and does not present an older capability as a new clinical treatment.",
  consequenceAndUncertainty: "The possible communication value is retained beside the small cohort, restricted repertoire and additional-testing limits.",
  dailyLifeConnection: "The transfer is a familiar act of reading a health-AI headline and deciding whether its promise has outrun the study.",
  communicationBenchmark: "The story starts with the human communication question, makes the signal-to-decoder path visible, retains limits and ends with a better next question.",
  explainBack: "The complete prose supports an ordinary-language account from recorded motor-cortex activity through trained decoders to text and avatar movement.",
  unseenTransfer: "The same evidence questions transfer to a future implant headline without claiming this study settles that new case.",
  usefulAction: "The action names the person, tested function and care setting to inspect rather than saying only to be careful.",
  analogyIntegrity: "No analogy is used; the article explains the actual mechanism directly and therefore introduces no analogy mismatch."
};
const outcomes = Object.fromEntries(Object.keys(evidenceByOutcome).map(name => [name, {
  verdict: "PASS",
  observation: outcomeObservations[name],
  artifactEvidence: [{ excerpt: evidenceByOutcome[name], locator: "complete exact story" }]
}]));
outcomes.explainBack.simulatedReaderProbe = {
  prompt: "How did the laboratory system turn an attempted greeting and gesture into visible communication?",
  probeResponse: "The implant recorded motor-cortex activity, the trained speech and gesture decoders matched those patterns to the study's limited set, and the system displayed text while moving the avatar.",
  expectedEvidence: "Recorded brain activity, trained limited decoders and the text-plus-avatar output must remain connected."
};
outcomes.unseenTransfer.simulatedReaderProbe = {
  prompt: "A later headline says a wireless implant restored everyday conversation for hundreds of people. What would you check?",
  probeResponse: "I would check the participant count, whether the communication was free-form or trained, whether the wireless system was actually tested, and whether ordinary-care outcomes were measured.",
  expectedEvidence: "The new case must be tested against cohort, task, hardware and clinical-setting evidence rather than inherited from this result."
};

const failureObservations = {
  glossaryAccumulation: "The two necessary terms are explained inside one causal paragraph instead of accumulating as detached definitions.",
  templateRepetition: "The sections advance from result to mechanism, limit and reader action without repeating one paragraph scaffold.",
  decorativeAnalogy: "The article uses no analogy, so no decorative comparison displaces the mechanism.",
  referenceConfetti: "The article contains no pop-culture or famous-person reference.",
  missingMechanism: "The prose connects recorded brain activity, trained decoders, displayed text and avatar movement.",
  genericAction: "The final action asks who used the system, what it did and whether ordinary care was tested.",
  jargonBeforeMeaning: "Brain-computer interface and decoder are defined in ordinary language at first meaningful use.",
  disconnectedSystem: "Input signals, decoder training and visible output are linked in sequence.",
  factlessConfidence: "The article names the cohort, limited expressions, wired apparatus and further-testing need beside the result.",
  staleUnreviewableClaims: "The dated story binds the September 14 paper and NIH release and names the trigger for renewed checking.",
  corporateSludge: "Concrete study actions replace promotional claims or institutional slogans.",
  joylessInstruction: "The human question and avatar example carry interest while the tone remains respectful.",
  benchmarkNameDrop: "The public article does not name Hannah Fry or any communication benchmark.",
  curiosityWithoutPayoff: "The opening question is answered with the participant, implant, decoder and avatar sequence.",
  familiarExampleWithoutTechnicalReturn: "The health-headline transfer returns directly to cohort, tested function and care-setting evidence.",
  communicationPastiche: "The article uses original LAiDIES wording and does not imitate a named communicator.",
  entertainmentBeforeUnderstanding: "No joke or spectacle precedes the explanation.",
  mechanismCompressedBehindHook: "The mechanism receives two full paragraphs before the implications section.",
  prematureClickBeforeMechanism: "The limitation follows the signal-and-training explanation rather than replacing it.",
  inflatedTakeawayEnding: "The ending limits the finding to a real research step and rejects near-term consumer availability.",
  purposeTooNarrow: "The bounded research-news purpose is fully served by explaining this specific study and its limits.",
  mechanismBeforeMotivation: "The first paragraph starts from expressive communication for people who cannot speak or move easily before naming the technical parts.",
  workedExampleOvertakesBookPurpose: "This is a short dated news story rather than a foundational book opening, and no worked example crowds out its purpose.",
  technicalExplainerVoice: "The organising question is what the result means for a reader, while technical detail serves that decision."
};
const failureFamilies = Object.fromEntries(Object.entries(failureObservations).map(([family, observation]) => [family, {
  present: false,
  observation,
  artifactLocator: "complete exact story"
}]));
const sourceBinding = bind("editorial-input.json");
const producerReview = {
  schemaVersion: "laidies-prose-quality-review.v1",
  candidateId: story.id,
  stage: "PRODUCER_SELF_REVIEW",
  contentClass: "NEWS",
  surface: "NEWSSTAND_DAILY",
  maker: principal,
  reviewer: {
    id: principal,
    principalId: principal,
    role: "Producer exact prose read-through",
    modelFamily: "openai"
  },
  reviewMode: "EXACT_PROSE_IN_FULL",
  reviewedAt,
  artifact: {
    manifest: bind("publication-manifest.json"),
    reviewText: bind("review-text.json"),
    rendered: bind("rendered-article.html")
  },
  calibration,
  reverseBrief: {
    humanQuestion: contract.readerContract.humanQuestion,
    promisedPayoff: contract.readerContract.promisedPayoff,
    centralMentalModel: contract.readerContract.centralMentalModel,
    dailyLifeConnection: contract.readerContract.dailyLifeConnection,
    surfaceJob: contract.readerContract.surfaceJob,
    desiredReaderFeeling: contract.readerContract.desiredFeeling
  },
  outcomes,
  failureFamilies,
  factualReview: {
    disposition: "CLAIMS_REVIEWED",
    sourceBindings: [sourceBinding],
    claimMap: claims.map(claim => ({
      claimId: claim.claimId,
      status: claim.status,
      candidateEvidence: claim.candidateEvidence,
      sourceBinding,
      sourceEvidence: claim.sourceEvidence,
      scopeAndFreshness: claim.scopeAndFreshness
    })),
    reviewedThrough: "2026-09-14",
    nextTrigger: "Reopen the paper and current clinical record for a correction, larger-cohort result, wireless-system result, clinical trial, authorization or evidence of patient outcomes.",
    correctionOwner: "LAiDIES NewsStand product steward"
  },
  reviewMetricsPolicy: {
    path: "operations/product-stewards/newsstand/ordinary-news-editorial-policy.json",
    sha256: sha(fs.readFileSync(path.join(root, "operations/product-stewards/newsstand/ordinary-news-editorial-policy.json")))
  },
  ratchet: {
    repeatedKnownDefects: 0,
    objectiveDefectsFirstFoundAtReview: 3,
    reviewIssues: 3,
    reviewCycles: 2,
    onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW"
  },
  lineage: {
    kind: "FIRST",
    noComparableReason: "No prior checksum-bound NewsStand candidate reports this September 14 simultaneous speech-and-gesture BCI study."
  },
  learningDisposition: {
    disposition: "NO_NEW_DEFECT",
    rationale: "The copied Gemini review, stale manifest bindings and unrelated discovery checks were detected and repaired before independent dispatch; they are preserved as rejected candidate-local records rather than added as a new shared defect."
  },
  verdict: "PASS",
  limits: [],
  limitations: [
    "Producer review is not independent admission.",
    "AI editorial analysis only; no observed human-comprehension evidence is claimed.",
    "The visual has a separate final PASS; this receipt reviews prose and factual bindings only.",
    "Public issue admission and release remain separate."
  ]
};
write("producer-publication-review.json", producerReview);
write("producer-self-review.json", producerReview);
write("review-metrics.json", {
  proseReview: { reviewIssues: 3, reviewCycles: 2 },
  evidencePacket: { rounds: 1, gaps: 0 },
  ratchet: producerReview.ratchet,
  repairedIssues: [
    "Copied Gemini producer review quoted unrelated Windows-app prose.",
    "Publication manifest bound stale review-text and rendered hashes.",
    "Writer packet contained unrelated national-policy discovery checks."
  ]
});
console.log(JSON.stringify({ candidateId: story.id, reviewedAt, reviewText: bind("review-text.json"), manifest: bind("publication-manifest.json"), claims: claims.length }));
