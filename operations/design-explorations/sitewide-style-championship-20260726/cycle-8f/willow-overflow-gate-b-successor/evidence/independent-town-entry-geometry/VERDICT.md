# Independent Town Entry geometry verdict — Cycle 8F

**Verdict:** **PASS — Town Entry geometry/boundary only**  
**Evidence time:** 2026-07-27T19:39:54Z  
**Judge scope:** frozen Cycle 8F successor tuple; no source, render, manifest, or receipt mutation. This is not a Brand Gate B result, a Homepage approval, or a production/public approval.

## Checksum binding

All supplied binding objects match their required SHA-256 values:

| Object | SHA-256 | Result |
| --- | --- | --- |
| `SUCCESSOR-MANIFEST.json` | `43e52615d969b08f38012816c73e95cc2be4511f17947fff36f94dcb8a7566b2` | PASS |
| `CONTROL-ROOM-BRIEF.md` | `414226b02689aa169f11aea033130ca63a446a7e91955055f7a3c9cb216e4f4d` | PASS |
| `evidence/gate-b-renders/CAPTURE-RECEIPT.json` | `4f46a3e6fca6c31bdb20eb7005377c2bf492c07c879276fca2103a3743df49ba` | PASS |
| `colour-energy-hierarchy-1440.png` | `f9af9c6450b08172ce0705f5452254c664411315dd030d8cd3879685c3aa3975` | PASS |
| `colour-energy-hierarchy-390.png` | `a7fd2be334a57160e9f280ea98b4fcd78a87cf24f30b3d1f5a227207774b1acd` | PASS |
| `main-street-mobile-390.png` | `84badd3fbf0d8c2a65f3d4913639926c7af6892cc8160006abe4c5366fc5c4b2` | PASS |
| `willow-lane-1440.png` | `583215f9e26ea7af4b710fe1fd4004993036af3f80a178323b189ad718fbf466` | PASS |
| `willow-lane-390.png` | `623ebe85a6d32dc338449a2ceb181f090841caaabf84eb43abf1c694eb8d6069` | PASS |

## Exact tests and results

1. **8E → 8F HTML identity:** `cmp -s` passed for all three files. The matching 8F SHA-256 values are `proofs/colour-energy-hierarchy.html` `92da8c16a440845f9c398b226d60f91190c0d63a8f526aeca47f9508737dd5a3`, `proofs/main-street-mobile.html` `f1d14da8eb59d54edb1e4f1cd7ab684a6aecf4debec4d4f4c398f25accf84806`, and `proofs/willow-lane.html` `786e63477eaea08a94b825f5c6c292646d38678962a68b3cf854b70885471ee8`.
2. **8E → 8F CSS boundary:** unified diff contains only `.willow-proof { box-sizing: border-box; width: 100%; }` and `.willow__copy { min-width: 0; overflow-wrap: anywhere; }`. No HTML/image/text/alt/route/job change is possible within the byte-identical proofs. The successor CSS SHA-256 is `37bcfa760c8d2a46d04888d0f99776bd55e38270a474ca7d3ec7af173b1a5d3a`.
3. **Containment / no false fix:** successor CSS introduces no `overflow: hidden`, `clip`, transform, or off-screen positioning rule. The pre-existing global `body { overflow-x: hidden; }` is byte-identical to 8E and is not part of the successor diff; receipt diagnostics independently report `scrollWidth <= clientWidth` for every captured page. In particular, Willow desktop changed from the bound 8E failure `1522 > 1440` (predecessor render SHA `bc34d20b2ee128605db54622c4bc4918c10230d325de65a597144a2e05b2f17d`) to `1440 = 1440`; Willow mobile is `390 = 390`.
4. **Capture diagnostics:** receipt JSON parses and reports five captures, zero broken images, and complete/natural-dimension-positive images: colour desktop `1440/1440`, colour mobile `390/390`, MAiN Street mobile `390/390`, Willow desktop `1440/1440`, and Willow mobile `390/390` (client/scroll widths).
5. **Text, alt, image, and job parity:** byte identity of every proof establishes source text, controls, source path, image alt, title, and declared destination/job parity. Receipt confirms Willow uses `fairy-willow-lane-ink-faceted-v1.png` with alt `FAiRY Godmother welcoming visitors at her Willow Lane house` at both viewports.
6. **Full-resolution visual inspection:** all five bound PNGs were inspected at original resolution. The colour and MAiN Street proofs are intact. Willow at 1440 preserves the entire house frontage, illuminated doorway/entrance, FAiRY Godmother figure and face, and foreground environment beside the copy. Willow at 390 preserves the same entrance, full figure/face, house context, and unobstructed copy below the image. No clipping, covering, or weakened image-led entrance visibility was observed.

## Lock truth

Cycle 8F is a valid geometry-only successor to immutable Cycle 8E Gate A PASS / Gate B HOLD evidence. Town Entry’s geometry and boundary gate is **PASS** for this exact checksum-bound tuple only. The source remains `FROZEN_FOR_INDEPENDENT_REVIEW`; no Homepage assembly, production/shared/live mutation, deployment, publication, or Ali decision is authorized or inferred.

## Remaining work and exact next action

**Remaining work:** independent Brand six-floor Gate B judgment of this same frozen tuple; it remains a separate required gate.

**Exact next action:** have the separate Brand judge score the five checksum-bound Cycle 8F renders against all six Gate B floors and write its independent PASS/HOLD verdict. Only if that verdict also passes may Control Room consider a later full-page assembly brief.
