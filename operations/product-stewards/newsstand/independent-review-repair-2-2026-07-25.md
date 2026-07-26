# NewsStand independent re-review of canonical reader repair 2 — 2026-07-25

**Review type:** independent adversarial product, accuracy/trust, brand,
UX/accessibility and technical gate of the exact repair 2 local candidate.
This record does not authorize publication, deployment, Git action, visual
approval or any external mutation.

**Reviewed evidence:** the prior
`independent-review-repair-2026-07-25.md`, repair-2 build evidence, exact
reader/data/schema/contract/validators, all ten state fixtures, the local
correction/retraction evidence and rollback drill, cross-product copy and
fresh rendered browser behaviour.

**Exact reviewed candidate:** repository `HEAD`
`5c723541f353c7d17a45391d8b75c4ce8a54186b` plus the current uncommitted
NewsStand repair-2 files. No maker, steward-state or queue file was changed by
this review.

## Verdict

**FAIL — NEWSSTAND RELEASE HOLD REMAINS.**

Repair 2 closes the three trust failures that triggered it:

- dataset-wide hold now blocks direct hashes and archive search;
- stale and unavailable publication states no longer expose story bodies or
  falsely conflate an unavailable record with an overdue check; and
- correction/retraction fixtures now resolve to source-bound local evidence
  records and prove the three-stage published → corrected → retracted
  fail-closed sequence.

The exact candidate is still not release-ready. An independently invented
navigation path fails: after opening a story from search or a paper listing,
the browser's **Back** action removes the story hash but leaves the full
article visible and focus on the article heading. The URL says the reader is
back at the un-hashed NewsStand while the rendered state remains inside the
story; the prior search/listing is not restored. This is a route/state and
keyboard-orientation defect, not merely a preference for a different Back
behaviour.

The three residual generic homepage strings and the unapproved legacy
Wednesday artwork also keep the brand score below its 17/20 floor. Safari,
VoiceOver/real screen-reader, owner-approved Weekly art, one hash-bound release
artifact, controlled producer/public rollback and authorized public
verification remain external gates.

## Independent scorecard

| Gate | Score | Floor | Verdict | Why |
|---|---:|---:|---|---|
| Product/editorial quality | 17/20 | 17 | PASS | The four publication jobs and state model now produce a useful, no-filler reader, with current, quiet, held, stale, unavailable, corrected and retracted behaviour. Browser Back does not restore the prior product state. |
| Accuracy, safety and trust | 18/20 | 17 | PASS | Global and per-story access decisions now fail closed on all tested disclosure paths. Health remains hard-held; Tribune claims remain source-bound; correction/retraction evidence resolves and preserves the right body/notice semantics. Public rollback and public artifact proof remain absent. |
| Positive LAiDIES brand contribution | 15/20 | 17 | FAIL | Paige, the physical NewsStand and evidence-first voice are strong. Three generic homepage promises and the truthfully labelled but unapproved Wednesday archive image still fall short of an exact launch identity. |
| UX/accessibility | 12/15 | required gate | FAIL | Explicit open/search/return, keyboard Enter, 390px, reduced motion and Chrome zoom-proxy checks pass. Native browser Back leaves an unaddressed article and does not restore the prior focused result/listing; Safari/VoiceOver remain unverified. |
| Technical/release integrity | 13/15 | required gate | FAIL | Schema, ten contract fixtures, 37 supplied browser checks, global checks and source-bound fixture drill pass. Empty-hash history navigation is unhandled, the test suite omits that path, and no exact release artifact or real rollback is bound to this source. |

The brand floor and required UX/technical gates do not clear.

## Original blockers reproduced and closed

### Dataset-wide hold

Using the exact candidate with only `datasetStatus: "hold"`:

- direct `#label-is-not-a-truth-detector` rendered zero `.ns-article`
  elements and one `data-access-state="hold"` notice;
- changing the hash to the held Health route still rendered zero article
  bodies and one hold notice;
- keyboard activation of archive search for `verification` rendered zero
  results and focused `#ns-empty`;
- the empty-state text explicitly said story bodies and archive results stay
  off the counter.

**NS-RR-01: PASS.** No equivalent hold bypass was found through initial hash,
subsequent `hashchange`, keyboard search or search-result activation.

### Stale, unavailable and mixed state

- Globally stale Tribune hash: zero body, dated-check-overdue preserved-route
  warning, zero matching archive results.
- Tribune unavailable with otherwise non-expired quiet/held desks: global
  arrival names an unavailable record and does not use “overdue.”
- Mixed current Daily plus stale Tribune: the global dataset remains ready,
  while the stale Tribune body and search result remain blocked.

**NS-RR-02: PASS.** The new state precedence matches the operating contract.

### Correction, retraction and local rollback

The two fixture records now exist:

- `correction-label-truth-2026-07-25.json`;
- `retraction-label-truth-2026-07-25.json`.

Both bind to `label-is-not-a-truth-detector`, a named owner, dated record and
the same three source IDs used by the approved Tribune evidence manifest. The
validator resolves the paths and rejects a different source binding.

Fresh rendered tests showed:

- corrected archive search: one card labelled `CORRECTED`;
- corrected result activation: one article body, one correction notice and no
  retraction notice;
- explicit return: focus restored to `#ns-search-button`;
- retracted archive search: zero cards and zero article bodies;
- retracted preserved hash: zero article bodies and one retraction notice with
  the fixture reason.

The deterministic drill also proves published/body, corrected/body+notice and
retracted/no-body+notice in sequence.

**NS-RR-03: PASS for local fixture evidence.** The records deliberately say
`fixtureOnly: true`; this is not a producer, deployed-artifact or public
rollback.

## Additional adversarial paths

| Path | Result |
|---|---|
| Search submitted with keyboard Enter | PASS — one eligible result; focus moved to the reader heading |
| Search result activated with keyboard Enter | PASS — correct hash, one body, focus on reader heading |
| Hashchange from Tribune to held Health | PASS — Tribune body removed; Weekly hold notice shown |
| Unknown hash | PASS — no body; explicit unavailable notice; focus on reader heading |
| Dataset hold followed by another hashchange | PASS — no body; hold notice retained |
| Held Health search for `HIPAA` | PASS — zero cards and no Health article-copy leak in rendered body text |
| Explicit “Put the paper back” after paper open | PASS — focus restored to the Tribune selector |
| Explicit “Put the paper back” after search result | PASS — focus restored to the search button |
| Browser Back after opening a search/listing story | **FAIL** — hash cleared, but one full article remained visible, zero result cards were restored, reader stayed open and focus stayed on `#ns-reader-title` |

### NS-R2-IR-01 — Empty-hash history navigation leaves stale story state

**Class:** P0/P1 route truth and accessibility recovery.

The only `hashchange` handler calls `renderHash(true, lastInvoker)`.
`renderHash()` immediately returns `false` when the new hash is empty and
performs no restoration. Therefore browser Back from
`#label-is-not-a-truth-detector` to the prior empty hash changes the address
but not the reader.

Exact rendered proof:

- before Back: hash `#label-is-not-a-truth-detector`, one article, focus on
  `#ns-reader-title`;
- after Back: hash empty, one article, zero search result cards, reader still
  visible, focus still on `#ns-reader-title`.

The smallest coherent repair is to represent the prior paper/search reader
state in history, or deliberately close the reader and restore focus to the
recorded invoker when a hashchange produces an empty hash. Add separate
rendered tests for Back from a paper-list story and Back from a search-result
story, then Forward and explicit return. The URL, visible reader state and
focus destination must agree.

## Health hard-hold and story evidence

The Health story remains:

- `status: "hold"`;
- `sourceApproval.status: "independent-review-required"`;
- attached to vendor OpenAI announcement/Help evidence plus HHS and FTC
  regulatory context;
- absent from Weekly listings, archive search and direct rendered body.

The prior independent source review remains applicable: the qualified HHS and
FTC context supports the limited privacy statements without making a legal
determination about OpenAI's exact coverage. Repair 2 did not alter those
claims or promote the story. **Health hard-hold: PASS.**

The Tribune remains approved with three stable Google/European Commission
source IDs, correction owner and next recheck date. The correction/retraction
fixtures reuse those exact IDs. **Tribune/source-bound evidence: PASS.**

## Fresh verification

Run on 2026-07-25 against the exact local candidate with Google Chrome
150.0.7871.182:

| Check | Result |
|---|---|
| `node scripts/validate-newsstand-stories.mjs` | PASS — schema 1.0.0, four canonical publications, one visible, one held, source/evidence records resolved |
| `node scripts/test-newsstand-reader-contract.mjs` | PASS — 10 state fixtures plus rollback drill |
| `node scripts/test-newsstand-reader-browser.mjs` | PASS — 37 supplied rendered checks |
| Independent Playwright adversarial run | FAIL only on empty-hash browser Back restoration; all other invented paths above passed |
| `node scripts/test-newsstand-autopublish-policy.mjs` | PASS — all 10 fixtures; no publication action |
| `node scripts/check-inline-js.js` | PASS — 353 scripts across 132 live pages |
| `node scripts/check-local-links.js` | PASS — 1,943 references across 110 pages |
| `node scripts/check-town.js` | PASS |
| `node scripts/check-product-stewards.mjs` | PASS — 65 products, 3/3 active |
| Scoped `git diff --check` | PASS |

The supplied browser suite freshly passed desktop, 390px, reduced-motion and
Chrome 200% page-scale proxy checks with no reported horizontal overflow. The
independent run separately exercised real keyboard Enter activation,
hashchange, search click, explicit return and browser Back.

## Residual brand and external gates

The shared directory, welcome tour, tour check-in and main homepage product
card accurately carry the four jobs and current-or-honestly-quiet promise.
Three homepage strings remain generic:

- `NewsStand · stories translated by LAiDIES`;
- map description `Big stories and tracked themes`;
- directory line `NewsStand · Big stories and tracked themes`.

The Wednesday cover is now truthfully labelled as archive art, but there is
still no owner-approved final Weekly visual decision.

This environment did not provide a native Safari/VoiceOver or other real
screen-reader session. Chrome DOM/focus tests and a page-scale proxy do not
substitute for those gates. There is also no fresh hash-bound release
artifact, controlled producer → artifact → deploy → public
correction/retraction rollback, authorized deployment or public verification.

## Required next evidence

1. Repair and render-test Back/Forward state restoration for both paper and
   search story journeys.
2. Reconcile the three residual homepage strings to the canonical shared
   NewsStand descriptor.
3. Record Ali's approved final Weekly visual decision.
4. Run native Safari plus VoiceOver/real screen-reader checks.
5. Bind the accepted source to one fresh release artifact and complete the
   controlled producer/public correction and rollback drill.
6. Only after those gates pass, seek authorized deployment and public
   verification.

Until then:

**REPAIR 2 LOCALLY IMPROVED — INDEPENDENT GATE FAIL — RELEASE HOLD.**
