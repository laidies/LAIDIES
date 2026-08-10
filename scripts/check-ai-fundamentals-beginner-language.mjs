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

export function aiFundamentalsBeginnerLanguageIssues(text, { requireOpeningSequence = true } = {}) {
  const issues = [];
  const normalized = text.replace(/\s+/g, " ");
  for (const phrase of rejectedDefinitions) {
    if (normalized.includes(phrase)) issues.push(`rejected jargon-first definition: ${phrase}`);
  }
  if (requireOpeningSequence) {
    const r7 = text.includes("introduction-and-chapter-1-r7") || text.includes("# Chapter 1: The different AI labels and how they fit together");
    const requiredBeginnerEvidence = r7 ? r7RequiredBeginnerEvidence : r6RequiredBeginnerEvidence;
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
