# Chick Flicks independent acceptance — episode release schema v2

**Status:** INDEPENDENT ACCEPTANCE COMPLETE — HOLD / REJECT V2 FOR ADMISSION  
**Lane:** BACKSTAGE EPISODE RELEASE PLUMBING — NOT BUILDING AN EPISODE OR
CHANGING THE LIVE SITE  
**Acceptance owner:** Chick Flicks product champion  
**Candidate:** `EPX-CF13-SCHEMA-2026-07-26-v2`  
**Candidate receipt:**
`operations/product-stewards/episode-experience/release-manifest-schema-candidate-v2-2026-07-26.json`  
**Evidence time:** 2026-07-26 11:11:27 PDT  
**Integration lock:** joint shared/live lock remains held and not ready

## Verdict

**HOLD.** The exact Platform-passed v2 is checksum-intact and resolves the v1
hash-preimage, schema-execution, history-target, proof-chain-type and safe
hold/removal fixtures. It does not enforce the full Engine → Chick Flicks
admission boundary. Five independently constructed records were valid against
the bound Draft 2020-12 schema and were also accepted by the exact maker
semantic validator despite contradicting their referenced candidate,
admission or episode.

This is a judge record only. No Engine, Platform, schema, fixture, test,
registry, queue, route, player, media, production or other shared/live file was
edited.

## Exact candidate and upstream evidence

| Check | Observed result | Verdict |
|---|---|---|
| Candidate ID | `EPX-CF13-SCHEMA-2026-07-26-v2` | MATCH |
| Candidate file SHA-256 | `b1813da7654277b8fa3dd8e8106c10ec63d16f45fdd0485af81d6744a5470fad` | MATCH |
| Candidate payload RFC 8785/JCS SHA-256 | `f62c3cf67363096ea161ad91dd529eb4087e86c46ef19573843552941cbae5f1` | MATCH |
| Bound files | 40 unique paths; 40/40 byte hashes independently matched | PASS |
| Maker command | `RELEASE MANIFEST V2 CONTRACT PASS valid=11 invalid=22 schema=draft2020 mutation_controls=5` | REPRODUCED |
| Platform command | `PLATFORM EPISODE RELEASE V2 PASS checksum_bound=40 schema_negative=3 mutation_controls=5` | REPRODUCED |
| Platform receipt | exact v2 reported PASS | RECEIVED |

## V1 false-accept re-test

The exact v2 now rejects the six v1 cases covered by its bound fixtures:
invented rollback target, absent format with released availability, present
listen-along without media verdict, duplicate required files, unsafe removal
and unknown proof supersession. Detached full-body hashing, a both-null
zero-history first addition, append-only same-type proof chaining and
fail-closed hold/removal are therefore **PASS within the supplied cases**.

Those repairs do not establish Chick Flicks admission because the validator
does not compare several identifiers and per-format admission values with the
records their hashes resolve.

## Independent Engine → Chick Flicks adversarial evidence

Each record below:

1. was derived from a bound valid v2 record;
2. remained valid under the exact bound Draft 2020-12 JSON Schema;
3. was resealed with its correct full-body JCS SHA-256; and
4. was accepted without error by the exact v2 `validateSemantics` function.

| False-accepted record | Body SHA-256 | Required invariant violated |
|---|---|---|
| Chick Flicks admission marks absent `motionFilm` as `accepted` | `dde63da818a4eaeea16ff3e31882a0ff123274aeb1cdd1c8115ff554519aca8a` | admission must not accept a format the referenced candidate declares absent/unavailable |
| admission uses unrelated `transactionId` | `6325c1462a5535e2135de2205ccfe8bcba529a2a2576073b93553166b8670cd6` | admission transaction must bind to the referenced candidate transaction |
| Engine proof uses an invented candidate ID with a real candidate hash | `9248efcada2709a8c11684b57864b8e34207278cf1d0ee7f2b8eecc35e62c33e` | proof candidate ID and hash must identify the same candidate |
| Chick Flicks proof uses an invented admission ID with a real admission hash | `ed2946021062e4c3d932253a48566038664babd5e9be911dd6bf0590945258d1` | proof admission ID and hash must identify the same admission |
| availability control names `episode-99` while targeting the Episode 5 candidate | `f644f2bc5c443f786e093b0963461a2e120611de848024d2a0d8d8faf04ae255` | hold/removal episode ID must bind to the target candidate episode |

The first case alone blocks Chick Flicks: it permits an unavailable media file
class to be admitted into watch presentation. The remaining cases break the
sealed chain of custody among episode, transaction, candidate, admission,
proof and availability control.

## Acceptance boundary and next trigger

- **Observed:** exact candidate hashes and 40/40 bound files match; maker and
  Platform suites reproduce; five additional schema-valid semantic false
  accepts reproduce.
- **Inference:** no public/runtime defect is claimed. This HOLD is bounded to
  release-interface admission.
- **Maker repair authority:** Weekly Episode Engine with Functionality &
  Platform technical review.
- **Chick Flicks authority used:** independent evidence only.
- **Joint lock:** remains held; no production, site, player, catalogue,
  analytics, public or release mutation is authorized.
- **Next trigger:** a newly sealed candidate ID/hash that has first passed
  Platform re-review and rejects all five exact cases above.

## Reproduction

```text
node operations/product-stewards/chick-flicks/test-episode-release-v2-independent-acceptance.mjs
```

Expected judge result contains:

```text
{
  "verdict": "HOLD",
  "candidateId": "EPX-CF13-SCHEMA-2026-07-26-v2",
  "boundFilesVerified": 40
}
```

## Learning scan

**Qualifying learning:** schema closure and strong receipt-chain fixtures still
do not prove cross-record identity or per-format admission. A hash lookup can
succeed while a neighboring human-readable ID or format disposition names a
different subject.

**Prevention rule:** every ID/hash pair and every admitted format must be
validated against the resolved record, including transaction ID, episode ID,
candidate ID, admission ID and present/availability/media/accessibility state.
Exercise those comparisons with independently authored, schema-valid negative
records.

**Possible Behind the Build angle:** “Every checksum matched, but the player
could still admit a film the package said did not exist.”

The shared `operations/painpoints-log.md` was not edited because the joint
shared-file lock remains held. Control Room and the makers receive this durable
judge record for routed learning.
