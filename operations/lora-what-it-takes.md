# The heroine LoRA — what it actually takes

*Written 2026-07-22, answering "the training set is already picked — tell me what that takes."*

**Short version: the money and the time are trivial. The training set is NOT already picked,
and the one the playbook points at would repeat the 2026-07-17 mistake.**

---

## 1 · What a LoRA is, in one paragraph

Right now every image prompt *describes* the heroine in words — yellow tartan, 90s waves,
butterfly clips — and hopes the model draws the same woman. That is why she drifts: words are
a lossy way to specify a face.

A LoRA is a small add-on you train once on ~20 pictures of her. After that the model has
*seen* her, and you stop describing and start referring. Think of it as the difference between
briefing a new illustrator with a paragraph every week, versus hiring one who has already drawn
her twenty times.

The playbook's point (§D2a) is that consistency is a **conditioning** problem, not a
**prompting** problem — which is why adding a 19th prompt rule did nothing.

## 2 · The cost and time

From `operations/research/agent-operations-playbook.md` §D2a, citing Replicate's
`fast-flux-trainer` docs: **~20 images · 1000 steps · ~20 minutes · ≈$1.85.**

⚠ **Not verified by me today.** That figure was checked on 2026-07-21
(`operations/research/agent-research-sources.json`) and I have not re-checked Replicate's
current pricing. Treat it as "about two dollars and about twenty minutes", not as a quote.

## 3 · What is actually blocking it

### 3a. There is no Replicate token on this machine

`operations/wednesday-engine-bible.md` says `REPLICATE_API_TOKEN` lives in `.env` at the repo
root. **There is no `.env` at the repo root.** Nothing can be TRAINED until you put one there.
This is the only hard blocker, and it is yours to do — I should not handle the key.

⚠ **This applies to LoRA training only.** Ordinary episode art does not need it: Codex does
the image work in this repo and needs nothing from `.env`. Do not let this constraint leak
onto image jobs — I made exactly that mistake on 2026-07-22 and told Ali the LUMINAiRY sign
re-render was blocked on a key when it was not.

### 3b. The named training set does not exist as files, but IS recoverable

`operations/frame-curation/trailer-triage.md` names six keeper frames — **#0157, #0158, #0159,
#0036, #0009, #0011**. Those files are not on disk anywhere.

I worked out what they refer to. They are a 1-frame-per-6-seconds extraction of
`assets/video/episode-trailer-narration-motion-v16-wardrobe-locked-review.mp4` (16:10 long).
Re-extracting at that rate yields **exactly 162 frames**, matching the triage doc's own
"162 frames" — so the numbering is reproducible:

```
ffmpeg -i assets/video/episode-trailer-narration-motion-v16-wardrobe-locked-review.mp4 \
       -vf "fps=1/6" -q:v 3 frame_%04d.jpg
```

I re-extracted them and confirmed #0157 and #0036 are the heroine in yellow plaid at
Blend & Snap, as described.

### 3c. 🔴 But that set is in the WRONG STYLE — this is the important one

The trailer frames are **painterly / semi-realistic with a dot-dither**. The episode art is
**comic / pop-art** — heavy black ink outlines, flat saturated colour
(memory: `episode-style-comic-popart-direction`, which supersedes the pixel lock).

Training on the trailer keepers would lock the heroine into the **superseded** style. That is
the same class of error as 2026-07-17, when two LoRAs were trained here and came out unusable
because the training set was off-canon. The playbook is right that this was "a *dataset*
failure, not a method failure" — but "train on the approved locked frames" was pointing at a
list of *trailer* keepers, and the trailer is a different generation from the episode.

**So: the set is not picked. Do not train on the trailer frames.**

### 3d. The comic-generation set exists but is the wrong SHAPE

There are **39** `ep04-heroine-comic-reference-*.png` files in
`assets/episodes/ep-04/pixel/`, all ≥1024 wide. Numerically that is plenty for a 20-image set.

The problem is what they are: a **version chain**, `v1` → `v28`, of essentially one shot —
full-body standing, three-quarter sidelight, plain backdrop. They are a character sheet, not a
training set.

A LoRA trained on twenty variations of one pose learns *"full-body standing against a plain
wall"* as part of her identity, and then fights you in every scene that isn't that — seated at
the desk, the close-up at 1:12, the crowd at Blend & Snap. What a LoRA needs is the opposite:
**one consistent face across varied poses, crops, angles and lighting.**

## 4 · What it would actually take, in order

| Step | Who | Effort |
|---|---|---|
| 1. Put `REPLICATE_API_TOKEN` in `.env` at the repo root | **You** — I should not touch the key | 2 min |
| 2. Decide the generation to lock: comic/pop-art, not the trailer's painterly-dither | **You** | a decision, not work |
| 3. Assemble ~20 frames: **one face, many poses/crops/angles** | **You pick, I assemble** | see below |
| 4. Zip, upload, train | Me | ~20 min unattended |
| 5. Generate a fixed 6-prompt test card and put it in front of you | Me | ~10 min |
| 6. You say yes or no | **You** | one look |

**Step 3 is the whole job.** From what is on disk today, a candidate pool would be:

- ~6–8 from the 39 comic character-sheet frames — but only the genuinely *different* ones
  (front, 3/4, the face study, the flat-colour study), not twenty takes of one pose
- the in-scene comic frames where she actually appears at different distances — the desk beats,
  the close-up, the transformation sequence, the street four-panel
- ⛔ **not** the trailer frames, unless you decide to move the episode style back

I can produce that pool as a contact sheet for you to tick. **I should not pick it** — which
frames are on-model is your verdict, and mine has been wrong on exactly this before.

## 5 · Honest expectation

A LoRA fixes **who she is** — face, hair, proportions — across frames. It does **not** fix:

- wrong outfit (that is canon per episode, and changes weekly by design —
  memory: `heroine-appearance-canon`)
- nonsense backgrounds or invented signage
- other characters' likenesses (each MAiVEN would need her own, or reference conditioning)

So it addresses one of the four failure classes in `episode-art-four-failure-classes`, not all
four. It is still the cheapest structural fix available, and it is the only one that stops the
weekly re-describing.
