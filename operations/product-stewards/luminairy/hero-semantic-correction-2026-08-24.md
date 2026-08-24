# LUMINAiRY hero semantic correction — 2026-08-24

## Verdict

The false `Forty-three guides` lead and the visitor-facing archive/production-status block are rejected and removed.

## Visitor problem

The lead collapsed three deliberately different groups into one label. The adjacent status block then described all 43 cards as `source-reviewed profiles`, even though Patron Saints are cultural teaching devices rather than sourced biographical profiles. Song-production readiness is also not useful hero-level visitor orientation.

## Smallest complete correction

- Remove the all-guides lead rather than invent another umbrella noun.
- Let the existing paragraph explain the three distinct wing jobs.
- Remove `Archive status`, `43 source-reviewed profiles` and hero-level song bookkeeping.
- Keep `Choose a wing` as the hero action.
- Keep Carrie's deferred-song truth on her own card and in the fail-closed release validator.

## Prevention and calibration

The browser suite now requires both `.lum-hero__lead` and `.lum-hero__status` to be absent. The new guard first rejected the predecessor with `.lum-hero__lead` count `1`, then the complete browser suite passed after removal.

## Behind the Build angle

An umbrella label can make a taxonomy sound simpler while quietly erasing the reason the taxonomy exists. When categories do different jobs, orient with the jobs—not a convenient collective noun.

This is isolated-branch evidence only. It is not deployment or public verification.
