# Take LAiDIES with you

**Status:** PARTIAL LOCAL FOUNDATION — KSVL and the Screening Room have Media
Session controls; Trailer and Episodes 01–04 have held portable packages and a
fail-closed RSS preview adapter. Persistent sitewide playback, offline saves,
an admitted public podcast feed, YouTube release path and music distribution
remain BUILD REQUIRED.
**Decision owner:** Ali for public account/channel submissions and final
release admission; Platform, Weekly Episodes and KSVL can build and validate
the underlying package without waiting for a distribution-account decision
**Product promise:** an episode or song that starts in SUNNYVAiLE can travel
with the listener while she walks, commutes or drives, without turning the
website into a disposable link farm

## The listener experience

LAiDIES needs two complementary modes:

1. **The full learning home on laidies.ai** — illustrated/watch/listen/read
   editions, transcripts, sources, Try-Ons, related concepts, progress,
   collectibles and the next useful action.
2. **The take-it-with-me edition** — safe background listening, lock-screen,
   headphone and car controls, offline availability and ordinary podcast/music
   app subscriptions.

The outside platforms extend the experience. They do not replace the site or
become the source of truth for learning completion, rewards or resident data.

## One release package, several destinations

Every admitted weekly episode produces one checksum-bound media package:

| Object | Job | Primary destinations |
|---|---|---|
| Full visual master (MP4) | Complete illustrated film | laidies.ai and YouTube |
| Audio master (MP3 or M4A) | Commute/walk/drive edition | laidies.ai player and podcast RSS |
| Captions and transcript | Access, search and read-along | site, YouTube and podcast metadata where supported |
| Poster, square show art and episode thumbnail | Recognizable discovery | site, podcast directories and YouTube |
| Metadata record | One title, number, date, description, chapters, rights, sources, related learning and canonical URL | every surface |
| KSVL song master | Original song without episode narration | KSVL, admitted music services and YouTube |
| Song visualizer or lyric video | Real visual edition of the original song | YouTube and the site |
| Release receipt | Exact checksums, admissions and public addresses | internal release control |

The package is assembled once. Destination adapters may shorten descriptions
or transform artwork, but may not silently rename an episode, change its
lesson, substitute another master or invent platform-specific claims.

Every package is governed by `content/data/media-release.schema.json`. Its
`releaseId` and positive `version` identify one exact successor; `supersedes`
links a correction to the version it replaces. A path, filename, attractive
image or previously published asset is not release authority on its own.

## Episode-cover authority

Each episode has one approved **master episode cover record**, not a loose
folder of plausible images. The record binds:

- exact episode number and canonical title;
- source path and SHA-256 checksum;
- approval status, approver and approval evidence;
- creator/rights status and public alt text;
- pixel dimensions, aspect ratio and named safe area/focal point; and
- every derived asset, its dimensions, checksum and source relationship.

The master cover is deliberately adapted into named derivatives, including a
podcast square, site poster and YouTube thumbnail. A derivative may recompose
the approved ingredients for its destination; it may not casually crop a
face, title, character or other essential object, regenerate the scene, use a
random film frame, revive retired art or substitute a different episode's
image. Each derivative is reviewed at its real rendered size.

If a title, number, depicted claim, character identity or approved cover
changes, the successor release must update all affected derivatives and their
metadata together. The old cover becomes `SUPERSEDED`; it cannot remain the
current thumbnail on one destination merely because that platform cached it.

## Website player and offline contract

The site needs one persistent player shared by episodes and KSVL:

- playback continues while the visitor moves between LAiDIES pages;
- lock-screen, headset and compatible car controls use the Media Session API;
- episode controls include play/pause, seek, speed, chapters and queue;
- song controls include play/pause, previous/next, queue, playlist and repeat;
- captions/transcript and the full visual edition remain one action away;
- a signed-in resident's admitted position and queue restore across supported
  contexts; a signed-out listener gets an honestly labelled local fallback;
- `Save for later` and `Save offline` are different actions;
- an offline save shows size, progress, success, storage failure and Remove;
- no page autoplays audible media; and
- driving mode never asks the listener to type, rate, quiz or interact while
  the vehicle is moving. The listener starts the programme before departure
  and uses voice, lock-screen, headset or car controls thereafter.

Current KSVL code already supplies Media Session controls and short-lived
device-local position/queue persistence. That is useful foundation, not proof
of the complete sitewide or offline contract. The episode watch experience
does not yet meet this shared contract.

## Podcast distribution: episodes

The episode feed lives at a LAiDIES-controlled address such as
`https://laidies.ai/podcast/feed.xml`. A generated RSS 2.0 feed references
immutable public audio files and the canonical metadata record.

Submit the same feed to:

- **Apple Podcasts** for searchable subscriptions, downloads and CarPlay;
- **Spotify** for podcast subscriptions, downloads and Spotify Connect;
- **YouTube** as a podcast RSS destination/fallback; and
- other podcast directories after the core three are verified.

YouTube can turn an RSS episode into a static-image video, but that is a
fallback. LAiDIES already makes visual episodes, so the YouTube channel should
receive the admitted full visual master and organize the episode videos in the
official podcast playlist. Eligible podcast content can then also appear in
YouTube Music.

The RSS feed carries episodes and the trailer. It is not a dumping ground for
standalone KSVL songs, social clips or unrelated town video.

## YouTube channel contract

The channel is a deliberate LAiDIES destination, not free overflow storage.

### Channel jobs

- **Podcast playlist:** Trailer and admitted full episodes, in release order.
- **KSVL originals:** admitted songs as proper visualizers, lyric videos or
  episode-derived music videos.
- **Useful excerpts:** clearly labelled clips that teach one idea and point to
  the complete episode/site treatment.
- **Shorts:** optional discovery derivatives, never substitutes for the full
  explanation.

### Channel requirements

- approved LAiDIES channel art, avatar and About copy;
- consistent episode and KSVL thumbnail families;
- captions, chapter markers, canonical site link and related-learning link;
- playlist order and titles derived from the release manifest;
- comments/moderation policy and rights evidence before activation;
- no upload from an unadmitted working render; and
- post-upload visual, audio, caption, mobile, TV and link verification.

The public channel cannot be called active merely because an account exists or
a private video was uploaded.

## Music distribution: KSVL songs

Original KSVL songs belong in music services as music. Use an admitted music
distributor to deliver exact masters, artwork, songwriter/performer/producer
credits, identifiers, territories and rights metadata to Spotify, Apple Music
and other selected services. Apple explicitly directs independent artists and
labels to distributors for this job.

The initial music release may be a small, coherent first collection rather
than all 29 creator-confirmed tracks at once. Each chosen song must pass:

- exact master and title reconciliation;
- creator/writer/performer and generation-tool rights review;
- lyrics and caption accuracy;
- artwork and visualizer review;
- loudness/format delivery checks; and
- site, YouTube and streaming-address verification.

Existing nostalgia playlists containing commercial songs remain curated
playlists. They are not KSVL-owned releases and must not be presented as such.

### Authoritative music metadata

Every distributed song binds the exact public artist or band name and release
identity before delivery. The manifest records, where applicable:

- artist/band display name and stable internal artist ID;
- track title, mix/version, single or album title and release type;
- songwriters, composers, lyricists, performers, vocalists and producers;
- label and publisher, or an explicit `not applicable` disposition;
- genre/subgenre, language, explicit-content flag, original release date and
  territories;
- copyright and sound-recording copyright lines;
- ISRC per recording and UPC/EAN per release once assigned;
- duration, audio checksum, exact as-recorded lyrics and canonical public
  lyrics;
- approved cover-art path/checksum, creator, rights status, alt text and
  destination derivatives; and
- distributor delivery IDs, public service addresses and verification status.

No destination may infer a band name from a filename, reuse generic LAiDIES
art, invent an album title or pull credits from draft lyrics. Artist identity,
album artwork and credits come only from the admitted release record.

## Freshness corrections and version propagation

A freshness finding does not directly overwrite a public episode. It opens a
versioned media correction order against the affected release manifest. The
owner must disposition every destination and every asset that carries the
changed meaning:

| Change | Required propagation review |
|---|---|
| Factual or teaching correction | Canon, script, audio re-record decision, transcript, captions, chapters, visual master, site article/player, podcast item, YouTube video/description and related learning |
| Title, episode number or episode cover | Site metadata/poster, podcast item/art, feed, YouTube title/thumbnail/playlist, search/share images and archive listings |
| Song lyric, artist/band, credit, rights or album art | KSVL registry/player, lyrics, visualizer/lyric video, site metadata, YouTube and every music-distributor delivery |
| Destination-only defect | Correct that adapter and record why the canonical master and other destinations do not change |

An accepted successor is rebuilt from admitted sources, checksum-bound,
reviewed and released through the same adapters as the original. “Pushed”
means the accepted version reached the named destination and its public result
was verified; it does not mean a freshness alert auto-published working files.
The release receipt cannot close while any affected destination still presents
the superseded audio, words, cover, title, credits or artwork as current.

## Progress and Butterfly Clip rules

Listening should lead back into meaningful use of the site, but raw attention
is not currency.

- Do **not** grant clips for pressing Play, leaving audio running, repeat
  streaming, a platform view count or an unverifiable off-platform listen.
- An admitted episode learning checkpoint may grant once when a resident
  returns to the site and completes a meaningful action: the episode route,
  reflection, Try-On, class step or check.
- A KSVL song can support a lesson completion, memory check or town trail; the
  song stream itself does not generate money-like units.
- Podcast and YouTube descriptions should deep-link to the episode's exact
  learning home, not a generic homepage.
- Completion and rewards use the shared idempotent event/economic ledger; no
  platform-specific counter may award its own balance.

## Accessibility and privacy

- Every episode has accurate captions and a readable transcript.
- Spoken audio cannot depend on seeing a card, button or diagram.
- Chapters use useful names, not internal production labels.
- Playback analytics are privacy-safe aggregate events.
- LAiDIES does not import an individual's Apple, Spotify or YouTube listening
  history to infer learning completion.
- Account sync stores only the supported continuation envelope and user-chosen
  saved items; it does not expose private listening history publicly.

## Current truth

| Capability | Honest status |
|---|---|
| KSVL website playback | PARTIAL LOCAL FOUNDATION — real player and Media Session controls exist; full public/right/accessibility verification remains open |
| Episode illustrated listen-along | EXISTS; not yet one persistent background/offline player |
| Episode audio masters | BUILT LOCALLY / HOLD for Trailer and Episodes 01–04; sound-on human review and release admission remain open |
| Podcast RSS generator/feed | BUILT LOCALLY / HOLD — internal five-item preview has zero enclosures; release mode refuses unadmitted packages |
| Apple Podcasts listing | NOT SUBMITTED/NOT PUBLICLY VERIFIED |
| Spotify podcast listing | NOT SUBMITTED/NOT PUBLICLY VERIFIED |
| YouTube podcast/channel release system | BUILD REQUIRED; prior references treated YouTube mainly as hosting fallback |
| KSVL music distributor release | NOT SELECTED/NOT PUBLICLY VERIFIED |
| Signed-in cross-context media continuation | BUILD REQUIRED on the allowlisted continuation contract |
| Explicit offline save | BUILD REQUIRED |

## Build order

1. Reconcile the trailer and Episodes 01–04 exact visual/audio/caption masters,
   titles, rights and public-release status.
2. Define and validate one `media-release.json` schema and package builder,
   including authoritative episode-cover derivatives and music metadata.
3. Produce the trailer + Episode 01 audio masters, square art, transcript and
   metadata as the first podcast fixture.
4. Build the shared persistent website player and explicit offline-save proof.
5. Generate and validate the LAiDIES-owned RSS feed; test it locally and from
   a non-production staging address.
6. Prepare the YouTube channel identity, podcast playlist, first full visual
   uploads and first KSVL visualizer without making them public.
7. Select a music distributor only after the first KSVL collection's exact
   rights/metadata packet is decision-ready.
8. Ali reviews the private/unlisted platform result and the exact public
   release package.
9. Submit/publish only the admitted package, then verify every destination,
   link, caption, artwork, title and playback mode publicly.
10. Add each later episode/song by release-manifest update rather than a new
    bespoke workflow.

The website and media pipeline can be built before the surrounding building
pages are redesigned. Public promotion waits until the destination experience
and exact media are admitted.

## Official platform references

- Apple Podcasts: [submit an RSS show](https://podcasters.apple.com/support/897-submit-a-show), [podcast requirements](https://podcasters.apple.com/support/823-podcast-requirements), [distribution and downloads](https://podcasters.apple.com/support/5108-how-apple-podcasts-distributes-your-shows-to-listeners), [episode media and transcripts](https://podcasters.apple.com/support/825-how-to-create-an-episode)
- Spotify for Creators: [find/enable an RSS feed](https://support.spotify.com/ws/creators/article/finding-and-enabling-your-rss-feed/), [claim an externally hosted podcast](https://support.spotify.com/uk/creators/article/claiming-your-podcast-on-spotify-for-creators/)
- YouTube: [deliver a podcast by RSS](https://support.google.com/youtube/answer/13973017?hl=en), [podcasts in YouTube Studio and YouTube Music](https://support.google.com/youtube/answer/12751636?hl=en), [RSS availability and behavior](https://support.google.com/youtube/answer/13525207?hl=en)
- Apple Music for Artists: [work with a distributor](https://artists.apple.com/support/1108-get-your-next-release-on-apple-music)
