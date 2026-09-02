#!/usr/bin/env node
import assert from "node:assert/strict";
import { REQUIRED_USEFUL_DESKS, requiredUsefulDeskErrors } from "./newsstand-required-service-desks.mjs";

const ready = REQUIRED_USEFUL_DESKS.map(type => ({ type, state: "ready", recordId: `record-${type}` }));
assert.deepEqual(requiredUsefulDeskErrors(ready, "2026-09-02"), []);
assert.deepEqual(requiredUsefulDeskErrors(ready, "2026-09-01"), [], "historical issues are not rewritten");
for (const type of REQUIRED_USEFUL_DESKS) {
  const empty = ready.map(desk => desk.type === type ? { type, state: "empty", recordId: null } : desk);
  assert.match(requiredUsefulDeskErrors(empty, "2026-09-02").join("\n"), new RegExp(`${type} to be ready`));
}
assert.match(requiredUsefulDeskErrors(ready.filter(desk => desk.type !== "career_life"), "2026-09-02").join("\n"), /exactly one career_life/);
assert.match(requiredUsefulDeskErrors([...ready, ready[0]], "2026-09-02").join("\n"), /exactly one dear_miss_jeeves/);
assert.deepEqual(requiredUsefulDeskErrors([...ready, { type: "crossword", state: "empty" }], "2026-09-02"), [], "optional desks may remain empty");
console.log("NEWSSTAND REQUIRED SERVICE DESKS PASS four permanent cards enforced");
