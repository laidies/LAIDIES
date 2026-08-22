# Homepage and Town Entry — current experience brief

**Status:** CURRENT APPROVED-ONLY PRODUCT AUTHORITY — BUILDING
**Owner:** Homepage/Town Entry product steward; Ali owns taste and final visible approval
**Effective:** 2026-08-22
**Supersedes:** older Homepage briefs, prototypes, visual championships and chat-led summaries where they conflict

Load this file with `operations/DECISIONS.md`, the current capability state and
the exact implementation under review. Historical walkthroughs are provenance,
not production authority.

## Visitor outcome

The Homepage is a guided town square and the threshold into LAiDIES. Within the
first screen a newcomer must understand:

1. LAiDIES teaches women how AI works, how to use it and how to think about it;
2. SUNNYVAiLE organizes complementary ways of learning into familiar buildings;
3. Rewind Era stories, examples, activities and music make learning easier to
   understand, remember and apply; and
4. one clearly labelled next action is available without learning the map,
   becoming a resident or completing a tour.

A visitor asking “Why is there a town?” or “What does this have to do with AI?”
is a blocking failure. The Visitor’s Centre owns the complete explanation,
directory, paths, tour and help; the Homepage owns the compact causal model.

## Locked masthead

- Preserve `assets/sunnyvaile-streets/main-street-dusk.webp` and its existing
  crop unless Ali approves an exact successor.
- Preserve this exact meaning-bearing copy:
  - `AI fluency, taught through the pop culture you never forgot.`
  - `Made to click. Built to stick.`
  - `LAiDIES helps women understand and use AI through stories, practical tools,
    games, music and community. Welcome to the Rewind Era—twenty years of pop
    culture, from dial-up to downloads (1990–2010)—and to SUNNYVAiLE, the
    learning town where Girl Power meets Machine Power.`
- Masthead text colours come from the image: purple, pink and teal/cyan. Mint is
  not a masthead accent.
- The public name is always `LAiDIES`. The `Ai` is one contrasting unit and the
  square `i` tittle retains the canonical six-colour cycle; reduced motion uses
  the static pink state.

## First-session entry

- Compose a brief dial-up/entering-SUNNYVAiLE portal into the locked masthead.
- The canonical source is
  `operations/design-explorations/laidies-motion-ident-20260725/continuous-i-evergreen-six-clean-electric-v10.mp4`,
  SHA-256 `05a52c003ecf0b0caad7dcdb9c056da3b77dd9ee27d9dc67ee0aa7eaf2c1ffa3`.
- It appears once per browser session, never on every return to Home.
- It is muted, skippable and pausable; reduced-motion users and media/storage
  failures receive the static masthead immediately.
- Navigation and primary actions never wait for the animation.

## Page hierarchy and functions

1. **Arrival:** locked masthead and compact product explanation.
2. **What is happening in SUNNYVAiLE:** prominent admitted NewsStand newspaper
   treatment with current news, The Daily concept/explainer, Paige’s Practical
   AI Tip, Career/Work-Life Tip, Promptoscope and any other admitted service.
   Missing material gets an honest empty state; never invent filler.
3. **What brought you into town:** direct outcome-labelled routes for learning,
   asking/finding, current news, the Wednesday ritual, practical help, fun/social
   use and exploring the town. Miss Jeeves and LIBRAiRY are prominent.
4. **How SUNNYVAiLE works:** the existing accurate explanation of stories,
   reference, practice, music and community; do not replace it with a slogan.
5. **Wednesday route:** one connected itinerary through the episode, NewsStand,
   Chick Flicks, Blend & Snap, Study Pack, SUNNYVAiLE High and related admitted
   destinations. It is not the only way to use LAiDIES.
6. **People:** a meaningful entrance to town characters, Patron Saints and real
   women/MAiVENS/Trailblazers without inventing faces or identity art.
7. **Explore:** direct named destinations and jobs. The map is optional
   discovery, never a prerequisite or an extra click before a known route.
8. **Continue and invite:** Resident Card/Closet and Wednesday Postcard are
   visibly different objects and outcomes; neither may imply an unproved
   account, reward, referral or delivery lifecycle.

## Shared header and KSVL

- One canonical header must look and behave consistently on every public page,
  while allowing page-specific colour treatment.
- The header uses a gradient or purposeful pop-art field; the LAiDIES wordmark
  is not plain white.
- Desktop and mobile expose direct LIBRAiRY navigation.
- Starting/stopping KSVL and opening the KSVL page are separate labelled
  outcomes. After explicit playback, one persistent player supplies pause,
  previous, next, volume and open-station controls across page navigation.
- Audio never autostarts.

## Visual and copy locks

- Use the vibrant electric 1990s palette, saturated gradients, purposeful
  halftone/pop-art texture, ink keylines, hard offset shadows and editorial
  composition. Use bounded colour families per section; do not pair purple and
  yellow.
- Sections must feel like authored objects and connected scenes—not a sequence
  of colour-swapped text boxes.
- Use visual information throughout, but never crop away meaning or hide text.
  Peer controls keep equal outer geometry and readable action rows.
- Avoid unexplained blank space and endless scrolling. Important choices stay
  visible; one complete Explore route holds the long tail.
- Public copy uses LAiDIES voice and explains the real job. The word `Play` is
  banned in public UI.

## Banned and retired inputs

- rejected candidate identity `7c10a847…fff` and its changed masthead/method
  copy, invented icon family and generic update treatment;
- Cycle 9 or any historical exploration as a visual base;
- `assets/library/jeeves-scene.webp` and any unadmitted Miss Jeeves image;
- pale pastel sameness, dominant purple/yellow, cottagecore, gothic/fairy-tale,
  juvenile or glamour-cartoon treatment;
- generic SaaS cards, white-page/black-text boxes, repeated white text, random
  circles/dots, placeholder icons and decorative filler;
- claims that source presence, local code or a route means a feature is live.

## Visitor states and truth

- First-time, returning anonymous, device-local Resident Card and verified
  account-backed states keep the same usable public core.
- Current content fails evergreen. Account, progress, reward, community,
  delivery and cross-device claims require owner evidence.
- Anonymous visitors can use the site. A Resident Card may add only continuity
  the identity system actually proves.

## Open implementation decisions

- Exact post-masthead responsive composition; current recommendation is The
  Daily/current town first, visitor jobs second and Wednesday third.
- Which destination capabilities are `PUBLIC_VERIFIED`,
  `LOCAL_VERIFIED_NOT_DEPLOYED`, `SOURCE_PRESENT_UNVERIFIED`, `PLANNED`,
  `REJECTED_SUPERSEDED` or `MISSING_RECEIVER`.
- Exact canonical shared-header/player implementation.

No whole-page visual candidate may reach Ali until the repository design-review
admission gate has been calibrated to reject the known failed candidate and the
exact candidate passes desktop/mobile maker inspection.
