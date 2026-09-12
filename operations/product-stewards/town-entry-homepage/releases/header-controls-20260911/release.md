# Header controls — verified publicly

- Production: https://e413a1b0.laidies-sunnyvaile.pages.dev and https://laidies.ai/
- Deployment: e413a1b0-f8aa-4892-9a8a-f8cc4eaaf4aa. Source commit: d17c43a7 (initial implementation dd878d1f).
- Pre-task provider:9de872a3. Initial release fa462c6a was superseded after actual public verification found the no-widget menu condition.

The shared contextual Back arrow was previously fixed to the page edge and appeared according to the referring page. It is now a readable header control. Existing map, tour, listening and legacy return controls use the same header placement. Shared and specialist header/menu content is retained. Tour details are collapsible; radio retains its own Expand/Collapse. No Back is introduced on MAiKEOVER. In-content game/carousel actions and user-opened dialogs retain their appropriate context.

Exact release:92 changed static paths (84 HTML cache-reference derivatives,7 existing shared scripts,1 new placement helper);703 existing static identities preserved;795 resulting files. All184 immutable/custom-origin fetch comparisons passed:180 exact bytes,4 custom HTML responses exactly matched after reversing Cloudflare's email-link obfuscation. Worker and redirect inputs retained. HTML content and artwork unchanged except popup player-location wording. Snapshot HTML is authoritative for this release; the root worktree index remains older and must not be deployed wholesale.

Actual public UI: radio→home→Back radio journey at390; home header at960/1440; radio Retry then advancing playback0:25/3:38, Pause/Resume/Expand/Collapse/Stop; final MAiKEOVER320 cold-state Menu→Tab Sign in→Escape Menu, no Back/overflow; finalGirlTalk960 Back in header; NewsStand1440 own header retained; WelcomeTour390 disclosure/Pause/End in header; empty utilities disappear after End. Final no-widget menu repair independently inspected at320 and exact manager SHA9fadfa06a782aead00ec310a6f8cc4f529b8a0a56bc3f7144ac2d5aeee1edb86; foreground supplied the actual keyboard verification. Earlier404/ChickFlicks/phone/wide maker and independent checks are detailed in review.md.

Not verified: authenticated account or portrait save, cross-device state, external community submission, every tour stop or all92 pages interactively. Public service fetches and preservation are integrity evidence, not a claim that every service works.

Remaining: existing KSVL first-click readiness race; its initial Listen may precede async registry readiness and produce an error, while existing Retry succeeds. Service logic was unchanged; this task does not claim to fix it. Tour at the extensionless Visitor route described stop1 as waiting; route-recognition behavior remains outside placement scope. Homepage Learn/Useful-Fun image choices and prior Resident Card explanation reconciliation remain open. No new art was created.

Checks: seven-script service boundary guard passed and rejected deliberate unrelated radio mutation.84HTML normalization passed. Initial git diff --check reported inherited whitespace in immutable HTML snapshots; it was preserved rather than reformatted. OAuth expiry was refreshed via existing Wrangler authentication; no new permissions requested.
