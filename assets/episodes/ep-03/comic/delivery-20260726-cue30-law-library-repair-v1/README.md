# Episode 03 cue 30 — law-library source repair v1

**Status:** SOURCE PLATE INDEPENDENTLY ACCEPTED; MOTION BUILT LOCALLY AND
MAKER-VERIFIED; independent semantic-motion judgment required before assembly.

## Exact placement

- Cue / placement: `30`
- Program interval: `565.000–577.000` seconds (12.000 seconds)
- Narration picture job: “The machine spent the weekend in the library…”
- Required identity/location/style: Episode 03 Heroine, law-clerk beat, law library, `comic-v1-locked`.

## Deliverables

| File | Purpose | Dimensions | SHA-256 |
| --- | --- | --- | --- |
| `ep03-cue30-law-library-law-clerk-clean-textfree-v1-native.png` | Generated native source | 1672 × 941 | `c93e09781ced93e3623729b10247bd2e2f4e0423561385db4f8d425cde195218` |
| `ep03-cue30-law-library-law-clerk-clean-textfree-v1-1920.png` | Deterministic delivery plate, resized from the native source with macOS `sips -z 1080 1920` | 1920 × 1080 | `d0f2a078e795b052bdaaabad6aff8de51c4d66d5d53366d7bdd64e57a37c7b2a` |
| `ep03-cue30-law-library-lamp-dust-zero-net-loop-v1.mp4` | Deterministic local-overlay ambient loop; no audio | 1920 × 1080, 30 fps, 360 frames, 12.000 s | `6a3a6e936eb025820e261eed8ef147d7ae8d9097c3fb6bdc3c2a30754072d6bf` |
| `ep03-cue30-law-library-lamp-dust-zero-net-loop-v1-qc.json` | Streamed full-decode, zero-net, provenance and motion-region maker evidence | JSON | `2a9210a2e2fedefce9cc3d1168f5173d981b2eb13ffcbb71f1c4fee5c5c00cf7` |
| `ep03-cue30-motion-v1-first-mid-last-contact.png` | Visual inspection derivative for decoded frames 0, 180 and 359 | 1920 × 360 | `9ad9eabe9b3e3592576bcb6d4ffee886b25b180afd6ca78a28c7ef2bfe475033` |

The loop was rendered with the available project FFmpeg binary at
`/Users/alisoneakin/.local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1`.
It uses only two procedural local overlays: a soft lamp-shade glow inside
`x=0–409, y=215–424`, and five dust glints inside the window-light region
`x=1490–1784, y=225–374`. No generative image-to-video step, crop, scale,
camera transform, or source-plate mutation is present.

## References and locks

1. Identity and people-style authority: `assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png` — SHA-256 `c9653ce7fa6160494e7b40440ef7d47aa9d53fcdc31037bf280c4a3177756422`; used as a separate identity/style reference.
2. Prior cue source used only for wardrobe, setting, and composition continuity: `assets/episodes/ep-03/comic/ep03-scene-10-law-clerk-comic.png` — SHA-256 `7c2d0fad46ffd1933b8b3cd323c36b69de33205d72d7b43dbf1728b39845380f`.
3. Environment treatment reference: `operations/reference/episode-style-popart/epstyle-scene-03.png`.
4. Authorities: `operations/episode-visual-system-lock.md`, `operations/codex-prompts/ep03-authoritative-spec.md`, and `operations/video-qa/episode-03-v10-49-placement-manifest.json`.
5. Independent source-plate ACCEPT: `operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e03-cue30-law-library-source-independent-judge-2026-07-26.md` — SHA-256 `f56dc631d3ac7ee0bc1da3f07cf37e0b7ed3e04bf18135edeaad15e29a5ae52f`; matching JSON SHA-256 `82b5e44aad6cbc6d513349e8c2adabf58576a8fc075b26a1bdffbb26b2169f20`.

## Generation prompt (built-in Image Generation)

> Use case: illustration-story. Asset type: Episode 03 replacement source still for cue 30, a 12-second law-library beat. Input images: Image 1 is continuity reference for the original law-clerk scene’s composition and era only; correct its unreadable pseudo-lettering by OMITTING every piece of visible text. Image 2 is the locked Heroine identity and adult graphic-novel face/style authority. Image 3 is an environment composition and ink-color reference only. Create one clean, text-free, full-bleed 16:9 adult graphic-novel illustration. In a genuine early-2000s law library, the Episode 03 heroine is working as a law clerk through the weekend. She sits naturally at a broad wood table, three-quarter view, focused on reviewing a small stack of entirely BLANK cream paper sheets with distinct realistic edges; a burgundy pen rests on the desk, but no writing appears anywhere. A beige CRT computer with a dark blank screen sits at frame-right; shelves of uniformly unlettered dark law volumes form the background. A green banker’s lamp is visible at frame-left. Her pink cardigan, white top, black skirt, blonde shoulder-length waves, small butterfly clips, and delicate R necklace remain continuous with the prior scene. Style: comic-v1-locked: elegant variable-width black-ink contours, fine directional hair strokes, refined anatomically plausible adult face and hands, multiple hard-edged faceted light/shadow planes, flat saturated but warm colour, restrained print texture, illustrated depth. The heroine must clearly match Image 2’s facial structure, blue eyes, blonde hair, proportions, and adult graphic-novel register; use Image 1 only for pose/wardrobe/set continuity. Widescreen 1920x1080 composition, subject readable at one-third screen. Late-evening legal research; warm green banker’s-lamp pool, a cool window-light shaft with a few dust motes. These are the only later animation candidates: minor lamp flicker and dust; the still itself must have no motion blur and no camera-move implication. Completely text-free art: no letters, numbers, words, symbols, page marks, labels, logos, book-spine lettering, screen UI, watermark, caption, speech bubble, or pseudo-text anywhere. No halftone. No painterly/airbrushed texture. No generic AI-comic styling. No current-day laptop, smartphone, flat-panel monitor, or post-2001 technology. No camera drift, zoom, or perspective distortion. No extra people.

## Maker checks performed

- Generated source inspected at full native resolution.
- Delivery plate has been confirmed as an RGB PNG at exactly 1920 × 1080.
- Visual scan: no readable or pseudo lettering; blank pages, unlettered book volumes, and blank CRT screen; one adult Heroine; early-2000s CRT; law-library setting; no camera movement implied.
- Independent EMQ source-plate judgment: **ACCEPT_SOURCE_PLATE_ONLY** for the exact `d0f2…7b2a` PNG.
- Full video decode succeeds with exactly 360 frames.
- Decoded frame 0 and frame 359 have the same raw RGB SHA-256, `76867360c259c7d927969fb123a63c0dbc0809ead958fedf45b8036162ef25a0`; their extracted PNGs are byte-identical at SHA-256 `da7d7969a65be9dd06aa7548d4adc6bd8241f07448d6b1d73bc4dcaddcabcb7f`.
- Pixel comparison against decoded frame 0 found zero changed pixels outside the two authorized masks. Inside them, the changed-pixel union is 2.925203% of the frame, with peak travel of 30 levels.
- `operations/tools/measure-motion.py` reports moving: peak 27 levels, 1.891% moved.
- `operations/tools/check-hard-cuts.py` reports PASS: one continuous shot.
- This remains maker motion evidence only; semantic-motion admission is pending.

## Independent judge trigger

Route **the exact MP4 SHA-256 `6a3a…d6bf`, QC JSON SHA-256
`2a92…cf7`, accepted plate SHA-256 `d0f2…7b2a`, and first/mid/last evidence**
to the maker-independent Episode Media Quality motion judge. The judge must
issue a fresh verdict for:

1. exact 12.000-second / 360-frame timing and full decode;
2. decoded first/last equality and seamless loop return;
3. banker’s-lamp and dust/window-light environmental motion only;
4. no camera, Heroine, face, body, paper, book, CRT, keyboard, text,
   crop, or composition movement; and
5. motion visibility/subtlety at normal playback speed.

Until that verdict, the MP4 is **BUILT LOCALLY / MAKER TECHNICAL QC PASS /
INDEPENDENT MOTION PENDING**. It does not modify the v12 MP4/audio/ident, the
v10 placement manifest, any master, or a public surface.
