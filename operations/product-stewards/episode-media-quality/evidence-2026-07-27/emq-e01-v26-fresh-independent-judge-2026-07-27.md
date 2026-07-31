# EMQ — Episode 01 v26 fresh independent review

**Verdict:** **HOLD — human full-title 1× unmuted audible witness only.**

This is a fresh, read-only judgment of the exact frozen local tuple. It does
not publish, bind a public route, alter the master, captions, player, maker
files, release state, or deployment.

## Exact inputs recomputed

| Input | SHA-256 | Result |
| --- | --- | --- |
| `assets/video/episode-01-full-v26-source-admitted-review.mp4` | `f5985a39363eb75514766186817d0105beab9fa6695accf40e0972698e1d1351` | MATCH; 627,122,305 bytes |
| v26 manifest | `3abc64a0e964f655d0eebe3ee02f4d7f43d8d07b06d2c384136f11407156b2be` | MATCH |
| maker QC | `ca4fe84243aff1bc03abedcc1da6b46a4e025f04d0cffba0316b1b9ce5c105f3` | MATCH |
| config | `902e4daab021f2d1ab6e5ed3503c383a7962d28dc6a61d50fd03be5a4ee8c83f` | MATCH |
| builder | `46747e2cd7aaba6d92f60327edbb3ffb2809a57df35ac69008a8b58732b3266f` | MATCH |
| external VTT | `191938a9879883d9439c4ff35c319c40c54fec09855c4c72ba66bd7cdcbd9539` | MATCH; 246 valid ordered cues, final cue end 1171.420s |
| sealed player binding | `e7db56402513334b0bec9d484e2001065c8a86a5bc7795f91fd553b4eaa35d83` | MATCH |
| sealed player browser result | `27823bc522ed71988d52d6cf87d24bf6c93b425ee8708b9e61ed5894200afeff` | MATCH; PASS 11/11 |
| sealed player static result | `bbefccbdca5a9177590042353b2867ef285b42919e9eee6e382951ceb08e9ca6` | MATCH; PASS 10/10 |

## Fresh checks

- **PASS — full decode:** independently decoded the complete video and audio
  streams with the pinned local FFmpeg binary; no decode error.
- **PASS — clock/audio:** 35,167 video frames (30 fps; 1172.233s metadata) and
  the manifest's exact protected v25 AAC payload result are coherent. The
  v26 file is not short and does not introduce a silent tail.
- **PASS — 13 precise source windows:** recomputed every source SHA named in
  the manifest. Placements 14, 25, 29, 30, 34, 38, 43, 45, 48, 50, 57, 61,
  and 70 bind to the declared admitted sources. The protected welcome-ident
  control at frame 2910 has the declared MD5 `668cbbf0c6e109df26b953491acca5f8`.
- **PASS — narration/image and visual continuity sample:** extracted and
  visually inspected the protected ident plus a timeline-spanning audit sheet
  and the repaired interval starts. The review sees the declared narration
  concepts in the admitted imagery (calendar pressure; Dolly/physics; café,
  handled orange iBook and tutu; continued learning; cocktail-party analogy;
  human judgment; next-token device; CRT/context; plausibility pushback; and
  delegated kitchen handoff). The graphic-novel character treatment, location
  continuity, 1990s period technology correction, aspect ratio, and hard
  boundaries are coherent in the sampled sequence. No missing frame, crop,
  stretch, or boundary flash was observed.
- **PASS — Welcome back to LAiDIES:** the Episode 01-specific ident remains
  present at its protected 93.900–101.920s span.
- **PASS — caption structure:** all 246 WebVTT cues are positive,
  monotonic/non-overlapping and external. Voice tags exist in source as normal
  speaker metadata; the sealed representative-player result shows the custom
  rail sanitizes them rather than exposing raw markup.
- **PASS — representative player functional evidence:** independently
  recomputed the harness seals and inspected the actual 11/11 browser result:
  the exact master mounts, 1× unmuted start, external sanitized captions,
  keyboard seek/caption toggle, 390px layout, reduced motion, retry/failure,
  and no-JS boundary all pass. This is an isolated harness, not a public
  `watch.html` binding.

## Remaining literal hold

`HOLD_HUMAN_FULL_1X_UNMUTED_AUDIBLE_WITNESS_MISSING` — no identified human
full-title, normal-speed, unmuted audible watch is bound to this exact master.
Machine decode and browser interaction demonstrate technical integrity; they
do not establish full spoken-content/listening quality.

## Exact next action

Assign one identified human to complete and record the full 1× unmuted audible
watch of this unchanged SHA. On a PASS, reconcile this local technical verdict
with the separate product/release/public-origin gates. Do not rebuild or
transcode the media absent a concrete new defect.

**Authority:** local review only; release/deploy/public remain false.
