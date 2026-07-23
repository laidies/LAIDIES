# Overnight work log — night of 2026-07-15 → 16

Goal (Ali): get the site in the best shape possible for a launch announcement tomorrow; as much live & functioning as possible. Guardrails: deploy only VERIFIED changes, scoped commits, never `git add -A`, don't touch the ~476 other uncommitted files, no voice/design judgment calls.

## ☀️ MORNING SUMMARY (read this first) — updated after night 2

**Site is launch-healthy.** Full scan (both nights): 121 live pages / 2,311 links = zero broken links, zero missing images, zero console errors on every key page. Honest "coming soon" labels only. No embarrassing half-built sections.

**Your charm question:** *No, there were no Ep4 charms* — the hunt only had Weeks 1–3. **I built Week 4 ("The Keepsake Set", 7 charms)** and it works end-to-end (building-page hunt → collect → Closet bracelet). Art is pending — see `IMAGE-PROMPTS.md` (7 prompts); until then they show as emoji. I also fixed **2 latent charm bugs** found while testing (emoji fallback never rendered).

**Shipped & deployed to `main` this session (all verified):**
- ✅ **Week 4 charms** + 2 bug fixes (`charm-hunt.js`)
- ✅ **Perf: lazy-loaded ~30MB** of below-the-fold portraits on the LIVE `issue-04.html`, +~100MB on `issue-04-v4.html`. (Night 1: sorority hero.)
- ✅ **Fairy Godmother** — new exterior cottage hero (banner, optimized 531KB)
- (Night 1) ✅ Sorority House — new Delta LAi Nu sunset hero (512KB)

**Waiting on you (I can't decide these solo):**
1. 🚩 **Episode template** — site links Ep04 to the OLD `issue-04.html` (polished, fine). Your dark-VHS `issue-04-v4.html` (new rail + now perf-optimized) is built but orphaned. Go live = one-line ×3 files. Your centerpiece call.
2. **Mme CLAi-O storefront** — the render you picked is *portrait*, which crops to just the sign and kills charm-hiding (it's a charm building). I reverted my attempt and wrote a prompt for a **landscape re-render** that'll swap in cleanly (`IMAGE-PROMPTS.md §2`).
3. **Deep image optimization** — 197 images ≥500KB. Lazy-loading now covers the worst pages; the remaining fix is shrinking the 3.5MB source portraits (supervised batch — risky to bulk-run on iCloud binaries). §6.
4. **Charm coords** — sorority + Mme CLAi-O heroes changed, so those charm-buildings' coords need a quick `?charmDev=1` re-tune (charms still work). `IMAGE-PROMPTS.md §3`.

Everything scoped + reversible + logged. Deploys: `bcb06ee` (sorority) · `35ef231` (charms) · `97a4bdd` (perf) · `11ed494` (FG).

---

## Status legend: ✅ done+deployed · 🔵 done, staged (not deployed) · 🔎 investigating · ⏸ needs Ali

---

## Findings & work

### 1. Broken links / missing assets — ✅ CLEAN
Ran a deterministic scanner over 121 live HTML pages / 2,311 internal refs. **Zero real broken links or missing images.** All 12 scanner flags were JS-dynamic paths (`${photoSrc}`, `/assets/avatars/claires/claires-avatar-`+n) or protocol links (`sms:`) — verified every asset folder is populated (claires 22, mavens 24, charms 26, ksvl stickers 21, puffies 126). Good launch signal.

### 2. Placeholder / half-built inventory — ✅ ALL BENIGN
Only 5 live pages have "coming soon"/TODO markers, all **honestly-labeled future features** (correct per your "honest labels are fine" rule):
- `index.html` — "Mail … Coming soon" (Post Office L2 gifting)
- `chick-flicks.html` — "EP 05 · Coming soon" (Ep05 IS still draft — correct)
- `library.html` — "The Prompt Cookbook … coming soon" (future book)
- `luminairy.html` — "Deep-dive per-saint pages coming soon"
- `games/girl-talk.html` — internal code TODOs (not user-visible)
No embarrassing half-built sections.

### 3. Live functional QA — ✅ CLEAN so far
Console-error + render checks (no errors on any): homepage, maikeover (card builder), laidies-card (Closet), learn/quiz, issues/issue-04.html (live episode page). HTTP sweep of all ~20 building/core pages = all 200 (the one "404" was my curl guessing the wrong path; fairy-godmother lives at `games/fairy-godmother.html` and is linked correctly).
- **Note:** I deliberately did NOT load audio-autoplay pages (radio/KSVL, saint-song players) — preview audio bleeds to your Mac speakers and you're asleep. Those need a quick check when you're up.

### 4. Building art swap (approved 2026-07-15) — 🔵 1 done (staged), 2 held
- ✅ **Sorority House (Delta LAi Nu)** — swapped the `sv-hero` to your new sunset exterior render. Optimized the 2.8MB PNG → 512KB JPEG (`sips`) so it doesn't tank load time. Verified on-page: banners cleanly, sign centered, header legible. **Staged for deploy.**
- ⏸ **Mme CLAi-O** (`games/madame-claio.html`) — HELD. Its current hero is an *interior* (reading room), and your chosen file is a *pixel*-style render from a different art track than the photographic sorority one. Interior→exterior + photo-vs-pixel = your call.
- ⏸ **Fairy Godmother** (`games/fairy-godmother.html`) — HELD. Current hero is an *interior* parlor; page uses a custom layout (no `sv-hero`), so the swap needs a layout fit-check. Your call.

### 5. 🚩 BIGGEST LAUNCH DECISION — the episode template
The whole site (episode-index.json, chick-flicks.html, index.html) links Ep04 to **`issues/issue-04.html`** (the light "magazine" template). Your **dark-VHS `issue-04-v4.html`** — the one you approved as the direction, with the new 6-building rail + plum header I built/deployed — is **orphaned (nothing links to it)**.
- The **live** page (issue-04.html) is genuinely polished and launch-ready — clean plum hero, legible header, no errors. So launching on it is fine.
- But if you want the dark-VHS v4 live for the announcement, it's a one-line change in **3 places** (episode-index `issueUrl`, chick-flicks link, index link). I did NOT do this — it's the migration you said you're reviewing, and I won't flip your centerpiece page's whole template blind. **Your call in the morning.**

### 6. 🚩 Load-performance finding (report only — did NOT bulk-fix)
**197 referenced images are ≥500KB**, and several multi-MB portraits are **eager-loaded on live launch pages**:
- `assets/mavens/y2k-stained-glass-v2/ada-lovelace-…png` — **3.5MB, EAGER, on the LIVE `issue-04.html`**
- `luminairy.html` pulls **dozens** of ~3.5MB stained-glass portraits (saints + mavens + builders) — that page is likely 40–60MB
- Town Hall: four Deb posters at **~7.6MB each** (but these are print-intended `assets/printables/` and lazy — probably leave hi-res)
- `issues/issue-04-v4.html` episode scenes ~3.5MB each

**Why I didn't auto-fix it:** bulk-optimizing ~197 iCloud-synced binaries unattended is risky — stained glass may have transparency (JPEG would wreck it), each portrait needs a display-size/quality judgment, and no `cwebp`/ImageMagick here (only `sips`). This wants a **supervised batch pass** (resize-to-display-dims + webp) or Codex-delivered optimized assets. The sorority swap (2.8MB→512KB) is the pattern.
**Recommended priority:** the portraits on `luminairy.html` and the eager one on `issue-04.html` first — those hit launch-day traffic hardest.

### Deploys this session (all scoped, verified)
- (earlier) `5bd7fd6` — happy-hour tools, Ep04-v4 rail, watch.html title fix, ep3/4 cue sheets
- (pending) sorority-house hero swap → deploying now

---

# NIGHT 2 (2026-07-16) — "build & fix whatever you can; have image prompts ready"

### A. Week 4 charms — ✅ BUILT + deployed (`35ef231`)
Answered "charms for Ep4?": there were none (hunt had Weeks 1–3 only). Built **Week 4 · The Keepsake Set** — 7 charms across the 7 charm-buildings (mood ring, gel pen, disco ball, evil eye, heart locket, award rosette, movie ticket) in `content/site/charm-hunt.js`. Verified end-to-end in the browser: sparkles render on building pages when week 4 is unlocked, collect flow + toast work, the Closet shows a "Week 4 · The Keepsake Set" bracelet and archives 1–3 in the Jewelry Box. **Art pending → `IMAGE-PROMPTS.md §1` (7 prompts).** Until art lands they render as emoji (verified working).
- **Also fixed 2 real bugs** in the charm image fallback (would've hit ANY future art-less charm): `onerror` removed the `<img>` before reading its sibling (emoji never un-hid), and `loading="lazy"` meant the transient toast image never loaded/errored. Both fixed.

### B. Performance — ✅ lazy-loading done + deployed (`97a4bdd`)
Found the live `issue-04.html` was eager-loading **17 stained-glass portraits (~3.5MB each, all below the fold) = ~30MB** blocking initial load. Made them lazy (hero is text, so safe). Did the same on `issue-04-v4.html` (18 more heavy `<img>`s; hero is a CSS background, left eager). Verified: heroes render, 0–2 heavy imgs load pre-scroll, no console errors. Checked the rest of the site — no other live pages have heavy eager images (only single printable-content images, which should be eager). **Lazy-loading pass = complete.**

### C. Building art swaps — ✅ Fairy Godmother deployed (`11ed494`); Mme CLAi-O reverted → prompt written
- **Fairy Godmother** (`games/fairy-godmother.html`): swapped the interior-parlor hero for your approved exterior cottage render (landscape 1672×941 → 531KB JPEG, compact banner). Verified via screenshot — banners cleanly, interior pixel art still appears lower on the page. Shipped.
- **Mme CLAi-O** (`games/madame-claio.html`): tried the swap, **reverted** — the render is portrait so it crops to just the sign and leaves nowhere to hide the page's 4 charms. Wrote a landscape-re-render prompt instead (`IMAGE-PROMPTS.md §2`). Page unchanged (still its interior hero).

### D. Deliverables for you
- `IMAGE-PROMPTS.md` — 7 charm prompts + Mme CLAi-O landscape prompt + charm-coord re-tune to-do.
- Optimized JPEGs staged and ready: FG (used), Mme CLAi-O portrait (`…/episode-pixel/webjpg/06-mme-claios-shop-v5.jpg`, unused — in case you want the portrait crop).

### Night-2 deploys
- `35ef231` charm-hunt.js (Week 4 + fixes) · `97a4bdd` Ep04 lazy-load perf · `11ed494` Fairy Godmother hero

---

# SESSION 3 (2026-07-16, daytime) — "apply the dark template to all episodes + Ep04-style images"

### A. Whole-season pixel-art image briefs — ✅ DONE + deployed (`7fbf32f`)
Wrote Codex scene briefs for Ep01/02/03, matching the Ep04 pipeline:
`operations/codex-brief-episode-0{1,2,3}-pixel-art-scenes.md`. Each references the Ep04 brief for shared style/format/heroine/output, and supplies only its own shot list (drawn from that episode's canon beats) + wardrobe look (Ep01=Look1…Ep04=Look4). **The Heroine is reused across the season** — no new character sign-off. Ep01: 11 scenes, Ep02: 9, Ep03: 10. Homage beats (Cher's closet, Burn Book, Elle's courtroom, Spice Girls, David Rose) written as "evoke the moment in the pixel style," consistent with the brand's saint renders.

### B. Ep04 dark migration — ✅ ALREADY DONE by you (`4476e48`), verified healthy
You (or Codex) migrated Ep04 to the dark template while I worked: `issue-04.html` IS now the dark VHS page (dark bg + VT323 + pixel hero + my 6-building rail), old magazine preserved as `issue-04-magazine.html`. I verified it renders + links correctly. Nothing for me to do there.

### C. Ep03 dark-template port — ✅ CONTENT COMPLETE + committed (`7ade365`), NOT yet linked
**UPDATE:** Ali confirmed the facts were verified during the article, and Codex has made the Ep03 images (watchable-sequence pipeline, in `assets/video/.safe-v7/` etc.). So I finished the full port. `issues/issue-03-v4.html` now has the complete Ep03 article on the dark-VHS template (all sections from `issue-03-reskin.html`), verified rendering (dark, no console errors). **Scenes wired to `assets/episodes/ep-03/pixel/ep03-scene-*.png`** — Codex/Ali needs to place the final article stills there (or copy from the video pipeline) and the page lights up. **Promote to `issue-03.html` once art is placed** (like Ep04's `4476e48`). Ep02/Ep01 ports: same pattern, not started.
_(original note, for history:)_ 🔵 STARTED (draft, uncommitted, NOT linked)

### C2. Ep01, Ep02, Trailer dark-VHS ports — ✅ ALL BUILT + committed (not yet linked)
Ported in parallel (via subagents, each verified by me: dark, 0 forbidden content, no console errors). The **whole season is now on the dark-VHS template**:
- **Ep04** — LIVE at issue-04.html (your `4476e48`).
- **Ep03** — `issue-03-v4.html` (`7ade365`) — awaiting art.
- **Ep02** — `issue-02-v4.html` (`821adf4`) — awaiting art.
- **Ep01** — `issue-01-v4.html` (`5cd5934`) — awaiting art.
- **Trailer** — `issue-trailer-v4.html` (`e11755d`) — FULLY ILLUSTRATED (uses existing y2k-v3 building renders for its 8-stop tour), so it can be linked now.

Ep01/02/03 scenes wire to `assets/episodes/ep-0N/pixel/ep0N-scene-*.png` (per each codex brief) — placeholders until Codex's stills are placed there, then **promote each `issue-0N-v4.html` → `issue-0N.html`** (one-step, like Ep04's `4476e48`).
Discovered `issues/issue-0{1,3}-reskin.html` are **tightened content versions** (not dark ports) — good prose sources. Built `issues/issue-03-v4.html` = clone of the Ep04 dark template with the shell being ported to Ep03 (hero, spine, Previously, cold-open done; wired to `ep03-scene-*` paths). **The rest of the body is still Ep04 content** — a big fact-carrying port (KPMG 40/45, Nature/Stanford 2026 claims) that needs your fact-verification, and the page can't go live until ep03 pixel art exists anyway. So I stopped at a clean, clearly-marked draft (see the `<!-- DRAFT -->` banner at top of `<main>`) rather than rush it.
- **Turnkey finish:** prose from `issue-03-reskin.html` → v4 `.mark`/`.film` sections, scenes per the Ep03 brief. Sections: Burn Book Problem · She Doesn't Even Go Here · Elle Would Like To See The File · Cher's Closet (Draft/Claim/Receipt) · Chutney Can Say It Thrice (VERIFY the KPMG/Nature/Stanford facts) · David Meet Elle (method) · Receipts Pass (handoff). Then title/meta, hero-bg url, rail (→ep=03), cocktail, NEXT (→Ep04), vocab (Ep03's 3 words). Promote to `issue-03.html` (like Ep04) only once art lands.
- Ep02/Ep01 ports: same pattern, not started.

### Session-3 deploys
- `7fbf32f` Ep01–03 pixel-art scene briefs. (Ep03 port draft is intentionally uncommitted.)

