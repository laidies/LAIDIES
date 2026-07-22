# Ep4 — GRACE HOPPER, corrected likeness (hand to Codex)
*2026-07-21. Two frames. Run them ONE AT A TIME.*

## Why this exists
The Grace frames currently in the episode were generated from a beat description with **no likeness
reference**. The face is invented — a plausible mid-century woman, not Grace Hopper. She is a real
person in an episode about real history, so this matters.

They also put her in **naval uniform with braid** for the 1952 Remington Rand beats, where she was a
**civilian**.

## HER LIKENESS — 1952, age 45

**FIRST: go and look at real photographs of her.** Grace Hopper is extensively photographed and the
images are widely reproduced US Navy / public-domain material. Do not work from imagination.

The three Ali identified as correct, described so you can find them:
1. **Mid-career at the machine** — seated in profile at a keypunch-style keyboard, paper feed and
   mechanism to her right, wearing a **light striped/tweed civilian jacket**, wristwatch on the left
   wrist. Black and white. ← **THE reference for the 1952 compiler beat.**
2. **WAVES head-and-shoulders portrait** — dark service uniform, white-topped naval cap, dark waved
   hair, direct level gaze. 1940s.
3. **Full-length WAVES photograph** — standing outdoors beside a 1940s car; slim build, dark short
   waves under the cap, service jacket with collar insignia and tie, **cross-body shoulder-bag
   strap**, sleeve stripes, gloves held in one hand. ← the reference for any Navy beat.

Also check `operations/reference/real-people/` — if Ali has dropped the files there, use those
directly and match them exactly.

**Then work from this written spec:**

- **Hair: DARK brown to near-black. Short, softly SET waves**, parted and swept back off the face —
  a 1940s–50s set. ⛔ **Never grey, never white.** The white-haired Rear Admiral is decades later.
- Oval face, high forehead, straight nose, level brows. Composed and direct; not stern, not girlish.
- Reads as a woman in her **mid-forties**.
- **1952 = CIVILIAN.** A light striped or tweed jacket over a blouse. Wristwatch on the left wrist.
  ⛔ No naval uniform, no braid, no rank insignia, no cap in these two frames.

> **This is a real person. Her face must be recognisably HER, not a generic figure of the period.**

## Style
Locked comic register — bold black ink, **hard angular shadow planes**, flat vibrant colour, **no
halftone**, realistic anatomy. Reference for RENDERING only (never composition, never its face):
`assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png`
16:9, **1920×1080**. ⛔ No text boxes, speech bubbles or caption bars.

---
## FRAME 1 — THE COMPILER  (replaces the current `grace-b-mid`)
> Canon: *"Talking to a machine was agony — raw code, by hand. She found 'a computer can't understand
> words' a failure of imagination: why should a person have to think like a machine? So she built a
> compiler."*

Grace at the machine at Remington Rand, 1952, **in civilian dress**. She is working — one hand at a
keypunch-style keyboard, flow-chart cards and punched tape around her, tube racks and tape reels
behind. Absorbed and competent, mid-thought. Warm machine-room light.

**Out:** `ep04-scene-05-grace-b-mid-comic-v2-likeness-1920.png`

---
## FRAME 2 — THE MOTH  (replaces the current `grace-c-end`)
> Canon: *"The moth taped into the logbook — 'first actual case of a bug being found' — is where
> debugging comes from."*

Grace at a desk, **civilian dress**, writing in the open logbook with the moth taped to the page.
Ruled columns, handwriting, a desk lamp, machine racks behind. Quiet, wry, matter-of-fact — she is
recording something funny and true, not making a discovery.

**Out:** `ep04-scene-05-grace-c-end-comic-v2-likeness-1920.png`

---
## QC
1. Is this **recognisably Grace Hopper**, matched to the reference photos — not a generic period woman?
2. **Dark set waves, mid-forties. NOT grey, NOT elderly.**
3. **Civilian jacket — no uniform, no braid, no insignia, no cap.**
4. Same woman in both frames — same face, same hair, same jacket.
5. Locked comic register, no halftone. No text boxes. No gibberish text. 1920×1080.

⚠ **Do not overwrite the existing files.** These are `-v2-likeness` and Ali chooses whether to swap.
