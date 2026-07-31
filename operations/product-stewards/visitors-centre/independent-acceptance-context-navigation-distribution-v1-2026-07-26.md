# Independent acceptance — contextual-navigation distribution v1

**Verdict:** **ACCEPT — exact Visitor consumer scope.**

The sealed receipt `a6d263d07ca15709362cb479cbc4f9e18a22f2bc9eddf6fef369bcae3c7465da`
and payload `6018ccf30c65dab26fd7aa0095b1c2007c1b4fdd7b44d7de0e63f326c477152c`
match. Candidate, builder, module and tests bind as supplied; frozen Visitor
route is `1d0e729dcc47d57eb2d942be0ac1e04aa793fcecbc84da2174beece2a4a4337a`.

Independent sealed tests passed:

- distribution: 88 curated artifacts, inventory `cc99d6d5…e786c`, exactly one
  mount each, duplicate/hash/malformed/missing-body fail-closed, four ordered
  Previous/Next pages byte-equivalent, idempotent, inverse rollback PASS;
- receipt: PASS, 10 bound files;
- consumer matrix: PASS, 9 rendered / 3 no-JS / internal same-origin return.

The candidate behavior proof covers direct, external and internal same-origin
returns, 48px mobile fallback, 320/390/1440 no-overflow, keyboard/focus,
no-JS directory/route preservation and unchanged Visitor containment. It uses
no storage, analytics, provider, cache or backend mutation.

**Limitations / next action:** native/public proof and ordered-experience
judgment remain separate. This does not change or validate the Ali-rejected
Visitor experience model, nor authorize containment removal, deployment or
public release. Next: retain the exact receipt through the separate ordered
experience/native/public gates.
