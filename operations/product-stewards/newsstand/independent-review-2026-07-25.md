# NewsStand independent editorial, reader and release review — 2026-07-25

**Review type:** independent product, editorial/accuracy, brand, accessibility
and technical gate of the current local candidate.  This is a review record,
not a publication decision, source change, code change or deployment.

**Trigger:** `INDEPENDENT_EDITORIAL_ACCESSIBILITY_VISUAL_TECHNICAL_REVIEW` in
the product-steward queue.  The candidate's stated purpose is to reconcile the
reader with the locked four-publication public contract without inventing
Breaking or Daily stories.

**Exact reviewed source candidate:** repository `HEAD`
`5c723541f353c7d17a45391d8b75c4ce8a54186b` plus the current local files
`newsstand.html`, `content/newsstand.css` and
`content/newsstand-stories.js`.  No candidate file was changed in this review.

## Verdict

**HOLD — FIX BEFORE LAUNCH.** The bounded masthead correction is a useful
local improvement, and the two published story bodies are materially better
than filler. It does not clear the NewsStand charter's local-release gate or
any of the three non-compensable 17/20 floors. In particular, the reader has
no truthful stale, unavailable-data, correction or retraction state; keyboard
focus is lost or left behind after two central actions; the canonical
producer/schema/reader edition map remains split; and the release artifact is
not the reviewed reader.

Do **not** describe The Breaking, The Daily, the four-paper publication system,
or the reopened NewsStand as released/verified from this candidate. The
existing public route and the local four-selector mechanics are narrower facts.

## Independent scorecard

| Gate | Score | Floor | Verdict | Why |
|---|---:|---:|---|---|
| Product/editorial quality | 11/20 | 17 | FAIL | Four labels and honest empty Breaking/Daily cards exist, but a new reader still does not get the distinct jobs or a direct current-news answer; stale/error/correction journeys and the producer-to-reader path do not exist. |
| Accuracy, safety and trust | 12/20 | 17 | FAIL | The reviewed factual claims are largely entailed by their cited primary/regulatory pages, but the health item has one interested-party source despite being a hard-hold topic, there is no story-level approval/claim-map/correction record, and state can overstate freshness/availability. |
| Positive LAiDIES brand contribution | 13/20 | 17 | FAIL | Paige, the physical desk and the explanatory article structure are strong; the visible underlying **WEDNESDAY EDITION** art, a generic “current” promise, and cross-site “Hot gossip/trending” wording undermine the accurate, source-checked NewsStand identity. |
| UX/accessibility | 6/15 | required gate | FAIL | Skip link, labelled controls, semantic headings and a local no-overflow maker check are good. Search does not transfer focus to results; “Put the paper back” hides the focused button without restoring focus; selection state has no programmatic state; recovery states are absent. |
| Technical/release integrity | 8/15 | required gate | FAIL | Story validation, policy fixtures, local links, town consistency, candidate inline JS and local asset HTTP checks pass. The global inline suite still fails elsewhere, the public artifact is legacy, and reader failure/correction/data-contract paths are not implemented. |

## What passed

### Editorial entailment, on the material current stories

All linked sources were opened in full on 2026-07-25; no story copy was
changed.

1. **`chatgpt-health-permission-screen` / The Weekly.** The sole cited
   [OpenAI Health announcement](https://openai.com/index/health-in-chatgpt/)
   supports the dated U.S. rollout, 18+ web/iOS eligibility, connected Apple
   Health/supported records, training/ad statement, permission choice,
   disconnect/deletion distinction, memory distinction and professional-care
   qualification. The article visibly labels it `vendor-sponsored` and says it
   is not independent clinical validation. Its "more context can improve
   relevance; it does not make the model infallible" conclusion is a fair,
   qualified inference from the source—not a claim of clinical efficacy.
2. **`label-is-not-a-truth-detector` / The Tribune.** The
   [Google announcement](https://blog.google/company-news/outreach-and-initiatives/public-policy/eu-ai-act-transparency-code-of-practice/),
   [Commission opinion](https://digital-strategy.ec.europa.eu/en/library/commission-opinion-assessment-code-practice-transparency-ai-generated-content),
   and [Commission signing FAQ](https://digital-strategy.ec.europa.eu/en/faqs/signing-code-practice-transparency-ai-generated-content)
   support the July 24 signing, the C2PA/SynthID context, voluntary-code
   framing, Article 50 scope/timing, and the crucial statement that adherence
   is not conclusive compliance evidence. The article correctly distinguishes
   provenance from truth.
3. The two articles keep source links, dates, vendor flagging where applicable,
   uncertainty and a useful next learning route. No fabricated Breaking/Daily
   story was introduced.

### Deterministic/local checks

| Check | Result |
|---|---|
| `node scripts/check-product-stewards.mjs` | PASS (`65` products; NewsStand correctly active for this review) |
| `node scripts/validate-newsstand-stories.mjs` | PASS — 2 approved stories, 1 legacy `wednesday`, 1 `tribune`, newest 2026-07-24 |
| `node scripts/test-newsstand-autopublish-policy.mjs` | PASS — all 10 fixtures; every result records `publishActionTaken: false` |
| Candidate inline blocks compiled with `new Function` | PASS — 2/2 blocks in `newsstand.html` |
| `node scripts/check-local-links.js` | PASS — 1,943 references across 110 pages |
| `node scripts/check-town.js` | PASS |
| Local static HTTP fetch | PASS — page, story data and hero image returned 200 |
| Global `node scripts/check-inline-js.js` | FAIL, but the sole parse failure is unrelated: `grimoire/verification-rulebook.html`. This prevents a whole-artifact green result; it is not a NewsStand parse defect. |

The evaluator is correctly **shadow only**: its `WOULD_AUTO_PUBLISH` fixture
means that a hypothetical candidate would meet policy, not that a publication
action occurred. The only checked GitHub workflow is manual
`Legacy Hot Goss Intake`; it uploads a private artifact and writes no public
NewsStand data. `hot-goss-feed.json` is not consumed by `newsstand.html`.
No held/draft/autopublish state was found leaking into the reader.

## Defects that block advancement

### NS-IR-01 — Quiet, stale, failed and corrected are not distinguishable

**Class:** P0 trust and product failure.  **Affected paths:** arrival state,
Weekly/Tribune status, any missing/failed story-data load, correction or
retraction.

`setArrivalState()` at `newsstand.html:461-490` always sets “The Weekly is
in.” for a first visit, including when `window.NEWSSTAND_STORIES` is empty, and
the catalogue statically says “Current issue available” for Weekly/Tribune at
`99-105`. There is no stale threshold, last checked timestamp, data-load error,
hold, correction or retraction representation anywhere in the candidate
(`correction`, `retraction`, `stale`, `last checked` and `last updated` have
zero occurrences in the page script).

This fails the charter's named empty/correction journey and permits a missing
or old dataset to present itself as a current issue. A local story validator's
14-day weekly age check is not a reader-facing freshness/correction system.

### NS-IR-02 — Keyboard journeys do not restore or move focus

**Class:** P0 accessibility/reader recovery.  **Affected paths:** paper return
and archive search.

`showReader()` scrolls the reader but never focuses a reader heading
(`newsstand.html:391-404`). A search result therefore opens above the input
where focus remains; the previously recorded mobile disorientation persists.
`ns-return` hides the reader at `530-540` while it remains the focused button,
then only scrolls the rack. This loses the keyboard user's effective location
instead of returning focus to the invoker. The selected publication is
visual-class-only (`is-selected`); it has no `aria-pressed`/`aria-current`
state. The `aria-live` result container does not replace focused, named result
navigation.

### NS-IR-03 — Four reader labels are not a single canonical edition contract

**Class:** P0 release/data integrity and visual truth.  **Affected paths:**
producer/schema/validator, reader, rack artwork and publication records.

The reader aliases storage `wednesday` to `weekly` at
`newsstand.html:291-293`, while `validate-newsstand-stories.mjs:10` allows only
`wednesday` and `tribune` and requires a WEDNESDAY story at `112-120`. The
physical Weekly card is still the visibly printed **THE WEDNESDAY EDITION**
asset, merely covered by an HTML overlay. The visual source was inspected at
`assets/building-interiors/delivery-20260724-newsstand-comic-v1/newsstand-paper-wednesday-comic-candidate-v1.png`.

The compatibility bridge is honest in the dossier but cannot satisfy the
release contract: canonical data, schema, validator, artwork, rack and
homepage/visitor language must agree before the four-publication promise is
promoted.

### NS-IR-04 — The health item clears factual entailment but not the NewsStand's high-risk evidence bar

**Class:** P0 editorial trust.  **Affected story:**
`chatgpt-health-permission-screen`.

The editorial policy lists `health`, `medical`, `privacy` and `safety` as
hard-hold topics. This item has one interested-party vendor source and no
independent medical/privacy context, claim map, approval record, source
manifest, correction owner or dated recheck record adjacent to the public
story. Its copy appropriately avoids giving clinical advice, but that does not
turn a health-data/privacy story into a low-risk routine Weekly item. The
learning ecosystem inventory independently records this same risk.

Smallest fix: create a dated story evidence record with claim-to-source map,
editorial approval and recheck/correction owner; add a suitable independent
privacy/medical-information source or visibly narrow the item to an explicitly
labelled vendor product announcement pending that review. Do not auto-promote
it.

### NS-IR-05 — Current-news discovery and four-paper comprehension remain weak

**Class:** P1 product/brand.  **Affected paths:** first viewport, homepage,
directory and visitor handoffs.

The first content statement is a generic “The Weekly is in,” not a dated
current lead, clear desk status or `last checked` state. The four selector
subtitles state availability but do not teach the distinct jobs (qualified
interrupt, consequential briefing, durable synthesis, sourced argument).
The cross-site directory still calls this product “Hot gossip · what everyone
is talking about” and “Trending SUNNYVAiLE” in
`content/site/sunnyvaile-directory.js:25`; the homepage describes “This
week's stories · new every Wednesday” at `index.html:636` even though the
current Weekly is dated July 24. Those promises are not aligned with the
no-filler/source-checked contract.

### NS-IR-06 — The reviewed source is not bound to the launch artifact

**Class:** P0 release integrity.  **Affected path:** launch candidate.

`operations/launch/eod-2026-07-25/local-public-artifact/newsstand.html`
still references the legacy `?v=newsstand-1` reader and contains the older
two-edition implementation. It is not byte-equivalent to the reviewed source
candidate. The existing EOD packet is evidence only, not authority; it cannot
be used to claim the four-paper repair is in any deployable artifact.

## Visual and rendered-state evidence limits

The in-app browser was unavailable in this review, so I could not rerun an
exact-candidate desktop/mobile/failure interaction pass or assistive-tech
inspection. I did inspect the supplied rendered mobile audit and current
full-resolution room/paper assets:

- Paige and the room have a strong, coherent LAiDIES visual identity and the
  rule board reinforces source checking.
- The prior 390px rendered audit confirms that the immersive room consumes a
  long mobile journey before the news, and the visible legacy WEDNESDAY cover
  is materially inconsistent with a public “The Weekly” overlay.
- The existing screenshots predate this exact four-masthead candidate. They
  cannot prove its current selector wrapping, focus, contrast, zoom,
  reduced-motion or failed-data behavior.

This is a verification limit, not a pass. The next repair packet must run an
exact artifact in a real desktop and 390px browser plus keyboard and at least
one screen-reader pass.

## Smallest coherent repair packet

1. **Publication-state/data owner:** define one versioned public story schema
   for `breaking`, `daily`, `weekly`, `tribune` and explicit `status`,
   `publishedAt`, `updatedAt`, `lastCheckedAt`, source/approval evidence,
   correction/retraction fields. Migrate the validator, fixtures, reader and
   source data together; replace or deliberately retire the legacy Wednesday
   artwork. Add no-data, stale, load-failure, hold, correction and retraction
   fixtures. Do not infer currentness from local visit time.
2. **NewsStand frontend/accessibility owner:** implement the state matrix
   fail-closed; give selected papers programmatic state; move focus to a
   labelled reader/result heading after open/search; return focus to the
   initiating rack/selector control; place or focus results in a coherent
   order; test keyboard, 200% zoom, reduced motion, 390px and desktop.
3. **Independent editorial/accuracy owner:** create per-story source manifests
   and claim maps; complete the Health hard-hold review and name a correction
   owner/recheck date; re-evaluate the Tribune's argument provenance versus
   report/explainer label. Require at least the charter's primary plus
   independent context where the claim/product risk calls for it.
4. **Cross-product copy owner:** reconcile the directory, homepage and visitor
   language to the four jobs and the truthful current/quiet state. Do not make
   “new every Wednesday,” hot-gossip or trending claims unless the operational
   contract proves them.
5. **Release manager:** rebuild a fresh candidate artifact from the accepted
   source, record hashes, rerun whole-artifact checks (including resolving the
   unrelated inline parse failure), then run a controlled producer → approval
   → canonical data → deploy → source/date/readability → correction/rollback
   drill before any public verification.

## Re-test acceptance

Advance only if all three 17/20 scores clear and the following are evidenced
on one hash-bound artifact: each masthead's distinct job; clear Breaking;
quiet Daily; current and stale Weekly/Tribune; missing-data/load-failure;
hold/correction/retraction; source/attribution/status next to the story;
keyboard focus/open/search/return; screen-reader announcement; mobile and
desktop visual review; producer-to-reader and rollback drill; and exact public
verification after an authorized deployment. Until then the correct status is
**BUILT LOCALLY — RELEASE HOLD**.
