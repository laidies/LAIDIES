# Narration production and reconciliation protocol

**Purpose:** text-to-narration listening sessions are an editorial pass. This
protocol prevents the final spoken episode from drifting away from canon, the
readable article, captions, learning materials and visual timing.

ElevenLabs is the current renderer, not the architecture. The same separation
applies if LAiDIES changes TTS/voice tools.

This file governs spoken narration. Episode songs use the companion
`operations/audio/song-production-reconciliation-protocol.md`; both systems
keep public spelling separate from tool-facing performance spelling.

## One narration has four textual forms

### 1. Canonical readable master

The approved meaning, facts, lesson, jokes and public spelling. This is the
source from which the narration performance script is derived.

### 2. TTS performance script

The tool-facing workbench:

- phonetic/ear spellings;
- delivery tags;
- pauses and emphasis;
- sentence breaks for listening;
- voice/tool controls; and
- temporary pronunciation experiments.

It may spell `LAiDIES` as `ladies`, or distinguish past-tense `read` (sounds
like `red`) from present-tense `read` (sounds like `reed`). Those changes help
the renderer; they do not rewrite public language.

### 3. As-recorded transcript

What the approved final audio actually says, including accepted cadence
changes, omissions, repetitions or substitutions. Record it with public
spelling restored and compare it to canon before downstream production.

### 4. Public transcript and captions

The actual approved spoken words with readable punctuation, public spelling
and final timing. Delivery tags and phonetic workarounds never appear here.

The original draft is not sufficient evidence for what the audio says. The TTS
input is not automatically the final transcript. Listen, transcribe and
reconcile the rendered output.

## The authority changes temporarily

Before recording, the ruled episode canon owns the words and meaning.

During the text-to-narration session, the TTS script becomes a **performance
workbench**. Ali may change words because a sentence:

- sounds unnatural;
- is too long to follow by ear;
- lands the joke badly;
- needs a cleaner explanation;
- repeats something;
- contains a factual or tonal problem; or
- is pronounced incorrectly.

After the listening session, the TTS script does **not** remain a competing
source of truth. Every change is classified and reconciled. Semantic changes
return to canon; intentional spoken-only differences are recorded; captions
are rebuilt from the final audio using public spelling.

Then canon resumes authority.

## Never use one “sync everything” rule

Different recording edits owe different downstream work.

| Change class | Example | Canon | Read article | Captions/transcript | Timing/cues | Other semantic surfaces |
|---|---|---:|---:|---:|---:|---:|
| `pronunciation_only` | `LAiDIES` → `ladies` for ElevenLabs | No | No | Public spelling | Rebuild after final audio | No |
| `delivery_only` | Mood tag, pause, emphasis, sentence split with identical words | No | No | Same words, readable punctuation | Rebuild | No |
| `spoken_cadence` | “The model—the actual brain—is…” → “The model is the actual brain.” | Record intentional spoken variant | Only if it also reads better or clarity changed | Final spoken words, public spelling | Rebuild | Only if a locked phrase/definition changed |
| `semantic_wording` | Better explanation, analogy, example or conclusion | Yes | Yes where the same beat appears | Final spoken words, public spelling | Rebuild | Yes—Study Sheet, quiz, cards, cocktail line, social, search, etc. as affected |
| `fact_correction` | Corrected company, capability, date, source or caveat | Yes + fact ledger | Yes | Yes | Rebuild | Every surface carrying the claim |
| `cut_or_new_beat` | Remove a paragraph or add a missing teaching step | Yes | Yes | Yes | Rebuild and re-cue | Storyboard, art, Study Pack, quiz, email/social and next/previous hooks as affected |
| `locked_phrase_change` | New takeaway, cocktail line, episode title or sign-off wording | Yes | Every must-match destination | Yes | Rebuild | Search, metadata, cards, Closet, BRONZE, KSVL, social and email |

“Article: where applicable” means the written and spoken versions may use
different sentence rhythm, but they may not teach different things by
accident. Any deliberate read/spoken divergence must be recorded.

## The recording revision log

Each episode gets:

`operations/audio/episode-NN-recording-revisions.md`

Copy `operations/audio/episode-recording-revisions-template.md` to start it.

Record changes while listening, not from memory afterwards.

| ID | TTS line/section | Before | After | Class | Why | Canon impact | Downstream scope | Reconciled |
|---|---|---|---|---|---|---|---|---|
| R01 |  |  |  |  |  |  |  | no |

Allowed classes:

- `pronunciation_only`
- `delivery_only`
- `spoken_cadence`
- `semantic_wording`
- `fact_correction`
- `cut_or_new_beat`
- `locked_phrase_change`

If Ali changes several lines for the same reason, one log entry may cover the
block. It must still identify the affected section and downstream scope.

## The reconciliation pass

Run after Ali approves the final listening version and before final captions,
cue sheets or downstream fan-out.

### 1. Freeze the recording workbench

- Save the final TTS performance script and record its tool/model/voice/date.
- Save/export the final narration audio.
- Save the as-recorded transcript of that exact audio.
- Complete the recording revision log.
- Do not begin cue timing from an earlier audio render.

### 2. Separate ear spelling from editorial changes

Use the pronunciation lexicon to reverse:

- `ladies` → `LAiDIES`
- `Sunnyvale` → `SUNNYVAiLE`
- `Mavens` → `MAiVENS`
- other episode-specific phonetic spellings → their public forms.

For homographs, reverse the spelling without erasing the meaning/context
record. Both pronunciations of `read` are valid; the lexicon must identify
which meaning the sentence requires.

Delivery tags are discarded from readable text. They are not captions.

### 3. Reconcile meaning back to canon

For every change other than `pronunciation_only` or `delivery_only`:

- decide whether it is an intentional spoken variant or a canon correction;
- update the affected canon beat, concept, fact, takeaway or locked phrase;
- update the fact ledger if a factual claim changed;
- record an intentional read/spoken divergence beside the canon beat;
- rerun the teaching and must-match checks.

The final narration is allowed to be more conversational than the article.
It is not allowed to contain the only copy of a better explanation.

### 4. Rebuild the readable surfaces

From reconciled canon, update as affected:

- article Markdown and HTML;
- readable transcript;
- Study Sheet and Study Pack;
- Try-On and Cheat Sheet;
- quiz questions, answers and explanations;
- trading cards;
- glossary and LIBRAiRY passages;
- BRONZE AiGE cocktail card;
- MAiKEOVER/Closet quotables;
- NewsStand copy;
- community prompt;
- email and social copy;
- Ask Jeeves/site search summaries, aliases and metadata.

Do not touch a surface merely because it contains similar words. Follow the
meaning and the exact locked phrases.

### 5. Rebuild the clock-dependent surfaces

The final narration audio becomes the timing authority:

- word/timing map;
- SRT and VTT;
- episode cue sheet;
- scene durations;
- animation in/out points;
- CapCut edit;
- chapter markers and podcast/YouTube timing.

Even a pronunciation-only change can alter duration. Timing is always rebuilt
from the final audio.

### 6. Reconcile visuals

If a beat was added, removed or materially reframed:

- update the storyboard;
- add/remove/reorder scene art;
- rewrite alt text;
- update motion requirements;
- remove orphan assets from the cue sheet without destructively deleting the
  source library.

### 7. Search for affected phrases

Search the repository for:

- the old wording;
- the new wording;
- the affected fact/term;
- any must-match phrase.

Classify every hit as:

- update;
- intentional read/spoken variant;
- unrelated use; or
- stale surface.

This is a dependency check, not a blind global replacement.

### 8. Run parity gates

Before ship:

- final audio ↔ as-recorded transcript: exact spoken words;
- final audio ↔ readable transcript: same spoken words after spelling
  normalization;
- final audio ↔ captions: same words, correct timing and public spelling;
- canon ↔ narration/article: same teaching, facts and locked phrases;
- canon ↔ learning/town/search/social: affected definitions and claims agree;
- final audio ↔ cues/video: every visual beat lands on the final clock;
- recording revision log: every entry marked reconciled with evidence.

## What “done recording” means

Recording is done only when:

1. the final audio is approved;
2. its exact TTS performance script and tool/model/voice/date are recorded;
3. its as-recorded transcript is saved;
4. every listening-session edit is classified;
5. semantic changes are back in canon;
6. intentional spoken-only variants are recorded;
7. captions/transcript are rebuilt with public spelling;
8. timing/cues/video use the final audio; and
9. all affected downstream surfaces have been updated and checked.

An approved MP3 with an unreconciled revision log is not a finished narration.
