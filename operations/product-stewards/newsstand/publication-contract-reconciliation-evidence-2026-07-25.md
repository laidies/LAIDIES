# NewsStand publication-contract reconciliation — local evidence

**Status:** BUILT LOCALLY — maker-run catalogue and reader mechanics passed; independent review, integration, release and public verification remain pending.
**Candidate:** Local `newsstand.html`, `content/newsstand.css`, and `content/newsstand-stories.js` as tested on 2026-07-25.
**Build contract:** `build-packet-publication-contract-2026-07-25.md`.

## Exact correction

- The reader-facing contract now names exactly **The Breaking, The Daily, The Weekly and The Tribune**.
- The Breaking opens an explicit clear-day state: “No qualified Breaking story is live right now. A clear day is a valid result.”
- The Daily opens an explicit not-filed state and rejects filler.
- The existing approved WEDNESDAY story is displayed as The Weekly through a narrow reader compatibility alias; its validated legacy `wednesday` storage key remains unchanged.
- The existing Tribune story remains The Tribune.
- No story body, headline, date, source, attribution or URL was created or changed.

## Test evidence

### Existing story validator

Command:

`node scripts/validate-newsstand-stories.mjs`

Result:

`✓ NEWSSTAND: 2 approved stories · 1 WEDNESDAY · 1 Tribune · newest 2026-07-24`

The first candidate changed the storage key to `weekly`; the existing validator rejected that key and required a WEDNESDAY story. Because the validator/schema path was outside this cycle’s allowed write scope, the final candidate preserves `wednesday` in approved data and maps it to `weekly` only at the reader boundary.

### Static JavaScript and inventory

- Inline scripts compiled with `new Function`: **PASS** (`2` inline scripts).
- Approved public story inventory: **PASS** (`2` stories).
- Stored editions: `wednesday`, `tribune`.
- Slugs retained:
  - `chatgpt-health-permission-screen`
  - `label-is-not-a-truth-detector`

### Headless Chrome reader/catalogue run

Exact local route: `http://127.0.0.1:4173/newsstand.html`

| Journey | Exact observed result |
|---|---|
| Publication contract | Four selectors in order: The Breaking, The Daily, The Weekly, The Tribune. |
| The Breaking | Reader opened; zero story cards; clear-day copy visible; exactly one matching selector selected. |
| The Daily | Reader opened; zero story cards; not-filed/no-filler copy visible; exactly one matching selector selected. |
| The Weekly | Reader opened; one story card; public label “The Weekly”; both the physical paper and catalogue selector indicated selection. |
| The Tribune | Reader opened; one story card; public label “The Tribune”; both the physical paper and catalogue selector indicated selection. |
| Archive search | Enter-key search for `verification` returned `2 back issues found` and two result cards. |
| Direct story hash | `#chatgpt-health-permission-screen` opened the full article as The Weekly with the original headline and one source link. |
| Narrow viewport | At `390 × 844`, document width equalled viewport width (`390px`); no horizontal overflow; all four publication buttons remained within the viewport in a two-column grid. |
| Runtime | Zero page-script exceptions observed during the run. |
| Asset responses | Page, three CSS files, story data, room art, both paper images and shared scripts returned local HTTP `200` responses. |

## Gate status

| Gate | Status | Evidence limit / next owner |
|---|---|---|
| Local catalogue and reader mechanics | VERIFIED LOCALLY | Exact maker-run results above. |
| Approved story-data validation | VERIFIED LOCALLY | Existing validator passed; compatibility alias remains a bounded debt. |
| Product/editorial quality | BUILT LOCALLY | Independent NewsStand product/editorial reviewer has not judged comprehension or wording. |
| Accuracy/trust | BUILT LOCALLY | No content changed; independent trust review still required. |
| UX/accessibility | BUILT LOCALLY | Keyboard search and narrow layout passed mechanically; screen-reader, focus-return and real-device review remain open. |
| Visual/brand | BUILT LOCALLY | Exact masthead overlays and selector rendered without overflow; independent visual review remains open, especially because the underlying Weekly paper asset retains legacy WEDNESDAY artwork. |
| Release/public | BLOCKED | Intentionally blocked by independent gates and explicit no-deploy/no-publication scope. |

## Learning scan

**Qualifying local learning:** A canonical product-name change can be blocked by a validator that encodes the superseded name. Changing only public data would make the approved library fail its existing release check; changing the validator was outside this cycle’s write boundary.

**Prevention rule:** Before migrating a public enum or masthead, run every existing validator first and inventory all producer, schema, consumer and fixture owners. When the full migration is not in scope, use one explicit compatibility alias at the consumer boundary, label it as debt, and never imply the underlying producer contract has migrated.

**Global ledger action:** A reusable painpoint-log entry is warranted, but it was not written because this cycle was expressly limited to `newsstand.html`, `content/newsstand*`, and `operations/product-stewards/newsstand/`.

## Still open

1. Independent product/editorial, accuracy/trust, brand, UX/accessibility, technical and visual judgments.
2. Canonical producer/schema/validator migration from `wednesday` to `weekly`.
3. Replacement or approved treatment of the legacy WEDNESDAY paper artwork.
4. Clear correction/stale/retraction states and producer-to-reader proof under NS-02 and NS-03.
5. Release integration and exact public verification.
