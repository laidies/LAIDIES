#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { inspectLibraryBookCandidate } from "./check-library-book-content-admission.mjs";
import { renderLibraryBookSource } from "./render-library-book.mjs";

const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const root = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-library-gate-"));
const evidencePath = "evidence/reader-observation.txt";
fs.mkdirSync(path.join(tempRoot, "evidence"), { recursive: true });
fs.writeFileSync(path.join(tempRoot, evidencePath), "Observed reader answers bound to this fixture.\n");

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
const receipt = {
  schemaVersion: "library-book-cold-reader-review.v1",
  artifactSha256: sha256(rendered),
  reviewMode: "ARTIFACT_FIRST_COLD",
  reviewer: "independent fixture reader",
  reviewedAt: "2026-08-07T06:00:00-07:00",
  makerReceiptsOpenedAfterColdRead: true,
  reverseBrief: { readerJob: "understand the system", centralMentalModel: "product surrounds model", practicalPayoff: "check outputs", readingMode: "linear then lookup" },
  readerTasks: [
    { kind: "ORIENTATION", prompt: "What is this for?", observedResponse: "Understand product and model.", expectedEvidence: "Names the distinction.", verdict: "PASS", artifactLocator: "#introduction" },
    { kind: "LOOKUP", prompt: "Find the parts.", observedResponse: "Used Contents and returned.", expectedEvidence: "Uses route unaided.", verdict: "PASS", artifactLocator: "nav.book-contents" },
    { kind: "EXPLAIN_BACK", prompt: "Explain the system.", observedResponse: "Product supplies context to model; output is checked.", expectedEvidence: "Correct causal jobs.", verdict: "PASS", artifactLocator: "#parts" },
    { kind: "SYSTEM_RECONSTRUCTION", prompt: "Draw the system from a blank page.", observedResponse: "Drew product to context to model to output to human check with labelled arrows.", expectedEvidence: "Important parts and directional relationships are preserved without source wording.", verdict: "PASS", artifactLocator: "#parts" },
    { kind: "UNSEEN_TRANSFER", prompt: "Diagnose an obsolete-policy answer.", observedResponse: "Check what policy reached context and verify the output.", expectedEvidence: "Finds evidence layer and bounded repair.", verdict: "PASS", artifactLocator: "#decision" }
  ],
  nonCompensableVetoes: Object.fromEntries(["openingOrientation","promiseFidelity","connectedProgression","systemReconstruction","lookupAndRecovery","unseenTransfer","analogyIntegrity","audienceExamples","misconceptionResistance","materialAccuracy","continuousRenderedReadability","laidiesVoice"].map(key => [key, "PASS"])),
  participantEvidencePaths: [evidencePath],
  verdict: "ADMISSION_CANDIDATE",
  limitations: []
};

const inspect = (candidate = rendered, candidateSource = source, candidateReceipt = receipt, rejectedArtifacts = []) => inspectLibraryBookCandidate({ source: candidateSource, sourceBytes, sourcePath, rendered: candidate, receipt: candidateReceipt, rejectedArtifacts, root: tempRoot });
assert.deepEqual(inspect(), [], "valid proportional fixture must pass");

const noContents = rendered.replace(/<nav class="book-contents"[\s\S]*?<\/nav>/, "");
assert.match(inspect(noContents, source, { ...receipt, artifactSha256: sha256(noContents) }).join("\n"), /contents route/, "missing contents must fail");

const linkWall = rendered.replace("</div>\n", `<p>${Array.from({length: 12}, (_, i) => `<a href="#parts">${i}</a>`).join(" ")}</p></div>\n`);
assert.match(inspect(linkWall, source, { ...receipt, artifactSha256: sha256(linkWall) }).join("\n"), /link wall/, "dense index wall must fail");

const noTransfer = { ...receipt, readerTasks: receipt.readerTasks.filter(task => task.kind !== "UNSEEN_TRANSFER") };
assert.match(inspect(rendered, source, noTransfer).join("\n"), /unseen transfer/, "missing transfer outcome must fail");

const noReconstruction = { ...receipt, readerTasks: receipt.readerTasks.filter(task => task.kind !== "SYSTEM_RECONSTRUCTION") };
assert.match(inspect(rendered, source, noReconstruction).join("\n"), /system reconstruction/, "missing system reconstruction must fail");

const disconnectedSource = { ...source, chapters: [{ ...source.chapters[0], bodyHtml: "short" }, source.chapters[1]] };
assert.match(inspect(rendered, disconnectedSource).join("\n"), /bodyHtml is incomplete/, "outline-only source must fail");

const rejectedRegistry = JSON.parse(fs.readFileSync(path.join(root, "content/library-books/rejected-artifacts.json"), "utf8")).artifacts;
const rejectedHtml = fs.readFileSync(path.join(root, "content/library-books/rendered/concepts-101.html"), "utf8");
const rejectedErrors = inspectLibraryBookCandidate({ source: JSON.parse(fs.readFileSync(path.join(root, "content/library-books/concepts-101.source.json"), "utf8")), sourceBytes: fs.readFileSync(path.join(root, "content/library-books/concepts-101.source.json")), sourcePath: "content/library-books/concepts-101.source.json", rendered: rejectedHtml, receipt: {}, rejectedArtifacts: rejectedRegistry, root });
assert.match(rejectedErrors.join("\n"), /exact artifact is directly rejected/, "Ali-rejected exact artifact must fail unaided");
assert.match(rejectedErrors.join("\n"), /repeated mini-template|link wall/, "known failure family must fail without relying only on its hash");

fs.rmSync(tempRoot, { recursive: true, force: true });
console.log("LIBRARY BOOK CONTENT ADMISSION CALIBRATION PASS · valid=1 rejected=6 exact_ali_rejection=1 system_reconstruction=1");
