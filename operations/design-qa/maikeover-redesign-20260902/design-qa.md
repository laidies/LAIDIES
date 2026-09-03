# MAiKEOVER local design QA — 2026-09-02

## Status

`LOCAL CANDIDATE / INDEPENDENT VISUAL PASS / OWNER REVIEW /
NOT PUSHED / NOT DEPLOYED / NOT PUBLICLY VERIFIED`

## Invalidated predecessor

The earlier seven-drawer candidate is rejected. Its illustrated drawer faces
were used as an imprecise HTML click map, its cyan active outline looked pasted
onto the artwork, and its first `Look` control opened only a portrait-booth hold
notice. Any internal pass attached to that candidate is invalid.

Ali also directly rejected the first six-step successor after its internal
pixel pass. At the real wide browser, its uncapped maker scaled into a giant
empty hero: the title dominated, the Card floated high in the mirror and no
working controls appeared in the visible frame. That pass is invalidated; the
three `unified-*` screenshots are predecessor evidence, not the current target.

Ali directly rejected the later `wide-reset-final.jpg` candidate because its
percentage-positioned HTML title crossed onto the illustration's red frame and
the Card remained visibly off-centre. The associated internal pixel pass is
invalidated.

Ali directly rejected the overlay-free successor because it exposed a second
structural defect: a huge flat pink CSS rectangle still impersonated the Card
and the left half of the vanity remained an empty teal bay. The physical-shell
v1 successor removed both defects but failed independent review at a 1280 by
720 viewport because its 853-pixel-tall vanity pushed every working control
below the fold. That candidate is also invalidated.

Ali then rejected physical-shell v2 because the vanity/background was poor,
the Card text was barely visible, its planes used incompatible perspectives
and the seven illustrated drawers were not real controls. Its independent PASS
is invalidated. The current straight-on v3 successor removes the chair, floor,
cabinetry and every decorative drawer; mirror, Card and counter share a frontal
elevation, and only the six working controls follow it.

Ali rejected straight-on v3's Card as visually poor and passport-like. The
first collectible replacement was also rejected because its huge fastened
panel read as a whiteboard on the mirror. The current v5 replacement uses a
smaller wallet-card silhouette with no screws, wall mount or baked portrait.

## Controlling correction

- The physical mirror, Card and counter share one straight-on wide image asset;
  it ends beneath the counter and contains no decorative drawers or chair.
- The internal canvas caps at 1120 CSS pixels at the real desktop preview.
- The visitor sees six working steps in the Card's reading order: Backdrop, Era
  faves, Soundtrack, Saint, Carrying and Finish.
- The step strip and workbench are in normal document flow, not over the image.
- The live landscape Card remains wholly inside and centred in the illuminated
  mirror without a large empty lower field or a CSS-drawn shell.
- Card detail text uses dark ink with a 12 CSS-pixel desktop floor.
- The Card uses familiar credential zones for resident header, number, name,
  handle, five favourites rows and portrait, with generous mirror around it.
- The mobile anchor journey keeps the complete maker title visible below the
  fixed site header.

## Rejected review views

- `wide-reset-final.jpg`
- `mobile-reset-final.jpg`
- `maikeover-vanity-resident-card-shell-candidate-v1.png`
- `maikeover-vanity-resident-card-shell-candidate-v2.png`
- `maikeover-vanity-straight-on-card-candidate-v3.png`
- `maikeover-vanity-collectible-card-candidate-v4.png`

## Verification

- `node scripts/check-maikeover-redesign.mjs`: PASS, including deliberate
  failure calibration for a missing account promise, split masthead, CSS-drawn
  Card shell and dead portrait step.
- Exact 1074 by 917 desktop browser: 1074 by approximately 604 CSS-pixel vanity,
  403.4 by 223.5 CSS-pixel Card, 12 CSS-pixel minimum detail type, no horizontal
  overflow, and all six controls visible directly beneath the counter.
- Computed Card shell: no CSS background image, border or box shadow; the image
  asset owns the material, edge, portrait bay and depth.
- Exact 390 by 844 mobile browser: no horizontal overflow, all six controls are
  130 by 64 CSS pixels, and Card details retain a 6.2 CSS-pixel floor inside the
  proportionally scaled physical Card.
- Browser interaction: choosing a Card finish updates the live Card state;
  `Next: Soundtrack` activates the soundtrack panel and heading.
- The prior independent v2 PASS is invalidated by Ali's direct rejection.
- The prior independent straight-on v3 PASS is invalidated by Ali's direct Card
  rejection. The first independent v5 review returned HOLD because the 9-pixel
  header and 11-pixel handle missed the 12-pixel resident-field minimum. Both
  are corrected to 12 pixels. The successor review returned PASS at 1074 by
  917: header, number, handle and favourites all measure 12 pixels; the name is
  24.7 pixels; no field clips or collides; the Card reads as a compact
  front-facing Resident Card with no mounting hardware; the drawerless vanity,
  six enabled controls, loaded image and zero horizontal overflow remain intact.
- Order correction requires the visible strip and Next/Previous behaviour to
  traverse Backdrop → Era faves → Soundtrack → Saint → Carrying → Finish while
  preserving the existing data keys.
- Independent order review returned PASS: all direct tabs activate the matching
  panel; Next and Previous traverse the same sequence; Backdrop disables
  Previous; Finish hides Next; `movie`, `tvshow`, `song`, `saint` and `carry`
  storage fields are unchanged; the 1074-pixel preview has no overflow and the
  v5 Card, drawerless stage and six enabled controls remain intact.
- `SUNNYVAiLE` remains canonical in the Card header. The embedded `Ai` is an
  explicit 1.25em, weight-900 current-yellow span inside the 12-pixel header;
  the number stays on the same rail and the page retains zero overflow.
- Independent review returned PASS at 1074 by 917: `Ai` measures 15 pixels,
  the white header and number each measure 12 pixels, the label ends at x=566.8
  before the number begins at x=681.9, and no clipping, collision, overflow or
  Card/control-order regression was found.
- The Resident Card explainer's computed predecessor colours were pale blue
  `#cfeaff` and inherited dusty plum `#4b2148`. The successor uses the exact
  current LIBRAiRY gradient `#ef4d9c` → `#b75cc4` → `#6c7cd1`, warm-white
  `#fffdfb` display type and explicit deep ink `#07102b` for kicker, lead,
  steps, links and persistence copy. At the 1074 by 917 browser view it has no
  horizontal overflow. The ink-to-gradient contrast is 5.56:1, 4.78:1 and
  4.87:1 at the three stops.
- Independent read-only review returned PASS at 1074 by 917: no blocking visual
  defect, the explainer belongs with the current LIBRAiRY arrival palette,
  title and body remain legible across the gradient, `scrollWidth` equals
  `clientWidth` at 1074 and the unchanged v5 vanity follows directly.
- Isolated functionality test used `localhost` so its synthetic Card could not
  overwrite the owner's `127.0.0.1` draft. Backdrop `holo`, Movie `Clueless`,
  TV `Daria`, Song `Welcome to the LIBRAiRY — The Bots`, Saint `Elle Woods`,
  Carrying `Milky pen` and Name `Test Resident` each appeared in the correct
  live Card field. Next/Previous and direct tabs preserved Backdrop → Era faves
  → Soundtrack → Saint → Carrying → Finish.
- Save returned the exact device-local/account-handoff success state; reload
  restored every field and Card finish. A second save changed the name to
  `Updated Resident`; a second reload retained it, and the Closet rendered the
  updated name plus all five favourites with no broken images or overflow.
- The Resident Card handoff resolved to `#rcAccountTitle`, loaded the required
  email field and signed-out status, and loaded the identity, account runtime
  and account page scripts. No email was submitted. The Closet handoff resolved
  to `The Closet` and explicitly reported its device-local/account-backed state.
- Browser logs contained zero errors on maker, account and Closet routes. The
  only warnings were Plausible intentionally ignoring `localhost` events.
- Corrected stale closed-intake assertions now pass against the current
  identity authority: `check-maikeover-contract.mjs` PASS,
  `test-resident-card-contract.mjs` 33/33 and shared contract 34/34. The separate
  community-boundary browser script was not run because its configured
  `.ds-sync/node_modules/playwright-core` dependency is absent; the equivalent
  static local-card non-escalation assertions pass in the 33/33 suite.

## Scope boundary

This is local visual and interaction QA, not owner approval or release evidence.
The existing account/cross-device contract remains held: the broader Resident
Card check passes 26 of 31 assertions and the older MAiKEOVER account check
still reports three hold-related failures. This redesign explains the intended
Card-to-Closet journey but does not verify that cross-device account persistence
is live. No push, deployment or public verification occurred.
