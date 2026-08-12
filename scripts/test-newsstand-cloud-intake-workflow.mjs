import assert from "node:assert/strict";
import fs from "node:fs";

const text = fs.readFileSync(new URL("../.github/workflows/newsstand-cloud-intake.yml", import.meta.url), "utf8");
for (const required of [
  "schedule:",
  "30 16,23 * * *",
  "issues: write",
  "actions/cache/restore@v4",
  "actions/cache/save@v4",
  "run-newsstand-cloud-intake.mjs",
  "test-newsstand-cloud-intake.mjs",
  "upsert-newsstand-intake-issue.mjs",
  "actions/upload-artifact@v4"
]) assert.ok(text.includes(required), `workflow missing ${required}`);
for (const forbidden of ["wrangler", "pages deploy", "ANTHROPIC_API_KEY", "OPENAI_API_KEY", "content/newsstand-stories.js"]) {
  assert.ok(!text.includes(forbidden), `private intake workflow contains forbidden ${forbidden}`);
}
assert.match(text, /retention-days:\s*30/);
console.log("NEWSSTAND CLOUD INTAKE WORKFLOW TEST PASS");
console.log("calibration=deployment-command,model-secret,canonical-story-write rejected");
