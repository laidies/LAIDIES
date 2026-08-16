#!/usr/bin/env node

import { spawnSync } from "node:child_process";

function run(asOf) {
  return spawnSync(process.execPath, [
    "scripts/check-content-freshness.mjs",
    "--claim-prefix", "CLM-LIB-AIF-",
    "--as-of", asOf,
    "--strict",
  ], { cwd: process.cwd(), encoding: "utf8" });
}

const current = run("2026-08-16");
if (current.status !== 0 || !/CONTENT FRESHNESS PASS/.test(current.stdout)) {
  throw new Error(`current book freshness scope must pass\n${current.stdout}\n${current.stderr}`);
}

const expired = run("2028-01-01");
if (expired.status !== 2 || !/CONTENT FRESHNESS HOLD/.test(expired.stdout)) {
  throw new Error(`expired book freshness scope must fail closed\n${expired.stdout}\n${expired.stderr}`);
}

console.log("AI FUNDAMENTALS FRESHNESS CALIBRATION PASS current=PASS expired=HOLD");
