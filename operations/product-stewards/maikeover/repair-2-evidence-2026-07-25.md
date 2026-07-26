# MAiKEOVER controlled preflight — Repair 2 evidence

**Status:** REPAIR 2 PASS LOCALLY — FINAL INDEPENDENT REJUDGE PENDING  
**Release status:** NOT DEPLOYED · NOT PUBLICLY VERIFIED  
**External-authority hold:** ACTIVE

## Bounded repairs

1. The authoritative `laidies_resident_card_v1` envelope now contains the
   MAiKEOVER card and every visible local Closet edit. Both surfaces verify the
   one write, restore exact prior bytes after any failed/non-standard mutation,
   return failure and withhold success.
2. The public Card selection now matches
   `public-card-field-contract-v1.json`, a separate Identity/Privacy-owned
   contract. `generation`, `industry` and `ai_comfort` are prohibited and are
   absent from the browser query, deterministic public fixture, DOM and URL.
3. The browser suite now proves logical Tab order across all seven drawers,
   held/error focus targets and recovery, complete deduplicated live
   announcements, computed text/disabled/focus contrast, distinct 200% and
   400% layout proxies, Closet success/failure and the held Resident Card route.
4. The Repair 1 envelope, Share, injection, Account A/B, visibility revocation,
   public-table isolation and controlled-network-deny checks remain passing.

## Verification

Source browser result:

```text
MAiKEOVER BROWSER PREFLIGHT PASS
proof=local atomic-card UI/storage/error/privacy/deterministic Account-A-B mock only
not_proof=production auth,email,public-card,RLS,avatar,reward,cross-device
```

The same unmodified browser suite also passed against a fresh release artifact.
Contract, inline-JavaScript, local-link, town-integration, steward-system,
artifact metadata and governed source/artifact hash checks passed in the final
verification run.

Fresh evidence-only artifact:

```text
/tmp/laidies-maikeover-repair2.CGKbGl
1077 files · 961.39 MiB
MAiKEOVER BROWSER PREFLIGHT PASS
Public metadata validation passed
GOVERNED SOURCE/ARTIFACT MATCH PASS
```

Governed public-source SHA-256 values:

```text
16823a1cca8a4d8ce1562d705a335b46acd27573f8c93ebe83b541ade6f294c9  maikeover.html
244e9b75beff955d4f9e5acfad3130fdc1858b1d6f04cf0355935396645758aa  laidies-card.html
13c6eb77857b3d5aa368db040bc4593abc6191546ae68c1455d48b61f98b2afc  resident-card.html
448b2d1281524e012f03cf33a554c28ecc133d9f7642aef3ba8575ee929ec0c8  content/maikeover-v2.css
75cb7cd5bbb22a0180e8546a5062a934b09d75f56b0445cf2b8565b671fbca2b  content/site/maikeover-v2.js
```

`git diff --check` passes for the full Repair 2 scope. The repository-wide
check remains non-zero only for unrelated pre-existing trailing whitespace in
`docs/growth/ali-idea-backlog.md:223`; Repair 2 did not alter that file.

## Holds unchanged

This is not proof of production authentication, email delivery, Supabase/RLS,
real public-card projection, avatar service, durable rewards, deployment,
public origin or cross-device restoration. No credential, inbox, authenticated
service, production binding, upload, deploy or public mutation was used.
