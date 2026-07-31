# Closet / Town Wallet QA — 2026-07-24

## Source truth

- `source-desktop.png`
- `source-desktop-profile.png`
- `source-desktop-form.png`

The source captures were made before implementation. They record the small
rounded hero, rounded wallet, repeated building grid, pale dashboard tiles,
luminary cards, and long stack of collection vessels.

## Desktop construction

- `desktop-arrival-final.png`
- `desktop-resident-card-v1.png`
- `desktop-wallet-v1.png`
- `desktop-report-v1.png`
- `desktop-luminaries-v1.png`
- `desktop-collections-v1.png`
- `desktop-collections-lower-v1.png`
- `desktop-bank-v2.png`
- `desktop-leaderboard-v1.png`
- `desktop-edit-drawer-v1.png`

## Mobile construction

- `mobile-arrival-v1.png`
- `mobile-resident-card-v1.png`
- `mobile-wallet-v1.png`
- `mobile-luminaries-v1.png`
- `mobile-tour-v1.png`
- `mobile-edit-drawer-v1.png`

## Required comparisons

- `before-vs-after.png`
- `style-lock-vs-implementation.png`

The current Closet interior is a structural source, not an approved future
generation reference. The comparison verifies scale, hierarchy, construction,
and responsive behaviour.

## Functional result

- One Resident Card front and back; both flip controls passed.
- Seventeen building membership records render and retain direct Visit links.
- Nine Report Card counters render from existing live count sources.
- The first Report Card counter jumps to the charm shelf.
- Eight weekly tour stops render and retain their real destinations.
- The editor opens as a desktop/mobile drawer, moves focus to Close, closes,
  and returns focus to Edit.
- Own-mode actions no longer leak the hidden public-mode action.
- Desktop and 390px mobile show no page-level horizontal overflow.
- No broken loaded images were found.

