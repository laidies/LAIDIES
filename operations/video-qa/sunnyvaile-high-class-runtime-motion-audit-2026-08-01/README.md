# SUNNYVAiLE High class-player runtime motion audit — 2026-08-01

**Status:** PASS for the two interface animations only. Class-video admission remains unchanged and fail-closed.

This audit closes the bounded review gap for the two CSS animations used by the
classroom television in `learn/class.html`:

- `tvpulse` is a semantic interface affordance. It helps a visitor find the
  small television control without claiming that a finished class tape exists.
- `crton` is a decorative, user-triggered transition. It opens the class-tape
  or production-status dialog with a 0.42-second, one-shot CRT effect.

## What was actually checked

- desktop at 1280 × 900;
- mobile at 390 × 844;
- normal motion and `prefers-reduced-motion: reduce` at both widths;
- no document or body horizontal overflow before or after the dialog opens;
- keyboard activation, focus transfer, Escape close and focus restoration;
- the exact animation names, durations and iteration counts;
- reduced-motion removal of both animations while the static TV affordance
  remains visible;
- all 37 registered class slugs load the same reviewed template and preserve the
  reduced-motion behavior.

The captures show the focused television affordance and the settled
production-status dialog. The machine evidence records the computed animation
state during the opening effect; a still image is not used to pretend that
motion occurred.

## Boundary

No class tape is admitted by this PASS. The current class-player three-gate
rule still requires a live register row, an exact non-null video path and a
current admitted learning record bound to that same path. Current counts remain
37 registered classes, zero live rows, zero video paths and zero playable class
occurrences.

## Reproduce

Run against the local site preview:

```sh
HIGH_PLAYWRIGHT_ROOT=/path/to/node_modules \
HIGH_URL=http://127.0.0.1:4190 \
node scripts/check-class-player-runtime-motion.mjs --capture
```

The binding machine receipt is `class-runtime-motion-audit.json`. Any change to
`learn/class.html`, either reviewed keyframe name, the evidence receipt or its
bound captures invalidates the registry check until this audit is rerun.
