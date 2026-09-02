# Matron Lumen LUMINAiRY page-integration pilot

Status: INTERNAL CANDIDATE — awaiting Ali's page-wiring approval
Tier: 1 visitor-facing visual
Date: 2026-09-02

## Goal

Place the already-approved Matron Lumen identity into the existing LUMINAiRY nave without changing her identity or replacing the admitted room. Keep the existing page title and pledge readable at desktop and phone sizes.

## Bound inputs

- Approved identity: `assets/town-characters/candidates-20260901/matron-lumen-sunnyvaile-identity-pilot-v1.png`
  - SHA-256: `eda5ad20cbad72f60de9036238caddf244c07f7786b85123c157b133f6ed9f85`
- Existing nave: `assets/building-interiors/luminairy-nave.jpg`
  - SHA-256: `0d7a4681ad379c7fc8fb3fd791d5711a2f6938214e8750743778afba73266533`
- Destination surface: the hero at the top of `luminairy.html`

## Required result

- Preserve her face, asymmetric curls and silver streak, raspberry glasses, raspberry blazer, peacock blouse, bangles and keys.
- Keep the action practical: Matron tends ordinary candles with one taper beside a faceted lantern.
- Keep the left side open for the existing HTML title and pledge.
- Retain the exact existing nave outside the bounded right-side character envelope.
- No halo, clergy styling, fantasy magic, generated lettering, extra person, malformed hand or impossible flame.
- Desktop uses the existing centred full-bleed image behavior. Phone wiring must add `object-position: 92% center` so Matron remains visible.

## Production method

Built-in image editing used the exact nave and approved identity as references in identity-preserving compositing mode. The generated right-side character/action region was then feather-composited over the exact 1500 × 844 nave; pixels left of x=730 were retained byte-for-byte from the nave.

No page source, push or deployment is included in this candidate.
