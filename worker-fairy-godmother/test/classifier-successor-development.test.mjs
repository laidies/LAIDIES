import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { validateDevelopmentSet } from "../harness/classifier-successor-development.mjs";

const development = JSON.parse(fs.readFileSync(new URL(
  "../../operations/test-fixtures/fairy-godmother/classifier-successor-development-2026-08-31.json",
  import.meta.url
)));
const frozen = JSON.parse(fs.readFileSync(new URL(
  "../../operations/test-fixtures/fairy-godmother/held-out-classifier-adversarial-2026-07-25.json",
  import.meta.url
)));

test("the successor development set is separate, complete and explicitly non-admissive", () => {
  assert.equal(validateDevelopmentSet(development, frozen), true);
});

test("the development gate rejects duplicate prompts and missing risk-family coverage", () => {
  const duplicate = structuredClone(development);
  duplicate.cases[1].prompt = duplicate.cases[0].prompt;
  assert.throws(() => validateDevelopmentSet(duplicate, frozen),
    /development_case_identity_or_lineage_invalid/);

  const missingFamily = structuredClone(development);
  missingFamily.cases[0].family = "replacement_without_required_coverage";
  assert.throws(() => validateDevelopmentSet(missingFamily, frozen),
    /development_family_coverage_invalid/);
});
