# Episode 01 verdict — HOLD / not launchable

**Candidate:** v21 controlled-motion review master (inventory SHA). **Current public truth:** narrated/illustrated listen-along, not this film.

| Time | Finding | Classification | Owner | Repair / retest |
|---|---|---|---|---|
| 00:00–19:32 | Complete audiovisual continuity, caption and semantic-alignment viewing was unavailable; no automatic-fail category is cleared. Matrix: `evidence-2026-07-25/episode-01-narration-visual-alignment-matrix.md`. | **FIX BEFORE LAUNCH** | Release QA | Full normal-speed, full-size watch and row-by-row actual-frame/caption verification. |
| 00:20.31 | Observed in supported Chrome playback: a clean, legible comic season-promo frame (“stops feeling behind / delegates to machines / builds her AI squad”). It is visually on-brand as a promo card, but it does not verify later narrative identity, setting, motion, timing or sound. | **POST-LAUNCH EXPERIMENT** | Episode Product Owner | No repair from this observation; retain as acceptable opening-card evidence only after full watch. |
| source set / all | Existing v21 review note says the master deliberately mixes comic text frames with earlier scenic/character rendering. That is an explicit style-drift risk against visual-lock §1; each offending source requires **full shot replacement**, not a camera move. | **FIX BEFORE LAUNCH** | Image Production Director | SHA-bound style/identity review of all 71 placements. |
| 00:27.50–19:32 | 24/71 placements use restrained 1.6% camera motion. A camera move is not evidence of meaningful character/object motion and cannot compensate for weak art or action. | **FIX BEFORE LAUNCH** | Animation Director | Replace only beats whose narration requires action with source-safe event/ambient motion; leave deliberate cards still. |
| 00:31.9–01:15.2 | **Observed extracted frames:** soft/painterly corporate-office people and environment alternate with hard-edged comic cards. This violates the locked master people-rendering style and creates an obvious “two shows spliced together” effect. **Entire scenic shots must be replaced**, not filtered or camera-moved. Evidence: `observed-frames/episode-01-contact-01.jpg`. | **FIX BEFORE LAUNCH** | Image Production Director | Re-render/replace each off-register scenic shot from its identity + master-style + setting references; run a 71-shot comparison. |
| all | Candidate is a review cut only. | **HIDE/LABEL FOR LAUNCH** | Release QA | Continue listen-along-only promise. |

**Definition of done:** all 71 actual candidate placements clear style/identity/location and narration-boundary review; motion semantics pass; recorded audio/VTT/player pass; complete viewing log attached.
