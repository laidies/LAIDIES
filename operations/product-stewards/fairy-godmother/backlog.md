# FAiRY Godmother ranked backlog

| ID | Status | Launch class | Work | Done when |
|---|---|---|---|---|
| FG-01 | BUILT LOCALLY — phase 1 | FIX BEFORE LAUNCH | Typed request/response helpers and honest HTTP error semantics in recovered working source. | Local deterministic tests cover typed non-POST, rate limit, invalid input, malformed completion and upstream failure; independent/release review remains open. |
| FG-02 | BUILT LOCALLY — phase 1 | FIX BEFORE LAUNCH | Move allowance commit after validated usable success. | Local verified-opaque-identity fixture commits only after non-empty validated completion; malformed/upstream/timeout paths make zero writes. Atomic ledger/race handling remains FG-08. |
| FG-03 | BUILT LOCALLY — phase 1 | FIX BEFORE LAUNCH | Remove browser-asserted subscriber identity and raw-email logging. | `subscriberEmail` is rejected; the worker accepts only an optional server-provided opaque identity adapter and has no raw-email logs. A real signed identity integration remains unbuilt. |
| FG-04 | BUILT LOCALLY — phase 1 | FIX BEFORE LAUNCH | Add 8,000-character input limit, fitting limit and upstream abort timeout. | Request/previous-draft and fitting instruction limits return typed no-charge 413s; upstream abort returns typed 504. Exact runtime/load testing remains staging work. |
| FG-05 | READY TO BUILD | FIX BEFORE LAUNCH | Add boundary/safety, domain and task routing before generation. | All applicable evaluation cases route correctly before character generation. |
| FG-06 | READY TO BUILD | FIX BEFORE LAUNCH | Add current-information/retrieval gate and citation discipline. | Current claims use required sources or return `needs_verified_information`; zero fabricated citations/facts. |
| FG-07 | READY TO BUILD | FIX BEFORE LAUNCH | Constrain FAiRY personality to the presentation layer. | Tone varies without changing facts, safety, uncertainty, recommendation or spend. |
| FG-08 | BLOCKED BY FG-01/03 | FIX BEFORE LAUNCH | Implement authoritative case and FAiRY Plays ledger. | Verified identity plus atomic reserve/commit/refund, case receipt, dedupe and visible balance pass race/failure tests. |
| FG-09 | BLOCKED BY FG-01–08 | FIX BEFORE LAUNCH | Integrate typed frontend and truthful scope/allowance/persistence copy. | Page renders every response type and never infers success from arbitrary prose. |
| FG-10 | BLOCKED BY STAGING | FIX BEFORE LAUNCH | Run all 45 versioned cases at API and rendered-page level plus mobile/accessibility/failure suite. | P0 contract definition of done passes with independent quality, accuracy/trust and brand judgments. |
| FG-11 | NOT WIRED | POST-LAUNCH | Privacy-safe analytics and satisfaction loop. | Event dictionary, aggregate baseline and outcome review operate without prompt/case/email text. |
| FG-12 | SPECIFIED | FIX BEFORE HERO PROMOTION | Connect FAiRY to the shared concept map and format-specific Library/High/episode/NewsStand/game handoffs. | Advice teaches enough reasoning to transfer, avoids duplicating full learning products, and routes the next useful experience with verified destination status. |
