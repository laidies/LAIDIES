import assert from "node:assert/strict";
import test from "node:test";

import { missingMaterialQuestion } from "../src/clarification.js";

test("beta clarification asks for the omitted material instead of generic work context", () => {
  for (const prompt of [
    "What does the sentence in the contract mean?",
    "Can you help me understand this invoice?",
    "Please explain the document."
  ]) assert.match(missingMaterialQuestion(prompt), /paste or describe the exact material/i);
  assert.equal(missingMaterialQuestion("What should I do about the situation?"), null);
});
