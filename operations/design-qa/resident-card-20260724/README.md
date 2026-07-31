# Resident Card QA — 2026-07-24

## Captures

- `source-desktop.png` — inherited storefront-and-form source
- `source-form-desktop.png` — inherited rounded sign-in card
- `source-profile-desktop.png` — inherited boxed profile groups
- `desktop-arrival-v3.png` — corrected salon arrival
- `desktop-intake.png` — ruled Post Office intake sheet
- `desktop-consultation.png` — open consultation rows
- `mobile-arrival.png` — mobile room arrival
- `mobile-intake.png` — mobile intake sheet
- `before-vs-after.png` — direct source/build comparison
- `style-lock-vs-implementation.png` — approved Episode 04 style reference
  beside the current implementation

## Checks

- 1440 × 900 and 390 × 844
- no page-level horizontal overflow
- no broken images
- email/magic-link field and action remain present
- four optional profile groups and 31 profile controls remain present
- profile accordion and single-choice state behave correctly
- temporary QA profile state removed after testing
- only expected browser diagnostic is Plausible declining localhost analytics

## Visual conclusion

The page construction passes and reads as one intake journey rather than a
stack of membership cards. The vanity room remains candidate art.
