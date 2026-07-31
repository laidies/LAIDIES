# Control Room handoff — shared header local consumer acceptance complete

Status: `HOMEPAGE + VISITOR ACCEPT LOCALLY; RELEASE INTEGRATION INCOMPLETE`  
Verified: 2026-07-26 13:06:22 PDT (-0700)  
Candidate: `SVGH-320-2026-07-26-v1`

## Accepted inputs

| Artifact role | Exact path | SHA-256 |
| --- | --- | --- |
| shared source | `content/site/sv-global-header.js` | `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa` |
| machine maker receipt | `operations/product-stewards/platform-reliability/shared-header/v1/shared-header-320-repair-candidate-v1-2026-07-26.json` | `299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049` |
| separate maker evidence | `operations/product-stewards/platform-reliability/evidence-shared-header-320-repair-candidate-v1-2026-07-26.md` | `1a36e936a35558bc2297a35090fabc63825e750d7d260b641bcf18bca1c94370` |
| Homepage | `index.html` | `c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772` |
| Start Here | `start-here.html` | `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0` |
| Visitor's Centre | `visitors-centre.html` | `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743` |
| Town Entry acceptance | `operations/product-stewards/town-entry-homepage/evidence/shared-header-320-consumer-acceptance-2026-07-26/independent-acceptance.md` | `d27ffac2229d251a1d4dc98d2921575d386ffec1f92670c3336147c960b15eb9` |
| corrected Visitor acceptance | `operations/product-stewards/visitors-centre/independent-consumer-acceptance-shared-header-svgh-320-v1-corrected-2026-07-26.md` | `b44091060b6ec52a3f686113b08433fbd43e9e2031aa8700986e92b6851ffaba` |

## Verdict and proof

Town Entry independently ACCEPTS the exact Homepage/Start Here pair. Visitor's
Centre independently ACCEPTS the corrected exact tuple after its earlier
path-association HOLD was preserved and corrected.

- raw 320 gate: PASS, nav-right `312`, document width `320`
- Platform matrix: PASS, 3 routes / 9 JS / 3 no-JS / keyboard Menu-Escape-focus / reduced motion / 390 and 1440 / 320 200%-reflow proxy
- no source, route, provider, deploy or public mutation in the acceptance receipt turn

The Visitor evidence run regenerated the derived `matrix-result.json`:
maker hash `1bf8f531…e4c7c`, fresh-run hash `b71e5237…35fc`. Accepted input bytes,
receipts and test scripts remained unchanged. The canonical aggregate state
records both values.

## Remaining work

Consumer acceptance is complete only at local scope. Integration/release is
not complete until:

1. Control Room authorizes and binds an exact asset/cache release version.
2. Native Safari, VoiceOver and true-zoom proof passes.
3. Public-origin and cache-delivery proof passes.
4. Visitor route-local containment is removed only under its own route lock
   and exact successor acceptance.

Aggregate measurement provider delivery remains `BLOCKED` and untouched.
