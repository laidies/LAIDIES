# WE-MEDIA-E02-C13-2026-07-26 — exact maker prompts

**Tool mode:** OpenAI built-in `image_gen`  
**Intent:** generate, with five allowed local reference images  
**Final processing:** each 1672×941 built-in output was copied non-destructively
and proportionally resampled to exactly 1920×1080 with macOS `sips`.

## Candidate v01

```text
Use case: illustration-story
Asset type: Episode 02 cue-13 source frame, 16:9 landscape split-panel comparison for 187.60–203.30
Primary request: Create a clean two-state comic comparison that visually explains missing context: the same adult Heroine at her familiar regular café on the LEFT versus an unfamiliar new café on the RIGHT.
Input images: Image 1 is the exact Heroine identity and master people-rendering authority—preserve her unmistakable adult face, blonde wavy shoulder-length hair, blue-grey eyes, mature proportions, refined variable-width black ink, directional hair strokes, and faceted hard-edged shadows. Images 2–4 are environment/depth/lighting references only; never copy their people, faces, signage, brands, or locations. Image 5 is panel-layout grammar only; never copy its characters, text, costumes, or story.
Scene/backdrop: LEFT is warm and familiar: welcoming counter, her usual plain takeaway cup already waiting in a natural habitual spot, subtle accumulated familiarity through repeated-use objects and confident spatial ease. RIGHT is cooler and unfamiliar: distinctly different counter, blank order state, plain drip coffee waiting without personalization, sparse neutral details, and the Heroine visibly realizing the café has no context about her.
Subject: Only the Heroine appears as an identifiable person. Show her in both panels with the exact same face, hair, age, anatomy, outfit and scale. Relaxed knowing body language on the left; mildly uncertain, expectant body language on the right.
Style/medium: Adult graphic-novel illustration matching Image 1: elegant variable-width black ink, fine directional strokes, crisp anatomy-informed facial linework, rich clean color, restrained print texture, multiple faceted hard-edged light/shadow planes, dimensional depth, no painterly blur, no glossy 3D finish, no flat-vector face.
Composition/framing: Clean equal split panel with a strong vertical gutter, left-to-right reading order, medium-wide waist-up view in both states, same camera height and character scale so only context changes. The difference must read instantly without labels.
Lighting/mood: warm amber-gold familiarity on left; cooler blue-teal morning unfamiliarity on right, while skin stays clean and naturally lit with neutral/cool grey comic shadows.
Constraints: exact 16:9 landscape; text-free clean art; no captions, dialogue, logos, wordmarks, signs, legible packaging, watermarks, brands, Blend & Snap, JoJo, barista, extra people, mascot, or unapproved character. No fake text or symbols. Do not imitate any rejected Episode 02 café art. Preserve identity and adult anatomy; hands natural and unobtrusive; no distorted cups or counters.
```

## Candidate v02

```text
Use case: illustration-story
Asset type: Episode 02 cue-13 source frame, alternative 16:9 split-panel source candidate
Primary request: Render the same adult Heroine in a clear BEFORE/AFTER-style comparison: LEFT, she arrives at a familiar regular café where her usual takeaway cup is already waiting at the handoff point; RIGHT, she arrives at a different unfamiliar café where the counter has no prepared personalized order and only a plain generic drip-coffee setup.
Input images: Image 1 alone governs the Heroine’s exact identity and adult graphic-novel people style. Images 2–4 govern only environment depth, architecture, inked scene construction and lighting; do not copy their characters, signage, brands or locations. Image 5 governs only clean sequential-panel comparison grammar; do not reproduce any person, costume, lettering or story from it.
Scene/backdrop: LEFT feels lived-in and warmly habitual—wood counter, morning sunlight, a single unmarked lidded cup already positioned for her, a familiar chair and small personal rhythm details. RIGHT feels newly opened and context-free—cool blue-grey counter, empty handoff space, generic glass drip carafe and an unmarked empty cup separated from her, sparer surroundings.
Subject: The Heroine is the only person, shown once per panel. Keep her face, blonde wavy shoulder-length hair, blue-grey eyes, butterfly clips, adult age, anatomy, black blouse and scale identical. Left pose: easy smile and relaxed recognition. Right pose: polite uncertainty, open empty hand gesture toward the unprepared counter—not anger.
Style/medium: crisp adult graphic-novel art matching Image 1—variable black ink contours, fine directional hair/fabric strokes, dimensional anatomy, refined eyes/nose/lips, faceted hard-edged planes, rich color and restrained printed texture; no painterly blending, flat vector face, glossy 3D, airbrush or posterized skin.
Composition/framing: Equal two-panel horizontal frame with one bold vertical black gutter, same eye-level medium-wide camera and matching character scale. Keep key cup/context objects visible in the lower third. Immediate left-to-right warm familiar → cool unfamiliar read.
Lighting/mood: amber-gold left; cool teal-blue right; neutral/cool grey facial shadows, clean light skin, no muddy bronze shading.
Constraints: 16:9 landscape; completely text-free; no captions, dialogue, logos, signs, brands, wordmarks, fake lettering, watermarks, Blend & Snap, JoJo, barista, extra people, mascots, named café, real café brand or rejected Episode 02 imagery. Natural hands, cups and counter perspective. Do not put any readable marks on cups or equipment.
```

## Candidate v03

```text
Use case: illustration-story
Asset type: Episode 02 cue-13 16:9 comic source candidate, variant three
Primary request: Make an immediately legible two-panel visual analogy about context. LEFT: the recurring adult Heroine reaches naturally for the exact plain lidded cup already waiting for her at a warm familiar café counter. RIGHT: the same Heroine stands at a cooler unfamiliar café counter with no prepared order, looking politely expectant while only a generic drip carafe and stack of blank cups sit farther away.
Input images: Image 1 is the sole authority for the Heroine’s identity, face, mature anatomy and people-rendering style. Images 2–4 are environment/scene-density/lighting references only; never copy their people, signs, brands or exact places. Image 5 is only panel/gutter/comparison grammar; never copy its people, text, costumes or narrative.
Subject: Only the Heroine, repeated once in each state. Preserve the identical blonde wavy shoulder-length hair, butterfly clips, blue-grey eyes, face structure, adult age, black blouse, proportions and scale. Her left-panel body language is comfortable and automatic; right-panel body language is open, slightly puzzled and patient, never angry or frightened.
Style/medium: sophisticated adult graphic-novel illustration matching Image 1: elegant variable-width black ink, fine directional hair and fabric strokes, refined facial linework, dimensional eyes/nose/lips, crisp faceted hard-edged light and shadow, rich clean color, restrained printed texture, believable depth. No painterly softness, airbrush, glossy 3D, flat vector faces, childish features or posterized skin.
Composition/framing: Exactly two equal vertical panels separated by a clean bold gutter. Same eye-level medium shot and near-identical pose/camera in both panels. Keep the Heroine’s face large enough for identity review and the counter/cup story fully visible. Left-to-right warm familiar → cool unfamiliar.
Lighting/mood: warm honey/amber left; cool blue/teal right; clean skin with neutral cool-grey shadow planes.
Constraints: exact 16:9 landscape; no baked text anywhere; no captions, speech bubbles, dialogue, logos, wordmarks, storefront names, menu words, fake writing, real brands, watermarks, Blend & Snap, JoJo, barista, extra people, silhouettes, mascot, or rejected Episode 02 café imagery. Cups and machines completely unmarked. Natural adult hands with correct fingers; structurally plausible counters and coffee equipment.
```

## Reference order used for all three calls

1. `assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png`
   — exact Heroine identity and master people style.
2. `operations/reference/episode-style-popart/epstyle-scene-02.png`
   — environment only.
3. `operations/reference/episode-style-popart/epstyle-scene-03.png`
   — environment only.
4. `operations/reference/episode-style-popart/epstyle-scene-05.png`
   — person-in-environment construction only; never identity.
5. `operations/reference/comic-book-page-style/comicpage-01.webp`
   — panel grammar only; never identity, text or story.

The globally rejected Episode 02 café images and painterly incumbent were not
opened, supplied, composited, or used as style references.
