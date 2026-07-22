# The weekly cycle — what actually has to happen every week

*From Ali, 2026-07-22. This is the spine the Wednesday Engine has to run.*

## 🔴 THE FAILURE THAT MATTERS MOST — Ep5

> *"this has totally failed for ep 5. nothing is meeting the LAiDIES standard. it's explaining
> things in a terrible way etc. so i had to stop it and not picked it up. i don't want that to
> happen again."*

**Ep5 is stopped at STAGE 1.** Not at art, not at video — at the master file. The teaching was
bad, so everything downstream was worthless before it started.

⚠ There is already a ship-check gate (`operations/check-episode.sh`) and it **passes episodes
that fail Ali's bar** — see [[ep5-usefulness-critique-2026-07-10]]: *"Ep5 keeps failing Ali's
USEFULNESS bar even when the gate says SHIP."* The gate measures structure and consistency. It
does not measure **whether the teaching is any good**.

**This is the single most important thing for the engine to fix.** Everything else in this
document is downstream of it. Producing 20 surfaces from a bad master file is 20× the waste.

---

## STAGE 1 — the master file (BLOCKING GATE)
`content/episodes/episode-0N.canon.md` is the source of truth. Nothing downstream starts until
it passes.

**The gate must test TEACHING QUALITY, not just structure:**
- Does it explain the thing *plainly*? Would a smart woman with no CS background get it?
- Does the analogy GARNISH or does it CARRY? If deleting the analogy breaks the explanation,
  the explanation was never there.
- Is it genuinely useful, or does it only *sound* useful?
- Is every fact verified with a source and a date?
- Is it current? (Never teach stale AI.)

⚠ The existing structural check still runs — but passing it is not passing.

## STAGE 2 — the two scripts
Both DERIVED from the master file, never written independently.
- **Narration script** — `operations/audio/episode-0N-elevenlabs-v3-tagged.txt`. Locked format:
  cast, structure, signature lines, TTS tags. Ends *"See you next Wednesday… in Sunnyvale."*
- **Written article** — the read version.

## STAGE 3 — audio, then the timing map
Narration recorded → `transcribe.py` + `align.py` → every line gets a true start/end second.
**Everything visual is placed off this clock, never guessed.**

## STAGE 4 — images
`build-art-batch.py` reads canon + cut + timing map. Continuity anchors, likeness from approved
frames, outfit from canon, existing-asset check first.
⚠ **The 22 July batch returned ~2 usable of 18.** Do not scale this until conditioning is
fixed — see the LoRA recommendation in the agent-operations-playbook, section D/FM2.

## STAGE 5 — the cut, motion, export
Cue sheet → CapCut → motion (`ep04-capcut-motion-brief.md`) → export → captions → `watch.html`.

---

# STAGE 6 — EVERYTHING ELSE THE WEEK OWES
**This is the part that gets forgotten.** Ali's list, verbatim in substance:

| Surface | What's owed each week |
|---|---|
| **Study Pack** | The BUNDLE — Try-On + printable cheat sheet + cards. Not just cards. |
| **Charms around town** | New charms hidden in town images for members to hunt |
| **Song** | The week's Wednesday Anthem |
| **Quiz** | Pop quiz at SUNNYVAiLE High, deep-linked to the episode |
| **Vocabulary** | New terms → the Glossary / Vocab 101 |
| **Cocktail-party explanation** | The "how to say it at happy hour" version |
| **Mall stores** | New references / items in the relevant shops |
| **Closet items** | New things members can add — flair, objects |
| **Charm bracelet** | Another bracelet / new charms to collect |
| **Trading cards** | The week's concept + character cards |
| **Page ingestion** | Every page that reads episode data — the bag, the index, the shelves, the rails |

⚠ **Episode copy already lives in ~5 files plus art** ([[episode-content-sync-surfaces]]).
Adding a surface without updating all of them creates silent drift. The engine must derive
these from canon, not have someone remember them.

---

## What the engine has to guarantee
1. **Nothing downstream starts until Stage 1 passes a REAL quality gate.**
2. **Every Stage 6 surface is derived from canon**, so none can be forgotten.
3. **Ali approves at a few gates** — master file, art, final cut — and never as bug-catcher.
4. **A dashboard of what's done and what's outstanding for the week**, in chat.

## What exists already
`check-episode.sh` (structural only) · `transcribe.py` + `align.py` · `build-art-batch.py` ·
`qc-frames.py` · `check-cues.py` · canon files with `cast[]` and `heroine_outfit` ·
`art-requirements.md` · three enforcement hooks · analytics on 134 pages.

**Missing: the orchestrator, and a teaching-quality gate that actually blocks.**
