#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const candidate = "operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05";
const out = `${candidate}/independent-gemma-parts`;
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const article = read(`${candidate}/review-text.json`);
const producer = JSON.parse(read(`${candidate}/producer-publication-review.json`));
const registry = JSON.parse(read("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json"));
const positive = registry.positiveExemplars.find(item => item.id === "CQX-GOOD-NEWS-001");
const sources = [
  "source-research.md",
  "source-grocery-first.md",
  "source-grocery-shared.md",
  "source-response.md",
  "source-context.md",
  "source-library.md"
];
const system = "You are an independent Google Gemma factual and comprehension editor. Review the exact LAiDIES article made by /root. Return only a compact valid JSON final answer, with no markdown or reasoning. Judge honestly. Never optimize for PASS, copy maker judgments, claim browsing or human readers, or invent evidence. A HOLD or REJECT is valid and must be preserved.";

function exactQuote(body, quote, label) {
  if (typeof quote !== "string" || quote.trim().length < 15 || !body.includes(quote)) throw new Error(`${label} is not an exact supplied-text quote`);
}

async function call(name, task, evidence, maxCompletionTokens) {
  const user = `${task}\n\nEXACT FULL ARTICLE FIRST:\n${article}\n\n${evidence}`;
  const body = {
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
    response_format: { type: "json_object" },
    max_completion_tokens: maxCompletionTokens,
    temperature: 0.05,
    chat_template_kwargs: { enable_thinking: false }
  };
  fs.writeFileSync(path.join(root, out, `${name}-request.json`), `${JSON.stringify(body, null, 2)}\n`);
  const response = await fetch("http://127.0.0.1:8791/gemma", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(300000)
  });
  const raw = await response.text();
  fs.writeFileSync(path.join(root, out, `${name}-response.raw.json`), `${raw}\n`);
  if (!response.ok) throw new Error(`${name} HTTP ${response.status}`);
  const envelope = JSON.parse(raw);
  if (envelope.choices?.[0]?.finish_reason !== "stop") throw new Error(`${name} incomplete finish_reason=${envelope.choices?.[0]?.finish_reason}`);
  const message = envelope.choices?.[0]?.message;
  if (typeof message?.reasoning === "string" && message.reasoning.trim()) throw new Error(`${name} returned hidden reasoning instead of only a final judgment`);
  const rawResult = envelope.response ?? message?.content;
  if (!rawResult) throw new Error(`${name} returned no final content`);
  const result = typeof rawResult === "string" ? JSON.parse(rawResult) : rawResult;
  fs.writeFileSync(path.join(root, out, `${name}-judgment.json`), `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify({ name, id: envelope.id, model: envelope.model, usage: envelope.usage, verdict: result.verdict }));
  return result;
}

const factual = fs.existsSync(path.join(root, out, "01-factual-policy-judgment.json"))
  ? JSON.parse(read(`${out}/01-factual-policy-judgment.json`))
  : await call(
  "01-factual-policy",
  `Reassess all supplied material claims and the four ordinary-news checks. Source notes are maker paraphrases unless explicitly labelled exact excerpts; the original OpenAI X response is unavailable and Reuters attribution must remain attributed. Accurately attributed preliminary reporting does not require company confirmation of every study detail. Return {verdict:"PASS|HOLD|REJECT",claims:[{claimId:string,status:"VERIFIED|QUALIFIED|HOLD",assessment:string,candidateQuote:string}],checks:{incidentExplained:{verdict:"PASS|HOLD|FAIL",observation:string,candidateQuote:string},termsExplainedInContext:{...},readerConsequenceSpecific:{...},noInternalNotesOrInventedAdvice:{...}},concreteDefects:[{candidateQuote:string,definitionViolated:string,evidenceNeededOrRepair:string}],summary:string}. Include every supplied claimId exactly once. Every candidateQuote must be an exact article substring of at least 15 characters. A non-PASS verdict requires at least one concreteDefect; do not use limitations already disclosed in the article as defects by themselves.`,
  `CLAIM MAP:\n${read(`${candidate}/publication-claim-map.json`)}\n\nSOURCE RECEIPTS:\n${sources.map(name => `PATH ${candidate}/${name}\n${read(`${candidate}/${name}`)}`).join("\n\n")}\n\nPOLICY:\n${read("operations/product-stewards/newsstand/ordinary-news-editorial-policy.json")}\n\nSTORY-TYPE COVERAGE:\n${read(`${candidate}/story-type-coverage.json`)}`,
  4200
);
const factualQuoteErrors = [];
for (const [index, claim] of factual.claims?.entries?.() || []) {
  try { exactQuote(article, claim.candidateQuote, `factual.claims[${index}]`); }
  catch (error) { factualQuoteErrors.push(error.message); }
}
for (const [name, check] of Object.entries(factual.checks || {})) {
  try { exactQuote(article, check.candidateQuote, `factual.checks.${name}`); }
  catch (error) { factualQuoteErrors.push(error.message); }
}
for (const [index, defect] of (factual.concreteDefects || []).entries()) exactQuote(article, defect.candidateQuote, `factual.concreteDefects[${index}]`);
fs.writeFileSync(path.join(root, out, "01-factual-policy-quote-integrity.json"), `${JSON.stringify({ errors: factualQuoteErrors }, null, 2)}\n`);
if (factual.verdict !== "PASS") throw new Error(`01-factual-policy substantive verdict ${factual.verdict}`);

const outcomes = fs.existsSync(path.join(root, out, "02-outcomes-judgment.json"))
  ? JSON.parse(read(`${out}/02-outcomes-judgment.json`))
  : await call(
  "02-outcomes",
  `Judge every required NEWS outcome named below. Return {verdict:"PASS|HOLD|REJECT",outcomes:{each exact supplied key:{verdict:"PASS|HOLD|FAIL",observation:string,candidateQuote:string,aiEditorialAnalysis?:{evidenceType:"AI_EDITORIAL_ANALYSIS",prompt:string,response:string,expectedEvidence:string,assessment:string}}},concreteDefects:[{candidateQuote:string,definitionViolated:string,repairNeeded:string}],summary:string}. Every candidateQuote must be an exact article substring of at least 15 characters. Only explainBack and unseenTransfer receive aiEditorialAnalysis. Use different prompts and a genuinely different case for unseenTransfer. These are AI editorial probes, never human observations. PASS only if every outcome passes and concreteDefects is empty.`,
  `REQUIRED OUTCOME KEYS:\n${JSON.stringify(Object.keys(producer.outcomes))}\n\nPOLICY BOUNDARY: ${read("operations/product-stewards/newsstand/ordinary-news-editorial-policy.json")}`,
  4200
);
const outcomeQuoteErrors = [];
for (const [name, outcome] of Object.entries(outcomes.outcomes || {})) {
  try { exactQuote(article, outcome.candidateQuote, `outcomes.${name}`); }
  catch (error) { outcomeQuoteErrors.push(error.message); }
}
for (const [index, defect] of (outcomes.concreteDefects || []).entries()) exactQuote(article, defect.candidateQuote, `outcomes.concreteDefects[${index}]`);
fs.writeFileSync(path.join(root, out, "02-outcomes-quote-integrity.json"), `${JSON.stringify({ errors: outcomeQuoteErrors }, null, 2)}\n`);
if (outcomes.verdict !== "PASS") throw new Error(`02-outcomes substantive verdict ${outcomes.verdict}`);

const criticalDefinitions = {
  decorativeAnalogy: "An analogy adds flavour but does not accurately map a specific mechanism or is not reconnected to it.",
  familiarExampleWithoutTechnicalReturn: "A familiar example is introduced but the prose never returns from it to the actual AI mechanism.",
  jargonBeforeMeaning: "A necessary technical term appears before the article gives its plain contextual meaning.",
  communicationPastiche: "The prose imitates or name-drops a communicator instead of using clear causal communication mechanics.",
  technicalExplainerVoice: "The prose centers dry specialist taxonomy over the reader's real question and practical consequence. Necessary precise terms explained in context are not this defect."
};
const calibration = await call(
  "03-failures-calibration",
  `Reconstruct the reader job, inspect every supplied failure family, and calibrate against both known-bad exemplars plus the NEWS positive. Return {verdict:"PASS|HOLD|REJECT",reverseBrief:{humanQuestion:string,promisedPayoff:string,centralMentalModel:string,dailyLifeConnection:string,surfaceJob:string,desiredReaderFeeling:string},failureFamilies:{each exact supplied key:{present:boolean,assessment:string,candidateQuote:string}},calibration:{negatives:[{exemplarId:string,verdict:"REJECT",identifiedFailureFamilies:[string],evidenceQuote:string}],positive:{exemplarId:"CQX-GOOD-NEWS-001",verdict:"PASS",strengthsRetained:[string],evidenceQuote:string}},concreteDefects:[{candidateQuote:string,definitionViolated:string,repairNeeded:string}],summary:string}. Every candidateQuote must be an exact article substring of at least 15 characters, including for absent families where the quote shows why the defect is avoided. A present failure must also appear in concreteDefects with exact words and the violated definition. Each calibration quote must be an exact substring of its exemplar of at least 15 characters. Reject every negative for all failure families registered to it. Treat the NEWS positive only as structural calibration and inherit no facts. PASS only if every candidate family is absent, both negatives are fully rejected, the positive is recognized, and concreteDefects is empty.`,
  `FAILURE FAMILY KEYS:\n${JSON.stringify(Object.keys(producer.failureFamilies))}\n\nCRITICAL DEFINITIONS:\n${JSON.stringify(criticalDefinitions, null, 2)}\n\nREGISTRY:\n${JSON.stringify(registry, null, 2)}\n\nNEGATIVE EXEMPLARS:\n${registry.negativeExemplars.map(item => `ENTRY ${item.id}\n${read(item.path)}`).join("\n\n")}\n\nNEWS POSITIVE:\n${read(positive.path)}`,
  5000
);
for (const [name, finding] of Object.entries(calibration.failureFamilies || {})) exactQuote(article, finding.candidateQuote, `failureFamilies.${name}`);
for (const [index, defect] of (calibration.concreteDefects || []).entries()) exactQuote(article, defect.candidateQuote, `calibration.concreteDefects[${index}]`);
for (const [index, item] of (calibration.calibration?.negatives || []).entries()) {
  const exemplar = registry.negativeExemplars.find(entry => entry.id === item.exemplarId);
  exactQuote(read(exemplar.path), item.evidenceQuote, `calibration.negatives[${index}]`);
}
exactQuote(read(positive.path), calibration.calibration?.positive?.evidenceQuote, "calibration.positive");
if (calibration.verdict !== "PASS") throw new Error(`03-failures-calibration substantive verdict ${calibration.verdict}`);
