# Visitor's Centre championship — research and placement inventory

**Status:** EVIDENCE READY — isolated owner-review work only.  
**Research date:** 2026-07-26.  
**Authority:** `operations/building-design-briefs/visitors-centre.md`,
`operations/site-visual-system-lock-2026-07-23.md`, and
`operations/episode-visual-system-lock.md`.

## Recovered locked intent

The Visitor's Centre is not an essay, dashboard or generic welcome page. Its
verb is: **take the map, see what every building does, and start the optional
guided tour**. The LIBRAiRY is the sole building-grammar model: one credible
room whose pictured objects are the controls.

The non-negotiable system is:

- a room-first, straight-on, warm daytime 1990s tourist-information lobby;
- the exact approved `sunnyvaile-town-map-final-v5.webp` as an operable object;
- an equally usable named directory that does not require hotspot memory;
- a plain arrival line explaining the front desk, available choices and current
  state;
- optional tour, short trailer and postcard handoffs without forcing any of
  them;
- the fold-out paper map signature: accordion creases, circled you-are-here,
  doodled star and faint coffee ring;
- adult dimensional comic/graphic-novel environment rendering with episode
  ink, faceted light, depth and controlled print texture;
- candy pink, teal, coral, periwinkle, cream and near-black-blue ink; no gold,
  no large plum panel and no generic card grid.

The greeter remains an unassigned identity slot. No generated person may fill
that slot merely for warmth. The owner-approved Heroine image is style authority
for people, not permission to turn the Heroine into the Visitor's Centre host.
This cycle therefore uses an object-led arrival and no person.

## Fresh incumbent evidence

The exact current source was captured at clean newcomer and active-tour
returning states:

- desktop 1440 × 1000: 3,502px full document height;
- mobile 390 × 844: 3,785px full document height;
- all 17 select options and all 17 map triggers present;
- no horizontal overflow;
- returning state shows the shared tour paused at stop 6, the LIBRAiRY.

Command:

```text
node operations/design-explorations/visitors-centre-building-championship-20260726/capture-incumbent.mjs
```

Runtime: Playwright Core 1.61.1; headless Google Chrome 150.0.7871.187.
Metadata and exact screenshots are under `evidence/incumbent/`.

Observed design result:

- The desktop opening is a credible room/map composition, but the welcome copy
  is painted across the room wall and the map object does not visibly retain a
  selected destination at rest.
- Immediately after the room, the page becomes a conventional select strip,
  two unrelated full-width panels, a large separate postcard workspace and
  founder accordions.
- Mobile reduces the room to a short decorative strip and then requires a
  3,785px vertical journey through detached blocks.
- The postcard composer visually outranks orientation even though postcard
  preparation is optional and has its own product route.
- The page safely communicates route and downstream truth, but contract quality
  has been mistaken for completed building design.

The same-state incumbent/candidate composite is:
`candidate/evidence/incumbent-vs-candidate-comparison.png`.

## Pattern research — principles, not imitation

### Site-specific orientation

The U.S. National Park Service Harpers Ferry Center says a wayside map should
have a clear, site-specific purpose; the "You Are Here" marker is usually its
most important feature; and labels should match the names used on real signs
and other visitor media. Translation: the Visitor's Centre map needs one
legible present location, the same 17 names as the directory, and only the
information needed to choose a next stop.

Source: <https://home.nps.gov/subjects/hfc/wayside-maps.htm>, accessed
2026-07-26.

### Consistent pedestrian mental model

Transport for London's Legible London material treats maps and signs as one
coherent wayfinding system that works alongside familiar systems rather than
competing with them. Translation: the wall map, A–Z named route and destination
reveal must agree exactly; the fold-out tourist map is a SUNNYVAiLE-specific
physical metaphor, not a second information architecture.

Source: <https://content.tfl.gov.uk/ll-yellow-book.pdf>, accessed 2026-07-26.

### Equivalent digital routes and reflow

WCAG 2.2 requires content to reflow at 320 CSS pixels without losing information
or function, visible/unobscured keyboard focus, keyboard operation and usable
target size. Translation: map spots are an enhancement; the 17-name select and
full static directory remain complete equivalents. At small widths the named
route wins over miniature pins. Selection moves focus into the revealed
destination, Escape closes it and returns focus, and reduced-motion removes
decorative transitions.

Sources: <https://www.w3.org/TR/WCAG22/> and
<https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/>, accessed
2026-07-26.

### SUNNYVAiLE synthesis

The resulting spatial-onboarding pattern is:

1. locate the visitor;
2. show the whole town;
3. give an equivalent named recovery route;
4. reveal one destination in the same physical surface;
5. offer tour/trailer/postcard as optional objects;
6. leave each receiving product responsible for current truth.

This is a pattern translation, not an imitation of NPS or TfL visual design.

## Placement-level visual inventory

| Placement | Job | Exact authority/input | Candidate treatment | Desktop / mobile rule | Status |
| --- | --- | --- | --- | --- | --- |
| Arrival room plate | Make the visitor feel inside a real front desk | Site visual lock; production SUNNYVAiLE colour setter as environment-style authority; old lobby candidate only as structural evidence | New text-free Fold-Out Map Counter clean plate | 1505×1045 desktop plate; independently recomposed 1024×1536 mobile plate | CANDIDATE — not owner approved |
| Wall map | Show the whole town and support spatial selection | `assets/final_map/sunnyvaile-town-map-final-v5.webp` only | Exact shared asset composited in HTML; never regenerated | Desktop map spots; visual map plus named route on mobile | APPROVED SOURCE / candidate placement |
| Fold-out map | Signature Visitor's Centre object and first-arrival metaphor | Locked building brief | Text-free paper object with creases, circle, star and coffee ring | Large counter object desktop; survives mobile composition | CANDIDATE |
| Named destination object | Equal route for people who cannot use a spatial map | Exact 17-name/route contract in current page | Physical A–Z file in art plus deterministic select and disclosure list | Select always available; full list one column on mobile | CANDIDATE / contract copied exactly |
| Map hotspots | Direct recognition route | Coordinates from `content/site/sunnyvaile-directory.js` | 44×44 HTML buttons over exact map; markers appear on hover/focus/selection | Hidden below 640px because the equivalent named route is safer | CANDIDATE |
| Destination reveal | Explain job, status and limitation before navigation | Current 17 fallback contracts in `visitors-centre.html` | One in-sheet reveal, not a modal/card grid | Same reading order and focus behavior on all widths | CANDIDATE |
| Welcome/character | Orient without inventing canon | Greeter identity is open; Heroine is style-only authority | No person; deterministic HTML welcome sheet | Compact overlay, readable over room | DELIBERATE ABSENCE |
| Tour object | Optional 17-stop escort | `content/site/sv-welcome-tour.js`; localStorage key `laidies_welcome_tour` | Start action; active-tour returning copy and resume destination | Same route; never auto-starts | DEPENDENCY PRESERVED |
| Trailer object | Short optional introduction | `/watch.html?ep=trailer` | One quiet action in welcome sheet | Same action on mobile | DEPENDENCY PRESERVED |
| Postcard object | Optional souvenir/handoff | `assets/postcards/from-sunnyvaile/pc-welcome.png`, `/postcard.html` | One physical postcard ticket; full composer removed from orientation page | Scales to one contained object | DEPENDENCY PRESERVED / product ownership restored |
| Founder note | Explain town history | Canon assigns this to Town Hall | Omitted from candidate | No mobile duplicate | REMOVED FROM THIS BUILDING |

## Destination-reveal inventory

Every one of the 17 routes is represented in three equivalent forms: map
trigger, named select and full directory. The candidate copies the current
`state`, `summary`, `limitation` and `href` contract for:

1. Visitor's Centre
2. NewsStand
3. Chick Flicks
4. Blend & Snap
5. Mme CLAi-O
6. MAiKEOVER
7. BRONZE AiGE
8. Dream Phone
9. Mall
10. KSVL
11. Post Office
12. Town Hall
13. LIBRAiRY
14. SUNNYVAiLE High
15. FAiRY Godmother
16. Delta LAi Nu
17. LUMINAiRY

No route choice is recorded as downstream completion.

## Deliberate exclusions

- no invented greeter;
- no generated replacement for the exact town map;
- no numbered-pin memory requirement on mobile;
- no postcard form duplication;
- no founder-note duplication;
- no analytics claims;
- no account, delivery, playback, post, reward or service completion claim;
- no production integration, git, deploy or publication.
