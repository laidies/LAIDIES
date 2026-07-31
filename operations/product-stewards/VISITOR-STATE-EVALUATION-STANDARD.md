# Visitor-state experience evaluation standard

**Status:** STANDING PRODUCT AND RELEASE CONTROL
**Applies to:** every LAiDIES building and any subproduct whose experience,
permissions, continuity or result changes with visitor state
**Owners:** building champion (experience) · Functionality & Platform Director
(recognition, identity, persistence and shared contracts)

A single clean-browser test cannot establish that a product works. Every
building must deliberately design and independently evaluate these three
primary visitor states:

1. **First-time visitor** — no reliable prior LAiDIES state is available.
2. **Returning visitor without a Resident Card** — prior device/session
   activity may exist, but the product has no proof of a Resident Card or
   account-backed identity.
3. **Resident Card holder** — a valid Card is available at the scope actually
   proved. Record whether that means device-local Card, signed-in
   account-backed resident, or both; never use “resident” to imply unproved
   login, ownership, public identity or cross-device restoration.

Add other states when material: signed in without a completed Card, invited
visitor, another resident viewing a public surface, signed-out former account,
deleted/revoked resident, moderator/admin, subscriber or paid member.

## Required experience matrix

| Visitor state | How the product can truthfully recognize it | Arrival and orientation | Primary job and action | Existing state shown | Prompts withheld or offered | Success/result and next step | Return promise |
|---|---|---|---|---|---|---|---|
| First-time visitor |  |  |  |  |  |  |  |
| Returning, no Resident Card |  |  |  |  |  |  |  |
| Resident Card holder — device-local scope |  |  |  |  |  |  |  |
| Resident Card holder — verified account scope, if supported |  |  |  |  |  |  |  |

The returning experience must add useful continuity, not merely replay the
newcomer introduction. The resident experience must use known state only when
it improves the job and must still explain changed, unavailable or newly added
features.

## Required transition suite

Test the transitions, not only three isolated screenshots:

- first visit → leave → return without creating a Card;
- first/returning visitor → create Card → return on the same device;
- device-local Card → sign in or claim account, when supported;
- signed-in resident → sign out → return;
- resident → second tab and second device;
- expired, corrupt, partially written, migrated or storage-denied state;
- Card/profile update → every affected page;
- Card/account deletion, privacy change or revocation → every affected page;
- referral/deep-link arrival → valid resident transition or honest fallback;
- account/local conflict → explicit merge, choose, replace or fail-safe result.

## Proof and launch rule

For each state and transition, record:

- starting data, browser/device and identity scope;
- recognition evidence and prohibited assumptions;
- exact route and action sequence;
- frontend, backend/service and authoritative store involved;
- expected visible outcome and downstream propagation;
- empty, loading, error, retry, duplicate and offline behavior;
- accessibility and mobile/desktop evidence;
- analytics event using privacy-safe properties only; and
- source, exact artifact and public-origin evidence appropriate to the claim.

If only device-local continuity is proved, say **on this device**. If a
Resident Card is cosmetic/local, do not imply membership, login, synced
ownership, private access or cross-device continuity. A state receives
**FIX**, **HIDE/LABEL**, **HOLD** or **POST-LAUNCH** disposition independently;
one passing state cannot lend its PASS to another.
