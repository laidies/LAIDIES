# NewsStand v26 independent deployed-pixel visual review

**Reviewed:** 2026-08-13 12:02 PDT
**Reviewer:** role-distinct NewsStand visual judge `newsstand_v24_visual_judge`
**Verdict:** `ADMIT_PRIVATE_DIRECTION_REVIEW`

## Blockers

None found in the exact deployed v26 pixels.

## Pixel findings

The failed v25 deployed-font condition is absent. The exact deployed v26
screenshots show the intended heavy condensed display treatment consistently:

- the main Daily lead is strong, condensed and newspaper-like;
- all four service-desk headlines retain the same editorial display voice;
- full-article section heads and the action callout preserve the reviewed
  print/pop hierarchy;
- the responsive experience remains coherent at 1440, 390 and 320.

No visual clipping, overlay collision, horizontal document overflow or
accidental mobile desk-stack is visible. The first service desk, partial second
card and `Swipe for all four` label make the mobile rail intentional. The
complete page keeps the Daily first, then Catch Me Up and archive/search as
secondary services.

The yellow private-preview strip and skip link are expected protected-preview
controls. They obscure some ordinary site chrome at the very top but do not
affect the newspaper itself.

## Comparison

- Against rejected deployed v25, v26 restores the missing condensed display
  type at every inspected state. The exact deployment now has a NewsStand
  identity instead of generic thin fallback text.
- Against admitted local v26, the deployed Daily, complete page and article
  preserve the same paper texture, ink contrast, vivid controlled accents,
  Daily-first hierarchy, service rail and continuous article rhythm. Small
  line-wrap differences are responsive rendering, not a direction change.

## Non-blocking concerns

- The Career/Work-Life desk remains at the practical density limit for the
  compact four-desk rail.
- The mobile rail still requires the separate real-device interaction check
  before public release. Screenshots prove the visual cue, not touch behavior.

## Exact SHA-bound scope

| Surface | 1440 | 390 | 320 |
|---|---|---|---|
| Complete page | `0484fa9e9a8a406ea5a9a32f77814d90238a4434e1f4fb45623f105fa88798a6` | `f9ce3ff98fe0c36f30267859355b5d182d12a0edb677f57e608e978e4bb235cd` | `9662baf04a70ce2c8c4fc01b6733d99952d10fb2492ce6c497948018012b592d` |
| Daily newspaper | `b7e6acdcf7ad6704c53143350e0a85dff6a696ad3feb98f7dd0f1be138aae1db` | `1aaf633cd2b7e64dfa15a6acbd05a2d6e67082b371feb9edbcb5cbea8b22532b` | `909ebcd3d12b7edd96bce07c74c62af8636f7deaccbbae2a12489b91ba81d92a` |
| Article | `c4b2e7fcc1d06f2170189c4bc792753540dee9b0940e48ff89fe899505a878cd` | `a7dade78981697b665d95228eb2a0fc1c8cdc0b77d5cdc3746e84a5263483229` | `1befe7974cd20f4f59701969e09165abd665576500118cffbac866fc63cadfff` |

## Authority boundary

This admits only these exact deployed-preview v26 pixels to Ali's private
visual-direction review. It does not approve story claims, sources, issue
admission, production deployment or public release.
