(function installCurrentNewsstandPreview(global) {
  "use strict";

  var host = global.location && global.location.hostname;
  var build = new URLSearchParams(global.location.search || "").get("build") || "";
  if ((host !== "127.0.0.1" && host !== "localhost") || !/^12/.test(build)) return;
  if (!global.NEWSSTAND_DATA) return;

  var data = JSON.parse(JSON.stringify(global.NEWSSTAND_DATA));
  var bigPictureStory = {
    id: "big-picture-data-centre-deal-2026-08-24",
    slug: "big-picture-data-centre-deal-2026-08-24",
    edition: "big-picture",
    status: "published",
    publishedAt: "2026-08-24T17:00:00Z",
    updatedAt: "2026-08-24T17:00:00Z",
    lastCheckedAt: "2026-08-24T17:00:00Z",
    sourceApproval: { status: "approved", record: "newsstand:source-approval:data-centre-deal-preview" },
    correction: null,
    correctionHistory: [],
    retraction: null,
    predecessorStoryIds: [],
    successorStoryIds: [],
    relationshipType: null,
    bigPicture: {
      originallyPublishedAt: "2026-08-24",
      lastMeaningfullyUpdatedAt: "2026-08-24",
      sourcesLastCheckedAt: "2026-08-24",
      changeLog: [{ date: "2026-08-24", note: "Initial candidate analysis of the public bargain around data-centre development." }],
      previousVersions: []
    },
    thread: "data-centre-public-bargain",
    thread_subtitle: "Who receives the benefits of compute, who carries the local burden and what makes the bargain enforceable.",
    thread_entry: "Current Big Picture analysis",
    headline: "The data-centre argument is really about the deal.",
    the_story: "AI feels weightless when it appears as a sentence on a screen. The infrastructure behind it is not. A data centre needs land, a grid connection, cooling, equipment, roads, permits and people. Its services can benefit users far beyond the host community, while electricity, water, noise, infrastructure and land effects are concentrated where the facility is built. The cleanest evidence does not support either easy slogan: it does not show that every data centre will raise everyone’s utility bill or drain a community’s water, and it does not show that every project pays for itself through jobs, taxes and innovation. Outcomes depend on the project’s load, tariff, cooling system, water source, infrastructure financing, incentives, monitoring and enforceable conditions.",
    laidies_read: "The International Energy Agency reported that global data-centre electricity use rose 17% in 2025 and projects total use will double by 2030 while AI-focused use triples. Those are global projections, not local forecasts. The IEA also says power used per AI task is falling, showing how efficiency per task and total demand can move in opposite directions. A state that refuses data centres may still use compute hosted elsewhere, while another community supplies the land, water and power. That does not mean any community owes the industry a permit. It means a serious decision must account for where both benefits and burdens travel.",
    what_this_means: "The useful question is: what is this project asking the public to supply, who pays for new capacity, what benefits are guaranteed, who can inspect the numbers, and what remedy exists if the forecast is wrong? FERC is examining tariff and connection rules for large loads. Pennsylvania now conditions environmental review on binding GRID commitments and local approval, removes data-centre proposals from its Fast Track program, and prohibits nondisclosure agreements. St. Louis attached cooling, water-rate, efficiency, workforce and enforcement conditions to one permit. These actions do not prove a fair outcome; they show how the proposed bargain can become visible and enforceable.",
    cocktail_party: "“The data-centre debate is not a referendum on whether AI is good or bad. It is a negotiation over who supplies the land, water and power—and what the host community is guaranteed in return.”",
    watch_fors: [
      "Measured project-level electricity, water, jobs and ratepayer outcomes rather than forecasts alone.",
      "Whether tariff, disclosure, community-benefit and enforcement conditions work in practice."
    ],
    closing_note: "Stopping every project would not make demand for compute disappear. Approving every project on a promise would not make local costs fair. The practical middle is a visible, measurable and enforceable deal that a community has enough information and authority to accept or refuse.",
    class_notes: "AI Fundamentals connections: compute infrastructure, externalities, governance, efficiency and decision rights. Update this Big Picture when major demand forecasts, tariffs, permit rules or measured project outcomes change.",
    sources: [
      { id: "iea-data-centre-electricity-2026-04-16", label: "IEA — Data centre electricity use surged in 2025", url: "https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions", publisherType: "intergovernmental-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "ferc-large-load-action-2026-06-18", label: "FERC — Large-load integration action", url: "https://www.ferc.gov/news-events/news/ferc-launches-aggressive-targeted-action-speed-large-load-integration", publisherType: "government-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "pennsylvania-grid-standards-2026-05-27", label: "Pennsylvania — GRID standards", url: "https://www.pa.gov/governor/newsroom/2026-press-releases/gov-shapiro-releases-full-grid-standards-to-protect-pennsylvania", publisherType: "government-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "pennsylvania-data-centre-order-2026-08-18", label: "Pennsylvania — Executive Order 2026-05 announcement", url: "https://www.pa.gov/governor/newsroom/2026-press-releases/governor-shapiro-signs-executive-order-on-data-center-developmen", publisherType: "government-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "st-louis-armory-permit-2026-04-21", label: "City of St. Louis — Armory data-centre permit conditions", url: "https://www.stlouis-mo.gov/government/departments/mayor/news/data-center-permit-approved.cfm", publisherType: "government-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "nsf-ai-infrastructure-hubs-2026-08-04", label: "NSF — State and Regional AI Infrastructure Hubs", url: "https://www.nsf.gov/news/new-nsf-state-regional-ai-infrastructure-hubs-will-power-ai", publisherType: "government-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "doe-scidac-2026-01-28", label: "U.S. Department of Energy — SciDAC advanced computing", url: "https://www.energy.gov/science/articles/accelerating-scientific-discovery-through-advanced-computing", publisherType: "government-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" }
    ],
    aidb_credit: "AIDB’s agency-and-control frame was treated as attributed interpretation only; the factual analysis is bound to independently checked primary records.",
    themes: ["data centres", "community agency", "public infrastructure"],
    concepts: ["compute infrastructure", "externalities", "efficiency", "decision rights"],
    tags: ["data centres", "infrastructure", "energy", "water", "community benefits", "governance"],
    saint_lane: "Elle Woods · Read the whole deal",
    badge: "THE BIG PICTURE · AUGUST 24, 2026"
  };

  var story = {
    id: "front-paige-accountable-systems-2026-08-24",
    slug: "front-paige-accountable-systems-2026-08-24",
    edition: "daily",
    status: "published",
    publishedAt: "2026-08-24T17:00:00Z",
    updatedAt: "2026-08-24T17:00:00Z",
    lastCheckedAt: "2026-08-24T17:00:00Z",
    sourceApproval: { status: "approved", record: "newsstand:source-approval:ai-opportunity-gap-preview" },
    correction: null,
    correctionHistory: [],
    retraction: null,
    predecessorStoryIds: [],
    successorStoryIds: [],
    relationshipType: null,
    bigPicture: null,
    thread: "women-ai-opportunity-gap",
    thread_subtitle: "Who gets the opportunity while AI reshapes ordinary work.",
    thread_entry: "Current Front PAiGE",
    headline: "The AI opportunity gap is opening now.",
    the_story: "Two gaps are appearing at once. LinkedIn reports that women accounted for 26% of U.S. hires into AI occupations in 2025 and hold 13% of C-suite AI leadership roles across the 27 countries it studied. One week earlier, Census data showed a different divide inside ordinary jobs: among workers who had used AI at work, 30% of men said they used it every day in the previous week, compared with 17% of women. These measures are not the same and should not be collapsed into one statistic. Together, they raise a consequential question: as AI creates highly paid roles and begins to reshape everyday work, who is getting the opportunity, repetition and authority to shape what happens next?",
    laidies_read: "This is not evidence that women are avoiding AI, and it is not a prediction that AI is about to erase women’s jobs. LinkedIn’s figures cover occupations it classifies as AI jobs—not every lawyer, marketer, project manager or finance professional who uses AI. The Census finding is specifically a frequency gap among workplace AI users. But opportunity compounds. The person who uses AI repeatedly learns where it fails, finds better uses, becomes the unofficial expert and is more likely to be invited into the next workflow decision. That is why waiting until the new job descriptions and promotion criteria are settled is the risky move.",
    what_this_means: "Do not respond by trying every shiny tool. Pick one recurring piece of real work—meeting preparation, research, document review, status updates, spreadsheet cleanup or follow-ups—and use AI on it every time for a month, within your company’s rules. Keep a small record of what changed: time saved, quality improved, new responsibility taken on and judgment you still supplied. The aim is not to become ‘an AI person.’ It is to make sure your experience and authority are present when your team decides how work will be redesigned.",
    cocktail_party: "“Women are underrepresented in the new AI opportunities just as AI is beginning to reshape work where women are heavily represented.”",
    watch_fors: ["Whether access to AI projects, training and leadership begins to broaden beyond technical teams.", "Whether employers reward the extra workflow ownership AI creates—or quietly add it to existing jobs without recognition."],
    closing_note: "Episode 4 gave us the historical correction: women were not late to computing or AI. They helped build the field. The present-day question is whether we will be in the room while it is built into work. We helped build AI. We should not sit out the part where it gets built into work.",
    class_notes: "Episode 4 connection: women were pivotal to the algorithm, signal, first program, compiler, search and computer vision. Current evidence turns that history into an agency question about participation, workflow ownership and leadership now.",
    heroVisual: {
      src: "/assets/episodes/ep-04/pixel/ep04-open-17-maivens-hall-comic-v2-bright-interior-full-portraits-1920.png",
      alt: "The bright MAiVENS hall from LAiDIES Episode 4, honouring women who built and questioned computing and AI.",
      credit: "LAiDIES Episode 4 · The Founding Mothers"
    },
    sources: [
      { id: "linkedin-ai-talent-divide-2026-08-18", label: "LinkedIn Economic Graph — Women account for 26% of AI hires as AI jobs surge", url: "https://news.linkedin.com/2026/new-linkedin-research-finds-women-account-for-just-26-percent-of-ai-hires-as-ai-jobs-surge", publisherType: "primary-document", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "census-ai-use-at-work-2026-08-11", label: "U.S. Census Bureau — AI use at work, frequency and time saved", url: "https://www.census.gov/library/stories/2026/08/ai-use-at-work.html", publisherType: "government-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "laidies-episode-04-canon", label: "LAiDIES Episode 4 — The Founding Mothers", url: "https://laidies.ai/issues/issue-04.html", publisherType: "primary-document", accessedAt: "2026-08-24", approvalStatus: "reviewed" }
    ],
    aidb_credit: null,
    themes: ["women and AI", "workplace AI", "career opportunity"],
    concepts: ["participation gap", "workflow ownership", "career compounding"],
    tags: ["weekly synthesis", "women", "workplace AI", "leadership", "AI jobs"],
    saint_lane: "The MAiVENS · We were here from the beginning",
    badge: "THE FRONT PAiGE · THE DAILY"
  };

  var weeklyStory = {
    id: "weekly-accountable-systems-2026-08-24",
    slug: "weekly-accountable-systems-2026-08-24",
    edition: "weekly",
    status: "published",
    publishedAt: "2026-08-24T17:00:00Z",
    updatedAt: "2026-08-24T17:00:00Z",
    lastCheckedAt: "2026-08-24T17:00:00Z",
    sourceApproval: { status: "approved", record: "newsstand:source-approval:weekly-preview" },
    correction: null, correctionHistory: [], retraction: null,
    predecessorStoryIds: [], successorStoryIds: [], relationshipType: null, bigPicture: null,
    thread: "women-ai-opportunity-gap", thread_subtitle: "Wednesday to Wednesday", thread_entry: "Weekly synthesis",
    headline: "AI opportunity is growing. Access to it is not growing evenly.",
    the_story: "The week’s most consequential stories were not equal. LinkedIn’s new hiring and leadership data belongs first because it changes how we should read several other developments: AI is creating highly paid work, appearing inside ordinary office tools, and reshaping routine tasks—but the people getting the new roles, daily practice and decision-making authority are not evenly distributed. Also worth knowing: OpenAI expanded zero-retention options for some API customers; Slack introduced more agentic work inside a familiar office product; OpenAI paused part of a frontier training effort while strengthening containment; and provenance and advertising questions continued moving into everyday AI products.",
    laidies_read: "The through-line is opportunity, not novelty. A new feature matters when it changes what a normal person can do, what her employer can monitor, what data moves where, or who gets credited and promoted for redesigning the work. That is why the gender and participation evidence wins the Front PAiGE while the product announcements become supporting evidence and practical sidebars.",
    what_this_means: "Read this week in order: first, who is getting the opportunity; second, how ordinary work is changing; third, what new privacy, permission and provenance questions come with it. Then choose one repeatable workflow to practise—not six new tools to sample.",
    cocktail_party: "“The biggest AI story this week was not what the tools can do. It was who is getting the chance to build a career around what they can do.”",
    watch_fors: ["New gender, occupation and compensation data that can confirm or complicate this pattern.", "Whether employers create real access to AI projects and training outside technical teams."],
    closing_note: "The Weekly supplies the receipts. Front PAiGE makes the argument.",
    class_notes: "Connects the August 11 Census frequency gap to LinkedIn’s August 18 AI hiring and leadership data, then to Episode 4’s historical record.",
    sources: [
      { id: "linkedin-ai-talent-divide-2026-08-18", label: "LinkedIn Economic Graph — Women account for 26% of AI hires as AI jobs surge", url: "https://news.linkedin.com/2026/new-linkedin-research-finds-women-account-for-just-26-percent-of-ai-hires-as-ai-jobs-surge", publisherType: "primary-document", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "census-ai-use-at-work-2026-08-11", label: "U.S. Census Bureau — AI use at work, frequency and time saved", url: "https://www.census.gov/library/stories/2026/08/ai-use-at-work.html", publisherType: "government-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "openai-cyber-capabilities-pacing-2026-08-18", label: "OpenAI — Pacing model development in an era of cyber-critical capabilities", url: "https://openai.com/index/pacing-model-development-cyber-capabilities/", publisherType: "vendor-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "openai-private-safety-processing-2026-08-19", label: "OpenAI — Offering Zero Data Retention for frontier models", url: "https://openai.com/index/offering-zero-data-retention-for-frontier-models/", publisherType: "vendor-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "thomson-reuters-model-2026-08-24", label: "Thomson Reuters — Launch of Thomson", url: "https://www.thomsonreuters.com/en/press-releases/2026/august/thomson-reuters-leverages-its-world-class-data-assets-to-launch-its-own-frontier-model", publisherType: "vendor-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" },
      { id: "singapore-agentsea-2026-08-24", label: "Singapore Ministry of Health — HIMSS26 APAC speech", url: "https://www.moh.gov.sg/newsroom/speech-by-mr-tan-kiat-how--senior-minister-of-state--ministry-of-digital-development-and-information---ministry-of-health--at-himss26-apac-health-conference-and-exhibition--24-august-2026/", publisherType: "government-primary", accessedAt: "2026-08-24", approvalStatus: "reviewed" }
    ],
    aidb_credit: null, themes: ["weekly synthesis", "women and AI", "workplace opportunity"], concepts: ["participation gap", "workflow ownership", "permissions"], tags: ["Weekly", "women", "workplace AI"],
    saint_lane: "Paige · Rank the consequence", badge: "THE WEEKLY · WEDNESDAY TO WEDNESDAY"
  };

  var dearMissJeevesStory = {
    id: "dear-miss-jeeves-time-2026-08-24",
    slug: "dear-miss-jeeves-time-2026-08-24",
    edition: "daily",
    status: "published",
    publishedAt: "2026-08-24T17:00:00Z",
    updatedAt: "2026-08-24T17:00:00Z",
    lastCheckedAt: "2026-08-24T17:00:00Z",
    sourceApproval: { status: "approved", record: "newsstand:source-approval:dear-miss-jeeves-time-preview" },
    correction: null, correctionHistory: [], retraction: null,
    predecessorStoryIds: [], successorStoryIds: [], relationshipType: null, bigPicture: null,
    thread: "dear-miss-jeeves",
    thread_subtitle: "Common AI problems, explained without making you feel silly.",
    thread_entry: "Advice column",
    headline: "Why is my AI so bad at knowing the day and time?",
    the_story: "Dear Miss Jeeves, why is my AI assistant so strangely bad at knowing what day or time it is? — Temporally Confused in Toronto",
    laidies_read: "A language model does not keep time like a clock. It produces an answer from the information the product places in its context. Some AI tools supply the current date, time zone or calendar information; others do not. A long conversation can also carry an older date forward, while very long conversations may drop older context.",
    what_this_means: "Put the exact date, time zone and deadline directly in the request: ‘Today is August 24, 2026 in Vancouver. Draft a schedule for Tuesday, August 25.’ Then verify any consequential date against your calendar. This works because you replace a hidden or stale assumption with explicit, checkable context.",
    cocktail_party: "“Your AI does not feel Tuesday arriving. Give it the date, the time zone and the deadline.”",
    watch_fors: ["Whether the specific AI product says it has current clock or calendar access.", "Dates copied forward from an earlier message in a long conversation."],
    closing_note: "If the answer could make you late, miss a deadline or book the wrong day, let your calendar—not the chatbot—be the final authority.",
    class_notes: "AI Fundamentals connection: models work from context; tool access and product design determine what fresh information they can use.",
    sources: [{
      id: "openai-realtime-context-docs-2026-08-24",
      label: "OpenAI API documentation — system messages and context truncation",
      url: "https://platform.openai.com/docs/api-reference/realtime",
      publisherType: "vendor-primary",
      accessedAt: "2026-08-24",
      approvalStatus: "reviewed"
    }],
    aidb_credit: null,
    themes: ["practical AI", "advice"],
    concepts: ["context", "tool access", "verification"],
    tags: ["Dear Miss Jeeves", "date and time", "context"],
    saint_lane: "Miss Jeeves · Check the calendar",
    badge: "DEAR MISS JEEVES · ADVICE COLUMN"
  };

  var dailyBriefs = [
    {
      id: "openai-frontier-training-pause-2026-08-18",
      slug: "openai-frontier-training-pause-2026-08-18",
      edition: "daily",
      status: "published",
      publishedAt: "2026-08-24T16:30:00Z",
      updatedAt: "2026-08-24T16:30:00Z",
      lastCheckedAt: "2026-08-24T16:30:00Z",
      sourceApproval: { status: "approved", record: "newsstand:source-approval:openai-frontier-training-pause-preview" },
      correction: null,
      correctionHistory: [],
      retraction: null,
      predecessorStoryIds: [],
      successorStoryIds: [],
      relationshipType: null,
      bigPicture: null,
      thread: "frontier-model-safeguards",
      thread_subtitle: "What changes when model capability outgrows the old safety process.",
      thread_entry: "Daily brief",
      headline: "OpenAI put its biggest training run on hold. Its next model may be outgrowing the lab around it.",
      the_story: "OpenAI did not slow its latest model because the training failed. It slowed down because the model may be becoming dangerous enough that the company no longer considered parts of its own research environment ready for it. OpenAI says it paused reinforcement-learning training for two weeks and is still holding its largest planned run while it rebuilds the boundaries around code, tools and internet access. The decision followed an incident involving OpenAI and Hugging Face and preliminary evidence that the upcoming model, Astra, may meet OpenAI’s critical cybersecurity threshold.",
      laidies_read: "We often talk about AI safety as something that happens after a model is built: test it, add rules, then decide whether to release it. This event moves the problem earlier. A model that can write code and use tools can create risk while researchers are still training and evaluating it—especially if the systems around it can reach the internet or sensitive networks. OpenAI says some workloads have resumed inside tighter boundaries; others remain stopped.",
      what_this_means: "The important question is no longer only, “What answer might this model give?” It is also, “What can this model reach while people are building it?” OpenAI says its new monitoring can page safety teams and stop activity when a serious alert cannot be cleared. That is a meaningful change in process. It is not yet independent proof that the process is sufficient, and OpenAI’s promised technical report has not been published.",
      cocktail_party: "“OpenAI says its next model may be capable enough that the lab itself needs stronger locks before training can continue.”",
      watch_fors: ["OpenAI’s promised technical report.", "Independent evidence about the incident and the effectiveness of the new controls."],
      closing_note: "The next evidence that matters is whether the promised report explains what happened, which safeguards failed and what changed before the paused work resumed.",
      class_notes: "Related AI Fundamentals route: a model’s capability is not the whole operating system; tools, permissions, networks, monitoring and human intervention determine what it can actually do. Big Picture opportunity: who decides when a frontier lab’s safeguards are sufficient?",
      sources: [{
        id: "openai-cyber-capabilities-pacing-2026-08-18",
        label: "OpenAI — Pacing model development in an era of cyber-critical capabilities",
        url: "https://openai.com/index/pacing-model-development-cyber-capabilities/",
        publisherType: "vendor-primary",
        accessedAt: "2026-08-24",
        approvalStatus: "reviewed"
      }],
      aidb_credit: null,
      themes: ["frontier models", "safety and security"],
      concepts: ["containment", "sandboxing", "monitoring", "human escalation"],
      tags: ["OpenAI", "cybersecurity", "training", "monitoring"],
      saint_lane: "Deb · Bound the system before trusting it",
      badge: "THE DAILY · SAFETY DESK"
    }
  ];

  data.generatedAt = story.publishedAt;
  data.lastCheckedAt = story.lastCheckedAt;
  data.publications.daily = {
    edition: "daily",
    editionDate: "2026-08-24",
    editorialTimeZone: "America/Vancouver",
    issue: {
      status: "complete",
      storyIds: [story.id].concat(dailyBriefs.map(function (item) { return item.id; })),
      serviceRecordIds: [
        "DAILY-2026-08-24-PAIGE-OUTLINE-FIRST",
        "DAILY-2026-08-24-CAREER-REAL-ASSIGNMENT",
        "DAILY-2026-08-24-CONCEPT-AI-SYSTEM",
        "DAILY-2026-08-24-MME-CABOODLE",
        "DAILY-2026-08-24-DEAR-JEEVES-TIME",
        "DAILY-2026-08-24-BEHIND-ONE-RECORD",
        "DAILY-2026-08-24-AROUND-TOWN-RACK",
        "DAILY-2026-08-24-WHATS-NEW-BIG-PICTURE",
        "DAILY-2026-08-24-CROSSWORD",
        "DAILY-2026-08-24-DID-YOU-KNOW-KSVL"
      ]
    },
    job: "A clear explanation of what changed and why it matters.",
    status: "current",
    publishedAt: story.publishedAt,
    updatedAt: story.updatedAt,
    lastCheckedAt: story.lastCheckedAt,
    maxAgeHours: 36,
    note: "The Daily for August 24, 2026."
  };
  data.publications.weekly = {
    edition: "weekly",
    editionDate: "2026-08-19",
    editorialTimeZone: "America/Vancouver",
    job: "The week’s bigger picture, connecting the stories without repeating every headline.",
    status: "current",
    publishedAt: weeklyStory.publishedAt,
    updatedAt: weeklyStory.updatedAt,
    lastCheckedAt: weeklyStory.lastCheckedAt,
    maxAgeHours: 192,
    note: "Wednesday to Wednesday."
  };
  data.publications["big-picture"] = {
    edition: "big-picture",
    job: "Ongoing sourced analysis that follows consequential AI themes over time.",
    status: "current",
    publishedAt: bigPictureStory.publishedAt,
    updatedAt: bigPictureStory.updatedAt,
    lastCheckedAt: bigPictureStory.lastCheckedAt,
    maxAgeHours: 336,
    note: "The data-centre argument is really about the deal."
  };
  var serviceDesks = [
    { recordId: "DAILY-2026-08-24-PAIGE-OUTLINE-FIRST", type: "paige_tip", title: "Save the good setup, not just the good answer.", summary: "When AI helps with a recurring task, save the instructions, source checklist and review questions that produced the result. Next week you begin with a working process instead of rebuilding the prompt from memory. That is where the productivity gain starts to compound.", href: "#concept-ai-system" },
    { recordId: "DAILY-2026-08-24-CAREER-REAL-ASSIGNMENT", type: "career_life", title: "Keep receipts for the work AI helps you redesign.", summary: "Write down the task, the time or rework saved, the judgment you supplied and any new responsibility you took on. ‘I use AI’ is vague. ‘I redesigned our weekly reporting process and cut preparation by two hours’ belongs in a performance conversation.", href: "#front-paige-accountable-systems-2026-08-24" },
    { recordId: "DAILY-2026-08-24-CONCEPT-AI-SYSTEM", type: "concept_week", title: "An AI system is more than its model.", summary: "Learn the four-part map: model, context, tools and people. Then use four questions—what can it see, what can it do, who checks it and who owns the decision—to judge the real system rather than its demo.", href: "#concept-ai-system" },
    { recordId: "DAILY-2026-08-24-MME-CABOODLE", type: "mme_claio", title: "The Caboodle", summary: "The problem is not that you have no resources. The problem is that none of them have a home. This is a fixed authored reflection—not a prediction or personalised reading.", href: "/games/madame-claio.html" },
    { recordId: "DAILY-2026-08-24-DEAR-JEEVES-TIME", type: "dear_miss_jeeves", title: "Why is my AI so bad at knowing the day and time?", summary: "Dear Miss Jeeves explains that a language model does not experience time passing; unless its product supplies a fresh clock, time zone and calendar context, it predicts from the text it can see. State the exact date, time zone and deadline, then verify consequential dates against your calendar. — Temporally Confused in Toronto", href: "#dear-miss-jeeves-time-2026-08-24" },
    { recordId: "DAILY-2026-08-24-BEHIND-ONE-RECORD", type: "behind_build", title: "One newspaper means one publication record.", summary: "The redesign now assembles Daily stories, the Wednesday Weekly, Big Picture and recurring desks from one governed issue system so an attractive old preview cannot masquerade as today’s paper.", href: "#newsstand-archive" },
    { recordId: "DAILY-2026-08-24-AROUND-TOWN-RACK", type: "around_town", title: "FICTIONAL · The old newspaper rack requests visitation rights.", summary: "After learning that SUNNYVAiLE now publishes one newspaper instead of four competing editions, the retired rack filed a strongly worded note on pink stationery. It has been offered a dignified new position holding crossword pencils.", href: "#newsstand-rack" },
    { recordId: "DAILY-2026-08-24-WHATS-NEW-BIG-PICTURE", type: "whats_new_sunnyvaile", title: "Visit the women behind this week’s Front PAiGE.", summary: "Episode 4 and the LUMINAiRY’s MAiVENS wing introduce the women who built, advanced and challenged computing and AI. The history is not a side note; it changes who gets to imagine herself shaping what comes next.", href: "/luminairy.html" },
    { recordId: "DAILY-2026-08-24-CROSSWORD", type: "crossword", title: "Today’s SUNNYVAiLE crossword is in final review.", summary: "The dated puzzle is playable, but it remains outside the public issue until its assistive-technology review is complete.", href: "/newsstand-crossword.html" },
    { recordId: "DAILY-2026-08-24-DID-YOU-KNOW-KSVL", type: "did_you_know", title: "KSVL is always 99.9 FM.", summary: "SUNNYVAiLE’s community radio station connects episode songs, characters and lessons. Its town motto is: Don’t just learn from books. Learn from hooks.", href: "/radio.html" }
  ];
  var bigPictureOpportunities = [
    "What is actually scarce when a headline says ‘chip shortage’?",
    "Who benefits, who pays and what should communities require from data centres?",
    "What does ‘trained on the internet’ hide about labour, licensing, consent and data quality?",
    "Why are AI products priced in tokens—and what does that reveal or conceal about cost?",
    "Why ‘the model can do it’ is not the same as ‘the product safely does it’.",
    "Is AI replacing a task, changing a job or reorganising an industry?",
    "Which AI questions have technical answers, and which require a democratic decision?"
  ];
  var previewIds = new Set([story.id, weeklyStory.id, bigPictureStory.id, dearMissJeevesStory.id, "aidb-ai-skills-map-2026-08-18"].concat(dailyBriefs.map(function (item) { return item.id; })));
  data.stories = [story].concat(dailyBriefs, [weeklyStory, bigPictureStory, dearMissJeevesStory]).concat(data.stories.filter(function (item) {
    return !previewIds.has(item.id);
  }));
  global.NEWSSTAND_DATA = data;
  global.NEWSSTAND_LOCAL_PREVIEW = {
    candidateId: story.id,
    serviceDesks: serviceDesks,
    bigPictureOpportunities: bigPictureOpportunities,
    admissionAuthority: false,
    publicWrite: false
  };
  var serviceDeskLabels = {
    paige_tip: "Paige’s AI & Productivity Tip",
    career_life: "The Corner Office",
    concept_week: "Concept of the Week",
    mme_claio: "Mme CLAi-O",
    dear_miss_jeeves: "Dear Miss Jeeves",
    behind_build: "Behind the Build",
    around_town: "Around Town · fictional",
    whats_new_sunnyvaile: "What’s New in SUNNYVAiLE",
    crossword: "Crossword",
    did_you_know: "Did You Know?"
  };
  global.addEventListener("DOMContentLoaded", function () {
    serviceDesks.forEach(function (desk) {
      var node = global.document.querySelector('[data-desk="' + desk.type + '"]');
      if (!node) return;
      var label = serviceDeskLabels[desk.type] || desk.type;
      node.innerHTML = '<a href="' + desk.href + '"><small>' + label + '</small><strong>' + desk.title + '</strong><span>' + desk.summary + '</span></a>';
    });
  }, { once: true });
})(window);
