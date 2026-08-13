# NewsStand v25 independent deployed-pixel visual review

**Reviewed:** 2026-08-13 11:18 PDT
**Reviewer:** role-distinct NewsStand visual judge `newsstand_v24_visual_judge`
**Verdict:** `HOLD_DEPLOYED_PIXELS`
**Scope:** exact protected preview only; no content, production or public authority

## Blocking defect

The deployed preview does not preserve the locally reviewed v25 typography.
The strong condensed display treatment becomes thin, generic-looking large
sans text in the deployed Daily and article. That materially weakens the
newspaper identity and makes the deployed experience different from the
candidate admitted locally.

The regression is visible in all three Daily-newspaper captures and all three
article captures. It is especially damaging at 390 and 320 pixels, where the
thin headline occupies many lines without the intended editorial authority.

## Artifact-first findings

- The complete page retains a clear Daily-first hierarchy, bounded four-desk
  treatment, Catch Me Up and archive/search.
- No clipping, content collision or horizontal document overflow was found.
- The mobile partial next desk remains visibly intentional because the page says
  `Swipe for all four`.
- The Career replacement fits the compact desk rail.
- The private-review banner and skip link are expected preview artifacts, not
  public-page defects.
- Layout repairs over the known-bad predecessor survive, but local v25 cannot
  prove deployed visual quality because the deployed typography changed.

## Exact SHA-bound scope

| Surface | 1440 | 390 | 320 |
|---|---|---|---|
| Complete page | `4e793fbb6ecba6ad66bd4dafcff6301d6d665e2d80cd0eaeac7f44c1495ebeb6` | `e0046b51e6f373d452bf77cb9fbc311b85ca7fc86890dd611b71d754d6239ec0` | `f05b1e941db2a9a74969a1ed3e458385613dc2e64bc6c6b1bbd7b4bf1746233b` |
| Daily newspaper | `c75c49d757dd6596402c12938b094c1423e98fbb1f33dd183ba3108016c591dc` | `d8e342400a698a6b4f4fb7a480848a122b101181d61eb5cf1c72796191843eed` | `834792ed8fee2c6ea76c939af6c90bc632ddcc87b701175a5f6ef5cc7cded7c4` |
| Article | `08deeaa0b47ecf3ded0ad124defa6c898042f696994fee84612864de1042841a` | `6f03b14831ca4c073c48e603a25aff4800488837fec5eefa362f5f002dd9b936` | `1661587cc25cca1d3c54c3a6850798a6dda98f842149742d36d1adb5d7724f1c` |

## Exact unblock

Remove the runtime dependence on an external font service, bind the intended
font files into the curated artifact, and make both local and deployed capture
fail unless the exact `Anton` and `Jost` faces load before pixels are recorded.
Then rebuild and re-review a successor package. Do not show v25 to Ali.
