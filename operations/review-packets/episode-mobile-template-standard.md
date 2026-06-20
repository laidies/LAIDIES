# Episode Mobile Template Standard

Date: 2026-06-20

Status: **Working standard after Ali mobile review**

This standard captures the Episode mobile refinements made after Ali reviewed Episode 1 and compared it with Episode 3. It is not a full shared component extraction yet. It should guide Episode 2 alignment and a later shared CSS/component pass.

## Source References

- Episode 1 refined page: `issues/issue-01.html`
- Episode 3 visual reference: `issues/issue-03.html`
- Prior audit: `operations/review-packets/mobile-episode-ux-audit.md`
- Prior Episode 1 QA: `operations/review-packets/episode-01-review-fixes-and-season-qa.md`

## Council Result

Episode 1 refinements in this pass: **PASS FOR ALI REVIEW**

Shared mobile Episode system: **REVISE INTERNALLY**

Why:

- Episode 1 now has a more disciplined mobile reading pattern.
- Episode 3 remains the strongest visual reference for quotes and editorial polish.
- The template rules are clearer, but the patterns still live in page-specific CSS and should later be extracted into a reusable Episode layer.

## Core Mobile Reading Standard

Use this order for aligned Episodes:

1. Compact site header and contextual return link.
2. Episode-specific masthead using one strong existing Episode image.
3. Short reader kit or premise setup.
4. Article body.
5. Compact Episode Kit or contextual tool links.
6. Polished signoff.
7. One challenge/action card.
8. One final next action.

Do not copy Episode 3 blindly. Episode 3 is the best visual reference, but its mobile pre-read stack can still be too expansive.

## Masthead Standard

Use one strong existing image from the Episode and treat it with the pearl/blush masthead wash.

Requirements:

- The LAiDIES logo must remain live HTML/image content over the masthead, not flattened into the background image.
- The translucent block behind the LAiDIES logo should let the Episode image show through. Avoid an opaque card feeling.
- The small Episode pill must include the Episode number, not only the word `Episode`.
- The Episode number in the pill must be high-contrast and readable against the pill background.
- The masthead title, premise, and date should remain live HTML.

## Typography Standard

Keep the article body calm and readable.

Allowed expressive treatment:

- `On This Season...`
- `On This Episode...`
- `Previously On LAiDIES...` for later Episodes when the reader needs prior context.
- masthead title/brand moments
- intentional signoff display lines

Avoid:

- random script styling inside normal paragraphs
- mixed logo-style `Ai` treatment inside body copy
- one-off inline text styles when a reusable class exists
- too many competing heading, label, and quote treatments in one mobile article

Episode 1 now uses:

- `.episode-intro-card`
- `.episode-intro-label`
- `.episode-intro-copy`
- `.episode-intro-summary-copy`
- `.section-subhed`
- `.article-subheading`

## Intro Card Standard

Use collapsible intro cards for Episode context, but do not collapse them into mystery boxes.

Standard:

- Episode 1 can use `On This Season...` followed by `On This Episode...`.
- Later Episodes can use `Previously On LAiDIES...` followed by `On This Episode...`.
- Collapsed intro cards should show the first two lines of preview text under the italic heading.
- The preview text should make it clear there is more to read.
- The expand control should be visually obvious, using a pill or small rounded color block behind the `+` / `-`.
- Opening the card should reveal the full intro copy without duplicating the preview.

## Section Heading Standard

Use the colored bar plus full pink heading block as the Episode section standard.

Requirements:

- The first true article section heading after the intro cards should use the same treatment as later `h2` headings.
- The pink block must cover the full heading area, including wrapped lines.
- It must not behave like a lower-line marker that only catches one line or the bottom layer of text.
- The colored bar should sit with the section heading and signal the start of the section.
- Mobile headings must stay readable at 390px without horizontal overflow.

Episode 1 currently implements this with `.article-card h2`.

Future extraction target:

- Move this treatment into a reusable Episode heading class or shared Episode CSS rule.

## Section Divider Standard

Do not use a tiny centered separator when the colored bar and section heading are already present.

Standard:

- Use the colored bar plus section heading as the visible section divider.
- If a spacing hook is still needed between large content blocks, keep it spacing-only.
- Do not show both a centered line and a colored bar for the same section break.

Episode 1 now suppresses the visible `.section-divider::before` line while preserving the spacing hook.

## Quote / Pull-Quote Standard

Use Episode 3's quote family as the reusable visual reference.

Standard quote anatomy:

- semantic `<blockquote>`
- quote text inside a paragraph
- optional attribution in `<cite>`
- large decorative opening quote mark
- corner-rule line treatment using plum/pink and soft blue
- Playfair-style italic display text
- restrained uppercase attribution when present
- no centered hairline above and below the quote

Episode 1 now updates the Fei-Fei Li quote to match the Episode 3 direction while preserving the quote and attribution.

Future extraction target:

- Extract Episode 3's `blockquote` / `pullquote-feature` / `pullquote-side` / `pullquote-compact` / `pullquote-sticker` family into shared Episode CSS.
- Map each Episode's editorial quotes to one of those approved quote roles.
- Keep Episode-specific quote copy unchanged during template work.

## Signoff And Challenge Standard

Signoff:

- one polished closing showpiece
- readable display text
- no random body script styling
- no mixed logo typography inside normal prose
- no generic CSS-art decoration in the `Remember, LAiDIES` panel
- if the signoff needs a visual accent, use an approved LAiDIES asset or omit the accent

Challenge:

- compact action card
- clear reader action
- clear reward or feedback loop
- no decorative typography inside the paragraph body

Episode 1 already follows this emerging standard after the previous review-fix slice.

## After-Read Action Standard

Treat newsletter, sharing, and Instagram as three related but separate after-read actions.

Standard:

- Newsletter should invite readers to get the next Episode by email.
- Sharing should focus on sending the article to a friend or copying the link.
- Instagram should be its own `LAiDIES After Hours` card, not a third button inside the share card.
- Instagram copy should explain that @we.are.laidies has more content, reminders, and extra LAiDIES world material after the Episode.
- LAiDIES social destination links should use the approved URLs:
  - Instagram: `https://www.instagram.com/we.are.laidies/`
  - LinkedIn: `https://www.linkedin.com/company/wearelaidies/?viewAsMember=true`
- On desktop, the Instagram card can span under the newsletter/share pair so the three actions feel coordinated.
- On mobile, keep the three actions stacked and easy to scan.
- The after-article stack should share one max width across the signoff, challenge, after-read action cards, bottom ritual handoff, and further-reading/resources panel. Keep inner text measures narrower where needed, but align the card edges so the section feels like one designed system.
- The further-reading/resources panel should still look intentional: use a restrained border, soft lift, and an editorial accent instead of a flat wide background block.
- Further-reading/resources panel headings should use the same section-heading treatment as the article, including the pink block, plum left rule, and small colored bar.

## Desktop Side Rail Standard

On desktop, keep the side rail as a compact shortcut, not a duplicate ritual section.

Standard:

- Label it as an after-read shortcut.
- Use a short heading such as `Open the Weekly Bag`.
- Keep the copy to one sentence.
- Keep `Go to the Weekly Bag` as the primary action.
- Optional chips can point to key Bag objects, but the full ritual explanation belongs at the bottom of the page.
- On mobile, omit the side rail and rely on the bottom ritual handoff.

## Episode Weekly Ritual Bridge Standard

The Episode page ritual section is a bridge into the real Wednesday Bag, not a second Bag interface.

Collapsed default state:

- Show the ritual section label, heading, and explanatory paragraph.
- Use the heading `Complete the Weekly Ritual`.
- Show only the first ritual card, usually the current article/read step.
- Provide a primary pill link: `Go to the Weekly Bag`.
- Provide a secondary native `See full ritual` disclosure with a clear `+` affordance underneath the label.

Expanded state:

- Reveal the remaining ritual cards in the same top-level order used by the Wednesday Bag.
- Keep the Weekly Bag link available.
- Use native `<details>` / `<summary>` where possible so the control works without custom JavaScript.

Naming:

- Match the Weekly Bag public labels instead of inventing Episode-only names.
- Top-level ritual cards should use: `Read Episode ##`, `Weekly Study Pack`, `Take the Quiz`, `Extra Credit`, `Meet & Celebrate`, `DJ Booth`, `The Book of Receipts`, and `Hidden Charm` where applicable.
- Individual object links should use the Weekly Bag object names: `Take the Quiz`, `Cheat Sheet`, `Try-On`, `Practice Cards`, `DJ Booth`, `Extra Credit`, and `Community`.
- The exact first card and Bag URL remain Episode-specific.

## Next Episode Standard

Use `Next Time On LAiDIES...` for the next-Episode teaser heading.

Avoid:

- `Next Wednesday: Episode ##`
- route-like or production-calendar phrasing inside the article ending

The teaser body can still mention what the next Episode helps the reader do, but the heading should feel like a show, not a file label.

Visual treatment:

- The next-Episode teaser should read as an intentional editorial card, not a loose paragraph.
- Use a restrained blush/plum border, a small accent rule, and soft lift so it stands out without competing with the final signoff.

## Episode 2 Guardrails

Before Episode 2 alignment:

- Do not modify Episode 2 until Ali approves this mobile template direction.
- Use one existing Episode 2 image as the masthead image.
- Preserve Episode 2 article copy, voice, references, images, and URL.
- Apply the same heading, section-divider, quote, signoff, and challenge standards.
- Do not inherit Episode 1's old inline styles or Episode 3's overly expansive mobile pre-read stack without review.

## Still Needs Work

- The Episode heading, intro, quote, signoff, and challenge rules are still page-specific in Episode 1.
- Episode 3 has the richer quote family, but that family has not yet been extracted into shared CSS.
- Episode 2 has not been aligned.
- The mobile Episode Kit / side-link pattern still needs a component-level pass.
