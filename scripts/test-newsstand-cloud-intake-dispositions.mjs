import assert from "node:assert/strict";
import fs from "node:fs";
import { validateDispositionRegistry } from "./check-newsstand-cloud-intake-dispositions.mjs";

const path = new URL("../operations/product-stewards/newsstand/cloud-intake-dispositions.json", import.meta.url);
const current = JSON.parse(fs.readFileSync(path, "utf8"));
assert.equal(validateDispositionRegistry(current).ok, true, "current disposition registry must pass");

function rejected(mutator, message) {
  const candidate = structuredClone(current);
  mutator(candidate);
  assert.equal(validateDispositionRegistry(candidate).ok, false, message);
}

rejected((value) => { value.signals[1].signalId = value.signals[0].signalId; }, "duplicate signal IDs must fail");
rejected((value) => { value.signals[0].nextTrigger = ""; }, "missing trigger must fail");
rejected((value) => { value.signals[0].reviewBy = null; }, "WATCH without review date must fail");
rejected((value) => { value.signals[0].sourceUrl = "http://unsafe.example"; }, "non-HTTPS source must fail");
rejected((value) => { value.publicationActionTaken = true; }, "intake publication authority must fail");
rejected((value) => { value.signals[0].publishedAt = null; }, "unknown publication date without observation time must fail");

console.log("NEWSSTAND CLOUD INTAKE DISPOSITIONS TEST PASS");
console.log("calibration=duplicate-id,missing-trigger,undated-watch,non-https-source,publication-authority,undated-unobserved-page-change rejected");
