# Town Entry verifier handoff — Cycle 5 Homepage challenger

**Status:** `SUPERSEDED — CYCLE 5 REJECTED / STALE`  
**Evidence time:** `2026-07-26T15:29:27-07:00`  
**Acceptance owner:** Town Entry / Homepage consumer verifier

> Town Entry's PASS remains true for the exact bytes it tested but has no
> current admission authority. Ali withdrew Cycle 5 in full: the supposed
> incumbent was contaminated by an unapproved readiness integration and the
> challenger inherited and amplified that failure. Do not present, integrate
> or propagate either option.

## Exact candidate

- URL path:
  `/operations/design-explorations/sitewide-style-championship-20260726/cycle-5/homepage-incumbent-plus/index.html`
- Local URL with the repository served on port 4177:
  `http://127.0.0.1:4177/operations/design-explorations/sitewide-style-championship-20260726/cycle-5/homepage-incumbent-plus/index.html`
- Incumbent source SHA-256:
  `d09d2acb6f8bcb54873de5009b75fea3551c81124ff925e55a9c2eb68a671189`
- Candidate loader SHA-256:
  `b183f8c312c3c27eca0ca6847c31185699c2731b7ba39d3634523307b0873f4b`
- Candidate CSS SHA-256:
  `dd62540a8e8c6370a16804ebf5af88a383de93f075bc8fb83da10dfa2541fcb6`
- Candidate runtime SHA-256:
  `c201dcda2767c5aae3419ff095f8cf3d280ba7b3cd1d8faf9bb6e9c8d2de0bc3`
- Binding manifest SHA-256:
  `a4b738d5ae7db9421bcc8b983017163e522e663ef89469376aa81c45b42b9551`

## Exact successor delta

Town Entry's sealed HOLD
`97a1ba1026589fcc44a4925881a0501c986901abcf6f79e98d59e405dc7452eb`
identified one canonical-name defect. The successor changes only the map
hotspot's `data-name` and `aria-label` from `Visitor Centre` to
`Visitor’s Centre`. No visible copy, pixels, layout, composition, destination
or live-route bytes changed.

- Desktop diagnostic SHA-256:
  `8e50ca2ed31c603e22de146c29f42b59e00d15bddc2879cfe367d758fffa4c91`
- Mobile diagnostic SHA-256:
  `bbd97962574b2ca31bbab75f54f327235b8b51590183990beed907be5fb13eb7`

Both diagnostics record `Visitor’s Centre` for the hotspot's `dataName` and
`ariaLabel`.

## Independent successor verdict

Town Entry independently reproduced both renders and returned `PASS`.

- Verdict:
  `evidence/town-entry-verifier-successor-2026-07-26/VERDICT.md`
- Verdict SHA-256:
  `23ce16036bdd9dcda1296a9b83253256fe4be2f2201862a375e44ae6a2143f3a`

This exact tuple is eligible for the bounded incumbent-versus-challenger Ali
comparison. It remains local and unpropagated.

## Required browser verification

1. Open the exact URL at `1440×900` and `390×844`.
2. Confirm the loader does not show its checksum-mismatch hold.
3. Compare the topbar, masthead, hero asset, hero copy and hero actions with
   the incumbent at the same viewport.
4. Scroll the complete page and verify method, season, compact six-route
   status ledger, activities, Miss Jeeves lookup, map hotspots, Closet,
   Postcard and footer.
5. Verify the mobile menu, section links, filters and visible action links do
   not lose their destination or overflow.
6. Confirm there is no visible repeated masthead, rejected FAiRY scene,
   Dream Phone building image, NewsStand building image, district-card wall or
   cream page band.
7. Recompute the render hashes or produce verifier-owned exact screenshots and
   return `PASS` or `HOLD` with literal evidence.

Expected reference renders:

- Desktop SHA-256:
  `c96db1b093dfa4ed5c4a883817b4a13c70443f337dc36a28ceb1712d57c3a92b`
- Mobile SHA-256:
  `d8c28f549f58d0d9aa883f358e8f691721f26347fd17c539fd190da71fdb0c67`

Blind review is `19/19/19/18/19`; red team and image/canon are PASS. Town
Entry's job is independent consumer/browser verification, not style approval.
If PASS, return the verifier evidence to Brand for one bounded Ali comparison.
Do not edit the live route, deploy or propagate this candidate.
