# Front PAiGE excerpt and reading action — local only

User reported insufficient preview text and no clear full-story route. The feature button already opened the story, but two catchup chrome refreshes overwrote its label according to the age of the daily issue. Both now retain 'Read the full article →' for the existing admitted persistent feature. Unadmitted features retain the prior archive fallback; no admission rules changed.

The front-page renderer now displays the existing 118-word `the_story` opening in addition to the subtitle. No article data or claims were rewritten, added, checked anew or published. CSS styles the opening and underlines the reading action. No artificial height or filler added.

Local browser 1280 and 320: exact reading action persists after loading; single click opens the matching full story directly, with practical section and closing text present. Back works. Both widths have no horizontal overflow. Desktop restored. `test-front-paige-reading-action.mjs` covers admitted/unadmitted feature in archive, stale and quiet daily states; PASS. Runtime syntax and diff whitespace checks PASS. Preview HTML/CSS/runtime copied from stable.

No deployment, broad-site verification or new native Safari test. Separate pending reader-clearance work remains separate. Morning-cycle owner informed of the local runtime change. Existing unrelated Episode 3 hook exception used for commit; untracked mini-backpack asset preserved.
