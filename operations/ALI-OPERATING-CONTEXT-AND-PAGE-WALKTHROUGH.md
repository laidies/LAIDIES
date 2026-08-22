# LAiDIES operating context and page-vision workbook

**Status:** DRAFT FOR ALI REVIEW — NOT ACTIVE AGENT AUTHORITY

**Created:** 2026-08-21

**Purpose:** Give Ali one readable place to define what good looks like. After
approval, each section is compiled into a small product or specialist packet;
agents do **not** load this whole workbook or the repository's history.

## The one decision this draft needs

Approve or correct the structure of this workbook. Approval of the structure
does not approve any page, agent, release, asset or inferred product decision.

## Why this exists

The current repository has many useful briefs, reviews, receipts and historical
decisions, but an agent can still load too many of them, recover an old rule or
mistake implementation evidence for current intent. This workbook separates:

1. Ali's current desired outcome;
2. the exact current implementation and release truth;
3. locked choices that must survive;
4. rejected or unacceptable outcomes that must not return;
5. the bounded work required for Sunday;
6. work that begins only after the product is live; and
7. the compact context a specialist receives for one task.

This is a **human review surface**, not a new universal prompt. Historical
evidence remains preserved but is retrieved only when an exact current packet
routes a task to it.

## How the future system uses this workbook

```text
Ali walkthrough or decision
        ↓
one reviewed product/operation packet
        ↓
orchestrator creates one bounded work order
        ↓
specialist receives only its role card + current packet + exact artifact
        ↓
maker produces and self-checks the real result
        ↓
independent reviewer inspects the artifact
        ↓
orchestrator integrates, releases when authorized, and verifies the live URL
        ↓
Control Room reports outcome, exception, decision or recommendation to Ali
```

Old documents do not enter that chain unless the current product packet names
one as a required source. A search hit, recent filename, status word or old
review cannot make a source authoritative.

## The compact context every dispatched agent receives

Every task packet must contain exactly the useful subset below. Missing fields
fail the dispatch; unrelated portfolio history is omitted.

| Field | Required content |
| --- | --- |
| Outcome | The visitor or operational result, in one sentence |
| Scope | Exact owned paths, services and surfaces |
| Current authority | One current product/operation packet and its version |
| Exact inputs | Artifact paths and checksums or immutable external identities |
| Applicable locks | Only the canon, standards and accepted examples relevant to this task |
| Known-bad subset | Exact rejected identities and failure patterns relevant to this output |
| Acceptance | Observable success, failure and stop conditions |
| Handoff | Recipient, required evidence, next trigger and decision boundary |
| Prohibitions | What this task may not publish, infer, overwrite or revive |

An agent does not receive `all decisions`, `all memory`, `all reviews` or every
`AGENTS.md`. Permanent specialists keep a short stable role card. Temporary
workers receive a task packet and disappear after handoff.

## Authority and supersession rules to approve

1. Ali's latest explicit decision for the exact area wins.
2. Each area has one current packet with a version, effective date, owner and
   `supersedes` list.
3. A packet may route to exact supporting sources; directories and globs are
   not authority.
4. Rejected bytes remain in a denylist/evidence archive, never in active asset
   or release selectors.
5. Superseded instructions move out of routine inheritance and keep a tombstone
   that names the successor.
6. No agent may turn `BUILT LOCALLY`, a passing checksum, HTTP 200 or an old
   approval into `LIVE`.
7. Only these outcome states are used: `CAPTURED`, `DECIDED`, `SPECIFIED`,
   `BUILDING`, `BUILT LOCALLY`, `VERIFIED LOCALLY`, `READY FOR ALI REVIEW`,
   `ALI ACCEPTED`, `DEPLOYED`, `PUBLICLY VERIFIED`, `HOLD`, `REJECTED`.
8. Every active record has an owner, next action, dependency and return trigger.
9. Files without a current owner and active consumer become archive candidates;
   they do not remain ambient context.
10. A validator must reject a calibrated bad input before its PASS has authority.

## Orchestration and handoff contract

### One work order

Each work order records:

- work ID and priority;
- requested outcome;
- owning specialist and temporary workers;
- exact input and output paths;
- dependencies already satisfied;
- acceptance commands and qualitative review required;
- collision boundary so two agents never write the same path;
- checkpoint, time limit and stop-loss;
- final status and next trigger.

### Parallel work

Independent lanes may run together—for example, source verification, asset
inventory and browser testing—while one named integrator owns shared files and
the final candidate. Parallel work is not permitted when two lanes would make
competing changes to the same artifact or depend on an unresolved upstream
choice.

### Handoff receipt

A handoff is complete only when it says:

- what exact artifact changed;
- what was verified and what was not;
- test/review results, including failures;
- current status using the fixed vocabulary;
- remaining blocker or next executable action;
- new owner and automatic return trigger;
- commit/deployment/public identity when applicable.

Chat summaries, self-authored PASS statements and “should work” are not
handoffs.

### Exceptions raised to Ali

Ali sees only:

1. a taste, premise, public-identity, spend, privacy or meaningful product
   decision that cannot be inferred safely;
2. a candidate that passed internal gates and is ready for her judgment;
3. a genuine block after safe alternatives were exhausted;
4. a material live incident; or
5. a concise improvement recommendation with expected value, effort and risk.

Each message asks for one decision and includes the exact evidence and proposed
default. Ali is never asked to operate a tool or go find a file.

## Permanent specialist roles to approve

Permanent roles are capabilities, not a reason to keep 35 agents permanently
loaded. Most fan-out work should be temporary and unnamed.

| Specialist | Owns | Must know | Must never do | Definition of done |
| --- | --- | --- | --- | --- |
| Portfolio orchestrator | priorities, dependencies, work orders, integration and handoffs | current portfolio state, Ali decision inbox, release calendar | create product taste, silently switch work or declare specialist quality | each accepted work item has an owner, evidence, status and next trigger |
| Context and memory watchdog | current-packet integrity, supersession, stale-link and authority checks | packet manifest and archive/denylist rules | decide product intent or preload history | routine startup resolves one current packet and no conflicting inherited instruction |
| Asset librarian and rejection guard | active assets, rejected bytes, versions, selectors and quarantine | exact asset identities and consumers | delete evidence or infer rejection from age/name alone | rejected identities cannot be selected; active assets bind current consumers |
| Product owner | one building, game, publication or service from promise to live outcome | its approved vision packet, functionality map and visitor evidence | optimize one component while breaking the complete journey | accepted visitor scenes work locally and, when authorized, on the live URL |
| UX and visual systems specialist | interaction, responsive layout, accessibility and visual cohesion | exact page brief, approved references and known visual defects | revive rejected art, approve own work or score around a visible regression | exact desktop/mobile result passes objective checks and independent visual review |
| Frontend specialist | browser implementation and client state | approved interaction contract and shared components | invent backend truth or product intent | changed journey works at required viewports and failure states |
| Platform and identity specialist | authoritative services, accounts, permissions, persistence and privacy | data contracts, providers and deletion/revocation requirements | imply account sync from local storage | real producer-store-consumer lifecycle passes, including failure and removal |
| Release and reliability specialist | builds, deployment, rollback and public verification | exact accepted artifact and provider configuration | equate a commit or HTTP 200 with release | immutable deployment and custom-domain bytes are verified with rollback ready |
| Learning-content producer | books, classes, explainers and substantial teaching | current sources, reader question, teaching standard, good and bad exemplars | draft from a topic alone or reuse rejected prose as a template | exact prose passes maker review, independent review and required learner evidence |
| Library-book producer | complete books, diagrams, reader and corrections | current manuscript, book contract, visual plan, sources and admission state | expose held books or use rejected Concepts identity | admitted exact book opens in the correct reader and supports lookup/continuation |
| Episode story producer | episode premise, script, narration and learning arc | episode canon, writing lock, sources and accepted series pattern | let video assembly repair a weak or stale story | exact script/narration package is current, accepted and production-ready |
| Episode video producer | shot plan, approved stills, Canva animation, CapCut assembly and master export | exact narration, cue sheet, visual lock, accepted/rejected shot registry | select old/rejected media, animate unapproved variants or approve own master | one exact continuous sound-on master passes occurrence, timing, continuity and independent watch |
| Study Pack producer | Episode-aligned Cheat Sheet, Try-On and Trading Cards | exact released episode, learning outcome, print/mobile and ownership contracts | relabel prototypes or mismatch an episode's teaching job | complete pack works in Blend & Snap and Closet with admitted content |
| NewsStand editor | current sourced editions, corrections, archives and service desks | current editorial brief, primary sources, publication contract and freshness windows | treat AIDB or vendor copy as authority, silently refresh timestamps or publish filler | exact edition is independently admitted, deployed and discoverable; stale items fail closed |
| Research and AIDB scout | source discovery, link tracing and useful signals | source hierarchy, current date, deduplication and routing rules | publish, change canon or interrupt active work with every idea | signal is verified enough to route as NOW/NEXT/PARK/MERGE/DECLINE with sources |
| Audience and growth specialist | discoverability, engagement learning and campaign recommendations | public product truth and verified analytics | invent performance from missing data or publish campaigns without acceptance | recommendation states evidence, hypothesis, metric, owner and authorized next action |
| Independent quality reviewer | artifact-first qualitative judgment | original brief, exact candidate and relevant known-bad subset | rely on maker receipts, fix the work or approve changed bytes | verdict binds exact bytes, names defects and cannot pass a known-bad calibration |
| Operations observer | schedules, health checks, incidents and concise dashboard state | automation receipts, deadlines and service health | create product work or hide UNKNOWN as healthy | exceptions and overdue work surface once with owner and recovery action |

## Build-to-launch work versus continuous operation

### Mode A — finish and launch the product

This mode ends only when the agreed capability exists and is publicly verified.
It includes incomplete pages, missing visual systems, backend/service wiring,
content production, rejected-media replacement, integration, accessibility,
release and rollback.

`SPECIFIED → BUILDING → VERIFIED LOCALLY → READY FOR ALI REVIEW → ALI ACCEPTED → DEPLOYED → PUBLICLY VERIFIED`

### Mode B — run and improve the live product

This mode begins only for capabilities that are publicly verified. It includes
freshness checks, scheduled NewsStand work, media/content corrections, service
health, analytics, user feedback, experiments, asset hygiene and improvement
recommendations.

Continuous operation may open a new Mode A work order when it finds a defect or
valuable improvement. It may not claim an unfinished capability is being
“operated.”

## How Ali interacts with the system

The proposed human interface has four views, backed by repository records:

1. **Today:** what is running, what completed, what failed and what is next.
2. **Decisions:** one decision-ready item at a time with exact preview/evidence,
   recommendation and consequence of approve/reject/defer.
3. **Products:** each page/service shows current reality, Sunday scope, accepted
   vision, live status, owner and next action.
4. **Ideas and improvements:** agent recommendations and Ali ideas, routed as
   NOW/NEXT/PARK/MERGE/DECLINE without interrupting active work.

Scheduled work writes to these views automatically. Ali can answer in ordinary
language; the orchestrator converts the answer into the exact product packet,
decision and work-order update in the same task.

## Page walkthrough: what Ali can tell me in ordinary language

Ali does not need to fill a form. For each page, talk through any of the prompts
below while looking at the current page. I will capture, reconcile and return a
single proposed packet for approval.

1. What should a first-time visitor understand within a few seconds?
2. What should she be able to do, and what result should she leave with?
3. What should the place feel like? Which existing page, object or interaction
   is the closest positive example?
4. What currently works and must survive?
5. What is wrong, confusing, ugly, generic, incomplete or unacceptable?
6. Which rejected examples show what must never return?
7. What must be complete by Sunday?
8. What can wait until after launch?
9. Once live, what should run or improve automatically?

I will add the technical implications—data, backend, accessibility, responsive
behavior, integrations, analytics, release and failure recovery—without asking
Ali to design the implementation.

## Product-by-product review index

The summaries below are current opening-day planning, not approval of the
existing pages. `Ali walkthrough` remains blank until Ali reviews that area.

### 0. Town-entry Homepage

- **Current intended job:** Explain LAiDIES/SUNNYVAiLE, orient first-time and
  returning visitors, feature the current useful work and route into the town.
- **Ali walkthrough, 2026-08-22:** Ali tried to begin with the LIBRAiRY but
  could not discover a route from the live Homepage. A map hotspot, topic chips
  and a directory link labelled only “Miss Jeeves” do not count as findable
  LIBRAiRY navigation. The Homepage must name **LIBRAiRY** directly in its
  desktop and mobile primary navigation and provide a clear entry from the
  Miss Jeeves/reference section.
- **Sunday cut:** _To confirm._
- **Continuous operation:** current-feature rotation, destination health and
  evidence-based engagement improvement only after public verification.

### 1. Visitor's Centre

- **Current intended job:** First-arrival orientation, Trailer, accurate town
  directory and useful starting routes.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** complete first-time orientation with no dead destination or
  fake readiness.

### 2. NewsStand

- **Current intended job:** The Breaking, The Daily, The Weekly and The Tribune;
  source-visible current information, archive/search, corrections and related
  learning.
- **Ali walkthrough:** _To capture; this becomes the desired-outcome authority._
- **Sunday cut:** one truthful current launch edition plus working newspaper
  discovery and correction behavior; exact quantity to confirm after vision.
- **Continuous operation:** scheduled source scan, editorial production,
  independent admission, release, freshness suppression and correction loop.

### 3. Chick Flicks

- **Current intended job:** Discover, read, listen to and watch the Trailer and
  Episodes 01–04 in order, with exact released media and related learning.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** repaired/admitted Trailer and Episodes 01–04 only; no held or
  rejected master may appear.

### 4. Blend & Snap

- **Current intended job:** The café home for complete episode Study Packs:
  Cheat Sheet, Try-On and Trading Cards, with download/print/save/Closet return.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** one complete, episode-accurate Episode 01 pack; current
  mismatched Try-On and four-page pseudo-cheat-sheet are not acceptable.

### 5. Mme CLAi-O's Shop

- **Current intended job:** A complete playful card-reading experience with the
  correct character/art, useful output and clear entertainment boundaries.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm._

### 6. MAiKEOVER on MAiN

- **Current intended job:** Resident Card and My Closet manage truthful identity,
  saved progress, collections, rewards, charms/badges/cards and messages.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm against real account/provider scope._

### 7. Bronze AiGE

- **Current intended job:** Cocktail Fortune and the Businesswomen's Special as
  legible, safe, playful experiences with real outcomes and handoffs.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm._

### 8. Dream Phone Booth

- **Current intended job:** The funny caller/reflection experience plus a
  hallucination-detection challenge, without misleading advice claims.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm; the live Dream Phone and parked game are distinct._

### 9. The Mall

- **Current intended job:** A coherent hub for real destinations and a bounded
  digital Book Fair/collectible pilot with truthful pricing and fulfilment.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm; no fake commerce._

### 10. KSVL Community RAiDIO

- **Current intended job:** Discover and play all 29 creator-confirmed songs with
  correct artist, track, album/cover and portable-listening metadata.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm after audio/public-origin review._

### 11. SUNNYVAiLE Post Office

- **Current intended job:** Resident and Postcard-only signup, consent,
  confirmation, delivery, unsubscribe and retry.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm against the real provider lifecycle._

### 12. Town Hall

- **Current intended job:** Report a problem, offer feedback or submit an idea
  with a durable receipt, status and retry path.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm against the real staff queue/service._

### 13. The LIBRAiRY

- **Current intended job:** Enter a vibrant physical Library, ask Miss Jeeves or
  browse shelves, understand each book before opening, read admitted books,
  look up an exact concept and save an exact place.
- **What currently works locally:** current page provides the room, Miss Jeeves,
  three collection guides, search/topic controls and all 14 covers; objective
  mobile cover/overflow and 99 browser checks pass.
- **Still held:** Ali has now reviewed the live page and requires the bounded
  repair below; zero books are admitted. AI Fundamentals has 17 responsive
  figures through Chapter 13 but Chapters 14–20, the cumulative map, learner
  sessions and final admissions are incomplete.
- **Ali walkthrough, 2026-08-22:** Preserve the bright, bold, colourful pop-art
  energy; the distinct Reference Desk and Browse the Shelves sections; the
  clearly explained 101s, Tools and Reference collections; the feeling of
  entering the building; and the selected-book preview that explains subject,
  contents and availability before opening.
  Repair the current composition rather than replacing those strengths. The
  masthead/interior concept and visible 1990s details work, but the image and
  title treatment are dull, plain and disconnected from the page palette. The
  Reference Desk and Browse sections are too compositionally similar and both
  weight activity to the same side; rebalance or reverse one. Explain the
  distinct jobs of Miss Jeeves and browsing physical Library collections; do
  not frame the visitor experience as a generic catalogue. The three shelf
  rooms currently feel stacked, floating and disconnected, with no convincing
  floor and books that do not visibly sit on their rails. Recompose them as one
  connected physical Library experience while retaining all books and the
  preview interaction. Widen the Titles and Topics search field. Keep useful
  beginner prompting help, but make prompt wording one part of the broader,
  current practice of supplying and managing task context, sources,
  constraints and examples. Mount visible shared navigation so a visitor can
  return Home and move around SUNNYVAiLE. Keep AI Fundamentals unavailable
  until its exact book and visual admissions are complete.
- **Miss Jeeves behavior, Ali walkthrough 2026-08-22:** Treat an ordinary-
  language question as a learning-direction job, not a generic site search.
  Briefly interpret and answer it from current admitted evidence, then group
  exact continuations across LIBRAiRY book sections and whole books, Episodes,
  NewsStand, tools/activities/Study Packs, SUNNYVAiLE High classes, real
  public-safe planned content and vetted external sources or trusted voices.
  Explain what each format will help the visitor do and deep-link to the most
  exact available place. Related material must not impersonate an exact
  answer; held, stale and unreviewed material stays unavailable. The Homepage
  and Library use one service and one visually rich LAiDIES result experience.
  Full binding contract:
  `product-stewards/library/BUILD-PACKET-MISS-JEEVES-REFERENCE-TOOL-2026-08-22.md`.
- **Library book experience — Ali walkthrough Part 1, 2026-08-22:** LAiDIES
  must correct the central failure of most beginner AI material: disconnected
  definitions that either omit how a mechanism works and why it matters or
  assume computer-science and engineering knowledge. Books use accurate,
  current technical sources but explain in plain language how each concept
  fits into the wider AI system and the reader's real interaction with it.
  AI Fundamentals is a connected A-to-Z mental model, not a glossary. A reader
  should be able to reconstruct the main ecosystem map—how chips, compute,
  data centres, training, models, memory and the other central concepts relate;
  what happens before use, behind the scenes, during her interaction and after;
  what she can control; what affects her; and how that knowledge improves her
  use of AI. The intended repeated outcome is an earned “Oh—that is why that
  happens” or “I understand that now” moment.
  Books are living products: continuously check their claims and interaction
  guidance as the technology and practice change, and extend the connected map
  when verified concepts become material. Terms such as context engineering
  and emerging loop/graph-engineering language are signals to evaluate for
  meaning, maturity and placement—not automatic additions because they are
  newly popular. Where a concept opens a wider societal debate, explain the
  mechanism and contours without forcing a LAiDIES position, then route to an
  appropriate sourced big-picture treatment such as a NewsStand article.
- **Library book experience — Ali walkthrough Part 2, 2026-08-22:** Preserve
  the feel and coherence of a real book without reproducing the frustrating
  interaction of manually turning simulated pages. Reading should be
  continuous and effortless. A table of contents remains available throughout
  the experience, describes what each chapter covers and jumps directly to any
  chapter or concept. Every chapter opens with what it covers and what the
  reader can expect to understand, then uses clear headings, subheadings,
  digestible text lengths and repeated summaries so the eye always knows where
  to begin.
  Visual teaching is core content, not decoration. Select the most faithful
  visual form for the exact learning job—diagram, arrows/flow, relationship
  map, comparison, image, worked example or another textbook aid—and require
  it to make the mechanism or concept relationship easier to see. An image
  added merely to break up text fails. The tokenization example should let a
  reader see why a model can mishandle a familiar word/counting question, not
  merely read another definition of tokenization.
  Use a consistent, accessible colour-coded family of recurring learning
  components such as examples, anticipated reader questions, “why this
  matters,” connections and summaries. Each component's role must be
  recognizable without relying on colour alone. End chapters with key concepts
  and plain definitions plus practice/check-understanding questions whose
  answers can be deliberately revealed after the reader tries. Show the
  book's last substantive freshness review prominently enough to establish
  trust without interrupting reading. Language remains conversational,
  engaging and easy to follow.
- **Library book experience — Ali walkthrough Part 3, 2026-08-22:** The
  LAiDIES/Rewind Era layer must feel earned, natural and genuinely funny. A
  reference is not admitted merely because it is recognisable, era-appropriate
  or satisfies a checklist. It must map faithfully to the mechanism, improve
  understanding or recall, fit the surrounding conversational prose and avoid
  crowding out the technical explanation. The book must be allowed to use no
  reference when none earns its place.
  Ali's positive exemplar is the *Scream* “the call is coming from inside the
  house” connection used with synthetic data: the relationship fit the idea,
  made the passage funny, created a durable memory cue and helped the reader
  want to continue. Negative exemplars are an unrelated quote, decorative
  name-drop, forced comparison, tenuous mapping or repeated pop-culture insert
  added simply to make the prose look branded.
  Ali must not have to perform a manual reference-writing pass over every
  chapter. The production system needs a reusable analogy/humour method that
  starts from the exact mechanism and teaching job, draws only from governed
  LAiDIES/Rewind knowledge, proposes a small number of faithful candidates or
  `NONE`, states the mapping and its limit, and independently rejects forced or
  technically distorting results before they reach Ali.
- **Library book experience — Ali walkthrough Part 4, 2026-08-22:** The larger
  outcome is informed agency. A reader should be better able to cut through
  clickbait or slightly inaccurate reporting, join technical/workplace
  conversations with justified confidence, use tools more effectively and
  diagnose ordinary failures from the mechanism instead of guessing. Weave in
  a recurring concept-bound troubleshooting component: “You may be seeing
  this because…,” followed by the relevant mechanism, what the reader can
  check or change and where the explanation's certainty ends. This must not
  collapse into generic tips.
  Understanding also equips readers for consequential personal, workplace and
  societal decisions about AI's benefits and risks. LAiDIES does not flatten
  those discussions into either doomsaying or uncritical enthusiasm. It gives
  readers the factual and mechanistic foundation to examine trade-offs, test
  claims and avoid changing position solely because of the latest article.
  This deeper “why,” not surface instructions alone, governs every Library
  book and extends across LAiDIES books, courses and Episodes.
  Guidance is current, source-bound and conditional when model/product/version
  differences matter. When recommended practice changes, explain what changed,
  why it changed and for which model or situation the successor guidance
  applies. AI Fundamentals owns the connected foundational model. Additional
  books may go deep on distinct work types, workflows or products—for example
  a ChatGPT-specific book that explains the available controls, what each one
  changes and how those behaviors connect back to the fundamentals—without
  duplicating or fragmenting the foundation.
- **Library book experience — Ali walkthrough Part 5, 2026-08-22:** A reader
  can share a stable link to an admitted whole book or exact section and can
  save either scope using a **Puffy sticker**. Saving does not require walking
  back through the Library later: the destination appears in My Closet and
  reopens the exact book/section context.
  The Closet is intended as the resident's current personal view across
  SUNNYVAiLE—what she has done, supported progress/collections and everything
  she deliberately saved. She selects an active set of up to ten Puffy
  stickers in the Closet, may give those stickers her own organizing meaning
  (for example, one she consistently uses for technical concepts), and chooses
  one of those active stickers when saving. The sticker provides recognizable
  visual organization in the Closet; the saved record still carries explicit
  title, destination, scope and context so meaning never depends on remembering
  a colour/image alone.
  Shared URLs contain only the public book/section route—not the resident's
  private sticker, purpose, progress or Closet data. Intended account/cross-
  device persistence must be reconciled separately from the current device-
  local implementation and may not be implied merely because a save appears
  in one browser.
- **Library book experience — Ali walkthrough Part 6, 2026-08-22:** Books track
  chapter/reading completion and offer a clear **continue where I left off**
  route as well as **start anywhere**. Signed-in residents receive durable
  progress and resume continuity. An anonymous reader can still read, but the
  interface truthfully explains that signing in is required to remember the
  place across supported sessions/devices; current local state is not account
  proof.
  Signed-in readers can privately highlight text and add notes, potentially as
  part of the Closet/saved-item relationship. Private annotations never enter
  public share URLs, analytics, search answers or another resident's view.
  Exact storage, export, deletion, migration and account-revocation behavior
  require the shared identity/data contract before release.
  Each book shows its last substantive review and a useful change summary. A
  returning reader can see what is new since her last visit, what section was
  added/corrected/changed and jump directly to it; cross-town “what's new” may
  surface the same governed change record. Do not repeat intrusive notices on
  every page.
  Audiobook/listening versions are a desired experience for commuting and
  other hands-free use. Printing, downloading and offline reading remain
  **UNDECIDED** because exported copies become stale and easy to detach from
  LAiDIES authorship/currentness. No implementation may claim perfect theft
  prevention; a future proposal must balance access, update propagation,
  attribution/rights and content protection.
  The existing book roster is not automatically retained as product intent.
  Preserve its bytes and inventory the work, then evaluate every book against
  a current distinct reader job. Prompt Cookbook may need a modern skills-
  oriented successor; What Not to Pay may not earn a separate book; How to
  Check AI's Work should be reconsidered around prevention-first work rather
  than repetitive downstream checking; and Tools requires a current product
  architecture. These are review directions, not immediate retirements.
  A practical successor to AI Fundamentals is already in Ali's work: applying
  the concepts to memory, personal context files and current setup practices,
  including useful scripts and how AI can help the reader configure the system.
  Other potentially valuable books organize around real work—writing,
  research, data summaries and dashboards—rather than arbitrary feature lists.
- **Library book experience — Ali walkthrough Part 7, 2026-08-22:** Reading
  progress should lead to recognition and rewards, but never from passive
  scrolling. Chapter completion may earn a smaller reward; whole-book
  completion earns a distinct larger reward. Candidate outcomes include
  Butterfly Clips that can be spent through the shared economy and visible
  stickers, badges or other Closet collectibles. Exact reward objects and
  amounts remain a product/economy design problem.
  Meaningful completion needs proportional evidence such as a concept-level
  knowledge check, explain-back or application. It may borrow a quiz mechanic
  without turning every chapter into SUNNYVAiLE High. Records must be signed-
  in, deduplicated and version-bound so scrolling, refreshes and repeat submits
  cannot mint rewards. Public recognition is an intended incentive; the
  resident explicitly chooses which eligible badges/collections appear on her
  public Card/profile so private reading behavior is not exposed by default.
  **The seven-part owner capture is complete.** The consolidated routine
  authority is
  `product-stewards/library/BOOK-EXPERIENCE-CONTRACT-2026-08-22.md`.
- **Library demand and content-gap loop — Ali walkthrough, 2026-08-22:** Offer
  a clear “I don't see my topic” request near shelf discovery and from Miss
  Jeeves when coverage is absent or insufficient. Learn both what visitors
  repeatedly seek and whether the site already has useful coverage. High
  demand with good coverage should improve Homepage/NewsStand/Library
  highlighting and routing; high demand with absent or weak coverage should
  become a reviewed content-gap proposal. The system then recommends the best
  format by learning job—a durable Library treatment, current NewsStand story,
  Episode, class, activity/tool or improved Miss Jeeves answer—not a book by
  default.
  Passive search learning stores only controlled topic/outcome/source IDs and
  aggregate counts, never raw questions or inferred personal profiles. A
  visitor who deliberately requests a topic uses a separate disclosed intake
  that stores only the text she chooses to submit, protects against sensitive
  information/abuse and returns a receipt where supported. Cluster duplicate
  requests, retain frequency and evidence, and route a decision-ready
  recommendation to the relevant product owner. Demand informs priority; it
  does not automatically create a roadmap promise, rewrite content or publish.
- **Library book visual addendum — Ali walkthrough, 2026-08-22:** Make the
  reading experience feel like a polished 1990s textbook that belongs inside
  LAiDIES. Selectively use the shared pop-art language—small attention
  graphics, word/speech bubbles, bursts, stickers, colour fields, patterns and
  backgrounds—to establish hierarchy or reinforce a teaching moment. Reference
  examples provide visual grammar, not wording to copy. Avoid an overwhelming
  mishmash of colour, decorative inserts or competing callouts; readers must
  always see where to start and what matters. The same recognizable motifs may
  recur throughout the site so the town feels cohesive, while density and
  composition adapt to each product's job rather than making every page
  identical. Routine book authority is consolidated in
  `product-stewards/library/BOOK-EXPERIENCE-CONTRACT-2026-08-22.md`; sitewide
  reconciliation belongs to the cross-system visual walkthrough.
- **Sunday cut:** page direction plus the exact admitted opening-book set must be
  explicitly reconciled; do not infer four books can be finished safely.

### Source-to-publication system — Ali walkthrough, 2026-08-22

Ali wants one end-to-end system that can take new technical information,
establish what is accurate and current, decide whether it belongs in a book
chapter, NewsStand edition, class, Episode, tool or several distinct treatments,
then carry each accepted treatment through production, visuals, implementation,
review and publication without Ali repeatedly prompting the next step.

The Hannah Fry and Richard Feynman communication methods must flow through
LAiDIES learning without becoming imitation, forced analogy or one identical
format. The shared method makes the human reason and real mechanism clear,
uses familiar examples that reconnect to the technical truth, exposes gaps
hidden by jargon and proves an unfamiliar learner can explain and transfer the
idea. Each destination then adapts that truth to its different job.

Do not create a permanent agent team per book or artifact. Use one shared
evidence/concept/routing spine, persistent product ownership and temporary
specialists with compact exact task packets. Automatic progression must be a
real state transition with a receiving owner and next action, not a handoff
document or `ACTIVE` label. The proposed operating model and verified current
executor failure are recorded in
`operations/product-stewards/learning-content-ecosystem/SOURCE-TO-PUBLICATION-OPERATING-MODEL-2026-08-22.md`.

This captures Ali's desired outcome. The exact state machine and repair plan
remain proposed until reviewed; no new production automation, publication or
deployment is authorized by this entry.

### 14. SUNNYVAiLE High

- **Current intended job:** Three complete pathways with observable skills,
  explanation, demonstration, practice, feedback, sources and completion.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm; existing previews are not complete classes._

### 15. FAiRY Godmother's House

- **Current intended job:** Improve a user-provided prompt or draft with bounded
  privacy, uncertainty and truthful FAiRY Play use/refund.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm against provider/data/cost authority._

### 16. Sorority House · Delta LAi Nu

- **Current intended job:** Resident messages plus scoped community rooms with
  real moderation, privacy and mutual-advancement norms.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm against real moderation and two-account evidence._

### 17. The LUMINAiRY

- **Current intended job:** Sourced, rights-cleared profiles of women who shaped
  computing's past and AI's present, connected to related learning.
- **Ali walkthrough:** _To capture._
- **Sunday cut:** _To confirm one profile at a time; current inventory is held._

## Cross-system walkthroughs that pages alone cannot settle

Ali may review these after the page walkthroughs expose what they must support.

| System | Decision to capture | Technical implications I will add |
| --- | --- | --- |
| Resident Card and identity | what being a resident changes | auth, local/account boundaries, privacy, revoke/delete, second-device behavior |
| My Closet and Puffy saves | what can be saved, owned and resumed | authoritative records, exact deep links, remove/revoke and conflict handling |
| Rewards and FAiRY Plays | what earns value and what can be spent | idempotency, balances, refund, abuse and visible history |
| Search and Miss Jeeves | what should be answerable and where answers lead | admitted index, freshness, privacy, unavailable state and corrections |
| Media playback/distribution | where episodes/music play and travel | exact masters, captions, resume, feeds, YouTube/podcast/music metadata |
| Community/messages | who can participate and what safety feels like | permissions, moderation, reporting, retention and appeals |
| Analytics and improvement | what success means to Ali | event dictionary, privacy, baselines, hypotheses and decision rules |
| Release/reliability | what may ship automatically | scoped gates, exact artifact, rollback, live verification and incident response |

## Specialist production walkthroughs

These answer “what good looks like” for repeated production work so outdated
instructions cannot return on the next episode, book or issue.

### Episode video

- exact accepted visual references and forbidden/rejected assets;
- what a good shot, animation, transition, loop, caption and audio mix look like;
- Canva animation versus CapCut assembly responsibilities;
- occurrence evidence and one continuous sound-on review;
- asset versioning, active selector and rejection quarantine;
- final formats and public destinations.

### Library books

- reader question and practical payoff;
- chapter/lookup relationship and required depth;
- visual teaching jobs and responsive artwork standard;
- positive and negative prose/diagram examples;
- source freshness and correction behavior;
- unfamiliar-reader evidence and final admission.

### Study Packs

- exact relationship to the released episode;
- one-page Cheat Sheet job;
- Try-On practice and feedback job;
- Trading Card teaching/collecting/ownership job;
- Blend & Snap discovery plus Closet return;
- print, mobile, download and completion evidence.

### NewsStand editions

- purpose and voice of each of the four publications;
- acceptable source mix and primary-source expectations;
- length, depth, useful action and learning connections;
- service-desk boundaries for Paige, Career/Work-Life and Promptoscope;
- correction, expiry, archive and quiet-day behavior;
- scheduled production and human decision boundaries.

## Review log

| Date | Area | Ali decision | Packet/version updated | Supersedes |
| --- | --- | --- | --- | --- |
| _pending_ | Workbook structure | _pending_ | _none_ | _none_ |

## What happens after Ali approves this structure

1. Walk through pages in the order Ali finds easiest; no need to finish all in
   one sitting.
2. After each walkthrough, I return one concise proposed product packet showing
   exactly what I heard, what conflicts with current records and the one decision
   required.
3. Once accepted, I update the area's current packet, register superseded sources
   and create the bounded Sunday work orders.
4. The context watchdog proves routine agents receive the new packet and cannot
   inherit an older conflicting one.
5. After launch, only publicly verified capabilities enter scheduled continuous
   operation.
