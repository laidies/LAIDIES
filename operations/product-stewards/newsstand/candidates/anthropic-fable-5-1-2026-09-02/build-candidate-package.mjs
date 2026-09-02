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
  "anthropic-fable-mythos-5-1-announcement": bind("source-announcement.md"),
  "anthropic-release-notes-2026-09-01": bind("source-release-notes.md")
};

const candidate = {
  schemaVersion: "newsstand-ordinary-story-candidate-v1",
  candidateStatus: "READY_FOR_ISSUE_ADMISSION",
  candidateId: story.id,
  editionDate: "2026-09-02",
  story,
  storySha256: sha256(stable(story)),
  publicationBase: bind(baseName),
  sourceText: bind("review-text.json"),
  claimMap: bind("claim-map.json"),
  producerContract: bind("producer-contract.json"),
  sources: story.sources.map(source => ({ id: source.id, url: source.url, evidence: sourceBindings[source.id] })),
  reviewEvidence: {
    producer: bind("producer-review.json"),
    independent: bind("independent-review-final.json"),
    independentRawReport: bind("independent-raw-report-final.json")
  }
};

fs.writeFileSync(path.join(directory, "candidate-package.json"), `${JSON.stringify(candidate, null, 2)}\n`);
console.log(`CANDIDATE PACKAGE BUILT story=${story.id} story_sha=${candidate.storySha256}`);
