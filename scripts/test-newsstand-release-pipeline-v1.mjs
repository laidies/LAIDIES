#!/usr/bin/env node
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compileDryRun, canonicalJson, objectSha, parseJsonRejectingRecursiveDuplicates, sha256 } from "./newsstand-release-pipeline-v1.mjs";

const now = "2026-07-28T20:00:00Z";
const maker = "newsstand-candidate-maker";
const sourceReceipts = [
  { receiptId: "src-primary", sourceUrl: "https://example.test/primary", sourceBytesSha256: "a".repeat(64), retrievedAt: "2026-07-28T19:00:00Z", recordedBy: "source-receipts-reviewer", independent: true },
  { receiptId: "src-independent", sourceUrl: "https://example.test/independent", sourceBytesSha256: "b".repeat(64), retrievedAt: "2026-07-28T19:30:00Z", recordedBy: "source-receipts-reviewer", independent: true }
];
const bindings = [{ claimId: "claim-1", claimTextSha256: sha256("The tested claim."), sourceReceiptIds: ["src-primary", "src-independent"] }];
const candidate = (action, extra = {}) => ({ schemaVersion: "1.0.0", candidateId: `candidate-${action}`, storyKey: "fixture-story", action, title: `Fixture ${action}`, body: "The tested claim.", claimIds: ["claim-1"], sourceReceiptIds: ["src-primary", "src-independent"], claimBindingSha256: objectSha(bindings), evaluationAt: now, ...extra });
const decision = (raw) => ({ decisionId: `decision-${sha256(raw).slice(0, 8)}`, candidateSha256: sha256(raw), schemaSha256: sha256(fs.readFileSync(new URL("../operations/product-stewards/newsstand/release-pipeline-v1/schema.json", import.meta.url))), reviewedBy: "independent-release-reviewer", reviewerRole: "release judge", decision: "APPROVE_CANONICAL_DRY_RUN", reviewedAt: now });
const compile = (input, previous = {}) => {
  const candidateRaw = canonicalJson(input); const sourceReceiptsRaw = canonicalJson(sourceReceipts); const claimBindingsRaw = canonicalJson(bindings); const decisionRaw = canonicalJson(decision(candidateRaw));
  return compileDryRun({ candidateRaw, sourceReceiptsRaw, claimBindingsRaw, decisionRaw, maker, ...previous });
};

assert.throws(() => parseJsonRejectingRecursiveDuplicates('{"outer":{"x":1,"\\u0078":2}}'), /duplicate_json_key:x/, "recursive escaped duplicate must reject");
assert.throws(() => compile({ ...candidate("publish"), ignored: true }), /schema drift/, "unknown candidate key must reject");
assert.throws(() => compile({ ...candidate("publish"), claimBindingSha256: "0".repeat(64) }), /checksum mismatch/, "claim checksum drift must reject");
assert.throws(() => compile({ ...candidate("publish"), sourceReceiptIds: ["missing"] }), /missing declared source receipt/, "missing receipt must reject");
assert.throws(() => compile({ ...candidate("publish"), evaluationAt: "2026-08-01T20:00:00Z" }), /stale or future/, "stale receipts must reject");
{
  const candidateRaw = canonicalJson(candidate("publish")); const sourceReceiptsRaw = canonicalJson(sourceReceipts); const claimBindingsRaw = canonicalJson(bindings);
  const self = { ...decision(candidateRaw), reviewedBy: maker };
  assert.throws(() => compileDryRun({ candidateRaw, sourceReceiptsRaw, claimBindingsRaw, decisionRaw: canonicalJson(self), maker }), /self-approval/, "maker cannot self-approve");
}
const published = compile(candidate("publish"));
const corrected = compile(candidate("correct"), { priorCanonical: published.proposedCanonical, priorLedger: published.auditLedger });
const retracted = compile(candidate("retract"), { priorCanonical: corrected.proposedCanonical, priorLedger: corrected.auditLedger });
const rollback = compile(candidate("rollback", { rollbackTargetCanonicalSha256: objectSha(corrected.proposedCanonical) }), { priorCanonical: corrected.proposedCanonical, priorLedger: retracted.auditLedger });
assert.equal(rollback.proposedCanonical.status, "current", "rollback restores the named canonical predecessor");
assert.equal(rollback.proposedCanonical.title, corrected.proposedCanonical.title, "rollback recovers exact prior record");
assert.equal(rollback.auditLedger.entries.length, 4, "audit ledger is append-only across publish/correct/retract/rollback");
assert.throws(() => compile(candidate("rollback", { rollbackTargetCanonicalSha256: "0".repeat(64) }), { priorCanonical: corrected.proposedCanonical, priorLedger: retracted.auditLedger }), /rollback target/, "invented rollback target must reject");
assert.throws(() => compile(candidate("correct"), { priorCanonical: published.proposedCanonical, priorLedger: { entries: [{ previousEntrySha256: null, entrySha256: "0".repeat(64) }] } }), /entry checksum/, "tampered audit history must reject");
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-release-pipeline-v1-"));
const candidatePath = path.join(temporary, "candidate.json");
const receiptsPath = path.join(temporary, "receipts.json");
const bindingsPath = path.join(temporary, "bindings.json");
const decisionPath = path.join(temporary, "decision.json");
const outputPath = path.join(temporary, "output");
const cliCandidate = candidate("publish");
const cliCandidateRaw = canonicalJson(cliCandidate);
fs.writeFileSync(candidatePath, cliCandidateRaw);
fs.writeFileSync(receiptsPath, canonicalJson(sourceReceipts));
fs.writeFileSync(bindingsPath, canonicalJson(bindings));
fs.writeFileSync(decisionPath, canonicalJson(decision(cliCandidateRaw)));
const scriptPath = fileURLToPath(new URL("./newsstand-release-pipeline-v1.mjs", import.meta.url));
// The CLI enforces a repository-isolated destination, so use a disposable
// output nested in this pipeline rather than a public/canonical source path.
const cliOutput = path.resolve(path.dirname(scriptPath), "../operations/product-stewards/newsstand/release-pipeline-v1/.test-output");
fs.rmSync(cliOutput, { recursive: true, force: true });
execFileSync(process.execPath, [scriptPath, "--candidate", candidatePath, "--source-receipts", receiptsPath, "--claim-bindings", bindingsPath, "--decision", decisionPath, "--maker", maker, "--output", cliOutput], { stdio: "pipe" });
const cliReceipt = JSON.parse(fs.readFileSync(path.join(cliOutput, "dry-run-receipt.json"), "utf8"));
assert.equal(cliReceipt.publicWrite, false, "CLI emits an isolated non-public receipt");
assert.ok(fs.existsSync(path.join(cliOutput, "proposed-canonical-record.json")), "CLI emits proposed canonical record");
assert.ok(fs.existsSync(path.join(cliOutput, "append-only-audit-ledger.json")), "CLI emits append-only audit ledger");
fs.rmSync(cliOutput, { recursive: true, force: true });
fs.rmSync(temporary, { recursive: true, force: true });
console.log(`NEWSSTAND RELEASE PIPELINE V1 PASS tests=15 canonical_sha256=${rollback.receipt.proposedCanonicalSha256} audit_sha256=${rollback.receipt.auditEntrySha256}`);
