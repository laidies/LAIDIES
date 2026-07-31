# PR-05 build packet — privacy-safe aggregate measurement v1

**Status:** BUILT AND VERIFIED LOCALLY — PROVIDER/ACCOUNT INTAKE NOT CONNECTED  
**Evidence time:** 2026-07-26 12:11 PDT  
**Owners:** Platform contract/compiler; Audience & Growth definitions and
interpretation; Identity for verified account-backed Resident Card creation;
Privacy for minimization/retention; Control Room for admission  
**Authority used:** local repository files and provider-neutral tests only. No
account, credential, provider, spend, deploy or public-route authority used.

## Literal result

Platform built a versioned, checksum-bound aggregate snapshot and fail-closed
consumer for Audience Week 01. It compiles the current Audience source record
without inventing provider results:

- visitors: `null / not-connected`;
- new visitors: `null / not-connected`;
- verified account-backed Resident Card creations: `null / not-verified`;
- returning rate: `null / not-connected`;
- page rankings: unavailable with an empty item list;
- social: repository counts only — 35 planned, 35 built locally, 0 admitted
  ready and 0 provider-verified published.

`UNKNOWN != 0` is executable: an unavailable metric carrying `0` or any other
number rejects. A known, source-ready zero remains valid evidence when it is
eventually supplied by an authorized aggregate source.

## Exact producer → contract → consumers

```text
Plausible read-only aggregate report/API
  → versioned Plausible adapter (not yet authorized)
  → laidies.aggregate-measurement.v1 snapshot
  → Control Room aggregate cards + Audience weekly learning packet

Identity canonical member/profile store
  → suppressed daily count of first verified account-backed Card creation
  → laidies.aggregate-measurement.v1 snapshot
  → Control Room conversion card + Audience weekly learning packet

Audience repository production/admission ledger
  → provider-neutral compiler
  → repository-counts-only social block
  → Control Room production/admission view

Social provider publication receipts
  → authorized channel adapters (not yet authorized)
  → provider-verified social block
  → Audience outcome review
```

The Card path cannot count device-local Card recognition, a clean-browser
preview, a form submission, an auth attempt or an unverified profile. None of
those proves login, account-backed residence or cross-device persistence.

## Definitions and freshness

| Field | Definition | Freshness | Owner/action |
|---|---|---|---|
| Visitors | Plausible unique visitors for the exact period | source observation plus 24-hour snapshot validity | Audience + Platform connect read-only aggregate reporting |
| New visitors | Provider-classified new visitors under a recorded methodology | same | Audience approves definition before import |
| Resident Cards | First verified account-backed canonical profile/Card creation | suppressed daily aggregate after staging Identity proof | Identity + Platform apply/prove staging and expose aggregate |
| Returning rate | Provider aggregate rate for the exact period; not identity or cross-device proof | same | Audience + Platform record Plausible method |
| Page rankings | Aggregate unique visitors by controlled route ID; cohort minimum 5 | same | Platform suppresses small cohorts; Audience interprets only after exposure |
| Social | Planned/built/admitted/published stay separate | repository snapshot until provider receipts exist | Audience binds exact provider URL/time receipts |

The current Audience source says “Last 30 days” rather than exact start/end
dates. The compiler therefore uses the named Week 01 board dates for the local
snapshot period and does not claim a connected 30-day provider window. A real
provider adapter must supply exact period boundaries.

## Privacy and security boundary

The snapshot is aggregate-only, keeps no raw provider rows and publishes no
cohort smaller than five. It prohibits email, name, account/user/Card IDs, IP,
user agent, session ID, raw URL/query string, prompts, messages, saved content
and Clarity recordings. Controlled route IDs and aggregate counts are allowed.

The current shared event dictionary is compatible at its generic boundary:
its seven events allow only controlled categorical properties and explicitly
exclude private content. Product owners still owe product-specific semantics;
the presence of Plausible or Clarity scripts is not delivery proof.

Provider secrets stay server-side and are not represented in the envelope,
evidence or logs. A provider error, stale snapshot, tamper, incomplete source,
invalid time or missing privacy constraint returns all metric values as
`null`, empty rankings and no social result.

## Idempotency and corrections

The payload is RFC8785-JCS canonicalized and SHA-256 sealed. The same source
bytes and source observation produce the same snapshot ID and payload hash.
Changed results require a new source observation and resealed successor.
Consumers reject tampering and do not merge partial old/new snapshots.

A provider correction creates a new source observation and successor snapshot;
it never rewrites the prior evidence file. Audience interpretation and action
records remain separate from measurement truth.

## Files and exact local proof

- `aggregate-measurement/v1/aggregate-measurement-v1.schema.json`
- `aggregate-measurement/v1/aggregate-measurement-v1.mjs`
- `aggregate-measurement/v1/test-aggregate-measurement-v1.mjs`
- `aggregate-measurement/v1/current-measurement-snapshot.v1.json`
- `../../../scripts/build-audience-measurement-snapshot-v1.mjs`
- `evidence-aggregate-measurement-v1-local-2026-07-26.md`

```text
node operations/product-stewards/platform-reliability/aggregate-measurement/v1/test-aggregate-measurement-v1.mjs
AGGREGATE MEASUREMENT V1 PASS metrics=4 null_unknown=4 sources=3 invalid=10 stale=1 schema_mutations=3 privacy=aggregate-only provider=none

node scripts/build-audience-measurement-snapshot-v1.mjs
AUDIENCE MEASUREMENT SNAPSHOT V1 BUILT metrics=4 known_values=0 payload_sha256=2760c3aff93f139b386af831b1f2f61d825792995771f21064e9243e97774c87
```

## Acceptance and release proof

| Gate | Required proof | Acceptance owner |
|---|---|---|
| Contract/compiler | Schema/runtime mutation suite, deterministic hash, future/stale/tamper failure | Platform independent reviewer |
| Definitions | Exact provider methodology, period and action interpretation | Audience & Growth |
| Identity aggregate | Staging Auth/RLS proof and query counting only first verified canonical creations | Identity + Platform + Privacy |
| Provider authority | Named existing account/project, read-only scope, secret owner and retention | Control Room + provider account owner |
| Delivery | Exact aggregate result reaches a non-public staging consumer; timeout/retry/rate/provider-error stay fail-closed | Platform + Control Room |
| Privacy | Minimum cohort, prohibited-field/log inspection, Clarity raw replay excluded | Privacy |
| Release | Exact source/adapter/snapshot/consumer hashes, rollback and public-origin aggregate health receipt | Independent Release |

## Blockers and exact next action

**External blocker:** no authorized Plausible shared report/Stats API path,
exact provider methodology/window or secret owner exists in this task.
Identity’s migration and account/RLS proof remain local/unapplied, so a
production Card count cannot be claimed. Social provider accounts/exports are
also not connected.

**Next action:** Control Room names an existing Plausible account access path,
read-only scope, owner, exact reporting window and staging consumer lock.
Platform then implements the isolated adapter and runs delivery/error/retry
proof. Identity aggregation follows only after the authorized Identity staging
gate. Audience & Growth independently approves definitions and interpretation.

**Proactive improvement:** the compiler now converts the existing free-form
measurement record into a strict null-preserving envelope and rejects future
timestamps, stale snapshots, privacy regression, ranking leakage and
publication overclaim before they can reach a dashboard.
