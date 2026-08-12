# Independent artifact-first review — Promptoscope repeatable evaluations

**Candidate:** `LCWO-010`
**Record:** `DLD-2026-08-12-PROMPTOSCOPE-MERCURY-IN-REGRESSION`
**Verdict:** `ACCEPT_FOR_OBSERVED_HUMAN_AND_RENDERED_REVIEW_ONLY`
**Reviewed:** 2026-08-12 America/Vancouver
**Reviewer runtime:** Claude Code 2.1.225, `claude-sonnet-5`, high effort
**Session:** `44c19eeb-2258-46d2-ba1e-d91e6d338fe3`
**Reported API duration:** 205732 ms across 12 turns
**Reported cost:** USD 0.6698205
**Repository mutation by reviewer:** none

## Outcome

The exact Promptoscope prose passed independent artifact-first review with no
blocker. This advances only to observed-human and rendered-card review; it does
not admit, integrate, publish or deploy the candidate.

## Claim and teaching ruling

- Saving representative examples and stating what a good answer must include is
  verified by the current canonical claim.
- Changing one instruction at a time is a valid narrow use of the broader rule,
  which also covers an example or tool group.
- A smoother answer that fails a previously passing case is correctly described
  as a regression rather than an improvement.
- The work and home cases transfer the same evaluation habit without claiming
  fictional input is a sandbox. This is prompt-text evaluation, not an
  executable extension with inherited access.

## Voice and format

“Mercury is in regression” names the actual failure mode, while “Mercury is
innocent” states the analogy's limit. The horoscope form teaches rather than
decorates. The roughly 90-word, five-sentence card supplies one complete habit
without generic advice or unavailable tooling.

## Non-blocking limitation

If someone already changed three instructions at once, the card diagnoses the
regression but only implies the full repair: return to the last passing version
and reapply changes one at a time. Preserve the accepted prose and test this in
human comprehension review.

## Required next checks

1. Observe a non-technical reader diagnosing and repairing a three-change,
   prettier-but-less-accurate prompt.
2. Render the exact card and check hierarchy, wrapping and tone at mobile and
   desktop widths.

Until both pass, keep `status: HOLD`, `publicEligibility: INELIGIBLE` and all
record review-evidence fields null.

## Limitations

The reviewer did not browse, re-fetch live sources, compute hashes, render the
card or observe a real reader. No admission, integration, publication or deploy
authority was granted.
