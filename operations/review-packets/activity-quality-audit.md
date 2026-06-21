# Part B Activity Quality Audit

Date: 2026-06-21

Status: AUDIT ONLY. No implementation, staging, commit, or push was performed.

Quality reference: Mme CLAi-O, FAiRY GODMOTHER, and LAiDY. The bar is not "works"; the bar is useful, clear in 10 seconds, mobile-first, visually immersive, polished, fun but not childish, and honest about what is saved or generated.

## Files Inspected

- `games/madame-claio.html`
- `games/fairy-godmother.html`
- `games/dream-phone.html`
- `games/girl-talk.html`
- `games/dj-booth.html`
- `games/fun-pack.html`
- `games/trading-cards.html`
- `games/businesswomens-special.html`
- `learn/quiz.html`
- `try-on.html`
- `printable.html`
- `laidies-card.html`
- `clubhouse-pass.html`
- `clubhouse.html`
- `this-week.html`
- `script.js`
- `content/site/site-data.js`
- `content/site/quizzes.json`
- `operations/review-packets/laidies-council-quality-gate.md`
- `operations/review-packets/ask-laidy-input-audit.md`
- `operations/review-packets/character-card-system-audit.md`
- `operations/review-packets/dream-phone-rejection-summary.md`
- `operations/review-packets/dream-phone-rethink/dream-phone-recommendation.md`
- `operations/review-packets/interactive-world-objects-system.md`
- `operations/review-packets/season-study-sheet-and-study-pack-architecture.md`

## Council Summary

| Activity / surface | Main path | Purpose clarity | Visual quality | Mobile UX | Desktop UX | Logic quality | Council result | Recommended next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mme CLAi-O | `games/madame-claio.html` | Clear | Reference-quality | Strong | Strong | Strong rules/random deck | PASS FOR ALI REVIEW | Keep as benchmark; only do minor transparency/reduced-motion polish later. |
| FAiRY GODMOTHER / Ask LAiDY | `games/fairy-godmother.html` | Mostly clear | Reference-quality shell | Good shell, weak output structure | Good shell, weak output structure | Reads input and energy, but coaching is shallow | REVISE INTERNALLY - DO NOT SEND TO ALI | First implementation slice: upgrade rules-based prompt coaching. |
| Dream Phone | `games/dream-phone.html`, `script.js` | Not clear enough | Below bar | Confusing and dense | Unresolved | Product model rejected/parked | REJECT / PARK | Do not restart. Needs new concept and production asset approval. |
| Girl Talk | `games/girl-talk.html` | Partly clear | Nice image, simple tool | Simple, but thin | Simple, but thin | Random card draw only | REVISE INTERNALLY - DO NOT SEND TO ALI | Define the job: question deck, room prompt, or confidence tool; then polish object interaction. |
| DJ Booth | `games/dj-booth.html` | Clear | Functional, not immersive enough | Usable, but controls feel generic | Usable, but visually light | Audio player works; duplicate return-link injection exists | REVISE INTERNALLY - DO NOT SEND TO ALI | Fix duplicate return helper and redesign around a stronger music object. |
| THE EXTRA CREDIT | `games/fun-pack.html` | Partly clear | Generic card grid | Scannable but not magical | Scannable but not magical | Routes four activities, includes parked Dream Phone | REVISE INTERNALLY - DO NOT SEND TO ALI | Clarify as a curated bonus shelf and remove/park Dream Phone until approved. |
| Trading Cards | `games/trading-cards.html` | Clear enough | Playful, but not premium enough | Cards are usable, density needs review | Collection works, still web-game-ish | Local collection, duplicates, pack filter | REVISE INTERNALLY - DO NOT SEND TO ALI | Convert from generic flip-card grid into a collectible binder/pack experience. |
| Quiz result/reward flow | `learn/quiz.html`, `script.js`, `content/site/quizzes.json` | Clear | Stronger than average, still dense | Focused mode helps; result can be busy | Works, but reward surface can feel like internal machinery | Scores, stickers, best score, local and pass sync | REVISE INTERNALLY - DO NOT SEND TO ALI | Polish result/reward state and ensure local vs Clubhouse Pass saving is explicit. |
| Study Sheet | Not built as live route yet | Planned only | Not applicable | Not applicable | Not applicable | Not built | REVISE INTERNALLY - DO NOT SEND TO ALI | Create a review-only Study Sheet prototype before adding links. |
| Try-On | `try-on.html` | Clear | Useful, slightly more tool than object | Strong practical flow | Strong practical flow | Transparent: prompts are copied into user's AI tool, not answered on page | PASS FOR ALI REVIEW | Keep as Study Pack benchmark; later align visual shell with Episode template. |
| Cheat Sheet / Printable | `printable.html` | Clear but naming is mixed | Useful, static | Usable | Usable | Preview/download works | REVISE INTERNALLY - DO NOT SEND TO ALI | Rename public framing to Cheat Sheet first, printable/download second. |
| LAiDIES Card | `laidies-card.html` | Future direction is clear; implementation mixed | Ambitious but mixed old/new states | Needs full pass | Needs full pass | Local save plus Supabase sync code | REVISE INTERNALLY - DO NOT SEND TO ALI | Treat as Part C identity/persistence work, not a quick Part B polish. |
| Clubhouse Pass | `clubhouse-pass.html`, `script.js` | Clear | Serviceable, not object-world enough | Email flow needs careful QA | Email flow needs careful QA | Supabase magic link and reward sync code | REVISE INTERNALLY - DO NOT SEND TO ALI | Audit in Part C with backend/privacy scope. |
| Wednesday Bag entry points | `this-week.html` | Strongest hub concept | Strong object-world foundation | Good but dense | Good but some episode-specific art debt | Local ritual completion, charm rewards, dynamic episode data | REVISE INTERNALLY - DO NOT SEND TO ALI | Stabilize labels, current-Episode assets, and grouped drawers after activity decisions. |
| Clubhouse activity hub | `clubhouse.html` | Partly clear | Good clamshell object, weaker copy/cards | Needs cleaner hierarchy | Needs cleaner hierarchy | Open state, hotspots, activity links | REVISE INTERNALLY - DO NOT SEND TO ALI | Replace "toy box" framing; remove parked Dream Phone from primary path. |
| Businesswomen's Special | `games/businesswomens-special.html` | Clear | One of the stronger object experiences | Likely good | Likely good | Fortune teller randomizer and local badge | PASS FOR ALI REVIEW | Keep as secondary quality reference for object-first play. |

## Activity Detail

### Mme CLAi-O / Madame CLAi-O

- URL/file path: `/games/madame-claio.html`, `games/madame-claio.html`
- What it is supposed to do: Give the reader a polished, dramatic, useful one-card reading from a large deck.
- First-time clarity: Strong. The reader knows to call/get a reading quickly.
- Current visual quality: High. This is a benchmark surface.
- Current mobile UX: Strong enough to remain a reference.
- Current desktop UX: Strong enough to remain a reference.
- Interaction logic quality: Strong for a rules/random deck. It avoids immediate repeat and tracks local call count/history.
- Return path/navigation clarity: Good. It supports Clubhouse and Wednesday Bag return context.
- Fake success/persistence claims: Low risk. It uses local badges/history; any future copy should keep "saved on this device" clear unless Clubhouse Pass sync is confirmed.
- Backend/API later: Optional sync to Clubhouse Pass, not required for core value.
- Council: PASS FOR ALI REVIEW.
- Recommended next action: Do not redesign. Use as a quality reference; only minor accessibility, reduced-motion, and persistence transparency polish later.

### FAiRY GODMOTHER / Ask LAiDY

- URL/file path: `/games/fairy-godmother.html`, `games/fairy-godmother.html`
- What it is supposed to do: Give a useful LAiDY-style nudge and coach the user's prompt.
- First-time clarity: Mostly clear. The user sees a textarea, energy selector, and wand button.
- Current visual quality: High shell quality. The surrounding world feels close to the reference bar.
- Current mobile UX: Good layout, but output value is underdeveloped for the promise.
- Current desktop UX: Good layout, but output value is underdeveloped for the promise.
- Interaction logic quality: Medium. It reads the user's input, reads selected energy, can auto-select a mode, and uses topic signals. The output is still rules-based and not structured enough.
- Return path/navigation clarity: Good. It supports Wednesday Bag return labels.
- Fake success/persistence claims: Medium risk if the user thinks it is real AI. The current implementation is rules-based. It should not imply an API-backed or model-backed response.
- Backend/API later: Yes, a secure API-backed version could improve this, but only via Supabase Edge Function or Cloudflare Worker. No API keys in frontend.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: First implementation slice. Upgrade the rules-based response into a structured prompt coach:
  - Prompt read
  - Prompt quality
  - What is missing
  - Better prompt
  - Next question
  - Receipts/privacy check

### Dream Phone

- URL/file path: `/games/dream-phone.html`, `games/dream-phone.html`, `script.js`, Dream Phone rethink docs.
- What it is supposed to do: Still unresolved. Earlier directions alternated between advice hotline, speed dial, and game.
- First-time clarity: Not reliable.
- Current visual quality: Below the LAiDIES bar. Prior CSS-only phone directions were rejected.
- Current mobile UX: Prior concepts were too dense and confusing.
- Current desktop UX: Current live surface is old/reverted and not approved.
- Interaction logic quality: Existing Dream Phone code includes caller cards, keypad, remix cards, and the Jenny/867 reward, but the product model is not approved.
- Return path/navigation clarity: Present but not enough to overcome concept confusion.
- Fake success/persistence claims: Medium risk. The 867 badge and other badges must not imply cross-device saving unless Clubhouse Pass sync is working.
- Backend/API later: Optional reward sync later; not the blocker. Product concept and asset direction are the blockers.
- Council: REJECT / PARK.
- Recommended next action: Do not restart implementation. Required before revival:
  - production-quality phone/object asset
  - true product concept
  - Quick Call model
  - Play The Game model only if it becomes genuinely deductive/useful
  - Council pass before any implementation

### Girl Talk

- URL/file path: `/games/girl-talk.html`, `games/girl-talk.html`
- What it is supposed to do: Draw a question/prompt card for work drama, ambition, confidence, or group-chat honesty.
- First-time clarity: Medium. The card-draw mechanic is clear, but what the reader should do with the result is less clear.
- Current visual quality: Medium. The board image helps, but the main interaction is a simple text card.
- Current mobile UX: Simple and likely usable, but thin.
- Current desktop UX: Simple and likely usable, but thin.
- Interaction logic quality: Low to medium. It draws from eight cards, avoids immediate repeat, tracks draw count, and unlocks a local badge.
- Return path/navigation clarity: Basic Clubhouse return exists; Wednesday Bag return context is not as developed as the Study Pack tools.
- Fake success/persistence claims: Medium. Badge unlock is local; that should be clear if surfaced as a reward.
- Backend/API later: Optional if prompts become sharable/savable to the Room.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: Decide the job: "conversation starter," "Room prompt," or "tiny confidence dare." Then make the output actionable and visually collectible.

### DJ Booth

- URL/file path: `/games/dj-booth.html`, `games/dj-booth.html`
- What it is supposed to do: Let readers play weekly songs/anthems tied to Episodes.
- First-time clarity: Strong.
- Current visual quality: Medium. It works, but it feels more like a styled web player than an immersive LAiDIES object.
- Current mobile UX: Usable, but controls should be polished and easier to tap/read.
- Current desktop UX: Usable, but visual storytelling is underdeveloped.
- Interaction logic quality: Medium. Tracks load and play. There is duplicate Wednesday return-link injection code, guarded but unnecessary.
- Return path/navigation clarity: Present and group-aware.
- Fake success/persistence claims: Low.
- Backend/API later: Not required unless tracking listening history or user playlists.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: Later slice: make it feel like a CD binder, stereo, or liner-notes object; clean duplicate helper code.

### THE EXTRA CREDIT

- URL/file path: `/games/fun-pack.html`, `games/fun-pack.html`
- What it is supposed to do: Curate optional post-episode bonus activities.
- First-time clarity: Medium. "THE EXTRA CREDIT" is a good label, but the page still behaves like a generic activity card grid.
- Current visual quality: Medium. Cards are serviceable, not Mme CLAi-O/FAiRY/LAiDY quality.
- Current mobile UX: Scannable but not immersive.
- Current desktop UX: Scannable but not immersive.
- Interaction logic quality: Medium. It routes by Episode and return context, but it includes Dream Phone even though Dream Phone is parked.
- Return path/navigation clarity: Good when opened from the Bag.
- Fake success/persistence claims: Low on this hub itself.
- Backend/API later: Not required.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: Clarify the hub and remove/disable parked Dream Phone from the primary recommendation path until approved.

### Trading Cards

- URL/file path: `/games/trading-cards.html`, `games/trading-cards.html`, `content/site/site-data.js`
- What it is supposed to do: Let readers open Episode card packs, flip concept cards, and build a collection.
- First-time clarity: Medium to strong. The pack-opening idea is clear.
- Current visual quality: Medium. The pack art helps, but the core experience still reads as web-game cards rather than a premium binder/pack object.
- Current mobile UX: Needs review for card size, tap targets, and collection scanning.
- Current desktop UX: Works, but should feel more collectible and less like a grid.
- Interaction logic quality: Medium. Local collection, duplicate counts, pack filter, flip behavior, and last pulls are implemented.
- Return path/navigation clarity: Good from Weekly Study Pack.
- Fake success/persistence claims: Medium. Collection is local unless Clubhouse Pass sync is explicitly wired.
- Backend/API later: Optional sync to Clubhouse Pass.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: Reframe as a binder/pack opening experience, update reader-facing "Issue" labels to "Episode," and clarify local saving.

### Quiz Result / Reward Flow

- URL/file path: `/learn/quiz.html`, `learn/quiz.html`, `script.js`, `content/site/quizzes.json`
- What it is supposed to do: Let readers test understanding, get explanations, and earn a sticker-style reward.
- First-time clarity: Medium to strong. The quiz purpose is clear, but the reward/persistence model is more complex than the first screen suggests.
- Current visual quality: Medium-high. Stronger than many utility pages, but still dense and tool-like.
- Current mobile UX: Focused mode helps. Results and reward state may feel crowded.
- Current desktop UX: Functional, but reward state could be cleaner and more editorial.
- Interaction logic quality: Strong. It supports Episode selection, scoring, explanations, best scores, sticker tiers, and Clubhouse Pass sync hooks.
- Return path/navigation clarity: Good.
- Fake success/persistence claims: Medium. It says users can save scores with a Clubhouse Pass, and `script.js` includes sync behavior. This needs Part C QA before making stronger claims.
- Backend/API later: Yes for reliable cross-device progress and sticker sync.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: Polish result state and explicitly separate "saved locally" from "saved to Clubhouse Pass."

### Episode Study Pack - Study Sheet

- URL/file path: Not live as a complete route yet. Planning is in `operations/review-packets/season-study-sheet-and-study-pack-architecture.md`.
- What it is supposed to do: Give the reader a compact test-sheet version of the Episode: core lesson, concepts, what to remember, and how to use it at work.
- First-time clarity: The concept is clear in documentation, not implemented.
- Current visual quality: Not applicable.
- Current mobile UX: Not applicable.
- Current desktop UX: Not applicable.
- Interaction logic quality: Not built.
- Return path/navigation clarity: Not applicable.
- Fake success/persistence claims: High risk if fake links/pages are created before content exists.
- Backend/API later: No backend required.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: Create one review-only Episode 1 Study Sheet prototype with real content before adding public routes.

### Episode Study Pack - Try-On

- URL/file path: `/try-on.html`, `try-on.html`
- What it is supposed to do: Give a practical Episode-specific exercise the reader can copy into their own AI tool or save locally.
- First-time clarity: Strong.
- Current visual quality: Medium-high. Useful and clear, but not as immersive as the top character/object pages.
- Current mobile UX: Strong practical utility.
- Current desktop UX: Strong practical utility.
- Interaction logic quality: Strong. It does not fake AI output; it tells the user the page will not answer and gives a prompt/task to copy or complete.
- Return path/navigation clarity: Good from Weekly Study Pack and Bag.
- Fake success/persistence claims: Low. It clearly treats saved notes as local.
- Backend/API later: Optional Clubhouse Pass sync for saved notes.
- Council: PASS FOR ALI REVIEW.
- Recommended next action: Keep as the Study Pack utility benchmark; polish visual shell later.

### Episode Study Pack - Cheat Sheet

- URL/file path: `/printable.html`, `printable.html`, `content/printables/`
- What it is supposed to do: Preview/download the weekly printable cheat sheet.
- First-time clarity: Medium. Public page still says "Printable Preview" while the approved reader-facing system says "Cheat Sheet."
- Current visual quality: Medium. Useful, static, and clear; not especially immersive.
- Current mobile UX: Usable.
- Current desktop UX: Usable.
- Interaction logic quality: Medium. It selects Episode assets and handles unavailable printables.
- Return path/navigation clarity: Good from Weekly Study Pack.
- Fake success/persistence claims: Low.
- Backend/API later: No.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: Rename the experience around "Cheat Sheet"; keep download as one action, not the identity of the page.

### LAiDIES Card / Clubhouse Pass

- URL/file path: `/laidies-card.html`, `/clubhouse-pass.html`, `laidies-card.html`, `clubhouse-pass.html`, `script.js`
- What it is supposed to do: Represent membership identity, stickers, badges, progress, and cross-device saving.
- First-time clarity: Mixed. Clubhouse Pass is clear; LAiDIES Card is partly preview/future direction and partly old builder code.
- Current visual quality: Mixed. There is a premium direction, but the implementation state is not clean enough to treat as final.
- Current mobile UX: Needs a dedicated pass/card audit.
- Current desktop UX: Needs a dedicated pass/card audit.
- Interaction logic quality: Mixed. LocalStorage and Supabase sync code are present. That makes this a Part C backend/privacy-quality surface, not a quick Part B visual fix.
- Return path/navigation clarity: Adequate.
- Fake success/persistence claims: High risk unless tested end-to-end. Clubhouse Pass copy promises cross-device saving.
- Backend/API later: Yes. This is a backend/API dependency area.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: Park from Part B visual work. Audit in Part C with Supabase, privacy, and reward sync scope.

### Wednesday Bag Activity Entry Points

- URL/file path: `/this-week.html`, `this-week.html`
- What it is supposed to do: Be the current-week ritual hub: Read, Weekly Study Pack, Quiz, Extra Credit, Meet & Celebrate, DJ Booth, Book of Receipts, Hidden Charm.
- First-time clarity: Stronger than most surfaces.
- Current visual quality: High foundation, but it still carries Episode-specific art debt and some label debt.
- Current mobile UX: Good, but dense.
- Current desktop UX: Good, but the grouped drawers and art need consistency before scaling.
- Interaction logic quality: Strong. It has dynamic Episode data, grouped drawers, local completion, charm rewards, and share actions.
- Return path/navigation clarity: Strong.
- Fake success/persistence claims: Medium. Completion, charms, and merit badges are local unless synced later.
- Backend/API later: Optional for cross-device ritual progress and charms.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: After individual activities are stabilized, align labels and current-Episode assets. Do not redesign the hub first.

### Clubhouse Activity Hub

- URL/file path: `/clubhouse.html`, `clubhouse.html`
- What it is supposed to do: Act as the AI After Hours / interactive activity hub.
- First-time clarity: Medium. The clamshell object is strong; the card grid and "toy box" language soften the value too much.
- Current visual quality: Medium-high object, medium overall.
- Current mobile UX: Needs hierarchy cleanup and less clutter.
- Current desktop UX: Needs hierarchy cleanup and less clutter.
- Interaction logic quality: Medium. It opens the compact, supports hotspots, and routes to many activities.
- Return path/navigation clarity: Good enough.
- Fake success/persistence claims: Low on the hub itself, medium via linked badges/activities.
- Backend/API later: Not required for the hub.
- Council: REVISE INTERNALLY - DO NOT SEND TO ALI.
- Recommended next action: Rename/framing pass after activity statuses are decided. Remove parked Dream Phone from primary discovery until approved.

### Businesswomen's Special

- URL/file path: `/games/businesswomens-special.html`, `games/businesswomens-special.html`
- What it is supposed to do: Use a paper fortune-teller object to recommend a cocktail or spirit-free option by mood.
- First-time clarity: Strong.
- Current visual quality: High. This is a useful secondary reference for object-first play.
- Current mobile UX: Likely good, but should be checked in the next QA sweep.
- Current desktop UX: Strong.
- Interaction logic quality: Good. Random flap/drink selection and local badge are present.
- Return path/navigation clarity: Basic Clubhouse return exists.
- Fake success/persistence claims: Medium. Badge unlock is local.
- Backend/API later: Optional only.
- Council: PASS FOR ALI REVIEW.
- Recommended next action: Keep as reference; only polish reward transparency later.

## Special Focus: FAiRY GODMOTHER / Ask LAiDY Prompt Feedback

Answers from current audit:

| Question | Current answer |
| --- | --- |
| Does it read the user's input? | Yes. `games/fairy-godmother.html` passes the textarea value into its advice/prompt feedback helpers. |
| Does selected energy affect output? | Yes. Modes such as Dolly, Miranda, Elle, Cher, Sophia, David, and Buffy alter framing and advice. Auto mode selects based on topic signals. |
| Is output canned/rules-based? | Yes. It is rules-based. There is no secure model/API call. |
| Is output useful prompt coaching? | Partly. It gives some useful read and nudge language, but it does not yet behave like a full prompt coach. |
| Does it explain what is missing from the user's prompt? | Only lightly. It checks broad signals such as audience, context, and boundary, but not enough structure. |
| Does it rewrite the prompt? | Only partially. It does not consistently present a full "better prompt." |
| Does it include receipts/privacy guidance when needed? | Not enough. High-stakes, private, confidential, legal, health, HR, or claims-related prompts need clearer guidance. |
| Would a secure API-backed version improve it? | Yes, later. But the immediate fix should be a better rules-based fallback with no fake AI claims. |

Immediate FAiRY plan:

1. Keep the current visual shell.
2. Replace the output body with structured sections:
   - Prompt read
   - Prompt quality
   - What is missing
   - Better prompt
   - Next question
   - Receipts/privacy check
3. Make selected energy change tone/framing, not the underlying safety rules.
4. Add rules for blank, vague, good, audience-specific, deadline-specific, private/confidential, claims/statistics, HR/legal/medical, meeting notes, boss tone, presentation, and rewrite/remix prompts.
5. State plainly that this is LAiDY rules-based coaching unless/until an API-backed version exists.
6. Later Part C: secure Supabase Edge Function or Cloudflare Worker. No API keys in frontend.

## Special Focus: Dream Phone

Dream Phone status remains REJECT / PARK.

What remains needed before Dream Phone returns:

- Production-quality phone/object asset.
- A true product concept that is understandable in 10 seconds.
- Quick Call model that is not just a card grid.
- Play The Game model only if it becomes genuinely deductive, rewarding, and easier to understand than the previous attempts.
- Caller/card mapping resolution.
- Jenny/867 Easter egg preserved but not overexposed.
- Council pass before Ali review or implementation.

Do not restart Dream Phone in the next implementation slice.

## Top 5 Activity Issues

1. FAiRY GODMOTHER has a strong shell but the prompt feedback is not yet strong enough to be the flagship Ask LAiDY utility.
2. Dream Phone is still parked and should not appear as an active recommended path until the product concept and phone asset are approved.
3. THE EXTRA CREDIT and Clubhouse still lean on generic activity-card/hub patterns instead of a refined LAiDIES object-world hierarchy.
4. Rewards, badges, stickers, and progress are split between localStorage and Clubhouse Pass sync code; this can feel fake unless each surface is explicit about what is local versus account-backed.
5. Study Pack naming and activity jobs are inconsistent: Study Sheet is planned, Try-On is strong, Cheat Sheet is still called Printable in places, Trading Cards use "Issue" labels, and Quiz rewards need cleaner presentation.

## Immediate Fixes

- Upgrade FAiRY GODMOTHER / Ask LAiDY output quality with a better rules-based prompt coach.
- Update entry-card copy for FAiRY after the output is upgraded so the promise matches the behavior.
- Remove or de-emphasize Dream Phone from THE EXTRA CREDIT and Clubhouse primary paths until it has a new approved concept.
- Rename "Printable Preview" framing to "Cheat Sheet" in reader-facing activity copy when that slice begins.
- Change Trading Cards reader-facing "Issue" labels to "Episode" without touching routes/filenames.
- Add local-save transparency wherever a badge, sticker, card, or note is not actually synced.

## Strategic Fixes

- Create a shared activity status model:
  - live and approved
  - live but needs internal revision
  - parked
  - planned only
- Create a shared reward language rule:
  - "saved on this device" for localStorage
  - "saved to your Clubhouse Pass" only after verified account sync
- Define the Episode Study Pack as:
  - Study Sheet = compact review
  - Try-On = practice
  - Cheat Sheet = printable/reference
  - Trading Cards = collect/remember
  - Quiz = check and earn, beside the Study Pack
- Treat Clubhouse Pass and LAiDIES Card as Part C backend/privacy work.
- Keep object-first design as the standard: clamshell, phone, card pack, DJ booth, cheat sheet, study sheet, ritual bag.

## Backend / API Dependencies

Backend/API work should wait until Part C unless a surface cannot function honestly without it.

| Need | Surface | Dependency | Notes |
| --- | --- | --- | --- |
| API-backed prompt coaching | FAiRY GODMOTHER / Ask LAiDY | Supabase Edge Function or Cloudflare Worker | Later improvement. No API keys in frontend. |
| Cross-device reward saving | Quiz, Trading Cards, charms, badges, Try-On notes | Clubhouse Pass / Supabase | Needs privacy and sync QA. |
| Member identity / LAiDIES Card | LAiDIES Card, Clubhouse Pass | Supabase profile and reward events | Part C, not a Part B quick fix. |
| Dream Phone rewards | Dream Phone | Optional Clubhouse Pass sync | Not relevant until Dream Phone concept passes. |
| Newsletter/signup | Episode/footer/site-wide CTAs | Buttondown/backend | Do not touch in this audit. |

## Recommended Implementation Phases

### Phase 1: FAiRY GODMOTHER / Ask LAiDY Output Quality

Goal: Make the existing high-quality shell deliver high-quality prompt coaching.

Likely files:

- `games/fairy-godmother.html`
- possibly `games/fun-pack.html` if entry copy needs to match the upgraded utility
- possibly `clubhouse.html` if the Clubhouse card label needs to stop promising generic advice
- QA doc under `operations/review-packets/`

Do not touch backend/API. Do not add fake AI claims.

### Phase 2: THE EXTRA CREDIT Hub Clarity

Goal: Make the bonus hub feel curated, useful, and grown-up.

Likely files:

- `games/fun-pack.html`
- possibly `clubhouse.html`
- possibly `this-week.html` only for label alignment

Key rule: Dream Phone remains parked unless Ali explicitly approves a new Dream Phone concept.

### Phase 3: Trading Cards / Study Pack Activity Polish

Goal: Make the Study Pack activities feel consistent and collectible.

Likely files:

- `games/trading-cards.html`
- `content/site/site-data.js`
- `printable.html`
- `try-on.html` only if aligning copy/shell
- possibly `learn/quiz.html`

Key rule: Do not invent Study Sheet pages. Prototype first with real Episode content.

### Phase 4: Girl Talk / DJ Booth Audit and Fix

Goal: Bring the softer bonus activities up to object-world quality.

Likely files:

- `games/girl-talk.html`
- `games/dj-booth.html`
- possibly related assets after approval

### Phase 5: Dream Phone Fresh Concept

Goal: Restart only from approved product and asset direction.

Likely files:

- review-only docs/mockups first
- no live `games/dream-phone.html` implementation until Council pass

### Phase 6: Backend/API Work in Part C

Goal: Make persistence, account sync, prompt API, Buttondown/newsletter, and privacy language real.

Likely files:

- `clubhouse-pass.html`
- `laidies-card.html`
- `script.js`
- Supabase/Cloudflare/backend files

Do not start this during Part B activity polish.

## Recommended First Implementation Slice

Start with Phase 1: FAiRY GODMOTHER / Ask LAiDY output quality.

Why this is safest:

- It does not touch Dream Phone.
- It does not require backend work.
- It builds on an already strong visual shell.
- It directly improves usefulness, not just cosmetics.
- It can be QA'd with known test prompts from `operations/review-packets/ask-laidy-input-audit.md`.

Success criteria:

- A first-time user understands what to type.
- The response clearly reflects their input.
- Energy changes the voice without changing safety boundaries.
- Vague prompts get useful missing-piece guidance.
- Strong prompts get recognition and refinement.
- Confidential/high-stakes prompts get receipts/privacy guidance.
- The improved prompt is copyable and actually useful.
- The page does not imply model-backed AI if it is rules-based.

## What Should Remain Parked

- Dream Phone live implementation.
- Dream Phone Play The Game.
- CSS-only Dream Phone asset direction.
- LAiDIES Card redesign implementation.
- Clubhouse Pass/backend sync changes.
- Fake Study Sheet routes or placeholder pages.
- Any activity that says progress is saved cross-device before Clubhouse Pass sync is verified.

## What Might Be Retired Or Rethought

- "Toy box" language on Clubhouse.
- Generic activity-card grids as the main presentation for premium activities.
- "Fun Pack" as public naming if `THE EXTRA CREDIT` is now the approved reader-facing label.
- "Printable Preview" as the primary label for Cheat Sheets.
- "Issue" labels in reader-facing cards/quiz/trading pack surfaces.

## No Staging / No Commit Confirmation

This audit is documentation only. No implementation was performed. No files were staged, committed, or pushed as part of this audit task.
