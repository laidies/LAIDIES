# HANDOVER — Membership backend + Trading Cards + Site Audit
*Session of 2026-07-22 → 07-23. Everything below is from this workstream. Hand this to Codex / the next window to pick up seamlessly.*

> **SCOPE — read this first.** This handover covers the **membership/Supabase backend**, the
> **trading-card system**, and a **full site audit**. It is NOT the episode/video pipeline —
> that is `operations/codex-prompts/_START-HERE-TOMORROW.md` (episodes, Canva motion, Ep1–4).
>
> ⚠ **TWO different "card" products — do not mix their styles:**
> - **EPISODE cards** (title / quote / interstitial inside an episode video) = **Ep4 `comic-v1-locked`**, bold ink, **NO halftone**. Governed by `_START-HERE-TOMORROW.md`.
> - **TRADING cards** (the collectible JoJo / keeper / concept / SAiNT / MAiVEN / TRAiLBLAZER cards) = **pop-art WITH halftone**, `tradingref` look, candy palette. Governed by THIS file.

---

## 1 · DECISIONS LOCKED THIS SESSION (Ali)
1. **Sign-in gates the rooms + Girl Talk** — a Resident Card is required to post/play. (Neither enforced it before; Girl Talk is now gated — see audit §3.)
2. **Residents connect by `@handle`, never email.** Email is not exposed, not stored on `member_profiles`, not carried by mail.
3. **A public card shows** handle · display name · avatar · resident number · the 7 favourites · **generation · industry · ai_comfort** (categorical, fine to share). It **never** shows email · goal · besties · newsletter · timestamps.
4. **Trading cards FLIP. Both faces are Codex pop-art renders.** FRONT = image + a word/phrase. BACK = the info rendered **in-generation** inside comic panels (this works — keep copy short, lettering large). **NO CSS anywhere.**
5. **FOIL / rare = a SEPARATE full-holo render** (not a CSS overlay). The approved bar is `assets/cards/characters/jojo-card-front-foil-v2.png` (the WHOLE card prismatic, not two streaks). → **~2 renders per card** (standard + foil).
6. **Palette = LAiDIES candy** (pink #e982ab · teal #57b6c0 · coral #ec7a78 · periwinkle #b3abe7) over black ink. NOT the reference's primary red/blue/yellow.
7. 🔴 **The LUMINAiRY figures (SAiNTS, MAiVENS, TRAiLBLAZERS) cards go POP-ART too** (Ali 2026-07-23: *"if i said that they go comic style… then they go comic style"*). Their existing stained-glass portraits are the **likeness reference only**; the card is rendered pop-art like the keepers.
8. **Leaderboards are wanted** — consent-gated (only public-card residents appear), ranked on FUN collecting (charms / cards / quizzes / tours), NEVER on skill level or private attributes.
9. **Claude makes no drawings/mockups.** All card art is Codex. Claude does the DB, code, prompts, wiring, and QC.

---

## 2 · BUILT + VERIFIED THIS SESSION

**Services turned back on (were down):**
- **Supabase project `swqnkxzebxdbgyrzpdne` restored** (was paused/INACTIVE) → ACTIVE_HEALTHY, all data intact (5 auth users, 2 profiles).
- **Hyvor domain `laidies.ai` added** → all 7 community rooms live again (were showing "domain not trusted").

**Supabase migrations (all in `supabase/migrations/`, applied + tested):**
- `20260630000000_baseline_schema.sql` — the real 6-table schema, read from the live DB (the old `content/site/supabase-schema.sql` was stale, 3 tables).
- `20260722193000_fix_constraint_drift.sql` — **the worst bug fixed**: code emitted `sticker_express` + `community_room_post` + 7 extra industries the DB rejected; because sync was one batch upsert, one bad row killed a resident's **entire** collection. Constraints widened; proven.
- `20260722201500_stop_storing_email_on_profiles.sql` — email nulled + kept empty (was leakable via a public card).
- `20260722210000_public_cards_show_only_card_fields.sql` — `public_resident_cards` VIEW (card fields only) + `is_public_profile()` + `is_handle_taken()` helpers. **A public card no longer leaks private columns.**
- `20260722223000_public_card_shows_generation_industry_comfort.sql` — added the 3 categorical fields Ali OK'd back.
- `20260722214500_resident_mail.sql` — `resident_mail` table + `send_resident_mail()` + `my_resident_mail()`. @handle-addressed; no anonymous senders; no self-send; respects `accept_public_notes`.
- `20260722230000_server_side_pack_opening.sql` — `card_definitions`, `member_packs`, `open_pack()` (server-side roll, visible pity every 5th, no dupes in a pack), `my_pack_status()`.
- `20260722234500_card_art_paths_and_finish_aware_open.sql` — art-path columns + `open_pack` returns the **finish-specific image** (foil pull → foil render). Proven: pity foil served the foil image.
- `20260722234500_bestie_necklace.sql`, `20260723000000_resident_blocks.sql` — BEST FRIENDS necklace + resident blocking (built in a sibling window; block is respected by `send_resident_mail`).

**Code edits (`script.js`, `laidies-card.html`, `maikeover.html`, `games/trading-cards.html`):**
- Resilient reward sync — batch upsert now falls back row-by-row so one bad row can't wipe a collection; tells the resident "N of M saved" instead of a silent success.
- Email removed from all 3 profile-write paths.
- Public-card read points at the VIEW, not the table; handle-availability uses `is_handle_taken()`.
- **Share-my-card link fixed** — was copying the bare Closet URL (recipient saw their own empty Closet); now copies `?u=handle`. Browser-verified.
- **Trading-cards game store now reaches the Closet binder** — game page writes `laidies_cards_meta`; `script.js` emits `trading_card` events from it. (Was two disconnected stores.)

**Post Office mail UI** — wired in a sibling window (`post-office.html` uses `send_resident_mail` / `my_resident_mail`). Not yet exercised end-to-end signed-in (no test account).

**One card proven end-to-end:** JoJo — `assets/cards/characters/jojo-card-front-v1.png` + `-back-v1.png` + `-front-foil-v2.png`. Ali approved the look. This is the **gold standard** — match it.

**Guardrail hooks added** (`.claude/hooks/`): `block-unverified-capability-claims.py` (blocks asserting what Hyvor/Supabase/etc. can do without checking). Existing: art-prompt enforcement, rejected-asset block, cut/library decisions.

---

## 3 · CODEX'S JOB — the render queue (all TRADING cards, pop-art)

**Gold standard to match every time:** `assets/cards/characters/jojo-card-front-v1.png` (front), `jojo-card-back-v1.png` (back), `jojo-card-front-foil-v2.png` (foil = full prismatic holo). **Style refs:** `operations/reference/trading-cards/tradingref-01.png` (person card) + `tradingref-04.png` (burst frame).

**Rules (every card):** pop-art comic — bold black outline + Ben-Day halftone + flat candy color + name banner + burst frame; **1200 × 1680 portrait, white border, rounded corners**; back text rendered **in-generation** (short, large); foil = separate full-holo render; **NO CSS, NO plum/gold, NO baked foil on the standard**; "AI" always both caps, brand words keep the accented i. **Send ONE card per Codex request** (batching collapses the template).

**Queue — the prompt files (all under `operations/codex-prompts/`, all underscore-prefixed so the episode art-hook doesn't misfire):**

| Prompt file | Covers | Notes |
|---|---|---|
| `_character-cards-remaining-12.md` | 12 town keepers × front/back/foil (~36) | Faces resolved. **Some keeper portraits Ali rejected as "old" — the CURRENT faces live in the video/credits renders**, see memory `current-character-faces-are-credits-renders`. Confirm each face ref before rendering. |
| `_concept-cards-popart-by-episode.md` | 20 concept (Study Pack) cards × 3, per episode | Copy is verbatim from `games/trading-cards.html`. DB rows already seeded (0 art). |
| `_maven-cards-batch.md` | MAiVENS (12 portraits exist) | 🔴 **NOW POP-ART** (top banner overrides the stained-glass body). Existing stained-glass = likeness ref only. Real living women — match, don't invent. |
| `_trailblazer-cards-batch.md` | TRAiLBLAZERS (6) | Same pop-art override. |
| `_saint-cards-BLOCKED.md` | — | **BLOCKED**: roster mid-recast. Do not render until Ali closes it. |
| `_site-missing-art-prompts.md` | non-card missing images | Book Fair 8 drops etc. |

**After every render:** run `operations/tools/qc-frames.py`, then eyes: 1200×1680? banner spelled right (accented i's)? same woman as ref, not a stranger? complete body / correct hands? nothing post-1999? no baked foil on the standard?

**After art lands, tell the next window to:** drop the PNGs in the named paths, then set `card_definitions.art_front / art_back / art_front_foil` per card and seed the 12 keeper rows. `open_pack` already serves finish-specific art once the paths are set.

---

## 4 · OWED — code / wiring (NOT Codex; Claude / next window)
- **Front-end pack opening** — `games/trading-cards.html` still rolls client-side with `Math.random()` + an unlimited "Open Pack" + a Reset button (all banned by the locked economy). Rewrite to call `open_pack()` / `my_pack_status()`, gate on sign-in, show the pity counter, kill Reset + free packs.
- **Pack-granting** — nothing grants a pack yet (`member_packs` = 0 rows). Needs a `grant_pack()` SECURITY DEFINER fn called by visit / week-complete events. **Earning model is already locked** (visiting = a pack; full week = a GOLD pack) — only the anti-refresh throttle is open.
- **Leaderboards** — design locked (§1.8); needs a consent-gated SECURITY DEFINER aggregate fn over `member_reward_events` + wiring the placeholder at `laidies-card.html:1550`.
- **Mail UI remainders** — send control on a public card; the PO-box inbox on the Closet (still a link); unread count in nav; gift attachment (the `item_type` column is ready, item transfer is not).
- **Mechanical bugs (from the audit):** Mayor Deb Town Hall card → dead `#about-mayor-deb` anchor (`town-hall.html:320`); DJ SunnyV avatar → nonexistent `y2k-portraits/` dir (`character-cards.json:39`); migration `20260722234500_card_art_paths…` drops `open_pack` without re-creating the body (paste the live body in for reproducibility).

---

## 5 · NEEDS ALI (the genuinely open few)
- **Saint roster** — close the recast (~9 open lanes) before saint cards can be made.
- **Auth redirect URL** — confirm `https://laidies.ai/**` is in Supabase → Auth → URL Configuration (magic-link breaks at the card maker without it). NOT verified.
- **Shop checkout URLs** — Printful/Gumroad (her paste-in job; merch is deliberately parked pre-audience).
- **Copy honesty** — reword-vs-build for the present-tense promises (Post Office gifts, trading claims, Book Fair "lands in your Closet"). Mail/gifting server is already built, so several are just "wire the client."

---

## 6 · THE FULL AUDIT
`operations/overnight-audit-2026-07-23.md` — **37 verified gaps** ranked by member impact, a NEEDS-ALI section, a **REFUTED** section (things wrongly flagged — Girl Talk IS gated, charms DO sync, mail server IS deployed), and a recommended morning order. `operations/member-promises-audit-2026-07-22.md` is the member-mechanics deep dive.

## 7 · GUARDRAILS (respect these or work gets blocked)
- **Curation:** never reference an asset marked `redo`/`unused` in `operations/ops/curation.json` — a hook blocks the prompt file. Current character faces = the credits renders, not the stale `assets/` root.
- **Art-prompt hook:** any imagery prompt under `codex-prompts/` needs the `art-requirements.md` block — EXCEPT trading-card prompts (different style), which are exempt via the leading `_` and carry the CARD rules instead.
- **DB:** migrations live in `supabase/migrations/` — never hand-run schema SQL in the dashboard again (that split caused the drift bug). Any CHECK-constraint change has a twin in `script.js` (`getSupabaseSafeProfileValue`).
- **`Closet public read`:** RLS filters rows, not columns — before adding any private field to `member_profiles`, check it against the public view or it ships public.

## 8 · KEY PATHS
- Supabase project: `swqnkxzebxdbgyrzpdne` (ACTIVE_HEALTHY)
- Migrations: `Website-homepage/supabase/migrations/`
- Card prompts: `Website-homepage/operations/codex-prompts/_*.md`
- Gold-standard card: `Website-homepage/assets/cards/characters/jojo-card-*.png`
- Style refs: `Website-homepage/operations/reference/trading-cards/tradingref-01..04.png`
- Audit: `Website-homepage/operations/overnight-audit-2026-07-23.md`
- Memory index: `~/.claude/projects/.../memory/MEMORY.md` (start: `member-mechanics-audit-2026-07-22`, `card-front-codex-back-code`, `db-migrations-now-in-repo`, `overnight-audit-2026-07-23`)
