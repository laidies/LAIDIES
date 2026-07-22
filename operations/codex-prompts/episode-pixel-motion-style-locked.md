# Episode pixel-video motion style — LOCKED

Status: **APPROVED / production standard**  
Applies to: all LAiDIES episode scenes rendered in the videogame pixel-art format.  
Approved reference master:
`assets/episodes/ep-04/pixel/ep04-scene-05-grace-narration-sync-v10-locked.mp4`

Do not revive earlier Episode 04 animation experiments. The v10 Grace master is the motion,
editing, pacing, and stability reference for future scenes and episodes.

## Image style

- Cinematic 16:9 videogame pixel art, delivered at 1920x1080 or larger.
- Visible pixel clusters and controlled dithering; realistic proportions and facial features.
- Match the approved episode keyframes and the five pixel-art style references.
- Characters must remain visually consistent across shots. Generate a separate stable keyframe
  for a genuinely different action or pose.
- Never manufacture character movement by warping, optical-flowing, stretching, or blending limbs.
- Never allow a generative pose change to make the background, face, furniture, or costume shimmer.

## Story coverage and pacing

- A long narration beat must use multiple purposeful shots. Do not ask one still image to carry
  30–90 seconds with only ambient flicker.
- **Per scene, select only 1–2 shots for full character/action animation.** This is an animation limit,
  not an image limit: all remaining story shots stay in the edit as stills or receive only subtle,
  source-native ambient motion.
- Do not manufacture a five-second animation for every still. Spend full motion on the scene's decisive
  action; let setup, detail, reaction, and consequence frames breathe as stable editorial coverage.
- Prefer distinct story moments: setup, action, response, detail, consequence.
- Typical stable shot length: about 4–15 seconds, adjusted to the narration.
- When a person must perform a new action—handing over paper, reviewing it, writing, looking up—
  create a dedicated stable keyframe for that action and cut to it.
- Keep every camera move motivated by a subject: a face, document, doorway, machine panel, or other
  narration-relevant detail. Never move toward an arbitrary empty area.

## Camera motion

- Default motion is a very slow, single-direction pan or drift on a stable keyframe.
- Use eased starts and stops. The move should feel deliberate and nearly invisible at first.
- Keep magnification constant during pans whenever possible.
- Do not change crop scale frame by frame on pixel art; it creates shimmer and apparent shake.
- If a zoom is essential, make it slow, use fixed crop geometry, and verify it at playback speed.
- Never use back-and-forth drifting, repeated push-pulls, rapid zooms, or handheld-style movement.
- A spatial transition may pan across one image—for example, from a logbook to the computer panels—
  when both subjects exist naturally in that frame.

## Transitions

- Cut on a narration or story beat when moving to a genuinely new action/keyframe.
- Use a pan instead of an abrupt cut when the source image contains a natural spatial route.
- Default still-to-still transition is a 0.4–0.7 second editorial crossfade. Use a clean straight cut for
  punchlines and decisive action changes, and reserve dip-to-black for an actual time/place jump.
- Build match cuts around faces, documents, screens, machine panels, or a shared dominant shape. Preserve
  eyeline and screen direction. Let a camera drift settle before the transition begins, and start the next
  drift after the crossfade lands.
- Avoid character morphs, long dissolves between different faces, blue flashes, fake stained-glass
  wipes, blur drops, and decorative transitions unrelated to the scene.
- Transitions should never call more attention to themselves than the story.

## Ambient animation

- Ambient movement must come from elements that visibly exist in the source image.
- Computer lights may blink only at detected, existing bulbs. Do not invent glow points.
- Rain, cursor blinks, monitor flicker, dust, page text, and machine indicators are acceptable when
  they belong to the scene.
- Keep ambient loops subtle and seamless, but pair them with real shot changes on long narration.
- Do not deform reels, tape circles, faces, hands, clothing, furniture, or architecture.
- A larger one-time action—such as the moth flight and landing—may sit between quieter ambient
  sections, followed by a stable settling loop.

## Human action

- Use dedicated stills for meaningful pose changes.
- Pens, tools, documents, and props must be naturally held in the generated keyframe.
- Do not draw a substitute prop over a hand after generation.
- Written material must be oriented correctly for the character using it.
- If action cannot be made cleanly, prefer a stable story cut over fake movement.

## Quality-control gate

Before approval:

1. Review a contact sheet covering every shot and transition.
2. Watch all pans and zooms at actual playback speed for shake or pixel shimmer.
3. Confirm characters and backgrounds remain stable within each shot.
4. Confirm ambient effects alter only the intended existing objects.
5. Confirm documents, handwriting, screens, and props face the correct user/viewer.
6. Confirm no shot becomes an extended frozen crop with no narrative or ambient purpose.
7. Export 1920x1080 H.264 beside the source frames; keep approved originals untouched.

## Locked reference details

- File: `ep04-scene-05-grace-narration-sync-v10-locked.mp4`
- Duration: 87.066992 seconds
- Codec: H.264
- Frame size: 1920x1080
- SHA-256: `14690ec7e06f78ea798882d6218cc297616ea0b75b1c84ea5b312cf565fadd40`
