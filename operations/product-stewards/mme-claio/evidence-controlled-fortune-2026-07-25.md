# Mme CLAi-O controlled-fortune maker evidence

**Superseded for current candidate evidence by:**  
`evidence-repair-1-controlled-fortune-2026-07-25.md`

This file preserves the evidence for the first candidate that the independent
judge failed. It must not be used as Repair 1 evidence.

**Status:** IMPLEMENTED — MAKER SOURCE AND EXACT-ARTIFACT SUITES PASS;
INDEPENDENT JUDGE AND RELEASE HOLDS REMAIN  
**Date:** 2026-07-25  
**Authority used:** Local Mme CLAi-O source/tests/dossier and exact
Cocktail Fortune / Businesswomen's Special boundary copy only. No Git,
deployment, external service, analytics, publication, social or visual
generation/mutation.

## Exact candidate

- Built artifact: `/tmp/laidies-mme-claio.t3J7dE`
- Builder result: 1,077 files, 961.38 MiB; warning that the full site exceeds
  the builder's 750 MiB advisory threshold.
- The five scoped public source files match their exact artifact copies:

| File | SHA-256 |
|---|---|
| `games/madame-claio.html` | `7b2df8f9e6cd49a71b9d4fdc81cd3b4ba17003b0856ddc032a3aae60c828eef8` |
| `content/madame-claio-v2.css` | `24f92925745a7bc79589104c93e18061996bc9d43c66c885c702a69c7cd91997` |
| `content/site/madame-claio-v2.js` | `00467ac79b2d60a9698079f8ca4d412efdea62bcc9832f1f3b7435b90892ab2c` |
| `games/cocktail-fortune.html` | `0b1486e191272b7980d476ef35298bd866d8b01eee8ef5fa0cd56d4276f50603` |
| `games/businesswomens-special.html` | `80da00f08a31608bc89c15a078eefa6c100d91a3eb466ee7c978ece42c36e928` |

## Results

| Check | Result |
|---|---|
| `node scripts/test-mme-claio-contract.mjs` | PASS; unchanged deck count = 100 |
| `node scripts/test-mme-claio-browser.mjs` against source | PASS |
| Same browser suite with `MME_CLAIO_ROOT=/tmp/laidies-mme-claio.t3J7dE` | PASS |
| `node scripts/check-inline-js.js` | PASS; 353 scripts / 132 pages |
| `node scripts/check-local-links.js` | PASS; 1,942 references / 110 pages |
| `node scripts/check-town.js` | PASS |
| `node scripts/check-product-stewards.mjs` | PASS; 65 products, 3/3 active |
| `node scripts/validate-public-metadata.mjs <artifact>` | PASS |
| `node scripts/validate-ksvl-artifact.mjs <artifact>` | PASS; 83 audio dependencies / 141.99 MiB, hashes match |

The browser matrix covers:

- new and returning visitors;
- native-button keyboard activation, visible-focus proxy, focused reading and
  focused boundary result;
- programmatic live status;
- immediate-repeat exclusion after a reload;
- five-completed-reading local keepsake and exact no-account wording;
- reset of Mme CLAi-O count/history/keepsake only;
- crisis/emergency, abuse/safety, medical, legal, financial and
  factual/current probes;
- no count, history or badge side effect for stopped probes;
- low-stakes control prompt completion;
- unavailable and corrupt localStorage;
- reduced-motion zero-delay and non-smooth scroll behavior;
- 320 CSS-pixel source/artifact reflow with no page-level horizontal overflow;
- reading and safety text contrast calculation proxies at or above 4.5:1;
- retired Cocktail Fortune recovery to the canonical route; and
- separate Businesswomen's Special / spirit-free framing.

## Screenshots from the exact-artifact run

- `evidence-2026-07-25/mme-claio-returning-desktop.png` — 1280 × 2533
- `evidence-2026-07-25/mme-claio-safety-boundary.png` — 1100 × 2103
- `evidence-2026-07-25/mme-claio-mobile-320.png` — 320 × 3365

These are machine evidence, not owner visual approval.

## Truth and limitations

- The typed question is processed only in page memory. The reading code neither
  stores nor transmits it. Existing site-wide third-party analytics
  configuration was not changed or independently inspected in this packet.
- The high-stakes stop is a deterministic local language boundary, not a
  clinical or professional triage system. The maker fixtures prove the named
  cases only; a separate judge must challenge paraphrases, obfuscation,
  mixed-intent prompts and false positives before launch approval.
- The urgent boundary names local emergency services and a trusted nearby
  person but supplies no assumed local number or invented hotline.
- Automated Chromium checks are not Safari, VoiceOver, a real mobile device or
  native browser zoom. Those gates remain open.
- No product-specific analytics learning loop was wired. Typed question text,
  fortune text, identity and sensitive inference remain prohibited analytics
  properties.
- No deploy or public-origin request was performed. The artifact path is
  temporary and is not a release record.

## Learning scan

Two reusable findings qualify for the canonical learning ledger, but
`operations/painpoints-log.md` already has unrelated concurrent edits and was
outside this maker's exclusive write boundary:

1. A local-only product is not fail-safe merely because it has no backend:
   unguarded `localStorage` reads can abort the entire interaction.
2. “Choose a different random item” needs a bounded retry plus deterministic
   fallback; a degenerate or stubbed random source can otherwise lock the page.

The orchestrator should integrate those prevention rules without overwriting
the concurrent painpoints work.
