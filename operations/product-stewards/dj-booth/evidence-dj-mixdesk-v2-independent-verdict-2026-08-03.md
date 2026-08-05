# DJ Booth mix desk v2 — independent verdict

**Date:** 2026-08-03  
**Role:** independent DJ Booth / Fun & Games, Brand, rights-source, crop and accessibility review  
**Status:** **REJECT — DO NOT INTEGRATE**

## Exact candidate reviewed

- Candidate: `assets/house-dj-mixdesk-v2.png`
- SHA-256 independently recomputed: `4442544da4ac56f5b67395cd24898a17c8c246da83a058a6a799eadec4616252`
- Decoded file: RGB PNG, no alpha, `1920 × 1080`
- Maker receipt identity: matches exactly.

## What passes

- The full frame clearly shows two vinyl turntables, a substantial central mixer with faders, headphones, and one broadcast microphone. No person, laptop, app/interface mockup, or streaming-service mark is present.
- The only prominent readable text is exact: `ON AIR` and `KSVL 99.9`.
- The full frame is an object-led, late-1990s broadcast booth rather than the rejected generic beauty/creator desk. Its saturated cyan, coral, pink and aubergine graphic-novel treatment is compatible with the bound KSVL room and pop-art rendering references.
- The provenance packet binds the two reference paths and hashes, the production method, final hash and geometry, and represents the result as an original OpenAI ImageGen output using LAiDIES-controlled inputs. This establishes a usable **maker source trace for review**; it is not an active-asset or public-release approval.

## Failing proof: current consumer crop contract

I independently rendered centred `object-fit: cover` equivalents from the exact master:

| Required job | Render | Result |
| --- | --- | --- |
| Current desktop hero | `1440 × 340` | **FAIL.** The two turntables, mixer and microphone remain, but both `ON AIR` and `KSVL 99.9` signs are outside the rendered band. The hero therefore loses the specified station/product identity. |
| Current compact hero | `390 × 220` | The whole 16:9 composition remains visible and the console relationship is legible, but this cannot cure the desktop failure. |
| Social crop proof | `1200 × 630` centred crop | **FAIL against the owner safe-area contract.** The most favourable full-width derived render happens to show both signs, but both have been placed near the outer lower edges of the master. They are not inside the required central `1200 × 630` safe area and would be unreliable under a centre-cropped social consumer. |

This is the ruling's explicit calibrated failure condition: a candidate fails when the hero or Open Graph crop loses product identity. The master is attractive and most object requirements are met, but attraction does not substitute for the crop contract.

## Accessibility and consumer truth

The proposed alt text in the owner ruling accurately describes the candidate's full frame: `KSVL 99.9 mixing console with turntables, broadcast microphone and an illuminated ON AIR sign in DJ SunnyV's booth.` The present route's existing alt text and image paths remain bound to the rejected old asset, so this candidate has **no approved consumer integration**.

## Smallest repair and re-review scope

Do not make a new concept or search for another existing asset. Edit this exact composition, retaining the successfully judged booth/console/microphone relationship, but place the exact `ON AIR` and `KSVL 99.9` identifiers inside the master’s central `1200 × 630` safe area and within the centred desktop `1920 × 460` band. Keep all primary controls and the microphone there too. Reissue a checksum-bound maker receipt and rerun only the three crop renders plus this independent review.

Until that passes: do not change `games/dj-booth.html`, the active-asset registry, runtime manifest, builder, deployment, or public claims.
