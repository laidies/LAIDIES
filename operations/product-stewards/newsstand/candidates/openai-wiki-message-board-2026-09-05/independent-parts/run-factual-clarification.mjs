#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const candidate = "operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05";
const parts = `${candidate}/independent-parts`;
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const sourceNames = [
  "source-research.md",
  "source-grocery-first.md",
  "source-grocery-shared.md",
  "source-response.md",
  "source-context.md",
  "source-library.md"
];

const original = JSON.parse(read(`${parts}/factual-provider-response.json`));
const system = "You are the same independent factual editor clarifying an earlier judgment. Return valid JSON only. Reassess freely. You may retain HOLD, change to PASS, or change to REJECT. Do not favor any verdict. Identify exact candidate wording that is unsupported or misleading; source limitations that the article already states are not by themselves publication defects under the supplied ordinary-news policy. Do not claim browsing, human readers, browser tests, company approval, or access to unavailable originals.";
const prompt = `Reconcile your earlier factual HOLD for this ordinary-news article. Read the full exact article first, then the source evidence, policy, and your prior judgment. The policy permits accurately attributed preliminary reporting; it does not require company approval or full internal records merely to report a study. This instruction does not override evidence: retain HOLD if any exact candidate wording overstates or misrepresents what the supplied evidence supports.

For every concrete defect, quote an exact substring from the candidate, explain why the current attribution or qualification fails, and name the evidence or wording change needed. Do not cite only a limitation the article already discloses. If there is no unsupported or misleading candidate wording and the qualifications fit the policy, state that explicitly and reassess the overall verdict accordingly. Do not solicit or optimize for PASS.

EXACT FULL ARTICLE:
${read(`${candidate}/review-text.json`)}

SUPPLIED CLAIM MAP:
${read(`${candidate}/publication-claim-map.json`)}

FULL RELEVANT SOURCE RECEIPTS:
${sourceNames.map(name => `PATH ${candidate}/${name}\n${read(`${candidate}/${name}`)}`).join("\n\n")}

GOVERNING ORDINARY-NEWS POLICY:
${read("operations/product-stewards/newsstand/ordinary-news-editorial-policy.json")}

ORIGINAL RAW JUDGMENT RESPONSE:
${JSON.stringify(original.response, null, 2)}

Return JSON exactly shaped as {verdict:"PASS|HOLD|REJECT",reconciliation:string,concreteDefects:[{candidateQuote:string,whyUnsupportedOrMisleading:string,evidenceOrWordingNeeded:string}],qualifiedButPolicyCompliant:[{claimId:string,reason:string}],priorJudgmentAssessment:string,reviewedThrough:"2026-09-05"}. A HOLD or REJECT requires at least one concreteDefect with an exact candidate substring. If concreteDefects is empty, explain why the earlier source limitations do or do not remain a publication blocker and choose the independently justified verdict.`;

fs.writeFileSync(path.join(root, `${parts}/clarification-prompt.txt`), `${system}\n\n${prompt}\n`);
const response = await fetch("http://127.0.0.1:8791", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" },
    max_tokens: 2500,
    temperature: 0.05
  }),
  signal: AbortSignal.timeout(300000)
});
const body = await response.text();
fs.writeFileSync(path.join(root, `${parts}/clarification-provider-response.raw.json`), `${body}\n`);
if (!response.ok) throw new Error(`clarification provider failed HTTP ${response.status}`);
const envelope = JSON.parse(body);
const result = typeof envelope.response === "string" ? JSON.parse(envelope.response) : envelope.response;
process.stdout.write(JSON.stringify({
  httpStatus: response.status,
  providerId: envelope.id,
  providerModel: envelope.model,
  usage: envelope.usage,
  result
}, null, 2));
