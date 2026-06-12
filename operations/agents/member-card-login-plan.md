# Member Card Login And Rewards Plan

## Decision

Use email magic-link login for the first real member-card account system.

Recommended implementation: Supabase Auth + Supabase Postgres.

Why this fits Laidies:
- The site needs identity, a database, and row-level privacy for rewards.
- Email magic links avoid passwords and reduce sign-up friction.
- Rewards are small structured records: stickers, cards, printable stamps, weekly song badges, and issue completion.
- Supabase gives auth and database in the same place, which is simpler than combining a standalone auth tool with a separate database.

## UX Rule

Never imply rewards are safely saved across devices unless the user has signed in.

Use three visible states:

1. Guest mode
   - Copy: "Saved on this device."
   - Rewards are stored in localStorage.
   - Good for same-browser return visits only.

2. Save my member card
   - Ask for email.
   - Send magic link.
   - After sign-in, sync local rewards into the account.

3. Signed-in member
   - Copy: "Synced to your member card."
   - Rewards follow the user across devices.
   - Member card shows collected stickers, cards, printables, songs, and issue progress.

## Late Reader Flow

If a reader joins in Week 6:

1. They see Start Here pinned.
2. They see a Back Issue Shelf with every released Issue Fun Pack.
3. They can open Issue 01 through Issue 05 in order.
4. Each completed activity writes to the same member-card reward ledger.
5. The current issue remains highlighted, but old packs stay available.

## Data Model

Minimum tables:

### profiles

- id: uuid, same as auth user id
- email: text
- display_name: text
- member_card_style: text
- created_at: timestamp
- updated_at: timestamp

### reward_events

Append-only ledger. This is the source of truth.

- id: uuid
- user_id: uuid
- reward_type: text
- reward_key: text
- issue_key: text
- source_activity: text
- earned_at: timestamp
- metadata: jsonb

Examples:
- reward_type: quiz_sticker
- reward_key: issue01-women-ai-gap
- issue_key: issue01
- source_activity: quiz

### member_card_rewards

Current display state, derived from reward events.

- user_id: uuid
- reward_key: text
- reward_type: text
- display_label: text
- display_order: integer
- count: integer
- first_earned_at: timestamp
- latest_earned_at: timestamp

### issue_progress

- user_id: uuid
- issue_key: text
- quiz_completed: boolean
- printable_opened: boolean
- card_pack_opened: boolean
- song_saved: boolean
- completed_at: timestamp

## Sync Logic

Guest mode:
- Store local rewards in localStorage.
- Mark UI as "Saved on this device."

After magic-link login:
- Read local rewards.
- Upsert profile.
- Insert missing reward_events.
- Rebuild member_card_rewards.
- Clear or retain local cache as backup.
- Mark UI as "Synced to your member card."

## Product Requirements

The login UI needs:

- "Save my member card" button near the Member Card Passport.
- Email field.
- Magic-link sent confirmation state.
- Signed-in state with email or display name.
- Sync confirmation after local rewards migrate.
- "Sign out" link.
- Plain warning in guest mode: "Switching browsers or devices can lose guest progress."

## CEO Review Standard

Top score means:

- A user understands whether progress is local or synced.
- A Week 6 reader can find Issue 01-05 without asking.
- Signing in does not interrupt the fun flow.
- Rewards are never duplicated incorrectly.
- Member-card rewards persist across devices after sign-in.
- The UX does not overpromise before login exists.

