#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const candidate = "operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05";
const parts = `${candidate}/independent-parts`;
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const article = read(`${candidate}/review-text.json`);
const producer = JSON.parse(read(`${candidate}/producer-publication-review.json`));
const registry = JSON.parse(read("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json"));
const positive = registry.positiveExemplars.find(item => item.id === "CQX-GOOD-NEWS-001");
const system = "You are an independent Meta-Llama factual and comprehension editor reviewing a LAiDIES ordinary-news article made by /root. Return valid JSON only. Begin with the exact article. Judge it independently; do not copy producer judgments, optimize for PASS, or claim human readers, browsing, browser checks, publication, or access beyond the supplied evidence. A substantive defect requires HOLD or REJECT.";

async function run(name, task, evidence) {
  const prompt = `${task}\n\nEXACT FULL ARTICLE FIRST:\n${article}\n\n${evidence}`;
  fs.writeFileSync(path.join(root, `${parts}/${name}-prompt.txt`), `${system}\n\n${prompt}\n`);
  const response = await fetch("http://127.0.0.1:8791", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "system", content: system }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 2500,
      temperature: 0.05
    }),
    signal: AbortSignal.timeout(300000)
  });
  const body = await response.text();
  fs.writeFileSync(path.join(root, `${parts}/${name}-provider-response.raw.json`), `${body}\n`);
  if (!response.ok) throw new Error(`${name} failed HTTP ${response.status}`);
  const envelope = JSON.parse(body);
  const result = typeof envelope.response === "string" ? JSON.parse(envelope.response) : envelope.response;
  console.log(JSON.stringify({ name, id: envelope.id, model: envelope.model, usage: envelope.usage, verdict: result?.verdict }));
  if (result?.verdict !== "PASS") throw new Error(`${name} substantive verdict ${result?.verdict || "MISSING"}`);
  return result;
}

await run(
  "editorial-outcomes",
  `Judge these nine outcomes and four policy checks against the article: plainClarity, readerValue, laidiesVoice, engagingEnjoyable, factualIntegrity, freshnessReviewability, surfaceFit, datedChange, consequenceAndUncertainty; then incidentExplained, termsExplainedInContext, readerConsequenceSpecific, noInternalNotesOrInventedAdvice. Return {verdict:"PASS|HOLD|REJECT",outcomes:{each named outcome:{verdict:"PASS|HOLD|FAIL",observation:string,artifactEvidence:[{excerpt:string,locator:string}]}},checks:{each named check:{verdict:"PASS|HOLD|FAIL",observation:string,artifactEvidence:[{excerpt:string,locator:string}]}},findings:[string]}. Every excerpt must be an exact article substring of at least 15 characters. PASS only if every inner verdict is PASS.`,
  `GOVERNING ORDINARY-NEWS POLICY:\n${read("operations/product-stewards/newsstand/ordinary-news-editorial-policy.json")}\n\nSTORY-TYPE COVERAGE TO VERIFY AGAINST PROSE:\n${read(`${candidate}/story-type-coverage.json`)}\n\nINDEPENDENT FACTUAL CLARIFICATION:\n${read(`${parts}/clarification-provider-response.raw.json`)}`
);

await run(
  "learning-outcomes",
  `Judge these six outcomes: dailyLifeConnection, communicationBenchmark, explainBack, unseenTransfer, usefulAction, analogyIntegrity. Return {verdict:"PASS|HOLD|REJECT",outcomes:{each named outcome:{verdict:"PASS|HOLD|FAIL",observation:string,artifactEvidence:[{excerpt:string,locator:string}],aiEditorialAnalysis?:{evidenceType:"AI_EDITORIAL_ANALYSIS",prompt:string,response:string,expectedEvidence:string,assessment:string}}},findings:[string]}. Every excerpt must be an exact article substring of at least 15 characters. Only explainBack and unseenTransfer receive aiEditorialAnalysis. Their prompts must differ; unseenTransfer must use a genuinely different situation. Do not claim these are human observations. PASS only if every inner verdict is PASS.`,
  "The ordinary-news policy authorizes AI editorial analysis without observed human evidence. Assess whether a beginner could explain the mechanism back and transfer it to the new case you supply."
);

await run(
  "failure-families-reverse-brief",
  `Independently reconstruct the reader job, then check every named failure family. Return {verdict:"PASS|HOLD|REJECT",reverseBrief:{humanQuestion:string,promisedPayoff:string,centralMentalModel:string,dailyLifeConnection:string,surfaceJob:string,desiredReaderFeeling:string},failureFamilies:{each supplied name:{present:boolean,observation:string,artifactLocator:string}},findings:[string]}. artifactLocator must identify an actual article section or exact short phrase. PASS only when every family is present:false. Do not treat the absence of a defect as proof of publication or human comprehension.`,
  `FAILURE FAMILY NAMES:\n${JSON.stringify(Object.keys(producer.failureFamilies))}`
);

await run(
  "calibration",
  `Calibrate your judgment before final admission. Reject each registered negative exemplar for every failure family registered to it, using an exact excerpt of at least 15 characters from that exemplar. Recognize the registered NEWS positive only for its structural strengths, inheriting no facts or template. Then state whether the candidate retains those strengths without copying. Return {verdict:"PASS|HOLD|REJECT",negatives:[{exemplarId:string,verdict:"REJECT",identifiedFailureFamilies:[string],evidence:[{excerpt:string,locator:string}]}],positive:{exemplarId:"CQX-GOOD-NEWS-001",verdict:"PASS",strengthsRetained:[string],evidence:[{excerpt:string,locator:string}]},candidateAssessment:string}. Calibration verdict PASS means both known-bad examples were fully rejected and the positive was correctly recognized; it does not itself admit the candidate.`,
  `REGISTRY:\n${JSON.stringify(registry, null, 2)}\n\nNEGATIVE EXEMPLARS:\n${registry.negativeExemplars.map(item => `ENTRY ${item.id}\n${read(item.path)}`).join("\n\n")}\n\nREGISTERED NEWS POSITIVE:\n${read(positive.path)}`
);
