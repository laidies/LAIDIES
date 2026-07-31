# Blend & Snap Study Pack entry — live walkthrough findings

Date: 2026-07-28  
Status: **WORKING REDESIGN PROTOTYPE BUILT AND VERIFIED**  
Scope: entrance and episode selection only; do not let these page defects block
review of the Episode 01 Study Pack components.

## Ali’s observed problems

1. **Episode 04 looks like the only Study Pack.**
   The current Special occupies the primary hierarchy while Episodes 01–03 are
   hidden at the bottom.
2. **The other packs are mislabelled as “The Regulars · past episode pack
   menus.”**
   That café metaphor does not read as the episode Study Pack selector.
3. **The selection experience is confusing and visually weak.**
   A learner must infer that the small rows at the bottom are the route to the
   pack she actually wants.
4. **The coffee-order interaction does not make sense in the Study Pack path.**
   It was intended to demonstrate context/device memory, but functions as
   unrelated friction before the user can choose learning material.

## Later redesign direction

- Show the episode-pack selector immediately and give every available episode
  equal, understandable selection treatment.
- Label the control plainly: **Choose an episode Study Pack**.
- Make the current/latest pack a useful default, not the only visually dominant
  choice.
- Do not hide older episodes behind café-language such as “The Regulars” or
  “back menu.”
- Let a learner go directly from episode choice to its three Study Pack
  components.
- Keep coffee selection, if retained at all, as an optional café interaction
  outside the Study Pack route. Never require it or imply it is part of opening
  a pack.
- Redesign against the approved Homepage/Study Pack visual language rather than
  polishing the current pale ledger.

## Corrections made during the walkthrough

- Fixed the validator that still required Episode 01’s deleted fourth pack
  item.
- Added a bounded local Episode 01 review route to the accepted Try-On and new
  Trading Card Pack while the Cheat Sheet remains honestly held.
- Corrected Episode 04 Concept Cards from **unavailable / not made** to
  **planned / not built yet**, following Ali’s explicit decision that Episode
  04 should include Concept Cards.

## Working redesign result

A responsive working prototype now implements the later redesign direction:

- one immediately visible, fully clickable **This Week’s Study Pack**;
- Episodes 01–03 together in a colourful grid;
- one distinct coordinated visual identity per episode;
- a separate pack-detail view that shows the three pack items together and lets
  the learner choose where to begin;
- truthful READY, PLANNED and IN REDESIGN states;
- the Pop Quiz separated as a next step rather than a fourth pack item; and
- no coffee-order gate or hidden café-menu metaphor.

The prototype and its passed design QA live at
`operations/design-explorations/study-pack-storefront-20260728/prototype/`.
No public publication or deployment was performed.
