#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { evaluateCandidate } from "./evaluate-newsstand-autopublish.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const operationsDirectory = path.resolve(scriptDirectory, "../operations");
const fixtureDirectory = path.join(
  operationsDirectory,
  "test-fixtures/newsstand-autopublish",
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const policy = readJson(
  path.join(operationsDirectory, "newsstand-autopublish-policy.json"),
);

const cases = [
  ["routine-daily-brief.json", "WOULD_AUTO_PUBLISH"],
  ["daily-without-explanation.json", "REJECT"],
  ["explained-filler.json", "REJECT"],
  ["sensational-claim-corrected.json", "WOULD_AUTO_PUBLISH"],
  ["sensational-claim-amplified.json", "REJECT"],
  ["claude-opus-5-release.json", "HOLD"],
  ["shallow-model-release.json", "REJECT"],
  ["routine-product-update.json", "WOULD_AUTO_PUBLISH"],
  ["openai-hugging-face-incident.json", "HOLD"],
  ["bad-missing-source.json", "REJECT"],
];

for (const [fixtureName, expectedVerdict] of cases) {
  const candidate = readJson(path.join(fixtureDirectory, fixtureName));
  const result = evaluateCandidate(candidate, policy);
  assert.equal(
    result.verdict,
    expectedVerdict,
    `${fixtureName}: expected ${expectedVerdict}, received ${result.verdict}`,
  );
  assert.equal(
    result.publishActionTaken,
    false,
    `${fixtureName}: evaluator must never publish`,
  );
  console.log(`PASS ${fixtureName}: ${result.verdict}`);
}

const incident = readJson(
  path.join(fixtureDirectory, "openai-hugging-face-incident.json"),
);
const incidentResult = evaluateCandidate(incident, policy);
assert.ok(
  incidentResult.holdReasons.includes("hard_hold_topic:cybersecurity"),
  "The OpenAI/Hugging Face fixture must be held for cybersecurity risk.",
);
assert.ok(
  incidentResult.holdReasons.includes("hold_signal:disputed_facts"),
  "The OpenAI/Hugging Face fixture must be held when facts are disputed.",
);

const unexplainedDaily = readJson(
  path.join(fixtureDirectory, "daily-without-explanation.json"),
);
const unexplainedDailyResult = evaluateCandidate(unexplainedDaily, policy);
assert.ok(
  unexplainedDailyResult.rejectReasons.includes(
    "required_check_failed:readerExplanationComplete",
  ),
  "A DAILY item without reader explanation must be rejected.",
);

const explainedFiller = readJson(
  path.join(fixtureDirectory, "explained-filler.json"),
);
const explainedFillerResult = evaluateCandidate(explainedFiller, policy);
assert.ok(
  explainedFillerResult.rejectReasons.some((reason) =>
    reason.startsWith("quality_floor_failed:"),
  ),
  "A sourced and explained but low-value DAILY item must be rejected.",
);

const amplifiedClaim = readJson(
  path.join(fixtureDirectory, "sensational-claim-amplified.json"),
);
const amplifiedClaimResult = evaluateCandidate(amplifiedClaim, policy);
assert.ok(
  amplifiedClaimResult.rejectReasons.includes(
    "required_check_failed:sensationalFramingNeutralized",
  ),
  "A sensational claim must be rejected when its correction does not neutralize it.",
);

const shallowRelease = readJson(
  path.join(fixtureDirectory, "shallow-model-release.json"),
);
const shallowReleaseResult = evaluateCandidate(shallowRelease, policy);
assert.ok(
  shallowReleaseResult.rejectReasons.includes(
    "required_check_failed:releaseDetailsComplete",
  ),
  "A model release without decision-useful release details must be rejected.",
);

console.log("All Newsstand auto-publish policy tests passed.");
