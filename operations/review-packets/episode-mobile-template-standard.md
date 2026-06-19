# Episode Mobile Template Standard

Date: 2026-06-19

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

## Typography Standard

Keep the article body calm and readable.

Allowed expressive treatment:

- `On This Season...`
- `On This Episode...`
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
- `.section-subhed`
- `.article-subheading`

## Section Heading Standard

Use the colored bar plus full pink heading block as the Episode section standard.

Requirements:

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

Challenge:

- compact action card
- clear reader action
- clear reward or feedback loop
- no decorative typography inside the paragraph body

Episode 1 already follows this emerging standard after the previous review-fix slice.

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
