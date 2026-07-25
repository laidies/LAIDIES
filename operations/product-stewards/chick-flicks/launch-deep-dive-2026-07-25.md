# Chick Flicks Building — launch deep dive

**Status:** REPORT READY — evidence-based building assessment; not implementation, episode/media approval, release approval, or public-verification claim.

## Intent

Chick Flicks is the canonical episode-discovery building: the old `/episodes` route redirects here. Its rental-store grammar gives the season a memorable, non-generic catalogue model—New Releases, tapes, aisles, rental card and a friendly “nothing is actually due” rule—while keeping episodes free. The building must make a visitor's next episode choice clearer, not turn the lesson into nostalgia decoration or a fake commerce system.

## Current catalogue and logic

`chick-flicks.html` fetches `content/episode-index.json`, identifies the latest `published` episode, renders published entries as rentable and non-published entries as “coming soon,” then points a selected released tape at its `issueUrl`. Aisles are locally configured topic groups; the counter exposes onward routes to Study Pack, Pop Quiz and Wednesday delivery. A favourite tape writes `laidies_favorite_episode` to localStorage.

This means the building has one important source-of-truth advantage and one risk: runtime state can advance with the index, while shipping copy presently says EP 04 / *The Founding Mothers*. A release requires an exact-artifact check that the static fallback, dynamic index, episode pages, Watch route and KSVL all agree. A valid loaded page alone is insufficient.

## New and returning journeys

| Journey | Intended outcome | Evidence / limit |
|---|---|---|
| New visitor → New Releases → rent current tape | Understand what is newly available and reach the correct full episode. | Building route loaded publicly at mobile width; full selection/handoff comprehension is untested. |
| New visitor → aisle → released/coming-soon tape | Browse by interest without false availability. | Render logic distinguishes statuses; all aisles, empty aisle, labels and a11y have not received a recorded full pass. |
| First-time visitor → trailer → Episode 01 | See the town/season context, then begin at the intended starting tape. | Player/media fidelity is external to this building. |
| Returning visitor → new/current tape or favourite | Quickly continue a preferred episode. | Favourite is localStorage-only; no account/cross-device or actual resume proof. |
| After episode choice → Study Pack/quiz/Post Office | Move to useful reinforcement or subscription. | These are explicit handoffs; downstream reliability/completion belongs to their own products. |

## Visual, brand and UX

The room visual and VHS-box wall are strong because they make the catalogue spatial and emotionally legible. The “rent” vocabulary works when it stays truthful: a tape opens an episode; nothing is owed; a dimmed tape is a clear future promise. The filter aisles can support discovery as the season grows, but deserve editorial governance: an aisle taxonomy should express real lesson fit, not make an episode look like it teaches every topic.

The main UX risk is ambiguity between selecting a tape, renting it, opening a reading edition, listening/watching, and completing learning. The building should make the immediate handoff clear and leave format/completion truth to the Episode Experience and Screening Room. The store should not imply that a favourite, visit, or selection is member progress.

## Accessibility, mobile and performance

Public fallback QA found `/chick-flicks` loaded at 390 × 844 without loaded broken images, duplicate IDs or horizontal overflow; desktop public diagnostics also found no console warnings/errors after core journeys. This is meaningful baseline evidence only.

Open: complete keyboard traversal of aisles/tapes/rental actions; focus after selection and scroll; screen-reader status changes; touch target/readability on the mobile shelf; reduced motion; missing index/image/issue URL recovery; real-device Safari; colour contrast; and field LCP/CLS/INP. The performance packet specifically says diagnostics are not field Core Web Vitals.

## Dependencies and coordination

| Dependency | Chick Flicks requirement | Coordinating champion |
|---|---|---|
| Episode index | One authoritative, timely publication state and safe stale/error fallback. | Platform + Weekly Episode Experience |
| Episode pages | Every rentable `issueUrl` resolves to the right current article/listen route. | Weekly Episode Experience |
| Watch/Screening Room | Format labels and player availability match what the store implies. | Screening Room |
| Media truth | No store copy implies a finished motion film when the public player describes a narrated or illustrated listen-along. | Episode Media Quality |
| Resident Card | Favourite state is explicitly device-local until a real account contract exists. | Identity, Rewards & Connection |
| Study/quiz/Post Office routes | The counter only advertises real, honest downstream states. | Respective product champions |
| Analytics/privacy | Measure discovery and handoff without collecting personal/revealing listening or learning content. | Platform/Privacy |

## Analytics gap

Plausible is embedded, but there is no approved event dictionary, production configuration evidence, baseline or qualitative research for the storefront. Minimum privacy-safe candidates: `chick_flicks_view`, `episode_aisle_selected`, `episode_tape_selected` with release state, `episode_rental_handoff`, `episode_coming_soon_seen`, `episode_favourite_changed`, and `chick_flicks_error`. Do not record account information, full viewing/listening behaviour, private prompt/quiz content, or inferred sensitive interests.

## Launch gaps and classification

| Classification | Finding | Required next step |
|---|---|---|
| FIX BEFORE LAUNCH | Current-week truth can diverge between runtime index, static EP 04 copy and external episode/media surfaces. | CF-01 source/fallback matrix. |
| FIX BEFORE LAUNCH | No clean-user evidence that users understand availability, rental handoff, episode order and next useful action. | CF-02 comprehension sessions. |
| FIX BEFORE LAUNCH | Accessibility/recovery evidence is incomplete for the interactive catalogue. | CF-03 exact-artifact test. |
| HIDE/LABEL FOR LAUNCH | Favourite, trailer and linked learning language can overstate local persistence or downstream media/completion. | CF-04 copy/hand-off audit. |
| FIX BEFORE LAUNCH | No product event contract or verified production event loop. | CF-05 Platform/Privacy work. |

## Enhancement and revenue opportunities

First improve truthful discovery. Then test interest-led aisle recommendations only with a controlled editorial taxonomy and outcome measures beyond clicks. A physical/collectible rental-store extension could fit the brand, but only after a separate ethical revenue review proves fulfilment, rights, accessibility, cost, and that no useful episode or learning path is paywalled. The best near-term “return” feature is likely an accurate current-release and honest favourite/continue state—not a second reward system.

## Verdict

Chick Flicks has **VERIFIED PUBLICLY** route-load evidence and a **BUILT LOCALLY** data-driven catalogue, but is overall **SPECIFIED**. Its immediate launch job is to prove the season discovery contract across current-week data and handoffs. It coordinates the Episode Experience, Screening Room and Media Quality champions; it does not judge or repair their craft outputs.
