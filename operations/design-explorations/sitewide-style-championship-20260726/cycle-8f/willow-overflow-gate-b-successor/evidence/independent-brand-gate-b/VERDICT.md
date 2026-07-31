# Independent Brand Gate B verdict — Cycle 8F

**Verdict:** **HOLD**

**Evidence reviewed:** 2026-07-27 12:40:46 PDT (frozen tuple, full-resolution proof renders at 1440×900 and 390×844)

## Exact evidence binding

| Item | SHA-256 | Result |
| --- | --- | --- |
| Successor manifest | `43e52615d969b08f38012816c73e95cc2be4511f17947fff36f94dcb8a7566b2` | matches required binding |
| Control-room brief | `414226b02689aa169f11aea033130ca63a446a7e91955055f7a3c9cb216e4f4d` | matches required binding |
| Capture receipt | `4f46a3e6fca6c31bdb20eb7005377c2bf492c07c879276fca2103a3743df49ba` | matches required binding |
| Colour / hierarchy 1440 | `f9af9c6450b08172ce0705f5452254c664411315dd030d8cd3879685c3aa3975` | reviewed |
| Colour / hierarchy 390 | `a7fd2be334a57160e9f280ea98b4fcd78a87cf24f30b3d1f5a227207774b1acd` | reviewed |
| MAiN Street 390 | `84badd3fbf0d8c2a65f3d4913639926c7af6892cc8160006abe4c5366fc5c4b2` | reviewed |
| Willow Lane 1440 | `583215f9e26ea7af4b710fe1fd4004993036af3f80a178323b189ad718fbf466` | reviewed |
| Willow Lane 390 | `623ebe85a6d32dc338449a2ceb181f090841caaabf84eb43abf1c694eb8d6069` | reviewed |

The capture receipt records complete images, zero broken images, and `scrollWidth == clientWidth` at each required viewport: colour 1440/390, MAiN Street 390, and Willow 1440/390. Willow’s desktop predecessor overflow (`1522 > 1440`) is repaired to `1440 == 1440`.

## Six-floor Brand score

| Required floor | Score /20 | Independent rationale |
| --- | ---: | --- |
| Colour energy / vibrancy | 18 | Coral, teal, violet, blue and orange establish a lively, legible 1990s palette with strong contrast; no cream/white-page drift. |
| Adult craft | 17 | The type scale, restrained hard-edged blocks and admitted illustrated scenes are composed rather than sticker-like; some module repetition keeps it at the floor. |
| Image-led hierarchy | **14** | Willow itself is decisively image-led and protects the house, entrance and character. However, the 1440 colour/hierarchy proof renders the actual experience in a narrow left strip against a very large empty navy field. At the required desktop proof size this makes the principal experience feel like an unexpanded mobile rail, not an image-led desktop hierarchy. It cannot be compensated for by the strong mobile proof or by Willow alone. |
| Mobile composition | 18 | The 390 proofs are deliberately stacked, readable and unclipped. Willow gives the environment a clear top position and preserves the entrance/character; MAiN Street is compact and usable. |
| Environmental readability | 18 | The Willow scene reads immediately as a lived-in house and its character, doorway and large window remain visible at both widths. |
| Repeatability without one-note containers | 16 | The system currently demonstrates colour panels and repeated rectangular containers more consistently than a varied spatial desktop grammar. The distinct Willow image-plus-copy composition helps, but the desktop colour proof’s narrow strip/void makes repeatable full-width application unproven. |

## Automatic-hold check and lock truth

**Automatic HOLD applies:** two required Brand floors are below `17/20` (image-led hierarchy `14`; repeatability `16`). No other automatic hold was evidenced.

The frozen source boundary is truthful for this successor: all three 8F HTML files are byte-identical to Cycle 8E. The sole source diff is in `proofs/proofs.css` and is limited to Willow containment: `.willow-proof { box-sizing: border-box; width: 100%; }` and `.willow__copy { min-width: 0; overflow-wrap: anywhere; }`. It uses no hidden/clipped overflow, transform scaling or offscreen-positioning declaration. The manifest declares no homepage assembly, production/shared/live mutation, deployment or publication; this review makes none.

## Recommendation, trade-off and remaining work

Keep this geometry repair as valid technical successor evidence: it fixes the Willow overflow without damaging the admitted scene or mobile composition. It does not, by itself, establish the required desktop visual system.

Remaining work is a new, separately authorized Gate B candidate that proves the colour-energy/hierarchy family as a real 1440-wide desktop composition, preserving the current lock constraints and avoiding a one-note card/container grammar. That work must be recaptured and independently scored; this HOLD must not be promoted to a homepage assembly decision.

## Exact next action

Return the checksum-bound HOLD to Control Room. Do **not** modify this frozen Cycle 8F tuple; issue a new authorization/brief before any desktop hierarchy or repeatability repair.
