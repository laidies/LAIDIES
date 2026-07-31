# Town Entry live-route integration evidence

**Evidence time:** 2026-07-26 11:55 PDT (America/Vancouver)  
**Status:** VERIFIED LOCALLY — exact owned route candidate independently ACCEPTED  
**Authority:** bounded Homepage/Start Here live-route integration lock; no deploy or publication authority

## Literal output

The owned Homepage and Start Here routes now consume Platform's immutable
checksum-bound shared readiness v1 envelope through its browser receiver.
They bind the exact expected payload SHA-256 and do not copy destination
descriptions into route code.

The Homepage preserves the independently accepted three-job hierarchy:
Welcome Wagon, fixed previously published Episode 04, and one-answer lookup.
The readiness grid contains six projection-backed destinations. The former
duplicate Episode card is now the distinct Chick Flicks route. Because all
current owner receipt paths in the shared envelope are null, the receiver
admits zero current promotions and the page makes no latest/this-week claim.

Start Here no longer redirects. It is a visible ordinary route with one
receiver-supplied Welcome Wagon status card, one Visitor's Centre link, a
Homepage return, and a no-JavaScript ordinary-link fallback.

## Frozen candidate and dependency hashes

| File | SHA-256 | Ownership |
| --- | --- | --- |
| `index.html` | `c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772` | Town Entry |
| `start-here.html` | `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0` | Town Entry |
| `content/site/homepage.js` | `03156f7901459f16e3b6972ea4752e0b2cd155646102a202e30511bf92fd7433` | Town Entry |
| `content/site/readiness/v1/readiness-runtime-v1.js` | `68eab175cb61065e554ab8ad2fb20eac9b22fc8b38ad9b6d3aa88178e1ea425e` | Platform, consumed read-only |
| `content/site/readiness/v1/entry-readiness-projection.v1.json` | `adce724425984cb67a39ec5f8013e0a6e3dd341e3b40d09e8714b83940e37880` | Platform, consumed read-only |
| Envelope payload binding | `3baba976cf9217b091a92e8fcc762eb6c7b0d5ffe903ebbc7e8f75837bb96361` | Platform, expected by both routes |

## Browser and negative matrix

Command:

```text
NODE_PATH=/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules node operations/product-stewards/town-entry-homepage/evidence/live-route-platform-v1-2026-07-26/test-live-entry-readiness.cjs
```

Result: **PASS, 15 named cases** in real headless Chromium.

- Homepage fresh: three hero actions, six held status-check cards, zero current
  promotions, fixed Episode 04 fallback, projection-backed Chick Flicks, no
  duplicate Episode readiness card and no stale weekly/latest copy.
- First-time, returning/no-Card, device-local Card presentation and
  verified-held presentation: PASS. Device memory is explicitly not identity,
  Card verification, progress or cross-device proof.
- Homepage missing/stale/conflict/tamper: PASS with
  `ENVELOPE_SHAPE_INVALID`, `PROJECTION_STALE`, `IDEMPOTENCY_CONFLICT` and
  `PAYLOAD_HASH_MISMATCH`; six unavailable status-check cards and zero current
  promotions in every failure.
- Start Here fresh plus the same four negative cases: PASS; ordinary Visitor's
  Centre link remains and no redirect occurs.
- Mobile menu Escape closes and returns focus; skip link reaches the focusable
  main landmark; no console/page errors.
- 320px reflow: PASS without horizontal overflow.
- 200% layout equivalent: PASS at 640 CSS pixels for a 1280px viewport. This
  is Chromium layout evidence, not a native Safari zoom or VoiceOver result.
- Human-simulatable contract checks: the rendered UI answers what this is,
  its three next actions, what is current, and what an unavailable route means.
  No real participant comprehension session was performed.

Machine receipt: `live-route-matrix.json`. Render evidence:
`homepage-live-first-desktop-1440.png`,
`homepage-live-returning-mobile-390.png`,
`homepage-live-tamper-mobile-390.png`, and
`start-here-live-desktop-1440.png`.

## Performance and clean artifact

Local Chromium fresh route:

- DOM content loaded: **273 ms**
- load event: **289 ms**
- decoded resource body: **5,154,985 bytes**
- gate: DOM content loaded below 2,500 ms and decoded body below 5 MiB: **PASS**

These are local candidate observations, not public Core Web Vitals.

`node scripts/build-public-site.mjs /tmp/laidies-town-entry-artifact.KFkqxa`
returned **PASS** with 1,088 files, 957.33 MiB, zero missing and zero oversized
dependencies. The builder emitted its existing over-750-MiB warning. The three
owned route hashes and both shared dependency hashes in the artifact exactly
matched the frozen source hashes above. The temporary artifact was deleted
after comparison.

`node --check content/site/homepage.js`: PASS.  
`node --check content/site/readiness/v1/readiness-runtime-v1.js`: PASS.  
`git diff --check` on the owned routes and dossier: PASS.  
Platform shared files were hash-checked only; Town Entry did not rebuild or
edit them.

## Observed versus unproved

Observed: exact local route behavior, immutable binding, fail-closed
contraction, no duplicate destination prose, responsive Chromium layout,
keyboard skip/menu behavior, clean artifact inclusion and exact hashes.

Unproved: native Safari, VoiceOver/other assistive technology, real 200% browser
zoom, human comprehension, receiving-product outcomes, non-null owner receipts,
correction/cache propagation, privacy-reviewed analytics, deployed origin,
rollback, public publication and reopening approval.

## Proactive improvement

The clearest evidence-backed improvement is initial media weight. The clean
artifact is 957.33 MiB and one local Homepage load decoded 5.15 MB even with
external services blocked. A later asset/performance lock should add responsive
hero/map sources and defer below-the-fold town media, then set public-origin
LCP/INP/CLS budgets. This candidate does not alter imagery or shared style
because the sitewide style championship remains open.

## Independent acceptance

The independent Town Entry judge matched all three frozen owned hashes,
re-ran all 15 named browser scenes and returned **ACCEPT**: product/hierarchy
18/20, accuracy/trust 19/20 and LAiDIES brand contribution 18/20. No
route-level correction was required. The full independent record is
`independent-verdict.md`.

## Next acceptance trigger

Run native/human admission against these exact hashes or a newly frozen
successor. Town Entry remains page-behavior acceptance owner; Platform owns
projection production, destination owners own their receipts and outcomes,
Brand owns the sitewide style ruling, and Release owns deployment/public proof.
