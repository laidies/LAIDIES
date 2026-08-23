#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  assertLibraryAdmissionFreshness,
  compileAdmissionManifest,
  compileLibraryAdmission,
  renderCompiledAdmission
} from "./compile-library-admission.mjs";
import { createMemoryCorrectionService } from "./library-correction-service.mjs";
import { renderLibraryBookSource } from "./render-library-book.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-library-correction-"));
const renderedDir = path.join(root, "content/library-books/rendered");
fs.mkdirSync(renderedDir, { recursive: true });
const sourceRelativePath = "content/library-books/sources/how-to-check.source.json";
const sourcePath = path.join(root, sourceRelativePath);
fs.mkdirSync(path.dirname(sourcePath), { recursive: true });
const source = {
  schemaVersion: "library-book-source.v1",
  bookId: "how-to-check",
  contentVersion: "rulebook-v1",
  displayTitle: "How to Check AI's Work",
  readerJob: "Practise checking an AI answer before relying on it.",
  lede: "A compact correction-propagation fixture with a real authored reading route.",
  correctionRoute: "/api/library-corrections",
  sourceReferences: ["fixture-source"],
  freshness: { reviewedThrough: "2026-08-03", nextTrigger: "Fixture changes", owner: "Library test" },
  intro: { id: "start-here", title: "Start here", navLabel: "Start here", bodyHtml: "<p>Begin with the exact claim, its source, and the decision that depends on it.</p>" },
  chapters: [
    { id: "check-the-claim", title: "Check the claim", navLabel: "Check the claim", bodyHtml: "<p>Open the source, compare its scope and date, then record what the evidence actually supports.</p>" },
    { id: "record-the-result", title: "Record the result", navLabel: "Record the result", bodyHtml: "<p>Preserve the correction state so every Library consumer can fail closed on the same book version.</p>" }
  ]
};
const sourceBytes = Buffer.from(`${JSON.stringify(source, null, 2)}\n`);
fs.writeFileSync(sourcePath, sourceBytes);
const rendered = renderLibraryBookSource(source, sourceRelativePath, sourceBytes);
const renderedPath = path.join(renderedDir, "verification-rulebook.html");
fs.writeFileSync(renderedPath, rendered);
const artifactSha256 = crypto.createHash("sha256").update(rendered).digest("hex");
const evidenceRelativePath = "content/library-books/correction-propagation-learning-evidence.md";
const evidencePath = path.join(root, evidenceRelativePath);
fs.writeFileSync(evidencePath, "Observed synthetic participant completed lookup, explain-back, correction and unseen-transfer tasks.\n");
const receiptRelativePath = "content/library-books/correction-propagation-cold-reader.json";
const receiptPath = path.join(root, receiptRelativePath);
const task = (kind, locator) => ({ kind, verdict: "PASS", prompt: `Complete the ${kind} task.`, observedResponse: "The participant used the source and preserved the correction boundary.", expectedEvidence: "A source-bound answer and explicit correction state.", artifactLocator: locator });
fs.writeFileSync(receiptPath, `${JSON.stringify({
  schemaVersion: "library-book-cold-reader-review.v1",
  artifactSha256,
  reviewMode: "ARTIFACT_FIRST_COLD",
  makerReceiptsOpenedAfterColdRead: true,
  verdict: "ADMISSION_CANDIDATE",
  reverseBrief: { readerJob: source.readerJob, centralMentalModel: "Claims remain provisional until checked against evidence.", practicalPayoff: "A correction demotes stale bytes everywhere.", readingMode: "Short procedure" },
  readerTasks: [task("LOOKUP", "#check-the-claim"), task("EXPLAIN_BACK", "#check-the-claim"), task("UNSEEN_TRANSFER", "#record-the-result"), task("CORRECTION", "#record-the-result")],
  nonCompensableVetoes: Object.fromEntries(["openingOrientation", "promiseFidelity", "connectedProgression", "lookupAndRecovery", "unseenTransfer", "analogyIntegrity", "audienceExamples", "misconceptionResistance", "materialAccuracy", "continuousRenderedReadability", "laidiesVoice"].map(key => [key, "PASS"])),
  participantEvidencePaths: [evidenceRelativePath]
}, null, 2)}\n`);
fs.writeFileSync(path.join(root, "content/library-books/rejected-artifacts.json"), `${JSON.stringify({ schema_version: "library-rejected-artifacts.v1", authority: "DIRECT_ALI_REJECTION_DEFAULT_DENY", artifacts: [] }, null, 2)}\n`);
const binding = relative => ({ path: relative, sha256: crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex") });
const fixtureDirectory = path.resolve("operations/test-fixtures/library-corrections");

const manifest = {
  books: [{
    book_id: "how-to-check",
    status: "available",
    source_path: "/content/library-books/rendered/verification-rulebook.html",
    content_version: "rulebook-v1",
    admission_version: "fixture-admission-v1",
    source_references: ["fixture-source"],
    claim_references: ["VR-C001"],
    reviewed_at: "2026-08-03T12:00:00.000Z",
    review_owner: "Independent fixture owner",
    correction_state: "clear",
    artifact_sha256: artifactSha256,
    learning_admission: {
      schema_version: "library-book-learning-admission.v2",
      artifact_sha256: artifactSha256,
      learning_intake: binding(evidenceRelativePath),
      architecture_evidence: binding(evidenceRelativePath),
      instructional_verdict: binding(evidenceRelativePath),
      unfamiliar_reader_verdict: binding(evidenceRelativePath),
      canonical_source: binding(sourceRelativePath),
      cold_reader_outcome: binding(receiptRelativePath),
      criteria: Object.fromEntries(["governing_reader_question", "single_causal_mental_model", "truthful_scannable_architecture", "coherent_scope", "recurring_worked_case", "mapped_analogies_with_limits", "nonduplicative_concept_relationships", "synthesis_and_retention_map", "useful_next_experience", "maintenance_and_currentness_contract"].map(key => [key, "PASS"])),
      ali_rejection_state: "clear",
      derivative_use: "allowed"
    }
  }]
};
fs.writeFileSync(path.join(root, "content/library-books/admission-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

let tick = 0;
let id = 0;
const times = [
  "2026-08-03T12:01:00.000Z",
  "2026-08-03T12:02:00.000Z",
  "2026-08-03T12:03:00.000Z",
  "2026-08-03T12:04:00.000Z",
  "2026-08-03T12:05:00.000Z",
  "2026-08-03T12:06:00.000Z"
];
const service = createMemoryCorrectionService({
  clock: () => times[tick++],
  idFactory: (kind) => `${kind}-propagation-${++id}`
});
const submission = {
  book_id: "how-to-check",
  section_id: "check-the-claim",
  claim_id: "VR-C001",
  source_id: "SRC-NIST-AI-600-1",
  content_version: "rulebook-v1",
  category: "source-mismatch",
  finding: "The claim needs an editorial source-binding check.",
  evidence_url: "https://example.org/evidence"
};

let checks = 0;
function check(value, message) {
  assert.ok(value, message);
  checks++;
}
function rejects(fn, pattern, message) {
  assert.throws(fn, pattern, message);
  checks++;
}

check(Object.keys(compileAdmissionManifest(manifest, { root })).length === 1,
  "the exact admitted fixture compiles before a correction terminal state");

const corrected = service.submit(submission, { idempotency_key: "corrected-fixture" });
service.triage(corrected.correction_id, { owner: "Library editorial fixture" });
service.resolveCorrected(corrected.correction_id, {
  owner: "Library editorial fixture",
  summary: "Corrected bytes require independent readmission.",
  content_version: "rulebook-v2"
});
const correctedPropagation = service.propagation(corrected.correction_id);
check(Object.keys(compileAdmissionManifest(manifest, {
  root,
  correctionPropagations: [correctedPropagation]
})).length === 0, "corrected state suppresses the prior admission pending readmission");

const demoted = service.submit({
  ...submission,
  claim_id: "VR-C002",
  category: "stale-source"
}, { idempotency_key: "demoted-fixture" });
service.triage(demoted.correction_id, { owner: "Library editorial fixture" });
service.demote(demoted.correction_id, {
  owner: "Library editorial fixture",
  summary: "Demoted pending a current source review."
});
const demotedPropagation = service.propagation(demoted.correction_id);
check(Object.keys(compileAdmissionManifest(manifest, {
  root,
  correctionPropagations: [demotedPropagation]
})).length === 0, "demotion removes the book from compiled admission");

rejects(() => compileAdmissionManifest(manifest, {
  root,
  correctionPropagations: [{ ...demotedPropagation, state: "triage" }]
}), /only terminal correction state/, "nonterminal correction state cannot reach admission");
rejects(() => compileAdmissionManifest(manifest, {
  root,
  correctionPropagations: [{
    ...demotedPropagation,
    miss_jeeves: { ...demotedPropagation.miss_jeeves, book_id: "another-book" }
  }]
}), /consumers disagree/, "consumer book identity mismatch fails closed");
rejects(() => compileAdmissionManifest(manifest, {
  root,
  correctionPropagations: [{
    ...demotedPropagation,
    puffy_recheck: { ...demotedPropagation.puffy_recheck, preserve_unavailable_marker: false }
  }]
}), /consumer actions are incomplete/, "Puffy unavailable-marker removal fails closed");
rejects(() => compileAdmissionManifest(manifest, {
  root,
  correctionPropagations: [demotedPropagation, demotedPropagation]
}), /duplicate correction propagation version/, "duplicate terminal projection fails closed");

const librarySource = fs.readFileSync(path.resolve("library.html"), "utf8");
const puffySource = fs.readFileSync(path.resolve("content/site/puffy-bookmarks.js"), "utf8");
const openBookSource = librarySource.slice(
  librarySource.indexOf("function openBook(id,headingNeedle)"),
  librarySource.indexOf("function closeBook()")
);
const admissionLookupIndex = openBookSource.indexOf("const publication=admittedBook(id)");
const admissionGuardIndex = openBookSource.indexOf("if(!publication)");
check(admissionLookupIndex >= 0 && admissionGuardIndex > admissionLookupIndex,
  "reader rechecks compiled admission before opening");
check(/function safeIndexDestination\(entry\)[\s\S]{0,220}admittedBook\(bookId\)/.test(librarySource),
  "site index and Miss Jeeves suppress a corrected book through compiled admission");
check(/Reopen ['"]?\s*\+\s*p\.title\s*\+\s*['"] in the Library, where publication status is checked again/.test(puffySource),
  "Puffy reopen truth promises a current Library admission recheck");
check(/const libraryHash=location\.hash\.slice\(1\)\.split\('::'\)/.test(librarySource) &&
  /if\(libraryHash\[0\]&&ALL\[libraryHash\[0\]\]\)openBook\(libraryHash\[0\],libraryHeading\)/.test(librarySource),
  "a saved Library hash routes through the guarded reader rather than cached admission");

const missingBoundary = JSON.parse(fs.readFileSync(
  path.join(fixtureDirectory, "missing-boundary.json"), "utf8"
));
const compilerFixtureRoot = path.join(root, "compiler-integration");
fs.mkdirSync(path.join(compilerFixtureRoot, "content/library-books/rendered"), { recursive: true });
fs.mkdirSync(path.join(compilerFixtureRoot, "content/library-books/corrections"), { recursive: true });
fs.mkdirSync(path.join(compilerFixtureRoot, "content/library-books/sources"), { recursive: true });
fs.copyFileSync(renderedPath, path.join(
  compilerFixtureRoot, "content/library-books/rendered/verification-rulebook.html"
));
for (const relative of [sourceRelativePath, evidenceRelativePath, receiptRelativePath, "content/library-books/rejected-artifacts.json"]) {
  fs.copyFileSync(path.join(root, relative), path.join(compilerFixtureRoot, relative));
}
fs.writeFileSync(path.join(compilerFixtureRoot, "content/library-books/admission-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`);
const initiallyAdmitted = compileAdmissionManifest(manifest, { root: compilerFixtureRoot });
fs.writeFileSync(path.join(compilerFixtureRoot, "library.html"),
  `<!doctype html>\n<script>\n/* LIBRARY_ADMISSION_COMPILED_START */\n${renderCompiledAdmission(initiallyAdmitted)}\n/* LIBRARY_ADMISSION_COMPILED_END */\n</script>\n`);

rejects(() => compileLibraryAdmission({
  root: compilerFixtureRoot,
  correctionPropagationPath: missingBoundary.correctionPropagationPath
}), new RegExp(missingBoundary.expected_error),
"missing accepted-state boundary stops compilation");

const malformedBoundary = JSON.parse(fs.readFileSync(
  path.join(fixtureDirectory, "malformed-authority.json"), "utf8"
));
const boundaryPath = path.join(
  compilerFixtureRoot, "content/library-books/corrections/accepted-correction-propagations.json"
);
fs.writeFileSync(boundaryPath, `${JSON.stringify(malformedBoundary, null, 2)}\n`);
rejects(() => compileLibraryAdmission({ root: compilerFixtureRoot }),
  /accepted correction propagation boundary is invalid/,
  "malformed schema and authority stop compilation");
fs.writeFileSync(boundaryPath, `${JSON.stringify({
  schema_version: "library-correction-propagations.v1",
  authority: "LOCAL_ACCEPTED_TERMINAL_STATE_ONLY_NO_ADMISSION_AUTHORITY",
  propagations: [],
  unexpected: true
}, null, 2)}\n`);
rejects(() => compileLibraryAdmission({ root: compilerFixtureRoot }),
  /accepted correction propagation boundary is invalid/,
  "unexpected accepted-state top-level key stops compilation");

const buildFreshnessBoundary = fs.readFileSync(
  path.join(fixtureDirectory, "build-freshness-integration.json"), "utf8"
);
fs.writeFileSync(boundaryPath, buildFreshnessBoundary);
rejects(() => assertLibraryAdmissionFreshness({ root: compilerFixtureRoot }),
  /compiled admission is stale/,
  "public-build freshness gate rejects checked-in admission bytes after demotion");
const integrated = compileLibraryAdmission({ root: compilerFixtureRoot });
const fresh = assertLibraryAdmissionFreshness({ root: compilerFixtureRoot });
check(integrated.admitted.length === 0 && integrated.acceptedCorrections === 1 &&
  fresh.admitted.length === 0 && fresh.acceptedCorrections === 1,
  "mandatory compilation produces fresh zero-admission bytes for demotion");

const publicBuilder = fs.readFileSync(path.resolve("scripts/build-public-site.mjs"), "utf8");
const freshnessCall = publicBuilder.indexOf("assertLibraryAdmissionFreshness({ root })");
const traversalStart = publicBuilder.indexOf("function visitorHtmlEntries()");
check(freshnessCall >= 0 && traversalStart > freshnessCall,
  "curated public builder runs Library freshness before dependency traversal");

console.log(`LIBRARY CORRECTION PROPAGATION PASS checks=${checks} provider=none fixture_admitted_after_demotion=0`);
