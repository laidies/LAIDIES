# LAiDIES — podcast distribution plan (drive-time listening)

**Status:** local feed adapter and five exact opening-day packages are BUILT
LOCALLY / HOLD. The controlling cross-destination contract is
`docs/product/take-it-with-me-media.md`, with manifest shape in
`content/data/media-release.schema.json`. Any conflict is resolved in favour
of those newer contracts. No feed enclosure, provider delivery or public
listing is admitted.

The answer to "how do people listen while driving": **the season is a
podcast.** The exact admitted episode audio masters are published through a
LAiDIES-owned RSS feed, playable in Apple Podcasts / Spotify / compatible
podcast apps —
CarPlay and Android Auto included. The Screening Room stays the enhanced
on-site version; the podcast is the everywhere version.

## The setup (one-time after two exact releases are admitted)

1. **Feed lives on our own domain:** `laidies.ai/podcast/feed.xml` —
   a static RSS 2.0 file with iTunes tags, generated directly from the exact
   admitted `media-release.json` records. Cloudflare serves the audio; no
   hosting fees, and the feed URL stays ours forever. The local generator
   refuses release output while no package is admitted.
2. **Cover art:** the podcast show art and episode-specific square cover are
   named checksum-bound derivatives in the media manifest. They are composed
   from approved source art, tested at thumbnail size and may not be replaced
   by a random frame, retired cover or unreviewed crop.
3. **Submit once** to: Apple Podcasts (Podcasts Connect — needs an
   Apple ID), Spotify (podcasters.spotify.com), YouTube Music, Amazon
   Music. Overcast/Pocket Casts pick it up from Apple automatically.
   Approval: usually 1–3 days each. After that, new episodes appear in
   every app automatically when we add them to the feed.
4. **Launch with the Trailer + Ep 1** — directories and listeners
   both treat one-episode feeds as abandoned.

**In-world frame:** the podcast is KSVL syndication — show notes and
descriptions can use station voice while preserving the exact episode title,
learning-home link and factual meaning.

**Fallback option:** a free host (e.g. Spotify for Creators) handles
validation/analytics for zero effort — but the feed URL becomes theirs.
Self-hosting first is fine; feeds can 301-redirect if we ever move.

## Episode metadata pattern

- Title: `Ep 01 — On Wednesdays We Use AI` (trailer: `Welcome to Sunnyvale`, published with `<itunes:episodeType>trailer</itunes:episodeType>` — podcast apps pin it for new listeners)
- Description: the announcer's tease + one-line try-on + laidies.ai link
- `<itunes:episode>` numbering + season 1; categories: Education / Technology

## Why the scripts already work for driving

Audio-complete is a locked format rule (season bible): spoken URL and
spelling, no "click below," no visual dependencies. The try-on is
designed to be REMEMBERED until you're home: one small real task.

## Still needed before launch

- [x] Episode 01 portable audio master — exact audio payload from held v27
      film; release admission remains open
- [x] Trailer portable audio master — exact audio payload from held v8 film;
      release admission remains open
- [x] Cover derivatives — 3000×3000 master plus YouTube, site and share forms
      for Trailer and Episodes 01–04; visual acceptance remains open
- [x] RSS generator and internal no-enclosure preview — built fail-closed from
      exact media manifests; public `/podcast/feed.xml` remains held
- [ ] Apple ID decision for Podcasts Connect (Ali)
- [x] Trailer strategy: DECIDED — the tour episode IS the trailer (Ali named it)

For each later freshness correction, produce an admitted successor media
manifest and update the RSS item, podcast-directory result, site player,
transcript/captions, episode cover derivatives and YouTube release as affected.
Do not leave the older title, cover or audio current on a secondary platform.
