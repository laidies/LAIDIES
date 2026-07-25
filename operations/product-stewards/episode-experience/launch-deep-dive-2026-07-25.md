# Weekly Episode Experience — launch deep dive

**Status:** REPORT READY — read-only, evidence-limited launch assessment
**Date:** 2026-07-25
**Scope:** Episode discovery, articles, Screening Room listen/watch branch, recap/continuation and return for the current Episodes 1–4 release set. No page, media, analytics, deployment or public-origin changes were made.
**Relationship to AW-003:** MERGE. This report contributes a product record; it does not establish local or public release verification.

## Executive verdict

The product has a coherent, differentiated reader promise and four published article routes, with a truthful public illustrated-listen-along fallback. It is **PARTIAL** as a release journey, not because the article/listen offer is invalid, but because its exact release-artifact/public-origin journey, full accessibility/browser coverage, downstream continuation truth and analytics learning loop have not been proven in this review.

The public motion-film offer is correctly **HIDE/LABEL FOR LAUNCH**: `watch.html` intentionally has `EPISODE_FILMS = {}`, and the media-quality steward has the trailer and Episodes 1–4 on **HOLD**. No local review export is evidence of public film availability.

## Intent and source-of-truth assessment

| Area | Evidence | Verdict |
|---|---|---|
| Episode meaning | `content/episodes/episode-0N.canon.md` and `operations/episode-canonical-source-spec.md` make canon the intended single source for lesson, narrative, facts, practice, continuation and derived surfaces. | **PASS — direction** |
| Fan-out integrity | `operations/weekly-engine-ingestion-map.md` identifies `issue-0N.json` as an older second source that still drives a useful generator and must become derived. | **PARTIAL — drift risk remains** |
| Core package | The weekly engine defines read, listen, accessibility, watch, practice, keep, check, soundtrack, discovery, release and Friday learning as an episode package. | **SPECIFIED — not demonstrated as a complete public release for this review** |
| Current inventory | `content/episode-index.json` declares Episodes 1–4 `published`; Episode 5 is `draft` with no issue URL. | **PASS — local source inventory only** |

## Audience journeys

| Journey | Current local evidence | Technical | Comprehension | Value | Honesty | Experience | Launch classification |
|---|---|---:|---:|---:|---:|---:|---|
| Discover: Chick Flicks → published episode | Chick Flicks reads `content/episode-index.json`, treats only `status: published` + `issueUrl` as rentable, and labels other tapes as coming soon. | **PARTIAL** | **PARTIAL** | **PASS — product model** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** exact-artifact/public route and mobile verification; keep draft tapes visibly non-release |
| Read: episode article | Published routes in index resolve to `/issues/issue-01.html`–`04.html`; prior template audits show reader kits, definitions, side-rail shortcuts, next teaser and Weekly Ritual bridge. | **PARTIAL** | **PARTIAL** | **PASS — editorial architecture** | **PARTIAL** | **PARTIAL** | **FIX BEFORE LAUNCH** route/link/first-use verification on the candidate; no broad approval from historic local QA |
| Listen: Screening Room | `watch.html` selects narration/cue JSON and VTT for trailer/Episodes 1–4; captions render below picture, not over artwork. | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PASS — stated offer is bounded** | **PARTIAL** | **FIX BEFORE LAUNCH** exact audio/caption/player/fallback test on desktop/mobile/public origin |
| Watch: full motion film | `EPISODE_FILMS = {}`; media release gate marks trailer and Episodes 1–4 **HOLD**. | **NOT AVAILABLE** | **NOT APPLICABLE** | **NOT APPLICABLE** | **PASS only while labelled unavailable** | **NOT TESTED** | **HIDE/LABEL FOR LAUNCH** |
| Recap / continuity | Canon carries previously/next hooks; article template specifies later-episode `Previously On LAiDIES` and `Next Time On LAiDIES`. | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** verify all published pages and current-week handoffs tell one correct release sequence |
| Continue / return | Index links quizzes, cards, printables, community, glossary and KSVL; receiving products have their own varying readiness. | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** inventory each promoted handoff; hide/label any failed receiving journey |

`PASS` above is narrow: it describes the local product direction/evidence named in the cell, never deployed or public verification.

## What the audience can truthfully receive now

- A published episode can be selected from The Chick Flicks only when its index record is published and has an issue URL.
- The Screening Room offers narrated or illustrated cue-synced listen-alongs, with read-along caption assets for trailer/Episodes 1–4. Episodes 3–4 describe themselves as narrated editions.
- The page explicitly says the full illustrated motion films are completing owner continuity review. This boundary must survive every discovery and promotional route.
- Episode 5 is a draft shelf entry, not an available article, listen-along, film or completion loop.

## Narrative, learning, visual and brand assessment

The product's strongest asset is its distinctive weekly teaching grammar: a bounded lesson, narrative arc, references that carry a learning job, a practical continuation and a TV-style return hook. The canon specification prevents a weak “article plus decorative retro” model by requiring facts, comparison, practice, quiz, references, artwork, social promise, experience jobs and learning feedback.

The risk is fidelity across surfaces. The first episodes were hand-authored and the generator still consumes `issue-0N.json`; the engine therefore identifies active canonical drift rather than solved propagation. The correct response is not another prose reminder but a canon-to-consumer reconciliation gate.

Media brand quality is an explicit dependency, not an assumed strength. The Episode Media Quality steward found a limited picture-only positive sample for Episodes 3–4 but no complete audiovisual release clearance. It records recurrent source-style drift in Episodes 1–2, semantic-motion deficiencies, unresolved identity/location/caption checks and no public-film proof. The Episode Experience steward therefore cannot describe the show as a motion-film release.

## UX, accessibility and mobile assessment

Historical local template evidence is meaningful but incomplete:

- `operations/review-packets/final-episode-template-standard-audit.md` specifies consistent reader kit, side rail as shortcut, next teaser, Weekly Ritual bridge and 375/390/430px no-overflow expectations.
- `operations/review-packets/episode-mobile-template-refinement-qa.md` records an Episode 1 390px/1440px local pass with no console or overflow errors, but also labels the shared mobile system **REVISE INTERNALLY** and requires visual review.
- `watch.html` deliberately provides a below-picture live caption bar, which protects illustrated frames from subtitle occlusion; this is a sound accessibility/brand decision. Its real VTT parsing, audio sync, missing-caption message, keyboard spacebar control and error/fallback paths still need execution against the exact candidate and representative browser/device.

Thus the audience experience is **PARTIAL**, not a cross-browser/mobile accessibility clearance.

## Media, backend and caption boundary

| Component | Current local truth | Owner / next gate |
|---|---|---|
| Article/index/discovery data | `content/episode-index.json` marks Episodes 1–4 published and Episode 5 draft. | Episode Experience steward: verify all route consumers against exact artifact/public origin. |
| Listen-along engine | `watch.html` loads episode cue JSON, narration segments and VTT, with caption bar below picture. | Release QA + Audio & Caption Owner: real playback, seek, caption sync, audio error and fallback tests. |
| Motion-film branch | Intentionally disabled (`EPISODE_FILMS = {}`). | Media crew; see `../episode-media-quality/eod-2026-07-25-release-gate.md`. |
| Review masters | Local candidates exist but every promoted title is **HOLD**. | Narrow image/motion/edit/audio/release roles; no product-level override. |
| Episode “memory” | Chick Flicks keeps last rental/favourite in local storage. | Identity steward: label device-local state; do not infer an account or learning record. |

## Analytics and feedback gaps

Plausible is present and `watch.html` emits `Episode watch` on play. That is not a completion, comprehension, transfer or return metric, and no dated aggregate analytics packet was available for this deep dive. The stewardship operating system also says analytics pulls are **NOT WIRED**.

Before an outcome claim or major funnel change, establish a privacy-safe event dictionary and baseline for: discovery selection, article arrival, listen play, caption failure/fallback, meaningful linked action, product-appropriate return and direct feedback. Do not record transcript/caption content, private prompts or session replay wholesale. Low traffic must remain **INSUFFICIENT EVIDENCE**, not a negative verdict.

## Launch blockers and ranked improvement plan

1. **FIX BEFORE LAUNCH:** verify the exact release artifact and deployed origin for published discovery → article → Screening Room → caption/fallback → truthful continuation paths.
2. **FIX BEFORE LAUNCH:** preserve no-motion-film promotion until every individual media verdict clears its independent, SHA-bound full-watch gate.
3. **FIX BEFORE LAUNCH:** reconcile every current-week/episode/archive handoff against the canon and index, with Episode 5 visibly draft.
4. **HIDE/LABEL FOR LAUNCH:** maintain the narrated/illustrated listen-along boundary and local-only Chick Flicks memory boundary wherever surfaced.
5. **POST-LAUNCH EXPERIMENT:** after sufficient safe evidence, run a bounded championship on read-first versus listen-first versus reader-choice entry, using the same approved canon and the shared quality/trust/brand floors.
6. **DECLINE:** reward or market an “episode completed” action based only on play, a local rental or a page visit.

## Best-in-class improvement direction

The strongest next experience is not a bigger media surface. It is one dependable weekly route: a visitor sees the released episode and its concrete payoff, selects the comfortable read or listen mode, receives accessible continuity without duplicated captions, takes exactly one relevant practice/retrieval step, and is offered one honest reason to return. The route should retain LAiDIES' object-world specificity—the Chick Flicks tape and Screening Room are interfaces, not decorative wrappers—while reducing the burden of choosing between unfinished or semantically overlapping actions.

## Evidence limits and next trigger

This was a source and local-artifact deep dive. It did not operate a deployed public origin, play every full audio master, use a screen reader or mobile Safari, inspect private analytics, or independently watch/approve media. It cannot change any **PARTIAL**, **NOT TESTED** or **HOLD** result to a public pass.

**Next trigger:** when the EOD release artifact is frozen and a public-origin candidate is available, execute the bounded Episode Experience route suite and reconcile it into AW-003. Separately, invoke the media crew only for its defined repair and independent release gates.

## Learning scan

No new painpoint entry is created by this documentation-only pass. Reapplied controls: BTB-010–012 (an agent, dashboard or artifact is not an operating system); BTB-069 (an interface event is not an authoritative outcome); BTB-094–095 (media source/style and rendered narration alignment require independent evidence at the exact clock position).
