#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sha256, stable } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, "../../../../../");
const relative = name => path.relative(root, path.join(directory, name));
const bind = name => ({ path: relative(name), sha256: sha256(fs.readFileSync(path.join(directory, name))) });

const story = JSON.parse(fs.readFileSync(path.join(directory, "story.json"), "utf8"));
const baseName = "publication-base.js";
fs.copyFileSync(path.join(root, "content/newsstand-stories.js"), path.join(directory, baseName));

const sourceBindings = {
  "openai-ads-announcement-2026-08-31": bind("source-announcement.md"),
  "openai-ads-consumer-faq": bind("source-consumer-faq.md"),
  "openai-ads-availability": bind("source-availability.md")
};

const candidate = {
  schemaVersion: "newsstand-ordinary-story-candidate-v1",
  candidateStatus: "READY_FOR_ISSUE_ADMISSION",
  candidateId: story.id,
  editionDate: "2026-08-31",
  story,
  storySha256: sha256(stable(story)),
  publicationBase: bind(baseName),
  sourceText: bind("review-text.json"),
  claimMap: bind("claim-map.json"),
  producerContract: bind("producer-contract.json"),
  sources: story.sources.map(source => ({ id: source.id, url: source.url, evidence: sourceBindings[source.id] })),
  reviewEvidence: {
    producer: bind("producer-review.json"),
    independent: bind("independent-review-final-v2.json"),
    independentRawReport: bind("independent-raw-report-final-v2.json")
  }
};

fs.writeFileSync(path.join(directory, "candidate-package.json"), `${JSON.stringify(candidate, null, 2)}\n`);
console.log(`CANDIDATE PACKAGE BUILT story=${story.id} story_sha=${candidate.storySha256}`);
