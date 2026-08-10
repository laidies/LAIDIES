#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RENDERER_VERSION, renderLibraryBookSource, validateRenderableSource } from "./render-library-book.mjs";

const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const PASS_VETOES = [
  "openingOrientation", "promiseFidelity", "connectedProgression", "lookupAndRecovery",
  "unseenTransfer", "analogyIntegrity", "audienceExamples", "misconceptionResistance",
  "materialAccuracy", "continuousRenderedReadability", "laidiesVoice"
];

function meta(html, name) {
  return html.match(new RegExp(`<meta\\s+[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`, "i"))?.[1];
}

export function inspectColdReaderReceipt(receipt, artifactSha256, root) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(receipt?.schemaVersion === "library-book-cold-reader-review.v2", "cold-reader receipt schema is missing or stale; v2 observed-human evidence is required");
  require(receipt?.artifactSha256 === artifactSha256, "cold-reader receipt is not bound to the exact artifact");
  require(receipt?.reviewMode === "ARTIFACT_FIRST_COLD", "review was not artifact-first and cold");
  require(typeof receipt?.reviewer === "string" && receipt.reviewer.trim(), "cold-reader reviewer is missing");
  require(typeof receipt?.reviewedAt === "string" && !Number.isNaN(Date.parse(receipt.reviewedAt)), "cold-reader reviewedAt must be an ISO date-time");
  require(receipt?.makerReceiptsOpenedAfterColdRead === true, "maker receipts were opened before the cold read");
  require(receipt?.verdict === "ADMISSION_CANDIDATE", "cold-reader verdict is not ADMISSION_CANDIDATE");
  require(typeof receipt?.administrator?.principalId === "string" && receipt.administrator.principalId.trim(), "cold-reader administrator principal is missing");
  require(typeof receipt?.administrator?.makerPrincipalId === "string" && receipt.administrator.makerPrincipalId.trim(), "book maker principal is missing");
  require(receipt?.administrator?.independentFromMaker === true, "cold-reader administrator did not attest independence from the maker");
  require(receipt?.administrator?.principalId !== receipt?.administrator?.makerPrincipalId, "cold-reader administrator cannot be the book maker");
  const reverse = receipt?.reverseBrief;
  for (const key of ["readerJob", "centralMentalModel", "practicalPayoff", "readingMode"]) {
    require(typeof reverse?.[key] === "string" && reverse[key].trim(), `cold-reader reverse brief lacks ${key}`);
  }
  const observations = Array.isArray(receipt?.participantObservations) ? receipt.participantObservations : [];
  require(observations.length >= 3, "at least three distinct unfamiliar-human observations are required");
  const participantIds = new Set();
  const evidenceBindings = new Set();
  const requiredTasks = ["ORIENTATION", "LOOKUP", "EXPLAIN_BACK", "UNSEEN_TRANSFER"];
  for (const [participantIndex, observation] of observations.entries()) {
    const label = `participantObservations[${participantIndex}]`;
    require(observation?.evidenceType === "OBSERVED_HUMAN", `${label} is not observed-human evidence`);
    require(observation?.familiarity === "UNFAMILIAR_WITH_ARTIFACT", `${label} does not attest an unfamiliar reader`);
    require(typeof observation?.participantId === "string" && observation.participantId.trim(), `${label} lacks participantId`);
    require(!participantIds.has(observation?.participantId), "cold-reader participant IDs must be unique");
    participantIds.add(observation?.participantId);
    require(typeof observation?.observedAt === "string" && !Number.isNaN(Date.parse(observation.observedAt)), `${label}.observedAt must be an ISO date-time`);
    require(Date.parse(observation?.observedAt) <= Date.parse(receipt?.reviewedAt), `${label}.observedAt cannot be after reviewedAt`);

    const tasks = Array.isArray(observation?.readerTasks) ? observation.readerTasks : [];
    for (const kind of requiredTasks) require(tasks.some(task => task.kind === kind), `${label} lacks required ${kind} task`);
    for (const task of tasks) {
      require(task?.verdict === "PASS", `${label}.${task?.kind || "reader task"} did not pass`);
      for (const key of ["prompt", "observedResponse", "expectedEvidence", "artifactLocator"]) {
        require(typeof task?.[key] === "string" && task[key].trim(), `${label}.${task?.kind || "reader task"} lacks ${key}`);
      }
    }

    const binding = observation?.observationBinding;
    const relative = binding?.path;
    const absolute = path.resolve(root, relative || "");
    require(Boolean(relative) && absolute.startsWith(path.resolve(root) + path.sep) && fs.existsSync(absolute) && fs.statSync(absolute).isFile(), `${label} evidence is absent: ${relative || "(missing)"}`);
    require(/^[a-f0-9]{64}$/.test(binding?.sha256 || ""), `${label} evidence SHA-256 is missing`);
    if (relative && fs.existsSync(absolute) && fs.statSync(absolute).isFile()) {
      const evidenceBytes = fs.readFileSync(absolute);
      require(sha256(evidenceBytes) === binding.sha256, `${label} evidence SHA-256 is stale`);
      const evidenceText = evidenceBytes.toString("utf8");
      require(evidenceText.includes(artifactSha256), `${label} evidence does not name the exact artifact SHA-256`);
      require(evidenceText.includes(observation.participantId), `${label} evidence does not name its participant ID`);
      for (const task of tasks) require(evidenceText.includes(task.observedResponse), `${label} evidence omits the recorded ${task.kind} response`);
    }
    const bindingKey = `${binding?.path || ""}:${binding?.sha256 || ""}`;
    require(!evidenceBindings.has(bindingKey), "cold-reader evidence bindings must be participant-specific");
    evidenceBindings.add(bindingKey);
  }
  for (const veto of PASS_VETOES) require(receipt?.nonCompensableVetoes?.[veto] === "PASS", `non-compensable veto failed: ${veto}`);
  return errors;
}

export function inspectLibraryBookCandidate({ source, sourceBytes, sourcePath, rendered, receipt, rejectedArtifacts = [], root = process.cwd() }) {
  const errors = [...validateRenderableSource(source)];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  const artifactSha = sha256(rendered);
  const rejected = rejectedArtifacts.find(item => item.artifact_sha256 === artifactSha);
  require(!rejected, `exact artifact is directly rejected: ${artifactSha}`);
  if (errors.length === 0) {
    const expected = renderLibraryBookSource(source, sourcePath, sourceBytes);
    require(rendered === expected, "rendered book is not deterministically derived from its complete canonical source");
  }
  require(meta(rendered, "laidies:canonical-source") === `/${sourcePath}`, "canonical source metadata is missing or stale");
  require(meta(rendered, "laidies:canonical-source-sha256") === sha256(sourceBytes), "canonical source SHA metadata is missing or stale");
  require(meta(rendered, "laidies:renderer-version") === RENDERER_VERSION, "renderer version metadata is missing or stale");
  require(meta(rendered, "laidies:content-version") === source?.contentVersion, "content version metadata is missing or stale");

  const nav = rendered.match(/<nav\s+class="book-contents"[^>]*aria-label="Contents"[^>]*>([\s\S]*?)<\/nav>/i)?.[1] || "";
  const links = [...nav.matchAll(/href="#([a-z0-9-]+)"/g)].map(match => match[1]);
  const governed = [source?.intro, ...(Array.isArray(source?.chapters) ? source.chapters : [])].filter(Boolean).map(section => section.id);
  require(links.length === governed.length && JSON.stringify(links) === JSON.stringify(governed), "visible contents route does not match the authored reading order");
  for (const id of governed) require((rendered.match(new RegExp(`\\sid="${id}"`, "g")) || []).length === 1, `section ${id} must have one exact destination`);

  const phraseCounts = ["Where it stops:", "In real life."].map(phrase => [phrase, rendered.split(phrase).length - 1]);
  for (const [phrase, count] of phraseCounts) require(count <= Math.max(4, governed.length), `repeated mini-template dominates the book: ${phrase} x${count}`);
  const denseParagraph = [...rendered.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].some(match => (match[1].match(/href="#/g) || []).length >= 12);
  require(!denseParagraph, "dense horizontal fragment-link wall is not an admissible lookup route");
  require(!/requiredMovesPerConcept|Every entry tells you what it means, gives a bounded analogy/i.test(rendered), "producer template language is visible in the reader experience");
  errors.push(...inspectColdReaderReceipt(receipt, artifactSha, root));
  return errors;
}

export function checkBookFromRepository(bookId, { root = process.cwd() } = {}) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "content/library-books/admission-manifest.json"), "utf8"));
  const row = manifest.books.find(book => book.book_id === bookId);
  if (!row) throw new Error(`${bookId}: no admission-manifest row`);
  if (row.status !== "available") throw new Error(`${bookId}: status is ${row.status}; only an available candidate can pass admission`);
  const sourceBinding = row.learning_admission?.canonical_source;
  const receiptBinding = row.learning_admission?.cold_reader_outcome;
  if (!sourceBinding?.path || !receiptBinding?.path) throw new Error(`${bookId}: v2 canonical source and cold-reader outcome bindings are required`);
  const sourcePath = sourceBinding.path;
  const sourceBytes = fs.readFileSync(path.join(root, sourcePath));
  const source = JSON.parse(sourceBytes.toString("utf8"));
  const renderedPath = row.source_path.replace(/^\/+/, "");
  const rendered = fs.readFileSync(path.join(root, renderedPath), "utf8");
  const receipt = JSON.parse(fs.readFileSync(path.join(root, receiptBinding.path), "utf8"));
  const rejected = JSON.parse(fs.readFileSync(path.join(root, "content/library-books/rejected-artifacts.json"), "utf8")).artifacts;
  const errors = inspectLibraryBookCandidate({ source, sourceBytes, sourcePath, rendered, receipt, rejectedArtifacts: rejected, root });
  if (sourceBinding.sha256 !== sha256(sourceBytes)) errors.push("manifest canonical source binding is stale");
  const receiptBytes = fs.readFileSync(path.join(root, receiptBinding.path));
  if (receiptBinding.sha256 !== sha256(receiptBytes)) errors.push("manifest cold-reader receipt binding is stale");
  if (row.artifact_sha256 !== sha256(rendered)) errors.push("manifest artifact binding is stale");
  return errors;
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  const bookId = process.argv[process.argv.indexOf("--book") + 1];
  if (!bookId || process.argv.indexOf("--book") < 0) {
    console.error("usage: node scripts/check-library-book-content-admission.mjs --book <book-id>");
    process.exit(2);
  }
  try {
    const errors = checkBookFromRepository(bookId);
    if (errors.length) throw new Error(errors.join("\n- "));
    console.log(`LIBRARY BOOK CONTENT ADMISSION PASS book=${bookId}`);
  } catch (error) {
    console.error(`LIBRARY BOOK CONTENT ADMISSION FAIL book=${bookId}\n- ${error.message}`);
    process.exitCode = 1;
  }
}
