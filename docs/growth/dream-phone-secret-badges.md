# Dream Phone Secret Badges

## 867 Club

Idea source: hidden Dream Phone Easter egg.

When a reader dials `8675309` or `867-5309`, Dream Phone should unlock a secret merit badge/sticker called `867 Club`.

## Current Behavior

- The secret number returns a special Dream Phone message.
- The badge is stored in the shared secret badge collection and syncs to `member_reward_events` when the user is signed into Clubhouse Pass.
- A small `867 Club merit badge` sticker appears under the Dream Phone output.
- The three Dream Phone remix cards work after the unlock:
  - Share a Secret
  - Speaker Phone
  - Mom Says Hang Up!

As of June 9, 2026, the hidden merit badge system is implemented across multiple site fixtures. Quiz stickers, card-pack pulls, and Clubhouse sticker controls still exist, but they are regular rewards/navigation, not hidden merit-badge unlocks.

Implemented hidden merit badges:

- `867 Club` - dial `8675309` or `867-5309` in Dream Phone.
- `Hotline Regular` - call Madame CLAI-O five times in one session.
- `Remix Scholar` - use all three Dream Phone remix cards after a call.
- `Receipts Drawer` - open/search the Reference Closet around receipts, sources, proof, or verification.
- `Try-On Regular` - shuffle the Five-Minute Try-On five times in one session.
- `Group Chat Regular` - draw five Girl Talk cards in one session.
- `Coven Reservation` - open all four Businesswomen's Special paper-fortune lanes.
- `Room Key` - post in one chat room.
- `Every Room, No Notes` - post in every chat room.

## Site Clues

The homepage now introduces the hidden badge idea in two places:

- Clubhouse Pass: hidden merit badges are starting to appear around the site.
- Dream Phone: one unlisted number unlocks a secret merit badge.
- Community rooms: one room post earns the Room Key sticker; posting in every chat room earns the Every Room, No Notes merit badge.
- Member cards/profile: all available hidden badges appear as a collection, with earned badges filled in and locked badges shown as dotted outlines.

## Account Persistence

All available rewards should be treated as member-account rewards. The site can use local storage as a guest-mode cache so the interaction does not fail before sign-in, but signed-in users should sync earned rewards to Supabase `member_reward_events`.

Hidden badges use:

```text
reward_type = secret_badge
dedupe_key = secret-badge:{badge-id}
```

Community room progress uses:

```text
reward_type = community_room_post
dedupe_key = community-room-post:{room-id}
```

## Copy

Base response:

`867-5309 connected. I like the way you think. You found the secret Dream Phone line and earned the 867 Club merit badge. Open your Clubhouse Pass so the badge can stay pinned to your member card.`

## Member-Card Behavior

1. Secret badge unlock writes to the shared secret badge collection immediately.
2. Signed-in users sync hidden badges to the account reward table.
3. Earned badges appear filled on the member card/profile surfaces.
4. Locked hidden badges appear as dotted outlines so members can see what is still missing.
5. Guest-mode unlocks can be claimed by opening Clubhouse Pass in the same browser session before the cache is cleared.

## Badge System Direction

Merit badges should be reserved for hidden unlocks, deeper participation, or special rituals rather than ordinary quiz completion.

Possible future secret badges:

- `Prompt Closet Regular` - unlock by returning to a saved printable or prompt flow.
- `Glossary Girl` - unlock by cycling through a full Glossary Rolodex set.
- `Burn Book Receipts` - unlock by submitting a suspicious AI claim to the Burn Book.

## Community Room Reward Notes

The current homepage preview board can award the `Room Key` and `Every Room, No Notes` rewards when someone posts in the matching room categories. The real Hyvor chat rooms should award the same badges from approved comment data once webhook or Console API processing is connected.

Current all-room set:

- Ask the Room
- Send It Energy
- The Try-On Debrief
- Wins of the Week
- Dear lAIdies
- Put It in the Burn Book
- Mix CD Exchange
