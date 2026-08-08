#!/usr/bin/env node
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
const good = spawnSync(process.execPath, ["scripts/check-task-budget.mjs", "independent_judgment"], { encoding: "utf8" });
assert.equal(good.status, 0);
assert.match(good.stdout, /"input_tokens": 30000/);
const bad = spawnSync(process.execPath, ["scripts/check-task-budget.mjs", "invented"], { encoding: "utf8" });
assert.equal(bad.status, 1);
assert.match(bad.stderr, /unknown_class=invented/);
console.log("TASK BUDGET CALIBRATION PASS known=resolved unknown=blocked");
