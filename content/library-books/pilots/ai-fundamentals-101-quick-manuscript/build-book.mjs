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

function renderConceptDiagram(concept) {
  return renderTeachingVisual(concept);
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
    return `${renderSystemMap(index + 1)}<nav class="chapter-turn" data-for="${chapter.id}" aria-label="Chapter ${index + 1} navigation">${previous ? `<a href="#${previous.id}">← Chapter ${index}</a>` : `<a href="#how-this-book-works">← Start here</a>`}<span>${escapeHtml(chapterPart(index + 1))}</span>${next ? `<a href="#${next.id}">Chapter ${index + 2} →</a>` : `<a href="#how-this-book-works">Back to start ↑</a>`}</nav>`;
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
.chapter-ahead{background:#fff;box-shadow:6px 6px 0 #aeeaf4}
.chapter-ahead-body{padding:1.15rem;background:#fff}
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
</style></head><body>
<div class="build-banner">INTERNAL TEXTBOOK BUILD · VISUAL TEACHING REBUILD · NOT PUBLISHED</div>
<div class="reader-shell"><aside class="reader-toc" id="reader-toc"><p class="book-label">AI Fundamentals 101</p><p class="meta">20 chapters · ${wordCount.toLocaleString("en-CA")} words · internal source build</p><button class="mobile-toc" type="button" aria-expanded="false" aria-controls="toc-list">Open contents</button><ol id="toc-list"><li><a href="#how-this-book-works">Start here</a></li>${nav}</ol></aside>
<main class="book-stage"><div class="source-boundary"><strong>Current status:</strong> the complete Quick manuscript is now a working textbook artifact and Ali has confirmed that these exact source bytes were fully vetted for accuracy. All 20 chapters are registered for weekly automated freshness checks, immediate signal-triggered review and monthly-or-quarterly scheduled review. A separately reviewable Rewind overlay adds 13 earned references without changing the source. The three Chapter 1 teaching figures, compact summary check, 45 section-bound Chapters 2–20 visuals and connected final AI-system map passed independent desktop/mobile visual review and are ready for Ali's review. Unfamiliar-reader admission, Library integration and public release remain open.</div>${mainFragment}</main></div>
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

const artifactPaths = [paths.front, paths.manuscript, paths.playbook, paths.rewind, paths.source, paths.fragment, paths.inventory, paths.review, paths.chapterOneSpriteRules, paths.chapterOneSpriteProducts, paths.chapterOneWomanRulebook, paths.chapterSixBicycleTree];
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
    conceptDiagrams: conceptDiagrams.length,
    teachingImages: chapterOneTeachingAssets.filter(asset => asset.countAsTeachingVisual !== false).length,
    cumulativeSystemMaps: 18,
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
    visualTeachingLayer: "CHAPTER_1_AND_CHAPTERS_2_20_VISUAL_TEACHING_LAYER_INDEPENDENT_DESKTOP_MOBILE_PASS_ALI_REVIEW_PENDING_NOT_INTEGRATED_NOT_PUBLISHED",
    unfamiliarReaderAdmission: "HOLD",
    publicRelease: "HOLD",
  },
};
fs.writeFileSync(paths.manifest, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`AI FUNDAMENTALS QUICK MANUSCRIPT BUILD PASS chapters=${chapters.length} words=${manifest.counts.manuscriptWords} source_sha=${manifest.sourceIdentity.manuscriptSha256} review=${rel(paths.review)}`);
