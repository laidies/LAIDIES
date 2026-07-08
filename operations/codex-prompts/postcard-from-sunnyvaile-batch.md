# "Postcard from SUNNYVAiLE" invite postcards (2026-07-06)

> ⚠️ **CODEX SCOPE — IMAGES ONLY.** Generate the postcards and save them to the exact
> paths below. Do not edit code, HTML, JSON, or run git. PNGs only.

## What these are for
The Post Office's new **Postcard from SUNNYVAiLE** feature: a resident picks one of
these, writes a note, and texts/emails it to a friend as an invite. So each one is a
**classic vintage tourist postcard** of a SUNNYVAiLE scene — the kind you'd actually
mail from a place you love. They render at ~3:2 in a picker grid and as a hero on the
receiver's screen.

## Style — match what exists
Reference the existing set for register (do NOT invent a new style):
`assets/residence-card/postcard-scenes/tourist-postcards-v9/` — Y2K-honest painterly
SUNNYVAiLE, warm and sunlit, big friendly **"SUNNYVAiLE"** wordmark worked into the art
the way a real vintage postcard does (banner, sky-writing, or lower-corner script).
For each building scene, reference that building's hero in
`assets/sunnyvaile-buildings/y2k-v3/` so facades match canon.

**Sign spelling (spell verbatim, keep the lowercase "Ai"):** SUNNYV**Ai**LE ·
BRONZE **Ai**GE · M**Ai**KEOVER on M**Ai**N · Mme CL**Ai**-O's · KSVL COMMUNITY R**Ai**DIO
· The LIBR**Ai**RY. Never "AGE", "RADIO", or "MAINE".

**Ban:** fairytale/storybook kit; pink scattered-glam flat-lay borders; blank panels or
post-applied text (render all lettering in-generation — Codex does this well).

## The set — save to `assets/postcards/from-sunnyvaile/`
Landscape 3:2, ~1500×1000. One postcard per scene:

1. `pc-main-street.png` — the MAiN Street strip, "SUNNYVAiLE" across the top, sunny.
2. `pc-welcome-sign.png` — the hillside "Welcome to SUNNYVAiLE" sign (the town's postcard hero).
3. `pc-blend-and-snap.png` — the Blend & Snap café, cozy, "Wish you were here" energy.
4. `pc-chick-flicks.png` — the Chick Flicks video store at dusk, neon marquee.
5. `pc-bronze-aige.png` — the BRONZE AiGE at night, warm bar glow. **✅ DELIVERED (2026-07-07).**
   Baked slogan: **"SUNNYVAiLE AFTER DARK"** / *"Wish you were here."* Marquee boards: THE LAiDIES
   (SUNNYVAiLE's house band, LIVE AFTER 8), Businesswomen's Special happy hour, Main Character Spritz.
   Filed to `approved-assets/postcards/`.
6. `pc-ksvl.png` — KSVL 99.9, the radio tower + heart sign. **⚠️ RE-ROLL NEEDED.**
   Locked slogan: **"SLAiY THE AIRWAVES"** / *"Come to SUNNYVAiLE"* — the delivered v1 rendered it
   plain "SLAY"; must be **SLAiY** (Ai-accented, like SLAiYER). Keep the rest: "KSVL COMMUNITY RAiDIO"
   marquee (RAiDIO intentional), ON AIR neon, heart "KSVL 99.9" tower sign, DJ booth in the window,
   motto "DON'T JUST LEARN FROM BOOKS. LEARN FROM HOOKS!"
7. `pc-mme-claio.png` — Mme CLAi-O's psychic shop, jewel-toned.
8. `pc-library.png` — the LIBRAiRY at dusk, golden light. **✅ DELIVERED (2026-07-07).**
   Baked slogan: **"NEVER BEEN BOOKED"** / *"Come to SUNNYVAiLE"* (pun on booked). Streamline-deco
   exterior, glass-block rotunda, "Open your mind / Open a book" sign, BOOK RETURN box. Filed to
   `approved-assets/postcards/`.
9. `pc-park.png` — the town park at golden hour (picnic, boombox — reuse `town-park-afternoon` register).
10. `pc-sorority-house.png` — Delta LAi Nu on Wisteria Lane, string lights.

Optional greeting line to work into 2–3 of them, postcard-style: **"Wish you were here."**
/ **"Come to SUNNYVAiLE."**

**New renders: 10.** When they land, drop them in `assets/postcards/from-sunnyvaile/`
and tell me — I'll swap the `POSTCARDS` array in `postcard.html` from the placeholder
tourist set to these.
