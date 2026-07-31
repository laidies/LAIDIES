# Entry readiness/current-content projection contract v1

**Status:** BUILT AND VERIFIED LOCALLY — BACKSTAGE RELEASE CONTROL ONLY; HOMEPAGE PUBLIC CONSUMER SUPERSEDED  
**Version:** 1.0.0  
**Observed:** 2026-07-26T18:27:12Z  
**Owner:** Functionality & Platform Director  
**Affected acceptance owners:** Town Entry/Homepage; Visitor’s Centre;
destination owners; Episode Experience; NewsStand; Control Room/Release

## Product boundary

This contract answers only:

> What public, owner-approved status may an entry surface show right now for
> each named destination and for the latest episode, Breaking and Daily slots?

It does not establish that a destination works, that a route visit completes
anything, that a user has an identity, that content is editorially admitted,
or that a local candidate is deployed.

## Authoritative producer path

The required production path is:

`destination/content owner receipt → Platform/Release compiler →
checksum-bound projection → exact release artifact → authorized backstage
release checks and separately accepted semantic consumers`

Each owner receipt must provide:

- registry product ID, public destination ID, owner ID, exact route and name;
- one of `available`, `limited`, `held`, or `withdrawn`;
- bounded public label, summary, mandatory limitation and internal
  disposition;
- owner evidence path, SHA-256 and observation time;
- item freshness deadline; and
- exact artifact kind/ID/SHA-256, or an explicit all-null `none`.

Platform verifies the owner evidence bytes before sealing. It does not infer a
PASS from registry `launch_status`, a route response, a product state label or
the previous projection. The local fixtures use a clearly synthetic receipt;
they are not owner readiness claims.

Current-content producers are:

- `latest-episode`: Weekly Episode Experience;
- `breaking`: NewsStand Breaking owner; and
- `daily`: NewsStand Daily owner.

Exactly those three slots are required. Quiet Breaking carries no title,
route, date or artifact. Withdrawn content carries no actionable route or
artifact. Only `available` current content is promotable.

## Envelope and schema

Machine schema:
`readiness-projection/v1/readiness-current-projection-v1.schema.json`.

The immutable envelope binds:

- schema/record version;
- projection ID and monotonic sequence;
- generated and expiry times;
- exact predecessor or explicit first projection;
- the fixed fallback route;
- all 17 canonical destination records;
- exactly three current-content slots; and
- detached RFC8785-JCS SHA-256 over the complete payload.

The canonical destination crosswalk deliberately separates public directory
IDs from registry product IDs for `ksvl-radio → ksvl` and
`sanctuary → luminairy`. Unknown, missing, duplicated or route/owner/name
mismatches fail closed.

## Freshness and correction

- Maximum envelope window: 24 hours.
- A projection more than five minutes in the future rejects.
- Every destination/current item has its own `freshUntil`; it must be after
  generation and no later than the envelope deadline.
- Owner evidence cannot post-date projection generation.
- Correction, hold or withdrawal produces a new projection with a higher
  sequence and exact `replacesProjectionId`.
- A correction is incomplete until both receivers load the successor or fail
  closed. Cached status may not outlive its item/envelope deadline.
- Release must bind the exact payload SHA-256; a structurally valid but
  different projection rejects as `RELEASE_BINDING_MISMATCH`.

## Idempotency and failure

- Same projection ID + same payload hash replays the original semantic result.
- Same projection ID + different payload rejects as
  `IDEMPOTENCY_CONFLICT`.
- Lower/equal successor sequence rejects as `NON_MONOTONIC_PROJECTION`.
- An invented/skipped predecessor rejects as `REPLACEMENT_CHAIN_GAP`.
- Missing source evidence or byte-hash mismatch prevents sealing.
- Invalid schema, unknown fields, payload tamper, stale/future data, partial
  artifact identity, incomplete/duplicate sets and canonical mismatches all
  return `fail-closed`.

Fail-closed is usable, not blank:

- current-content promotions become an empty set;
- all 17 canonical names/routes remain available;
- every destination becomes `unavailable` with one generic limitation;
- the receiver announces that current status is unavailable; and
- every output retains `completionClaim: false`.

## Receiver contracts

### Homepage / Start Here — superseded public consumer

The former Homepage readiness/current projection integration is superseded by
`D-2026-07-26-069` and the Platform public-UX boundary v1. Homepage and Start
Here must not import this runtime or projection, mount receipt/status UI, or
turn operational labels, limitations, route names, hashes or failure codes
into visitor-facing copy.

`entryCurrentContentReceiver()` remains testable backstage code; it is not a
Homepage presentation API. A future atomic weekly release interface may
provide structured editorial facts only after separate producer, Town Entry,
Brand and release acceptance. Town Entry and Brand own all visitor words and
composition. Missing or rejected release data stays backstage and leaves the
approved evergreen presentation intact.

### Visitor’s Centre

`visitorCentreSemanticReceiver()` returns exactly 17 public objects:

`destinationId, name, route, state, label, summary, limitation, actionLabel,
completionClaim=false`.

It specifies behavior, not DOM shape. It does not require `hidden`, a
particular element ID, layout, map implementation or component. On failure it
still returns all 17 named routes with generic status-check language. Escape,
focus return, live-region rendering and actual route arrival remain the
Visitor’s Centre/accessibility owner's integration tests.

## Privacy and analytics

The projection contains public product/readiness facts only. Strict
additional-property rejection prevents identity, Card, account, email, query,
form, local-storage, referral, note or session data from entering the
contract.

The local analytics adapter emits only:

- event: `entry_projection_received` or
  `entry_projection_failed_closed`;
- `schema_version`;
- `surface` (`homepage`, `start-here`, `visitors-centre`);
- `receiver_mode`; and
- controlled `error_code`.

It does not emit owner evidence, hashes, labels, summaries, limitations,
routes, destination choices or identity. A future destination-handoff event
requires the shared analytics lock and product-owned learning question; this
contract does not wire Plausible or any provider.

## Acceptance and integration ownership

| Gate | Owner | Required proof |
|---|---|---|
| Schema/seal/receiver integrity | Platform technical judge | Exact tests and mutation/failure fixtures PASS |
| Homepage boundary | Platform technical judge + Town Entry owner | Exact Homepage imports no readiness projection/runtime and exposes no operational copy, receipt, hash, failure code or status-card mount |
| Visitor receiver semantics | Visitor’s Centre owner | 17-name/route/limitation parity, missing-data fallback, no completion claim |
| Content/destination truth | Each destination, Episode and NewsStand owner | Fresh signed/bound contribution accepted for the exact release |
| Accessibility/runtime | Independent accessibility/runtime judge | Semantic output rendered with status announcement, keyboard/Escape/focus return and no-JS/data-failure parity |
| Integration/release | Control Room + independent Release | Shared-file lock, exact source/projection/artifact hashes, rollback pair and public-origin verification |

No one owner can upgrade another product's status. Platform acceptance permits
integration work; it does not admit Homepage, Visitor’s Centre or any
destination.

## Shared build placement

The admitted shared build location is `content/site/readiness/v1/`. The
deterministic Platform compiler writes:

- `entry-readiness-projection.v1.json`;
- `readiness-current-projection-v1.schema.json`;
- `readiness-runtime-v1.js`; and
- `canonical-destinations.v1.json`.

`scripts/build-public-site.mjs` explicitly includes those four files in the
curated artifact. The default intake has exactly 17 destination owner slots
and three content-owner slots; every `receiptPath` is null. The compiler
therefore emits 17 held destinations and zero promotable current-content
items. It refuses non-null receipt paths until the corresponding owner-receipt
integration lock admits their format and evidence.

## External/shared gates

Can be completed locally now:

- schema, compiler/sealer, receiver logic, canonical crosswalk;
- synthetic positive/adversarial fixtures;
- freshness, correction, idempotency, privacy and fail-closed tests; and
- integration packet and exact acceptance ownership.

Completed under the bounded shared projection lock:

- exact versioned schema/runtime/envelope/crosswalk placement in the shared
  build source;
- deterministic compiler and 17-owner/three-content-slot null intake;
- fail-closed Node and browser runtime tests; and
- explicit inclusion in the curated public-artifact builder.

Still requires owner/consumer integration locks:

- owner receipt format adoption across 17 destination dossiers and the three
  current-content slots;
- Visitor’s Centre or other explicitly approved semantic consumer wiring;
- continued Homepage non-consumption proof and removal of any duplicated
  operational status prose;
- rendered-browser and accessibility tests; and
- release artifact/rollback binding.

Requires staging/public authority:

- representative cache/expiry/correction propagation in the deployed runtime;
- analytics provider delivery verification if instrumentation is approved;
- deployment, rollback drill and public-origin journey proof.

No database migration, credential or external provider is required for the
projection itself.
