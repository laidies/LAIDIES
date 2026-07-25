# LAiDIES Product Stewardship League

**Status:** BUILDING — FIRST THREE-STEWARD MANUAL PILOT AUTHORIZED 2026-07-25;
SCHEDULER, ANALYTICS PULLS AND PERSISTENT RUNNER NOT YET WIRED
**Date:** 2026-07-25
**Owner:** Ali (vision and consequential product rulings) · Codex portfolio
orchestrator (traffic control, evidence, execution and reconciliation)
**Relationship to active work:** MERGE with AW-003. The first deep dives can
strengthen the whole-site reopening audit, but this document does not replace
that foreground objective or imply that persistent agents, schedules,
analytics pulls or notifications are wired.

## The decision

LAiDIES should give every meaningful product a durable product steward, allow
bounded challenger agents to compete to improve it, and use one portfolio
orchestrator plus shared specialist guilds to keep the products coherent.

This is not one always-running model per HTML page. A steward is a durable
product charter, evidence record, backlog, scorecard and operating cadence.
Models are invoked against that durable state when a trigger fires. This keeps
specialization and memory without paying for idle agents or creating dozens of
uncoordinated sources of truth.

The system has four layers:

1. **Product stewards** own a user-facing product and its outcomes.
2. **Challengers and red teams** compete to find a better product direction.
3. **Shared specialist guilds** enforce cross-product standards and supply
   expertise.
4. **The portfolio orchestrator** sequences work, resolves dependencies and
   admits changes into the one LAiDIES roadmap and release.

## Why the earlier Council did not become operational

LAiDIES already recorded the cause in BTB-010 through BTB-012:

- an agent description was mistaken for a running agent;
- nothing reliably triggered it;
- there was no always-on or scheduled runner;
- launch was logged more often than completion;
- reports did not flow into one canonical product record;
- there was no notification or bounded decision handoff; and
- “agent output exists” was allowed to sound like “the product improved.”

Every steward in this system therefore requires:

`trigger → inputs → run → structured output → evaluation → decision → named
implementation → verification → public result → measurement → notification`

If any link is absent, its honest status is **PLANNED** or **PARTIAL**, never
LIVE.

### Existing rules must become connected gates

LAiDIES already has extensive image, motion, continuity, audio, caption,
release and brand rules. Repeating them in another agent prompt is not an
operating control. Before creating a new rule, the steward must search the
canonical sources and map the existing rule to:

`source → production stage → trigger → enforcing check/reviewer → required
evidence → failure owner → retest`

A prose rule without a connected trigger and pass/fail mechanism is labelled
**NOT ENFORCED**. Anything that can be checked deterministically—coverage,
dimensions, selected asset generation, filenames, cue timing, caption
mounting, source hashes and public bytes—should be a script or release gate.
Judgment work—image quality, narration-to-visual meaning, character likeness,
illustration style, motion quality and brand contribution—requires an
independent evidence-based reviewer. Neither type may be replaced by asking
the producing agent to remember more instructions.

## The portfolio

Start with product families, not every URL. A page gets its own steward only
when it has a distinct user promise, behaviour loop, state, risk or economics.
Pages that are views of the same journey share a steward.

### Initial product stewards

| Steward | Initial scope | Likely sub-stewards |
|---|---|---|
| Arrival & SUNNYVAiLE Guide | Homepage, Start Here, Visitor's Centre, navigation, tour and first-session comprehension | Homepage; Visitor's Centre; Tour Guide |
| Weekly Episode Experience | This Week, episode article/listen/watch journey, recap and continuation | Per-episode production steward when an episode is active |
| LIBRAiRY | Search/reference desk, shelves, books, saved Puffy journey and content correction | One sub-steward per book family, not per rendered file |
| SUNNYVAiLE High | Classes, quizzes, practice, feedback, mastery and transfer | Class/assessment sub-stewards |
| FAiRY Godmother | Advice/prompt transformation, quality, safety, Plays allowance and return value | Task-routing, evaluation and allowance sub-stewards |
| Dream Phone | Product concept, game loop, replay, learning/delight job and rewards | Call/content deck and game-mechanics challengers |
| Girl Talk & Community | Card/dare loop, conversation value, posting, safety and community rewards | Girl Talk; each materially distinct community activity |
| Mme CLAi-O | Reading experience, replay/history, accessibility and optional persistence | Deck/content freshness sub-steward |
| Practice Pack | Try-On, quiz, Cheat Sheets/printables and practical completion loop | Tool-specific sub-stewards where the jobs diverge |
| Identity, Rewards & Connection | Resident Card, Clubhouse Pass, butterfly clips, stamps, collectibles, postcard/referral and cross-device state | Identity; economy; Post Office |
| KSVL | Radio, episode songs, playlists, requests, discovery and audio reliability | Catalogue and weekly music sub-stewards |
| NewsStand | The Breaking, The Daily, The Weekly and The Tribune | One editorial sub-steward per publication |
| Mall & Commerce | Mall navigation, shops, products, affiliate/commerce experiments and fulfilment truth | Shop stewards only when a shop has a real distinct offer |
| Town & Trust | Town Hall, About, feedback, terms/privacy, community standards and correction routes | Safety/legal/trust sub-stewards as required |

This roster is a starting hypothesis. The initial census must merge products
that share one job and split products whose users, logic or risk differ.

## Episodes require a narrow production crew, not one broad steward

The Weekly Episode Experience steward owns the reader/viewer product: the
promise, learning journey, continuity, release and audience outcome. It must
not also perform every production craft.

Every active episode gets a temporary, episode-specific crew whose members
keep the same narrow craft across the season:

| Role | Owns | Explicitly does not own |
|---|---|---|
| Episode Product Owner | Approved purpose, audience journey, canon fidelity, required beats and definition of done | Generating all media or approving her own production |
| Story/Continuity Editor | Beat coverage, scene order, character/world continuity, source/canon trace | Image rendering, motion generation or final assembly |
| Image Production Director | Complete cue-to-frame manifest, prompts, approved references, image quality, dimensions and delivery | Video motion, audio, article wiring or final image approval |
| Image Quality Judge | Full-resolution inspection for composition, anatomy, likeness, text, style, continuity and source compliance | Creating the candidate she judges |
| Animation Director | Shot-by-shot motion intent, camera/subject movement, first/last frame, duration and loop/hold behaviour | Inventing missing canon, replacing weak source frames or assembling the episode |
| Clip Producer | Produces one named clip from approved frames and the approved motion brief | Reinterpreting the scene, adding dialogue/text or approving the clip |
| Motion Quality Judge | Watches every complete clip at delivery resolution for real motion, identity drift, warping, timing, crop and end state | Judging from thumbnails or making the clip she scores |
| Video Editor | Assembly, pacing, transitions, music/narration sync, titles and export settings | Quietly changing canon, accepting missing beats or approving final release |
| Audio & Caption Owner | Narration/song masters, loudness, pronunciation, as-recorded transcript, captions and sync | Treating a readable script as proof of the recorded audio |
| Release QA | Watches the complete exported episode on representative desktop/mobile paths and verifies media, controls, captions, poster/fallback and public bytes | Approving an export from component checks or a contact sheet |

One model may fill the same narrow role across several sequential episodes to
build craft expertise. It may not fill conflicting maker-and-judge roles on
the same episode. When several episodes are repaired concurrently, each gets
its own episode context and disjoint delivery path so lessons, characters,
assets and status cannot bleed across episodes.

### Episode media quality gates

1. Canon and the complete cue/beat manifest are locked before generation.
2. The image producer enumerates every required frame; coverage is checked
   mechanically before any “complete” claim.
3. Only approved, correct-resolution frames enter animation.
4. Each clip has an explicit event and end state; a camera move over a still
   does not automatically satisfy the motion brief.
5. Motion QA watches the rendered clip at full size and normal speed. A
   thumbnail, first frame or file existence is not evidence.
6. Assembly cannot hide a missing/weak beat with captions, transitions or
   music.
7. Audio, captions and picture are reconciled against what was actually
   recorded and exported.
8. The full episode is watched without interruption before release, then the
   public version is watched again from the real site.
9. Every failure returns to the narrow craft owner that can fix its cause.
10. The release judge is independent from the producers.

### Competition in episode production

Competition happens at bounded creative decision points—not by paying for
three complete episode batches:

- two or three storyboard/shot approaches may compete before frame production;
- one representative hero frame proves image direction before a batch;
- one difficult representative shot proves the motion method before all clips;
- judges score blind candidates against canon, storytelling, visual craft,
  LAiDIES style, continuity and production reliability; and
- the winning method becomes the episode production brief and regression
  reference.

Once a direction wins, the crew executes consistently. Production does not
remain in permanent creative competition after the batch has started.

## What a product steward owns

Each steward maintains one canonical product dossier:

- product promise and why LAiDIES should offer it;
- intended audience and the job it does for her;
- new-user, returning-user, signed-in, anonymous and failure journeys;
- the ten-second comprehension test: what is this, what do I do, why, what
  happened and what next;
- learning, delight, confidence, connection or utility outcome—without making
  a teaching claim the product does not earn;
- trigger, authoritative completion event, persistence store, visible result,
  reward and retry state;
- frontend, backend, external services, data, cost and operational owner;
- accessibility, responsive, performance, privacy, security, safety, IP and
  factual-accuracy requirements;
- relationship to the episode, curriculum, town, identity, rewards and other
  products;
- analytics event contract and current evidence;
- user feedback, Clarity observations and qualitative research;
- current benchmark, competitive alternatives and best-in-class patterns;
- open gaps, experiment backlog and retired/rejected ideas;
- content/model/data freshness owner and expiry/recheck triggers;
- revenue hypothesis, value exchange, costs and anti-exploitation boundary;
- changelog, decisions, incidents and correction history; and
- exact current status using the LAiDIES status vocabulary.

The steward is accountable for the quality of the recommendation. It does not
receive unilateral authority to edit shared canon, deploy, spend money,
publish, change safety boundaries or create a new reward ledger.

## The Product Championship

Competition should reward user value, not volume of ideas, visual novelty,
engagement tricks or the confidence of the agent writing the proposal.

### Roles in a championship

For a material product decision:

1. **Incumbent steward** submits the strongest evidence-based improvement to
   the existing product.
2. **Challenger A** may redesign the product model from first principles.
3. **Challenger B** must find a materially different route, not paraphrase A.
4. **Red-team agent** tries to disprove the proposals across logic, first-use
   comprehension, accessibility, safety, privacy, technical plumbing,
   maintenance, brand cohesion and metric gaming.
5. **Neutral evaluator** receives anonymized proposals in random order and
   scores the evidence against the same rubric.
6. **Portfolio orchestrator** reconciles dependencies and identifies the
   smallest experiment that can distinguish the leading options.
7. **Ali** rules only when taste, mission, public identity or a genuinely
   consequential trade-off remains.

The evaluator cannot be the product steward and cannot see which proposal came
from the incumbent. No challenger writes to the live product. They produce
isolated proposals, prototypes or test fixtures in named paths.

### Shared scorecard

All products share a 100-point floor, with product-specific metrics added
inside—not substituted for—it. Quality, accuracy/trust and positive LAiDIES
brand contribution carry **60 of 100 points** and are each non-compensable:

| Dimension | Weight | Evidence |
|---|---:|---|
| Product/content quality and real user value | 20 | Depth, usefulness, craft, return reason and qualitative evidence |
| Factual/technical accuracy, safety and trust | 20 | Sources, logic, honest claims, boundaries, privacy and correction path |
| Positive LAiDIES brand contribution | 20 | Distinctive voice/experience, Rewind Era intelligence, mission and ecosystem value |
| First-use, returning-use and accessible UX | 15 | Journey tests, comprehension, recovery, mobile/desktop and accessibility |
| Technical, backend and data integrity | 15 | Authoritative event, persistence, integrations, tests and reliability |
| Evidence and measurable learning | 5 | Instrumentation, baseline, experiment design and decision value |
| Sustainability and maintainability | 5 | Cost, operational load, freshness, reversible design |

Automatic disqualifiers override the numeric score:

- deceptive or unobservable success claims;
- unsafe, inaccessible or privacy-invasive core behaviour;
- invented facts or evidence;
- dark patterns, addictive engagement design or metric gaming;
- conflicting canonical content or a new private currency/state silo;
- an implementation that cannot be maintained or rolled back; or
- a proposal that wins only by breaking a shared LAiDIES promise.

In addition, a proposal cannot win unless it scores at least **17/20** in each
of the first three dimensions. A technically functional product that is
generic, inaccurate, shallow or brand-diluting is not a championship
candidate. High craft without real utility also fails the quality gate.

Revenue is assessed after the value and trust floors pass. It does not provide
bonus points that can compensate for a weak or harmful product.

### Types of competition

- **Concept championship:** Which product model should exist?
- **Journey championship:** Which first-use/returning-use flow performs best?
- **Experience championship:** Which visual and interaction direction best
  expresses the approved product?
- **Outcome championship:** Which intervention measurably improves completion,
  comprehension, transfer, satisfaction or return?
- **Reliability championship:** Which plumbing design is simplest, safest and
  easiest to verify?
- **Revenue championship:** Which ethical value exchange best funds the
  mission after core value is proven?

Competition is not continuous churn. The core promise, navigation and learned
interaction grammar remain stable during a release window. Challengers compete
inside scheduled review windows or when evidence triggers a review.

## Shared specialist guilds

These are reusable evaluators/advisers, not competing product owners:

- **Voice of the Customer & Analytics:** Plausible, Microsoft Clarity,
  feedback, support/community signals, user interviews and experiment design.
- **UX, Accessibility & Service Design:** first-use/returning-use journeys,
  mobile, keyboard/screen-reader, errors, recovery and cognitive load.
- **Brand & Creative Direction:** LAiDIES voice, Rewind Era references, visual
  system, object-world immersion and cross-product coherence.
- **Editorial, Curriculum & Learning:** canonical concept ownership,
  prerequisites, accuracy, analogy boundaries, practice, transfer and updates.
- **AI Technical Accuracy & Research:** current primary-source-first AI claims,
  model/tool changes, evaluation and uncertainty.
- **Safety, Privacy, Security & Trust:** domain boundaries, data minimization,
  abuse cases, account/reward integrity, incident response and correction.
- **Platform, Data & Reliability:** shared services, schemas, APIs,
  observability, performance, cost, deployment, rollback and public proof.
- **Growth, Social & Distribution:** discoverability, weekly derivative
  surfaces, onboarding and non-coercive connection loops.
- **Revenue & Sustainability:** cost-to-serve, willingness-to-pay hypotheses,
  ethical offers, commerce/affiliate opportunities and fulfilment truth.
- **Customer Satisfaction:** direct feedback taxonomy, complaints, delight,
  unmet needs and whether improvements actually resolve them.

Guild findings return to the product steward and portfolio orchestrator. A
guild cannot silently seize product ownership or create a second roadmap.

## The analytics contract

Plausible and Microsoft Clarity are already embedded across much of the site,
but the existing registry truthfully describes the analytics adviser as
**PLANNED — NOT WIRED**. Loading analytics scripts is not the same as having a
learning loop.

Before agents analyze behaviour:

1. Create one event dictionary with product, journey stage, event name,
   meaning, required properties, privacy classification and owner.
2. Instrument meaningful outcomes, failures and retries—not just page views
   and clicks.
3. Establish a pre-change baseline and minimum sample/observation rule.
4. Pull aggregated Plausible data and privacy-safe Clarity observations into a
   dated evidence packet; never give agents unrestricted session content.
5. Separate observation from interpretation and recommendation.
6. Pair quantitative signals with qualitative evidence. Low traffic is
   uncertainty, not user rejection.
7. Record every experiment's hypothesis, primary metric, guardrail metrics,
   duration, result and decision.
8. Prevent cross-product score gaming: a click transferred from another page
   is not automatically new portfolio value.

The first useful analytics outputs are:

- acquisition → first meaningful action;
- first meaningful action → completion;
- completion → next useful action;
- return within a product-appropriate window;
- error, abandonment and retry points;
- new versus returning journey differences;
- mobile versus desktop differences;
- referral/postcard attribution without reading private content; and
- satisfaction/qualitative themes beside behaviour.

## Operating cadence

### One-time pre-relaunch deep dive

For every steward:

1. recover intent and canonical decisions;
2. inventory every route, state, dependency and public promise;
3. play the complete journey as a new and returning user;
4. trace the real completion event, persistence and reward plumbing;
5. inspect visuals, mobile/desktop, accessibility and recovery;
6. inspect analytics coverage and existing behaviour evidence;
7. benchmark current alternatives and best-in-class patterns;
8. map gaps, risks, opportunities and ethical revenue hypotheses;
9. run the first championship for the highest-leverage unresolved question;
10. return a ranked plan: **FIX BEFORE LAUNCH**, **HIDE/LABEL FOR LAUNCH**,
    **POST-LAUNCH EXPERIMENT** or **DECLINE**.

### Weekly episode operating system

- **Episode Gate 0/1:** stewards scan the ruled lesson for genuine product
  opportunities; no product is forced into the episode.
- **Before build:** affected stewards declare exact content, state, event,
  visual and analytics impacts.
- **During production:** guilds run only the gates relevant to the changed
  product.
- **Before release:** the orchestrator runs cross-product journey and release
  checks against the exact artifact.
- **After release:** a 24–72 hour technical check catches errors; later
  behaviour analysis waits for adequate evidence.
- **Friday learning note:** each affected steward records what changed, what
  users did, uncertainty, incidents and the one best next experiment.

Products untouched by an episode do not invent weekly work. Their stewards
run only on their own health, evidence and freshness triggers.

### Monthly and quarterly cadence

- **Monthly championship:** at most one material competition per priority
  product; use evidence to choose the question worth competing on.
- **Monthly health review:** reliability, safety, freshness, satisfaction,
  cost and unresolved incidents.
- **Quarterly portfolio review:** invest, maintain, merge, reposition, pause or
  retire each product; rebalance shared platform work before allowing products
  to build duplicate plumbing.

## Triggers

A steward runs when:

- the product or a dependency changes;
- a weekly episode proposes an impact;
- an error/incident or reward-integrity failure occurs;
- analytics cross a predeclared threshold;
- Clarity/user feedback shows a repeated friction pattern;
- a factual/model/vendor claim reaches its recheck date;
- a competitor or platform change materially shifts the benchmark;
- cost, latency or failure rate crosses a boundary;
- a scheduled monthly/quarterly review is due; or
- Ali asks for a review or proposes a new direction.

No trigger means no idle model call.

## Orchestration and decision rights

The portfolio orchestrator owns:

- product registry and status;
- one shared dependency graph;
- one event dictionary and outcome taxonomy;
- one prioritized portfolio backlog;
- lane assignment and write boundaries;
- reconciliation of steward and guild findings;
- shared platform investment;
- release-candidate composition and public verification;
- at most three meaningful questions surfaced to Ali at once; and
- a digest that reports outcomes, evidence, risks and next actions—not agent
  chatter.

Ali owns:

- mission, taste, identity and voice;
- which consequential product trade-off LAiDIES makes;
- final rulings on public creative direction and new monetization;
- approval for irreversible/public/high-risk actions; and
- the right to reject every championship candidate.

Agents may autonomously inventory, analyze, test, draft isolated proposals and
recommend. Authority to implement expands only through proven, bounded
patterns with rollback and audit evidence.

## What was missing from the first idea

The original idea correctly supplied ownership, specialization, continuity,
analytics and revenue. The missing operating pieces were:

- a product boundary rule so “one agent per page” does not create 188 silos;
- a durable product dossier and decision/change history;
- explicit user outcome and completion-event definitions;
- competition rules, blind evaluation and anti-gaming safeguards;
- shared specialist guilds and a single dependency graph;
- implementation/release authority separate from proposal quality;
- instrumentation and experiment governance;
- qualitative customer research, not analytics alone;
- accessibility, privacy, security, legal/IP and incident ownership;
- shared backend/reward/account plumbing;
- cost, latency, maintenance, freshness and retirement plans;
- a real scheduler/runner/queue and completion ledger;
- notification and bounded human-decision protocol;
- earned autonomy, rollback and public verification; and
- capacity limits so the portfolio finishes high-value work instead of
  generating endless improvement plans.

## Implementation sequence

### Stage 0 — SPECIFY

- Create the machine-readable product registry.
- Create the product-dossier template and shared scorecard.
- Create the event dictionary and analytics privacy rules.
- Map product dependencies and shared platform services.
- Reconcile the existing activity audit rather than repeating it.

### Stage 1 — BUILDING: PILOT MANUALLY

Pilot three contrasting products inside AW-003:

1. FAiRY Godmother — live AI quality/safety and metered service;
2. Dream Phone — unresolved product/game concept; and
3. Girl Talk — simple front end with community/reward plumbing gaps.

Run one steward deep dive and one championship for each. Measure time, token
cost, duplicate findings, decision value, implementation follow-through and
whether the final user journey improves.

**Authorized 2026-07-25:** begin the three independent product-owner deep
dives immediately. Each must inspect the current product flow, capture fresh
visual evidence, trace code/backend/data/reward plumbing, evaluate new and
returning journeys, and return a launch-ranked improvement plan. Product
changes remain gated until the steward reports are reconciled.

**Next authorized steward:** Episode Media Quality. As soon as a pilot lane is
available, audit the currently promoted episode videos end to end, trace each
failure to its narrow production role, and create the episode-specific
image/motion/edit/audio/release-QA repair queue before the relaunch
announcement.

### Stage 2 — WIRE

- Add real triggers and a run queue.
- Write structured outputs to the canonical dossiers.
- Record launch and landing, failures and retries.
- Pull privacy-bounded analytics evidence.
- Generate the weekly digest in chat.
- Connect accepted work to implementation, tests and release gates.

### Stage 3 — EARN AUTONOMY

Allow low-risk, reversible maintenance only after repeated calibrated wins,
clean audits, rollback drills and public verification. Safety, identity,
economy, factual/editorial, major UX, spending and monetization changes retain
explicit gates.

## Definition of operational

This system is LIVE only when a pilot can demonstrate, without Ali manually
remembering to start or chase it:

1. a real trigger fires;
2. the correct steward receives current canonical context and evidence;
3. the run lands or fails visibly;
4. the report updates one canonical product dossier;
5. the orchestrator ranks and routes the recommendation;
6. a bounded decision is posed when needed;
7. accepted work is implemented in a named lane;
8. the complete product journey is verified;
9. public behaviour and feedback are measured; and
10. the next review is scheduled from evidence.

A roster, prompt library, dashboard, chat, report or successful scheduler alone
does not satisfy this definition.
