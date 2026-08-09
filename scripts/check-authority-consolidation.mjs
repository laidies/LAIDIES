#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function authorityErrors({ canon, writing }) {
  const errors = [];
  if (!canon.includes("THE GRIMOIRE IS RETIRED")) errors.push("Canon Index does not retire the Grimoire");
  if (!canon.includes("The Weekly at the NewsStand")) errors.push("Canon Index does not bind the current Weekly name");
  if (!writing.includes("Public Copy Is Not An Operations Log")) errors.push("Writing Lock lacks the public-copy boundary");
  if (!writing.includes("Headings must name a clear destination")) errors.push("Writing Lock lacks the clear-heading rule");
  for (const stale of [
    "Canonical guide name: the SLAiYER Handbook.",
    "The SLAiYER Handbook is the practical guide inside the Grimoire.",
    "The LAiDIES Grimoire includes:"
  ]) {
    if (writing.includes(stale)) errors.push(`Writing Lock revives retired architecture: ${stale}`);
  }
  return errors;
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const canon = fs.readFileSync(path.join(root, "operations/voice/laidies-canon-index.md"), "utf8");
  const writing = fs.readFileSync(path.join(root, "operations/voice/laidies-writing-lock.md"), "utf8");
  const errors = authorityErrors({ canon, writing });
  if (errors.length) {
    console.error("AUTHORITY CONSOLIDATION CHECK FAIL");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("AUTHORITY CONSOLIDATION CHECK PASS retired_architecture=absent public_copy_boundary=present current_weekly=present");
}
