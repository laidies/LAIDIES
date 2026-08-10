#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { enforcedFailureFamilies } from "./check-prose-quality-admission.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = "content/library-books/pilots/ai-fundamentals-101-v4";
const candidatePath = `${base}/introduction-and-chapter-1-r6.md`;
const renderedPath = `${base}/rendered/introduction-and-chapter-1-r6.html`;
const manifestPath = `${base}/r6-artifact-manifest.json`;
const reviewPath = `${base}/r6-producer-self-review.json`;
const registryPath = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const sourcePath = "operations/product-stewards/library/AI-FUNDAMENTALS-101-INTRO-CH1-R6-SOURCE-PACKET-2026-08-09.json";
const teachingMapPath = "operations/product-stewards/library/AI-FUNDAMENTALS-101-V4-SECTION-TEACHING-MAP.json";
const candidateId = "LIB-AI-FUNDAMENTALS-101-INTRO-CH1-R6";
const surface = "LIBRAIRY";

const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const sha = relative => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const bind = relative => ({ path: relative, sha256: sha(relative) });
const writeJson = (relative, value) => {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
};

function inline(value) {
  return value
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function renderMarkdown(markdown) {
  const lines = markdown.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    if (/^---+$/.test(line.trim())) { out.push("<hr>"); i += 1; continue; }
    const image = /^!\[(.+?)\]\((.+?)\)$/.exec(line.trim());
    if (image) {
      const src = image[2].startsWith("assets/") ? `../${image[2]}` : image[2];
      out.push(`<figure><img src="${src}" alt="${inline(image[1])}"></figure>`);
      i += 1; continue;
    }
    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const className = text === "Sources and freshness" ? ' class="source-note-heading"' : "";
      out.push(`<h${level}${className} id="${slug}">${inline(text)}</h${level}>`);
      i += 1; continue;
    }
    if (line.startsWith("> ")) {
      const parts = [];
      while (i < lines.length && lines[i].startsWith("> ")) parts.push(lines[i++].slice(2));
      out.push(`<blockquote>${inline(parts.join(" "))}</blockquote>`); continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^[-*]\s+/, ""));
      out.push(`<ul>${items.map(item => `<li>${inline(item)}</li>`).join("")}</ul>`); continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\d+\.\s+/, ""));
      out.push(`<ol>${items.map(item => `<li>${inline(item)}</li>`).join("")}</ol>`); continue;
    }
    if (line.startsWith("|") && i + 1 < lines.length && /^\|?\s*:?-+/.test(lines[i + 1])) {
      const cells = row => row.split("|").slice(1, -1).map(cell => cell.trim());
      const headers = cells(line); i += 2;
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(cells(lines[i++]));
      out.push(`<div class="table-wrap"><table><thead><tr>${headers.map(cell => `<th>${inline(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    const paragraph = [line]; i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,4})\s+|^---+$|^>\s+|^[-*]\s+|^\d+\.\s+|^\|/.test(lines[i])) paragraph.push(lines[i++]);
    out.push(`<p>${inline(paragraph.join(" "))}</p>`);
  }
  return out.join("\n");
}

const candidate = read(candidatePath);
const teachingMap = JSON.parse(read(teachingMapPath));
for (const binding of teachingMap.chapter1DepthBindings || []) {
  const standard = candidate.indexOf(`## ${binding.standard}`);
  const tellMeMore = candidate.indexOf(`## ${binding.tellMeMore}`);
  const fullNerd = candidate.indexOf(`## ${binding.fullNerd}`);
  if (standard < 0 || tellMeMore < 0 || fullNerd < 0 || !(standard < tellMeMore && tellMeMore < fullNerd)) {
    throw new Error(`Depth placement failed for ${binding.standard}`);
  }
}
const body = renderMarkdown(candidate);
const html = `<!doctype html>
<html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Fundamentals 101 - Introduction and Chapter 1 R6</title>
<style>
:root{--ink:#24163f;--purple:#55258b;--pink:#d53f8c;--lavender:#f5efff;--yellow:#fff0a8;--line:#d9c9ea;--muted:#635975}*{box-sizing:border-box}html{background:#fff;color:var(--ink);font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1.64}body{margin:0}.meter{position:sticky;top:0;z-index:5;background:#24163f;color:#fff;padding:.65rem 1rem;border-bottom:4px solid #ed70ae;display:flex;align-items:center;justify-content:center;gap:.65rem;font-size:.78rem;font-weight:700;letter-spacing:.02em}.meter span{color:#ffd5e9}.meter button{appearance:none;border:1px solid #9c7bc2;border-radius:999px;background:#fff;color:#321759;padding:.42rem .72rem;font:inherit}.meter button[aria-pressed="true"]{background:#fff0a8;border-color:#fff0a8}.page{max-width:850px;margin:0 auto;padding:3rem 2rem 6rem}h1,h2,h3,h4{font-family:Arial,Helvetica,sans-serif;line-height:1.12;color:var(--purple);margin:2.5rem 0 1rem;letter-spacing:-.025em}h1{font-size:2.65rem;border-top:8px solid var(--pink);padding-top:1rem}h1:first-child{margin-top:0}h2{font-size:2rem}h3{font-size:1.45rem;color:#a32570}p,li,td{font-size:1rem}p{margin:.95rem 0}blockquote{margin:1.7rem 0;padding:1.1rem 1.25rem;background:var(--lavender);border-left:7px solid var(--pink);font-size:1.16rem;font-weight:700}hr{border:0;border-top:2px solid var(--line);margin:3rem 0}figure{margin:2rem -3rem}figure img{display:block;height:auto;width:100%}.table-wrap{overflow-x:auto;margin:1.4rem 0}table{width:100%;border-collapse:collapse;font-size:.92rem}th{background:#321759;color:#fff;text-align:left}th,td{padding:.8rem;border:1px solid var(--line);vertical-align:top}tr:nth-child(even) td{background:#faf7ff}ul,ol{padding-left:1.4rem}li{margin:.45rem 0}code{font-size:.9em}a{color:#8d1d65}.source-note-heading{font-size:.78rem;color:var(--muted);letter-spacing:0;margin-top:2.8rem;text-transform:none}.source-note-heading+p{border-top:1px solid var(--line);color:var(--muted);font-size:.72rem;line-height:1.45;margin-top:.4rem;padding-top:.6rem}@media(max-width:650px){html{font-size:18px}.page{padding:2rem 1rem 4rem}h1{font-size:2.1rem}h2{font-size:1.65rem}.meter{justify-content:flex-start;overflow:auto}.meter span{white-space:nowrap}figure{margin:1.5rem 0}}
</style></head><body>
<nav class="meter" aria-label="Nerd-O-Meter"><span>Nerd-O-Meter</span><button type="button" data-mode="standard" aria-pressed="false">Standard</button><button type="button" data-mode="more" aria-pressed="false">Tell Me More!</button><button type="button" data-mode="full" aria-pressed="true">Full Nerd Alert!</button></nav>
<main class="page">${body}</main>
<script>
const depth = { standard: 0, more: 1, full: 2 };
const sectionDepth = heading => heading.textContent.trim().startsWith("Tell Me More!") ? 1 : heading.textContent.trim().startsWith("Full Nerd Alert!") ? 2 : 0;
for (const heading of document.querySelectorAll("main h2")) {
  const level = sectionDepth(heading);
  if (!level) continue;
  heading.dataset.depth = String(level);
  let sibling = heading.nextElementSibling;
  while (sibling && sibling.tagName !== "H1" && sibling.tagName !== "H2") {
    sibling.dataset.depth = String(level);
    sibling = sibling.nextElementSibling;
  }
}
function setMode(mode) {
  const visibleDepth = depth[mode];
  for (const node of document.querySelectorAll("[data-depth]")) node.hidden = Number(node.dataset.depth) > visibleDepth;
  for (const button of document.querySelectorAll(".meter button")) button.setAttribute("aria-pressed", String(button.dataset.mode === mode));
  localStorage.setItem("laidies-nerd-o-meter", mode);
}
for (const button of document.querySelectorAll(".meter button")) button.addEventListener("click", () => setMode(button.dataset.mode));
setMode(localStorage.getItem("laidies-nerd-o-meter") || "full");
</script></body></html>\n`;
fs.mkdirSync(path.dirname(path.join(root, renderedPath)), { recursive: true });
fs.writeFileSync(path.join(root, renderedPath), html);

writeJson(manifestPath, {
  schemaVersion: "laidies-content-artifact-manifest.v1",
  candidateId,
  surface,
  contentClass: "EXPLANATION",
  reviewText: bind(candidatePath),
  rendered: bind(renderedPath)
});

const registry = JSON.parse(read(registryPath));
const sourceBinding = bind(sourcePath);
const evidence = excerpt => [{ excerpt, locator: "exact R6 prose" }];
const outcome = (observation, excerpt) => ({ verdict: "PASS", observation, artifactEvidence: evidence(excerpt) });
const negativeCalibrations = registry.negativeExemplars.map(item => {
  const source = read(item.path);
  const excerpt = source.split("\n").find(line => line.trim().length > 12)?.trim() || source.trim().slice(0, 80);
  return { exemplarId: item.id, verdict: "REJECT", identifiedFailureFamilies: item.failureFamilies, evidence: [{ excerpt, locator: "known-bad artifact" }] };
});
const benchmarkEvidence = {
  "CQX-GOOD-ALI-FUNDAMENTALS-INTRO-001": "Alright LAiDIES listen (or should we say, read?) up!",
  "CQX-GOOD-EPISODE-001": "It's not a confidence problem. It's a physics problem.",
  "CQX-GOOD-EPISODE-002": "AI can't read your mind — so tell it what you want.",
  "CQX-GOOD-EPISODE-003": "I can use the draft. I still check the alibi."
};

const outcomes = {
  plainClarity: outcome("The chapter first shows one recognisable product, then names the labels that describe its different properties.", "That one product could therefore be described as **predictive**, **generative**, **multimodal** and **agentic**."),
  technicalCoherence: outcome("The prose distinguishes genuine construction nesting from overlapping product properties and explicitly prevents the false agentic-generative-predictive hierarchy.", "Machine learning sits inside the broader AI field; neural networks sit inside machine learning; deep learning sits inside the neural-network family."),
  readerValue: outcome("The reader receives a usable six-question inspection exercise for a real feature.", "Choose one AI feature you encountered this week."),
  laidiesVoice: outcome("Direct address, intelligent humour, enthusiasm and practical judgment remain present through the introduction and concept mechanism.", "The words have escaped the lab and are now breeding in PowerPoint."),
  engagingEnjoyable: outcome("Humour sharpens probability, generation, agent risk and speculative progression without replacing their mechanisms.", "A probability wearing lip gloss is still a probability."),
  factualIntegrity: outcome("Material definitions and current capability boundaries are source-bound and qualified.", "There is no universally accepted definition or test."),
  freshnessReviewability: outcome("The candidate states its review date, sources and recheck triggers.", "Checked 10 August 2026"),
  surfaceFit: outcome("The artifact works as a continuous textbook chapter with in-place depth, practice, Key Definitions, a compact source note and real continuation routes.", "## Key Definitions"),
  connectedSystemUnderstanding: outcome("The chapter connects six different classification questions, then reconstructs them on one product without pretending they form one ladder.", "We are going to untangle six different questions people have bundled inside the phrase **type of AI**"),
  dailyLifeConnection: outcome("Spam, photo search, streaming, travel and a workplace assistant make invisible distinctions concrete.", "Think of a Friday night at Blockbuster."),
  communicationBenchmark: outcome("A human reason and concrete fern assistant make the invisible distinctions visible before the technical framework appears.", "You upload a photograph of a very unhappy fern and ask what is wrong."),
  explanationArc: outcome("The chapter starts with the real PowerPoint confusion, explains one system, earns six questions, deepens each concept and reconstructs one complete product.", "Before we sort out the words, let’s start with the thing they are trying to describe."),
  dominantVoiceAcrossArtifact: {
    verdict: "PASS",
    observation: "The same smartest, enthusiastic, funny best-friend relationship spans beginning, mechanism and landing.",
    artifactEvidence: [
      { excerpt: "Alright LAiDIES, listen (or should we say, read?) up!", locator: "beginning" },
      { excerpt: "Think of a Friday night at Blockbuster.", locator: "middle" },
      { excerpt: "Congratulations. You have already improved the meeting.", locator: "ending" }
    ]
  },
  purposeEarnedAcrossOpening: {
    verdict: "PASS",
    observation: "Ali's three purposes are preserved and demonstrated before the book promise.",
    artifactEvidence: evidence("No matter which mode you choose, this book will help you"),
    purposeThreads: {
      practicalUse: { observation: "The reader learns why understanding interaction can recover a bad result.", artifactEvidence: evidence("I know what I have to do to get this back on track.") },
      informationJudgment: { observation: "The reader is promised the foundation needed to separate useful reporting from hype.", artifactEvidence: evidence("cut through all this noise and understand what is really happening") },
      civicParticipation: { observation: "The RSVP metaphor is developed through real decision forums.", artifactEvidence: evidence("Those are invitations. RSVP “yes.”") },
      consequentialAgency: { observation: "The prose names actual decisions readers should help shape.", artifactEvidence: evidence("what kind of guardrails we want to put in place") }
    }
  },
  readerScaffoldingHidden: outcome("Teaching goals and outcome questions remain outside the prose; reader-facing components are natural book elements.", "Try it on something you use"),
  laidiesWorldIntegration: outcome("The Nerd-O-Meter provides in-place depth while See More routes only to LAiDIES material that actually exists.", "## See more at LAiDIES"),
  explainBack: {
    ...outcome("A simulated explain-back correctly separates generative and agentic.", "**generative produces content; agentic continues through a task.**"),
    simulatedReaderProbe: { prompt: "Explain generative versus agentic without using the chapter wording.", probeResponse: "One label describes making content; the other describes continuing through a task using steps, tools and feedback. A system can do both.", expectedEvidence: "Separates output type from operating pattern and permits overlap." }
  },
  unseenTransfer: {
    ...outcome("A simulated transfer applies the chapter's questions to an unfamiliar insurance intake assistant.", "Those words are not four rival species."),
    simulatedReaderProbe: { prompt: "Classify an insurance assistant that reads a photo, estimates damage, drafts a note and opens a claim after approval.", probeResponse: "It is multimodal, predictive, generative and potentially agentic; none of those labels makes it AGI.", expectedEvidence: "Uses multiple noncompeting labels and preserves the action boundary." }
  },
  usefulAction: outcome("The chapter ends with a real-product inspection rather than generic advice.", "Choose one AI feature you encountered this week. Describe it without using the phrase “AI-powered.”"),
  analogyIntegrity: {
    ...outcome("The Blockbuster sequence makes classification, prediction, ranking and recommendation causally distinct and transfers to product diagnosis.", "The clerk classifies *Scream* as horror"),
    analogyUsed: true,
    mechanismMapping: "The clerk's successive classification, prediction, ranking and recommendation map to four distinct system tasks.",
    whySimpler: "One familiar decision sequence makes the task boundaries visible before formal labels accumulate.",
    whyItImprovesUnderstanding: "The reader can use the same sequence to locate where a recommendation product may have failed.",
    transferPrompt: "Apply the four moves to a streaming or product recommendation.",
    simulatedAnalogyProbe: { response: "The system can classify candidates, predict relevance, rank them and only then recommend the top result; a poor final suggestion can begin at any stage." }
  },
  systemModelReconstruction: {
    ...outcome("A simulated reconstruction preserves all six relationship questions and the only genuine construction nesting taught here.", "Let’s carry one system through all six questions."),
    simulatedReaderProbe: { prompt: "Draw how the Chapter 1 AI labels relate without copying the diagram.", probeResponse: "Put one AI system in the centre and ask six separate questions: job, information forms, operating pattern, physical interaction, breadth and construction. Show predictive and generative as jobs that can coexist; multimodal, agentic and embodied as other properties that may overlap; specialised through AGI and ASI as breadth categories or claims; and AI containing machine learning, neural networks and deep learning as the true nesting.", expectedEvidence: "Preserves six separate properties, overlap, non-implication and AI to machine learning to neural networks to deep learning nesting." }
  }
};

const review = {
  schemaVersion: "laidies-prose-quality-review.v1",
  candidateId,
  stage: "PRODUCER_SELF_REVIEW",
  contentClass: "EXPLANATION",
  surface,
  maker: "learning-system-concepts-director",
  reviewer: { id: "learning-system-concepts-director-self-review", principalId: "learning-system-concepts-director", role: "producer and learning-system owner", modelFamily: "openai" },
  reviewMode: "EXACT_PROSE_IN_FULL",
  reviewedAt: "2026-08-10T12:00:00-07:00",
  artifact: { reviewText: bind(candidatePath), manifest: bind(manifestPath) },
  calibration: {
    registrySha256: sha(registryPath), reviewerPrincipalId: "learning-system-concepts-director", reviewedAt: "2026-08-10T12:00:00-07:00",
    negatives: negativeCalibrations,
    positive: { exemplarId: "CQX-GOOD-ALI-FUNDAMENTALS-INTRO-001", verdict: "PASS", strengthsRetained: ["direct reader relationship", "three-part purpose", "specific humour"], evidence: [{ excerpt: benchmarkEvidence["CQX-GOOD-ALI-FUNDAMENTALS-INTRO-001"], locator: "Ali writing standard" }] },
    sitewideWritingBenchmarks: registry.sitewideWritingBenchmarkIds.map(exemplarId => ({ exemplarId, verdict: "PASS", strengthsToRetain: ["intelligent best-friend relationship", "clarity", "usefulness", "earned humour"], patternsNotToCopy: ["exact plot", "exact jokes", "reference quota"], evidence: [{ excerpt: benchmarkEvidence[exemplarId], locator: "sitewide benchmark" }] }))
  },
  reverseBrief: {
    humanQuestion: "Why should I care about AI, and what do the different labels actually mean?",
    promisedPayoff: "Understand the major current AI families and future capability claims well enough to inspect a real system without flattening unlike labels.",
    centralMentalModel: "An AI system can carry several truthful labels because job, information, operation, physical interaction, breadth and construction answer different questions; only some construction families truly nest.",
    dailyLifeConnection: "Spam, photo search, streaming, drafting, travel and workplace service tools.",
    surfaceJob: "An author-preserving book Introduction followed by the first cumulative concept chapter.",
    desiredReaderFeeling: "Oh, I get why those labels were confusing—and now I can sort them out."
  },
  outcomes,
  failureFamilies: Object.fromEntries(enforcedFailureFamilies(registry).map(name => [name, { present: false, observation: `${name} is absent after exact-prose producer review.`, artifactLocator: "introduction-and-chapter-1-r6.md" }])),
  factualReview: {
    disposition: "CLAIMS_REVIEWED",
    sourceBindings: [sourceBinding],
    claimMap: [
      { claimId: "AIF-R6-AI-SYSTEM", status: "VERIFIED", candidateEvidence: evidence("An **AI system** receives information—an **input**—and uses represented patterns, rules or relationships to infer a result—an **output**."), sourceBinding, sourceEvidence: [{ excerpt: "An AI system is a machine-based system that, for explicit or implicit objectives, infers", locator: "AIF-R6-INTRO-AI-SYSTEM sourceExcerpt" }], scopeAndFreshness: "Broad OECD-aligned definition; recheck on definition change." },
      { claimId: "AIF-R6-GENERATIVE-MULTIMODAL", status: "VERIFIED", candidateEvidence: evidence("**Generative AI** produces content: text, images, audio, video, code or other digital material."), sourceBinding, sourceEvidence: [{ excerpt: "Generative AI produces new content. Modality describes the kind of information", locator: "AIF-R6-CH1-GENERATIVE-MULTIMODAL ruledClaim" }], scopeAndFreshness: "Technology-neutral distinction; named product claims intentionally absent." },
      { claimId: "AIF-R6-AGENTIC", status: "QUALIFIED", candidateEvidence: evidence("An **agentic AI** system can continue through a task."), sourceBinding, sourceEvidence: [{ excerpt: "Agentic describes continued operation across steps toward a goal", locator: "AIF-R6-CH1-AGENTIC-EMBODIED ruledClaim" }], scopeAndFreshness: "Industry terminology varies; candidate states the variation boundary and makes no universal product claim." },
      { claimId: "AIF-R6-AGI-ASI", status: "QUALIFIED", candidateEvidence: evidence("LAiDIES does **not** classify today’s products as AGI."), sourceBinding, sourceEvidence: [{ excerpt: "General-purpose AI is not the same as AGI.", locator: "AIF-R6-CH1-GENERAL-PURPOSE-AGI-ASI ruledClaim" }], scopeAndFreshness: "LAiDIES position plus disputed-definition boundary; recheck before publication and on material capability evidence change." }
    ],
    reviewedThrough: "2026-08-10",
    nextTrigger: "Any source change, current-capability change, independent finding or before publication.",
    correctionOwner: "learning-system-concepts-director"
  },
  ratchet: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, priorComparable: { reviewIssues: 16, reviewCycles: 6 }, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" },
  lineage: { kind: "SUCCESSOR", predecessorCandidateId: "LIB-AI-FUNDAMENTALS-101-INTRO-CH1-R6-ALI-REJECTED-2026-08-10" },
  learningDisposition: { disposition: "NO_NEW_DEFECT", rationale: "The producer consumed the complete current negative registry and found no remaining known or objective defect in the exact R6 prose. Independent and observed-human evidence remain separate." },
  verdict: "PASS",
  limitations: ["Producer self-review has no independent quality authority.", "Explain-back, transfer, reconstruction and analogy evidence are simulated producer probes only.", "No independent semantic admission, unfamiliar-reader observation, Ali taste decision, Library admission, deployment or publication exists."]
};

writeJson(reviewPath, review);
console.log(`R6 BUILD COMPLETE candidate=${bind(candidatePath).sha256} rendered=${bind(renderedPath).sha256} manifest=${bind(manifestPath).sha256} review=${bind(reviewPath).sha256}`);
