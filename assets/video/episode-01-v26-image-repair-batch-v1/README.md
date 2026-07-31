# Episode 01 v26 image-repair batch v1

**Status:** BUILT LOCALLY — NOT ADMITTED; do not assemble, replace v25, publish, or treat these as a release candidate.

This is a new, isolated image-production delivery. `assets/video/episode-01-full-v25-welcome-ident-review.mp4` remains the protected assembly baseline (observed SHA-256 `486bb908a2faa26efee61d0689a7e97180b1f12aa628a04a6b4ad76edf43b633`) and was not modified.

## Files to judge

| Repair source | Exact placements / narration windows | Full-frame candidate | Full-frame SHA-256 | Identity crop |
| --- | --- | --- | --- | --- |
| Miranda/calendar pressure | 14 / 179.500–191.700 | `ep01-miranda-calendar-pressure-p14-v1-1920.png` | `f80ebbeeb56c720452b46da933a4d977bfcbae2cabd8c2e92c65da6dbf6c5b47` | `qa-identity-crop-miranda-p14.png` |
| Dolly/physics problem | 25 / 365.000–379.500 | `ep01-dolly-physics-stage-p25-v1-1920.png` | `97a823362d335c9293cc2f66530659e0de834753726895ff41171618a5ba41e3` | `qa-identity-crop-dolly-p25.png` |
| Heroine/Blend & Snap iBook G3 | 29 / 434.900–455.700; 30 / 455.700–474.350; 61 / 996.300–1025.000 | `ep01-blend-snap-ibook-g3-shared-p29-p30-p61-v1-1920.png` | `e99eb911992b05dbf9f4b36f0be70de2bd79b79c8519af1d8aae483a58c988f1` | `qa-identity-crop-heroine-p29-p30-p61.png` |

All full-frame review candidates are exactly 1920×1080. They are derived from the built-in image-generation output, whose original 1672×941 source remains beside each 1920×1080 review candidate for provenance. The 1920×1080 files are an upscaled review size, not a claim of native 1920×1080 generation.

## Maker full-resolution inspection notes

- **Shared Blend & Snap:** the laptop is visibly a thick, curved, translucent orange clamshell iBook G3 with a large integrated carry handle; no slim laptop is present. The heroine, yellow outfit, oat drink, radio and corner-table narrative all read. It has legible generated café/menu/Apple marks, so independent review must specifically rule whether they are acceptable incidental location/period dressing or require a no-text rerender. No text in the laptop email is treated as evidence.
- **Miranda:** individual faces and hands are coherent at crop scale; the calendar wall uses non-readable line marks. The office pressure/Tetris job reads without a period-tech claim.
- **Dolly:** named likeness, performance-stage location, musician grouping and “impossible time” metaphor read at crop/full-frame scale; no substantive generated text was observed.

These observations are maker QC only. Episode Media Quality alone can admit or reject each source.

## Required independent image/motion judge trigger

Judge these exact three full-frame hashes and the three named crops against the placements and narration excerpts in `replacement-manifest.json`. For the shared Blend & Snap source, independently confirm the Y2K device constraint at full size: chunky coloured curved iBook G3 clamshell, visible handle, no slim modern laptop. Confirm master people register (variable-width black ink, directional hair strokes, crisp anatomy, hard-edged shadow planes) and reject any pseudo-text/identity/location mismatch. If any bytes change, rerun this trigger. Only an admitted source may enter a clock-preserving, still-only assembly; then a separate full-film and player judge is required.

## Still open

Seven distinct failed sources remain unrendered in this batch: placements 34, 38, 43, 45, 48, 50/57 shared, and 70. No motion clip is supplied because these exact placements are `mode: still` in the frozen v24 occurrence manifest.
