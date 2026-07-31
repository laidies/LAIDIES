# Study Pack Storefront — design QA

Date: 2026-07-29  
Surface: local prototype at `http://127.0.0.1:4184/`

## July 29 final-takeaway comic correction

- **Rejected asset:** `public/assets/episode-01-canon/10-three-step-path-v1.png`.
  It showed fashion selection, a mood-board/target sequence and a rubber stamp
  rather than the adjacent Episode 01 actions. The right panel also contained
  a stray hand/anatomy defect.
- **Accepted local successor:**
  `public/assets/episode-01-canon/10-three-step-path-v2.png`, SHA-256
  `b0097a4195feb8d384207cc770996f71f11c92eb09f46dd45f592506dfa1cc1e`.
- **Exact visual sequence:** choose one small email task; supply person, goal
  and factual checklist as context; review and correct the draft herself.
- **Generated-image boundary:** no load-bearing generated text, captions,
  logos, shopping/fashion story, rubber approval stamp or extra foreground
  character. Visible hands were checked for attachment and plausible anatomy.
- **Desktop proof:** 1440 × 1000 local in-app-browser inspection showed the new
  1774 × 887 source at its natural 2:1 aspect ratio with no crop, overlap or
  horizontal overflow.
- **Mobile proof:** 390 × 844 local in-app-browser inspection showed the full
  three-panel comic above the three editable takeaway cards; document
  `scrollWidth === clientWidth === 390`.
- **Runtime proof:** zero browser warnings/errors; `npm run build` passed and
  all four `npm run test:sites` checks passed.
- **Printable proof:** Letter and A4 PDFs rebuilt through the bundled ReportLab
  runtime and rendered at 150 DPI. Both remain one page with no clipping,
  overlap or missing image. The responsive-only takeaway comic is not silently
  embedded into the separately composed one-page printable.
- **Admission:** **PASS for this bounded image replacement.** This does not
  admit the complete Study Pack, account-backed Closet persistence, rollout to
  later episodes or public deployment.

## Decision

Final result: passed for the repaired `Under the hood` section at
1654 × 1100 desktop and 390 × 844 mobile viewports.

## July 29 `Under the hood` layout repair

- Source visual truth:
  `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-aff82d69-c726-4c7c-940f-2c0f8d597238.png`
  (1790 × 1654 px), Ali's screenshot of the rejected unbalanced state.
- Rendered implementation:
  `qa-episode-01-concept-card-layout-v19-1654-final.png`
  (1654 × 1100 px at a 1654 × 1100 CSS viewport, device scale 1) and
  `qa-episode-01-concept-card-layout-v19-mobile-390.png`
  (390 × 844 px at a 390 × 844 CSS viewport, device scale 1).
- State: Episode 01 pack → Cheat Sheet → `Under the hood` section.
- Full-view comparison evidence: the rejected screenshot and final desktop
  capture were opened together in one comparison input. The former forces the
  heading and paragraph down a narrow left track while a single shallow image
  leaves most of the right track empty. The repair gives the left track one
  clear job (eyebrow plus lesson statement), groups the illustration,
  quotation and explanation into one compact right-hand stack, and places the
  three term cards directly beneath both tracks.
- Focused-region comparison evidence: the 1654 px capture shows the complete
  section from eyebrow to term cards. The 390 px capture plus DOM geometry
  confirms the same children stack at 274 px inside a 342 px section; every
  child ends at x=332 inside the 390 px viewport and
  `scrollWidth === clientWidth === 390`.
- Required fidelity surfaces:
  - Typography: the existing Archivo/Jost hierarchy and copy are preserved.
    The display heading gains a wider track and a controlled 12-character
    measure instead of breaking into the rejected near-one-word column.
  - Spacing/layout rhythm: the right side is now one intrinsic content stack,
    so the grid cannot stretch an empty row between the image and quotation.
    Desktop tracks balance visually and the term cards follow immediately.
  - Colors/tokens: no palette, gradient, border, shadow or semantic colour
    changed.
  - Image quality: the exact existing Episode 01 concept illustration is
    retained at its natural aspect ratio with no crop or substitution.
  - Copy/content: all verified learning copy remains unchanged; only its
    grouping and placement changed.
- Comparison history:
  1. Blocked P1: narrow left track, severely stacked heading and a materially
     empty right half.
  2. Blocked P2: moving only the quote beneath the image still left grid-row
     stretch between right-column items at large desktop width.
  3. Passed: illustration, quote and explainer became one intrinsic stack;
     large-desktop and mobile browser evidence showed balanced use of space,
     no clipping and no horizontal overflow.
- Primary interaction tested: the page remained navigable and the sticky
  global header remained functional while the Cheat Sheet section reflowed.
- Console errors checked: zero.
- Build verification: `npm run build` and all four `npm run test:sites` tests
  passed after the final edit.
- Remaining P3: none for this bounded layout repair.

## Current Cheat Sheet comparison evidence

- Source visual truth:
  - `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-405ba446-3d1b-407d-993e-ecd831d878b6.png`
    — Ali's preferred compact 1990s bulletin-sheet composition.
  - `public/assets/episodes/episode-01.png` — Episode 01 title art.
  - `public/assets/episode-01-canon/` — six approved Episode 01 frames copied
    from the episode cue-sheet source paths.
- Rendered implementation:
  - `qa/13-episode-01-cheat-sheet-rebuilt-645.jpg`
  - `tmp/pdfs/episode-01-cheat-sheet.png`
  - `tmp/pdfs/episode-01-cheat-sheet-a4.png`
- Browser viewport: 645 × 916 CSS pixels at device scale 1. Full-page capture:
  645 × 1132 pixels.
- Printable proof: 1275 × 1650 pixels at 150 DPI for US Letter; A4 proof
  rendered separately at the same density.
- State: Episode 01 pack → readable web Cheat Sheet, with separate Download PDF
  and Print PDF actions.
- Full-view comparison: the implementation now uses a restrained wordless
  Episode 01 pop-comic background. Halftone, speed lines and torn-paper accents
  stay at the page edge so the teaching regions remain calm. Real Episode 01
  frames and real typography are composed over it; no lesson wording is baked
  into generated imagery.
- Focused-region comparison: checked the headline, story/stat row,
  plain-English definition, first-win strip, concept definitions, takeaways
  and source footer at the 1275 × 1650 proof resolution. No remaining clipping
  or overlap was found. Embedded speech/caption text was cropped out of every
  small episode frame; those images now act only as memory cues.
- Required fidelity surfaces:
  - Typography: Jost is used throughout, matching the current homepage. The
    regular, semibold and extrabold print files are genuine separate weights;
    the previous mistake of registering the regular file as “bold” was removed.
    Main story copy is 10.7–11pt, concept explanations are 10.2pt, and no
    teaching copy depends on the much smaller text inside an episode frame.
    The only deliberately small exception is the single-line provenance strip.
  - Spacing: the oversized purple three-rule panel and yellow quotation/source
    footer were removed. The takeaway now occupies one compact comic burst and
    provenance occupies a 19pt strip. The episode story receives the dominant
    space, the example is a horizontal strip, and the four analogies behave as
    a comic sequence rather than equal CSS cards.
  - Colour: Episode 01 magenta, violet, cyan/teal, blue and sunshine yellow sit
    on the approved light gradient family.
  - Imagery: all visible story frames are exact Episode 01 assets; no generated
    or substitute people remain.
  - Copy: narrative, analogies, concepts, scoped stats and quotes are derived
    from `content/episodes/episode-01.canon.md`.
- Comparison history:
  1. Blocked: the first sheet was a box inventory and did not summarize the
     lesson.
  2. Blocked: the second pass became a motivational poster with dead space.
  3. Blocked: a generated comic collage introduced invented people.
  4. Blocked: the compact rebuild still used an unfamiliar tiny font, repeated
     equal-size cards and left unused space inside them.
  5. Blocked: varied geometry still looked like ordinary CSS panels, used the
     wrong apparent font weight, lacked comic backgrounds/emphasis shapes and
     wasted the lower third on three sparse rules plus a large source footer.
  6. Blocked after owner review: the busy full-page comic treatment overwhelmed
     its hierarchy, allowed copy to escape a panel, collided the three example
     timings and made miniature text inside episode frames look load-bearing.
  7. Passed locally: rebuilt on a quiet comic-edge background with a measured
     grid, larger real Jost copy, subject-only episode crops, isolated stats,
     one compact takeaway and a minimal provenance strip.

## Admitted July 28 storefront result

- The episode selector now reads as one colourful Blend & Snap Study Pack
  board rather than unrelated floating cards.
- Episode 04 is explicitly labelled `LATEST` and `THIS WEEK`.
- The latest selector is bounded at 760 pixels and Episodes 01–03 form the
  smaller earlier-pack grid.
- At the available 645-pixel viewport the complete Latest card is 480 pixels
  wide and 372 pixels tall; its full-width 16:9 title artwork occupies the top
  and its 100-pixel information/action panel sits underneath.
- Every earlier episode card now uses the same stacked anatomy. At the
  available two-column state each image is the full 263.5-pixel card width;
  no episode image is reduced to a corner thumbnail beside the copy.
- The storefront is structured as an embeddable Blend & Snap section with a
  compact introduction and board, rather than a competing building-page hero.
- The newest released episode is selected programmatically, so a newly added
  episode becomes Latest and the former Latest moves into the earlier grid.
- Earlier packs are ordered by episode number (01, 02, 03…) and the responsive
  grid can continue wrapping as episodes are added.
- The storefront and Episode 04 detail page contain no pre-placed puffy
  stickers or sticker imagery.
- Every visible episode choice is a native button with a specific accessible
  name.
- Opening Episode 04 produces its separate detail page and the Concept Card
  Pack remains truthfully marked `PLANNED`.
- Browser DOM inspection found no horizontal overflow at the available
  viewport and no sticker content in the detail tree.
- Storefront and detail hero assets remain exact copies of the current Episode
  01–04 title cards.
- Production build and all four Sites worker tests pass.

## Episode 01 complete-content review candidate

- Episode 01 now presents exactly three READY items: the Cheat Sheet,
  Three Tabs, One Task Try-On and six-card Trading Card Pack.
- The Cheat Sheet opens inside the pack experience rather than sending the
  learner to the rejected four-page printable.
- The Cheat Sheet has been rebuilt from the Episode 01 canon as one compact
  visual memory page rather than a stack of oversized web sections.
- Its information design follows Ali's supplied 1990s bulletin-sheet and comic
  references without sacrificing the reading path: a wordless comic-edge
  background, bright Episode 01 colour fields, real emphasis labels, little
  dead space and a measured top-to-bottom hierarchy.
- Every visible person and story image is an approved Episode 01 frame. The
  rejected generated collage and all invented characters were removed.
- The page covers the episode's actual narrative: Steve's standing ovation,
  the bad on-ramp, invisible load, the adoption gap, the senior-women flip,
  the first tiny win, the plain-English model explanation and the two limits.
- It includes the four explanations explicitly spoken in the Episode 01
  narration: talented new hire (what AI is), Carrie Bradshaw (generative AI),
  Cher's closet (missing context) and the Burn Book (hallucination). The sheet
  now labels each analogy by that teaching job instead of presenting four
  unexplained pop-culture references. It also includes the three canonical
  concepts and verified scoped adoption findings.
- The rejected six-node `Episode 01 argument` path has been removed. Its mixed
  logic and colliding labels have been replaced by a three-panel recap using
  actual Episode 01 artwork: why it feels hard, start with one thing, and keep
  your judgment.
- The footer no longer displays unrelated decorative quotations. Each retained
  line is paired with the specific lesson it helps the learner remember, then
  the episode's bottom line resolves the page.
- The Try-On is not summarized or promoted inside the Cheat Sheet.
- The web sheet has exactly two format actions: `Download PDF` and `Print PDF`.
  The main Cheat Sheet is a responsive page rather than a reduced image of a
  Letter sheet.
- The redundant `Open the full-size printable` overlay was removed because it
  covered the sheet and duplicated the Download action.
- `Blend & Snap` is no longer placed beside the LAiDIES wordmark in any
  prototype header.
- The web page uses large responsive type, full-width canon artwork and
  vertically separated story, analogy, model, takeaway and source sections.
  It no longer asks the reader to zoom or decode a whole page reduced to a
  narrow browser column.
- The PDF uses the same canonical copy and images but a deliberately condensed
  one-page print composition. Its episode title image now preserves the
  complete 16:9 artwork rather than banner-cropping the title.
- Small PDF episode images are explicitly non-load-bearing. Their speech
  bubbles and captions are cropped out; the memory cue, term and explanation
  are typeset beside each image in real LAiDIES type.
- Both PDFs contain exactly one page and all required section titles were
  confirmed in extracted PDF text.
- The first-tiny-win timings are explicitly labelled as the Episode 01
  narrative example, not a benchmark or typical outcome. The universalized
  `80/20` wording has been removed.
- The plain-English model explanation now describes generation as sequences
  of tokens produced from patterns and supplied context. It no longer reduces
  the entire system to the misleading learner-facing slogan `predicts a
  plausible next word`.
- The PDFs preserve the same information hierarchy and pop palette in US
  Letter and A4 geometry.
- The Pop Quiz remains a visibly separate SUNNYVAiLE High handoff.
- No puffy stickers are pre-placed in the pack or Cheat Sheet.
- The Cheat Sheet now exposes the real learner-controlled Puffy chooser using
  the canonical 75-sticker collection and the learner's 10-sticker pouch. A
  browser test verified choose, save, reopen and peel-off behavior for the
  exact Cheat Sheet record.
- The unsaved action shows no arbitrary sticker as if it had already been
  placed. The learner's chosen Puffy appears only after selection.
- The keep-actions are one compact hierarchy: `Add Cheat Sheet to your Closet`,
  `Download PDF` and `Print PDF`.
- Those three actions render as one left-aligned, wrapping control group rather
  than splitting the Puffy action and PDF actions across opposing grid cells.
- Each analogy card uses a real 16:9 episode image region followed immediately
  by a compact text region; no image-sized CSS padding remains between the
  artwork and heading.
- The standalone prototype wordmark header has been removed. The prototype now
  imports and mounts the canonical shared SUNNYVAiLE global header source used
  by Blend & Snap, including its working Menu, quick links, account-status
  control, Join control and responsive behavior.
- `Back to Episode 01 Pack` is a compact breadcrumb directly beneath the
  canonical header. It is keyboard-operable, remains visible before the Cheat
  Sheet actions and is excluded from the printable document.
- At the available narrow in-app browser viewport, the Episode artwork and
  title stack without cropped art, within-word title breaks or decorative
  circle overlap. The three takeaway cards become compact rows and the story
  timings remain a compact three-part sequence.
- The three Episode story panels now pass a caption-only narrative test:
  Steve found the shortcut first; for her the shortcut looked like one more
  job; one small real task got her started. Each caption includes a short
  causal explanation rather than asking the artwork to bridge the story alone.
- The generic four-slogan strip has been replaced by three visibly quoted
  comic Episode lines under `The Funny Bits`: `Get in, loser`, `Technically
  possible—but at what personal cost?` was rejected because it depends on its
  Miranda Priestly setup; the final standalone set is `Get in, loser`, `Steve
  has never once refilled the printer` and `Regina George energy. But make it
  AI.` `Small sips. Big moves.` is no longer used.
- The terms section now includes an original three-part Episode 01 comic
  visual: a fresh generated page, different editors behind different magazine
  covers and a polished document under inspection. The definitions remain
  editable text beneath the visual.
- The final takeaway section now includes an original three-panel heroine
  sequence: choose one small task, add audience/goal/facts as context, then
  review and approve the result herself. The step cards remain editable text.
- Both new graphics contain no generated labels or load-bearing text. Their
  meaning is stated in accessible alt text and the adjacent verified copy.

## Fresh screenshots

- `qa/06-study-pack-board-645.png`
- `qa/07-episode-04-detail-645.png`
- `qa/08-stacked-episode-cards-645.png`
- `qa/09-stacked-earlier-cards-645.png`
- `qa/10-episode-01-complete-pack-645.png`
- `qa/11-episode-01-cheat-sheet-web-645.png`
- `qa/12-episode-01-three-items-645.png`
- `qa/13-episode-01-cheat-sheet-rebuilt-645.jpg`

## Fresh print proofs

- `tmp/pdfs/episode-01-cheat-sheet.png`
- `tmp/pdfs/episode-01-cheat-sheet-a4.png`

## Responsive verification

- Exact 1440 × 1000 and 390 × 844 viewport overrides were exercised in the
  in-app browser after the story and quote changes.
- The 390-pixel document reports `scrollWidth === clientWidth`; no horizontal
  overflow was introduced.
- Story captions and the stacked quote cards remain readable at the narrow
  breakpoint.
- The two new learning graphics render at their natural aspect ratios at both
  widths. At 390 pixels they stack above their editable cards without cropping,
  horizontal overflow or generated text becoming load-bearing.
- Browser console inspection found no errors or warnings.

## Superseded evidence — previous iteration

- The first desktop viewport shows the Study Pack purpose and the start of the fully clickable This Week’s Pack.
- The first 390 × 844 mobile viewport shows the complete This Week’s Pack identity and its Open the Pack action.
- Episodes 01–03 appear together in a three-card desktop grid with distinct episode art and coordinated palettes.
- Opening Episode 01 produces a separate pack-detail view rather than expanding a hidden menu.
- The Episode 01 pack-detail view presents the Cheat Sheet, Try-On and Trading Card Pack together with one job per item.
- The earlier candidate truthfully marked the missing Cheat Sheet IN REDESIGN.
- The Pop Quiz is visually and semantically separated as the next step at SUNNYVAiLE High.
- The layout remains within the viewport on mobile, including the Episode 01 title and description.
- The current LAiDIES wordmark construction is used; no obsolete image wordmark was introduced.
- Browser console inspection found no runtime errors.
- Production build and all four Sites worker tests passed.

## Superseded screenshots

- `qa/01-storefront-desktop.png`
- `qa/02-episode-01-detail-desktop.png`
- `qa/03-episode-01-items-desktop.png`
- `qa/04-storefront-mobile.png`
- `qa/05-episode-01-detail-mobile.png`

## Deliberately not claimed

- This is a working local design prototype, not a public deployment.
- The Study Pack remains a standalone prototype rather than a section
  integrated into the real Blend & Snap building page.
- Learner-selected Puffy placement is built and verified against the canonical
  device-local Puffy Board. Account-backed cross-device Puffy sync is not
  complete: `member_pinned_references` and its owner-write RLS exist, but the
  canonical Puffy writer still uses `localStorage`, the table has no selected
  sticker field or Study Pack reference type, and the public account binding
  remains held.
- Episodes 02–04 and the Trailer pack do not inherit this local candidate’s
  status; their rollout is held for Ali’s Episode 01 review.
- Episode 04 Concept Cards remain planned, not complete.

## Episode 01 pack-menu correction — 29 July 2026

### Comparison evidence

- Rejected header source:
  `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-f20bb57c-c2b1-4732-b334-98c6747755d9.png`
- Rejected item-menu source:
  `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-9d070bc2-9976-4752-9f7e-03b08e02dd8d.png`
- Corrected header:
  `qa/15-episode-01-pack-header-1280.png`
- Corrected item menu:
  `qa/14-episode-01-pack-choices-1280.png`
- Combined before/after checks:
  `qa/16-pack-header-before-after.png` and
  `qa/17-pack-choices-before-after.png`
- Browser viewport: 1280 × 720 at device pixel ratio 2. The rejected captures
  were resized to the same comparison canvas without changing their aspect
  ratio.

### Rejected findings

- **P1 — header crop and scale:** the complete Episode 01 title art was cropped
  into an oversized half-screen panel, while the repeated title occupied the
  rest of the first viewport.
- **P1 — menu density and hierarchy:** the three pack choices behaved like
  full-size article posters. They used identical pink treatments, hid the next
  step below the fold and offered no visual distinction between three different
  jobs.
- **P1 — obsolete material in previews:** legacy screenshots exposed an old
  wordmark, black-background Try-On styling and the unresolved six-card count
  as if they were current pack decisions.

### Corrections verified

- The hero is now a bounded pack header. It shows the complete 16:9 episode
  artwork with `object-fit: contain`, keeps the title readable and brings the
  pack choices into the first desktop viewport.
- The three choices are compact 16:9 menu cards with distinct gradients,
  readable copy and job-specific actions: **Open Cheat Sheet**, **Start
  Try-On** and **Open Card Pack**.
- The Try-On and Trading Card previews are deliberately cropped to their actual
  working surfaces, so the obsolete headers and wordmarks are not load-bearing
  menu art.
- The Trading Card title no longer states a card count while the final card-pack
  decision remains unresolved.
- Typography, spacing, colours, imagery and copy were checked in the combined
  before/after images. No horizontal overflow was present at 1280 pixels.
- Primary interaction passed: open the Cheat Sheet from the menu, then return
  to the Episode 01 pack and recover all three choices.
- Browser console inspection found no errors or warnings.

### Result

`passed`

## Episode 01 pack-route regression — 29 July 2026

### Rejected evidence

- `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-3fd1bb65-da64-4d29-b5d2-110f2ee89cfc.png`

### Rejected finding

- **P0 — Cards did not open:** the Trading Card Pack action pointed to the
  expired development origin `http://127.0.0.1:4182/`. The Try-On had the same
  class of defect on port 4173. Both menu actions therefore depended on
  temporary standalone preview servers instead of the active Study Pack app.

### Correction verified

- The Cards and Try-On builds are packaged beneath the Study Pack prototype and
  are opened with same-origin routes:
  `/episode-01-cards/index.html` and
  `/episode-01-try-on/index.html`.
- Browser click-through passed for all three Episode 01 items:
  **Open Cheat Sheet**, **Start Try-On** and **Open Card Pack**.
- Return navigation from the Cheat Sheet, Try-On and Cards restores the Episode
  01 pack menu and its three choices.
- The production build and all four Sites worker tests passed.
- Browser console inspection found no errors or warnings during the complete
  open/return route test.

### Result

`passed`
