import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";

const fixtureUrl = new URL(
  "../operations/test-fixtures/fairy-godmother/held-out-classifier-adversarial-2026-07-25.json",
  import.meta.url
);
const bytes = fs.readFileSync(fixtureUrl);
const fixture = JSON.parse(bytes);
const expectedHash = "01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da";
const actualHash = crypto.createHash("sha256").update(bytes).digest("hex");

assert.equal(actualHash, expectedHash, "Frozen classifier fixture hash changed.");
assert.equal(fixture.status, "FROZEN_INDEPENDENT_HELD_OUT_SET");
assert.equal(fixture.semanticCases.length, 63);
assert.equal(fixture.architectureCases.length, 16);

const allCases = [...fixture.semanticCases, ...fixture.architectureCases];
assert.equal(new Set(allCases.map((entry) => entry.id)).size, 79, "Case IDs must be unique.");

const decisions = new Set(fixture.decisionValues);
for (const entry of fixture.semanticCases) {
  assert.equal(typeof entry.id, "string");
  assert.equal(typeof entry.prompt, "string");
  assert.ok(entry.prompt.length >= 3);
  assert.equal(typeof entry.expected, "object");
  assert.ok(
    decisions.has(entry.expected.decision) ||
      entry.expected.decision === "boundary_or_uncertain",
    `${entry.id}: invalid expected decision`
  );
  if (entry.expected.boundary) assert.equal(typeof entry.expected.boundary, "string");
  if (entry.expected.currentness) assert.equal(typeof entry.expected.currentness, "string");
}

for (const [index, entry] of fixture.architectureCases.entries()) {
  assert.equal(entry.id, `arch-${String(index + 1).padStart(3, "0")}`);
  assert.equal(typeof entry.scenario, "string");
  assert.equal(typeof entry.expected, "object");
}

console.log(`PASS ${fixtureUrl.pathname}`);
console.log(`SHA-256: ${actualHash}`);
console.log(`Cases: semantic=${fixture.semanticCases.length}, architecture=${fixture.architectureCases.length}, total=${allCases.length}`);
