# HANDOVER → Codex — LIBRAiRY recovery + building-design plan

Session: 2026-07-23 evening → Thursday morning. Root: `Website-homepage/` (static site served from root; live site is laidies.ai).

**How to read this file:** every claim is tagged **[VERIFIED]** (I checked the live file this session), **[PROPOSED]** (written plan, nothing built), or **[CORRECTED]** (an earlier note was wrong; this is the fix). Do NOT trust the older notes/audits blind — this session found two "done" claims that were false against the live files. **Trust the live file over any note.**

---

> **2026-07-24 correction:** Ali reviewed the referenced source and confirmed
> `_library-v3.html` is old. Its later whole-room shelf mechanic was valid, but
> its masthead/arrival shell was not the page she meant. `library.html` has
> since been separated into a local recovery candidate that arrives directly
> in the straight-on three-case room and keeps the open-in-place reader and
> Miss Jeeves search. Treat the statements below about `_library-v3.html`
> being the live/approved benchmark as historical claims, not current truth.

> **Current execution update 2026-07-24:** `_library-v3.html` now redirects to
> `library.html`, preventing the obsolete mixed shell from appearing as a
> current preview. The Library recovery candidate passed local room, reader and
> Miss Jeeves interaction checks. The Visitor's Centre replacement candidate
> now uses its lobby as the interface: the real map sits in the wall frame,
> unobtrusive hotspots expose building names, desktop destination information
> occupies the board's lower panel, compact widths use one in-room reveal, and
> the named select replaces the seventeen-card roll. Trailer/tour, first route
> and postcard desk remain. Desktop and compact-width checks passed with no
> browser errors. Both candidates still await Ali's ruling and a true <=560px
> browser pass. Comparison proof:
> `operations/design-qa/visitors-centre-20260724/05-library-room-vs-visitor-room-v10.png`.

## 1. TL;DR — what was recorded at handover

- **CORRECTED 2026-07-24:** the LIBRAiRY mechanic worked, but the mixed old/new
  `_library-v3.html` shell was not the approved page Ali expected.
- **Everything else about buildings is a PLAN on paper.** `operations/building-design-briefs/` — nothing built. **[PROPOSED]**
- **Post Office is NOT rebuilt** despite old notes saying "✅ REBUILT." The live page is the old template. **[CORRECTED]**
- **Member/Supabase system IS live** (real config), despite an old note saying "paused." **[CORRECTED]**
- ⚠ **One rule was broken in the library work that you must fix / not repeat:** Claude hand-drew SVG doodles and the plan proposed a "CSS/SVG chrome kit." Ali's rule (locked): **Claude/agents do NOT make art — no hand-drawn SVG, no "shitty CSS things." Art comes from Codex.** See §3.

---

## 2. LIBRAiRY — HISTORICAL HANDOVER CLAIM; SUPERSEDED 2026-07-24

**Promotion:** `library.html` is now a byte-copy of `_library-v3.html` (the working build). The old text-card page is backed up at `_superseded/library-textcards-pre-20260723.html`. Verified served correctly (fragments reachable, v3 markup present).

**The mechanic:** the shelf IS the interface — a 3-bay bookcase composited into a room render; click a book → it opens in place in a designed reader. This is THE model for every other building (see §4).

**Book content — now real** (was teaser-only before):
- Each book has `src:'/content/library-books/rendered/<id>.html'`. The reader fetches that fragment (a single `<div class="gr-page">…</div>`), extracts it, and auto-builds the left TOC from `<h2>/<h3>`.
- Fragments live in `content/library-books/rendered/*.html` (7 books: vocab-101, concepts-101, briefing-101, setup-101, accounts-101, whos-who, straight-answers). ~16,300 words total.
- Rendered from `content/library-books/*.md`; editorial merges per `content/library-books/INVENTORY.md` (e.g. Briefing = handbook ch2 + ch1's "Prompt"; Accounts = ch5 + ch1 privacy; Concepts = ch1 mechanics; Who's-Who = whos-who + ch4 Field Guide).
- Reader styling is a "magazine spread": per-book `--accent` from the book's spine colour, gradient masthead, drop-cap lede, glossary term cards, before/after cards, sourced-receipt cards, confidence badges. This is CSS **typography/layout for text** — allowed; it is not "art."
- Straight-Answers keeps its "Verified June 2026 · recheck when…" stamps (honest perishable-fact presentation). ~70 perishable facts across the books were preserved verbatim, NOT re-fact-checked — a freshness pass is a separate future job.

**Fixes made:** inline `span.term` was boxing a word mid-sentence (fixed with a `span.term` CSS override); the contents rail repeated "Receipts" 15× (filtered out); a missing fragment now falls back to the teaser instead of a raw "404" (`r.ok` check added to the fetch); one anachronism ("maxxing") removed from vocab's intro.

**Decisions of record:** `operations/library-decisions.md` (updated this session).

**Still open on the library (not blocking):** ChatGPT/Claude/etc. tool cards stay `soon:'EP 5'` (Ali's un-gate call). "How to Check" book still shows its teaser — its real content is the live `grimoire/verification-rulebook.html`.

---

## 3. ⚠ RULE VIOLATION TO FIX — Claude-made art (READ THIS)

Ali's locked rule (`no-claude-drawings`, reaffirmed hard this session): **Claude and agents do NOT make drawings, illustrations, SVG art, mockups, or "shitty CSS things." All art comes from Codex, against Ali's references.**

Two places this rule was crossed and you should correct:
1. **The library margin doodles are hand-drawn SVG by Claude** — files in `assets/building-interiors/library-shelf/doodles/` (`cool-s-tile.svg`, `contents-doodles.svg`, `end-doodles.svg`). They render fine, but they are Claude-made art. **Decision needed from Ali:** keep as-is, replace with a Codex-drawn doodle set, or drop. Do not treat hand-drawn SVG as an acceptable pattern going forward.
2. **The building plan proposed a "diegetic CSS/SVG chrome kit"** (stamps, price stickers, pinned notes, etc.) — that is Claude-made art too. **Struck.** Any such "small chrome" must be a Codex render or it doesn't exist.

**Rule for you (Codex) and for any future agent work:** page structure, layout, and text typography in CSS are fine. Anything that is a *picture* — buildings, furniture, characters, stickers, doodles, badges-as-art — is a Codex render composited into the page. Never a hand-drawn/CSS approximation.

---

## 4. Building-design plan — PROPOSALS ONLY [PROPOSED]

Location: `operations/building-design-briefs/`
- `00-MASTER-PLAN.md` — index, shared-kit concept, build sequence, decisions-for-Ali, risks.
- `01-ART-QUEUE.md` — every render the town needs, deduped (~65), grouped by building, marked operable-vs-decorative and exists-vs-new. **This is the Codex art shopping list.**
- 15 per-building briefs: mall, visitors-centre, bronze-aige, sorority-house, maikeover, town-hall, newsstand, luminairy, chick-flicks, radio, blend-snap, shop, madame-claio, fairy-godmother, sunnyvaile-high.

**SOLE MODEL = the LIBRAiRY.** Every brief and the master plan carry a banner saying so. The one page Ali built and approved is the only reference. Concretely that means, per building:
- The room render IS the page (full-bleed; kill the 760px centre column).
- The operable object is a **separate, obviously-clickable Codex render** composited into the room (like a book on the shelf) — **NOT** an invisible clip-path "hotspot" you hunt on a flat photo (hotspot-hunting is banned).
- Click → opens in place (hub-and-reveal, one at a time), page stays ~2,500px, no long scroll.
- State-on-arrival in plain words (the page tells you where you stand).

**Ownership / exclusions:** `sunnyvaile-high.html` is owned by another workstream — its brief is a HANDOFF for coordination, do not edit it from building work. Dream Phone is mid-redesign — do not touch. Post Office (see §5) folds into the queue beside Blend & Snap.

**Recommended first builds (after extracting the shared kit FROM the library):** Visitors Centre → Blend & Snap → NewsStand. Full reasoning in `00-MASTER-PLAN.md`.

**Decisions still on Ali (do not guess these):** break the 760 shell sitewide vs per-page; keeper-at-post policy + naming the two unnamed keepers; Gift Shop location/name/timing; address collisions (Mall vs MAiKEOVER both claim MAiN No.9; Mme CLAi-O No.5 vs No.6); audio policy; ornate-register exemptions (CLAi-O velvet, FG cottage); which building rebuilds first.

---

## 5. Post Office — NOT rebuilt [CORRECTED]

Old notes/audit said "✅ REBUILT 2026-07-22 — the PO-box wall IS the interface." **False.** Verified this session: live `post-office.html` is **byte-identical (9,808 bytes) to `operations/_backup-post-office-20260722-preredesign.html`** — the old 760px-column, building-as-header, gold+plum template with zero operable mechanic. The clip-path rebuild attempts (v1/v2) were rejected by Ali and never stuck. It needs building the LIBRARY way like everything else. Corrected in `operations/post-office-mechanic.md` (memory), `operations/building-mechanic-audit-2026-07-22.md`, and the master plan.

---

## 6. Phantom sweep — 15 "shipped" claims checked against live files

Method: read the live file, confirm the named function/selector/asset is present + wired; diff against any backup. Results:

**Real & wired [VERIFIED]:** High class wrapper (`learn/class.html` + `content/site/high-classes.json`); High Report Card + Yearbook (`sunnyvaile-high.html`, derived from `laidiesQuizProgress`); Chick Flicks shelf system (`chick-flicks.html` — real Codex art: shelf parts, VHS box art, aisle signs all present); Bronze happy-hour tools (`bronze-aige.html` — date/time + .ics + episode-aware menu); Verification Rulebook (`grimoire/verification-rulebook.html`, real page, wired from issue-03); Town Wallet + Butterfly Clip Jar + Report Card tiles (all in **`laidies-card.html`** — that IS the Closet, not `reference-closet.html`); merit-sash emitters (`script.js`); KSVL cross-page player (`content/site/ksvl-player.js`, on 72 pages); resident-blocks SQL (`supabase/migrations/20260723000000_resident_blocks.sql`, functions defined + `send_resident_mail` respects blocks); `watch.html` (hybrid — plays CapCut MP4s for eps 01/02/04, cue-stills fallback otherwise).

**Member/Supabase system is LIVE [CORRECTED]:** `content/site/supabase-config.js` has a real `https://…supabase.co` URL + a real 46-char anon key; `isMemberAuthConfigured()` returns true. So magic-link sign-in and reward sync are wired. (Earlier I wrongly said "paused" from a stale note — that was wrong; member magic works. Whether every table is deployed in the live project was NOT verified end-to-end — if you touch this, check the running DB.)

**Overstated [CORRECTED]:** SUNNYVAiLE High "class currency/script checker" — the spec + Codex-review brief + `class-currency-state.json` are real (`operations/classes/`), but the "calibrated mechanical checker/freshness flagger" is a **documented rubric, not an executable script**. "SHIPPED" overclaimed the automation.

**Minor:** `community/laidy-spotlight.html` is retired (redirect stub) but `scripts/run-weekly-production.js:954` still writes to that path — cleanup.

---

## 7. Locked rules Codex must follow (the ones that came up this session)

- **Art = Codex only.** No Claude/agent-made SVG, illustrations, or CSS-as-art. (§3)
- **Library is the sole model** for building rebuilds. No hotspot-hunting; operable objects are separate obviously-clickable renders opened in place.
- **Retired: gold + plum.** Use the homepage candy palette (pink #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7; ink #3a1838). Plum only ever comes from artwork, never panel fills.
- **No 760px centre column; no long scroll (~2,500px target); state-on-arrival; hub-and-reveal; no emoji in UI chrome; Y2K-honest storefront art; populated shots = Y2K women / storefronts empty.**
- **Brand spelling:** bare acronym is "AI" (both caps); accented "Ai" only inside brand words (LAiDIES, SLAiYER, LIBRAiRY, etc.).
- **Heroine canon:** different outfit each week, 90s-styled hair.
- **Don't self-certify:** "done" = a re-runnable check passed or Ali's verdict — never an agent's own claim. Don't remove working features.

---

## 8. Suggested next steps (small, one at a time — confirm with Ali first)

1. Ali decides on the library doodles (§3): keep / Codex-redraw / drop.
2. Ali picks the first building to rebuild (recommended: Visitors Centre) and answers the §4 decisions for it.
3. Extract the shared kit from `_library-v3.html` (room-stage, open-in-place reader/panel, full-bleed page shell, mobile restack) into shared includes — NO Post Office dependency.
4. Commission the first building's Codex renders from `01-ART-QUEUE.md` (straight-on, RGBA where it composites, text rendered in-generation).

---

## 9. Cautions for whoever picks this up

- **Cost matters to Ali.** This session's overnight multi-agent runs burned a lot of her paid usage and pushed her into overage — she was rightly upset. Do NOT kick off big/multi-agent/overnight jobs without her explicit okay knowing the cost. Small and specific by default.
- **Trust live files, not notes.** Two "done" claims this session (Post Office rebuilt, member magic paused) were false against the live files. Verify before stating.
- Nothing in `operations/building-design-briefs/` is approved or built. It is a proposal for Ali to accept, reject, or reorder.
