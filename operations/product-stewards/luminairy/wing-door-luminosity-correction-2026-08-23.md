# LUMINAiRY wing-door luminosity correction

## Ali's correction

The MAiVEN and TRAiLBLAZER windows looked too dark and insufficiently luminous beside the Saints entrance.

## Root cause

The source assets already contain luminous sapphire and golden-amber stained glass. The page applied `saturate(0.72) brightness(0.72)` to every unselected door, so selecting Saints visibly deadened the other two wings. Regenerating the artwork would have changed the wrong layer.

## Correction

- Preserve all three exact door assets and crops.
- Apply `saturate(1.08) brightness(1.12)` consistently to selected and unselected door images.
- Use the existing white/electric border, five-pixel lift, focus treatment and text label to communicate the active wing.
- Bind the successor stylesheet as `luminairy-v2.css?v=20260823-site-system-v4-luminous` so the open browser cannot retain the dim predecessor.

## Calibrated prevention

Before the CSS change, the browser guard observed and rejected `saturate(0.72) brightness(0.72)` for both unselected doors. It now rejects any unselected filter containing sub-1 brightness or saturation and requires the cache-busted luminous stylesheet identity.

## Boundary

No door was regenerated or replaced. This isolated visual correction does not deploy the page or change Carrie's deferred-song hold.

## Review result

Desktop artifact-first review found all three doors luminous with no washout, lost detail, crop, label-contrast, overflow or active-state defect. The first mobile review correctly held because its browser failed to enter a real mobile viewport. A genuine Chrome `390×844` render then proved `innerWidth: 390`, one `342px` door column, zero overflow and the same non-dimming filters. Independent pixel review passed the exact Maven and Trailblazer mobile door captures with their sapphire/golden-amber identities and internal glow intact.
