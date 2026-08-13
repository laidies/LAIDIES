# NewsStand v25 exact deployed-pixel maker inspection

**Inspected:** 2026-08-13 11:15 PDT
**Maker verdict:** `READY_FOR_ROLE_DISTINCT_DEPLOYED_PIXEL_REVIEW`
**Scope:** private direction review only; not production admission or publication

## Exact identity

- GitHub Actions run: `31729340786`
- Controller commit: `ffd3e9ad2fcee2bd4789d111f419f640fd996f7b`
- Candidate commit: `c90ec57aad5e19fbb3ff3a2aff0fdd3a9ffae03a`
- Complete Daily package: `operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v4.json`
- Package SHA-256: `512abcf9634a8ef7c74e9213b19df6338f56ffd16e632e535d21ddf862770ffe`
- Cloudflare deployment: `1a7fdf44-ba06-4021-beef-154b4f728ad6`
- Artifact identity: `01bf5a086495ef7ebe68e789156eb97705172145109baec9150b03f8b03068c8`
- Preview receipt SHA-256: `6b63490c7c38a7ddad57bbf59b9b602c642ff6fde23c59a8545a76dc155203a1`
- Temporary Access service token: revoked before artifact upload

The exact-preview validator passes the copied receipt and artifact manifest. The
deployed `newsstand.html`, stories, immutable Daily issue and service-column
dataset returned HTTP 200 and byte-matched the manifest. This is identity and
transport evidence; the visual findings below come from reading the PNGs.

## Artifact-first visual findings

I opened every image below at original resolution before reading producer or
automation claims.

| State | 1440 | 390 | 320 | Maker finding |
|---|---|---|---|---|
| Continuous page | `4e793fbb6ecba6ad66bd4dafcff6301d6d665e2d80cd0eaeac7f44c1495ebeb6` | `e0046b51e6f373d452bf77cb9fbc311b85ca7fc86890dd611b71d754d6239ec0` | `f05b1e941db2a9a74969a1ed3e458385613dc2e64bc6c6b1bbd7b4bf1746233b` | Daily, Catch Me Up and archive/search remain distinct; no repeated rack, runaway blank field, overlap or missing footer. |
| Daily newspaper | `c75c49d757dd6596402c12938b094c1423e98fbb1f33dd183ba3108016c591dc` | `d8e342400a698a6b4f4fb7a480848a122b101181d61eb5cf1c72796191843eed` | `834792ed8fee2c6ea76c939af6c90bc632ddcc87b701175a5f6ef5cc7cded7c4` | Lead story remains dominant. Four desks remain a compact rail on desktop and an explicitly labelled swipe row on mobile. The Career headline and opening are visible and distinct from Paige's AI tip. |
| Full article | `08deeaa0b47ecf3ded0ad124defa6c898042f696994fee84612864de1042841a` | `6f03b14831ca4c073c48e603a25aff4800488837fec5eefa362f5f002dd9b936` | `1661587cc25cca1d3c54c3a6850798a6dda98f842149742d36d1adb5d7724f1c` | Six-section explanation stays readable and ordered; headings, evidence limits, work/home examples, action and sources are present without clipping or false column recomposition. |

Observed at all three widths:

- no horizontal page overflow, text collision, clipped story copy or broken image;
- no four-card vertical mobile stack; the partial next card and `Swipe for all four`
  label visibly communicate horizontal continuation;
- the private-preview banner is clearly labelled and remains outside the public
  source. In element-cropped newspaper images its sticky placement overlaps the
  crop's top edge, but the complete-page captures preserve the actual page
  hierarchy. This is a preview-capture constraint, not a production UI element;
- the 320-pixel page is dense but does not lose a control, desk or explanatory
  section;
- the Career desk is the compact rail's density ceiling. Additional copy would
  be a blocking regression.

## Maker boundary

No visible objective or known defect was found in these exact deployed pixels.
This maker inspection does not admit the package, approve its editorial choices,
authorize production promotion or establish public truth. A role-distinct judge
must inspect the same nine SHA-bound images before Ali sees the direction.
