# Chick Flicks future-release VHS shelf QA

Date: 2026-09-02

## Evidence

- User-rejected announcement panel: `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-5bded0f3-ccd2-40ce-9b75-1ab94d5aeff2.png`, 2062 × 750 px.
- Existing VHS family reference: `assets/sunnyvaile-interiors/episode-vhs-boxes-v2/ep-01.png`, 1024 × 1536 RGBA.
- Full comparison: `comparison-banner-to-vhs-shelf.png`, 3284 × 768 px.
- Focused case-family comparison: `comparison-case-family.png`, 984 × 768 px.
- Desktop implementation: `implementation-desktop-future-shelf.png`, 1440 × 1100 CSS px at density 1.
- Phone implementation: `implementation-mobile-future-shelf.png`, 390 × 844 CSS px at density 1.
- State: Episode 04 is released; Episodes 05, 06 and 07 occupy the remaining shelf bays as inactive Coming soon cases.

## Findings

- No actionable P0/P1/P2 issues remain.
- Typography: `COMING SOON` is exact, dominant and readable at shelf size. The deterministic shelf labels name Episodes 5, 6 and 7 without implying release.
- Spacing/layout: the second physical unit now contains four evenly sized cases. Desktop presents all four across; phone presents Episodes 4–5 and 6–7 as two rows. No standalone announcement remains and document width equals the 390px viewport.
- Colours/tokens: the placeholder cover uses the current midnight, cobalt, pink, cyan, purple, cream and yellow family. Lower saturation on the shelf distinguishes unavailable tapes from Episode 04 without introducing a new state colour.
- Image quality/assets: the 1024 × 1536 RGBA placeholder matches the accepted transparent clear-clamshell perspective and proportions. The first generated RGB output had a baked checkerboard; it was rejected before integration and converted to genuine exterior transparency.
- Copy/content: the former `Next arrival` panel and its explanatory sentence are absent. The case carries only the requested words `COMING SOON`; episode numbers remain editable shelf labels.
- Affordance/accessibility: all three placeholders are non-links, absent from keyboard navigation, have explicit accessible names, and expose no dialog or Read/Listen/Watch route. The five released/trailer tapes remain operable.
- Browser verification: three placeholder cases, zero placeholder links, zero old panels, zero horizontal overflow and zero console errors at desktop and phone size.

## Comparison history

1. P1 source: a large informational card sat beneath an otherwise physical VHS catalogue.
2. Fix: removed the card, created one reusable clear-case placeholder, and stocked bays 5, 6 and 7 as inert future releases.
3. Post-fix evidence: the full comparison shows one coherent shelf; the focused comparison confirms the new case belongs to the accepted family; desktop and phone captures show the four-bay/two-row responsive behavior.

Primary checks: exact three future bays, no links or routes, cover text accuracy, RGBA dimensions/hash, desktop four-across, phone two-across, overflow and browser errors.

final result: passed
