# Dream Phone independent re-judge — Repair 3 strict calendar

**Review date:** 2026-07-25  
**Reviewer role:** independent judge; not the maker  
**Prior blocker:** `independent-rejudge-product-status-trust-repair-2-2026-07-25.md`  
**Overall verdict:** **PASS — THE BOUNDED STRICT-CALENDAR P0 IS CLOSED
LOCALLY**  
**Launch status remains:** **PUBLIC EXPERIMENT PRESENT, NOT
LAUNCH-APPROVED / HIDE OR LABEL**  
**Owner product-model decision:** **UNRESOLVED**  
**Release/deploy/public authority:** **NONE**

## Decision

Repair 3 closes the one remaining trust-control defect from the prior
re-judge. Dream Phone no longer uses normalizing `Date.parse` admission.
Its runtime parses a fixed-width `YYYY-MM-DD`, applies Gregorian leap-year and
month-length rules, rejects year zero and out-of-range fields, and compares
canonical date-only strings against a separately validated UTC current day.

The submitted contract and rendered suite pass. Independent probes expanded
well beyond the submitted fixtures:

- 5,560 direct cases executed the runtime's actual `dateValue` and
  `checkedDate` functions across years 0001–9999 boundary samples, all months,
  days 00–32, century/non-century leap rules, malformed widths and future-day
  comparisons; and
- 24 rendered ledger-admission cases covered year/month/day zero or
  out-of-range, non-leap February 29, February 30/31, all four short-month
  day-31 cases, malformed widths, future ledger/source/claim checks, future
  round/claim corrections, impossible/expired policy and admitted-round review
  deadlines, and one valid UTC leap-day ledger under the
  `Pacific/Kiritimati` browser timezone.

Every invalid candidate rendered **Deck unavailable** with verdict controls
disabled. The valid leap-day candidate admitted exactly `sky-dancers` and
enabled the verdict controls.

The prior P0 closures also remain intact. Sky Dancers still matches the
official CPSC record; Mortal Kombat and every other non-admitted round remain
on HOLD; the corrected ESRB chronology remains four months after the first
hearing and five months after that; all reachable entry copy retains the
experimental/scripted limits; and the rendered learning/focus journey still
provides claim-level sources and limitations, transfer reflection and an
explicit no-mastery boundary.

This is a bounded local technical/trust PASS. It does not choose the product
model, approve visuals, prove learning transfer, clear assistive-technology or
cross-browser holds, authorize rewards/analytics, or admit a release.

## Weighted judgment

Scores are out of 20. Product/content quality, accuracy/trust and positive
LAiDIES brand contribution retain independent 17/20 floors.

| Gate | Weight | Score | Weighted contribution | Verdict |
|---|---:|---:|---:|---|
| Product intent, content quality and user value | 20% | 17/20 | 17.00 | **PASS AT FLOOR** |
| Accuracy and trust | 20% | 18/20 | 18.00 | **PASS** |
| Safety and boundaries | 15% | 18/20 | 13.50 | **PASS** |
| Positive LAiDIES brand contribution | 15% | 17/20 | 12.75 | **PASS AT FLOOR** |
| UX and accessibility | 15% | 16/20 | 12.00 | **LOCAL DOM PASS; EXTERNAL HOLD** |
| Technical/data integrity and maintainability | 15% | 18/20 | 13.50 | **PASS** |
| **Total** | **100%** |  | **86.75/100** | **BOUNDED LOCAL PASS** |

Non-compensable floors:

- product/content quality: **17/20 — PASS**;
- accuracy/trust: **18/20 — PASS**;
- positive LAiDIES brand contribution: **17/20 — PASS**.

The UX score preserves native zoom, VoiceOver, Safari, contrast and supported
assistive-technology holds. Those holds prevent launch approval, but do not
reopen the strict-calendar trust control.

## Strict-calendar evidence

### Direct runtime contract — PASS

The test extracts the production `ISO_DATE`, `dateValue`, `checkedDate` and
`optionalCheckedDate` functions from `games/dream-phone-game.html`; it does not
substitute a test-only validator.

Independently verified:

- valid minimum/maximum fixed-width years sampled at `0001` and `9999`;
- `2000-02-29`, `2024-02-29` and `2400-02-29` accepted;
- `1900-02-29`, `2026-02-29` and `2100-02-29` rejected;
- February 30/31 rejected;
- April, June, September and November 31 rejected;
- month 00/13 and day 00/32 rejected;
- `0000-01-01` rejected;
- one- or three-digit month/day fields, five- or two-digit years, alternate
  separators, whitespace and timestamp suffixes rejected;
- same-day evidence accepted and next-day evidence rejected; and
- valid canonical date comparison is independent of local date formatting.

Independent result:

```text
STRICT CALENDAR INDEPENDENT PASS cases=5560
```

### Rendered ledger admission — PASS

Independent result:

```text
STRICT CALENDAR RENDERED INDEPENDENT PASS cases=24
```

Fail-closed rendered probes:

| Governed field | Values/states independently probed | Result |
|---|---|---|
| Ledger `checkedAt` | year/month/day zero or out-of-range; non-leap Feb 29; Feb 30/31; Apr/Jun/Sep/Nov 31; malformed widths; future date | **Deck unavailable** |
| Admitted source `checkedAt` | future date | **Deck unavailable** |
| Admitted claim `checkedAt` | future date | **Deck unavailable** |
| Round/claim correction date | future date | **Deck unavailable** |
| Policy `nextReviewBy` | impossible non-leap date; expired date | **Deck unavailable** |
| Admitted-round `reviewBy` | impossible non-leap date; expired date | **Deck unavailable** |
| All governed dates | valid `2024-02-29`, UTC verifier day `2024-02-29`, browser timezone `Pacific/Kiritimati` | exactly `sky-dancers` admitted |

The submitted rendered suite additionally covers impossible source and
correction dates, future held-source checks and the canonical stale/corrected/
mismatched/duplicate/unknown/missing evidence states.

## Earlier P0 closure audit

### Mortal Kombat chronology and HOLD — remains PASS

- Mortal Kombat round status remains `HOLD`.
- Both Mortal Kombat claim records remain `HOLD` and
  `CORRECTION_REVIEW_REQUIRED`.
- Round and claim correction dates are valid, present and not future-dated.
- Runtime, JSON ledger and Markdown evidence preserve the two intervals:
  trade association four months after the first hearing; ESRB officially
  formed five months after that.
- No corrected Mortal Kombat material is admitted into the playable deck.

The official ESRB oral history states the first hearing occurred in December
1993, the trade association formed four months later and ESRB was officially
formed five months after that. ESRB's official history records the 1994
founding:

- [ESRB Part 8](https://www.esrb.org/about/part-8-twenty-five-years-later/)
- [ESRB history](https://www.esrb.org/history/)

### Official Sky Dancers claim admission — remains PASS

Exactly one round, `sky-dancers`, is admitted. Its bounded clauses continue to
match the official CPSC recall:

- recall date June 27, 2000;
- about 8.9 million units;
- 170 reports of dolls striking children and adults; and
- 150 reports of injuries.

The runtime preserves the necessary limitations: reports are not every event
that may have occurred, and recalled units are not units proven to have caused
injury.

Official source:
[U.S. CPSC Sky Dancers recall](https://www.cpsc.gov/Recalls/2000/cpsc-galoob-toys-inc-announce-recall-of-sky-dancers-flying-dolls).

### General fail-closed admission — remains PASS

The full rendered suite again rejected missing/404, malformed, stale,
correction-required, source-URL mismatch, claim-text mismatch, duplicate ID,
unknown admitted ID and held-only ledgers. Exact runtime/ledger source URL,
claim text, claim count, reveal-row source and limitation parity remain
enforced.

Canonical admission remains exactly:

```text
admitted_rounds=sky-dancers
held_rounds=12
```

### Reachable cross-entry status and limits — remains PASS

The booth, beta game, homepage, Fun Pack, Welcome Tour, directory, site index
and content registry remain aligned:

- experimental/scripted or prewritten status is explicit;
- no surface calls the deck live or an AI hallucination detector;
- Just Call denies personalized/professional advice;
- call history/discoveries remain page-session only;
- no account, cross-device or saved-reward implication appears; and
- the parked patron-saint engine does not execute on the booth route.

### Focus, announcements and learning boundaries — remains PASS locally

- Just Call entry focuses its heading; Back and keyboard re-entry restore
  logical focus.
- Recent Calls close/Escape restore the trigger.
- Claim verdict focuses the focusable, atomic polite `role=status` result.
- Each admitted reveal row supplies a claim-level source and limitation.
- Clause choice, evidence-type choice and “what would change your read”
  reflection remain required before continuing.
- Reflection remains unsaved and unscored.
- Final transition focuses the result and explicitly states it is not mastery.
- Reduced motion, mobile/desktop overflow and storage-denial journeys pass.

This is DOM/headless-Chrome evidence, not VoiceOver or supported
assistive-technology evidence.

## Exact candidate identity

| File | SHA-256 |
|---|---|
| `games/dream-phone.html` | `431da20b6cf6d5a5a2d0f28b53084da636c949091fae7a9f10d5c65cf8a000fd` |
| `games/dream-phone-game.html` | `be69387c549289107af166bf85add3bbb4c7b956165aa65dc0679d5385746661` |
| `games/dream-phone-game.js` | `3d2f6ef45bc50716b6d2937890cabba1885ff1f79503073af110cb96653a8663` |
| `games/dream-phone-bundles.js` | `5ff1dda3225ef66589a8a4c3978aac4d3bd59933e0d5cff860f6dd261fa67962` |
| `games/data/dream-phone-claim-ledger.json` | `aa3e84082b0a2d8ff2e747f8365c6ff39534434a68795878e70495800e5af2d1` |
| `scripts/test-dream-phone-contract.mjs` | `fdb7c2485d851da972b2baa356f46b0c40d75e6bbf15a7cda33a1bafb38214a5` |
| `scripts/test-dream-phone-browser.mjs` | `bfe037e5e9df6c28c4c6e8615e5b100ae1384f8fcd65c372522ccb3159382984` |
| `index.html` | `3133089a5b15b7c8d772a6bddb9ee0cf285123a3c80561cc743cca17d800974c` |
| `content/site/site-index.json` | `42ca80a87f22db67144518abd6bac30d45f5e95d849c81da0849200d2b2a3799` |
| `content/site/sunnyvaile-directory.js` | `12661e58bc52646b16002ecbe34e739588c559a3c698eb45bdb18fbbf02195be` |
| `content/site/sv-welcome-tour.js` | `20f00850a4d6cdd460a9e5bdd36ce43c9bd897af6c94ddacd393a19756c0ee7e` |
| `content/site/content-registry.json` | `a5d9411a4ff6810494f561e36c1e5c0063bfc1cd38bdebe2d55f52e0160484e0` |
| `games/fun-pack.html` | `c6982a0067cab19822cd4e7dad0857f21cd4c953e6dd5c012750f552a1309a99` |
| Claim-evidence ledger Markdown | `5f45d40b97b5b2b0f3b9ae710a738a72d062643b50e326f74871d1eedc9bf642` |

These are local working-tree bytes, not a commit, release artifact, deployment
or public-origin match.

## Exact rerun evidence

The browser suite ran from the isolated temporary root
`/tmp/dream-phone-strict-rejudge.IOCHxd`, so repository screenshots and maker
evidence were not changed.

```text
node scripts/test-dream-phone-contract.mjs
DREAM PHONE CONTRACT PASS
admitted_rounds=sky-dancers
held_rounds=12
status=PUBLIC EXPERIMENT PRESENT, NOT LAUNCH-APPROVED / HIDE OR LABEL

node scripts/test-dream-phone-browser.mjs
DREAM PHONE BROWSER PASS
journeys=new,returning,keyboard-focus,result-announcement,transfer-reflection,
reduced-motion,zoom-mobile-desktop,storage-failure,adversarial-evidence,
strict-calendar,future-date,utc-leap-day

node scripts/check-inline-js.js
PASS — 353 scripts / 132 pages

node scripts/check-local-links.js
PASS — 1,941 references / 110 pages

node scripts/check-town.js
PASS

node scripts/check-product-stewards.mjs
PASS — 65 products; 3/3 active

scoped git diff --check
PASS
```

## Preserved holds and next authority

No strict-calendar repair remains.

The next product action is the already-recorded owner decision, not silent
expansion of this one-round beta:

1. Ali must select, revise or reject the major Dream Phone product model.
2. Final visual direction and Ali visual approval remain open.
3. Native 200% browser zoom, VoiceOver, Safari, contrast and supported
   assistive-technology evidence remain open.
4. Representative newcomer/learning-transfer evidence remains open.
5. Analytics/Plausible/Clarity interpretation and privacy review remain open.
6. Account, durable reward and cross-device authority remain absent.
7. Eleven non-Mortal-Kombat rounds plus Mortal Kombat remain HOLD until fresh,
   independent claim-level admission.
8. Exact release artifact, commit, deploy, public-origin verification and
   launch promotion remain unauthorized.

One non-blocking learning-quality opportunity remains from the prior
re-judge: either give an incorrect evidence-type reflection useful feedback or
make even clearer that it is self-explanation rather than a checked answer.

No source, data, tests, state, backlog, queue, painpoint, Git, deployment,
publication or external system was changed by this independent re-judge.
