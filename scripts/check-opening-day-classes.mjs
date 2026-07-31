#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const manifestPath = path.join(
  root,
  "operations/classes/opening-day-class-catalogue-2026-07-31.json",
);

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(manifestPath)) {
  fail(`missing manifest ${manifestPath}`);
} else {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const expectedIds = ["ODC-101", "ODC-201", "ODC-LAB-01"];
  const classes = Array.isArray(manifest.classes) ? manifest.classes : [];

  if (manifest.status !== "BUILDING") fail("manifest must remain BUILDING until all acceptance evidence exists");
  if (classes.length !== 3) fail(`expected exactly 3 opening-day classes, found ${classes.length}`);

  const ids = classes.map((item) => item.id);
  for (const id of expectedIds) {
    if (!ids.includes(id)) fail(`missing opening-day class ${id}`);
  }

  const requiredFields = [
    "public_title",
    "level",
    "visitor_job",
    "current_truth",
    "opening_day_connections",
    "remaining_work",
    "ready_when",
  ];

  for (const item of classes) {
    for (const field of requiredFields) {
      const value = item[field];
      if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) {
        fail(`${item.id || "unknown class"} has no ${field}`);
      }
    }

    if (!Array.isArray(item.source_files) || item.source_files.length === 0) {
      fail(`${item.id} has no source files`);
      continue;
    }
    for (const source of item.source_files) {
      if (!fs.existsSync(path.join(root, source))) fail(`${item.id} source does not exist: ${source}`);
    }
  }

  const componentCount = Array.isArray(manifest.required_class_components)
    ? manifest.required_class_components.length
    : 0;
  if (componentCount < 10) fail(`class contract is too shallow: ${componentCount} required components`);

  const rewardFields = manifest.reward_boundary?.required_event_fields;
  if (!Array.isArray(rewardFields) || !rewardFields.includes("event_id") || !rewardFields.includes("class_version")) {
    fail("reward completion event is not versioned and idempotent");
  }

  const levels = new Set(classes.map((item) => item.level));
  for (const level of ["entry", "working", "judgement"]) {
    if (!levels.has(level)) fail(`missing ${level} experience level`);
  }

  if (!process.exitCode) {
    console.log("PASS: opening-day class catalogue");
    console.log(`- ${classes.length} complete class contracts`);
    console.log(`- levels: ${[...levels].join(", ")}`);
    console.log(`- ${componentCount} required experience components per release contract`);
    console.log("- every declared source file exists");
    console.log("- completion event boundary is versioned and idempotent");
  }
}
