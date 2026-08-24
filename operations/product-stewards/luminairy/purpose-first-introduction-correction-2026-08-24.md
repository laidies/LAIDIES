# LUMINAiRY purpose-first introduction correction — 2026-08-24

## Defect

The separate `How to use the room` band led with ranking, local-storage, badge,
test and mastery disclaimers before the page had plainly explained what the
LUMINAiRY was. It repeated the hero's action and made internal interaction
boundaries look like the product purpose.

## Correction

- The hero now explains the room-level purpose first.
- The same paragraph distinguishes the practical job of all three wings.
- The existing `Choose a wing` action remains.
- The entire `.lum-orientation` component and its CSS are removed.
- The optional local-votive section retains its own accurate device-local
  boundary because that text explains that feature, not the LUMINAiRY.

Exact hero copy:

> The LUMINAiRY is where LAiDIES brings together cultural touchstones,
> computing history, and present-day practitioners to make AI easier to
> understand, question, and use. Enter PATRON SAiNTS for memorable working
> habits, MAiVENS for the history and ideas behind computing, or TRAiLBLAZERS
> for the people shaping AI now.

## Prevention

The calibrated browser guard rejects the old component, the rejected phrases,
taxonomy without the room-level purpose, missing wing distinctions and a stale
stylesheet identity. It failed against the predecessor before the correction
and passed the full desktop, compact-desktop, mobile, interaction, failure and
audio suite afterward.

## Behind the Build angle

**Purpose before permissions:** why accurate caveats can still be the wrong
opening, and how moving implementation boundaries beside the feature they
govern made the page easier to understand without making it less truthful.
