# Visitor’s Centre — launch deep dive

**Status:** REPORT READY — evidence-based assessment, not implementation, launch approval, or public-verification claim.

## Intent and current design

The Visitor’s Centre is SUNNYVAiLE's front desk, not the site-wide homepage or a directory application. Its job is to make the town feel intelligible and inviting while sending a newcomer to a named, meaningful next destination. The governing room-first direction is explicit: map on the wall; building names discoverable without numbered obstructions; selection reveals a destination in place; named directory remains available without a long card roll.

The local candidate follows that direction. AW-002 records local success for selection, wall-map selection, destination reveal, return state and postcard choice/note/email state at 390 × 844 without console errors. It also records that the mechanical pass does not replace Ali's open visual ruling.

## Journeys

| Journey | Present mechanism | Evidence | Open proof |
|---|---|---|---|
| Arrival and orientation | Room, contextual copy, starter route, map and named directory. | Local and public mechanics are recorded. | New visitor can explain the building/job and choose confidently. |
| Discover a destination | Map or named directory → in-place reveal → route CTA. | Local route-state mechanics; public Library directory selection. | Every destination, keyboard flow, bad/failed destination and low-bandwidth fallback. |
| Trailer / Welcome Tour | Visitor’s Centre offers optional trailer/tour. | Shared tour code exists. | Full start/decline/pause/restart/accessibility/failure test; it is not Centre-only code. |
| Postcard desk | Card choice/note/email state then external handoff. | Local representative state passed. | Real device share/cancel/fallback and downstream send/open/join truth. |
| Return | Return-state interaction after selection. | Local interaction passed. | Whether returning visitors find a genuinely useful continuation; broader state is outside this building. |

## Visual, brand and UX assessment

The strongest current choice is structural rather than decorative: the visitor is in a place, looking at a town map, and can select an understandable destination. That is a credible LAiDIES translation of a front desk. The named directory protects against the map becoming a visual-memory test and makes the building more accessible.

The risk is overloading the front desk with every town system—tour, trailer, postcard, membership, map, directory and destination recommendations—until no first action dominates. The building must continue to lead with orientation and one clear exit. The town's depth is a reward for curiosity, not the visitor's first assignment.

## Accessibility, mobile and performance

Recorded positives: compact-width local interaction passed at 390 × 844; public/mobile fallback checks found no loaded broken images, duplicate IDs or horizontal overflow on the Visitor’s Centre; the room no longer depends on numbered pins or a seventeen-card directory.

Unverified requirements: complete keyboard tab order and focus return after reveal/modal-like states; Escape controls; screen-reader announcements for dynamic selection; map alternative parity; reduced motion; no-JS/failed-map/directory/trailer recovery; storage-disabled and real-device Safari checks; field Core Web Vitals. Existing browser diagnostics and document timing are not a substitute for the latter.

## Logic and dependency risks

1. Map and directory interactions are only useful if the selected destination is current, correctly named and reachable; each downstream product owns that destination's final state.
2. The tour, header and map use shared code/data. Visitor’s Centre can state its requirements but cannot silently alter shared navigation or reward behavior.
3. Postcard interface success is not proof of sending, opening, joining, referral attribution or reward; those lifecycle claims are currently failed/unproven in the whole-site matrix and belong to Identity/Rewards.
4. The current evidence is a local candidate plus selected public observation, not a complete public-origin test on the exact later release artifact.
5. The building's visual gate is an Ali decision, not a functional test to be inferred from browser success.

## Analytics gap

Analytics scripts being present does not establish whether the Visitor’s Centre works. No approved product event contract or behavioral evidence shows new versus returning use, map-vs-directory preference, selection/reveal success, destination handoff, tour dismissal, recovery failure or comprehension.

Proposed privacy-safe events, requiring Platform/Privacy approval: `visitor_centre_view`, `visitor_directory_selected`, `visitor_map_selected`, `visitor_destination_revealed`, `visitor_destination_handoff`, `visitor_tour_offer_action`, `visitor_postcard_handoff`, and `visitor_centre_error`. Do not collect postcard text, email, account data or full session content.

## Launch verdict

| Classification | Finding | Required next step |
|---|---|---|
| FIX BEFORE LAUNCH | No clean-state evidence that the Centre's role, choice and next step are comprehensible. | VC-01 moderated comprehension matrix. |
| FIX BEFORE LAUNCH | Accessibility and recovery pass is incomplete across directory/map/tour/postcard handoffs. | VC-03 exact-artifact test. |
| FIX BEFORE LAUNCH | No event contract/verified configuration to detect post-launch confusion. | VC-05 with Platform/Privacy. |
| PAUSED | Owner visual/experience ruling is unresolved. | VC-02; then implementation/retest only if accepted. |
| HIDE/LABEL FOR LAUNCH | Any copy suggesting postcard or tour downstream completion/rewards beyond the evidence. | VC-04 truthful handoff audit. |

## Best-in-class direction

Aim for a highly legible concierge desk, not a generic onboarding wizard: welcome, orient, name the choices, make one next route feel worthwhile, and keep the map/directories as optional support. First measure the current flow's comprehension. Only then test a context-aware recommendation; preserve the room-first visual grammar and named-directory fallback as non-negotiable guardrails.

## Conclusion

The building has real **VERIFIED LOCALLY** interaction evidence and selected **VERIFIED PUBLICLY** directory evidence, but its overall stewardship status is **SPECIFIED**. The next meaningful work is not more inventory: it is proving that a clean visitor understands and can recover through the existing room, then reconciling that result with Ali's visual ruling.
