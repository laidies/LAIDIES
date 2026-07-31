import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  CONTEXT_NAV_DISTRIBUTION_ID,
  CONTEXT_NAV_PUBLIC_SRC,
  CONTEXT_NAV_SOURCE_PATH,
  CONTEXT_NAV_SOURCE_SHA256,
  contextNavigationTags,
  distributeContextNavigation,
} from "../../../../../scripts/lib/context-navigation-distribution-v1.mjs";

const root = process.cwd();
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const output = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-nav-distribution-v1-"));

const build = spawnSync(
  process.execPath,
  ["scripts/build-public-site.mjs", output],
  { cwd: root, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
);
assert.equal(
  build.status,
  0,
  `curated build failed\n${build.stdout}\n${build.stderr}`
);

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const absolute = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(absolute) : [absolute];
});
const htmlArtifacts = walk(output).filter((file) => file.endsWith(".html"));
assert.ok(htmlArtifacts.length > 18, "distribution must exceed the predecessor's 18 source loaders");
const htmlInventory = htmlArtifacts
  .map((file) => path.relative(output, file).split(path.sep).join("/"))
  .sort();
const inventorySha256 = sha256(JSON.stringify(htmlInventory));
assert.equal(
  inventorySha256,
  "cc99d6d5f9b497d69244dd6dbc35f6ebdf8926a5214e27b85f81bbdf998e786c",
  "curated HTML inventory changed and requires a successor receipt"
);

let priorSourceLoaders = 0;
let orderedPages = 0;
for (const artifactPath of htmlArtifacts) {
  const relative = path.relative(output, artifactPath).split(path.sep).join("/");
  const sourcePath = path.join(root, relative);
  assert.ok(fs.existsSync(sourcePath), `curated HTML has no source counterpart: ${relative}`);
  const source = fs.readFileSync(sourcePath, "utf8");
  const artifact = fs.readFileSync(artifactPath, "utf8");
  const sourceMounts = contextNavigationTags(source);
  priorSourceLoaders += sourceMounts.length;

  assert.equal(
    artifact,
    distributeContextNavigation(relative, source),
    `artifact must be the deterministic source transform: ${relative}`
  );
  assert.equal(contextNavigationTags(artifact).length, 1, `exactly one mount: ${relative}`);
  assert.ok(
    artifact.includes(`src="${CONTEXT_NAV_PUBLIC_SRC}"`),
    `source-derived version key required: ${relative}`
  );

  const orderedPattern =
    /<(?:a|button)\b[^>]*>(?:(?!<\/(?:a|button)>)[\s\S])*\b(?:Previous|Next)\b(?:(?!<\/(?:a|button)>)[\s\S])*<\/(?:a|button)>/gi;
  const sourceOrdered = source.match(orderedPattern) || [];
  const artifactOrdered = artifact.match(orderedPattern) || [];
  assert.deepEqual(
    artifactOrdered,
    sourceOrdered,
    `ordered Previous/Next controls changed: ${relative}`
  );
  if (sourceOrdered.length) orderedPages += 1;
}

assert.equal(priorSourceLoaders, 18, "predecessor source-loader baseline changed");
assert.ok(orderedPages > 0, "at least one curated ordered experience must be protected");
assert.equal(
  sha256(fs.readFileSync(path.join(root, CONTEXT_NAV_SOURCE_PATH))),
  CONTEXT_NAV_SOURCE_SHA256,
  "bound context-navigation candidate changed"
);

const builderPath = path.join(root, "scripts/build-public-site.mjs");
const currentBuilder = fs.readFileSync(builderPath, "utf8");
const predecessorBuilder = currentBuilder
  .replace(
    `\nimport {\n  CONTEXT_NAV_SOURCE_PATH,\n  CONTEXT_NAV_SOURCE_SHA256,\n  distributeContextNavigation,\n} from './lib/context-navigation-distribution-v1.mjs';`,
    ""
  )
  .replace(
    `\nconst contextNavBytes = fs.readFileSync(path.join(root, CONTEXT_NAV_SOURCE_PATH));\n` +
    `if (sha256(contextNavBytes) !== CONTEXT_NAV_SOURCE_SHA256) {\n` +
    `  throw new Error(\`Context navigation source hash mismatch: \${CONTEXT_NAV_SOURCE_PATH}\`);\n` +
    `}\n`,
    ""
  )
  .replace(
    "  if (!edition) return distributeContextNavigation(relative, source);",
    "  if (!edition) return source;"
  )
  .replace(
    "  return distributeContextNavigation(relative, outputSource);",
    "  return outputSource;"
  );
assert.equal(
  sha256(predecessorBuilder),
  "b10adb9ec919d38f0035d83794dba9f5d524876adfd4a38cf6b398bd5f49ce6f",
  "inverse rollback must recover the exact predecessor builder"
);

const single = "<html><body><main>One</main></body></html>";
const distributed = distributeContextNavigation("fixture.html", single);
assert.equal(
  distributeContextNavigation("fixture.html", distributed),
  distributed,
  "distribution must be idempotent"
);
assert.throws(
  () => distributeContextNavigation(
    "duplicate.html",
    `<html><body>${contextNavigationTags(distributed)[0]}${contextNavigationTags(distributed)[0]}</body></html>`
  ),
  /duplicate source mounts rejected/
);
assert.throws(
  () => distributeContextNavigation("malformed.html", "<html><main>No body close</main>"),
  /requires <\/body>/
);

const report = JSON.parse(fs.readFileSync(path.join(output, "build-report.json"), "utf8"));
assert.equal(report.missing.length, 0);
assert.equal(report.oversized.length, 0);

console.log(
  `CONTEXT NAV DISTRIBUTION PASS id=${CONTEXT_NAV_DISTRIBUTION_ID}` +
  ` html=${htmlArtifacts.length} predecessor_loaders=${priorSourceLoaders}` +
  ` inventory_sha256=${inventorySha256}` +
  ` ordered_pages=${orderedPages} duplicate_reject=1 idempotency=1 rollback=PASS`
);
fs.rmSync(output, { recursive: true });
