#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const file = process.env.LAIDIES_TASK_BUDGETS_PATH || path.join(root, "operations/runtime/task-budgets.json");
const taskClass = process.argv[2];
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const required = ["input_tokens", "output_tokens", "wall_minutes", "escalate_when"];
for (const [name, budget] of Object.entries(data.classes || {})) {
  for (const key of required) if (!(key in budget)) throw new Error(`${name} missing ${key}`);
  if (![budget.input_tokens, budget.output_tokens, budget.wall_minutes].every(Number.isFinite)) throw new Error(`${name} has invalid numeric budget`);
}
if (!taskClass || !data.classes?.[taskClass]) {
  console.error(`TASK BUDGET BLOCKED unknown_class=${taskClass || "missing"}`);
  process.exit(1);
}
console.log(JSON.stringify({ task_class: taskClass, ...data.classes[taskClass], rule: data.rule }, null, 2));
