# Post Office Wave 3 candidate

Local isolated candidate for the complete Penny counter → service windows →
postcard rack → writing desk → published drawer experience.

Serve the repository root, then open:

`/operations/design-explorations/building-wave-3/post-office/index.html`

Deterministic fixtures:

- `?catalog=malformed`
- `?archive=fail`
- `?newsletter=blocked`
- `?image=fail`
- any admitted `?pc=<id>` postcard selection

The candidate does not call Buttondown, Supabase, an invitation service,
rewards, analytics or a public deployment. It preserves those as explicit
external/shared gates while making the complete local building experience and
one-governed-catalogue data contract testable.

Run:

`node test-candidate.mjs`
