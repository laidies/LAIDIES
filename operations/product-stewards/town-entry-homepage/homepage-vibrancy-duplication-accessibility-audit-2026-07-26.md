# Homepage vibrancy, duplication & accessible-accent audit

**Date:** 2026-07-26  
**Status:** REPORT READY — read-only source and saved-frame audit; not a visual ruling, redesign, browser run, launch approval, or claim that receiving products work.  
**Owner:** Town Entry / Homepage Champion; route readiness and platform truth remain with their named owners.  
**Scope:** [`index.html`](../../../index.html) and its embedded homepage CSS; saved homepage frames; current style records. No production HTML, CSS, images, or live assets changed.

## Bottom line

Keep the homepage's lively candy rhythm, image-led town world, and distinct task entrances. The issue is not an excess of colour. It is that the same four jobs are repeatedly offered before and after their destination, while several light candy accents are used as **text** on pale backgrounds where they do not meet normal-text contrast. Make the page more decisive by assigning each job one *destination module* and treating header/hero links as shortcuts to it—not as a second explanation of it.

This does **not** select the sitewide rendering language. The standing championship still compares rendering systems with the same functional composition; the Library's separate structural competition cannot determine the homepage architecture.

## Evidence and limits

| Evidence | What it establishes | Limit |
| --- | --- | --- |
| Current [`index.html`](../../../index.html) (reviewed 2026-07-26) | Actual sections, copy, hrefs, embedded CSS and declared colours. | Current implementation is observation evidence, not product intent. |
| Saved frames: `operations/design-audits/site-episode-style-2026-07-23/01-homepage-viewport.png` and `06-homepage-later.png` | Dark image-led hero; colourful, light method panel; current visual mismatch documented in the July audit. | Screenshot evidence only; no interaction/contrast computation from pixels. |
| Saved local desktop/mobile frames: `operations/review-packets/assets/homepage-season-desktop-recovery/homepage-desktop-1440.png` and `homepage-mobile-390.png` | Earlier vibrant masthead and compact mobile rhythm. | These are older than the current DOM; used only to preserve the vibrancy concern, not to assert current layout. |
| `operations/design-audits/site-episode-style-2026-07-23/REPORT.md` and `operations/sitewide-style-championship-2026-07-26.md` | Style is unresolved; style competition is rendering-only. | Neither authorises a homepage redesign. |
| `CHARTER.md`, `OPERATING-SPEC.md`, and `launch-deep-dive-2026-07-25.md` | Practical AI first, town second; owner still decides primary hierarchy. | Existing specs contain observations/decisions to reconcile in the required Experience Brief. |

No fresh browser capture was attempted in this read-only audit. The evidence above is saved local/screenshot evidence, **not** a current rendered-browser, device, accessibility, or public-origin pass.

## Keep the vibrancy: visual diagnosis

The current page gets its energy from four good ingredients:

1. a dark, cinematic first panel against warm, pastel floating sections;
2. a rotating pink / teal / coral / periwinkle / tangerine / sky action rhythm;
3. real town, character and object imagery rather than generic SaaS decoration; and
4. a useful alternation between story, practical utility and exploration.

Do not flatten this into one muted colour or remove all repeated affordances. Preserve colour as a **section/object cue**. Reduce repetition in copy, routes and competing action hierarchy instead.

The saved July visual audit already flags a separate unresolved problem: the dark painterly hero, stained-glass portrait, painterly environment, and graphic-novel episode art currently read as more than one visual register. That is a style-championship question, not a reason to make the homepage structurally resemble any Library candidate.

## Exact duplication and recommended hierarchy

“Duplicate” below means the same user job/message is re-explained or offered in more than one module. Header anchors that take a visitor to the single destination module are deliberately retained as shortcuts.

| User job / message | Current exact locations and actions | Read | Keep / merge / remove hierarchy |
| --- | --- | --- | --- |
| **First orientation** | Hero `New in town?` → `#method`; method links `Listen to the trailer at the Visitors Centre`; weekly card says `New to LAiDIES?` then `Start at the Visitors Centre`; hero lede says `Welcome ... SUNNYVAiLE`; town section says `Guided first. Explorable always.` | The same newcomer is asked to understand the method, start a trailer and explore town in four places. Hero's first action does not take her to the stated first experience. | **Keep:** one hero newcomer action, labelled by the real next scene (e.g. `Start with the trailer`) and routed to the Centre. **Merge:** weekly-card newcomer copy to one brief return cue that points to the same route. **Keep, lower:** method explanation after the first action. **Remove:** no destination; do not keep `#method` as the primary newcomer endpoint unless Ali explicitly decides comprehension precedes the trailer. |
| **Latest / weekly learning** | Header `Latest Episode`; hero `The latest episode`; intent card `Take the Wednesday tour`; weekly title, episode card, eight-stop `Full Route`, `Express Route`, and two `Read/Listen Episode 04` buttons. | A real weekly hub is valuable, but the destination has three competing starting points plus repeated episode actions. | **Keep:** weekly section as the canonical weekly module; one primary episode action and Full/Express choice. **Merge:** header and hero to its anchor. **Remove/relocate:** duplicate `Read Episode 04` / `Listen to Episode 04` pairs if the card presents the same completion choice. Keep the small music icon only if it is an intentional audio affordance, not a third episode start. |
| **One useful thing / prompt help** | Hero `Just running an errand?` → `#today`; intent `Fix a prompt or get guidance` → `#help`; activity card `FAiRY Godmother` with `Try the drafting preview`. | This is a good funnel: job → specific tool. The wording duplicates a little, but the levels differ. | **Keep:** hero as a broad route and the FAiRY card as the concrete action. **Merge:** make the intent card the sole explanatory bridge; hero uses shorter task language. Do not add another prompt-help explainer. |
| **Reference lookup** | Header `Look it up`; intent `Look something up`; reference panel `Miss Jeeves will help you look it up` plus popular-term buttons. | Intent card and reference module repeat the same promise, but the header is a helpful shortcut. | **Keep:** header and intent card as shortcuts; **keep:** reference as the only explanatory/action module. **Merge:** shorten the intent card description so it does not repeat the entire service promise. |
| **Town exploration** | Header and hero both `Explore ...`; intent card `Explore the town`; town section's map with 17 hotspots, six district cards, and an expanded directory/index. | The page offers three pre-town entries, then three parallel town browsers. The six “district” cards link to individual buildings, so they do not behave as districts. | **Keep:** map as the canonical spatial browser; header/hero/intent only anchor to it. **Merge:** district cards into map-led district filters or a compact visual strip whose labels and destinations truly match districts. **Remove/hide by default:** the long directory/index if map hotspots and filtered districts already expose the same 17 destinations; retain it only as a clearly labelled accessible directory. |
| **Membership / saving / Closet** | Header `Join the town`; method step 5 `Join the town`; Closet `Resident Card`, `Closet`, local-persistence caveat and two resident actions. | The method gives a long account/community explanation before the definitive Card/Closet module; platform truth remains unresolved. | **Keep:** Closet as authoritative explanation and only a guarded `Make my Resident Card` outcome. **Merge:** method step 5 to one sentence + anchor. **Retain, but label:** device-local and external-service conditions exactly until platform owner proves account restoration/community. |
| **KSVL / music** | Method `Hear the town anthem`; step 4 `Listen to KSVL`; weekly route stop 4 + `Hear the Wednesday theme`; KSVL spotlight. | Music is contextual in the weekly route and substantial enough for a feature panel, but the method adds a third promotional call. | **Keep:** route stop and KSVL spotlight. **Merge/remove:** method's extra anthem chip; its teaching sentence can link from step 4. |
| **Why LAiDIES / women in AI** | Hero `Girl Power meets Machine Power`; method/Why card; LUMINAiRY spotlight; footer repeats `Girl power meets machine power` and `AI is shaping now`. | This is an intentional brand refrain, but the method card is a large detour inside an already long explanation. | **Keep:** hero promise, LUMINAiRY depth, compact footer refrain. **Merge:** Why-card to a concise mission bridge with one LUMINAiRY link; do not repeat the entire mission inside the method. |
| **Newsletter** | Only the bottom `Wednesday Postcard` form and explicit non-silent-subscription copy. | Not duplicate. It is correctly one optional, distinct lifecycle. | **Keep** as one module. Provider confirmation/error/duplicate proof remains an external-service gap. |

### Proposed resulting order (bounded visual pass)

1. Hero: promise + exactly three task entrances: newcomer/trailer, current learning, one useful thing. `Explore` remains a quieter utility link or header shortcut.
2. Method: compact “why/how” proof, then the canonical four-step learning model; mission handoff is one LUMINAiRY link.
3. Purpose chooser: lookup, prompt help, optional town exploration—not a second weekly/newcomer start.
4. Weekly hub: episode + Full/Express route; no repeated episode buttons elsewhere.
5. Activities and KSVL/LUMINAiRY spotlights.
6. Reference desk.
7. Town map + accessible directory (district controls only if they are real district navigation).
8. Card/Closet explanation, then the one optional Postcard signup.

This is a hierarchy recommendation, not a replacement operating spec. The Experience Brief provenance gate must reconcile newcomer promise, primary path, content inventory and each destination's readiness before an implementation candidate can win.

## Accent system: current colours, actual backgrounds, and safer tokens

Contrast values below are WCAG relative-luminance ratios calculated from the declared sRGB hex values. `4.5:1` is the normal-text AA threshold and `3:1` is the large-text/UI-component threshold. Gradients, transparency, images and anti-aliasing need rendered-state checks; a value against a gradient endpoint is not a blanket pass.

| Role / current declaration | Actual current usage/background | Current ratio | Direction | Candidate semantic token | Candidate ratio | Rule |
| --- | --- | ---: | --- | --- | ---: | --- |
| Candy pink `#e982ab` | `Ai` / hero emphasis and CTA fills; cream `#fffdfb`; dark hero `#1c0f1c` | 2.51 on cream; 7.27 on dark | Preserve as a **fill/on-dark glow**, not pale-background text. | `--accent-pink-ink: #b2185b` | 6.52 on cream | Use the ink token for text, borders and focus-visible rings on light panels; retain current pink for filled buttons with plum text. |
| Coral `#ec7a78` | Buttons and small labels; cream and dark/purple areas | 2.72 on cream; 6.72 on dark | Current fill + plum text is workable; coral text on light is not. | `--accent-coral-ink: #b23a48` | 5.76 on cream | Use ink version for links/eyebrows on light; current coral remains an object fill with `#3a1838` text. |
| Teal `#57b6c0` | Eyebrows, borders, number chips; cream and dark hero | 2.34 on cream; 7.81 on dark | Largest recurring accessibility risk: teal is used as light-background text. | `--accent-teal-ink: #087f8c` | 4.68 on cream | Use for text/borders/focus rings on light. Current teal remains a fill with plum text, or an on-dark accent. |
| Periwinkle `#b3abe7` / lavender `#cabbe8` | Hero taglines, route labels, buttons; cream and dark sections | 2.09 / 1.76 on cream; 8.72 / 10.39 on dark | Strong on dark, unsuitable as light-background text. | `--accent-lilac-ink: #6750a4` | 6.35 on cream | Keep light lilac for fills/on-dark labels; use ink lilac only where text must sit on light. |
| Tangerine `#f4a636`, gold `#f6c04a`, lemon `#fff25c` | Button fills, step chips and decorative highlights | 2.00 / 1.93 / 1.14 on cream; plum text on tangerine is 6.43 | These are not text colours on light. | `--accent-amber-ink: #996b00` | 4.64 on cream | Keep bright amber/lemon as fill/highlight only with plum ink. Use amber-ink for a text-only status if needed. |
| Sky `#8bbde9` | Closet links, route chips; cream and dark | 1.96 on cream; 9.30 on dark | Decoration/fill or dark-only text. | Reuse `--accent-teal-ink` for light-background action text | 4.68 on cream | Avoid a separate pale-blue text token until a style ruling defines it. |
| Plum `#4b2148` / deep plum `#3a1838` | Primary UI and body/display ink on cream | 12.85 / 15.13 on cream | Already excellent accessible anchor. | `--ink: #3a1838`; `--action-primary: #4b2148` | 15.13 / 12.85 on cream | Keep as the compositional stabiliser beneath candy accents. |

### Token contract for a future isolated CSS pass

```css
/* Candidate names only — not implemented by this audit */
--ink: #3a1838;
--surface-cream: #fffdfb;
--accent-pink-fill: #e982ab;
--accent-pink-ink: #b2185b;
--accent-coral-fill: #ec7a78;
--accent-coral-ink: #b23a48;
--accent-teal-fill: #57b6c0;
--accent-teal-ink: #087f8c;
--accent-lilac-fill: #b3abe7;
--accent-lilac-ink: #6750a4;
--accent-amber-fill: #f4a636;
--accent-amber-ink: #996b00;
```

The practical rule is simple: **light candy is a fill, dark candy is text**. Colour continues to carry delight and section identity; text legibility no longer depends on it.

## Bounded visual pass plan

1. **Intent and readiness gate (owner-bound):** author/reconcile Town Entry `EXPERIENCE-BRIEF.md`; mark every governing line with required provenance. Resolve only the newcomer primary action and map/district/directory role before design. Confirm promoted receiving routes against the readiness manifest.
2. **Content hierarchy candidate (page-local):** produce one wire/content pass using the hierarchy above. Preserve functional geometry during the sitewide style competition; do not import any Library layout.
3. **Accent-token candidate (isolated stylesheet):** introduce semantic fill/ink tokens and replace only pale-background text/border/focus uses. Do not broadly rewrite global `styles.css`, which contains mixed historical work.
4. **Evidence gate:** fresh 1440 and 390 rendered captures; keyboard/focus-visible pass; contrast checks in rendered gradients/image overlays; new/returning comprehension test; destination readiness proof. Test the real Buttondown lifecycle separately and do not treat an embed submission as a subscription.
5. **Owner review:** Ali chooses the primary hierarchy and later the sitewide rendering system. Brand Director rules system fit; Functionality & Platform Director verifies destination/platform contracts. No homepage visual winner implies building or Library structure authority.

## Launch classification

| Item | Class | Owner / proof needed |
| --- | --- | --- |
| Light candy text/border uses without a dark semantic variant | **FIX BEFORE LAUNCH** if used to convey action/state; otherwise repair in the isolated visual pass before promotion. | Brand + accessibility; rendered contrast and keyboard focus proof. |
| Repeated newcomer/weekly/town routes that send visitors to unready destinations | **HIDE/LABEL FOR LAUNCH** until entry-route readiness manifest proves each promoted handoff. | Town Entry + receiving building owner + Platform Director. |
| Homepage newcomer primary path, exact density, The Breaking/The Daily placement | **OWNER DECISION** after Experience Brief reconciliation and clean-user evidence. | Ali / Brand Director; evidence-backed candidate. |
| Sitewide rendering language and any image migration | **OWNER DECISION** under the separate A/B/C style championship. | Ali / Brand Director; same-geometry comparison. |
| Map/district/directory consolidation, KSVL/method merge, headline/copy shortening | **POST-LAUNCH** unless it is needed to avoid a false route promise. | Town Entry owner; measured comprehension and route-choice evidence. |

## Next trigger

Run this audit's implementation cycle only when the Town Entry Experience Brief names an approved primary newcomer outcome and the platform/readiness manifest can truthfully classify promoted destinations. Before then, this document is a durable design and accessibility handoff—not authority to alter the homepage.

## Learning scan

No new painpoint entry: this audit applied existing prevention rules that observed implementation and local evidence cannot establish product intent, public readiness or a complete downstream outcome. Reusable control reinforced: measure contrast against the element's real background and distinguish a colourful decorative token from an accessible text token.
