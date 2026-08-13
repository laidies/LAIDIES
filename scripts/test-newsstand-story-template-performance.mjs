#!/usr/bin/env node

import assert from "node:assert/strict";
import { inspectTemplatePerformance, requiredTemplateBeats } from "./check-newsstand-story-template-performance.mjs";

const template = `# Formats

## The Daily — report, announcement or research finding

| Section | Content | Analysis | Delivery | Must not do |
|---|---|---|---|---|
| Headline | Change | Distinction | Factual | Tease |
| The news in one breath | Answer | Audience | Short | Jargon |
| Before today | Context | Minimum | Plain | Assume |
| What actually happened | Sequence | Cause | Concrete | Infer |
| What the evidence found | Results | Units | Attributed | Dump |
| What this does—and does not—mean | Boundary | Calibrate | Contrast | Drama |
| Where you might encounter this | Cases | Transfer | Concrete | Decorate |
| What to do with this | Action | Proportion | Direct | Generic |
| Sources and watch point | Sources | Trigger | Short | Hide |

## Another format
`;

const valid = `# Factual story title

## The news in one breath
Answer.
## Before today
Context.
## What actually happened
Mechanism.
## What the evidence found
Results.
## What this does—and does not—mean
Boundary.
## Where you might encounter this
Cases.
## What to do with this
Action.
## Sources and watch point
[Primary source](https://example.org/source).
`;

const section = "The Daily — report, announcement or research finding";
assert.deepEqual(requiredTemplateBeats(template, section).errors, []);
assert.deepEqual(inspectTemplatePerformance({ templateText: template, sectionName: section, prose: valid }).errors, []);
const missingBoundary = valid.replace("## What this does—and does not—mean\nBoundary.\n", "");
assert.match(inspectTemplatePerformance({ templateText: template, sectionName: section, prose: missingBoundary }).errors.join("\n"), /does—and does not—mean/);
const reordered = valid.replace("## Before today\nContext.\n", "").replace("## What actually happened\nMechanism.\n", "## What actually happened\nMechanism.\n## Before today\nContext.\n");
assert.match(inspectTemplatePerformance({ templateText: template, sectionName: section, prose: reordered }).errors.join("\n"), /What actually happened/);
assert.match(requiredTemplateBeats(template, "Missing format").errors.join("\n"), /section is missing/);
const missingLinks = valid.replace("[Primary source](https://example.org/source).", "Primary source.");
assert.match(inspectTemplatePerformance({ templateText: template, sectionName: section, prose: missingLinks }).errors.join("\n"), /direct reader-facing HTTPS Markdown links/);
const proof = { terminologyPlan: { prohibitedSynonyms: ["same company"] }, draftLimits: { prohibitedPhrases: ["made-up characters"] } };
assert.match(inspectTemplatePerformance({ templateText: template, sectionName: section, prose: `${valid}\nSame company.`, proof }).errors.join("\n"), /prohibited synonym/);
assert.match(inspectTemplatePerformance({ templateText: template, sectionName: section, prose: `${valid}\nMade-up characters.`, proof }).errors.join("\n"), /prohibited phrase/);
console.log("NEWSSTAND STORY TEMPLATE PERFORMANCE CALIBRATION PASS: exact accepted sequence and source links pass; missing, reordered, unlinked-source, prohibited-language and unknown-template cases fail");
