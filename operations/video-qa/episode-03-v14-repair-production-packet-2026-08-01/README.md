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

1. `review-sequences/p17-p20-fake-citation-to-blue-hoodie-review-v1.mp4`
   - Parent window: `326.738–400.990`
   - Repairs the claim/fake-citation/wrong-room/blue-hoodie run.
   - The four examples in the wrong-room composite are separated and placed on
     their matching narration instead of presenting the full composite too soon.

2. `review-sequences/p25-p30-three-piles-to-law-clerk-review-v1.mp4`
   - Parent window: `477.190–582.390`
   - Repairs the verification, Chutney/Elle, draft, claim, receipt, outfit/alibi,
     courtroom and law-library run.
   - The final law-library segment uses the separately repaired lamp/dust loop,
     not the retired generic ambient loop.

## What this proves

- Existing approved source imagery can support the exact narration.
- The two densest mistimed sections have deterministic, reproducible cut plans.
- Reviewers can judge the proposed repair with the real narration at 1x speed.

## What this does not prove

- These files are not a full Episode 03 v14 master.
- They do not close the other blockers in the 49-occurrence audit.
- They have not received the required complete owner watch or independent
  narration-picture review.
- They do not carry publication, deployment or release authority.

The binding source/output hashes and segment timings are in
`repair-production-manifest.json`.
