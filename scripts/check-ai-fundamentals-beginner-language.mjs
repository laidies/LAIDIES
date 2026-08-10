#!/usr/bin/env node

import fs from "node:fs";

const rejectedDefinitions = [
  "building machine-based systems that infer outputs",
  "A **model** is the component that performs an inference."
];

const requiredBeginnerEvidence = [
  "Before we define anything, look at what is already happening around you.",
  "Input means what goes in. Output means what comes back.",
  "It is not one machine, one app or one particular chatbot.",
  "software, model, data, chips, servers, tools and people"
];

export function aiFundamentalsBeginnerLanguageIssues(text, { requireOpeningSequence = true } = {}) {
  const issues = [];
  const normalized = text.replace(/\s+/g, " ");
  for (const phrase of rejectedDefinitions) {
    if (normalized.includes(phrase)) issues.push(`rejected jargon-first definition: ${phrase}`);
  }
  if (requireOpeningSequence) {
    for (const phrase of requiredBeginnerEvidence) {
      if (!text.includes(phrase)) issues.push(`missing beginner-sequence evidence: ${phrase}`);
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
