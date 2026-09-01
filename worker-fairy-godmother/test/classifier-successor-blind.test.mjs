import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import test from "node:test";

import { CLASSIFIER_SYSTEM_PROMPT } from "../src/index.js";

const root = new URL("../../", import.meta.url);
const blind = new URL(
  "operations/test-fixtures/fairy-godmother/classifier-successor-blind-2026-08-31/",
  root
);
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");

function read(relative) {
  return fs.readFileSync(new URL(relative, blind));
}

function verifyFrozenBlindSet(overrides = {}) {
  const manifestBytes = overrides.manifestBytes ?? read("manifest.json");
  const privateBytes = overrides.privateBytes ?? read("private-expected.json");
  const sendBytes = overrides.sendBytes ?? read("send-cases.jsonl");
  const binding = JSON.parse(read("candidate-binding.json"));
  const manifest = JSON.parse(manifestBytes);
  const expected = JSON.parse(privateBytes);
  const rows = String(sendBytes).trim().split(/\r?\n/).map(JSON.parse);
  assert.equal(manifest.status, "FROZEN");
  assert.equal(manifest.caseCount, 63);
  assert.equal(manifest.labelsExcludedFromSend, true);
  assert.equal(sha256(privateBytes), manifest.privateExpected.sha256);
  assert.equal(sha256(sendBytes), manifest.sendCases.sha256);
  assert.equal(sha256(manifestBytes), binding.blindSet.manifestSha256);
  assert.equal(sha256(privateBytes), binding.blindSet.privateExpectedSha256);
  assert.equal(sha256(sendBytes), binding.blindSet.sendCasesSha256);
  assert.equal(sha256(CLASSIFIER_SYSTEM_PROMPT), binding.candidate.classifierPromptSha256);
  for (const [pathKey, hashKey] of [
    ["workerSourcePath", "workerSourceSha256"],
    ["historicalHarnessPath", "historicalHarnessSha256"],
    ["developmentSetPath", "developmentSetSha256"]
  ]) assert.equal(sha256(fs.readFileSync(new URL(binding.candidate[pathKey], root))),
    binding.candidate[hashKey]);
  assert.equal(expected.cases.length, 63);
  assert.equal(rows.length, 63);
  const privateIds = new Set(expected.cases.map((entry) => entry.id));
  const sendIds = new Set(rows.map((entry) => entry.id));
  assert.equal(privateIds.size, 63);
  assert.equal(sendIds.size, 63);
  assert.deepEqual([...privateIds].sort(), [...sendIds].sort());
  for (const row of rows) assert.deepEqual(Object.keys(row).sort(), ["id", "prompt"]);
  return true;
}

test("the independently authored successor blind set binds exact candidate and label-free rows", () => {
  assert.equal(verifyFrozenBlindSet(), true);
});

test("the blind-set gate rejects a one-byte send mutation", () => {
  const knownBad = Buffer.concat([read("send-cases.jsonl"), Buffer.from(" ")]);
  assert.throws(() => verifyFrozenBlindSet({ sendBytes: knownBad }));
});
