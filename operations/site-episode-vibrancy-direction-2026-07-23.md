# LAiDIES site + episode vibrancy direction

**Status:** direction clarified by Ali — the first proposed swatches and two
homepage mockups were rejected in visual context; do not implement them. A new
source-grounded swatch comparison still requires Ali's approval before any
production sweep.  
**Requested by Ali:** 2026-07-23  
**Scope:** entire site design, building pages, episode visuals, transitions,
comic lettering, and recurring series idents.

## What the new references establish

Ali's newly supplied comic references raise the desired energy:

- decisive black/deep-plum ink;
- hotter pink, cyan, coral, tangerine, and violet accents;
- bright cream/white breathing room;
- halftone and dot texture used deliberately;
- comic bursts, speed lines, cropped objects, and patterned fields;
- large condensed or irregular comic display words;
- dimensional adult character rendering that can carry vivid coloured light.

Reference libraries:

- `operations/reference/comic-cover-collage/`
- `operations/reference/comic-book-page-style/`
- `operations/reference/comic-strip-layout/`
- `operations/reference/comic-text-emphasis/`
- `operations/reference/font-and-text-emphasis/`
- `operations/reference/comic-ident-background/`
- `operations/reference/episode-style-popart/`
- `operations/reference/style-only-refs/styleref-07-woman-city-three-quarter-ink-faceted.png`
- `operations/reference/style-only-refs/styleref-08-man-neon-faceted-portrait.png`

The locked Heroine-face image remains the primary people-style authority.

These saved images control the visible interpretation of “vibrant,” “adult
comic/graphic novel,” “1990s,” lettering, composition and texture. They may not
be reduced to a prose mood, ignored in favour of an older palette paragraph,
or replaced by a generic design trend. A reviewer must compare the actual
candidate against the actual reference images, not merely confirm that a
brief, checksum or token list exists.

## Additional slide/background treatment

For selected chapter cards, explainers, transitions, and occasional site
backgrounds, use the layered typographic-overprint approach in:

`operations/reference/comic-text-emphasis/comic-text-16-blue-overprint-typographic-background.png`

Oversized words in varied display styles may overlap as background texture,
using a controlled single-family or neighbouring-family colour ramp. A separate
foreground title must remain clearly dominant and readable. Change all source
words and colours to the approved content and palette. Do not use this treatment
on every slide or building page.

## Current implementation problem

The repo contains competing colour systems:

1. `styles.css` currently starts with muted legacy values such as rose
   `#9b3f5f`, teal `#5b8c92`, and gold `#b49764`.
2. The homepage's approved 2026-07-12 system uses six lighter candy accents:
   pink `#e982ab`, coral `#ec7a78`, tangerine `#f4a636`, teal `#57b6c0`,
   sky `#8bbde9`, and periwinkle `#b3abe7`.
3. `styles-YVR28-OSVCJIT60.css` carries an older electric system including hot
   pink `#ff2d9b` and teal `#247b83`.
4. Several standalone pages define additional local `:root` palettes.

This creates more visible inconsistency than any single hex-value choice.

## Correction after homepage mockup review

Ali rejected the first homepage mockups as too childish and flagged that their
accent text still appeared to use the old colour palette. This is correct.

The failure came from:

- using cartoon starbursts, chunky comic shapes, and object-strip decoration as
  page chrome instead of limiting those devices to authored editorial moments;
- attaching the current homepage as a generation reference, which caused its
  coral/lilac/teal accents to bleed back into the redesign;
- interpreting the inspiration palette loosely rather than sampling its actual
  colour families;
- colouring large headline phrases in several candy colours, which made the UI
  feel juvenile rather than like an adult graphic novel or editorial magazine.

The generated mockups are not production candidates and are not saved in the
project.

### Source-extracted colour evidence

A median-cut sample across ten of Ali's saved comic/collage/lettering
references found the following recurring saturated clusters:

| Source family | Representative sampled colours |
| --- | --- |
| Cyan / sky | `#01EBFB`, `#04CEFA`, `#0FAFD9` |
| Raspberry / red | `#E4134B`, `#E62874`, `#E84A95` |
| Yellow | `#FAED1C`, `#F4D331`, `#FCEF71` |
| Violet | `#6D1EB5`, `#9B0CAE`, `#5F45A7` |
| Mint / green | `#87E4B0` |
| Ink | true black through deep near-black plum |
| Ground | clean white, pale blue, and very light warm cream |

These are substantially cleaner and more saturated than the homepage's current
pink `#e982ab`, teal `#57b6c0`, coral `#ec7a78`, sky `#8bbde9`, and periwinkle
`#b3abe7`.

### Adult-use rule

The source colours are not permission to make the interface a cartoon:

- keep headlines and body copy predominantly deep plum;
- use vivid colour as one lead accent, an underline, edge, selected state,
  button, panel gutter, or image colour—not as rainbow headline words;
- use editorial typography, generous whitespace, and hard-edged composition;
- keep starbursts, speech shapes, stickers, and sound-effect devices inside
  episode art, transitions, or one deliberate editorial feature—not behind
  ordinary homepage copy;
- do not use a strip of toy-like 1990s objects as generic page decoration;
- keep the existing light gradients and allow episode/town imagery to carry
  most of the visual colour;
- never default a building to cyan plus raspberry merely because both exist in
  the shared palette.

The earlier proposed vivid-fill table below is now **superseded and must not be
implemented**. It remains only as a record of the rejected intermediate
direction.

## Superseded intermediate system: calm surfaces + vivid pop tier

### What stays exactly as it is

Keep the current **light background gradients**. Do not darken them, saturate
them into neon fields, or replace them with electric pink/black.

### What changes

Replace the muted rose/gold/teal used in text, buttons, links, labels, borders,
comic lettering, highlights, and other small accents. Use a coordinated vivid
comic tier that is saturated and joyful but not fluorescent:

| Family | Current light family | Proposed vivid fill | Readable accent text on cream |
| --- | --- | --- | --- |
| Pink | `#e982ab` | `#f05a9d` | `#b62b6e` |
| Coral | `#ec7a78` | `#f3726c` | `#b4464a` |
| Tangerine | `#f4a636` | `#f6a338` | `#8a4c00` |
| Teal/cyan | `#57b6c0` | `#32b9c3` | `#167984` |
| Sky | `#8bbde9` | `#4b9fe5` | `#276aa9` |
| Periwinkle/violet | `#b3abe7` | `#9a7de0` | `#6146a8` |

Optional micro-accent: yellow `#f6d44b` for tiny stars, sparks, and comic bursts
only. It should not become a large page fill without a new explicit ruling.

Dark-plum `#3a1838` text passes WCAG AA contrast on all six proposed vivid
fills. The dedicated darker accent-text values pass AA on cream. Cream text
should not be used on these bright fills.

### Explicitly rejected

- muted rose/gold/teal as the default UI accent system;
- electric or fluorescent hot pink;
- hot-pink-plus-black as a site-wide look;
- pure black as the routine outline/chrome colour — use deep plum where the
  comic art does not require true process black;
- teal-plus-magenta as the automatic building-page pairing.

## Building-page colour rule

The current building pages overuse teal and magenta. Each building should have
one lead accent family chosen across the full palette, with at most one small
secondary family in the same visible section.

- Keep light gradients and cream/paper as the majority of every page.
- Give each building its own lead colour: pink, coral, tangerine, teal, sky, or
  periwinkle/violet.
- Do not use teal and magenta together by default.
- Buttons, selected states, labels, and comic ornaments use the vivid tier.
- Reading areas and large backgrounds stay light and calm.
- Let the building's illustration carry additional colour; UI chrome should not
  compete with it.
- Adjacent buildings and adjacent sections should not repeat the same lead
  accent when a different family works.

## Usage ratio

- 70% cream, paper, existing light gradients, and imagery.
- 20% building-specific light surface family.
- 10% vivid accents, deep-plum ink, bursts, and motion punctuation.

This preserves a premium, readable site while making interaction and episode
moments feel unmistakably LAiDIES.

## Rollout order

1. Approve the pop-tier swatches in a small visual comparison.
2. Create one canonical shared token source and map legacy variables to it.
3. Apply it to one representative site page and one episode ident.
4. Check desktop/mobile contrast, visual density, and animation.
5. Only then roll it through the remaining building pages and episode system.
