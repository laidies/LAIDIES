# NewsStand excerpt HTML correction — September 10

Ali requested removal of visible paragraph code. Three publication-preview values now strip authored HTML before text escaping. Full article formatting and every content/data asset remain unchanged.

The browser guard reproduced visible `<p>` on incumbent desktop 1440 and mobile 390, and rejected both; the corrected page passed both at the live URL with only the HTML response substituted. Maker inspected mobile pixels. Independent read-only Terra/Low lane inspected all NewsStand story-excerpt consumers and confirmed the three-site fix; archive/search firstSentence and catchup extraction already remove markup.

This is text extraction, not a security sanitizer. It retains the existing encoder. Native Safari zoom was not repeated for this presentation-only correction. Live deployment verification pending.
