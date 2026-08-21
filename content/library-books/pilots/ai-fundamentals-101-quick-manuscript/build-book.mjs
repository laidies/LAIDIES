#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderLibraryBookSource } from "../../../../scripts/render-library-book.mjs";
import { teachingVisuals, renderTeachingVisual, teachingVisualCss } from "./teaching-visuals.mjs";

const pilotDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(pilotDir, "../../../..");
const rel = filePath => path.relative(root, filePath).split(path.sep).join("/");
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const readBytes = filePath => fs.readFileSync(filePath);
const read = filePath => readBytes(filePath).toString("utf8").replaceAll("\r\n", "\n");

const paths = {
  front: path.join(pilotDir, "source/front-matter.md"),
  manuscript: path.join(pilotDir, "source/full-book.md"),
  playbook: path.join(pilotDir, "source/quick-production-playbook.md"),
  rewind: path.join(pilotDir, "rewind-amendments.json"),
  source: path.join(pilotDir, "book-source.json"),
  fragment: path.join(pilotDir, "rendered-review.html"),
  review: path.join(pilotDir, "review.html"),
  inventory: path.join(pilotDir, "claim-inventory.json"),
  manifest: path.join(pilotDir, "artifact-manifest.json"),
  chapterOnePurposeBuiltDesktop: path.join(pilotDir, "assets/ch01-automation-vs-ai-representative-desktop-v2.jpeg"),
  chapterOnePurposeBuiltMobile: path.join(pilotDir, "assets/ch01-automation-vs-ai-representative-mobile-v2.jpeg"),
  chapterOneProductCutawayDesktop: path.join(pilotDir, "assets/ch01-one-inbox-two-routes-desktop-v1.jpeg"),
  chapterOneProductCutawayMobile: path.join(pilotDir, "assets/ch01-one-inbox-two-routes-mobile-v1.jpeg"),
  chapterTwoJobsDesktop: path.join(pilotDir, "assets/ch02-four-ai-jobs-travel-service-desktop-v1.jpeg"),
  chapterTwoJobsMobile: path.join(pilotDir, "assets/ch02-four-ai-jobs-travel-service-mobile-v1.jpeg"),
  chapterTwoTimelineDesktop: path.join(pilotDir, "assets/ch02-ai-convergence-timeline-desktop-v1.jpeg"),
  chapterTwoTimelineMobile: path.join(pilotDir, "assets/ch02-ai-convergence-timeline-mobile-v1.jpeg"),
  chapterTwoAgentDesktop: path.join(pilotDir, "assets/ch02-agent-tool-boundary-loop-desktop-v1.jpeg"),
  chapterTwoAgentMobile: path.join(pilotDir, "assets/ch02-agent-tool-boundary-loop-mobile-v1.jpeg"),
  chapterTwoTradeoffsDesktop: path.join(pilotDir, "assets/ch02-model-tradeoffs-field-guide-desktop-v1.jpeg"),
  chapterTwoTradeoffsMobile: path.join(pilotDir, "assets/ch02-model-tradeoffs-field-guide-mobile-v1.jpeg"),
  chapterThreePurposeBuiltDesktop: path.join(pilotDir, "assets/ch03-data-choices-pipeline-desktop-v1.png"),
  chapterThreePurposeBuiltMobile: path.join(pilotDir, "assets/ch03-data-choices-pipeline-mobile-v1.png"),
  chapterFourPurposeBuiltDesktop: path.join(pilotDir, "assets/ch04-tokenisation-vocabulary-desktop-v1.png"),
  chapterFourPurposeBuiltMobile: path.join(pilotDir, "assets/ch04-tokenisation-vocabulary-mobile-v1.png"),
  chapterFivePurposeBuiltDesktop: path.join(pilotDir, "assets/ch05-training-loop-desktop-v1.png"),
  chapterFivePurposeBuiltMobile: path.join(pilotDir, "assets/ch05-training-loop-mobile-v1.png"),
  chapterSixPurposeBuiltDesktop: path.join(pilotDir, "assets/ch06-photo-to-context-desktop-v1.png"),
  chapterSixPurposeBuiltMobile: path.join(pilotDir, "assets/ch06-photo-to-context-mobile-v1.png"),
  chapterSevenPurposeBuiltDesktop: path.join(pilotDir, "assets/ch07-send-to-stream-desktop-v1.png"),
  chapterSevenPurposeBuiltMobile: path.join(pilotDir, "assets/ch07-send-to-stream-mobile-v1.png"),
  chapterEightPurposeBuiltDesktop: path.join(pilotDir, "assets/ch08-rag-context-desktop-v1.png"),
  chapterEightPurposeBuiltMobile: path.join(pilotDir, "assets/ch08-rag-context-mobile-v1.png"),
  chapterNineRequestDesktop: path.join(pilotDir, "assets/ch09-change-request-desktop-v2.png"),
  chapterNineRequestMobile: path.join(pilotDir, "assets/ch09-change-request-mobile-v2.png"),
  chapterNineTrainingDesktop: path.join(pilotDir, "assets/ch09-train-model-version-desktop-v2.png"),
  chapterNineTrainingMobile: path.join(pilotDir, "assets/ch09-train-model-version-mobile-v2.png"),
  chapterTenPurposeBuiltDesktop: path.join(pilotDir, "assets/ch10-product-around-model-desktop-v1.png"),
  chapterTenPurposeBuiltMobile: path.join(pilotDir, "assets/ch10-product-around-model-mobile-v1.png"),
  chapterElevenPurposeBuiltDesktop: path.join(pilotDir, "assets/ch11-safety-layers-desktop-v1.png"),
  chapterElevenPurposeBuiltMobile: path.join(pilotDir, "assets/ch11-safety-layers-mobile-v1.png"),
  chapterTwelvePurposeBuiltDesktop: path.join(pilotDir, "assets/ch12-evidence-to-release-desktop-v1.png"),
  chapterTwelvePurposeBuiltMobile: path.join(pilotDir, "assets/ch12-evidence-to-release-mobile-v1.png"),
  chapterThirteenPurposeBuiltDesktop: path.join(pilotDir, "assets/ch13-autonomy-consequence-desktop-v1.png"),
  chapterThirteenPurposeBuiltMobile: path.join(pilotDir, "assets/ch13-autonomy-consequence-mobile-v1.png"),
  chapterOneSpriteRules: path.join(pilotDir, "assets/ch01-sprite-rules-and-examples.jpg"),
  chapterOneSpriteProducts: path.join(pilotDir, "assets/ch01-sprite-generalization-products.jpg"),
  chapterOneWomanRulebook: path.join(pilotDir, "assets/ch01-source-woman-rulebook.jpg"),
  chapterSixBicycleTree: path.join(pilotDir, "assets/ch06-bicycle-tree-learning-image.png"),
};

const chapterOneTeachingAssets = [
  {
    id: "ch01-core-distinction",
    kind: "core-distinction",
    anchor: "That swap is the exact seam between the software you've used your whole life and the stuff now getting called AI.",
    afterTag: "</p>",
  },
  {
    id: "ch01-generalisation",
    kind: "generalisation",
    anchor: "No human wrote that rule. The machine figured it out from the <strong>training data</strong>. That's AI.",
    afterTag: "</p>",
  },
  {
    id: "ch01-one-product-both",
    kind: "one-product-both",
    anchor: "Both are working on your email simultaneously.",
    afterTag: "</p>",
  },
  {
    id: "ch01-ai-claim-check",
    kind: "ai-claim-check",
    countAsTeachingVisual: false,
    anchor: "Which part of this actually learned from data, and which part is just software following rules someone wrote?",
    afterTag: "</aside>",
  },
];

const chapterOneSprites = {
  rules: "assets/ch01-sprite-rules-and-examples.jpg",
  products: "assets/ch01-sprite-generalization-products.jpg",
  womanRulebook: "assets/ch01-source-woman-rulebook.jpg",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[“”"']/g, "")
    .replace(/[—–]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inline(value) {
  let text = escapeHtml(value);
  const tokens = [];
  const save = html => {
    const key = `\u0000${tokens.length}\u0000`;
    tokens.push(html);
    return key;
  };
  text = text.replace(/`([^`]+)`/g, (_, code) => save(`<code>${code}</code>`));
  text = text.replace(/\[([^\]]+)]\((https?:\/\/[^)]+|mailto:[^)]+|#[a-z0-9-]+)\)/gi,
    (_, label, href) => save(`<a href="${escapeAttribute(href)}">${label}</a>`));
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>");
  text = text.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  text = text.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
  return text;
}

function isTableDivider(line) {
  const cells = line.trim().replace(/^\||\|$/g, "").split("|").map(cell => cell.trim());
  return cells.length > 1 && cells.every(cell => /^:?-{3,}:?$/.test(cell));
}

function renderTable(lines) {
  const rows = lines.map(line => line.trim().replace(/^\||\|$/g, "").split("|").map(cell => cell.trim()));
  const header = rows[0];
  const body = rows.slice(2);
  return `<div class="table-scroll"><table><thead><tr>${header.map(cell => `<th scope="col">${inline(cell)}</th>`).join("")}</tr></thead><tbody>${body.map(row => `<tr>${header.map((_, index) => `<td>${inline(row[index] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function calloutClass(text) {
  if (/📌|core distinction|key concept|the pattern/i.test(text)) return "callout-key";
  if (/⏸️|wait|natural question|make this concrete/i.test(text)) return "callout-question";
  if (/💡|insight|quick test/i.test(text)) return "callout-insight";
  if (/🏆|landmark moment/i.test(text)) return "callout-landmark";
  if (/📰|big picture/i.test(text)) return "callout-big-picture";
  if (/🔍|concept in practice|sidebar/i.test(text)) return "callout-practice";
  if (/by the end of this chapter/i.test(text)) return "callout-objective";
  return "callout-note";
}

function renderKeyTermsReference(text, idPrefix) {
  const body = text.replace(/^📖\s+\*\*Key Terms — Quick Reference\*\*\s*/, "");
  const entries = [...body.matchAll(/\*\*([^*]+)\*\*\s+—\s+([\s\S]*?)(?=\s+\*\*[^*]+\*\*\s+—\s+|$)/g)];
  if (!entries.length) throw new Error(`Key Terms reference has no parseable entries in ${idPrefix}`);
  return `<aside class="key-terms-reference" aria-labelledby="${idPrefix}-key-terms"><h3 id="${idPrefix}-key-terms">📖 Key Terms — Quick Reference</h3><dl class="key-terms-grid">${entries.map(([, term, definition]) => `<div class="key-term-card"><dt>${inline(term)}</dt><dd>${inline(definition.trim())}</dd></div>`).join("")}</dl></aside>`;
}

function renderMarkdown(markdown, idPrefix) {
  const lines = markdown.trim().split("\n");
  const out = [];
  let paragraph = [];
  let list = null;
  const usedIds = new Map();

  const uniqueId = title => {
    const base = `${idPrefix}-${slug(title)}`;
    const count = usedIds.get(base) || 0;
    usedIds.set(base, count + 1);
    return count ? `${base}-${count + 1}` : base;
  };
  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    out.push(`<${list.type}>${list.items.map(item => `<li>${inline(item)}</li>`).join("")}</${list.type}>`);
    list = null;
  };
  const flush = () => { flushParagraph(); flushList(); };

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    const line = raw.trimEnd();
    if (/^<!--/.test(line)) {
      flush();
      while (index < lines.length && !/-->/.test(lines[index])) index += 1;
      continue;
    }
    if (/^```/.test(line)) {
      flush();
      const language = line.slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index])) code.push(lines[index++]);
      const cleanCode = code.join("\n").replace(/[ \t]+$/gm, "");
      const renderedCode = `<pre><code${language ? ` class="language-${escapeAttribute(language)}"` : ""}>${escapeHtml(cleanCode)}</code></pre>`;
      out.push(cleanCode.split("\n").length > 3 && /[┌└│→]/.test(cleanCode)
        ? `<details class="map-text-equivalent"><summary>Open the text version of this diagram</summary>${renderedCode}</details>`
        : renderedCode);
      continue;
    }
    if (!line.trim() || /^---+$/.test(line.trim())) { flush(); continue; }

    if (line.startsWith("|") && lines[index + 1]?.startsWith("|") && isTableDivider(lines[index + 1])) {
      flush();
      const tableLines = [line, lines[++index]];
      while (index + 1 < lines.length && lines[index + 1].startsWith("|")) tableLines.push(lines[++index]);
      out.push(renderTable(tableLines));
      continue;
    }

    if (/^>/.test(line)) {
      flush();
      const quoteLines = [];
      while (index < lines.length && (/^>/.test(lines[index]) || !lines[index].trim())) {
        if (lines[index].trim()) quoteLines.push(lines[index].replace(/^>\s?/, ""));
        else quoteLines.push("");
        index += 1;
      }
      index -= 1;
      const quoteText = quoteLines.join("\n");
      if (/^📖\s+\*\*Key Terms — Quick Reference\*\*/.test(quoteText)) {
        out.push(renderKeyTermsReference(quoteText, idPrefix));
        continue;
      }
      const displayQuoteText = quoteText.replace(/^🔍\s+\*\*Sidebar:/i, "🔍 **Concept in Practice:");
      out.push(`<aside class="callout ${calloutClass(displayQuoteText)}">${renderMarkdown(displayQuoteText, `${idPrefix}-callout`)}</aside>`);
      continue;
    }

    if (/^\*\*Answers:?\*\*$/.test(line.trim())) {
      flush();
      const answerLines = [];
      index += 1;
      while (index < lines.length && !/^---+$/.test(lines[index].trim())) answerLines.push(lines[index++]);
      out.push(`<details class="answer-reveal"><summary>Show answers</summary><div class="answer-body">${renderMarkdown(answerLines.join("\n"), `${idPrefix}-answers`)}</div></details>`);
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flush();
      const level = Math.min(4, heading[1].length + 1);
      const title = heading[2];
      out.push(`<h${level} id="${uniqueId(title)}">${inline(title)}</h${level}>`);
      continue;
    }

    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (ordered || unordered) {
      flushParagraph();
      const type = ordered ? "ol" : "ul";
      if (list && list.type !== type) flushList();
      list ||= { type, items: [] };
      list.items.push((ordered || unordered)[1]);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }
  flush();
  return out.join("\n");
}

function parseFrontMatter(markdown) {
  const body = markdown.replace(/^#\s+AI Fundamentals 101\s*/i, "").trim();
  return {
    id: "how-this-book-works",
    title: "How This Book Works",
    navLabel: "Start here",
    bodyHtml: renderMarkdown(body.replace(/^##\s+How This Book Works\s*/i, ""), "front"),
  };
}

function parseChapters(markdown) {
  const matches = [...markdown.matchAll(/^#\s+Chapter\s+(\d+):\s+(.+)$/gm)];
  if (matches.length !== 20) throw new Error(`expected 20 chapters; found ${matches.length}`);
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    const number = Number(match[1]);
    const title = match[2].trim();
    return {
      id: `chapter-${number}`,
      title: `Chapter ${number}: ${title}`,
      navLabel: `${number}. ${title}`,
      bodyHtml: renderMarkdown(markdown.slice(start, end), `ch-${number}`),
    };
  });
}

const partMap = [
  [1, 2, "Part I · What Is This Thing?"],
  [3, 5, "Part II · How a Machine Learns"],
  [6, 9, "Part III · Using the Thing"],
  [10, 13, "Part IV · The System Around the Model"],
  [14, 14, "Part V · Agents"],
  [15, 15, "Part VI · The Engineering Disciplines"],
  [16, 17, "Part VII · The Physical Machine"],
  [18, 19, "Part VIII · The Ecosystem"],
  [20, 20, "Part IX · The Big Questions"],
];

function chapterPart(number) {
  return partMap.find(([start, end]) => number >= start && number <= end)?.[2] || "";
}

const chapterConcepts = [
  { title: "Two different ways software can make a decision", question: "Is the behaviour written directly, or learned from examples?", kind: "compare", lanes: [
    { label: "Fixed-rule software", steps: ["A person writes the rule", "The software follows that rule", "The programmed result appears"] },
    { label: "AI system", steps: ["People provide examples", "Training finds useful patterns", "The model makes a best-fit result"] },
  ], takeaway: "AI is not a synonym for all software. The important boundary is how the behaviour was produced." },
  { title: "AI is a family of capabilities", question: "What job is the system actually doing?", kind: "branches", hub: "One AI system", steps: ["Recognise", "Predict", "Generate", "Recommend", "Act"], takeaway: "The label AI tells you very little until you name the capability and the job." },
  { title: "How real-world material becomes training data", question: "What had to happen before a model could learn from it?", steps: ["Real-world material", "Collect and select", "Clean and label", "Training dataset"], takeaway: "A dataset is a designed selection, not a neutral copy of the world. What is included, excluded and labelled matters." },
  { title: "How a model receives words, pictures and sound", question: "How does human material become something a model can calculate with?", steps: ["Text, image or audio", "Tokeniser divides it", "Tokens receive numeric IDs", "The model processes numbers"], takeaway: "Tokens are processable pieces. They are not necessarily whole words, and they are not the model's private thoughts." },
  { title: "Training changes the model; using it does not", question: "Which stage is learning, and which stage is answering?", kind: "compare", lanes: [
    { label: "Training", steps: ["Examples", "Predict and compare", "Adjust weights many times", "Freeze the learned model"] },
    { label: "Inference", steps: ["A new request", "Run the frozen model", "Calculate a response"] },
  ], takeaway: "Training builds the model. Inference uses the finished model on a new request." },
  { title: "One system can work across different media", question: "What can go in, and what can come out?", kind: "branches", hub: "Model or AI product", steps: ["Text", "Images", "Audio", "Video", "Actions"], takeaway: "A modality is a type of information. A multimodal system can work with more than one type." },
  { title: "What happens when you press Send", question: "What does the model do with a new request?", steps: ["Your request + available context", "Frozen model weights", "Calculate likely next pieces", "Return an output"], takeaway: "The model is calculating from patterns and current context; it is not searching a complete memory of truth." },
  { title: "What the model can see for this request", question: "Where does the information in an answer come from?", steps: ["Instructions + your request", "Conversation + retrieved material", "Finite context window", "Model response"], takeaway: "Context is the working material available now. Retrieval can add relevant sources without retraining the model." },
  { title: "Four different ways to tailor an AI system", question: "What exactly are you changing?", kind: "branches", hub: "Base model", steps: ["Prompt it", "Retrieve documents", "Fine-tune behaviour", "Distil or adapt"], takeaway: "These methods solve different problems. Giving better context is not the same as changing the model's learned weights." },
  { title: "The model is only one part of the product", question: "What sits between a person and the model?", steps: ["Person and interface", "Product rules and routing", "Model + tools + data", "Answer, action or failure state"], takeaway: "When an AI product succeeds or fails, the cause may be the interface, context, tool, data or policy—not only the model." },
  { title: "Safety works in layers", question: "Where can a system prevent or reduce harm?", steps: ["Input rules", "Model behaviour", "Output checks", "Human policy + monitoring"], takeaway: "No single filter makes a system safe. Useful controls operate before, during and after the model runs." },
  { title: "Evaluation starts with the real job", question: "How do we know whether a system is good enough?", steps: ["Define the task", "Use representative test cases", "Measure errors and usefulness", "Ship, limit or repair"], takeaway: "A benchmark score is not enough. Evaluation must match the people, conditions and consequences of the real use." },
  { title: "A sandbox limits what an AI action can reach", question: "What happens between a proposed action and the real world?", steps: ["AI proposes an action", "Permission check", "Contained sandbox or approved tool", "Log, approve, block or execute"], takeaway: "A sandbox is a controlled workspace. It reduces the blast radius; it does not make every action correct or harmless." },
  { title: "An agent is a repeated decision-and-action loop", question: "How does an AI system carry out a multi-step goal?", steps: ["Goal", "Choose next step", "Use a tool", "Observe the result", "Continue, revise or stop"], loop: true, takeaway: "The loop and its stopping rules matter as much as the model. An agent needs permissions, limits and a clear way to stop." },
  { title: "System craft connects the pieces", question: "What does the builder design around the model?", steps: ["Define the job", "Choose prompt + context", "Choose loop or graph", "Observe failures", "Improve the system"], loop: true, takeaway: "Reliable AI work comes from the whole system: clear jobs, useful context, sensible routes, tests and feedback." },
  { title: "Compute turns electricity into model calculations", question: "What physical work happens underneath an AI answer?", steps: ["Electric power", "Chips perform parallel maths", "Memory moves model data", "Calculations produce the next result"], takeaway: "AI runs on physical processors, memory, electricity and cooling. It is not an invisible cloud with no material cost." },
  { title: "A data centre is the physical home of cloud AI", question: "What happens after a request leaves your device?", steps: ["Internet request", "Servers + accelerators", "Memory, networking + storage", "Power + cooling", "Response returns"], takeaway: "Cloud AI is remote physical infrastructure. Speed, cost, outages and environmental impact depend on this stack." },
  { title: "The hardware supply chain reaches far beyond one chip", question: "What has to exist before an AI server can run?", steps: ["Materials", "Fabrication equipment", "Chip foundry", "Packaging + memory", "Servers and data centres"], takeaway: "AI capacity depends on a global chain of specialised materials, machines, factories and logistics." },
  { title: "People and governance surround every layer", question: "Who makes the consequential decisions?", kind: "branches", hub: "The AI system", steps: ["Researchers + builders", "Operators + workers", "Users + affected people", "Auditors + regulators"], takeaway: "Responsibility cannot be handed to the model. People choose the goal, data, limits, deployment and response when something goes wrong." },
  { title: "How to approach a frontier claim", question: "What should you do when experts disagree about what AI can do?", steps: ["Name the exact claim", "Inspect the evidence", "Compare plausible explanations", "State uncertainty", "Choose the next useful question"], takeaway: "The honest answer is sometimes uncertain. Good reasoning makes the disagreement and missing evidence visible." },
];

const primaryConceptSections = ["1.1", "2.2", "3.2", "4.3", "5.5", "6.7", "7.2", "8.2", "9.1", "10.2", "11.2", "12.5", "13.2", "14.2", "15.6", "16.2", "17.1", "18.4", "19.1", "20.1"];

const additionalConcepts = [
  { after: "2.4", title: "A chatbot answers; an agent continues", question: "What changes when the system can choose and carry out another step?", kind: "compare", lanes: [
    { label: "Chatbot", steps: ["Receive a message", "Generate a reply", "Stop"] },
    { label: "Agent", steps: ["Receive a goal", "Choose and perform a step", "Inspect the result", "Continue or stop"] },
  ], takeaway: "Agentic AI adds a controlled action loop. It is not merely a chatbot with a longer answer." },
  { after: "3.4", title: "Three ways examples can guide learning", question: "What information tells the system whether it is improving?", kind: "branches", hub: "Training signal", steps: ["Labelled answers", "Unlabelled patterns", "Rewards or feedback"], takeaway: "Supervised, unsupervised and feedback-based learning differ in the signal used to adjust the model." },
  { after: "3.7", title: "The data flywheel", question: "Why can a widely used product improve faster?", steps: ["More real use", "More examples and feedback", "Better product decisions", "More useful product", "More real use"], loop: true, takeaway: "The loop is powerful only when feedback is relevant, lawful and representative; more data is not automatically better data." },
  { after: "4.4", title: "A context window is a limited work surface", question: "What can the model use during this request?", steps: ["Instructions", "Your message", "Selected earlier turns or documents", "Finite context window", "Response"], takeaway: "Material outside the active window is not automatically available to the model." },
  { after: "4.7", title: "Different media, same basic conversion", question: "How can one model work with text, pictures and sound?", kind: "branches", hub: "Processable tokens", steps: ["Text pieces", "Image patches", "Audio slices", "Video frames"], takeaway: "Each medium is divided and encoded differently, then represented as numbers the system can process." },
  { after: "5.3", title: "What a neural network layer does", question: "How does a signal become a more useful representation?", steps: ["Input numbers", "Weighted connections", "Layer detects a pattern", "Later layers combine patterns", "Output"], takeaway: "A neural network transforms numerical signals through many weighted layers; it does not store a readable rulebook." },
  { after: "5.7", title: "Attention connects relevant pieces", question: "How does the model decide which earlier pieces matter now?", steps: ["Current token", "Compare with available tokens", "Assign stronger or weaker attention", "Combine relevant information", "Predict next piece"], takeaway: "Attention is a learned weighting mechanism, not human concentration or understanding." },
  { after: "5.10", title: "What gets saved after training", question: "What is the finished model artifact?", steps: ["Training process", "Architecture + learned weights", "Tokenizer + configuration", "Frozen model files", "Ready for inference"], takeaway: "The finished model is a collection of learned numerical parameters plus the structure and configuration needed to run them." },
  { after: "6.2", title: "How a model turns a picture into features", question: "What happens before the model can describe an image?", steps: ["Image pixels", "Divide into patches", "Encode visual features", "Connect objects and regions", "Produce a task-specific result"], takeaway: "The system calculates patterns across pixels and regions; it does not look at the picture with human eyes." },
  { after: "6.3", title: "Diffusion creates by removing noise", question: "How can an image begin as visual static?", steps: ["Random noise", "Text guides the target", "Remove a little noise", "Repeat many times", "Coherent image"], takeaway: "Diffusion repeatedly predicts a less noisy image; it is not retrieving one finished picture from storage." },
  { after: "6.5", title: "A voice assistant is several systems in sequence", question: "How does speech become a spoken answer?", steps: ["Your voice", "Speech-to-text", "Language model response", "Text-to-speech", "Spoken answer"], takeaway: "A smooth voice experience can be a chain of specialised models, each with its own possible errors." },
  { after: "6.6", title: "Video adds time and continuity", question: "Why is video harder than one image?", steps: ["Generate one frame", "Preserve people and objects", "Move them consistently", "Repeat across time", "Playable sequence"], takeaway: "Every frame must work on its own and remain consistent with the frames around it." },
  { after: "7.3", title: "Sampling changes how predictable an answer feels", question: "Why can the same prompt produce different wording?", kind: "compare", lanes: [
    { label: "Lower variation", steps: ["Prefer highest-probability choices", "More repeatable wording", "Can become rigid"] },
    { label: "Higher variation", steps: ["Allow more possible choices", "More varied wording", "Can become less reliable"] },
  ], takeaway: "Randomness is introduced during selection from possible next pieces; it does not mean the model learned new facts between attempts." },
  { after: "7.5", title: "Batching shares one round of compute", question: "How can a service handle many requests efficiently?", steps: ["Requests wait briefly", "Compatible requests are grouped", "Hardware processes the batch", "Results separate again", "Each response returns"], takeaway: "Batching improves hardware use, but waiting to form a batch can add latency." },
  { after: "8.4", title: "Embeddings turn meaning into positions", question: "How can software search by similarity instead of exact words?", steps: ["Text or image", "Embedding model", "Numerical position", "Nearby positions mean similar patterns", "Similarity result"], takeaway: "An embedding is a numerical representation used for comparison; it is not the original document or a human definition of meaning." },
  { after: "8.6", title: "RAG brings selected sources into the request", question: "How can a model answer from current documents without retraining?", steps: ["Question", "Search approved source collection", "Retrieve relevant passages", "Add them to context", "Model answers from that context"], takeaway: "Retrieval changes what the model can see for this request; it does not rewrite the model's learned weights." },
  { after: "9.4", title: "Retrieval and fine-tuning change different things", question: "Do you need new knowledge or different behaviour?", kind: "compare", lanes: [
    { label: "Retrieval", steps: ["Keep base model", "Fetch current source passages", "Answer with added context"] },
    { label: "Fine-tuning", steps: ["Start with base model", "Train on selected examples", "Change learned behaviour"] },
  ], takeaway: "Use retrieval to supply source material; use fine-tuning when repeated behaviour must change." },
  { after: "9.5", title: "How human preferences shape model behaviour", question: "Where does the feedback enter?", steps: ["Model produces alternatives", "People compare results", "Build a preference signal", "Adjust the model", "Test the changed behaviour"], takeaway: "Human feedback shapes which behaviours are rewarded, but it does not create one universal definition of a good answer." },
  { after: "9.8", title: "Choose the smallest change that solves the problem", question: "Where should customisation begin?", steps: ["Improve the instruction", "Add examples", "Retrieve sources", "Fine-tune if behaviour still fails", "Change or train a model only if necessary"], takeaway: "Move up the cost and permanence ladder only when the cheaper layer cannot solve the real failure." },
  { after: "10.3", title: "An API is a controlled request-and-response doorway", question: "How does one application ask another service to do something?", steps: ["App sends a structured request", "Service checks identity and limits", "Model or tool performs the job", "Service returns a structured result", "App displays or uses it"], takeaway: "An API is a defined way for software systems to communicate; the user does not need to see that exchange." },
  { after: "10.5", title: "Orchestration coordinates several calls", question: "What happens when one model response is not enough?", steps: ["Receive the task", "Choose a route", "Call model, data or tool", "Combine and check results", "Return or continue"], loop: true, takeaway: "Orchestration is the product logic that decides which components run, in what order and under which limits." },
  { after: "10.6", title: "A router chooses a path before work begins", question: "Why might one product use several models?", kind: "branches", hub: "Incoming request", steps: ["Fast low-cost model", "Specialist model", "High-capability model", "Human review route"], takeaway: "Routing matches the job and risk to a suitable path; it does not make every model interchangeable." },
  { after: "11.4", title: "The stated goal and the measured target can diverge", question: "Why can a system follow instructions and still create the wrong outcome?", kind: "compare", lanes: [
    { label: "What people want", steps: ["Useful result", "Fair consequences", "Safe limits"] },
    { label: "What the system can measure", steps: ["Proxy score", "Optimise that score", "Possible unintended result"] },
  ], takeaway: "Alignment failures often begin when the measurable proxy is not the full human goal." },
  { after: "11.6", title: "Why fluent text can still be false", question: "Where does a hallucination come from?", steps: ["Prompt and context", "Predict plausible next pieces", "No built-in truth check", "Confident-sounding sentence", "Verify against evidence"], takeaway: "The generation mechanism rewards plausible continuation, not guaranteed truth; verification must come from the wider system and the reader." },
  { after: "11.8", title: "Match verification to consequence", question: "How much checking does an AI result need?", steps: ["Name the possible harm", "Check whether the claim is reversible", "Use authoritative evidence", "Add human review when stakes rise", "Act only within the safe boundary"], takeaway: "Trust is a decision about evidence, consequence and reversibility—not a personality judgement about the model." },
  { after: "12.3", title: "A benchmark can miss the real job", question: "Why can a high score still produce a poor product?", kind: "compare", lanes: [
    { label: "Benchmark", steps: ["Fixed test set", "Known scoring rule", "Comparable number"] },
    { label: "Real use", steps: ["Messy people and conditions", "Different costs of failure", "Changing tasks"] },
  ], takeaway: "Benchmarks support comparison, but real-use evaluation must reproduce the task, users and consequences that matter." },
  { after: "13.3", title: "Autonomy rises as approvals disappear", question: "How much can the system do before a person must intervene?", steps: ["Suggest only", "Draft for approval", "Act within narrow limits", "Act broadly and report later"], takeaway: "Higher autonomy can save time while increasing the need for containment, monitoring and clear stop conditions." },
  { after: "13.4", title: "Reversibility changes the approval rule", question: "Which actions need a human before they happen?", kind: "compare", lanes: [
    { label: "Easy to undo", steps: ["Draft privately", "Review result", "Discard or revise"] },
    { label: "Hard to undo", steps: ["Send, publish or spend", "External consequence", "Require approval first"] },
  ], takeaway: "The harder an action is to reverse, the stronger the permission boundary should be." },
  { after: "14.3", title: "A model does not use a tool by magic", question: "What happens between deciding and doing?", steps: ["Model proposes a named tool call", "System validates the arguments", "Approved tool runs", "Result returns to the model", "Model continues or stops"], takeaway: "The application—not the model alone—owns tool permissions, validation, execution and logs." },
  { after: "14.4", title: "MCP standardises the connection to tools", question: "What problem does a common protocol solve?", kind: "branches", hub: "MCP client", steps: ["Files and data", "Business systems", "Search and research", "Other approved tools"], takeaway: "MCP defines a common way to describe and call tools; it does not automatically make every connected tool safe or trustworthy." },
  { after: "14.6", title: "A multi-agent system divides roles and handoffs", question: "When is more than one agent useful?", steps: ["Coordinator assigns bounded work", "Specialists work on separate jobs", "Results return with evidence", "Coordinator reconciles conflicts", "One final output"], takeaway: "Multiple agents help only when responsibilities, shared state, handoffs and conflict resolution are explicit." },
  { after: "16.5", title: "AI compute cost has several physical sources", question: "What are you paying for when a model runs?", kind: "branches", hub: "Cost of compute", steps: ["Chips + memory", "Electricity + cooling", "Data-centre capacity", "Networking + operations"], takeaway: "The model's price reflects a physical service stack, not only a software licence." },
  { after: "17.3", title: "Cooling removes heat and starts again", question: "Why does a data centre need a continuous cooling system?", steps: ["Chips produce heat", "Coolant or air absorbs it", "Heat moves outside", "Cooling medium returns", "Chips keep operating"], loop: true, takeaway: "Cooling is a continuous physical loop; its design affects water use, energy use, reliability and location." },
  { after: "17.4", title: "Electricity travels through several layers before a chip uses it", question: "What sits between the power source and an AI calculation?", steps: ["Power generation", "Grid and transmission", "Data-centre electrical systems", "Server power conversion", "Chip calculation"], takeaway: "The environmental and reliability story depends on the energy source and the infrastructure delivering it." },
  { after: "18.2", title: "A leading AI chip crosses many specialist boundaries", question: "Why can't one company simply make the whole chip?", steps: ["Chip design", "Lithography equipment", "Advanced fabrication", "Packaging + high-bandwidth memory", "Server integration"], takeaway: "Modern AI hardware depends on different companies and countries at different stages of one tightly coupled chain." },
  { after: "19.3", title: "Human judgement becomes training material", question: "Where does labelling work enter the AI system?", steps: ["People review examples", "Apply labels or preferences", "Quality checks resolve disagreement", "Training uses the signal", "Model behaviour changes"], takeaway: "Human labour is embedded in the model through examples and feedback, even when that labour is invisible in the product." },
  { after: "20.2", title: "AGI would require a connected chain, not one impressive answer", question: "What would general capability need to do end to end?", steps: ["Understand an unfamiliar problem", "Gather relevant information", "Form and test hypotheses", "Revise when wrong", "Act across domains with reliable judgment"], takeaway: "A system doing one difficult task is not sufficient evidence of general intelligence; the connected transfer and reliability matter." },
  { after: "20.4", title: "The AGI disagreement starts with different assumptions", question: "Why can serious researchers reach very different timelines?", kind: "compare", lanes: [
    { label: "Scale may be enough", steps: ["Capabilities keep improving", "Tools add missing functions", "Timelines may be short"] },
    { label: "New ideas may be required", steps: ["Current limits may be fundamental", "Different architectures are needed", "Timelines may be long"] },
  ], takeaway: "The camps disagree about definitions, evidence, architecture and limits—not only about a date." },
];

const conceptDiagrams = teachingVisuals;
const visualTeachingLayerActive = false;
const visualTeachingLayerStatus = "REJECTED_BY_ALI_2026_08_17_QUARANTINED_NOT_RENDERED_NOT_INTEGRATED_NOT_PUBLISHED";
const chapterOnePurposeBuiltVisualActive = true;
const chapterOnePurposeBuiltVisualStatus = "APPROVED_BY_ALI_2026_08_18_INTEGRATED_LOCALLY_NOT_PUBLISHED";
const chapterOneProductCutawayVisualActive = true;
const chapterOneProductCutawayVisualStatus = "APPROVED_BY_ALI_2026_08_18_INTEGRATED_LOCALLY_NOT_PUBLISHED";
const chapterTwoPurposeBuiltVisualActive = true;
const chapterTwoPurposeBuiltVisualStatus = "BUILT_LOCALLY_ROLE_DISTINCT_CHAPTER_REVIEW_PASS_NOT_PUBLISHED";
const chapterThreePurposeBuiltVisualActive = true;
const chapterThreePurposeBuiltVisualStatus = "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const chapterFourPurposeBuiltVisualActive = true;
const chapterFourPurposeBuiltVisualStatus = "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const chapterFivePurposeBuiltVisualActive = true;
const chapterFivePurposeBuiltVisualStatus = "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const chapterSixPurposeBuiltVisualActive = true;
const chapterSixPurposeBuiltVisualStatus = "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const chapterSevenPurposeBuiltVisualActive = true;
const chapterSevenPurposeBuiltVisualStatus = "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const chapterEightPurposeBuiltVisualActive = true;
const chapterEightPurposeBuiltVisualStatus = "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const chapterNinePurposeBuiltVisualActive = true;
const chapterNinePurposeBuiltVisualStatus = "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const chapterTenPurposeBuiltVisualActive = true;
const chapterTenPurposeBuiltVisualStatus = "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const chapterElevenPurposeBuiltVisualActive = true;
const chapterElevenPurposeBuiltVisualStatus = "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const chapterTwelvePurposeBuiltVisualActive = true;
const chapterTwelvePurposeBuiltVisualStatus = "BUILT_LOCALLY_INDEPENDENT_REVIEW_PASS_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const chapterThirteenPurposeBuiltVisualActive = true;
const chapterThirteenPurposeBuiltVisualStatus = "BUILT_LOCALLY_INDEPENDENT_REVIEW_PASS_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED";
const representativeTeachingVisualActive = false;
const rejectedRepresentativeStatus = "REJECTED_BY_ALI_2026_08_17_DISABLED_NOT_RENDERED_NOT_PUBLISHED";
const representativeTeachingVisualStatus = rejectedRepresentativeStatus;
const chapterOneDecisionSeamActive = false;
const chapterOneDecisionSeamStatus = rejectedRepresentativeStatus;
const chapterFourTokenProofActive = false;
const chapterFourTokenProofStatus = rejectedRepresentativeStatus;
const chapterTwoJobFamilyActive = false;
const chapterTwoJobFamilyStatus = rejectedRepresentativeStatus;
const chapterThreeDataLifecycleActive = false;
const chapterThreeDataLifecycleStatus = rejectedRepresentativeStatus;
const chapterFiveTrainingLoopActive = false;
const chapterFiveTrainingLoopStatus = rejectedRepresentativeStatus;
const chapterSevenRequestJourneyActive = false;
const chapterSevenRequestJourneyStatus = rejectedRepresentativeStatus;
const chapterEightContextRetrievalActive = false;
const chapterEightContextRetrievalStatus = rejectedRepresentativeStatus;
const chapterNineCustomisationDecisionActive = false;
const chapterNineCustomisationDecisionStatus = rejectedRepresentativeStatus;

function renderConceptDiagram(concept) {
  return renderTeachingVisual(concept);
}

function renderChapterOnePurposeBuiltVisual() {
  return `<figure id="ch01-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch01-rule-versus-learned-pattern" aria-describedby="ch01-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch01-automation-vs-ai-representative-mobile-v2.jpeg">
    <img src="assets/ch01-automation-vs-ai-representative-desktop-v2.jpeg" alt="One shared email is tested in two ways. Automation applies a person's exact FREE equals spam rule, so FR33 is kept. AI learns broader spam and keep patterns from labelled examples, so the same FR33 email is classified as spam." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch01-purpose-built-caption"><strong>Same email, different source of the decision:</strong> automation follows the exact rule a person wrote, so the disguised spelling does not match. AI applies a broader pattern learned from labelled examples, so the same message can still be classified as spam.</figcaption>
</figure>`;
}

function renderChapterOneProductCutawayVisual() {
  return `<figure id="ch01-product-cutaway-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch01-one-inbox-two-decision-routes" aria-describedby="ch01-product-cutaway-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch01-one-inbox-two-routes-mobile-v1.jpeg">
    <img src="assets/ch01-one-inbox-two-routes-desktop-v1.jpeg" alt="One email inbox uses two decision routes at the same time. A person-written sender filter directs a matching store email to Promotions. Separately, people label spam and keep examples; the system learns a pattern; a message from a new sender enters that learned pattern; and the pattern directs it to the Spam tray in the same inbox." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch01-product-cutaway-caption"><strong>One inbox, two mechanisms:</strong> the Promotions route follows a filter a person wrote. The Spam route applies a pattern learned from labelled examples to a new sender. A product can use both at once without making every decision in the same way.</figcaption>
</figure>`;
}

function renderChapterTwoJobsVisual() {
  return `<figure id="ch02-four-ai-jobs-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch02-four-ai-jobs-one-service" aria-describedby="ch02-four-ai-jobs-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch02-four-ai-jobs-travel-service-mobile-v1.jpeg">
    <img src="assets/ch02-four-ai-jobs-travel-service-desktop-v1.jpeg" alt="One travel service performs four different AI jobs: predicts a delay, interprets a damaged-bag image, creates a new travel plan, and carries out a permissioned action loop that rebooks, checks the result and adjusts." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch02-four-ai-jobs-caption"><strong>One product can combine several AI jobs:</strong> prediction, interpretation, generation and agentic action describe different work. They are not a ladder, and a product does not need to use every job.</figcaption>
</figure>`;
}

function renderChapterTwoTimelineVisual() {
  return `<figure id="ch02-convergence-timeline-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch02-ai-convergence-timeline" aria-describedby="ch02-convergence-timeline-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch02-ai-convergence-timeline-mobile-v1.jpeg">
    <img src="assets/ch02-ai-convergence-timeline-desktop-v1.jpeg" alt="An uneven timeline rises through early optimism and falls through two AI winters. During the quiet decades, data, computing power and better approaches grow separately and converge at the transformer before conversational AI becomes publicly visible in 2022." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch02-convergence-timeline-caption"><strong>It did not appear overnight:</strong> repeated disappointments interrupted the field, while data, compute and better approaches accumulated over decades. Their convergence made the 2017 transformer useful at scale; conversational AI made the results visible to the public in 2022.</figcaption>
</figure>`;
}

function renderChapterTwoAgentVisual() {
  return `<figure id="ch02-agent-tool-loop-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch02-agent-tool-boundary-loop" aria-describedby="ch02-agent-tool-loop-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch02-agent-tool-boundary-loop-mobile-v1.jpeg">
    <img src="assets/ch02-agent-tool-boundary-loop-desktop-v1.jpeg" alt="An agent receives a goal, plans, calls a tool across a visible boundary and receives a result. It decides whether to stop, adjust, or ask the user. Only after the user confirms does an action cross the tool boundary; the returned observation feeds the next decision." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch02-agent-tool-loop-caption"><strong>An agent does not jump straight from model to world:</strong> tool calls cross a boundary and results return. The loop can stop, adjust or pause for human confirmation; consequential action remains behind that checkpoint.</figcaption>
</figure>`;
}

function renderChapterTwoTradeoffsVisual() {
  return `<figure id="ch02-model-tradeoffs-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch02-model-tradeoffs-field-guide" aria-describedby="ch02-model-tradeoffs-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch02-model-tradeoffs-field-guide-mobile-v1.jpeg">
    <img src="assets/ch02-model-tradeoffs-field-guide-desktop-v1.jpeg" alt="A foundation model is shown as one broad base supporting many applications. Three separate field-guide bands compare size, access and thinking time as independent trade-offs rather than a ranking." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch02-model-tradeoffs-caption"><strong>Foundation is a role; size, access and thinking time are separate choices:</strong> small versus larger, open-weight versus closed, and direct versus extra reasoning each trade one benefit for another. None is a universal better-to-worse scale.</figcaption>
</figure>`;
}

function renderChapterThreePurposeBuiltVisual() {
  return `<figure id="ch03-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch03-data-choices-become-model-behaviour" aria-describedby="ch03-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch03-data-choices-pipeline-mobile-v1.png">
    <img src="assets/ch03-data-choices-pipeline-desktop-v1.png" alt="A five-stage data lesson. People begin with a wider world of text, photos, records and clicks; choose what to include; clean and label selected cat and not-cat examples; train a model on that prepared pile; then test a new dog image. When the model wrongly predicts cat, a human reviewer returns to inspect the job, selected data and labels before deliberately rebuilding." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch03-purpose-built-caption"><strong>The model never sees the whole world:</strong> people choose, clean and label a smaller pile; the model learns from that pile. When a result is wrong, the useful response is to inspect the job, data and labels before deliberately rebuilding—not to assume a bigger pile will fix a skewed one.</figcaption>
</figure>`;
}

function renderChapterFourPurposeBuiltVisual() {
  return `<figure id="ch04-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch04-fixed-vocabulary-splits-message" aria-describedby="ch04-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch04-tokenisation-vocabulary-mobile-v1.png">
    <img src="assets/ch04-tokenisation-vocabulary-desktop-v1.png" alt="Two connected time tracks. Earlier, frequent adjacent character pieces are merged while a fixed vocabulary is built. Later, the English sentence I love playing basketball is split using that existing vocabulary into I, love, play, ing, basket and ball, and the model processes the ordered token sequence. A note says the English split is illustrative and exact splits depend on the model." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch04-purpose-built-caption"><strong>The vocabulary was built earlier; your message is split now:</strong> frequent pieces can become reusable chunks in a fixed vocabulary. When you type a message, the tokenizer uses that existing vocabulary to divide the text into an ordered sequence the model can process. This is an English illustration—not a universal split. Exact pieces vary by model, encoding, language and context.</figcaption>
</figure>`;
}

function renderChapterFivePurposeBuiltVisual() {
  return `<figure id="ch05-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch05-training-improves-one-prediction" aria-describedby="ch05-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch05-training-loop-mobile-v1.png">
    <img src="assets/ch05-training-loop-desktop-v1.png" alt="A five-stage training loop using the example The cat sat on the. The known next token is mat. The model first makes chair most likely and gives mat only twelve percent. A high loss measures that mismatch. The error signal travels backward through the network and many weights receive tiny adjustments. The same example is shown again only to reveal the effect of one update: mat rises to fifty-six percent. Repeated small corrections build the trained model." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch05-purpose-built-caption"><strong>One training update, slowed down:</strong> the training example already contains the known next token. The model produces likelihoods; loss measures how poorly they fit; backpropagation traces contribution to the error; gradient descent nudges many weights. The repeated sentence here reveals the effect of one update. Real training continues across many different examples, and ordinary use of the finished model does not run this weight-changing loop.</figcaption>
</figure>`;
}

function renderChapterSixPurposeBuiltVisual() {
  return `<figure id="ch06-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch06-photo-becomes-image-token-context" aria-describedby="ch06-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch06-photo-to-context-mobile-v1.png">
    <img src="assets/ch06-photo-to-context-desktop-v1.png" alt="A photograph of a portable CD player and headphones is split into patches. A vision encoder converts pixel patterns into numerical image-token representations rather than object labels. Those image tokens join the reader's question tokens in one context sequence. A language model attends across both kinds of token and answers that the headphones are beside the CD player." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch06-purpose-built-caption"><strong>One photo, converted before the language model uses it:</strong> the patch grid preserves local visual information; the vision encoder turns pixel patterns into numerical image-token representations; those tokens join the typed question in one context sequence. The model then uses relationships across both kinds of token to generate an answer. The 576 image-token count is this chapter's worked example, not a universal fixed count.</figcaption>
</figure>`;
}

function renderChapterSevenPurposeBuiltVisual() {
  return `<figure id="ch07-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch07-send-prefill-decode-stream" aria-describedby="ch07-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch07-send-to-stream-mobile-v1.png">
    <img src="assets/ch07-send-to-stream-desktop-v1.png" alt="A four-stage request journey. The application assembles supplied instructions, earlier chat, the new coffee-stain question and any optional attachment, tool result or date. Prefill processes the supplied input together while the model weights stay frozen and creates reusable attention notes. Decode chooses one next token, appends it and repeats. The interface displays the growing response as tokens arrive until a stop token or output limit." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch07-purpose-built-caption"><strong>The answer is generated live, not revealed from behind a curtain:</strong> the application first assembles whatever context the product actually supplies. Prefill processes that input together and creates reusable attention notes. Decode then selects and appends one token at a time; the interface may display tokens individually or in small batches. The trained weights remain frozen throughout ordinary use.</figcaption>
</figure>`;
}

function renderChapterEightPurposeBuiltVisual() {
  return `<figure id="ch08-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch08-rag-selected-documents-context" aria-describedby="ch08-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch08-rag-context-mobile-v1.png">
    <img src="assets/ch08-rag-context-desktop-v1.png" alt="A two-stage RAG mechanism. Before a question, source documents are split into chunks, converted to numerical embeddings and stored in a searchable vector database. When a person asks about parental leave, the question is embedded and matched against stored chunks. Only selected matching passages are placed in the current context beside the question and instructions. A frozen model uses that supplied context to generate a grounded answer while its weights remain unchanged. A trust note says grounded does not guarantee correct, complete or current." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch08-purpose-built-caption"><strong>RAG retrieves before the model answers:</strong> documents are prepared and indexed earlier. For this request, similarity search selects a small number of passages and the application places them in the current context. The model uses those passages without changing its weights. The answer can still be wrong, incomplete or stale if the sources, retrieval or generation are wrong.</figcaption>
</figure>`;
}

function renderChapterNinePurposeBuiltVisual() {
  return `<figure id="ch09-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch09-context-or-weight-change" aria-describedby="ch09-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch09-change-request-mobile-v2.png">
    <img src="assets/ch09-change-request-desktop-v2.png" alt="Changing one AI request without changing model weights. Instructions or examples and selected RAG source chunks are added to the current context. A frozen model uses that supplied context to produce a response. The context may need to be supplied again on a later request, and it does not guarantee a correct answer." loading="lazy" decoding="async">
  </picture>
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch09-train-model-version-mobile-v2.png">
    <img src="assets/ch09-train-model-version-desktop-v2.png" alt="Three alternative ways to train a model version before later use. Fine-tuning examples adjust weights. Preference comparisons use RLHF or DPO to adjust weights. Full pre-training data and compute create base weights. All three routes lead to a trained model version used for future requests. Training shapes tendencies but does not guarantee correct, safe or consistent answers." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch09-purpose-built-caption"><strong>First decide what needs to change:</strong> prompts, examples and retrieved documents alter the context supplied for a request while the model's trained weights remain frozen. Fine-tuning, preference training and full pre-training alter weights before a model version is used for later requests. These routes can combine—for example, a fine-tuned model can still receive a prompt and RAG context—and none guarantees the result.</figcaption>
</figure>`;
}

function renderChapterTenPurposeBuiltVisual() {
  return `<figure id="ch10-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch10-product-around-model" aria-describedby="ch10-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch10-product-around-model-mobile-v1.png">
    <img src="assets/ch10-product-around-model-desktop-v1.png" alt="A woman asks an AI product whether she can return shoes. The product wrapper receives her message and an input checkpoint checks it. Four external context cards—system instructions, relevant chat, a 30-day return policy and the current date—sit in four separate harness slots and become one current model input. A dashed optional router sends a model selection back to the harness; the solid route carries the assembled input from the harness to that model. The model generates an answer, an output checkpoint checks it and the wrapper shows it to the reader." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch10-purpose-built-caption"><strong>The model is one part of the product:</strong> the wrapper receives and displays; the harness assembles whatever instructions and relevant context the product supplies; an optional router may select a model; the model generates; and separate product checks may inspect the input and output. The exact layers vary by product, and a check does not guarantee a correct or safe answer.</figcaption>
</figure>`;
}

function renderChapterElevenPurposeBuiltVisual() {
  return `<figure id="ch11-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch11-layered-safety-journey" aria-describedby="ch11-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch11-safety-layers-mobile-v1.png">
    <img src="assets/ch11-safety-layers-desktop-v1.png" alt="Two requests travel through several safety layers around one model. A request to make an email clearer passes an input check, reaches a model influenced by system rules and trained behaviour, passes an output check and is delivered. A request to summarise notes also passes the input check, but its generated draft contains a private number. In this worked example, the output check catches that problem and routes the draft to hold or redact. Some flagged cases may then receive human review. Other requests may be refused. No single layer catches everything." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch11-purpose-built-caption"><strong>Safety is layered because different checks see different parts of the journey:</strong> an input check can inspect a request; supplied rules and training can influence what the model generates; an output check can inspect the draft; and the product can deliver, refuse, redact or hold it. Some flagged cases may reach a person. Each layer can miss, misclassify or over-block, so none proves the final result is safe or correct.</figcaption>
</figure>`;
}

function renderChapterTwelvePurposeBuiltVisual() {
  return `<figure id="ch12-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch12-evidence-to-release-decision" aria-describedby="ch12-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch12-evidence-to-release-mobile-v1.png">
    <img src="assets/ch12-evidence-to-release-desktop-v1.png" alt="The same model update is sent separately to three evaluations. A public benchmark reports a higher score. A blind human comparison reports that one answer was preferred more often, while warning that preference is not proof of truth. A product-specific evaluation checks two customer-support tasks: the refund-link task still passes, but the angry-customer task that passed before the update now fails. All three results feed one release decision, and the regression causes the team to hold the update, fix it and retest." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch12-purpose-built-caption"><strong>One update, three different questions:</strong> a public benchmark tests a defined general capability; a human comparison records preference under its sample and rubric; and a use-case eval checks the work this product must still do. A higher general score does not cancel a regression in an important product task, so the evidence supports holding, fixing and retesting rather than releasing on one number.</figcaption>
</figure>`;
}

function renderChapterThirteenPurposeBuiltVisual() {
  return `<figure id="ch13-purpose-built-visual" class="purpose-built-teaching-visual" data-purpose-built-teaching-visual="ch13-autonomy-by-consequence-and-recovery" aria-describedby="ch13-purpose-built-caption">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/ch13-autonomy-consequence-mobile-v1.png">
    <img src="assets/ch13-autonomy-consequence-desktop-v1.png" alt="A two-axis decision field positions four example actions by consequence and recoverability. Drafting a document is low-consequence and easy to recover, so the system may act inside a bounded workspace. Moving a file remains low-consequence in this example but is logged and has an undo path. Sending a client email is higher-consequence and harder to recover, so it waits behind an approval gate. Making a payment is highest-consequence and hardest to recover, so it pauses for approval. A separate sandbox or simulation can test an action without touching the real system, while a note says permissions, monitoring and rollback still matter." loading="lazy" decoding="async">
  </picture>
  <figcaption id="ch13-purpose-built-caption"><strong>Ability does not decide authority:</strong> place an action by the harm a mistake could cause and how well it can be contained, detected and recovered. Low-consequence, recoverable work may happen inside a bounded workspace with logs or undo. Outward or high-consequence actions need stronger limits and often approval. A sandbox or simulation can help test an action, but its actual permissions determine the protection.</figcaption>
</figure>`;
}

function renderChapterOneDecisionSeam() {
  const labelledExamples = [
    ["SPAM", "W0N a prize!"],
    ["KEEP", "Dinner at 7?"],
    ["SPAM", "Act NOW!!!"],
    ["KEEP", "Your receipt"],
  ].map(([label, subject]) => `<i class="ch1-example ${label === "SPAM" ? "is-spam" : "is-keep"}"><b>${label}</b><span>${subject}</span></i>`).join("");
  return `<figure class="ch1-decision-seam" data-representative-teaching-visual="ch01-rule-or-learned-pattern" aria-labelledby="ch01-decision-seam-title" aria-describedby="ch01-decision-seam-caption">
  <header class="ch1-decision-head">
    <p>1.1 · THE SAME EMAIL, TWO DIFFERENT REASONS</p>
    <h4 id="ch01-decision-seam-title">Who supplied the deciding rule?</h4>
    <span>Both filters involve people. The human job—and the source of the decision—changes.</span>
  </header>
  <section class="ch1-shared-email" aria-label="One new email enters both filters">
    <div class="ch1-envelope" aria-hidden="true"><i></i></div>
    <div><b>ONE NEW EMAIL</b><p>“Congrats!! You’ve W0N a FR33 iPad!!! Click here NOW!!!”</p></div>
    <span aria-hidden="true">↓</span>
  </section>
  <div class="ch1-causal-paths">
    <section class="ch1-path ch1-rule-path" aria-label="Automation path: a human writes an exact rule and the filter checks it">
      <div class="ch1-path-label"><b>AUTOMATION</b><span>THE PERSON SUPPLIES THE RULE</span></div>
      <p class="ch1-before-input">BEFORE THIS EMAIL ARRIVES</p>
      <div class="ch1-human-rule"><div class="ch1-person" aria-hidden="true"><i></i></div><p><strong>Human-written rule</strong><em>IF the email contains “click here” → spam</em></p></div>
      <p class="ch1-same-input">NOW THE SAME NEW EMAIL ENTERS ↓</p>
      <div class="ch1-rule-check"><span class="ch1-magnifier" aria-hidden="true"></span><p><strong>Rule-based filter checks the exact wording</strong><em>It finds “click here”.</em></p></div>
      <span class="ch1-path-arrow" aria-hidden="true">↓</span>
      <div class="ch1-verdict"><b>SPAM</b><span>Flagged by this exact rule</span></div>
    </section>
    <section class="ch1-path ch1-learned-path" aria-label="AI path: people label examples and a learned filter compares combined signals">
      <div class="ch1-path-label"><b>AI</b><span>PEOPLE SUPPLY EXAMPLES</span></div>
      <p class="ch1-before-input">BEFORE THIS EMAIL ARRIVES</p>
      <div class="ch1-example-pile" aria-label="People label many past emails as spam or keep">${labelledExamples}</div>
      <p class="ch1-same-input">NOW THE SAME NEW EMAIL ENTERS ↓</p>
      <div class="ch1-pattern-machine"><div aria-hidden="true"><i></i><i></i><i></i><i></i></div><p><strong>Learned filter compares combined signals</strong><em>against a pattern learned from labelled examples</em></p></div>
      <span class="ch1-path-arrow" aria-hidden="true">↓</span>
      <div class="ch1-verdict"><b>LIKELY SPAM</b><span>Flagged by the combined pattern</span></div>
    </section>
  </div>
  <aside class="ch1-one-product"><strong>ONE INBOX CAN USE BOTH</strong><span>Your own exact routing rules can sit beside a learned spam filter. “AI” does not describe every part of the product.</span></aside>
  <figcaption id="ch01-decision-seam-caption"><strong>The test:</strong> did a person write the rule that fired, or did the system learn a pattern from labelled examples? The same result can come from two different mechanisms.</figcaption>
</figure>`;
}

function renderChapterTwoJobFamily() {
  const recordRows = Array.from({ length: 4 }, (_, index) => `<i style="--row:${index}" aria-hidden="true"></i>`).join("");
  const pixels = Array.from({ length: 42 }, (_, index) => `<i class="ch2-pixel-${index + 1}" aria-hidden="true"></i>`).join("");
  return `<figure class="ch2-job-family" data-representative-teaching-visual="ch02-four-jobs-one-family" aria-labelledby="ch02-job-family-title" aria-describedby="ch02-job-family-caption">
  <header class="ch2-job-family-head">
    <p>2.4 · FOUR LAYERS, FOUR DIFFERENT JOBS</p>
    <h4 id="ch02-job-family-title">Do not ask only “Is this AI?” Ask what job it is doing.</h4>
    <span>Each higher layer uses the capabilities beneath it. Follow the work—not the product label.</span>
  </header>
  <div class="ch2-family-stack">
    <section class="ch2-layer ch2-layer-agent" aria-label="Agentic AI works through a loop of steps toward a goal">
      <div class="ch2-layer-name"><b>4</b><span>AGENTIC AI</span><strong>ACT</strong></div>
      <div class="ch2-agent-loop"><div class="ch2-agent-row"><i>GOAL<br><small>Italian table for 4</small></i><b>→</b><i>SEARCH</i></div><b class="ch2-agent-down">↓ TOOL RETURNS RESULTS</b><div class="ch2-agent-row"><i class="ch2-observe">OBSERVE RESULTS</i><b>→</b><i>COMPARE</i></div><b class="ch2-agent-down">↓ TWO OPTIONS</b><div class="ch2-agent-row"><i class="ch2-human-check">ASK YOU</i><b>→</b><i>BOOK</i></div><span>IF THE RESULTS DO NOT FIT THE GOAL, CHOOSE ANOTHER STEP AND RETURN TO SEARCH ↺</span></div>
      <p>It repeats model, tool and decision steps until it stops, succeeds or needs you.</p>
    </section>
    <span class="ch2-built-on">USES ↓</span>
    <section class="ch2-layer ch2-layer-gen" aria-label="Generative AI creates new content from a prompt">
      <div class="ch2-layer-name"><b>3</b><span>GENERATIVE AI</span><strong>CREATE</strong></div>
      <div class="ch2-gen-flow"><p>“Move Friday’s meeting to Monday.”</p><b>→</b><div><span>NEW EMAIL</span><i></i><i></i><i></i></div></div>
      <p>It uses learned patterns to produce a new continuation: text, image, audio or code.</p>
    </section>
    <span class="ch2-built-on">USES ↓</span>
    <section class="ch2-layer ch2-layer-deep" aria-label="Deep learning interprets complex raw input">
      <div class="ch2-layer-name"><b>2</b><span>DEEP LEARNING</span><strong>INTERPRET</strong></div>
      <div class="ch2-deep-flow"><div class="ch2-pixel-grid" role="img" aria-label="A raw image represented as many coloured pixels">${pixels}</div><b>→</b><div class="ch2-feature-stack"><i>edges</i><i>shapes</i><i>parts</i></div><b>→</b><strong>CAT</strong></div>
      <p>It finds useful features inside raw, complex input such as pixels, audio or language.</p>
    </section>
    <span class="ch2-built-on">USES ↓</span>
    <section class="ch2-layer ch2-layer-ml" aria-label="Machine learning finds a pattern in historical structured examples and makes a prediction">
      <div class="ch2-layer-name"><b>1</b><span>MACHINE LEARNING</span><strong>PREDICT</strong></div>
      <div class="ch2-ml-flow"><div class="ch2-records" aria-label="Historical customer records">${recordRows}</div><b>→</b><div class="ch2-pattern"><i></i><span>LEARNED PATTERN</span></div><b>→</b><strong>LIKELY TO CANCEL</strong></div>
      <p>It learns a pattern from past examples and applies that pattern to a new case.</p>
    </section>
  </div>
  <aside class="ch2-job-test"><strong>Use the job test:</strong> A bank flags an application for manual review from past customer records. It predicts; it does not create or act. That makes this machine learning even if the product’s marketing simply says “AI.”</aside>
  <figcaption id="ch02-job-family-caption"><strong>Trace the family:</strong> machine learning supplies learned patterns → deep learning uses them with complex raw inputs → generative AI uses deep learning to create → agentic AI can place generation inside a repeated plan/action/observation loop. A real product can combine several layers.</figcaption>
</figure>`;
}

function renderChapterThreeDataLifecycle() {
  const emailPile = ["SPAM", "KEEP", "KEEP", "SPAM", "?", "KEEP"].map((label, index) => `<i class="ch3-mail ch3-mail-${index + 1}"><span>${label}</span></i>`).join("");
  return `<figure class="ch3-data-life" data-representative-teaching-visual="ch03-data-choices-lifecycle" aria-labelledby="ch03-data-life-title" aria-describedby="ch03-data-life-caption">
  <header class="ch3-data-head">
    <p>3.3 · DATA DOES NOT PREPARE ITSELF</p>
    <h4 id="ch03-data-life-title">A spam filter begins with a chain of human choices</h4>
    <span>Follow ordinary past emails into training—and keep the test material out of the lesson.</span>
  </header>
  <div class="ch3-life-body">
    <section class="ch3-job" aria-label="People define what spam means for this job">
      <div class="ch3-stage"><b>1</b><span>DEFINE THE JOB</span></div>
      <div class="ch3-target" aria-hidden="true"><i></i><i></i><i></i></div>
      <strong>Decide what “spam” means</strong>
      <p>The label is a rule people define for this product—not a fact the data names for itself.</p>
    </section>
    <span class="ch3-flow ch3-flow-a" aria-hidden="true">→</span>
    <section class="ch3-prepare" aria-label="People choose, clean and label past emails">
      <div class="ch3-stage"><b>2</b><span>BUILD THE DATASET</span></div>
      <div class="ch3-mail-pile" aria-label="Past emails selected for the candidate dataset">${emailPile}</div>
      <ol><li>Choose what to include</li><li>Clean + remove duplicates</li><li>People label: spam / not spam</li><li>Check what is missing or skewed</li></ol>
    </section>
    <span class="ch3-flow ch3-flow-b" aria-hidden="true">→</span>
    <section class="ch3-split" aria-label="The prepared dataset is separated before learning">
      <div class="ch3-stage"><b>3</b><span>SPLIT BEFORE LEARNING</span></div>
      <div class="ch3-data-stacks"><div class="ch3-dataset ch3-train"><div><i></i><i></i><i></i></div><p><strong>TRAINING SET</strong><span>learn from these</span></p></div><div class="ch3-dataset ch3-valid"><div><i></i><i></i></div><p><strong>VALIDATION SET</strong><span>adjust with these</span></p></div><div class="ch3-dataset ch3-test"><div><i></i></div><p><strong>HELD-OUT TEST</strong><span>keep unseen until the final check</span></p><b aria-label="locked test set"></b></div></div>
    </section>
    <span class="ch3-turn" aria-hidden="true">↓</span>
    <section class="ch3-learn-check" aria-label="Training examples create a learned pattern, validation supports adjustment, and the held-out test checks the result">
      <div class="ch3-stage"><b>4</b><span>LEARN + CHECK</span></div>
      <div class="ch3-learn-flow"><div class="ch3-input-stack"><span>TRAINING</span><i></i><i></i><i></i></div><b>→</b><div class="ch3-model"><i></i><i></i><i></i><strong>LEARN PATTERNS</strong></div><b>←</b><div class="ch3-check-stack"><span>VALIDATION</span><em>adjust deliberately</em></div></div>
      <div class="ch3-final-test"><span>HELD-OUT TEST</span><b>→</b><strong>CHECK ON EMAILS IT DID NOT LEARN FROM</strong></div>
    </section>
    <span class="ch3-flow ch3-flow-c" aria-hidden="true">→</span>
    <section class="ch3-use" aria-label="A genuinely new email receives a prediction, and real errors trigger investigation rather than automatic retraining">
      <div class="ch3-stage"><b>5</b><span>USE + RECHECK</span></div>
      <div class="ch3-new-mail"><i aria-hidden="true"></i><span>NEW UNSEEN EMAIL</span></div>
      <b class="ch3-down">↓</b>
      <div class="ch3-prediction">LIKELY SPAM</div>
      <div class="ch3-monitor"><strong>MONITOR, INVESTIGATE, RECHECK ↺</strong><span>A wrong result is evidence to inspect the job, sources, labels, split or changed real world. It is not automatic training data.</span></div>
    </section>
  </div>
  <aside class="ch3-missing"><strong>WHAT IS MISSING STAYS MISSING</strong><span>If some languages, senders or kinds of spam were excluded or labelled inconsistently, the learned pattern may fail there. More rows do not repair a bad definition or a skewed pile.</span></aside>
  <figcaption id="ch03-data-life-caption"><strong>Trace it:</strong> people define the job → select, clean and label past emails → split them before learning → train and check on separate examples → use the model on a genuinely new email → investigate failures and deliberately rebuild when needed.</figcaption>
</figure>`;
}

function renderChapterFiveTrainingLoop() {
  const tokenChips = ["The", "cat", "sat", "on", "the"].map(token => `<i>${token}</i>`).join("");
  const networkNodes = Array.from({ length: 12 }, (_, index) => `<i class="ch5-node-${index + 1}"></i>`).join("");
  const contributionNodes = ["− small", "+ medium", "− tiny", "+ small"].map(value => `<i><span>${value}</span></i>`).join("");
  const sliders = [[32,38],[67,61],[45,48],[78,72]].map(([before,after], index) => `<div><span>setting ${index + 1}</span><i style="--before:${before}%;--after:${after}%"></i></div>`).join("");
  return `<figure class="ch5-training-loop" data-representative-teaching-visual="ch05-guess-check-adjust-loop" aria-labelledby="ch05-training-loop-title" aria-describedby="ch05-training-loop-caption">
  <header class="ch5-training-head">
    <p>5.5 · HOW A WRONG GUESS CHANGES THE MODEL</p>
    <h4 id="ch05-training-loop-title">Training turns one error into millions of tiny targeted adjustments</h4>
    <span>The input moves forward. The error calculation moves backward. The words themselves do not travel backward.</span>
  </header>
  <section class="ch5-example" aria-label="One labelled language-model training example">
    <div><b>ONE TRAINING EXAMPLE</b><span class="ch5-token-row">${tokenChips}</span></div>
    <span aria-hidden="true">+</span>
    <div class="ch5-known"><b>KNOWN NEXT TOKEN</b><strong>mat</strong></div>
  </section>
  <div class="ch5-loop-body">
    <section class="ch5-forward" aria-label="Forward calculation uses current number settings to produce token likelihoods">
      <div class="ch5-step"><b>1</b><span>FORWARD CALCULATION</span></div>
      <div class="ch5-forward-flow"><div class="ch5-mini-tokens"><i>The</i><i>cat</i><i>…</i></div><b>→</b><div class="ch5-network" aria-label="Several layers of adjustable mathematical connections">${networkNodes}</div><b>→</b><div class="ch5-likelihoods"><div><span>chair</span><i style="--score:56%"></i><b>56%</b></div><div><span>mat</span><i style="--score:12%"></i><b>12%</b></div><div><span>floor</span><i style="--score:9%"></i><b>9%</b></div></div></div>
      <p>Current number settings transform the input into token likelihoods. This round favours <strong>chair</strong>.</p>
    </section>
    <span class="ch5-loop-arrow ch5-arrow-a" aria-hidden="true">→</span>
    <section class="ch5-loss" aria-label="The loss calculation compares the guess with the known answer">
      <div class="ch5-step"><b>2</b><span>COMPARE WITH THE KNOWN ANSWER</span></div>
      <div class="ch5-compare"><div><span>GUESS</span><strong>chair</strong></div><b>≠</b><div><span>KNOWN ANSWER</span><strong>mat</strong></div></div>
      <div class="ch5-loss-meter"><span>LOSS · HOW WRONG?</span><i><b></b></i><strong>HIGH</strong></div>
      <p>The loss is one numerical score. Lower means the model's likelihoods fit the known answer better.</p>
    </section>
    <span class="ch5-loop-arrow ch5-arrow-b" aria-hidden="true">↓</span>
    <section class="ch5-backward" aria-label="A backward calculation estimates how each adjustable setting contributed to the error">
      <div class="ch5-step"><b>3</b><span>BACKWARD CALCULATION</span></div>
      <div class="ch5-error-trace"><div class="ch5-error-source">ERROR SCORE</div><b>←</b><div class="ch5-contributions" aria-label="Different adjustable settings receive different contribution calculations">${contributionNodes}</div></div>
      <p>Backpropagation calculates how each adjustable number contributed to this error. No one setting contains “the answer,” and they do not all change equally.</p>
    </section>
    <span class="ch5-loop-arrow ch5-arrow-c" aria-hidden="true">←</span>
    <section class="ch5-adjust" aria-label="Gradient descent makes small targeted updates to the model's number settings">
      <div class="ch5-step"><b>4</b><span>SMALL TARGETED UPDATES</span></div>
      <div class="ch5-sliders" aria-label="Four illustrative settings move by different small amounts">${sliders}</div>
      <p>Each number is nudged in a direction expected to lower future loss: make <strong>mat</strong> a little more likely and <strong>chair</strong> a little less likely for patterns like this.</p>
    </section>
    <div class="ch5-repeat" aria-label="The updated settings are used on the next training example"><b>UPDATED SETTINGS</b><span>NEXT EXAMPLE → GUESS → CHECK → ADJUST → REPEAT ↺</span></div>
  </div>
  <aside class="ch5-accumulation"><div class="ch5-drop-series" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><p><strong>One example changes the model only a little.</strong> Across millions or billions of examples, small corrections accumulate into useful patterns. A low training loss alone still does not prove the model will work well on new real-world cases.</p></aside>
  <figcaption id="ch05-training-loop-caption"><strong>Trace it:</strong> labelled example → forward prediction → compare with known answer → numerical loss → backward contribution calculation → small targeted updates → next example. “Weights” are simply these adjustable numbers inside the model.</figcaption>
</figure>`;
}

function renderChapterFourTokenProof() {
  const letters = [..."strawberry"].map(letter => `<i>${letter}</i>`).join("");
  const chunk = (text, id) => `<i class="ch4-token-chunk"><b>${escapeHtml(text)}</b><span>ID ${id}</span></i>`;
  return `<figure class="ch4-token-proof" data-representative-teaching-visual="ch04-text-to-tokens" aria-labelledby="ch04-token-proof-title" aria-describedby="ch04-token-proof-caption">
  <header class="ch4-token-proof-head">
    <p>4.3 · FROM YOUR WORDS TO MODEL INPUT</p>
    <h4 id="ch04-token-proof-title">The model never receives the sentence the way you see it</h4>
    <span>Follow ordinary text through the vocabulary that was built before you ever typed.</span>
  </header>
  <div class="ch4-token-proof-body">
    <section class="ch4-vocabulary" aria-label="Before use, common character pairs are merged into reusable token chunks">
      <div class="ch4-phase"><b>A</b><span>BEFORE YOU TYPE</span></div>
      <p class="ch4-phase-title">Repeated text builds a fixed vocabulary of common chunks</p>
      <div class="ch4-merge-line" aria-label="t plus h becomes th, then th plus e becomes the">
        <span class="ch4-letter">t</span><em>+</em><span class="ch4-letter">h</span><strong>→</strong><span class="ch4-merged">th</span><em>+</em><span class="ch4-letter">e</span><strong>→</strong><span class="ch4-merged ch4-merged-final">the</span>
      </div>
      <p class="ch4-vocabulary-note">The software repeats this merging process across a huge collection of text. Common sequences earn their own reusable entry. The vocabulary is already fixed when your message arrives.</p>
    </section>
    <span class="ch4-down-arrow" aria-hidden="true">↓</span>
    <section class="ch4-tokenise" aria-label="When you type, the tokenizer matches your sentence to the prebuilt vocabulary">
      <div class="ch4-phase"><b>B</b><span>WHEN YOU TYPE</span></div>
      <p class="ch4-phase-title">Your sentence is matched against that vocabulary</p>
      <p class="ch4-user-text">I love playing basketball</p>
      <span class="ch4-cut-label">TOKENISER FINDS KNOWN CHUNKS</span>
      <div class="ch4-chunk-row" aria-label="I, love, play, ing, basket, ball">${chunk("I", "01")}${chunk("love", "02")}${chunk("play", "03")}${chunk("ing", "04")}${chunk("basket", "05")}${chunk("ball", "06")}</div>
    </section>
    <span class="ch4-down-arrow" aria-hidden="true">↓</span>
    <section class="ch4-model-input" aria-label="The model receives the token identifiers rather than the original words or letters">
      <div class="ch4-phase"><b>C</b><span>WHAT THE MODEL RECEIVES</span></div>
      <div class="ch4-id-stream" aria-label="An illustrative sequence of six token identifiers"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span></div>
      <p><strong>Six token entries—not four words.</strong> Real token IDs and splits vary by model, but the mechanism is the same: text becomes a numbered sequence before the model processes it.</p>
    </section>
  </div>
  <aside class="ch4-letter-proof" aria-label="Why token chunks make letter counting difficult">
    <div>
      <span>YOU CAN LOOK INSIDE THE WORD</span>
      <p class="ch4-letter-row" aria-label="s t r a w b e r r y">${letters}</p>
      <strong>10 visible letters · 3 r’s</strong>
    </div>
    <b aria-hidden="true">≠</b>
    <div>
      <span>THE MODEL MAY RECEIVE CHUNKS</span>
      <p class="ch4-strawberry-chunks"><i>str</i><i>aw</i><i>berry</i></p>
      <strong>3 tokens · the letters are inside them</strong>
    </div>
    <p class="ch4-letter-landing"><strong>This is the practical consequence:</strong> fluent language is a token-level strength; exact character counting or reversing can be harder because the model did not receive a neat row of individual letters.</p>
  </aside>
  <figcaption id="ch04-token-proof-caption"><strong>Trace it:</strong> repeated text builds a token vocabulary before use → your sentence is matched to that vocabulary → the chosen chunks become token IDs → the model processes those IDs. The shown splits and IDs are teaching examples, not a universal tokenizer output.</figcaption>
</figure>`;
}

function renderChapterSixPatchProof() {
  const patchCells = Array.from({ length: 24 }, (_, index) => `<i class="ch6-patch-cell ch6-patch-${index + 1}" aria-hidden="true"></i>`).join("");
  const imageTokens = [1, 2, 3].map(number => `<i class="ch6-image-token"><b>${number}</b><span>image token</span></i>`).join("");
  const compactImageTokens = [1, 2, 3].map(number => `<i class="ch6-image-token ch6-image-token-compact"><span>T${number}</span></i>`).join("");
  return `<figure class="ch6-patch-proof" data-representative-teaching-visual="ch06-photo-to-patches" aria-labelledby="ch06-patch-proof-title" aria-describedby="ch06-patch-proof-caption">
  <header class="ch6-patch-proof-head">
    <p>6.2 · FROM PHOTO TO ANSWER</p>
    <h4 id="ch06-patch-proof-title">A photo becomes pieces the model can calculate with</h4>
    <span>The model does not experience one whole picture. Follow the same photo as it becomes a joined stream of image information and words.</span>
  </header>
  <div class="ch6-patch-proof-body">
    <section class="ch6-upload" aria-label="Step 1: upload a photo and ask a question">
      <div class="ch6-step-label"><b>1</b><span>YOU SEND</span></div>
      <div class="ch6-photo-frame"><img src="assets/ch06-bicycle-tree-learning-image.png" alt="A purple bicycle beside a leafy tree"></div>
      <p class="ch6-question">“What is in this photo?”</p>
    </section>
    <span class="ch6-flow-arrow" aria-hidden="true">→</span>
    <section class="ch6-divide" aria-label="Step 2: software divides the image into small patches">
      <div class="ch6-step-label"><b>2</b><span>DIVIDE</span></div>
      <div class="ch6-grid-photo" role="img" aria-label="The same bicycle photograph divided into a teaching grid of 24 small patches">
        <img src="assets/ch06-bicycle-tree-learning-image.png" alt="">
        <span class="ch6-patch-overlay" aria-hidden="true">${patchCells}</span>
      </div>
      <p>Small patches preserve pieces of colour, edge and position—not whole named objects.</p>
    </section>
    <span class="ch6-flow-arrow" aria-hidden="true">→</span>
    <section class="ch6-translate" aria-label="Step 3: a vision encoder translates patches into numerical representations">
      <div class="ch6-step-label"><b>3</b><span>TRANSLATE</span></div>
      <div class="ch6-sample-patches" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="ch6-encoder"><span>VISION ENCODER</span><strong>visual pieces → numbers</strong></div>
      <div class="ch6-number-stream" aria-label="Three illustrative image-token bundles">${imageTokens}</div>
      <p class="ch6-token-example"><strong>Inside token 1:</strong> 0.14 · −0.82 · 0.37 · … <small>illustrative values</small></p>
      <p>The encoder converts all the patches into numerical image tokens the language model can use.</p>
    </section>
    <span class="ch6-flow-arrow" aria-hidden="true">→</span>
    <section class="ch6-combine" aria-label="Step 4: image tokens and text tokens enter one combined sequence">
      <div class="ch6-step-label"><b>4</b><span>READ TOGETHER</span></div>
      <div class="ch6-context-ribbon">
        <div class="ch6-image-token-row"><strong>IMAGE TOKENS<br><small>each holds numbers</small></strong>${compactImageTokens}<span>…</span></div>
        <div class="ch6-text-token-row"><strong>WORDS</strong><i>What</i><i>is</i><i>in</i><i>this</i><i>photo?</i></div>
        <p>ONE COMBINED SEQUENCE</p>
      </div>
      <div class="ch6-answer"><small>MODEL RELATES BOTH</small><strong>A purple bicycle beside a tree.</strong></div>
    </section>
  </div>
  <aside class="ch6-misconception"><strong>What this blocks:</strong> a patch is not “the bicycle patch.” One object can cross many patches, so the model must relate patterns across the image. That is why recognising a bicycle can be easier than counting every small object perfectly.</aside>
  <figcaption id="ch06-patch-proof-caption"><strong>Trace it:</strong> upload photo + question → divide the photo → translate patches into numbers → place image and word tokens in one sequence → generate an answer from both. Patch counts and internal values vary by system; the 24-square grid and numbers here are teaching examples.</figcaption>
</figure>`;
}

function renderChapterSevenRequestJourney() {
  const suppliedContext = ["Your new message", "Useful chat history", "Instructions + supplied files"].map((item, index) => `<i><b>${index + 1}</b><span>${item}</span></i>`).join("");
  const inputTokens = ["coffee", "stain", "white", "shirt", "?"].map(token => `<i>${token}</i>`).join("");
  const outputTokens = ["Rinse", "with", "cold", "water", "…"].map((token, index) => `<i style="--delay:${index}">${token}</i>`).join("");
  return `<figure id="ch07-request-journey" class="ch7-request-journey" data-representative-teaching-visual="ch07-prefill-decode-stream" aria-labelledby="ch07-request-journey-title" aria-describedby="ch07-request-journey-caption">
  <header class="ch7-request-head">
    <p>7.2 · WHAT HAPPENS AFTER YOU PRESS SEND</p>
    <h4 id="ch07-request-journey-title">The model reads the supplied context, then writes one piece at a time</h4>
    <span>Inference uses a trained model. This request does not teach it or change its learned weights.</span>
  </header>
  <div class="ch7-request-body">
    <section class="ch7-you-send" aria-label="Step 1: the application assembles the complete input">
      <div class="ch7-phase"><b>1</b><span>THE APP ASSEMBLES WHAT THIS REQUEST CAN SEE</span></div>
      <div class="ch7-chat-question"><span>YOU</span><p>“What is the best way to get coffee stains out of a white shirt?”</p><b aria-hidden="true">SEND</b></div>
      <div class="ch7-context-stack" aria-label="The complete input can contain more than the new message">${suppliedContext}</div>
      <p class="ch7-boundary"><strong>COMPLETE INPUT</strong><span>Only material supplied to this request is available here. The exact ingredients vary by product.</span></p>
    </section>
    <span class="ch7-major-arrow" aria-hidden="true">→</span>
    <section class="ch7-prefill" aria-label="Step 2: prefill reads all supplied input together">
      <div class="ch7-phase"><b>2</b><span>PREFILL · READ</span></div>
      <p class="ch7-plain-label">Process the supplied context together</p>
      <div class="ch7-input-token-row" aria-label="Illustrative input tokens processed in parallel">${inputTokens}</div>
      <div class="ch7-parallel-lines" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="ch7-frozen-model"><span>TRAINED MODEL</span><strong>frozen learned patterns</strong></div>
      <p class="ch7-phase-note"><strong>ONE INPUT PHASE</strong> The supplied pieces can be processed together.</p>
    </section>
    <span class="ch7-major-arrow" aria-hidden="true">→</span>
    <section class="ch7-decode" aria-label="Step 3: decode chooses and adds one next token, then repeats">
      <div class="ch7-phase"><b>3</b><span>DECODE · WRITE</span></div>
      <p class="ch7-plain-label">Build the answer in order</p>
      <ol class="ch7-decode-loop"><li><b>A</b><span>Choose one likely next token</span></li><li><b>B</b><span>Add it to what has already been written</span></li><li><b>C</b><span>Use the longer sequence to choose again</span></li></ol>
      <span class="ch7-loop-arrow" aria-label="repeat until the answer stops">↺ REPEAT UNTIL STOP</span>
      <div class="ch7-output-token-row" aria-label="Illustrative output tokens generated one after another">${outputTokens}</div>
      <p class="ch7-phase-note"><strong>ONE PIECE AT A TIME</strong> Each new piece depends on the sequence before it.</p>
    </section>
    <span class="ch7-stream-arrow" aria-hidden="true">↓</span>
    <section class="ch7-screen" aria-label="Step 4: each generated piece streams to the chat screen">
      <div class="ch7-phase"><b>4</b><span>STREAM TO YOUR SCREEN</span></div>
      <div class="ch7-chat-answer"><span>AI</span><p>Rinse with cold water…</p><i aria-hidden="true"></i></div>
      <p>The application shows new pieces as they arrive. It is not revealing a finished answer that was written in secret.</p>
    </section>
  </div>
  <aside class="ch7-not-training"><strong>WHAT DID NOT HAPPEN:</strong><span>The model did not permanently save this stain question, rewrite its learned weights or “learn a lesson” from answering it. That would require a separate training or product-memory process.</span></aside>
  <figcaption id="ch07-request-journey-caption"><strong>Trace it:</strong> assemble the material available to this request → prefill reads that supplied context together → decode chooses one next token, adds it and repeats → each new piece streams to your screen → stop. This is why a response appears gradually.</figcaption>
</figure>`;
}

function renderChapterEightContextRetrieval() {
  const documentCards = ["Parental leave policy", "Benefits guide", "Office dress code", "Travel policy"].map((label, index) => `<i class="ch8-doc ch8-doc-${index + 1}"><span>${label}</span></i>`).join("");
  const selectedChunks = ["20 weeks paid …", "6 weeks paid …"].map(chunk => `<i>${chunk}</i>`).join("");
  return `<figure id="ch08-context-retrieval" class="ch8-context-retrieval" data-representative-teaching-visual="ch08-weights-context-memory-rag" aria-labelledby="ch08-context-title" aria-describedby="ch08-context-caption">
  <header class="ch8-context-head">
    <p>8.6 · WHAT CAN REACH THIS ANSWER?</p>
    <h4 id="ch08-context-title">The model has learned patterns—but the product decides what it can see now</h4>
    <span>“Memory” and RAG live outside the model. They help only when the product retrieves something and places it into this turn’s context.</span>
  </header>
  <div class="ch8-context-body">
    <section class="ch8-before" aria-label="Before a question: documents are split and indexed outside the model">
      <div class="ch8-time-label"><b>BEFORE ANY QUESTION</b><span>prepare material for later retrieval</span></div>
      <div class="ch8-document-shelf" aria-label="A collection of company documents">${documentCards}</div>
      <span class="ch8-down" aria-hidden="true">↓</span>
      <div class="ch8-index"><strong>SPLIT + INDEX</strong><span>store small chunks by numerical meaning-patterns</span><div class="ch8-meaning-map" role="img" aria-label="A meaning map with policy chunks clustered near similar topics"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
      <p class="ch8-outside">This searchable index is outside the trained model.</p>
    </section>
    <section class="ch8-now" aria-label="At question time: the product assembles one context window from several distinct sources">
      <div class="ch8-time-label"><b>WHEN YOU ASK</b><span>assemble context for this turn</span></div>
      <div class="ch8-question"><span>YOU</span><strong>“What is our parental leave policy?”</strong></div>
      <div class="ch8-live-sources">
        <div class="ch8-current"><b>CURRENT CONVERSATION</b><span>your message + useful chat history + instructions</span></div>
        <div class="ch8-memory"><b>SAVED PRODUCT MEMORY</b><span>an external store may return one relevant preference or fact</span><em>SELECTED FACT →</em></div>
        <div class="ch8-retrieve"><b>RAG RETRIEVAL</b><span>search the index by similar meaning</span><em>ONLY MATCHING CHUNKS →</em><div>${selectedChunks}</div></div>
      </div>
      <span class="ch8-converge" aria-hidden="true">↓ ↓ ↓</span>
      <div class="ch8-context-window"><span>CONTEXT FOR THIS TURN</span><div><i>question</i><i>relevant history</i><i>selected memory</i><i>retrieved policy chunks</i></div><strong>Only supplied material is visible here.</strong></div>
    </section>
    <span class="ch8-join-arrow" aria-hidden="true">→</span>
    <section class="ch8-model" aria-label="The frozen model combines its trained patterns with the context supplied for this turn">
      <div class="ch8-model-boundary">
        <span>TRAINED MODEL</span>
        <div class="ch8-weights"><b>FROZEN WEIGHTS</b><small>broad learned patterns<br>can be stale</small></div>
        <b class="ch8-plus" aria-hidden="true">+</b>
        <div class="ch8-context-in"><b>LIVE CONTEXT</b><small>assembled for this request</small></div>
        <span class="ch8-generate" aria-hidden="true">↓ GENERATE</span>
        <div class="ch8-answer"><small>ANSWER</small><strong>Based on the retrieved policy…</strong></div>
      </div>
      <p>The model uses both sources together. It does not automatically label which detail came from training and which came from supplied context.</p>
    </section>
  </div>
  <aside class="ch8-boundary"><strong>WHEN THE TURN ENDS:</strong><span>the trained weights are unchanged. Stored information that was not selected into this context was not available to the answer. Retrieval can miss, and supplied material can still be incomplete or wrong.</span></aside>
  <figcaption id="ch08-context-caption"><strong>Trace it:</strong> prepare documents outside the model → ask a question → the product may retrieve selected memory and matching document chunks → combine them with the current conversation in one context window → run the frozen model with weights + live context → answer. RAG supplies information; it does not retrain the model.</figcaption>
</figure>`;
}

function renderChapterNineCustomisationDecision() {
  return `<figure id="ch09-customisation-decision" class="ch9-customisation-decision" data-representative-teaching-visual="ch09-context-or-weights-decision" aria-labelledby="ch09-customisation-title" aria-describedby="ch09-customisation-caption">
  <header class="ch9-customisation-head"><p>9.8 · CHOOSE BY WHAT MUST CHANGE</p><h4 id="ch09-customisation-title">A wrong answer does not automatically mean “train the model”</h4><span>Start with the failure. Change the request’s context when you can; change learned weights only when the behaviour must persist.</span></header>
  <div class="ch9-case"><span>THE FAILURE</span><strong>Support bot says returns are allowed for 60 days. The current policy says 30.</strong><p>What is actually missing or unreliable?</p></div>
  <div class="ch9-tree">
    <div class="ch9-root"><strong>WHAT NEEDS TO CHANGE?</strong><span>Follow the reason the output is wrong.</span></div>
    <div class="ch9-root-split"><strong>CHOOSE THE CAUSE — THIS IS NOT A LADDER</strong><span aria-hidden="true">↙ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↘</span></div>
    <section class="ch9-lane ch9-context-lane" aria-label="Methods that change the context for one request without changing learned weights">
      <div class="ch9-lane-head"><b>CHANGE WHAT THIS REQUEST CAN SEE</b><span>weights stay unchanged · supplied again when needed</span></div>
      <div class="ch9-choice"><p><strong>Are the instructions, examples or format unclear?</strong><span>“Use this exact refund template.”</span></p><b aria-hidden="true">↓</b><div><small>USE</small><strong>PROMPT + SYSTEM INSTRUCTIONS + EXAMPLES</strong></div></div>
      <div class="ch9-choice"><p><strong>Is current or private information missing?</strong><span>The bot needs the actual 30-day policy.</span></p><b aria-hidden="true">↓</b><div><small>USE</small><strong>RAG · RETRIEVE THE POLICY INTO CONTEXT</strong></div></div>
      <p class="ch9-expiry"><strong>AFTER THE REQUEST:</strong> this supplied context expires unless the product supplies it again.</p>
    </section>
    <section class="ch9-lane ch9-weights-lane" aria-label="Methods that change learned weights before later requests">
      <div class="ch9-lane-head"><b>CHANGE LEARNED BEHAVIOUR BEFORE USE</b><span>weights change · effect can persist across requests</span></div>
      <div class="ch9-choice"><p><strong>Must a specialised behaviour or format become reliable?</strong><span>Prompting was tested first but is not enough.</span></p><b aria-hidden="true">↓</b><div><small>USE</small><strong>FINE-TUNING ON CURATED EXAMPLES</strong></div></div>
      <div class="ch9-choice"><p><strong>Must broad helpfulness or safety preferences be shaped?</strong><span>People compare or judge model outputs.</span></p><b aria-hidden="true">↓</b><div><small>USE</small><strong>RLHF OR DPO</strong></div></div>
      <div class="ch9-choice ch9-foundation"><p><strong>Do you truly need a new general foundation model?</strong><span>This is not ordinary product customisation.</span></p><b aria-hidden="true">↓</b><div><small>USE</small><strong>FULL PRE-TRAINING</strong></div></div>
      <p class="ch9-persist"><strong>AFTER TRAINING:</strong> changed weights are deployed, then each live request can still add prompts and RAG.</p>
    </section>
  </div>
  <aside class="ch9-combine"><strong>REAL SYSTEMS COMBINE METHODS</strong><span>A fine-tuned model can still receive clear instructions and retrieved policy text. The choice is not one permanent rung; it is a diagnosis of what needs to change.</span></aside>
  <div class="ch9-rule"><b>PROMPT FOR INSTRUCTIONS</b><span>+</span><b>RETRIEVE FOR KNOWLEDGE</b><span>+</span><b>FINE-TUNE FOR PERSISTENT BEHAVIOUR</b></div>
  <figcaption id="ch09-customisation-caption"><strong>Use the diagnostic:</strong> missing directions or examples → prompt/context; missing current or private facts → RAG; persistent specialised behaviour → fine-tuning; broad preference shaping → RLHF/DPO; a whole new foundation model → pre-training. Prompting and RAG do not retrain the model.</figcaption>
</figure>`;
}

function renderChapterOneVisual(asset) {
  const sprite = (name, className, label) => `<div class="ch1-art ${className}" role="img" aria-label="${escapeAttribute(label)}" style="--sprite:url('${escapeAttribute(chapterOneSprites[name])}')"></div>`;
  const header = (eyebrow, title, question) => `<header class="ch1-visual-head"><p>${escapeHtml(eyebrow)}</p><h4 id="${asset.id}-title">${escapeHtml(title)}</h4><span>${escapeHtml(question)}</span></header>`;
  if (asset.kind === "core-distinction") {
    return `<figure class="ch1-visual ch1-core" data-teaching-visual="${asset.id}" aria-labelledby="${asset.id}-title">${header("1.1 · THE CORE DISTINCTION", "The human job is what changes", "Both systems involve people. Look at the job people do before the software makes a decision.")}<div class="ch1-lane ch1-lane-automation"><h5>ORDINARY AUTOMATION</h5><div class="ch1-track"><section>${sprite("womanRulebook", "ch1-art-rule-woman", "A woman writing an exact if-this-then-that rule on an index card")}<p class="ch1-job"><span>HUMAN JOB</span><strong>Write the rule</strong><small>“If this happens, do that.”</small></p></section><span class="ch1-connector" aria-hidden="true">→</span><section>${sprite("rules", "ch1-art-software", "Ordinary software windows producing one predictable chart result")}<p class="ch1-job"><span>SOFTWARE JOB</span><strong>Follow that rule</strong><small>The instruction determines the result.</small></p></section></div></div><div class="ch1-lane ch1-lane-ai"><h5>AI</h5><div class="ch1-track"><section>${sprite("rules", "ch1-art-examples", "Women sorting many emails into two labelled groups")}<p class="ch1-job"><span>HUMAN JOB</span><strong>Provide labelled examples</strong><small>Show what counts as spam and what does not.</small></p></section><span class="ch1-connector ch1-connector-teach" aria-hidden="true">teaches →</span><section>${sprite("rules", "ch1-art-pattern", "A computer comparing a new email with repeated patterns and returning one result")}<p class="ch1-job"><span>AI JOB</span><strong>Find repeated patterns</strong><small>Then apply the learned pattern to something new.</small></p></section></div><ol class="ch1-later-flow" aria-label="What happens after learning"><li><span>LATER</span>One new email arrives</li><li>AI compares it with learned patterns</li><li>One result: spam</li></ol><p class="ch1-later-mobile"><span>LATER</span>New email → compare with learned pattern → spam</p></div><figcaption><strong>The seam:</strong> automation receives a rule; AI receives examples and learns a pattern. A human is involved in both; the human provides a different kind of input.</figcaption></figure>`;
  }
  if (asset.kind === "generalisation") {
    return `<figure class="ch1-visual ch1-generalisation" data-teaching-visual="${asset.id}" aria-labelledby="${asset.id}-title">${header("1.3 · GENERALISATION", "How examples help with a new case", "The system is not saving one perfect photograph. It learns which visual features keep repeating.")}<div class="ch1-three-step"><section>${sprite("products", "ch1-art-face-examples", "Six photos showing the same woman at different ages, angles and lighting")}<p class="ch1-job"><span>1 · EXAMPLES</span><strong>Same person, many variations</strong><small>People supply or confirm the correct grouping.</small></p></section><span class="ch1-connector" aria-hidden="true">→</span><section class="ch1-likeness-map"><div class="ch1-likeness-visual">${sprite("products", "ch1-art-face-pattern", "A simplified learned likeness built from repeating facial features rather than one stored photograph")}<span aria-hidden="true">LEARNED LIKENESS</span></div><p class="ch1-job"><span>2 · LEARN</span><strong>Keep what stays recognisable</strong><small>Not one stored photo: a learned likeness built from the repeated examples.</small></p></section><span class="ch1-connector" aria-hidden="true">→</span><section>${sprite("products", "ch1-art-face-new", "A phone matching a new angled photo to the correct group of the same woman's photos")}<p class="ch1-job"><span>3 · MATCH</span><strong>Recognise a new photo</strong><small>The angle and lighting can differ from the examples.</small></p></section></div><figcaption><strong>What transferred:</strong> the examples taught the system enough of the likeness to match a new photo—even though nobody wrote a separate rule for that angle or lighting. Chapter 5 explains the internal learning process.</figcaption></figure>`;
  }
  if (asset.kind === "one-product-both") {
    return `<figure class="ch1-visual ch1-product-both" data-teaching-visual="${asset.id}" aria-labelledby="${asset.id}-title">${header("1.4 · SAME PRODUCT, TWO MECHANISMS", "One inbox, two decision routes", "Both routes end inside the same inbox—but they do not make the decision in the same way.")}<div class="ch1-inbox-map"><div class="ch1-inbox-visual">${sprite("products", "ch1-art-email-cutaway", "One inbox split into a written-rule route and a learned-pattern route")}<span class="ch1-route-label ch1-route-rule">RULE <b>→</b> PROMOTIONS</span><span class="ch1-route-label ch1-route-learned">PATTERN <b>→</b> SPAM</span></div><div class="ch1-inbox-routes"><section><span>ROUTE 1 · AUTOMATION</span><strong>Sender → Promotions</strong><p>You wrote this exact filter. Every matching email follows it.</p></section><section><span>ROUTE 2 · AI</span><strong>New message → Spam</strong><p>AI learned the pattern from examples—even if this sender is new.</p></section></div></div><p class="ch1-product-landing">ONE PRODUCT <b>→</b> TWO DIFFERENT DECISION ROUTES</p><figcaption><strong>The useful question:</strong> do not ask whether an entire product “is AI.” Ask which route followed your rule and which route learned from examples.</figcaption></figure>`;
  }
  return `<aside class="ch1-summary-check" data-chapter-one-summary="${asset.id}" aria-labelledby="${asset.id}-title">${header("1.4 · USE IT YOURSELF", "Three questions for any ‘AI-powered’ claim", "This is a compact check—not another diagram.")}<ol><li><span>01</span><div><strong>What exact feature learned from examples?</strong><small>If nobody can name it, the AI claim has not been explained.</small></div></li><li><span>02</span><div><strong>What feature follows written rules?</strong><small>Useful automation does not become AI because of the label.</small></div></li><li><span>03</span><div><strong>Is the AI the whole product—or one feature?</strong><small>One learned feature does not make every decision inside the product AI.</small></div></li></ol><p><strong>The habit:</strong> “Which part learned from examples, and which part follows rules someone wrote?”</p></aside>`;
}

const systemMapGroups = [
  { id: "physical", label: "Physical foundation", nodes: [
    { chapter: 18, label: "Supply chain", role: "Materials, machines, memory and manufacturing" },
    { chapter: 16, label: "Chips + compute", role: "The processors that do the calculations" },
    { chapter: 17, label: "Data centres", role: "Power, cooling, networking and servers" },
  ] },
  { id: "building", label: "Build the model", nodes: [
    { chapter: 3, label: "Data", role: "Examples and human labels" },
    { chapter: 4, label: "Tokens", role: "Processable pieces of text, images and audio" },
    { chapter: 5, label: "Training + model", role: "Adjust weights, then freeze the learned model" },
    { chapter: 9, label: "Optional customisation", role: "Refine behaviour, knowledge or efficiency" },
  ] },
  { id: "runtime", label: "Use the model", nodes: [
    { chapter: 10, label: "Product stack", role: "Interface, routing, tools and orchestration" },
    { chapter: 8, label: "Context + retrieval", role: "What this request can see right now" },
    { chapter: 7, label: "Inference", role: "Run the frozen model on a new request" },
    { chapter: 6, label: "Output + modalities", role: "Text, images, audio, video or an action" },
  ] },
  { id: "controls", label: "Controls across the system", nodes: [
    { chapter: 11, label: "Safety controls", role: "Shape and filter behaviour" },
    { chapter: 12, label: "Evaluation", role: "Test whether it works for the real task" },
    { chapter: 13, label: "Sandboxing", role: "Contain risky actions and require approval" },
  ] },
  { id: "orchestration", label: "Multi-step work", nodes: [
    { chapter: 14, label: "Agents", role: "Repeat model, tool and feedback steps toward a goal" },
    { chapter: 15, label: "System craft", role: "Design prompts, context, loops and graphs" },
  ] },
  { id: "people", label: "People and responsibility", nodes: [
    { chapter: 19, label: "People + governance", role: "Build, operate, evaluate and govern every layer" },
  ] },
];

function renderSystemMap(throughChapter) {
  const complete = throughChapter === 20;
  const current = systemMapGroups.flatMap(group => group.nodes).find(node => node.chapter === throughChapter);
  if (!complete) {
    if (throughChapter < 3) return "";
    return `<aside class="map-piece" data-chapter="${throughChapter}" aria-label="Chapter ${throughChapter} map piece"><span>ADD THIS TO YOUR AI SYSTEM MAP</span><strong>${escapeHtml(current?.label || `Chapter ${throughChapter}`)}</strong><p>${escapeHtml(current?.role || "Connect this chapter to the whole system.")}</p></aside>`;
  }
  const node = (chapter, label, role, className = "") => `<div class="map-node ${className}"><small>${chapter ? `CH ${chapter}` : "SYSTEM INPUT"}</small><strong>${escapeHtml(label)}</strong><span>${escapeHtml(role)}</span></div>`;
  const arrow = '<span class="map-arrow" aria-hidden="true">→</span>';
  return `<figure class="system-map system-map-complete" aria-labelledby="system-map-title-20"><div class="system-map-heading"><p>THE COMPLETE AI SYSTEM MAP</p><h3 id="system-map-title-20">How materials, data and a request become an AI result</h3><span>Hardware, software and human responsibility in one connected system.</span></div>
    <div class="ai-system-blueprint" role="group" aria-describedby="system-map-caption">
      <div class="map-governance"><strong>PEOPLE + GOVERNANCE SURROUND THE WHOLE SYSTEM</strong><span>People choose the goal, data, design, routes, permissions, tests, deployment and response when something goes wrong.</span></div>
      <section class="map-track map-track-physical"><h4>1 · BUILD THE PHYSICAL FOUNDATION</h4><div class="map-track-flow">${node(18,"Supply chain","Materials, fabrication equipment and manufacturing")}${arrow}${node(16,"Chips + memory","Processors and memory perform and hold the calculations")}${arrow}${node(17,"Servers + data centres","Servers, networking, power and cooling keep compute available")}</div></section>
      <div class="hardware-to-work"><span>COMPUTE POWERS TRAINING ↓</span><span>COMPUTE POWERS EACH RESPONSE ↓</span></div>
      <section class="map-track map-track-build"><h4>2 · BUILD THE MODEL</h4><div class="map-track-flow">${node(3,"Data","Selected examples + human labels")}${arrow}${node(4,"Tokens","Turn material into processable pieces")}${arrow}${node(5,"Training","Adjust weights through repeated comparison")}${arrow}${node(5,"Learned model","Frozen numerical patterns","map-node-emphasis")}${arrow}${node(9,"Optional model tuning","Fine-tuning or distillation changes the model before use")}</div></section>
      <div class="model-to-use"><span aria-hidden="true">↓</span><strong>The learned model powers each new request</strong></div>
      <section class="map-track map-track-use"><h4>3 · USE THE MODEL FOR A NEW REQUEST</h4><div class="map-track-flow">${node(null,"Person + request","The job, instruction and information supplied now")}${arrow}${node(10,"Product stack","Interface, routing and product rules")}${arrow}${node(8,"Current context","Prompt, selected history and retrieved sources")}${arrow}${node(7,"Inference","Run the learned model on this request","map-node-emphasis")}${arrow}${node(6,"Output","Text, image, audio, video or another result")}</div></section>
      <section class="map-crosscuts"><h4>SAFETY + EVALUATION CROSS BOTH BUILDING AND USE</h4><div>${node(11,"Safety","Shape behaviour and check inputs or outputs")}${node(12,"Evaluation","Test the real task, edge cases and failures")}</div></section>
      <section class="map-track map-track-multistep"><h4>4 · OPTIONAL TOOL LOOP FOR MULTI-STEP WORK</h4><div class="map-track-flow">${node(14,"Model proposes a tool","Name a tool and supply proposed arguments")}${arrow}${node(13,"Permission + sandbox","The application validates, limits and authorises")}${arrow}${node(14,"Tool runs","Only the approved action can reach the allowed resource")}${arrow}${node(14,"Result returns","Add the observation to the current context")}${arrow}${node(7,"Inference continues","Revise, use another tool, answer or stop","map-node-emphasis")}</div><p class="map-loop-return">THE TOOL RESULT RETURNS TO CONTEXT + INFERENCE BEFORE A FINAL OUTPUT</p></section>
      <div class="map-frontier"><strong>HUMAN REVIEW + CONSEQUENCE</strong><span>A person or organisation decides whether to use, revise, approve, publish or act on the result—and remains responsible for the consequence.</span></div>
    </div>
    <div class="map-draw-guide"><h4>Draw it from memory</h4><ol><li>Draw the physical foundation.</li><li>Add the path that builds a model.</li><li>Draw the path that uses it for a new request.</li><li>Place safety and evaluation across building and use.</li><li>Draw sandboxing around the optional tool loop.</li><li>Put people, product design and governance around the whole system.</li></ol></div>
    <figcaption id="system-map-caption"><strong>How to read it:</strong> the physical system supplies compute; data and training create a learned model; the software system combines a person’s request with product rules and current context; inference produces a result. Optional tools sit inside a permissioned loop and return their results to inference before the final output. People, product design, safety and evaluation govern the system rather than appearing as one last runtime step.</figcaption></figure>`;
}

function stripText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--.*?-->/gs, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[*_#>|`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function applyRewindAmendments(markdown, amendments, sourceSha) {
  if (amendments.schemaVersion !== "laidies-library-rewind-amendments.v1") {
    throw new Error(`unsupported Rewind amendment schema: ${amendments.schemaVersion}`);
  }
  if (amendments.sourceSha256 !== sourceSha) {
    throw new Error("Rewind amendments are not bound to the current immutable manuscript");
  }
  const seen = new Set();
  let enriched = markdown;
  for (const reference of amendments.references) {
    if (!reference.id || seen.has(reference.id)) throw new Error(`duplicate or missing Rewind reference id: ${reference.id}`);
    seen.add(reference.id);
    const occurrences = enriched.split(reference.anchor).length - 1;
    if (occurrences !== 1) throw new Error(`${reference.id} expected one exact anchor; found ${occurrences}`);
    if (reference.mode === "retain") continue;
    if (reference.mode === "replace") {
      if (!reference.copy) throw new Error(`${reference.id} replacement is empty`);
      enriched = enriched.replace(reference.anchor, reference.copy);
      continue;
    }
    if (reference.mode === "after") {
      if (!reference.copy) throw new Error(`${reference.id} insertion is empty`);
      enriched = enriched.replace(reference.anchor, `${reference.anchor}\n\n${reference.copy}`);
      continue;
    }
    if (reference.mode === "before") {
      if (!reference.copy) throw new Error(`${reference.id} insertion is empty`);
      enriched = enriched.replace(reference.anchor, `${reference.copy}\n\n${reference.anchor}`);
      continue;
    }
    if (reference.mode === "append") {
      if (!reference.copy) throw new Error(`${reference.id} appended copy is empty`);
      enriched = enriched.replace(reference.anchor, `${reference.anchor} ${reference.copy}`);
      continue;
    }
    throw new Error(`${reference.id} has unsupported mode ${reference.mode}`);
  }
  return enriched;
}

function buildClaimInventory(manuscript, chapters) {
  const volatilityPatterns = [
    { id: "dated-2026", pattern: /\b2026\b/gi, risk: "TIME_SENSITIVE" },
    { id: "price-cost", pattern: /\b(?:price|pricing|costs?|charged|expensive|billion|million)\b/gi, risk: "COMMERCIAL_OR_NUMERICAL" },
    { id: "company-product", pattern: /\b(?:OpenAI|Anthropic|Google|Meta|Amazon|Microsoft|NVIDIA|TSMC|ASML|ChatGPT|Claude|Gemini)\b/gi, risk: "PROVIDER_OR_COMPANY" },
    { id: "absolute-language", pattern: /\b(?:always|never|nothing|everything|entire|exactly|only|guarantee[ds]?)\b/gi, risk: "OVERSTATEMENT_REVIEW" },
    { id: "study-research", pattern: /\b(?:study|research|researchers|benchmark|survey|paper)\b/gi, risk: "EVIDENCE_REQUIRED" },
  ];
  return {
    schemaVersion: "laidies-library-claim-inventory.v1",
    bookId: "ai-fundamentals-101",
    status: "ALI_VETTED_SOURCE_IMPORT_FRESHNESS_REGISTERED",
    generatedAt: "2026-08-16",
    sourcePath: rel(paths.manuscript),
    sourceSha256: sha256(readBytes(paths.manuscript)),
    derivedWithRewindAmendmentsSha256: sha256(Buffer.from(manuscript)),
    publicationBoundary: "This inventory finds review candidates. It does not establish that a sentence is a factual claim, current, sourced or correct.",
    chapters: chapters.map((chapter, index) => {
      const chapterStart = manuscript.indexOf(`# Chapter ${index + 1}:`);
      const chapterEnd = index + 1 < chapters.length ? manuscript.indexOf(`# Chapter ${index + 2}:`) : manuscript.length;
      const text = manuscript.slice(chapterStart, chapterEnd);
      return {
        chapterId: chapter.id,
        title: chapter.title,
        wordCount: stripText(text).split(/\s+/).filter(Boolean).length,
        sourceStatus: "ALI_VETTED_EXACT_SOURCE_BYTES",
        sourceBindings: [],
        reviewSignals: volatilityPatterns.map(pattern => ({
          id: pattern.id,
          risk: pattern.risk,
          matches: [...text.matchAll(pattern.pattern)].length,
        })).filter(signal => signal.matches > 0),
      };
    }),
  };
}

function buildReviewPage(source, fragment, manuscript) {
  const nav = source.chapters.map((chapter, index) => {
    const number = index + 1;
    const part = chapterPart(number);
    const previousPart = index ? chapterPart(index) : null;
    return `${part !== previousPart ? `<li class="toc-part">${escapeHtml(part)}</li>` : ""}<li><a href="#${chapter.id}">${escapeHtml(chapter.navLabel)}</a></li>`;
  }).join("");
  const chapterLinks = source.chapters.map((chapter, index) => {
    const previous = source.chapters[index - 1];
    const next = source.chapters[index + 1];
    return `${visualTeachingLayerActive ? renderSystemMap(index + 1) : ""}<nav class="chapter-turn" data-for="${chapter.id}" aria-label="Chapter ${index + 1} navigation">${previous ? `<a href="#${previous.id}">← Chapter ${index}</a>` : `<a href="#how-this-book-works">← Start here</a>`}<span>${escapeHtml(chapterPart(index + 1))}</span>${next ? `<a href="#${next.id}">Chapter ${index + 2} →</a>` : `<a href="#how-this-book-works">Back to start ↑</a>`}</nav>`;
  });
  let mainFragment = fragment.replace(/<nav class="book-contents"[\s\S]*?<\/nav>/, "");
  for (const [start, end, label] of partMap) {
    const [partNumber, partTitle] = label.split(" · ");
    const chapterLabel = start === end ? `Chapter ${start}` : `Chapters ${start}–${end}`;
    const boundary = `<h2 id="chapter-${start}"`;
    const opener = `<section class="part-opener" aria-labelledby="part-${start}-title"><p class="part-number">${escapeHtml(partNumber)}</p><h2 id="part-${start}-title">${escapeHtml(partTitle)}</h2><p class="part-chapters">${chapterLabel}</p></section>`;
    if (!mainFragment.includes(boundary)) throw new Error(`missing first chapter for ${label}`);
    mainFragment = mainFragment.replace(boundary, `${opener}\n${boundary}`);
  }
  source.chapters.forEach((chapter, index) => {
    const chapterNumber = index + 1;
    const headingStart = `<h2 id="${chapter.id}"`;
    const start = mainFragment.indexOf(headingStart);
    const end = start < 0 ? -1 : mainFragment.indexOf("</h2>", start);
    if (start < 0 || end < 0) throw new Error(`missing chapter heading for concept diagram: ${chapter.id}`);
    const headingEnd = end + "</h2>".length;
    const firstSectionText = `>${chapterNumber}.1 `;
    const firstSectionTextIndex = mainFragment.indexOf(firstSectionText, headingEnd);
    const firstSectionStart = firstSectionTextIndex < 0 ? -1 : mainFragment.lastIndexOf("<h3", firstSectionTextIndex);
    if (firstSectionStart < headingEnd) throw new Error(`missing first numbered section for ${chapter.id}`);
    const chapterFrontMatter = mainFragment.slice(headingEnd, firstSectionStart);
    mainFragment = `${mainFragment.slice(0, headingEnd)}\n<section class="chapter-ahead" aria-labelledby="chapter-${chapterNumber}-ahead-title"><p class="chapter-ahead-title" id="chapter-${chapterNumber}-ahead-title">What you will learn + the words you will need</p><div class="chapter-ahead-body">${chapterFrontMatter}</div></section>\n${mainFragment.slice(firstSectionStart)}`;
  });
  if (chapterOnePurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<aside class="callout callout-key"><p>📌 <strong>The Core Distinction</strong>';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 1.1 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterOnePurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterOneProductCutawayVisualActive) {
    const productCutawayAnchor = "Both are working on your email simultaneously.</p>";
    const productCutawayStart = mainFragment.indexOf(productCutawayAnchor);
    if (productCutawayStart < 0) throw new Error("missing Chapter 1.4 product-cutaway placement anchor");
    const productCutawayInsertion = productCutawayStart + productCutawayAnchor.length;
    mainFragment = `${mainFragment.slice(0, productCutawayInsertion)}\n${renderChapterOneProductCutawayVisual()}\n${mainFragment.slice(productCutawayInsertion)}`;
  }
  if (chapterTwoPurposeBuiltVisualActive) {
    const placements = [
      {
        anchor: '<h3 id="ch-2-2-3-the-timeline-why-it-took-so-long-and-then-seemed-to-happen-all-at-once">',
        render: renderChapterTwoJobsVisual,
        label: "Chapter 2.2 four-jobs visual",
      },
      {
        anchor: '<h3 id="ch-2-2-4-agentic-ai-the-layer-that-acts">',
        render: renderChapterTwoTimelineVisual,
        label: "Chapter 2.3 convergence-timeline visual",
      },
      {
        anchor: '<h3 id="ch-2-2-5-variations-within-the-family-size-openness-and-thinking">',
        render: renderChapterTwoAgentVisual,
        label: "Chapter 2.4 agent-tool-loop visual",
      },
      {
        anchor: '<h3 id="ch-2-2-6-chapter-summary">',
        render: renderChapterTwoTradeoffsVisual,
        label: "Chapter 2.5 model-tradeoffs visual",
      },
    ];
    for (const { anchor, render, label } of placements) {
      const insertion = mainFragment.indexOf(anchor);
      if (insertion < 0) throw new Error(`missing ${label} placement anchor`);
      mainFragment = `${mainFragment.slice(0, insertion)}\n${render()}\n${mainFragment.slice(insertion)}`;
    }
  }
  if (chapterThreePurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<h4 id="ch-3-the-obvious-version">The obvious version</h4>';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 3.5 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterThreePurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterFourPurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<aside class="callout callout-question"><p>⏸️ <strong>Why does this matter to you?</strong>';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 4.3 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterFourPurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterFivePurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<aside class="callout callout-insight"><p>💡 <strong>Why "millions of times"?</strong>';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 5.5 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterFivePurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterSixPurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<h4 id="ch-6-what-the-model-actually-sees">What the model actually "sees"</h4>';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 6.2 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterSixPurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterSevenPurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<h3 id="ch-7-7-3-why-the-same-prompt-gives-different-answers">7.3 — Why the Same Prompt Gives Different Answers</h3>';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 7.2 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterSevenPurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterEightPurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<aside class="callout callout-insight"><p>💡 <strong>Training vs RAG — two ways to give a model information</strong>';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 8.6 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterEightPurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterNinePurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<h3 id="ch-9-9-9-the-system-picture-so-far">';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 9.8 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterNinePurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterTenPurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<h3 id="ch-10-10-8-the-system-picture-so-far">';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 10.7 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterTenPurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterElevenPurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<aside class="callout callout-question"><p>⏸️ <strong>"What can different layers catch?"</strong>';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 11.2 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterElevenPurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterTwelvePurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<h3 id="ch-12-12-6-the-fundamental-difficulty-no-single-right-answer">';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 12.5 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterTwelvePurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (chapterThirteenPurposeBuiltVisualActive) {
    const purposeBuiltAnchor = '<h3 id="ch-13-13-5-the-trade-off-useful-action-without-uncontrolled-consequences">';
    const purposeBuiltInsertion = mainFragment.indexOf(purposeBuiltAnchor);
    if (purposeBuiltInsertion < 0) throw new Error("missing Chapter 13.4 purpose-built visual placement anchor");
    mainFragment = `${mainFragment.slice(0, purposeBuiltInsertion)}\n${renderChapterThirteenPurposeBuiltVisual()}\n${mainFragment.slice(purposeBuiltInsertion)}`;
  }
  if (visualTeachingLayerActive) {
    for (const asset of chapterOneTeachingAssets) {
      const anchorIndex = mainFragment.indexOf(asset.anchor);
      if (anchorIndex < 0) throw new Error(`missing placement anchor for teaching visual ${asset.id}`);
      const tagIndex = mainFragment.indexOf(asset.afterTag, anchorIndex);
      if (tagIndex < 0) throw new Error(`missing placement boundary for teaching visual ${asset.id}`);
      const insertion = tagIndex + asset.afterTag.length;
      mainFragment = `${mainFragment.slice(0, insertion)}\n${renderChapterOneVisual(asset)}\n${mainFragment.slice(insertion)}`;
    }
    for (const concept of [...conceptDiagrams].sort((a, b) => Number(b.after.split(".")[0]) * 100 + Number(b.after.split(".")[1]) - (Number(a.after.split(".")[0]) * 100 + Number(a.after.split(".")[1])))) {
      const sectionTextIndex = mainFragment.indexOf(`>${concept.after} `);
      const sectionHeadingStart = sectionTextIndex < 0 ? -1 : mainFragment.lastIndexOf("<h3", sectionTextIndex);
      const sectionHeadingEnd = sectionHeadingStart < 0 ? -1 : mainFragment.indexOf("</h3>", sectionHeadingStart);
      const diagramInsertion = sectionHeadingEnd < 0 ? -1 : mainFragment.indexOf("<h3", sectionHeadingEnd + 5);
      if (sectionHeadingStart < 0 || diagramInsertion < 0) throw new Error(`missing placement boundary for concept diagram after ${concept.after}`);
      mainFragment = `${mainFragment.slice(0, diagramInsertion)}\n${renderConceptDiagram(concept)}\n${mainFragment.slice(diagramInsertion)}`;
    }
  }
  if (representativeTeachingVisualActive) {
    if (chapterOneDecisionSeamActive) {
      const decisionSeamAnchor = '<aside class="callout callout-key"><p>📌 <strong>The Core Distinction</strong>';
      const decisionSeamInsertion = mainFragment.indexOf(decisionSeamAnchor);
      if (decisionSeamInsertion < 0) throw new Error("missing Chapter 1.1 representative visual placement anchor");
      mainFragment = `${mainFragment.slice(0, decisionSeamInsertion)}\n${renderChapterOneDecisionSeam()}\n${mainFragment.slice(decisionSeamInsertion)}`;
    }
    if (chapterTwoJobFamilyActive) {
      const jobFamilyAnchor = '<aside class="callout callout-key"><p>📌 <strong>The Four Layers — Complete Picture</strong>';
      const jobFamilyInsertion = mainFragment.indexOf(jobFamilyAnchor);
      if (jobFamilyInsertion < 0) throw new Error("missing Chapter 2.4 representative visual placement anchor");
      mainFragment = `${mainFragment.slice(0, jobFamilyInsertion)}\n${renderChapterTwoJobFamily()}\n${mainFragment.slice(jobFamilyInsertion)}`;
    }
    if (chapterThreeDataLifecycleActive) {
      const dataLifeAnchor = '<h3 id="ch-3-3-4-supervised-unsupervised-and-the-spectrum-between">';
      const dataLifeInsertion = mainFragment.indexOf(dataLifeAnchor);
      if (dataLifeInsertion < 0) throw new Error("missing Chapter 3.3 representative visual placement anchor");
      mainFragment = `${mainFragment.slice(0, dataLifeInsertion)}\n${renderChapterThreeDataLifecycle()}\n${mainFragment.slice(dataLifeInsertion)}`;
    }
    if (chapterFiveTrainingLoopActive) {
      const trainingLoopAnchor = '<h3 id="ch-5-5-6-the-transformer-the-architecture-that-made-this-generation-possible">';
      const trainingLoopInsertion = mainFragment.indexOf(trainingLoopAnchor);
      if (trainingLoopInsertion < 0) throw new Error("missing Chapter 5.5 representative visual placement anchor");
      mainFragment = `${mainFragment.slice(0, trainingLoopInsertion)}\n${renderChapterFiveTrainingLoop()}\n${mainFragment.slice(trainingLoopInsertion)}`;
    }
    if (chapterFourTokenProofActive) {
      const tokenProofAnchor = '<aside class="callout callout-question"><p>⏸️ <strong>Why does this matter to you?</strong>';
      const tokenProofInsertion = mainFragment.indexOf(tokenProofAnchor);
      if (tokenProofInsertion < 0) throw new Error("missing Chapter 4.3 representative visual placement anchor");
      mainFragment = `${mainFragment.slice(0, tokenProofInsertion)}\n${renderChapterFourTokenProof()}\n${mainFragment.slice(tokenProofInsertion)}`;
    }
    const patchProofAnchor = '<h4 id="ch-6-what-the-model-actually-sees">What the model actually "sees"</h4>';
    const patchProofInsertion = mainFragment.indexOf(patchProofAnchor);
    if (patchProofInsertion < 0) throw new Error("missing Chapter 6.2 representative visual placement anchor");
    mainFragment = `${mainFragment.slice(0, patchProofInsertion)}\n${renderChapterSixPatchProof()}\n${mainFragment.slice(patchProofInsertion)}`;
    if (chapterSevenRequestJourneyActive) {
      const requestJourneyAnchor = '<h3 id="ch-7-7-3-why-the-same-prompt-gives-different-answers">';
      const requestJourneyInsertion = mainFragment.indexOf(requestJourneyAnchor);
      if (requestJourneyInsertion < 0) throw new Error("missing Chapter 7.2 representative visual placement anchor");
      mainFragment = `${mainFragment.slice(0, requestJourneyInsertion)}\n${renderChapterSevenRequestJourney()}\n${mainFragment.slice(requestJourneyInsertion)}`;
    }
    if (chapterEightContextRetrievalActive) {
      const contextRetrievalAnchor = '<aside class="callout callout-insight"><p>💡 <strong>Training vs RAG — two ways to give a model information</strong>';
      const contextRetrievalInsertion = mainFragment.indexOf(contextRetrievalAnchor);
      if (contextRetrievalInsertion < 0) throw new Error("missing Chapter 8.6 representative visual placement anchor");
      mainFragment = `${mainFragment.slice(0, contextRetrievalInsertion)}\n${renderChapterEightContextRetrieval()}\n${mainFragment.slice(contextRetrievalInsertion)}`;
    }
    if (chapterNineCustomisationDecisionActive) {
      const customisationDecisionAnchor = '<h3 id="ch-9-9-9-the-system-picture-so-far">';
      const customisationDecisionInsertion = mainFragment.indexOf(customisationDecisionAnchor);
      if (customisationDecisionInsertion < 0) throw new Error("missing Chapter 9.8 representative visual placement anchor");
      mainFragment = `${mainFragment.slice(0, customisationDecisionInsertion)}\n${renderChapterNineCustomisationDecision()}\n${mainFragment.slice(customisationDecisionInsertion)}`;
    }
  }
  source.chapters.slice(0, -1).forEach((chapter, index) => {
    const boundary = `<h2 id="${source.chapters[index + 1].id}"`;
    if (!mainFragment.includes(boundary)) throw new Error(`missing chapter boundary after ${chapter.id}`);
    mainFragment = mainFragment.replace(boundary, `${chapterLinks[index]}\n${boundary}`);
  });
  const finalWrapperClose = mainFragment.lastIndexOf("</div>");
  if (finalWrapperClose < 0) throw new Error("rendered book is missing its final wrapper close");
  mainFragment = `${mainFragment.slice(0, finalWrapperClose)}${chapterLinks.at(-1)}\n${mainFragment.slice(finalWrapperClose)}`;
  const wordCount = stripText(manuscript).split(/\s+/).filter(Boolean).length;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>AI Fundamentals 101 — internal textbook build</title>
<style>
:root{--ink:#111a3e;--navy:#101842;--electric-purple:#6b2cff;--electric-pink:#ed238c;--electric-cyan:#00aeca;--mint:#b9f4df;--paper:#fffdfa;--soft-blue:#e8f1ff;--soft-pink:#ffe9f5;--line:#ccd4ea;--muted:#58617d}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:linear-gradient(125deg,#b8e9ff 0%,#dccbff 47%,#ffd2ea 100%);color:var(--ink);font:18px/1.68 Georgia,"Times New Roman",serif}.build-banner{position:sticky;top:0;z-index:30;background:var(--navy);color:white;padding:.65rem 1rem;text-align:center;font:800 .8rem/1.2 Arial,sans-serif;letter-spacing:.08em}.reader-shell{width:min(1440px,100%);margin:0 auto;display:grid;grid-template-columns:330px minmax(0,1fr);min-height:100vh}.reader-toc{position:sticky;top:37px;height:calc(100vh - 37px);overflow:auto;background:rgba(16,24,66,.96);color:white;padding:1.25rem 1.1rem 3rem;border-right:6px solid var(--electric-pink)}.reader-toc .book-label{font:900 1.2rem/1 Arial,sans-serif;letter-spacing:-.02em;margin:.3rem 0 .35rem}.reader-toc .meta{color:#c6d7ff;font:600 .78rem/1.4 Arial,sans-serif;margin:0 0 1rem}.reader-toc ol{list-style:none;margin:0;padding:0}.reader-toc li{margin:0}.reader-toc a{display:block;color:white;text-decoration:none;padding:.35rem .5rem;border-radius:.45rem;font:700 .8rem/1.25 Arial,sans-serif}.reader-toc a:hover,.reader-toc a:focus-visible{background:var(--electric-purple);outline:2px solid white;outline-offset:1px}.toc-part{margin:1.1rem .5rem .3rem!important;color:#74e8ff;font:900 .7rem/1.25 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}.book-stage{padding:3rem clamp(1rem,4vw,5rem) 6rem}.gr-page{width:min(850px,100%);margin:0 auto;background:var(--paper);box-shadow:0 22px 70px rgba(18,20,70,.22);padding:clamp(1.4rem,5vw,5rem);border-top:12px solid var(--electric-purple);border-radius:.3rem}.eyebrow{font:900 .78rem/1 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--electric-purple)}h1{font:900 clamp(3.2rem,7vw,5rem)/.9 Arial,sans-serif;letter-spacing:-.06em;margin:.5rem 0 1rem;color:var(--navy)}.lede{font:700 clamp(1.2rem,2.6vw,1.55rem)/1.45 Arial,sans-serif;color:#343c67;border-left:8px solid var(--electric-pink);padding-left:1.2rem;margin-bottom:3rem}.gr-page>h2,.gr-page>section>h2{scroll-margin-top:4rem;font:900 clamp(2rem,5vw,3.25rem)/1.02 Arial,sans-serif;letter-spacing:-.035em;color:var(--navy);margin:5rem 0 1.4rem;padding-top:1.5rem;border-top:6px solid var(--electric-cyan)}#how-this-book-works{scroll-margin-top:4rem}h3{scroll-margin-top:4rem;font:900 clamp(1.45rem,3vw,2rem)/1.15 Arial,sans-serif;color:var(--electric-purple);margin:2.8rem 0 .75rem}h4{font:900 1.15rem/1.25 Arial,sans-serif;color:var(--navy);margin:2rem 0 .5rem}p,li{max-width:68ch}a{color:#4e18ca;text-decoration-thickness:.12em;text-underline-offset:.14em}.part-opener{scroll-margin-top:4rem;margin:6rem 0 2rem;padding:2rem 2.2rem;background:var(--navy);color:white;border-left:12px solid var(--electric-pink);box-shadow:12px 12px 0 var(--electric-cyan)}.part-opener .part-number{margin:0;color:#8eeeff;font:900 .9rem/1 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}.part-opener h2{margin:.55rem 0 .35rem!important;padding:0!important;border:0!important;color:white!important;font:900 clamp(2.4rem,6vw,4rem)/.95 Arial,sans-serif!important;letter-spacing:-.045em}.part-opener .part-chapters{margin:0;color:#ffd4ee;font:800 .9rem/1.2 Arial,sans-serif}.callout{margin:1.6rem 0;padding:1.1rem 1.25rem;border:2px solid var(--navy);border-left-width:10px;border-radius:.6rem;background:var(--soft-blue);font-family:Arial,sans-serif}.callout p:first-child{margin-top:0}.callout p:last-child{margin-bottom:0}.callout-key,.callout-objective{background:#e9f8ff;border-left-color:var(--electric-cyan)}.callout-question{background:var(--soft-pink);border-left-color:var(--electric-pink)}.callout-insight{background:#effff8;border-left-color:#18b989}.callout-landmark{background:#f1ebff;border-left-color:var(--electric-purple)}.callout-big-picture{background:#e6e9ff;border-left-color:#4558e8}.callout-practice{background:#fff0f8;border-left-color:#c9267f}.key-terms-reference{margin:3rem 0;padding:1.25rem;background:#eef4ff;border:3px solid var(--navy);border-top:10px solid var(--electric-purple);font-family:Arial,sans-serif}.key-terms-reference>h3{margin:.25rem 0 1rem;color:var(--navy);font-size:1.65rem}.key-terms-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.8rem;margin:0}.key-term-card{margin:0;padding:1rem;background:white;border:2px solid #b7c2df;border-left:8px solid var(--electric-cyan);border-radius:.45rem}.key-term-card dt{font-weight:900;color:var(--electric-purple);line-height:1.2}.key-term-card dd{margin:.45rem 0 0;color:var(--ink);font:500 .92rem/1.5 Arial,sans-serif}.answer-reveal{margin:1.5rem 0;border:3px solid var(--electric-purple);border-radius:.6rem;background:#f4f0ff;font-family:Arial,sans-serif}.answer-reveal summary{cursor:pointer;padding:1rem 1.15rem;font-weight:900;color:var(--navy);list-style-position:inside}.answer-reveal[open] summary{border-bottom:2px solid #cabbed}.answer-body{padding:.5rem 1.15rem 1.1rem}.table-scroll{overflow:auto;margin:1.4rem 0;border:2px solid var(--line);border-radius:.4rem}table{width:100%;border-collapse:collapse;font:500 .94rem/1.45 Arial,sans-serif}th,td{padding:.75rem;text-align:left;vertical-align:top;border-bottom:1px solid var(--line)}th{background:var(--navy);color:white;font-weight:800}tr:nth-child(even) td{background:#f6f8ff}pre{overflow:auto;background:var(--navy);color:white;padding:1rem;border-radius:.5rem;font-size:.85rem}code{font-family:"SFMono-Regular",Consolas,monospace}p code,li code{background:#edf0fa;padding:.08em .25em;border-radius:.2em;color:#371b7d}.chapter-turn{margin:3rem 0 5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding-top:1.2rem;border-top:2px solid var(--line);font:800 .8rem/1.2 Arial,sans-serif}.chapter-turn a{background:white;border:2px solid var(--navy);border-radius:999px;padding:.65rem .9rem;text-decoration:none}.chapter-turn span{color:var(--muted);text-align:center}.source-boundary{width:min(850px,100%);margin:0 auto 1rem;padding:1rem;background:#fff;border:3px solid var(--electric-pink);font:700 .9rem/1.45 Arial,sans-serif}.mobile-toc{display:none}
@media(max-width:850px){body{font-size:17px}.reader-shell{display:block}.reader-toc{position:static;height:auto;border-right:0;border-bottom:6px solid var(--electric-pink);padding:.9rem 1rem}.reader-toc ol{display:none}.reader-toc.open ol{display:block}.mobile-toc{display:block;width:100%;border:2px solid white;background:transparent;color:white;padding:.7rem;border-radius:.45rem;font-weight:800}.book-stage{padding:1rem 0 4rem}.gr-page{border-radius:0;box-shadow:none;padding:1.2rem}.chapter-turn span{display:none}.source-boundary{margin:0 1rem 1rem;width:auto}.part-opener{margin:4rem 0 1.5rem;padding:1.4rem;box-shadow:7px 7px 0 var(--electric-cyan)}.key-terms-grid{grid-template-columns:1fr}h1{font-size:clamp(2.55rem,12vw,3.35rem);overflow-wrap:anywhere}.gr-page>h2,.gr-page>section>h2,#how-this-book-works{scroll-margin-top:5rem}}
@media print{body{background:white}.build-banner,.reader-toc,.chapter-turn,.source-boundary{display:none}.reader-shell{display:block}.book-stage{padding:0}.gr-page{box-shadow:none;width:auto;padding:0;border:0}h2{break-before:page}.callout,.table-scroll{break-inside:avoid}}
.concept-diagram,.system-map{margin:2rem 0 3rem;padding:1.25rem;background:#f7f9ff;border:3px solid var(--navy);border-radius:.75rem;box-shadow:8px 8px 0 #c7d9ff;font-family:Arial,sans-serif}.concept-heading,.system-map-heading{margin:-1.25rem -1.25rem 1.25rem;padding:1.15rem 1.25rem;background:var(--navy);color:white;border-radius:.55rem .55rem 0 0}.concept-heading p,.system-map-heading p{margin:0;color:#8eeeff;font:900 .72rem/1 Arial,sans-serif;letter-spacing:.12em}.concept-heading h3,.system-map-heading h3{margin:.45rem 0 .35rem;color:white;font-size:1.55rem}.concept-heading>span,.system-map-heading>span{display:block;color:#ffd4ee;font-weight:700;line-height:1.35}.concept-flow{display:flex;align-items:stretch;gap:1.8rem;margin:0;padding:0;list-style:none}.concept-flow li{position:relative;display:flex;flex:1;min-width:0;align-items:center;gap:.6rem;padding:.9rem;background:white;border:2px solid #9cadd5;border-radius:.5rem;line-height:1.25}.concept-flow li:not(:last-child)::after{content:"→";position:absolute;right:-1.45rem;top:50%;transform:translateY(-50%);color:var(--electric-purple);font-size:1.25rem;font-weight:900}.concept-flow li>span{display:grid;place-items:center;flex:0 0 1.75rem;height:1.75rem;border-radius:50%;background:var(--electric-purple);color:white;font:900 .75rem/1 Arial,sans-serif}.concept-flow li>strong{font-size:.82rem}.concept-loop li:last-child::after{content:"↺";right:.25rem;top:auto;bottom:-1.9rem}.concept-lanes{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.concept-lanes section{margin:0;padding:1rem;background:#edf3ff;border-left:7px solid var(--electric-cyan);border-radius:.45rem}.concept-lanes section+section{background:#fff0f8;border-left-color:var(--electric-pink)}.concept-lanes h4{margin:0 0 .75rem}.concept-lanes .concept-flow{display:grid;gap:1.45rem}.concept-lanes .concept-flow li:not(:last-child)::after{content:"↓";right:auto;left:50%;top:auto;bottom:-1.35rem;transform:translateX(-50%)}.concept-branches{display:grid;grid-template-columns:minmax(120px,.7fr) 2fr;gap:1.25rem;align-items:center}.concept-hub{display:grid;place-items:center;min-height:120px;padding:1rem;background:var(--electric-purple);color:white;text-align:center;border-radius:50%;line-height:1.2}.concept-branches ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.7rem;margin:0;padding:0;list-style:none}.concept-branches li{margin:0;padding:.75rem;background:white;border:2px solid #9cadd5;border-left:7px solid var(--electric-cyan);border-radius:.4rem;font-weight:800}.concept-diagram figcaption,.system-map figcaption{margin:1.2rem 0 0;padding-top:1rem;border-top:2px solid #c9d2e8;color:#343c67;font-size:.92rem;line-height:1.45}.system-map{margin-top:4rem;background:#f2f6ff}.system-map-groups{display:grid;gap:1rem}.map-band{padding:1rem;background:white;border:2px solid #aebbe0;border-radius:.5rem}.map-band h4{margin:0 0 .7rem;color:var(--electric-purple);font-size:.9rem;text-transform:uppercase;letter-spacing:.06em}.map-flow{display:flex;align-items:stretch;gap:.55rem}.map-node{flex:1;min-width:0;padding:.7rem;border:2px solid #c0c9e3;border-radius:.4rem;background:#f8faff}.map-node span{display:block;color:var(--electric-purple);font-size:.65rem;font-weight:900;letter-spacing:.08em}.map-node strong{display:block;margin:.2rem 0;font-size:.82rem;line-height:1.15}.map-node small{display:block;color:#4d5875;font-size:.7rem;line-height:1.25}.map-node-current{border-color:var(--electric-pink);box-shadow:inset 0 0 0 2px var(--electric-pink);background:#fff0f8}.map-arrow{align-self:center;color:var(--electric-purple);font-weight:900}.map-draw-guide{margin-top:1.2rem;padding:1rem;background:#e9fff7;border-left:8px solid #18b989}.map-draw-guide h4{margin:0 0 .5rem}.map-draw-guide ol{columns:2;margin:.25rem 0;padding-left:1.4rem}.system-map-complete{border-width:5px;box-shadow:10px 10px 0 var(--electric-cyan)}.system-map-complete .system-map-heading{background:linear-gradient(110deg,var(--navy),#37158a)}.map-text-equivalent{margin:1.2rem 0;background:#eef2fb;border:2px solid #aebbe0;border-radius:.45rem}.map-text-equivalent summary{cursor:pointer;padding:.75rem 1rem;font:800 .85rem/1.2 Arial,sans-serif;color:var(--navy)}.map-text-equivalent pre{margin:0;border-radius:0 0 .35rem .35rem}
@media(max-width:850px){.concept-diagram,.system-map{margin-left:0;margin-right:0;padding:1rem;box-shadow:5px 5px 0 #c7d9ff}.concept-heading,.system-map-heading{margin:-1rem -1rem 1rem;padding:1rem}.concept-lanes{grid-template-columns:1fr}.concept-flow{display:grid;gap:1.45rem}.concept-flow li:not(:last-child)::after{content:"↓";right:auto;left:50%;top:auto;bottom:-1.35rem;transform:translateX(-50%)}.concept-branches{grid-template-columns:1fr}.concept-hub{min-height:0;border-radius:.45rem}.concept-branches ul{grid-template-columns:1fr}.map-flow{display:grid;gap:.45rem}.map-arrow{justify-self:center;transform:rotate(90deg)}.map-draw-guide ol{columns:1}.map-node strong{font-size:.9rem}.map-node small{font-size:.78rem}}
.chapter-ahead{margin:1rem 0 1.7rem;border:2px solid #aebbe0;border-radius:.5rem;background:#f2f6ff;font-family:Arial,sans-serif}.chapter-ahead>summary{cursor:pointer;padding:.85rem 1rem;color:var(--navy);font-weight:900}.chapter-ahead>div{padding:0 1rem 1rem}.chapter-ahead .callout{margin-top:.3rem}.map-band{padding:0;overflow:hidden}.map-band summary{display:grid;grid-template-columns:2rem minmax(8rem,.7fr) minmax(0,1.5fr);align-items:center;gap:.65rem;cursor:pointer;padding:.72rem .85rem;list-style:none}.map-band summary::-webkit-details-marker{display:none}.map-band summary::after{content:"+";grid-column:4;color:var(--electric-purple);font-size:1.25rem;font-weight:900}.map-band[open] summary::after{content:"−"}.map-band-number{display:grid;place-items:center;width:1.65rem;height:1.65rem;border-radius:50%;background:var(--electric-purple);color:white;font-size:.7rem;font-weight:900}.map-band-title{color:var(--navy);font-size:.82rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.map-band-overview{color:#45506e;font-size:.78rem;font-weight:700;line-height:1.25}.map-band .map-flow{padding:.8rem;border-top:2px solid #d7def0}.system-map-complete .system-map-groups{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}.system-map-complete .map-band summary{grid-template-columns:2rem 1fr}.system-map-complete .map-band-overview{grid-column:1 / -1;padding-left:2.3rem}.system-map-complete .map-band summary::after{grid-column:3;grid-row:1}.map-draw-guide{padding:0}.map-draw-guide>summary{cursor:pointer;padding:.85rem 1rem;font-weight:900}.map-draw-guide ol{padding:0 1rem 1rem 2.4rem}.concept-diagram{break-inside:avoid}.concept-diagram+.concept-diagram{margin-top:1rem}
@media(max-width:850px){.concept-lanes{grid-template-columns:1fr 1fr;gap:.5rem}.concept-lanes section{padding:.6rem}.concept-lanes h4{font-size:.85rem}.concept-lanes .concept-flow{gap:1.2rem}.concept-lanes .concept-flow li{display:block;padding:.55rem .35rem;text-align:center}.concept-lanes .concept-flow li>span{margin:0 auto .35rem}.concept-lanes .concept-flow li>strong{font-size:.7rem}.system-map-complete .system-map-groups{grid-template-columns:1fr}.map-band summary,.system-map-complete .map-band summary{grid-template-columns:1.7rem 1fr auto}.map-band-overview,.system-map-complete .map-band-overview{grid-column:1 / -1;padding-left:2.05rem}.map-band summary::after,.system-map-complete .map-band summary::after{grid-column:3;grid-row:1}.chapter-ahead{margin-top:.5rem}.concept-diagram{max-height:none}}
@media(max-width:850px){.system-map-complete{padding:.75rem}.system-map-complete .system-map-heading{margin:-.75rem -.75rem .75rem;padding:.75rem}.system-map-complete .system-map-groups{grid-template-columns:repeat(2,minmax(0,1fr));gap:.45rem}.system-map-complete .map-band summary{display:block;position:relative;min-height:6.25rem;padding:.5rem}.system-map-complete .map-band-number{display:inline-grid;width:1.35rem;height:1.35rem;margin-right:.25rem;font-size:.6rem}.system-map-complete .map-band-title{font-size:.67rem;line-height:1.1}.system-map-complete .map-band-overview{display:block;padding:.4rem 0 0;font-size:.64rem;line-height:1.22}.system-map-complete .map-band summary::after{position:absolute;right:.4rem;top:.3rem}.system-map-complete .map-flow{display:grid}.system-map-complete figcaption{margin-top:.75rem;padding-top:.7rem;font-size:.78rem}}
/* Evidence-led textbook repair: visible goals, integrated labels, real relationships, no decorative picture quota. */
body{font-family:Jost,Arial,sans-serif;background:linear-gradient(135deg,#b8e9ff 0%,#d7c6ff 48%,#ffcce7 100%)}
.gr-page{position:relative;background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(246,250,255,.98));border-top:0;border-left:10px solid var(--electric-purple);box-shadow:14px 18px 0 rgba(39,29,126,.14),0 28px 80px rgba(18,20,70,.22);overflow:visible}
.gr-page::before{content:"";position:absolute;inset:0 0 auto;height:16px;background:linear-gradient(90deg,var(--electric-purple) 0 38%,var(--electric-pink) 38% 68%,var(--electric-cyan) 68%);pointer-events:none}
.gr-page>p,.gr-page>ul,.gr-page>ol{font-family:Georgia,"Times New Roman",serif}
.gr-page>h2{position:relative;margin-top:5.5rem;padding:1rem 1.15rem;border:0;background:linear-gradient(105deg,#101842 0 76%,#672be8 76%);color:#fff;box-shadow:8px 8px 0 var(--electric-cyan);font-size:clamp(2rem,3.2vw,2.75rem);line-height:1.02}
.gr-page>h2::after{content:"";position:absolute;right:1.2rem;bottom:-10px;width:72px;height:20px;background:var(--electric-pink);clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)}
.gr-page>h3{margin:3.25rem 0 1.1rem;padding:.8rem 1rem .8rem 1.15rem;border-left:9px solid var(--electric-pink);background:linear-gradient(90deg,#f0e9ff 0,rgba(240,233,255,0) 88%);color:#35128b}
.gr-page>p{max-width:64ch;line-height:1.72}
.chapter-ahead{margin:1.35rem 0 2.2rem;padding:0;border:3px solid var(--navy);background:linear-gradient(135deg,#e8f8ff,#f7edff 58%,#fff0f7);box-shadow:7px 7px 0 #aeeaf4;font-family:Jost,Arial,sans-serif}
.chapter-ahead-title{margin:0;max-width:none;padding:.75rem 1rem;background:var(--navy);color:#fff;font-size:.78rem;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
.chapter-ahead-body{padding:1rem}
.chapter-ahead .callout-objective{display:block;margin:0 0 1rem;padding:1.05rem 1.2rem 1.2rem;background:#fff;border:0;border-left:9px solid var(--electric-cyan);border-radius:0;box-shadow:0 4px 0 rgba(32,82,164,.12);overflow:visible}
.chapter-ahead .callout-objective p{margin:0 0 .8rem;line-height:1.25}.chapter-ahead .callout-objective ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.55rem 1.25rem;margin:0;padding:0 0 0 1.1rem}.chapter-ahead .callout-objective li{font-size:.8rem;line-height:1.4;padding-right:.35rem}
.chapter-ahead h3{margin:1rem 0 .7rem;padding:0;border:0;background:none;color:var(--navy);font-size:1.05rem}
.chapter-ahead .table-scroll{overflow:visible;margin:0;border:0}
.chapter-ahead table,.chapter-ahead tbody{display:block;width:100%}
.chapter-ahead thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.chapter-ahead tbody{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.45rem}
.chapter-ahead tr{display:block;padding:.75rem;background:#fff;border:2px solid #b5c6e5;border-left:7px solid var(--electric-purple);box-shadow:3px 3px 0 rgba(65,43,139,.1)}
.chapter-ahead td{display:block;padding:0;border:0;background:transparent!important;font-size:.7rem;line-height:1.25}
.chapter-ahead td:first-child{margin-bottom:.25rem;color:#4e18ca;font-size:.78rem}
.chapter-ahead-body>p:last-child{margin:.7rem 0 0;color:#4d5875;font-size:.78rem}
.callout-question{background:#ffe1f1;border-left-color:var(--electric-pink)}
.callout-practice{background:#fff0e8;border-left-color:#e65e2e}
.callout-key{background:#f0e8ff;border-left-color:var(--electric-purple)}
.callout-objective{background:#e5f8ff;border-left-color:var(--electric-cyan)}
.chapter-ahead .callout-objective{background:#e5f8ff}
.callout-insight{background:#e7fff3;border-left-color:#18a76d}
.callout-landmark{background:#e9eeff;border-left-color:#4558e8}
.callout-big-picture{background:#e7e5ff;border-left-color:#332c9e}
.concept-diagram,.system-map{border-radius:0;background:#eef5ff;box-shadow:9px 9px 0 rgba(48,31,139,.2)}
.concept-diagram[data-variant="decision-blueprint"],.system-map-complete{width:calc(100% + 5rem);margin-left:-2.5rem}
.concept-heading,.system-map-heading{border-radius:0;background:linear-gradient(105deg,var(--navy),#37158a 78%);padding:.85rem 1rem}
.concept-heading h3,.system-map-heading h3{font-size:1.3rem;line-height:1.12}
.concept-flow{gap:1.65rem}
.concept-flow li{display:grid;align-content:center;gap:.25rem;min-height:92px;padding:.8rem .85rem;border:2px solid #8799c4;border-left:9px solid var(--electric-cyan);border-radius:0;background:#fff;box-shadow:3px 3px 0 #cbd8f1}
.concept-flow li>span{display:block;width:auto;height:auto;color:#4e18ca;background:transparent;border-radius:0;font-size:.62rem;letter-spacing:.1em;text-align:left}
.concept-flow li>strong{font-size:.82rem;line-height:1.28}
.concept-flow li:not(:last-child)::after{right:-1.35rem;color:var(--electric-pink);font-size:1.35rem}
.concept-lanes{gap:1.2rem}
.concept-lanes section,.concept-lanes section+section{padding:.85rem;background:#eaf9ff;border:2px solid #91cddd;border-top:8px solid var(--electric-cyan);border-left-width:2px;border-radius:0}
.concept-lanes section+section{background:#fff0f7;border-color:#e7a0c6;border-top-color:var(--electric-pink)}
.concept-lanes h4{margin:0 0 .75rem;padding-bottom:.45rem;border-bottom:2px solid currentColor}
.concept-branches{grid-template-columns:minmax(130px,.7fr) 110px 2fr;gap:.65rem}
.concept-hub{min-height:92px;border-radius:0;background:var(--navy);box-shadow:5px 5px 0 var(--electric-cyan)}
.branch-connector{position:relative;color:#4e18ca;text-align:center;font-size:.68rem;font-weight:900;text-transform:uppercase;letter-spacing:.05em}
.branch-connector::before,.branch-connector::after{content:"";display:block;height:3px;background:var(--electric-purple);margin:.25rem 0}
.concept-branches li{border-radius:0;box-shadow:3px 3px 0 #d2ddf2}
.decision-blueprint{display:grid;gap:.65rem}
.blueprint-phase{display:grid;grid-template-columns:1fr 1fr;gap:1rem;padding:0 1rem;color:#4d5875;font-size:.64rem;font-weight:900;letter-spacing:.08em;text-align:center}
.blueprint-lane{padding:.65rem;background:#e9f9ff;border:2px solid #76bdd0;border-top:8px solid var(--electric-cyan)}
.blueprint-lane-learned{background:#fff0f8;border-color:#df91bb;border-top-color:var(--electric-pink)}
.blueprint-lane h4{margin:0 0 .5rem;font-size:.9rem}
.blueprint-track{display:grid;grid-template-columns:minmax(0,1fr) 28px minmax(0,1fr) 28px minmax(0,1fr) 28px minmax(100px,.6fr);align-items:stretch;gap:.25rem}
.blueprint-node,.blueprint-result{display:flex;flex-direction:column;justify-content:center;min-width:0;padding:.52rem;background:#fff;border:2px solid #7d8fb9;box-shadow:3px 3px 0 #cbd8f1}
.blueprint-node small{color:#4e18ca;font-size:.59rem;font-weight:900;letter-spacing:.08em}
.blueprint-node strong,.blueprint-result strong{margin:.16rem 0;font-size:.75rem;line-height:1.16}
.blueprint-node p{margin:0;font-size:.61rem;line-height:1.22}
.blueprint-node-live{border-color:var(--electric-pink)}
.blueprint-result{border:3px solid var(--navy);background:var(--navy);color:#fff;text-align:center}
.blueprint-result span{color:#95efff;font-size:.65rem;font-weight:800}
.blueprint-arrow,.blueprint-bridge{align-self:center;color:var(--electric-purple);font-size:1.35rem;font-weight:900;text-align:center}
.blueprint-click{margin:0;padding:.62rem .8rem;background:#eafff6;border-left:8px solid #18b989;font-size:.76rem;line-height:1.32}
.claim-tree{display:grid;justify-items:center;gap:.55rem}
.claim-tree-start,.claim-tree-question{width:min(600px,100%);padding:.8rem 1rem;background:var(--navy);border:3px solid var(--navy);color:#fff;text-align:center;box-shadow:5px 5px 0 var(--electric-cyan)}
.claim-tree-start small{display:block;color:#8eeeff;font-size:.62rem;font-weight:900;letter-spacing:.1em}.claim-tree-start strong,.claim-tree-start span{display:block}.claim-tree-start strong{margin:.2rem 0;font-size:1rem}.claim-tree-start span{color:#dbe7ff;font-size:.72rem}
.claim-tree-question{background:#fff;color:var(--navy);border-color:var(--electric-purple);box-shadow:5px 5px 0 #cdb8ff;font-size:.9rem}
.claim-tree-arrow{color:var(--electric-purple);font-size:1.4rem;font-weight:900;line-height:1}
.claim-tree-branches{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;width:100%}.claim-tree-branches section{padding:.85rem;background:#e5f8ff;border:3px solid #7ebfd1;border-top:8px solid var(--electric-cyan)}.claim-tree-branches section+section{background:#fff0f8;border-color:#df91bb;border-top-color:var(--electric-pink)}.claim-tree-branches span{display:block;color:#4e18ca;font-size:.62rem;font-weight:900;letter-spacing:.1em}.claim-tree-branches strong{display:block;margin:.25rem 0;font-size:.9rem}.claim-tree-branches p{margin:.25rem 0;font-size:.75rem;line-height:1.35}.claim-tree-outcomes{display:grid;gap:.35rem;margin-top:.6rem}.claim-tree-outcomes em{padding:.4rem;background:#fff;border-left:5px solid var(--electric-pink);font-size:.7rem;font-style:normal}
.pattern-blueprint{display:grid;grid-template-columns:minmax(0,1.1fr) 28px minmax(0,1fr) 28px minmax(0,1fr) 28px minmax(0,.9fr);align-items:stretch;gap:.3rem}.pattern-blueprint section{padding:.75rem;background:#fff;border:2px solid #8899bf;box-shadow:3px 3px 0 #cbd8f1}.pattern-blueprint small{display:block;color:#4e18ca;font-size:.58rem;font-weight:900;letter-spacing:.08em}.pattern-blueprint strong{display:block;margin:.25rem 0;font-size:.82rem}.pattern-blueprint p{margin:.25rem 0 0;font-size:.67rem;line-height:1.3}.pattern-examples>div{display:grid;gap:.3rem;margin-top:.45rem}.pattern-examples span{padding:.3rem .4rem;background:#e5f8ff;border-left:5px solid var(--electric-cyan);font-size:.68rem}.pattern-weights{border-color:var(--electric-purple)!important;background:#f4efff!important}.weight-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.2rem;margin:.4rem 0}.weight-grid i{padding:.25rem;background:var(--navy);color:#8eeeff;text-align:center;font-size:.58rem;font-style:normal}.pattern-new{border-color:var(--electric-pink)!important;background:#fff0f8!important}.pattern-result{background:#eafff6!important;border-color:#18a76d!important}.pattern-arrow{align-self:center;color:var(--electric-purple);font-size:1.35rem;font-weight:900;text-align:center}
.mixed-products{display:grid;gap:.45rem}.mixed-products-head,.mixed-products section{display:grid;grid-template-columns:minmax(110px,.55fr) repeat(2,minmax(0,1fr));gap:.55rem;align-items:stretch}.mixed-products-head{padding:0 .65rem;color:#4d5875;font-size:.58rem;font-weight:900;letter-spacing:.08em}.mixed-products section{padding:.65rem;background:#fff;border:2px solid #9cadd5}.mixed-products h4{align-self:center;margin:0;color:var(--navy);font-size:.95rem}.mixed-products section>div{padding:.55rem;background:#e5f8ff;border-left:7px solid var(--electric-cyan)}.mixed-products section>div+div{background:#fff0f8;border-left-color:var(--electric-pink)}.mixed-products small,.mixed-products strong{display:block}.mixed-products small{color:#4e18ca;font-size:.58rem;font-weight:900;letter-spacing:.08em}.mixed-products strong{margin-top:.2rem;font-size:.72rem;line-height:1.25}.mixed-products .blueprint-click{grid-column:1/-1}
.map-piece{margin:2.5rem 0 4rem;padding:1rem 1.15rem;background:linear-gradient(90deg,#101842,#342182);border-left:10px solid var(--electric-cyan);color:#fff;font-family:Jost,Arial,sans-serif;box-shadow:7px 7px 0 #ffc4e3}
.map-piece>span{display:block;color:#8eeeff;font-size:.62rem;font-weight:900;letter-spacing:.1em}
.map-piece>strong{display:block;margin:.25rem 0 .15rem;font-size:1.05rem}
.map-piece>p{margin:0;color:#f0eaff;font-size:.78rem;line-height:1.35}
.ai-system-blueprint{padding:1rem;background:#fff;border:3px solid var(--navy)}
.map-governance{margin:-1rem -1rem .6rem;padding:.55rem .75rem;background:#37158a;color:#fff;border-bottom:6px solid var(--electric-pink)}
.map-governance strong,.map-governance span{display:block}.map-governance span{margin-top:.2rem;color:#f3dffb;font-size:.72rem}
.map-track{margin:.55rem 0;padding:.55rem;background:#edf9ff;border-left:7px solid var(--electric-cyan)}
.map-track h4,.map-crosscuts h4{margin:0 0 .65rem;color:var(--navy);font-size:.7rem;letter-spacing:.09em}
.map-track-flow{display:flex;align-items:stretch;gap:.45rem}
.map-node{display:flex;flex:1;flex-direction:column;justify-content:center;min-width:0;padding:.45rem;background:#fff;border:2px solid #8d9cc0;border-radius:0;box-shadow:2px 2px 0 #cbd8f1}
.map-node small{color:#4e18ca;font-size:.49rem;font-weight:900;letter-spacing:.07em}.map-node strong{display:block;margin:.12rem 0;font-size:.67rem;line-height:1.12}.map-node span{display:block;color:#4d5875;font-size:.54rem;line-height:1.18}
.map-node-emphasis{border:3px solid var(--electric-pink);background:#fff2f8}
.hardware-to-work{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:.15rem 0 .55rem;color:#4e18ca;text-align:center;font-size:.64rem;font-weight:900;letter-spacing:.07em}.hardware-to-work span{padding:.3rem;border-bottom:3px solid var(--electric-purple)}
.model-to-use{text-align:center;color:#4e18ca;font-size:.7rem}.model-to-use span,.model-to-use strong{display:block}.model-to-use span{font-size:1.4rem;line-height:1}
.map-track-use{background:#fff0f7;border-left-color:var(--electric-pink)}
.map-crosscuts{margin:.55rem 0;padding:.55rem;background:#fff8d9;border:3px dashed #7e6412}
.map-crosscuts>div{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem}
.map-track-multistep{background:#efffec;border-left-color:#25a65b}.map-track-physical{background:#f0ecff;border-left-color:var(--electric-purple)}
.map-loop-return{margin:.55rem 0 0;padding:.42rem;background:#123f32;color:#fff;text-align:center;font-size:.62rem;font-weight:900;letter-spacing:.06em}
.map-frontier{padding:.55rem .75rem;background:var(--navy);color:#fff}.map-frontier strong,.map-frontier span{display:block}.map-frontier span{margin-top:.15rem;color:#dbe7ff;font-size:.64rem}
.system-map-complete .map-draw-guide{margin-top:1rem;padding:1rem;background:#eafff6;border-left:9px solid #18b989}.system-map-complete .map-draw-guide ol{columns:2;margin:.4rem 0 0;padding-left:1.25rem;font-size:.78rem}.system-map-complete figcaption{font-size:.85rem}
@media(max-width:850px){.gr-page{border-left:0;border-top:8px solid var(--electric-purple);padding:1.1rem}.gr-page>h2{margin-left:-1.1rem;margin-right:-1.1rem;padding:1rem 1.1rem;box-shadow:none}.gr-page>h2::after{display:none}.gr-page>h3{margin-left:-.25rem;padding:.65rem .75rem}.chapter-ahead-body{padding:.75rem}.chapter-ahead .callout-objective ul{grid-template-columns:1fr}.chapter-ahead tbody{grid-template-columns:repeat(2,minmax(0,1fr))}.concept-diagram,.system-map{padding:.75rem;box-shadow:5px 5px 0 rgba(48,31,139,.18)}.concept-diagram[data-variant="decision-blueprint"],.system-map-complete{width:100%;margin-left:0}.concept-heading,.system-map-heading{margin:-.75rem -.75rem .75rem}.concept-lanes{grid-template-columns:1fr}.concept-flow{display:grid;gap:1.25rem}.concept-flow li:not(:last-child)::after{content:"↓";right:auto;left:50%;top:auto;bottom:-1.2rem;transform:translateX(-50%)}.concept-branches{grid-template-columns:1fr}.branch-connector::before,.branch-connector::after{width:3px;height:18px;margin:.2rem auto}.decision-blueprint{grid-template-columns:repeat(2,minmax(0,1fr));gap:.45rem}.blueprint-phase{display:none}.blueprint-lane{min-width:0;padding:.4rem}.blueprint-lane h4{font-size:.75rem}.blueprint-track{grid-template-columns:1fr}.blueprint-arrow{transform:rotate(90deg);font-size:.9rem}.blueprint-bridge{height:18px;overflow:hidden}.blueprint-node,.blueprint-result{padding:.4rem}.blueprint-node strong,.blueprint-result strong{font-size:.66rem}.blueprint-node p{font-size:.59rem}.blueprint-click{grid-column:1/-1}.claim-tree-branches{grid-template-columns:1fr}.pattern-blueprint{grid-template-columns:1fr}.pattern-arrow{transform:rotate(90deg);line-height:.8}.mixed-products-head{display:none}.mixed-products section{grid-template-columns:1fr}.mixed-products section>div{padding:.65rem}.hardware-to-work{grid-template-columns:1fr;gap:.25rem}.map-track-flow{display:grid;grid-template-columns:1fr;gap:.25rem}.map-track{padding:.65rem;border-left-width:6px}.map-track h4,.map-crosscuts h4{font-size:.72rem}.map-node{padding:.58rem .65rem}.map-node small{font-size:.67rem}.map-node strong{font-size:.86rem}.map-node span{position:static;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal;font-size:.72rem;line-height:1.3}.map-arrow{transform:rotate(90deg);justify-self:center;font-size:1rem;line-height:.8}.map-crosscuts>div{grid-template-columns:1fr;gap:.45rem}.map-governance span,.map-frontier span{font-size:.72rem;line-height:1.35}.system-map-complete .map-draw-guide ol{columns:1}}
/* Readability repair. Chapter 1 visual teaching remains withdrawn. */
:root{--reading-font:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}
body{font-family:var(--reading-font);font-size:19px;line-height:1.64}
.gr-page>p,.gr-page>ul,.gr-page>ol{font-family:var(--reading-font)}
.gr-page>p{max-width:65ch;line-height:1.68}
.purpose-built-teaching-visual{width:calc(100% + 4rem);margin:2.2rem 0 3.2rem -2rem;background:#fff;border:3px solid var(--navy);border-radius:16px;box-shadow:10px 10px 0 #eea0cf;overflow:hidden}.purpose-built-teaching-visual picture,.purpose-built-teaching-visual img{display:block;width:100%}.purpose-built-teaching-visual picture+picture{border-top:14px solid #f4efff}.purpose-built-teaching-visual img{height:auto}.purpose-built-teaching-visual figcaption{margin:0;padding:1rem 1.25rem;background:#fff;color:#30395e;border-top:3px solid var(--navy);font-size:16px;line-height:1.5}
#ch03-purpose-built-visual,#ch04-purpose-built-visual,#ch05-purpose-built-visual,#ch06-purpose-built-visual,#ch07-purpose-built-visual,#ch08-purpose-built-visual,#ch09-purpose-built-visual,#ch10-purpose-built-visual,#ch12-purpose-built-visual,#ch13-purpose-built-visual{width:calc(100% + 12rem);margin-left:-6rem}
.chapter-ahead{background:#fff;box-shadow:6px 6px 0 #aeeaf4}
.chapter-ahead-body{padding:1.15rem;background:#fff}
@media(max-width:850px){.purpose-built-teaching-visual,#ch03-purpose-built-visual,#ch04-purpose-built-visual,#ch05-purpose-built-visual,#ch06-purpose-built-visual,#ch07-purpose-built-visual,#ch08-purpose-built-visual,#ch09-purpose-built-visual,#ch10-purpose-built-visual,#ch11-purpose-built-visual,#ch12-purpose-built-visual,#ch13-purpose-built-visual{width:calc(100% + .4rem);margin:1.6rem 0 2.6rem -.2rem;border-radius:12px;box-shadow:5px 5px 0 #eea0cf}.purpose-built-teaching-visual figcaption{padding:.8rem .9rem;font-size:15px}}
.chapter-ahead .callout-objective{margin:0 0 1.25rem;padding:1.2rem 1.35rem;background:#e5f8ff;box-shadow:none}
.chapter-ahead .callout-objective p{font-size:21px;line-height:1.35}
.chapter-ahead .callout-objective ul{gap:.75rem 1.6rem}
.chapter-ahead .callout-objective li{font-size:18px;line-height:1.5}
.chapter-ahead h3{font-size:22px;line-height:1.25}
.chapter-ahead tbody{grid-template-columns:repeat(2,minmax(0,1fr));gap:.7rem}
.chapter-ahead tr{padding:.9rem}
.chapter-ahead td{font-size:17px;line-height:1.45}
.chapter-ahead td:first-child{font-size:18px}
.chapter-ahead-body>p:last-child{font-size:17px;line-height:1.5}
.concept-heading h3,.system-map-heading h3{font-size:28px;line-height:1.2}
.concept-heading>span,.system-map-heading>span{font-size:18px;line-height:1.45}
.concept-diagram figcaption,.system-map figcaption{font-size:18px;line-height:1.55}
.ch1-visual{scroll-margin-top:54px;width:calc(100% + 4rem);margin:2rem 0 3rem -2rem;background:#f5f9ff;border:3px solid var(--navy);border-radius:14px;box-shadow:9px 9px 0 #eea0cf;overflow:hidden;font-family:var(--reading-font)}
.ch1-visual-head{padding:1.15rem 1.4rem 1.25rem;background:linear-gradient(120deg,#101842,#31218c);color:white}.ch1-visual-head p{margin:0;color:#74e8ff;font:900 12px/1 var(--reading-font);letter-spacing:.13em}.ch1-visual-head h4{margin:.45rem 0 .3rem;color:white;font:900 30px/1.05 var(--reading-font);letter-spacing:-.025em}.ch1-visual-head span{display:block;max-width:67ch;color:#ffd7ed;font-size:17px;font-weight:700;line-height:1.4}
.ch1-art{position:relative;width:100%;aspect-ratio:1;background-image:var(--sprite);background-repeat:no-repeat;background-size:202% 202%;background-color:#dff7ff;border:2px solid #1d2d70;border-radius:10px;overflow:hidden}.ch1-art-rule-woman{aspect-ratio:2;background-size:262% auto;background-position:0 11%}.ch1-art-software{background-position:100% 0}.ch1-art-examples{background-position:0 100%}.ch1-art-pattern{background-position:100% 100%}.ch1-art-face-examples{background-position:0 0}.ch1-art-face-pattern{background-size:400% 400%;background-position:33% 0;filter:saturate(.75) contrast(1.05)}.ch1-art-face-new{background-size:260% 260%;background-position:100% 17%}.ch1-art-email-cutaway{aspect-ratio:1.15;background-size:250% 250%;background-position:18% 100%}.ch1-art-email-cutaway::before{content:"ONE INBOX";position:absolute;z-index:2;inset:0 0 auto;height:13%;display:flex;align-items:center;padding-left:5%;background:#101842;color:white;border-bottom:2px solid #1d2d70;font:900 12px/1 var(--reading-font);letter-spacing:.1em}
.ch1-lane{padding:1.25rem 1.4rem}.ch1-lane+.ch1-lane{border-top:3px solid var(--navy)}.ch1-lane-automation{background:#fff0f8}.ch1-lane-ai{background:#e5faff}.ch1-lane h5{display:inline-block;margin:0 0 1rem;padding:.35rem .65rem;background:var(--navy);color:#fff;font:900 15px/1 var(--reading-font);letter-spacing:.08em}.ch1-lane-ai h5{background:#4e18ca}.ch1-track{display:grid;grid-template-columns:minmax(0,1fr) 90px minmax(0,1fr);align-items:center;gap:1rem}.ch1-track section{display:grid;grid-template-columns:minmax(140px,.8fr) minmax(170px,1fr);align-items:center;gap:1rem}.ch1-connector{display:grid;place-items:center;color:#4e18ca;font-size:40px;font-weight:900}.ch1-connector-teach{font-size:16px;line-height:1.2;text-align:center}.ch1-job{margin:0}.ch1-job span{display:block;margin-bottom:.3rem;color:#5b33bd;font-size:12px;font-weight:900;letter-spacing:.09em}.ch1-job strong{display:block;color:var(--navy);font-size:20px;line-height:1.15}.ch1-job small{display:block;margin-top:.35rem;color:#3e496a;font-size:15px;line-height:1.4}.ch1-later-flow{display:flex;align-items:stretch;gap:1.4rem;margin:1.1rem 0 0;padding:0;list-style:none}.ch1-later-flow li{position:relative;flex:1;margin:0;padding:.65rem .75rem;background:white;border:2px solid #8499c9;border-radius:8px;color:var(--navy);font-size:14px;font-weight:800;line-height:1.3}.ch1-later-flow li:not(:last-child)::after{content:"→";position:absolute;right:-1.15rem;top:50%;transform:translateY(-50%);color:#4e18ca;font-size:22px}.ch1-later-flow span{display:block;color:#d31679;font-size:11px;letter-spacing:.1em}.ch1-later-mobile{display:none}.ch1-visual figcaption{margin:0;padding:1rem 1.4rem;background:#fff;color:#30395e;border-top:2px solid #b8c3de;font-size:16px;line-height:1.5}
.ch1-three-step{display:grid;grid-template-columns:1fr 48px .9fr 48px 1fr;align-items:center;gap:.7rem;padding:1.35rem;background:#f1f5ff}.ch1-three-step section{min-width:0}.ch1-likeness-map{padding:1rem;background:#fff;border:2px solid #1d2d70;border-radius:10px}.ch1-likeness-visual{position:relative;margin-bottom:.8rem}.ch1-likeness-visual::before{content:"";position:absolute;z-index:2;inset:9%;border:3px solid #6b2cff;border-radius:10px;box-shadow:0 0 0 4px rgba(255,255,255,.75)}.ch1-likeness-visual::after{content:"";position:absolute;z-index:2;left:18%;right:18%;top:50%;height:2px;background:#ed238c;box-shadow:0 -42px 0 #00aeca,0 42px 0 #00aeca}.ch1-likeness-visual>span{position:absolute;z-index:3;left:50%;bottom:7%;transform:translateX(-50%);padding:.35rem .55rem;background:#101842;color:#fff;white-space:nowrap;font-size:10px;font-weight:900;letter-spacing:.08em}
.ch1-inbox-map{display:grid;grid-template-columns:1.15fr .85fr;gap:1rem;align-items:center;padding:1.35rem;background:#eef7ff}.ch1-inbox-visual{position:relative;max-width:460px}.ch1-route-label{position:absolute;z-index:3;bottom:5%;padding:.45rem .6rem;border:2px solid #101842;background:#fff;color:#101842;border-radius:7px;font-size:11px;font-weight:900;letter-spacing:.06em}.ch1-route-label b{color:#6b2cff;font-size:16px}.ch1-route-rule{left:3%}.ch1-route-learned{right:3%}.ch1-inbox-routes{display:grid;grid-template-columns:1fr;gap:1rem}.ch1-inbox-routes section{padding:.9rem 1rem;background:#fff;border:2px solid #aebbe0;border-left:9px solid #ed238c;border-radius:8px}.ch1-inbox-routes section+section{border-left-color:#00aeca}.ch1-inbox-routes span{color:#c21c70;font-size:11px;font-weight:900;letter-spacing:.08em}.ch1-inbox-routes section+section span{color:#007f96}.ch1-inbox-routes strong{display:block;margin:.2rem 0;color:var(--navy);font-size:19px}.ch1-inbox-routes p{margin:.25rem 0 0;color:#3e496a;font-size:15px;line-height:1.4}.ch1-product-landing{margin:0;padding:.8rem 1rem;background:#101842;color:#fff;text-align:center;font-size:17px;font-weight:900;letter-spacing:.07em}.ch1-product-landing b{padding:0 .45rem;color:#74e8ff;font-size:24px}
.ch1-summary-check{scroll-margin-top:54px;width:calc(100% + 2rem);margin:2rem 0 3rem -1rem;background:#fff;border:3px solid #101842;border-radius:14px;box-shadow:7px 7px 0 #74e8ff;overflow:hidden}.ch1-summary-check ol{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin:0;padding:0;list-style:none}.ch1-summary-check li{display:grid;grid-template-columns:40px 1fr;gap:.65rem;margin:0;padding:1rem;border-right:2px solid #c6cfea}.ch1-summary-check li:last-child{border-right:0}.ch1-summary-check li>span{display:grid;place-items:center;width:38px;height:38px;background:#6b2cff;color:#fff;border-radius:50%;font-size:11px;font-weight:900}.ch1-summary-check strong{display:block;color:#101842;font-size:16px;line-height:1.25}.ch1-summary-check small{display:block;margin-top:.25rem;color:#3e496a;font-size:14px;line-height:1.35}.ch1-summary-check>p{margin:0;padding:.8rem 1rem;background:#fff0f8;border-top:2px solid #c6cfea;color:#30395e;font-size:16px}
@media(max-width:850px){body{font-size:18px}.chapter-ahead-body{padding:.8rem}.chapter-ahead .callout-objective{padding:1rem}.chapter-ahead .callout-objective p{font-size:20px}.chapter-ahead .callout-objective li{font-size:18px}.chapter-ahead tbody{grid-template-columns:1fr}.concept-heading h3,.system-map-heading h3{font-size:23px}.concept-heading>span,.system-map-heading>span{font-size:18px}.ch1-visual{width:calc(100% + .4rem);margin:1.5rem 0 2.5rem -.2rem;box-shadow:5px 5px 0 #eea0cf}.ch1-visual-head{padding:.85rem}.ch1-visual-head h4{font-size:24px}.ch1-visual-head span{font-size:15px}.ch1-core{display:grid;grid-template-columns:1fr 1fr}.ch1-core>.ch1-visual-head,.ch1-core>figcaption{grid-column:1/-1}.ch1-core .ch1-lane{padding:.65rem}.ch1-core .ch1-lane+.ch1-lane{border-top:0;border-left:3px solid var(--navy)}.ch1-core .ch1-lane h5{margin-bottom:.55rem;font-size:11px}.ch1-core .ch1-track{grid-template-columns:1fr;gap:.35rem}.ch1-core .ch1-track section{grid-template-columns:1fr;gap:.35rem}.ch1-core .ch1-art{width:100%;max-height:108px;object-fit:cover}.ch1-core .ch1-art-rule-woman{aspect-ratio:2}.ch1-core .ch1-job span{font-size:10px}.ch1-core .ch1-job strong{font-size:15px}.ch1-core .ch1-job small{font-size:12px;line-height:1.25}.ch1-core .ch1-connector{height:16px;font-size:0}.ch1-core .ch1-connector::after{content:"↓";font-size:18px}.ch1-core .ch1-connector-teach::before{content:"examples teach";margin-right:.3rem;color:#5b33bd;font-size:10px}.ch1-core .ch1-later-flow{display:grid;gap:.55rem;margin-top:.55rem}.ch1-core .ch1-later-flow li{padding:.4rem;font-size:11px}.ch1-core .ch1-later-flow li:not(:last-child)::after{content:"↓";right:auto;left:50%;top:auto;bottom:-.62rem;transform:translateX(-50%);font-size:14px}.ch1-three-step{grid-template-columns:1fr;padding:1rem;gap:.6rem}.ch1-three-step section{display:grid;grid-template-columns:130px 1fr;gap:.75rem;align-items:center}.ch1-three-step .ch1-likeness-map{display:grid;grid-template-columns:130px 1fr}.ch1-likeness-visual{margin:0}.ch1-three-step>.ch1-connector{font-size:0;height:20px}.ch1-three-step>.ch1-connector::after{content:"↓";font-size:22px}.ch1-inbox-map{padding:1rem}.ch1-inbox-visual{width:min(300px,100%)}.ch1-route-label{bottom:4%;padding:.3rem;font-size:9px;letter-spacing:.03em}.ch1-route-label b{font-size:12px}.ch1-inbox-routes{grid-template-columns:1fr;gap:.65rem}.ch1-inbox-routes section{padding:.7rem}.ch1-inbox-routes strong{font-size:17px}.ch1-inbox-routes p{font-size:14px}.ch1-summary-check{width:calc(100% + .4rem);margin:1.5rem 0 2.5rem -.2rem;box-shadow:5px 5px 0 #74e8ff}.ch1-summary-check ol{grid-template-columns:1fr}.ch1-summary-check li{border-right:0;border-bottom:2px solid #c6cfea;padding:.8rem}.ch1-summary-check li:last-child{border-bottom:0}.ch1-visual figcaption{padding:.75rem .85rem;font-size:14px}}
@media(max-width:850px){.ch1-core .ch1-later-flow{display:none}.ch1-core .ch1-later-mobile{display:block;margin:.5rem 0 0;padding:.45rem;background:#fff;border:2px solid #8499c9;border-radius:7px;color:#101842;font-size:11px;font-weight:800;line-height:1.3}.ch1-core .ch1-later-mobile span{display:block;color:#d31679;font-size:9px;letter-spacing:.1em}.ch1-three-step{padding:.7rem}.ch1-three-step section,.ch1-three-step .ch1-likeness-map{grid-template-columns:110px 1fr}.ch1-three-step .ch1-job strong{font-size:17px}.ch1-three-step .ch1-job small{font-size:13px;line-height:1.3}.ch1-inbox-map{grid-template-columns:1fr;padding:.7rem}.ch1-inbox-visual{width:min(250px,100%);margin:auto}.ch1-inbox-routes{grid-template-columns:1fr 1fr;gap:.5rem}.ch1-inbox-routes section{padding:.55rem}.ch1-inbox-routes span{font-size:9px}.ch1-inbox-routes strong{font-size:14px}.ch1-inbox-routes p{font-size:12px;line-height:1.3}.ch1-product-landing{padding:.55rem;font-size:14px}.ch1-product-landing b{font-size:18px}}
@media(max-width:850px){.ch1-core .ch1-visual-head{padding:.65rem}.ch1-core .ch1-visual-head h4{font-size:22px}.ch1-core .ch1-visual-head span{font-size:14px}.ch1-core .ch1-art{max-height:82px}.ch1-core .ch1-lane{padding:.45rem}.ch1-core>figcaption{padding:.55rem .7rem;font-size:13px;line-height:1.3}.ch1-inbox-routes p{font-size:13px}}
.ch1-art-rule-woman{background-position:0 14%}.ch1-art-rule-woman::after{content:"";position:absolute;z-index:2;top:0;right:0;width:18%;height:11%;background:#f4eafb}
${teachingVisualCss}
.build-banner{position:relative;top:auto}.reader-toc{top:0;height:100vh}
.ch9-customisation-decision{scroll-margin-top:54px;width:calc(100% + 4rem);margin:2.2rem 0 3.2rem -2rem;background:#fff;border:3px solid var(--navy);box-shadow:10px 10px 0 #72dff2;overflow:hidden;font-family:var(--reading-font);color:var(--navy)}.ch9-customisation-head{padding:1.05rem 1.25rem 1.15rem;background:linear-gradient(110deg,#101842 0 72%,#41209c 72%);color:#fff}.ch9-customisation-head p{margin:0;color:#76eaff;font-size:12px;font-weight:900;letter-spacing:.13em}.ch9-customisation-head h4{margin:.4rem 0 .35rem;color:#fff;font-size:30px;line-height:1.05;letter-spacing:-.025em}.ch9-customisation-head span{display:block;max-width:72ch;color:#ffd9ec;font-size:17px;font-weight:700;line-height:1.4}.ch9-case{padding:.8rem 1rem;background:#fff1e8;border-bottom:3px solid #e65e2e}.ch9-case span{display:block;color:#a83c13;font-size:10px;font-weight:900;letter-spacing:.09em}.ch9-case strong{display:block;margin:.2rem 0;font-size:17px;line-height:1.35}.ch9-case p{margin:0!important;color:#3e496a;font-size:14px!important;font-weight:800!important}.ch9-tree{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;padding:1rem;background:linear-gradient(180deg,#eef8ff,#fff7fc)}.ch9-root{grid-column:1/-1;width:min(440px,100%);margin:auto;padding:.65rem;background:#101842;border:4px double #76eaff;color:#fff;text-align:center}.ch9-root strong,.ch9-root span{display:block}.ch9-root strong{color:#76eaff;font-size:13px;letter-spacing:.09em}.ch9-root span{font-size:12px}.ch9-root-split{grid-column:1/-1;color:#ed238c;font-size:28px;font-weight:900;line-height:.7;text-align:center}.ch9-lane{min-width:0;border:3px solid #00aeca;background:#e8faff}.ch9-weights-lane{border-color:#ed238c;background:#fff0f7}.ch9-lane-head{padding:.65rem;background:#007f96;color:#fff}.ch9-weights-lane .ch9-lane-head{background:#ad1764}.ch9-lane-head b,.ch9-lane-head span{display:block}.ch9-lane-head b{font-size:12px;letter-spacing:.07em}.ch9-lane-head span{font-size:11px}.ch9-choice{display:grid;grid-template-columns:1fr 22px 1fr;align-items:center;gap:.25rem;margin:.65rem;padding:.55rem;background:#fff;border:2px solid #a8b6d6}.ch9-choice p{margin:0!important;color:#30395e;font-size:11px!important;line-height:1.35!important}.ch9-choice p strong,.ch9-choice p span{display:block}.ch9-choice p span{margin-top:.2rem}.ch9-choice>b{color:#6b2cff;font-size:18px;text-align:center}.ch9-choice>div{padding:.5rem;background:#101842;color:#fff}.ch9-choice>div small,.ch9-choice>div strong{display:block}.ch9-choice>div small{color:#76eaff;font-size:9px;font-weight:900;letter-spacing:.09em}.ch9-choice>div strong{font-size:11px;line-height:1.3}.ch9-foundation{border-style:dashed}.ch9-expiry,.ch9-persist{margin:.65rem!important;padding:.55rem!important;background:#fff;border-left:7px solid #00aeca;color:#30395e;font-size:11px!important;line-height:1.4!important}.ch9-persist{border-left-color:#ed238c}.ch9-expiry strong,.ch9-persist strong{color:#4e18ca}.ch9-combine{display:flex;gap:.7rem;padding:.8rem 1rem;background:#e8fff5;border-top:3px solid #18a76d}.ch9-combine strong{flex:0 0 auto;color:#13734d;font-size:12px;letter-spacing:.07em}.ch9-combine span{font-size:14px;line-height:1.4}.ch9-rule{display:flex;align-items:center;justify-content:center;gap:.55rem;padding:.75rem;background:#101842;color:#fff;text-align:center}.ch9-rule b{font-size:11px;letter-spacing:.05em}.ch9-rule span{color:#76eaff;font-size:20px;font-weight:900}.ch9-customisation-decision figcaption{margin:0;padding:.9rem 1.15rem;background:#fff;border-top:2px solid #bcc8e2;color:#30395e;font-size:15px;line-height:1.5}
@media(max-width:850px){.ch9-customisation-decision{width:calc(100% + .4rem);margin:1.6rem 0 2.6rem -.2rem;box-shadow:5px 5px 0 #72dff2}.ch9-customisation-head{padding:.85rem}.ch9-customisation-head h4{font-size:24px}.ch9-customisation-head span{font-size:15px}.ch9-case strong{font-size:16px}.ch9-tree{grid-template-columns:1fr;padding:.75rem}.ch9-root,.ch9-root-split,.ch9-lane{grid-column:1}.ch9-root-split{transform:none}.ch9-root-split strong,.ch9-root-split span{display:block}.ch9-root-split strong{font-size:12px;letter-spacing:.07em;line-height:1.3}.ch9-root-split span{font-size:0;line-height:1}.ch9-root-split span::after{content:"↓  OR  ↓";font-size:24px}.ch9-lane-head b{font-size:13px}.ch9-lane-head span{font-size:13px}.ch9-choice{grid-template-columns:1fr;gap:.35rem}.ch9-choice p{font-size:14px!important}.ch9-choice>b{transform:none}.ch9-choice>div strong{font-size:14px}.ch9-choice>div small{font-size:11px}.ch9-expiry,.ch9-persist{font-size:13px!important}.ch9-combine{display:block}.ch9-combine strong{display:block;margin-bottom:.25rem}.ch9-combine span{font-size:15px}.ch9-rule{display:grid;grid-template-columns:1fr}.ch9-rule span{line-height:.6}.ch9-customisation-decision figcaption{font-size:15px}}
.ch9-root-split strong,.ch9-root-split span{display:block}.ch9-root-split strong{font-size:11px;letter-spacing:.08em;line-height:1.3}.ch9-root-split span{font-size:28px;line-height:.7}
@media(max-width:850px){.ch9-root-split span{font-size:0;line-height:1}.ch9-root-split span::after{content:"↓  OR  ↓";font-size:24px}.ch9-root-split strong{font-size:12px}}
.ch8-context-retrieval{scroll-margin-top:54px;width:calc(100% + 4rem);margin:2.2rem 0 3.2rem -2rem;background:#fff;border:3px solid var(--navy);box-shadow:10px 10px 0 #f0a6d0;overflow:hidden;font-family:var(--reading-font);color:var(--navy)}.ch8-context-head{padding:1.05rem 1.25rem 1.15rem;background:linear-gradient(110deg,#101842 0 72%,#41209c 72%);color:#fff}.ch8-context-head p{margin:0;color:#76eaff;font-size:12px;font-weight:900;letter-spacing:.13em}.ch8-context-head h4{margin:.4rem 0 .35rem;color:#fff;font-size:30px;line-height:1.05;letter-spacing:-.025em}.ch8-context-head span{display:block;max-width:72ch;color:#ffd9ec;font-size:17px;font-weight:700;line-height:1.4}
.ch8-context-body{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.08fr) 32px minmax(0,.78fr);align-items:stretch;gap:.65rem;padding:1rem;background:linear-gradient(180deg,#eef8ff,#fff7fc)}.ch8-context-body>section{min-width:0;padding:.8rem;background:#fff;border:3px solid #a7b7d8}.ch8-time-label{margin:-.8rem -.8rem .7rem;padding:.55rem .7rem;background:#101842;color:#fff}.ch8-time-label b,.ch8-time-label span{display:block}.ch8-time-label b{color:#76eaff;font-size:11px;letter-spacing:.09em}.ch8-time-label span{font-size:11px}.ch8-document-shelf{display:grid;grid-template-columns:1fr 1fr;gap:.35rem}.ch8-doc{display:grid;place-items:center;min-height:62px;padding:.35rem;background:#f4efff;border:2px solid #6b2cff;border-left:8px solid #6b2cff;font-size:10px;font-style:normal;font-weight:900;line-height:1.2;text-align:center}.ch8-down{display:block;color:#ed238c;font-size:25px;font-weight:900;line-height:1;text-align:center}.ch8-index{padding:.6rem;background:#e8faff;border:3px solid #00aeca}.ch8-index strong,.ch8-index>span{display:block}.ch8-index strong{color:#007f96;font-size:12px;letter-spacing:.08em}.ch8-index>span{font-size:11px;line-height:1.3}.ch8-meaning-map{position:relative;height:100px;margin-top:.5rem;background:linear-gradient(90deg,rgba(107,44,255,.08) 1px,transparent 1px),linear-gradient(rgba(107,44,255,.08) 1px,transparent 1px),#fff;background-size:22px 22px;border:2px solid #8799c5}.ch8-meaning-map i{position:absolute;width:16px;height:16px;border:3px solid #fff;border-radius:50%;background:#ed238c;box-shadow:0 0 0 2px #ad1764}.ch8-meaning-map i:nth-child(1){left:18%;top:22%}.ch8-meaning-map i:nth-child(2){left:29%;top:35%}.ch8-meaning-map i:nth-child(3){left:22%;top:55%}.ch8-meaning-map i:nth-child(4){right:18%;bottom:20%;background:#00aeca;box-shadow:0 0 0 2px #007f96}.ch8-meaning-map i:nth-child(5){right:31%;bottom:38%;background:#00aeca;box-shadow:0 0 0 2px #007f96}.ch8-meaning-map i:nth-child(6){right:12%;top:14%;background:#6b2cff;box-shadow:0 0 0 2px #4e18ca}.ch8-outside{margin:.55rem 0 0!important;padding:.45rem!important;background:#fff1e8;border-left:6px solid #e65e2e;color:#4a4d60;font-size:11px!important;font-weight:800!important;line-height:1.35!important}
.ch8-now{background:#f9f6ff!important;border-color:#6b2cff!important}.ch8-question{padding:.6rem;background:#fff;border:2px solid #ed238c}.ch8-question span{display:block;color:#ad1764;font-size:9px;font-weight:900;letter-spacing:.08em}.ch8-question strong{display:block;font-size:14px;line-height:1.3}.ch8-live-sources{display:grid;grid-template-columns:1fr 1fr;gap:.4rem;margin-top:.55rem}.ch8-live-sources>div{min-width:0;padding:.5rem;background:#fff;border:2px solid #a9b8d8;border-left:7px solid #00aeca}.ch8-live-sources>div:nth-child(2){border-left-color:#ed238c}.ch8-live-sources>div:nth-child(3){grid-column:1/-1;border-left-color:#6b2cff}.ch8-live-sources b,.ch8-live-sources span,.ch8-live-sources em{display:block}.ch8-live-sources b{color:#4e18ca;font-size:10px;letter-spacing:.06em}.ch8-live-sources span{margin-top:.2rem;color:#3e496a;font-size:11px;line-height:1.3}.ch8-live-sources em{margin-top:.35rem;color:#ad1764;font-size:9px;font-style:normal;font-weight:900;letter-spacing:.06em}.ch8-retrieve>div{display:flex;gap:.3rem;margin-top:.35rem}.ch8-retrieve i{flex:1;padding:.3rem;background:#e8faff;border:2px solid #00aeca;font-size:9px;font-style:normal;font-weight:800}.ch8-converge{display:block;margin:.35rem;color:#ed238c;font-size:18px;font-weight:900;text-align:center;letter-spacing:.6em}.ch8-context-window{padding:.6rem;background:#101842;border:4px double #76eaff;color:#fff}.ch8-context-window>span{display:block;color:#76eaff;font-size:10px;font-weight:900;letter-spacing:.09em}.ch8-context-window>div{display:flex;gap:.25rem;flex-wrap:wrap;margin:.45rem 0}.ch8-context-window i{padding:.3rem;background:#fff;color:#101842;font-size:9px;font-style:normal;font-weight:800}.ch8-context-window>strong{display:block;font-size:11px;line-height:1.3}.ch8-join-arrow{align-self:center;color:#ed238c;font-size:28px;font-weight:900;text-align:center}
.ch8-model{display:grid;align-content:center;background:#e8fff5!important;border:5px solid #18a76d!important}.ch8-model-boundary{padding:.65rem;background:#fff;border:3px solid #101842}.ch8-model-boundary>span:first-child{display:block;margin:-.65rem -.65rem .65rem;padding:.45rem;background:#101842;color:#76eaff;font-size:11px;font-weight:900;letter-spacing:.09em;text-align:center}.ch8-weights,.ch8-context-in{padding:.65rem;border:3px solid #6b2cff;background:#f4efff;text-align:center}.ch8-context-in{border-color:#00aeca;background:#e8faff}.ch8-weights b,.ch8-weights small,.ch8-context-in b,.ch8-context-in small{display:block}.ch8-weights b,.ch8-context-in b{font-size:12px}.ch8-weights small,.ch8-context-in small{margin-top:.2rem;color:#3e496a;font-size:10px;line-height:1.3}.ch8-plus{display:block;margin:.2rem;color:#ed238c;font-size:22px;text-align:center}.ch8-generate{display:block;margin:.45rem;color:#13734d;font-size:10px;font-weight:900;text-align:center;letter-spacing:.07em}.ch8-answer{padding:.65rem;background:#101842;color:#fff}.ch8-answer small,.ch8-answer strong{display:block}.ch8-answer small{color:#76eaff;font-size:9px;font-weight:900;letter-spacing:.08em}.ch8-answer strong{font-size:13px;line-height:1.3}.ch8-model>p{margin:.65rem 0 0!important;color:#30395e;font-size:11px!important;line-height:1.4!important}.ch8-boundary{display:flex;gap:.7rem;margin:0;padding:.8rem 1.15rem;background:#fff1e8;border-top:3px solid #e65e2e;color:#3c4059;font-size:15px;line-height:1.45}.ch8-boundary strong{flex:0 0 auto;color:#a83c13}.ch8-context-retrieval figcaption{margin:0;padding:.9rem 1.15rem;background:#fff;border-top:2px solid #bcc8e2;color:#30395e;font-size:15px;line-height:1.5}
@media(max-width:850px){.ch8-context-retrieval{width:calc(100% + .4rem);margin:1.6rem 0 2.6rem -.2rem;box-shadow:5px 5px 0 #f0a6d0}.ch8-context-head{padding:.85rem}.ch8-context-head h4{font-size:24px}.ch8-context-head span{font-size:15px}.ch8-context-body{grid-template-columns:1fr;gap:.45rem;padding:.75rem}.ch8-context-body>section{padding:.75rem}.ch8-time-label{margin:-.75rem -.75rem .7rem}.ch8-doc,.ch8-index>span,.ch8-outside,.ch8-live-sources span,.ch8-retrieve i,.ch8-context-window>strong,.ch8-model>p{font-size:13px!important}.ch8-question strong{font-size:16px}.ch8-live-sources b,.ch8-context-window>span,.ch8-model-boundary>span:first-child{font-size:11px}.ch8-join-arrow{transform:rotate(90deg);font-size:24px}.ch8-weights b,.ch8-context-in b{font-size:14px}.ch8-weights small,.ch8-context-in small{font-size:12px}.ch8-answer strong{font-size:16px}.ch8-boundary{display:block;font-size:15px}.ch8-boundary strong{display:block}.ch8-context-retrieval figcaption{font-size:15px}}
.ch8-live-sources em,.ch8-retrieve i,.ch8-context-window i{font-size:10px}
@media(max-width:850px){.ch8-live-sources em,.ch8-context-window i,.ch8-generate,.ch8-answer small{font-size:12px}}
.ch7-request-journey{scroll-margin-top:54px;width:calc(100% + 4rem);margin:2.2rem 0 3.2rem -2rem;background:#f7fbff;border:3px solid var(--navy);box-shadow:10px 10px 0 #72dff2;overflow:hidden;font-family:var(--reading-font);color:var(--navy)}
.ch7-request-head{padding:1.05rem 1.25rem 1.15rem;background:linear-gradient(110deg,#101842 0 72%,#41209c 72%);color:#fff}.ch7-request-head p{margin:0;color:#76eaff;font-size:12px;font-weight:900;letter-spacing:.13em}.ch7-request-head h4{margin:.4rem 0 .35rem;color:#fff;font-size:30px;line-height:1.05;letter-spacing:-.025em}.ch7-request-head span{display:block;max-width:72ch;color:#ffd9ec;font-size:17px;font-weight:700;line-height:1.4}
.ch7-request-body{display:grid;grid-template-columns:minmax(0,.9fr) 30px minmax(0,.8fr) 30px minmax(0,1.08fr);align-items:stretch;gap:.45rem;padding:1rem;background:linear-gradient(180deg,#eef8ff,#fff7fc)}.ch7-request-body>section{min-width:0;padding:.8rem;background:#fff;border:3px solid #a7b7d8}.ch7-phase{display:flex;align-items:center;gap:.42rem;color:#4e18ca;font-size:11px;font-weight:900;letter-spacing:.08em;line-height:1.2}.ch7-phase b{display:grid;place-items:center;flex:0 0 27px;width:27px;height:27px;border-radius:50%;background:#4e18ca;color:#fff;font-size:13px}.ch7-major-arrow{align-self:center;color:#ed238c;font-size:28px;font-weight:900;text-align:center}
.ch7-chat-question,.ch7-chat-answer{position:relative;margin:.65rem 0;padding:.7rem .75rem .65rem;background:#eaf8ff;border:2px solid #00aeca;border-radius:14px 14px 4px 14px}.ch7-chat-question>span,.ch7-chat-answer>span{display:block;color:#007f96;font-size:10px;font-weight:900;letter-spacing:.1em}.ch7-chat-question p,.ch7-chat-answer p{margin:.2rem 0!important;color:#101842;font-size:14px!important;font-weight:800!important;line-height:1.35!important}.ch7-chat-question>b{display:block;width:max-content;margin:.45rem 0 0 auto;padding:.25rem .55rem;background:#101842;color:#fff;border-radius:999px;font-size:9px;letter-spacing:.08em}.ch7-context-stack{display:grid;gap:.34rem}.ch7-context-stack i{display:grid;grid-template-columns:22px 1fr;align-items:center;gap:.35rem;padding:.4rem;background:#f4efff;border-left:5px solid #6b2cff;font-size:11px;font-style:normal;font-weight:800}.ch7-context-stack b{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#6b2cff;color:#fff;font-size:9px}.ch7-boundary{margin:.55rem 0 0!important;padding:.48rem!important;background:#fff0f7;border:2px solid #ed238c;color:#3e496a;font-size:11px!important;line-height:1.35!important}.ch7-boundary strong,.ch7-boundary span{display:block}.ch7-boundary strong{color:#ad1764;font-size:9px;letter-spacing:.09em}
.ch7-prefill{background:#e8faff!important;border-color:#00aeca!important}.ch7-plain-label{margin:.55rem 0!important;color:#101842;font-size:15px!important;font-weight:900!important;line-height:1.25!important}.ch7-input-token-row,.ch7-output-token-row{display:flex;justify-content:center;gap:.18rem;flex-wrap:wrap}.ch7-input-token-row i,.ch7-output-token-row i{padding:.35rem .38rem;background:#fff;border:2px solid #00aeca;color:#101842;font-size:10px;font-style:normal;font-weight:900}.ch7-parallel-lines{display:grid;grid-template-columns:repeat(5,1fr);gap:.18rem;width:88%;height:44px;margin:0 auto}.ch7-parallel-lines i{border-left:3px solid #00aeca;border-bottom:3px solid #00aeca}.ch7-frozen-model{padding:.6rem;background:#101842;border:4px double #76eaff;color:#fff;text-align:center}.ch7-frozen-model span,.ch7-frozen-model strong{display:block}.ch7-frozen-model span{color:#76eaff;font-size:10px;font-weight:900;letter-spacing:.09em}.ch7-frozen-model strong{font-size:14px}.ch7-phase-note{margin:.55rem 0 0!important;padding:.42rem!important;background:#fff;color:#3e496a;font-size:11px!important;line-height:1.35!important}.ch7-phase-note strong{display:block;color:#4e18ca;font-size:9px;letter-spacing:.08em}
.ch7-decode{background:#fff0f7!important;border-color:#ed238c!important}.ch7-decode-loop{display:grid;gap:.35rem;margin:.5rem 0;padding:0;list-style:none;counter-reset:none}.ch7-decode-loop li{display:grid;grid-template-columns:26px 1fr;align-items:center;gap:.4rem;margin:0;padding:.4rem;background:#fff;border:2px solid #e2a2c6;font-size:11px;line-height:1.3}.ch7-decode-loop b{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#ed238c;color:#fff}.ch7-loop-arrow{display:block;margin:.35rem 0;color:#ad1764;text-align:center;font-size:10px;font-weight:900;letter-spacing:.08em}.ch7-output-token-row i{border-color:#ed238c;background:#fff}.ch7-output-token-row i:not(:last-child)::after{content:'→';margin-left:.35rem;color:#6b2cff}.ch7-stream-arrow{grid-column:1/-1;color:#ed238c;font-size:30px;font-weight:900;line-height:.7;text-align:center}.ch7-screen{grid-column:1/-1;display:grid;grid-template-columns:220px minmax(0,1fr);align-items:center;gap:.8rem;background:#e8fff5!important;border-color:#18a76d!important}.ch7-screen .ch7-phase{grid-column:1/-1;color:#13734d}.ch7-screen .ch7-phase b{background:#18a76d}.ch7-chat-answer{margin:0;background:#fff;border-color:#18a76d}.ch7-chat-answer>span{color:#13734d}.ch7-chat-answer i{display:inline-block;width:8px;height:18px;margin-left:.1rem;background:#4e18ca;vertical-align:middle}.ch7-screen>p{margin:0!important;color:#30395e;font-size:14px!important;line-height:1.45!important}.ch7-not-training{display:flex;gap:.65rem;margin:0;padding:.8rem 1.15rem;background:#fff1e8;border-top:3px solid #e65e2e;color:#3c4059;font-size:15px;line-height:1.45}.ch7-not-training strong{flex:0 0 auto;color:#a83c13}.ch7-request-journey figcaption{margin:0;padding:.9rem 1.15rem;background:#fff;border-top:2px solid #bcc8e2;color:#30395e;font-size:15px;line-height:1.5}
@media(max-width:850px){.ch7-request-journey{width:calc(100% + .4rem);margin:1.6rem 0 2.6rem -.2rem;box-shadow:5px 5px 0 #72dff2}.ch7-request-head{padding:.85rem}.ch7-request-head h4{font-size:24px}.ch7-request-head span{font-size:15px}.ch7-request-body{grid-template-columns:1fr;gap:.4rem;padding:.75rem}.ch7-request-body>.ch7-major-arrow{transform:rotate(90deg);font-size:24px;line-height:.7}.ch7-stream-arrow,.ch7-screen{grid-column:1}.ch7-request-body>section{padding:.75rem}.ch7-phase{font-size:12px}.ch7-chat-question p,.ch7-chat-answer p{font-size:15px!important}.ch7-context-stack i,.ch7-boundary,.ch7-phase-note,.ch7-decode-loop li{font-size:13px!important}.ch7-input-token-row i,.ch7-output-token-row i{font-size:12px}.ch7-parallel-lines{height:36px}.ch7-plain-label{font-size:17px!important}.ch7-frozen-model strong{font-size:16px}.ch7-screen{grid-template-columns:1fr}.ch7-screen .ch7-phase{grid-column:1}.ch7-screen>p{font-size:15px!important}.ch7-not-training{display:block;font-size:15px}.ch7-not-training strong{display:block}.ch7-request-journey figcaption{font-size:15px}}
.ch6-patch-proof{scroll-margin-top:54px;width:calc(100% + 4rem);margin:2.2rem 0 3.2rem -2rem;background:#f7fbff;border:3px solid var(--navy);box-shadow:10px 10px 0 #eea0cf;overflow:hidden;font-family:var(--reading-font)}
.ch6-patch-proof-head{padding:1.05rem 1.25rem 1.15rem;background:linear-gradient(110deg,#101842 0 72%,#41209c 72%);color:#fff}.ch6-patch-proof-head p{margin:0;color:#76eaff;font-size:12px;font-weight:900;letter-spacing:.13em}.ch6-patch-proof-head h4{margin:.4rem 0 .35rem;color:#fff;font-size:30px;line-height:1.05;letter-spacing:-.025em}.ch6-patch-proof-head span{display:block;max-width:72ch;color:#ffd9ec;font-size:17px;font-weight:700;line-height:1.4}
.ch6-patch-proof-body{display:grid;grid-template-columns:minmax(0,1fr) 34px minmax(0,1fr);align-items:start;gap:.7rem;padding:1.15rem;background:linear-gradient(180deg,#edf7ff,#fff7fc)}.ch6-patch-proof-body>section{min-width:0}.ch6-step-label{display:flex;align-items:center;gap:.45rem;margin-bottom:.55rem;color:#4e18ca;font-size:13px;font-weight:900;letter-spacing:.09em}.ch6-step-label b{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#4e18ca;color:white;font-size:14px}.ch6-flow-arrow{align-self:center;color:#ed238c;font-size:30px;font-weight:900;text-align:center}.ch6-patch-proof-body>.ch6-flow-arrow:nth-of-type(2){grid-column:1/-1;transform:rotate(90deg)}.ch6-translate{grid-column:1}.ch6-patch-proof-body>.ch6-flow-arrow:nth-of-type(3){grid-column:2}.ch6-combine{grid-column:3}
.ch6-photo-frame,.ch6-grid-photo{position:relative;aspect-ratio:4/3;border:3px solid var(--navy);background:#dff7ff;overflow:hidden}.ch6-photo-frame img,.ch6-grid-photo>img{display:block;width:100%;height:100%;object-fit:cover}.ch6-question{position:relative;margin:-.7rem .5rem 0!important;padding:.45rem .55rem!important;background:#fff;border:2px solid #ed238c;box-shadow:3px 3px 0 #ffc7e3;color:#101842;font-size:13px!important;font-weight:900!important;line-height:1.25!important;text-align:center}
.ch6-patch-overlay{position:absolute;inset:0;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(4,1fr)}.ch6-patch-cell{border:.8px solid rgba(255,255,255,.95);box-shadow:inset 0 0 0 .5px rgba(16,24,66,.55)}.ch6-patch-10,.ch6-patch-15,.ch6-patch-23{background:rgba(237,35,140,.18);box-shadow:inset 0 0 0 3px #ed238c}.ch6-divide>p,.ch6-translate>p{margin:.55rem 0 0!important;color:#394463;font-size:13px!important;line-height:1.35!important}
.ch6-sample-patches{display:grid;grid-template-columns:repeat(3,1fr);gap:.3rem}.ch6-sample-patches i{aspect-ratio:1;background-image:url('assets/ch06-bicycle-tree-learning-image.png');background-repeat:no-repeat;background-size:600% 400%;border:3px solid #ed238c}.ch6-sample-patches i:nth-child(1){background-position:60% 33%}.ch6-sample-patches i:nth-child(2){background-position:40% 67%}.ch6-sample-patches i:nth-child(3){background-position:100% 100%}.ch6-encoder{position:relative;margin:.75rem 0;padding:.58rem .5rem;background:#101842;color:#fff;text-align:center;clip-path:polygon(6% 0,94% 0,82% 100%,18% 100%)}.ch6-encoder::before{content:"↓";position:absolute;left:50%;top:-.75rem;transform:translateX(-50%);color:#6b2cff;font-size:18px}.ch6-encoder span,.ch6-encoder strong{display:block}.ch6-encoder span{color:#8ceeff;font-size:11px;font-weight:900;letter-spacing:.08em}.ch6-encoder strong{font-size:14px}.ch6-number-stream{display:grid;grid-template-columns:repeat(3,1fr);gap:.35rem}.ch6-number-stream i,.ch6-image-token{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:.28rem;padding:.35rem;background:#fff;border:2px solid #00aeca;color:#35128b;font-size:10px;font-style:normal;font-weight:900;text-align:center}.ch6-number-stream b,.ch6-image-token b{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#4e18ca;color:#fff;font-size:10px}.ch6-number-stream span,.ch6-image-token span{min-width:0;white-space:nowrap}.ch6-token-example{margin:.35rem 0 0!important;padding:.4rem!important;background:#edf9ff;border-left:5px solid #00aeca;color:#35128b!important;font-size:11px!important;line-height:1.25!important}.ch6-token-example small{display:block;color:#58617d;font-size:9px}
.ch6-context-ribbon{padding:.7rem;background:#fff;border:3px solid #101842}.ch6-image-token-row,.ch6-text-token-row{display:flex;align-items:center;gap:.3rem;min-width:0}.ch6-image-token-row strong,.ch6-text-token-row strong{width:72px;flex:0 0 auto;color:#4e18ca;font-size:10px;letter-spacing:.08em;line-height:1.15}.ch6-image-token-row strong small{display:block;margin-top:.15rem;color:#58617d;font-size:8px;letter-spacing:0}.ch6-image-token{flex:1;grid-template-columns:auto minmax(0,1fr);padding:.28rem;gap:.18rem;background:#e8fbff;font-size:9px}.ch6-image-token b{width:17px;height:17px;margin:auto;font-size:8px}.ch6-image-token-compact{display:grid;grid-template-columns:1fr;place-items:center;min-width:38px;padding:.5rem .25rem;background:#e8fbff;font-size:11px}.ch6-image-token-compact span{white-space:normal}.ch6-image-token-row>span{font-weight:900}.ch6-text-token-row{margin-top:.55rem;flex-wrap:wrap}.ch6-text-token-row i{padding:.28rem .35rem;background:#fff0f7;border:2px solid #ed238c;color:#101842;font-size:12px;font-style:normal;font-weight:800}.ch6-context-ribbon>p{margin:.6rem 0 0!important;padding-top:.45rem!important;border-top:2px solid #6b2cff;color:#4e18ca;font-size:11px!important;font-weight:900!important;letter-spacing:.08em!important;text-align:center}.ch6-answer{margin-top:.7rem;padding:.7rem;background:#e8fff5;border:3px solid #18a76d}.ch6-answer small,.ch6-answer strong{display:block}.ch6-answer small{color:#13734d;font-size:10px;font-weight:900;letter-spacing:.08em}.ch6-answer strong{margin-top:.2rem;color:#101842;font-size:17px;line-height:1.25}
.ch6-misconception{margin:0;padding:.8rem 1.15rem;background:#fff1e8;border-top:3px solid #e65e2e;color:#3c4059;font-size:15px;line-height:1.45}.ch6-misconception strong{color:#a83c13}.ch6-patch-proof figcaption{margin:0;padding:.9rem 1.15rem;background:#fff;border-top:2px solid #bcc8e2;color:#30395e;font-size:15px;line-height:1.5}
@media(max-width:850px){.build-banner{position:relative;top:auto}.ch6-patch-proof{width:calc(100% + .4rem);margin:1.6rem 0 2.6rem -.2rem;box-shadow:5px 5px 0 #eea0cf}.ch6-patch-proof-head{padding:.85rem}.ch6-patch-proof-head h4{font-size:24px}.ch6-patch-proof-head span{font-size:15px}.ch6-patch-proof-body{grid-template-columns:1fr;gap:.45rem;padding:.8rem}.ch6-patch-proof-body>.ch6-flow-arrow,.ch6-patch-proof-body>.ch6-flow-arrow:nth-of-type(2),.ch6-patch-proof-body>.ch6-flow-arrow:nth-of-type(3){grid-column:1;transform:rotate(90deg);font-size:24px;line-height:.7}.ch6-translate,.ch6-combine{grid-column:1;margin-top:0}.ch6-photo-frame,.ch6-grid-photo{max-height:260px}.ch6-question{font-size:15px!important}.ch6-divide>p,.ch6-translate>p{font-size:15px!important}.ch6-sample-patches{width:min(300px,82%);margin:auto}.ch6-number-stream{width:min(360px,100%);margin:auto}.ch6-image-token-row strong,.ch6-text-token-row strong{width:72px}.ch6-image-token{font-size:9px}.ch6-text-token-row i{font-size:12px}.ch6-answer strong{font-size:17px}.ch6-misconception,.ch6-patch-proof figcaption{font-size:15px}}
.ch4-token-proof{scroll-margin-top:54px;width:calc(100% + 4rem);margin:2.2rem 0 3.2rem -2rem;background:#fff;border:3px solid var(--navy);box-shadow:10px 10px 0 #72dff2;overflow:hidden;font-family:var(--reading-font)}
.ch4-token-proof-head{padding:1.05rem 1.25rem 1.15rem;background:linear-gradient(110deg,#101842 0 72%,#5b1fc4 72%);color:#fff}.ch4-token-proof-head p{margin:0;color:#76eaff;font-size:12px;font-weight:900;letter-spacing:.13em}.ch4-token-proof-head h4{margin:.4rem 0 .35rem;color:#fff;font-size:30px;line-height:1.05;letter-spacing:-.025em}.ch4-token-proof-head span{display:block;max-width:72ch;color:#ffd9ec;font-size:17px;font-weight:700;line-height:1.4}
.ch4-token-proof-body{padding:1.15rem;background:linear-gradient(180deg,#eef9ff,#fff7fc)}.ch4-token-proof-body section{padding:1rem;background:#fff;border:3px solid #a9b8dc}.ch4-phase{display:flex;align-items:center;gap:.5rem;color:#4e18ca;font-size:12px;font-weight:900;letter-spacing:.1em}.ch4-phase b{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#4e18ca;color:#fff}.ch4-phase-title{margin:.55rem 0 .85rem!important;color:#101842;font-size:19px!important;font-weight:900!important;line-height:1.25!important}.ch4-down-arrow{display:block;margin:.25rem 0;color:#ed238c;font-size:28px;font-weight:900;line-height:1;text-align:center}
.ch4-merge-line{display:flex;align-items:center;justify-content:center;gap:.55rem;padding:.7rem;background:#f4efff;border-block:2px solid #c8b8ec}.ch4-merge-line span{display:grid;place-items:center;min-width:44px;height:44px;border:3px solid #4e18ca;background:#fff;color:#101842;font-size:21px;font-weight:900}.ch4-merge-line .ch4-merged{min-width:64px;background:#e5f8ff;border-color:#00aeca}.ch4-merge-line .ch4-merged-final{min-width:76px;background:#e7fff3;border-color:#18a76d}.ch4-merge-line em{color:#58617d;font-size:19px;font-style:normal;font-weight:900}.ch4-merge-line strong{color:#ed238c;font-size:26px}.ch4-vocabulary-note{margin:.75rem 0 0!important;color:#3e496a;font-size:15px!important;line-height:1.45!important}
.ch4-user-text{margin:.35rem auto .55rem!important;padding:.65rem 1rem!important;max-width:max-content!important;background:#101842;color:#fff;font-size:24px!important;font-weight:800!important;line-height:1.2!important;letter-spacing:.01em}.ch4-cut-label{display:block;color:#ad1764;font-size:11px;font-weight:900;letter-spacing:.09em;text-align:center}.ch4-cut-label::after{content:"↓";display:block;margin:.15rem;color:#ed238c;font-size:22px;line-height:1}.ch4-chunk-row{display:flex;justify-content:center;gap:.35rem;flex-wrap:wrap}.ch4-token-chunk{display:grid;grid-template-rows:auto auto;min-width:70px;background:#fff;border:3px solid #00aeca;color:#101842;font-style:normal;text-align:center}.ch4-token-chunk b{padding:.45rem .55rem;font-size:18px}.ch4-token-chunk span{padding:.2rem;background:#e5f8ff;border-top:2px solid #00aeca;color:#4e18ca;font-size:10px;font-weight:900;letter-spacing:.07em}
.ch4-model-input{display:grid;grid-template-columns:minmax(250px,.9fr) minmax(0,1.1fr);gap:.85rem;align-items:center}.ch4-model-input .ch4-phase{grid-column:1/-1}.ch4-id-stream{display:flex;align-items:center;justify-content:center;gap:.25rem;padding:.8rem;background:#101842}.ch4-id-stream span{display:grid;place-items:center;width:42px;height:42px;border:2px solid #76eaff;background:#281171;color:#fff;font-size:14px;font-weight:900}.ch4-model-input>p{margin:0!important;color:#30395e;font-size:15px!important;line-height:1.45!important}
.ch4-letter-proof{display:grid;grid-template-columns:1fr 38px 1fr;align-items:center;gap:.65rem;padding:1rem 1.15rem;background:#fff0f7;border-top:3px solid #ed238c}.ch4-letter-proof>div{min-width:0;text-align:center}.ch4-letter-proof>div>span{color:#ad1764;font-size:11px;font-weight:900;letter-spacing:.08em}.ch4-letter-proof>b{color:#4e18ca;font-size:28px;text-align:center}.ch4-letter-proof>div>strong{display:block;margin-top:.45rem;color:#30395e;font-size:14px}.ch4-letter-row,.ch4-strawberry-chunks{display:flex;justify-content:center;margin:.5rem 0 0!important}.ch4-letter-row i{display:grid;place-items:center;width:31px;height:38px;border:1px solid #b7c2df;background:#fff;color:#101842;font-size:17px;font-style:normal;font-weight:800}.ch4-strawberry-chunks{gap:.35rem}.ch4-strawberry-chunks i{padding:.45rem .7rem;border:3px solid #00aeca;background:#e5f8ff;color:#101842;font-size:18px;font-style:normal;font-weight:900}.ch4-letter-landing{grid-column:1/-1;margin:.7rem 0 0!important;padding-top:.7rem!important;border-top:2px solid #e2b2cf;color:#30395e;font-size:15px!important;line-height:1.45!important}.ch4-token-proof figcaption{margin:0;padding:.9rem 1.15rem;background:#fff;border-top:2px solid #bcc8e2;color:#30395e;font-size:15px;line-height:1.5}
@media(max-width:850px){.ch4-token-proof{width:calc(100% + .4rem);margin:1.6rem 0 2.6rem -.2rem;box-shadow:5px 5px 0 #72dff2}.ch4-token-proof-head{padding:.85rem}.ch4-token-proof-head h4{font-size:24px}.ch4-token-proof-head span{font-size:15px}.ch4-token-proof-body{padding:.75rem}.ch4-token-proof-body section{padding:.8rem}.ch4-phase-title{font-size:17px!important}.ch4-merge-line{gap:.2rem;padding:.6rem .15rem}.ch4-merge-line span{min-width:32px;height:38px;font-size:18px}.ch4-merge-line .ch4-merged{min-width:46px}.ch4-merge-line .ch4-merged-final{min-width:52px}.ch4-merge-line em{font-size:16px}.ch4-merge-line strong{font-size:22px}.ch4-user-text{font-size:19px!important}.ch4-token-chunk{min-width:54px}.ch4-token-chunk b{padding:.38rem;font-size:15px}.ch4-model-input{grid-template-columns:1fr}.ch4-id-stream{gap:.18rem}.ch4-id-stream span{width:36px;height:36px;font-size:12px}.ch4-letter-proof{grid-template-columns:1fr}.ch4-letter-proof>b{transform:rotate(90deg);line-height:.8}.ch4-letter-row i{width:28px;height:34px;font-size:15px}.ch4-vocabulary-note,.ch4-model-input>p,.ch4-letter-landing,.ch4-token-proof figcaption{font-size:15px!important}}
.ch1-decision-seam{scroll-margin-top:54px;width:calc(100% + 4rem);margin:2.2rem 0 3.2rem -2rem;background:#fff;border:3px solid var(--navy);box-shadow:10px 10px 0 #75dfe8;overflow:hidden;font-family:var(--reading-font);color:var(--navy)}
.ch1-decision-head{padding:1.05rem 1.25rem 1.15rem;background:linear-gradient(110deg,#101842 0 72%,#40209b 72%);color:#fff}.ch1-decision-head p{margin:0;color:#76eaff;font-size:12px;font-weight:900;letter-spacing:.13em}.ch1-decision-head h4{margin:.4rem 0 .35rem;color:#fff;font-size:30px;line-height:1.05;letter-spacing:-.025em}.ch1-decision-head span{display:block;color:#ffd9ec;font-size:17px;font-weight:700;line-height:1.4}
.ch1-shared-email{display:grid;grid-template-columns:100px 1fr 52px;align-items:center;gap:1rem;padding:1rem 1.35rem;background:#edf8ff;border-bottom:3px solid #aab8dc}.ch1-shared-email b{display:block;color:#4e18ca;font-size:12px;letter-spacing:.12em}.ch1-shared-email p{margin:.25rem 0 0;font-size:18px;font-weight:800;line-height:1.35}.ch1-shared-email>span{color:#4e18ca;font-size:38px;font-weight:900;text-align:center}.ch1-envelope{position:relative;width:90px;height:58px;background:#fff;border:3px solid #132152;border-radius:5px;overflow:hidden}.ch1-envelope:before,.ch1-envelope:after{content:"";position:absolute;top:-30px;width:66px;height:66px;border-bottom:3px solid #132152;background:#f8d7ed;transform:rotate(45deg)}.ch1-envelope:before{left:-16px}.ch1-envelope:after{right:-16px;transform:rotate(-45deg)}.ch1-envelope i{position:absolute;right:8px;top:7px;width:16px;height:12px;background:#ff258d;z-index:2}
.ch1-causal-paths{display:grid;grid-template-columns:1fr 1fr;gap:1rem;padding:1rem;background:#f5f5ff}.ch1-path{display:flex;flex-direction:column;align-items:stretch;min-width:0;padding:1rem;border:3px solid;border-radius:12px}.ch1-rule-path{border-color:#11afc4;background:#e8faff}.ch1-learned-path{border-color:#ec238e;background:#fff0f7}.ch1-path-label{display:flex;justify-content:space-between;gap:.7rem;align-items:baseline;border-bottom:2px solid currentColor;padding-bottom:.55rem}.ch1-path-label b{font-size:24px}.ch1-path-label span{font-size:11px;font-weight:900;letter-spacing:.08em;text-align:right}.ch1-path-arrow{height:26px;color:#4e18ca;font-size:28px;font-weight:900;line-height:26px;text-align:center}
.ch1-before-input,.ch1-same-input{margin:.45rem 0;color:#4e18ca;font-size:10px;font-weight:900;letter-spacing:.08em;text-align:center}.ch1-before-input{color:#596184}
.ch1-human-rule,.ch1-rule-check,.ch1-pattern-machine{display:grid;grid-template-columns:72px 1fr;align-items:center;gap:.8rem;min-height:100px;padding:.7rem;background:#fff;border:2px solid #aab8dc}.ch1-human-rule p,.ch1-rule-check p,.ch1-pattern-machine p{margin:0}.ch1-human-rule strong,.ch1-rule-check strong,.ch1-pattern-machine strong{display:block;font-size:16px}.ch1-human-rule em,.ch1-rule-check em,.ch1-pattern-machine em{display:block;margin-top:.3rem;color:#394369;font-size:14px;font-style:normal;line-height:1.35}.ch1-person{position:relative;width:52px;height:66px;margin:auto}.ch1-person:before{content:"";position:absolute;left:14px;top:0;width:25px;height:25px;border:3px solid #132152;border-radius:50%;background:#ffd2e7}.ch1-person:after{content:"";position:absolute;left:4px;bottom:0;width:45px;height:34px;border:3px solid #132152;border-radius:22px 22px 4px 4px;background:#67dfea}.ch1-person i{position:absolute;right:-8px;bottom:4px;width:22px;height:27px;border:2px solid #132152;background:#fff;z-index:2}.ch1-person i:before,.ch1-person i:after{content:"";position:absolute;left:4px;right:4px;height:2px;background:#ec238e}.ch1-person i:before{top:7px}.ch1-person i:after{top:14px}
.ch1-magnifier{position:relative;width:46px;height:46px;margin:auto;border:5px solid #11afc4;border-radius:50%}.ch1-magnifier:after{content:"";position:absolute;width:28px;height:6px;right:-22px;bottom:-11px;background:#11afc4;transform:rotate(45deg);transform-origin:left center}.ch1-example-pile{display:grid;grid-template-columns:1fr 1fr;gap:.35rem;min-height:100px;padding:.55rem;background:#fff;border:2px solid #aab8dc}.ch1-example{display:grid;grid-template-columns:44px 1fr;align-items:center;gap:.35rem;padding:.35rem;border:1px solid #c3cbe2;background:#fff;font-style:normal}.ch1-example b{font-size:9px;letter-spacing:.04em}.ch1-example span{font-size:11px;line-height:1.15}.ch1-example.is-spam{border-left:6px solid #ec238e}.ch1-example.is-keep{border-left:6px solid #12ae75}.ch1-pattern-machine>div{display:grid;grid-template-columns:repeat(4,1fr);align-items:end;gap:3px;width:62px;height:54px;padding:7px;border:3px solid #132152;background:#dffaff}.ch1-pattern-machine>div i{display:block;background:#4e18ca}.ch1-pattern-machine>div i:nth-child(1){height:35%}.ch1-pattern-machine>div i:nth-child(2){height:75%}.ch1-pattern-machine>div i:nth-child(3){height:52%}.ch1-pattern-machine>div i:nth-child(4){height:90%}
.ch1-verdict{display:flex;justify-content:center;align-items:center;gap:.8rem;padding:.75rem;background:#132152;color:#fff}.ch1-verdict b{font-size:17px}.ch1-verdict span{font-size:13px;color:#ccefff}.ch1-one-product{display:grid;grid-template-columns:210px 1fr;align-items:center;gap:1rem;padding:.85rem 1.2rem;background:#fff4d9;border-top:3px solid #df9b13}.ch1-one-product strong{color:#8a5a00;font-size:15px;letter-spacing:.06em}.ch1-one-product span{font-size:15px;line-height:1.45}.ch1-decision-seam figcaption{margin:0;padding:.9rem 1.15rem;background:#fff;border-top:2px solid #bcc8e2;color:#30395e;font-size:15px;line-height:1.5}
@media(max-width:850px){.ch1-decision-seam{width:calc(100% + .4rem);margin:1.6rem 0 2.6rem -.2rem;box-shadow:5px 5px 0 #75dfe8}.ch1-decision-head{padding:.85rem}.ch1-decision-head h4{font-size:24px}.ch1-decision-head span{font-size:15px}.ch1-shared-email{grid-template-columns:66px 1fr;padding:.75rem;gap:.65rem}.ch1-shared-email>span{display:none}.ch1-envelope{width:62px;height:43px}.ch1-envelope:before,.ch1-envelope:after{top:-34px}.ch1-shared-email p{font-size:15px}.ch1-causal-paths{grid-template-columns:1fr;padding:.65rem;gap:.75rem}.ch1-path{padding:.65rem}.ch1-path-label b{font-size:20px}.ch1-human-rule,.ch1-rule-check,.ch1-pattern-machine{grid-template-columns:62px 1fr;min-height:88px;padding:.55rem}.ch1-human-rule strong,.ch1-rule-check strong,.ch1-pattern-machine strong{font-size:15px}.ch1-human-rule em,.ch1-rule-check em,.ch1-pattern-machine em{font-size:13px}.ch1-example span{font-size:10px}.ch1-one-product{grid-template-columns:1fr;padding:.75rem}.ch1-decision-seam figcaption{font-size:14px}}
.ch3-data-life{scroll-margin-top:54px;width:calc(100% + 4rem);margin:2.2rem 0 3.2rem -2rem;background:#fff;border:3px solid var(--navy);box-shadow:10px 10px 0 #82e1be;overflow:hidden;font-family:var(--reading-font);color:var(--navy)}
.ch3-data-head{padding:1.05rem 1.25rem 1.15rem;background:linear-gradient(110deg,#101842 0 72%,#0d7f8f 72%);color:#fff}.ch3-data-head p{margin:0;color:#76eaff;font-size:12px;font-weight:900;letter-spacing:.13em}.ch3-data-head h4{margin:.4rem 0 .35rem;color:#fff;font-size:30px;line-height:1.05;letter-spacing:-.025em}.ch3-data-head span{display:block;color:#d6fff2;font-size:17px;font-weight:700;line-height:1.4}
.ch3-life-body{display:grid;grid-template-columns:1fr 34px 1.25fr 34px 1.15fr;grid-template-areas:"job flowa prepare flowb split" ". . turn . ." "learn learn learn flowc use";gap:.65rem;padding:1rem;background:#f4f6ff}.ch3-life-body>section{min-width:0;padding:.75rem;border:2px solid #aab8dc;background:#fff}.ch3-job{grid-area:job}.ch3-prepare{grid-area:prepare}.ch3-split{grid-area:split}.ch3-learn-check{grid-area:learn}.ch3-use{grid-area:use}.ch3-flow-a{grid-area:flowa}.ch3-flow-b{grid-area:flowb}.ch3-flow-c{grid-area:flowc}.ch3-turn{grid-area:turn}.ch3-flow,.ch3-turn{display:flex;align-items:center;justify-content:center;color:#4e18ca;font-size:34px;font-weight:900}.ch3-stage{display:flex;align-items:center;gap:.45rem;margin-bottom:.65rem}.ch3-stage b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#4e18ca;color:#fff;font-size:14px}.ch3-stage span{font-size:10px;font-weight:900;letter-spacing:.08em}.ch3-life-body section>strong{display:block;margin:.45rem 0 .2rem;font-size:15px}.ch3-life-body section>p{margin:.2rem 0;color:#414a6a;font-size:12px;line-height:1.4}
.ch3-target{position:relative;width:78px;height:78px;margin:.2rem auto;border:7px solid #14afc4;border-radius:50%}.ch3-target:before{content:"";position:absolute;inset:13px;border:5px solid #ef218d;border-radius:50%}.ch3-target:after{content:"";position:absolute;inset:29px;border-radius:50%;background:#4e18ca}.ch3-target i{position:absolute;background:#132152}.ch3-target i:first-child{left:34px;top:-10px;width:3px;height:92px}.ch3-target i:nth-child(2){top:34px;left:-10px;width:92px;height:3px}.ch3-target i:nth-child(3){display:none}
.ch3-mail-pile{display:grid;grid-template-columns:repeat(3,1fr);gap:.28rem;margin:.3rem 0}.ch3-mail{position:relative;height:38px;border:2px solid #253469;background:#edf8ff;font-style:normal}.ch3-mail:before,.ch3-mail:after{content:"";position:absolute;top:2px;width:25px;height:25px;border-bottom:1px solid #253469;transform:rotate(45deg)}.ch3-mail:before{left:2px}.ch3-mail:after{right:2px;transform:rotate(-45deg)}.ch3-mail span{position:absolute;right:2px;bottom:2px;z-index:2;padding:1px 3px;background:#fff;font-size:7px;font-weight:900}.ch3-mail-5{opacity:.45}.ch3-prepare ol{margin:.45rem 0 0;padding-left:1.15rem}.ch3-prepare li{margin:.2rem 0;font-size:11px;font-weight:700;line-height:1.3}.ch3-prepare li::marker{color:#ef218d;font-weight:900}
.ch3-data-stacks{display:grid;gap:.45rem}.ch3-dataset{position:relative;display:grid;grid-template-columns:68px 1fr;align-items:center;gap:.55rem;min-height:58px;padding:.45rem;border:2px solid #aab8dc;background:#f8fbff}.ch3-dataset>div{display:flex;flex-direction:column-reverse;align-items:center}.ch3-dataset i{display:block;width:56px;height:17px;margin-top:-8px;border:2px solid #253469;background:#dff8ff}.ch3-dataset p{margin:0!important}.ch3-dataset strong{display:block;font-size:10px}.ch3-dataset span{display:block;margin-top:.15rem;color:#4d5674;font-size:10px;line-height:1.2}.ch3-data-stacks .ch3-train i{background:#c8f1df}.ch3-data-stacks .ch3-valid i{background:#efe2ff}.ch3-data-stacks .ch3-test i{background:#ffe0ef}.ch3-test b{position:absolute;left:51px;top:22px;width:20px;height:16px;border-radius:2px;background:#132152}.ch3-test b:before{content:"";position:absolute;left:5px;top:-9px;width:10px;height:11px;border:3px solid #132152;border-bottom:0;border-radius:8px 8px 0 0;box-sizing:border-box}
.ch3-learn-flow{display:grid;grid-template-columns:1fr 24px 1.2fr 24px 1fr;align-items:center;gap:.25rem}.ch3-learn-flow>b{color:#4e18ca;font-size:24px;text-align:center}.ch3-input-stack,.ch3-check-stack{padding:.55rem;border:2px solid #aab8dc;background:#f5fbff;text-align:center}.ch3-input-stack span,.ch3-check-stack span{display:block;font-size:9px;font-weight:900}.ch3-input-stack i{display:block;width:80%;height:10px;margin:-2px auto 0;border:1px solid #253469;background:#c8f1df}.ch3-check-stack em{display:block;margin-top:.25rem;font-size:10px;font-style:normal}.ch3-model{position:relative;display:grid;grid-template-columns:repeat(3,1fr);align-items:end;gap:4px;min-height:74px;padding:.65rem;border:3px solid #132152;background:#dffaff}.ch3-model i{display:block;background:#4e18ca}.ch3-model i:first-child{height:25px}.ch3-model i:nth-child(2){height:42px}.ch3-model i:nth-child(3){height:32px}.ch3-model strong{grid-column:1/-1;font-size:9px;text-align:center}.ch3-final-test{display:grid;grid-template-columns:auto 24px 1fr;align-items:center;gap:.35rem;margin-top:.65rem;padding:.55rem;background:#fff0f7;border:2px solid #ef218d}.ch3-final-test span{font-size:9px;font-weight:900}.ch3-final-test b{color:#4e18ca;text-align:center}.ch3-final-test strong{font-size:10px;line-height:1.25}
.ch3-new-mail{display:flex;flex-direction:column;align-items:center;gap:.35rem}.ch3-new-mail i{position:relative;width:78px;height:50px;border:3px solid #132152;background:#fff0f7}.ch3-new-mail i:after{content:"";position:absolute;left:13px;top:-14px;width:45px;height:45px;border-bottom:3px solid #132152;transform:rotate(45deg)}.ch3-new-mail span{font-size:10px;font-weight:900}.ch3-down{display:block;color:#4e18ca;font-size:25px;text-align:center}.ch3-prediction{padding:.65rem;background:#132152;color:#fff;font-size:15px;font-weight:900;text-align:center}.ch3-monitor{margin-top:.65rem;padding:.55rem;border:2px dashed #df9b13;background:#fff6df}.ch3-monitor strong{display:block;color:#8a5a00;font-size:9px}.ch3-monitor span{display:block;margin-top:.25rem;font-size:10px;line-height:1.35}
.ch3-missing{display:grid;grid-template-columns:230px 1fr;align-items:center;gap:1rem;padding:.85rem 1.2rem;background:#fff0d8;border-top:3px solid #df9b13}.ch3-missing strong{color:#8a5a00;font-size:14px;letter-spacing:.06em}.ch3-missing span{font-size:14px;line-height:1.45}.ch3-data-life figcaption{margin:0;padding:.9rem 1.15rem;background:#fff;border-top:2px solid #bcc8e2;color:#30395e;font-size:15px;line-height:1.5}
@media(max-width:850px){.ch3-data-life{width:calc(100% + .4rem);margin:1.6rem 0 2.6rem -.2rem;box-shadow:5px 5px 0 #82e1be}.ch3-data-head{padding:.85rem}.ch3-data-head h4{font-size:24px}.ch3-data-head span{font-size:15px}.ch3-life-body{grid-template-columns:1fr;grid-template-areas:"job" "flowa" "prepare" "flowb" "split" "turn" "learn" "flowc" "use";padding:.65rem}.ch3-flow,.ch3-turn{height:25px;font-size:28px;transform:rotate(90deg)}.ch3-turn{transform:none}.ch3-life-body>section{padding:.75rem}.ch3-life-body section>strong{font-size:16px}.ch3-life-body section>p{font-size:14px}.ch3-stage span{font-size:11px}.ch3-prepare li{font-size:13px}.ch3-mail{height:46px}.ch3-mail span{font-size:9px}.ch3-dataset{grid-template-columns:82px 1fr}.ch3-dataset i{width:68px;height:20px}.ch3-dataset strong{font-size:12px}.ch3-dataset span{font-size:12px}.ch3-test b{left:65px;top:24px}.ch3-learn-flow{grid-template-columns:1fr 25px 1.2fr 25px 1fr}.ch3-input-stack span,.ch3-check-stack span,.ch3-final-test span,.ch3-model strong{font-size:10px}.ch3-check-stack em,.ch3-final-test strong{font-size:11px}.ch3-new-mail span{font-size:11px}.ch3-monitor strong{font-size:10px}.ch3-monitor span{font-size:12px}.ch3-missing{grid-template-columns:1fr;padding:.75rem}.ch3-data-life figcaption{font-size:14px}}
.ch5-training-loop{scroll-margin-top:54px;width:calc(100% + 4rem);margin:2.2rem 0 3.2rem -2rem;background:#fff;border:3px solid var(--navy);box-shadow:10px 10px 0 #f0a6d0;overflow:hidden;font-family:var(--reading-font);color:var(--navy)}
.ch5-training-head{padding:1.05rem 1.25rem 1.15rem;background:linear-gradient(110deg,#101842 0 72%,#6328ba 72%);color:#fff}.ch5-training-head p{margin:0;color:#76eaff;font-size:12px;font-weight:900;letter-spacing:.13em}.ch5-training-head h4{margin:.4rem 0 .35rem;color:#fff;font-size:30px;line-height:1.05;letter-spacing:-.025em}.ch5-training-head span{display:block;color:#ffd9ec;font-size:17px;font-weight:700;line-height:1.4}
.ch5-example{display:grid;grid-template-columns:1fr 36px 180px;align-items:center;gap:.7rem;padding:.9rem 1.2rem;background:#edf8ff;border-bottom:3px solid #aab8dc}.ch5-example>span{color:#4e18ca;font-size:28px;font-weight:900;text-align:center}.ch5-example b{display:block;color:#4e18ca;font-size:10px;letter-spacing:.1em}.ch5-token-row{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.35rem}.ch5-token-row i{padding:.28rem .45rem;border:2px solid #24346b;background:#fff;color:#132152;font-size:14px;font-style:normal;font-weight:800}.ch5-known{padding:.55rem;border:2px solid #ef218d;background:#fff0f7}.ch5-known strong{display:block;margin-top:.2rem;font-size:21px}
.ch5-loop-body{display:grid;grid-template-columns:1fr 38px 1fr;grid-template-areas:"forward arrowa loss" ". . arrowb" "adjust arrowc backward" "repeat repeat repeat";gap:.7rem;padding:1rem;background:#f5f5ff}.ch5-loop-body>section{min-width:0;padding:.8rem;border:2px solid #aab8dc;background:#fff}.ch5-forward{grid-area:forward}.ch5-loss{grid-area:loss}.ch5-backward{grid-area:backward}.ch5-adjust{grid-area:adjust}.ch5-arrow-a{grid-area:arrowa}.ch5-arrow-b{grid-area:arrowb}.ch5-arrow-c{grid-area:arrowc}.ch5-repeat{grid-area:repeat;align-self:center}.ch5-loop-arrow{display:flex;align-items:center;justify-content:center;color:#4e18ca;font-size:34px;font-weight:900}.ch5-arrow-b{height:26px}.ch5-step{display:flex;align-items:center;gap:.45rem;margin-bottom:.65rem}.ch5-step b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#4e18ca;color:#fff;font-size:14px}.ch5-step span{font-size:10px;font-weight:900;letter-spacing:.08em}.ch5-loop-body section>p{margin:.65rem 0 0;color:#40496b;font-size:12px;line-height:1.4}
.ch5-forward-flow{display:grid;grid-template-columns:58px 20px 92px 20px 1fr;align-items:center;gap:.25rem}.ch5-forward-flow>b{color:#4e18ca;font-size:20px}.ch5-mini-tokens{display:flex;flex-direction:column;gap:.18rem}.ch5-mini-tokens i{padding:.2rem;border:1px solid #24346b;background:#e7faff;font-size:9px;font-style:normal;text-align:center}.ch5-network{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(4,1fr);gap:5px;min-height:95px;padding:.4rem;border:3px solid #132152;background:linear-gradient(90deg,#e6faff,#f5e9ff)}.ch5-network i{width:12px;height:12px;align-self:center;justify-self:center;border:2px solid #4e18ca;border-radius:50%;background:#fff}.ch5-likelihoods{display:grid;gap:.35rem}.ch5-likelihoods>div{display:grid;grid-template-columns:34px 1fr 29px;align-items:center;gap:.2rem}.ch5-likelihoods span,.ch5-likelihoods b{font-size:8px}.ch5-likelihoods i{height:9px;border:1px solid #253469;background:linear-gradient(90deg,#ef218d 0 var(--score),#edf0fa var(--score));font-style:normal}
.ch5-compare{display:grid;grid-template-columns:1fr 30px 1fr;align-items:center;gap:.3rem}.ch5-compare>div{padding:.45rem;border:2px solid #aab8dc;background:#f8fbff;text-align:center}.ch5-compare span{display:block;font-size:8px;font-weight:900}.ch5-compare strong{font-size:18px}.ch5-compare>b{color:#ef218d;font-size:24px;text-align:center}.ch5-loss-meter{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.4rem;margin-top:.7rem;padding:.55rem;background:#fff1f6;border:2px solid #ef218d}.ch5-loss-meter span,.ch5-loss-meter strong{font-size:9px}.ch5-loss-meter i{height:14px;border:1px solid #253469;background:#fff;font-style:normal}.ch5-loss-meter i b{display:block;width:82%;height:100%;background:#ef218d}
.ch5-error-trace{display:grid;grid-template-columns:82px 24px 1fr;align-items:center;gap:.35rem}.ch5-error-source{padding:.55rem;background:#ef218d;color:#fff;font-size:10px;font-weight:900;text-align:center}.ch5-error-trace>b{color:#4e18ca;font-size:24px}.ch5-contributions{display:grid;grid-template-columns:1fr 1fr;gap:.35rem}.ch5-contributions i{position:relative;height:38px;border:2px solid #253469;background:#eef9ff;font-style:normal}.ch5-contributions i:before{content:"";position:absolute;left:50%;top:4px;width:8px;height:8px;border:2px solid #4e18ca;border-radius:50%;transform:translateX(-50%)}.ch5-contributions span{position:absolute;left:0;right:0;bottom:3px;font-size:8px;font-weight:800;text-align:center}
.ch5-sliders{display:grid;gap:.45rem}.ch5-sliders>div{display:grid;grid-template-columns:58px 1fr;align-items:center;gap:.4rem}.ch5-sliders span{font-size:9px;font-weight:800}.ch5-sliders i{position:relative;height:8px;background:#d5dcef;font-style:normal}.ch5-sliders i:before,.ch5-sliders i:after{content:"";position:absolute;top:-5px;width:5px;height:18px}.ch5-sliders i:before{left:var(--before);background:#a5adc7}.ch5-sliders i:after{left:var(--after);background:#ef218d}.ch5-repeat{display:flex;flex-direction:column;gap:.3rem;justify-content:center;padding:.7rem;border:2px dashed #df9b13;background:#fff5de;text-align:center}.ch5-repeat b{color:#8a5a00;font-size:9px}.ch5-repeat span{font-size:9px;font-weight:900;line-height:1.35}
.ch5-accumulation{display:grid;grid-template-columns:170px 1fr;align-items:center;gap:1rem;padding:.85rem 1.2rem;background:#fff0db;border-top:3px solid #df9b13}.ch5-accumulation p{margin:0;font-size:14px;line-height:1.45}.ch5-drop-series{display:flex;align-items:flex-end;gap:5px;height:54px;padding:6px;border-left:3px solid #132152;border-bottom:3px solid #132152}.ch5-drop-series i{width:22px;background:#4e18ca}.ch5-drop-series i:nth-child(1){height:45px}.ch5-drop-series i:nth-child(2){height:36px}.ch5-drop-series i:nth-child(3){height:26px}.ch5-drop-series i:nth-child(4){height:18px}.ch5-drop-series i:nth-child(5){height:13px}.ch5-training-loop figcaption{margin:0;padding:.9rem 1.15rem;background:#fff;border-top:2px solid #bcc8e2;color:#30395e;font-size:15px;line-height:1.5}
@media(max-width:850px){.ch5-training-loop{width:calc(100% + .4rem);margin:1.6rem 0 2.6rem -.2rem;box-shadow:5px 5px 0 #f0a6d0}.ch5-training-head{padding:.85rem}.ch5-training-head h4{font-size:24px}.ch5-training-head span{font-size:15px}.ch5-example{grid-template-columns:1fr;padding:.75rem}.ch5-example>span{font-size:22px}.ch5-known{width:auto}.ch5-loop-body{grid-template-columns:1fr;grid-template-areas:"forward" "arrowa" "loss" "arrowb" "backward" "arrowc" "adjust" "repeat";padding:.65rem}.ch5-loop-arrow{height:24px;font-size:0;transform:none}.ch5-loop-arrow:after{content:"↓";font-size:28px}.ch5-loop-body>section{padding:.75rem}.ch5-loop-body section>p{font-size:14px}.ch5-step span{font-size:11px}.ch5-forward-flow{grid-template-columns:62px 22px 104px 22px 1fr}.ch5-network{min-height:105px}.ch5-likelihoods span,.ch5-likelihoods b{font-size:9px}.ch5-likelihoods>div{grid-template-columns:38px 1fr 32px}.ch5-compare span{font-size:9px}.ch5-error-trace{grid-template-columns:85px 24px 1fr}.ch5-contributions span{font-size:9px}.ch5-sliders span{font-size:11px}.ch5-repeat b,.ch5-repeat span{font-size:10px}.ch5-accumulation{grid-template-columns:1fr;padding:.75rem}.ch5-drop-series{width:170px;margin:auto}.ch5-training-loop figcaption{font-size:14px}}
.ch2-job-family{scroll-margin-top:54px;width:calc(100% + 4rem);margin:2.2rem 0 3.2rem -2rem;background:#fff;border:3px solid var(--navy);box-shadow:10px 10px 0 #eea0cf;overflow:hidden;font-family:var(--reading-font)}
.ch2-job-family-head{padding:1.05rem 1.25rem 1.15rem;background:linear-gradient(110deg,#101842 0 72%,#41209c 72%);color:#fff}.ch2-job-family-head p{margin:0;color:#76eaff;font-size:12px;font-weight:900;letter-spacing:.13em}.ch2-job-family-head h4{margin:.4rem 0 .35rem;color:#fff;font-size:30px;line-height:1.05;letter-spacing:-.025em}.ch2-job-family-head span{display:block;max-width:72ch;color:#ffd9ec;font-size:17px;font-weight:700;line-height:1.4}
.ch2-family-stack{padding:1rem 1.15rem;background:linear-gradient(180deg,#f3f8ff,#fff7fc)}.ch2-layer{position:relative;display:grid;grid-template-columns:150px minmax(0,1fr);gap:.85rem;align-items:center;padding:.8rem 1rem;background:#fff;border:3px solid #9dadd4}.ch2-layer-agent{margin-left:12%;border-color:#ed238c;background:#fff0f7}.ch2-layer-gen{margin-left:8%;border-color:#6b2cff;background:#f4efff}.ch2-layer-deep{margin-left:4%;border-color:#00aeca;background:#e8fbff}.ch2-layer-ml{border-color:#18a76d;background:#e8fff4}.ch2-layer-name{align-self:stretch;display:grid;grid-template-columns:32px 1fr;align-content:center;gap:.25rem .45rem;padding-right:.8rem;border-right:2px solid currentColor;color:#4e18ca}.ch2-layer-name b{grid-row:1/3;display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#4e18ca;color:#fff;font-size:13px}.ch2-layer-name span{font-size:11px;font-weight:900;letter-spacing:.08em}.ch2-layer-name strong{color:#101842;font-size:20px;line-height:1}.ch2-layer>p{grid-column:2;margin:.5rem 0 0!important;color:#394463;font-size:14px!important;line-height:1.35!important}.ch2-built-on{display:block;margin:.18rem 0 .18rem 4%;color:#4e18ca;font-size:10px;font-weight:900;letter-spacing:.08em}
.ch2-ml-flow,.ch2-deep-flow,.ch2-gen-flow{display:flex;align-items:center;justify-content:center;gap:.6rem;min-width:0}.ch2-ml-flow>b,.ch2-deep-flow>b,.ch2-gen-flow>b{color:#ed238c;font-size:24px}.ch2-ml-flow>strong,.ch2-deep-flow>strong{padding:.5rem .65rem;background:#101842;color:#fff;font-size:12px;line-height:1.2;text-align:center}.ch2-records{display:grid;gap:.18rem;width:100px}.ch2-records i{display:block;height:8px;background:linear-gradient(90deg,#18a76d 0 16%,#afeed0 16% 35%,#18a76d 35% 46%,#afeed0 46% 72%,#18a76d 72% 80%,#afeed0 80%)}.ch2-pattern{position:relative;width:110px;height:48px;background:#fff;border:2px solid #18a76d;overflow:hidden}.ch2-pattern i{position:absolute;inset:9px 8px 18px;background:linear-gradient(160deg,transparent 0 14%,#18a76d 15% 19%,transparent 20% 34%,#ed238c 35% 39%,transparent 40% 54%,#6b2cff 55% 59%,transparent 60%)}.ch2-pattern span{position:absolute;inset:auto 0 2px;color:#13734d;font-size:8px;font-weight:900;text-align:center}
.ch2-pixel-grid{display:grid;grid-template-columns:repeat(7,10px);grid-auto-rows:10px;gap:1px;padding:4px;background:#fff;border:2px solid #00aeca}.ch2-pixel-grid i{background:#c7eff7}.ch2-pixel-grid i:nth-child(7n+2),.ch2-pixel-grid i:nth-child(7n+6),.ch2-pixel-grid i:nth-child(12),.ch2-pixel-grid i:nth-child(16),.ch2-pixel-grid i:nth-child(17),.ch2-pixel-grid i:nth-child(18),.ch2-pixel-grid i:nth-child(23),.ch2-pixel-grid i:nth-child(24),.ch2-pixel-grid i:nth-child(25),.ch2-pixel-grid i:nth-child(31),.ch2-pixel-grid i:nth-child(33){background:#5b1fc4}.ch2-feature-stack{display:grid;gap:.18rem}.ch2-feature-stack i{padding:.15rem .35rem;background:#fff;border-left:4px solid #00aeca;color:#1a6170;font-size:9px;font-style:normal;font-weight:900}.ch2-deep-flow>strong{background:#007f96}
.ch2-gen-flow>p{margin:0!important;padding:.5rem .65rem!important;background:#fff;border:2px solid #6b2cff;color:#101842;font-size:12px!important;font-weight:800!important;line-height:1.25!important}.ch2-gen-flow>div{width:116px;padding:.4rem;background:#fff;border:2px solid #6b2cff}.ch2-gen-flow>div span{display:block;color:#4e18ca;font-size:9px;font-weight:900;letter-spacing:.08em}.ch2-gen-flow>div i{display:block;height:3px;margin:.3rem 0;background:#c9bbed}.ch2-gen-flow>div i:last-child{width:64%}
.ch2-agent-loop{display:grid;grid-template-columns:1fr;justify-items:center;gap:.18rem}.ch2-agent-row{display:flex;align-items:center;justify-content:center;gap:.35rem}.ch2-agent-loop i{min-width:86px;padding:.4rem .45rem;background:#fff;border:2px solid #ed238c;color:#101842;font-size:10px;font-style:normal;font-weight:900;line-height:1.15;text-align:center}.ch2-agent-loop i small{font-size:8px;font-weight:700}.ch2-agent-loop b{color:#ad1764}.ch2-agent-loop .ch2-agent-down{font-size:9px;letter-spacing:.06em}.ch2-agent-loop .ch2-observe{background:#fff5df;border-color:#df9b13}.ch2-agent-loop .ch2-human-check{background:#101842;color:#fff}.ch2-agent-loop span{width:100%;padding:.38rem .45rem;background:#fff;color:#ad1764;font-size:10px;font-weight:900;line-height:1.3;letter-spacing:.04em;text-align:center}
.ch2-job-test{margin:0;padding:.8rem 1.15rem;background:#fff5df;border-top:3px solid #df9b13;color:#3c4059;font-size:15px;line-height:1.45}.ch2-job-test strong{color:#8a5a00}.ch2-job-family figcaption{margin:0;padding:.9rem 1.15rem;background:#fff;border-top:2px solid #bcc8e2;color:#30395e;font-size:15px;line-height:1.5}
@media(max-width:850px){.ch2-job-family{width:calc(100% + .4rem);margin:1.6rem 0 2.6rem -.2rem;box-shadow:5px 5px 0 #eea0cf}.ch2-job-family-head{padding:.85rem}.ch2-job-family-head h4{font-size:24px}.ch2-job-family-head span{font-size:15px}.ch2-family-stack{padding:.7rem}.ch2-layer,.ch2-layer-agent,.ch2-layer-gen,.ch2-layer-deep,.ch2-layer-ml{grid-template-columns:1fr;margin-left:0;padding:.7rem}.ch2-layer-name{grid-template-columns:32px 1fr;padding:0 0 .55rem;border-right:0;border-bottom:2px solid currentColor}.ch2-layer>p{grid-column:1;font-size:14px!important}.ch2-built-on{margin:.2rem 0;text-align:center}.ch2-ml-flow,.ch2-deep-flow,.ch2-gen-flow{gap:.3rem}.ch2-records{width:75px}.ch2-pattern{width:88px}.ch2-pixel-grid{grid-template-columns:repeat(7,8px);grid-auto-rows:8px}.ch2-agent-loop{gap:.14rem}.ch2-agent-loop i{min-width:92px;padding:.38rem .35rem;font-size:10px}.ch2-agent-loop b{font-size:11px}.ch2-agent-loop .ch2-agent-down{font-size:9px}.ch2-agent-loop span{font-size:10px}.ch2-job-test,.ch2-job-family figcaption{font-size:15px}}
</style></head><body>
<div class="build-banner">INTERNAL TEXTBOOK BUILD · VISUAL TEACHING REBUILD · NOT PUBLISHED</div>
<div class="reader-shell"><aside class="reader-toc" id="reader-toc"><p class="book-label">AI Fundamentals 101</p><p class="meta">20 chapters · ${wordCount.toLocaleString("en-CA")} words · internal source build</p><button class="mobile-toc" type="button" aria-expanded="false" aria-controls="toc-list">Open contents</button><ol id="toc-list"><li><a href="#how-this-book-works">Start here</a></li>${nav}</ol></aside>
<main class="book-stage"><div class="source-boundary"><strong>Current status:</strong> the complete Quick manuscript remains a working textbook artifact and Ali has confirmed that these exact source bytes were fully vetted for accuracy. All 20 chapters remain registered for weekly automated freshness checks, immediate signal-triggered review and monthly-or-quarterly scheduled review. The CSS teaching layer shown on 2026-08-17 was rejected by Ali and remains quarantined. Two Chapter 1 visual learning aids are approved and integrated locally. Chapter 2 now has four replacement visual learning aids that passed maker desktop/mobile inspection and role-distinct chapter review. Older Chapter 2–13 raster assets are not admitted by this restart. Nothing has been published or propagated through the full book. Unfamiliar-reader admission, Library integration and public release remain open.</div>${mainFragment}</main></div>
<script>document.querySelector('.mobile-toc').addEventListener('click',event=>{const toc=document.querySelector('.reader-toc');const open=toc.classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(open));event.currentTarget.textContent=open?'Close contents':'Open contents'});document.querySelectorAll('.reader-toc a').forEach(link=>link.addEventListener('click',event=>{if(innerWidth<=850){const href=link.getAttribute('href');const target=href?.startsWith('#')?document.querySelector(href):null;document.querySelector('.reader-toc').classList.remove('open');document.querySelector('.mobile-toc').setAttribute('aria-expanded','false');document.querySelector('.mobile-toc').textContent='Open contents';if(target){event.preventDefault();history.pushState(null,'',href);requestAnimationFrame(()=>{const root=document.documentElement;const previous=root.style.scrollBehavior;root.style.scrollBehavior='auto';target.scrollIntoView({block:'start'});requestAnimationFrame(()=>{root.style.scrollBehavior=previous})})}}}));</script>
</body></html>\n`;
}

const frontBytes = readBytes(paths.front);
const manuscriptBytes = readBytes(paths.manuscript);
const playbookBytes = readBytes(paths.playbook);
const rewindBytes = readBytes(paths.rewind);
const front = frontBytes.toString("utf8").replaceAll("\r\n", "\n");
const manuscript = manuscriptBytes.toString("utf8").replaceAll("\r\n", "\n");
const playbook = playbookBytes.toString("utf8").replaceAll("\r\n", "\n");
const rewindAmendments = JSON.parse(rewindBytes.toString("utf8"));
const manuscriptSha = sha256(manuscriptBytes);
const rewindManuscript = applyRewindAmendments(manuscript, rewindAmendments, manuscriptSha);
const enrichedManuscript = applyRewindAmendments(rewindManuscript, {
  ...rewindAmendments,
  references: rewindAmendments.clarifications || [],
}, manuscriptSha);
const finalManuscript = applyRewindAmendments(enrichedManuscript, {
  ...rewindAmendments,
  references: rewindAmendments.sprinkles || [],
}, manuscriptSha);
const intro = parseFrontMatter(front);
const chapters = parseChapters(finalManuscript);

const source = {
  schemaVersion: "library-book-source.v1",
  bookId: "ai-fundamentals-101",
  contentVersion: "ai-fundamentals-101-quick-source-import-2026-08-16.1",
  displayTitle: "AI Fundamentals 101",
  eyebrow: "THE 101s · SUNNYVAiLE LIBRAiRY",
  readerJob: "Build a connected, nontechnical understanding of AI from familiar products through data, models, agents, infrastructure, safety, work and public consequences.",
  lede: "Follow the whole AI system in plain English, learn what each part does and know which question to ask when a product, workplace proposal or headline uses the label AI.",
  intro,
  chapters,
  sourceReferences: [rel(paths.front), rel(paths.manuscript), rel(paths.playbook), rel(paths.rewind)],
  correctionRoute: "Report the exact chapter, claim and public source to hello@laidies.ai without sending private work or personal material.",
  freshness: {
    reviewedThrough: "ALI_CONFIRMED_FULL_ACCURACY_VETTING_2026-08-16",
    nextTrigger: "Run the automated book scope weekly; recheck immediately when a relevant source signal is matched; review high-volatility chapters monthly and every other chapter quarterly.",
    owner: "Library with Learning Content and AI research accuracy",
  },
};

const sourceBytes = Buffer.from(`${JSON.stringify(source, null, 2)}\n`);
fs.writeFileSync(paths.source, sourceBytes);
const fragment = renderLibraryBookSource(source, rel(paths.source), sourceBytes);
fs.writeFileSync(paths.fragment, fragment);
const inventory = buildClaimInventory(finalManuscript, chapters);
fs.writeFileSync(paths.inventory, `${JSON.stringify(inventory, null, 2)}\n`);
const review = buildReviewPage(source, fragment, finalManuscript);
fs.writeFileSync(paths.review, review);

const artifactPaths = [
  paths.front,
  paths.manuscript,
  paths.playbook,
  paths.rewind,
  paths.source,
  paths.fragment,
  paths.inventory,
  paths.review,
  ...(chapterOnePurposeBuiltVisualActive ? [paths.chapterOnePurposeBuiltDesktop, paths.chapterOnePurposeBuiltMobile] : []),
  ...(chapterOneProductCutawayVisualActive ? [paths.chapterOneProductCutawayDesktop, paths.chapterOneProductCutawayMobile] : []),
  ...(chapterTwoPurposeBuiltVisualActive ? [
    paths.chapterTwoJobsDesktop,
    paths.chapterTwoJobsMobile,
    paths.chapterTwoTimelineDesktop,
    paths.chapterTwoTimelineMobile,
    paths.chapterTwoAgentDesktop,
    paths.chapterTwoAgentMobile,
    paths.chapterTwoTradeoffsDesktop,
    paths.chapterTwoTradeoffsMobile,
  ] : []),
  ...(chapterThreePurposeBuiltVisualActive ? [paths.chapterThreePurposeBuiltDesktop, paths.chapterThreePurposeBuiltMobile] : []),
  ...(chapterFourPurposeBuiltVisualActive ? [paths.chapterFourPurposeBuiltDesktop, paths.chapterFourPurposeBuiltMobile] : []),
  ...(chapterFivePurposeBuiltVisualActive ? [paths.chapterFivePurposeBuiltDesktop, paths.chapterFivePurposeBuiltMobile] : []),
  ...(chapterSixPurposeBuiltVisualActive ? [paths.chapterSixPurposeBuiltDesktop, paths.chapterSixPurposeBuiltMobile] : []),
  ...(chapterSevenPurposeBuiltVisualActive ? [paths.chapterSevenPurposeBuiltDesktop, paths.chapterSevenPurposeBuiltMobile] : []),
  ...(chapterEightPurposeBuiltVisualActive ? [paths.chapterEightPurposeBuiltDesktop, paths.chapterEightPurposeBuiltMobile] : []),
  ...(chapterNinePurposeBuiltVisualActive ? [paths.chapterNineRequestDesktop, paths.chapterNineRequestMobile, paths.chapterNineTrainingDesktop, paths.chapterNineTrainingMobile] : []),
  ...(chapterTenPurposeBuiltVisualActive ? [paths.chapterTenPurposeBuiltDesktop, paths.chapterTenPurposeBuiltMobile] : []),
  ...(chapterElevenPurposeBuiltVisualActive ? [paths.chapterElevenPurposeBuiltDesktop, paths.chapterElevenPurposeBuiltMobile] : []),
  ...(chapterTwelvePurposeBuiltVisualActive ? [paths.chapterTwelvePurposeBuiltDesktop, paths.chapterTwelvePurposeBuiltMobile] : []),
  ...(chapterThirteenPurposeBuiltVisualActive ? [paths.chapterThirteenPurposeBuiltDesktop, paths.chapterThirteenPurposeBuiltMobile] : []),
  ...(visualTeachingLayerActive ? [paths.chapterOneSpriteRules, paths.chapterOneSpriteProducts, paths.chapterOneWomanRulebook] : []),
  ...(representativeTeachingVisualActive ? [paths.chapterSixBicycleTree] : []),
];
const manifest = {
  schemaVersion: "laidies-library-source-import-manifest.v1",
  candidateId: "LIB-AI-FUNDAMENTALS-101-QUICK-MANUSCRIPT-20260816",
  status: "BUILT_LOCALLY_ALI_VETTED_SOURCE_NOT_ADMITTED_NOT_PUBLISHED",
  generatedAt: "2026-08-16",
  sourceIdentity: {
    frontMatterSha256: sha256(frontBytes),
    manuscriptSha256: sha256(manuscriptBytes),
    playbookSha256: sha256(playbookBytes),
    rewindAmendmentsSha256: sha256(rewindBytes),
  },
  counts: {
    chapters: chapters.length,
    manuscriptWords: stripText(manuscript).split(/\s+/).filter(Boolean).length,
    sections: 1 + chapters.length,
    conceptDiagrams: visualTeachingLayerActive ? conceptDiagrams.length : 0,
    teachingImages: Number(chapterOnePurposeBuiltVisualActive) + Number(chapterOneProductCutawayVisualActive) + (chapterTwoPurposeBuiltVisualActive ? 4 : 0) + Number(chapterThreePurposeBuiltVisualActive) + Number(chapterFourPurposeBuiltVisualActive) + Number(chapterFivePurposeBuiltVisualActive) + Number(chapterSixPurposeBuiltVisualActive) + Number(chapterSevenPurposeBuiltVisualActive) + Number(chapterEightPurposeBuiltVisualActive) + Number(chapterNinePurposeBuiltVisualActive) + Number(chapterTenPurposeBuiltVisualActive) + Number(chapterElevenPurposeBuiltVisualActive) + Number(chapterTwelvePurposeBuiltVisualActive) + Number(chapterThirteenPurposeBuiltVisualActive),
    cumulativeSystemMaps: visualTeachingLayerActive ? 18 : 0,
    representativeTeachingVisuals: representativeTeachingVisualActive ? 1 + Number(chapterOneDecisionSeamActive) + Number(chapterTwoJobFamilyActive) + Number(chapterThreeDataLifecycleActive) + Number(chapterFourTokenProofActive) + Number(chapterFiveTrainingLoopActive) + Number(chapterSevenRequestJourneyActive) + Number(chapterEightContextRetrievalActive) + Number(chapterNineCustomisationDecisionActive) : 0,
    rewindReferences: rewindAmendments.references.length,
    technicalClarifications: rewindAmendments.clarifications?.length || 0,
    humourSprinkles: rewindAmendments.sprinkles?.length || 0,
  },
  artifacts: artifactPaths.map(filePath => ({ path: rel(filePath), sha256: sha256(fs.readFileSync(filePath)) })),
  gates: {
    exactSourceImport: "PASS",
    deterministicRender: "PASS",
    factualAccuracy: "PASS_ALI_VETTED_EXACT_SOURCE_BYTES_2026-08-16",
    sourceBinding: "PASS_ALI_VETTED_EXACT_SOURCE_BYTES",
    freshnessRegistration: "PASS_20_CHAPTER_SCOPES_WEEKLY_AUTOMATION_MONTHLY_OR_QUARTERLY_REVIEW",
    rewindReferencePass: "PRODUCER_PASS_CURATED_OVERLAY_USER_REVIEW_PENDING",
    visualTeachingLayer: visualTeachingLayerStatus,
    chapterOnePurposeBuiltVisual: chapterOnePurposeBuiltVisualStatus,
    chapterOneProductCutawayVisual: chapterOneProductCutawayVisualStatus,
    chapterTwoPurposeBuiltVisual: chapterTwoPurposeBuiltVisualStatus,
    chapterThreePurposeBuiltVisual: chapterThreePurposeBuiltVisualStatus,
    chapterFourPurposeBuiltVisual: chapterFourPurposeBuiltVisualStatus,
    chapterFivePurposeBuiltVisual: chapterFivePurposeBuiltVisualStatus,
    chapterSixPurposeBuiltVisual: chapterSixPurposeBuiltVisualStatus,
    chapterSevenPurposeBuiltVisual: chapterSevenPurposeBuiltVisualStatus,
    chapterEightPurposeBuiltVisual: chapterEightPurposeBuiltVisualStatus,
    chapterNinePurposeBuiltVisual: chapterNinePurposeBuiltVisualStatus,
    chapterTenPurposeBuiltVisual: chapterTenPurposeBuiltVisualStatus,
    chapterElevenPurposeBuiltVisual: chapterElevenPurposeBuiltVisualStatus,
    chapterTwelvePurposeBuiltVisual: chapterTwelvePurposeBuiltVisualStatus,
    chapterThirteenPurposeBuiltVisual: chapterThirteenPurposeBuiltVisualStatus,
    representativeTeachingVisual: representativeTeachingVisualStatus,
    chapterOneDecisionSeam: chapterOneDecisionSeamStatus,
    chapterFourTokenProof: chapterFourTokenProofStatus,
    chapterTwoJobFamily: chapterTwoJobFamilyStatus,
    chapterThreeDataLifecycle: chapterThreeDataLifecycleStatus,
    chapterFiveTrainingLoop: chapterFiveTrainingLoopStatus,
    chapterSevenRequestJourney: chapterSevenRequestJourneyStatus,
    chapterEightContextRetrieval: chapterEightContextRetrievalStatus,
    chapterNineCustomisationDecision: chapterNineCustomisationDecisionStatus,
    unfamiliarReaderAdmission: "HOLD",
    publicRelease: "HOLD",
  },
};
fs.writeFileSync(paths.manifest, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`AI FUNDAMENTALS QUICK MANUSCRIPT BUILD PASS chapters=${chapters.length} words=${manifest.counts.manuscriptWords} source_sha=${manifest.sourceIdentity.manuscriptSha256} review=${rel(paths.review)}`);
