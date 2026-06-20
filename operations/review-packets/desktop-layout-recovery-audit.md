# Desktop Layout Recovery Audit

Date: 2026-06-20

Status: **AUDIT / PLAN ONLY - DO NOT IMPLEMENT FROM THIS PACKET WITHOUT ALI APPROVAL**

Council result: **REVISE INTERNALLY BEFORE MORE EPISODE ROLLOUT**

## Executive Summary

Ali's desktop concern is valid, but the audit did not find one simple broken `width: 25%` bug or horizontal overflow. The desktop issue is a system inconsistency:

- Homepage and Season pages use full-width sections, but many important inner elements are capped into small centered islands.
- Episode 1 and Episode 3 use conservative article shells around 1100-1120px with 720px article columns. This is readable, but can feel small on wide desktop.
- Episode 2 has uncommitted desktop experiments that make it much wider than Episode 1/3. The approved masthead style is strong, but the wide article experiment should be normalized before Episode 2 is finalized.
- `styles.css` has dirty/mixed parked edits, including a world architecture block that affects shared page patterns such as `.page-intro` and `.world-next-panel`. Do not use a broad shared-style commit until exact hunks are isolated.

The immediate blocker is not mobile. Mobile 390 screenshots did not show horizontal overflow in the audited pages. The immediate blocker is desktop scale: the site needs one deliberate desktop layout system instead of page-by-page caps and emergency width patches.

## Preflight State

Preflight before this audit:

- `git diff --cached --name-only` was empty.
- `issues/issue-02.html` was dirty before this audit.
- `styles.css` was dirty/mixed before this audit.
- `index.html` and `episodes.html` were also dirty before this audit.
- Many unrelated dirty/untracked files already exist in the workspace and were treated as parked work.

Files changed by this audit:

- `operations/review-packets/desktop-layout-recovery-audit.md`
- `operations/review-packets/assets/desktop-layout-recovery-audit/*`

No production page implementation was performed in this audit.

## Files Inspected

- `index.html`
- `episodes.html`
- `issues/issue-01.html`
- `issues/issue-02.html`
- `issues/issue-03.html`
- `styles.css`
- `script.js`
- `content/episode-page.css`
- `content/episode-page.js`
- `operations/review-packets/episode-mobile-template-standard.md`
- `operations/review-packets/episode-01-approved-template-qa.md`
- `operations/review-packets/episode-02-template-alignment-qa.md`
- `operations/review-packets/mobile-episode-ux-audit.md`
- `operations/review-packets/episode-terminology-and-template-audit.md`

Spot-check candidates still recommended for a later pass:

- `this-week.html`
- `learn/quiz.html`
- `hot-goss.html`
- `reference-closet.html`
- `community.html`
- `clubhouse.html`

## Screenshot Evidence

Screenshots and measurement JSON were saved under:

`operations/review-packets/assets/desktop-layout-recovery-audit/`

Core screenshots:

- `homepage-desktop-1280.png`
- `homepage-desktop-1440.png`
- `homepage-desktop-wide.png`
- `homepage-mobile-390.png`
- `homepage-desktop-1440-mid.png`
- `episodes-desktop-1280.png`
- `episodes-desktop-1440.png`
- `episodes-desktop-wide.png`
- `episodes-mobile-390.png`
- `episodes-desktop-1440-list.png`
- `episode01-desktop-1280.png`
- `episode01-desktop-1440.png`
- `episode01-desktop-wide.png`
- `episode01-mobile-390.png`
- `episode01-desktop-1440-article.png`
- `episode02-desktop-1280.png`
- `episode02-desktop-1440.png`
- `episode02-desktop-wide.png`
- `episode02-mobile-390.png`
- `episode02-desktop-1440-article.png`
- `episode02-desktop-wide-article.png`
- `episode03-desktop-1280.png`
- `episode03-desktop-1440.png`
- `episode03-desktop-wide.png`
- `episode03-mobile-390.png`
- `episode03-desktop-1440-article.png`
- `desktop-layout-recovery-audit-results.json`

## Measurement Summary

Automated desktop/mobile capture found:

| Page | 1440 behavior | Wide desktop behavior | Mobile 390 | Notes |
| --- | --- | --- | --- | --- |
| Homepage | Hero is full-width; key text is readable in local capture | Hero stays full-width, but downstream content is centered/capped | No overflow | Ali's tiny-page screenshot may involve browser zoom/app capture scale, but the page still has several centered island sections that can feel under-scaled. |
| Season / Episodes | `.section-grid` is full-width; intro text maxes around 680px | Same full-width structure; content has huge surrounding white space | No overflow | Needs a calmer max shell or stronger editorial banding, not random full-width text. |
| Episode 1 | `preview-shell` 1120px; article column 720px; body around 16-17px | Still 1120px on 1920 desktop | No overflow | Approved by Ali, but desktop feels conservative and should be gently widened only through shared system rules. |
| Episode 2 | Dirty experiment: shell 1312px; article card 877px; body around 18.5px | Dirty experiment: shell 1680px; article card 1080px | No overflow | Masthead style approved. Wide article is too loose at 1920 and should be normalized. |
| Episode 3 | `preview-shell` 1100px; article column 720px; body around 16.5-17px | Still 1100px on 1920 desktop | No overflow | Best older visual reference but not final desktop sizing standard. |

Console/page errors:

- No page errors were detected.
- Homepage, Season, Episode 1, and Episode 2 logged only the local analytics warning `Ignoring Event: localhost`.
- Episode 3 had no relevant console warnings in this capture.

## Page-by-page Findings

### Homepage: `index.html`

Screenshot paths:

- `operations/review-packets/assets/desktop-layout-recovery-audit/homepage-desktop-1440.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/homepage-desktop-wide.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/homepage-mobile-390.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/homepage-desktop-1440-mid.png`

Current behavior:

- The masthead hero is full-width in local capture and does not technically have horizontal overflow.
- Several lower homepage blocks use max widths around 980-1180px, leaving large side margins on wide desktop.
- Existing dirty `index.html` changes are page-local and include masthead/hero tuning and world-section wording/layout adjustments.
- Dirty shared `styles.css` world architecture rules may also influence homepage-adjacent objects and future pages.

Readability issues:

- The homepage screenshot Ali shared makes the full page feel zoomed out and tiny. The local capture did not reproduce that exact scale at default viewport, so browser zoom / app capture scaling should be checked manually before blaming only CSS.
- Still, the current homepage relies on many centered blocks. On wide desktop, that creates a rhythm of full-bleed hero followed by small islands.

Recommendation:

- Treat homepage desktop as a separate polish pass after Episode desktop system stabilization.
- Keep the approved image-led homepage masthead direction.
- Explore applying the approved Episode subtitle-card treatment to homepage supporting copy: translucent card, short colored accent line, pearl/blush glass, readable over image.
- Do not combine homepage redesign with Episode 2 finalization.

Risk level: **medium** because `index.html` and `styles.css` already contain unrelated dirty changes.

### Season / Episodes: `episodes.html`

Screenshot paths:

- `operations/review-packets/assets/desktop-layout-recovery-audit/episodes-desktop-1440.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episodes-desktop-wide.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episodes-mobile-390.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episodes-desktop-1440-list.png`

Current behavior:

- Page intro is centered and capped around 920px via shared dirty `.page-intro` rules.
- Season list area uses a large two-column desktop grid.
- On wide desktop, the page is not broken, but the intro and cards can feel like floating islands inside too much empty canvas.

Readability issues:

- Text is readable, but the top composition needs stronger visual anchoring on desktop.
- Full-width section width plus narrow inner text creates a mismatch: technically wide, emotionally tiny.

Recommendation:

- Add a season-page desktop shell rule in a later implementation pass: a deliberate max content width around 1280-1360px, centered, with full-width background bands where needed.
- Keep the Episode 1/2/3 order and Episode terminology.
- Do not redesign the Season page during Episode 2 final QA.

Risk level: **medium** because `episodes.html` is already dirty and `styles.css` shared intro rules affect it.

### Episode 1: `issues/issue-01.html`

Screenshot paths:

- `operations/review-packets/assets/desktop-layout-recovery-audit/episode01-desktop-1440.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episode01-desktop-wide.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episode01-mobile-390.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episode01-desktop-1440-article.png`

Current behavior:

- Approved Episode 1 masthead remains coherent.
- Desktop shell is capped at 1120px.
- Article grid is 720px article + 230-300px side rail.
- Body paragraphs are mostly 16-17px with 1.7-ish line-height.

Readability issues:

- Reading column is acceptable, but the full page feels conservative on 1440 and especially wide desktop.
- It should not be widened to Episode 2's current dirty 1080px article body. That would make long lines too loose.

Recommendation:

- Keep Episode 1 visually approved.
- In a future shared desktop system pass, gently increase the Episode shell to around 1240-1320px and article column to around 780-860px, with paragraph measure capped near 68-76ch.
- Preserve mobile exactly unless QA shows a direct conflict.

Risk level: **medium-low** because Ali has approved Episode 1 and it should not be destabilized.

### Episode 2: `issues/issue-02.html`

Screenshot paths:

- `operations/review-packets/assets/desktop-layout-recovery-audit/episode02-desktop-1440.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episode02-desktop-wide.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episode02-mobile-390.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episode02-desktop-1440-article.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episode02-desktop-wide-article.png`

Current behavior:

- Episode 2 has uncommitted refinements after the alignment commit.
- The masthead style is approved by Ali as the reusable Episode masthead direction.
- The current dirty desktop layout widens beyond Episode 1/3:
  - at 1440: shell about 1312px, article about 877px
  - at 1920: shell about 1680px, article about 1080px
- Body text is larger than Episode 1/3, around 18.5-18.8px.

What to keep:

- Subtitle: `AI can't read your mind. Be David Rose about it.`
- Approved masthead style:
  - strong Episode-specific background image
  - pearl/blush wash
  - translucent LAiDIES logo block
  - Episode pill
  - large editorial title
  - subtitle card with colored accent line
  - date to the right on desktop, stacked on mobile
  - no long line over the Episode pill

What to refine:

- Do not keep the 1680px wide shell / 1080px article body on wide desktop.
- Keep the article more readable by capping long paragraphs. Wide media/cards can use a larger card width, but paragraph text should not run across the whole article card.
- Normalize Episode 2 desktop values against a shared Episode system before committing.

Recommendation:

- First implementation slice should stabilize Episode 2 only, page-locally:
  - set Episode 2 shell to a controlled max around 1280-1360px
  - article grid around 820-900px + 300-340px side rail
  - body text around 17.5-18px
  - long paragraph measure capped around 72ch
  - preserve mobile media queries and approved masthead treatment
- After this passes QA, decide whether to extract shared Episode CSS.

Risk level: **medium-high** because this is the active dirty file and contains the recent experimental desktop changes.

### Episode 3: `issues/issue-03.html`

Screenshot paths:

- `operations/review-packets/assets/desktop-layout-recovery-audit/episode03-desktop-1440.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episode03-desktop-wide.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episode03-mobile-390.png`
- `operations/review-packets/assets/desktop-layout-recovery-audit/episode03-desktop-1440-article.png`

Current behavior:

- Hero is full-width and image-led.
- Article shell is capped at 1100px with a 720px article column and 220-280px side rail.
- Body text is around 16.5-17px.

Readability issues:

- Still a good visual reference, but not the final desktop sizing standard.
- Episode 3's image-led hero uses desktop width better than Episode 1/2 article shells, but its article body still feels conservative on wide desktop.

Recommendation:

- Do not update Episode 3 until Episode 2 and the shared desktop system are stabilized.
- Eventually bring Episode 3 into the final Episode masthead/template system without reducing its editorial quality.

Risk level: **medium** because Episode 3 has its own older page-local system.

## Desktop Gold-standard Recommendation

Use a controlled editorial desktop system rather than full-bleed everything.

Recommended Episode desktop values:

- **Episode masthead shell:** max around `1280px-1360px`, width `calc(100% - 48px/64px)` on desktop, centered.
- **Masthead behavior:** image-led, large enough to feel premium, but not stretched to the entire 1920px viewport.
- **Article shell:** max around `1240px-1320px`.
- **Article grid:** article card around `780px-860px`; side rail around `300px-340px`; gap around `40px-64px`.
- **Body font:** `17px-18px` desktop, line-height `1.65-1.72`.
- **Paragraph measure:** cap long paragraphs around `68ch-76ch`; allow images, pull quotes, and article cards to occupy more width.
- **Side rail:** compact shortcut only; should not squeeze article and should not duplicate the full ritual.
- **Wide desktop:** allow the background/masthead image to breathe, but keep reading content in a deliberate editorial measure.
- **Mobile:** keep the approved 390px patterns; desktop fixes should live inside desktop media queries.

Avoid:

- `max-width: 720px` as the final desktop article standard on all wide screens.
- `max-width: 1680px` plus 1080px paragraphs for long article text.
- global changes in dirty `styles.css` without exact hunk review.
- making homepage, Season, and Episode pages share one blunt width rule.

## Homepage Desktop Recommendation

Ali wants a later pass to explore using the Episode masthead subtitle card on the homepage.

Recommended future homepage test:

- Keep image-led masthead.
- Move homepage supporting copy into a soft translucent pearl/blush card.
- Add the same short colored accent rule used in the approved Episode subtitle card.
- Validate at 390, 1280, 1440, and 1920.
- Check browser zoom manually if Ali's local screenshot still appears much smaller than local default captures.

Do not implement this during Episode 2 stabilization.

## Episode 2 Specific Recommendation

Episode 2 can proceed after a desktop stabilization pass, but should not be committed in the current dirty width state.

Keep:

- approved masthead style
- approved subtitle
- Episode-specific image
- no long line over Episode pill
- date positioning
- mobile behavior

Refine before commit:

- reduce wide desktop shell from 1680px to a controlled Episode shell
- cap article paragraph measure
- align reader kit, article, side rail, endcap sections to one Episode desktop width system
- confirm 1440 and 1920 feel premium, not tiny and not over-wide

## Implementation Phases

Recommended safe sequence:

### Phase A: Documentation/audit only

Done in this packet.

### Phase B: Episode 2 page-local desktop stabilization

Purpose: fix the active dirty Episode 2 desktop experiment without touching shared CSS.

Likely file:

- `issues/issue-02.html`

Expected changes:

- page-local desktop max-widths and article grid normalization
- paragraph measure cap
- preserve approved masthead treatment
- preserve mobile media queries

Risk: **medium**

### Phase C: Episode 2 QA/finalization

QA at:

- 1280 desktop
- 1440 desktop
- 1920 desktop
- mobile 390

Check:

- no horizontal overflow
- article text readable
- paragraphs not too long
- masthead approved style intact
- side rail useful but not dominant
- all links still valid

Risk: **medium**

### Phase D: Shared Episode desktop system extraction

Only after Episode 2 stabilizes.

Likely files:

- `content/episode-page.css`
- `issues/issue-01.html`
- `issues/issue-02.html`
- eventually `issues/issue-03.html`

Risk: **high** unless staged as exact hunks, because Episode pages currently carry lots of page-local CSS.

### Phase E: Homepage desktop polish

Separate pass.

Likely files:

- `index.html`
- possibly `styles.css`, but only with exact hunk review

Include:

- homepage masthead subtitle-card exploration
- desktop content rhythm
- wide desktop section scale

Risk: **medium-high** because `index.html` and `styles.css` are already dirty/mixed.

### Phase F: Season page desktop polish

Separate pass or paired with homepage only if scope remains small.

Likely files:

- `episodes.html`
- possibly `styles.css`, exact hunks only

Risk: **medium**

## QA Plan For Implementation

For any implementation pass, run:

- desktop 1280
- desktop 1440
- wide desktop 1920
- mobile 390

For each page:

- no horizontal overflow
- no console/page errors except known local analytics warning
- masthead scale appropriate
- article text readable
- line length reasonable
- side rail not squeezing article
- CTA visibility
- return/context links still work
- mobile remains clean

For Episode 2 specifically:

- approved masthead style preserved
- subtitle remains `AI can't read your mind. Be David Rose about it.`
- date remains to the right on desktop and cleanly stacked on mobile
- long subtitle accent line remains short and heading-style
- no long line above Episode pill

## Exact Files Likely Touched Next

Recommended first implementation slice:

- `issues/issue-02.html`

Do not include in first slice:

- `index.html`
- `episodes.html`
- `styles.css`
- `issues/issue-01.html`
- `issues/issue-03.html`
- Dream Phone files
- backend/signup/Supabase/Buttondown files
- social/production engine files
- operations/prototypes/**

Potential later slices:

- `content/episode-page.css` for shared extraction
- `index.html` for homepage desktop/subtitle-card polish
- `episodes.html` for Season desktop polish
- `styles.css` only when exact unrelated dirty hunks have been isolated

## Council Gate

Question: Is the current desktop layout system ready for more Episode rollout?

Answer: **No. REVISE INTERNALLY.**

Question: Is the approved Episode 2 masthead style still valid?

Answer: **Yes. Preserve it.**

Question: Should Episode 2 be committed as-is?

Answer: **No. Stabilize desktop widths first.**

Question: Should homepage desktop be fixed in the same slice?

Answer: **No. Audit and plan it, but implement separately after Episode 2 desktop stabilization.**

Question: Should `styles.css` be edited broadly?

Answer: **No. It is dirty/mixed and should only be touched with exact hunk review.**

Final result: **REVISE INTERNALLY - FIRST FIX EPISODE 2 DESKTOP WIDTHS PAGE-LOCALLY, THEN QA, THEN DECIDE SHARED EXTRACTION.**
