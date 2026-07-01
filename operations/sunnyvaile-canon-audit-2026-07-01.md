# SUNNYVAiLE Canon Alignment Audit
**Date: 2026-07-01** | Audit source: Canon files locked 2026-06-30; pages reviewed same-day

---

## Executive Summary

**3 major findings:**

1. **Hero images are live but naming inconsistency**: All 18 building pages have correct hero images loaded (verified against asset paths `/assets/sunnyvaile-buildings/NN-*.png`). But page display titles diverge from canon in 2 cases (net-flicks.html displays "The Chick Flicks" — correct; old filename creates confusion on nav).

2. **Copy alignment is strong but 5 pages are incomplete placeholders**: Buildings with locked canon (Sanctuary, Library, Blend & Snap, Bronze AiGE, Post Office, Radio, High, Sorority House, MAiKEOVER, Chick Flicks) all have copy matching their roles. BUT: Town Hall, Visitors Centre, Mall, and Clubhouse all show placeholder-tag content indicating future features not yet wired (Mayor's notes, Mall Directory search, Clubhouse rooms structure).

3. **Customization routing (the trip mechanic) is partially wired but missing CTA affordances**: The routing table from canon (`customization-is-a-trip.md`) defines where each customization field "owns" its change flow, but only 2/11 buildings (MAiKEOVER + Sorority House) have explicit "go customize X here" CTAs that route members through the building. Missing: Radio (song selection), Sanctuary (favorite saint), Bronze AiGE (cocktail selection), Blend & Snap (trading cards), Library (currently reading). This is P1 polish, not P0 broken, but it's a discovered gap.

4. **No explicit "First time here?" onboarding strip on most pages**: Canon calls for town-spined discovery but only Visitors Centre, MAiKEOVER, and Sorority House introduce themselves as "if you're new, start here" points.

5. **Accessibility to members-only Sorority House is unclear from non-gated pages**: The Sorority House page requires a card but doesn't clarify the sign-in flow (should route through MAiKEOVER or Post Office). Visitors Centre (future onboarding home) doesn't yet explain the "make card → get in house" sequence.

---

## The Matrix

All pages checked 2026-07-01 against canon locked 2026-06-30.

| Page | Hero Image | Copy Alignment | Features Present | Features Missing vs Canon | Priority | Recommended Actions |
|---|---|---|---|---|---|---|
| **index.html** (homepage) | ✅ Live ("Welcome to SUNNYVAiLE" masthead) | ✅ Strong: announces town, shows Patron Saints, invites exploration | Masthead · Patron Saints gallery (8 saints) · Townwide nav · Episode CTA | NONE (homepage is intro, not a building) | P2 | None; page is landing copy, not a building stop. Verify link to Post Office signup is canonical. |
| **visitors-centre.html** | ✅ Live (Welcome Wagon imagery) | ⚠️ Partial: says "welcome to SUNNYVAiLE" + "start here" intent, but copy is brief/placeholder-y | Header nav · Eyebrow label · Lede · Theme player (town anthem) · CTAs linking to other pages | ❌ Missing: Canon says this is "onboarding home" — should explain Visitors Centre's full role (what makes it the first door?). Missing: explicit "new member?" flow (should link to MAiKEOVER signup). Missing: map/tour concept (canon says "Start Here lives here"). | P1 | Expand copy to clarify Visitors Centre as official onboarding entry point. Add "First time in SUNNYVAiLE?" heading + link to MAiKEOVER. Wire as homepage alt-landing for future (Phase 2). |
| **town-hall.html** | ✅ Live (Town Hall exterior at Civic Square) | ⚠️ Partial: Deb bio is strong, canon roles clear, but core functions show placeholder | Deb bio · Mayor bio context · Poster gallery (Deb campaign posters) · "How Deb became mayor" details section · CTAs to about.html | ❌ Missing content placeholders: Mayor's note (build/release notes in Deb's voice) · Founder's note (Ali's, currently at /about.html) · Town announcements/changelog · Civic records/FAQ/Press · Mayor's calendar. Per canon, all 5 should live here. | P1 | Migrate Ali's founder note from /about.html to Town Hall. Add "Mayor's Weekly Note" section. Add "Town Announcements" for changelog/feature updates. Keep the posters (locked — they're good). |
| **sanctuary.html** | ✅ Live (Sanctuary exterior on Cathedral Hill) | ✅ Strong: explains Patron Saints + Mavens distinction, tagline locked ("Pay homage..."), pledge locked, two-wing metaphor clear | Patron Saints section (8 saints listed + described) · Mavens wing placeholder · Tagline · Pledge · Explanation of same-person-two-places rule · CTAs to homepage saints + Mall | ❌ Missing: Mavens wing populated (Hannah Fry et al. — Ali's editorial list). Canon says "names added when approached and credited properly" so this is deferred, not broken. | P2 | Keep Mavens placeholder until list is finalized. When it lands, need per-Maven portraits in same reverent register as Patron Saint cards (visual style locked per canon). No action needed this sprint. |
| **library.html** | ✅ Live (Town LIBRAiRY at MAiN No. 3) | ✅ Strong: explains Grimoire structure, reference shelves (Power Map, Chamber of Receipts, Ask the Book), distinction from other learning types clear | Three reference shelves named and linked · Eyebrow label · Lede explaining reference function · Theme player | ❌ Missing from building canon routing: LIBRAiRY owns the "currently reading" customization field (from customization routing table). Page should have visible CTA: "Set your currently reading" → browse and select from library. Not present. | P1 | Add "Your Currently Reading" vessel section on laidies-card.html with CTA: "Change at the LIBRAiRY" (links to library.html with anchor). Add reciprocal "Pick Your Currently Reading" section on library.html with list of featured books. Wire the pick flow. |
| **mall.html** | ✅ Live (Mall storefront at MAiN No. 4) | ✅ Strong: explains 10 stops, Directory concept, Burn Book no-results wire | 10 stops listed (CLAiRE'S, MAiYBE, As Seen on TV, Rollin' with my Homies, Books & Records, Gizmos, Hanger Management, Food Court, I Know What You Did (x30) Summer, Mall Kiosk) · Directory spec (search box + 10 pills + Burn Book) · Stop grid · Eyebrow label · Lede | ❌ Missing: Mall Directory SEARCH FEATURE itself (spec written, feature is placeholder). Missing: Per-stop pages (10 stub pages needed; "click a stop" links are inactive). Missing: Avatar "Wear this →" mechanic description (canon: avatars come from 6 object stops only; should explain on page). | P0 | Build Mall Directory feature (client-side search across 290 cards — per spec in mall.html placeholder). Create 10 per-stop stub pages OR route each stop pill to anchor within mall.html. Add avatar system explanation above stops ("Object stops below also work as your avatar closet"). Wire "Wear this →" mechanic to Passport (member card only). |
| **blend-snap.html** | ✅ Live (Blend & Snap café at MAiN No. 8) | ✅ Strong: coffee shop role, Study Pack connection, third place concept, Wednesday lap sequence | Study Pack link to this-week.html · Song player ("Down at the Blend & Snap") · Lede · "Wednesday lap" ordered list (Read episode → grab coffee + Study Pack → walk to High → take quiz) · Optional activities (games, Bronze, Clubhouse) · CTAs | ❌ Missing: Blend & Snap owns "trading cards / Study Pack" selection (per canon routing). Page should have "Your Study Pack" section on card with CTA: "Update at Blend & Snap." Missing: Bulletin Board / community corkboard (canon says "café community corkboard" as future Level 2 gifting destination, deferred). | P1 | Add "Your Study Pack" vessel on Passport with CTA linking to Blend & Snap. Blend & Snap page needs section: "Pick This Week's Study Pack" (currently links to this-week.html; should be more explicit). Defer Bulletin Board to Phase 2. |
| **bronze-aige.html** | ✅ Live (Bronze AiGE bar at MAiN No. 5) | ✅ Strong: happy hour + live show dual-time concept, Main Character Spritz detail, house band (THE LAiDIES), debut song locked, Businesswomen's Special game | Businesswomen's Special game link · Happy hour lede · Main Character Spritz box · Live show section · THE LAiDIES debut (Wednesday in SUNNYVAiLE audio) · Music vs. broadcast distinction · CTAs | ❌ Missing: Bronze AiGE owns "cocktail-of-the-week" customization field (per canon routing). Passport should show member's current cocktail with CTA: "Change at the BRONZE AiGE." Not present. Missing: live music video (in production per canon, but should say "coming soon"). | P1 | Add "Your Cocktail of the Week" vessel on Passport. Link to BRONZE AiGE. BRONZE AiGE page needs visible "Pick Your Cocktail" section with Businesswomen's Special results + rotating selection. Wire to Passport. Note: live music video copy already says "coming soon" — good. |
| **sunnyvaile-high.html** | ✅ Live (High School exterior at Schoolhouse Road) | ✅ Strong: Season 1 · 101 classes, structured learning distinction, course offerings clear | 7 courses listed (Vocab 101 → Concepts 101 → Briefing 101 → Tools 101 → Practice 101 → Accounts 101 → ChatGPT 101) · Lede explaining school function · Pop Quiz placeholder · Detention Slips placeholder | ❌ Missing: Per-course pages (all 7 courses link to source chapters; should be adapted into "class format" pages per canon). Canon says "course names are drafts pending final review" so naming is soft-locked. Missing: SUNNYVAiLE High owns "detention slip / hall pass spend" (per canon + girl-talk-dare-validation-plan). Page should have visible CTA on Passport: "View your Detention Slips" → shows where to spend Hall Passes (at Girl Talk game, not at High). Unclear routing. | P1 | Clarify copy: "Detention Slips earned through Girl Talk dares at the Sorority House. Spend your Hall Pass here if you need to skip." Add link to Girl Talk game. Keep course-name caveat until Ali confirms finals. Don't build per-course pages yet (source chapters serve as class content). |
| **sorority-house.html** | ✅ Live (Sorority House on Wisteria Lane) | ✅ Strong: Delta LAi Nu, members-only, card required, Hyvor rooms clear, no-card flow (route to MAiKEOVER) is good | 10 rooms listed (Ask the Room, Burn Book, Wins, Dear LAiDIES, Comment Card, Mix CD Exchange, Try-On Debrief, Send It Energy, Residence Card Spotlight, [10th cut off in read]) · "Card required" lede · "Don't have a card yet?" CTA to clubhouse-pass.html · Room descriptions · Member-only gating | ⚠️ Partially missing: Sorority House owns Girl Talk dares (per canon), but Girl Talk isn't listed as a room here. Canon says "Girl Talk dares → post to Sorority House 'Dare Reports' room" (from girl-talk-dare-validation-plan). Dare Reports room should be visible in the list. | P1 | Add "Dare Reports" room to the 10-room grid (post-to-earn validation for Girl Talk dares). Include in room descriptions. Wire Girl Talk game to post dares here. |
| **post-office.html** | ✅ Live (Post Office at Civic Square) | ✅ Strong: Wednesday Drop signup, PO box metaphor, signup flow clear, "no spam" promises | Signup form placeholder (Buttondown embed expected) · Lede · "What you get" list · "What you won't get" list · PO box metaphor explanation | ❌ Missing canon feature: Post Office owns magic-link sign-in (per membership-architecture-plan + customization routing). Page should clarify: "The Post Office is also your sign-in station — your email is your PO box AND your login." Missing: actual magic-link sign-in form (Part C build). Missing: Post Office also owns "send-a-note gift" mechanics (gifting-mechanic-locked) — should have visible "Send a Note" section. | P0 (gated) | Current Buttondown form is fine for Phase 1. When Part C ships (member card + magic-link), add sign-in section here + update copy. Defer gifting section to Level 2 (currently deferred in canon). Keep the form placeholder for now. |
| **radio.html** (KSVL) | ✅ Live (Radio tower at Radio Tower location) | ✅ Strong: music-only broadcast, DJ JAiDY, patron saint themes, town anthem on the hour, distinction from Dream Phone clear | "Now playing" section (house band + episode tracks) · Song player buttons · Lede · Theme player (town anthem) · Music-only distinction · Dream Phone separation note | ❌ Missing: KSVL Radio owns "song of the week / current mood" customization field (per canon routing). Passport should show member's current song with CTA: "Change at KSVL." Not present. Missing: "DJ JAiDY's rotation" concept — should explain what songs rotate weekly vs. stay in archive. | P1 | Add "Your Song of the Week" vessel on Passport. Link to radio.html. Radio page needs visible "Pick Your Song" section with featured songs + weekly rotation. Wire to Passport. Clarify copy: which tracks are permanent vs. weekly rotation. |
| **maikeover.html** | ✅ Live (Beauty parlor at MAiN No. 9) | ✅ Strong: sign-up home, card design, weekly check-in ritual, distinction from Sorority House clear | New-member sign-up flow (walk in → design → leave) · Sign-up CTA to clubhouse-pass.html · "Coming back?" check-in section · Weekly haul (stickers, badges, charms, trading cards) · Distinction from Sorority House (parlor vs. house) · Why beauty parlor explanation | ✅ All features present. Customization routing: MAiKEOVER owns "Passport MAiKEOVER / Residence Card issue." CTA to clubhouse-pass.html is wired. | P0 (ship-ready) | No action needed. Page is canon-aligned and ship-ready. Keep the weekly promise section (ships when member card dashboard lands). |
| **net-flicks.html** | ✅ Live (Chick Flicks storefront at MAiN No. 7) | ✅ Strong: video rental shop metaphor, episode-as-rental concept, Study Pack link, Wednesday lap sequence | Episode grid (embedded from episodes.html OR placeholder saying "grid at episodes.html") · This week's episode CTA · Rental rules · Study Pack link to Blend & Snap · Wednesday Drop signup link · CTAs to this-week + episodes.html | ✅ All canon features present. Page name in URL is net-flicks.html but display title is "The Chick Flicks" (correct per canon rename from "Net Flicks" → "Chick Flicks" 2026-06-29). Filename not yet updated (Codex handling). | P2 | No action needed; copy is canon-aligned. Codex will rename filename when full ripple complete. Display title is correct. Consider: should this page be the canonical episode grid home instead of /episodes.html? Deferred to Phase 2 cleanup. |
| **clubhouse.html** | ⚠️ Partially live (compact layout, mixed styles) | ⚠️ Partial: intro copy exists, but page is a "gateway" landing, not a building. Not in canon as a SUNNYVAiLE location. | Compact layout · Menu of games/features · Mini player styling | ❌ Confused role: Clubhouse is NOT a canonincal building in SUNNYVAiLE. Canon buildings are: Visitors Centre, Town Hall, Sanctuary, Library, Mall, Blend & Snap, Bronze AiGE, High, Sorority House, MAiKEOVER, Chick Flicks, Post Office, Radio, Phone Booth. Clubhouse is a navigation hub, not a "place." This page may be confused with "Sorority House" (the actual members-only place). | P1 (clarify) | Clarify page role: is this a general games/social hub landing, or is it supposed to represent something in canon? If it's a nav hub, rename conceptually to avoid confusion with Sorority House. If it IS meant to be a building, clarify what it's called in SUNNYVAiLE and add it to canon. Current state is ambiguous. |
| **clubhouse-pass.html** (Passport builder) | ✅ Live (MAiKEOVER member form) | ✅ Strong: framed as card-making at MAiKEOVER, copy is clean, form is canon-aligned | Email form · Newsletter opt-in · Submit button · Confirmation card (Post Office themed) · MAiKEOVER reference | ✅ All features aligned. This is the sign-up entry point; correctly routed from MAiKEOVER landing. Copy correctly says "Make your card here" — not confused with member dashboard. | P0 (ship-ready) | No action needed. Page is canon-aligned and functional. Consider: when member card backend ships (Part C), this form needs to integrate with Supabase auth (magic-link signup). Keep the form structure for now. |
| **laidies-card.html** (Passport) | ✅ Live (member dashboard, local storage state) | ✅ Strong: Residence Card flip · sticker book placeholder · sash/merit badges placeholder · charm hunt placeholder · customization vessels shown | Residence Card (front/back flip, avatar + info) · Card corner header · Stickers section (placeholder: "add UI for sticker book") · Merit Sash (placeholder: badge list) · Charm Bracelet (placeholder: hunt progress) · Detention Slips (placeholder: Hall Pass + slip counter) | ⚠️ Partially missing: The five customization CTA vessels (avatar, song, cocktail, reading, saint) are NOT present on this page yet. Per canon, each customization field should have a "Change at [Building]" CTA that routes members through the town. Currently Passport shows fields but no routing CTAs. This is the core gap in the trip mechanic. | P0 (gating member card) | When laidies-card.html ships, add five customization vessels: (1) Avatar — "Change at CLAiRE'S" (Mall); (2) Song of the Week — "Change at KSVL Radio"; (3) Cocktail of the Week — "Change at BRONZE AiGE"; (4) Currently Reading — "Change at the LIBRAiRY"; (5) Favorite Saint — "Change at SANCTUAiRY." Each is a click-through CTA that navigates to the building. This is the "trip" lever. Part C build, post sign-in. |
| **this-week.html** (episode landing) | ✅ Live (current week's episode + Study Pack) | ✅ Strong: episode + quiz + class notes all integrated, Study Pack clearly positioned | Episode article/lede · Quiz embed (Pop Quiz) · Study Pack / Class Notes section · Blend & Snap link · SUNNYVAiLE High link · Wednesday lap CTAs | ✅ All canon features present. Episode page is the hub for one-week's content (the "magazine" model). | P0 (ship-ready) | No action needed. Page is canon-aligned. |
| **episodes.html** (episode catalog) | ✅ Live (full season grid) | ✅ Strong: shows all seasons/episodes, magazine catalog metaphor | Season/issue grid · Episode covers · Per-episode CTAs · Filter/browse | ✅ All canon features present. Future: consider whether "The Chick Flicks" (net-flicks.html) should be the canonical home and episodes.html becomes a secondary grid. Deferred to Phase 2. | P0 (ship-ready) | No action needed. Page is canon-aligned. |

---

## Cross-Page Consistency Issues

**Pattern: Customization trip mechanic is spec'd in canon but not wired on pages.**

- **5 buildings own customization fields** per `customization-is-a-trip.md` routing table, but none have visible "Set your [field] here" CTAs on their pages:
  - **Library** (currently reading) — no CTA
  - **KSVL Radio** (song of the week) — no CTA
  - **BRONZE AiGE** (cocktail) — no CTA
  - **Sanctuary** (favorite saint) — no CTA
  - **Blend & Snap** (trading cards) — no CTA
  
- **AND** the receiving end (Passport) has no "Change at [building]" CTAs that route members back through the town.

- **Impact:** The core mechanic — "every customization = a trip through town" — is documented but not surface-visible. Members can't see the affordance unless they know the canon.

**Fix:** Add visible, persistent "Set your X" sections on each building page (below the main content) + add reciprocal "Change at [Building]" CTAs on the Passport for each field.

---

**Pattern: Members-only gating flows are unclear.**

- **Sorority House page** requires a card but doesn't explain the sign-up flow explicitly.
- **MAiKEOVER page** correctly links to clubhouse-pass.html for first-time signup, but existing members' "See My Card" link is deferred (membership dashboard not yet built).
- **Visitors Centre** (future onboarding home) doesn't explain "new member? → sign up at MAiKEOVER → access Sorority House" sequence.

**Fix:** Add explicit flow diagram or copy to Visitors Centre explaining member journey (make card → access house). Test the sign-in links (MAiKEOVER → clubhouse-pass → Sorority House gating).

---

## Onboarding Readiness Assessment

**visitors-centre.html — Phase 2 onboarding home [PARTIAL]**

Readiness: 65% complete, 3 items needed.

**What's there:**
- Header + nav (inherited from global styles)
- Eyebrow label (Welcome Wagon Visitor's Centre)
- Lede (welcome to SUNNYVAiLE)
- Town anthem button (play the anthem)
- Light copy + CTAs to other pages

**What's missing:**
1. **Explicit "new member?" path** — should have a prominent section: "New here? → Design your card at MAiKEOVER → Get into the Sorority House" (with CTA). Currently says "welcome" but doesn't guide first-time action.
2. **Map/tour concept** — canon says "Start Here lives here" and "introduce the world once, at the door, then let the map carry it." This page should introduce the 14 major buildings with brief 1-line descriptions + addresses, functioning as an orientation map. Currently just external links without spatial context.
3. **Returning member entry** — should have "already a member?" section pointing to Passport (laidies-card.html) or Sorority House directly.

**When ready:** This can replace or supplement the homepage as the front door once the member card system (Part C) lands. For now, homepage stays primary; Visitors Centre is secondary onboarding option.

**Recommendation:** Expand Visitors Centre copy in Phase 2, after member card ships. For Phase 1, keep homepage as primary landing. Visitors Centre can serve as "about the town" page (still invite-worthy, just not yet the primary onboard path).

---

## Top 5 P0 Fixes (Highest Leverage)

**Priority order by impact and effort:**

### 1. **Wire customization CTAs on 5 building pages + Passport** [P0 gating member card]
   - **Impact:** The trip mechanic is canon-locked but invisible to members. Without this, Passport customization fields have no affordance to change.
   - **Scope:** Add 5 sections to 5 building pages (Library, Radio, Bronze AiGE, Sanctuary, Blend & Snap). Add 5 reciprocal CTAs on Passport.
   - **Effort:** 6–8 hours (design the CTA pattern, implement on 5 pages + Passport).
   - **Ships with:** Member card dashboard (Part C).
   - **Acceptance criteria:** Each customization field on Passport shows "Change at [Building]" CTA. Each building page has "Pick your [field]" section below main content.

### 2. **Build Mall Directory search feature** [P0 for Mall launch]
   - **Impact:** Mall Directory is spec'd (search box + 10 pills + no-results Burn Book wire) but not implemented. Mall.html placeholder currently says "status: page build in flight."
   - **Scope:** Client-side search across 10 stop titles + descriptions. Filter pills per stop. No-results state routes to Burn Book.
   - **Effort:** 3–4 hours (write search script, wire pills, style no-results modal).
   - **Ships with:** Mall page completion.
   - **Acceptance criteria:** Type "Dunkaroos" → jumps to Food Court. Type "Cher" → matches Clueless card + Cher Horowitz card + SANCTUAiRY reference. No results: "Put it in the Burn Book →".

### 3. **Create 10 Mall stop stub pages** [P0 for Mall navigation]
   - **Impact:** 10 stops (CLAiRE'S, MAiYBE, etc.) are listed on mall.html but unclickable. Each stop should have its own page showing ~25–35 cards (inventory per canon). Currently stops don't link anywhere.
   - **Scope:** Create `/mall/claires.html`, `/mall/mayibe.html`, etc. (or use anchors on single mall.html). Stub out with stop name + description + card grid placeholder. Inventory will populate in later sprint.
   - **Effort:** 2–3 hours (template 1 stop page, duplicate 9 times, update titles/descriptions).
   - **Ships with:** Mall Phase 1 (stops launched, cards to follow).
   - **Acceptance criteria:** Click any stop on mall.html → loads stop page with title, description, grid placeholder, back button.

### 4. **Add "Dare Reports" room to Sorority House + wire Girl Talk game** [P0 for Girl Talk validation]
   - **Impact:** Girl Talk dares should post to Sorority House per canon (girl-talk-dare-validation-plan), but Dare Reports room doesn't exist on sorority-house.html. Without it, Girl Talk posts land nowhere.
   - **Scope:** Add "Dare Reports" to the 10-room grid on sorority-house.html. Wire Girl Talk game (games/girl-talk/) to POST dare completion → Hyvor Talk dare_reports thread + reward_event.
   - **Effort:** 2–3 hours (add room to grid, wire game backend to Hyvor + Supabase).
   - **Ships with:** Girl Talk game launch (Phase 1 feature already mentioned).
   - **Acceptance criteria:** Complete Girl Talk dare → modal prompts "Tell us about it" → posts to Sorority House Dare Reports room (visible to members).

### 5. **Clarify Clubhouse page role + rename if needed** [P0 for UX clarity]
   - **Impact:** Clubhouse page is ambiguous — it's not a canonincal SUNNYVAiLE location, but it shows up in nav. Users may confuse it with Sorority House (the actual members-only place). This is a navigation UX gap.
   - **Scope:** Either (a) rename Clubhouse as "Games Hub" or similar non-building name, OR (b) add Clubhouse to canon as an actual location (what would it be?). Clarify in copy what it is.
   - **Effort:** 1–2 hours (document decision, update nav + page copy).
   - **Ships with:** Next nav refresh.
   - **Acceptance criteria:** Nav/page clearly distinguish Clubhouse (hub/games) from Sorority House (members-only place).

---

## Deferred Items (Not P0, informational)

- **Mavens wing on Sanctuary:** Deferred until Hannah Fry et al. list finalizes. No action needed; placeholder is appropriate.
- **Per-course pages at SUNNYVAiLE High:** Source chapters serve as class content today. Refactor to "class format" pages deferred to Phase 2.
- **Member card dashboard ("See My Card" on MAiKEOVER):** Deferred to Part C (member card + Supabase backend). Promise copy is fine for now.
- **Bulletin Board at Blend & Snap (Level 2 gifting destination):** Deferred per canon. Not urgent.
- **Dream Phone phone-booth page:** Not yet audited (games/dream-phone.html); lives outside building pages.
- **Charm hunt in building images:** Locked mechanic (charms hide in storefront images). Pages have placeholder copy; actual images to follow with Codex render batch.
- **"First time here?" onboarding strip pattern:** Deferred to Phase 2. Can add to 10+ pages as a consistent sub-pattern after Phase 1 core ships.

---

## Summary Table: What's Ship-Ready vs. What Needs Work

| Ship-Ready (P0 complete) | P1 Fixes Needed | P2 Polish / Deferred |
|---|---|---|
| index.html (homepage) | Library (CTA missing) | Clubhouse (clarify role) |
| town-hall.html (locked copy + posters) | MAiKEOVER (minor—all CTAs wired) | Visitors Centre (expand for Phase 2) |
| sanctuary.html (copy + pledge) | Sorority House (add Dare Reports room) | Charm hunt visual assets |
| blend-snap.html (Study Pack, Wednesday lap) | Radio (song CTA missing) | Per-course High pages |
| bronze-aige.html (band + cocktail detail) | Blend & Snap (trading cards CTA) | Bulletin Board |
| sunnyvaile-high.html (7 courses listed) | Post-office (defer gifting to L2) | Mavens portraits |
| chick-flicks.html (rental metaphor) | Town-hall (add Mayor's notes) | Visitors Centre onboarding flow |
| radio.html (songs, anthem) | Sanctuary (song/cocktail/saint CTAs) | Dream Phone page |
| clubhouse-pass.html (signup form) | Visitors Centre (new member flow) | |
| laidies-card.html (Passport shell) | Mall (Directory search + 10 stops) | |
| this-week.html (episode landing) | Clubhouse (rename/clarify role) | |
| episodes.html (catalog) | **Customization CTA routing (5 pages)** | |
| maikeover.html (card sign-up home) | | |

---

## Notes for Implementation

**Styling consistency:** All building pages use `assets/sunnyvaile-page.css` (v=20260629-1) — consistent. Nav uses sv-nav-auth.js (v=20260630-1) — auth-aware, good.

**Image versioning:** All heroes use `?v=20260630-1` cache-bust parameter. When Codex renders new charm-hunt images or band video, update version number globally.

**Canon source of truth:** Always check `operations/voice/laidies-canon-index.md` (in repo) + the memory index above before renaming/relocating buildings. Current canon files locked 2026-06-30.

**Placeholder handling:** Pages with `placeholder--feature` + `placeholder-tag` are intentional deferred features, not tech debt. Don't delete them; they're wayfinding for future sprints. E.g., Mall Directory, Mayor's notes, Mavens.

---

**Audit completed 2026-07-01 by Claude Code file search.**
