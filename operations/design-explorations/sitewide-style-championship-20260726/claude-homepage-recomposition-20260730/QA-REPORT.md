# QA-REPORT — LAiDIES Homepage recomposition (2026-07-30)

Isolated candidate. Served read-only from the `Website-homepage` web root via a local
Range-capable server so every root-absolute asset resolves exactly as production.
Nothing in production was edited, deployed or published.

**Live preview (while the local server runs):**
`http://127.0.0.1:8931/operations/design-explorations/sitewide-style-championship-20260726/claude-homepage-recomposition-20260730/index.html`
- `?intro=preview` replays the arrival sequence; `?motion=reduce` bypasses motion.

## Method
Rendered in the in-app browser. Layout verified by element geometry
(`getBoundingClientRect`) — reliable regardless of paint — plus visual capture of each
area. Note: the preview pane intermittently fails to rasterise some large webp/PNG images
on very tall viewports (tile-memory), showing blank wells; **all 14 images were verified
loaded (`complete:true`, real intrinsic sizes)** and several rendered fine (masthead
street, Chick Flicks postcard, Delta LAi Nu, Claude provider art). This is a pane
artifact, not a page defect — real browsers paint them.

## Responsive sweep — horizontal overflow = 0 at every width
| Width | docW−vw | Masthead buttons | Nav | Notes |
|---|---|---|---|---|
| 1440 | 0 | 4-up (1 row) | full | equal 145×79 |
| 1280 | 0 | 4-up (1 row) | full | equal 149×79 |
| 1000 | 0 | 2×2 | menu | (was 149px overflow → fixed) |
| 950 | 0 | 2×2 | menu | masthead stacked (no clip) |
| 900 | 0 | 2×2 | menu | equal 399×60 |
| 768 | 0 | 2×2 | menu | dest/act 2-up |
| 390 | 0 | stacked | menu | Daily Buzz after main content |
| 320 | 0 | stacked | menu | single column throughout |

Masthead controls are **never** 3-on-a-row + 1 orphan (4-up → 2×2 → full stack).
Control groups equal within their row at every width (area buttons, destination cards,
activity cards, level cards, method steps, tour stops).

## Arrival sequence (once per browser-tab session) — verified
White static line → LAiDIES ident expands → approved master **plays muted** →
Skip reveals the full masthead with **no geometry jump** (masthead sized underneath from
first paint). `sessionStorage` gate confirmed; `?motion=reduce` bypasses to the stable
masthead; Skip button focusable; no autoplay audio.

## Accessibility
- Text contrast (measured): eyebrow-teal 5.10, eyebrow-coral 4.63, eyebrow-amber 5.00,
  body/lede 9.70, quiet-link 7.12; buttons plum-on-fill 5.0–9.1, white-on-purple 5.80 —
  all ≥ 4.5:1.
- Visible focus ring (3px purple); semantic h1→h4; meaningful alt text; skip link;
  reduced-motion path bypasses all motion and the logo animation.

## Honesty (see FUNCTIONALITY-GAPS.md)
Latest episode resolves dynamically from `/content/episode-index.json` (Ep 04 today,
`aria-label` + title bound at runtime — not hard-wired). Promptoscope shown complete with
no misleading link. Song of the Day uses the real `the-laidies-wednesday-in-sunnyvaile.mp3`.
No claim of live messaging, cross-device account entry, Closet mutation, personalised
"what's new," magic-link delivery, or a full class catalogue. Resident-Card + Postcard
default-opt-in behaviour described per brief.

## Defects found and fixed during QA (self-reject gate)
1. **Nav overflow at 1000px** — desktop nav (953px) didn't fit; collapsed the nav to the
   Menu button at ≤1040px. Overflow now 0.
2. **Daily Buzz labels lost their colour** — `.buzz-item p` (muted) beat `.label-*` by
   specificity, so category labels rendered plum. Scoped to `.buzz-label.label-*`; the
   nine labels now show their correct accent colours.
3. **Masthead copy could clip at 901–1000px** — the absolute overlay on a shorter image
   with `overflow:hidden` left only ~5px margin. Switched the masthead to its stacked
   (image-banner + copy) layout at ≤1000px; overlay now runs only ≥1001px (42px margin).

Also removed three compositing hazards that were also crashing the preview pane's paint:
`background-attachment:fixed`, header `backdrop-filter`, and a 2200px `position:sticky`
Daily Buzz rail (now scrolls normally). None affected the design.

## Anti-pattern checklist — all clear
No boxes-in-boxes · consistent card sizes within groups · no 3+1 orphan · no text/image
overlap · identity imagery `contain`, no bad crops · no unapproved images (rejected
SUNNYYVAiLE postcard absent; Miss Jeeves omitted — LIBRAiRY-only) · no unexplained blank
space · no duplicated destinations · distinct section boundaries · no internal language in
visitor copy · no solid-plum backgrounds · not dark/neon, not magazine, not dashboard ·
no console errors.

## Known limitation
Static full-page image files are not attached: the preview pane returns screenshots
inline, not as saveable files. All required states (7 widths + arrival mid/reveal +
mobile) were rendered and reviewed live and are reproducible at the preview URL above.
