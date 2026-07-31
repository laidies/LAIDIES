# SUNNYVAiLE High ↔ Blend & Snap Quiz/Study Pack interface

**Status:** SPECIFIED — SAFE CONTENT/STATE INTERFACE; VISUAL RESTYLE AND
PRODUCTION-ASSET WORK HELD FOR BRAND RULING  
**High owner:** `sunnyvaile-high`  
**Receiving owner:** `blend-snap` / Study Pack  
**Assessment owner:** Pop Quiz / learning review under SUNNYVAiLE High  
**Shared visual authority:** Brand & Experience Director; Ali retains the
sitewide Brand ruling  
**Evidence time:** 2026-07-26 13:19–13:25 PDT (America/Vancouver)  
**Trigger:** Ali requested better Study Pack-related visuals for Episodes
01–04 and future; Quiz remains beside the Study Pack and needs a safe visual
and functional handoff.

This record is the durable High-side interface. It does not authorize Blend &
Snap to embed the Quiz, inspect results, award rewards, copy High assets or
select a sitewide visual language.

## 1. Locked product relationship

- The Study Pack coordinates compact review, applied practice, durable
  reference and memory reinforcement. The Quiz is a separate assessment at
  SUNNYVAiLE High. `LOCKED LEDGER`
- Blend & Snap may expose the Quiz's episode identity, learning objective,
  availability, CTA and return expectation. It must not render quiz questions,
  score, explanation, sticker, butterfly rating, Report Card or completion
  state. `LOCKED LEDGER`
- Following a Quiz link is navigation only. It is not Study Pack completion,
  café progress, learning completion or reward. `LOCKED LEDGER`
- High owns the selected paper, question/explanation/result state,
  persistence scope, retry, reward truth and correction. `APPROVED BRIEF/ARTIFACT`
- Episode, Study Pack and Quiz may form one recognizable weekly family after
  the Brand ruling, but their different jobs must remain visible before a
  click. `APPROVED BRIEF/ARTIFACT`

## 2. Current Episodes 01–04 interface inventory

| Episode | Canonical identity | High quiz key/title | Recovered learning objective for interface copy | Current Blend status/route | Safe current CTA |
|---|---|---|---|---|---|
| 01 | `1` · `on-wednesdays-we-use-ai` · **On Wednesdays We Do AI** | `issue01` · **Opening the tab without making it a whole personality crisis.** | Distinguish generative AI from search, choose a low-risk first task, compare outputs while keeping human judgment, and explain why starting builds agency. | `available` · generic `/learn/quiz.html#quiz-start` | **Choose the Episode 01 paper at SUNNYVAiLE High →** |
| 02 | `2` · `tell-me-what-you-want` · **Tell Me What You Want** | `issue02` · **Tell me what you want, but make it painfully specific.** | Turn a vague ask into clear delegation using context, output, constraints and iteration; recognize that tool capability remains uneven. | `available` · generic `/learn/quiz.html#quiz-start` | **Choose the Episode 02 paper at SUNNYVAiLE High →** |
| 03 | `3` · `the-burn-book-problem` · **The Burn Book Problem** | `issue03` · **The Burn Book Problem** | Separate draft, claim and receipt; verify source/date/high-stakes facts; recognize that confidence or repeated asking is not evidence. | `available` · generic `/learn/quiz.html#quiz-start` | **Choose the Episode 03 paper at SUNNYVAiLE High →** |
| 04 | `4` · `the-founding-mothers` · **The Founding Mothers** | `issue04` · **Almost two hundred years of women built this. Pop quiz.** | Connect named women's contributions to computing/AI mechanisms, distinguish tools and historical periods, and explain why representation in data and building matters now. | `available` · generic `/learn/quiz.html#quiz-start` | **Choose the Episode 04 paper at SUNNYVAiLE High →** |

The recovered objectives summarize current question coverage for interface
orientation. They are **CANDIDATE LEARNING OBJECTIVES**, not independent
assessment admission. The Quiz owner must reconcile each objective against the
episode canon, concept map and item-level learning evidence before publication
copy treats it as admitted.

Every current Episode quiz has 10 core points plus 2 bonus questions, a
question-level explanation and a reread destination. Current deterministic
tests establish dataset parity and explanation/review presence, not item
validity, transfer or mastery.

## 3. Material current-state defect

All four Blend & Snap manifest rows currently use:

```text
/learn/quiz.html#quiz-start
```

The High page does not parse that route into an episode selection. The visitor
arrives at the generic five-paper chooser and must select the named Episode
again. Blend's current `Episode NN Pop Quiz · Ready next door` label therefore
preserves identity in the café but not through the arrival.

### Safe interim contract

Until the episode-aware route is implemented and accepted:

- status: **Quiz chooser available at High**;
- CTA: **Choose the Episode NN paper at SUNNYVAiLE High →**;
- route: `/learn/quiz.html#quiz-start`;
- helper: **The Quiz is beside this Study Pack, not part of it. High opens its
  paper chooser; select Episode NN.**;
- return: browser Back only; do not promise a dedicated café return;
- success claim: none at Blend & Snap.

Blend & Snap must not say “Open Episode NN Quiz” or “Start Episode NN Quiz”
while the route opens only the generic chooser.

## 4. Target episode-aware route contract

The build-required interface is:

```text
/learn/quiz.html?quiz=issueNN&from=blend-snap#quiz-start
```

High requirements:

1. accept only a released/admitted allow-listed `issueNN` key;
2. render that episode's identity before the first question;
3. open the exact paper without a second chooser action;
4. preserve Change paper as an explicit visitor choice;
5. reject unknown, missing, held or mismatched keys into the generic chooser
   with a visible “that paper is unavailable” state;
6. never accept question, score, answer, sticker or reward values from the URL;
7. attach source context only as navigation metadata—never assessment or
   reward authority; and
8. expose an explicit return after result/review:
   **Back to Episode NN's pack menu at Blend & Snap**.

Blend & Snap requirements:

1. build the route only from the validated manifest's numeric episode and the
   High-owned `quizKey`;
2. enable the CTA only when High has admitted the exact episode identity and
   route;
3. never use its local `laidies_bs_last_pack` marker as quiz state;
4. restore the exact Episode receipt only after Blend implements and tests an
   allow-listed episode receipt URL/state;
5. treat missing/held/mismatched High admission as a non-link status;
6. do not consume query values returned from High as completion; and
7. revalidate the route whenever episode identity, quiz admission or
   correction state changes.

The target return route is **not yet selected or supported by the live café**.
The Blend owner must choose and test an exact allow-listed form such as an
episode-aware receipt URL; High must not invent one in production.

## 5. Required handoff fields

| Field | Type/rule | Source owner | Consumer behavior |
|---|---|---|---|
| `episodeNumber` | Integer, released episode | Episode index | Display `Episode NN`; reject mismatch |
| `episodeSlug` | Exact canonical slug | Episode index | Identity/parity only; not a route authority by itself |
| `episodeTitle` | Current admitted display title | Episode index | Live text; never baked into shared art |
| `quizKey` | `issueNN`, exact High allow list | High Quiz | Builds target route only after admission |
| `learningObjective` | Short, learner-facing, owner-admitted | High Quiz/learning review | Explains what will be checked; no mastery claim |
| `status` | `available`, `held`, `planned`, `unavailable` | High admission exposed through reconciled manifest | Only `available` may link |
| `statusLabel` | Plain visitor truth | High + Blend reconciliation | Must name chooser versus direct paper accurately |
| `ctaLabel` | Verb + exact destination/result | High interface | “Choose…” until direct route exists; “Take…” only after it does |
| `quizRoute` | Same-origin allow-listed High route | High | No arbitrary external or user-authored route |
| `returnExpectation` | Browser Back or admitted exact café return | Both owners | Never imply result sync |
| `visualStateId` | `quiz-entry`, `quiz-active`, `quiz-result-local`, `quiz-reward-local`, `quiz-unavailable` | High | Allows coordinated framing without sharing state authority |
| `checkedOn` / `recheckOn` | Real dates with source/admission interval | High/manifest owner | Fail closed after expiry or mismatch |

No result field crosses into Blend & Snap. In particular, `score`,
`bestScore`, `attempts`, `stickerTier`, `butterflyRating`,
`laidiesQuizProgress`, `laidiesQuizBestScores` and any future account reward
event are prohibited café inputs.

## 6. Current visual inventory

### Entry

| Element | Exact current evidence | Observed job | Limitation/disposition |
|---|---|---|---|
| Schoolroom hero | `assets/building-interiors/sunnyvaile-high-pop-quiz.jpg` · 1500×1000 · SHA-256 `3930a172…e553b2` | Establishes High classroom, Scantron desk and Wednesday ritual | Shared across every episode; embedded school text cannot carry dynamic episode/status truth; provisional under Brand lock |
| Paper chooser | Live HTML in `learn/quiz.html`; five ruled register rows | Names Foundation and Episodes 01–04 | Episode identity exists only here after generic Blend arrival; no episode art |
| Entry palette/type | `content/site/quiz-v2.css`: ink, vivid pink, purple, cyan, cobalt, coral, mint; Anton/Jost; squared registers | Separates school/assessment from café receipt | Current implementation, not approved Brand standard |

### Active question and explanation

| Element | Current treatment | Handoff rule |
|---|---|---|
| Question sheet | Live ruled-paper fieldset with cobalt edge; coral bonus edge | High-owned semantic assessment surface; Blend may echo only the episode identity/objective |
| Options | Native radio inputs in linear rows | Never reproduce as Study Pack decoration or preview |
| Explanation | Correct/not-quite, correct answer, meaning and exact review link | Result remains at High; Blend does not summarize correctness |
| Controls | Back/Next, Check my score, Retake, Reread Episode | Shared visual family may coordinate transition framing after Brand ruling; verbs and behavior remain High-owned |

### Result and reward

| Element | Exact current evidence | Current truth | Disposition |
|---|---|---|---|
| Result card | Live score, rating and persistence copy | Browser/device or open-session scope | High only; no café result badge |
| Butterfly rating token | `assets/butterfly-clip-rating-token.png` · 1254×1254 · SHA-256 `f61f1cf5…62fc3f` | Repeated just-for-fun rating; copy explicitly says not a stored Clip balance | Never use as Study Pack completion, spendable balance or pack status |
| Temporary sticker sheet | `assets/quiz-sticker-sheet.png` · 1024×1536 · SHA-256 `b2ca7b49…d1b34c` | Same glossy sheet behind every score tier, with live tier label | Temporary surface only; not a final tier asset or Brand reference |
| Planned tier stickers | Six paths in `CURRENT-PRIORITIES.md` | Distinct score-tier collectibles | Production held for Brand ruling and independent visual/reward review |
| `quiz-teen-magazine.png` | 1537×1023 · SHA-256 `e5db20fb…1aea7` | Unused asset; generated magazine scene with people and blank/fake content areas | Do not use as Study Pack or Quiz source/reference without explicit canon, rights and Brand admission |
| Celebration | Live deterministic star/plus particles, reduced-motion governed | Playful local result emphasis | Cannot communicate score, reward or completion alone |

There are no Episode 01–04-specific quiz entry, result or reward visuals.
Current differentiation is live episode text and question content only.

## 7. Visual-family handoff rules

These rules permit content/state planning now without selecting the future
style:

1. **Share episode identity, not ownership.** Episode number, title and admitted
   objective may use the same live-text identity strip across the Study Pack
   receipt and High arrival. High adds the explicit `POP QUIZ · SUNNYVAiLE
   High` destination.
2. **Preserve place change.** The café CTA should visibly hand off from receipt
   to school paper; the Quiz must not look embedded in the café menu.
3. **Keep one weekly family through bounded tokens only.** After Brand ruling,
   Brand may specify a shared episode accent, edge/label grammar, transition
   marker or textless motif. It may not force identical layouts or share
   dynamic status inside raster art.
4. **Keep operational truth live.** Episode, objective, availability, direct
   versus chooser status, CTA and return are HTML/text/state—not pixels.
5. **Keep assessment semantics distinct.** Study Sheet = review; Try-On =
   practice; Cheat Sheet = reference; Cards = memory/collection; Quiz =
   assessment. No shared checkmark, “complete pack” ribbon or progress meter
   may collapse them.
6. **Keep result/reward at High.** Score, explanation, butterfly rating and
   sticker reveal never appear on the Blend receipt, including as a teaser.
7. **Keep collectibles distinct.** Quiz stickers are not hidden charms, merit
   badges, Trading Cards or spendable Butterfly Clips.
8. **No inherited Brand winner.** Current painterly, comic, hybrid, High and
   Blend candidate treatments are provisional. This interface cannot name any
   one of them the family.
9. **No copied production art.** Blend may not reuse the High classroom,
   Scantron, sticker sheet, butterfly token or unused magazine asset as its
   Study Pack visual without a placement-specific Brand/rights/product
   decision.
10. **Accessibility survives art failure.** Episode identity, objective,
    status, CTA and return remain complete with images blocked, at 320px, 200%
    zoom, keyboard, screen reader and reduced motion.

## 8. State and copy matrix

| High quiz state | Blend receipt status | CTA | High arrival | Return |
|---|---|---|---|---|
| Generic chooser only (current) | `Quiz chooser available at High` | `Choose the Episode NN paper at SUNNYVAiLE High →` | Five-paper chooser; visitor selects NN | Browser Back only |
| Exact episode route admitted | `Episode NN Pop Quiz ready at High` | `Take the Episode NN Pop Quiz →` | Exact episode identity and paper open | Exact admitted café return |
| Held/planned | Plain reason; no link | None | No arrival promised | Continue with another available pack component |
| Unavailable/corrected/expired | `Quiz unavailable while High checks this paper` | None | If stale deep link: named unavailable + chooser/episode alternative | Safe return to café/episode |
| Completed locally | Blend remains unchanged | No completion treatment | Explanation, local result, retry, reread | Return does not mark pack complete |
| Storage denied | Blend remains unchanged | No completion treatment | Session-only result and loss-on-reload truth | Return does not import session state |
| Account reward pending/refunded/revoked | Blend remains unchanged | No reward treatment | High/Platform-owned status only | Café receives no event |

## 9. Acceptance contract

Before Blend switches from the safe interim CTA to the target direct CTA:

- High owner approves exact `episodeNumber ↔ slug ↔ quizKey ↔ objective`
  records for Episodes 01–04;
- Quiz/learning judge accepts the objective and item alignment;
- High implements allow-listed episode selection and stale/unknown fallback;
- Blend implements exact receipt restoration or explicitly retains browser
  Back;
- tests prove all four routes open the correct paper and mismatches fail
  closed;
- result/reward data never appears in Blend storage, DOM, analytics or copy;
- image-blocked, 320/390, native 200%, keyboard, VoiceOver/Safari and reduced
  motion handoffs pass;
- Brand supplies the post-ruling transition/token rules and an independent
  judge admits the exact visuals; and
- exact source, artifact and public-origin routes pass separately.

Minimum deterministic additions:

```text
for NN in 01 02 03 04:
  Blend validated receipt → exact High issueNN paper → explanation/result →
  admitted return or explicit browser Back

unknown/missing/held/mismatched quiz key:
  no wrong paper; named fallback; no completion/reward write
```

## 10. Owner handoff

**Blend & Snap may consume now:**

- the episode/objective matrix as **SPECIFIED CANDIDATE COPY**;
- the safe interim CTA/status/helper language;
- the rule that no High result or reward state crosses into the café; and
- the visual-family invariants for Brand briefing.

**Blend & Snap must wait for High before consuming:**

- a direct `?quiz=issueNN` route;
- an admitted learning-objective claim;
- exact return-route behavior; and
- any visual token or asset described as final.

**High must deliver next:**

- item-level objective/admission reconciliation;
- the episode-aware route/fallback implementation packet;
- return-route coordination with Blend;
- final six reward-sticker placement brief after Brand ruling; and
- independent assessment, accessibility, visual and public-origin evidence.

## 11. Evidence and learning scan

Evidence inspected:

- `content/blend-snap-weekly-packs.json`;
- `content/site/quizzes.json` and runtime parity in `content/site/site-data.js`;
- `blend-snap.html`, `learn/quiz.html`, `script.js`,
  `content/site/quiz-v2.css`;
- the four current raster assets inventoried above;
- High and Blend product dossiers, Brand global visual lock and
  `CURRENT-PRIORITIES.md`;
- `node scripts/test-sunnyvaile-high-contract.mjs` — **PASS, 13 checks**;
- `node scripts/test-blend-snap-cross-entry.mjs` — **PASS, 54 checks**.

Learning scan: this cycle reuses BTB-088 (one learning system), BTB-133
(owner-entry handoff), BTB-135 (complete cross-page touchpoint) and BTB-139
(unruled global style). The generic-route identity loss is a concrete instance
of those existing controls, not a new prevention class; no new painpoints
entry was added.
