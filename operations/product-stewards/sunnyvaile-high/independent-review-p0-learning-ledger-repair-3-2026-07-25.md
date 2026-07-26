# Independent review — SUNNYVAiLE High P0 learning-ledger repair 3

**Date:** 2026-07-25  
**Reviewer role:** independent product, learning, trust and accessibility judge  
**Candidate evidence:**
`build-evidence-p0-learning-ledger-repair-3-2026-07-25.md`  
**Prior verdict:**
`independent-review-p0-learning-ledger-repair-2-2026-07-25.md`  
**Boundary:** local source inspection, fresh public artifact and synthetic
browser journeys only; no maker/state/queue edit, credentials, deployment,
publication, external mutation, visual change or Git

## Verdict

**FAIL / HOLD — THE THREE REPAIR-3 TARGETS PASS, BUT THE REPORT CARD STILL
FAILS A HARMLESS EQUIVALENT LONG-STRING 200% CASE.**

Repair 3 closes the exact Yearbook, classroom and Pop Quiz horizontal-overflow
failures recorded in repair 2. The supplied source and fresh-artifact suites
both pass all 14 journeys. Independent alternate strings also confirm:

- the Yearbook portrait and slate remain bounded;
- the classroom header, room, stage, modal, slide and grid remain bounded;
- the classroom modal retains keyboard focus, Escape close and focus return;
- the television remains inside the room and measures 64 × 45.17 CSS px;
- the chalk hotspot remains inside the room; and
- the focused Pop Quiz remains bounded with its selected input and enabled
  Next control.

However, the Report Card regression seeds score data but not the resident name.
The product reads that name from user-controlled device state. With the
harmless alternate value
`HonorRollResidentWithAnExtraordinarilyLongUnbrokenNameToStressTheRecord`,
the exact 640px viewport plus 200% proxy produces:

| Element | Client width | Scroll width | Result |
|---|---:|---:|---|
| document | 640 | 640 | PASS |
| `#hub-record` | 320 | 320 | PASS |
| `#rc-card` | 250 | 412 | **FAIL** |
| `#rc-meta` | 250 | 412 | **FAIL** |

The resident value renders from x=-116 to x=894. The document avoids a page
scrollbar by clipping the overflowing descendant; that is not reflow and does
not satisfy the named-component or no-content-loss gate.

The High therefore remains **FIX BEFORE PROMOTION**. This verdict does not
reopen the three repaired layout families or the four truth/state repairs
closed in repair 2.

## Scores

| Non-compensable gate | Score | Result | Basis |
|---|---:|---|---|
| Product quality and user value | 16/20 | FAIL | The repaired learning routes are substantially stronger, but a legitimate returning-user value can still break a core record at 200%. |
| Accuracy, safety and trust | 18/20 | PASS LOCALLY | Local score, superlative, reward and storage language remains honest. |
| Positive LAiDIES brand contribution | 17/20 | PASS LOCALLY | The schoolhouse framing remains playful and appropriately bounded. |
| UX and accessibility | 14/20 | FAIL | The four supplied layout journeys pass, but an equivalent user-controlled Report Card string overflows and is clipped. |
| Technical and data integrity | 16/20 | PASS WITH HOLD | Source/artifact binding, contract, supplied browser and global functional checks pass; the regression matrix omits a mutable identity field. |
| Learning and assessment quality | 11/20 | HOLD — NOT PROVEN | Zero classes are admitted and representative class/quiz instructional approval remains open. |

Product and accessibility do not clear their independent floors. Passing
scores elsewhere cannot compensate for clipped user content.

## Exact candidate and artifact identity

Fresh artifact:

`/tmp/laidies-high-r3-independent.CyvQBQ`

The builder reported **1,071 files / 958.64 MiB**. Public metadata validation
passed. The existing warning above 750 MiB remains a release-owner hold.

| File | Source and fresh-artifact SHA-256 |
|---|---|
| `sunnyvaile-high.html` | `ee9612a36c160ef63834c623bd0717e303ebe81050c42d946d30be4da0aa0085` |
| `learn/class.html` | `550e2527a6278e584bbe1e63d887a4e279359ef889fbc9247e560d9a30710401` |
| `learn/quiz.html` | `bac1536f9c0b9141dc17630f8f8b6272e335be4cd72222c9cdd38874d79b5c79` |
| `content/site/sunnyvaile-high-v2.css` | `bbe51398156f9ab726de911da214323f253b553a38cc5120f10410d4f2ad2aca` |
| `content/site/class-v2.css` | `69c6d62468651bda8fa8b5fa1e5281d14c97d969d8ea77b961ff163505dd2cfc` |
| `content/site/quiz-v2.css` | `dbefc2ab0827d0dad141aee9037d27342d6c3e7923de716902ddb213abdd95ab` |
| `content/site/sv-global-header.js` | `be37edd50bf1491db2976cc8f6106952315fc0c03e03f7f6ee141436120b7e72` |
| `script.js` | `ed9b81c441b7e40b29da3f959b8b5fd345df80a3a2ffdca7786d777e1dc12b4d` |

Test-source hashes:

| File | SHA-256 |
|---|---|
| `scripts/test-sunnyvaile-high-contract.mjs` | `13aff842baa9236e5a533964f329bb1308786898e32b9615980eb5ab36be97f3` |
| `scripts/test-sunnyvaile-high-browser.mjs` | `c298dcf1c9e5425f3f89eaa68dff7f11b40015d018ad58997acc0700045be1e5` |

Source and fresh-artifact hashes match for every reviewed runtime file.

## Fresh supplied verification

- `node scripts/test-sunnyvaile-high-contract.mjs`: **PASS — 11/11 contract
  groups**.
- Source browser suite: **PASS — 14/14 Chrome journeys**.
- Fresh-artifact browser suite: **PASS — 14/14 Chrome journeys**.
- `node scripts/check-inline-js.js`: **PASS — 353 scripts / 132 pages**.
- `node scripts/check-local-links.js`: **PASS — 1,941 references / 110
  pages**.
- `node scripts/check-town.js`: **PASS**.
- `node scripts/check-product-stewards.mjs`: **PASS — 65 products and 3/3
  active lanes**.
- Scoped candidate `git diff --check`: **PASS**.
- Whole-worktree `git diff --check`: **NOT CLEAN** because of one unrelated,
  pre-existing trailing space in `docs/growth/ali-idea-backlog.md:223`. This
  review did not alter that file.

The supplied suite verifies Report Card, long seeded/title Yearbook, long-title
classroom with modal/focus/44px target, and focused long-question quiz at the
exact 200% proxy. It also preserves 320/390/1280 reduced-motion reflow,
keyboard dialog behavior and Report Card print behavior. Its remaining gap is
the mutable resident-name field in the Report Card zoom case.

## Independent alternate-string evidence

### Yearbook

With a different extreme score state and
`MostLikelyToCrossCheckEveryUnbrokenMachineGeneratedClaimBeforeSharingItWithAnybody`:

- document 640/640;
- `#hub-yearbook` 320/320;
- `#yb-portrait` 250/250; and
- `#yb-slate` 256/256.

The complete alternate title remained present and visible.

### Classroom

With
`SourceCheckingAndContextPreservationForVeryLongUnbrokenInstructionalHeadings`
in both classroom title locations:

- document 640/640;
- header 320/320;
- room 320/320;
- stage 320/320;
- modal 282/282;
- slide 292/292; and
- class grid 292/292.

The Close control received focus when the television opened, Tab remained
trapped in the one-control modal, Escape closed it and focus returned to the
television. The 64 × 45.17px television and chalk hotspot remained inside the
room.

### Pop Quiz

With a different long unbroken current question and answer:

- document 640/640;
- header, hero and container 320/320;
- console 286/286;
- current question and ritual controls 260/260; and
- answer option 236/236.

The input retained keyboard focus, the injected answer remained readable and
the Next control was enabled.

## Exact next local repair gate

Before another independent re-review:

1. bound `#rc-meta` flex children and the resident value at 200%;
2. permit the user-controlled resident name to wrap without expanding or
   escaping `#rc-card`;
3. add an explicit long unbroken resident-name assertion to the Report Card
   200% browser journey;
4. assert document, `#hub-record`, `#rc-card`, `#rc-meta` and `#rc-name`
   effective content bounds without relying on ancestor clipping; and
5. preserve the now-passing Yearbook, classroom, quiz, ordinary responsive,
   reduced-motion, focus/keyboard and print checks in a fresh hash-bound
   artifact.

## Non-local and product gates still open

Even after that local repair:

- native browser zoom, Safari and VoiceOver;
- representative class and quiz accuracy/instructional approval;
- authoritative account/reward duplicate, failure, refund and two-device
  behavior;
- approved learning analytics and Clarity privacy rules;
- real network and storage-failure coverage beyond synthetic checks;
- Book Fair stock, spend, refund and fulfilment;
- artifact-size owner treatment;
- exact deployment identity and public-origin verification; and
- owner approval for learning content, visuals and promotion

remain outside this bounded review and are not passed by local Chrome evidence.

## Learning scan

**Reusable failure:** testing extreme scores and an extreme calculated title
does not cover a different user-controlled string in the same record.

**Prevention rule:** reflow matrices should enumerate mutable content fields,
not merely routes and containers. Include harmless unbroken values for names,
titles, questions, answers and service error text, then assert both the
document and the containing component.

**Possible Behind the Build angle:** “The page did not scroll, but the name
still escaped the report card—why clipping is not accessibility.”

The canonical painpoints ledger remains parent-owned and was not edited in
this bounded independent lane.
