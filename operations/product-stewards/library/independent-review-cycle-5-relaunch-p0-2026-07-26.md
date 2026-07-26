# LIBRAiRY Cycle 5 independent review

**Reviewed:** 2026-07-26  
**Reviewer:** portfolio release owner acting as independent judge; not the maker  
**Candidate:** exact Cycle 5 source and fresh artifact  
**Verdict:** **FAIL — 72/100; FIX AND REJUDGE**

## Decision

The candidate correctly makes all 15 books non-operable and removes the eight
held bodies from the release artifact. The standard 18-check source and artifact
suites pass. It does not clear the non-compensable trust or technical floors,
because two client-controlled records can bypass or break those truthful states.

## P0 findings

### LIB-C5-J1 — Mutable catalogue authority can open an attacker origin

`window.LAIDIES_LIBRARY_CATALOGUE` exposes the live `ALL` object. A hostile
fixture changed held `vocab-101` to `status: "available"` and set
`src: "//attacker.invalid/library-leak"`. Calling the public `openBook` function
opened the reader and attempted the attacker request in both source and the
fresh exact artifact.

`bookIsAvailable` checks only a mutable status string plus a truthy `src`; it
does not validate an immutable admission, exact book/source binding, or an
approved same-origin path.

### LIB-C5-J2 — Puffy storage accepts executable and malformed records

The Puffy board parses `laidies_puffies_board` without a record schema. A stored
record with `url: "javascript:..."` produced a live `javascript:` Closet link.
A stored `[null]` record threw while painting and left the board broken. Sticker,
URL, ID, date, length, duplicate and field-shape constraints are not enforced.
Write/read verification cannot make an unvalidated record trustworthy.

## Required bounded repair

1. Keep publication authority private and immutable; do not export a mutable
   object that `openBook` trusts.
2. Admit a book only through one strict record with a unique ID, exact approved
   same-origin source, publication status and content/package binding.
3. Reject protocol-relative, absolute, backslash, encoded-origin, control and
   unknown paths before any fetch or reader state change.
4. Strictly validate and canonicalize Puffy records on read and write. Admit only
   known stickers, safe LAiDIES-local routes, bounded strings, valid dates,
   unique IDs and the exact supported field set.
5. Drop/quarantine invalid legacy records with a visible recovery message; one
   malformed record must not break valid saves or the board.
6. Add the catalogue-takeover, external-source, `javascript:` Puffy, null,
   duplicate, extra-field, invalid-sticker and malformed-date fixtures to both
   source and fresh-artifact suites.

## Scores

| Dimension | Score | Finding |
|---|---:|---|
| Product quality | 16/20 | Honest HOLD/PREVIEW shelf, but zero available books means relaunch utility remains held. |
| Accuracy and trust | 12/20 | **Floor fail:** mutable catalogue and unvalidated saved routes bypass the stated boundary. |
| LAiDIES contribution | 17/20 | The room and copy stay coherent without pretending held books are complete. |
| UX and accessibility | 16/20 | Standard modal/storage paths pass; corrupt state can still break the board. |
| Technical integrity | 11/20 | **Floor fail:** attacker fetch, executable stored link and null-record crash. |

## Evidence

- Fresh artifact: `/tmp/laidies-library-independent.uH9vlU`
- Artifact: 1,082 files, 961.47 MiB; builder warning remains advisory.
- Library validator: PASS, 15 books / 8 HOLD / 7 PREVIEW / 0 AVAILABLE.
- Standard browser suite: PASS, 18 checks.
- Hostile source and artifact:
  - external catalogue request attempts: 1;
  - rendered Puffy `javascript:` href: 1;
  - null-record page errors: 1.

Editorial admission, accuracy/currentness, ECO owner review, newcomer testing,
Safari/VoiceOver/native zoom, correction workflow, Miss Jeeves quality,
analytics, owner visual approval, public origin, release provenance and artifact
size remain held. No implementation, state, registry, queue, Git, deployment or
external service was changed by this review.
