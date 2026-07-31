# Account-entry test packet — 2026-07-30

**Status: REPORT READY / REAL SERVICE BLOCKED.** This packet adds no provider
configuration and sends no email. It reconciles the request to use an
Ali-controlled mailbox with the earlier disposable-account work.

## Exact prior mechanism

There is no July 29 disposable-account record in the operational daily log.
The durable source is the unrun
`../../maikeover/controlled-external-test-packet-2026-07-25.md`:

1. obtain two fresh authorized synthetic inboxes (Account A/B), exact release,
   isolated browsers and an exact project/migration version;
2. request one link; record only result and delivery timestamps;
3. exercise expired/used then fresh link, account claim and sign-out/sign-in;
4. test account isolation, private/public/revocation and second-device state;
5. delete synthetic users and retain only redacted result rows.

That packet is a plan, not an executed result. Its local predecessors prove
only deterministic mocks: `scripts/test-identity-account-contract.mjs`,
`scripts/test-identity-cross-device-vertical.mjs`,
`scripts/check-maikeover-contract.mjs`, and optionally
`scripts/test-maikeover-browser.mjs`.

## Three execution bands

| Band | Can run now | Exact command | Evidence path | What it proves |
|---|---|---|---|---|
| Local contract and mock proof | Yes; no mailbox needed | `scripts/run-proven-local-proof.sh` | ignored `evidence/local-proof-<timestamp>/` | client/migration contract and deterministic account-state model, never real Auth/RLS/email |
| Ali-controlled address preflight | Yes; no email is sent | `LAIDIES_TEST_EMAIL='dedicated-address' scripts/preflight-ali-address.sh` | terminal result only; do not log the address | address shape only, not inbox control, account absence or delivery |
| Local Supabase + Inbucket | Not on this machine | `scripts/bootstrap-local.sh && scripts/start-local.sh` | ignored `runtime/`, Inbucket, then redacted `evidence/` | real local Auth/migrations/email capture once Supabase CLI and Docker exist |
| Real magic-link delivery | Blocked | no command is authorized | none until gate opens | requires an isolated remote target and deletion authority |

Run the first command from this harness directory. To include the existing
browser proof, supply its local dependency explicitly:

```bash
PLAYWRIGHT_CORE_PATH=/absolute/path/to/playwright-core \
  scripts/run-proven-local-proof.sh
```

## Ali-controlled address decision

A plus-address alias can be a suitable *dedicated test address* only if all of
these are true:

- Ali confirms that it delivers to her mailbox and it has never been used for
  a Resident or other account in the target project;
- it is a new, purpose-specific label (for example, a dated staging label),
  not an address associated with a real Resident;
- the test target is an identified isolated project, not the configured live
  project; and
- its post-test synthetic user has a named deletion method and an approved
  record-retention outcome.

The alias is not safe merely because it reaches the same inbox: a magic-link
request can create or affect an auth user for that literal address. The local
preflight deliberately cannot verify target-project absence, so it is not a
send authorization.

## Gate before any real delivery request

All facts below must be supplied together. Stop without sending if one is
unknown.

| Required | Exact acceptable evidence |
|---|---|
| Isolated target | Supabase project reference/name and owner confirmation that it is not the configured live project |
| Migration identity | applied migration list or migration hash receipt matching `migrations.sha256` |
| Address | dedicated Ali-controlled address confirmed unused in that target |
| Scope | one request, one known allowlisted redirect, clean browser profile; no profile, Card claim, public visibility or reward action |
| Cleanup | named admin/API deletion path for that literal synthetic auth user, plus mail/auth-log retention result |
| Evidence | redacted timestamp/result table under ignored `evidence/`; never email address, link, token, message body, screenshot or browser console dump |

Once the target is authorized, execute only the minimal account-entry slice:
request one link → open it in the clean profile → verify session/account state
→ sign out → delete the synthetic user. Do not claim a Card, alter a profile,
make anything public, or test a reward. Run cleanup immediately and record the
delete receipt category, not the user ID.

## Cleanup

- **Local:** `scripts/cleanup-local.sh` stops only the harness stack and removes
  its ignored database, Inbucket messages, generated keys and fixture user.
- **Remote:** blocked until the target owner supplies the exact deletion method.
  A sign-out, expiry or removed browser cookie is not user deletion.

The package intentionally has no remote CLI/API command: encoding one before
the isolated project is confirmed would make a live-project mistake too easy.
