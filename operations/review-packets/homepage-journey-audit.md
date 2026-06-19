# Homepage Journey Audit

Date: 2026-06-19

Scope: Part B audit of the homepage after the approved masthead.

No staging, commit, push, revert, delete, cleanup, prototype work, backend work, signup work, Buttondown work, Supabase work, or Part C implementation was performed.

## Files Inspected

- `index.html`
- `styles.css`
- `operations/review-packets/homepage-masthead-implementation-qa.md`
- `operations/review-packets/pre-part-b-tree-hygiene-plan.md`

## Current Flow

1. Header and menu.
2. Approved masthead with LAiDIES wordmark, `GIRL POWER MEETS / MACHINE POWER`, AI fluency support copy.
3. Post-masthead orientation copy:
   - `90s/Y2K defined us. AI is shaping now. LAiDIES is where they meet.`
   - `New episodes every Wednesday, obviously.`
4. Masthead action row:
   - `READ LATEST EPISODE`
   - `OPEN THIS WEEK'S BAG`
5. Anthem button:
   - `Play the anthem`
6. Current Episode card:
   - `CURRENT WEDNESDAY EPISODE`
   - `EPISODE 3: THE BURN BOOK PROBLEM`
   - `READ EPISODE 3`
7. Pick Your Path:
   - `START FROM THE BEGINNING`
   - `READ THE SEASON`
   - `DO THE WEEKLY RITUAL`
8. Portal map:
   - THE BOOK OF RECEIPTS
   - THE LAiDIES CLUBHOUSE
   - JOIN THE CLUB
   - HOW LAiDIES WORKS
9. World preview:
   - `Get in, loser. We're doing AI.`
10. Subscribe and footer.

## Main UX Risk

The homepage has the right ingredients, but three adjacent sections are all doing "choose where to go next":

- Masthead actions.
- Current Episode card.
- Pick Your Path.

That makes the page feel like it is repeating doors before it explains the world.

## Duplicated CTAs / Text Blocks

### Current Episode duplication

- Masthead: `READ LATEST EPISODE`.
- Current Episode card: `READ EPISODE 3`.

Recommendation: keep both only if they have different jobs:

- Masthead: quick returning-reader action.
- Current Episode: editorial context, image, and current-week framing.

### Bag duplication

- Masthead: `OPEN THIS WEEK'S BAG`.
- Pick Your Path: `DO THE WEEKLY RITUAL`.
- Portal map: `WEDNESDAY BAG`.

Recommendation:

- Keep `OPEN THIS WEEK'S BAG` in masthead.
- Turn Pick Your Path into a short explanatory orientation instead of another CTA row.
- Keep Portal map as the durable world map.

### Start path duplication

- Menu: `Start From The Beginning`.
- Pick Your Path: `START FROM THE BEGINNING`.
- Portal map: `HOW LAiDIES WORKS` and `START HERE`.

Recommendation:

- Move the emotional rally line and first-reader explanation into a New Here / Start Here section.
- Keep one primary `START FROM THE BEGINNING` action there.

### Anthem placement

The anthem currently sits directly under the masthead CTAs. It also has a charm reward.

Recommendation:

- Do not make anthem a masthead-level primary action.
- Keep it as a small mood-setting object under the masthead only if it stays visually secondary.
- Stronger option: move it into a DJ Booth / LISTEN cue lower on the page or inside the Clubhouse/weekly area.

## Recommended Content Jobs By Section

### Masthead

Keep:

- LAiDIES wordmark.
- `GIRL POWER MEETS / MACHINE POWER`.
- `AI fluency for women with full calendars and high standards, not beige tech explanations.`
- `90s/Y2K defined us. AI is shaping now. LAiDIES is where they meet.`
- `New episodes every Wednesday, obviously.`
- Primary CTAs:
  - `READ LATEST EPISODE`
  - `OPEN THIS WEEK'S BAG`

Remove from masthead or keep secondary:

- `START FROM THE BEGINNING`
- `READ THE SEASON`
- `Play the anthem`

### New Here / Start Here

Should hold:

- `Get in, loser. We're learning AI.`
- One-sentence onboarding: start with Episode 1, then use each Wednesday Bag.
- Primary new-reader CTA: `START FROM THE BEGINNING`.
- Secondary link: `HOW LAiDIES WORKS`.

This is the best home for the rally line because it welcomes the reader instead of interrupting the masthead conversion path.

### Pick Your Path

Should become explanatory, not just a second button set.

Recommended card jobs:

- New here: start from Episode 1 and learn the flow.
- Magazine first: read the Season archive.
- Wednesday ritual: open the current Bag after reading or when returning.

If this section remains immediately below the Current Episode card, reduce CTA weight so it feels like orientation.

### Current Episode / Weekly Area

Should hold:

- Episode 3 image and title.
- One-line premise.
- `READ EPISODE 3`.
- Secondary link to `OPEN EPISODE 3 BAG` or short sentence explaining that the Bag holds Try-On, quiz, printable, song, charms, and extras.

Avoid making this a duplicate masthead.

### Clubhouse

Should hold:

- AI After Hours framing.
- Dream Phone, Mme CLAi-O, FAiRY GODMOTHER, Girl Talk, DJ Booth.
- Clear `OPEN THE CLUBHOUSE` CTA.

### Book of Receipts

Should hold:

- Source-of-truth framing.
- SLAiYER HANDBOOK, THE COVEN, THE POWER MAP, THE LORE CLOSET, THE DISPATCHES, THE EVIDENCE DRAWER, ASK THE BOOK.
- Clear caveat that some areas are preview/working destinations until fully built.

### Join

Should hold:

- Community / LAiDIES Room.
- LAiDIES Card / Clubhouse Pass.
- Businesswomen's Special / Happy Hour.
- Honest save-progress language: local now, backend later.

## Recommended Homepage Order

1. Masthead:
   - brand, premise, two primary returning-reader CTAs.
2. New Here / Start Here:
   - rally line, first-reader explanation, start button.
3. Current Episode:
   - Episode 3 editorial context and read action.
4. Pick Your Path:
   - short explanatory route cards, lower CTA weight.
5. Portal map:
   - Book, Clubhouse, Join, How It Works.
6. Subscribe:
   - next Wednesday Episode.

Alternative if the page feels too long on mobile:

1. Masthead.
2. Current Episode.
3. New Here / Start Here.
4. Portal map.

This lets returning readers get the latest item first.

## Should The Masthead Keep These?

| Item | Recommendation | Reason |
| --- | --- | --- |
| `READ LATEST EPISODE` | Keep | Strong returning-reader action. |
| `OPEN THIS WEEK'S BAG` | Keep | Defines the ritual object and current weekly workflow. |
| `START FROM THE BEGINNING` | Move below | New-reader path belongs in orientation, not masthead. |
| `Play the anthem` | Demote or move | Lovely mood object, but it competes with primary navigation if treated as a third masthead action. |

## Affected Files / Routes

Likely implementation files:

- `index.html`
- Possibly `styles.css` if card hierarchy or section spacing changes are needed.

Related routes:

- `/`
- `start-here.html`
- `this-week.html?issue=3&bag=open`
- `issues/issue-03.html`
- `episodes.html`
- `clubhouse.html`
- `learn.html`
- `community.html`

## Existing Assets To Use

- `assets/brand/laidies-homepage-masthead-bg-approved-v1.png`
- `assets/brand/laidies-logo-masthead-approved-v3.png`
- `assets/issue-03-hero.png`
- `assets/this-week/wednesday-it-bag-open.jpg`
- `assets/clubhouse-compact-open-v4.png`
- `assets/home-book-of-receipts-closet-v1.png` only if Ali approves it later, because it is currently untracked/parked.
- `assets/lets-chat.png`

## Gaps / Risks

- `index.html` is already a mixed dirty file with parked Part B ideas; do not stage whole-file without careful review.
- Homepage changes should be separate from Dream Phone implementation unless Ali explicitly approves a broader visual pass.
- Buttondown/signup form fixes are Part C/parking-lot work and should not be bundled.
- No fresh browser screenshots were captured in this pass, so this is not final visual QA.

## Recommended First Homepage Implementation Slice

If Ali wants a homepage-only implementation later:

1. Move `Get in, loser. We're learning AI.` into a New Here / Start Here block.
2. Keep masthead at two primary CTAs.
3. Rewrite Pick Your Path cards as explanatory cards with lower CTA weight.
4. Leave portal map intact except for obvious label consistency fixes.

Exact likely files:

- `index.html`
- possibly `styles.css`

Risk: medium-high because homepage file is mixed and currently contains parked future-world work.

## Staging Plan

No staging is recommended now.

If Ali approves only this audit doc later:

```bash
git add operations/review-packets/homepage-journey-audit.md
```

Do not use `git add .`.

