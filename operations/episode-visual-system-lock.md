# LAiDIES Episode Visual System — LOCKED

**Status:** production canon
**Locked by Ali:** 2026-07-23
**Scope:** every episode and trailer still, recurring ident, transition, comic spread,
speech/caption treatment, emphasis frame, trading-card insert, landscape, and background.

This file is the single visual authority map. A later prompt, old image, mood board,
or model default cannot override it.

## 0. The five recurring failures — Ali, 2026-08-03

These are the specific ways episode visuals keep coming back wrong. Check every
one before presenting anything.

1. **Glamour-cartoon drift.** The render slides toward a glossy, glamorous
   cartoon instead of the locked master style in §1. The master image governs —
   not the model's default idea of an attractive face.
2. **Invented backgrounds and people.** Characters and locations that are **not
   in town canon** get made up. Every person and place in a frame must exist in
   the canon roster (`town-keeper-roster.md`, character reference sets). If it
   isn't in canon, it doesn't go in the frame.
3. **No subtle animation.** Rain, glowing light, drift, breath, flicker — the
   small continuous motion that makes a shot feel alive is missing, and a
   frozen frame ships as an animation. **A still is not an animation.**
4. **Motion that doesn't match the narration.** The animation must reflect what
   is actually being said over it — fulsome enough to carry the line, and
   accurate to its content, not generic ambient movement. Timing maps live in
   `operations/captions/episode-NN-timing-map.json`.
5. **Visible loop seams.** A loop must be continuous — the beginning and the end
   indistinguishable. Zero net travel. If a clip travels directionally it is a
   transition, not a loop, and must not be looped.

### What is mechanically checkable

| Failure | Tool | Status |
|---|---|---|
| 5 — loop seam | `operations/tools/check-loop-continuity.py` | **Built, calibrated 2026-08-03.** Compares the wrap against the clip's own p90 frame step, with an absolute perceptual floor so near-static clips don't false-fail. `--self-test` proves it separates a true loop from a drifting one. |
| 3 — no subtle motion | same tool, `[STATIC]` flag | **Built.** Flags clips whose internal motion p90 is below 0.5 — effectively a still. |
| 2 — non-canon people/places | `operations/tools/check-episode-brief.py` | **Built, calibrated 2026-08-03.** Validates the brief BEFORE render: every name in `CHARACTERS:` must be in canon (77 names harvested from the roster + canon index), every path in `REFERENCES:` must exist on disk, and `MOTION:` must be declared. A new character must be written `Name (NEW — needs Ali)`. |
| 1 — glamour drift | not automatable | Needs a side-by-side against the §1 master. `motion-heatmap.py` and contact sheets make the human check fast. |
| 4 — narration match | partly | Clip duration vs the timing map is checkable; whether the motion *means* the line is not. |

Do not claim a clip passes on the strength of the two automated checks. They
cover the two most mechanical failures, not the two most important ones.

### Production-medium prohibition — reaffirmed by Ali 2026-08-16

**Python, CSS, HTML, SVG, Canvas and JavaScript never author visible episode or
trailer imagery or animation.** They may validate, inspect, catalogue, checksum,
decode or assemble approved media without altering its visible design. They may
not draw a room, wardrobe, character, prop, transition, motion graphic, effect or
replacement frame. Exporting code-authored pixels as PNG, WebP or MP4 does not
turn them into artwork.

Canva creates motion from one approved still per shot. CapCut assembles approved
clips. New artwork comes through the governed image-production path and its exact
visual gate. Any programmatic visual fails before maker review and must never be
shown to Ali as a candidate.

## 1. Master people-rendering style

The exact master is:

`assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png`

- Dimensions: 1149 × 1369.
- SHA-256:
  `c9653ce7fa6160494e7b40440ef7d47aa9d53fcdc31037bf280c4a3177756422`
- This image is a **style authority**, not a licence to copy the Heroine's face
  onto another character.

Every person appearing in an episode must use this rendering language:

- adult graphic-novel illustration;
- elegant, variable-width black ink contours;
- fine directional ink strokes in hair and selected fabrics;
- crisp, anatomically informed facial linework;
- multiple faceted, hard-edged light and shadow planes;
- dimensional faces with refined eyes, noses, and lips;
- rich colour plus restrained printed texture;
- illustrated depth without soft digital-paint blending;
- mature proportions and character-specific facial structure.

### It is not

- a painterly AI group portrait;
- soft airbrushed or beauty-ad rendering;
- photorealism with an outline filter;
- flat vector/pop-art faces;
- two-value posterisation;
- generic “cinematic comic” styling;
- childish or caricatured proportions.

If a result is between two styles, compare it directly with the master file. If
the face, hair, ink, and shadow construction do not belong beside the master,
the result fails.

## 2. Authority order

Use references in this order:

1. **Character identity reference** — who the person is: face, age, ethnicity,
   body type, hair, wardrobe, and character-specific details.
2. **Master people style above** — how every person is drawn.
3. **Category reference library below** — composition, panel grammar, lettering,
   bubble shape, card frame, or environment treatment.
4. **Scene brief** — action, location, era, camera, and mood.
5. **Prompt prose** — lowest authority.

Never use a style image as a facial-identity source. Never let a layout or card
reference replace the master people style.

## 3. Current ensemble — identity references

The current twelve-character ensemble is:

| Character | Identity reference |
| --- | --- |
| JoJo | `assets/town-characters/comic/jojo-comic-v1.png` |
| Penny | `assets/town-characters/scenes/penny-scene.png` |
| Paige | `assets/town-characters/comic/paige-comic-v1.png` |
| Mayor Deb | `assets/town-characters/scenes/mayor-deb-scene.png` |
| DJ SunnyV | `assets/town-characters/scenes/dj-sunnyv-scene.png` |
| Mme CLAi-O | `assets/video/delivery-20260714-opening-v6/shots/opening-03-mme-claio-clean-face.png` |
| FAiRY Godmother | `assets/video/delivery-20260714-opening-v6/shots/opening-08-fairy-godmother-clean-lit-group-face-v3.png` |
| Heroine | `assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png` |
| June | `assets/town-characters/scenes/june-scene.png` |
| Paulette | `assets/town-characters/comic/paulette-comic-v1.png` |
| Cosmo | `assets/town-characters/scenes/cosmo-scene.png` |
| Matron Lumen | `assets/town-characters/scenes/matron-lumen-scene.png` |

For DJ SunnyV in an episode frame, also use:

`assets/episodes/trailer/comic/trailer-b46-ksvl-dj-sunnyv-booth-comic-v1-1920.png`

Paulette must retain her broad round face, full cheeks, fuller/curvy body, dense
golden ringlets, joyful smile, floral blouse, and denim overalls/apron. Matron
Lumen is a full-size adult; distance or composition must never make her read as
miniature.

## 4. Saved category libraries

These are the exact reference libraries Ali already supplied. Use them by
category; do not ask her to resend them.

### Speech, caption, and thought bubbles

- Grammar and meaning:
  `operations/reference/comic-storytelling/README.md`
- Panel placement, reading order, gutters, and dialogue treatment:
  `operations/reference/comic-strip-layout/`
- Lettering, punctuation, burst shapes, and display treatment:
  `operations/reference/comic-text-emphasis/`

Bubble shape must communicate delivery: speech, thought, narration, electronic,
shout, fear, or off-panel voice. Tails must point clearly to the speaker and
bubbles may not cover faces or essential action.

### Text styles and word art

- `operations/reference/font-and-text-emphasis/`
- `operations/reference/comic-text-emphasis/`

Use these for title treatments, emphasis words, punctuation, sound effects, and
full-image word art. They define energy, hierarchy, keylines, coloured edges,
offset shadows, bursts, and Y2K/1990s construction.

They do **not** define the LAiDIES brand wordmark. Do not infer or generate a
wordmark from them. Until a current wordmark asset is explicitly approved for
an episode, keep the wordmark separate from generated art.

### Full comic spreads and strips

- Full-page/irregular-panel reference:
  `operations/reference/comic-book-page-style/`
- Varied panel grid/dialogue layout:
  `operations/reference/comic-strip-layout/`
- Story, camera, transition, pacing, and reading-flow rules:
  `operations/reference/comic-storytelling/README.md`

The master people style still governs every face inside a spread. Page references
define composition and comic mechanics, not identity or face rendering.

### Comic-cover collage, pop fragments, and repeat patterns

- `operations/reference/comic-cover-collage/`

Use this library for recurring episode idents, covers, transitions, and full-page
graphic moments built from cropped LAiDIES-world fragments, objects, short words,
halftone fields, and varied scale. It includes dense collage and quieter blue or
yellow repeat-pattern examples.

This library governs composition and energy only. It does not authorise copying
the reference people, substituting generic pop-art faces, or ignoring the master
people style. A collage must still have a dominant focal moment and a unified
palette; it may not become a grid of equal-weight unrelated thumbnails.

### Trading-card images

- `operations/reference/trading-cards/`
- Working prompt:
  `operations/codex-prompts/_character-card-deck-batch.md`

Trading cards are a deliberate category treatment: candy-palette pop-art frame,
comic banner, stars/bursts, and Ben-Day halftone. That treatment may stylise the
card surface, but character identity remains locked and the underlying adult face
must be designed from the master people register before the card treatment is
applied.

### Landscapes and backgrounds

- Environment references:
  `operations/reference/episode-style-popart/epstyle-scene-01.png`
  through `epstyle-scene-05.png`
- Environment notes:
  `operations/reference/episode-style-popart/README.md`
- Production SUNNYVAiLE colour setters:
  `assets/episodes/ep-04/pixel/ep04-daytime-colorsetter-sunnyvaile-main-street-v1.png`
  and
  `assets/episodes/ep-04/pixel/ep04-open-08-sunnyvaile-welcome-comic-v5-from-user-street-clean-1920.png`

The landscape references define depth, architecture, scene density, lighting,
and a lived-in town. They do not authorise flat-vector people. Any person placed
inside a landscape must still match the master people style.

## 5. Text-production rule

Generate clean art without text by default. Add exact dialogue, captions, titles,
and word art as a separate editable/deterministic layer whenever practical.

This prevents:

- misspellings and gibberish;
- ugly baked-in boxes;
- incorrect bubble tails;
- canon lines becoming trapped in an image;
- a full scene re-roll for a one-word correction.

Generated lettering is permitted only when the lettering itself is the visual
asset and it is checked character-for-character against approved copy.

## 6. Required production preflight

Before generating or editing an episode visual:

1. Name the scene and output path.
2. Name every character and the exact identity reference for each.
3. Include the master people-style image as a separate **style-only** input.
4. Name the relevant category library.
5. State what is locked and what may change.
6. Keep text separate unless the brief explicitly requires baked-in word art.
7. Save a versioned candidate; never overwrite an approved original.

## 7. Required visual QA

An episode image fails if any answer is no:

- Does every person look drawn in the master Heroine-face register?
- Is each character unmistakably the correct person?
- Are adult scale, anatomy, head size, and body type believable?
- Are ink lines, hair strokes, and faceted shadows present without painterly blur?
- Does the environment use the saved background references?
- Does the layout follow the correct comic/page/bubble/card library?
- Is all text exact, readable, correctly attributed, and safe from the title/action?
- Are branding and wordmarks approved rather than inferred?

For multi-character art, check every person individually at face-crop scale.

## 8. Rejected and non-reference outputs

The following are retained for history but are not style references and must not
be used as inputs:

- `assets/episodes/shared/welcome-back-series-comic-v1-1920.png`
- `assets/episodes/shared/delivery-20260723-welcome-back-concepts-v1/`
- `assets/episodes/shared/delivery-20260723-welcome-back-current-cast-v1/welcome-back-current-cast-comic-candidate-v2.png`
- `assets/episodes/shared/delivery-20260723-welcome-back-current-cast-v1/welcome-back-current-cast-comic-candidate-v3-sunnyv-paulette-corrected.png`
- `assets/episodes/shared/delivery-20260723-welcome-back-current-cast-v1/welcome-back-current-cast-graphic-novel-candidate-v4-flat-ink.png`
- `assets/episodes/shared/delivery-20260723-welcome-back-current-cast-v1/welcome-back-current-cast-episode-style-candidate-v5.png`
- `assets/episodes/shared/delivery-20260723-welcome-back-cover-v1/`

The old seven-woman ensemble, chip-heart logo, and any retired wordmark are also
prohibited references for new episode art.
