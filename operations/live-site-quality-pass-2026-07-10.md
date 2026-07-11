# Live-site quality pass — 2026-07-10

Demanding first-time-visitor pass, page by page, across the whole live site (index + every top-level building, their key sub-pages, mall/*, games/*, community/*, grimoire/*, issues/*, learn/*, printables). Read-only. Excludes `concepts/`, `.retired/`, `.versions/`, `operations/`.

**Lens:** not links/a11y (the 07-07 and 07-10 launch audits own those) — this is *content quality, clarity of purpose, on-brand look/voice, does-it-actually-work, and sibling consistency* as a skeptical newcomer experiences it.

## Scorecard

- **Pages reviewed:** 85
- **NOT OK (fix first):** 3 truly broken/garbage + 4 functionally-broken-enough-to-read-as-broken, plus 3 cross-page systemic problems = **~10 fix-first items**
- **Rough (works, but stale/off-style/thin):** 44
- **Solid:** 38

The site is in far better shape than "garbage" — most flagship pages are genuinely strong. The real damage is concentrated: **one broken quiz, one legacy front-door, a mall that is 90% unfinished, and a self-contradicting "where did the 101s go" story** (library ↔ sunnyvaile-high ↔ handbook disagree with each other). Plus a town-wide **address-numbering contradiction** that a detail-oriented visitor will catch immediately.

---

## NOT OK — fix first

Ranked worst-first. These make a page (or a cross-page story) read as broken, unfinished, or off-the-current-brand to a first-time visitor.

1. **`learn/quiz.html` — two of the five quizzes are dead.** The shelf shows Foundation + Ep01–04, each "10 questions + 2 bonus," but `content/site/site-data.js` `quizzes{}` only defines `issue01/issue02/issue04`. **Foundation and Episode 03 render as clickable but silently no-op** — and those are the two a newcomer is steered to ("start at the Foundation"; issue-03's "Take the Quiz" auto-selects the missing issue03). *Fix: add `foundation` + `issue03` quiz objects to site-data.js, or hide those two cards until data exists.*

2. **`start-here.html` — the designated new-visitor front door is a stale legacy page.** Landable (no redirect), loads legacy `styles.css` + Dancing Script/Inter fonts, and its copy/site-map pushes ~15 retired destinations: "Hot Goss," "Clubhouse / THE EXTRA CREDIT," "Reference Closet," "The Receipts," "Learn/Glossary," "DJ Booth in the Clubhouse," "Weekly Bag," "Try-On Debrief." None reflect the current town (Chick Flicks, Blend & Snap, MAiKEOVER, LIBRAiRY, Post Office). *Fix: rewrite to the current town model (mirror visitors-centre) or redirect start-here → visitors-centre.html.*

3. **The Mall — 9 of 10 stores are unfinished.** Only PIECES OF FLAiR is a real interactive store. The other nine (`maiybe`, `as-seen-on-tv`, `rollin-with-my-homies`, `books-and-records`, `gizmos-and-gadgets`, `hanger-management`, `food-court`, `last-summer`, `mall-kiosk`) are the same "Still brewing" template: a curated static list + a banner admitting the searchable shelf "isn't built." A visitor can't *do* anything in 9 shops, and each openly says so. *Fix: build the searchable shelf for one flagship store as the pattern, or reframe the nine so they don't read as unfinished (drop the "still brewing" banners; present as browsable lists).*

4. **`library.html` — dead links + broken hero + self-contradicting copy.** Six `href="#"` dead links (SUNNYVAiLE High ×3, The Mall, The LUMINAiRY) though the real pages exist; the page never loads `sunnyvaile-page.css` yet uses `.sv-hero`, so the hero image renders unstyled/oversized; and a stale block says the 101s "moved to High as Season 1 **courses**" (banned "courses" term, and contradicts this page now hosting "the 101 shelf"). *Fix: point stubs at `/sunnyvaile-high.html` `/mall.html` `/luminairy.html`, add the shared stylesheet, rewrite the relocated block.*

5. **`sunnyvaile-high.html` — "101 classes" route into the retired Grimoire.** The seven 101-class links (and the CENTAURS link) still point at legacy `/grimoire/` "SLAiYER Handbook"/"potions-shelf"/"Decoder" pages — directly contradicting the site's own claim (on handbook.html) that "the 101 textbooks moved to the LIBRAiRY." *Fix: re-point the class links to the LIBRAiRY and drop the retired Grimoire/witchy naming.*

6. **MAiN Street addresses contradict each other across pages (cross-cutting).** Canon = MAiN runs 1–10, Bronze AiGE = No.7, MAiKEOVER = No.6, Mme CLAi-O = No.5, Blend & Snap = No.8. Live pages disagree: `blend-snap.html` says No.8 (meta) **and** No.4 (eyebrow — also collides with the Mall); `bronze-aige.html` coaster says No.5 vs eyebrow No.7; `handbook.html` lists **No.6 for both** MAiKEOVER and Mme CLAi-O, Bronze at No.5, and "MAiN runs 1 through 9"; `clubhouse.html` puts Mme CLAi-O at No.6 and Bronze at No.5. *Fix: publish one canon address table and correct each page to it.*

7. **`grimoire/power-map.html` — off-style AND thin (a stub).** Only 7 cards (OpenAI, ChatGPT, Anthropic, Claude, Google AI, Gemini, "Model vs App") under a dek promising "the cast list" — omits Copilot, Perplexity, NotebookLM, Codex/Claude Code and every *person*, all of which its own Handbook chapters name. Sits next to Potions (22 cards) and Lore (60+). *Fix: rebuild on `sunnyvaile-page.css` + global header and expand to the real roster, or drop the "cast list" promise.*

8. **`try-on.html` — off-brand template with a visible render bug.** Primary body font is **Inter** (not Jost); does not load `sunnyvaile-page.css`; references `var(--wine)` ~8× but it's **never defined**, so those labels render in the fallback/wrong color; step badges use neon-magenta. The exercise itself works and the voice is on-brand, but it visually reads as an older, separate design system. *Fix: adopt the shared stylesheet/Jost; define or remove `--wine`.*

9. **Community rooms are an empty void (7 thread pages).** Every Hyvor-Talk room shows **0 comments** (confirmed in `content/community/chat-room-digest.json`), so `ask-the-room`, `burn-book`, `dear-laidies`, `send-it-energy`, `try-on-debrief`, `wins`, and the digest's live board all give a newcomer a "be the first" void — and `chat-room-digest.html` actively broadcasts "0 comments" + "Nothing here yet." All `community/*.html` also load legacy `../styles.css` while the hub uses canonical `sunnyvaile-page.css`. *Fix: seed 2–3 starter posts per room; hide the live 0-count board until seeded; migrate the children onto sunnyvaile-page.css.*

10. **`blend-snap.html` — emoji chrome + a silent JS bug (beyond the address issue in #6).** Uses the `☕` coffee emoji as a UI-button icon (violates the no-emoji-chrome lock), and the archive script targets a `.stop-name` element that doesn't exist on the current-pack card, so the pack title never updates. *Fix: swap the emoji for a gold icon (svGoldIcon); fix the JS selector.*

---

## Rough — needs work

Works and is largely on-brand, but carries stale copy, minor off-brand styling, thin content, or a content bug. Not embarrassing, but not finished.

**Buildings & tools**
- `luminairy.html` — 12 "portrait coming" letter-placeholder cards in the wider-lineage wing (visible placeholder art on a flagship), and a stale "Portraits brewing" line for TRAiLBLAZERS whose 6 portraits already ship. *Collapse placeholders behind a reveal; drop the stale line.*
- `bronze-aige.html` — coaster address (No.5) wrong vs canon No.7 (see #6). Otherwise strong.
- `handbook.html` — address collisions + "runs 1 through 9" (see #6); still carries pre-LIBRAiRY framing in spots. *Fix addresses; reconcile with the LIBRAiRY story.*
- `printable.html` — off-brand Inter body, dead legacy `.site-header/.nav/.hamburger` CSS (no matching markup), and fallback copy still says "the current week's Bag." *Align to Jost/sv-header; drop dead CSS; retire "Bag" wording.*
- `clubhouse.html` — on-brand but landable, and lists wrong addresses (Mme CLAi-O No.6→5, Bronze No.5→7). *Correct or drop the numbers, or redirect the page.*

**Mall stores (all nine "still brewing" — see #3)** — plus two content bugs:
- `mall/rollin-with-my-homies.html` — "Miranda Priestly" and "Miranda from The Devil Wears Prada" are the same person (duplicate); Cindy Crawford listed both solo and inside "The Supermodels"; the hero's "Miranda Bailey" gag isn't in the list. *Dedupe; add Bailey.*
- `mall/last-summer.html` — hub calls it "I Know What You Did Last Summer" but the page title/h1 is "Last (x30) Summer"; the "(x30)" gag is opaque. *Reconcile the name; clarify or cut the joke.*

**Games**
- `games/dream-phone.html` — "Just Call" mode is rich and works, but the advertised "Play the Game" mode ships an "Out of service" / "still being wired" banner. *Finish the deduction game or hide that door until ready.*
- `games/fun-pack.html` — functional hub but stale: only lists Ep01–03 (site is on Ep04+) and labels Dream Phone "Parked" / Girl Talk "Beta" though both are live. *Refresh statuses; add Ep04.*

**Community**
- `community/mix-cd-exchange.html` — best static substance of the threads, but comments empty and it says "DJ JAIDY" vs canonical DJ SunnyV. *Verify the DJ name; seed a mix.*
- `community/comment-card.html` — working mailto flow, but the episode dropdown lists only Ep1–2 (site is well past). *Refresh episode options.*
- (ask-the-room, burn-book, dear-laidies, send-it-energy, try-on-debrief, wins, chat-room-digest — the empty-room set, see #9.)

**Grimoire / LIBRAiRY family (off-style shell, but content is real and works)** — the whole family loads legacy `styles.css` + `grimoire.css` + Cinzel/EB Garamond fantasy fonts and uses a custom `.gr-topbar` instead of the global header, so there's **no town nav** on any of them and none match the Y2K baseline. Content ranges from excellent to fine; branding is caught mid-migration (Handbook pages still "Grimoire/SLAiYER"; reference pages already relabeled "LIBRAiRY"). *Core fix for each: migrate to `sunnyvaile-page.css` + Jost/Playfair + `sv-global-header.js`; retire "Grimoire/SLAiYER" per the LIBRAiRY/101 plan.*
- `grimoire.html`, `grimoire/slaiyer-handbook.html`, `slaiyer-handbook-chapter-1..5`, `slaiyer-handbook-chatgpt` (half-migrated — already on Playfair), `verification-rulebook.html` (already re-pointed to /library.html), `lore-closet.html`, `potions-shelf.html`.
- `grimoire/chamber-of-receipts.html` — additionally uses emoji chrome (💼🌍🔒💰🎓🔍); swap to svGoldIcon.

**Episodes & printables**
- `issues/issue-01.html` — tail still runs the retired "What's In The Bag" / "Wednesday Bag" ritual with `this-week.html?...&bag=open` links + an orphaned empty "Club Pack Try-On" divider. *Swap to the issue-02/04 rooms+rail pattern; drop `bag=open`.*
- `issues/issue-03.html` — heaviest stale-Bag footprint (side-rail "Open the Weekly Bag" card, "Go to the Weekly Bag" pill, many `bag=open` links); also fully dependent on a runtime JS fetch. *Same fix as issue-01.*
- `content/printables/issue-01-on-wednesdays-we-do-ai.html` — byte-for-byte identical to `issue-01-open-the-tab.html` (its title/h1 even say "Open the Tab"), so the "On Wednesdays We Use AI" worksheet the filename promises is effectively missing. *Give it its own content, or delete/redirect the dupe.*

---

## Solid

Genuinely good — ship as-is (minor copy tweaks noted in agent logs, not blocking).

**Core:** index.html · visitors-centre.html · town-hall.html · about.html *(graceful redirect)* · learn.html · this-week.html · episodes.html · sanctuary.html · receipts.html · reference-closet.html *(all clean redirect stubs)*

**Buildings:** chick-flicks.html · radio.html · watch.html · sorority-house.html · maikeover.html · post-office.html · postcard.html · laidies-card.html · newsstand.html

**Mall:** mall.html *(hub)* · mall/pieces-of-flair.html · mall/claires.html *(redirect)*

**Games:** businesswomens-special.html *(the on-brand template the others should follow)* · dj-booth.html · girl-talk.html · madame-claio.html · trading-cards.html · fairy-godmother.html · cocktail-fortune.html *(redirect)*

**Community:** community.html *(hub)* · clubhouse-pass.html · community/laidy-spotlight.html *(redirect)*

**Episodes/printables:** issues/issue-02.html · issues/issue-04.html · learn/glossary.html *(redirect)* · content/printables/issue-01-open-the-tab.html · content/printables/issue-03-elle-woods-receipts-pass.html · content/printables/prompt-cheat-sheet.html

---

## Cross-cutting themes (fix once, helps many pages)

- **Address canon.** Publish one MAiN Street table and sweep blend-snap / bronze-aige / handbook / clubhouse (see #6). Highest "sharp visitor notices instantly" ROI.
- **The "where did the 101s go" story is inconsistent.** library.html, sunnyvaile-high.html, and handbook.html tell three different versions (courses at High / classes into Grimoire / textbooks in the LIBRAiRY). Pick one destination (LIBRAiRY) and make all three agree.
- **Emoji-as-UI-chrome drift.** Against the locked no-emoji standard, emoji icons appear on blend-snap (☕), sorority (🂠/👛), post-office (💌), laidies-card (🪪/🦋/🔐/📼), chamber-of-receipts, and most game pages. One sweep to `svGoldIcon`.
- **Grimoire/LIBRAiRY family migration.** ~13 pages share one off-style legacy shell with no town nav. Batch-migrate to `sunnyvaile-page.css` + global header; it's the single biggest cluster of off-brand surface area on the site.
- **Community seeding.** 7 rooms at 0 comments is a content task, not a bug — but until seeded, every thread reads as a dead room.
