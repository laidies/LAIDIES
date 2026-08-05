# Claude Code Opus 5 independent NewsStand v22 review

Model ID: claude-opus-5  
Agent ID: claude-code-opus-5-newsstand-v22-20260805  
Candidate SHA-256: `f1f6ae95eae82d81b847f3e3f474a834b379010cac87ced60f70697b90449967` (`newsstand.html`; tuple below)  
Recommendation: **ADMIT** — local visual experience only

## Findings

**Identity — verified independently.** All five candidate hashes match: css `422531dd…`, catchup js `f2193796…`, contract `06b2a48d…`, browser `aa88c8c0…`. Brand ACCEPT `7382810d…` and maker receipt `f0c1afce…` match. The four mobile slot assets and the desktop rack crop `81df9892…` are exact ACTIVE registry entries, scope-bound by hash to this exact `newsstand.html`. IA ACCEPT, UX ACCEPT and red-team UNSHAKEN are present and bound to the same tuple.

**Integrity — both calibrations fail for the intended, distinct reasons.** Contract PASS (10 fixtures); browser PASS (210 checks). `overlap-mobile-paper-labels` → exit 1 at *“390 paper labels never overlap or strike through the next live field”*; `overflow-mobile-paper-status` → exit 1 at *“390 preserves each painted slot ratio and contains every live paper label”*. Different guards, not one catch-all. Treated as integrity only.

**V21's hold is genuinely closed, not re-asserted.** 320 has its own containment guard (`test-newsstand-reader-browser.mjs:885-886`) with the same slot-ratio, `scrollWidth<=clientWidth` and rect-containment predicate as the calibrated 390 one, plus a 10px floor at `:888` targeting `.ns-paper-index` — the rendered mobile control, not the hidden desktop proxy. The former fail-open path is gone: `visiblePublicationControl` (`newsstand.html:306-313`) resolves by `offsetParent !== null`, and `:833/:865/:877` assert focus lands on a control that is actually visible.

**Pixels, not prose.** At 5× zoom on all four 320px papers, every masthead, job, status chip and action label sits inside its painted paper face. The wrapped mint chips (`QUIET · AUG 3 / '26`) are legible and separated. The action's navy 2px rule renders *above* the artwork's teal retaining bar — no strike-through on Breaking, Daily or Tribune.

**Artwork supports, does not replace.** The four slot assets are genuinely text-free — rack, newsprint stack, colour-coded masthead band, retaining bar, zero copy. Every word is DOM inside a real `<button aria-pressed>`, and DOM order yields an accessible name of masthead + job + state + action. Compact and long status derive from one `state` and one timestamp (`:909-955`), so mobile and desktop truth cannot diverge.

**Experience.** Desktop 1440 is a continuous physical rack with four legible papers, honest quiet copy and a real headline preview. Rollover at 390 truthfully switches Daily to `LATEST · AUG 4 '26` / `OPEN LATEST` while Tribune stays current. Catch Me Up lands with its title fully below the sticky header (`:898`) and is date-led. Archive uses counted underlined topic links, not cards. Palette is vibrant Rewind-era; retired `#4b2148`/`#c9a227` absent; `SUNNYVAiLE` casing intact (7/7). Focus-visible is a 3px cyan outline at 3px offset, selected 4px pink — visible, not hover-only.

## Blocking defects

None.

## Non-blocking watch items

1. **Guard reference box is the button, not the paper face.** Containment is measured against the full artwork tile including the teal woodwork. With `width: fit-content; white-space: nowrap; max-width: none` on the action label, a longer string could overhang onto the rack surround and still pass. Current labels clear it by roughly 20px at 320.
2. **320 focus-return assertion is weaker than 390's.** `:911` checks only `dataset.edition`, omitting the `offsetParent !== null` clause its 390 counterparts carry. Behavior is correct because the resolver is width-agnostic, but the guard is thinner than the exact failure class V21 was held for.
3. **Calibration mutations inject only into the 390 page.** The 320 predicates are byte-identical to proven ones but never independently exercised against a bad input.
4. **Fixed percentage anchors** (26.5/40/58.5/74%) with no flow relationship between fields. Daily's job already runs three lines at 320 with roughly 7px headroom. A longer job string or a fifth publication needs re-checking — it will fail loudly in CI rather than silently, which is the right failure mode.
5. **Compact hold/stale/unavailable copy duplicates itself.** Status chip and action both render “Not published” / “Update needed” / “Unavailable”, dropping the date and wasting one of two fields; desktop carries the richer “Check overdue · not current”.
6. **Competing arrival actions persist** from the v12/v13 review — three full-width stacked buttons; the pink primary provides hierarchy but not separation.
7. **Desktop 1440 Catch Me Up** leaves a large empty right region below “Show what I missed”.

## Scope limits

Read-only; no file or service was mutated (`captureEvidence` no-ops without `NEWSSTAND_EVIDENCE_DIR`; evidence mtimes unchanged at 03:21). The pre-existing `M` markers in git are the maker's uncommitted V22 work, and the on-disk bytes hash to the stated candidate.

This is a local visual-experience admission for the exact five-file tuple only. It is not deployment, publication, public-origin verification, content or freshness approval, analytics or provider authority, or permission to restart the paused dispatcher. Headless Chrome only — no native assistive technology, no real device, no physical touch testing; the 10px figure is a visual floor, not an AT proof. I did not measure numeric contrast ratios. A prior PASS was not treated as authority; every hash, guard and calibration above was re-run and re-inspected here.
