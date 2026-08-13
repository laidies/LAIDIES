#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { inspectNewsstandProducerProof, STANDARD_PATH } from "./check-newsstand-producer-proof.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-proof-"));
const write = (relative, body) => {
  const absolute = path.join(root, relative);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, body);
  return { path: relative, sha256: crypto.createHash("sha256").update(body).digest("hex") };
};

try {
  const standard = write(STANDARD_PATH, "binding production standard\n");
  const sourceMap = write("operations/product-stewards/newsstand/candidates/source-map.md", "source map\n");
  const proof = {
    schemaVersion: "laidies-newsstand-producer-proof.v1",
    candidateId: "NEWS-TEST-1",
    publication: "THE_DAILY",
    storyMode: "REPORT_OR_ANNOUNCEMENT",
    status: "READY_FOR_FULL_DRAFT",
    productionStandard: standard,
    sourceMap,
    readerQuestion: "What changed and should I do anything?",
    readerPayoff: "The reader can explain the change and make one useful choice.",
    headline: "A new sharing risk changes which AI files teams should send",
    opening: "A study found private details in technical files that some teams publish when they share AI work. It did not show that ordinary private chats suddenly became public. The useful lesson is simple: send the checked result, not the entire behind-the-scenes work file.",
    newcomerBackground: "Some teams save and publish detailed work files so another person can inspect or replay an AI task.",
    causalOutline: [
      "The tool keeps more technical material than appears in the visible answer.",
      "A team publishes the complete work file instead of a newly checked result.",
      "Private material inside the larger file becomes available to whoever can read it."
    ],
    evidenceBoundary: { establishes: "The study found real private items in the sampled public files.", doesNotEstablish: "It does not establish that ordinary private chats were published." },
    applications: {
      work: { disposition: "APPLY", example: "Share an approved memo rather than the coding assistant's full work file." },
      nonWork: { disposition: "APPLY", example: "Share the finished itinerary rather than the travel assistant's connected-account export." }
    },
    usefulLanding: "Choose and check the result you intend to share.",
    routingReason: "This is a dated practical change, not a multi-story synthesis or durable reference.",
    intendedWords: 550,
    lengthEscalationReason: "",
    producerPreflight: { negativeExamplesRead: true, repeatedDefects: [], actualFormatUsed: true }
  };
  assert.deepEqual(inspectNewsstandProducerProof(proof, { root }).errors, []);
  const clickbait = structuredClone(proof);
  clickbait.headline = "The shocking secret you cannot see inside your AI";
  assert.match(inspectNewsstandProducerProof(clickbait, { root }).errors.join("\n"), /clickbait/);
  const jargonOpening = structuredClone(proof);
  jargonOpening.opening = "An encrypted reasoning block crossed an API boundary during the test.";
  assert.match(inspectNewsstandProducerProof(jargonOpening, { root }).errors.join("\n"), /technical vocabulary/);
  const oversized = structuredClone(proof);
  oversized.intendedWords = 1600;
  assert.match(inspectNewsstandProducerProof(oversized, { root }).errors.join("\n"), /above 700 words/);
  const claimedWithoutPreflight = structuredClone(proof);
  claimedWithoutPreflight.producerPreflight.negativeExamplesRead = false;
  assert.match(inspectNewsstandProducerProof(claimedWithoutPreflight, { root }).errors.join("\n"), /negative examples/);
  console.log("NEWSSTAND PRODUCER PROOF CALIBRATION PASS: valid bounded Daily proof accepted; clickbait, jargon-first opening, oversized Daily and skipped negative examples rejected");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
