#!/usr/bin/env node
// Deterministically bind existing ordinary-NewsStand review judgments. This
// never calls a provider or creates editorial judgments.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { normalize, requestFor } from "./protocol.mjs";
import { inspectProseReviewChain } from "../../../../scripts/check-prose-quality-admission.mjs";
import { validateOrdinaryStoryCandidate } from "../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const stable = value => value === null || typeof value !== "object" ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(",")}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const candidateReviewText = story => `${stable(story)}\n`;
const args = process.argv.slice(2);
const option = name => { const i = args.indexOf(name); return i < 0 ? null : args[i + 1]; };
const required = name => { const value = option(name); if (!value) throw Error(`ASSEMBLY HOLD: ${name} is required`); return value; };
const relative = target => path.relative(ROOT, target).split(path.sep).join("/");
const within = target => path.resolve(target).startsWith(`${ROOT}${path.sep}`);
const readBytes = target => { const absolute = path.resolve(target); if (!within(absolute) || !fs.existsSync(absolute) || !fs.realpathSync(absolute).startsWith(`${fs.realpathSync(ROOT)}${path.sep}`)) throw Error(`ASSEMBLY HOLD: missing or outside repository: ${relative(absolute)}`); return fs.readFileSync(absolute); };
const json = target => JSON.parse(readBytes(target).toString("utf8"));
const binding = target => { const absolute = path.resolve(target), bytes = readBytes(absolute); return { path: relative(absolute), sha256: sha256(bytes) }; };
const text = value => typeof value === "string" && value.trim().length > 0;
const output = (directory, name, value) => {
  const absolute = path.resolve(directory, name);
  if (!within(absolute) || !relative(absolute).startsWith("operations/product-stewards/")) throw Error("ASSEMBLY HOLD: output must remain under private product-steward storage");
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  if (!fs.realpathSync(path.dirname(absolute)).startsWith(fs.realpathSync(path.join(ROOT, "operations/product-stewards")) + path.sep)) throw Error("ASSEMBLY HOLD: output resolves outside private storage");
  const bytes = `${JSON.stringify(value, null, 2)}\n`;
  if (fs.existsSync(absolute) && fs.readFileSync(absolute, "utf8") !== bytes) throw Error(`ASSEMBLY HOLD: preserve differing existing output: ${relative(absolute)}`);
  fs.writeFileSync(absolute, bytes);
  return binding(absolute);
};
const hold = error => { console.error(error.message || String(error)); process.exitCode = 1; };

function stateVerdict(value) { return value === "pass" ? "PASS" : value === "hold" ? "HOLD" : "FAIL"; }
function sourceEvidence(source) {
  const values = [source?.source?.passage, source?.source?.additionalPassage].filter(text);
  if (!values.length) throw Error(`ASSEMBLY HOLD: source ${source?.id || "unknown"} has no supplied passage`);
  return values.map((excerpt, index) => ({ excerpt, locator: index ? (source.source.additionalPassageLocator || source.source.url) : source.source.url }));
}
function calibrationFrom(result, directory) {
  if (result.status !== "CALIBRATION_PASSED" || result.mode !== "ORDINARY_NEWS_BLIND_REJECTION_V1") throw Error("ASSEMBLY HOLD: current ordinary-news calibration is not passed");
  const negatives = [], reviewTimes = [], positive = result.evaluations?.find(item => item.actual === "PASS");
  for (const item of result.evaluations || []) {
    const checkedPath = path.resolve(ROOT, item.checkedBinding?.path || "");
    const checked = json(checkedPath);
    if (!Number.isFinite(Date.parse(checked.completedAt))) throw Error("ASSEMBLY HOLD: original calibration review time is missing");
    reviewTimes.push(Date.parse(checked.completedAt));
    const rawPath = path.resolve(ROOT, item.rawBinding?.path || "");
    if (binding(checkedPath).sha256 !== item.checkedBinding?.sha256 || binding(rawPath).sha256 !== item.rawBinding?.sha256 || json(checkedPath).rawSha256 !== item.rawBinding?.sha256) throw Error(`ASSEMBLY HOLD: calibration binding/raw normalization drift for ${item.exemplarId}`);
    const name = path.basename(rawPath).replace("-provider.raw.json", ""), sampleDir = path.dirname(rawPath);
    const packet = json(path.join(sampleDir, name + "-packet.json"));
    assert.deepEqual(json(path.join(sampleDir, name + "-request.json")), requestFor("calibration", packet), "Calibration rubric changed");
    const provider = json(rawPath); assert.equal(provider.is_error, false); assert.equal(provider.subtype, "success");
    assert.ok(Object.keys(provider.modelUsage || {}).includes("claude-fable-5"));
    const judgment = provider.structured_output || JSON.parse(provider.result.trim().replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, ""));
    const replayed = normalize("calibration", judgment, packet);
    assert.deepEqual(replayed.families, checked.families, "Calibration checked judgments differ from actual raw");
    assert.equal(replayed.verdict, item.actual, "Calibration verdict differs from actual raw");
    if (item.actual === "REJECT") {
      const assessments = checked.families || {};
      const present = Object.entries(assessments).filter(([, value]) => value.state === "present");
      if (!present.length) throw Error(`ASSEMBLY HOLD: calibration ${item.exemplarId} has no actual relevant rejection`);
      negatives.push({ exemplarId: item.exemplarId, verdict: "REJECT", identifiedFailureFamilies: present.map(([family]) => family), familyAssessments: Object.fromEntries(Object.entries(assessments).map(([family, value]) => [family, { state: value.state, observation: value.reason, artifactLocator: value.artifactLocator }])), evidence: present.flatMap(([, value]) => value.artifactEvidence || []) });
    }
  }
  if (!positive) throw Error("ASSEMBLY HOLD: passed positive calibration is missing");
  const positiveChecked = json(path.resolve(ROOT, positive.checkedBinding.path));
  return { registrySha256: result.registrySha256, reviewerPrincipalId: "anthropic:claude-fable-5:newsstand-editorial:medium", reviewedAt: new Date(Math.max(...reviewTimes)).toISOString(), mode: result.mode, negatives, positive: { exemplarId: positive.exemplarId, verdict: "PASS", strengthsRetained: positiveChecked.strengths, evidence: (positiveChecked.families ? Object.values(positiveChecked.families).flatMap(value => value.artifactEvidence || []).slice(0, 2) : []) } };
}

function main() {
  const candidateDir = path.resolve(ROOT, required("--candidate-dir"));
  const reviewDir = path.resolve(ROOT, required("--review-dir"));
  const calibrationDir = path.resolve(ROOT, required("--calibration-dir"));
  const outputDir = path.resolve(ROOT, required("--output-dir"));
  const metricsPath = option("--metrics") && path.resolve(ROOT, option("--metrics"));
  const publicationBasePath = option("--publication-base") && path.resolve(ROOT, option("--publication-base"));
  if (![candidateDir, reviewDir, calibrationDir, outputDir].every(within)) throw Error("ASSEMBLY HOLD: all paths must remain in the repository");
  if (!metricsPath) throw Error("ASSEMBLY HOLD: explicit prose/evidence metrics are required; counts will not be inferred");
  if (!publicationBasePath) throw Error("ASSEMBLY HOLD: the existing frozen parent publication base is required");
  const storyPath = path.join(candidateDir, "story.json"), reviewTextPath = path.join(candidateDir, "review-text.json"), manifestPath = path.join(candidateDir, "publication-manifest.json"), renderedPath = path.join(candidateDir, "rendered-article.html"), producerPath = path.join(candidateDir, "producer-publication-review.json"), inputPath = path.join(candidateDir, "editorial-input.json");
  const story = json(storyPath), producer = json(producerPath), final = json(path.join(reviewDir, "article-result.json"));
  const actual = file => {
    const raw = json(file);
    assert.equal(raw.is_error, false, "Actual provider execution failed");
    assert.equal(raw.subtype, "success", "Actual provider response incomplete");
    assert.ok(Object.keys(raw.modelUsage || {}).includes("claude-fable-5"), "Actual model changed");
    return raw.structured_output || JSON.parse(raw.result.trim().replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, ""));
  };
  const replay = (directory, name, kind) => {
    const packet = json(path.join(directory, name + "-packet.json"));
    assert.deepEqual(json(path.join(directory, name + "-request.json")), requestFor(kind, packet), "Actual reviewer request/rubric changed");
    assert.equal(packet.completeArtifact, candidateReviewText(story), "Complete reviewed article changed");
    const rawPath = path.join(directory, name + "-provider.raw.json");
    const judgment = actual(rawPath);
    assert.deepEqual(json(path.join(directory, name + "-judgment.json")), judgment, "Judgment differs from actual provider output");
    return { packet, rawPath, judgment };
  };
  let reader, facts, factsPacket, readerProvider, factProvider, factJudgment, reviewedAt;
  if (final.readerReuse) {
    const originalRaw = path.resolve(ROOT, final.readerReuse.path);
    assert.equal(binding(originalRaw).sha256, final.readerReuse.sha256, "Reused reader raw changed");
    const previous = replay(path.dirname(originalRaw), "article-editorial", "editorial");
    reader = normalize("reader", previous.judgment.reader, previous.packet);
    const current = replay(reviewDir, "article-facts", "facts");
    facts = normalize("facts", current.judgment, current.packet);
    factsPacket = current.packet; readerProvider = binding(originalRaw); factProvider = binding(current.rawPath);
    factJudgment = binding(path.join(reviewDir, "article-facts-judgment.json"));
    const checked = json(path.join(reviewDir, "article-facts-checked.json"));
    assert.equal(checked.rawSha256, factProvider.sha256, "Facts completion metadata changed");
    reviewedAt = checked.completedAt;
  } else {
    const current = replay(reviewDir, "article-editorial", "editorial");
    ({ reader, facts } = normalize("editorial", current.judgment, current.packet));
    factsPacket = current.packet; readerProvider = factProvider = binding(current.rawPath);
    factJudgment = binding(path.join(reviewDir, "article-editorial-judgment.json"));
    const checked = json(path.join(reviewDir, "article-editorial-checked.json"));
    assert.equal(checked.rawSha256, factProvider.sha256, "Editorial completion metadata changed");
    reviewedAt = checked.completedAt;
  }
  if (reader.verdict !== "PASS" || facts.verdict !== "PASS") throw Error(`ASSEMBLY HOLD: derived independent verdict reader=${reader.verdict} facts=${facts.verdict}`);
  assert.equal(readBytes(reviewTextPath).toString("utf8"), candidateReviewText(story), "Current article bytes differ");
  assert.deepEqual(json(inputPath), factsPacket, "Evidence packet changed after review");
  const metrics = json(metricsPath);
  if (!Number.isInteger(metrics?.proseReview?.reviewIssues) || !Number.isInteger(metrics?.proseReview?.reviewCycles) || !Number.isInteger(metrics?.evidencePacket?.rounds) || !Number.isInteger(metrics?.evidencePacket?.gaps) || !metrics?.ratchet) throw Error("ASSEMBLY HOLD: metrics must explicitly distinguish prose review from evidence-packet rounds/gaps and supply the admission ratchet");
  const input = json(inputPath), byId = new Map((input.sources || []).map(source => [source.id, source]));
  const inputBinding = binding(inputPath);
  const claimMap = Object.entries(facts.claims).map(([claimId, claim]) => {
    const sources = claim.sourceIds.map(id => byId.get(id));
    if (sources.some(source => !source)) throw Error(`ASSEMBLY HOLD: fact judgment ${claimId} references an unsupplied source`);
    return { claimId, status: claim.state === "supported" ? "VERIFIED" : "QUALIFIED", candidateEvidence: claim.artifactEvidence, sourceBinding: inputBinding, sourceEvidence: sources.flatMap(sourceEvidence), scopeAndFreshness: claim.reason };
  });
  const calibration = calibrationFrom(json(path.join(calibrationDir, "calibration-result.json")), calibrationDir);
  if (!Array.isArray(calibration.positive.strengthsRetained) || !calibration.positive.strengthsRetained.length || !calibration.positive.evidence.length) throw Error("ASSEMBLY HOLD: calibration positive strengths/evidence are incomplete");
  if (!text(reviewedAt) || Date.parse(reviewedAt) <= Date.parse(producer.reviewedAt)) throw Error("ASSEMBLY HOLD: independent review time is missing or does not follow producer review");
  const ai = value => ({ evidenceType: "AI_EDITORIAL_ANALYSIS", prompt: value.question, response: value.answer, expectedEvidence: value.expectedEvidence, assessment: value.assessment });
  const outcomes = Object.fromEntries([...Object.entries(reader.outcomes), ...Object.entries(facts.outcomes)].map(([name, value]) => [name, { verdict: stateVerdict(value.state), observation: value.reason, artifactEvidence: value.artifactEvidence, ...(name === "explainBack" ? { aiEditorialAnalysis: ai(reader.explainBack) } : {}), ...(name === "unseenTransfer" ? { aiEditorialAnalysis: ai(reader.unseenTransfer) } : {}) }]));
  const receipt = { schemaVersion: "laidies-prose-quality-review.v1", candidateId: story.id, stage: "INDEPENDENT_SEMANTIC_ADMISSION", contentClass: "NEWS", surface: "NEWSSTAND_DAILY", maker: producer.maker, reviewer: { id: "claude-fable-newsstand-editorial", principalId: "anthropic:claude-fable-5:newsstand-editorial:medium", role: "independent ordinary NewsStand editorial reviewer", modelFamily: "anthropic", independentFromMaker: true, artifactFirst: true }, reviewMode: "EXACT_PROSE_IN_FULL", reviewedAt, artifact: { reviewText: binding(reviewTextPath), manifest: binding(manifestPath), rendered: binding(renderedPath) }, calibration, reverseBrief: reader.reverseBrief, outcomes, failureFamilies: Object.fromEntries(Object.entries(reader.families).map(([name, value]) => [name, { present: value.state === "present", observation: value.reason, artifactLocator: value.artifactLocator }])), factualReview: { disposition: "CLAIMS_REVIEWED", sourceBindings: [inputBinding], claimMap, reviewedThrough: story.lastCheckedAt?.slice(0, 10), nextTrigger: producer.factualReview.nextTrigger, correctionOwner: producer.factualReview.correctionOwner }, ratchet: { ...producer.ratchet, ...metrics.ratchet }, lineage: producer.lineage, learningDisposition: reader.learningDisposition, verdict: "PASS", limitations: ["AI editorial assessment only; no observed human-comprehension evidence is claimed.", `Evidence-packet rounds=${metrics.evidencePacket.rounds}; evidence gaps repaired=${metrics.evidencePacket.gaps}; these are not prose review cycles.`] };
  const analysis = { evidenceType: "AI_EDITORIAL_ANALYSIS", candidateId: story.id, reviewerPrincipalId: receipt.reviewer.principalId, reviewTextSha256: receipt.artifact.reviewText.sha256, outcomes: { explainBack: ai(reader.explainBack), unseenTransfer: ai(reader.unseenTransfer) }, checks: Object.fromEntries(Object.entries(reader.newsChecks).map(([name, value]) => [name, { verdict: stateVerdict(value.state), observation: value.reason, artifactEvidence: value.artifactEvidence }])) };
  const raw = { schemaVersion: "laidies-newsstand-combined-editorial-raw.v1", candidateId: story.id, storySha256: sha256(stable(story)), reviewerPrincipalId: receipt.reviewer.principalId, verdict: "PASS", findings: { reader: reader.summary, facts: facts.summary }, readerProviderRaw: readerProvider, factualJudgment: factJudgment, factualProviderRaw: factProvider, calibration: binding(path.join(calibrationDir, "calibration-result.json")) };
  const analysisBinding = output(outputDir, "news-editorial-analysis.json", analysis);
  const rawBinding = output(outputDir, "independent-raw-report.json", raw), claimBinding = output(outputDir, "publication-claim-map.json", claimMap);
  receipt.newsEditorialReview = { policy: binding(path.resolve(ROOT, "operations/product-stewards/newsstand/ordinary-news-editorial-policy.json")), analysis: analysisBinding };
  receipt.reportBinding = rawBinding;
  const independent = output(outputDir, "independent-review.json", receipt);
  const writerInputPath = path.join(candidateDir, "writer-input-current.json"), observationsPath = path.join(candidateDir, "producer-observations.json");
  const candidate = { schemaVersion: "newsstand-ordinary-story-candidate-v2", candidateStatus: "READY_FOR_ISSUE_ADMISSION", candidateId: story.id, editionDate: story.lastCheckedAt.slice(0, 10), story, storyTypeCoverage: json(path.join(candidateDir, "story-type-coverage.json")), storySha256: sha256(stable(story)), publicationBase: binding(publicationBasePath), sourceText: binding(reviewTextPath), claimMap: claimBinding, producerContract: binding(path.join(candidateDir, "producer-contract.json")), draftPreparation: { writerInput: binding(writerInputPath), observations: binding(observationsPath) }, sources: (story.sources || []).map(source => ({ id: source.id, url: source.url, evidence: inputBinding })), reviewEvidence: { producer: binding(producerPath), independent, independentRawReport: rawBinding }, lineage: story.predecessorStoryIds?.length ? producer.lineage : null };
  const chain = inspectProseReviewChain(producer, receipt, { root: ROOT });
  if (chain.errors.length) throw Error(`ASSEMBLY HOLD: review chain invalid: ${chain.errors.join(" | ")}`);
  try { validateOrdinaryStoryCandidate(candidate, { root: ROOT }); } catch (error) { throw Error(`ASSEMBLY HOLD: ordinary candidate invalid: ${error.message}`); }
  output(outputDir, "ordinary-candidate.json", candidate);
  console.log(`ASSEMBLY READY candidate=${story.id} claims=${claimMap.length} output=${relative(outputDir)}`);
}
try { main(); } catch (error) { hold(error); }
