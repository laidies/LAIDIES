import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectContentProducerContract } from "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/scripts/check-content-producer-contract.mjs";
import { inspectProseQualityReview } from "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/scripts/check-prose-quality-admission.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "validation-root");
const inspect = (file, fn) => fn(JSON.parse(fs.readFileSync(path.join(root, file), "utf8")), { root }).errors;
const contractErrors = inspect("producer-contract.json", inspectContentProducerContract);
const reviewErrors = inspect("producer-self-review.json", inspectProseQualityReview);
const expected = "positive exemplar CQX-GOOD-EPISODE-001 is not approved for MICROCOPY";
if (contractErrors.length !== 1 || reviewErrors.length !== 1 || contractErrors[0] !== expected || reviewErrors[0] !== expected) {
  console.error("UNEXPECTED VALIDATION RESULT", { contractErrors, reviewErrors });
  process.exit(1);
}
console.log("SCHEMA GAP CONFIRMED: current registry has no positive exemplar approved for MICROCOPY; no valid producer contract or self-review can pass without an owner registry decision.");
