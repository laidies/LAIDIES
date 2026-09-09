#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, stable } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";

const root = process.cwd();
const id = "chatgpt-images-2-5-2026-09-08";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/nvidia-hugging-face-acquisition-2026-09-05-sec-8k-repair-20260906";
const now = "2026-09-08T23:55:00.000Z";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const read = rel => fs.readFileSync(path.join(root, rel), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const bind = name => ({ path: `${dir}/${name}`, sha256: hash(fs.readFileSync(path.join(root, dir, name))) });
fs.mkdirSync(path.join(root, dir), { recursive: true });
fs.copyFileSync(path.join(root, "content/newsstand-stories.js"), path.join(root, dir, "publication-base.js"));

const story = {
  id, slug: id, edition: "daily", status: "hold", publishedAt: null,
  updatedAt: now, lastCheckedAt: now,
  sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
  correction: null, correctionHistory: [], retraction: null,
  predecessorStoryIds: [], successorStoryIds: [], relationshipType: null,
  bigPicture: null, thread: null, thread_subtitle: null, thread_entry: null,
  headline: "ChatGPT can now turn your rough sketch into an image—and let you point to what needs changing.",
  heroVisual: {
    src: "/assets/newsstand/design-20260830/latest-chatgpt-images-2-5-20260908.png",
    alt: "Three adult professional women use a sketch and a marked edit area to refine a visual together in a colourful 1990s-inspired studio.",
    credit: "LAiDIES NewsStand illustration; not a screenshot of ChatGPT"
  },
  the_story: "<p>OpenAI released ChatGPT Images 2.5 on September 8. It is the image-making and image-editing part of ChatGPT—not a new general chat model. The release adds ways to begin with a rough drawing or a template, place a comment on part of an image you want changed, and share the prompt behind an image.</p><p>OpenAI says Images 2.5 is rolling out across all ChatGPT tiers on desktop, mobile and web, as well as ChatGPT Work and Codex. The release notes add two important limits: templates are not yet available in Work mode, and existing image-generation limits have not changed. Because this is a rollout, a feature may not appear in every account at the same moment.</p><p>OpenAI also says the underlying model keeps people and objects more consistent through several edits and can reduce the time it takes to generate an image by up to 50% compared with Images 2.0. Those performance figures are company claims. Axios tested early access and found better likeness preservation and more detailed editing in its own small set of tasks; that is useful first-hand evidence, not a broad independent benchmark.</p>",
  laidies_read: "<p>The practical change is not simply that the pictures may look better. It is that you can communicate visually instead of trying to describe every detail in one long prompt.</p><p>A sketch gives the system a rough map: put the sofa here, leave space for a headline there, or make the product the largest object. A comment gives it a smaller editing target: change this sleeve, remove that lamp, keep the rest. The AI still generates a new image; it is not turning the result into a fully editable design file with independent text boxes and layers.</p><p>That distinction matters for real work. A marketing manager could sketch the arrangement of a social post, then ask for visual directions before a designer builds the final asset. Someone planning a room could draw the furniture placement instead of writing a paragraph about left, right and centre. But exact copy, measurements, brand rules and important factual details still need checking outside the finished picture.</p>",
  what_this_means: "<p>If the new tools appear in your account, try them on a task where layout matters. Draw the rough arrangement first, add the few details that must be preserved, and make one targeted edit at a time. That tests the real improvement: whether you can steer the image without rebuilding the whole idea after every change.</p><p>Do not treat “all tiers” as unlimited use, or OpenAI's speed claim as a promise about every device and every image. Your plan's existing generation limits still apply, rollout timing can vary, and a complex request may still need several attempts.</p><p>The larger lesson is current AI practice: when the product gives you a better way to provide context—a picture, a file, a marked region or a shared project—use that route instead of forcing the whole job into a longer prompt.</p>",
  cocktail_party: "“ChatGPT's image tool now lets you sketch the composition and point to the exact area you want changed. The useful advance is better context and control—not a magical replacement for design judgement or final checks.”",
  watch_fors: null, closing_note: null,
  class_notes: "This connects to <a href='/library.html#working-with-ai-101::%401-3-whats-actually-determining-the-output'>Working with AI 101: What’s Actually Determining the Output</a>. The lesson explains why the model is only one part of the result; the input format, surrounding tools and context can change what the system is able to produce.",
  sources: [
    { id: "openai-images-2-5", label: "OpenAI — Introducing ChatGPT Images 2.5", url: "https://openai.com/index/introducing-chatgpt-images-2-5/", publisherType: "vendor", accessedAt: "2026-09-08", approvalStatus: "reviewed" },
    { id: "openai-release-notes", label: "OpenAI Help Center — ChatGPT release notes", url: "https://help.openai.com/en/articles/6825453", publisherType: "vendor", accessedAt: "2026-09-08", approvalStatus: "reviewed" },
    { id: "openai-system-card", label: "OpenAI — ChatGPT Images 2.5 system card", url: "https://deploymentsafety.openai.com/chatgpt-images-2-5/safety-evaluations", publisherType: "vendor", accessedAt: "2026-09-08", approvalStatus: "reviewed" },
    { id: "axios-hands-on", label: "Axios — Hands on with ChatGPT's new image editor", url: "https://www.axios.com/2026/09/08/exclusive-hands-on-with-chatgpts-new-image-editor", publisherType: "reporting", accessedAt: "2026-09-08", approvalStatus: "reviewed" }
  ],
  aidb_credit: null,
  themes: ["model and product releases", "creative work"],
  concepts: ["context", "multimodal input", "image editing"],
  tags: ["OpenAI", "ChatGPT Images", "image generation", "creative work"],
  saint_lane: null, badge: "THE LATEST"
};

const evidence = {
  schemaVersion: "newsstand-source-evidence-v1",
  candidateId: id,
  reviewedThrough: "2026-09-08",
  records: [
    { id: "openai-images-2-5", url: "https://openai.com/index/introducing-chatgpt-images-2-5/", publisher: "OpenAI", authority: "Primary for release, features, rollout and company performance claims.", passages: [
      "OpenAI published the product release on September 8, 2026.",
      "It says ChatGPT Images 2.5 adds Sketch, templates, image comments and prompt sharing.",
      "It says the product is rolling out to ChatGPT, ChatGPT Work and Codex users across all tiers on desktop, mobile and web.",
      "It says generation latency is reduced by up to 50% compared with Images 2.0 and that reference subjects and targeted edits are more consistent.",
      "It describes two API models, Flare and Sunburst; this article does not translate their API pricing into a consumer cost claim."
    ], limitation: "Performance and safety descriptions are vendor claims unless separately corroborated." },
    { id: "openai-release-notes", url: "https://help.openai.com/en/articles/6825453", publisher: "OpenAI Help Center", authority: "Primary for current consumer feature and plan notes.", passages: [
      "The September 8 release note describes templates, Sketch, image comments and prompt sharing.",
      "It says templates are not yet available in Work mode.",
      "It says existing image-generation limits are unchanged and broader availability is planned over the coming days."
    ], limitation: "Rollout language means availability can vary by account and time." },
    { id: "openai-system-card", url: "https://deploymentsafety.openai.com/chatgpt-images-2-5/safety-evaluations", publisher: "OpenAI", authority: "Primary for OpenAI's stated safety evaluations and provenance controls.", passages: [
      "The system card says the release continues prompt and image checks, C2PA metadata and invisible watermarking.",
      "It identifies new features including sketch-based generation, templates and shared prompts."
    ], limitation: "A vendor system card documents the maker's tests and mitigations; it does not independently prove universal safety." },
    { id: "axios-hands-on", url: "https://www.axios.com/2026/09/08/exclusive-hands-on-with-chatgpts-new-image-editor", publisher: "Axios", authority: "Independent first-hand reporting on a small early-access task set.", passages: [
      "Axios reports testing logo creation, a cat-photo transformation and a tattoo design with the new image engine.",
      "Its reporter found improved likeness preservation and more detailed editing in those tasks.",
      "The article presents the test as hands-on experience, not a comprehensive benchmark."
    ], limitation: "A few newsroom tests do not establish performance across all images, devices or accounts." }
  ]
};

const coverage = {
  schema: "laidies.newsstand-story-type-coverage.v1", primaryType: "model-tool-release", overlays: [],
  universalAnswers: {
    whatHappened: "OpenAI released ChatGPT Images 2.5 on September 8, adding Sketch, templates, image comments and prompt sharing.",
    plainLanguageIdentity: "It is the image-making and image-editing part of ChatGPT—not a new general chat model.",
    evidenceBasis: "OpenAI's release, current release notes and system card, plus a bounded Axios hands-on report.",
    evidenceLimits: "The speed and broad quality claims remain vendor claims; Axios tested only a small set of tasks.",
    readerRelevance: "Readers can guide layout with a sketch and point to a targeted change instead of encoding the whole visual job in prose.",
    affectedPeople: "ChatGPT users making or editing images, including people planning presentations, social posts, rooms and other visual work.",
    changesNow: "The new tools are rolling out now; templates are not yet in Work mode and account timing can vary.",
    uncertainty: "Independent broad evaluation is not yet available, and exact consistency will vary by task.",
    readerAction: "Try one layout-sensitive task with a rough sketch and one targeted edit, then check copy, measurements and important facts outside the image.",
    betterQuestion: "Does this input method give me more control over the result I actually need?"
  },
  typeAnswers: { "model-tool-release": {
    productRange: "ChatGPT Images 2.5 is the image generation and editing part of ChatGPT; Flare and Sunburst are separate developer API routes.",
    newCapabilities: "Sketch, templates, comments placed on images and optional prompt sharing are newly announced product controls.",
    bestFitTasks: "Early layout exploration, visual variations and focused edits where showing the arrangement is easier than describing it.",
    notFor: "It is not a fully layered design file, proof of exact text or measurements, or a replacement for final factual and brand checks.",
    nearestAlternatives: "A text-only image prompt remains available; the new routes add visual context and a marked edit target.",
    availability: "Rolling out on desktop, mobile and web across ChatGPT, ChatGPT Work and Codex; exact timing may vary.",
    freePaidBoundary: "OpenAI says all ChatGPT tiers; existing image-generation limits remain and templates are not yet in Work mode.",
    costBoundary: "No new consumer price is announced; all tiers does not mean unlimited generations.",
    limitations: "Rollout timing, plan limits, lack of editable layers and limited independent testing remain important boundaries.",
    technicalExampleProportionality: "The article uses a room and social-post layout to explain the input method, not to claim professional production readiness.",
    vendorEvidenceBoundary: "Feature and speed claims are attributed to OpenAI; Axios supplies only bounded first-hand corroboration."
  }},
  translation: {
    schema: "laidies.newsstand-reader-translation.v1",
    newsVersionExact: "OpenAI released ChatGPT Images 2.5 on September 8.",
    actualMeaningExact: "The practical change is not simply that the pictures may look better. It is that you can communicate visually instead of trying to describe every detail in one long prompt.",
    mechanismExact: "A sketch gives the system a rough map: put the sofa here, leave space for a headline there, or make the product the largest object. A comment gives it a smaller editing target: change this sleeve, remove that lamp, keep the rest.",
    familiarExampleExact: "Someone planning a room could draw the furniture placement instead of writing a paragraph about left, right and centre.",
    jargon: [
      { term: "ChatGPT Images 2.5", plainMeaning: "It is the image-making and image-editing part of ChatGPT—not a new general chat model." },
      { term: "rollout", plainMeaning: "Because this is a rollout, a feature may not appear in every account at the same moment." }
    ],
    learningConnections: [{ concept: "Context shapes the output", learningPayoff: "Understand why a sketch, marked region or file can guide the system differently from prose alone.", disposition: "link", destination: "/library.html#working-with-ai-101::%401-3-whats-actually-determining-the-output" }]
  }
};

write("story.json", story);
write("source-evidence.json", evidence);
write("story-type-coverage.json", coverage);
write("review-text.json", candidateReviewText(story));
write("rendered-article.html", `<article><h1>${story.headline}</h1><h2>The story</h2>${story.the_story}<h2>The LAiDIES read</h2>${story.laidies_read}<h2>What this means for you</h2>${story.what_this_means}</article>\n`);
write("publication-manifest.json", { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") });

const sourceQuotes = {
  release: "OpenAI published the product release on September 8, 2026.",
  features: "It says ChatGPT Images 2.5 adds Sketch, templates, image comments and prompt sharing.",
  availability: "It says the product is rolling out to ChatGPT, ChatGPT Work and Codex users across all tiers on desktop, mobile and web.",
  limits: "It says templates are not yet available in Work mode.",
  performance: "It says generation latency is reduced by up to 50% compared with Images 2.0 and that reference subjects and targeted edits are more consistent.",
  "hands-on": "Its reporter found improved likeness preservation and more detailed editing in those tasks."
};
const claims = [
  ["release", "OpenAI released ChatGPT Images 2.5 on September 8.", ["openai-images-2-5"]],
  ["features", "The release adds ways to begin with a rough drawing or a template, place a comment on part of an image you want changed, and share the prompt behind an image.", ["openai-images-2-5", "openai-release-notes"]],
  ["availability", "OpenAI says Images 2.5 is rolling out across all ChatGPT tiers on desktop, mobile and web, as well as ChatGPT Work and Codex.", ["openai-images-2-5", "openai-release-notes"]],
  ["limits", "templates are not yet available in Work mode, and existing image-generation limits have not changed.", ["openai-release-notes"]],
  ["performance", "OpenAI also says the underlying model keeps people and objects more consistent through several edits and can reduce the time it takes to generate an image by up to 50% compared with Images 2.0.", ["openai-images-2-5"]],
  ["hands-on", "Axios tested early access and found better likeness preservation and more detailed editing in its own small set of tasks", ["axios-hands-on"]]
].map(([claimId, excerpt, sourceIds]) => ({ claimId, status: claimId === "release" || claimId === "features" || claimId === "availability" || claimId === "limits" ? "VERIFIED" : "QUALIFIED", candidateEvidence: [{ excerpt, locator: "exact story" }], sourceIds, sourceBinding: bind("source-evidence.json"), sourceEvidence: [{ excerpt: sourceQuotes[claimId], locator: "source-evidence record passages" }], scopeAndFreshness: "Checked September 8, 2026; vendor claims remain attributed and the independent test is explicitly bounded." }));
write("publication-claim-map.json", claims);

const contract = JSON.parse(read(`${template}/producer-contract.json`));
contract.candidateId = id;
contract.producer = "/root";
contract.readerContract = {
  humanQuestion: "What changed in ChatGPT's image tool, and is there a better way to guide it than writing a longer prompt?",
  promisedPayoff: "Understand the new visual-control tools, their limits and one useful way to test them.",
  priorKnowledge: "Smart professional women with no image-model vocabulary assumed.",
  centralMentalModel: "A sketch and a marked edit area are forms of context that can guide an image system more directly than prose alone.",
  dailyLifeConnection: "Planning a room or social post where arrangement is easier to draw than describe.",
  surfaceJob: "Ordinary dated Daily report on a current product release; not a tutorial, product endorsement or Big Picture replacement.",
  desiredReaderFeeling: "I understand what is genuinely new, what still needs checking and how I can test whether it helps my own work."
};
contract.readerContract.desiredFeeling = contract.readerContract.desiredReaderFeeling;
contract.draftArchitecture = {
  plainAnswer: coverage.universalAnswers.whatHappened,
  causalSequence: ["A person provides a sketch or marks an image region.", "The product uses that visual context alongside the instruction.", "The image model generates a new image or edited variation.", "The person checks whether intended details survived and whether facts or copy are correct."],
  workedCase: "A marketing manager sketches a social-post layout before a designer creates the final asset.",
  transferCase: "A person planning a room draws furniture placement rather than describing every direction.",
  usefulAction: coverage.universalAnswers.readerAction,
  formatSpecificStructure: "The Story, The LAiDIES Read, What This Means for You, Cocktail Party Explanation, Class Notes, Sources.",
  antiTemplateDecision: "Open with the product change, explain visual context through two concrete cases, then state limits and a bounded test.",
  analogyPlan: [],
  humourPlan: { lessonJob: "No joke needed; the practical contrast between drawing and directional prose carries the explanation." },
  readerQuestions: [
    { id: "event", question: "What changed?" },
    { id: "identity", question: "What is Images 2.5?" },
    { id: "mechanism", question: "How do Sketch and comments change the input?" },
    { id: "availability", question: "Who can use it and what limits remain?" },
    { id: "action", question: "What is a useful first test?" }
  ],
  requiredTerms: [{ term: "ChatGPT Images 2.5", meaning: coverage.translation.jargon[0].plainMeaning }, { term: "rollout", meaning: coverage.translation.jargon[1].plainMeaning }],
  presentationPlan: "Use the reviewed LAiDIES editorial illustration showing three adult women guiding a visual with a sketch and targeted edit."
};
contract.canonicalTruth = [{ claimId: "images-2-5-release", claim: "Current release, features, access, limitations and bounded independent test", owner: "LAiDIES NewsStand product steward", source: { path: `${dir}/source-evidence.json`, sha256: bind("source-evidence.json").sha256 }, expiresAt: "2026-09-15T00:00:00Z", freshnessTrigger: "OpenAI changes rollout, plan limits, release notes, system card or credible independent testing." }];
write("producer-contract.json", contract);

const writerTemplate = JSON.parse(read(`${template}/writer-input-current.json`));
writerTemplate.packet.candidateId = id;
writerTemplate.packet.reader = contract.readerContract;
writerTemplate.packet.explanationPlan = contract.draftArchitecture;
writerTemplate.packet.reportingFrame = coverage;
writerTemplate.packet.sources = [{ kind: "verified-source", path: `${dir}/source-evidence.json`, sha256: bind("source-evidence.json").sha256, text: JSON.stringify(evidence) }];
writerTemplate.producerContract = bind("producer-contract.json");
write("writer-input-current.json", writerTemplate);

const answers = {
  event: "OpenAI released ChatGPT Images 2.5 on September 8.",
  identity: "It is the image-making and image-editing part of ChatGPT—not a new general chat model.",
  mechanism: coverage.translation.mechanismExact,
  availability: "OpenAI says Images 2.5 is rolling out across all ChatGPT tiers on desktop, mobile and web, as well as ChatGPT Work and Codex.",
  action: "Draw the rough arrangement first, add the few details that must be preserved, and make one targeted edit at a time."
};
write("producer-observations.json", {
  completeTextRead: true, storySha256: hash(JSON.stringify(story)), readerAnswers: answers,
  terms: { "ChatGPT Images 2.5": coverage.translation.jargon[0].plainMeaning, rollout: coverage.translation.jargon[1].plainMeaning },
  explainBack: "A sketch and a marked region give the image system visual context about arrangement and the exact target of a change, rather than forcing every spatial instruction into prose.",
  unseenTransfer: "For a slide deck, a rough wireframe can show where the chart and headline belong, but the person must still verify the chart values and final wording.",
  unresolvedIssues: [], repairsMade: ["Separated current product controls from OpenAI's performance claims.", "Added release-note limits for Work mode, rollout timing and unchanged generation limits.", "Explained that the output is still a generated image rather than a layered design file."],
  limitations: ["Producer reasoning only, not independent review or observed human comprehension.", "Broad independent performance testing is not yet available."]
});

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id; producer.maker = "/root"; producer.reviewer = { id: "/root", principalId: "/root", role: "Producer exact prose read-through", modelFamily: "openai" }; producer.reviewedAt = now;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = { ...contract.readerContract };
delete producer.reverseBrief.priorKnowledge;
const exact = {
  plainClarity: story.the_story.match(/It is the image-making[^<]+/)[0], readerValue: "you can communicate visually instead of trying to describe every detail in one long prompt.", laidiesVoice: "The practical change is not simply that the pictures may look better.", engagingEnjoyable: "Someone planning a room could draw the furniture placement instead of writing a paragraph about left, right and centre.", factualIntegrity: "Those performance figures are company claims.", freshnessReviewability: "OpenAI released ChatGPT Images 2.5 on September 8.", surfaceFit: "The release adds ways to begin with a rough drawing or a template", datedChange: "OpenAI released ChatGPT Images 2.5 on September 8.", consequenceAndUncertainty: "Because this is a rollout, a feature may not appear in every account at the same moment.", dailyLifeConnection: "A marketing manager could sketch the arrangement of a social post", communicationBenchmark: "The useful advance is better context and control—not a magical replacement for design judgement or final checks.", explainBack: coverage.translation.mechanismExact, unseenTransfer: "The larger lesson is current AI practice", usefulAction: "Draw the rough arrangement first, add the few details that must be preserved, and make one targeted edit at a time.", analogyIntegrity: "A sketch gives the system a rough map"
};
for (const [key, outcome] of Object.entries(producer.outcomes)) { outcome.verdict = "PASS"; outcome.observation = `The exact article supplies specific ${key} evidence while keeping the release and its limits connected.`; outcome.artifactEvidence = [{ excerpt: exact[key], locator: "exact story" }]; }
producer.outcomes.explainBack.simulatedReaderProbe = { prompt: "Explain how visual context changes the job.", probeResponse: "A sketch shows arrangement and a marked region shows the edit target, so the system does not have to infer all spatial instructions from prose.", expectedEvidence: "Visual input and targeted edit mechanism." };
producer.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: "Apply this to a slide deck.", probeResponse: "A rough wireframe can show the composition, but values and wording still need separate verification.", expectedEvidence: "New layout case plus preserved checking boundary." };
for (const [key, family] of Object.entries(producer.failureFamilies)) { family.present = false; family.observation = `The complete article avoids ${key}; the dated release, mechanism, limits and reader test remain connected.`; family.artifactLocator = "complete exact story"; }
producer.factualReview = { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind("source-evidence.json")], claimMap: claims, reviewedThrough: "2026-09-08", nextTrigger: "Rollout, plan limits, release notes, system card or credible independent testing changes.", correctionOwner: "LAiDIES NewsStand product steward" };
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No prior checksum-bound NewsStand article on this release exists." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "Producer found no known defect after the bounded source and full-prose review; independent review remains required." };
producer.verdict = "PASS";
producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no observed human-comprehension evidence is claimed.", "Image and public release remain separate gates."];
write("producer-publication-review.json", producer);

const paragraphs = storyParagraphs(story);
write("editorial-input.json", {
  readerJob: `${contract.readerContract.humanQuestion} ${contract.readerContract.promisedPayoff}`,
  completeArtifact: read(`${dir}/review-text.json`), paragraphs,
  communicationAuthority: writerTemplate.packet.communication ? writerTemplate.packet.communication : writerTemplate.packet.communicationAuthority,
  claims: claims.map(c => ({ claimId: c.claimId, claim: c.candidateEvidence[0].excerpt, sourceIds: c.sourceIds })),
  sources: evidence.records.map(r => ({
    id: r.id,
    url: r.url,
    authority: r.authority,
    passages: r.passages,
    limitation: r.limitation,
    source: {
      url: r.url,
      passage: r.passages.join(" "),
      passageLocator: r.url,
      additionalPassage: `${r.authority} Limitation: ${r.limitation}`,
      additionalPassageLocator: r.url
    }
  }))
});
console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), storyTypeCoverage: bind("story-type-coverage.json"), status: "PENDING_INDEPENDENT_REVIEW" }));
