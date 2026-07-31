# Control Room handoff — shared-header asset/cache binding v1

Status: `VERIFIED LOCALLY / RELEASE INTEGRATION PENDING`  
Independent evidence time: 2026-07-26 13:25:09 PDT (-0700)  
Binding ID: `SVGH-320-2026-07-26-v1-ASSET-CACHE-v1`

## Exact accepted binding

| Artifact | SHA-256 |
| --- | --- |
| `shared-header/v1/release-binding/asset-cache-binding-v1.mjs` | `c5392086f6e54ac1372ec630df0c47bc6ec72a221a3fe416dd59de6eb62e01b6` |
| `shared-header/v1/release-binding/svgh-320-asset-cache-binding-v1.json` | `4c0e49780c7d184aa2e930e92b4a5afecc1520c37e97939d7a480e862af0dd4e` |
| `shared-header/v1/release-binding/test-asset-cache-binding-v1.mjs` | `efa77451ba0e6e71b0aa06d7de26364855b2f8981e0deb04ca795858cd93ef63` |
| independent receipt | `27d38ffa26eea8e0d51b10a465a5570862181750c176fe551327de754728d37a` |
| independent test | `6d2b73bfa7e1233508b3ffdbfea68fb81c1343fb6f0b3748b59ec96ecf3de22d` |

Detached payload SHA-256:
`9b6536bbed0df7e808764df5b5ded525f33918e1451a3f92eeec5922ae22c361`.

Release version:
`svgh-320-2026-07-26-v1-807bbe6b17ab`.

Rollback version:
`rollback-c5d72fad-f500707712e1`.

## Verification

Maker:

```text
ASSET CACHE BINDING V1 PASS ... valid=2 invalid=12 current=3 release=3 rollback=3 mutation=false
```

Independent Town Entry:

```text
INDEPENDENT ASSET CACHE BINDING PASS ... valid=2 adversarial=6 rollbackGitBytes=PASS idempotent=PASS mutation=false
```

The exact source, Homepage, Start Here, Visitor, maker receipt and both
consumer acceptances match. The seal is non-circular; the release key derives
from source bytes; mixed/stale/tampered/authority-escalated bindings fail
closed; Start Here remains a non-consumer; and rollback bytes/object/length/
checksum are recoverable and verified from Git.

## Lock scope and next action

The local binding lock is closed. No route was changed. Homepage and Visitor
still request `v=20260715-1`; Start Here still does not request the asset.

Next action is a new checksum-bound shared-route lock limited to the header
version reference in `index.html` and `visitors-centre.html`. Both references
must switch in one curated artifact to:

`/content/site/sv-global-header.js?v=svgh-320-2026-07-26-v1-807bbe6b17ab`

The changed route hashes must then be resealed and independently reaccepted.
This lock does not authorize Visitor containment removal, unrelated route
edits, deployment or public-cache mutation.

After exact route reacceptance, remaining gates are native Safari, VoiceOver,
true browser zoom, immutable/public-origin source and route bytes, browser/CDN
cache-bust delivery and rollback observation.

## Separate queued dependency

The repaired contextual-return candidate remains outside this completed lock:

- `content/site/sv-back-nav.js` SHA
  `8a777b88fdebe077c3987b1b869c24350d28ea3fba5a3e01ac91f24e33e7c778`
- standalone suite SHA
  `03206ca4e160102ba780de007dd736e9ab34ebb2b4707df1a2d64d91475e846a`
- maker evidence SHA
  `5e45c96901b9a29d64db5eec1c672c5b902b3645ba1a80de60c63b57091026c5`

Its behavior passes on the 18 source pages that load it. A separate successor
distribution lock must establish sitewide reach, duplicate-mount prevention
and preservation of explicit ordered Previous/Next controls.

