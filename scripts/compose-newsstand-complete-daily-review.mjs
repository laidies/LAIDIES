#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectCompleteDailyComposition } from "./check-newsstand-complete-daily-composition.mjs";
import { inspectCompleteDailyReview } from "./check-newsstand-complete-daily-review.mjs";
import { inspectNewsstandProducerProof } from "./check-newsstand-producer-proof.mjs";
import { inspectNewsstandServiceExemplar } from "./check-newsstand-service-exemplar.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CANDIDATE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/candidates");
const SCREENSHOT_KEYS = [
  "COMPLETE_PAGE:1440", "COMPLETE_PAGE:390", "COMPLETE_PAGE:320",
  "DAILY_FRONT:1440", "DAILY_FRONT:390", "DAILY_FRONT:320",
  "FULL_ARTICLE:1440", "FULL_ARTICLE:390", "FULL_ARTICLE:320"
];
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = value => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const fail = message => { throw new Error(`COMPLETE_DAILY_REVIEW_COMPOSER_REJECT: ${message}`); };

function read(root, relative, label) {
  const resolvedRoot = path.resolve(root);
  const absolute = path.resolve(resolvedRoot, relative || "");
  if (!relative || !absolute.startsWith(`${resolvedRoot}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    fail(`${label} is unavailable or outside the repository: ${relative || ""}`);
  }
  const raw = fs.readFileSync(absolute);
  return { path: path.relative(resolvedRoot, absolute), raw, sha256: sha256(raw) };
}

function json(root, relative, label) {
  const file = read(root, relative, label);
  try { return { ...file, value: JSON.parse(file.raw.toString("utf8")) }; }
  catch { fail(`${label} is not valid JSON`); }
}

function binding(file) {
  return { path: file.path, sha256: file.sha256 };
}

function exactBinding(value, file, label) {
  if (value?.path !== file.path || value?.sha256 !== file.sha256) fail(`${label} does not bind the exact file`);
}

function verdictPasses(value) {
  return String(value || "").startsWith("PASS") || value === "ADMIT_PRIVATE_DIRECTION_REVIEW";
}

export function composeCompleteDailyReviewPackage(inputs, {
  root = ROOT,
  producerInspector = inspectNewsstandProducerProof,
  serviceInspector = inspectNewsstandServiceExemplar,
  packageRejections
} = {}) {
  if (inputs?.schemaVersion !== "laidies-newsstand-complete-daily-compose-input.v2") fail("input schemaVersion mismatch; single-story v1 inputs are retired");

  const compositionFile = json(root, inputs.composition, "complete-Daily composition");
  const compositionResult = inspectCompleteDailyComposition(compositionFile.value);
  if (compositionResult.errors.length) fail(`composition failed: ${compositionResult.errors.join(" | ")}`);
  if (compositionFile.value.issueOutcome.state !== "MULTI_STORY") fail("a review package currently requires a qualified multi-story Daily");

  const storyInputs = Array.isArray(inputs.stories) ? inputs.stories : [];
  if (storyInputs.length !== compositionFile.value.news.length) fail("story bundles do not match the ranked composition");
  const stories = [];
  const storyReviews = [];
  for (const [index, item] of storyInputs.entries()) {
    const label = `story bundle ${index + 1}`;
    const candidateFile = json(root, item?.candidate, `${label} candidate`);
    const templateFile = read(root, item?.templateAcceptance, `${label} template acceptance`);
    const proofFile = json(root, item?.producerProof, `${label} producer proof`);
    const selfReviewFile = json(root, item?.producerSelfReview, `${label} producer self-review`);
    const independentFile = json(root, item?.independentReview, `${label} independent review`);
    const candidate = candidateFile.value;
    const expectedStory = compositionFile.value.news[index];
    if (candidate?.candidateStatus !== "HELD_NOT_PUBLISHED" || candidate?.story?.status !== "hold" || candidate?.story?.publishedAt !== null) {
      fail(`${label} is not a held, unpublished candidate`);
    }
    if (candidate.story?.id !== expectedStory.storyId) fail(`${label} identity differs from ranked composition`);
    const proseFile = read(root, candidate?.sourceText?.path, `${label} exact prose`);
    exactBinding(candidate.sourceText, proseFile, `${label} sourceText`);

    const proofResult = producerInspector(proofFile.value, { root });
    if (proofResult?.errors?.length) fail(`${label} producer proof failed: ${proofResult.errors.join(" | ")}`);
    if (selfReviewFile.value?.verdict !== "PASS") fail(`${label} producer self-review does not PASS`);
    exactBinding(selfReviewFile.value?.artifact?.reviewText, proseFile, `${label} producer self-review`);
    if (!verdictPasses(independentFile.value?.verdict) || independentFile.value?.candidate?.sha256 !== proseFile.sha256) {
      fail(`${label} independent review does not PASS the exact prose`);
    }
    stories.push({
      ...binding(candidateFile),
      record: candidate.story,
      templateAcceptance: binding(templateFile),
      independentReview: binding(independentFile)
    });
    storyReviews.push({
      storyId: candidate.story.id,
      producerProof: binding(proofFile),
      producerSelfReview: binding(selfReviewFile),
      independentReview: binding(independentFile)
    });
  }

  const suppliedServices = Array.isArray(inputs.services) ? inputs.services : [];
  const suppliedTypes = suppliedServices.map(item => item?.type);
  if (new Set(suppliedTypes).size !== suppliedTypes.length) fail("service candidate inputs contain duplicate desk types");
  const serviceFiles = new Map();
  for (const item of suppliedServices) serviceFiles.set(item.type, json(root, item.candidate, `service ${item.type} candidate`));
  const readyPlans = compositionFile.value.services.filter(item => item.state === "READY");
  if (suppliedServices.length !== readyPlans.length || readyPlans.some(plan => !serviceFiles.has(plan.type))) {
    fail("service candidates must match every and only READY composition desk");
  }
  const desks = compositionFile.value.services.map(plan => {
    if (plan.state === "EMPTY") return { type: plan.type, state: "empty", recordId: null, emptyState: plan.emptyState };
    const file = serviceFiles.get(plan.type);
    const candidate = file.value;
    if (candidate?.schemaVersion === "laidies-newsstand-service-exemplar.v1") {
      const result = serviceInspector(candidate, { root });
      if (result?.errors?.length) fail(`service ${plan.type} failed: ${result.errors.join(" | ")}`);
    }
    if (candidate?.editionDate !== compositionFile.value.editionDate) fail(`service ${plan.type} uses a different edition date`);
    if (candidate?.body !== plan.usefulSubstance || (candidate?.destination || null) !== (plan.continuationDestination || null)) {
      fail(`service ${plan.type} differs from the exact inline composition`);
    }
    if (!candidate?.storage?.recordId || !candidate?.headline) fail(`service ${plan.type} lacks a record ID or headline`);
    return {
      type: plan.type,
      state: "ready",
      recordId: candidate.storage.recordId,
      headline: candidate.headline,
      summary: candidate.body,
      displayMode: plan.displayMode,
      destination: plan.continuationDestination || null,
      sourceCandidate: binding(file)
    };
  });

  const compositionReviewFile = json(root, inputs.compositionReview, "independent composition review");
  if (!verdictPasses(compositionReviewFile.value?.verdict)) fail("composition review does not PASS");
  exactBinding(compositionReviewFile.value?.composition, compositionFile, "composition review");

  const serviceReviewFile = json(root, inputs.serviceReview, "independent service review");
  if (!verdictPasses(serviceReviewFile.value?.verdict)) fail("service review does not PASS");
  const reviewedServiceBindings = new Map((serviceReviewFile.value?.candidates || []).map(item => [item.type, item]));
  const serviceOutcomes = new Map((serviceReviewFile.value?.outcomes || []).map(item => [item.type, item]));
  for (const plan of readyPlans) {
    exactBinding(reviewedServiceBindings.get(plan.type), serviceFiles.get(plan.type), `service review ${plan.type}`);
    const outcome = serviceOutcomes.get(plan.type);
    if (!verdictPasses(outcome?.verdict) || (outcome?.defects || []).length) fail(`service review does not PASS ${plan.type} with zero defects`);
  }

  const screenshotInputs = Array.isArray(inputs.screenshots) ? inputs.screenshots : [];
  const screenshots = screenshotInputs.map((item, index) => ({ ...binding(read(root, item?.path, `screenshot ${index + 1}`)), mode: item?.mode, viewport: item?.viewport }));
  if (screenshots.length !== 9 || new Set(screenshots.map(item => `${item.mode}:${item.viewport}`)).size !== 9 || SCREENSHOT_KEYS.some(key => !screenshots.some(item => `${item.mode}:${item.viewport}` === key))) {
    fail("screenshots do not provide the exact nine-view matrix");
  }
  const visualReviewFile = json(root, inputs.visualReview, "independent visual review");
  if (!verdictPasses(visualReviewFile.value?.verdict)) fail("visual review does not PASS the private direction");
  const reviewedScreens = new Map((visualReviewFile.value?.screenshots || []).map(item => [`${item.mode}:${item.viewport}`, item]));
  for (const screenshot of screenshots) exactBinding(reviewedScreens.get(`${screenshot.mode}:${screenshot.viewport}`), screenshot, `visual review ${screenshot.mode}:${screenshot.viewport}`);

  const reviewPackage = {
    schemaVersion: "laidies-newsstand-complete-daily-review-package.v2",
    editionDate: compositionFile.value.editionDate,
    editorialTimeZone: "America/Vancouver",
    status: "PRIVATE_COMPLETE_DAILY_REVIEW_CANDIDATE",
    defaultExperience: "THE_DAILY",
    publicEligibility: "INELIGIBLE_PENDING_ALI_APPROVAL",
    composition: binding(compositionFile),
    stories,
    desks,
    evidence: {
      compositionReview: binding(compositionReviewFile),
      serviceReview: binding(serviceReviewFile),
      visualReview: binding(visualReviewFile),
      storyReviews,
      screenshots
    },
    remainingGates: [
      "ALI_EXACT_PACKAGE_APPROVAL",
      "OBSERVED_UNFAMILIAR_HUMAN_EXPLAIN_BACK",
      "OBSERVED_UNFAMILIAR_HUMAN_UNSEEN_TRANSFER",
      "INDEPENDENT_RELEASE_ADMISSION",
      "DEPLOYMENT_AND_EXACT_PUBLIC_VERIFICATION"
    ],
    releaseAuthority: { canonicalWrite: false, deploy: false, public: false }
  };
  const packageResult = inspectCompleteDailyReview(reviewPackage, {
    root,
    ...(packageRejections === undefined && path.resolve(root) === ROOT ? {} : { rejections: packageRejections || [] })
  });
  if (packageResult.errors.length) fail(`assembled package failed: ${packageResult.errors.join(" | ")}`);
  const canonical = `${canonicalJson(reviewPackage)}\n`;
  return { reviewPackage, canonical, sha256: sha256(canonical) };
}

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? null : process.argv[index + 1];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const inputPath = valueAfter("--inputs");
  const outputValue = valueAfter("--output");
  if (!inputPath || !outputValue) fail("usage: node scripts/compose-newsstand-complete-daily-review.mjs --inputs <v2-input.json> --output <candidate.json>");
  const output = path.resolve(ROOT, outputValue);
  if (!output.startsWith(`${CANDIDATE_ROOT}${path.sep}`)) fail("--output must stay inside the NewsStand candidate directory");
  if (fs.existsSync(output)) fail("--output already exists; never overwrite a review candidate");
  const inputs = json(ROOT, inputPath, "v2 composer input").value;
  const result = composeCompleteDailyReviewPackage(inputs);
  fs.writeFileSync(output, result.canonical);
  console.log(`COMPLETE DAILY REVIEW PACKAGE PASS edition=${result.reviewPackage.editionDate} stories=${result.reviewPackage.stories.length} ready_desks=${result.reviewPackage.desks.filter(item => item.state === "ready").length} sha256=${result.sha256} public_authority=none`);
}
