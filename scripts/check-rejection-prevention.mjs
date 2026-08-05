#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { validateRejectionPrevention } from "./lib/rejection-prevention.mjs";

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, "operations/control-room/rejections.json"), "utf8"));
const activeLessons = fs.readFileSync(path.join(root, "operations/LESSONS-ACTIVE.md"), "utf8");
const mediaFixtures = JSON.parse(fs.readFileSync(path.join(root, "operations/evals/media-defect-fixtures.json"), "utf8"));
const errors = validateRejectionPrevention({ registry, activeLessons, mediaFixtures });

if (errors.length) {
  console.error("REJECTION PREVENTION FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("REJECTION PREVENTION PASS");
console.log(`rejections=${registry.rejections.length}`);
