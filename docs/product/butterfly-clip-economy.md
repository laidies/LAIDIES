# The Butterfly Clip economy

**Status:** canonical product direction; implementation partially exists; not
yet approved as a complete public promise  
**Town currency:** butterfly clips  
**Principle:** the more a resident meaningfully learns, tries, explores,
contributes and returns, the more SUNNYVAiLE recognizes and rewards her

## The role of butterfly clips

Butterfly clips are the universal earned currency of SUNNYVAiLE. They make
participation visible and let residents choose rewards that make the town more
useful, personal, collectible and fun.

The loop is:

```text
do something meaningful
        ↓
earn butterfly clips + see why
        ↓
bank them in the Closet
        ↓
spend or save them
        ↓
receive a real reward
        ↓
use/display/share it and discover the next thing
```

Butterfly clips should make someone want to do more. They must not make her
feel punished for missing a week or unable to access the core learning.

## One currency, several kinds of reward

Keep the system legible:

- **Butterfly clips** are spendable town currency.
- **Charms, stickers, merit badges and trading cards** are earned/collected
  objects. They are not separate currencies.
- **Progress, quiz scores and completed weeks** are records, not money.
- **FAiRY Plays** may remain a clearly labelled service allowance for a
  resource-limited tool, but not a competing general town currency. A future
  option may allow clips to redeem an extra Play if cost and safety make sense.
- **Real money** remains completely separate.

A visitor should never need an exchange-rate chart to understand her Closet.

Building loyalty cards are a companion system:

- stamps stay on the issuing building’s card and show relationship/progress;
- stamps are not spendable;
- completing a card may grant a collectible, experience or butterfly-clip
  bonus through the shared reward ledger.

See `docs/product/building-loyalty-cards.md`.

## What earns clips

Every earning action must represent learning, practice, useful exploration,
contribution or a meaningful return—not empty clicking.

Possible action families:

| Family | Examples | Reward principle |
|---|---|---|
| **Learn** | Read/listen/watch an episode; complete a class | Reward completion once, with honest detection |
| **Practise** | Finish the Try-On; use a tool for the episode skill | Reward the attempt/result, not perfection |
| **Check** | Take a Pop Quiz; improve understanding | Best score can affect payout, but low scores still welcome retry |
| **Explore** | Complete the Express/Full Tour; find an intentional town trail | Reward purposeful orientation, not page-refresh farming |
| **Judge** | Verify a claim; complete a discernment game | Reward the method used |
| **Contribute** | Complete a safe community action | Reward genuine participation with caps; never pay for spam |
| **Connect** | Mail an eligible postcard; welcome a distinct new resident; complete an opted-in learning action together | Give a small capped send thank-you and a larger reciprocal reward for a real joined relationship |
| **Return** | Complete a released weekly route | Celebrate return without fragile daily streaks |

Every action record needs:

- action ID and plain-language label;
- clip amount;
- why it earns;
- one-time/repeatable/capped rule;
- completion signal;
- episode/week attribution where relevant;
- deduplication key;
- signed-in/local behavior;
- analytics event; and
- abuse/privacy note.

Exact payouts require a balancing pass. Do not invent amounts independently on
each page.

## What clips can buy

Start with digital rewards that work immediately and cost little to fulfil:

- phone/desktop wallpapers;
- printable bookmarks, postcards, mini-zines and cheat-sheet variants;
- rare/foil card variants;
- Closet backgrounds, shelves, frames and personalization;
- avatar/outfit/accessory options;
- quote cards and KSVL liner-note art;
- bonus town scenes, Easter eggs or behind-the-scenes material;
- limited Book Fair drops;
- gifting/postcard extras; and
- extra uses of a resource-limited tool where operationally safe.

Core episodes, transcripts, foundational learning, accessibility and essential
practice must not sit behind clip prices.

Every offer records:

- offer ID, name, description and art;
- clip cost and availability window;
- destination/building;
- what the resident actually receives;
- where it appears after redemption;
- download/use/display action;
- repeatability and stock/limit rule;
- fallback/error/refund behavior;
- ownership proof; and
- public QA evidence.

“Redeemed” is not complete until the reward arrives where the copy promised.

## Book Fairs and spending around town

The Scholastic Book Fair is the clearest event-based shop: it creates
anticipation, limited collections and a reason to save clips. It should remain
special rather than becoming the only place clips have meaning.

Town locations can carry a small, coherent reward shelf tied to their job:

- KSVL: liner notes, covers, mix art or radio collectibles;
- Chick Flicks: poster/box-art variants or screening extras;
- MAiKEOVER/Closet: personalization and display options;
- Mall/Gift Shop: digital objects and later physical-product tie-ins;
- Post Office: stationery/postcard variants;
- LIBRAiRY/High: bookmarks, printable study objects and Book Fair claims.

Do not add a store to every page. The town needs one shared wallet, one offer
catalog and consistent redemption behavior.

## Current implementation truth — 2026-07-24

Useful foundation already exists:

- `content/site/clip-bank.js` derives earned clips from best Pop Quiz scores
  plus one clip per completed Express Tour episode.
- It subtracts redemptions from the local
  `laidies_bookfair_redeemed` ledger.
- `laidies-card.html` shows available clips in the Butterfly Clip Jar.
- `bookfair.html` has eight priced drops, balance checks and one-time ownership
  checks.

Important gaps:

- Earning is currently limited to quizzes and Express Tour completion.
- Postcard sends and confirmed invited-resident joins do not yet post clip
  transactions, even though the BEST FRIENDS necklace-on-join path exists.
- The economy is stored locally and is not yet a durable cross-device member
  transaction ledger.
- The Book Fair says redemptions land in the Closet, but the Closet currently
  subtracts their cost without rendering the redeemed objects into a reward
  collection.
- The eight Book Fair product images are not marked ready.
- Several downloads are `#` placeholders with a “coming soon” response.
- Town-wide spending outside the Book Fair is not implemented.
- FAiRY Plays appear as another bank and need a clear allowance-vs-currency
  explanation.

Until those gaps are resolved, social/reveal copy must not promise a complete
town economy or claim that every redeemed object appears in the Closet.

## Technical source of truth

The durable version needs one append-only transaction ledger:

```text
transaction_id
resident_id
kind: earn | spend | adjustment | refund
amount
action_or_offer_id
dedupe_key
episode_or_event
created_at
metadata
```

From that ledger:

```text
available = earned + refunds + adjustments - spent
```

The balance displayed in the Closet, Book Fair and every town shop must derive
from that one ledger. The local system needs a one-time migration/deduplication
path when signed-in sync becomes authoritative.

## Economy guardrails

- No purchased clips at launch.
- No cash value or implied real-money exchange rate.
- No pay-to-learn or pay-to-accessibility.
- No daily streak loss, expiring earned balance or shame for returning late.
- No reward for spammy shares, comments or page refreshes.
- No redemption before the asset and landing destination exist.
- No silent balance changes.
- Every earn/spend event explains what happened.
- A failed transaction leaves the balance unchanged and offers recovery.
- A resident can see earned, spent, refunded and available totals.

## Revenue later—not now

The clip economy can eventually reveal demand without becoming the revenue
model itself. High clip redemptions show which objects, formats and experiences
people value.

Possible future revenue paths, only after audience/return behavior exists:

- physical versions of popular earned digital objects;
- premium printable or resource collections;
- live classes, workshops and events;
- memberships with additional experiences—not withheld foundations;
- team/ERG learning packages;
- sponsored Book Fairs or aligned brand collaborations; and
- creator/artist collaborations.

Real-money offers must have normal prices and checkout. Clips may recognize
participation or unlock a member perk, but should not obscure what something
costs or pressure someone to buy.

## Build order

1. Inventory and reconcile every existing earning/reward/storage source.
2. Fix the Book Fair → Closet delivery promise or hide redemption until it
   lands.
3. Create one earning-action registry and one offer catalog.
4. Make one balance/transaction ledger authoritative across town.
5. Add a small launch catalog of complete digital rewards.
6. Add town shelves only where the building’s job makes sense.
7. Measure earning, saving, redemption, use and return.
8. Expand based on behavior; keep revenue dormant until demand exists.

Product companions:

- `docs/product/building-loyalty-cards.md`
- `docs/product/bring-your-people-reward-loops.md`
- `docs/product/quotables-and-memory-hooks-system.md`
- `docs/product/sustainable-growth-and-revenue-principles.md`

## Definition of done

A resident can:

1. complete an eligible action;
2. see exactly what she earned and why;
3. see the same balance everywhere;
4. choose a real, available reward;
5. redeem without duplication or negative balance;
6. find/use/display the reward where promised; and
7. see the complete transaction in her Closet.
