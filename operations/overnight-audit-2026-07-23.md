# Morning-Ready Site Audit — 2026-07-23

Overnight verification pass. Every row below was checked against live code / files / DB — not memory. **37 confirmed gaps**, 3 refuted false-alarms, 2 card/image prompt sets ready to render.

Read [PAGE EXPERIENCE STANDARD] and the operating notes before acting. Audit was read-only; nothing here was edited. Fixes are described, not applied.

A note on duplication: several gaps are the *same underlying feature* flagged from different surfaces. The big clusters:
- **Gifting / Post Office mail** → rows for Post Office page, Closet send block, "send a gift" (one feature, three copies of the promise).
- **Trading** → game page, Closet binder, homepage (all ride the unbuilt mail path).
- **Book Fair redemption "lands in your Closet"** → redemption logic, promise copy, clip-burn (one honesty bug).
- **Book Fair drop art (8 renders)** → listed twice (page + art).
- **Concept cards / keeper cards** → prompt-exists row + not-rendered row for each.

Fix the feature once and multiple rows close together.

---

## 1. CONFIRMED GAPS — ranked by member impact

| # | Item | State | Impact | Needs Ali? | What it needs |
|---|------|-------|:-:|:-:|---------------|
| 1 | Post Office "Notes & Gifts" card promises notes/gifts/card-mail/hall-pass in present tense (`post-office.html:90`) | PROMISED-ONLY | 5 | Yes | Reword to "Coming soon" to match `index.html:725`, OR wire Closet send UI + PO-box inbox to the existing `send_resident_mail`/`my_resident_mail` RPCs |
| 2 | Book Fair redeemed drops claim to "land in your Closet" but nothing ever renders after clips are spent (`bookfair.html:89,187`) | PROMISED-ONLY | 5 | Yes | Build Closet render paths reading `laidies_bookfair_redeemed` (poster→wall, holocard→binder, badge→sash, stickers→puffy board), OR stop claiming the landing |
| 3 | `bookfair.html` — 8 drop cards have no art (`assets/bookfair/` dir does not exist) | MISSING-ART | 4 | Yes | Generate/approve 8 `bf-*.png` into `assets/bookfair/` (create dir); prompts staged in `IMAGE-PROMPTS.md §6` |
| 4 | `shop.html` — 13 products, 0 working checkouts (all `buyUrl:"#"`), 7 `img:null` | PARTIAL | 4 | Yes | Paste real Printful/Gumroad hosted-checkout URLs into each `buyUrl` (see `shop.html:102-111`); supply art for 7 img-null products |
| 5 | Send a note/gift via Post Office — backend built, **zero frontend callers** | PROMISED-ONLY | 4 | No | Wire `send_resident_mail` into a compose control + render `my_resident_mail` as a PO-box inbox. Closet stub at `laidies-card.html:1070-1072` |
| 6 | Book Fair reward redemption — clips subtract but nothing lands in named vessels | PARTIAL | 4 | No | Closet must render redeemed drops into their `lands` vessels; redemption never writes a `member_reward_event` (`laidies-card.html:2631`) |
| 7 | Town Hall Mayor Deb "Read her whole story ↓" card → dead `#about-mayor-deb` anchor (`town-hall.html:320`) | BROKEN | 4 | No | Repoint href to `#hub-deb` (+ trigger hub open) or `/post-office.html`. 3 sibling cards work; this one visibly does nothing |
| 8 | `games/trading-cards.html:956` "Trading is on for both decks" — no trade mechanism exists | PROMISED-ONLY | 4 | Yes | Reword to "coming soon" or build gifting transfer. Also fix `:797` "earned by visiting a character" (contradicts locked pack economy) |
| 9 | Book Fair "Redeem clips → lands in Closet" — clips spent, promised good never appears (dup of #2/#6, BROKEN framing) | BROKEN | 4 | Yes | Render redeemed drops as a Closet vessel OR build the real Scholastic Fair. Also: meta says "SUNNYVAiLE Book Fair" (`bookfair.html:7`) vs locked "keep it scholastic" |
| 10 | Pack-granting — nothing grants a member a pack; `member_packs`=0 rows, no grant fn | STUB | 4 | Yes | Server-side `grant_pack()` (SECURITY DEFINER) called by building-visit / week-complete events; decide which events grant + throttle |
| 11 | Member-to-member card trading — no trade/send UI anywhere | PROMISED-ONLY | 3 | No | Depends on `resident_mail` carrying a `card_id` + a "send duplicate" binder control. Blocked on gifting shipping first |
| 12 | Town Leaderboards — placeholder teaser only (`laidies-card.html:1550-1557`), CSS unused | PROMISED-ONLY | 3 | Yes | Public aggregate over `member_reward_events` + privacy/opt-in decision + enough residents. No public SELECT policy exists |
| 13 | Book Fair drop art (8 renders) — none exist on disk (dup of #3, member-facing framing) | MISSING-ART | 3 | Yes | 8 Codex renders into `assets/bookfair/`; prompts in `IMAGE-PROMPTS.md §6` |
| 14 | Puffy sticker board — mechanic works but empty-state points at `library.html` which has zero puffy buttons | PARTIAL | 3 | No | Either add `data-puffy-title` anchors + script to `library.html`, or repoint empty-state copy to the Handbook (`puffy-bookmarks.js:95`) |
| 15 | Closet Trading Card Binder "Trade with other residents" — flat present tense, unhedged (`laidies-card.html:1479`) | PROMISED-ONLY | 3 | Yes | Reword to match hedged Send-a-Note sibling, or build trading |
| 16 | Homepage "trade them with other residents" (`index.html:724`) contradicts its own "Coming soon" (`:725`) | PROMISED-ONLY | 3 | Yes | Make trading claim match the "Coming soon" hedge until gifting ships |
| 17 | Gift Shop hero "ships straight to a friend… at checkout" (`shop.html:74`) — no checkout exists | PROMISED-ONLY | 3 | Yes | Reword hero to future tense until a checkout URL is wired. Downstream: `bookfair.html` "Order a real one" links into a dead store |
| 18 | Puffy bookmarks "Place a puffy" — live only on Handbook; index/bookfair/library/newsstand/etc have 0 anchors | PARTIAL | 3 | No | Add `id` + `data-puffy-title`/`data-puffy-summary` to real reference sections (start with `_library-v3.html`). Mechanical, no art |
| 19 | `games/trading-cards.html` live game — client-side RNG, free Open Pack, Reset button (all banned by locked economy) | BROKEN | 3 | No | Rewrite to call `open_pack()`/`my_pack_status()` via Supabase, gate on sign-in, remove Reset + free pack, show pity. (.html edit — deferred) |
| 20 | Hall Pass — static fake "1" badge (`laidies-card.html:1487`), never updated | STUB | 2 | Yes | Girl Talk dare-validation (deferred by Ali) + earn/spend ledger for passes |
| 21 | 20 concept-card pop-art fronts — none rendered; only 8 differently-named old renders exist | PROMISED-ONLY | 2 | No | Run 20 Codex jobs (front/back/foil per locked system) then wire. Prompt: `operations/codex-prompts/_concept-cards-popart-by-episode.md` |
| 22 | 12 character keeper cards — none rendered; only jojo prototype exists | PROMISED-ONLY | 2 | Yes | Render 3 faces per keeper, one per send. Some keepers lack an approved portrait — face choices flagged at bottom of `_character-cards-remaining-12.md` |
| 23 | DJ SunnyV resident-card avatar — points at nonexistent `y2k-portraits/` dir → empty avatar box | BROKEN | 2 | No | Repoint `character-cards.json:39` to `assets/town-characters/scenes/dj-sunnyv-scene.png` (curation-'correct') or render a portrait |
| 24 | Mme CLAi-O + FAiRY Godmother resident-card avatars point at curation-**redo** renders | MISSING-ART | 2 | Yes | Re-render both to current character-face standard (credits renders), then repoint `character-cards.json:9,24` |
| 25 | Town Hall Regulars gallery — all 4 portraits use curation-**redo** pixel renders (`town-hall.html:305,312,320`) | MISSING-ART | 2 | Yes | Swap to current credits-render faces or re-render pixel set. Ali owns which face is canon |
| 26 | LIBRAiRY reader TOC fallback links are bare `href="#"` dead links (`library.html:359-360`) | PARTIAL | 2 | No | In fallback branches render TOC as plain text or wire the same scroll-to-id as the success path. Note: book "how-to-check" hits this on its *normal* path |
| 27 | Book Fair "downloaded to print" — every download link is `#`, flips to "Coming soon" | PROMISED-ONLY | 2 | Yes | Produce printable assets (Codex art) or drop the "downloaded to print" phrase from intro copy |
| 28 | Send a gift via Post Office — honestly labeled "Soon"; server layer already built, no client wiring | PROMISED-ONLY | 2 | Yes | Client-only work: send UI + PO-box inbox calling deployed `send_resident_mail`/`my_resident_mail`. (Server build is DONE — see refuted note) |
| 29 | 12 keeper character-card prompts staged but 0 rendered; keepers not even DB rows | PROMISED-ONLY | 2 | Yes | Run Codex on all 12 (front+back+foil, ~36 renders), seed 12 `card_definitions` rows |
| 30 | 20 concept-card prompts staged; 20 DB rows seeded with 0 art; on-disk PNGs are retired style | PROMISED-ONLY | 2 | Yes | Run Codex on 20 (front+back+foil), set `art_front/back/foil` on existing rows, replace old ep01/ep04 PNGs |
| 31 | Sign-in gating — server RPCs correctly auth-gated but live page never calls them | PARTIAL | 2 | No | Covered by the front-end rewrite (#19); no new server work |
| 32 | SAiNTS cards — roster mid-recast; portraits are rejected drab v2; none in `card_definitions` | PARTIAL | 2 | Yes | Finalize roster (list, duo song, recast), decide if saints become pop-art cards, re-render luminous, then commission fronts/backs/foils + seed rows |
| 33 | MAiVENS cards — roster locked, luminous v3 portraits done, but not pop-art cards; 0 in `card_definitions` | PARTIAL | 2 | Yes | Decision: do MAiVENS become trading cards or stay LUMINAiRY gallery only? If cards: commission pop-art front/back/foil + seed rows |
| 34 | TRAiLBLAZERS cards — roster locked but portraits still rejected drab v2 (never got v3 re-roll); not cards | PARTIAL | 2 | Yes | Re-roll 6 builder portraits to luminous v3 (owed), then decide card format + commission + seed |
| 35 | Referenced audit `operations/member-promises-audit-2026-07-22.md` does not exist | MISSING-ART | 1 | Yes | Confirm whether it was ever written / under another name. This report stands in as the member-mechanics audit |
| 36 | `card-packs.json` deck shows placeholder/duplicate art; 8 real concept + 4 jojo renders orphaned | STUB | 1 | No | Decide concept-card surface, stop pointing at curation-'unused' webp placeholders, wire real renders once cards exist |
| 37 | Reproducibility gap: `20260722234500_..._finish_aware_open.sql` drops `open_pack` but never recreates it | PARTIAL | 1 | No | Paste live finish-aware `open_pack` body into the migration so `db reset` reproduces the DB. (Code edit — flagged) |

---

## 2. NEEDS ALI (decisions / assets / credentials)

Human-blocked items pulled out. These cannot be finished by an agent alone.

**Credentials / commerce (blocks monetization):**
- **Printful/Gumroad checkout URLs** for `shop.html` — 13 products, all `buyUrl:"#"`. This is the monetization-priority page and is not commerce-ready. Only Ali can create the products + connect payments (`shop.html:102-111`, `monetization-priority.md`). (#4, #17)
- **Product art** for 7 `img:null` shop items (four tees, NOPE Pad, Tote, KSVL Mix).

**Copy decisions (honesty — reword vs build):** each of these states a live capability that isn't built. Ali decides reword-now vs build:
- Post Office Notes & Gifts (`post-office.html:90`) (#1)
- Trading claims: game page `:956` (#8), Closet binder `:1479` (#15), homepage `:724` (#16)
- Gift Shop hero (`shop.html:74`) (#17)
- Book Fair "downloaded to print" (`bookfair.html:89`) (#27), "lands in your Closet" (#2)

**Roster / canon decisions (block all three pantheon card decks):**
- **SAiNTS roster finalize** — J.Lo→Bette Midler recast, Cher+Dionne duo owes a new duo song, Golden Girls added; songs/portraits/cascade owed for 4 new saints. Then: do saints become pop-art cards? (#32)
- **MAiVENS** — do they become trading cards or stay LUMINAiRY gallery portraits? Portraits already done. (#33)
- **TRAiLBLAZERS** — 6 builder portraits owe a luminous v3 re-roll (never done); then card-format decision. (#34)

**Art re-render / approval (Ali owns face canon):**
- Mme CLAi-O + FAiRY Godmother resident-card avatars (curation-redo) (#24)
- Town Hall 4 Regulars portraits (curation-redo pixel) (#25)
- Book Fair 8 drop renders — approve (#3/#13)
- Character keeper face choices flagged at bottom of `_character-cards-remaining-12.md` (#22)

**Design decisions:**
- Pack-granting: WHICH events grant packs + the throttle (#10)
- Leaderboards: privacy/opt-in + which rankings (#12)
- Hall Pass: depends on Girl Talk (Ali marked deferred) (#20)
- Confirm the missing prior audit doc name (#35)

---

## 3. REFUTED — already built, do not re-chase

The auditor was **wrong** on these. Do not spend morning time re-verifying.

1. **Charms are NOT localStorage-only.** The "Yours across every device" Closet promise is broader than claimed. `laidies_charms_found` is emitted as `hidden_charm` events, upserted to `member_reward_events` on sign-in (`script.js:2535-2946`), and the Closet charm bracelet renders directly from Supabase (`laidies-card.html:2186-2236`). Charms round-trip across devices for signed-in members. The auditor relied on a stale 2026-07-10 note. **Genuinely local-only:** puffies, Book Fair ledger, Hall Pass counter, numeric clip-jar totals. Charms are NOT in that list.

2. **Ep3 section art is NOT curation-redo on the live page.** The live Ep3 page is `issues/issue-03.html` (comic/pixel VHS, newest file, linked from `index.html:593` + chick-flicks). It uses `assets/episodes/ep-03/comic/*.png` + `pixel/*.jpg` — none of the 8 flagged `section-*.jpg` redo images. Those 8 live only in `issues/issue-03-magazine.html`, which **nothing in the repo links to** (orphaned). No live MISSING-ART issue exists here.

3. **Girl Talk IS gated.** `games/girl-talk.html:1263-1296` has a working Residents-only gate (in the closing `<script>`, which the grep missed): `hasSession()` validates the Supabase auth token, `hasCard()` checks the username, `gate()` hides `<main>` and injects a "Residents only" door for anonymous visitors. It does NOT "play fully anonymous." *Real* secondary gaps remain (accepts a local username flag rather than a live session; still writes to `laidies_gt_*` localStorage; stale "when sign-in lands" copy at lines 679/693/723) — but the headline "ungated, zero session check" is false.

Also worth banking (from the confirmed notes, corrects a stale "server build needed"): the **resident_mail server layer is already deployed** — `supabase/migrations/20260722214500_resident_mail.sql` created a live `resident_mail` table + `send_resident_mail()`/`my_resident_mail()` SECURITY DEFINER RPCs (Supabase project `swqnkxzebxdbgyrzpdne`, ACTIVE_HEALTHY, not paused). Gifting/mail remaining work is **client wiring only**, not a server build (#5, #28).

---

## 4. READY TO RENDER — prompts exist, just need Codex

These prompt files are written and carry the correct card rules (halftone/candy/1200×1680, hook-exempt via leading underscore). They only need Codex render jobs + wiring.

- **`operations/codex-prompts/_concept-cards-popart-by-episode.md`** — 20 concept-card fronts (agent, hallucination, rag, token, temperature, context-window, prompt-engineering, embedding, fine-tuning, grounding, guardrails, inference, multimodal, system-prompt, chain-of-thought, few-shot-learning, chutney-detail, elle-prompt, receipts-check, burn-book-sourcing), each FRONT/BACK/FOIL. 20 DB rows already seeded with 0 art — set `art_front/back/foil` after render. (#21, #30)
- **`operations/codex-prompts/_character-cards-remaining-12.md`** — 12 keeper cards (Paige, Penny, Becky, June, Cosmo, Matron Lumen, Paulette, Miss Jeeves, Mayor Deb, Mme CLAi-O, DJ SunnyV, FAiRY Godmother), each FRONT/BACK/FOIL (~36 renders). One keeper per send. **Face choices for keepers without an approved portrait are flagged at the file's bottom — Ali picks first.** Then seed 12 `card_definitions` rows. (#22, #29)
- **Book Fair 8 drops** — prompts staged in `IMAGE-PROMPTS.md §6 "Book Fair exclusive drops (8) — PRIORITY"`. Render 8 `bf-{wallpaper,badge,bookmark,stickers,postcard,zine,holocard,poster}.png` into `assets/bookfair/` (create the dir). (#3/#13)

**NOT ready — do not send yet:** `operations/codex-prompts/builders-portrait-batch.md` is written but is the **rejected drab-v2 style** (roses/scrolls/chapel-light per `card-art-luminous-revered.md`). It needs a luminous-v3 rewrite before rendering (#34).

Gold-standard bars to match: FRONT/BACK = pop-art (halftone, candy) per `tradingref-01..04`; FOIL = separate full-holo render, bar = `assets/cards/characters/jojo-card-front-foil-v2.png`. No CSS foils.

---

## 5. Recommended morning order

1. **Cheap honesty wins first (copy reword, minutes each, closes 6 rows).** Decide reword-vs-build for the promise cluster and, if rewording, hedge to "Coming soon": `post-office.html:90` (#1), `shop.html:74` (#17), `games/trading-cards.html:956` (#8), `laidies-card.html:1479` (#15), `index.html:724` (#16), `bookfair.html:89` "downloaded to print" (#27). These are the loudest false claims and the fastest to neutralize.
2. **The one broken link (#7).** Mayor Deb's Town Hall card visibly does nothing while its 3 siblings work — repoint `town-hall.html:320` to `#hub-deb` or `/post-office.html`. Small, high-visibility.
3. **Kick off the two card render sets (#21/#30, #22/#29) and Book Fair art (#3)** — these are the long pole. Ali picks keeper faces (bottom of `_character-cards-remaining-12.md`), then Codex runs in the background while she does everything else. All three prompt sets are ready (§4).
4. **The two impact-5 honesty bugs that burn earned currency (#2/#6/#9).** Book Fair redemption spends clips and nothing lands. Either hedge the copy now (fast) or schedule the Closet render paths. Worst member feeling on the site — don't leave it fully live as-is.
5. **Commerce unblock (#4) when Ali has time** — create Printful/Gumroad products, paste `buyUrl`s. Only Ali can do this; it's the monetization-priority page.
6. **Defer the .html rewrites and server builds** (#5 mail wiring, #10 pack-granting, #19 trading-cards rewrite, #37 migration paste). These are real but larger and were correctly left untouched overnight.

Pantheon card decks (#32/#33/#34) are all blocked on Ali's roster/format decisions — don't start rendering until she rules.
