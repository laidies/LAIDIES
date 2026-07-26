# Independent rejudge — LUMINAiRY Repair 1 claim/source/freshness/correction P0

**Reviewer:** independent judge; author of the initial 62/100 FAIL, not the Repair 1 maker  
**Reviewed:** 2026-07-26T07:19Z  
**Candidate:** current source plus `repair-1-evidence-claim-source-freshness-correction-p0-2026-07-25.md`  
**Verdict:** **FAIL — Repair 1 does not clear the non-compensable trust, product or LAiDIES contribution floors.**  
**Weighted score:** **71/100**

Repair 1 genuinely fixes the Foundress, local-selection and modal-mechanics
failures. It does not fix the central evidence-admission failure: a
cryptographically self-consistent but unrelated source/evidence envelope still
admits, renders, enables and opens a profile. It also fails open when the claim
gate script is unavailable and leaves an unsupported current-role promise in
the shared Welcome Tour.

## Scorecard

| Dimension | Weight | Score | Result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 16/20 | Fail — the held portrait hall and three-wing journey are coherent, but the only demonstrated admission is not actually claim-supported and shared discovery still misstates the product. |
| Accuracy, safety and trust | 30 | 10/20 | Fail — a fully rehashed unrelated source/evidence envelope opens a public claim; key identity fields are outside the envelope; script failure republishes held context. |
| Positive LAiDIES contribution | 20 | 15/20 | Fail — the room is distinctive and the conservative production hold is responsible, but “real women leading AI” and a self-attested evidence gate reproduce the beautiful-authority problem the repair exists to prevent. |
| UX/accessibility/reliability | 15 | 17/20 | Pass locally — held Foundresses, admitted modal focus/trap/close/return, 320px reflow and truthful storage-denial paths pass in Chromium. Native assistive-technology evidence remains held. |
| Technical/artifact integrity | 5 | 15/20 | Partial — inventory, ordinary tests, fresh artifact and source parity pass; the validator mistakes envelope integrity for evidence validity and has no script-failure fixture. |
| **Weighted total** | **100** | **71/100** | **FAIL** |

Product quality, accuracy/safety/trust and positive LAiDIES contribution each
require at least 17/20. They are non-compensable. The improved weighted total
cannot override the three failed floors.

## Initial P0 disposition

| Initial P0 | Repair 1 disposition |
|---|---|
| Held Foundress claims visible/operable | **Fixed locally.** All four expose only name, portrait and explicit hold after the gate loads; their date/title/description descendants are hidden and pointer/deep-link opening is denied. |
| Admission neither exact nor operable | **Still P0.** Exact byte/hash mutation is checked and one profile can now open, but claim-specific support is still self-asserted rather than proved. |
| Unsupported current/priority/shared discovery copy | **Partially fixed; still P0.** Canonical metadata, doors and `sunnyvaile-directory.js` are bounded. The shared Welcome Tour still publicly says “the real women leading AI.” |
| Silent device-local failure | **Fixed locally.** Set/remove/get denial produces persistent assertive status, disables selection controls and preserves the smallest read-verified state without false success. |

## P0 blockers

1. **A fully rehashed unrelated source and evidence excerpt is admitted as
   claim support.** The maker fixtures mutate one field without recomputing the
   envelope, so they prove tamper detection only. In the independent fixture,
   the Hannah Fry record used the exact rendered nested-node text and recomputed
   every advertised text, evidence and envelope hash around:

   - `sourceUrl: https://example.invalid/unrelated`
   - publisher: `Example Authority`
   - evidence: `This source describes an unrelated fact about garden soil.`

   The runtime reported the registry `loaded`, changed Hannah's card to
   `admitted`, revealed “Keeper of the Probabilities · Cambridge · Hello
   World.”, enabled the opener, opened the modal and exposed the unrelated URL
   as “Evidence for this profile claim.” `supportsClaimId` and
   `supportsClaimTextSha256` are authored assertions inside the same untrusted
   object; hashing them does not establish semantic support or source
   authority.

2. **The advertised “complete” envelope does not bind claim identity.**
   `admissionPayload()` omits `personId`, `wing`, `claimKind`, `status` and any
   scope/caveat field. Changing Hannah's already-bound record to
   `personId: ada-lovelace`, `wing: trailblazers` and
   `claimKind: quotation` without changing its envelope hash still produced
   `data-luminairy-claims="loaded"`, an admitted Hannah card and an enabled
   opener. The mismatch then prevents the normal profile lookup from finding
   its admission. This is both an incomplete evidence envelope and a broken
   admission-to-profile identity binding.

3. **Claim-gate script failure republishes held production context.** The normal
   registry-outage fixture passes because the gate script runs and calls
   `failClosed()`. With JavaScript disabled, or only
   `content/site/luminairy-claim-gate.js` unavailable, the raw
   `trailblazer-wing-context` remains visible:

   > The women shipping frontier AI ... inside OpenAI, Anthropic, DeepMind ...
   > the roster grows as new frontier founders emerge.

   No hold message exists in either failure state. CSS suppresses person
   descriptions before registry admission, but does not suppress
   `[data-lum-claim-block]`. The operating specification explicitly requires
   script failure to preserve navigation and explain the limitation, not
   publish the held claim.

4. **Shared public discovery still asserts unsupported current leadership.**
   A rendered Welcome Tour at the LUMINAiRY stop says:

   > the PATRON SAiNTS on one wall, the real women leading AI on the other,
   > each with a ♪ Her song to play.

   This is the same current-role overgeneralization class as the initial P0,
   now outside the validator's scan. It also promises a song for each person
   while Repair 1 explicitly holds profile/audio admission. The canonical
   metadata, door copy and `sunnyvaile-directory.js` entry are repaired, but
   the public shared consumer is not reconciled.

## The maker's “valid hypothetical” is not claim-valid

The fixture binds the rendered text:

> Keeper of the Probabilities · Cambridge · Hello World.

to the excerpt:

> Hannah Fry joins Cambridge as Professor of the Public Understanding of
> Mathematics.

Even taking that excerpt at face value, it supports a Cambridge appointment.
It does not support the LAiDIES title “Keeper of the Probabilities” or the
`Hello World` component. The schema can prove that an author placed those
strings in one envelope; it cannot make the excerpt support the exact public
claim. A valid positive fixture needs an atomic DOM node whose entire wording
is supported or a separately labelled LAiDIES interpretation with its own
admission rule.

## Official spot-check scope

The three official spot checks remain appropriately narrow in the repair
evidence, and all corresponding production records remain held:

- Anthropic's 2026-02-13 announcement identifies Daniela Amodei as co-founder
  and President. It does not support the card's added “Ops, product, safety”
  interpretation.
- OpenAI's 2025-05-07 announcement says Fidji Simo would join as CEO of
  Applications later in 2025. It is not, by itself, a 2026-07-26 current-role
  verification for every card statement.
- Google DeepMind's current Responsibility & Safety page identifies Lila
  Ibrahim as COO and co-chair of its Responsibility and Safety Council. It does
  not support “Turned a research house into a lab that ships.”

Repair 1 does not overgeneralize those three checks into registry admissions.
The overgeneralization persists separately in the shared Welcome Tour.

## What passed independently

- Production inventory is schema v2 with 46 records: 43 unique person records
  plus 3 context records; all 46 are `held`, with zero production admissions.
- All four Foundress cards expose name, portrait art and an explicit hold after
  normal gate load. Dates, titles and biographies are absent from the rendered
  and accessibility-visible state; held click and deep-link paths do not open.
- Exact nested-node text mismatch, fully rehashed future `verifiedOn`, fully
  rehashed stale `recheckOn`, malformed dates, duplicate IDs, unknown status
  and ordinary registry outage fail all 46 records closed.
- The hypothetical mechanism, when supplied a structurally accepted record,
  reveals exactly one claim/profile while leaving 45 records held.
- Canonical page metadata, door copy and `sunnyvaile-directory.js` no longer
  contain the initial unsupported current/priority phrases.
- Set, remove and get denial maintain a persistent assertive live failure,
  disable selection/clear controls and do not manufacture a changed state.
- The admitted modal uses a native opener, moves focus to the close button,
  wraps Tab/Shift+Tab, closes by Escape/backdrop/close button, returns focus to
  the exact opener and reflows at 320px. The artifact suite passed twice in
  isolated reruns; one earlier concurrent Chrome run produced a transient
  desktop focus assertion failure and was not reproducible.
- Source and exact-artifact ordinary suites pass with external requests denied.

## Evidence run independently

All repository commands were run from `Website-homepage`.

```sh
node scripts/check-product-stewards.mjs
# PASS: products=65; active=3/3

node scripts/validate-luminairy-claims.mjs
# PASS: 46 held records; 43 public person blocks

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node scripts/test-luminairy-browser.cjs
# PASS: 46 checks; 42 external requests blocked

node scripts/check-inline-js.js
# PASS: 352 scripts / 132 pages

node scripts/check-local-links.js
# PASS: 1,975 references / 110 pages

node scripts/check-town.js
# PASS

node scripts/build-public-site.mjs \
  /tmp/laidies-luminairy-repair1-independent.wZPBx0
# Public artifact: 1,085 files / 961.5 MiB
# Existing over-750 MiB advisory; no missing dependency reported

LUMINAIRY_ROOT=/tmp/laidies-luminairy-repair1-independent.wZPBx0 \
PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node scripts/test-luminairy-browser.cjs
# PASS twice in isolated reruns: 46 checks; 42 external requests blocked

node scripts/validate-public-metadata.mjs \
  /tmp/laidies-luminairy-repair1-independent.wZPBx0
# PASS: robots, sitemap, 404 and retired-route redirects

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node /tmp/luminairy-rejudge.cjs "$PWD"
PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node /tmp/luminairy-rejudge.cjs \
  /tmp/laidies-luminairy-repair1-independent.wZPBx0
# Source and artifact reproduced:
# - fully rehashed unrelated source/evidence admitted and opened;
# - unbound personId/wing/claimKind mutation admitted;
# - no-script and missing-gate-script context leakage;
# - rendered shared Welcome Tour current-role overclaim.
# They also confirmed rehashed future/stale and nested-text mismatch rejection.
```

Fresh artifact identity:
`/tmp/laidies-luminairy-repair1-independent.wZPBx0`. The builder reported 1,085
files and 961.5 MiB; `find` counted 1,086 including the build manifest and
`du` reported 1.1G. This is local package evidence, not deployment or public
verification.

## Source/artifact parity

| Governed file | SHA-256 |
|---|---|
| `luminairy.html` | `12ea4145eb68dcfdcb799cab84a494322907e75b1cc8409ee99850508b8ee3d3` |
| `content/luminairy-claims.json` | `93ec43fd4026ef7e7b57144e6089bd1081b49362ebce69fd8b6f93987b496d88` |
| `content/site/luminairy-claim-gate.js` | `675d752811cdf5ea8ec5d49c6cba4f8c96018b075644fa1ef738c1b0ce21fefe` |
| `content/site/luminairy-v2.js` | `4e5caff65ff413b61d46cc017a54820d4dcaac1dec80f8e8772185d9663d92cb` |
| `content/luminairy-v2.css` | `ea7da4486eddfd9d03419059a2e0d8f5df1f73bad5a12fad8a8ca69c76e2fa34` |
| `content/site/sunnyvaile-directory.js` | `d7c57a6492c242b3e457ce4a487628db6d487fdec1773adf62f88d3fa14e76f8` |
| `content/site/sv-welcome-tour.js` | `3a32744a4e4c0189dc417b60856c808db257f33dc37ee873a0b795eb296d7388` |

Every listed source/artifact pair is byte-identical. The failures are therefore
in the exact candidate, not a packaging divergence.

## Required Repair 2 evidence

1. Make evidence authority independent of the candidate envelope. At minimum,
   bind admitted source URLs and exact evidence excerpts to a separately
   governed reviewed manifest; a self-declared `sourceType: official` and
   recomputed hash cannot authorize itself.
2. Decompose the positive fixture to one genuinely supported atomic DOM node,
   or explicitly label and separately admit LAiDIES interpretation. Have an
   independent accuracy reviewer attest the source-to-claim relationship.
3. Include `personId`, `wing`, `claimKind`, `status`, scope/caveat and any other
   admission-affecting field in the canonical envelope; enforce
   selector/person/wing/kind identity and duplicate-person rules.
4. Hide every `[data-lum-claim-block]` by default in CSS/static markup and
   reveal only after a verified admission. Provide a static/no-script
   navigation-and-hold state, then test missing gate script separately from
   registry fetch outage.
5. Reconcile every shared LUMINAiRY consumer, including the Welcome Tour, and
   add it to the public-promise validator.
6. Repeat source and fresh-artifact hostile fixtures, then obtain another
   independent non-compensable rejudge.

## Remaining holds

All existing holds remain:

- atomic research/editorial admission for every biography, quotation,
  interpretation, historical-priority and current-role claim;
- quotation, portrait, source and other rights review;
- research-owner approval and Ali's visual/taste approval;
- Safari, VoiceOver/screen-reader, native zoom and physical-device evidence;
- KSVL playback, failure, accessible-control and rights evidence;
- Town Hall correction intake beyond honest preflight status;
- privacy-safe analytics and representative newcomer comprehension;
- public-origin hash/back/correction/status verification and exact release
  provenance; and
- the 961.5 MiB artifact-size advisory.

No implementation, product state, backlog, central governance, Git,
deployment, public service, correction route or external source was mutated.

## Learning scan

No canonical painpoint entry was written because this task authorizes one
LUMINAiRY Repair 1 rejudge report only. Reused BTB-101, BTB-104 and BTB-105.
Proposed prevention extension: integrity hashes prove that an evidence envelope
did not change; they do not prove that its source supports its claim. Positive
admission fixtures require an independently reviewed semantic support
relationship, and fail-closed tests must remove the gate script—not only fail
its data request.
