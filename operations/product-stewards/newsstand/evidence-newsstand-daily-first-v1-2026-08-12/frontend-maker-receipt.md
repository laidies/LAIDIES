# NewsStand Daily-first v1 — frontend maker inspection

**Status:** `VERIFIED LOCALLY — INDEPENDENT VISUAL ADMISSION REQUIRED`

This receipt binds the exact local Daily-first candidate. It is a maker
inspection, not an independent review, admission, deployment or public proof.

## Candidate identity

| Artifact | SHA-256 |
|---|---|
| `newsstand.html` | `6464ee31adecd4628893b40e3dba53936e312a27400033849bf4c4a58b0a0d44` |
| `content/newsstand.css` | `14f0d9e7ba9668e325f5c98ec5cc8415837a4bfd57cf5125808ecc16fd756eef` |
| `content/site/newsstand-catchup-v1.js` | `f07ba80dcfa3e6ac60068a9ab8e9b5819fb959ab29b5fa708b694a524e590f2d` |
| `scripts/test-newsstand-reader-contract.mjs` | `1af9811ca88fd4c103cc0e2806db597dba1578eccc7786e9f0263b6dd3bd64fc` |
| `scripts/test-newsstand-reader-browser.mjs` | `27dcff87848582161b8fef23e0ff736bdd9941a321b4e2c5e6479418ec484f5d` |

## Exact rendered evidence inspected

| View | SHA-256 |
|---|---|
| `desktop-1440.png` | `7601ea3df51f378add95f20f347cc95dadeb66fac7f894660b1b32a0e3fa9cab` |
| `desktop-counter-1440.png` | `bc5b2daa7444f5c54a76065c55744ec452178b5c056d91b83d3cc9e49c8cd749` |
| `desktop-daily-1440.png` | `d21737f7e410ea7ba213392671e6852a0fe2ba62d6365ddbb417ff31604f4153` |
| `mobile-arrival-390.png` | `0ad142ce091adc0a14a8f43690c55512075ed5a44973bc761b80e731d4cf2951` |
| `mobile-chooser-390.png` | `7d7a1cf4d81cbffa7eddb44e4b6df3de09e50cbde6f55234f27d8f630614d2f8` |
| `mobile-daily-390.png` | `17200355bb518281202c56bc5c2e5aa7411775105d7789ea4bc977eab60e27fa` |
| `mobile-arrival-320.png` | `5813d359e23ac4a7ddd95c684e3938297ee2f373d0d5e65055191ec1c556f530` |
| `mobile-chooser-320.png` | `034df46a8f1130b1769b9c627209994a6082a9b778daf98e2cc55fa178256202` |

Maker inspection of the exact pixels found:

- the admitted Paige arrival and existing NewsStand colour/world system remain;
- The Daily, The Weekly and The Big Picture are the only persistent edition
  choices, and all three remain visible together at 1440, 390 and 320 pixels;
- Breaking is absent in the quiet fixture and appears only as a conditional
  banner in the qualified Breaking fixture;
- The Daily opens automatically without stealing focus or moving the visitor;
- no generic white-card FAQ/lobby/front-desk treatment has returned;
- deterministic text overlays keep all public edition names exact;
- the 320-pixel treatment deliberately omits cramped status dates while keeping
  each edition's truthful action visible;
- the archive/search route and the unfolded Daily remain visible and usable.

## Objective verification

`node scripts/test-newsstand-reader-contract.mjs` passed. Its calibrated bad
page containing a fourth persistent Breaking tab was rejected.

`node scripts/test-newsstand-reader-browser.mjs` passed 270 rendered checks,
including desktop/mobile reflow, automatic Daily, conditional Breaking,
archive/search, correction, retraction, load failure, stale state, tampered
issue stores, focus, reduced motion, zoom and repeated history restoration.

## Open gate

The maker is not an independent visual judge. These exact bytes must receive
artifact-first independent product/UX and brand/visual admission before the
candidate can be released or shown as an approved direction.
