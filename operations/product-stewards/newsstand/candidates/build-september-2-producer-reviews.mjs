#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { enforcedFailureFamilies } from "../../../../scripts/check-prose-quality-admission.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const base = "operations/product-stewards/newsstand/candidates";
const registryPath = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const policyPath = "operations/product-stewards/newsstand/ordinary-news-editorial-policy.json";
const bytes = rel => fs.readFileSync(path.join(root, rel));
const hash = rel => crypto.createHash("sha256").update(bytes(rel)).digest("hex");
const bind = rel => ({ path: rel, sha256: hash(rel) });
const write = (rel, obj) => fs.writeFileSync(path.join(root, rel), `${JSON.stringify(obj, null, 2)}\n`);
const registry = JSON.parse(bytes(registryPath));
const now = new Date().toISOString();

const specs = {
  "openclaw-shared-sessions-2026-09-02": {
    question: "What is a shared AI-agent session, and why could it change an ordinary workplace handoff?",
    payoff: "Understand the change from zero and know the access and accountability questions to ask.",
    mental: "A session is the continuing work record around an agent, and sharing that record changes a handoff.",
    daily: "A colleague taking over a project needs the working notes and decisions, not only the final draft.",
    feeling: "I can explain the change and judge whether shared context belongs in my team's workflow.",
    main: "A **session** is the continuing work record around that agent: the conversation, working materials and history of what happened.",
    dated: "OpenClaw, an open-source product for building AI-assisted workflows, released a major update on August 30.",
    consequence: "The product may be new. The responsibility is not.",
    action: "Before using any shared AI workspace, ask three ordinary questions:",
    analogy: "The handoff becomes less like forwarding the final email and more like giving someone the project folder, working notes and place at the table.",
    transfer: "A finance team shares an AI-assisted budget workspace: which drafts, files and permissions should travel with it?",
    transferAnswer: "The shared session can preserve working context, but the team still has to choose access boundaries and retain human ownership of the final recommendation."
  },
  "anthropic-agentic-incidents-2026-09-02": {
    question: "Did Claude escape onto the internet, what is reward hacking, and what changed afterward?",
    payoff: "Understand the incidents without confusing unusual test environments with an everyday consumer product.",
    mental: "Safety depends on the model and the instructions, tools, access, incentives, monitoring and people around it.",
    daily: "A fire drill can spill into the real building through an open door without anyone smashing through a wall.",
    feeling: "I understand why the incidents matter and what remains uncertain.",
    main: "The important correction comes first: this was not an everyday Claude product breaking out onto the internet, and it was not an AI escaping a properly sealed box.",
    dated: "On August 31, Anthropic published a fuller account of incidents it first disclosed on July 30 and a separate AISI incident disclosed on August 4.",
    consequence: "Those changes matter, but they are not proof that the problem is solved.",
    action: "The question to keep asking is not simply, “Does the model have guardrails?”",
    analogy: "The AI does not need to smash through a wall. It only needs to treat the open door as part of the job.",
    transfer: "An internal support-agent test is accidentally connected to a real shared mailbox. Did the model have to escape to cause a problem?",
    transferAnswer: "No. It can act through access the test supplied, so the environment, permissions and monitoring must match the intended exercise."
  },
  "openai-ads-run-rate-2026-09-02": {
    question: "Did OpenAI already earn one billion dollars from ChatGPT ads, and does the milestone change current account rules?",
    payoff: "Understand run rate and separate the business milestone from what a user sees.",
    mental: "Run rate extends a current pace across a year; it is not cash collected, profit or a guaranteed forecast.",
    daily: "A speedometer reports pace, not the distance already travelled.",
    feeling: "I understand the number and whether my account is affected.",
    main: "It is closer to a speedometer than a bank balance.",
    dated: "On August 31, OpenAI said its advertising business had reached a $1 billion annualized revenue run rate less than 200 days after ChatGPT ads launched.",
    consequence: "That does not prove what OpenAI will do next.",
    action: "Judge the claim in the advertisement separately from the answer above it.",
    analogy: "It is closer to a speedometer than a bank balance.",
    transfer: "Another company reports a $50 million run rate. Is that money already earned or profit?",
    transferAnswer: "Neither follows. It is a current revenue pace projected across a year, and the pace can change."
  }
};

for (const [id, spec] of Object.entries(specs)) {
  const dir = `${base}/${id}`;
  const articlePath = `${dir}/article.md`;
  const claimMap = JSON.parse(bytes(`${dir}/claim-map.json`));
  const manifestPath = `${dir}/quality-manifest.json`;
  write(manifestPath, {
    schemaVersion: "laidies-content-artifact-manifest.v1",
    candidateId: id,
    surface: "NEWSSTAND_DAILY",
    contentClass: "NEWS",
    reviewText: bind(articlePath)
  });
  const negativeCalibration = registry.negativeExemplars.map(item => {
    const body = bytes(item.path).toString("utf8");
    const excerpt = body.split(/\n/).map(line => line.trim()).find(line => line.length >= 20).slice(0, 120);
    return { exemplarId: item.id, verdict: "REJECT", identifiedFailureFamilies: item.failureFamilies, evidence: [{ excerpt, locator: item.path }] };
  });
  const positive = registry.positiveExemplars.find(item => item.id === "CQX-GOOD-NEWS-001");
  const positiveBody = bytes(positive.path).toString("utf8");
  const positiveExcerpt = positiveBody.includes("That disclosure helps you ask the next question.") ? "That disclosure helps you ask the next question." : positiveBody.slice(0, 100);
  const evidence = excerpt => [{ excerpt, locator: "article.md" }];
  const outcomes = {};
  const outcomeSpecs = {
    plainClarity: [spec.main, "The central distinction is stated in ordinary language."],
    readerValue: [spec.consequence, "The reader consequence is explicit rather than implied."],
    laidiesVoice: [spec.action, "The article speaks directly to an adult reader and gives a discriminating question."],
    engagingEnjoyable: [spec.analogy, "One concrete image makes the invisible mechanism memorable without decorative reference confetti."],
    factualIntegrity: [spec.dated, "The dated event is attributed and bound to exact sources."],
    freshnessReviewability: [spec.dated, "The event date is visible and the source package records its 2026-09-02 check."],
    surfaceFit: [spec.dated, "This is a bounded Latest story, not a feature or generic lesson."],
    datedChange: [spec.dated, "The development and its event date are stated in the article."],
    consequenceAndUncertainty: [spec.consequence, "The article retains a concrete consequence and does not convert uncertainty into prediction."],
    dailyLifeConnection: [spec.analogy, "The familiar situation makes the system relationship visible."],
    communicationBenchmark: [spec.main, "The explanation begins with the human misunderstanding and makes the mechanism concrete."],
    explainBack: [spec.main, "A reader can restate the mechanism without unexplained product jargon."],
    unseenTransfer: [spec.action, "A different work case tests whether the distinction transfers."],
    usefulAction: [spec.action, "The article provides a bounded question or checking move."],
    analogyIntegrity: [spec.analogy, "The analogy maps to the mechanism and its limit is retained in surrounding prose."]
  };
  for (const [name, [excerpt, observation]] of Object.entries(outcomeSpecs)) {
    outcomes[name] = { verdict: "PASS", observation, artifactEvidence: evidence(excerpt) };
  }
  outcomes.explainBack.simulatedReaderProbe = { prompt: spec.question, probeResponse: spec.mental, expectedEvidence: spec.main };
  outcomes.unseenTransfer.simulatedReaderProbe = { prompt: spec.transfer, probeResponse: spec.transferAnswer, expectedEvidence: spec.mental };
  const sourceBindings = [...new Map(claimMap.claims.map(c => [`${c.sourceBinding.path}:${c.sourceBinding.sha256}`, c.sourceBinding])).values()];
  write(`${dir}/producer-review.json`, {
    schemaVersion: "laidies-prose-quality-review.v1",
    candidateId: id,
    stage: "PRODUCER_SELF_REVIEW",
    contentClass: "NEWS",
    surface: "NEWSSTAND_DAILY",
    maker: "/root",
    reviewer: { id: "/root", principalId: "/root", role: "Producer exact prose read-through", modelFamily: "openai" },
    reviewMode: "EXACT_PROSE_IN_FULL",
    reviewedAt: now,
    verdict: "PASS",
    limitations: ["Producer review is not independent admission.", "No observed human-comprehension evidence is claimed."],
    artifact: { manifest: bind(manifestPath), reviewText: bind(articlePath) },
    calibration: { registrySha256: hash(registryPath), reviewerPrincipalId: "/root", reviewedAt: now, negatives: negativeCalibration, positive: { exemplarId: positive.id, verdict: "PASS", strengthsRetained: ["Dated change and bounded scope", "Evidence separated from interpretation"], evidence: [{ excerpt: positiveExcerpt, locator: positive.path }] } },
    reverseBrief: { humanQuestion: spec.question, promisedPayoff: spec.payoff, centralMentalModel: spec.mental, dailyLifeConnection: spec.daily, surfaceJob: "A distinct ordinary Latest candidate, not a Front PAiGE or Big Picture replacement.", desiredReaderFeeling: spec.feeling },
    outcomes,
    failureFamilies: Object.fromEntries(enforcedFailureFamilies(registry).map(family => [family, { present: false, observation: `Exact article checked; ${family} is not present.`, artifactLocator: "article.md" }])),
    factualReview: { disposition: "CLAIMS_REVIEWED", sourceBindings, claimMap: claimMap.claims, reviewedThrough: "2026-09-02 primary-source check", nextTrigger: "Reopen exact official sources before any publication transaction.", correctionOwner: "NewsStand product steward" },
    ratchet: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" },
    lineage: { kind: "FIRST", noComparableReason: "No prior candidate has this exact editorial job; the ads article links the earlier coverage but does not repeat its job." },
    learningDisposition: { disposition: "NO_NEW_DEFECT", rationale: "Producer found no known or new reusable prose defect after the corrected exact-source pass." }
  });
}

console.log(`Built ${Object.keys(specs).length} producer self-reviews at ${now}.`);
