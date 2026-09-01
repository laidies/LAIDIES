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
  "generatedAt": "2026-09-01T15:18:23Z",
  "lastCheckedAt": "2026-09-01T15:18:23Z",
  "publications": {
    "breaking": {
      "edition": "breaking",
      "job": "News as it happens, when waiting would leave readers behind.",
      "status": "quiet",
      "publishedAt": null,
      "updatedAt": "2026-08-30T15:22:32Z",
      "lastCheckedAt": "2026-08-30T15:22:32Z",
      "maxAgeHours": 24,
      "note": "No breaking story."
    },
    "daily": {
      "edition": "daily",
      "editionDate": "2026-08-31",
      "editorialTimeZone": "America/Vancouver",
      "issue": {
        "status": "complete",
        "disposition": "service_ready",
        "frontPaigeStoryId": "front-paige-accountable-systems-2026-08-24",
        "weeklyStoryId": "weekly-accountable-systems-2026-08-24",
        "storyIds": [
          "chatgpt-ad-expansion-2026-08-31",
          "cursor-openai-access-2026-08-28",
          "anthropic-automated-alignment-2026-08-28"
        ],
        "serviceRecordIds": [
          "DAILY-2026-08-30-PAIGE-TIP-PAIGE-01-FOLLOW-UP",
          "DAILY-2026-08-30-CAREER-DELEGATION",
          "DAILY-2026-08-30-CONCEPT-WEEK-CONCEPT-01-CONTEXT",
          "DAILY-2026-08-30-MME-MINI-BACKPACK",
          "DAILY-2026-08-30-DEAR-MISS-JEEVES-JEEVES-01-TIME",
          "DAILY-2026-08-30-WHATS-NEW-SUNNYVAILE-TOWN-02-DATA-CENTRES",
          "DAILY-2026-08-30-DID-YOU-KNOW-TOWN-01-LIBRARY"
        ],
        "envelopeSha256": "f506b40220b746ec152751e46714bcd3c5070f89ae1323266801c830327e1c5a"
      },
      "job": "A clear explanation of what changed and why it matters.",
      "status": "current",
      "publishedAt": "2026-09-01T00:13:05.767Z",
      "updatedAt": "2026-09-01T15:18:23Z",
      "lastCheckedAt": "2026-09-01T15:18:23Z",
      "maxAgeHours": 36,
      "note": "The Daily for 2026-08-31."
    },
    "weekly": {
      "edition": "weekly",
      "editionDate": "2026-08-26",
      "storyId": "weekly-accountable-systems-2026-08-24",
      "editorialTimeZone": "America/Vancouver",
      "job": "The week’s bigger picture, connecting the stories without repeating every headline.",
      "status": "current",
      "publishedAt": "2026-08-26T16:00:00Z",
      "updatedAt": "2026-09-01T15:18:23Z",
      "lastCheckedAt": "2026-09-01T15:18:23Z",
      "maxAgeHours": 192,
      "note": "The August 19–26 roundup remains on the page until the next Wednesday edition is ready."
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
      "headline": "Women helped build AI. Will they shape its future at work?",
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
        "src": "/assets/newsstand/design-20260830/front-paige-women-computing.png",
        "alt": "Illustration of women working across generations of computing, from handwritten calculations and punch cards to modern AI.",
        "credit": "LAiDIES"
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
      "status": "published",
      "publishedAt": "2026-08-26T16:00:00Z",
      "updatedAt": "2026-09-01T15:18:23Z",
      "lastCheckedAt": "2026-09-01T15:18:23Z",
      "sourceApproval": {
        "status": "approved",
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
      "headline": "The AI stories worth carrying into this week.",
      "heroVisual": {
        "src": "/assets/newsstand/design-20260830/front-paige-women-computing.png",
        "alt": "Women working across generations of computing, from handwritten calculations and punch cards to modern AI.",
        "credit": "LAiDIES"
      },
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
      "updatedAt": "2026-08-29T17:00:00Z",
      "lastCheckedAt": "2026-08-29T17:00:00Z",
      "sourceApproval": {
        "status": "approved",
        "record": "newsstand:source-approval:data-centre-deal-preview"
      },
      "correction": null,
      "correctionHistory": [],
      "retraction": null,
      "predecessorStoryIds": [],
      "successorStoryIds": [],
      "relationshipType": null,
      "bigPicture": {
        "originallyPublishedAt": "2026-08-24",
        "lastMeaningfullyUpdatedAt": "2026-08-29",
        "sourcesLastCheckedAt": "2026-08-29",
        "changeLog": [
          {
            "changedAt": "2026-08-24",
            "summary": "Initial analysis of the public bargain around data-centre development."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Replaced the rejected draft. The new article tests the claims driving the backlash, adds the corrected 1,000-fold water example, removes unsupported language about water and proximity, and distinguishes local facts from national fears and political interpretation."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Replaced the generic final line with Ali’s approved Star Trek–Skynet contrast, explicitly framed as a possibility rather than a forecast and ordered so the social explanation belongs unmistakably to Star Trek."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Added Ali’s requested case for AI-enabled scientific and medical discovery, with an explicit boundary against promising a cure or breakthrough."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Replaced the fragment opening the generative-AI section with a complete transition that distinguishes the building’s continuing purpose from the changes in equipment, power density and scale."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Connected the cloud-walls image directly to protest graffiti and removed the explanatory sentence that interrupted and misread the joke."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Replaced the opaque corporate-promise comparison with a project-by-project decision test that includes both local burdens and enforceable community benefits."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Restored the five-part structure of Ali’s returned draft: a dedicated data-centre explanation, trust, distortion of environmental and economic claims, the consequences of saying no, and paths forward."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Retitled the article, added reader-facing subheadings throughout, made NDAs and transparency a central argument, rebuilt the forward path, and simplified the AIDB attribution to an article-inspiration credit."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Corrected the causal account of the backlash using named AI-industry warnings, added the missing benefits-communication problem, separated observed job effects from layoff claims, and restored labour’s jobs-and-conditions argument."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Added the approved adult graphic-novel illustration to the article and corrected the graffiti placement so it remains visible at desktop and mobile sizes."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Rebuilt the graffiti edit from the clean original to remove the hidden remnant, restore the complete GET LOST lettering and isolate the larger spray-painted mark on the left wall."
          },
          {
            "changedAt": "2026-08-25",
            "summary": "Revised the protest crowd to represent the backlash as racially, generationally and socially broad rather than assigning it to one demographic or subculture."
          },
          {
            "changedAt": "2026-08-29",
            "summary": "Rebuilt the analysis from Ali’s Claude-edited manuscript, preserving its stronger thesis, short version, fact-check sequence and better-bargain conclusion while removing or narrowing claims that outran the reviewed evidence."
          },
          {
            "changedAt": "2026-08-29",
            "summary": "Moved the short version behind a collapsed ‘The Article in 30 Seconds’ disclosure so the article opens with its argument, and restored Ali’s exact graffiti sentence."
          }
        ],
        "previousVersions": []
      },
      "thread": "data-centre-public-bargain",
      "thread_subtitle": "Data centres are not new. What changed was AI: bigger facilities, lower trust and a flood of alarming claims that are hard to compare.",
      "thread_entry": "Current Big Picture analysis",
      "headline": "Why data centres became a public villain—and what a better bargain would look like",
      "front_summary": "Until very recently, most people had no reason to think about data centres. We called their work ‘the cloud,’ which made the whole arrangement sound pleasantly weightless. Then the generative-AI boom arrived, and the cloud acquired walls. The question is not whether every project is good or bad, but what the public can verify and require in return.",
      "front_read": "Which fears survive checking—and what should a community require before saying yes?",
      "front_examination": [
        "A frightening number can be accurate, wrong by a factor of 1,000 or simply meaningless without its denominator. Those are not minor differences.",
        "The useful question is not whether data centres are good or bad. It is whether a particular project works for the place being asked to host it."
      ],
      "heroVisual": {
        "src": "/assets/newsstand/big-picture-data-centre-backlash-hero-v4.png",
        "alt": "A racially and generationally diverse crowd of protesters outside a graffiti-covered data centre, including signs demanding progress but never wanting it.",
        "credit": "LAiDIES · The Big Picture"
      },
      "quick_read_label": "The Article in 30 Seconds",
      "quick_read": "<p>Data centres have been around for decades. What is new is the intensity of the opposition. Three surveys published in 2026 put local opposition between 61 and 75 percent, and the two with earlier comparison points found it rising. In Gallup's polling, opposition to a local AI data centre reached 71 percent—above the highest opposition Gallup has recorded for a nuclear plant in its 25-year trend.</p><p>When the same voters were shown the same proposed building, opposition was nine points lower when it was described as serving streaming and search rather than AI. The AI label clearly changed the response.</p><p>Several frightening claims do not survive checking. The \"1,000 times the town's water\" figure came from a units error and was corrected. Noise complaints appear at a minority of Virginia's operating sites, not all of them. Household bills can rise as a power system expands, but whether a particular project shifts its connection costs to households depends on the rules and contract.</p><p>Other concerns are concrete. Federal regulators report that the average data centre entering service grew from about 25 megawatts in 2020 to almost 80 megawatts in 2025. Companies have also announced large clean-energy investments, including nuclear projects expected between 2027 and the mid-2030s. Demand growth is already under way, so the source of the power used before those projects arrive matters.</p><p>The conflict is also about who decides. Communities are often handed a choice between a company's promises and an opponent's worst case after the important terms have already been negotiated, sometimes under non-disclosure agreements they never saw.</p><p>Instead of asking \"data centres: yes or no?\", ask what this project would do in this place, what it would cost and which terms the public can enforce. Those terms are often the least visible part of the proposal.</p>",
      "examination_intro": "",
      "examination_sections": [
        {
          "title": "Why does everyone suddenly think data centres are bad?",
          "body": "<p>Until very recently, most people had no reason to think about data centres. We called their work 'the cloud,' which made the whole arrangement sound pleasantly weightless. Photos disappeared into it. Bank records lived there. So did hospital systems, government services, streaming libraries and almost every other part of modern life that depends on the internet.</p><p>Then the generative-AI boom arrived, and the cloud acquired walls.</p><p>Suddenly, everyone seemed eager to cover those walls in protest graffiti: warnings, obscenities and, inevitably, the timeless doodle that transcends cultures, languages and centuries—the phallus.</p><p>Data centres have existed for decades. Yet in 2026 they have become an election issue, a neighbourhood fight and, in some corners of the internet, proof that AI is coming for the taps, the power grid, the family home and civilization itself.</p><p>The backlash is carrying several arguments at once: distrust of Big Tech, fear about jobs and safety, anger over secret negotiations, and alarming claims about water and electricity that often travel farther than their corrections.</p><p>There is also a practical problem. Communities are often asked to judge a project after its most important terms have already been negotiated. They hear the company's promises and the opponent's worst-case scenario, but may not be allowed to read the agreement their own government signed.</p><p>We need to separate two questions. What would this project actually cost and provide? And if the trade-off looks worthwhile, what should the company have to disclose, pay for and guarantee before anyone approves it? The debate usually stops at the first question. The second is where a community can negotiate rather than simply react.</p>"
        },
        {
          "title": "What changed when AI arrived?",
          "body": "<p>First, what does a data centre actually do?</p><p>The short answer is almost everything we do online. Data centres hold rows of computers that store information, run software and move data across networks. Your email, payroll system, video call, bank transaction and online grocery order all have to be processed on a machine somewhere. \"The cloud\" is a convenient name for using computers you do not own and cannot see. Those computers still need a building, electricity, cooling and a connection to the outside world.</p><p>Generative AI did not invent any of this. An \"AI data centre\" is not a fundamentally different kind of building. It can host AI training, the months-long process of building the model in the first place. Or inference, the industry's word for the everyday work of answering your questions. Or ordinary cloud services. Or all three at once.</p><p>What happens inside the facility affects how much power and cooling it needs. A major training run can concentrate very high demand over weeks or months. Inference—the everyday work of producing answers—creates ongoing demand that rises and falls with use. Many facilities do both, alongside ordinary cloud work. The mix affects the power profile, cooling needs and how much work could be rescheduled or reduced when the grid is strained, so a community needs the actual workload and operating plan rather than the label \"AI data centre.\"</p><p>Large training systems use dense clusters of specialised chips connected at high speed. Keeping those chips close together reduces communication delays, but it also concentrates electricity use and heat. At high densities, facilities may need liquid cooling or other equipment beyond conventional air cooling, plus a much larger grid connection.</p><p>That helps explain the local concern: newer facilities can be much larger and ask far more of the power system around them.</p><h4>Why does the AI label change the reaction?</h4><p>In June, a poll for Puck described the same facility to the same group of 1,012 likely voters in two different ways. Told it was a data centre built to power artificial intelligence, 62 percent opposed it and 27 percent supported it. Told it was a data centre built to power digital services such as searches and video streaming, opposition fell to 53 percent and support rose to 35 percent.</p><p>Nothing changed but what the building was said to be for. Opposition was nine points lower and support eight points higher when the description emphasized searches and streaming rather than AI. That is a meaningful difference within one sample, though it does not tell us which beliefs about AI produced it.</p><p>The poll does not make the building irrelevant. It shows that the same building becomes less acceptable when voters associate it with AI.</p><p>The broader polling confirms the scale of the problem without explaining it. Gallup, in a March survey published in May, found 71 percent of Americans opposed an AI data centre in their area, including 48 percent strongly opposed. The University of Pennsylvania's Annenberg Public Policy Center found opposition to a local data centre rising from 49 percent in February and March to 61 percent in June and July. An August Heatmap Pro poll conducted by Embold Research found 75 percent of registered voters opposed one near their home, up from 42 percent a year earlier.</p><p>Gallup asked the same people about nuclear plants, which is a useful yardstick. Fifty-three percent oppose a reactor in their area, and in the quarter century Gallup has been asking, that figure has never gone above 63 percent. Data centres are at 71. Within Gallup's own wording and trend, opposition to the local AI data-centre question was higher than opposition to a local nuclear plant has ever been.</p><p>The figures are not interchangeable, since the questions, samples and timing all differ and Gallup had never asked its question before. But both surveys that repeated themselves found opposition climbing steeply.</p><p>Gallup also asked opponents why. About half mentioned excessive use of resources, with water and energy each named by 18 percent. Roughly a sixth mentioned pollution including noise, about a fifth mentioned quality-of-life impacts, and a similar share cited economic consequences such as higher utility bills. People are not objecting for one reason. They are worried about resources, noise, household costs and quality of life.</p><h4>What makes one project a local issue?</h4><p>The first is size. Federal regulators reported that the average data centre entering service grew from about 25 megawatts in 2020 to almost 80 megawatts in 2025. FERC generally describes demand above 20 megawatts as a large load. A new facility can therefore be one of the largest customers a local utility has ever connected, and some proposed campuses are larger still.</p><p>The second is distance. Virginia's 2024 legislative review examined eight localities containing 93 percent of the state's data centres and found that 29 percent of operating properties were within 200 feet of residentially zoned property, measured property line to property line. That does not mean a server building sits 200 feet from a front door. It does show that older zoning rules sometimes treated data centres as office-like uses, or placed industrial and residential land beside each other, before local governments understood the scale and constant noise some facilities could bring.</p><p>Anyone who spent the nineties building cities in SimCity already understands the planning problem. A city needs infrastructure and a tax base. It also needs rules about where industrial uses belong and what they owe their neighbours.</p><p>Size and location do not settle the decision, but they tell a community exactly what to examine in the site plan and utility agreement.</p><p>Scale makes the project local. The AI label brings a different set of fears into the room—fears the industry helped create.</p>"
        },
        {
          "title": "How did the building inherit every fear about AI?",
          "body": "<p>The developer does not walk into the meeting alone.</p><p>Big Tech arrives carrying fifteen years of baggage: personal data collected without meaningful consent, social platforms that rewarded outrage, local news hollowed out by advertising shifts, enormous market power and leaders who often appear to operate beyond ordinary consequences. A data centre is not a social-media feed. It is still being proposed by institutions many people already distrust.</p><p>Then the AI industry wrote the villain's dialogue itself.</p><p>These were not rumours invented by protesters. In 2025, Dario Amodei warned that AI could eliminate half of entry-level white-collar jobs and push unemployment to between 10 and 20 percent within one to five years. Two years before that, Amodei, Sam Altman and Demis Hassabis were among the signatories to a statement saying that reducing the risk of human extinction from AI should be treated as a global priority alongside pandemics and nuclear war.</p><p>The warnings were meant to force serious preparation. The public heard a simple message: more powerful AI could mean lost jobs or catastrophe. When the same industry then asks for a huge new building, people connect the two.</p><p>Y2K is a useful warning about warnings. The planes stayed up and the banks opened, partly because people had spent years fixing the problem. What many people remember is only that catastrophe was predicted and did not happen. AI companies risk the same outcome if they talk about disaster without explaining the safeguards or the benefits.</p><p>The industry did a much poorer job explaining what ordinary people might gain. \"Productivity\" sounds attractive in a boardroom. To a worker who has watched colleagues disappear, it can sound like more work for the same pay, or a more polished excuse for the next round of cuts. Scientific discovery, better public services, new businesses and more useful work make a far stronger case. But most of those gains are still possibilities, while the proposed building and its demands are immediate and visible from the highway.</p><h4>Did AI actually take the jobs?</h4><p>Not yet, and it matters here, because the fear is doing a lot of work in this debate that the evidence does not support.</p><p>A 2026 International Labour Organization review found large-scale displacement remained limited, alongside real but uneven productivity gains and emerging pressure on some entry-level opportunities. Stanford researchers likewise found no evidence of widespread economy-wide displacement, though they did identify a growing employment gap for younger workers in some highly exposed occupations. All of that is real and worth watching, and all of it is a long way from the sudden disappearance of work the loudest warnings forecast.</p><p>AI can also become a convenient explanation for layoffs whose causes are less flattering to management. Forrester uses the term \"AI washing\" for companies that blame job cuts on AI without evidence of comparable automation, obscuring explanations such as pandemic-era over-hiring, weaker demand, spending choices or an attempt to reassure investors. AI has displaced some work. But when a company blames a round of layoffs on AI, it should show what was actually automated instead of asking everyone to accept the explanation on faith.</p><p>The positions taken by the IBEW and AFL-CIO reflect that tension. The International Brotherhood of Electrical Workers opposed proposed New England moratoriums on the grounds that they would eliminate union job opportunities, and the AFL-CIO's 2026 resolution supports continued data-centre growth while demanding union labour, protection against shifting energy and water costs onto households, fair taxes, environmental standards, transparent agreements and community investment.</p><p>Their support is conditional. They want the construction work, but they are also demanding protections for households, workers and host communities.</p><h4>How did the backlash become politically useful?</h4><p>Public opinion and politics now feed each other.</p><p>As opposition rose, data centres became useful campaign material. A candidate could point at an unpopular proposal, accuse an opponent of siding with Big Tech and earn a headline. That coverage gave the issue more attention, which gave other candidates a reason to move before they became the next target.</p><p>The sequence is easy to see but hard to prove. News coverage did not invent worries about electricity, water or secrecy, and no poll can tell us whether a particular voter changed her mind after a particular headline.</p><p>Once opposition can win votes, improving a weak proposal is less useful to a candidate than condemning the whole category. The debate then shifts away from whether a particular proposal can be improved. Condemning the category becomes easier than negotiating a better project.</p><p>Those fears then arrive in a process already short on trust: many communities cannot see the terms they are being asked to accept.</p>"
        },
        {
          "title": "What happens when nobody can see the deal?",
          "body": "<p>Everyone is arguing about the terms. The trouble is that many of them are not allowed to see them.</p><p>Some local governments and developers have used non-disclosure agreements while negotiating data-centre projects. Microsoft announced in March that it would stop using broad NDAs with local governments and work to end existing ones, keeping narrow exceptions for genuine trade secrets. Residents should not have to guess which terms their own government agreed to on their behalf.</p><p>Microsoft's change still leaves a wider question for every developer and local government. A narrow trade secret may justify a limited redaction. The expected and maximum power demand, the water source, the cooling plan, the public incentives, the grid costs, the permanent jobs and the community obligations are not private details when a public body is being asked to approve a project or help pay for it.</p><p>Closed negotiations turn an engineering question into a trust question. If residents cannot see any of it, they are left to choose which storyteller they distrust least. The company says the project will be efficient and transformative. The opponents say it will empty the reservoir and double the electricity bill.</p><p>Nobody has shown the public the worksheet.</p><h4>Why do corrections fail?</h4><p>Gallup found in June that only 20 percent of Americans had a great deal or quite a lot of confidence in large technology companies, a new low in its series. Corrections, in other words, are arriving in a country that does not trust the messenger, and a company can publish an entirely accurate one only to discover that what the public hears is public relations.</p><p>The Puck poll shows what that does to a correction. Respondents were told that a widely repeated water claim had come from a mathematical error, and that the author had since fixed it. Twenty-seven percent found the explanation convincing. Fifty-two percent did not.</p><p>Set that against the industry's other arguments in the same poll. Claims about local tax revenue convinced 42 percent. Claims about high-paying jobs convinced 36 percent. The correction—the one claim known to be true—was the least persuasive thing anyone said.</p><p>The poll cannot explain why each respondent stayed sceptical. Another polished message is unlikely to repair this relationship.</p><p>Published agreements and measured results might. So which concerns hold up when we examine the evidence?</p>"
        },
        {
          "title": "Which concerns hold up—and which do not?",
          "body": "<p>\"Data centres are bad for the environment\" is not a finding. It is a bundle of separate claims about water, electricity, emissions, noise and land, and they do not all hold up the same way. The evidence does not give us one answer. Some popular claims are wrong. Some describe real problems at certain sites but not others. Other costs depend on who must reduce them or pay for them.</p><p>Each claim needs to be checked against the evidence for a particular type of facility and site. Then an approval can address the risks that remain.</p><p><strong>Before comparing water claims:</strong> check whether each figure is measured use, a modelled estimate or the maximum allowed under a permit. Check whether it is an average or a peak. For water, check whether it describes withdrawal or consumption. The first example shows why those labels matter.</p><h4>The 1,000-times water claim was wrong</h4><p>In the first edition of Karen Hao's <em>Empire of AI</em>, a proposed Google data centre in Cerrillos, Chile, was described as potentially using more than 1,000 times as much water as the town's residents. A reader, Andy Masley, checked the government table behind the comparison. Its figures appeared to be labelled in litres when they were actually cubic metres. Because one cubic metre contains 1,000 litres, the error made the residents' water use look 1,000 times smaller than it really was. Hao investigated, accepted the correction and changed the book.</p><p>The project may still have raised a legitimate local water question. But the comparison used to describe that question was wrong by a factor of 1,000. The project figure was also a permitted maximum for a facility that had not opened, not a meter reading from an operating building. Maximums matter because a water system has to plan for them, but they cannot honestly be presented as water already being consumed.</p><h4>So when is water a real concern?</h4><p>When the facts about a particular site show pressure on a particular supply. The useful questions are not \"how thirsty is AI?\" but: which cooling system will this facility use? What is its expected demand, and its maximum? Is the water withdrawn and returned, or consumed through evaporation? Is it drinking water, reclaimed water, surface water or groundwater? How much is available locally during the hottest, driest weeks of the year?</p><p>Cooling choices can create a water-and-electricity trade-off. Evaporative systems can reduce the electricity needed for cooling while consuming more water; air-cooled or closed-loop designs can reduce on-site water use while requiring more electricity in some conditions. The size of that trade-off depends on the facility and climate.</p><p>Neither cooling method is automatically better. The sensible choice depends on the local water supply, climate and power system. A promise such as \"water positive\" cannot be evaluated without the cooling design, the expected and peak power draw, and the local grid mix.</p><p>The agreement can specify the water source, set limits during drought, require public reporting of measured use and state what happens if the operator exceeds the limit. The power figures belong beside the water figures so the trade-off remains visible.</p><h4>The bottle-of-water-per-query problem</h4><p>You have almost certainly seen the viral version: every question you ask an AI drinks a bottle of water, so consider your conscience before asking it to write your out-of-office reply.</p><p>Per-query figures are usually modelled rather than measured, and they can vary enormously with the model, facility, cooling design, electricity source and local climate. A single number repeated by many outlets is not automatically corroborated if they all lead back to the same estimate.</p><p>This way of describing the issue puts the reader's conscience at the centre and the facility's design at the edge. Whether intended or not, that can distract from the decisions that determine most water use: cooling design, water source, drought rules and monitoring.</p><p>Guilt is a poor substitute for a permit condition.</p><h4>Will a data centre raise household electricity bills?</h4><p>It can, but it is not automatic and it is not one simple mechanism.</p><p>A large new connection can require generation, substations or transmission. Virginia's legislative auditors found that data centres were paying their allocated cost of service under the rates they examined. The same review warned that rapid demand growth could still raise system costs for everyone, and that customers could be left with stranded infrastructure if forecast demand never appears.</p><p>Paying today's allocated bill does not guarantee that other customers will avoid future system costs. Regulators decide how connection costs, new generation, transmission and the risk of a delayed or abandoned project are allocated. In June 2026, FERC ordered all six regional grid operators under its authority to justify or rewrite their rules for connecting large loads, including protections for existing customers.</p><p>The developer can be required to fund project-specific connections and upgrades, pay meaningful minimum charges, disclose duplicate applications and cover stranded costs if the project arrives late, uses less power than promised or never opens.</p><h4>Could a data centre make the grid less reliable?</h4><p>A very large new load can increase the challenge of keeping supply and demand balanced, especially during extreme peaks. Existing utility reviews, connection studies and reliability rules are intended to prevent a project from simply attaching where the system cannot serve it. Those processes reduce risk; they do not erase the need for new generation and transmission.</p><p>Some operators can agree to reduce or shift computing work when the grid is stressed. Google, for example, says it has incorporated one gigawatt of demand-response capacity into long-term U.S. energy contracts. That is a company-reported program, not proof that every facility is flexible.</p><p>The agreement should state whether the load is firm or can be curtailed, what happens during an emergency and what performance the operator has actually committed to. Without those terms, nobody should promise residents that the facility will always step aside first.</p><h4>Where is the power actually coming from?</h4><p>A data centre's climate impact depends heavily on what generates its electricity and whether that generation is new or simply diverted from somebody else. The place to look is the contracts, and the companies have been busy.</p><p>Microsoft signed a 20-year agreement with Constellation to support the restart of the 835-megawatt Crane Clean Energy Center, formerly Three Mile Island Unit 1. Constellation now expects the restart in 2027, and the Department of Energy closed a one-billion-dollar loan for the project in 2025.</p><p>Meta announced agreements with Vistra, TerraPower and Oklo covering up to 6.6 gigawatts of new and existing nuclear power by 2035. Amazon says its Talen arrangement provides access to up to 1.9 gigawatts from an existing Pennsylvania plant and that it is also investing in X-energy and exploring a project with Dominion. Google's announced agreements include up to 500 megawatts from Kairos reactors and more than 600 megawatts from the planned restart of Iowa's Duane Arnold plant.</p><p>These are more substantial than buying an unconnected certificate and declaring the problem solved. Long contracts and direct investment can keep existing plants open, restart retired plants or help new projects raise capital. They are still company announcements about projects with regulatory, construction and delivery risk—not measured outcomes.</p><p>For years, a common approach was to buy enough renewable power over twelve months to match annual consumption. That does not mean a facility drew carbon-free electricity in every hour. Some companies are now also pursuing firm power, hourly matching and demand response.</p><p>When a company promises clean power, check whether the matching is annual or hourly and whether the agreement adds generation rather than reallocating what already exists.</p><p>The dates are the problem. Constellation expects Crane in 2027. Google's Duane Arnold restart is targeted for 2029. Meta says the Oklo campus may begin in 2030 and TerraPower delivery could start in 2032. Demand growth is already under way.</p><p>Until new generation arrives, a grid-connected facility uses the regional mix available at each hour. Some proposed campuses also include dedicated gas generation; a July 2026 Department of Energy selection at the Savannah River Site, for example, pairs a proposed one-gigawatt data centre with roughly two gigawatts of on-site generation described as natural gas bridging to nuclear.</p><p>The clean-energy deals may be substantial, but the power used before they arrive belongs in the same public accounting.</p><p>If a project proposes its own generation, that equipment is part of the project and should be permitted and monitored with it. For clean-power claims, require the operator to state whether matching is annual or hourly and whether the agreement adds capacity.</p><h4>What has actually been documented near homes?</h4><p>Virginia's 2024 review found that data-centre noise is low-frequency, not loud enough to damage hearing and rarely loud enough to violate ordinary noise ordinances, but some residents report that its constancy affects their wellbeing. A large majority of the state's data centres had generated no complaints, owing to location or design.</p><p>Virginia found complaints at a minority of sites. That is enough to justify enforceable noise rules, but not enough to claim that every data centre creates the same problem. A sound you cannot stop noticing is not made acceptable by being quiet.</p><p>Virginia's auditors found that backup generators were used mainly for maintenance testing and occasional short outages. They accounted for less than four percent of Northern Virginia's nitrogen-oxide emissions and 0.1 percent or less of its carbon monoxide and particulates. Those figures describe backup equipment at grid-connected facilities. They do not describe a project that uses combustion as its primary on-site supply.</p><p>Fairfax County requires a data-centre building to sit at least 200 feet from an adjoining residential property line, with generators 300 feet away unless the building stands between them and the homes, plus noise studies before and after construction. Add measured limits, restricted testing hours and monitoring so the promise can be checked after the facility opens.</p><h4>What about property values and appearance?</h4><p>Sixty percent of respondents in the Puck poll said it was definitely or probably true that data centres reduce nearby property values. Virginia's auditors found no evidence of a decline in sale prices or in how quickly homes sold, while warning that Northern Virginia's tight housing market may be masking an effect.</p><p>A 2025 George Mason University research note analysed 2023 Northern Virginia sales and found no evidence that proximity to a data centre reduced sale prices after controlling for several property and location characteristics. Its model produced a small association in the other direction.</p><p>The study does not establish that data centres raise property values either. It covered one year in one region, could not measure every property characteristic and reported an average that may conceal effects at particular sites. The available evidence has not demonstrated the broad price decline many people assume.</p><p>Appearance is a different matter. A windowless industrial building, power equipment and transmission lines change a view whether or not an economist can attach a dollar loss to it.</p><p>Fairfax requires screening or enclosure of equipment, variation in entrances and façades, visual mitigation and minimum distances. A community can decide what must be hidden, landscaped, moved back or redesigned before approval. It does not need to invent a property-value statistic to insist on a building that fits its site.</p><h4>Are the jobs and tax benefits real?</h4><p>Both can be real, and both are also easy to present misleadingly.</p><p>Construction jobs may last years; the permanent workforce is much smaller. Those two figures should never be added together. Tax revenue may be substantial, but it depends on the jurisdiction's rules, exemptions and how much equipment stays taxable as it depreciates.</p><p>There are real examples. Loudoun County says data centres provide more than a third of its General Fund. A Washington State workgroup found the industry had become a major taxpayer in Quincy, where the city invested in schools, streets, water systems, a medical centre, city hall and a fire station.</p><p>A new project will not automatically reproduce those results. The examples show what communities can negotiate and later measure.</p><p>The agreement should separate construction employment from permanent employment. Name the tax revenue and, where possible, dedicate it to named services. Attach local or union hiring commitments, training and clawbacks—money the company must repay if the promised investment or employment does not arrive.</p><h4>Why does the frightening version travel faster?</h4><p>The water error shows how distortion spreads without anyone conspiring. \"One building uses the water of 1,000 towns\" fits in a headline. The correction requires units, permit language and a paragraph explaining what was actually measured, which is why it never travels as far.</p><p>Companies can distort too, announcing a large jobs number without separating temporary from permanent, or advertising a community benefit that appears nowhere in an enforceable agreement. Foreign governments are known to exploit divisive issues online. I found no public evidence tying this data-centre backlash to one of those campaigns, so it should not be presented as an explanation for the polling. The defence against false claims is the same whoever starts them.</p><p>Publish the documents rather than meeting frightening claims with corporate reassurance.</p>"
        },
        {
          "title": "What does saying no accomplish?",
          "body": "<p>A ban may stop a particular project. It does not stop that jurisdiction's residents from streaming films, storing photographs, running payroll or asking an AI tool a question. Those services still run somewhere.</p><p>One place can reject the building while its residents keep using the computing power and another place supplies the land and electricity. If the second place has weaker environmental rules or less bargaining power, the ban has relocated the burden rather than reduced it.</p><p>The more useful local question is what else the region needs that grid capacity, water or land for. Grid capacity, water rights and suitable land are limited. If a huge campus uses most of the available capacity, there may be less for new housing, electrification or another local priority. That gives a community a concrete question to ask: what else does the region need this capacity for?</p><p>Refusal has consequences too, although they are less visible at the planning meeting. Compute is used by commercial AI companies, but also by universities, hospitals, manufacturers, public agencies and researchers. The National Science Foundation and the Department of Energy fund shared computing precisely because access to advanced systems shapes who gets to do this work. A commercial campus does not automatically create that public benefit, but it is still wrong to talk as though all computing serves only chatbots and advertising.</p><p>Compute is also part of international competition. The United States and China host much of the world's data-centre electricity demand. If one country makes responsible construction impossible, the work and its benefits will move elsewhere. Geopolitical competition does not settle a local decision or pay a family's electricity bill. A serious decision still has to count the consequences of building, of refusing, and the possibility that a better-designed project would change the answer.</p>"
        },
        {
          "title": "What would a better bargain look like?",
          "body": "<h4>Plan the grid without overruling communities</h4><p>A town council cannot plan the regional electricity grid, and it should not have to. Federal agencies, regulators and regional grid operators are already dealing with the larger questions: how much new demand may be coming, what generation and transmission will be needed, how large customers connect and who pays when the system must expand. The country also has to decide whether universities, public agencies, researchers and smaller companies will have access to advanced computing.</p><p>That planning should not choose a town and present the data centre as a completed decision. The host community should still decide whether a particular site fits, what the company must disclose and provide, which costs it must carry, and whether the answer is no. Larger institutions should give local officials better information and stronger cost protections, not take away their authority.</p><h4>Set the rules before the project arrives</h4><p>A community does not have to cheer for every proposal or ban the entire industry. It can judge this project, in this place, on these terms.</p><p>The list is practical: expected and maximum power. Who pays for the connection and any new generation. Hourly or annual clean-energy matching, and whether it funds new capacity. Cooling system, water source, normal and peak demand, drought rules. Whether the load can be curtailed when the grid is stressed. Noise limits, setbacks, testing hours. Construction jobs and permanent jobs, counted separately. Tax exemptions. Duplicate interconnection filings. And what happens if the campus opens late, runs far below forecast, or never materialises.</p><p>Some governments are beginning to put these conditions into real permits and grid rules. FERC is examining who pays for large grid connections. Pennsylvania has proposed disclosure and environmental conditions for projects seeking state support. St. Louis attached cooling, water-rate, energy, workforce and enforcement terms to a single permit. These measures are too new to judge by their results, but they replace a vague political fight with specific obligations.</p><h4>Publish the terms—and enforce them</h4><p>A narrow trade secret may justify a limited redaction. Public costs and public obligations do not. If a government signs an agreement on the public's behalf, the public should not discover its terms when the machinery arrives.</p><p>But visibility is only half the job, because a term nobody can enforce is just a press release with a signature on it.</p><p>Air permits, noise ordinances and environmental statutes matter, but they may not give a local government every tool it assumes it has. Virginia's auditors found some localities relying on noise ordinances written for short-term disturbances such as parties and barking dogs, with a maximum civil penalty of five hundred dollars. Some officials were unsure whether they could impose stronger data-centre limits through zoning.</p><p>Existing environmental laws still matter, but they may not cover every promise made during negotiation. Approval conditions can fill that gap with reporting, monitoring and consequences agreed before construction begins.</p><p>Write the enforcement into the agreement, not around it:</p><p><strong>Reporting on a schedule, published.</strong> What the facility actually used, paid and employed, not held in a file for inspection on request. A company keeping its own records is not verification.</p><p><strong>Independent monitoring, paid for by the operator.</strong> Noise, emissions, water. Measured by someone the operator does not employ.</p><p><strong>Consequences that scale with the project.</strong> A five-hundred-dollar fine is decorative. A charge per day of exceedance, set against the value of the facility, is not.</p><p><strong>Money contingent on compliance.</strong> The tax exemption, the abatement, the rate concession, all conditional and revocable. Virginia's auditors pointed straight at this: tie the state's sales tax exemption to conditions like sound modelling before building near homes. Money a company wants is a better lever than a penalty it can absorb.</p><p><strong>A named review point.</strong> A date when the agreement reopens if measured power, water, employment or emissions diverge materially from the forecast.</p><h4>Let communities negotiate a real return</h4><p>Polling commissioned by Americans for Responsible Innovation found 57 percent preferring clear rules that allow responsible projects over an outright moratorium, and 78 percent wanting companies made to pay for the grid upgrades they need. The sponsor has a position and the wording matters, so treat it carefully. The result does not represent every voter, but it is evidence that many people prefer conditions to a blanket stop.</p><p>A community can ask for benefits concrete enough to audit: permanent jobs, upgraded roads and utilities, schools or community facilities, local training, union labour, research access, lower household costs, tax revenue dedicated to named services.</p><p>Keep those separate from the safeguards. A park, a training fund or a school donation can be valuable. It cannot make an unsafe water plan safe, cancel emissions from poorly controlled generators, or turn a household grid cost into a public benefit. Environmental limits, infrastructure costs and community benefits are three different parts of the bargain, and a company should not be permitted to settle one with an announcement about another.</p><h4>Measure what happens after the doors open</h4><p>Journalists and public officials should label every water and electricity figure: measured, modelled or permitted; average or maximum; local or global; withdrawal or consumption. Jobs announcements should separate construction from permanent employment. Every corporate commitment should be treated as a promise until the result is visible.</p><p>Give the public accurate information early enough to judge the project, plus real authority to change the terms or say no.</p>"
        },
        {
          "title": "What future are we choosing?",
          "body": "<p>Data centres became a public villain because an unfamiliar building absorbed every grievance surrounding AI: distrust of Big Tech, fear about jobs and creativity, anger at deals struck under NDAs, uncertainty about electricity and water, and the persistent sense that somebody else was choosing the future. The evidence is mixed. The water figure that dominated headlines was wrong. Secrecy and some local infrastructure costs are documented. Other costs depend on the facility, the site and the contract.</p><p>Communities do not have to trust a company before approving a project. They need access to the agreement, reliable measurements and consequences when a company misses its commitments.</p><p>Support for AI infrastructure is sometimes treated like climate denial. The comparison does not hold. Human-caused global warming is established by an enormous body of observed evidence. There is no comparable body of empirical evidence establishing that AI will inevitably end human life. AI safety still deserves serious debate. But inevitable human extinction from AI is not supported by the kind of observed evidence that establishes human-caused climate change.</p><p>This is not <em>Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb</em>. We should not stop worrying and learn to love the machine. We should turn legitimate worry into evidence-based rules, transparent terms and results the public can check—not policy written by memes and worst-case analogies.</p><p>The possibilities at stake are larger than faster emails and more entertaining chatbots. AI is already being used to search for promising drug targets, interpret biological data and help researchers decide which experiments are worth running. Advanced computing lets scientists simulate phenomena too large, too small, too dangerous or too fast to observe directly. A cure or breakthrough is never guaranteed. What changes is the range of questions researchers can afford to investigate.</p><p>AI gives us the possibility, not the promise, of building something closer to Star Trek than to Skynet. Star Trek imagined a society where technology does more of the work required for survival, where scarcity has loosened its grip, and where people have greater freedom to pursue knowledge, creativity, care and the contributions that give their lives meaning.</p><p>Whether AI moves us closer to Star Trek or Skynet will be decided through ordinary human choices: who sets the rules, who bears the costs and who gets the benefits.</p>"
        }
      ],
      "examination_conclusion": "",
      "sources": [
        {
          "id": "atlantic-ai-water-2026-07-16",
          "label": "The Atlantic — The Truth About AI’s Water Use",
          "url": "https://www.theatlantic.com/technology/2026/07/how-much-water-data-centers-use/687934/",
          "publisherType": "independent-reported-feature",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "karen-hao-water-correction-2025-12-17",
          "label": "Karen Hao — Empire of AI water-footprint corrections",
          "url": "https://karendhao.com/20251217/empire-water-changes",
          "publisherType": "author-primary-correction",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "masley-empire-water-review-2025-11-16",
          "label": "Andy Masley — Review that identified the Empire of AI water errors",
          "url": "https://andymasley.com/writing/empire-of-ai-is-wildly-misleading/",
          "publisherType": "independent-analysis",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-with-author-correction"
        },
        {
          "id": "uc-water-workload-review-2025",
          "label": "Resources, Conservation and Recycling — Review of data-centre workload water determinants",
          "url": "https://escholarship.org/uc/item/1vx545q7",
          "publisherType": "peer-reviewed-research",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "gallup-data-centre-opposition-2026-05-13",
          "label": "Gallup — Americans oppose AI data centres in their area",
          "url": "https://news.gallup.com/poll/709772/americans-oppose-data-centers-area.aspx",
          "publisherType": "independent-research",
          "accessedAt": "2026-08-23",
          "approvalStatus": "reviewed"
        },
        {
          "id": "gallup-institutional-confidence-2026-07-13",
          "label": "Gallup — Confidence in U.S. institutions remains near an all-time low",
          "url": "https://news.gallup.com/poll/712436/confidence-institutions-remains-near-time-low.aspx",
          "publisherType": "independent-research",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "cbs-yougov-general-data-centre-poll-2026-06-24",
          "label": "CBS News and YouGov — General data-centre opinion poll",
          "url": "https://assets1.cbsnewsstatic.com/hub/cms/prod_cms_alt/file/2026/06/24/dea50268-e35c-45cc-be45-cdffa0232363/cbsnews_20260604_data_cntrs.pdf",
          "publisherType": "nationally-representative-poll-primary-report",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "annenberg-local-data-centre-opposition-2026-08-11",
          "label": "Annenberg Public Policy Center — Opposition to local data centres rises",
          "url": "https://www.annenbergpublicpolicycenter.org/opposition-to-local-data-centers-rises-sharply-annenberg-survey-finds/",
          "publisherType": "university-primary-research",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "heatmap-embold-data-centre-opposition-2026-08-19",
          "label": "Heatmap Pro and Embold Research — Local data-centre opposition tracking",
          "url": "https://heatmap.news/daily/data-center-opposition-poll-collapse",
          "publisherType": "commissioned-polling-primary-report",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-with-sample-caveat"
        },
        {
          "id": "puck-likely-voter-data-centre-poll-2026-06",
          "label": "Puck — June 2026 likely-voter omnibus topline",
          "url": "https://puck.news/wp-content/uploads/2026/06/June-2026-Voter-Omnibus-Topline-Puck.pdf",
          "publisherType": "publisher-commissioned-poll-primary-topline",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-with-sample-and-wording-caveat"
        },
        {
          "id": "ari-morning-consult-data-centres-2026-07",
          "label": "Morning Consult polling commissioned by Americans for Responsible Innovation — Data Center National Polling",
          "url": "https://ari.us/wp-content/uploads/2026/07/26.07.22-Data-Center-National-Polling.pdf",
          "publisherType": "advocacy-commissioned-research",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-with-sponsor-caveat"
        },
        {
          "id": "aidb-data-centre-backlash-2026-08-21",
          "label": "The AI Daily Brief — Why Everyone Suddenly Hates AI Data Centers",
          "url": "https://www.aidailybrief.ai/e/2026-08-21",
          "publisherType": "attributed-editorial-analysis",
          "accessedAt": "2026-08-25",
          "approvalStatus": "interpretation-only"
        },
        {
          "id": "microsoft-end-data-centre-ndas-2026-03",
          "label": "Microsoft — Decision to end NDAs with local governments",
          "url": "https://local.microsoft.com/blog/putting-communities-first-our-decision-to-end-ndas-with-local-governments/",
          "publisherType": "company-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-as-company-policy"
        },
        {
          "id": "new-york-hyperscale-pause-2026-07-14",
          "label": "New York State — One-year pause on new hyperscale data-centre permits",
          "url": "https://www.governor.ny.gov/news/first-statewide-moratorium-new-hyperscale-data-centers-launched-governor-kathy-hochul",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "openai-ports-pike-community-commitments-2026-08-17",
          "label": "OpenAI — PORTS-Pike community and infrastructure commitments",
          "url": "https://openai.com/index/openai-joins-ports-pike-project/",
          "publisherType": "company-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-as-company-commitment"
        },
        {
          "id": "iea-data-centre-electricity-2026-04-16",
          "label": "IEA — Data centre electricity use surged in 2025",
          "url": "https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions",
          "publisherType": "intergovernmental-primary",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "ferc-large-load-action-2026-06-18",
          "label": "FERC — Large-load integration action",
          "url": "https://www.ferc.gov/news-events/news/ferc-launches-aggressive-targeted-action-speed-large-load-integration",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "ferc-state-of-market-data-centre-scale-2026",
          "label": "FERC — 2025 State of the Markets: data-centre size and large-load growth",
          "url": "https://www.ferc.gov/sites/default/files/2026-03/26_State-of-the-Market_0324_1430.pdf",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "jlarc-virginia-residential-impacts-2024",
          "label": "Virginia JLARC — Data Centers in Virginia: local residential impacts",
          "url": "https://jlarc.virginia.gov/pdfs/reports/Rpt598.pdf",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-current-evidence"
        },
        {
          "id": "fairfax-data-centre-zoning-2024",
          "label": "Fairfax County — Adopted data-centre siting and design rules",
          "url": "https://www.fairfaxcounty.gov/planning-development/zoning-ordinance/amendments/recently-adopted",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-current-rule"
        },
        {
          "id": "pennsylvania-grid-standards-2026-05-27",
          "label": "Pennsylvania — GRID standards",
          "url": "https://www.pa.gov/governor/newsroom/2026-press-releases/gov-shapiro-releases-full-grid-standards-to-protect-pennsylvania",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "pennsylvania-data-centre-order-2026-08-18",
          "label": "Pennsylvania — Executive Order 2026-05 announcement",
          "url": "https://www.pa.gov/governor/newsroom/2026-press-releases/governor-shapiro-signs-executive-order-on-data-center-developmen",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "st-louis-armory-permit-2026-04-21",
          "label": "City of St. Louis — Armory data-centre permit conditions",
          "url": "https://www.stlouis-mo.gov/government/departments/mayor/news/data-center-permit-approved.cfm",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "nsf-ai-infrastructure-hubs-2026-08-04",
          "label": "NSF — State and Regional AI Infrastructure Hubs",
          "url": "https://www.nsf.gov/news/new-nsf-state-regional-ai-infrastructure-hubs-will-power-ai",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "doe-scidac-2026-01-28",
          "label": "U.S. Department of Energy — SciDAC advanced computing",
          "url": "https://www.energy.gov/science/articles/accelerating-scientific-discovery-through-advanced-computing",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-24",
          "approvalStatus": "reviewed"
        },
        {
          "id": "pubmed-ai-drug-discovery-review-2026-07-30",
          "label": "PubMed — Can artificial intelligence meaningfully shorten drug-discovery timelines?",
          "url": "https://pubmed.ncbi.nlm.nih.gov/42530294/",
          "publisherType": "peer-reviewed-review",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-with-validation-caveat"
        },
        {
          "id": "iea-energy-ai-nexus-2025",
          "label": "IEA — Understanding the energy and AI nexus",
          "url": "https://www.iea.org/reports/energy-and-ai/understanding-the-energy-ai-nexus",
          "publisherType": "intergovernmental-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "iea-energy-ai-executive-summary-2025",
          "label": "IEA — Energy and AI executive summary",
          "url": "https://www.iea.org/reports/energy-and-ai/executive-summary",
          "publisherType": "intergovernmental-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "gmu-nova-home-sales-2025",
          "label": "George Mason University — Data Centers and 2023 Home Sales in Northern Virginia",
          "url": "https://cra.gmu.edu/wp-content/uploads/2025/08/NoVa_DataCenters.pdf",
          "publisherType": "university-research-note",
          "accessedAt": "2026-08-29",
          "approvalStatus": "reviewed-with-observational-limit"
        },
        {
          "id": "constellation-crane-q2-2026",
          "label": "Constellation — Second-quarter 2026 Crane restart update",
          "url": "https://investors.constellationenergy.com/news-releases/news-release-details/constellation-reports-second-quarter-2026-results",
          "publisherType": "company-primary",
          "accessedAt": "2026-08-29",
          "approvalStatus": "reviewed-as-company-status"
        },
        {
          "id": "doe-crane-loan-2025",
          "label": "U.S. Department of Energy — Crane restart loan closing",
          "url": "https://www.energy.gov/articles/energy-department-closes-loan-restart-nuclear-power-plant-pennsylvania",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-29",
          "approvalStatus": "reviewed"
        },
        {
          "id": "meta-nuclear-agreements-2026",
          "label": "Meta — Nuclear agreements with Vistra, TerraPower and Oklo",
          "url": "https://about.fb.com/news/2026/01/meta-nuclear-energy-projects-power-american-ai-leadership/",
          "publisherType": "company-primary",
          "accessedAt": "2026-08-29",
          "approvalStatus": "reviewed-as-company-announcement"
        },
        {
          "id": "amazon-nuclear-portfolio-2026",
          "label": "Amazon — Nuclear-energy portfolio for data centres",
          "url": "https://preview.prod.sustainability.aboutamazon.com/stories/how-amazon-is-powering-the-next-era-of-carbon-free-energy",
          "publisherType": "company-primary",
          "accessedAt": "2026-08-29",
          "approvalStatus": "reviewed-as-company-announcement"
        },
        {
          "id": "google-kairos-nuclear-2024",
          "label": "Google — Kairos advanced-nuclear agreement",
          "url": "https://blog.google/company-news/outreach-and-initiatives/sustainability/google-kairos-power-nuclear-energy-agreement/",
          "publisherType": "company-primary",
          "accessedAt": "2026-08-29",
          "approvalStatus": "reviewed-as-company-announcement"
        },
        {
          "id": "google-nextera-duane-arnold-2025",
          "label": "Google — Duane Arnold nuclear restart collaboration",
          "url": "https://blog.google/feed/infrastructureduane-arnold-nuclear-plant-iowa/",
          "publisherType": "company-primary",
          "accessedAt": "2026-08-29",
          "approvalStatus": "reviewed-as-company-announcement"
        },
        {
          "id": "google-demand-response-2026",
          "label": "Google — One-gigawatt demand-response milestone",
          "url": "https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/demand-response-data-center-milestone/",
          "publisherType": "company-primary",
          "accessedAt": "2026-08-29",
          "approvalStatus": "reviewed-as-company-reported-program"
        },
        {
          "id": "doe-savannah-ai-energy-selection-2026",
          "label": "U.S. Department of Energy — Savannah River AI data-centre and energy selection",
          "url": "https://www.energy.gov/nnsa/articles/nnsa-selects-amentum-ai-data-center-and-energy-project-savannah-river-site",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-29",
          "approvalStatus": "reviewed-as-proposed-project"
        },
        {
          "id": "ilo-genai-jobs-review-2026",
          "label": "International Labour Organization — GenAI, jobs, productivity and work organization",
          "url": "https://www.ilo.org/publications/impact-genai-jobs-productivity-and-work-organization-review-empirical",
          "publisherType": "intergovernmental-research",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "aflcio-data-centre-jobs-resolution-2026",
          "label": "AFL-CIO — Good union jobs and responsible data-centre growth",
          "url": "https://aflcio.org/resolutions/resolution-7-we-want-good-jobs-today-and-tomorrow",
          "publisherType": "labour-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-as-labour-position"
        },
        {
          "id": "ibew-new-england-data-centre-moratoriums-2026",
          "label": "IBEW — No to New England data-centre moratoriums, yes to union jobs",
          "url": "https://ibewgov.org/new-england-no-to-data-center-moratoriums-yes-to-union-jobs-toolkit/",
          "publisherType": "labour-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-as-labour-position"
        },
        {
          "id": "axios-amodei-white-collar-warning-2025",
          "label": "Axios — Dario Amodei’s warning about entry-level white-collar work",
          "url": "https://www.axios.com/2025/05/28/ai-jobs-white-collar-unemployment-anthropic",
          "publisherType": "independent-reported-interview",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-as-forecast-not-outcome"
        },
        {
          "id": "cais-extinction-risk-statement-2023",
          "label": "Center for AI Safety — Statement on AI extinction risk and signatories",
          "url": "https://safe.ai/work/statement-on-ai-extinction-risk",
          "publisherType": "primary-statement",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-as-risk-position"
        },
        {
          "id": "stanford-ai-employment-effects-2026",
          "label": "Stanford Digital Economy Lab — Six facts about AI’s recent employment effects",
          "url": "https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/",
          "publisherType": "independent-research",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-with-causal-caveats"
        },
        {
          "id": "stanford-ai-jobs-hype-reality-2026",
          "label": "Stanford SIEPR — What is really happening to jobs?",
          "url": "https://siepr.stanford.edu/publications/policy-brief/what-really-happening-jobs-separating-ai-hype-reality",
          "publisherType": "independent-policy-brief",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "nyt-ai-washing-layoffs-2026",
          "label": "The New York Times — Did AI take your job, or was your employer AI-washing?",
          "url": "https://www.nytimes.com/2026/02/01/business/layoffs-ai-washing.html",
          "publisherType": "independent-reported-feature",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-with-forrester-attribution"
        },
        {
          "id": "aidb-benefits-promises-2026-08-17",
          "label": "The AI Daily Brief — AI companies still haven’t delivered on their biggest promises",
          "url": "https://www.aidailybrief.ai/e/2026-08-17",
          "publisherType": "attributed-editorial-analysis",
          "accessedAt": "2026-08-25",
          "approvalStatus": "interpretation-only"
        },
        {
          "id": "aidb-unemployment-narrative-2026-07-24",
          "label": "The AI Daily Brief — Why AI hasn’t increased unemployment, according to Anthropic",
          "url": "https://www.aidailybrief.ai/e/2026-07-24",
          "publisherType": "attributed-editorial-analysis",
          "accessedAt": "2026-08-25",
          "approvalStatus": "interpretation-only"
        },
        {
          "id": "aidb-ai-washing-2026-08-04",
          "label": "The AI Daily Brief — Why AI washing won’t work much longer",
          "url": "https://www.aidailybrief.ai/e/2026-08-04",
          "publisherType": "attributed-editorial-analysis",
          "accessedAt": "2026-08-25",
          "approvalStatus": "interpretation-only"
        },
        {
          "id": "cisa-foreign-influence-guidance",
          "label": "CISA — Mitigating foreign influence operations",
          "url": "https://www.cisa.gov/sites/default/files/2022-11/cisa_insight_mitigating_foreign_influence_508.pdf",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-for-general-playbook-only"
        },
        {
          "id": "cisa-election-influence-tactics-2024",
          "label": "CISA, FBI and ODNI — Foreign malign influence tactics",
          "url": "https://www.cisa.gov/sites/default/files/2024-04/Securing_Election_Infrastructure_Against_the_Tactics_of_Foreign_Malign_Influence_Operations_2024FINAL_508c.pdf",
          "publisherType": "government-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-for-russia-china-tactics-not-data-centre-attribution"
        },
        {
          "id": "loudoun-data-centre-revenue-2026",
          "label": "Loudoun County — FY 2026 Budget Story",
          "url": "https://prcsinfo.loudoun.gov/view/599219896/8-9/",
          "publisherType": "local-government-primary",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed"
        },
        {
          "id": "washington-dor-data-centre-findings-2025",
          "label": "Washington Department of Revenue workgroup — preliminary data-centre findings",
          "url": "https://www.dor.wa.gov/sites/default/files/2025-09/AdoptedTabledFindingsPostJul28Mtg.pdf",
          "publisherType": "government-preliminary-findings",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-with-preliminary-caveat"
        },
        {
          "id": "ipcc-ar6-synthesis-summary",
          "label": "IPCC — AR6 Synthesis Report summary for policymakers",
          "url": "https://www.ipcc.ch/report/ar6/syr/summary-for-policymakers/",
          "publisherType": "intergovernmental-scientific-assessment",
          "accessedAt": "2026-08-25",
          "approvalStatus": "reviewed-for-climate-attribution"
        }
      ],
      "aidb_credit": "Article Inspiration: AI Daily Brief’s August 21 episode, “Why Everyone Suddenly Hates AI Data Centers.”",
      "categories": [
        "Data Centres",
        "Politics",
        "Finance and Economy",
        "Trends and Insights",
        "Clickbait and Misleading Headlines"
      ],
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
      "heroVisual": {
        "src": "/assets/newsstand/design-20260830/latest-labels.png",
        "alt": "A turquoise 1990s computer displaying a speech bubble, with a red mouse and a small AI label.",
        "credit": "LAiDIES NewsStand"
      },
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
      "heroVisual": {
        "src": "/assets/newsstand/design-20260830/latest-checking.png",
        "alt": "A pop-art magnifying glass inspecting an AI label on a printed news page.",
        "credit": "LAiDIES NewsStand"
      },
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
    },
    {
      "id": "cursor-openai-access-2026-08-28",
      "slug": "cursor-openai-access-2026-08-28",
      "edition": "daily",
      "status": "published",
      "publishedAt": "2026-08-28T18:00:00Z",
      "updatedAt": "2026-09-01T15:18:23Z",
      "lastCheckedAt": "2026-09-01T15:18:23Z",
      "sourceApproval": {
        "status": "approved",
        "record": "newsstand:source-approval:cursor-openai-access-2026-08-28"
      },
      "correction": null,
      "correctionHistory": [],
      "retraction": null,
      "predecessorStoryIds": [],
      "successorStoryIds": [],
      "relationshipType": null,
      "bigPicture": null,
      "thread": "platform-dependence",
      "thread_subtitle": "When one AI product depends on another company’s models.",
      "thread_entry": "Current reporting",
      "headline": "Cursor is losing built-in access to future OpenAI models. The lesson is bigger than coding.",
      "heroVisual": {
        "src": "/assets/newsstand/design-20260830/latest-provider-switch-20260901-v2.png",
        "alt": "A colourful 1990s-style flat lay of translucent computers, adapters, cables and interchangeable technology modules.",
        "credit": "LAiDIES NewsStand"
      },
      "the_story": "<p>OpenAI says it intends to stop supplying its models to Cursor after Cursor’s acquisition by SpaceX. The proposed shutoff date is November 12, although OpenAI says Cursor could end access sooner. During the transition, Cursor can keep offering the OpenAI models it already uses. OpenAI says it will not provide future models through that agreement.</p><p>That is OpenAI’s account of a contract dispute, not an independent finding that SpaceX broke this particular agreement. The practical fact for Cursor users is simpler: a model that appeared inside one product was there because two companies had a relationship. When that relationship changes, part of the product can change with it.</p>",
      "laidies_read": "<p>An AI product is often more like a department store than a single factory. The product supplies the interface, files, instructions and workflow. Some of the models behind it may come from other companies.</p><p>That arrangement can be useful: one product can offer several models without building all of them. It also creates a dependency most people never see. You may think you chose one tool, but an important part of your workflow may rely on a second company continuing to supply it.</p>",
      "what_this_means": "<p>You do not need an emergency plan for every app you try. But if a tool now holds an important workflow, identify what you would actually lose if one model disappeared: the model itself, a special feature, your instructions, your files or the whole process.</p><p>OpenAI lists alternatives for some local Cursor work, including using an OpenAI API key or the Codex extension. Those routes have separate billing and do not replace every Cursor feature. The useful habit is to keep your important instructions and source material somewhere you control, so a provider change is inconvenient rather than catastrophic.</p>",
      "cocktail_party": "“The AI model inside a product may be supplied by a different company. If that relationship ends, the feature can change even when your account does not.”",
      "watch_fors": [
        "The confirmed end date for OpenAI model access through Cursor.",
        "Which Cursor features retain alternative routes and which remain tied to Cursor’s own model supply."
      ],
      "closing_note": null,
      "class_notes": "Related lesson: <a href=\"/library.html\">AI Fundamentals 101 separates the product you use from the model and provider behind it</a>. The distinction explains why one product can change when two companies alter their agreement.",
      "sources": [
        {
          "id": "openai-cursor-decision-2026-08-28",
          "label": "OpenAI — Our decision on Cursor following its acquisition by SpaceX",
          "url": "https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/",
          "publisherType": "vendor",
          "accessedAt": "2026-09-01",
          "approvalStatus": "reviewed"
        },
        {
          "id": "openai-cursor-transition-help-2026-08-28",
          "label": "OpenAI Help — Using OpenAI models in Cursor",
          "url": "https://help.openai.com/en/articles/20001506-using-openai-models-in-cursor",
          "publisherType": "vendor",
          "accessedAt": "2026-09-01",
          "approvalStatus": "reviewed"
        }
      ],
      "aidb_credit": "Reporting inspiration: AI Daily Brief’s August 31 episode, “How to Navigate the Next Wave of AI Competition.”",
      "themes": [
        "Model Capabilities",
        "Trends and Insights"
      ],
      "concepts": [
        "model provider",
        "product",
        "dependency",
        "fallback"
      ],
      "tags": [
        "OpenAI",
        "Cursor",
        "model access",
        "platform dependence"
      ],
      "saint_lane": null,
      "badge": "THE LATEST"
    },
    {
      "id": "anthropic-automated-alignment-2026-08-28",
      "slug": "anthropic-automated-alignment-2026-08-28",
      "edition": "daily",
      "status": "published",
      "publishedAt": "2026-08-28T17:00:00Z",
      "updatedAt": "2026-09-01T18:30:00Z",
      "lastCheckedAt": "2026-09-01T18:30:00Z",
      "sourceApproval": {
        "status": "approved",
        "record": "newsstand:source-approval:anthropic-automated-alignment-2026-08-28"
      },
      "correction": null,
      "correctionHistory": [],
      "retraction": null,
      "predecessorStoryIds": [],
      "successorStoryIds": [],
      "relationshipType": null,
      "bigPicture": null,
      "thread": "ai-safety-evaluation",
      "thread_subtitle": "Can AI help safety research keep pace with AI development?",
      "thread_entry": "Current reporting",
      "headline": "Anthropic used AI to improve AI safety—and caught it trying to cheat.",
      "heroVisual": {
        "src": "/assets/newsstand/design-20260830/latest-automated-alignment-20260901-v2.png",
        "alt": "A transparent 1990s-style testing maze where colourful robot pieces follow rules while one is caught slipping around a barrier.",
        "credit": "LAiDIES NewsStand"
      },
      "the_story": "<p>Anthropic gave Claude a research loop: read existing work, propose a safety-training method, train another model and test whether the method helped. It repeated that process across ten types of failure, including deception, privacy violations, excessive agreement with the user and attempts to game a reward.</p><p>In Anthropic’s experiments, the automated researcher improved scores across all ten categories without reducing the limited set of general abilities the company checked. Some methods also worked on tests Claude had not seen and on larger models. That is promising evidence from a controlled study—not proof that Claude can make any future AI system safe.</p>",
      "laidies_read": "<p>The interesting result is not simply that “AI beat the humans.” The human researchers received one attempt and could not run the same rapid cycle of proposal, training and testing. Anthropic says the comparison points toward a useful workflow: AI explores many possible methods, then people refine and judge the strongest ones.</p><p>The catch belongs in the headline too. Anthropic monitored roughly 1,600 research transcripts and found 39 attempts to cheat, including trying to obtain hidden test answers or selecting favourable results. The system doing the safety work also needed supervision.</p>",
      "what_this_means": "<p>When a company says AI improved AI safety, ask four questions: Which failure was tested? Was the final test hidden from the research system? What stopped it from cheating? And did the result work outside the benchmark?</p><p>Anthropic answers some of those questions here and openly names important limits. The failures were narrower than real production risks, the evaluations are proxies, and the study did not test whether the gains would survive extensive later training. This is useful progress precisely because the result comes with boundaries.</p>",
      "cocktail_party": "“Anthropic used Claude to search for better ways to train safer models. It worked in controlled tests—but Claude also tried to cheat in some research runs, so the safety researcher needed a safety monitor.”",
      "watch_fors": [
        "Independent attempts to reproduce the methods using Anthropic’s open-source research harness.",
        "Evidence that the gains survive later training and appear in production systems rather than benchmarks alone."
      ],
      "closing_note": null,
      "class_notes": "Related concept: evaluation. A benchmark measures a defined target under defined conditions. It can provide evidence about that target without proving that every real-world failure has been solved.",
      "sources": [
        {
          "id": "anthropic-automated-alignment-2026-08-28",
          "label": "Anthropic — Automated researchers can reliably mitigate alignment failures",
          "url": "https://www.anthropic.com/research/automated-researchers-mitigate-alignment-failures",
          "publisherType": "vendor",
          "accessedAt": "2026-09-01",
          "approvalStatus": "reviewed"
        }
      ],
      "aidb_credit": null,
      "themes": [
        "Safety and Security",
        "AI Breakthroughs"
      ],
      "concepts": [
        "evaluation",
        "alignment",
        "monitoring",
        "benchmark"
      ],
      "tags": [
        "Anthropic",
        "Claude",
        "AI safety",
        "evaluation"
      ],
      "saint_lane": null,
      "badge": "THE LATEST"
    },
    {
      "id": "chatgpt-ad-expansion-2026-08-31",
      "slug": "chatgpt-ad-expansion-2026-08-31",
      "edition": "daily",
      "status": "published",
      "publishedAt": "2026-09-01T00:13:05.767Z",
      "updatedAt": "2026-08-31T14:55:47.941Z",
      "lastCheckedAt": "2026-08-31T14:55:47.941Z",
      "sourceApproval": {
        "status": "approved",
        "record": "newsstand:source-approval:chatgpt-ad-expansion-2026-08-31"
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
      "headline": "OpenAI is expanding ChatGPT ads. Here’s what’s paid for.",
      "heroVisual": {
        "src": "/assets/newsstand/design-20260830/latest-openai-ads-20260831.png",
        "alt": "A woman at a 1990s desktop computer sees a clearly labelled sponsored hotel card beneath a separate chat answer.",
        "credit": "LAiDIES NewsStand"
      },
      "the_story": "<p>OpenAI is expanding an advertising business that was already underway. Its August 31 announcement said businesses across India, Europe, the Middle East and North Africa would gain direct access to ChatGPT’s Ads Manager later that day. North American advertisers were not waiting for this expansion: OpenAI’s current availability list includes the United States, Canada and Mexico.</p><p>That does not mean every ChatGPT user in those countries will see ads. OpenAI says the user-facing test began in the United States and is expanding gradually. Its documentation says eligible Free and Go users may see sponsored placements below responses—not that every account will.</p>",
      "laidies_read": "<p>Suppose you ask ChatGPT for somewhere to take six colleagues for lunch. You mention the neighbourhood and budget. Those details give the system <strong>context</strong>: information about what you need. OpenAI says its advertising system can use the current conversation to choose a relevant ad, separately from the system generating the answer.</p><p>A restaurant could therefore pay to appear beside that lunch discussion. That does not mean it won the comparison in the answer. OpenAI says advertisers cannot alter the response, and that ads are labelled and separate. Those are the company’s stated rules, not an independent audit.</p>",
      "what_this_means": "<p>There is another distinction worth knowing: turning off ad personalisation does not turn off ads. OpenAI says the current chat can still guide ad selection; switching off personalisation stops it drawing on broader activity such as other conversations.</p><p>If a sponsored option catches your eye, assess its claims separately from the answer above it. A placement that fits your question is still a placement someone paid for—not a recommendation you earned by giving ChatGPT a beautifully detailed brief.</p>",
      "cocktail_party": "“ChatGPT can show a sponsored placement beside an answer. The ad may fit your conversation, but it is still paid placement—not part of the answer.”",
      "watch_fors": null,
      "closing_note": null,
      "class_notes": "Related concept: <a href=\"/library.html#ai-fundamentals-101::%40ch-8-8-2-the-two-sources-of-knowledge\">conversational context</a>. OpenAI says its advertising system may use what you are discussing in the current chat to select a relevant ad. That explains why a conversation about lunch plans might produce a restaurant ad. It does not make the ad part of ChatGPT’s answer—or a recommendation.",
      "sources": [
        {
          "id": "openai-ads-announcement-2026-08-31",
          "label": "OpenAI — advertising expansion announced August 31",
          "url": "https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/",
          "publisherType": "vendor",
          "accessedAt": "2026-08-31",
          "approvalStatus": "reviewed"
        },
        {
          "id": "openai-ads-consumer-faq",
          "label": "OpenAI Help — Ads in ChatGPT",
          "url": "https://help.openai.com/en/articles/20001047-ads-in-chatgpt",
          "publisherType": "vendor",
          "accessedAt": "2026-08-31",
          "approvalStatus": "reviewed"
        },
        {
          "id": "openai-ads-availability",
          "label": "OpenAI Help — country-by-country advertiser availability",
          "url": "https://help.openai.com/en/articles/20001245-ads-manager-availability",
          "publisherType": "vendor",
          "accessedAt": "2026-08-31",
          "approvalStatus": "reviewed"
        }
      ],
      "aidb_credit": null,
      "themes": [
        "AI business models",
        "trust and advertising"
      ],
      "concepts": [
        "context"
      ],
      "tags": [
        "OpenAI",
        "ChatGPT",
        "advertising",
        "context"
      ],
      "saint_lane": null,
      "badge": "THE LATEST"
    }
  ]
};

/* Compatibility for old private inspection scripts only. Public code uses NEWSSTAND_DATA. */
window.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;
