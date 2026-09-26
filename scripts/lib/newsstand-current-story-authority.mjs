import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { loadOrdinaryStoryCandidate, publishCandidateStory, stable } from "../validate-newsstand-ordinary-story-candidate.mjs";
import { verifyProjectionAdmission } from "../publish-daily-edition.mjs";

export const CURRENT_PUBLISHER_TYPE_AUTHORITY = "newsstand source record contract: legacy closed types plus the exact current ordinary-candidate source bindings";
export const CURRENT_PUBLISHER_TYPES = new Set(["vendor", "regulator", "academic", "independent-reporting", "primary-document", "organization", "government", "analysis", "external-evaluator", "reporting", "laidies", "primary-product-documentation", "primary-product-changelog", "primary-peer-reviewed-open-access-paper", "official-funder-release", "independent-science-reporting"]);

const sha256 = raw => crypto.createHash("sha256").update(raw).digest("hex");
function walk(directory, include = entry => entry.name === "ordinary-candidate.json") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(path.join(directory, entry.name), include) : include(entry) ? [path.join(directory, entry.name)] : []);
}
const accepted = new Set(["ACCEPT_LOCAL_CANONICAL_WRITE", "ACCEPT_LOCAL_CANONICAL_SUCCESSOR"]);
const admissionSchemas = new Map([
  ["daily-issue-admission-v1", ["schemaVersion", "decision", "editionDate", "envelopeSha256", "reviewedAt", "reviewedBy", "reviewerRole"]],
  ["daily-issue-news-revision-admission-v1", ["schemaVersion", "decision", "editionDate", "envelopeSha256", "predecessorEnvelopeSha256", "addedStoryIds", "reviewedAt", "reviewedBy", "reviewerRole"]],
  ["daily-issue-successor-admission-v1", ["schemaVersion", "decision", "editionDate", "envelopeSha256", "predecessorEnvelopeSha256", "reviewedAt", "reviewedBy", "reviewerRole"]]
]);
function exactAdmission(decision) {
  const keys = admissionSchemas.get(decision?.schemaVersion);
  if (!keys || !accepted.has(decision.decision) || !/independent/i.test(decision.reviewedBy || "") || !/independent/i.test(decision.reviewerRole || "") ||
      !Number.isFinite(Date.parse(decision.reviewedAt || "")) || Object.keys(decision).length !== keys.length || !keys.every(key => Object.hasOwn(decision, key))) return false;
  return decision.schemaVersion !== "daily-issue-news-revision-admission-v1" ||
    (/^[a-f0-9]{64}$/.test(decision.predecessorEnvelopeSha256 || "") && Array.isArray(decision.addedStoryIds) && decision.addedStoryIds.length > 0);
}
function decisionMatchesEnvelope(decision, envelope) {
  return exactAdmission(decision) && decision.editionDate === envelope?.editionDate && Date.parse(decision.reviewedAt) <= Date.now() &&
    (decision.schemaVersion !== "daily-issue-news-revision-admission-v1" ||
      (decision.decision === "ACCEPT_LOCAL_CANONICAL_SUCCESSOR" && decision.addedStoryIds.length === 1));
}
function issueFromEnvelope({ envelope, envelopeSha256, decision, root }) {
  const ordinary = envelope.sourceIdentity?.ordinaryCandidate ? loadOrdinaryStoryCandidate(envelope.sourceIdentity.ordinaryCandidate, { root, date: envelope.editionDate, admittedHistoricalBase: true }) : null;
  return {
    status: "complete", envelopeSha256,
    admission: Object.fromEntries(["decision", "reviewedAt", "reviewedBy", "reviewerRole"].map(key => [key, decision[key]])),
    editionDate: envelope.editionDate, editorialTimeZone: envelope.editorialTimeZone,
    disposition: envelope.disposition.toLowerCase(), storyIds: envelope.storyIds,
    stories: envelope.storySnapshots.map(snapshot => ordinary?.story.id === snapshot.id ? publishCandidateStory(snapshot, decision.reviewedAt) : snapshot),
    desks: envelope.desks, sourceIdentity: envelope.sourceIdentity,
    frontPaigeStoryId: envelope.frontPaigeStoryId || null, weeklyStoryId: envelope.weeklyStoryId || null,
    serviceRecordIds: envelope.desks.filter(desk => desk.state === "ready").map(desk => desk.recordId)
  };
}
function hasOnlyAdmittedDerivedSuccessors(snapshot, story, issues, root) {
  const before = Array.isArray(snapshot?.successorStoryIds) ? snapshot.successorStoryIds : [];
  const after = Array.isArray(story?.successorStoryIds) ? story.successorStoryIds : [];
  if (before.some(id => !after.includes(id)) || new Set(after).size !== after.length) return false;
  const additions = after.filter(id => !before.includes(id));
  if (!additions.length || stable({ ...story, successorStoryIds: before }) !== stable(snapshot)) return false;
  const acceptedIssues = (issues?.issues || []).filter(issue => issue?.status === "complete" && accepted.has(issue?.admission?.decision));
  return additions.every(id => acceptedIssues.some(issue => {
    const successor = (issue.stories || []).find(candidate => candidate?.id === id && candidate?.status === "published" && candidate?.sourceApproval?.status === "approved" && candidate?.predecessorStoryIds?.includes(story.id));
    if (!successor) return false;
    const envelopePath = path.join(root, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private");
    const envelopes = walk(envelopePath, entry => entry.name.endsWith(".json")).map(file => fs.readFileSync(file, "utf8")).filter(raw => sha256(raw) === issue.envelopeSha256);
    const evidenceRoot = path.join(root, "operations/product-stewards/newsstand/evidence");
    const decisions = walk(evidenceRoot, entry => entry.name.endsWith(".json")).flatMap(file => { try { const decision = JSON.parse(fs.readFileSync(file, "utf8")); return exactAdmission(decision) && decision.envelopeSha256 === issue.envelopeSha256 ? [decision] : []; } catch { return []; } });
    if (envelopes.length !== 1 || decisions.length !== 1) return false;
    try { verifyProjectionAdmission({ issue, envelopeRaw: envelopes[0], decision: decisions[0], root }); return true; } catch { return false; }
  }));
}
export function inspectCurrentStoryAuthority(story, { root, issues, envelopeRecords = null }) {
  const result = { errors: [], candidatePath: null, issueDate: null };
  const admitted = (issues?.issues || []).filter(issue => issue?.status === "complete" && accepted.has(issue?.admission?.decision) &&
    (issue.stories || []).some(snapshot => stable(snapshot) === stable(story) || hasOnlyAdmittedDerivedSuccessors(snapshot, story, issues, root)) && (issue.storyIds || []).includes(story.id));
  if (admitted.length !== 1) { result.errors.push(`current story requires exactly one accepted admitted issue snapshot with exact public story; found ${admitted.length}`); return result; }
  const issue = admitted[0]; result.issueDate = issue.editionDate;
  const envelopes = envelopeRecords || walk(path.join(root, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private"), entry => entry.name.endsWith(".json"))
    .map(file => { const raw = fs.readFileSync(file, "utf8"); try { return { raw, envelope: JSON.parse(raw), sha256: sha256(raw) }; } catch { return null; } }).filter(Boolean);
  const evidenceRoot = path.join(root, "operations/product-stewards/newsstand/evidence");
  const envelopeBySha = new Map(envelopes.map(envelope => [envelope.sha256, envelope]));
  const decisions = walk(evidenceRoot, entry => entry.name.endsWith(".json")).flatMap(file => { try { const decision = JSON.parse(fs.readFileSync(file, "utf8")); return decisionMatchesEnvelope(decision, envelopeBySha.get(decision.envelopeSha256)?.envelope) ? [decision] : []; } catch { return []; } });
  const decisionsBySha = new Map();
  for (const decision of decisions) decisionsBySha.set(decision.envelopeSha256, [...(decisionsBySha.get(decision.envelopeSha256) || []), decision]);
  const currentEnvelope = envelopeBySha.get(issue.envelopeSha256);
  const currentDecisions = decisionsBySha.get(issue.envelopeSha256) || [];
  if (!currentEnvelope || currentDecisions.length !== 1) result.errors.push(`accepted issue requires one exact private envelope and one schema-valid independent decision; found envelopes=${currentEnvelope ? 1 : 0} decisions=${currentDecisions.length}`);
  else { try { verifyProjectionAdmission({ issue, envelopeRaw: currentEnvelope.raw, decision: currentDecisions[0], root }); } catch (error) { result.errors.push(`exact admission replay failed (${error.message})`); } }
  if (result.errors.length) return result;
  let envelopeRecord = currentEnvelope;
  let decision = currentDecisions[0];
  const visited = new Set();
  while (true) {
    if (visited.has(envelopeRecord.sha256)) { result.errors.push("admission predecessor chain contains a cycle"); return result; }
    visited.add(envelopeRecord.sha256);
    const snapshot = envelopeRecord.envelope.storySnapshots?.find(candidate => candidate.id === story.id);
    if (!snapshot || !envelopeRecord.envelope.storyIds?.includes(story.id)) { result.errors.push("admission predecessor chain does not contain the public story"); return result; }
    const binding = envelopeRecord.envelope.sourceIdentity?.ordinaryCandidate;
    if (binding?.storyId === story.id) {
      try {
        const loaded = loadOrdinaryStoryCandidate(binding, { root, date: envelopeRecord.envelope.editionDate, admittedHistoricalBase: true });
        const expected = publishCandidateStory(loaded.candidate.story, decision.reviewedAt);
        if (loaded.candidate.candidateId !== story.id || loaded.maker === decision.reviewedBy || Date.parse(decision.reviewedAt) < Date.parse(loaded.reviewedAt) || (stable(expected) !== stable(story) && !hasOnlyAdmittedDerivedSuccessors(expected, story, issues, root))) result.errors.push("bound ordinary candidate does not project exactly to public story approval/status/content");
        else result.candidatePath = binding.path;
      } catch (error) { result.errors.push(`checksum-bound ordinary candidate is invalid (${error.message})`); }
      return result;
    }
    if (decision.schemaVersion !== "daily-issue-news-revision-admission-v1") { result.errors.push("carried story has no schema-valid admitted predecessor candidate"); return result; }
    const predecessor = envelopeBySha.get(decision.predecessorEnvelopeSha256);
    const predecessorDecisions = decisionsBySha.get(decision.predecessorEnvelopeSha256) || [];
    if (!predecessor || predecessorDecisions.length !== 1) { result.errors.push(`admission predecessor requires one exact private envelope and one schema-valid independent decision; found envelopes=${predecessor ? 1 : 0} decisions=${predecessorDecisions.length}`); return result; }
    const predecessorSnapshot = predecessor.envelope.storySnapshots?.find(candidate => candidate.id === story.id);
    if (!predecessorSnapshot || !predecessor.envelope.storyIds?.includes(story.id)) { result.errors.push("admission predecessor does not preserve the carried story snapshot"); return result; }
    let preserved = stable(predecessorSnapshot) === stable(snapshot);
    if (predecessor.envelope.sourceIdentity?.ordinaryCandidate?.storyId === story.id) {
      try {
        const loaded = loadOrdinaryStoryCandidate(predecessor.envelope.sourceIdentity.ordinaryCandidate, { root, date: predecessor.envelope.editionDate, admittedHistoricalBase: true });
        preserved = stable(publishCandidateStory(loaded.candidate.story, predecessorDecisions[0].reviewedAt)) === stable(snapshot);
      } catch { preserved = false; }
    }
    if (!preserved) { result.errors.push("admission predecessor does not preserve the carried story snapshot"); return result; }
    try { verifyProjectionAdmission({ issue: issueFromEnvelope({ envelope: predecessor.envelope, envelopeSha256: predecessor.sha256, decision: predecessorDecisions[0], root }), envelopeRaw: predecessor.raw, decision: predecessorDecisions[0], root }); }
    catch (error) { result.errors.push(`admission predecessor replay failed (${error.message})`); return result; }
    envelopeRecord = predecessor; decision = predecessorDecisions[0];
  }
  return result;
}
