# Chick Flicks immediate episode-dialog QA

Date: 2026-09-02

## Evidence

- Source/incumbent: `../chick-flicks-20260902-v2/06-desktop-counter-1280.png`, 1280 × 900 px.
- Combined comparison: `desktop-before-after-comparison.png`, 1280 × 520 px.
- Desktop implementation: `desktop-episode-04-dialog-1280x900.png`, 1280 × 900 CSS px at density 1.
- Phone implementation: `phone-episode-04-dialog-390x844.png`, 390 × 844 CSS px at density 1.
- State: Episode 04 selected from the physical VHS shelf.

## Findings

- The incumbent P1 interaction defect was reproduced: choosing a tape changed content beneath the shelf and could look like no response.
- The native modal makes the episode title, description, learning payoff and Read, Listen and Watch routes visible immediately.
- Desktop and phone retain the current site type, palette, border and shadow grammar. The approved store, shelf and VHS artwork remain unchanged.
- Phone actions are 326 × 50 CSS px, the dialog is 370px wide in a 390px viewport, and document overflow is 0px.
- Visible Close and Escape both close the dialog. Focus enters the close control and returns to the chosen tape. Direct `#episode-02` opened the correctly labelled Episode 02 dialog.
- The browser page-error log was empty.

The full dialog captures are also the focused-region evidence because all copy and controls are legible at captured size. No additional crop was needed.

## Comparison history

1. P1: below-viewport selection feedback.
2. Fix: one immediate native episode dialog with hash/history, scroll lock, close and focus-return behavior.
3. Recheck: no actionable P0/P1/P2 issues remained at 1280 × 900 or 390 × 844.

final result: passed
