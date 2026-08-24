#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RENDERER_VERSION, renderLibraryBookSource, validateRenderableSource } from "./render-library-book.mjs";

const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
function meta(html, name) {
  return html.match(new RegExp(`<meta\\s+[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`, "i"))?.[1];
}

export function inspectEditorialEvidence({ instructionalReview, usabilityReview }, artifactSha256) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(typeof instructionalReview === "string" && instructionalReview.includes(`PASS for the exact artifact** \`${artifactSha256}\``), "instructional verdict is not a PASS bound to the exact artifact");
  require(typeof usabilityReview === "string" && usabilityReview.includes(`Exact artifact: \`${artifactSha256}\``), "usability verdict is not bound to the exact artifact");
  require(usabilityReview?.includes("Evidence type: **STRUCTURED_ARTIFACT_FIRST_REVIEW**"), "usability verdict does not identify its evidence type");
  require(usabilityReview?.includes("Human research: **NOT PERFORMED**"), "usability verdict must state that human research was not performed");
  require(usabilityReview?.includes("Verdict: **ADMISSION CANDIDATE**"), "usability verdict is not ADMISSION CANDIDATE");
  require(!/OBSERVED_HUMAN|three distinct unfamiliar-human/i.test(usabilityReview || ""), "usability verdict falsely claims observed-human evidence");
  return errors;
}

export function inspectLibraryBookCandidate({ source, sourceBytes, sourcePath, rendered, instructionalReview = "", usabilityReview = "", rejectedArtifacts = [] }) {
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

  const governed = [source?.intro, ...(Array.isArray(source?.chapters) ? source.chapters : [])].filter(Boolean).map(section => section.id);
  require(!/<nav\s+class="book-contents"|<h2>Contents<\/h2>/i.test(rendered), "rendered book repeats a visible Contents page that belongs in persistent reader navigation");
  for (const id of governed) require((rendered.match(new RegExp(`\\sid="${id}"`, "g")) || []).length === 1, `section ${id} must have one exact destination`);

  for (const chapter of source?.chapters || []) {
    if (!chapter.bodyHtml.includes('class="callout callout-objective"')) continue;
    const objectiveIndex = chapter.bodyHtml.indexOf('class="callout callout-objective"');
    const keyTermsIndex = chapter.bodyHtml.indexOf("Key Terms Introduced in This Chapter");
    const numberedSections = [...chapter.bodyHtml.matchAll(/<h3[^>]*>\d+\.\d+\s+[—-]/gi)].map(match => match.index);
    require(numberedSections.length >= 2, `${chapter.id} needs at least two numbered sections around its orientation block`);
    require(numberedSections[0] < objectiveIndex, `${chapter.id} must begin with its opening teaching section before the objective box`);
    require(objectiveIndex < keyTermsIndex, `${chapter.id} must keep objectives before its key-terms table`);
    require(keyTermsIndex < numberedSections[1], `${chapter.id} must finish its opening section with objectives and key terms before the next section`);
  }

  const phraseCounts = ["Where it stops:", "In real life."].map(phrase => [phrase, rendered.split(phrase).length - 1]);
  for (const [phrase, count] of phraseCounts) require(count <= Math.max(4, governed.length), `repeated mini-template dominates the book: ${phrase} x${count}`);
  const denseParagraph = [...rendered.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].some(match => (match[1].match(/href="#/g) || []).length >= 12);
  require(!denseParagraph, "dense horizontal fragment-link wall is not an admissible lookup route");
  require(!/requiredMovesPerConcept|Every entry tells you what it means, gives a bounded analogy/i.test(rendered), "producer template language is visible in the reader experience");
  errors.push(...inspectEditorialEvidence({ instructionalReview, usabilityReview }, artifactSha));
  return errors;
}

export function checkBookFromRepository(bookId, { root = process.cwd() } = {}) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "content/library-books/admission-manifest.json"), "utf8"));
  const row = manifest.books.find(book => book.book_id === bookId);
  if (!row) throw new Error(`${bookId}: no admission-manifest row`);
  if (row.status !== "available") throw new Error(`${bookId}: status is ${row.status}; only an available candidate can pass admission`);
  const sourceBinding = row.learning_admission?.canonical_source;
  const instructionalBinding = row.learning_admission?.instructional_verdict;
  const usabilityBinding = row.learning_admission?.usability_verdict;
  if (!sourceBinding?.path || !instructionalBinding?.path || !usabilityBinding?.path) throw new Error(`${bookId}: v3 canonical source, instructional and usability bindings are required`);
  const sourcePath = sourceBinding.path;
  const sourceBytes = fs.readFileSync(path.join(root, sourcePath));
  const source = JSON.parse(sourceBytes.toString("utf8"));
  const renderedPath = row.source_path.replace(/^\/+/, "");
  const rendered = fs.readFileSync(path.join(root, renderedPath), "utf8");
  const instructionalReview = fs.readFileSync(path.join(root, instructionalBinding.path), "utf8");
  const usabilityReview = fs.readFileSync(path.join(root, usabilityBinding.path), "utf8");
  const rejected = JSON.parse(fs.readFileSync(path.join(root, "content/library-books/rejected-artifacts.json"), "utf8")).artifacts;
  const errors = inspectLibraryBookCandidate({ source, sourceBytes, sourcePath, rendered, instructionalReview, usabilityReview, rejectedArtifacts: rejected });
  if (sourceBinding.sha256 !== sha256(sourceBytes)) errors.push("manifest canonical source binding is stale");
  const instructionalBytes = fs.readFileSync(path.join(root, instructionalBinding.path));
  if (instructionalBinding.sha256 !== sha256(instructionalBytes)) errors.push("manifest instructional verdict binding is stale");
  const usabilityBytes = fs.readFileSync(path.join(root, usabilityBinding.path));
  if (usabilityBinding.sha256 !== sha256(usabilityBytes)) errors.push("manifest usability verdict binding is stale");
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
