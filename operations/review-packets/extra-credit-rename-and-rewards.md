# THE EXTRA CREDIT Rename + Ritual Rewards

Date: 2026-06-18

## Reader-Facing Rename

The reader-facing name **Weekly Fun Pack** is now **THE EXTRA CREDIT**.

The route remains `games/fun-pack.html` for now so existing links do not break. Internal class names, data attributes, and file names may still use `fun-pack` where they are implementation details.

Updated reader-facing surfaces:

- Wednesday Bag card: `4. Extra Credit` / `THE EXTRA CREDIT`
- THE EXTRA CREDIT page title, H1, subtitle, and ritual explanation
- Homepage menu and LAiDIES Clubhouse portal list
- Clubhouse hotspots, labels, and next-step card
- Shared `from=this-week&group=fun` return labels
- Start Here references and social metadata copy
- Printable secondary CTA
- Episode 03 article sidebar/activity card labels
- Quiz/review hint copy in site data

Naming standards preserved:

- `LAiDIES`
- `Madame CLAi-O` / `Mme CLAi-O`
- `FAiRY GODMOTHER`
- `SLAiYER HANDBOOK`
- Normal standalone `AI` remains normal sentence text.

## Reward Taxonomy

- Quiz completion: sticker
- Hidden weekly object: charm
- Full weekly ritual completion: merit badge
- Cards and printables: collectible / takeaway

## Full Ritual Merit Badge

Episode 03 full ritual badge:

**CHECKED THE ALIBI**

Current completion criteria:

- Read the issue
- Save the Try-On / practice pass
- Complete the quiz
- Open/save the cheat sheet
- Open the weekly card pack
- Open THE EXTRA CREDIT
- Open DJ Booth / weekly anthem

Connect, Book of Receipts, and the hidden charm stay valuable extras, but they are not required for the full-ritual merit badge in this pass.

## Persistence Boundary

Current behavior is local/browser based:

- Wednesday Bag completion lives in `laidiesWednesdayRitualVisits`.
- Hidden charms live in `laidiesSecretCharms` and `laidiesCharmBracelet`.
- Merit badges currently use the existing local badge store and pending card queue.

The Bag copy says the merit badge is saved in this browser for the future LAiDIES Card. It does **not** claim backend persistence.

Future pass:

- Promote full-ritual merit badges into the official LAiDIES Card / Clubhouse Pass reward model.
- Show merit badges on the pass as their own section, separate from quiz stickers and hidden charms.
- Sync `reward_type: merit_badge` once the member reward backend is verified.

## QA Notes

- `group=fun` remains unchanged to avoid route churn.
- `games/fun-pack.html` remains the live destination for THE EXTRA CREDIT.
- Cache-busted local browser checks passed at `375`, `390`, `430`, `1280`, and `1440` px.
- Checked homepage, Wednesday Bag, THE EXTRA CREDIT, Episode 03 article, FAiRY GODMOTHER, and Clubhouse Pass.
- No horizontal overflow or relevant console errors were found in the checked pages.
- No prototype folders were touched.
- No Episode 3 article copy was rewritten.
- `styles.css` was not changed for this pass.
