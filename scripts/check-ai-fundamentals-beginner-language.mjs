#!/usr/bin/env node

import fs from "node:fs";

const rejectedDefinitions = [
  "building machine-based systems that infer outputs",
  "A **model** is the component that performs an inference."
];

const r6RequiredBeginnerEvidence = [
  "Before we define anything, look at what is already happening around you.",
  "Input means what goes in. Output means what comes back.",
  "It is not one machine, one app or one particular chatbot.",
  "software, model, data, chips, servers, tools and people"
];

const r7RequiredBeginnerEvidence = [
  "Here is the first useful thing to know: **those labels are not one list of competing options.**",
  "**Artificial intelligence**, or **AI**, is the broad field",
  "Here is a concrete example.",
  "That is an AI job.",
  "**AI is the broad field. Machine learning is one important way",
  "## Some labels describe the job",
  "## Other labels describe what information and actions are involved",
  "## Specialised, general-purpose, AGI and ASI make claims about breadth"
];

const r7ForbiddenAtOrientation = [
  "probability distribution",
  "calibration",
  "encoder",
  "attention mechanism",
  "orchestration",
  "parameter",
  "embedding"
];

const r8RequiredEvidence = [
  "# Chapter 1: How AI changed, and what all those names mean",
  "## Start here: what is artificial intelligence?",
  "## First came AI built from human knowledge",
  "That instruction may be useful, but it is simply a business rule.",
  "## Machine learning lets the computer find patterns in examples",
  "## Predictive AI uses patterns to estimate a new case",
  "## Deep learning made much more complicated patterns possible",
  "## Generative AI creates new content",
  "## Multimodal AI connects more than one form of information",
  "## Agentic AI can pursue a goal through several steps",
  "## Embodied AI senses or acts in the physical world",
  "**Artificial general intelligence**, usually shortened to **AGI**",
  "**Artificial superintelligence**, or **ASI**",
  "## Check that the story now holds together"
];

const r8RejectedR7Phrases = [
  "AGI and ASI make much bigger claims",
  "what job is this part of the system doing?",
  "## Some labels describe the job",
  "Remember Friday night at the video shop?",
  "if a transaction is above a certain amount and occurs in a country"
];

const r9RequiredEvidence = [
  "# Chapter 1: What all the AI names actually mean",
  "## Start with the biggest term: artificial intelligence",
  "## How did it get its working knowledge?",
  "### People can supply knowledge and reasoning rules",
  "### Machine learning finds useful patterns in examples",
  "### Deep learning is one kind of machine learning",
  "## What result does it produce?",
  "## What kinds of information can it connect?",
  "## What happens after it gives an answer?",
  "## Does it sense or act in the physical world?",
  "## How broad are its abilities?",
  "## A short timeline, not a ladder",
  "## Put the labels together on one product",
  "## Check that the story now holds together",
  "## What you can now say with confidence",
  "In Chapter 2, we will follow one ordinary request after you press **Send**"
];

const r9RejectedFalsePassPhrases = [
  ...r8RejectedR7Phrases,
  "## First came AI built from human knowledge",
  "## Machine learning lets the computer find patterns in examples",
  "## Deep learning made much more complicated patterns possible",
  "## A short timeline of the ideas",
  "A Swiss Army knife"
];

export function aiFundamentalsBeginnerLanguageIssues(text, { requireOpeningSequence = true } = {}) {
  const issues = [];
  const normalized = text.replace(/\s+/g, " ");
  for (const phrase of rejectedDefinitions) {
    if (normalized.includes(phrase)) issues.push(`rejected jargon-first definition: ${phrase}`);
  }
  if (requireOpeningSequence) {
    const r9 = text.includes("# Chapter 1: What all the AI names actually mean");
    const r8 = text.includes("# Chapter 1: How AI changed, and what all those names mean");
    const r7 = text.includes("introduction-and-chapter-1-r7") || text.includes("# Chapter 1: The different AI labels and how they fit together");
    const requiredBeginnerEvidence = r9 ? r9RequiredEvidence : r8 ? r8RequiredEvidence : r7 ? r7RequiredBeginnerEvidence : r6RequiredBeginnerEvidence;
    for (const phrase of requiredBeginnerEvidence) {
      if (!text.includes(phrase)) issues.push(`missing beginner-sequence evidence: ${phrase}`);
    }
    if (r7) {
      const depthStart = text.indexOf("### Go deeper:");
      const orientation = depthStart < 0 ? text : text.slice(0, depthStart);
      for (const term of r7ForbiddenAtOrientation) {
        if (new RegExp(`\\b${term.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}s?\\b`, "i").test(orientation)) {
          issues.push(`later-chapter jargon appears before optional depth: ${term}`);
        }
      }
      const formal = text.indexOf("**Artificial intelligence**, or **AI**, is the broad field");
      const ordinary = text.indexOf("The words have escaped the lab");
      if (ordinary < 0 || formal < 0 || ordinary >= formal) issues.push("human context must precede the first AI definition");
      const check = text.indexOf("## Check that the labels now make sense");
      if (check < 0 || !text.slice(check).includes("**Reasoned answer:**")) issues.push("transfer check requires a reasoned answer");
      if (text.includes("AGI and ASI make much bigger claims")) issues.push("R7 uses AGI and ASI before definition");
      if (text.includes("what job is this part of the system doing?")) issues.push("R7 uses a vague system-part referent");
      if (text.includes("Remember Friday night at the video shop?")) issues.push("R7 uses a human clerk as the core AI explanation");
      if (text.includes("if a transaction is above a certain amount and occurs in a country")) issues.push("R7 uses trivial automation as the rule-based AI example");
    }
    if (r8) {
      for (const phrase of r8RejectedR7Phrases) {
        if (text.includes(phrase)) issues.push(`rejected R7 false-pass phrase: ${phrase}`);
      }
      const ordered = r8RequiredEvidence.slice(1, 11).map(phrase => text.indexOf(phrase));
      if (ordered.some(index => index < 0) || ordered.some((index, position) => position > 0 && index <= ordered[position - 1])) {
        issues.push("R8 chronological prerequisite sequence is broken");
      }
      const agiFull = text.indexOf("**Artificial general intelligence**, usually shortened to **AGI**");
      const asiFull = text.indexOf("**Artificial superintelligence**, or **ASI**");
      const beforeAgi = text.slice(0, Math.max(0, agiFull));
      const beforeAsi = text.slice(0, Math.max(0, asiFull));
      if (/\bAGI\b/.test(beforeAgi)) issues.push("AGI appears before artificial general intelligence is defined");
      if (/\bASI\b/.test(beforeAsi)) issues.push("ASI appears before artificial superintelligence is defined");
      const check = text.indexOf("## Check that the story now holds together");
      if (check < 0 || !text.slice(check).includes("**Reasoned answer:**")) issues.push("R8 transfer check requires reasoned answers");
      issues.push("R8 false pass: overlapping label families are presented as a historical succession");
    }
    if (r9) {
      for (const phrase of r9RejectedFalsePassPhrases) {
        if (text.includes(phrase)) issues.push(`rejected R8/R7 false-pass phrase: ${phrase}`);
      }
      const ordered = r9RequiredEvidence.slice(1).map(phrase => text.indexOf(phrase));
      if (ordered.some(index => index < 0) || ordered.some((index, position) => position > 0 && index <= ordered[position - 1])) {
        issues.push("R9 reader-question and synthesis sequence is broken");
      }
      const timeline = text.indexOf("## A short timeline, not a ladder");
      const synthesis = text.indexOf("## Put the labels together on one product");
      if (timeline < 0 || synthesis < 0 || timeline >= synthesis) issues.push("R9 history qualification must precede product synthesis");
      const agiFull = text.indexOf("**Artificial general intelligence**, usually shortened to **AGI**");
      const asiFull = text.indexOf("**Artificial superintelligence**, or **ASI**");
      if (/\bAGI\b/.test(text.slice(0, Math.max(0, agiFull)))) issues.push("AGI appears before artificial general intelligence is defined");
      if (/\bASI\b/.test(text.slice(0, Math.max(0, asiFull)))) issues.push("ASI appears before artificial superintelligence is defined");
      const correctionRoutes = text.match(/return to \*\*/gi) || [];
      if (correctionRoutes.length < 4) issues.push("R9 checks require four exact misconception return routes");
    }
  }
  return issues;
}

if (process.argv[1]?.endsWith("check-ai-fundamentals-beginner-language.mjs")) {
  const target = process.argv[2];
  if (!target) throw new Error("Usage: node scripts/check-ai-fundamentals-beginner-language.mjs <candidate.md>");
  const issues = aiFundamentalsBeginnerLanguageIssues(fs.readFileSync(target, "utf8"));
  if (issues.length) {
    console.error(`AI FUNDAMENTALS BEGINNER LANGUAGE FAIL\n- ${issues.join("\n- ")}`);
    process.exit(1);
  }
  console.log("AI FUNDAMENTALS BEGINNER LANGUAGE INTEGRITY PASS");
}
