# Independent Brand verdict — Cycle 8I Homepage contrast successor

**Verdict: HOLD — frozen visual tuple is not decision-admissible.**

**Evidence time:** 2026-07-27 PDT  
**Judge scope:** independent Brand review of the exact frozen Cycle 8I tuple
only. No candidate source, render, manifest, receipt, production, shared or
public file was changed by this review. This is not an Ali decision,
integration, deployment, publication or style-system approval.

## Checksum-bound objects reviewed

| Object | SHA-256 verified | Result |
| --- | --- | --- |
| Control Room brief | `5e50463d6d25e8e8978acc44e1549b7300f83bcee56473eaee7357d19e111352` | PASS |
| Successor manifest | `52c41416d138d8344f7b0e28f11c84030335b991d2b10e27b5799dd7570632de` | PASS |
| Local pre-judge receipt | `a2bcc3f427d8c1a564a1dc53c11ec70814c555f5e4f0a622bdabaddfb5cf149b` | PASS |
| Contrast gate | `03d784686eeb527d586a8e02f19b05366664370b291d7ac0785f5ab89a940f9f` | PASS: 0 reported unambiguous solid-surface failures at both viewports |
| Diagnostics | `47632a2af556eb3bd03e9320fe4cc97ee32a0402b5115efe7352617de22c790d` | PASS for declared structural/image checks; insufficient for Brand admission |
| Desktop baseline / successor renders | `507eaf3a…e3545` / `95ec1546…18c97` | Bytes match manifest; full-resolution visual evidence invalid (below) |
| Mobile baseline / successor renders | `9516888b…9939e0` / `88ecde20…59b44` | Bytes match manifest; full-resolution visual evidence invalid (below) |
| Desktop / mobile comparison sheets | `6a5f3c75…b0b85` / `2b1b584a…34023` | Bytes match manifest; expose the same capture fault |

## Automatic HOLD — full-page visual evidence is invalid

The four PNGs are checksum-consistent, but they are not credible full-page
captures of either homepage. Original-resolution inspection shows the topbar
and masthead repeated down the same image with large blank white bands between
sections:

- the 1440 baseline repeats the initial header/masthead at about y=0, 2,750,
  5,250 and 10,500; the successor repeats the same pattern;
- the 390 baseline and successor similarly repeat the masthead/hero instead
  of progressing through a continuous mobile page;
- a solely colour-token CSS delta cannot explain the reported desktop document
  height changing from 11,941px to 13,946px while the mobile height moves from
  18,950px to 18,582px; and
- the supplied side-by-side sheets preserve that discontinuity rather than
  providing a legible incumbent-versus-successor comparison.

This prevents a reviewer from seeing the actual whole-page hierarchy,
environmental scenes, repeated-container behavior, responsive composition, or
whether any visual regression is present. It also makes the incumbent
comparison non-deterministic. The brief requires fresh-tab **full-page**
desktop/mobile evidence and a Brand material-superiority judgment; a repeated
viewport/stitch result cannot satisfy either requirement.

The inherited frozen Cycle 8H hero pixel PASS, matching hero source/geometry,
and no declared hero-targeted CSS delta are useful scope evidence, but they do
not cure an invalid full-page evidence set.

## Required Brand floors

| Floor | Score /20 | Reason |
| --- | ---: | --- |
| Adult editorial / graphic-novel craft | **0** | Not assessable across the actual full page; repeated hero/blank-band capture is not an authored page composition. |
| Controlled electric 90s vibrancy | **0** | First viewport appears within the allowed palette, but the whole-page colour field cannot be judged from invalid capture evidence. |
| Hierarchy and cohesion | **0** | The repeated masthead and blank seams destroy the evidence needed to assess hierarchy. |
| Imagery authority / job compliance | **0** | Diagnostics report 18/18 completion, but visual job placement and authority cannot be judged in the invalid sequence. |
| Readable contrast | **0** | The numerical solid-surface diagnostic passes, but 39 image/gradient cases per viewport require visual assessment that this evidence cannot provide. |
| Mobile quality | **0** | The 390 capture repeats the hero rather than showing a continuous mobile journey. |
| Environment-as-interface | **0** | Town/building scenes are not presented as a continuous environment for review. |
| Repeatability without dark rounded-container grammar | **0** | The actual family/spatial grammar is not visible or comparable. |

Every required floor needs at least 17/20. No floor is awarded because the
render fault makes material-superiority and no-regression claims impossible to
evaluate honestly. This HOLD does not assert that the frozen candidate source
is visually wrong; it establishes that the exact visual evidence cannot admit
it.

## Recommendation, remaining work and next action

Preserve Cycle 8I as **HOLD / DO NOT PRESENT** evidence. Do not repair this
frozen candidate in place. A separately authorized successor must recreate
fresh, continuous full-page 1440×900 and 390×844 captures using a capture
method that scrolls the document once without repeated fixed viewport/header
tiles or blank seams; it must then rebuild the comparison sheets, reseal a new
tuple, and receive fresh Town Entry and Brand judgments. The successor still
has to keep the defect-only colour scope and all locked copy/hero/image/IA
invariants.

No live/shared/production mutation, deploy, spend, publication or Ali approval
is authorized or implied.

**Verdict payload SHA-256:** `88d1d25d0d008912f4aa59687a6be490d3a5ed511db2c448bc2f3ba7487e85f4`

**Hash rule:** SHA-256 of this file with the `Verdict payload SHA-256` line
omitted, after its final newline.
