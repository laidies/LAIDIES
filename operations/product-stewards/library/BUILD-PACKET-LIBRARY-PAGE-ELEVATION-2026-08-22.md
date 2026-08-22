# LIBRAiRY page elevation — build packet

**Status:** SPECIFIED FROM ALI LIVE WALKTHROUGH / IMPLEMENTATION NOT STARTED
**Date:** 2026-08-22
**Visitor surface:** `/library.html`
**Release truth:** current local candidate is HOLD; public page is a different,
older artifact; zero opening books are admitted.

## Visitor problem

The Library's component ideas are nearly right, but the visible page does not
feel like one authored physical building. The arrival image is recognizably
1990s but visually dull beside the electric page; the Reference Desk and Browse
sections repeat the same weight; the shelf rooms appear stacked and floating;
books do not convincingly sit on physical rails; search feels cramped; and the
live page has no visible shared navigation. That visual and navigational break
makes a useful Library feel assembled rather than inhabited.

## Preserve — this is what good already looks like

- Bright, bold, colourful 1990s pop-art energy.
- Distinct colours for Reference Desk, Browse and the three collections.
- A visitor can clearly recognize **101s**, **Tools** and **Reference**, with a
  plain explanation of what each contains.
- The entry concept feels like opening the door and seeing the building inside.
- Selecting a cover reveals subject, contents, depth, currentness and
  availability before any separate Open action.
- All current books remain visible; the design can grow without pagination or
  shrinking covers into thumbnails.

## Repair — exact acceptance conditions

### 1. Shared navigation

- Mount the canonical inner-page header; merely loading
  `content/site/sv-global-header.js` without a `.sv-header`/`.site-header`
  mount target fails.
- At desktop and mobile sizes, a visitor can identify Home and move to other
  primary SUNNYVAiLE destinations without browser Back.
- A compact contextual return control may supplement the header; it cannot be
  the only navigation.

### 2. One connected arrival

- Retain the current interior's credible 1990s details: carpet, public
  computers, metal stacks and the reference-desk setting.
- Elevate colour, depth, lighting, crop and/or environmental storytelling so
  the interior belongs to the electric page rather than reading as a detached,
  dull image panel.
- Keep the page title and navigation as deterministic live UI. Do not bake
  legible labels into generated art.
- Replace the plain title/image split with one authored arrival composition;
  do not restore a rejected white/pink over-image header.

### 3. Two different entry jobs

- **Ask Miss Jeeves:** ask a natural-language question, receive a short current
  evidence-bound answer and see exact learning routes grouped by job: Library
  book/section, Episodes, NewsStand, reinforcement, High, planned content and
  governed external sources. The complete behavior lives in
  `subproducts/miss-jeeves.md` and its dedicated build packet.
- **Browse the Library shelves:** explore physical collections and books by
  subject, title and need.
- Visitor copy must not call the experience a generic catalogue. “Catalogue”
  remains acceptable only for internal publication/search data.
- Reference Desk and Browse may share the Library's pop-art material family,
  but their compositions must have visibly different weight and direction.

### 4. Grounded physical shelves

- Recompose the 101s, Tools and Reference rooms so they read as connected
  spaces inside one Library, not three unrelated full-width panels.
- Every room has a convincing wall/case/floor relationship and visible ground
  plane.
- Every complete cover sits wholly inside a shelf opening, visibly meets its
  rail and stays behind the case frame/sign layer.
- Preserve all current books and the selected-book preview. Do not substitute a
  generic card grid, pagination, tiny covers, floating book rows or book
  wallpaper.
- Mobile must be intentionally composed, not a shrunken desktop room.

### 5. Search and topic controls

- “Search titles and topics” spans a generous writing width at desktop and
  mobile sizes; its placeholder and typed text do not appear cramped or clipped.
- Topic controls remain secondary to the search field and do not create a
  horizontal-scroll discovery trap.
- The selected-book preview remains adjacent to the physical shelf journey and
  restores focus/position to its exact opener.

### 6. Current learning hierarchy

- Keep a beginner route for making a clearer prompt on a new or bounded task.
- Teach that prompt wording is only one part of providing the model what it
  needs: task, audience, relevant source material, constraints, examples,
  tools, history and maintained context where applicable.
- Do not imply that one magic prompt replaces context management, retrieval,
  tool use, iteration or verification.
- Source any public teaching against current primary material. Current official
  guidance still supports clear, specific prompts with enough context, while
  current agent guidance treats system instructions, tools, external data and
  message history as a broader context-management problem.
- Primary sources checked 2026-08-22:
  - OpenAI, “Prompt engineering best practices for ChatGPT”:
    https://help.openai.com/en/articles/10032626-how-do-i-prompt-chatgpt-effectively
  - OpenAI, “How GPT-5.6 fuses frontier intelligence with frontier efficiency”:
    https://openai.com/index/gpt-5-6-frontier-intelligence-efficiency/
  - Anthropic, “Effective context engineering for AI agents”:
    https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### 7. Book truth remains separate

- AI Fundamentals does not become available as part of the page repair.
- Its exact content, visuals, reader, currentness, correction, independent
  review, release and public-origin gates must pass separately.
- The public page currently differs from the local candidate and exposes stale
  availability/identity behavior. Do not treat public status as candidate
  authority or a reason to carry it forward.

## Prohibited inputs and regressions

Use the complete prohibited list in `operations/library-decisions.md`. In
particular, do not reuse rejected page identities `615a80f7…dab` or
`7d4d01f4…c7c9`, the banned shelf kits/five-shelf upright, purple-sign interior
variants, duplicated-book wallpaper, card-grid catalogue, floating cases,
book spotlights, hand-inked replacement room or CSS teaching diagrams.

## Dependency-ordered build

1. Mount and test the shared header journey independently.
2. Reconcile the two entry jobs and integrate the ratified Miss Jeeves results
   architecture without turning Browse into a generic catalogue.
3. Prove the highest-risk visual mechanism with one representative connected
   arrival-to-shelf composition using approved objects and live UI.
4. Produce the full desktop/mobile room and shelf composition only after that
   representative proof clears internal Brand/UX red-team review.
5. Repair the search/control layout and preserve the selected-book interaction.
6. Update prompt/context teaching only through current source-bound content
   production and independent semantic admission.
7. Run exact 1440/390/320 maker comparison, keyboard/reduced-motion/200%
   reflow and known-failure guards.
8. Admit the exact visible candidate through the design Review Door before Ali
   sees it. Page release and book admission remain separate transactions.

## Ali decisions

The Library page and Miss Jeeves product behavior are sufficiently decided for
implementation judgment. Ali's next required decision is acceptance or
rejection of the exact admitted visual/product candidate; no architecture
question remains open.

## Explicit non-goals

- No new Library architecture competition detached from this ruling.
- No new book availability as visual filler.
- No generic chatbot, card catalogue or account/sync promise.
- No deployment/publication authorization in this packet.
