# Visitor's Centre relaunch P0 build packet

**Status:** BUILT LOCALLY — awaiting independent judgment

## Trigger and problem

The relaunch gate requires a newcomer to understand the Visitor's Centre and recover without map memory, working media, storage or a downstream account. Existing mechanics passed selected interactions but the initial destination CTA was live before a choice, reveal focus was behind the directory in DOM order, a map failure could be silent, and optional media/tour copy carried held or stale promises.

## Intended outcome

A clean visitor can identify the room as the town front desk, select one of 17 canonical destinations by map or name, hear/see one atomic result, focus its exact route, close with Escape/Back to the initiating control, and retain useful named routes when map or directory data fails. Trailer, tour and postcard controls name only their next observable handoff.

## Work and craft owners

- Product/UX + frontend maker: `visitors-centre.html`.
- Shared Welcome Tour truth repair: `content/site/sv-welcome-tour.js`.
- Quality automation: `scripts/test-visitors-centre-contract.mjs`, `scripts/test-visitors-centre-browser.mjs`.
- Independent judge: separate product, trust/brand, accessibility/UX and technical rejudge; maker may not approve.

## Dependencies and boundaries

`SV_BUILDINGS` remains the shared 17-destination data source. No directory canon, destination product, postcard provider, account/reward system, analytics, external service or production state is changed. The room artwork is not changed and still requires Ali's visual ruling.

## Acceptance evidence

1. Source contract checks front-desk comprehension, 17 destinations, closed-until-valid reveal, focus recovery, named fallbacks, held-media removal and downstream-lifecycle truth.
2. Rendered Chrome checks clean arrival, directory/map parity, correct routes, Escape/Back focus, directory failure, map failure including early image-error race, blocked storage, 390px reflow and reduced motion.
3. Curated exact artifact reproduces the rendered suite and source-artifact hashes match for governed runtime files.
4. Independent judge scores product quality, accuracy/trust and LAiDIES contribution at least 17/20 each.

## Release, measurement and rollback

No release authority. Owner visual, human comprehension, Safari/VoiceOver/native zoom, approved privacy-safe analytics and public-origin checks remain held. Rollback is the exact governed source files; no migration or durable user data exists.
