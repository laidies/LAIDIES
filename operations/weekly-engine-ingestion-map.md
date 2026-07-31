# The Wednesday Engine — episode ingestion and opportunity map

**Status:** canonical production map  
**Date:** 2026-07-24  
**Machine inventory:** `operations/episode-surfaces.json`  
**Weekly decision form:** `operations/checklists/episode-opportunity-scan-template.md`

## The operating law

An episode is not finished when the article, narration or video is finished.
It is finished when:

1. the teaching is good;
2. the fixed episode package is complete;
3. every conditional opportunity has been consciously selected, deferred or
   marked not applicable with a reason;
4. every selected destination agrees with the ruled canon; and
5. the public release has evidence, not just files on disk.

The engine therefore has two layers:

- **The core package** — what every episode owes.
- **The opportunity scan** — every place the episode could usefully travel,
  without forcing a weak reference, game, article, class or product just to
  fill a slot.

The important distinction is:

> Every opportunity must be considered. Not every opportunity must be made.

That is how the engine becomes complete without turning one good lesson into
fifty pieces of decorative filler.

## One source, one fan-out

The editorial source is:

`content/episodes/episode-0N.canon.md`

The repository currently has an older second source,
`content/episodes/issue-0N.json`. That JSON already drives a useful generator,
but it must become a **derived file from canon**. It cannot remain an
independently authored source.

The correct relationship is:

```text
approved substance
       ↓
ruled episode canon
       ↓
derived issue JSON + narration + article
       ↓
audio / timing / art / video
       ↓
learning + town + search + email + social surfaces
       ↓
release proof + Friday measurement
```

The canon owns meaning. The opportunity scan owns destination decisions. The
surface manifest owns the denominator. A generator owns repetition. No
individual page is allowed to become a secret fourth source of truth.

### Recording creates a controlled round-trip

The production flow is mostly canon → surfaces, but text-to-narration listening
is a real editorial pass. A line can look excellent and sound wrong. Ali must
be able to revise it while listening without creating a second source of
truth.

The rule is:

- pronunciation and delivery changes stay in the performance layer;
- wording, teaching, fact, joke, cut and structure changes are reconciled back
  into canon;
- intentional spoken-only phrasing is recorded as an explicit variant;
- captions and the readable transcript are rebuilt from the final audio using
  public spelling;
- an as-recorded transcript proves what the approved audio actually says;
- timing, cues, animation and the cut are always rebuilt from the final audio;
  and
- every affected downstream use is resynchronized before release.

The current renderer is ElevenLabs, but the architecture is tool-independent.
The detailed change classes and reconciliation sequence live in
`operations/audio/recording-reconciliation-protocol.md`.

## The episode packet must grow

The existing canon spec already covers most of the teaching, but the weekly
engine also needs these explicit fields:

- `substance` — purpose, scope, worked example and practical result.
- `cast[]` — every recurring, fictional and real person used in the episode.
- `heroine_outfit` — one exact look, source reference and approved visual.
- `pronunciation[]` — public form, meaning/context, intended sound, narration
  performance form, song performance form, caption form, contexts and
  tool/version notes.
- `patron_saint` — one, several, or deliberately none; always with the teaching
  reason.
- `new_terms[]` and `reinforced_terms[]` — so the glossary does not duplicate.
- `library_impacts[]` — update an existing book, propose a new one, or none.
- `class_impacts[]` — existing class, new class, or none.
- `learning_complement[]` — the canonical concept owner, distinct job of each
  selected learning surface and path to its completed
  `operations/checklists/learning-content-intake-template.md` record.
- `mall_references[]` — new/reference already live, shop, gloss and town tie.
- `owned_activity` — the one game/tool that practises the lesson, or none.
- `experience_jobs[]` — the honest teach, practise, judge, retrieve, activate,
  encourage, belong or delight job of every promoted owned feature.
- `quotables[]` — structured lesson hooks, lyric hooks, jokes, pep talks,
  PATRON SAiNT moves and reference bridges with source/share/rights metadata.
- `reward_actions[]` — butterfly-clip amount, reason, completion signal, cap
  and dedupe rule for every eligible episode action.
- `reward_offers[]` — a complete Book Fair/town reward proposal or an explicit
  no-drop decision.
- `loyalty_impacts[]` — whether a meaningful episode action should stamp one
  building’s loyalty card, or an explicit none decision.
- `connection_impacts[]` — whether the episode creates a genuine send,
  invitation, gift or learn-together loop, or an explicit none decision.
- `build_learnings[]` — meaningful production failures, surprises, fixes and
  reusable successes, with evidence and a public-derivative decision.
- `weekly_charms[]` — set title and the seven building-specific charms.
- `distribution` — email, platform objects, URLs and status.
- `social` — connection mysteries, standalone value, reach candidates,
  save/send objects, participation, exact site routes and the return hook.
- `freshness` — which claims must be rechecked at recording and release.

Those fields do not all have to live as prose blocks. Some will eventually be
structured data. They do all have to be answerable.

## The fixed core package

Every episode owes this. “Not applicable” is not available for these rows
unless the whole channel has been deliberately retired.

| Area | Required output | The job it does |
|---|---|---|
| Substance | One-page substance sheet | Proves the lesson, example and practical payoff before prose |
| Canon | Ruled canonical episode file | One meaning across every destination |
| Read | Written episode + public issue page | Full story and durable teaching |
| Listen | Ear-spelled ElevenLabs script + narration MP3 | Audio version without corrupting public spelling |
| Reconcile | Recording revision log + post-listen sync | Carries every meaningful ElevenLabs edit back to canon and affected surfaces |
| Accessibility | Readable transcript + SRT + VTT + alt text | Makes the episode usable without one sensory channel |
| Watch | Storyboard, art, motion, cues, editable CapCut project and final export | The show itself |
| Review | Study Sheet | Fast conceptual refresh |
| Practise | Try-On | A real ten-minute application |
| Keep | Cheat Sheet / printable | Useful reference after the episode |
| Check | Pop Quiz | Understanding and transfer |
| Remember | Trading-card pack | Concept and character memory |
| Explain | BRONZE AiGE cocktail card | Meeting/happy-hour explanation in plain language |
| Soundtrack | Episode song | A replayable song whose lyric hooks make the lesson retrievable later |
| Radio packaging | DJ SunnyV episode intro + KSVL registry | Makes the song an actual broadcast item |
| Character | PATRON SAiNT decision | Gives the lesson a behaviour/move, not just a cameo |
| Continuity | Heroine outfit lock | Keeps the visual story in one world |
| Rewards | Seven-charms set, art and wiring | Weekly collection loop |
| Economy | Butterfly-clip earning actions + wallet/ledger check | Rewards meaningful participation with one consistent town currency |
| Loyalty | Building-card stamp impact decision | Turns meaningful place-specific return into period-authentic progress without creating new currencies |
| Connection | Send/invite/gift/learn-together impact decision | Rewards real relationships and useful sharing without paying for spam |
| Build learning | Behind-the-build scan + prevention/publication decision | Makes LAiDIES practise what it teaches and compounds project experience into useful lessons |
| Memory/share | Source-linked quotables registry + showcase | Keeps funny lines, lyrics and references from disappearing inside the episode |
| Personalization | Quotables into MAiKEOVER/Closet | Lets the reader keep a line that mattered |
| Community | Weekly room prompt | Converts private learning into useful conversation |
| Current week | NewsStand WEDNESDAY Edition | Announces and contextualizes the drop |
| Discovery | Episode index, site data, Ask Jeeves index, content registry and cross-links | Makes the lesson findable later by topic |
| Town journey | Homepage, Season/Chick Flicks, Watch and Wednesday Tour | Makes every entry point agree on what is current |
| Email | Wednesday Postcard / Buttondown | Delivers the whole weekly route |
| Social | Content-ladder packet + Reel, carousel, Stories and LinkedIn post | Curiosity, reach, useful attention, saving, interaction, site use and return |
| Release | QA + public URLs + sent/posted/played evidence | Separates “made” from “released” |
| Learning loop | Friday analytics/feedback note | Tells the next episode what worked |

## The conditional opportunity scan

These are required **decisions**, not required assets.

### 1. NewsStand Tribune

Select a Tribune article when the episode exposes a real argument, tension,
claim or decision that would derail the lesson if fully litigated inside it.

A Tribune is not a recap and it is not “more facts from the episode.” It must
have its own thread:

- what people disagree about;
- who is making each claim;
- why the evidence is difficult or incomplete;
- what the reader should watch for; and
- what the disagreement means for her.

First check `content/newsstand-stories.js`,
`content/library-books/straight-answers.md` and the rest of the LIBRAiRY. If
the answer already exists, freshen and cross-link it instead of duplicating it.

If “tribute article” was meant literally rather than **Tribune**, use the same
test: a person or era gets a standalone tribute only when it has independent
editorial value. A reference used for one analogy usually belongs in the Mall,
not in a second article.

### 2. Existing book update or new book

Use this order:

1. link to an accurate existing passage;
2. update the existing book when the concept belongs to its current job;
3. add a chapter when the subject is durable but not large enough for a book;
4. create a new book only when it owns a distinct lookup job.

Any selected update/new-book decision must complete the shared learning intake
and complement card. The episode owner identifies the opportunity; the
LIBRAiRY owner decides whether the durable lookup job belongs in an existing
passage, chapter, book or no new item.

Episode copy teaches in sequence. A book answers a question months later.
Vendor/version details age quickly, so keep those in dated tool guides or
`current-models.js`; keep durable mental models in textbooks.

### 3. Existing class or new class

The episode teaches **what it means and why it matters**. A class shows **what
to click and what visibly happens**.

Create or update a class when a reader needs to see:

- a model picker;
- a plan/tier label;
- a search/research control;
- a permission screen;
- a memory/instruction/project screen; or
- the same task run in two modes.

Do not turn every episode section into a class. If there is no screen or
observable action, the Study Sheet or LIBRAiRY is usually the right home.

Any selected class impact must complete the shared learning intake and
complement card. The episode owner supplies the ruled concept and learner need;
the Classes owner decides whether to link, correct, update, extend or create.
No episode automatically commissions a class.

### 4. The Mall and reference bank

Every load-bearing reference must be findable in the appropriate store:

- film/show → As Seen on TV (and film);
- person/character → Rollin' with my Homies;
- music/book/magazine → Books and Records;
- clothing/look → Hanger Management;
- technology → Gizmos and Gadgets;
- beauty/accessory → CLAiRE'S or MAiYBE;
- experience/ritual → I Know What You Did Last (x30) Summer.

An episode can add:

- a missing reference;
- a better editorial gloss;
- an outfit source;
- a Town Tie from the reference to a real activity; or
- a related-reference rail on the episode.

Do not force a Town Tie. The Mall is allowed to remain a catalog.

### 5. PATRON SAiNT / MAiVEN / TRAiLBLAZER

The weekly engine must decide who carries the teaching move. It need not invent
a new saint every week.

- **PATRON SAiNT** — pop-culture behaviour the reader can borrow.
- **MAiVEN** — a real woman interpreting, researching or critiquing AI.
- **TRAiLBLAZER** — a real woman building the frontier.

A new portrait, bio or song is conditional. The role decision is required. A
history episode can deliberately centre several MAiVENS and have no single
saint, as Episode 4 does.

### 6. Game or owned tool

For an episode-specific companion, the question is not “what game can we
mention?” It is:

> What can the reader do on this site that rehearses this exact skill?

Examples:

- prompting → FAiRY Godmother;
- verifying confident answers → Dream Phone: For Real or As If?;
- looking up a company/model/tool → Ask Jeeves + Who's Who;
- turning intention into a named next step → Girl Talk, when its prompt/dare
  actually moves the episode action;
- picking an approach for a messy problem → Mme CLAi-O only when the current
  mechanic truly performs that job.

If the best answer is the Try-On, use the Try-On. Do not build a second quiz
with a novelty wrapper.

The wider SUNNYVAiLE experience has more than one legitimate job. A feature
may teach, practise, build judgment, create retrieval, activate a next move,
encourage, build belonging or provide deliberate delight. Mme CLAi-O can be
the signature pep talk the visitor needed. Girl Talk can provide courage to do
the AI or career thing. Those outcomes are useful without pretending they are
technical tutorials.

The rule is:

- a feature promoted as an **episode companion** must practise the lesson or
  move the person toward practising it;
- an **evergreen town experience** may serve encouragement, belonging or
  delight without an episode tie;
- every promoted feature declares its honest primary job and successful end
  state; and
- no feature is forced into a weekly episode simply because it is fun.

The full experience contract is
`docs/brand/rewind-era-immersive-experience-principles.md`.

### 7. Postcard

A postcard is selected when the episode creates:

- a scene someone would genuinely send;
- an invitation or friendship message;
- a reusable town view; or
- a line strong enough to become a correspondence ritual.

Comic episode art and painterly postcards use different registers. A promising
episode frame is a **brief for a postcard render**, not automatically the
postcard asset.

### 8. New product, printable or growth asset

Potential derivatives include:

- colouring page;
- printable bookmark;
- worksheet;
- poster;
- sticker/merch draft;
- workshop/class lead-in; and
- partner/guest collaboration.

They remain conditional and outside the teaching critical path. The episode is
not delayed for merchandise.

### 9. Butterfly-clip reward or town drop

Butterfly clips are the town’s universal spendable currency. Charms, stickers,
badges and trading cards remain collectibles rather than competing money.

Every episode defines what meaningful actions can earn clips. A new spendable
offer is conditional: select one only when the reward exists, the price comes
from the shared economy, redemption delivers it where promised and ownership
can be proved.

The Scholastic Book Fair is a strong event shop, not the only possible
destination. KSVL, Chick Flicks, MAiKEOVER/Closet, the Post Office, LIBRAiRY
and the Mall can eventually carry small shelves that match their real jobs.
Core lessons and accessibility never sit behind clips.

Current implementation is partial: the quiz/Express Tour earn path, Clip Jar
and Book Fair spend ledger exist, but Book Fair redemptions do not yet render
their promised objects in the Closet and several reward assets/downloads are
placeholders. The engine must block those promises until fulfilment is real.

The complete economy rule is
`docs/product/butterfly-clip-economy.md`.

### 10. Quotables and memory hooks

Each episode selects a small, strong set:

- one accurate technical memory hook;
- one funny/signature line;
- one final song lyric hook; and
- optional pep-talk, PATRON SAiNT or reference-bridge lines.

They feed **Overheard in SUNNYVAiLE**, restrained episode pull quotes, KSVL
liner notes, MAiKEOVER/Closet, search and rights-safe share cards. Every item
points back to the song, scene or episode so the quote creates replay,
rereading and sharing rather than becoming orphan marketing copy.

The complete system is
`docs/product/quotables-and-memory-hooks-system.md`.

### 11. Building loyalty card

Every building can issue a Rewind Era loyalty/membership card in the Town
Wallet. Stamps record a resident’s relationship with that place. They are not
currency and are never spent.

For each episode, decide whether completing a real action should stamp one
building’s card. A page visit alone is not enough. Examples:

- pick up/complete the Study Pack → Blend & Snap;
- complete the Pop Quiz/class → SUNNYVAiLE High;
- complete the weekly coaster action → BRONZE AiGE;
- finish the episode → Chick Flicks;
- play the current episode song → KSVL.

A filled card may grant a building collectible, experience, title or
butterfly-clip bonus through the shared reward ledger. Seventeen programs must
stay optional depth: the default visit shows the current card and nearest
reward, not seventeen simultaneous progress bars.

The Town Wallet already renders seventeen cards from local visit counts. It
does not yet have qualifying-action stamps, thresholds, fulfilment or
cross-device sync. The complete rule is
`docs/product/building-loyalty-cards.md`.

### 12. Bring Your People connection loop

Every episode decides whether it creates a natural reason to send something to
one person, invite her into town, give her a useful object or complete a
learning action together. Explicit `none` is a good decision; the engine must
not manufacture a referral hook simply because the Post Office exists.

When selected, identify:

- the real relationship action;
- whether it is `sent`, `opened`, `joined` or `activated`;
- which person receives each reward;
- whether the reward is a Post Office stamp, Butterfly Clips, background,
  BEST FRIENDS half or another owned collectible;
- the cap, dedupe and attribution rule;
- the delivery destination; and
- the privacy/abuse boundary.

The original postcard path is the pilot: a capped thank-you and Resident Card
background when an eligible postcard is mailed, then additional clips and
BEST FRIENDS halves for both residents when the friend makes her authenticated
card. The necklace grant works today; the clip, background, durable invitation
state and loyalty-stamp pieces do not yet.

The complete rule is
`docs/product/bring-your-people-reward-loops.md`.

### 13. Behind the Build learning

Every weekly cycle scans the actual work—not merely the finished episode—for:

- failed or misleading prompts;
- unsupported/confident claims caught during verification;
- tool/model surprises or changing facts;
- production/state/deployment failures;
- non-obvious fixes;
- successful patterns worth repeating; and
- human judgments the AI could not make.

Selected learnings enter `operations/painpoints-log.md` with observation
separate from diagnosis. A verified learning must change a prompt, rule, check
or acceptance criterion before it becomes a public founder story.

The public derivative is optional. Strong entries can become **Field Notes from
LAiDIES HQ: Behind the Build**, a NewsStand article, class mistake card,
before/after prompt, carousel or short video. Raw incidents and unverified
causal theories remain internal.

The complete rule is
`docs/product/behind-the-build-learning-system.md`.

## The three audio names that must not collapse

The current system has three different musical jobs:

1. **Series title theme / episode open and close** — fixed for the show.
2. **Wednesday Anthem** — fixed ritual soundtrack.
3. **Episode song** — changes every week and teaches this episode.

It also has a fourth, spoken asset:

4. **DJ SunnyV episode intro** — introduces that week's episode song on KSVL.

The engine must label all four separately. “Song done” cannot mean a track file
exists while the DJ intro is missing and KSVL does not know about it.

The episode song is part of the learning design, not background packaging. It
must work as music someone would choose to replay and carry one to three
accurate hooks from the lesson. Lines such as “It isn’t being difficult. It
isn’t being rude. It just does not know what ‘better’ means to you” and
“garbage in a garbage dress” work because the joke and rhythm make a practical
idea retrievable later. Catchiness earns replay; replay builds memory.

For spoken narration, there are also separate written forms:

| Form | Example |
|---|---|
| Public/article/caption spelling | `LAiDIES`, `SUNNYVAiLE`, `MAiVENS` |
| ElevenLabs ear spelling | `ladies`, `Sunnyvale`, `Mavens` |
| Radio pronunciation | `K-S-V-L, ninety-nine point nine` |

The full narration chain is:

`canonical readable master → TTS performance script → approved audio →
as-recorded transcript → public transcript/captions`.

For homographs, record meaning as well as pronunciation. `read` in the past
tense and `read` in the present tense need different performance direction
even though their public spelling is identical.

The TTS version is derived mechanically. It must never become the source that
rewrites the brand spelling on the website.

### Songs also have three written forms

| Form | Job |
|---|---|
| Canonical lyrics | Human-readable approved words, facts, lesson hooks and public spelling |
| Performance lyrics | Tool-facing phonetic spellings, syllable/stress experiments and structure/delivery cues |
| As-recorded lyrics | What the approved audio actually sings, with public spelling restored and every deviation resolved |

For a word such as `read`, the canon must record whether it means past tense
(sounds like `red`) or present tense (sounds like `reed`). A temporary
performance spelling may help a particular tool, but public lyrics and
captions remain `read`.

Song completion follows
`operations/audio/song-production-reconciliation-protocol.md`. The music
tool’s lyric input is never assumed to be what it actually sang, and neither
one automatically outranks canonical meaning.

### What happens when Ali changes a line in ElevenLabs

| What changed | What the engine updates |
|---|---|
| Pronunciation spelling only | TTS script/lexicon, final audio, timing and captions with restored public spelling |
| Delivery tag, pause or emphasis | TTS script, final audio and timing; no public prose change |
| Spoken rhythm, same meaning | Final audio/captions/timing; article only if the revision also improves or clarifies the readable version; record the deliberate variant |
| Explanation, joke, example or takeaway | Canon first, then article where the beat appears, transcript/captions, learning materials and every exact reuse |
| Fact or caveat | Canon + fact ledger + every surface carrying the claim |
| Cut or new beat | Canon, article, transcript/captions, storyboard, cues, art/video and affected episode extensions |

“Update everything” never means a blind text replacement. It means follow the
changed meaning and its dependencies.

## Where each episode ingredient travels

| Canon ingredient | Primary destinations |
|---|---|
| `meta` | Episode page, archive, homepage, Watch, NewsStand, email, social, SEO |
| `lesson` | Episode, Study Sheet, quiz, cards, homepage, email, social |
| `narrative` | Article, narration, storyboard, captions, video |
| `concepts[]` | Study Sheet, cheat sheet, quiz, cards, glossary, books, class links, search |
| `facts[]` | Article, quiz explanations, Tribune/WEDNESDAY Edition, references, freshness board |
| `comparison/worked_example` | Episode, Study Sheet, Try-On, carousel, class/demo decision |
| `cocktail_party` | Episode, narration, BRONZE AiGE, NewsStand when relevant |
| `try_on` | Episode, Study Pack, Try-On page, email, community |
| `quiz[]` | Pop Quiz, explanations, review links, rewards |
| `track` | Episode tail, KSVL, homepage/ritual, email, social audio callout |
| `quotables[]` | Episode pull quotes, Overheard in SUNNYVAiLE, KSVL liner notes, MAiKEOVER/Closet, search and rights-safe social/share cards |
| `references[]` | Episode credits, LIBRAiRY, Mall, source ledger, internal links |
| `discussion_prompt` | Episode, Delta LAi Nu/community, social comment prompt |
| `patron_saint` | Narrative, LUMINAiRY, cards, KSVL saint tie, search |
| `heroine_outfit` | Storyboard, every heroine scene, Hanger Management/reference bank, credits |
| `pronunciation[]` | ElevenLabs script, DJ intro, caption normalization |
| `artwork[]` | Article, video, poster, OG image, email/social crops, optional postcard/printable brief |
| `social` | Connection-mystery hook, standalone micro-lesson, reach candidate, save/send object, interaction, exact site CTA and return hook |
| `experience_jobs[]` | Promoted game/tool, site copy, analytics event, success state and next action |
| `reward_actions[]` | Clip earning registry, completion messaging, shared transaction ledger and Closet |
| `reward_offers[]` | Shared offer catalog, Book Fair/town shelf, fulfilment destination and ownership record |
| `loyalty_impacts[]` | Building program/action registry, stamp event, Town Wallet card and milestone reward |
| `connection_impacts[]` | Invite/connection program registry, attribution state, reciprocal grants, Post Office/Wallet/Closet |
| `build_learnings[]` | Painpoints/build-learning ledger, updated internal control, Field Notes/NewsStand/class/social derivative |

## Shared claim register and weekly freshness gate

The facts array is not the full denominator. Definitions, product/model
statements, access/price/plan/region claims, policies, attributions, historical
facts, analogy boundaries and semantic image claims may also go stale or
propagate incorrectly.

The Learning System maintains
`operations/product-stewards/learning-content-ecosystem/claim-register.json`
and its consumer graph. AIDB and NewsStand feed bounded signals through the
shared freshness inbox; neither can rewrite durable canon. The weekly engine
runs `scripts/check-content-freshness.mjs` after premise selection and again
before recording/release using
`operations/checklists/weekly-claim-freshness-gate-template.md`.

An affected episode package is held when a material registered claim is due,
stale, conflicted or correction-required, when a material matched signal is
unresolved, or when any affected consumer remains at script-ready,
rebuild-required, owner-review or hold. The machine scan's unregistered
candidates enter prioritized backfill; they are not automatically facts or
release blockers.

The full file/path-level inventory is in `operations/episode-surfaces.json`.

## Social is a ladder, not an announcement

Every weekly batch must consider seven separate jobs:

1. stop someone with recognition or a precise identity truth;
2. make her wonder how a reference and an AI concept are connected;
3. teach one useful idea without requiring the click;
4. earn a save or send;
5. invite a response or community contribution;
6. route her to one exact working episode/feature action; and
7. give her a reason to return next Wednesday.

The signature curiosity structure is:

> What do **[character / film / Rewind Era reference]** and
> **[specific AI concept]** have in common? Find out in this week’s episode.

The connection must be answered by the episode and must help the concept make
sense. It cannot be reference Mad Libs.

The ladder is a decision inventory, not seven new posts. A sustainable 3–5
feed objects plus Stories can carry all seven jobs through adaptation. Each
object still needs one primary success signal.

Before a social CTA is released, the **site-promise gate** opens the exact
public URL and completes the exact advertised action on mobile, desktop and a
clean/logged-out state where relevant. The release record stores the
destination, success state, UTM/event and proof. Fix the destination, change
the CTA or do not publish it.

Detailed rules and the weekly packet live in:

- `social/SOCIAL-CONTENT-LADDER-AND-SITE-PROMISE-GATE.md`
- `social/episodes/episode-social-content-ladder-template.md`

The first large SUNNYVAiLE campaign has one additional system gate because it
is a public reintroduction, not a routine episode promotion:
`operations/launch/sunnyvaile-public-reveal-readiness.md`.

## When the opportunity scan happens

The scan happens **after the substance is approved and before production
fans out**.

That timing matters:

- too early, and the lesson is not clear enough to choose useful extensions;
- too late, and books/classes/charms/social become emergency afterthoughts;
- before the substance gate, it encourages twenty polished outputs from a bad
  lesson.

## Release gates

### Gate 0 — curriculum and substance

- The episode belongs at this point in the 24-episode arc.
- It has one clear purpose.
- The worked example is real.
- The analogy explains rather than decorates.
- A smart non-technical reader can use the lesson within 24 hours.

Nothing else starts if this fails.

### Gate 1 — canon and opportunity decisions

- Facts verified and dated.
- Scope boundaries with neighbouring episodes ruled.
- PATRON SAiNT and heroine outfit decided.
- Every conditional destination selected, deferred or not applicable.
- Required surface count fixed for this episode.

### Gate 2 — scripts

- Written episode and spoken episode derive from the same canon.
- Public spelling and TTS ear spelling are separate.
- Must-match lines agree.
- Teaching, voice and factual checks pass.

### Gate 2B — recording reconciliation

- Final listening edits are recorded and classified.
- Semantic changes are reconciled back into canon.
- Intentional spoken/read differences are explicit.
- The article and downstream semantic surfaces are refreshed as affected.
- No captions, cues or final video are built from an earlier audio version.

### Gate 3 — media clock

- Narration recorded.
- Timing coverage passes.
- Storyboard and cue sheet are built from real audio.
- Art uses the locked cast/outfit/reference set.

### Gate 4 — cut and learning package

- Video cut passes.
- Study Sheet, Study Pack, Try-On, Cheat Sheet, quiz and cards reinforce the
  same lesson.
- Class/book/Mall/game/Tribune decisions are implemented as selected.

### Gate 5 — fan-out

- Song canonical lyrics, performance lyrics, as-recorded lyrics,
  pronunciation map and revision log are reconciled.
- Public lyrics/captions match the final approved song audio after
  public-spelling normalization; tool-facing phonetic spellings and cues do
  not leak into public surfaces.
- Song and DJ intro play from KSVL.
- The song works as replayable music and carries one to three accurate,
  retrievable lesson hooks.
- BRONZE card, charms, Closet quote and community prompt work.
- Butterfly-clip earnings post once, balances agree across town and every
  redemption delivers the real object where promised.
- Any selected loyalty stamp posts only for the meaningful building action,
  appears on the same Town Wallet card and grants its milestone once.
- Any selected connection loop has a real send/join/activation proof, grants
  each named resident once and delivers every promised background or
  collectible before celebrating.
- The episode’s best lesson hook, funny line and lyric hook are source-linked,
  searchable and available to replay/read/share where approved.
- Search/indexes/cross-links return the new topic.
- Email and social packages have final URLs and assets.
- The social content ladder covers curiosity, useful value, reach, save/send,
  participation, site action and return without forcing seven separate posts.
- Every social CTA has passed its exact public destination and action.
- The visit presents one clear next move while optional games, references,
  Easter eggs and town depth remain discoverable without overwhelming it.

### Gate 6 — publish

- Website deployment approved.
- Email/social/external channel actions approved.
- Draft/scheduled/published state is honest.
- If this is part of the initial SUNNYVAiLE reveal, the public-reintroduction
  readiness gate is signed off before growth content is scheduled.

### Gate 7 — public verification

- Public episode, audio, video, captions, resources, search and rewards tested.
- Email is sent/scheduled.
- Social is posted/scheduled.
- Song is playable on KSVL.
- URLs, screenshots or timestamps are stored in the release record.

## Episode 5 — the current opportunity scan

This is a worked application of the map, not a final creative lock.

### Gate 0 currently fails: the scope changed

The current Episode 5 canon says the episode is only the **directory of
stores** and explicitly defers fashion lines/tiering. The latest approved
brainstorm is broader:

- fashion house = AI company;
- supermodel = the actual model;
- line = Opus/Fable/Sonnet-style family;
- season = numbered version/release;
- boutique = a single-house app;
- department store = a multi-provider app;
- specialist shop = image/video/voice/music specialist;
- service level = reasoning effort;
- shopping budget/membership = subscription;
- campaign photograph = frozen training snapshot;
- live inventory check = web research/search;
- September Vogue = launch race and hype.

Those are compatible pieces of one label-reading system, but they are not the
same scope as the existing canon. Before Episode 5 production resumes, the
canon must be re-ruled around one of these shapes:

- **Recommended:** Episode 5 teaches the complete label once—house, model, line,
  season, store, service level, subscription and snapshot—at overview depth.
  Later episodes teach choosing, searching/freshness, specialist tools and
  plans in depth.
- **Alternative:** Episode 5 remains company/model/app only, and the newer
  material is explicitly moved into Episodes 6–8.

The first option best matches the latest conversation: understand the whole
fashion ecosystem now, then go shopping properly in later episodes. It also
prevents the reader from learning “model” without understanding why Opus 4.7,
Opus 4.8, a reasoning control and a subscription plan are different labels.

### Episode 5 opportunity recommendations

| Destination | Recommendation | Current repo state |
|---|---|---|
| **Study Sheet** | A single “read the label” hierarchy: company → app/store → model line → version/season → mode/service → plan/budget | Missing |
| **Try-On** | Open the tool you actually use and identify every label you can see: company, app, selected model/version, mode and plan. Then ask whether it can search live. | Existing Ep5 JSON has an older work-vs-personal comparison |
| **Cheat Sheet** | “What am I choosing?” shopping receipt with the six labels and when each matters | Missing |
| **Quiz** | Scenarios that distinguish company/app/model/line/version/mode/plan and stale-training vs live search; no supermodel trivia | `issue05` absent |
| **Cards** | Hierarchy card, Seasons card, Service-Level card, Snapshot-vs-Live card and Samantha card | Ep5 pack absent |
| **Vocab 101** | Add/revise: provider/company, app/tool, model, model line/family, version, reasoning effort/mode, training cutoff, web search, subscription/plan | Not done |
| **Concepts 101** | Add model lifecycle and “frozen snapshot versus current lookup” | Not done |
| **Who's Who in AI** | Update the relationship among companies, products and model families; keep volatile version numbers in the current-models callout | Live book exists; needs Ep5 pass |
| **New Models 101 book** | **Yes.** This episode owns a durable lookup job large enough for a separate textbook. It should not become five vendor books in one week. | No Models 101 book exists |
| **SUNNYVAiLE High** | Link and update `basics-what-youre-looking-at` and `basics-versions-and-cutoffs`; later connect tool-specific “Same Question, Two Answers” classes to model pickers | Both Basics classes already exist in the registry; first scripted, second proposed |
| **Tribune** | **Strong opportunity:** “The September Issue Problem — when a new AI model drops, what actually changed?” Separate launch hype, benchmark claims, training snapshot, product access and practical improvement. | No Ep5 Tribune story |
| **WEDNESDAY Edition** | Announce the episode and its practical label-reading guide; do not reproduce the Tribune argument | Missing |
| **BRONZE AiGE** | Add the final model/app/line/version cocktail explanation | Wall ends at Episode 4 |
| **PATRON SAiNT** | Keep **Samantha Jones — Orientation / The Publicist** if the new scope still uses her to read the room, labels and occasion | Canon names Samantha; portrait, saint song and DJ saint intro already exist |
| **Mall** | Keep the Supermodels listing; add the Vogue September Issue to the live Books and Records shop; confirm America's Next Top Model if used; cross-link outfit source | Supermodels are already live in Rollin' with my Homies; Vogue is in the inventory plan but not the current live shop |
| **Heroine outfit** | Best existing candidate to approve: the Michele/Romy 1997 laundromat fashion look from `iconic-outfit-04`—fashion-led, non-corporate and already tied to a live Mall film reference. Lock one exact side of the reference. | Ep5 canon has no `heroine_outfit` section |
| **Owned activity** | Promote Ask Jeeves + Who's Who and the two relevant High classes. Do not force Dream Phone or FAiRY Godmother into a lesson they do not practise. A Fitting Room model-picker can belong to the later choosing episode. | No current Ep5 activity link |
| **Postcard** | Defer unless a clean painterly Mall/runway scene is commissioned. The existing tech-runway hero is comic episode art, not postcard art. | No Ep5 postcard |
| **Episode song** | New song around “same house, new season / read the label / different store.” Keep it distinct from the fixed Wednesday Anthem. | Canon says pending; no file or KSVL entry |
| **DJ episode intro** | Record the Ep5 DJ SunnyV intro after the song/title lock | KSVL intros stop at Episode 4 |
| **Series title track** | Reuse the existing series intro/outro; do not create a new one every episode | Existing |
| **Visuals** | Rebuild the visual plan only after the new scope and outfit lock. Preserve the strong runway/department-store seed, then add explicit line, season, service, subscription and snapshot/live beats if they remain in Ep5. | A 33-shot storyboard and one hero seed exist, based on the older scope |
| **Social connection mystery** | “What do the September issue and a new AI model release have in common?” The episode must genuinely answer it. | Social fields blank |
| **Social Reel** | Fast visual translation: house → supermodel → line → season → boutique → service → budget; optimize for recognition and useful curiosity | Social fields blank |
| **Social carousel** | “Model, version, mode or plan? Read the label before you compare prices.” | Missing |
| **Story poll** | “Do you know which model you are using right now?” then reveal where to look | Missing |
| **Standalone value** | One label-reading move that helps even if the viewer never clicks; the click gets the complete fitting-room lesson | Missing |
| **Feature route** | Send to the exact Episode 5/Models 101/High destination that is publicly complete; do not advertise an unwired fitting room | Not yet verified |
| **LinkedIn** | Why model literacy is practical procurement/delegation literacy, not tech trivia | Missing |
| **Search** | Add Episode 5 and every new concept/resource to both indexes; correct stale Episode 4 search copy while in the same fan-out | `site-index.json` has no Ep5 and describes an older Ep4; `content-registry.json` stops at Ep2 |
| **Homepage/archive** | Populate issue URL, modules, song and release state only after canon lock | Episode index has Ep5 draft with null page/modules/song |
| **Email/community** | Wednesday route plus “what label did you discover you were actually using?” discussion | Community prompt is null |

### Proposed Episode 5 charm set

The current charm mechanic is not one episode charm. It is **seven charms per
week across seven buildings**. Weeks 1–4 are wired; Episode/Week 5 is not.

Recommended working title: **The Runway Set**

| Building | Proposed charm | Why it fits |
|---|---|---|
| MAiKEOVER | Compact Mirror | The face in the campaign window |
| Post Office | Model Comp Card | The model's calling card |
| BRONZE AiGE | Backstage Pass | The room after the runway |
| Mme CLAi-O | Catwalk Heel | The “which line is walking in?” clue |
| Delta LAi Nu | September Issue | The launch everyone is talking about |
| Town Hall | Mall Directory | Company/store/model orientation |
| Chick Flicks | Runway Tape | The episode/show artifact |

These names are proposals, not locked art direction. At present none of the
seven is rendered or wired. The engine must not mark “charms done” until:

- seven `w5-*` entries exist in `content/site/charm-hunt.js`;
- a Week 5 title exists in its `WEEKS` array;
- seven matching files exist in `assets/charms/`;
- coordinates are calibrated on the current building heroes;
- collection events appear in the Closet/Resident Card; and
- all seven can be found in a clean browser test.

## Current engine coverage and the holes this map closes

### Already useful

- `scripts/build-episode-assets.js` generates the issue page, episode index,
  site data, Buttondown draft, Instagram kit, LinkedIn draft and community
  prompt.
- `scripts/run-weekly-production.js` checks those outputs plus quiz/card-pack
  presence and creates review material.
- `scripts/check-town.js` catches several cross-site parity failures.
- Audio alignment, cue checks, art batching and frame QA already exist.
- Episode canon files already hold most teaching fields.

### Still structurally missing

- The live generator reads independently authored issue JSON rather than canon.
- There was no surface denominator; `operations/episode-surfaces.json` now
  supplies the inventory, but no checker consumes it yet.
- The old weekly script checks only a fraction of the destinations in this map.
- No engine record distinguishes selected/deferred/not-applicable opportunities.
- Pronunciation differences are embedded in TTS files rather than held in a
  reusable lexicon.
- ElevenLabs listening edits do not yet have a revision log or a reverse-sync
  gate, so a better spoken line can silently leave canon/article/captions stale.
- Study Packs are not yet a consistent data-driven bundle.
- Shared files have no episode-level provenance/hash markers.
- External release state—email, socials, KSVL, podcast/YouTube—is not proven in
  one release record.
- Social formats exist, but no required weekly object currently proves all
  seven social jobs or that each advertised site action works through the
  public campaign link.
- The initial SUNNYVAiLE reveal does not yet have a single signed gate covering
  the narrative reset, the retired Grimoire context, promised journeys,
  backend plumbing and post-reveal stability.
- Butterfly-clip earning/spending exists in local form, but it is not yet one
  cross-device transaction ledger; Book Fair redemption currently subtracts
  clips without rendering the promised object in the Closet.
- Episode `quotables[]` and one Resident Card favorite exist, but no derived
  source-linked registry/showcase makes the best jokes, lyrics and memory hooks
  discoverable, searchable and shareable.
- The Town Wallet has seventeen membership cards and passive visit counts, but
  not a shared loyalty-stamp/action/milestone system; several current `Regular`
  badges also count only within one session.
- The postcard → MAiKEOVER → BEST FRIENDS join path exists, but postcard sends
  and joins do not yet post Butterfly Clip transactions, backgrounds are not
  owned/locked rewards, and durable opaque invitation state does not exist.

## Build sequence for the engine

The map is designed so the implementation can proceed without another
dashboard.

1. Make `issue-0N.json` a derived artifact from `episode-0N.canon.md`.
2. Create the per-episode opportunity scan immediately after substance
   approval.
3. Add the recording revision log and post-listen reconciliation gate before
   caption/timing generation.
4. Teach a checker to read `operations/episode-surfaces.json` and report:
   `missing`, `untracked`, `stale`, `selected-incomplete` and
   `decision-missing`.
5. Add provenance markers/hashes to generated files and episode regions inside
   shared files.
6. Generate the social content-ladder packet and require exact public
   destination proof for every released CTA.
7. Build the source-linked quotables registry/showcase, episode
   butterfly-clip action record, building-loyalty impact decision and
   connection-impact decision.
8. Reconcile the Butterfly Clip ledger, building stamp ledger, connection
   attribution/reward grants, Book Fair fulfilment and Closet before promoting
   town-wide spending or referral rewards.
9. Expand the existing build to the fixed learning, town, audio, search and
   distribution package.
10. Write one release record per episode with local and public proof.
11. Put the surface check, link/cue checks and public smoke checks before ship.
12. Sign off the one-time SUNNYVAiLE public-reveal gate before the first growth
    campaign.
13. Only after one complete Episode 5 run, schedule the resumable weekly engine.

## Definition of done

The Wednesday Engine may say:

> Episode NN is ready to publish: every surface currently marked required in
> the manifest is complete; every selected opportunity is complete; every
> deferred/not-applicable decision has a reason; teaching, fact, media, search,
> reward and accessibility gates passed. Exact counts are generated from the
> current manifest rather than hard-coded in this message.

It may not say:

> Everything looks done.
