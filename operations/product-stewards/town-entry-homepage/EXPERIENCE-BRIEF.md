# Homepage and Town Entry — current experience brief

**Status:** CURRENT APPROVED-ONLY PRODUCT AUTHORITY — BUILDING
**Owner:** Homepage/Town Entry product steward; Ali owns taste and final visible approval
**Effective:** 2026-08-22
**Supersedes:** older Homepage briefs, prototypes, visual championships and chat-led summaries where they conflict

Load this file with `operations/DECISIONS.md`, the current capability state and
the exact implementation under review. This brief must retain Ali's direct
2026-08-22 Homepage walkthrough without replacing her decisions with a shorter
designer interpretation. If this file and that direct walkthrough diverge,
stop production and reconcile the brief before making pixels.

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
  - `Be kind, rewind. Put the pop-culture encyclopedia in your head to work on
    what comes next.`
  - `Your brain kept the references. We put them to work.`
  - `The plot explains it. The analogy unlocks it. Practice makes it click. The
    soundtrack makes it stick.`
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

## Returning signed-in orientation

- First-time, signed-out and unproved visitors receive the complete LAiDIES
  method and SUNNYVAiLE explanation in the locked comprehension sequence.
- A verified signed-in returning visitor receives that same explanation
  collapsed behind one clear `How LAiDIES and SUNNYVAiLE work` title. The
  visitor can expand it in place; no explanation is removed or made
  inaccessible.
- Automatic collapse requires both a proved account identity and a proved
  prior-visit boundary. A token, Resident Card, browser history, local visit
  timestamp or missing state cannot activate it alone. Identity failure falls
  back to the complete first-time explanation.
- The masthead itself gives returning visitors an obvious sign-in action and
  explains the benefit: signing in is how the Homepage can show verified
  personalized changes since the visitor's last account-backed visit. The
  action is not hidden in the header or below the fold. The public masthead may
  not promise this result until sign-in, last-seen and change-feed lifecycle
  proof passes end to end.
- For the Wednesday episode entrance, a verified signed-in returning visitor
  sees the most recent still-published episode she was actually in and a resume
  route to that episode. A first-time, signed-out, missing, invalid, held,
  withdrawn or unproved progress state falls back to the latest published
  episode. Draft Episode 05 or any other unreleased episode is never eligible.
- Episode memory requires one account-backed progress record with the exact
  episode identity, supported resume location, update time and invalidation
  behavior. A route visit, browser history, token, Resident Card or local tour
  mark alone cannot promote an episode as `where you left off`.

## Locked comprehension sequence

The top of the page must explain these ideas in this order:

1. **Arrival:** the locked masthead explains that LAiDIES teaches AI for women
   without a technical background.
2. **The LAiDIES method:** immediately after the masthead, preserve the existing
   explanation beginning `Your brain kept the references. We put them to work.`
   It explains the roles of story, analogy, practice, music and community. Do
   not replace it with a new slogan or move a Daily/news block ahead of it.
3. **SUNNYVAiLE:** make clear that the town organizes those complementary ways
   of learning into familiar buildings with familiar jobs.
4. **The Rewind Era:** make clear that remembered references help unfamiliar
   ideas become easier to understand and remember.

## 2026-08-23 owner walkthrough continuation — Homepage orientation

The Homepage currently remains too easy to misread as a collection of visuals.
A newcomer must not have to infer what the site is, why SUNNYVAiLE exists, how
the buildings relate to one another, or where to go next. Apply these locks to
the successor:

- Immediately after the LAiDIES-method explanation, explain that SUNNYVAiLE is
  the organizing model for the learning experience: familiar buildings have
  specific jobs, and the complementary formats help a visitor learn, practise,
  look something up, understand current news, use a tool, take a break or meet
  the community. Link to the Visitor's Centre for the complete explanation,
  directory, paths and tour.
- `What is happening in SUNNYVAiLE` is a real editorial preview, not an
  unexplained newspaper object or decorative rack. It must show readable,
  current admitted NewsStand material—current stories, The Daily explanation,
  the daily prompt and admitted tips/services such as Paige's Practical AI Tip,
  Career/Work-Life Tip and Promptoscope—with honest empty states for anything
  missing. Each item and the module itself have clear routes to the full
  NewsStand. No fixed visual-candidate headline may impersonate `Latest`.
- Keep `What is happening now` distinct from `What is new since your last
  visit`. The second job is a cross-town change feed covering released chapter
  updates, newly admitted books, published episodes, new features and other
  verified public site changes. The Homepage shows only a concise preview and
  links to the complete change list at the NewsStand.
- A signed-in visitor may eventually receive a personalized change list based
  on an account-backed last-seen boundary. Until Identity and Platform prove
  that boundary, signed-out and unproved states show a public recent-changes
  fallback plus a truthful sign-in invitation; they never claim to know what
  the visitor has or has not seen. Browser visit timestamps, a Resident Card or
  a token alone are not proof of account-backed last-seen state.
- `What brought you to town today?` remains the visitor-intent organizer, but
  every choice needs enough explanatory text to say what the visitor will get
  and where it goes. It must expose real starting points such as the latest
  episode and Miss Jeeves/LIBRAiRY instead of presenting unexplained names or
  bare visual doors.
- The Wednesday journey keeps one truthful connected order. Until Ali makes an
  exact successor ruling, preserve the already-documented eight stops that
  match her walkthrough: **NewsStand → The Chick Flicks (read, watch or listen
  to the current episode) → Blend & Snap (available Study Pack pieces) → KSVL
  → SUNNYVAiLE High (Pop Quiz) → The Mall/free time → BRONZE AiGE → Delta LAi
  Nu (Girl Talk and the admitted community experience)**. KSVL is also an
  always-available station outside this weekly route. Do not invent a different
  middle order from Ali's momentary uncertainty while recalling the sequence.
- Replace the redundant three-door Patron Saints/MAiVENS/Trailblazers treatment
  with one meaningful women-and-AI section. It explains that women have always
  built computing and AI, why women's participation now matters, and why AI
  fluency helps visitors work better with the technology, understand the
  headlines and participate in important public and workplace discussions.
  Route onward to the LUMINAiRY and Episode 04. Patron Saints, MAiVENS and
  Trailblazers may be explained inside that story; they are not three generic
  substitutes for exploring the town.
- `Explore SUNNYVAiLE` has one clear job. Direct destination links let visitors
  go straight to a known building; the town map supports optional discovery.
  Do not repeat the same heading for unrelated women-in-AI and map sections,
  and do not present an inert map or force district navigation before a known
  destination.
- Explain the distinct continuation and communication choices: a Resident Card
  can be made locally; the Closet keeps only state the current identity system
  proves; the Wednesday Postcard newsletter can be requested without making a
  Resident Card; and KSVL is the always-available station for LAiDIES songs and
  related audio. Do not merge or overpromise those lifecycles.
- Keep the explanation concise and layered: enough visible copy for the visitor
  to understand the job, followed by exact `learn more`/destination links.
  Visuals support that explanation; they do not replace it.
- The dusk masthead is a locked image choice, not a whole-page night setting.
  Keep its crop and image-derived text accents while making the page below it
  brighter and more varied. Do not solve darkness by restoring the rejected
  pale-pastel system.

### Six-example direction signal — exact artifact mapping bound

Ali reviewed six examples shown at approximately 07:18 on 2026-08-23. Her
current signal is:

- examples **1 and 4** are closest and are the primary references to reconcile;
- examples **2 and 5** are not liked and must not be selected as bases;
- examples **3 and 6** may contain useful secondary direction, but are not the
  preferred bases; and
- none of the six is approved as-is because every example still lacks enough
  explanation for visitors to know what they are choosing.

The displayed order is now bound to exact bytes:

| Example | Exact generated-image source | SHA-256 | Owner signal |
|---|---|---|---|
| 1 | `exec-b14acea2-e70d-4b89-b035-ec6b29ffbbba.png` | `46789f447c25356038d996b4dd9dcf9f5559d8556cc6ae41ea8ec5e820a0c02d` | Primary reference; preserve its clearer editorial hierarchy and stronger current-happenings composition |
| 2 | `exec-cee9469e-2e36-4c98-8b6f-5cdc0d90bda1.png` | `77d6dd7fb467ec09336b00b92626978c7d2dea124e21dad469a646162facf3df` | Not a base |
| 3 | `exec-9f195119-5577-499e-8295-c67fa2df53ce.png` | `ed6f8323efaeb2b8c6105739973860c4a659ce3580b79e2d9eb9479ae78ad230` | Secondary only |
| 4 | `exec-10654bc5-1cc5-4721-912c-8ded452a0a5e.png` | `e8d726c540f0aea48a8342d5f5278bc72f9721d4eb43f3a0b31ef46aa48b6d00` | Primary reference and structural base; preserve its brighter electric blue/pink comic-panel rhythm and image-led method |
| 5 | `exec-b85f05a1-a222-4b1e-89b9-2f038a8a5105.png` | `d3b64cba2011ece0b1d767051fcad19efcc7978ff464aa8359ec4c216213b5eb` | Not a base |
| 6 | `exec-3dbff3f8-17e4-4a33-b7d6-5269e21fe54a.png` | `929a1f4651074b567a601d13d913392367065c7782f929b0bf518b40358e26e6` | Secondary only |

Exact copies of primary examples 1 and 4 are retained at
`operations/design-explorations/reference/homepage/20260823-owner-shortlist/`.
The four non-primary binaries are not duplicated into the repository; their
source identity and checksum remain recorded above. These full-page generated
images are layout and art-direction references only. Their generated words,
signage, pseudo-UI, people and objects are not public-copy or production-asset
authority.

The next deterministic direction uses example 4 as the structural base and
example 1 for the stronger `What is happening in SUNNYVAiLE` editorial
composition. It must correct the shared comprehension failure rather than
average all six into another direction. Specifically retain the dense but
legible image-led editorial rhythm, saturated electric blue/pink/cyan colour,
black-ink framing and varied section composition. Remove the blank Daily,
generated lettering, invented or malformed signage, unexplained bare tiles,
full-page night treatment, incomplete Wednesday route and generic three-door
Patron Saints/MAiVENS/Trailblazers block.

### 2026-08-23 owner correction — method scale and copy provenance

The five-image `Story / Analogy / Practice / Music / Community` method collage
shown in the owner proof is rejected. It is confusing, consumes too much space
and does not earn that space with a useful destination job. Do not restore it
from examples 1 or 4. The method is one compact explanatory band using the
already-approved `Your brain kept the references...` and `The plot explains
it...` copy, the existing Homepage explanation, and a route to the Visitor's
Centre. Community remains part of the wider LAiDIES experience and the Delta
LAi Nu destination; it is not forced into the four-part method sentence.

The second repeated failure was preserving the incumbent section architecture
and merely reskinning it while filling gaps with newly invented public copy.
Every meaning-bearing section in the next proof must declare its exact copy
source. Unmapped filler, the rejected method collage, duplicated town
explanations and copy recovered from generated reference images fail before
owner review.

The Homepage Daily/NewsStand preview is specifically required to show useful
live content on arrival, not just publication names or an invitation to leave
the page. In a compact editorial module, show the current admitted AI
headline(s), Paige's Practical AI Tip, the Career/Work-Life Tip, the daily
prompt/Promptoscope and any other admitted current service. Give each item a
short readable value and route, plus one clear link to the full NewsStand.
Space efficiency may come from hierarchy, tabs/edition structure or a concise
front-page layout; it may not come from hiding all substance behind the link.

### 2026-08-23 owner rejection — masthead actions and complete page structure

The owner-reference synthesis with entry SHA-256
`a26fea1398b68a9154b3d510e8de0c1183efbe41b3b993837abba1de89e27ac4`
is fully rejected and is not an iteration base. Its internal admission failed:
it missed known brief violations that were visible in the artifact.

- Restore the useful masthead actions from the accepted Homepage source:
  `New in town?`, `The latest episode`, `Just running an errand?`, `Explore the
  town` and `Sign in`. They stay in the masthead unless the same jobs appear as
  immediately adjacent, equally obvious cards below it. Do not move these jobs
  into an arbitrary top-navigation list.
- The masthead also has a prominent control that starts KSVL audio. Its public
  label uses the sitewide `Play` ban's meaning-specific language, such as
  `Listen live — KSVL 99.9`. Starting audio and opening the KSVL building are
  separate actions, and audio never autostarts.
- Use the canonical shared LAiDIES wordmark/header implementation. Do not draw
  or typeset a substitute wordmark inside a candidate. Header links must map
  directly to real page sections or real destinations; remove the synthesis's
  bespoke link set rather than relabelling it.
- Rebuild `What brought you to town today?` around five understandable outcome
  groups: **Learn**, **Understand the Headlines**, **Watch the Episodes**,
  **Tools and Games**, and **Connect**. Each group explains what the visitor
  gets and routes to destinations that actually perform that job. No beige or
  black filler panels, cut-off images, empty gaps or mismatched building art.
- `What is happening in SUNNYVAiLE` must not repeat its heading as decorative
  image text. Show the actual admitted current news stories and current Daily
  services on the Homepage. Its single module-level CTA is `Open the
  NewsStand`; do not substitute `Browse all back issues`.
- The Wednesday section leads with the actual latest published episode for a
  signed-out or unproved visitor, or the proved last episode for an eligible
  signed-in visitor. The connected route supports that episode; it is not the
  whole section. Remove the bad-arrow treatment and all invented copy implying
  KSVL alone is always open. Every SUNNYVAiLE destination is available whenever
  its truthful capability state permits it.
- Use an uncropped, current and provenance-checked LUMINAiRY image. The women
  and AI section must retain its real explanation and routes to both the
  LUMINAiRY and Episode 04.
- Show the full approved town map without cutting off its meaning. Every named
  destination beside it states what the building is for; a bare place-name
  directory is insufficient.
- Resident Card/Closet, the Post Office/Wednesday Postcard, and KSVL are three
  distinct visitor outcomes. Do not combine them into one miscellaneous card
  row, and do not use a building exterior as evidence of a different job.
- Do not reuse the synthesis's old, unverified or wrong-job images. A successor
  requires a section-by-section source, crop and job map before composition.
  Missing outcome imagery is generated or held; it is never replaced by a
  convenient unrelated building image.
- The bright, saturated 1990s pop-art direction from owner examples 1 and 4
  remains binding. The successor uses real pop-art background assets and
  editorial composition rather than plain colour slabs, CSS decoration, beige,
  broad black fields or a return to the old Homepage layout.

## Required finite page jobs

These jobs must all survive. Their exact order after the locked masthead and
LAiDIES-method sequence is still an owner decision; a producer may not invent
that order inside a visual candidate.

- **What is happening in SUNNYVAiLE:** prominent admitted NewsStand newspaper
  treatment with current news, The Daily concept/explainer, Paige’s Practical
  AI Tip, Career/Work-Life Tip, Promptoscope and any other admitted service.
  Missing material gets an honest empty state; never invent filler.
- **What brought you into town:** direct outcome-labelled routes for learning,
  asking/finding, current news, the Wednesday ritual, practical help, fun/social
  use and exploring the town. Miss Jeeves and LIBRAiRY are prominent.
- **Wednesday route:** one connected itinerary through the episode, NewsStand,
  Chick Flicks, Blend & Snap, Study Pack, SUNNYVAiLE High and related admitted
  destinations. It is not the only way to use LAiDIES.
- **People:** a meaningful entrance to town characters, Patron Saints and real
  women/MAiVENS/Trailblazers without inventing faces or identity art.
- **Explore:** direct named destinations and jobs. The map is optional
  discovery, never a prerequisite or an extra click before a known route.
  Every rendered map destination is at least 44 by 44 CSS pixels and must pass
  both real pointer activation and keyboard focus/return checks; programmatic
  focus on a zero-size region is not interaction proof.
- **Continue and invite:** Resident Card/Closet and Wednesday Postcard are
  visibly different objects and outcomes; neither may imply an unproved
  account, reward, referral or delivery lifecycle.

## Walkthrough fidelity locks

- Retain and reorganize `What brought you to town today?`; do not replace its
  useful visitor-intent model with a generic feature grid.
- Retain the Wednesday loop, but do not make it the only way to understand or
  enter LAiDIES.
- Give women in AI, the LUMINAiRY and the Patron Saints a meaningful entrance.
- Link directly to named buildings and jobs. Do not force a district-selection
  click between a visitor and a destination they already chose.
- Keep KSVL prominent as a learning mechanism, not decorative atmosphere.
- Businesswomen's Special is a happy-hour social AI ritual with a cocktail or
  spirit-free choice and a conversation menu. It is not a drink generator.
- The whole page must be intuitive without hiding most choices behind endless
  disclosure controls, and it must not become an endless disconnected scroll.

## Production sequence

1. Inventory every Homepage destination by actual capability state.
2. Build the smallest desktop, intermediate and mobile first-screen proof that
   preserves the masthead, proves the comprehension sequence and exposes the
   primary navigation.
3. Get Ali's direction verdict on that bounded proof.
4. Only then compose the complete finite page from the required jobs above.

A first-direction candidate must not be a speculative complete page. It must
not use missing decisions as permission to invent ordering, public prose,
imagery, icons or visual systems.

## Shared header and KSVL

- One canonical header must look and behave consistently on every public page,
  while allowing page-specific colour treatment.
- The header uses a gradient or purposeful pop-art field; the LAiDIES wordmark
  is not plain white.
- Desktop and mobile expose direct LIBRAiRY navigation.
- Starting/stopping KSVL and opening the KSVL page are separate labelled
  outcomes. After explicit playback, one persistent player supplies pause,
  previous, next, volume and open-station controls wherever the canonical
  player is mounted. Full-page navigation cannot be described as seamless or
  uninterrupted until a shared application shell or explicit pop-out has been
  implemented and proved.
- Audio never autostarts.

## Visual and copy locks

- Ali's 2026-08-23 partial direction is **not a candidate approval**: the newer
  visual approach is moving closer and some treatments look cool, but several
  are too dark. Increase brightness and visual breathing room without returning
  to the rejected pale-pastel system.
- Visual energy cannot replace orientation. The Homepage must carry enough
  plain explanation for a newcomer to understand what LAiDIES and SUNNYVAiLE
  are, why the town exists, what the complementary learning formats do and how
  to begin using the site. A mostly visual treatment with too little explanatory
  text is a blocking comprehension failure. Await Ali's continuing voice notes
  before treating the exact balance or composition as decided.
- Use the vibrant electric 1990s palette, saturated gradients, purposeful
  halftone/pop-art texture, ink keylines, hard offset shadows and editorial
  composition. Use bounded colour families per section; do not pair purple and
  yellow.
- Sections must feel like authored objects and connected scenes—not a sequence
  of colour-swapped text boxes.
- Use visual information throughout, but never crop away meaning or hide text.
  Peer controls keep equal outer geometry and readable action rows.
- Text may be part of an image when it adds to the scene and is exact, correctly
  spelled and legible at its final display size. Check every character. Current,
  personalized or functional state remains live text so it can update honestly.
- Avoid unexplained blank space and endless scrolling. Important choices stay
  visible; one complete Explore route holds the long tail.
- Public copy uses LAiDIES voice and explains the real job. The word `Play` is
  banned in public UI.
- Until Ali approves a copy change, meaning-bearing Homepage prose must be
  copied exactly from the current `index.html`. A visual candidate may
  recompose that copy but may not write replacement sentences, summaries or
  filler. Canonical destination names and short functional control labels are
  the only exceptions.

## Banned and retired inputs

- Homepage directions A/B/C shown on 2026-08-22 are fully rejected, not
  iteration bases. Their exact entry SHA-256 values are
  `5f78b801a9b5f58c9f08bc7d3f792bc19df1af142d43dabdb822f5141afa5b96`,
  `cb4c420bea3a0e92752cd6bace1fe2d1614bc600d7be4d8c4f042b65e4e0d007`
  and `f51c450d7313a986425876cb2ef534b534a10c463e96335a288160acf8c009ba`.
  They failed the wordmark, image-led composition, full-page layout, required
  section coverage, first-session review and current-content truth. No
  successor may derive its layout, CSS decoration, header or Daily treatment
  from them.
- The later complete-page candidate with entry SHA-256
  `b4857077210899230e8a0ca6382a95f47f18a2f970b580919c34f2e7cad6c995`
  is also a full rejection and not an iteration base. It put sections in an
  unapproved order, invented meaning-bearing copy, ignored the required
  method-first sequence and failed to embody the direct morning walkthrough.
  Its internal `ADMIT` verdict is invalidated by Ali's artifact review.
- The three 1586×992 generated Daily-section assets offered on 2026-08-23 are
  also rejected, not selection options or production sources. Their SHA-256
  identities are `ea75d2d60926bb443b57da46f704a6fabb524d13859a8447890443407852be97`,
  `6eb7186d0cc91cd380d6c6f5288635eecc91ef1c88c055efc2818dcbaee3133d`
  and `b1fd0280e8bd94b124d68f188d303c6b64587236512f7d3916e0eb70439deaca`.
  They fail integrated editorial-object architecture and credible mobile
  recomposition; the latter two also contain pseudo-signage. No successor may
  derive its layout or generated lettering from them.
- The additive live-base proof with entry SHA-256
  `04b08302fca56e4c31eba83fe47880b6d6b773b51875cfea76233820bcdd98f2`
  is fully rejected, including its method composition, physical Daily rack and
  internal `ADMIT` verdict. It preserved the half-pastel/half-bold visual split,
  accumulated CSS decoration, failed to reorganize the finite page, used a
  nonsensical newspaper/text composition and left required imagery missing.
  No Homepage successor may use additive live-base patching as its design
  method or derive layout, section styling or Daily treatment from this proof.
- A Homepage review URL may never suppress the required first-session ident.
  Review exposes the entrance by default and provides a visible replay control.
- `Latest` NewsStand or episode content must resolve from the current admitted
  data source at runtime. A fixed story title in a visual candidate is banned.
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

### 2026-08-23 owner correction — map order, weekly loop and destination art

- The Post Office and KSVL continuation panels in candidate
  `4a39b8ab…a06e7` use the wrong images. Do not reuse those image paths. Resolve
  each panel from the current approved destination asset before another owner
  review; `current`, `latest` or a plausible filename is not approval.
- The directory below the town map follows the canonical building order and
  canonical addresses. It must agree with the visible map, street grouping and
  building numbering; a hand-authored destination list in an arbitrary order
  fails even when every route resolves.
- `On Wednesdays we do AI` explains the repeatable weekly episode loop, not
  merely a row of destinations. Start with the trailer for a new visitor, then
  explain how the episode, NewsStand, Chick Flicks, Blend & Snap/Study Pack,
  SUNNYVAiLE High and the rest of the weekly experience connect.
- The weekly route must use the actual stops and jobs. `Free time` includes all
  activities, updating the visitor's Resident Card and finding charms hidden
  in images. Do not reduce it to The Mall or invent a replacement sequence.
- Replace the boring white episode card. The current episode art must fit its
  intended frame without a meaning-destroying crop. The latest published
  episode remains the signed-out default; any returning progress treatment
  must state and use the progress that the current identity/persistence system
  actually proves.
- Provide an obvious `Start with the trailer` route without implying that the
  trailer or a personalized progress system is public when it is still held.
  If the trailer is not admitted, show the truthful held state rather than a
  dead or misleading action.
- The Homepage route refers to the existing illustrated Trailer issue at
  `/issues/issue-trailer.html`, not to the separate rebuilt film. Name it as
  the illustrated trailer and do not place held-rebuild copy beside its live
  route; that made one control assert two contradictory states.
- The `Learn` job routes to the LIBRAiRY and the LUMINAiRY, with SUNNYVAiLE
  High joining that group when its learning experience is admitted. Delta
  LAi Nu is not the Learn destination and its image may not represent Learn.
- `Tools and Games` represents the available collection, not Dream Phone as
  though it were the only activity. Show the category breadth and route to the
  activities collection; individual examples may support the category but may
  not replace it.
- The Delta LAi Nu image used in candidate `4a39b8ab…a06e7` is not the correct
  destination image. Do not reuse that path in the successor.

- First-time, returning anonymous, device-local Resident Card and verified
  account-backed states keep the same usable public core.
- Current content fails evergreen. Account, progress, reward, community,
  delivery and cross-device claims require owner evidence.
- Anonymous visitors can use the site. A Resident Card may add only continuity
  the identity system actually proves.

## Open implementation decisions

- Exact order and responsive composition of the required finite page jobs
  after the locked masthead and LAiDIES-method sequence.
- Which destination capabilities are `PUBLIC_VERIFIED`,
  `LOCAL_VERIFIED_NOT_DEPLOYED`, `SOURCE_PRESENT_UNVERIFIED`, `PLANNED`,
  `REJECTED_SUPERSEDED` or `MISSING_RECEIVER`.
- Exact canonical shared-header/player implementation.

No whole-page visual candidate may reach Ali until the repository design-review
admission gate has been calibrated to reject the known failed candidate and the
exact candidate passes desktop/mobile maker inspection.
