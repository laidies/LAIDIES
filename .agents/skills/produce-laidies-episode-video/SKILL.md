---
name: produce-laidies-episode-video
description: Produce, assemble, repair, or verify LAiDIES Weekly Episode and trailer video from approved stills, animation clips, narration, and cue records. Use for episode cuts, shot replacement, Canva image-to-video work, CapCut assembly, review sequences, export repair, or episode-media QA where retired assets and current visual authority must be enforced.
---

# Produce LAiDIES Episode Video

Treat every run as a fresh production assignment. Repository records outrank remembered filenames, old builds, contact sheets, selectors, prompts, and prior chat.

## Start with a bounded packet

1. Read the current task and only the episode-specific sources routed by `operations/DECISIONS.md`.
2. Read `operations/episode-visual-system-lock.md` and `operations/assets/active-asset-registry.json`.
3. Run `npm run check:rejected-episode-media`. Stop on failure.
4. Read the current episode cut/cue decision record in full. Search its current rejection block and the quarantine manifest before selecting any input.
5. Bind each selected input by path, SHA-256, role, narration window, and approval authority in a build record. Absence of exact authority is `HOLD`, not permission to use the most recent-looking file.

Never preload episode archives or browse asset directories to pick by appearance. Archived and quarantined paths are evidence only.

## Produce in dependency order

1. Confirm narration and editorial purpose for each shot.
2. Use one approved still per animated shot. Canva creates animation; CapCut assembles and exports.
3. Prove the riskiest shot or transition in a short review sequence before rebuilding a full episode.
4. Inspect actual pixels and decoded motion at delivery size. Check identity, anatomy, physics, era, text, narration alignment, meaningful change, timing, continuity, and loop classification.
5. Keep maker inspection separate from independent judgment. Mechanical integrity cannot admit visual or editorial quality.

## Fail closed

Stop and report the exact conflict when:

- a source is rejected, retired, quarantined, missing, hash-mismatched, or absent from current authority;
- a historical selector, prompt, cue snapshot, or build receipt is being treated as current selection authority;
- a real historical person lacks a bound likeness image;
- the required narration, shot job, destination, or output path is unresolved;
- a purported loop has net travel or a generated-text asset was not checked character-for-character;
- the representative proof fails any objective or visible maker check.

Do not make another variant until the producer/checker that allowed a repeated known defect is repaired.

## Complete honestly

Run the changed-surface checks plus the episode's decode/integrity validator. Calibrate any new guard with deliberately bad input. Record `TECHNICAL_PASS` separately from independent editorial/visual acceptance, successor-master assembly, deployment, and public verification. Commit only owned paths and report anything not reviewed or released.

Read [episode-video-runtime.md](references/episode-video-runtime.md) only when choosing tools, evidence, or handoff fields.
