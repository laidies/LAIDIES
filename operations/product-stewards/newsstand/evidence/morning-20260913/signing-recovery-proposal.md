# LUMINAiRY signing recovery proposal — controlled replacement design

**Prepared:** 2026-09-13T14:57:02Z  
**Status:** proposal only; no key, signature, public artifact, or validator has been changed.

## Authorization and binding policy

No additional Ali approval is required for a scoped, non-chargeable recovery once it is assigned for implementation. `operations/codex-contract/rules/standing-authorization.md` and `operations/DECISIONS.md` (both September 12) authorize required integration and repair work; only new monetary commitments or an unrecoverable material direction require a pause.

The prior `final-v10/root-reconciliation.json` statement “no key rotation/bypass” is a root reconciliation hold, not a direct Ali rejection. It does not prohibit a controlled replacement under the standing authorization.

The binding LUMINAiRY policy found in `operations/product-stewards/luminairy/OPERATING-SPEC.md` and `FUNCTIONALITY-MAP.md` is narrower: the private signing authority must stay outside the public candidate; an exact claim needs an independently reviewed offline-P256 receipt; and the profile maker and independent review/signing role remain separate. No binding policy located in the checked sources prohibits a new controlled authority after the old credential is unavailable.

The proposed recovery is therefore a narrowly scoped **new offline P-256 signer authority** for the Hannah Fry successor only. It is not an attempt to recover, reuse, bypass, or weaken r3, r4, r5, or r6.

The proposed authority must have a new, date-bearing key ID. It must never reuse an r3–r6 key ID.

## Exact candidate being considered

- Candidate: `hannah-fry-profile-20260911`, `mavens/hannah-fry`
- Final candidate file: `operations/product-stewards/newsstand/candidates/hannah-fry-profile-20260911/final-v10/profile-candidate.json`
- Exact candidate SHA-256: `e0f413fea85c6ca00152e122812f46f84acd1db4b951d023bea12a244eb8273e`
- Exact proposed Hannah profile payload SHA-256: `bf98fd6a85fc452c57780c0d8d6cd505e45781185a062b766e155021f336f708`
- Root disposition: `NO_PROSE_CHANGE_REQUIRED_SIGNING_HOLD`; its source says the exact profile is editorially complete but currently lacks trusted offline signing material.

The candidate changes **only Hannah’s `about` field**. Its locked id, name, role, lesson, image, seven links, and freshness label are recorded byte-identical. It is not permission to revisit the text or change the other 42 profiles.

## What the recovery would change when implementation is assigned

The confirmed fresh provider overlay is `ffb5fbde`; it serves the four target paths. The September 11 frozen packet remains the exact preservation comparator:

`operations/product-stewards/newsstand/candidates/hannah-fry-why-maiven-20260906/current-base-20260911/`

Its relevant source hashes are:

| Source | SHA-256 | Planned disposition |
| --- | --- | --- |
| `luminairy-profiles.json` | `3eb61a4367d1884ff0155d30f410b986c979dee292534d373bc23b3ac8f21ed9` | Replace only the Hannah record with the approved exact candidate. All 42 other profile bytes must match this snapshot exactly. |
| `luminairy-claims.json` | `62f03d8f01f35b6586de485b066ad8edb126d2983f56a2da970f812c6927c264` | Add or replace only Hannah’s exact claim envelope and bind its successor profile hash. |
| `luminairy-editorial-receipts.json` | `6966da1ee436d8c6bcc527b2b4de52cb56d42ba1ba77e7a3591c0f8a0057af53` | Append the new public key ID to the trust list and add one Hannah receipt under it. Preserve every pre-existing receipt byte-for-byte. |
| `luminairy-claim-gate.js` | `9c6852b4d1d4be055bdb389d6395e359cdc2216a7b5f802ac39507d0f8291cde` | Add only the new public P-256 JWK so the browser can verify the new Hannah receipt. Preserve existing r3, r4, and r5 JWKs and verification behavior. |

The controlled overlay paths are `content/luminairy-profiles.json`, `content/luminairy-claims.json`, `content/luminairy-editorial-receipts.json`, and `content/site/luminairy-claim-gate.js`. Rehash the provider-overlay bytes at implementation start and bind them in the recovery receipt; do not use the older iCloud checkout as the integration base.

The governing validator may need a narrow public-key list update only if required by the confirmed overlay. It must retain the existing keys and remain fail-closed. No release, deployment, or public verification is included in this proposal.

## Required authority separation and private storage

1. **Custody:** the assigned implementation owner records a credential custodian and new date-bearing key ID before generation. The custodian creates the P-256 private key outside the repository.
2. **Durable storage:** use an existing access-controlled, encrypted local credential store with a separately documented encrypted recovery copy. Neither copy may be in the repository, iCloud project tree, `/private/tmp`, a chat transcript, shell history, build logs, or an environment dump.
3. **Independent signer separation:** the profile maker and the independent prose reviewer cannot sign the receipt. A role-distinct signer verifies the exact candidate hash and receipt payload independently, then returns only the signature and public JWK/key ID for integration. The signer does not edit the profile.
4. **No broad authority migration:** the new authority may sign only the Hannah successor receipt. Existing valid receipts and their verifier keys remain trusted and unmodified.
5. **No new paid service:** use an existing device capability or storage route. If no durable access-controlled local route and recovery-copy procedure can be established, stop; do not substitute a free personal cloud folder or temporary file.

## Exact verification plan

Before any public-path mutation, capture a manifest of the selected integration base and show that all 42 non-Hannah profile JSON byte ranges and all pre-existing receipt objects are unchanged.

After an independently produced signature is integrated:

1. Run the governing LUMINAiRY claim validator against the selected base; it must pass every existing receipt and the new Hannah receipt.
2. Run the browser claim-gate tests and a rendered browser check: Hannah renders only when the exact new receipt and public key are present; all prior admitted profiles remain available.
3. Verify the signer’s returned public JWK matches the public key installed in the gate and the new receipt’s key ID. Never compare or log private-key material.
4. Tamper-negative: change one byte of Hannah’s rendered claim/profile payload and prove the validator and browser gate hold Hannah.
5. Tamper-negative: change one byte of the new Hannah signature and prove the validator and browser gate hold Hannah.
6. Authority-negative: remove the new JWK or replace the receipt key ID with an unknown ID and prove Hannah holds fail-closed while pre-existing receipts still validate.
7. Preservation-negative: mutate any one historic receipt or remove r3, r4, or r5 from the trust list and prove the validation suite fails. Revert that test mutation before closeout.
8. Run the full relevant browser regression suite and record the exact provider-head commit, source hashes, test results, signer role, independent reviewer role, and public-key ID in a new admission record.

## Rollback

The integration change must be one atomic, reviewable commit with a pre-change manifest. If validation, browser verification, or independent review fails, do not deploy; restore the four controlled public files from that manifest. The recovery private key is retained only in the approved durable store, never committed or copied into the rollback material.

If a defect is discovered after an approved integration but before deployment, revert the single Hannah successor record, new receipt, and new public JWK together. Do **not** delete or alter historic r3–r6 public verifier entries or valid historical receipts. If the key itself is suspected compromised, stop publication and apply the then-current security/revocation procedure; this proposal does not define revocation policy.

## Preconditions and open implementation facts

- **No material authorization decision is missing in the checked binding policy.** Standing authorization covers a controlled, non-chargeable replacement when implementation is assigned.
- The implementation owner must establish and record a role-distinct custodian/signer and durable encrypted storage plus recovery-copy route. This is a required security control, not an Ali approval gate.
- The `ffb5fbde` provider overlay must be rehashed at implementation start; the four paths listed above are the integration scope.
- The validator and browser gate must accept an appended trusted key while retaining all existing verifier entries. If they do not, repair the compatible mechanism or hold the affected release; no bypass is permitted.

This remains a proposal-only task: it does not generate a key, sign Hannah, integrate, publish, or deploy. Those actions await a separately assigned implementation step, not a new user authorization.
