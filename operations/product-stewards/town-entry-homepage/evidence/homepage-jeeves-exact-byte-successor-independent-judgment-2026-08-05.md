# Homepage Miss Jeeves exact-byte successor — independent judgment

Date: 2026-08-05 America/Vancouver  
Verdict: **HOLD**  
Scope: only the one Homepage Miss Jeeves image and the adjacent Homepage →
LIBRAiRY question handoff. This is not a whole-Homepage, LIBRAiRY, registry,
release, deployment, publication or public-origin ruling.

## Decision-changing blocker

The current Homepage has two `submit` listeners on the same form. The older
listener in `content/site/homepage.js:98-103` always executes
`window.location.href = '/library.html'`. The later inline listener in
`index.html:762-770` implements the bounded fragment transfer and correctly
stops on a blank query, but it cannot cancel the navigation already scheduled
by the earlier listener.

Two fresh read-only local-browser reproductions submitted a visibly empty
`#homepage-jeeves-form`. Both navigated from the exact successor Homepage to
`/library.html`; neither stayed in place nor focused `#lookup`. This violates
the maker's required blank/focus state and the Town Entry failure/recovery
contract. The asset/job therefore cannot receive `ACCEPT` on the current exact
Homepage.

The non-empty path does work: submitting `what is a hallucination?` reached
`/library.html#miss-jeeves`, the receiver removed the raw question from the
visible URL, retained it in `#jv-q`, and rendered the direct hallucination
answer. That partial success does not compensate for the blank-state failure.

## Exact tuple inspected

| Artifact | SHA-256 | Judgment |
| --- | --- | --- |
| `index.html` | `32ed32b988121b788210c323fb7e7e080bdb5b16649293fed660f0d45ed81e54` | Exact maker successor; changed from predecessor ruled Homepage `12867251...39c2e` |
| `library.html` | `2a30520ebb6fbffc21069e72b726f8691380c740ed8b6b30ab11dc071f4c6a43` | Exact maker receiver |
| `content/site/puffy-bookmarks.js` | `c66f73109e4c74fd84129d512afc5ddd970f6f4fe6c339bf3ef2e630f6757efe` | Exact maker dependency |
| `scripts/test-library-product.cjs` | `5beb2bcae96fd8e3af170b01c1af5c5f45b434315dbabbb0929a6a5c7bb98b53` | Exact maker test |
| `scripts/test-homepage-held-assets-browser.mjs` | `1b8329242496f7c927abfddf4d3b0f07cb43159d502f99e4fa4aa545b7c1c97a` | Exact inspected Homepage test |
| `assets/library/jeeves-scene.webp` | `69edb1f3cacff5ee6d2bfa59bab5bd7f57c27c40267d4adbc5d1ec45818a3943` | Unchanged admitted image byte |
| predecessor owner/Brand ruling | `9cf36a0bd2fa4a669ee21a0e953181a7b1cc76b7a7a6ef636bf94f6ecfa49c64` | Exact maker predecessor authority |
| `operations/assets/active-asset-registry.json` | `33ff09038e85aa3ebacf1487d971c3269756a17b94534db698cb1781a3acdc4f` | One ACTIVE row, still bound to predecessor Homepage hash |

The image is a regular 307,412-byte WebP, `933 × 1400`, without alpha.

## Unchanged ruled slice

- Repository search outside operations, docs, scripts and archives found
  exactly one production path consumer: the single `<img>` in Homepage
  `#reference` at current `index.html:660`. `library.html` has zero consumers.
- The exact alt remains `Miss Jeeves at the SUNNYVAiLE library reference
  desk`.
- Direct comparison with the approved continuity reference preserves the same
  mature Black woman, swept grey coiffure, chain glasses, pearl earrings,
  plum cardigan, cream blouse, open-book pin, folded-hands pose, card
  catalogue, CRT, reference desk and `MISS JEEVES` nameplate. Identity passes.
- The image is still one necessary visual job beside one labelled live lookup
  surface. No second image job or general character-library use appeared.
- The form retains `maxlength="240"`; its non-empty transfer encodes and caps
  the question in a URL fragment. The Library normalizes it, strips the raw
  query from the visible URL, and supplies loading, direct-answer, zero-result,
  stale/malformed-index error, retry and held-destination states.

## Responsive visual inspection

The actual current page and exact image were inspected, not the maker prose.
All three widths loaded the `933 × 1400` source, used `object-fit: cover` and
`object-position: 50% 0%`, retained the exact alt and had zero document
overflow.

| Viewport | Rendered image box | Visual judgment |
| --- | --- | --- |
| `1440 × 1000` | approximately `518.4 × 750` | PASS: face, chain glasses, cardigan/book pin, folded hands, lamp, catalogue, CRT and nameplate remain clear beside the full form |
| `390 × 844` | `350 × 520` | PASS: top-centred crop preserves face, identity, desk context, folded hands, CRT and nameplate; form stacks below |
| `320 × 844` | approximately `280 × 420.1` | PASS: narrower crop remains recognisable and professionally composed; the 240px input/button stack and three Popular controls fit without overflow |

The changed whole-Homepage byte did not degrade the admitted image, crop,
identity, alt or sole-consumer boundary. HOLD is caused by the changed/current
handoff behavior, not by the unchanged ruled image slice.

## Exact tests run

1. `node scripts/test-library-product.cjs`
   - Exit `0`
   - `LIBRAiRY PRODUCT PASS`
   - `checks=101`
   - `external_requests_blocked=67`
2. `PLAYWRIGHT_CORE_PATH=.ds-sync/node_modules/playwright-core node scripts/test-homepage-held-assets-browser.mjs`
   - Exit `0`
   - `HOMEPAGE HELD ASSETS BROWSER PASS`
   - `panels=15 viewports=1440,390,320`

These passes remain useful but are not sufficient for `ACCEPT`. The Homepage
held-assets test checks presence, one image, controls, keyboard filtering and
overflow; it does not submit the Jeeves form. The Library product test covers
the non-empty Homepage transfer and the Library receiver/error states, but it
does not exercise the Homepage blank submission. The direct visitor-boundary
check above exposed the untested failure.

## Registry and authority boundary

The registry contains exactly one `ACTIVE` row for
`homepage.reference.miss-jeeves`, with the correct image path/SHA and the
original narrow exclusions. It still names predecessor Homepage SHA
`12867251...39c2e`, not successor SHA `32ed32b9...e54`. Therefore the registry
must not be represented as current successor authority. No registry mutation
is authorized by this judgment.

This HOLD does not revoke the predecessor's exact image/identity/Brand ruling,
broaden the asset, reject the current LIBRAiRY receiver, or judge the whole
Homepage. A successor can be re-judged after the competing legacy listener is
removed or otherwise reconciled, a regression check proves both blank and
non-empty submissions, and any eventual registry rebind names the exact then-
current Homepage SHA while preserving the same narrow scope.

## Not done

No source, asset, registry, manifest, inventory, builder, deployment,
publication, credential, dispatcher, control-room or public route was changed.
No native Safari/VoiceOver, release, deployment or public-origin claim is made.
