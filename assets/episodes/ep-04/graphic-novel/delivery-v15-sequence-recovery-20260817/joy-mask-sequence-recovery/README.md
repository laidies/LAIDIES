# Episode 04 — Joy mask sequence recovery

Status: `SOURCE RECOVERED / PRE-ACTION FRAME HELD / NOT ANIMATED / NOT INTEGRATED / NOT PUBLIC`

## What is wrong in v14

The current five-second source `ep04-cue47-local-motion-v1.mp4` is looped across the Joy occurrence. Its moving detection bar leaves the monitor, crosses Joy and the surrounding room, then repeats. That motion is rejected.

## What was recovered

The earlier `ep04-scene-11-checkers-v4-narration-sync-v3-story.mp4` is not lost. It contains the intended action of Joy raising a white mask toward the camera. Its pixels are retired because the sequence uses the old pixel-art visual system and a superseded group composition. It may be used only as motion and timing reference.

The exact adult graphic-novel Joy source used by the current episode has been recovered here as `ep04-scene-11a-joy-adult-graphic-novel-mask-source-v15.png`. It preserves Joy, the mask, MIT setting, wardrobe and monitor composition. It is the only permitted visual source for the replacement shot.

Two attempts to derive the required pre-action state were rejected before animation. Both changed the locked camera/composition instead of performing the local mask edit. They are retained under `_rejected/` and must never be used in an episode candidate:

- `pre-action-v1-recomposed-rejected.png` — SHA-256 `5a2f6b8ca0a4d679b863ec5a698e32d2e7d20b0d48c02c8212960b1f49795298`
- `pre-action-v2-reframed-rejected.png` — SHA-256 `aaf4da9e44c6ccf7c2d3c7e9090d6f148afb69afbd3a1074367802a20f019842`

The image-generation approach is stopped after those two failures. The next attempt must be materially different: a Canva maker works from the exact mask-up frame and the recovered action reference, with no additional generated still. If Canva cannot create a clean one-shot without changing Joy, the sequence remains held.

## Canva maker job

Create one non-looping image-to-video shot from the recovered adult graphic-novel still. Joy and the plain white mask remain the subject. The action is a deliberate mask demonstration, not a decorative interface effect.

1. At `00:15:06.260`, establish Joy at MIT with the failed red detection state contained inside the monitor. The mask must not yet be raised beside her face.
2. Hold the failed state through `00:15:15.440` while the narration says the software cannot see her dark skin.
3. From `00:15:16.480` to `00:15:19.740`, Joy deliberately raises or presents the white mask toward the camera/screen. The monitor changes from failed red detection to successful green detection only when the mask reaches the detection position.
4. Hold the exact accepted mask-up source through `00:15:28.180`, covering the proof that commercial systems fail hardest on darker-skinned women.

The animation must be created in Canva. CapCut may only assemble the accepted clip into the title.

## Fail closed

Reject the candidate if any of these occur:

- any bar, bracket, glow, particle or line leaves the monitor surface;
- the detection effect crosses Joy, the mask, the desk, the wall or the full frame;
- the effect loops or visibly resets;
- Joy's face, skin tone, hairstyle, red glasses, jewellery, hands, mask, clothing or background drifts;
- a second person, second mask, extra limb, phantom hand or malformed anatomy appears;
- the camera pans, zooms, shakes or reframes;
- text is generated or altered;
- the source becomes pixel art, cartoon, glamour illustration or any style other than the locked adult graphic novel;
- the white-mask action begins before the narration names the mask;
- the replacement is shown to Ali before maker inspection confirms zero visible defects.

The still-only red-to-green fallback does not satisfy the requested mask action and is not release-ready. Do not substitute another generated Joy image or restore the retired pixel-art sequence.
