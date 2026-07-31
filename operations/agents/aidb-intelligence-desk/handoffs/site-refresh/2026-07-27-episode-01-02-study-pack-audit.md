# Episode 01–02 Study Pack learning and visual audit

**Audit date:** 2026-07-27  
**Mode:** Combined learning-product, UX, visual and screenshot-based
accessibility review  
**Scope:** Blend & Snap pack receipt; Episode 01 and 02 Try-Ons; current
four-page Cheat Sheets; Quiz entry and first-question states; canonical episode
and Study Pack source contracts  
**Disposition:** `REDESIGN COMPONENT JOBS BEFORE VISUAL POLISH`  
**Authority:** Review/handoff only. No public route, canon, pack manifest,
printable, quiz or shared infrastructure changed.

## Overall verdict

The packs have good ingredients but are not yet functioning as excellent Study
Packs.

- The Blend & Snap receipt is unusually honest about what is ready, planned
  and unavailable. That is a strong trust pattern.
- The Try-On has the strongest visual identity and clearest single-task
  presentation.
- The printables contain substantial useful material and generally readable
  print geometry.

But the system currently lists components more successfully than it teaches:

1. the actual Study Sheet is missing for both episodes;
2. Episode 01's Try-On performs Episode 02's vague-versus-specific exercise;
3. both four-page Cheat Sheets combine review, practice, reference,
   troubleshooting and source material that should belong to separate jobs;
4. the pack receipt and Try-On reuse nearly identical visuals across episodes;
5. the Quiz handoff loses episode identity, then opens with easy slogan recall
   rather than an applied decision;
6. Cards are unavailable from the pack even though Trading Cards are meant to
   be its playful visual-memory component; the current card art and content do
   not follow Ali's locked trading-card direction; and
7. component return paths do not complete a clear
   `Episode → Pack → component → Pack/Episode` loop.

## Captured flow and health

1. **Episode 01 pack receipt — NEEDS WORK.** Honest status, strong type and
   clear links. It is an inventory ticket, not yet a visual learning launchpad.
2. **Episode 02 pack receipt — NEEDS WORK.** Same strength and same limitation;
   almost no episode-specific visual or explanatory difference.
3. **Episode 01 Try-On entry — VISUALLY STRONG / CONTENT WRONG.** The fitting
   room creates an inviting practice atmosphere, but the activity teaches
   Episode 02.
4. **Episode 01 Try-On exercise — STOP-THE-LINE CONTENT DEFECT.** “Ask vaguely,
   then add audience/context/tone/length” conflicts with Episode 01 canon.
5. **Episode 02 Try-On — DIRECTIONALLY HEALTHY.** Correct core exercise and
   good mobile hierarchy; the evidence capture is too thin for the learning
   goal and the current freshness qualifications are absent.
6. **Episode 01 Cheat Sheet — USEFUL BUT OVERLOADED.** Page 1 is clean and
   page 2 contains the correct three-tool comparison, but four pages absorb the
   missing Study Sheet and Try-On.
7. **Episode 02 Cheat Sheet — USEFUL BUT OVER-SCAFFOLDED.** The BRIEF formula,
   eight-step glow-up, examples, recipes, troubleshooting and Try-On create a
   mini-workbook instead of a close-at-hand reference.
8. **Quiz entry — HEALTHY VISUAL SHELL / WEAK HANDOFF.** Attractive,
   touch-friendly selection, but generic pack links do not preselect the
   episode. Sequence numerals visually count the Foundation as 01, making
   Episode 01 appear as 02.
9. **Episode 01 Quiz question — REVISE ASSESSMENT.** The first item checks
   slogan recognition; most distractors are jokes no learner would choose.
10. **Episode 02 Quiz question — REVISE ASSESSMENT.** Same issue: it does not
    require the learner to diagnose or improve a real brief.

## What to build instead

Use one shared Study Pack chassis with five visibly distinct jobs:

1. **REVIEW — Study Sheet:** one compact screen and one printable page.
2. **PRACTISE — Try-On:** one real task, evidence capture and debrief.
3. **KEEP — Cheat Sheet:** one-page reusable procedure/reference.
4. **REMEMBER — Trading Cards:** a small episode deck of playful, flippable
   visual flash cards.
5. **CHECK — Quiz next door:** scenario-based assessment with exact episode
   identity and a return.

Trading Cards belong inside the Study Pack. They are not a substitute worksheet
or a generic collectible bolted onto the episode: their distinct job is quick,
enjoyable recall of the episode's key terms, distinctions and mental models.
The same cards can also live in the wider SUNNYVAiLE binder/collection system,
but the episode pack must be the learner's direct route into that episode's
deck.

The receipt should display four primary visual tickets—Review, Practise, Keep,
Remember—with status and one sentence each. Quiz stays visually adjacent but
outside the Pack.

## Trading Cards — required repair

### Locked learning mechanic

Ali's confirmed mechanic is:

- **front:** one original pop-art image plus one word or short phrase;
- **back:** a short plain-language explanation of the thing to remember; and
- **interaction:** tap/click/keyboard to flip, with the front remaining useful
  before the learner reads the answer.

Keep the back deliberately short. It may include one tiny “why it matters” or
episode example when that materially improves memory, but it must not turn
into a mini article, activity prompt, unlock challenge or reward receipt.

### Locked visual direction

Use the confirmed reference library at
`operations/reference/trading-cards/tradingref-01.png` through
`tradingref-04.png` and its `README.md`:

- 1990s pop-comic construction, not the current glossy Y2K desk photography;
- heavy black ink and white card border;
- flat, saturated 1990s pop-art colour sampled from the saved references:
  purples, vibrant pinks, electric/cobalt blues and sunshine yellow, held
  together by heavy black ink and white/cream;
- Ben-Day halftone, comic panels, banners, action lines and a restrained
  star/burst/sticker vocabulary;
- one dominant image and one dominant editable term on the front; and
- an original reverse-side template with a quiet reading field and one small
  episode marker.

The supplied stock/watermarked reference images are inspiration only. Rebuild
the system as original LAiDIES-owned art. Important words should be editable
type or otherwise verified exactly; do not rely on uncontrolled generated
lettering for the key term.

Do **not** recolour this card system into the TOWN CANDY palette. The saved
trading-card references—not a general site palette—are the palette authority
for these cards.

### What is wrong in the current implementation

The live Trading Cards surface has the right flip/collection premise, but its
current concept deck is not yet the Study Pack memory system:

- fronts use an emoji plus a sentence instead of image + term;
- several current `assets/trading-card-*.webp` cards use glossy, highly
  dimensional Y2K/glam photography that conflicts with the locked pop-art
  reference;
- the inline deck mixes episode concepts with advanced or surface-dependent
  vocabulary that Episodes 01–02 do not actually teach;
- some backs make broad product-behaviour claims that need current,
  surface-specific verification rather than becoming evergreen beginner
  definitions; and
- `content/site/card-packs.json` mixes concept recall with participation
  challenges, unlock prompts and collection rewards. Those can remain a
  separate collection layer, but they are not the flash-card learning face.

Do not simply reskin the existing fifteen-card vocabulary list. First repair
the episode-to-concept mapping, then write and verify the backs, then create the
art.

### Episode 01 starter deck

Use only concepts the episode actually needs the beginner to remember. A
bounded first deck could be:

- **GENERATIVE AI** — makes a new first pass from patterns; it is not a search
  result or a source.
- **THE TOOL / THE MODEL** — the app is the place you work; the model is the
  engine underneath.
- **MISSING CONTEXT** — the system cannot use information you did not provide
  or connect.
- **CONFIDENTLY WRONG** — a plausible answer can still be invented or
  unsupported.
- **YOUR JUDGMENT** — judgment, taste, context and responsibility stay with
  the person using the result; there is no fixed human percentage.
- **OPEN THE TAB** — choose one low-risk, reversible task and make a first rep.

### Episode 02 starter deck

Keep the deck focused on briefing and steering:

- **THE JOB** — say what useful thing needs to be produced or decided.
- **THE READER** — identify who the work is for and what they need.
- **CONTEXT** — provide the relevant facts, source material and situation.
- **BOUNDARIES** — name the limits, exclusions, tone or rules that matter.
- **FINISH LINE** — show what complete and usable looks like.
- **EXAMPLE** — provide a sample when shape, taste or format is hard to
  describe.
- **STEER** — inspect the first result and correct the direction.
- **VERIFY** — a better brief improves usefulness; it does not guarantee
  truth.

These labels should be reconciled against the final episode canon and official
current product guidance before public release. Advanced terms such as
temperature, embeddings, RAG, fine-tuning and chain-of-thought do not belong in
an Episode 01–02 pack merely because they are AI vocabulary.

### Pack and collection behavior

- The episode receipt opens the exact episode deck, not an all-cards landing
  page.
- A learner can flip through the deck without signing in, trading or
  collecting.
- Collection is an optional delight after learning, not a gate.
- Each card carries episode identity, position in the deck and a return to the
  pack.
- “Shuffle,” “flip all,” keyboard flip and reduced-motion behavior should be
  supported.
- Printable fronts/backs should align for duplex Letter/A4 output.
- A dated `CHECKED` or `UPDATED` field belongs in the card data, not on the
  visual front; concepts affected by changing product behavior receive a
  freshness trigger.

## Episode 01 redesign

### Learning job

Move the learner from “I should understand AI first” to one safe first rep:

`low-risk real task → same brief in available tools → compare outputs →
identify what requires human judgment → choose one useful next move`

### Study Sheet — new, one page

Title: **OPEN THE TAB — THE FIRST-REP MAP**

- What generative AI is, in one short contrast with ordinary search.
- App/tool versus model underneath, using the magazine/editor-in-chief
  relationship.
- The two beginner limits: missing context and confident invention.
- A safe-first-task filter: low stakes, reversible, personally judgeable,
  approved data.
- One sticky line: “I do not need to understand everything to try one useful
  thing.”
- Next actions: Try-On, Open the Tab reference, Quiz.

### Try-On — replace current content

- Choose one low-risk task the learner can judge.
- Use the same brief and source material in ChatGPT, Claude and Gemini, or the
  tools available to the learner.
- Capture one useful sentence or structural choice from each output.
- Rate: useful, clear, supported enough to keep exploring, editing required,
  and what only the learner could judge, verify or decide.
- Finish with: which tool won **this task**, what the learner changed, and what
  still needs checking.

Do not ask vaguely and then improve the prompt; that is Episode 02.

### Cheat Sheet — reduce to one page

Keep:

- safe-task filter;
- same-task comparison steps;
- compact comparison grid;
- human-judgment checklist; and
- stop/verify boundary.

Move definitions and full explanations to the Study Sheet. Move completed
comparison fields to the Try-On. Remove the duplicate Thursday Try-On.

### Episode-specific visual direction

Use LAiDIES-owned Heroine/object-world art, not third-party likeness:

- a three-panel “same assignment, three editor desks” comparison;
- one bright **ONLY YOU CAN JUDGE** inspection overlay;
- low-risk task tickets (email, meeting explainer, notes-to-checklist);
- a simple path from closed tab to reviewed first draft.

This should feel like the Episode 01 opening move, not a generic pink office
printable. The current Y2K desk photo decorates the page but does not teach the
relationship.

### Quiz

Replace several recall/joke-distractor items with:

- choose the safest first task from four plausible tasks;
- distinguish search from generated first-pass work;
- identify which part still requires human judgment; and
- compare two tool outputs without declaring a permanent winner.

## Episode 02 redesign

### Learning job

Move the learner from vague request to usable delegation:

`outcome + audience + relevant context/evidence + boundaries + finish line +
example when useful → inspect and steer`

This is a menu, not a ceremonial mega-prompt.

### Study Sheet — new, one page

Title: **TELL HER THE JOB — THE BRIEFING MAP**

- Prompting is delegation, not coding.
- What the tool needs for this task versus what memory, project files or saved
  instructions may already provide.
- Five briefing decisions: job, reader, relevant material, boundaries, finish
  line.
- Example as taste/shape evidence, not a magic phrase.
- A visible guard: specificity can improve usefulness; it does not guarantee
  truth.
- Progression bridge: Prompt → Brief → Delegate → Supervise.

### Try-On — deepen the existing activity

- Use two fresh chats with the same tool/model/settings and source material.
- Attempt 1: vague request.
- Attempt 2: short task brief.
- Capture the two prompts and short output excerpts side by side.
- Compare usefulness, accuracy, editing time, missing information and
  verification needs.
- Add one transfer question using a different task.
- Disclose output variability and memory/project/account influence.
- Provide reset/delete controls for saved local notes and preserve the return
  to the originating pack.

### Cheat Sheet — replace four pages with one job card

Replace the BRIEF acronym plus eight-step formula with one fillable card:

- **THE JOB**
- **WHO IT IS FOR**
- **WHAT IT CAN USE**
- **BOUNDARIES**
- **WHAT FINISHED LOOKS LIKE**
- **ONE EXAMPLE, IF IT HELPS**

Add a narrow troubleshooting strip:

- generic → add decision/audience;
- invented detail → constrain to sources and verify;
- wrong shape → state the deliverable;
- close but off → steer;
- mixed/stale thread → start a clean job.

Keep recipes in the Library or FAiRY Godmother, not in the one-page episode
reference.

### Episode-specific visual direction

Use original LAiDIES visual storytelling:

- a blank café order ticket versus a complete order ticket;
- “generic beige” output on one fitting-room rail and a usable brief/result on
  the other;
- the brief as a six-field job card with one dominant hierarchy;
- small before/after output crops with the changed fields highlighted.

Do not build art around David Rose's likeness. The current identical
fitting-room hero can remain the shared Try-On location, but the object layer,
title treatment and exercise diagram should change per episode.

### Quiz

Add scenario items:

- choose the strongest brief for a two-minute executive summary;
- diagnose whether an answer failed from missing source material, audience,
  boundary or finish line;
- decide whether to steer the current chat or start a clean one; and
- identify why a detailed prompt still needs verification.

## Cross-pack visual system

- Shared shell: Blend & Snap receipt texture, LAiDIES typography, status chips
  and navigation.
- Episode identity: one lead colour family, one original object-world image,
  one learning diagram and one repeated episode phrase.
- Trading-card identity: the same locked 1990s pop-comic frame and back
  template across episodes, with each episode receiving its own lead colour,
  symbol family and pack label.
- Hierarchy: one dominant action per viewport; avoid four equally weighted
  worksheets.
- Density: body copy on quiet surfaces; use comic energy for the title,
  relationship diagram and decisive recall line.
- Print: Study Sheet and Cheat Sheet each target one Letter page with A4 proof;
  keep minimum printable text comfortably readable and avoid dense
  three-column tables.
- Freshness: every living reference shows `CHECKED` or `UPDATED`, date and
  reason when product behavior changed.
- Connections: one admitted Library reference, one interactive helper and one
  dated current tip may follow the core pack; each has a distinct reader job.

## Accessibility risks and evidence limits

Observed from screenshots/DOM:

- semantic headings and native links/buttons are broadly present;
- mobile Try-On and Quiz controls appear large and legible;
- the Quiz link from both receipts is generic and does not bind the chosen
  episode;
- Try-On origin is not preserved in the visible return link;
- dense printable tables and small footer/source text may be difficult at
  print scale or 200% zoom;
- status chips depend heavily on small uppercase text and outline treatment;
  exact contrast needs measurement;
- the saved Try-On note can reappear on a returning device, but no visible
  reset/delete action was observed.

Not verified from screenshots alone:

- full keyboard order and focus return;
- screen-reader announcements and labels;
- contrast ratios;
- 200%/400% zoom and reflow;
- print output from exact browser/OS combinations;
- reduced-motion behavior;
- storage denied/offline/error states; or
- real assistive-technology behavior.

## Screenshot evidence

Saved in:

`/Users/alisoneakin/.codex/visualizations/2026/07/27/019fa491-20cd-7940-b7ff-4f6b5f4958f6/study-pack-audit`

- `01-episode-1-pack-receipt.png`
- `02-episode-2-pack-receipt.png`
- `03-episode-1-try-on-mobile.png`
- `04-episode-1-try-on-exercise-mobile.png`
- `05-episode-2-try-on-mobile.png`
- `06-episode-1-cheat-sheet-page-1.png`
- `07-episode-2-cheat-sheet-page-1.png`
- `08-quiz-entry-mobile.png`
- `09-episode-1-quiz-mobile.png`
- `10-episode-2-quiz-mobile.png`
- `11-episode-2-cheat-sheet-page-2.png`
- `12-episode-1-cheat-sheet-page-2.png`

## Smallest safe next build

Do not restyle all components at once.

1. Correct Episode 01 Try-On content.
2. Prototype the Episode 01 one-page Study Sheet and one-page Cheat Sheet as
   separate jobs.
3. Apply the same chassis to Episode 02 with its current-guidance note.
4. Prototype and content-check the Episode 01 Trading Card deck against the
   locked `tradingref-01..04` direction; do not reuse the current glossy Y2K
   card art.
5. Add exact episode-bound Trading Card, Quiz and Pack return links.
6. Test both at 1440, 390, 320, 200% zoom, reduced motion, keyboard-only and
   duplex Letter/A4.
7. Only then apply the proven card system to Episode 02 and later episodes.

## Learning scan — correction

The first audit treated Trading Cards as a held side product even though Ali's
reference library already contained a confirmed style and flip mechanic.
Prevention rule: before declaring a named component unavailable, optional or
visually undefined, search the canonical reference library and current product
data for an already accepted direction. Possible Behind the Build angle:
“The flash cards were not missing an idea; the system had failed to connect the
approved idea to the Study Pack.”

Second correction: the same reference library already showed the required
saturated pop-90s palette, but earlier written notes first overrode the visual
evidence with a candy recolour and then misdescribed it as red-led primary
colour. The locked family is purples, vibrant pinks, electric/cobalt blues and
sunshine yellow. Prevention rule: when Ali identifies specific images as the
locked visual reference, do not substitute or verbally remap their palette;
record her named colour family exactly and mark later corrections as
superseding older written notes.
