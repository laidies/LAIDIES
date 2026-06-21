# Episode 03 Approved Handoff For ChatGPT

Date: 2026-06-20

Status: **Ali approved Episode 03 article presentation**

Local review URL used during approval:

- `http://127.0.0.1:4215/issues/issue-03.html?duplicateAudit=after-clips-desktop`

This handoff supersedes the older Episode 3 QA notes where they conflict, especially around the final masthead image, section split, and template rules added after Ali's manual review.

## Executive Summary

Episode 03, `The Burn Book Problem`, is approved by Ali after manual review and iterative fixes.

The approved direction preserves the Episode hybrid template while tightening Episode 3's article-specific pacing, image usage, and recurring section behavior. It should be treated as the current approved Episode 3 state and as an important input to the shared Episode template extraction.

## Final Approved Episode 3 Changes

Live/source files changed in this approval pass:

- `issues/issue-03.html`
- `content/issues/issue-03.md`
- `operations/review-packets/episode-mobile-template-standard.md`
- `assets/episodes/issue-03/section-dont-pull-a-cher-v1.png`
- `assets/episodes/issue-03/section-burn-book-problem-v3.png`

No staging, commit, or push has been done for this handoff.

## Approved Image Decisions

Masthead image:

- `assets/episodes/issue-03/section-dont-pull-a-cher-v1.png`
- Approved by Ali.
- Shows pink gavel, Burn Book, receipts checklist, plaid clue, and `I OBJECT!`.
- Also used later before `So You Don't Pull a Cher`.
- Ali approved this repetition because it is not adjacent to the article section image and better supports the Episode's approved legal/receipts visual world.

Burn Book Problem section image:

- `assets/episodes/issue-03/section-burn-book-problem-v3.png`
- Approved no-coil version.
- Replaces the prior weird coil version.
- Used in the `The Burn Book Problem` body section only.

David, Meet Elle section image:

- `assets/episodes/issue-03/section-show-your-work-v2.png`
- Approved as the winner for the practical guidance section.
- Shows `Confidence Isn't Evidence` and `Show Your Work`.
- Appears after the opening David/Elle bridge paragraph, not directly under the heading.

Important image rules confirmed:

- Do not use unrelated activity images on Episode pages.
- Do not invent or borrow non-Episode images without approval.
- Use Episode-specific images.
- Avoid accidental adjacent repetition.
- If the same image repeats, it must be intentional and approved.
- Section images should appear after one or two setup sentences, not automatically before the reader has context.

## Final Section Structure

Ali felt the former heading `Chutney Can Say It Thrice. Elle Still Checks The Timeline.` was too long and doing too much.

Approved split:

1. `Chutney Can Say It Thrice`
   - Purpose: false reassurance from asking AI the same question repeatedly.
   - Keeps the Chutney / repetition / tool-improvement caution.

2. `David, Meet Elle.`
   - Purpose: bridge from Episode 2's David Rose specificity lesson into Episode 3's Elle Woods verification lesson.
   - Approved opener:
     `Last week, David Rose taught us to say what we want. This week, Elle teaches us what to check before we believe what comes back.`
   - Then image:
     `assets/episodes/issue-03/section-show-your-work-v2.png`
   - Then approved follow-up:
     `This means we are reducing the mess before it even starts. Receipts? Obviously. No Regina George-style source of "truth" here.`

This section split should inform the reusable Episode template: if a section starts doing two jobs, split it instead of writing an overlong heading.

## Template Rules Now Captured

Updated:

- `operations/review-packets/episode-mobile-template-standard.md`

Rules added:

1. **Section Image Placement Standard**
   - Section heading first.
   - One or two setup sentences.
   - Then the Episode-specific image.
   - Then explanation, lists, practical guidance, or deeper argument.

2. **Section Scope And Heading Length Standard**
   - Keep headings editorial and scannable.
   - Avoid headings that combine multiple metaphors or character references.
   - Split sections when the section moves from cautionary setup into practical guidance.
   - Example approved: `Chutney Can Say It Thrice` plus `David, Meet Elle.`

These rules should be incorporated into any future shared Episode template extraction.

## Other Approved Episode 3 Presentation Decisions

Episode 3 now follows the approved hybrid Episode system:

- Pearl/blush masthead wash.
- Live LAiDIES logo/title/subtitle/date over the masthead image.
- Sticky Episode nav.
- `Previously On LAiDIES...` and `On This Episode...` intro cards.
- Section headings with colored bar and full pink heading block.
- One image before every major section heading except `I couldn't help but wonder...`, where the heading itself begins the article.
- `So You Don't Pull a Cher` as recurring definition section.
- `Gimme, Gimme More` and `The Receipts` at the bottom, not as a mid-article receipts drawer.
- `Next Time On LAiDIES...` as its own section, not inside the definitions block.
- `Complete the Weekly Ritual` as the bottom ritual handoff.
- `See full ritual` control styled as a full-width pill aligned with `Go to the Weekly Bag`, with the plus on the right.

## Content Notes For Future Episodes

Ali flagged that Episode 3 has some short sentences that read AI-ish. She chose to keep Episode 3 as-is after this pass, but this is an important rule for Episode 4 and beyond:

- Avoid clusters of clipped, generic sentences.
- Preserve Ali's voice.
- Do not add generic AI-writing filler.
- Avoid language Ali would not write.
- Do not introduce terms or concepts that do not fit the article's weekly lesson.

Approved Episode 3 sentence correction already made:

- `A corkboard and trench coat are optional (although that sounds like it could be fun...).`

## Definition / Glossary Rule

Ali confirmed the recurring `So You Don't Pull a Cher` section should contain AI-specific or AI-adjacent terms relevant to that week's article.

Episode 3 definitions were adjusted toward this standard:

- Hallucination
- Grounding
- Retrieval

Follow-up rule:

- Any term used in `So You Don't Pull a Cher` should also be checked against the site's Concepts / glossary area.
- This should be done for Episode 1, Episode 2, and Episode 3 before scaling the template to future Episodes.

## Brand Styling Rule

Ali confirmed this as a standing rule:

- `LAiDIES`
- `LAiDY`
- `Mme CLAi-O`
- `Madame CLAi-O`
- `FAiRY GODMOTHER`

The `Ai` letters should be styled in the accent color wherever these names appear in styled HTML contexts.

Related files touched earlier in the working tree:

- `assets/brand/README.md`
- `content/site/brand-polish.js`

## QA Completed During Approval

Verified locally after the final Episode 3 changes:

- Desktop 1440: no console errors.
- Mobile 390: no console errors.
- No horizontal overflow on desktop or mobile.
- `David, Meet Elle.` renders as its own heading.
- The first David/Elle bridge paragraph renders before the section image.
- `section-show-your-work-v2.png` loads at `1672x941`.
- The next paragraph starts with `This means we are reducing the mess before it even starts...`
- Old long heading `chutney-can-say-it-thrice-elle-still-checks-the-timeline` is gone.
- New shorter heading `chutney-can-say-it-thrice` exists.
- Old weird-coil image `section-burn-book-problem-v2.png` is no longer referenced.
- Legacy `assets/issue-03-hero.png` is no longer referenced in the live Episode 3 page or social metadata.
- All Episode 3 referenced image paths resolve.

## Known Dirty / Uncommitted State

Relevant dirty/untracked files after this approval work:

- `content/issues/issue-03.md`
- `issues/issue-03.html`
- `operations/review-packets/episode-mobile-template-standard.md`
- `operations/review-packets/episode-03-approved-chatgpt-handoff.md`
- `assets/episodes/issue-03/section-burn-book-problem-v3.png`
- `assets/episodes/issue-03/section-dont-pull-a-cher-v1.png`

There are many unrelated dirty/untracked files elsewhere in the working tree from other parked work. Do not stage broadly.

## Recommended Next Step

Recommended next Codex task:

1. Run a final scoped QA for approved Episode 3 and template-standard updates.
2. Stage only the approved Episode 3 files and this handoff, if Ali wants to preserve it.
3. Commit with a scoped message such as:
   `Finalize approved Episode 3 template refinements`

Do not include:

- Dream Phone work.
- Homepage desktop recovery work unless explicitly requested.
- Backend/signup/Supabase/Buttondown files.
- Social/production engine files.
- Prototypes.
- Unrelated parked work.

## Pasteable ChatGPT Prompt

Ali approved the current Episode 3 presentation after manual review. Please evaluate the final Episode 3 state and the template implications before Codex commits or scales the pattern.

Important approved changes:

- Episode 3 masthead now uses `assets/episodes/issue-03/section-dont-pull-a-cher-v1.png`.
- The Burn Book body section uses the fixed no-coil `section-burn-book-problem-v3.png`.
- The practical guidance section now starts with `David, Meet Elle.`
- Approved bridge copy:
  `Last week, David Rose taught us to say what we want. This week, Elle teaches us what to check before we believe what comes back.`
- The `section-show-your-work-v2.png` image appears after that opening bridge paragraph.
- Approved follow-up copy:
  `This means we are reducing the mess before it even starts. Receipts? Obviously. No Regina George-style source of "truth" here.`
- Template rule: section images should usually appear after one or two setup sentences, not immediately under the heading.
- Template rule: long headings should be split into shorter editorial sections when a section starts doing two jobs.
- Episode 3 is approved by Ali, but future Episodes should avoid generic AI-ish short sentence clusters.

Please review whether these final choices should be committed as-is and whether the template standard captures the right reusable rules.
