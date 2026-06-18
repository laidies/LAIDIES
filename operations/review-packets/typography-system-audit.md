# LAiDIES Typography System Audit

Date: 2026-06-18

## Current Font Inventory

Commonly used:

- Editorial display: `Playfair Display`, `Georgia`, `Didot`, `Bodoni 72`, fallback serif.
- Body/UI: `Inter`, system sans.
- Utility labels: `JetBrains Mono`, especially for quiz, printable, and ritual labels.
- Accent handwriting: `Dancing Script`, `Caveat`, and occasional system handwriting/cursive choices.

Observed outliers:

- Some pages still use inline `Georgia` instead of the shared display stack.
- Some pages load different Google font combinations.
- `styles.css` contains older masthead/brand experiments and should not be staged wholesale while homepage image direction is still unresolved.
- A few older pages rely on inline styles for labels, CTA text, or footer links.

## Recommended Standard

Major headings:

- Use the existing editorial serif direction: `Playfair Display`, `Didot`, `Bodoni 72`, `Georgia`, serif.
- Keep large headings readable on mobile with `clamp()` and tight but not crushed line-height.
- Do not use image-logo lettering for body or section text.

Subheads / eyebrows / card labels:

- Use `Inter` or `JetBrains Mono`.
- Uppercase with moderate letter spacing.
- Keep `letter-spacing` below `0.16em` unless it is a tiny label.

Body copy:

- Use `Inter` or system sans.
- Keep color in the plum/ink range, not pale lavender on pale pink.
- Avoid text smaller than `0.78rem` for reader-facing copy.

Buttons / CTAs:

- Bold, readable, and consistent.
- Prefer uppercase labels for primary actions.
- Avoid tiny text inside large pill buttons.

Brand styling:

- Preserve `LAiDIES`, `Madame CLAi-O`, `Mme CLAi-O`, `FAiRY GODMOTHER`, and `SLAiYER HANDBOOK`.
- Do not stylize every standalone `AI`; normal sentence text should remain normal.
- Avoid the broken small `Ai` treatment outside true brand or feature names.

## Safe Changes Made In This Pass

- Renamed the reader-facing weekly extras concept to **THE EXTRA CREDIT**.
- Kept the label uppercase where it functions as a title/card/menu item.
- Used readable title case for return links: `Back to The Extra Credit`.
- Left `styles.css` untouched because it contains mixed broader homepage/masthead work.

## QA Notes

- Checked mobile widths `375`, `390`, and `430` px.
- Checked desktop widths `1280` and `1440` px.
- No horizontal overflow was found on the checked homepage, Bag, article, THE EXTRA CREDIT, FAiRY GODMOTHER, or Clubhouse Pass surfaces.
- No relevant console errors were found during the local browser pass.

## Future Typography Work

- Move repeated inline page font stacks into a shared token file once the homepage masthead direction is approved.
- Normalize older page headers one section at a time.
- Replace isolated `Georgia` declarations with the shared editorial display stack where safe.
- Audit mobile heading wrap on homepage, Bag, article pages, quiz, Try-On, and Clubhouse pages before staging any global CSS.
