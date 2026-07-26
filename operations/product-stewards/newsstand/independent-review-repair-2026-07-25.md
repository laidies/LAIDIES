# NewsStand independent re-review of the canonical reader repair — 2026-07-25

**Review type:** independent product, editorial/accuracy, brand,
UX/accessibility and technical release gate of the repaired local candidate.
This is a review record, not a publication decision, maker-file change,
deployment or public verification.

**Reviewed repair evidence:**
`build-evidence-canonical-reader-repair-2026-07-25.md`, the current canonical
data/schema/contract/validator, the exact local reader and cross-product copy,
the two story evidence manifests, and the rendered state paths described
below.

**Exact reviewed source candidate:** repository `HEAD`
`5c723541f353c7d17a45391d8b75c4ce8a54186b` plus the current uncommitted
NewsStand repair files. No maker file was changed by this re-review.

## Verdict

**HOLD — FIX BEFORE LAUNCH.**

The repair resolves much of the first independent review: the public contract
now has exactly four canonical editions; the base Health item is hard-held;
normal paper selection, story open, search and return-focus journeys work in
Chrome; failure states are explicit; quiet desks do not invent filler; and the
Tribune has a useful claim/source/correction record.

It does not clear the release gate because a dataset-wide editorial hold is
not enforced by the direct-story or archive-search paths. In the exact
rendered candidate, the arrival correctly says **“The NewsStand is on hold”**
while the Tribune body remains readable at its hash route and the same story
remains discoverable in search. A stale dataset similarly exposes the story
body without a stale-access warning. This contradicts the operating
specification's fail-closed hold contract and is a non-compensable trust
failure.

There are also incomplete correction/retraction proofs, a false global
“overdue” classification when all dated checks are current but one desk is
unavailable, residual generic homepage copy, no replacement/owner approval for
the legacy Wednesday artwork, and no Safari/VoiceOver or controlled
producer-to-reader/rollback evidence.

Do not describe this repair, the four-publication system, or a reopened
NewsStand as release-ready or publicly verified.

## Independent scorecard

| Gate | Score | Floor | Verdict | Why |
|---|---:|---:|---|---|
| Product/editorial quality | 15/20 | 17 | FAIL | The four jobs, dated quiet/current/held states and useful Tribune reader are substantially clearer. Dataset hold and stale state do not govern every entry path, so the product's central editorial promise is not yet dependable. |
| Accuracy, safety and trust | 14/20 | 17 | FAIL | The Tribune evidence is well reconciled and the Health story now uses vendor plus regulator context while remaining held. A global hold can still leak approved content; unavailable is misclassified globally as overdue; correction/retraction fixtures point to records that do not exist. |
| Positive LAiDIES brand contribution | 15/20 | 17 | FAIL | Paige, the physical-paper reader and explanatory voice are distinctive and on strategy. The hold contradiction, retained Wednesday cover and generic “stories translated” / “big stories and tracked themes” homepage language weaken the precise, source-checked promise. |
| UX/accessibility | 13/15 | required gate | CONDITIONAL PASS | Desktop/390 reflow, keyboard selection/open/search/return focus, programmatic selection, reduced motion and a Chrome 200% page-scale proxy passed. No Safari, VoiceOver or other real screen-reader run was available; those remain unverified. |
| Technical/release integrity | 10/15 | required gate | FAIL | Canonical validation and deterministic fixtures pass, but the state suite does not render-test or even contain a distinct unavailable fixture, hold/stale bypasses exist outside `pullPaper()`, correction/retraction evidence paths are unresolved, and there is no artifact-bound end-to-end drill. |

The three 17/20 non-compensable floors do not clear.

## What now passes

### Canonical public contract and base data

- `content/newsstand.schema.json` is version `1.0.0`.
- The only public edition keys are `breaking`, `daily`, `weekly` and
  `tribune`. The validator rejects the old `wednesday` key.
- The base publication states are truthful and distinct: Breaking quiet,
  Daily quiet, Weekly hold, Tribune current.
- Story records carry published/updated/checked timestamps,
  `sourceApproval`, sources, evidence-manifest paths and explicit
  correction/retraction fields.
- The old `window.NEWSSTAND_STORIES` value is a compatibility alias to the
  canonical story array, not a second public edition model.

### Normal and failure-state reader journeys in Chrome

The exact candidate was served locally and tested in headless Google Chrome
150.0.7871.182.

| Journey | Rendered result |
|---|---|
| Base arrival | “The Tribune is current”; two quiet, one held and one current dated selector status |
| Weekly selector | Editorial-hold message, zero story cards, `aria-pressed="true"`, focus on the empty/status region |
| Tribune selector | One approved card, `aria-pressed="true"`, focus on the reader heading |
| Tribune story | Article body plus three source links; return restores focus to Tribune |
| Search: `verification` | One approved result; held Health story does not leak; focus moves to the reader heading |
| Search: no match | Empty result is named and focused |
| Return from search | Focus returns to the search invoker |
| No-data fixture | “The desk is empty”; all desks unavailable; nothing presented as current |
| Load-failure fixture | Explicit failed-record state; all desks unavailable; nothing presented as current |
| Stale fixture | “Paige’s check is overdue”; the selector says not current |
| Story-hold hash | Hold notice, no story article |
| Corrected-story hash | Visible dated correction notice and article |
| Retracted-story hash | Retraction notice and no article body |

At 1280×900 and 390×844, the tested page had no horizontal overflow. A
reduced-motion context matched the preference, changed the paper transition to
`0s` and used automatic rather than smooth scrolling. At a 640px layout with
Chrome DevTools page scale set to 2, content reflowed without horizontal
overflow. That is a useful 200% Chrome proxy, not proof of native Safari zoom.

No page errors were observed in the completed normal/failure-state browser
runs.

### Material story evidence

All material source pages were reopened or independently recovered from their
official indexed page on 2026-07-25.

1. **Tribune — `label-is-not-a-truth-detector`.** Google's July 24
   announcement supports the signing, C2PA and SynthID claims. The European
   Commission's opinion and signing FAQ support the voluntary-code framing,
   Article 50 context and the important limitation that adherence is not
   conclusive compliance evidence. The provenance-versus-truth conclusion is
   properly presented as LAiDIES analysis. The story manifest maps all three
   material claims to stable source IDs, names the correction owner and sets a
   next recheck date. **Source/provenance review: PASS.**
2. **Weekly Health — `chatgpt-health-permission-screen`.** OpenAI's product
   announcement and Help article support the rollout, eligibility,
   connections, vendor privacy/control statements, non-clinical boundary and
   absence of a consumer-product BAA. HHS states that information received at
   an individual's direction by an app that is neither a HIPAA covered entity
   nor business associate is no longer protected by the HIPAA Rules. FTC
   guidance supports separate Health Breach Notification Rule coverage for
   certain non-HIPAA health apps and technologies. The copy qualifies those
   points and does not make a legal determination about OpenAI's exact
   coverage. **Evidence quality: materially improved and factually supported;
   publication status must remain HOLD until the named independent approval
   record advances it.**

The direct HHS page returned an access-denied response to the shell/browser
fetch, so its exact text was re-opened through the search index for the same
official HHS URL; a second official HHS consumer-device page independently
supports the same limited-app/HIPAA distinction. This access limitation does
not turn the indexed wording into a direct live-page fetch and is recorded
here deliberately.

### Deterministic checks

| Check | Result |
|---|---|
| `node scripts/validate-newsstand-stories.mjs` | PASS — schema 1.0.0, four canonical publications, one visible, one held, no legacy `wednesday` keys |
| `node scripts/test-newsstand-reader-contract.mjs` | PASS — eight contract fixtures |
| `node scripts/test-newsstand-autopublish-policy.mjs` | PASS — all ten fixtures; no publication action |
| `node scripts/check-product-stewards.mjs` | PASS in the repaired-candidate cycle |
| `node scripts/check-local-links.js` | PASS — 1,944 references across 110 pages in the repaired-candidate cycle |
| `node scripts/check-town.js` | PASS in the repaired-candidate cycle |
| `node scripts/check-inline-js.js` | PASS — 353 inline scripts across 132 pages in the repaired-candidate cycle |
| Scoped `git diff --check` | PASS in the repaired-candidate cycle |

These checks prove contract shape and local mechanics. They do not prove that
every rendered route enforces the contract.

## Blocking defects

### NS-RR-01 — Dataset hold leaks through hash routes and archive search

**Class:** P0 trust, editorial and release failure.

`pullPaper()` checks `dataset.state` and suppresses the selected paper when the
dataset is held. `renderHash()` and `renderSearch()` do not perform that check,
and the initial `stories` array is emptied only for `load-failure`.

Rendered proof using the exact local data with only
`datasetStatus: "hold"`:

- arrival: **“THE NEWSSTAND IS ON HOLD.”**
- direct route `#label-is-not-a-truth-detector`: one full `.ns-article`
  rendered;
- archive search for `verification`: one visible story card rendered.

This violates the explicit operating-spec rule that a dataset hold suppresses
story bodies. The smallest coherent fix is a single reader-level access
decision used by paper selection, hash resolution and search. Dataset hold,
no-data and load-failure must fail closed on every route; direct links must
show the appropriate preserved hold/failure notice rather than the article.
Add rendered tests for both direct hash and search while globally held.

### NS-RR-02 — Stale and unavailable state semantics are inconsistent

**Class:** P0/P1 trust and state-model failure.

With all publication checks forced stale, the arrival and selector correctly
say the desk is overdue, but a direct Tribune hash still renders the full
article without an explicit stale/archive warning. If back issues are meant
to remain readable during an overdue currentness check, the reader must label
that distinction; otherwise the story should fail closed.

Separately, `datasetState()` calls the whole dataset `stale` whenever every
desk is one of quiet/hold/unavailable/stale. As a result, making the Tribune
`unavailable` while the other three remain deliberately quiet/held produces
the global headline **“Paige’s check is overdue”** even when none of the dated
checks is overdue. The selector itself says Tribune unavailable, so the two
messages contradict each other.

Define global stale from actual expired checks, not the absence of a current
paper. A no-current but fully checked combination should use the existing
clear-day/none-current state; an unavailable desk should be named as
unavailable. Add a distinct unavailable fixture and rendered assertion.

### NS-RR-03 — Correction/retraction fixtures do not prove durable records

**Class:** P0 release/corrections-path evidence gap.

The deterministic test mutates a story with record paths:

- `/operations/product-stewards/newsstand/evidence/correction.json`
- `/operations/product-stewards/newsstand/evidence/retraction.json`

Neither file exists. The test asserts contract state and static reader
strings, but it does not validate the mutated record through the full schema,
resolve those paths, or perform a correction/rollback drill. The base
validator cannot expose this because the base stories have null
correction/retraction objects.

Create real dated evidence records or use complete isolated fixture records;
make the validator resolve their bindings; render both old-route states; and
perform the producer → approval → canonical data → artifact →
correction/retraction rollback drill required by the operating specification.

### NS-RR-04 — Cross-product promise is improved but not exact everywhere

**Class:** P1 product/brand.

The shared directory, welcome tour, tour check-in and main NewsStand activity
card now communicate the four paper jobs and the current-or-honestly-quiet
promise. The Visitor's Centre inherits that repaired shared directory copy.

Three homepage strings remain generic:

- `NewsStand · stories translated by LAiDIES`;
- map description `Big stories and tracked themes`;
- directory line `NewsStand · Big stories and tracked themes`.

They do not recreate the earlier hot-gossip/new-every-Wednesday error, but
they do not carry the exact four-job/source-checked/current-or-quiet promise
requested by the gate. Reconcile them from one canonical shared descriptor.

### NS-RR-05 — Archive art is truthful but still not launch-complete

**Class:** P1 brand/visual approval.

The retained Wednesday cover is now explicitly labelled in the rendered
masthead and accessible name as legacy archive art, not a current Weekly
cover. That passes the truthfulness requirement for a bounded bridge. It does
not prove the visual is the approved long-term Weekly identity or that its
style, colour and quality clear LAiDIES' launch bar. Replace it with an
approved Weekly visual or record an explicit owner decision to retire/retain
it before launch.

### NS-RR-06 — Release/artifact and assistive-technology gates remain open

**Class:** P0 release integrity.

The review covers a local `HEAD` plus dirty working-tree candidate, not one
hash-bound release artifact. There is no controlled producer-to-reader proof,
deployment, public verification or rollback exercise for this exact source.

Chrome keyboard/focus, reflow and reduced-motion checks passed, but this
environment did not provide a real Safari, VoiceOver or other screen-reader
session. DOM semantics and focus observations are not a substitute for
assistive-technology output. Those checks remain **NOT VERIFIED**, not failed
and not passed.

## Smallest coherent next packet

1. Centralize one `canExposeStory(dataset, story, context)` decision and apply
   it to paper selection, search and hash routes. Render the correct preserved
   notice for every blocked state.
2. Correct global stale/unavailable/clear-day classification and add an
   explicit unavailable fixture.
3. Add rendered assertions for held direct hash, held search, stale direct
   hash and unavailable arrival—not only contract-state assertions.
4. Add real correction/retraction evidence fixtures, binding validation and a
   controlled correction/rollback drill.
5. Reconcile the three residual homepage strings and obtain an owner-approved
   Weekly-art decision.
6. Re-run the full matrix in Chrome plus real Safari/VoiceOver, bind the
   accepted source to one release artifact, and only then perform authorized
   public verification.

Until those gates pass, the authoritative disposition is:

**BUILT LOCALLY — RELEASE HOLD — FIX BEFORE LAUNCH.**
