# Independent review — Town Hall Wave 3 complete civic-room candidate

**Review time:** 2026-07-27 America/Vancouver  
**Verdict:** `ACCEPT — ISOLATED CANDIDATE ONLY`

This accepts a local, isolated civic-room candidate for separately locked product, Brand and accessibility work. It does not authorise an inbox, receipt, staff process, account capability, Closet propagation, shared-system integration, deployment or public claim.

## Frozen tuple independently recomputed

| Input | SHA-256 | Result |
| --- | --- | --- |
| Candidate HTML | `156ee775ca335917c4e670edda7a441055163cd6777e6cdce022cd5b80647a3a` | exact |
| Candidate CSS | `a21d5439d21ac3ef209634dd79e58fba0032e9470cfdcecc266bbe1f1f45fac0` | exact |
| Candidate controller | `f416ab9b320e1e6b91712befa9922b1b1b5329778803372eef2c335ecd020759` | exact |
| Candidate roster | `eef668e985f66c4a3d7a2e497a069806d521ed74f54952d871a3f2ba9d8648ed` | exact |
| Deterministic candidate test | `969121431d02c44f9bb48cb987fe7b32b45f908dd183448a33cf34236a046124` | exact |

Independent mechanical result:

```text
TOWN HALL WAVE 3 CANDIDATE PASS stations=3 regulars=4 audio=2 draft=device-only inbox=held responsive=520,900
```

The roster JSON validates as exactly four Regulars, and the controller passes syntax checking.

## Independent browser exercise

I served the candidate from a read-only local origin (including byte-range audio) and tested it in Chromium at 1440, 390 and 320 widths. At each width the three labelled station controls and exact four Regulars render without horizontal overflow. The Regular portraits load correctly after the noticeboard opens and reaches them; this is expected lazy-loading, not a broken-art defect. The chamber and Deb images load correctly. The civic chamber is documented as interim fallback, never final approved art.

### First-glance civic-room comprehension — PASS

The first view gives three unambiguous verbs and jobs: **Ring** Mayor Deb’s counter for two songs and an archive; **Meet** the noticeboard’s four actual Regulars; and **Prepare** a private comment card whose inbox is held. One station opens in place at a time, and direct hashes work. This meets the three-station lobby metaphor without invented feed or hidden hotspot.

### Deb audio — PASS

- Explicit play of `Loop Me Out` starts admitted local audio, reaches media readiness and advances unmuted.
- Switching to `Deb’s Tomorrow Problem` changes the source rather than creating concurrent playback.
- Opening another station pauses/stops hidden Deb audio; Stop clears active playback.
- The simulated missing-media route presents an explanatory Retry state and does not silently substitute a track or claim success.

### Town Regular choice — PASS

- Precisely the governed four Regulars are admitted.
- A Regular can be selected, replaced, restored on fresh-page return and cleared. The state is explicitly on this device only, not an account, membership or cross-device record.
- Malformed roster fails closed with zero partial Regulars. Storage-denied state makes no saved-choice claim; corrupt/unsafe local state is discarded.

### Comment draft and truth boundaries — PASS

- Missing type focuses the first type choice. A valid bounded comment draft saves locally, restores within its seven-day lifecycle, and deletes with form state cleared.
- Saved-state messages say the draft is device-only and not filed, accepted, read or a staff record.
- Stale/corrupt fixtures discard unsafe drafts; storage denial says no saved draft is claimed. No fixture invents a receipt or submission.
- The boundary accurately names private/sensitive-information, non-emergency and no-guaranteed-response limits, plus the backend, idempotency, staff, retention and public-proof work still needed.

### Accessibility and fallback — PASS for this candidate

- 1440/390/320 containment passes; real station controls remain reachable.
- Keyboard Tab reaches the skip link first, and Enter moves focus to `main#civic-room`.
- Reduced-motion reflow is contained.
- With JavaScript disabled, zero JavaScript-only buttons or draft fields remain enabled; real site handbacks and fallback message remain.

## Authority ceiling — PASS

No candidate copy or behavior claims an inbox call, accepted receipt, staff record, reading, triage, reply, resolution, account/Card identity, reward, Closet propagation, shared identity/moderation/analytics/provider system, production integration, deployment or public verification. It truthfully holds each of these.

## Remaining gates

1. Final Town Hall visual/art direction and human Brand judgment; the civic chamber fallback must not be promoted as final art.
2. Authoritative private-intake server, idempotency, rate/abuse controls, staff lifecycle, retention/deletion, correction and privacy evidence.
3. Town Regular producer-to-Closet consumer proof under the shared contract.
4. Native Safari/VoiceOver/zoom and independent human audio/accessibility judgment.
5. Exact production-route integration, artifact, deployment, public-origin and rollback proof.

## Learning scan

**NO MATERIAL OPPORTUNITY** in this isolated candidate. Prevention rule: a held civic channel may make a local draft useful, but may never style it as transport, receipt, staff action or accountable resolution; every local-state message must state its storage scope and authority limit.

