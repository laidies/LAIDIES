# WHAT IT TAKES TO MAKE TRADING REAL
*2026-07-22. Grounded in the actual backend, not assumptions.*

## ⚠ I was wrong overnight
I wrote that trading was "blocked on Part C membership." **Membership is substantially BUILT.**
Supabase is live and connected, with magic-link auth (`signInWithOtp`) and real tables:

| Table | Holds |
|---|---|
| `member_profiles` | `id`, **`card_username`** (the @handle, already uniqueness-checked at MAiKEOVER), `member_card_is_public` |
| `member_reward_events` | event-sourced collectibles — `user_id`, `reward_type`, **`dedupe_key`**, `title`, `source`, `issue_key`, `metadata`, `created_at`. Upserted `onConflict: user_id,dedupe_key` |
| `member_issue_progress` · `ksvl_song_requests` · `town_hall_feedback` | per-episode progress, radio, feedback |

**So identity exists, addressing exists (@handle), and collectibles are already stored server-side.**
Trading is a much smaller job than I said. Roughly a day, not a project.

---
## THE FOUR REAL GAPS

### 1 · Duplicates aren't modelled — and trading is ABOUT duplicates
`dedupe_key` is unique per `user_id`, which deliberately stops double-awarding. Pull the same card
twice and it collapses to one row. But the copy everywhere says *"Duplicates are the point — trade
them."*

**Fix:** when a pack mints a card, give each copy its **own instance key**
(`card:ep04:algorithm:<nonce>`) so every copy is a row. Keep dedupe semantics for
one-time rewards (badges, quiz stickers) — those should still never duplicate.
*Half a day, including a migration that back-fills existing card rows as qty 1.*

### 2 · There is no transfer operation
Nothing can move a collectible between two users.

**Fix — one Postgres function, `SECURITY DEFINER`:**
```
gift_card(p_instance_id uuid, p_recipient_handle text)
  → verify caller owns p_instance_id
  → verify caller holds ≥2 of that card (never give away your last copy)
  → resolve handle → recipient id via member_profiles.card_username
  → reassign the row's user_id to the recipient, in ONE transaction
  → insert a ledger event for both sides ("sent" / "received")
```
Atomic, so a card can never be duplicated or vanish mid-transfer.
*Half a day including tests.*

### 3 · 🔴 SECURITY — the client can currently mint its own rewards
This is the one that actually matters. The site **upserts into `member_reward_events` from the
browser**. Anyone with devtools can award themselves any collectible today. That's tolerable while
collectibles are personal trinkets — **it stops being tolerable the moment they can be sent to
someone else**, because a minted card becomes a real object in another member's collection.

**Fix, and it must land WITH trading, not after:**
- RLS on `member_reward_events`: **no client INSERT/UPDATE of card-type rewards.**
- All card grants go through server-side functions (`open_pack`, `claim_reward`, `gift_card`).
- Keep client writes only for things that are self-reported and harmless.
*Half a day. **Do not ship trading without it.***

### 4 · No UI
- **Binder:** duplicates get a **Send** action (only when count ≥ 2).
- **Recipient:** type an **@handle**; validate against `card_username` before enabling send.
- **PO box:** an inbox on the Closet — "Regina sent you Algorithm." The Post Office finally does
  something real.
- **Ledger:** sent/received history, which the dashboard can surface.
*One day.*

---
## THE SHAPE OF THE FEATURE — already decided, don't re-open
Ali locked **one-way gifting over swap trading** (2026-06-30): no escrow, no offers, no accept/decline.
So **"tradable" means "I can send you a duplicate."** One-way, no acceptance step, routed via the
Post Office. Simpler to build, safer, and it still delivers the social moment.

⚠ **The copy must change to match.** Seven surfaces say "trade them," which implies a swap.
"**Send your duplicates**" is honest and describes what will actually exist.

---
## TOTAL: ~2½ days
| Job | Effort |
|---|---|
| Duplicate instances + migration | 0.5d |
| `gift_card` function | 0.5d |
| 🔴 RLS lockdown + server-side grants | 0.5d |
| Binder / handle picker / PO box inbox | 1.0d |

## ORDER
1. **RLS lockdown first.** It is a live vulnerability regardless of trading.
2. Duplicate instances.
3. `gift_card`.
4. UI.
5. Copy fix — or do it today as a stopgap, since the promise is live and the feature isn't.
