# LUMINAiRY site-cohesion correction

## Ali's exact correction

- The room successor is not terrible and must not be redesigned from scratch.
- Its stained-glass windows are good and stay.
- It does not yet look like the rest of the site.
- The literal heart above the PATRON SAiNTS arch does not stay.

## Preserved

The painterly nave, real window environment, three-wing/door architecture, 13/23/7 roster, portrait-led cards, search, source links, local votive, audio controls and honest Carrie-deferred state remain.

## Changed

- Structural typography is Jost rather than Playfair.
- Major interface surfaces use near-black navy, image or electric gradients rather than parchment/plum.
- Hot pink, electric teal, saturated purple/periwinkle and coral supply shared site accents; golden amber remains the Trailblazer wing identity.
- Hero panel, search, wing doors, profile panel and controls use the shared rounded grammar.
- `assets/sunnyvaile-interiors/luminairy-saints-wing-door-v2-no-heart.png` replaces only the Saints entrance artwork. The built-in image edit replaced the literal heart with circular Gothic rose-window tracery while preserving the pink stained-glass room; the original file remains intact.

## Prevention and review

The browser suite was calibrated before implementation: it rejected the old Saints-door path and the old serif/square/flat-surface UI. The corrected implementation must require the versioned no-heart asset, Jost structural type, 10px-or-greater hero/search radii and a gradient orientation surface. Independent review initially held two visitor-visible cross-wing audio defects: CSS exposed the hidden Saints playlist outside Saints, and playback status followed the visitor into another wing. The successor adds an explicit `[hidden]` rule, stops/clears Saint audio on departure and tests both behaviors. A first re-review remained on the already-loaded predecessor script because the HTML's script query had not changed; the final successor also binds `luminairy-app.js?v=20260823-site-system-v3`. Fresh desktop/mobile review proved the playlist hides, audio pauses and clears, status disappears outside Saints, and the honest 12-song control returns without stale status. Final review status is recorded in the active-work checkpoint.

## Boundary

This is an isolated local/branch correction. It is not a deployment or public verification. Carrie's song remains deferred and the 13-song validator remains fail-closed.
