# LIBRAiRY arrival visual exploration

**Date:** 2026-07-24  
**Status:** RESET V7 GENERATED FROM ORIGINAL DIRECTION 2 — OWNER REVIEW REQUIRED  
**Scope:** the masthead and interactive shelf scene only; no production build
or approval is implied.

## Owner finding

The current masthead and shelf scene are coherent enough to function but feel
underwhelming rather than memorable.

## Evidence-backed diagnosis

- The masthead crop clips the room signage and reference desk, so the scene has
  no complete focal composition.
- The title and promise sit in a detached white strip instead of belonging to
  the illustrated environment.
- The rendering reads as polished staged photography rather than the locked
  LAiDIES adult graphic-novel language.
- The second scene repeats the same generic library architecture, then spends
  a large amount of the frame on empty carpet.
- The sparse upright books and modular metal cases read as a retail/product
  display rather than a place with story, discovery or personality.
- Taken together, the two images create two beginnings instead of one
  escalating arrival sequence.

## Non-negotiables used for exploration

- Preserve Miss Jeeves's established identity.
- Use the locked Heroine reference for rendering language only, never identity.
- Adult dimensional graphic novel: decisive ink, faceted light/shadow and
  subtle print texture; neither flat cartoon nor painterly realism.
- Bright, sunny, daytime SUNNYVAiLE.
- Light lavender/pale-blue architecture with midnight structure and vivid
  raspberry, violet, blue and cyan accents.
- Pink and purple should lead over red and yellow, without becoming the only
  colours.
- No old wordmark, chip-heart, generic cards, empty-floor spectacle, floating
  books, gibberish signage or childish treatment.
- Preserve the real interactions: Ask Miss Jeeves, 101s, Tools and Reference.
- In every brand word, the complete adjacent `Ai` pair is the accent unit:
  both the capital `A` and lowercase `i` take the same accent colour. Never
  describe or render the rule as “accent the i.”

## Generated directions

The numbering below matches the order displayed to Ali in the originating
Codex task.

1. `reference-desk-cover.png`
2. `living-stacks.png`
3. `comic-cutaway.png`

## Selected-direction refinement

Ali selected direction 2 as the strongest starting point and rejected:

- the spiky/starburst ends on the Ask Miss Jeeves control;
- the abrupt cyan-to-pink transition on that control;
- the unexplained woman poster behind Miss Jeeves; and
- the incorrect brand treatment that accented only the `i`.

`living-stacks-refined-v2.png` preserved the selected room and shelf
architecture, replaced the burst with a low-profile rounded control and
removed the poster. Ali did not approve it: the scene remained painterly,
dark and purple-heavy; the control styling was too heavy; and generated
wordmark typography continued to violate the exact `LIBRAiRY` contract.

## Layered-production correction

The repeated wordmark and fake-control failures established that one generated
bitmap must not be asked to act as environment art, sign writer and working
interface at the same time.

`living-stacks-environment-plate-v3.png` established the **environment plate
only** method. It kept the three-bay Living Stacks architecture and Miss Jeeves
at the physical desk, moved the room to bright daytime neutrals, and removed
all baked branding and fake interface elements. Ali found that its evenly
distributed pastel accents had overshot into a candy palette.

`living-stacks-environment-plate-v4-grounded.png` preserves the same layered
composition while grounding the palette in warm off-white, pale stone, brushed
silver and deep ink/cobalt structure. Saturated cyan and raspberry are now
controlled accents; violet and warm yellow are sparse. Ali's response remained
uncertain: removing the candy palette exposed a deeper problem—the repeated
oversized blank feature books, uniform bays and spotless surfaces made the room
feel corporate and controlled.

`living-stacks-environment-plate-v5-characterful.png` changed that underlying
art direction rather than recolouring v4. It introduced mixed book heights and
densities, picture-only feature covers, curved custom shelf surrounds, a
lived-in reading nook and more material depth. Ali rejected it: the room became
dark again, its generated shelf objects were arbitrary and the shelf lighting
did not belong to the atrium lighting.

A sixth shell-only correction had already begun rendering when the production
lane issued the stop/reset instruction. It is preserved as
`living-stacks-environment-plate-v6-empty-shell-rejected.png` for evidence only.
It must not be treated as an owner-review candidate, refined or implemented.

Ali then explicitly asked to try again because an image is needed to keep the
page moving. `living-stacks-reset-v7-owner-review.png` returns directly to the
original direction 2 instead of inheriting from v2–v6. It preserves the
original composition, relevant LIBRAiRY book collection, Miss Jeeves, carpet
and curved architecture while removing the poster, generated wordmark,
department lettering and fake Miss Jeeves UI. Shelf illumination was changed
from amber retail glow toward the atrium's neutral daylight. Ali's “alright”
response accepted v7 as the working image direction so the layered page build
could resume. This is a working-direction acceptance, not approval of the
separate inherited book-cover palette.

All environment-only passes deliberately contain:

- no baked `LIBRAiRY` wordmark or title;
- no generated Ask Miss Jeeves input, button, arrow or UI panel;
- no department labels, poster or portrait; and
- clean architectural fascia and foreground space for deterministic HTML.

The exact `LIBRAiRY` wordmark, department labels, interactive books and real
Miss Jeeves form must be separate HTML/SVG layers so spelling, `Ai` casing and
colour, accessibility, interaction and responsive layout remain editable and
testable.

### Current manifest

| File | Status |
|---|---|
| `reference-desk-cover.png` | REJECTED DIRECTION |
| `living-stacks.png` | SELECTED CONCEPT; SUPERSEDED BY LAYERED METHOD |
| `comic-cutaway.png` | REJECTED DIRECTION |
| `living-stacks-refined-v2.png` | NOT APPROVED; SUPERSEDED |
| `living-stacks-environment-plate-v3.png` | NOT APPROVED; CANDY PALETTE |
| `living-stacks-environment-plate-v4-grounded.png` | NOT APPROVED; TOO CORPORATE/CONTROLLED |
| `living-stacks-environment-plate-v5-characterful.png` | NOT APPROVED; DARK, RANDOM SHELF OBJECTS, MISMATCHED LIGHTING |
| `living-stacks-environment-plate-v6-empty-shell-rejected.png` | REJECTED EVIDENCE; GENERATED BEFORE STOP ARRIVED |
| `living-stacks-reset-v7-owner-review.png` | ACCEPTED WORKING DIRECTION; LAYERED PAGE QA COMPLETE |

Do not generate another environment refinement. The production copy is
`assets/building-interiors/library-living-stacks-reset-v7.png`; exact branding,
department labels, book interactions and Miss Jeeves remain editable HTML
layers.
