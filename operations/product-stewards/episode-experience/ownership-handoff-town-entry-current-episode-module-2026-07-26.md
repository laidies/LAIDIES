# Weekly Episodes → Town Entry current-episode module interface

**Contract version:** `EPX-HOME-CURRENT-EPISODE-v1`
**Status:** SPECIFIED / CAPTURED FOR JOINT INTEGRATION — NOT IMPLEMENTED,
INTEGRATED, DEPLOYED OR PUBLIC
**Trigger:** Ali clarified that the homepage masthead/hero is evergreen brand
architecture. Weekly release changes belong in a separate dynamic
current-episode module.
**Producer:** Weekly Episodes — Engine & Production
**Consumer and presentation owner:** LAiDIES Homepage & Town Entry
**Shared integration/release owner:** Control Room with Platform

## Locked boundary

- The homepage masthead, hero composition, core value proposition and evergreen
  primary architecture do **not** change for each weekly episode.
- Weekly Episodes supplies one atomic, versioned current-episode release
  record. It does not edit homepage visual architecture or decide the module's
  responsive presentation.
- Town Entry consumes the whole accepted record into a separate
  current-episode module. It does not independently reconstruct episode truth
  from `content/episode-index.json`, filenames, route presence or hard-coded
  Episode 04/song values.
- A weekly record is a data/integration handoff, not permission to edit the
  masthead, deploy the site or call an episode current.

## Atomic record

The producer supplies all fields together:

```json
{
  "schemaVersion": "1.0.0",
  "recordType": "homepage-current-episode",
  "recordId": "homepage-current-episode-episode-NN-v1",
  "episode": {
    "number": "NN",
    "title": "Canonical episode title",
    "summary": "Approved current-module summary.",
    "image": {
      "src": "/path/to/admitted-image.webp",
      "alt": "Approved meaningful alternative text.",
      "sha256": "64-lowercase-hex"
    },
    "links": {
      "read": "/issues/issue-NN.html",
      "watch": null,
      "listen": null
    },
    "releaseDate": "YYYY-MM-DD",
    "song": null,
    "cardPackKey": null
  },
  "fallback": {
    "mode": "evergreen-or-previously-published",
    "label": "Truthful fallback label",
    "summary": "Truthful fallback explanation",
    "image": {
      "src": "/path/to/fallback-image.webp",
      "alt": "Meaningful fallback alternative text.",
      "sha256": "64-lowercase-hex"
    },
    "links": {
      "read": "/truthful-evergreen-or-previous-route",
      "watch": null,
      "listen": null
    }
  },
  "authority": {
    "episodeReleaseCandidateId": "checksum-bound release candidate ID",
    "canonSha256": "64-lowercase-hex",
    "episodePackageSha256": "64-lowercase-hex",
    "publicProofReceiptId": "verified public episode-package receipt ID"
  },
  "integrity": {
    "bodySha256": "SHA-256 of canonical JSON for every field except integrity"
  }
}
```

### Field rules

- `number`, `title`, `summary`, `image`, `releaseDate` and `fallback` are
  required.
- `read`, `watch` and `listen` are explicit nullable links. A missing format is
  `null`; it is never inferred from a file or route.
- `song` is either `null` or one complete object containing `title`, `artist`,
  `audioSrc`, `playerUrl` and exact media `sha256`. Town Entry must not retain a
  prior weekly song when the new record says `null`.
- `cardPackKey` is either `null` or the exact pack key accepted by Trading
  Cards. A planned or merely present pack is `null`.
- `fallback` is required and self-contained. It renders when the candidate is
  missing, stale, malformed, checksum-mismatched, unadmitted, withdrawn or its
  public proof is invalid.
- Every route and asset is root-relative and must belong to the exact accepted
  episode package or accepted fallback.

## Atomicity and lifecycle

1. Weekly Episodes builds the complete candidate record only after the
   checksum-bound episode package exists.
2. Platform validates schema, canonical checksum, package identity and public
   proof. Town Entry independently accepts the whole record and its fallback.
3. The current-episode module swaps from one accepted record to another in one
   operation. It never patches the title, image, links, song or pack key
   independently.
4. Correction, withdrawal or replacement produces a new record and checksum;
   the prior record remains immutable. A held record renders its bound
   fallback.
5. Public “current” language is permitted only for the exact record with valid
   public proof. A local record, page route or successful fetch is not public
   admission.

## Current implementation evidence

Read-only inspection on 2026-07-26 found:

- `content/site/homepage.js` defines a hard-coded Episode 04 `WEEKLY_SONG`.
- The projection receiver can update `.entry-episode-action` and render current
  cards, but it does not atomically update the season panel, song or all
  episode links.
- The same script resets the season panel to Episode 04.
- `index.html` independently hard-codes Episode 04 in the hero action, season
  rail, read/listen buttons and KSVL-labelled route.
- `content/episode-index.json` contains useful historical episode metadata but
  has missing dates/media fields and conflicting Episode 04 song history; it
  is not release authority.

These are integration findings, not authorization to change the current
homepage.

## Acceptance gate

The joint maker packet must prove:

- exact schema and checksum validation;
- complete-record replacement with no mixed old/new fields;
- `song: null` clears prior song state;
- nullable watch/listen/card-pack states render honestly;
- missing, malformed, stale, unadmitted, withdrawn and checksum-mismatched
  records render the bound fallback;
- desktop/mobile/keyboard/assistive-technology presentation in the separate
  current-episode module;
- masthead/hero brand architecture remains byte-for-byte or
  independently proven behaviorally unchanged within the agreed integration
  scope;
- correction, rollback and cache propagation use the exact superseding
  record; and
- deployed public proof binds the same record bytes, routes and assets.

Town Entry owns module presentation and visitor comprehension. Platform owns
the validated shared delivery contract. Weekly Episodes owns editorial truth
and the atomic record. Control Room owns the shared-file and deployment lock.
Ali retains major visual/taste and public release authority.

## Current disposition

**CAPTURE AND CONTINUE.** This interface does not interrupt Episode 02's active
still-only repair or activate Episode 05. Implementation waits for a
non-colliding joint Control Room packet. No homepage, masthead, hero, shared
projection, live route or public file was changed by this record.
