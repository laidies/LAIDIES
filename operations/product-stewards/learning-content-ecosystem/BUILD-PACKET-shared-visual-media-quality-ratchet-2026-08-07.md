# Shared visual-media prevention and quality ratchet

**Status:** BUILT LOCALLY — shared producer/admission gate active; surface release adoption open

**Owner:** Learning System & Concepts Director with Brand/visual and destination owners

**Owner task:** `019f9f7f-9e4c-72d2-8882-447bcbe01691`

**Evidence time:** 2026-08-07

## Visitor outcome

Every public LAiDIES image or animation must belong to its destination, perform
the same meaning job as its accompanying text or narration, and depict the
named character, town/place, period, clothes, accessories, objects and action
truthfully. Attractive but decorative, confusing, impossible or unrelated art
fails.

## Prevention before generation

Before producing a still or animation, the maker binds:

1. exact placement, scene purpose, viewer understanding and visual job;
2. exact accompanying text, narration, caption or silent purpose and locator;
3. destination/location style authority and the applicable positive exemplar;
4. every current negative visual exemplar by exact registry SHA;
5. canon people/place, identity or historical likeness, era, age, wardrobe,
   accessories, required objects, physical relationships and prohibited
   contradictions;
6. a semantic object map—every dominant person, object, gesture and overlay has
   a reason to be present;
7. a text plan: clean art plus deterministic editable text by default; and
8. for motion, its visible event, semantic job and classification as loop,
   transition, one-shot or ambient action.

Executable gate:

```sh
node scripts/check-visual-media-producer-contract.mjs path/to/producer-contract.json
```

This is render authority only. It does not say a model will obey the brief or
that the output is good.

## Exact rendered review

After generation, the maker inspects the exact rendered artifact at intended
size. A role-distinct reviewer then inspects the same exact bytes artifact-
first. Both bind the producer contract, companion copy/audio, rendered evidence
and visible observations for meaning alignment; destination style/location;
character/town identity; anatomy/physics; text; period/wardrobe/props; dominant
object purpose; and real-size legibility.

Animation additionally binds decoded representative frames and the final
occurrence clock, then judges meaningful motion, narration timing, cross-frame
continuity and loop/transition/one-shot truth. Source-clip approval cannot
approve a later crop, trim, overlay or assembly.

```sh
node scripts/check-visual-media-admission.mjs path/to/review.json
```

Checksums prove which pixels were reviewed. They cannot prove the pixels have
good anatomy, truthful period detail or semantic fit; those remain explicit
human visual judgments. A prompt, filename, cue label, declared `PASS`, contact
sheet or media manifest cannot substitute.

## Known failures now consumed

`visual-media-quality-exemplars.json` binds eleven cross-surface failure
families: style drift; canon/location drift; impossible object geometry;
phantom anatomy; gibberish/false text; era/wardrobe/prop drift; narration
mismatch; decorative or counter-narrative visuals; static motion cheats;
loop/motion-class errors; and final-occurrence drift.

The stale instruction requiring all text inside generated art was removed from
`operations/art-requirements.md` and the episode batch builder. The governing
default is now clean art plus deterministic editable text. Purpose-built
lettering remains possible only with exact-copy review.

## Learning loop and ratchet

PASS records no new reusable defect. HOLD/REJECT identifies an evidence gap,
candidate-only repair or a reusable defect pending Learning-owner admission.
A verified reusable defect updates the shared registry; its new SHA invalidates
unstarted producer records. Feedback never auto-edits, publishes, unpublishes or
retires media.

Targets: repeated known defects 0; objective defects first discovered by
independent review 0; review issues and cycles strictly lower than the preceding
comparable candidate until first-pass acceptance is normal.

## Verified calibration

- `node scripts/test-visual-media-producer-contract.mjs` accepts one complete
  contract and rejects ten bypasses, including stale registry, missing companion
  meaning, missing style/era, omitted physics/anatomy/text learning, unsafe
  generated text and animation without a semantic event.
- `node scripts/test-visual-media-admission.mjs` accepts producer and independent
  review controls and rejects thirteen false passes including phantom limbs,
  impossible laptop geometry, gibberish, anachronism, narration mismatch,
  decoy bytes, maker-as-judge, incomplete/late calibration, missing producer
  self-review, flat successor ratchet and a silent learning disposition.
- `node scripts/test-media-defect-fixtures.mjs` verifies all sixteen media
  failure categories and proves the corpus itself can fail.
- Existing episode brief and loop self-tests still separate their controls.

## Ownership and open integration

Learning System owns the shared registry, producer/review record shape and
cross-surface learning loop. Brand/visual and destination owners decide whether
the real pixels fit their surface. Episode Media owns timed film occurrences;
Classes owns narrated learning experience; NewsStand owns publication art;
building owners retain D-096 design admission; other product owners own their
rendered uses.

The shared gate is now in CI calibration and standing producer instructions.
It is not yet bound into every historical image/animation source and release
command. Until that coverage inventory is complete, a route without an exact
producer/review chain remains a known integration gap—not implied approval.

No image, animation, narration, page, route, deployment or public artifact was
created or changed by this build packet.
