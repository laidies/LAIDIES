# Image Queue — Claude ↔ Codex shared handoff

The point: no more copy-pasting prompts between chat windows. Claude writes a spec here; Codex generates from it on Ali's subscription and saves the output; Claude QCs it.

## How it works
1. **Claude** drops a spec file in `queue/` named `NNN-short-name.md` (status `TODO`).
2. **Codex** (told once: *"process everything TODO in `/queue`"*) reads each `TODO` spec, generates the image(s) on the ChatGPT subscription, saves them to the spec's **Output path**, and flips the spec's status to `DONE` (add the real output filename under `## Result`).
3. **Claude** reads `DONE` specs, QCs the output against the spec's **Criteria** (against the Codex-quality bar), and either accepts or writes a follow-up tweak spec.

## Spec format (copy this)
```
# NNN — <title>
status: TODO            # TODO | DONE | NEEDS-TWEAK
model: SOL (subscription image gen)   # NOT the API — use the paid subscription
output-path: <where to save, repo-relative>

## Style anchor (match this exactly)
<exact reference file path(s) — never let the model pick its own style>

## Generate
<what the scene is + the character/detail packed on top>

## Palette
<which colors, and which to ease off>

## Must NOT
<banned aesthetics for this shot>

## Criteria (Claude QCs against these)
- [ ] ...

## Result   (Codex fills this)
- output: <filename>
```

## Rules baked in (from the bible + painpoints log)
- Match the SUNNYVAiLE house style — anchor to a named reference, never freestyle.
- Baked-in text is welcome when it adds character (funny signs, book spines) — must be **legible + correctly spelled**, never gibberish. Double-check brand words (LIBRAiRY, LUMINAiRY, SUNNYV**Ai**LE, laidies.ai).
- Banned: cottage-core, hearts-as-decor, floral/plant overload, green Victorian heavy woodwork, chrome / 50s-retro-futurism, warm haze, flat-cartoon.
- SUNNYVAiLE = girl power meets machine power: bold Y2K palette + 90s machines (CRTs, glass block).
