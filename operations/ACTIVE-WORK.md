# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIVE-SITE-MIXED-ARTIFACT-RECOVERY-20260828
- **Status:** BUILDING
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-29 America/Vancouver
- **Goal:** Repair every reproducible visitor-facing route defect on phone and laptop without rolling back the recovered Library, radio, episode or other protected public surfaces.
- **Acceptance:** All 84 public routes render without blank output or horizontal overflow at 390x844 and 1200x814; MAiKEOVER/Resident Card, Library guidance and Episode listen controls receive their own mobile hit-test points; Chick Flicks and Watch physically scroll; the later one-newspaper NewsStand and its bounded current story are public; exact immutable/custom bytes and the latest production deployment agree.
- **Current step:** Runtime-dependency repair is public in deployment `0b5b31b4-fc3e-49ec-9dda-3066113b906f` from source `8d8112a1479c2e5b7bdc894020faa0ce26cea5d4`. The exact 619-file successor changed only `library.html` and `visitors-centre.html`; both immutable and custom origins match the candidate bytes, load zero `/operations/` resources, have no console errors or horizontal overflow, and retain full vertical scroll at desktop and 390x844. The other twelve former timeout routes did not reproduce as failures. Backend tracing found the configured Supabase project hostname is NXDOMAIN, which blocks the Resident sign-in, account-backed Card and cross-device continuation service even though the browser contracts and migrations are present.
- **Next action:** Recover the correct existing Supabase project binding from provider authority; both available browser profiles are signed out, so do not guess a replacement project or claim Resident backend restoration until provider access and a controlled two-device session exist. Reconcile the recovered LUMINAiRY wing/profile assets into the active-asset registry before claiming that a fresh full public build, rather than the exact production-overlay path, is reproducible.

## Boundaries

- Source iCloud checkout remains preservation-sensitive and contains extensive
  pre-existing dirty work. This task made no source-checkout writes.
- Production source worktree: `/Users/alisoneakin/Projects/laidies-live-site-recovery-20260828`
- Current production source binding: `8d8112a1479c2e5b7bdc894020faa0ce26cea5d4`
- Current production deployment: `0b5b31b4-fc3e-49ec-9dda-3066113b906f`
- Source branch: `codex/live-site-recovery-20260828`
- No reset, clean, deletion of source work or unrelated provider mutation was performed. The iCloud checkout remained untouched. The stray `logo-preview.html` route is absent from the deployment artifact and redirects home; its source remains recoverable. LUMINAiRY source from `8bd12a4f` is included in this release.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.

The operation-agent blueprint task is paused at its prior exact review point;
it is not activated authority and cannot block the 24-hour recovery objective.
