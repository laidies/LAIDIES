# Up next

Verified local; not published. User request: show “Up next:” and the next song or ad instead of saved-position chatter.

The exact queue resolver returns the next part of a multipart item first, then the next track according to repeat/shuffle. Shuffle reserves a single choice shared by display, preload and automatic advancement. Repeat-one returns the start of the current entry; repeat-off at the end says “Up next: End of playlist”. Manual Previous/Next retain their existing skip behavior, distinct from automatic progression. No advertising schedule or unadmitted programme content was created.

The audio owner includes its actual upcoming title in an optional validated heartbeat field. Followers use that title; they do not invent a shuffled selection. Older owners without the field hide the preview. Persisted playback schema remains unchanged.

Routine play/pause/restoration/volume/seek announcements remain in the screen-reader status region, visually hidden. Loading, errors, held tracks and actionable connection/pop-out notices remain visible. The Up next line is separate and does not overwrite error feedback.

Validation: node scripts/test-ksvl-up-next.mjs extracts real source helpers into a fake runtime and passes sequential, multipart, repeat all/off/one, single/sign-off, stable shuffle, preload/auto-advance agreement and playIndex invalidation cases. A deliberately incorrect selection returned One instead of Three and failed the suite. Full JS syntax and whitespace checks pass.

Actual browser: observed “Up next: Businesswomen’s Special”; resumed and moved current track to its end; the actual following title became Businesswomen’s Special. Subsequent Up next was Welcome to the LIBRAiRY. A second same-origin follower displayed the same title. At390x844 it fit with no horizontal overflow; screenshot up-next-mobile.png. Playback was paused after testing. Multipart ads use synthetic test cases; no actual ad playback was claimed. No new pop-out transition or public deployment tested. The rejected CD image is unchanged and remains unapproved.
