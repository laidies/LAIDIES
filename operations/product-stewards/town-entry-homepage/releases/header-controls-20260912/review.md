# Quiz return control — awaiting browser verification

Ali's sitewide rule remains: persistent page controls belong in the header, not floating over the page. The purple circular arrow is the referrer-dependent shared Back rail. Its existing header release remains public at e413a1b0-f8aa-4892-9a8a-f8cc4eaaf4aa; current provider and public helper bytes were reread on September 12.

Independent source inventory found one omitted active utility: `.quiz-return-link`. The public `script.js` inserts it into main and the Quiz page fixes it at the bottom. Other confirmed utility families are already covered; orphan quick-rail and mini-player scripts are not newly surfaced. Local activity and dialog controls remain with their interactions.

## Bounded correction

Only two public paths change: `content/site/sv-header-controls.js` and `learn/quiz.html`. The shared manager moves the same Quiz return node to its header utilities, preserving href/listeners, ranking it with returns and suppressing duplicate rail Back. The Quiz HTML removes fixed positioning at all widths, hides the node while it remains under main, retains its existing appearance and adds a visible keyboard focus outline. Its explicit versioned manager marker precedes the synchronous script that can inject legacy loaders.

The exact HTML candidate is `html/learn/quiz.html` in this packet. Do not release the worktree's older root homepage. The manager source is the worktree `content/site/sv-header-controls.js`. Binding hashes are in binding.json; correction.patch contains the HTML-only diff. Unrelated public copy, art, markup and service scripts are unchanged by the candidate.

## Verification and review

Node syntax and HTML preservation checks passed; a deliberately changed copy string was rejected. First independent Terra/Medium source review rejected the helper loading after synchronous script.js: a cached old manager could win. The repaired tag now precedes script.js; the bad ordering is rejected by the order check. Second source review accepted HTML SHA8b3916a6a56e43daf472f524b517cea687e5100da54be47aeb4c9417dc59dee5 and helper SHA15a68f71dff950f6885e41d58b446f2f6823ab7085217e3e590ff7ac6e3c56b7. This is source integrity/review only, not visual admission or runtime proof.

Browser tool returned: “The Mac is locked and automatic unlock could not unlock it. Ask the user to unlock the Mac manually before continuing.” No browser workaround was attempted. Desktop/phone/middle screenshots, actual return navigation, keyboard focus, cached-load order and absence of initial floating flash remain unverified. A failed manager download leaves the legacy main link hidden; the existing main/header navigation remains, but failure resilience is not certified.

## Exact next action

After Mac unlock, serve the candidate as an overlay on the fresh immutable production base; exercise `/learn/quiz?issue=issue04&from=blend-snap` and `from=this-week` at320/390/960/1440. Observe cold load, header containment, return destination, Tab/focus/Enter and no overlap after scroll. Check an unaffected shared-header page. Repair any actual defects, then obtain scoped independent visual review. Re-read provider head and preserve every other path plus worker/redirect inputs before the two-path release. Verify deployed candidate bytes and the same live route. No new deployment happened in this continuation.
