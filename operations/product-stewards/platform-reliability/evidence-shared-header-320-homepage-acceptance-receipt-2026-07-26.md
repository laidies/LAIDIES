# Shared header 320px — Homepage acceptance receipt

Evidence verified: 2026-07-26 12:59:09 PDT (-0700)  
Candidate: `SVGH-320-2026-07-26-v1`  
Platform verdict: `BOTH CONSUMER OWNERS ACCEPT LOCALLY; RELEASE INTEGRATION INCOMPLETE`

## Exact accepted tuple

- shared source SHA-256: `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa`
- maker receipt SHA-256: `299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049`
- Homepage SHA-256: `c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772`
- Start Here SHA-256: `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0`
- Town Entry evidence SHA-256: `d27ffac2229d251a1d4dc98d2921575d386ffec1f92670c3336147c960b15eb9`
- Town Entry handoff SHA-256: `678332346d549a746daf718eee2d5859da48231b2fe1bc690a5d0cbd3c802ca7`

Direct hash verification matched every item above. The independent Town Entry record accepts only this frozen Homepage/Start Here pair.

## Proof admitted

- raw 320px gate: PASS, `.svgh-nav` right edge `312`, document width `320`
- Platform consumer rerun: PASS, 9 JS / 3 no-JS / 3 keyboard / 3 200%-reflow-proxy cases
- independent Homepage/Start Here matrix: PASS 8/8 at 1440/390/320 plus no-JS
- existing exact live-route readiness matrix: PASS 15/15
- Enter, Escape and focus return: PASS
- no shared mount/style injection on frozen Homepage; no token, font, label or route drift

## Limits

Visitor subsequently issued a fresh ACCEPT at 13:05:27 PDT after the corrected binding. Its evidence is `independent-consumer-acceptance-shared-header-svgh-320-v1-corrected-2026-07-26.md`, SHA-256 `b44091060b6ec52a3f686113b08433fbd43e9e2031aa8700986e92b6851ffaba`. The original HOLD remains preserved.

This does not establish native Safari/VoiceOver/true-zoom behaviour, public-origin behaviour, cache/version delivery or deployment. The pre-existing inert mobile Menu without JavaScript remains outside the Homepage candidate; ordinary Homepage hero routes remain usable without JavaScript. Visitor's route-local containment remains until a separate route lock and successor acceptance. Any candidate or consumer input hash change invalidates this receipt and requires resealing.

No shared source, consumer route, provider, deployment or public state changed while recording this receipt.

## Next gate

The fresh Visitor evidence rerun regenerated the derived
`evidence-candidate/matrix-result.json`: original maker SHA-256
`1bf8f531…e4c7c`, current rerun SHA-256 `b71e5237…35fc`. Source, routes,
receipts and test scripts stayed unchanged. The aggregate acceptance state
records both values; it does not claim the derived result stayed byte-stable.

Control Room can now consider a separate asset/cache release binding followed
by native and public verification. This local consumer acceptance is not a
deployment or public launch claim.
