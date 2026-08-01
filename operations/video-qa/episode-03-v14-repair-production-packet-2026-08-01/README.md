# Episode 03 v14 repair production packet

Status: **BUILT LOCALLY / NORMAL-SPEED REVIEW REQUIRED / RELEASE HOLD**

This packet turns the highest-value Episode 03 timing corrections into audible,
normal-speed review clips. The picture changes at exact caption-derived
boundaries while the audio comes from the admitted v13 parent master.

Because the caption boundaries include milliseconds that cannot always land on
an exact 30 fps frame, validation requires the MP4 container/audio duration to
match the boundary window within 0.01 seconds and permits no more than a
two-frame picture-tail shortfall. Normal playback holds the final picture
through that sub-frame audio tail; longer gaps or picture overruns fail.

## Review sequences

1. `review-sequences/p01-p03-opening-setup-and-title-review-v1.mp4`
   - Parent window: `20.680–50.700`
   - Replaces the generic opening card, places the exact Episode 03 title only
     on its spoken line, and enters the client cold open without title overlap.

2. `review-sequences/p17-p20-fake-citation-to-blue-hoodie-review-v1.mp4`
   - Parent window: `326.738–400.990`
   - Repairs the claim/fake-citation/wrong-room/blue-hoodie run.
   - The four examples in the wrong-room composite are separated and placed on
     their matching narration instead of presenting the full composite too soon.

3. `review-sequences/p25-p30-three-piles-to-law-clerk-review-v1.mp4`
   - Parent window: `477.190–582.390`
   - Repairs the verification, Chutney/Elle, draft, claim, receipt, outfit/alibi,
     courtroom and law-library run.
   - The final law-library segment uses the separately repaired lamp/dust loop,
     not the retired generic ambient loop.

4. `review-sequences/p33-same-answer-different-outfit-review-v1.mp4`
   - Parent window: `604.870–634.610`
   - Replaces the unrelated picture with the Regina/Chutney evidence sequence
     while the narration explains repeated unsupported answers in different
     packaging.

5. `review-sequences/p47-town-extras-to-signoff-review-v1.mp4`
   - Parent window: `957.890–1024.250`
   - Separates the rule card, quiz, KSVL, Mme CLAi-O, Dream Phone, charm,
     Closet and final signoff so each destination appears with its narration.

## Full successor

`assets/video/episode-03-full-v14-repaired-review.mp4`

- SHA-256: `b67aa6d74b488c54317d42616c95908c080be962bd54c7d1d51ad471173660a7`
- Duration: `1048.000` seconds at `1920×1080 / 30 fps`
- Audio payload is byte-identical to the admitted v13 parent.
- All 211 caption cues remain within the successor clock.
- Full decode and black-frame scan pass.
- Deterministic midpoint comparisons match all five admitted repair sources.
- Assembly and validation receipts:
  - `operations/video-qa/episode-03-v14-successor-assembly-2026-08-01.json`
  - `operations/video-qa/episode-03-v14-successor-validation-2026-08-01.json`

## What this proves

- Existing approved source imagery can support the exact narration.
- All five admitted repair windows have deterministic, reproducible cut plans.
- Reviewers can judge the proposed repair with the real narration at 1x speed.

## What this does not prove

- The successor is not an accepted or public Episode 03 release master.
- They have not received the required complete owner watch or independent
  narration-picture review.
- They do not carry publication, deployment or release authority.

The binding source/output hashes and segment timings are in
`repair-production-manifest.json`.
