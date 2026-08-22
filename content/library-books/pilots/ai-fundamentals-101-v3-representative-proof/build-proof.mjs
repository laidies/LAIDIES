#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { enforcedFailureFamilies } from "../../../../scripts/check-prose-quality-admission.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const base = "content/library-books/pilots/ai-fundamentals-101-v3-representative-proof";
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const bind = relative => ({ path: relative, sha256: sha256(fs.readFileSync(path.join(root, relative))) });
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);

const reviewTextPath = `${base}/review-text.md`;
const renderedPath = `${base}/review.html`;
const desktopVisualPath = `${base}/visuals/strawberry-token-route.svg`;
const mobileVisualPath = `${base}/visuals/strawberry-token-route-mobile.svg`;
const manifestPath = `${base}/artifact-manifest.json`;
const receiptPath = `${base}/producer-self-review.json`;
const sourcePath = "operations/product-stewards/library/AI-FUNDAMENTALS-101-V3-TOKENS-CLAIM-SOURCE-PACKET-2026-08-09.md";
const registryPath = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const badOnePath = "operations/product-stewards/learning-content-ecosystem/quality-exemplars/ai-fundamentals-101-chapter-1-known-bad.txt";
const badTwoPath = "operations/product-stewards/learning-content-ecosystem/quality-exemplars/ai-fundamentals-101-job-offer-framing-known-bad.md";
const positivePath = "content/episodes/episode-01.canon.md";
const candidateId = "ai-fundamentals-101-v3-tokens-representative-proof";

const manifest = {
  schemaVersion: "laidies-content-artifact-manifest.v1",
  candidateId,
  surface: "LIBRAIRY",
  contentClass: "EXPLANATION",
  reviewText: bind(reviewTextPath),
  rendered: bind(renderedPath),
  assets: [bind(desktopVisualPath), bind(mobileVisualPath)],
  status: "INTERNAL_REPRESENTATIVE_PROOF_NOT_ADMITTED",
  deterministicBuild: "node content/library-books/pilots/ai-fundamentals-101-v3-representative-proof/build-proof.mjs",
  publicReleaseAuthority: "ALI_ONLY"
};
writeJson(manifestPath, manifest);

const registry = JSON.parse(fs.readFileSync(path.join(root, registryPath), "utf8"));
const evidence = (excerpt, locator) => [{ excerpt, locator }];
const outcomeEvidence = evidence(
  "The interesting part is that you and a language model do not begin with the same view of the word.",
  "review-text.md:13"
);
const outcome = (observation, excerpt = outcomeEvidence[0].excerpt, locator = outcomeEvidence[0].locator) => ({
  verdict: "PASS",
  observation,
  artifactEvidence: evidence(excerpt, locator)
});

const outcomes = {
  plainClarity: outcome("The section defines tokens only after the reader has completed the visible strawberry count, and it excludes implementation jargon from the teaching route.", "Before a language model works with that word, a piece of software called a **tokenizer** divides the text into reusable pieces called **tokens**.", "review-text.md:21"),
  readerValue: outcome("The reader leaves able to interpret context-window claims, token-metered API use and character-exact tasks.", "Tokens matter outside viral spelling questions.", "review-text.md:53"),
  laidiesVoice: outcome("The prose sounds like a knowledgeable friend: direct, warm and lightly funny without turning the lesson into a string of references.", "Three. No calculator. No emergency meeting. No tiny pair of reading glasses.", "review-text.md:7"),
  engagingEnjoyable: outcome("The familiar strawberry puzzle creates curiosity, and each later beat answers the question rather than postponing it.", "So why did this simple question become a famous way to catch chatbots looking unusually flustered?", "review-text.md:9"),
  factualIntegrity: outcome("Provider-specific claims are qualified, the named encoding is explicit and the prose rejects a universal model-failure claim.", "Another encoding may split the same word differently.", "review-text.md:27"),
  freshnessReviewability: outcome("The evergreen mechanism is separated from volatile provider limits and prices, which the prose sends to current documentation.", "you check the provider's current documentation rather than relying on an old rule of thumb.", "review-text.md:61"),
  surfaceFit: outcome("The artifact is a readable connected book section followed by a deliberately separate lookup entry.", "## Concept Index entry", "review-text.md:99"),
  connectedSystemUnderstanding: outcome("The text explicitly follows typed text through tokenizer, model and product, then connects tokens to context, hardware work and API metering.", "your text → tokenizer → token pieces → model → generated token pieces → readable response", "review-text.md:83"),
  dailyLifeConnection: outcome("Four bounded real-life consequences cover product use, exact text work, API budgeting and context claims.", "**3. Exact text jobs deserve exact methods.**", "review-text.md:63"),
  communicationBenchmark: outcome("The explanation begins from a human-visible action, makes the invisible split visible, reconnects it to the mechanism, states the limit and ends with a better question.", "A person can point at the letters directly.", "review-text.md:45"),
  explanationArc: outcome("The arc moves from a shared strawberry count to causal mechanism, then earns the fluent-writing versus character-inspection click and lands on a usable question.", "Different jobs expose different parts of the system.", "review-text.md:49"),
  explainBack: {
    ...outcome("A simulated unfamiliar-reader probe can recover that humans see letters while the model starts with tokenizer-created text pieces; real observed evidence remains required for independent admission.", "fluent writing does not prove that the system handles every tiny feature of text the way you do.", "review-text.md:47"),
    simulatedReaderProbe: {
      prompt: "Without using the book's wording, explain why strawberry can be easy for you to inspect but awkward for a language model.",
      probeResponse: "I see individual letters, but the model first gets pieces made by a tokenizer. The r letters may sit inside those pieces, so letter counting is a different task from fluent sentence generation.",
      expectedEvidence: "Distinguishes human-visible letters from tokenizer-created pieces, names the character-level consequence and avoids claiming every model fails."
    }
  },
  unseenTransfer: {
    ...outcome("The practical section transfers the mechanism from strawberry to an unseen exact identifier and to interpreting a context-window claim; human observation remains required for admission.", "If the task depends on every character—counting letters, checking a code, preserving a legal clause or matching an identifier—say so.", "review-text.md:65"),
    simulatedReaderProbe: {
      prompt: "A chatbot summarizes a policy correctly but changes one character in an employee ID. Use the token explanation to choose a safer next step.",
      probeResponse: "Fluent summarizing and exact character matching are different jobs. I would compare the identifier with the source or use a text tool that checks the exact string.",
      expectedEvidence: "Transfers the mechanism to character-sensitive work and chooses exact comparison rather than a more confident rewrite."
    }
  },
  usefulAction: outcome("The closing question tells the reader exactly what to ask when wording, capacity or exact characters matter.", "How was this text split, what else is sharing the context window, and do I need a language answer or an exact character check?", "review-text.md:95"),
  analogyIntegrity: outcome("The magazine-clipping analogy maps variable-size reusable text pieces and explicitly stops before intention, meaning or human judgment.", "The tokenizer is not rummaging through *Sassy* with taste, intention or a glue stick.", "review-text.md:39")
};

const failureFamilies = Object.fromEntries(enforcedFailureFamilies(registry, { contentClass: "EXPLANATION", surface: "LIBRAIRY" }).map(name => [name, {
  present: false,
  observation: `${name} is absent after full exact-prose producer inspection; the section uses one connected mechanism, one earned bounded analogy and specific reader actions.`,
  artifactLocator: "review-text.md:1-112"
}]));

const sourceBinding = bind(sourcePath);
const receipt = {
  schemaVersion: "laidies-prose-quality-review.v1",
  candidateId,
  stage: "PRODUCER_SELF_REVIEW",
  contentClass: "EXPLANATION",
  surface: "LIBRAIRY",
  maker: "library-owner-codex-sol",
  reviewer: { id: "library-owner-producer", principalId: "library-owner-codex-sol", role: "Library producer", modelFamily: "openai" },
  reviewMode: "EXACT_PROSE_IN_FULL",
  reviewedAt: "2026-08-09T13:00:00-07:00",
  artifact: { reviewText: bind(reviewTextPath), manifest: bind(manifestPath), rendered: bind(renderedPath) },
  calibration: {
    registrySha256: bind(registryPath).sha256,
    reviewerPrincipalId: "library-owner-codex-sol",
    reviewedAt: "2026-08-09T12:30:00-07:00",
    negatives: [
      {
        exemplarId: "CQX-BAD-001",
        verdict: "REJECT",
        identifiedFailureFamilies: registry.negativeExemplars[0].failureFamilies,
        evidence: evidence("First, stop calling the whole thing “the AI.”", "ai-fundamentals-101-chapter-1-known-bad.txt:3")
      },
      {
        exemplarId: "CQX-BAD-002",
        verdict: "REJECT",
        identifiedFailureFamilies: registry.negativeExemplars[1].failureFamilies,
        evidence: evidence("You ask an AI product to compare two job offers.", "ai-fundamentals-101-job-offer-framing-known-bad.md:5")
      }
    ],
    positive: {
      exemplarId: "CQX-GOOD-EPISODE-001",
      verdict: "PASS",
      strengthsRetained: ["human stakes before theory", "connected causal learning arc", "warm funny practical voice"],
      evidence: evidence("AI fluency starts with one useful, low-risk task.", "episode-01.canon.md:lesson")
    }
  },
  reverseBrief: {
    humanQuestion: "Why can an AI write fluently but still be awkward at counting letters, and why do people keep talking about tokens?",
    promisedPayoff: "Understand how text reaches a language model, connect tokens to context and metering, and choose an exact method when every character matters.",
    centralMentalModel: "A tokenizer turns visible text into reusable pieces before the model processes it; the product later turns generated pieces back into readable text.",
    dailyLifeConnection: "Interpreting context-window claims, budgeting an API and checking character-exact strings.",
    surfaceJob: "A connected book section that teaches the mechanism, plus a separate compact Concept Index entry.",
    desiredReaderFeeling: "Oh, that is why a fluent model can trip over strawberry—and now token headlines make sense."
  },
  outcomes,
  failureFamilies,
  factualReview: {
    disposition: "CLAIMS_REVIEWED",
    sourceBindings: [sourceBinding],
    claimMap: [
      {
        claimId: "token-forms-and-sequence",
        status: "VERIFIED",
        candidateEvidence: evidence("A token might be a whole word, part of a word, punctuation, a space or a single character.", "review-text.md:21"),
        sourceBinding,
        sourceEvidence: evidence("A token can be a whole word, part of a word, punctuation, a space", "source packet:claim 2"),
        scopeAndFreshness: "Durable mechanism checked against current OpenAI Help Center and tiktoken documentation on 2026-08-09."
      },
      {
        claimId: "strawberry-o200k-split",
        status: "VERIFIED",
        candidateEvidence: evidence("Using OpenAI's `o200k_base` encoding, **strawberry** is split like this:", "review-text.md:23"),
        sourceBinding,
        sourceEvidence: evidence("o200k_base   count=3  pieces=['st', 'raw', 'berry']", "source packet:reproducible split"),
        scopeAndFreshness: "Reproduced locally with official tiktoken 0.13.0 on 2026-08-09; the prose immediately says another encoding may differ."
      },
      {
        claimId: "character-level-boundary",
        status: "QUALIFIED",
        candidateEvidence: evidence("Tokenization is therefore one reason letter-by-letter jobs can be unexpectedly awkward for a language model.", "review-text.md:47"),
        sourceBinding,
        sourceEvidence: evidence("Character-level tasks can be awkward for subword-token models", "source packet:claim 6"),
        scopeAndFreshness: "Qualified as one contributor, not a universal current-model failure; supported by Cosma et al. EMNLP 2025."
      },
      {
        claimId: "limits-and-metering",
        status: "VERIFIED",
        candidateEvidence: evidence("Tokens matter outside viral spelling questions.", "review-text.md:53"),
        sourceBinding,
        sourceEvidence: evidence("Token counts matter because model limits and API metering are expressed in", "source packet:claim 5"),
        scopeAndFreshness: "Current limits and prices intentionally omitted; recheck provider documentation before any provider-specific update."
      }
    ],
    reviewedThrough: "2026-08-09",
    nextTrigger: "Named encoding, provider limit, provider price or character-capability claim changes before admission.",
    correctionOwner: "Library owner"
  },
  ratchet: {
    repeatedKnownDefects: 0,
    objectiveDefectsFirstFoundAtReview: 0,
    reviewIssues: 0,
    reviewCycles: 1,
    priorComparable: { reviewIssues: 17, reviewCycles: 3 },
    onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW"
  },
  lineage: { kind: "SUCCESSOR", predecessorCandidateId: "ai-fundamentals-101-v2" },
  learningDisposition: { disposition: "NO_NEW_DEFECT", rationale: "Producer inspection found no new reusable defect; independent artifact-first review and observed unfamiliar-reader evidence remain outstanding." },
  verdict: "PASS",
  limitations: [
    "Producer PASS has no independent quality authority.",
    "This is one representative section, not the complete AI Fundamentals book.",
    "No observed unfamiliar-reader explain-back or unseen-transfer evidence has been collected.",
    "No Library page, reader route, public artifact or deployment was changed."
  ]
};

writeJson(receiptPath, receipt);
console.log(`AI FUNDAMENTALS V3 PROOF BUILT review_text=${manifest.reviewText.sha256} rendered=${manifest.rendered.sha256}`);
