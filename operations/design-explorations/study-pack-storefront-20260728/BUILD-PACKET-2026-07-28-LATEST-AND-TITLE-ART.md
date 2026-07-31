# Study Pack storefront repair — build packet

**Status:** IMPLEMENTING LOCALLY  
**Trigger:** Ali reported that Episode 04 did not read clearly enough as the
current week, the episode selectors were oversized, and the artwork did not
match the episode title images.

## Intended outcome

- Episode 04 says `LATEST` and `THIS WEEK` before the learner opens it.
- The latest selector is prominent without dominating the page.
- Episodes 01–03 remain visible together in a compact grid.
- All four selectors and their pack heroes use the exact canonical episode
  title-card artwork.

## Source bindings

| Episode | Canonical title-card source | Prototype destination |
|---|---|---|
| 01 | `assets/episodes/ep-01/pixel/ep01-title-card-comic-v2.png` | `prototype/public/assets/episodes/episode-01.png` |
| 02 | `assets/episodes/ep-02/comic/ep02-title-card-comic-v2.png` | `prototype/public/assets/episodes/episode-02.png` |
| 03 | `assets/episodes/ep-03/comic/ep03-title-card-comic-v2.png` | `prototype/public/assets/episodes/episode-03.png` |
| 04 | `assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png` | `prototype/public/assets/episodes/episode-04.png` |

## Acceptance

- Desktop and mobile show Episode 04 as the latest/current week without relying
  on position alone.
- Exact title art is visible without a tint layer or UI badge obscuring it.
- The first three episode cards are materially shorter than the previous
  500-pixel selectors.
- Every card remains one full clickable control with visible focus.
- Opening an episode still shows the correct three-item pack page.
- Production build, worker tests, browser console and overflow checks pass.

## Boundaries

- Local prototype only; no deployment or public-state claim.
- No pack-content, status, route, Closet or account-contract changes.
- Rollback is the previous `App.jsx`, `styles.css` and prototype episode assets.
