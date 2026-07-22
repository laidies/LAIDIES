# Ep4 — VIDEO ASSEMBLY

> 🔴 **RE-EXPORT REQUIRED (2026-07-22).** `episode-04-full-v1.mp4` was
> built from an EARLIER cut. Ali changed the intro: the THIS WEEK 4-panel teaser is OUT,
> the title card carries 0:14–0:41, and the SUNNYVAiLE street moved to 1:42.
> Rebuild from the current shot list and export as `episode-04-full-v2.mp4`. (Codex · CapCut) · regenerated 2026-07-21

> **PATH ROOT:** relative to **`Website-homepage/`**.

**Job:** assemble and export the Episode 4 video. **Every timing decision is already made** —
this is execution, not judgement. Do not re-time, re-order, or substitute images.

## INPUTS
- **THE EDIT — 57 shots, exact IN/OUT:** `operations/ep04-shot-list.md`
- **Same edit, machine-readable:** `content/episodes/episode-04-cues.json`
  (`t` = IN point in seconds · `src` · `type` · `label`. A cue runs until the next cue's `t`.)
- **Narration — THE CLOCK:** `content/music/episode-04-narration.mp3` — **20:22.40**
- **Stills:** `assets/episodes/ep-04/pixel/`
- **Clips:** `assets/episodes/ep-04/clips/`

## BUILD
1. Narration on the timeline first. **It is the clock — never stretch or trim it.**
2. Place each shot at its exact IN point; it runs until the next shot's IN.
   The final shot runs to **20:22.40**.
3. **Video cues** (`type:"video"`) — currently one, Ada at **04:10.30**. The clip is a **5s
   seamless loop**: set it to loop for the full cue duration and play at **0.5× speed**.
4. **Stills** hold. A barely-perceptible slow zoom (~1.05× Ken Burns) is welcome, not required.
   🔴 **NEVER scale, zoom or reframe a shot with BAKED-IN TEXT.** That is every era/`tj-` card, every
   `emph-` word-burst, every `concept-` card and the title card — **10 shots in this cut.**
   In v1 the Ken Burns on `LONDON, 1843` cropped it to "NDON, 1843". These are 1920×1080 and must be
   placed **1:1, no scale, no crop, no motion.**

## TRANSITIONS — restrained on purpose
- Between shots: **short cross-dissolve, 0.4–0.5s**. Nothing else.
- ⛔ NO wipes, slides, spins, page-curls or decorative transitions — they fight the comic grammar.
- The **`PLACE, YEAR` cards ARE the transition** for era changes. Never put an effect on one.
- Only permitted flourish: a **~0.3s dip toward black immediately BEFORE each time-jump card.**

## SYNC CHECKPOINTS — verify these land on the narration
| Time | Card |
|---|---|
| 04:05.30 | LONDON, 1843 |
| 05:41.55 | HOLLYWOOD |
| 07:17.30 | PHILADELPHIA |
| 09:00.55 | PHILADELPHIA, 1952 |
| 10:27.62 | DARTMOUTH, 1956 |
| 11:16.70 | CAMBRIDGE, 1972 |
| 12:44.98 | FEI-FEI |
| 14:55.65 | 2018–2021 |

Also: **09:35.00** Grace's compiler beat · **10:15.00** the moth (locked to an exact narration
cue — if this one drifts, the edit is wrong) · **13:17.00** Fei-Fei "millions upon millions".

## EXPORT
**1920×1080 · 30fps · H.264 MP4**, high quality → `assets/video/episode-04-full-v1.mp4`

## ⛔ DO NOT
- Do NOT re-time, add, drop or substitute shots.
- Do NOT add music under the narration, titles, captions or lower-thirds — all text is in the art.
- Do NOT colour-grade or filter the frames.

---
# 🌀 THE TIME-JUMP TRANSITION — approved by Ali 2026-07-22

**The problem:** the era changes are currently a hard cut to a caption card. Ali: *"there should be
a proper transition or something that happens that makes it seem we are going back in time. not just
a slide that says london 1843."* And at the LUMINAiRY the narration says **"lights go soft"** while
nothing on screen changes — the picture contradicts the voice.

**The device: the stained-glass window is the portal.** She is standing in the LUMINAiRY looking up
at Ada in stained glass. We go back THROUGH the glass. It is motivated by what is already on screen
and it makes the building the mechanism of the flashback.

## A · THE FULL TRANSITION — only at the first jump (into LONDON, 1843)
Built from frames that already exist. **No new art. This is an edit.**

Over `ep04-open-18-grace-looks-up-at-ada-maivens` (4:00) into the era card (4:05.30):

1. **Lights go soft** (~1.5s) — dim the whole frame maybe 25–30%, warm it slightly, and let the
   candle flames flicker down. This must land ON the narration line "lights go soft."
2. **The window wakes** (~1s) — the rose window and Ada's panel brighten from within while the rest
   of the hall keeps dimming. Everything falls away except the glass.
3. **🌀 THE SWIRL** (~1.5s) — the glow spirals inward, a slow clockwise vortex pulling the stained-
   glass colours into the centre. Blues and golds smearing into the spin. This is the beat that reads
   as *time travel* rather than a dissolve — Ali: *"like a swirl or something."*
4. **Bloom to white** (~0.5s) — the swirl blows out to a warm white.
5. **The era card RESOLVES OUT OF THE LIGHT** — `LONDON, 1843` fades up inside the bloom rather than
   cutting in. **Era cards stay** (Ali confirmed); they just stop being the whole transition.
6. **Recede** (~1s) — the white pulls back and Ada's study is there.

## B · SHORTER VERSION — every later era jump
HOLLYWOOD · PHILADELPHIA · PHILADELPHIA 1952 · DARTMOUTH 1956 · CAMBRIDGE 1972 · FEI-FEI · 2018–2021.

These do not come out of the cathedral, so use the **swirl + bloom only** (~1.5s total): the outgoing
frame's highlights spiral inward, bloom to white, the era card resolves, then the new scene.
Same visual grammar, a third of the length — it becomes a motif instead of a set piece.

⚠ Keep it TIGHT. Seven of these; if each runs long the episode drags. The first one earns its length
because it is the doorway into the whole flashback.

## C · WHAT THIS REPLACES
⛔ The current "dip toward black before each time-jump card" — the swirl supersedes it.
✅ Everything else in TRANSITIONS above still holds: 0.4–0.5s cross-dissolves between ordinary shots,
no wipes, no spins, nothing decorative anywhere else.

---
## ⚠ BEFORE YOU START — two batches may still land
1. `operations/codex-prompts/ep04-missing-beats-batch.md` — 4 owed comic beats
   (AI-winter ×2, Dartmouth naming ×2).
2. Ambient 5s loops being made in Canva (see `~/Desktop/ep4-animate/README.txt`).

If either has landed, `episode-04-cues.json` and the shot list will have been regenerated —
**always build from the shot list as it exists when you start**, and check its shot count
matches the header. If they have not landed, assemble what is here; both are additive.

QC: runtime = **20:22.40** · every checkpoint above in sync · Ada's clip loops with no visible
restart · no decorative transitions · no effect stacked on a time-jump card.

---
# 🎬 ADA — RE-ORDER (Ali, 2026-07-22, watching v1)

**What was wrong in v1:** the LONDON card cut away almost immediately, the animation then ran
**49.7 seconds** as a loop (*"the animation just loops a bunch and looks bad"*), and the punched-card
close-up came AFTER the animation instead of before it.

**Also:** Ada has FOUR distinct comic beats on disk; only two were wired.

**Place these BY EAR against the narration waveform — not by shot-list timecodes.** Ada speaks in
first person; the cues are verbatim from the recording.

| # | Shot | Cue |
|---|---|---|
| 1 | `ep04-transition-ada-timejump-london-1843-…` (era card) | **Hold until Ada speaks** — *"I looked at it and saw something else entirely."* Do not cut early. |
| 2 | `ep04-scene-03-ada-a-start-comic-v1-locked-1920.png` | She takes in the Engine — *"everyone else saw an expensive adding machine"* |
| 3 | `ep04-scene-03-ada-comic-v4-timnit-style-lock-black-gloves-1920.png` | Ada at the Engine — hero/likeness shot |
| 4 | `ep04-scene-03-ada-b-mid-comic-v1-locked-1920.png` — **punched-card close-up** | The instructions beat. **BEFORE the animation.** |
| 5 | `ep04-scene-03-ada-loop-v1.mp4` — the music-note animation | ⭐ **PLAY ONCE** on ***"It could work with symbols. It could set them to music."*** ⛔ **DO NOT LOOP IT** — see below. |
| 6 | **FREEZE-FRAME of the clip itself** | The instant the clip ends, use CapCut's **freeze frame on its own final frame** and hold to the HOLLYWOOD jump. ⛔ **Do NOT cut to `ada-c-end` or any still file** — Ali confirmed the still is neither the first nor the last frame of the clip, so substituting it would be a visible jump. Freeze the video, not a picture. |

---
# 🔴 THE LOOP RULE — applies to EVERY animated clip in this project

> **Ali, 2026-07-22:** *"because the notes go toward you the loop is jarring because it just jumps
> back. If we loop, the start and end have to be indistinguishable."*

**A clip can only be looped if it has ZERO NET TRAVEL** — the last frame must be indistinguishable
from the first. That means:

| ✅ LOOPABLE — motion in place | ⛔ NOT LOOPABLE — directional travel |
|---|---|
| flicker · pulse · glow breathing · shimmer | anything drifting **across** or **toward camera** |
| candle flames, panel lamps, screen glow | notes/particles flowing outward |
| rain on glass (continuous, no start) | smoke rising, a wipe, a build |

**If a clip has directional motion: PLAY IT ONCE, then hold its final frame as a still.**
Never loop it. Never stretch it. The still must be the clip's own last frame so the freeze is invisible.

Ada's music-note clip is the exact case — the notes travel toward the viewer, so looping snaps them
back. Played once on the line, then frozen, it reads as intended.

**And even for genuinely loopable clips: max ~2 cycles (~20s).** A 5s loop at 0.5× is 10s per cycle.
Longer beats hold a still for the remainder.

## ⚠ CLIPS AND THEIR SOURCE STILLS ARE NOT THE SAME IMAGE
Ali, 2026-07-22: the Ada clip's frames do **not** match `ada-c-end` — not at the start, not at the end.
Canva reframes/re-renders when it animates, so **a clip's source still is not a usable substitute for
any frame of that clip.**

Consequences for this cut:
1. **To hold after a one-shot clip, use a FREEZE FRAME of the clip.** Never cut to the source still.
2. **Never place a clip and its source still adjacent** — they read as two different pictures of the
   same scene and the cut looks like a mistake.
3. This applies to every Canva clip in the project, not just Ada's.
