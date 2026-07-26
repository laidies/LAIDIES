# SUNNYVAiLE High operating specification

**Status:** SPECIFIED — bounded class-route and device-local learning-record
repairs are VERIFIED LOCALLY; promotion remains **HOLD — FIX BEFORE PROMOTION**.

## Product job

SUNNYVAiLE High is LAiDIES' applied-learning building. It should let a learner
see a real task demonstrated, practise judgment, inspect feedback, retry, and
choose a useful next experience. It complements rather than duplicates:

- Chick Flicks/episodes: sequenced story and narration;
- LIBRAiRY: durable reference and conceptual retrieval;
- NewsStand: timely evidence and changing developments; and
- FAiRY/tools/games: immediate help or practice in their own product jobs.

A visit, class-preview view, quiz attempt, score, sticker, clip, report-card
grade or superlative is not proof of mastery.

## Current inventory and admission

- Canonical class register: `content/site/high-classes.json`.
- Current register: 4 subjects, 37 planned class rows, zero `live` rows, zero
  videos and zero verified dates as of 2026-07-25.
- Classroom route: `/learn/class.html?c=<slug>`.
- Quiz source: `content/site/quizzes.json`, with the runtime copy in
  `content/site/site-data.js`.
- Building and report-card route: `/sunnyvaile-high.html`.

The register and written production previews may be visible only as plans.
They must not be described as playable, finished, current or editorially
approved classes until a row has a real video, filmed date, current
verification date, source packet and the required learning review.

## Journeys and authoritative outcomes

| Journey | Authoritative local outcome | Current boundary |
|---|---|---|
| New learner → High | Understand that written class previews and quizzes are available, while no tape is playable. | VERIFIED LOCALLY at 320/390px Chrome; public/Safari/screen-reader proof open. |
| Learner → class slug | See the matching registered preview, its intended objective and explicit production status. | Unknown, empty and non-OK registers fail closed; no fallback to an unrelated class. |
| Learner → class TV | Open a labelled production-status dialog for an unfilmed row; close by button, backdrop or Escape; focus returns to TV. | It is not a class start/completion and does not award progress. |
| Learner → quiz | Answer every question, then inspect correct answer, explanation and review destination/hold. | Quiz is recall/judgment practice; content validity remains item-specific. |
| Returning learner → quiz | See attempts, latest and best score stored by this browser; retry can improve local best. | Local storage can be cleared and is not cross-device/account authority. |
| Returning learner → scorecard/yearbook | See a playful derivation from local quiz records with the limitation beside it. | Not a permanent record, ranking, capability judgment or mastery credential. |
| Reward/Book Fair | See only device-local collectible language or an honest unavailable/stocking state. | No authoritative grant/spend/refund/fulfilment ledger is proven. |

## Learning contract

Every admitted class or quiz follows
`operations/product-stewards/LEARNING-CONTENT-STANDARD.md`. A substantial item
must provide:

1. learner, prerequisite and named objective;
2. a correct mental model and adjacent distinctions;
3. current primary/official evidence with checked/recheck dates where needed;
4. a demonstration or modality advantage that cannot be replaced by a
   paragraph;
5. mechanism before analogy, plus the analogy's limit;
6. misconception, uncertainty and misleading-claim resistance;
7. explanation after assessment, not only right/wrong;
8. an application or transfer task;
9. a way to explain the concept accurately to another person; and
10. a useful next route that exists now, or an explicit hold.

The 37-row register does not currently satisfy this gate as an inventory.
Only 21 rows have any `learn` list, 2 have a mechanism, 2 have a demonstration,
none has a ready video, and none has a verified date. A rendered preview is
therefore not an approved lesson.

Every quiz question must have a unique ID, offered answer, explanation and
review destination. A future bonus may omit a URL only when it has an explicit
`held-future-episode` status and tells the learner the episode is not
published. Core points must equal the quiz `maxScore`.

## State, identity and reward contract

- `laidiesQuizProgress` is the current browser-local record for attempts,
  latest/best score, completion timestamp and playful sticker metadata.
- `laidiesQuizBestScores` is a legacy local best-score fallback.
- The Report Card and Yearbook derive from those stores; they do not create a
  second ledger.
- `laidies_display_name` may personalize the device-local scorecard. The High
  must not inspect an authentication token or derive a name from an email to
  decorate a local record.
- Current local completion may mark the Wednesday ritual on this device, but
  it cannot claim account-wide ritual completion.
- Plausible may receive the quiz key for an aggregate completion event, not
  raw answers or the learner's score.
- Existing account/reward sync code is not an accepted cross-device contract
  until Identity/Rewards proves entitlement, idempotency, duplicate, offline,
  refund, insufficient-balance and two-account/two-device behavior.
- Book Fair/Clip Exchange remains labelled or unavailable until stock,
  spending and fulfilment are real.

## Failure and recovery

- Non-OK, empty or malformed class register: show an unavailable state,
  disable the TV and offer independent 101/quiz routes.
- Unknown class slug: do not silently substitute the first row.
- Unfilmed class: present a production-status card, never a play/completion
  event.
- Quiz incomplete: do not score or write progress; identify unanswered work.
- Storage unavailable/corrupt: keep the quiz usable and show no durable claim.
- Current source/review unavailable: hold the item rather than invent a route.
- Clearing storage: local scorecard may reset; the visible copy states this.

## Accessibility and responsive contract

- Class dialog follows the W3C modal-dialog pattern: focus moves inside, Tab
  stays inside, Escape closes, and focus returns to the invoking TV.
- All quiz questions use grouped native radio inputs and expose answer
  explanations after submission.
- Corridors preserve `aria-expanded`/`aria-controls`; reduced motion removes
  nonessential transition reliance.
- Test at 320px reflow, 390px mobile and desktop; include keyboard, 200% zoom,
  screen-reader and Safari before promotion.
- A test passing in headless Chrome is not VoiceOver/Safari proof.

## Visual and brand contract

The schoolhouse, AV cart, scorecard and yearbook are memory aids. They must
support rather than obscure the learning action. The voice can be warm,
nostalgic and funny, but cannot shame a low score, imply a permanent record,
turn a playful superlative into capability judgment, or make a production
preview look like a released tape. New class media or hero visuals require the
applicable creative and media-quality approval.

## Evidence, analytics and upkeep

- Deterministic contract: `node scripts/test-sunnyvaile-high-contract.mjs`.
- Local browser journey:
  `HIGH_PLAYWRIGHT_ROOT=<temporary-package-root> HIGH_URL=<local-origin> node scripts/test-sunnyvaile-high-browser.mjs`.
- Aggregate measures proposed for Platform/Privacy approval: route selected,
  preview opened, quiz started/completed, explanation reviewed, retry and
  unavailable state. Exclude answers, scores, prompts, names, email and
  inferred capability.
- Class facts, UI paths and sources recheck at the row's declared volatility
  window and before filming/publication.
- Quiz review links recheck when an episode changes state.
- Weekly episode ingestion may add a quiz only after the episode and review
  destination are publicly admitted.

## Dependencies and ownership

- High champion owns the building and this contract.
- Classes sub-champion owns class source packets, demonstrations and tapes.
- Pop Quiz sub-champion owns item validity, explanation and assessment review.
- Identity/Rewards owns account scope and authoritative reward events.
- Book Fair owns stock, spending and fulfilment.
- Library, Episodes and NewsStand own their distinct content jobs.
- Platform Reliability owns exact artifact, deployment and public-origin proof.

## Release gate

The current bounded P0 repair may advance to independent review, but the High
remains **FIX BEFORE PROMOTION** until:

1. the exact artifact serves the building, class route, register and quiz;
2. at least one representative class has passed sources, instructional design,
   demonstration, transcript/captions, media and unfamiliar-learner transfer;
3. representative quiz items pass independent accuracy and assessment review;
4. the claimed identity/reward scope passes its real duplicate/failure/device
   suite, or all account/reward claims remain removed/labelled;
5. 320px, 390px, desktop, 200% zoom, keyboard, reduced-motion,
   screen-reader/Safari and network/storage recovery pass;
6. an independent judge accepts product, trust, brand, UX/accessibility and
   technical evidence; and
7. the deployed origin passes the same bounded journey.

No local file, test, commit, push or deploy proves public readiness.

## Source trail and freshness

- LAiDIES learning standard and High charter/deep dive, read 2026-07-25.
- W3C, “Dialog (Modal) Pattern,” accessed 2026-07-25:
  `https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/`.
- W3C, “Web Content Accessibility Guidelines (WCAG) 2.2,” accessed
  2026-07-25: `https://www.w3.org/TR/WCAG22/`.
- OpenAI, “Memory FAQ,” accessed 2026-07-25:
  `https://help.openai.com/en/articles/8590148-memory-faq`. It confirms that
  memory behavior and controls change over time; product-specific teaching
  rows remain held pending fresh source review rather than being approved by
  this operating-spec cycle.

