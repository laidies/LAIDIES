# Final Episode Template Standard Audit

Date: June 20, 2026

Status: **READY AFTER EPISODE 3 MANUAL APPROVAL**

Council result: **PASS: template ready after Ali reviews Episode 3**

## Scope

Reviewed live aligned pages:

- `issues/issue-01.html`
- `issues/issue-02.html`
- `issues/issue-03.html`

Reviewed supporting packets:

- `operations/review-packets/episode-mobile-template-standard.md`
- `operations/review-packets/episode-01-approved-template-qa.md`
- `operations/review-packets/episode-02-desktop-stabilization-qa.md`
- `operations/review-packets/episode-03-template-alignment-qa.md`
- `operations/review-packets/mobile-episode-ux-audit.md`
- `operations/review-packets/desktop-layout-recovery-audit.md`
- `operations/review-packets/laidies-council-quality-gate.md`

No live Episode files were edited for this audit.

## Evidence

Fresh screenshots saved under:

- `operations/review-packets/assets/final-episode-template-standard-audit/`

Screenshots:

- `episode01-mobile-390-top.png`
- `episode02-mobile-390-top.png`
- `episode03-mobile-390-top.png`
- `episode01-mobile-390-definitions.png`
- `episode02-mobile-390-definitions.png`
- `episode03-mobile-390-definitions.png`
- `episode01-mobile-390-end.png`
- `episode02-mobile-390-end.png`
- `episode03-mobile-390-end.png`
- `episode01-desktop-1440-top.png`
- `episode02-desktop-1440-top.png`
- `episode03-desktop-1440-top.png`
- `episode01-desktop-1440-article.png`
- `episode02-desktop-1440-article.png`
- `episode03-desktop-1440-article.png`

QA evidence:

- Mobile 390 and desktop 1440 screenshots were captured for all three Episodes.
- Rendered-page checks found no horizontal overflow in the tested mobile/desktop captures.
- All three Episodes expose the core aligned pattern: sticky nav, masthead, reader kit, intro cards, definitions, after-read actions, side rail on desktop, and Weekly Ritual handoff.

## Three-Episode Comparison

| Component | Current State | Classification | Template Recommendation |
| --- | --- | --- | --- |
| Masthead image treatment | All three use an existing Episode-specific image with a soft pearl/blush wash. | Consistent with intentional Episode-specific images. | Standardize as required. Each Episode must use one strong existing Episode image. |
| Logo treatment | All three use live LAiDIES logo in a translucent blush/glass block. | Consistent. | Required. Keep logo live, not flattened into the background. |
| Episode pill | All three include Episode number. Episode 3 spacing reads `Episode #03`; Episodes 1/2 read tighter in DOM as `Episode#01/#02` but visually pass. | Minor accidental implementation drift. | Standardize copy/spacing as `Episode #0X`. |
| Date placement | All three show date in masthead and sticky nav; desktop date sits near subtitle/title system. | Consistent enough. | Required. Date may move within masthead composition if responsive layout needs it. |
| Title style | All three use large editorial serif title. | Consistent. | Required. Keep Episode-specific line breaks flexible. |
| Subtitle/premise treatment | All three use a translucent subtitle card with colored accent line. | Consistent. | Required. This can also inform homepage masthead later. |
| Sticky Episode nav | All three show Season, Top, Article, Study Pack, Weekly Ritual. | Consistent. | Required. Keep compact and avoid duplicate back links above masthead. |
| Intro cards | Episode 1 uses `On This Season...` + `On This Episode...`; Episodes 2/3 use `Previously On LAiDIES...` + `On This Episode...`. | Intentional Episode-specific variation. | Required pattern with flexible first card label. Episode 1 may use `On This Season...`; later Episodes should use `Previously On LAiDIES...`. |
| Intro card collapsed preview | All three show preview text and clear plus control. | Consistent. | Required. Keep two-line preview rule. |
| Article section headings | All three use large editorial heading cards with colored rule. | Consistent. | Required. |
| Section highlight coverage | Heading block covers wrapped headings. | Consistent. | Required. |
| Pull quote treatment | Episode 3 has richer quote family; Episodes 1/2 are simpler. | Accidental/intentional mixed state. | Standardize quote roles before automation: feature, side, compact, sticker. Use fewer variants per Episode unless editorially justified. |
| Inline images | All three include Episode-specific article images. Episode 3 has more. | Intentionally Episode-specific. | Required, but count/placement can vary by article. |
| Body typography | Episode 2/3 desktop body is larger and wider; Episode 1 remains slightly more conservative. | Accidental drift but acceptable for approved pages. | Standardize future desktop body around 17.5-18.4px and 68-76ch measure. |
| Signoff treatment | Episodes 1/2 use `.signoff`; Episode 3 uses `.signoff-showpiece`. Visual intent is aligned. | Implementation drift. | Extract one reusable signoff component. |
| Challenge block | All three include LAiDIES challenge/engagement. Copy varies. | Consistent with Episode-specific copy. | Required. Copy should stay Episode-specific. |
| `So You Don't Pull a Cher` definitions | All three include three collapsed definitions. Episode 3 has newer heading-card styling. | Component present; heading styling drift. | Required. Standardize Episode 3 heading treatment or choose the simpler Episode 1/2 version intentionally. |
| Definitions expand/collapse | All three use collapsed definition cards. | Consistent. | Required. Use native details/summary where possible. |
| Reader kit / side rail | All three show three reader-kit cards and compact desktop side rail; mobile hides side rail. | Consistent. | Required. Side rail remains a shortcut only. |
| Weekly Ritual handoff | All three include bottom `Complete the Weekly Ritual` bridge. | Consistent. | Required. Must remain the main ritual explanation. |
| Resources / receipts panel | Episodes 1/2 use resources section; Episode 3 wraps receipts into article receipts panel. | Accidental implementation drift. | Standardize visually: same max width, heading treatment, restrained border/lift. Content can vary. |
| After-read actions | All three include newsletter, share/copy, Instagram/LinkedIn. | Consistent. | Required. |
| Newsletter signup | All three use Buttondown pattern and direct fallback. | Consistent. | Required. |
| Share/copy link | All three include Share Article and Copy Link. | Consistent. | Required. |
| Instagram / LinkedIn sections | All three include `LAiDIES After Hours` style social follow. | Consistent. | Required. Instagram should remain its own card, not buried in share. |
| Next Episode teaser | All three use `Next Time On LAiDIES...`. | Consistent. | Required. |
| Footer/Season navigation | Sticky nav links back to Season; broader footer remains outside this audit. | Mostly consistent. | Keep Episode nav consistent; do not solve global footer in Episode template extraction. |
| Mobile header/return behavior | All three show compact sticky header with Episode title/date and nav pills. | Consistent. | Required. |
| Desktop article width | Episode 2/3 use 1320 shell / 860 article / 320 side rail. Episode 1 is approved but a little more conservative. | Accidental drift acceptable for now. | Future standard should use 1240-1320 shell, 820-860 article, 300-320 side rail, paragraph cap near 68-76ch. |
| Desktop side rail behavior | All three use desktop side rail; hidden on mobile. | Consistent. | Required. |
| Mobile readability and scroll flow | All three are readable at 390. Episode 3 is the longest and richer; still reviewable. | Consistent enough with Episode-specific length. | Required QA at 375/390/430 for every future Episode. |

## Top Five Differences Across Episodes

1. **Episode 3 has richer pull quotes.** This is visually stronger but needs rules before it becomes the shared standard.
2. **Episode 3 definitions heading has the newer heading-card treatment.** Episodes 1/2 use a simpler `So You Don't Pull a Cher` header. This should be standardized.
3. **Episode 1 desktop is slightly more conservative.** It is approved, but the eventual shared desktop system should probably follow the Episode 2/3 stabilized width rules.
4. **Resources/receipts panel implementation differs.** Episode 3 uses an article receipts panel; Episodes 1/2 use a resources section. The visual standard should unify this.
5. **Episode 3 is much longer and denser.** That is likely appropriate for the receipts/Burn Book topic, but Ali should confirm the mobile scroll still feels worth it.

## Accidental Inconsistencies To Fix Before Extraction

- Normalize Episode pill text/spacing to `Episode #0X`.
- Choose one `So You Don't Pull a Cher` heading treatment.
- Extract one signoff/challenge component instead of `.signoff` versus `.signoff-showpiece`.
- Standardize resources/receipts panel styling and naming.
- Define allowed pull-quote roles and how many should be used per Episode.
- Align desktop article shell/measure rules without making Episode 1 feel visually worse.

These do not block Episode 3 manual review, but they should be resolved before building an automated/scaffolded future Episode template.

## Missing Template Components

No major reader-facing component is missing across all three Episodes.

The remaining gap is not a missing feature. It is consolidation:

- shared CSS
- shared JavaScript behavior for intro cards and definitions
- shared data model for Episode metadata, reader kit, definitions, side rail links, after-read links, and ritual objects

## Final Recommended Reusable Episode Structure

1. Sticky Episode nav
   - Episode reader label
   - Episode title/date
   - Season
   - Top
   - Article
   - Study Pack
   - Weekly Ritual

2. Masthead
   - one existing Episode image
   - pearl/blush wash
   - live LAiDIES logo block
   - `Episode #0X` pill
   - title
   - subtitle card with colored accent line
   - date

3. Reader kit
   - three cards:
     - The Lesson
     - Try-On
     - This Week's Rule

4. Intro cards
   - Episode 1: `On This Season...` then `On This Episode...`
   - Later Episodes: `Previously On LAiDIES...` then `On This Episode...`
   - collapsed by default with two-line preview and visible plus affordance

5. Article body
   - preserved article copy
   - Episode-specific inline images
   - approved section heading treatment
   - approved pull-quote roles

6. Study Pack
   - `So You Don't Pull a Cher`
   - three Episode-specific definitions
   - collapsed details cards

7. Next teaser
   - `Next Time On LAiDIES...`
   - short Episode-specific teaser

8. Signoff and challenge
   - polished `Remember, LAiDIES:` showpiece
   - compact LAiDIES challenge card

9. After-read actions
   - Buttondown newsletter signup
   - share/copy article
   - `LAiDIES After Hours` Instagram/LinkedIn card

10. Weekly Ritual bridge
   - heading: `Complete the Weekly Ritual`
   - first card visible
   - primary `Go to the Weekly Bag`
   - `See full ritual` native disclosure

11. Resources / receipts
   - Episode-specific source/reference panel
   - same max width and heading system as the article

## What Must Be Consistent For Every Episode

- Episode terminology, not Issue terminology in reader-facing UI.
- One approved Episode image in masthead.
- Live logo/title/subtitle/date.
- Sticky Episode nav labels.
- Three-card reader kit.
- Intro card behavior.
- Section heading treatment.
- `So You Don't Pull a Cher` with three definitions.
- `Next Time On LAiDIES...`.
- Newsletter/share/social after-read system.
- Bottom Weekly Ritual bridge.
- Desktop side rail as shortcut only.
- Mobile single-column readability.
- No horizontal overflow at 375/390/430.

## What May Vary By Episode

- Masthead image and crop.
- Title line breaks.
- Subtitle/premise copy.
- Reader-kit card copy.
- First intro card label for Episode 1 versus later Episodes.
- Article body, jokes, references, inline image count, and section order.
- Pull-quote count, within approved roles.
- Definitions terms and descriptions.
- Challenge copy.
- Next teaser body copy.
- Weekly Bag object URLs and exact ritual first card.

## Masthead Asset Rule

Use one strong existing image from the Episode. Do not generate a new masthead asset unless no approved Episode image exists. Do not use unrelated page/activity imagery. Treat the image with the pearl/blush wash and keep the LAiDIES logo/title/premise/date as live page content.

## Intro-Card Rule

Intro cards should reduce pre-read load, not hide meaning. The collapsed state must show enough preview text that readers know what they are opening. Use native details/summary where possible.

## Article Heading Rule

Every true article `h2` should use the colored bar and full blush heading block. The highlight must cover wrapped headings. Do not use both a tiny centered separator and the colored bar for the same section.

## Pull-Quote Rule

Use semantic blockquotes. Keep quote styles editorial and restrained. Future shared template should support:

- feature quote
- side quote
- compact quote
- sticker quote

Do not let a page use every quote treatment just because it exists. Choose based on article rhythm.

## Signoff Rule

Use one reusable signoff component:

- `Remember, LAiDIES:`
- one strong closing line
- short Episode-specific final phrase
- no generic CSS art
- no unrelated image decoration

## Challenge / Engagement Rule

Every Episode can include one engagement challenge, but it should be compact and tied to the Episode's learning goal. Do not make Ali review a vague social CTA. Make the action, destination, and reward/credit loop clear.

## Study Pack / Definitions Rule

Every Episode should include three definitions pulled from that article's core concepts. Keep cards collapsed by default, show a preview, and let readers expand for the full definition.

## After-Read Action Rule

After-read actions should remain three coordinated cards:

- newsletter
- share/copy
- LAiDIES After Hours social follow

Instagram is its own destination because it has additional LAiDIES world content. It should not be buried as a third share button.

## Desktop Width / Readability Rule

Recommended standard:

- outer Episode shell: `1240px` to `1320px`
- article column: `820px` to `860px`
- side rail: `300px` to `320px`
- paragraph measure: about `68ch` to `76ch`
- desktop body text: about `17.5px` to `18.4px`

Do not return to the too-narrow desktop island. Do not use the earlier over-wide desktop experiment either.

## Mobile Readability Rule

Required future QA:

- mobile 375
- mobile 390
- mobile 430
- no horizontal overflow
- masthead readable
- intro cards collapsed and useful
- definitions collapsed and expandable
- side rail hidden
- bottom ritual visible and expandable
- after-read actions scan cleanly

## Return-Link / Context Rule

The sticky nav should carry the main return path. If a reader arrived from the Weekly Bag, the return link may adapt to `Return to The Bag`. Do not put a second large `Back to...` link above the masthead.

## QA Checklist For Future Episodes

- Desktop 1280, 1440, wide.
- Mobile 375, 390, 430.
- No horizontal overflow.
- No console errors.
- Masthead image loads and crops well.
- LAiDIES logo block is readable.
- Episode pill includes number.
- Subtitle card has colored accent line.
- Sticky nav links work.
- Intro cards open and close.
- Definition cards open and close.
- Share/copy fallback works.
- Buttondown form uses real endpoint.
- Instagram and LinkedIn URLs are approved.
- Weekly Bag, quiz, printable/cheat sheet, Try-On, cards, DJ Booth, extra credit, and community links resolve.
- Article copy is preserved.
- Episode terminology is reader-facing standard.

## Council Review

Question: Are Episodes 1-3 collectively at the LAiDIES quality bar?

Answer: **Yes, with Episode 3 pending Ali's manual approval.** The pages now feel like one Episode system rather than three unrelated articles.

Question: Is the template ready to use for Episode 4?

Answer: **Ready after Episode 3 manual approval.** Use the rules in this packet, then extract the shared system before heavy scaling.

Question: Is Episode 3 ready for Ali review?

Answer: **Yes.** Episode 3 is not blocked by basic UX or layout issues.

Question: Are there inconsistencies that must be fixed first?

Answer: **No blocker before Ali review.** There are inconsistencies that should be resolved before shared extraction: definition heading style, pull-quote roles, signoff class/component, resources panel, and exact desktop width rules.

Question: Should the next implementation pass be homepage/Season desktop recovery, shared template extraction, or Part C/backend?

Answer: **Recommended next slice after Episode 3 review: homepage/Season desktop recovery.** Ali has already flagged desktop scale frustration, and the desktop recovery audit remains unresolved. After that, extract the shared Episode template so future Episodes do not require page-local rebuilds.

## Open Questions Before Automating Future Episodes

- Should Episode 3's richer `So You Don't Pull a Cher` heading become the standard, or should Episodes 1/2's simpler version win?
- How many pull quotes should a standard Episode support by default?
- Should Episode 1 be gently widened later to match the Episode 2/3 desktop article shell, or remain untouched because Ali approved it?
- Should the resources panel sit before or after the Weekly Ritual bridge for every Episode?
- Should the template data live in Episode JSON, markdown frontmatter, or a shared Episode page builder?

## Final Recommendation

Do not call the Episode template fully stable until Ali manually approves Episode 3.

Current readiness:

**READY AFTER EPISODE 3 MANUAL APPROVAL**

Next best action:

1. Send Episode 3 to Ali for manual review.
2. If approved, move to homepage/Season desktop recovery.
3. After desktop recovery, extract the shared Episode template system before building future Episodes at scale.
