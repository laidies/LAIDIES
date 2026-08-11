# NewsStand Building Steward

**Status:** SPECIFIED — manual dossier created; no persistent runner, analytics pull, or autonomous publication authority is wired.
**Relationship to AW-003:** MERGE — building, publication-contract, and launch recommendations feed the reopening gate.
**Authority:** Records only in this directory. No story, source, editorial decision, automation, website, analytics, deployment, publication, git, or revenue change without portfolio reconciliation and applicable editorial/privacy approval.

## Product promise

The SUNNYVAiLE NewsStand turns consequential AI developments into source-checked, useful explanations—not a headline feed. It is the home for four distinct recurring publications: **The Breaking** (rare, qualified interruption), **The Daily** (edited consequential briefing), **The Weekly** (durable weekly synthesis), and **The Tribune** (a sourced argument). A clear day is a valid result; no paper exists to fill space.

## Boundary

**Owns:** `/newsstand` → `newsstand.html`; the building/Paige/rack/reader/archive-search experience; the way the four publications are discovered, distinguished, dated, searched, and handed off; public freshness/empty/correction states; and the integration contract between editorial outputs and the reader.

**Coordinates, does not absorb:** The Breaking, Daily, Weekly and Tribune editorial sub-champions; the twice-daily radar and candidate evaluation; research/source verification; publication/deployment automation; homepage live-news placement; platform data/analytics; legal/privacy/corrections; and any newsletter or commercial surface.

## Reader journeys

| State | Journey | Authoritative success | Current evidence limit |
|---|---|---|---|
| New reader | Enter → understand four-paper jobs → choose current paper/story → receive explanation, sources, uncertainty and next useful route | The selected item has a current, qualified, dated, sourced explanation and clearly distinguishes report/argument. | Public NewsStand story opening was observed; four-publication reader contract is not implemented in current code. |
| Returning reader | See live Breaking only when qualified; find current Daily; return to Weekly/Tribune ritual; search archive | Freshness/status accurately reflects publication state; no empty alarm or stale “new” signal. | Current code has legacy Wednesday/Tribune data; no verified freshness/rotation/retraction suite. |
| Search | Search headline/topic/source/tag → open result in reader | Search finds the correct current/archived story and retains source/date/edition context. | Built local search exists; relevance, keyboard and archive completeness are unverified. |
| Empty/correction | No qualified story, stale source, correction or automation failure | Reader sees a truthful clear-day, hold, correction or retry state—not filler, fabricated news or silence disguised as freshness. | Required product state is not fully specified/rendered. |

## Editorial non-negotiables

1. Primary-source-first evidence; independent reporting for context/disagreement; AIDB is an explicit comparative check, not an automatic authority or credit.
2. The explanation floor applies to every item: prior context, mechanism, reader consequence, what changed/has not changed, uncertainty and watch points.
3. Consequence, evidence and explanation—not virality, output quota, vendor adjectives or benchmark tables—determine publication.
4. The Breaking is conditional and collapses completely on a clear day. The Daily is not a raw-feed revival. The Weekly and Tribune retain distinct recurring jobs.
5. A sourced argument is identified as argument; attribution reflects actual intellectual provenance.
6. No automated candidate, script, dashboard, cron, or rendered card is called published until exact public bytes, source/date/context and correction/rollback paths are verified.

## Release gate

**VERIFIED LOCALLY** requires an exact artifact and representative stories proving all four mastheads, no-Breaking clear-day state, current/stale/error/correction states, edition distinction, source and attribution display, archive search, mobile/keyboard/screen-reader/reduced-motion recovery, and complete reader explanation requirements.

**VERIFIED PUBLICLY** additionally requires a real producer-to-reader run: qualified candidate → approved editorial record → canonical data → exact deployed render → public-source/date/readability check → rollback/correction check, plus validated privacy-safe analytics. Existing route and one-story public evidence do not satisfy this gate.
