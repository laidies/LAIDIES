/**
 * SUNNYVAiLE NewsStand — story library (Stage 1)
 *
 * window.NEWSSTAND_STORIES : Array<Story>
 *
 * Story shape:
 *   id, slug                                   — url + archive keys
 *   edition                                    — "today" | "wednesday" | "tribune"
 *   date                                       — ISO publish date
 *   thread, thread_subtitle, thread_entry      — Tribune only; null otherwise
 *   headline                                   — display title
 *   the_story                                  — paragraph HTML (The Argument for Tribune)
 *   laidies_read, what_this_means,             — paragraph HTML each
 *     cocktail_party
 *   watch_fors                                 — Tribune only: array of paragraph HTML strings
 *   closing_note                               — optional trailing paragraph (Tribune)
 *   class_notes                                — HTML string, inline <a> only where a real page exists
 *   sources                                    — [{ label, url, flag? ("vendor-sponsored" → ⚠️) }]
 *   aidb_credit                                — optional string
 *   tags                                       — array of tag strings (powers archive filters)
 *   saint_lane                                 — optional
 *   badge                                      — optional (e.g. "★ NEW · TRIBUNE ENTRY 1")
 *
 * Stage 2 automation will push into the same array. Human approve-to-publish
 * gate stays with Ali.
 */
window.NEWSSTAND_STORIES = [

  // ---- Batch 01 · Story 1 · WEDNESDAY Edition ----------------------------
  {
    id: "botsitting-11-hours",
    slug: "botsitting-11-hours",
    edition: "wednesday",
    date: "2026-06-28",
    thread: null,
    thread_subtitle: null,
    thread_entry: null,
    headline: "The 11 hours AI gives you, and the 6.4 it quietly takes back",
    the_story: "A big new report put a number on something you've already felt. The Work AI Index 2026 — from Glean's Work AI Institute, with academics from Stanford, UC Berkeley, Emory and a handful of other universities, surveying 6,000 people who do most of their work on a computer across the US, UK and Australia — found that workers <em>say</em> AI saves them about 11 hours a week through automation. Then it takes 6.4 of them back. That clawed-back time finally has a name: <strong>botsitting</strong> — feeding the AI context, checking its work, fixing what it got confidently wrong, re-running the prompt, hopping between the four different tools you now keep open. Roughly an hour of cleanup for every hour of help. And despite 87% of people using AI, only 13% of companies said it had actually made the organization perform meaningfully better. There's a louder cousin the report names too: <strong>botshitting</strong> — shipping AI work you haven't checked, don't fully understand, and couldn't defend if someone asked. 69% admitted to it. <em>(One honest flag: Glean sells enterprise AI search, so it has a stake here. The academic co-authors and the 6,000-person sample are why it still carries weight.)</em>",
    laidies_read: "Self-checkout was supposed to get you out of the store faster — no line, no cashier. Then you're scanning your own groceries, bagging your own groceries, and standing there punching in 4011 because the machine can't tell a banana from a turnip — until the light starts spinning and you're waving down the one attendant for the whole bank of machines. It did save you the line. It also quietly made you the cashier. That's botsitting exactly: the AI hands you the time back, then you spend it being the one who feeds it what it should've known and fixes what it got wrong — a job nobody put on your schedule.",
    what_this_means: "Here's a finding the report buried that's worth saying out loud: men were 8% more likely than women to ship AI work they couldn't defend — and the researchers' own read is that women, who've always paid a steeper price for a visible mistake, already double- and triple-check before anything leaves their desk. So you may be doing the hard part already. The shift to make: stop trying to verify <em>everything</em> (that's the self-checkout trap — re-scanning every item by hand) and instead decide up front the one thing that, if it's wrong, blows up the meeting — and check only that, every time. The skill that separates the women getting faster from the ones getting buried isn't prompting. It's knowing what to never hand over.",
    cocktail_party: "“You know that stat about AI saving you eleven hours a week? Turns out you hand six of them right back babysitting the thing — feeding it context, fixing what it got confidently wrong — basically scanning your own groceries at self-checkout. The time-save is real; so is the cleanup nobody counts.”",
    watch_fors: null,
    closing_note: null,
    class_notes: "Catching confident-but-wrong output is the spine of <a href=\"/issues/issue-03.html\"><strong>Episode 3 — Don't Be Chutney on the Stand</strong></a> (the hallucination lesson), and the <a href=\"/grimoire/slaiyer-handbook.html\"><strong>SLAiYER Handbook</strong></a>'s source-checking section is the how-to. <em>(New terms “botsitting”/“botshitting” aren't in the Decoder yet — drafted as entries in the Integrity Report.)</em>",
    sources: [
      { label: "Work AI Index 2026 — Glean Work AI Institute", url: "https://www.glean.com/work-ai-institute/work-ai-index", flag: "vendor-sponsored" }
    ],
    aidb_credit: "Surfaced via The AI Daily Brief",
    tags: ["productivity", "verification", "hallucinations", "workflow"],
    saint_lane: "Elle Woods · Receipts",
    badge: null
  },

  // ---- Batch 01 · Story 2 · WEDNESDAY Edition ----------------------------
  {
    id: "claude-tag-group-chat",
    slug: "claude-tag-group-chat",
    edition: "wednesday",
    date: "2026-06-28",
    thread: null,
    thread_subtitle: null,
    thread_entry: null,
    headline: "Claude just moved into the group chat",
    the_story: "On June 23, Anthropic launched <strong>Claude Tag</strong> — a version of Claude that lives inside a Slack channel as a shared <em>team member</em> instead of a private chatbot. Anyone in the channel types @Claude, hands it a task, and it works through the steps on its own, posting updates in the thread while everyone gets on with their day. It runs on Claude Opus 4.8, remembers the channel over time (so you stop re-briefing it from scratch), and can keep working for hours. There's an optional <strong>ambient mode</strong> where it speaks up unprompted — nudging a stalled thread without being asked. It's in beta for Enterprise and Team plans, it replaces the old Claude-in-Slack app (retiring August 3), and admins control which channels and data it can see, plus how much it can spend. Anthropic says about 65% of its own product team's code is now written by an internal version of the tool.",
    laidies_read: "Think about a game of telephone — a message whispered down a line, garbled a little more at every handoff, until what comes out the end barely matches what went in. That's the old way of working with AI: you brief it in your private chat, your coworker briefs <em>hers</em>, someone emails the half-finished version around — three separate whispered chains, everyone re-explaining the same project, no two versions quite matching. Claude Tag puts one Claude in the channel that everyone talks to directly: same context, same memory, no relay. The whisper-down-the-line becomes one conversation everybody's actually in.",
    what_this_means: "The shift isn't “AI got smarter” — it's “AI moved into the room.” If your team already lives in Slack, the thing to <em>stop</em> doing is the relay: re-explaining the project to your own private chat while your colleague re-explains it to hers, emailing half-finished versions back and forth. But go in clear-eyed. The more a shared Claude learns your team, the harder it is to ever leave — that's months of accumulated context you can't easily pack up. And ambient mode means something is reading the room and deciding what you need to know. The settings — which channels, which data, what it can spend — aren't fine print; they're the whole safety story. Let it into one low-stakes channel first, on purpose.",
    cocktail_party: "“Anthropic just put Claude <em>inside</em> the Slack channel as a shared teammate — everyone tags it, it remembers the whole project, so it kills the endless emailing-it-around and re-explaining. The catch: the more it learns your team, the harder it gets to ever switch away.”",
    watch_fors: null,
    closing_note: null,
    class_notes: "This is the “AI as teammate” idea made real — the neighbourhood of <strong>Episode 5 — The AI Group Chat Roll Call</strong> (assembling your squad). <em>(Terms “agent/agentic” and “ambient AI” flagged as likely Decoder gaps in the Integrity Report.)</em>",
    sources: [
      { label: "Anthropic — Claude Tag launch (via VentureBeat)", url: "https://venturebeat.com/technology/anthropic-launches-claude-tag-replacing-its-slack-app-with-a-persistent-ai-teammate-that-learns-monitors-and-works-autonomously" },
      { label: "Fortune — Claude Tag as “virtual employee” coverage", url: "https://fortune.com/2026/06/23/anthropic-claude-tag-virtual-employee-tool-slack/" }
    ],
    aidb_credit: "Surfaced via The AI Daily Brief",
    tags: ["tools", "agents", "Slack", "teams", "governance"],
    saint_lane: null,
    badge: null
  },

  // ---- Batch 01 · Story 3 · THE TRIBUNE · Entry 1 ------------------------
  {
    id: "velvet-rope-01",
    slug: "velvet-rope-01",
    edition: "tribune",
    date: "2026-06-28",
    thread: "The Velvet Rope",
    thread_subtitle: "who gets the good AI models, and who decides",
    thread_entry: 1,
    headline: "The Velvet Rope",
    the_story: "The AI Daily Brief makes the case that the US has, almost by accident, started deciding <em>who</em> is allowed to use the most powerful AI — not through a clear law with published rules, but reactively, model by model, behind closed doors. Here's what actually happened (and it's worth being precise, because the precise version is more interesting than the headline). In early June, Anthropic released public versions of its Mythos-class models that were <em>deliberately weaker</em> — guardrailed so they couldn't do the most dangerous cyber work — while the full-strength model went to a small handful of firms by invitation. Within days, the government said it knew of a way those guardrails could be circumvented, and on June 12 the Commerce Department used an <strong>export-control lever</strong> to bar the two models (Fable 5 and Mythos 5) from all foreign nationals — including Anthropic's own foreign staff. Because no company can sort hundreds of millions of users by nationality in real time, the practical result was a global shutoff. How serious the underlying exploit really was is <strong>disputed</strong> — Anthropic calls it a narrow jailbreak; the government treated it as grave. The Brief's sharper point: an executive order ten days earlier had <em>explicitly</em> disclaimed mandatory licensing — and then the effect looked a great deal like it anyway. Some commentators have called it a “licensing regime”; that's their characterization, not a settled fact. What <em>is</em> fact: the government reached for an old lever, wasn't sure what to do, and the result was that access to the best models became something handed out at someone's discretion. <em>(The framing here is AIDB's, attributed — not a LAiDIES verdict.)</em>",
    laidies_read: "Picture the Bronze AiGE on a Saturday night. The lights are on, the band's playing, the place is <em>open</em> — but there's a velvet rope across the door and a bouncer working from a list nobody's allowed to read. Some people get waved straight through; others stand outside for reasons that were never posted; and the list might be different tomorrow night. Nothing's <em>broken</em> — the club works fine. Someone just decided who gets in, and won't show you the rule. That's the frontier-model situation exactly: the models still work, they were never deleted — access to them just became a bouncer's call. And the tell that this is the right picture? This past Friday the rope opened a crack: a <em>small list</em> of companies got waved back in. Same club, same unposted list, slightly different names on it.",
    what_this_means: "You don't have to follow AI policy to get caught behind the rope — and the lesson lands straight on your desk: access you don't control is access that can change without you. The practical hedge is the calm one — don't single-source the AI your work leans on, the way you'd never bet everything on one supplier who could raise the rope overnight. Keep a second model you actually know how to drive, and keep the context you reuse — your briefs, your templates, your “here's how I work” notes — somewhere portable, not locked inside one tool. That's not panic; it's the same resilience you'd build into anything important. A decision made in a room you'll never see shouldn't get to take your whole week with it.",
    cocktail_party: "“The US government switched off Anthropic's two most powerful models overnight — not with a law, with an export-control order nobody outside the room got to see — and then half-reopened it for a short list of companies a couple of weeks later. It's less a rulebook than a bouncer with a list: the models work fine, someone just decides who gets in.”",
    watch_fors: [
      "<strong>Does the rope become permanent?</strong> A June 2 order already floated a 30-day government look at top models before release; days ago OpenAI's GPT-5.6 got a staggered government-approval rollout with only ~20 organizations let in early. A one-off is becoming a pattern.",
      "<strong>The two-tier gap.</strong> Full-strength models to a trusted few, deliberately <em>de-tuned</em> versions to everyone else — worth watching whether the public frontier and the real frontier keep drifting apart.",
      "<strong>Does gating US models just hand the lead to ungatable ones?</strong> Two days after the ban, China's Z.ai shipped GLM-5.2 — open-weight, free to download, a fraction of the price — and it promptly knocked Fable 5 off the top of the web-design leaderboard (helped along by Fable being <em>pulled</em> from the board by the ban). You can't export-control your way out of an open model anyone can run. <em>(It doesn't beat the US models everywhere — on the hardest long-horizon work they still lead — so this is a real race, not a rout.)</em>",
      "<strong>The whiplash itself.</strong> Banned June 12, partly restored June 27. When access can swing that fast, anything you learn about a given model's availability has a short shelf life."
    ],
    closing_note: "No tidy answer here yet — that's the honest state of it. Is this reckless overreach or a government reluctantly hitting pause on something it didn't understand fast enough? Reasonable people are still arguing, and we'll report back as the rope moves.",
    class_notes: "Which company owns which model — and how much power that hands whoever can switch it off — is <strong>Power Map</strong> territory. <em>(Proposed Chamber of Receipts entry: “Can a government switch off an AI model you're using?” — settled-fact version, drafted in the Integrity Report. The “is this overreach?” argument stays here in the Tribune, by the §4B rule.)</em>",
    sources: [
      { label: "NPR — partial lifting of the Anthropic export ban", url: "https://www.npr.org/2026/06/27/nx-s1-5871245/trump-administration-imposes-restrictions-for-anthropic-to-halt-access-to-2-ai-models" },
      { label: "TechCrunch — Asian AI startups fill the gap as the ban drags on", url: "https://techcrunch.com/2026/06/27/asian-ai-startups-launch-mythos-like-models-as-anthropics-export-ban-drags-on/" },
      { label: "TechRadar — China's GLM-5.2 tops the web-design leaderboard", url: "https://www.techradar.com/pro/chinas-answer-to-claudes-fable-5-comes-top-of-the-html-web-design-contest-as-the-ceo-tells-elon-musk-glm-will-reach-mythos-class-before-q1-2027" },
      { label: "The Rundown — White House staggered rollout of GPT-5.6", url: "https://www.therundown.ai/p/white-house-reins-in-openai-gpt-5-6" },
      { label: "digitalapplied — US AI gatekeeping vs China's open-source play", url: "https://www.digitalapplied.com/blog/us-ai-gatekeeping-china-open-source-advantage-2026" },
      { label: "Lawfare — a kill switch for frontier AI", url: "https://www.lawfaremedia.org/article/a-kill-switch-for-frontier-ai" }
    ],
    aidb_credit: "POV via The AI Daily Brief · facts on primary sources",
    tags: ["policy", "access", "model-risk", "China", "open-weights", "governance"],
    saint_lane: null,
    badge: "★ THE TRIBUNE · VELVET ROPE · ENTRY 1"
  }

];
