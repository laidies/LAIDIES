# LAiDIES recurring ident production manifest

**Status:** COMPLETE LOCALLY — OWNER REVIEW REQUIRED  
**Date:** 2026-07-26

The original five v1 variants use one deterministic builder,
`build-episode-ident-proof.py`, and one replaceable-slot manifest,
`ident-variant-manifests.json`. Every output is 960 × 540, 60 fps, 389 frames
and 6.4833 seconds. The full lowercase `i` visibly resets between all four
symbols.

| Variant | Canonical title | Symbol sequence | Background vocabulary | MP4 SHA-256 |
|---|---|---|---|---|
| Trailer | Welcome to SUNNYVAiLE | folded town map; VHS; Resident Card; KSVL radio | LEARN AI; WEDNESDAY; SUNNYVAiLE; REWIND; TOWN MAP; EPISODES; RESIDENT CARD | `d6ed30b357f2e0d10387ee1dd38273ba1607703755dfcc33d3fb34aa133c75e3` |
| Episode 01 | On Wednesdays We Do AI | three-tool CRT comparison; AI new-hire desk; generated pages; model core | GENERATIVE AI; START SMALL; MODEL; NEW HIRE; HALLUCINATION; THREE TOOLS; DRAFT | `8f48e020025d34e041e1170a96801d4852c1abf204162398e3f41faf50452f85` |
| Episode 02 | Tell Me What You Want | café order; prompt terminal; briefing clipboard; tuned radio dial | PROMPT; SPECIFIC; CONTEXT; BRIEF; TOKEN; EXAMPLE; ITERATE | `ea5addbad951281602373cfde8d4264326e557a57b63ea2df218d0697316f138` |
| Episode 03 | The Burn Book Problem | gossip notebook; evidence file; magnified contradiction; receipts checklist | HALLUCINATION; CLAIM; EVIDENCE; SOURCE; ASSUMPTION; VERIFICATION; RECEIPTS | `748faf81d9a4c3950946a455c35b7df06a44fb267505c6839ccff0d80d66de52` |
| Episode 04 | The Founding Mothers | algorithm card; frequency radio; moth; labeled-image grid | ALGORITHM; SIGNAL; COMPILER; CODE; AI WINTER; TRAINING DATA; IMAGENET | `2acb3094a6148208688d3a561d18ff4575bab2cc8093b3be122d8436f2a8c986` |

## Built-in image-generation prompt set

Each prompt used the Episode 04 symbol sheet as a **style reference only** and
requested an exact 2 × 2 sprite sheet on a perfectly flat `#00ff00` chroma
background. Every set specified the shared palette—`#FC0292` hot pink,
`#FFE223` yellow and `#1CE0FF` cyan—plus chunky, readable, hand-painted 1990s
comic silhouettes, no words, no people, no speech bubbles, no generic AI brain,
no extra decoration and sufficient padding for clean background removal.

- **Trailer subjects:** folded town map with route and pin; straight-on VHS;
  laminated Resident Card; portable radio with antenna and broadcast arcs.
- **Episode 01 subjects:** three CRT monitors with differing answer patterns;
  office computer/new-hire badge/inbox; dot-matrix generated pages; stacked
  circuit-model core.
- **Episode 02 subjects:** café cup and detailed order ticket; prompt terminal
  with input field/cursor/instruction lines; briefing clipboard/example/pencil;
  radio tuning dial locked to one station.
- **Episode 03 subjects:** spiral gossip notebook with torn label and lipstick
  mark; evidence folder/documents/warning; magnifying glass over contradicted
  line; curled receipts checklist with source-link and approval mark.

The built-in outputs were copied into this project, converted to alpha PNGs
with the standard chroma-removal helper and validated for transparent corners,
non-empty alpha bounds and plausible subject coverage before use.

## Verification

- all MP4s decoded as 960 × 540, 60 fps and 6.4833 seconds;
- encoded final-title frames were visually inspected for upright orientation,
  exact issue labels/titles, clean background terms and unobstructed wordmark;
- encoded first-symbol frames were visually inspected at delivery resolution;
- source contact sheets cover all four symbol cycles and the final title beat.

## Evergreen six-symbol transition proof

**Status:** VERIFIED LOCALLY — OWNER REVIEW REQUIRED  
**Date:** 2026-07-29

The same builder now also accepts variable symbol counts and a horizontal
transparent symbol strip. The evergreen proof uses six icons in this exact
order: VHS tape; cassette tape; CD-ROM; floppy disk; old CRT monitor; Polaroid
camera. The lowercase `i` appears at the beginning and end only. Between those
points, every icon changes directly into the next as one continuous centre
character. Rotation, opening/closing, sway, moving colour echoes and a
temporary hierarchy shift keep the centre alive through the full sequence
without adding a persistent ring around the objects. The centre sits at the
letters' vertical midpoint. Smooth neon bloom, restrained chromatic trails,
radial light at switching peaks and soft exposure movement create the clean
electric finish seen in the reference. A rejected literal VHS pass with grain,
scanlines, tracking tears and jitter is not part of this candidate. Alternating
expansion/compression arcs now reach 1.66× and 0.58×, making the centre visibly
change size between states. The opening begins on a clean comic plate, reveals
the lowercase `i` first, then expands the exact wordmark outward from the centre;
there is no blurred placeholder or left/right wordmark slide.

- Output:
  `continuous-i-evergreen-six-clean-electric-v10.mp4`
- Dimensions / rate / duration: 960 × 540; 60 fps; 4.6667 seconds
- Frames: 280
- SHA-256:
  `05a52c003ecf0b0caad7dcdb9c056da3b77dd9ee27d9dc67ee0aa7eaf2c1ffa3`
- Visual verification:
  the 16-state contact sheet confirms one opening `i`, all six elevated icon
  states and one closing `i`; decoded final-frame inspection confirms the
  lower-left `D` seam is removed.
- Opening verification:
  `continuous-i-evergreen-six-clean-electric-v10-opening-check.jpg` confirms a
  clean background, centre-first `i` and outward wordmark reveal with no ghost.
- Approval boundary, superseded 2026-07-30:
  Ali has approved this exact file as the canonical master LAiDIES logo
  animation for a meaningful webpage or Homepage placement. It has not yet
  been inserted, deployed or published; exact placement, responsive behaviour,
  reduced-motion treatment and playback controls remain implementation work.

## Clean-electric recurring set v2

**Status:** DECIDED — EXACT TRAILER / EPISODE MAPPING APPROVED; INSERTION OPEN  
**Date:** 2026-07-29

**Ali decision, 2026-07-30:** the five files below are the canonical
episode-family logo animations in this exact order: Trailer, Episode 01,
Episode 02, Episode 03 and Episode 04. Each keeps the approved clean-electric
LAiDIES motion grammar while its icon sequence changes to symbols specific to
that episode. Future episodes require their own story- and lesson-specific
icon sequence.

The Trailer and Episodes 01–04 have been rebuilt with the approved v10 motion
system while preserving their existing symbols, vocabulary and title lockups.
Every v2 output is 960 × 540, 60 fps, 249 frames and 4.15 seconds.

Shared motion grammar:

- clean comic plate → centre lowercase `i` → outward wordmark reveal;
- lowercase `i` appears only at the beginning and end of the symbol sequence;
- four episode-specific symbols transform directly into one another;
- alternating expansion/compression arcs make scale changes explicit;
- clean optical bloom, chromatic trails and radial switching energy;
- exact episode/trailer lockup after the final complete `i`.

| Variant | Output | MP4 SHA-256 |
|---|---|---|
| Trailer | `continuous-i-trailer-welcome-to-sunnyvaile-clean-electric-v2.mp4` | `a0e258465635aaabb404e0b9128a0a9bb71c5ca19d27d3fd9076df7cc6ece42e` |
| Episode 01 | `continuous-i-episode-01-on-wednesdays-we-do-ai-clean-electric-v2.mp4` | `fe67ced8a2ba78c011e0306afd4171defcc38026d6758c171cbb4bce1181490a` |
| Episode 02 | `continuous-i-episode-02-tell-me-what-you-want-clean-electric-v2.mp4` | `9d048b84e2207dd1ccf2f4c58b9e8b824f39f4c6d122006cf0238d94da120edd` |
| Episode 03 | `continuous-i-episode-03-the-burn-book-problem-clean-electric-v2.mp4` | `436410d4ffbb6c178740ebdd17c4bb2b35a20f694720e2ea5ba74ab9daed7947` |
| Episode 04 | `continuous-i-episode-04-founding-mothers-clean-electric-v2.mp4` | `40053fe3a2af5166b736ebad1496f7c57906e55d0f9552482565a48b70734b99` |

Final encoded title frames were decoded and reviewed together in
`clean-electric-season-family-v2-final-frame-check.jpg`. Ali has approved the
identity family and exact file-to-episode mapping. The files have not yet been
inserted into film masters; insertion, export and full-film verification
remain separate production steps.

The checksum-bound machine-readable decision record is
`canonical-logo-animation-family-20260730.json`.
