# Building recovery inventory — 2026-07-27

**Status:** `READ-ONLY CLASSIFICATION / NO RECOVERY MUTATION YET`

Comparison baseline: repository `HEAD`
`c5d72fadc0cc873d1d1bfdabdb79a3aea9c773fb`.

Public-origin inspection now proves that the three rejected Wave 1 candidate
pages were never deployed. The live Library and Blend & Snap pages are `HEAD`
plus the accepted contextual-return/metadata changes. The live Visitor’s Centre
is `HEAD` plus the canonical public-name, metadata and contextual-return
changes. None contains the rejected building-wave composition.

Verified public hashes:

- Library: `56224cf63f76a36c164e8778aa8d78826d9b0c948c1b922a2410cba5d96ffe97`
- Visitor’s Centre:
  `709413eabd567b9aa50f6bb4f5c5623ee8742c9f4a9589f4a0a17dc1d55cd643`
- Blend & Snap:
  `cb40f851d03a494f4c9c6d252d4cf01996ff8c404b821c578617bdcc4839780d`
- SUNNYVAiLE High:
  `9aeaa838f767ffa3a0181043dcb5cba1846332da7f396f02373bc18999be0e6f`
- NewsStand:
  `cdd952c6f0f321cd67ce52024cfb048703ba98734d2ef365027388fd8c01082e`
- Chick Flicks:
  `0e26a360963e71de9fe03103f7c552100cd665d2ef3db64bd1d1ce199e1d82c7`
- Post Office:
  `45589b3fe2aefef3e03a29034514055a2569ab55e40e22acb764ef48d8bf5fc2`
- Town Hall:
  `27e5f3a71dba386d3bb35b69a4d0e70aa32a9ab6035c866276cd04a45571d90f`

The live Visitor hash matches the independently sealed minimum-safe artifact.
Every inspected live building is the clean-head page plus only the minimum-safe
metadata, canonical-name and contextual-return changes. None contains a
building-wave visual candidate.

## Rejected isolated work

`operations/design-explorations/building-wave-1/`,
`building-wave-2/`, and `building-wave-3/` are untracked isolated candidate
folders. They were not copied into the production building routes. Ali rejected
the full batch. They are `REJECT / DO NOT INTEGRATE`.

## Production-route dirty changes

| Production route | Dirty-tree scope versus HEAD | Recovery classification |
|---|---|---|
| `chick-flicks.html` | canonical and `og:url` metadata only | `KEEP CANDIDATE`, pending public-origin parity |
| `newsstand.html` | canonical and `og:url` metadata only | `KEEP CANDIDATE`, pending public-origin parity |
| `post-office.html` | canonical and `og:url` metadata only | `KEEP CANDIDATE`, pending public-origin parity |
| `sunnyvaile-high.html` | canonical and `og:url` metadata only | `KEEP CANDIDATE`, pending public-origin parity |
| `town-hall.html` | canonical/`og:url` plus locked Visitor’s Centre name | `KEEP CANDIDATE`, pending public-origin parity |
| `blend-snap.html` | invalid saved drink/pack cleanup and latest-request-wins cancellation; no visual composition change | `KEEP CANDIDATE`, pending exact reliability rerun |
| `library.html` | fail-closed book admission, artifact/version verification, Miss Jeeves index validation/retry, safe rendering, reduced motion and metadata; no Wave 1 candidate composition entered | `KEEP CANDIDATE`, but rerun exact real-page tests and confirm removed-book inventory |
| `visitors-centre.html` | large naming, shared-header, readiness projection, directory and content change beyond the deployed minimum-safe page | `UNVERIFIED / HOLD`; the live minimum-safe page is the recovery baseline, and the dirty rewrite must not be promoted |

## Current recovery rule

Do not revert, commit, deploy, or integrate from the dirty tree. The deployed
minimum-safe pages are the visual/product recovery baseline. Backend reliability
may survive only when it leaves that experience and visual composition
unchanged.
