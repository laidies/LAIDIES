# Verification — Matron Lumen LUMINAiRY page-integration pilot

Status: REJECTED BY ALI 2026-09-05 — wrong environmental colour system; identity remains approved
Date: 2026-09-02

## Exact candidate

- `assets/building-interiors/delivery-20260902-luminairy-matron-lumen-successor-v1/luminairy-nave-matron-lumen-approved-identity-v1.png`
- 1500 × 844 PNG
- SHA-256: `d75392ca69b1487d624dbcc231c3c17dfa68455371ac053dc344a1030f07dae3`

## Mechanical preservation check

Pixel comparison against `assets/building-interiors/luminairy-nave.jpg`:

- Protected region: every pixel with x < 730
- Changed pixels in protected region: 0
- Maximum channel delta in protected region: 0

This proves preservation of the left room and copy-safe area. It does not judge visual quality.

## Rendered surface checks

- Desktop 1440 × 1000: `page-1440x1000.png` (`ac97c650a4cbc87e9516d3067046cd3f4092fc57952e9bc6ff847161efea5aa9`)
- Phone 390 × 844: `page-390x844.png` (`dd0b810bf7072be53873d76fe300df22d98383d76bb4107da1bc9f3ca0ab7f0b`)
- Phone 320 × 760: `page-320x760.png` (`217067b34724f729f6c039dfa352a47b2a5928def3570560914ca549995ea283`)

Maker inspection:

- Desktop: existing title, pledge and introductory sentence remain legible; none crosses Matron's face.
- Phones: the current centred crop fails by hiding Matron. A tested `object-position: 92% center` keeps her face, hair, glasses and blazer visible while retaining legible copy at both widths.
- Character: approved identity and wardrobe are retained. No priestess styling, halo, magic or generated text is present.
- Action: one taper reaches one candle flame; candle flames are upright; lantern and keys remain coherent.
- Composition: the nave is still recognisable and the character is visually anchored to its right-side candle station.

## Release boundary

`luminairy.html` and `content/luminairy-v2.css` were only altered transiently to make screenshots and were restored. The candidate is not wired, pushed or deployed. Ali's explicit approval is required before page wiring.

## Independent visual admission

Verdict: PASS

- No visible seam, malformed anatomy, added person or generated text.
- Approved face, asymmetric silver streak, raspberry glasses and blazer, peacock blouse, keys and practical candle-tending action are retained.
- No fantasy-priestess, clergy, halo, magic, robe or chest-medallion drift.
- Hands, taper-to-candle contact, flames, lantern and candle station are physically coherent.
- Desktop copy remains fully legible and does not cover Matron's face.
- Both phone renders retain her recognisable face, hair, glasses and working identity. The 320px crop is tighter and dims her lower half, but has no blocking crop compromise.

Admission recommendation: show this exact candidate to Ali for bounded LUMINAiRY page-wiring approval only.

## Ali correction — 2026-09-05

Ali rejected this exact page-integration candidate because its brown/amber cathedral environment does not match the current LUMINAiRY site's colours. The independent admission verdict above is invalidated: it failed to compare the dominant room palette against the actual page tokens. This image must not be wired or used as page-colour authority. Matron's separately approved identity SHA remains valid.
