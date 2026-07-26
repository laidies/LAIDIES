# LUMINAiRY Repair 1 maker evidence — claim/source/freshness/correction P0

**Date:** 2026-07-25  
**Status:** **REPAIR BUILT LOCALLY — REJUDGE REQUIRED**  
**Trigger:** independent `FAIL — 62/100` in
`independent-review-claim-source-freshness-correction-p0-2026-07-25.md`  
**Authority:** bounded local maker repair only; this is not independent
acceptance, editorial admission, owner approval, deployment or public truth

## Repair outcome

### 1. Held Foundress profiles fail closed

- All four Foundress cards expose only the person name, approved portrait art
  and an explicit research hold.
- Dates, interpretive titles and biographies are hidden in the rendered and
  accessibility trees while held.
- The case no longer starts unlocked and collection state cannot unlock it.
- Pointer clicks and `?meet=` deep links cannot open a held Foundress modal.
- If a future exact atomic Foundress claim is admitted, the gate creates a
  native button rather than making the card itself a non-keyboard control.

### 2. Admission is exact and bidirectional

Registry schema 2 keeps stable claim IDs and admits only one atomic rendered
node when all of these bindings agree:

1. exact card selector and exact nested content selector;
2. normalized rendered text and its SHA-256;
3. exact HTTPS source URL, source type, title and publisher;
4. normalized evidence excerpt and its SHA-256;
5. evidence-to-claim ID and evidence-to-claim-text-hash bindings;
6. strict verification/recheck dates and correction owner; and
7. a SHA-256 over the complete ordered claim/source/evidence/date/owner
   envelope.

Any invalid admission fails the whole registry closed before content is
unheld. A valid hypothetical Hannah Fry fixture renders its one exact card
claim, enables the native profile button and opens a modal containing only
that admitted claim and bound evidence source. The other 45 records stay held.
This fixture proves the mechanism; it is not a real editorial admission.

Every production legacy record remains `held`. None has been granted an
atomic editorial, quotation-rights, historical-priority or current-role
admission.

### 3. Unsupported discovery claims are removed

- Page metadata now says claim-by-claim review is in progress.
- MAiVENS and TRAiLBLAZERS doors describe portrait archives under review
  rather than current leadership, frontier shipping or historical priority.
- Foundress/archive navigation no longer asserts “The First Four” or a
  lineage relationship.
- Only the LUMINAiRY record in
  `content/site/sunnyvaile-directory.js` changed: it now reports 14 SAiNT
  portraits and held MAiVEN/TRAILBLAZER profiles.

### 4. Device-local failure is truthful

- Local selection writes and clears are read-verified before the UI reports
  the changed state.
- Denied `setItem`, denied `removeItem` and lost/denied `getItem` produce a
  persistent assertive live status.
- A failed write claims no selection; a failed clear preserves the previous
  selected state.
- Selection/clear controls are disabled after storage integrity is lost.
- A failed profile-open register write does not claim saved progress; the
  admitted profile may still open.

### 5. Modal accessibility is operable

- Only admitted records can enter the modal.
- Focus is forced to the native close button after opening.
- Tab and Shift+Tab wrap, Escape/backdrop/close-button close, and focus returns
  to the exact opener.
- The admitted journey passes at 320 px and desktop.

## Verification

### Source

- `node scripts/validate-luminairy-claims.mjs`
  - **PASS** — 46 held records, 43 public person blocks, exact atomic
    admission and unrelated-source/text/hash/evidence fixtures
- `PLAYWRIGHT_CORE_PATH=… node scripts/test-luminairy-browser.cjs`
  - **PASS — 46 checks**
  - Covers every Foundress, held pointer/deep-link denial, neutral
    metadata/wing copy, registry outage, four hostile admission mutations, one
    valid hypothetical admission, admitted-only modal contents, 320 px,
    desktop focus entry/trap/three close paths/return, normal selection/clear,
    denied set, denied clear and denied read.
  - Evidence URLs were never requested; external page dependencies were
    denied by the harness.
- `node scripts/check-inline-js.js`
  - **PASS — 352 scripts / 132 pages**
- `node scripts/check-local-links.js`
  - **PASS — 1,974 references / 110 pages**
- `node scripts/check-town.js`
  - **PASS**
- `node scripts/check-product-stewards.mjs`
  - **PASS — 65 products / active 3 of 3**
- scoped `git diff --check`
  - **PASS**

### Fresh exact public artifact

- Path: `/tmp/laidies-luminairy-repair1.equVcI/public`
- Builder: **1,085 files / 961.49 MiB**
- Missing dependencies: **0**
- Oversized individual assets: **0**
- Existing builder advisory: total exceeds 750 MiB
- Public metadata validator: **PASS**
- Claim validator: **PASS**
- Browser suite: **PASS — 46 checks**
- All six governed public files are byte-identical to source.

| Governed public file | SHA-256 |
| --- | --- |
| `luminairy.html` | `12ea4145eb68dcfdcb799cab84a494322907e75b1cc8409ee99850508b8ee3d3` |
| `content/luminairy-claims.json` | `93ec43fd4026ef7e7b57144e6089bd1081b49362ebce69fd8b6f93987b496d88` |
| `content/site/luminairy-claim-gate.js` | `675d752811cdf5ea8ec5d49c6cba4f8c96018b075644fa1ef738c1b0ce21fefe` |
| `content/site/luminairy-v2.js` | `4e5caff65ff413b61d46cc017a54820d4dcaac1dec80f8e8772185d9663d92cb` |
| `content/luminairy-v2.css` | `ea7da4486eddfd9d03419059a2e0d8f5df1f73bad5a12fad8a8ca69c76e2fa34` |
| `content/site/sunnyvaile-directory.js` | `d7c57a6492c242b3e457ce4a487628db6d487fdec1773adf62f88d3fa14e76f8` |

The judge's earlier missing `content/community.html` dependency does not occur
in this fresh artifact. No LUMINAiRY dependency or builder change was required.

## Maker self-score

| Non-compensable dimension | Estimate |
| --- | ---: |
| Product/content quality and visitor value | 17/20 |
| Accuracy, safety and trust | 19/20 |
| Positive LAiDIES contribution | 18/20 |
| UX/accessibility/reliability | 18/20 |
| Technical/artifact integrity | 18/20 |
| **Maker estimate** | **90/100** |

This is a maker estimate, not an independent score. Product value remains
deliberately bounded because real profiles are held rather than researched and
admitted.

## Preserved holds

- independent Repair 1 rejudge;
- atomic research/editorial admission for every biography, quotation,
  interpretation, historical-priority and current-role claim;
- quotation, portrait, source and other rights review;
- research-owner approval and Ali's visual/taste approval;
- Safari, VoiceOver/screen-reader, native zoom and physical-device evidence;
- KSVL track playback, failure, accessible-control and rights evidence;
- Town Hall correction intake beyond its honest preflight state;
- privacy-safe discovery/source-route analytics and representative newcomer
  comprehension;
- public-origin hash/back/correction/status verification, exact release
  provenance and release authority; and
- the 961.49 MiB artifact-size advisory.

## Boundary and learning scan

No source site, correction route, analytics service, private data, credential,
audio, Git history, deployment or public surface was mutated. No central
queue, registry, ACTIVE/PARALLEL record or painpoints ledger was edited.

Repair 1 reuses BTB-104's exact evidence-binding rule and BTB-105's
read-verified local-persistence rule. The product-scoped prevention extension
is: hold tests must inspect every claim-bearing descendant and every opening
path; admission tests must prove both rejection and one operable, exact
admission. It is recorded here only because this bounded assignment forbids a
central painpoint edit.
