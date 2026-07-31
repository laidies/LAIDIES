# NewsStand Breaking + Daily publication proof

**Status:** BUILT LOCALLY — PRIVATE REVIEW CANDIDATE / RELEASE HOLD

## Outcome

- Product: SUNNYVAiLE NewsStand and Homepage handoff.
- User problem: Ali cannot judge the editorial bar or placement from abstract
  definitions alone.
- Intended user outcome: inspect realistic Breaking and Daily stories in the
  exact reader and a brand-consistent homepage handoff before any public change.
- Evidence and research: qualified Gemini Flash and Google ATLAS radar packets,
  current NewsStand reader contract, current homepage and NewsStand design.
- Scope: isolated homepage and NewsStand preview, two complete stories,
  editorial boundary receipts and local verification.
- Explicit non-goals: no canonical story mutation, production homepage edit,
  deployment, publication, external message or claim of approval.

## Proposed direction

- Decision: show a compact NewsStand desk after the homepage’s task-choice
  section, then open the full story in the existing NewsStand reader.
- Why it fits LAiDIES: news is visible to repeat visitors without displacing
  the learning promise; cards carry the decision-worthy takeaway and the
  NewsStand carries context, mechanism, implications, analogy limits, sources
  and uncertainty.
- External tools/plugins/services proposed: none.
- Approval or installation required: Ali’s editorial and placement judgement
  before a production change.

## Work breakdown

| Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|
| Breaking example | Editorial/accuracy | Gemini packet | isolated preview data | publication-day recheck | BUILT LOCALLY |
| Daily example | Editorial/learning | ATLAS packet | isolated preview data | independent methods review | BUILT LOCALLY |
| Homepage handoff | UX/frontend | current homepage | isolated homepage | owner placement decision | BUILT LOCALLY |
| NewsStand render | Frontend/editorial | current reader | isolated NewsStand | canonical reader contract | BUILT LOCALLY |
| Verification | QA/accessibility | exact preview | dated evidence | browser and deterministic checks | VERIFIED LOCALLY — independent and native AT review pending |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Result |
|---|---|---|---|
| Product/content quality | Both stories answer what happened, mechanism, why it matters, reader action, limits and watch points | independent editorial reviewer | MAKER SELF-CHECK PASS; INDEPENDENT PENDING |
| Accuracy, safety and trust | Claims reconcile to primary sources; vendor and independent evidence are labelled | AI research/accuracy | MAKER CLAIM-MAP CHECK PASS; INDEPENDENT/PUBLICATION-DAY RECHECK PENDING |
| Positive LAiDIES brand contribution | Analogies clarify and state their limits; no filler or novelty worship | brand/learning | MAKER SELF-CHECK PASS; OWNER/INDEPENDENT PENDING |
| UX and accessibility | Desktop/mobile, keyboard focus, direct links and readable hierarchy | accessibility QA | VERIFIED LOCALLY AT DESKTOP AND 390 PX; NATIVE AT PENDING |
| Frontend/backend/data integrity | Isolated dataset validates and production tests remain green | frontend/QA | VERIFIED LOCALLY — fixture valid; canonical reader, schema, router and steward checks pass |
| Visual/media quality | Existing current production visual language preserved | Ali | PENDING OWNER REVIEW |

## Integration and release

- Affected products/champions: NewsStand and town-entry homepage.
- Canon/identity/reward/analytics dependencies: four locked publication
  mastheads; no reward or analytics change in this proof.
- Exact candidate:
  `operations/design-explorations/newsstand-publication-proof-20260726/`.
- Release authority: Ali plus existing independent editorial/accuracy,
  accessibility and release gates.
- Rollback: remove the isolated proof; no production files changed.
- Public verification: NOT EXECUTED.

### Local evidence

- Preview dataset: zero contract validation errors; Breaking and Daily each
  expose exactly one current approved mock story; Weekly and Tribune stay quiet.
- Production regression: reader contract 10 fixtures pass; canonical story
  validator passes; review-router policy passes; product-steward system passes.
- Rendered journey: homepage shows both handoffs; Daily desk → story opens the
  preserved preview hash and moves into the full paper; Breaking uses the same
  verified route.
- Visual continuity: distinct original Breaking and Daily illustrations now
  appear on the homepage handoff, publication covers, front-story listings and
  full articles. Both are explicitly captioned as LAiDIES illustrations; the
  webpage, not generated pixels, owns all real mastheads and headlines.
- Hero correction: the NewsStand room itself now shows three large physical
  papers—Daily, Weekly and Tribune—plus a distinct current Breaking ticker.
  Obsolete TODAY and WEDNESDAY Edition art is absent from the proof.
- Editorial-art correction: the ambiguous bakery-like Breaking illustration
  and the Daily image containing a background man were rejected. Breaking now
  shows a person-free newsroom comparison bench; Daily shows one woman only in
  a newsroom operations office. The corrected art carries through homepage,
  physical paper, front-story and full-article placements.
- Archive discovery: the private proof now exposes the latest five headlines
  for each publication through compact tabs, opens a twenty-item “See all”
  index in the existing reader, and supports cross-publication topic browsing.
  Preview headings are visibly identified as layout-only data and are not
  publication authority.
- Responsive: the homepage module and full Daily paper render at a real 390 px
  iframe layout width without visible horizontal clipping. The archive also
  collapses to one column with two publication tabs per row at 390 px.
- Visual comparison: proof preserves the current LAiDIES header, NewsStand
  scene, publication selectors and unfolded-paper system. The only new visual
  treatment is the isolated homepage handoff and visible private-proof banner.
- Defect caught and repaired: a preview-only `<base href="/">` caused
  hash-only paper links to leave the preview and open the production homepage;
  it was removed and the exact Daily route was retested.
- Visual production and exact prompts:
  `operations/design-explorations/newsstand-publication-proof-20260726/visual-production.md`.
- Same-state desktop/mobile visual comparison and interaction evidence:
  `operations/design-explorations/newsstand-publication-proof-20260726/design-qa.md`
  (**final result: passed**).

## Measurement and learning

- Baseline: current homepage has no current Breaking/Daily handoff; public data
  has both desks quiet.
- Success/failure signals: Ali can distinguish the paper jobs, trusts the
  standard, understands the homepage-to-full-story journey and identifies any
  copy/placement changes before implementation.
- Review date: 2026-07-26.
- Decision after measurement: owner accepts, revises or rejects content standard
  and homepage placement.
- Dossier/state/backlog updates: record proof against NS-03/NS-04 without
  representing it as a real producer-to-publication run.
