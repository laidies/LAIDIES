const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const episodeDir = path.join(root, "content", "episodes");
const issueBodyDir = path.join(root, "content", "issues");
const issuePageDir = path.join(root, "issues");
const reviewDir = path.join(root, "operations", "weekly-reviews");
const growthDir = path.join(root, "operations", "growth");
const agentCouncilDir = path.join(root, "operations", "agent-council");
const commandCenterPath = path.join(root, "operations", "weekly-command-center.html");
const commandCenterFilesDir = path.join(root, "operations", "weekly-command-center-files");

const requiredEpisodeFields = [
  "number",
  "slug",
  "title",
  "subtitle",
  "status",
  "issueUrl",
  "heroImage",
  "act",
  "lesson",
  "emotionalBeat",
  "oneLineDescription",
  "episodeDescription",
  "previously",
  "tryOn",
  "mainCharacterEnergy",
  "rememberLine",
  "communityPrompt",
  "glossaryTerms",
  "referencesUsed",
  "toolsMentioned",
  "social",
];

const socialFields = ["reelHooks", "carouselIdea", "storyPoll", "captionAngle", "cta"];
const forbiddenVoicePatterns = [
  /let'?s dive in/i,
  /it'?s worth noting/i,
  /here'?s what/i,
  /\bgenuinely\b/i,
  /you are smart, you are capable/i,
  /the most powerful tool of your career/i,
  /fun first, practical always/i,
];

const technicalReviewPattern = /\b(study|studied|research|percent|%|law|legal|tax|policy|privacy|confidential|HR|human resources|medical|financial|price|pricing|model|GPT|ChatGPT|Claude|Gemini|OpenAI|Google|Anthropic|Microsoft|date|quote|citation|source|BCG|Harvard)\b/i;

const executiveAgents = [
  "Chief Brand Agent",
  "Editor-in-Chief Agent",
  "Chief Design Agent",
  "UX / Product Experience Agent",
  "Website QA Lead",
  "Accessibility & Responsive Agent",
  "Front-End Engineering Agent",
  "Release Manager Agent",
  "Chief Technical Accuracy Agent",
  "Responsible AI Governance Officer",
  "Risk Register & Controls Agent",
  "AI Audit & Compliance Agent",
  "Transparency & System Documentation Agent",
  "Human Oversight & Decision Rights Agent",
  "AI Policy & Regulatory Watch Agent",
  "AI Evaluation & Red Team Lead",
  "AI Security & Abuse Prevention Agent",
  "Chief Learning Design Agent",
  "CMO Agent",
  "Social Media & Comms Manager",
  "Creative Strategy & Ideation Agent",
  "SEO & Audience Discovery Agent",
  "Content Operations Agent",
  "Art Direction & Asset Agent",
  "Community & Partnerships Manager",
  "Analytics & Feedback Agent",
  "Privacy & Safety Agent",
  "Data Stewardship & Privacy Agent",
  "Inclusive Content, Legal/HR & DEI Risk Agent",
  "Roadmap Agent",
  "Chief Product Agent",
  "Growth & Monetization Agent",
  "Finance & Monetization Ideas Agent",
  "AI Vendor & Tool Procurement Agent",
  "AI Incident Response & Escalation Agent",
  "External Review & Reader Advisory Liaison",
  "Change Management & Enablement Agent",
  "Continuous Monitoring Agent",
  "Professional Reputation Agent",
];

const seniorWholeSiteReviews = [
  ["Chief Brand Agent", "Voice, taste, specificity, and whether fun supports credibility"],
  ["Editor-in-Chief Agent", "Issue arc, page flow, narrative hierarchy, and whether modules support the lesson"],
  ["Chief Design Agent", "Layout, visual rhythm, mobile fit, polish, and whether the page feels guided"],
  ["UX / Product Experience Agent", "Reader journey, action clarity, state logic, and whether the page feels coherent as a product experience"],
  ["Website QA Lead", "Desktop/mobile browser QA, visible interaction results, hash/state behavior, links, forms, and console status"],
  ["Accessibility & Responsive Agent", "Keyboard access, tap targets, focus states, readable contrast, reduced-motion needs, and viewport fit"],
  ["Front-End Engineering Agent", "Implementation quality, asset loading, cache/versioning, state management, maintainability, and console errors"],
  ["Release Manager Agent", "Publish sequencing, release dates, draft/scheduled/published state, public visibility, and cache readiness"],
  ["Chief Technical Accuracy Agent", "Claims, source needs, tool/model names, dates, and high-stakes boundaries"],
  ["Responsible AI Governance Officer", "AI use policies, risk ownership, human approval boundaries, transparency, documentation, accountability, and continuous improvement"],
  ["Risk Register & Controls Agent", "Risk statements, owners, likelihood/impact, controls, evidence, residual risk, and review dates"],
  ["AI Audit & Compliance Agent", "Process evidence, completed gates, blocker escalation, traceable approvals, and decision-log integrity"],
  ["Transparency & System Documentation Agent", "AI feature documentation, limitations, human review, data behavior, and reader-facing disclosure needs"],
  ["Human Oversight & Decision Rights Agent", "Approval boundaries, expert review needs, escalation triggers, and decisions that cannot be automated"],
  ["AI Policy & Regulatory Watch Agent", "Relevant AI policy, platform rules, privacy expectations, copyright/IP norms, and emerging responsible AI standards"],
  ["AI Evaluation & Red Team Lead", "Hallucination, unsafe advice, bias, prompt injection, jailbreak behavior, misleading confidence, and failure-mode testing"],
  ["AI Security & Abuse Prevention Agent", "Prompt/data leakage, spam, malicious submissions, unsafe links, user-generated abuse, and misuse scenarios"],
  ["Chief Learning Design Agent", "Concept sequencing, workplace transfer, quizzes, Try-Ons, and learning depth"],
  ["CMO Agent", "Audience entry points, shareability, weekly ritual, and reason to return"],
  ["Social Media & Comms Manager", "Platform-native posts, launch messaging, newsletter/community promotion, timing, CTA, and realistic cadence"],
  ["Creative Strategy & Ideation Agent", "New ideas, recurring rituals, issue extensions, experiments, cultural relevance, and smallest useful tests"],
  ["SEO & Audience Discovery Agent", "Search/share discovery, metadata, internal links, evergreen questions, and durable issue packaging"],
  ["Content Operations Agent", "Production calendar, file hygiene, checklists, handoffs, version notes, and repeatable weekly process"],
  ["Art Direction & Asset Agent", "Imagery, generated assets, screenshots, icons, visual consistency, crops, alt text needs, and reuse"],
  ["Community & Partnerships Manager", "Community participation, collaborators, guests, ERGs, creators, sponsors, cross-promotions, and trust fit"],
  ["Analytics & Feedback Agent", "User signals, feedback needs, and what should be measured before expansion"],
  ["Privacy & Safety Agent", "Consent, community safety, sensitive workplace risk, and advice boundaries"],
  ["Data Stewardship & Privacy Agent", "Data inventory, collection minimization, retention expectations, third-party tools, analytics, embeds, and reader trust around data"],
  ["Inclusive Content, Legal/HR & DEI Risk Agent", "Inclusive language, workplace sensitivity, DEI risk, harmful stereotypes, and legal/HR boundaries"],
  ["Roadmap Agent", "Feature sprawl, maintenance burden, release timing, and simplification needs"],
  ["Chief Product Agent", "Product thesis, reader jobs, prototypes, recurring tools, and what should become a durable product"],
  ["Growth & Monetization Agent", "Product/sponsor/merch fit without cheapening the site"],
  ["Finance & Monetization Ideas Agent", "Monetization idea bank, revenue hypotheses, pricing questions, sponsor fit, and demand signals"],
  ["AI Vendor & Tool Procurement Agent", "AI tools, models, embeds, platforms, plugins, media generators, analytics tools, terms, cost, data use, and reliability"],
  ["AI Incident Response & Escalation Agent", "Severity, ownership, containment, correction, root cause, prevention, and decision-log updates when something goes wrong"],
  ["External Review & Reader Advisory Liaison", "Trusted reader input, expert review, collaborator feedback, outside perspective, and decision impact"],
  ["Change Management & Enablement Agent", "Workflow adoption, templates, handoffs, training prompts, friction reduction, and repeatable use"],
  ["Continuous Monitoring Agent", "Post-launch broken links, stale content, regressions, feedback, analytics anomalies, and unresolved blockers"],
  ["Professional Reputation Agent", "Whether the full site would feel credible if shared by a senior professional"],
];

const sectionAgents = [
  ["Episode Archive / Current Issue Agent", "Published issue navigation and release gating", "Readers find the current issue, scheduled issues stay hidden until release"],
  ["Newsletter Signup Agent", "Buttondown signup path and subscription friction", "Signup clicks, completed subscriptions, low confusion"],
  ["Mme CLAI-O Agent", "Funny, practical decision support", "Repeat use, screenshots, comments"],
  ["fAIry Godmother / LAIDY Agent", "Advice console and energy modes", "Useful answers, repeat use, safe advice boundaries"],
  ["Quiz Agent", "Fast confidence check", "Starts, completions, retakes, feedback"],
  ["Card Pack Agent", "Practical workplace tools", "Clicks, saves, reuse"],
  ["Dream Phone Agent", "Role-based advice", "Clicks, useful outputs"],
  ["Businesswomen's Special Agent", "Paper fortune-teller drink ritual: Proof Positive or Zero Proof, then mood flap reveal", "Flap reveals, shares, inclusive low-maintenance delight"],
  ["Girl Talk Prompt Deck Agent", "Prompt cards for work drama and group-chat honesty", "Draws, shares, community follow-through"],
  ["Five-Minute Try-On Agent", "Small work dares between issues", "Shuffle use, completed Try-Ons, issue concept reinforcement"],
  ["Sign-Off Generator Agent", "Reusable lAIdies closer lines", "Copies, submissions, social reuse"],
  ["DJ JAIDY Agent", "Weekly AI song drops and House DJ identity", "Requests, plays, episode-track completion"],
  ["Playlist / Mix CD Agent", "Starter playlists, copyable track lists, and member mixes", "Spotify opens, copied tracklists, mix submissions"],
  ["Hot Goss Agent", "Contextual AI news", "Clicks, saves, discussion"],
  ["Glossary / Reference Closet Agent", "Reusable references", "Searches, clicks, return visits"],
  ["Community Room Agent", "Participation ritual", "Comments, replies, useful prompts"],
  ["Member Card Agent", "Identity and opt-in", "Submissions, completion, consent clarity"],
  ["Comment Card / Feedback Agent", "Reader feedback intake", "Feedback submissions, useful suggestions, issue-specific signals"],
  ["Chat Room Digest Agent", "Community navigation", "Answered/tips/unanswered queues"],
];

const scoreCategories = [
  "usability",
  "fun",
  "brand fit",
  "engagement",
  "user feedback",
  "learning/job-to-be-done execution",
  "social/share potential",
  "technical/reputation risk",
  "maintenance burden",
  "leadership narrative support",
];

function padIssue(number) {
  return String(number).padStart(2, "0");
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readTextIfExists(filePath) {
  return exists(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function countFiles(dirPath, pattern) {
  if (!exists(dirPath)) return 0;
  return fs.readdirSync(dirPath).filter((file) => pattern.test(file)).length;
}

function latestFile(dirPath, pattern) {
  if (!exists(dirPath)) return null;
  return fs
    .readdirSync(dirPath)
    .filter((file) => pattern.test(file))
    .map((file) => {
      const fullPath = path.join(dirPath, file);
      return { file, fullPath, mtime: fs.statSync(fullPath).mtimeMs };
    })
    .sort((a, b) => b.mtime - a.mtime)[0] || null;
}

function fileHasText(filePath, pattern) {
  return pattern.test(readTextIfExists(filePath));
}

function rel(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function statusIcon(ok) {
  return ok ? "OK" : "MISSING";
}

function warnIcon(ok) {
  return ok ? "OK" : "WARN";
}

function listEpisodeFiles() {
  return fs
    .readdirSync(episodeDir)
    .filter((file) => /^issue-\d+\.json$/.test(file))
    .sort()
    .map((file) => path.join(episodeDir, file));
}

function loadEpisodes() {
  return listEpisodeFiles().map((filePath) => readJson(filePath));
}

function resolveIssueNumber(args, episodes) {
  const raw = args.find((arg) => /^\d+$/.test(arg) || /^issue-\d+$/i.test(arg));
  if (raw) return Number(raw.replace(/\D/g, ""));

  const firstDraft = episodes.find((episode) => episode.status === "draft");
  if (firstDraft) return firstDraft.number;

  const firstPlanned = episodes.find((episode) => episode.status === "planned");
  if (firstPlanned) return firstPlanned.number;

  return Math.max(...episodes.map((episode) => episode.number));
}

function findSeasonLine(title) {
  const seasonPath = path.join(root, "docs", "season", "24-episode-arc.md");
  const text = readTextIfExists(seasonPath);
  return text
    .split(/\r?\n/)
    .find((line) => line.includes(`| ${title} |`) || line.includes(title));
}

function scanVoice(text) {
  const findings = [];
  forbiddenVoicePatterns.forEach((pattern) => {
    const match = text.match(pattern);
    if (match) findings.push(`Review phrase: "${match[0]}"`);
  });

  const emDashCount = (text.match(/—/g) || []).length;
  if (emDashCount > 12) findings.push(`High em-dash count across draft: ${emDashCount}`);

  const shortSentenceRuns = text.match(/\b[A-Z][^.!?]{1,28}[.!?]\s+[A-Z][^.!?]{1,28}[.!?]\s+[A-Z][^.!?]{1,28}[.!?]/g) || [];
  if (shortSentenceRuns.length > 2) findings.push("Several runs of very short sentences. Check for AI cadence.");

  return findings;
}

function scanTechnicalReview(text) {
  const lines = text.split(/\r?\n/);
  return lines
    .map((line, index) => ({ line: line.trim(), number: index + 1 }))
    .filter((entry) => entry.line && technicalReviewPattern.test(entry.line))
    .slice(0, 16);
}

function checkEpisodeFields(episode) {
  const missing = [];
  requiredEpisodeFields.forEach((field) => {
    const value = episode[field];
    if (Array.isArray(value) && value.length === 0) missing.push(field);
    else if (value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) missing.push(field);
    else if (value === undefined || value === null || value === "") missing.push(field);
  });

  socialFields.forEach((field) => {
    if (!episode.social || !episode.social[field] || (Array.isArray(episode.social[field]) && !episode.social[field].length)) {
      missing.push(`social.${field}`);
    }
  });

  return missing;
}

function parseQuizzes() {
  const filePath = path.join(root, "content", "site", "quizzes.json");
  return exists(filePath) ? readJson(filePath) : {};
}

function parseCardPacks() {
  const filePath = path.join(root, "content", "site", "card-packs.json");
  return exists(filePath) ? readJson(filePath) : { cards: [] };
}

function linkLines(items) {
  if (!items.length) return "- None found";
  return items.map((item) => `- ${item}`).join("\n");
}

function reviewLine(label, ok, detail) {
  return `- ${statusIcon(ok)} ${label}${detail ? `: ${detail}` : ""}`;
}

function warningLine(label, ok, detail) {
  return `- ${warnIcon(ok)} ${label}${detail ? `: ${detail}` : ""}`;
}

function buildReviewPacket(episode, episodes) {
  const issue = padIssue(episode.number);
  const previous = episodes.find((item) => item.number === episode.number - 1);
  const next = episodes.find((item) => item.number === episode.number + 1);
  const episodePath = path.join(episodeDir, `issue-${issue}.json`);
  const bodyPath = path.join(issueBodyDir, `issue-${issue}.md`);
  const pagePath = path.join(issuePageDir, `issue-${issue}.html`);
  const emailPath = path.join(root, "email", "buttondown", `issue-${issue}.md`);
  const instagramPath = path.join(root, "social", "episodes", `issue-${issue}-instagram-kit.md`);
  const linkedinPath = path.join(root, "social", "episodes", `issue-${issue}-linkedin.md`);
  const communityPath = path.join(root, "community", "weekly-prompts", `issue-${issue}.md`);
  const bodyText = readTextIfExists(bodyPath);
  const articleText = bodyText || readTextIfExists(pagePath);
  const missingFields = checkEpisodeFields(episode);
  const quizzes = parseQuizzes();
  const cardPacks = parseCardPacks();
  const quizKey = episode.websiteModules?.quiz;
  const cardPackKey = episode.websiteModules?.cardPack;
  const hasQuiz = Boolean(quizKey && quizzes[quizKey]);
  const hasCardPack = Boolean(cardPackKey && (cardPacks.cards || []).some((card) => card.issue === cardPackKey));
  const voiceFindings = scanVoice(articleText);
  const technicalFindings = scanTechnicalReview(articleText);
  const seasonLine = findSeasonLine(episode.title);
  const outputs = [
    reviewLine("Episode JSON", exists(episodePath), rel(episodePath)),
    reviewLine("Article source Markdown", exists(bodyPath), rel(bodyPath)),
    reviewLine("Website issue page", exists(pagePath), rel(pagePath)),
    reviewLine("Buttondown draft", exists(emailPath), rel(emailPath)),
    reviewLine("Instagram kit", exists(instagramPath), rel(instagramPath)),
    reviewLine("LinkedIn draft", exists(linkedinPath), rel(linkedinPath)),
    reviewLine("Community prompt", exists(communityPath), rel(communityPath)),
    warningLine("Quiz module", hasQuiz, quizKey ? quizKey : "No websiteModules.quiz set"),
    warningLine("Card pack module", hasCardPack, cardPackKey ? cardPackKey : "No websiteModules.cardPack set"),
    warningLine("Site links", (episode.siteLinks || []).length > 0, `${(episode.siteLinks || []).length} links`),
  ];

  const readyChecks = [
    missingFields.length === 0,
    exists(bodyPath),
    exists(pagePath),
    exists(emailPath),
    exists(instagramPath),
    exists(linkedinPath),
    exists(communityPath),
    hasQuiz,
    hasCardPack,
    (episode.siteLinks || []).length > 0,
    voiceFindings.length === 0,
  ];

  const readyScore = readyChecks.filter(Boolean).length;
  const nextActions = [
    !exists(bodyPath) ? `- Draft or add article source at ${rel(bodyPath)}.` : "",
    exists(bodyPath) && !exists(pagePath) ? `- Check generated website issue page output at ${rel(pagePath)}.` : "",
    !exists(bodyPath) && !exists(pagePath) ? "- The website issue page will generate after the article source exists." : "",
    !hasQuiz ? "- Add the issue quiz to content/site/quizzes.json and set websiteModules.quiz." : "",
    !hasCardPack ? "- Add card-pack cards to content/site/card-packs.json and set websiteModules.cardPack." : "",
    !(episode.siteLinks || []).length ? "- Add siteLinks so the newsletter and issue page point to quiz, card pack, Try-On, glossary, and Hot Goss." : "",
    voiceFindings.length ? "- Revise the flagged voice/cadence items before scheduling." : "",
    technicalFindings.length ? "- Verify receipt-sensitive claims before publishing." : "",
    `- After edits, rerun: .\\scripts\\run-weekly-production.ps1 ${episode.number}`,
  ].filter(Boolean);

  return `# Weekly Production Review: Issue ${issue} - ${episode.title}

Generated: ${new Date().toISOString()}

## Publish Readiness

${readyScore}/${readyChecks.length} automated checks passed.

This packet is not final approval. It narrows Ali's review to taste, lived examples, teaching depth, source confidence, and whether the issue sounds like lAIdies.

## Teaching Continuity

- Current act: ${episode.act}
- Current lesson: ${episode.lesson}
- Emotional beat: ${episode.emotionalBeat}
- Previous issue: ${previous ? `Issue ${padIssue(previous.number)} - ${previous.title}: ${previous.lesson}` : "None"}
- Next issue: ${next ? `Issue ${padIssue(next.number)} - ${next.title}: ${next.lesson}` : "Not yet defined in JSON"}
- Season bible row: ${seasonLine || "Not found. Check docs/season/24-episode-arc.md."}

## Generated Outputs

${outputs.join("\n")}

## Episode JSON Gaps

${missingFields.length ? linkLines(missingFields) : "- OK: Required metadata is present."}

## Ali Review Focus

- Does the issue teach the right concept for this point in the season?
- Is the depth enough for a smart corporate reader to use it in a meeting without being corrected?
- Are the analogies doing teaching work, not just decoration?
- Does the Try-On take about 10 minutes and create one real workplace try?
- Does the voice sound like Ali, not a generic AI explainer?
- Is the newsletter lighter than the website, with interactive/news items linked out?

## Growth Review

- What is the one sentence, card, or checklist someone would send to a friend?
- What is the easiest community action this issue asks for?
- What signal are we testing: newsletter value, community usefulness, social saveability, or product demand?
- What would make this issue useful inside a team, ERG, lunch-and-learn, or corporate training context?
- What should Ali personally post on LinkedIn or Instagram because it sounds like her, not a brand account?

## Voice Scan

${voiceFindings.length ? linkLines(voiceFindings) : "- OK: No obvious banned-phrase or cadence flags found."}

## Technical Receipt Review

Review these lines for source links, dates, names, model/product/company clarity, and high-stakes accuracy:

${technicalFindings.length ? technicalFindings.map((entry) => `- Line ${entry.number}: ${entry.line}`).join("\n") : "- No obvious receipt-sensitive lines found in article/page text."}

## Website Module Links

${(episode.siteLinks || []).length ? episode.siteLinks.map((link) => `- ${link.type}: ${link.label} -> ${link.url}`).join("\n") : "- No siteLinks set."}

## Module Pack

- Quiz: ${quizKey || "not set"}
- Card pack: ${cardPackKey || "not set"}
- Community thread: ${episode.websiteModules?.communityThread || "not set"}
- Glossary terms: ${(episode.websiteModules?.glossaryTerms || episode.glossaryTerms || []).join(", ") || "not set"}
- Hot Goss placement: ${episode.websiteModules?.hotGossPlacement || "not set"}

## Recommended Next Actions

${nextActions.join("\n")}
`;
}

function buildGrowthScorecard(episode) {
  const issue = padIssue(episode.number);
  const primarySocialHook = episode.social?.reelHooks?.[0] || episode.title;
  return `# Growth Scorecard: Issue ${issue} - ${episode.title}

Status: ${episode.status}
Week of:

## Issue Snapshot

- Lesson: ${episode.lesson}
- Try-On: ${episode.tryOn}
- Community action: ${episode.communityPrompt}
- Shareable hook: ${primarySocialHook}
- Website page: ${episode.issueUrl}

## 1. Best Audience Signal

What happened this week that suggests people want more of this?

- 

## 2. Newsletter

- Subscribers:
- Opens:
- Clicks:
- Replies:
- Forwards or personal notes:
- Best line or section:

## 3. Website

- Current issue clicks:
- Quiz activity:
- Card-pack activity:
- Community clicks:
- Most useful page:

## 4. Community

- New comments:
- Answered questions:
- Unanswered questions:
- Useful tips:
- Member-card submissions:
- Best community signal:

## 5. Social

- Best post:
- Saves:
- Shares:
- Comments:
- Profile or link clicks:
- What sounded most like Ali:

## 6. Product Signals

Did anyone ask for:

- templates
- prompts
- workshops
- team resources
- a cohort
- office hours
- help teaching this internally

Notes:

- 

## 7. Decision For Next Week

What should change because of this week's signals?

- 
`;
}

function buildScoreRows() {
  return scoreCategories.map((category) => `| ${category} |  |  |`).join("\n");
}

function buildExecutiveAgentRows() {
  return executiveAgents.map((agent) => `| ${agent} | 5 |  |  |  |  |  |  |`).join("\n");
}

function buildSeniorWholeSiteRows() {
  return seniorWholeSiteReviews.map(([agent, accountability]) => `| ${agent} | ${accountability} | 5 |  |  |  |  |  |`).join("\n");
}

function buildLaunchGateRows() {
  const checks = [
    "Release state: only published/current content appears public",
    "Desktop QA: layout, hierarchy, blank space, overlap",
    "Mobile QA: fit, readability, tap targets, scroll behavior",
    "Interaction QA: every button/control visibly does what it promises",
    "Visual polish: section feels intentional, not chaotic or leftover",
    "Brand respect: fun supports smart professional learning",
    "Maintenance burden: section can be kept fresh without heroics",
    "Detail integrity: issue titles, labels, brand styling, asset choice, and copy are correct",
    "Persistence honesty: saved/collected/synced claims match current implementation",
    "Archive readiness: late readers can find prior released issues/packs",
  ];

  return checks.map((check) => `| ${check} |  |  |  |`).join("\n");
}

function buildWholeSiteCohesionRows() {
  const checks = [
    "First impression: site feels polished, intentional, and credible",
    "Current issue path: reader understands what is live and where to start",
    "Section hierarchy: modules feel ordered, not competing",
    "Learning path: issue, quiz, cards, Try-On, glossary, and games reinforce each other",
    "Fun & Games stress test: playful features feel curated, functional, and not chaotic",
    "UX journey audit: first-time, current, late, returning, guest, signed-in, completion, empty/error, desktop, and mobile flows are accounted for",
    "Return/persistence audit: progress, rewards, member-card state, storage limitations, and cross-device expectations are clear",
    "AI credibility proof: agent-supported review made the product sharper and more trustworthy before CEO review",
    "Reputation: a senior professional could share the site without caveats",
    "Governance: AI/content/data risks have owners, evidence, and escalation paths",
  ];

  return checks.map((check) => `| ${check} |  |  |  |`).join("\n");
}

function buildUXJourneyRows() {
  const flows = [
    "First-time reader knows where to start",
    "Current-issue reader knows what is live this week",
    "Late reader can start at Issue 01 and access released back issues",
    "Returning same-device reader sees expected saved state",
    "Returning cross-device reader sees honest login/sync limitation",
    "Guest user understands local-only storage",
    "Signed-in user path exists or is clearly marked future/not available",
    "Completion/reward path says what was earned and where it goes",
    "Empty/error/loading states are not confusing",
    "Mobile journey works without overlap, horizontal scroll, or tiny controls",
    "Desktop journey feels polished, guided, and not chaotic",
  ];

  return flows.map((flow) => `| ${flow} |  |  |  |  |`).join("\n");
}

function buildAICredibilityRows() {
  const checks = [
    "Agents caught quality issues before CEO review",
    "Agent collaboration improved UX, design, learning, privacy, product, and implementation quality",
    "The output would make a skeptical smart professional more likely to believe AI fluency is worth learning",
    "The agents reduced Ali's manual review burden instead of pushing obvious misses to her",
  ];

  return checks.map((check) => `| ${check} |  |  |  |`).join("\n");
}

function buildSectionAgentRows() {
  return sectionAgents.map(([agent, job, signal]) => `| ${agent} | ${job} |  |  |  |  |  |  |  |  | Success signal: ${signal} |`).join("\n");
}

function buildAgentCouncilReview(episode) {
  const issue = padIssue(episode.number);
  const primarySocialHook = episode.social?.reelHooks?.[0] || episode.title;
  const siteLinks = episode.siteLinks || [];
  const glossaryTerms = episode.websiteModules?.glossaryTerms || episode.glossaryTerms || [];

  return `# Agent Council Review: Issue ${issue} - ${episode.title}

Generated: ${new Date().toISOString()}

This is a recommend-only review packet. It cannot publish, rewrite live pages, remove features, or change public positioning automatically. Ali approves implementation.

## Issue Snapshot

- Status: ${episode.status}
- Act: ${episode.act}
- Lesson: ${episode.lesson}
- Emotional beat: ${episode.emotionalBeat}
- Try-On: ${episode.tryOn}
- Community action: ${episode.communityPrompt}
- Shareable hook: ${primarySocialHook}
- Website page: ${episode.issueUrl}
- Quiz module: ${episode.websiteModules?.quiz || "not set"}
- Card pack module: ${episode.websiteModules?.cardPack || "not set"}
- Community thread: ${episode.websiteModules?.communityThread || "not set"}
- Glossary terms: ${glossaryTerms.join(", ") || "not set"}

## Mandatory Surface Owner Launch Gate

Every website-facing owner must complete this before CEO prioritization. Any \`BLOCK LAUNCH\` item must appear in the CEO Top 5 until resolved.

Apply \`operations/agents/ceo-feedback-quality-standard.md\`: Ali should not be the first person to catch missing flows, unclear persistence, wrong labels, weak visuals, fake interactions, or 24-issue scalability gaps.

Gate choices: PASS, IMPROVE, BLOCK LAUNCH, or INCOMPLETE - NEEDS QA.

| Check | Gate | Evidence | Exact fix if not PASS |
| --- | --- | --- | --- |
${buildLaunchGateRows()}

## Whole-Site Cohesion Gate

Review the full website before reviewing isolated sections. A section can pass alone and still fail the whole-site experience.

| Check | Gate | Evidence | Exact fix if not PASS |
| --- | --- | --- | --- |
${buildWholeSiteCohesionRows()}

## UX Journey Audit

The UX / Product Experience Agent owns this section but must coordinate with Design, Product, QA, Front-End, Learning, Member Card, Privacy/Data, Content Ops, Brand, and Editor-in-Chief as relevant.

| Reader flow | Gate | Evidence | Coordinating agents | Exact fix if not PASS |
| --- | --- | --- | --- | --- |
${buildUXJourneyRows()}

## AI Credibility Proof

The website should demonstrate the Laidies thesis: women who learn AI and use AI agents can build stronger, sharper, more successful work.

| Check | Gate | Evidence | Exact fix if not PASS |
| --- | --- | --- | --- |
${buildAICredibilityRows()}

## Best Website Section Contenders

Each section owner should want its surface to win best website section. Name the strongest contenders and what would make them stronger.

| Rank | Section | Why it could win | One fix to make it stronger | Protect this |
| --- | --- | --- | --- | --- |
| 1 |  |  |  |  |
| 2 |  |  |  |  |
| 3 |  |  |  |  |

## Senior Agent Whole-Site Review

Senior agents review how everything looks and works together. They may block launch even when individual section owners pass.

Every senior agent aims for a CEO score of 5. Use \`operations/agents/agent-role-performance-standards.md\` to judge whether the role performed like a best-in-class industry owner.

| Senior agent | Whole-site accountability | CEO target | CEO score | Why not 5 / why 5 | Gate | Evidence | Top-score action |
| --- | --- | --- | --- | --- | --- | --- | --- |
${buildSeniorWholeSiteRows()}

## CEO Agent Top 5 Recommended Actions

| Rank | Recommendation | Evidence | Risk | Maintenance | CEO decision | Ali decision |
| --- | --- | --- | --- | --- | --- | --- |
| 1 |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |
| 4 |  |  |  |  |  |  |
| 5 |  |  |  |  |  |  |

## Mandatory Reputation/Safety Gate

Before any recommendation becomes implementation-ready, confirm:

- [ ] no confidential workplace information
- [ ] no named live career opportunities
- [ ] no employer-specific implication without approval
- [ ] no unsupported AI/tool/product claims
- [ ] no legal, tax, HR, medical, financial, privacy, or policy guidance presented as official advice
- [ ] no public spotlighting without consent
- [ ] no community answer labeled correct without human review
- [ ] no joke that undermines professional credibility
- [ ] no monetization that makes the brand feel cheap or exploitative
- [ ] no feature that creates unsustainable maintenance burden

## Professional Reputation Gate

- [ ] Supports Ali as an AI translator for smart professionals.
- [ ] Keeps formal credentials light-touch inside lAIdies.
- [ ] Avoids employer, consulting, tax, or live-career-positioning copy.
- [ ] Would feel credible if shared by a senior professional on LinkedIn.
- [ ] Demonstrates leadership through quality, clarity, and execution.
- [ ] Treats women as smart and capable; fun references improve memory and momentum, not because the material needed to be softened.

## Executive Agent Reviews

Every executive agent aims for a CEO score of 5. A 5 requires evidence, sharp judgment, and an implementation-ready top-score action.

| Agent | CEO target | CEO score | Why not 5 / why 5 | Feature status | Top-score action | Evidence | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- |
${buildExecutiveAgentRows()}

## Section Agent Reviews

Agents must review like accountable product owners. Every owner should want its surface to win best website section. For every owned surface, diagnose what is not yet good enough and propose the strongest concrete improvement. Vague polish notes fail the review.

Mandatory \`BLOCK LAUNCH\` triggers: chaotic/unfinished visual design, awkward blank space, overlapping content, accidental open panel/console/modal, fake or invisible interaction, unreleased content appearing public, unverified desktop/mobile behavior, or fun that makes smart professional women feel talked down to.

| Agent | Reader job | Best-section verdict | Launch gate | Current verdict | Copy diagnosis | Visual diagnosis | UX/functionality diagnosis | Learning/brand diagnosis | Browser evidence | Exact recommendation / dependency |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${buildSectionAgentRows()}

## Shared Scoring Rubric

Score each category 1-5. For technical/reputation risk and maintenance burden, a higher score means better controlled and more sustainable.

| Category | Score | Notes |
| --- | --- | --- |
${buildScoreRows()}

## Website Module Link Review

The newsletter and issue page should link out to the website parts that carry the issue experience.

${siteLinks.length ? siteLinks.map((link) => `- ${link.type}: ${link.label} -> ${link.url}`).join("\n") : "- No siteLinks set yet. Add links for quiz, card pack, Try-On, glossary/reference, community, and Hot Goss where relevant."}

## Mme CLAI-O Taste Benchmark Check

Mme CLAI-O is protected as gold-standard lAIdies copy. Do not flatten its voice into generic tarot, generic empowerment, or generic AI advice.

New Mme CLAI-O content must keep:

- card / read / message / move structure
- specific 90s/Y2K object language
- practical next action
- sharp humor with warmth
- no generic tarot language
- no generic empowerment copy

## Monetization Check

Recommended sequence:

1. Track demand signals.
2. Test low-effort merch and 3D-printed items.
3. Test digital templates or printable prompt/checklist packs.
4. Consider tasteful sponsor/resource spots only if they fit the brand.
5. Later: membership, resource library, cohort, team package, workshops, or ERG training once community demand exists.

Avoid early generic display ads. Money should feel like an extension of the lAIdies world, not an interruption.

## Agent Decisions To Log

Record final decisions in operations/agents/agent-decision-log.md.

| Agent | Recommendation | CEO decision | Ali decision | Why accepted/rejected | Signal needed to revisit |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |
`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let inList = false;
  let inOrderedList = false;
  let inTable = false;

  function closeBlocks() {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
    if (inOrderedList) {
      html.push("</ol>");
      inOrderedList = false;
    }
    if (inTable) {
      html.push("</tbody></table>");
      inTable = false;
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      closeBlocks();
      return;
    }

    if (/^\|.+\|$/.test(trimmed)) {
      if (/^\|\s*-+/.test(trimmed)) return;
      if (!inTable) {
        closeBlocks();
        html.push("<table><tbody>");
        inTable = true;
      }
      const cells = trimmed
        .slice(1, -1)
        .split("|")
        .map((cell) => `<td>${escapeHtml(cell.trim())}</td>`)
        .join("");
      html.push(`<tr>${cells}</tr>`);
      return;
    }

    if (/^-\s+/.test(trimmed)) {
      if (!inList) {
        closeBlocks();
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${escapeHtml(trimmed.replace(/^-\s+/, ""))}</li>`);
      return;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      if (!inOrderedList) {
        closeBlocks();
        html.push("<ol>");
        inOrderedList = true;
      }
      html.push(`<li>${escapeHtml(trimmed.replace(/^\d+\.\s+/, ""))}</li>`);
      return;
    }

    closeBlocks();
    if (/^###\s+/.test(trimmed)) html.push(`<h3>${escapeHtml(trimmed.replace(/^###\s+/, ""))}</h3>`);
    else if (/^##\s+/.test(trimmed)) html.push(`<h2>${escapeHtml(trimmed.replace(/^##\s+/, ""))}</h2>`);
    else if (/^#\s+/.test(trimmed)) html.push(`<h1>${escapeHtml(trimmed.replace(/^#\s+/, ""))}</h1>`);
    else html.push(`<p>${escapeHtml(trimmed)}</p>`);
  });

  closeBlocks();
  return html.join("\n");
}

function buildMarkdownViewer(title, sourcePath) {
  const markdown = readTextIfExists(sourcePath);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #18121b; background: #fff; line-height: 1.55; }
      header { padding: 24px clamp(18px, 4vw, 54px); background: #2b0822; color: white; }
      main { max-width: 980px; padding: 24px clamp(18px, 4vw, 54px) 64px; }
      h1, h2, h3 { line-height: 1.15; }
      h1 { font-size: clamp(28px, 4vw, 48px); }
      h2 { margin-top: 32px; border-bottom: 1px solid #eaddea; padding-bottom: 8px; }
      a { color: #a90068; font-weight: 700; }
      table { width: 100%; border-collapse: collapse; margin: 18px 0; overflow-wrap: anywhere; }
      td { border: 1px solid #eaddea; padding: 8px; vertical-align: top; }
      ul, ol { padding-left: 24px; }
      .back { display: inline-block; margin-bottom: 14px; color: #ffd8ef; }
      .source { color: #ffd8ef; font-size: 13px; }
    </style>
  </head>
  <body>
    <header>
      <a class="back" href="../weekly-command-center.html">Back to Weekly Command Center</a>
      <h1>${escapeHtml(title)}</h1>
      <div class="source">${escapeHtml(rel(sourcePath))}</div>
    </header>
    <main>
      ${markdown ? markdownToHtml(markdown) : `<p>This file has not been generated yet.</p>`}
    </main>
  </body>
</html>`;
}

function writeMarkdownViewer(sourcePath, title, outputName) {
  const outputPath = path.join(commandCenterFilesDir, outputName);
  fs.writeFileSync(outputPath, buildMarkdownViewer(title, sourcePath), "utf8");
  return outputPath;
}

function viewerLink(filePath, label, viewerPath) {
  return exists(filePath) ? `<a href="${escapeHtml(path.posix.join("weekly-command-center-files", path.basename(viewerPath)))}">${escapeHtml(label)}</a>` : `<span class="missing">${escapeHtml(label)} missing</span>`;
}

function fileLink(filePath, label) {
  return exists(filePath) ? `<a href="../${escapeHtml(rel(filePath))}">${escapeHtml(label)}</a>` : `<span class="missing">${escapeHtml(label)} missing</span>`;
}

function rootRelativeLink(target, label) {
  return `<a href="../${escapeHtml(target)}">${escapeHtml(label)}</a>`;
}

function buildTask(label, state, detail) {
  const stateLabels = {
    done: "Done",
    ready: "Ready to review",
    action: "Ali action",
    todo: "Needs setup",
  };
  return `<li class="${escapeHtml(state)}"><span>${escapeHtml(stateLabels[state] || state)}</span><strong>${escapeHtml(label)}</strong><p>${detail}</p></li>`;
}

function buildProjectRadarHtml(episode) {
  const qaScreenDir = path.join(root, "tmp", "qa-screens");
  const handoffDir = path.join(root, "docs", "handoffs");
  const latestHandoff = latestFile(handoffDir, /^current-window-handoff-.*\.md$/);
  const qaScreens = countFiles(qaScreenDir, /\.png$/i);
  const setupPath = path.join(root, "COMMUNITY-SUBSCRIBE-SETUP.md");
  const referenceClosetPath = path.join(root, "REFERENCE-CLOSET.md");
  const indexPath = path.join(root, "index.html");
  const scriptPath = path.join(root, "script.js");
  const communityCardPath = path.join(root, "community", "laidy-spotlight.html");
  const fortuneAssetPath = path.join(root, "assets", "businesswomen-special-fortune-teller-v1.png");
  const butterflyAssetPath = path.join(root, "assets", "butterfly-clip-rating-token.png");
  const hasFortuneTeller = fileHasText(indexPath, /paper fortune teller/i) && exists(fortuneAssetPath);
  const hasButterflyRating = fileHasText(indexPath, /butterfly-rating/) && fileHasText(scriptPath, /updateButterflyRating/);
  const hasMemberPassFlow = fileHasText(scriptPath, /Create your lAIdies Card/) && fileHasText(scriptPath, /syncMemberRewards/);
  const hasFounderRewardShelf = fileHasText(communityCardPath, /reward shelf|founder reward|867 Club|secret badge/i);
  const hasReferenceCloset = exists(referenceClosetPath) && fileHasText(indexPath, /Reference Closet/i);
  const hasPerIssueLoaderWarning = fileHasText(latestHandoff?.fullPath || "", /per-issue Fun Pack loader/i);
  const hasSmtpSetup = fileHasText(setupPath, /custom SMTP|Resend API key|Clubhouse Pass Auth Email Delivery/i);
  const currentIssue = padIssue(episode.number);
  const nextIssue = padIssue(episode.number + 1);

  const radarItems = [
    buildTask(
      "Clubhouse / Fun & Games QA",
      qaScreens >= 8 ? "ready" : "action",
      `${qaScreens ? `${qaScreens} QA screenshots found in <code>tmp/qa-screens</code>.` : "No recent QA screenshots found."} Review <a href="../index.html#fun-games">Fun & Games</a> on desktop and mobile before launch-week changes.`
    ),
    buildTask(
      "Businesswomen's Special is now a fortune teller",
      hasFortuneTeller ? "ready" : "todo",
      hasFortuneTeller
        ? `Current source uses the paper fortune-teller interaction and asset <code>${escapeHtml(rel(fortuneAssetPath))}</code>. Weekly reviews should test lane selection, flap reveal, result clarity, and no drinking-pressure framing.`
        : "Wire the paper fortune-teller interaction and asset before treating this module as current."
    ),
    buildTask(
      "Member Pass / lAIdies Card readiness",
      hasMemberPassFlow ? "action" : "todo",
      hasMemberPassFlow
        ? `Post-confirm flow is wired to card creation and reward sync. Ali still needs launch-grade email/auth setup from <a href="../COMMUNITY-SUBSCRIBE-SETUP.md">COMMUNITY-SUBSCRIBE-SETUP.md</a> before public testing.`
        : "Member Pass/card flow is not fully detected. Check auth, reward sync, consent, and card-builder path."
    ),
    buildTask(
      "Founder card reward shelf",
      hasFounderRewardShelf ? "action" : "todo",
      hasFounderRewardShelf
        ? "Ali/founder card has a maximum-rewards shelf. Each weekly issue that adds stickers, cards, badges, or ratings must update this shelf so users can see the ceiling."
        : "Add or verify the founder reward shelf on the public Ali card."
    ),
    buildTask(
      "Butterfly clip rating standard",
      hasButterflyRating && exists(butterflyAssetPath) ? "ready" : "todo",
      hasButterflyRating
        ? "Site has the reusable butterfly rating control. New pack activities, debriefs, games, and printables should use the 0-10 butterfly clip scale with slider plus number buttons."
        : "Implement or reconnect the reusable butterfly clip rating control before adding new rating prompts."
    ),
    buildTask(
      "True per-issue Fun Pack loader",
      hasPerIssueLoaderWarning ? "action" : "todo",
      `Before Issue ${nextIssue}+ packs feel live, build a real loader for issue-specific quiz/card/try-on/printable content. Do not fake unlocked packs from the homepage switcher.`
    ),
    buildTask(
      "Reference Closet canon intake",
      hasReferenceCloset ? "action" : "todo",
      `Keep <a href="../REFERENCE-CLOSET.md">REFERENCE-CLOSET.md</a> and <a href="../index.html#reference-closet">the public closet</a> aligned. Weekly review should decide which new canon items become social posts, issue references, or community prompts.`
    ),
    buildTask(
      "Handover / context health",
      latestHandoff ? "action" : "todo",
      latestHandoff
        ? `Latest current-window handoff: <a href="../${escapeHtml(rel(latestHandoff.fullPath))}">${escapeHtml(latestHandoff.file)}</a>. If a chat moves beyond this state, create a fresh handover before continuing.`
        : "No current-window handoff found. Create one before a context-heavy chat continues."
    ),
    buildTask(
      `Next week setup: Issue ${nextIssue}`,
      "action",
      `After Issue ${currentIssue} is approved or published, run <code>.\\scripts\\start-weekly-workflow.ps1 ${episode.number + 1}</code> and review the new weekly command centre before drafting/posting next-week assets.`
    ),
  ].join("\n");

  const blockers = [
    hasSmtpSetup ? "" : "Clubhouse Pass auth email setup doc is missing or incomplete.",
    hasMemberPassFlow ? "Configure and test Clubhouse Pass email delivery before public user testing." : "Finish Member Pass / lAIdies Card flow wiring.",
    "Build the true per-issue Fun Pack loader before promoting Issue 02+ pack activities as live.",
    "Run desktop and mobile browser QA for Clubhouse, Member Pass, card builder, and issue publishing after each major weekly change.",
    "Fill the growth scorecard after launch with newsletter, website, social, and community signals.",
  ].filter(Boolean);

  return `
      <section class="panel">
        <h2>Project Radar</h2>
        <p>This is the operating dashboard for what changed outside the issue article. It keeps weekly publishing, product polish, member systems, canon, and handovers visible.</p>
        <ul class="tasks">
          ${radarItems}
        </ul>
      </section>

      <section class="panel">
        <h2>Launch Blockers And Weekly Maintenance</h2>
        <div class="callout">
          ${blockers.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
        </div>
      </section>`;
}

function buildWeeklyCommandCenter(episode, viewerPaths) {
  const issue = padIssue(episode.number);
  const releaseDate = episode.releaseDate || "not set";
  const reviewPath = path.join(reviewDir, `issue-${issue}-production-review.md`);
  const growthPath = path.join(growthDir, `issue-${issue}-growth-scorecard.md`);
  const councilPath = path.join(agentCouncilDir, `issue-${issue}-agent-council-review.md`);
  const issuePath = path.join(issuePageDir, `issue-${issue}.html`);
  const articlePath = path.join(issueBodyDir, `issue-${issue}.md`);
  const buttondownPath = path.join(root, "email", "buttondown", `issue-${issue}.md`);
  const instagramPath = path.join(root, "social", "episodes", `issue-${issue}-instagram-kit.md`);
  const linkedinPath = path.join(root, "social", "episodes", `issue-${issue}-linkedin.md`);
  const communityPath = path.join(root, "community", "weekly-prompts", `issue-${issue}.md`);
  const councilText = readTextIfExists(councilPath);
  const topFiveBlank = councilText.includes("| 1 |  |  |  |  |  |  |");
  const siteLinks = episode.siteLinks || [];
  const publishReady = episode.status === "published";

  const siteLinkHtml = siteLinks.length
    ? siteLinks.map((link) => `<li><span>${escapeHtml(link.type)}</span>${rootRelativeLink(link.url, link.label)}</li>`).join("")
    : `<li><span>missing</span>No website module links set yet.</li>`;

  const taskList = [
    buildTask("Run weekly production", "done", `Use <code>.\\scripts\\start-weekly-workflow.ps1 ${episode.number}</code> next time to run this and open the dashboard.`),
    buildTask("Review the production packet", exists(reviewPath) ? "ready" : "todo", viewerLink(reviewPath, `Issue ${issue} production review`, viewerPaths.production)),
    buildTask("Fill the Agent Council Top 5", topFiveBlank ? "action" : "ready", `${viewerLink(councilPath, `Issue ${issue} Agent Council review`, viewerPaths.council)}<br><em>If blank, ask Codex: "Run the weekly Agent Council review for Issue ${episode.number}. Make each agent act like a best-in-class senior owner for its role and aim for a CEO score of 5 using operations/agents/agent-role-performance-standards.md and operations/agents/ceo-feedback-quality-standard.md. Grade every senior agent, explain why it did or did not earn a 5, and name the top-score action. Require desktop/mobile browser evidence, UX journey audit across first-time/current/late/returning/guest/signed-in/completion/error flows, persistence honesty, archive readiness, launch gates, and stop-the-line blockers for chaotic layout, blank space, overlap, stale open panels, fake interactions, unreleased content, wrong labels/brand styling, or brand risk. The agents should catch issues before Ali does and prove that AI-supported work makes Laidies sharper. Fill the Top 5 with exact changes, evidence, dependencies, and what I need to approve."</em>`),
    buildTask("Update the growth scorecard after launch", exists(growthPath) ? "action" : "todo", viewerLink(growthPath, `Issue ${issue} growth scorecard`, viewerPaths.growth)),
    buildTask("Approve the website issue page", exists(issuePath) ? "action" : "todo", rootRelativeLink(`issues/issue-${issue}.html`, `Open Issue ${issue} website page`)),
    buildTask("Approve/schedule the Buttondown draft", exists(buttondownPath) ? "action" : "todo", viewerLink(buttondownPath, `Issue ${issue} Buttondown draft`, viewerPaths.buttondown)),
    buildTask("Approve/post LinkedIn", exists(linkedinPath) ? "action" : "todo", viewerLink(linkedinPath, `Issue ${issue} LinkedIn draft`, viewerPaths.linkedin)),
    buildTask("Approve/post Instagram", exists(instagramPath) ? "action" : "todo", viewerLink(instagramPath, `Issue ${issue} Instagram kit`, viewerPaths.instagram)),
    buildTask("Post/update the community prompt", exists(communityPath) ? "action" : "todo", viewerLink(communityPath, `Issue ${issue} community prompt`, viewerPaths.community)),
    buildTask("On publish day, mark issue as published", publishReady ? "done" : "action", publishReady ? "Issue metadata is already marked published." : `Issue metadata is currently <code>${escapeHtml(episode.status)}</code>. On Wednesday, June 10, 2026, change it to <code>published</code> and rerun the weekly workflow so the homepage, quiz, and card pack publish together.`),
  ].join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>lAIdies Weekly Command Center</title>
    <style>
      :root {
        color-scheme: light;
        --ink: #18121b;
        --muted: #6f6372;
        --line: #e9dde9;
        --paper: #fff9fd;
        --pink: #ff2aa3;
        --yellow: #ffd84d;
        --green: #1f9d73;
        --red: #c43d60;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        background: #fff;
        color: var(--ink);
        line-height: 1.5;
      }
      header {
        padding: 28px clamp(18px, 4vw, 56px);
        background: #2b0822;
        color: white;
      }
      header p { margin: 6px 0 0; max-width: 920px; color: #ffd8ef; }
      main { padding: 24px clamp(18px, 4vw, 56px) 56px; }
      h1, h2, h3 { margin: 0; line-height: 1.1; }
      h1 { font-size: clamp(30px, 5vw, 58px); }
      h2 { font-size: 22px; margin-bottom: 12px; }
      h3 { font-size: 16px; margin-bottom: 8px; }
      a { color: #a90068; font-weight: 700; }
      code {
        display: inline-block;
        padding: 4px 8px;
        border: 1px solid var(--line);
        border-radius: 6px;
        background: white;
        color: #6b0040;
      }
      .grid {
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr);
        gap: 20px;
        align-items: start;
      }
      .panel {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--paper);
        padding: 18px;
        margin-bottom: 18px;
      }
      .issue-meta {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 10px;
        margin-top: 16px;
      }
      .issue-meta div {
        background: white;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 12px;
      }
      .issue-meta span, .tasks span, .links span {
        display: block;
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .04em;
        text-transform: uppercase;
      }
      .tasks {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 10px;
      }
      .tasks li {
        border: 1px solid var(--line);
        border-left: 6px solid var(--yellow);
        border-radius: 8px;
        background: white;
        padding: 12px;
      }
      .tasks li.done { border-left-color: var(--green); }
      .tasks li.ready { border-left-color: var(--yellow); }
      .tasks li.action { border-left-color: var(--pink); }
      .tasks li.todo { border-left-color: var(--red); }
      .tasks strong { display: block; margin: 3px 0; }
      .tasks p { margin: 0; color: var(--muted); }
      .links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 10px;
      }
      .links li {
        border-bottom: 1px solid var(--line);
        padding-bottom: 10px;
      }
      .missing { color: var(--red); font-weight: 700; }
      .callout {
        border-left: 6px solid var(--pink);
        background: #fff;
        padding: 14px;
        border-radius: 8px;
      }
      .status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 7px 10px;
        background: ${publishReady ? "#e9fff6" : "#fff4c4"};
        border: 1px solid ${publishReady ? "#b5ecd7" : "#f2cf45"};
        border-radius: 999px;
        font-weight: 700;
      }
      @media (max-width: 820px) {
        .grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <header>
      <div class="status">Issue ${issue}: ${escapeHtml(episode.status)}</div>
      <h1>Weekly Command Center</h1>
      <p>One page for the lAIdies weekly process. It regenerates for whichever issue you run, so Issue ${issue} is the focus now and the next issue will get its own review when you run the workflow for that issue.</p>
    </header>
    <main>
      <section class="panel">
        <h2>Current Issue: ${escapeHtml(episode.title)}</h2>
        <p>${escapeHtml(episode.subtitle)}</p>
        <div class="issue-meta">
          <div><span>Lesson</span>${escapeHtml(episode.lesson)}</div>
          <div><span>Try-On</span>${escapeHtml(episode.tryOn)}</div>
          <div><span>Community Action</span>${escapeHtml(episode.communityPrompt)}</div>
          <div><span>Shareable Hook</span>${escapeHtml(episode.social?.reelHooks?.[0] || episode.title)}</div>
          <div><span>Release Date</span>${escapeHtml(releaseDate)}</div>
        </div>
      </section>

      ${buildProjectRadarHtml(episode)}

      <div class="grid">
        <section class="panel">
          <h2>Ali Review Checklist</h2>
          <ul class="tasks">
            ${taskList}
          </ul>
        </section>

        <aside>
          <section class="panel">
            <h2>Start Here Next Time</h2>
            <p>Open PowerShell and run:</p>
            <code>.\\scripts\\start-weekly-workflow.ps1 ${episode.number}</code>
            <p>This runs the weekly process and opens this dashboard for that issue. Change the number for the next Wednesday issue.</p>
          </section>

          <section class="panel">
            <h2>Codex Prompt</h2>
            <div class="callout">
              Run the weekly Agent Council review for Issue ${episode.number}. Make each agent act like a best-in-class senior owner for its role and aim for a CEO score of 5 using operations/agents/agent-role-performance-standards.md and operations/agents/ceo-feedback-quality-standard.md. Grade every senior agent, explain why it did or did not earn a 5, and name the top-score action. Require desktop/mobile browser evidence, UX journey audit across first-time/current/late/returning/guest/signed-in/completion/error flows, persistence honesty, archive readiness, launch gates, and stop-the-line blockers for chaotic layout, blank space, overlap, stale open panels, fake interactions, unreleased content, wrong labels/brand styling, or brand risk. The agents should catch issues before Ali does and prove that AI-supported work makes Laidies sharper. Fill the Top 5 with exact changes, evidence, dependencies, and what I need to approve.
            </div>
            <p>This prompt is reusable every week. Replace the issue number when you move to the next issue.</p>
          </section>

          <section class="panel">
            <h2>Website Module Links</h2>
            <ul class="links">
              ${siteLinkHtml}
            </ul>
          </section>
        </aside>
      </div>

      <section class="panel">
        <h2>Publish Order</h2>
        <ol>
          <li>Before launch: approve/fix the issue article and website page.</li>
          <li>Before launch: approve/fix quiz, card pack, Hot Goss, glossary, and community links.</li>
          <li>Before launch: approve and schedule the Buttondown newsletter.</li>
          <li>Website launch: deploy the website with only published issues visible.</li>
          <li>Issue launch on Wednesday, June 10, 2026: mark Issue 2 published and rerun the weekly workflow.</li>
          <li>After Issue 2 is live: post LinkedIn and Instagram using the generated drafts.</li>
          <li>After socials are posted: post the community prompt and refresh the chat-room digest after comments begin.</li>
          <li>End of week: update the growth scorecard with what happened.</li>
        </ol>
      </section>

      <section class="panel">
        <h2>Source Files</h2>
        <ul class="links">
          <li><span>Episode JSON</span>${fileLink(path.join(episodeDir, `issue-${issue}.json`), `content/episodes/issue-${issue}.json`)}</li>
          <li><span>Article Markdown</span>${viewerLink(articlePath, `content/issues/issue-${issue}.md`, viewerPaths.article)}</li>
          <li><span>Website Page</span>${rootRelativeLink(`issues/issue-${issue}.html`, `issues/issue-${issue}.html`)}</li>
          <li><span>Production Review</span>${viewerLink(reviewPath, `operations/weekly-reviews/issue-${issue}-production-review.md`, viewerPaths.production)}</li>
          <li><span>Agent Council</span>${viewerLink(councilPath, `operations/agent-council/issue-${issue}-agent-council-review.md`, viewerPaths.council)}</li>
          <li><span>Growth Scorecard</span>${viewerLink(growthPath, `operations/growth/issue-${issue}-growth-scorecard.md`, viewerPaths.growth)}</li>
        </ul>
      </section>
    </main>
  </body>
</html>
`;
}

function main() {
  fs.mkdirSync(reviewDir, { recursive: true });
  fs.mkdirSync(growthDir, { recursive: true });
  fs.mkdirSync(agentCouncilDir, { recursive: true });
  fs.mkdirSync(commandCenterFilesDir, { recursive: true });

  const episodes = loadEpisodes();
  if (!episodes.length) {
    throw new Error("No issue JSON files found in content/episodes.");
  }

  const issueNumber = resolveIssueNumber(process.argv.slice(2), episodes);
  const episode = episodes.find((item) => item.number === issueNumber);
  if (!episode) {
    throw new Error(`No episode JSON found for issue ${issueNumber}.`);
  }

  execFileSync(process.execPath, [path.join(root, "scripts", "build-episode-assets.js")], {
    cwd: root,
    stdio: "inherit",
  });

  const issue = padIssue(issueNumber);
  const packet = buildReviewPacket(episode, episodes);
  const outputPath = path.join(reviewDir, `issue-${issue}-production-review.md`);
  fs.writeFileSync(outputPath, packet, "utf8");
  console.log(`Wrote ${rel(outputPath)}`);

  const growthPath = path.join(growthDir, `issue-${issue}-growth-scorecard.md`);
  if (!fs.existsSync(growthPath)) {
    fs.writeFileSync(growthPath, buildGrowthScorecard(episode), "utf8");
    console.log(`Wrote ${rel(growthPath)}`);
  } else {
    console.log(`Kept existing ${rel(growthPath)}`);
  }

  const agentCouncilPath = path.join(agentCouncilDir, `issue-${issue}-agent-council-review.md`);
  if (!fs.existsSync(agentCouncilPath)) {
    fs.writeFileSync(agentCouncilPath, buildAgentCouncilReview(episode), "utf8");
    console.log(`Wrote ${rel(agentCouncilPath)}`);
  } else {
    console.log(`Kept existing ${rel(agentCouncilPath)}`);
  }

  const articlePath = path.join(issueBodyDir, `issue-${issue}.md`);
  const buttondownPath = path.join(root, "email", "buttondown", `issue-${issue}.md`);
  const instagramPath = path.join(root, "social", "episodes", `issue-${issue}-instagram-kit.md`);
  const linkedinPath = path.join(root, "social", "episodes", `issue-${issue}-linkedin.md`);
  const communityPath = path.join(root, "community", "weekly-prompts", `issue-${issue}.md`);
  const viewerPaths = {
    article: writeMarkdownViewer(articlePath, `Issue ${issue} Article`, `issue-${issue}-article.html`),
    production: writeMarkdownViewer(outputPath, `Issue ${issue} Production Review`, `issue-${issue}-production-review.html`),
    council: writeMarkdownViewer(agentCouncilPath, `Issue ${issue} Agent Council Review`, `issue-${issue}-agent-council-review.html`),
    growth: writeMarkdownViewer(growthPath, `Issue ${issue} Growth Scorecard`, `issue-${issue}-growth-scorecard.html`),
    buttondown: writeMarkdownViewer(buttondownPath, `Issue ${issue} Buttondown Draft`, `issue-${issue}-buttondown.html`),
    linkedin: writeMarkdownViewer(linkedinPath, `Issue ${issue} LinkedIn Draft`, `issue-${issue}-linkedin.html`),
    instagram: writeMarkdownViewer(instagramPath, `Issue ${issue} Instagram Kit`, `issue-${issue}-instagram-kit.html`),
    community: writeMarkdownViewer(communityPath, `Issue ${issue} Community Prompt`, `issue-${issue}-community-prompt.html`),
  };

  fs.writeFileSync(commandCenterPath, buildWeeklyCommandCenter(episode, viewerPaths), "utf8");
  console.log(`Wrote ${rel(commandCenterPath)}`);
}

main();
