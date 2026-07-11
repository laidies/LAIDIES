# SUNNYVAiLE / LAiDIES — definitive resident-facing feature inventory — 2026-07-10

**Method:** traced every feature to the file that actually implements it — which page writes the `localStorage` key or the Supabase row, which button has a real click handler, which callout is prose vs. wired. BUILT = works end-to-end today. PARTIAL = shell/UI or one half is there but a link in the chain is inert or unproduced. MISSING = no implementation found (may be described in copy or planned in a memory, but nothing runs).

Backend is real: `content/site/supabase-config.js` holds a live Supabase URL + anon key, included on the Closet, MAiKEOVER, Town Hall, and Radio. Magic-link auth and the `member_reward_events` sync are wired (`script.js:2500–2740`). This is the "Part C membership" that older memories filed as future — it has largely landed.

Builds on `operations/closet-card-ties-status-2026-07-10.md` (the building→card "trip" ties); this file is the whole-site superset.

---

## PART 1 — The founder's 7 named features (explicit verdicts)

| # | Feature | Verdict | Evidence |
|---|---|---|---|
| 1 | **Send gifts (Post Office gifting)** | **MISSING** | Prose only. `post-office.html:78–90` describes "notes and gifts arrive at your PO box… mail a Trading Card duplicate, hand off a Hall Pass." The Closet's public-mode **"Send a note →"** button `laidies-card.html:1045` has **no click handler** (only reference to `sendNoteBtn` in the file is the button itself). No `laidies_gift`/`laidies_inbox` key, no gift/DM store, no delivery anywhere. |
| 2 | **Bookmark / "mark sections in a book" (puffy-sticker bookmark)** | **MISSING** | Handbook sections carry the intended savable anchors — `data-puffy-title` / `data-puffy-summary` on `handbook.html` `<h2>`/entries — but **no script reads `data-puffy`** (zero matches in any `.js`), there is no "place a puffy" affordance, and **no Puffy Board** in `laidies-card.html`. (Do not confuse with Book Fair puffies, which are a separate built claim — see Part 2.) |
| 3 | **Save a whole book so it appears in your Closet** | **MISSING** | No implementation. No "save book" / "my books" / bookshelf in `laidies-card.html`; `library.html` has no save-to-Closet affordance; no `laidies_books`/`laidies_saved` key. |
| 4 | **Check out other members' public Closets + their ratings** | **BUILT (viewing) / MISSING (ratings)** | *Viewing:* `laidies-card.html` public mode — `/@handle` → `?u=` (`:1598,1082`), `loadPublicProfile()` fetches Supabase rows where `member_card_is_public=true` (`:1981`), public banner + "Their Report Card/Residence Card", public tiles shown (charms, stickers, merit badges, trading cards, diary secrets — `pub:true` at `:1088–1097`), wallet/tour/butterfly hidden (`:1642–1644`), Luminaries hydrated. *Ratings:* **no** per-closet rating/stars mechanic exists anywhere. |
| 5 | **Find charms (Charm Hunt)** | **BUILT** | `content/site/charm-hunt.js` — sparkles hidden in town images site-wide, weeks 1–3 unlocked immediately, writes `laidies_charms_found`; Closet renders `#charmBracelet` (multi-bracelet, `laidies-card.html:1762`). |
| 6 | **Send postcards** | **BUILT** | `postcard.html` — real send via `navigator.share` (`:309`), `sms:` (`:304`), `mailto:` (`:305`), and copy-link (`:319`). (The BEST FRIENDS necklace *unlock* on the friend joining is Phase-2 — sending works today.) |
| 7 | **Change your background (card / Closet)** | **MISSING** | No background/wallpaper/skin/theme picker anywhere — not on the Closet, not in the Edit panel, not at MAiKEOVER. The card background is fixed design. Zero matches for a chooser. |

**Founder's-7 tally: 3 BUILT (charms, postcards, viewing others' Closets), 4 MISSING (gifts, puffy bookmarks, save-a-book, background) + ratings MISSING.** These four are the "should have been built but didn't get built."

---

## PART 2 — Full master inventory (grouped)

### ✅ BUILT (works end-to-end)

| Feature | Where it lives | Evidence |
|---|---|---|
| Residence Card creation + edit | MAiKEOVER / Closet | `maikeover.html` claim + `laidies-card.html` edit panel `:1453`; `saveOwnProfile` → Supabase |
| Magic-link sign-in (membership) | Clubhouse Pass / MAiKEOVER | `clubhouse-pass.html:343` magic-link confirmation; `maikeover.html:417` Supabase auth session |
| @handle claim (Closet URL) | MAiKEOVER | `maikeover.html:94` claim card + reserved-words guard `:210`; writes `laidies_card_username` |
| 8 card fields (name, archetype, saint, song, activity, motto, quote, + v2 favourites) | Closet Edit panel | `laidies-card.html` edit fields; label maps `SONG_LABEL`/`SAINT_LABEL`/etc. `:1655–1685` |
| Card "trip" ties — Avatar, Saint, Maven, Trailblazer, Town Regular | Pieces of Flair, LUMINAiRY, Town Hall | Per prior audit: `mall/pieces-of-flair.html` (`laidies_avatar`), `luminairy.html` (`laidies_saint/maven/builder`), `town-hall.html` (`laidies_town_regular`) |
| Avatar / Pieces of Flair (object avatar) | Mall | `mall/pieces-of-flair.html` "Wear this →" writes `laidies_avatar` |
| Saints / Your Luminaries pick (4-slot band) | LUMINAiRY → Closet | `luminairy.html` chips; Closet `#covenSection` `:1191` |
| Mavens collection | LUMINAiRY | `luminairy.html:1185` `laidies_mavens_collected` |
| Pop Quiz + Butterfly Clip Jar | SUNNYVAiLE High / Closet | quiz engine `script.js` → `quiz_score`/`quiz_sticker`; Closet `renderClipJar` from `laidiesQuizProgress` `:2374` |
| Stickers (quiz) → sticker book | Closet | `quiz_sticker` synced (`script.js:2521`) → `#stickerGrid` (`COLLECTION_MAP` `:2015`) |
| Trading cards / packs + Collection Binder | Trading Cards game / Blend & Snap / Closet | `games/trading-cards.html` binder + `laidies_card_collection`; `trading_card` synced `script.js:2538` → `#tradingGrid` |
| Diary / secret badges | FAiRY Godmother + Mme CLAi-O → Closet | both write `laidiesSecretBadges`; `secret_badge` synced `script.js:2566` → `#secretGrid` |
| Charm Hunt / charm bracelet | site-wide / Closet | `charm-hunt.js`; `#charmBracelet` |
| KSVL radio + continuous playback persistence | Radio / site-wide | `content/site/ksvl-player.js` writes `laidies_ksvl_player_state_v1`; pop-out `ksvl-popup.html` |
| KSVL song request | Radio | `radio.html:834` inserts `ksvl_song_requests` (Supabase) |
| Report Card dashboard (9 stat tiles) | Closet | `#dashboardSection` `:1071`, mirrors count nodes via MutationObserver |
| Wednesday Tour check-ins (8 stops) | building pages / Closet | `sv-tour-checkin.js`; `#tourSection` `:1226` |
| Town Wallet (17 building membership cards) | Closet | `renderWallet` `:2326` from `laidies_building_visits` (`sv-you-are-here.js`) |
| View other members' **public Closet** (`/@handle`) | Closet public mode | `loadPublicProfile` + Supabase `member_card_is_public` fetch `:1952–1982` |
| Privacy toggle (public/private Closet) | Closet Edit panel | `editIsPublic` checkbox `:1574` → `member_card_is_public` `:2174`; gated on claiming a handle |
| Postcards (invite a friend) | Postcard | `postcard.html` real share/sms/mailto/copy |
| Ask LAiDY / FAiRY Godmother (advice + prompt glow-up) | FAiRY Godmother | `games/fairy-godmother.html:1433` real Worker AI `fetch`; `laidies_fairy_plays` + free-wish gate `laidies_free_wishes_used` |
| Mme CLAi-O reading (fortune / pull-a-card) | Mme CLAi-O | `games/madame-claio.html` reading engine; writes `laidiesSecretBadges` |
| Girl Talk (Truth or Dare) — the game itself | Girl Talk | `games/girl-talk.html` full mechanic (draw, dare/truth, sticker, penalty, wishes); `laidies_gt_stickers_earned` / `_penalties_earned` / `_dares_completed` / `_pending_wishes` |
| Dream Phone deduction game / "Just Call" | Dream Phone | `games/dream-phone-game.js` (24-caller deduction) + `script.js` engine |
| Businesswomen's Special (drink pick) | BWS booth | `games/businesswomens-special.html` writes `laidies_bws_drink` |
| BRONZE AiGE coaster stamp (weekly) | BRONZE AiGE | `bronze-aige.html:110` `#stamp`, writes `laidies_bronze_coasters` |
| Scholastic Book Fair — puffy claim (every 4 wks) | SUNNYVAiLE High | `sunnyvaile-high.html:577` `#hub-bookfair`, `laidies_bookfair_claims` + `laidies_puffies_earned` `:642` |
| Community chat rooms / posts | Community | `community/*.html`; `community_room_post` synced `script.js:2552` |
| Screening Room episode player | Watch | `watch.html` VHS/cue-synced player (per memory `screening-room-episode-player`) |

### 🟡 PARTIAL (shell present, or one link in the chain inert / unproduced)

| Feature | Where | Evidence / what's missing |
|---|---|---|
| **Merit badges (sash)** | Closet `#meritGrid` | Vessel + 4 empty "?" slots exist and read `merit_badge` events (`COLLECTION_MAP:2016`), but **nothing produces `merit_badge`** — the sync (`script.js`) only emits quiz/trading/secret/room types. 867 Club & Hotline badge logic exists but is explicitly **"parked while member magic gets rebuilt"** (`script.js:1272`). Sash stays empty. |
| **Detention slips (dare penalties)** | Closet `#detentionSlips` | Vessel reads `dare_penalty` (`:2019`); Girl Talk writes penalties to **localStorage only** — `dare_penalty` never synced to `member_reward_events`. Won't fill on the Closet. |
| **Girl Talk stickers on the Closet** | Closet sticker book | Sticker book reads `sticker_girl_talk` (`:2015`) but the sync never emits it — Girl Talk rewards live in `laidies_gt_stickers_earned` locally and don't reach the card. Cross-source sticker consolidation incomplete (matches prior audit). |
| **Town Leaderboards / "Where You Rank"** | Closet | Placeholder teaser only — "The boards go up when the town fills in" (`:1439–1447`). No live ranking computed. |
| **Public-mode reward sync for charms** | Closet public view | `hidden_charm` type is read (`:2017`) but not produced by the sync; a visitor sees another resident's charms only if synced. Local hunt works; cross-device public display doesn't. |
| **Cocktail-of-week card tie** | BRONZE AiGE | Callout + "make it official →" link, **no on-page picker**; card field free-text (prior audit). Needs cocktail-menu decision. |
| **Favourite-song card tie** | KSVL Radio | Callout de-inerted today, **no real picker**; 6-item card enum vs. 10 radio bands mismatch (prior audit). |
| **Study Pack → trading-card deposit** | Blend & Snap | Callout + card content + link present; end-to-end "drops into the binder vessel" not fully traced (prior audit). |
| **BEST FRIENDS necklace unlock** | Postcard / Closet | Invite send works; the necklace *grant + finish-on-join* is Phase-2 (memory `postcard-from-sunnyvaile-feature`). |
| **Cocktail Fortune game** | games/cocktail-fortune.html | Static page — no `localStorage`/handlers/mechanic found (0 JS hits). Reads as a stub/redirect vs. the fully-wired Mme CLAi-O reading. |

### 🔴 MISSING (no implementation found)

| Feature | Where it should live | Evidence |
|---|---|---|
| **Send gifts (resident-to-resident)** | Post Office / Closet | Prose only; "Send a note" button `laidies-card.html:1045` has no handler; no gift/inbox store or delivery. |
| **Send a note / DM another resident** | Closet public mode | Same inert `sendNoteBtn`; `#sendNoteBlock` shown in public mode but wired to nothing. |
| **Puffy-sticker BOOKMARK mechanic + Puffy Board** | Handbook (mark sections) → Closet | `data-puffy-*` metadata present on `handbook.html`; **no reader script**, no place-a-puffy UX, no board in the Closet. (Locked 2026-07-03, still unbuilt.) |
| **Save a whole book to your Closet** | LIBRAiRY → Closet | No implementation anywhere. |
| **Change your background (card / Closet)** | Closet / MAiKEOVER | No picker anywhere; background is fixed. |
| **Ratings on members' cards/closets** | Closet public view | No rating/stars/endorse mechanic exists. |
| **Favourite-episode card tie** | Chick Flicks | No building callout; card field is a local dropdown only (prior audit). |
| **Currently-reading card field** | LIBRAiRY | No such field on card v2; aspirational, never existed (prior audit). |
| **Ask Jeeves (LIBRAiRY reference-desk character)** | LIBRAiRY | Memory `jeeves-librarian-idea` = "full build pending"; no interactive Jeeves surface found. |

---

## Tally

- **BUILT: 29**
- **PARTIAL: 10**
- **MISSING: 9**

## The founder's real concern — "should have been built but didn't get built"

**MISSING (never ran):**
1. **Send gifts** (Post Office resident-to-resident) — button exists, does nothing.
2. **Send a note / DM** to another resident — same inert button.
3. **Puffy-sticker bookmarks + Puffy Board** — metadata on handbook, no reader, no board.
4. **Save a whole book to your Closet** — nothing.
5. **Change your Closet/card background** — no picker at all.
6. **Ratings** on other members' closets/cards — no mechanic.
7. **Favourite-episode card tie** at Chick Flicks — no building callout.
8. **Currently-reading card field** — never speced onto the card.
9. **Ask Jeeves** — planned, unbuilt.

**PARTIAL (half-wired — mostly a broken sync link, not a missing UI):**
- **Merit badges** never get produced/synced (sash always empty; 867 Club "parked").
- **Detention slips** (dare penalties) and **Girl Talk stickers** never sync from the game to the Closet.
- **Charm public-sync**, **Town Leaderboards** (teaser), **BEST FRIENDS necklace unlock**, and the three building card-ties (**cocktail / song / study-pack**) plus **Cocktail Fortune** (stub).

**Pattern worth flagging:** the biggest cluster of "should've worked" is a **reward-sync gap** — the Closet's `COLLECTION_MAP` reads `merit_badge`, `dare_penalty`, `sticker_girl_talk`, and `hidden_charm`, but `script.js`'s `member_reward_events` sync only ever emits `quiz_score`, `quiz_sticker`, `trading_card`, `secret_badge`, and `community_room_post`. Four reward types are consumed but never produced — so Girl Talk, detention, merit badges, and public charm display look built (the vessels are there) but stay empty. That single sync omission explains several of the "it didn't get built" complaints.
