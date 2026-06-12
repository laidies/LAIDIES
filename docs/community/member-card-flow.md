# Member Card Flow

## Product Decision

Member cards are profile/trading cards, not a manual photo-editing service.

The person should stay as-is. The fun lives in the card frame, background, labels, and optional no-face stand-in.

## User Flow

1. Member fills out useful profile details: role, journey stage, tools, what they need, what they can offer, location/time zone, and optional link.
2. Member chooses whether to upload a normal photo or use a no-face stand-in.
3. Member picks a card background:
   - simple card frame
   - school-photo lasers
   - sparkle mall-photo background
   - holographic foil
   - Caboodles/flip-phone desk
   - Clueless closet glow
   - corporate pop-star press photo
   - LAIDY surprise me
   - Mme CLAI-O chooses
4. Member previews the card.
5. Member approves the card look and visibility before anything is published.

## Background-Only AI Rule

If a future version adds real AI-generated imagery, it should be background-only:

- preserve the person
- do not change facial features, body, skin, age, identity, or outfit unless the member explicitly asks
- change only the background/card setting
- show the generated result before publishing
- require explicit approval

## Backend Needs

A real submission flow needs:

- private form/backend storage
- photo upload storage
- card style selection
- preview approval state
- visibility consent
- feature opt-in consent
- optional image-generation service if background replacement becomes part of the product

Do not put image API keys in browser code.

