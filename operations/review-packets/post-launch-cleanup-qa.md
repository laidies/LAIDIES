# Post-launch cleanup QA

Date: 2026-06-17

Scope: focused cleanup for the live homepage, Wednesday Bag grouped navigation, Episode 3 article presentation, Episode 3 quiz rewards, and CLAi-O naming. This pass did not intentionally touch prototypes, broad rebrand work, Episode 1/2 migration, or shared `styles.css`.

## Files changed in this pass

Primary cleanup files:

- `index.html`
- `this-week.html`
- `content/issues/issue-03.md`
- `issues/issue-03.html`
- `script.js`
- `learn/quiz.html`
- `try-on.html`
- `printable.html`
- `games/trading-cards.html`
- `games/fun-pack.html`
- `games/dream-phone.html`
- `games/madame-claio.html`
- `games/fairy-godmother.html`
- `games/dj-booth.html`
- `content/site/community-room.js`
- `community/laidy-spotlight.html`

Mixed dirty files also touched for return behavior / naming:

- `community.html`
- `hot-goss.html`

These two files contained broader pre-existing dirty work, so do not blindly stage the whole files without reviewing their diffs.

## Homepage cleanup

- Hero now uses the extended LAiDIES motto as the main hierarchy:
  - `90s/Y2K shaped us. AI is shaping now. LAiDIES is where they meet.`
  - Supporting copy keeps `Girl Power meets Machine Power`.
- Primary hero CTA is now `READ LATEST ISSUE` and links directly to `issues/issue-03.html`.
- Secondary hero CTA is `OPEN THIS WEEK'S BAG` and links to `this-week.html?issue=3&bag=open`.
- The original world image was moved lower into an `Inside the LAiDIES world` section.
- `Where to start` now uses ritual language for returning readers, new readers, and people who only want to read.
- `THE BOOK OF RECEIPTS`, `THE LAiDIES CLUBHOUSE`, `JOIN THE CLUB`, and `HOW LAiDIES WORKS` were cleaned up into homepage preview sections instead of raw metadata blocks.
- `Businesswomen's Special` is one word.
- Homepage menu opens and closes on mobile. Hot Goss is directly reachable as `Today's AI Dispatch / Hot Goss`.

## Wednesday Bag grouped behavior

Top-level Bag flow now stays grouped:

- `Read` opens Episode 03.
- `Practice` opens `Weekly Study Pack`.
- `Quiz` opens the Issue 3 quiz start.
- `Weekly Fun` opens the Weekly Fun Pack.
- `Connect` opens `Meet & Celebrate`.
- `Listen` opens DJ Booth.
- `Real World` opens `The Book of Receipts`.

Group drawers checked:

- `Weekly Study Pack` shows Try-On, Cheat Sheet, and Practice Cards.
- `Meet & Celebrate` shows Community Card and Businesswomen's Special.
- `The Book of Receipts` shows Hot Goss, Glossary, Reference Closet, and Who's Who.

Return behavior checked:

- Try-On returns to `Weekly Study Pack`.
- Printable/Cheat Sheet returns to `Weekly Study Pack`.
- Trading Cards return to `Weekly Study Pack`.
- Dream Phone returns to `Weekly Fun Pack` when opened from the Bag.
- Madame CLAi-O returns to `Weekly Fun Pack` when opened from the Bag.
- Fairy Godmother returns to `Weekly Fun Pack` when opened from the Bag.
- DJ Booth returns to `Weekly Fun Pack` when opened from the Bag.
- Who's Who returns to `The Book of Receipts` without duplicate competing Bag-return pills.
- Hot Goss returns to `The Book of Receipts`.
- Community returns to `Meet & Celebrate`.

Bag controls checked:

- `Back to Home` is visible from the open Bag state.
- `Close the bag` remains visible in the open Bag control.
- `Copy Link` is visible in the open Bag control.
- No horizontal overflow at 390px in the checked Bag states.

## Episode 3 article cleanup

Body lines restored:

- `That is when you stand up in the back in your pink hoodie and oversized sunglasses and yell: she doesn't even go here.`
- `Do not be Chutney on the stand. Be Elle with the timeline.`
- `A draft is an outfit. A claim is an alibi. Dress accordingly.`

Pull quote / presentation changes:

- Pull quotes remain as repeated editorial emphasis, but the required body lines now exist where the logic needs them.
- Pull quotes use more distinct magazine styling and spacing.
- Desktop pull quotes can sit as side/floating editorial elements where appropriate.
- Mobile pull quotes are separated as obvious editorial callouts.

Article sidebar changes:

- Removed the internal-sounding line about doing activities "without scrolling to the bottom of the issue."
- Sidebar now prioritizes weekly actions: Bag, quiz, cheat sheet, Try-On, cards, anthem, Weekly Fun, and Room.
- Internal table of contents is collapsed under `Jump to a section`.

Top/recap changes:

- Top ribbon now reads as reader orientation, not launch status.
- Hero summary changed from `Main Character Energy` to `This Week's Rule`.
- `Last Week On LAiDIES...` and `On This Episode...` received distinct recap styling.

## Quiz reward display

Root cause:

- The quiz score could store and report 11/10, but the visual butterfly rating was capped against the 10-question core score.

Fix:

- 10/10 returns the `receipts` tier with 10 clips.
- 11/10 returns the `receipts-plus` tier with 11 clips.
- 12/10 returns the `double` tier with 12 clips.
- The visual label now matches the actual score, e.g. `11/10 butterfly clips`.
- Best saved score no longer visually collapses to 10/10 when the stored score is 11/10 or 12/10.

Actual script-source check:

- 10/10: `Receipts Queen Sticker`, 10 clips.
- 11/10: `Receipts Queen Extra Credit Sticker`, 11 clips.
- 12/10: `Caboodle Valedictorian + Receipts Queen`, 12 clips.

## CLAi-O naming

Reader-facing instances of `CLAI-O` in the checked files were changed to:

- `Mme CLAi-O`
- `Madame CLAi-O`

Files included in the naming pass:

- `index.html`
- `this-week.html`
- `script.js`
- `games/fun-pack.html`
- `games/madame-claio.html`
- `community.html`
- `community/laidy-spotlight.html`

Search result after cleanup: no `CLAI-O` hits in the checked post-launch scope.

## QA performed

Static checks:

- `script.js` parses with the bundled Node runtime.
- `content/episode-index.json`, `content/site/quizzes.json`, and `content/site/card-packs.json` parse as JSON.
- Local server responds at `http://localhost:8765/index.html`.

Browser checks:

- Homepage at 375px, 390px, 430px, and 1440px.
- Homepage menu opens/closes at 390px; Hot Goss is present in the menu.
- Wednesday Bag at 390px and desktop.
- Weekly Study Pack drawer at 390px.
- Meet & Celebrate drawer at 390px.
- Book of Receipts drawer at 390px.
- Episode 3 article at 390px and desktop.
- Quiz route at 390px.
- Try-On, printable, and trading cards at 390px.
- Dream Phone, Madame CLAi-O, Fairy Godmother, DJ Booth, and Who's Who child returns at 390px.

Results:

- No horizontal overflow found in checked paths.
- No relevant console errors found in checked paths.
- Episode 3 article body contains the restored lines.
- Episode 3 sidebar has activity-first copy and collapsed section jump.
- Bag child routes preserve the correct `group` return where checked.

## Remaining Ali-review flags

- `community.html` and `hot-goss.html` include broader pre-existing dirty changes beyond the tiny group-return fixes. Review before staging whole files.
- Several Weekly Fun pages still show their original `Back to Clubhouse` links alongside the group-aware return in some cases. This is usable, but a future Clubhouse-wide navigation cleanup should standardize it.
- `styles.css` remains dirty from unrelated work and was not touched for this cleanup.
- Prototype/reorg files remain dirty/untracked and should stay excluded.

## Staging guidance

Safe whole-file staging candidates from this cleanup, subject to final visual approval:

```bash
git add index.html this-week.html content/issues/issue-03.md issues/issue-03.html script.js learn/quiz.html try-on.html printable.html games/trading-cards.html games/fun-pack.html games/dream-phone.html games/madame-claio.html games/fairy-godmother.html games/dj-booth.html content/site/community-room.js community/laidy-spotlight.html operations/review-packets/post-launch-cleanup-qa.md
```

Do not blindly stage without additional review:

```bash
community.html
hot-goss.html
```

Do not stage:

```bash
styles.css
operations/prototypes/
operations/prototypes/laidies-world-site-v2/
broader rebrand/prototype/social preview assets
Episode 1/2 template migration files
unclear dirty operations docs
```

No files were staged or committed in this cleanup pass.
