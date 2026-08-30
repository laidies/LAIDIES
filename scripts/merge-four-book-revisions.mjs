#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function replaceExactly(text, before, after, label) {
  const count = text.split(before).length - 1;
  if (count === 0 && text.includes(after)) return text;
  if (count !== 1) throw new Error(`${label}: expected exactly one match, found ${count}`);
  return text.replace(before, after);
}

function updateFundamentals() {
  const relative = "content/library-books/sources/ai-fundamentals-101.source.json";
  const target = path.join(root, relative);
  const source = JSON.parse(fs.readFileSync(target, "utf8"));
  const chapter3 = source.chapters.find(chapter => chapter.id === "chapter-3");
  const chapter4 = source.chapters.find(chapter => chapter.id === "chapter-4");
  if (!chapter3 || !chapter4) throw new Error("AI Fundamentals chapters 3 and 4 are required");

  chapter3.bodyHtml = replaceExactly(
    chapter3.bodyHtml,
    "A nonprofit that has crawled and archived over 9.5 petabytes of web data since 2008, freely available — the single biggest source of training data for AI",
    "A nonprofit that has built a freely available web archive of more than 10 pebibytes since 2008 — an important source used in many public AI training datasets",
    "Common Crawl term"
  );
  chapter3.bodyHtml = replaceExactly(
    chapter3.bodyHtml,
    "The single biggest source of crawled data for AI is a nonprofit called <strong>Common Crawl.</strong> Since 2008, they've been running web crawlers continuously, archiving what they find, and making the entire archive freely available. As of now, their archive is over 9.5 petabytes — that's roughly equivalent to 10 billion books' worth of text, or billions of web pages. Every major AI company — OpenAI, Google, Anthropic, Meta, Amazon — has used Common Crawl data for training.",
    "An important source of crawled web data used in many public AI training datasets is a nonprofit called <strong>Common Crawl.</strong> Since 2008, it has run web crawlers continuously, archived what it finds, and made the archive freely available. Common Crawl now describes that archive as more than 10 pebibytes of data spanning hundreds of billions of web pages. That scale explains why the archive appears in many published dataset and model records; it does not prove that every AI company or every model uses it.",
    "Common Crawl explanation"
  );
  chapter3.bodyHtml = replaceExactly(
    chapter3.bodyHtml,
    "A nonprofit that has been archiving the web since 2008. Over 9.5 petabytes of freely available data. The single biggest source of training text for AI.",
    "A nonprofit that has been archiving the web since 2008. Its freely available archive now exceeds 10 pebibytes and appears in many published AI training datasets.",
    "Common Crawl end-of-chapter term"
  );
  chapter4.bodyHtml = replaceExactly(
    chapter4.bodyHtml,
    "<div class=\"table-scroll\"><table><thead><tr><th scope=\"col\">Model</th><th scope=\"col\">Context window</th><th scope=\"col\">Roughly equivalent to...</th></tr></thead><tbody><tr><td>Older models (2023)</td><td>4,000–8,000 tokens</td><td>A few pages of text</td></tr><tr><td>GPT-4 (2023)</td><td>128,000 tokens</td><td>A short novel (~96,000 words)</td></tr><tr><td>Current frontier models (2026)</td><td>1,000,000 tokens</td><td>~750,000 words — roughly 1,500 pages</td></tr><tr><td>Gemini 3.1 Pro</td><td>10,000,000 tokens</td><td>~7.5 million words — an entire bookshelf</td></tr></tbody></table></div>\n<p>Context windows have grown roughly 1,000x in five years. In 2022, a system could barely hold a long essay in memory. Now, frontier models can hold the equivalent of multiple books at once.</p>",
    "<div class=\"table-scroll\"><table><thead><tr><th scope=\"col\">Model</th><th scope=\"col\">Context window</th><th scope=\"col\">Roughly equivalent to...</th></tr></thead><tbody><tr><td>Older models (2023)</td><td>4,000–8,000 tokens</td><td>A few pages of text</td></tr><tr><td>GPT-4 Turbo (2023)</td><td>128,000 tokens</td><td>A short novel (~96,000 words)</td></tr><tr><td>Gemini 3.1 Pro (2026)</td><td>1,000,000 input tokens</td><td>~750,000 words — roughly 1,500 pages</td></tr></tbody></table></div>\n<p>Advertised context windows have grown by well over 100 times since the 4,000-token systems common in 2022 and early 2023. Some current frontier models can accept the equivalent of multiple books at once. That is capacity, not a promise that every detail will be recalled or reasoned over equally well.</p>",
    "context-window table"
  );

  source.contentVersion = "ai-fundamentals-101-2026-08-29.1";
  source.freshness.reviewedThrough = "2026-08-29";
  source.edition = {
    reviewedOn: "29 August 2026",
    summary: "The complete 20-chapter foundation was reviewed for this edition while preserving the previously admitted teaching sequence.",
    changeHistory: "Restored the authored preface; corrected current Common Crawl, context-window, TSMC and OpenAI partnership claims; repaired cross-references and unavailable story placeholders; added a mechanism-specific check to every chapter."
  };
  for (const reference of ["https://commoncrawl.org/about", "https://ai.google.dev/gemini-api/docs/gemini-3"]) {
    if (!source.sourceReferences.includes(reference)) source.sourceReferences.push(reference);
  }

  for (const chapter of source.chapters) {
    chapter.bodyHtml = chapter.bodyHtml
      .replaceAll('📰 *<strong>The Big Picture</strong>** investigates:', '📰 <strong>The wider question:</strong>')
      .replaceAll('📰 <em><strong>The Big Picture</strong></em> <em>investigates:', '📰 <strong>The wider question:</strong> <em>')
      .replaceAll('* → [link to Big Picture]', '')
      .replaceAll('</em> → [link to Big Picture]', '</em>');
  }
  const chapter18 = source.chapters.find(chapter => chapter.id === "chapter-18");
  const chapter20 = source.chapters.find(chapter => chapter.id === "chapter-20");
  if (!chapter18 || !chapter20) throw new Error("AI Fundamentals chapters 18 and 20 are required");
  chapter18.bodyHtml = chapter18.bodyHtml
    .replaceAll("a company with decades of chip manufacturing experience and unlimited budget", "a company with decades of chip manufacturing experience and enormous resources")
    .replaceAll("despite $65 billion in investment", "within TSMC's planned $165 billion total US investment")
    .replaceAll("TSMC is building fabs in Arizona ($65 billion committed).", "TSMC says its planned total US investment is $165 billion, including expanded Arizona manufacturing and research facilities.");
  chapter20.bodyHtml = replaceExactly(
    chapter20.bodyHtml,
    "<li><strong>OpenAI's operational definition:</strong> A system that generates $100 billion in profits (yes, really — this is their actual contractual definition. It triggers a clause in their agreement with Microsoft. It tells you something about how differently people use the term.)</li>",
    "<li><strong>OpenAI–Microsoft contractual process:</strong> OpenAI may declare AGI, with that declaration verified by an independent expert panel. Their public agreement does not publish a simple capability threshold, which is another reminder that organisations operationalise the term differently.</li>",
    "OpenAI AGI definition"
  );
  chapter20.bodyHtml = replaceExactly(
    chapter20.bodyHtml,
    "A story about \"NVIDIA's new chip\" touches Chapter 16 (hardware), 17 (supply chain), and likely 16 (energy). A story about \"AI hallucinating in court\" touches 10 (safety), 11 (evaluation), and 7 (context/memory).",
    "A story about \"NVIDIA's new chip\" touches Chapter 16 (hardware), Chapter 17 (data centres and energy), and Chapter 18 (supply chain). A story about \"AI hallucinating in court\" touches Chapter 8 (context and memory), Chapter 11 (safety), and Chapter 12 (evaluation).",
    "final chapter cross-references"
  );
  for (const reference of [
    "https://pr.tsmc.com/english/news/3210",
    "https://openai.com/index/continuing-microsoft-partnership/"
  ]) {
    if (!source.sourceReferences.includes(reference)) source.sourceReferences.push(reference);
  }

  const checks = {
    "chapter-1": ["A tool sorts email using rules written by a person, then uses a learned model to spot unfamiliar spam. Is the product automation, AI or both?", "Both. The fixed sorting rules are automation; the learned spam judgement is AI."],
    "chapter-2": ["A system writes a new summary and then uses a calendar tool to schedule the follow-up. Which two layers are doing the work?", "Generative AI creates the summary; an agentic system uses the tool and takes the action."],
    "chapter-3": ["A hiring model repeatedly disadvantages a group represented poorly in its examples. Where should you investigate first?", "Start with the data: what was collected, labelled, omitted and treated as a successful outcome."],
    "chapter-4": ["Why can two tools count the same sentence differently?", "Their tokenisers may split the text into different token units. Tokens are model-specific representations, not universal words."],
    "chapter-5": ["When a trained model gives a poor answer, is it rewriting all its weights during your chat?", "Normally, no. Your request is inference; training is the separate process that created the weights."],
    "chapter-6": ["A model describes an image. Did it literally see it as a person does?", "No. It converted the image into numerical representations and learned relationships between those representations and language."],
    "chapter-7": ["Why might the same prompt produce two plausible but different answers?", "Inference samples from learned probabilities; decoding settings and context can change which continuation is selected."],
    "chapter-8": ["A fact appeared ten messages ago, but the model now ignores it. Which limit should you inspect?", "Inspect the active context and its relevance. Being inside the window does not guarantee equal attention or reliable use."],
    "chapter-9": ["You need answers grounded in a changing policy manual. Should you begin by retraining a model?", "Usually not. Retrieval can supply the current manual at answer time and is easier to update than model weights."],
    "chapter-10": ["Two apps use the same base model but behave differently. What should you inspect besides the model name?", "Inspect the wrapper, system instructions, available tools, retrieval, memory, routing and other harness components."],
    "chapter-11": ["A chatbot refuses unsafe requests. Does that prove every answer it permits is true?", "No. A guardrail controls some behaviours; factual accuracy still requires evaluation and verification."],
    "chapter-12": ["A model scores well on a benchmark. What does that establish?", "Only performance on that evaluation under its stated conditions. It does not prove reliability for every real task."],
    "chapter-13": ["Why give a file-editing agent a temporary folder instead of your whole drive?", "A sandbox limits what a mistake or malicious instruction can affect, reducing the blast radius."],
    "chapter-14": ["What turns a chatbot response into an agent loop?", "The system can choose and use tools, observe results, update its plan and continue toward a goal within bounded authority."],
    "chapter-15": ["A prompt works once but fails inside a long workflow. What might need engineering beyond the wording?", "The context, tool loop, state transitions, checks and graph of steps may need design—not just the prompt."],
    "chapter-16": ["Why are GPUs useful for AI training?", "They perform many similar calculations in parallel, which suits the matrix operations used by neural networks."],
    "chapter-17": ["Why is one universal carbon number per AI question misleading?", "Energy and emissions vary with model, hardware, workload, data-centre efficiency, location, time and electricity source."],
    "chapter-18": ["Why can money alone not quickly reproduce the leading chip supply chain?", "The chain depends on concentrated equipment, facilities, materials and years of embodied manufacturing expertise and yield improvement."],
    "chapter-19": ["A product problem is labelled 'the model is bad.' Which people might need to investigate it?", "Depending on the failure: model researchers, data and evaluation teams, product engineers, safety specialists, operators and domain experts."],
    "chapter-20": ["Someone predicts AGI by a specific year. What is the first clarifying question?", "Ask what they mean by AGI and what observable evidence would count. Timelines are meaningless without a definition and test."],
  };
  for (const chapter of source.chapters) {
    if (chapter.bodyHtml.includes('class="answer-reveal"')) continue;
    const [question, answer] = checks[chapter.id] || [];
    if (!question) throw new Error(`${chapter.id}: missing answer-reveal check`);
    const reveal = `<details class="answer-reveal"><summary>Check your understanding</summary><div class="answer-body"><p><strong>Question:</strong> ${question}</p><p><strong>Answer:</strong> ${answer}</p></div></details>\n`;
    const nextIndex = chapter.bodyHtml.search(/<h3[^>]*>[^<]*What&#39;s Next/i);
    chapter.bodyHtml = nextIndex >= 0
      ? `${chapter.bodyHtml.slice(0, nextIndex)}${reveal}${chapter.bodyHtml.slice(nextIndex)}`
      : `${chapter.bodyHtml}\n${reveal}`;
  }
  fs.writeFileSync(target, `${JSON.stringify(source, null, 2)}\n`);
}

function parseQuestionBook(markdown) {
  const categoryMatches = [...markdown.matchAll(/^##\s+(.+)$/gm)];
  const firstCategory = categoryMatches[0]?.index;
  if (firstCategory === undefined) throw new Error("Straight Answers requires category headings");
  const prefix = markdown.slice(0, firstCategory).trimEnd();
  const categories = categoryMatches.map((category, categoryIndex) => {
    const start = category.index + category[0].length;
    const end = categoryMatches[categoryIndex + 1]?.index ?? markdown.length;
    const categoryBody = markdown.slice(start, end);
    const questionMatches = [...categoryBody.matchAll(/^###\s+(.+)$/gm)];
    return {
      title: category[1].trim(),
      questions: questionMatches.map((question, questionIndex) => ({
        title: question[1].trim(),
        body: categoryBody.slice(question.index + question[0].length, questionMatches[questionIndex + 1]?.index ?? categoryBody.length).trim()
      }))
    };
  });
  return { prefix, categories };
}

function updateStraightAnswers() {
  const target = path.join(root, "content/library-books/straight-answers.md");
  const revision = path.join(root, "content/library-books/revisions/2026-08-29-claude/03-Straight-Answers-About-AI.md");
  const current = parseQuestionBook(fs.readFileSync(target, "utf8"));
  const candidate = parseQuestionBook(fs.readFileSync(revision, "utf8"));
  const admittedQuestions = new Set(current.categories.flatMap(category => category.questions.map(question => question.title)));
  if (admittedQuestions.size !== 15) throw new Error(`Expected 15 previously admitted Straight Answers questions, found ${admittedQuestions.size}`);

  const selectedCategories = candidate.categories.map(category => ({
    title: category.title,
    questions: category.questions.filter(question => admittedQuestions.has(question.title))
  })).filter(category => category.questions.length);
  const selectedQuestions = selectedCategories.flatMap(category => category.questions);
  if (selectedQuestions.length !== admittedQuestions.size) {
    const selected = new Set(selectedQuestions.map(question => question.title));
    const missing = [...admittedQuestions].filter(title => !selected.has(title));
    throw new Error(`Claude revision is missing admitted questions: ${missing.join(", ")}`);
  }

  let merged = [candidate.prefix, ...selectedCategories.map(category => [
    `## ${category.title}`,
    ...category.questions.map(question => `### ${question.title}\n\n${question.body}`)
  ].join("\n\n"))].join("\n\n").trim() + "\n";
  merged = replaceExactly(
    merged,
    "Anthropic says consumer users choose whether new or resumed chats may be used for model improvement; enabling that setting can extend retention to five years, while commercial products are excluded.",
    "Anthropic says consumer users choose whether new or resumed chats may be used for model improvement, while its commercial products are excluded by default. Retention rules vary by setting and purpose, so the current policy—not a remembered number—is the evidence.",
    "Anthropic training and retention distinction"
  );
  merged = merged.replace(
    "https://platform.openai.com/docs/models/default-usage-policies-by-endpoint",
    "https://developers.openai.com/api/docs/guides/your-data"
  );
  merged = merged.replace(/^reviewed:\s*2026-08-23$/m, "reviewed: 2026-08-29");
  merged = replaceExactly(
    merged,
    "- [USGS — Estimated Use of Water in the United States](https://www.usgs.gov/mission-areas/water-resources/science/water-use-united-states)",
    "- [USGS — Estimated Use of Water in the United States](https://www.usgs.gov/mission-areas/water-resources/science/water-use-united-states)\n- [ITIF — How Much Water Do Data Centers Use?](https://itif.org/publications/2026/02/09/how-much-water-do-data-centers-use/)",
    "water-use source list"
  );
  merged = replaceExactly(
    merged,
    "**Where it's contested** — Whether that pressure actually lands on ordinary residents is genuinely disputed, and this is a place where checking who paid for the research does real work. The three most-cited studies finding no meaningful residential impact are all industry-funded and disclose it: E3's December 2025 report was funded by Amazon, Charles River Associates' February 2026 report was commissioned by the Edison Electric Institute (the investor-owned utilities' trade body), and E3's May 2026 whitepaper was funded by the Data Center Coalition. A fourth is the strongest of them methodologically — EPRI's June 2026 causal analysis, which finds rates actually fell slightly — but two of its three authors work for EPRI, a utility-funded institute, and the paper carries no funding disclosure at all.\n\nThat is enough to keep those studies off this page's backbone. It is not enough to dismiss them, and it would be dishonest to imply the two sides are mirror images: the leading \"bills went up\" figure comes from Monitoring Analytics, PJM's federally designated independent market monitor, with supporting work from Lawrence Berkeley National Laboratory. That is not advocacy research.",
    "**Where it's contested** — Whether that pressure actually lands on ordinary residents is genuinely disputed. Funding is relevant context: E3's December 2025 report was funded by Amazon, Charles River Associates' February 2026 report was commissioned by the Edison Electric Institute, and E3's May 2026 whitepaper was funded by the Data Center Coalition. Those disclosures do not make the findings false, but they are reasons to read the methods and assumptions closely. EPRI's June 2026 causal analysis reports that rates fell slightly in the locations it studied; that result should be weighed alongside the PJM market monitor's estimate and Lawrence Berkeley National Laboratory's work rather than treated as a universal answer. The evidence does not yet support one nationwide conclusion.",
    "electricity-study funding wording"
  );
  fs.writeFileSync(target, merged);
}

function updateWorkingPracticeChecks() {
  const target = path.join(root, "content/library-books/sources/working-with-ai-101.manuscript.md");
  let manuscript = fs.readFileSync(target, "utf8");
  const checks = {
    1: ["The same request works yesterday and fails today. What should you inspect before rewriting the prompt?", "Inspect the model or mode, the active context, available tools, attached material and acceptance conditions. The visible sentence is only one part of the system."],
    2: ["Your brief is detailed but the output is generic. What is the likeliest missing ingredient?", "Useful source material or concrete context. More instructions cannot substitute for the information needed to do the job."],
    3: ["The answer contains the right ideas in an unusable shape. What should you change?", "Specify the output structure, audience, length, constraints and acceptance test—not the underlying task."],
    4: ["After several corrections the chat is confused. Continue patching or restart?", "Restart with a clean, consolidated brief when the conversation contains contradictory history or the desired result can no longer be stated cleanly."],
    5: ["A long chat contains the needed fact. Does that guarantee the model will use it?", "No. Presence in the context is capacity, not reliable attention. Restate critical facts and use a clean handover when needed."],
    6: ["Where should a stable preference and a changing project fact live?", "Put the stable preference in persistent instructions or a reusable profile; put the changing fact in the current project brief or source material."],
    7: ["Should you choose a model by leaderboard rank alone?", "No. Test the actual task for quality, speed, cost, data controls and required tools."],
    8: ["A model handled a difficult analysis. Can you assume it will handle a simple counting task?", "No. Capability is jagged. Test the specific task and define how failure will be detected."],
    9: ["An AI can access email and files. What changes besides convenience?", "Its authority and blast radius increase. Limit permissions, scope, tools and confirmation points before use."],
    10: ["What is the safest first recurring agent task?", "A low-risk, read-only task with a narrow source set, a visible output, an easy stop condition and no authority to send, buy, delete or publish."],
    11: ["When is a fluent answer not good enough?", "Whenever the consequence of error matters. Verify the claims, calculations, citations and fit against an explicit acceptance test."],
    12: ["What must be explicit before an AI may act for you?", "The goal, allowed information, available tools, spending or publishing authority, confirmation points, stop conditions and evidence it must return."],
    13: ["What makes a successful AI workflow reusable rather than merely repeatable by memory?", "A saved brief, permitted source set, acceptance checks, decision rule, named owner and trigger for review when inputs or tools change."],
  };
  const chapters = [...manuscript.matchAll(/^# Chapter\s+(\d+):/gm)];
  if (chapters.length !== 13) throw new Error(`Working with AI: expected 13 chapters, found ${chapters.length}`);
  for (let index = chapters.length - 1; index >= 0; index -= 1) {
    const number = Number(chapters[index][1]);
    const start = chapters[index].index;
    const end = chapters[index + 1]?.index ?? manuscript.length;
    const block = manuscript.slice(start, end);
    if (block.includes('<details class="answer-reveal">')) continue;
    const nextHeading = block.indexOf("## What's Next");
    const next = nextHeading >= 0 ? nextHeading : block.length;
    const [question, answer] = checks[number];
    const reveal = `<details class="answer-reveal">\n<summary>Check your understanding</summary>\n<div class="answer-body">\n\n**Question:** ${question}\n\n**Answer:** ${answer}\n\n</div>\n</details>\n\n`;
    const updated = `${block.slice(0, next)}${reveal}${block.slice(next)}`;
    manuscript = `${manuscript.slice(0, start)}${updated}${manuscript.slice(end)}`;
  }
  fs.writeFileSync(target, manuscript);
}

updateFundamentals();
updateWorkingPracticeChecks();
updateStraightAnswers();
