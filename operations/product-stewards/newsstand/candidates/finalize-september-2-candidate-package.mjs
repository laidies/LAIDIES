#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const candidateId = process.argv[2];
if (!candidateId || !/^(?:openclaw-shared-sessions|anthropic-agentic-incidents|openai-ads-run-rate)-2026-09-02$/.test(candidateId)) throw new Error("Pass one governed September 2 candidate ID");
const dir = `operations/product-stewards/newsstand/candidates/${candidateId}`;
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const bind = relative => ({ path: relative, sha256: hash(fs.readFileSync(path.join(root, relative))) });
fs.copyFileSync(path.join(root, "content/newsstand-stories.js"), path.join(root, dir, "publication-base.js"));
const candidate = JSON.parse(fs.readFileSync(path.join(root, dir, "candidate-package-seed.json"), "utf8"));
candidate.publicationBase = bind(`${dir}/publication-base.js`);
candidate.sourceText = bind(`${dir}/review-text.json`);
candidate.claimMap = bind(`${dir}/publication-claim-map.json`);
candidate.producerContract = bind(`${dir}/producer-contract.json`);
candidate.reviewEvidence = {
  producer: bind(`${dir}/producer-publication-review.json`),
  independent: bind(`${dir}/independent-publication-review.json`),
  independentRawReport: bind(`${dir}/independent-publication-raw-report.json`)
};
candidate.sources = candidate.sources.map(source => ({ ...source, evidence: bind(source.evidence.path) }));
fs.writeFileSync(path.join(root, dir, "candidate-package.json"), `${JSON.stringify(candidate, null, 2)}\n`);
console.log(`FINALIZED ${candidateId} base=${candidate.publicationBase.sha256}`);
