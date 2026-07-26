# Tonight minimum-safe launch candidate v1

**Status:** VERIFIED LOCALLY — INDEPENDENTLY ACCEPTED; RELEASE HANDOFF READY
**Observed:** 2026-07-26T16:27:25-0700 (PDT)
**Baseline:** `c5d72fadc0cc873d1d1bfdabdb79a3aea9c773fb`
**Worktree:** `/tmp/laidies-tonight-release.vqYSC8`
**Artifact:** `/tmp/laidies-tonight-artifact.v1`

## Included

- Exact contextual-return source
  `4490123a7d7ea447a125244ef1453c92c3cfdea32dca7fc86b6b096e57f9dfd3`
  and its exact accepted distribution receipt
  `a6d263d07ca15709362cb479cbc4f9e18a22f2bc9eddf6fef369bcae3c7465da`.
  A clean-baseline-only builder patch applies the same checksum-bound transform
  to all 88 curated HTML artifacts without importing readiness files.
- The exact accepted domain-metadata transform and receipt
  `ad654c1168c2174fad54391165e753c303757bbe36279318cf8f31fa88935a70`,
  re-applied to the clean composite. All 28 sitemap routes have one matching
  canonical and one matching `og:url`; sitemap bytes remain unchanged.
- The canonical public name `Visitor’s Centre`, constrained to current public
  source surfaces. The upstream successor receipt
  `7364bda6028a77302193c605f369a42f9850026d11bb727978d05802d298f694`
  and two-owner closure
  `262f9e0d6d59f7f3c2bd4d307276b5ce57f4c4be0ea65de6a9c8453982e9ec96`
  are preserved. Their later readiness-era route tuple was not imported; the
  clean composite requires new independent acceptance.

## Explicit HOLD / exclusions

The 320px shared-header fix is excluded. Its exact receipt binds Homepage and
Visitor route bytes that do not exist at the clean baseline. Reproducing that
accepted tuple would require forbidden dirty-tree changes. The current source
remains the baseline SHA
`f500707712e100e45d972daada9dc60a7801ced07f6f517ff8c41752d2761d93`,
and consuming routes retain `v=20260715-1`.

No Homepage redesign, new Homepage copy, readiness/current projection,
Pearl Plum/style change, account/economy/provider work, Library or Visitor
redesign, social/content update or media change is included.

## Tests

```text
SITEWIDE CONTEXT NAVIGATION PASS scenarios=4 mobile_touch_target=PASS
TONIGHT MINIMUM SAFE RELEASE PASS routes=28 html=88 nav_mounts=88 header=EXCLUDED unexpected=0
```

The release gate also proves the current Homepage is exactly its clean baseline
plus two canonical-name substitutions and its canonical/`og:url` tags. It
rejects any unexpected changed path, readiness/provider/media/style lane, nav
duplicate, metadata duplicate/mismatch, stale public building name or header
version change.

No deploy, commit, provider/cache mutation, credential access or public-origin
claim was performed.

## Independent acceptance

The independent reviewer reran the exact composite test, then served and
browser-tested artifact root
`3cd5f0b6be865c978b916d072fefb0c2c1294fedca608c36df8fd8d00e2c0221`
at `390×844` and `1440×900`. Direct-entry home fallback, internal return,
canonical/name metadata, touch geometry, overflow and broken-image checks
passed. The exact durable receipt is `INDEPENDENT-ACCEPTANCE.md`, SHA-256
`a0703d0fcb6180e204803159e8fc1837b1d8764597cd3ceafe31d3ada9738d36`.

This acceptance authorizes clean commit/release handoff only. Deployment and
public verification remain separate.

## Learning scan

The recovery-freeze incident reinforces the existing prevention rule that a
receipt accepted against one route tuple cannot authorize a different
composite. The header was therefore excluded rather than “safely” transplanted.
This is already covered by the baseline-provenance and exact-artifact rules in
the canonical painpoints ledger; no dirty-tree learning file was mutated.
