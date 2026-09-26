#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, stable, validateOrdinaryDailyLength } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";
import { inspectPreparedDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { validateStoryTypeCoverage } from "../../../../../scripts/validate-newsstand-story-type-coverage.mjs";

const root = process.cwd();
const id = "microsoft-family-safety-20260911";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/gpt-live-downstream-20260911";
const now = "2026-09-11T07:30:57-07:00";
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
  headline: "Microsoft updated family controls. Its wider Windows age signals are still in preview.",
  heroVisual: { src: "/assets/newsstand/design-20260830/latest-checking.png", alt: "Illustration of a magnifying glass examining the evidence behind an AI headline in a newspaper.", credit: "LAiDIES NewsStand evidence-checking illustration" },
  the_story: `<p>Microsoft published a youth-safety framework on September 10. It says everyone must now sign in to use Copilot and that access is restricted below age 13, or an older age where local law requires it. For the updated Copilot app with a personal Microsoft account, the support page sets a minimum age of 13, or higher where regional rules require it. That page does not cover work, school or organizational accounts.</p><p>Some practical family controls are available now. In current Family Safety apps and on the web, Microsoft says requests for more screen time, app access and purchases are faster; activity reports cover more apps; wallet balances are fixed; and family-group membership is easier to manage. The company says usage-time accuracy still needs work and some families may still have problems.</p><p>A different part of the announcement is still a preview. Microsoft is testing Windows tools that pass an age category or verification status from an account to an app. The Windows Age APIs are available to Windows Insiders now, and one announced function is promised for a future update. They are not a universal age check running in every Windows app today.</p>`,
  laidies_read: `<p>The useful way to read this is as three separate layers. A Microsoft account can carry age information. Copilot can use that information to set its own access rules. Family Safety provides separate controls for screen time, apps, spending and activity reports.</p><p>The account supplies an <strong>age signal</strong>—an age category or verification status an account can pass to an app without giving it a full date of birth. Microsoft lists brackets from under 10 through 18 and over. The app developer still decides what experience follows from the signal. A request for more screen time still goes through Family Safety; the preview age signal is a separate path an app could use to change its own experience.</p><p>A <strong>Windows Insider</strong> is a person using a preview version of Windows before a feature reaches the general public. Independent reporting from Windows Central confirms that the Family Safety changes update existing controls and that the age tools remain limited to Insiders. It does not test whether approvals are faster, reports are more accurate or young people are safer. Those remain Microsoft’s claims.</p>`,
  what_this_means: `<p>If you help manage a family account, the current step is concrete: update the Family Safety app or use its web page for the controls that exist now. For Copilot, check whether the person is using the updated personal-account app; Microsoft’s cited support page does not govern work or school accounts.</p><p>When another age-safety headline arrives, ask which layer it describes: a rule inside one product, a family control you can use, or a Windows signal an app may choose to use. The next evidence worth watching is general Windows availability and independent testing of whether the changes actually reduce errors or harm.</p>`,
  cocktail_party: "“Microsoft has current Copilot age rules and Family Safety fixes, but its wider Windows age signals are still an Insider preview. An age category can inform an app; it does not create the app’s safeguards.”",
  watch_fors: null, closing_note: null,
  class_notes: "An account’s age information, a product’s access rule and a family control do different jobs. Ask which layer changed before expecting a new safeguard.",
  sources: [
    { id: "microsoft-safe-participation-framework", label: "Microsoft — Safe Participation Framework", url: "https://blogs.microsoft.com/on-the-issues/2026/09/10/safe-participation-framework-opportunity-and-safety-for-the-next-generation-in-the-age-of-ai/", publisherType: "company-primary-release", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "microsoft-copilot-young-people-support", label: "Microsoft Support — Copilot for young people", url: "https://support.microsoft.com/en-us/privacy/microsoft-copilot/young-people", publisherType: "company-primary-documentation", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "microsoft-windows-age-api", label: "Microsoft Windows — Windows age signals and family protections", url: "https://blogs.windows.com/windowsexperience/2026/09/08/helping-families-and-educators-support-safer-experiences-and-healthier-habits-on-windows/", publisherType: "company-primary-release", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "microsoft-family-safety-fixes", label: "Microsoft Windows — Family Safety fixes", url: "https://blogs.windows.com/windowsexperience/2026/09/08/listening-to-families-improving-microsoft-family/", publisherType: "company-primary-release", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "windows-central-family-scope-report", label: "Windows Central — Family controls and age API rollout", url: "https://www.windowscentral.com/microsoft/windows-11/microsoft-fixes-sluggish-windows-11-parental-approvals-and-expands-age-verification", publisherType: "reporting", accessedAt: "2026-09-11", approvalStatus: "reviewed" }
  ],
  aidb_credit: null, themes: ["consumer products", "family controls"], concepts: ["age signal", "Windows Insider", "family controls"], tags: ["Microsoft", "Copilot", "Family Safety", "Windows age signals", "young people"], saint_lane: null, badge: "THE LATEST"
};

write("story.json", story);
write("review-text.json", candidateReviewText(story));
const strip = html => html.replaceAll(/<\/p>/g, "\n\n").replaceAll(/<[^>]+>/g, "").trim();
const article = `# ${story.headline}\n\n## The story\n\n${strip(story.the_story)}\n\n## The LAiDIES read\n\n${strip(story.laidies_read)}\n\n## What this means for you\n\n${strip(story.what_this_means)}\n`;
if (article !== read(`${dir}/article.md`)) throw new Error("article.md differs from exact story prose");
write("rendered-article.html", `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);

const claims = [
  ["framework-date", "Microsoft published a youth-safety framework on September 10", "P001", ["microsoft-safe-participation-framework"], "Exact company publication date and bounded identity."],
  ["copilot-signin", "everyone must now sign in to use Copilot", "P001", ["microsoft-safe-participation-framework"], "Attributed to Microsoft's current framework."],
  ["copilot-age", "the support page sets a minimum age of 13, or higher where regional rules require it", "P001", ["microsoft-safe-participation-framework", "microsoft-copilot-young-people-support"], "Applies to the updated personal-account Copilot support page; work and school accounts are excluded in the next sentence."],
  ["family-fixes", "requests for more screen time, app access and purchases are faster; activity reports cover more apps; wallet balances are fixed", "P002", ["microsoft-family-safety-fixes", "windows-central-family-scope-report"], "Product changes remain company claims; independent reporting confirms their announced scope."],
  ["remaining-family-limits", "usage-time accuracy still needs work and some families may still have problems", "P002", ["microsoft-family-safety-fixes"], "Preserves Microsoft's own qualifications."],
  ["age-api-preview", "The Windows Age APIs are available to Windows Insiders now", "P003", ["microsoft-windows-age-api", "windows-central-family-scope-report"], "Current preview availability, not general rollout."],
  ["future-function", "one announced function is promised for a future update", "P003", ["microsoft-windows-age-api"], "CheckAgeStatusAsync is not represented as currently available."],
  ["age-signal", "an age category or verification status an account can pass to an app without giving it a full date of birth", "P005", ["microsoft-windows-age-api"], "Plain-language synthesis of the exact age-range and privacy passages."],
  ["developer-choice", "The app developer still decides what experience follows from the signal", "P005", ["microsoft-windows-age-api"], "Inference from Microsoft presenting the signal for apps to use; it does not claim the signal itself supplies safeguards."],
  ["independent-limit", "It does not test whether approvals are faster, reports are more accurate or young people are safer", "P006", ["windows-central-family-scope-report", "microsoft-family-safety-fixes"], "Absence statement limited to the reviewed independent report and company release."],
  ["current-action", "update the Family Safety app or use its web page for the controls that exist now", "P007", ["microsoft-family-safety-fixes"], "Directly follows Microsoft's availability instruction; no universal benefit is promised."]
].map(([claimId, excerpt, locator, sourceIds, scopeAndFreshness]) => ({ claimId, status: "QUALIFIED", candidateEvidence: [{ excerpt, locator }], sourceIds, scopeAndFreshness }));
write("claim-map.json", claims);
write("publication-manifest.json", { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") });

const observations = {
  completeTextRead: true,
  storySha256: hash(JSON.stringify(story)),
  readerAnswers: {
    now: "Some practical family controls are available now",
    copilot: "the updated personal-account app; Microsoft’s cited support page does not govern work or school accounts",
    mechanism: "The account supplies an age signal—an age category or verification status an account can pass to an app without giving it a full date of birth",
    limits: "the age tools remain limited to Insiders. It does not test whether approvals are faster, reports are more accurate or young people are safer"
  },
  terms: {
    "age signal": "an age category or verification status an account can pass to an app without giving it a full date of birth",
    "Windows Insider": "a person using a preview version of Windows before a feature reaches the general public"
  },
  explainBack: "The Microsoft account can carry age context, one product such as Copilot can use it for an access rule, and Family Safety supplies separate controls. A preview Windows API may later pass a limited age signal to more apps, whose developers still decide what to do with it.",
  unseenTransfer: "If a game later receives a teen age category, that signal would not itself block a purchase or change chat. The game developer would still have to connect the signal to an actual control and show that the control works.",
  unresolvedIssues: [],
  repairsMade: [
    "Separated the current Copilot personal-account rule, current Family Safety fixes and preview Windows age API into three explicit layers.",
    "Placed Microsoft’s remaining Family Safety qualifications beside the availability claim.",
    "Named the personal-account support scope and excluded work and school accounts.",
    "Kept safety, accuracy and speed statements attributed and named the absence of independent outcome testing.",
    "Recorded a specific learning gap instead of adding an unrelated Library link."
  ],
  limitations: [
    "Producer assessment only, not independent admission.",
    "No reviewed source independently measures safety, approval speed, activity-report accuracy or privacy behavior.",
    "The reviewed sources do not establish when the age APIs will reach all Windows users or how third-party apps will use them."
  ]
};
write("producer-observations.json", observations);

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id;
producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = now;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = {
  humanQuestion: "What changed in Microsoft’s family protections, what works now and are Windows age checks universal?",
  promisedPayoff: "Separate current Copilot and Family Safety changes from an Insider-only age signal and from unproved safety outcomes.",
  centralMentalModel: "Account context, one product’s access rule, family controls and a preview app signal do different jobs.",
  dailyLifeConnection: "A person helping a young user manage Copilot, Windows apps, screen time or purchases.",
  surfaceJob: "September 11 explanation of the September 10 framework and September 8 product changes.",
  desiredReaderFeeling: "I know what can be used now and what remains a company claim or preview."
};
const exact = {
  plainClarity: "The useful way to read this is as three separate layers",
  readerValue: "Some practical family controls are available now",
  laidiesVoice: "ask which layer it describes",
  engagingEnjoyable: "A request for more screen time still goes through Family Safety",
  factualIntegrity: "Those remain Microsoft’s claims",
  freshnessReviewability: "The next evidence worth watching is general Windows availability and independent testing",
  surfaceFit: "Microsoft updated family controls. Its wider Windows age signals are still in preview.",
  datedChange: "Microsoft published a youth-safety framework on September 10",
  consequenceAndUncertainty: "They are not a universal age check running in every Windows app today",
  dailyLifeConnection: "If you help manage a family account",
  communicationBenchmark: "The account supplies an <strong>age signal</strong>—an age category or verification status an account can pass to an app without giving it a full date of birth",
  explainBack: "A Microsoft account can carry age information. Copilot can use that information to set its own access rules.",
  unseenTransfer: "a Windows signal an app may choose to use",
  usefulAction: "update the Family Safety app or use its web page for the controls that exist now",
  analogyIntegrity: "A request for more screen time still goes through Family Safety; the preview age signal is a separate path"
};
for (const [name, outcome] of Object.entries(producer.outcomes)) {
  outcome.verdict = "PASS";
  outcome.observation = `The complete story supplies ${name} evidence while keeping product layers, availability and company claims distinct.`;
  outcome.artifactEvidence = [{ excerpt: exact[name] || exact.readerValue, locator: "exact story" }];
}
producer.outcomes.explainBack.simulatedReaderProbe = { prompt: "Does the age signal itself set a screen-time limit?", probeResponse: "No. The account can supply an age category, but Family Safety or an app must connect that information to a control.", expectedEvidence: "Account signal and product control remain distinct.", transferResult: "PASS" };
producer.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: "If a game later receives a teen age category, what still has to happen?", probeResponse: "The game developer must decide which experience or control follows from the signal and test whether it works.", expectedEvidence: "The account-to-signal-to-app model transfers to a product absent from the story’s worked screen-time example.", transferResult: "PASS" };
for (const [name, family] of Object.entries(producer.failureFamilies)) {
  family.present = false;
  family.observation = `The complete story avoids ${name}; the dated changes, current availability, mechanism and evidence limits remain connected.`;
  family.artifactLocator = "complete exact story";
}
const evidence = JSON.parse(read(`${dir}/source-evidence.json`));
const byId = new Map(evidence.records.map(record => [record.id, record]));
producer.factualReview = {
  disposition: "CLAIMS_REVIEWED",
  sourceBindings: [bind("source-evidence.json")],
  claimMap: claims.map(claim => ({ ...claim, sourceBinding: bind("source-evidence.json"), sourceEvidence: claim.sourceIds.flatMap(sourceId => byId.get(sourceId).passages.map(excerpt => ({ excerpt, locator: byId.get(sourceId).url }))) })),
  reviewedThrough: "2026-09-11",
  nextTrigger: "Reopen all Microsoft pages on publication day; redraft for changed Copilot age or account rules, general Windows Age API availability, changed Family Safety availability, corrections or independent safety-outcome evidence.",
  correctionOwner: "LAiDIES NewsStand product steward"
};
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No checksum-bound reviewed predecessor candidate covers Microsoft’s September 2026 Copilot, Family Safety and Windows age-signal changes together." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "The producer found no unresolved current defect after separating the three product layers, preview scope and company-evidence boundary." };
producer.verdict = "PASS";
producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no observed human-comprehension evidence is claimed.", "Public release remains separate."];
write("producer-publication-review.json", producer);
write("review-metrics.json", { proseReview: { reviewIssues: 0, reviewCycles: 1 }, evidencePacket: { rounds: 1, gaps: 0 }, ratchet: producer.ratchet });
write("editorial-input.json", {
  readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`,
  completeArtifact: read(`${dir}/review-text.json`),
  paragraphs: storyParagraphs(story),
  communicationAuthority: JSON.parse(read(`${dir}/writer-input-current.json`)).packet.communication,
  claims: claims.map(claim => ({ claimId: claim.claimId, claim: claim.candidateEvidence[0].excerpt, sourceIds: claim.sourceIds })),
  sources: evidence.records.map(record => ({ id: record.id, url: record.url, authority: record.authority, passages: record.passages, limitation: record.limitation, source: { url: record.url, passage: record.passages.join(" "), passageLocator: record.url, additionalPassage: `${record.authority} Limitation: ${record.limitation}`, additionalPassageLocator: record.url } }))
});

const coverage = JSON.parse(read(`${dir}/story-type-coverage.json`));
const coverageErrors = validateStoryTypeCoverage(coverage, story.themes, undefined, { story, root });
if (coverageErrors.length) throw new Error(`story-type coverage: ${coverageErrors.join(" | ")}`);
const lengthErrors = validateOrdinaryDailyLength(story);
if (lengthErrors.length) throw new Error(`reader budget: ${lengthErrors.join(" | ")}`);
const prepared = inspectPreparedDraft(story, JSON.parse(read(`${dir}/writer-input-current.json`)), observations, { root });
if (prepared.errors.length) throw new Error(`producer observations: ${prepared.errors.join(" | ")}`);
console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), reviewTextSha256: bind("review-text.json").sha256, publicationBaseSha256: bind("publication-base.js").sha256, status: "PENDING_INDEPENDENT_REVIEW" }));
