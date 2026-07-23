# PATRON SAiNT CARDS — BLOCKED (do NOT write prompts yet)

**Status: BLOCKED on Ali closing the saint roster.** This is a decision doc, not an art
prompt — no imagery is commissioned here, so no `art-requirements.md` block applies. Leading `_`
keeps it clear of the hook regardless.

**One-line reason:** trading cards are the LAST surface in the chain (they need a final,
canon-locked face + title + lane per saint). The Court is still being recast from scratch and is
**not written to git**, so any card prompt written now would render a saint who may be cut, recast,
or re-styled next week. We already burned time rendering Oprah and J.Lo — both since **CUT**. Don't
repeat that on 14 cards.

Source of truth: memory `saint-roster-rethink-2026-07`. Read it before touching this again.

---

## WHY IT'S BLOCKED (three gates, all still open)

1. **Roster not closed / not in canon.** The recast is "text edits only, not committed to git,"
   with locks still landing week to week (J.Lo→Bette 07-15, Golden Girls added 07-16, Carrie +
   Jessica Fletcher locked, Oprah cut for good 07-18, Cher→Cher+Dionne duo). Seats are still moving.
2. **Faces don't exist / are stale for the current roster.** See the asset audit below — the two
   existing saint art sets both predate the current locks. Cards must match a FINAL face; several
   final faces (Carrie, Dionne) have no portrait at all, and two folders still contain CUT saints.
3. **Style undecided for the CARD surface.** Saints have an established *reverent stained-glass*
   visual language; character cards (JoJo) are *pop-art halftone*. Nobody has ruled which governs a
   saint **card**. That ruling gates the whole prompt shape (see "Style question" below).

Songs are also missing for several saints (Cher/Dionne duo owes a NEW song; others song-less),
which is a separate cascade blocker but reinforces "roster still cooking."

---

## LOCKED KEEPS (safe — capability + face already fused)

Per the 07-18 locks, the seats currently locked are:

| Saint | Lane | Court title |
|---|---|---|
| Cher **+ Dionne** (Clueless duo) | Making It Yours | The Makeover Artist |
| David | Specificity | The Curator |
| Elle | Receipts | The Attorney |
| Samantha Jones | Orientation (which tool for the job) | The Publicist |
| Miranda | Standards | The Editor |
| Deb | Boundaries / "Loop Me Out" | The Gatekeeper |
| Buffy | Slaying / whole-jobs | The Slayer |
| Dolly | Common sense / worth | The Boss |
| Sister Mary Clarence (Sister Act) | Teaching / bring her along | The Choir Director |
| Carrie Bradshaw | Staying current | The Talk Show Host |
| Bette Midler | Range / triple-threat | The Triple Threat |
| The Golden Girls (collective) | It's never too late — try it at any age | The Late Bloomers |
| Jessica Fletcher | Keep asking / kind persistence | (title TBD) |
| Regina | ANTI-saint — cautionary tale | The Cautionary Tale |

> ⚠️ The launching task summarized only **7** locked keeps (David, Elle, Miranda, Dolly, Buffy,
> Deb, Cher). The memory is further along than that — the table above is the current state. If the
> two disagree, **Ali reconciles**; do not assume either is final.

## OPEN-SEAT / AT-RISK GAP (why "closed" isn't true yet)

- **Collective seats need a format ruling.** Golden Girls (4 women) and Cher+Dionne (2 women) don't
  fit the one-face JoJo card. One card with all faces? A title panel? Undecided — blocks layout.
- **Jessica Fletcher** has a lane but **no Court title** yet.
- **Not-a-saint lanes** deliberately have no patron and get NO card: Summary (folds into Miranda),
  Bias/who-builds-it (→ a MAiVEN), Presentation/Decks (Martha parked). Don't invent cards for these.
- **Representation is an open, deliberate question** (Ali: add a POC saint only from love, richest
  vein = 90s music, not chick-flicks) — a future seat could still be added.

---

## EXISTING SAINT ART — audit (why we can't just reuse it)

Two sets exist; **both are partially stale against the current roster.** Do NOT feed either into a
card prompt as-is.

- `assets/saints/*.png` — older icon style, **OLD 8-saint roster** (has Oprah, J.Lo; no Bette,
  Golden Girls, Carrie, Jessica). Wrong roster AND wrong style for cards.
- `assets/saints/y2k-stained-glass-v2/*` — newer stained-glass, closer but STILL stale: it includes
  **oprah-winfrey** and **jennifer-lopez** (both CUT — must never appear on a card), a Regina
  cautionary-red variant (good), Bette/Golden Girls/Jessica (good) — but has **no Carrie Bradshaw**
  and **no Dionne**. So even the best set is missing two locked faces and carries two dead ones.

Curation note: only `luminairy-saints-wing-door` is tagged in `operations/ops/curation.json`; the
saint portraits themselves aren't curation-tagged, so there's no "correct" stamp to trust yet.

---

## STYLE QUESTION (must be answered before any prompt)

Same fork as the JoJo test, but sharper for saints:

- **Option A — pop-art halftone** (match the character deck / `tradingref-01..04`, JoJo card is the
  bar). Makes saints part of ONE trading system. Risk: flattens the reverent saint register.
- **Option B — stained-glass** (match the saints' own established look in `y2k-stained-glass-v2`).
  Keeps saints sacred/distinct. Risk: saint cards read as a different product from character cards.

This is Ali's call. It changes the whole prompt shape (halftone + word-bursts vs. leaded glass +
halo), the FOIL treatment, and whether the card hook exemption even applies.

---

## WHAT UNBLOCKS THIS (checklist, all required)

1. Ali **closes the roster** and it's written to canon (`laidies-writing-lock.md` +
   `season-01-bible.md`) and committed.
2. Collective-card format ruled (Golden Girls, Cher+Dionne).
3. Jessica Fletcher's Court title set.
4. **Final portraits exist** for every locked seat — including the two missing (Carrie, Dionne) —
   and the CUT faces (Oprah, J.Lo) are quarantined so no prompt can reach them.
5. Style fork (pop-art vs stained-glass) decided.

Only then: write per-saint card prompts on the JoJo shape
(`operations/codex-prompts/_card-test-jojo-front-back.md`) — leading `_`, front + back + foil,
in-gen banner + copy, one card per send, QC via `operations/tools/qc-frames.py`.

---

## SCOPE THIS DOC IS HOLDING BACK

**14 cards** = 13 saint seats (11 individual + 2 collective) + 1 anti-saint (Regina). At the JoJo
standard of **front + back + separate foil**, that's **~42 renders** — none to be commissioned until
the checklist above clears.
