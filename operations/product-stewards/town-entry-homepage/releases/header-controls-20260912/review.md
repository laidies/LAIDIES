# Quiz return header correction — VERIFIED PUBLICLY

Ali's sitewide rule: persistent controls belong in the header, not floating over the page. Receiving production was 2c35b124-6a8e-424a-b6bf-fe65a841e005, including the September12 NewsStand services and MAiKEOVER boxes. Its three affected source files are identical to the saved pre-correction baseline. Release cd1ff76a preserved the other 792 static identities and unchanged worker/redirect inputs.

Three public paths change: learn/quiz.html, content/site/sv-header-controls.js and content/site/sv-global-header.js. The shared manager recognizes the original Quiz return node, mounts it in the header, retains its href/listeners, suppresses duplicate Back and normalizes positioning. Quiz HTML removes fixed offsets and loads the current manager before older loaders can claim it. Global header preserves the original utility node group when rebuilding its contents. No Quiz wording, questions, artwork, service scripts or unrelated markup changed.

## Actual checks

Maker: actual CUA viewport renders at320/390/960/1440. The return link is visible,44pxhigh,static inside header, with no horizontal overflow. From Blend & Snap and Weekly contexts the correct named link is retained. First Quiz answer → Next reaches question2. At390, Menu→Tab focuses the return with a visible3px purple outline; Enter reaches the rendered Blend & Snap counter/menu. Unaffected MAiKEOVER320: Menu→Tab→Sign in, Escape→Menu; no added Quiz link or overflow.

Independent Terra/Medium reviewer inspected actual incumbent960 and candidate320/960 before relying on receipts. Incumbent return floats at viewport lower-left; candidate has exactly one contextual return in the header, with no visible clipping, duplicate or layout regression. The local click journeys retained both destination URLs. That did not prove the Weekly destination content: subsequent public checking found the existing /this-week.html redirect goes to the homepage. Blend & Snap was verified from the rendered destination. Reviewer accepted exact HTML8efe7671daf3e44093e7edbbcd0d9a9759381bc46aeba090df02d17213eaf59b, manager15a68f71dff950f6885e41d58b446f2f6823ab7085217e3e590ff7ac6e3c56b7 and global669c5e1963310c506b8f2146fbba586a4f4d4a58706521f377c15678e541e29e. Independent keyboard capture was unavailable; foreground completed the exact focus/Enter check.

## Corrections and scope limits

The first source review rejected placing the version marker after a synchronous loader; repaired and negatively checked. Actual maker browser testing then caught header innerHTML reconstruction deleting the moved node, which source-only review could not establish. The final two-line preservation repair retains original utility nodes/listeners through that rebuild. Syntax and unchanged-markup/service boundary checks pass; a deliberately altered copy string and old floating positioning fail their checks. The unified patch's blank context line produces a git whitespace warning; production source itself has no added trailing whitespace.

Earlier Mac lock prevented testing; it is resolved. No authenticated account, cross-device continuation or full Quiz editorial audit was performed. The existing manager-download failure behavior was not newly certified. Original Learn/Useful-Fun artwork and Resident Card reconciliation remain separate open work. This candidate is independently accepted for the bounded placement repair, not a claim that all site features were tested.

## Public release and verification

Released cd1ff76a-7da8-4baa-ad78-dcdf9b2dfb9b from source commit 1ffcbe175eb49eddfeda09d9996fb411576a30e2. The full provider comparison confirmed exactly the three intended changes, 792 preserved static identities, and zero additions/removals. All six custom/immutable byte comparisons matched the reviewed source hashes. See live-manifest-verification.json and live-byte-verification.json; these establish integrity, not visual quality.

Actual live CUA checks: custom-origin 390px return is one static 44px control inside the header; Menu then Tab exposes its visible 3px focus outline, and Enter reaches the rendered Blend & Snap counter/menu. Custom 960px and immutable 1440px show the correct Weekly label, exactly one static 44px header return, no clipping or horizontal overflow. Continuous viewport screenshots were inspected in the tool, not saved as files. Viewport overrides were reset afterwards.

OPEN, separately owned by the Weekly/Blend & Snap route: the existing /this-week.html / 301 redirect sends the Weekly return to /?issue=4&bag=open&group=practice. Actual destination was the homepage with no visible Study Pack bag or open dialog. The return href and redirect were preserved, so this is an existing destination defect, not evidence that Weekly return functionality passed. Next action: reconcile the current approved Weekly Study Pack destination, then repair and verify the rendered handoff in its owning task. No redirect or content repair was made in this release.

Stage: /private/tmp/laidies-header-followup-20260912/stage. Root worktree index.html is older and must not be released wholesale. Other homepage artwork and Resident Card work remains open as stated above.
