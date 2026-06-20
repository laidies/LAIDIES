# Episode 01 Approved Template QA

Date: 2026-06-20

Status: **APPROVED BY ALI FOR THIS STAGE**

Commit scope: preserve the approved Episode 1 hybrid template direction and its working template standard before moving on to Episode 2.

## Files Changed

- `issues/issue-01.html`
- `operations/review-packets/episode-mobile-template-standard.md`
- `operations/review-packets/episode-01-approved-template-qa.md`
- `operations/review-packets/assets/episode-01-approved-template-qa/*`

## Ali Approval Status

Ali manually reviewed the current live/local Episode 1 page and approved the current visual/template direction. This is approved for the Episode 1 page and as the direction for the Episode template standard.

## Approved Episode 1 Changes

- Episode-specific masthead uses the Episode 1 `What, Like It's Hard / First Step` image with a pearl/blush wash.
- Live LAiDIES logo remains over the masthead, with a more translucent blush block.
- Episode pill now shows `Episode 01`, not only `Episode`.
- Sticky Episode nav includes `Season`, `Top`, `Article`, `Study Pack`, and `Weekly Ritual`.
- `On This Season...` and `On This Episode...` cards are collapsible, show two-line previews, and have clearer expand controls.
- First article heading now matches the later article heading treatment.
- `So You Don't Pull a Cher` uses expandable definition cards.
- `Next Time On LAiDIES...` replaces the earlier production-calendar phrasing.
- The masthead image also appears in the article before the definitions section to break up the reading flow.
- `Remember, LAiDIES` signoff is polished and avoids generic placeholder CSS art.
- Buttondown newsletter signup is present with a direct Buttondown fallback link.
- Share actions are separate from the social-follow card.
- `LAiDIES After Hours` social card uses the approved Instagram and LinkedIn URLs.
- Desktop side rail is now a compact shortcut to the Weekly Bag, not a duplicate ritual.
- Bottom `Complete the Weekly Ritual` section remains the main ritual handoff.
- Weekly Ritual labels align with the Wednesday Bag naming.
- End-of-article resources/receipts panel is aligned with the same article width and heading treatment.

## Article Copy Preservation

Episode 1 article body copy was preserved. This pass changed approved template, navigation, heading, CTA, ritual, and after-read presentation pieces. No article voice rewrite was performed.

## Template Standard Updates

`operations/review-packets/episode-mobile-template-standard.md` now records the approved direction for:

- mastheads
- typography
- intro cards
- section headings
- section dividers
- quote/pull-quote guidance
- signoff and challenge treatment
- after-read actions
- desktop side rail
- Weekly Ritual bridge
- next-Episode teaser
- further-reading/resources panel
- Episode 2 guardrails

## QA Results

Automated QA ran against the local Episode 1 page through a local HTTP server.

Passed:

- desktop 1440 checked
- mobile 375, 390, and 430 checked
- no horizontal overflow at tested widths
- no page errors
- no console errors
- no missing local files or anchors
- key Episode 1 images loaded
- masthead image loaded
- sticky Episode nav present and readable
- intro cards have previews and start collapsed
- definition cards start collapsed and expand on click
- `See full ritual` opens with the native disclosure control
- copy/share fallback exposes the canonical Episode 1 URL when clipboard access is unavailable
- Buttondown signup posts to the real Buttondown embed endpoint and does not fake success
- approved Instagram URL is present: `https://www.instagram.com/we.are.laidies/`
- approved LinkedIn company URL is present: `https://www.linkedin.com/company/wearelaidies/?viewAsMember=true`
- activity/return targets exist for the Weekly Bag, quiz, printable, Try-On, cards, DJ Booth, extra credit, and community paths

Best-effort external checks:

- Instagram, LAiDIES LinkedIn company, Buttondown, HBS, Lean In, BCG, Forbes, One Useful Thing, Women Defining AI, and Theresanaiforthat responded successfully in automated checks.
- Personal LinkedIn profile links in the footer returned LinkedIn bot-block status in automated testing. The links are unchanged footer links and remain intentional.

QA results file:

- `operations/review-packets/assets/episode-01-approved-template-qa/episode-01-approved-template-qa-results.json`

## Screenshots

Saved under `operations/review-packets/assets/episode-01-approved-template-qa/`:

- `episode01-mobile-390-top.png`
- `episode01-mobile-390-on-this-season.png`
- `episode01-mobile-390-on-this-episode.png`
- `episode01-mobile-390-section-heading.png`
- `episode01-mobile-390-definitions-collapsed.png`
- `episode01-mobile-390-definitions-expanded.png`
- `episode01-mobile-390-signoff.png`
- `episode01-mobile-390-after-read-actions.png`
- `episode01-desktop-1440-top.png`
- `episode01-desktop-1440-side-rail.png`
- `episode01-desktop-1440-after-read-actions.png`

## Known Limitations And Follow-Up

- This is approved for Episode 1 and as the template direction, but Episode 2 still needs its own careful implementation pass using an approved Episode 2 image.
- The current template pattern is still largely page-specific in Episode 1. A later shared Episode CSS/component extraction would reduce duplication.
- Episode 3 remains a useful quote/style reference, but should not be copied blindly into Episode 2.
- After deployment, run one live-site smoke test to confirm hosted asset paths and third-party links behave the same outside the local server.

## Recommended Next Slice

Proceed to Episode 2 alignment only after confirming the exact Episode 2 masthead image and preserving Episode 2 copy, images, references, and URL. Apply the approved Episode 1 pattern rather than re-opening the Dream Phone or broader homepage work.
