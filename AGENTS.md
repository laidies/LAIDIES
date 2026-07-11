# ⚠️ TEMPORARY AUDIT EXCEPTION — added 2026-07-10, REMOVE after the audit run

For the CURRENT task ONLY — an exhaustive site review/audit — the "images only" scope
below is relaxed, and ONLY as follows:
- You MAY read ANY file in the repo (HTML, CSS, JS, JSON, MD, data, config) and browse the
  live site, in order to review it.
- You MAY create/write EXACTLY ONE file — `operations/external-review.md` — the findings report.

EVERYTHING ELSE in the contract below still holds with NO exceptions:
- Do NOT edit, create, move, rename, or delete ANY other file (no code, no content, no "helpful fixes").
- Do NOT run ANY git command (checkout / restore / reset / clean / stash / commit / push). This
  is the rule that saved a day of work — it is NOT relaxed.
- You are REVIEW-ONLY: report problems, do NOT fix them.

Once the audit report is delivered, this block is removed and the images-only contract fully resumes.

---

# CODEX SCOPE CONTRACT — read this before doing anything

**Your job is images. Nothing else.**

## Allowed
1. **Generate images** according to the brief files in `operations/codex-prompts/`.
2. **Save images** ONLY to the exact delivery path the active brief names —
   never anywhere else, never overwriting approved originals (briefs name a
   delivery subfolder for a reason).
3. **Review existing images** anywhere in the repo to inform your designs.
4. **Read information** (canon docs, copy, briefs, data files) to inform your
   designs.

## Forbidden — hard rules, no exceptions
- **NEVER edit, create, move, rename, or delete any non-image file.** No
  HTML, CSS, JS, JSON, or MD changes — not even "helpful" fixes. If a page or
  doc looks wrong, report it in your delivery notes and stop.
- **NEVER run git commands.** No checkout, restore, reset, clean, stash,
  commit, or push. On 2026-07-04 a file reset to HEAD destroyed a day of
  uncommitted work and required forensic recovery.
- **NEVER choose your own reference images.** Use only the reference paths
  the active brief names, and treat named off-limits files as radioactive.
- **NEVER delete or replace approved images.** Deliver re-rolls under the
  same filename in the brief's delivery subfolder; a human runs the swap.

## Workflow
Read the active brief → generate one image per run → save to the named
delivery path → report what you made and any concerns. That's the whole job.
