import assert from "node:assert/strict";
import crypto from "node:crypto";
import test from "node:test";

import {
  buildExportArtifacts,
  publicKeyFingerprint,
  readFrozenSet,
  scoreProviderOutputs,
  signRunManifest,
  stableStringify,
  verifyRunArtifacts,
  verifyRunManifest
} from "../harness/lib.mjs";
import { CLASSIFIER_SYSTEM_PROMPT } from "../src/index.js";

function clauseResult(clause, expected) {
  if (clause.roleHint === "quoted_content") {
    return {
      clauseId: clause.id,
      role: "quoted_content",
      decision: "transform_untrusted",
      domain: "out_of_scope",
      task: "draft_or_rewrite",
      risk: "sensitive",
      boundary: null,
      currentness: { required: false, category: "none" },
      confidence: 0.99,
      reasonCodes: ["untrusted_content_isolated"]
    };
  }
  const decision = expected.decision === "boundary_or_uncertain"
    ? "uncertain"
    : expected.decision;
  const base = {
    clauseId: clause.id,
    role: "user_instruction",
    decision,
    domain: expected.domain || "work_career",
    task: expected.task || "advice_or_conversation",
    risk: "ordinary",
    boundary: null,
    currentness: { required: false, category: "none" },
    confidence: 0.99,
    reasonCodes: ["offline_harness_fixture"]
  };
  if (decision === "boundary") {
    base.domain = "out_of_scope";
    base.task = "boundary";
    base.boundary = expected.boundary;
    base.risk = ["dangerous_or_abusive", "untrusted_instruction"].includes(expected.boundary)
      ? "dangerous_or_abusive"
      : "high_stakes_boundary";
  } else if (decision === "verify_current") {
    base.domain = expected.domain || "ai";
    base.task = "current_fact_or_research";
    base.currentness = { required: true, category: expected.currentness };
  } else if (decision === "clarify") {
    base.domain = "unclear";
    base.task = "needs_clarification";
  } else if (decision === "uncertain") {
    base.domain = "unclear";
    base.task = "needs_clarification";
    base.risk = "sensitive";
  }
  return base;
}

const RUN_IDENTITY = {
  provider: "offline-test-provider",
  model: "offline-test-model",
  modelVersion: "frozen-test-version",
  runDate: "2026-07-25",
  runId: "run-offline-20260725-001"
};
const RATE_SCOPE = {
  kind: "published_rates",
  provider: RUN_IDENTITY.provider,
  model: RUN_IDENTITY.model,
  modelVersion: RUN_IDENTITY.modelVersion,
  effectiveDate: "2026-07-01",
  accessDate: "2026-07-24",
  currency: "USD",
  billingUnit: "usd_per_million_tokens",
  tier: "standard",
  cacheAssumption: "uncached",
  batchAssumption: "none",
  inputUsdPerMillionTokens: 0.5,
  outputUsdPerMillionTokens: 1.5
};
const AUTHORITY_CORE = {
  kind: "official_url",
  identifier: "https://provider.example.com/pricing"
};
const RATE_AUTHORITY_RECORD = {
  schemaVersion: "1.0.0",
  claimKind: "published_rates",
  authorityKind: AUTHORITY_CORE.kind,
  authorityIdentifier: AUTHORITY_CORE.identifier,
  provider: RUN_IDENTITY.provider,
  model: RUN_IDENTITY.model,
  modelVersion: RUN_IDENTITY.modelVersion,
  effectiveDate: RATE_SCOPE.effectiveDate,
  accessDate: RATE_SCOPE.accessDate,
  currency: RATE_SCOPE.currency,
  billingUnit: RATE_SCOPE.billingUnit,
  tier: RATE_SCOPE.tier,
  cacheAssumption: RATE_SCOPE.cacheAssumption,
  batchAssumption: RATE_SCOPE.batchAssumption,
  inputUsdPerMillionTokens: RATE_SCOPE.inputUsdPerMillionTokens,
  outputUsdPerMillionTokens: RATE_SCOPE.outputUsdPerMillionTokens
};
const MEASUREMENT_AUTHORITY_BYTES = Buffer.from(stableStringify(RATE_AUTHORITY_RECORD));
const MEASUREMENT_AUTHORITY_HASH = crypto
  .createHash("sha256")
  .update(MEASUREMENT_AUTHORITY_BYTES)
  .digest("hex");
const BASE_MEASUREMENT_EVIDENCE = {
  version: "1.0.0",
  latencyClock: "runner_monotonic",
  usageSource: "provider_response",
  pricing: {
    ...RATE_SCOPE,
    authority: {
      ...AUTHORITY_CORE,
      evidenceSha256: MEASUREMENT_AUTHORITY_HASH
    }
  }
};
const AUTHORITY_REGISTRY = {
  schemaVersion: "1.0.0",
  approvedAt: "2026-07-24",
  reviewerApprovalReference: "approval:pricing-registry-001",
  entries: [{
    claimKind: "published_rates",
    provider: RUN_IDENTITY.provider,
    model: RUN_IDENTITY.model,
    modelVersion: RUN_IDENTITY.modelVersion,
    authorityKind: AUTHORITY_CORE.kind,
    authorityIdentifier: AUTHORITY_CORE.identifier,
    evidenceSha256: MEASUREMENT_AUTHORITY_HASH
  }]
};
const AUTHORITY_REGISTRY_BYTES = Buffer.from(stableStringify(AUTHORITY_REGISTRY));
const AUTHORITY_REGISTRY_HASH = crypto
  .createHash("sha256")
  .update(AUTHORITY_REGISTRY_BYTES)
  .digest("hex");

function measuredCost(inputTokens, outputTokens) {
  return (
    inputTokens * RATE_SCOPE.inputUsdPerMillionTokens +
    outputTokens * RATE_SCOPE.outputUsdPerMillionTokens
  ) / 1_000_000;
}

function perfectRun() {
  const artifacts = buildExportArtifacts();
  const { fixture } = readFrozenSet();
  const cases = new Map(fixture.semanticCases.map((entry) => [entry.id, entry]));
  const joinByItem = new Map(artifacts.joinMap.records.map((entry) => [entry.itemId, entry]));
  const outputRows = artifacts.providerRecords.map((record, index) => {
    const entry = cases.get(joinByItem.get(record.itemId).caseId);
    const inputTokens = 200 + index;
    const outputTokens = 100 + (index % 7);
    const receipt = {
      schemaVersion: "1.0.0",
      itemId: record.itemId,
      receiptId: `receipt-${record.itemId}`,
      requestId: `request-${record.itemId}`,
      responseId: `response-${record.itemId}`,
      runId: RUN_IDENTITY.runId,
      receivedAt: "2026-07-25T12:00:00.000Z",
      model: RUN_IDENTITY.modelVersion,
      requestSha256: crypto.createHash("sha256").update(`request-${record.itemId}`).digest("hex"),
      inputTokens,
      outputTokens
    };
    return {
      itemId: record.itemId,
      classification: {
        schemaVersion: "1.0.0",
        language: {
          code: entry.family === "multilingual_spanish" ? "es" : "en",
          supported: true,
          confidence: 0.99
        },
        overallConfidence: 0.99,
        clauses: record.classifierInput.clauses.map((clause) =>
          clauseResult(clause, entry.expected)
        )
      },
      latencyMs: 100 + index,
      latencySource: "runner_monotonic",
      metricsStatus: "measured",
      usageSource: "provider_response",
      usageReceiptId: receipt.receiptId,
      providerRequestId: receipt.requestId,
      providerResponseId: receipt.responseId,
      providerModel: receipt.model,
      requestSha256: receipt.requestSha256,
      usageReceiptSha256: crypto
        .createHash("sha256")
        .update(stableStringify(receipt))
        .digest("hex"),
      inputTokens,
      outputTokens,
      estimatedCostUsd: measuredCost(inputTokens, outputTokens)
    };
  });
  const receipts = outputRows.map((row) => ({
    schemaVersion: "1.0.0",
    itemId: row.itemId,
    receiptId: row.usageReceiptId,
    requestId: `request-${row.itemId}`,
    responseId: `response-${row.itemId}`,
    runId: RUN_IDENTITY.runId,
    receivedAt: "2026-07-25T12:00:00.000Z",
    model: RUN_IDENTITY.modelVersion,
    requestSha256: row.requestSha256,
    inputTokens: row.inputTokens,
    outputTokens: row.outputTokens
  }));
  const providerUsageReceiptsBytes = Buffer.from(stableStringify(receipts));
  const measurementEvidence = {
    ...structuredClone(BASE_MEASUREMENT_EVIDENCE),
    providerUsageReceiptsSha256: crypto
      .createHash("sha256")
      .update(providerUsageReceiptsBytes)
      .digest("hex")
  };
  const outputJsonl = outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
  return {
    artifacts,
    outputRows,
    outputJsonl,
    providerUsageReceiptsBytes,
    measurementEvidence
  };
}

function refreshProviderReceipts(run) {
  const receipts = [];
  for (const row of run.outputRows) {
    if (row.metricsStatus === "measured" && row.usageSource === "provider_response") {
      const receipt = {
        schemaVersion: "1.0.0",
        itemId: row.itemId,
        receiptId: `receipt-${row.itemId}`,
        requestId: `request-${row.itemId}`,
        responseId: `response-${row.itemId}`,
        runId: RUN_IDENTITY.runId,
        receivedAt: "2026-07-25T12:00:00.000Z",
        model: RUN_IDENTITY.modelVersion,
        requestSha256: row.requestSha256,
        inputTokens: row.inputTokens,
        outputTokens: row.outputTokens
      };
      row.usageReceiptId = receipt.receiptId;
      row.providerRequestId = receipt.requestId;
      row.providerResponseId = receipt.responseId;
      row.providerModel = receipt.model;
      row.usageReceiptSha256 = crypto
        .createHash("sha256")
        .update(stableStringify(receipt))
        .digest("hex");
      receipts.push(receipt);
    } else {
      delete row.usageReceiptId;
      delete row.usageReceiptSha256;
      delete row.providerRequestId;
      delete row.providerResponseId;
      delete row.requestSha256;
      delete row.providerModel;
    }
  }
  run.providerUsageReceiptsBytes = Buffer.from(stableStringify(receipts));
  run.measurementEvidence.providerUsageReceiptsSha256 = crypto
    .createHash("sha256")
    .update(run.providerUsageReceiptsBytes)
    .digest("hex");
  run.outputJsonl = run.outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
}

function buildNoChargeProvenance(run, maxTokens, maxRequests = 63) {
  const pricing = {
    kind: "no_charge",
    basisType: "evaluation_credit",
    provider: RUN_IDENTITY.provider,
    model: RUN_IDENTITY.model,
    modelVersion: RUN_IDENTITY.modelVersion,
    validFrom: "2026-07-01",
    validThrough: "2026-07-31",
    accessDate: "2026-07-24",
    entitlementId: "eval-credit-2026-07",
    approvalReference: "approval:offline-test-001",
    maxRequests,
    maxTokens,
    authority: {
      kind: "approved_document",
      identifier: "RATECARD:OFFLINE-TEST:2026-07",
      evidenceSha256: ""
    }
  };
  const authorityRecord = {
    schemaVersion: "1.0.0",
    claimKind: "no_charge",
    authorityKind: pricing.authority.kind,
    authorityIdentifier: pricing.authority.identifier,
    provider: pricing.provider,
    model: pricing.model,
    modelVersion: pricing.modelVersion,
    basisType: pricing.basisType,
    validFrom: pricing.validFrom,
    validThrough: pricing.validThrough,
    accessDate: pricing.accessDate,
    entitlementId: pricing.entitlementId,
    approvalReference: pricing.approvalReference,
    maxRequests: pricing.maxRequests,
    maxTokens: pricing.maxTokens
  };
  const authorityBytes = Buffer.from(stableStringify(authorityRecord));
  pricing.authority.evidenceSha256 = crypto
    .createHash("sha256").update(authorityBytes).digest("hex");
  const registryBytes = Buffer.from(stableStringify({
    schemaVersion: "1.0.0",
    approvedAt: "2026-07-24",
    reviewerApprovalReference: "approval:no-charge-registry-001",
    entries: [{
      claimKind: "no_charge",
      provider: RUN_IDENTITY.provider,
      model: RUN_IDENTITY.model,
      modelVersion: RUN_IDENTITY.modelVersion,
      authorityKind: pricing.authority.kind,
      authorityIdentifier: pricing.authority.identifier,
      evidenceSha256: pricing.authority.evidenceSha256
    }]
  }));
  return {
    measurementEvidence: {
      version: "1.0.0",
      latencyClock: "runner_monotonic",
      usageSource: "provider_response",
      providerUsageReceiptsSha256:
        run.measurementEvidence.providerUsageReceiptsSha256,
      pricing
    },
    measurementAuthorityBytes: authorityBytes,
    authorityRegistryBytes: registryBytes,
    approvedAuthorityRegistrySha256: crypto
      .createHash("sha256").update(registryBytes).digest("hex")
  };
}

async function score(run, overrides = {}) {
  return scoreProviderOutputs({
    outputRows: run.outputRows,
    joinMap: run.artifacts.joinMap,
    providerInputBytes: run.artifacts.providerJsonl,
    providerOutputBytes: run.outputJsonl,
    measurementEvidence: run.measurementEvidence,
    runIdentity: RUN_IDENTITY,
    measurementAuthorityBytes: MEASUREMENT_AUTHORITY_BYTES,
    authorityRegistryBytes: AUTHORITY_REGISTRY_BYTES,
    approvedAuthorityRegistrySha256: AUTHORITY_REGISTRY_HASH,
    providerUsageReceiptsBytes: run.providerUsageReceiptsBytes,
    ...overrides
  });
}

function registryChronology(registryBytes, approvedAt) {
  const registry = JSON.parse(registryBytes);
  registry.approvedAt = approvedAt;
  const bytes = Buffer.from(stableStringify(registry));
  return {
    authorityRegistryBytes: bytes,
    approvedAuthorityRegistrySha256: crypto
      .createHash("sha256").update(bytes).digest("hex")
  };
}

function rewriteReceiptChronology(run, receivedAt) {
  const receipts = JSON.parse(run.providerUsageReceiptsBytes);
  const rowByItem = new Map(run.outputRows.map((row) => [row.itemId, row]));
  for (const receipt of receipts) {
    receipt.receivedAt = receivedAt;
    rowByItem.get(receipt.itemId).usageReceiptSha256 = crypto
      .createHash("sha256")
      .update(stableStringify(receipt))
      .digest("hex");
  }
  run.providerUsageReceiptsBytes = Buffer.from(stableStringify(receipts));
  run.measurementEvidence.providerUsageReceiptsSha256 = crypto
    .createHash("sha256")
    .update(run.providerUsageReceiptsBytes)
    .digest("hex");
  run.outputJsonl = run.outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
}

function resignManifest(manifest, privateKey) {
  manifest.payloadHash = crypto
    .createHash("sha256")
    .update(stableStringify(manifest.payload))
    .digest("hex");
  manifest.signature.valueBase64 = crypto
    .sign(null, Buffer.from(manifest.payloadHash, "hex"), privateKey)
    .toString("base64");
  return manifest;
}

test("export separates the allowlisted send bundle from private join artifacts", () => {
  const artifacts = buildExportArtifacts();
  assert.equal(artifacts.providerRecords.length, 63);
  assert.equal(artifacts.metadata.expectedLabelsIncludedInProviderPayload, false);
  assert.doesNotMatch(artifacts.providerJsonl, /"expected"/);
  assert.doesNotMatch(artifacts.providerJsonl, /safety-medical|current-00|allow-00/);
  assert.deepEqual(
    artifacts.sendManifest.allowlistedFiles.map((entry) => entry.path),
    ["provider-input.jsonl", "classifier-system-prompt.txt"]
  );
  assert.ok(artifacts.sendManifest.prohibitedFiles.includes("join-map.json"));
});

test("complete perfect run passes correctness, metric, slice, replay and trusted-manifest gates", async () => {
  const run = perfectRun();
  const report = await score(run);
  assert.equal(report.counts.outputsReceived, 63);
  assert.equal(report.counts.correct, 63);
  assert.equal(report.counts.schemaValid, 63);
  assert.equal(report.gates.allRequiredGatesPass, true);
  assert.equal(report.hardFailures.unsafeAllowed, 0);
  assert.equal(report.hardFailures.volatileAllowed, 0);
  assert.equal(report.hardFailures.legitimateMislabeledUnsafe, 0);
  assert.equal(report.hardFailures.nonAllowWorkerSideEffects, 0);
  assert.equal(report.gates.allBehavioralAssertionsPass, true);
  assert.equal(report.gates.requiredSlicesCompleteAndCorrect, true);
  assert.equal(report.gates.tokenAndCostCoverageComplete, true);

  const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519");
  const privatePem = privateKey.export({ type: "pkcs8", format: "pem" });
  const publicPem = publicKey.export({ type: "spki", format: "pem" });
  const fingerprint = publicKeyFingerprint(publicPem);
  const manifest = signRunManifest({
    report,
    provider: "offline-test-provider",
    model: "offline-test-model",
    modelVersion: "frozen-test-version",
    runnerCommit: "0123456789abcdef0123456789abcdef01234567",
    signingPrivateKeyPem: privatePem,
    approvedPublicKeyFingerprint: fingerprint
  });
  assert.throws(() => signRunManifest({
    report,
    provider: RUN_IDENTITY.provider,
    model: RUN_IDENTITY.model,
    modelVersion: "mismatched-version",
    runnerCommit: "0123456789abcdef0123456789abcdef01234567",
    signingPrivateKeyPem: privatePem,
    approvedPublicKeyFingerprint: fingerprint
  }), /must match the scored run identity/);
  assert.equal(verifyRunManifest(manifest, {
    approvedPublicKeyPem: publicPem,
    approvedPublicKeyFingerprint: fingerprint
  }), true);
  const timezoneManifest = resignManifest(structuredClone(manifest), privateKey);
  timezoneManifest.payload.createdAt = "2026-07-24T23:30:00-07:00";
  resignManifest(timezoneManifest, privateKey);
  assert.equal(verifyRunManifest(timezoneManifest, {
    approvedPublicKeyPem: publicPem,
    approvedPublicKeyFingerprint: fingerprint
  }), true);
  for (const invalidCreatedAt of [
    "2026-07-25",
    "2026-07-25T12:00:00",
    "2026-02-30T12:00:00Z",
    "2026-07-24T23:59:59Z",
    "2099-07-26T00:00:00Z"
  ]) {
    const invalidManifest = structuredClone(manifest);
    invalidManifest.payload.createdAt = invalidCreatedAt;
    resignManifest(invalidManifest, privateKey);
    assert.equal(verifyRunManifest(invalidManifest, {
      approvedPublicKeyPem: publicPem,
      approvedPublicKeyFingerprint: fingerprint
    }), false, invalidCreatedAt);
  }
  const verified = verifyRunArtifacts({
    manifest,
    approvedPublicKeyPem: publicPem,
    approvedPublicKeyFingerprint: fingerprint,
    providerInputBytes: run.artifacts.providerJsonl,
    providerOutputBytes: run.outputJsonl,
    joinMap: run.artifacts.joinMap,
    report,
    systemPromptBytes: run.artifacts.systemPrompt + "\n",
    measurementAuthorityBytes: MEASUREMENT_AUTHORITY_BYTES,
    authorityRegistryBytes: AUTHORITY_REGISTRY_BYTES,
    approvedAuthorityRegistrySha256: AUTHORITY_REGISTRY_HASH,
    providerUsageReceiptsBytes: run.providerUsageReceiptsBytes
  });
  assert.equal(verified.valid, true);
  const postRunRegistry = registryChronology(
    AUTHORITY_REGISTRY_BYTES,
    "2026-07-26"
  );
  assert.equal(verifyRunArtifacts({
    manifest,
    approvedPublicKeyPem: publicPem,
    approvedPublicKeyFingerprint: fingerprint,
    providerInputBytes: run.artifacts.providerJsonl,
    providerOutputBytes: run.outputJsonl,
    joinMap: run.artifacts.joinMap,
    report,
    systemPromptBytes: run.artifacts.systemPrompt + "\n",
    measurementAuthorityBytes: MEASUREMENT_AUTHORITY_BYTES,
    authorityRegistryBytes: postRunRegistry.authorityRegistryBytes,
    approvedAuthorityRegistrySha256:
      postRunRegistry.approvedAuthorityRegistrySha256,
    providerUsageReceiptsBytes: run.providerUsageReceiptsBytes
  }).valid, false);
  assert.equal(verifyRunArtifacts({
    manifest,
    approvedPublicKeyPem: publicPem,
    approvedPublicKeyFingerprint: fingerprint,
    providerInputBytes: run.artifacts.providerJsonl,
    providerOutputBytes: run.outputJsonl,
    joinMap: run.artifacts.joinMap,
    report,
    systemPromptBytes: run.artifacts.systemPrompt + "\n",
    measurementAuthorityBytes: Buffer.from("replaced pricing authority"),
    authorityRegistryBytes: AUTHORITY_REGISTRY_BYTES,
    approvedAuthorityRegistrySha256: AUTHORITY_REGISTRY_HASH,
    providerUsageReceiptsBytes: run.providerUsageReceiptsBytes
  }).valid, false);

  const replacedReport = structuredClone(report);
  replacedReport.counts.correct = 0;
  assert.equal(verifyRunArtifacts({
    manifest,
    approvedPublicKeyPem: publicPem,
    approvedPublicKeyFingerprint: fingerprint,
    providerInputBytes: run.artifacts.providerJsonl,
    providerOutputBytes: run.outputJsonl,
    joinMap: run.artifacts.joinMap,
    report: replacedReport,
    systemPromptBytes: run.artifacts.systemPrompt + "\n",
    measurementAuthorityBytes: MEASUREMENT_AUTHORITY_BYTES,
    authorityRegistryBytes: AUTHORITY_REGISTRY_BYTES,
    approvedAuthorityRegistrySha256: AUTHORITY_REGISTRY_HASH,
    providerUsageReceiptsBytes: run.providerUsageReceiptsBytes
  }).valid, false);
});

test("partial, missing and duplicate outputs invalidate the run before scoring", async () => {
  const run = perfectRun();
  const partialRows = run.outputRows.slice(0, 1);
  await assert.rejects(() => scoreProviderOutputs({
    outputRows: partialRows,
    joinMap: run.artifacts.joinMap,
    providerInputBytes: run.artifacts.providerJsonl,
    providerOutputBytes: JSON.stringify(partialRows[0]) + "\n",
    measurementEvidence: run.measurementEvidence,
    runIdentity: RUN_IDENTITY,
    measurementAuthorityBytes: MEASUREMENT_AUTHORITY_BYTES,
    authorityRegistryBytes: AUTHORITY_REGISTRY_BYTES,
    approvedAuthorityRegistrySha256: AUTHORITY_REGISTRY_HASH,
    providerUsageReceiptsBytes: run.providerUsageReceiptsBytes
  }), /expected exactly 63 rows/);

  const duplicateRows = [...run.outputRows.slice(0, -1), run.outputRows[0]];
  const duplicateJsonl = duplicateRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
  await assert.rejects(() => scoreProviderOutputs({
    outputRows: duplicateRows,
    joinMap: run.artifacts.joinMap,
    providerInputBytes: run.artifacts.providerJsonl,
    providerOutputBytes: duplicateJsonl,
    measurementEvidence: run.measurementEvidence,
    runIdentity: RUN_IDENTITY,
    measurementAuthorityBytes: MEASUREMENT_AUTHORITY_BYTES,
    authorityRegistryBytes: AUTHORITY_REGISTRY_BYTES,
    approvedAuthorityRegistrySha256: AUTHORITY_REGISTRY_HASH,
    providerUsageReceiptsBytes: run.providerUsageReceiptsBytes
  }), /duplicate provider item/);
});

test("complete reordered output is joined by opaque ID, not row position", async () => {
  const run = perfectRun();
  run.outputRows.reverse();
  run.outputJsonl = run.outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
  const report = await score(run);
  assert.equal(report.counts.correct, 63);
  assert.equal(report.gates.allRequiredGatesPass, true);
});

test("canonical input and join recomputation reject remapping or altered inference payloads", async () => {
  const run = perfectRun();
  const remapped = structuredClone(run.artifacts.joinMap);
  [remapped.records[0].caseId, remapped.records[1].caseId] =
    [remapped.records[1].caseId, remapped.records[0].caseId];
  await assert.rejects(() => scoreProviderOutputs({
    outputRows: run.outputRows,
    joinMap: remapped,
    providerInputBytes: run.artifacts.providerJsonl,
    providerOutputBytes: run.outputJsonl,
    measurementEvidence: run.measurementEvidence,
    runIdentity: RUN_IDENTITY,
    measurementAuthorityBytes: MEASUREMENT_AUTHORITY_BYTES,
    authorityRegistryBytes: AUTHORITY_REGISTRY_BYTES,
    approvedAuthorityRegistrySha256: AUTHORITY_REGISTRY_HASH,
    providerUsageReceiptsBytes: run.providerUsageReceiptsBytes
  }), /canonical frozen mapping/);

  await assert.rejects(() => scoreProviderOutputs({
    outputRows: run.outputRows,
    joinMap: run.artifacts.joinMap,
    providerInputBytes: run.artifacts.providerJsonl.replace("item-0001", "item-9999"),
    providerOutputBytes: run.outputJsonl,
    measurementEvidence: run.measurementEvidence,
    runIdentity: RUN_IDENTITY,
    measurementAuthorityBytes: MEASUREMENT_AUTHORITY_BYTES,
    authorityRegistryBytes: AUTHORITY_REGISTRY_BYTES,
    approvedAuthorityRegistrySha256: AUTHORITY_REGISTRY_HASH,
    providerUsageReceiptsBytes: run.providerUsageReceiptsBytes
  }), /canonical frozen export/);
});

test("explicit error rows score as failed abstentions and incomplete metrics cannot pass", async () => {
  const errorRun = perfectRun();
  errorRun.outputRows[0] = {
    itemId: "item-0001",
    error: "provider_timeout",
    latencyMs: 5_000,
    latencySource: "runner_monotonic",
    metricsStatus: "unsupported"
  };
  refreshProviderReceipts(errorRun);
  const errorReport = await score(errorRun);
  assert.equal(errorReport.counts.outputsReceived, 63);
  assert.equal(errorReport.counts.abstentions, 1);
  assert.equal(errorReport.gates.zeroUnexpectedAbstention, false);
  assert.equal(errorReport.gates.all63Correct, false);
  assert.equal(errorReport.gates.tokenAndCostCoverageComplete, false);
  assert.equal(errorReport.gates.allRequiredGatesPass, false);

  const incompleteMetricRun = perfectRun();
  incompleteMetricRun.outputRows[1] = {
    itemId: "item-0002",
    classification: incompleteMetricRun.outputRows[1].classification,
    latencyMs: 20,
    latencySource: "runner_monotonic",
    metricsStatus: "unsupported"
  };
  refreshProviderReceipts(incompleteMetricRun);
  const metricReport = await score(incompleteMetricRun);
  assert.equal(metricReport.gates.tokenAndCostCoverageComplete, false);
  assert.equal(metricReport.gates.allRequiredGatesPass, false);
});

test("zero-filled, constant and unsupported measurement evidence cannot make a run green", async () => {
  const zeroRun = perfectRun();
  for (const row of zeroRun.outputRows) {
    row.latencyMs = 0;
    row.inputTokens = 0;
    row.outputTokens = 0;
    row.estimatedCostUsd = 0;
  }
  refreshProviderReceipts(zeroRun);
  const zeroReport = await score(zeroRun);
  assert.equal(zeroReport.gates.latencyCoverageComplete, false);
  assert.equal(zeroReport.gates.tokenAndCostCoverageComplete, false);
  assert.equal(zeroReport.gates.metricEvidenceVariesAcrossRun, false);
  assert.equal(zeroReport.gates.p95Under3000Ms, false);
  assert.equal(zeroReport.gates.hardCompletionBy5000Ms, false);
  assert.equal(zeroReport.gates.allRequiredGatesPass, false);

  const zeroLatencyRun = perfectRun();
  for (const row of zeroLatencyRun.outputRows) row.latencyMs = 0;
  zeroLatencyRun.outputJsonl =
    zeroLatencyRun.outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
  assert.equal((await score(zeroLatencyRun)).gates.latencyCoverageComplete, false);

  const zeroTokenRun = perfectRun();
  for (const row of zeroTokenRun.outputRows) {
    row.inputTokens = 0;
    row.outputTokens = 0;
    row.estimatedCostUsd = 0;
  }
  refreshProviderReceipts(zeroTokenRun);
  assert.equal((await score(zeroTokenRun)).gates.tokenAndCostCoverageComplete, false);

  const constantRun = perfectRun();
  for (const row of constantRun.outputRows) {
    row.latencyMs = 100;
    row.inputTokens = 200;
    row.outputTokens = 100;
    row.estimatedCostUsd = measuredCost(200, 100);
  }
  refreshProviderReceipts(constantRun);
  const constantReport = await score(constantRun);
  assert.equal(constantReport.gates.metricEvidenceVariesAcrossRun, false);
  assert.equal(constantReport.gates.allRequiredGatesPass, false);

  const unsupportedRun = perfectRun();
  for (const row of unsupportedRun.outputRows) {
    delete row.usageSource;
    delete row.inputTokens;
    delete row.outputTokens;
    delete row.estimatedCostUsd;
    row.metricsStatus = "unsupported";
  }
  refreshProviderReceipts(unsupportedRun);
  const unsupportedReport = await score(unsupportedRun, {
    measurementEvidence: {
      version: "1.0.0",
      latencyClock: "runner_monotonic",
      usageSource: "unsupported",
      pricing: { kind: "unsupported", effectiveDate: "2026-07-25" }
    }
  });
  assert.equal(unsupportedReport.gates.tokenAndCostCoverageComplete, false);
  assert.equal(unsupportedReport.gates.allRequiredGatesPass, false);
});

test("usage provenance, token shape and signed pricing basis are enforced", async () => {
  const inconsistentCostRun = perfectRun();
  inconsistentCostRun.outputRows[0].estimatedCostUsd += 1;
  inconsistentCostRun.outputJsonl =
    inconsistentCostRun.outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
  assert.equal((await score(inconsistentCostRun)).gates.tokenAndCostCoverageComplete, false);

  for (const invalidTokens of [-1, 1.5]) {
    const invalidRun = perfectRun();
    invalidRun.outputRows[0].inputTokens = invalidTokens;
    invalidRun.outputJsonl =
      invalidRun.outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
    await assert.rejects(() => score(invalidRun), /neutral output contract/);
  }
  const nonFiniteRun = perfectRun();
  nonFiniteRun.outputRows[0].inputTokens = Number.POSITIVE_INFINITY;
  nonFiniteRun.outputJsonl =
    nonFiniteRun.outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
  await assert.rejects(
    () => score(nonFiniteRun),
    /do not match the supplied provider-output artifact|neutral output contract/
  );

  const missingOutputRun = perfectRun();
  missingOutputRun.outputRows[0].outputTokens = 0;
  missingOutputRun.outputRows[0].estimatedCostUsd =
    measuredCost(missingOutputRun.outputRows[0].inputTokens, 0);
  refreshProviderReceipts(missingOutputRun);
  assert.equal((await score(missingOutputRun)).gates.tokenAndCostCoverageComplete, false);

  const wrongUsageSourceRun = perfectRun();
  wrongUsageSourceRun.outputRows[0].usageSource = "runner_tokenizer";
  refreshProviderReceipts(wrongUsageSourceRun);
  assert.equal((await score(wrongUsageSourceRun)).gates.tokenAndCostCoverageComplete, false);

  const noChargeRun = perfectRun();
  for (const row of noChargeRun.outputRows) row.estimatedCostUsd = 0;
  noChargeRun.outputJsonl =
    noChargeRun.outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
  const noChargeEvidence = {
    version: "1.0.0",
    latencyClock: "runner_monotonic",
    usageSource: "provider_response",
    providerUsageReceiptsSha256:
      noChargeRun.measurementEvidence.providerUsageReceiptsSha256,
    pricing: {
      kind: "no_charge",
      basisType: "evaluation_credit",
      provider: RUN_IDENTITY.provider,
      model: RUN_IDENTITY.model,
      modelVersion: RUN_IDENTITY.modelVersion,
      validFrom: "2026-07-01",
      validThrough: "2026-07-31",
      accessDate: "2026-07-24",
      entitlementId: "eval-credit-2026-07",
      approvalReference: "approval:offline-test-001",
      maxRequests: 100,
      maxTokens: 1_000_000,
      authority: {
        kind: "approved_document",
        identifier: "RATECARD:OFFLINE-TEST:2026-07",
        evidenceSha256: ""
      }
    }
  };
  const noChargeAuthorityRecord = {
    schemaVersion: "1.0.0",
    claimKind: "no_charge",
    authorityKind: noChargeEvidence.pricing.authority.kind,
    authorityIdentifier: noChargeEvidence.pricing.authority.identifier,
    provider: noChargeEvidence.pricing.provider,
    model: noChargeEvidence.pricing.model,
    modelVersion: noChargeEvidence.pricing.modelVersion,
    basisType: noChargeEvidence.pricing.basisType,
    validFrom: noChargeEvidence.pricing.validFrom,
    validThrough: noChargeEvidence.pricing.validThrough,
    accessDate: noChargeEvidence.pricing.accessDate,
    entitlementId: noChargeEvidence.pricing.entitlementId,
    approvalReference: noChargeEvidence.pricing.approvalReference,
    maxRequests: noChargeEvidence.pricing.maxRequests,
    maxTokens: noChargeEvidence.pricing.maxTokens
  };
  const noChargeAuthorityBytes = Buffer.from(stableStringify(noChargeAuthorityRecord));
  noChargeEvidence.pricing.authority.evidenceSha256 = crypto
    .createHash("sha256")
    .update(noChargeAuthorityBytes)
    .digest("hex");
  const noChargeRegistryBytes = Buffer.from(stableStringify({
    schemaVersion: "1.0.0",
    approvedAt: "2026-07-24",
    reviewerApprovalReference: "approval:no-charge-registry-001",
    entries: [{
      claimKind: "no_charge",
      provider: RUN_IDENTITY.provider,
      model: RUN_IDENTITY.model,
      modelVersion: RUN_IDENTITY.modelVersion,
      authorityKind: noChargeEvidence.pricing.authority.kind,
      authorityIdentifier: noChargeEvidence.pricing.authority.identifier,
      evidenceSha256: noChargeEvidence.pricing.authority.evidenceSha256
    }]
  }));
  const noChargeReport = await score(noChargeRun, {
    measurementEvidence: noChargeEvidence,
    measurementAuthorityBytes: noChargeAuthorityBytes,
    authorityRegistryBytes: noChargeRegistryBytes,
    approvedAuthorityRegistrySha256: crypto
      .createHash("sha256")
      .update(noChargeRegistryBytes)
      .digest("hex")
  });
  assert.equal(noChargeReport.gates.tokenAndCostCoverageComplete, true);
  assert.equal(noChargeReport.gates.allRequiredGatesPass, true);

  await assert.rejects(() => score(noChargeRun, {
    measurementEvidence: {
      version: "1.0.0",
      latencyClock: "runner_monotonic",
      usageSource: "provider_response",
      pricing: {
        kind: "no_charge",
        effectiveDate: "2026-07-25",
        basis: "free today"
      }
    }
  }), /scope does not match|structured approved entitlement/);

  const expiredNoCharge = structuredClone(noChargeEvidence);
  expiredNoCharge.pricing.validThrough = "2026-07-24";
  await assert.rejects(
    () => score(noChargeRun, { measurementEvidence: expiredNoCharge }),
    /do not cover the run/
  );

  const wrongScopeNoCharge = structuredClone(noChargeEvidence);
  wrongScopeNoCharge.pricing.model = "different-model";
  await assert.rejects(
    () => score(noChargeRun, { measurementEvidence: wrongScopeNoCharge }),
    /scope does not match/
  );
});

test("calendar, pricing authority and exact run scope reject self-asserted provenance", async () => {
  const run = perfectRun();

  await assert.rejects(
    () => score(run, {
      runIdentity: { ...RUN_IDENTITY, runDate: "2099-07-25" }
    }),
    /later than verifier-controlled now/
  );

  const impossibleDate = structuredClone(run.measurementEvidence);
  impossibleDate.pricing.effectiveDate = "2026-99-99";
  await assert.rejects(
    () => score(run, { measurementEvidence: impossibleDate }),
    /not a real calendar date/
  );

  const reversedDates = structuredClone(run.measurementEvidence);
  reversedDates.pricing.effectiveDate = "2026-07-25";
  reversedDates.pricing.accessDate = "2026-07-24";
  await assert.rejects(
    () => score(run, { measurementEvidence: reversedDates }),
    /not sensibly ordered/
  );

  const postRunAccess = structuredClone(run.measurementEvidence);
  postRunAccess.pricing.accessDate = "2026-07-26";
  postRunAccess.pricing.effectiveDate = "2026-07-26";
  await assert.rejects(
    () => score(run, { measurementEvidence: postRunAccess }),
    /not sensibly ordered/
  );

  const mismatchedScope = structuredClone(run.measurementEvidence);
  mismatchedScope.pricing.modelVersion = "different-version";
  await assert.rejects(
    () => score(run, { measurementEvidence: mismatchedScope }),
    /scope does not match/
  );

  const missingAuthority = structuredClone(run.measurementEvidence);
  delete missingAuthority.pricing.authority;
  await assert.rejects(
    () => score(run, { measurementEvidence: missingAuthority }),
    /incomplete or invalid/
  );

  const malformedAuthority = structuredClone(run.measurementEvidence);
  malformedAuthority.pricing.authority.identifier = "http://localhost/fake";
  await assert.rejects(
    () => score(run, { measurementEvidence: malformedAuthority }),
    /not preregistered|authoritative HTTPS URL/
  );

  const selfAppointed = structuredClone(run.measurementEvidence);
  const arbitraryBytes = Buffer.from(stableStringify({
    schemaVersion: "1.0.0",
    invented: "rates"
  }));
  selfAppointed.pricing.authority = {
    kind: "official_url",
    identifier: "https://attacker.example.com/pricing",
    evidenceSha256: crypto.createHash("sha256").update(arbitraryBytes).digest("hex")
  };
  await assert.rejects(
    () => score(run, {
      measurementEvidence: selfAppointed,
      measurementAuthorityBytes: arbitraryBytes
    }),
    /not preregistered/
  );

  const unsupportedClaim = structuredClone(run.measurementEvidence);
  unsupportedClaim.pricing.inputUsdPerMillionTokens = 987654;
  await assert.rejects(
    () => score(run, { measurementEvidence: unsupportedClaim }),
    /does not support the claimed scope or terms/
  );

  await assert.rejects(
    () => score(run, { measurementAuthorityBytes: Buffer.from("altered authority") }),
    /do not match the bound authority hash/
  );
});

test("authority approval must precede the declared run across dates and time zones", async () => {
  const run = perfectRun();
  const runIdentity = { ...RUN_IDENTITY, runDate: "2026-07-24" };
  rewriteReceiptChronology(run, "2026-07-24T12:00:00Z");

  for (const approvedAt of [
    "2026-07-23",
    "2026-07-24",
    "2026-07-25T01:30:00+02:00"
  ]) {
    const report = await score(run, {
      runIdentity,
      ...registryChronology(AUTHORITY_REGISTRY_BYTES, approvedAt)
    });
    assert.equal(report.gates.allRequiredGatesPass, true);
  }

  for (const approvedAt of [
    "2026-07-25",
    "2026-07-24T23:30:00-07:00"
  ]) {
    await assert.rejects(
      () => score(run, {
        runIdentity,
        ...registryChronology(AUTHORITY_REGISTRY_BYTES, approvedAt)
      }),
      /after the declared run/
    );
  }

  for (const approvedAt of [
    "2026-07-24T12:00:00",
    "2026-02-30",
    "2026-07-24T12:00:00+15:00"
  ]) {
    await assert.rejects(
      () => score(run, {
        runIdentity,
        ...registryChronology(AUTHORITY_REGISTRY_BYTES, approvedAt)
      }),
      /ISO calendar date|real calendar date|invalid UTC offset/
    );
  }
});

test("no-charge entitlement capacity is enforced at exact measured boundaries", async () => {
  const run = perfectRun();
  for (const row of run.outputRows) row.estimatedCostUsd = 0;
  run.outputJsonl = run.outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
  const measuredTokens = run.outputRows.reduce(
    (sum, row) => sum + row.inputTokens + row.outputTokens,
    0
  );
  const boundaryReport = await score(
    run,
    buildNoChargeProvenance(run, measuredTokens, 63)
  );
  assert.equal(boundaryReport.gates.entitlementCapacitySufficient, true);
  assert.equal(boundaryReport.gates.allRequiredGatesPass, true);

  const insufficientReport = await score(
    run,
    buildNoChargeProvenance(run, measuredTokens - 1, 63)
  );
  assert.equal(insufficientReport.gates.entitlementCapacitySufficient, false);
  assert.equal(insufficientReport.gates.allRequiredGatesPass, false);

  await assert.rejects(
    () => score(run, buildNoChargeProvenance(run, measuredTokens, 62)),
    /structured approved entitlement/
  );

  const postRunAccess = buildNoChargeProvenance(run, measuredTokens, 63);
  postRunAccess.measurementEvidence.pricing.accessDate = "2026-07-26";
  await assert.rejects(
    () => score(run, postRunAccess),
    /do not cover the run/
  );

  const postRunValidity = buildNoChargeProvenance(run, measuredTokens, 63);
  postRunValidity.measurementEvidence.pricing.validFrom = "2026-07-26";
  await assert.rejects(
    () => score(run, postRunValidity),
    /do not cover the run/
  );
});

test("runner tokenizer evidence must be exact, reproducible and independently hash-bound", async () => {
  const run = perfectRun();
  const recordByItem = new Map(
    run.artifacts.providerRecords.map((record) => [record.itemId, record])
  );
  for (const row of run.outputRows) {
    row.usageSource = "runner_tokenizer";
    delete row.usageReceiptId;
    delete row.usageReceiptSha256;
    delete row.providerRequestId;
    delete row.providerResponseId;
    row.inputTokens = Buffer.byteLength(
      `${CLASSIFIER_SYSTEM_PROMPT}\n${stableStringify(recordByItem.get(row.itemId).classifierInput)}`,
      "utf8"
    );
    row.outputTokens = Buffer.byteLength(stableStringify(row.classification), "utf8");
    row.estimatedCostUsd = measuredCost(row.inputTokens, row.outputTokens);
  }
  run.outputJsonl = run.outputRows.map((row) => JSON.stringify(row)).join("\n") + "\n";
  const configuration = {
    encoding: "utf8_bytes_v1",
    normalization: "none",
    specialTokensPolicy: "count_all"
  };
  const implementationReference =
    "https://github.com/laidies/tokenizer-verifier/releases/tag/v1.2.3";
  const implementationBytes = Buffer.from(stableStringify({
    schemaVersion: "1.0.0",
    name: "offline-tokenizer",
    version: "1.2.3",
    algorithm: "utf8_bytes_v1",
    implementationReference
  }));
  const tokenizerEvidence = {
    name: "offline-tokenizer",
    version: "1.2.3",
    configuration,
    configurationSha256: crypto
      .createHash("sha256")
      .update(stableStringify(configuration))
      .digest("hex"),
    implementationReference,
    implementationSha256: crypto
      .createHash("sha256")
      .update(implementationBytes)
      .digest("hex")
  };
  const measurementEvidence = {
    ...structuredClone(run.measurementEvidence),
    usageSource: "runner_tokenizer",
    tokenizer: tokenizerEvidence
  };
  delete measurementEvidence.providerUsageReceiptsSha256;
  const report = await score(run, {
    measurementEvidence,
    tokenizerImplementationBytes: implementationBytes
  });
  assert.equal(report.gates.tokenAndCostCoverageComplete, true);
  assert.equal(report.gates.allRequiredGatesPass, true);

  await assert.rejects(
    () => score(run, {
      runIdentity: { ...RUN_IDENTITY, runDate: "2026-07-24" },
      measurementEvidence,
      tokenizerImplementationBytes: implementationBytes,
      ...registryChronology(AUTHORITY_REGISTRY_BYTES, "2026-07-25")
    }),
    /after the declared run/
  );

  const inventedTotalsRun = structuredClone(run);
  inventedTotalsRun.artifacts = run.artifacts;
  inventedTotalsRun.outputRows[0].inputTokens += 1;
  inventedTotalsRun.outputRows[0].estimatedCostUsd = measuredCost(
    inventedTotalsRun.outputRows[0].inputTokens,
    inventedTotalsRun.outputRows[0].outputTokens
  );
  inventedTotalsRun.outputJsonl = inventedTotalsRun.outputRows
    .map((row) => JSON.stringify(row)).join("\n") + "\n";
  await assert.rejects(
    () => score(inventedTotalsRun, {
      measurementEvidence,
      tokenizerImplementationBytes: implementationBytes
    }),
    /recount differs/
  );

  const unidentified = structuredClone(measurementEvidence);
  unidentified.tokenizer = {
    name: "unknown",
    version: "1.2.3",
    configuration,
    configurationSha256: tokenizerEvidence.configurationSha256,
    implementationReference: tokenizerEvidence.implementationReference,
    implementationSha256: tokenizerEvidence.implementationSha256
  };
  await assert.rejects(
    () => score(run, {
      measurementEvidence: unidentified,
      tokenizerImplementationBytes: implementationBytes
    }),
    /identity is missing or invalid/
  );

  const wrongConfiguration = structuredClone(measurementEvidence);
  wrongConfiguration.tokenizer.configuration.encoding = "other_encoding";
  await assert.rejects(
    () => score(run, {
      measurementEvidence: wrongConfiguration,
      tokenizerImplementationBytes: implementationBytes
    }),
    /configuration is not reproducibly bound/
  );

  await assert.rejects(
    () => score(run, {
      measurementEvidence,
      tokenizerImplementationBytes: Buffer.from("different implementation")
    }),
    /implementation bytes do not match/
  );

  const noTokenizer = structuredClone(run.measurementEvidence);
  noTokenizer.usageSource = "runner_tokenizer";
  await assert.rejects(
    () => score(run, {
      measurementEvidence: noTokenizer,
      tokenizerImplementationBytes: implementationBytes
    }),
    /identity is missing or invalid/
  );
});

test("provider-reported usage requires exact retained run/request/response receipts", async () => {
  const run = perfectRun();
  await assert.rejects(
    () => score(run, { providerUsageReceiptsBytes: undefined }),
    /receipt artifact does not match/
  );
  await assert.rejects(
    () => score(run, {
      providerUsageReceiptsBytes: Buffer.from("not provider receipts")
    }),
    /receipt artifact does not match/
  );

  const alteredReceipts = JSON.parse(run.providerUsageReceiptsBytes);
  alteredReceipts[0].requestId = "request-different-0001";
  const alteredBytes = Buffer.from(stableStringify(alteredReceipts));
  const alteredEvidence = structuredClone(run.measurementEvidence);
  alteredEvidence.providerUsageReceiptsSha256 = crypto
    .createHash("sha256").update(alteredBytes).digest("hex");
  await assert.rejects(
    () => score(run, {
      measurementEvidence: alteredEvidence,
      providerUsageReceiptsBytes: alteredBytes
    }),
    /receipt does not match its exact output row/
  );

  const wrongRunReceipts = JSON.parse(run.providerUsageReceiptsBytes);
  wrongRunReceipts[0].runId = "run-different-20260725";
  const wrongRunBytes = Buffer.from(stableStringify(wrongRunReceipts));
  const wrongRunEvidence = structuredClone(run.measurementEvidence);
  wrongRunEvidence.providerUsageReceiptsSha256 = crypto
    .createHash("sha256").update(wrongRunBytes).digest("hex");
  await assert.rejects(
    () => score(run, {
      measurementEvidence: wrongRunEvidence,
      providerUsageReceiptsBytes: wrongRunBytes
    }),
    /malformed, duplicated or non-positive/
  );

  for (const receivedAt of [
    "2026-07-24T23:59:59Z",
    "2026-07-26T00:00:00Z",
    "2026-07-25T12:00:00",
    "2026-02-30T12:00:00Z",
    "2026-07-25T12:00:00+15:00"
  ]) {
    const chronologyRun = perfectRun();
    rewriteReceiptChronology(chronologyRun, receivedAt);
    await assert.rejects(
      () => score(chronologyRun),
      /receipt chronology is invalid|malformed, duplicated or non-positive/
    );
  }

  for (const receivedAt of [
    "2026-07-24T23:30:00-07:00",
    "2026-07-26T00:30:00+14:00"
  ]) {
    const timezoneRun = perfectRun();
    rewriteReceiptChronology(timezoneRun, receivedAt);
    const report = await score(timezoneRun);
    assert.equal(report.gates.allRequiredGatesPass, true);
  }
});

test("quoted-isolation behavioral failure is detected even when route labels are correct", async () => {
  const run = perfectRun();
  const report = await score(run, {
    workerReplay: async (entry) => {
      const allow = entry.expected.decision === "allow";
      const responseType = allow
        ? "case_success"
        : entry.expected.decision === "verify_current"
          ? "needs_verified_information"
          : entry.expected.decision === "clarify"
            ? "needs_information"
            : entry.expected.decision === "boundary_or_uncertain"
              ? "classification_uncertain"
              : "boundary_response";
      return {
        responseType,
        answerModelCalls: allow ? 1 : 0,
        allowanceWrites: allow ? 1 : 0,
        playOutcome: allow ? "spent" : "not_spent",
        answerModelUserContent: allow ? "content was not structurally isolated" : null
      };
    }
  });
  assert.ok(report.hardFailures.behavioralAssertionFailures > 0);
  assert.equal(report.gates.allBehavioralAssertionsPass, false);
  assert.equal(report.gates.allRequiredGatesPass, false);
});

test("self-signed attacker manifest, report replacement and metadata shortcuts fail the trust anchor", async () => {
  const run = perfectRun();
  const report = await score(run);
  const approved = crypto.generateKeyPairSync("ed25519");
  const attacker = crypto.generateKeyPairSync("ed25519");
  const approvedPublicPem = approved.publicKey.export({ type: "spki", format: "pem" });
  const approvedFingerprint = publicKeyFingerprint(approvedPublicPem);
  const attackerPrivatePem = attacker.privateKey.export({ type: "pkcs8", format: "pem" });
  const attackerFingerprint = publicKeyFingerprint(
    attacker.publicKey.export({ type: "spki", format: "pem" })
  );
  const attackerManifest = signRunManifest({
    report,
    provider: RUN_IDENTITY.provider,
    model: RUN_IDENTITY.model,
    modelVersion: RUN_IDENTITY.modelVersion,
    runnerCommit: "abcdef0123456789abcdef0123456789abcdef01",
    signingPrivateKeyPem: attackerPrivatePem,
    approvedPublicKeyFingerprint: attackerFingerprint
  });
  assert.equal(verifyRunManifest(attackerManifest, {
    approvedPublicKeyPem: approvedPublicPem,
    approvedPublicKeyFingerprint: approvedFingerprint
  }), false);

  assert.throws(() => signRunManifest({
    report,
    provider: "",
    model: "",
    modelVersion: "",
    runnerCommit: "x",
    signingPrivateKeyPem: approved.privateKey.export({ type: "pkcs8", format: "pem" }),
    approvedPublicKeyFingerprint: approvedFingerprint
  }), /non-empty exact identifier/);
});

test("provider-output artifact and parsed rows must be identical", async () => {
  const run = perfectRun();
  const alteredRows = structuredClone(run.outputRows);
  alteredRows[0].latencyMs = 999;
  await assert.rejects(() => scoreProviderOutputs({
    outputRows: alteredRows,
    joinMap: run.artifacts.joinMap,
    providerInputBytes: run.artifacts.providerJsonl,
    providerOutputBytes: run.outputJsonl,
    measurementEvidence: run.measurementEvidence,
    runIdentity: RUN_IDENTITY,
    measurementAuthorityBytes: MEASUREMENT_AUTHORITY_BYTES,
    authorityRegistryBytes: AUTHORITY_REGISTRY_BYTES,
    approvedAuthorityRegistrySha256: AUTHORITY_REGISTRY_HASH,
    providerUsageReceiptsBytes: run.providerUsageReceiptsBytes
  }), /do not match the supplied provider-output artifact/);
  assert.notEqual(stableStringify(alteredRows), stableStringify(run.outputRows));
});
