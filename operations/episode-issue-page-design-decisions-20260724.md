# Episode issue pages — construction decisions

Date: 2026-07-24  
Routes: `/issues/issue-01.html` through `/issues/issue-04.html`

## Decision

The issue pages are not a second building type and not a dashboard. They are
open episode features: comic cover first, then one continuous magazine /
graphic-novel reading surface.

## Opening construction

Each issue uses its real episode title-card art as the left side of a full-width
cover. The baked title on that source is covered on desktop so the visible title
can remain live, accessible, responsive, and canon-correct. The right side is
near-black midnight blue with:

- layered comic display type;
- episode logline;
- lesson, cast, and reading-time line;
- one direct Screening Room action.

On mobile the object side of the cover becomes the upper image field and the
live title/read information continues below it. The construction preserves the
lowercase `i` in Episode 01's live `Ai`.

## Reading construction

- one sticky horizontal chapter rail with real anchors and reading progress;
- oversized ruled chapter openings rather than heading cards;
- real episode frames as full comic panels with hard print keylines;
- receipts as continuous ruled/dashed sheets;
- pull quotes as full-width colour bands;
- glossary as one ruled disclosure register;
- PATRON SAiNT / MAiVEN credits as a horizontal call sheet;
- episode navigation as one ruled season strip.

The previous repeated rounded recap, next, try-on, receipt, glossary, cast, and
episode-button boxes are visually removed or converted into those continuous
surfaces. The original content and links remain in place.

## Shared implementation

- `content/issue-feature-v2.css`
- `content/issue-feature-v2.js`

The script derives chapter anchors from each source document and does not own
article copy. The CSS provides shared editorial grammar while each page keeps
its episode-specific cover source and accent order.

## Verification

- 1440 × 900 and 390 × 844
- no page-level horizontal overflow
- no broken loaded images
- 12 Episode 01 chapters
- 11 Episode 02 chapters
- 11 Episode 03 chapters
- 14 Episode 04 chapters
- chapter click, hash, current-location state, and reading progress work
- only expected diagnostic is Plausible declining localhost analytics

## Art boundary

The four current title-card sources are effective object-led cover art, not a
new character-style lock. Some article frames remain darker, flatter, or more
painterly than the approved Episode 04 Heroine rendering reference. This
construction is deliberately replaceable at the image source: art can be
rerolled without rebuilding the reading interface.
