# Quiz return header correction — ready for release

Ali's sitewide rule: persistent controls belong in the header, not floating over the page. Current receiving production is 2c35b124-6a8e-424a-b6bf-fe65a841e005, including the September12 NewsStand services and MAiKEOVER boxes. Its three affected source files are identical to the saved pre-correction baseline. Preserve the other792static identities and unchanged current worker/redirect inputs.

Three public paths change: learn/quiz.html, content/site/sv-header-controls.js and content/site/sv-global-header.js. The shared manager recognizes the original Quiz return node, mounts it in the header, retains its href/listeners, suppresses duplicate Back and normalizes positioning. Quiz HTML removes fixed offsets and loads the current manager before older loaders can claim it. Global header preserves the original utility node group when rebuilding its contents. No Quiz wording, questions, artwork, service scripts or unrelated markup changed.

## Actual checks

Maker: actual CUA viewport renders at320/390/960/1440. The return link is visible,44pxhigh,static inside header, with no horizontal overflow. From Blend & Snap and Weekly contexts the correct named link is retained. First Quiz answer → Next reaches question2. At390, Menu→Tab focuses the return with a visible3px purple outline; Enter reaches the rendered Blend & Snap counter/menu. Unaffected MAiKEOVER320: Menu→Tab→Sign in, Escape→Menu; no added Quiz link or overflow.

Independent Terra/Medium reviewer inspected actual incumbent960 and candidate320/960 before relying on receipts. Incumbent return floats at viewport lower-left; candidate has exactly one contextual return in the header, with no visible clipping, duplicate or layout regression. Actual click journeys reached Blend & Snap and the correct Weekly study pack. Reviewer accepted exact HTML8efe7671daf3e44093e7edbbcd0d9a9759381bc46aeba090df02d17213eaf59b, manager15a68f71dff950f6885e41d58b446f2f6823ab7085217e3e590ff7ac6e3c56b7 and global669c5e1963310c506b8f2146fbba586a4f4d4a58706521f377c15678e541e29e. Independent keyboard capture was unavailable; foreground completed the exact focus/Enter check.

## Corrections and scope limits

The first source review rejected placing the version marker after a synchronous loader; repaired and negatively checked. Actual maker browser testing then caught header innerHTML reconstruction deleting the moved node, which source-only review could not establish. The final two-line preservation repair retains original utility nodes/listeners through that rebuild. Syntax and unchanged-markup/service boundary checks pass; a deliberately altered copy string and old floating positioning fail their checks. The unified patch's blank context line produces a git whitespace warning; production source itself has no added trailing whitespace.

Earlier Mac lock prevented testing; it is resolved. No authenticated account, cross-device continuation or full Quiz editorial audit was performed. The existing manager-download failure behavior was not newly certified. Original Learn/Useful-Fun artwork and Resident Card reconciliation remain separate open work. This candidate is independently accepted for the bounded placement repair, not a claim that all site features were tested.

## Release procedure

Commit exact source and this packet. Refresh provider head; release only the three changed paths using the maintained preservation manifest and current worker/redirects. Then compare the full manifest and actual bytes on immutable and custom origins, and repeat live header/keyboard/return journeys. Stage is /private/tmp/laidies-header-followup-20260912/stage. Root worktree index.html is older and must not be released wholesale.
