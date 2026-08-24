#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { inspectLibraryBookCandidate } from "./check-library-book-content-admission.mjs";
import { renderLibraryBookSource } from "./render-library-book.mjs";

const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const root = process.cwd();

const source = {
  schemaVersion: "library-book-source.v1",
  bookId: "fixture-book",
  contentVersion: "fixture.1",
  displayTitle: "A useful fixture",
  eyebrow: "THE LIBRAiRY",
  readerJob: "Understand one connected mechanism and use it to make a safer decision.",
  lede: "This short fixture teaches one connected idea, then lets the reader use it in a different case.",
  intro: { id: "introduction", title: "Introduction", navLabel: "Start here", bodyHtml: "<p>An AI product is the whole service you use. A model is one component inside it.</p>" },
  chapters: [
    { id: "parts", title: "Chapter 1 — The parts", navLabel: "The parts and their jobs", bodyHtml: "<p>The product assembles instructions and context, then calls a model. Tools and retrieval belong to the surrounding system.</p>" },
    { id: "decision", title: "Chapter 2 — The decision", navLabel: "Check before you act", bodyHtml: "<p>The output is a proposal. Evidence and human authority determine whether it should be used.</p>" }
  ],
  sourceReferences: ["https://example.com/fixture"],
  correctionRoute: "Report a problem to the Library owner.",
  freshness: { reviewedThrough: "2026-08-07", nextTrigger: "source or mechanism change", owner: "Library" }
};
const sourcePath = "content/library-books/fixture-book.source.json";
const sourceBytes = Buffer.from(JSON.stringify(source, null, 2) + "\n");
const rendered = renderLibraryBookSource(source, sourcePath, sourceBytes);
const artifactSha256 = sha256(rendered);

const reviewsFor = candidate => {
  const candidateSha = sha256(candidate);
  return {
    instructionalReview: `Verdict: **PASS for the exact artifact** \`${candidateSha}\`.`,
    usabilityReview: [
      "Verdict: **ADMISSION CANDIDATE**.",
      "Evidence type: **STRUCTURED_ARTIFACT_FIRST_REVIEW**.",
      "Human research: **NOT PERFORMED**. This is a simulated-reader and browser audit.",
      `Exact artifact: \`${candidateSha}\`.`
    ].join("\n\n")
  };
};

const inspect = (candidate = rendered, candidateSource = source, reviews = reviewsFor(candidate), rejectedArtifacts = []) => inspectLibraryBookCandidate({ source: candidateSource, sourceBytes, sourcePath, rendered: candidate, ...reviews, rejectedArtifacts });
assert.deepEqual(inspect(), [], "valid proportional fixture must pass");

const duplicateContents = rendered.replace('<p class="lede">', '<nav class="book-contents" aria-label="Contents"><h2>Contents</h2></nav>\n<p class="lede">');
assert.match(inspect(duplicateContents).join("\n"), /repeats a visible Contents page/, "duplicate in-body Contents must fail");

const linkWall = rendered.replace("</div>\n", `<p>${Array.from({length: 12}, (_, i) => `<a href="#parts">${i}</a>`).join(" ")}</p></div>\n`);
assert.match(inspect(linkWall).join("\n"), /link wall/, "dense index wall must fail");

const staleReviews = reviewsFor(rendered);
staleReviews.usabilityReview = staleReviews.usabilityReview.replace(artifactSha256, "0".repeat(64));
assert.match(inspect(rendered, source, staleReviews).join("\n"), /not bound to the exact artifact/, "stale usability evidence must fail");

const undisclosedSimulation = reviewsFor(rendered);
undisclosedSimulation.usabilityReview = undisclosedSimulation.usabilityReview.replace("Human research: **NOT PERFORMED**", "Human research: complete");
assert.match(inspect(rendered, source, undisclosedSimulation).join("\n"), /must state that human research was not performed/, "undisclosed simulated-reader evidence must fail");

const falseHumanClaim = reviewsFor(rendered);
falseHumanClaim.usabilityReview += "\nOBSERVED_HUMAN";
assert.match(inspect(rendered, source, falseHumanClaim).join("\n"), /falsely claims observed-human evidence/, "false human-evidence language must fail");

const disconnectedSource = { ...source, chapters: [{ ...source.chapters[0], bodyHtml: "short" }, source.chapters[1]] };
assert.match(inspect(rendered, disconnectedSource).join("\n"), /bodyHtml is incomplete/, "outline-only source must fail");

const rejectedRegistry = JSON.parse(fs.readFileSync(path.join(root, "content/library-books/rejected-artifacts.json"), "utf8")).artifacts;
const rejectedHtml = fs.readFileSync(path.join(root, "operations/evals/library-rejected-artifacts/concepts-101-3bf3d6bddd659af0.html"), "utf8");
const rejectedErrors = inspectLibraryBookCandidate({ source: JSON.parse(fs.readFileSync(path.join(root, "content/library-books/concepts-101.source.json"), "utf8")), sourceBytes: fs.readFileSync(path.join(root, "content/library-books/concepts-101.source.json")), sourcePath: "content/library-books/concepts-101.source.json", rendered: rejectedHtml, rejectedArtifacts: rejectedRegistry });
assert.match(rejectedErrors.join("\n"), /exact artifact is directly rejected/, "Ali-rejected exact artifact must fail unaided");
assert.match(rejectedErrors.join("\n"), /repeated mini-template|link wall/, "known failure family must fail without relying only on its hash");

console.log("LIBRARY BOOK CONTENT ADMISSION CALIBRATION PASS · valid=1 rejected=7 exact_ali_rejection=1 stale_usability=1 undisclosed_simulation=1 false_human_claim=1");
