#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const registry = readJson("content/library-books/ai-dictionary.term-registry.json");
const owners = Object.fromEntries(["ai-fundamentals-101", "working-with-ai-101"].map(id => [
  id,
  readJson(`content/library-books/sources/${id}.source.json`)
]));
const errors = [];

if (process.env.DICTIONARY_TEST_INJECT_BAD_OWNER === "1" && registry.terms[0]) {
  registry.terms[0].owner_section_anchor = "chapter-that-does-not-exist";
}

for (const term of registry.terms) {
  const owner = owners[term.owner_book_id];
  if (!owner) {
    errors.push(`${term.canonical_label}: unknown owner ${term.owner_book_id}`);
    continue;
  }
  if (term.owner_content_version !== owner.contentVersion) {
    errors.push(`${term.canonical_label}: owner version ${term.owner_content_version} != ${owner.contentVersion}`);
  }
  const ownerIds = new Set([owner.intro, ...owner.chapters].map(section => section.id));
  if (!ownerIds.has(term.owner_section_anchor)) {
    errors.push(`${term.canonical_label}: missing owner anchor ${term.owner_book_id}::${term.owner_section_anchor}`);
  }
  if (term.practical_anchor) {
    const practicalOwner = owners[term.practical_anchor.book_id];
    const practicalIds = new Set([practicalOwner?.intro, ...(practicalOwner?.chapters || [])].filter(Boolean).map(section => section.id));
    if (!practicalIds.has(term.practical_anchor.section_anchor)) {
      errors.push(`${term.canonical_label}: missing practical anchor ${term.practical_anchor.book_id}::${term.practical_anchor.section_anchor}`);
    }
  }
}

const labels = registry.terms.map(term => term.canonical_label.toLocaleLowerCase("en"));
if (new Set(labels).size !== labels.length) errors.push("duplicate canonical term labels");
if (registry.authority !== "DERIVED_FROM_OWNER_BOOKS_PENDING_ADMISSION") errors.push(`unexpected authority ${registry.authority}`);

if (errors.length) {
  console.error(`AI DICTIONARY REGISTRY FAIL\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`AI DICTIONARY REGISTRY PASS terms=${registry.terms.length} owners=2 exact_owner_versions=true exact_owner_anchors=true`);
