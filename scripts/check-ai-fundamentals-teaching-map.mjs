#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultMap = "operations/product-stewards/library/AI-FUNDAMENTALS-101-V4-SECTION-TEACHING-MAP.json";

export function aiFundamentalsTeachingMapIssues(map) {
  const issues = [];
  const depthStandards = new Set((map?.chapter1DepthBindings || []).map(item => item?.standard).filter(Boolean));
  const contracts = map?.chapter1StandardContracts || [];
  const contractStandards = new Set(contracts.map(item => item?.standard).filter(Boolean));

  for (const standard of depthStandards) {
    if (!contractStandards.has(standard)) issues.push(`Standard example/importance contract missing for ${standard}`);
  }
  for (const standard of contractStandards) {
    if (!depthStandards.has(standard)) issues.push(`Standard contract has no matching taught concept: ${standard}`);
  }
  for (const contract of contracts) {
    if (!contract?.exampleExcerpt?.trim()) issues.push(`Standard example evidence missing for ${contract?.standard || "unnamed concept"}`);
    if (!contract?.whyExcerpt?.trim()) issues.push(`Standard importance evidence missing for ${contract?.standard || "unnamed concept"}`);
  }
  if (contracts.length !== contractStandards.size) issues.push("Standard contracts contain a duplicate concept");
  return issues;
}

function main() {
  const relative = process.argv[2] || defaultMap;
  const map = JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
  const issues = aiFundamentalsTeachingMapIssues(map);
  if (issues.length) {
    console.error("AI FUNDAMENTALS TEACHING MAP FAIL");
    for (const issue of issues) console.error(`- ${issue}`);
    process.exit(1);
  }
  console.log(`AI FUNDAMENTALS TEACHING MAP PASS standard_contracts=${map.chapter1StandardContracts.length}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
