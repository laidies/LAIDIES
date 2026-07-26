# Independent review — SUNNYVAiLE High P0 learning ledger

**Date:** 2026-07-25  
**Reviewer role:** independent product, learning, trust and accessibility judge  
**Candidate evidence:** `build-evidence-p0-learning-ledger-2026-07-25.md`  
**Boundary:** source inspection, deterministic local tests, a fresh local public
artifact and synthetic browser journeys only; no maker/state/queue edit,
credentials, deployment, publication, external mutation, visuals or Git

## Verdict — FAIL / HOLD

The candidate makes a substantial and truthful improvement to class
availability, failure handling, quiz feedback and device-local record copy.
The exact local artifact contains the repaired source, the core class route
fails closed, the quiz explains every answer, and the current inventory is
honestly zero live tapes.

It does not yet pass independent promotion review. Five user-facing defects
remain:

1. a seeded Report Card says calculated butterfly clips are “banked this
   season” and “fill your Closet jar,” although no authoritative reward
   grant/display connection is proven;
2. the Yearbook introduction says the superlative is “not a vote,” while the
   dynamic result is labelled “Voted Most Likely To Be”;
3. a valid but empty class register leaves the High building’s class area
   blank rather than showing its promised unavailable/recovery state;
4. when browser storage rejects writes, the quiz says “Best saved score,” but
   no record is stored and the result disappears on reload; and
5. the 200% zoom proxy produces horizontal overflow.

These are direct conflicts with the candidate’s local-only reward, storage
failure, recovery and accessible-reflow contracts. The bounded repair remains
**FIX BEFORE PROMOTION**. No class, quiz curriculum, reward, deployment or
public readiness is approved by this review.

## Scores

| Non-compensable gate | Score | Result | Basis |
|---|---:|---|---|
| Product quality and user value | 15/20 | FAIL | The zero-live journey is much clearer and quiz review is useful, but blank recovery and misleading derived records remain. |
| Accuracy, safety and trust | 14/20 | FAIL | Class availability is honest; unsupported “banked” Closet rewards and false saved-state wording are not. |
| Positive LAiDIES brand contribution | 15/20 | FAIL | The schoolhouse framing is distinctive, but contradictory result language weakens trust. |
| UX and accessibility | 15/20 | FAIL | Mobile reflow, keyboard dialog and reduced motion pass; 200% zoom and empty-state recovery fail. |
| Technical and data integrity | 17/20 | PASS WITH HOLDS | Exact artifact binding, register inventory, canonical quiz parity and core route/quiz mechanics pass; edge-state rendering remains incomplete. |
| Learning and assessment quality | 11/20 | HOLD — NOT PROVEN | Feedback mechanics improved, but no class is admitted and the quiz corpus has not passed representative instructional/accuracy review. |

The required 17/20 floors for product quality, accuracy/trust and positive
brand contribution are not met.

## Exact candidate and artifact identity

A fresh artifact was built at:

`/tmp/laidies-high-independent.alWNla`

It contains **1,071 files / 958.64 MiB**. The existing builder warning above
750 MiB remains a deployment-size/duration hold, not a build failure.

| File | Source and artifact SHA-256 |
|---|---|
| `content/site/high-classes.json` | `a2070255737daeee50b55700d5f17ea76e4301ae3d1447f34ff361feefdf4309` |
| `content/site/quizzes.json` | `ff01b28a698ac949853deea1770429016ed15de1210039b3ad20125b1fc51741` |
| `content/site/site-data.js` | `b629c8c22abf68f1beb6c508e35d5cf909f26e46141d47d995398e255c4e14e0` |
| `sunnyvaile-high.html` | `eec2aa195abaf1af4c52596f98e1c79ffe26b46726abf0f69502c2bed2b0fecf` |
| `learn/class.html` | `00e36bbb965032725dd48845018fcc7de4320eae0039dc9c602b8605c9bbce5a` |
| `learn/quiz.html` | `bac1536f9c0b9141dc17630f8f8b6272e335be4cd72222c9cdd38874d79b5c79` |
| `script.js` | `4ae971a18ef2ef6c4eb08c05e34cbf24add901b9d69400394ec18e1d7bea1b59` |

Source and fresh-artifact hashes match exactly for every reviewed file.

## Checks that passed

- `node scripts/test-sunnyvaile-high-contract.mjs`: **PASS — 10/10
  contract groups**.
- Fresh-artifact Chrome journey suite: **PASS — 6/6 journeys**.
- `node scripts/check-inline-js.js`: **PASS — 353 scripts / 132 pages**.
- `node scripts/check-local-links.js`: **PASS — 1,943 references / 110
  pages**.
- `node scripts/check-product-stewards.mjs`: **PASS — 65 products, 3/3
  active lanes**.
- Fresh public artifact build: **PASS**, with the recorded 750 MiB warning.

The independent browser checks confirmed:

- unknown class slug shows “That class is not in the register” and disables
  the television;
- class-register HTTP 503 shows an honest unavailable state and disables the
  television;
- empty and malformed classroom registers show the unavailable state and
  disable the television;
- the direct registered-class route renders the matching written production
  preview, “Not filmed,” and no playable-class claim;
- the unfilmed production-status dialog moves focus to Close, traps Tab,
  closes with Escape and returns focus to the television;
- reduced motion yields no dialog opening animation;
- clean 320px and seeded 390px Report Card journeys render without ordinary
  horizontal overflow;
- 320px, 390px and 1280px ordinary reflow proxies have matching client and
  scroll widths;
- a completed quiz shows every correct answer, explanation and review route,
  increments attempts, retains latest/best local state and supports retry;
- the Plausible completion event contains the quiz key, not raw answers or
  score; and
- `quizzes.json` and the runtime `site-data.js` quiz dataset are equal.

## Inventory and release truth

The reviewed register contains:

- **4 subjects**;
- **37 class rows**;
- statuses: 16 `not-scheduled`, 12 `proposed`, 7 `researched`, 1
  `researched-verify-before-filming`, and 1 `scripted`;
- **0 `live` rows**;
- **0 videos**; and
- **0 verified dates**.

The repaired building and classroom correctly describe these as written
production previews and say that no class tapes are available. Opening an
unfilmed television records `Class production status opened`, not a class-play
event.

The direct `/learn/class.html` route intentionally selects the first
registered preview; it still presents that item as unfilmed. An unknown
non-empty slug does not substitute the first row.

## Five observed failures

### 1. Unsupported seeded reward wording

With three locally seeded perfect quiz records, the Report Card rendered:

> 30 butterfly clips banked this season — they fill your Closet jar.

The number is derived in the High page from local best scores. This candidate
does not prove an authoritative reward grant, shared balance, duplicate
handling, account/device synchronization, spend/refund behavior or Closet
consumption. Calling the computed decoration “banked” and saying it fills a
different product’s jar overstates the connection.

Required repair: describe this only as a just-for-fun, device-local scorecard
calculation, or connect it to an independently verified authoritative reward
ledger before making a banked/Closet claim.

### 2. Inconsistent superlative wording

The static introduction says:

> It is not a vote, a ranking or a judgment of ability.

The same seeded journey dynamically renders:

- label: `Voted Most Likely To Be`;
- title: `Valedictorian`; and
- line: `Straight receipts. The Registrar keeps your file in the good drawer.`

The title may remain playful, but the interface cannot simultaneously say it
is not a vote and label it as voted.

Required repair: use one consistent device-local, just-for-fun derivation
frame in the introduction, label, title and explanatory result.

### 3. Blank valid-empty class-register state

The classroom correctly rejects an empty register. The building’s separate
class-list renderer does not: for HTTP 200 with
`{"subjects":[],"classes":[]}`, it returns early and leaves the class grid
blank. Malformed JSON and HTTP 503 correctly render the 101-shelf/Pop-Quiz
recovery message.

Required repair: treat an empty subject or class inventory as the same
unavailable state on both the building and classroom surfaces, with the
independent recovery routes preserved.

### 4. Misleading saved-score wording when storage is unavailable

With `Storage.setItem` synthetically blocked, the quiz remains usable and
shows explanations, but its result says:

> This score: 12/10. Best saved score: 12/10.

`localStorage.getItem("laidiesQuizProgress")` remains `null`, and after reload
the interface returns to `Best score: not taken`.

The in-memory fallback is useful for completing the current interaction, but
it is not a saved record.

Required repair: have the storage write return a durable/session-fallback
outcome. When persistence fails, say that the current result is available for
this session only and will not survive reload; do not say “saved.”

### 5. Horizontal overflow in the 200% zoom proxy

Ordinary 320px, 390px and 1280px layouts passed. Applying a 200% browser-zoom
proxy to the 640px Report Card journey produced:

```json
{"client":640,"scroll":743,"bodyScroll":371}
```

This creates horizontal page scrolling and fails the candidate’s promotion
reflow gate.

Required repair: find the fixed/min-content contributor at 200% zoom, then
retest the complete High, Report Card, Yearbook, class preview and quiz
journeys with native browser zoom as well as the proxy.

## Quiz evidence and learning-standard audit

The Episode 02 repair passes:

- `bonus-hallucination` routes to the Episode 03 hallucinations lesson;
- `bonus-receipts` routes to the Episode 03 receipts lesson;
- both use `issues/issue-03.html`; and
- the canonical JSON and runtime copy match.

The Episode 04 future Episode 05 item also correctly has
`reviewStatus: "held-future-episode"`, no invented live route, and says Episode
5 is not published.

The assessment mechanics are stronger than before: all questions have unique
IDs, offered answers, explanations and a review route or explicit future hold;
incomplete attempts do not score; complete attempts explain every answer; and
retry is supported.

That is not learning-content approval. The class register has learning bullets
on only 21/37 rows, mechanisms on 2/37 and demonstrations on 2/37. No class
has a video or verified date. The quiz corpus also contains broad historical,
technical and social claims that require representative primary-source
accuracy and assessment review before promotion. In particular, analogy-led
or slogan-like answers must be checked for the LAiDIES standard’s required
mechanism, nuance, uncertainty, transfer and misconception resistance.

## Analytics and privacy

The scoped repair removes score from the Plausible `Quiz completed` event. The
class production-status event contains only the registered class slug. No raw
answer, score, display name or email was observed in those event calls.

This does not approve the complete analytics system. Microsoft Clarity session
recording remains embedded on High learning surfaces, and this lane did not
establish consent, masking, retention, access, deletion or an approved
learning-event dictionary. Aggregate analytics also cannot prove
comprehension or transfer.

## Exact remaining gates

Before another independent local promotion review:

1. remove or truthfully relabel the unsupported banked-clip/Closet wording;
2. reconcile the “not a vote” and “Voted Most Likely To Be” result language;
3. render the building recovery state for a valid empty register;
4. detect unavailable storage and stop describing session-only state as
   saved;
5. repair and retest 200% zoom reflow;
6. add deterministic and browser regressions for all five failures; and
7. bind the reviewed source hashes to the next exact artifact.

The broader High release gates then remain:

- one representative class with current primary/official sources, correct
  mental model, real demonstration, transcript/captions, media review and
  unfamiliar-learner explanation/application/transfer evidence;
- representative quiz accuracy and assessment review;
- an authoritative reward/account contract with duplicate, offline,
  insufficient-balance, refund and two-account/two-device evidence, or no
  connected reward claims;
- approved privacy-safe analytics and Clarity/privacy review;
- native 200% zoom, desktop keyboard, Safari and VoiceOver evidence;
- real network and storage-failure coverage;
- Book Fair stock, spend, refund and fulfilment proof;
- exact deployment identity and deployed-origin verification; and
- owner approval for any promoted learning content or public claim.

Status remains **FAIL / HOLD — FIX BEFORE PROMOTION**.

## Learning scan

**Reusable finding:** a disclaimer does not neutralize a contradictory dynamic
result. “Device-local,” “not a vote” or “not mastery” must be true in every
calculated label, CTA, destination and reward statement—not only in adjacent
fine print.

**Prevention rule:** seed the strongest possible returning-user record and
test the fully rendered result, then block persistence and test again after
reload. Static-copy assertions cannot prove dynamic state truth.

**Possible Behind the Build angle:** “The report card that passed every static
copy check—until we gave it straight As, blocked storage and zoomed in.”
