# LAiDIES building artwork production system

**Status:** ACTIVE
**Trigger:** Ali confirmed that the building redesign requires substantial new
artwork rather than continued reuse of weak, mismatched or merely available
images.

## Current evidence

The workspace currently contains approximately 6,577 raster files under
`assets/`, 419 under `approved-assets/`, and 117 under design explorations.
Those counts do not establish that a useful, approved asset exists for a
specific placement. The existing volume makes provenance, eligibility,
supersession and exact-use control more important—not less.

## Production rule

No champion begins with “which existing image can we fit here?” It begins with:

1. what the visitor needs to understand or do;
2. what the exact placement must communicate;
3. whether the visual is an environment, operated object, character,
   content illustration, state/result, transition or responsive crop;
4. what approved references govern style, identity, setting and palette; and
5. whether a new asset is required.

When a new asset is required, the champion may commission and generate it
through the image-production director. Generated candidates remain
`CANDIDATE`, never `APPROVED`, until an independent image-quality judge passes
the exact file for the exact placement.

## Required asset record

Every new image receives:

- stable asset ID and owning product;
- exact page, state and placement;
- user/product purpose;
- output dimensions, aspect ratio, safe zones and required desktop/mobile
  variants;
- subject, setting, composition and interaction affordance;
- approved reference files with an explicit role for each;
- locked character/canon requirements;
- LAiDIES style, palette, material and texture requirements;
- exact text policy—functional typography should normally remain live HTML/CSS
  rather than generated pixels;
- must-have, must-preserve and avoid lists;
- accessibility fallback and meaningful alt-text intent;
- generator/tool, final prompt, input references and generation date;
- source candidate, iterations and reject reasons;
- full-resolution image-quality verdict;
- brand/canon and exact-use verdict;
- consuming code path and fallback behavior; and
- final status: `BRIEFED`, `GENERATED`, `REJECTED`, `REVISE`, `CANDIDATE`,
  `APPROVED FOR EXACT USE`, `INTEGRATED`, or `SUPERSEDED`.

## Artwork families

Each building champion inventories only the families its product needs:

| Family | Purpose | Typical outputs |
|---|---|---|
| Hero environment | Establish a distinct SUNNYVAiLE place and primary visual hierarchy | one wide authored room, mobile composition/crop, quiet fallback |
| Operated objects | Make the building's function the page mechanic | shelf/book, map, counter/menu, phone, radio, mailbox, desk, display case and state variants |
| Character presence | Give the building a credible host or resident without identity drift | approved character pose/expression/state variants tied to a locked identity |
| Content/learning illustration | Clarify a concept, story or task | mechanism, comparison, example, result and misconception visuals |
| Product/result imagery | Show what the visitor receives or changes | Study Pack, card, reading, programme, makeover, receipt, playlist or exhibition state |
| Transition/motion source | Supply approved first/last frames and meaningful object motion | panel/page/ink/halftone/lettering states; no generic drift |
| Responsive/accessibility | Preserve purpose on compact screens and failures | authored mobile variant, crop-safe source, reduced-motion and image-failure fallback |

## Quality gate

The independent image-quality judge reviews every candidate at full
resolution for:

- composition and placement fit;
- subject/character identity and anatomy;
- background, period and SUNNYVAiLE setting;
- locked illustration style and faceted dimensional lighting;
- palette and brand contribution;
- generated text, logo and signage defects;
- object continuity and interactive readability;
- desktop/mobile crop behavior;
- artifacts, repeated motifs, warped geometry and accidental clutter;
- narration/content alignment where timed media is involved; and
- resemblance to rejected, superseded or off-limits work.

Any failure in identity, setting, style, purpose or exact-placement
communication requires replacement or targeted revision. Filtering or color
grading does not repair the wrong character, wrong room or wrong idea.

## File handling

- Candidate work stays under the owning isolated design-exploration folder.
- Rejected outputs move into a `_rejected/` child with the verdict; they never
  remain mixed with candidates.
- Superseded candidates move into `_superseded/`.
- Only exact-use-approved finals are copied into a production asset path.
- Existing approved assets are never overwritten; new work uses versioned
  filenames.
- The product dossier retains the prompt, reference roles, verdict and
  integration record even after a final asset moves.

## Active wave

Library, Visitor's Centre and Blend & Snap must each deliver:

1. a complete placement inventory;
2. a ranked new-art requirement;
3. precise production briefs;
4. generated or otherwise produced candidate art;
5. independent full-resolution verdicts;
6. an isolated responsive page candidate using only passed candidates or
   truthful fallbacks; and
7. a narrow integration packet.

The same pipeline then travels through the remaining building waves. Episode
and trailer artwork retains its additional narration-to-image timing,
character-continuity and motion gates.
