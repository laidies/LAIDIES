# SUNNYVAiLE NewsStand Building — launch deep dive

**Status:** REPORT READY — evidence-based building and publication-contract assessment; not an implementation, publication, launch approval, or public-verification claim.

## Intent and public lineup

The NewsStand is a reader-facing editorial product, not an AI-news ticker. It exists to give people enough context and explanation to make a better judgment or decision. The locked public lineup is **The Breaking, The Daily, The Weekly and The Tribune** (D-042): Breaking is the conditional timely interrupt; Daily is the edited consequence briefing; Weekly is durable synthesis; Tribune is a sourced argument. They are intentionally distinct jobs, not four cadence labels for the same feed.

The building’s visual grammar supports this: Paige, a physical rack, pulled paper, reading counter and under-counter archive turn editorial selection into an intelligible town experience. The room should make provenance and freshness more visible, not substitute nostalgia for editorial authority.

## Current reader and critical mismatch

`newsstand.html` renders a room, a two-paper rack, an unfolded reader and archive search from `content/newsstand-stories.js`. Its current `EDITION` model and story data use `wednesday` and `tribune`; page copy still calls the weekly paper WEDNESDAY Edition. This is useful legacy implementation evidence, but it conflicts with the later locked four-product naming and architecture.

Therefore, no claim that The Breaking, The Daily or The Weekly is publicly live is warranted from the present reader. The public route and a sourced story were verified, and the reader/search mechanics exist locally, but those facts do not resolve the public-contract mismatch.

## New and returning reader journeys

| Journey | Intended outcome | Evidence / limit |
|---|---|---|
| New reader → rack → paper/story | Understand the different papers and receive a dated, sourced explanation rather than an announcement. | One public sourced story opened; full four-paper comprehension has not been tested. |
| Returning reader → Breaking/Daily/Weekly/Tribune | See timely material only when qualified; find the current briefing and recurring ritual. | Four-publication states, freshness and clear-day state are not implemented/proven. |
| Reader → source/context/archive | Open sources, understand vendor/argument attribution, search prior coverage and retain edition/date context. | Story source links and local archive search exist; relevance/accessibility/archive completeness unverified. |
| Correction or failure | See what changed, what remains uncertain and recover from unavailable/stale data. | No verified reader correction/retraction/automation-failure journey. |

## Editorial quality, accuracy and freshness

The existing editorial operating rules are unusually strong. They require primary-source-first investigation, independent corroboration, AIDB comparative scrutiny after LAiDIES' own read, consequence qualification, no filler, a detailed explanation floor, a reality check for sensational claims, model-release choice analysis, and truthful attribution. The key quality guardrail is that a story cannot become compelling simply because it is fresh, viral or well-written.

The weakness is operational, not aspirational. The system is **SPECIFIED/BUILDING**, with no demonstrated end-to-end autonomous publishing loop. The radar explicitly never auto-publishes today; earned autonomy remains contingent on calibration, audit, public render verification, rollback and correction drills. A scheduled workflow or candidate file is not evidence that a story reached the reader correctly.

## UX, mobile, accessibility and brand

Recorded positives: the public mobile fallback pass found `/newsstand` free of loaded broken images, duplicate IDs and horizontal overflow; the public cutover opened a dated source-checked story with a vendor-sponsored label and related paths. The reader has a main landmark, skip link, mobile navigation and an `aria-live` rack area.

Open proof: rack/reader/search keyboard order and focus return; screen-reader announcement quality; source-link labeling; no-result and clear-day semantics; date/freshness readability; reduced motion; colour contrast; stale/missing data and network recovery; real-device Safari; and field LCP/CLS/INP. Existing route-load diagnostics do not prove these outcomes.

## Sourcing, publishing and backend/automation contract

The required pipeline is: radar discovers a consequential signal → complete primary-source read and claim map → independent reporting/AIDB comparative check → edition decision and explanation gate → editorial approval under current policy → canonical story data → exact deployed reader → public source/date/content check → correction/rollback capability → measurement. Every transition needs a named owner and evidence.

Current local components include the editorial radar, candidate schema, autopublish policy, earned-autonomy plan, story JS data, validation/evaluator scripts and a scheduled workflow. None independently proves the chain is wired, calibrated, approved or publicly correct. The exact edition map must be reconciled before automating anything further.

## Analytics gap

Plausible is embedded, but there is no approved event dictionary, baseline, privacy-bounded analytics pull or reader research loop. Meaningful outcomes are reader comprehension, source use, correction clarity, useful return and trust—not headline clicks or time-on-page alone. Candidate events, pending Platform/Privacy approval: `newsstand_view`, `newsstand_paper_selected`, `newsstand_story_opened`, `newsstand_source_opened`, `newsstand_archive_search`, `newsstand_no_result`, `newsstand_correction_viewed`, and `newsstand_return`. Do not log search terms when they may expose private work, personal concerns or sensitive interests without an explicit privacy design.

## Launch gaps

| Classification | Finding | Required next step |
|---|---|---|
| FIX BEFORE LAUNCH | Locked four-paper lineup conflicts with two-edition reader/data. | NS-01 canonical edition migration and exact-artifact verification. |
| FIX BEFORE LAUNCH | No proven clear-day/freshness/stale/correction/retraction states. | NS-02 state matrix and public tests. |
| FIX BEFORE LAUNCH | No complete producer-to-reader publication, rollback and correction drill. | NS-03 controlled full-path proof. |
| FIX BEFORE LAUNCH | Editorial gates lack demonstrated cross-paper regression/evaluation evidence at the reader. | NS-04 fixtures plus human review. |
| FIX BEFORE LAUNCH | Archive/search/accessibility/mobile recovery proof is incomplete. | NS-05 exact-artifact suite. |
| FIX BEFORE LAUNCH | No privacy-safe analytics contract or validated production loop. | NS-06 Platform/Privacy work. |

## Improvements and ethical revenue

The first improvement is contract clarity: make the four products unmistakable, dates/provenance legible and clear-day behavior calm. Then test practical “what changed for me?” orientation only if it preserves the source-backed explanation and uncertainty. Ethical revenue could be membership, print/collectible editions, or sponsorship only behind an editorial firewall: no purchased coverage, source ranking, claim framing or paywall of core safety/civic explanations; disclosure, fulfilment and correction independence are mandatory.

## Verdict

The NewsStand building has meaningful **VERIFIED PUBLICLY** route/story evidence and **BUILT LOCALLY** reader/search mechanics, but its product status is **SPECIFIED**. Its chief launch blocker is not a lack of stories; it is the mismatch between the locked four-publication promise and the legacy two-edition reader, compounded by unproven full publishing, correction and measurement loops.
