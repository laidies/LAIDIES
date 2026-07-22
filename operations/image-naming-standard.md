# IMAGE NAMING & NUMBERING STANDARD
*Proposed 2026-07-21 — solves the three failures that cost a day of production.*

## The problems this fixes
1. **You cannot tell what superseded what.** `comic-v1-locked` is NEWER than `comic-v2-graphic-novel`, because version
   numbers restart every prompt run. Six different words currently mean "this is the good one":
   `fix` · `final` · `fresh` · `locked` · `review` · `master`.
2. **Sequences are invisible.** `a-start`/`b-mid`/`c-end` gives 3 slots, never says "2 **of 3**", and
   nothing records that a 3-beat sequence was supposed to exist. The AI-winter progression
   (2 monitors → 1 → 0) silently lost 2 of its 3 beats and nobody noticed for weeks.
3. **Style generation is buried mid-name**, so "never mix generations" cannot be checked by a script.

## THE FORMAT

```
ep04.s07.b2of3.ai-winter-one-monitor.g3.r02.png
```

Dots separate **fields**; hyphens live only *inside* the slug. Every field is machine-parseable.

| Field | Rule |
|---|---|
| `ep04` | Episode. `ep00` = town/site art not bound to an episode. |
| `s07` | Scene id — **stable, from that episode's `canon.md`**, never renumbered. Non-scene art uses a type instead: `open`, `tj` (time-jump card), `emph` (word-burst), `concept`, `splash`, `char`. |
| `b2of3` | **Beat N of M within a sequence.** Standalone art is `b1of1`. This is the fix for lost sequences — the name itself declares how many beats *should* exist. |
| slug | Human-readable, lowercase, hyphens. Describes the SHOT, never the version. |
| `g3` | **Style generation.** `g1` pixel · `g2` graphic-novel/barsetter · `g3` comic-locked (current). Bump only when the HOUSE STYLE changes, never for a re-roll. |
| `r02` | **Revision within that generation. Highest r ALWAYS wins.** Zero-padded. |

### The two rules that end the confusion
- **Same `ep.s.b` + same `g` → highest `r` is current.** Everything below it is superseded.
  No interpretation, no adjectives, no memory required.
- **Higher `g` beats any `r` of a lower `g`.** `g3.r01` supersedes `g2.r99`. This turns "never mix
  generations" into a one-line check instead of a rule I have to remember and periodically forget.

### Banned in filenames
`fix` · `final` · `fresh` · `latest` · `new` · `locked` · `review` · `master`
— every one of them is an opinion. Use `r`. A number cannot be argued with.

## Worked examples, from real files

| Today | Under the standard |
|---|---|
| `ep04-scene-07-ai-winter-comic-v1-fresh-1920.png` | `ep04.s07.b2of3.ai-winter-one-monitor.g3.r01.png` |
| *(missing beat)* | `ep04.s07.b1of3.ai-winter-two-monitors.g3.r01.png` |
| *(missing beat)* | `ep04.s07.b3of3.ai-winter-dark.g3.r01.png` |
| Grace moth, comic-v2-graphic-novel | `ep04.s05.b3of3.grace-moth-logbook.g2.r02.png` ← superseded |
| Grace moth, comic-v1-locked | `ep04.s05.b3of3.grace-moth-logbook.g3.r01.png` ← current |
| `ep04-emph-left-to-men-comic-v1-exact-text-1920.png` | `ep04.emph.b1of1.left-to-men.g3.r01.png` |

Note what the Grace pair does: the two sort next to each other, `g` says instantly which is current,
and nobody has to know that "locked" outranks "graphic-novel".

Resolution is NOT in the name (`-1920` today). Every deliverable is 1920x1080 — a wrong size is a
defect to fix, not a variant to name. It lives in the manifest.

## THE MANIFEST — what a filename can't carry
`assets/episodes/ep-0N/manifest.json`, one record per image:

```json
{ "file": "ep04.s07.b2of3.ai-winter-one-monitor.g3.r01.png",
  "episode": "04", "scene": "s07", "beat": 2, "beats_total": 3,
  "generation": 3, "revision": 1,
  "supersedes": ["ep04.s07.b2of3.ai-winter-one-monitor.g2.r03.png"],
  "verdict": "correct",
  "sequence": "ai-winter-monitors-going-dark",
  "used_in": ["cue-sheet@676.7", "issues/issue-04.html"],
  "prompt": "operations/codex-prompts/ep04-missing-beats-batch.md#A1",
  "px": [1920, 1080] }
```

This makes three checks possible that are impossible today:
- **Coverage** — any `bNofM` with fewer than M beats on disk = an incomplete sequence. Exactly the
  failure that lost the AI-winter progression.
- **Supersession** — anything wired that isn't the highest `g`/`r` for its slot gets flagged.
- **Orphans** — art that exists but is `used_in` nothing. Ep4 had 20 such frames (16 word-bursts,
  4 concept cards) wired nowhere at all.

## ROLLOUT — deliberately NOT a big-bang rename
DO NOT rename the 774 existing files before launch. Every rename breaks live `src` references, the
cue sheets and the prompt files, at the worst possible moment.

1. **New art only** — applies from the next Codex batch onward. Costs nothing.
2. **Manifest over existing art** — non-destructive, script-generated, gives coverage and
   supersession checks immediately without touching a single filename.
3. **Rename per episode, only after that episode has shipped** — mechanical, with every reference
   rewritten in the same commit, one episode at a time.

---
### Note on the guard-rail
Writing this document was itself BLOCKED by the cut-decisions hook, because it quotes a banned
filename as an example. The hook cannot distinguish documentation from wiring. That is the right
trade (fail closed), but if it becomes annoying, the fix is to scope the hook to files under
`content/episodes/` rather than any payload mentioning a cue sheet.
