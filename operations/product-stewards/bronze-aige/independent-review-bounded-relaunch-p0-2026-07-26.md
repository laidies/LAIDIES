# Independent acceptance review — BRONZE AiGE bounded relaunch P0

**Reviewer:** independent judge (not the maker)  
**Review time:** 2026-07-26T07:02Z  
**Verdict:** **FAIL — not eligible for bounded local acceptance or release.**

## Scorecard

| Dimension | Weight | Score | Gate result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 14/20 | Fail — the room and equal spirit-free game are useful, but the standalone menu makes an unconditional current-week claim and the public ritual contains contradictory attendance/service language. |
| Accuracy, safety and trust | 30 | 6/20 | Fail — governed cocktail content encourages a bottle as “responsible,” advertises a real venue/bartender, accepts arbitrary/future local receipts, and trusts mutable global catalogues. |
| Positive LAiDIES contribution | 20 | 11/20 | Fail — the social-practice idea is distinctively LAiDIES, but real-world alcohol/service promotion and manufactured local history undermine the learning-and-trust promise. |
| UX/accessibility/reliability | 15 | 14/20 | Partial — normal Chromium keyboard/focus/reduced-motion/320px and audio states pass; calendar failure has no recovery status, and a pre-existing audio adapter can manufacture a false playing state. |
| Technical/artifact integrity | 5 | 14/20 | Partial — fresh source/artifact bytes and ordinary suites match, but mutable globals, weak receipt admission and unhandled calendar failure are material runtime-integrity faults. |
| **Weighted total** | **100** | **55/100** | **FAIL** |

The first three dimensions are non-compensable and each must be at least
17/20. This candidate misses all three. Ordinary-path checks and exact-artifact
parity cannot override the result.

## P0 blockers

1. **The admitted cocktail catalogue contradicts the alcohol, service and
   availability contract.** `content/site/bws-data.js` calls a bottle “the
   responsible choice,” tells the visitor to choose what everyone “will
   actually drink,” and publishes: “Developed exclusively for LAiDIES by Ryan C
   at CHAR No.5. Ask for Ryan and tell him Ali sent you.” The standalone page
   repeats the CHAR No.5 link and call to ask for Ryan. Those are real venue,
   bartender, relationship and activation claims, not fictional interface
   language. They directly conflict with “not an availability check,” “never
   encourages drinking,” and the operating-spec requirement not to encourage
   starting or additional consumption. The top-level disclaimer does not cure
   the governed result shown after a user draw.

2. **Both fortune paths trust mutable page globals as public content
   authority.** After load, replacing `window.cocktailMenus` and
   `window.cocktailFortuneFlaps` caused both the embedded and standalone
   spirit-free paths to render “Book Ryan's sober table,” “Guaranteed
   available,” “Reserve now,” and “Tell Ryan Ali sent you.” Embedded mode also
   persisted the injected name as a device receipt. There is no immutable
   snapshot, schema admission, canonical-item binding or source identity check
   at the result boundary. This reproduces the mutable-public-adapter class
   guarded by BTB-106.

3. **Local receipts are shaped, not authoritative.** A preseeded drink with the
   arbitrary name “Your table is booked at 8,” an empty mood and a timestamp
   four minutes in the future was accepted and publicly repeated. Two duplicate
   coasters for `2099-W01`, stamped now, rendered as “2 locally marked weeks”
   and two future-week coasters. The reader permits timestamps up to five
   minutes in the future, does not bind drink fields to the canonical
   catalogue, and does not bind an ISO week to its stamp or require uniqueness.
   This violates the explicit requirement that corrupt, arbitrary or future
   state be ignored and that only one canonical receipt exist per ISO week.

4. **Calendar-file failure is silent and unowned.** With
   `URL.createObjectURL()` forced to throw, clicking **Download calendar file**
   produced an uncaught page error and left the live status empty. The normal
   downloaded-file fixture passes and correctly says nothing was added, sent,
   booked or reserved, but the failure branch required by the operating spec
   does not exist.

5. **The standalone Businesswomen's Special asserts episode currentness without
   resolving an episode.** Its static menu says “The Wednesday Special · pairs
   with the episode” and “The bit from this week's episode...” while the page
   fetches neither the episode index nor a matching issue. The main room's
   current/stale/failure controller is not present here. This is an
   unconditional public “this week” promise and fails the explicit
   index-plus-issue dependency rule.

6. **A pre-existing global audio adapter bypasses player ownership and honest
   status.** Both page fallbacks return immediately when
   `window.playLaidiesTheme` already exists. The shared KSVL wrapper then calls
   that existing function rather than admitting a known owner. In the hostile
   fixture, one click invoked the injected adapter and set
   `aria-pressed="true"` while `#bzStatus` remained “Recorded track ready” and
   no governed `Audio` owner existed. The normal implementation does pass
   user-initiation, play, pause, ended, error and blocked states, but global
   takeover defeats those guarantees.

## Public-promise reconciliation

- The title and descriptions correctly call the main room adult,
  alcohol-optional and online. They do not claim a live venue.
- The main page clearly says it does not book, send, serve, verify attendance,
  require alcohol or provide health guidance.
- Those accurate promises are contradicted lower in the same governed product:
  the real CHAR No.5/Ryan activation, the “responsible” bottle suggestion, and
  the orientation step “Say you went, collect the week's coaster.”
- The detailed coaster panel does correctly say honour-system/device-only and
  denies visit, gathering, drink, identity, account, badge and reward
  authority. Resident Card copy is also explicitly separate. The earlier
  “Say you went” instruction should not remain as a conflicting public
  attendance frame.
- Businesswomen's Special is correctly presented as both an embedded quick draw
  and a standalone pass-the-phone game. Cocktail Fortune correctly redirects
  to Mme CLAi-O and describes that destination as a separate playful reflection
  room.
- No structured-data block was found on the three governed routes. This review
  therefore found no separate structured-data overclaim; the failures are in
  visible and runtime public copy.

## Evidence run independently

All repository commands were run from `Website-homepage`. External requests
were denied in rendered tests.

```sh
node scripts/check-product-stewards.mjs
# PASS: products=65; active=3/3

node scripts/check-bronze-aige-contract.mjs
# PASS: 58 checks

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node scripts/test-bronze-aige-browser.mjs
# PASS: 43 checks; 0 completed external requests; 69 blocked

node scripts/build-public-site.mjs /tmp/laidies-bronze-independent.bjueee
# Public artifact: 1085 files, 961.49 MiB
# Existing over-750 MiB advisory emitted

BRONZE_ROOT=/tmp/laidies-bronze-independent.bjueee \
BRONZE_EVIDENCE_DIR=/tmp/bronze-independent-evidence \
PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node scripts/test-bronze-aige-browser.mjs
# PASS: 43 checks; 0 completed external requests; 69 blocked

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node /tmp/bronze-adversarial.mjs "$PWD"
PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node /tmp/bronze-adversarial.mjs /tmp/laidies-bronze-independent.bjueee
# Source and artifact reproduced all six hostile outcomes:
# arbitrary/future receipts admitted; embedded and standalone catalogue
# injection rendered; calendar failure uncaught/silent; hostile audio adapter
# invoked with stale status; standalone unconditional "this week's episode".

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node /tmp/bronze-edge.mjs "$PWD"
PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node /tmp/bronze-edge.mjs /tmp/laidies-bronze-independent.bjueee
# Source and artifact: malformed index, malformed issue and mismatched issue
# all fall back to evergreen; audio ended/error both clear playing state.
```

Fresh artifact identity:
`/tmp/laidies-bronze-independent.bjueee`. The builder reported 1,085 files;
`find` counted 1,086 including `.build-manifest.json`. `du` reports 1.1G.
This is local package evidence only, not deployment or public verification.

Governed source/artifact pairs are byte-identical:

| File | SHA-256 |
|---|---|
| `bronze-aige.html` | `9bcbacbb4edaf911c11f41efca6bfff26435f34f8a7f621fe244df83d11f215a` |
| `content/site/bronze-aige-v2.js` | `bb5614819112926bd5ec29194201edb95c21a3c7df6f9b21ea68a8e24a079f36` |
| `content/site/bws-data.js` | `236102b8d7fc0db6fba8e08300440e72d5ef51de7c9d83d6d3c561d0a84af891` |
| `games/businesswomens-special.html` | `3691f7556545cf8a8c722d10fdea3b4d35bb5dd40d8ecec1ccdda06fde0236bb` |
| `games/cocktail-fortune.html` | `0b1486e191272b7980d476ef35298bd866d8b01eee8ef5fa0cd56d4276f50603` |

The maker evidence did not list a `bws-data.js` hash. This review therefore
records its fresh source/artifact identity explicitly rather than inferring it
from the other governed hashes.

## What did pass

- Adult/alcohol-optional/not-a-venue framing is prominent in the main page and
  metadata; the detailed health boundary points visitors to law and qualified
  guidance.
- Cocktail and spirit-free catalogues each contain 20 items. Every flap has
  equal-size, in-range pools for both lanes, and both modes expose the same
  result fields and local return path.
- The standalone BWS has four mood controls and a session-only all-corners
  celebration explicitly denied as a badge/account reward/proof of drinking.
- Cocktail Fortune is a truthful legacy redirect to Mme CLAi-O, not an alias
  for BWS.
- Normal clipboard success/failure and `.ics` content distinguish copy from
  send and download from add/book/reserve.
- The main episode controller passes actual-stale, synthetic-current,
  index-failure, no-published, issue-failure, malformed-index,
  malformed-issue and issue-number-mismatch fixtures. The explicit admitted
  issue map is present in the exact artifact.
- Normal recorded-audio play, pause, blocked, ended and error states are
  user-initiated and clear their visible pressed/playing state.
- The maker suite passes panel focus/return, Escape, direct hashes, tab keyboard
  behavior, 44px station targets, 390px/320px reflow, reduced motion, and
  computed action/selected-tab contrast above 4.5:1 in headless Chromium.
- The main room contains no supported live-show, live-crowd, coaster-behind-bar,
  durable badge or Resident Card sync claim. Clock copy remains recorded-room
  atmosphere only.

## Required repair and rejudge

1. Remove the real venue/bartender activation and all “responsible
   bottle”/additional-consumption framing from every canonical and duplicated
   catalogue. Reconcile `bws-data.js`, `script.js` and the standalone static
   menu.
2. Replace mutable runtime catalogue authority with an admitted immutable
   snapshot or schema-validated, canonical-bound source; reject noncanonical
   item/flap shapes before rendering or saving.
3. Bind drink receipts to a canonical item/mood/lane identifier and bind each
   coaster week to its canonical stamp; reject any future timestamp/week and
   duplicate week.
4. Catch calendar construction/object-URL/click failures and announce an honest
   recovery without a success claim.
5. Give standalone Wednesday copy the same index-plus-matching-issue
   current/stale/failure contract, or make it unambiguously evergreen.
6. Make audio ownership fail closed when the page-level function is missing or
   foreign; do not infer player authority from a mutable global name.
7. Add all hostile fixtures to the governed source and exact-artifact suites,
   then obtain a fresh independent noncompensable score.

## Holds

Even after P0 repair and local rejudge, the existing holds remain:

- Ali's Cosmo/room visual approval;
- audio provenance, rights, public admission and KSVL relationship approval;
- native Safari, VoiceOver, 200% zoom and representative physical-device proof;
- approved privacy-safe analytics/event contract;
- exact deployed-origin journeys; and
- any alcohol partnership, promotion, affiliate, commerce, availability,
  service or venue activation.

## Learning scan

No canonical painpoint entry was written because this task authorizes one
independent report only. Reused rules: BTB-105 (local persistence is a product
contract), BTB-106 (mutable public test/config admission is a side door), and
BTB-112 (dynamic issue paths require exact-artifact proof). Proposed new
prevention for the next permitted learning update: a disclaimer test must scan
every reachable result and duplicated catalogue, and a typed receipt must prove
canonical provenance and temporal binding—not merely parse a plausible shape.
