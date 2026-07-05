# Episode 01 — ElevenLabs v3 chunks

The full script (operations/audio/episode-01-elevenlabs.txt, ~16,000
characters) is too long for one v3 generation, so it's pre-split here into
8 chunks, each under ~2,800 characters, cut at paragraph/part boundaries
(safe places for an audio seam).

## How to record
1. In ElevenLabs, pick ONE voice and keep the exact same voice + settings
   for every chunk (v3: start with stability around "Natural"; if delivery
   feels flat try "Creative", but re-listen for consistency).
2. Paste chunk 01, generate, listen. Regenerate until you like the read —
   this chunk sets the tone for the episode.
3. Generate the remaining chunks in order with the same settings.
4. Download all 8 mp3s, keep the chunk numbers in the filenames, and drop
   them anywhere in the repo (e.g. operations/audio/takes/). Claude will
   stitch them into /content/music/episode-01-narration.mp3 — the
   Screening Room picks that file up automatically.

Alternative: if your plan includes ElevenLabs Studio (long-form), paste the
FULL master file there instead and export one mp3 — no stitching needed.

## v3 notes
- v3 does NOT support <break> tags — pauses come from the punctuation and
  paragraph breaks already in the script. Don't add SSML.
- v3 DOES support bracketed audio tags — including multi-word directions
  ([dry, knowing], [pointed, slow and deliberate]) and stacked emphasis
  (confirmed by Ali's Hope tests 2026-07-06). The TAGGED master uses ~38,
  with stacked/multi-word tags reserved for the load-bearing jokes.
- Spellings are TTS-phonetic on purpose (Sunnyvale, Madame Cleo, K-S-V-L,
  "Makeover on Main") — don't "fix" them back to brand casing.

## Voice lock (candidate, 2026-07-06)
Ali's current pick: **Hope — upbeat and clear** (professional voice clone),
v3, speed 0.96, stability 50, similarity 75 (from Ali's test-take filename:
`ElevenLabs_2026-07-05T23_12_37_Hope - upbeat and clear_pvc_sp96_s50_sb75_v3`).
Use the TAGGED master for Studio: `operations/audio/episode-01-elevenlabs-v3-tagged.txt`
(delivery tags like [dry]/[smirk]/[thoughtful] built in — v3 only; strip them
for older models). Keep the same voice + settings for the entire season.
