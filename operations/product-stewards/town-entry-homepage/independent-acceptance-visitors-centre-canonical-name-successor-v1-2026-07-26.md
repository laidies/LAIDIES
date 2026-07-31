# Independent acceptance — Town Entry Visitor’s Centre canonical-name successor v1

**Verdict:** **ACCEPT — exact naming successor only.**  
**Reviewer boundary:** replacement independent Town Entry reviewer; no route,
shared-data, navigation, asset, deployment, provider or history mutation.  
**Reviewed at:** 2026-07-26 PDT

## Bound artifact and authority

- Canonical ruling: `../visitors-centre/NAME-RULING-2026-07-26.md`, SHA-256
  `665271f010bcc485febf774f0cc0918d28595c07fafbfbe2d5934d4351a6b309`.
- Control Room handoff:
  `../platform-reliability/control-room-handoff-visitors-centre-canonical-name-successor-v1-2026-07-26.md`,
  SHA-256 `fd0f4b45b1b7251407e0f9dc0c25e9f0d1bac690d2b75751b34d917b567dffcc`.
- Exact successor receipt:
  `../platform-reliability/canonical-name/v1/visitors-centre-name-successor-v1.json`,
  SHA-256 `7364bda6028a77302193c605f369a42f9850026d11bb727978d05802d298f694`,
  payload SHA-256
  `ab4135e5d2827def2722ee45cf2a48b16bb9a3b7d905cca8d8297e004d5faef7`.

The exact accepted Town Entry tuple is `index.html`
`d09d2acb6f8bcb54873de5009b75fea3551c81124ff925e55a9c2eb68a671189`
and `start-here.html`
`76c5f80edc543209a8fd5822ee31e1d47c3ef54a5750ebf164bce1a9fd902e56`.
The bound receiving route is `/visitors-centre.html`, SHA-256
`1d0e729dcc47d57eb2d942be0ac1e04aa793fcecbc84da2174beece2a4a4337a`.

## Independent Town Entry evidence

1. **NAME-001 — canonical route semantics: PASS.** `index.html` links to
   `/visitors-centre.html` with `Visitor’s Centre`; `start-here.html` uses the
   same exact label and route in metadata, orientation, status and no-JS
   doorway. The route remains unchanged.
2. **NAME-002 — no mixed or predecessor current label: PASS.** I reran the
   sealed shared-name and successor suites. They passed with three routes, 25
   bound current surfaces, 84 pre-scope forbidden tokens reduced to zero, five
   rejected negative mutations, and exact predecessor rollback. The current
   successor scope rejects `Welcome Wagon`, `Visitors Centre`, `Visitor's
   Centre` and `Visitor's Center`.
3. **ENTRY-003 — receiver and failure semantics: PASS.** The sealed projection
   has `visitors-centre` → `Visitor’s Centre` → `/visitors-centre.html`, held
   with `OWNER_RECEIPT_MISSING_FAIL_CLOSED`. `start-here.html` binds its exact
   successor payload SHA-256
   `2cb13956032e45a0bd2cd3132fe5630a8f0b7d4b5da1b88509c7d1a58bc19b61`;
   if it cannot verify it, it keeps an ordinary link to the named route.
4. **ENTRY-004 — no downstream-completion laundering: PASS.** The runtime
   receiver sets `completionClaim: false`; its fresh and fail-closed copy says
   route arrival is navigation/status checking, not completion. This meets the
   Town Entry operating contract.
5. **BOUNDARY-005 — unrelated fallback DOM dispute: NOT APPLICABLE TO THIS
   VERDICT.** The earlier joint test handoff concerns a stale private DOM-shape
   assertion for the Centre directory fallback. This successor does not alter
   that fallback contract, and the isolated concern cannot block the locked
   canonical-name propagation review.

## Scope and remaining gates

This ACCEPT closes the Town Entry independent-owner receipt for the exact
successor only. It does not accept the rejected Visitor building experience,
visible old-name map art, native Safari/VoiceOver, true 200% zoom, deployment,
public-origin/cache proof, or any navigation-distribution mutation. Any bound
hash change requires a new successor seal and reacceptance.

Control Room may now record the two-owner name receipt as closed and open the
separate curated-build navigation distribution lock. No Ali decision is
required for that next bounded action.

## Learning scan

No new qualifying failure or reusable prevention rule arose. Existing
`operations/painpoints-log.md` canonical-name successor rule already governs
this review: checksum-bound name corrections require an append-only successor,
old/mixed-name negatives, inverse rollback and fresh owner acceptance.
