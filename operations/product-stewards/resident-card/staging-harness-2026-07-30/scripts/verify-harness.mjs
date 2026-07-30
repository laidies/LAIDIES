import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const harness = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repo = resolve(harness, "../../../..");
const manifest = readFileSync(resolve(harness, "migrations.sha256"), "utf8")
  .trim().split("\n").filter(Boolean);
assert.equal(manifest.length, 11, "exactly eleven release-chain migrations are pinned");
for (const row of manifest) {
  const [expected, relative] = row.split(/\s{2,}/);
  const absolute = resolve(repo, relative);
  assert.ok(existsSync(absolute), `missing ${relative}`);
  const actual = createHash("sha256").update(readFileSync(absolute)).digest("hex");
  assert.equal(actual, expected, `source drift in ${relative}`);
}
const config = readFileSync(resolve(harness, "supabase/config.toml"), "utf8");
for (const expected of ["127.0.0.1", "port = 55321", "port = 55324", "enable_confirmations = true"]) {
  assert.match(config, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}
for (const script of ["bootstrap-local.sh", "start-local.sh", "cleanup-local.sh"]) {
  const body = readFileSync(resolve(harness, "scripts", script), "utf8");
  assert.doesNotMatch(body, /supabase\s+link|--project-ref|access[_ -]?token/i, `${script} must remain local-only`);
}
console.log("RESIDENT STAGING HARNESS STATIC VERIFICATION PASS");
