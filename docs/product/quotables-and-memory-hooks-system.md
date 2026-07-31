# Quotables, lyrics and memory hooks

**Status:** canonical product direction; existing episode `quotables[]` and
Resident Card favorite-quote support are the foundation  
**Working public surface:** **Overheard in SUNNYVAiLE**

## The problem

LAiDIES already contains funny lines, useful explanations, song lyrics,
PATRON SAiNT moves and reference connections people would quote, hum, send and
remember. Many are currently buried inside a full episode, article or song.

Those lines should become doors back into the learning:

```text
recognize or laugh at the line
        ↓
remember the underlying idea
        ↓
hear the song / read the scene / replay the episode
        ↓
save or share it
        ↓
bring another person into LAiDIES
```

This is not a random quote carousel. It is a searchable, shareable memory-hook
system with a source and a job.

## The quote types

Each approved item has one type:

- **lesson hook** — compresses a useful AI idea;
- **lyric hook** — a replayable line from an original LAiDIES song;
- **signature joke** — funny enough to travel and linked to its context;
- **pep talk** — encouragement from Mme CLAi-O, Girl Talk or another voice;
- **PATRON SAiNT move** — a behavior the reader can borrow;
- **reference bridge** — the line connecting a Rewind Era reference to AI;
- **cocktail explanation** — the clear BRONZE AiGE version; or
- **community line** — a resident contribution approved for reuse.

Examples:

- “It isn’t being difficult. It isn’t being rude. It just does not know what
  ‘better’ means to you.” — lyric hook + specificity lesson.
- “Garbage in a garbage dress.” — lyric/signature hook + input-quality lesson.

## One canonical record

Replace unstructured duplicate quote lists with one derived registry,
proposed at `content/site/quotables.json`.

Each record holds:

```text
id
text
type
episode
concepts[]
reference
speaker/voice
source_type: article | narration | song | game | town | community
source_title
source_url
source_anchor_or_timecode
context_line
memory_job
listen_url
read_url
save_allowed
share_allowed
share_asset
attribution/rights_note
approved_status
```

The episode canon and final song lyric source own the wording. The registry is
derived. A recording edit that changes a showcased line follows the recording
reconciliation protocol before the quote is re-rendered.

## Where the lines appear

### Overheard in SUNNYVAiLE

A rotating, browsable public surface that can live in a calm homepage slot and
open into the fuller collection. It shows one line at a time with:

- what it helps the reader remember;
- `Hear the song`, `Read the scene` or `Watch the episode`;
- `Save as my favorite`;
- a rights-safe share/download action; and
- the originating episode/concept.

### Episode/article

Use designed pull quotes and lyric callouts at the moment they strengthen
recall. Do not repeat so many that the article becomes a poster wall.

### KSVL

Show the current track’s one-to-three memory hooks as liner notes. A listener
can jump from the lyric to the episode explanation.

### MAiKEOVER and Closet

Keep one favorite quote on the Resident Card. Add a personal saved-lines
collection only when its storage and sync are real. Saving a line should
preserve its source, not copy text into an orphaned field.

### Social and sharing

Generate source-linked quote cards, lyric cards, captions and short clips.
Every shared object should make sense alone and invite the recipient to hear or
read the source.

### Search and related learning

A search for “better,” “garbage in a garbage dress,” specificity or bad input
should find the line and the lesson it points to.

## Weekly selection

Each episode deliberately selects a small set:

- at least one technical memory hook;
- at least one funny/signature line;
- at least one song lyric hook once the song is final; and
- optional pep-talk, reference-bridge or PATRON SAiNT lines when genuinely
  strong.

Do not promote a line merely to meet a quota. The set stays small enough that
each item can be art-directed, sourced and used.

## Share-worthiness test

A line qualifies when it does at least two jobs:

- funny or emotionally precise;
- understandable outside the full episode;
- accurately retrieves a useful idea;
- recognizable to the intended audience;
- short enough to present beautifully;
- likely to make someone ask where it came from; or
- useful enough to save for a later work moment.

## Rights and attribution

- Prioritize original LAiDIES writing and original LAiDIES song lyrics for
  share cards and downloads.
- External film, television, music and book references need source attribution
  and a rights/length review.
- Do not turn a borrowed lyric or extended dialogue into downloadable branded
  merchandise.
- Do not remove context in a way that changes the teaching meaning.
- Community lines require explicit reuse permission and attribution choice.

## Measurement

Track:

- quote impression;
- source opened;
- song played from quote;
- article/episode opened from quote;
- favorite saved;
- share/copy/download;
- return to another hook from the same concept; and
- downstream episode completion where measurable.

The success metric is not just quote shares. It is whether the line carries
people back into the lesson and helps them retrieve it later.

## Build order

1. Normalize existing episode `quotables[]` and final song hooks.
2. Create the derived quote registry with source links and rights status.
3. Add KSVL liner notes and restrained episode pull quotes.
4. Build the public Overheard in SUNNYVAiLE module and browse view.
5. Connect favorite/save behavior to MAiKEOVER/Closet without duplicating
   authority.
6. Generate rights-safe share cards and social adaptations.
7. Add search aliases, source traffic and Friday measurement.
