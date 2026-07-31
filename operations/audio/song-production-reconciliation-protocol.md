# Song production and reconciliation protocol

**Purpose:** keep an AI-music tool’s performance spellings, structure cues and
unexpected sung output from corrupting canonical lyrics, public spelling,
lesson meaning, captions or quotables.

## One song has three textual forms

### 1. Canonical lyrics

The approved human-readable song:

- correct public spelling;
- correct facts and lesson meaning;
- approved hooks, rhyme and structure;
- source/rights notes; and
- the only source used for lyric pages, articles, search, cards and quotables.

### 2. Performance lyrics

The tool-facing workbench:

- phonetic or ear spellings;
- syllable breaks;
- stress/pause experiments;
- section and delivery cues;
- tool-specific formatting; and
- temporary line variants being tested.

This file helps the generator sing the intended song. It is derived from
canonical lyrics and is never public copy.

### 3. As-recorded lyrics

A transcript of what the approved audio actually sings:

- exact words, omissions, repetitions and ad-libs;
- public spelling restored;
- timing where needed for captions/visuals; and
- every difference from canon explicitly resolved.

The audio cannot be declared finished while the canonical and as-recorded
lyrics disagree without a recorded decision.

## Why public spelling and performance spelling must separate

Some written words have more than one pronunciation:

| Canonical word | Intended meaning | Intended sound | Possible performance experiment |
|---|---|---|---|
| `read` | past tense | sounds like `red` | temporary `red` or a rewritten line |
| `read` | present tense | sounds like `reed` | temporary `reed` or a rewritten line |

The public lyric remains `read`. A phonetic substitute belongs only in the
performance workbench. If it leaks into captions, lyric cards, articles or
search, the production workaround has overwritten the real language.

Do not assume a spelling trick works in every music tool. A tool may sing the
substitute literally, change the rhyme, alter the rhythm, treat parentheses as
backing vocals or interpret brackets as structure. Record the tool/model/date
and test the exact line.

## The safer order of operations

1. Lock the meaning and public lyric.
2. Mark every pronunciation-sensitive word with its intended meaning and
   sound.
3. Make the smallest performance-only change needed for the tool.
4. Generate and listen.
5. Record what the tool actually sang.
6. Decide whether to accept it, retry a performance spelling, rewrite the
   canonical line to remove ambiguity, or reject the take.
7. Reconcile every accepted semantic change back to canonical lyrics.
8. Build public lyrics/captions from the approved as-recorded words with
   standard spelling.

Rewriting the line is often cleaner than stacking increasingly strange
phonetic spellings. Pronunciation is part of performance; clarity is still part
of writing.

## Song change classes

| Class | Example | Canon impact | Public lyric impact | Audio/timing impact |
|---|---|---:|---:|---:|
| `song_pronunciation_only` | `read` → temporary `red` to produce the past tense | No | Restore `read` | Yes |
| `song_delivery_only` | section cue, stress, pause, backing-vocal direction | No | Remove tool cue | Yes |
| `meter_or_cadence` | rebreak a phrase across beats without changing words | Record if intentional | As actually sung, public punctuation | Yes |
| `generator_deviation` | tool omits, repeats or substitutes a word | Decision required | Must match approved audio or regenerate | Yes |
| `semantic_lyric_change` | rewrite changes the lesson/joke/meaning | Yes | Yes | Yes |
| `fact_correction` | corrected person, date, capability or caveat | Yes + fact ledger | Yes | Yes |
| `locked_hook_change` | chorus, title line or quotable changes | Yes | Every exact reuse | Yes |

## Song revision log

Create `operations/audio/episode-NN-song-revisions.md` from
`operations/audio/song-production-revisions-template.md`.

Record changes while listening. Do not reconstruct them from memory after
several generations.

## Pronunciation map

Every sensitive word or phrase records:

```text
public_form
meaning/context
intended_pronunciation
performance_form
tool/model/version/date
song section + line
result heard
approved?
caption/public form
```

Homographs must include meaning/context. “Pronounce `read` correctly” is not a
complete instruction because both pronunciations are correct in different
sentences.

## Reconciliation pass

After Ali approves the audio:

1. Freeze the exact approved audio and performance-lyric input.
2. Transcribe the actual sung words.
3. Restore public spelling for pronunciation-only substitutions.
4. Compare canonical lyrics, performance lyrics and as-recorded lyrics.
5. Classify every difference.
6. Reconcile accepted meaning/hook/fact changes into episode canon and the
   canonical song.
7. Regenerate or explicitly approve generator omissions/repetitions.
8. Update source-linked lyric hooks and every exact reuse.
9. Build timed lyrics/captions from the final audio—not the prompt submitted
   to the music tool.
10. Register the exact approved track and lyric version in KSVL.

## Public parity gates

- canonical lyrics ↔ approved audio: same meaning and resolved wording;
- as-recorded lyrics ↔ approved audio: exact words and repetitions;
- public lyric page ↔ as-recorded lyrics: same words with standard spelling;
- captions ↔ approved audio: same words with public spelling and final timing;
- episode lesson/facts ↔ song: no catchy but inaccurate simplification;
- quotables/cards/search/social ↔ canonical approved hook: exact wording;
- KSVL registry ↔ approved audio/title/artist/version: same track; and
- performance spellings/cues: absent from every public surface.

## What “song complete” means

A song is complete only when:

1. the audio is approved;
2. canonical, performance and as-recorded lyrics are saved;
3. pronunciation-sensitive words are mapped;
4. every generated deviation is accepted, corrected or rejected;
5. semantic/factual/hook changes are reconciled;
6. public lyrics and timed captions match the final audio with standard
   spelling;
7. KSVL and episode surfaces use the exact approved version; and
8. the best hook still teaches something accurate and useful.

An MP3 and a lyric prompt are not, by themselves, a finished song package.

## Behind the Build opportunity

Preserve approved examples of:

- correct spelling/wrong pronunciation;
- performance spelling before/after;
- a phonetic workaround that damaged rhythm;
- a line rewrite that solved the problem more cleanly;
- a generator omission or unexpected repetition; and
- canonical versus performance versus public-caption text.

Publish only after the specific tool/model/version/date and actual audio
evidence are recorded. Do not claim one tool’s pronunciation behaviour applies
to every AI music system.
