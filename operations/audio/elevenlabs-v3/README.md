# Episode 01 — ElevenLabs v3 chunks (RECORD FROM HERE)

Reality check 2026-07-06: Studio has no v3 voices yet (Hope only appears in
the plain Text-to-Speech tool), and the TTS box takes 5,000 characters per
generation. So Episode 01 records as FOUR takes from this folder, each cut
at a paragraph boundary (a natural pause, so the seams are invisible).

## How to record
1. Open Text to Speech (not Studio). Voice: Hope — upbeat and clear.
   v3, speed 0.96, stability 50, similarity 75. Same settings all four takes.
2. Paste chunk 01, generate, listen. Regenerate until the tone is right —
   this take sets the episode.
3. Generate 02, 03, 04 with identical settings.
4. Download all four mp3s, keep the chunk numbers in the filenames, drop
   them in operations/audio/takes/ (create it). Claude stitches them into
   /content/music/episode-01-narration.mp3 with ffmpeg and syncs the
   Screening Room cues to the real runtime.

## v3 notes
- Delivery tags are built in ([dry, sarcasm, deadpan], [chuckles], etc.) —
  Ali-validated grammar. If a line overcooks, delete just that tag and
  regenerate that one chunk.
- No <break> tags — punctuation carries the pacing.
- Spellings are TTS-phonetic on purpose (Sunnyvale, Madame Cleo, K-S-V-L,
  "Makeover on Main") — don't "fix" them back to brand casing.

## Voice lock (updated 2026-07-06)
Series voice: **Jessica** (available in Studio; Ali: "sounds good") — record
the exact model + settings from the final Ep 01 render here once exported,
and reuse them for every episode of the season.
- If Studio renders Jessica on v3: paste the TAGGED master
  (episode-01-elevenlabs-v3-tagged.txt) — tags work.
- If Studio is on an older model: tags get read aloud — paste the UNTAGGED
  master (episode-01-elevenlabs.txt) instead.
Fallback path: Hope — upbeat and clear via plain TTS (v3, speed 0.96,
stability 50, similarity 75), recorded as the four chunks in this folder.
