# lAIdies Website UX Reorganization Plan

## Diagnosis

The site has strong content, but the homepage is currently behaving like an inventory of everything we have built. That makes it feel chaotic even when the individual pieces are good. The reader needs a clearer path:

1. What is this?
2. Where do I start?
3. What can I learn?
4. Where can I ask/share/connect?
5. What fun extras are available if I want them?

## Recommended Homepage Order

### 1. Hero
- Keep brand, promise, and the quote.
- Primary CTA: Start Episode One.
- Secondary CTA: See Episodes.
- Tertiary CTA: Join the Community.
- Do not introduce games, glossary, or founder story here.

### 2. Start Here / Current Episode
- Show Issue 1 and Issue 2 only.
- Add "Start here if you are new."
- Move the full 24-episode roadmap lower or collapse it behind "See the season plan."

### 3. Learn
- Combine glossary, who's who, quiz, and hot goss into a single "Learn" area.
- The user should understand these are learning aids, not unrelated sections.
- Hot Goss should be clearly labeled "Updated weekly" or moved to the newsletter if we cannot maintain it.

### 4. Community
- Put Ask the Room, Send It Energy, Comment Card, Member Profiles, Mix CD Exchange, and Wins here.
- Reduce the number of visible cards at once by grouping them:
  - Ask for help
  - Share what worked
  - Meet the room
  - Give feedback
  - Fun community extras

### 5. Games
- Treat this as a separate break room, not the core learning path.
- Use one card per game, but do not show the full working version of every game on the homepage.
- Each game card should open/reveal the full game or go to a dedicated page.

### 6. Resources
- Card pack, playlist/mix CDs, reference closet, and templates should become a resource shelf.
- The current card pack concept needs clearer rules before it should be prominent.

### 7. Origin Story
- Keep it, but move it lower.
- It is important for trust and tone, not primary navigation.

### 8. Subscribe
- Keep as the final conversion point and repeat a smaller subscribe CTA near the top.

## Specific Fixes Needed

### fAIry Godmother
- Current problem: the small wand card and the large console both appear, which makes the interaction feel duplicative.
- Fix: keep the small game card visible; hide the full console until the user clicks/waves the wand.
- First pass completed: console is hidden unless the `#laidy` section is targeted.

### Trading Cards
- Current problem: concept is fun but unclear. The pack, pulls, binder, duplicates, and member-profile rewards are too much at once.
- Fix:
  - Rename "The Card Pack" to "Wednesday Card Binder" or "The Sticker Binder."
  - Explain in three steps: open pack, collect cards, duplicates stack.
  - Do not mention member profile storage until login exists.
  - Keep front/back card design simple.
- First pass completed: card backs now swap cleanly instead of showing a backwards front.

### Quiz
- Current problem: quiz was labeled Issue 2, scored out of 9, had 7 questions, and included bonus questions that made the scoring feel broken.
- Fix:
  - Issue 1 quiz should have 7 questions and max score 7.
  - No bonus scoring until the basic quiz experience feels solid.
- First pass completed: quiz now uses Issue 1 content and a 7-point score.

### Games
- Current problem: too many full games compete on the same page.
- Fix:
  - Homepage shows game cards only.
  - Full game modules should be hidden behind reveal states or moved to dedicated pages.
  - Prioritize three hero games first: fAIry Godmother, Dream Phone, Madame CLAI-O.

### Layout Width / Cramming
- Current problem: some modules are too wide, especially horizontal rails and dense game grids.
- Fix:
  - Add a consistent max-width wrapper for content-heavy sections.
  - Avoid nested card grids inside already-carded sections.
  - Reduce horizontal scroll areas unless the scroll behavior is central to the metaphor.

## Recommended Next Build Pass

1. Create a "Learn" section that contains glossary, quiz, who's who, and hot goss.
2. Collapse the 24-episode roadmap after the first two issues.
3. Redesign Games as launch cards with dedicated reveal/detail areas.
4. Simplify the card pack copy and remove member-profile promises until login exists.
5. Add consistent section wrappers so content stops pushing to the viewport edges.

