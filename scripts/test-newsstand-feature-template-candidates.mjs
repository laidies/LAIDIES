#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectNewsstandTemplateCandidates } from "./check-newsstand-feature-template-candidates.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, "operations/product-stewards/newsstand/NEWSSTAND-FEATURE-TEMPLATE-CANDIDATES.json"), "utf8"));
const valid = inspectNewsstandTemplateCandidates(registry, { root: ROOT });
assert.deepEqual(valid.errors, []);
assert.equal(valid.totalSlots, 17);
assert.equal(valid.candidateSlots.length, 5);
assert.deepEqual(valid.acceptedSlots, []);

const missingSlot = structuredClone(registry);
missingSlot.missingTemplateSlots.pop();
assert.match(inspectNewsstandTemplateCandidates(missingSlot, { root: ROOT }).errors.join("\n"), /cover exactly all 17 slots/);

const wrongSequence = structuredClone(registry);
wrongSequence.templates[0].outputSequence.reverse();
assert.match(inspectNewsstandTemplateCandidates(wrongSequence, { root: ROOT }).errors.join("\n"), /outputSequence/);

const wrongExample = structuredClone(registry);
wrongExample.templates[1].candidateExample.sha256 = "0".repeat(64);
assert.match(inspectNewsstandTemplateCandidates(wrongExample, { root: ROOT }).errors.join("\n"), /candidateExample SHA-256 mismatch/);

const publicCandidate = structuredClone(registry);
publicCandidate.templates[2].publicAuthority = true;
assert.match(inspectNewsstandTemplateCandidates(publicCandidate, { root: ROOT }).errors.join("\n"), /cannot carry public authority/);

const falseAccepted = structuredClone(registry);
falseAccepted.templates[3].status = "ACCEPTED_TEMPLATE";
falseAccepted.templates[3].autonomousDraftingAuthority = true;
falseAccepted.acceptedTemplateSlots = ["promptoscope.DEFAULT"];
falseAccepted.status = "PARTIAL_5_OF_17_CANDIDATE_TEMPLATES_1_ACCEPTED";
assert.match(inspectNewsstandTemplateCandidates(falseAccepted, { root: ROOT }).errors.join("\n"), /acceptanceRecord/);

const missingInput = structuredClone(registry);
missingInput.templates[4].requiredInputs = ["one input"];
assert.match(inspectNewsstandTemplateCandidates(missingInput, { root: ROOT }).errors.join("\n"), /requiredInputs/);

console.log("NEWSSTAND FEATURE TEMPLATE CALIBRATION PASS: five complete Daily candidates validated; missing-slot, changed-sequence, changed-example, public-authority, false-acceptance and thin-input defects rejected");
