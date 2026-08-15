#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const COMMUNICATION_BENCHMARK = "operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md";
const EXPLANATION_REASONING_BENCHMARK = "operations/product-stewards/learning-content-ecosystem/LAIDIES-EXPLANATION-AND-EDITORIAL-REASONING-BENCHMARK.md";
const PUBLICATION_PIPELINES = "operations/product-stewards/learning-content-ecosystem/PUBLICATION-PIPELINES.json";
const EDITORIAL_PRODUCTION_METHOD = "operations/product-stewards/newsstand/EDITORIAL-PRODUCTION-METHOD-V2.md";
const NEWSSTAND_STORY_METHOD = "operations/product-stewards/newsstand/NEWSSTAND-STORY-TEMPLATE.md";
const HASH = /^[a-f0-9]{64}$/;
const CONTENT_CLASSES = new Set(["EPISODE", "CLASS", "EXPLANATION", "REFERENCE", "FAQ", "NEWS", "PRACTICE", "INTERACTIVE", "PROMOTIONAL", "MICROCOPY"]);
const FULL_COMMUNICATION_CLASSES = new Set(["EPISODE", "CLASS", "EXPLANATION"]);
const PROPORTIONAL_COMMUNICATION_CLASSES = new Set(["REFERENCE", "FAQ", "NEWS", "PRACTICE", "INTERACTIVE"]);
const PAIRED_EXAMPLE_CLASSES = new Set([...FULL_COMMUNICATION_CLASSES, ...PROPORTIONAL_COMMUNICATION_CLASSES]);
const COMMUNICATION_DIMENSIONS = [
  "humanQuestion", "usefulCuriosity", "invisibleProcessConcrete",
  "familiarTechnicalMovement", "limitationsConsequences", "humourSurprise",
  "betterNextQuestion"
];

const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const text = value => typeof value === "string" && value.trim().length > 0;
const array = (value, minimum = 1) => Array.isArray(value) && value.length >= minimum;

function boundFile(root, binding, label, errors) {
  if (!binding || !text(binding.path) || !HASH.test(binding.sha256 || "")) {
    errors.push(`${label}: exact path and SHA-256 are required`);
    return;
  }
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute)) {
    errors.push(`${label}: bound file is missing or outside the repository`);
    return;
  }
  const actual = sha256(fs.readFileSync(absolute));
  if (actual !== binding.sha256) errors.push(`${label}: SHA-256 mismatch expected=${binding.sha256} actual=${actual}`);
}

export function inspectContentProducerContract(contract, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  let registry;
  let registryBytes;
  try {
    registryBytes = fs.readFileSync(path.join(root, REGISTRY));
    registry = JSON.parse(registryBytes.toString("utf8"));
  }
  catch (error) { return { errors: [`exemplar registry unavailable: ${error.message}`], status: null }; }

  require(contract?.schemaVersion === "laidies-content-producer-contract.v1", "schemaVersion mismatch");
  require(text(contract?.candidateId), "candidateId is required");
  require(text(contract?.surface), "surface is required");
  require(CONTENT_CLASSES.has(contract?.contentClass), "contentClass is invalid");
  require(text(contract?.producer), "producer identity is required");
  require(["READY_TO_DRAFT", "REPAIR_PRODUCER", "SUPERSEDED"].includes(contract?.status), "status is invalid");

  if (contract?.contentClass === "NEWS") {
    const search = contract?.predecessorSearch;
    require(array(search?.searchedRoots, 2), "NEWS predecessorSearch.searchedRoots requires at least two repository roots");
    require(array(search?.queries, 3), "NEWS predecessorSearch.queries requires reader-question, format and mechanism searches");
    require(Array.isArray(search?.matches), "NEWS predecessorSearch.matches must be an array, including [] when no plausible artifact exists");
    for (const [index, match] of (search?.matches || []).entries()) {
      require(["CURRENT_PREDECESSOR", "SOURCE_MATERIAL_ONLY", "REJECTED_KNOWN_BAD", "DISTINCT_READER_JOB", "DUPLICATE_DO_NOT_BUILD"].includes(match?.disposition), `predecessorSearch.matches[${index}].disposition is invalid`);
      boundFile(root, match?.artifact, `predecessorSearch.matches[${index}].artifact`, errors);
    }
    require(["FIRST", "SUCCESSOR"].includes(search?.outcome), "NEWS predecessorSearch.outcome must be FIRST or SUCCESSOR");
    if (search?.outcome === "FIRST") require(text(search?.noComparableReason), "NEWS FIRST predecessor search requires noComparableReason");
    if (search?.outcome === "SUCCESSOR") {
      boundFile(root, search?.selectedPredecessor, "predecessorSearch.selectedPredecessor", errors);
      const selectedMatch = (search?.matches || []).some(match => match?.disposition === "CURRENT_PREDECESSOR" && match?.artifact?.path === search?.selectedPredecessor?.path && match?.artifact?.sha256 === search?.selectedPredecessor?.sha256);
      require(selectedMatch, "NEWS SUCCESSOR selectedPredecessor must match one CURRENT_PREDECESSOR artifact");
      require(text(search?.preserveAndImprove), "NEWS SUCCESSOR predecessorSearch.preserveAndImprove is required");
    }

    const plan = contract?.publicationPlan;
    require(text(plan?.workOrderId), "NEWS publicationPlan.workOrderId is required");
    require(contract?.candidateId === plan?.workOrderId, "NEWS candidateId must equal publicationPlan.workOrderId");
    require(text(plan?.formatId), "NEWS publicationPlan.formatId is required");
    require(["PRIMARY_OUTPUT", "CONTRIBUTING_EVIDENCE", "FOLLOW_UP_NEW_STORY", "UPDATE_LIVING_REFERENCE", "RELATED_READING"].includes(plan?.relationship), "NEWS publicationPlan.relationship is invalid");
    require(text(plan?.contributionJob), "NEWS publicationPlan.contributionJob is required");
    require(array(plan?.sourceVersionIds), "NEWS publicationPlan.sourceVersionIds is required");
    require(["STORY_CANDIDATE", "DATED_ISSUE", "LONGFORM_FEATURE", "LIVING_REFERENCE", "SERVICE_COLUMN"].includes(plan?.outputUnit), "NEWS publicationPlan.outputUnit is invalid");
    require(["HEADLINE_REALITY_CHECK", "PLAIN_LANGUAGE_EXPLAINER", "FORMAT_NATIVE_SERVICE"].includes(plan?.writingMode), "NEWS publicationPlan.writingMode is invalid");
    require(text(plan?.writingModeReason), "NEWS publicationPlan.writingModeReason is required");
    require(plan?.pipelineRegistry?.path === PUBLICATION_PIPELINES, `NEWS publicationPlan.pipelineRegistry.path must be ${PUBLICATION_PIPELINES}`);
    boundFile(root, plan?.pipelineRegistry, "NEWS publicationPlan.pipelineRegistry", errors);
    require(plan?.editorialMethod?.path === EDITORIAL_PRODUCTION_METHOD, `NEWS publicationPlan.editorialMethod.path must be ${EDITORIAL_PRODUCTION_METHOD}`);
    boundFile(root, plan?.editorialMethod, "NEWS publicationPlan.editorialMethod", errors);
    require(plan?.storyMethod?.path === NEWSSTAND_STORY_METHOD, `NEWS publicationPlan.storyMethod.path must be ${NEWSSTAND_STORY_METHOD}`);
    boundFile(root, plan?.storyMethod, "NEWS publicationPlan.storyMethod", errors);
    boundFile(root, plan?.premise, "NEWS publicationPlan.premise", errors);
    const qualification = plan?.qualification;
    for (const field of ["readerQuestion", "priorKnowledge", "unresolvedNeed", "whyNow", "uniquePayoff", "nearestAlternativeFormatId", "whyAlternativeWrong", "aidbDisposition"]) {
      require(text(qualification?.[field]), `NEWS publicationPlan.qualification.${field} is required`);
    }
    require(qualification?.nearestAlternativeFormatId !== plan?.formatId, "NEWS nearest alternative format must differ from the selected format");
    require(["COMPARED", "DATED_ABSENCE", "NOT_COVERED", "UNAVAILABLE"].includes(qualification?.aidbDisposition), "NEWS publicationPlan.qualification.aidbDisposition is invalid");

    let pipelines;
    let workOrders;
    try { pipelines = JSON.parse(fs.readFileSync(path.join(root, PUBLICATION_PIPELINES), "utf8")); }
    catch (error) { errors.push(`NEWS publication pipeline registry unavailable: ${error.message}`); }
    try { workOrders = JSON.parse(fs.readFileSync(path.join(root, "operations/product-stewards/learning-content-ecosystem/content-work-orders.json"), "utf8")); }
    catch (error) { errors.push(`NEWS work-order queue unavailable: ${error.message}`); }
    const format = (pipelines?.formats || []).find(item => item.id === plan?.formatId);
    require(Boolean(format), `NEWS publicationPlan.formatId is not registered: ${plan?.formatId || "missing"}`);
    const workOrder = (workOrders?.workOrders || []).find(item => item.id === plan?.workOrderId);
    require(Boolean(workOrder), `NEWS publicationPlan.workOrderId is not registered: ${plan?.workOrderId || "missing"}`);
    if (workOrder) {
      require(workOrder.surface === "NEWSSTAND", "NEWS publicationPlan work order must target NEWSSTAND");
      require((workOrder.publicationFormatIds || []).includes(plan?.formatId), "NEWS publicationPlan format is not declared by its work order");
      const route = (workOrder.formatRouting || []).find(item => item.publicationFormatId === plan?.formatId && item.relationship === plan?.relationship);
      require(Boolean(route), "NEWS publicationPlan does not match a work-order format route");
      if (route) {
        require(route.contributionJob === plan?.contributionJob, "NEWS publicationPlan contributionJob does not match its work order");
        require(JSON.stringify(route.sourceVersionIds) === JSON.stringify(plan?.sourceVersionIds), "NEWS publicationPlan sourceVersionIds do not match its work order");
      }
    }
    if (plan?.formatId === "news_daily" && plan?.outputUnit === "STORY_CANDIDATE") {
      require(plan?.issueBoundary === "STORY_REVIEW_PRECEDES_SEPARATE_DATED_ISSUE_ASSEMBLY", "NEWS Daily story must preserve the separate dated-issue boundary");
      require(text(plan?.issueAssemblyDisposition), "NEWS Daily story requires issueAssemblyDisposition");
      const budget = plan?.lengthBudget;
      require(Number.isInteger(budget?.minimumWords) && budget.minimumWords >= 300, "NEWS Daily story lengthBudget.minimumWords must be at least 300");
      require(Number.isInteger(budget?.maximumWords) && budget.maximumWords <= 900, "NEWS Daily story lengthBudget.maximumWords must be no more than 900");
      require(Number.isInteger(budget?.minimumWords) && Number.isInteger(budget?.maximumWords) && budget.minimumWords < budget.maximumWords, "NEWS Daily story length budget must have a valid range");
      require(text(budget?.reason), "NEWS Daily story lengthBudget.reason is required");
      require(Array.isArray(budget?.sectionJobs) && budget.sectionJobs.length >= 5, "NEWS Daily story lengthBudget.sectionJobs must name at least five unique jobs");
      require(new Set(budget?.sectionJobs || []).size === (budget?.sectionJobs || []).length, "NEWS Daily story lengthBudget.sectionJobs must be unique");
    }
    if (["STORY_CANDIDATE", "LONGFORM_FEATURE", "LIVING_REFERENCE"].includes(plan?.outputUnit)) {
      const reality = plan?.headlineRealityAssessment;
      for (const field of ["headlineOrClaim", "ordinaryReaderTakeaway", "originalEvidence", "establishes", "doesNotEstablish", "realConsequence", "directlyAffected", "unknowns", "mismatchReason"]) {
        require(text(reality?.[field]), `NEWS publicationPlan.headlineRealityAssessment.${field} is required`);
      }
      require(reality?.aidbRole === "DETECTION_LENS_ONLY", "NEWS headlineRealityAssessment.aidbRole must be DETECTION_LENS_ONLY");
      require(typeof reality?.materialMismatch === "boolean", "NEWS headlineRealityAssessment.materialMismatch must be boolean");
      const limits = reality?.scopeLimits;
      for (const field of ["population", "comparison", "measurement", "date", "otherLimits"]) {
        require(text(limits?.[field]), `NEWS headlineRealityAssessment.scopeLimits.${field} is required`);
      }
      if (reality?.materialMismatch === true) {
        require(plan?.writingMode === "HEADLINE_REALITY_CHECK", "NEWS material headline/evidence mismatch requires HEADLINE_REALITY_CHECK");
      }
      if (reality?.materialMismatch === false) {
        require(plan?.writingMode === "PLAIN_LANGUAGE_EXPLAINER", "NEWS no material headline/evidence mismatch requires PLAIN_LANGUAGE_EXPLAINER");
      }
      if (plan?.writingMode === "HEADLINE_REALITY_CHECK") {
        const publicItem = reality?.publicItem;
        for (const field of ["itemType", "headlineOrTitle", "publisher", "publishedAt", "url", "fairSummary"]) {
          require(text(publicItem?.[field]), `NEWS headlineRealityAssessment.publicItem.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        require(/^https?:\/\//.test(publicItem?.url || ""), "NEWS headlineRealityAssessment.publicItem.url must be a public HTTP(S) URL");
        require(/^\d{4}-\d{2}-\d{2}$/.test(publicItem?.publishedAt || ""), "NEWS headlineRealityAssessment.publicItem.publishedAt must be YYYY-MM-DD");
        require(text(publicItem?.apparentMeaning), "NEWS headlineRealityAssessment.publicItem.apparentMeaning is required for HEADLINE_REALITY_CHECK");
        const primary = publicItem?.underlyingPrimary;
        for (const field of ["itemType", "headlineOrTitle", "publisher", "publishedAt", "url"]) {
          require(text(primary?.[field]), `NEWS headlineRealityAssessment.publicItem.underlyingPrimary.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        require(/^https?:\/\//.test(primary?.url || ""), "NEWS underlyingPrimary.url must be a public HTTP(S) URL");
        require(/^\d{4}-\d{2}-\d{2}$/.test(primary?.publishedAt || ""), "NEWS underlyingPrimary.publishedAt must be YYYY-MM-DD");
      }
      const entry = plan?.readerEntry;
      for (const field of ["likelyFear", "immediateCorrection", "actualActor", "ordinaryObject", "sharingReason", "directAudience", "ordinaryReaderImpact", "whyLaidiesCovers"]) {
        require(text(entry?.[field]), `NEWS publicationPlan.readerEntry.${field} is required`);
      }
      require(typeof entry?.likelyMisreadMaterial === "boolean", "NEWS publicationPlan.readerEntry.likelyMisreadMaterial must be boolean");
      require(Number.isInteger(entry?.boundaryWithinWords) && entry.boundaryWithinWords > 0 && entry.boundaryWithinWords <= 120, "NEWS reader-entry boundary must land within the first 120 words");
      require(array(entry?.technicalLabelsDeferred, 4), "NEWS readerEntry.technicalLabelsDeferred requires at least four unfamiliar labels deferred until after the ordinary situation");
      const ladder = entry?.impactLadder;
      for (const field of ["ordinaryPrivateChat", "selectedAnswer", "diagnosticFile", "completeDeveloperFile"]) {
        require(text(ladder?.[field]), `NEWS readerEntry.impactLadder.${field} is required`);
      }
      if (entry?.likelyMisreadMaterial === true) {
        require(plan?.writingMode === "HEADLINE_REALITY_CHECK", "NEWS material likely misread requires HEADLINE_REALITY_CHECK");
        require(entry?.correctionLocation === "HEADLINE_AND_STANDFIRST", "NEWS material likely misread must be corrected in headline and standfirst");
      }
      if (plan?.writingMode === "HEADLINE_REALITY_CHECK") {
        const journey = entry?.sharingJourney;
        for (const field of ["toolContext", "recordCreation", "visibleContents", "additionalContents", "sender", "shareAction", "destination", "purpose", "recipientAccess", "directStudyBoundary"]) {
          require(text(journey?.[field]), `NEWS readerEntry.sharingJourney.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        const boundaries = entry?.actionBoundaries;
        for (const field of ["ordinaryPrivateChat", "selectedVisibleText", "publicChatLink", "ordinaryMarkdownFile", "requestedDiagnosticRecord", "publishedRawRun"]) {
          require(text(boundaries?.[field]), `NEWS readerEntry.actionBoundaries.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        const attack = entry?.attackMechanism;
        for (const field of ["ordinaryMeaning", "testedAction", "stoppedWorkingMeaning", "limit"]) {
          require(text(attack?.[field]), `NEWS readerEntry.attackMechanism.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        const ordinaryFile = entry?.ordinaryFileBoundary;
        for (const field of ["fileType", "plainMeaning", "whatSharingMoves", "studyBoundary"]) {
          require(text(ordinaryFile?.[field]), `NEWS readerEntry.ordinaryFileBoundary.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        const informationFlow = entry?.informationFlow;
        for (const field of ["personInput", "visibleOutput", "automaticJobRecord", "laterAudienceAction"]) {
          require(text(informationFlow?.[field]), `NEWS readerEntry.informationFlow.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        const readerSpectrum = entry?.readerSpectrum;
        for (const field of ["phoneQuestions", "workMaterial", "projectWideTool"]) {
          require(text(readerSpectrum?.[field]), `NEWS readerEntry.readerSpectrum.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        const publicMeaning = entry?.publicMeaning;
        for (const field of ["outsideAudience", "publisherActor", "concreteRoute", "privateContrast"]) {
          require(text(publicMeaning?.[field]), `NEWS readerEntry.publicMeaning.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        const riskBoundary = entry?.riskBoundary;
        for (const field of ["ordinaryAiMadeOutput", "directlyStudiedObject"]) {
          require(text(riskBoundary?.[field]), `NEWS readerEntry.riskBoundary.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        const securityTerms = entry?.securityTerms;
        for (const field of ["apiKey", "accessToken", "privateKey"]) {
          require(text(securityTerms?.[field]), `NEWS readerEntry.securityTerms.${field} is required for HEADLINE_REALITY_CHECK`);
        }
        const unintended = entry?.unintendedContents;
        require(array(unintended?.concreteExamples, 3), "NEWS readerEntry.unintendedContents.concreteExamples requires at least three examples");
        require(text(unintended?.observedOriginExample), "NEWS readerEntry.unintendedContents.observedOriginExample is required");
        require(text(unintended?.originUncertainty), "NEWS readerEntry.unintendedContents.originUncertainty is required");
      }
    }
  }

  const isCompactServiceCard = contract?.surfaceScale === "COMPACT_SERVICE_CARD";
  const requiresPairedExamples = PAIRED_EXAMPLE_CLASSES.has(contract?.contentClass) && !isCompactServiceCard;
  if (isCompactServiceCard) {
    const example = contract?.compactExample;
    require(example?.policyId === "LAIDIES_ONE_COMPLETE_EXAMPLE_V1", "compactExample.policyId must be LAIDIES_ONE_COMPLETE_EXAMPLE_V1");
    for (const field of ["aiObject", "scenario", "change", "fixedConditions", "comparison", "failureSignal", "nextAction"]) {
      require(text(example?.[field]), `compactExample.${field} is required`);
    }
    require(text(example?.substantialTransferDisposition), "compactExample.substantialTransferDisposition is required");
    const consistency = contract?.candidateConsistency;
    require(array(consistency?.currentDomainTerms, 3), "candidateConsistency.currentDomainTerms requires at least three current-candidate terms");
    if (contract?.predecessorSearch?.outcome === "SUCCESSOR") {
      require(array(consistency?.retiredPredecessorTerms), "NEWS compact successor requires candidateConsistency.retiredPredecessorTerms");
    }
    const currentSections = [
      example,
      contract?.readerContract,
      contract?.knownFailurePreflight?.dispositions,
      contract?.draftArchitecture,
      contract?.communicationDesign,
      contract?.explanationReasoningDesign,
      contract?.representativeProofPlan
    ].map(section => JSON.stringify(section || {}).toLowerCase());
    for (const term of (consistency?.currentDomainTerms || [])) {
      require(text(term), "candidateConsistency.currentDomainTerms cannot contain blank terms");
      const sectionCount = currentSections.filter(section => section.includes((term || "").trim().toLowerCase())).length;
      require(sectionCount >= 3, `current candidate term ${JSON.stringify(term)} must appear across at least three production-plan sections`);
    }
    for (const term of (consistency?.retiredPredecessorTerms || [])) {
      require(text(term), "candidateConsistency.retiredPredecessorTerms cannot contain blank terms");
      const found = currentSections.some(section => section.includes((term || "").trim().toLowerCase()));
      require(!found, `retired predecessor term ${JSON.stringify(term)} leaked into the current production plan`);
    }
  }
  if (requiresPairedExamples) {
    const pair = contract?.examplePair;
    require(pair?.policyId === "LAIDIES_WORK_AND_LIFE_EXAMPLES_V1", "examplePair.policyId must be LAIDIES_WORK_AND_LIFE_EXAMPLES_V1");
    for (const field of ["workplaceExample", "nonWorkExample", "sharedMechanism", "surfaceAdaptation"]) {
      require(text(pair?.[field]), `examplePair.${field} is required`);
    }
    require(pair?.workplaceExample?.trim().toLowerCase() !== pair?.nonWorkExample?.trim().toLowerCase(), "workplace and non-work examples must be genuinely different");
  }

  for (const field of ["humanQuestion", "promisedPayoff", "priorKnowledge", "centralMentalModel", "dailyLifeConnection", "surfaceJob", "desiredFeeling"]) {
    require(text(contract?.readerContract?.[field]), `readerContract.${field} is required`);
  }

  require(array(contract?.canonicalTruth), "canonicalTruth requires at least one governed claim or explicit no-claim record");
  for (const [index, claim] of (contract?.canonicalTruth || []).entries()) {
    for (const field of ["claimId", "owner", "freshnessTrigger"]) require(text(claim?.[field]), `canonicalTruth[${index}].${field} is required`);
    boundFile(root, claim?.source, `canonicalTruth[${index}].source`, errors);
  }

  const positives = new Map((registry.positiveExemplars || []).map(item => [item.id, item]));
  require(array(contract?.positiveExemplars), "at least one positive exemplar must shape the draft");
  for (const [index, use] of (contract?.positiveExemplars || []).entries()) {
    const exemplar = positives.get(use?.id);
    require(Boolean(exemplar), `positiveExemplars[${index}] is not registered`);
    if (exemplar) {
      require(exemplar.useFor.includes(contract.contentClass), `positive exemplar ${use.id} is not approved for ${contract.contentClass}`);
      boundFile(root, { path: exemplar.path, sha256: exemplar.sha256 }, `positive exemplar ${use.id}`, errors);
    }
    require(array(use?.strengthsToUse), `positiveExemplars[${index}].strengthsToUse is required`);
    require(array(use?.patternsNotToCopy), `positiveExemplars[${index}].patternsNotToCopy is required`);
  }

  const negatives = registry.negativeExemplars || [];
  const negativeIds = negatives.map(item => item.id);
  require(contract?.knownFailurePreflight?.registryVersion === registry.schemaVersion, "knownFailurePreflight registryVersion is stale");
  require(contract?.knownFailurePreflight?.registrySha256 === sha256(registryBytes), "knownFailurePreflight registrySha256 is stale");
  require(new Set(negativeIds).size === negativeIds.length, "negative exemplar IDs must be unique");
  const suppliedNegativeIds = contract?.knownFailurePreflight?.negativeExemplarIds || [];
  require(suppliedNegativeIds.length === negativeIds.length && negativeIds.every(id => suppliedNegativeIds.includes(id)), "every registered negative exemplar must be consumed before drafting");
  require(Array.isArray(contract?.knownFailurePreflight?.knownDefectsRemaining), "knownDefectsRemaining must be an array");
  const dispositions = contract?.knownFailurePreflight?.dispositions || {};
  for (const negative of negatives) {
    require(text(negative?.incidentId), `negative exemplar ${negative?.id || "unknown"} lacks incidentId`);
    require(array(negative?.appliesTo), `negative exemplar ${negative?.id || "unknown"} lacks appliesTo`);
    boundFile(root, { path: negative.path, sha256: negative.sha256 }, `negative exemplar ${negative.id}`, errors);
    for (const family of negative?.failureFamilies || []) {
      require(dispositions?.[family]?.status === "CLEAR", `known failure ${family} is not CLEAR before drafting`);
      require(text(dispositions?.[family]?.producerGuard), `known failure ${family} lacks a producer guard`);
      require(text(dispositions?.[family]?.preventionEvidence), `known failure ${family} lacks prevention evidence`);
    }
  }
  if (contract?.status === "READY_TO_DRAFT") require(contract.knownFailurePreflight.knownDefectsRemaining.length === 0, "READY_TO_DRAFT forbidden while known defects remain");

  const architecture = contract?.draftArchitecture;
  const architectureFields = isCompactServiceCard
    ? ["plainAnswer", "workedCase", "compactTransferDisposition", "usefulAction", "formatSpecificStructure", "antiTemplateDecision"]
    : ["plainAnswer", "workedCase", "transferCase", "usefulAction", "formatSpecificStructure", "antiTemplateDecision"];
  for (const field of architectureFields) {
    require(text(architecture?.[field]), `draftArchitecture.${field} is required`);
  }
  require(array(architecture?.causalSequence, 3), "draftArchitecture.causalSequence requires at least three connected steps");
  if (!isCompactServiceCard) require(architecture?.workedCase !== architecture?.transferCase, "workedCase and transferCase must be different");
  require(Array.isArray(architecture?.analogyPlan), "draftArchitecture.analogyPlan must be an array; use [] when no analogy earns a place");
  for (const [index, analogy] of (architecture?.analogyPlan || []).entries()) {
    for (const field of ["concept", "analogy", "mapping", "limit", "whyItHelps"]) require(text(analogy?.[field]), `analogyPlan[${index}].${field} is required`);
  }
  require(text(architecture?.humourPlan?.lessonJob) || text(architecture?.humourPlan?.noneReason), "humourPlan must name how humour serves the lesson or why none is appropriate");

  const communication = contract?.communicationDesign;
  require(communication?.benchmarkId === "HANNAH_FRY_COMMUNICATION_LENS_V2", "communicationDesign.benchmarkId mismatch");
  require(communication?.benchmark?.path === COMMUNICATION_BENCHMARK, `communicationDesign.benchmark.path must be ${COMMUNICATION_BENCHMARK}`);
  boundFile(root, communication?.benchmark, "communicationDesign.benchmark", errors);
  require(["FULL", "PROPORTIONAL", "NOT_APPLICABLE"].includes(communication?.mode), "communicationDesign.mode is required");
  require(text(communication?.surfaceAdaptation), "communicationDesign.surfaceAdaptation is required");
  require(communication?.imitationBoundary === "ADAPT_PRINCIPLES_NEVER_IMITATE_VOICE_OR_PERSONA", "communicationDesign.imitationBoundary must prohibit Hannah Fry voice or persona imitation");
  const expectedMode = FULL_COMMUNICATION_CLASSES.has(contract?.contentClass)
    ? "FULL"
    : PROPORTIONAL_COMMUNICATION_CLASSES.has(contract?.contentClass) ? "PROPORTIONAL" : "NOT_APPLICABLE";
  require(communication?.mode === expectedMode, `${contract?.contentClass || "content"} requires communicationDesign.mode=${expectedMode}`);
  let appliedDimensions = 0;
  for (const dimension of COMMUNICATION_DIMENSIONS) {
    const plan = communication?.dimensions?.[dimension];
    require(["APPLY", "NOT_APPLICABLE"].includes(plan?.disposition), `communicationDesign.dimensions.${dimension}.disposition is required`);
    require(text(plan?.reason), `communicationDesign.dimensions.${dimension}.reason is required`);
    if (plan?.disposition === "APPLY") {
      appliedDimensions += 1;
      require(text(plan?.plannedEvidence), `communicationDesign.dimensions.${dimension}.plannedEvidence is required when applied`);
      require(!/^hannah fry(?: inspired| style| benchmark)?[.! ]*$/i.test(plan?.plannedEvidence?.trim() || ""), `communicationDesign.dimensions.${dimension} cannot be satisfied by naming Hannah Fry`);
    }
  }
  if (expectedMode === "FULL") {
    require(appliedDimensions >= 6, "FULL communication design requires at least six applied benchmark dimensions");
    for (const dimension of ["humanQuestion", "invisibleProcessConcrete", "familiarTechnicalMovement", "limitationsConsequences", "betterNextQuestion"]) {
      require(communication?.dimensions?.[dimension]?.disposition === "APPLY", `FULL communication design must apply ${dimension}`);
    }
    const arc = communication?.explanationArc;
    require(arc?.mode === "DEFAULT_SUBSTANTIAL_EXPLANATION", "FULL communication design requires the default substantial-explanation arc");
    for (const field of ["sharedStartingPoint", "curiosityGap", "earnedClick", "smallLanding", "safetyBoundary"]) {
      require(text(arc?.[field]), `communicationDesign.explanationArc.${field} is required`);
    }
    require(array(arc?.mechanismSequence, 3), "communicationDesign.explanationArc.mechanismSequence requires at least three cause-and-effect steps");
    require(arc?.order === "START_AND_GAP_THEN_MECHANISM_THEN_EARNED_CLICK_THEN_SMALL_LANDING", "communicationDesign.explanationArc.order must preserve the default explanatory sequence");
  } else if (expectedMode === "PROPORTIONAL") {
    require(appliedDimensions >= 2, "PROPORTIONAL communication design requires at least two applied benchmark dimensions");
    const arc = communication?.explanationArc;
    require(["PROPORTIONAL", "NOT_APPLICABLE"].includes(arc?.mode), "PROPORTIONAL communication design must adapt or explicitly decline the default arc");
    if (arc?.mode === "PROPORTIONAL") {
      require(array(arc?.retainedMoves), "communicationDesign.explanationArc.retainedMoves is required when proportional");
      require(text(arc?.adaptation), "communicationDesign.explanationArc.adaptation is required when proportional");
    } else require(text(arc?.reason), "communicationDesign.explanationArc.reason is required when not applicable");
  } else {
    require(appliedDimensions === 0, "NOT_APPLICABLE communication design cannot claim applied benchmark dimensions");
    require(communication?.explanationArc?.mode === "NOT_APPLICABLE", "NOT_APPLICABLE communication design must declare explanationArc.mode=NOT_APPLICABLE");
    require(text(communication?.explanationArc?.reason), "communicationDesign.explanationArc.reason is required when not applicable");
  }

  const reasoning = contract?.explanationReasoningDesign;
  require(reasoning?.benchmarkId === "LAIDIES_EXPLANATION_EDITORIAL_TRIAD_V1", "explanationReasoningDesign.benchmarkId mismatch");
  require(reasoning?.benchmark?.path === EXPLANATION_REASONING_BENCHMARK, `explanationReasoningDesign.benchmark.path must be ${EXPLANATION_REASONING_BENCHMARK}`);
  boundFile(root, reasoning?.benchmark, "explanationReasoningDesign.benchmark", errors);
  require(reasoning?.mode === expectedMode, `${contract?.contentClass || "content"} requires explanationReasoningDesign.mode=${expectedMode}`);
  require(reasoning?.imitationBoundary === "ADAPT_METHODS_KEEP_LAIDIES_VOICE_NEVER_DEFER_TO_AIDB", "explanationReasoningDesign must preserve LAiDIES voice and prohibit imitation or AIDB deference");
  if (expectedMode === "NOT_APPLICABLE") {
    require(text(reasoning?.exemptionReason), "NOT_APPLICABLE explanationReasoningDesign requires an exemptionReason");
    require(reasoning?.containsTeachingClaim === false, "NOT_APPLICABLE explanationReasoningDesign cannot contain a teaching claim");
  } else {
    const reasoningFields = isCompactServiceCard
      ? ["humanEntry", "fakeUnderstandingRisk", "explainBackTest", "transferDisposition", "usefulLanding", "rewindEraAdaptation"]
      : ["humanEntry", "fakeUnderstandingRisk", "explainBackTest", "transferCase", "usefulLanding", "rewindEraAdaptation"];
    for (const field of reasoningFields) {
      require(text(reasoning?.[field]), `explanationReasoningDesign.${field} is required`);
    }
    require(array(reasoning?.firstPrinciplesSequence, expectedMode === "FULL" ? 3 : 1), `explanationReasoningDesign.firstPrinciplesSequence requires ${expectedMode === "FULL" ? "at least three" : "at least one"} causal step(s)`);
    if (!isCompactServiceCard) require(reasoning?.explainBackTest !== reasoning?.transferCase, "explanationReasoningDesign explain-back and transfer must be different");
    require(!/^(?:hannah fry|feynman|aidb)(?: inspired| style| method)?[.! ]*$/i.test(reasoning?.humanEntry?.trim() || ""), "explanationReasoningDesign cannot be satisfied by naming a benchmark");
    const evidence = reasoning?.evidenceAnalysis;
    for (const field of ["claimUnderInspection", "primaryEvidence", "establishes", "doesNotEstablish", "claimedImpact", "realConsequence"]) {
      require(text(evidence?.[field]), `explanationReasoningDesign.evidenceAnalysis.${field} is required`);
    }
    require(["COMPARED", "DATED_ABSENCE", "NOT_APPLICABLE_TO_SUBJECT"].includes(evidence?.aidbDisposition), "explanationReasoningDesign.evidenceAnalysis.aidbDisposition is required");
    require(text(evidence?.aidbReason), "explanationReasoningDesign.evidenceAnalysis.aidbReason is required");
  }

  for (const field of ["highestRisk", "plannedProof", "acceptanceOutcome"]) require(text(contract?.representativeProofPlan?.[field]), `representativeProofPlan.${field} is required`);
  const metrics = contract?.ratchet?.targets;
  require(metrics?.repeatedKnownDefects === 0, "ratchet target repeatedKnownDefects must be 0");
  require(metrics?.objectiveDefectsFirstFoundAtReview === 0, "ratchet target objectiveDefectsFirstFoundAtReview must be 0");
  require(contract?.ratchet?.rule === "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW", "ratchet must stop and repair the producer on repeated known defects");

  return { errors, status: contract?.status || null };
}

function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: node scripts/check-content-producer-contract.mjs <contract.json>"); process.exit(2); }
  let contract;
  try { contract = JSON.parse(fs.readFileSync(path.resolve(file), "utf8")); }
  catch (error) { console.error(`CONTENT PRODUCER CONTRACT FAIL\n- ${error.message}`); process.exit(1); }
  const result = inspectContentProducerContract(contract);
  if (result.errors.length) {
    console.error("CONTENT PRODUCER CONTRACT FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`CONTENT PRODUCER CONTRACT INTEGRITY MATCH status=${result.status} quality_authority=none`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
