# Sorority House / Girl Talk — clear-local-record maker evidence

**Status:** BUILT LOCALLY — INDEPENDENT REVIEW REQUIRED  
**Evidence date:** 2026-07-27 (America/Vancouver)  
**Public status:** unchanged; no deployment or provider mutation

## Literal visitor output

Girl Talk now exposes a visible 44px minimum-height control labelled
**“Clear this device’s Girl Talk record.”** A verified clear:

- removes only `laidies_gt_local_state_v1`;
- reads the key back before claiming success;
- resets the visible sticker, dare and penalty counts;
- returns the card to its starting state;
- leaves unrelated browser data untouched; and
- moves focus to a live result explaining the exact local scope.

If browser storage refuses removal, the existing envelope and visible counts
remain unchanged and the visitor receives a focused **Not cleared** result.
No account, community post, Closet item, FAiRY allowance or reward is changed
or implied.

## Exact files

| File | SHA-256 |
| --- | --- |
| `games/girl-talk.html` | `4cbf315643caa379cdeba50b402142ea5456d4104b9e2ed9b6ec3b703cfe75a3` |
| `scripts/check-sorority-house-contract.mjs` | `ec3224ec27f18e554e99352ae3e3b19208b8e3f7d37abbf62c03fd415d7d267a` |
| `scripts/test-sorority-house-browser.mjs` | `4535906527d3b23e3d0d122b30d9a1cfc68a636d3c33e14e6a91f83f4d842856` |

## Verification

- Sorority House source contract PASS: 66/66, seven governed rooms.
- Full real-Chromium browser suite PASS: 147/147.
- New clear fixtures prove:
  - valid retained state renders before clear;
  - clear is visible and operable;
  - exact Girl Talk envelope is removed;
  - unrelated local record is preserved;
  - counts refresh to zero;
  - focus reaches the live result;
  - denied removal reports failure and preserves envelope plus visible counts.
- Existing 320px Sorority House and Girl Talk reflow checks PASS.
- Existing 200%/400% Sorority House reflow proxies PASS.
- External Hyvor attempts remain zero in the local suite.
- Sorority House owner-entry and scoped diff checks PASS.

## Remaining boundary

This closes the missing device-local deletion path only. It does not prove or
authorize Hyvor identity, posting, moderation, deletion/appeal, LAiDIES
account linking, native Safari/VoiceOver, human usefulness, analytics,
deployment or public-origin behavior.

## Next action

An independent judge should recompute the exact hashes and rerun the 66 source
and 147 browser checks, with special attention to successful and denied
removal, focus, unrelated-state preservation and 320px layout.

## Proactive improvement

Closed: device-local continuity now includes a truthful, verified exit. BTB-205
records the reusable prevention rule.
