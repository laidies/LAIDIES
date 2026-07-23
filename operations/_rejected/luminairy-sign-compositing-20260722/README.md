# REJECTED — compositing a capital I onto the LUMINAiRY sign

**2026-07-22. Ali: "you shouldn't be applying signs on top that is going to look like shit."**

I built a tool that repainted the marquee by copying the sign's own `L`, removing its
foot and mirroring its serif, to turn `LUMiNAiRY` into `LUMINAiRY` without regenerating
the frame. It technically worked. It looked slapped on, because two-stage text always does.

**This was already a recorded rule and I broke it.** `codex-text-in-render` says, in as many
words, that "Codex's own overlay pass AND Claude's PIL compositing" both looked terrible to
Ali, and that all in-image text is rendered by the image model, letter-exact, in the prompt.
There is a second ruling in the same note from 2026-07-04 banning composited text even with
blend-mode treatments.

⛔ Do not attempt this again, on this sign or any other. The only fix for wrong sign text is
a re-render with the exact string in the prompt.

Kept only as evidence of what was tried. Nothing here is wired; the `.png` is in the
`banned` block of `ep04-cut-decisions.md`.
