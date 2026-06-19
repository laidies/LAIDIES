# Episode Terminology and Template Audit

Date: 2026-06-19

Scope: Part B2 audit only. Dream Phone remains parked. No implementation, staging, commit, push, backend/signup/Supabase/Buttondown work, social/production engine work, prototype work, homepage journey implementation, or Wednesday Bag / Clubhouse / Book of Receipts restructuring was performed.

## Executive Summary

Reader-facing terminology is partly aligned around `Episode`, but the site still has public or accessibility-facing `Issue` labels in the archive, older episode pages, quiz data, shared menu code, card pack status text, and Episode 3's reader template. The highest-value safe cleanup is copy-only: change visible/a11y labels from `Issue` to `Episode` while leaving filenames, routes, query params, data keys, JS variable names, and storage keys alone.

Episode 3 is currently the strongest reading experience. It has a feature-style hero, reader summary cards, an article card, a reader-tool side rail, contextual return links, and a full weekly ritual section. Episodes 1 and 2 have updated object-world masthead art and a dynamic post-article toolkit, but their main reading templates are still older standalone article pages. Their article copy can be preserved exactly during template alignment.

Recommended first implementation slice: Phase A, safe reader-facing terminology cleanup only. Do not combine terminology cleanup with Episode 1/2 template alignment.

## Files Inspected

- `index.html`
- `episodes.html`
- `this-week.html`
- `issues/issue-01.html`
- `issues/issue-02.html`
- `issues/issue-03.html`
- `content/issues/issue-01.md`
- `content/issues/issue-02.md`
- `content/issues/issue-03.md`
- `learn.html`
- `learn/quiz.html`
- `learn/glossary.html`
- `try-on.html`
- `printable.html`
- `hot-goss.html`
- `reference-closet.html`
- `clubhouse.html`
- `community.html`
- `script.js`
- `content/episode-page.js`
- `content/episode-page.css`
- `content/episode-index.json`
- `content/episodes/issue-01.json`
- `content/episodes/issue-02.json`
- `content/episodes/issue-03.json`
- `content/site/site-data.js`
- `content/site/quizzes.json`
- `content/site/content-registry.json`
- `content/site/brand-polish.js`
- obvious onboarding/nav files surfaced by search: `start-here.html`, `learn.html`

## Terminology Rule

Use `Episode`, not `Issue`, in public UI, reader-facing copy, accessible alt text, visible labels, button labels, cards, quiz prompts, and menu labels.

Do not casually rename:

- `issues/issue-01.html`, `issues/issue-02.html`, `issues/issue-03.html`
- `content/issues/issue-XX.md`
- `content/episodes/issue-XX.json`
- `issue=1`, `issue=2`, `issue=3` query params
- JS variables, CSS classes, storage keys, API fields, or filenames using `issue`

Those need a redirect/refactor plan if they ever change.

## Terminology Findings

| File | Current text | Recommended replacement | Safe to change now? | Risk |
| --- | --- | --- | --- | --- |
| `episodes.html` | `Magazine Archive / Article Shelf` | `Episode Archive / Season Shelf` | yes | low |
| `episodes.html` | `The Wednesday Bag turns the current issue into a ritual` | `The Wednesday Bag turns the current Episode into a ritual` | yes | low |
| `episodes.html` | `Read Latest Episode` links to `issues/issue-02.html` | keep label, update link to `issues/issue-03.html` | yes | medium |
| `episodes.html` | `2 of 24 episodes aired` | `3 of 24 episodes aired` | yes | low |
| `episodes.html` | `Issue #1`, `Issue #2` | `Episode 1`, `Episode 2` | yes | low |
| `episodes.html` | Episode 3 card says `Coming soon` | publish Episode 3 card and link to `issues/issue-03.html` | yes | medium |
| `episodes.html` | `Use the current issue as a ritual` | `Use the current Episode as a ritual` | yes | low |
| `issues/issue-01.html` | masthead alt says `Issue 01 note` | `Episode 01 note` | yes | low |
| `issues/issue-01.html` | hidden title `Issue #1: On Wednesdays We Use AI` | `Episode 1: On Wednesdays We Use AI` | yes | low |
| `issues/issue-01.html` | `next week's article` | `next week's Episode` | yes | low |
| `issues/issue-02.html` | masthead alt says `Issue 02 note` | `Episode 02 note` | yes | low |
| `issues/issue-02.html` | hidden title `Issue #2: Tell Me What You Want` | `Episode 2: Tell Me What You Want` | yes | low |
| `issues/issue-02.html` | `Issue #1: On Wednesdays We Use AI` in the Previously line | `Episode 1: On Wednesdays We Use AI` | yes | low |
| `issues/issue-02.html` | `what you type after reading this article` | `what you type after reading this Episode` | yes | low |
| `issues/issue-03.html` | preview ribbon `ISSUE 03` | `EPISODE 03` | yes | low |
| `issues/issue-03.html` | eyebrow `Issue 03` | `Episode 03` | yes | low |
| `issues/issue-03.html` | activity copy `The issue teaches the receipt habit` | `The Episode teaches the receipt habit` | yes | low |
| `issues/issue-03.html` | error state `Issue could not load.` | `Episode could not load.` | yes | low |
| `content/issues/issue-03.md` | rendered lines `Issue 2 was...` and `Issue 3 is...` | `Episode 2 was...` and `Episode 3 is...` | yes | low |
| `content/issues/issue-03.md` | rendered line `The article gives you the rule` | `The Episode gives you the rule` | yes | low |
| `content/issues/issue-01.md` | source stub title `Issue 01` and `Issue 01 Fun Pack` | `Episode 01`; `Episode 01 Fun Pack` if the stub becomes public/generated | no, source stub | low |
| `content/issues/issue-02.md` | source stub title `Issue 02` and `Issue 02 Fun Pack` | `Episode 02`; `Episode 02 Fun Pack` if the stub becomes public/generated | no, source stub | low |
| `this-week.html` | `read the issue` in the Wednesday Ritual lede | `read the Episode` | yes | low |
| `this-week.html` | generated image alt `selected issue` | `selected Episode` | yes | low |
| `this-week.html` | JS comment `Issue 02-specific proof-of-concept` | leave as-is, internal implementation note | no | low |
| `learn/quiz.html` | meta description `Pick an issue` | `Pick an Episode` | yes | low |
| `learn/quiz.html` | hero copy `Pick any released issue` | `Pick any released Episode` | yes | low |
| `learn/quiz.html` | helper/result text `Pick an issue above` | `Pick an Episode above` | yes | low |
| `learn.html` | `test yourself on the issue you just read` | `test yourself on the Episode you just read` | yes | low |
| `try-on.html` | visible copy already uses `Episode` / `episode`; `issue` is mostly query/data logic | leave technical identifiers | no | low |
| `printable.html` | visible copy already uses `Episode printable`; `issue` is filenames/query logic | leave technical identifiers | no | low |
| `hot-goss.html` | `lesson` in `do not confuse a headline with the full lesson` | likely keep; means concept, not Episode unit | no | low |
| `reference-closet.html` | `Vogue September Issue` | keep; historical publication title/reference | no | low |
| `reference-closet.html` | `Small lessons...` | keep; not an Episode label | no | low |
| `clubhouse.html` | `The issue teaches the idea` | `The Episode teaches the idea` | yes | low |
| `clubhouse.html` | `issue extras` | `Episode extras` | yes | low |
| `community.html` | `drop the thing that worked` | optional: `share the thing that worked`; not an Episode label | no | low |
| `start-here.html` | `Let the next issue come to you` | `Let the next Episode come to you` | yes | low |
| `start-here.html` | `read the current issue` | `read the current Episode` | yes | low |
| `start-here.html` | `extra issue objects` | `extra Episode objects` | yes | low |
| `index.html` | `next Wednesday drop` | `next Wednesday Episode` or `new Episodes every Wednesday` | yes | low |
| `index.html` | `issue packs` | `Episode packs` | yes | low |
| `index.html` | `visual drops` | probably keep; means social posts, not Episodes | no | low |
| `index.html` | multiple `lesson` uses | optional only; `idea` or `Episode` where it specifically refers to the weekly read | yes | low |
| `script.js` | generated archive meta `Issue #${episode.number}` | `Episode ${episode.number}` | yes | medium |
| `script.js` | Fun Pack status `Issue 01 pack loaded`, `Issue 02 pack loaded` | `Episode 01 pack loaded`, `Episode 02 pack loaded` | yes | medium |
| `script.js` | helper copy `Reread the issue` | `Reread the Episode` | yes | medium |
| `script.js` | Clubhouse layer copy `issue shelf`, `Issues 1 and 2`, `weekly AI song lives beside the issue packs` | `Episode shelf`, `Episodes 1 and 2`, `weekly AI song lives beside the Episode packs` | yes | medium |
| `content/site/brand-polish.js` | menu label `Read Latest Issue` | `Read Latest Episode` | yes | medium |
| `content/site/site-data.js` | quiz labels `Issue 01 Quiz`, `Issue 02 Quiz`, `Reread Issue 01/02`, prompts/explains with `Issue 1/2`, card `issueLabel` values | convert public labels and prompt copy to `Episode`; keep keys/URLs as `issue` | yes | medium |
| `content/site/quizzes.json` | quiz labels/prompts/explains with `Issue 1/2/3` | convert public labels and prompt copy to `Episode`; keep keys/URLs as `issue` | yes | medium |
| `content/episode-index.json` | `Open the Issue 3 card pack` | `Open the Episode 03 card pack` | yes | medium |
| `content/episodes/issue-03.json` | `Open the Issue 3 card pack` | `Open the Episode 03 card pack` | yes | medium |
| `content/episode-page.js` | generated toolkit paragraph `make the issue stick` | `make the Episode stick` | yes | medium |
| `content/episode-page.js` | variable/function names using `Issue` | leave until a real route/data refactor exists | no | medium |

## What Is Not A Terminology Problem

- HTML tags like `<article>` and CSS classes like `.issue-card`, `.issue-meta`, `.object-issue`, `.issue-site-nav`.
- File paths, route names, query params, cache-busting strings, asset names, and data keys using `issue`.
- Historical/publication references such as `Vogue September Issue`.
- Generic `lesson` when it means the concept being taught rather than the public content unit.
- `drop` when it clearly means social content, not the weekly Episode release. If a phrase means the weekly release, prefer `new Episode` or `new Episodes every Wednesday`.

## Episode 3 Standard

Episode 3's reader page (`issues/issue-03.html`) establishes the current standard:

- Top contextual ribbon with `Back to the Bag`, `Article`, and `Weekly Ritual`.
- Feature-style `reader-hero` using a real image treatment, live title, eyebrow, and dek.
- `reader-kit` summary cards for Lesson, Try-On, and the weekly rule.
- `article-layout` with an `article-card` reading surface and a `side-rail`.
- Side rail has a clear `After The Read` card linking to Bag, quiz, cheat sheet, Try-On, cards, anthem, Extra Credit, and Room.
- Dynamic section navigation in the side rail.
- Full `activity-section` / weekly ritual grid after the read.
- Pull quotes, section images, signoff showpiece, and stronger pearl/plum editorial styling.
- Mobile CSS collapses the kit, article/rail, and activity sections into a readable single-column layout.

## Episode 1 Differences From Episode 3

Missing or weaker pieces in `issues/issue-01.html`:

- Masthead: Has an object-world masthead asset and overlay, but not the Episode 3 `reader-hero` with live eyebrow/title/dek treatment.
- Return link: Defaults to `Back to Episodes`; a contextual `Back to the Bag` is only injected when `from=this-week` is present.
- Reader kit: Missing the three-card Lesson / Try-On / Rule summary above the article.
- Article layout: Uses older single-column `article-container`, not `article-layout` plus `article-card`.
- Side rail: Missing persistent reader tools and jump navigation while reading.
- Weekly ritual: Missing Episode 3-style activity cards for Bag, quiz, printable, Try-On, Room, Extra Credit, anthem, and charm.
- Toolkit: A dynamic post-article `issue-toolkit` exists, but it is generic, appears after the article, and does not create the same immediate reading workflow as Episode 3.
- Typography/style: Older inline styles, stat blocks, and newsletter-style sections do not fully match Episode 3's pearl/plum feature layout.
- Image treatment: Uses `assets/ugh-as-if.png` plus three huge inline base64 images. Those must be preserved exactly or carefully externalized to real asset files before template work.
- Links: Static internal-link pass found no missing internal page targets. The pass produced one false positive in Episode 3 JS only.
- CTA gaps: No first-screen side rail or activity grid for Episode 01 Bag, quiz, Try-On, printable, DJ track, cards, or Room. The data knows some of these links, but the page does not present them with Episode 3's clarity.
- Mobile risks: Older article width and inline images may read okay, but they lack Episode 3's modern collapse rules, side rail behavior, and activity grid spacing.
- Copy preservation: Article copy can be preserved exactly. Template alignment should wrap the copy rather than rewrite it.
- Special handling: Episode 1's inline base64 images are a production maintenance risk. Extracting them is optional but should happen in a careful asset-preservation step, not as an incidental cleanup.

## Episode 2 Differences From Episode 3

Missing or weaker pieces in `issues/issue-02.html`:

- Masthead: Has an object-world masthead asset and overlay, but not the Episode 3 `reader-hero` with live eyebrow/title/dek treatment.
- Return link: Defaults to `Back to Episodes`; a contextual `Back to the Bag` is only injected when `from=this-week` is present.
- Reader kit: Missing the three-card Lesson / Try-On / Rule summary above the article.
- Article layout: Uses older single-column `article-container`, not `article-layout` plus `article-card`.
- Side rail: Missing persistent reader tools and jump navigation while reading.
- Weekly ritual: Missing Episode 3-style activity cards for Bag, quiz, printable, Try-On, Room, Extra Credit, anthem, and charm.
- Toolkit: A dynamic post-article `issue-toolkit` exists, but it is generic and late in the flow.
- Typography/style: Older inline callouts, section dividers, stat blocks, and newsletter structure differ from Episode 3's polished editorial layout.
- Image treatment: Uses external assets (`assets/issue-02-hero.png`, `assets/issue02-drawing-game-spice-girls.png`, `assets/issue02-david-rose-specificity.png`, `assets/issue02-its-britney-bitch.png`, `assets/issue02-dont-pull-a-cher.png`) that already exist and can be preserved.
- Links: Static internal-link pass found no missing internal page targets.
- CTA gaps: No first-screen side rail or activity grid for Episode 02 Bag, quiz, Try-On, printable, DJ track, cards, or Room. The data has some of these links, but the page does not present them with Episode 3's clarity.
- Mobile risks: Older article layout lacks the Episode 3 grid collapse and activity-card rhythm.
- Copy preservation: Article copy can be preserved exactly. The `Previously on LAiDIES` line should only change `Issue #1` to `Episode 1`.
- Special handling: Episode 2's references and images are clean external files; no inline base64 extraction is needed.

## Recommended Replacements

Use these as the copy standard:

- `Issue #1` -> `Episode 1`
- `Issue #2` -> `Episode 2`
- `Issue 03` -> `Episode 03`
- `Current Issue` / `current issue` -> `Current Episode` / `current Episode`
- `Read Latest Issue` -> `Read Latest Episode`
- `weekly issue` -> `weekly Episode`
- `issue-specific` -> `Episode-specific`
- `Issue pack` -> `Episode pack`
- `issue extras` -> `Episode extras`
- `read the issue` -> `read the Episode`
- `next issue` -> `next Episode`
- `new Wednesday drop` where it means release -> `new Episode every Wednesday` or `New Episodes every Wednesday`

Keep internal `issue` in URLs, filenames, params, and data identifiers until there is a route migration plan.

## Required Assets

Existing assets that can support Episode 1/2 alignment:

- `assets/brand/laidies-masthead-object-world-issue-01-objects-v1.png`
- `assets/brand/laidies-masthead-object-world-issue-02-objects-v1.png`
- `assets/ugh-as-if.png`
- `assets/issue-02-hero.png`
- `assets/issue02-drawing-game-spice-girls.png`
- `assets/issue02-david-rose-specificity.png`
- `assets/issue02-its-britney-bitch.png`
- `assets/issue02-dont-pull-a-cher.png`
- `assets/prompt-cheat-sheet-issue01.pdf`
- `assets/prompt-cheat-sheet-issue02.pdf`
- `assets/prompt-cheat-sheet-issue03.pdf`
- `content/music/dj-jaidy-week-01-on-wednesday-we-do-ai.mp3`
- `content/music/dj-jaidy-week-02-tell-me-what-you-want.mp3`
- `content/music/dj-jaidy-week-03-dont-be-chutney-on-the-stand.mp3`

Asset gaps / risks:

- Episode 1 has three inline base64 images. They should be preserved exactly or intentionally extracted into named assets before broader template work.
- Episode 1 and 2 may need Episode-specific section-card copy for the activity grid if the Episode 3 pattern is reused.
- Episode-specific Bag/charm artwork should not be invented in this slice. Use existing links and label unavailable items honestly if needed.

## Exact Files Likely Touched

Phase A terminology cleanup likely touches:

- `episodes.html`
- `issues/issue-01.html`
- `issues/issue-02.html`
- `issues/issue-03.html`
- `content/issues/issue-03.md`
- `this-week.html`
- `learn.html`
- `learn/quiz.html`
- `clubhouse.html`
- `start-here.html`
- `index.html`
- `script.js`
- `content/episode-page.js`
- `content/episode-index.json`
- `content/episodes/issue-03.json`
- `content/site/site-data.js`
- `content/site/quizzes.json`
- `content/site/brand-polish.js`

Phase B Episode 1 template alignment likely touches:

- `issues/issue-01.html`
- `content/episode-page.css` or Episode 3 shared CSS extraction if approved
- possibly `content/episode-page.js`
- possibly new extracted Episode 1 image assets if the inline base64 images are externalized

Phase C Episode 2 template alignment likely touches:

- `issues/issue-02.html`
- `content/episode-page.css` or Episode 3 shared CSS extraction if approved
- possibly `content/episode-page.js`

## Risk Level Per File

| File | Risk | Why |
| --- | --- | --- |
| `episodes.html` | medium | Stale Episode 3 archive state plus possible dynamic archive rendering from `script.js`/data. |
| `index.html` | low | Mostly copy-only, but homepage is high-visibility. |
| `this-week.html` | medium | Static fallback plus dynamic Episode loading; must QA Bag behavior. |
| `issues/issue-01.html` | high for template, low for terminology | Large article file with inline base64 images; copy-only labels are safe, template wrapping is more delicate. |
| `issues/issue-02.html` | medium/high for template, low for terminology | Large article file but external images are easier to preserve. |
| `issues/issue-03.html` | medium | Current standard page; small labels are safe, but do not disturb renderer. |
| `content/issues/issue-03.md` | low | Rendered copy changes are simple; internal hidden sections can remain. |
| `learn/quiz.html` | low | Static helper copy only. |
| `learn.html` | low | One visible card label. |
| `try-on.html` | low | Mostly no public issue terminology problem. |
| `printable.html` | low | Mostly no public issue terminology problem. |
| `clubhouse.html` | low | Small visible copy changes only. |
| `community.html` | low | No required Episode terminology change. |
| `hot-goss.html` | low | No required Episode terminology change. |
| `reference-closet.html` | low | Leave historical `Vogue September Issue`; no required change. |
| `script.js` | medium | Shared UI generation and existing dirty work; stage exact hunks only if implemented. |
| `content/episode-page.js` | medium | Shared helper for older episode pages; small copy change is safe, template behavior is broader. |
| `content/episode-page.css` | medium | Shared older episode styling; template alignment should avoid regressions. |
| `content/episode-index.json` | medium | Source for dynamic Episode data; public labels can be changed but data is shared. |
| `content/episodes/issue-03.json` | medium | Source data used by Episode 3 renderer and tooling. |
| `content/site/site-data.js` | high | Dirty/shared legacy data powering archive, quizzes, card packs. Exact hunks only. |
| `content/site/quizzes.json` | high | Public quiz content; many copy changes and duplicated strings. Exact review needed. |
| `content/site/brand-polish.js` | medium | Shared menu/navigation enhancer; small label change, broad surface. |

## Recommended Implementation Phases

### Phase A: Safe Reader-Facing Terminology Cleanup

Goal: Change public labels from Issue to Episode without changing routes, filenames, query params, variables, storage keys, or data structure.

Recommended contents:

- Archive page copy and stale Episode 3 archive state.
- Episode 1/2/3 visible and accessibility labels.
- Quiz helper text and source quiz labels.
- Shared menu label `Read Latest Issue`.
- Generated archive card labels in `script.js`.
- Small onboarding/Clubhouse/homepage copy fixes.

Do this first because it is clear, user-facing, and independent of large page-template work.

### Phase B: Episode 1 Template Alignment With Episode 3

Goal: Keep `issues/issue-01.html` URL and article copy, but align the reading frame to Episode 3.

Recommended contents:

- Add Episode 3-style contextual top ribbon.
- Add reader hero with Episode 1 title/dek and approved masthead/image treatment.
- Add reader-kit summary cards from `content/episodes/issue-01.json`.
- Wrap current article copy in the modern article card without rewriting it.
- Add side rail and section nav.
- Add Episode 01 activity grid with honest links to Bag, quiz, printable, Try-On, cards, DJ track, Extra Credit, and Room.
- Preserve or intentionally extract inline base64 images.

### Phase C: Episode 2 Template Alignment With Episode 3

Goal: Keep `issues/issue-02.html` URL and article copy, but align the reading frame to Episode 3.

Recommended contents:

- Same pattern as Episode 1, using Episode 2 metadata and existing external section images.
- Preserve the `Previously on LAiDIES` beat with Episode terminology.
- Use existing Episode 02 prompt specificity assets and DJ track.

### Phase D: QA All Episodes On Desktop/Mobile

Goal: Confirm Episode 1, 2, and 3 now feel like one reading system.

Recommended contents:

- Desktop 1440 and mobile 390 checks for all three episode pages.
- Check archive, Bag, quiz, Try-On, printable, DJ Booth, cards, Extra Credit, Room links.
- Confirm article copy is preserved.
- Confirm no horizontal overflow, console errors, or broken links.

## QA Plan For Implementation

Run after each phase, then again after all phases:

- Desktop 1440: top/masthead visible, no awkward cropping, reader action obvious.
- Mobile 390: masthead, reader kit, article text, side rail fallback, and activity cards are readable.
- Article top/masthead: Episode number/title/dek are correct.
- Side rail/context links: Bag, quiz, printable, Try-On, cards, anthem, Extra Credit, Room.
- Buttons/CTAs: labels use Episode terminology and targets include the correct `issue=` param where needed.
- Return links: direct page, from Bag, from quiz, from printable, and from Try-On all return coherently.
- Footer/menu: shared labels use Episode, not Issue, unless internal.
- No horizontal overflow.
- No console errors.
- No broken internal links.
- Article copy preserved exactly except approved terminology-only labels.
- Existing URLs preserved.

## First Implementation Slice Recommendation

Start with Phase A only.

Why: It fixes the public language conflict without touching the Dream Phone work, backend, social engine, prototypes, or the larger Episode 1/2 template migration. It also reduces confusion before any layout work begins.

Do not stage whole files with existing unrelated dirty work. If Phase A is approved, stage exact hunks only after reviewing the current working tree.

## Audit Status

- Static internal-link pass across audited pages found no missing internal page targets. One false positive appeared from the literal `$2` replacement string inside Episode 3's Markdown renderer.
- No files were staged.
- No commit was made.
- No push was made.
