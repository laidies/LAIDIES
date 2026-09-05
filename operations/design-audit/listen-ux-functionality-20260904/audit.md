# Episode Listen UX audit — 2026-09-04

## Scope

Combined UX and visible-accessibility audit of the Episode 04 Listen journey:
entry, starting playback, active listening, resuming and reaching related
episode material. Evidence was captured from the current in-app browser.

## User goal

Start or resume a narrated episode quickly, control it while commuting, follow
the words when useful and reach the episode's sources and activities without
opening the reading edition first.

## Evidence and flow

1. `00-entry.png` — **Healthy.** The episode, format, runtime and first Play
   action are explicit. The portrait tape correctly identifies the rental while
   the Listen player later uses the widescreen artwork.
2. `01-player-start.png` — **Needs improvement.** The player had Play/Pause and a
   progress slider, but no visible rewind, forward or speed control.
3. `02-playing.png` — **Partly healthy.** Captions, time and all six Special
   features were available, but the stale resume box remained after playback
   had begun.
4. `05-range-verified-controls.png` — **Healthy local successor.** Back 15,
   Play/Pause, Ahead 15 and Speed form one clear transport; the active caption,
   progress and related material remain visible and the stale resume prompt is
   gone.

## Why these controls

Apple's current Podcasts guidance places skip back, play/pause, skip forward,
speed and a sleep timer in its listening controls. W3C guidance calls for
keyboard-operable, clearly labelled, high-contrast media controls and identifies
playback speed and interactive transcripts as useful accessibility features.
This pass implements the two missing essentials that fit the current LAiDIES
page: explicit seeking and speed. It does not add a sleep timer, download,
queue, transcript duplicate or a cross-page mini-player.

- Apple Podcasts: https://support.apple.com/guide/iphone/watch-and-listen-to-podcasts-iph3a22707a5/ios
- W3C media players: https://www.w3.org/WAI/media/av/player/

## Evidence limits

Desktop layout and real audio behavior were checked in the in-app browser. A
range-capable preview was required to test seeking. Native screen-reader output,
physical lock-screen controls, offline behavior and a physical-phone viewport
were not tested in this pass. The CSS guard covers the existing 420px two-row
transport reflow but does not replace physical-device review.
