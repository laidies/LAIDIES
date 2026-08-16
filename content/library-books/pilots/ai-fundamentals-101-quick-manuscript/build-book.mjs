#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderLibraryBookSource } from "../../../../scripts/render-library-book.mjs";

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

const conceptDiagrams = chapterConcepts.map((concept, index) => ({ ...concept, after: primaryConceptSections[index] })).concat(additionalConcepts);

function renderConceptDiagram(concept) {
  if (!concept?.after) throw new Error("concept diagram is missing its exact section anchor");
  const steps = items => items.map((step, index) => `<li><span>${index + 1}</span><strong>${escapeHtml(step)}</strong></li>`).join("");
  const body = concept.kind === "compare"
    ? `<div class="concept-lanes">${concept.lanes.map(lane => `<section><h4>${escapeHtml(lane.label)}</h4><ol class="concept-flow">${steps(lane.steps)}</ol></section>`).join("")}</div>`
    : concept.kind === "branches"
      ? `<div class="concept-branches"><strong class="concept-hub">${escapeHtml(concept.hub)}</strong><ul>${concept.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ul></div>`
      : `<ol class="concept-flow${concept.loop ? " concept-loop" : ""}">${steps(concept.steps)}</ol>`;
  const id = concept.after.replace(".", "-");
  return `<figure class="concept-diagram" data-section="${concept.after}" aria-labelledby="concept-title-${id}"><div class="concept-heading"><p>SECTION ${concept.after} · VISUAL EXPLAINER</p><h3 id="concept-title-${id}">${escapeHtml(concept.title)}</h3><span>${escapeHtml(concept.question)}</span></div>${body}<figcaption><strong>What this diagram shows:</strong> ${escapeHtml(concept.takeaway)}</figcaption></figure>`;
}

const systemMapGroups = [
  { id: "orientation", label: "Orientation", nodes: [
    { chapter: 1, label: "AI boundary", role: "Learned patterns, not every kind of software" },
    { chapter: 2, label: "Capability family", role: "Prediction, recognition, generation and action" },
  ] },
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
  { id: "people", label: "People, responsibility and future", nodes: [
    { chapter: 19, label: "People + governance", role: "Build, operate, evaluate and govern every layer" },
    { chapter: 20, label: "Frontier questions", role: "Interpret disputed capabilities and consequences" },
  ] },
];

function renderSystemMap(throughChapter) {
  const groups = systemMapGroups.map(group => ({ ...group, nodes: group.nodes.filter(node => node.chapter <= throughChapter) })).filter(group => group.nodes.length);
  const complete = throughChapter === 20;
  return `<figure class="system-map${complete ? " system-map-complete" : ""}" aria-labelledby="system-map-title-${throughChapter}"><div class="system-map-heading"><p>YOUR AI SYSTEM MAP · CHAPTER ${throughChapter}</p><h3 id="system-map-title-${throughChapter}">${complete ? "The complete AI ecosystem" : `Now add: ${escapeHtml(systemMapGroups.flatMap(group => group.nodes).find(node => node.chapter === throughChapter)?.label || `Chapter ${throughChapter}`)}`}</h3><span>${complete ? "Every layer, connected" : `${throughChapter} of 20 layers revealed`}</span></div><div class="system-map-groups">${groups.map((group, groupIndex) => `<details class="map-band map-band-${group.id}"><summary><span class="map-band-number">${groupIndex + 1}</span><span class="map-band-title">${escapeHtml(group.label)}</span><span class="map-band-overview">${group.nodes.map(node => escapeHtml(node.label)).join(' → ')}</span></summary><div class="map-flow">${group.nodes.map(node => `<div class="map-node${node.chapter === throughChapter ? " map-node-current" : ""}"><span>CH ${node.chapter}</span><strong>${escapeHtml(node.label)}</strong><small>${escapeHtml(node.role)}</small></div>`).join('<span class="map-arrow" aria-hidden="true">→</span>')}</div></details>`).join("")}</div>${complete ? '<details class="map-draw-guide"><summary>How to draw it from memory</summary><ol><li>Start with the physical foundation.</li><li>Add the data-to-model building path.</li><li>Add the request-to-output use path.</li><li>Draw safety, evaluation and sandboxing across both paths.</li><li>Add agents and system craft around multi-step work.</li><li>Circle the whole map with people, governance and frontier questions.</li></ol></details>' : ""}<figcaption>This overview keeps the whole system visible. Open any layer for the job of each part. It is a relationship map, not one false assembly line.</figcaption></figure>`;
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
    mainFragment = `${mainFragment.slice(0, headingEnd)}\n<details class="chapter-ahead"><summary>Chapter goals and key terms</summary><div>${chapterFrontMatter}</div></details>\n${mainFragment.slice(firstSectionStart)}`;
  });
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
</style></head><body>
<div class="build-banner">INTERNAL TEXTBOOK BUILD · ALI-VETTED SOURCE · REWIND OVERLAY READY FOR ALI REVIEW · NOT PUBLISHED</div>
<div class="reader-shell"><aside class="reader-toc" id="reader-toc"><p class="book-label">AI Fundamentals 101</p><p class="meta">20 chapters · ${wordCount.toLocaleString("en-CA")} words · internal source build</p><button class="mobile-toc" type="button" aria-expanded="false" aria-controls="toc-list">Open contents</button><ol id="toc-list"><li><a href="#how-this-book-works">Start here</a></li>${nav}</ol></aside>
<main class="book-stage"><div class="source-boundary"><strong>Current status:</strong> the complete Quick manuscript is now a working textbook artifact and Ali has confirmed that these exact source bytes were fully vetted for accuracy. All 20 chapters are registered for weekly automated freshness checks, immediate signal-triggered review and monthly-or-quarterly scheduled review. A separately reviewable Rewind overlay adds 13 earned references without changing the source. Visual teaching, unfamiliar-reader admission and public release remain open.</div>${mainFragment}</main></div>
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

const artifactPaths = [paths.front, paths.manuscript, paths.playbook, paths.rewind, paths.source, paths.fragment, paths.inventory, paths.review];
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
    cumulativeSystemMaps: chapters.length,
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
    visualTeachingLayer: "BUILT_LOCALLY_SECTION_BOUND_DIAGRAMS_AND_CUMULATIVE_MAP_REVIEW_PENDING",
    unfamiliarReaderAdmission: "HOLD",
    publicRelease: "HOLD",
  },
};
fs.writeFileSync(paths.manifest, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`AI FUNDAMENTALS QUICK MANUSCRIPT BUILD PASS chapters=${chapters.length} words=${manifest.counts.manuscriptWords} source_sha=${manifest.sourceIdentity.manuscriptSha256} review=${rel(paths.review)}`);
