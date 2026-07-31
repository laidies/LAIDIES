# SUNNYVAiLE building loyalty cards

**Status:** canonical product direction; the Town Wallet and visit counts are
the existing foundation; stamps, thresholds and fulfilment are not yet a
complete system  
**Home:** Town Wallet in the resident’s Closet

## The concept

Every SUNNYVAiLE building can issue its own period-appropriate loyalty card:
coffee-shop punch card, video-rental card, radio-listener card, library card,
hotline card, Book Fair pass, coaster stack or another object that belongs to
that place.

The card recognizes a resident’s relationship with that building. Meaningful
visits/actions earn stamps. More stamps produce building-specific recognition
and rewards.

This recreates the Rewind Era pleasure of finding a half-filled card in your
wallet and realizing the next coffee, rental or surprise is close.

## How it fits the reward system

Keep the three layers distinct:

| Layer | Meaning | Can it be spent? |
|---|---|---|
| **Building stamp** | Relationship/progress at one location | No |
| **Butterfly clips** | Universal SUNNYVAiLE currency | Yes |
| **Collectible/reward** | Object, access, personalization or keepsake | No; it is owned |

A loyalty milestone may grant:

- a building-specific collectible;
- a personalization option;
- a useful digital extra;
- a special experience or variant;
- a merit title such as `Regular`;
- a butterfly-clip bonus; or
- a combination chosen from the shared reward catalog.

It must never create a new building currency.

## Issue and stamp rules

- The first real visit/action issues the card. Unvisited cards can appear as
  clearly unissued silhouettes in the Wallet rather than pretending membership.
- A passive page load may record visit history but does not automatically
  deserve a loyalty stamp.
- Each building defines one to three qualifying actions tied to its actual job.
- Every action has one-time, weekly, capped or repeatable rules.
- Reloading, opening/closing a panel or repeating empty clicks cannot farm
  stamps.
- The resident sees what earned the stamp and what the next milestone offers.
- Stamps never expire and a missed week never breaks the card.
- A milestone reward is granted once, recorded and delivered before the card
  celebrates completion.

## Building program map

These are program directions, not final stamp counts or reward prices.

| Building | Loyalty-card form | Meaningful stamp candidate | Natural reward family |
|---|---|---|---|
| Visitor’s Centre | Visitor passport card | Complete orientation or a guided first route | Town map/background/welcome collectible |
| NewsStand | Newsstand frequent-reader card | Open/read a current Edition or save a useful story | Front-page print, headline card, archive extra |
| Chick Flicks | Video-rental membership card | Complete/read/listen/watch a released episode | Poster/VHS variant, screening extra |
| Blend & Snap | Coffee-shop punch card | Pick up/complete the weekly Study Pack or Try-On | Cup/card art, study printable, `The Usual` recognition |
| Mme CLAi-O | Hotline caller card | Complete a reading and choose/use the Move | Pep-talk card, reading variant, `Hotline Regular` |
| MAiKEOVER | Salon appointment card | Complete a meaningful check-in/profile update | Closet personalization/accessory |
| BRONZE AiGE | Coaster stamp stack | Existing once-per-week coaster action | Coaster art, liner note, `Regular` recognition |
| Dream Phone | Call log / phone card | Complete a full call/game round | Phone skin, caller card, secret line |
| The Mall | Frequent-shopper card | Use the Directory and open/save a useful reference/Town Tie | Avatar/object/display option |
| KSVL | Listener/request card | Play the current episode song or complete an intentional set | Cover art, liner notes, mix collectible |
| Post Office | Postage/passport card | Mail an eligible postcard, deliver a real gift or complete another defined connection action | Stationery/postmark variant, Resident Card background, connection collectible |
| Town Hall | Civic card | Complete a real vote, pledge or civic decision | Mayor stamp, placard, town-title recognition |
| LIBRAiRY | Library card / due-date grid | Open/read/save a book or complete a reference lookup | Bookmark, bookplate, shelf personalization |
| SUNNYVAiLE High | Report/Book Fair card | Complete a quiz or class | Clip bonus, school collectible, Fair perk |
| FAiRY Godmother | Wish card | Complete a useful prompt/wish flow | Extra Play where safe, wand/prompt collectible |
| Sorority House | House card | Make a safe, genuine community contribution | Room key/title/community collectible |
| LUMINAiRY | Votive/pilgrimage card | Explore a wing and save/learn from a person/move | Portrait card, votive, recognition |

No program ships from this table alone. The qualifying action and reward must
match the building’s current implemented verb.

## Abundance without overwhelm

Seventeen programs must not become seventeen chores.

The Wallet should show:

1. the card for the building the resident is currently visiting;
2. the closest one or two earned rewards;
3. recently stamped cards; and
4. the full Wallet only when she chooses to open it.

Do not place seventeen progress bars on the homepage. Do not require every
card to complete a weekly route. Loyalty cards are optional depth and
surprise—not another syllabus.

Each building page needs only:

- the physical card or stamp object;
- current stamp count/next reward;
- the qualifying action in plain language; and
- `Open my Town Wallet`.

## Existing implementation truth — 2026-07-24

Already present:

- The Town Wallet renders seventeen building membership cards in
  `laidies-card.html`.
- `content/site/sv-you-are-here.js` records a local visit count, first visit
  and last visit under `laidies_building_visits`.
- The Wallet displays visits, member-since month and a route back to each
  building.
- Page-load visit counting is throttled to once per building per thirty
  minutes.
- Several individual mechanics resemble loyalty programs: BRONZE AiGE coaster
  stamps and `Hotline Regular`, `Try-On Regular` and `Group Chat Regular`
  badges.

Not yet present as one loyalty system:

- Building-specific visual stamp grids/punches.
- Qualifying-action definitions separate from passive visits.
- Shared stamp-event ledger and deduplication.
- Per-building thresholds and reward grants.
- Reward delivery through the shared catalog/Closet.
- Cross-device member sync.
- A clear unissued/active/near-reward/completed card state.
- Durable progress for some current `Regular` badges; several count actions
  only within one session.

The public site can truthfully say visits are recorded. It should not yet
promise that every building loyalty card earns stamps and rewards.

## Data contract

Program definition:

```text
building_id
card_name
card_art
stamp_art
qualifying_actions[]
milestones[]
repeat/cycle rule
issued_on
active_status
```

Stamp event:

```text
stamp_event_id
resident_id
building_id
action_id
dedupe_key
episode_or_period
created_at
metadata
```

Milestone:

```text
milestone_id
building_id
stamp_threshold
reward_offer_id
repeatable
granted_at
fulfilment_transaction_id
```

The loyalty ledger owns stamps. The Butterfly Clip ledger records any clip
bonus. The reward catalog/ownership record delivers the object. One event can
connect those systems without making them duplicate each other.

For postcards, the Post Office stamp is only one part of the event. The
sender’s capped clip thank-you, background unlock, confirmed-join clips and
reciprocal BEST FRIENDS necklace follow
`docs/product/bring-your-people-reward-loops.md`.

## Reward and UX guardrails

- No stamp for passive refreshes.
- No broken streaks, expiry or “you lost your free one.”
- No public ranking of how much someone visits a sensitive/support space.
- No community stamp for spam volume.
- No reward promise before fulfilment exists.
- No core lesson or accessibility feature gated behind loyalty completion.
- No seventeen-card checklist on the default journey.
- Every stamp can be explained and every milestone can be audited.

## Build order

1. Keep visit history but stop treating it as loyalty completion.
2. Create the shared program, action, stamp and milestone registries.
3. Choose three pilot buildings with already-working meaningful actions:
   Blend & Snap, BRONZE AiGE and SUNNYVAiLE High are strong candidates.
4. Give the cards real stamp visuals and current/next-reward states.
5. Connect milestone grants to the Butterfly Clip/reward ledger and Closet.
6. Test local-to-member migration, deduplication and fulfilment.
7. Expand only after the pilots feel delightful rather than demanding.

## Definition of done

A resident can:

1. receive a building card after a real visit/action;
2. understand exactly what earns a stamp;
3. complete that action and see one stamp added;
4. see the same progress in the building and Town Wallet;
5. reach a milestone without farming or losing progress;
6. receive the promised reward; and
7. continue visiting because the relationship feels fun—not compulsory.
