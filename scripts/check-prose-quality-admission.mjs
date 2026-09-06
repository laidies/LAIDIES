#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const NEWSSTAND_SAMPLING_POLICY = "operations/product-stewards/newsstand/recurring-service-sampling-policy.json";
const SERVICE_REVIEW_FLOOR_POLICY = "operations/product-stewards/newsstand/recurring-service-review-floor-policy.json";
const NEWS_EDITORIAL_POLICY = "operations/product-stewards/newsstand/ordinary-news-editorial-policy.json";
const HASH = /^[a-f0-9]{64}$/;
const CORE = ["plainClarity", "readerValue", "laidiesVoice", "engagingEnjoyable", "factualIntegrity", "freshnessReviewability", "surfaceFit"];
const TEACHING = ["connectedSystemUnderstanding", "dailyLifeConnection", "communicationBenchmark", "explainBack", "unseenTransfer", "usefulAction", "analogyIntegrity"];
const REQUIRED_BY_CLASS = {
  EPISODE: [...CORE, ...TEACHING, "explanationArc", "storyCarriesMechanism", "humourServesLearning"],
  CLASS: [...CORE, ...TEACHING, "explanationArc", "practiceFeedback"],
  EXPLANATION: [...CORE, ...TEACHING, "explanationArc"],
  REFERENCE: [...CORE, "lookupAccuracy", "systemRelationship", "dailyLifeConnection", "communicationBenchmark", "usefulAction", "analogyIntegrity"],
  FAQ: [...CORE, "answersActualQuestion", "dailyLifeConnection", "communicationBenchmark", "usefulAction", "analogyIntegrity"],
  NEWS: [...CORE, "datedChange", "consequenceAndUncertainty", "dailyLifeConnection", "communicationBenchmark", "explainBack", "unseenTransfer", "usefulAction", "analogyIntegrity"],
  PRACTICE: [...CORE, "retrievalOrPractice", "practiceFeedback", "communicationBenchmark", "unseenTransfer", "recoveryRoute"],
  INTERACTIVE: [...CORE, "dailyLifeConnection", "communicationBenchmark", "usefulAction", "practiceFeedback", "honestLimits"],
  PROMOTIONAL: [...CORE, "truthfulPromise", "clearAction"],
  MICROCOPY: [...CORE, "truthfulPromise", "clearAction"]
};
export const FAILURE_FAMILIES = [
  "glossaryAccumulation", "templateRepetition", "decorativeAnalogy", "referenceConfetti",
  "missingMechanism", "genericAction", "jargonBeforeMeaning", "disconnectedSystem",
  "factlessConfidence", "staleUnreviewableClaims", "corporateSludge", "joylessInstruction",
  "benchmarkNameDrop", "curiosityWithoutPayoff", "familiarExampleWithoutTechnicalReturn",
  "communicationPastiche", "entertainmentBeforeUnderstanding",
  "mechanismCompressedBehindHook", "prematureClickBeforeMechanism", "inflatedTakeawayEnding"
];

export function enforcedFailureFamilies(registry) {
  return [...new Set([
    ...FAILURE_FAMILIES,
    ...(registry?.negativeExemplars || []).flatMap(item => item.failureFamilies || [])
  ])].sort();
}

const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const text = value => typeof value === "string" && value.trim().length > 0;
const validDateOnly = value => /^\d{4}-\d{2}-\d{2}$/.test(value || "") && new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;

function loadBinding(root, binding, label, errors) {
  if (!binding || !text(binding.path) || !HASH.test(binding.sha256 || "")) { errors.push(`${label}: exact path and SHA-256 are required`); return null; }
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute)) { errors.push(`${label}: file missing or outside repository`); return null; }
  const bytes = fs.readFileSync(absolute);
  const actual = sha256(bytes);
  if (actual !== binding.sha256) errors.push(`${label}: SHA-256 mismatch expected=${binding.sha256} actual=${actual}`);
  return bytes.toString("utf8");
}

function evidenceAppears(body, evidence, label, errors) {
  if (!Array.isArray(evidence) || evidence.length === 0) { errors.push(`${label}: exact prose evidence is required`); return; }
  for (const [index, item] of evidence.entries()) {
    if (!text(item?.excerpt) || item.excerpt.trim().length < 15 || !text(item?.locator)) errors.push(`${label}[${index}]: excerpt of at least 15 characters and locator are required`);
    else if (!body?.includes(item.excerpt)) errors.push(`${label}[${index}]: excerpt does not occur in the exact prose`);
  }
}

function sourceEvidenceAppears(body, evidence, label, errors) {
  let packet;
  try { packet = JSON.parse(body); } catch { /* Plain source documents retain exact-text matching. */ }
  const newsPacket = Array.isArray(packet?.sources) &&
    (typeof packet.completeArtifact === "string" || packet.schemaVersion === "laidies-newsstand-source-evidence.v1");
  if (!newsPacket) return evidenceAppears(body, evidence, label, errors);
  if (!Array.isArray(evidence) || evidence.length === 0) return evidenceAppears(null, evidence, label, errors);
  for (const [index, item] of evidence.entries()) {
    // Decode JSON quoting, but search only the cited source's supplied passages.
    // Candidate prose, instructions and the claim map cannot corroborate themselves.
    const passages = packet.sources.flatMap(row => {
      const source = row.source || row;
      return source.url === item?.locator ? [source.passage, source.additionalPassage].filter(text) : [];
    });
    evidenceAppears(passages.join("\n"), [item], `${label}[${index}]`, errors);
  }
}

function samplingOverrideFor(receipt, root, errors) {
  const override = receipt?.samplingOverride;
  if (!override) return null;
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(receipt?.stage === "INDEPENDENT_SEMANTIC_ADMISSION", "samplingOverride is only available to independent review");
  require(receipt?.surface === "NEWSSTAND_RECURRING_SERVICE_COLUMNS", "samplingOverride is limited to NEWSSTAND_RECURRING_SERVICE_COLUMNS");
  require(override?.policy?.path === NEWSSTAND_SAMPLING_POLICY, "samplingOverride must bind the canonical NewsStand sampling policy");
  const policyBody = loadBinding(root, override?.policy, "samplingOverride.policy", errors);
  if (!policyBody) return null;
  let policy;
  try { policy = JSON.parse(policyBody); }
  catch (error) { errors.push(`samplingOverride.policy: invalid JSON: ${error.message}`); return null; }
  require(policy.schemaVersion === "laidies-newsstand-recurring-service-sampling-policy.v1", "samplingOverride policy schemaVersion mismatch");
  require(policy.policyId === override.policyId, "samplingOverride policyId mismatch");
  require(validDateOnly(policy.authorizedOn), "samplingOverride policy authorizedOn is invalid");
  require(policy.surface === receipt.surface, "samplingOverride policy surface mismatch");
  require(Array.isArray(policy.allowedContentClasses) && policy.allowedContentClasses.includes(receipt.contentClass), "samplingOverride contentClass is not authorized");
  require(!policy.excludedContentClasses?.includes(receipt.contentClass), "samplingOverride contentClass is excluded");
  const entries = Array.isArray(policy.entries) ? policy.entries : [];
  require(entries.length > 0, "samplingOverride policy entries are required");
  require(entries.length === new Set(entries.map(item => item?.id)).size, "samplingOverride policy entry IDs must be unique");
  for (const [index, item] of entries.entries()) {
    require(text(item?.id) && text(item?.type), `samplingOverride policy entry ${index} needs id and type`);
    require(policy.allowedContentClasses?.includes(item?.contentClass), `samplingOverride policy entry ${item?.id || index} has an unauthorized contentClass`);
    require(item?.teachingEntry === true || item?.teachingEntry === false, `samplingOverride policy entry ${item?.id || index} needs teachingEntry`);
  }
  require(Number.isInteger(policy.sampling?.minimumTeachingEntriesPerBatch) && policy.sampling.minimumTeachingEntriesPerBatch >= 1, "samplingOverride policy minimumTeachingEntriesPerBatch is invalid");
  require(policy.sampling?.humanEvidenceClaim === "NONE", "samplingOverride policy must not claim human evidence");
  const entry = entries.find(item => item?.id === receipt.candidateId);
  require(Boolean(entry), "samplingOverride candidateId is not in the authorized NewsStand inventory");
  require(entry?.contentClass === receipt.contentClass, "samplingOverride candidate contentClass does not match the authorized inventory");
  require(entry?.type === override.serviceType, "samplingOverride serviceType does not match the authorized inventory");
  require(override.sampleStatus === "PENDING_BATCH_SAMPLE" && policy.sampling?.status === "PENDING", "samplingOverride may only report an honestly pending batch sample");
  require(override.correctionFeedbackStatus === policy.sampling?.correctionFeedback, "samplingOverride correction-feedback status mismatch");
  const queue = Array.isArray(override.sampleQueue) ? override.sampleQueue : [];
  require(queue.length === new Set(queue).size, "samplingOverride sampleQueue IDs must be unique");
  require(queue.includes(receipt.candidateId), "samplingOverride sampleQueue must include this candidate");
  const queued = queue.map(id => entries.find(item => item?.id === id));
  require(queued.every(Boolean), "samplingOverride sampleQueue contains an unauthorized candidate");
  require(queued.filter(item => item?.teachingEntry === true).length >= policy.sampling?.minimumTeachingEntriesPerBatch, "samplingOverride sampleQueue must include the policy minimum teaching entry");
  require(receipt.limitations?.includes("No observed human-comprehension evidence is claimed for this entry; batch sampling is pending."), "samplingOverride must disclose that observed human-comprehension evidence is not claimed");
  return policy;
}

function serviceReviewFloorPolicyFor(receipt, root, errors) {
  const binding = receipt?.reviewFloorPolicy;
  if (!binding) return null;
  const require = (condition, message) => { if (!condition) errors.push(`reviewFloorPolicy: ${message}`); };
  require(binding && typeof binding === "object" && !Array.isArray(binding) && Object.keys(binding).sort().join("\n") === ["path", "policyId", "sha256"].join("\n"), "binding must contain only path, policyId, and sha256");
  require(["PRODUCER_SELF_REVIEW", "INDEPENDENT_SEMANTIC_ADMISSION"].includes(receipt.stage), "stage is not authorized");
  require(receipt.surface === "NEWSSTAND_RECURRING_SERVICE_COLUMNS", "limited to NEWSSTAND_RECURRING_SERVICE_COLUMNS");
  require(binding.path === SERVICE_REVIEW_FLOOR_POLICY, "canonical policy path required");
  const body = loadBinding(root, binding, "reviewFloorPolicy", errors);
  if (!body) return null;
  let policy;
  try { policy = JSON.parse(body); }
  catch { errors.push("reviewFloorPolicy: invalid policy JSON"); return null; }
  require(policy.schemaVersion === "laidies-newsstand-recurring-service-review-floor-policy.v1", "schemaVersion mismatch");
  require(policy.policyId === binding.policyId, "policyId mismatch");
  require(policy.status === "ACTIVE", "policy status is not ACTIVE");
  require(policy.surface === receipt.surface, "surface mismatch");
  require(Array.isArray(policy.allowedContentClasses) && policy.allowedContentClasses.includes(receipt.contentClass), "contentClass is not authorized");
  require(Array.isArray(policy.allowedStages) && policy.allowedStages.includes(receipt.stage), "stage is not authorized by policy");
  require(policy.mode === "ALLOW_EQUAL_ZERO_ISSUES_ONE_CYCLE_SUCCESSOR_V1", "mode mismatch");
  require(text(policy.reviewedNotBefore) && !Number.isNaN(Date.parse(policy.reviewedNotBefore)) && Date.parse(receipt.reviewedAt) >= Date.parse(policy.reviewedNotBefore), "review predates this approval");
  return policy;
}

function newsEditorialAnalysisFor(receipt, root, errors) {
  const profile = receipt?.newsEditorialReview;
  if (!profile) return null;
  const require = (ok, message) => { if (!ok) errors.push(`newsEditorialReview: ${message}`); };
  require(receipt.stage === "INDEPENDENT_SEMANTIC_ADMISSION" && receipt.surface === "NEWSSTAND_DAILY" && receipt.contentClass === "NEWS", "limited to independent ordinary NEWSSTAND_DAILY NEWS review");
  require(!receipt.samplingOverride, "cannot combine with service sampling");
  require(profile.policy?.path === NEWS_EDITORIAL_POLICY, "canonical policy path required");
  const policyText = loadBinding(root, profile.policy, "newsEditorialReview.policy", errors);
  const analysisText = loadBinding(root, profile.analysis, "newsEditorialReview.analysis", errors);
  let policy, analysis;
  try { policy = JSON.parse(policyText); analysis = JSON.parse(analysisText); }
  catch { errors.push("newsEditorialReview: invalid policy/analysis JSON"); return null; }
  require(policy?.policyId === "ordinary-news-ai-editorial-review-2026-08-31" && policy?.status === "ACTIVE" && policy?.surface === "NEWSSTAND_DAILY" && policy?.contentClass === "NEWS" && policy?.humanCheckRequired === false, "policy scope/status mismatch");
  require(Date.parse(receipt.reviewedAt) >= Date.parse("2026-08-31T00:00:00-07:00"), "cannot retrospectively waive older reviews");
  require(analysis?.evidenceType === "AI_EDITORIAL_ANALYSIS", "analysis must declare AI_EDITORIAL_ANALYSIS");
  require(analysis?.candidateId === receipt.candidateId && analysis?.reviewerPrincipalId === receipt.reviewer?.principalId && analysis?.reviewTextSha256 === receipt.artifact?.reviewText?.sha256, "analysis must bind exact candidate, prose and independent reviewer");
  require(receipt.limitations?.includes("AI editorial assessment only; no observed human-comprehension evidence is claimed."), "must disclose absence of observed human evidence");
  return { ...analysis, calibrationPolicy: policy.calibration, reviewMetricsPolicy: policy.reviewMetrics };
}

export function inspectProseQualityReview(receipt, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  let registry;
  let registryBytes;
  try {
    registryBytes = fs.readFileSync(path.join(root, REGISTRY));
    registry = JSON.parse(registryBytes.toString("utf8"));
  }
  catch (error) { return { errors: [`exemplar registry unavailable: ${error.message}`], verdict: null }; }

  require(receipt?.schemaVersion === "laidies-prose-quality-review.v1", "schemaVersion mismatch");
  require(["PRODUCER_SELF_REVIEW", "INDEPENDENT_SEMANTIC_ADMISSION"].includes(receipt?.stage), "stage is invalid");
  require(Boolean(REQUIRED_BY_CLASS[receipt?.contentClass]), "contentClass is invalid");
  require(text(receipt?.candidateId) && text(receipt?.surface) && text(receipt?.maker), "candidateId, surface and maker are required");
  require(receipt?.reviewMode === "EXACT_PROSE_IN_FULL", "reviewer must read the exact prose in full");
  require(text(receipt?.reviewer?.id) && text(receipt?.reviewer?.principalId) && text(receipt?.reviewer?.role), "reviewer identity, principalId and role are required");
  if (receipt?.stage === "PRODUCER_SELF_REVIEW") require(receipt?.reviewer?.principalId === receipt?.maker, "producer self-review must be performed by the maker");
  if (receipt?.stage === "INDEPENDENT_SEMANTIC_ADMISSION") {
    require(receipt?.reviewer?.principalId !== receipt?.maker, "independent semantic admission cannot be maker self-review or alias");
    require(receipt?.reviewer?.independentFromMaker === true, "independent reviewer must attest independence from maker");
    require(receipt?.reviewer?.artifactFirst === true, "independent reviewer must begin with the artifact");
  }
  require(text(receipt?.reviewedAt) && !Number.isNaN(Date.parse(receipt?.reviewedAt)), "reviewedAt must be an ISO date-time");
  require(["PASS", "HOLD", "REJECT"].includes(receipt?.verdict), "verdict is invalid");
  require(Array.isArray(receipt?.limitations), "limitations must be an array");
  const samplingPolicy = samplingOverrideFor(receipt, root, errors);
  const newsAnalysis = newsEditorialAnalysisFor(receipt, root, errors);
  const serviceReviewFloorPolicy = serviceReviewFloorPolicyFor(receipt, root, errors);

  const artifactBody = loadBinding(root, receipt?.artifact?.reviewText, "artifact.reviewText", errors);
  if (newsAnalysis) {
    for (const name of ["incidentExplained", "termsExplainedInContext", "readerConsequenceSpecific", "noInternalNotesOrInventedAdvice"]) {
      const check = newsAnalysis.checks?.[name];
      require(["PASS", "HOLD", "FAIL"].includes(check?.verdict) && text(check?.observation), `newsEditorialReview.${name} requires verdict and specific assessment`);
      evidenceAppears(artifactBody, check?.artifactEvidence, `newsEditorialReview.${name}`, errors);
      if (receipt.verdict === "PASS") require(check?.verdict === "PASS", `PASS forbidden: newsEditorialReview.${name} did not pass`);
    }
  }
  const manifestBody = loadBinding(root, receipt?.artifact?.manifest, "artifact.manifest", errors);
  if (receipt?.artifact?.rendered) loadBinding(root, receipt.artifact.rendered, "artifact.rendered", errors);
  if (manifestBody) {
    try {
      const manifest = JSON.parse(manifestBody);
      require(manifest.schemaVersion === "laidies-content-artifact-manifest.v1", "artifact manifest schemaVersion mismatch");
      require(manifest.candidateId === receipt.candidateId, "artifact manifest candidateId mismatch");
      require(manifest.surface === receipt.surface, "artifact manifest surface mismatch");
      require(manifest.contentClass === receipt.contentClass, "artifact manifest contentClass mismatch");
      require(manifest.reviewText?.path === receipt.artifact.reviewText?.path && manifest.reviewText?.sha256 === receipt.artifact.reviewText?.sha256, "artifact manifest is not bound to the reviewed prose");
      if (receipt.artifact.rendered) require(manifest.rendered?.path === receipt.artifact.rendered.path && manifest.rendered?.sha256 === receipt.artifact.rendered.sha256, "artifact manifest is not bound to the rendered artifact");
    } catch (error) {
      if (error instanceof SyntaxError) errors.push(`artifact.manifest: invalid JSON: ${error.message}`);
    }
  }

  const negativeRegistry = new Map((registry.negativeExemplars || []).map(item => [item.id, item]));
  const enforcedFamilies = enforcedFailureFamilies(registry);
  require(receipt?.calibration?.registrySha256 === sha256(registryBytes), "calibration registrySha256 is stale");
  require(receipt?.calibration?.reviewerPrincipalId === receipt?.reviewer?.principalId, "calibration reviewer does not match candidate reviewer");
  require(text(receipt?.calibration?.reviewedAt) && Date.parse(receipt.calibration.reviewedAt) <= Date.parse(receipt.reviewedAt), "calibration must be completed by this reviewer before candidate review");
  const suppliedNegatives = new Map((receipt?.calibration?.negatives || []).map(item => [item.exemplarId, item]));
  const newsRejectionCalibration = receipt?.calibration?.mode === "ORDINARY_NEWS_BLIND_REJECTION_V1" && newsAnalysis?.calibrationPolicy?.mode === "ORDINARY_NEWS_BLIND_REJECTION_V1";
  const serviceRejectionCalibration = receipt?.calibration?.mode === "RECURRING_SERVICE_ARTIFACT_REJECTION_V1" &&
    samplingPolicy?.calibration?.mode === "RECURRING_SERVICE_ARTIFACT_REJECTION_V1" &&
    receipt.stage === "INDEPENDENT_SEMANTIC_ADMISSION" && receipt.surface === "NEWSSTAND_RECURRING_SERVICE_COLUMNS" &&
    Date.parse(receipt.reviewedAt) >= Date.parse("2026-09-05T00:00:00-07:00");
  require(suppliedNegatives.size === negativeRegistry.size, "every registered negative exemplar must be calibrated");
  for (const [id, negative] of negativeRegistry) {
    const calibration = suppliedNegatives.get(id);
    require(Boolean(calibration), `registered negative calibration ${id} is required`);
    const negativeBody = loadBinding(root, { path: negative.path, sha256: negative.sha256 }, `calibration.negatives.${id}`, errors);
    require(calibration?.verdict === "REJECT", `known-bad calibration ${id} must be rejected`);
    if (newsRejectionCalibration) {
      const known = negative.failureFamilies || [];
      const assessed = calibration?.familyAssessments || {};
      for (const family of known) {
        const judgment = assessed[family];
        require(["clear", "present", "uncertain"].includes(judgment?.state) && text(judgment?.observation) && text(judgment?.artifactLocator), `known-bad calibration ${id} must assess ${family}`);
      }
      const present = known.filter(family => assessed[family]?.state === "present");
      require(present.length > 0, `known-bad calibration ${id} requires a relevant registered reason for rejection`);
      require(present.every(family => calibration?.identifiedFailureFamilies?.includes(family)), `known-bad calibration ${id} identified families do not match its actual findings`);
    } else if (serviceRejectionCalibration) {
      require((negative.failureFamilies || []).some(family => calibration?.identifiedFailureFamilies?.includes(family)), `known-bad calibration ${id} requires a relevant registered reason for rejection`);
    } else {
      for (const family of negative?.failureFamilies || []) require(calibration?.identifiedFailureFamilies?.includes(family), `known-bad calibration ${id} missed ${family}`);
    }
    evidenceAppears(negativeBody, calibration?.evidence, `calibration.negatives.${id}.evidence`, errors);
  }

  const positiveRegistry = new Map((registry.positiveExemplars || []).map(item => [item.id, item]));
  const positive = positiveRegistry.get(receipt?.calibration?.positive?.exemplarId);
  require(Boolean(positive), "registered positive calibration is required");
  let positiveBody = null;
  if (positive) {
    const serviceVoiceCalibration = receipt.surface === "NEWSSTAND_RECURRING_SERVICE_COLUMNS" &&
      positive.id === "CQX-GOOD-EPISODE-001" &&
      receipt.calibration?.positive?.application === "VOICE_ONLY_NO_FACT_OR_FORMAT_INHERITANCE";
    require(positive.useFor.includes(receipt.contentClass) || serviceVoiceCalibration, `positive exemplar ${positive.id} is not approved for ${receipt.contentClass}`);
    positiveBody = loadBinding(root, { path: positive.path, sha256: positive.sha256 }, "calibration.positive", errors);
  }
  require(receipt?.calibration?.positive?.verdict === "PASS", "positive calibration must be recognized as PASS");
  require(Array.isArray(receipt?.calibration?.positive?.strengthsRetained) && receipt.calibration.positive.strengthsRetained.length > 0, "positive calibration must name strengths retained without copying its template");
  evidenceAppears(positiveBody, receipt?.calibration?.positive?.evidence, "calibration.positive.evidence", errors);

  for (const field of ["humanQuestion", "promisedPayoff", "centralMentalModel", "dailyLifeConnection", "surfaceJob", "desiredReaderFeeling"]) require(text(receipt?.reverseBrief?.[field]), `reverseBrief.${field} is required`);

  const requiredOutcomes = REQUIRED_BY_CLASS[receipt?.contentClass] || [];
  for (const outcomeName of requiredOutcomes) {
    const outcome = receipt?.outcomes?.[outcomeName];
    require(Boolean(outcome), `required outcome ${outcomeName} is missing`);
    require(["PASS", "HOLD", "FAIL"].includes(outcome?.verdict), `outcome ${outcomeName} verdict is invalid`);
    require(text(outcome?.observation), `outcome ${outcomeName} needs a specific observation`);
    evidenceAppears(artifactBody, outcome?.artifactEvidence, `outcomes.${outcomeName}.artifactEvidence`, errors);
    if (["explainBack", "unseenTransfer"].includes(outcomeName)) {
      require(!outcome?.aiEditorialAnalysis || Boolean(newsAnalysis), `${outcomeName}: AI analysis requires authorized ordinary-news profile`);
      require(!outcome?.readerEvidence, `${outcomeName}.readerEvidence is retired because it could not distinguish simulation from observation`);
      if (receipt?.stage === "PRODUCER_SELF_REVIEW") {
        const probe = outcome?.simulatedReaderProbe;
        for (const field of ["prompt", "probeResponse", "expectedEvidence"]) require(text(probe?.[field]), `${outcomeName}.simulatedReaderProbe.${field} is required`);
        require(!outcome?.observedReaderEvidence, `${outcomeName}: producer simulation cannot occupy observedReaderEvidence`);
      } else if (newsAnalysis) {
        require(!outcome?.observedReaderEvidence && !outcome?.simulatedReaderProbe, `${outcomeName}: AI editorial analysis cannot claim observed humans or reuse producer simulation`);
        const analysis = outcome?.aiEditorialAnalysis;
        require(analysis?.evidenceType === "AI_EDITORIAL_ANALYSIS", `${outcomeName}: explicitly labelled AI editorial analysis required`);
        for (const field of ["prompt", "response", "expectedEvidence", "assessment"]) require(text(analysis?.[field]), `${outcomeName}.aiEditorialAnalysis.${field} is required`);
        require(Boolean(analysis) && JSON.stringify(analysis) === JSON.stringify(newsAnalysis.outcomes?.[outcomeName]), `${outcomeName}: AI analysis must match bound independent report`);
        if (outcomeName === "unseenTransfer") require(analysis?.prompt !== receipt.outcomes?.explainBack?.aiEditorialAnalysis?.prompt, "unseenTransfer requires a different case, not repeated explain-back");
      } else if (samplingPolicy) {
        require(!outcome?.observedReaderEvidence, `${outcomeName}: pending batch sampling cannot claim observedReaderEvidence`);
        require(!outcome?.simulatedReaderProbe, `${outcomeName}: independent review cannot substitute a simulated reader probe`);
      } else {
        const observed = outcome?.observedReaderEvidence;
        require(observed?.evidenceType === "OBSERVED_HUMAN", `${outcomeName}.observedReaderEvidence must declare OBSERVED_HUMAN`);
        require(text(observed?.administratorPrincipalId), `${outcomeName}.observedReaderEvidence.administratorPrincipalId is required`);
        require(Array.isArray(observed?.participants), `${outcomeName}.observedReaderEvidence.participants is required`);
        const minimum = receipt?.surface === "LIBRAIRY" && receipt?.verdict === "PASS" ? 3 : 1;
        require((observed?.participants || []).length >= minimum, `${outcomeName}.observedReaderEvidence requires at least ${minimum} participant(s)`);
        const ids = new Set();
        const bindings = new Set();
        for (const [index, participant] of (observed?.participants || []).entries()) {
          for (const field of ["participantId", "prompt", "verbatimResponse", "expectedEvidence", "observedAt"]) require(text(participant?.[field]), `${outcomeName}.observedReaderEvidence.participants[${index}].${field} is required`);
          require(!Number.isNaN(Date.parse(participant?.observedAt)), `${outcomeName}.observedReaderEvidence.participants[${index}].observedAt must be an ISO date-time`);
          require(!ids.has(participant?.participantId), `${outcomeName}.observedReaderEvidence participant IDs must be unique`);
          ids.add(participant?.participantId);
          const binding = participant?.observationBinding;
          loadBinding(root, binding, `${outcomeName}.observedReaderEvidence.participants[${index}].observationBinding`, errors);
          const bindingKey = `${binding?.path || ""}:${binding?.sha256 || ""}`;
          require(!bindings.has(bindingKey), `${outcomeName}.observedReaderEvidence observation bindings must be participant-specific`);
          bindings.add(bindingKey);
        }
      }
    }
    if (receipt?.verdict === "PASS") require(outcome?.verdict === "PASS", `PASS forbidden: ${outcomeName} did not pass`);
  }

  for (const family of enforcedFamilies) {
    const finding = receipt?.failureFamilies?.[family];
    require(typeof finding?.present === "boolean", `failureFamilies.${family}.present is required`);
    require(text(finding?.observation) && text(finding?.artifactLocator), `failureFamilies.${family} needs an observation and locator`);
    if (receipt?.verdict === "PASS") require(finding?.present === false, `PASS forbidden: ${family} is present`);
  }

  require(["CLAIMS_REVIEWED", "NO_MATERIAL_CLAIMS"].includes(receipt?.factualReview?.disposition), "factualReview disposition is invalid");
  if (receipt?.factualReview?.disposition === "CLAIMS_REVIEWED") {
    require(Array.isArray(receipt.factualReview.sourceBindings) && receipt.factualReview.sourceBindings.length > 0, "factual claims require bound sources");
    for (const [index, binding] of (receipt.factualReview.sourceBindings || []).entries()) loadBinding(root, binding, `factualReview.sourceBindings[${index}]`, errors);
    require(Array.isArray(receipt.factualReview.claimMap) && receipt.factualReview.claimMap.length > 0, "factual claims require a claim-to-source map");
    for (const [index, claim] of (receipt.factualReview.claimMap || []).entries()) {
      require(text(claim?.claimId), `factualReview.claimMap[${index}].claimId is required`);
      require(["VERIFIED", "QUALIFIED"].includes(claim?.status), `factualReview.claimMap[${index}].status is invalid`);
      evidenceAppears(artifactBody, claim?.candidateEvidence, `factualReview.claimMap[${index}].candidateEvidence`, errors);
      const sourceBody = loadBinding(root, claim?.sourceBinding, `factualReview.claimMap[${index}].sourceBinding`, errors);
      const sourceRegistered = (receipt.factualReview.sourceBindings || []).some(binding => binding.path === claim?.sourceBinding?.path && binding.sha256 === claim?.sourceBinding?.sha256);
      require(sourceRegistered, `factualReview.claimMap[${index}] source is not in sourceBindings`);
      sourceEvidenceAppears(sourceBody, claim?.sourceEvidence, `factualReview.claimMap[${index}].sourceEvidence`, errors);
      require(text(claim?.scopeAndFreshness), `factualReview.claimMap[${index}].scopeAndFreshness is required`);
    }
  } else {
    require(text(receipt?.factualReview?.rationale), "NO_MATERIAL_CLAIMS requires a rationale");
    require(text(receipt?.factualReview?.claimScan?.observation), "NO_MATERIAL_CLAIMS requires an exact-prose claim scan");
    evidenceAppears(artifactBody, receipt?.factualReview?.claimScan?.artifactEvidence, "factualReview.claimScan.artifactEvidence", errors);
  }
  for (const field of ["reviewedThrough", "nextTrigger", "correctionOwner"]) require(text(receipt?.factualReview?.[field]), `factualReview.${field} is required`);

  let producerNewsMetrics = false;
  if (receipt?.reviewMetricsPolicy) {
    const inScope = receipt.stage === "PRODUCER_SELF_REVIEW" && receipt.surface === "NEWSSTAND_DAILY" && receipt.contentClass === "NEWS";
    require(inScope, "reviewMetricsPolicy is limited to ordinary NEWSSTAND_DAILY NEWS producer review");
    require(receipt.reviewMetricsPolicy.path === NEWS_EDITORIAL_POLICY, "producer review metrics must bind the current ordinary-news policy");
    require(Date.parse(receipt.reviewedAt) >= Date.parse("2026-09-05T00:00:00-07:00"), "producer review metrics cannot retrospectively waive older reviews");
    const body = loadBinding(root, receipt.reviewMetricsPolicy, "reviewMetricsPolicy", errors);
    if (body) {
      try {
        const policy = JSON.parse(body);
        const approved = policy.status === "ACTIVE" && policy.surface === "NEWSSTAND_DAILY" && policy.contentClass === "NEWS" && policy.reviewMetrics?.mode === "IMPROVEMENT_METRICS_NOT_PUBLICATION_BLOCKERS_V1";
        require(approved, "producer review metrics policy scope/status mismatch");
        producerNewsMetrics = inScope && approved;
      } catch { errors.push("reviewMetricsPolicy: invalid policy JSON"); }
    }
  }
  const newsImprovementMetrics = producerNewsMetrics || newsAnalysis?.reviewMetricsPolicy?.mode === "IMPROVEMENT_METRICS_NOT_PUBLICATION_BLOCKERS_V1";
  if (newsImprovementMetrics) {
    // Historical production counts stay visible; current outcomes and families above still gate PASS.
    for (const field of ["repeatedKnownDefects", "objectiveDefectsFirstFoundAtReview", "reviewIssues", "reviewCycles"]) {
      require(Number.isInteger(receipt?.ratchet?.[field]) && receipt.ratchet[field] >= (field === "reviewCycles" ? 1 : 0), `ratchet.${field} must retain a valid actual count`);
    }
    if (receipt?.ratchet?.priorComparable) {
      for (const field of ["reviewIssues", "reviewCycles"]) require(Number.isInteger(receipt.ratchet.priorComparable[field]) && receipt.ratchet.priorComparable[field] >= (field === "reviewCycles" ? 1 : 0), `ratchet.priorComparable.${field} must retain a valid actual count`);
    }
  } else {
    require(receipt?.ratchet?.repeatedKnownDefects === 0 || receipt?.verdict !== "PASS", "PASS forbidden with a repeated known defect");
    require(receipt?.ratchet?.objectiveDefectsFirstFoundAtReview === 0 || receipt?.verdict !== "PASS", "PASS forbidden with an objective defect first found at review");
  }
  require(["FIRST", "SUCCESSOR"].includes(receipt?.lineage?.kind), "lineage.kind is required");
  if (receipt?.lineage?.kind === "SUCCESSOR") {
    require(text(receipt?.lineage?.predecessorCandidateId), "successor lineage requires predecessorCandidateId");
    require(Boolean(receipt?.ratchet?.priorComparable), "successor must bind a prior comparable candidate");
  } else {
    require(text(receipt?.lineage?.noComparableReason), "first candidate requires a noComparableReason");
  }
  if (serviceReviewFloorPolicy) {
    require(receipt?.verdict === "PASS", "only a clean PASS may use the zero-floor policy");
    require(receipt?.lineage?.kind === "SUCCESSOR" && receipt?.ratchet?.priorComparable?.candidateId === receipt?.lineage?.predecessorCandidateId, "must bind the exact predecessor as priorComparable");
    require(receipt?.ratchet?.repeatedKnownDefects === 0 && receipt?.ratchet?.objectiveDefectsFirstFoundAtReview === 0, "current known or objective defects cannot use the zero-floor policy");
    require(receipt?.ratchet?.reviewIssues === 0 && receipt?.ratchet?.reviewCycles === 1, "current review counts must be zero issues and one cycle");
    require(receipt?.ratchet?.priorComparable?.reviewIssues === 0 && receipt?.ratchet?.priorComparable?.reviewCycles === 1, "prior comparable counts must be zero issues and one cycle");
  }
  if (receipt?.ratchet?.priorComparable && !newsImprovementMetrics && !serviceReviewFloorPolicy) {
    require(receipt.ratchet.reviewIssues < receipt.ratchet.priorComparable.reviewIssues, "review issues did not decrease against the comparable candidate");
    require(receipt.ratchet.reviewCycles < receipt.ratchet.priorComparable.reviewCycles, "review cycles did not decrease against the comparable candidate");
  }
  require(receipt?.ratchet?.onKnownDefect === "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW", "known defects must repair the producer before another review");

  const learning = receipt?.learningDisposition;
  require(["NO_NEW_DEFECT", "REUSABLE_DEFECT_RECORDED", "CANDIDATE_REPAIR_ONLY", "EVIDENCE_GAP"].includes(learning?.disposition), "learningDisposition is required");
  require(text(learning?.rationale), "learningDisposition.rationale is required");
  if (receipt?.verdict === "PASS") require(learning?.disposition === "NO_NEW_DEFECT", "PASS must record NO_NEW_DEFECT");
  if (["HOLD", "REJECT"].includes(receipt?.verdict)) require(learning?.disposition !== "NO_NEW_DEFECT", "HOLD/REJECT must disposition the learning gap");
  if (learning?.disposition === "REUSABLE_DEFECT_RECORDED") {
    const recordBody = loadBinding(root, learning.recordBinding, "learningDisposition.recordBinding", errors);
    if (recordBody) {
      try {
        const record = JSON.parse(recordBody);
        require(record.schemaVersion === "laidies-content-quality-learning-record.v1", "learning record schemaVersion mismatch");
        require(record.candidateId === receipt.candidateId, "learning record candidateId mismatch");
        require(record.artifactSha256 === receipt.artifact?.reviewText?.sha256, "learning record artifact mismatch");
        require(record.status === "PENDING_OWNER_ADMISSION", "new reusable learning must await owner admission");
        require(Array.isArray(record.failureFamilies) && record.failureFamilies.length > 0, "learning record requires failure families");
      } catch (error) {
        if (error instanceof SyntaxError) errors.push(`learning record invalid JSON: ${error.message}`);
      }
    }
  }

  if (artifactBody && [...negativeRegistry.values()].some(negative => sha256(Buffer.from(artifactBody)) === negative.sha256) && receipt?.verdict === "PASS") errors.push("exact known-bad prose cannot receive PASS");
  return { errors, verdict: receipt?.verdict || null, qualityAuthority: receipt?.stage === "INDEPENDENT_SEMANTIC_ADMISSION" ? "INDEPENDENT_REVIEW" : "NONE" };
}

export function inspectProseReviewChain(producer, independent, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  const producerResult = inspectProseQualityReview(producer, { root });
  const independentResult = inspectProseQualityReview(independent, { root });
  errors.push(...producerResult.errors.map(error => `producer:${error}`));
  errors.push(...independentResult.errors.map(error => `independent:${error}`));
  require(producer?.stage === "PRODUCER_SELF_REVIEW", "producer stage must be PRODUCER_SELF_REVIEW");
  require(independent?.stage === "INDEPENDENT_SEMANTIC_ADMISSION", "independent stage must be INDEPENDENT_SEMANTIC_ADMISSION");
  for (const field of ["candidateId", "surface", "contentClass"]) require(producer?.[field] === independent?.[field], `cross-stage ${field} mismatch`);
  for (const field of ["reviewText", "manifest", "rendered"]) {
    const left = producer?.artifact?.[field];
    const right = independent?.artifact?.[field];
    if (!left && !right) continue;
    require(left?.path === right?.path && left?.sha256 === right?.sha256, `cross-stage artifact.${field} mismatch`);
  }
  const producerTime = Date.parse(producer?.reviewedAt);
  const independentTime = Date.parse(independent?.reviewedAt);
  require(Number.isFinite(producerTime) && Number.isFinite(independentTime) && producerTime < independentTime, "producer review must precede independent review");
  require(text(producer?.reviewer?.modelFamily), "producer reviewer.modelFamily is required for structural independence");
  require(text(independent?.reviewer?.modelFamily), "independent reviewer.modelFamily is required for structural independence");
  require(producer?.reviewer?.modelFamily !== independent?.reviewer?.modelFamily, "maker and independent judge must use different model families");
  require(producer?.reviewer?.principalId !== independent?.reviewer?.principalId, "maker and independent judge principal must differ");
  return { errors };
}

function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: node scripts/check-prose-quality-admission.mjs <receipt.json>"); process.exit(2); }
  let receipt;
  try { receipt = JSON.parse(fs.readFileSync(path.resolve(file), "utf8")); }
  catch (error) { console.error(`PROSE QUALITY RECEIPT FAIL\n- ${error.message}`); process.exit(1); }
  const result = inspectProseQualityReview(receipt);
  if (result.errors.length) {
    console.error("PROSE QUALITY RECEIPT FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`PROSE QUALITY RECEIPT INTEGRITY MATCH verdict=${result.verdict} quality_authority=${result.qualityAuthority}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
