# EMQ-E02-C13-ADMISSION-2026-07-26 — independent source-image verdict

**Verdict:** **ACCEPT — v01 only.** This gate admits one Episode 02 Cue 13
source image for the exact `187.600–203.300 s` window. It does **not**
authorize animation, assembly, a production-cue replacement, a review render,
site work, release, or any public claim.

**Judge:** Episode Media Quality, independent of maker  
**Completed:** 2026-07-26 11:47 PDT / 2026-07-26T18:47Z  
**Maker package:** `WE-MEDIA-E02-C13-2026-07-26`

## Checksum-bound intake

The final delivery manifest parsed as JSON and recomputed to
`7b3f75714d919869e9455a92f5bc5cbc78bf1438c7d8f0eedcb613b4ab58258d`.

| Item | Recomputed SHA-256 | Result |
|---|---|---|
| v01 | `1372d2306bb230ce29b6c5fed8e63b0277dd2272531ecc8317aad223a6e2da13` | MATCH |
| v02 | `dcf175f58b38ef3f88089886ecbad5796c853b1e33b1187c816fd51df10877fe` | MATCH |
| v03 | `604f92487d44f96c0a85ca80a8d9d497879146b6231d921bd4e73c0aa57b4381` | MATCH |
| contact sheet | `a6f5d9711ce167d4f8bb2495d94540f670bb6793c76fa47e407105d7df4bb891` | MATCH |
| Heroine identity/master people style | `c9653ce7fa6160494e7b40440ef7d47aa9d53fcdc31037bf280c4a3177756422` | MATCH |
| environment refs 02 / 03 / 05 | `76d2bdb4d80092cb5325068f5f9f145eae1fd0fbf5776f60348bb7ba80a0bc6f` / `90bc9470f670226787eed0068d3f20f43107573ab30c7aa989b3d51624650829` / `c03d0f7733d23d9310cfdf292b289768a93675176106af54ca638b799abcd3e5` | MATCH |
| panel-grammar ref | `41202f5652dddf66da9d179745111a725f3760c8c48e12198b495618d9d2ae67` | MATCH |

All candidates are native 1920×1080 RGB PNGs; the contact sheet is 1920×405
RGB JPEG. I inspected the full-frame originals, contact sheet, locked identity
authority and all three prohibited sources. The contact sheet corroborates but
does not replace full-frame inspection.

Rejected-source checksums: S13
`f7ae23483f8f7ecac21823b8543d42089dea19ac1a92b3a715264ff5d8d8908d`;
S14 `edec0e1c158a0a06bb4469400f25ddd8fe26a2595c56a9a4c2ce6f7a135e13de`;
and painterly incumbent
`9fbc460375913c9f0b5e3abedcec26cab126028338794215387845180e5d6ad6`.
The maker's generated-source declaration plus full-frame comparison show no
visible direct composition, character, costume, caption or café-scene reuse.
A final pixel file cannot prove a negative about upstream input use; that
limited process fact remains the maker's checksum-bound declaration, not a
judge inference.

## Narration relevance

The as-recorded VTT says: the regular spot knows the usual because it was
built over repeated visits; AI is the brand-new café, where “the usual” earns
a blank look or a plain drip because the visitor did not provide context. This
requires a readable regular → new-café comparison, not a generic café image.

## Candidate verdicts

| Candidate | Exact SHA-256 | Verdict | Independent finding |
|---|---|---|---|
| v01 | `1372d2306bb230ce29b6c5fed8e63b0277dd2272531ecc8317aad223a6e2da13` | **ACCEPT / selected** | Clears every image floor. The same adult Heroine is recognisable against the locked face/hair/eye/clip authority; anatomy and hands are clean. Both panels use crisp variable black ink, faceted light planes and non-painterly adult graphic-novel colour. A strong gutter, comparable eye-level close-medium framing, warm familiar left and cool unfamiliar right make the analogy immediate. Left has an unmarked habitual takeaway cup and accumulated café rhythm; right has a distinct sparse counter, unmarked plain drip and a mildly uncertain Heroine. No baked text, logo, wordmark, extra identifiable person, named café, JoJo, barista, or visible prohibited-source reuse found. |
| v02 | `dcf175f58b38ef3f88089886ecbad5796c853b1e33b1187c816fd51df10877fe` | **REJECT** | Identity, style, text-free execution and warm/cool contrast pass, but the locked comparison fails: left is seated/near-waist while right is a substantially wider standing three-quarter composition. The frame changes more than café context. |
| v03 | `604f92487d44f96c0a85ca80a8d9d497879146b6231d921bd4e73c0aa57b4381` | **REJECT** | Identity, style, text-free execution and contrast pass, but the left foreground reads as her taking/holding a cup rather than an already-waiting usual; right does not make the plain-drip/blank-order state immediately clear. Camera/body scale also shifts enough to dilute the controlled comparison. |

## Bound next action

Only this source is admitted:

`assets/episodes/ep-02/comic/delivery-20260726-cue13-cafe-transition-v1/ep02-cue13-regular-to-new-cafe-comic-v01-1920.png`

at SHA-256
`1372d2306bb230ce29b6c5fed8e63b0277dd2272531ecc8317aad223a6e2da13`.

**Remaining work:** Video Editor creates a still-only, no-camera-drift Episode
02 review cut, applies selected cues 0/4/5/6 plus this exact source, preserves
the 16:27.47 clock, binds source/cue/audio/VTT hashes and returns the exact
export to Episode Media Quality for full normal-speed
audio/VTT/image/motion review. No other candidate is admitted.

**Proactive improvement:** **NO MATERIAL OPPORTUNITY** within judge-only scope;
this closes the source-admission gap. The next value action is the specified
review-cut gate, not another image variation.
