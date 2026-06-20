# Episode 02 Template Alignment QA

Date: 2026-06-20

Status: **PASS FOR ALI REVIEW**

Council result: **PASS FOR ALI REVIEW**, not PASS FOR IMPLEMENTATION. Episode 2 now follows the approved Episode 1 hybrid template direction closely enough for Ali to review the live Episode 2 adaptation. Ali should still manually approve the masthead crop and Episode 2-specific editorial choices before this pattern is treated as fully locked for all Episodes.

## Scope

This pass aligned `issues/issue-02.html` to the approved Episode 1 hybrid template direction from commit `3a4b81e4a6734f8a65303c9ea4a882135fe31d71`.

Changed for this slice:

- `issues/issue-02.html`
- `operations/review-packets/episode-02-template-alignment-qa.md`
- `operations/review-packets/assets/episode-02-template-alignment/*`

No Episode 1, Episode 3, Dream Phone, backend, social/production engine, prototype, homepage, or `styles.css` files are part of this slice.

## Episode 2 Masthead Image Inventory

- `assets/brand/laidies-masthead-object-world-issue-02-objects-v1.png`
  - Pros: polished existing Episode 2 object-world masthead.
  - Cons: wide strip format, baked-in Episode 2 text, less flexible with live title/logo.
- `assets/issue-02-hero.png`
  - Pros: real Episode 2 article image, strong prompt-specificity desk world, enough visual depth behind live title/logo, works with pearl/blush wash.
  - Cons: now appears both as masthead and inside the article; Ali should confirm that repetition feels intentional.
- `assets/issue02-drawing-game-spice-girls.png`
  - Pros: strong visual and very Episode 2.
  - Cons: belongs directly to the drawing-game section; too section-specific for the masthead.
- `assets/issue02-david-rose-specificity.png`
  - Pros: strong and memorable.
  - Cons: text-heavy and section-specific.
- `assets/issue02-its-britney-bitch.png`
  - Pros: useful before/after proof visual.
  - Cons: too late-article and split-screen for the masthead.
- `assets/issue02-dont-pull-a-cher.png`
  - Pros: useful study-pack image.
  - Cons: concept-section-specific.
- `assets/issue02-tryon-homework.png`
  - Pros: good activity image.
  - Cons: better as a later article break than the masthead.

Chosen image: `assets/issue-02-hero.png`.

Reason: it is an existing Episode 2 article image, visually aligned with the prompt/specificity theme, and it supports live HTML title/logo/date treatment without requiring new generated art.

## What Changed

- Rebuilt Episode 2 around the approved Episode 1 hybrid reader template.
- Added the sticky Episode nav with `Season`, `Top`, `Article`, `Study Pack`, and `Weekly Ritual`.
- Updated the masthead to use a real Episode 2 image with pearl/blush wash, live LAiDIES logo, live Episode pill, live title, live premise, and live date.
- Added collapsible `Previously On LAiDIES...` and `On This Episode...` cards with visible previews.
- Aligned section headings, section separators, pull quote treatment, signoff, challenge, after-read actions, desktop side rail, bottom Weekly Ritual bridge, and resources/receipts panel to the approved template direction.
- Added Buttondown signup, share/copy fallback, Instagram, and LinkedIn after-read actions.
- Kept the desktop side rail compact and kept the bottom `Complete the Weekly Ritual` as the main ritual handoff.
- Used Episode 2-specific links for Bag, quiz, printable, Try-On, Practice Cards, DJ Booth, Extra Credit, Community, and return behavior.

## Content Preservation Notes

Episode 2 article voice and core copy were preserved. Presentation changed substantially.

Explicit content-level changes:

- The Ethan Mollick quote was split out into a semantic pull quote. The quoted wording is preserved.
- The old two-card glossary was converted into three expandable definition cards as requested. `Prompt` and `Context` were preserved/adapted; `Token` was added as the third Episode 2 concept.
- Inline LAiDIES logo-style body treatment was normalized to plain body text where it was creating mixed typography.
- The challenge sentence changed from `trAIlblazers` typography to plain `trailblazers` to match the approved body-copy standard.
- The old loose share sentence was replaced by the approved after-read action system.

No new fake links or new generated Episode 2 assets were created.

## QA Results

Automated QA ran against a local HTTP preview of `issues/issue-02.html`.

Passed:

- desktop 1440 checked
- mobile 375, 390, and 430 checked
- no horizontal overflow at tested widths
- no page errors
- no console errors
- no missing local file targets
- all images loaded
- masthead image loads from `../assets/issue-02-hero.png`
- masthead live text is populated: `Episode #02`, `Tell Me What You Want`, `June 10, 2026`
- no duplicate visible H1
- intro cards start collapsed and show previews
- definition cards start collapsed and expand
- `See full ritual` expands
- contextual return defaults to Season and switches to Bag when opened with Bag context
- share/copy fallback exposes `https://wearelaidies.com/issues/issue-02.html`
- Buttondown form posts to the real Buttondown embed endpoint and does not fake success
- approved Instagram URL is present: `https://www.instagram.com/we.are.laidies/`
- approved LinkedIn company URL is present: `https://www.linkedin.com/company/wearelaidies/?viewAsMember=true`
- Episode content does not advertise parked Dream Phone work

Best-effort external checks:

- The Harvard Business School receipt returned 403 to the automated HEAD check.
- Personal LinkedIn profile links in the footer returned LinkedIn bot/bot-method blocking statuses.
- These are external automated-check limitations, not missing local targets.

QA results file:

- `operations/review-packets/assets/episode-02-template-alignment/episode-02-template-alignment-qa-results.json`

## Screenshots

Saved under `operations/review-packets/assets/episode-02-template-alignment/`:

- `episode02-desktop-1440-top.png`
- `episode02-desktop-1440-side-rail.png`
- `episode02-mobile-390-top.png`
- `episode02-mobile-390-previously-on.png`
- `episode02-mobile-390-on-this-episode.png`
- `episode02-mobile-390-section-heading.png`
- `episode02-mobile-390-pullquote.png`
- `episode02-mobile-390-signoff.png`
- `episode02-mobile-390-definitions-collapsed.png`
- `episode02-mobile-390-definitions-expanded.png`
- `episode02-mobile-390-after-read-actions.png`
- `episode02-mobile-390-footer-next.png`

## Council Review

Question: Does Episode 2 now match the approved Episode 1 template direction?

Answer: Yes. The page now uses the same approved masthead model, intro cards, editorial headings, quote style, signoff, after-read actions, compact desktop side rail, and bottom Weekly Ritual bridge.

Question: Is it ready for Ali review?

Answer: Yes. It passes automated QA and is coherent enough for Ali to make creative/product calls rather than debug basic UX.

Question: Did it preserve Episode 2 content?

Answer: Mostly yes. Core article copy and Episode 2 imagery are preserved. The only notable additions/changes are the required third definition card, the semantic pull-quote extraction, and approved template action/ritual language.

Question: Did the masthead image fit Episode 2?

Answer: Yes. `assets/issue-02-hero.png` is a real Episode 2 article image and works in the approved masthead frame. Manual review should confirm the crop and image repetition.

Question: What still needs adjustment?

Answer:

- Ali should manually review the masthead crop on mobile and desktop.
- Ali should confirm that using the same `assets/issue-02-hero.png` in both the masthead and article body feels acceptable.
- A future shared Episode CSS/component extraction is still recommended; this pass keeps the template mostly page-local like Episode 1.
- External links should get one live-site smoke test after push because LinkedIn/HBS can block automated checks.

Final Council result: **PASS FOR ALI REVIEW**.

## Exact Staging List

Stage only:

- `issues/issue-02.html`
- `operations/review-packets/episode-02-template-alignment-qa.md`
- `operations/review-packets/assets/episode-02-template-alignment/episode-02-template-alignment-qa-results.json`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-desktop-1440-side-rail.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-desktop-1440-top.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-mobile-390-after-read-actions.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-mobile-390-definitions-collapsed.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-mobile-390-definitions-expanded.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-mobile-390-footer-next.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-mobile-390-on-this-episode.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-mobile-390-previously-on.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-mobile-390-pullquote.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-mobile-390-section-heading.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-mobile-390-signoff.png`
- `operations/review-packets/assets/episode-02-template-alignment/episode02-mobile-390-top.png`

Do not stage unrelated dirty or untracked work.
