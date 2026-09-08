# NewsStand layout and ad repair — September 7

Previous Overheard quality verdict is SUPERSEDED by Ali rejection. Mechanical source/keyboard checks did not establish humour or advertisement composition.

## Acceptance and implementation
Weekly cannot clip or stretch its image; storylines get the full width below the introduction. Big Picture retains title/date above the entire spread and CTA below the excerpt, with a single-column layout below 1000px. LUMINAiRY uses explicitly distinct grid areas at all breakpoints. Existing art bytes are unchanged.

Crossword preview is the exact 15-by-15 mask derived from the existing ten-word Puzzle 01 source: 49 blank open cells, starting numbers 1–9, no answers. Preview and button open the existing playable puzzle. House ads show existing library-interior and telephone artwork, retaining existing ad copy. Overheard replaces the rejected lesson with Ali's previously approved exact line: “Let us briefly consult reality. It has had very little airtime.” No new educational explanation or factual news claim was drafted.

## Verification
Browser at 320/650/800/1280: no page overflow or overlapping LUMINAiRY siblings. Images decoded before final captures. Negative calibration reproduced the original live story/takeaway collision at 800px and rejected it. Component capture hides the fixed topbar only; screenshots are component evidence, not whole-page or native screen-reader proof.

## Independent review
Reviewer /root/callout_check, Terra Medium, inspected actual Weekly, Big Picture, LUMINAiRY, play and wit component captures at all four widths before final verdict. Scoped visual PASS: no visible regressions or failed requirements; exact actual grid, illustrated ads, approved short wit, and distinct profile/takeaway/actions. Humour is not claimed universally successful. Root caught and repaired library artwork cropping before final review.

Public file hashes are bound in overlay.json. 779 predecessor files are preserved. Publication remains pending until exact live bytes and live journeys are verified.

## Public verification
Source commit b0e9d90d825f93dc54d7084a2dd309e12743438e deployed as 82098e74 on the existing homepage-redesign production branch, after verifying predecessor 000f7293 was still current. All three public files match the committed bytes at both the immutable and custom origins (six responses). Unintercepted live checks at 320/650/800/1280 found no page overflow or LUMINAiRY sibling overlap; decoded component renders inspected. Preview opens actual puzzle, phone clue-list mode is visible, Grid mode opens all 49 cells and typing works. First journey test incorrectly waited for hidden grid cells in mobile default clue-list mode; test repaired to exercise the actual mode switch. No native screen-reader or fresh editorial fact review claimed; existing article prose and art bytes were preserved. Browser-open request queued the fresh live URL in Codex.
