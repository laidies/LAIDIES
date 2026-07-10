# LAiDIES — Cold + Returning User Audit
**Date:** 2026-07-01 · **Author:** Cold-eye walkthrough of every SUNNYVAiLE page against Ali's 4-question framework: WHAT / WHY / WHY-I-NEED / HOW. Plus returning-user jobs-to-be-done → sticky-rail spec.

---

## Executive summary — the 7 headline findings

1. **The site never explicitly says LAiDIES teaches AI fluency.** Every page assumes the visitor already knows. Every hero, every tagline, every eyebrow talks about "the town," never about "why you're here" (to learn to use AI in a way that doesn't feel like a lecture from a bro). Fixing this is the single biggest lift.

2. **The games teach real AI concepts, but no page says so.** Ask LAiDY = prompt engineering. Mme CLAi-O = pattern recognition. Businesswomen's Special = decision trees. Dream Phone = deduction / elimination. Girl Talk = prompt design + group dynamics. Every one of these has a learning payload, and NONE of them label it. This is either brilliant subtlety or a massive missed opportunity. **My call: it's a missed opportunity.** A single-line "★ You're practicing: pattern recognition" chip on each tool would transform this.

3. **The 4-question framework is answered nowhere on the homepage.** The visitor lands, sees Ali on Main Street, and has no idea what LAiDIES is, why it exists, whether it's for her, or what to do next. The "★ What is this?" thesis section I just added is a start — but it's the only place answering any of the 4 questions, and it's below-the-fold.

4. **Every SUNNYVAiLE building page is beautifully written but describes ITSELF rather than what the user LEARNS there.** Blend & Snap: "coffee shop, third place, where the Study Pack lives." Beautiful, canon-aligned, but doesn't say "this is where you review the AI concepts from this week's episode before your pop quiz." The learning outcome is invisible.

5. **The nav is genuinely random.** Different pages have different nav items. Some pages have hamburger menus, some don't. Cross-page back navigation is inconsistent. This slows returning users.

6. **Returning users have no fast-access rail.** They come back on Wednesday looking for: (a) new episode (b) pop quiz (c) new Sorority House posts (d) their favorite game. Right now they have to navigate through multiple pages every time. A sticky quick-access rail would fix this in one component.

7. **"LAiDIES = Wednesday newsletter" framing is wrong AND persistent.** Meta descriptions, taglines, and CTAs treat LAiDIES as a newsletter product. It's actually a **learning + community platform for AI fluency** with a Wednesday drop as ONE channel. This mis-framing sells the product short.

---

## Framing corrections needed site-wide

**Kill these phrases** (found in multiple locations):
- ❌ "LAiDIES is a Wednesday newsletter" → say **"LAiDIES is where women learn AI"** or **"A learning + community platform for AI fluency, built for women"**
- ❌ "You don't need to understand the town to be here" → visitors need to feel they DO get it right away (fixed on visitors-centre.html)
- ❌ "The whole point" → replaced with "What is this?"
- ❌ "AI fluency for women" (standalone, vague) → be specific: **"AI fluency — practical, weekly, and in a voice that doesn't say 'sweetheart'."**

**Add these framings:**
- The core promise: **"Learn AI without a beige tutorial or a bro saying 'just prompt engineer it, sweetheart.'"**
- The mechanism: **"Every stop in SUNNYVAiLE teaches a real AI concept — wrapped in a Y2K reference so it sticks."**
- The rhythm: **"Wednesday drops. Weekly episodes. Games you can play in 5 minutes."**

---

## Part 1 — Cold user audit (per-page)

**Persona:** she's smart, busy, curious about AI, tired of tech tutorials that talk down to her. First-time visitor. She lands on the homepage.

### Homepage · `index.html`

| Question | Status | Notes |
|---|---|---|
| WHAT is this? | ⚠️ Partial | The thesis section says "AI fluency and community for women." But the eyebrow is buried below the masthead. The masthead itself just says "Welcome to SUNNYVAiLE" — feels like a game, not a learning platform. |
| WHY is it here? | ⚠️ Partial | The thesis explains the 90s aesthetic and analogies — GOOD. Missing: why this VS a normal course/tutorial. |
| WHY do I need it? | ❌ Missing | Nothing tells the visitor what she'll actually LEARN or GAIN. What outcomes? What skills? What's different from taking a Coursera class? |
| HOW do I use it? | ⚠️ Partial | The map is there. The episode is there. But there's no "start here" moment for the cold visitor. |
| LEARN check | ⚠️ Partial | Says "AI fluency" but doesn't demonstrate. |

**Priority:** P0 · **Fixes:**
- Add a **"Why do I need this?"** section between thesis and episode. Outcome-focused: "You'll walk out able to write prompts that actually work, spot the AI move in every meeting, and know what tool to reach for."
- Reframe **"Take a lap around SUNNYVAiLE"** to include the learning payoff: *"Every stop is a lesson in disguise. Click any building to see what you'll learn there."*
- The masthead eyebrow **★ WELCOME TO SUNNYVAiLE · POPULATION: WOMEN JUST LIKE YOU** is charming but doesn't say what LAiDIES IS. Add a subhead: *"The place where women learn AI without a beige tutorial."*

### Visitors Centre · `visitors-centre.html`

**Current framing:** SUNNYVAiLE is the fictional small town where LAiDIES lives.

| Question | Status | Notes |
|---|---|---|
| WHAT is this? | ⚠️ Partial | Says "front door" but not "front door TO WHAT" from the visitor's POV. |
| WHY is it here? | ✅ | Explains why LAiDIES is set in a town (analogies stick). |
| WHY do I need it? | ❌ | No outcome promises. |
| HOW do I use it? | ⚠️ Partial | Town anthem + directory but no clear "your first step is..." |
| LEARN check | ❌ | Doesn't explain how the town helps you learn AI. |

**Priority:** P0 · **Fixes:**
- Add a clear "**Start here**" 3-step path at the top: 1. Read this week's episode 2. Take the pop quiz 3. Meet the community.
- Reframe intro: *"Welcome to SUNNYVAiLE — where every store teaches you something real about AI. This is the map."*

### Blend & Snap · `blend-snap.html`

**Current framing:** Coffee shop, third place, Study Pack lives here.

| Question | Status | Notes |
|---|---|---|
| WHAT is this? | ✅ | Clear — coffee shop / study spot |
| WHY is it here? | ✅ | Because you study over coffee, then walk to school for the test |
| WHY do I need it? | ⚠️ Partial | Says "read the study pack" but not "so you retain 40% more" or similar |
| HOW do I use it? | ✅ | Clear "Wednesday lap" steps |
| LEARN check | ⚠️ Partial | Studying is implied but not what you're studying / why |

**Priority:** P1 · **Fixes:**
- Add: *"Every Study Pack condenses the week's episode into 3 concepts, 5 vocab words, and 1 practical prompt to try. Read it here in 8 minutes."*

### LIBRAiRY · `library.html`

| Question | Status | Notes |
|---|---|---|
| WHAT is this? | ✅ | Reference desk |
| WHY is it here? | ✅ | Look things up |
| WHY do I need it? | ❌ | Doesn't say what you'd look up or when |
| HOW do I use it? | ⚠️ Partial | Three shelves listed but abstract |
| LEARN check | ⚠️ Partial | Reference is implicitly educational but never explicitly framed |

**Priority:** P1 · **Fixes:**
- Add use-cases: *"When you don't know what to call the thing you're stuck on, come here. Look up 'context window,' find out what the Power Map means for your stakeholder chart, or ask the Book what a term actually means in real life."*

### SUNNYVAiLE High · `sunnyvaile-high.html`

| Question | Status | Notes |
|---|---|---|
| WHAT is this? | ✅ | School — structured classes |
| WHY is it here? | ✅ | Structured learning vs. reference |
| WHY do I need it? | ⚠️ Partial | 7 courses listed but "why should I take them?" unclear |
| HOW do I use it? | ⚠️ Partial | "Take the pop quiz" clear, but "sit through the class" abstract |
| LEARN check | ✅ | Best of the SUNNYVAiLE pages at explicitly framing learning |

**Priority:** P2 · **Fixes:**
- Add outcomes per course: *"Vocab 101 = you'll never freeze up when someone says 'RAG' in a meeting again. Concepts 101 = you'll be able to explain what AI does in one sentence."*

### The Mall · `mall.html`

| Question | Status | Notes |
|---|---|---|
| WHAT is this? | ✅ | 10 stops of pop-culture reference + avatar closet |
| WHY is it here? | ⚠️ Partial | "Reference catalog" but why do I need pop-culture references to learn AI? |
| WHY do I need it? | ❌ | Not clear |
| HOW do I use it? | ⚠️ Partial | Stops listed but not searchable yet |
| LEARN check | ❌ | Mall = reference, not framed as learning |

**Priority:** P1 · **Fixes:**
- Add: *"Every pop-culture reference in LAiDIES turns into an AI analogy. The Mall is the master catalog — Cher's wardrobe recommender IS a recommender system. Dolly's 9-to-5 IS a decision tree with humor. Browse the shelves when you want a mental hook for a concept."*

### BRONZE AiGE · `bronze-aige.html`

| Question | Status | Notes |
|---|---|---|
| WHAT is this? | ✅ | Bar / happy hour / house band venue |
| WHY is it here? | ✅ | "Third place after the day" |
| WHY do I need it? | ❌ | Beautiful vibe copy but no learning payoff |
| HOW do I use it? | ⚠️ Partial | Businesswomen's Special = drink picker, but the LEARN is invisible |
| LEARN check | ❌ | BRONZE AiGE is currently 100% vibes, 0% teaching |

**Priority:** P1 · **Fixes:**
- BRONZE AiGE hosts the **Coven of women leading in AI** (canonical from `sunnyvaile-world.md`). Explicit teaching moment: *"The Coven has a 4pm standing reservation — the real women leading in AI (Hannah Fry et al.) hang here. Read their Maven cards at the Sanctuary, then find them here on Wednesdays."* This connects the setting to the learning source.

### Sanctuary · `sanctuary.html`

| Question | Status | Notes |
|---|---|---|
| WHAT is this? | ✅ | PATRON SAiNTS + Mavens wing |
| WHY is it here? | ✅ | "Sacred but not church" — inspiration place |
| WHY do I need it? | ⚠️ Partial | "Borrow their move" but not clear WHEN/WHY |
| HOW do I use it? | ✅ | Pick a saint (via Passport). Now clear. |
| LEARN check | ⚠️ Partial | Saints teach WISDOM but not AI directly |

**Priority:** P2 · **Fixes:**
- Reframe saints as "learning models" not just role models: *"Each PATRON SAiNT teaches you a real move you can use in an AI-adjacent moment. Cher = early adoption. Elle = the receipt / the paper trail. Miranda = how to give feedback that lands. Borrow the move."*

### Games/Tools (from Explore audit — verified)

**Universal fix:** Add a "★ You're practicing:" chip to every game hero. This makes the LEARN explicit without breaking the fun.

| Game | Current LEARN framing | Proposed chip |
|---|---|---|
| **Ask LAiDY** | Implicit (energy = better prompt) | ★ You're practicing: **prompt engineering** |
| **Mme CLAi-O** | Implicit (cards as archetypes) | ★ You're practicing: **pattern recognition** |
| **Businesswomen's Special** | Explicit-ish (decision tree) | ★ You're practicing: **decision trees** |
| **Dream Phone** | Paused / partial | ★ You're practicing: **deduction & elimination** |
| **Girl Talk** | Not framed | ★ You're practicing: **prompt design + group dynamics** |

### Community pages

**Sorority House** — Clear WHAT/WHY. Needs a "here's what you'll get out of each room" one-liner per room card (the current descriptions are canonical but abstract).

**MAiKEOVER** — Clearest WHAT/WHY of all pages. This is the model. Sign-up is straightforward. Learning outcome: *"Get your Residence Card — how you save your Study Packs, track pop quiz scores, and unlock member-only rooms."*

**Post Office** — Wednesday Drop signup is clear. Missing: **you can also sign in with a magic link here** — needs surfacing.

**Passport / Residence Card** — WHAT is clear. WHY-I-NEED is the weakest. It's the persistent home for member state, but the sell is buried. Add: *"This is your record. Every episode you read, every game you play, every dare you complete lives here. When you come back, this is where you pick up."*

### Setting/character pages

**Town Hall** — Beautiful now with the Deb archive + founder's note. Missing: "This is where you find out how LAiDIES works and who's building it." Add that framing at the top.

**KSVL Radio** — Music-only station. WHY-I-NEED is thin. Add: *"Ambient audio for when you're reading/working. The Wednesday town anthem plays on the hour. Mix CDs to burn (paid) or stream (free)."*

**NewsStand** — Rebranded now, hero image good. Add explicit: *"What everyone's talking about in AI this week. Read a 3-minute Hot Goss digest before you scroll socials."*

---

## Part 2 — Homepage IA rethink (my proposal)

**Current order (7 sections):**
1. Masthead
2. Why does this look like 1999? (thesis / What is this?)
3. Wednesday in SUNNYVAiLE (episode)
4. Take a lap (map)
5. Use one before you leave town (games)
6. The Blessed Ones (saints)
7. The Wednesday Drop (signup)
8. Get your member card (membership)

**Proposed order (8 sections, cold-visitor-optimized):**

| # | Section | Answers Q | Copy direction |
|---|---|---|---|
| 1 | **Masthead** | Hook | Ali on MAiN Street + tagline: *"Girl power meets machine power. Learn AI where every reference is your language, not theirs."* |
| 2 | **What is this?** | WHAT + WHY | Combined thesis (currently the "Why 1999?" section). Add: *"A learning + community platform for women learning to use AI — not a beige tutorial, not a bro saying 'sweetheart.' A whole Y2K small town where every stop teaches something real."* |
| 3 | **Why do I need it?** | NEED | NEW section — outcome-focused. *"By the end of this week, you'll know 3 new AI vocab words, one prompt pattern that works, and where to look when you're stuck. By month one you'll never freeze up in a meeting again. By month three you'll be the one people ask."* |
| 4 | **How to use it** | HOW | Three tiles: (a) **Read this week's episode** (Chick Flicks card) (b) **Play a tool right now** (Ask LAiDY quick-launch) (c) **Take a lap** (link to town map, currently 4th section) |
| 5 | **The town map** | HOW (deeper) | Move the map here — same component as now, but the intro copy: *"Every store is a lesson. Click any building to see what you'll learn there."* |
| 6 | **Meet the town** | WHAT (proof) | Combined PATRON SAiNTS (currently 5th) + brief Coven mention. Add: *"Eight PATRON SAiNTS from movies you already know teach the human moves. The Coven — real women leading in AI right now — bring the machine moves."* |
| 7 | **Join** | ACTION | Consolidated signup: Wednesday Drop + MAiKEOVER member card in ONE section with two clear paths. |

**Sections to remove from current homepage:**
- Duplicate signup calls (currently in 2 places)
- The below-the-fold membership section — merge into Join

---

## Part 3 — Returning user jobs-to-be-done + sticky rail spec

### The 5 things a returning user comes for

1. **"Show me this week's episode."** — she comes back Wednesday morning for the drop
2. **"Take the pop quiz."** — after reading, she wants to test recall
3. **"What's new in the Sorority House?"** — check community updates, respond to a Dear LAiDIES, etc.
4. **"Play [Ask LAiDY / Mme CLAi-O / etc]."** — she has a favorite tool
5. **"Look up X."** — a term from last week, a specific reference from The Mall

### Friction points today

- Every trip starts from the homepage or a nav click. She's browsing to find what she wants.
- The nav is inconsistent across pages, so mental model breaks.
- No breadcrumb or "recently visited" state.
- Sorority House updates aren't surfaced anywhere else on the site.

### Sticky rail spec

A **floating card** in the bottom-right corner, visible on every page. Fold out to reveal a quick-access panel. Contents:

```
★ Wednesday quick-access

🎬  This Week's Episode → [Ep 04 · title]
📝  Pop Quiz → [status: taken / not yet]
💬  Sorority House → [3 new posts]
✨  Ask LAiDY → [Ask]
🃏  Mme CLAi-O → [Pull a card]
🔍  Look up a term → [search]

──────────────
Your Residence Card ★
[Change avatar → CLAiRE'S]
```

**Behavior:**
- Collapsed = small ★ chip in corner (unobtrusive)
- Hover/tap = expands to reveal the panel
- Auto-collapses after 8 sec of no interaction
- Sticky at bottom-right, respects viewport
- On mobile: full-width bar at bottom instead of corner
- Dismissible with X (localStorage: `laidies_rail_dismissed=true`)
- Persists dismiss for 24h then reappears (in case they wanted it back)

**Placement:** every page EXCEPT games in progress (Ask LAiDY chat, Girl Talk deck, etc. — don't cover the game).

**Priority:** P0 for returning users. Ship after homepage IA lands.

---

## Part 4 — Cross-cutting patterns

### Nav inconsistency
Different pages have different nav items:
- Visitors Centre: `This Week · Episodes · LIBRAiRY · Sorority House · Sign In`
- Town Hall: `This Week · Episodes · LIBRAiRY · Town Hall · Sorority House · Sign In`
- Radio: `This Week · Episodes · LIBRAiRY · KSVL · Sorority House · Sign In`

**Fix:** Lock a standard nav across all pages:

```
Home · This Week · Episodes · Town Map · Sorority House · Sign In
                                                        [☰ menu]
```

Hamburger menu opens: LIBRAiRY, The Mall, BRONZE AiGE, Town Hall, KSVL Radio, SANCTUAiRY, SUNNYVAiLE High, Post Office, MAiKEOVER, All games.

### Missing back navigation
Pages should have a **"← Back to [where they came from]"** at the top, especially on games and Mall stops. Currently inconsistent.

### Placeholder content still showing
`town-hall.html` still has a placeholder listing Mayor's note / Town announcements / Civic records / Mayor's calendar as future features. Either build them or remove the placeholder.

### The "every game teaches something" invisibility
Already flagged. The single biggest lift: add a "★ You're practicing: X" chip to every game hero.

---

## Two critical findings from Explore sub-agents (add to P0)

### 🚨 "Hot Goss" branding is still in CSS/JS filenames

The NewsStand page HTML says "The NewsStand" correctly, but the underlying files still say:
- `content/hot-goss-styles.css`
- `content/hot-goss-render.js`
- CSS class names: `hot-goss-board`, `hot-goss-panel`, `hot-goss-stamp`

**Fix:** Rename the files + update the class references (or leave the classes and only rename the files, if class-renaming would break other pages). Verify the newsstand render still works after.

### 🚨 Membership signup has 3 competing paths

Users hit different signup flows depending on which door they enter:

- **clubhouse-pass.html** — email → magic-link auth → member card + optional newsletter opt-in (this is the canonical member signup)
- **post-office.html** — email → Buttondown newsletter subscribe (newsletter-only, but placeholder form makes it unclear)
- **maikeover.html** — explanation page, links to clubhouse-pass for the actual signup

**Problem:** A visitor who wants "the newsletter" might use post-office (newsletter-only), missing the member card. A visitor who wants "a member card" might use post-office by mistake.

**Fix:** Consolidate to ONE canonical signup path. My proposal:
- **clubhouse-pass.html** = the only signup form (member card + newsletter checkbox pre-checked)
- **post-office.html** = redirects/explains, points to clubhouse-pass for signup
- **maikeover.html** = the entry point; visual walkthrough → clubhouse-pass

Also fix broken links:
- `library.html` has 4 broken href="#" links to SUNNYVAiLE High
- `library.html` has 2 broken href="#" links to SANCTUAiRY
- `maikeover.html` has broken "See My Card" placeholder link

## Part 5 — Top 10 priority fixes (in this order)

1. **P0 · Add "★ You're practicing: [AI concept]" chip to every game/tool hero** (Ask LAiDY, Mme CLAi-O, Businesswomen's Special, Dream Phone, Girl Talk). One-line change per page. Reveals the learning payload immediately.

2. **P0 · Add "Why do I need it?" section to homepage.** Outcome-focused copy. Between thesis and episode.

3. **P0 · Reframe homepage tagline to name LAiDIES as a learning + community platform** (not "Wednesday newsletter"). Update meta description and og:description too.

4. **P0 · Restructure homepage IA per proposed order** — masthead → what is this → why I need it → how to use → map → meet the town → join.

5. **P0 · Lock consistent nav across all SUNNYVAiLE pages** — Home / This Week / Episodes / Town Map / Sorority House / Sign In + hamburger for the rest.

6. **P0 · Build returning-user sticky rail** — quick-access to episode, pop quiz, Sorority House, favorite tools, Passport.

7. **P1 · Add "Start Here" 3-step path to Visitors Centre** — Read episode → Take quiz → Meet community.

8. **P1 · Add learning-outcome one-liners to each building page** (Blend & Snap, LIBRAiRY, SUNNYVAiLE High, Mall, BRONZE AiGE, Sanctuary). Show what you learn, not just what the shop is.

9. **P1 · Rewrite Mall framing** — every pop-culture reference is an AI analogy. Make the connection explicit.

10. **P2 · Delete or replace placeholder content on Town Hall** (Mayor's note / announcements / civic records / calendar as CONTENT PLACEHOLDER block is starting to feel unfinished).

---

## Summary — where to start

If Ali can only ship 3 things this week:
1. **Fix the framing everywhere:** LAiDIES = learning platform (not newsletter). Update tagline, meta, homepage thesis.
2. **Add "You're practicing: X" chips to all 5 games.** 5 one-line changes with massive UX payoff.
3. **Build the sticky rail.** Returning users will thank you every Wednesday.

Everything else is polish on top of these three. The site is already gorgeous; it just needs to tell you what it IS and what you're GAINING.
