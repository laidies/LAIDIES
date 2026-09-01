# Miss Jeeves selected masthead integration — verification

Status: **LOCAL, INDEPENDENTLY ADMITTED, NOT WIRED, NOT PUSHED, NOT DEPLOYED**

## Exact candidate

- Asset: `assets/building-interiors/delivery-20260901-library-miss-jeeves-successor-v2/library-masthead-miss-jeeves-selected-v2.png`
- SHA-256: `880f463aca51147f8bf6ee73fc5723e7cf9d5cf30f4ff2d297372c5ec02f9b24`
- Geometry: 1672x940.

## Pixel preservation

The incumbent room is the deterministic base. Only the generated character,
chair and vacated-incumbent region was retained through a feathered bounded
envelope. Outside source envelope `x=810..1639, y=175..774`, exact comparison
found `0/1073680` changed pixels, mean channel delta `0.000000`, maximum channel
delta `0`.

## Visual review

- Maker inspection: no hair pencil, duplicate chair, malformed anatomy,
  generated text, broken printer/desk/architecture or visible composite seam.
- Centred 320x360 and 390x360 masthead crops retain her complete face, glasses,
  hair silhouette, white collar, teal cardigan and welcoming desk posture.
- Independent artifact-first review: PASS with no visible defects. It compared
  the candidate with the incumbent room, approved identity and both crop files.

## Generation record

Built-in Image Generation was used in edit mode with the incumbent room and
approved identity. The first pass placed her too far right for the narrowest
crop. A successor moved her left; a final surgical edit removed the duplicate
empty chair created by that move. The admitted character region was then
composited onto the exact incumbent room.

## Not done

- `library.html` remains unchanged and still points to the incumbent masthead.
- No push, deployment or public verification.
- No live-browser candidate swap was completed; the crop checks reproduce the
  page's centred `object-fit: cover` geometry directly from the exact asset.
