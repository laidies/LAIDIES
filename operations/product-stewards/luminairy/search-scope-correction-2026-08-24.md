# LUMINAiRY search-scope correction — 2026-08-24

## Verdict

The card filter remains useful, but its old placement and label were misleading. It now lives inside and names the active wing.

## Visitor defect

`Find a name or lesson` appeared above all three wing doors and used examples such as privacy and standards. That composition implied a global search across 43 entries. The implementation actually filtered only the currently active wing and cleared itself on a wing change.

## Repair

- Move the filter below the active wing introduction and inside `lumPanel`.
- Label the exact scope:
  - `Search PATRON SAiNT cards`
  - `Search MAiVEN profiles`
  - `Search TRAiLBLAZER profiles`
- Use `Try a name, role, or lesson…` instead of cross-wing topic examples.
- Keep query reset on mouse and keyboard wing changes.
- Preserve visible result counts and all existing card, audio, local-pick and failure-state behavior.

## Calibrated prevention

The browser suite now requires exactly one search control inside `.lum-panel`, zero inside `.lum-archive__head`, exact dynamic labels and an empty value after wing change. The new placement guard first failed against the predecessor with panel search count `0`, then the complete suite passed after correction.

## Behind the Build angle

Control placement is part of its promise. A search above several categories reads as global even if its code is scoped; putting it inside the thing it filters makes the interaction understandable before anyone types.

This is isolated-branch evidence only. It is not deployment or public verification.
