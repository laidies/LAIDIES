#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { renderLibraryBookSource } from "./render-library-book.mjs";

const root = process.cwd();
const markedPath = process.env.CODEX_MARKED_MODULE || "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/marked/lib/marked.esm.js";
const { marked } = await import(pathToFileURL(markedPath));
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8").replaceAll("\r\n", "\n");
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);
const slug = value => String(value).toLowerCase().replace(/[“”"']/g, "").replace(/[—–]/g, "-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section";
const plain = value => String(value).replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();

function renderMarkdown(markdown) {
  const counts = new Map();
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = renderer.parser.parseInline(tokens);
    const base = slug(plain(text));
    const count = counts.get(base) || 0;
    counts.set(base, count + 1);
    return `<h${depth} id="${count ? `${base}-${count + 1}` : base}">${text}</h${depth}>\n`;
  };
  return marked.parse(markdown, { renderer, gfm: true });
}

function splitTopLevel(markdown) {
  const clean = markdown.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
  const matches = [...clean.matchAll(/^#\s+(.+)$/gm)];
  return matches.map((match, index) => ({
    title: match[1].trim(),
    markdown: clean.slice(match.index + match[0].length, matches[index + 1]?.index ?? clean.length).trim()
  }));
}

function sourceFromTopLevelMarkdown({ markdown, bookId, contentVersion, displayTitle, eyebrow, readerJob, lede, sourceReferences }) {
  const blocks = splitTopLevel(markdown);
  if (blocks[0]?.title === displayTitle) blocks.shift();
  const sections = blocks.map((block, index) => ({
    id: slug(block.title.replace(/^Introduction:\s*/i, "introduction-").replace(/^Chapter\s+(\d+):.*/i, "chapter-$1")),
    title: block.title,
    navLabel: block.title.replace(/^Chapter\s+\d+:\s*/i, "").replace(/^Part\s+[IVX]+:\s*/i, "Part: "),
    bodyHtml: renderMarkdown(block.markdown)
  }));
  const introIndex = Math.max(0, sections.findIndex(section => /^Introduction/i.test(section.title)));
  const intro = sections.splice(introIndex, 1)[0];
  return {
    schemaVersion: "library-book-source.v1", bookId, contentVersion, displayTitle, eyebrow, readerJob, lede,
    intro, chapters: sections, sourceReferences,
    correctionRoute: "Report a correction at the Library correction desk without including private or confidential material.",
    freshness: { reviewedThrough: "2026-08-23", nextTrigger: "Before any public revision and whenever a named product, policy, statistic or source changes", owner: "LAiDIES Library with AI research accuracy" }
  };
}

function makeStraightAnswers(markdown) {
  const clean = markdown.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
  const titleMatch = clean.match(/^#\s+Straight Answers About AI$/m);
  const bodyStart = titleMatch.index + titleMatch[0].length;
  const body = clean.slice(bodyStart).trim();
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)];
  const introMarkdown = clean.slice(0, titleMatch.index).trim() + "\n\n" + body.slice(0, matches[0].index).trim();
  const chapters = matches.map((match, index) => ({
    id: slug(match[1]), title: match[1], navLabel: match[1],
    bodyHtml: renderMarkdown(body.slice(match.index + match[0].length, matches[index + 1]?.index ?? body.length).trim())
  }));
  const urls = [...new Set([...markdown.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map(match => match[1]))];
  return {
    schemaVersion: "library-book-source.v1", bookId: "straight-answers", contentVersion: "straight-answers-2026-08-23.1",
    displayTitle: "Straight Answers About AI", eyebrow: "REFERENCE · SUNNYVAiLE LIBRAiRY",
    readerJob: "Answer consequential everyday questions about AI with dated evidence, honest uncertainty and a practical next question.",
    lede: "Real questions about jobs, the environment, privacy, the economy and learning—answered with receipts and explicit limits.",
    intro: { id: "start-here", title: "How to use these answers", navLabel: "Start here", bodyHtml: renderMarkdown(introMarkdown) },
    chapters, sourceReferences: urls,
    correctionRoute: "Report a correction at the Library correction desk without including private or confidential material.",
    freshness: { reviewedThrough: "2026-08-23", nextTrigger: "Recheck each answer when its named dataset, report or policy changes and before each public edition", owner: "LAiDIES Library with independent source review" }
  };
}

function extractFundamentalsTerms(source) {
  const terms = [];
  for (const section of source.chapters) {
    const keyTermsTable = section.bodyHtml.match(/<h3[^>]*>Key Terms Introduced in This Chapter<\/h3>[\s\S]*?<table>[\s\S]*?<tbody>([\s\S]*?)<\/tbody><\/table>/i)?.[1] || "";
    for (const match of keyTermsTable.matchAll(/<tr><td><strong>([^<]+)<\/strong><\/td><td>([\s\S]*?)<\/td><\/tr>/g)) {
      terms.push({ label: plain(match[1]), definition: plain(match[2]), ownerBookId: source.bookId, ownerAnchor: section.id });
    }
  }
  return terms;
}

function extractWorkingTerms(markdown, source) {
  const terms = [];
  const chapters = splitTopLevel(markdown).filter(block => /^Chapter\s+\d+:/i.test(block.title));
  for (const chapter of chapters) {
    const table = chapter.markdown.match(/^## Key Terms\s*\n\n([\s\S]*?)(?=\n##\s)/m)?.[1] || "";
    for (const row of table.split("\n")) {
      const cells = row.trim().replace(/^\||\|$/g, "").split("|").map(cell => cell.trim());
      if (cells.length < 2 || /^[-: ]+$/.test(cells[0]) || /^Term$/i.test(cells[0])) continue;
      terms.push({ label: plain(cells[0].replaceAll("**", "")), definition: plain(cells[1].replaceAll("**", "")), ownerBookId: source.bookId, ownerAnchor: slug(chapter.title.replace(/^Chapter\s+(\d+):.*/i, "chapter-$1")) });
    }
  }
  return terms;
}

function makeDictionary(fundamentalsTerms, workingTerms) {
  const byKey = new Map();
  for (const term of fundamentalsTerms) byKey.set(term.label.toLowerCase(), { ...term, practicalAnchor: null });
  for (const term of workingTerms) {
    const existing = byKey.get(term.label.toLowerCase());
    if (existing) existing.practicalAnchor = term.ownerAnchor;
    else byKey.set(term.label.toLowerCase(), term);
  }
  const registry = [...byKey.values()].sort((a, b) => a.label.localeCompare(b.label)).map(term => ({
    term_id: slug(term.label), canonical_label: term.label, aliases: [], plain_definition: term.definition,
    scope_or_limit: "Plain-language teaching definition. Follow the linked chapter for its mechanism, examples and limits.",
    owner_book_id: term.ownerBookId, owner_content_version: term.ownerBookId === "ai-fundamentals-101" ? "ai-fundamentals-101-2026-08-24.2" : "working-with-ai-101-2026-08-24.2",
    owner_section_anchor: term.ownerAnchor,
    practical_anchor: term.practicalAnchor ? { book_id: "working-with-ai-101", section_anchor: term.practicalAnchor } : null,
    source_claim_ids: [`TERM-${slug(term.label).toUpperCase()}`],
    freshness_or_recheck_trigger: "Rebuild whenever either owner book changes this term or its destination anchor.", correction_state: "clear"
  }));
  const groups = new Map();
  for (const term of registry) {
    const letter = /^[a-z]/i.test(term.canonical_label) ? term.canonical_label[0].toUpperCase() : "#";
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter).push(term);
  }
  const sections = [...groups].map(([letter, terms]) => ({
    id: letter === "#" ? "letter-other" : `letter-${letter.toLowerCase()}`, title: letter, navLabel: letter,
    bodyHtml: terms.map(term => {
      const primary = `/library.html#${term.owner_book_id}::${encodeURIComponent(`@${term.owner_section_anchor}`)}`;
      const practical = term.practical_anchor ? ` <a href="/library.html#working-with-ai-101::${encodeURIComponent(`@${term.practical_anchor.section_anchor}`)}">Put it into practice</a>.` : "";
      return `<article class="term" id="term-${term.term_id}"><h3>${term.canonical_label}</h3><p>${term.plain_definition}</p><p class="go-deeper"><a href="${primary}">Read the full explanation</a>.${practical}</p></article>`;
    }).join("\n")
  }));
  const source = {
    schemaVersion: "library-book-source.v1", bookId: "ai-dictionary", contentVersion: "ai-dictionary-2026-08-23.1",
    displayTitle: "The AI Dictionary", eyebrow: "REFERENCE · SUNNYVAiLE LIBRAiRY",
    readerJob: "Find a plain-language AI term quickly, then continue into the maintained teaching chapter that owns its full meaning.",
    lede: `${registry.length} definitions from AI Fundamentals 101 and Working with AI 101, with a direct route to every fuller explanation.`,
    intro: { id: "how-this-dictionary-works", title: "How this dictionary works", navLabel: "Start here", bodyHtml: "<p>This is a front door, not a competing source of truth. AI Fundamentals 101 owns foundational definitions; Working with AI 101 owns additional practice terms. Every entry sends you to the maintained explanation, examples and limits.</p><p>Use the contents to jump by letter. If a term also has a practical chapter, you will see a second route.</p>" },
    chapters: sections,
    sourceReferences: ["content/library-books/sources/ai-fundamentals-101.source.json", "content/library-books/sources/working-with-ai-101.source.json"],
    correctionRoute: "Report a correction at the Library correction desk. Dictionary corrections must be resolved in the owner book first.",
    freshness: { reviewedThrough: "2026-08-23", nextTrigger: "Automatic rebuild after any owner definition or section-anchor change", owner: "LAiDIES Library derived-term registry" }
  };
  return { registry, source };
}

function addLaunchVisuals(fundamentals, working) {
  for (const section of [working.intro, ...working.chapters]) {
    section.bodyHtml = section.bodyHtml.replace(/<p>={20,}<\/p>/g, "");
  }
  const chapterOne = fundamentals.chapters.find(section => section.id === "chapter-1");
  chapterOne.bodyHtml = chapterOne.bodyHtml.replace(/<figure class="teaching-visual">[\s\S]*?<\/figure>/g, "");
  const automationVisual = `<figure class="teaching-visual"><picture><source media="(max-width:700px)" srcset="/content/library-books/assets/ai-fundamentals-101/ch01-automation-vs-ai-mobile.jpeg"><img src="/content/library-books/assets/ai-fundamentals-101/ch01-automation-vs-ai-desktop.jpeg" alt="Side-by-side comparison of fixed automation rules and an AI system that learns patterns from examples."></picture><figcaption>Automation follows a rule written in advance; AI learns a pattern from examples and applies it to new input.</figcaption></figure>`;
  const combinedRoutesVisual = `<figure class="teaching-visual"><picture><source media="(max-width:700px)" srcset="/content/library-books/assets/ai-fundamentals-101/ch01-one-inbox-two-routes-mobile.jpeg"><img src="/content/library-books/assets/ai-fundamentals-101/ch01-one-inbox-two-routes-desktop.jpeg" alt="One inbox splitting messages between a fixed rules route and a learned-pattern AI route."></picture><figcaption>One product can contain both: a fixed rule routes known conditions; a learned model handles pattern-based decisions.</figcaption></figure>`;
  const automationAnchor = `<p>That swap is the exact seam between the software you've used your whole life and the stuff now getting called AI.</p>`;
  const combinedRoutesAnchor = `<p>In real life, you don't encounter "AI" and "not AI" as separate things. You encounter <em>products</em> — and most products have both going on at the same time, in the same app, working together.</p>`;
  if (chapterOne.bodyHtml.split(automationAnchor).length !== 2 || chapterOne.bodyHtml.split(combinedRoutesAnchor).length !== 2) {
    throw new Error("AI Fundamentals visual placement anchors must each occur exactly once");
  }
  chapterOne.bodyHtml = chapterOne.bodyHtml
    .replace(automationAnchor, `${automationAnchor}${automationVisual}`)
    .replace(combinedRoutesAnchor, `${combinedRoutesAnchor}${combinedRoutesVisual}`);
  const introduction = working.intro;
  introduction.bodyHtml = introduction.bodyHtml
    .replace(/<figure class="teaching-visual">[\s\S]*?<\/figure>/g, "")
    .replace(/<figure class="working-loop-visual">[\s\S]*?<\/figure>/g, "");
  const workingLoopAnchor = `<p>This book turns those moving parts into one repeatable loop:</p>`;
  const workingLoopVisual = `<figure class="teaching-visual"><picture><source media="(max-width:700px)" srcset="/content/library-books/assets/working-with-ai-101/working-loop-mobile.png"><img src="/content/library-books/assets/working-with-ai-101/working-loop-desktop.png" alt="The Working with AI loop: set context, brief the task, shape the output, evaluate it and save what works."></picture><figcaption>The practical loop used throughout this book: set up, brief, shape, evaluate and make the useful parts repeatable.</figcaption></figure>`;
  if (introduction.bodyHtml.split(workingLoopAnchor).length !== 2) {
    throw new Error("Working with AI loop visual placement anchor must occur exactly once");
  }
  introduction.bodyHtml = introduction.bodyHtml.replace(workingLoopAnchor, `${workingLoopAnchor}${workingLoopVisual}`);
}

function addWorkingPanelSemantics(working) {
  for (const section of [working.intro, ...working.chapters]) {
    section.bodyHtml = section.bodyHtml
      .replace(/(<h2[^>]*>Learning Objectives<\/h2>)([\s\S]*?)(?=<h2[^>]*>Key Terms<\/h2>)/gi, '<section class="working-panel working-objectives">$1$2</section>')
      .replace(/(<h2[^>]*>Key Terms<\/h2>)([\s\S]*?)(?=<h2)/gi, '<section class="working-panel working-key-terms">$1$2</section>')
      .replace(/(<h2[^>]*>Try This:[\s\S]*?<\/h2>)([\s\S]*?)(?=<h3[^>]*>(?:Add to|Complete) Your Working With AI Kit<\/h3>)/gi, '<section class="working-panel working-practice">$1$2</section>')
      .replace(/(<h3[^>]*>(?:Add to|Complete) Your Working With AI Kit<\/h3>)([\s\S]*?)(?=<h2[^>]*>What&#39;s Next →<\/h2>)/gi, '<section class="working-panel working-kit">$1$2</section>')
      .replace(/(<h2[^>]*>What&#39;s Next →<\/h2>)([\s\S]*?)$/gi, '<section class="working-panel working-next">$1$2</section>')
      .replace(/<blockquote>/g, '<blockquote class="working-principle">')
      .replace(/<pre>/g, '<pre class="working-prompt-card">');
  }
}

function emit(source, sourcePath, renderedPath) {
  writeJson(sourcePath, source);
  const bytes = fs.readFileSync(path.join(root, sourcePath));
  const rendered = renderLibraryBookSource(source, sourcePath, bytes);
  fs.writeFileSync(path.join(root, renderedPath), rendered);
  console.log(`OPENING BOOK BUILD book=${source.bookId} source_sha256=${sha256(bytes)} artifact_sha256=${sha256(rendered)}`);
}

const fundamentalsPath = "content/library-books/sources/ai-fundamentals-101.source.json";
const fundamentals = JSON.parse(read(fundamentalsPath));
fundamentals.contentVersion = "ai-fundamentals-101-2026-08-24.2";
fundamentals.freshness.reviewedThrough = "2026-08-23";
fundamentals.freshness.nextTrigger = "Weekly currentness scan, immediate source-change signal and before each public edition";

const workingMarkdown = read("content/library-books/sources/working-with-ai-101.manuscript.md");
const working = sourceFromTopLevelMarkdown({
  markdown: workingMarkdown, bookId: "working-with-ai-101", contentVersion: "working-with-ai-101-2026-08-24.2", displayTitle: "Working with AI 101", eyebrow: "THE 101s · SUNNYVAiLE LIBRAiRY",
  readerJob: "Turn the connected concepts from AI Fundamentals 101 into a practical, repeatable way to work with AI while retaining judgment.",
  lede: "A hands-on companion for managing context, briefing work, controlling output, choosing modes, evaluating results and building repeatable workflows.",
  sourceReferences: [
    "content/library-books/sources/working-with-ai-101.manuscript.md",
    "operations/product-stewards/library/working-with-ai-101/CLAIM-SOURCE-PACKET-2026-08-23.md",
    "https://openai.com/index/chatgpt-memory-dreaming/",
    "https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex",
    "https://help.openai.com/en/articles/8983130-how-does-chatgpt-use-my-data",
    "https://www.anthropic.com/news/claude-opus-5",
    "https://metr.org/time-horizons/",
    "https://media-publications.bcg.com/BCG-BHI-GenAI-Experimental-Findings.pdf",
    "https://marketing.wharton.upenn.edu/profile/shawsd/",
    "https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php",
    "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/",
    "https://openai.com/index/trustworthy-third-party-evaluations-foundations/",
    "https://dreasays.substack.com/p/why-all-ai-content-sounds-exactly",
    "https://theslowai.substack.com/p/evidence-based-guide-ai-when-to-use-when-to-stop",
    "https://mattpaige68.substack.com/p/how-i-turned-claude-code-into-my",
    "https://www.oneusefulthing.org/p/management-as-ai-superpower",
    "https://www.ideaplan.io/blog/how-to-delegate-to-ai-agents-as-a-product-manager",
    "https://medium.com/@merrickcr/your-ai-code-reviewer-is-lying-to-you-here-is-how-i-caught-mine-b0869230b76f",
    "https://www.asianefficiency.com/technology/ai-prompt-templates-knowledge-workers/"
  ]
});
const straight = makeStraightAnswers(read("content/library-books/straight-answers.md"));
addLaunchVisuals(fundamentals, working);
addWorkingPanelSemantics(working);
const dictionary = makeDictionary(extractFundamentalsTerms(fundamentals), extractWorkingTerms(workingMarkdown, working));

emit(fundamentals, fundamentalsPath, "content/library-books/rendered/ai-fundamentals-101.html");
emit(working, "content/library-books/sources/working-with-ai-101.source.json", "content/library-books/rendered/working-with-ai-101.html");
emit(straight, "content/library-books/sources/straight-answers.source.json", "content/library-books/rendered/straight-answers.html");
writeJson("content/library-books/ai-dictionary.term-registry.json", { schema_version: "laidies-ai-dictionary-term-registry.v1", generated_at: "2026-08-23", authority: "DERIVED_FROM_ADMITTED_OWNER_BOOKS", terms: dictionary.registry });
emit(dictionary.source, "content/library-books/sources/ai-dictionary.source.json", "content/library-books/rendered/ai-dictionary.html");
