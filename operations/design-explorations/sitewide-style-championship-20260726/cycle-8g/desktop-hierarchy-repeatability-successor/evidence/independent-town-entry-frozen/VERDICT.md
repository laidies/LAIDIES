# Cycle 8G independent Town Entry frozen verdict

**Verdict:** **HOLD — FROZEN TUPLE INVALID**  
**Evidence time:** 2026-07-27T20:09:09Z (initial hash read); final current-byte reconciliation immediately after verdict write recorded below  
**Judge scope:** checksum-bound Town Entry admission only; no maker, source, render, receipt or manifest was changed.

## Byte verification

Every byte was re-hashed before any content, parity, geometry, accessibility, visibility or visual judgment. The submitted tuple is not frozen: at the initial read the manifest matched, while the receipt, CSS, both colour renders and MAiN Street mobile render did not. At final reconciliation the manifest itself also differed, proving mutation during this judge audit. Under the Cycle 8G brief, any frozen-byte change is an automatic HOLD. Therefore no substantive PASS/HOLD assessment may treat this as a valid frozen tuple.

| Artifact | Expected SHA-256 | Actual SHA-256 | Result |
|---|---|---|---|
| `SUCCESSOR-MANIFEST.json` | `ca1c06c2aac82b0687dcbd67b08ddfe1c39773284928f40809d8c98228318806` | `e82c97d7c3b8228edb110f241e641a06e6fd445d378ccdbb5345914f177f840a` | **MISMATCH** (initially matched, then changed during audit) |
| `CAPTURE-RECEIPT.json` | `96d57dada3c6c190739fa16c383195fbd9629650d9edc18ff1cdc3b9b7d26cdb` | `e83bd3996555a1bd2ebebdd6f0ddbfc3f2834794e375416e85ed9da68a385ecf` | **MISMATCH** |
| `proofs/proofs.css` | `c96d7afff011dad68ed03f9728310a2c9e5778b3d10c46c73f498a5c3fa13f54` | `5fad8f4406d526302e57d0549046f94871df751a324c58550096fe9a9f0de6be` | **MISMATCH** |
| `colour-energy-hierarchy-1440.png` | `24d6f5abf78dbb57a16bf19ba2fc9e0cd5ce96c7081ea651d11d435b20969905` | `8c194fd49da02a1547bfb465bfa0af69d296c5e53c138a776f201356f5350639` | **MISMATCH** |
| `colour-energy-hierarchy-390.png` | `896bf60b48443b4d6b8a06d016479776d4a861f1eb36e0eee90cb5cfd85ea9ef` | `41c95db6b4dd6a5edf4759fa59720b08be6036a3e9ef9877545bf69456c3edd3` | **MISMATCH** |
| `main-street-mobile-390.png` | `84badd3fbf0d8c2a65f3d4913639926c7af6892cc8160006abe4c5366fc5c4b2` | `4b14a2020d0f88e48086c64e83ffd379aa70814684030d83e628e021eb2aa4f2` | **MISMATCH** |
| `willow-lane-1440.png` | `583215f9e26ea7af4b710fe1fd4004993036af3f80a178323b189ad718fbf466` | `583215f9e26ea7af4b710fe1fd4004993036af3f80a178323b189ad718fbf466` | MATCH |
| `willow-lane-390.png` | `623ebe85a6d32dc338449a2ceb181f090841caaabf84eb43abf1c694eb8d6069` | `623ebe85a6d32dc338449a2ceb181f090841caaabf84eb43abf1c694eb8d6069` | MATCH |

## Scope and lock truth

- The current manifest is no longer the supplied sealed manifest, and its embedded receipt/CSS/colour/MAiN hashes do not describe the current bytes.
- The valid tuple condition is false. Receipt claims (unmasked containment, five visible mobile steps, image completeness and accessibility/visibility facts) are not admissible as frozen evidence because the receipt byte is not sealed.
- Content/image/job parity with Cycle 8F, unmasked containment, five-of-five mobile visibility, accessibility, and visual/desktop hierarchy are **NOT ASSESSED**. A judge must not infer them from an unbound receipt or mixed render family.
- No authorization is created for Homepage assembly, production/shared/live mutation, deployment, publication, or an Ali decision.
- This verdict writes only this independent evidence file; the named maker/source/render/receipt/manifest files remain outside the judge write scope.

## Remaining work and exact next action

Remaining work: the producing lane must reconcile why the current receipt, CSS, colour renders and MAiN render differ from the supplied frozen tuple, then either restore the supplied exact bytes or generate a new internally consistent tuple and issue a new manifest plus Control Room dispatch with fresh expected SHA-256 values.  
**Exact next action:** Control Room must keep Cycle 8G at **HOLD** and request a maker-side freeze reconciliation; only after a new dispatch’s complete actual-byte table matches may an independent Town Entry judge run parity, unmasked-containment, 5/5 mobile, accessibility and visibility checks.
