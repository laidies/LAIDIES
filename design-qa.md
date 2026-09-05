# Design QA — room-first building rebuilds

## Screening Room episode VHS posters — 2026-09-04

**Source visual truth**

- Ali's rejected generic Episode 04 title-card poster:
  `operations/design-audit/chick-flicks-watch-vhs-posters-20260904/source-wide-title-poster.png`
  (2070 × 1170 pixels).
- Approved exact cover family:
  `assets/sunnyvaile-interiors/episode-vhs-boxes-v2/ep-01.png` through
  `ep-04.png` (1024 × 1536 pixels each).
- Same-state comparison:
  `operations/design-audit/chick-flicks-watch-vhs-posters-20260904/before-after-vhs-poster.jpg`.

**Rendered implementation**

- Episodes 01–04 desktop contact sheet:
  `operations/design-audit/chick-flicks-watch-vhs-posters-20260904/all-four-vhs-posters.jpg`.
- Individual desktop states:
  `episode-01-desktop.jpg`, `episode-02-desktop.jpg`,
  `episode-03-desktop.jpg` and `episode-04-desktop.jpg` in that directory.
- Episode 04 phone state: `episode-04-phone.jpg` (390 × 844 pixels).

**Findings and fidelity surfaces**

1. **P1 fixed — the physical tape identity disappeared at the Watch player.**
   The generic wide title card is replaced before playback by the exact selected
   episode's approved VHS cover. Episodes 01–04 each bind their own cover.
2. **Typography and copy:** no interface wording or type treatment changed; the
   episode name is carried by the existing approved cover artwork.
3. **Spacing/layout rhythm:** the portrait cover is centred with `object-fit:
   contain` inside the existing 16:9 black film window. The player, native
   controls and surrounding auditorium geometry are unchanged.
4. **Colours and image quality:** no new colour relationship or image derivative
   was introduced. The exact existing 1024 × 1536 PNG cover bytes are used.
5. **Function and content:** only the native player's idle poster changed. Film
   source, captions, resume, Watch/Listen switcher, Media Session artwork and
   post-play behavior remain unchanged.

**Functional evidence**

- The calibrated format-shell check rejects restoration of the generic admitted
  poster, then the normal format-shell and 12-point Chick Flicks contracts pass.
- Ali's in-app browser rendered all four exact mappings at desktop width and
  Episode 04 at 390 × 844 without changing the film player or its controls.
- The optional automated browser suite was not run because it would open a
  separate browser; the same assertion is updated for the next permitted run.
- Local verification only; no deployment or public-origin claim.

final result: passed

## Screening Room Watch shell — 2026-09-04

**Source visual truth**

- Rejected incumbent desktop journey:
  `operations/design-audit/chick-flicks-watch-current-site-20260904/01-before-desktop.png`
  (1374 × 2810 pixels, 1374 × 900 CSS viewport, density 1).
- Governing colour source:
  `content/site/laidies-visual-system.css`, already consumed by the current
  Homepage, LIBRAiRY, Chick Flicks and Listen surfaces.
- Same-input comparison:
  `operations/design-audit/chick-flicks-watch-current-site-20260904/07-before-after-comparison.jpg`.

**Rendered implementation**

- Desktop arrival:
  `operations/design-audit/chick-flicks-watch-current-site-20260904/02-after-desktop-top.jpg`
  (1374 × 900 pixels).
- Desktop film and controls:
  `operations/design-audit/chick-flicks-watch-current-site-20260904/03-after-desktop-stage.jpg`
  (1374 × 900 pixels).
- Desktop episode links:
  `operations/design-audit/chick-flicks-watch-current-site-20260904/04-after-desktop-extras.jpg`
  (1374 × 900 pixels).
- Phone arrival and film journey:
  `operations/design-audit/chick-flicks-watch-current-site-20260904/05-after-phone-top.jpg`
  and `06-after-phone-stage.jpg` (390 × 844 pixels each).
- State: Episode 04 Watch mode, current 20:22 illustrated video, same-device
  resume state present, captions idle at 0:00.

**Findings and comparison history**

1. **P1 fixed — the whole Watch destination read as a black media app.** The
   old auditorium, switcher, caption space and resume controls shared one dark
   field. The successor uses the shared pink-purple-cyan arrival, physical
   programme shelf and yellow-mint-cyan comic auditorium. Black is now confined
   to the actual 16:9 film window.
2. **P1 fixed — an empty caption panel looked like a second unexplained box.**
   Caption bars now stay hidden while no cue text is active and appear only
   when a real caption is available.
3. **P2 fixed — supporting controls did not read as LAiDIES controls.** The
   Watch/Listen switcher, resume state, caption state and episode links now use
   dark ink, heavy keylines, bright fills and offset colour edges from the
   shared current system.

**Fidelity surfaces**

- **Typography:** Anton remains the episode display face and Jost the interface
  face. Cream is confined to the large masthead title and the dark-purple
  Trailer shelf cell; normal controls and body copy use dark ink.
- **Spacing/layout rhythm:** the existing arrival, format navigation, programme,
  16:9 film and one Special features band remain in the same order. The mobile
  programme remains intentionally horizontally scrollable inside its own rail.
- **Colours/tokens:** Watch now consumes the same ink, hot pink, purple, cobalt,
  cyan, coral, mint, yellow, cream and lilac contract as the approved surfaces.
  The film itself remains black because that darkness performs a media job.
- **Image quality/assets:** no image or video was generated, replaced or
  recompressed. The approved Episode 04 VHS cover, poster and current film bytes
  are unchanged.
- **Copy/content:** episode title, current-video wording, return route and all
  six Special features labels/destinations are unchanged. Resume and retry now
  say `episode` in both formats instead of incorrectly calling Watch a
  `listen-along`.

**Functional evidence**

- The existing native video controls, Watch/Listen switcher, same-device
  Resume/Start over state and all six episode links remain visible in browser
  checks.
- Desktop and 390 × 844 renders show no visible page-level horizontal clipping;
  the phone shelf alone retains its intentional internal overflow.
- The calibrated shell check fails when the bright Watch auditorium is replaced
  with black, then the normal format-shell and 12-point Chick Flicks contracts
  pass.
- Browser verification used the user's in-app browser. The optional automated
  browser suite was not run because it would start a separate browser.
- Local verification only; no deployment or public-origin claim.

final result: passed

## Screening Room return-control contrast — 2026-09-04

**Source visual truth**

- Ali's rejected low-contrast screenshot:
  `operations/design-audit/screening-return-contrast-20260904/source-low-contrast.png`
  (1374 × 224 pixels).
- Same-input comparison:
  `operations/design-audit/screening-return-contrast-20260904/comparison.html` and
  `comparison.png`.

**Rendered implementation**

- Focused desktop crop:
  `operations/design-audit/screening-return-contrast-20260904/implementation-desktop.png`
  (1374 × 224 pixels from a 1374 × 800 CSS viewport; browser density 1).
- State: Episode 04 Listen mode, immediately below the format selector and above
  the programme shelf.

**Findings and comparison history**

1. **P1 fixed — the return destination was dark text directly over a busy
   purple-blue comic field.** It was technically present but did not read as a
   navigation control. The successor uses a yellow LAiDIES action surface,
   deep-ink type and border, and pink offset edge without adding a white card.
2. **P2 fixed — the text link had no dependable touch target or visible focus
   treatment.** The successor is an inline-flex 44px-high control. Hover and
   keyboard focus switch to mint, add a cobalt offset edge and retain a visible
   cream focus outline.

**Fidelity surfaces**

- **Typography:** Jost remains the interface face; weight increases from 800 to
  900 while the wording and natural casing are unchanged.
- **Spacing/layout rhythm:** the control stays in its original position and
  remains compact; its 273.8 × 44px rendered box does not compete with the
  primary Listen action.
- **Colours/tokens:** foreground `#11183b` on `#ffd34d` measures 12.05:1. Pink,
  mint, cobalt and cream are limited to edge and interaction states from the
  shared current LAiDIES system.
- **Image quality/assets:** no image was generated, replaced or altered. The
  approved Episode 04 VHS cover and illustrated masthead remain unchanged.
- **Copy/content:** exact destination and wording remain `Return this tape to
  The Chick Flicks`.

**Functional evidence**

- The exact link remains `/chick-flicks.html` and is exposed as a named link in
  the browser accessibility tree.
- Desktop and 390 × 844 browser renders show the control clearly separated from
  the background; the phone version wraps to two lines without clipping.
- Both measured states report zero horizontal overflow.
- Browser logs contain no application errors; Plausible reports only its
  expected localhost ignore warning.
- The calibrated format-shell check fails when the yellow return surface is
  removed, then the normal format-shell and 12-point Chick Flicks contracts pass.
- Focused comparison is sufficient because the defect and edit are confined to
  this one return control; the surrounding masthead, player and shelf were not
  changed.
- Local verification only; no deployment or public-origin claim.

final result: passed

## Chick Flicks future-release VHS shelf — 2026-09-02

**Source visual truth**

- User-rejected announcement panel: `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-5bded0f3-ccd2-40ce-9b75-1ab94d5aeff2.png` (2062 × 750 px).
- Accepted VHS packaging reference: `assets/sunnyvaile-interiors/episode-vhs-boxes-v2/ep-01.png` (1024 × 1536 RGBA).
- Full comparison: `operations/design-qa/chick-flicks-20260902-v5/comparison-banner-to-vhs-shelf.png` (3284 × 768 px).
- Focused case comparison: `operations/design-qa/chick-flicks-20260902-v5/comparison-case-family.png` (984 × 768 px).

**Rendered implementation**

- Desktop future shelf: `operations/design-qa/chick-flicks-20260902-v5/implementation-desktop-future-shelf.png` (1440 × 1100 px; 1440 × 1100 CSS viewport; density 1).
- Phone future shelf: `operations/design-qa/chick-flicks-20260902-v5/implementation-mobile-future-shelf.png` (390 × 844 px; 390 × 844 CSS viewport; density 1).
- State: Episode 04 remains the latest release; Episodes 05–07 fill the remaining physical bays with the same inactive Coming soon case.

**Findings**

- No actionable P0/P1/P2 differences remain. The oversized announcement has been replaced by the requested physical shelf state.
- Typography: the generated case says only `COMING SOON`, checked character-for-character. Shelf labels identify Episodes 5, 6 and 7 in the existing Jost UI style.
- Spacing/layout: four equal cases fill the second desktop shelf; the existing phone rule makes two shelf rows. Labels remain uncropped and document width measured 390px in a 390px viewport.
- Colours/tokens: placeholder art stays inside the current LAiDIES palette and is intentionally less saturated than released cases.
- Image quality/assets: the 1024 × 1536 clear clamshell matches the episode family and uses genuine RGBA exterior transparency. A first RGB checkerboard export was rejected before page integration.
- Copy/content: the `Next arrival` block and explanatory sentence are removed. No fabricated episode imagery or title was introduced.
- Interaction/accessibility: all three cases are non-interactive, have explicit accessible names, and expose zero links, dialogs or format routes. Browser error log was empty.

**Comparison history**

1. P1 source: generic announcement card outside the physical catalogue.
2. Fix: one reusable `COMING SOON` VHS placed in bays 5–7 with deterministic episode labels and no actions.
3. Post-fix: combined full view and focused case-family comparison passed at desktop and phone widths.

**Primary interactions tested:** released tape behavior retained, three future cases inert, zero future routes, responsive four/two-across layout, no horizontal overflow and no page errors.

final result: passed

## Chick Flicks Listen hidden-caption correction — 2026-09-04

**Source visual truth**

- Ali's rejected double-box screenshot:
  `operations/design-qa/chick-flicks-caption-state-20260904/source-rejected-double-caption.png`
  (2146 × 666 pixels).

**Rendered implementation**

- Local route:
  `http://127.0.0.1:4174/watch.html?ep=04&mode=listen&v=20260904-caption-fix`.
- Durable same-input comparison:
  `operations/design-qa/chick-flicks-caption-state-20260904/comparison.html`.
- Browser-rendered comparison capture: 1280 × 720 CSS viewport and output,
  density 1, Episode 04 Listen mode, player scrolled to the caption/transport.
  The in-app browser emitted the screenshot in the task; it did not expose a
  separate local image path.

**Findings and comparison history**

1. **P1 fixed — the hidden Watch caption bar rendered as an empty second mint
   panel in Listen.** The source has one populated caption panel and one empty
   duplicate. The corrected browser render has one populated panel only.
2. Cause: the later `.screening-room-page .cap-bar { display:grid; }` declaration
   had equal specificity to the inline `.cap-bar[hidden]` rule and won the final
   cascade.
3. Fix: `.screening-room-page .cap-bar[hidden] { display:none; }` now follows the
   authored display rule. Browser computation reports two authored bars, one
   visible bar, and the hidden bar at `display:none` with zero height.

**Fidelity surfaces**

- **Typography:** unchanged; the populated announcer label and caption retain
  the approved Jost hierarchy.
- **Spacing/layout rhythm:** the unwanted 88px panel and its surrounding gap are
  removed. The active caption, transport and resume panel retain their positions.
- **Colours/tokens:** unchanged; the active mint panel, ink type and pink offset
  edge still use the shared LAiDIES tokens.
- **Image quality/assets:** unchanged; the exact approved Episode 04 VHS cover
  remains in the player. No image substitution was made.
- **Copy/content:** unchanged; the active caption remains populated and no public
  copy was added or removed.

**Functional evidence**

- Play Audio advanced from 0:00 to 0:01, changed its label to Pause Audio and
  kept exactly one live caption panel.
- The 1280px browser viewport reported zero horizontal overflow.
- The caption rule is outside responsive media queries, so it applies unchanged
  to the previously verified 390px layout. A calibrated contract run deletes the
  rule in memory and fails before the normal passing run.
- Focused comparison was sufficient because the requested change affects only
  the caption/player region; masthead, shelf, extras and footer were not changed.
- Local verification only; no deployment or public-origin claim.

final result: passed

## Chick Flicks Listen colour correction — 2026-09-02

**Source visual truth**

- Current Homepage reference: `operations/design-audit/chick-flicks-listen-colour-20260902/homepage-current-colour-reference.png` (1280 × 720 px).
- Current LIBRAiRY reference: `operations/design-audit/chick-flicks-listen-colour-20260902/library-current-colour-reference.png` (1280 × 720 px).
- Ali-rejected navy-on-light predecessor: `operations/design-audit/chick-flicks-listen-colour-20260902/rejected-navy-on-light-extras.png` (1280 × 720 px).

**Rendered implementation**

- Desktop: `operations/design-audit/chick-flicks-listen-colour-20260902/laidies-colour-extras-desktop.png` (1280 × 720 px; 1280 × 720 CSS viewport; density 1).
- Phone: `operations/design-audit/chick-flicks-listen-colour-20260902/laidies-colour-extras-mobile.png` (390 × 844 px; 390 × 844 CSS viewport; density 1).
- Same-viewport comparison: `operations/design-audit/chick-flicks-listen-colour-20260902/navy-to-laidies-colour-comparison.png` (2560 × 720 px).
- State: Episode 04 Listen mode, `#episode-extras`, all six continuation links visible.

**Findings and comparison history**

- **P1 fixed — the near-black rack floated on the pale page as a separate app.** The successor removes the boxed navy field and carries the exact current LIBRAiRY masthead gradient edge to edge across the lower section.
- **P1 fixed — six unrelated tile colours created a rainbow dashboard.** All six links now share one deep-plum treatment with cream type and one cyan edge accent. Content and destinations are unchanged.
- **P2 fixed — the module framing interrupted the page rhythm.** Removing the inset border, radius and pink drop-shadow lets the colour band behave like a full-width LAiDIES section while preserving ink keylines at its boundaries.

**Fidelity surfaces**

- **Typography:** Anton remains the display face and Jost the interface face; the existing natural-case heading and compact uppercase labels are unchanged.
- **Spacing/layout rhythm:** the desktop band spans the 1280px viewport and keeps the 82rem inner grid; the 390px version retains two columns, six visible links and zero horizontal overflow.
- **Colours/tokens:** the field computes to `#ef4d9c → #b75cc4 → #6c7cd1`; each link computes to deep plum `#4b2148`, cream `#fff8ff` and cyan edge `#25d8f2`. No navy field or per-card rainbow remains.
- **Image quality:** this correction adds or replaces no image assets. Focused image comparison was unnecessary because the changed section contains typography and controls only, all readable in the full-view comparison.
- **Copy/content:** all six labels, episode-specific text and destinations are unchanged; no new visitor promise was introduced.

**Functional evidence**

- Six links are rendered and visible at 1280 × 720 and 390 × 844.
- Both viewports report zero horizontal overflow.
- The browser reported zero console errors.
- Local verification only; no deployment or public-origin claim.

final result: passed

## Chick Flicks Listen controls, recovery and episode links — 2026-09-02

### Source visual truth

- User-rejected player failure:
  `operations/design-audit/chick-flicks-listen-control-20260902/rejected-player-failure.png`
  — 2156 × 1114 pixels.
- User-rejected footer contrast:
  `operations/design-audit/chick-flicks-listen-control-20260902/rejected-footer-contrast.png`
  — 2152 × 784 pixels.
- User-rejected white dashboard treatment:
  `operations/design-audit/chick-flicks-listen-control-20260902/rejected-white-card-extras.png`
  — 2162 × 1430 pixels.
- Approved episode identity:
  `assets/sunnyvaile-interiors/episode-vhs-boxes-v2/ep-04.png`.

### Rendered implementation

- Player:
  `operations/design-audit/chick-flicks-listen-control-20260902/corrected-player-2156x1114.png`
  — 2156 × 1114 CSS viewport and screenshot pixels, device density 1.
- Links and footer:
  `operations/design-audit/chick-flicks-listen-control-20260902/corrected-footer-2152x784.png`
  — 2152 × 784 CSS viewport and screenshot pixels, device density 1.
- Combined same-input comparison:
  `operations/design-audit/chick-flicks-listen-control-20260902/combined-comparison.png`.
- Phone evidence:
  `operations/design-audit/chick-flicks-listen-control-20260902/mobile-final-top.png`,
  `mobile-final-player.png` and `mobile-final-links-footer.png` at 390 × 844.
- Primary-action successor after Ali's second hierarchy rejection:
  `operations/design-audit/chick-flicks-listen-control-20260902/desktop-primary-listen-action.png`
  at the current desktop viewport and `mobile-primary-listen-action.png` at
  390 × 844.
- Place-label correction after Ali rejected the invented room number:
  `operations/design-audit/chick-flicks-listen-control-20260902/corrected-chick-flicks-eyebrow.png`.
- Video-store extras successor:
  `operations/design-audit/chick-flicks-listen-control-20260902/corrected-video-store-extras-2162x1430.png`
  from a 2162 × 1430 CSS viewport; the browser capture is 2162 × 1304 pixels at
  density 1. Phone evidence is `corrected-video-store-extras-mobile.png` at
  390 × 844. The normalized rejected/corrected comparison is
  `white-cards-to-video-store-comparison.jpg`.

### Findings and comparison history

- **P1 fixed — the primary Listen action was first hidden below the programme
  shelf, then remained visually ambiguous as a small peer of the format
  navigation.** The selected-tape arrival now puts one full-width pink/cyan
  action directly after the description and before Read / Listen / Watch. Its
  large circular media icon, `LISTEN NOW`, exact episode number, runtime and
  caption promise stay together inside the clickable area. Browser interaction
  proved Start → Pause → Continue against the real audio element, rather than a
  simulated state.
- **P1 fixed — the lower player contradicted the selected tape and could become
  a black void.** The normal Listen player uses the exact approved VHS case.
  The failure routine now reveals the same cover, hides stale scenes and the
  resume panel, disables transport and exposes one retry action.
- **P1 fixed — after-credits text disappeared on the actual pale background.**
  The corrected same-viewport capture shows deep ink on cream with a dark
  border; the footer copyright is also dark on the pale ground.
- **P1 fixed — making the white cards readable still left a generic dashboard.**
  The rejected 2162 × 1430 capture had two oversized white grids, duplicated
  Read/Return actions and large unused card interiors. The successor removes
  `After the credits` entirely and keeps the six useful links in one compact
  `Special features` area. Ali subsequently rejected the intermediate
  deep-navy rack on the pale page; the current successor is documented in the
  colour-correction comparison above.
- **P1 fixed — Listen hid the useful continuation routes behind Read.** Every
  Episode 01–04 Listen route now has six visible destinations: Read, Study
  Pack, Song, Cocktail, Rooms and Quiz. Episode 04 preserves the exact song and
  cocktail labels and destination fragments from its reading page.
- **P2 fixed — inherited gold controls drifted from the current site palette.**
  active mode, resume and retry controls now use mint, cyan, pink, cream and
  deep navy.
- **P1 fixed — `Screening Room One` invented a numbered venue.** The corrected
  arrival says only `The Chick Flicks`; the separate right-hand status retains
  the useful `Listen edition` / `Watch edition` context. Browser-rendered body
  text contains zero instances of the rejected phrase.

### Fidelity surfaces

- **Typography:** Anton remains the display face; Jost remains the interface
  face. Ordinary copy is natural case; short shelf/control labels retain the
  established uppercase register.
- **Spacing/layout:** the primary Listen control precedes secondary format
  navigation, spans the content column and remains a 358 × 96px action at the
  390px viewport; the six-link grid is three across on desktop and two across
  on phone; all four phone routes reported zero horizontal overflow.
- **Lower-section density:** the six destinations are three by two on desktop
  and two by three at 390px. The phone rack is 358px wide, has zero page
  overflow and replaces the duplicate departure grid with one short playback
  note.
- **Colour/tokens:** footer foreground/background computed as deep ink
  `rgb(5, 8, 23)` on cream `rgb(255, 248, 255)`; selected Listen and Resume
  computed as mint `rgb(125, 226, 194)`.
- **Image quality:** no replacement, crop or approximation was introduced. All
  four visible Listen covers resolve to their exact approved VHS paths with no
  broken visible images.
- **Copy/content:** continuation labels and route targets are taken from the
  current Episode 01–04 reading-page rails. No new episode title or public
  availability promise was invented.

### Functional evidence and residual gap

- All four Listen routes loaded the correct title, enabled Play button, exact
  episode cover, six continuation links and matching Read route with zero
  overflow or broken visible images.
- Episode 04 Play, Pause/Resume and Watch switching passed; Watch hides the
  audio-first arrival button and keeps the six continuation links.
- The rebuilt `Special features` rack exposes six visible episode-specific
  destinations with zero white tiles, zero `After the credits` component and
  zero browser errors.
- Browser diagnostics reported zero page errors; Plausible emitted only its
  expected localhost warning.
- A deliberate offline reload was attempted to reproduce the user screenshot,
  but browser safety blocked navigation while the local server was stopped.
  The fail-closed DOM transition is therefore mechanically guarded rather than
  represented by a post-fix offline screenshot. The successful player, exact
  cover, controls, links, footer, desktop and phone states were browser-rendered.

final result: passed

## Chick Flicks trailer shelf correction — 2026-09-02

**Source visual truth**

- User-rejected detached trailer panel: `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-bee66a08-9664-4aa7-a26d-e9203fd8b4dc.png` (2212 × 970 px).
- Approved trailer sleeve: `assets/media/opening-day-covers-v1/trailer/trailer-master.jpg` (3000 × 3000 px).
- Combined full-state comparison: `operations/design-qa/chick-flicks-20260902-v4/comparison-standalone-to-shelf.png` (2752 × 810 px).
- Focused art-to-case comparison: `operations/design-qa/chick-flicks-20260902-v4/comparison-trailer-art-to-case.png` (1291 × 810 px).

**Rendered implementation**

- Desktop shelf, shelf expansion and trailer dialog: `operations/design-qa/chick-flicks-20260902-v4/implementation-desktop-*.png` (1440 × 1100 px; 1440 × 1100 CSS viewport; density 1).
- Phone shelf, shelf expansion and trailer dialog: `operations/design-qa/chick-flicks-20260902-v4/implementation-mobile-*.png` (390 × 844 px; 390 × 844 CSS viewport; density 1).
- State: the trailer is the first physical tape, Episodes 01–03 complete shelf one, Episode 04 begins shelf two, and the trailer dialog opens from the tape.

**Findings**

- No actionable P0/P1/P2 differences remain. The detached-panel P1 is removed; the full comparison intentionally contrasts that rejected structure with the requested integrated store catalogue.
- Typography: `Start here · Trailer` prevents an Episode 00 reading. Existing Jost hierarchy, natural-case page copy and every visible trailer-cover word remain correct.
- Spacing/layout: desktop keeps four equal physical bays per shelf; phone keeps two cases per row. The partial second shelf occupies one phone shelf-height and leaves credible empty bays for future releases. Document width measured 390px in a 390px viewport.
- Colours/tokens: yellow distinguishes the trailer without introducing a new colour; all catalogue, label, border and shadow colours stay in the current Homepage/LIBRAiRY system.
- Image quality/assets: the 1024 × 1536 trailer case is a sharp RGBA clear clamshell using the approved square trailer artwork. A first RGB export with baked checkerboard pixels was rejected before integration and corrected to real exterior transparency.
- Copy/content: the orphaned `Watch the trailer` block is gone. The tape opens the existing orientation description and one honest `Play the trailer` action.
- Accessibility/interaction: desktop and phone both opened the native dialog from the trailer tape; visible Close remains available; no horizontal overflow or browser errors were found.

**Comparison history**

1. P1 source: trailer isolated below the video-store catalogue.
2. P2 first asset attempt: apparent transparency was a baked checkerboard.
3. Fix: package the approved art in the clear-case family, remove the standalone panel, place the trailer in bay one, move Episode 04 to a repeatable second shelf, and use the same immediate dialog behavior.
4. Post-fix: full-view, focused-asset, expansion and dialog captures passed at 1440 × 1100 and 390 × 844.

The dialog captures are focused interaction evidence; the art-to-case sheet is the focused asset evidence.

**Primary interactions tested:** trailer-tape open, visible Close, direct trailer hash, one Play action, desktop/phone shelf growth, no horizontal overflow and no page errors.

final result: passed

## Chick Flicks immediate episode dialog — 2026-09-02

**Source visual truth**

- Approved store and shelf state: `operations/design-qa/chick-flicks-20260902-v2/06-desktop-counter-1280.png` (1280 × 900 px).
- Direct interaction authority: `operations/product-stewards/chick-flicks/EXPERIENCE-BRIEF.md`, “Direct tape interaction correction — 2026-09-02”.
- Combined before/after comparison: `operations/design-qa/chick-flicks-20260902-v3/desktop-before-after-comparison.png` (1280 × 520 px).

**Rendered implementation**

- Desktop Episode 04 dialog: `operations/design-qa/chick-flicks-20260902-v3/desktop-episode-04-dialog-1280x900.png` (1280 × 900 px; 1280 × 900 CSS viewport; density 1).
- Phone Episode 04 dialog: `operations/design-qa/chick-flicks-20260902-v3/phone-episode-04-dialog-390x844.png` (390 × 844 px; 390 × 844 CSS viewport; density 1).
- State: Episode 04 selected from the physical shelf with its format dialog open.

**Findings**

- No actionable P0/P1/P2 differences remain. The former P1 interaction defect—selection feedback appearing below the viewport—was removed by presenting the episode details immediately over the shelf.
- Typography: natural title and sentence case, Jost hierarchy, readable episode title and legible UI labels are retained on both viewports.
- Spacing/layout: desktop uses a two-column description/action layout; phone stacks three full-width 50px actions without clipping. Document overflow measured 0px at both widths.
- Colours/tokens: cream paper, deep-ink structure, pink close control, yellow counter sign, cyan edge, sky Listen and mint Watch remain within the bound Homepage/LIBRAiRY palette.
- Image quality/assets: the approved rental store, shelf and VHS pixels are unchanged beneath the modal. No replacement, approximation or new visible asset was introduced.
- Copy/content: each episode keeps its exact title, description, learning payoff, state and Read/Listen/Watch routes.
- Accessibility/interaction: the close control receives focus when opened; the visible Close control and Escape both close; a shelf-triggered close restores focus to the exact tape; direct `#episode-02` opened the correct labelled dialog; body scroll locking prevented an accidental below-fold handoff. The page error log was empty.

**Comparison history**

1. P1 incumbent: selecting a tape changed a rental counter below the shelf, so the visible viewport could appear unchanged.
2. Fix: replaced the below-fold counter with one native modal dialog, retained four separately labelled episode records, intercepted tape plus Start/Latest routes without anchor scrolling, and added close/focus/history behavior.
3. Post-fix evidence: the combined desktop comparison makes the immediate feedback change visible; the phone capture shows the full title, description, lesson and all three actions in the governed 390 × 844 viewport.

Focused-region evidence was not separated from the dialog captures because the dialog itself fills the captured desktop and phone regions at readable size; the combined sheet supplies the full-state comparison.

**Primary interactions tested:** shelf tape open, direct episode hash open, visible Close, Escape, focus return, route contents, no horizontal overflow, and no page errors.

final result: passed

Date: 2026-07-23  
Pages: `post-office.html`, `visitors-centre.html`, `blend-snap.html`,
`newsstand.html`, `chick-flicks.html`, `maikeover.html`, `luminairy.html`,
`radio.html`, `bronze-aige.html`, `town-hall.html`, `sorority-house.html`,
`mall.html`, `games/fairy-godmother.html`, `games/madame-claio.html`, and the
nine `community/*.html` Sorority House rooms, plus `try-on.html`,
`resident-card.html`, `postcard.html`, `printable.html`, `community.html`, and
`laidies-card.html`, `watch.html`, `handbook.html`, and the four
`issues/issue-0*.html` episode features, plus `sunnyvaile-high.html` and
`bookfair.html`, `learn/quiz.html`, and `learn/class.html`  
Scope: first implementation pass of the room-as-page building model.

## LIBRAiRY scene-logic correction — 2026-08-06

### Exact correction

- User-rejected source: `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-24994d50-c588-40b4-a9f2-9c451e114226.png`.
- Focused source/candidate comparison: `operations/design-qa/library-scene-logic-correction-20260806/comparison-rejected-vs-current-reference.png`.
- Candidate SHA-256: `2fa1f9f403ca42b5259a4a59e85a5c4f4ceb55cc5f1dc0b8173efea13282a5e8`.
- Desktop masthead: `operations/design-qa/library-scene-logic-correction-20260806/candidate-masthead-1718x1000.png`.
- Desktop 101s: `operations/design-qa/library-scene-logic-correction-20260806/candidate-101s-1718x1000.png`.
- Desktop Tools: `operations/design-qa/library-scene-logic-correction-20260806/candidate-tools-1718x1000.png`.
- Desktop Reference: `operations/design-qa/library-scene-logic-correction-20260806/candidate-reference-1718x1000.png`.
- Mobile masthead: `operations/design-qa/library-scene-logic-correction-20260806/candidate-mobile-clip-390x844.png`.
- Viewports: 1718 × 1000 and 390 × 844 CSS pixels.

### Findings and corrections

1. P1 — changing the carpet had raised it behind the lower shelf row and made
   the shelving look displaced.
   - Fix: every room now uses the same crop from the accepted masthead carpet;
     desktop exposes it only under the grounded case and mobile limits it to
     the 60px floor zone.
2. P1 — the printer joke was pasted above the public computers at the wrong
   physical location and the added scanner hung over the counter edge.
   - Fix: the sign is a small localized prop seated beside the printer; the
     rejected scanner overlay and its asset are removed. Miss Jeeves and the
     accepted room source were not re-rendered.
3. P1 — an empty My Closet pill appeared even when there was nothing to use.
   - Fix: it is hidden at rest and appears only after the device contains at
     least one saved Library place.
4. P1 — a prior validator accepted carpet and visible-book prose without
   enforcing the rendered geometry.
   - Fix: calibrated failures now reject the old carpet, a mobile carpet taller
     than the floor zone, the scanner overlay, old sign placement, an empty
     Closet control and a mobile normal-case row below 120px.

### Verification truth

- All three desktop rooms show distinct wall colours, the same carpet, intact
  metal cases, covers above the rails and case feet meeting the floor.
- At 390px, the page reports 390px document width with no horizontal overflow;
  normal-case rows preserve 120px and compact rows preserve 96px.
- The browser screenshot backend did not produce a trustworthy full-page
  mobile shelf composite after viewport override, so only the exact masthead
  capture and measured shelf geometry are retained here; no false mobile visual
  PASS is claimed.

Final result: objective correction passed; exact visual acceptance remains Ali's.

## LIBRAiRY shelf-contact and room-colour correction — 2026-08-06 (historical; superseded above)

### Visual truth

- User-rejected 101s state: `operations/design-qa/library-shelf-contact-20260806/source-user-rejected-101s.png`
- Normalized source: `operations/design-qa/library-shelf-contact-20260806/source-101s-normalized-1440x810.png`
- Source pixels: 1916 × 1016, normalized to 1440 × 810 for focused comparison.
- Required outcome: complete cover art above the shelf lip, one unchanged Library carpet in all rooms, distinct wall colours, intact metal cases, and no rejected v5 masthead.

### Implementation evidence

- Desktop 101s region: `operations/design-qa/library-shelf-contact-20260806/candidate-101s-1440x810.png`
- Desktop full page: `operations/design-qa/library-shelf-contact-20260806/candidate-full-desktop-1440.png`
- Mobile full page: `operations/design-qa/library-shelf-contact-20260806/candidate-full-mobile-390.png`
- Focused side-by-side: `operations/design-qa/library-shelf-contact-20260806/comparison-101s.png`
- Desktop viewport: 1440 × 1000 CSS pixels, density 1; focused region normalized to 1440 × 810.
- Mobile viewport: 390 × 844 CSS pixels, density 1.
- State: unfiltered catalogue, all three physical collection rooms visible in the full capture.

### Findings and fix history

1. P1 — the rejected source placed book artwork behind the thick front rail, making the books look as though they had fallen behind the shelf.
   - Fix: removed the desktop downward translation, lifted the upper rows to the rail's back edge, removed stray shelf-caption copy on mobile, and placed mobile books above the foreground rail layer.
   - Post-fix evidence: every title and complete cover face is visible in the desktop comparison and mobile full capture.
2. P1 — a single colour blend tinted the whole room photograph, changing the carpet with each section.
   - Fix: replaced the whole-room tint with separate `wall-neutral-light-v1.png` and `floor-clean-v1.png` layers. The tint is sized to the wall; the carpet asset is unfiltered and identical in all rooms.
   - Post-fix evidence: 101s is pink, Tools cyan and Reference purple while each floor retains the same navy geometric carpet.
3. P1 — the active masthead had reverted to rejected v5, retaining lumpy rendering, redundant computer-wall signs and wood under-stair cases.
   - Fix: removed v5 and restored the historical no-baked-text v4 source, which has metal cases and no redundant wall signs. Added a calibrated validator fixture that rejects any return of v5.
4. P2 — the first replacement masthead did not contain the locked physical “DON'T FEED THE PRINTER” sign or a clearly identifiable scanner.
   - Fix: added both as isolated transparent props over the no-baked-text room, leaving Miss Jeeves and the room pixels unchanged.
   - Post-fix evidence: the desktop and mobile full-page captures show a readable wall sign above the public computers and a compact flatbed scanner on the reference counter; neither overlaps Miss Jeeves or the title.

### Fidelity surfaces

- Typography: unchanged; Library display and UI hierarchy remain consistent.
- Spacing/layout: desktop books meet the rails without disappearing behind them; mobile shelf copy no longer overlaps the case.
- Colours/tokens: section wall colours differ; carpet colour is invariant.
- Image quality/assets: the rejected v5/v7/v8 and hand-inked mastheads are absent; existing intact wall, floor and metal-case assets are used.
- Copy/content: shelf-guide explanations remain above the physical rooms; redundant shelf captions are hidden on mobile.

Historical result: superseded after Ali rejected the prop placement and carpet treatment.

## LIBRAiRY reader refresh — 2026-07-24

### Visual truth

- Source state: `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-d1d842a3-64d4-4933-ae95-0bb9c0542da5.png`
- Source pixels: 1458 × 872.
- Target grammar: Miss Jeeves midnight backdrop, crisp white paper, cyan edge,
  vivid pink action, Playfair/Jost hierarchy, and one useful answer.
- The source is an interaction-style target rather than an identical reader
  layout. Fidelity is judged on visual language, hierarchy, focus, and colour,
  while the reader retains the longer sourced answer required by the product.

### Implementation evidence

- Desktop state: `operations/design-qa/library-reader-20260724/05-reader-wide-v3-locked.png`
- Mobile state: `operations/design-qa/library-reader-20260724/06-reader-mobile-v3-locked.png`
- Full shelf-book state: `operations/design-qa/library-reader-20260724/08-shelf-reader-desktop.png`
- Search-label state: `operations/design-qa/library-reader-20260724/09-result-labels-desktop.png`
- Side-by-side truth/build comparison:
  `operations/design-qa/library-reader-20260724/07-target-vs-reader-final.png`
- Desktop viewport: 1458 × 872 CSS pixels, density 1.
- Mobile viewport: 390 × 844 CSS pixels, density 1.
- State: the sourced Jobs & Work answer opened from the Miss Jeeves
  “will AI take my job?” direct answer.

### Findings and fix history

1. P1 — the linked reader used burgundy, beige, a candy stripe and a very long
   contents rail. It looked like an unrelated legacy website and obscured the
   answer the visitor had selected.
   - Fix: inherit the Library/Miss Jeeves midnight, white, cyan and vivid-accent
     system. A direct answer now opens in focused mode with its unrelated table
     of contents and book sections removed from view.
2. P2 — the first mobile pass crowded the title, label and back button into one
   row.
   - Fix: stack the mobile masthead, use a full-width title, keep the back
     control below it, and reduce body padding.
3. Shelf-selected books still open as complete books with the contents rail;
   only question-specific handoffs use focused mode.
4. Generic Miss Jeeves result labels now use the current vivid
   raspberry/blue/cyan/violet palette rather than muted coral, dusty teal,
   brown and mauve.
5. Playfair Display and Jost remain consistent with the Library page. No new
   visible image assets were required.
6. No horizontal overflow was found at 1458 × 872 or 390 × 844.

Final result: passed.

## Visual truth

- Visitor Centre room source: `assets/building-interiors/delivery-20260723-visitors-centre-lobby-v1/visitors-centre-lobby-map-wall-comic-candidate-v2.png`
- Approved live map: `assets/final_map/sunnyvaile-town-map-final-v5.webp`
- Post Office room source: `assets/building-interiors/delivery-20260723-post-office-comic-v1/post-office-penny-counter-comic-candidate-v1.png`
- Blend & Snap room source: `assets/building-interiors/delivery-20260723-blend-snap-comic-v1/blend-snap-jojo-counter-comic-candidate-v1.png`
- Blend & Snap object source: `assets/building-interiors/delivery-20260723-blend-snap-comic-v1/blend-snap-corkboard-comic-candidate-v1.png`
- NewsStand room source: `assets/building-interiors/delivery-20260724-newsstand-comic-v1/newsstand-paige-rack-comic-candidate-v1.png`
- NewsStand paper sources: `assets/building-interiors/delivery-20260724-newsstand-comic-v1/newsstand-paper-*-comic-candidate-v1.png`
- Chick Flicks room source: `assets/building-interiors/delivery-20260724-chick-flicks-v1/chick-flicks-new-releases-wall-comic-candidate-v1.png`
- Chick Flicks rental-card source: `assets/building-interiors/delivery-20260724-chick-flicks-v1/chick-flicks-rental-card-comic-candidate-v1.png`
- MAiKEOVER room/interface source: `assets/building-interiors/delivery-20260724-maikeover-v1/maikeover-vanity-station-comic-candidate-v1.png`
- LUMINAiRY structural room source: `assets/building-interiors/luminairy-nave.jpg`
- KSVL structural room source: `assets/building-interiors/ksvl-booth.jpg`
- KSVL request-desk source: `assets/town-characters/scenes/dj-sunnyv-scene.png`
- BRONZE AiGE structural room source: `assets/building-interiors/bronze-aige-interior.jpg`
- BRONZE AiGE live-stage source: `assets/building-interiors/bronze-aige-live-band.jpg`
- BRONZE AiGE fortune-teller sequence: `assets/bws-fortune-teller/frame-1-closed.webp` through `frame-5-reveal.webp`
- Town Hall structural room source: `assets/building-interiors/town-hall-civic-chamber.jpg`
- Town Hall mayor source: `assets/building-interiors/town-hall-deb-desk.jpg`
- Town Hall Regular portraits: `assets/pixel-restyle/characters/*-portrait-pixel-v1.png`
- Sorority House structural room source: `assets/rerolls-20260714/willow-and-sorority-continuity/building-interiors/delta-lai-nu-sorority-house-interior.png`
- Sorority House Girl Talk object: `assets/games/girl-talk/card-back.png`
- Community index structural arrival: `assets/rerolls-20260714/willow-and-sorority-continuity/building-interiors/delta-lai-nu-sorority-house-interior.png`
- Closet structural arrival: `assets/closet/closet-interior-hero-v2-90s-vibrant.png`
- Screening Room picture sources: the five current review cuts named by `operations/video-release-board-20260723.md`
- Handbook structural opening source: `assets/episodes/trailer/comic/trailer-b25-full-8-stops-tour-guide-comic-v1-1920.png`
- Episode issue cover sources: `assets/episodes/ep-01/pixel/ep01-title-card-comic-v2.png`,
  `assets/episodes/ep-02/comic/ep02-title-card-comic-v2.png`,
  `assets/episodes/ep-03/comic/ep03-title-card-comic-v2.png`, and
  `assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png`
- SUNNYVAiLE High structural sources:
  `assets/building-interiors/sunnyvaile-high-hallway.jpg`,
  `assets/building-interiors/sunnyvaile-high-pop-quiz.jpg`, and
  `assets/building-interiors/sunnyvaile-high-classroom.jpg`
- Book Fair structural source:
  `assets/building-interiors/sunnyvaile-high-book-fair.jpg`
- Pop Quiz structural source:
  `assets/building-interiors/sunnyvaile-high-pop-quiz.jpg`
- SUNNYVAiLE High classroom structural source:
  `assets/building-interiors/sunnyvaile-high-classroom.jpg`
- Mall structural room source: `assets/building-interiors/the-mall-atrium.jpg`
- Mall operable corridor sources: `assets/mall-storefronts/*.jpg`
- FAiRY Godmother exterior source: `assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/web/11-fairy-godmother-house-v6.jpg`
- FAiRY Godmother structural room source: `assets/building-interiors/fairy-godmother-parlor.jpg`
- FAiRY Godmother operable portrait sources: `assets/saints/*.png`
- FAiRY Godmother wand source: `assets/fairy-wand.png`
- Mme CLAi-O storefront source: `assets/sunnyvaile-buildings/y2k-v3-defairytale/episode-pixel/webjpg/06-mme-claios-shop-LANDSCAPE-v1.jpg`
- Mme CLAi-O structural room source: `assets/building-interiors/mme-claio-reading-room.jpg`
- Mme CLAi-O operable card sources: `assets/mme-claio/reading-cards/*.{webp,png}`
- Interaction model: the approved LIBRAiRY v3 room-as-page pattern documented in `operations/building-design-briefs/00-MASTER-PLAN.md`

The new room sources are 1672 × 941 pixels and are placed as full-bleed 16:9
stages. Content is attached to physical objects in the room: wall map,
postcard rack, café specials board, receipt, corkboard, newspaper rack, VHS
wall, rental card, vanity mirror, candidate mirrors, tool drawers, and guest
book. It is not presented as a repeated set of generic cards.

## Implementation evidence

Desktop viewport: 1280 × 720 CSS pixels, density 1.

- `operations/design-qa/visitors-centre-20260723/implementation-desktop-state-1-pass2.png`
- `operations/design-qa/visitors-centre-20260723/implementation-desktop-state-2-pass2.png`
- `operations/design-qa/visitors-centre-20260723/implementation-desktop-state-3-pass2.png`
- `operations/design-qa/visitors-centre-20260723/implementation-desktop-state-4-pass2.png`
- `operations/design-qa/visitors-centre-20260723/implementation-building-card-open-pass2.png`

Mobile viewport: 390 × 844 CSS pixels, density 1.

- `operations/design-qa/visitors-centre-20260723/implementation-mobile-state-1-pass2.png`
- `operations/design-qa/visitors-centre-20260723/implementation-mobile-state-2-pass2.png`

Focused source/implementation comparison:

- `operations/design-qa/visitors-centre-20260723/source-vs-implementation-desktop-pass2.png`
- `operations/design-qa/newsstand-20260724/source-vs-implementation-desktop-pass2.png`
- `operations/design-qa/chick-flicks-20260724/source-vs-implementation-desktop.png`
- `operations/design-qa/maikeover-20260724/source-vs-implementation-desktop.png`
- `operations/design-qa/luminairy-20260724/source-vs-implementation-desktop.jpg`
- `operations/design-qa/radio-20260724/source-vs-implementation-desktop.jpg`
- `operations/design-qa/bronze-aige-20260724/source-vs-implementation-desktop.jpg`
- `operations/design-qa/town-hall-20260724/source-vs-implementation-desktop.jpg`
- `operations/design-qa/sorority-house-20260724/source-vs-implementation-desktop.jpg`
- `operations/design-qa/mall-20260724/source-vs-implementation-desktop.jpg`
- `operations/design-qa/fairy-godmother-20260724/source-vs-implementation.png`
- `operations/design-qa/madame-claio-20260724/source-vs-implementation.png`
- `operations/design-qa/community-rooms-20260724/before-vs-after-community-room.png`
- `operations/design-qa/community-rooms-20260724/style-lock-vs-community-room.png`
- `operations/design-qa/try-on-20260724/before-vs-after.png`
- `operations/design-qa/try-on-20260724/style-lock-vs-implementation.png`
- `operations/design-qa/resident-card-20260724/before-vs-after.png`
- `operations/design-qa/resident-card-20260724/style-lock-vs-implementation.png`
- `operations/design-qa/postcard-20260724/before-vs-after.png`
- `operations/design-qa/postcard-20260724/style-lock-vs-implementation.png`
- `operations/design-qa/printable-20260724/before-vs-after.png`
- `operations/design-qa/printable-20260724/style-lock-vs-implementation.png`
- `operations/design-qa/watch-20260724/before-vs-after.png`
- `operations/design-qa/watch-20260724/style-lock-vs-implementation.png`
- `operations/design-qa/handbook-20260724/before-vs-after.png`
- `operations/design-qa/handbook-20260724/style-lock-vs-implementation.png`
- `operations/design-qa/sunnyvaile-high-20260724/before-vs-after.png`
- `operations/design-qa/sunnyvaile-high-20260724/style-lock-vs-implementation.png`

NewsStand desktop capture:

- `operations/design-qa/newsstand-20260724/implementation-desktop-top-pass2.png`
- `operations/design-qa/chick-flicks-20260724/implementation-desktop-top.jpg`
- `operations/design-qa/maikeover-20260724/implementation-desktop-top.jpg`
- `operations/design-qa/luminairy-20260724/implementation-desktop-top.jpg`
- `operations/design-qa/luminairy-20260724/implementation-desktop-doors.jpg`
- `operations/design-qa/luminairy-20260724/implementation-desktop-mavens.jpg`
- `operations/design-qa/radio-20260724/implementation-desktop-top.jpg`
- `operations/design-qa/radio-20260724/implementation-desktop-mix-cds.jpg`
- `operations/design-qa/radio-20260724/implementation-desktop-request.jpg`
- `operations/design-qa/bronze-aige-20260724/implementation-desktop-top.jpg`
- `operations/design-qa/bronze-aige-20260724/implementation-desktop-menu.jpg`
- `operations/design-qa/bronze-aige-20260724/implementation-desktop-fortune.jpg`
- `operations/design-qa/bronze-aige-20260724/implementation-desktop-stage.jpg`
- `operations/design-qa/town-hall-20260724/implementation-desktop-top.jpg`
- `operations/design-qa/town-hall-20260724/implementation-desktop-mayor.jpg`
- `operations/design-qa/town-hall-20260724/implementation-desktop-noticeboard.jpg`
- `operations/design-qa/town-hall-20260724/implementation-desktop-feedback.jpg`
- `operations/design-qa/sorority-house-20260724/implementation-desktop-top.jpg`
- `operations/design-qa/sorority-house-20260724/implementation-desktop-house.jpg`
- `operations/design-qa/sorority-house-20260724/implementation-desktop-room.jpg`
- `operations/design-qa/mall-20260724/implementation-desktop-top.jpg`
- `operations/design-qa/mall-20260724/implementation-desktop-directory.jpg`
- `operations/design-qa/mall-20260724/implementation-desktop-corridor.jpg`
- `operations/design-qa/fairy-godmother-20260724/desktop-arrival.png`
- `operations/design-qa/fairy-godmother-20260724/desktop-introduction.png`
- `operations/design-qa/fairy-godmother-20260724/desktop-parlour.png`
- `operations/design-qa/fairy-godmother-20260724/desktop-correspondence.png`
- `operations/design-qa/madame-claio-20260724/desktop-arrival-first-visit.png`
- `operations/design-qa/madame-claio-20260724/desktop-room-first-visit.png`
- `operations/design-qa/madame-claio-20260724/desktop-reading.png`
- `operations/design-qa/madame-claio-20260724/desktop-keepsakes.png`
- `operations/design-qa/madame-claio-20260724/desktop-chyron.png`

MAiKEOVER mobile capture:

- `operations/design-qa/maikeover-20260724/implementation-mobile-top.jpg`
- `operations/design-qa/luminairy-20260724/implementation-mobile-top.jpg`
- `operations/design-qa/luminairy-20260724/implementation-mobile-mavens.jpg`
- `operations/design-qa/radio-20260724/implementation-mobile-top.jpg`
- `operations/design-qa/radio-20260724/implementation-mobile-request.jpg`
- `operations/design-qa/bronze-aige-20260724/implementation-mobile-top.jpg`
- `operations/design-qa/bronze-aige-20260724/implementation-mobile-fortune.jpg`
- `operations/design-qa/town-hall-20260724/implementation-mobile-top.jpg`
- `operations/design-qa/town-hall-20260724/implementation-mobile-noticeboard.jpg`
- `operations/design-qa/sorority-house-20260724/implementation-mobile-top.jpg`
- `operations/design-qa/sorority-house-20260724/implementation-mobile-house.jpg`
- `operations/design-qa/sorority-house-20260724/implementation-mobile-room.jpg`
- `operations/design-qa/mall-20260724/implementation-mobile-top.jpg`
- `operations/design-qa/mall-20260724/implementation-mobile-directory.jpg`
- `operations/design-qa/mall-20260724/implementation-mobile-corridor.jpg`
- `operations/design-qa/fairy-godmother-20260724/mobile-arrival.png`
- `operations/design-qa/fairy-godmother-20260724/mobile-parlour.png`
- `operations/design-qa/fairy-godmother-20260724/mobile-correspondence.png`
- `operations/design-qa/madame-claio-20260724/mobile-arrival-hotline-regular.png`
- `operations/design-qa/madame-claio-20260724/mobile-room-hotline-regular.png`
- `operations/design-qa/madame-claio-20260724/mobile-reading.png`
- `operations/design-qa/madame-claio-20260724/mobile-history-badge.png`
- `operations/design-qa/madame-claio-20260724/mobile-hotline-regular-badge.png`
- `operations/design-qa/community-rooms-20260724/comment-card-mobile-form.png`
- `operations/design-qa/community-rooms-20260724/digest-mobile-process.png`
- `operations/design-qa/community-rooms-20260724/mix-cd-mobile-arrival.png`
- `operations/design-qa/try-on-20260724/mobile-arrival.png`
- `operations/design-qa/try-on-20260724/mobile-prompt-workbench-v2.png`
- `operations/design-qa/try-on-20260724/mobile-save.png`
- `operations/design-qa/resident-card-20260724/mobile-arrival.png`
- `operations/design-qa/resident-card-20260724/mobile-intake.png`

State tested: default arrival, map and named-directory navigation, open Welcome
Card for The Blend & Snap, close Welcome Card, postcard selection and generated
share links, café remembered drink, current-episode data load, order receipt,
corkboard destinations, NewsStand paper selection, story deep links, article
reader, back-issue search, Chick Flicks tape selection, in-place aisle
switching, coming-soon handling, empty Creative aisle, rental-card handoff,
Resident Card favourite, MAiKEOVER live-mirror updates, seven tool drawers,
Finish-drawer guest book, LUMINAiRY wing-door reveal, MAiVEN collection and
bio modal, four-alcove index, votive-register update, desktop layout, and
mobile restack, KSVL furniture hotspot navigation, CD and album flips, sticker
inventory, request-form feedback, and single-station tuner return.
BRONZE AiGE states tested: all six bar stations, in-place drink deal, persisted
usual, episode-following Wednesday Special, editable invitation, newest-first
framed-answer flip, canon coaster address, showtime state, and mobile restack.
Town Hall states tested: all three lobby stations, real four-Regular count,
Mayor Deb audio/poster inventory, horizontal mobile Regular wall, Town Regular
picker presence, comment form chips and character counter, and deep-link-ready
one-open-at-a-time behaviour.
Sorority House states tested: visitor arrival, all four wing controls,
in-place room selection, seven Hyvor-thread destinations, honest local-preview
and Resident Card gates, three non-thread handoffs, Girl Talk, the Closet, and
390px restack without horizontal overflow.
Mall states tested: fountain wish and persistent state, full ten-store
directory, curated reference search (`Dunkaroos`, `Cher`, `Tamagotchi`),
two-store result handling, honest Burn Book miss, arrow-key-ready horizontal
desktop walk, eleven storefront destinations, and edge-to-edge mobile stack.
FAiRY Godmother states tested: anonymous one-free-wish arrival state, all eight
energy selections, textarea and disclosure, real Worker submission and Dolly
response, PROMPT GLOW-UP / POST-GLOW-UP output, history increment, copy and
revision controls, surprise control, KSVL song control, rejected-art removal,
desktop room overlay, 390px restack, and no horizontal overflow.
Mme CLAi-O states tested: first-visit, returning-visitor, and Hotline Regular
arrival language; visible Cut the Deck control; secondary tappable deck inside
the room; six non-repeating live draws; real art lookup; in-place card/read/
message/action reveal; last-three real-thumbnail history; five-call badge;
Resident Card handoff; KSVL song; preserved charm-hunt hero; desktop room
overlay; 390px table crop and stacked reading; and no horizontal overflow.

## Findings and fix history

1. P2 — the global automatic Welcome Tour offer overlapped the page's primary hero actions.
   - Fix: suppress the generic offer on this page because the Visitor’s Centre already provides a prominent, page-specific guided-tour action.
   - Post-fix verification: no overlap at 1280 × 720 or 390 × 844.
2. The original Visitor Centre scope was too narrow: a map repeated the
   homepage without doing enough arrival work.
   - Fix: add a named directory, a guided first-visit route, trailer station,
     project explanation, direct postcard writing/sending, and Post Office
     handoff.
3. The original Blend & Snap construction risked becoming a menu followed by
   link cards.
   - Fix: make the counter the menu, turn the selected Study Pack into an order
     receipt, let JoJo remember a drink, and place all town links on one
     illustrated physical corkboard.
4. No remaining P0, P1, or P2 layout defects were found in the reviewed states.
5. The room crops, type hierarchy, button hit areas, dynamic states, and mobile
   restacks remain readable and internally consistent.
6. The original NewsStand was a filter bar over a card feed.
   - Fix: promote Paige into a full room, composite three separate paper
     objects into the visible rack, turn the chosen edition into one unfolded
     newspaper surface, and rehouse search as the back-issue crate.
   - A 733px intermediate-width review exposed a cramped two-column archive;
     the archive now restacks below 900px.
   - The first 1280px source/build comparison exposed the inherited shared
     760px `main` cap as a large blank right gutter. A page-scoped
   `main.ns-page` override now restores the intended full-width room; the
   pass-2 comparison verifies it.
7. The original Chick Flicks page repeated very tall genre strips and treated
   its rental inventory as a long browse feed.
   - Fix: collapse the store into one full-width New Releases wall. Five
     separately operable tape objects occupy the physical shelf; one aisle
     switcher re-renders that same wall instead of adding more page sections.
   - A selected tape now produces a physical rental-card object, a direct
     episode handoff, and a persistent Resident Card favourite.
   - Mobile replaces the difficult wall hotspots with a compact five-tape
     shelf. The empty Creative aisle has a visible object-area message rather
     than a blank strip.
   - The source/build comparison verifies that the generated room remains
     full-width and the tapes align with its deliberately empty bays.
   - Moving the live episode label beneath the rental-card image removed a
     desktop and mobile text collision.
8. The original MAiKEOVER placed a highly capable avatar/card/membership engine
   inside a 760px stack of open form controls beneath an inert salon header.
   - Fix: preserve the avatar Worker calls, preview renderer, all curated
     values, local card save, and Supabase claim flow while moving their live
     objects into a straight-on salon vanity.
   - The Resident Card now lives inside the large mirror. The three generated
     candidates live in three smaller physical mirrors. Seven rendered counter
     trays open Look, Backdrop, Soundtrack, Saint, Era Faves, Carrying, and
     Finish one at a time.
   - The guest book is now physically and structurally inside Finish; it no
     longer becomes a second form/card section after the salon.
   - Default page height fell from approximately 4,747px to 3,529px while
     retaining every working field and the signed-out local-save path.
   - The global You Are Here chip was suppressed on this page because the room
     already identifies itself and the fixed chip covered the operable Look
     drawer.
9. The original LUMINAiRY correctly used wing doors but opened the MAiVENS wing
   into a roughly 17,570px editorial/card scroll.
   - Fix: retain the full nave and three physical doorways, then turn the
     MAiVENS interior into four in-place alcoves: Living Keepers, The First
     Four, Wider Lineage, and Memorial Light.
   - The eight primary Keepers remain the default task. Foundresses, wider
     lineage, and the Turing memorial now occupy separate selectable alcoves
     rather than appearing as one stacked feed.
   - Desktop portrait collections use a four-window stained-glass gallery.
     Mobile turns each gallery into a horizontal, snap-aligned chapel walk,
     reducing the open MAiVENS state from roughly 11,174px to 5,757px at
     390px without hiding a portrait or control.
   - The full-width votive register reads existing Resident Card choices and
     updates immediately after a Luminary is selected.
10. The original KSVL page presented a cropped room above a conventional row
    of four feature cards.
   - Fix: make the full booth the page and place the four existing destinations
     directly over the room's record shelves, album wall, sticker counter, and
     microphones.
   - A single physical 99.9 FM console now carries the tuning interaction. It
     returns off-station attempts to 99.9 and hands playback to the existing
     persistent KSVL deck instead of creating a competing player.
   - Mix CDs, Bands, Stickers, and Request still open their original working
     mechanics one at a time beneath the booth. Album and CD collections use
     four-across shelves on desktop and horizontal snap racks on mobile rather
     than long stacks of text cards.
   - The request surface is a DJ desk: SunnyV occupies the booth on desktop and
     becomes the opening visual on mobile, with the working form attached to
     that scene.
11. The original BRONZE AiGE was a 5,581px worksheet labelled Step 1, Step 2,
    and Step 3 beneath an inert 216px room strip.
   - Fix: restore the full bar as the page. Six operable locations now sit on
     the fortune teller, posters, bar, table, and stage and open one working
     station at a time.
   - The Businesswomen's Special now deals a cocktail or spirit-free drink in
     place using only the approved frame sequence and the existing drink data.
     The full table game remains a quiet secondary handoff.
   - Tonight's Specials is one chalk menu whose Wednesday Special still follows
     the latest published episode. The invite is an order pad; the four
     cocktail-party answers flip in one frame; the coaster retains its weekly
     local stack and now correctly reads `MAiN ST · No. 7`.
   - The stage preserves its real local-time show state and existing audio
     control. Closed-state page height is approximately 1,646px on desktop and
     1,815px on mobile instead of the original 5,581px.
12. Town Hall already had the correct one-open-at-a-time controller but placed
    it in three generic icon cards above a 216px inert room.
   - Fix: move the three existing triggers into the full civic lobby. The
     noticeboard, mayor's counter, and reception desk now state their honest
     arrival condition before opening the original working panel.
   - The noticeboard count is computed from the four live Regular entries.
     Successful Supabase filing now writes a local filed flag and immediately
     changes the comment-desk placard to `Your last card is on the pile`.
   - Mayor Deb's archive retains its two tracks and four print-ready posters.
     The Regulars remain linked to their buildings and the Town Regular picker
     still writes the Resident Card choice.
   - Mobile converts the wide room into a three-line civic counter and turns
     the Regular portraits into a horizontal noticeboard walk. Closed-state
     page height is approximately 1,122px desktop and 1,128px mobile.
13. The Sorority House was a 4,753px directory of eleven repeated text cards
    that sent every visitor out to a separate page.
   - Fix: restore the full entry hall as the operational hub and make its four
     wings the first choice. Each wing opens its existing room names in one
     left-hand house directory; the selected conversation occupies one
     in-place room instead of another card or external bounce.
   - Seven real Hyvor threads are instantiated in that room only for residents
     on the public domain. Visitors see the purpose of every room but meet a
     real Resident Card gate; localhost reports the Hyvor domain limitation
     honestly. The digest, comment desk, Closet, and Dare Reports keep their
     correct purpose-specific handoffs instead of being misrepresented as
     comment threads.
   - The existing Girl Talk card back is now a physical deck object in the
   hall. House rules occupy one full wall band rather than another dashed
   box. The rejected June image is absent; June is represented only through
   arrival-state and house-rule language until correct art exists.
14. The Mall already had eleven useful storefront renders but trapped them in
    a centred two-column card grid beneath a 216px crop of Centre Court.
   - Fix: promote the atrium to the full arrival room, keep the fountain as one
     small persistent wish interaction, and turn the Directory into the state
     and routing surface for the building.
   - Directory search is now functional across store names and a curated set
     of in-store references. `Dunkaroos` returns the Food Court; `Cher` returns
     As Seen on TV and Rollin' with my Homies; a miss routes honestly to the
     Burn Book instead of pretending the index is exhaustive.
   - On desktop, all eleven real storefront renders are welded edge-to-edge
     into one keyboard- and arrow-operable horizontal concourse. Mobile
     restacks that same uninterrupted frontage vertically. Unit 11 remains the
   in-world Burn Book empty state, and the Gift Shop is surfaced as a live
   Directory state rather than a detached promo card.
15. The FAiRY Godmother already had a working Worker, newsletter gate, prompt
    repair, revision, history, and badge engine, but presented them in a narrow
    gold/parchment stack beneath a rejected pixel portrait.
   - Fix: preserve the entire engine and turn the existing parlour into the
     interface. The PATRON SAiNT portraits now form one horizontal energy rail;
     the textarea and wand occupy the visible writing desk; and the response,
     prompt check, history, and badge live in one correspondence-file band.
   - The page states the anonymous one-wish limit honestly before submission.
     The existing Buttondown gate and subscriber checks remain unchanged.
   - The rejected pixel portrait, floating glitter, decorative emoji controls,
     serif/gold treatment, and generic You Are Here overlay are absent. Worker
     headings are stripped of decorative leading symbols and inline emphasis
     now renders correctly.
   - A real Dolly-energy submission returned a complete response from the
   production Worker and incremented the visible wisdom history. Desktop
   page height is approximately 3,801px; mobile is approximately 3,739px.
16. Mme CLAi-O already had a complete 100-card deck, history, badge, song, and
    deep-link engine but presented them inside a 720px starfield column with a
    rejected pixel portrait and retired gold/cursive/emoji chrome.
   - Fix: retain the storefront charm-hunt stage and promote the approved
     reading room to the page. The visible Cut the Deck control and the deck
     painted on the table now invoke the same original draw action.
   - The real delivered card rises beside The Sign, The Message, and Madame's
     action inside the room. The last three draws become real card thumbnails
     along the table's exit strip rather than another stack of text boxes.
   - First visit, returning visit, and post-badge status are stated in plain
     words inside the room. The old floating counter and progress bar remain
     only as engine nodes; their information now lives in that arrival state.
   - Six live draws verified non-repeat behaviour, local count/history writes,
     all three arrival states, and the five-call `hotline-regular` badge. The
     open desktop page is approximately 2,362px; the open mobile page is
     approximately 3,652px and has no horizontal overflow.
17. The Gift Shop was a generic 13-card product grid containing seven fake
    placeholder panels, two rejected image references, and thirteen identical
    `Coming soon` controls.
   - Fix: make a real shop floor the directory. The print bin contains four
     operable, curation-`correct` poster objects; the tee wall, spinner rack,
     and till route to their own stock departments.
   - One ruled stock list now controls one in-place register. Products with
     approved art show the actual source files; products without real mockups
     remain text-only and say so. The rejected pop-culture saints and old Ada
     pixel frame are absent.
   - The page states the disconnected till once and never renders a fake
     checkout. `Hold it behind the counter` writes through the existing Closet
     puffy pipeline and updates the live count. Gift remains a future hosted
     checkout option instead of a pretend address form.
   - Desktop height is approximately 4,654px; mobile is approximately 4,567px.
     Both have no page-level horizontal overflow; mobile keeps the wide shop
     floor inside a deliberate native room scroller.
18. Nine Mall content shops were identical unfinished “Still brewing” pages
    followed by long text columns. Pieces of Flair had a real Resident Card
    avatar feature, but presented twenty objects as an undifferentiated card
    grid.
   - Fix: extend the Mall through the shop doors. Every page now has its own
     storefront arrival, full-width three-department room, one in-place
     selected object, one named save surface, and one ruled searchable register.
     The room carries the experience; the register preserves complete source
     retrieval without turning the page into another card wall.
   - The nine mechanics are channel surfing, flip-bin browsing, tray building,
     demo-bench testing, fitting-room pulls, memory pinning, Caboodles packing,
     kiosk spinning, and call-sheet energy selection.
   - Pieces of Flair now places one real existing avatar object on a glass
     styling counter and keeps the full set in one horizontal rotating fixture.
     The existing `laidies_carry` Resident Card state is preserved.
   - All ten pages pass 1440 × 900 and 390 × 844 construction checks with no
     page-level horizontal overflow or broken images. Mobile rooms use a
     deliberate native horizontal scroller.
19. The nine Sorority community destinations inherited the same beige heading
    card followed by another comments or utility card.
   - Fix: make the existing house interior the full-width arrival, house seven
     Hyvor threads on one ruled conversation table, make the Comment Card one
     writing desk, and make the Digest one receipts desk with an open process
     and ruled register.
   - The Mix CD prompt was too tall when its two formats remained inside the
     hero. Both now live together on one liner-note spread below the arrival.
   - Long sentence titles now use a smaller comic-display scale so the room and
     supporting copy remain visible.
   - All nine pages pass 1440 × 900 and 390 × 844 construction checks with no
     page-level horizontal overflow or broken images.
20. The Try-On was a pale heading followed by reminder, exercise, step, prompt,
    and save cards even though the feature is explicitly a fitting room.
   - Fix: use the MAiKEOVER vanity as the arrival, turn the assignment into an
     open numbered rail, rehouse Episode 03 in one dark prompt workbench, and
     make saving a full-width near-black-blue fit-check counter.
   - The first visual review exposed inherited grid columns that squeezed each
     step into a 40-pixel text track. The rail now explicitly uses block items
     and preserves four readable desktop columns.
   - All four issue states pass 1440 × 900 and 390 × 844 without horizontal
     overflow or broken images.
21. Resident Card used a storefront banner, a long editorial intro, a rounded
    sign-in card, and four boxed profile groups.
   - Fix: make the MAiKEOVER vanity the arrival, house magic-link sign-in on one
     ruled Post Office intake sheet, and turn all four profile groups into one
     open consultation with ruled accordion rows.
   - The original 31 profile controls remain, but their values now read as
     underlined swatches rather than a grid of pills.
   - Desktop and 390 × 844 mobile pass without horizontal overflow or broken
     images.
22. Postcard was a four-column thumbnail catalogue followed by generic form,
    preview, action, and reward blocks.
   - Fix: make Penny's counter the arrival, turn the choice set into one
     horizontal physical rack, place note and handle on a ruled outgoing-mail
     sheet, keep the two-sided proof on the same writing desk, and move all
     delivery actions to one near-black-blue dispatch counter.
   - Receive mode is now the inverse journey: incoming mail opens on one dark
     arrival stage with the real selected postcard, then hands the invited
     visitor directly to the MAiKEOVER.
   - Compose and receive states pass 1440 × 900 and 390 × 844 without
     horizontal overflow or broken images.
23. Printable used a muted editorial heading and placed four page previews in
    one large rounded two-column shell.
   - Fix: make the issue title a near-black-blue reference-room arrival, place
     all four real sheets on one native horizontal worktable, and put the PDF,
     Extra Credit, and town exits together at a final reference-room checkout.
   - The old fixed return control no longer covers content. Every preview is a
     real document surface, not a replacement content card.
   - Episode 01–04 and unpublished states pass 1440 × 900 and 390 × 844
     without horizontal overflow or broken images.
24. Community repeated the same nine rooms twice in two generic card grids,
    then placed resident records in a third rounded card shelf.
   - Fix: enter through the real Sorority House room, move all nine
     destinations into one numbered house directory, and turn resident records
     into one horizontal physical file reel with a single in-place split
     record.
   - The six filters, local Resident Card insertion, all room URLs, and weekly
     route parameters remain functional.
   - The record modal now supports pointer, Enter, Space, Escape, focus entry,
     and focus return.
   - Desktop and 390px mobile pass without page-level horizontal overflow or
     broken loaded images.
25. The Closet already held the complete Resident Card, visit wallet, counts,
    weekly route, Luminaries, collection objects, wish bank, and editor, but
    presented nearly every job as another rounded card or vessel.
   - Fix: make the real Closet interior the full arrival; turn the Resident
     Card and literal membership cards into the objects inside one Town Wallet
     room; use one ruled scoreboard, one Luminary nameboard, one weekly route
     rail, and one open collection wall for the remaining systems.
   - Editing now opens as a focused desktop side drawer / mobile full-width
     drawer with a persistent Close control and focus return.
   - Seventeen building cards, nine live counts, eight tour stops, the
     Resident Card flip, dashboard jump, and editor controls passed.
   - Desktop and 390px mobile pass without page-level horizontal overflow or
     broken loaded images.
26. The Screening Room had a working player but presented it as a narrow plum
    header over a gold-framed video, clipped the Episode 01 title on desktop,
    omitted a visible programme, and did not mount the existing current
    Episode 03 or trailer cuts.
   - Fix: make the film the primary room object, add one ruled five-tape
     programme shelf, integrate review status, captions, and chapters into one
     auditorium stage, and add one after-credits departure rail.
   - The source map now matches the authoritative local video release board.
     Every source is explicitly labelled a review cut; no unfinished film is
     called final.
   - Trailer and Episodes 01–04 each load at 1920 × 1080 and mount their real
     VTT tracks.
   - Desktop and 390px mobile pass without page-level horizontal overflow.
27. The Handbook contained complete town guidance but rendered it as a narrow
    article, one rounded contents card, and 27 repeated rounded entry cards.
   - Fix: use the real eight-stop trailer guide as one opening spread, turn the
     contents into one ruled chapter index, group the source into eight
     semantic chapter spreads, and present the existing entries as a
     continuous ruled register.
   - Every chapter, entry, link, direct hash, and existing Puffy hook remains.
     The index follows the visible chapter and remains intentionally
     horizontally operable on mobile.
   - Desktop and 390px mobile pass without page-level horizontal overflow or
     broken loaded images.
28. The four episode issues repeated the same dark VHS/painterly masthead and
    a long sequence of rounded recap, receipt, action, glossary, cast, and
    episode-navigation boxes.
   - Fix: use each real episode object/title image as the left side of a split
     comic cover, keep its visible title as canon-correct live layered text,
     and turn the source article into one open light magazine/graphic-novel
     feature.
   - A sticky chapter script now exposes 12, 11, 11, and 14 real article
     anchors. Full comic panels, continuous receipt sheets, full-width pull
     quotes, one ruled glossary, a horizontal cast call sheet, and one season
     strip replace the previous box stack.
   - Chapter clicks update the hash, land below the two sticky navigation
     surfaces, and update current-location state. All four pages pass desktop
     and 390px mobile without horizontal overflow or broken loaded images.

## Functional checks

- All 17 buildings are visible by number on the map and by name in the directory.
- Selecting building 4 opens the correct Welcome Card.
- The opened card reports `NO. 4 MAIN`, links to `/blend-snap.html`, and sets `#blend-snap`.
- Closing the card removes the open state and clears the hash.
- Visitor Centre postcard choice updates the preview and produces Share, Text,
  Email, and Copy Link destinations with the visitor's handle and note.
- Blend & Snap loads Episode 04 from `content/episode-index.json`, opens the
  correct `/issues/issue-04.html` receipt destination, remembers the chosen
  drink locally, and exposes eight correct corkboard destinations.
- NewsStand preserves `content/newsstand-stories.js`, article hashes, full
  story rendering, sources, and search. The three paper buttons open only their
  own edition. A story opens at its existing `#slug`; putting the paper back
  clears the hash. Search for `policy` returns the correct single Tribune
  result. TODAY reports its empty desk honestly until wire stories exist.
- Chick Flicks loads Episode 04 as the current New Release, opens
  `/issues/issue-04.html`, explains the Episode 05 coming-soon case without
  treating it as a dead control, re-renders every aisle in the existing wall,
  and reports an honest empty state for Creative. The favourite persists
  through the existing `laidies_favorite_episode` key.
- MAiKEOVER moves the existing `#moCard` and `#moCands` nodes into the vanity
  without cloning or duplicating their IDs. Tool selection reveals only its
  mapped working controls. Name and song changes still update the live mirror;
  the room changes to its in-progress light state; direct `#mo-claim-card`
  arrival opens Finish.
- LUMINAiRY preserves door/hash navigation, SAiNT card flips and audio,
  full-playlist control, MAiVEN meet/progress/unlock logic, verified bio modal,
  Luminary selections, and Trailblazer picks. The MAiVENS index changes only
  the active alcove and retains keyboard left/right navigation.
- KSVL preserves all four content areas, six Mix CDs, ten album flips and
  tracklists, twenty selectable stickers, request-form counters and submission
  wiring, Resident Card favourite handoff, and the existing global player.
  Its dial visibly rejects frequencies other than 99.9 without starting audio.
- BRONZE AiGE preserves next-Friday invitation seeding, live invitation copy,
  calendar-download wiring, episode prompt fetch, drink data and persistence,
  weekly coaster stack, Ryan C / CHAR No.5 credit, newest-first framed answers,
  live-show clock, song control, and all Resident Card/KSVL/Sorority links.
- Town Hall preserves the existing hub controller and hash aliases, full Deb
  archive, both audio buttons, poster downloads, all four Regular destinations,
  Town Regular storage/highlighting, feedback type/subject/body/count fields,
  signed-in and anonymous Supabase payload path, and Visitor’s Centre handoff.
- Sorority House preserves every existing community fallback URL, all seven
  live Hyvor page IDs, Girl Talk, the Closet, the Resident Card route, all five
  house rules, `.sv-hero`, charm placement, and every shared defer script.
- Mall preserves all ten store routes, the Unit 11 Burn Book route, Gift Shop
  route, all eleven storefront renders, global player/check-in scripts, and
  plain-link access to every storefront. The desktop corridor moves by buttons,
  keyboard arrows, trackpad, and native horizontal scroll.
- FAiRY Godmother preserves the production Worker, exact energy keys, one-free-
  wish gate, Buttondown subscription handoff, five-per-day subscriber copy,
  prompt and draft extraction, copy controls, revision calls, history, badge,
  KSVL song, Enter submission, and all weekly-return logic. Its eight visible
  PATRON SAiNT choices remain synchronized with the original select.
- Mme CLAi-O preserves the full 100-entry deck, no-immediate-repeat index,
  art slug lookup and both aliases, four-card onerror fallback, the
  `claio-call-count` and `claio-call-history` keys, ten-reading storage limit,
  last-three history, five-call badge and `laidiesSecretBadges` write, weekly
  return link, Resident Card route, song, `.sv-hero`, charm hunt, analytics,
  KSVL, and mini-player stack.
- Gift Shop preserves the full 13-item `PRODUCTS` catalog, price and `buyUrl`
  plumbing, giftable flags, Mall/Closet exits, made-to-order truth, Plausible
  event, and Printful/Gumroad go-live instructions. Print-bin art selects the
  matching product; department controls filter the stock list; products open
  in place; Closet holds add and remove correctly.
- The nine Mall content shops preserve all original HTML source lists
  (66 references in As Seen on TV; 17 Books and Records; 18 Food Court; 17
  Gizmos; 17 Hanger Management; 17 Last Summer; 15 MAiYBE; 17 Kiosk; 19
  Rollin'). Every department returns an intentional non-empty subset; search,
  selected-object changes, per-shop save/remove actions, next-channel and
  random-spinner controls work.
- Pieces of Flair preserves all twenty original avatar sources, the
  `laidies_carry` key, Resident Card handoff, three department fixtures,
  next/previous navigation and in-place carry status.
- The community rooms preserve seven Hyvor page IDs, the Comment Card's required
  fields/reset/email-draft flow, the Digest loader and live rows, and both Mix
  CD submission formats.
- The Try-On preserves all four issue configurations, Prompt Like Elle sample
  and copy controls, live rating, original local save record, Wednesday ritual
  completion marker, and community handoff.
- Resident Card preserves magic-link, newsletter, confirmation/resend,
  pending-mail help, sign-out/reset, all 31 profile values, and its original
  local/Supabase storage paths.
- Postcard preserves all thirteen postcard files and identifiers, initial
  `?pc=` selection, live note proof, front/back flip, handle prefill, native
  share, SMS, email, copy-link, incoming `?from=`/`?note=` rendering,
  referrer storage, and MAiKEOVER referral handoff. The previous blank initial
  preview is corrected.
- Printable preserves all four published issue configurations, sixteen preview
  pages, four real PDF downloads, `from=this-week` return parameters, Extra
  Credit route, and the unavailable-state guard. Both top and checkout actions
  point to the same issue-specific assets.
- Community preserves all nine room destinations, six resident filters, seven
  current source records, saved Resident Card insertion, in-place resident
  detail, Resident Card intake, and weekly parameter propagation. The modal
  opens and closes accessibly and restores focus to its source record.
- Closet preserves own/public modes, Resident Card profile/save/share/flip,
  seventeen building visit cards, nine count sources and shelf jumps, four
  Luminary picks, eight weekly and six optional stops, every collection
  renderer, FAiRY wish balance, and leaderboard truth. Its editor opens and
  closes as a focused drawer without losing the source Edit control.
- Screening Room preserves the cue-sheet fallback and mounts the five current
  local review sources. Its active programme state, correct issue exit,
  native player controls, and all five VTT tracks were verified for all
  five query variants.
- Handbook preserves eight chapter anchors, 27 source records, every
  building/activity/reward route, both final actions, and existing Puffy
  bookmark hooks. Direct hash arrival and an index click to Buildings passed.
- Episode issues 01–04 preserve their source prose, episode frames, citations,
  glossary disclosures, watch links, Try-On links, cast records, and season
  navigation. Their generated chapter rails contain 12, 11, 11, and 14
  working anchors.
- All fifty reviewed pages fit within their desktop and 390 × 844 viewports without
  horizontal overflow.
- Browser diagnostics show no page errors. Plausible reports only its expected
  localhost analytics warning.

## Open visual decisions

- The new room/object images are installed candidates, not Ali-approved
  art locks.
- Existing Post Office and Visitor Centre postcard illustrations remain
  replaceable because several are from earlier visual directions.
- Functional construction can continue while those images are replaced, but
  rejected artwork must not be used as a reference for future generation.
- LUMINAiRY's current nave, doors, wing rooms, and stained-glass portraits are
  explicitly replacement dependencies. The source/build comparison verifies
  crop, readability, and construction only; the dark painterly/gold art does
  not meet the locked dimensional graphic-novel direction.
- KSVL's booth and request-DJ scenes now support the intended spatial
  interaction, but their painterly/dark treatment is still a replacement
  dependency rather than a final art lock. The CD, album, and sticker surfaces
  also need a later visual-unification pass against the locked episode style.
- BRONZE AiGE's existing room is empty of its keeper, Cosmo, and remains in the
  dark painterly direction. It is a structural bridge only. The final art pass
  needs a straight-on dimensional-comic Cosmo bar scene with deliberately
  readable object zones; the live-band image also needs current canon members
  and the locked episode style. No current BRONZE art is approved as a future
  generation reference.
- Town Hall's current chamber does not contain Mayor Deb or a distinct physical
  comment box, and its painterly room plus pixel portraits do not match the
  locked episode style. They are structural bridges only. The final art pass
  needs one straight-on dimensional-comic civic lobby with Deb, a visibly
  separate heart-pinned noticeboard, and a slotted comment box.
- The Sorority House currently uses an existing painterly hall only to prove
  spatial construction. It does not contain four operable rendered doors, and
  no existing June scene is suitable: the rejected pink-tracksuit portrait is
  deliberately not present or used as a generation reference. Final art needs
  a bright dimensional-comic entry hall, an on-model June, and four separate
  straight-on door objects with clear zones for the existing wing labels.
- The Mall's atrium and storefronts are unusually effective structural assets,
  but they remain ornate/painterly relative to the locked episode image style.
  They can stay while the site structure is judged; a future art decision
  should unify them only if doing so preserves their matched floor lines and
  continuous-concourse behaviour.
- The FAiRY Godmother's parlour successfully supports the room-as-interface
  mechanic but is still a photographic/painterly structural bridge rather than
  the locked dimensional graphic-novel style. The final replacement should
  preserve the straight-on desk, telephone, correspondence basket, corkboard,
  and open left-side seating zones. The rejected pixel portrait must not return
  or be used as a generation reference.
- Mme CLAi-O's ornate room remains the one deliberately night-time, diegetic
  exception in this construction pass because it is the current approved
  reading-room source and its table geometry makes the game work. The rejected
  Mme CLAi-O pixel portrait and rejected keeper scene are absent and must not
  return as generation references. A future Y2K/graphic-novel reroll can replace
  the room only if it preserves the crystal ball, card fan, clearly tappable
  right-side deck, and open left-side state zone.
- The Gift Shop room is an installed dimensional-comic candidate, not an art
  lock. Its empty-fixture state is intentional: only the four approved Deb
  posters are composited onto the floor. Apparel, tote, pad, and final sticker
  retail mockups must stay absent until their real product proofs are made.
  The shop's permanent address, keeper, and final name remain canon decisions;
  the current page does not invent them.
- The ten Mall-shop interiors are installed people-free candidates, not art
  locks. Their bright rooms, clear geometry and dimensional treatment support
  the new mechanics, but the style comparison shows lighter ink/halftone
  intensity than the approved Episode 04 Heroine face. They must not become
  generation references without Ali's approval. Rollin' deliberately uses
  abstract silhouettes instead of generated real or scripted likenesses;
  Pieces of Flair overlays only the existing real avatar-object sources.
- The community-room background reuses the current painterly Sorority House
  interior as a construction bridge only. It is not a locked-style replacement
  and must not become a generation reference. The rejected pink-tracksuit June
  image is absent.
- The Try-On reuses the current MAiKEOVER vanity candidate as a structural
  room. The page construction is now substantially closer to the episode
  grammar, but the art remains lighter and peachier than the approved Episode
  04 Heroine lock and must not become a generation reference without approval.
- Resident Card reuses that same MAiKEOVER vanity candidate for spatial
  continuity. Its construction passes, but the image retains the same
  lighter/peachier gap from the approved Episode 04 style lock.
- Postcard uses the Penny counter candidate for spatial construction. Its
  thirteen inherited postcard fronts remain mostly dark/painterly and are
  replaceable dependencies, not approved sources for future generation. The
  page mechanic does not depend on their visual direction.
- Printable uses only the real weekly document pages as its visual objects.
  No generated environment or character was added, so its construction can
  remain while the printable files themselves evolve.
- Community index uses the existing painterly Sorority House common room and
  the real current resident/town portrait sources. Both are functional content
  bridges rather than locked visual references. The mixed portrait directions
  need a later unification pass; the rejected pink-tracksuit June image is
  absent.
- Closet uses the existing bright interior and real collection/reward sources.
  The room is an effective spatial bridge but not a locked Episode 04 visual
  reference. The unfinished 24-archetype avatar set remains honestly absent;
  no fake replacement people were added.
- Screening Room adds no generated environment or person. The current film
  frame is the visual object. Every current source remains a review cut, and
  the page must continue to state that truth until motion, continuity, and
  external hosting pass release review.
- Handbook uses the real trailer tour frame rather than inventing a book or
  guide asset. The image is structurally useful but darker and golder than the
  approved Episode 04 Heroine lock; any future replacement must preserve the
  guide, checklist, eight numbered stops, and wide town-route composition.
- The episode issue pages use the four real title-card objects and current
  article frames. The covers now share the intended comic/object grammar, but
  several inherited scenes remain darker, flatter, or more painterly than the
  approved Episode 04 Heroine lock. They remain replaceable image sources, not
  references for future generation.
- SUNNYVAiLE High keeps its real hallway, Pop Quiz room, and classroom
  sources. They now support a coherent school journey, but remain darker and
  more painterly than the approved Episode 04 Heroine rendering lock. The page
  construction must survive a later locked-style art replacement without
  changing its six-room mechanic or the authoritative class register.
- Book Fair keeps the current gym source as a structural bridge. Its eight
  intended product proofs do not exist yet, so the live rack shows honest
  product labels and makes no broken image requests. Future approved proofs can
  replace those labels without changing the live balance, redemption, or
  Closet-storage behavior.
- Pop Quiz keeps the current classroom source as a structural bridge. The page
  now uses the quiz paper itself as the interface, but the later locked-style
  room replacement must preserve the five-paper register, one-question flow,
  and existing scoring/storage system.
- The class page keeps the current classroom source because its television and
  chalkboard geometry already support the teaching mechanic. It remains a
  structural bridge; a later locked-style replacement must preserve the AV-cart
  hotspot, writing zone, overhead lesson, and authoritative class register.

## Final result

passed for construction and responsive behaviour; visual candidate approval is
still open

## LIBRAiRY arrival v7 layered implementation — 2026-07-24

The accepted v7 Living Stacks working direction is now integrated in
`library.html` with exact HTML branding, department labels, book interactions
and the real Miss Jeeves form. Source and implementation were compared in one
combined image; desktop, tablet and mobile states were exercised; all four
shipped question examples, the sourced-answer handoff and full-book reader
passed. Detailed evidence is in
`operations/design-qa/library-arrival-v7-20260724/`.

### Final result

passed for fidelity to the accepted working environment, responsive behaviour,
accessibility structure and functional journeys. The inherited book-cover
palette remains an explicit owner gate and is not approved by this result.

## Chick Flicks rental-store successor — 2026-09-02

Ali rejected the earlier office-like room, masthead filler, all-capital
ordinary headings and fixed four-tape composition. She directly approved the
replacement rental-store interior and repeatable four-bay shelf. The local
candidate now uses those exact assets, keeps the four approved VHS cases at an
identifiable size, shows one selected-tape counter with direct Read, Listen and
Watch controls, and adds future episodes as new shelf rows rather than
shrinking the existing wall.

Desktop 1280 × 900 and phone 390 × 844 captures, combined source/candidate
comparisons, interaction evidence and comparison history are recorded in
`operations/design-qa/chick-flicks-20260902-v2/AUDIT.md`. No actionable P0,
P1 or P2 remains. Native Safari/VoiceOver, 200% zoom and public-origin checks
remain separate release gates.

### Final result

passed

## Chick Flicks episode format family — 2026-09-02

- Reference: current Chick Flicks store, current LIBRAiRY/Homepage palette, and the approved Episode 01–04 transparent VHS family.
- Compared: Read, Listen and Watch before/after at 1440 × 1000; Read and Listen at 390 × 844.
- Identity: exact Episode 04 VHS case appears without cropping; title and episode number remain live text.
- Palette: cream/lilac reading ground, the exact LIBRAiRY pink-purple-periwinkle gradient, deep-plum controls and restrained cyan accents match the current Chick Flicks family.
- Hierarchy: cover → episode title → format choice → programme shelf → player.
- Format distinction: Read remains editorial; Listen is labelled audio-first; Watch retains the dark screening stage.
- Function: Read / Listen / Watch routes, episode programme links, caption/player region and return link remain present.
- Responsive: no observed horizontal overflow; mobile title/metadata collision repaired; controls remain readable.
- Release: local verification only; not deployed and not publicly verified.

final result: passed
