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
fs.mkdirSync(path.join(tempRoot, "evidence"), { recursive: true });

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

const tasksFor = index => [
  { kind: "ORIENTATION", prompt: "What is this for?", observedResponse: `Reader ${index} said the book explains the product and model.`, expectedEvidence: "Names the distinction.", verdict: "PASS", artifactLocator: "#introduction" },
  { kind: "LOOKUP", prompt: "Find the parts.", observedResponse: `Reader ${index} used Contents and returned to the chapter.`, expectedEvidence: "Uses route unaided.", verdict: "PASS", artifactLocator: "nav.book-contents" },
  { kind: "EXPLAIN_BACK", prompt: "Explain the system.", observedResponse: `Reader ${index} explained that the product supplies context to the model and a person checks the output.`, expectedEvidence: "Correct causal jobs.", verdict: "PASS", artifactLocator: "#parts" },
  { kind: "UNSEEN_TRANSFER", prompt: "Diagnose an obsolete-policy answer.", observedResponse: `Reader ${index} said to check which policy reached the context and verify the output.`, expectedEvidence: "Finds evidence layer and bounded repair.", verdict: "PASS", artifactLocator: "#decision" }
];

const observationFor = index => {
  const participantId = `reader-${index}`;
  const readerTasks = tasksFor(index);
  const evidencePath = `evidence/${participantId}.txt`;
  const evidence = [
    `artifactSha256: ${artifactSha256}`,
    `participantId: ${participantId}`,
    ...readerTasks.map(task => `${task.kind}: ${task.observedResponse}`)
  ].join("\n") + "\n";
  fs.writeFileSync(path.join(tempRoot, evidencePath), evidence);
  return {
    participantId,
    evidenceType: "OBSERVED_HUMAN",
    familiarity: "UNFAMILIAR_WITH_ARTIFACT",
    observedAt: `2026-08-07T06:0${index}:00-07:00`,
    readerTasks,
    observationBinding: { path: evidencePath, sha256: sha256(evidence) }
  };
};

const receipt = {
  schemaVersion: "library-book-cold-reader-review.v2",
  artifactSha256,
  reviewMode: "ARTIFACT_FIRST_COLD",
  reviewer: "independent fixture reader",
  administrator: { principalId: "reader-study-admin", makerPrincipalId: "fixture-book-maker", independentFromMaker: true },
  reviewedAt: "2026-08-07T06:30:00-07:00",
  makerReceiptsOpenedAfterColdRead: true,
  reverseBrief: { readerJob: "understand the system", centralMentalModel: "product surrounds model", practicalPayoff: "check outputs", readingMode: "linear then lookup" },
  participantObservations: [1, 2, 3].map(observationFor),
  nonCompensableVetoes: Object.fromEntries(["openingOrientation","promiseFidelity","connectedProgression","lookupAndRecovery","unseenTransfer","analogyIntegrity","audienceExamples","misconceptionResistance","materialAccuracy","continuousRenderedReadability","laidiesVoice"].map(key => [key, "PASS"])),
  verdict: "ADMISSION_CANDIDATE",
  limitations: []
};

const inspect = (candidate = rendered, candidateSource = source, candidateReceipt = receipt, rejectedArtifacts = []) => inspectLibraryBookCandidate({ source: candidateSource, sourceBytes, sourcePath, rendered: candidate, receipt: candidateReceipt, rejectedArtifacts, root: tempRoot });
assert.deepEqual(inspect(), [], "valid proportional fixture must pass");

const noContents = rendered.replace(/<nav class="book-contents"[\s\S]*?<\/nav>/, "");
assert.match(inspect(noContents, source, { ...receipt, artifactSha256: sha256(noContents) }).join("\n"), /contents route/, "missing contents must fail");

const linkWall = rendered.replace("</div>\n", `<p>${Array.from({length: 12}, (_, i) => `<a href="#parts">${i}</a>`).join(" ")}</p></div>\n`);
assert.match(inspect(linkWall, source, { ...receipt, artifactSha256: sha256(linkWall) }).join("\n"), /link wall/, "dense index wall must fail");

const noTransfer = structuredClone(receipt);
noTransfer.participantObservations[0].readerTasks = noTransfer.participantObservations[0].readerTasks.filter(task => task.kind !== "UNSEEN_TRANSFER");
assert.match(inspect(rendered, source, noTransfer).join("\n"), /lacks required UNSEEN_TRANSFER/, "every reader needs an unseen transfer outcome");

const onlyOneReader = { ...receipt, participantObservations: receipt.participantObservations.slice(0, 1) };
assert.match(inspect(rendered, source, onlyOneReader).join("\n"), /three distinct unfamiliar-human/, "one reader must not satisfy the three-reader gate");

const staleV1Receipt = { ...receipt, schemaVersion: "library-book-cold-reader-review.v1" };
assert.match(inspect(rendered, source, staleV1Receipt).join("\n"), /v2 observed-human evidence is required/, "a v1 aggregate receipt must fail closed");

const duplicateReader = structuredClone(receipt);
duplicateReader.participantObservations[1].participantId = duplicateReader.participantObservations[0].participantId;
assert.match(inspect(rendered, source, duplicateReader).join("\n"), /participant IDs must be unique/, "duplicate reader identities must fail");

const simulatedReader = structuredClone(receipt);
simulatedReader.participantObservations[1].evidenceType = "SIMULATED";
assert.match(inspect(rendered, source, simulatedReader).join("\n"), /not observed-human evidence/, "simulated reader evidence must fail");

const familiarReader = structuredClone(receipt);
familiarReader.participantObservations[2].familiarity = "MAKER_COLLABORATOR";
assert.match(inspect(rendered, source, familiarReader).join("\n"), /does not attest an unfamiliar reader/, "a familiar maker collaborator must fail the cold-reader gate");

const staleEvidence = structuredClone(receipt);
staleEvidence.participantObservations[0].observationBinding.sha256 = "0".repeat(64);
assert.match(inspect(rendered, source, staleEvidence).join("\n"), /evidence SHA-256 is stale/, "stale observation evidence must fail");

const unrelatedEvidence = structuredClone(receipt);
unrelatedEvidence.participantObservations[0].readerTasks[0].observedResponse = "A replacement response absent from the evidence file.";
assert.match(inspect(rendered, source, unrelatedEvidence).join("\n"), /evidence omits the recorded ORIENTATION response/, "an unpreserved response must fail");

const selfAdministered = structuredClone(receipt);
selfAdministered.administrator.principalId = selfAdministered.administrator.makerPrincipalId;
assert.match(inspect(rendered, source, selfAdministered).join("\n"), /cannot be the book maker/, "the book maker must not administer cold-reader admission");

const disconnectedSource = { ...source, chapters: [{ ...source.chapters[0], bodyHtml: "short" }, source.chapters[1]] };
assert.match(inspect(rendered, disconnectedSource).join("\n"), /bodyHtml is incomplete/, "outline-only source must fail");

const rejectedRegistry = JSON.parse(fs.readFileSync(path.join(root, "content/library-books/rejected-artifacts.json"), "utf8")).artifacts;
const rejectedHtml = fs.readFileSync(path.join(root, "content/library-books/rendered/concepts-101.html"), "utf8");
const rejectedErrors = inspectLibraryBookCandidate({ source: JSON.parse(fs.readFileSync(path.join(root, "content/library-books/concepts-101.source.json"), "utf8")), sourceBytes: fs.readFileSync(path.join(root, "content/library-books/concepts-101.source.json")), sourcePath: "content/library-books/concepts-101.source.json", rendered: rejectedHtml, receipt: {}, rejectedArtifacts: rejectedRegistry, root });
assert.match(rejectedErrors.join("\n"), /exact artifact is directly rejected/, "Ali-rejected exact artifact must fail unaided");
assert.match(rejectedErrors.join("\n"), /repeated mini-template|link wall/, "known failure family must fail without relying only on its hash");

fs.rmSync(tempRoot, { recursive: true, force: true });
console.log("LIBRARY BOOK CONTENT ADMISSION CALIBRATION PASS · valid=1 rejected=13 exact_ali_rejection=1 one_reader=1 stale_v1=1 duplicate_reader=1 simulated_reader=1 familiar_reader=1 stale_evidence=1 unrelated_evidence=1 self_administered=1");
