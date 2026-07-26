# Independent rejudge — Delta LAi Nu Repair 1

**Date:** 2026-07-26  
**Judge:** independent product/trust/brand/UX/technical reviewer; authored the
initial FAIL 76 and did not perform Repair 1  
**Candidate verdict:** **PASS — BOUNDED RELAUNCH P0 ACCEPTED LOCALLY; RELEASE
HOLDS REMAIN**  
**Authority:** fresh current source, fresh exact artifact, network-controlled
browser evidence and official public Hyvor policy routes only  
**External actions:** no provider account access, sign-in, post, reply, report,
moderation action, credential access, Git action, deployment or publication

## Noncompensable score

| Gate | Score | Floor | Verdict |
| --- | ---: | ---: | --- |
| Product quality and useful completion | **18/20** | 17 | PASS |
| Accuracy, privacy, safety and trust | **18/20** | 17 | PASS |
| Positive LAiDIES brand contribution | **18/20** | 17 | PASS |
| UX and accessibility | **18/20** | 17 | PASS |
| Technical and exact-artifact reliability | **19/20** | 17 | PASS |
| **Total** | **91/100** | — | **PASS — bounded P0** |

All five noncompensable floors pass. This does not clear the separate human
moderation, real-provider, native-device, owner or public-release holds.

## Original P0 disposition

### P0-1 — all eleven destination states: PASS

The judge exercised all eleven exact room hashes as direct deep links, then
selected all eleven in sequence and traversed all ten Back and ten Forward
transitions. URL, wing and displayed title stayed coherent throughout.

The four non-embedded destinations were explicitly included:

- Chat Room Digest;
- Comment Card;
- Your Closet; and
- Dare Reports / Girl Talk.

Each direct link restored the correct destination and honest handoff rather
than a stale embedded room. The repaired `pushState` placement occurs before
the `embed: false` return.

### P0-2 — strict Girl Talk v1 envelope: PASS

Independent rendered fixtures rejected and removed:

- unknown card IDs;
- extra fields and a forged `names` map;
- duplicate sticker IDs;
- duplicate dare IDs;
- a dare marker without its sticker;
- a dare sticker without its marker;
- unknown penalty IDs;
- over-bound sticker, dare and penalty arrays;
- a wrong version; and
- a wrong field type.

None counted or rendered as progress, and each produced the malformed-record
recovery message. A valid unsorted envelope rehydrated to the exact canonical
v1 bytes, retained intentional duplicate penalties and rendered the expected
4/2/2 counts. Display names come from the canonical catalogue rather than
storage.

### P0-3 — keyboard continuity and announcement: PASS

For every one of the 53 cards, the browser flow verified:

1. Draw focuses the exact rendered card prompt.
2. The relevant truth/dare action is reachable by keyboard.
3. Completion produces non-empty result copy in the atomic polite live region.
4. The new **Draw again** action receives focus.

Truth completion also rendered the exact private follow-up. Dare completion
retained the optional sanitized-pattern room boundary and the instruction to
keep the full situation private.

### P0-4 — all card-level privacy and product contracts: PASS

The source catalogue contains exactly 25 truths, 28 dares and 78 total
prompt/tip strings. All 78 strings passed deterministic lint. All 53 cards
were then forced and rendered individually, including their decision point
and completion result.

No card directed the visitor to post proof, post/share an artifact, take real
email to another tool, paste/upload a real message or send private work. Email,
inbox, message and conversation exercises use fictional, invented, sanitized,
private or explicitly optional framing. No catalogue or rendered decision
point introduced a FAiRY allowance, Closet import, member reward or community
completion contradiction.

### P0-5 — usable provider privacy boundary: PASS

The Sorority House embed and all seven direct discussion rooms visibly expose
four separate, keyboard-usable routes:

- LAiDIES privacy: `/privacy.html`;
- Hyvor Talk privacy: `https://talk.hyvor.com/privacy`;
- Hyvor Talk terms: `https://talk.hyvor.com/terms`; and
- Hyvor moderation/reporting:
  `https://talk.hyvor.com/docs/moderation`.

The three Hyvor destinations were independently opened on 2026-07-26 and are
current official Hyvor Talk pages. The boundary distinguishes LAiDIES site
privacy from Hyvor account/comment/provider data, identifies the in-frame
flag/report route, and does not invent a retention period, review deadline,
deletion promise, reply or moderation outcome.

Local host and unsupported-host runs made zero provider attempts. On an
approved LAiDIES hostname, forged fixture state and a forged pre-existing
community adapter were ignored; the governed controller made exactly one
intercepted Hyvor script attempt and failed closed to `unavailable`. No
provider request completed.

## Preserved regression evidence

- Local Resident Card data remains personalization only, not provider identity.
- All four wings and eleven destinations remain open for discovery.
- Shared provider controller and fail-closed provider states remain intact.
- Signed-out, held and unavailable states make no submission/publication/
  moderation/reward claim.
- Weekly Bag return remains exact.
- Girl Talk remains open without a Resident gate and uses only its device-local
  honour-system envelope.
- Storage denial withholds local completion success.
- No legacy reward-shaped Girl Talk key is written.
- House and Girl Talk retain 320px reflow; house retains the 200%/400% reflow
  proxies, reduced-motion treatment and provider-state contrast above 4.5:1.
- `sitemap.xml` now contains `https://laidies.ai/sorority-house`.

## Independent evidence

Repository source:

```text
SORORITY HOUSE CONTRACT PASS
checks=62
rooms=7

SORORITY HOUSE BROWSER PASS
checks=138
external_provider_attempts=0

SORORITY REPAIR 1 ADVERSARIAL PASS
checks=391
provider_attempts=1
```

The single adversarial provider attempt was the required approved-host test
and was intercepted. Local and unsupported hosts made zero attempts.

Shared regressions:

```text
INLINE JS PASS — 352 scripts / 132 live pages
LOCAL LINKS PASS — 1,975 references / 110 pages
CHECK-TOWN PASS
PRODUCT STEWARD SYSTEM PASS — 65 products
```

## Fresh exact artifact

```text
path=/tmp/laidies-sorority-rejudge-repair1.kT0WeV
builder_files=1086
find_files_including_.build-manifest.json=1087
builder_size=961.51 MiB
du_size=1.1G
existing_over_750_MiB_advisory=true
```

Exact artifact reruns:

```text
SORORITY HOUSE CONTRACT PASS — 62
SORORITY HOUSE BROWSER PASS — 138; provider attempts 0
SORORITY REPAIR 1 ADVERSARIAL PASS — 391; one intercepted approved-host attempt
PUBLIC METADATA PASS
```

The governed source/artifact comparisons were byte-identical:

| Governed file | SHA-256 |
| --- | --- |
| `sorority-house.html` | `350be1c0f055a61fed0db9299e57a4408b6883ab6651e0838f25a4b3fcfdde79` |
| `content/site/sorority-house-v2.js` | `9ab4140c47afbaf622c5b4de312109f602be20bc40d42ac92a05e3e5cbd686ba` |
| `content/sorority-house-v2.css` | `c150869cb9069bf0eaf76516ceb6f27fbaf65d30be22f365f9355d17d8ad46ce` |
| `content/site/community-room.js` | `0d6b621fab1a090df2af9d81b8617087764565aa020b51689752cd3533492341` |
| `content/community-room-v2.css` | `34204693c89cf94029fb55fa94b295984ab92e06a1ff7a04894c4896d298e2d6` |
| `games/girl-talk.html` | `d47b34ee2f9d5d824b855e89cfc35410fb91c07db60d58d227eb0922ccca23f0` |
| `community/ask-the-room.html` | `7876a412cd36323e018f5313c53d0729f17f43a43ceca53b575f5b9ba775949d` |
| `community/wins.html` | `af7eadf246277c71d7b13f1c97644755c5cb58c8ec7f5b26b8d3210e2216a811` |
| `community/dear-laidies.html` | `c1a114105446374aa28f587f1dc86c31394a08b8d452bfa2796172433684366b` |
| `community/try-on-debrief.html` | `552850b1ccc62cbadfd737b7d302891bf89c1d60c4846732f1674e84b2dcadf3` |
| `community/send-it-energy.html` | `01dbad38d39e3aee51d46fe817fc39e91fd57cff7ed8a1778c5cccfd57f24de3` |
| `community/mix-cd-exchange.html` | `9160c5c9d835be3eb6263153df558500b4769cd00b28f365aa8e6b7c20e3ae4a` |
| `community/burn-book.html` | `c69ad324faf9bd50d25548e74997f9d0c0fc7eab62bd7a65846587fc1ca350a5` |
| `sitemap.xml` | `accbb51c209f26c027d9bfd4ecb64886bdef515114e056c041acd7d0bfd56fa0` |

## Remaining release holds

1. Name and approve the human moderation, report/escalation, incident, appeal,
   retention/deletion and on-call operations.
2. Run explicitly authorized controlled real-provider evidence for sign-in,
   post, reply, held/rejected content, flag/report and failure recovery.
3. Have the responsible owner reconcile LAiDIES privacy/deletion/reporting
   language and the Hyvor relationship before promotion.
4. Complete Safari, VoiceOver, native zoom and representative physical-device
   testing.
5. Complete human newcomer comprehension/usefulness testing and owner
   visual/community approval.
6. Approve privacy-safe analytics and voice-of-customer measurement.
7. Build the final release candidate and verify the deployed public origin.
8. Resolve or explicitly accept the global artifact-size advisory.

## Final ruling

Repair 1 closes all five original P0 defects and passes the preserved
noncompensable floors in source and the fresh exact artifact. The bounded
Sorority House / Girl Talk P0 candidate is accepted locally at **91/100**.

This is not a deployment instruction and does not claim that live Hyvor,
human moderation, native accessibility, owner approval or the public origin
has been proven.

## Learning scan

The rejudge reused BTB-069, BTB-105, BTB-109, BTB-110 and BTB-111 plus the
initial review’s branch-complete and privacy-at-decision-point rules. No
central learning ledger was edited because this assignment authorized one
independent report only.
