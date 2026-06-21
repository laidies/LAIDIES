# Episode 03 Remaining Dirty Audit

Date: 2026-06-20

Related committed handoff:

- `267d98f14775de64dfdaaa78eebfd3885a83a607`
- `Document approved Episode 3 handoff`

Scope:

- Live Episode files.
- Episode 3 image/assets.
- Episode template docs directly related to Episode 3 approval.
- Episode 3 QA/review files.

Out of scope:

- Dream Phone.
- Backend/signup/Supabase/Buttondown/Hyvor/Plausible.
- Social/production engine.
- `operations/prototypes/**`.
- Homepage/Season desktop recovery.
- Deep review of unrelated parked work.

## Command Check

Commands requested by Ali were run before this audit file was created:

- `git status --short`
  - Current working tree is still very dirty: 231 status lines.
- `git diff --name-only`
  - 55 tracked dirty paths.
- `git diff --cached --name-only`
  - Empty.

No files were staged, committed, or pushed.

## Executive Result

There are approved Episode 3 changes still dirty and uncommitted.

The live Episode 3 page is dirty and points to untracked Episode 3 assets. If `issues/issue-03.html` is committed without the referenced assets, the live page will have broken images.

Recommended next action:

- Commit one small Episode 3 cleanup after final scoped QA.
- Stage only the approved live Episode 3 source/page files, the eight image assets currently referenced by the live page, and this audit doc if Ali wants the audit preserved.
- Leave old image variants, old review mockups, social files, weekly command center files, and unrelated parked work untouched.

## A. Approved Episode 3 Change - Should Commit

| Path | Tracked / untracked | Reason | Recommended action | Risk |
| --- | --- | --- | --- | --- |
| `content/issues/issue-03.md` | Tracked, modified | Contains Ali-approved Episode 3 copy/structure updates: the Chutney heading split, `David, Meet Elle.`, the approved David/Elle bridge copy, and the corrected corkboard/trench-coat sentence. | Commit with the approved Episode 3 page state. | Medium: source markdown should stay aligned with the generated live HTML. |
| `issues/issue-03.html` | Tracked, modified | Contains approved live Episode 3 template/presentation updates: approved masthead image, no-coil Burn Book section image, updated section image map, `Gimme, Gimme More`, `The Receipts`, `Complete the Weekly Ritual`, glossary definitions, weekly rule card styling, and LAiDIES brand-wordmark styling. | Commit only with all referenced image assets listed below. | High if assets are omitted; otherwise medium because this is the live page. |
| `assets/episodes/issue-03/section-dont-pull-a-cher-v1.png` | Untracked | Referenced by the live page as Open Graph image, Twitter image, CSS hero fallback, masthead image, and the `So You Don't Pull a Cher` bridge image. Approved by Ali. | Commit with `issues/issue-03.html`. | High if omitted because multiple live references break. |
| `assets/episodes/issue-03/section-burn-book-problem-v3.png` | Untracked | Referenced by the live page for `The Burn Book Problem`. This is the approved no-coil replacement. | Commit with `issues/issue-03.html`. | High if omitted; approved fix depends on it. |
| `assets/episodes/issue-03/section-wrong-room-v1.png` | Untracked | Referenced by the live page for `She Doesn't Even Go Here`. | Commit with `issues/issue-03.html`. | High if omitted. |
| `assets/episodes/issue-03/section-read-the-file-v2.png` | Untracked | Referenced by the live page for `Elle Woods Would Like To See The File`. | Commit with `issues/issue-03.html`. | High if omitted. |
| `assets/episodes/issue-03/section-trust-layers-v4.png` | Untracked | Referenced by the live page for the Cher's Closet / trust-layer section. | Commit with `issues/issue-03.html`. | High if omitted. |
| `assets/episodes/issue-03/section-chutney-thrice-v2.png` | Untracked | Referenced by the live page for `Chutney Can Say It Thrice` and the older compatibility slug. | Commit with `issues/issue-03.html`. | High if omitted. |
| `assets/episodes/issue-03/section-show-your-work-v2.png` | Untracked | Referenced by the live page for `David, Meet Elle.`; approved by Ali as the winning image for that section. | Commit with `issues/issue-03.html`. | High if omitted. |
| `assets/episodes/issue-03/section-try-on-receipts-pass-v2.png` | Untracked | Referenced by the live page for `The Receipts Pass Study Montage`. | Commit with `issues/issue-03.html`. | High if omitted. |
| `operations/review-packets/episode-03-remaining-dirty-audit.md` | Untracked after this task | Requested audit packet. | Commit with the cleanup only if Ali wants the audit preserved. | Low. |

## B. Rejected / Parked - Do Not Commit

| Path | Tracked / untracked | Reason | Recommended action | Risk |
| --- | --- | --- | --- | --- |
| `assets/episodes/issue-03/section-burn-book-problem-v2.png` | Untracked | Old Burn Book image with the weird AI-generated coil Ali rejected. | Do not commit. | High if staged accidentally; it documents the rejected visual. |
| `assets/episodes/issue-03/section-burn-book-problem-v1.png` | Untracked | Older unused candidate; live page uses v3. | Leave parked. | Medium. |
| `assets/episodes/issue-03/section-chutney-thrice-v1.png` | Untracked | Older unused candidate; live page uses v2. | Leave parked. | Medium. |
| `assets/episodes/issue-03/section-first-betrayal-v1.png` through `section-first-betrayal-v4.png` | Untracked | Unused candidate sequence; no live Episode 3 references. | Leave parked. | Medium. |
| `assets/episodes/issue-03/section-forward-test-v1.png` and `section-forward-test-v2.png` | Untracked | Unused candidate images; no live Episode 3 references. | Leave parked. | Medium. |
| `assets/episodes/issue-03/section-read-the-file-v1.png` and `section-read-the-file-v3.png` | Untracked | Unused alternatives; live page uses v2. | Leave parked. | Medium. |
| `assets/episodes/issue-03/section-show-your-work-v1.png` | Untracked | Unused alternative; Ali approved v2. | Leave parked. | Medium. |
| `assets/episodes/issue-03/section-trust-layers-v1.png` through `section-trust-layers-v3.png` | Untracked | Unused alternatives; live page uses v4. | Leave parked. | Medium. |
| `assets/episodes/issue-03/section-try-on-receipts-pass-v1.png` | Untracked | Unused alternative; live page uses v2. | Leave parked. | Medium. |
| `assets/episodes/issue-03/section-wrong-room-v2.png` | Untracked | Unused alternative; live page uses v1. | Leave parked. | Medium. |
| `assets/episodes/issue-03/hero-art-brief.md`, `assets/episodes/issue-03/hero-art-brief 2.md`, `assets/episodes/issue-03/section-art-refresh-brief.md` | Untracked | Creative prompt/brief files from the image generation and refresh process. Some notes conflict with the final approved image decisions. | Do not commit with live cleanup. Preserve only if Ali asks for an art-process archive. | Medium. |
| `operations/review-packets/episode-03-image-audit.md` | Untracked | Older audit said no new production images were introduced. It is now stale because the approved Episode 3 state intentionally references new `assets/episodes/issue-03/` images. | Do not commit as-is. Supersede with this audit. | High if committed unchanged; it would mislead future review. |
| `operations/review-packets/episode-03-reader-preview.html` | Untracked | Review-only preview artifact, not the approved live page. | Leave parked. | Medium. |
| `operations/review-packets/episode-03-review.html` and `operations/review-packets/episode-03-review 2.html` | Untracked | Older review packets from before the final approved state. | Leave parked. | Medium. |
| `operations/review-packets/episode-03-editorial-rebrand-prototype.html` and `operations/review-packets/episode-03-editorial-rebrand-prototype 2.html` | Untracked | Prototype/rebrand experiments, not approved implementation. | Leave parked. | Medium to high if accidentally mixed into live cleanup. |
| `operations/review-packets/assets/episode-03-burn-book-editorial*.png`, `episode-03-receipts-pass-objects.png`, `episode-03-try-on-objects.png`, `episode-03-wrong-room-objects*.png` | Untracked | Review-only/generated candidate assets, not referenced by the live Episode 3 page. | Leave parked unless Ali explicitly wants an archive commit. | Medium. |

## C. Unknown - Needs Ali Review

| Path | Tracked / untracked | Reason | Recommended action | Risk |
| --- | --- | --- | --- | --- |
| `operations/review-packets/episode-glossary-term-coverage-audit.md` | Untracked | Useful follow-up doc for the `So You Don't Pull a Cher` glossary/concepts rule, including whether previous Episodes need cleanup. It is related to Episode 3 approval but not required for the live Episode 3 page to work. | Ask Ali whether to preserve it in a separate glossary/concepts cleanup commit. Do not mix into the live Episode 3 image/page commit unless explicitly approved. | Low to medium. |
| `operations/agent-council/issue-03-agent-council-review.md` | Tracked, modified | Episode 3-related operations doc, but outside the requested live Episode/template/image scope. | Leave untouched for this audit; review only in an operations-doc pass. | Medium if staged accidentally. |
| `operations/weekly-command-center-files/issue-03-*.html` and related Issue 3 weekly command files | Tracked, modified | Episode 3-related production/command-center materials, but not live Episode page files and not part of the approved handoff commit. | Leave untouched for this audit; review only in a production/weekly-command pass. | Medium if staged accidentally. |
| `operations/weekly-reviews/issue-03-production-review.md` | Tracked, modified | Episode 3 review/production material, but not part of the approved live-page cleanup. | Leave untouched unless Ali explicitly asks for production review docs. | Medium. |

## D. Unrelated Parked Work - Ignore For This Audit

| Path / group | Reason | Recommended action |
| --- | --- | --- |
| `issues/issue-01.html` | Live Episode 1 file is dirty, but it is not part of the Episode 3 approval cleanup. | Leave untouched. |
| `issues/issue-02.html` | Live Episode 2 file is dirty, but it is not part of the Episode 3 approval cleanup. | Leave untouched. |
| `content/episode-index.json`, `content/site/quizzes.json`, `content/site/site-data.js`, `episodes.html`, `index.html` | Homepage/Season/data work exists in the tree and should be handled in the later desktop recovery / site data pass, not here. | Leave untouched. |
| `content/printables/previews/issue-03-elle-receipts-pass-contact-sheet.png` | Episode 3 printable preview asset, but not used by the live Episode 3 article page. | Leave for printable/Bag QA. |
| `operations/briefs/episode-03-song-brief*.md` | Episode 3 song/brief docs, outside live Episode article cleanup. | Leave untouched. |
| `operations/review-packets/assets/live-mobile-ux/*issue03*.png`, `operations/review-packets/assets/season-episode-03-status/**`, `operations/review-packets/assets/site-foundation-cleanup/*issue03*.png` | Old screenshot evidence from other audits. | Leave untouched unless a separate audit/screenshots commit is approved. |
| `social/episodes/issue-03-instagram-launch-package.md` and `social/visual-preview/issue-03-instagram-launch/**` | Social production engine / launch assets. Explicitly out of scope. | Leave untouched. |
| Dream Phone files, backend/signup/Supabase/Buttondown/Hyvor/Plausible, `operations/prototypes/**`, and other unrelated parked work | Explicitly out of scope. | Leave untouched. |

## Direct Answers

1. **Are there any remaining approved Episode 3 live changes that still need committing?**
   Yes. `issues/issue-03.html` and `content/issues/issue-03.md` contain approved Episode 3 changes.

2. **Are there any remaining Episode 3 image assets that should be staged?**
   Yes. The live page currently references eight untracked image files under `assets/episodes/issue-03/`.

3. **Is `issues/issue-03.html` clean or dirty?**
   Dirty.

4. **If dirty, are the hunks approved or unapproved?**
   The hunks match the approved Episode 3 handoff: masthead/image decisions, section split, resources/receipts layout, weekly ritual behavior, definition terms, and brand styling. Treat as approved, but do not commit it without the referenced assets.

5. **Should we commit a small Episode 3 cleanup next, or leave everything parked?**
   Commit a small Episode 3 cleanup next if Ali wants the approved live Episode 3 state preserved. Leave all unused variants and unrelated parked work out.

6. **Exact safe staging list if committing the approved Episode 3 cleanup next:**

   - `content/issues/issue-03.md`
   - `issues/issue-03.html`
   - `assets/episodes/issue-03/section-burn-book-problem-v3.png`
   - `assets/episodes/issue-03/section-chutney-thrice-v2.png`
   - `assets/episodes/issue-03/section-dont-pull-a-cher-v1.png`
   - `assets/episodes/issue-03/section-read-the-file-v2.png`
   - `assets/episodes/issue-03/section-show-your-work-v2.png`
   - `assets/episodes/issue-03/section-trust-layers-v4.png`
   - `assets/episodes/issue-03/section-try-on-receipts-pass-v2.png`
   - `assets/episodes/issue-03/section-wrong-room-v1.png`
   - `operations/review-packets/episode-03-remaining-dirty-audit.md` if Ali wants this audit preserved with the cleanup.

7. **Exact files to leave untouched:**
   Leave every other dirty/untracked file untouched, especially:

   - `issues/issue-01.html`
   - `issues/issue-02.html`
   - all unused `assets/episodes/issue-03/*` variants not listed in the safe staging list
   - `operations/review-packets/episode-03-image-audit.md`
   - old Episode 3 review/prototype HTML files
   - `operations/review-packets/episode-glossary-term-coverage-audit.md` unless Ali separately approves preserving it
   - homepage/Season data and layout files
   - social/production engine files
   - backend/signup/Supabase/Buttondown/Hyvor/Plausible files
   - Dream Phone files
   - `operations/prototypes/**`

## Final Confirmation

This audit created/updated only:

- `operations/review-packets/episode-03-remaining-dirty-audit.md`

No live Episode files were edited by this audit.
Nothing was staged.
Nothing was committed.
Nothing was pushed.
`git add` was not used.
