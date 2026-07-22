# THE CLOSET DASHBOARD — full spec
*2026-07-21. Ali: "a full dashboard — how many of the activities they've done of the released weeks,
where they're at, how many charms per week, how many butterfly clips etc etc… there are also trading
cards. make sure you don't forget anything."*

---
## What exists today
`laidies-card.html` already has a working dashboard — **9 tiles**, good architecture: each tile reads
the count element the vessel renderers already write, so **the dashboard never re-derives state**
(single source of truth). Keep that principle; everything below extends it.

| Existing tile | Target | Total |
|---|---|---|
| Charms this week | charmBracelet | 7 |
| Tour stops | tourVessel | 8 |
| Butterfly clips | butterflyJar | — |
| Stickers | stickerGrid | — |
| Merit badges | meritGrid | — |
| Trading cards | tradingGrid | — |
| Diary secrets | diary | 4 |
| FAiRY wishes | fairyPlays | — |
| Buildings visited | (from `laidies_building_visits`) | — |

## THE GAP
**Every tile is a lifetime total. None of them answers "how am I doing THIS week," or "what did I
miss in week 2."** That per-week dimension is the actual ask.

---
# PART 1 · THE WEEK GRID  (the new centrepiece)

One row per **released** episode. Never show unreleased weeks as gaps — only weeks that have actually
dropped, so the grid can never make someone feel behind on something that doesn't exist yet.

```
        EP  TITLE                  ▶  📖  ✅  🦋  🌸  🃏  🎗️   done
   WK 1 01  On Wednesdays We Do AI  ●   ●   ●   3   5   2   1    6/7
   WK 2 02  Tell Me What You Want   ●   ●   ○   1   2   2   0    4/7
   WK 3 03  The Burn Book Problem   ●   ○   ○   0   0   0   0    1/7
   WK 4 04  The Founding Mothers    ○   ○   ○   0   0   0   0    0/7   ← this week
```

**Per episode, track:**
| Col | Activity | Source |
|---|---|---|
| ▶ | Listened to the narration | Screening Room / watch.html |
| 📖 | Read the written episode | `issues/issue-0N.html` |
| ✅ | Pop Quiz taken (+ best score) | quiz records |
| 🦋 | Butterfly clips earned that week | quiz score → clips |
| 🌸 | Charms found that week (of 7) | charm hunt |
| 🃏 | Cards collected that week | Study Pack |
| 🎗️ | Merit badges earned that week | badge events |
| — | Try-On completed | try-on page |
| — | Tour stops done that week (of 8) | tour state |

**Row states:** complete (all done) · partial · untouched · **current week highlighted.**
Clicking a row expands to that week's detail; clicking a cell jumps to the thing that earns it.

⚠ **Missed weeks must read as "still open," never as failure.** This is where the **Tardy Award**
belongs — a returning member should be welcomed, not scolded.

---
# PART 2 · TILES TO ADD

The 9 existing tiles stay. Missing:

| New tile | Why | Total |
|---|---|---|
| **Concept cards** | Trading cards are TWO decks — Concept (episode-tied, in Study Packs) and Character. One tile hides half the system. | per season |
| **Character cards** | SAiNTS / MAiVENS / TRAiLBLAZERS / town characters | per roster |
| **Books saved** | LIBRAiRY saves — a real vessel with no tile | — |
| **Detention slips** | vessel exists, no tile | — |
| **Puffy board placements** | currently merged with Sticker Book; they are different mechanics (placed around the site vs collected) | — |
| **Your Luminaries** | 4 picks, one per pantheon — a completion state | 4 |
| **Quizzes taken** | + best score, + perfect scores | per released ep |
| **Try-Ons completed** | the weekly practical activity | per released ep |
| **Episodes listened / read** | the two core activities | per released ep |
| **Girl Talk dares** | dares done + Hall Passes | — |
| **Mix CDs** | made / exchanged | — |
| **Postcards sent** | Post Office | — |
| **Book Fair drops claimed** | every ~6 weeks | per drop |

---
# PART 3 · "WHERE THEY'RE AT" — the top-line

Above the grid, three honest numbers:
1. **Season progress** — activities done ÷ activities available **in released weeks only**.
2. **This week** — what's still open right now, as actions ("Quiz · Try-On · 3 charms left").
3. **Longest run** — consecutive completed weeks. Framed as a keepsake, never a streak you can break.

---
# PART 4 · RULES
- **Never re-derive state.** Read the counts the vessels already write ([existing pattern]).
- **Released weeks only.** Unreleased episodes never appear as unfinished.
- **Empty is an invitation.** "0 of 7 charms" reads as a hunt to start, not a failure.
- **Every number is clickable** and lands on the thing that earns it.
- **Public view** shows only synced, non-private tiles — as today.
- Counts must reconcile with the vessels; a tile that disagrees with its shelf is a bug.

---
# PART 5 · BUILD ORDER
1. The **week grid** — the actual ask, and the only genuinely new component.
2. The **missing tiles** — mostly wiring to counts that already exist.
3. The **top-line summary** — derived from 1 and 2, so it comes last.

⚠ Concept/Character card split and Book Fair claims may not have state yet — **verify before building
a tile that reads a value nothing writes.**
