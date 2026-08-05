# Mme CLAi-O avatar — independent verdict

**Verdict:** `ACCEPT FOR INTEGRATION — EXACT BYTE AND NARROW JOBS ONLY`  
**Judged:** 2026-08-03  
**Independent role:** product/Brand/accessibility/placement judge; not the maker or integration owner.

## Bound candidate

| Item | Verified identity |
| --- | --- |
| Candidate | `assets/town-characters/avatars/mme-claio-avatar-v1.png` |
| SHA-256 | `42453c54ced5d35482afc33f5686a31e3a0b510345488a69f068acadc30a789a` |
| Raster | 1024 × 1024 PNG; 8-bit RGB; sRGB IEC61966-2.1; no alpha |
| Identity anchor | `assets/video/delivery-20260714-opening-v6/shots/opening-03-mme-claio-clean-face.png` — `31dddad67d3592d5c46246299ea323efff0234480211655b989b80b12b99da51` |
| People-style reference | `assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png` — `c9653ce7fa6160494e7b40440ef7d47aa9d53fcdc31037bf280c4a3177756422` |
| Maker receipt | `operations/product-stewards/mme-claio/evidence-mme-claio-avatar-maker-receipt-2026-08-03.md` — `a6f5d14d9e5e6e72c25506f80b7a461136d97eba1cdf83f51e5cb7374266d337` |
| Owner ruling | `operations/product-stewards/mme-claio/evidence-claio-avatar-public-asset-owner-ruling-2026-08-03.md` — `8bf814632c8069727b811b3f73ff428c5e01f6c2c3b966b8cf0ef13fee546741` |

The candidate hash, all three reference hashes, raster geometry, colour profile and no-alpha declaration were independently recomputed/inspected.

## Inspection result

**Identity and role: PASS.** The mature blonde swept curls, rhinestone cat-ear clips, purple round glasses, warm knowing expression, purple/fuchsia wardrobe, jewellery and one reading card carry the current Mme CLAi-O identity without importing the rejected dark tarot portrait. It reads as the fictional `Town Psychic · Reading-Card Oracle`, not as a promise of prediction.

**Brand/style: PASS.** This is adult graphic-novel portraiture with decisive dark ink, controlled printed texture and saturated fuchsia, purple, teal and cobalt. It has neither readable generated text, interface, speech bubble, additional people, saint/tarot framing, halo, roses, scrollwork nor a dark-gold Victorian treatment. The single card is a restrained role cue; it is not an ornate second prop.

**Resident Card crop: PASS.** I inspected the exact original and real scaled 240 px, 96 px and 64 px centred square views. At 240 px the face, glasses, clips and card are distinct. At 96 px the glasses, blonde silhouette, clips and purple/fuchsia character read clearly. At 64 px the face, glasses and cat-ear silhouette remain legible; the card is appropriately secondary rather than a competing tiny detail.

**Episode 01 CTA placement: PASS — decorative portrait scope.** I inspected the real centred 16:9 cover crop implied by the current CTA's overscanned `object-fit: cover` treatment: it retains a large, clear face, both glasses and the hair/clip identity. The card is cropped out in that 16:9 frame. That is acceptable only because the existing CTA text supplies the feature, character and destination (`Mme CLAi-O · a hidden charm around town` / `Get Your Cards Read`); the image must remain decorative and must not be used as the sole role explanation. No placement derivative is needed for this exact current CTA job.

**Accessibility: PASS WITH REQUIRED DATA CONTRACT.** For the Resident Card, add `avatarAlt: "Mme CLAi-O in purple glasses, holding a reading card"` to the character record and have its image consumer use that specific value. The Episode 01 CTA image should stay intentionally empty-alt because its visible label, line and button already provide the action and destination.

**Rights/provenance: PASS FOR THIS LOCAL ADMISSION DECISION.** The checksum-bound maker receipt declares an original OpenAI ImageGen output from LAiDIES-controlled source references, no third-party logo/title/quoted text/public-person likeness, and its public-use scope/limits. That is sufficient source trace for this candidate; it is not deployment, publication or public-origin evidence.

## Exact permitted integration

One integration owner may, subject to the existing builder/registry process:

1. replace only `characters.mme-claio.avatar` in `content/data/character-cards.json` with `/assets/town-characters/avatars/mme-claio-avatar-v1.png` and add the exact `avatarAlt` above;
2. replace only the `t=1076.3` Episode 01 CTA `src` in `content/episodes/episode-01-cues.json` with that same path, preserving its existing visible CTA text, route and button;
3. make the Resident Card consumer read the explicit `avatarAlt` field while preserving intentional empty alt for the Episode CTA;
4. register only SHA `42453c54ced5d35482afc33f5686a31e3a0b510345488a69f068acadc30a789a`, remove the two executable requests for rejected SHA `f367682ec09e909d70ea6b0f00cae90a11ca01d3ea080310ea283a7f0feba44b`, then rerun the affected inventory/build/Resident Card/Episode checks.

## Limits

This accepts a single square portrait for the public Resident Card and this one existing Episode 01 CTA only. It does not admit the old `madame-claio-portrait-v3.png`, a full Town-card front, Town Hall use, prediction claims, a new episode image, motion, deployment, publication or public verification. Any new crop, placement or character role must be independently judged on its exact bytes.
