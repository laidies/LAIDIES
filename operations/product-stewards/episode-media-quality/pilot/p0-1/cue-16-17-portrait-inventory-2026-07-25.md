# Cue 16–17 portrait inventory — full-resolution coordinate crops

**Status:** **FAIL. No identity is admitted.**  
**Method:** each source was inspected at native `1920×1080` resolution. Crop
coordinates below are deterministic `x1,y1 → x2,y2` regions of that exact
SHA-bound original, rather than exported derivative crops: the original source
hash remains the authoritative evidence and a cropped PNG cannot acquire an
identity merely by being cut out.

## Identity rule

An in-world stained-glass render, a matching filename, a pose, a uniform, or
visual resemblance is not a likeness binding. The current repository has no
per-person `operations/reference/real-people/<person>/` source dossiers and no
composition manifest tying these pixels to a named reference. Therefore this
inventory names only **visual position/description**, not a person, unless
future documentary provenance is supplied. The independent verdict’s warning
about the naval-uniform portrait is upheld.

## Cue 16 — MAiVENS hall

**Source:** `assets/episodes/ep-04/pixel/ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920.png`  
**SHA-256:** `007ff8202a7518f129096167730b30895dd9eae95b7faddffabf7c2331737f5a`

| Read order / native crop | Visible record | Identity outcome | Required disposition |
|---|---|---|---|
| 1 — `x 55–315, y 55–640` | large Victorian-styled woman in blue/black, paper/card-like object, mechanical motif | **UNRESOLVED.** It resembles the in-world Ada asset but no source-layer or real-person binding establishes Ada. | Remove/replace or bind a licensed period identity dossier and composition provenance. |
| 2 — `x 480–650, y 135–620` | large older person in naval-style uniform/cap | **UNRESOLVED.** A uniform does not establish Grace Hopper; independent review found the depiction ambiguous at frame scale. | Remove/replace; never label as Grace without a likeness dossier and exact composition map. |
| 3 — `x 735–885, y 225–610` | large short-haired woman, dark sleeveless dress, arms folded | **UNRESOLVED.** | Remove/replace or bind exact source/provenance. |
| 4 — `x 900–1035, y 275–610` | smaller darker-skinned woman in blue, holding a book/device | **UNRESOLVED.** | Remove/replace or bind exact source/provenance. |
| 5 — `x 1040–1130, y 325–615` | small standing woman in dark dress | **UNRESOLVED.** | Remove/replace or bind exact source/provenance. |
| 6 — `x 1115–1185, y 385–610` | small pale-haired figure | **UNRESOLVED.** | Remove/replace or bind exact source/provenance. |
| 7 — `x 1170–1240, y 405–615` | small dark-haired figure | **UNRESOLVED.** | Remove/replace or bind exact source/provenance. |
| 8 — `x 1450–1525, y 380–615` | small period-style portrait | **UNRESOLVED.** | Remove/replace or bind exact source/provenance. |
| 9 — `x 1550–1650, y 260–610` | one narrow right-wall blue-clad figure holding a card/device; the crop deliberately excludes the adjacent left face | **UNRESOLVED.** Coordinate-only evidence; it cannot establish a person. | Remove/replace or bind exact source/provenance. |
| 11 — `x 1710–1885, y 155–625` | large short-haired woman in dark sleeveless dress, arms folded | **UNRESOLVED.** It appears visually related to item 3 but no identity may be inferred. | Remove/replace or bind exact source/provenance. |

**Removed after full-resolution P0.2 reinspection:** former item 10 did not
represent a separate subject; its rectangle described the same dominant
right-wall woman already recorded by item 11. No replacement row is invented.

## Cue 17 — Ada-look-up frame

**Source:** `assets/episodes/ep-04/pixel/ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png`  
**SHA-256:** `1fe2f9dfb33f35b6fc23d0159455778169dea38e56cec96b5b1db4677782ac6c`

| Read order / native crop | Visible record | Identity outcome | Required disposition |
|---|---|---|---|
| 1 — `x 360–900, y 50–805` | dominant Victorian-styled woman, card/table-like sheet, elaborate mechanical background | **UNRESOLVED / PENDING Ada intent only.** The filename and a visual similarity to the local Ada stained-glass render are not a real-person likeness binding. | Keep only after Ada dossier + source composition map + independent likeness review; otherwise replace with an evidence-safe non-portrait teaching image. |
| 2 — `x 1040–1170, y 265–650` | blue-uniformed short-haired person holding a circular object | **UNRESOLVED.** | Remove/replace or bind exact source/provenance. |
| 3 — `x 1430–1560, y 375–665` | short-haired woman in dark sleeveless dress, arms folded | **UNRESOLVED.** | Remove/replace or bind exact source/provenance. |
| 4 — `x 1580–1675, y 450–690` | small dark-haired woman in blue | **UNRESOLVED.** | Remove/replace or bind exact source/provenance. |

**Removed after full-resolution P0.2 reinspection:** former item 5 duplicated
item 3 and former item 6 duplicated item 4. No additional unique readable
people exist in those rectangles, so no replacement rows are invented.

## Consequence

This is not a request to research names from faces. It is a removal threshold:
if an identity does not arrive with an explicit, licensed source reference and
a composition-to-source mapping, the portrait does not appear as a readable
person in a MAiVENS teaching cue. An environment-only wing is safer than
misidentifying a real woman.
