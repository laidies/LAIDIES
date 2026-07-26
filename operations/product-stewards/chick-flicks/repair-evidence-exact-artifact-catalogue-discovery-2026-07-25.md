# Chick Flicks P0 exact-artifact repair evidence

**Maker status:** REPAIRED LOCALLY — READY FOR INDEPENDENT RE-JUDGE.  
**Prior judge verdict:** FAIL — bounded P0 repair required.  
**Authority:** no release, deploy, publication, owner-visual or media approval.

## Exact repair candidate

- Artifact: `/tmp/laidies-chick-flicks-repair2.iScgNR`
- Builder report: 1,076 public files plus `build-report.json`; 961.34 MiB
- Observed apparent bytes including report: 1,008,033,061
- Builder advisory: still above 750 MiB

| File | Source/artifact SHA-256 |
|---|---|
| `chick-flicks.html` | `b1c83c4ef4085cf61c6ff0471455936744bd4bfccbf3a3c814bd098553e55e26` |
| `content/chick-flicks.css` | `f8565a5ee7128afef3a6beccbf7c998858ccb4fa9d6d14bfc225e70ea4490338` |
| `content/episode-index.json` | `52f0d24e7a9ab4aa6d44164864a7f101c04fe2d8652158c646e4fefec52a240a` |
| `index.html` | `3133089a5b15b7c8d772a6bddb9ee0cf285123a3c80561cc743cca17d800974c` |
| `content/site/sunnyvaile-directory.js` | `12661e58bc52646b16002ecbe34e739588c559a3c698eb45bdb18fbbf02195be` |
| `content/site/sv-tour-checkin.js` | `d43d331f8bc52053ede1de1fc502ba4ce1c28c3eb6b52857f2a244562a8ce52c` |
| `content/site/sv-welcome-tour.js` | `20f00850a4d6cdd460a9e5bdd36ce43c9bd897af6c94ddacd393a19756c0ee7e` |
| `issues/issue-trailer.html` | `a4163288535e2fec8a882bf92ab81afd1e38e5e1382626d90b06165f3b86a339` |

Test SHA-256:

- contract: `8e6c63355c1a26f8f7bff026f4a4202a0cf3bdf08b8d7984b8b8d50053ad3551`
- browser: `3eab3e4a665cc6bc2f89c52bf82682fba6c27677147c7fdfedb89235c0ca22a9`

## Judge P0 closure evidence

1. **Authoritative whole catalogue:** All tapes now derives from every
   validated record. Topic mappings remain curated; any new number absent from
   them appears in visible **Unfiled**. Added EP06 became latest and appeared
   on both All tapes and Unfiled. Removed EP02 disappeared; renumbered EP08
   appeared without changing page code.
2. **Explicit statuses:** only `published` is eligible for rentability and only
   `draft` means forthcoming. Cancelled, removed, held, unknown and missing
   statuses rendered unavailable and made no coming-soon promise.
3. **Bounded requests:** the index and every destination request use
   `AbortController` with a documented five-second deadline. Delayed index and
   destination fixtures failed closed into the visible retry state.
4. **Recovery focus:** activating Retry focuses the live loading heading. A
   failed attempt returns focus to visible Retry; success focuses the restored
   latest action, or the heading when no release exists.
5. **Freshness fan-out:** named homepage, directory, welcome tour, tour
   check-in and trailer-issue entries now say released/latest released rather
   than making an unsupported weekly claim. The trailer remains an
   illustrated, captioned listen-along. A direct truthful trailer-issue link
   also caused the exact dependency crawl to include that previously omitted
   dynamic destination.

## Verification

| Gate | Result |
|---|---|
| Contract | PASS — 11 checks |
| Source browser | PASS — 22 journeys |
| Exact-artifact browser | PASS — 22 journeys |
| Inline JavaScript | PASS — 353 scripts / 132 pages |
| Town integrity | PASS |
| Local links | PASS — 1,941 references / 110 pages |
| Product steward system | PASS — 65 products, 3/3 active |
| Public metadata | PASS |
| Scoped diff check | PASS |

The six added browser journeys cover added, removed and renumbered index
records; explicit hostile/missing statuses; delayed index timeout; delayed
destination timeout and recovery focus; and exact-artifact shared-copy
fan-out. All sixteen original journeys continue to pass.

## Deliberate holds

- Trailer and Episodes 1–4 motion films remain **HOLD**.
- Current `candidate-v1` room/rental-card visuals still require Ali/Brand owner
  approval.
- Human comprehension, actual 200% browser zoom, Safari/VoiceOver, independent
  contrast, public-origin, analytics/privacy and field-performance evidence
  remain outside this bounded local repair.
- The Screening Room dossier is still absent.
- The artifact-size advisory remains for the release owner.
