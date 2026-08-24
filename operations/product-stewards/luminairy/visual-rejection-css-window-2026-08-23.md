# LUMINAiRY visual rejection — CSS-window candidate

## Rejected artifact

- Commit: `a8f6097e486b39ab323b8f33056654ffde969ade`
- Rejected by Ali on 2026-08-23.
- Visible defects: giant gradient title, fake CSS-drawn stained-glass windows, generic dark landing-page composition, excess dead space and an archive-first hierarchy that did not feel like entering the LUMINAiRY.
- Every visual approval attached to that candidate is invalid.

## Locked successor direction

- Use `/assets/building-interiors/luminairy-nave.jpg` as the arrival environment.
- Use the three existing wing-door artworks for Saints, Mavens and Trailblazers.
- Preserve the accessible 13/23/7 profile, source-link, local-votive and honest 12-song/Carrie-deferred behavior inside the room.
- Do not recreate `.lum-window` or `.lum-hero__windows` scenery.

## Calibrated prevention check

`scripts/test-luminairy-browser.cjs` was run against the rejected candidate after the visual assertions were added. It failed with `rejected CSS-drawn stained-glass scenery must not return` and observed four forbidden nodes. A successor is mechanically admissible only when the forbidden count is zero and the nave plus all three wing-door images decode; visual quality still requires role-distinct inspection of the rendered desktop and mobile page.
