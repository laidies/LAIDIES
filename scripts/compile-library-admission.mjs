#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assertPropagationConsumable } from "./library-correction-service.mjs";
import { checkBookFromRepository } from "./check-library-book-content-admission.mjs";

const SOURCE_PATH = /^\/content\/library-books\/rendered\/[a-z0-9-]+\.html$/;
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VERSION = /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/;
const SHA256 = /^[a-f0-9]{64}$/;
const START = "/* LIBRARY_ADMISSION_COMPILED_START */";
const END = "/* LIBRARY_ADMISSION_COMPILED_END */";
const ACCEPTED_CORRECTION_SCHEMA_VERSION = "library-correction-propagations.v1";
const ACCEPTED_CORRECTION_AUTHORITY = "LOCAL_ACCEPTED_TERMINAL_STATE_ONLY_NO_ADMISSION_AUTHORITY";
const ACCEPTED_CORRECTION_KEYS = new Set(["schema_version", "authority", "propagations"]);
const REJECTED_ARTIFACT_SCHEMA = "library-rejected-artifacts.v1";
const REJECTED_ARTIFACT_AUTHORITY = "DIRECT_ALI_REJECTION_DEFAULT_DENY";
const LEARNING_ADMISSION_SCHEMA = "library-book-learning-admission.v3";
const LEARNING_CRITERIA = Object.freeze([
  "governing_reader_question",
  "single_causal_mental_model",
  "truthful_scannable_architecture",
  "coherent_scope",
  "recurring_worked_case",
  "mapped_analogies_with_limits",
  "nonduplicative_concept_relationships",
  "synthesis_and_retention_map",
  "useful_next_experience",
  "maintenance_and_currentness_contract"
]);

const TERMINAL_CORRECTION_STATES = new Set(["resolved_corrected", "demoted"]);

function acceptedCorrectionHolds(propagations, manifestBookIds) {
  if (propagations == null) return new Map();
  if (!Array.isArray(propagations)) {
    throw new Error("accepted correction propagations must be an array");
  }
  const holds = new Map();
  const versions = new Set();
  for (const propagation of propagations) {
    assertPropagationConsumable(propagation);
    if (!TERMINAL_CORRECTION_STATES.has(propagation.state)) {
      throw new Error(`${propagation.correction_id || "correction"}: only terminal correction state may reach admission`);
    }
    if (versions.has(propagation.version_id)) {
      throw new Error(`${propagation.version_id}: duplicate correction propagation version`);
    }
    versions.add(propagation.version_id);
    const compiler = propagation.admission_compiler;
    const bookId = compiler.book_id;
    if (!manifestBookIds.has(bookId)) {
      throw new Error(`${bookId || "correction"}: correction propagation has no admission record`);
    }
    if (propagation.site_index.book_id !== bookId ||
        propagation.miss_jeeves.book_id !== bookId ||
        propagation.puffy_recheck.book_id !== bookId) {
      throw new Error(`${bookId}: correction consumers disagree on book_id`);
    }
    if (propagation.site_index.action !== "suppress-until-current-admission" ||
        propagation.miss_jeeves.action !== "suppress-until-current-admission" ||
        propagation.puffy_recheck.action !== "recheck-admission-on-reopen" ||
        propagation.puffy_recheck.preserve_unavailable_marker !== true) {
      throw new Error(`${bookId}: correction consumer actions are incomplete`);
    }
    if (propagation.state === "demoted" &&
        (compiler.required_action !== "demote-to-hold" ||
         compiler.required_correction_state !== "correction-required")) {
      throw new Error(`${bookId}: demotion propagation is not fail-closed`);
    }
    if (propagation.state === "resolved_corrected" &&
        (compiler.required_action !== "require-independent-readmission" ||
         compiler.required_correction_state !== "corrected-pending-readmission")) {
      throw new Error(`${bookId}: corrected propagation bypasses readmission`);
    }
    holds.set(bookId, compiler.required_correction_state);
  }
  return holds;
}

function exactKeys(value, allowed) {
  return Object.keys(value).every((key) => allowed.has(key));
}

function readAcceptedCorrectionState(absolutePath) {
  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    throw new Error("accepted correction propagation file is required");
  }
  const state = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  if (!state || typeof state !== "object" || Array.isArray(state) ||
      Object.keys(state).length !== ACCEPTED_CORRECTION_KEYS.size ||
      !exactKeys(state, ACCEPTED_CORRECTION_KEYS) ||
      state.schema_version !== ACCEPTED_CORRECTION_SCHEMA_VERSION ||
      state.authority !== ACCEPTED_CORRECTION_AUTHORITY ||
      !Array.isArray(state.propagations)) {
    throw new Error("accepted correction propagation boundary is invalid");
  }
  return state;
}

function readRejectedArtifacts(absolutePath) {
  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    throw new Error("Library rejected-artifact registry is required");
  }
  const state = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  if (!state || state.schema_version !== REJECTED_ARTIFACT_SCHEMA ||
      state.authority !== REJECTED_ARTIFACT_AUTHORITY || !Array.isArray(state.artifacts)) {
    throw new Error("Library rejected-artifact registry is invalid");
  }
  const rejected = new Map();
  for (const artifact of state.artifacts) {
    if (!artifact || !ID.test(artifact.book_id || "") ||
        !SHA256.test(artifact.artifact_sha256 || "") ||
        artifact.status !== "HOLD_RETURN_TO_DRAFT" ||
        artifact.derivative_use !== "PROHIBITED_EXCEPT_SOURCE_MINE" ||
        typeof artifact.authority_owner !== "string" || !artifact.authority_owner.trim() ||
        !Number.isFinite(Date.parse(artifact.rejected_at)) ||
        !Array.isArray(artifact.objective_failures) || artifact.objective_failures.length === 0) {
      throw new Error("Library rejected-artifact record is incomplete");
    }
    if (rejected.has(artifact.artifact_sha256)) throw new Error("duplicate rejected Library artifact");
    rejected.set(artifact.artifact_sha256, artifact);
  }
  return rejected;
}

function assertEvidenceBinding(binding, label, root) {
  if (!binding || typeof binding !== "object" || Array.isArray(binding) ||
      !exactKeys(binding, new Set(["path", "sha256"])) ||
      typeof binding.path !== "string" || !binding.path || binding.path.startsWith("/") ||
      binding.path.includes("\\") || !SHA256.test(binding.sha256 || "")) {
    throw new Error(`${label} evidence binding is invalid`);
  }
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(path.resolve(root) + path.sep) ||
      !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    throw new Error(`${label} evidence is absent`);
  }
  const actual = crypto.createHash("sha256").update(fs.readFileSync(absolute)).digest("hex");
  if (actual !== binding.sha256) throw new Error(`${label} evidence hash is stale`);
}

function assertLearningAdmission(row, root, rejectedArtifacts) {
  const rejected = rejectedArtifacts.get(row.artifact_sha256);
  if (rejected) {
    throw new Error(`${row.book_id}: exact artifact was directly rejected and cannot be admitted or used as a derivative template`);
  }
  const admission = row.learning_admission;
  const allowed = new Set([
    "schema_version", "artifact_sha256", "learning_intake", "architecture_evidence",
    "instructional_verdict", "usability_verdict", "criteria",
    "ali_rejection_state", "derivative_use", "canonical_source"
  ]);
  if (!admission || typeof admission !== "object" || Array.isArray(admission) ||
      !exactKeys(admission, allowed) || Object.keys(admission).length !== allowed.size ||
      admission.schema_version !== LEARNING_ADMISSION_SCHEMA ||
      admission.artifact_sha256 !== row.artifact_sha256 ||
      admission.ali_rejection_state !== "clear" || admission.derivative_use !== "allowed") {
    throw new Error(`${row.book_id}: mandatory learning admission is missing or invalid`);
  }
  assertEvidenceBinding(admission.learning_intake, `${row.book_id} learning intake`, root);
  assertEvidenceBinding(admission.architecture_evidence, `${row.book_id} architecture`, root);
  assertEvidenceBinding(admission.instructional_verdict, `${row.book_id} instructional verdict`, root);
  assertEvidenceBinding(admission.usability_verdict, `${row.book_id} artifact-first usability verdict`, root);
  assertEvidenceBinding(admission.canonical_source, `${row.book_id} complete canonical source`, root);
  if (!admission.criteria || typeof admission.criteria !== "object" || Array.isArray(admission.criteria) ||
      !exactKeys(admission.criteria, new Set(LEARNING_CRITERIA)) ||
      Object.keys(admission.criteria).length !== LEARNING_CRITERIA.length ||
      LEARNING_CRITERIA.some((criterion) => admission.criteria[criterion] !== "PASS")) {
    throw new Error(`${row.book_id}: every mandatory artifact-bound book criterion must independently PASS`);
  }
}

export function compileAdmissionManifest(manifest, {
  root = process.cwd(),
  correctionPropagations = [],
  rejectedArtifacts = new Map()
} = {}) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new Error("admission manifest must be an object");
  }
  const rows = Array.isArray(manifest.books)
    ? manifest.books
    : Array.isArray(manifest.entries)
      ? manifest.entries
      : null;
  if (!rows) throw new Error("admission manifest must contain books[]");

  const manifestBookIds = new Set(rows.map((row) => row?.book_id).filter(Boolean));
  const correctionHolds = acceptedCorrectionHolds(
    correctionPropagations,
    manifestBookIds
  );

  const records = Object.create(null);
  const seen = new Set();
  for (const row of rows) {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      throw new Error("every admission record must be an object");
    }
    const allowed = new Set([
      "book_id", "status", "source_path", "content_version",
      "admission_version", "source_references", "claim_references",
      "reviewed_at", "review_owner", "correction_state", "artifact_sha256",
      "learning_admission"
    ]);
    if (!exactKeys(row, allowed)) {
      throw new Error(`unknown field in admission record ${row.book_id || "(unknown)"}`);
    }
    const id = row.book_id;
    if (!ID.test(id || "") || seen.has(id)) {
      throw new Error(`invalid or duplicate book_id: ${id || "(missing)"}`);
    }
    seen.add(id);
    if (correctionHolds.has(id)) {
      continue;
    }
    const available = row.status === "available";
    const boundHold = row.status === "hold" && Boolean(row.source_path);
    if (!available && !boundHold) {
      continue;
    }
    if (!SOURCE_PATH.test(row.source_path || "") ||
        row.source_path.includes("\\") || /[\u0000-\u001f\u007f%?#]/.test(row.source_path)) {
      throw new Error(`${id}: source_path is not an exact rendered-book path`);
    }
    if (!VERSION.test(row.content_version || "") ||
        !VERSION.test(row.admission_version || "")) {
      throw new Error(`${id}: content/admission version is missing or invalid`);
    }
    if (available && row.correction_state !== "clear") {
      continue;
    }
    if (!SHA256.test(row.artifact_sha256 || "")) {
      throw new Error(`${id}: artifact_sha256 must be a lowercase SHA-256`);
    }
    if (!Array.isArray(row.source_references) || !row.source_references.length ||
        !Array.isArray(row.claim_references) || !row.claim_references.length ||
        !row.source_references.every((value) => typeof value === "string" && value.trim()) ||
        !row.claim_references.every((value) => typeof value === "string" && value.trim())) {
      throw new Error(`${id}: source_references and claim_references are required`);
    }
    if (typeof row.review_owner !== "string" || !row.review_owner.trim() ||
        typeof row.reviewed_at !== "string" ||
        !Number.isFinite(Date.parse(row.reviewed_at))) {
      throw new Error(`${id}: review owner/date is missing or invalid`);
    }
    if (available) assertLearningAdmission(row, root, rejectedArtifacts);

    const relative = row.source_path.replace(/^\/+/, "");
    const artifactPath = path.resolve(root, relative);
    if (!artifactPath.startsWith(path.resolve(root) + path.sep) ||
        !fs.existsSync(artifactPath) || !fs.statSync(artifactPath).isFile()) {
      throw new Error(`${id}: admitted artifact is absent`);
    }
    const bytes = fs.readFileSync(artifactPath);
    const actualHash = crypto.createHash("sha256").update(bytes).digest("hex");
    if (actualHash !== row.artifact_sha256) {
      throw new Error(`${id}: admitted artifact hash does not match`);
    }
    const source = bytes.toString("utf8");
    const escapedVersion = row.content_version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const versionMeta = new RegExp(
      `<meta\\s+[^>]*name=["']laidies:content-version["'][^>]*content=["']${escapedVersion}["'][^>]*>`,
      "i"
    );
    if (!versionMeta.test(source)) {
      throw new Error(`${id}: rendered artifact content version does not match`);
    }
    const metaContent = (name) => source.match(
      new RegExp(`<meta\\s+[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`, "i")
    )?.[1];
    const canonicalSource = metaContent("laidies:canonical-source");
    const canonicalSourceSha = metaContent("laidies:canonical-source-sha256");
    if (canonicalSource || canonicalSourceSha) {
      if (!canonicalSource || !canonicalSourceSha ||
          !canonicalSource.startsWith("/") ||
          canonicalSource.includes("\\") ||
          /[\u0000-\u001f\u007f%?#]/.test(canonicalSource) ||
          !SHA256.test(canonicalSourceSha)) {
        throw new Error(`${id}: rendered artifact canonical source binding is invalid`);
      }
      const canonicalPath = path.resolve(root, canonicalSource.slice(1));
      if (!canonicalPath.startsWith(path.resolve(root) + path.sep) ||
          !fs.existsSync(canonicalPath) || !fs.statSync(canonicalPath).isFile()) {
        throw new Error(`${id}: rendered artifact canonical source is absent`);
      }
      const actualCanonicalSha = crypto
        .createHash("sha256")
        .update(fs.readFileSync(canonicalPath))
        .digest("hex");
      if (actualCanonicalSha !== canonicalSourceSha ||
          (row.content_version.startsWith("sha256-") &&
            row.content_version !== `sha256-${actualCanonicalSha}`)) {
        throw new Error(`${id}: rendered artifact canonical source hash does not match`);
      }
    }
    if (boundHold) {
      continue;
    }
    const contentAdmissionErrors = checkBookFromRepository(id, { root });
    if (contentAdmissionErrors.length) {
      throw new Error(`${id}: shared substantial-book admission failed: ${contentAdmissionErrors.join("; ")}`);
    }
    records[id] = {
      sourcePath: row.source_path,
      contentVersion: row.content_version,
      admissionVersion: row.admission_version,
      correctionState: row.correction_state,
      artifactSha256: row.artifact_sha256
    };
  }
  return records;
}

export function renderCompiledAdmission(records) {
  const ordered = Object.fromEntries(
    Object.keys(records).sort().map((id) => [id, records[id]])
  );
  return JSON.stringify(ordered);
}

export function compileLibraryAdmission({
  root = process.cwd(),
  manifestPath = "content/library-books/admission-manifest.json",
  correctionPropagationPath = "content/library-books/corrections/accepted-correction-propagations.json",
  rejectedArtifactPath = "content/library-books/rejected-artifacts.json",
  libraryPath = "library.html"
} = {}) {
  const absoluteManifest = path.resolve(root, manifestPath);
  const absoluteCorrectionPropagations = path.resolve(root, correctionPropagationPath);
  const absoluteRejectedArtifacts = path.resolve(root, rejectedArtifactPath);
  const absoluteLibrary = path.resolve(root, libraryPath);
  const acceptedCorrectionState = readAcceptedCorrectionState(absoluteCorrectionPropagations);
  const rejectedArtifacts = readRejectedArtifacts(absoluteRejectedArtifacts);
  const records = fs.existsSync(absoluteManifest)
    ? compileAdmissionManifest(
        JSON.parse(fs.readFileSync(absoluteManifest, "utf8")),
        { root, correctionPropagations: acceptedCorrectionState.propagations, rejectedArtifacts }
      )
    : Object.create(null);
  const source = fs.readFileSync(absoluteLibrary, "utf8");
  const start = source.indexOf(START);
  const end = source.indexOf(END);
  if (start < 0 || end < start) throw new Error("library admission markers are missing");
  const replacement = `${START}\n${renderCompiledAdmission(records)}\n`;
  const next = source.slice(0, start) + replacement + source.slice(end);
  if (next !== source) fs.writeFileSync(absoluteLibrary, next);
  return {
    manifestPresent: fs.existsSync(absoluteManifest),
    admitted: Object.keys(records),
    acceptedCorrections: acceptedCorrectionState.propagations.length
  };
}

export function assertLibraryAdmissionFreshness({
  root = process.cwd(),
  manifestPath = "content/library-books/admission-manifest.json",
  correctionPropagationPath = "content/library-books/corrections/accepted-correction-propagations.json",
  rejectedArtifactPath = "content/library-books/rejected-artifacts.json",
  libraryPath = "library.html"
} = {}) {
  const absoluteManifest = path.resolve(root, manifestPath);
  const absoluteCorrectionPropagations = path.resolve(root, correctionPropagationPath);
  const absoluteRejectedArtifacts = path.resolve(root, rejectedArtifactPath);
  const absoluteLibrary = path.resolve(root, libraryPath);
  if (!fs.existsSync(absoluteManifest) || !fs.statSync(absoluteManifest).isFile()) {
    throw new Error("library admission manifest is required for public build");
  }
  if (!fs.existsSync(absoluteLibrary) || !fs.statSync(absoluteLibrary).isFile()) {
    throw new Error("library source is required for public build");
  }
  const acceptedCorrectionState = readAcceptedCorrectionState(absoluteCorrectionPropagations);
  const rejectedArtifacts = readRejectedArtifacts(absoluteRejectedArtifacts);
  const records = compileAdmissionManifest(
    JSON.parse(fs.readFileSync(absoluteManifest, "utf8")),
    { root, correctionPropagations: acceptedCorrectionState.propagations, rejectedArtifacts }
  );
  const source = fs.readFileSync(absoluteLibrary, "utf8");
  const start = source.indexOf(START);
  const end = source.indexOf(END);
  if (start < 0 || end < start) throw new Error("library admission markers are missing");
  const expected = `${START}\n${renderCompiledAdmission(records)}\n`;
  const actual = source.slice(start, end);
  if (actual !== expected) {
    throw new Error("library compiled admission is stale for current manifest/correction state");
  }
  return Object.freeze({
    admitted: Object.keys(records),
    acceptedCorrections: acceptedCorrectionState.propagations.length
  });
}

const invoked = process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  try {
    const result = compileLibraryAdmission();
    console.log(
      `LIBRARY ADMISSION COMPILE PASS manifest=${result.manifestPresent ? "present" : "absent"} admitted=${result.admitted.length} accepted_corrections=${result.acceptedCorrections}`
    );
  } catch (error) {
    console.error(`LIBRARY ADMISSION COMPILE FAIL: ${error.message}`);
    process.exitCode = 1;
  }
}
