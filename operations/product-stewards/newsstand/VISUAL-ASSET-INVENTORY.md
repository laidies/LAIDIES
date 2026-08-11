# NewsStand visual asset inventory

**Status:** REPORT READY — local implementation observed; this is evidence, not visual approval or an integration instruction.

**Inventory date:** 2026-07-28
**Route inspected:** `/newsstand.html` (served from the current repository state)
**Required public-entry references inspected:** Homepage activity card, town-map hot spot, directory/tour/quick-rail links.
**Render evidence:** `evidence-visual-inventory-2026-07-28/`.

## Discovery evidence

The locked public mastheads are **The Breaking, The Daily, The Weekly, The
Tribune** (`operations/engine/LEDGER.md`, D-2026-07-25-042). `TODAY` and
`WEDNESDAY Edition` are retired reader-facing identities. The four-paper P0
packet requires a distinct operable paper for each of those four jobs. The
approved storefront reference is
`approved-assets/buildings-storefronts/02-sunnyvaile-newsstand.png`.

The Paige/rack image and its two paper images are implementation candidates,
not approved visual authority: the independent wave-2 review says explicitly
not to admit Paige/rack art or four-paper final artwork. This inventory does
not elevate any current implementation asset to approval.

Observed with local Chrome on 2026-07-28 at 1440 × 1024, 390 × 844 and 320 ×
844. Source paths, intrinsic dimensions and SHA-256 values were resolved from
the current working tree. CSS/DOM inspection covered normal, responsive and
dataset-driven states; no image-specific error handler/fallback exists in the
live route.

## Asset disposition register

| ID | Visible asset / source | Intrinsic evidence | Where / responsive behavior | State / disposition | Evidence and finding |
| --- | --- | --- | --- | --- | --- |
| NS-V01 | `assets/building-interiors/delivery-20260724-newsstand-comic-v1/newsstand-paige-rack-comic-candidate-v1.png` | 1660 × 948; `6f68b6d25bea566217551ccfbab496daa93bc6dceb90fc0af4ba9936ba85ebc5` | Full-width room image at desktop; at ≤720 px it is cropped to 4:3, `object-position: 71% center`. | **REPLACE** | Paige is legible and her desk/source-check board reads as authority, but the exact asset is candidate-only and has not passed visual admission. Its painted rack is decorative and cannot supply the four locked publication identities. If the request fails, the live page retains only an empty/cyan scene surface: no usable room fallback. |
| NS-V02 | `assets/building-interiors/delivery-20260724-newsstand-comic-v1/newsstand-paper-wednesday-comic-candidate-v1.png` | 1003 × 1568; `10083b63f371ed29ebcd7d94c7bf8358f5053460a6033ac46f00448916d55617` | Operable `weekly` control. Desktop overlay, left 20.4%, top 43.5%; ≤720 px becomes column one of a two-column strip. | **REMOVE** (or **REPLACE** only with an independently admitted Weekly cover) | Its painted masthead visibly says **WEDNESDAY EDITION**. DOM calls it “Archive art · The Weekly desk,” but this does not erase the contradictory visual identity. The 390/320 renders show it prominently and it is therefore not a safe temporary public treatment. |
| NS-V03 | `assets/building-interiors/delivery-20260724-newsstand-comic-v1/newsstand-paper-tribune-comic-candidate-v1.png` | 1003 × 1568; `8dd6377f8a08bf6884076ee5c1fcc70628ff177900309da885d63fdd7c246aee` | Operable `tribune` control. Desktop overlay, left 39.2%, top 43.5%; ≤720 px becomes column two and is clipped offscreen at initial view. | **REPLACE** | Text says Tribune but the candidate has no independent visual admission; it cannot stand in for the completed four-paper set. The handwritten “hot off press” visual appears despite the live Weekly being on editorial hold, weakening state authority. |
| NS-V04 | CSS room/page grounds in `content/newsstand.css` | CSS gradients only; no bitmap hash | Page radial/linear pastel ground; room dark ink ground. Mobile rack ground changes to navy/teal stripe. | **ADAPT** | These support the page but cannot substitute for a complete publication-object system. The mobile rack ground makes the two papers look like a detached strip rather than an in-room four-paper counter. |
| NS-V05 | CSS paper treatments: `.ns-paper`, masthead overlays, fresh stamp | CSS-only; images above provide paper faces | Desktop positions only two image papers; mobile reflows exactly those two to a 2-column grid. Hover/focus lift is enabled; reduced motion removes transitions. | **REPLACE** | Functional semantics cover all four editions through the four text publication buttons, but only Weekly and Tribune receive physical-paper treatment. Breaking and Daily are visually demoted into boxed status controls, contrary to the locked four-paper job and “rack is interface” rule. |
| NS-V06 | Favicon: `assets/brand/laidies-logo-square-pearl-512-v1.png` | Browser-tab metadata; not visible in page render | `<link rel="icon">`; no in-page display. | **KEEP** | Metadata identity asset, outside the room/rack visual failure. |

### Dynamic, fallback and state-derived visual surfaces

| Surface | Current behavior | Disposition |
| --- | --- | --- |
| Four publication state labels | JS derives `current`, `quiet`, `hold`, `stale` and `unavailable` labels/colors from `NEWSSTAND_DATA`; visible below the room. Baseline render shows quiet Breaking/Daily, hold Weekly and current Tribune. | **ADAPT** — retain truthful state mechanism, but bind each state to a real, distinct paper object and do not use an arbitrary “Hot off the press” stamp when its paper is held/quiet. |
| Reader / archive | Dynamic DOM text and CSS newspaper texture; no story image/cover image is inserted by the live renderer. | **KEEP** for functional visual surface pending separate visual review; it does not repair the arrival/rack gap. |
| Paige/rack image failure | No `error`, `onerror`, replacement image, text fallback, or CSS fallback with a meaningful room/identity exists on the live route. | **REPLACE** — add an accessible, explicitly designed room-art failure state before candidate admission. |
| No-JS / data load failure | Reader contract produces text-based load-failure/hold states; room/rack images remain their normal visuals. | **ADAPT** — currently visual state can contradict blocked/held publication state. |

## Relevant public entry visual inventory

| Entry | Asset / source | Intrinsic evidence | Disposition | Finding |
| --- | --- | --- | --- | --- |
| Homepage activity card (`index.html`) | `assets/sunnyvaile-buildings/web/02-sunnyvaile-newsstand.jpg` | 720 × 405; `69eb393ec2d3ce5d02f7eb97fc872b8d05f8982b53373bb8ba0b4d33392c965b` | **REPLACE** | It is a derivative storefront file, not the approved storefront reference. Homepage copy accurately names four jobs, but the card’s generic exterior does not establish the four papers or Paige’s source-check authority. |
| Approved comparison reference | `approved-assets/buildings-storefronts/02-sunnyvaile-newsstand.png` | 1664 × 936; `04e80de8c6d14c894206d19fbc91dcbef7fa6356538546c2e6db83c84dc0daef` | **KEEP** as the approved exterior reference only | Use for comparison/entry context; it is not a valid operable rack because its painted exterior text/titles are not the locked paper identities. |
| Current exterior variant | `assets/sunnyvaile-buildings/y2k-v3/02-sunnyvaile-newsstand.webp` | 1664 × 936; `9db9514a5d795379da73b08544ef9fbff054c2a6d59e73825881af5ee0dc142b` | **REMOVE** from future public rack/identity use | The current building brief explicitly says its exterior mastheads are non-canon and it must never be used as the operable rack. It is not directly mounted by the current NewsStand route, but remains relevant discovery/reference debt. |
| Homepage town map / directory / tour / quick rail | CSS/inline visual controls and shared icons; no NewsStand bitmap mounted in these references | N/A | **KEEP** | They route correctly to `/newsstand.html` and use the four-job/“source-checked, current or honestly quiet” discovery language where updated. They cannot compensate for a visually contradictory destination. |

## Render observations

- `newsstand-live-desktop-1440x1024.png`: The Paige room is visually strong as a scene but only two paper objects are mounted. The first visibly says **WEDNESDAY EDITION**; the second is Tribune. Breaking and Daily have plain lower status cards rather than papers.
- `newsstand-live-mobile-390x844.png`: The 4:3 crop preserves Paige and sign but the rack becomes a separate two-column band. Weekly and Tribune begin below the room; Breaking and Daily still have no paper faces.
- `newsstand-live-mobile-320x844.png`: Same structural issue at the narrow target. The two-paper strip is narrower/cropped at initial view; no responsive fallback synthesizes the missing Breaking/Daily paper treatment.

The three screenshots are evidence of the current local route only, not a passed visual review.

## Required visual build brief — next action

**NS visual build: four admitted paper objects + Paige authority fallback.**

Build in an isolated candidate (not directly into the public route) a single
NewsStand arrival scene that uses an independently admitted Paige/rack visual
or a deliberately non-illustrated fallback. Provide four real, keyboard
operable paper objects in the same counter/rack system:

1. **The Breaking** — rare qualified interrupt; no alert/fresh treatment when quiet.
2. **The Daily** — consequential briefing; distinct visual hierarchy from Breaking.
3. **The Weekly** — durable synthesis; no visible `WEDNESDAY`/`TODAY` identity or archive cover on a live control.
4. **The Tribune** — sourced argument; no generic/placeholder cover.

At 1440, 390 and 320, each paper must be fully visible, labelled with the
exact masthead, have a distinct but coherent paper treatment, expose its
actual quiet/current/hold/stale state, and open the same reader with keyboard
focus recovery. The room must retain Paige’s “ask questions / check sources /
get the real story” authority without relying on unapproved candidate art.
Include a designed room-art failure state. Compare against the approved
storefront reference at matched viewports, inspect all visible words/symbols,
and secure a non-maker full-resolution visual-admission verdict before any
integration request. The candidate must not use external/storefront artwork as
the operable rack.

## Scope and discovery implications

The locked naming migration is not visually complete even though the DOM is:
the legacy Wednesday cover remains the dominant first paper. A visitor arriving
from the homepage, tour, directory or quick rail is promised four source-checked
desks but sees two physical papers. This is a discovery and trust problem, not
merely an art polish task: the route’s main metaphor fails to make Breaking and
Daily discoverable as peer publications, and a held Weekly may appear fresh.

No build, visual approval, public verification, deployment or publication is
claimed by this evidence record.
