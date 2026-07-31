/**
 * PRIVATE PUBLICATION PROOF — NOT THE PUBLIC NEWSSTAND DATASET.
 *
 * This fixture shows how one editorially approved Breaking story and one
 * editorially approved Daily story would render. It is intentionally isolated
 * from /content/newsstand-stories.js and cannot publish anything.
 */
window.NEWSSTAND_DATA = {
  schemaVersion: "1.0.0",
  datasetStatus: "published",
  generatedAt: "2026-07-26T08:00:00Z",
  lastCheckedAt: "2026-07-26T08:00:00Z",
  publications: {
    breaking: {
      edition: "breaking",
      job: "A timely, material change readers may need to understand or act on now.",
      status: "current",
      publishedAt: "2026-07-26T08:00:00Z",
      updatedAt: "2026-07-26T08:00:00Z",
      lastCheckedAt: "2026-07-26T08:00:00Z",
      maxAgeHours: 48,
      note: "One qualified model-release story is filed in this private proof."
    },
    daily: {
      edition: "daily",
      job: "An edited briefing that explains the most consequential development since the last issue.",
      status: "current",
      publishedAt: "2026-07-26T08:00:00Z",
      updatedAt: "2026-07-26T08:00:00Z",
      lastCheckedAt: "2026-07-26T08:00:00Z",
      maxAgeHours: 48,
      note: "One consequential evidence story is filed in this private proof."
    },
    weekly: {
      edition: "weekly",
      job: "Durable synthesis that connects the week’s evidence without repeating the headline cycle.",
      status: "quiet",
      publishedAt: null,
      updatedAt: "2026-07-26T08:00:00Z",
      lastCheckedAt: "2026-07-26T08:00:00Z",
      maxAgeHours: 192,
      note: "This proof is limited to The Breaking and The Daily."
    },
    tribune: {
      edition: "tribune",
      job: "A sourced argument that separates evidence, inference and the position being argued.",
      status: "quiet",
      publishedAt: null,
      updatedAt: "2026-07-26T08:00:00Z",
      lastCheckedAt: "2026-07-26T08:00:00Z",
      maxAgeHours: 336,
      note: "This proof is limited to The Breaking and The Daily."
    }
  },
  stories: [
    {
      id: "gemini-flash-family-release",
      slug: "gemini-flash-family-release",
      edition: "breaking",
      status: "published",
      publishedAt: "2026-07-26T08:00:00Z",
      updatedAt: "2026-07-26T08:00:00Z",
      lastCheckedAt: "2026-07-26T08:00:00Z",
      sourceApproval: {
        status: "approved",
        record: "/operations/design-explorations/newsstand-publication-proof-20260726/editorial-receipts.md#the-breaking"
      },
      correction: null,
      retraction: null,
      thread: null,
      thread_subtitle: null,
      thread_entry: null,
      headline: "Google’s new Flash models change the price of getting work done",
      heroImage: "/operations/design-explorations/newsstand-publication-proof-20260726/assets/the-breaking-model-comparison-v2.jpg",
      heroAlt: "Two complete desktop computers running the same task while a central printer produces a five-part comparison sheet.",
      heroCaption: "LAiDIES illustration · Compare the whole result.",
      the_story: "Google released <strong>Gemini 3.6 Flash</strong> and <strong>Gemini 3.5 Flash-Lite</strong> on July 21. Both are generally available through the Gemini API and Google AI Studio, and Google says they are also reaching its app and other products. Gemini 3.6 Flash keeps the previous model’s $1.50-per-million input-token price but cuts output from $9 to $7.50 per million. Flash-Lite costs $0.30 for input and $2.50 for output. Google also made 3.6 Flash the default model in its Antigravity coding agent and documented migration changes that mean an API switch may require more than replacing a model name. A third release, Gemini 3.5 Flash Cyber, is not publicly available; Google says a limited government and trusted-partner pilot is coming.",
      laidies_read: "This is not interesting because Google added more names to an already crowded menu. It is interesting because Google changed both the barista and the till. The new barista may finish some complicated orders with fewer steps, and each step costs less—but that does not guarantee every drink is better or that your old loyalty-card routine still scans. The cost that matters is the <strong>whole receipt: quality, retries, time and total tokens.</strong> In Rewind Era terms, this is closer to a faster everyday computer with cheaper printer ink than a magical new supercomputer. The analogy stops at reliability: AI output varies by task, and independent testing has already found uneven results.",
      what_this_means: "<strong>Test 3.6 Flash</strong> if you already pay for 3.5 Flash or use Gemini for repeated coding, document, image, video or multi-step work. <strong>Test Flash-Lite</strong> for high-volume extraction, classification, translation and cheaper subagent tasks. <strong>Wait before switching production work</strong> if exact object detection, strict JSON or stable legacy API behaviour matters: Roboflow found stronger video and data-extraction results in its tests, but a serious object-detection regression and malformed JSON. Confirm your plan, region and actual model label, then compare the same tasks on outcome quality, elapsed time, token count, tools and retries. What has <em>not</em> changed: a lower token price is not proof of a lower total bill, benchmark wins are not a promise about your files, and Flash Cyber is not a product most readers can choose today.",
      cocktail_party: "“Google’s everyday Gemini model got cheaper, and its lower-cost model is now generally available. That makes both worth testing, especially for repeated work—but don’t switch on the benchmark headline. Run the same jobs and compare the whole receipt: quality, retries, time and total cost.”",
      watch_fors: null,
      closing_note: "LAiDIES will recheck plan and regional access, migration behaviour, strict structured output, object detection and total cost after retries. If those receipts change the recommendation, this story should be updated—not quietly left to age.",
      class_notes: "The reusable rule is the same one you use at a coffee shop: the price beside one ingredient is not the final receipt. For AI, count quality, time, retries, tools and total tokens.",
      sources: [
        {
          id: "google-gemini-flash-launch-2026-07-21",
          label: "Google — Gemini 3.6 Flash, 3.5 Flash-Lite and 3.5 Flash Cyber launch",
          url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/",
          publisherType: "vendor",
          accessedAt: "2026-07-26",
          approvalStatus: "reviewed"
        },
        {
          id: "google-gemini-latest-model-guide-2026-07-26",
          label: "Google AI for Developers — latest-model and migration guide",
          url: "https://ai.google.dev/gemini-api/docs/latest-model",
          publisherType: "vendor",
          accessedAt: "2026-07-26",
          approvalStatus: "reviewed"
        },
        {
          id: "roboflow-gemini-3-6-flash-vision-2026-07",
          label: "Roboflow — independent Gemini 3.6 Flash vision evaluation",
          url: "https://blog.roboflow.com/gemini-3-6-flash-for-vision/",
          publisherType: "independent",
          accessedAt: "2026-07-26",
          approvalStatus: "reviewed"
        }
      ],
      aidb_credit: null,
      tags: ["model release", "Gemini", "Google", "pricing", "workflow", "verification"],
      saint_lane: "The whole receipt",
      badge: "THE BREAKING · MODEL RELEASE"
    },
    {
      id: "google-atlas-ai-use-study",
      slug: "google-atlas-ai-use-study",
      edition: "daily",
      status: "published",
      publishedAt: "2026-07-26T08:00:00Z",
      updatedAt: "2026-07-26T08:00:00Z",
      lastCheckedAt: "2026-07-26T08:00:00Z",
      sourceApproval: {
        status: "approved",
        record: "/operations/design-explorations/newsstand-publication-proof-20260726/editorial-receipts.md#the-daily"
      },
      correction: null,
      retraction: null,
      thread: null,
      thread_subtitle: null,
      thread_entry: null,
      headline: "Fifteen million Gemini conversations do not show AI doing fifteen million jobs",
      heroImage: "/operations/design-explorations/newsstand-publication-proof-20260726/assets/the-daily-office-workflow-v2.jpg",
      heroAlt: "A woman in a newsroom office reviewing a calendar and documents beside a CRT computer, fax machine, filing cabinets and phone.",
      heroCaption: "LAiDIES illustration · Assistance is not automation.",
      the_story: "Google’s first <strong>ATLAS</strong> report studies 14,653,926 de-identified interactions sampled from the Gemini app, Google AI Mode and the free Gemini API during two weeks in April. Google reports that a typical occupation showed AI use in about 21% of its tasks, fewer than 10% of work interactions were classified as full task automation, and more than 86% of sampled interactions happened outside work. Those numbers describe activity inside selected Google products. They do not measure all workers, all AI systems, completed work, productivity or job replacement.",
      laidies_read: "Picture a coffee shop where AI helps take orders, checks recipes and drafts next week’s schedule. ATLAS can count where that assistance appears; it cannot prove the AI ran the whole shop, improved the coffee or increased profit. The Rewind Era equivalent is the office PC arriving on every desk. Seeing people use Word, email and spreadsheets across many occupations told us work was changing. It did not mean the computer performed every job from start to finish. The analogy’s limit matters: ATLAS infers tasks from conversations using Google’s own automated classifiers rather than directly observing finished work.",
      what_this_means: "The useful takeaway is neither “automation is overhyped” nor “jobs are safe.” The current evidence points to <strong>selective assistance inside jobs</strong>, while the consequential questions—productivity, job redesign, who benefits and who is left out—still require outcome data. Read the most precise percentages cautiously. Google’s classifications were much stronger for broad occupation groups than for exact O*NET tasks, and its synthetic validation prompts may have made classification easier. The sample covers only two weeks, excludes paid enterprise API use from the granular analysis and cannot tell whether a conversation saved time or produced a successful result. Watch for independent methodological review, replication, longer time periods and studies that connect AI use to actual outcomes.",
      cocktail_party: "“Google looked at nearly fifteen million Gemini interactions and found people mostly using AI as a helper inside parts of tasks—not as a whole-job replacement. That is useful evidence, but it is still a two-week sample of Google products, classified by Google’s models, and it does not measure whether the work succeeded.”",
      watch_fors: null,
      closing_note: "This is strong enough for a bounded Daily explanation after editorial approval, but not for an automated ‘jobs are safe’ or ‘AI does everything’ conclusion. LAiDIES should update the read when independent methods review or outcome evidence arrives.",
      class_notes: "Use the office-PC analogy to locate the change, then return to the evidence. Adoption, task assistance, completed work and job replacement are four different claims.",
      sources: [
        {
          id: "google-atlas-v1-report-2026",
          label: "Google — ATLAS v1.0 full report",
          url: "https://ai.google/static/documents/GoogleATLASv1.pdf",
          publisherType: "vendor",
          accessedAt: "2026-07-26",
          approvalStatus: "reviewed"
        },
        {
          id: "google-atlas-overview-2026",
          label: "Google — Understanding the AI economy overview",
          url: "https://blog.google/innovation-and-ai/technology/research/understanding-the-ai-economy/",
          publisherType: "vendor",
          accessedAt: "2026-07-26",
          approvalStatus: "reviewed"
        }
      ],
      aidb_credit: null,
      tags: ["AI at work", "automation", "research", "Gemini", "evidence", "jobs"],
      saint_lane: "Assistance is not the same as automation",
      badge: "THE DAILY · EVIDENCE CHECK"
    }
  ]
};

window.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;

window.NEWSSTAND_ARCHIVE_PREVIEW = [
  { id: "archive-breaking-01", edition: "breaking", publishedAt: "2026-07-25T16:00:00Z", topic: "Model releases", headline: "Claude Opus 5 changes what is worth testing—not who wears the crown" },
  { id: "archive-breaking-02", edition: "breaking", publishedAt: "2026-07-24T16:00:00Z", topic: "Model releases", headline: "Google’s new Flash models change the price of getting work done" },
  { id: "archive-breaking-03", edition: "breaking", publishedAt: "2026-07-22T16:00:00Z", topic: "Privacy & permissions", headline: "The important part of the new AI assistant is the permission slip" },
  { id: "archive-breaking-04", edition: "breaking", publishedAt: "2026-07-19T16:00:00Z", topic: "Agents & automation", headline: "A tool that can take the next step needs a new kind of handrail" },
  { id: "archive-breaking-05", edition: "breaking", publishedAt: "2026-07-16T16:00:00Z", topic: "Creativity & media", headline: "The newest video model makes editing faster—and verification harder" },

  { id: "archive-daily-01", edition: "daily", publishedAt: "2026-07-25T08:00:00Z", topic: "Work & jobs", headline: "Fifteen million Gemini conversations do not show AI doing fifteen million jobs" },
  { id: "archive-daily-02", edition: "daily", publishedAt: "2026-07-24T08:00:00Z", topic: "Privacy & permissions", headline: "Meta AI can read the calendar and keep the assignment. Check the permission slip." },
  { id: "archive-daily-03", edition: "daily", publishedAt: "2026-07-23T08:00:00Z", topic: "Evidence & verification", headline: "A benchmark is a driving test, not the whole road trip" },
  { id: "archive-daily-04", edition: "daily", publishedAt: "2026-07-22T08:00:00Z", topic: "Agents & automation", headline: "The difference between answering and acting is one consequential click" },
  { id: "archive-daily-05", edition: "daily", publishedAt: "2026-07-21T08:00:00Z", topic: "Policy & power", headline: "The policy headline is only useful once you know who must actually comply" },

  { id: "archive-weekly-01", edition: "weekly", publishedAt: "2026-07-24T16:00:00Z", topic: "Privacy & permissions", headline: "ChatGPT can now read your health record. The permission screen is the whole story." },
  { id: "archive-weekly-02", edition: "weekly", publishedAt: "2026-07-17T16:00:00Z", topic: "Agents & automation", headline: "This was the week AI assistants started carrying the assignment forward" },
  { id: "archive-weekly-03", edition: "weekly", publishedAt: "2026-07-10T16:00:00Z", topic: "Model releases", headline: "Three model launches, one useful question: what changed for your actual work?" },
  { id: "archive-weekly-04", edition: "weekly", publishedAt: "2026-07-03T16:00:00Z", topic: "Work & jobs", headline: "AI at work looks more like a new office layer than an empty office" },
  { id: "archive-weekly-05", edition: "weekly", publishedAt: "2026-06-26T16:00:00Z", topic: "Evidence & verification", headline: "What the loudest AI headlines left outside the frame this week" },

  { id: "archive-tribune-01", edition: "tribune", publishedAt: "2026-07-24T16:00:00Z", topic: "Evidence & verification", headline: "The label can tell you it was made with AI. It cannot tell you it is true." },
  { id: "archive-tribune-02", edition: "tribune", publishedAt: "2026-07-17T16:00:00Z", topic: "Privacy & permissions", headline: "Permission is becoming the most important product feature in AI" },
  { id: "archive-tribune-03", edition: "tribune", publishedAt: "2026-07-10T16:00:00Z", topic: "Policy & power", headline: "AI rules should be judged by the power they move, not the paperwork they create" },
  { id: "archive-tribune-04", edition: "tribune", publishedAt: "2026-07-03T16:00:00Z", topic: "Creativity & media", headline: "Synthetic media needs a chain of custody, not another confidence badge" },
  { id: "archive-tribune-05", edition: "tribune", publishedAt: "2026-06-26T16:00:00Z", topic: "Work & jobs", headline: "The future of work argument is missing the people who redesign the work" }
];
