(function installCurrentNewsstandIssue(global) {
  "use strict";

  if (!global.NEWSSTAND_DATA) return;

  var data = JSON.parse(JSON.stringify(global.NEWSSTAND_DATA));
  var story = {
    id: "front-paige-data-centre-agency-2026-08-23",
    slug: "front-paige-data-centre-agency-2026-08-23",
    edition: "daily",
    status: "published",
    publishedAt: "2026-08-23T23:55:00Z",
    updatedAt: "2026-08-23T23:55:00Z",
    lastCheckedAt: "2026-08-23T23:55:00Z",
    sourceApproval: {
      status: "approved",
      record: "newsstand:source-approval:front-paige-data-centre-agency-2026-08-23"
    },
    correction: null,
    correctionHistory: [],
    retraction: null,
    predecessorStoryIds: [],
    successorStoryIds: [],
    relationshipType: null,
    bigPicture: null,
    thread: "data-centre-community-agency",
    thread_subtitle: "Who gets the benefits, who carries the costs and who gets a say.",
    thread_entry: "Current Front PAiGE",
    headline: "The cloud wants to move in next door. Americans are saying no.",
    heroVisual: {
      src: "/assets/newsstand/editorial/data-centre-community-agency-2026-08-23.png",
      alt: "Residents examine planning maps overlooking a data-centre campus, neighbourhoods and electrical infrastructure.",
      credit: "LAiDIES editorial illustration · August 23, 2026",
      approvalId: "newsstand:owner-release:data-centre-community-agency-2026-08-29"
    },
    the_story: "For most of us, AI arrives quietly: a new button in an app, a faster answer, a feature we did not ask for but might eventually use. For a community, it can arrive as a request for land, electricity, water, roads, permits and a deal about who will pay for all of it. A new Heatmap Pro poll, conducted by Embold Research, found that 75% of 2,045 registered U.S. voters would oppose a data centre near where they live. Heatmap says opinion in the same polling series has moved 33 points against the projects in a year. The poll cannot tell us exactly why. It does tell us that building the physical machinery for the AI boom is becoming a permission problem as well as an engineering one.",
    laidies_read: "Gallup found opponents weighing different things—water and electricity, noise, utility bills, traffic and land—while supporters most often pointed to jobs and other economic benefits. People are not necessarily voting on whether they like ChatGPT. They are looking at the proposed bargain for the place where they live. The AI Daily Brief argues that loss of control, or agency, connects many of these objections. The polls do not prove that thesis, but New York's decision to pause specified state permits while it develops ratepayer, grid, environmental and community rules shows governments are beginning to negotiate the terms before approving more projects.",
    what_this_means: "If a proposal arrives near you, the useful document is not the glossy jobs announcement. It is the deal: the committed power and water demand, who pays for new infrastructure, which benefits are guaranteed, who monitors the conditions and what remedy exists if the forecast is wrong. The word “cloud” hides that bargain. The building is physical. The costs and benefits travel beyond its walls. The terms decide who has power when the promises meet real life.",
    cocktail_party: "“AI's next infrastructure bottleneck may not be chips. It may be permission. The cloud is a physical project with neighbours, costs and politics.”",
    watch_fors: [
      "Project-level evidence that tests national polling against actual local outcomes.",
      "Whether announced ratepayer, environmental and community protections are enforceable and work in practice."
    ],
    closing_note: "National polling cannot decide whether a particular project is a good deal. The next useful evidence is what each project promised, who paid, what was enforceable and what actually happened.",
    class_notes: "Existing AI Fundamentals connections: compute infrastructure, externalities, governance and agency. Big Picture opportunity: track who gets to set the terms for AI infrastructure over time.",
    sources: [
      {
        id: "heatmap-data-centre-opposition-2026-08-19",
        label: "Heatmap News / Embold Research — Data-centre opposition poll",
        url: "https://heatmap.news/daily/data-center-opposition-poll-collapse",
        publisherType: "independent-reporting",
        accessedAt: "2026-08-23",
        approvalStatus: "reviewed"
      },
      {
        id: "gallup-data-centre-opposition-2026-05-13",
        label: "Gallup — Americans oppose AI data centres in their area",
        url: "https://news.gallup.com/poll/709772/americans-oppose-data-centers-area.aspx",
        publisherType: "independent-research",
        accessedAt: "2026-08-23",
        approvalStatus: "reviewed"
      },
      {
        id: "new-york-hyperscale-permit-pause-2026-07-14",
        label: "New York State — Hyperscale data-centre permit pause",
        url: "https://www.governor.ny.gov/news/first-statewide-moratorium-new-hyperscale-data-centers-launched-governor-kathy-hochul",
        publisherType: "government-primary",
        accessedAt: "2026-08-23",
        approvalStatus: "reviewed"
      },
      {
        id: "aidb-community-agency-analysis-2026-08-21",
        label: "The AI Daily Brief — Why Everyone Suddenly Hates AI Data Centers",
        url: "https://www.aidailybrief.ai/e/2026-08-21",
        publisherType: "attributed-analysis",
        accessedAt: "2026-08-23",
        approvalStatus: "reviewed"
      }
    ],
    aidb_credit: "The AI Daily Brief supplied the agency-and-control thesis; LAiDIES independently checked the factual claims used here.",
    themes: ["data centres", "community agency", "trust and power"],
    concepts: ["compute infrastructure", "externalities", "governance", "agency"],
    tags: ["data centres", "infrastructure", "polling", "community", "governance"],
    saint_lane: "Elle Woods · Follow the power and the evidence",
    badge: "THE FRONT PAiGE · AUGUST 23, 2026"
  };

  var dailyBriefs = [
    /* The reviewed OpenAI brief is intentionally withheld from this release.
       Its August 23 watch-for became stale when OpenAI published the promised
       incident report on August 26. */
    /* {
      id: "openai-frontier-training-pause-2026-08-18",
      slug: "openai-frontier-training-pause-2026-08-18",
      edition: "daily",
      status: "published",
      publishedAt: "2026-08-23T20:30:00Z",
      updatedAt: "2026-08-23T20:30:00Z",
      lastCheckedAt: "2026-08-23T20:30:00Z",
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
        accessedAt: "2026-08-23",
        approvalStatus: "reviewed"
      }],
      aidb_credit: null,
      themes: ["frontier models", "safety and security"],
      concepts: ["containment", "sandboxing", "monitoring", "human escalation"],
      tags: ["OpenAI", "cybersecurity", "training", "monitoring"],
      saint_lane: "Deb · Bound the system before trusting it",
      badge: "THE DAILY · SAFETY DESK"
    } */
  ];

  data.generatedAt = story.publishedAt;
  data.lastCheckedAt = story.lastCheckedAt;
  data.publications.daily = {
    edition: "daily",
    editionDate: "2026-08-23",
    editorialTimeZone: "America/Vancouver",
    issue: {
      status: "complete",
      storyIds: [story.id].concat(dailyBriefs.map(function (item) { return item.id; })),
      serviceRecordIds: []
    },
    job: "A clear explanation of what changed and why it matters.",
    status: "current",
    publishedAt: story.publishedAt,
    updatedAt: story.updatedAt,
    lastCheckedAt: story.lastCheckedAt,
    maxAgeHours: 36,
    note: "The Daily for August 23, 2026."
  };
  data.publications["big-picture"] = {
    edition: "big-picture",
    job: "Ongoing sourced analysis that follows consequential AI themes over time.",
    status: "quiet",
    publishedAt: null,
    updatedAt: story.updatedAt,
    lastCheckedAt: story.lastCheckedAt,
    maxAgeHours: 336,
    note: "No Big Picture article is available yet."
  };
  var serviceDesks = [];
  var bigPictureOpportunities = [
    "What is actually scarce when a headline says ‘chip shortage’?",
    "Who benefits, who pays and what should communities require from data centres?",
    "What does ‘trained on the internet’ hide about labour, licensing, consent and data quality?",
    "Why are AI products priced in tokens—and what does that reveal or conceal about cost?",
    "Why ‘the model can do it’ is not the same as ‘the product safely does it’.",
    "Is AI replacing a task, changing a job or reorganising an industry?",
    "Which AI questions have technical answers, and which require a democratic decision?"
  ];
  var previewIds = new Set([story.id, "aidb-ai-skills-map-2026-08-18"].concat(dailyBriefs.map(function (item) { return item.id; })));
  data.stories = [story].concat(dailyBriefs).concat(data.stories.filter(function (item) {
    return !previewIds.has(item.id);
  }));
  global.NEWSSTAND_DATA = data;
  global.NEWSSTAND_CURRENT_ISSUE = {
    candidateId: story.id,
    serviceDesks: serviceDesks,
    bigPictureOpportunities: bigPictureOpportunities,
    admissionAuthority: true,
    publicWrite: true
  };
  global.addEventListener("DOMContentLoaded", function () {
    if (!serviceDesks.length) {
      var desk = global.document.querySelector(".ns-feature-desk");
      if (desk) desk.hidden = true;
      return;
    }
    serviceDesks.forEach(function (desk) {
      var node = global.document.querySelector('[data-desk="' + desk.type + '"]');
      if (!node) return;
      var heading = node.querySelector("strong");
      var body = node.querySelector("span");
      var label = heading ? heading.textContent : "";
      node.innerHTML = '<a href="' + desk.href + '"><small>' + label + '</small><strong>' + desk.title + '</strong><span>' + desk.summary + '</span></a>';
    });
  }, { once: true });
})(window);
