# Independent rejudge — BRONZE AiGE bounded relaunch P0 Repair 2

**Reviewer:** independent judge; author of the initial 55/100 and Repair 1
78/100 FAILs, not the Repair 2 maker  
**Reviewed:** 2026-07-26T07:47Z  
**Candidate:** current source plus
`maker-evidence-bounded-relaunch-p0-repair-2-2026-07-26.md`  
**Verdict:** **PASS — eligible for bounded local acceptance; release and public
verification remain held.**  
**Weighted score:** **92/100**

Repair 2 closes the sole remaining P0. The catalogue is now a packaged ES
module whose deeply frozen canonical API remains in module scope. Embedded and
standalone consumers capture the module export in their own import closures.
Neither the module nor either consumer reads, writes, defines, deletes or tests
an ambient catalogue name.

Independent source and exact-artifact fixtures installed hostile
nonconfigurable getters, values, proxies, failed deletion and throwing getters
before any product script. Both routes continued with canonical module data;
hostile access count remained exactly zero, no injected copy rendered or
entered a receipt, and no hostile getter produced a page error. Blocking the
module instead held both routes visibly and saved nothing.

## Scorecard

| Dimension | Weight | Score | Result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 18/20 | Pass — the room now delivers a coherent, useful alcohol-optional social ritual in both embedded and standalone modes; final owner visual approval remains held. |
| Accuracy, safety and trust | 30 | 19/20 | Pass — service/consumption copy is removed, catalogue authority is private, receipts are canonical and temporal, and failure states do not manufacture success. |
| Positive LAiDIES contribution | 20 | 18/20 | Pass — equal spirit-free participation, conversation prompts and explicit real-world boundaries create a distinctive LAiDIES social practice without alcohol pressure. |
| UX/accessibility/reliability | 15 | 18/20 | Pass locally — fail-closed loading, focus, keyboard, 320px, reduced motion, audio and live failure states pass in Chromium; native assistive-technology/device proof remains held. |
| Technical/artifact integrity | 5 | 18/20 | Pass — source and exact artifact match, the private module is packaged, hostile source/artifact matrices pass, and external requests complete zero times; the existing artifact-size advisory remains. |
| **Weighted total** | **100** | **92/100** | **PASS** |

Product/content quality, accuracy/safety/trust and positive LAiDIES
contribution each exceed the non-compensable 17/20 floor.

## Repair 2 P0 disposition

**Fixed.** `content/site/bws-data.js` exports a frozen module-private API.
`content/site/bronze-aige-v2.js` and
`games/businesswomens-special.html` dynamically import that API and enable
their fortune interaction only after validating it. The module source contains
no ambient catalogue operation.

For each of `getter`, `value`, `proxy`, `delete` and `throw`, independently on
embedded and standalone routes:

- the preload property was nonconfigurable;
- hostile getter/proxy access count was **0**;
- the deletion attempt returned **false** and remained irrelevant;
- the throwing getter produced no page error;
- the canonical spirit-free result was **Faux French 75**;
- `INJECTED RYAN BOTTLE`, service and bottle copy never rendered;
- the v2 receipt contained only canonical IDs and no injected copy; and
- reduced-motion and 320px operation remained usable.

When `/content/site/bws-data.js` was blocked:

- embedded mode kept a persistent live “private fortune menu could not be
  verified” hold, created no fortune controls and saved no receipt; and
- standalone mode kept all seven lane/mood/random controls disabled, showed
  the same “nothing was selected or saved” hold and saved no receipt.

The same outcomes reproduced against current source and the fresh exact
artifact.

## Prior P0 regression disposition

| Initial P0 | Final disposition |
|---|---|
| Real CHAR No.5/Ryan activation and bottle encouragement | **Fixed locally.** Targeted governed visible/meta/data/shared/legacy scan remains clean. |
| Mutable/injectable catalogue authority | **Fixed locally.** Module-private authority survives all named preload collisions with zero ambient access and fails closed when missing. |
| Arbitrary/future/duplicate receipts | **Fixed locally.** Exact v2 keys, canonical item/mood/lane IDs, zero-future ISO timestamps, timestamp-derived current/past ISO weeks and unique weeks are enforced; corrupt governed bytes and unrelated sibling storage are preserved. |
| Silent calendar-file failure | **Fixed locally.** Blob/object-URL, click and revoke failures remain visibly live and make no download/add/send/book/reserve success claim. |
| Standalone unconditional current-week episode claim | **Fixed locally.** Standalone wording is evergreen/latest-published; embedded malformed, stale, missing, mismatch and failed inputs do not claim currentness. |
| Pre-existing global audio adapter bypass | **Fixed locally.** Pending, rejected, error and ended states cannot manufacture pressed/playing state; the hostile global adapter is not invoked. |

## Additional passing evidence

- Cocktail and spirit-free catalogues each retain 20 complete suggestions with
  equal route/result treatment and explicit alcohol/service boundaries.
- Strict v2 drink/coaster fixtures reject arbitrary IDs, extra keys, any
  future timestamp, future or mismatched ISO weeks and duplicate weeks.
- Calendar success remains a local `.ics` file only. Creation, click and
  revoke failures remain contained and persistent without a success claim.
- Audio is user-initiated and becomes pressed/playing only after the owned
  media `playing` event. Pending, rejection, error, ended and hostile-global
  paths remain truthful.
- Embedded episode state requires an admitted index plus matching published
  issue. Current, latest-published, malformed, stale, missing, mismatch and
  failure branches retain their intended labels.
- Panel naming, focus/return, Escape, keyboard tabs, 44px targets, 320px
  reflow, reduced motion and governed contrast pass in headless Chromium.
- No external request completed during either source or artifact browser
  suites.

## Evidence run independently

All repository commands were run from `Website-homepage`.

```sh
node scripts/check-product-stewards.mjs
# PASS: products=65; active=2/3

node scripts/check-bronze-aige-contract.mjs
# BRONZE AIGE CONTRACT PASS; checks=80

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
BRONZE_EVIDENCE_DIR=/tmp/bronze-repair2-independent-source-evidence \
  node scripts/test-bronze-aige-browser.mjs
# BRONZE AIGE BROWSER PASS; checks=80
# external_requests_completed=0; third_party_requests_blocked=123

node scripts/check-inline-js.js
# PASS: 352 scripts / 132 pages

node scripts/check-local-links.js
# PASS: 1,974 local references / 110 pages

node scripts/check-town.js
# PASS

node scripts/build-public-site.mjs \
  /tmp/laidies-bronze-rejudge-r2.AujOUb
# Public artifact: 1,086 builder files / 961.51 MiB
# Existing over-750 MiB advisory

BRONZE_ROOT=/tmp/laidies-bronze-rejudge-r2.AujOUb \
  node scripts/check-bronze-aige-contract.mjs
# BRONZE AIGE CONTRACT PASS; checks=80

BRONZE_ROOT=/tmp/laidies-bronze-rejudge-r2.AujOUb \
BRONZE_EVIDENCE_DIR=/tmp/bronze-repair2-independent-artifact-evidence \
PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node scripts/test-bronze-aige-browser.mjs
# BRONZE AIGE BROWSER PASS; checks=80
# external_requests_completed=0; third_party_requests_blocked=123

node scripts/validate-public-metadata.mjs \
  /tmp/laidies-bronze-rejudge-r2.AujOUb
# PASS: robots, sitemap, 404 and retired-route redirects
```

Independent browser matrices outside the maker-authored suite repeated all
five hostile preload classes and both missing-module routes against source and
artifact. All ten hostile route cases used canonical module data with zero
ambient access; both missing-module routes held and saved nothing.

## Fresh exact artifact

Artifact:
`/tmp/laidies-bronze-rejudge-r2.AujOUb`

- builder: 1,086 files / 961.51 MiB;
- `find`: 1,087 files including `.build-manifest.json`;
- `du`: 1.1G;
- `content/site/bws-data.js`: packaged;
- missing dependency: none observed; and
- status: local package evidence only, not deployed or publicly verified.

## Source/artifact parity

| Governed file | SHA-256 |
|---|---|
| `bronze-aige.html` | `7c5a294547916dfa16fb8f0097a563a097a7a01861e3c4c20f67458ba4c22afe` |
| `content/site/bronze-aige-v2.js` | `304d79c8776cd6e928391debbfaabf283f9e470303f5de4cd73421b78b167b2a` |
| `content/site/bws-data.js` | `32f35f689f6df1b0ea3a9461822f18b24adeca8f8cc996664504581f90a76780` |
| `games/businesswomens-special.html` | `fbc411040e8a8b0ac2359d63c70569d4a04869164ebe92aae29fff3568e5244f` |
| `games/cocktail-fortune.html` | `0b1486e191272b7980d476ef35298bd866d8b01eee8ef5fa0cd56d4276f50603` |

Every listed source/artifact pair is byte-identical.

## Holds

This pass does not approve release, deployment or public claims. The following
remain held:

- Ali's Cosmo/room visual approval and final room treatment;
- audio provenance, rights, public admission and KSVL relationship approval;
- native Safari, VoiceOver, 200% zoom and representative physical-device
  proof;
- approved privacy-safe analytics/event contract;
- exact deployed-origin journeys;
- the existing global artifact-size advisory; and
- every alcohol partnership, promotion, affiliate, commerce, availability,
  service or venue activation.

## Learning scan

No canonical painpoint entry was written because this assignment authorizes
one independent Repair 2 report only. Repair 2 successfully applies BTB-106:
content authority is now captured from a private module rather than frozen
after publication to `window`. The reusable regression is the complete
preload matrix—nonconfigurable getter/value/proxy/delete/throw, exact zero
ambient accesses, canonical-or-held rendering, and source/artifact parity.
