#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  process.env.BLEND_SNAP_ROOT ||
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
);
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
let checks = 0;

function check(condition, label) {
  assert.equal(Boolean(condition), true, label);
  checks += 1;
}

const cafe = read("blend-snap.html");
const welcome = read("content/site/sv-welcome-tour.js");
const directory = read("content/site/sunnyvaile-directory.js");
const manifest = JSON.parse(read("content/blend-snap-weekly-packs.json"));
const issueFiles = [1, 2, 3, 4].map((number) =>
  read(`issues/issue-${String(number).padStart(2, "0")}.html`)
);
const staleGuarantees =
  /cards included|fresh pack of trading cards|study pack\s*\/\s*trading cards/i;
const internalTerms =
  /architecture exists|collection authority repair|episode index declares|server-authoritative|unproven/i;
const publicPayload = JSON.stringify(manifest);

check(!staleGuarantees.test(cafe), "café source has no stale pack guarantee");
check(!staleGuarantees.test(welcome), "Welcome Tour has no stale pack guarantee");
check(!staleGuarantees.test(directory), "directory has no stale pack guarantee");
check(
  !/"evidence"|"evidenceOwner"|"verifiedOn"/.test(publicPayload) &&
  !internalTerms.test(publicPayload),
  "public manifest contains no private stewardship fields or production language"
);
check(
  cafe.includes('class="bs-notice bs-notice--study-pack"') &&
  cafe.includes("Availability checked before every order") &&
  cafe.includes("background: #fff8c8"),
  "known corkboard wording is covered by a visible truthful source treatment"
);
check(
  welcome.includes("ready, held, planned or unavailable"),
  "Welcome Tour explains the manifest-governed availability states"
);
check(
  directory.includes("Episode pack menu · availability varies") &&
  directory.includes("Try-On + reference when ready"),
  "directory describes variable pack availability"
);

for (const [index, issue] of issueFiles.entries()) {
  const match = issue.match(
    /href="\/blend-snap\.html#the-study-pack">Study Pack<small>([^<]+)<\/small>/
  );
  check(
    match?.[1] === "Availability checked at the café",
    `Episode ${String(index + 1).padStart(2, "0")} rail fails closed`
  );
}

for (const pack of manifest.packs) {
  for (const component of pack.components) {
    check(
      typeof component.publicNote === "string" && component.publicNote.trim(),
      `Episode ${pack.episodeNumber} ${component.id} has a public note`
    );
    check(
      !internalTerms.test(`${component.statusLabel} ${component.publicNote}`),
      `Episode ${pack.episodeNumber} ${component.id} hides internal evidence language`
    );
  }
}

check(
  cafe.includes("note.textContent = component.publicNote") &&
  !cafe.includes("note.textContent = component.evidence"),
  "render path uses public notes rather than internal evidence"
);
check(
  cafe.includes('role="status" aria-live="polite" aria-atomic="true"') &&
  cafe.includes('id="bsPackRetry"') &&
  cafe.includes('document.getElementById("bsPackRetry").focus'),
  "failure path has a persistent live status and meaningful focus target"
);
check(
  cafe.includes("new AbortController()") &&
  cafe.includes("controller.abort()") &&
  cafe.includes("}, 8000)"),
  "public loader has a bounded eight-second abort deadline"
);

console.log(
  `✓ BLEND & SNAP CROSS-ENTRY: ${checks} deterministic checks · ` +
  "café/welcome/directory/episodes/manifest"
);
