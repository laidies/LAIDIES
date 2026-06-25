/* The Chamber of Receipts — data file
   ---------------------------------------------------------------
   Every receipt is rendered from this array by the inline script in
   chamber-of-receipts.html. To update a fact, edit it here — the
   layout takes care of itself.

   Schema per receipt:
     id, section, question, badge, headline,
     solid, contested, unknown, dependsOn, myth, receipt,
     sources [{label, url}], verified, recheckWhen, keywords

   badge values: settled | solid-moving | contested | early-signal | depends

   URL discipline: every source is a real working link. For sources
   where the exact deep link couldn't be confirmed, we link the
   organization's landing page — a working landing keeps the
   "checkable receipt" promise; a 404 breaks it. Industry-funded
   sources are flagged inline with ⚠️ in the label.                  */

window.CHAMBER_RECEIPTS = [

  // ===== JOBS & WORK =====

  {
    id: "jobs-replacing-now",
    section: "jobs",
    question: "Is AI replacing jobs right now?",
    badge: "solid-moving",
    headline: "Not wholesale. The clearest early signal is companies hiring fewer juniors in the most exposed roles, while experienced people in the same roles stay fine. Less \"robots took my job,\" more \"someone quietly pulled up the bottom rung.\"",
    solid: [
      "Stanford's \"Canaries in the Coal Mine\" (2025) found a 13% relative drop in employment for workers 22–25 in the most AI-exposed jobs since late 2022; older workers in the same jobs held steady or grew. The cut shows up in headcount, not pay. It held after the authors stripped out tech firms, remote-able roles, and company-wide shocks.",
      "It's not all subtraction. The WEF projects 170M new roles created vs 92M displaced by 2030 — net +78M, with ~14% of all jobs being brand-new occupations."
    ],
    contested: [
      "Whether it's AI or post-2022 over-hiring correction and interest rates. The study addresses this; the debate isn't fully closed."
    ],
    unknown: [],
    dependsOn: "whether AI automates your task or augments you — declines hit automation roles; augmented roles grew for every age group.",
    myth: "\"AI is causing mass layoffs.\" The data shows a hiring slowdown at the entry level, not a wave of firings.",
    receipt: "the risk isn't \"AI replaces you,\" it's \"AI replaces the entry-level version of your job\" — while creating new work for whoever learned to direct it. Be that person.",
    sources: [
      { label: "Stanford Digital Economy Lab — \"Canaries in the Coal Mine\" (2025)", url: "https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/" },
      { label: "WEF — Future of Jobs Report 2025", url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/" },
      { label: "McKinsey — Generative AI and the future of work in America (2023)", url: "https://www.mckinsey.com/mgi/our-research/generative-ai-and-the-future-of-work-in-america" }
    ],
    verified: "June 2026",
    recheckWhen: "the next Stanford \"Canaries\" update and the next WEF Future of Jobs land.",
    keywords: "jobs replacing work employment entry-level career hiring stanford canaries"
  },

  {
    id: "jobs-most-affected",
    section: "jobs",
    question: "Which jobs are most affected?",
    badge: "solid-moving",
    headline: "If your job is mostly \"take information from A and put it in format B,\" that's where AI bites first. Judgment, relationships, and physical presence are the safer ground.",
    solid: [
      "WEF 2025 has clerical and secretarial roles — data entry, cashiers, bank tellers, admin assistants — declining fastest. Fastest-growing in proportional terms: AI/ML specialists, big-data specialists, fintech engineers.",
      "Growth isn't only tech — care roles (nursing, social work), educators, renewable-energy and skilled-trade jobs are all expanding."
    ],
    contested: [],
    unknown: [],
    dependsOn: "how routine and codifiable your core tasks are, not your industry or title.",
    myth: "\"only blue-collar / only white-collar jobs are at risk.\" It cuts across both, sorted by task type, not collar.",
    receipt: "audit your own week. The parts that are \"move info from one place to another\" are the exposed parts — and the cue to shift your time toward the judgment and relationship work AI can't do.",
    sources: [
      { label: "WEF — Future of Jobs Report 2025", url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/" }
    ],
    verified: "June 2026",
    recheckWhen: "the next WEF Future of Jobs.",
    keywords: "which jobs affected roles clerical coding copywriting customer service nursing trades"
  },

  {
    id: "jobs-replace-me",
    section: "jobs",
    question: "Will AI replace ME specifically?",
    badge: "early-signal",
    headline: "Probably not — but it will change what your job is. The pattern that's emerging: AI does the first draft, you make it right. Your judgment gets amplified, not deleted.",
    solid: [
      "AI tends to help novices most and experts least — it raises the floor more than the ceiling. In one customer-service study, less-experienced workers gained ~34%; the most experienced gained close to nothing."
    ],
    contested: [],
    unknown: [
      "How it nets out by field over time. A diagnostician's job and a data-entry clerk's job are heading to very different places."
    ],
    dependsOn: "how much of your value is the task (exposed) vs the judgment about the task (durable).",
    myth: "any single \"AI does your job X% as well as you\" stat. Be suspicious of clean accuracy numbers with no linked study behind them.",
    receipt: "the move isn't to out-type the machine. It's to become the person who briefs it, checks it, and owns the call — the part that doesn't automate.",
    sources: [
      { label: "Brynjolfsson, Li & Raymond — \"Generative AI at Work\" (NBER w31161, 2023)", url: "https://www.nber.org/papers/w31161" },
      { label: "Stanford Digital Economy Lab — \"Canaries in the Coal Mine\" (2025)", url: "https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/" }
    ],
    verified: "June 2026",
    recheckWhen: "annually.",
    keywords: "replace me my job personally domain expertise judgment novice expert customer service"
  },

  // ===== ENVIRONMENT =====

  {
    id: "env-water",
    section: "environment",
    question: "How much water does AI actually use?",
    badge: "depends",
    headline: "Less per question than the scary headlines say, and a rounding error nationally — but a real problem in the specific towns where the data centres land. There's no single honest number; there's a range and a location.",
    solid: [
      "All data centres together are ~0.3–0.4% of US water use. Agriculture is ~70%. Golf courses use more than data centres. All of Google's global water use ≈ irrigating ~4,000 acres of Arizona alfalfa (out of 369,000 grown in that state)."
    ],
    contested: [
      "The famous \"500ml per conversation.\" It was per 10–50 GPT-3 answers, bundled in power-plant water; the authors say it swings 30×+ by location and model. Modern models are 10–33× leaner. The bottle-per-email version is ~10–50× too high."
    ],
    unknown: [
      "Real per-facility numbers — disclosure is thin and self-reported."
    ],
    dependsOn: "location (Nordic hydro vs Arizona desert), cooling type (closed-loop sips, evaporative drinks), what you count (cooling only, or the electricity's water too), training vs everyday use.",
    myth: "\"every email you send AI drinks a bottle of water.\" A stretched 2023 GPT-3 estimate applied to leaner 2026 models, quoted per message when it was per dozens.",
    receipt: "measure AI's water by the watershed, not your inbox — and not the national average either. ~40% of US data centres sit in high water-stress areas, and in a few towns one campus can pull a third of the municipal supply. Small everywhere, heavy somewhere.",
    sources: [
      { label: "Li et al. — \"Making AI Less Thirsty\" (arXiv 2023 / Communications of the ACM 2024)", url: "https://arxiv.org/abs/2304.03271" },
      { label: "Privette et al. — AGU Advances (2026)", url: "https://agupubs.onlinelibrary.wiley.com/journal/25768604" },
      { label: "USGS — Estimated Use of Water in the United States", url: "https://www.usgs.gov/mission-areas/water-resources/science/water-use-united-states" },
      { label: "Google — 2024 Environmental Report", url: "https://sustainability.google/reports/google-2024-environmental-report/" }
    ],
    verified: "June 2026",
    recheckWhen: "the next vendor environmental reports or a peer-reviewed per-facility dataset land.",
    keywords: "water use consumption data center cooling thirsty environment google nordic arizona"
  },

  {
    id: "env-carbon",
    section: "environment",
    question: "What's AI's carbon footprint?",
    badge: "depends",
    headline: "Small per question, and genuinely uncertain — the honest story is that nobody publishes the full numbers. The real driver isn't training anymore; it's the billions of everyday queries.",
    solid: [
      "Inference (everyday use) now dominates emissions, not training — Google says ~60% of its AI energy is inference. A single query is small: central estimates land around 2–3g CO₂e (~10× a Google search), though published estimates range wildly (0.03–68g).",
      "Historical anchor: training GPT-3 emitted ~500 tonnes CO₂ (the old \"5 cars' lifetime\" line is a 2019 figure for one specific training run — fine as history, label it).",
      "Worth noting the flip side too: applied to climate work, AI could cut 3.2–5.4 Gt CO₂e/yr by 2035 (Grantham, 2025)."
    ],
    contested: [
      "No major provider publishes complete, verifiable per-query emissions. Every number out there is a reverse-engineered estimate with different boundaries."
    ],
    unknown: [],
    dependsOn: "the grid the data centre runs on. A model on hydro ≠ a model on coal. Same query, very different footprint.",
    myth: "both \"one prompt has a huge carbon cost\" (it doesn't, per query) and \"AI is carbon-free because it's just software\" (the data centres are very real).",
    receipt: "per-prompt guilt is a rounding error. The lever that matters is the grid powering the data centre and how fast clean energy keeps up with the buildout — a policy and siting question, not a \"should I have asked that\" question.",
    sources: [
      { label: "IEA — Electricity 2024", url: "https://www.iea.org/reports/electricity-2024" },
      { label: "Strubell et al. — Energy and Policy Considerations for NLP (2019, historical context)", url: "https://arxiv.org/abs/1906.02243" },
      { label: "Grantham Research Institute — AI and climate (LSE)", url: "https://www.lse.ac.uk/granthaminstitute/" }
    ],
    verified: "June 2026",
    recheckWhen: "the next IEA report and any provider disclosure.",
    keywords: "carbon footprint emissions co2 energy training climate inference grid renewable"
  },

  {
    id: "env-better-or-worse",
    section: "environment",
    question: "Is it getting better or worse?",
    badge: "contested",
    headline: "Both, at once. Each query keeps getting more efficient; total energy use keeps climbing faster. Efficiency is winning the battle and losing the war.",
    solid: [
      "Per-query efficiency improves fast (leaner models, better chips). And total demand is surging — the IEA projects data-centre electricity roughly doubling to ~1,000 TWh by 2026; UN University projects ~945 TWh by 2030."
    ],
    contested: [
      "Whether clean-energy build-out keeps pace, or whether the surge leans on gas and even revived coal in some regions."
    ],
    unknown: [],
    dependsOn: "Jevons paradox — efficiency makes AI cheaper, cheaper drives more use, more use outruns the savings.",
    myth: "\"efficiency gains mean the problem is solving itself.\" The opposite — falling cost per query is why total demand explodes.",
    receipt: "individual efficiency is real and not the point. The fight is total demand and what powers it — grid, siting, and whether clean energy scales with the server farms.",
    sources: [
      { label: "IEA — Electricity 2024", url: "https://www.iea.org/reports/electricity-2024" },
      { label: "UN University INWEH — Environmental cost of AI's energy use: carbon, water and land footprints (2026)", url: "https://unu.edu/inweh/news/environmental-cost-of-AIs-Enrgy-use-carbon-water-and-land-footprints" },
      { label: "Epoch AI — efficiency trends", url: "https://epoch.ai/" }
    ],
    verified: "June 2026",
    recheckWhen: "the next IEA electricity report.",
    keywords: "getting better worse efficiency energy usage trend jevons demand grid"
  },

  {
    id: "env-electricity-bill",
    section: "environment",
    question: "Are data centres raising my electricity bill?",
    badge: "contested",
    headline: "The viral \"your bill went up 267%\" number is junk. But \"data centres don't affect my bill\" is the other lie. The truth is regional and still being fought over.",
    solid: [
      "The watchdog for the biggest US grid (PJM) named data-centre demand the main reason capacity prices hit records — up 174% for 2025–26. Bills rose hard in states carrying the most data-centre load (DC, Maryland, New York).",
      "Misinformation to kill: the \"267%\" figure is a wholesale price at specific grid nodes, not residential bills — and wholesale is only ~30–50% of your bill, so it can't move your total by the same amount. Fact-checkers rated the consumer-bill version Mostly False."
    ],
    contested: [
      "Whether the pressure gets shifted onto residents. Some studies say no clear cost-shift — but the loudest \"no impact\" ones are industry-funded (one commissioned by Amazon, another by the utility trade group), so they can't anchor the answer."
    ],
    unknown: [],
    dependsOn: "rate design, who pays for the new power lines, and the deal struck (some states now make data centres their own rate class).",
    myth: "both \"data centres are doubling my bill overnight\" and \"data centres have nothing to do with my bill.\" The truth lives in the middle, regionally.",
    receipt: "the scary number is wrong; the calm \"nothing to see here\" is also wrong — and watch who funds that one. If a data centre is coming to your grid, the real question is \"who's on the hook for the upgrades,\" and that's a question you can ask loudly at a utility hearing.",
    sources: [
      { label: "PolitiFact — Warren \"267%\" fact-check (June 12 2026)", url: "https://www.politifact.com/factchecks/2026/jun/12/elizabeth-warren/data-centers-rising-electricity-costs/" },
      { label: "WRAL — data-centre electricity-bill fact-check (June 15 2026)", url: "https://www.wral.com/news/state/fact-check-data-center-electricity-bills-june-15/" },
      { label: "PJM Independent Market Monitor", url: "https://www.monitoringanalytics.com/" },
      { label: "Lawrence Berkeley National Laboratory — Energy Markets & Policy publications", url: "https://emp.lbl.gov/publications" }
    ],
    verified: "June 2026",
    recheckWhen: "the next PJM capacity auction and FERC co-location ruling.",
    keywords: "electricity bill rates data center pjm capacity wholesale residential warren"
  },

  {
    id: "env-data-centre-town",
    section: "environment",
    question: "Is a data centre good or bad for my town?",
    badge: "contested",
    headline: "Not just extraction. A data centre can bring a community real money — sometimes life-changing — but the size of the win depends almost entirely on the deal that gets struck, and a lot of it is temporary.",
    solid: [
      "The windfalls are real. In rural Richland Parish, Louisiana, tax revenue from Meta's data-centre construction pushed teacher bonuses from ~$10,000 to roughly $50,000 — near a full year's pay for some — plus ~$17,000 for support staff. One Meta tax payment was $22.4M to a parish that used to collect ~$21M total."
    ],
    contested: [
      "Most of that is construction-era tax. Once built, it recurs at a fraction, and a finished data centre runs on relatively few permanent staff (~500 committed here). The tax breaks are large — a 20-year sales-tax exemption and an ~80% property-tax abatement for decades — so the long-run contribution is well below face value.",
      "Costs that ride along: home prices spiked; the region is adding gas plants for the power draw."
    ],
    unknown: [],
    dependsOn: "the negotiated deal — benefit agreements, abatement size, job and infrastructure commitments, clawbacks if targets are missed.",
    myth: "both \"data centres take everything and give nothing\" (Richland's teachers are the receipt) and \"a data centre is a jackpot for any town\" (strip the abatement and the one-time bump and the math thins fast).",
    receipt: "a data centre isn't good or bad — it's a negotiation. The towns that win treat a $20-billion neighbour like the high-stakes counterparty it is: real benefit agreements and clawbacks in writing. The leverage is realest before the deal is signed.",
    sources: [
      { label: "Shreveport-Bossier City Advocate — Richland Parish reporting (2026)", url: "https://www.theadvocate.com/shreveport_bossier/" },
      { label: "⚠️ Louisiana Economic Development (industry-promoted — windfall and abatement caveats run together)", url: "https://www.opportunitylouisiana.gov/" }
    ],
    verified: "June 2026",
    recheckWhen: "Hyperion finishes construction and post-construction tax figures land.",
    keywords: "data centre town community tax revenue meta louisiana richland parish abatement"
  },

  // ===== PRIVACY & TRUST =====

  {
    id: "privacy-data-training",
    section: "privacy",
    question: "Is my data being used to train AI?",
    badge: "settled",
    headline: "Probably yes — and paying doesn't buy you out the way you'd think. The line that matters isn't free vs paid. It's consumer vs business.",
    solid: [
      "ChatGPT — Free, Plus, and Pro all train on your chats by default (opt out: Settings → Data Controls → \"Improve the model for everyone\"). Only Team/Enterprise/Edu are out by default.",
      "Claude — since late 2025, Free, Pro, and Max train by default unless you opt out, and opting in stretches retention to five years; only Team/Enterprise and the API are out.",
      "Gemini — a personal account is consumer data (with human review unless you turn off Gemini Apps Activity); a Workspace/business account isn't used for training.",
      "The catch: opting out isn't a force field. A thumbs-up/down can pull a chat back into review; Anthropic's policy lets safety-flagged chats be used even if you opted out, and doesn't define what trips the flag. \"Delete\" is slow (~30 days), and anything already in a finished training run can't be pulled back."
    ],
    contested: [],
    unknown: [],
    dependsOn: "tool, tier, whether you actually toggled the setting, and whether you used a temporary chat.",
    myth: "\"I pay for Pro, so my stuff is private.\" Paying for a consumer plan buys features, not privacy. (The rollout toggle was pre-checked under a big Accept button — a lot of people opted in by clicking through.)",
    receipt: "Deb's rule: if it's confidential — client data, your salary, the closed-door thing — don't paste it into a consumer chatbot, even a paid one. Use a business/enterprise account, a temporary chat, or your own brain. Then check the toggle today: Data Controls (ChatGPT), Privacy Settings (Claude), Gemini Apps Activity (Gemini).",
    sources: [
      { label: "Anthropic — \"Updates to Consumer Terms and Privacy Policy\" (Aug 2025)", url: "https://www.anthropic.com/news/updates-to-our-consumer-terms" },
      { label: "Anthropic — Privacy Policy (June 2026)", url: "https://www.anthropic.com/legal/privacy" },
      { label: "OpenAI — Data Controls FAQ", url: "https://help.openai.com/en/articles/7730893-data-controls-faq" },
      { label: "Google — Gemini Apps & your data", url: "https://support.google.com/gemini/answer/13594961" }
    ],
    verified: "June 2026",
    recheckWhen: "a major provider updates consumer terms (roughly yearly now, always toward more data).",
    keywords: "data training privacy conversations opt-out enterprise free tier chatgpt claude gemini"
  },

  {
    id: "privacy-hallucination",
    section: "privacy",
    question: "How often does AI make stuff up?",
    badge: "depends",
    headline: "Often enough that you never trust it blind on anything that matters — but \"how often\" has no single number. It runs from ~1% to over 40% depending on what you ask and how it's measured.",
    solid: [
      "It's real, common, and unsolved. Summarizing a document you handed it, top models stay low (~1–3% on the easier benchmarks). Turning on web search / giving it the source cuts made-up answers sharply (one test: ~47% wrong from memory vs ~10% with web)."
    ],
    contested: [
      "The \"smarter\" reasoning models can hallucinate more, not less — every frontier reasoning model tested in 2026 topped 10% on harder real-world documents, because \"thinking it through\" adds things that weren't in the source."
    ],
    unknown: [],
    dependsOn: "summarizing your document vs answering from memory; web search on or off; how niche/recent the topic is; which benchmark is being cited.",
    myth: "\"newer models basically fixed this.\" They didn't — the research question shifted from \"can we fix it\" to \"which model makes things up least.\"",
    receipt: "treat AI like a brilliant, fast, slightly-too-confident intern. Great first draft, never the final word. On anything high-stakes — legal, medical, financial, a number for your boss — verify it yourself, turn web search on, ask for sources, click them. (Courts are full of cases where someone filed AI-invented citations. Don't be that receipt.)",
    sources: [
      { label: "Vectara — HHEM Hallucination Leaderboard", url: "https://github.com/vectara/hallucination-leaderboard" },
      { label: "Artificial Analysis — AA-Omniscience", url: "https://artificialanalysis.ai/" },
      { label: "Stanford RegLab — legal-AI hallucination study", url: "https://reglab.stanford.edu/" },
      { label: "ECRI — 2026 Top 10 Health Technology Hazards", url: "https://www.ecri.org/top-10-health-technology-hazards" }
    ],
    verified: "June 2026",
    recheckWhen: "each major model generation.",
    keywords: "hallucination make stuff up wrong inaccurate lies fabricate citation accuracy benchmark"
  },

  // ===== ECONOMY =====

  {
    id: "economy-productivity",
    section: "economy",
    question: "Is AI actually making companies more productive?",
    badge: "contested",
    headline: "At the task level, often yes — unevenly. At the company level, mostly not yet. The gap between \"this saved me an hour\" and \"this moved our P&L\" is where most of the money is getting lost.",
    solid: [
      "Task level: novices gain most. Customer-service study: +14% on average, biggest for the least experienced. GitHub reports developers ~55% faster with Copilot (their own study).",
      "Org level: ROI is brutal so far — MIT's 2025 study found ~95% of enterprise AI pilots delivered no measurable return; a 2026 PwC survey of 4,400+ CEOs found 56% got \"nothing out of\" AI. The ~5% that succeed redesign the whole workflow, not just bolt on a chatbot."
    ],
    contested: [
      "A controlled trial (METR, 2025) found experienced developers were 19% slower with AI on their own codebases — while believing they were 20% faster. People overestimate AI's speed-up by ~40 points."
    ],
    unknown: [],
    dependsOn: "experience level, how well-defined the task is, and whether the surrounding process got rebuilt. \"AI doesn't fix a team — it amplifies what's already there.\"",
    myth: "\"plug in AI, get instant productivity.\" The tech is rarely why it fails; organizational readiness is.",
    receipt: "the gains are real but conditional — biggest for newer workers and well-defined tasks, and only when the work is redesigned around them. And trust the stopwatch over the vibe: people are reliably wrong about how much faster AI makes them.",
    sources: [
      { label: "Brynjolfsson, Li & Raymond — Generative AI at Work (NBER w31161, 2023)", url: "https://www.nber.org/papers/w31161" },
      { label: "⚠️ GitHub — Copilot productivity research (vendor study)", url: "https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/" },
      { label: "METR — randomized controlled trial of experienced devs (2025)", url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/" },
      { label: "MIT NANDA — \"GenAI Divide: State of AI in Business 2025\" (Fortune writeup)", url: "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/" },
      { label: "PwC — Global CEO Survey", url: "https://www.pwc.com/gx/en/issues/c-suite-insights/ceo-survey.html" },
      { label: "Google — DORA Research", url: "https://dora.dev/research/" }
    ],
    verified: "June 2026",
    recheckWhen: "the next big enterprise-ROI surveys (Deloitte/McKinsey/PwC) and METR update.",
    keywords: "productivity companies productive gains efficiency output roi pilot metr mit nanda"
  },

  {
    id: "economy-who-benefits",
    section: "economy",
    question: "Who's actually benefiting financially?",
    badge: "solid-moving",
    headline: "So far, mostly the companies selling the shovels and the people who already know how to dig. The broad \"rising tide lifts all boats\" hasn't shown up yet.",
    solid: [
      "The clearest winners are upstream — chipmakers and infrastructure (Nvidia, the \"picks and shovels\"), cloud providers, and the consultants billing to make AI actually work inside messy companies. High-skill workers who can wield it are pulling ahead."
    ],
    contested: [
      "Whether broad productivity gains arrive at all soon. Macro signals are noisy — some economists see a small bump (St. Louis Fed: ~1.9% excess productivity since ChatGPT); median wages are roughly flat."
    ],
    unknown: [
      "Historical anchor: electricity took 20+ years to show up in productivity statistics. AI might follow that slow curve — or might not."
    ],
    dependsOn: "whether the gains stay concentrated upstream or eventually spread through wages and broad output.",
    myth: "\"AI is already making everyone more prosperous.\" The gains are concentrated, not yet broad.",
    receipt: "right now the money sits upstream and with people who can already use the tools — which is the least glamorous, most honest argument for becoming one of them.",
    sources: [
      { label: "Federal Reserve Bank of St. Louis — On the Economy", url: "https://www.stlouisfed.org/on-the-economy" },
      { label: "Stanford Digital Economy Lab", url: "https://digitaleconomy.stanford.edu/" },
      { label: "⚠️ Company earnings (chip / cloud sector — point-in-time, date them)", url: "https://www.sec.gov/edgar.shtml" }
    ],
    verified: "June 2026",
    recheckWhen: "quarterly for sector figures; annually for the macro productivity data.",
    keywords: "benefiting financially money wealth inequality nvidia wages chip cloud upstream"
  },

  // ===== LEARNING & SKILLS =====

  {
    id: "learning-dumber",
    section: "learning",
    question: "Is AI making us dumber?",
    badge: "depends",
    headline: "It can — if you let it think for you instead of with you. The early evidence is real but nuanced, and it's the same story as calculators and GPS, turned up louder.",
    solid: [
      "MIT's \"Your Brain on ChatGPT\" (EEG study, 2025) found ChatGPT users showed lower brain engagement, weaker memory of their own work, and \"cognitive debt\" — they did worse when later asked to work unaided. A 666-person study tied heavy AI use to lower critical-thinking scores via \"cognitive offloading.\" In one clinical study, doctors' unaided tumour-detection dropped 6% after three months of AI assistance.",
      "The hopeful half: guided, active use can strengthen thinking. In the MIT study, people who did the work themselves first and then used AI performed better. Order and intent matter."
    ],
    contested: [
      "The MIT study is a small (n=54) preprint; the field is young. And cognitive offloading isn't new — the same effect was found for the calculator, GPS, and Google."
    ],
    unknown: [],
    dependsOn: "whether you use AI to skip the thinking or to extend it.",
    myth: "both \"AI rots your brain\" (too strong, early evidence) and \"it's totally fine\" (also wrong — the deskilling is measurable).",
    receipt: "use AI to extend your thinking, not replace it. Draft with it, argue with it, then do the actual reasoning yourself on the things you want to stay sharp at. Keep some work unmediated — that's the rep that keeps the muscle.",
    sources: [
      { label: "Kosmyna et al. — \"Your Brain on ChatGPT\" (MIT Media Lab, 2025, arXiv preprint)", url: "https://arxiv.org/abs/2506.08872" },
      { label: "Gerlich (2025) — \"AI Tools in Society,\" Societies (MDPI)", url: "https://doi.org/10.3390/soc15010006" },
      { label: "Lee et al. — Microsoft / CMU, \"The Impact of Generative AI on Critical Thinking\" (CHI 2025)", url: "https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/" },
      { label: "International AI Safety Report (2026)", url: "https://www.gov.uk/government/publications/international-ai-safety-report-2026" }
    ],
    verified: "June 2026",
    recheckWhen: "peer-reviewed replications of the MIT study appear.",
    keywords: "dumber stupid critical thinking learning brain cognitive offloading mit chatgpt calculator gps"
  },

  {
    id: "learning-skills",
    section: "learning",
    question: "What skills should I actually learn?",
    badge: "solid-moving",
    headline: "Four things — and \"learn to code\" isn't necessarily one of them. The ability to evaluate and direct AI now matters more than building it.",
    solid: [
      "The durable four — prompting (talking to AI well), evaluation (knowing good output from garbage), workflow design (knowing where AI fits your process), and your domain expertise (what makes you the expert).",
      "WEF's 2030 top skills — analytical thinking, creative thinking, AI & big-data literacy, curiosity and lifelong learning, resilience. Notice \"coding from scratch\" isn't on it."
    ],
    contested: [],
    unknown: [],
    dependsOn: "your field — but the meta-skill is universal: learning to learn fast, because the tools turn over roughly every six months.",
    myth: "\"you have to learn to code to stay relevant.\" Directing and checking AI matters more for most people than writing the code yourself.",
    receipt: "stop trying to memorize tools that'll change by autumn. Get good at the four above and at picking things up quickly — that's the skill set that survives every model release.",
    sources: [
      { label: "WEF — Future of Jobs Report 2025", url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/" }
    ],
    verified: "June 2026",
    recheckWhen: "the next WEF Future of Jobs.",
    keywords: "skills learn coding prompting evaluation workflow domain expertise wef"
  }

];
