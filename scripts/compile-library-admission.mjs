#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_PATH = /^\/content\/library-books\/rendered\/[a-z0-9-]+\.html$/;
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VERSION = /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/;
const SHA256 = /^[a-f0-9]{64}$/;
const START = "/* LIBRARY_ADMISSION_COMPILED_START */";
const END = "/* LIBRARY_ADMISSION_COMPILED_END */";

function exactKeys(value, allowed) {
  return Object.keys(value).every((key) => allowed.has(key));
}

export function compileAdmissionManifest(manifest, { root = process.cwd() } = {}) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new Error("admission manifest must be an object");
  }
  const rows = Array.isArray(manifest.books)
    ? manifest.books
    : Array.isArray(manifest.entries)
      ? manifest.entries
      : null;
  if (!rows) throw new Error("admission manifest must contain books[]");

  const records = Object.create(null);
  const seen = new Set();
  for (const row of rows) {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      throw new Error("every admission record must be an object");
    }
    const allowed = new Set([
      "book_id", "status", "source_path", "content_version",
      "admission_version", "source_references", "claim_references",
      "reviewed_at", "review_owner", "correction_state", "artifact_sha256"
    ]);
    if (!exactKeys(row, allowed)) {
      throw new Error(`unknown field in admission record ${row.book_id || "(unknown)"}`);
    }
    const id = row.book_id;
    if (!ID.test(id || "") || seen.has(id)) {
      throw new Error(`invalid or duplicate book_id: ${id || "(missing)"}`);
    }
    seen.add(id);
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
  libraryPath = "library.html"
} = {}) {
  const absoluteManifest = path.resolve(root, manifestPath);
  const absoluteLibrary = path.resolve(root, libraryPath);
  const records = fs.existsSync(absoluteManifest)
    ? compileAdmissionManifest(
        JSON.parse(fs.readFileSync(absoluteManifest, "utf8")),
        { root }
      )
    : Object.create(null);
  const source = fs.readFileSync(absoluteLibrary, "utf8");
  const start = source.indexOf(START);
  const end = source.indexOf(END);
  if (start < 0 || end < start) throw new Error("library admission markers are missing");
  const replacement = `${START}\n${renderCompiledAdmission(records)}\n`;
  const next = source.slice(0, start) + replacement + source.slice(end);
  if (next !== source) fs.writeFileSync(absoluteLibrary, next);
  return { manifestPresent: fs.existsSync(absoluteManifest), admitted: Object.keys(records) };
}

const invoked = process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  try {
    const result = compileLibraryAdmission();
    console.log(
      `LIBRARY ADMISSION COMPILE PASS manifest=${result.manifestPresent ? "present" : "absent"} admitted=${result.admitted.length}`
    );
  } catch (error) {
    console.error(`LIBRARY ADMISSION COMPILE FAIL: ${error.message}`);
    process.exitCode = 1;
  }
}
