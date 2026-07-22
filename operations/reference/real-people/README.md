# Real-people likeness references

**This folder being empty is why episode art keeps inventing faces.**

When a prompt says "the ENIAC Six" or "Grace Hopper" with no likeness reference attached, the
model has nothing to match to and produces a plausible stranger. That is what happened to the
Ep4 ENIAC frame — six generic 1940s women instead of Jean Jennings Bartik, Betty Snyder
Holberton, Kay McNulty, Marlyn Wescoff, Ruth Lichterman and Frances Bilas.

## What goes here
One folder per woman, holding **real photographs** — not stylised art:

```
real-people/
  ada-lovelace/          hedy-lamarr/         grace-hopper/
  karen-sparck-jones/    fei-fei-li/          joy-buolamwini/
  timnit-gebru/          emily-bender/        kate-crawford/
  eniac-six/             ← six SEPARATE named women, one subfolder each
```

Prefer: a clear front-facing portrait, a three-quarter view, and one era-appropriate
working shot. Name files `<slug>-ref-01.jpg` etc.

## How prompts must use them
- **Every named woman gets a likeness reference path in the prompt.** Never "Grace Hopper" on
  its own; always "Grace Hopper — likeness reference: `operations/reference/real-people/grace-hopper/…`".
- **A woman across several beats uses the SAME reference in every beat.** Her face must not
  drift between her own scenes.
- ⛔ Never let Codex pick its own reference from the repo.

## Not a substitute
`assets/mavens/y2k-stained-glass-v3-finished/*.png` are **stylised stained-glass portraits**.
They set a decorative register, not a likeness, and `teal-icon/eniac-six.png` is a single icon
of all six — not six individual faces. Neither is a likeness reference.
