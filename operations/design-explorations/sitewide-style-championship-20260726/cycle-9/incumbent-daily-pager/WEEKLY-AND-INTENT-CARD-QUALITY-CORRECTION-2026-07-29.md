# Weekly and intent card quality correction — 2026-07-29

## Reported defects

- Wednesday-route progress checks looked accidental rather than intentional.
- The route colours read as unrelated muted grey-blue panels.
- The current-episode song control rendered as a large coral pill with no
  visible label.
- The season selector and four intent cards used generic white surfaces that
  did not carry the LAiDIES visual language.

## Correction

- Removed appended check marks from route numbers.
- Made completed route state explicit in words (`visited`) with a consistent
  inset accent rather than a drawn mark.
- Rebuilt all eight route cards as one tinted electric-90s component family.
- Added a visible `Hear the Episode 04 song` label to the compact song control.
- Replaced generic white season and intent-card surfaces with restrained,
  readable LAiDIES gradients and a consistent violet frame/shadow system.
- Removed meaningless alternating episode-row colours. Every episode now uses
  one shared tinted surface; only the actual current/latest row receives the
  pink state border and status badge.
- Preserved all destinations, episode order, images, copy and progress logic.

## Scope

Cycle 9 candidate only. No deploy or public mutation.
