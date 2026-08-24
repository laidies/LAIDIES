# LUMINAiRY orientation count-strip correction — 2026-08-24

## Verdict

The separate white `13 / 23 / 7` strip is rejected and removed. The three wing doors remain the only collection-count display.

## Visible defect

At a wide viewport, the strip stretched across the orientation section while its three small count cells occupied only the left side, leaving a large empty fourth area. It also repeated the exact totals already attached to the Saints, Mavens and Trailblazers door controls.

## Prevention

- Remove the `lum-counts` markup and every responsive style written for it.
- Keep `13 guides`, `23 profiles` and `7 profiles` on the three wing doors, where the numbers support the visitor's choice.
- Bind the rejection in the browser suite with an exact assertion that `.lum-counts` is absent.

## Calibration and verification

The new assertion first failed against the predecessor with `1 !== 0`. After removal, the complete browser suite passed at desktop, compact-desktop and representative mobile sizes. Fresh 1440×900 and 390×844 renders show the orientation copy without the white strip, blank fourth area or horizontal overflow.

This is local isolated-branch evidence only. It is not deployment or public verification.

## Behind the Build angle

More dashboard-like information is not automatically clearer: if a number already lives on the decision control, repeating it in a summary graphic creates noise and new responsive failure modes.
