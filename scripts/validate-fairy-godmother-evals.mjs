#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.resolve(
  scriptDirectory,
  "../operations/test-fixtures/fairy-godmother/p0-evaluation-set.json",
);

const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

const allowedDomains = new Set([
  "ai",
  "work_career",
  "everyday_life",
  "out_of_scope",
  "unclear",
]);
const allowedTasks = new Set([
  "draft_or_rewrite",
  "explain",
  "advice_or_conversation",
  "decision_or_plan",
  "current_fact_or_research",
  "ai_troubleshoot",
  "evaluate_ai_output",
  "creative_or_brainstorm",
  "needs_clarification",
  "boundary",
]);
const allowedRisks = new Set([
  "ordinary",
  "sensitive",
  "high_stakes_boundary",
  "dangerous_or_abusive",
]);
const allowedResponseTypes = new Set([
  "case_success",
  "needs_information",
  "needs_verified_information",
  "boundary_response",
  "input_invalid",
  "input_too_large",
  "rate_limited",
  "service_error",
  "revision_success",
]);
const allowedRetrieval = new Set([
  "not_required",
  "required",
  "conditional",
  "required_but_unavailable",
  "required_for_local_resources",
]);
const allowedPlayOutcomes = new Set([
  "spent",
  "not_spent",
  "released",
  "refunded",
  "included_fitting",
]);

assert.equal(fixture.version, "1.0.0", "Unexpected fixture version.");
assert.ok(Array.isArray(fixture.scoreDimensions), "scoreDimensions must be an array.");
assert.ok(fixture.scoreDimensions.length >= 10, "The scorecard is incomplete.");
assert.ok(Array.isArray(fixture.hardFailures), "hardFailures must be an array.");
assert.ok(fixture.hardFailures.length >= 8, "The hard-failure gate is incomplete.");
assert.ok(Array.isArray(fixture.cases), "cases must be an array.");
assert.ok(fixture.cases.length >= 40, "P0 requires at least 40 varied cases.");

const ids = new Set();
const categoryCounts = new Map();
const domainCounts = new Map();
const responseCounts = new Map();

for (const testCase of fixture.cases) {
  assert.equal(typeof testCase.id, "string", "Every case needs a string id.");
  assert.match(
    testCase.id,
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    `${testCase.id}: id must be kebab-case.`,
  );
  assert.ok(!ids.has(testCase.id), `${testCase.id}: duplicate case id.`);
  ids.add(testCase.id);

  assert.equal(
    typeof testCase.category,
    "string",
    `${testCase.id}: category must be a string.`,
  );
  assert.ok(testCase.category.trim(), `${testCase.id}: category cannot be empty.`);
  assert.equal(
    typeof testCase.prompt,
    "string",
    `${testCase.id}: prompt must be a string.`,
  );
  assert.ok(testCase.prompt.trim(), `${testCase.id}: prompt cannot be empty.`);
  assert.equal(
    typeof testCase.energy,
    "string",
    `${testCase.id}: energy must be a string.`,
  );

  const expected = testCase.expected;
  assert.ok(expected && typeof expected === "object", `${testCase.id}: expected is required.`);
  assert.ok(
    allowedDomains.has(expected.domain),
    `${testCase.id}: invalid expected domain ${expected.domain}.`,
  );
  assert.ok(
    allowedTasks.has(expected.task),
    `${testCase.id}: invalid expected task ${expected.task}.`,
  );
  assert.ok(
    allowedRisks.has(expected.risk),
    `${testCase.id}: invalid expected risk ${expected.risk}.`,
  );
  assert.ok(
    allowedResponseTypes.has(expected.responseType),
    `${testCase.id}: invalid response type ${expected.responseType}.`,
  );
  assert.ok(
    allowedRetrieval.has(expected.retrieval),
    `${testCase.id}: invalid retrieval value ${expected.retrieval}.`,
  );
  assert.ok(
    allowedPlayOutcomes.has(expected.playOutcome),
    `${testCase.id}: invalid Play outcome ${expected.playOutcome}.`,
  );
  assert.ok(
    Array.isArray(expected.mustDo) && expected.mustDo.length >= 3,
    `${testCase.id}: expected.mustDo needs at least three checks.`,
  );
  assert.ok(
    Array.isArray(expected.mustNotDo) && expected.mustNotDo.length >= 3,
    `${testCase.id}: expected.mustNotDo needs at least three checks.`,
  );
  assert.equal(
    typeof expected.tone,
    "string",
    `${testCase.id}: expected.tone must be a string.`,
  );
  assert.equal(
    expected.energyInvariant,
    true,
    `${testCase.id}: facts, route and safety must be invariant across energies.`,
  );

  if (expected.responseType === "boundary_response") {
    assert.ok(
      ["not_spent", "released"].includes(expected.playOutcome),
      `${testCase.id}: a boundary response cannot spend a Play.`,
    );
  }
  if (
    ["needs_information", "needs_verified_information"].includes(
      expected.responseType,
    )
  ) {
    assert.equal(
      expected.playOutcome,
      "not_spent",
      `${testCase.id}: an incomplete case cannot spend a Play.`,
    );
  }
  if (["rate_limited", "service_error"].includes(expected.responseType)) {
    assert.ok(
      ["released", "refunded"].includes(expected.playOutcome),
      `${testCase.id}: a service failure must release or refund a Play.`,
    );
  }
  if (
    expected.task === "current_fact_or_research" &&
    expected.responseType === "case_success"
  ) {
    assert.equal(
      expected.retrieval,
      "required",
      `${testCase.id}: a current-fact success must require retrieval.`,
    );
  }
  if (expected.responseType === "revision_success") {
    assert.equal(
      expected.playOutcome,
      "included_fitting",
      `${testCase.id}: a fitting cannot create a second spend.`,
    );
  }

  categoryCounts.set(
    testCase.category,
    (categoryCounts.get(testCase.category) ?? 0) + 1,
  );
  domainCounts.set(
    expected.domain,
    (domainCounts.get(expected.domain) ?? 0) + 1,
  );
  responseCounts.set(
    expected.responseType,
    (responseCounts.get(expected.responseType) ?? 0) + 1,
  );
}

const requiredCategoryPrefixes = [
  "ai_",
  "work",
  "career",
  "life_",
  "ambiguous_",
  "privacy_",
  "boundary_",
  "adversarial",
  "revision",
  "service_",
];
for (const prefix of requiredCategoryPrefixes) {
  assert.ok(
    [...categoryCounts.keys()].some((category) => category.startsWith(prefix)),
    `Missing required category family: ${prefix}`,
  );
}

assert.ok(
  (domainCounts.get("ai") ?? 0) >= 10,
  "The suite needs at least 10 AI-domain cases.",
);
assert.ok(
  (domainCounts.get("work_career") ?? 0) >= 12,
  "The suite needs at least 12 work/career cases.",
);
assert.ok(
  (domainCounts.get("everyday_life") ?? 0) >= 6,
  "The suite needs at least 6 everyday-life cases.",
);
assert.ok(
  (domainCounts.get("out_of_scope") ?? 0) >= 5,
  "The suite needs at least 5 out-of-scope cases.",
);
assert.ok(
  (responseCounts.get("service_error") ?? 0) >= 2,
  "The suite needs at least 2 service-error cases.",
);
assert.ok(
  (responseCounts.get("needs_information") ?? 0) >= 5,
  "The suite needs at least 5 missing-information cases.",
);

console.log(`PASS ${path.relative(process.cwd(), fixturePath)}`);
console.log(`Cases: ${fixture.cases.length}`);
console.log(
  `Domains: ${[...domainCounts.entries()]
    .map(([name, count]) => `${name}=${count}`)
    .join(", ")}`,
);
console.log(
  `Responses: ${[...responseCounts.entries()]
    .map(([name, count]) => `${name}=${count}`)
    .join(", ")}`,
);
console.log("FAiRY Godmother evaluation fixture integrity passed.");

