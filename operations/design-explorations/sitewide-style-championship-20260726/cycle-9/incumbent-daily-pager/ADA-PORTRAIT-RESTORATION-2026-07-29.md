# Ada Lovelace portrait restoration

**Status:** VERIFIED LOCALLY — NOT DEPLOYED  
**Date:** 2026-07-29

## Outcome

The `Why LAiDIES exists` panel again displays the incumbent approved Ada
Lovelace stained-glass portrait:

`/assets/mavens/y2k-stained-glass-v3-finished/ada-lovelace-y2k-stained-glass.png`

No substitute or newly generated portrait was introduced.

## Cause and correction

The incumbent panel used absolute positioning and a flexible image that
borrowed the height of the adjacent Method copy. After Cycle 9 narrowed the
main content column, that borrowed height was insufficient and flexbox reduced
the portrait to zero height before clipping the panel.

Cycle 9 now:

- lets the `why-box-lg` panel size itself from its complete contents;
- prevents the Ada portrait from shrinking;
- gives the portrait an explicit responsive maximum width; and
- preserves the portrait's native 2:3 aspect ratio with `height: auto`.

## Verification

- Desktop preview: image loaded from the exact approved source, natural size
  1024 × 1536, visible rendered size approximately 223 × 334.
- Mobile proof: same source, visible rendered size approximately 169 × 254.
- Source identity, alt text and surrounding Ada caption are unchanged.
- Town Entry product-steward validation: PASS.

