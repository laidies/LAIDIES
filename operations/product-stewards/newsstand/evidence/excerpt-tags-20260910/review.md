# NewsStand excerpt HTML correction — September 10

Ali requested removal of visible paragraph code. Three publication-preview values now strip authored HTML before text escaping. Full article formatting and every content/data asset remain unchanged.

The browser guard reproduced visible `<p>` on incumbent desktop 1440 and mobile 390, and rejected both; the corrected page passed both at the live URL with only the HTML response substituted. Maker inspected mobile pixels. Independent read-only Terra/Low lane inspected all NewsStand story-excerpt consumers and confirmed the three-site fix; archive/search firstSentence and catchup extraction already remove markup.

This is text extraction, not a security sanitizer. It retains the existing encoder. Native Safari zoom was not repeated for this presentation-only correction. Live deployment verification pending.

Deployed source 2a8ba125 as fc6e325a-6482-42cc-ac22-fa9086e3b820, directly atop Chick Flicks 2b993313. Provider comparison confirms exactly /newsstand.html changed and all 782 other asset identities preserved. Exact NewsStand HTML matches custom-origin curl output. Browser responses additionally include Cloudflare's analytics beacon; the initial whole-response equality check rejected that transformation, not the fix. A separate reader assertion initially used a nonexistent ID and was repaired to the actual .ns-reader selector. Native zoom not repeated. Current provider map: /private/tmp/laidies-excerpt-tags-20260910/production-provider.json.
Final live result: custom and immutable origins, desktop 1440 and mobile 390, all four journeys show no HTML tags in Front PAiGE preview and open the full original article successfully. VERIFIED PUBLICLY. Private ad draft remains unpublished.
