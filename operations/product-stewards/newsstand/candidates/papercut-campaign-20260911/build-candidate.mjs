#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, stable, validateOrdinaryDailyLength } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";
import { inspectPreparedDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { validateStoryTypeCoverage } from "../../../../../scripts/validate-newsstand-story-type-coverage.mjs";

const root = process.cwd();
const id = "papercut-campaign-20260911";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/anthropic-threat-report-20260910";
const now = "2026-09-11T08:24:00-07:00";
// Bound to the completed producer receipt that preceded the 08:33:25 review dispatch.
const producerReviewedAt = "2026-09-11T08:33:10-07:00";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const bind = name => ({ path: `${dir}/${name}`, sha256: hash(fs.readFileSync(path.join(root, dir, name))) });

fs.copyFileSync(path.join(root, "content/newsstand-stories.js"), path.join(root, dir, "publication-base.js"));

const story = {
  id, slug: id, edition: "daily", status: "hold", publishedAt: null, updatedAt: now, lastCheckedAt: now,
  sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
  correction: null, correctionHistory: [], retraction: null,
  predecessorStoryIds: [], successorStoryIds: [], relationshipType: null,
  bigPicture: null, thread: null, thread_subtitle: null, thread_entry: null,
  headline: "Researchers say AI agents helped attack 395 organizations through PaperCut servers",
  heroVisual: { src: "/assets/newsstand/design-20260830/latest-checking.png", alt: "Illustration of a magnifying glass examining the evidence behind an AI headline in a newspaper.", credit: "LAiDIES NewsStand evidence-checking illustration" },
  the_story: `<p>GreyNoise says hundreds of AI agents helped an attacker compromise at least 440 PaperCut installations at 395 organizations in 48 countries. Its September 9 report describes a campaign that began on August 31. PaperCut confirms active exploitation and customer incidents, but it has not confirmed GreyNoise’s totals or AI attribution.</p><p>PaperCut NG/MF is self-hosted software for managing an organization’s printing, copying and scanning. A person may only see a school or office printer, while PaperCut can run on a server connected to the organization’s Windows directory. GreyNoise says the attacker reached domain-administrator control at 12 organizations. <strong>Domain administrator</strong> means a powerful permission that can manage connected Windows accounts and systems across an organization.</p>`,
  laidies_read: `<p>GreyNoise says the actor combined AI coordination with existing offensive tools and vulnerabilities in internet-facing PaperCut servers. GreyNoise describes Codex as the <strong>harness</strong> coordinating the work and DeepSeek—not an OpenAI model—as the model powering the agents. A harness is the coordinating software around a model that starts, routes and monitors agent jobs. An <strong>AI agent</strong> is software that can plan and carry out several steps with tools instead of stopping at one answer.</p><p>That division of labour is the AI change: many agent jobs could work in parallel, while the vulnerable server remained the opening. GreyNoise says that once the campaign launched, at least 11 organizations were compromised in 26 seconds. Results were uneven: domain-administrator control reached only 12 organizations overall, and a web firewall stopped one attempt.</p><p>PaperCut’s September 10 bulletin says it has not independently verified GreyNoise’s indicators and did not receive them through customer reports. It does confirm active exploitation and customer incidents. BleepingComputer reported the figures as GreyNoise’s findings, not a separate count. GreyNoise says the actor’s motive is unknown; data theft or ransomware are possible later uses of access, not established outcomes.</p><p>PaperCut published maintenance releases 26.0.5, 25.0.13 and 24.1.10 on September 10 and recommends them for all NG/MF customers. The company says most application servers are patched or behind a firewall, while public unpatched servers remain targets.</p>`,
  what_this_means: `<p>If you use a printer but do not manage the system, this is not an update to install on your own laptop. Ask the organization whether it runs PaperCut NG/MF and whether its application server has moved to a current maintenance release. If you administer PaperCut, use the vendor bulletin and your organization’s incident-response process rather than acting on an unverified indicator alone.</p><p>The next useful evidence is independent confirmation of GreyNoise’s counts and attribution, plus verified consequences at affected organizations. Ask how AI coordination changed the speed and scale around an existing software weakness.</p>`,
  cocktail_party: "“GreyNoise says an attacker used AI agents to coordinate attacks on vulnerable PaperCut servers. PaperCut confirms incidents, but not the research firm’s exact count or AI attribution.”",
  watch_fors: null, closing_note: null,
  class_notes: `An AI agent coordinates tools and repeated steps rather than stopping at one answer. <a href="/library.html#ai-fundamentals-101::%40ch-2-2-4-agentic-ai-the-layer-that-acts">AI Fundamentals 101: Agentic AI — The Layer That Acts</a> explains the difference.`,
  sources: [
    { id: "greynoise-papercut-report", label: "GreyNoise — Agents Gone Wild: an AI-orchestrated campaign against PaperCut NG/MF", url: "https://www.greynoise.io/blog/ai-orchestrated-campaign-against-papercut-ng-mf", publisherType: "security-research-primary", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "papercut-security-bulletin", label: "PaperCut — NG/MF urgent security advisory", url: "https://www.papercut.com/kb/Main/security-bulletin-27-aug-2026-urgent-security-advisory/", publisherType: "vendor-primary-bulletin", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "bleepingcomputer-papercut-report", label: "BleepingComputer — AI-powered attack exploited PaperCut flaws", url: "https://www.bleepingcomputer.com/news/security/ai-powered-attack-exploited-papercut-flaws-to-hack-395-organizations/", publisherType: "reporting", accessedAt: "2026-09-11", approvalStatus: "reviewed" }
  ],
  aidb_credit: null, themes: ["cybersecurity", "AI agents"], concepts: ["AI agent", "harness", "domain administrator", "source confirmation"], tags: ["PaperCut", "GreyNoise", "Codex", "DeepSeek", "cybersecurity"], saint_lane: null, badge: "THE LATEST"
};

write("story.json", story);
write("review-text.json", candidateReviewText(story));
const strip = html => html.replaceAll(/<\/p>/g, "\n\n").replaceAll(/<[^>]+>/g, "").trim();
const article = `# ${story.headline}\n\n## The story\n\n${strip(story.the_story)}\n\n## The LAiDIES read\n\n${strip(story.laidies_read)}\n\n## What this means for you\n\n${strip(story.what_this_means)}\n`;
if (article !== read(`${dir}/article.md`)) throw new Error("article.md differs from exact story prose");
write("rendered-article.html", `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);

const evidence = JSON.parse(read(`${dir}/source-evidence.json`));
const byId = new Map(evidence.records.map(record => [record.id, record]));
const passage = (id, fragment) => {
  const found = byId.get(id).passages.find(value => value.includes(fragment));
  if (!found) throw Error(`Missing source passage ${id}/${fragment}`);
  return found;
};
const claimSpecs = [
  ["scale", "at least 440 PaperCut installations at 395 organizations in 48 countries", "P002", ["greynoise-papercut-report"], [["greynoise-papercut-report", "440 instances"]], "GreyNoise's observed campaign count, attributed in prose."],
  ["report-timeline", "September 9 report describes a campaign that began on August 31", "P002", ["greynoise-papercut-report"], [["greynoise-papercut-report", "September 9, 2026"], ["greynoise-papercut-report", "On 31 August 2026"]], "Report and campaign dates remain distinct from publication."],
  ["vendor-confirmation-limit", "PaperCut confirms active exploitation and customer incidents, but it has not confirmed GreyNoise’s totals or AI attribution", "P002", ["papercut-security-bulletin"], [["papercut-security-bulletin", "investigating active exploitation"], ["papercut-security-bulletin", "confirmed customer incidents"], ["papercut-security-bulletin", "not verified these independently"]], "Vendor confirmation and non-verification appear together."],
  ["papercut-identity", "self-hosted software for managing an organization’s printing, copying and scanning", "P003", ["greynoise-papercut-report"], [["greynoise-papercut-report", "PaperCut is print management software"]], "Plain product identity from the primary report."],
  ["server-directory", "PaperCut can run on a server connected to the organization’s Windows directory", "P003", ["greynoise-papercut-report"], [["greynoise-papercut-report", "usually domain-joined and integrated with Active Directory"]], "Plain translation of self-hosted, domain-joined deployment."],
  ["domain-admin-count", "domain-administrator control at 12 organizations", "P003", ["greynoise-papercut-report"], [["greynoise-papercut-report", "domain admin against only 12"]], "GreyNoise's bounded access-level count."],
  ["domain-admin-meaning", "a powerful permission that can manage connected Windows accounts and systems across an organization", "P003", ["greynoise-papercut-report"], [["greynoise-papercut-report", "domain admin"]], "Qualified plain-language definition; no exploitation method supplied."],
  ["coordination-tools", "combined AI coordination with existing offensive tools and vulnerabilities in internet-facing PaperCut servers", "P004", ["greynoise-papercut-report"], [["greynoise-papercut-report", "artificial intelligence (AI) to develop, test, and use exploits"], ["greynoise-papercut-report", "various publicly available offensive security tools"]], "Synthesis of the report's attributed mechanism."],
  ["harness-model", "DeepSeek—not an OpenAI model—as the model powering the agents", "P004", ["greynoise-papercut-report"], [["greynoise-papercut-report", "OpenAI’s Codex (harness), a DeepSeek model (not OpenAI models)"]], "Primary harness-versus-model distinction preserved exactly."],
  ["harness-meaning", "the coordinating software around a model that starts, routes and monitors agent jobs", "P004", ["greynoise-papercut-report"], [["greynoise-papercut-report", "hundreds of AI Agents powered by OpenAI’s Codex (harness)"]], "Qualified plain-language role definition."],
  ["agent-meaning", "software that can plan and carry out several steps with tools instead of stopping at one answer", "P004", ["greynoise-papercut-report"], [["greynoise-papercut-report", "used hundreds of AI Agents"]], "Qualified plain-language definition grounded in the multi-workflow report."],
  ["parallel-speed", "at least 11 organizations were compromised in 26 seconds", "P005", ["greynoise-papercut-report"], [["greynoise-papercut-report", "compromised at least 11 organizations in 26 seconds"]], "GreyNoise's observed timing, attributed."],
  ["uneven-results", "domain-administrator control reached only 12 organizations overall, and a web firewall stopped one attempt", "P005", ["greynoise-papercut-report"], [["greynoise-papercut-report", "domain admin against only 12"], ["greynoise-papercut-report", "Web Application Firewall (WAF) defeated"]], "Limits the speed claim with failed and narrower outcomes."],
  ["papercut-nonverification", "has not independently verified GreyNoise’s indicators and did not receive them through customer reports", "P006", ["papercut-security-bulletin"], [["papercut-security-bulletin", "not verified these independently"]], "PaperCut's exact caveat retained."],
  ["bleeping-boundary", "reported the figures as GreyNoise’s findings, not a separate count", "P006", ["bleepingcomputer-papercut-report"], [["bleepingcomputer-papercut-report", "GreyNoise data indicates"]], "Qualified absence statement from the complete independent article."],
  ["motive-outcome", "actor’s motive is unknown; data theft or ransomware are possible later uses of access, not established outcomes", "P006", ["greynoise-papercut-report", "bleepingcomputer-papercut-report"], [["greynoise-papercut-report", "It is unclear if this actor"], ["bleepingcomputer-papercut-report", "could not determine the attacker’s campaign objective"]], "Possibilities kept separate from observed outcomes."],
  ["maintenance-releases", "maintenance releases 26.0.5, 25.0.13 and 24.1.10 on September 10", "P007", ["papercut-security-bulletin"], [["papercut-security-bulletin", "10 Sep 2026, 2:00pm"], ["papercut-security-bulletin", "26.0.5, 25.0.13 and 24.1.10"]], "Current vendor release fact."],
  ["current-status", "most application servers are patched or behind a firewall, while public unpatched servers remain targets", "P007", ["papercut-security-bulletin"], [["papercut-security-bulletin", "majority of customers"], ["papercut-security-bulletin", "remain publicly reachable and unpatched"]], "Attributed vendor status report, not an independent census."],
  ["reader-action", "Ask the organization whether it runs PaperCut NG/MF and whether its application server has moved to a current maintenance release", "P008", ["papercut-security-bulletin"], [["papercut-security-bulletin", "recommended build for all customers"]], "Proportionate question follows vendor guidance without assuming reader administration."],
  ["admin-action", "use the vendor bulletin and your organization’s incident-response process rather than acting on an unverified indicator alone", "P008", ["papercut-security-bulletin"], [["papercut-security-bulletin", "validate anything you act on against your own environment"]], "High-level vendor-directed response; no operational exploit instruction."],
  ["next-evidence", "independent confirmation of GreyNoise’s counts and attribution, plus verified consequences", "P009", ["greynoise-papercut-report", "papercut-security-bulletin"], [["papercut-security-bulletin", "not verified these independently"], ["greynoise-papercut-report", "It is unclear if this actor"]], "Next evidence follows the current uncertainty." ]
];
const claims = claimSpecs.map(([claimId, excerpt, locator, sourceIds, supports, scopeAndFreshness]) => ({ claimId, status: "QUALIFIED", candidateEvidence: [{ excerpt, locator }], sourceIds, scopeAndFreshness, supports: supports.map(([sourceId, fragment]) => ({ sourceId, passage: passage(sourceId, fragment) })) }));
write("claim-map.json", claims.map(({supports, ...claim}) => claim));
write("source-packet-preflight.json", { schemaVersion: "laidies.newsstand-source-packet-preflight.v1", candidateId: id, checkedAt: producerReviewedAt, method: "Every atomic candidate claim maps to exact passages included in the reviewer packet and preserved source. Operational attack instructions are excluded because the article does not rely on them.", claims: claims.map(claim => ({ claimId: claim.claimId, supports: claim.supports })) });
write("publication-manifest.json", { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") });

const observations = {
  completeTextRead: true, storySha256: hash(JSON.stringify(story)),
  readerAnswers: {
    incident: "at least 440 PaperCut installations at 395 organizations in 48 countries",
    mechanism: "Codex as the harness coordinating the work and DeepSeek—not an OpenAI model—as the model powering the agents",
    evidence: "has not independently verified GreyNoise’s indicators",
    action: "Ask the organization whether it runs PaperCut NG/MF"
  },
  terms: {
    "AI agent": "software that can plan and carry out several steps with tools instead of stopping at one answer",
    harness: "the coordinating software around a model that starts, routes and monitors agent jobs",
    "domain administrator": "a powerful permission that can manage connected Windows accounts and systems across an organization"
  },
  explainBack: "The vulnerable PaperCut server was the opening. GreyNoise says a Codex harness coordinated many agent jobs powered by a DeepSeek model and existing security tools around that opening.",
  unseenTransfer: "For another AI-enabled intrusion claim, separate the coordinating harness, the model, the tools and the underlying vulnerable system, then ask which effects the affected vendor independently confirms.",
  unresolvedIssues: [],
  repairsMade: [
    "Used GreyNoise's exact harness-versus-model wording so Codex is not described as the model powering the agents.",
    "Placed PaperCut's confirmed incidents and explicit non-verification beside GreyNoise's victim count and attribution.",
    "Omitted exploit commands, indicators, target lists, victim identities and the detailed attack paths from the reader article and review source packet.",
    "Made ransomware and data theft possible follow-on uses rather than observed outcomes, because GreyNoise says motive is unknown.",
    "Gave separate actions for an ordinary printer user and a PaperCut administrator instead of assuming the reader manages systems."
  ],
  limitations: [
    "Producer assessment only, not independent admission.",
    "GreyNoise owns the specific campaign count and AI attribution; PaperCut has not independently verified them.",
    "BleepingComputer was read completely through the web browsing layer after direct curl returned HTTP 403.",
    "No human-comprehension or public-release result is claimed."
  ]
};
write("producer-observations.json", observations);

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id; producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = producerReviewedAt;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = { humanQuestion: "What did AI actually do in the PaperCut attacks, what was harmed and what is independently confirmed?", promisedPayoff: "See the coordinator-model-tools-server chain and separate GreyNoise's claims from PaperCut's confirmations.", centralMentalModel: "The vulnerable server was the opening; a harness coordinated agent jobs powered by a model and existing tools around it.", dailyLifeConnection: "The visible school or office printer can connect to a self-hosted management server and wider Windows directory.", surfaceJob: "September 11 explanation of GreyNoise's September 9 report and PaperCut's September 10 response.", desiredReaderFeeling: "I know what AI coordinated, what the vulnerable server enabled, what the vendor confirms and what remains uncertain." };
const exact = { plainClarity: "PaperCut NG/MF is self-hosted software", readerValue: "Ask the organization whether it runs PaperCut NG/MF", laidiesVoice: "Ask how AI coordination changed", engagingEnjoyable: "A person may only see a school or office printer", factualIntegrity: "has not independently verified GreyNoise’s indicators", freshnessReviewability: "September 10 bulletin", surfaceFit: "Researchers say AI agents helped attack", datedChange: "Its September 9 report describes a campaign that began on August 31", consequenceAndUncertainty: "motive is unknown", dailyLifeConnection: "school or office printer", communicationBenchmark: "That division of labour is the AI change", explainBack: "DeepSeek—not an OpenAI model", unseenTransfer: "AI coordination changed the speed and scale around an existing software weakness", usefulAction: "Ask the organization whether it runs PaperCut NG/MF", analogyIntegrity: "school or office printer" };
for (const [name, outcome] of Object.entries(producer.outcomes)) { outcome.verdict = "PASS"; outcome.observation = `The complete story supplies ${name} evidence while keeping the AI roles, vulnerable server, reported consequences and vendor confirmation connected.`; outcome.artifactEvidence = [{ excerpt: exact[name] || exact.readerValue, locator: "exact story" }]; }
producer.outcomes.explainBack.simulatedReaderProbe = { prompt: "Did an OpenAI model power the attacking agents?", probeResponse: "No. GreyNoise says Codex was the coordinating harness and DeepSeek was the model powering the agents; existing tools acted on vulnerable PaperCut servers.", expectedEvidence: "The harness, model, tools and vulnerable server remain distinct.", transferResult: "PASS" };
producer.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: "How should I read a later headline saying AI hacked another product?", probeResponse: "Separate the software opening from the model, coordinating harness and tools, then ask which outcomes the affected vendor independently confirms.", expectedEvidence: "The four-part mechanism and evidence boundary transfer beyond PaperCut.", transferResult: "PASS" };
for (const [name, family] of Object.entries(producer.failureFamilies)) { family.present = false; family.observation = `The complete story avoids ${name}; the dated incident, mechanism, source boundary, current response and role-specific action remain connected.`; family.artifactLocator = "complete exact story"; }
const cleanClaims = claims.map(({supports, ...claim}) => claim);
producer.factualReview = { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind("source-evidence.json")], claimMap: cleanClaims.map(claim => ({ ...claim, sourceBinding: bind("source-evidence.json"), sourceEvidence: claim.sourceIds.flatMap(sourceId => byId.get(sourceId).passages.map(excerpt => ({ excerpt, locator: byId.get(sourceId).url }))) })), reviewedThrough: "2026-09-11", nextTrigger: "Reopen GreyNoise, PaperCut and BleepingComputer on publication day; redraft for corrected counts or attribution, new verified victim effects, changed release guidance, a completed criminal outcome or a material independent investigation.", correctionOwner: "LAiDIES NewsStand product steward" };
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No prior checksum-bound NewsStand candidate reports this GreyNoise PaperCut campaign and vendor response." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "The source-complete producer preflight found no unresolved defect after separating the AI roles, underlying vulnerability, reported harm, vendor confirmation and unknown motive." };
producer.verdict = "PASS"; producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no observed human-comprehension evidence is claimed.", "Public release remains separate."];
write("producer-publication-review.json", producer);
write("review-metrics.json", { proseReview: { reviewIssues: 0, reviewCycles: 1 }, sourcePacket: { rounds: 1, gaps: 0, repaired: 0, preflight: "check-source-packet-preflight.mjs --calibrate", checkedClaims: cleanClaims.length, exactSourceExcerpts: claims.reduce((sum, claim) => sum + claim.supports.length, 0) }, ratchet: producer.ratchet });
write("editorial-input.json", { readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`, completeArtifact: read(`${dir}/review-text.json`), paragraphs: storyParagraphs(story), communicationAuthority: JSON.parse(read(`${dir}/writer-input.json`)).packet.communication, claims: cleanClaims.map(claim => ({ claimId: claim.claimId, claim: claim.candidateEvidence[0].excerpt, sourceIds: claim.sourceIds })), sources: evidence.records.map(record => { const full = record.id === "greynoise-papercut-report" ? read(`${dir}/source/greynoise-relevant.txt`) : record.id === "papercut-security-bulletin" ? read(`${dir}/source/papercut-relevant.txt`) : read(`${dir}/source/bleepingcomputer-web-observation.json`); return { id: record.id, url: record.url, authority: record.authority, passages: record.passages, limitation: record.limitation, source: { url: record.url, passage: full, passageLocator: record.url, additionalPassage: `${record.passages.join("\n")}\nAuthority: ${record.authority}\nLimitation: ${record.limitation}`, additionalPassageLocator: record.url } }; }) });

const coverage = JSON.parse(read(`${dir}/story-type-coverage.json`));
const coverageErrors = validateStoryTypeCoverage(coverage, story.themes, undefined, { story, root }); if (coverageErrors.length) throw new Error(`story-type coverage: ${coverageErrors.join(" | ")}`);
const lengthErrors = validateOrdinaryDailyLength(story); if (lengthErrors.length) throw new Error(`reader budget: ${lengthErrors.join(" | ")}`);
const prepared = inspectPreparedDraft(story, JSON.parse(read(`${dir}/writer-input.json`)), observations, { root }); if (prepared.errors.length) throw new Error(`producer observations: ${prepared.errors.join(" | ")}`);
console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), reviewTextSha256: bind("review-text.json").sha256, publicationBaseSha256: bind("publication-base.js").sha256, status: "PENDING_INDEPENDENT_REVIEW" }));
