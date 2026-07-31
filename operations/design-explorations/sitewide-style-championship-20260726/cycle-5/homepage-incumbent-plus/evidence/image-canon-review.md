# Cycle 5 Homepage — final rendered image/canon review

**Review time:** 2026-07-26T15:07:33-07:00  
**Scope:** the exact final Cycle 5 rendered pair and the candidate-bound authoritative image register below. This is not a global, release, rights, or production-publishing approval.

## Final evidence identity

| Evidence | SHA-256 | Result |
| --- | --- | --- |
| Desktop render — `evidence/desktop/homepage-challenger-1440.png` | `c96db1b093dfa4ed5c4a883817b4a13c70443f337dc36a28ceb1712d57c3a92b` | Exact supplied final desktop source — PASS |
| Mobile render — `evidence/mobile/homepage-challenger-390.png` | `d8c28f549f58d0d9aa883f358e8f691721f26347fd17c539fd190da71fdb0c67` | Exact supplied final mobile source — PASS |
| Authoritative candidate image register | `93a3336f70534c988ba3a68ab7029658899039408a9f90fb7ac78c37ec0bba3e` | Reviewed controlling register — PASS |
| Desktop diagnostics — `evidence/diagnostics/desktop-1440.json` | `5a5329b175450ec9f5f0efbb6c97ff55c9a567b05f6ca1abc863227d948ba66e` | 12 unique sources; one masthead; no broken/banned source — PASS |
| Mobile diagnostics — `evidence/diagnostics/mobile-390.json` | `02d631033acc5daa9cd2dd5be0d4910594570360c9a8e3733f5469a784a15976` | Same 12-source inventory; no horizontal overflow or broken/banned source — PASS |

Candidate sources bound by this review:

| File | SHA-256 |
| --- | --- |
| `index.html` | `b183f8c312c3c27eca0ca6847c31185699c2731b7ba39d3634523307b0873f4b` |
| `candidate.css` | `dd62540a8e8c6370a16804ebf5af88a383de93f075bc8fb83da10dfa2541fcb6` |
| `candidate.js` | `7d275e8e7deb7fbddbf566fcd63c64440ca0e6069eba271f5a964f8946a37222` |

## Final result — PASS

The supplied desktop and mobile renders match the new authoritative register's bounded 12-source inventory after normalising Ada's cache-busting query string. Both diagnostics report exactly those 12 distinct source files, one use of the locked `main-street-dusk` masthead, zero rejected/held source uses, zero broken images, and no horizontal overflow.

| Register control | Final rendered/diagnostic evidence | Result |
| --- | --- | --- |
| Exact locked masthead only | `main-street-dusk` (`4efec0f4…`) occurs once in each diagnostic and appears once in each final render. | PASS |
| Approved FAiRY replacement | The rejected `fairy-godmother-scene.webp` is absent; the register's proof image (`0b518024…`) is the single FAiRY activity image. | PASS |
| Removed duplicate jobs | Chick postcard, Miss Jeeves reference, and town-map exploration each occur once; no Lantern Hill image is present. | PASS |
| Dream / Newsstand handling | Both held source images are absent. Their locations are deterministic CSS/text object panels, not replacement image assets. | PASS |
| Paired Girl Talk objects | Truth (`1d743a…`) and Dare (`737e0f…`) are separate, intentional paired sources, one each. | PASS |
| Homepage meaning | Final readiness language states, “No owner-admitted current promotions. Evergreen navigation remains.” Destination cards retain readiness/current-status framing rather than presenting admissions. | PASS |
| Responsive integrity | Desktop reports `1440 = scrollWidth`; mobile reports `390 = scrollWidth`. Visual review of the exact supplied pair shows the bounded images retain their intended jobs at both widths. | PASS |

## Registered final sources

`main-street-dusk` `4efec0f4…`; `pc-dial-up` `e7f850…`; Ada stained glass `94a351…`; Chick postcard `d427e7…`; approved FAiRY proof `0b518024…`; Mme CLAiO `177037…`; BWS closed `836ef…`; Truth `1d743a…`; Dare `737e0f…`; Miss Jeeves `69edb…`; town map `d9b340…`; puffy binder `33c7…`.

## Boundaries / hold status

**PASS applies only to this candidate-bound final rendered image/canon gate.** The register itself keeps every `ADAPT` asset subject to the named rights, canon, provenance, crop, and job-boundary controls. It does not grant global reuse, release, or production authority. Any candidate source, register, diagnostic, or final-render hash change requires a new review.
