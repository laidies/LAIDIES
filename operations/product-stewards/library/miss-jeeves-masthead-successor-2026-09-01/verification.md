# Miss Jeeves masthead successor — verification

Status: **LOCAL, VISUALLY ADMITTED, NOT PUSHED, NOT DEPLOYED**

## Exact result

- Candidate: `assets/building-interiors/delivery-20260901-library-miss-jeeves-successor-v1/library-masthead-miss-jeeves-geist-v1.png`
- Candidate SHA-256: `8ecb353b32b744e75ff5d712f2fac0cd0ed06a963c7d7f7b3400cb7ce9d053e2`
- Geometry: `1672 × 940`
- `library.html` arrival image now names this new masthead-only asset.
- The `.library-room-unit` shelf-room background still names the incumbent v4 asset.

## Room-preservation proof

The incumbent v4 image was used as the deterministic base after the generative
edit changed pixels across the room. Only the generated Miss Jeeves and chair
region was composited through a feathered bounded mask.

Compared with incumbent SHA-256
`54904f475ab3352957a3008c8df2cf9fc2b72bdd73cb26d898c3b8572dfda7db`,
the candidate changes zero pixels outside source envelope
`x=780..1644, y=175..784`:

`outside_edit_envelope_changed=0/1044030 (0.000000%) mean_channel_delta=0.000000 max_channel_delta=0`

## Rendered page checks

- `page-1440x1000.png` — Miss Jeeves fits the existing room and the separate
  orientation/title surface is unchanged.
- `page-390x844.png` — face, glasses chain, cardigan, brooch and desk role remain visible.
- `page-320x760.png` — the same identity cues remain visible in the narrowest required crop.
- Local page and asset requests returned successfully; the local server was stopped afterward.

## Calibrated gates and tests

- Visual producer-contract calibration: PASS.
- Producer self-review: PASS, zero visible defects.
- Independent artifact-first visual admission: PASS, zero visible defects.
- Visual-admission calibration: PASS.
- Library known-failure calibration: PASS, 49 reject fixtures.
- LIBRAiRY product suite: PASS, `current_four_book_suite=7`.
- Library contract calibration: PASS.
- Opening-books suite: PASS across `1440`, `390` and `320`.
- Modular reading system: PASS across `1440`, `390` and `320`.
- Full design-review checker: `VACUOUS — candidates=0`; it did not admit or reject this bounded masthead asset.

The current known-failure preflight remains FAIL on two unrelated existing
Library conditions: the “what is generative AI?” suggestion lacks a deterministic
answer/source route, and mobile shelf rows do not preserve a 120px visible-book
dimension. Neither condition is caused or repaired by this masthead change.

## Generation record and prevention learning

Built-in Image Generation was used in edit mode with the incumbent masthead and
the approved identity pilot. Prompt summary: replace only the old librarian with
the approved Miss Geist-inspired Miss Jeeves; preserve the exact room, desk,
equipment, palette, perspective and text-free scene; then move her left enough
to keep her complete face and identity cues inside the centred 320px crop.

The generator still re-rendered most room pixels, so a character-only edit cannot
rely on prompt compliance. The reusable prevention rule is to measure unchanged
pixels against the incumbent and composite the admitted character region onto
the incumbent byte before any review.

## Not done

- No push, deployment or public verification.
- No change to the separate shelf-room background.
- No attempt to resolve the printer-joke prop or the two unrelated Library failures.
