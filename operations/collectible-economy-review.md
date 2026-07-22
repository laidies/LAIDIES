# THE COLLECTIBLE ECONOMY — review, gaps, and what fills them
*Overnight 2026-07-21. Ali: "trading cards need to be tradeable — how does that work? how does
gifting work? all this needs to be reviewed, gaps identified and filled… those are just two examples,
there is much more to review."*

---
## THE HEADLINE

**The site promises trading as a live feature in at least seven places. It does not exist.**
Not "partially built" — there is no transfer flow, no recipient picker, no ownership record that can
move between two people.

### Where the site says you can trade

| Page | The words |
|---|---|
| `index.html` | "trade teaching cards in the chat rooms" · "Duplicates are the point: **trade them with other residents**" |
| `blend-snap.html` | "Duplicates are the point — **trade them**" |
| `trading-cards.html` | "Two decks · **Both tradable**" · "Duplicates aren't dead weight; **trade them**" · "**trade the extras**" |
| `handbook.html` | "**Both tradable**" · "**Tradable**, foil and holo included" |
| `bookfair.html` | "Goes in your binder, **tradable**" |
| `laidies-card.html` | "**Trade with other residents**" |
| `sorority-house.html` | "come by and **swap** what you're wearing" |

Only ONE surface is honest about status — `laidies-card.html`: *"**Soon:** send a note or a gift
through the SUNNYVAiLE Post Office."* Everywhere else states it flatly, in the present tense.

---
## WHY IT ISN'T BUILT — and it's ONE reason, not seven

Trading, gifting, the leaderboard and anything else involving another person share a single
precondition:

> **Two identified members, and state on a server that both can see.**

Today every collectible lives in **`localStorage` on one device**. That means:
- There is no "other resident" to trade with — no identity to address.
- A card cannot leave one collection and arrive in another; nothing spans two people.
- Clearing your browser wipes your collection.
- The leaderboard has no comparable population.

**So the gap is not five features. It is one foundation** — server-side per-user state with identity,
which is exactly `membership-architecture-plan` Part C (Supabase + magic-link + auto-merge from
localStorage). **Nothing in the social economy can ship before it, and everything ships shortly after.**

---
## EVERY MECHANIC — promised vs real

### ✅ Built and honest (single-player, localStorage is fine)
Charms · Butterfly clips (earning) · Puffy stickers · Merit badges · Resident Card · Wednesday Tour ·
Pop Quiz · Try-On · Diary secrets · Buildings visited · Your Luminaries · FAiRY wishes · Dream Phone ·
Bronze cocktail wall · KSVL requests · Book Fair drops.

### ⛔ Promised in the present tense, NOT built
| Mechanic | Status | Blocked on |
|---|---|---|
| **Trading cards — trading** | 7 surfaces promise it. No code. | identity + server state |
| **Gifting collectibles** | Decided 2026-06-30 (one-way via Post Office). Post Office is a newsletter signup today. Copy says "mail a Trading Card." | identity + server state |
| **Leaderboard** | A Delta LAi Nu destination. Nothing to rank. | identity + server state |
| **Butterfly clips — spending** | 34 mentions of spend/redeem/currency, **zero** implementation. Still an OPEN proposal, never decided. | a decision first, then a ledger |
| **Hall Pass** | Thin — 3 mentions, 1 hook. | Girl Talk dare validation |
| **Tardy Award** | Canon exists, 1 reference on site. | week-grid state (see dashboard spec) |

---
## HOW TRADING SHOULD WORK — the design question answered

Ali locked **one-way gifting over full swap trading** (2026-06-30) precisely because two-sided trade
needs escrow, offers, accept/decline and dispute states — a lot of machinery for a small town.

**So "tradable" should mean: I can GIVE you a card.** Not a negotiated swap.

The flow, once identity exists:
1. In your binder, a duplicate shows a **Send** action (duplicates only — you can never give away your
   last copy of something).
2. Choose a recipient **by @handle** (handles already exist — Resident Card v2 uses them).
3. It goes **via the Post Office** — the canonical route, and it makes the building do something real.
4. She gets it in her PO box; **one-way, no acceptance step, no escrow.**
5. Both Closets update; the event is logged so the dashboard can show "sent / received."

**This also fixes the copy problem:** "trade them" becomes "send your duplicates," which is honest
about a one-way gift and still delivers the social feeling.

---
## THE COPY GAP — fixable TONIGHT, no backend needed

Seven surfaces promise a feature that doesn't exist. That is the most damaging gap right now, because
a new member tries to trade, finds nothing, and stops trusting the rest.

**Recommendation:** mark every trading promise as *coming*, the way `laidies-card.html` already does.
One word each. It costs nothing, it is honest, and it protects the launch.
⚠ **Not doing this unilaterally** — it changes user-facing copy on seven pages, including the homepage,
and `dont-remove-working-features` cuts both ways. Ali's call in the morning.

---
## RECOMMENDED ORDER
1. **Fix the copy** (tonight-sized, needs Ali's yes)
2. **Part C membership** — identity + server state. Unblocks trading, gifting, leaderboard at once.
3. **Gifting via the Post Office** — the locked design, one-way, duplicates only
4. **Leaderboard** — trivial once there is a population
5. **Butterfly clips as currency** — needs a DECISION first (still an open proposal), then a ledger
