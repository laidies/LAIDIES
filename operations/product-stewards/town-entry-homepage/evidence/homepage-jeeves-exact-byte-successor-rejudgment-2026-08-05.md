# Homepage Miss Jeeves exact-byte successor — independent rejudgment

Date: 2026-08-05 America/Vancouver  
Verdict: **ACCEPT — BOUNDED REPAIRED SUCCESSOR ONLY**  
Scope: only the one Homepage Miss Jeeves image and the adjacent Homepage →
LIBRAiRY question handoff. This is not a whole-Homepage, LIBRAiRY, registry,
release, deployment, publication or public-origin ruling.

## Decision

The repaired exact tuple is accepted for the same one previously admitted job.
The decision-changing defect in the first successor is gone: current source has
one form `submit` listener, in `content/site/homepage.js`, and no competing
inline listener. That listener prevents default navigation, trims the input,
keeps blank and whitespace-only submissions on the Homepage while focusing
`#lookup`, and transfers a non-empty question through the bounded URL-fragment
contract.

The repaired browser regression exercises all three cases. It stays on
`/index.html#reference` and focuses `#lookup` for both blank and whitespace-only
submissions. For a non-empty question it reaches `/library.html#miss-jeeves`,
retains the question in `#jv-q`, removes the raw question from the visible URL
and renders the direct answer. This closes the sole blocker in the earlier
independent `HOLD`; that earlier judgment remains correct for its old hashes.

## Exact tuple accepted

| Artifact | SHA-256 | Judgment |
| --- | --- | --- |
| `index.html` | `7504d370e274ddc74fabec91db5e9f25f9c34fc0cb0a8bab6bd2e7b583657fbb` | Repaired exact Homepage |
| `library.html` | `2a30520ebb6fbffc21069e72b726f8691380c740ed8b6b30ab11dc071f4c6a43` | Exact receiver |
| `content/site/homepage.js` | `a04405f68387f3e2c7cd5335ceae98bbf0f63614a6b62aef1095565fdebed36c` | Sole submit listener |
| `content/site/puffy-bookmarks.js` | `c66f73109e4c74fd84129d512afc5ddd970f6f4fe6c339bf3ef2e630f6757efe` | Exact receiver dependency |
| `scripts/test-library-product.cjs` | `cc30535c6f91d04cf4ed9be78b6d069ea6e169a196ac20fba57d07f0e33f9452` | Repaired 103-check product test |
| `assets/library/jeeves-scene.webp` | `69edb1f3cacff5ee6d2bfa59bab5bd7f57c27c40267d4adbc5d1ec45818a3943` | Unchanged admitted image byte |
| repaired maker receipt | `7650277096f735a835f7ab7b21dda31fbd5a2610fa11d3dd2988e0dc658e9229` | Exact request rejudged |
| predecessor owner/Brand ruling | `9cf36a0bd2fa4a669ee21a0e953181a7b1cc76b7a7a6ef636bf94f6ecfa49c64` | Narrow image/identity authority retained |

The image remains a regular 307,412-byte WebP, `933 × 1400`, without alpha.

## Independent inspection

- Repository search outside operations, docs, scripts and archives finds one
  production path consumer: the single `<img>` in Homepage `#reference`.
  `library.html` has zero consumers.
- The exact alt remains `Miss Jeeves at the SUNNYVAiLE library reference desk`.
- Direct image inspection preserves the mature Black woman, swept grey
  coiffure, chain glasses, pearl earrings, plum cardigan, cream blouse,
  open-book pin, folded-hands pose, card catalogue, CRT, reference desk and
  `MISS JEEVES` nameplate accepted by the predecessor continuity ruling.
- Current source still applies `object-fit: cover`, `object-position: top` and
  the same responsive one-column treatment. The prior exact-byte visual
  inspection remains applicable because the asset is byte-identical and the
  relevant image markup, alt and crop declarations retain those observed
  values: approximately `518.4 × 750` at `1440 × 1000`, `350 × 520` at
  `390 × 844`, and `280 × 420.1` at `320 × 844`, with no overflow or lost
  identity cues.
- The form remains visibly labelled, has `maxlength="240"`, and its three
  Popular links use the same fragment contract. Fragment placement keeps the
  question out of the HTTP request target; the receiver trims/caps it again,
  replaces the visible URL with `#miss-jeeves`, and owns the search result.
- The current LIBRAiRY test also covers direct-answer, zero-result, loading,
  unavailable/malformed/stale-index error, retry and held-destination states.

No fresh app-attached manual browser session was available during this
rejudgment. That is a stated inspection limitation, not hidden evidence: the
current exact bytes were instead exercised by the repository's Playwright
product test and its separate three-width browser guard. The unchanged exact
image was also inspected directly.

## Exact tests run

1. `node scripts/test-library-product.cjs`
   - Exit `0`
   - `LIBRAiRY PRODUCT PASS`
   - `checks=103`
   - `external_requests_blocked=67`
2. `PLAYWRIGHT_CORE_PATH=.ds-sync/node_modules/playwright-core node scripts/test-homepage-held-assets-browser.mjs`
   - Exit `0`
   - `HOMEPAGE HELD ASSETS BROWSER PASS`
   - `panels=15 viewports=1440,390,320`

The second guard is unchanged at SHA-256
`1b8329242496f7c927abfddf4d3b0f07cb43159d502f99e4fa4aa545b7c1c97a`.
It proves retained controls, one image, keyboard filtering and no overflow or
unexpected image request at the three widths; it is not treated as a
subjective quality review.

## Registry and authority boundary

`operations/assets/active-asset-registry.json` remains SHA-256
`33ff09038e85aa3ebacf1487d971c3269756a17b94534db698cb1781a3acdc4f` and
contains exactly one `ACTIVE` row for `homepage.reference.miss-jeeves` with the
correct asset path/SHA and exclusions. Its admitted scope still names the
predecessor Homepage SHA `12867251...39c2e`, not this accepted repaired
Homepage SHA `7504d370...7fbb`.

Therefore this `ACCEPT` is the independent checksum-bound successor judgment
needed for a later foreground-owned registry/integration rebind; it does not
make the current registry text accurate for the successor and does not itself
authorize packaging, deployment, publication or a public-origin claim. Any
future rebind must name the exact tuple above and preserve the same sole-image,
single-handoff exclusions.

## Not done

No source, asset, registry, manifest, inventory, builder, shared operations,
deployment, publication, credential, dispatcher or public route was changed.
No native Safari/VoiceOver, release, deployment or public-origin claim is made.
