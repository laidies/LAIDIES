# Chick Flicks exact-artifact catalogue/discovery build packet

**Status:** REPAIRED LOCALLY — READY FOR INDEPENDENT RE-JUDGE. The first
candidate failed independent review; the bounded P0 repair is documented in
`repair-evidence-exact-artifact-catalogue-discovery-2026-07-25.md`. This is not
release, public-origin, media-craft or owner-visual approval.

## Trigger and bounded outcome

Trigger: `EXACT_ARTIFACT_CATALOGUE_AND_DISCOVERY_TEST`.

The candidate makes Chick Flicks a fail-closed episode catalogue. A tape is
rentable only when its index record is valid, published, points to a safe local
issue URL and that destination exists. The storefront describes the highest
rentable episode as **latest released**, never invents “this week” freshness,
keeps favourite/last-rental state device-only, focuses the selected result,
recovers from catalogue failure, tolerates a broken cover and labels the trailer
as an illustrated, captioned listen-along.

## Files in the candidate

- `chick-flicks.html` — catalogue state, validation, focus, recovery and honest
  product/media/storage language
- `content/chick-flicks.css` — bounded reflow, visible hidden-state semantics,
  broken-cover fallback, 44px primary controls and reduced motion
- `scripts/test-chick-flicks-contract.mjs` — ten source/data contract checks
- `scripts/test-chick-flicks-browser.mjs` — sixteen source/exact-artifact
  journeys
- Chick Flicks `OPERATING-SPEC.md`, backlog, state and maker evidence

The episode index, issue pages, episode-box artwork and media files were tested
but not changed by this packet.

## Required independent roles

1. Product/accuracy judge: verify release-state, latest, handoff and
   device-local claims against the exact artifact.
2. UX/accessibility judge: rerun deterministic journeys, then complete
   Safari/VoiceOver, contrast and real public-origin checks.
3. Brand/owner: decide whether the current `candidate-v1` room and rental-card
   visuals are acceptable. Technical inclusion is not approval.
4. Episode Experience/Platform: own the unresolved cross-product freshness
   contract.
5. Episode Media Quality: retain the trailer and Episodes 1–4 motion-film HOLD.

## Release and rollback

Do not publish this packet by itself. A final release owner must rebuild the
candidate from the authoritative release commit, repeat the contract/browser
and global gates, obtain the separate approvals above, deploy through the
normal release path and verify the public origin. If the catalogue fails, keep
or restore the last verified storefront and never make unavailable media
rentable merely to fill the wall.
