# Audience & Growth independent domain-metadata successor review

**Status:** `ACCEPT — LOCAL ACQUISITION/SEARCH/SOCIAL METADATA SCOPE ONLY;
PUBLIC RELEASE HOLD`  
**Evidence time:** `2026-07-26T15:34:51-07:00`  
**Audience owner task:** `019f9f7f-9fad-7d73-84fa-ba6f37e6ade1`  
**Candidate:** `LAIDIES-DOMAIN-METADATA-2026-07-26-v1`

## Exact verdict

Audience & Growth independently `ACCEPTS` the exact Platform successor for the
repository-local acquisition, search-canonical and social-URL metadata scope.
The acceptance means only:

- all 28 sitemap routes contain exactly one canonical link equal to their
  `https://laidies.ai` sitemap URL;
- all 28 contain exactly one `og:url` equal to the same URL;
- the source and curated 28-route artifact pass the same equality contract;
- the sitemap bytes and ordered route corpus are unchanged;
- each successor reverses to the exact sealed predecessor and reapplies to the
  exact successor, proving the bounded source-only metadata delta; and
- stale or tampered candidate, output corpus, route, sitemap and predecessor
  evidence fails the checksum contract.

This does not prove that search engines or social platforms have fetched,
indexed, recached or displayed these bytes. It does not establish attribution,
traffic, ranking, reach or campaign performance.

## Checksum-bound inputs

| Evidence | SHA-256 |
|---|---|
| `operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-successor-v1.json` | `ad654c1168c2174fad54391165e753c303757bbe36279318cf8f31fa88935a70` |
| successor payload, sorted JSON v1 | `1e7d887854f25236af3f98fabc01d64f9669631318474161e18d1c6af440659f` |
| `operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-successor-v1-output.json` | `2d6ce3cf36b65d2740a9dd154d2f8e823f76c1fdc5c10d82085c41fb78f708b5` |
| ordered 28-route output corpus | `f632f8142fdf4a5e9c51825d237d9762a1ca638c5cf1b7d5b92b92abb0fba50a` |
| `operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-predecessor-v1.json` | `7a24033314f00ab812e2795aa1882d2deadcaed96891ba4b8bd20896f9059ff4` |
| Platform authority receipt | `93361a7a42a4fb7de63f5b1f0120e6e63557529b419b2c92583825b56409cb99` |
| unchanged `sitemap.xml` | `accbb51c209f26c027d9bfd4ecb64886bdef515114e056c041acd7d0bfd56fa0` |

All values recomputed from current bytes and matched.

## Exact ordered route corpus

The ordered sitemap, predecessor manifest and sealed output agree on these 28
URL/file pairs:

| # | Public URL | Source file |
|---:|---|---|
| 1 | `https://laidies.ai/` | `index.html` |
| 2 | `https://laidies.ai/visitors-centre` | `visitors-centre.html` |
| 3 | `https://laidies.ai/library` | `library.html` |
| 4 | `https://laidies.ai/handbook` | `handbook.html` |
| 5 | `https://laidies.ai/chick-flicks` | `chick-flicks.html` |
| 6 | `https://laidies.ai/watch` | `watch.html` |
| 7 | `https://laidies.ai/issues/issue-01` | `issues/issue-01.html` |
| 8 | `https://laidies.ai/issues/issue-02` | `issues/issue-02.html` |
| 9 | `https://laidies.ai/issues/issue-03` | `issues/issue-03.html` |
| 10 | `https://laidies.ai/issues/issue-04` | `issues/issue-04.html` |
| 11 | `https://laidies.ai/newsstand` | `newsstand.html` |
| 12 | `https://laidies.ai/radio` | `radio.html` |
| 13 | `https://laidies.ai/sunnyvaile-high` | `sunnyvaile-high.html` |
| 14 | `https://laidies.ai/mall` | `mall.html` |
| 15 | `https://laidies.ai/luminairy` | `luminairy.html` |
| 16 | `https://laidies.ai/community` | `community.html` |
| 17 | `https://laidies.ai/sorority-house` | `sorority-house.html` |
| 18 | `https://laidies.ai/post-office` | `post-office.html` |
| 19 | `https://laidies.ai/resident-card` | `resident-card.html` |
| 20 | `https://laidies.ai/town-hall` | `town-hall.html` |
| 21 | `https://laidies.ai/maikeover` | `maikeover.html` |
| 22 | `https://laidies.ai/games/dream-phone` | `games/dream-phone.html` |
| 23 | `https://laidies.ai/games/fairy-godmother` | `games/fairy-godmother.html` |
| 24 | `https://laidies.ai/games/girl-talk` | `games/girl-talk.html` |
| 25 | `https://laidies.ai/games/madame-claio` | `games/madame-claio.html` |
| 26 | `https://laidies.ai/games/dj-booth` | `games/dj-booth.html` |
| 27 | `https://laidies.ai/games/fun-pack` | `games/fun-pack.html` |
| 28 | `https://laidies.ai/games/trading-cards` | `games/trading-cards.html` |

The predecessor-to-successor characterization is:

- canonical missing: `26 → 0`;
- canonical mismatched: `1 → 0`;
- `og:url` missing: `26 → 0`;
- `og:url` mismatched: `1 → 0`;
- canonical exact after: `28/28`;
- `og:url` exact after: `28/28`; and
- legacy-domain value in accepted canonical/`og:url` tags: `0/28`.

## Independent verification

The Audience reviewer ran:

1. `node
   operations/product-stewards/platform-reliability/domain-transition/v1/test-domain-metadata-successor-v1.mjs`
   → `PASS`, routes `28`, canonical `28`, `og:url` `28`, unchanged sitemap,
   curated artifacts `28`, rollback `28`, invalid inputs rejected `2`, corpus
   SHA `f632f814…ba50a`;
2. `node
   operations/product-stewards/platform-reliability/domain-transition/v1/test-domain-metadata-successor-receipt-v1.mjs`
   → `PASS`, eight bound files and 28 current route hashes exact, release
   `false`;
3. `node
   operations/product-stewards/platform-reliability/domain-transition/v1/test-domain-transition-local-readiness-v1.mjs
   --gate`
   → `PASS`, sitemap `28`, all missing/mismatch counts `0`, mutation `false`;
   and
4. a separate read-only Audience probe → `PASS`, ordered sitemap/output
   corpus `28`, metadata-only inverse/reapply `28`, exact rollback `28`,
   successor bytes `28`, no legacy canonical/social URL `28`, and five
   negative probes rejected.

Negative probes changed evidence in memory only and were rejected:

- candidate payload tamper;
- output corpus tamper;
- route-byte tamper;
- sitemap-byte tamper; and
- stale predecessor manifest.

The repository contained concurrent non-metadata changes owned by other lanes,
so Git baseline diff was not used to infer candidate scope. Exact predecessor
hash recovery plus inverse/reapply equality is the scope proof.

## Holds and authority ceiling

The following remain `HOLD` or `UNKNOWN`:

- deployment and exact public-origin metadata bytes;
- provider redirect rule export, rollback and the full historical-route
  corpus;
- native search/social crawler rendering and cache refresh;
- search-engine indexing, cache-decay monitoring and Search Console evidence;
- social preview recache/display on each authorized channel;
- privacy-safe attribution beyond observed query preservation;
- legacy Worker CORS retirement; and
- any campaign, account, publisher, spend, release or Ali public approval.

No Platform source, route, sitemap, provider, cache, search-console, analytics,
CORS or public state was changed during this independent review.

## Acquisition implication and next trigger

The prior repository-local canonical/`og:url` gap is closed for the exact
successor. General acquisition profiles may continue to target
`https://laidies.ai/`, and source-specific campaign objects may target an
individually admitted route, but neither becomes publishable because of local
metadata alone.

Next trigger: the release owner binds this exact 28-route successor into a
deployment candidate and returns public-origin bytes plus search/social cache
and provider-continuity evidence. Audience & Growth then verifies the canonical
landing identity visible to acquisition channels without claiming performance.

## Learning scan

`BTB-177` records a review-process failure: a diagnostic search pattern with
Markdown backticks was passed through a double-quoted shell command and zsh
attempted command substitution. No product evidence or public state changed.
The prevention rule now requires literal single-quoted search arguments or
non-shell argument passing for substitution-capable characters. The product
result itself reused existing checksum, source-only inverse/rollback and
stale-evidence controls without a new metadata failure.
