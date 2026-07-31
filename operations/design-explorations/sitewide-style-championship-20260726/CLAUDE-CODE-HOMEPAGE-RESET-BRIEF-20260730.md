# Claude Code brief — LAiDIES Homepage reset

Copy this entire brief into Claude Code. Work from this repository root:

`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES`

## Your role and objective

You are redesigning the LAiDIES / SUNNYVAiLE Homepage as a new isolated candidate. This is not a request to keep rearranging the current Cycle 9 markup. The recent reorganization attempts became confusing, repetitive and visibly broken.

**Your implementation baseline is the last frozen Homepage from before those reorganization attempts:**

`Website-homepage/operations/design-explorations/sitewide-style-championship-20260726/cycle-9/incumbent-daily-pager/evidence/hero-arrival-session-v1/review-tuple/source/`

Use its `index.html`, `candidate.css` and `preview.js` as the recoverable pre-reorganization page. Do not use the currently served Cycle 9 `index.html`, `candidate.css` or `preview.js` as the Homepage source. They are later rejected work.

The only later work that may be recovered is the explicitly approved once-per-session VHS/static-line masthead transition described below. Recover that interaction surgically; do not inherit the later page composition around it.

Start with the frozen pre-reorganization page, governing product structure, approved visual language and approved assets, then compose a coherent full page.

The result must be:

- unmistakably LAiDIES and rooted in the Rewind Era;
- colourful, energetic, witty and inviting;
- useful and immediately understandable to both first-time and returning visitors;
- image-rich without becoming chaotic;
- direct: important destinations must not be buried behind multiple layers;
- responsive at every width, without clipped text, dead fields, arbitrary blank space or excessive scrolling;
- a designed experience, not a grid of boxes, a generic dashboard or an editorial magazine page.

The original/current Homepage remains the protected visual incumbent. A new candidate only succeeds if it is materially better. Do not call a technically valid page a visual success.

## Hard scope

Build in a new isolated directory:

`Website-homepage/operations/design-explorations/sitewide-style-championship-20260726/claude-homepage-recomposition-20260730/`

Do not edit, replace, deploy or publish:

- `Website-homepage/index.html`
- shared production CSS or JavaScript
- public/live state
- the existing Cycle 9 candidate

You may copy source material into the isolated directory. Preserve route and content truth. Return a local candidate for Ali’s visual/product ruling; do not imply approval.

Before writing implementation code, create:

1. `IA-MAP.md` — the page hierarchy, purpose of every section, and destination of every control.
2. `ASSET-REGISTER.md` — every image/video path, its job, approval state, and why it is appropriate.
3. `DESIGN-PLAN.md` — composition, responsive behaviour, typography, colour system, reusable components and explicit anti-pattern checks.

If an asset is not proven appropriate, mark it `ASSET REQUIRED`. Do not insert a random substitute.

## Read these files first

### Product and operating truth

- [`Website-homepage/operations/CODEX-WORKING-AGREEMENT.md`](../../CODEX-WORKING-AGREEMENT.md)
- [`Website-homepage/operations/ACTIVE-WORK.md`](../../ACTIVE-WORK.md)
- [`Website-homepage/operations/engine/LEDGER.md`](../../engine/LEDGER.md)
- [`Website-homepage/operations/product-stewards/town-entry-homepage/CHARTER.md`](../../product-stewards/town-entry-homepage/CHARTER.md)
- [`Website-homepage/operations/product-stewards/town-entry-homepage/EXPERIENCE-BRIEF.md`](../../product-stewards/town-entry-homepage/EXPERIENCE-BRIEF.md)
- [`Website-homepage/operations/product-stewards/town-entry-homepage/OPERATING-SPEC.md`](../../product-stewards/town-entry-homepage/OPERATING-SPEC.md)
- [`Website-homepage/operations/product-stewards/town-entry-homepage/state.json`](../../product-stewards/town-entry-homepage/state.json)
- [`Website-homepage/operations/product-stewards/town-entry-homepage/backlog.md`](../../product-stewards/town-entry-homepage/backlog.md)

### Incumbent and implementation baseline

- [`Website-homepage/index.html`](../../../index.html)
- [`Website-homepage/styles.css`](../../../styles.css)
- [`Frozen pre-reorganization index.html`](cycle-9/incumbent-daily-pager/evidence/hero-arrival-session-v1/review-tuple/source/index.html)
- [`Frozen pre-reorganization candidate.css`](cycle-9/incumbent-daily-pager/evidence/hero-arrival-session-v1/review-tuple/source/candidate.css)
- [`Frozen pre-reorganization preview.js`](cycle-9/incumbent-daily-pager/evidence/hero-arrival-session-v1/review-tuple/source/preview.js)
- [`Frozen tuple manifest`](cycle-9/incumbent-daily-pager/evidence/hero-arrival-session-v1/review-tuple/MANIFEST.json)
- [`Cycle 9 README`](cycle-9/incumbent-daily-pager/README.md)

The three frozen `review-tuple/source/` files are the working baseline. Use the currently served Cycle 9 files only to inspect failures or surgically recover the finalized arrival transition. Do not inherit their later IA, wording, component hierarchy, layout or styling.

### Visual references and prior corrections

- [`Incumbent desktop top`](cycle-9/incumbent-daily-pager/evidence/final/homepage-incumbent-desktop-top.png)
- [`Incumbent mobile top`](cycle-9/incumbent-daily-pager/evidence/final/homepage-incumbent-mobile-top.png)
- [`Incumbent/candidate desktop comparison`](cycle-9/incumbent-daily-pager/evidence/final/comparison-desktop-incumbent-left-candidate-right.png)
- [`Incumbent/candidate mobile comparison`](cycle-9/incumbent-daily-pager/evidence/final/comparison-mobile-incumbent-left-candidate-right.png)
- [`Image crop audit`](cycle-9/incumbent-daily-pager/IMAGE-CROP-AUDIT.md)
- [`Masthead aspect-ratio restoration`](cycle-9/incumbent-daily-pager/MASTHEAD-ASPECT-RATIO-RESTORATION-2026-07-29.md)
- [`Ada portrait restoration`](cycle-9/incumbent-daily-pager/ADA-PORTRAIT-RESTORATION-2026-07-29.md)
- [`Cheat Sheet gradient transfer`](cycle-9/incumbent-daily-pager/CHEAT-SHEET-GRADIENT-TRANSFER-2026-07-29.md)

Treat previous audit claims as leads, not proof. Inspect the actual files and render the actual page.

The current localhost page and the late Cycle 9 screenshots showing the four-bucket reorganization are **rejected failure evidence**, not design references. Do not imitate them.

### Functionality truth

- [`Visitor functionality gap and execution plan`](cycle-9/incumbent-daily-pager/VISITOR-FUNCTIONALITY-GAP-AND-EXECUTION-PLAN-2026-07-30.md)
- [`Visitor functionality reconciliation`](cycle-9/incumbent-daily-pager/VISITOR-FUNCTIONALITY-RECONCILIATION-2026-07-30.md)
- [`Resident continuation evidence`](../../product-stewards/resident-card/resident-continuation-v1-2026-07-29.md)
- [`Live account cross-browser verification`](../../product-stewards/resident-card/live-account-cross-browser-verification-2026-07-27.md)
- [`Resident continuation integration packet`](../../product-stewards/resident-card/staging-harness-2026-07-30/RESIDENT-CONTINUATION-INTEGRATION-PACKET.md)

Do not claim that account-aware, messaging or community behaviour is operational merely because a route or backend projection exists.

## Controlling information architecture

The page has four clear visitor-facing areas. Each must look and behave like a distinct, intentional part of one coherent Homepage.

### 1. What’s happening around town

This is the current-information area. It should immediately answer “What is happening today, and what is new for me?”

It contains:

- the Daily Buzz / daily newspaper;
- “What’s new since your last visit”;
- the current Wednesday Tour and latest released episode.

Preserve the Daily Buzz as a right-side column on desktop under the masthead. On mobile, place it in a deliberate position in the reading order; do not squeeze it beside the main content or let it become an endless disconnected stack.

The Daily Buzz must show useful information directly, not just a row of links. Its developing newspaper concept may include:

- breaking AI news;
- daily news/explanation;
- Mme CLAi-O’s reading;
- Promptoscope, the complete funny AI horoscope;
- Paige’s daily tip;
- song of the day;
- “Did You Know?”;
- funny town weather and town gossip;
- future classifieds.

Each item may have a small, quiet link to the appropriate underlying page. Do not make the user click merely to see the daily information.

Use honest state:

- signed-in returning visitor: show a small, relevant set of changes since their last supported visit;
- signed-out returning visitor: explain that signing in is needed to restore account history;
- first visit: show a concise orientation, not an empty or enormous “nothing new” area.

Do not show a giant backlog if someone has been away for a long time.

### 2. Activities & destinations

This is the working title. You may propose one punchier, clear LAiDIES title, but it must not be a question if the other section titles are statements.

Give direct access to:

- Read the news
- Take a class
- Look something up
- Watch the latest episode
- Listen to KSVL
- Do an activity
- Connect with the community
- Explore the town
- Open My Closet

These are not nine unrelated, multicoloured boxes. Design one strong, coherent navigation experience that uses space well and makes the choices scan quickly. Important destinations must be one click away.

The latest episode must resolve from the latest released episode rather than being hard-wired to Episode 04.

The town layout and what every building offers must be discoverable from here or from a clearly related town-orientation element. Do not duplicate every building throughout the page.

### 3. How LAiDIES works & why it matters

This must preserve the useful method content that was lost in recent attempts. It is not a slogan panel and not a dry corporate explainer.

Create one cohesive, visually engaging sequence that explains:

- how the LAiDIES learning system works;
- how story, Rewind Era analogy, practical Try-Ons, quizzes/cards and original music reinforce one lesson;
- why LAiDIES exists;
- how women shaped computing and AI’s past;
- how women are shaping AI’s future now;
- why it matters that women learn, use and form opinions about AI;
- the invitation to join LAiDIES.

Use approved imagery, including Ada Lovelace where appropriate. Do not turn Ada into a narrow, over-tall side column beside oversized text. Use balanced subject scale and a composition that reads intentionally at desktop and mobile.

Do not repeat the LUMINAiRY in multiple places. Give each message one home.

### 4. Move to SUNNYVAiLE

Explain, in one coherent sequence:

- what joining the town means;
- how to make a Resident Card;
- what the Resident Card unlocks;
- how supported progress and collections can live in My Closet;
- what charms, Puffies, stickers, trading cards and other supported objects are;
- how to sign in or join;
- how to receive the Wednesday Postcard.

The intended subscription behaviour is:

- when someone makes a Resident Card, “Send me the Wednesday Postcard” is selected by default;
- they may untick it to opt out;
- a visitor who does not want a Resident Card may request the Postcard separately.

Do not say that a Resident Card never subscribes someone or requires a second signup.

Do not create a small image floating in a large decorative column beside a full-height column of text. Compose image and text as one intentional stage.

## Masthead and arrival sequence

The masthead must remain full width.

Preserve the current approved once-per-browser-tab-session arrival sequence from the Cycle 9 `preview.js` and `.hero-arrival*` CSS. Do not replace or regress it.

Its required behaviour is:

1. a brief VHS-style white static line;
2. the LAiDIES ident expands from that line;
3. the approved master animation plays muted;
4. a second brief static line;
5. the regular full-width masthead is revealed;
6. it runs once per browser-tab session, not every time the user navigates back;
7. it includes Skip;
8. reduced-motion users bypass motion to a stable static masthead;
9. no autoplay audio;
10. no geometry jump, crop, blurred letterbox bands or late-loading masthead text.

Approved master:

- `Website-homepage/operations/design-explorations/laidies-motion-ident-20260725/continuous-i-evergreen-six-clean-electric-v10.mp4`
- poster: `Website-homepage/operations/design-explorations/laidies-motion-ident-20260725/continuous-i-evergreen-six-clean-electric-v10-still.png`
- mapping: `Website-homepage/operations/design-explorations/laidies-motion-ident-20260725/canonical-logo-animation-family-20260730.json`

The masthead must contain four equal, clear destinations:

1. What’s happening in town
2. Go directly to an activity
3. Learn how LAiDIES works
4. Move to SUNNYVAiLE

It must also have a highly visible, separate account action:

- signed out: **Sign in**
- signed in: **My Closet** or the resident’s name/avatar
- **Join the town** remains a separate new-resident action

Never lay the masthead controls out as three on one row and one orphan below. Never allow them to cover masthead copy. At narrower widths use a deliberate 2×2 arrangement or a full-width stack.

The masthead copy needs a better succinct explanation. Draft and test copy that establishes:

- SUNNYVAiLE is a learning town where it is “almost sometime in 1999,” not “always almost 1999”;
- the Rewind Era is the pop-culture period from roughly 1990–2010;
- the familiar references are used to help people understand and use AI;
- AI is what comes next;
- the tone is catchy, intelligent and memorable, not flat corporate copy.

Do not finalize replacement copy without showing it in the rendered masthead.

## Visual system

### Overall character

Preserve the protected incumbent’s light, colourful, inviting gradient character. The new page must feel like the LAiDIES Rewind Era world: adult, witty, feminine, smart, playful and specific.

It must not become:

- a dark page or neon-on-black concept;
- an editorial or magazine layout;
- a sparse page with large white fields;
- a generic SaaS dashboard;
- a hodgepodge of boxes inside boxes;
- a grid in which every item has a different colour, border, height and shadow;
- generic Y2K kitsch;
- a wholesale redesign of the brand.

Use full-bleed colour fields, image-led sections, bands, rails, staged sequences and purposeful asymmetry where useful. The composition should breathe, but “breathing room” must not become unexplained dead space.

### Typography

Use the established fonts:

- Archivo for major display headings;
- Jost for body copy and practical UI.

Keep heading scale controlled. No heading should become a narrow tower of one- or two-word lines. Eyebrows must be readable and use one colour, not several internal accent colours.

### Colour

Deep plum is for text and selected outlines only. **Never use solid plum as a background.**

Use the established LAiDIES colour families in brighter, more electric 1990s hues—not candy/pastel versions:

- electric teal: `#19d3d1` (match the COMMUNITY RADIO sign);
- hot pink family: `#ef4d9c`;
- electric purple family: `#744fc0` / `#6c7cd1`;
- coral family: `#ff6b61`;
- sunshine yellow: `#f7d45c`;
- text plum: preserve the incumbent deep plum.

Reusable gradient families:

```css
/* Pink → purple → blue */
linear-gradient(145deg, #ef4d9c, #b75cc4 58%, #6c7cd1);

/* Cyan → purple → pink */
linear-gradient(115deg, #68cfe1, #b28fe3 47%, #ef68aa);

/* Pink → yellow → cyan */
linear-gradient(120deg, #ef5ca6, #f7d45c 49%, #69cce0);

/* Soft page gradient */
linear-gradient(145deg, #ecd8f2 0%, #d9e9fb 47%, #f1cfe8 100%);

/* Layered page glow */
radial-gradient(circle at 8% 5%, rgba(255, 228, 90, .68), transparent 19rem),
radial-gradient(circle at 92% 12%, rgba(238, 63, 151, .28), transparent 25rem),
radial-gradient(circle at 82% 95%, rgba(49, 114, 223, .26), transparent 30rem),
linear-gradient(135deg, #ecd9f3 0%, #d9e8fb 51%, #efcce9 100%);
```

Source reference:

- [`Study Pack styles`](../study-pack-storefront-20260728/prototype/src/styles.css)

Pink must not drift red. Purple should be energetic rather than dusty. Coral must not become plain orange. Teal accents and text must be as vibrant as the teal controls.

Brand-word accents are not a licence to colour letters throughout the page. Use the special `Ai` treatment only where it reads clearly and adds value. In long body copy, small labels and eyebrows, use one readable colour.

## Asset rules — non-negotiable

Build `ASSET-REGISTER.md` before implementation. Inspect every image at original resolution and in its intended slot.

### Approved named assets

- Fairy Godmother character:
  `Website-homepage/assets/video/delivery-20260714-opening-v6/shots/opening-08-fairy-godmother-clean-lit-v2.png`
- Miss Jeeves at her modern library desk:
  `Website-homepage/assets/library/jeeves-desk.png`
- Delta LAi Nu:
  `Website-homepage/assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/web/10-delta-lai-nu-house-rethink-v1.jpg`
- FAiRY Godmother’s planted Willow Lane house:
  `Website-homepage/assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/regular/11-fairy-godmother-house-enchanted-garden-crisp-roof-v6.png`

Miss Jeeves may appear only in the LIBRAiRY context. Do not place her in unrelated Homepage modules.

### Explicitly rejected asset — never use

**Do not use this file anywhere:**

`Website-homepage/assets/postcards/from-sunnyvaile/greetings-from-sunnyvaile-post-card.png`

It was explicitly rejected by Ali because the visible word is misspelled as **“SUNNYYVAiLE”** with two Ys. An older correction document may call it approved; Ali’s current decision overrides that record.

Also reject:

- pixelated/low-resolution Miss Jeeves images;
- older or blurry Delta LAi Nu images;
- alternate Fairy Godmother characters or houses that are not the named approved files;
- retired drink-picker artwork;
- images that mix painterly character art with the locked adult comic/graphic-novel style;
- any generated text image with a visible spelling error.

### Placement and crop

- Do not apply blanket `object-fit: cover`.
- Match each image stage to the source aspect ratio and focal subject.
- Do not cut off faces, important objects, signs, buildings or labels.
- Do not create letterbox dead bands, giant blank backgrounds or small images floating in oversized columns.
- Do not place an environmental wide shot beside an extreme face close-up as if they have equal visual scale.
- Make the relationship between every title and image unmistakable.
- If no approved asset fits, mark `ASSET REQUIRED` and create/request a correctly composed asset. Do not swap in an old rejected image.

## News and Daily Buzz truth

- The Promptoscope is the complete funny AI horoscope. Do not label its small link “Pull a reading” or point to Mme CLAi-O’s hard-reading experience as though that generates the horoscope.
- A song-of-the-day item must use a real available song and offer a genuine Listen action. “Be Kind, Rewind” is not an existing LAiDIES song.
- News artwork should let readers identify the provider or theme. Inspect:
  - `cycle-9/incumbent-daily-pager/artwork/providers/`
  - `cycle-9/incumbent-daily-pager/artwork/themes/`
- Use plain language for less technical readers.
- Do not expose internal terms such as “creator-confirmed catalogue,” “source owner,” “hold,” “frozen tuple,” “candidate,” or “working draft preview.”

## Functionality and honesty

Identity and Closet are **PARTIAL PASS / ACCOUNT-ENTRY HOLD**, not absent and not completely launch-proven.

Existing evidence supports:

- real Supabase RLS/account isolation;
- account-backed Resident Card/continuation restoration;
- allowlisted cross-device continuation;
- account switching that clears/restores the correct account’s state.

Not yet launch-proven:

- actual magic-link delivery and recovery;
- the public UI sign-out path;
- a Closet-native add/remove control propagating across browser contexts;
- complete instant/group messaging.

Do not claim that messaging, “new since your last visit,” Closet mutation or cross-device account entry is complete unless the referenced implementation and end-to-end proof support it. It is acceptable for the isolated design candidate to show clearly labelled realistic states, but identify unproved plumbing in `FUNCTIONALITY-GAPS.md`.

Inspect actual routes and runtime before deciding where community messages appear. If instant messaging was only proposed or prototyped, say so and design its future entry point without presenting it as live.

Support visitors at different skill levels. The page should not imply all learning is beginner-only. Make it possible to discover:

- orientation/basic concepts;
- practical current tools;
- structured classes;
- deeper NewsStand analysis and LIBRAiRY references;
- advanced or role-specific learning when available.

Do not invent published courses or advanced tools that do not exist.

## Global header

Review the global header and remove overlap with masthead controls. Every item must have a distinct visitor expectation.

Likely destinations to validate:

- Latest episode → dynamically latest released episode;
- Start learning → trailer or the clearest explanation of how SUNNYVAiLE/LAiDIES learning works;
- Look it up → LIBRAiRY;
- Activities;
- Explore SUNNYVAiLE;
- KSVL 99.9;
- Sign in / My Closet;
- Join the town.

Keep styles consistent. Do not mix plain links, outlined pills and solid buttons without a meaningful hierarchy. Do not crowd the logo or produce arbitrary one-line/two-line labels.

## Responsive and accessibility gates

Design and verify at:

- 1440 px
- 1280 px
- 1000 px
- 900 px
- 768 px
- 390 px
- 320 px

Required:

- no horizontal overflow;
- no clipped headings, inputs, controls or images;
- no text/image overlap;
- no unexplained blank fields;
- no mobile-only excessive scrolling caused by empty layout tracks;
- equal control sizes within a specific group;
- clear focus styles and keyboard navigation;
- semantic heading structure;
- meaningful alt text;
- reduced-motion behaviour;
- minimum 4.5:1 text contrast unless a larger-text exception is deliberately documented.

At every viewport, use the available width intentionally. Do not merely shrink desktop columns until they break.

## Working method and acceptance

1. Read and inventory before editing.
2. Create the IA, asset register and design plan.
3. Identify duplication and assign every message/destination one primary home.
4. Build the complete isolated page, including real interactions for the core Homepage navigation.
5. Render continuous full-page captures, not only section crops:
   - desktop 1440 or 1280;
   - intermediate 1000 or 900;
   - mobile 390;
   - narrow mobile 320.
6. Also capture the masthead arrival, mid-transition and stable post-transition states.
7. Compare the candidate beside the exact incumbent at matched viewport/state.
8. Conduct a senior visual QA pass and self-reject before showing Ali if any of these remain:
   - boxes inside boxes;
   - inconsistent card sizes;
   - three controls on one row and one orphaned control;
   - overlapping text;
   - bad crops;
   - unapproved images;
   - excessive blank space;
   - duplicated destinations;
   - unclear section boundaries;
   - internal language;
   - unresolved responsive failures.
9. Do not ask Ali to find obvious visual defects.
10. Return:
    - the local preview;
    - exact changed files;
    - IA summary;
    - asset register;
    - full-page captures;
    - known functionality gaps;
    - a precise comparison explaining why the candidate is better than the incumbent.

Success is not “the HTML renders.” Success is a coherent, beautiful, unmistakably LAiDIES Homepage that a new visitor understands immediately and a returning visitor can use without frustration.
