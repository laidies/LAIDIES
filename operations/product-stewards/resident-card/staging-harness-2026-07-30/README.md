# Resident identity / Closet isolated staging harness — 2026-07-30

**Status: BUILD REQUIRED.** The harness is prepared and statically verified, but
this machine has neither the Supabase CLI nor Docker, so no local database,
Auth instance, migration application, captured email, or disposable account
was run. This package never falls through to a configured remote project.

## Boundary

- Runtime is created only under ignored `runtime/` and uses project ID
  `laidies-resident-staging-20260730` on ports 55321–55324.
- Local Supabase's Inbucket is the email sink at `http://127.0.0.1:55324`.
  The fixture address is the non-routable `example.test` address in
  `local.env.example`; do not substitute a personal address for local testing.
- The runtime uses the eleven repository migration inputs pinned in
  `migrations.sha256`. Their source checksums are verified before copying.
  This proves the source release-chain input, **not** that an unknown remote
  project has these migrations.
- Scripts never use `supabase link`, a project reference, access token or a
  remote command. Do not add one.

## Required local build and test

1. Install the Supabase CLI and start Docker Desktop; verify `supabase --version`
   and `docker info` succeed.
2. Run `scripts/bootstrap-local.sh`, then `scripts/start-local.sh`.
   `start-local.sh` starts the isolated stack and applies the copied migration
   set with `supabase db reset --local`.
3. Start a static local server on `127.0.0.1:4173` for a **local copy** of the
   released test artifact whose Supabase config points only to the `supabase
   status` local API URL/key. Do not edit Homepage source or its production
   configuration to do this.
4. Use only `resident-staging-20260730@example.test`. Request one magic link,
   open it solely from Inbucket, and record only timestamps/result categories.
   Do not save the message body, address, token, URL, profile answers or logs.
5. Run the bounded sequence: fresh request → link exchange → account state →
   claim an intentionally synthetic Card → sign out → fresh request/link →
   verify state again. Confirm a second clean browser profile sees only the
   account-backed projection and that the device-local Closet remains labelled
   device-local. Do not test rewards, public Cards, avatar generation, or a
   real resident.
6. Run `scripts/cleanup-local.sh` immediately afterward. It stops only this
   project and removes its database, keys, Inbucket mail and fixture user.

## Optional remote magic-link matrix (not authorized to run by this package)

Ali's email authorization permits a narrowly controlled delivery check only
after all four rows are known and recorded outside an inbox:

| Required fact | Safe value | Stop if absent |
|---|---|---|
| Target | named isolated Supabase project/ref, confirmed not the configured live project | no request |
| Identity | unused dedicated Ali-controlled alias/test address; never an existing Resident account | no request |
| Scope | one request, known redirect, one test browser profile, no account claim/profile/public/reward mutation | no request |
| Cleanup | authorized deletion method for the exact synthetic auth user and retained auth-email/log policy | no request |

The prior packet (`../maikeover/controlled-external-test-packet-2026-07-25.md`)
specified two synthetic accounts and no-email/token evidence, but it was never
executed and does not name a safe alias or target. Therefore this harness has
no current remote test address or target. The precise blocker for a real
delivery test is: **provide/confirm one unused dedicated Ali-controlled alias
and the exact isolated project reference plus cleanup authority.**

## Static validation performed

Run `node scripts/verify-harness.mjs`. It verifies every pinned source hash,
the local-only configuration, and guards against remote-link commands.
