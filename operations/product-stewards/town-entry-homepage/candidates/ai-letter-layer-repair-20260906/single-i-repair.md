# Single-i ending correction
Owner observed miniature i used as final icon. Reproduced at source 4.3 seconds; prior sampled review missed this interval. Previous ending-quality assurance is invalidated.

Exact source master: frame 213 / 3.55s is last settled icon; frame 214 / 3.5667s starts return to whole i; frame 235 / 3.9167s is native brush i. The renderer must not put any closing whole-i frame in the dot slot above a permanent stem. Native I selected from source3.55s; source frames and all six icons before this cutoff stay unchanged.

Actual browser regression: all67 source frames213..279 produce exactly the same canvas pixels as native I, even when the caller asks for icon mode. Removing the new guard reproduces a different, duplicate-i image and fails that check. Desktop and390 screenshots inspected at the previously broken6s wall-clock moment. This is a focused correction, not a new animation design.

Pattern search: all three active homepage aliases use this same renderer. Internal ai-letter-proof/proof.js uses the entire i rather than placing it above a permanent stem, so does not have this duplication pattern. Legacy rejected implementations remain historical, not loaded by active aliases. No production deployment or audio change.
