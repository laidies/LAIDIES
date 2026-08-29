/**
 * SUNNYVAiLE NewsStand — canonical public publication dataset
 *
 * Schema: /content/newsstand.schema.json
 * Public editions: breaking | daily | weekly | big-picture
 *
 * A private radar or candidate never publishes directly to this object.
 * The reader fails closed when this object is absent, malformed, held or stale.
 */
window.NEWSSTAND_DATA = {
  "schemaVersion": "2.0.0",
  "datasetStatus": "published",
  "generatedAt": "2026-08-24T17:00:00Z",
  "lastCheckedAt": "2026-08-24T17:00:00Z",
  "publications": {
    "breaking": {
      "edition": "breaking",
      "job": "News as it happens, when waiting would leave readers behind.",
      "status": "quiet",
      "publishedAt": null,
      "updatedAt": "2026-08-24T17:00:00Z",
      "lastCheckedAt": "2026-08-24T17:00:00Z",
      "maxAgeHours": 24,
      "note": "No breaking story."
    },
    "daily": {
      "edition": "daily",
      "editionDate": "2026-08-24",
      "editorialTimeZone": "America/Vancouver",
      "issue": {
        "status": "complete",
        "storyIds": [
          "front-paige-accountable-systems-2026-08-24"
        ],
        "serviceRecordIds": [
          "DAILY-2026-08-24-PAIGE-OUTLINE-FIRST",
          "DAILY-2026-08-24-CAREER-REAL-ASSIGNMENT",
          "DAILY-2026-08-24-CONCEPT-AI-SYSTEM",
          "DAILY-2026-08-24-MME-CABOODLE",
          "DAILY-2026-08-24-DEAR-JEEVES-TIME",
          "DAILY-2026-08-24-WHATS-NEW-BIG-PICTURE",
          "DAILY-2026-08-24-DID-YOU-KNOW-KSVL"
        ]
      },
      "job": "A clear explanation of what changed and why it matters.",
      "status": "current",
      "publishedAt": "2026-08-24T17:00:00Z",
      "updatedAt": "2026-08-24T17:00:00Z",
      "lastCheckedAt": "2026-08-24T17:00:00Z",
      "maxAgeHours": 36,
      "note": "The Daily for August 24, 2026."
    },
    "weekly": {
      "edition": "weekly",
      "editionDate": "2026-08-19",
      "editorialTimeZone": "America/Vancouver",
      "job": "The week’s bigger picture, connecting the stories without repeating every headline.",
      "status": "current",
      "publishedAt": "2026-08-24T17:00:00Z",
      "updatedAt": "2026-08-24T17:00:00Z",
      "lastCheckedAt": "2026-08-24T17:00:00Z",
      "maxAgeHours": 192,
      "note": "Wednesday to Wednesday."
    },
    "big-picture": {
      "edition": "big-picture",
      "job": "Ongoing sourced analysis that follows consequential AI themes over time.",
      "status": "current",
      "publishedAt": "2026-08-24T17:00:00Z",
      "updatedAt": "2026-08-24T17:00:00Z",
      "lastCheckedAt": "2026-08-24T17:00:00Z",
      "maxAgeHours": 336,
      "note": "The data-centre argument is really about the deal."
    }
  },
  "stories": [
    {
      "id": "front-paige-accountable-systems-2026-08-24",
      "slug": "front-paige-accountable-systems-2026-08-24",
      "edition": "daily",
      "status": "published",
      "publishedAt": "2026-08-24T17:00:00Z",
      "updatedAt": "2026-08-24T17:00:00Z",
      "lastCheckedAt": "2026-08-24T17:00:00Z",
      "sourceApproval": {
        "status": "approved",
        "record": "newsstand:source-approval:front-paige-accountable-systems-2026-08-24"
      },
      "correction": null,
      "correctionHistory": [],
      "retraction": null,
      "predecessorStoryIds": [],
      "successorStoryIds": [],
      "relationshipType": null,
      "bigPicture": null,
      "thread": "women-ai-opportunity-gap",
      "thread_subtitle": "Who gets the opportunity while AI reshapes ordinary work.",
      "thread_entry": "Current Front PAiGE",
      "headline": "The AI opportunity gap is opening now.",
      "the_story": "Two gaps are appearing at once. LinkedIn reports that women accounted for 26% of U.S. hires into AI occupations in 2025 and hold 13% of C-suite AI leadership roles across the 27 countries it studied. One week earlier, Census data showed a different divide inside ordinary jobs: among workers who had used AI at work, 30% of men said they used it every day in the previous week, compared with 17% of women. These measures are not the same and should not be collapsed into one statistic. Together, they raise a consequential question: as AI creates highly paid roles and begins to reshape everyday work, who is getting the opportunity, repetition and authority to shape what happens next?",
      "laidies_read": "This is not evidence that women are avoiding AI, and it is not a prediction that AI is about to erase women’s jobs. LinkedIn’s figures cover occupations it classifies as AI jobs—not every lawyer, marketer, project manager or finance professional who uses AI. The Census finding is specifically a frequency gap among workplace AI users. But opportunity compounds. The person who uses AI repeatedly learns where it fails, finds better uses, becomes the unofficial expert and is more likely to be invited into the next workflow decision. That is why waiting until the new job descriptions and promotion criteria are settled is the risky move.",
      "what_this_means": "Do not respond by trying every shiny tool. Pick one recurring piece of real work—meeting preparation, research, document review, status updates, spreadsheet cleanup or follow-ups—and use AI on it every time for a month, within your company’s rules. Keep a small record of what changed: time saved, quality improved, new responsibility taken on and judgment you still supplied. The aim is not to become ‘an AI person.’ It is to make sure your experience and authority are present when your team decides how work will be redesigned.",
      "cocktail_party": "“Women are underrepresented in the new AI opportunities just as AI is beginning to reshape work where women are heavily represented.”",
      "watch_fors": [
        "Whether access to AI projects, training and leadership begins to broaden beyond technical teams.",
        "Whether employers reward the extra workflow ownership AI creates—or quietly add it to existing jobs without recognition."
      ],
      "closing_note": "Episode 4 gave us the historical correction: women were not late to computing or AI. They helped build the field. The present-day question is whether we will be in the room while it is built into work. We helped build AI. We should not sit out the part where it gets built into work.",
      "class_notes": "Episode 4 connection: women were pivotal to the algorithm, signal, first program, compiler, search and computer vision. Current evidence turns that history into an agency question about participation, workflow ownership and leadership now.",
      "heroVisual": {
        "src": "/assets/episodes/ep-04/pixel/ep04-open-17-maivens-hall-comic-v2-bright-interior-full-portraits-1920.png",
        "alt": "The bright MAiVENS hall from LAiDIES Episode 4, honouring women who built and questioned computing and AI.",
        "credit": "LAiDIES Episode 4 · The Founding Mothers"
      },
      "sources": [
        {
          "id": "linkedin-ai-talent-divide-2026-08-18",
          "label": "LinkedIn Economic Graph — Women account for 26% of AI hires as AI jobs surge",
          "url": "https://news.linkedin.com/2026/new-linkedin-research-finds-women-account-for-just-26-percent-of-ai-hires-as-ai-jobs-surge",
          "publisherType": "primary-document",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "census-ai-use-at-work-2026-08-11",
          "label": "U.S. Census Bureau — AI use at work, frequency and time saved",
          "url": "https://www.census.gov/library/stories/2026/08/ai-use-at-work.html",
          "publisherType": "regulator",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "laidies-episode-04-canon",
          "label": "LAiDIES Episode 4 — The Founding Mothers",
          "url": "https://laidies.ai/issues/issue-04.html",
          "publisherType": "primary-document",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        }
      ],
      "aidb_credit": null,
      "themes": [
        "women and AI",
        "workplace AI",
        "career opportunity"
      ],
      "concepts": [
        "participation gap",
        "workflow ownership",
        "career compounding"
      ],
      "tags": [
        "weekly synthesis",
        "women",
        "workplace AI",
        "leadership",
        "AI jobs"
      ],
      "saint_lane": "The MAiVENS · We were here from the beginning",
      "badge": "THE FRONT PAiGE · THE DAILY"
    },
    {
      "id": "openai-frontier-training-pause-2026-08-18",
      "slug": "openai-frontier-training-pause-2026-08-18",
      "edition": "daily",
      "status": "hold",
      "publishedAt": "2026-08-24T16:30:00Z",
      "updatedAt": "2026-08-24T16:30:00Z",
      "lastCheckedAt": "2026-08-24T16:30:00Z",
      "sourceApproval": {
        "status": "independent-review-required",
        "record": "newsstand:source-approval:openai-frontier-training-pause-2026-08-18"
      },
      "correction": null,
      "correctionHistory": [],
      "retraction": null,
      "predecessorStoryIds": [],
      "successorStoryIds": [],
      "relationshipType": null,
      "bigPicture": null,
      "thread": "frontier-model-safeguards",
      "thread_subtitle": "What changes when model capability outgrows the old safety process.",
      "thread_entry": "Daily brief",
      "headline": "OpenAI put its biggest training run on hold. Its next model may be outgrowing the lab around it.",
      "the_story": "OpenAI did not slow its latest model because the training failed. It slowed down because the model may be becoming dangerous enough that the company no longer considered parts of its own research environment ready for it. OpenAI says it paused reinforcement-learning training for two weeks and is still holding its largest planned run while it rebuilds the boundaries around code, tools and internet access. The decision followed an incident involving OpenAI and Hugging Face and preliminary evidence that the upcoming model, Astra, may meet OpenAI’s critical cybersecurity threshold.",
      "laidies_read": "We often talk about AI safety as something that happens after a model is built: test it, add rules, then decide whether to release it. This event moves the problem earlier. A model that can write code and use tools can create risk while researchers are still training and evaluating it—especially if the systems around it can reach the internet or sensitive networks. OpenAI says some workloads have resumed inside tighter boundaries; others remain stopped.",
      "what_this_means": "The important question is no longer only, “What answer might this model give?” It is also, “What can this model reach while people are building it?” OpenAI says its new monitoring can page safety teams and stop activity when a serious alert cannot be cleared. That is a meaningful change in process. It is not yet independent proof that the process is sufficient, and OpenAI’s promised technical report has not been published.",
      "cocktail_party": "“OpenAI says its next model may be capable enough that the lab itself needs stronger locks before training can continue.”",
      "watch_fors": [
        "OpenAI’s promised technical report.",
        "Independent evidence about the incident and the effectiveness of the new controls."
      ],
      "closing_note": "The next evidence that matters is whether the promised report explains what happened, which safeguards failed and what changed before the paused work resumed.",
      "class_notes": "Related AI Fundamentals route: a model’s capability is not the whole operating system; tools, permissions, networks, monitoring and human intervention determine what it can actually do. Big Picture opportunity: who decides when a frontier lab’s safeguards are sufficient?",
      "sources": [
        {
          "id": "openai-cyber-capabilities-pacing-2026-08-18",
          "label": "OpenAI — Pacing model development in an era of cyber-critical capabilities",
          "url": "https://openai.com/index/pacing-model-development-cyber-capabilities/",
          "publisherType": "vendor",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        }
      ],
      "aidb_credit": null,
      "themes": [
        "frontier models",
        "safety and security"
      ],
      "concepts": [
        "containment",
        "sandboxing",
        "monitoring",
        "human escalation"
      ],
      "tags": [
        "OpenAI",
        "cybersecurity",
        "training",
        "monitoring"
      ],
      "saint_lane": "Deb · Bound the system before trusting it",
      "badge": "THE DAILY · SAFETY DESK"
    },
    {
      "id": "weekly-accountable-systems-2026-08-24",
      "slug": "weekly-accountable-systems-2026-08-24",
      "edition": "weekly",
      "status": "hold",
      "publishedAt": "2026-08-24T17:00:00Z",
      "updatedAt": "2026-08-24T17:00:00Z",
      "lastCheckedAt": "2026-08-24T17:00:00Z",
      "sourceApproval": {
        "status": "independent-review-required",
        "record": "newsstand:source-approval:weekly-accountable-systems-2026-08-24"
      },
      "correction": null,
      "correctionHistory": [],
      "retraction": null,
      "predecessorStoryIds": [],
      "successorStoryIds": [],
      "relationshipType": null,
      "bigPicture": null,
      "thread": "women-ai-opportunity-gap",
      "thread_subtitle": "Wednesday to Wednesday",
      "thread_entry": "Weekly synthesis",
      "headline": "AI opportunity is growing. Access to it is not growing evenly.",
      "the_story": "The week’s most consequential stories were not equal. LinkedIn’s new hiring and leadership data belongs first because it changes how we should read several other developments: AI is creating highly paid work, appearing inside ordinary office tools, and reshaping routine tasks—but the people getting the new roles, daily practice and decision-making authority are not evenly distributed. Also worth knowing: OpenAI expanded zero-retention options for some API customers; Slack introduced more agentic work inside a familiar office product; OpenAI paused part of a frontier training effort while strengthening containment; and provenance and advertising questions continued moving into everyday AI products.",
      "laidies_read": "The through-line is opportunity, not novelty. A new feature matters when it changes what a normal person can do, what her employer can monitor, what data moves where, or who gets credited and promoted for redesigning the work. That is why the gender and participation evidence wins the Front PAiGE while the product announcements become supporting evidence and practical sidebars.",
      "what_this_means": "Read this week in order: first, who is getting the opportunity; second, how ordinary work is changing; third, what new privacy, permission and provenance questions come with it. Then choose one repeatable workflow to practise—not six new tools to sample.",
      "cocktail_party": "“The biggest AI story this week was not what the tools can do. It was who is getting the chance to build a career around what they can do.”",
      "watch_fors": [
        "New gender, occupation and compensation data that can confirm or complicate this pattern.",
        "Whether employers create real access to AI projects and training outside technical teams."
      ],
      "closing_note": "The Weekly supplies the receipts. Front PAiGE makes the argument.",
      "class_notes": "Connects the August 11 Census frequency gap to LinkedIn’s August 18 AI hiring and leadership data, then to Episode 4’s historical record.",
      "sources": [
        {
          "id": "linkedin-ai-talent-divide-2026-08-18",
          "label": "LinkedIn Economic Graph — Women account for 26% of AI hires as AI jobs surge",
          "url": "https://news.linkedin.com/2026/new-linkedin-research-finds-women-account-for-just-26-percent-of-ai-hires-as-ai-jobs-surge",
          "publisherType": "primary-document",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "census-ai-use-at-work-2026-08-11",
          "label": "U.S. Census Bureau — AI use at work, frequency and time saved",
          "url": "https://www.census.gov/library/stories/2026/08/ai-use-at-work.html",
          "publisherType": "regulator",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "openai-cyber-capabilities-pacing-2026-08-18",
          "label": "OpenAI — Pacing model development in an era of cyber-critical capabilities",
          "url": "https://openai.com/index/pacing-model-development-cyber-capabilities/",
          "publisherType": "vendor",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "openai-private-safety-processing-2026-08-19",
          "label": "OpenAI — Offering Zero Data Retention for frontier models",
          "url": "https://openai.com/index/offering-zero-data-retention-for-frontier-models/",
          "publisherType": "vendor",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "thomson-reuters-model-2026-08-24",
          "label": "Thomson Reuters — Launch of Thomson",
          "url": "https://www.thomsonreuters.com/en/press-releases/2026/august/thomson-reuters-leverages-its-world-class-data-assets-to-launch-its-own-frontier-model",
          "publisherType": "vendor",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "singapore-agentsea-2026-08-24",
          "label": "Singapore Ministry of Health — HIMSS26 APAC speech",
          "url": "https://www.moh.gov.sg/newsroom/speech-by-mr-tan-kiat-how--senior-minister-of-state--ministry-of-digital-development-and-information---ministry-of-health--at-himss26-apac-health-conference-and-exhibition--24-august-2026/",
          "publisherType": "regulator",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        }
      ],
      "aidb_credit": null,
      "themes": [
        "weekly synthesis",
        "women and AI",
        "workplace opportunity"
      ],
      "concepts": [
        "participation gap",
        "workflow ownership",
        "permissions"
      ],
      "tags": [
        "Weekly",
        "women",
        "workplace AI"
      ],
      "saint_lane": "Paige · Rank the consequence",
      "badge": "THE WEEKLY · WEDNESDAY TO WEDNESDAY"
    },
    {
      "id": "big-picture-data-centre-deal-2026-08-24",
      "slug": "big-picture-data-centre-deal-2026-08-24",
      "edition": "big-picture",
      "status": "published",
      "publishedAt": "2026-08-24T17:00:00Z",
      "updatedAt": "2026-08-24T17:00:00Z",
      "lastCheckedAt": "2026-08-24T17:00:00Z",
      "sourceApproval": {
        "status": "approved",
        "record": "newsstand:source-approval:big-picture-data-centre-deal-2026-08-24"
      },
      "correction": null,
      "correctionHistory": [],
      "retraction": null,
      "predecessorStoryIds": [],
      "successorStoryIds": [],
      "relationshipType": null,
      "bigPicture": {
        "originallyPublishedAt": "2026-08-24T17:00:00Z",
        "lastMeaningfullyUpdatedAt": "2026-08-24T17:00:00Z",
        "sourcesLastCheckedAt": "2026-08-24T17:00:00Z",
        "changeLog": [
          {
            "date": "2026-08-24",
            "note": "Initial candidate analysis of the public bargain around data-centre development."
          }
        ],
        "previousVersions": []
      },
      "thread": "data-centre-public-bargain",
      "thread_subtitle": "Who receives the benefits of compute, who carries the local burden and what makes the bargain enforceable.",
      "thread_entry": "Current Big Picture analysis",
      "headline": "The data-centre argument is really about the deal.",
      "the_story": "AI feels weightless when it appears as a sentence on a screen. The infrastructure behind it is not. A data centre needs land, a grid connection, cooling, equipment, roads, permits and people. Its services can benefit users far beyond the host community, while electricity, water, noise, infrastructure and land effects are concentrated where the facility is built. The cleanest evidence does not support either easy slogan: it does not show that every data centre will raise everyone’s utility bill or drain a community’s water, and it does not show that every project pays for itself through jobs, taxes and innovation. Outcomes depend on the project’s load, tariff, cooling system, water source, infrastructure financing, incentives, monitoring and enforceable conditions.",
      "laidies_read": "The International Energy Agency reported that global data-centre electricity use rose 17% in 2025 and projects total use will double by 2030 while AI-focused use triples. Those are global projections, not local forecasts. The IEA also says power used per AI task is falling, showing how efficiency per task and total demand can move in opposite directions. A state that refuses data centres may still use compute hosted elsewhere, while another community supplies the land, water and power. That does not mean any community owes the industry a permit. It means a serious decision must account for where both benefits and burdens travel.",
      "what_this_means": "The useful question is: what is this project asking the public to supply, who pays for new capacity, what benefits are guaranteed, who can inspect the numbers, and what remedy exists if the forecast is wrong? FERC is examining tariff and connection rules for large loads. Pennsylvania now conditions environmental review on binding GRID commitments and local approval, removes data-centre proposals from its Fast Track program, and prohibits nondisclosure agreements. St. Louis attached cooling, water-rate, efficiency, workforce and enforcement conditions to one permit. These actions do not prove a fair outcome; they show how the proposed bargain can become visible and enforceable.",
      "cocktail_party": "“The data-centre debate is not a referendum on whether AI is good or bad. It is a negotiation over who supplies the land, water and power—and what the host community is guaranteed in return.”",
      "watch_fors": [
        "Measured project-level electricity, water, jobs and ratepayer outcomes rather than forecasts alone.",
        "Whether tariff, disclosure, community-benefit and enforcement conditions work in practice."
      ],
      "closing_note": "Stopping every project would not make demand for compute disappear. Approving every project on a promise would not make local costs fair. The practical middle is a visible, measurable and enforceable deal that a community has enough information and authority to accept or refuse.",
      "class_notes": "AI Fundamentals connections: compute infrastructure, externalities, governance, efficiency and decision rights. Update this Big Picture when major demand forecasts, tariffs, permit rules or measured project outcomes change.",
      "sources": [
        {
          "id": "iea-data-centre-electricity-2026-04-16",
          "label": "IEA — Data centre electricity use surged in 2025",
          "url": "https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions",
          "publisherType": "primary-document",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "ferc-large-load-action-2026-06-18",
          "label": "FERC — Large-load integration action",
          "url": "https://www.ferc.gov/news-events/news/ferc-launches-aggressive-targeted-action-speed-large-load-integration",
          "publisherType": "regulator",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "pennsylvania-grid-standards-2026-05-27",
          "label": "Pennsylvania — GRID standards",
          "url": "https://www.pa.gov/governor/newsroom/2026-press-releases/gov-shapiro-releases-full-grid-standards-to-protect-pennsylvania",
          "publisherType": "regulator",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "pennsylvania-data-centre-order-2026-08-18",
          "label": "Pennsylvania — Executive Order 2026-05 announcement",
          "url": "https://www.pa.gov/governor/newsroom/2026-press-releases/governor-shapiro-signs-executive-order-on-data-center-developmen",
          "publisherType": "regulator",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "st-louis-armory-permit-2026-04-21",
          "label": "City of St. Louis — Armory data-centre permit conditions",
          "url": "https://www.stlouis-mo.gov/government/departments/mayor/news/data-center-permit-approved.cfm",
          "publisherType": "regulator",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        }
      ],
      "aidb_credit": "AIDB’s agency-and-control frame was treated as attributed interpretation only; the factual analysis is bound to independently checked primary records.",
      "themes": [
        "data centres",
        "community agency",
        "public infrastructure"
      ],
      "concepts": [
        "compute infrastructure",
        "externalities",
        "efficiency",
        "decision rights"
      ],
      "tags": [
        "data centres",
        "infrastructure",
        "energy",
        "water",
        "community benefits",
        "governance"
      ],
      "saint_lane": "Elle Woods · Read the whole deal",
      "badge": "THE BIG PICTURE · AUGUST 24, 2026"
    },
    {
      "id": "chatgpt-health-permission-screen",
      "slug": "chatgpt-health-permission-screen",
      "edition": "breaking",
      "status": "hold",
      "publishedAt": "2026-07-24T16:00:00Z",
      "updatedAt": "2026-07-25T19:30:00Z",
      "lastCheckedAt": "2026-07-25T19:30:00Z",
      "sourceApproval": {
        "status": "independent-review-required",
        "record": "newsstand:source-approval:chatgpt-health-permission-screen"
      },
      "correction": null,
      "correctionHistory": [],
      "retraction": null,
      "predecessorStoryIds": [],
      "successorStoryIds": [],
      "relationshipType": null,
      "bigPicture": null,
      "thread": null,
      "thread_subtitle": null,
      "thread_entry": null,
      "headline": "ChatGPT can now read your health record. The permission screen is the whole story.",
      "the_story": "OpenAI announced <strong>Health in ChatGPT</strong> on July 23. It is beginning to roll out to logged-in U.S. users aged 18 and older on web and iOS across Free, Go, Plus and Pro plans. You can choose to connect Apple Health and supported medical records so ChatGPT can use that information when answering relevant questions. OpenAI says connected Health data and conversations that use it are not used to train its foundation models or target ads. By default, ChatGPT asks before using connected Health information, but you can change that to “always allow.” Disconnecting a source starts deletion of its synced data from OpenAI’s systems within 30 days; information already placed in conversation history remains until you delete those conversations. OpenAI’s help centre says this consumer Health product is not intended for clinical or covered-entity use and does not offer a Business Associate Agreement. This is a vendor product announcement, not independent clinical validation, and OpenAI explicitly says ChatGPT can still make mistakes and does not replace qualified medical care.",
      "laidies_read": "This is less “magic medical oracle” and more Cher’s digital closet after somebody added a locked drawer marked <em>private</em>. More context may make an answer more relevant, but the important questions are who has the key, when the drawer opens, what is remembered after it closes and which privacy rules actually apply. U.S. health-app data does not automatically receive the same HIPAA protection as a record held by a covered doctor, hospital or insurer. HHS says information sent at a person’s direction to an app that is not a covered entity or business associate may no longer be protected by the HIPAA Rules; the FTC separately regulates certain consumer health apps and breach notifications.",
      "what_this_means": "Before connecting anything, read four settings like they are the care instructions on the one dress you cannot replace: <strong>what is connected, whether access is once or always, what can become memory, and what remains in chat history after disconnection.</strong> Also read the product’s privacy terms instead of treating “health data” as a promise that HIPAA applies. The useful lane is preparation: summarize a timeline, translate unfamiliar language, notice questions you want to take to an appointment. For a diagnosis, treatment decision, medication change or urgent symptom, go back to the original record and a qualified professional. Personalization can make an answer more relevant; it does not make the model infallible.",
      "cocktail_party": "“ChatGPT can now connect to Apple Health and some medical records. The important bit is that connected data, memory and conversation history have different controls—and consumer health apps are not automatically covered by HIPAA. More context may improve relevance, but it still is not a doctor and you still check the original record.”",
      "watch_fors": null,
      "closing_note": null,
      "class_notes": "Use <a href=\"/content/library-books/rendered/accounts-101.html\"><strong>Accounts 101</strong></a> for the privacy basics, then revisit <a href=\"/issues/issue-03.html\"><strong>Episode 3 — The Burn Book Problem</strong></a> before trusting a confident health summary.",
      "sources": [
        {
          "id": "openai-health-launch-2026-07-23",
          "label": "OpenAI — Launching Health in ChatGPT (July 23, 2026)",
          "url": "https://openai.com/index/health-in-chatgpt/",
          "publisherType": "vendor",
          "accessedAt": "2026-07-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "openai-health-help-2026-07-25",
          "label": "OpenAI Help — Health access, controls and HIPAA eligibility",
          "url": "https://help.openai.com/en/articles/20001036-health-in-chatgpt",
          "publisherType": "vendor",
          "accessedAt": "2026-07-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "hhs-health-apps-api-2025-05-30",
          "label": "U.S. HHS — The access right, health apps and APIs",
          "url": "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/access-right-health-apps-apis/index.html",
          "publisherType": "regulator",
          "accessedAt": "2026-07-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "ftc-health-breach-rule-2024",
          "label": "U.S. FTC — Health Breach Notification Rule for health apps",
          "url": "https://www.ftc.gov/business-guidance/resources/complying-ftcs-health-breach-notification-rule-0",
          "publisherType": "regulator",
          "accessedAt": "2026-07-25",
          "approvalStatus": "reviewed"
        }
      ],
      "aidb_credit": null,
      "themes": [
        "health data",
        "privacy and permissions"
      ],
      "concepts": [
        "context",
        "memory",
        "permissions",
        "human review"
      ],
      "tags": [
        "privacy",
        "health",
        "ChatGPT",
        "verification",
        "permissions"
      ],
      "saint_lane": "Elle Woods · Read the fine print",
      "badge": "COMING SOON · THE BREAKING"
    },
    {
      "id": "eu-ai-act-transparency-starts",
      "slug": "eu-ai-act-transparency-starts",
      "edition": "daily",
      "status": "published",
      "publishedAt": "2026-08-03T22:00:00Z",
      "updatedAt": "2026-08-03T22:00:00Z",
      "lastCheckedAt": "2026-08-03T22:00:00Z",
      "sourceApproval": {
        "status": "approved",
        "record": "newsstand:source-approval:eu-ai-act-transparency-starts"
      },
      "correction": null,
      "correctionHistory": [],
      "retraction": null,
      "predecessorStoryIds": [],
      "successorStoryIds": [],
      "relationshipType": null,
      "bigPicture": null,
      "thread": null,
      "thread_subtitle": null,
      "thread_entry": null,
      "headline": "Europe’s AI transparency rules started August 2. Here’s when you should expect a label.",
      "the_story": "Article 50 of the European Union’s AI Act began applying on August 2, 2026. The European Commission’s guidance says providers of certain AI systems must make people aware when they are interacting directly with AI and must add machine-readable marks to certain AI-generated or manipulated outputs. Professional deployers have separate disclosure duties for emotion-recognition and biometric-categorisation systems, deepfakes, and AI-generated or manipulated text published to inform the public on matters of public interest when it has not received human review or editorial control. The Commission also describes a limited transition to December 2, 2026 for the marking-and-detection obligation for certain systems already on the market before August 2. The exact duty depends on the system, actor, use and exception; this is a practical orientation, not legal advice.",
      "laidies_read": "Think of the rule as caller ID for particular AI encounters—not a lie detector for everything on the screen. In covered situations, the person or system behind the interaction may need to tell you that AI is involved, and some generated media needs a machine-readable origin signal. That disclosure helps you ask the next question. It does not prove that the output is accurate, fair, safe or lawful.",
      "what_this_means": "If you are in the EU, expect clearer disclosure in the covered situations: direct AI interaction, certain generated or manipulated media, deepfakes, emotion recognition, biometric categorisation and some public-interest text without human editorial control. If you publish or deploy AI professionally, do not turn this article into a compliance checklist; use the Commission’s current guidance and qualified advice for your exact role and system. As a reader, treat a label as useful origin context. Still check the claim, source and date separately—and do not assume that an unlabelled item is human-made or compliant.",
      "cocktail_party": "“Europe’s Article 50 transparency rules started on August 2. In covered situations, people should be told when they are interacting with AI or seeing certain AI-generated or manipulated content. The label is useful caller ID, not proof that the content is true.”",
      "watch_fors": null,
      "closing_note": null,
      "class_notes": "The current <a href=\"#label-is-not-a-truth-detector\"><strong>Big Picture</strong></a> explains the durable rule: provenance and labelling can help establish origin; the underlying claim still needs evidence.",
      "sources": [
        {
          "id": "ec-article-50-guidelines-2026-07-20",
          "label": "European Commission — Guidelines on Article 50 transparency obligations (July 20, 2026)",
          "url": "https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems",
          "publisherType": "regulator",
          "accessedAt": "2026-08-03",
          "approvalStatus": "reviewed"
        },
        {
          "id": "ec-article-50-quick-facts-2026-07-20",
          "label": "European Commission — Quick facts: transparency rules for AI systems",
          "url": "https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems",
          "publisherType": "regulator",
          "accessedAt": "2026-08-03",
          "approvalStatus": "reviewed"
        },
        {
          "id": "eurlex-ai-act-2024-1689",
          "label": "EUR-Lex — Regulation (EU) 2024/1689, Articles 50 and 113",
          "url": "https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=en",
          "publisherType": "primary-document",
          "accessedAt": "2026-08-03",
          "approvalStatus": "reviewed"
        },
        {
          "id": "eurlex-ai-act-amendment-2026-1744",
          "label": "EUR-Lex — Regulation (EU) 2026/1744, Article 111(4) and recital 38",
          "url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R1744",
          "publisherType": "primary-document",
          "accessedAt": "2026-08-03",
          "approvalStatus": "reviewed"
        }
      ],
      "aidb_credit": null,
      "themes": [
        "AI transparency",
        "trust and evidence"
      ],
      "concepts": [
        "provenance",
        "disclosure",
        "evidence"
      ],
      "tags": [
        "AI Act",
        "transparency",
        "labels",
        "deepfakes",
        "European Union"
      ],
      "saint_lane": "Elle Woods · Read the label and the fine print",
      "badge": "AT THE LEGAL DESK · THE DAILY"
    },
    {
      "id": "label-is-not-a-truth-detector",
      "slug": "label-is-not-a-truth-detector",
      "edition": "daily",
      "status": "published",
      "publishedAt": "2026-07-24T16:00:00Z",
      "updatedAt": "2026-07-25T19:30:00Z",
      "lastCheckedAt": "2026-07-25T19:30:00Z",
      "sourceApproval": {
        "status": "approved",
        "record": "newsstand:source-approval:label-is-not-a-truth-detector"
      },
      "correction": null,
      "correctionHistory": [],
      "retraction": null,
      "predecessorStoryIds": [],
      "successorStoryIds": [],
      "relationshipType": null,
      "bigPicture": null,
      "thread": "The Label Maker",
      "thread_subtitle": "provenance can show where content came from; it cannot decide whether the claim is true",
      "thread_entry": 1,
      "headline": "The label can tell you it was made with AI. It cannot tell you it is true.",
      "the_story": "Google said on July 24 that it is signing the EU AI Act Code of Practice on Transparency of AI-Generated Content. Google connected that commitment to its work on the C2PA provenance standard and SynthID watermarking. The European Commission describes the code as a voluntary way for providers and deployers to help demonstrate compliance with AI Act transparency obligations that begin applying on August 2, 2026. The Commission also says adherence is <em>not</em> conclusive evidence of compliance. Those are two different layers: a company’s announcement about the tools it supports, and the regulator’s description of what signing the code does and does not prove.",
      "laidies_read": "Think of the liner notes inside a CD. They can tell you who produced the track, who sang backup and where it was recorded. That is useful provenance. They cannot tell you whether the singer’s story actually happened. An AI label works the same way: it can help show that a file was generated or edited with a particular system. It does not fact-check the sentence, prove the picture’s caption or turn a polished claim into evidence.",
      "what_this_means": "Treat provenance as one receipt, not the whole investigation. If a label or content credential is present, use it to understand origin and editing history. Then separately check the claim against a named source, date and original context. If the label is missing, do not assume the content is human-made; marks and metadata can be absent, stripped or unsupported. If the label is present, do not assume the content is deceptive—or accurate. <strong>How it was made and whether it is true are different questions.</strong>",
      "cocktail_party": "“Google just signed Europe’s voluntary AI-content transparency code. The useful bit is provenance: a watermark or content credential can act like CD liner notes and show how something was made. It still cannot tell you whether the lyric—or the claim—is true.”",
      "watch_fors": [
        "<strong>Does the mark survive the trip?</strong> A provenance system is only useful if platforms preserve and display it after content is resized, reposted or exported.",
        "<strong>What happens to text?</strong> Images and audio have established watermarking approaches; reliable, interoperable marking of generated text remains a harder problem.",
        "<strong>Can ordinary people understand the label?</strong> Machine-readable provenance helps systems exchange information, but the public still needs a clear explanation of what the signal proves—and what it does not."
      ],
      "closing_note": "Transparency is a valuable layer. It is not a truth layer. LAiDIES will keep asking both questions: <em>where did this come from?</em> and <em>what evidence supports it?</em>",
      "class_notes": "This is the retrieval rule from <a href=\"/issues/issue-03.html\"><strong>Episode 3 — The Burn Book Problem</strong></a>: a receipt can establish origin, while the claim still needs evidence.",
      "sources": [
        {
          "id": "google-eu-ai-transparency-code-2026-07-24",
          "label": "Google — Signing the EU AI Act transparency code (July 24, 2026)",
          "url": "https://blog.google/company-news/outreach-and-initiatives/public-policy/eu-ai-act-transparency-code-of-practice/",
          "publisherType": "vendor",
          "accessedAt": "2026-07-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "ec-transparency-code-opinion-2026-07-09",
          "label": "European Commission — assessment of the transparency code (July 9, 2026)",
          "url": "https://digital-strategy.ec.europa.eu/en/library/commission-opinion-assessment-code-practice-transparency-ai-generated-content",
          "publisherType": "regulator",
          "accessedAt": "2026-07-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "ec-transparency-code-faq-2026",
          "label": "European Commission — signing and Article 50 timing",
          "url": "https://digital-strategy.ec.europa.eu/en/faqs/signing-code-practice-transparency-ai-generated-content",
          "publisherType": "regulator",
          "accessedAt": "2026-07-25",
          "approvalStatus": "reviewed"
        }
      ],
      "aidb_credit": null,
      "themes": [
        "trust and evidence",
        "AI transparency"
      ],
      "concepts": [
        "provenance",
        "watermarking",
        "verification"
      ],
      "tags": [
        "provenance",
        "watermarking",
        "verification",
        "AI Act",
        "Google",
        "SynthID"
      ],
      "saint_lane": "Elle Woods · Receipts",
      "badge": "THE BIG PICTURE · THE LABEL MAKER · ENTRY 1"
    }
  ]
};

/* Compatibility for old private inspection scripts only. Public code uses NEWSSTAND_DATA. */
window.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;
