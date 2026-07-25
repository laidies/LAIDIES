# Postcards & Referral — subproduct contract

**Status:** SPECIFIED — local compose/share preparation exists; recipient delivery, invite acceptance and rewards are unavailable/unverified.

**Job:** let a visitor make a card and choose a user-controlled way to share it. `/postcard.html` owns the composer; `post-office.html` passes only a card selection. A visible selected card, copied link or resolved native share sheet is a local/browser receipt. It never proves a recipient, mail/SMS delivery, open, join, account or relationship.

| State | Truthful outcome | Recovery |
|---|---|---|
| choose/write | card/note prepared locally | keep draft if share action fails; do not persist note without explicit policy |
| native share available | share sheet opened; resolution may be “closed” | cancellation is neutral; offer copy/SMS/email fallback |
| native share unavailable | use accessible labelled fallback controls | no browser/device blame; preserve content |
| copy | clipboard API reports copied | clipboard denial gives selectable link/text fallback |
| email/SMS link | browser handed off to chosen app | cannot claim app opened, recipient sent/received/opened |
| open a generated link | opens the publicly selected postcard at the composition desk; it carries no note, sender handle, recipient or invite relationship | an unknown card id falls back to the standard card; no private recipient route exists |
| referral/reward | **unavailable** | no partial client retry or local flag can grant/revoke value |

**Privacy:** generated postcard links carry only `?pc=<id>`; do not put private notes, sender handle, recipient contact, auth material or raw invite relationship in query strings, share URLs or analytics. The note stays in the user-controlled text/email/native-share message. Native Share must not access/upload contacts. **Future invitation prerequisite:** opaque server-issued invite ID; sender/recipient consent; server-side state machine (`issued → accepted → qualified → rewarded/reversed`); authenticated two-account test; self-invite/fraud/rate cap; immutable completion ID; idempotency key; authoritative ledger display; refund/reversal and support path. This is owned by Identity, Rewards & Connection, not the postcard composer.

**Economy/revenue:** no current reward, credit, unlock or charge. Future recognition cannot reward clicks, share-sheet closure or page views; it must be free to receive, capped, reversible and non-coercive. No referral access/data/addresses are sold, and no retry is paid. **Analytics:** only capability, action result category and safe fallback category; exclude note, URL, handle, contact, recipient and token. Controlled testing needs two approved test identities only after a future invite service exists; today it may test local/browser availability without calling a provider.
